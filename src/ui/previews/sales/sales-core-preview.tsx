'use client';

import React, { useState } from 'react';
import { Plus, Search, Edit, Eye, Check, X, Save, FileText, ShoppingCart, Truck, Receipt, Users, Globe, Store, Briefcase, Tag, BadgePercent, Gift, ArrowRight, DollarSign, Calendar, Send, TrendingUp, Package, CreditCard } from 'lucide-react';

const Tabs = ({ tabs, active, onChange }) => (
  <div className="flex border-b border-slate-200">
    {tabs.map(tab => (
      <button key={tab.id} onClick={() => onChange(tab.id)}
        className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${active === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
        <span className="flex items-center gap-2">{tab.label}{tab.badge && <span className={`px-2 py-0.5 text-xs rounded-full ${tab.badgeColor || 'bg-slate-100'}`}>{tab.badge}</span>}</span>
      </button>
    ))}
  </div>
);

const StatusBadge = ({ status }) => {
  const config = {
    Draft: { bg: 'bg-slate-100', text: 'text-slate-600' },
    Approved: { bg: 'bg-green-50', text: 'text-green-700' },
    Open: { bg: 'bg-blue-50', text: 'text-blue-700' },
    PartiallyDelivered: { bg: 'bg-cyan-50', text: 'text-cyan-700' },
    Delivered: { bg: 'bg-teal-50', text: 'text-teal-700' },
    Invoiced: { bg: 'bg-purple-50', text: 'text-purple-700' },
    Quotation: { bg: 'bg-blue-50', text: 'text-blue-700' },
    Order: { bg: 'bg-green-50', text: 'text-green-700' },
    Delivery: { bg: 'bg-amber-50', text: 'text-amber-700' },
    Invoice: { bg: 'bg-purple-50', text: 'text-purple-700' },
    Active: { bg: 'bg-green-50', text: 'text-green-700' },
    WithinLimit: { bg: 'bg-green-50', text: 'text-green-700' },
  };
  const c = config[status] || config.Draft;
  return (<span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}><span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>{status.replace(/([A-Z])/g, ' $1').trim()}</span>);
};

