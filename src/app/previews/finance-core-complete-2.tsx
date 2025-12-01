import React, { useState } from 'react';
import { 
  ChevronRight, ChevronDown, Plus, Search, Download, Upload, RefreshCw,
  Edit, Trash2, Eye, Copy, X, AlertCircle, CheckCircle, Settings,
  Wallet, FileText, Calendar, DollarSign, ArrowUpRight, ArrowDownLeft,
  Clock, ChevronLeft, Save, Send, TrendingUp, TrendingDown, Landmark,
  Link2, AlertTriangle, Lock, Unlock, History, Filter, RotateCcw,
  Repeat, FileUp, Check, XCircle, Activity, Database, Server, Zap
} from 'lucide-react';

// Shared Components
const Tabs = ({ tabs, active, onChange }) => (
  <div className="flex border-b border-slate-200 overflow-x-auto">
    {tabs.map(tab => (
      <button key={tab.id} onClick={() => onChange(tab.id)}
        className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${active === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
        {tab.label}{tab.badge && <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-slate-100">{tab.badge}</span>}
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
  const styles = { open: 'bg-emerald-100 text-emerald-700', closed: 'bg-slate-100 text-slate-600', locked: 'bg-red-100 text-red-700', active: 'bg-blue-100 text-blue-700', posted: 'bg-emerald-100 text-emerald-700', draft: 'bg-amber-100 text-amber-700', pending: 'bg-amber-100 text-amber-700', synced: 'bg-emerald-100 text-emerald-700', failed: 'bg-red-100 text-red-700', partial: 'bg-amber-100 text-amber-700', success: 'bg-emerald-100 text-emerald-700', error: 'bg-red-100 text-red-700' };
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-slate-100'}`}>{status?.charAt(0).toUpperCase() + status?.slice(1)}</span>;
};

const StatCard = ({ title, value, subtitle, icon: Icon, color = 'blue' }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
      </div>
      <div className={`p-3 rounded-lg ${color === 'blue' ? 'bg-blue-50' : color === 'green' ? 'bg-emerald-50' : color === 'amber' ? 'bg-amber-50' : 'bg-slate-50'}`}>
        <Icon size={20} className={`${color === 'blue' ? 'text-blue-600' : color === 'green' ? 'text-emerald-600' : color === 'amber' ? 'text-amber-600' : 'text-slate-600'}`} />
      </div>
    </div>
  </div>
);

// ============================================================
// JOURNAL ENTRIES PAGE (Enhanced)
// ============================================================
const JournalEntriesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [showReversal, setShowReversal] = useState(null);
  
  const entries = [
    { id: 'JE-2024-0142', date: '2024-11-25', reference: 'INV-089', description: 'Sales Invoice Posting', status: 'posted', debit: 125000, credit: 125000, source: 'Sales', reversible: true },
    { id: 'JE-2024-0141', date: '2024-11-24', reference: 'PAY-056', description: 'Vendor Payment', status: 'posted', debit: 45000, credit: 45000, source: 'AP', reversible: true },
    { id: 'JE-2024-0140', date: '2024-11-24', reference: 'ADJ-001', description: 'Month End Accrual', status: 'draft', debit: 8500, credit: 8500, source: 'Manual', reversible: false },
    { id: 'JE-2024-0139', date: '2024-11-23', reference: 'DEP-NOV', description: 'Depreciation - November', status: 'pending', debit: 12000, credit: 12000, source: 'Assets', reversible: false },
  ];

  if (showForm) return <JournalEntryForm onClose={() => setShowForm(false)} />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Journal Entries</h2>
          <p className="text-sm text-slate-500">View and create GL journal entries</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
            <Repeat size={16} /> Recurring
          </button>
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={16} /> New Entry
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Today's Entries" value="12" icon={FileText} />
        <StatCard title="Pending Approval" value="3" icon={Clock} color="amber" />
        <StatCard title="Total Debits (MTD)" value="$1.2M" icon={ArrowUpRight} color="green" />
        <StatCard title="Total Credits (MTD)" value="$1.2M" icon={ArrowDownLeft} />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg">
          <Search size={18} className="text-slate-400" />
          <input type="text" placeholder="Search entries..." className="flex-1 outline-none text-sm" />
        </div>
        <input type="date" className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white" />
        <select className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white">
          <option>All Status</option><option>Posted</option><option>Draft</option><option>Pending</option>
        </select>
        <select className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white">
          <option>All Sources</option><option>Manual</option><option>Sales</option><option>AP</option><option>AR</option>
        </select>
      </div>

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
              <th className="px-4 py-3 text-center font-medium w-32">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {entries.map(entry => (
              <tr key={entry.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-blue-600">{entry.id}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{entry.date}</td>
                <td className="px-4 py-3 text-sm font-mono text-slate-500">{entry.reference}</td>
                <td className="px-4 py-3 text-sm text-slate-900">{entry.description}</td>
                <td className="px-4 py-3"><span className="px-2 py-0.5 text-xs rounded bg-slate-100 text-slate-600">{entry.source}</span></td>
                <td className="px-4 py-3 text-sm text-right font-medium">${entry.debit.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-right font-medium">${entry.credit.toLocaleString()}</td>
                <td className="px-4 py-3 text-center"><StatusBadge status={entry.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 hover:bg-slate-100 rounded" title="View"><Eye size={16} className="text-slate-400" /></button>
                    <button className="p-1.5 hover:bg-slate-100 rounded" title="Copy"><Copy size={16} className="text-slate-400" /></button>
                    {entry.reversible && <button onClick={() => setShowReversal(entry)} className="p-1.5 hover:bg-slate-100 rounded" title="Reverse"><RotateCcw size={16} className="text-slate-400" /></button>}
                    <button className="p-1.5 hover:bg-slate-100 rounded" title="Audit Trail"><History size={16} className="text-slate-400" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={!!showReversal} onClose={() => setShowReversal(null)} title="Reverse Journal Entry" size="sm">
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-amber-600 flex-shrink-0" size={20} />
              <div>
                <p className="text-sm font-medium text-amber-800">Confirm Reversal</p>
                <p className="text-sm text-amber-700 mt-1">This will create a new reversing entry for {showReversal?.id}</p>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Reversal Date</label>
            <input type="date" defaultValue="2024-11-26" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Reversal</label>
            <textarea rows={2} placeholder="Enter reason..." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button onClick={() => setShowReversal(null)} className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
            <button className="px-4 py-2 text-sm bg-amber-600 text-white rounded-lg hover:bg-amber-700">Create Reversal</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Journal Entry Form
const JournalEntryForm = ({ onClose }) => {
  const [lines, setLines] = useState([
    { id: 1, account: '1120', debit: 10000, credit: 0 },
    { id: 2, account: '4100', debit: 0, credit: 10000 },
  ]);
  const totalDebit = lines.reduce((s, l) => s + (l.debit || 0), 0);
  const totalCredit = lines.reduce((s, l) => s + (l.credit || 0), 0);
  const isBalanced = totalDebit === totalCredit && totalDebit > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><ChevronLeft size={20} /></button>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">New Journal Entry</h2>
            <p className="text-sm text-slate-500">Create manual GL entry</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50"><Save size={16} className="inline mr-2" />Save Draft</button>
          <button disabled={!isBalanced} className={`px-4 py-2 text-sm rounded-lg ${isBalanced ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
            <Send size={16} className="inline mr-2" />Post Entry
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="grid grid-cols-4 gap-4">
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Entry Number</label><input type="text" value="JE-2024-0143" disabled className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50" /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Posting Date *</label><input type="date" defaultValue="2024-11-25" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Currency</label><select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg"><option>USD</option><option>EUR</option></select></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Reference</label><input type="text" placeholder="External ref" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" /></div>
          <div className="col-span-4"><label className="block text-sm font-medium text-slate-700 mb-1">Description *</label><input type="text" placeholder="Journal entry description" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" /></div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-medium text-slate-900">Entry Lines</h3>
          <button onClick={() => setLines([...lines, { id: lines.length + 1, account: '', debit: 0, credit: 0 }])} className="text-sm text-blue-600 hover:text-blue-700"><Plus size={16} className="inline mr-1" />Add Line</button>
        </div>
        <table className="w-full">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left w-12">#</th>
              <th className="px-4 py-3 text-left">Account *</th>
              <th className="px-4 py-3 text-right w-32">Debit</th>
              <th className="px-4 py-3 text-right w-32">Credit</th>
              <th className="px-4 py-3 text-left w-32">Cost Center</th>
              <th className="px-4 py-3 text-left w-32">Project</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {lines.map((line, idx) => (
              <tr key={line.id}>
                <td className="px-4 py-2 text-sm text-slate-500">{idx + 1}</td>
                <td className="px-4 py-2"><select defaultValue={line.account} className="w-full px-2 py-1.5 text-sm border border-slate-200 rounded"><option value="">Select...</option><option value="1110">1110 - Cash</option><option value="1120">1120 - AR</option><option value="2100">2100 - AP</option><option value="4100">4100 - Sales</option><option value="5100">5100 - COGS</option></select></td>
                <td className="px-4 py-2"><input type="number" defaultValue={line.debit || ''} placeholder="0.00" className="w-full px-2 py-1.5 text-sm text-right border border-slate-200 rounded" /></td>
                <td className="px-4 py-2"><input type="number" defaultValue={line.credit || ''} placeholder="0.00" className="w-full px-2 py-1.5 text-sm text-right border border-slate-200 rounded" /></td>
                <td className="px-4 py-2"><select className="w-full px-2 py-1.5 text-sm border border-slate-200 rounded"><option value="">None</option><option>CC-001</option></select></td>
                <td className="px-4 py-2"><select className="w-full px-2 py-1.5 text-sm border border-slate-200 rounded"><option value="">None</option><option>PRJ-001</option></select></td>
                <td className="px-4 py-2"><input type="text" placeholder="Description" className="w-full px-2 py-1.5 text-sm border border-slate-200 rounded" /></td>
                <td className="px-4 py-2"><button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-red-500"><Trash2 size={16} /></button></td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-50">
            <tr>
              <td colSpan={2} className="px-4 py-3 text-sm font-medium text-right">Totals:</td>
              <td className="px-4 py-3 text-sm font-bold text-right">${totalDebit.toLocaleString()}</td>
              <td className="px-4 py-3 text-sm font-bold text-right">${totalCredit.toLocaleString()}</td>
              <td colSpan={4} className="px-4 py-3">
                <div className={`flex items-center gap-2 ${isBalanced ? 'text-emerald-600' : 'text-red-500'}`}>
                  {isBalanced ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                  <span className="text-sm font-medium">{isBalanced ? 'Balanced' : `Out of balance: $${Math.abs(totalDebit - totalCredit).toLocaleString()}`}</span>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

// ============================================================
// FISCAL PERIODS PAGE (Enhanced)
// ============================================================
const FiscalPeriodsPage = () => {
  const [showAction, setShowAction] = useState(null);
  
  const periods = [
    { period: 1, name: 'January', start: '2024-01-01', end: '2024-01-31', status: 'closed', transactions: 245 },
    { period: 2, name: 'February', start: '2024-02-01', end: '2024-02-29', status: 'closed', transactions: 312 },
    { period: 3, name: 'March', start: '2024-03-01', end: '2024-03-31', status: 'closed', transactions: 287 },
    { period: 4, name: 'April', start: '2024-04-01', end: '2024-04-30', status: 'closed', transactions: 198 },
    { period: 5, name: 'May', start: '2024-05-01', end: '2024-05-31', status: 'closed', transactions: 265 },
    { period: 6, name: 'June', start: '2024-06-01', end: '2024-06-30', status: 'closed', transactions: 301 },
    { period: 7, name: 'July', start: '2024-07-01', end: '2024-07-31', status: 'closed', transactions: 278 },
    { period: 8, name: 'August', start: '2024-08-01', end: '2024-08-31', status: 'closed', transactions: 234 },
    { period: 9, name: 'September', start: '2024-09-01', end: '2024-09-30', status: 'closed', transactions: 289 },
    { period: 10, name: 'October', start: '2024-10-01', end: '2024-10-31', status: 'closed', transactions: 312 },
    { period: 11, name: 'November', start: '2024-11-01', end: '2024-11-30', status: 'open', transactions: 156 },
    { period: 12, name: 'December', start: '2024-12-01', end: '2024-12-31', status: 'open', transactions: 0 },
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
            <h3 className="font-semibold text-slate-900">Fiscal Year 2024</h3>
            <p className="text-sm text-slate-500">January 1, 2024 - December 31, 2024</p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status="open" />
            <button className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">Year-End Close</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Period</th>
                <th className="px-4 py-3 text-left font-medium">Month</th>
                <th className="px-4 py-3 text-left font-medium">Start Date</th>
                <th className="px-4 py-3 text-left font-medium">End Date</th>
                <th className="px-4 py-3 text-right font-medium">Transactions</th>
                <th className="px-4 py-3 text-center font-medium">Status</th>
                <th className="px-4 py-3 text-center font-medium w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {periods.map(p => (
                <tr key={p.period} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{p.period}</td>
                  <td className="px-4 py-3 text-sm text-slate-900">{p.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{p.start}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{p.end}</td>
                  <td className="px-4 py-3 text-sm text-right text-slate-600">{p.transactions}</td>
                  <td className="px-4 py-3 text-center"><StatusBadge status={p.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      {p.status === 'open' ? (
                        <button onClick={() => setShowAction({ type: 'close', period: p })} className="flex items-center gap-1 px-2 py-1 text-xs bg-amber-50 text-amber-700 rounded hover:bg-amber-100">
                          <Lock size={14} /> Close
                        </button>
                      ) : (
                        <button onClick={() => setShowAction({ type: 'reopen', period: p })} className="flex items-center gap-1 px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded hover:bg-slate-200">
                          <Unlock size={14} /> Reopen
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={!!showAction} onClose={() => setShowAction(null)} title={showAction?.type === 'close' ? 'Close Period' : 'Reopen Period'} size="sm">
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${showAction?.type === 'close' ? 'bg-amber-50 border border-amber-200' : 'bg-blue-50 border border-blue-200'}`}>
            <div className="flex items-start gap-3">
              {showAction?.type === 'close' ? <Lock className="text-amber-600" size={20} /> : <Unlock className="text-blue-600" size={20} />}
              <div>
                <p className="text-sm font-medium">{showAction?.type === 'close' ? 'Close ' : 'Reopen '}{showAction?.period?.name} 2024?</p>
                <p className="text-sm mt-1">{showAction?.type === 'close' ? 'No more transactions can be posted to this period.' : 'This will allow posting transactions to this period.'}</p>
              </div>
            </div>
          </div>
          {showAction?.type === 'close' && (
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm text-slate-700">Run validation checks before closing</span>
            </label>
          )}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button onClick={() => setShowAction(null)} className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
            <button className={`px-4 py-2 text-sm text-white rounded-lg ${showAction?.type === 'close' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
              {showAction?.type === 'close' ? 'Close Period' : 'Reopen Period'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ============================================================
// TRIAL BALANCE & REPORTS
// ============================================================
const ReportsPage = () => {
  const [activeReport, setActiveReport] = useState('trial-balance');
  
  const trialBalanceData = [
    { code: '1110', name: 'Cash and Cash Equivalents', type: 'Asset', debit: 450000, credit: 0 },
    { code: '1120', name: 'Accounts Receivable', type: 'Asset', debit: 680000, credit: 0 },
    { code: '1130', name: 'Inventory', type: 'Asset', debit: 70000, credit: 0 },
    { code: '1200', name: 'Fixed Assets', type: 'Asset', debit: 1250000, credit: 0 },
    { code: '2100', name: 'Accounts Payable', type: 'Liability', debit: 0, credit: 340000 },
    { code: '2200', name: 'Accrued Expenses', type: 'Liability', debit: 0, credit: 125000 },
    { code: '3100', name: 'Common Stock', type: 'Equity', debit: 0, credit: 500000 },
    { code: '3200', name: 'Retained Earnings', type: 'Equity', debit: 0, credit: 285000 },
    { code: '4100', name: 'Sales Revenue', type: 'Revenue', debit: 0, credit: 2800000 },
    { code: '4200', name: 'Service Revenue', type: 'Revenue', debit: 0, credit: 400000 },
    { code: '5100', name: 'Cost of Goods Sold', type: 'Expense', debit: 1200000, credit: 0 },
    { code: '5200', name: 'Operating Expenses', type: 'Expense', debit: 800000, credit: 0 },
  ];

  const totalDebit = trialBalanceData.reduce((s, r) => s + r.debit, 0);
  const totalCredit = trialBalanceData.reduce((s, r) => s + r.credit, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Financial Reports</h2>
          <p className="text-sm text-slate-500">Generate and export reports</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
          <Download size={16} /> Export PDF
        </button>
      </div>

      <div className="flex gap-2">
        {[{ id: 'trial-balance', label: 'Trial Balance' }, { id: 'income', label: 'Income Statement' }, { id: 'balance-sheet', label: 'Balance Sheet' }, { id: 'cash-flow', label: 'Cash Flow' }].map(r => (
          <button key={r.id} onClick={() => setActiveReport(r.id)} className={`px-4 py-2 text-sm rounded-lg ${activeReport === r.id ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 hover:bg-slate-50'}`}>{r.label}</button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900">Trial Balance</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">As of:</span>
            <input type="date" defaultValue="2024-11-30" className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg" />
          </div>
        </div>

        <table className="w-full">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Account Code</th>
              <th className="px-4 py-3 text-left font-medium">Account Name</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-right font-medium">Debit</th>
              <th className="px-4 py-3 text-right font-medium">Credit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {trialBalanceData.map(row => (
              <tr key={row.code} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-mono text-slate-500">{row.code}</td>
                <td className="px-4 py-3 text-sm text-slate-900">{row.name}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{row.type}</td>
                <td className="px-4 py-3 text-sm text-right font-medium">{row.debit ? `$${row.debit.toLocaleString()}` : '-'}</td>
                <td className="px-4 py-3 text-sm text-right font-medium">{row.credit ? `$${row.credit.toLocaleString()}` : '-'}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-100 font-bold">
            <tr>
              <td colSpan={3} className="px-4 py-3 text-sm text-slate-900">TOTAL</td>
              <td className="px-4 py-3 text-sm text-right text-slate-900">${totalDebit.toLocaleString()}</td>
              <td className="px-4 py-3 text-sm text-right text-slate-900">${totalCredit.toLocaleString()}</td>
            </tr>
            <tr>
              <td colSpan={5} className="px-4 py-3 text-center">
                {totalDebit === totalCredit ? (
                  <span className="text-emerald-600 text-sm"><CheckCircle size={16} className="inline mr-1" />Trial Balance is in balance</span>
                ) : (
                  <span className="text-red-600 text-sm"><AlertCircle size={16} className="inline mr-1" />Out of balance by ${Math.abs(totalDebit - totalCredit).toLocaleString()}</span>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

// ============================================================
// SAP INTEGRATION PAGE
// ============================================================
const SAPIntegrationPage = () => {
  const [activeTab, setActiveTab] = useState('mapping');
  
  const mappings = [
    { local: '1110', localName: 'Cash', sap: '_SYS_CASH', sapName: 'Cash Account', status: 'synced', lastSync: '2024-11-25 10:30' },
    { local: '1120', localName: 'Accounts Receivable', sap: '_SYS_AR', sapName: 'A/R Control', status: 'synced', lastSync: '2024-11-25 10:30' },
    { local: '2100', localName: 'Accounts Payable', sap: '_SYS_AP', sapName: 'A/P Control', status: 'synced', lastSync: '2024-11-25 10:30' },
    { local: '4100', localName: 'Sales Revenue', sap: 'SAL001', sapName: 'Sales - Local', status: 'synced', lastSync: '2024-11-25 10:30' },
    { local: '5100', localName: 'COGS', sap: 'COS001', sapName: 'Cost of Sales', status: 'failed', lastSync: '2024-11-25 09:15' },
  ];

  const syncLogs = [
    { id: 'SYNC-001', timestamp: '2024-11-25 10:30:22', type: 'GL Accounts', direction: 'Pull', records: 156, status: 'success', duration: '2.3s' },
    { id: 'SYNC-002', timestamp: '2024-11-25 10:30:15', type: 'Journal Entries', direction: 'Push', records: 12, status: 'success', duration: '1.8s' },
    { id: 'SYNC-003', timestamp: '2024-11-25 09:15:00', type: 'GL Accounts', direction: 'Pull', records: 0, status: 'error', duration: '0.5s', error: 'Connection timeout' },
    { id: 'SYNC-004', timestamp: '2024-11-25 08:00:00', type: 'Exchange Rates', direction: 'Pull', records: 6, status: 'success', duration: '0.8s' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">SAP B1 Integration</h2>
          <p className="text-sm text-slate-500">Account mapping and sync status</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm">
            <CheckCircle size={16} /> Connected to SAP B1
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <RefreshCw size={16} /> Sync Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Mapped Accounts" value="156" subtitle="of 162 total" icon={Link2} />
        <StatCard title="Last Sync" value="10:30 AM" subtitle="Today" icon={RefreshCw} color="green" />
        <StatCard title="Pending Sync" value="3" subtitle="Journal entries" icon={Clock} color="amber" />
        <StatCard title="Sync Errors" value="1" subtitle="Needs attention" icon={AlertCircle} color="red" />
      </div>

      <Tabs tabs={[{ id: 'mapping', label: 'Account Mapping' }, { id: 'logs', label: 'Sync Logs' }, { id: 'settings', label: 'Settings' }]} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'mapping' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Local Account</th>
                <th className="px-4 py-3 text-left font-medium">Local Name</th>
                <th className="px-4 py-3 text-center font-medium w-12"><ArrowRightLeft size={14} /></th>
                <th className="px-4 py-3 text-left font-medium">SAP Account</th>
                <th className="px-4 py-3 text-left font-medium">SAP Name</th>
                <th className="px-4 py-3 text-center font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Last Sync</th>
                <th className="px-4 py-3 text-center font-medium w-20">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mappings.map(m => (
                <tr key={m.local} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-mono text-blue-600">{m.local}</td>
                  <td className="px-4 py-3 text-sm text-slate-900">{m.localName}</td>
                  <td className="px-4 py-3 text-center"><Link2 size={14} className="text-slate-400 mx-auto" /></td>
                  <td className="px-4 py-3 text-sm font-mono text-slate-600">{m.sap}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{m.sapName}</td>
                  <td className="px-4 py-3 text-center"><StatusBadge status={m.status} /></td>
                  <td className="px-4 py-3 text-sm text-slate-500">{m.lastSync}</td>
                  <td className="px-4 py-3"><button className="p-1.5 hover:bg-slate-100 rounded"><Edit size={16} className="text-slate-400" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Timestamp</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Direction</th>
                <th className="px-4 py-3 text-right font-medium">Records</th>
                <th className="px-4 py-3 text-center font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Duration</th>
                <th className="px-4 py-3 text-left font-medium">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {syncLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-600">{log.timestamp}</td>
                  <td className="px-4 py-3 text-sm text-slate-900">{log.type}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 text-xs rounded ${log.direction === 'Pull' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{log.direction}</span></td>
                  <td className="px-4 py-3 text-sm text-right text-slate-600">{log.records}</td>
                  <td className="px-4 py-3 text-center"><StatusBadge status={log.status} /></td>
                  <td className="px-4 py-3 text-sm text-slate-500">{log.duration}</td>
                  <td className="px-4 py-3 text-sm text-red-600">{log.error || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="font-medium text-slate-900 mb-4">Connection Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1">SAP B1 Server</label><input type="text" defaultValue="sap-b1.company.com" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Company Database</label><input type="text" defaultValue="SBO_PRODUCTION" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" /></div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-slate-900 mb-4">Sync Schedule</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2"><input type="checkbox" className="rounded" defaultChecked /><span className="text-sm">Auto-sync GL accounts every hour</span></label>
              <label className="flex items-center gap-2"><input type="checkbox" className="rounded" defaultChecked /><span className="text-sm">Auto-push journal entries on post</span></label>
              <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /><span className="text-sm">Sync exchange rates daily</span></label>
            </div>
          </div>
          <div className="flex justify-end pt-4 border-t"><button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Settings</button></div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function FinanceCoreModule() {
  const [activeTab, setActiveTab] = useState('journals');

  const tabs = [
    { id: 'journals', label: 'Journal Entries', badge: '3' },
    { id: 'periods', label: 'Fiscal Periods' },
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
              <h1 className="text-xl font-bold text-slate-900">Finance Core - Part 2</h1>
              <p className="text-sm text-slate-500">Journal Entries, Periods, Reports & SAP Integration</p>
            </div>
          </div>
        </div>
        <div className="px-6"><Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} /></div>
      </div>

      <div className="p-6">
        {activeTab === 'journals' && <JournalEntriesPage />}
        {activeTab === 'periods' && <FiscalPeriodsPage />}
        {activeTab === 'reports' && <ReportsPage />}
        {activeTab === 'sap' && <SAPIntegrationPage />}
      </div>
    </div>
  );
}
