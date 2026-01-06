import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit2, Mail, Phone, MapPin, Droplet, Calendar, Activity } from 'lucide-react';
import { useDataStore } from '../../store';
import { formatDate, formatCurrency } from '../../utils';
import { useState } from 'react';
import EditPatientModal from './EditPatientModal';

export default function PatientProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { patients, visits, bills } = useDataStore();
  const [showEditModal, setShowEditModal] = useState(false);

  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Patient not found</p>
        <Link to="/patients" className="btn-primary">
          Back to Patients
        </Link>
      </div>
    );
  }

  const patientVisits = visits.filter((v) => v.patientId === patient.id);
  const patientBills = bills.filter((b) => b.patientId === patient.id);
  const totalSpent = patientBills.reduce((sum, b) => sum + b.total, 0);
  const pendingAmount = patientBills
    .filter((b) => b.status !== 'paid')
    .reduce((sum, b) => sum + b.balance, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/patients')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Patients
        </button>
        <button
          onClick={() => setShowEditModal(true)}
          className="btn-primary flex items-center"
        >
          <Edit2 className="h-5 w-5 mr-2" />
          Edit Patient
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="card">
            <div className="text-center mb-6">
              <div className="h-24 w-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary-600">
                  {patient.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {patient.name}
              </h2>
              <p className="text-sm font-mono text-primary-600 font-medium">
                {patient.patientId}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Age & Gender</p>
                  <p className="font-medium text-gray-900">
                    {patient.age} years • {patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{patient.phone}</p>
                </div>
              </div>

              {patient.email && (
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900 break-all">
                      {patient.email}
                    </p>
                  </div>
                </div>
              )}

              {patient.bloodGroup && (
                <div className="flex items-start">
                  <Droplet className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Blood Group</p>
                    <p className="font-medium text-gray-900">
                      {patient.bloodGroup}
                    </p>
                  </div>
                </div>
              )}

              {patient.address && (
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium text-gray-900">{patient.address}</p>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">Registered On</p>
                <p className="font-medium text-gray-900">
                  {formatDate(patient.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Total Visits</p>
                <Activity className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {patientVisits.length}
              </p>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Total Spent</p>
                <Activity className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalSpent)}
              </p>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Pending</p>
                <Activity className="h-5 w-5 text-orange-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(pendingAmount)}
              </p>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Visit History
            </h3>
            {patientVisits.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No visits recorded yet
              </p>
            ) : (
              <div className="space-y-3">
                {patientVisits.map((visit) => (
                  <div
                    key={visit.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">
                          {visit.visitId}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(visit.visitDate)}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          visit.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : visit.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-700'
                            : visit.status === 'cancelled'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {visit.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Doctor:</span>{' '}
                      {visit.doctorName}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Complaint:</span>{' '}
                      {visit.chiefComplaint}
                    </p>
                    {visit.diagnosis && (
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Diagnosis:</span>{' '}
                        {visit.diagnosis}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Billing History
            </h3>
            {patientBills.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No bills recorded yet
              </p>
            ) : (
              <div className="space-y-3">
                {patientBills.map((bill) => (
                  <div
                    key={bill.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{bill.billNo}</p>
                        <p className="text-sm text-gray-500">
                          {formatDate(bill.date)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatCurrency(bill.total)}
                        </p>
                        <span
                          className={`text-xs font-medium ${
                            bill.status === 'paid'
                              ? 'text-green-600'
                              : bill.status === 'partial'
                              ? 'text-orange-600'
                              : 'text-red-600'
                          }`}
                        >
                          {bill.status === 'paid'
                            ? 'Paid'
                            : bill.status === 'partial'
                            ? `Pending: ${formatCurrency(bill.balance)}`
                            : 'Unpaid'}
                        </span>
                      </div>
                    </div>
                    {bill.paymentMethod && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Payment:</span>{' '}
                        {bill.paymentMethod.replace('-', ' ').toUpperCase()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditPatientModal
          patient={patient}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}
