'use client';

import React, { useState } from 'react';
import {
  ChevronRight, ChevronDown, Plus, Search, Filter, Download, Upload, RefreshCw,
  MoreHorizontal, Edit, Trash2, Eye, Copy, Check, X, AlertCircle, CheckCircle,
  Wallet, Calendar, DollarSign, Settings, Layers, Target, Shield, Clock,
  ChevronLeft, Save, FileText, Link2, Database, ArrowRight, Percent, Building,
  Hash, Activity, Receipt, Scale, Globe, Flag, Building2, Banknote, Tag,
  CreditCard, BadgePercent, CircleDollarSign, FileCheck, AlertTriangle, Play,
  Zap, Send, Lock, Unlock, FileSpreadsheet, FileBadge, ExternalLink, History,
  CheckCircle2, XCircle, Loader2, Server, Key, Plug
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
    Open: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    UnderReview: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    Filed: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    Closed: { bg: 'bg-slate-100', text: 'text-slate-500', dot: 'bg-slate-400' },
    Pending: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    Submitted: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    Accepted: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    Rejected: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
    Cancelled: { bg: 'bg-slate-100', text: 'text-slate-500', dot: 'bg-slate-400' },
    Active: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    Inactive: { bg: 'bg-slate-100', text: 'text-slate-500', dot: 'bg-slate-400' },
    VAT: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    WHT: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
    Invoice: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    CreditNote: { bg: 'bg-pink-50', text: 'text-pink-700', dot: 'bg-pink-500' },
  };
  const c = config[status] || config.Open;
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

