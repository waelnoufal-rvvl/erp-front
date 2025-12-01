'use client';

import React, { useState } from 'react';
import { Plus, Search, Edit, Eye, Check, X, Save, Users, DollarSign, RefreshCw, Receipt, Scale, Globe, Flag, CreditCard, BadgePercent, FileCheck, Play, Send, CheckCircle, Clock, Lock, Unlock, Calculator, Package, Tag, XCircle, Loader2 } from 'lucide-react';

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
    VAT: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    WHT: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
    Sales: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    Purchasing: { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
    Open: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    Filed: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    Closed: { bg: 'bg-slate-100', text: 'text-slate-500', dot: 'bg-slate-400' },
    Accepted: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    Pending: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    Rejected: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  };
  const c = config[status] || config.Active;
  return (<span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}><span className={`w-1.5 h-1.5 rounded-full ${c.dot}`}></span>{status}</span>);
};

const Card = ({ children, className = '' }) => (<div className={`bg-white rounded-xl border border-slate-200 ${className}`}>{children}</div>);
const Button = ({ children, variant = 'primary', size = 'md', icon: Icon = null, onClick = () => {} }) => {
  const v = { primary: 'bg-blue-600 text-white hover:bg-blue-700', secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50', success: 'bg-green-600 text-white hover:bg-green-700', ghost: 'text-slate-600 hover:bg-slate-100' };
  const s = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm' };
  return (<button onClick={onClick} className={`inline-flex items-center gap-2 font-medium rounded-lg transition-colors ${v[variant]} ${s[size]}`}>{Icon && <Icon size={size === 'sm' ? 14 : 16} />}{children}</button>);
};

const formatCurrency = (amount) => new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(amount);

// Tax Codes Page
const TaxCodesPage = () => {
  const taxCodes = [
    { code: 'VAT14', name: 'Standard VAT 14%', type: 'VAT', rate: 14, country: 'EG', isInput: true, isOutput: true, sapCode: 'V14' },
    { code: 'VAT0', name: 'Zero-Rated VAT', type: 'VAT', rate: 0, country: 'EG', isInput: true, isOutput: true, sapCode: 'V0' },
    { code: 'EXEMPT', name: 'VAT Exempt', type: 'VAT', rate: 0, country: 'EG', isInput: false, isOutput: true, sapCode: 'VX' },
    { code: 'WHT3', name: 'WHT 3% - Services', type: 'WHT', rate: 3, country: 'EG', isInput: false, isOutput: false, sapCode: 'W3' },
    { code: 'WHT5', name: 'WHT 5% - Contractors', type: 'WHT', rate: 5, country: 'EG', isInput: false, isOutput: false, sapCode: 'W5' },
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-semibold">Tax Codes</h2><p className="text-sm text-slate-500">Configure tax rates and behaviors</p></div>
        <Button icon={Plus}>New Tax Code</Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4"><div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-blue-50"><BadgePercent size={20} className="text-blue-600" /></div><div><p className="text-2xl font-bold">3</p><p className="text-xs text-slate-500">VAT Codes</p></div></div></Card>
        <Card className="p-4"><div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-purple-50"><CreditCard size={20} className="text-purple-600" /></div><div><p className="text-2xl font-bold">2</p><p className="text-xs text-slate-500">WHT Codes</p></div></div></Card>
        <Card className="p-4"><div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-green-50"><Globe size={20} className="text-green-600" /></div><div><p className="text-2xl font-bold">1</p><p className="text-xs text-slate-500">Countries</p></div></div></Card>
        <Card className="p-4"><div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-slate-100"><Receipt size={20} className="text-slate-600" /></div><div><p className="text-2xl font-bold">5</p><p className="text-xs text-slate-500">Total</p></div></div></Card>
      </div>
      <Card>
        <table className="w-full">
          <thead className="bg-slate-50 border-b"><tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Code</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Name</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Type</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Rate</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Direction</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">SAP</th>
          </tr></thead>
          <tbody className="divide-y">
            {taxCodes.map(code => (
              <tr key={code.code} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-mono font-semibold">{code.code}</td>
                <td className="px-4 py-3 text-sm">{code.name}</td>
                <td className="px-4 py-3 text-center"><StatusBadge status={code.type} /></td>
                <td className="px-4 py-3 text-right font-semibold">{code.rate}%</td>
                <td className="px-4 py-3"><div className="flex justify-center gap-1">{code.isInput && <span className="px-2 py-0.5 bg-cyan-100 text-cyan-700 text-xs rounded">In</span>}{code.isOutput && <span className="px-2 py-0.5 bg-pink-100 text-pink-700 text-xs rounded">Out</span>}</div></td>
                <td className="px-4 py-3 text-center"><span className="px-2 py-1 bg-slate-100 text-xs font-mono rounded">{code.sapCode}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// Tax Rules Page
const TaxRulesPage = () => {
  const rules = [
    { id: '1', name: 'Standard Sales VAT', priority: 10, scope: 'Sales', country: 'EG', bpType: 'Customer', taxCode: 'VAT14' },
    { id: '2', name: 'Zero-Rated Exports', priority: 5, scope: 'Sales', country: 'EG', bpType: 'Foreign', taxCode: 'VAT0' },
    { id: '3', name: 'Standard Purchase VAT', priority: 10, scope: 'Purchasing', country: 'EG', bpType: 'Vendor', taxCode: 'VAT14' },
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-semibold">Tax Rules Engine</h2><p className="text-sm text-slate-500">Automatic tax code determination</p></div>
        <div className="flex gap-2"><Button variant="secondary" icon={Play}>Test Rules</Button><Button icon={Plus}>New Rule</Button></div>
      </div>
      <div className="space-y-3">
        {rules.map(rule => (
          <Card key={rule.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center"><span className="font-bold text-slate-600">{rule.priority}</span></div>
                <div>
                  <div className="flex items-center gap-2 mb-1"><h3 className="font-semibold">{rule.name}</h3><StatusBadge status={rule.scope} /></div>
                  <div className="flex gap-2 text-xs">
                    <span className="px-2 py-1 bg-slate-100 rounded flex items-center gap-1"><Globe size={12} />{rule.country}</span>
                    <span className="px-2 py-1 bg-slate-100 rounded flex items-center gap-1"><Users size={12} />{rule.bpType}</span>
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 font-mono text-sm rounded-lg font-semibold">{rule.taxCode}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Tax Periods Page
const TaxPeriodsPage = () => {
  const periods = [
    { period: 7, year: 2025, status: 'Closed', outputTax: 350000, inputTax: 168000, netPayable: 182000 },
    { period: 8, year: 2025, status: 'Filed', outputTax: 392000, inputTax: 189000, netPayable: 203000 },
    { period: 9, year: 2025, status: 'Open', outputTax: 371000, inputTax: 179200, netPayable: 191800 },
  ];
  const getIcon = (s) => s === 'Closed' ? <Lock size={16} className="text-slate-400" /> : s === 'Filed' ? <Send size={16} className="text-blue-500" /> : <Unlock size={16} className="text-green-500" />;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-semibold">Tax Periods & Returns</h2><p className="text-sm text-slate-500">VAT returns and filing</p></div>
        <Button variant="secondary" icon={RefreshCw}>Recalculate</Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4"><p className="text-xs text-slate-500">YTD Output Tax</p><p className="text-2xl font-bold">{formatCurrency(1113000)}</p></Card>
        <Card className="p-4"><p className="text-xs text-slate-500">YTD Input Tax</p><p className="text-2xl font-bold">{formatCurrency(536200)}</p></Card>
        <Card className="p-4"><p className="text-xs text-slate-500">YTD Net Payable</p><p className="text-2xl font-bold text-blue-600">{formatCurrency(576800)}</p></Card>
        <Card className="p-4"><p className="text-xs text-slate-500">Pending Returns</p><p className="text-2xl font-bold text-amber-600">1</p></Card>
      </div>
      <Card>
        <table className="w-full">
          <thead className="bg-slate-50 border-b"><tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Period</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Status</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Output Tax</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Input Tax</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Net Payable</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Actions</th>
          </tr></thead>
          <tbody className="divide-y">
            {periods.map(p => (
              <tr key={p.period} className="hover:bg-slate-50">
                <td className="px-4 py-3"><div className="flex items-center gap-2">{getIcon(p.status)}<span className="font-semibold">P{p.period} / {p.year}</span></div></td>
                <td className="px-4 py-3 text-center"><StatusBadge status={p.status} /></td>
                <td className="px-4 py-3 text-right font-semibold text-pink-600">{formatCurrency(p.outputTax)}</td>
                <td className="px-4 py-3 text-right font-semibold text-cyan-600">{formatCurrency(p.inputTax)}</td>
                <td className="px-4 py-3 text-right font-bold text-blue-600">{formatCurrency(p.netPayable)}</td>
                <td className="px-4 py-3 text-center"><Button variant="ghost" size="sm" icon={Eye}>View</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// E-Invoicing Page
const EInvoicingPage = () => {
  const docs = [
    { docNumber: 'INV-2025-1542', customer: 'Cairo Industries', amount: 125000, status: 'Accepted', externalId: 'ETA-8547215' },
    { docNumber: 'INV-2025-1543', customer: 'Alexandria Trading', amount: 87500, status: 'Accepted', externalId: 'ETA-8547216' },
    { docNumber: 'CN-2025-0089', customer: 'Giza Supplies', amount: 15000, status: 'Pending', externalId: null },
    { docNumber: 'INV-2025-1544', customer: 'Delta Electronics', amount: 245000, status: 'Rejected', externalId: null },
  ];
  const getIcon = (s) => s === 'Accepted' ? <CheckCircle size={16} className="text-green-500" /> : s === 'Rejected' ? <XCircle size={16} className="text-red-500" /> : <Clock size={16} className="text-amber-500" />;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-semibold">E-Invoicing</h2><p className="text-sm text-slate-500">Electronic invoice submission</p></div>
        <Button icon={Send}>Submit Pending</Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4"><div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-green-50"><CheckCircle size={20} className="text-green-600" /></div><div><p className="text-2xl font-bold">2</p><p className="text-xs text-slate-500">Accepted</p></div></div></Card>
        <Card className="p-4"><div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-amber-50"><Clock size={20} className="text-amber-600" /></div><div><p className="text-2xl font-bold">1</p><p className="text-xs text-slate-500">Pending</p></div></div></Card>
        <Card className="p-4"><div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-red-50"><XCircle size={20} className="text-red-600" /></div><div><p className="text-2xl font-bold">1</p><p className="text-xs text-slate-500">Rejected</p></div></div></Card>
        <Card className="p-4"><div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-slate-100"><Receipt size={20} className="text-slate-600" /></div><div><p className="text-2xl font-bold">4</p><p className="text-xs text-slate-500">Total</p></div></div></Card>
      </div>
      <Card>
        <table className="w-full">
          <thead className="bg-slate-50 border-b"><tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Document</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Customer</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Amount</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Status</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">External ID</th>
          </tr></thead>
          <tbody className="divide-y">
            {docs.map(d => (
              <tr key={d.docNumber} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold">{d.docNumber}</td>
                <td className="px-4 py-3 text-sm">{d.customer}</td>
                <td className="px-4 py-3 text-right font-semibold">{formatCurrency(d.amount)}</td>
                <td className="px-4 py-3"><div className="flex items-center justify-center gap-2">{getIcon(d.status)}<StatusBadge status={d.status} /></div></td>
                <td className="px-4 py-3 text-sm text-blue-600">{d.externalId || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// Main Component
export default function TaxComplianceModule() {
  const [activeTab, setActiveTab] = useState('codes');
  const tabs = [{ id: 'codes', label: 'Tax Codes', badge: '5' }, { id: 'rules', label: 'Tax Rules', badge: '3' }, { id: 'periods', label: 'Tax Periods' }, { id: 'einvoicing', label: 'E-Invoicing', badge: '4' }];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4"><div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-emerald-100"><Receipt size={24} className="text-emerald-600" /></div><div><h1 className="text-xl font-bold">Tax & Compliance</h1><p className="text-sm text-slate-500">8.5 - Tax Rules, Periods & E-Invoicing</p></div></div></div>
        <div className="px-6"><Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} /></div>
      </div>
      <div className="p-6">
        {activeTab === 'codes' && <TaxCodesPage />}
        {activeTab === 'rules' && <TaxRulesPage />}
        {activeTab === 'periods' && <TaxPeriodsPage />}
        {activeTab === 'einvoicing' && <EInvoicingPage />}
      </div>
    </div>
  );
}
