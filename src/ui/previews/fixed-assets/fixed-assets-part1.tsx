'use client';

import React, { useState } from 'react';
import {
  ChevronRight, ChevronDown, Plus, Search, Filter, Download, Upload, RefreshCw,
  MoreHorizontal, Edit, Trash2, Eye, Copy, Check, X, AlertCircle, CheckCircle,
  Wallet, Calendar, DollarSign, Settings, Layers, Target, Shield, Clock,
  ChevronLeft, Save, FileText, Link2, Database, ArrowRight, Percent, Building,
  Hash, Activity, Box, MapPin, Truck, Factory, Monitor, HardDrive, Cpu,
  Package, Wrench, Car, Building2, Warehouse, Tag, Grid3X3, BarChart3,
  TrendingDown, CircleDollarSign, FileSpreadsheet, QrCode
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
    Suspended: { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
    Disposed: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
    FullyDepreciated: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
    StraightLine: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    DecliningBalance: { bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-500' },
    NoDepreciation: { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
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

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 cursor-pointer">
    <input type="checkbox" checked={checked} onChange={onChange} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
    <span className="text-sm text-slate-700">{label}</span>
  </label>
);

const formatCurrency = (amount, currency = 'EGP') => new Intl.NumberFormat('en-EG', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);

// ============================================================
// ASSET CLASSES PAGE
// ============================================================
const AssetClassesPage = ({ onCreateClass }) => {
  const assetClasses = [
    { id: '1', code: 'MACH', name: 'Machinery & Equipment', description: 'Production machinery, CNC machines, industrial equipment', defaultLife: 60, residualPercent: 5, deprMethod: 'StraightLine', deprKey: 'MACH-SL', assetCount: 45, totalValue: 12500000 },
    { id: '2', code: 'VEH', name: 'Vehicles', description: 'Company cars, trucks, forklifts', defaultLife: 48, residualPercent: 10, deprMethod: 'StraightLine', deprKey: 'VEH-SL', assetCount: 28, totalValue: 4200000 },
    { id: '3', code: 'FURN', name: 'Furniture & Fixtures', description: 'Office furniture, fixtures, partitions', defaultLife: 84, residualPercent: 0, deprMethod: 'StraightLine', deprKey: 'FURN-SL', assetCount: 156, totalValue: 890000 },
    { id: '4', code: 'IT', name: 'IT Equipment', description: 'Computers, servers, network equipment', defaultLife: 36, residualPercent: 0, deprMethod: 'StraightLine', deprKey: 'IT-SL', assetCount: 312, totalValue: 2150000 },
    { id: '5', code: 'BLDG', name: 'Buildings', description: 'Office buildings, warehouses, factories', defaultLife: 480, residualPercent: 20, deprMethod: 'StraightLine', deprKey: 'BLDG-SL', assetCount: 3, totalValue: 45000000 },
    { id: '6', code: 'LAND', name: 'Land', description: 'Land parcels (non-depreciable)', defaultLife: 0, residualPercent: 100, deprMethod: 'NoDepreciation', deprKey: null, assetCount: 2, totalValue: 25000000 },
  ];

  const getClassIcon = (code) => {
    switch (code) {
      case 'MACH': return <Factory size={24} className="text-blue-600" />;
      case 'VEH': return <Car size={24} className="text-green-600" />;
      case 'FURN': return <Package size={24} className="text-amber-600" />;
      case 'IT': return <Monitor size={24} className="text-purple-600" />;
      case 'BLDG': return <Building2 size={24} className="text-slate-600" />;
      case 'LAND': return <MapPin size={24} className="text-emerald-600" />;
      default: return <Box size={24} className="text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Asset Classes</h2>
          <p className="text-sm text-slate-500">Define categories with default depreciation settings</p>
        </div>
        <Button icon={Plus} onClick={onCreateClass}>New Asset Class</Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50"><Grid3X3 size={20} className="text-blue-600" /></div>
            <div><p className="text-2xl font-bold text-slate-900">6</p><p className="text-xs text-slate-500">Asset Classes</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-50"><Box size={20} className="text-green-600" /></div>
            <div><p className="text-2xl font-bold text-slate-900">546</p><p className="text-xs text-slate-500">Total Assets</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-50"><CircleDollarSign size={20} className="text-purple-600" /></div>
            <div><p className="text-2xl font-bold text-slate-900">{formatCurrency(89740000)}</p><p className="text-xs text-slate-500">Total Book Value</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-50"><TrendingDown size={20} className="text-amber-600" /></div>
            <div><p className="text-2xl font-bold text-slate-900">5</p><p className="text-xs text-slate-500">Depreciating</p></div>
          </div>
        </Card>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-2 gap-4">
        {assetClasses.map(cls => (
          <Card key={cls.id} className="hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${
                    cls.code === 'MACH' ? 'bg-blue-50' :
                    cls.code === 'VEH' ? 'bg-green-50' :
                    cls.code === 'FURN' ? 'bg-amber-50' :
                    cls.code === 'IT' ? 'bg-purple-50' :
                    cls.code === 'BLDG' ? 'bg-slate-100' : 'bg-emerald-50'
                  }`}>
                    {getClassIcon(cls.code)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{cls.name}</h3>
                    <p className="text-sm text-slate-500">{cls.code}</p>
                  </div>
                </div>
                <StatusBadge status="Active" />
              </div>

              <p className="text-sm text-slate-600 mb-4">{cls.description}</p>

              <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500">Useful Life</p>
                  <p className="font-semibold">{cls.defaultLife > 0 ? `${cls.defaultLife} months` : 'N/A'}</p>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500">Residual %</p>
                  <p className="font-semibold">{cls.residualPercent}%</p>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500">Method</p>
                  <p className="font-semibold text-xs">{cls.deprMethod === 'StraightLine' ? 'Straight Line' : cls.deprMethod === 'NoDepreciation' ? 'None' : cls.deprMethod}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-slate-600">
                    <Box size={14} /> {cls.assetCount} assets
                  </span>
                  <span className="flex items-center gap-1 text-slate-600">
                    <DollarSign size={14} /> {formatCurrency(cls.totalValue)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" icon={Edit}>Edit</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// ASSET LOCATIONS PAGE
// ============================================================
const AssetLocationsPage = ({ onCreateLocation }) => {
  const locations = [
    { id: '1', code: 'HQ-CAIRO', name: 'Headquarters - Cairo', address: '123 Tahrir Square', city: 'Cairo', country: 'Egypt', assetCount: 245, isActive: true },
    { id: '2', code: 'FACTORY-1', name: 'Main Factory', address: '10th of Ramadan Industrial Zone', city: '10th of Ramadan', country: 'Egypt', assetCount: 156, isActive: true },
    { id: '3', code: 'FACTORY-2', name: 'Secondary Factory', address: '6th of October Industrial Zone', city: '6th of October', country: 'Egypt', assetCount: 89, isActive: true },
    { id: '4', code: 'WH-ALEX', name: 'Alexandria Warehouse', address: 'El Amreya Port Area', city: 'Alexandria', country: 'Egypt', assetCount: 34, isActive: true },
    { id: '5', code: 'BRANCH-ALEX', name: 'Alexandria Branch', address: 'Stanley Bay', city: 'Alexandria', country: 'Egypt', assetCount: 22, isActive: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Asset Locations</h2>
          <p className="text-sm text-slate-500">Physical and logical locations for asset tracking</p>
        </div>
        <Button icon={Plus} onClick={onCreateLocation}>New Location</Button>
      </div>

      {/* Locations Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Code</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Address</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">City</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Assets</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {locations.map(loc => (
                <tr key={loc.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-slate-400" />
                      <span className="font-mono font-semibold text-slate-900">{loc.code}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{loc.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{loc.address}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{loc.city}, {loc.country}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded">{loc.assetCount}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={loc.isActive ? 'Active' : 'Inactive'} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1.5 hover:bg-slate-100 rounded"><Eye size={14} className="text-slate-400" /></button>
                      <button className="p-1.5 hover:bg-slate-100 rounded"><Edit size={14} className="text-slate-400" /></button>
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
// ASSET REGISTER PAGE (ASSET MASTER LIST)
// ============================================================
const AssetRegisterPage = ({ onCreateAsset, onViewAsset }) => {
  const [filterClass, setFilterClass] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const assets = [
    { id: '1', assetNumber: 'FA-2023-000050', description: 'CNC Machine Model X500', classCode: 'MACH', className: 'Machinery', location: 'FACTORY-1', costCenter: 'PROD-01', acquisitionDate: '2023-03-15', acquisitionCost: 480000, accumulatedDepr: 192000, nbv: 288000, status: 'Active', sapCode: 'FA000234' },
    { id: '2', assetNumber: 'FA-2023-000051', description: 'Forklift Toyota 8FGU25', classCode: 'VEH', className: 'Vehicles', location: 'FACTORY-1', costCenter: 'WH-01', acquisitionDate: '2023-05-20', acquisitionCost: 350000, accumulatedDepr: 131250, nbv: 218750, status: 'Active', sapCode: 'FA000235' },
    { id: '3', assetNumber: 'FA-2024-000112', description: 'Dell PowerEdge R750 Server', classCode: 'IT', className: 'IT Equipment', location: 'HQ-CAIRO', costCenter: 'IT-01', acquisitionDate: '2024-01-10', acquisitionCost: 125000, accumulatedDepr: 41667, nbv: 83333, status: 'Active', sapCode: 'FA000312' },
    { id: '4', assetNumber: 'FA-2021-000025', description: 'Executive Office Furniture Set', classCode: 'FURN', className: 'Furniture', location: 'HQ-CAIRO', costCenter: 'ADMIN-01', acquisitionDate: '2021-08-01', acquisitionCost: 85000, accumulatedDepr: 85000, nbv: 0, status: 'FullyDepreciated', sapCode: 'FA000125' },
    { id: '5', assetNumber: 'FA-2020-000010', description: 'Factory Building - 10th Ramadan', classCode: 'BLDG', className: 'Buildings', location: 'FACTORY-1', costCenter: 'PROD-01', acquisitionDate: '2020-01-01', acquisitionCost: 25000000, accumulatedDepr: 2500000, nbv: 22500000, status: 'Active', sapCode: 'FA000010' },
    { id: '6', assetNumber: 'FA-2022-000080', description: 'Company Car - Toyota Camry', classCode: 'VEH', className: 'Vehicles', location: 'HQ-CAIRO', costCenter: 'SALES-01', acquisitionDate: '2022-06-15', acquisitionCost: 650000, accumulatedDepr: 650000, nbv: 0, status: 'Disposed', sapCode: 'FA000180' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-600';
      case 'FullyDepreciated': return 'text-purple-600';
      case 'Disposed': return 'text-red-600';
      case 'Draft': return 'text-amber-600';
      default: return 'text-slate-600';
    }
  };

  const filteredAssets = assets.filter(asset => {
    if (filterClass !== 'all' && asset.classCode !== filterClass) return false;
    if (filterStatus !== 'all' && asset.status !== filterStatus) return false;
    if (searchTerm && !asset.assetNumber.toLowerCase().includes(searchTerm.toLowerCase()) && !asset.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Asset Register</h2>
          <p className="text-sm text-slate-500">Complete list of all fixed assets</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={Download}>Export</Button>
          <Button variant="secondary" icon={RefreshCw}>Sync SAP</Button>
          <Button icon={Plus} onClick={onCreateAsset}>New Asset</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-5 gap-4">
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Total Assets</p>
          <p className="text-2xl font-bold text-slate-900">546</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Active</p>
          <p className="text-2xl font-bold text-green-600">498</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Fully Depreciated</p>
          <p className="text-2xl font-bold text-purple-600">32</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Total Cost</p>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(125000000)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Net Book Value</p>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(89740000)}</p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search assets..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm" />
        </div>
        <Select value={filterClass} onChange={(e) => setFilterClass(e.target.value)} className="w-40"
          options={[
            { value: 'all', label: 'All Classes' },
            { value: 'MACH', label: 'Machinery' },
            { value: 'VEH', label: 'Vehicles' },
            { value: 'FURN', label: 'Furniture' },
            { value: 'IT', label: 'IT Equipment' },
            { value: 'BLDG', label: 'Buildings' },
          ]} />
        <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-40"
          options={[
            { value: 'all', label: 'All Status' },
            { value: 'Active', label: 'Active' },
            { value: 'FullyDepreciated', label: 'Fully Depreciated' },
            { value: 'Disposed', label: 'Disposed' },
            { value: 'Draft', label: 'Draft' },
          ]} />
      </div>

      {/* Assets Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Asset</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Class</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Location</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Acquired</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Cost</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Accum. Depr</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">NBV</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAssets.map(asset => (
                <tr key={asset.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-900">{asset.assetNumber}</p>
                    <p className="text-xs text-slate-500">{asset.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">{asset.classCode}</span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-slate-900">{asset.location}</p>
                    <p className="text-xs text-slate-500">{asset.costCenter}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{asset.acquisitionDate}</td>
                  <td className="px-4 py-3 text-right font-medium text-slate-900">{formatCurrency(asset.acquisitionCost)}</td>
                  <td className="px-4 py-3 text-right text-sm text-slate-600">{formatCurrency(asset.accumulatedDepr)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-blue-600">{formatCurrency(asset.nbv)}</td>
                  <td className="px-4 py-3 text-center"><StatusBadge status={asset.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => onViewAsset(asset)} className="p-1.5 hover:bg-slate-100 rounded"><Eye size={14} className="text-slate-400" /></button>
                      <button className="p-1.5 hover:bg-slate-100 rounded"><Edit size={14} className="text-slate-400" /></button>
                      <button className="p-1.5 hover:bg-slate-100 rounded"><QrCode size={14} className="text-slate-400" /></button>
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
// ASSET DETAIL VIEW
// ============================================================
const AssetDetailView = ({ asset, onClose }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{asset?.assetNumber || 'FA-2023-000050'}</h2>
          <p className="text-slate-500">{asset?.description || 'CNC Machine Model X500'}</p>
        </div>
        <StatusBadge status={asset?.status || 'Active'} />
      </div>

      {/* Main Info */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="p-4">
          <h3 className="font-semibold text-slate-900 mb-3">Asset Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">Asset Class</span><span className="font-medium">{asset?.className || 'Machinery'}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Serial Number</span><span className="font-medium">SN-X500-2023-001</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Location</span><span className="font-medium">{asset?.location || 'FACTORY-1'}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Cost Center</span><span className="font-medium">{asset?.costCenter || 'PROD-01'}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">SAP Asset Code</span><span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded">{asset?.sapCode || 'FA000234'}</span></div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold text-slate-900 mb-3">Financial Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">Acquisition Cost</span><span className="font-medium">{formatCurrency(asset?.acquisitionCost || 480000)}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Residual Value</span><span className="font-medium">{formatCurrency(24000)}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Accumulated Depr</span><span className="font-medium text-amber-600">{formatCurrency(asset?.accumulatedDepr || 192000)}</span></div>
            <div className="flex justify-between border-t pt-2 mt-2"><span className="font-medium text-slate-700">Net Book Value</span><span className="font-bold text-blue-600">{formatCurrency(asset?.nbv || 288000)}</span></div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold text-slate-900 mb-3">Depreciation</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">Method</span><span className="font-medium">Straight Line</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Useful Life</span><span className="font-medium">60 months</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Remaining Life</span><span className="font-medium">36 months</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Monthly Depr</span><span className="font-medium">{formatCurrency(7600)}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Depr Start</span><span className="font-medium">2023-04-01</span></div>
          </div>
        </Card>
      </div>

      {/* Depreciation Progress */}
      <Card className="p-4">
        <h3 className="font-semibold text-slate-900 mb-3">Depreciation Progress</h3>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-500">40% depreciated</span>
          <span className="text-slate-500">24 of 60 months</span>
        </div>
        <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full" style={{ width: '40%' }}></div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={Truck}>Transfer</Button>
          <Button variant="secondary" icon={TrendingDown}>Revalue</Button>
          <Button variant="danger" icon={Trash2}>Dispose</Button>
        </div>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function FixedAssetsPart1() {
  const [activeTab, setActiveTab] = useState('register');
  const [showAssetDetail, setShowAssetDetail] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const tabs = [
    { id: 'register', label: 'Asset Register', badge: '546' },
    { id: 'classes', label: 'Asset Classes', badge: '6' },
    { id: 'locations', label: 'Locations', badge: '5' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-100">
              <Box size={24} className="text-indigo-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Fixed Assets</h1>
              <p className="text-sm text-slate-500">Part 1: Asset Master, Classes & Locations</p>
            </div>
          </div>
        </div>
        <div className="px-6">
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'register' && (
          <AssetRegisterPage
            onCreateAsset={() => {}}
            onViewAsset={(asset) => { setSelectedAsset(asset); setShowAssetDetail(true); }}
          />
        )}
        {activeTab === 'classes' && <AssetClassesPage onCreateClass={() => {}} />}
        {activeTab === 'locations' && <AssetLocationsPage onCreateLocation={() => {}} />}
      </div>

      {/* Modals */}
      <Modal isOpen={showAssetDetail} onClose={() => setShowAssetDetail(false)} title="Asset Details" size="lg">
        <AssetDetailView asset={selectedAsset} onClose={() => setShowAssetDetail(false)} />
      </Modal>
    </div>
  );
}
