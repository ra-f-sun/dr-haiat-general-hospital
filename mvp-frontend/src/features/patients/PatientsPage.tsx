import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit2, Eye, Trash2, Users } from 'lucide-react';
import { useDataStore } from '../../store';
import type { Patient } from '../../types';
import AddPatientModal from './AddPatientModal';
import EditPatientModal from './EditPatientModal';

export default function PatientsPage() {
  const { patients, deletePatient } = useDataStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.phone.includes(searchQuery);

      const matchesGender =
        genderFilter === 'all' || patient.gender === genderFilter;

      return matchesSearch && matchesGender;
    });
  }, [patients, searchQuery, genderFilter]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this patient?')) {
      deletePatient(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-500">Manage patient records</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Patient
        </button>
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, ID, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <div className="flex items-center gap-4">
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <div className="text-sm text-gray-600">
              {filteredPatients.length} patient(s)
            </div>
          </div>
        </div>

        {filteredPatients.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">
              {patients.length === 0
                ? 'No patients yet. Add your first patient to get started.'
                : 'No patients match your search criteria.'}
            </p>
            {patients.length === 0 && (
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-primary"
              >
                Add First Patient
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Patient ID
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Age
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Gender
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Phone
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Blood Group
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm font-medium text-primary-600">
                        {patient.patientId}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">
                        {patient.name}
                      </div>
                      {patient.email && (
                        <div className="text-sm text-gray-500">
                          {patient.email}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{patient.age}</td>
                    <td className="py-3 px-4">
                      <span className="capitalize text-gray-700">
                        {patient.gender}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{patient.phone}</td>
                    <td className="py-3 px-4 text-gray-700">
                      {patient.bloodGroup || '-'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/patients/${patient.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => setEditingPatient(patient)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(patient.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddModal && (
        <AddPatientModal onClose={() => setShowAddModal(false)} />
      )}

      {editingPatient && (
        <EditPatientModal
          patient={editingPatient}
          onClose={() => setEditingPatient(null)}
        />
      )}
    </div>
  );
}
