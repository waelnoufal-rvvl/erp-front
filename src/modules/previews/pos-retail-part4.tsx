'use client';

// ============================================================
// POS / Retail - Part 4: Module Preview & Navigation
// Multi-Tenant ERP System with SAP Business One Integration
// ============================================================

import React, { useState } from 'react';
import {
  ShoppingCart, Store, Monitor, Users, Package, Receipt, Wallet,
  Tag, Database, ChevronRight, BarChart3, TrendingUp,
  Clock, AlertCircle, Zap, CheckCircle2, RefreshCw, Search,
  Plus, Banknote, CreditCard, Lock, Unlock, Eye
} from 'lucide-react';

type POSView = 'dashboard' | 'pos-terminal' | 'stores' | 'registers' | 'user-profiles' | 'items-cache' | 'transactions' | 'cash-sessions' | 'promotions' | 'sap-sync';

// ============================================================
// POS MODULE PREVIEW - MAIN COMPONENT
// ============================================================

export const POSModulePreview: React.FC = () => {
  const [currentView, setCurrentView] = useState<POSView>('dashboard');

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'pos-terminal', label: 'POS Terminal', icon: ShoppingCart, highlight: true },
    { type: 'divider', label: 'Configuration' },
    { id: 'stores', label: 'Stores', icon: Store },
    { id: 'registers', label: 'Registers', icon: Monitor },
    { id: 'user-profiles', label: 'User Profiles', icon: Users },
    { id: 'items-cache', label: 'Items Cache', icon: Package },
    { type: 'divider', label: 'Operations' },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'cash-sessions', label: 'Cash Sessions', icon: Wallet },
    { id: 'promotions', label: 'Promotions', icon: Tag },
    { type: 'divider', label: 'Integration' },
    { id: 'sap-sync', label: 'SAP Sync Queue', icon: Database },
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return <POSDashboard onNavigate={setCurrentView} />;
      case 'pos-terminal': return <POSTerminalPreview />;
      case 'stores': return <StoresPreview />;
      case 'registers': return <RegistersPreview />;
      case 'user-profiles': return <UserProfilesPreview />;
      case 'items-cache': return <ItemsCachePreview />;
      case 'transactions': return <TransactionsPreview />;
      case 'cash-sessions': return <CashSessionsPreview />;
      case 'promotions': return <PromotionsPreview />;
      case 'sap-sync': return <SAPSyncPreview />;
      default: return <POSDashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">POS / Retail</h1>
              <p className="text-xs text-gray-500">Section 9.3</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto">
          {navigation.map((item, idx) => {
            if (item.type === 'divider') {
              return <div key={idx} className="mt-4 mb-2 px-3"><span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{item.label}</span></div>;
            }
            const Icon = item.icon!;
            const isActive = currentView === item.id;
            return (
              <button key={item.id} onClick={() => setCurrentView(item.id as POSView)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-1 transition-colors ${isActive ? 'bg-orange-50 text-orange-700' : 'text-gray-600 hover:bg-gray-50'} ${item.highlight ? 'border border-orange-200 bg-orange-50/50' : ''}`}>
                <Icon className={`w-4 h-4 ${isActive ? 'text-orange-600' : ''}`} />
                {item.label}
                {item.highlight && <span className="ml-auto px-1.5 py-0.5 bg-orange-500 text-white text-xs rounded">Live</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500">
            <p className="font-medium text-gray-700 mb-1">Module Status</p>
            <p>✅ Configuration (Part 1)</p>
            <p>✅ POS Terminal (Part 2)</p>
            <p>✅ Cash & Promotions (Part 3)</p>
            <p>✅ SAP Integration</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">{renderContent()}</div>
    </div>
  );
};

// ============================================================
// POS DASHBOARD
// ============================================================

const POSDashboard: React.FC<{ onNavigate: (view: POSView) => void }> = ({ onNavigate }) => (
  <div className="p-6 space-y-6">
    <div><h1 className="text-2xl font-bold text-gray-900">POS Dashboard</h1><p className="text-sm text-gray-500 mt-1">Real-time overview of retail operations</p></div>

    {/* KPIs */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div><p className="text-blue-100 text-sm">Today's Sales</p><p className="text-3xl font-bold mt-1">EGP 80.2K</p><p className="text-blue-200 text-xs mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +18% vs yesterday</p></div>
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><Banknote className="w-6 h-6" /></div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between">
          <div><p className="text-gray-500 text-sm">Transactions</p><p className="text-3xl font-bold text-gray-900 mt-1">108</p><p className="text-gray-400 text-xs mt-1">Avg: EGP 743</p></div>
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center"><Receipt className="w-6 h-6 text-purple-600" /></div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between">
          <div><p className="text-gray-500 text-sm">Open Sessions</p><p className="text-3xl font-bold text-gray-900 mt-1">3</p><p className="text-green-600 text-xs mt-1 flex items-center gap-1"><Unlock className="w-3 h-3" /> All registers active</p></div>
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center"><Wallet className="w-6 h-6 text-green-600" /></div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between">
          <div><p className="text-gray-500 text-sm">Pending Sync</p><p className="text-3xl font-bold text-gray-900 mt-1">2</p><p className="text-yellow-600 text-xs mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> 1 failed</p></div>
          <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center"><Database className="w-6 h-6 text-yellow-600" /></div>
        </div>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <button onClick={() => onNavigate('pos-terminal')} className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-5 text-white text-left hover:from-orange-600 hover:to-red-600 transition-colors">
        <ShoppingCart className="w-8 h-8 mb-3" /><h3 className="text-lg font-semibold">Open POS Terminal</h3><p className="text-orange-100 text-sm mt-1">Start a new sales session</p>
      </button>
      <button onClick={() => onNavigate('cash-sessions')} className="bg-white rounded-xl border border-gray-200 p-5 text-left hover:bg-gray-50 transition-colors">
        <Wallet className="w-8 h-8 mb-3 text-green-600" /><h3 className="text-lg font-semibold text-gray-900">Cash Sessions</h3><p className="text-gray-500 text-sm mt-1">Manage till open/close</p>
      </button>
      <button onClick={() => onNavigate('sap-sync')} className="bg-white rounded-xl border border-gray-200 p-5 text-left hover:bg-gray-50 transition-colors">
        <Database className="w-8 h-8 mb-3 text-blue-600" /><h3 className="text-lg font-semibold text-gray-900">SAP Sync Queue</h3><p className="text-gray-500 text-sm mt-1">View pending transactions</p>
      </button>
    </div>

    {/* Store Performance */}
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Store Performance Today</h2>
        <button onClick={() => onNavigate('stores')} className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">View All <ChevronRight className="w-4 h-4" /></button>
      </div>
      <table className="w-full">
        <thead className="bg-gray-50"><tr><th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Store</th><th className="text-center px-5 py-3 text-xs font-medium text-gray-500 uppercase">Registers</th><th className="text-center px-5 py-3 text-xs font-medium text-gray-500 uppercase">Transactions</th><th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase">Sales</th><th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th></tr></thead>
        <tbody className="divide-y divide-gray-100">
          {[{ name: 'Cairo Mall Store', regs: '2/4', txns: 83, sales: 61250 }, { name: 'Alexandria City Centre', regs: '1/3', txns: 25, sales: 18900 }].map((s, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"><Store className="w-4 h-4 text-blue-600" /></div><p className="font-medium text-gray-900">{s.name}</p></div></td>
              <td className="px-5 py-4 text-center text-sm text-gray-900">{s.regs} <span className="text-xs text-green-600">online</span></td>
              <td className="px-5 py-4 text-center text-sm text-gray-900">{s.txns}</td>
              <td className="px-5 py-4 text-right font-medium text-gray-900">EGP {s.sales.toLocaleString()}</td>
              <td className="px-5 py-4"><span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Active</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ============================================================
// PREVIEW COMPONENTS
// ============================================================

const POSTerminalPreview: React.FC = () => (
  <div className="p-6">
    <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
      <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4"><ShoppingCart className="w-8 h-8 text-orange-600" /></div>
      <h2 className="text-xl font-bold text-gray-900">POS Terminal</h2>
      <p className="text-gray-500 mt-2 max-w-md mx-auto">Full-featured point of sale interface with barcode scanning, customer lookup, payment processing, and receipt printing.</p>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-2xl mx-auto">
        {[{ icon: Package, color: 'blue', title: 'Barcode Scan', desc: 'Quick item entry' }, { icon: Users, color: 'purple', title: 'Customer Lookup', desc: 'Loyalty & history' }, { icon: CreditCard, color: 'green', title: 'Split Payment', desc: 'Multiple methods' }, { icon: Tag, color: 'orange', title: 'Promotions', desc: 'Auto-apply discounts' }].map((f, i) => (
          <div key={i} className="bg-gray-50 rounded-lg p-3"><f.icon className={`w-5 h-5 text-${f.color}-600 mb-2`} /><p className="text-sm font-medium text-gray-900">{f.title}</p><p className="text-xs text-gray-500">{f.desc}</p></div>
        ))}
      </div>
      <p className="text-sm text-blue-600 mt-6">See Part 2 for full implementation →</p>
    </div>
  </div>
);

const StoresPreview: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold text-gray-900">Stores</h1><p className="text-sm text-gray-500 mt-1">Manage retail store locations</p></div><button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><Plus className="w-4 h-4" /> Add Store</button></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[{ name: 'Cairo Mall Store', code: 'STORE-001', regs: 4, online: 2, sales: 61250, active: true }, { name: 'Alexandria City Centre', code: 'STORE-002', regs: 3, online: 1, sales: 18900, active: true }, { name: 'Giza Mall Outlet', code: 'STORE-003', regs: 2, online: 0, sales: 0, active: false }].map((s, i) => (
        <div key={i} className={`bg-white rounded-xl border p-5 ${s.active ? 'border-gray-200' : 'border-gray-100 opacity-60'}`}>
          <div className="flex items-start justify-between mb-4"><div className="flex items-center gap-3"><div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.active ? 'bg-blue-100' : 'bg-gray-100'}`}><Store className={`w-5 h-5 ${s.active ? 'text-blue-600' : 'text-gray-400'}`} /></div><div><h3 className="font-semibold text-gray-900">{s.name}</h3><p className="text-xs text-gray-500 font-mono">{s.code}</p></div></div><span className={`w-2 h-2 rounded-full ${s.active ? 'bg-green-500' : 'bg-gray-300'}`} /></div>
          <div className="grid grid-cols-3 gap-2 text-center">{[{ v: s.regs, l: 'Registers' }, { v: s.online, l: 'Online', c: 'text-green-600' }, { v: `${(s.sales / 1000).toFixed(1)}K`, l: 'Today' }].map((m, j) => (<div key={j} className="bg-gray-50 rounded-lg p-2"><p className={`text-lg font-bold ${m.c || 'text-gray-900'}`}>{m.v}</p><p className="text-xs text-gray-500">{m.l}</p></div>))}</div>
        </div>
      ))}
    </div>
  </div>
);

