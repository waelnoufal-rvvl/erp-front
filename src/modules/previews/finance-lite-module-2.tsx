'use client';

import React, { useState } from 'react';
import { 
  ChevronRight, Plus, Search, Download, Filter, RefreshCw, Eye, X, 
  AlertCircle, CheckCircle, Clock, ChevronLeft, Send, TrendingUp, 
  TrendingDown, FileText, DollarSign, Calendar, Mail, ExternalLink,
  CheckSquare, XSquare, MessageSquare, Paperclip, MoreVertical,
  AlertTriangle, CreditCard, Receipt, Banknote, Printer, Copy,
  ArrowRight, Circle, Wallet, PieChart, Users, Building2
} from 'lucide-react';

// Shared Components
const Tabs = ({ tabs, active, onChange }) => (
  <div className="flex border-b border-slate-200 overflow-x-auto">
    {tabs.map(tab => (
      <button key={tab.id} onClick={() => onChange(tab.id)}
        className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${active === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
        {tab.label}{tab.badge && <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${tab.badgeColor || 'bg-slate-100'}`}>{tab.badge}</span>}
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
    paid: 'bg-emerald-100 text-emerald-700', partial: 'bg-blue-100 text-blue-700',
    open: 'bg-amber-100 text-amber-700', overdue: 'bg-red-100 text-red-700',
    pending: 'bg-amber-100 text-amber-700', approved: 'bg-emerald-100 text-emerald-700',
    rejected: 'bg-red-100 text-red-700', draft: 'bg-slate-100 text-slate-600',
    cancelled: 'bg-slate-100 text-slate-500', processed: 'bg-emerald-100 text-emerald-700',
    scheduled: 'bg-blue-100 text-blue-700',
  };
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-slate-100'}`}>{status?.charAt(0).toUpperCase() + status?.slice(1)}</span>;
};

const StatCard = ({ title, value, subtitle = '', icon: Icon, color = 'blue', trend = 'neutral' }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        {subtitle && <p className={`text-xs mt-1 flex items-center gap-1 ${trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-500' : 'text-slate-400'}`}>
          {trend === 'up' && <TrendingUp size={12} />}{trend === 'down' && <TrendingDown size={12} />}{subtitle}
        </p>}
      </div>
      <div className={`p-3 rounded-lg ${color === 'blue' ? 'bg-blue-50' : color === 'green' ? 'bg-emerald-50' : color === 'amber' ? 'bg-amber-50' : color === 'red' ? 'bg-red-50' : 'bg-purple-50'}`}>
        <Icon size={20} className={`${color === 'blue' ? 'text-blue-600' : color === 'green' ? 'text-emerald-600' : color === 'amber' ? 'text-amber-600' : color === 'red' ? 'text-red-600' : 'text-purple-600'}`} />
      </div>
    </div>
  </div>
);

// ============================================================
// FINANCE LITE DASHBOARD
// ============================================================
const FinanceLiteDashboard = () => {
  const quickActions = [
    { icon: FileText, label: 'View AR Aging', color: 'blue' },
    { icon: Building2, label: 'View AP Aging', color: 'purple' },
    { icon: CheckSquare, label: 'Pending Approvals', color: 'amber', badge: '3' },
    { icon: Receipt, label: 'Credit Notes', color: 'orange' },
    { icon: Banknote, label: 'Payments', color: 'green' },
    { icon: Mail, label: 'Send Statements', color: 'slate' },
  ];

  const recentActivity = [
    { type: 'approval', desc: 'Invoice INV-2024-0156 approved', time: '10 mins ago', icon: CheckCircle, color: 'emerald' },
    { type: 'payment', desc: 'Payment $45,000 received from ABC Corp', time: '1 hour ago', icon: DollarSign, color: 'blue' },
    { type: 'overdue', desc: 'Invoice INV-2024-0098 is now overdue', time: '2 hours ago', icon: AlertTriangle, color: 'red' },
    { type: 'credit', desc: 'Credit Note CN-2024-0089 pending approval', time: '3 hours ago', icon: Receipt, color: 'amber' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold">Welcome to Finance Lite</h2>
        <p className="text-purple-100 mt-1">Quick access to AR/AP views and approvals for non-finance users</p>
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-purple-100 text-sm">Total Receivables</p>
            <p className="text-2xl font-bold">$745K</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-purple-100 text-sm">Total Payables</p>
            <p className="text-2xl font-bold">$228K</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-purple-100 text-sm">Pending Approvals</p>
            <p className="text-2xl font-bold">3</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-purple-100 text-sm">Overdue Items</p>
            <p className="text-2xl font-bold">7</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="font-semibold text-slate-900 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-6 gap-3">
          {quickActions.map((action, i) => (
            <button key={i} className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:shadow-md transition-all hover:-translate-y-0.5">
              <div className={`w-12 h-12 rounded-lg mx-auto mb-2 flex items-center justify-center ${
                action.color === 'blue' ? 'bg-blue-50' : action.color === 'purple' ? 'bg-purple-50' : 
                action.color === 'amber' ? 'bg-amber-50' : action.color === 'orange' ? 'bg-orange-50' : 
                action.color === 'green' ? 'bg-emerald-50' : 'bg-slate-50'
              }`}>
                <action.icon size={24} className={`${
                  action.color === 'blue' ? 'text-blue-600' : action.color === 'purple' ? 'text-purple-600' : 
                  action.color === 'amber' ? 'text-amber-600' : action.color === 'orange' ? 'text-orange-600' : 
                  action.color === 'green' ? 'text-emerald-600' : 'text-slate-600'
                }`} />
              </div>
              <p className="text-sm font-medium text-slate-900">{action.label}</p>
              {action.badge && <span className="mt-1 inline-block px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700">{action.badge}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50">
                <div className={`p-2 rounded-lg ${
                  item.color === 'emerald' ? 'bg-emerald-50' : item.color === 'blue' ? 'bg-blue-50' : 
                  item.color === 'red' ? 'bg-red-50' : 'bg-amber-50'
                }`}>
                  <item.icon size={18} className={`${
                    item.color === 'emerald' ? 'text-emerald-600' : item.color === 'blue' ? 'text-blue-600' : 
                    item.color === 'red' ? 'text-red-600' : 'text-amber-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-900">{item.desc}</p>
                  <p className="text-xs text-slate-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Overdue Customers */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Top Overdue Accounts</h3>
          <div className="space-y-3">
            {[
              { name: 'Metro Services', amount: 100000, days: 95 },
              { name: 'Global Tech Ltd', amount: 52000, days: 72 },
              { name: 'XYZ Industries', amount: 23500, days: 45 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-red-700">{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{item.name}</p>
                    <p className="text-xs text-red-600">{item.days} days overdue</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-red-700">${(item.amount/1000).toFixed(0)}K</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// INVOICE LIST VIEW
// ============================================================
const InvoiceListView = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  
  const invoices = [
    { id: 'INV-2024-0156', date: '2024-11-25', customer: 'ABC Corporation', dueDate: '2024-12-25', amount: 125000, paid: 0, balance: 125000, status: 'pending', approvalStatus: 'pending' },
    { id: 'INV-2024-0152', date: '2024-11-24', customer: 'Tech Solutions', dueDate: '2024-12-24', amount: 45000, paid: 0, balance: 45000, status: 'open', approvalStatus: 'approved' },
    { id: 'INV-2024-0148', date: '2024-11-22', customer: 'XYZ Industries', dueDate: '2024-12-22', amount: 89000, paid: 45000, balance: 44000, status: 'partial', approvalStatus: 'approved' },
    { id: 'INV-2024-0142', date: '2024-11-20', customer: 'Global Tech Ltd', dueDate: '2024-12-20', amount: 67000, paid: 67000, balance: 0, status: 'paid', approvalStatus: 'approved' },
    { id: 'INV-2024-0135', date: '2024-11-15', customer: 'Prime Solutions', dueDate: '2024-11-15', amount: 35000, paid: 0, balance: 35000, status: 'overdue', approvalStatus: 'approved' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Invoices</h2>
          <p className="text-sm text-slate-500">View and track customer invoices</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        <StatCard title="Total Invoiced" value="$361K" subtitle="This month" icon={FileText} color="blue" />
        <StatCard title="Pending Approval" value="1" icon={Clock} color="amber" />
        <StatCard title="Outstanding" value="$204K" icon={AlertCircle} color="red" />
        <StatCard title="Partially Paid" value="$44K" icon={Receipt} color="purple" />
        <StatCard title="Fully Paid" value="$67K" subtitle="+15% vs last month" trend="up" icon={CheckCircle} color="green" />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg">
          <Search size={18} className="text-slate-400" />
          <input type="text" placeholder="Search invoices..." className="flex-1 outline-none text-sm" />
        </div>
        <select className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white">
          <option>All Status</option>
          <option>Open</option>
          <option>Partial</option>
          <option>Paid</option>
          <option>Overdue</option>
        </select>
        <input type="date" className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white" />
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Invoice #</th>
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Customer</th>
              <th className="px-4 py-3 text-left font-medium">Due Date</th>
              <th className="px-4 py-3 text-right font-medium">Amount</th>
              <th className="px-4 py-3 text-right font-medium">Paid</th>
              <th className="px-4 py-3 text-right font-medium">Balance</th>
              <th className="px-4 py-3 text-center font-medium">Status</th>
              <th className="px-4 py-3 text-center font-medium">Approval</th>
              <th className="px-4 py-3 text-center font-medium w-28">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoices.map(inv => (
              <tr key={inv.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-blue-600 cursor-pointer" onClick={() => setSelectedInvoice(inv)}>{inv.id}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{inv.date}</td>
                <td className="px-4 py-3 text-sm text-slate-900">{inv.customer}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{inv.dueDate}</td>
                <td className="px-4 py-3 text-sm text-right font-medium">${inv.amount.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-right text-emerald-600">${inv.paid.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-right font-bold">${inv.balance.toLocaleString()}</td>
                <td className="px-4 py-3 text-center"><StatusBadge status={inv.status} /></td>
                <td className="px-4 py-3 text-center">
                  {inv.approvalStatus === 'pending' ? (
                    <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-700">Pending</span>
                  ) : (
                    <CheckCircle size={16} className="text-emerald-500 mx-auto" />
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 hover:bg-slate-100 rounded" title="View"><Eye size={16} className="text-slate-400" /></button>
                    <button className="p-1.5 hover:bg-slate-100 rounded" title="Print"><Printer size={16} className="text-slate-400" /></button>
                    <button className="p-1.5 hover:bg-slate-100 rounded" title="Email"><Mail size={16} className="text-slate-400" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoice Detail Modal */}
      <Modal isOpen={!!selectedInvoice} onClose={() => setSelectedInvoice(null)} title={`Invoice ${selectedInvoice?.id}`} size="lg">
        {selectedInvoice && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-2">Invoice Details</h4>
                <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between"><span className="text-sm text-slate-500">Invoice #</span><span className="text-sm font-medium">{selectedInvoice.id}</span></div>
                  <div className="flex justify-between"><span className="text-sm text-slate-500">Date</span><span className="text-sm">{selectedInvoice.date}</span></div>
                  <div className="flex justify-between"><span className="text-sm text-slate-500">Due Date</span><span className="text-sm">{selectedInvoice.dueDate}</span></div>
                  <div className="flex justify-between"><span className="text-sm text-slate-500">Status</span><StatusBadge status={selectedInvoice.status} /></div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-2">Customer</h4>
                <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                  <p className="font-medium">{selectedInvoice.customer}</p>
                  <p className="text-sm text-slate-500">123 Business Ave, Suite 100</p>
                  <p className="text-sm text-slate-500">contact@company.com</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-slate-500 mb-2">Line Items</h4>
              <table className="w-full">
                <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
                  <tr>
                    <th className="px-4 py-2 text-left">Description</th>
                    <th className="px-4 py-2 text-right">Qty</th>
                    <th className="px-4 py-2 text-right">Rate</th>
                    <th className="px-4 py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-3 text-sm">Professional Services - November</td>
                    <td className="px-4 py-3 text-sm text-right">1</td>
                    <td className="px-4 py-3 text-sm text-right">$100,000</td>
                    <td className="px-4 py-3 text-sm text-right font-medium">$100,000</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-3 text-sm">Additional Consulting</td>
                    <td className="px-4 py-3 text-sm text-right">25</td>
                    <td className="px-4 py-3 text-sm text-right">$1,000</td>
                    <td className="px-4 py-3 text-sm text-right font-medium">$25,000</td>
                  </tr>
                </tbody>
                <tfoot className="bg-slate-50">
                  <tr><td colSpan={3} className="px-4 py-2 text-sm text-right">Subtotal</td><td className="px-4 py-2 text-sm text-right font-medium">$125,000</td></tr>
                  <tr><td colSpan={3} className="px-4 py-2 text-sm text-right">Tax (0%)</td><td className="px-4 py-2 text-sm text-right">$0</td></tr>
                  <tr><td colSpan={3} className="px-4 py-2 text-sm text-right font-bold">Total</td><td className="px-4 py-2 text-sm text-right font-bold">$125,000</td></tr>
                </tfoot>
              </table>
            </div>

            <div className="flex justify-end gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50"><Printer size={16} /> Print</button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50"><Mail size={16} /> Email</button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"><ExternalLink size={16} /> Open in SAP</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// ============================================================
// CREDIT NOTES VIEW
// ============================================================
const CreditNotesView = () => {
  const creditNotes = [
    { id: 'CN-2024-0089', date: '2024-11-25', customer: 'XYZ Ltd', invoice: 'INV-2024-0120', amount: 15000, reason: 'Defective goods return', status: 'pending', approvalStatus: 'pending' },
    { id: 'CN-2024-0085', date: '2024-11-22', customer: 'ABC Corp', invoice: 'INV-2024-0098', amount: 8500, reason: 'Pricing adjustment', status: 'approved', approvalStatus: 'approved' },
    { id: 'CN-2024-0082', date: '2024-11-20', customer: 'Tech Solutions', invoice: 'INV-2024-0085', amount: 12000, reason: 'Service credit', status: 'applied', approvalStatus: 'approved' },
    { id: 'CN-2024-0078', date: '2024-11-18', customer: 'Global Tech', invoice: 'INV-2024-0075', amount: 5500, reason: 'Quantity dispute', status: 'applied', approvalStatus: 'approved' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Credit Notes</h2>
          <p className="text-sm text-slate-500">Manage customer credit notes and adjustments</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Pending Approval" value="1" subtitle="$15,000 value" icon={Clock} color="amber" />
        <StatCard title="Approved" value="1" subtitle="Ready to apply" icon={CheckCircle} color="green" />
        <StatCard title="Applied (MTD)" value="$17.5K" icon={Receipt} color="blue" />
        <StatCard title="Total (MTD)" value="$41K" icon={DollarSign} />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Credit Note #</th>
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Customer</th>
              <th className="px-4 py-3 text-left font-medium">Original Invoice</th>
              <th className="px-4 py-3 text-left font-medium">Reason</th>
              <th className="px-4 py-3 text-right font-medium">Amount</th>
              <th className="px-4 py-3 text-center font-medium">Status</th>
              <th className="px-4 py-3 text-center font-medium">Approval</th>
              <th className="px-4 py-3 text-center font-medium w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {creditNotes.map(cn => (
              <tr key={cn.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-orange-600">{cn.id}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{cn.date}</td>
                <td className="px-4 py-3 text-sm text-slate-900">{cn.customer}</td>
                <td className="px-4 py-3 text-sm text-blue-600">{cn.invoice}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{cn.reason}</td>
                <td className="px-4 py-3 text-sm text-right font-bold text-orange-600">-${cn.amount.toLocaleString()}</td>
                <td className="px-4 py-3 text-center"><StatusBadge status={cn.status} /></td>
                <td className="px-4 py-3 text-center">
                  {cn.approvalStatus === 'pending' ? (
                    <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-700">Pending</span>
                  ) : (
                    <CheckCircle size={16} className="text-emerald-500 mx-auto" />
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 hover:bg-slate-100 rounded"><Eye size={16} className="text-slate-400" /></button>
                    <button className="p-1.5 hover:bg-slate-100 rounded"><Printer size={16} className="text-slate-400" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============================================================
// PAYMENTS VIEW
// ============================================================
const PaymentsView = () => {
  const [paymentType, setPaymentType] = useState('incoming');
  
  const incomingPayments = [
    { id: 'PAY-IN-0234', date: '2024-11-25', customer: 'ABC Corporation', method: 'Bank Transfer', reference: 'TRF-445566', amount: 45000, status: 'processed', invoices: ['INV-2024-0142'] },
    { id: 'PAY-IN-0230', date: '2024-11-24', customer: 'Tech Solutions', method: 'Check', reference: 'CHK-7890', amount: 28000, status: 'processed', invoices: ['INV-2024-0135', 'INV-2024-0128'] },
    { id: 'PAY-IN-0228', date: '2024-11-23', customer: 'XYZ Industries', method: 'Bank Transfer', reference: 'TRF-445512', amount: 89000, status: 'processed', invoices: ['INV-2024-0148'] },
  ];

  const outgoingPayments = [
    { id: 'PAY-OUT-0445', date: '2024-11-25', vendor: 'Global Materials', method: 'Bank Transfer', reference: 'TRF-OUT-889', amount: 89000, status: 'pending', approvalStatus: 'pending', bills: ['BILL-2024-0089'] },
    { id: 'PAY-OUT-0442', date: '2024-11-24', vendor: 'ABC Supplies', method: 'Check', reference: 'CHK-OUT-556', amount: 35000, status: 'scheduled', approvalStatus: 'approved', bills: ['BILL-2024-0085'] },
    { id: 'PAY-OUT-0440', date: '2024-11-23', vendor: 'Office Solutions', method: 'Bank Transfer', reference: 'TRF-OUT-885', amount: 12500, status: 'processed', approvalStatus: 'approved', bills: ['BILL-2024-0082'] },
  ];

  const payments = paymentType === 'incoming' ? incomingPayments : outgoingPayments;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Payments</h2>
          <p className="text-sm text-slate-500">Track incoming and outgoing payments</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Received (MTD)" value="$162K" subtitle="+18% vs last month" trend="up" icon={ArrowRight} color="green" />
        <StatCard title="Paid Out (MTD)" value="$136.5K" icon={ArrowRight} color="red" />
        <StatCard title="Pending Approval" value="1" subtitle="$89K" icon={Clock} color="amber" />
        <StatCard title="Scheduled" value="1" subtitle="$35K this week" icon={Calendar} color="blue" />
      </div>

      {/* Payment Type Toggle */}
      <div className="flex items-center gap-2">
        <button onClick={() => setPaymentType('incoming')} className={`px-4 py-2 text-sm rounded-lg ${paymentType === 'incoming' ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-200 hover:bg-slate-50'}`}>
          Incoming Payments
        </button>
        <button onClick={() => setPaymentType('outgoing')} className={`px-4 py-2 text-sm rounded-lg ${paymentType === 'outgoing' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 hover:bg-slate-50'}`}>
          Outgoing Payments
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Payment #</th>
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">{paymentType === 'incoming' ? 'Customer' : 'Vendor'}</th>
              <th className="px-4 py-3 text-left font-medium">Method</th>
              <th className="px-4 py-3 text-left font-medium">Reference</th>
              <th className="px-4 py-3 text-right font-medium">Amount</th>
              <th className="px-4 py-3 text-center font-medium">Status</th>
              {paymentType === 'outgoing' && <th className="px-4 py-3 text-center font-medium">Approval</th>}
              <th className="px-4 py-3 text-left font-medium">Applied To</th>
              <th className="px-4 py-3 text-center font-medium w-20">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {payments.map(pay => (
              <tr key={pay.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-blue-600">{pay.id}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{pay.date}</td>
                <td className="px-4 py-3 text-sm text-slate-900">{pay.customer || pay.vendor}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{pay.method}</td>
                <td className="px-4 py-3 text-sm font-mono text-slate-500">{pay.reference}</td>
                <td className={`px-4 py-3 text-sm text-right font-bold ${paymentType === 'incoming' ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {paymentType === 'incoming' ? '+' : '-'}${pay.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-center"><StatusBadge status={pay.status} /></td>
                {paymentType === 'outgoing' && (
                  <td className="px-4 py-3 text-center">
                    {pay.approvalStatus === 'pending' ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-700">Pending</span>
                    ) : (
                      <CheckCircle size={16} className="text-emerald-500 mx-auto" />
                    )}
                  </td>
                )}
                <td className="px-4 py-3 text-sm text-blue-600">{(pay.invoices || pay.bills).join(', ')}</td>
                <td className="px-4 py-3">
                  <button className="p-1.5 hover:bg-slate-100 rounded"><Eye size={16} className="text-slate-400" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function FinanceLiteModule() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'creditnotes', label: 'Credit Notes' },
    { id: 'payments', label: 'Payments' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100"><CreditCard size={24} className="text-purple-600" /></div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Finance Lite - Invoices & Payments</h1>
              <p className="text-sm text-slate-500">Dashboard, Invoices, Credit Notes & Payments</p>
            </div>
          </div>
        </div>
        <div className="px-6"><Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} /></div>
      </div>

      <div className="p-6">
        {activeTab === 'dashboard' && <FinanceLiteDashboard />}
        {activeTab === 'invoices' && <InvoiceListView />}
        {activeTab === 'creditnotes' && <CreditNotesView />}
        {activeTab === 'payments' && <PaymentsView />}
      </div>
    </div>
  );
}