const Button = ({ children, variant = 'primary', size = 'md', icon: Icon = null, onClick = () => {}, disabled = false }) => {
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

const FormField = ({ label, required = false, children, hint = '' }) => (
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
// TAX PERIODS PAGE
// ============================================================
const TaxPeriodsPage = ({ onViewPeriod }) => {
  const [filterYear, setFilterYear] = useState('2025');
  const [filterType, setFilterType] = useState('VAT');

  const periods = [
    { id: '1', taxType: 'VAT', year: 2025, period: 7, startDate: '2025-07-01', endDate: '2025-07-31', status: 'Closed', outputBase: 2500000, outputTax: 350000, inputBase: 1200000, inputTax: 168000, netPayable: 182000 },
    { id: '2', taxType: 'VAT', year: 2025, period: 8, startDate: '2025-08-01', endDate: '2025-08-31', status: 'Filed', outputBase: 2800000, outputTax: 392000, inputBase: 1350000, inputTax: 189000, netPayable: 203000 },
    { id: '3', taxType: 'VAT', year: 2025, period: 9, startDate: '2025-09-01', endDate: '2025-09-30', status: 'UnderReview', outputBase: 2650000, outputTax: 371000, inputBase: 1280000, inputTax: 179200, netPayable: 191800 },
    { id: '4', taxType: 'VAT', year: 2025, period: 10, startDate: '2025-10-01', endDate: '2025-10-31', status: 'Open', outputBase: 1850000, outputTax: 259000, inputBase: 920000, inputTax: 128800, netPayable: 130200 },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Open': return <Unlock size={16} className="text-green-500" />;
      case 'UnderReview': return <Clock size={16} className="text-amber-500" />;
      case 'Filed': return <Send size={16} className="text-blue-500" />;
      case 'Closed': return <Lock size={16} className="text-slate-400" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Tax Periods & Returns</h2>
          <p className="text-sm text-slate-500">Manage tax reporting periods and file returns</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={RefreshCw}>Recalculate All</Button>
          <Button variant="secondary" icon={Download}>Export Returns</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">YTD Output Tax</p>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(1372000)}</p>
          <p className="text-xs text-green-600 mt-1">↑ 8% vs last year</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">YTD Input Tax</p>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(665000)}</p>
          <p className="text-xs text-amber-600 mt-1">↑ 12% vs last year</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">YTD Net Payable</p>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(707000)}</p>
          <p className="text-xs text-slate-500 mt-1">Due to authority</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Pending Returns</p>
          <p className="text-2xl font-bold text-amber-600">2</p>
          <p className="text-xs text-slate-500 mt-1">Requires action</p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <Select value={filterYear} onChange={(e) => setFilterYear(e.target.value)} className="w-32"
          options={[{ value: '2024', label: 'FY 2024' }, { value: '2025', label: 'FY 2025' }]} />
        <Select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="w-40"
          options={[{ value: 'VAT', label: 'VAT' }, { value: 'WHT', label: 'WHT' }]} />
      </div>

      {/* Periods Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Period</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date Range</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Output Tax</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Input Tax</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Net Payable</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {periods.map(period => (
                <tr key={period.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(period.status)}
                      <span className="font-semibold text-slate-900">P{period.period} / {period.year}</span>
                      <StatusBadge status={period.taxType} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {period.startDate} to {period.endDate}
                  </td>
                  <td className="px-4 py-3 text-center"><StatusBadge status={period.status} /></td>
                  <td className="px-4 py-3 text-right">
                    <p className="font-semibold text-slate-900">{formatCurrency(period.outputTax)}</p>
                    <p className="text-xs text-slate-500">Base: {formatCurrency(period.outputBase)}</p>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <p className="font-semibold text-slate-900">{formatCurrency(period.inputTax)}</p>
                    <p className="text-xs text-slate-500">Base: {formatCurrency(period.inputBase)}</p>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <p className={`font-bold ${period.netPayable >= 0 ? 'text-blue-600' : 'text-green-600'}`}>
                      {formatCurrency(period.netPayable)}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="sm" icon={Eye} onClick={() => onViewPeriod(period)}>View</Button>
                      {period.status === 'Open' && <Button variant="secondary" size="sm" icon={Send}>Submit</Button>}
                      {period.status === 'UnderReview' && <Button variant="success" size="sm" icon={FileCheck}>File</Button>}
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
// TAX PERIOD DETAIL
// ============================================================
const TaxPeriodDetail = ({ period, onClose }) => {
  const summaryByCode = [
    { taxCode: 'VAT14', outputBase: 2400000, outputTax: 336000, inputBase: 1100000, inputTax: 154000, netTax: 182000 },
    { taxCode: 'VAT0', outputBase: 400000, outputTax: 0, inputBase: 150000, inputTax: 0, netTax: 0 },
    { taxCode: 'EXEMPT', outputBase: 250000, outputTax: 0, inputBase: 0, inputTax: 0, netTax: 0 },
    { taxCode: 'VAT-RC', outputBase: 0, outputTax: 35000, inputBase: 0, inputTax: 35000, netTax: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Period Info */}
      <Card className="p-4">
        <div className="grid grid-cols-4 gap-4">
          <div><p className="text-xs text-slate-500">Period</p><p className="font-semibold">P{period?.period || 10} / {period?.year || 2025}</p></div>
          <div><p className="text-xs text-slate-500">Tax Type</p><p className="font-semibold">VAT</p></div>
          <div><p className="text-xs text-slate-500">Status</p><StatusBadge status={period?.status || 'Open'} /></div>
          <div><p className="text-xs text-slate-500">Date Range</p><p className="font-semibold">{period?.startDate || '2025-10-01'} to {period?.endDate || '2025-10-31'}</p></div>
        </div>
      </Card>

      {/* Summary by Tax Code */}
      <Card>
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900">Summary by Tax Code</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Tax Code</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Output Base</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Output Tax</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Input Base</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Input Tax</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Net Tax</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {summaryByCode.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono font-semibold text-slate-900">{row.taxCode}</td>
                  <td className="px-4 py-3 text-right text-sm">{formatCurrency(row.outputBase)}</td>
                  <td className="px-4 py-3 text-right font-medium text-pink-600">{formatCurrency(row.outputTax)}</td>
                  <td className="px-4 py-3 text-right text-sm">{formatCurrency(row.inputBase)}</td>
                  <td className="px-4 py-3 text-right font-medium text-cyan-600">{formatCurrency(row.inputTax)}</td>
                  <td className="px-4 py-3 text-right font-bold">{formatCurrency(row.netTax)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-100 font-semibold">
              <tr>
                <td className="px-4 py-3">Total</td>
                <td className="px-4 py-3 text-right">{formatCurrency(3050000)}</td>
                <td className="px-4 py-3 text-right text-pink-600">{formatCurrency(371000)}</td>
                <td className="px-4 py-3 text-right">{formatCurrency(1250000)}</td>
                <td className="px-4 py-3 text-right text-cyan-600">{formatCurrency(189000)}</td>
                <td className="px-4 py-3 text-right text-blue-600">{formatCurrency(182000)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={FileSpreadsheet}>Export to Excel</Button>
          <Button variant="secondary" icon={Download}>Download XML</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={onClose}>Close</Button>
          {(period?.status || 'Open') === 'Open' && <Button icon={Send}>Submit for Review</Button>}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// E-INVOICING PAGE
// ============================================================
const EInvoicingPage = () => {
  const [filterStatus, setFilterStatus] = useState('all');

  const integrations = [
    { id: '1', country: 'EG', provider: 'Egyptian Tax Authority (ETA)', apiUrl: 'https://api.invoicing.eta.gov.eg', isActive: true, lastSync: '2025-07-15 14:30' },
  ];

  const documents = [
    { id: '1', docType: 'Invoice', sourceModule: 'Sales', docNumber: 'INV-2025-1542', customer: 'Cairo Industries Ltd', amount: 125000, status: 'Accepted', externalId: 'ETA-8547215', submittedAt: '2025-07-15 10:23' },
    { id: '2', docType: 'Invoice', sourceModule: 'Sales', docNumber: 'INV-2025-1543', customer: 'Alexandria Trading Co', amount: 87500, status: 'Accepted', externalId: 'ETA-8547216', submittedAt: '2025-07-15 11:45' },
    { id: '3', docType: 'CreditNote', sourceModule: 'Sales', docNumber: 'CN-2025-0089', customer: 'Giza Supplies', amount: 15000, status: 'Pending', externalId: null, submittedAt: null },
    { id: '4', docType: 'Invoice', sourceModule: 'Sales', docNumber: 'INV-2025-1544', customer: 'Delta Electronics', amount: 245000, status: 'Rejected', externalId: null, submittedAt: '2025-07-15 14:10', error: 'Invalid tax registration number' },
    { id: '5', docType: 'Invoice', sourceModule: 'Sales', docNumber: 'INV-2025-1545', customer: 'Luxor Hotels', amount: 320000, status: 'Submitted', externalId: null, submittedAt: '2025-07-15 15:30' },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Accepted': return <CheckCircle2 size={16} className="text-green-500" />;
      case 'Rejected': return <XCircle size={16} className="text-red-500" />;
      case 'Pending': return <Clock size={16} className="text-amber-500" />;
      case 'Submitted': return <Loader2 size={16} className="text-blue-500 animate-spin" />;
      default: return null;
    }
  };

  const filteredDocs = filterStatus === 'all' ? documents : documents.filter(d => d.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">E-Invoicing Integration</h2>
          <p className="text-sm text-slate-500">Submit and track electronic invoices to tax authorities</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={RefreshCw}>Sync Status</Button>
          <Button icon={Send}>Submit Pending</Button>
        </div>
      </div>

      {/* Integration Status */}
      <Card>
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900">Integration Providers</h3>
        </div>
        <div className="p-4">
          {integrations.map(int => (
            <div key={int.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${int.isActive ? 'bg-green-100' : 'bg-slate-200'}`}>
                  <Plug size={24} className={int.isActive ? 'text-green-600' : 'text-slate-400'} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-slate-900">{int.provider}</h4>
                    <StatusBadge status={int.isActive ? 'Active' : 'Inactive'} />
                  </div>
                  <p className="text-sm text-slate-500">{int.country} • {int.apiUrl}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Last Sync</p>
                <p className="text-sm font-medium">{int.lastSync}</p>
              </div>
              <Button variant="ghost" size="sm" icon={Settings}>Configure</Button>
            </div>
          ))}
        </div>
      </Card>

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
            <div className="p-2 rounded-lg bg-green-50"><CheckCircle2 size={20} className="text-green-600" /></div>
            <div><p className="text-2xl font-bold text-slate-900">2</p><p className="text-xs text-slate-500">Accepted</p></div>
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
            <div className="p-2 rounded-lg bg-amber-50"><Clock size={20} className="text-amber-600" /></div>
            <div><p className="text-2xl font-bold text-slate-900">1</p><p className="text-xs text-slate-500">Pending</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-50"><XCircle size={20} className="text-red-600" /></div>
            <div><p className="text-2xl font-bold text-slate-900">1</p><p className="text-xs text-slate-500">Rejected</p></div>
          </div>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        {['all', 'Pending', 'Submitted', 'Accepted', 'Rejected'].map(status => (
          <button key={status} onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 text-sm rounded-lg ${filterStatus === status ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            {status === 'all' ? 'All' : status}
          </button>
        ))}
      </div>

      {/* Documents Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Document</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Customer</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Amount</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">External ID</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.map(doc => (
                <tr key={doc.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-900">{doc.docNumber}</p>
                    <p className="text-xs text-slate-500">{doc.sourceModule}</p>
                  </td>
                  <td className="px-4 py-3 text-center"><StatusBadge status={doc.docType} /></td>
                  <td className="px-4 py-3 text-sm text-slate-700">{doc.customer}</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">{formatCurrency(doc.amount)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      {getStatusIcon(doc.status)}
                      <StatusBadge status={doc.status} />
                    </div>
                    {doc.error && <p className="text-xs text-red-500 mt-1 text-center">{doc.error}</p>}
                  </td>
                  <td className="px-4 py-3">
                    {doc.externalId ? (
                      <span className="flex items-center gap-1 text-sm text-blue-600">
                        {doc.externalId}
                        <ExternalLink size={12} />
                      </span>
                    ) : <span className="text-slate-400">-</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      {doc.status === 'Pending' && <Button variant="secondary" size="sm" icon={Send}>Submit</Button>}
                      {doc.status === 'Rejected' && <Button variant="warning" size="sm" icon={RefreshCw}>Retry</Button>}
                      <button className="p-1.5 hover:bg-slate-100 rounded"><Eye size={14} className="text-slate-400" /></button>
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
// TAX AUDIT LOG
// ============================================================
const TaxAuditLogPage = () => {
  const logs = [
    { id: '1', timestamp: '2025-07-15 15:45:23', sourceModule: 'Sales', docType: 'Invoice', docNumber: 'INV-2025-1545', taxCode: 'VAT14', baseAmount: 320000, taxAmount: 44800, ruleMatched: 'Standard Sales VAT', userId: 'Ahmed Hassan' },
    { id: '2', timestamp: '2025-07-15 14:30:12', sourceModule: 'Purchasing', docType: 'AP Invoice', docNumber: 'AP-2025-0892', taxCode: 'VAT14', baseAmount: 85000, taxAmount: 11900, ruleMatched: 'Standard Purchase VAT', userId: 'Sara Mohamed' },
    { id: '3', timestamp: '2025-07-15 14:10:45', sourceModule: 'Sales', docType: 'Invoice', docNumber: 'INV-2025-1544', taxCode: 'VAT14', baseAmount: 245000, taxAmount: 34300, ruleMatched: 'Standard Sales VAT', userId: 'Ahmed Hassan' },
    { id: '4', timestamp: '2025-07-15 13:22:08', sourceModule: 'Purchasing', docType: 'AP Invoice', docNumber: 'AP-2025-0891', taxCode: 'WHT5', baseAmount: 50000, taxAmount: 2500, ruleMatched: 'WHT - Contractors', userId: 'Sara Mohamed' },
    { id: '5', timestamp: '2025-07-15 11:45:33', sourceModule: 'Sales', docType: 'Invoice', docNumber: 'INV-2025-1543', taxCode: 'VAT0', baseAmount: 87500, taxAmount: 0, ruleMatched: 'Zero-Rated Exports', userId: 'Omar Ali' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Tax Determination Audit Log</h2>
          <p className="text-sm text-slate-500">Track all tax calculations for compliance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={Download}>Export Log</Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-5 gap-4">
          <FormField label="Date From">
            <Input type="date" defaultValue="2025-07-01" />
          </FormField>
          <FormField label="Date To">
            <Input type="date" defaultValue="2025-07-15" />
          </FormField>
          <FormField label="Source Module">
            <Select options={[
              { value: '', label: 'All Modules' },
              { value: 'Sales', label: 'Sales' },
              { value: 'Purchasing', label: 'Purchasing' },
              { value: 'ICP', label: 'ICP' },
            ]} />
          </FormField>
          <FormField label="Tax Code">
            <Select options={[
              { value: '', label: 'All Codes' },
              { value: 'VAT14', label: 'VAT14' },
              { value: 'VAT0', label: 'VAT0' },
              { value: 'WHT5', label: 'WHT5' },
            ]} />
          </FormField>
          <div className="flex items-end">
            <Button icon={Search}>Search</Button>
          </div>
        </div>
      </Card>

      {/* Audit Log Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Timestamp</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Source</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Document</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Tax Code</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Base</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Tax</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Rule Matched</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">User</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-600 font-mono">{log.timestamp}</td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium">{log.sourceModule}</p>
                    <p className="text-xs text-slate-500">{log.docType}</p>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-900">{log.docNumber}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 font-mono text-xs rounded">{log.taxCode}</span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm">{formatCurrency(log.baseAmount)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">{formatCurrency(log.taxAmount)}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{log.ruleMatched}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{log.userId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-500">Showing 5 of 1,247 entries</p>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm">Previous</Button>
            <Button variant="secondary" size="sm">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function TaxCompliancePart3() {
  const [activeTab, setActiveTab] = useState('periods');
  const [showPeriodDetail, setShowPeriodDetail] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  const tabs = [
    { id: 'periods', label: 'Tax Periods', badge: '4' },
    { id: 'einvoicing', label: 'E-Invoicing', badge: '5' },
    { id: 'audit', label: 'Audit Log' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-100">
              <FileCheck size={24} className="text-emerald-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Tax & Compliance</h1>
              <p className="text-sm text-slate-500">Part 3: Tax Periods, E-Invoicing & Audit</p>
            </div>
          </div>
        </div>
        <div className="px-6">
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'periods' && (
          <TaxPeriodsPage onViewPeriod={(period) => { setSelectedPeriod(period); setShowPeriodDetail(true); }} />
        )}
        {activeTab === 'einvoicing' && <EInvoicingPage />}
        {activeTab === 'audit' && <TaxAuditLogPage />}
      </div>

      {/* Modals */}
      <Modal isOpen={showPeriodDetail} onClose={() => setShowPeriodDetail(false)} title="Tax Period Details" size="lg">
        <TaxPeriodDetail period={selectedPeriod} onClose={() => setShowPeriodDetail(false)} />
      </Modal>
    </div>
  );
}
