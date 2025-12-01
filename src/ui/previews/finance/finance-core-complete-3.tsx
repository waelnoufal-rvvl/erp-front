'use client';

import React, { useState } from 'react';
import { 
  ChevronRight, ChevronDown, Plus, Search, Download, Upload, RefreshCw,
  Edit, Trash2, Eye, X, AlertCircle, CheckCircle, FileText, Calendar,
  DollarSign, ArrowUpRight, ArrowDownLeft, Clock, ChevronLeft, Save,
  TrendingUp, TrendingDown, Landmark, AlertTriangle, History, Filter,
  Check, XCircle, FileUp, ArrowRight, Wallet, CreditCard, BarChart3,
  PieChart, Layers, FileCheck, Ban, ShieldCheck, Info, ExternalLink
} from 'lucide-react';

// Shared Components
const Tabs = ({ tabs, active, onChange }) => (
  <div className="flex border-b border-slate-200 overflow-x-auto">
    {tabs.map(tab => (
      <button key={tab.id} onClick={() => onChange(tab.id)}
        className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${active === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
        {tab.label}{tab.badge && <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-red-100 text-red-600">{tab.badge}</span>}
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
  const styles = { matched: 'bg-emerald-100 text-emerald-700', unmatched: 'bg-amber-100 text-amber-700', partial: 'bg-blue-100 text-blue-700', reconciled: 'bg-emerald-100 text-emerald-700', pending: 'bg-amber-100 text-amber-700', success: 'bg-emerald-100 text-emerald-700', failed: 'bg-red-100 text-red-700', warning: 'bg-amber-100 text-amber-700', active: 'bg-blue-100 text-blue-700', inactive: 'bg-slate-100 text-slate-500' };
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
      <div className={`p-3 rounded-lg ${color === 'blue' ? 'bg-blue-50' : color === 'green' ? 'bg-emerald-50' : color === 'amber' ? 'bg-amber-50' : color === 'red' ? 'bg-red-50' : 'bg-slate-50'}`}>
        <Icon size={20} className={`${color === 'blue' ? 'text-blue-600' : color === 'green' ? 'text-emerald-600' : color === 'amber' ? 'text-amber-600' : color === 'red' ? 'text-red-600' : 'text-slate-600'}`} />
      </div>
    </div>
  </div>
);

// ============================================================
// BANK RECONCILIATION PAGE (Enhanced)
// ============================================================
const BankReconciliationPage = () => {
  const [selectedBank, setSelectedBank] = useState('BA-001');
  const [showImport, setShowImport] = useState(false);
  const [selectedTxns, setSelectedTxns] = useState([]);
  
  const bankAccounts = [
    { id: 'BA-001', name: 'Main Operating', bank: 'First National', bankBalance: 485000, glBalance: 478500, difference: 6500, status: 'partial' },
    { id: 'BA-002', name: 'Payroll Account', bank: 'City Bank', bankBalance: 125000, glBalance: 125000, difference: 0, status: 'reconciled' },
  ];

  const bankTxns = [
    { id: 'BT-001', date: '2024-11-25', ref: 'CHK-4521', desc: 'Vendor Payment - ABC Supplies', amount: -12500, matched: false },
    { id: 'BT-002', date: '2024-11-24', ref: 'DEP-001', desc: 'Customer Payment - XYZ Corp', amount: 45000, matched: true, matchedTo: 'JE-2024-0138' },
    { id: 'BT-003', date: '2024-11-24', ref: 'FEE-NOV', desc: 'Bank Service Fee', amount: -150, matched: false },
    { id: 'BT-004', date: '2024-11-23', ref: 'TRF-IN', desc: 'Transfer from Savings', amount: 25000, matched: true, matchedTo: 'JE-2024-0135' },
    { id: 'BT-005', date: '2024-11-22', ref: 'CHK-4520', desc: 'Office Supplies', amount: -3200, matched: false },
    { id: 'BT-006', date: '2024-11-22', ref: 'INT-NOV', desc: 'Interest Earned', amount: 125, matched: false },
  ];

  const glTxns = [
    { id: 'JE-2024-0145', date: '2024-11-25', ref: 'PO-2024-089', desc: 'Vendor Payment Posted', amount: -12500, matched: false },
    { id: 'JE-2024-0138', date: '2024-11-24', ref: 'AR-REC-001', desc: 'Customer Receipt', amount: 45000, matched: true },
    { id: 'JE-2024-0135', date: '2024-11-23', ref: 'TRF-001', desc: 'Bank Transfer', amount: 25000, matched: true },
    { id: 'JE-2024-0132', date: '2024-11-22', ref: 'EXP-SUP', desc: 'Office Supplies Expense', amount: -3200, matched: false },
  ];

  const unmatchedBank = bankTxns.filter(t => !t.matched).reduce((s, t) => s + t.amount, 0);
  const unmatchedGL = glTxns.filter(t => !t.matched).reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Bank Reconciliation</h2>
          <p className="text-sm text-slate-500">Match bank statements with GL entries</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowImport(true)} className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
            <Upload size={16} /> Import Statement
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
            <RefreshCw size={16} /> Auto-Match
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <CheckCircle size={16} /> Complete
          </button>
        </div>
      </div>

      {/* Bank Account Selection */}
      <div className="grid grid-cols-2 gap-4">
        {bankAccounts.map(acc => (
          <div key={acc.id} onClick={() => setSelectedBank(acc.id)}
            className={`bg-white rounded-xl border-2 p-4 cursor-pointer transition-all ${selectedBank === acc.id ? 'border-blue-500 shadow-md' : 'border-slate-200 hover:border-slate-300'}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50"><Landmark size={20} className="text-blue-600" /></div>
                <div>
                  <h3 className="font-medium text-slate-900">{acc.name}</h3>
                  <p className="text-sm text-slate-500">{acc.bank}</p>
                </div>
              </div>
              <StatusBadge status={acc.status} />
            </div>
            <div className="grid grid-cols-3 gap-4 pt-3 border-t border-slate-100">
              <div>
                <p className="text-xs text-slate-400">Bank Balance</p>
                <p className="text-sm font-semibold text-slate-900">${acc.bankBalance.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">GL Balance</p>
                <p className="text-sm font-semibold text-slate-900">${acc.glBalance.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Difference</p>
                <p className={`text-sm font-semibold ${acc.difference === 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  ${acc.difference.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reconciliation Summary */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Bank Balance" value="$485,000" icon={Landmark} />
        <StatCard title="Unmatched Bank" value={`$${Math.abs(unmatchedBank).toLocaleString()}`} subtitle="4 transactions" icon={AlertCircle} color="amber" />
        <StatCard title="Unmatched GL" value={`$${Math.abs(unmatchedGL).toLocaleString()}`} subtitle="2 transactions" icon={AlertCircle} color="amber" />
        <StatCard title="GL Balance" value="$478,500" icon={FileText} />
      </div>

      {/* Split View - Bank vs GL */}
      <div className="grid grid-cols-2 gap-4">
        {/* Bank Statement Side */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
            <h3 className="font-medium text-slate-900">Bank Statement</h3>
            <p className="text-xs text-slate-500">Imported transactions</p>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {bankTxns.map(txn => (
              <div key={txn.id} className={`px-4 py-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer ${txn.matched ? 'bg-emerald-50/50' : ''} ${selectedTxns.includes(txn.id) ? 'bg-blue-50' : ''}`}
                onClick={() => !txn.matched && setSelectedTxns(prev => prev.includes(txn.id) ? prev.filter(i => i !== txn.id) : [...prev, txn.id])}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {!txn.matched && <input type="checkbox" checked={selectedTxns.includes(txn.id)} onChange={() => {}} className="rounded" />}
                    {txn.matched && <Check size={16} className="text-emerald-500" />}
                    <div>
                      <p className="text-sm font-medium text-slate-900">{txn.desc}</p>
                      <p className="text-xs text-slate-500">{txn.date} • {txn.ref}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${txn.amount >= 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                      {txn.amount >= 0 ? '+' : ''}{txn.amount.toLocaleString()}
                    </p>
                    {txn.matched && <p className="text-xs text-emerald-600">{txn.matchedTo}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GL Side */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
            <h3 className="font-medium text-slate-900">GL Transactions</h3>
            <p className="text-xs text-slate-500">Posted journal entries</p>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {glTxns.map(txn => (
              <div key={txn.id} className={`px-4 py-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer ${txn.matched ? 'bg-emerald-50/50' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {!txn.matched && <input type="checkbox" className="rounded" />}
                    {txn.matched && <Check size={16} className="text-emerald-500" />}
                    <div>
                      <p className="text-sm font-medium text-slate-900">{txn.desc}</p>
                      <p className="text-xs text-slate-500">{txn.date} • {txn.id}</p>
                    </div>
                  </div>
                  <p className={`text-sm font-medium ${txn.amount >= 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {txn.amount >= 0 ? '+' : ''}{txn.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Match Button */}
      {selectedTxns.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-4">
          <span>{selectedTxns.length} transaction(s) selected</span>
          <button className="px-4 py-1.5 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50">
            Match Selected
          </button>
          <button onClick={() => setSelectedTxns([])} className="p-1 hover:bg-blue-500 rounded"><X size={18} /></button>
        </div>
      )}

      {/* Import Statement Modal */}
      <BankStatementImportWizard isOpen={showImport} onClose={() => setShowImport(false)} />
    </div>
  );
};

// ============================================================
// BANK STATEMENT IMPORT WIZARD
// ============================================================
const BankStatementImportWizard = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [fileUploaded, setFileUploaded] = useState(false);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Import Bank Statement" size="lg">
      <div className="space-y-6">
        {/* Steps */}
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3].map(s => (
            <React.Fragment key={s}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= s ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>{s}</div>
              {s < 3 && <div className={`w-16 h-1 ${step > s ? 'bg-blue-600' : 'bg-slate-200'}`} />}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-center gap-16 text-sm text-slate-500">
          <span>Upload File</span>
          <span>Map Columns</span>
          <span>Review & Import</span>
        </div>

        {/* Step 1: Upload */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
              onClick={() => setFileUploaded(true)}>
              <FileUp size={40} className="mx-auto text-slate-400 mb-4" />
              <p className="font-medium text-slate-900">Drop your file here or click to browse</p>
              <p className="text-sm text-slate-500 mt-1">Supports CSV, OFX, QIF, MT940 formats</p>
            </div>
            {fileUploaded && (
              <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <FileCheck className="text-emerald-600" size={20} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-emerald-800">bank_statement_nov2024.csv</p>
                  <p className="text-xs text-emerald-600">24 transactions found</p>
                </div>
                <button className="text-emerald-600 hover:text-emerald-700"><X size={18} /></button>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Bank Account</label>
              <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                <option>BA-001 - Main Operating Account</option>
                <option>BA-002 - Payroll Account</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Statement Period</label>
              <div className="grid grid-cols-2 gap-4">
                <input type="date" defaultValue="2024-11-01" className="px-3 py-2 text-sm border border-slate-200 rounded-lg" />
                <input type="date" defaultValue="2024-11-30" className="px-3 py-2 text-sm border border-slate-200 rounded-lg" />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Map Columns */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="text-blue-600 flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm font-medium text-blue-800">Column Mapping</p>
                  <p className="text-sm text-blue-700">Map your file columns to the required fields</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date Column *</label>
                <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                  <option>Column A - Transaction Date</option>
                  <option>Column B - Value Date</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date Format</label>
                <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                  <option>YYYY-MM-DD</option>
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description Column *</label>
                <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                  <option>Column C - Description</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Reference Column</label>
                <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                  <option>Column B - Reference</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Amount Column *</label>
                <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                  <option>Column D - Amount (single)</option>
                  <option>Separate Debit/Credit columns</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Balance Column</label>
                <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                  <option>Column E - Running Balance</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-emerald-600 flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm font-medium text-emerald-800">Ready to Import</p>
                  <p className="text-sm text-emerald-700">24 transactions will be imported</p>
                </div>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden max-h-64 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-slate-500">Date</th>
                    <th className="px-3 py-2 text-left font-medium text-slate-500">Reference</th>
                    <th className="px-3 py-2 text-left font-medium text-slate-500">Description</th>
                    <th className="px-3 py-2 text-right font-medium text-slate-500">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td className="px-3 py-2 text-slate-600">2024-11-{25 - i}</td>
                      <td className="px-3 py-2 text-slate-500 font-mono">TXN-{1000 + i}</td>
                      <td className="px-3 py-2 text-slate-900">Sample Transaction {i + 1}</td>
                      <td className="px-3 py-2 text-right font-medium">${(Math.random() * 10000).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center p-4 bg-slate-50 rounded-lg">
              <div><p className="text-2xl font-bold text-slate-900">24</p><p className="text-xs text-slate-500">Total Transactions</p></div>
              <div><p className="text-2xl font-bold text-emerald-600">+$125,400</p><p className="text-xs text-slate-500">Total Deposits</p></div>
              <div><p className="text-2xl font-bold text-slate-900">-$89,200</p><p className="text-xs text-slate-500">Total Withdrawals</p></div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between pt-4 border-t border-slate-200">
          <button onClick={() => step > 1 ? setStep(step - 1) : onClose()} className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          <button onClick={() => step < 3 ? setStep(step + 1) : onClose()} disabled={step === 1 && !fileUploaded}
            className={`px-4 py-2 text-sm rounded-lg ${step === 1 && !fileUploaded ? 'bg-slate-100 text-slate-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
            {step === 3 ? 'Import Transactions' : 'Next'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// ============================================================
// CASH POSITION DASHBOARD
// ============================================================
const CashPositionDashboard = () => {
  const accounts = [
    { name: 'Main Operating', balance: 485000, change: 12500, trend: 'up' },
    { name: 'Payroll Account', balance: 125000, change: -45000, trend: 'down' },
    { name: 'Project Escrow', balance: 890000, change: 0, trend: 'neutral' },
    { name: 'Petty Cash', balance: 2450, change: -550, trend: 'down' },
    { name: 'EUR Account', balance: 45000, change: 5000, trend: 'up' },
  ];

  const recentMovements = [
    { date: '2024-11-25', desc: 'Customer Payment - XYZ Corp', type: 'inflow', amount: 45000 },
    { date: '2024-11-25', desc: 'Payroll Processing', type: 'outflow', amount: -125000 },
    { date: '2024-11-24', desc: 'Vendor Payment - ABC Ltd', type: 'outflow', amount: -28500 },
    { date: '2024-11-24', desc: 'Project Milestone Payment', type: 'inflow', amount: 85000 },
    { date: '2024-11-23', desc: 'Office Rent', type: 'outflow', amount: -15000 },
  ];

  const totalCash = accounts.reduce((s, a) => s + a.balance, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Cash Position</h2>
          <p className="text-sm text-slate-500">Real-time cash overview across all accounts</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white">
            <option>All Currencies</option>
            <option>USD Only</option>
            <option>EUR Only</option>
          </select>
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
            <RefreshCw size={16} /> Refresh
          </button>
        </div>
      </div>

      {/* Total Cash Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100">Total Cash Position</p>
            <p className="text-4xl font-bold mt-2">${totalCash.toLocaleString()}</p>
            <p className="text-blue-200 text-sm mt-2 flex items-center gap-1">
              <TrendingUp size={14} /> +$32,450 from yesterday
            </p>
          </div>
          <div className="text-right">
            <p className="text-blue-100">As of</p>
            <p className="text-lg font-medium">Nov 25, 2024</p>
            <p className="text-blue-200">10:45 AM</p>
          </div>
        </div>
      </div>

      {/* Account Breakdown */}
      <div className="grid grid-cols-5 gap-4">
        {accounts.map(acc => (
          <div key={acc.name} className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">{acc.name}</p>
            <p className="text-xl font-bold text-slate-900 mt-1">${acc.balance.toLocaleString()}</p>
            <p className={`text-xs mt-2 flex items-center gap-1 ${acc.trend === 'up' ? 'text-emerald-600' : acc.trend === 'down' ? 'text-red-500' : 'text-slate-400'}`}>
              {acc.trend === 'up' && <TrendingUp size={12} />}
              {acc.trend === 'down' && <TrendingDown size={12} />}
              {acc.change >= 0 ? '+' : ''}{acc.change.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Cash Flow Chart Placeholder */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-medium text-slate-900 mb-4">Cash Flow Trend (Last 30 Days)</h3>
          <div className="h-48 flex items-center justify-center bg-slate-50 rounded-lg">
            <div className="text-center text-slate-400">
              <BarChart3 size={40} className="mx-auto mb-2" />
              <p>Chart Visualization</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-medium text-slate-900 mb-4">Recent Movements</h3>
          <div className="space-y-3">
            {recentMovements.slice(0, 4).map((m, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div>
                  <p className="text-sm text-slate-900 truncate max-w-[150px]">{m.desc}</p>
                  <p className="text-xs text-slate-500">{m.date}</p>
                </div>
                <p className={`text-sm font-medium ${m.amount >= 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {m.amount >= 0 ? '+' : ''}{m.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// VALIDATION RULES PAGE
// ============================================================
const ValidationRulesPage = () => {
  const [showForm, setShowForm] = useState(false);
  
  const rules = [
    { id: 'VR-001', name: 'Period Open Check', description: 'Prevent posting to closed periods', type: 'Posting', status: 'active', scope: 'All Journals' },
    { id: 'VR-002', name: 'Balance Validation', description: 'Ensure debit equals credit', type: 'Posting', status: 'active', scope: 'All Journals' },
    { id: 'VR-003', name: 'Cost Center Required', description: 'Require cost center for expense accounts', type: 'Account', status: 'active', scope: '5xxx Accounts' },
    { id: 'VR-004', name: 'Project Required', description: 'Require project for project-related accounts', type: 'Account', status: 'active', scope: 'WIP Accounts' },
    { id: 'VR-005', name: 'Duplicate Reference Check', description: 'Warn on duplicate reference numbers', type: 'Warning', status: 'active', scope: 'All Journals' },
    { id: 'VR-006', name: 'Large Amount Alert', description: 'Alert for transactions over $100,000', type: 'Warning', status: 'active', scope: 'Manual Entries' },
    { id: 'VR-007', name: 'Future Date Block', description: 'Block posting to future dates', type: 'Posting', status: 'inactive', scope: 'All Journals' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Validation Rules</h2>
          <p className="text-sm text-slate-500">Configure posting validations and controls</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={16} /> Add Rule
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard title="Active Rules" value="6" icon={ShieldCheck} color="green" />
        <StatCard title="Blocked Today" value="3" subtitle="Validation failures" icon={Ban} color="red" />
        <StatCard title="Warnings Today" value="12" subtitle="Soft warnings" icon={AlertTriangle} color="amber" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Rule</th>
              <th className="px-4 py-3 text-left font-medium">Description</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-left font-medium">Scope</th>
              <th className="px-4 py-3 text-center font-medium">Status</th>
              <th className="px-4 py-3 text-center font-medium w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rules.map(rule => (
              <tr key={rule.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className={rule.status === 'active' ? 'text-emerald-500' : 'text-slate-300'} />
                    <span className="text-sm font-medium text-slate-900">{rule.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{rule.description}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded ${rule.type === 'Posting' ? 'bg-red-100 text-red-700' : rule.type === 'Warning' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                    {rule.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-500">{rule.scope}</td>
                <td className="px-4 py-3 text-center"><StatusBadge status={rule.status} /></td>
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
// AUDIT TRAIL PAGE
// ============================================================
const AuditTrailPage = () => {
  const auditLogs = [
    { id: 'AL-001', timestamp: '2024-11-25 10:45:22', user: 'John Smith', action: 'Post', entity: 'Journal Entry', entityId: 'JE-2024-0142', details: 'Posted journal entry for sales invoice' },
    { id: 'AL-002', timestamp: '2024-11-25 10:30:15', user: 'Sarah Johnson', action: 'Edit', entity: 'GL Account', entityId: '4100', details: 'Updated account description' },
    { id: 'AL-003', timestamp: '2024-11-25 09:15:00', user: 'Mike Brown', action: 'Create', entity: 'Journal Entry', entityId: 'JE-2024-0141', details: 'Created draft entry' },
    { id: 'AL-004', timestamp: '2024-11-25 08:45:33', user: 'System', action: 'Close', entity: 'Fiscal Period', entityId: 'FY2024-P10', details: 'Period closed automatically' },
    { id: 'AL-005', timestamp: '2024-11-24 17:30:00', user: 'John Smith', action: 'Reverse', entity: 'Journal Entry', entityId: 'JE-2024-0135', details: 'Reversed entry - incorrect amount' },
    { id: 'AL-006', timestamp: '2024-11-24 15:20:10', user: 'Admin', action: 'Reopen', entity: 'Fiscal Period', entityId: 'FY2024-P09', details: 'Reopened for adjustments' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Audit Trail</h2>
          <p className="text-sm text-slate-500">Track all changes and activities</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
          <Download size={16} /> Export Log
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg">
          <Search size={18} className="text-slate-400" />
          <input type="text" placeholder="Search audit logs..." className="flex-1 outline-none text-sm" />
        </div>
        <input type="date" className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white" />
        <select className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white">
          <option>All Actions</option>
          <option>Create</option>
          <option>Edit</option>
          <option>Delete</option>
          <option>Post</option>
          <option>Reverse</option>
        </select>
        <select className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white">
          <option>All Entities</option>
          <option>Journal Entry</option>
          <option>GL Account</option>
          <option>Fiscal Period</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Timestamp</th>
              <th className="px-4 py-3 text-left font-medium">User</th>
              <th className="px-4 py-3 text-left font-medium">Action</th>
              <th className="px-4 py-3 text-left font-medium">Entity</th>
              <th className="px-4 py-3 text-left font-medium">Reference</th>
              <th className="px-4 py-3 text-left font-medium">Details</th>
              <th className="px-4 py-3 text-center font-medium w-16">View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {auditLogs.map(log => (
              <tr key={log.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-600 font-mono">{log.timestamp}</td>
                <td className="px-4 py-3 text-sm text-slate-900">{log.user}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded ${
                    log.action === 'Create' ? 'bg-emerald-100 text-emerald-700' :
                    log.action === 'Edit' ? 'bg-blue-100 text-blue-700' :
                    log.action === 'Delete' ? 'bg-red-100 text-red-700' :
                    log.action === 'Post' ? 'bg-purple-100 text-purple-700' :
                    log.action === 'Reverse' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>{log.action}</span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{log.entity}</td>
                <td className="px-4 py-3 text-sm font-mono text-blue-600">{log.entityId}</td>
                <td className="px-4 py-3 text-sm text-slate-500 truncate max-w-xs">{log.details}</td>
                <td className="px-4 py-3 text-center">
                  <button className="p-1.5 hover:bg-slate-100 rounded"><ExternalLink size={16} className="text-slate-400" /></button>
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
export default function FinanceCoreModule() {
  const [activeTab, setActiveTab] = useState('reconciliation');

  const tabs = [
    { id: 'reconciliation', label: 'Reconciliation' },
    { id: 'cash-position', label: 'Cash Position' },
    { id: 'validation', label: 'Validation Rules' },
    { id: 'audit', label: 'Audit Trail' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100"><Wallet size={24} className="text-blue-600" /></div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Finance Core - Reconciliation & Audit</h1>
              <p className="text-sm text-slate-500">Reconciliation, Cash Position, Validation & Audit</p>
            </div>
          </div>
        </div>
        <div className="px-6"><Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} /></div>
      </div>

      <div className="p-6">
        {activeTab === 'reconciliation' && <BankReconciliationPage />}
        {activeTab === 'cash-position' && <CashPositionDashboard />}
        {activeTab === 'validation' && <ValidationRulesPage />}
        {activeTab === 'audit' && <AuditTrailPage />}
      </div>
    </div>
  );
}
