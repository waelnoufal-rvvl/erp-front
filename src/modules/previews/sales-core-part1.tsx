'use client';

import React, { useMemo, useState } from 'react';
import {
  ChevronRight, ChevronDown, Plus, Search, Filter, Download, Upload, RefreshCw,
  MoreHorizontal, Edit, Trash2, Eye, Copy, Check, X, AlertCircle, CheckCircle,
  Wallet, Calendar, DollarSign, Settings, Layers, Target, Shield, Clock,
  ChevronLeft, Save, FileText, Link2, Database, ArrowRight, Percent, Building,
  Hash, Activity, Box, MapPin, Truck, Factory, Users, ShoppingCart, Package,
  CreditCard, Receipt, FileCheck, Send, XCircle, AlertTriangle, ArrowUpDown,
  Store, Globe, Briefcase, Wrench, RotateCcw, ClipboardList, Ban, CheckCircle2
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
    Draft: { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
    UnderReview: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    Approved: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    Open: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    PartiallyDelivered: { bg: 'bg-cyan-50', text: 'text-cyan-700', dot: 'bg-cyan-500' },
    Delivered: { bg: 'bg-teal-50', text: 'text-teal-700', dot: 'bg-teal-500' },
    PartiallyInvoiced: { bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-500' },
    Invoiced: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
    Closed: { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
    Cancelled: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
    Quotation: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    Order: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    Delivery: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    Invoice: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
    CreditMemo: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
    Return: { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
    WithinLimit: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    OverLimitWarning: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    OverLimitBlocked: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
    Ok: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    LowMarginWarning: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  };
  const c = config[status] || config.Draft;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`}></span>
      {status.replace(/([A-Z])/g, ' $1').trim()}
    </span>
  );
};

const SourceChannelBadge = ({ channel }) => {
  const config = {
    CRM: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Users },
    POS: { bg: 'bg-green-100', text: 'text-green-700', icon: Store },
    Ecommerce: { bg: 'bg-purple-100', text: 'text-purple-700', icon: Globe },
    Service: { bg: 'bg-amber-100', text: 'text-amber-700', icon: Wrench },
    ICP: { bg: 'bg-indigo-100', text: 'text-indigo-700', icon: Briefcase },
    Manual: { bg: 'bg-slate-100', text: 'text-slate-700', icon: FileText },
  };
  const c = config[channel] || config.Manual;
  const Icon = c.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>
      <Icon size={12} />{channel}
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
// SALES DOCUMENTS LIST PAGE
// ============================================================
const SalesDocumentsPage = ({ docType, onCreateDocument, onViewDocument, documents: documentsData = [] }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [showLines, setShowLines] = useState({});

  const config = React.useMemo(() => {
    switch (docType) {
      case 'Quotation': return { title: 'Quotations', icon: FileText, color: 'blue' };
      case 'Order': return { title: 'Sales Orders', icon: ShoppingCart, color: 'green' };
      case 'Delivery': return { title: 'Deliveries', icon: Truck, color: 'amber' };
      case 'Invoice': return { title: 'Invoices', icon: Receipt, color: 'purple' };
      case 'Return': return { title: 'Returns', icon: RotateCcw, color: 'orange' };
      case 'CreditMemo': return { title: 'Credit Memos', icon: CreditCard, color: 'rose' };
      case 'DownPayment': return { title: 'Down Payments', icon: Percent, color: 'teal' };
      case 'BlanketAgreement': return { title: 'Blanket Agreements', icon: Layers, color: 'slate' };
      default: return { title: 'Documents', icon: FileText, color: 'slate' };
    }
  }, [docType]);

  const documents = React.useMemo(() => {
    const now = new Date();
    const sevenAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    return documentsData.filter((d) => {
      if (docType !== 'all' && d.docType !== docType) return false;
      const docDate = new Date(d.docDate);
      if (dateFilter === '7d' && docDate < sevenAgo) return false;
      if (dateFilter === '30d' && docDate < thirtyAgo) return false;
      return true;
    });
  }, [documentsData, docType, dateFilter]);

  const filteredDocs = React.useMemo(() => {
    return documents.filter(doc => {
      if (filterStatus !== 'all' && doc.status !== filterStatus) return false;
      if (searchTerm && !doc.docCode.toLowerCase().includes(searchTerm.toLowerCase()) && !doc.bpName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
  }, [documents, filterStatus, searchTerm]);

  const getStatusOptions = () => {
    if (docType === 'Quotation') return ['all', 'Draft', 'UnderReview', 'Approved', 'Closed', 'Cancelled'];
    if (docType === 'Order') return ['all', 'Draft', 'Open', 'PartiallyDelivered', 'Delivered', 'PartiallyInvoiced', 'Invoiced', 'Closed'];
    if (docType === 'Delivery') return ['all', 'Draft', 'Delivered', 'PartiallyInvoiced', 'Invoiced'];
    if (docType === 'Invoice') return ['all', 'Draft', 'Open', 'Closed'];
    if (docType === 'Return') return ['all', 'Draft', 'Approved', 'Closed'];
    if (docType === 'CreditMemo') return ['all', 'Draft', 'Approved', 'Closed'];
    if (docType === 'DownPayment') return ['all', 'Draft', 'UnderReview', 'Approved', 'Closed'];
    if (docType === 'BlanketAgreement') return ['all', 'Draft', 'Open', 'Closed', 'Cancelled'];
    return ['all'];
  };

  const handleConvert = (_doc?: any, _targetType?: string) => {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{config.title}</h2>
          <p className="text-sm text-slate-500">Manage {config.title.toLowerCase()} and track status</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={Download}>Export</Button>
          <Button icon={Plus} onClick={onCreateDocument}>New {config.title.slice(0, -1)}</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-5 gap-4">
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Total</p>
          <p className="text-2xl font-bold text-slate-900">{filteredDocs.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Draft</p>
          <p className="text-2xl font-bold text-slate-500">{filteredDocs.filter(d => d.status === 'Draft').length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">{docType === 'Quotation' ? 'Approved' : 'Open'}</p>
          <p className="text-2xl font-bold text-green-600">{filteredDocs.filter(d => d.status === 'Approved' || d.status === 'Open').length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">This Month</p>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(filteredDocs.reduce((sum, d) => sum + d.totalAfterTax, 0))}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Pending</p>
          <p className="text-2xl font-bold text-amber-600">{filteredDocs.filter(d => ['Draft', 'UnderReview', 'PartiallyDelivered'].includes(d.status)).length}</p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search by document number or customer..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm" />
        </div>
        <div className="flex items-center gap-2">
          {getStatusOptions().map(status => (
            <button key={status} onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 text-sm rounded-lg ${filterStatus === status ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {status === 'all' ? 'All' : status.replace(/([A-Z])/g, ' $1').trim()}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          {['all', '7d', '30d'].map(range => (
            <button key={range} onClick={() => setDateFilter(range)}
              className={`px-3 py-1.5 text-sm rounded-lg ${dateFilter === range ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {range === 'all' ? 'All' : range === '7d' ? 'Last 7d' : 'Last 30d'}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Document</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">SAP Doc</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Source</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Total</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Credit</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.map(doc => (
                <React.Fragment key={doc.id}>
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={doc.docType} />
                        <div>
                          <p className="font-semibold text-slate-900">{doc.docCode}</p>
                          {doc.sapDocEntry && <p className="text-xs text-slate-500">SAP Entry: {doc.sapDocEntry}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-800">
                      {doc.sapDocNum || doc.sapDocEntry ? <span className="font-mono">{doc.sapDocNum || doc.sapDocEntry}</span> : <span className="text-slate-400">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{doc.bpName}</p>
                      <p className="text-xs text-slate-500">{doc.bpCode}</p>
                      {doc.baseDocumentId && <p className="text-[11px] text-slate-500">Base: {doc.baseDocumentId}</p>}
                      {doc.lines && doc.lines.some(l => l.baseLineId) && (
                        <p className="text-[11px] text-slate-400">
                          Lines linked to base doc
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-slate-900">{doc.docDate}</p>
                      {doc.validUntil && <p className="text-xs text-slate-500">Valid: {doc.validUntil}</p>}
                      {doc.deliveryDate && <p className="text-xs text-slate-500">Delivery: {doc.deliveryDate}</p>}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <SourceChannelBadge channel={doc.sourceChannel} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <p className="font-semibold text-slate-900">{formatCurrency(doc.totalAfterTax)}</p>
                      <p className="text-xs text-slate-500">{doc.currency}</p>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <StatusBadge status={doc.status} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      {doc.creditCheck && <StatusBadge status={doc.creditCheck} />}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => onViewDocument(doc)} className="p-1.5 hover:bg-slate-100 rounded"><Eye size={14} className="text-slate-400" /></button>
                        <button className="p-1.5 hover:bg-slate-100 rounded"><Edit size={14} className="text-slate-400" /></button>
                        <button className="p-1.5 hover:bg-slate-100 rounded"><Copy size={14} className="text-slate-400" /></button>
                        {doc.docType === 'Quotation' && <button onClick={() => handleConvert(doc, 'Order')} className="p-1.5 hover:bg-slate-100 rounded" title="Convert to Order"><ArrowRight size={14} className="text-blue-500" /></button>}
                        {doc.docType === 'Order' && <button onClick={() => handleConvert(doc, 'Delivery')} className="p-1.5 hover:bg-slate-100 rounded" title="Create Delivery"><Truck size={14} className="text-amber-500" /></button>}
                        {doc.docType === 'Delivery' && <button onClick={() => handleConvert(doc, 'Invoice')} className="p-1.5 hover:bg-slate-100 rounded" title="Create Invoice"><Receipt size={14} className="text-purple-500" /></button>}
                        {doc.docType === 'Invoice' && <button onClick={() => handleConvert(doc, 'CreditMemo')} className="p-1.5 hover:bg-slate-100 rounded" title="Create Credit Memo"><RotateCcw size={14} className="text-rose-500" /></button>}
                        {doc.lines && doc.lines.length > 0 && (
                          <button
                            onClick={() => setShowLines(prev => ({ ...prev, [doc.id]: !prev[doc.id] }))}
                            className="p-1.5 hover:bg-slate-100 rounded"
                            title="Show lines"
                          >
                            <ChevronDown size={14} className={`text-slate-500 transition-transform ${showLines[doc.id] ? 'rotate-180' : ''}`} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                  {showLines[doc.id] && doc.lines && (
                    <tr className="bg-slate-50/60">
                      <td colSpan={9} className="px-4 py-2">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="text-xs text-slate-500 uppercase">
                                <th className="px-2 py-1 text-left">Line</th>
                                <th className="px-2 py-1 text-left">Item</th>
                                <th className="px-2 py-1 text-left">Desc</th>
                                <th className="px-2 py-1 text-center">Qty</th>
                                <th className="px-2 py-1 text-center">Base Line</th>
                                <th className="px-2 py-1 text-center">Price</th>
                                <th className="px-2 py-1 text-center">Disc%</th>
                                <th className="px-2 py-1 text-center">Tax</th>
                              </tr>
                            </thead>
                            <tbody>
                              {doc.lines.map((l, idx) => (
                                <tr key={idx} className="border-t border-slate-100">
                                  <td className="px-2 py-1 font-mono text-xs text-slate-500">{idx + 1}</td>
                                  <td className="px-2 py-1 font-mono">{l.itemCode}</td>
                                  <td className="px-2 py-1 text-slate-700">{l.description}</td>
                                  <td className="px-2 py-1 text-center">{l.quantity}</td>
                                  <td className="px-2 py-1 text-center text-slate-500">{l.baseLineId || '—'}</td>
                                  <td className="px-2 py-1 text-center">{formatCurrency(l.unitPrice || 0)}</td>
                                  <td className="px-2 py-1 text-center">{l.discountPercent || 0}%</td>
                                  <td className="px-2 py-1 text-center">{l.taxCode}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// ============================================================
// ALL DOCUMENTS DASHBOARD
// ============================================================
const AllDocumentsDashboard = ({ onViewDocument, documents }) => {
  const statusCounts = React.useMemo(() => {
    const counts = {};
    documents.forEach((d) => {
      counts[d.status] = (counts[d.status] || 0) + 1;
    });
    return counts;
  }, [documents]);

  const docTypeTotals = React.useMemo(() => {
    const totals: Record<string, { count: number; amount: number }> = {};
    documents.forEach((d) => {
      const curr = totals[d.docType] || { count: 0, amount: 0 };
      totals[d.docType] = { count: curr.count + 1, amount: curr.amount + (d.totalAfterTax || 0) };
    });
    return totals;
  }, [documents]);

  const mtdTotals = React.useMemo(() => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    return documents
      .filter((d) => new Date(d.docDate).getTime() >= monthStart.getTime())
      .reduce((sum, d) => sum + (d.totalAfterTax || 0), 0);
  }, [documents]);

  const summaryCards = [
    { label: 'Draft', value: statusCounts['Draft'] || 0, color: 'text-slate-500' },
    { label: 'Open', value: statusCounts['Open'] || 0, color: 'text-blue-600' },
    { label: 'Approved', value: statusCounts['Approved'] || 0, color: 'text-green-600' },
    { label: 'Invoiced', value: statusCounts['Invoiced'] || 0, color: 'text-purple-600' },
    { label: 'Credit Check Warnings', value: documents.filter(d => ['OverLimitWarning', 'OverLimitBlocked'].includes(d.creditCheck)).length, color: 'text-amber-600' },
  ];

  const maxCount = Math.max(
    docTypeTotals.Quotation?.count || 0,
    docTypeTotals.Order?.count || 0,
    docTypeTotals.Delivery?.count || 0,
    docTypeTotals.Invoice?.count || 0,
    1
  );

  const recentDocuments = React.useMemo(
    () => [...documents].sort((a, b) => new Date(b.docDate).getTime() - new Date(a.docDate).getTime()).slice(0, 5),
    [documents]
  );

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-blue-50"><FileText size={20} className="text-blue-600" /></div>
            <span className="text-xs text-green-600">Quotations</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{docTypeTotals.Quotation?.count || 0}</p>
          <p className="text-sm text-slate-500">Total {formatCurrency(docTypeTotals.Quotation?.amount || 0)}</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-green-50"><ShoppingCart size={20} className="text-green-600" /></div>
            <span className="text-xs text-green-600">Orders</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{docTypeTotals.Order?.count || 0}</p>
          <p className="text-sm text-slate-500">Total {formatCurrency(docTypeTotals.Order?.amount || 0)}</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-amber-50"><Truck size={20} className="text-amber-600" /></div>
            <span className="text-xs text-slate-500">Deliveries</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{docTypeTotals.Delivery?.count || 0}</p>
          <p className="text-sm text-slate-500">Total {formatCurrency(docTypeTotals.Delivery?.amount || 0)}</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-purple-50"><Receipt size={20} className="text-purple-600" /></div>
            <span className="text-xs text-green-600">Invoices</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{docTypeTotals.Invoice?.count || 0}</p>
          <p className="text-sm text-slate-500">Total {formatCurrency(docTypeTotals.Invoice?.amount || 0)}</p>
        </Card>
      </div>

      <Card className="p-4 bg-slate-50 border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-slate-500 font-semibold">MTD Total</p>
            <p className="text-xl font-bold text-slate-900">{formatCurrency(mtdTotals)}</p>
          </div>
          <div className="text-right text-xs text-slate-500">
            <p>Based on current month document dates</p>
          </div>
        </div>
      </Card>

      {/* Document Flow & Recent */}
      <div className="grid grid-cols-3 gap-6">
        {/* Document Flow */}
        <Card className="col-span-1 p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Document Flow</h3>
          <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <FileText size={18} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Quotations</span>
                <span className="text-sm text-slate-500">{docTypeTotals.Quotation?.count || 0}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full mt-1">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${((docTypeTotals.Quotation?.count || 0) / maxCount) * 100}%` }}></div>
              </div>
            </div>
          </div>

            <div className="flex items-center justify-center"><ArrowRight size={16} className="text-slate-300" /></div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <ShoppingCart size={18} className="text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Orders</span>
                <span className="text-sm text-slate-500">{docTypeTotals.Order?.count || 0}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full mt-1">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${((docTypeTotals.Order?.count || 0) / maxCount) * 100}%` }}></div>
              </div>
            </div>
          </div>

            <div className="flex items-center justify-center"><ArrowRight size={16} className="text-slate-300" /></div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Truck size={18} className="text-amber-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Deliveries</span>
                <span className="text-sm text-slate-500">{docTypeTotals.Delivery?.count || 0}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full mt-1">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${((docTypeTotals.Delivery?.count || 0) / maxCount) * 100}%` }}></div>
              </div>
            </div>
          </div>

            <div className="flex items-center justify-center"><ArrowRight size={16} className="text-slate-300" /></div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Receipt size={18} className="text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Invoices</span>
                <span className="text-sm text-slate-500">{docTypeTotals.Invoice?.count || 0}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full mt-1">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${((docTypeTotals.Invoice?.count || 0) / maxCount) * 100}%` }}></div>
              </div>
            </div>
          </div>
          </div>
        </Card>

        {/* Recent Documents */}
        <Card className="col-span-2">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-semibold text-slate-900">Recent Documents</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="divide-y divide-slate-100">
            {recentDocuments.map(doc => (
              <div key={doc.id} className="px-4 py-3 hover:bg-slate-50 flex items-center justify-between cursor-pointer" onClick={() => onViewDocument(doc)}>
                <div className="flex items-center gap-3">
                  <StatusBadge status={doc.docType} />
                  <div>
                    <p className="font-medium text-slate-900">{doc.docCode}</p>
                    <p className="text-xs text-slate-500">{doc.bpName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900">{formatCurrency(doc.totalAfterTax)}</p>
                  <StatusBadge status={doc.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Source Channel Distribution */}
      <Card className="p-5">
        <h3 className="font-semibold text-slate-900 mb-4">Orders by Source Channel</h3>
        <div className="grid grid-cols-6 gap-4">
          {[
            { channel: 'CRM', count: 45, amount: 1850000, color: 'bg-blue-500' },
            { channel: 'POS', count: 156, amount: 890000, color: 'bg-green-500' },
            { channel: 'Ecommerce', count: 89, amount: 1250000, color: 'bg-purple-500' },
            { channel: 'Service', count: 12, amount: 450000, color: 'bg-amber-500' },
            { channel: 'ICP', count: 8, amount: 2100000, color: 'bg-indigo-500' },
            { channel: 'Manual', count: 23, amount: 560000, color: 'bg-slate-500' },
          ].map(ch => (
            <div key={ch.channel} className="text-center">
              <SourceChannelBadge channel={ch.channel} />
              <p className="text-2xl font-bold text-slate-900 mt-2">{ch.count}</p>
              <p className="text-xs text-slate-500">{formatCurrency(ch.amount)}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// ============================================================
// CREATE DOCUMENT FORM
// ============================================================
const CreateDocumentForm = ({ docType, onSave, onCancel, defaultData = {} }) => {
  const [formData, setFormData] = useState({
    tenantId: 'TENANT-001',
    bpCode: '', docDate: new Date().toISOString().split('T')[0], validUntilDate: '', deliveryDate: '',
    currency: 'EGP', exchangeRate: 1, priceListId: '', paymentTermsCode: 'NET30', warehouseCode: 'WH-CAIRO',
    docSeries: 'SO-2025', docCode: '',
    contactPerson: '', billToAddressId: '', shipToAddressId: '',
    sourceChannel: 'CRM', salespersonUserId: 'AHASSAN',
    projectId: '', contractId: '', taxGroupCode: 'VAT15',
    baseDocumentId: '', downPaymentPercent: 30, headerDiscountPercent: 0,
    lines: [{
      itemCode: '', description: '', uom: 'PC', quantity: 1, unitPrice: 0, baseLineId: '',
      warehouseCode: 'WH-CAIRO', taxCode: 'VAT15', discountPercent: 0, priceSource: 'PriceList',
      marginPercent: 25, costAmountEstimated: 0, deliveredQty: 0, invoicedQty: 0, returnQty: 0, promotionCode: ''
    }]
  });
  const [documentStatus, setDocumentStatus] = useState('Draft');
  const [creditStatus, setCreditStatus] = useState('WithinLimit');
  const [marginStatus, setMarginStatus] = useState('Ok');
  const [errors, setErrors] = useState([]);
  const [sapDocEntry, setSapDocEntry] = useState(null);
  const [nextSeriesPreview, setNextSeriesPreview] = useState('SO-2025-000123');
  const [seriesCounters, setSeriesCounters] = useState({
    'TENANT-001': {
      Quotation: 1542,
      Order: 1234,
      Delivery: 892,
      Invoice: 1567,
      Return: 45,
      CreditMemo: 12,
      DownPayment: 7,
      BlanketAgreement: 3
    }
  });
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem('sales-series-counters');
      if (raw) {
        const parsed = JSON.parse(raw);
        setSeriesCounters(parsed);
      }
    } catch (err) {
      console.warn('Failed to load series counters', err);
    }
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('sales-series-counters', JSON.stringify(seriesCounters));
    } catch (err) {
      console.warn('Failed to persist series counters', err);
    }
  }, [seriesCounters]);
  const taxRates = { VAT15: 0.15, VAT10: 0.1, EXEMPT: 0 };

  const totals = useMemo(() => {
    const lineTotals = formData.lines.map((l) => {
      const base = (l.quantity || 0) * (l.unitPrice || 0);
      const lineDiscount = base * ((l.discountPercent || 0) / 100);
      const afterLineDiscount = base - lineDiscount;
      const taxRate = taxRates[l.taxCode] ?? 0;
      const taxAmount = afterLineDiscount * taxRate;
      const totalAfterTax = afterLineDiscount + taxAmount;
      return { base, afterLineDiscount, taxAmount, totalAfterTax };
    });
    const totalBeforeDiscount = lineTotals.reduce((sum, t) => sum + t.base, 0);
    const totalAfterLineDiscount = lineTotals.reduce((sum, t) => sum + t.afterLineDiscount, 0);
    const headerDiscountAmount = totalAfterLineDiscount * ((formData.headerDiscountPercent || 0) / 100);
    const subtotalBeforeTax = totalAfterLineDiscount - headerDiscountAmount;
    const totalTax = lineTotals.reduce((sum, t) => sum + t.taxAmount, 0);
    const totalAfterTax = subtotalBeforeTax + totalTax;
    return { totalBeforeDiscount, totalAfterLineDiscount, headerDiscountAmount, subtotalBeforeTax, totalTax, totalAfterTax };
  }, [formData.headerDiscountPercent, formData.lines, taxRates]);

  const handleSubmitForApproval = () => setDocumentStatus('UnderReview');
  const handleApprove = () => setDocumentStatus('Approved');
  const handlePostToSAP = () => {
    setSapDocEntry(4321);
    setDocumentStatus('Open');
  };
  const handleRunATP = () => console.log('Run ATP / Availability');

  const generateDocCode = (docType, next, seriesOverride) => {
    const prefixes = {
      Quotation: 'QT',
      Order: 'SO',
      Delivery: 'DL',
      Invoice: 'INV',
      Return: 'RT',
      CreditMemo: 'CM',
      DownPayment: 'DP',
      BlanketAgreement: 'BA',
    };
    const prefix = prefixes[docType] || 'DOC';
    const year = new Date().getFullYear();
    const base = seriesOverride || `${prefix}-${year}`;
    return `${base}-${String(next).padStart(6, '0')}`;
  };

  const updateSeriesPreview = (series: string, docType: string) => {
    const tenantCounters = seriesCounters[formData.tenantId] || {};
    const counter = (tenantCounters[docType] ?? 0) + 1;
    setNextSeriesPreview(generateDocCode(docType, counter, series));
  };

  const validateForm = () => {
    const errs: string[] = [];
    if (!formData.bpCode) errs.push('Customer is required.');
    if (!formData.docDate) errs.push('Document date is required.');
    if (!formData.priceListId) errs.push('Price list is required.');
    if (!formData.paymentTermsCode) errs.push('Payment terms are required.');
    if (!formData.currency) errs.push('Currency is required.');
    if (!formData.docSeries) errs.push('Document series is required.');
    if (!formData.warehouseCode) errs.push('Default warehouse is required.');
    if (!formData.lines.length) errs.push('At least one line is required.');
    formData.lines.forEach((l, idx) => {
      if (!l.itemCode) errs.push(`Line ${idx + 1}: item code is required.`);
      if (!l.uom) errs.push(`Line ${idx + 1}: UoM is required.`);
      if (!l.warehouseCode) errs.push(`Line ${idx + 1}: warehouse is required.`);
      if (!l.taxCode) errs.push(`Line ${idx + 1}: tax code is required.`);
    });
    if (creditStatus === 'OverLimitBlocked') errs.push('Credit limit exceeded (blocked).');
    if (marginStatus === 'BelowMinBlocked') errs.push('Margin below minimum (blocked).');
    return errs;
  };

  const handleSave = (submit = false) => {
    const errs = validateForm();
    setErrors(errs);
    if (errs.length) return;
    if (submit) setDocumentStatus('UnderReview');
    const tenantCounters = seriesCounters[formData.tenantId] || {};
    const nextNumber = (tenantCounters[docType] ?? 0) + 1;
    const docCode = formData.docCode || generateDocCode(docType, nextNumber, formData.docSeries);
    const updatedTenantCounters = { ...tenantCounters, [docType]: nextNumber };
    setSeriesCounters(prev => ({ ...prev, [formData.tenantId]: updatedTenantCounters }));
    setNextSeriesPreview(generateDocCode(docType, nextNumber + 1, formData.docSeries));
    const payload = {
      ...formData,
      status: submit ? 'UnderReview' : documentStatus,
      totals,
      sapDocEntry,
      docCode
    };
    onSave(payload);
  };

  // keep preview in sync
  React.useEffect(() => {
    updateSeriesPreview(formData.docSeries, docType);
  }, [formData.docSeries, formData.tenantId, docType, seriesCounters]);

  React.useEffect(() => {
    if (defaultData && Object.keys(defaultData).length) {
      setFormData((prev) => ({ ...prev, ...defaultData }));
    }
  }, [defaultData, docType]);

  const createEmptyLine = () => ({
    itemCode: '',
    description: '',
    uom: 'PC',
    quantity: 1,
    unitPrice: 0,
    baseLineId: '',
    warehouseCode: formData.warehouseCode || 'WH-CAIRO',
    taxCode: 'VAT15',
    discountPercent: 0,
    priceSource: 'PriceList',
    marginPercent: 25,
    costAmountEstimated: 0,
    deliveredQty: 0,
    invoicedQty: 0,
    returnQty: 0,
    promotionCode: ''
  });

  const addLine = () => {
    setFormData({
      ...formData,
      lines: [
        ...formData.lines,
        createEmptyLine()
      ]
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Fields */}
      <div className="grid grid-cols-3 gap-4">
        <FormField label="Tenant">
          <Select value={formData.tenantId} onChange={(e) => setFormData({...formData, tenantId: e.target.value})}
            options={[
              { value: 'TENANT-001', label: 'TENANT-001' },
              { value: 'TENANT-002', label: 'TENANT-002' },
            ]} />
        </FormField>
        <FormField label="Customer" required>
          <Select value={formData.bpCode} onChange={(e) => setFormData({...formData, bpCode: e.target.value})}
            options={[
              { value: '', label: 'Select Customer...' },
              { value: 'C10001', label: 'C10001 - Cairo Industries Ltd' },
              { value: 'C10002', label: 'C10002 - Alexandria Trading Co' },
              { value: 'C10003', label: 'C10003 - Delta Electronics' },
              { value: 'C10004', label: 'C10004 - Giza Supplies' },
            ]} />
        </FormField>
        <FormField label="Document Date" required>
          <Input type="date" value={formData.docDate} onChange={(e) => setFormData({...formData, docDate: e.target.value})} />
        </FormField>
        <FormField label="Series / Code">
          <div className="grid grid-cols-2 gap-2">
            <Input value={formData.docSeries} onChange={(e) => setFormData({...formData, docSeries: e.target.value})} placeholder="Series" />
            <Input value={formData.docCode} onChange={(e) => setFormData({...formData, docCode: e.target.value})} placeholder="Doc Number" />
          </div>
        </FormField>
        {docType === 'Quotation' && (
          <FormField label="Valid Until">
            <Input type="date" value={formData.validUntilDate} onChange={(e) => setFormData({...formData, validUntilDate: e.target.value})} />
          </FormField>
        )}
        {(docType === 'Order' || docType === 'Delivery') && (
          <FormField label="Delivery Date">
            <Input type="date" value={formData.deliveryDate} onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})} />
          </FormField>
        )}
        {(docType === 'Return' || docType === 'CreditMemo' || docType === 'Delivery' || docType === 'Invoice') && (
          <FormField label="Base Document">
            <Select value={formData.baseDocumentId} onChange={(e) => setFormData({...formData, baseDocumentId: e.target.value})}
              options={[
                { value: '', label: 'Select base document...' },
                { value: 'SO-2025-001234', label: 'SO-2025-001234 (Order)' },
                { value: 'DL-2025-000892', label: 'DL-2025-000892 (Delivery)' },
                { value: 'INV-2025-001567', label: 'INV-2025-001567 (Invoice)' },
              ]} />
          </FormField>
        )}
        {docType === 'DownPayment' && (
          <FormField label="Down Payment %" hint="Request percentage for down payment invoice">
            <Input type="number" value={formData.downPaymentPercent} onChange={(e) => setFormData({...formData, downPaymentPercent: parseFloat(e.target.value) || 0})} />
          </FormField>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4">
        <FormField label="Price List">
          <Select value={formData.priceListId} onChange={(e) => setFormData({...formData, priceListId: e.target.value})}
            options={[
              { value: '', label: 'Default Price List' },
              { value: 'PL-RETAIL', label: 'Retail Price List' },
              { value: 'PL-WHOLESALE', label: 'Wholesale Price List' },
              { value: 'PL-VIP', label: 'VIP Customers' },
            ]} />
        </FormField>
        <FormField label="Payment Terms">
          <Select value={formData.paymentTermsCode} onChange={(e) => setFormData({...formData, paymentTermsCode: e.target.value})}
            options={[
              { value: 'CASH', label: 'Cash' },
              { value: 'NET15', label: 'Net 15' },
              { value: 'NET30', label: 'Net 30' },
              { value: 'NET60', label: 'Net 60' },
            ]} />
        </FormField>
        <FormField label="Currency">
          <Select value={formData.currency} onChange={(e) => setFormData({...formData, currency: e.target.value})}
            options={[{ value: 'EGP', label: 'EGP' }, { value: 'USD', label: 'USD' }, { value: 'EUR', label: 'EUR' }]} />
        </FormField>
        <FormField label="FX Rate">
          <Input type="number" step="0.0001" value={formData.exchangeRate} onChange={(e) => setFormData({...formData, exchangeRate: parseFloat(e.target.value) || 1})} />
        </FormField>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <FormField label="Warehouse">
          <Select value={formData.warehouseCode} onChange={(e) => setFormData({...formData, warehouseCode: e.target.value})}
            options={[
              { value: 'WH-CAIRO', label: 'Cairo Warehouse' },
              { value: 'WH-ALEX', label: 'Alexandria Warehouse' },
              { value: 'WH-10RAM', label: '10th Ramadan Warehouse' },
            ]} />
        </FormField>
        <FormField label="Salesperson">
          <Select value={formData.salespersonUserId} onChange={(e) => setFormData({...formData, salespersonUserId: e.target.value})}
            options={[
              { value: 'AHASSAN', label: 'Ahmed Hassan' },
              { value: 'SMOHAMED', label: 'Sara Mohamed' },
              { value: 'OALI', label: 'Omar Ali' },
            ]} />
        </FormField>
        <FormField label="Source Channel">
          <Select value={formData.sourceChannel} onChange={(e) => setFormData({...formData, sourceChannel: e.target.value})}
            options={[
              { value: 'CRM', label: 'CRM' },
              { value: 'Ecommerce', label: 'E-commerce' },
              { value: 'POS', label: 'POS' },
              { value: 'Service', label: 'Service' },
              { value: 'ICP', label: 'ICP' },
              { value: 'Manual', label: 'Manual' },
            ]} />
        </FormField>
        <FormField label="Tax Group">
          <Select value={formData.taxGroupCode} onChange={(e) => setFormData({...formData, taxGroupCode: e.target.value})}
            options={[
              { value: 'VAT15', label: 'VAT 15%' },
              { value: 'VAT10', label: 'VAT 10%' },
              { value: 'EXEMPT', label: 'Exempt' },
            ]} />
        </FormField>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <FormField label="Header Discount %">
          <Input type="number" value={formData.headerDiscountPercent} onChange={(e) => setFormData({...formData, headerDiscountPercent: parseFloat(e.target.value) || 0})} />
        </FormField>
        <FormField label="Document Status">
          <Select value={documentStatus} onChange={(e) => setDocumentStatus(e.target.value)}
            options={[
              { value: 'Draft', label: 'Draft' },
              { value: 'UnderReview', label: 'Under Review' },
              { value: 'Approved', label: 'Approved' },
              { value: 'Open', label: 'Open' },
              { value: 'Closed', label: 'Closed' },
            ]} />
        </FormField>
        <FormField label="Credit Check">
          <Select value={creditStatus} onChange={(e) => setCreditStatus(e.target.value)}
            options={[
              { value: 'WithinLimit', label: 'Within Limit' },
              { value: 'OverLimitWarning', label: 'Over Limit (Warn)' },
              { value: 'OverLimitBlocked', label: 'Over Limit (Block)' },
            ]} />
        </FormField>
        <FormField label="Margin Check">
          <Select value={marginStatus} onChange={(e) => setMarginStatus(e.target.value)}
            options={[
              { value: 'Ok', label: 'OK' },
              { value: 'LowMarginWarning', label: 'Low Margin (Warn)' },
              { value: 'BelowMinBlocked', label: 'Below Min (Block)' },
            ]} />
        </FormField>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <FormField label="Contact Person">
          <Input value={formData.contactPerson} onChange={(e) => setFormData({...formData, contactPerson: e.target.value})} placeholder="Contact name" />
        </FormField>
        <FormField label="Bill To">
          <Select value={formData.billToAddressId} onChange={(e) => setFormData({...formData, billToAddressId: e.target.value})}
            options={[
              { value: '', label: 'Select bill-to...' },
              { value: 'BILL-01', label: 'HQ - 123 Nile St' },
              { value: 'BILL-02', label: 'Alex Office - Corniche' },
            ]} />
        </FormField>
        <FormField label="Ship To">
          <Select value={formData.shipToAddressId} onChange={(e) => setFormData({...formData, shipToAddressId: e.target.value})}
            options={[
              { value: '', label: 'Select ship-to...' },
              { value: 'SHIP-01', label: 'Warehouse Cairo' },
              { value: 'SHIP-02', label: 'Alexandria Port' },
            ]} />
        </FormField>
        <FormField label="Project / Contract">
          <div className="grid grid-cols-2 gap-2">
            <Select value={formData.projectId} onChange={(e) => setFormData({...formData, projectId: e.target.value})}
              options={[
                { value: '', label: 'Project...' },
                { value: 'PRJ-001', label: 'PRJ-001 - Mall Fitout' },
                { value: 'PRJ-002', label: 'PRJ-002 - ERP Rollout' },
              ]} />
            <Select value={formData.contractId} onChange={(e) => setFormData({...formData, contractId: e.target.value})}
              options={[
                { value: '', label: 'Contract...' },
                { value: 'CON-100', label: 'Contract 100 - SLA' },
                { value: 'CON-200', label: 'Contract 200 - ICP' },
              ]} />
          </div>
        </FormField>
      </div>

      {/* Lines */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-900">Document Lines</h3>
          <Button variant="secondary" size="sm" icon={Plus} onClick={addLine}>Add Line</Button>
        </div>
        <Card>
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600">#</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600">Item Code</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600">Base Line</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600">Description</th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-slate-600">UoM</th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-slate-600">Qty</th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-slate-600">Delivered</th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-slate-600">Invoiced</th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-slate-600">Return</th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-slate-600">Unit Price</th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-slate-600">Discount %</th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-slate-600">Tax</th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-slate-600">Warehouse</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600">Price Source</th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-slate-600">Margin %</th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-slate-600">Cost Est.</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600">Promotion</th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-slate-600">Total</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {formData.lines.map((line, idx) => (
                <tr key={idx} className="border-b">
                  <td className="px-3 py-2 text-sm">{idx + 1}</td>
                  <td className="px-3 py-2">
                    <Input value={line.itemCode} onChange={(e) => {
                      const newLines = [...formData.lines];
                      newLines[idx].itemCode = e.target.value;
                      setFormData({...formData, lines: newLines});
                    }} placeholder="Item code" className="w-32" />
                  </td>
                  <td className="px-3 py-2">
                    <Input value={line.baseLineId || ''} readOnly placeholder="Base line" className="w-28 bg-slate-50" />
                  </td>
                  <td className="px-3 py-2">
                    <Input value={line.description} onChange={(e) => {
                      const newLines = [...formData.lines];
                      newLines[idx].description = e.target.value;
                      setFormData({...formData, lines: newLines});
                    }} placeholder="Description" />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <Select value={line.uom} onChange={(e) => {
                      const newLines = [...formData.lines];
                      newLines[idx].uom = e.target.value;
                      setFormData({...formData, lines: newLines});
                    }} className="w-20" options={[{ value: 'PC', label: 'PC' }, { value: 'BOX', label: 'BOX' }, { value: 'KG', label: 'KG' }, { value: 'HOUR', label: 'HR' }]} />
                  </td>
                  <td className="px-3 py-2">
                    <Input type="number" value={line.quantity} onChange={(e) => {
                      const newLines = [...formData.lines];
                      newLines[idx].quantity = parseFloat(e.target.value) || 0;
                      setFormData({...formData, lines: newLines});
                    }} className="w-20 text-right" />
                  </td>
                  <td className="px-3 py-2">
                    <Input type="number" value={line.deliveredQty} onChange={(e) => {
                      const newLines = [...formData.lines];
                      newLines[idx].deliveredQty = parseFloat(e.target.value) || 0;
                      setFormData({...formData, lines: newLines});
                    }} className="w-20 text-right" />
                  </td>
                  <td className="px-3 py-2">
                    <Input type="number" value={line.invoicedQty} onChange={(e) => {
                      const newLines = [...formData.lines];
                      newLines[idx].invoicedQty = parseFloat(e.target.value) || 0;
                      setFormData({...formData, lines: newLines});
                    }} className="w-20 text-right" />
                  </td>
                  <td className="px-3 py-2">
                    <Input type="number" value={line.returnQty} onChange={(e) => {
                      const newLines = [...formData.lines];
                      newLines[idx].returnQty = parseFloat(e.target.value) || 0;
                      setFormData({...formData, lines: newLines});
                    }} className="w-20 text-right" />
                  </td>
                  <td className="px-3 py-2">
                    <Input type="number" value={line.unitPrice} onChange={(e) => {
                      const newLines = [...formData.lines];
                      newLines[idx].unitPrice = parseFloat(e.target.value) || 0;
                      setFormData({...formData, lines: newLines});
                    }} className="w-28 text-right" />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <Input type="number" value={line.discountPercent} onChange={(e) => {
                      const newLines = [...formData.lines];
                      newLines[idx].discountPercent = parseFloat(e.target.value) || 0;
                      setFormData({...formData, lines: newLines});
                    }} className="w-20 text-center" />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <Select value={line.taxCode} onChange={(e) => {
                      const newLines = [...formData.lines];
                      newLines[idx].taxCode = e.target.value;
                      setFormData({...formData, lines: newLines});
                    }} className="w-24" options={[{ value: 'VAT15', label: 'VAT 15%' }, { value: 'VAT10', label: 'VAT 10%' }, { value: 'EXEMPT', label: 'Exempt' }]} />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <Select value={line.warehouseCode} onChange={(e) => {
                      const newLines = [...formData.lines];
                      newLines[idx].warehouseCode = e.target.value;
                      setFormData({...formData, lines: newLines});
                    }} className="w-28" options={[{ value: 'WH-CAIRO', label: 'Cairo' }, { value: 'WH-ALEX', label: 'Alexandria' }, { value: 'WH-10RAM', label: '10th Ramadan' }]} />
                  </td>
                  <td className="px-3 py-2">
                    <Select value={line.priceSource} onChange={(e) => {
                      const newLines = [...formData.lines];
                      newLines[idx].priceSource = e.target.value;
                      setFormData({...formData, lines: newLines});
                    }} className="w-32" options={[
                      { value: 'PriceList', label: 'Price List' },
                      { value: 'SpecialPrice', label: 'Special Price' },
                      { value: 'ContractPrice', label: 'Contract Price' },
                      { value: 'Promotion', label: 'Promotion' },
                      { value: 'ManualOverride', label: 'Manual Override' },
                      { value: 'LastTransactionPrice', label: 'Last Transaction' },
                    ]} />
                  </td>
                  <td className="px-3 py-2">
                    <Input type="number" value={line.marginPercent} onChange={(e) => {
                      const newLines = [...formData.lines];
                      newLines[idx].marginPercent = parseFloat(e.target.value) || 0;
                      setFormData({...formData, lines: newLines});
                    }} className="w-24 text-right" />
                  </td>
                  <td className="px-3 py-2">
                    <Input type="number" value={line.costAmountEstimated} onChange={(e) => {
                      const newLines = [...formData.lines];
                      newLines[idx].costAmountEstimated = parseFloat(e.target.value) || 0;
                      setFormData({...formData, lines: newLines});
                    }} className="w-28 text-right" />
                  </td>
                  <td className="px-3 py-2">
                    <Input value={line.promotionCode} onChange={(e) => {
                      const newLines = [...formData.lines];
                      newLines[idx].promotionCode = e.target.value;
                      setFormData({...formData, lines: newLines});
                    }} placeholder="Promo code" className="w-28" />
                  </td>
                  <td className="px-3 py-2 text-right font-medium">
                    {formatCurrency(((line.quantity || 0) * (line.unitPrice || 0)) * (1 - (line.discountPercent || 0)/100) * (1 + (taxRates[line.taxCode] ?? 0)))}
                  </td>
                  <td className="px-3 py-2">
                    <button onClick={() => {
                      const newLines = formData.lines.filter((_, i) => i !== idx);
                      setFormData({...formData, lines: newLines.length ? newLines : [createEmptyLine()]});
                    }} className="p-1 hover:bg-red-50 rounded"><Trash2 size={14} className="text-red-400" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Totals & Validation */}
      <Card className="p-4 space-y-3">
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-slate-500">Total Before Discount</p>
            <p className="text-lg font-semibold text-slate-900">
              {formatCurrency(totals.totalBeforeDiscount)}
            </p>
          </div>
          <div>
            <p className="text-slate-500">Header Discount</p>
            <p className="text-lg font-semibold text-amber-700">
              -{formData.headerDiscountPercent || 0}% ({formatCurrency(totals.headerDiscountAmount)})
            </p>
          </div>
          <div>
            <p className="text-slate-500">Tax Group / Tax</p>
            <p className="text-lg font-semibold text-slate-900">{formData.taxGroupCode} ({formatCurrency(totals.totalTax)})</p>
          </div>
          <div>
            <p className="text-slate-500">Currency / FX</p>
            <p className="text-lg font-semibold text-slate-900">{formData.currency} @ {formData.exchangeRate}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-slate-500">Subtotal (after line + header discounts)</p>
            <p className="text-lg font-semibold text-slate-900">{formatCurrency(totals.subtotalBeforeTax)}</p>
          </div>
          <div>
            <p className="text-slate-500">Tax</p>
            <p className="text-lg font-semibold text-slate-900">{formatCurrency(totals.totalTax)}</p>
          </div>
          <div>
            <p className="text-slate-500">Total After Tax</p>
            <p className="text-xl font-bold text-slate-900">{formatCurrency(totals.totalAfterTax)}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <StatusBadge status={documentStatus} />
          <StatusBadge status={creditStatus} />
          <StatusBadge status={marginStatus} />
          <span className="text-xs text-slate-500">Pricing source: {formData.lines.some(l => l.priceSource !== 'PriceList') ? 'Mixed' : 'Price List'}</span>
          <span className="text-xs text-slate-500">Series Preview: {nextSeriesPreview}</span>
          {sapDocEntry && <span className="text-xs font-semibold text-green-700">SAP DocEntry: {sapDocEntry}</span>}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" onClick={handleSubmitForApproval}>Submit for Approval</Button>
          <Button variant="primary" size="sm" onClick={handleApprove}>Approve</Button>
          <Button variant="secondary" size="sm" onClick={handlePostToSAP}>Post to SAP</Button>
          <Button variant="secondary" size="sm" onClick={handleRunATP}>Run ATP / Availability</Button>
        </div>
      </Card>
      {errors.length > 0 && (
        <Card className="p-4 bg-red-50 border-red-200">
          <p className="text-sm font-semibold text-red-700 mb-2">Please fix the following:</p>
          <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
            {errors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </Card>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={Save} onClick={() => handleSave(false)}>Save as Draft</Button>
          <Button icon={Send} onClick={() => handleSave(true)} disabled={creditStatus === 'OverLimitBlocked' || marginStatus === 'BelowMinBlocked'}>
            Save & Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
type SalesCorePart1Props = {
  initialTab?: string;
};

export default function SalesCorePart1({ initialTab = 'dashboard' }: SalesCorePart1Props = {}) {
  const seedDocuments = [
    {
      id: '1',
      docCode: 'QT-2025-001542',
      docType: 'Quotation',
      bpCode: 'C10001',
      bpName: 'Cairo Industries Ltd',
      docDate: '2025-07-15',
      validUntil: '2025-08-15',
      totalAfterTax: 125000,
      currency: 'EGP',
      status: 'Approved',
      sourceChannel: 'CRM',
      salesperson: 'Ahmed Hassan',
      creditCheck: 'WithinLimit',
      sapDocEntry: 100542,
      priceListId: 'PL-RETAIL',
      paymentTermsCode: 'NET30',
      warehouseCode: 'WH-CAIRO',
      lines: [
        { itemCode: 'ITEM-001', description: 'LED TV 55"', uom: 'PC', quantity: 5, unitPrice: 5000, warehouseCode: 'WH-CAIRO', taxCode: 'VAT15', discountPercent: 5, priceSource: 'PriceList', marginPercent: 22, costAmountEstimated: 3900 },
        { itemCode: 'SERV-IMP', description: 'Installation', uom: 'HOUR', quantity: 10, unitPrice: 300, warehouseCode: 'WH-CAIRO', taxCode: 'VAT15', discountPercent: 0, priceSource: 'ManualOverride', marginPercent: 45, costAmountEstimated: 150 }
      ]
    },
    {
      id: '2',
      docCode: 'SO-2025-001234',
      docType: 'Order',
      bpCode: 'C10002',
      bpName: 'Alexandria Trading Co',
      docDate: '2025-07-14',
      deliveryDate: '2025-07-20',
      totalAfterTax: 87500,
      currency: 'EGP',
      status: 'PartiallyDelivered',
      sourceChannel: 'Ecommerce',
      salesperson: 'Sara Mohamed',
      creditCheck: 'WithinLimit',
      sapDocEntry: 1234,
      sapDocNum: 450021,
      priceListId: 'PL-WHOLESALE',
      paymentTermsCode: 'NET30',
      warehouseCode: 'WH-ALEX',
      lines: [
        { itemCode: 'ITEM-050', description: 'POS Terminal', uom: 'PC', quantity: 3, unitPrice: 8000, deliveredQty: 2, invoicedQty: 1, warehouseCode: 'WH-ALEX', taxCode: 'VAT15', discountPercent: 2, priceSource: 'SpecialPrice', marginPercent: 30, costAmountEstimated: 5600 },
        { itemCode: 'ITEM-051', description: 'Barcode Scanner', uom: 'PC', quantity: 10, unitPrice: 1200, deliveredQty: 5, invoicedQty: 0, warehouseCode: 'WH-ALEX', taxCode: 'VAT15', discountPercent: 0, priceSource: 'PriceList', marginPercent: 25, costAmountEstimated: 800 }
      ]
    },
    {
      id: '3',
      docCode: 'DL-2025-000892',
      docType: 'Delivery',
      bpCode: 'C10002',
      bpName: 'Alexandria Trading Co',
      docDate: '2025-07-16',
      totalAfterTax: 45000,
      currency: 'EGP',
      status: 'Delivered',
      sourceChannel: 'Ecommerce',
      salesperson: 'Sara Mohamed',
      sapDocEntry: 892,
      sapDocNum: 450050,
      priceListId: 'PL-WHOLESALE',
      paymentTermsCode: 'NET30',
      warehouseCode: 'WH-ALEX',
      lines: [
        { itemCode: 'ITEM-050', description: 'POS Terminal', uom: 'PC', quantity: 1, deliveredQty: 1, invoicedQty: 0, unitPrice: 8000, warehouseCode: 'WH-ALEX', taxCode: 'VAT15', discountPercent: 2, priceSource: 'SpecialPrice', marginPercent: 30, costAmountEstimated: 5600 }
      ]
    },
    {
      id: '4',
      docCode: 'INV-2025-001567',
      docType: 'Invoice',
      bpCode: 'C10003',
      bpName: 'Delta Electronics',
      docDate: '2025-07-15',
      totalAfterTax: 245000,
      currency: 'EGP',
      status: 'Open',
      sourceChannel: 'Manual',
      salesperson: 'Omar Ali',
      sapDocEntry: 1567,
      sapDocNum: 800120,
      priceListId: 'PL-RETAIL',
      paymentTermsCode: 'NET30',
      warehouseCode: 'WH-CAIRO',
      lines: [
        { itemCode: 'ITEM-100', description: 'Server Rack', uom: 'PC', quantity: 4, unitPrice: 20000, invoicedQty: 4, warehouseCode: 'WH-CAIRO', taxCode: 'VAT15', discountPercent: 3, priceSource: 'PriceList', marginPercent: 28, costAmountEstimated: 14000 }
      ]
    },
    {
      id: '5',
      docCode: 'QT-2025-001543',
      docType: 'Quotation',
      bpCode: 'C10004',
      bpName: 'Giza Supplies',
      docDate: '2025-07-16',
      validUntil: '2025-08-16',
      totalAfterTax: 35000,
      currency: 'EGP',
      status: 'Draft',
      sourceChannel: 'CRM',
      salesperson: 'Ahmed Hassan',
      creditCheck: 'OverLimitWarning',
      priceListId: 'PL-RETAIL',
      paymentTermsCode: 'NET30',
      warehouseCode: 'WH-CAIRO',
      lines: [
        { itemCode: 'ITEM-200', description: 'Safety Helmets', uom: 'BOX', quantity: 20, unitPrice: 500, warehouseCode: 'WH-CAIRO', taxCode: 'VAT10', discountPercent: 0, priceSource: 'PriceList', marginPercent: 18, costAmountEstimated: 380 }
      ]
    },
    {
      id: '6',
      docCode: 'SO-2025-001235',
      docType: 'Order',
      bpCode: 'C10001',
      bpName: 'Cairo Industries Ltd',
      docDate: '2025-07-12',
      deliveryDate: '2025-07-18',
      totalAfterTax: 320000,
      currency: 'EGP',
      status: 'Invoiced',
      sourceChannel: 'CRM',
      salesperson: 'Ahmed Hassan',
      creditCheck: 'WithinLimit',
      sapDocEntry: 1235,
      sapDocNum: 450022,
      priceListId: 'PL-RETAIL',
      paymentTermsCode: 'NET30',
      warehouseCode: 'WH-CAIRO',
      lines: [
        { itemCode: 'ITEM-300', description: 'Industrial Pumps', uom: 'PC', quantity: 6, unitPrice: 45000, deliveredQty: 6, invoicedQty: 6, warehouseCode: 'WH-CAIRO', taxCode: 'VAT15', discountPercent: 5, priceSource: 'ContractPrice', marginPercent: 20, costAmountEstimated: 36000 }
      ]
    },
    {
      id: '7',
      docCode: 'RT-2025-000045',
      docType: 'Return',
      bpCode: 'C10002',
      bpName: 'Alexandria Trading Co',
      docDate: '2025-07-18',
      totalAfterTax: 12000,
      currency: 'EGP',
      status: 'Open',
      sourceChannel: 'Ecommerce',
      salesperson: 'Sara Mohamed',
      sapDocEntry: 1456,
      sapDocNum: 600210,
      priceListId: 'PL-WHOLESALE',
      paymentTermsCode: 'NET30',
      warehouseCode: 'WH-ALEX',
      lines: [
        { itemCode: 'ITEM-051', description: 'Barcode Scanner', uom: 'PC', quantity: 2, returnQty: 2, unitPrice: 1200, warehouseCode: 'WH-ALEX', taxCode: 'VAT15', discountPercent: 0, priceSource: 'PriceList', marginPercent: 25, costAmountEstimated: 800 }
      ]
    },
    {
      id: '8',
      docCode: 'CM-2025-000012',
      docType: 'CreditMemo',
      bpCode: 'C10003',
      bpName: 'Delta Electronics',
      docDate: '2025-07-17',
      totalAfterTax: 18000,
      currency: 'EGP',
      status: 'Approved',
      sourceChannel: 'CRM',
      salesperson: 'Omar Ali',
      sapDocEntry: 1457,
      sapDocNum: 700056,
      priceListId: 'PL-RETAIL',
      paymentTermsCode: 'NET30',
      warehouseCode: 'WH-CAIRO',
      lines: [
        { itemCode: 'ITEM-100', description: 'Server Rack', uom: 'PC', quantity: 1, returnQty: 1, unitPrice: 20000, warehouseCode: 'WH-CAIRO', taxCode: 'VAT15', discountPercent: 0, priceSource: 'PriceList', marginPercent: 28, costAmountEstimated: 14000 }
      ]
    },
    {
      id: '9',
      docCode: 'DP-REQ-2025-0007',
      docType: 'DownPayment',
      bpCode: 'C10001',
      bpName: 'Cairo Industries Ltd',
      docDate: '2025-07-10',
      totalAfterTax: 50000,
      currency: 'EGP',
      status: 'UnderReview',
      sourceChannel: 'CRM',
      salesperson: 'Ahmed Hassan',
      sapDocEntry: 1600,
      sapDocNum: 900005,
      priceListId: 'PL-RETAIL',
      paymentTermsCode: 'NET30',
      warehouseCode: 'WH-CAIRO',
      lines: [
        { itemCode: 'ITEM-300', description: 'Industrial Pumps', uom: 'PC', quantity: 1, unitPrice: 45000, warehouseCode: 'WH-CAIRO', taxCode: 'VAT15', discountPercent: 0, priceSource: 'PriceList', marginPercent: 20, costAmountEstimated: 36000 }
      ]
    },
    {
      id: '10',
      docCode: 'BA-2025-0003',
      docType: 'BlanketAgreement',
      bpCode: 'C10005',
      bpName: 'BuildPro Contractors',
      docDate: '2025-07-01',
      totalAfterTax: 800000,
      currency: 'EGP',
      status: 'Open',
      sourceChannel: 'ICP',
      salesperson: 'Projects Team',
      sapDocEntry: 1700,
      sapDocNum: 990003,
      priceListId: 'PL-RETAIL',
      paymentTermsCode: 'NET30',
      warehouseCode: 'WH-CAIRO',
      lines: [
        { itemCode: 'ITEM-400', description: 'Yearly HVAC Service', uom: 'HOUR', quantity: 500, unitPrice: 1600, warehouseCode: 'WH-CAIRO', taxCode: 'VAT15', discountPercent: 10, priceSource: 'ContractPrice', marginPercent: 30, costAmountEstimated: 1200 }
      ]
    },
  ];

  const [activeTab, setActiveTab] = useState(initialTab);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createDocType, setCreateDocType] = useState('Quotation');
  const [createDefaults, setCreateDefaults] = useState({});
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documents, setDocuments] = useState(seedDocuments);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem('sales-documents');
    if (raw) {
      try {
        setDocuments(JSON.parse(raw));
      } catch {
        setDocuments(seedDocuments);
      }
    }
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('sales-documents', JSON.stringify(documents));
  }, [documents]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'quotations', label: 'Quotations', badge: '42' },
    { id: 'orders', label: 'Orders', badge: '23', badgeColor: 'bg-green-100 text-green-700' },
    { id: 'deliveries', label: 'Deliveries', badge: '12' },
    { id: 'invoices', label: 'Invoices', badge: '8' },
    { id: 'returns', label: 'Returns', badge: '4' },
    { id: 'credit-memos', label: 'Credit Memos', badge: '3' },
    { id: 'down-payments', label: 'Down Payments', badge: '2' },
    { id: 'blanket', label: 'Blanket Agreements', badge: '1' },
  ];

  const handleCreateDocument = (docType) => {
    setCreateDocType(docType);
    setCreateDefaults({});
    setShowCreateForm(true);
  };

  const handleConvert = (doc, targetType) => {
    setCreateDocType(targetType);
    const baseLines = (doc.lines || []).map((line, idx) => ({
      ...line,
      baseLineId: `${doc.docCode}-${idx + 1}`,
      deliveredQty: 0,
      invoicedQty: 0,
      returnQty: 0
    }));
    setCreateDefaults({
      baseDocumentId: doc.docCode,
      bpCode: doc.bpCode,
      currency: doc.currency,
      warehouseCode: doc.warehouseCode,
      priceListId: doc.priceListId,
      paymentTermsCode: doc.paymentTermsCode,
      lines: baseLines
    });
    setShowCreateForm(true);
  };

  const handleSaveDocument = (data) => {
    const newDoc = {
      ...data,
      id: Date.now().toString(),
      docType: createDocType,
      docDate: data.docDate || new Date().toISOString().slice(0, 10),
      totalAfterTax: data.totals?.totalAfterTax || 0,
      status: data.status || 'Draft'
    };
    // recompute totals in case lines changed after form calculation
    const recomputeTotals = () => {
      const taxRates = { VAT15: 0.15, VAT10: 0.1, EXEMPT: 0 };
      const lineTotals = (data.lines || []).map((l) => {
        const base = (l.quantity || 0) * (l.unitPrice || 0);
        const lineDiscount = base * ((l.discountPercent || 0) / 100);
        const afterLineDiscount = base - lineDiscount;
        const taxRate = taxRates[l.taxCode] ?? 0;
        const taxAmount = afterLineDiscount * taxRate;
        const totalAfterTax = afterLineDiscount + taxAmount;
        return { base, afterLineDiscount, taxAmount, totalAfterTax };
      });
      const totalBeforeDiscount = lineTotals.reduce((sum, t) => sum + t.base, 0);
      const totalAfterLineDiscount = lineTotals.reduce((sum, t) => sum + t.afterLineDiscount, 0);
      const headerDiscountAmount = totalAfterLineDiscount * ((data.headerDiscountPercent || 0) / 100);
      const subtotalBeforeTax = totalAfterLineDiscount - headerDiscountAmount;
      const totalTax = lineTotals.reduce((sum, t) => sum + t.taxAmount, 0);
      const totalAfterTax = subtotalBeforeTax + totalTax;
      return { totalBeforeDiscount, totalAfterLineDiscount, headerDiscountAmount, subtotalBeforeTax, totalTax, totalAfterTax };
    };
    const totals = recomputeTotals();
    setDocuments((prev) => [{ ...newDoc, totals, totalAfterTax: totals.totalAfterTax }, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100">
              <ShoppingCart size={24} className="text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Sales Core - Sales Documents</h1>
              <p className="text-sm text-slate-500">Quotes, Orders, Deliveries & Document Flow</p>
            </div>
          </div>
        </div>
        <div className="px-6">
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'dashboard' && <AllDocumentsDashboard documents={documents} onViewDocument={setSelectedDocument} />}
        {activeTab === 'quotations' && <SalesDocumentsPage documents={documents} docType="Quotation" onCreateDocument={() => handleCreateDocument('Quotation')} onViewDocument={setSelectedDocument} />}
        {activeTab === 'orders' && <SalesDocumentsPage documents={documents} docType="Order" onCreateDocument={() => handleCreateDocument('Order')} onViewDocument={setSelectedDocument} />}
        {activeTab === 'deliveries' && <SalesDocumentsPage documents={documents} docType="Delivery" onCreateDocument={() => handleCreateDocument('Delivery')} onViewDocument={setSelectedDocument} />}
        {activeTab === 'invoices' && <SalesDocumentsPage documents={documents} docType="Invoice" onCreateDocument={() => handleCreateDocument('Invoice')} onViewDocument={setSelectedDocument} />}
        {activeTab === 'returns' && <SalesDocumentsPage documents={documents} docType="Return" onCreateDocument={() => handleCreateDocument('Return')} onViewDocument={setSelectedDocument} />}
        {activeTab === 'credit-memos' && <SalesDocumentsPage documents={documents} docType="CreditMemo" onCreateDocument={() => handleCreateDocument('CreditMemo')} onViewDocument={setSelectedDocument} />}
        {activeTab === 'down-payments' && <SalesDocumentsPage documents={documents} docType="DownPayment" onCreateDocument={() => handleCreateDocument('DownPayment')} onViewDocument={setSelectedDocument} />}
        {activeTab === 'blanket' && <SalesDocumentsPage documents={documents} docType="BlanketAgreement" onCreateDocument={() => handleCreateDocument('BlanketAgreement')} onViewDocument={setSelectedDocument} />}
      </div>

      {/* Create Document Modal */}
      <Modal isOpen={showCreateForm} onClose={() => setShowCreateForm(false)} title={`Create ${createDocType}`} size="xl">
        <CreateDocumentForm
          docType={createDocType}
          defaultData={createDefaults}
          onSave={(data) => { handleSaveDocument(data); setShowCreateForm(false); }}
          onCancel={() => setShowCreateForm(false)}
        />
      </Modal>
    </div>
  );
}
