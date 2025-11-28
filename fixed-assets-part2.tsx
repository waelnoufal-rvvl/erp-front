import React, { useState } from 'react';
import {
  ChevronRight, ChevronDown, Plus, Search, Filter, Download, Upload, RefreshCw,
  MoreHorizontal, Edit, Trash2, Eye, Copy, Check, X, AlertCircle, CheckCircle,
  Wallet, Calendar, DollarSign, Settings, Layers, Target, Shield, Clock,
  ChevronLeft, Save, FileText, Link2, Database, ArrowRight, Percent, Building,
  Hash, Activity, Box, MapPin, Truck, Factory, Monitor, HardDrive, Cpu,
  Package, Wrench, Car, Building2, Warehouse, Tag, Grid3X3, BarChart3,
  TrendingDown, CircleDollarSign, FileSpreadsheet, QrCode, ArrowUpDown,
  ArrowRightLeft, BookOpen, History, ClipboardCheck, Send, XCircle, FileCheck
} from 'lucide-react';

// ============================================================
// SHARED COMPONENTS
// ============================================================

const Tabs = ({ tabs, active, onChange }) => (
  <div className="flex border-b border-slate-200">
    {tabs.map(tab => (
      <button key={tab.id} onClick={() => onChange(tab.id)}
        className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
          active === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
        }`}>
        <span className="flex items-center gap-2">{tab.label}
          {tab.badge && <span className={`px-2 py-0.5 text-xs rounded-full ${tab.badgeColor || 'bg-slate-100 text-slate-600'}`}>{tab.badge}</span>}
        </span>
      </button>
    ))}
  </div>
);

const StatusBadge = ({ status }) => {
  const config = {
    Active: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    Inactive: { bg: 'bg-slate-100', text: 'text-slate-500', dot: 'bg-slate-400' },
    Draft: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    Submitted: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    Approved: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    Rejected: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
    ConvertedToAsset: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
    Acquisition: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    Addition: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    Transfer: { bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-500' },
    Revaluation: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    Impairment: { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
    Depreciation: { bg: 'bg-cyan-50', text: 'text-cyan-700', dot: 'bg-cyan-500' },
    Disposal: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
    LOCAL: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    IFRS: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
    TAX: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  };
  const c = config[status] || config.Active;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`}></span>
      {status.replace(/([A-Z])/g, ' $1').trim()}
    </span>
  );
};

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl border border-slate-200 ${className}`}>{children}</div>
);

const Button = ({ children, variant = 'primary', size = 'md', icon: Icon, onClick, disabled }) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300',
    secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50',
    success: 'bg-green-600 text-white hover:bg-green-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    warning: 'bg-amber-500 text-white hover:bg-amber-600',
    ghost: 'text-slate-600 hover:bg-slate-100',
  };
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm', lg: 'px-5 py-2.5 text-base' };
  return (
    <button onClick={onClick} disabled={disabled}
      className={`inline-flex items-center gap-2 font-medium rounded-lg transition-colors ${variants[variant]} ${sizes[size]} disabled:cursor-not-allowed`}>
      {Icon && <Icon size={size === 'sm' ? 14 : 16} />}
      {children}
    </button>
  );
};

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;
  const sizes = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl', xl: 'max-w-6xl' };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className={`bg-white rounded-xl shadow-xl w-full ${sizes[size]} max-h-[90vh] overflow-hidden flex flex-col`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
};

const FormField = ({ label, required, children, hint }) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {hint && <p className="text-xs text-slate-500">{hint}</p>}
  </div>
);

const Input = ({ className = '', ...props }) => (
  <input {...props} className={`w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`} />
);

const Select = ({ options, className = '', ...props }) => (
  <select {...props} className={`w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}>
    {options.map(opt => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
  </select>
);

const formatCurrency = (amount, currency = 'EGP') => new Intl.NumberFormat('en-EG', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);

// ============================================================
// ASSET BOOKS PAGE
// ============================================================
const AssetBooksPage = ({ onViewAsset }) => {
  const [selectedAsset, setSelectedAsset] = useState('FA-2023-000050');

  const assetBooks = [
    { assetNumber: 'FA-2023-000050', description: 'CNC Machine Model X500', books: [
      { bookCode: 'LOCAL', depreciableBasis: 456000, usefulLife: 60, startDate: '2023-04-01', method: 'StraightLine', accumulatedDepr: 182400, nbv: 273600, isPrimary: true },
      { bookCode: 'IFRS', depreciableBasis: 456000, usefulLife: 72, startDate: '2023-04-01', method: 'StraightLine', accumulatedDepr: 152000, nbv: 304000, isPrimary: false },
      { bookCode: 'TAX', depreciableBasis: 480000, usefulLife: 48, startDate: '2023-04-01', method: 'DecliningBalance', accumulatedDepr: 240000, nbv: 240000, isPrimary: false },
    ]},
    { assetNumber: 'FA-2023-000051', description: 'Forklift Toyota 8FGU25', books: [
      { bookCode: 'LOCAL', depreciableBasis: 315000, usefulLife: 48, startDate: '2023-06-01', method: 'StraightLine', accumulatedDepr: 118125, nbv: 196875, isPrimary: true },
      { bookCode: 'TAX', depreciableBasis: 350000, usefulLife: 36, startDate: '2023-06-01', method: 'StraightLine', accumulatedDepr: 175000, nbv: 175000, isPrimary: false },
    ]},
  ];

  const currentAsset = assetBooks.find(a => a.assetNumber === selectedAsset);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Asset Books (Depreciation Areas)</h2>
          <p className="text-sm text-slate-500">Multiple depreciation books per asset (Local GAAP, IFRS, Tax)</p>
        </div>
      </div>

      {/* Asset Selector */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <FormField label="Select Asset">
            <Select value={selectedAsset} onChange={(e) => setSelectedAsset(e.target.value)} className="w-80"
              options={assetBooks.map(a => ({ value: a.assetNumber, label: `${a.assetNumber} - ${a.description}` }))} />
          </FormField>
          <Button variant="secondary" icon={Search}>Search</Button>
        </div>
      </Card>

      {/* Asset Info */}
      {currentAsset && (
        <>
          <Card className="p-4 bg-slate-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">{currentAsset.assetNumber}</h3>
                <p className="text-sm text-slate-500">{currentAsset.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-lg">{currentAsset.books.length} Books</span>
                <Button variant="ghost" size="sm" icon={Plus}>Add Book</Button>
              </div>
            </div>
          </Card>

          {/* Books Grid */}
          <div className="grid grid-cols-3 gap-4">
            {currentAsset.books.map(book => (
              <Card key={book.bookCode} className={`${book.isPrimary ? 'ring-2 ring-blue-500' : ''}`}>
                <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={book.bookCode} />
                    {book.isPrimary && <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded">Primary</span>}
                  </div>
                  <button className="p-1.5 hover:bg-slate-100 rounded"><Edit size={14} className="text-slate-400" /></button>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Depreciable Basis</span>
                    <span className="font-medium">{formatCurrency(book.depreciableBasis)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Useful Life</span>
                    <span className="font-medium">{book.usefulLife} months</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Method</span>
                    <span className="font-medium text-xs">{book.method === 'StraightLine' ? 'Straight Line' : 'Declining Balance'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Start Date</span>
                    <span className="font-medium">{book.startDate}</span>
                  </div>
                  <div className="pt-3 border-t border-slate-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Accumulated Depr</span>
                      <span className="font-medium text-amber-600">{formatCurrency(book.accumulatedDepr)}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="font-medium text-slate-700">Net Book Value</span>
                      <span className="font-bold text-blue-600">{formatCurrency(book.nbv)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ============================================================
// ASSET TRANSACTIONS PAGE
// ============================================================
const AssetTransactionsPage = () => {
  const [filterType, setFilterType] = useState('all');

  const transactions = [
    { id: '1', assetNumber: 'FA-2023-000050', description: 'CNC Machine Model X500', type: 'Acquisition', date: '2023-03-15', postingDate: '2023-03-15', amount: 480000, bookCode: 'LOCAL', sourceModule: 'Purchasing', sourceDoc: 'AP-2023-0542', postedToSap: true, sapRef: 'JE-2023-1542' },
    { id: '2', assetNumber: 'FA-2023-000050', description: 'CNC Machine Model X500', type: 'Addition', date: '2023-06-20', postingDate: '2023-06-20', amount: 25000, bookCode: 'LOCAL', sourceModule: 'Purchasing', sourceDoc: 'AP-2023-0845', postedToSap: true, sapRef: 'JE-2023-2145' },
    { id: '3', assetNumber: 'FA-2023-000050', description: 'CNC Machine Model X500', type: 'Depreciation', date: '2025-06-30', postingDate: '2025-06-30', amount: -7600, bookCode: 'LOCAL', sourceModule: 'FixedAssets', sourceDoc: 'DEP-2025-06', postedToSap: true, sapRef: 'JE-2025-5142' },
    { id: '4', assetNumber: 'FA-2023-000051', description: 'Forklift Toyota 8FGU25', type: 'Transfer', date: '2025-01-15', postingDate: '2025-01-15', amount: null, bookCode: null, sourceModule: 'FixedAssets', sourceDoc: 'TRF-2025-008', postedToSap: true, sapRef: 'JE-2025-0542', remarks: 'FACTORY-1 → FACTORY-2' },
    { id: '5', assetNumber: 'FA-2022-000080', description: 'Company Car - Toyota Camry', type: 'Disposal', date: '2025-06-30', postingDate: '2025-06-30', amount: -150000, bookCode: 'LOCAL', sourceModule: 'FixedAssets', sourceDoc: 'DSP-2025-012', postedToSap: true, sapRef: 'JE-2025-5890' },
    { id: '6', assetNumber: 'FA-2024-000112', description: 'Dell PowerEdge R750 Server', type: 'Revaluation', date: '2025-03-31', postingDate: '2025-03-31', amount: 15000, bookCode: 'IFRS', sourceModule: 'FixedAssets', sourceDoc: 'REV-2025-003', postedToSap: true, sapRef: 'JE-2025-2145' },
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Acquisition': return <Plus size={16} className="text-green-500" />;
      case 'Addition': return <Plus size={16} className="text-blue-500" />;
      case 'Transfer': return <ArrowRightLeft size={16} className="text-indigo-500" />;
      case 'Revaluation': return <ArrowUpDown size={16} className="text-amber-500" />;
      case 'Impairment': return <TrendingDown size={16} className="text-orange-500" />;
      case 'Depreciation': return <TrendingDown size={16} className="text-cyan-500" />;
      case 'Disposal': return <Trash2 size={16} className="text-red-500" />;
      default: return <Activity size={16} className="text-slate-500" />;
    }
  };

  const filteredTransactions = filterType === 'all' ? transactions : transactions.filter(t => t.type === filterType);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Asset Transactions</h2>
          <p className="text-sm text-slate-500">Complete history of asset movements and changes</p>
        </div>
        <Button variant="secondary" icon={Download}>Export History</Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {['all', 'Acquisition', 'Addition', 'Transfer', 'Depreciation', 'Revaluation', 'Disposal'].map(type => (
          <button key={type} onClick={() => setFilterType(type)}
            className={`px-3 py-1.5 text-sm rounded-lg ${filterType === type ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            {type === 'all' ? 'All Types' : type}
          </button>
        ))}
      </div>

      {/* Transactions Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Asset</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Type</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Amount</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Book</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Source</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">SAP Ref</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Posted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map(txn => (
                <tr key={txn.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-600">{txn.date}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-900">{txn.assetNumber}</p>
                    <p className="text-xs text-slate-500">{txn.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      {getTypeIcon(txn.type)}
                      <StatusBadge status={txn.type} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {txn.amount !== null ? (
                      <span className={`font-semibold ${txn.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {txn.amount >= 0 ? '+' : ''}{formatCurrency(txn.amount)}
                      </span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {txn.bookCode ? <StatusBadge status={txn.bookCode} /> : <span className="text-slate-400">-</span>}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-slate-900">{txn.sourceDoc}</p>
                    <p className="text-xs text-slate-500">{txn.sourceModule}</p>
                    {txn.remarks && <p className="text-xs text-indigo-600 mt-1">{txn.remarks}</p>}
                  </td>
                  <td className="px-4 py-3">
                    {txn.sapRef ? (
                      <span className="text-sm text-blue-600">{txn.sapRef}</span>
                    ) : <span className="text-slate-400">-</span>}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {txn.postedToSap ? (
                      <CheckCircle size={18} className="mx-auto text-green-500" />
                    ) : (
                      <Clock size={18} className="mx-auto text-amber-500" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// ============================================================
// ACQUISITION REQUESTS PAGE
// ============================================================
const AcquisitionRequestsPage = ({ onCreateRequest }) => {
  const [filterStatus, setFilterStatus] = useState('all');

  const requests = [
    { id: '1', requestNumber: 'AR-2025-00045', description: 'New CNC Machine for Production Line B', assetClass: 'Machinery', estimatedCost: 650000, currency: 'EGP', requestedBy: 'Ahmed Hassan', department: 'Production', status: 'Approved', createdAt: '2025-06-15', justification: 'Increase production capacity by 30%' },
    { id: '2', requestNumber: 'AR-2025-00046', description: 'IT Server Upgrade - Data Center', assetClass: 'IT Equipment', estimatedCost: 280000, currency: 'EGP', requestedBy: 'Sara Mohamed', department: 'IT', status: 'Submitted', createdAt: '2025-06-20', justification: 'Replace aging infrastructure' },
    { id: '3', requestNumber: 'AR-2025-00047', description: 'Delivery Truck - Fleet Expansion', assetClass: 'Vehicles', estimatedCost: 850000, currency: 'EGP', requestedBy: 'Omar Ali', department: 'Logistics', status: 'Draft', createdAt: '2025-06-25', justification: 'Support increased delivery demand' },
    { id: '4', requestNumber: 'AR-2025-00044', description: 'Office Furniture - New Floor', assetClass: 'Furniture', estimatedCost: 120000, currency: 'EGP', requestedBy: 'Fatma Ibrahim', department: 'Admin', status: 'ConvertedToAsset', createdAt: '2025-06-01', justification: 'Furnish new office floor', convertedAsset: 'FA-2025-000542' },
    { id: '5', requestNumber: 'AR-2025-00043', description: 'Forklift - Warehouse 2', assetClass: 'Vehicles', estimatedCost: 420000, currency: 'EGP', requestedBy: 'Khaled Nasser', department: 'Warehouse', status: 'Rejected', createdAt: '2025-05-28', justification: 'Additional material handling capacity', rejectReason: 'Budget constraints - defer to next FY' },
  ];

  const filteredRequests = filterStatus === 'all' ? requests : requests.filter(r => r.status === filterStatus);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Draft': return <FileText size={16} className="text-amber-500" />;
      case 'Submitted': return <Send size={16} className="text-blue-500" />;
      case 'Approved': return <CheckCircle size={16} className="text-green-500" />;
      case 'Rejected': return <XCircle size={16} className="text-red-500" />;
      case 'ConvertedToAsset': return <Box size={16} className="text-purple-500" />;
      default: return <Clock size={16} className="text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Asset Acquisition Requests</h2>
          <p className="text-sm text-slate-500">CapEx requests pending approval or conversion</p>
        </div>
        <Button icon={Plus} onClick={onCreateRequest}>New Request</Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-100"><FileText size={20} className="text-slate-600" /></div>
            <div><p className="text-2xl font-bold text-slate-900">5</p><p className="text-xs text-slate-500">Total</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-50"><Clock size={20} className="text-amber-600" /></div>
            <div><p className="text-2xl font-bold text-slate-900">1</p><p className="text-xs text-slate-500">Draft</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50"><Send size={20} className="text-blue-600" /></div>
            <div><p className="text-2xl font-bold text-slate-900">1</p><p className="text-xs text-slate-500">Submitted</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-50"><CheckCircle size={20} className="text-green-600" /></div>
            <div><p className="text-2xl font-bold text-slate-900">1</p><p className="text-xs text-slate-500">Approved</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-50"><Box size={20} className="text-purple-600" /></div>
            <div><p className="text-2xl font-bold text-slate-900">1</p><p className="text-xs text-slate-500">Converted</p></div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        {['all', 'Draft', 'Submitted', 'Approved', 'Rejected', 'ConvertedToAsset'].map(status => (
          <button key={status} onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 text-sm rounded-lg ${filterStatus === status ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            {status === 'all' ? 'All' : status === 'ConvertedToAsset' ? 'Converted' : status}
          </button>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-3">
        {filteredRequests.map(req => (
          <Card key={req.id} className="hover:shadow-md transition-shadow">
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    req.status === 'Draft' ? 'bg-amber-50' :
                    req.status === 'Submitted' ? 'bg-blue-50' :
                    req.status === 'Approved' ? 'bg-green-50' :
                    req.status === 'Rejected' ? 'bg-red-50' : 'bg-purple-50'
                  }`}>
                    {getStatusIcon(req.status)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">{req.requestNumber}</h3>
                      <StatusBadge status={req.status} />
                    </div>
                    <p className="text-sm text-slate-700 mb-2">{req.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Tag size={12} />{req.assetClass}</span>
                      <span className="flex items-center gap-1"><Building2 size={12} />{req.department}</span>
                      <span className="flex items-center gap-1"><Calendar size={12} />{req.createdAt}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 italic">"{req.justification}"</p>
                    {req.rejectReason && (
                      <p className="text-xs text-red-600 mt-1">Rejected: {req.rejectReason}</p>
                    )}
                    {req.convertedAsset && (
                      <p className="text-xs text-purple-600 mt-1">Converted to: {req.convertedAsset}</p>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-slate-900">{formatCurrency(req.estimatedCost)}</p>
                  <p className="text-xs text-slate-500">Requested by {req.requestedBy}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                {req.status === 'Draft' && (
                  <>
                    <Button variant="ghost" size="sm" icon={Edit}>Edit</Button>
                    <Button variant="secondary" size="sm" icon={Send}>Submit</Button>
                  </>
                )}
                {req.status === 'Submitted' && (
                  <>
                    <Button variant="danger" size="sm" icon={XCircle}>Reject</Button>
                    <Button variant="success" size="sm" icon={CheckCircle}>Approve</Button>
                  </>
                )}
                {req.status === 'Approved' && (
                  <Button size="sm" icon={Box}>Convert to Asset</Button>
                )}
                <Button variant="ghost" size="sm" icon={Eye}>View</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// ACQUISITION REQUEST FORM
// ============================================================
const AcquisitionRequestForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    assetClassId: '', description: '', estimatedCost: 0, currency: 'EGP', justification: ''
  });

  return (
    <div className="space-y-6">
      <FormField label="Asset Class" required>
        <Select value={formData.assetClassId} onChange={(e) => setFormData({...formData, assetClassId: e.target.value})}
          options={[
            { value: '', label: 'Select Class...' },
            { value: 'MACH', label: 'Machinery & Equipment' },
            { value: 'VEH', label: 'Vehicles' },
            { value: 'FURN', label: 'Furniture & Fixtures' },
            { value: 'IT', label: 'IT Equipment' },
            { value: 'BLDG', label: 'Buildings' },
          ]} />
      </FormField>

      <FormField label="Description" required>
        <Input value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Brief description of the asset to be acquired" />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Estimated Cost" required>
          <Input type="number" value={formData.estimatedCost} onChange={(e) => setFormData({...formData, estimatedCost: parseFloat(e.target.value) || 0})} />
        </FormField>
        <FormField label="Currency">
          <Select value={formData.currency} onChange={(e) => setFormData({...formData, currency: e.target.value})}
            options={[{ value: 'EGP', label: 'EGP' }, { value: 'USD', label: 'USD' }, { value: 'EUR', label: 'EUR' }]} />
        </FormField>
      </div>

      <FormField label="Justification" required hint="Explain why this asset is needed">
        <textarea value={formData.justification} onChange={(e) => setFormData({...formData, justification: e.target.value})}
          rows={4} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="Business justification for this acquisition..." />
      </FormField>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button variant="secondary" icon={Save}>Save as Draft</Button>
        <Button icon={Send} onClick={() => onSave(formData)}>Submit for Approval</Button>
      </div>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function FixedAssetsPart2() {
  const [activeTab, setActiveTab] = useState('requests');
  const [showRequestForm, setShowRequestForm] = useState(false);

  const tabs = [
    { id: 'requests', label: 'Acquisition Requests', badge: '2', badgeColor: 'bg-amber-100 text-amber-700' },
    { id: 'books', label: 'Asset Books' },
    { id: 'transactions', label: 'Transactions' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-100">
              <BookOpen size={24} className="text-indigo-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Fixed Assets</h1>
              <p className="text-sm text-slate-500">Part 2: Acquisition Requests, Books & Transactions</p>
            </div>
          </div>
        </div>
        <div className="px-6">
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'requests' && <AcquisitionRequestsPage onCreateRequest={() => setShowRequestForm(true)} />}
        {activeTab === 'books' && <AssetBooksPage onViewAsset={() => {}} />}
        {activeTab === 'transactions' && <AssetTransactionsPage />}
      </div>

      {/* Modals */}
      <Modal isOpen={showRequestForm} onClose={() => setShowRequestForm(false)} title="New Acquisition Request" size="md">
        <AcquisitionRequestForm onSave={(data) => { console.log(data); setShowRequestForm(false); }} onCancel={() => setShowRequestForm(false)} />
      </Modal>
    </div>
  );
}
