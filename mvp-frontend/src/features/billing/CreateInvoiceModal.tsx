import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Plus, Trash2 } from 'lucide-react';
import { useDataStore } from '../../store';
import { generateId } from '../../utils';
import type { Bill, BillItem } from '../../types';

const billItemSchema = z.object({
  description: z.string().min(2, 'Description is required'),
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
  rate: z.coerce.number().min(0, 'Rate must be positive'),
});

const invoiceSchema = z.object({
  patientId: z.string().min(1, 'Please select a patient'),
  items: z.array(billItemSchema).min(1, 'Add at least one item'),
  discount: z.coerce.number().min(0, 'Discount must be positive'),
  tax: z.coerce.number().min(0, 'Tax must be positive'),
  paymentAmount: z.coerce.number().min(0, 'Payment amount must be positive'),
  paymentMethod: z.enum(['cash', 'card', 'upi', 'bank-transfer']).optional(),
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

interface CreateInvoiceModalProps {
  onClose: () => void;
}

export default function CreateInvoiceModal({ onClose }: CreateInvoiceModalProps) {
  const { patients, bills, addBill } = useDataStore();
  const [selectedPatientId, setSelectedPatientId] = useState('');

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      items: [{ description: '', quantity: 1, rate: 0 }],
      discount: 0,
      tax: 0,
      paymentAmount: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const watchItems = watch('items');
  const watchDiscount = watch('discount');
  const watchTax = watch('tax');
  const watchPaymentAmount = watch('paymentAmount');

  const selectedPatient = patients.find((p) => p.id === selectedPatientId);

  const subtotal = watchItems.reduce(
    (sum, item) => sum + (item.quantity || 0) * (item.rate || 0),
    0
  );
  const total = subtotal - (watchDiscount || 0) + (watchTax || 0);
  const balance = Math.max(0, total - (watchPaymentAmount || 0));

  const onSubmit = async (data: InvoiceFormData) => {
    const patient = patients.find((p) => p.id === data.patientId);
    if (!patient) return;

    const items: BillItem[] = data.items.map((item) => ({
      id: crypto.randomUUID(),
      description: item.description,
      quantity: item.quantity,
      rate: item.rate,
      amount: item.quantity * item.rate,
    }));

    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const total = subtotal - data.discount + data.tax;
    const paid = data.paymentAmount;
    const balance = total - paid;

    let status: 'paid' | 'partial' | 'unpaid' = 'unpaid';
    if (paid >= total) status = 'paid';
    else if (paid > 0) status = 'partial';

    const newBill: Bill = {
      id: crypto.randomUUID(),
      billNo: generateId('INV', bills.length),
      patientId: patient.id,
      patientName: patient.name,
      date: new Date().toISOString(),
      items,
      subtotal,
      discount: data.discount,
      tax: data.tax,
      total,
      paid,
      balance,
      status,
      paymentMethod: paid > 0 ? data.paymentMethod : undefined,
    };

    addBill(newBill);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Create New Invoice</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Patient Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Patient <span className="text-red-500">*</span>
            </label>
            <select
              {...register('patientId')}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="input-field"
            >
              <option value="">Choose a patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.patientId} - {patient.name}
                </option>
              ))}
            </select>
            {errors.patientId && (
              <p className="mt-1 text-sm text-red-600">{errors.patientId.message}</p>
            )}
            {selectedPatient && (
              <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <span className="font-medium">Phone:</span> {selectedPatient.phone}
                </p>
              </div>
            )}
          </div>

          {/* Invoice Items */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Invoice Items <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => append({ description: '', quantity: 1, rate: 0 })}
                className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Item
              </button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-3 items-start">
                  <div className="flex-1">
                    <input
                      {...register(`items.${index}.description`)}
                      placeholder="Description"
                      className="input-field"
                    />
                    {errors.items?.[index]?.description && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.items[index]?.description?.message}
                      </p>
                    )}
                  </div>
                  <div className="w-24">
                    <input
                      {...register(`items.${index}.quantity`)}
                      type="number"
                      placeholder="Qty"
                      className="input-field"
                    />
                  </div>
                  <div className="w-32">
                    <input
                      {...register(`items.${index}.rate`)}
                      type="number"
                      placeholder="Rate"
                      className="input-field"
                    />
                  </div>
                  <div className="w-32">
                    <input
                      value={(watchItems[index]?.quantity || 0) * (watchItems[index]?.rate || 0)}
                      disabled
                      className="input-field bg-gray-100"
                      placeholder="Amount"
                    />
                  </div>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg mt-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {errors.items && (
              <p className="mt-1 text-sm text-red-600">
                {errors.items.message || 'Please add at least one item'}
              </p>
            )}
          </div>

          {/* Calculations */}
          <div className="border-t pt-4">
            <div className="max-w-md ml-auto space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">৳{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <label className="text-gray-600">Discount:</label>
                <input
                  {...register('discount')}
                  type="number"
                  className="input-field w-32"
                  placeholder="0"
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <label className="text-gray-600">Tax:</label>
                <input
                  {...register('tax')}
                  type="number"
                  className="input-field w-32"
                  placeholder="0"
                />
              </div>

              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span>৳{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-900 mb-3">Payment Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Amount
                </label>
                <input
                  {...register('paymentAmount')}
                  type="number"
                  className="input-field"
                  placeholder="0"
                />
                {errors.paymentAmount && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.paymentAmount.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <select {...register('paymentMethod')} className="input-field">
                  <option value="">Select method</option>
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="upi">Mobile Banking</option>
                  <option value="bank-transfer">Bank Transfer</option>
                </select>
              </div>
            </div>

            {watchPaymentAmount > 0 && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Balance Due:</span>
                  <span className={`font-medium ${balance === 0 ? 'text-green-600' : 'text-orange-600'}`}>
                    ৳{balance.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Invoice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
