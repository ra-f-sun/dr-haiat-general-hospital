import { Users, Calendar, DollarSign, FileText, Download, UserPlus, FileText as FileTextIcon, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '../../store';
import { formatCurrency } from '../../utils';
import { generateSamplePatients, generateSampleVisits, generateSampleBills } from '../../lib/sampleData';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { patients, visits, bills, addPatient, addVisit, addBill } = useDataStore();

  const loadSampleData = () => {
    if (confirm('This will add sample data to the system. Continue?')) {
      const samplePatients = generateSamplePatients();
      const sampleVisits = generateSampleVisits();
      const sampleBills = generateSampleBills();

      samplePatients.forEach((patient) => addPatient(patient));
      sampleVisits.forEach((visit) => addVisit(visit));
      sampleBills.forEach((bill) => addBill(bill));

      alert('Sample data loaded successfully!');
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const todayVisits = visits.filter((v) => v.visitDate.startsWith(today));
  const todayRevenue = bills
    .filter((b) => b.date.startsWith(today))
    .reduce((sum, b) => sum + b.total, 0);
  const pendingBills = bills.filter((b) => b.status !== 'paid').length;

  const stats = [
    {
      label: 'Total Patients',
      value: patients.length,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      label: "Today's Visits",
      value: todayVisits.length,
      icon: Calendar,
      color: 'bg-green-500',
    },
    {
      label: "Today's Revenue",
      value: formatCurrency(todayRevenue),
      icon: DollarSign,
      color: 'bg-purple-500',
    },
    {
      label: 'Pending Bills',
      value: pendingBills,
      icon: FileText,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Overview of your hospital operations</p>
        </div>
        {patients.length === 0 && (
          <button
            onClick={loadSampleData}
            className="btn-primary flex items-center"
          >
            <Download className="h-5 w-5 mr-2" />
            Load Sample Data
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/patients')}
            className="flex items-center justify-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <UserPlus className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-900">Add New Patient</span>
          </button>
          <button
            onClick={() => navigate('/opd')}
            className="flex items-center justify-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
          >
            <ClipboardList className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-900">New OPD Visit</span>
          </button>
          <button
            onClick={() => navigate('/billing')}
            className="flex items-center justify-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
          >
            <FileTextIcon className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-900">Create Invoice</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Visits</h3>
          {todayVisits.length === 0 ? (
            <p className="text-gray-500 text-sm">No visits today yet</p>
          ) : (
            <div className="space-y-3">
              {todayVisits.slice(0, 5).map((visit) => (
                <div
                  key={visit.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{visit.patientName}</p>
                    <p className="text-sm text-gray-500">{visit.doctorName}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      visit.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : visit.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {visit.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Payments</h3>
          {pendingBills === 0 ? (
            <p className="text-gray-500 text-sm">No pending payments</p>
          ) : (
            <div className="space-y-3">
              {bills
                .filter((b) => b.status !== 'paid')
                .slice(0, 5)
                .map((bill) => (
                  <div
                    key={bill.id}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{bill.patientName}</p>
                      <p className="text-sm text-gray-500">{bill.billNo}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(bill.balance)}
                      </p>
                      <span className="text-xs text-red-600">Pending</span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
