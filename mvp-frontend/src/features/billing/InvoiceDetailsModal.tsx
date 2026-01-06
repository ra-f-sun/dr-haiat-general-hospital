import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Printer, DollarSign, User } from 'lucide-react';
import { useDataStore } from '../../store';
import { formatDate, formatCurrency } from '../../utils';
import type { Bill } from '../../types';

const paymentSchema = z.object({
  amount: z.coerce.number().min(0.01, 'Payment amount must be greater than 0'),
  method: z.enum(['cash', 'card', 'upi', 'bank-transfer'], {
    required_error: 'Please select a payment method',
  }),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface InvoiceDetailsModalProps {
  bill: Bill;
  onClose: () => void;
}

export default function InvoiceDetailsModal({
  bill,
  onClose,
}: InvoiceDetailsModalProps) {
  const { updateBill, patients } = useDataStore();
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const patient = patients.find((p) => p.id === bill.patientId);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: bill.balance,
    },
  });

  const watchAmount = watch('amount');

  const onSubmitPayment = async (data: PaymentFormData) => {
    const newPaid = bill.paid + data.amount;
    const newBalance = Math.max(0, bill.total - newPaid);

    let newStatus: 'paid' | 'partial' | 'unpaid' = 'unpaid';
    if (newBalance === 0) newStatus = 'paid';
    else if (newPaid > 0) newStatus = 'partial';

    updateBill(bill.id, {
      paid: newPaid,
      balance: newBalance,
      status: newStatus,
      paymentMethod: data.method,
    });

    setShowPaymentForm(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      paid: 'bg-green-100 text-green-700',
      partial: 'bg-orange-100 text-orange-700',
      unpaid: 'bg-red-100 text-red-700',
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 print:hidden">
          <h2 className="text-xl font-bold text-gray-900">Invoice Details</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              title="Print Invoice"
            >
              <Printer className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-8 print:p-4">
          {/* Invoice Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-primary-600 mb-2">
                  Dr. Haiat General Hospital
                </h1>
                <p className="text-gray-600">Dhanmondi, Dhaka 1205</p>
                <p className="text-gray-600">Phone: +880 1712-345678</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Invoice Number</p>
                <p className="text-2xl font-bold text-gray-900 font-mono">
                  {bill.billNo}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Date: {formatDate(bill.date)}
                </p>
              </div>
            </div>
          </div>

          {/* Patient Information */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Bill To
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Patient Name</p>
                <p className="font-medium text-gray-900">{bill.patientName}</p>
              </div>
              {patient && (
                <>
                  <div>
                    <p className="text-sm text-gray-600">Patient ID</p>
                    <p className="font-medium text-gray-900">{patient.patientId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium text-gray-900">{patient.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium text-gray-900">{patient.address}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Invoice Items */}
          <div className="mb-8">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Description
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    Qty
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    Rate
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {bill.items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="py-3 px-4 text-gray-900">{item.description}</td>
                    <td className="py-3 px-4 text-right text-gray-700">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-700">
                      {formatCurrency(item.rate)}
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-gray-900">
                      {formatCurrency(item.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="mb-8">
            <div className="max-w-md ml-auto space-y-2">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(bill.subtotal)}
                </span>
              </div>
              {bill.discount > 0 && (
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Discount:</span>
                  <span className="font-medium text-red-600">
                    -{formatCurrency(bill.discount)}
                  </span>
                </div>
              )}
              {bill.tax > 0 && (
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(bill.tax)}
                  </span>
                </div>
              )}
              <div className="flex justify-between py-3 border-t-2 border-gray-300">
                <span className="text-lg font-bold text-gray-900">Total:</span>
                <span className="text-lg font-bold text-gray-900">
                  {formatCurrency(bill.total)}
                </span>
              </div>
              {bill.paid > 0 && (
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Paid:</span>
                  <span className="font-medium text-green-600">
                    {formatCurrency(bill.paid)}
                  </span>
                </div>
              )}
              {bill.balance > 0 && (
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Balance Due:</span>
                  <span className="font-medium text-orange-600">
                    {formatCurrency(bill.balance)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Status and Payment Method */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                    bill.status
                  )}`}
                >
                  {bill.status}
                </span>
              </div>
              {bill.paymentMethod && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                  <p className="font-medium text-gray-900 capitalize">
                    {bill.paymentMethod.replace('-', ' ')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Form */}
          {bill.balance > 0 && !showPaymentForm && (
            <div className="print:hidden border-t pt-6">
              <button
                onClick={() => setShowPaymentForm(true)}
                className="btn-primary flex items-center"
              >
                <DollarSign className="h-5 w-5 mr-2" />
                Record Payment
              </button>
            </div>
          )}

          {showPaymentForm && (
            <div className="print:hidden border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Record Payment</h3>
              <form onSubmit={handleSubmit(onSubmitPayment)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('amount')}
                      type="number"
                      step="0.01"
                      className="input-field"
                      placeholder="Enter amount"
                    />
                    {errors.amount && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.amount.message}
                      </p>
                    )}
                    {watchAmount > bill.balance && (
                      <p className="mt-1 text-sm text-orange-600">
                        Amount exceeds balance due (৳{bill.balance.toFixed(2)})
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method <span className="text-red-500">*</span>
                    </label>
                    <select {...register('method')} className="input-field">
                      <option value="">Select method</option>
                      <option value="cash">Cash</option>
                      <option value="card">Card</option>
                      <option value="upi">Mobile Banking</option>
                      <option value="bank-transfer">Bank Transfer</option>
                    </select>
                    {errors.method && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.method.message}
                      </p>
                    )}
                  </div>
                </div>

                {watchAmount > 0 && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-900">
                      New Balance: ৳{Math.max(0, bill.balance - watchAmount).toFixed(2)}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPaymentForm(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Processing...' : 'Record Payment'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t text-center text-sm text-gray-600">
            <p>Thank you for choosing Dr. Haiat General Hospital</p>
            <p className="mt-1">For any queries, please contact us at the above number</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 print:hidden">
          <button onClick={onClose} className="btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
