import React, { useState } from 'react';
import { 
  ChevronRight, ChevronDown, Plus, Search, Filter, Download, Upload, RefreshCw,
  MoreHorizontal, Edit, Trash2, Eye, Copy, Check, X, AlertCircle, CheckCircle,
  Building2, Wallet, CreditCard, PiggyBank, FileText, Calendar, DollarSign,
  ArrowUpRight, ArrowDownLeft, Link2, Clock, ChevronLeft, Save, Send,
  TrendingUp, TrendingDown, BarChart3, Landmark, BanknoteIcon, Receipt
} from 'lucide-react';

// Tab Component
const Tabs = ({ tabs, active, onChange }) => (
  <div className="flex border-b border-slate-200">
    {tabs.map(tab => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
          active === tab.id 
            ? 'border-blue-600 text-blue-600' 
            : 'border-transparent text-slate-500 hover:text-slate-700'
        }`}
      >
        {tab.label}
        {tab.badge && (
          <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-slate-100">{tab.badge}</span>
        )}
      </button>
    ))}
  </div>
);

// Status Badge
const StatusBadge = ({ status }) => {
  const styles = {
    open: 'bg-emerald-100 text-emerald-700',
    closed: 'bg-slate-100 text-slate-600',
    locked: 'bg-red-100 text-red-700',
    active: 'bg-blue-100 text-blue-700',
    inactive: 'bg-slate-100 text-slate-500',
    posted: 'bg-emerald-100 text-emerald-700',
    draft: 'bg-amber-100 text-amber-700',
    pending: 'bg-amber-100 text-amber-700',
    reconciled: 'bg-emerald-100 text-emerald-700',
    unreconciled: 'bg-red-100 text-red-700',
    partial: 'bg-amber-100 text-amber-700',
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-slate-100'}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Account Type Badge
const AccountTypeBadge = ({ type }) => {
  const styles = {
    Asset: 'bg-blue-50 text-blue-700 border-blue-200',
    Liability: 'bg-purple-50 text-purple-700 border-purple-200',
    Equity: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Revenue: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Expense: 'bg-orange-50 text-orange-700 border-orange-200',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${styles[type]}`}>
      {type}
    </span>
  );
};

