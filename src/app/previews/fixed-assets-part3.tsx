import React, { useState } from 'react';
import {
  ChevronRight, ChevronDown, Plus, Search, Filter, Download, Upload, RefreshCw,
  MoreHorizontal, Edit, Trash2, Eye, Copy, Check, X, AlertCircle, CheckCircle,
  Wallet, Calendar, DollarSign, Settings, Layers, Target, Shield, Clock,
  ChevronLeft, Save, FileText, Link2, Database, ArrowRight, Percent, Building,
  Hash, Activity, Box, MapPin, Truck, Factory, Monitor, HardDrive, Cpu,
  Package, Wrench, Car, Building2, Warehouse, Tag, Grid3X3, BarChart3,
  TrendingDown, CircleDollarSign, FileSpreadsheet, Play, Pause, CheckCircle2,
  XCircle, Loader2, Calculator, Send, AlertTriangle, Banknote, ArrowUpDown
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
    Planned: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    Running: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    Completed: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    Failed: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
    PostedToSap: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
    LOCAL: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    IFRS: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
    TAX: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    Active: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    Disposed: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
    FullyDepreciated: { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
  };
  const c = config[status] || config.Planned;
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
// DEPRECIATION RUNS PAGE
// ============================================================
const DepreciationRunsPage = ({ onCreateRun, onViewRun }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterYear, setFilterYear] = useState('2025');

  const runs = [
    { id: '1', periodStart: '2025-07-01', periodEnd: '2025-07-31', bookCode: 'LOCAL', status: 'PostedToSap', assetCount: 485, totalDepr: 1250000, createdBy: 'Ahmed Hassan', createdAt: '2025-08-02', completedAt: '2025-08-02 14:30', sapRef: 'DepRun-2025-07' },
    { id: '2', periodStart: '2025-06-01', periodEnd: '2025-06-30', bookCode: 'LOCAL', status: 'PostedToSap', assetCount: 482, totalDepr: 1245000, createdBy: 'Ahmed Hassan', createdAt: '2025-07-02', completedAt: '2025-07-02 10:15', sapRef: 'DepRun-2025-06' },
    { id: '3', periodStart: '2025-08-01', periodEnd: '2025-08-31', bookCode: 'LOCAL', status: 'Completed', assetCount: 488, totalDepr: 1258000, createdBy: 'Sara Mohamed', createdAt: '2025-09-01', completedAt: '2025-09-01 16:45', sapRef: null },
    { id: '4', periodStart: '2025-07-01', periodEnd: '2025-07-31', bookCode: 'IFRS', status: 'PostedToSap', assetCount: 485, totalDepr: 1180000, createdBy: 'Ahmed Hassan', createdAt: '2025-08-02', completedAt: '2025-08-02 15:00', sapRef: 'DepRun-IFRS-2025-07' },
    { id: '5', periodStart: '2025-08-01', periodEnd: '2025-08-31', bookCode: 'IFRS', status: 'Planned', assetCount: 0, totalDepr: 0, createdBy: 'Sara Mohamed', createdAt: '2025-09-02', completedAt: null, sapRef: null },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Planned': return <Clock size={16} className="text-amber-500" />;
      case 'Running': return <Loader2 size={16} className="text-blue-500 animate-spin" />;
      case 'Completed': return <CheckCircle size={16} className="text-green-500" />;
      case 'PostedToSap': return <CheckCircle2 size={16} className="text-purple-500" />;
      case 'Failed': return <XCircle size={16} className="text-red-500" />;
      default: return <Clock size={16} className="text-slate-500" />;
    }
  };

  const filteredRuns = runs.filter(run => {
    if (filterStatus !== 'all' && run.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Depreciation Runs</h2>
          <p className="text-sm text-slate-500">Batch depreciation calculation and posting to SAP</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={Calculator}>Preview</Button>
          <Button icon={Play} onClick={onCreateRun}>New Depreciation Run</Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">YTD Depreciation</p>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(8750000)}</p>
          <p className="text-xs text-green-600 mt-1">7 months processed</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Monthly Average</p>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(1250000)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Posted Runs</p>
          <p className="text-2xl font-bold text-purple-600">12</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Pending</p>
          <p className="text-2xl font-bold text-amber-600">2</p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <Select value={filterYear} onChange={(e) => setFilterYear(e.target.value)} className="w-32"
          options={[{ value: '2024', label: 'FY 2024' }, { value: '2025', label: 'FY 2025' }]} />
        <div className="flex items-center gap-2">
          {['all', 'Planned', 'Completed', 'PostedToSap'].map(status => (
            <button key={status} onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 text-sm rounded-lg ${filterStatus === status ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {status === 'all' ? 'All' : status === 'PostedToSap' ? 'Posted' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Runs Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Period</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Book</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Assets</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Total Depr</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">SAP Ref</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Created</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRuns.map(run => (
                <tr key={run.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-900">{run.periodStart.substring(0, 7)}</p>
                    <p className="text-xs text-slate-500">{run.periodStart} to {run.periodEnd}</p>
                  </td>
                  <td className="px-4 py-3 text-center"><StatusBadge status={run.bookCode} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      {getStatusIcon(run.status)}
                      <StatusBadge status={run.status} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-slate-900">{run.assetCount || '-'}</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">
                    {run.totalDepr > 0 ? formatCurrency(run.totalDepr) : '-'}
                  </td>
                  <td className="px-4 py-3">
                    {run.sapRef ? (
                      <span className="text-sm text-blue-600">{run.sapRef}</span>
                    ) : <span className="text-slate-400">-</span>}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-slate-900">{run.createdAt}</p>
                    <p className="text-xs text-slate-500">{run.createdBy}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="sm" icon={Eye} onClick={() => onViewRun(run)}>View</Button>
                      {run.status === 'Planned' && <Button variant="secondary" size="sm" icon={Play}>Run</Button>}
                      {run.status === 'Completed' && <Button variant="success" size="sm" icon={Send}>Post</Button>}
                    </div>
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
// DEPRECIATION RUN DETAIL
// ============================================================
const DepreciationRunDetail = ({ run, onClose }) => {
  const details = [
    { assetNumber: 'FA-2023-000050', description: 'CNC Machine Model X500', priorAccum: 176800, deprAmount: 7600, newAccum: 184400, nbvAfter: 295600 },
    { assetNumber: 'FA-2023-000051', description: 'Forklift Toyota 8FGU25', priorAccum: 118125, deprAmount: 6563, newAccum: 124688, nbvAfter: 225312 },
    { assetNumber: 'FA-2024-000112', description: 'Dell PowerEdge R750 Server', priorAccum: 38194, deprAmount: 3472, newAccum: 41666, nbvAfter: 83334 },
    { assetNumber: 'FA-2020-000010', description: 'Factory Building - 10th Ramadan', priorAccum: 2395833, deprAmount: 52083, newAccum: 2447916, nbvAfter: 22552084 },
    { assetNumber: 'FA-2024-000156', description: 'Conference Room Furniture', priorAccum: 5714, deprAmount: 952, newAccum: 6666, nbvAfter: 63334 },
  ];

  return (
    <div className="space-y-6">
      {/* Run Info */}
      <Card className="p-4">
        <div className="grid grid-cols-4 gap-4">
          <div><p className="text-xs text-slate-500">Period</p><p className="font-semibold">{run?.periodStart || '2025-08-01'} to {run?.periodEnd || '2025-08-31'}</p></div>
          <div><p className="text-xs text-slate-500">Book</p><StatusBadge status={run?.bookCode || 'LOCAL'} /></div>
          <div><p className="text-xs text-slate-500">Status</p><StatusBadge status={run?.status || 'Completed'} /></div>
          <div><p className="text-xs text-slate-500">Total Depreciation</p><p className="font-bold text-lg text-blue-600">{formatCurrency(run?.totalDepr || 1258000)}</p></div>
        </div>
      </Card>

      {/* Details Table */}
      <Card>
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Asset Details</h3>
          <span className="text-sm text-slate-500">{run?.assetCount || 488} assets</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Asset</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Prior Accum</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Depr Amount</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">New Accum</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">NBV After</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {details.map(d => (
                <tr key={d.assetNumber} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-900">{d.assetNumber}</p>
                    <p className="text-xs text-slate-500">{d.description}</p>
                  </td>
                  <td className="px-4 py-3 text-right text-sm">{formatCurrency(d.priorAccum)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-amber-600">{formatCurrency(d.deprAmount)}</td>
                  <td className="px-4 py-3 text-right text-sm">{formatCurrency(d.newAccum)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-blue-600">{formatCurrency(d.nbvAfter)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 text-center text-sm text-slate-500">
          Showing 5 of {run?.assetCount || 488} assets
        </div>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button variant="secondary" icon={Download}>Export Details</Button>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={onClose}>Close</Button>
          {(run?.status || 'Completed') === 'Completed' && <Button variant="success" icon={Send}>Post to SAP</Button>}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// ASSET DISPOSAL PAGE
// ============================================================
const AssetDisposalPage = ({ onDisposeAsset }) => {
  const disposals = [
    { id: '1', assetNumber: 'FA-2022-000080', description: 'Company Car - Toyota Camry', classCode: 'VEH', disposalDate: '2025-06-30', acquisitionCost: 650000, accumulatedDepr: 650000, nbv: 0, proceeds: 150000, gainLoss: 150000, status: 'Disposed', sapRef: 'DSP-2025-012' },
    { id: '2', assetNumber: 'FA-2021-000045', description: 'Old Server Dell R640', classCode: 'IT', disposalDate: '2025-05-15', acquisitionCost: 95000, accumulatedDepr: 95000, nbv: 0, proceeds: 5000, gainLoss: 5000, status: 'Disposed', sapRef: 'DSP-2025-008' },
    { id: '3', assetNumber: 'FA-2020-000032', description: 'Reception Desk Set', classCode: 'FURN', disposalDate: '2025-04-20', acquisitionCost: 35000, accumulatedDepr: 25000, nbv: 10000, proceeds: 8000, gainLoss: -2000, status: 'Disposed', sapRef: 'DSP-2025-005' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Asset Disposals</h2>
          <p className="text-sm text-slate-500">Track retired and sold assets</p>
        </div>
        <Button icon={Trash2} onClick={onDisposeAsset}>Dispose Asset</Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">YTD Disposals</p>
          <p className="text-2xl font-bold text-slate-900">16</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Total Proceeds</p>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(425000)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Net Gain</p>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(165000)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Net Loss</p>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(12000)}</p>
        </Card>
      </div>

      {/* Disposals Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Asset</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Cost</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Accum Depr</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">NBV</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Proceeds</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Gain/Loss</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">SAP Ref</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {disposals.map(d => (
                <tr key={d.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-900">{d.assetNumber}</p>
                    <p className="text-xs text-slate-500">{d.description}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{d.disposalDate}</td>
                  <td className="px-4 py-3 text-right text-sm">{formatCurrency(d.acquisitionCost)}</td>
                  <td className="px-4 py-3 text-right text-sm">{formatCurrency(d.accumulatedDepr)}</td>
                  <td className="px-4 py-3 text-right text-sm">{formatCurrency(d.nbv)}</td>
                  <td className="px-4 py-3 text-right font-medium text-green-600">{formatCurrency(d.proceeds)}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-semibold ${d.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {d.gainLoss >= 0 ? '+' : ''}{formatCurrency(d.gainLoss)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-blue-600">{d.sapRef}</td>
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
// DISPOSAL FORM
// ============================================================
const DisposalForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    assetId: '', disposalDate: '', proceedsAmount: 0, reason: '', postToSap: true
  });
  const [selectedAsset, setSelectedAsset] = useState(null);

  const handleAssetSelect = (assetId) => {
    setFormData({...formData, assetId});
    setSelectedAsset({
      assetNumber: 'FA-2021-000089',
      description: 'Office Printer HP LaserJet',
      acquisitionCost: 45000,
      accumulatedDepr: 45000,
      nbv: 0
    });
  };

  return (
    <div className="space-y-6">
      <FormField label="Select Asset" required>
        <Select value={formData.assetId} onChange={(e) => handleAssetSelect(e.target.value)}
          options={[
            { value: '', label: 'Search or select asset...' },
            { value: 'a1', label: 'FA-2021-000089 - Office Printer HP LaserJet' },
            { value: 'a2', label: 'FA-2022-000112 - Dell Laptop XPS 15' },
            { value: 'a3', label: 'FA-2021-000055 - Meeting Room Table' },
          ]} />
      </FormField>

      {selectedAsset && (
        <Card className="p-4 bg-slate-50">
          <h4 className="font-medium text-slate-900 mb-3">Asset Summary</h4>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div><p className="text-slate-500">Asset</p><p className="font-semibold">{selectedAsset.assetNumber}</p></div>
            <div><p className="text-slate-500">Acquisition Cost</p><p className="font-semibold">{formatCurrency(selectedAsset.acquisitionCost)}</p></div>
            <div><p className="text-slate-500">Accumulated Depr</p><p className="font-semibold">{formatCurrency(selectedAsset.accumulatedDepr)}</p></div>
            <div><p className="text-slate-500">Net Book Value</p><p className="font-bold text-blue-600">{formatCurrency(selectedAsset.nbv)}</p></div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Disposal Date" required>
          <Input type="date" value={formData.disposalDate} onChange={(e) => setFormData({...formData, disposalDate: e.target.value})} />
        </FormField>
        <FormField label="Proceeds Amount" hint="Leave 0 if scrapped">
          <Input type="number" value={formData.proceedsAmount} onChange={(e) => setFormData({...formData, proceedsAmount: parseFloat(e.target.value) || 0})} />
        </FormField>
      </div>

      {selectedAsset && formData.proceedsAmount > 0 && (
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <span className="text-green-800">Calculated Gain on Disposal</span>
            <span className="text-xl font-bold text-green-700">+{formatCurrency(formData.proceedsAmount - selectedAsset.nbv)}</span>
          </div>
        </Card>
      )}

      <FormField label="Reason for Disposal" required>
        <textarea value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})}
          rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="e.g., Sold to third party, Scrapped due to damage, End of useful life..." />
      </FormField>

      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={formData.postToSap} onChange={(e) => setFormData({...formData, postToSap: e.target.checked})} className="w-4 h-4 rounded border-slate-300 text-blue-600" />
        <span className="text-sm text-slate-700">Post disposal to SAP B1 immediately</span>
      </label>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button variant="danger" icon={Trash2} onClick={() => onSave(formData)}>Dispose Asset</Button>
      </div>
    </div>
  );
};

// ============================================================
// ASSET MOVEMENT REPORT
// ============================================================
const AssetMovementReport = () => {
  const movements = [
    { category: 'Opening Balance', count: 520, cost: 118500000, accDepr: 28750000, nbv: 89750000 },
    { category: 'Additions', count: 42, cost: 8500000, accDepr: 0, nbv: 8500000 },
    { category: 'Disposals', count: -16, cost: -2100000, accDepr: -1850000, nbv: -250000 },
    { category: 'Depreciation', count: 0, cost: 0, accDepr: 8750000, nbv: -8750000 },
    { category: 'Revaluations', count: 0, cost: 350000, accDepr: 0, nbv: 350000 },
    { category: 'Closing Balance', count: 546, cost: 125250000, accDepr: 35650000, nbv: 89600000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Asset Movement Report</h2>
          <p className="text-sm text-slate-500">YTD asset changes and balances</p>
        </div>
        <div className="flex items-center gap-2">
          <Select className="w-32" options={[{ value: '2025', label: 'FY 2025' }, { value: '2024', label: 'FY 2024' }]} />
          <Button variant="secondary" icon={Download}>Export</Button>
        </div>
      </div>

      {/* Movement Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Category</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Count</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Acquisition Cost</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Accumulated Depr</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Net Book Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {movements.map((m, idx) => (
                <tr key={idx} className={`hover:bg-slate-50 ${m.category === 'Closing Balance' ? 'bg-blue-50 font-semibold' : ''}`}>
                  <td className="px-4 py-3">
                    <span className={m.category === 'Opening Balance' || m.category === 'Closing Balance' ? 'font-semibold' : ''}>{m.category}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {m.count !== 0 ? (
                      <span className={m.count > 0 ? 'text-green-600' : 'text-red-600'}>
                        {m.count > 0 && m.category !== 'Opening Balance' && m.category !== 'Closing Balance' ? '+' : ''}{m.count}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {m.cost !== 0 ? (
                      <span className={m.cost > 0 && m.category !== 'Opening Balance' && m.category !== 'Closing Balance' ? 'text-green-600' : m.cost < 0 ? 'text-red-600' : ''}>
                        {m.cost > 0 && m.category !== 'Opening Balance' && m.category !== 'Closing Balance' ? '+' : ''}{formatCurrency(m.cost)}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {m.accDepr !== 0 ? (
                      <span className={m.accDepr < 0 ? 'text-green-600' : 'text-amber-600'}>
                        {m.accDepr > 0 && m.category !== 'Opening Balance' && m.category !== 'Closing Balance' ? '+' : ''}{formatCurrency(m.accDepr)}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={m.category === 'Closing Balance' ? 'text-blue-600 text-lg' : m.nbv > 0 && m.category !== 'Opening Balance' ? 'text-green-600' : m.nbv < 0 ? 'text-red-600' : ''}>
                      {m.nbv > 0 && m.category !== 'Opening Balance' && m.category !== 'Closing Balance' ? '+' : ''}{formatCurrency(m.nbv)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Summary by Class */}
      <Card>
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900">Summary by Asset Class</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-6 gap-4">
            {[
              { name: 'Machinery', value: 12500000, percent: 14 },
              { name: 'Vehicles', value: 4200000, percent: 5 },
              { name: 'Furniture', value: 890000, percent: 1 },
              { name: 'IT Equipment', value: 2150000, percent: 2 },
              { name: 'Buildings', value: 45000000, percent: 50 },
              { name: 'Land', value: 25000000, percent: 28 },
            ].map(cls => (
              <div key={cls.name} className="text-center">
                <div className="h-24 bg-slate-100 rounded-lg mb-2 relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 bg-blue-500 transition-all" style={{ height: `${cls.percent}%` }}></div>
                </div>
                <p className="text-xs font-medium text-slate-900">{cls.name}</p>
                <p className="text-xs text-slate-500">{cls.percent}%</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function FixedAssetsPart3() {
  const [activeTab, setActiveTab] = useState('depreciation');
  const [showRunDetail, setShowRunDetail] = useState(false);
  const [showDisposalForm, setShowDisposalForm] = useState(false);
  const [selectedRun, setSelectedRun] = useState(null);

  const tabs = [
    { id: 'depreciation', label: 'Depreciation Runs', badge: '2', badgeColor: 'bg-amber-100 text-amber-700' },
    { id: 'disposal', label: 'Disposals' },
    { id: 'report', label: 'Movement Report' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-100">
              <TrendingDown size={24} className="text-indigo-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Fixed Assets</h1>
              <p className="text-sm text-slate-500">Part 3: Depreciation, Disposal & Reporting</p>
            </div>
          </div>
        </div>
        <div className="px-6">
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'depreciation' && (
          <DepreciationRunsPage
            onCreateRun={() => {}}
            onViewRun={(run) => { setSelectedRun(run); setShowRunDetail(true); }}
          />
        )}
        {activeTab === 'disposal' && <AssetDisposalPage onDisposeAsset={() => setShowDisposalForm(true)} />}
        {activeTab === 'report' && <AssetMovementReport />}
      </div>

      {/* Modals */}
      <Modal isOpen={showRunDetail} onClose={() => setShowRunDetail(false)} title="Depreciation Run Details" size="lg">
        <DepreciationRunDetail run={selectedRun} onClose={() => setShowRunDetail(false)} />
      </Modal>

      <Modal isOpen={showDisposalForm} onClose={() => setShowDisposalForm(false)} title="Dispose Asset" size="md">
        <DisposalForm onSave={(data) => { console.log(data); setShowDisposalForm(false); }} onCancel={() => setShowDisposalForm(false)} />
      </Modal>
    </div>
  );
}
