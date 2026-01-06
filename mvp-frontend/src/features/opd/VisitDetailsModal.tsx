import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, User, Calendar, Stethoscope, FileText, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDataStore } from '../../store';
import { formatDate, formatCurrency } from '../../utils';
import type { OPDVisit } from '../../types';

const visitUpdateSchema = z.object({
  diagnosis: z.string().optional(),
  prescription: z.string().optional(),
  status: z.enum(['waiting', 'in-progress', 'completed', 'cancelled']),
});

type VisitUpdateData = z.infer<typeof visitUpdateSchema>;

interface VisitDetailsModalProps {
  visit: OPDVisit;
  onClose: () => void;
}

export default function VisitDetailsModal({ visit, onClose }: VisitDetailsModalProps) {
  const { updateVisit, patients } = useDataStore();
  const [isEditing, setIsEditing] = useState(false);

  const patient = patients.find((p) => p.id === visit.patientId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VisitUpdateData>({
    resolver: zodResolver(visitUpdateSchema),
    defaultValues: {
      diagnosis: visit.diagnosis || '',
      prescription: visit.prescription || '',
      status: visit.status,
    },
  });

  const onSubmit = async (data: VisitUpdateData) => {
    updateVisit(visit.id, {
      diagnosis: data.diagnosis || undefined,
      prescription: data.prescription || undefined,
      status: data.status,
    });
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Visit Details</h2>
            <p className="text-sm text-gray-500 mt-1">
              Visit ID: {visit.visitId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Patient Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Patient Information
              </h3>
              {patient && (
                <Link
                  to={`/patients/${patient.id}`}
                  className="text-sm text-primary-600 hover:text-primary-700"
                  onClick={onClose}
                >
                  View Profile →
                </Link>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium text-gray-900">{visit.patientName}</p>
              </div>
              {patient && (
                <>
                  <div>
                    <p className="text-sm text-gray-600">Age & Gender</p>
                    <p className="font-medium text-gray-900">
                      {patient.age}y, {patient.gender}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium text-gray-900">{patient.phone}</p>
                  </div>
                  {patient.bloodGroup && (
                    <div>
                      <p className="text-sm text-gray-600">Blood Group</p>
                      <p className="font-medium text-gray-900">{patient.bloodGroup}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Visit Information */}
          <div>
            <h3 className="font-semibold text-gray-900 flex items-center mb-3">
              <Calendar className="h-5 w-5 mr-2" />
              Visit Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Doctor</p>
                <p className="font-medium text-gray-900">{visit.doctorName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date & Time</p>
                <p className="font-medium text-gray-900">
                  {formatDate(visit.visitDate)} at{' '}
                  {new Date(visit.visitDate).toLocaleTimeString('en-BD', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Consultation Fee</p>
                <p className="font-medium text-gray-900">{formatCurrency(visit.fee)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    visit.status
                  )}`}
                >
                  <Clock className="h-3 w-3" />
                  {visit.status.replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Chief Complaint */}
          <div>
            <h3 className="font-semibold text-gray-900 flex items-center mb-2">
              <FileText className="h-5 w-5 mr-2" />
              Chief Complaint
            </h3>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
              {visit.chiefComplaint}
            </p>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 border-t pt-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  <Stethoscope className="inline h-4 w-4 mr-1" />
                  Diagnosis
                </label>
                {!isEditing && visit.status !== 'completed' && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Edit Details
                  </button>
                )}
              </div>
              <textarea
                {...register('diagnosis')}
                rows={3}
                className="input-field resize-none"
                placeholder="Enter diagnosis..."
                disabled={!isEditing}
              />
              {errors.diagnosis && (
                <p className="mt-1 text-sm text-red-600">{errors.diagnosis.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="inline h-4 w-4 mr-1" />
                Prescription
              </label>
              <textarea
                {...register('prescription')}
                rows={4}
                className="input-field resize-none"
                placeholder="Enter prescription and treatment plan..."
                disabled={!isEditing}
              />
              {errors.prescription && (
                <p className="mt-1 text-sm text-red-600">{errors.prescription.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Update Status
              </label>
              <select
                {...register('status')}
                className="input-field"
                disabled={!isEditing}
              >
                <option value="waiting">Waiting</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {isEditing && (
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </form>

          {!isEditing && (
            <div className="flex items-center justify-end pt-4 border-t border-gray-200">
              <button onClick={onClose} className="btn-secondary">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
