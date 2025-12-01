import React, { useState } from 'react';
import { 
  ChevronRight, ChevronDown, Plus, Search, Download, Filter, RefreshCw,
  Edit, Eye, X, AlertCircle, CheckCircle, Clock, ChevronLeft, Send,
  TrendingUp, TrendingDown, Users, Building2, FileText, DollarSign,
  ArrowUpRight, ArrowDownLeft, Calendar, Mail, Phone, ExternalLink,
  CheckSquare, XSquare, MessageSquare, Paperclip, MoreVertical,
  AlertTriangle, CreditCard, Receipt, Banknote, UserCheck, History,
  PieChart, BarChart3, ArrowRight, Circle, Wallet
} from 'lucide-react';

// ============================================================
// SHARED COMPONENTS
// ============================================================
const Tabs = ({ tabs, active, onChange }) => (
  <div className="flex border-b border-slate-200 overflow-x-auto">
    {tabs.map(tab => (
      <button key={tab.id} onClick={() => onChange(tab.id)}
        className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
          active === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
        }`}>
        {tab.label}
        {tab.badge && <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${tab.badgeColor || 'bg-slate-100 text-slate-600'}`}>{tab.badge}</span>}
      </button>
    ))}
  </div>
);

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;
  const sizes = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl', xl: 'max-w-6xl' };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className={`bg-white rounded-xl shadow-xl w-full ${sizes[size]} max-h-[90vh] overflow-hidden flex flex-col`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    paid: 'bg-emerald-100 text-emerald-700',
    partial: 'bg-blue-100 text-blue-700',
    open: 'bg-amber-100 text-amber-700',
    overdue: 'bg-red-100 text-red-700',
    pending: 'bg-amber-100 text-amber-700',
    approved: 'bg-emerald-100 text-emerald-700',
    rejected: 'bg-red-100 text-red-700',
    draft: 'bg-slate-100 text-slate-600',
    cancelled: 'bg-slate-100 text-slate-500',
  };
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-slate-100'}`}>{status?.charAt(0).toUpperCase() + status?.slice(1)}</span>;
};