// Stat Card
const StatCard = ({ title, value, subtitle, icon: Icon, trend, trendValue }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        {trend && (
          <div className={`flex items-center gap-1 mt-2 text-xs ${trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
            {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <div className="p-3 rounded-lg bg-blue-50">
        <Icon size={20} className="text-blue-600" />
      </div>
    </div>
  </div>
);

// ============================================================
// CHART OF ACCOUNTS PAGE
// ============================================================
const ChartOfAccountsPage = () => {
  const [expandedAccounts, setExpandedAccounts] = useState(['1000', '4000']);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  const accounts = [
    { code: '1000', name: 'Assets', type: 'Asset', level: 0, hasChildren: true, balance: 2450000 },
    { code: '1100', name: 'Current Assets', type: 'Asset', level: 1, parent: '1000', hasChildren: true, balance: 1200000 },
    { code: '1110', name: 'Cash and Cash Equivalents', type: 'Asset', level: 2, parent: '1100', hasChildren: false, balance: 450000 },
    { code: '1120', name: 'Accounts Receivable', type: 'Asset', level: 2, parent: '1100', hasChildren: false, balance: 680000 },
    { code: '1130', name: 'Inventory', type: 'Asset', level: 2, parent: '1100', hasChildren: false, balance: 70000 },
    { code: '1200', name: 'Fixed Assets', type: 'Asset', level: 1, parent: '1000', hasChildren: true, balance: 1250000 },
    { code: '2000', name: 'Liabilities', type: 'Liability', level: 0, hasChildren: true, balance: 890000 },
    { code: '3000', name: 'Equity', type: 'Equity', level: 0, hasChildren: true, balance: 560000 },
    { code: '4000', name: 'Revenue', type: 'Revenue', level: 0, hasChildren: true, balance: 3200000 },
    { code: '4100', name: 'Sales Revenue', type: 'Revenue', level: 1, parent: '4000', hasChildren: false, balance: 2800000 },
    { code: '4200', name: 'Service Revenue', type: 'Revenue', level: 1, parent: '4000', hasChildren: false, balance: 400000 },
    { code: '5000', name: 'Expenses', type: 'Expense', level: 0, hasChildren: true, balance: 1450000 },
  ];

  const toggleExpand = (code) => {
    setExpandedAccounts(prev => 
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  const visibleAccounts = accounts.filter(acc => {
    if (acc.level === 0) return true;
    let parent = accounts.find(a => a.code === acc.parent);
    while (parent) {
      if (!expandedAccounts.includes(parent.code)) return false;
      parent = accounts.find(a => a.code === parent.parent);
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Chart of Accounts</h2>
          <p className="text-sm text-slate-500">Manage GL accounts and hierarchy</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
            <RefreshCw size={16} /> Sync from SAP
          </button>
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={16} /> Add Account
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg">
          <Search size={18} className="text-slate-400" />
          <input type="text" placeholder="Search accounts..." className="flex-1 outline-none text-sm" />
        </div>
        <select className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white">
          <option>All Types</option>
          <option>Asset</option>
          <option>Liability</option>
          <option>Equity</option>
          <option>Revenue</option>
          <option>Expense</option>
        </select>
        <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
          <Download size={16} /> Export
        </button>
      </div>

      {/* Accounts Tree Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Account Code & Name</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-left font-medium">Currency</th>
              <th className="px-4 py-3 text-right font-medium">Balance</th>
              <th className="px-4 py-3 text-center font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">SAP Code</th>
              <th className="px-4 py-3 text-center font-medium w-20">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {visibleAccounts.map((account) => (
              <tr key={account.code} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center" style={{ paddingLeft: `${account.level * 24}px` }}>
                    {account.hasChildren ? (
                      <button 
                        onClick={() => toggleExpand(account.code)}
                        className="p-1 hover:bg-slate-100 rounded mr-2"
                      >
                        {expandedAccounts.includes(account.code) 
                          ? <ChevronDown size={16} /> 
                          : <ChevronRight size={16} />}
                      </button>
                    ) : <span className="w-7" />}
                    <div>
                      <span className="font-mono text-sm text-slate-500">{account.code}</span>
                      <span className="ml-2 text-sm font-medium text-slate-900">{account.name}</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <AccountTypeBadge type={account.type} />
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">USD</td>
                <td className="px-4 py-3 text-sm text-right font-medium text-slate-900">
                  ${account.balance.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-center">
                  <StatusBadge status="active" />
                </td>
                <td className="px-4 py-3 text-sm font-mono text-slate-500">{account.code}</td>
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
// JOURNAL ENTRIES PAGE
// ============================================================
const JournalEntriesPage = () => {
  const [showForm, setShowForm] = useState(false);
  
  const entries = [
    { id: 'JE-2024-0142', date: '2024-11-25', reference: 'INV-2024-089', description: 'Sales Invoice Posting', status: 'posted', debit: 125000, credit: 125000, source: 'Sales' },
    { id: 'JE-2024-0141', date: '2024-11-24', reference: 'PAY-2024-056', description: 'Vendor Payment', status: 'posted', debit: 45000, credit: 45000, source: 'AP' },
    { id: 'JE-2024-0140', date: '2024-11-24', reference: 'ADJ-001', description: 'Month End Accrual', status: 'draft', debit: 8500, credit: 8500, source: 'Manual' },
    { id: 'JE-2024-0139', date: '2024-11-23', reference: 'DEP-NOV', description: 'Depreciation - November', status: 'pending', debit: 12000, credit: 12000, source: 'Assets' },
    { id: 'JE-2024-0138', date: '2024-11-22', reference: 'PAY-2024-055', description: 'Customer Receipt', status: 'posted', debit: 89000, credit: 89000, source: 'AR' },
  ];

  if (showForm) {
    return <JournalEntryForm onClose={() => setShowForm(false)} />;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Journal Entries</h2>
          <p className="text-sm text-slate-500">View and create GL journal entries</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={16} /> New Journal Entry
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Today's Entries" value="12" icon={FileText} />
        <StatCard title="Pending Approval" value="3" icon={Clock} />
        <StatCard title="Total Debits (MTD)" value="$1.2M" icon={ArrowUpRight} />
        <StatCard title="Total Credits (MTD)" value="$1.2M" icon={ArrowDownLeft} />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg">
          <Search size={18} className="text-slate-400" />
          <input type="text" placeholder="Search entries..." className="flex-1 outline-none text-sm" />
        </div>
        <input type="date" className="px-3 py-2 text-sm border border-slate-200 rounded-lg" />
        <select className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white">
          <option>All Status</option>
          <option>Posted</option>
          <option>Draft</option>
          <option>Pending</option>
        </select>
        <select className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white">
          <option>All Sources</option>
          <option>Manual</option>
          <option>Sales</option>
          <option>AP</option>
          <option>AR</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Entry #</th>
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Reference</th>
              <th className="px-4 py-3 text-left font-medium">Description</th>
              <th className="px-4 py-3 text-left font-medium">Source</th>
              <th className="px-4 py-3 text-right font-medium">Debit</th>
              <th className="px-4 py-3 text-right font-medium">Credit</th>
              <th className="px-4 py-3 text-center font-medium">Status</th>
              <th className="px-4 py-3 text-center font-medium w-20">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {entries.map((entry) => (
              <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-blue-600">{entry.id}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{entry.date}</td>
                <td className="px-4 py-3 text-sm font-mono text-slate-500">{entry.reference}</td>
                <td className="px-4 py-3 text-sm text-slate-900">{entry.description}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 text-xs rounded bg-slate-100 text-slate-600">{entry.source}</span>
                </td>
                <td className="px-4 py-3 text-sm text-right font-medium text-slate-900">${entry.debit.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-right font-medium text-slate-900">${entry.credit.toLocaleString()}</td>
                <td className="px-4 py-3 text-center"><StatusBadge status={entry.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 hover:bg-slate-100 rounded"><Eye size={16} className="text-slate-400" /></button>
                    <button className="p-1.5 hover:bg-slate-100 rounded"><Copy size={16} className="text-slate-400" /></button>
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
// JOURNAL ENTRY FORM
// ============================================================
const JournalEntryForm = ({ onClose, entry = null }) => {
  const [lines, setLines] = useState([
    { id: 1, account: '1120', accountName: 'Accounts Receivable', debit: 10000, credit: 0, costCenter: '', project: '', description: '' },
    { id: 2, account: '4100', accountName: 'Sales Revenue', debit: 0, credit: 10000, costCenter: '', project: '', description: '' },
  ]);

  const totalDebit = lines.reduce((sum, l) => sum + (l.debit || 0), 0);
  const totalCredit = lines.reduce((sum, l) => sum + (l.credit || 0), 0);
  const isBalanced = totalDebit === totalCredit;

  const addLine = () => {
    setLines([...lines, { id: lines.length + 1, account: '', accountName: '', debit: 0, credit: 0, costCenter: '', project: '', description: '' }]);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">New Journal Entry</h2>
            <p className="text-sm text-slate-500">Create a manual GL journal entry</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
            <Save size={16} /> Save Draft
          </button>
          <button 
            disabled={!isBalanced}
            className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg ${isBalanced ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
          >
            <Send size={16} /> Post Entry
          </button>
        </div>
      </div>

      {/* Form Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Entry Number</label>
            <input type="text" value="JE-2024-0143" disabled className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Posting Date *</label>
            <input type="date" defaultValue="2024-11-25" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Document Date</label>
            <input type="date" defaultValue="2024-11-25" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Currency</label>
            <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
              <option>USD - US Dollar</option>
              <option>EUR - Euro</option>
              <option>EGP - Egyptian Pound</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Reference</label>
            <input type="text" placeholder="External reference number" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
            <input type="text" placeholder="Journal entry description" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Entry Lines */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-medium text-slate-900">Entry Lines</h3>
          <button onClick={addLine} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
            <Plus size={16} /> Add Line
          </button>
        </div>
        <table className="w-full">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left font-medium w-12">#</th>
              <th className="px-4 py-3 text-left font-medium">Account *</th>
              <th className="px-4 py-3 text-right font-medium w-32">Debit</th>
              <th className="px-4 py-3 text-right font-medium w-32">Credit</th>
              <th className="px-4 py-3 text-left font-medium w-36">Cost Center</th>
              <th className="px-4 py-3 text-left font-medium w-36">Project</th>
              <th className="px-4 py-3 text-left font-medium">Description</th>
              <th className="px-4 py-3 w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {lines.map((line, idx) => (
              <tr key={line.id}>
                <td className="px-4 py-2 text-sm text-slate-500">{idx + 1}</td>
                <td className="px-4 py-2">
                  <select className="w-full px-2 py-1.5 text-sm border border-slate-200 rounded">
                    <option value="">Select account...</option>
                    <option value="1110">1110 - Cash</option>
                    <option value="1120" selected={line.account === '1120'}>1120 - Accounts Receivable</option>
                    <option value="2100">2100 - Accounts Payable</option>
                    <option value="4100" selected={line.account === '4100'}>4100 - Sales Revenue</option>
                    <option value="5100">5100 - Cost of Goods</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <input type="number" value={line.debit || ''} placeholder="0.00" className="w-full px-2 py-1.5 text-sm text-right border border-slate-200 rounded" />
                </td>
                <td className="px-4 py-2">
                  <input type="number" value={line.credit || ''} placeholder="0.00" className="w-full px-2 py-1.5 text-sm text-right border border-slate-200 rounded" />
                </td>
                <td className="px-4 py-2">
                  <select className="w-full px-2 py-1.5 text-sm border border-slate-200 rounded">
                    <option value="">None</option>
                    <option>CC-001</option>
                    <option>CC-002</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <select className="w-full px-2 py-1.5 text-sm border border-slate-200 rounded">
                    <option value="">None</option>
                    <option>PRJ-001</option>
                    <option>PRJ-002</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <input type="text" placeholder="Line description" className="w-full px-2 py-1.5 text-sm border border-slate-200 rounded" />
                </td>
                <td className="px-4 py-2">
                  <button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-50">
            <tr>
              <td colSpan={2} className="px-4 py-3 text-sm font-medium text-slate-900 text-right">Totals:</td>
              <td className="px-4 py-3 text-sm font-bold text-right text-slate-900">${totalDebit.toLocaleString()}</td>
              <td className="px-4 py-3 text-sm font-bold text-right text-slate-900">${totalCredit.toLocaleString()}</td>
              <td colSpan={3} className="px-4 py-3">
                <div className={`flex items-center gap-2 ${isBalanced ? 'text-emerald-600' : 'text-red-500'}`}>
                  {isBalanced ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                  <span className="text-sm font-medium">
                    {isBalanced ? 'Entry is balanced' : `Out of balance: $${Math.abs(totalDebit - totalCredit).toLocaleString()}`}
                  </span>
                </div>
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

// ============================================================
// BANK RECONCILIATION PAGE
// ============================================================
const BankReconciliationPage = () => {
  const [selectedBank, setSelectedBank] = useState('BA-001');
  
  const bankAccounts = [
    { id: 'BA-001', name: 'Main Operating Account', bank: 'First National Bank', balance: 485000, glBalance: 478500, status: 'partial' },
    { id: 'BA-002', name: 'Payroll Account', bank: 'City Bank', balance: 125000, glBalance: 125000, status: 'reconciled' },
    { id: 'BA-003', name: 'Project Escrow', bank: 'Trust Bank', balance: 890000, glBalance: 890000, status: 'reconciled' },
  ];

  const transactions = [
    { id: 1, date: '2024-11-25', reference: 'CHK-4521', description: 'Vendor Payment - ABC Supplies', amount: -12500, matched: false },
    { id: 2, date: '2024-11-24', reference: 'DEP-001', description: 'Customer Payment Received', amount: 45000, matched: true, matchedTo: 'JE-2024-0138' },
    { id: 3, date: '2024-11-24', reference: 'FEE-NOV', description: 'Bank Service Fee', amount: -150, matched: false },
    { id: 4, date: '2024-11-23', reference: 'TRF-IN', description: 'Transfer from Savings', amount: 25000, matched: true, matchedTo: 'JE-2024-0135' },
    { id: 5, date: '2024-11-22', reference: 'CHK-4520', description: 'Utility Payment', amount: -3200, matched: false },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Bank Reconciliation</h2>
          <p className="text-sm text-slate-500">Match bank statements with GL entries</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
            <Upload size={16} /> Import Statement
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <CheckCircle size={16} /> Complete Reconciliation
          </button>
        </div>
      </div>

      {/* Bank Account Cards */}
      <div className="grid grid-cols-3 gap-4">
        {bankAccounts.map(account => (
          <div 
            key={account.id}
            onClick={() => setSelectedBank(account.id)}
            className={`bg-white rounded-xl border-2 p-4 cursor-pointer transition-all ${
              selectedBank === account.id ? 'border-blue-500 shadow-md' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg bg-blue-50">
                <Landmark size={20} className="text-blue-600" />
              </div>
              <StatusBadge status={account.status} />
            </div>
            <h3 className="font-medium text-slate-900">{account.name}</h3>
            <p className="text-sm text-slate-500">{account.bank}</p>
            <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-slate-400">Bank Balance</p>
                <p className="text-sm font-semibold text-slate-900">${account.balance.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">GL Balance</p>
                <p className="text-sm font-semibold text-slate-900">${account.glBalance.toLocaleString()}</p>
              </div>
            </div>
            {account.balance !== account.glBalance && (
              <div className="mt-2 px-2 py-1 rounded bg-amber-50 text-amber-700 text-xs">
                Difference: ${Math.abs(account.balance - account.glBalance).toLocaleString()}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Reconciliation Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-medium text-slate-900">Statement Transactions</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">3 of 5 matched</span>
            <button className="text-sm text-blue-600 hover:text-blue-700">Auto-Match</button>
          </div>
        </div>
        <table className="w-full">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-center w-12">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Reference</th>
              <th className="px-4 py-3 text-left font-medium">Description</th>
              <th className="px-4 py-3 text-right font-medium">Amount</th>
              <th className="px-4 py-3 text-center font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Matched To</th>
              <th className="px-4 py-3 text-center font-medium w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.map((txn) => (
              <tr key={txn.id} className={`hover:bg-slate-50 transition-colors ${txn.matched ? 'bg-emerald-50/30' : ''}`}>
                <td className="px-4 py-3 text-center">
                  <input type="checkbox" className="rounded" checked={txn.matched} readOnly />
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{txn.date}</td>
                <td className="px-4 py-3 text-sm font-mono text-slate-500">{txn.reference}</td>
                <td className="px-4 py-3 text-sm text-slate-900">{txn.description}</td>
                <td className={`px-4 py-3 text-sm text-right font-medium ${txn.amount >= 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {txn.amount >= 0 ? '+' : ''}{txn.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-center">
                  {txn.matched ? (
                    <span className="inline-flex items-center gap-1 text-emerald-600 text-xs">
                      <CheckCircle size={14} /> Matched
                    </span>
                  ) : (
                    <span className="text-amber-600 text-xs">Unmatched</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-blue-600">{txn.matchedTo || '-'}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                      {txn.matched ? 'Unmatch' : 'Match'}
                    </button>
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
// FISCAL PERIODS PAGE
// ============================================================
const FiscalPeriodsPage = () => {
  const periods = [
    { period: 1, name: 'January 2024', start: '2024-01-01', end: '2024-01-31', status: 'closed' },
    { period: 2, name: 'February 2024', start: '2024-02-01', end: '2024-02-29', status: 'closed' },
    { period: 3, name: 'March 2024', start: '2024-03-01', end: '2024-03-31', status: 'closed' },
    { period: 4, name: 'April 2024', start: '2024-04-01', end: '2024-04-30', status: 'closed' },
    { period: 5, name: 'May 2024', start: '2024-05-01', end: '2024-05-31', status: 'closed' },
    { period: 6, name: 'June 2024', start: '2024-06-01', end: '2024-06-30', status: 'closed' },
    { period: 7, name: 'July 2024', start: '2024-07-01', end: '2024-07-31', status: 'closed' },
    { period: 8, name: 'August 2024', start: '2024-08-01', end: '2024-08-31', status: 'closed' },
    { period: 9, name: 'September 2024', start: '2024-09-01', end: '2024-09-30', status: 'closed' },
    { period: 10, name: 'October 2024', start: '2024-10-01', end: '2024-10-31', status: 'closed' },
    { period: 11, name: 'November 2024', start: '2024-11-01', end: '2024-11-30', status: 'open' },
    { period: 12, name: 'December 2024', start: '2024-12-01', end: '2024-12-31', status: 'open' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Fiscal Periods</h2>
          <p className="text-sm text-slate-500">Manage fiscal years and periods</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={16} /> Create Fiscal Year
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium text-slate-900">Fiscal Year 2024</h3>
            <p className="text-sm text-slate-500">Jan 1, 2024 - Dec 31, 2024</p>
          </div>
          <StatusBadge status="open" />
        </div>

        <div className="grid grid-cols-6 gap-3">
          {periods.map(p => (
            <div 
              key={p.period}
              className={`p-3 rounded-lg border text-center ${
                p.status === 'open' 
                  ? 'border-emerald-200 bg-emerald-50' 
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              <p className="text-xs text-slate-500">Period {p.period}</p>
              <p className="text-sm font-medium text-slate-900">{p.name.split(' ')[0]}</p>
              <StatusBadge status={p.status} />
            </div>
          ))}
        </div>
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
    { id: 'banking', label: 'Bank Accounts' },
    { id: 'reconciliation', label: 'Reconciliation' },
    { id: 'cash', label: 'Cash Management' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Module Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100">
              <Wallet size={24} className="text-blue-600" />
            </div>
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

      {/* Content */}
      <div className="p-6">
        {activeTab === 'coa' && <ChartOfAccountsPage />}
        {activeTab === 'journals' && <JournalEntriesPage />}
        {activeTab === 'periods' && <FiscalPeriodsPage />}
        {activeTab === 'reconciliation' && <BankReconciliationPage />}
        {(activeTab === 'banking' || activeTab === 'cash') && (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
            <Landmark size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900">Coming Soon</h3>
            <p className="text-sm text-slate-500 mt-1">This section is under development</p>
          </div>
        )}
      </div>
    </div>
  );
}
