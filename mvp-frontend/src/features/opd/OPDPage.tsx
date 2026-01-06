import { useState, useMemo } from 'react';
import { Plus, Search, Eye, Edit2, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useDataStore } from '../../store';
import { formatDate } from '../../utils';
import type { OPDVisit } from '../../types';
import CreateVisitModal from './CreateVisitModal';
import VisitDetailsModal from './VisitDetailsModal';

export default function OPDPage() {
  const { visits, patients } = useDataStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('today');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<OPDVisit | null>(null);

  const filteredVisits = useMemo(() => {
    return visits.filter((visit) => {
      const matchesSearch =
        visit.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visit.visitId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visit.doctorName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || visit.status === statusFilter;

      const visitDate = new Date(visit.visitDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      let matchesDate = true;
      if (dateFilter === 'today') {
        matchesDate = visitDate >= today && visitDate < tomorrow;
      } else if (dateFilter === 'week') {
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        matchesDate = visitDate >= weekAgo;
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [visits, searchQuery, statusFilter, dateFilter]);

  const getStatusBadge = (status: string) => {
    const badges = {
      waiting: 'bg-yellow-100 text-yellow-700',
      'in-progress': 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'waiting':
        return <Clock className="h-4 w-4" />;
      case 'in-progress':
        return <Edit2 className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">OPD Visits</h1>
          <p className="text-gray-500">Manage outpatient department visits</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center"
          disabled={patients.length === 0}
        >
          <Plus className="h-5 w-5 mr-2" />
          New Visit
        </button>
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient, visit ID, or doctor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <div className="flex items-center gap-4">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="input-field"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="all">All Time</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="waiting">Waiting</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <div className="text-sm text-gray-600 whitespace-nowrap">
              {filteredVisits.length} visit(s)
            </div>
          </div>
        </div>

        {filteredVisits.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">
              {visits.length === 0
                ? 'No visits yet. Create your first visit to get started.'
                : 'No visits match your search criteria.'}
            </p>
            {visits.length === 0 && patients.length > 0 && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary"
              >
                Create First Visit
              </button>
            )}
            {patients.length === 0 && (
              <p className="text-sm text-gray-500">
                Add patients first before creating visits
              </p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Visit ID
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Patient
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Doctor
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Chief Complaint
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Date & Time
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredVisits.map((visit) => (
                  <tr
                    key={visit.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm font-medium text-primary-600">
                        {visit.visitId}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">
                        {visit.patientName}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {visit.doctorName}
                    </td>
                    <td className="py-3 px-4">
                      <div className="max-w-xs truncate text-gray-700">
                        {visit.chiefComplaint}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div className="text-gray-900">
                          {formatDate(visit.visitDate)}
                        </div>
                        <div className="text-gray-500">
                          {new Date(visit.visitDate).toLocaleTimeString('en-BD', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                          visit.status
                        )}`}
                      >
                        {getStatusIcon(visit.status)}
                        {visit.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedVisit(visit)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="View/Edit Details"
                        >
                          <Eye className="h-4 w-4" />
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

      {showCreateModal && (
        <CreateVisitModal onClose={() => setShowCreateModal(false)} />
      )}

      {selectedVisit && (
        <VisitDetailsModal
          visit={selectedVisit}
          onClose={() => setSelectedVisit(null)}
        />
      )}
    </div>
  );
}
