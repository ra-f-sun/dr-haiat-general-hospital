import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { useDataStore } from '../../store';
import { generateId } from '../../utils';
import type { OPDVisit } from '../../types';

const visitSchema = z.object({
  patientId: z.string().min(1, 'Please select a patient'),
  doctorName: z.string().min(2, 'Doctor name is required'),
  chiefComplaint: z.string().min(5, 'Chief complaint must be at least 5 characters'),
  fee: z.coerce.number().min(0, 'Fee must be a positive number'),
});

type VisitFormData = z.infer<typeof visitSchema>;

interface CreateVisitModalProps {
  onClose: () => void;
}

export default function CreateVisitModal({ onClose }: CreateVisitModalProps) {
  const { patients, visits, addVisit } = useDataStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<VisitFormData>({
    resolver: zodResolver(visitSchema),
    defaultValues: {
      doctorName: 'Dr. Haiat',
      fee: 800,
    },
  });

  const selectedPatientId = watch('patientId');
  const selectedPatient = patients.find((p) => p.id === selectedPatientId);

  const onSubmit = async (data: VisitFormData) => {
    const patient = patients.find((p) => p.id === data.patientId);
    if (!patient) return;

    const newVisit: OPDVisit = {
      id: crypto.randomUUID(),
      visitId: generateId('OPD', visits.length),
      patientId: patient.id,
      patientName: patient.name,
      doctorId: 'd1',
      doctorName: data.doctorName,
      chiefComplaint: data.chiefComplaint,
      visitDate: new Date().toISOString(),
      status: 'waiting',
      fee: data.fee,
    };

    addVisit(newVisit);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Create New Visit</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Patient <span className="text-red-500">*</span>
            </label>
            <select {...register('patientId')} className="input-field">
              <option value="">Choose a patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.patientId} - {patient.name} ({patient.age}y, {patient.gender})
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
                {selectedPatient.bloodGroup && (
                  <p className="text-sm text-blue-900">
                    <span className="font-medium">Blood Group:</span> {selectedPatient.bloodGroup}
                  </p>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Doctor Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register('doctorName')}
              type="text"
              className="input-field"
              placeholder="Dr. Haiat"
            />
            {errors.doctorName && (
              <p className="mt-1 text-sm text-red-600">{errors.doctorName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chief Complaint <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('chiefComplaint')}
              rows={4}
              className="input-field resize-none"
              placeholder="Describe the patient's main complaint or reason for visit..."
            />
            {errors.chiefComplaint && (
              <p className="mt-1 text-sm text-red-600">{errors.chiefComplaint.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Consultation Fee (BDT) <span className="text-red-500">*</span>
            </label>
            <input
              {...register('fee')}
              type="number"
              className="input-field"
              placeholder="800"
            />
            {errors.fee && (
              <p className="mt-1 text-sm text-red-600">{errors.fee.message}</p>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Note:</span> The visit will be created with status "Waiting". 
              You can update the diagnosis, prescription, and status later from the visit details.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Visit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