const StatCard = ({ title, value, subtitle, icon: Icon, color = 'blue', trend, onClick }) => (
  <div onClick={onClick} className={`bg-white rounded-xl border border-slate-200 p-5 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        {subtitle && <p className={`text-xs mt-1 flex items-center gap-1 ${trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-500' : 'text-slate-400'}`}>
          {trend === 'up' && <TrendingUp size={12} />}{trend === 'down' && <TrendingDown size={12} />}{subtitle}
        </p>}
      </div>
      <div className={`p-3 rounded-lg ${color === 'blue' ? 'bg-blue-50' : color === 'green' ? 'bg-emerald-50' : color === 'amber' ? 'bg-amber-50' : color === 'red' ? 'bg-red-50' : 'bg-slate-50'}`}>
        <Icon size={20} className={`${color === 'blue' ? 'text-blue-600' : color === 'green' ? 'text-emerald-600' : color === 'amber' ? 'text-amber-600' : color === 'red' ? 'text-red-600' : 'text-slate-600'}`} />
      </div>
    </div>
  </div>
);

// Aging Bar Component
const AgingBar = ({ current, days30, days60, days90, days120 }) => {
  const total = current + days30 + days60 + days90 + days120;
  if (total === 0) return <div className="h-2 bg-slate-100 rounded-full" />;
  
  return (
    <div className="h-2 rounded-full overflow-hidden flex">
      {current > 0 && <div style={{ width: `${(current/total)*100}%` }} className="bg-emerald-500" title={`Current: $${current.toLocaleString()}`} />}
      {days30 > 0 && <div style={{ width: `${(days30/total)*100}%` }} className="bg-blue-500" title={`1-30: $${days30.toLocaleString()}`} />}
      {days60 > 0 && <div style={{ width: `${(days60/total)*100}%` }} className="bg-amber-500" title={`31-60: $${days60.toLocaleString()}`} />}
      {days90 > 0 && <div style={{ width: `${(days90/total)*100}%` }} className="bg-orange-500" title={`61-90: $${days90.toLocaleString()}`} />}
      {days120 > 0 && <div style={{ width: `${(days120/total)*100}%` }} className="bg-red-500" title={`90+: $${days120.toLocaleString()}`} />}
    </div>
  );
};

// ============================================================
// AR AGING VIEW
// ============================================================
const ARAgingView = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [viewMode, setViewMode] = useState('summary'); // summary, detail
  
  const customers = [
    { id: 'C-001', name: 'ABC Corporation', contact: 'John Smith', email: 'john@abc.com', phone: '+1 555-0101', creditLimit: 500000, current: 125000, days30: 45000, days60: 12000, days90: 0, days120: 0, total: 182000, status: 'open' },
    { id: 'C-002', name: 'XYZ Industries', contact: 'Sarah Johnson', email: 'sarah@xyz.com', phone: '+1 555-0102', creditLimit: 300000, current: 85000, days30: 28000, days60: 15000, days90: 8500, days120: 0, total: 136500, status: 'open' },
    { id: 'C-003', name: 'Global Tech Ltd', contact: 'Mike Brown', email: 'mike@globaltech.com', phone: '+1 555-0103', creditLimit: 250000, current: 45000, days30: 0, days60: 22000, days90: 18000, days120: 12000, total: 97000, status: 'overdue' },
    { id: 'C-004', name: 'Prime Solutions', contact: 'Lisa Davis', email: 'lisa@prime.com', phone: '+1 555-0104', creditLimit: 400000, current: 195000, days30: 35000, days60: 0, days90: 0, days120: 0, total: 230000, status: 'open' },
    { id: 'C-005', name: 'Metro Services', contact: 'Tom Wilson', email: 'tom@metro.com', phone: '+1 555-0105', creditLimit: 150000, current: 0, days30: 15000, days60: 28000, days90: 35000, days120: 22000, total: 100000, status: 'overdue' },
  ];

  const totalAR = customers.reduce((s, c) => s + c.total, 0);
  const totalCurrent = customers.reduce((s, c) => s + c.current, 0);
  const totalOverdue = customers.reduce((s, c) => s + c.days60 + c.days90 + c.days120, 0);
  const avgDSO = 42; // Days Sales Outstanding

  if (selectedCustomer) {
    return <CustomerDetailView customer={selectedCustomer} onBack={() => setSelectedCustomer(null)} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Accounts Receivable Aging</h2>
          <p className="text-sm text-slate-500">Customer balances and aging analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
            <Mail size={16} /> Send Reminders
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total Receivables" value={`$${(totalAR/1000).toFixed(0)}K`} subtitle="+12% vs last month" trend="up" icon={DollarSign} color="blue" />
        <StatCard title="Current (0-30)" value={`$${(totalCurrent/1000).toFixed(0)}K`} subtitle={`${((totalCurrent/totalAR)*100).toFixed(0)}% of total`} icon={CheckCircle} color="green" />
        <StatCard title="Overdue (60+)" value={`$${(totalOverdue/1000).toFixed(0)}K`} subtitle="Needs attention" icon={AlertTriangle} color="red" />
        <StatCard title="Avg DSO" value={`${avgDSO} days`} subtitle="-3 days vs target" trend="up" icon={Calendar} color="amber" />
      </div>

      {/* Aging Summary Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-slate-900">Aging Distribution</h3>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1"><Circle size={8} fill="#22c55e" className="text-emerald-500" /> Current</span>
            <span className="flex items-center gap-1"><Circle size={8} fill="#3b82f6" className="text-blue-500" /> 1-30</span>
            <span className="flex items-center gap-1"><Circle size={8} fill="#f59e0b" className="text-amber-500" /> 31-60</span>
            <span className="flex items-center gap-1"><Circle size={8} fill="#f97316" className="text-orange-500" /> 61-90</span>
            <span className="flex items-center gap-1"><Circle size={8} fill="#ef4444" className="text-red-500" /> 90+</span>
          </div>
        </div>
        <AgingBar 
          current={totalCurrent} 
          days30={customers.reduce((s,c) => s + c.days30, 0)}
          days60={customers.reduce((s,c) => s + c.days60, 0)}
          days90={customers.reduce((s,c) => s + c.days90, 0)}
          days120={customers.reduce((s,c) => s + c.days120, 0)}
        />
        <div className="grid grid-cols-5 gap-4 mt-4 text-center">
          <div><p className="text-lg font-bold text-emerald-600">${(totalCurrent/1000).toFixed(0)}K</p><p className="text-xs text-slate-500">Current</p></div>
          <div><p className="text-lg font-bold text-blue-600">${(customers.reduce((s,c) => s + c.days30, 0)/1000).toFixed(0)}K</p><p className="text-xs text-slate-500">1-30 Days</p></div>
          <div><p className="text-lg font-bold text-amber-600">${(customers.reduce((s,c) => s + c.days60, 0)/1000).toFixed(0)}K</p><p className="text-xs text-slate-500">31-60 Days</p></div>
          <div><p className="text-lg font-bold text-orange-600">${(customers.reduce((s,c) => s + c.days90, 0)/1000).toFixed(0)}K</p><p className="text-xs text-slate-500">61-90 Days</p></div>
          <div><p className="text-lg font-bold text-red-600">${(customers.reduce((s,c) => s + c.days120, 0)/1000).toFixed(0)}K</p><p className="text-xs text-slate-500">90+ Days</p></div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg">
          <Search size={18} className="text-slate-400" />
          <input type="text" placeholder="Search customers..." className="flex-1 outline-none text-sm" />
        </div>
        <select className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white">
          <option>All Status</option>
          <option>Current</option>
          <option>Overdue</option>
        </select>
        <select className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white">
          <option>All Aging</option>
          <option>0-30 Days</option>
          <option>31-60 Days</option>
          <option>61-90 Days</option>
          <option>90+ Days</option>
        </select>
      </div>

      {/* Customer Aging Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Customer</th>
              <th className="px-4 py-3 text-right font-medium">Current</th>
              <th className="px-4 py-3 text-right font-medium">1-30</th>
              <th className="px-4 py-3 text-right font-medium">31-60</th>
              <th className="px-4 py-3 text-right font-medium">61-90</th>
              <th className="px-4 py-3 text-right font-medium">90+</th>
              <th className="px-4 py-3 text-right font-medium">Total</th>
              <th className="px-4 py-3 text-left font-medium w-32">Aging</th>
              <th className="px-4 py-3 text-center font-medium w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {customers.map(customer => (
              <tr key={customer.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedCustomer(customer)}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-700">{customer.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{customer.name}</p>
                      <p className="text-xs text-slate-500">{customer.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-right font-medium text-emerald-600">{customer.current > 0 ? `$${customer.current.toLocaleString()}` : '-'}</td>
                <td className="px-4 py-3 text-sm text-right font-medium text-blue-600">{customer.days30 > 0 ? `$${customer.days30.toLocaleString()}` : '-'}</td>
                <td className="px-4 py-3 text-sm text-right font-medium text-amber-600">{customer.days60 > 0 ? `$${customer.days60.toLocaleString()}` : '-'}</td>
                <td className="px-4 py-3 text-sm text-right font-medium text-orange-600">{customer.days90 > 0 ? `$${customer.days90.toLocaleString()}` : '-'}</td>
                <td className="px-4 py-3 text-sm text-right font-medium text-red-600">{customer.days120 > 0 ? `$${customer.days120.toLocaleString()}` : '-'}</td>
                <td className="px-4 py-3 text-sm text-right font-bold text-slate-900">${customer.total.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <AgingBar current={customer.current} days30={customer.days30} days60={customer.days60} days90={customer.days90} days120={customer.days120} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button onClick={(e) => { e.stopPropagation(); }} className="p-1.5 hover:bg-slate-100 rounded" title="Send Statement">
                      <Mail size={16} className="text-slate-400" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); }} className="p-1.5 hover:bg-slate-100 rounded" title="View Details">
                      <Eye size={16} className="text-slate-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-50 font-bold">
            <tr>
              <td className="px-4 py-3 text-sm">TOTAL ({customers.length} customers)</td>
              <td className="px-4 py-3 text-sm text-right text-emerald-600">${totalCurrent.toLocaleString()}</td>
              <td className="px-4 py-3 text-sm text-right text-blue-600">${customers.reduce((s,c) => s + c.days30, 0).toLocaleString()}</td>
              <td className="px-4 py-3 text-sm text-right text-amber-600">${customers.reduce((s,c) => s + c.days60, 0).toLocaleString()}</td>
              <td className="px-4 py-3 text-sm text-right text-orange-600">${customers.reduce((s,c) => s + c.days90, 0).toLocaleString()}</td>
              <td className="px-4 py-3 text-sm text-right text-red-600">${customers.reduce((s,c) => s + c.days120, 0).toLocaleString()}</td>
              <td className="px-4 py-3 text-sm text-right">${totalAR.toLocaleString()}</td>
              <td colSpan={2}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

// ============================================================
// CUSTOMER DETAIL VIEW
// ============================================================
const CustomerDetailView = ({ customer, onBack }) => {
  const [activeTab, setActiveTab] = useState('invoices');
  
  const invoices = [
    { id: 'INV-2024-0892', date: '2024-11-20', dueDate: '2024-12-20', amount: 45000, paid: 0, balance: 45000, status: 'open', age: 5 },
    { id: 'INV-2024-0845', date: '2024-11-05', dueDate: '2024-12-05', amount: 38000, paid: 0, balance: 38000, status: 'open', age: 20 },
    { id: 'INV-2024-0798', date: '2024-10-15', dueDate: '2024-11-15', amount: 52000, paid: 40000, balance: 12000, status: 'partial', age: 40 },
    { id: 'INV-2024-0756', date: '2024-10-01', dueDate: '2024-10-31', amount: 87000, paid: 87000, balance: 0, status: 'paid', age: 55 },
  ];

  const payments = [
    { id: 'PAY-2024-0234', date: '2024-11-15', method: 'Bank Transfer', reference: 'TRF-445566', amount: 40000, invoices: ['INV-2024-0798'] },
    { id: 'PAY-2024-0198', date: '2024-11-01', method: 'Check', reference: 'CHK-7789', amount: 87000, invoices: ['INV-2024-0756'] },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-lg"><ChevronLeft size={20} /></button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-lg font-medium text-blue-700">{customer.name.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{customer.name}</h2>
              <p className="text-sm text-slate-500">{customer.id} • Credit Limit: ${customer.creditLimit.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
            <Mail size={16} /> Send Statement
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
            <Phone size={16} /> Contact
          </button>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-5 gap-4">
        <StatCard title="Total Outstanding" value={`$${customer.total.toLocaleString()}`} icon={DollarSign} color="blue" />
        <StatCard title="Credit Available" value={`$${(customer.creditLimit - customer.total).toLocaleString()}`} icon={CreditCard} color="green" />
        <StatCard title="Current Balance" value={`$${customer.current.toLocaleString()}`} icon={CheckCircle} color="green" />
        <StatCard title="Overdue Amount" value={`$${(customer.days60 + customer.days90 + customer.days120).toLocaleString()}`} icon={AlertTriangle} color="red" />
        <StatCard title="Open Invoices" value="3" icon={FileText} />
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="grid grid-cols-4 gap-4">
          <div><p className="text-xs text-slate-500">Contact Person</p><p className="text-sm font-medium">{customer.contact}</p></div>
          <div><p className="text-xs text-slate-500">Email</p><p className="text-sm font-medium text-blue-600">{customer.email}</p></div>
          <div><p className="text-xs text-slate-500">Phone</p><p className="text-sm font-medium">{customer.phone}</p></div>
          <div><p className="text-xs text-slate-500">Payment Terms</p><p className="text-sm font-medium">Net 30</p></div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs 
        tabs={[
          { id: 'invoices', label: 'Invoices', badge: '3' },
          { id: 'payments', label: 'Payments' },
          { id: 'history', label: 'History' },
        ]} 
        active={activeTab} 
        onChange={setActiveTab} 
      />

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Invoice #</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Due Date</th>
                <th className="px-4 py-3 text-right font-medium">Amount</th>
                <th className="px-4 py-3 text-right font-medium">Paid</th>
                <th className="px-4 py-3 text-right font-medium">Balance</th>
                <th className="px-4 py-3 text-center font-medium">Age</th>
                <th className="px-4 py-3 text-center font-medium">Status</th>
                <th className="px-4 py-3 text-center font-medium w-20">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium text-blue-600">{inv.id}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{inv.date}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{inv.dueDate}</td>
                  <td className="px-4 py-3 text-sm text-right font-medium">${inv.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right text-emerald-600">${inv.paid.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right font-bold">${inv.balance.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-center">
                    <span className={`${inv.age > 30 ? 'text-red-600' : inv.age > 15 ? 'text-amber-600' : 'text-slate-600'}`}>{inv.age} days</span>
                  </td>
                  <td className="px-4 py-3 text-center"><StatusBadge status={inv.status} /></td>
                  <td className="px-4 py-3">
                    <button className="p-1.5 hover:bg-slate-100 rounded"><Eye size={16} className="text-slate-400" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Payment #</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Method</th>
                <th className="px-4 py-3 text-left font-medium">Reference</th>
                <th className="px-4 py-3 text-right font-medium">Amount</th>
                <th className="px-4 py-3 text-left font-medium">Applied To</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map(pay => (
                <tr key={pay.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium text-blue-600">{pay.id}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{pay.date}</td>
                  <td className="px-4 py-3 text-sm text-slate-900">{pay.method}</td>
                  <td className="px-4 py-3 text-sm font-mono text-slate-500">{pay.reference}</td>
                  <td className="px-4 py-3 text-sm text-right font-bold text-emerald-600">${pay.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-blue-600">{pay.invoices.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ============================================================
// AP AGING VIEW
// ============================================================
const APAgingView = () => {
  const vendors = [
    { id: 'V-001', name: 'ABC Supplies Co', current: 45000, days30: 18000, days60: 0, days90: 0, days120: 0, total: 63000 },
    { id: 'V-002', name: 'Global Materials Ltd', current: 28000, days30: 15000, days60: 8500, days90: 0, days120: 0, total: 51500 },
    { id: 'V-003', name: 'Tech Equipment Inc', current: 0, days30: 35000, days60: 22000, days90: 12000, days120: 0, total: 69000 },
    { id: 'V-004', name: 'Office Solutions', current: 12000, days30: 5000, days60: 0, days90: 0, days120: 0, total: 17000 },
    { id: 'V-005', name: 'Industrial Parts Co', current: 0, days30: 0, days60: 15000, days90: 8000, days120: 5000, total: 28000 },
  ];

  const totalAP = vendors.reduce((s, v) => s + v.total, 0);
  const totalCurrent = vendors.reduce((s, v) => s + v.current, 0);
  const totalOverdue = vendors.reduce((s, v) => s + v.days60 + v.days90 + v.days120, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Accounts Payable Aging</h2>
          <p className="text-sm text-slate-500">Vendor balances and payment schedule</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total Payables" value={`$${(totalAP/1000).toFixed(0)}K`} icon={DollarSign} color="blue" />
        <StatCard title="Due This Week" value="$85K" subtitle="3 payments" icon={Calendar} color="amber" />
        <StatCard title="Overdue (60+)" value={`$${(totalOverdue/1000).toFixed(0)}K`} subtitle="Needs attention" icon={AlertTriangle} color="red" />
        <StatCard title="Available Discounts" value="$2.4K" subtitle="If paid early" icon={Banknote} color="green" />
      </div>

      {/* Vendor Aging Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Vendor</th>
              <th className="px-4 py-3 text-right font-medium">Current</th>
              <th className="px-4 py-3 text-right font-medium">1-30</th>
              <th className="px-4 py-3 text-right font-medium">31-60</th>
              <th className="px-4 py-3 text-right font-medium">61-90</th>
              <th className="px-4 py-3 text-right font-medium">90+</th>
              <th className="px-4 py-3 text-right font-medium">Total</th>
              <th className="px-4 py-3 text-left font-medium w-32">Aging</th>
              <th className="px-4 py-3 text-center font-medium w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {vendors.map(vendor => (
              <tr key={vendor.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Building2 size={18} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{vendor.name}</p>
                      <p className="text-xs text-slate-500">{vendor.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-right font-medium text-emerald-600">{vendor.current > 0 ? `$${vendor.current.toLocaleString()}` : '-'}</td>
                <td className="px-4 py-3 text-sm text-right font-medium text-blue-600">{vendor.days30 > 0 ? `$${vendor.days30.toLocaleString()}` : '-'}</td>
                <td className="px-4 py-3 text-sm text-right font-medium text-amber-600">{vendor.days60 > 0 ? `$${vendor.days60.toLocaleString()}` : '-'}</td>
                <td className="px-4 py-3 text-sm text-right font-medium text-orange-600">{vendor.days90 > 0 ? `$${vendor.days90.toLocaleString()}` : '-'}</td>
                <td className="px-4 py-3 text-sm text-right font-medium text-red-600">{vendor.days120 > 0 ? `$${vendor.days120.toLocaleString()}` : '-'}</td>
                <td className="px-4 py-3 text-sm text-right font-bold text-slate-900">${vendor.total.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <AgingBar current={vendor.current} days30={vendor.days30} days60={vendor.days60} days90={vendor.days90} days120={vendor.days120} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 hover:bg-slate-100 rounded"><Eye size={16} className="text-slate-400" /></button>
                    <button className="p-1.5 hover:bg-slate-100 rounded"><Banknote size={16} className="text-slate-400" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-50 font-bold">
            <tr>
              <td className="px-4 py-3 text-sm">TOTAL ({vendors.length} vendors)</td>
              <td className="px-4 py-3 text-sm text-right text-emerald-600">${totalCurrent.toLocaleString()}</td>
              <td className="px-4 py-3 text-sm text-right text-blue-600">${vendors.reduce((s,v) => s + v.days30, 0).toLocaleString()}</td>
              <td className="px-4 py-3 text-sm text-right text-amber-600">${vendors.reduce((s,v) => s + v.days60, 0).toLocaleString()}</td>
              <td className="px-4 py-3 text-sm text-right text-orange-600">${vendors.reduce((s,v) => s + v.days90, 0).toLocaleString()}</td>
              <td className="px-4 py-3 text-sm text-right text-red-600">${vendors.reduce((s,v) => s + v.days120, 0).toLocaleString()}</td>
              <td className="px-4 py-3 text-sm text-right">${totalAP.toLocaleString()}</td>
              <td colSpan={2}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

// ============================================================
// APPROVAL WORKFLOWS PAGE
// ============================================================
const ApprovalsPage = () => {
  const [activeFilter, setActiveFilter] = useState('pending');
  const [selectedItem, setSelectedItem] = useState(null);
  
  const approvalItems = [
    { id: 'APR-001', type: 'Invoice', docNo: 'INV-2024-0156', customer: 'ABC Corp', amount: 125000, requestedBy: 'John Smith', requestedAt: '2024-11-25 09:30', status: 'pending', priority: 'high', reason: 'Exceeds $100K threshold' },
    { id: 'APR-002', type: 'Credit Note', docNo: 'CN-2024-0089', customer: 'XYZ Ltd', amount: 15000, requestedBy: 'Sarah Johnson', requestedAt: '2024-11-25 10:15', status: 'pending', priority: 'medium', reason: 'Customer complaint - defective goods' },
    { id: 'APR-003', type: 'Payment', docNo: 'PAY-2024-0445', vendor: 'Global Materials', amount: 89000, requestedBy: 'Mike Brown', requestedAt: '2024-11-24 16:45', status: 'pending', priority: 'high', reason: 'Urgent - Avoid late fee' },
    { id: 'APR-004', type: 'Invoice', docNo: 'INV-2024-0152', customer: 'Tech Solutions', amount: 45000, requestedBy: 'Lisa Davis', requestedAt: '2024-11-24 14:20', status: 'approved', priority: 'low', approvedBy: 'Admin', approvedAt: '2024-11-24 15:00' },
    { id: 'APR-005', type: 'Payment', docNo: 'PAY-2024-0440', vendor: 'Office Supplies', amount: 12500, requestedBy: 'Tom Wilson', requestedAt: '2024-11-23 11:00', status: 'rejected', priority: 'low', rejectedBy: 'Admin', rejectedAt: '2024-11-23 14:30', rejectReason: 'Duplicate payment request' },
  ];

  const pendingCount = approvalItems.filter(i => i.status === 'pending').length;
  const filteredItems = activeFilter === 'all' ? approvalItems : approvalItems.filter(i => i.status === activeFilter);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Approval Workflows</h2>
          <p className="text-sm text-slate-500">Invoices, credit notes, and payments awaiting approval</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Pending Approvals" value={pendingCount.toString()} subtitle="Requires action" icon={Clock} color="amber" />
        <StatCard title="Approved Today" value="5" icon={CheckCircle} color="green" />
        <StatCard title="Rejected Today" value="1" icon={XSquare} color="red" />
        <StatCard title="Avg. Approval Time" value="2.4 hrs" icon={History} />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {[
          { id: 'pending', label: 'Pending', count: pendingCount },
          { id: 'approved', label: 'Approved' },
          { id: 'rejected', label: 'Rejected' },
          { id: 'all', label: 'All' },
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 text-sm rounded-lg ${activeFilter === filter.id ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 hover:bg-slate-50'}`}
          >
            {filter.label}
            {filter.count && <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-white/20">{filter.count}</span>}
          </button>
        ))}
      </div>

      {/* Approval Items */}
      <div className="space-y-3">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${item.type === 'Invoice' ? 'bg-blue-50' : item.type === 'Credit Note' ? 'bg-amber-50' : 'bg-emerald-50'}`}>
                  {item.type === 'Invoice' ? <FileText size={24} className="text-blue-600" /> :
                   item.type === 'Credit Note' ? <Receipt size={24} className="text-amber-600" /> :
                   <Banknote size={24} className="text-emerald-600" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-slate-900">{item.type}: {item.docNo}</h3>
                    {item.priority === 'high' && <span className="px-2 py-0.5 text-xs rounded bg-red-100 text-red-700">High Priority</span>}
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{item.customer || item.vendor}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Requested by {item.requestedBy} • {item.requestedAt}
                  </p>
                  {item.reason && (
                    <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                      <AlertCircle size={12} /> {item.reason}
                    </p>
                  )}
                  {item.rejectReason && (
                    <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                      <XSquare size={12} /> Rejected: {item.rejectReason}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900">${item.amount.toLocaleString()}</p>
                {item.status === 'pending' && (
                  <div className="flex items-center gap-2 mt-3">
                    <button onClick={() => setSelectedItem({ ...item, action: 'reject' })} className="flex items-center gap-1 px-3 py-1.5 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50">
                      <XSquare size={16} /> Reject
                    </button>
                    <button onClick={() => setSelectedItem({ ...item, action: 'approve' })} className="flex items-center gap-1 px-3 py-1.5 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                      <CheckSquare size={16} /> Approve
                    </button>
                  </div>
                )}
                {item.status === 'approved' && (
                  <p className="text-xs text-emerald-600 mt-2">Approved by {item.approvedBy}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Approval Modal */}
      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.action === 'approve' ? 'Approve Request' : 'Reject Request'} size="sm">
        {selectedItem && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-slate-500">Document</p><p className="font-medium">{selectedItem.docNo}</p></div>
                <div><p className="text-slate-500">Amount</p><p className="font-medium">${selectedItem.amount.toLocaleString()}</p></div>
                <div><p className="text-slate-500">Type</p><p className="font-medium">{selectedItem.type}</p></div>
                <div><p className="text-slate-500">Requested By</p><p className="font-medium">{selectedItem.requestedBy}</p></div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {selectedItem.action === 'approve' ? 'Comments (Optional)' : 'Rejection Reason *'}
              </label>
              <textarea rows={3} placeholder={selectedItem.action === 'approve' ? 'Add any comments...' : 'Please provide a reason for rejection...'} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <button onClick={() => setSelectedItem(null)} className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
              <button className={`px-4 py-2 text-sm text-white rounded-lg ${selectedItem.action === 'approve' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'}`}>
                {selectedItem.action === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// ============================================================
// MAIN FINANCE LITE MODULE
// ============================================================
export default function FinanceLiteModule() {
  const [activeTab, setActiveTab] = useState('ar');

  const tabs = [
    { id: 'ar', label: 'AR Aging', badge: '5', badgeColor: 'bg-blue-100 text-blue-600' },
    { id: 'ap', label: 'AP Aging' },
    { id: 'approvals', label: 'Approvals', badge: '3', badgeColor: 'bg-amber-100 text-amber-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100"><CreditCard size={24} className="text-purple-600" /></div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Finance Lite</h1>
              <p className="text-sm text-slate-500">AR/AP Views & Approval Workflows</p>
            </div>
          </div>
        </div>
        <div className="px-6"><Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} /></div>
      </div>

      <div className="p-6">
        {activeTab === 'ar' && <ARAgingView />}
        {activeTab === 'ap' && <APAgingView />}
        {activeTab === 'approvals' && <ApprovalsPage />}
      </div>
    </div>
  );
}
