'use client';

import React, { useState } from 'react';
import { Plus, Search, Edit, Eye, Check, X, Save, Box, MapPin, Factory, Car, Monitor, Building2, TrendingDown, DollarSign, Clock, CheckCircle, Play, Send, Trash2, Download, Calculator, Package, Calendar, Tag, RefreshCw } from 'lucide-react';

const Tabs = ({ tabs, active, onChange }) => (
  <div className="flex border-b border-slate-200">
    {tabs.map(tab => (
      <button key={tab.id} onClick={() => onChange(tab.id)}
        className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${active === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
        <span className="flex items-center gap-2">{tab.label}{tab.badge && <span className="px-2 py-0.5 text-xs rounded-full bg-slate-100">{tab.badge}</span>}</span>
      </button>
    ))}
  </div>
);

const StatusBadge = ({ status }) => {
  const config = {
    Active: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    Draft: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    Disposed: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
    FullyDepreciated: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
    Approved: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    Submitted: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    PostedToSap: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
    LOCAL: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  };
  const c = config[status] || config.Active;
  return (<span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}><span className={`w-1.5 h-1.5 rounded-full ${c.dot}`}></span>{status}</span>);
};

const Card = ({ children, className = '' }) => (<div className={`bg-white rounded-xl border border-slate-200 ${className}`}>{children}</div>);
const Button = ({ children, variant = 'primary', size = 'md', icon: Icon = null, onClick = () => {} }) => {
  const v = { primary: 'bg-blue-600 text-white hover:bg-blue-700', secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50', success: 'bg-green-600 text-white hover:bg-green-700', danger: 'bg-red-600 text-white hover:bg-red-700', ghost: 'text-slate-600 hover:bg-slate-100' };
  const s = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm' };
  return (<button onClick={onClick} className={`inline-flex items-center gap-2 font-medium rounded-lg transition-colors ${v[variant]} ${s[size]}`}>{Icon && <Icon size={size === 'sm' ? 14 : 16} />}{children}</button>);
};

const formatCurrency = (amount) => new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(amount);

// Asset Register
const AssetRegisterPage = () => {
  const assets = [
    { assetNumber: 'FA-2023-000050', description: 'CNC Machine Model X500', classCode: 'MACH', location: 'FACTORY-1', acquisitionCost: 480000, nbv: 288000, status: 'Active' },
    { assetNumber: 'FA-2023-000051', description: 'Forklift Toyota 8FGU25', classCode: 'VEH', location: 'FACTORY-1', acquisitionCost: 350000, nbv: 218750, status: 'Active' },
    { assetNumber: 'FA-2024-000112', description: 'Dell PowerEdge R750 Server', classCode: 'IT', location: 'HQ-CAIRO', acquisitionCost: 125000, nbv: 83333, status: 'Active' },
    { assetNumber: 'FA-2021-000025', description: 'Executive Office Furniture', classCode: 'FURN', location: 'HQ-CAIRO', acquisitionCost: 85000, nbv: 0, status: 'FullyDepreciated' },
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-semibold">Asset Register</h2><p className="text-sm text-slate-500">Complete list of fixed assets</p></div>
        <div className="flex gap-2"><Button variant="secondary" icon={RefreshCw}>Sync SAP</Button><Button icon={Plus}>New Asset</Button></div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4"><p className="text-xs text-slate-500">Total Assets</p><p className="text-2xl font-bold">546</p></Card>
        <Card className="p-4"><p className="text-xs text-slate-500">Active</p><p className="text-2xl font-bold text-green-600">498</p></Card>
        <Card className="p-4"><p className="text-xs text-slate-500">Total Cost</p><p className="text-2xl font-bold">{formatCurrency(125000000)}</p></Card>
        <Card className="p-4"><p className="text-xs text-slate-500">Net Book Value</p><p className="text-2xl font-bold text-blue-600">{formatCurrency(89740000)}</p></Card>
      </div>
      <Card>
        <table className="w-full">
          <thead className="bg-slate-50 border-b"><tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Asset</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Class</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Location</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Cost</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">NBV</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Status</th>
          </tr></thead>
          <tbody className="divide-y">
            {assets.map(a => (
              <tr key={a.assetNumber} className="hover:bg-slate-50">
                <td className="px-4 py-3"><p className="font-semibold">{a.assetNumber}</p><p className="text-xs text-slate-500">{a.description}</p></td>
                <td className="px-4 py-3"><span className="px-2 py-1 bg-slate-100 text-xs rounded">{a.classCode}</span></td>
                <td className="px-4 py-3 text-sm">{a.location}</td>
                <td className="px-4 py-3 text-right font-medium">{formatCurrency(a.acquisitionCost)}</td>
                <td className="px-4 py-3 text-right font-semibold text-blue-600">{formatCurrency(a.nbv)}</td>
                <td className="px-4 py-3 text-center"><StatusBadge status={a.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// Acquisition Requests
const AcquisitionRequestsPage = () => {
  const requests = [
    { requestNumber: 'AR-2025-00045', description: 'New CNC Machine for Production', assetClass: 'Machinery', estimatedCost: 650000, requestedBy: 'Ahmed Hassan', status: 'Approved' },
    { requestNumber: 'AR-2025-00046', description: 'IT Server Upgrade', assetClass: 'IT Equipment', estimatedCost: 280000, requestedBy: 'Sara Mohamed', status: 'Submitted' },
    { requestNumber: 'AR-2025-00047', description: 'Delivery Truck', assetClass: 'Vehicles', estimatedCost: 850000, requestedBy: 'Omar Ali', status: 'Draft' },
  ];
  const getIcon = (s) => s === 'Approved' ? <CheckCircle size={16} className="text-green-500" /> : s === 'Submitted' ? <Send size={16} className="text-blue-500" /> : <Clock size={16} className="text-amber-500" />;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-semibold">Acquisition Requests</h2><p className="text-sm text-slate-500">CapEx approval workflow</p></div>
        <Button icon={Plus}>New Request</Button>
      </div>
      <div className="space-y-3">
        {requests.map(r => (
          <Card key={r.requestNumber} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${r.status === 'Approved' ? 'bg-green-50' : r.status === 'Submitted' ? 'bg-blue-50' : 'bg-amber-50'}`}>{getIcon(r.status)}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1"><span className="font-semibold">{r.requestNumber}</span><StatusBadge status={r.status} /></div>
                  <p className="text-sm text-slate-600">{r.description}</p>
                  <div className="flex gap-3 mt-1 text-xs text-slate-500"><span className="flex items-center gap-1"><Tag size={12} />{r.assetClass}</span><span>{r.requestedBy}</span></div>
                </div>
              </div>
              <p className="text-xl font-bold">{formatCurrency(r.estimatedCost)}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Depreciation Runs
const DepreciationRunsPage = () => {
  const runs = [
    { period: '2025-07', bookCode: 'LOCAL', status: 'PostedToSap', assetCount: 485, totalDepr: 1250000, sapRef: 'DepRun-2025-07' },
    { period: '2025-06', bookCode: 'LOCAL', status: 'PostedToSap', assetCount: 482, totalDepr: 1245000, sapRef: 'DepRun-2025-06' },
    { period: '2025-08', bookCode: 'LOCAL', status: 'Completed', assetCount: 488, totalDepr: 1258000, sapRef: null },
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-semibold">Depreciation Runs</h2><p className="text-sm text-slate-500">Batch depreciation calculation</p></div>
        <div className="flex gap-2"><Button variant="secondary" icon={Calculator}>Preview</Button><Button icon={Play}>New Run</Button></div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4"><p className="text-xs text-slate-500">YTD Depreciation</p><p className="text-2xl font-bold">{formatCurrency(8750000)}</p></Card>
        <Card className="p-4"><p className="text-xs text-slate-500">Monthly Average</p><p className="text-2xl font-bold">{formatCurrency(1250000)}</p></Card>
        <Card className="p-4"><p className="text-xs text-slate-500">Posted Runs</p><p className="text-2xl font-bold text-purple-600">12</p></Card>
        <Card className="p-4"><p className="text-xs text-slate-500">Pending</p><p className="text-2xl font-bold text-amber-600">2</p></Card>
      </div>
      <Card>
        <table className="w-full">
          <thead className="bg-slate-50 border-b"><tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Period</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Book</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Status</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Assets</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Total Depr</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">SAP Ref</th>
          </tr></thead>
          <tbody className="divide-y">
            {runs.map(r => (
              <tr key={r.period + r.bookCode} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold">{r.period}</td>
                <td className="px-4 py-3 text-center"><StatusBadge status={r.bookCode} /></td>
                <td className="px-4 py-3 text-center"><StatusBadge status={r.status} /></td>
                <td className="px-4 py-3 text-right font-medium">{r.assetCount}</td>
                <td className="px-4 py-3 text-right font-semibold">{formatCurrency(r.totalDepr)}</td>
                <td className="px-4 py-3 text-blue-600">{r.sapRef || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// Asset Classes
const AssetClassesPage = () => {
  const classes = [
    { code: 'MACH', name: 'Machinery & Equipment', life: 60, method: 'Straight Line', assetCount: 45, icon: <Factory size={24} className="text-blue-600" />, color: 'bg-blue-50' },
    { code: 'VEH', name: 'Vehicles', life: 48, method: 'Straight Line', assetCount: 28, icon: <Car size={24} className="text-green-600" />, color: 'bg-green-50' },
    { code: 'IT', name: 'IT Equipment', life: 36, method: 'Straight Line', assetCount: 312, icon: <Monitor size={24} className="text-purple-600" />, color: 'bg-purple-50' },
    { code: 'BLDG', name: 'Buildings', life: 480, method: 'Straight Line', assetCount: 3, icon: <Building2 size={24} className="text-slate-600" />, color: 'bg-slate-100' },
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-semibold">Asset Classes</h2><p className="text-sm text-slate-500">Default depreciation settings</p></div>
        <Button icon={Plus}>New Class</Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {classes.map(c => (
          <Card key={c.code} className="p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-lg ${c.color}`}>{c.icon}</div>
              <div><h3 className="font-semibold">{c.name}</h3><p className="text-sm text-slate-500">{c.code}</p></div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="p-2 bg-slate-50 rounded"><p className="text-xs text-slate-500">Life</p><p className="font-semibold">{c.life} mo</p></div>
              <div className="p-2 bg-slate-50 rounded"><p className="text-xs text-slate-500">Method</p><p className="font-semibold text-xs">{c.method}</p></div>
              <div className="p-2 bg-slate-50 rounded"><p className="text-xs text-slate-500">Assets</p><p className="font-semibold">{c.assetCount}</p></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Main Component
export default function FixedAssetsModule() {
  const [activeTab, setActiveTab] = useState('register');
  const tabs = [{ id: 'register', label: 'Asset Register', badge: '546' }, { id: 'requests', label: 'Acquisition Requests', badge: '2' }, { id: 'depreciation', label: 'Depreciation Runs' }, { id: 'classes', label: 'Asset Classes' }];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4"><div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-indigo-100"><Box size={24} className="text-indigo-600" /></div><div><h1 className="text-xl font-bold">Fixed Assets</h1><p className="text-sm text-slate-500">8.6 - Asset Management & Depreciation</p></div></div></div>
        <div className="px-6"><Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} /></div>
      </div>
      <div className="p-6">
        {activeTab === 'register' && <AssetRegisterPage />}
        {activeTab === 'requests' && <AcquisitionRequestsPage />}
        {activeTab === 'depreciation' && <DepreciationRunsPage />}
        {activeTab === 'classes' && <AssetClassesPage />}
      </div>
    </div>
  );
}
