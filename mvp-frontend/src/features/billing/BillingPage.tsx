import { useState, useMemo } from 'react';
import { Plus, Search, Eye, DollarSign, AlertCircle } from 'lucide-react';
import { useDataStore } from '../../store';
import { formatDate, formatCurrency } from '../../utils';
import type { Bill } from '../../types';
import CreateInvoiceModal from './CreateInvoiceModal';
import InvoiceDetailsModal from './InvoiceDetailsModal';

export default function BillingPage() {
  const { bills, patients } = useDataStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('today');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  const filteredBills = useMemo(() => {
    return bills.filter((bill) => {
      const matchesSearch =
        bill.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.billNo.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || bill.status === statusFilter;

      const billDate = new Date(bill.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      let matchesDate = true;
      if (dateFilter === 'today') {
        matchesDate = billDate >= today && billDate < tomorrow;
      } else if (dateFilter === 'week') {
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        matchesDate = billDate >= weekAgo;
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [bills, searchQuery, statusFilter, dateFilter]);

  const totalRevenue = filteredBills.reduce((sum, b) => sum + b.total, 0);
  const paidAmount = filteredBills.reduce((sum, b) => sum + b.paid, 0);
  const pendingAmount = filteredBills.reduce((sum, b) => sum + b.balance, 0);

  const getStatusBadge = (status: string) => {
    const badges = {
      paid: 'bg-green-100 text-green-700',
      partial: 'bg-orange-100 text-orange-700',
      unpaid: 'bg-red-100 text-red-700',
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing & Invoicing</h1>
          <p className="text-gray-500">Manage invoices and payments</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center"
          disabled={patients.length === 0}
        >
          <Plus className="h-5 w-5 mr-2" />
          New Invoice
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <DollarSign className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(totalRevenue)}
          </p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Collected</p>
            <DollarSign className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(paidAmount)}
          </p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Pending</p>
            <AlertCircle className="h-5 w-5 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(pendingAmount)}
          </p>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient or invoice number..."
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
              <option value="paid">Paid</option>
              <option value="partial">Partial</option>
              <option value="unpaid">Unpaid</option>
            </select>

            <div className="text-sm text-gray-600 whitespace-nowrap">
              {filteredBills.length} invoice(s)
            </div>
          </div>
        </div>

        {filteredBills.length === 0 ? (
          <div className="text-center py-12">
            <DollarSign className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">
              {bills.length === 0
                ? 'No invoices yet. Create your first invoice to get started.'
                : 'No invoices match your search criteria.'}
            </p>
            {bills.length === 0 && patients.length > 0 && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary"
              >
                Create First Invoice
              </button>
            )}
            {patients.length === 0 && (
              <p className="text-sm text-gray-500">
                Add patients first before creating invoices
              </p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Invoice No
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Patient
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Date
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    Total
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    Paid
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    Balance
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
                {filteredBills.map((bill) => (
                  <tr
                    key={bill.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm font-medium text-primary-600">
                        {bill.billNo}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">
                        {bill.patientName}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {formatDate(bill.date)}
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-gray-900">
                      {formatCurrency(bill.total)}
                    </td>
                    <td className="py-3 px-4 text-right text-green-600">
                      {formatCurrency(bill.paid)}
                    </td>
                    <td className="py-3 px-4 text-right text-orange-600">
                      {formatCurrency(bill.balance)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                          bill.status
                        )}`}
                      >
                        {bill.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedBill(bill)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="View/Edit Invoice"
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
        <CreateInvoiceModal onClose={() => setShowCreateModal(false)} />
      )}

      {selectedBill && (
        <InvoiceDetailsModal
          bill={selectedBill}
          onClose={() => setSelectedBill(null)}
        />
      )}
    </div>
  );
}