const RegistersPreview: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold text-gray-900">Registers</h1><p className="text-sm text-gray-500 mt-1">POS terminal devices and status</p></div><button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><Plus className="w-4 h-4" /> Add Register</button></div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full"><thead className="bg-gray-50 border-b border-gray-200"><tr><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Register</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Store</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Current Cashier</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Last Sync</th></tr></thead>
      <tbody className="divide-y divide-gray-100">
        {[{ code: 'REG-01', name: 'Main Register', store: 'Cairo Mall Store', online: true, cashier: 'Ahmed Hassan', sync: '2 min ago' }, { code: 'REG-02', name: 'Register 2', store: 'Cairo Mall Store', online: true, cashier: 'Sara Mohamed', sync: '5 min ago' }, { code: 'REG-03', name: 'Register 3', store: 'Cairo Mall Store', online: false, cashier: null, sync: '2 hours ago' }, { code: 'REG-01', name: 'Main Register', store: 'Alexandria City Centre', online: true, cashier: 'Omar Farouk', sync: '1 min ago' }].map((r, i) => (
          <tr key={i} className="hover:bg-gray-50"><td className="px-4 py-4"><div><p className="font-medium text-gray-900">{r.name}</p><p className="text-xs text-gray-500 font-mono">{r.code}</p></div></td><td className="px-4 py-4 text-sm text-gray-600">{r.store}</td><td className="px-4 py-4"><span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${r.online ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}><span className={`w-1.5 h-1.5 rounded-full ${r.online ? 'bg-green-500' : 'bg-gray-400'}`}></span>{r.online ? 'Online' : 'Offline'}</span></td><td className="px-4 py-4 text-sm text-gray-600">{r.cashier || '—'}</td><td className="px-4 py-4 text-sm text-gray-500">{r.sync}</td></tr>
        ))}
      </tbody></table>
    </div>
  </div>
);

