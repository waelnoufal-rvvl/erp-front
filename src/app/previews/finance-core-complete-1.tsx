import React, { useState } from 'react';
import { 
  ChevronRight, ChevronDown, Plus, Search, Download, Upload, RefreshCw,
  Edit, Trash2, Eye, Copy, X, AlertCircle, CheckCircle, Settings,
  Building2, Wallet, CreditCard, FileText, Calendar, DollarSign,
  ArrowUpRight, ArrowDownLeft, Clock, ChevronLeft, Save, Send,
  TrendingUp, TrendingDown, Landmark, Link2, AlertTriangle, Lock,
  Unlock, History, Filter, MoreVertical, Globe, ArrowRightLeft, Check
} from 'lucide-react';

// ============================================================
// SHARED COMPONENTS
// ============================================================
const Tabs = ({ tabs, active, onChange }) => (
  <div className="flex border-b border-slate-200 overflow-x-auto">
    {tabs.map(tab => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
          active === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
        }`}
      >
        {tab.label}
        {tab.badge && <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-slate-100">{tab.badge}</span>}
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
    open: 'bg-emerald-100 text-emerald-700', closed: 'bg-slate-100 text-slate-600',
    locked: 'bg-red-100 text-red-700', active: 'bg-blue-100 text-blue-700',
    inactive: 'bg-slate-100 text-slate-500', posted: 'bg-emerald-100 text-emerald-700',
    draft: 'bg-amber-100 text-amber-700', pending: 'bg-amber-100 text-amber-700',
    reconciled: 'bg-emerald-100 text-emerald-700', partial: 'bg-amber-100 text-amber-700',
    synced: 'bg-emerald-100 text-emerald-700', failed: 'bg-red-100 text-red-700',
  };
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-slate-100'}`}>{status?.charAt(0).toUpperCase() + status?.slice(1)}</span>;
};

const AccountTypeBadge = ({ type }) => {
  const styles = {
    Asset: 'bg-blue-50 text-blue-700 border-blue-200',
    Liability: 'bg-purple-50 text-purple-700 border-purple-200',
    Equity: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Revenue: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Expense: 'bg-orange-50 text-orange-700 border-orange-200',
  };
  return <span className={`px-2 py-0.5 rounded text-xs font-medium border ${styles[type]}`}>{type}</span>;
};

const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = 'blue' }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        {subtitle && <p className={`text-xs mt-1 ${trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-500' : 'text-slate-400'}`}>
          {trend && (trend === 'up' ? <TrendingUp size={12} className="inline mr-1" /> : <TrendingDown size={12} className="inline mr-1" />)}
          {subtitle}
        </p>}
      </div>
      <div className={`p-3 rounded-lg bg-${color}-50`}><Icon size={20} className={`text-${color}-600`} /></div>
    </div>
  </div>
);

