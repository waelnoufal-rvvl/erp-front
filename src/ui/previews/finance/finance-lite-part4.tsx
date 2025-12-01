'use client';

import React, { useState } from 'react';
import { 
  ChevronRight, ChevronDown, Plus, Search, Download, Filter, RefreshCw,
  Edit, Eye, X, AlertCircle, CheckCircle, Clock, ChevronLeft, Save, Send,
  TrendingUp, TrendingDown, FileText, DollarSign, Calendar, Mail, Phone,
  CheckSquare, XSquare, MessageSquare, Paperclip, AlertTriangle, CreditCard,
  Receipt, Banknote, Users, Building2, PhoneCall, MessageCircle, History,
  PieChart, BarChart3, ArrowRight, UserX, ShieldAlert, FileWarning, Pause,
  Play, Ban, ThumbsUp, ThumbsDown, Timer, Target, Zap, Bell, Settings
} from 'lucide-react';

// ============================================================
// SHARED COMPONENTS
// ============================================================
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
    open: 'bg-amber-100 text-amber-700', resolved: 'bg-emerald-100 text-emerald-700',
    pending: 'bg-amber-100 text-amber-700', escalated: 'bg-red-100 text-red-700',
    promised: 'bg-blue-100 text-blue-700', broken: 'bg-red-100 text-red-700',
    active: 'bg-emerald-100 text-emerald-700', onhold: 'bg-slate-100 text-slate-600',
    overdue: 'bg-red-100 text-red-700', current: 'bg-emerald-100 text-emerald-700',
    sent: 'bg-blue-100 text-blue-700', scheduled: 'bg-purple-100 text-purple-700',
    writtenoff: 'bg-slate-100 text-slate-500',
  };
  const label = status?.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-slate-100'}`}>{label}</span>;
};