const UserProfilesPreview: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold text-gray-900">User Profiles</h1><p className="text-sm text-gray-500 mt-1">POS user permissions and limits</p></div><button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><Plus className="w-4 h-4" /> Add User Profile</button></div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full"><thead className="bg-gray-50 border-b border-gray-200"><tr><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">User</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Store</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Role</th><th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase">Max Discount</th><th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Max Refund</th></tr></thead>
      <tbody className="divide-y divide-gray-100">
        {[{ name: 'Mohamed Ali', store: 'Cairo Mall Store', role: 'StoreManager', maxDiscount: 25, maxRefund: 10000 }, { name: 'Ahmed Hassan', store: 'Cairo Mall Store', role: 'Supervisor', maxDiscount: 15, maxRefund: 5000 }, { name: 'Sara Mohamed', store: 'Cairo Mall Store', role: 'Cashier', maxDiscount: 5, maxRefund: 1000 }, { name: 'Omar Farouk', store: 'Alexandria City Centre', role: 'Supervisor', maxDiscount: 15, maxRefund: 5000 }].map((u, i) => (
          <tr key={i} className="hover:bg-gray-50"><td className="px-4 py-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-medium">{u.name.split(' ').map(n => n[0]).join('')}</div><span className="font-medium text-gray-900">{u.name}</span></div></td><td className="px-4 py-4 text-sm text-gray-600">{u.store}</td><td className="px-4 py-4"><span className={`px-2 py-0.5 text-xs font-medium rounded-full ${u.role === 'StoreManager' ? 'bg-orange-100 text-orange-700' : u.role === 'Supervisor' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{u.role}</span></td><td className="px-4 py-4 text-center text-sm text-gray-900">{u.maxDiscount}%</td><td className="px-4 py-4 text-right text-sm text-gray-900">EGP {u.maxRefund.toLocaleString()}</td></tr>
        ))}
      </tbody></table>
    </div>
  </div>
);

const ItemsCachePreview: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold text-gray-900">Items Cache</h1><p className="text-sm text-gray-500 mt-1">Local item data synced from SAP B1</p></div><button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Sync from SAP</button></div>
    <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-4 mb-4"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search by item name, code, or barcode..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm" /></div></div><div className="text-sm text-gray-500"><p>6 items in cache • Last sync: 5 minutes ago</p></div></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[{ code: 'ITEM-1001', name: 'T-Shirt White L', barcode: '6223000000012', price: 500, stock: 45 }, { code: 'ITEM-2001', name: 'Jeans Blue 32', barcode: '6223000000043', price: 1200, stock: 23 }, { code: 'ITEM-3001', name: 'Sneakers Sport', barcode: '6223000000055', price: 2500, stock: 8 }].map((item, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-start gap-3"><div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center"><Package className="w-6 h-6 text-gray-400" /></div><div className="flex-1"><h3 className="font-medium text-gray-900">{item.name}</h3><p className="text-xs text-gray-500 font-mono">{item.code}</p><p className="text-xs text-gray-400 mt-1">Barcode: {item.barcode}</p></div></div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100"><span className="text-lg font-bold text-gray-900">EGP {item.price}</span><span className={`text-sm ${item.stock > 10 ? 'text-green-600' : item.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>{item.stock} in stock</span></div>
        </div>
      ))}
    </div>
  </div>
);

const TransactionsPreview: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold text-gray-900">Transaction History</h1><p className="text-sm text-gray-500 mt-1">View and manage POS transactions</p></div><select className="px-3 py-2 border border-gray-300 rounded-lg text-sm"><option>Today</option><option>Yesterday</option><option>This Week</option></select></div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">{[{ l: 'Total Sales', v: 'EGP 80,150' }, { l: 'Transactions', v: '108' }, { l: 'Items Sold', v: '245' }, { l: 'Voided', v: '2', c: 'text-red-600' }].map((k, i) => (<div key={i} className="bg-white rounded-xl border border-gray-200 p-4"><p className="text-sm text-gray-500">{k.l}</p><p className={`text-2xl font-bold mt-1 ${k.c || 'text-gray-900'}`}>{k.v}</p></div>))}</div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full"><thead className="bg-gray-50 border-b border-gray-200"><tr><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Receipt</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Time</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Payment</th><th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th></tr></thead>
      <tbody className="divide-y divide-gray-100">
        {[{ r: 'RC-2025-000458', t: '14:32', c: 'Ahmed Mohamed', p: 'Card', a: 1250, s: 'Completed' }, { r: 'RC-2025-000457', t: '14:15', c: 'Walk-in', p: 'Cash', a: 890, s: 'Completed' }, { r: 'RC-2025-000456', t: '13:58', c: 'Sara Hassan', p: 'Cash', a: 2340, s: 'Completed' }, { r: 'RC-2025-000455', t: '13:30', c: 'Walk-in', p: 'Card', a: 450, s: 'Voided' }].map((tx, i) => (
          <tr key={i} className="hover:bg-gray-50"><td className="px-4 py-4 font-mono text-sm font-medium text-gray-900">{tx.r}</td><td className="px-4 py-4 text-sm text-gray-600">{tx.t}</td><td className="px-4 py-4 text-sm text-gray-900">{tx.c}</td><td className="px-4 py-4"><span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${tx.p === 'Cash' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{tx.p === 'Cash' ? <Banknote className="w-3 h-3" /> : <CreditCard className="w-3 h-3" />}{tx.p}</span></td><td className="px-4 py-4 text-right text-sm font-medium text-gray-900">EGP {tx.a.toLocaleString()}</td><td className="px-4 py-4"><span className={`px-2 py-0.5 text-xs font-medium rounded-full ${tx.s === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{tx.s}</span></td></tr>
        ))}
      </tbody></table>
    </div>
  </div>
);

const CashSessionsPreview: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold text-gray-900">Cash Sessions</h1><p className="text-sm text-gray-500 mt-1">Manage till sessions and cash reconciliation</p></div><button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 flex items-center gap-2"><Unlock className="w-4 h-4" /> Open Session</button></div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">{[{ i: Unlock, c: 'green', l: 'Open Sessions', v: '3' }, { i: Banknote, c: 'blue', l: 'Total Float', v: 'EGP 3,500' }, { i: Receipt, c: 'purple', l: "Today's Transactions", v: '108' }, { i: TrendingUp, c: 'orange', l: "Today's Sales", v: 'EGP 80.2K' }].map((k, idx) => (<div key={idx} className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-3"><div className={`p-2 bg-${k.c}-50 rounded-lg`}><k.i className={`w-5 h-5 text-${k.c}-600`} /></div><div><p className="text-sm text-gray-500">{k.l}</p><p className="text-2xl font-bold text-gray-900">{k.v}</p></div></div></div>))}</div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full"><thead className="bg-gray-50 border-b border-gray-200"><tr><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Session</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Register</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Cashier</th><th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Float</th><th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase">Transactions</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th></tr></thead>
      <tbody className="divide-y divide-gray-100">
        {[{ store: 'Cairo Mall Store', reg: 'REG-01', cashier: 'Ahmed Hassan', float: 1000, txns: 45 }, { store: 'Cairo Mall Store', reg: 'REG-02', cashier: 'Sara Mohamed', float: 1000, txns: 38 }, { store: 'Alexandria City Centre', reg: 'REG-01', cashier: 'Omar Farouk', float: 1500, txns: 25 }].map((s, i) => (
          <tr key={i} className="hover:bg-gray-50"><td className="px-4 py-4"><p className="font-medium text-gray-900">{s.store}</p></td><td className="px-4 py-4 text-sm font-mono text-gray-600">{s.reg}</td><td className="px-4 py-4 text-sm text-gray-900">{s.cashier}</td><td className="px-4 py-4 text-right text-sm font-medium text-gray-900">EGP {s.float.toLocaleString()}</td><td className="px-4 py-4 text-center text-sm text-gray-900">{s.txns}</td><td className="px-4 py-4"><span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700"><Unlock className="w-3 h-3" /> Open</span></td></tr>
        ))}
      </tbody></table>
    </div>
  </div>
);

const PromotionsPreview: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold text-gray-900">Promotions</h1><p className="text-sm text-gray-500 mt-1">Manage pricing rules and discounts</p></div><button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><Plus className="w-4 h-4" /> Create Promotion</button></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[{ code: 'WEEKEND20', name: 'Weekend 20% Off', type: 'Basket', active: true, used: 1250 }, { code: 'APPAREL15', name: 'Apparel 15% Off', type: 'Item', active: true, used: 890 }, { code: 'BUYGETFREE', name: 'Buy 2 Get 1 Free', type: 'Bundle', active: true, used: 156 }, { code: 'VIP10', name: 'VIP Customer Discount', type: 'Basket', active: true, used: 3420 }, { code: 'BLACKFRI50', name: 'Black Friday 50% Off', type: 'Basket', active: false, used: 0 }].map((p, i) => (
        <div key={i} className={`bg-white rounded-xl border p-5 ${p.active ? 'border-gray-200' : 'border-gray-100 opacity-60'}`}>
          <div className="flex items-start justify-between mb-3"><div><span className="font-mono text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{p.code}</span><h3 className="font-semibold text-gray-900 mt-2">{p.name}</h3></div><span className={`w-2 h-2 rounded-full ${p.active ? 'bg-green-500' : 'bg-gray-300'}`} /></div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100"><span className={`px-2 py-0.5 text-xs font-medium rounded-full ${p.type === 'Basket' ? 'bg-purple-100 text-purple-700' : p.type === 'Item' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>{p.type}</span><span className="text-sm text-gray-500">Used {p.used.toLocaleString()}x</span></div>
        </div>
      ))}
    </div>
  </div>
);

const SAPSyncPreview: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold text-gray-900">SAP B1 Sync Queue</h1><p className="text-sm text-gray-500 mt-1">Monitor POS transaction posting to SAP</p></div><div className="flex items-center gap-3"><button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Retry Failed</button><button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><Zap className="w-4 h-4" /> Process Queue</button></div></div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">{[{ l: 'Total in Queue', v: '5' }, { l: 'Pending', v: '2', c: 'text-yellow-600' }, { l: 'Failed', v: '1', c: 'text-red-600' }, { l: 'Synced Today', v: '2', c: 'text-green-600' }].map((k, i) => (<div key={i} className="bg-white rounded-xl border border-gray-200 p-4"><p className="text-sm text-gray-500">{k.l}</p><p className={`text-2xl font-bold mt-1 ${k.c || 'text-gray-900'}`}>{k.v}</p></div>))}</div>
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3"><AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" /><div><p className="text-sm font-medium text-red-800">1 transaction failed to sync to SAP</p><p className="text-sm text-red-700 mt-0.5">Review the error and retry after resolving the issue.</p></div></div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full"><thead className="bg-gray-50 border-b border-gray-200"><tr><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Receipt</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Store</th><th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">SAP Doc</th></tr></thead>
      <tbody className="divide-y divide-gray-100">
        {[{ r: 'RC-2025-000455', store: 'Cairo Mall', a: 2770, s: 'Synced', doc: '#600123' }, { r: 'RC-2025-000454', store: 'Cairo Mall', a: 1539, s: 'Synced', doc: '#600122' }, { r: 'RC-2025-000450', store: 'Alexandria', a: 890, s: 'Pending', doc: null }, { r: 'RC-2025-000448', store: 'Cairo Mall', a: 3250, s: 'Failed', doc: null }, { r: 'RC-2025-000447', store: 'Cairo Mall', a: 1120, s: 'Pending', doc: null }].map((item, i) => (
          <tr key={i} className="hover:bg-gray-50"><td className="px-4 py-4 font-mono text-sm font-medium text-gray-900">{item.r}</td><td className="px-4 py-4 text-sm text-gray-600">{item.store}</td><td className="px-4 py-4 text-right text-sm font-medium text-gray-900">EGP {item.a.toLocaleString()}</td><td className="px-4 py-4"><span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${item.s === 'Synced' ? 'bg-green-100 text-green-700' : item.s === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{item.s === 'Synced' ? <CheckCircle2 className="w-3 h-3" /> : item.s === 'Pending' ? <Clock className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}{item.s}</span></td><td className="px-4 py-4 text-sm font-mono text-gray-600">{item.doc || '—'}</td></tr>
        ))}
      </tbody></table>
    </div>
  </div>
);

export default POSModulePreview;