// ============================================================
// GL ACCOUNT FORM MODAL
// ============================================================
const GLAccountFormModal = ({ isOpen, onClose, account = null }) => {
  const isEdit = !!account;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit GL Account' : 'New GL Account'} size="lg">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Account Code *</label>
            <input type="text" defaultValue={account?.code} placeholder="e.g., 1100" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Account Name *</label>
            <input type="text" defaultValue={account?.name} placeholder="Account name" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Account Type *</label>
            <select defaultValue={account?.type} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
              <option value="">Select type...</option>
              <option value="Asset">Asset</option>
              <option value="Liability">Liability</option>
              <option value="Equity">Equity</option>
              <option value="Revenue">Revenue</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Parent Account</label>
            <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
              <option value="">No parent (Top Level)</option>
              <option value="1000">1000 - Assets</option>
              <option value="2000">2000 - Liabilities</option>
              <option value="3000">3000 - Equity</option>
              <option value="4000">4000 - Revenue</option>
              <option value="5000">5000 - Expenses</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Currency</label>
            <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="EGP">EGP - Egyptian Pound</option>
              <option value="SAR">SAR - Saudi Riyal</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Normal Balance</label>
            <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <textarea rows={2} placeholder="Account description..." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
        </div>

        <div className="border-t border-slate-200 pt-4">
          <h4 className="text-sm font-medium text-slate-900 mb-3">SAP B1 Mapping</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">SAP Account Code</label>
              <input type="text" placeholder="SAP GL Code" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">SAP Account Name</label>
              <input type="text" placeholder="Auto-filled from SAP" disabled className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50" />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-4">
          <h4 className="text-sm font-medium text-slate-900 mb-3">Posting Controls</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" defaultChecked />
              <span className="text-sm text-slate-700">Allow direct posting</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm text-slate-700">Require cost center</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm text-slate-700">Require project</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm text-slate-700">Reconciliation account (control account)</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button onClick={onClose} className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            {isEdit ? 'Update Account' : 'Create Account'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// ============================================================
// CHART OF ACCOUNTS PAGE (Enhanced)
// ============================================================
const ChartOfAccountsPage = () => {
  const [expandedAccounts, setExpandedAccounts] = useState(['1000', '4000']);
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [showLedger, setShowLedger] = useState(null);
  
  const accounts = [
    { code: '1000', name: 'Assets', type: 'Asset', level: 0, hasChildren: true, balance: 2450000 },
    { code: '1100', name: 'Current Assets', type: 'Asset', level: 1, parent: '1000', hasChildren: true, balance: 1200000 },
    { code: '1110', name: 'Cash and Cash Equivalents', type: 'Asset', level: 2, parent: '1100', hasChildren: false, balance: 450000 },
    { code: '1120', name: 'Accounts Receivable', type: 'Asset', level: 2, parent: '1100', hasChildren: false, balance: 680000 },
    { code: '1130', name: 'Inventory', type: 'Asset', level: 2, parent: '1100', hasChildren: false, balance: 70000 },
    { code: '2000', name: 'Liabilities', type: 'Liability', level: 0, hasChildren: true, balance: 890000 },
    { code: '3000', name: 'Equity', type: 'Equity', level: 0, hasChildren: true, balance: 560000 },
    { code: '4000', name: 'Revenue', type: 'Revenue', level: 0, hasChildren: true, balance: 3200000 },
    { code: '4100', name: 'Sales Revenue', type: 'Revenue', level: 1, parent: '4000', hasChildren: false, balance: 2800000 },
    { code: '4200', name: 'Service Revenue', type: 'Revenue', level: 1, parent: '4000', hasChildren: false, balance: 400000 },
    { code: '5000', name: 'Expenses', type: 'Expense', level: 0, hasChildren: true, balance: 1450000 },
  ];

  const toggleExpand = (code) => setExpandedAccounts(prev => prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]);
  
  const visibleAccounts = accounts.filter(acc => {
    if (acc.level === 0) return true;
    let parent = accounts.find(a => a.code === acc.parent);
    while (parent) {
      if (!expandedAccounts.includes(parent.code)) return false;
      parent = accounts.find(a => a.code === parent.parent);
    }
    return true;
  });

  if (showLedger) {
    return <GLAccountLedger account={showLedger} onBack={() => setShowLedger(null)} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Chart of Accounts</h2>
          <p className="text-sm text-slate-500">Manage GL accounts and hierarchy</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
            <RefreshCw size={16} /> Sync SAP
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
            <Download size={16} /> Export
          </button>
          <button onClick={() => setShowAccountForm(true)} className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={16} /> Add Account
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg">
          <Search size={18} className="text-slate-400" />
          <input type="text" placeholder="Search by code or name..." className="flex-1 outline-none text-sm" />
        </div>
        <select className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white">
          <option>All Types</option>
          <option>Asset</option>
          <option>Liability</option>
          <option>Equity</option>
          <option>Revenue</option>
          <option>Expense</option>
        </select>
        <select className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Account Code & Name</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-left font-medium">Currency</th>
              <th className="px-4 py-3 text-right font-medium">Balance</th>
              <th className="px-4 py-3 text-center font-medium">Status</th>
              <th className="px-4 py-3 text-center font-medium">SAP</th>
              <th className="px-4 py-3 text-center font-medium w-28">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {visibleAccounts.map((account) => (
              <tr key={account.code} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center" style={{ paddingLeft: `${account.level * 24}px` }}>
                    {account.hasChildren ? (
                      <button onClick={() => toggleExpand(account.code)} className="p-1 hover:bg-slate-100 rounded mr-2">
                        {expandedAccounts.includes(account.code) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </button>
                    ) : <span className="w-7" />}
                    <div>
                      <span className="font-mono text-sm text-slate-500">{account.code}</span>
                      <span className="ml-2 text-sm font-medium text-slate-900">{account.name}</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3"><AccountTypeBadge type={account.type} /></td>
                <td className="px-4 py-3 text-sm text-slate-600">USD</td>
                <td className="px-4 py-3 text-sm text-right font-medium text-slate-900">${account.balance.toLocaleString()}</td>
                <td className="px-4 py-3 text-center"><StatusBadge status="active" /></td>
                <td className="px-4 py-3 text-center"><Link2 size={16} className="text-emerald-500 mx-auto" /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button onClick={() => setShowLedger(account)} className="p-1.5 hover:bg-slate-100 rounded" title="View Ledger"><Eye size={16} className="text-slate-400" /></button>
                    <button onClick={() => setShowAccountForm(true)} className="p-1.5 hover:bg-slate-100 rounded" title="Edit"><Edit size={16} className="text-slate-400" /></button>
                    <button className="p-1.5 hover:bg-slate-100 rounded" title="More"><MoreVertical size={16} className="text-slate-400" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GLAccountFormModal isOpen={showAccountForm} onClose={() => setShowAccountForm(false)} />
    </div>
  );
};

// ============================================================
// GL ACCOUNT LEDGER
// ============================================================
const GLAccountLedger = ({ account, onBack }) => {
  const transactions = [
    { id: 'JE-2024-0142', date: '2024-11-25', reference: 'INV-089', description: 'Customer Invoice - ABC Corp', debit: 25000, credit: 0, balance: 680000 },
    { id: 'JE-2024-0138', date: '2024-11-22', reference: 'PAY-055', description: 'Customer Payment Received', debit: 0, credit: 15000, balance: 655000 },
    { id: 'JE-2024-0135', date: '2024-11-20', reference: 'INV-085', description: 'Customer Invoice - XYZ Ltd', debit: 42000, credit: 0, balance: 670000 },
    { id: 'JE-2024-0130', date: '2024-11-18', reference: 'PAY-050', description: 'Customer Payment Received', debit: 0, credit: 28000, balance: 628000 },
    { id: 'JE-2024-0125', date: '2024-11-15', reference: 'INV-080', description: 'Customer Invoice - DEF Inc', debit: 18500, credit: 0, balance: 656000 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-lg"><ChevronLeft size={20} /></button>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{account.code} - {account.name}</h2>
          <p className="text-sm text-slate-500">Account Ledger</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Opening Balance" value="$637,500" icon={Wallet} />
        <StatCard title="Total Debits" value="$85,500" subtitle="+12.5%" trend="up" icon={ArrowUpRight} />
        <StatCard title="Total Credits" value="$43,000" subtitle="-8.2%" trend="down" icon={ArrowDownLeft} />
        <StatCard title="Closing Balance" value={`$${account.balance.toLocaleString()}`} icon={DollarSign} />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Period:</span>
          <input type="date" defaultValue="2024-11-01" className="px-3 py-2 text-sm border border-slate-200 rounded-lg" />
          <span className="text-sm text-slate-500">to</span>
          <input type="date" defaultValue="2024-11-30" className="px-3 py-2 text-sm border border-slate-200 rounded-lg" />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
          <Download size={16} /> Export
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Entry #</th>
              <th className="px-4 py-3 text-left font-medium">Reference</th>
              <th className="px-4 py-3 text-left font-medium">Description</th>
              <th className="px-4 py-3 text-right font-medium">Debit</th>
              <th className="px-4 py-3 text-right font-medium">Credit</th>
              <th className="px-4 py-3 text-right font-medium">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="bg-slate-50">
              <td className="px-4 py-3 text-sm text-slate-500">2024-11-01</td>
              <td className="px-4 py-3 text-sm text-slate-500" colSpan={3}>Opening Balance</td>
              <td className="px-4 py-3 text-sm text-right text-slate-500">-</td>
              <td className="px-4 py-3 text-sm text-right text-slate-500">-</td>
              <td className="px-4 py-3 text-sm text-right font-medium text-slate-900">$637,500</td>
            </tr>
            {transactions.map((txn) => (
              <tr key={txn.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-600">{txn.date}</td>
                <td className="px-4 py-3 text-sm font-medium text-blue-600">{txn.id}</td>
                <td className="px-4 py-3 text-sm font-mono text-slate-500">{txn.reference}</td>
                <td className="px-4 py-3 text-sm text-slate-900">{txn.description}</td>
                <td className="px-4 py-3 text-sm text-right font-medium text-slate-900">{txn.debit ? `$${txn.debit.toLocaleString()}` : '-'}</td>
                <td className="px-4 py-3 text-sm text-right font-medium text-slate-900">{txn.credit ? `$${txn.credit.toLocaleString()}` : '-'}</td>
                <td className="px-4 py-3 text-sm text-right font-medium text-slate-900">${txn.balance.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-50 font-medium">
            <tr>
              <td className="px-4 py-3 text-sm text-slate-900" colSpan={4}>Closing Balance</td>
              <td className="px-4 py-3 text-sm text-right text-slate-900">$85,500</td>
              <td className="px-4 py-3 text-sm text-right text-slate-900">$43,000</td>
              <td className="px-4 py-3 text-sm text-right text-slate-900">${account.balance.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

// ============================================================
// BANK ACCOUNTS MANAGEMENT PAGE
// ============================================================
const BankAccountsPage = () => {
  const [showForm, setShowForm] = useState(false);
  
  const bankAccounts = [
    { id: 'BA-001', name: 'Main Operating Account', bank: 'First National Bank', accountNo: '****4521', currency: 'USD', balance: 485000, glAccount: '1110', status: 'active' },
    { id: 'BA-002', name: 'Payroll Account', bank: 'City Bank', accountNo: '****7832', currency: 'USD', balance: 125000, glAccount: '1111', status: 'active' },
    { id: 'BA-003', name: 'Project Escrow', bank: 'Trust Bank', accountNo: '****9045', currency: 'USD', balance: 890000, glAccount: '1112', status: 'active' },
    { id: 'BA-004', name: 'EUR Account', bank: 'Deutsche Bank', accountNo: '****3341', currency: 'EUR', balance: 45000, glAccount: '1115', status: 'active' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Bank Accounts</h2>
          <p className="text-sm text-slate-500">Manage company bank accounts</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={16} /> Add Bank Account
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {bankAccounts.map(account => (
          <div key={account.id} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg bg-blue-50"><Landmark size={20} className="text-blue-600" /></div>
              <StatusBadge status={account.status} />
            </div>
            <h3 className="font-medium text-slate-900">{account.name}</h3>
            <p className="text-sm text-slate-500">{account.bank}</p>
            <p className="text-xs text-slate-400 font-mono mt-1">{account.accountNo}</p>
            <div className="mt-3 pt-3 border-t border-slate-100">
              <p className="text-xs text-slate-400">Current Balance</p>
              <p className="text-lg font-bold text-slate-900">{account.currency === 'EUR' ? '€' : '$'}{account.balance.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <button className="flex-1 px-2 py-1.5 text-xs border border-slate-200 rounded hover:bg-slate-50">View</button>
              <button className="flex-1 px-2 py-1.5 text-xs border border-slate-200 rounded hover:bg-slate-50">Edit</button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add Bank Account" size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Account Name *</label>
              <input type="text" placeholder="e.g., Main Operating" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Bank Name *</label>
              <input type="text" placeholder="Bank name" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Account Number *</label>
              <input type="text" placeholder="Account number" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">IBAN</label>
              <input type="text" placeholder="IBAN (optional)" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Currency *</label>
              <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                <option>USD - US Dollar</option>
                <option>EUR - Euro</option>
                <option>EGP - Egyptian Pound</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">GL Account *</label>
              <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                <option>1110 - Cash and Cash Equivalents</option>
                <option>1111 - Payroll Bank Account</option>
                <option>1112 - Escrow Account</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create Account</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ============================================================
// CASH ACCOUNTS PAGE
// ============================================================
const CashAccountsPage = () => {
  const cashAccounts = [
    { id: 'CA-001', name: 'Main Petty Cash', location: 'Head Office', custodian: 'John Smith', limit: 5000, balance: 2450, glAccount: '1101', status: 'active' },
    { id: 'CA-002', name: 'Site Office Cash', location: 'Project Alpha', custodian: 'Sarah Johnson', limit: 3000, balance: 1200, glAccount: '1102', status: 'active' },
    { id: 'CA-003', name: 'POS Register 1', location: 'Retail Store', custodian: 'Mike Brown', limit: 1000, balance: 850, glAccount: '1103', status: 'active' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Cash Accounts</h2>
          <p className="text-sm text-slate-500">Manage petty cash and cash registers</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={16} /> Add Cash Account
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Account</th>
              <th className="px-4 py-3 text-left font-medium">Location</th>
              <th className="px-4 py-3 text-left font-medium">Custodian</th>
              <th className="px-4 py-3 text-right font-medium">Limit</th>
              <th className="px-4 py-3 text-right font-medium">Balance</th>
              <th className="px-4 py-3 text-left font-medium">GL Account</th>
              <th className="px-4 py-3 text-center font-medium">Status</th>
              <th className="px-4 py-3 text-center font-medium w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cashAccounts.map(acc => (
              <tr key={acc.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="font-medium text-sm text-slate-900">{acc.name}</div>
                  <div className="text-xs text-slate-500">{acc.id}</div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{acc.location}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{acc.custodian}</td>
                <td className="px-4 py-3 text-sm text-right text-slate-600">${acc.limit.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-right font-medium text-slate-900">${acc.balance.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm font-mono text-slate-500">{acc.glAccount}</td>
                <td className="px-4 py-3 text-center"><StatusBadge status={acc.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 hover:bg-slate-100 rounded"><Eye size={16} className="text-slate-400" /></button>
                    <button className="p-1.5 hover:bg-slate-100 rounded"><Edit size={16} className="text-slate-400" /></button>
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
// CURRENCY & EXCHANGE RATES PAGE
// ============================================================
const CurrencyPage = () => {
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1.0000, isBase: true, status: 'active' },
    { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.9234, isBase: false, status: 'active' },
    { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.7891, isBase: false, status: 'active' },
    { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£', rate: 30.9000, isBase: false, status: 'active' },
    { code: 'SAR', name: 'Saudi Riyal', symbol: 'SR', rate: 3.7500, isBase: false, status: 'active' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'AED', rate: 3.6725, isBase: false, status: 'active' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Currencies & Exchange Rates</h2>
          <p className="text-sm text-slate-500">Manage currencies and exchange rates</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
            <RefreshCw size={16} /> Update Rates
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={16} /> Add Currency
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard title="Base Currency" value="USD" subtitle="US Dollar" icon={DollarSign} />
        <StatCard title="Active Currencies" value="6" icon={Globe} />
        <StatCard title="Last Rate Update" value="Today" subtitle="10:30 AM" icon={RefreshCw} />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Currency</th>
              <th className="px-4 py-3 text-left font-medium">Symbol</th>
              <th className="px-4 py-3 text-right font-medium">Exchange Rate</th>
              <th className="px-4 py-3 text-center font-medium">Base</th>
              <th className="px-4 py-3 text-center font-medium">Status</th>
              <th className="px-4 py-3 text-center font-medium w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currencies.map(curr => (
              <tr key={curr.code} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">{curr.code}</div>
                    <div>
                      <div className="font-medium text-sm text-slate-900">{curr.code}</div>
                      <div className="text-xs text-slate-500">{curr.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{curr.symbol}</td>
                <td className="px-4 py-3 text-sm text-right font-mono font-medium text-slate-900">{curr.rate.toFixed(4)}</td>
                <td className="px-4 py-3 text-center">
                  {curr.isBase && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">Base</span>}
                </td>
                <td className="px-4 py-3 text-center"><StatusBadge status={curr.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 hover:bg-slate-100 rounded"><Edit size={16} className="text-slate-400" /></button>
                    <button className="p-1.5 hover:bg-slate-100 rounded"><History size={16} className="text-slate-400" /></button>
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
// MAIN FINANCE CORE MODULE
// ============================================================
export default function FinanceCoreModule() {
  const [activeTab, setActiveTab] = useState('coa');

  const tabs = [
    { id: 'coa', label: 'Chart of Accounts' },
    { id: 'journals', label: 'Journal Entries', badge: '3' },
    { id: 'periods', label: 'Fiscal Periods' },
    { id: 'banks', label: 'Bank Accounts' },
    { id: 'cash', label: 'Cash Accounts' },
    { id: 'currency', label: 'Currencies' },
    { id: 'reconciliation', label: 'Reconciliation' },
    { id: 'reports', label: 'Reports' },
    { id: 'sap', label: 'SAP Integration' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100"><Wallet size={24} className="text-blue-600" /></div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Finance Core</h1>
              <p className="text-sm text-slate-500">General Ledger, Banking & Cash Management</p>
            </div>
          </div>
        </div>
        <div className="px-6">
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'coa' && <ChartOfAccountsPage />}
        {activeTab === 'banks' && <BankAccountsPage />}
        {activeTab === 'cash' && <CashAccountsPage />}
        {activeTab === 'currency' && <CurrencyPage />}
        {(activeTab === 'journals' || activeTab === 'periods' || activeTab === 'reconciliation' || activeTab === 'reports' || activeTab === 'sap') && (
          <div className="text-center py-8 text-slate-500">See Part 2 for {tabs.find(t => t.id === activeTab)?.label}</div>
        )}
      </div>
    </div>
  );
}