const StatCard = ({ title, value, subtitle = '', icon: Icon, color = 'blue', trend = 'neutral', onClick = () => {} }) => (
  <div onClick={onClick} className={`bg-white rounded-xl border border-slate-200 p-5 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}>
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
// COLLECTION MANAGEMENT
// ============================================================
const CollectionManagement = () => {
  const [showLogCall, setShowLogCall] = useState(false);
  const [showPromise, setShowPromise] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const collectionQueue = [
    { id: 'C-003', name: 'Global Tech Ltd', overdue: 52000, days: 72, lastContact: '2024-11-20', status: 'escalated', calls: 5, promises: 2, brokenPromises: 1 },
    { id: 'C-005', name: 'Metro Services', overdue: 100000, days: 95, lastContact: '2024-11-18', status: 'escalated', calls: 8, promises: 3, brokenPromises: 2 },
    { id: 'C-002', name: 'XYZ Industries', overdue: 23500, days: 45, lastContact: '2024-11-22', status: 'promised', calls: 3, promises: 1, brokenPromises: 0 },
    { id: 'C-006', name: 'Delta Corp', overdue: 18000, days: 35, lastContact: '2024-11-24', status: 'pending', calls: 1, promises: 0, brokenPromises: 0 },
  ];

  const recentActivities = [
    { type: 'call', customer: 'Global Tech Ltd', note: 'Spoke with CFO, promised payment by Nov 30', user: 'John Smith', time: '2 hours ago' },
    { type: 'email', customer: 'Metro Services', note: 'Sent final demand notice', user: 'Sarah Johnson', time: '4 hours ago' },
    { type: 'promise', customer: 'XYZ Industries', note: 'Payment of $15,000 promised for Nov 28', user: 'John Smith', time: '1 day ago' },
    { type: 'broken', customer: 'Metro Services', note: 'Missed promised payment of $25,000', user: 'System', time: '2 days ago' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Collection Management</h2>
          <p className="text-sm text-slate-500">Track overdue accounts and collection activities</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
            <Mail size={16} /> Bulk Reminders
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <PhoneCall size={16} /> Log Call
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        <StatCard title="Total Overdue" value="$193.5K" subtitle="4 customers" icon={AlertTriangle} color="red" />
        <StatCard title="In Collection" value="4" icon={PhoneCall} color="amber" />
        <StatCard title="Promises to Pay" value="$38.5K" subtitle="2 active" icon={ThumbsUp} color="blue" />
        <StatCard title="Broken Promises" value="3" subtitle="This month" icon={ThumbsDown} color="red" />
        <StatCard title="Collected (MTD)" value="$125K" subtitle="+18% vs last month" trend="up" icon={DollarSign} color="green" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Collection Queue */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-medium text-slate-900">Collection Queue</h3>
            <select className="text-sm border border-slate-200 rounded-lg px-2 py-1">
              <option>Sort by: Days Overdue</option>
              <option>Sort by: Amount</option>
              <option>Sort by: Last Contact</option>
            </select>
          </div>
          <div className="divide-y divide-slate-100">
            {collectionQueue.map(customer => (
              <div key={customer.id} className="p-4 hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedCustomer(customer)}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${customer.status === 'escalated' ? 'bg-red-100' : 'bg-amber-100'}`}>
                      <UserX size={20} className={customer.status === 'escalated' ? 'text-red-600' : 'text-amber-600'} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-slate-900">{customer.name}</p>
                        <StatusBadge status={customer.status} />
                      </div>
                      <p className="text-sm text-slate-500">{customer.days} days overdue • Last contact: {customer.lastContact}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><PhoneCall size={12} /> {customer.calls} calls</span>
                        <span className="flex items-center gap-1"><ThumbsUp size={12} /> {customer.promises} promises</span>
                        {customer.brokenPromises > 0 && (
                          <span className="flex items-center gap-1 text-red-500"><ThumbsDown size={12} /> {customer.brokenPromises} broken</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-red-600">${customer.overdue.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={(e) => { e.stopPropagation(); setShowLogCall(true); }} className="p-1.5 hover:bg-slate-100 rounded" title="Log Call">
                        <PhoneCall size={16} className="text-slate-400" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); }} className="p-1.5 hover:bg-slate-100 rounded" title="Send Email">
                        <Mail size={16} className="text-slate-400" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); setShowPromise(true); }} className="p-1.5 hover:bg-slate-100 rounded" title="Log Promise">
                        <ThumbsUp size={16} className="text-slate-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h3 className="font-medium text-slate-900">Recent Activity</h3>
          </div>
          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'call' ? 'bg-blue-50' : 
                  activity.type === 'email' ? 'bg-purple-50' : 
                  activity.type === 'promise' ? 'bg-emerald-50' : 'bg-red-50'
                }`}>
                  {activity.type === 'call' && <PhoneCall size={16} className="text-blue-600" />}
                  {activity.type === 'email' && <Mail size={16} className="text-purple-600" />}
                  {activity.type === 'promise' && <ThumbsUp size={16} className="text-emerald-600" />}
                  {activity.type === 'broken' && <ThumbsDown size={16} className="text-red-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{activity.customer}</p>
                  <p className="text-xs text-slate-600">{activity.note}</p>
                  <p className="text-xs text-slate-400 mt-1">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Log Call Modal */}
      <Modal isOpen={showLogCall} onClose={() => setShowLogCall(false)} title="Log Collection Call" size="sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Customer</label>
            <input type="text" value="Global Tech Ltd" disabled className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Contact Person</label>
            <input type="text" placeholder="Who did you speak with?" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Outcome</label>
            <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
              <option>Spoke with decision maker</option>
              <option>Left voicemail</option>
              <option>No answer</option>
              <option>Wrong number</option>
              <option>Promised payment</option>
              <option>Dispute raised</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
            <textarea rows={3} placeholder="Call notes..." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Follow-up Date</label>
            <input type="date" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button onClick={() => setShowLogCall(false)} className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Call Log</button>
          </div>
        </div>
      </Modal>

      {/* Promise to Pay Modal */}
      <Modal isOpen={showPromise} onClose={() => setShowPromise(false)} title="Record Promise to Pay" size="sm">
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">Record a customer's commitment to pay by a specific date.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Promised Amount *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
              <input type="number" placeholder="0.00" className="w-full pl-7 pr-3 py-2 text-sm border border-slate-200 rounded-lg" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Promise Date *</label>
            <input type="date" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Payment Method</label>
            <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
              <option>Bank Transfer</option>
              <option>Check</option>
              <option>Cash</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
            <textarea rows={2} placeholder="Any conditions or notes..." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button onClick={() => setShowPromise(false)} className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
            <button className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Record Promise</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ============================================================
// DISPUTE MANAGEMENT
// ============================================================
const DisputeManagement = () => {
  const [showNewDispute, setShowNewDispute] = useState(false);
  
  const disputes = [
    { id: 'DSP-001', invoice: 'INV-2024-0135', customer: 'Prime Solutions', amount: 35000, disputed: 12000, type: 'Quality Issue', status: 'open', created: '2024-11-20', assignee: 'John Smith' },
    { id: 'DSP-002', invoice: 'INV-2024-0098', customer: 'Global Tech Ltd', amount: 67000, disputed: 67000, type: 'Invoice Error', status: 'pending', created: '2024-11-18', assignee: 'Sarah Johnson' },
    { id: 'DSP-003', invoice: 'INV-2024-0085', customer: 'XYZ Industries', amount: 45000, disputed: 8500, type: 'Pricing Dispute', status: 'resolved', created: '2024-11-10', assignee: 'Mike Brown' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Dispute Management</h2>
          <p className="text-sm text-slate-500">Track and resolve customer disputes</p>
        </div>
        <button onClick={() => setShowNewDispute(true)} className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={16} /> New Dispute
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Open Disputes" value="2" subtitle="$79K disputed" icon={FileWarning} color="amber" />
        <StatCard title="Avg Resolution Time" value="8 days" icon={Timer} color="blue" />
        <StatCard title="Resolved (MTD)" value="5" subtitle="$42K recovered" icon={CheckCircle} color="green" />
        <StatCard title="Write-offs (MTD)" value="$3.2K" icon={Ban} color="red" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Dispute #</th>
              <th className="px-4 py-3 text-left font-medium">Invoice</th>
              <th className="px-4 py-3 text-left font-medium">Customer</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-right font-medium">Invoice Amt</th>
              <th className="px-4 py-3 text-right font-medium">Disputed</th>
              <th className="px-4 py-3 text-center font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Assignee</th>
              <th className="px-4 py-3 text-center font-medium w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {disputes.map(dispute => (
              <tr key={dispute.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-blue-600">{dispute.id}</td>
                <td className="px-4 py-3 text-sm text-blue-600">{dispute.invoice}</td>
                <td className="px-4 py-3 text-sm text-slate-900">{dispute.customer}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 text-xs rounded bg-slate-100 text-slate-600">{dispute.type}</span>
                </td>
                <td className="px-4 py-3 text-sm text-right">${dispute.amount.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-right font-medium text-red-600">${dispute.disputed.toLocaleString()}</td>
                <td className="px-4 py-3 text-center"><StatusBadge status={dispute.status} /></td>
                <td className="px-4 py-3 text-sm text-slate-600">{dispute.assignee}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 hover:bg-slate-100 rounded"><Eye size={16} className="text-slate-400" /></button>
                    <button className="p-1.5 hover:bg-slate-100 rounded"><MessageSquare size={16} className="text-slate-400" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Dispute Modal */}
      <Modal isOpen={showNewDispute} onClose={() => setShowNewDispute(false)} title="Create New Dispute" size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Customer *</label>
              <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                <option value="">Select customer...</option>
                <option>ABC Corporation</option>
                <option>XYZ Industries</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Invoice *</label>
              <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                <option value="">Select invoice...</option>
                <option>INV-2024-0156</option>
                <option>INV-2024-0152</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Dispute Type *</label>
              <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                <option value="">Select type...</option>
                <option>Quality Issue</option>
                <option>Pricing Dispute</option>
                <option>Invoice Error</option>
                <option>Delivery Issue</option>
                <option>Service Complaint</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Disputed Amount *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                <input type="number" placeholder="0.00" className="w-full pl-7 pr-3 py-2 text-sm border border-slate-200 rounded-lg" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
            <textarea rows={3} placeholder="Describe the dispute in detail..." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Assign To</label>
            <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
              <option>John Smith</option>
              <option>Sarah Johnson</option>
              <option>Mike Brown</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button onClick={() => setShowNewDispute(false)} className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create Dispute</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ============================================================
// CREDIT MANAGEMENT
// ============================================================
const CreditManagement = () => {
  const [showEditCredit, setShowEditCredit] = useState(null);
  
  const customers = [
    { id: 'C-001', name: 'ABC Corporation', creditLimit: 500000, used: 182000, available: 318000, status: 'active', riskLevel: 'low', lastReview: '2024-10-15' },
    { id: 'C-002', name: 'XYZ Industries', creditLimit: 300000, used: 285000, available: 15000, status: 'warning', riskLevel: 'medium', lastReview: '2024-09-20' },
    { id: 'C-003', name: 'Global Tech Ltd', creditLimit: 250000, used: 250000, available: 0, status: 'onhold', riskLevel: 'high', lastReview: '2024-11-01' },
    { id: 'C-004', name: 'Prime Solutions', creditLimit: 400000, used: 265000, available: 135000, status: 'active', riskLevel: 'low', lastReview: '2024-08-10' },
  ];

  const getUtilization = (used, limit) => Math.round((used / limit) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Credit Management</h2>
          <p className="text-sm text-slate-500">Manage customer credit limits and holds</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
          <Download size={16} /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total Credit Extended" value="$1.45M" icon={CreditCard} color="blue" />
        <StatCard title="Total Utilized" value="$982K" subtitle="68% utilization" icon={DollarSign} color="amber" />
        <StatCard title="Accounts On Hold" value="1" icon={Pause} color="red" />
        <StatCard title="Credit Reviews Due" value="2" subtitle="This month" icon={Calendar} color="purple" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Customer</th>
              <th className="px-4 py-3 text-right font-medium">Credit Limit</th>
              <th className="px-4 py-3 text-right font-medium">Used</th>
              <th className="px-4 py-3 text-right font-medium">Available</th>
              <th className="px-4 py-3 text-center font-medium">Utilization</th>
              <th className="px-4 py-3 text-center font-medium">Risk</th>
              <th className="px-4 py-3 text-center font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Last Review</th>
              <th className="px-4 py-3 text-center font-medium w-28">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {customers.map(customer => {
              const util = getUtilization(customer.used, customer.creditLimit);
              return (
                <tr key={customer.id} className="hover:bg-slate-50">
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
                  <td className="px-4 py-3 text-sm text-right font-medium">${customer.creditLimit.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right">${customer.used.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right font-medium text-emerald-600">${customer.available.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${util > 90 ? 'bg-red-500' : util > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${util}%` }} />
                      </div>
                      <span className="text-xs font-medium">{util}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 text-xs rounded ${
                      customer.riskLevel === 'low' ? 'bg-emerald-100 text-emerald-700' :
                      customer.riskLevel === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>{customer.riskLevel}</span>
                  </td>
                  <td className="px-4 py-3 text-center"><StatusBadge status={customer.status} /></td>
                  <td className="px-4 py-3 text-sm text-slate-600">{customer.lastReview}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => setShowEditCredit(customer)} className="p-1.5 hover:bg-slate-100 rounded" title="Edit Credit">
                        <Edit size={16} className="text-slate-400" />
                      </button>
                      {customer.status === 'active' ? (
                        <button className="p-1.5 hover:bg-slate-100 rounded" title="Place on Hold">
                          <Pause size={16} className="text-slate-400" />
                        </button>
                      ) : (
                        <button className="p-1.5 hover:bg-slate-100 rounded" title="Release Hold">
                          <Play size={16} className="text-slate-400" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Edit Credit Modal */}
      <Modal isOpen={!!showEditCredit} onClose={() => setShowEditCredit(null)} title={`Edit Credit - ${showEditCredit?.name}`} size="sm">
        {showEditCredit && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Current Credit Limit</label>
              <input type="text" value={`$${showEditCredit.creditLimit.toLocaleString()}`} disabled className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">New Credit Limit *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                <input type="number" defaultValue={showEditCredit.creditLimit} className="w-full pl-7 pr-3 py-2 text-sm border border-slate-200 rounded-lg" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Risk Level</label>
              <select defaultValue={showEditCredit.riskLevel} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Change</label>
              <textarea rows={2} placeholder="Explain the reason..." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button onClick={() => setShowEditCredit(null)} className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
              <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Update Credit</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// ============================================================
// DUNNING / REMINDER MANAGEMENT
// ============================================================
const DunningManagement = () => {
  const dunningLevels = [
    { level: 1, name: 'Friendly Reminder', days: 7, action: 'Email', template: 'Payment Reminder - Friendly', active: true },
    { level: 2, name: 'Second Notice', days: 14, action: 'Email + SMS', template: 'Payment Reminder - Urgent', active: true },
    { level: 3, name: 'Final Warning', days: 30, action: 'Email + Call', template: 'Final Payment Notice', active: true },
    { level: 4, name: 'Collection Notice', days: 45, action: 'Letter + Call', template: 'Collection Warning', active: true },
    { level: 5, name: 'Legal Action', days: 60, action: 'Legal Letter', template: 'Legal Action Notice', active: false },
  ];

  const scheduledReminders = [
    { customer: 'XYZ Industries', invoice: 'INV-2024-0135', amount: 35000, level: 2, scheduledFor: '2024-11-27', status: 'scheduled' },
    { customer: 'Metro Services', invoice: 'INV-2024-0098', amount: 28000, level: 3, scheduledFor: '2024-11-26', status: 'sent' },
    { customer: 'Global Tech Ltd', invoice: 'INV-2024-0085', amount: 52000, level: 4, scheduledFor: '2024-11-28', status: 'scheduled' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Dunning & Reminders</h2>
          <p className="text-sm text-slate-500">Automated payment reminder configuration</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
          <Settings size={16} /> Configure Levels
        </button>
      </div>

      {/* Dunning Levels */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="font-medium text-slate-900 mb-4">Dunning Levels</h3>
        <div className="flex items-center gap-2">
          {dunningLevels.map((level, i) => (
            <React.Fragment key={level.level}>
              <div className={`flex-1 p-4 rounded-lg border-2 ${level.active ? 'border-blue-200 bg-blue-50' : 'border-slate-200 bg-slate-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold ${level.active ? 'text-blue-600' : 'text-slate-400'}`}>Level {level.level}</span>
                  {level.active ? <CheckCircle size={14} className="text-blue-600" /> : <XSquare size={14} className="text-slate-400" />}
                </div>
                <p className="text-sm font-medium text-slate-900">{level.name}</p>
                <p className="text-xs text-slate-500 mt-1">After {level.days} days</p>
                <p className="text-xs text-slate-400 mt-1">{level.action}</p>
              </div>
              {i < dunningLevels.length - 1 && <ArrowRight size={16} className="text-slate-300 flex-shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Scheduled Reminders */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-medium text-slate-900">Scheduled Reminders</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700">Run Now</button>
        </div>
        <table className="w-full">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Customer</th>
              <th className="px-4 py-3 text-left font-medium">Invoice</th>
              <th className="px-4 py-3 text-right font-medium">Amount</th>
              <th className="px-4 py-3 text-center font-medium">Level</th>
              <th className="px-4 py-3 text-left font-medium">Scheduled</th>
              <th className="px-4 py-3 text-center font-medium">Status</th>
              <th className="px-4 py-3 text-center font-medium w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {scheduledReminders.map((reminder, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-slate-900">{reminder.customer}</td>
                <td className="px-4 py-3 text-sm text-blue-600">{reminder.invoice}</td>
                <td className="px-4 py-3 text-sm text-right font-medium">${reminder.amount.toLocaleString()}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    reminder.level <= 2 ? 'bg-blue-100 text-blue-700' : 
                    reminder.level === 3 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>Level {reminder.level}</span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{reminder.scheduledFor}</td>
                <td className="px-4 py-3 text-center"><StatusBadge status={reminder.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 hover:bg-slate-100 rounded"><Eye size={16} className="text-slate-400" /></button>
                    <button className="p-1.5 hover:bg-slate-100 rounded"><XSquare size={16} className="text-slate-400" /></button>
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
// REPORTS PAGE
// ============================================================
const ReportsPage = () => {
  const reports = [
    { name: 'AR Aging Summary', description: 'Customer aging by period', icon: BarChart3, category: 'AR' },
    { name: 'AR Aging Detail', description: 'Detailed aging by invoice', icon: FileText, category: 'AR' },
    { name: 'Customer Statement', description: 'Individual customer statements', icon: Users, category: 'AR' },
    { name: 'Collection Report', description: 'Collection activities and results', icon: PhoneCall, category: 'AR' },
    { name: 'AP Aging Summary', description: 'Vendor aging by period', icon: BarChart3, category: 'AP' },
    { name: 'AP Aging Detail', description: 'Detailed aging by bill', icon: FileText, category: 'AP' },
    { name: 'Payment Schedule', description: 'Upcoming payments', icon: Calendar, category: 'AP' },
    { name: 'Cash Requirements', description: 'Projected cash needs', icon: DollarSign, category: 'AP' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Finance Lite Reports</h2>
          <p className="text-sm text-slate-500">AR/AP reports and analytics</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* AR Reports */}
        <div>
          <h3 className="text-sm font-medium text-slate-500 uppercase mb-3">Accounts Receivable</h3>
          <div className="space-y-2">
            {reports.filter(r => r.category === 'AR').map((report, i) => (
              <button key={i} className="w-full flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-all text-left">
                <div className="p-2 rounded-lg bg-blue-50">
                  <report.icon size={20} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{report.name}</p>
                  <p className="text-sm text-slate-500">{report.description}</p>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </button>
            ))}
          </div>
        </div>

        {/* AP Reports */}
        <div>
          <h3 className="text-sm font-medium text-slate-500 uppercase mb-3">Accounts Payable</h3>
          <div className="space-y-2">
            {reports.filter(r => r.category === 'AP').map((report, i) => (
              <button key={i} className="w-full flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-all text-left">
                <div className="p-2 rounded-lg bg-purple-50">
                  <report.icon size={20} className="text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{report.name}</p>
                  <p className="text-sm text-slate-500">{report.description}</p>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function FinanceLitePart4() {
  const [activeTab, setActiveTab] = useState('collections');

  const tabs = [
    { id: 'collections', label: 'Collections', badge: '4', badgeColor: 'bg-red-100 text-red-600' },
    { id: 'disputes', label: 'Disputes', badge: '2', badgeColor: 'bg-amber-100 text-amber-600' },
    { id: 'credit', label: 'Credit Mgmt' },
    { id: 'dunning', label: 'Dunning' },
    { id: 'reports', label: 'Reports' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100"><CreditCard size={24} className="text-purple-600" /></div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Finance Lite - Collections & Dunning</h1>
              <p className="text-sm text-slate-500">Collections, Disputes, Credit & Dunning</p>
            </div>
          </div>
        </div>
        <div className="px-6"><Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} /></div>
      </div>

      <div className="p-6">
        {activeTab === 'collections' && <CollectionManagement />}
        {activeTab === 'disputes' && <DisputeManagement />}
        {activeTab === 'credit' && <CreditManagement />}
        {activeTab === 'dunning' && <DunningManagement />}
        {activeTab === 'reports' && <ReportsPage />}
      </div>
    </div>
  );
}