const SourceBadge = ({ channel }) => {
  const icons = { CRM: Users, POS: Store, Ecommerce: Globe, Service: Package, ICP: Briefcase, Manual: FileText };
  const Icon = icons[channel] || FileText;
  return (<span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded text-xs"><Icon size={12} />{channel}</span>);
};

const Card = ({ children, className = '' }) => (<div className={`bg-white rounded-xl border border-slate-200 ${className}`}>{children}</div>);
const Button = ({ children, variant = 'primary', size = 'md', icon: Icon = null, onClick = () => {} }) => {
  const v = { primary: 'bg-blue-600 text-white hover:bg-blue-700', secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50', success: 'bg-green-600 text-white', warning: 'bg-amber-500 text-white', ghost: 'text-slate-600 hover:bg-slate-100' };
  return (<button onClick={onClick} className={`inline-flex items-center gap-2 font-medium rounded-lg px-4 py-2 text-sm transition-colors ${v[variant]}`}>{Icon && <Icon size={16} />}{children}</button>);
};

const formatCurrency = (amount) => new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(amount);

// Dashboard
const SalesDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-4 gap-4">
      <Card className="p-5">
        <div className="flex items-center justify-between mb-3"><div className="p-2 rounded-lg bg-blue-50"><FileText size={20} className="text-blue-600" /></div><span className="text-xs text-green-600">+12%</span></div>
        <p className="text-2xl font-bold">156</p><p className="text-sm text-slate-500">Quotations</p>
      </Card>
      <Card className="p-5">
        <div className="flex items-center justify-between mb-3"><div className="p-2 rounded-lg bg-green-50"><ShoppingCart size={20} className="text-green-600" /></div><span className="text-xs text-green-600">+8%</span></div>
        <p className="text-2xl font-bold">{formatCurrency(4250000)}</p><p className="text-sm text-slate-500">Orders MTD</p>
      </Card>
      <Card className="p-5">
        <div className="flex items-center justify-between mb-3"><div className="p-2 rounded-lg bg-amber-50"><Truck size={20} className="text-amber-600" /></div></div>
        <p className="text-2xl font-bold">67</p><p className="text-sm text-slate-500">Deliveries MTD</p>
      </Card>
      <Card className="p-5">
        <div className="flex items-center justify-between mb-3"><div className="p-2 rounded-lg bg-purple-50"><Receipt size={20} className="text-purple-600" /></div><span className="text-xs text-green-600">+15%</span></div>
        <p className="text-2xl font-bold">{formatCurrency(3850000)}</p><p className="text-sm text-slate-500">Invoiced MTD</p>
      </Card>
    </div>

    <div className="grid grid-cols-3 gap-6">
      <Card className="p-5">
        <h3 className="font-semibold mb-4">Document Flow</h3>
        <div className="space-y-3">
          {[{ icon: FileText, label: 'Quotations', count: 156, color: 'blue', pct: 100 },
            { icon: ShoppingCart, label: 'Orders', count: 89, color: 'green', pct: 57 },
            { icon: Truck, label: 'Deliveries', count: 67, color: 'amber', pct: 43 },
            { icon: Receipt, label: 'Invoices', count: 72, color: 'purple', pct: 46 }].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-${item.color}-100 flex items-center justify-center`}><item.icon size={18} className={`text-${item.color}-600`} /></div>
              <div className="flex-1">
                <div className="flex justify-between text-sm"><span>{item.label}</span><span className="text-slate-500">{item.count}</span></div>
                <div className="h-2 bg-slate-100 rounded-full mt-1"><div className={`h-full bg-${item.color}-500 rounded-full`} style={{ width: `${item.pct}%` }}></div></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="col-span-2">
        <div className="p-4 border-b flex justify-between items-center"><h3 className="font-semibold">Recent Documents</h3><Button variant="ghost" size="sm">View All</Button></div>
        <div className="divide-y">
          {[{ code: 'INV-2025-001567', type: 'Invoice', customer: 'Delta Electronics', amount: 245000, status: 'Open' },
            { code: 'DL-2025-000892', type: 'Delivery', customer: 'Alexandria Trading', amount: 45000, status: 'Delivered' },
            { code: 'SO-2025-001234', type: 'Order', customer: 'Alexandria Trading', amount: 87500, status: 'PartiallyDelivered' },
            { code: 'QT-2025-001543', type: 'Quotation', customer: 'Giza Supplies', amount: 35000, status: 'Draft' }].map((doc, idx) => (
            <div key={idx} className="px-4 py-3 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center gap-3"><StatusBadge status={doc.type} /><div><p className="font-medium">{doc.code}</p><p className="text-xs text-slate-500">{doc.customer}</p></div></div>
              <div className="text-right"><p className="font-semibold">{formatCurrency(doc.amount)}</p><StatusBadge status={doc.status} /></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

// Sales Orders
const SalesOrdersPage = () => {
  const orders = [
    { code: 'SO-2025-001234', customer: 'Alexandria Trading Co', date: '2025-07-14', total: 87500, status: 'PartiallyDelivered', channel: 'Ecommerce', credit: 'WithinLimit' },
    { code: 'SO-2025-001235', customer: 'Cairo Industries Ltd', date: '2025-07-12', total: 320000, status: 'Invoiced', channel: 'CRM', credit: 'WithinLimit' },
    { code: 'SO-2025-001236', customer: 'Delta Electronics', date: '2025-07-15', total: 156000, status: 'Open', channel: 'Manual', credit: 'WithinLimit' },
  ];
  return (
    <div className="space-y-6">
      <div className="flex justify-between"><div><h2 className="text-lg font-semibold">Sales Orders</h2><p className="text-sm text-slate-500">Manage orders and track delivery status</p></div><Button icon={Plus}>New Order</Button></div>
      <Card>
        <table className="w-full">
          <thead className="bg-slate-50 border-b"><tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Document</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Customer</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Date</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Channel</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Total</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Status</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">Credit</th>
          </tr></thead>
          <tbody className="divide-y">
            {orders.map(o => (
              <tr key={o.code} className="hover:bg-slate-50">
                <td className="px-4 py-3"><p className="font-semibold">{o.code}</p></td>
                <td className="px-4 py-3 text-sm">{o.customer}</td>
                <td className="px-4 py-3 text-sm">{o.date}</td>
                <td className="px-4 py-3 text-center"><SourceBadge channel={o.channel} /></td>
                <td className="px-4 py-3 text-right font-semibold">{formatCurrency(o.total)}</td>
                <td className="px-4 py-3 text-center"><StatusBadge status={o.status} /></td>
                <td className="px-4 py-3 text-center"><StatusBadge status={o.credit} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// Pricing
const PricingPage = () => {
  const priceLists = [
    { code: 'PL-RETAIL', name: 'Retail Price List', currency: 'EGP', items: 1250, isDefault: true },
    { code: 'PL-WHOLESALE', name: 'Wholesale Price List', currency: 'EGP', items: 1250, isDefault: false },
    { code: 'PL-VIP', name: 'VIP Customers', currency: 'EGP', items: 850, isDefault: false },
  ];
  return (
    <div className="space-y-6">
      <div className="flex justify-between"><div><h2 className="text-lg font-semibold">Price Lists</h2><p className="text-sm text-slate-500">Manage pricing by customer segment</p></div><Button icon={Plus}>New Price List</Button></div>
      <div className="grid grid-cols-3 gap-4">
        {priceLists.map(pl => (
          <Card key={pl.code} className={`p-5 ${pl.isDefault ? 'ring-2 ring-blue-500' : ''}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-blue-50"><Tag size={20} className="text-blue-600" /></div>
              <div><div className="flex items-center gap-2"><h3 className="font-semibold">{pl.name}</h3>{pl.isDefault && <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded">Default</span>}</div><p className="text-sm text-slate-500">{pl.code}</p></div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-2 bg-slate-50 rounded"><p className="text-xs text-slate-500">Currency</p><p className="font-semibold">{pl.currency}</p></div>
              <div className="p-2 bg-slate-50 rounded"><p className="text-xs text-slate-500">Items</p><p className="font-semibold">{pl.items}</p></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Promotions
const PromotionsPage = () => {
  const promos = [
    { code: 'PROMO-SUMMER25', name: 'Summer Sale 2025', benefit: '20% OFF', channel: 'All', usages: 1250, active: true },
    { code: 'PROMO-BOGO', name: 'Buy One Get One Free', benefit: 'Free Item', channel: 'POS', usages: 89, active: true },
    { code: 'PROMO-WEB10', name: 'Online Exclusive', benefit: '10% OFF', channel: 'Ecommerce', usages: 3420, active: true },
  ];
  return (
    <div className="space-y-6">
      <div className="flex justify-between"><div><h2 className="text-lg font-semibold">Promotions</h2><p className="text-sm text-slate-500">Time-limited offers and campaigns</p></div><Button icon={Plus}>New Promotion</Button></div>
      <div className="grid grid-cols-3 gap-4">
        {promos.map(p => (
          <Card key={p.code} className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3"><div className="p-3 rounded-lg bg-pink-100"><Gift size={20} className="text-pink-600" /></div><div><h3 className="font-semibold">{p.name}</h3><p className="text-xs text-slate-500">{p.code}</p></div></div>
              <StatusBadge status={p.active ? 'Active' : 'Inactive'} />
            </div>
            <div className="flex items-center justify-between mb-3">
              <div><p className="text-xs text-slate-500">Benefit</p><p className="text-lg font-bold text-green-600">{p.benefit}</p></div>
              <div className="text-right"><p className="text-xs text-slate-500">Usages</p><p className="text-lg font-bold">{p.usages.toLocaleString()}</p></div>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500"><span>Channel:</span><SourceBadge channel={p.channel} /></div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Main
export default function SalesCoreModule() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Sales Orders', badge: '23', badgeColor: 'bg-green-100 text-green-700' },
    { id: 'pricing', label: 'Price Lists' },
    { id: 'promotions', label: 'Promotions', badge: '4', badgeColor: 'bg-pink-100 text-pink-700' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4"><div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-green-100"><ShoppingCart size={24} className="text-green-600" /></div><div><h1 className="text-xl font-bold">Sales Core</h1><p className="text-sm text-slate-500">Sales Documents, Pricing & Promotions</p></div></div></div>
        <div className="px-6"><Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} /></div>
      </div>
      <div className="p-6">
        {activeTab === 'dashboard' && <SalesDashboard />}
        {activeTab === 'orders' && <SalesOrdersPage />}
        {activeTab === 'pricing' && <PricingPage />}
        {activeTab === 'promotions' && <PromotionsPage />}
      </div>
    </div>
  );
}
