import React, { useState } from 'react';
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
// SALES DOCUMENTS LIST PAGE
// ============================================================
const SalesDocumentsPage = ({ docType, onCreateDocument, onViewDocument }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getDocTypeConfig = () => {
    switch (docType) {
      case 'Quotation': return { title: 'Quotations', icon: FileText, color: 'blue' };
      case 'Order': return { title: 'Sales Orders', icon: ShoppingCart, color: 'green' };
      case 'Delivery': return { title: 'Deliveries', icon: Truck, color: 'amber' };
      case 'Invoice': return { title: 'Invoices', icon: Receipt, color: 'purple' };
      default: return { title: 'Documents', icon: FileText, color: 'slate' };
    }
  };

  const config = getDocTypeConfig();

  const documents = [
    { id: '1', docCode: 'QT-2025-001542', docType: 'Quotation', bpCode: 'C10001', bpName: 'Cairo Industries Ltd', docDate: '2025-07-15', validUntil: '2025-08-15', totalAfterTax: 125000, currency: 'EGP', status: 'Approved', sourceChannel: 'CRM', salesperson: 'Ahmed Hassan', creditCheck: 'WithinLimit' },
    { id: '2', docCode: 'SO-2025-001234', docType: 'Order', bpCode: 'C10002', bpName: 'Alexandria Trading Co', docDate: '2025-07-14', deliveryDate: '2025-07-20', totalAfterTax: 87500, currency: 'EGP', status: 'PartiallyDelivered', sourceChannel: 'Ecommerce', salesperson: 'Sara Mohamed', creditCheck: 'WithinLimit', sapDocEntry: 1234 },
    { id: '3', docCode: 'DL-2025-000892', docType: 'Delivery', bpCode: 'C10002', bpName: 'Alexandria Trading Co', docDate: '2025-07-16', totalAfterTax: 45000, currency: 'EGP', status: 'Delivered', sourceChannel: 'Ecommerce', salesperson: 'Sara Mohamed', sapDocEntry: 892 },
    { id: '4', docCode: 'INV-2025-001567', docType: 'Invoice', bpCode: 'C10003', bpName: 'Delta Electronics', docDate: '2025-07-15', totalAfterTax: 245000, currency: 'EGP', status: 'Open', sourceChannel: 'Manual', salesperson: 'Omar Ali', sapDocEntry: 1567 },
    { id: '5', docCode: 'QT-2025-001543', docType: 'Quotation', bpCode: 'C10004', bpName: 'Giza Supplies', docDate: '2025-07-16', validUntil: '2025-08-16', totalAfterTax: 35000, currency: 'EGP', status: 'Draft', sourceChannel: 'CRM', salesperson: 'Ahmed Hassan', creditCheck: 'OverLimitWarning' },
    { id: '6', docCode: 'SO-2025-001235', docType: 'Order', bpCode: 'C10001', bpName: 'Cairo Industries Ltd', docDate: '2025-07-12', deliveryDate: '2025-07-18', totalAfterTax: 320000, currency: 'EGP', status: 'Invoiced', sourceChannel: 'CRM', salesperson: 'Ahmed Hassan', creditCheck: 'WithinLimit', sapDocEntry: 1235 },
  ].filter(d => docType === 'all' || d.docType === docType);

  const filteredDocs = documents.filter(doc => {
    if (filterStatus !== 'all' && doc.status !== filterStatus) return false;
    if (searchTerm && !doc.docCode.toLowerCase().includes(searchTerm.toLowerCase()) && !doc.bpName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const getStatusOptions = () => {
    if (docType === 'Quotation') return ['all', 'Draft', 'UnderReview', 'Approved', 'Closed', 'Cancelled'];
    if (docType === 'Order') return ['all', 'Draft', 'Open', 'PartiallyDelivered', 'Delivered', 'Invoiced', 'Closed'];
    if (docType === 'Delivery') return ['all', 'Draft', 'Delivered', 'PartiallyInvoiced', 'Invoiced'];
    if (docType === 'Invoice') return ['all', 'Draft', 'Open', 'Closed'];
    return ['all'];
  };

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
          <Button icon={Plus} onClick={onCreateDocument}>New {docType}</Button>
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
      </div>

      {/* Documents Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Document</th>
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
                <tr key={doc.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={doc.docType} />
                      <div>
                        <p className="font-semibold text-slate-900">{doc.docCode}</p>
                        {doc.sapDocEntry && <p className="text-xs text-slate-500">SAP: {doc.sapDocEntry}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900">{doc.bpName}</p>
                    <p className="text-xs text-slate-500">{doc.bpCode}</p>
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
// ALL DOCUMENTS DASHBOARD
// ============================================================
const AllDocumentsDashboard = ({ onViewDocument }) => {
  const recentDocuments = [
    { id: '1', docCode: 'INV-2025-001567', docType: 'Invoice', bpName: 'Delta Electronics', totalAfterTax: 245000, status: 'Open', docDate: '2025-07-15' },
    { id: '2', docCode: 'DL-2025-000892', docType: 'Delivery', bpName: 'Alexandria Trading Co', totalAfterTax: 45000, status: 'Delivered', docDate: '2025-07-16' },
    { id: '3', docCode: 'SO-2025-001234', docType: 'Order', bpName: 'Alexandria Trading Co', totalAfterTax: 87500, status: 'PartiallyDelivered', docDate: '2025-07-14' },
    { id: '4', docCode: 'QT-2025-001543', docType: 'Quotation', bpName: 'Giza Supplies', totalAfterTax: 35000, status: 'Draft', docDate: '2025-07-16' },
    { id: '5', docCode: 'QT-2025-001542', docType: 'Quotation', bpName: 'Cairo Industries Ltd', totalAfterTax: 125000, status: 'Approved', docDate: '2025-07-15' },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-blue-50"><FileText size={20} className="text-blue-600" /></div>
            <span className="text-xs text-green-600">+12% vs last month</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">156</p>
          <p className="text-sm text-slate-500">Quotations</p>
          <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between text-xs">
            <span className="text-slate-500">Open: 42</span>
            <span className="text-green-600">Conv Rate: 68%</span>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-green-50"><ShoppingCart size={20} className="text-green-600" /></div>
            <span className="text-xs text-green-600">+8% vs last month</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(4250000)}</p>
          <p className="text-sm text-slate-500">Orders MTD</p>
          <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between text-xs">
            <span className="text-slate-500">Count: 89</span>
            <span className="text-amber-600">Pending: 23</span>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-amber-50"><Truck size={20} className="text-amber-600" /></div>
            <span className="text-xs text-slate-500">On Track</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">67</p>
          <p className="text-sm text-slate-500">Deliveries MTD</p>
          <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between text-xs">
            <span className="text-slate-500">Today: 8</span>
            <span className="text-blue-600">Pending: 12</span>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-purple-50"><Receipt size={20} className="text-purple-600" /></div>
            <span className="text-xs text-green-600">+15% vs last month</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(3850000)}</p>
          <p className="text-sm text-slate-500">Invoiced MTD</p>
          <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between text-xs">
            <span className="text-slate-500">Count: 72</span>
            <span className="text-green-600">Collected: 85%</span>
          </div>
        </Card>
      </div>

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
                  <span className="text-sm text-slate-500">156</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full mt-1">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
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
                  <span className="text-sm text-slate-500">89</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full mt-1">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '57%' }}></div>
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
                  <span className="text-sm text-slate-500">67</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full mt-1">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '43%' }}></div>
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
                  <span className="text-sm text-slate-500">72</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full mt-1">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '46%' }}></div>
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
const CreateDocumentForm = ({ docType, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    bpCode: '', docDate: new Date().toISOString().split('T')[0], validUntilDate: '', deliveryDate: '',
    currency: 'EGP', priceListId: '', paymentTermsCode: 'NET30', warehouseCode: 'WH-CAIRO',
    lines: [{ itemCode: '', description: '', uom: 'PC', quantity: 1, unitPrice: 0 }]
  });

  const addLine = () => {
    setFormData({...formData, lines: [...formData.lines, { itemCode: '', description: '', uom: 'PC', quantity: 1, unitPrice: 0 }]});
  };

  return (
    <div className="space-y-6">
      {/* Header Fields */}
      <div className="grid grid-cols-3 gap-4">
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
        <FormField label="Warehouse">
          <Select value={formData.warehouseCode} onChange={(e) => setFormData({...formData, warehouseCode: e.target.value})}
            options={[
              { value: 'WH-CAIRO', label: 'Cairo Warehouse' },
              { value: 'WH-ALEX', label: 'Alexandria Warehouse' },
              { value: 'WH-10RAM', label: '10th Ramadan Warehouse' },
            ]} />
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
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600">Description</th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-slate-600">UoM</th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-slate-600">Qty</th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-slate-600">Unit Price</th>
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
                    <Input type="number" value={line.unitPrice} onChange={(e) => {
                      const newLines = [...formData.lines];
                      newLines[idx].unitPrice = parseFloat(e.target.value) || 0;
                      setFormData({...formData, lines: newLines});
                    }} className="w-28 text-right" />
                  </td>
                  <td className="px-3 py-2 text-right font-medium">{formatCurrency(line.quantity * line.unitPrice)}</td>
                  <td className="px-3 py-2">
                    <button onClick={() => {
                      const newLines = formData.lines.filter((_, i) => i !== idx);
                      setFormData({...formData, lines: newLines.length ? newLines : [{ itemCode: '', description: '', uom: 'PC', quantity: 1, unitPrice: 0 }]});
                    }} className="p-1 hover:bg-red-50 rounded"><Trash2 size={14} className="text-red-400" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-72 space-y-2">
          <div className="flex justify-between text-sm"><span className="text-slate-500">Subtotal</span><span className="font-medium">{formatCurrency(formData.lines.reduce((sum, l) => sum + l.quantity * l.unitPrice, 0))}</span></div>
          <div className="flex justify-between text-sm"><span className="text-slate-500">Discount</span><span className="font-medium">-{formatCurrency(0)}</span></div>
          <div className="flex justify-between text-sm"><span className="text-slate-500">Tax (14%)</span><span className="font-medium">{formatCurrency(formData.lines.reduce((sum, l) => sum + l.quantity * l.unitPrice, 0) * 0.14)}</span></div>
          <div className="flex justify-between text-lg font-bold border-t pt-2"><span>Total</span><span className="text-blue-600">{formatCurrency(formData.lines.reduce((sum, l) => sum + l.quantity * l.unitPrice, 0) * 1.14)}</span></div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={Save}>Save as Draft</Button>
          <Button icon={Send} onClick={() => onSave(formData)}>Save & Submit</Button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function SalesCorePart1() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createDocType, setCreateDocType] = useState('Quotation');
  const [selectedDocument, setSelectedDocument] = useState(null);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'quotations', label: 'Quotations', badge: '42' },
    { id: 'orders', label: 'Orders', badge: '23', badgeColor: 'bg-green-100 text-green-700' },
    { id: 'deliveries', label: 'Deliveries', badge: '12' },
    { id: 'invoices', label: 'Invoices', badge: '8' },
  ];

  const handleCreateDocument = (docType) => {
    setCreateDocType(docType);
    setShowCreateForm(true);
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
              <h1 className="text-xl font-bold text-slate-900">Sales Core</h1>
              <p className="text-sm text-slate-500">Part 1: Sales Documents & Document Flow</p>
            </div>
          </div>
        </div>
        <div className="px-6">
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'dashboard' && <AllDocumentsDashboard onViewDocument={setSelectedDocument} />}
        {activeTab === 'quotations' && <SalesDocumentsPage docType="Quotation" onCreateDocument={() => handleCreateDocument('Quotation')} onViewDocument={setSelectedDocument} />}
        {activeTab === 'orders' && <SalesDocumentsPage docType="Order" onCreateDocument={() => handleCreateDocument('Order')} onViewDocument={setSelectedDocument} />}
        {activeTab === 'deliveries' && <SalesDocumentsPage docType="Delivery" onCreateDocument={() => handleCreateDocument('Delivery')} onViewDocument={setSelectedDocument} />}
        {activeTab === 'invoices' && <SalesDocumentsPage docType="Invoice" onCreateDocument={() => handleCreateDocument('Invoice')} onViewDocument={setSelectedDocument} />}
      </div>

      {/* Create Document Modal */}
      <Modal isOpen={showCreateForm} onClose={() => setShowCreateForm(false)} title={`Create ${createDocType}`} size="xl">
        <CreateDocumentForm docType={createDocType} onSave={(data) => { console.log(data); setShowCreateForm(false); }} onCancel={() => setShowCreateForm(false)} />
      </Modal>
    </div>
  );
}
