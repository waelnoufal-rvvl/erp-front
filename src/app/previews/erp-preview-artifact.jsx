import React, { useState } from 'react';

// Inline SVG Icons
const Icons = {
  menu: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>,
  home: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  search: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  bell: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
  chevronDown: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>,
  building: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  zap: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  cart: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  users: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  store: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
  globe: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  target: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  trendingUp: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  calculator: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
  package: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
  folder: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>,
  user: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  chart: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  check: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  plus: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
  file: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  receipt: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" /></svg>,
  truck: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>,
  clock: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  layers: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  wallet: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
  refresh: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  creditCard: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
  unlock: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>,
  money: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
};

const Icon = ({ name, className = "w-5 h-5" }) => Icons[name] ? Icons[name](className) : null;

const navSections = [
  { id: 'finance', title: 'Finance', icon: 'calculator', color: 'bg-emerald-500', items: [{ id: 'finance-core', label: 'Finance Core', status: 'soon' }, { id: 'finance-lite', label: 'Finance Lite', status: 'soon' }] },
  { id: 'sales', title: 'Sales & CRM', icon: 'cart', color: 'bg-blue-500', items: [{ id: 'sales-core', label: 'Sales Core', status: 'ready', view: 'sales' }, { id: 'crm', label: 'CRM & Pipeline', status: 'ready', view: 'crm' }, { id: 'pos', label: 'POS / Retail', status: 'ready', view: 'pos' }, { id: 'ecommerce', label: 'E-Commerce', status: 'ready', view: 'ecom' }] },
  { id: 'procurement', title: 'Procurement', icon: 'package', color: 'bg-orange-500', items: [{ id: 'purchasing', label: 'Purchasing', status: 'soon' }] },
  { id: 'projects', title: 'Projects', icon: 'folder', color: 'bg-purple-500', items: [{ id: 'projects', label: 'Projects', status: 'soon' }] },
  { id: 'hr', title: 'HR', icon: 'user', color: 'bg-pink-500', items: [{ id: 'employees', label: 'Employees', status: 'soon' }] },
  { id: 'reports', title: 'Reports', icon: 'chart', color: 'bg-cyan-500', items: [{ id: 'dashboards', label: 'Dashboards', status: 'soon' }] },
];

const fmt = (n) => `EGP ${n.toLocaleString()}`;

export default function ERPSystemPreview() {
  const [sidebar, setSidebar] = useState(true);
  const [expanded, setExpanded] = useState(['sales']);
  const [view, setView] = useState('dashboard');

  const toggle = (id) => setExpanded(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  return (
    <div className="h-screen bg-gray-100 flex flex-col text-sm">
      {/* Header */}
      <header className="h-12 bg-white border-b flex items-center px-3 shrink-0">
        <button onClick={() => setSidebar(!sidebar)} className="p-1.5 hover:bg-gray-100 rounded"><Icon name="menu" className="w-4 h-4 text-gray-600" /></button>
        <div className="flex items-center gap-2 ml-3">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center"><Icon name="zap" className="w-4 h-4 text-white" /></div>
          <div><p className="font-bold text-gray-900 text-xs">ERP System</p><p className="text-[10px] text-gray-500">SAP B1</p></div>
        </div>
        <div className="flex-1 max-w-xs mx-4">
          <div className="relative"><Icon name="search" className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" /><input type="text" placeholder="Search..." className="w-full pl-8 pr-3 py-1.5 bg-gray-100 border rounded text-xs" /></div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-gray-100 rounded relative"><Icon name="bell" className="w-4 h-4 text-gray-600" /><span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span></button>
          <div className="flex items-center gap-1.5 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"><Icon name="building" className="w-3.5 h-3.5 text-gray-600" /><span className="text-xs font-medium text-gray-700">Acme Corp</span></div>
          <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center"><span className="text-white text-[10px] font-medium">WA</span></div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${sidebar ? 'w-52' : 'w-12'} bg-white border-r transition-all flex flex-col shrink-0`}>
          <div className="p-1.5 flex-1 overflow-y-auto">
            <button onClick={() => setView('dashboard')} className={`w-full flex items-center gap-2 px-2 py-2 rounded text-xs mb-1 ${view === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
              <Icon name="home" className="w-4 h-4" />{sidebar && <span className="font-medium">Dashboard</span>}
            </button>
            {navSections.map(s => (
              <div key={s.id} className="mb-0.5">
                <button onClick={() => toggle(s.id)} className="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-gray-50">
                  <div className="flex items-center gap-2"><div className={`w-5 h-5 rounded ${s.color} flex items-center justify-center`}><Icon name={s.icon} className="w-3 h-3 text-white" /></div>{sidebar && <span className="font-semibold text-[11px] text-gray-700">{s.title}</span>}</div>
                  {sidebar && <Icon name="chevronDown" className={`w-3 h-3 text-gray-400 transition-transform ${expanded.includes(s.id) ? 'rotate-180' : ''}`} />}
                </button>
                {sidebar && expanded.includes(s.id) && (
                  <div className="ml-5 mt-0.5 space-y-0.5">
                    {s.items.map(i => (
                      <button key={i.id} onClick={() => i.view && setView(i.view)} className={`w-full flex items-center justify-between px-2 py-1 rounded text-[11px] ${view === i.view ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}>
                        <span>{i.label}</span>
                        {i.status === 'ready' && <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>}
                        {i.status === 'soon' && <span className="px-1 py-0.5 bg-gray-200 text-gray-500 text-[9px] rounded">Soon</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {sidebar && <div className="p-2 border-t"><div className="rounded p-2 bg-gray-50 flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span><span className="text-[10px] text-gray-500">SAP Connected</span></div></div>}
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto">
          {view === 'dashboard' && <Dashboard nav={setView} />}
          {view === 'sales' && <SalesView />}
          {view === 'crm' && <CRMView nav={setView} />}
          {view === 'pos' && <POSView nav={setView} />}
          {view === 'pos-terminal' && <POSTerminal />}
          {view === 'ecom' && <EcomView />}
          {view === 'pipeline' && <Pipeline />}
          {view === 'leads' && <Leads />}
        </main>
      </div>
    </div>
  );
}

const Dashboard = ({ nav }) => (
  <div className="p-4 space-y-4">
    <div className="rounded-xl p-4 bg-gradient-to-r from-blue-500 to-indigo-600 flex justify-between items-center">
      <div><h1 className="text-lg font-bold text-white">Welcome back, Wael! 👋</h1><p className="text-blue-100 text-xs mt-0.5">Here's what's happening today.</p></div>
      <div className="text-right text-white"><p className="text-[10px] text-blue-200">{new Date().toLocaleDateString()}</p><p className="text-lg font-bold">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p></div>
    </div>
    <div className="grid grid-cols-4 gap-3">
      {[{ l: "Sales", v: 'EGP 281K', s: '+18%', i: 'trendingUp', c: 'blue', vw: 'sales' }, { l: 'E-Commerce', v: '86', s: '35 pending', i: 'globe', c: 'indigo', vw: 'ecom' }, { l: 'POS', v: '108', s: '3 registers', i: 'store', c: 'orange', vw: 'pos' }, { l: 'Pipeline', v: 'EGP 4.2M', s: '24 deals', i: 'target', c: 'green', vw: 'pipeline' }].map((s, i) => (
        <button key={i} onClick={() => nav(s.vw)} className="bg-white rounded-lg p-3 border text-left hover:shadow-md transition-shadow">
          <p className="text-[10px] text-gray-500">{s.l}</p><p className="text-lg font-bold text-gray-900">{s.v}</p><p className="text-[10px] text-green-600">{s.s}</p>
        </button>
      ))}
    </div>
    <div className="grid grid-cols-6 gap-2">
      {[{ l: 'CRM', i: 'users', c: 'blue', v: 'crm' }, { l: 'Sales', i: 'cart', c: 'green', v: 'sales' }, { l: 'POS', i: 'store', c: 'orange', v: 'pos' }, { l: 'E-Com', i: 'globe', c: 'indigo', v: 'ecom' }, { l: 'Pipeline', i: 'layers', c: 'purple', v: 'pipeline' }, { l: 'Leads', i: 'target', c: 'pink', v: 'leads' }].map((a, i) => (
        <button key={i} onClick={() => nav(a.v)} className="rounded-lg p-3 text-center bg-white border hover:shadow-md"><div className={`w-8 h-8 rounded-lg mx-auto mb-1 flex items-center justify-center bg-${a.c}-50`}><Icon name={a.i} className={`w-4 h-4 text-${a.c}-600`} /></div><p className="font-medium text-[10px] text-gray-900">{a.l}</p></button>
      ))}
    </div>
  </div>
);

const SalesView = () => (
  <div className="p-4 space-y-4">
    <div className="flex justify-between items-center"><div><h1 className="text-lg font-bold text-gray-900">Sales Dashboard</h1></div><button className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-medium flex items-center gap-1"><Icon name="plus" className="w-3 h-3" /> New Quote</button></div>
    <div className="grid grid-cols-4 gap-3">
      {[{ l: 'Quotations', v: '12', s: 'EGP 450K', i: 'file', c: 'blue' }, { l: 'Orders', v: '8', s: 'EGP 320K', i: 'cart', c: 'green' }, { l: 'Deliveries', v: '5', s: 'Pending', i: 'truck', c: 'orange' }, { l: 'Invoices', v: '15', s: 'This month', i: 'receipt', c: 'purple' }].map((s, i) => (
        <div key={i} className="bg-white rounded-lg p-3 border"><div className="flex items-center gap-2"><div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${s.c}-50`}><Icon name={s.i} className={`w-5 h-5 text-${s.c}-600`} /></div><div><p className="text-xl font-bold text-gray-900">{s.v}</p><p className="text-[10px] text-gray-500">{s.l}</p><p className="text-[10px] text-gray-400">{s.s}</p></div></div></div>
      ))}
    </div>
  </div>
);

const CRMView = ({ nav }) => (
  <div className="p-4 space-y-4">
    <h1 className="text-lg font-bold text-gray-900">CRM Dashboard</h1>
    <div className="grid grid-cols-4 gap-3">
      {[{ l: 'Accounts', v: '156', i: 'building', c: 'blue' }, { l: 'Contacts', v: '423', i: 'users', c: 'green' }, { l: 'Leads', v: '23', i: 'target', c: 'orange', vw: 'leads' }, { l: 'Opps', v: '24', i: 'trendingUp', c: 'purple' }].map((s, i) => (
        <button key={i} onClick={() => s.vw && nav(s.vw)} className="bg-white rounded-lg p-3 border text-left hover:shadow-md"><div className="flex items-center gap-2"><div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${s.c}-50`}><Icon name={s.i} className={`w-5 h-5 text-${s.c}-600`} /></div><div><p className="text-xl font-bold text-gray-900">{s.v}</p><p className="text-[10px] text-gray-500">{s.l}</p></div></div></button>
      ))}
    </div>
    <div className="bg-white rounded-lg border p-3"><h3 className="font-semibold text-gray-900 mb-3 text-xs">Pipeline</h3><div className="flex gap-2">{['Qualification', 'Proposal', 'Negotiation', 'Won'].map((st, i) => (<div key={i} className="flex-1 text-center"><div className={`h-1.5 rounded-full ${i === 3 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ opacity: 1 - i * 0.2 }}></div><p className="text-[9px] text-gray-500 mt-1">{st}</p><p className="text-sm font-bold text-gray-900">{[8, 6, 5, 5][i]}</p></div>))}</div></div>
  </div>
);

const POSView = ({ nav }) => (
  <div className="p-4 space-y-4">
    <div className="flex justify-between items-center"><h1 className="text-lg font-bold text-gray-900">POS Dashboard</h1><button onClick={() => nav('pos-terminal')} className="px-3 py-1.5 bg-orange-600 text-white rounded text-xs font-medium flex items-center gap-1"><Icon name="store" className="w-3 h-3" /> Open Terminal</button></div>
    <div className="grid grid-cols-4 gap-3">
      {[{ l: "Today's Sales", v: 'EGP 80.2K', i: 'trendingUp', c: 'green' }, { l: 'Transactions', v: '108', i: 'receipt', c: 'blue' }, { l: 'Sessions', v: '3', i: 'unlock', c: 'orange' }, { l: 'Pending Sync', v: '2', i: 'refresh', c: 'purple' }].map((s, i) => (
        <div key={i} className="bg-white rounded-lg p-3 border"><div className="flex items-center gap-2"><div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${s.c}-50`}><Icon name={s.i} className={`w-5 h-5 text-${s.c}-600`} /></div><div><p className="text-xl font-bold text-gray-900">{s.v}</p><p className="text-[10px] text-gray-500">{s.l}</p></div></div></div>
      ))}
    </div>
  </div>
);

const POSTerminal = () => (
  <div className="h-full bg-gray-100 flex">
    <div className="flex-1 flex flex-col bg-white border-r">
      <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 text-white flex justify-between items-center"><div><p className="font-bold text-sm">Cairo Mall Store</p><p className="text-[10px] text-orange-100">REG-01</p></div><p className="text-[10px]">{new Date().toLocaleString()}</p></div>
      <div className="p-3 border-b"><div className="relative"><Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Scan barcode..." className="w-full pl-10 pr-3 py-2 border rounded text-sm" /></div></div>
      <div className="flex-1 flex items-center justify-center text-gray-400"><div className="text-center"><Icon name="cart" className="w-12 h-12 mx-auto mb-2 opacity-50" /><p className="text-sm">Cart is empty</p></div></div>
      <div className="p-3 border-t grid grid-cols-4 gap-2">{['Park', 'Recall', 'Discount', 'Void'].map((a, i) => (<button key={i} className={`p-2 rounded font-medium text-xs ${i === 0 ? 'bg-yellow-50 text-yellow-700' : i === 1 ? 'bg-blue-50 text-blue-700' : i === 2 ? 'bg-purple-50 text-purple-700' : 'bg-red-50 text-red-700'}`}>{a}</button>))}</div>
    </div>
    <div className="w-56 flex flex-col bg-gray-50">
      <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center"><p className="text-[10px] text-blue-200">Receipt #RC-000459</p></div>
      <div className="p-3 space-y-1 border-b text-xs"><div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>EGP 0.00</span></div><div className="flex justify-between"><span className="text-gray-500">Tax (14%)</span><span>EGP 0.00</span></div><div className="flex justify-between text-base font-bold pt-1 border-t"><span>Total</span><span>EGP 0.00</span></div></div>
      <div className="p-3 flex-1"><p className="text-[10px] text-gray-500 mb-1">Quick Cash</p><div className="grid grid-cols-2 gap-1">{[50, 100, 200, 500].map(a => (<button key={a} className="p-2 bg-white border rounded text-xs font-medium">EGP {a}</button>))}</div></div>
      <div className="p-3 space-y-1"><button className="w-full p-2.5 bg-green-600 text-white rounded font-bold text-sm flex items-center justify-center gap-1"><Icon name="money" className="w-4 h-4" /> Cash</button><button className="w-full p-2.5 bg-blue-600 text-white rounded font-bold text-sm flex items-center justify-center gap-1"><Icon name="creditCard" className="w-4 h-4" /> Card</button></div>
    </div>
  </div>
);

const EcomView = () => (
  <div className="p-4 space-y-4">
    <div className="flex justify-between items-center"><h1 className="text-lg font-bold text-gray-900">E-Commerce Dashboard</h1><button className="px-3 py-1.5 bg-indigo-600 text-white rounded text-xs font-medium">Add Channel</button></div>
    <div className="grid grid-cols-4 gap-3">
      <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-3 text-white"><p className="text-indigo-100 text-[10px]">Revenue</p><p className="text-xl font-bold">{fmt(281500)}</p><p className="text-indigo-200 text-[10px]">+23%</p></div>
      {[{ l: 'Orders', v: '86', i: 'cart', c: 'blue' }, { l: 'Pending', v: '25', i: 'clock', c: 'yellow' }, { l: 'Channels', v: '3/4', i: 'globe', c: 'green' }].map((s, i) => (
        <div key={i} className="bg-white rounded-lg border p-3"><div className="flex items-center gap-2"><div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${s.c}-50`}><Icon name={s.i} className={`w-5 h-5 text-${s.c}-600`} /></div><div><p className="text-xl font-bold text-gray-900">{s.v}</p><p className="text-[10px] text-gray-500">{s.l}</p></div></div></div>
      ))}
    </div>
    <div className="grid grid-cols-3 gap-3">
      {[{ n: 'Shopify', o: 45, r: 125000, st: 'Active' }, { n: 'WooCommerce', o: 18, r: 89000, st: 'Active' }, { n: 'Amazon', o: 23, r: 67500, st: 'Syncing' }].map((ch, i) => (
        <div key={i} className="bg-white rounded-lg border p-3"><div className="flex justify-between items-center mb-2"><span className="font-medium text-gray-900 text-xs">{ch.n}</span><span className={`px-1.5 py-0.5 text-[9px] font-medium rounded-full ${ch.st === 'Active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{ch.st}</span></div><div className="grid grid-cols-2 gap-1 text-center"><div className="bg-gray-50 rounded p-1.5"><p className="font-bold text-gray-900 text-sm">{ch.o}</p><p className="text-[9px] text-gray-500">Orders</p></div><div className="bg-gray-50 rounded p-1.5"><p className="font-bold text-gray-900 text-sm">{(ch.r / 1000).toFixed(0)}K</p><p className="text-[9px] text-gray-500">Revenue</p></div></div></div>
      ))}
    </div>
  </div>
);

const Pipeline = () => (
  <div className="p-4 space-y-4">
    <h1 className="text-lg font-bold text-gray-900">Pipeline View</h1>
    <div className="grid grid-cols-4 gap-3">
      {[{ n: 'Qualification', d: [{ t: 'Support', a: 95000 }] }, { n: 'Proposal', d: [{ t: 'Hardware', a: 180000 }, { t: 'Cloud', a: 120000 }] }, { n: 'Negotiation', d: [{ t: 'Enterprise', a: 450000 }] }, { n: 'Won', d: [{ t: 'Training', a: 45000 }] }].map((s, i) => (
        <div key={i} className="bg-gray-50 rounded-lg p-3"><div className="flex justify-between items-center mb-3"><h3 className="font-semibold text-gray-700 text-xs">{s.n}</h3><span className="px-1.5 py-0.5 bg-gray-200 text-gray-600 text-[9px] font-medium rounded-full">{s.d.length}</span></div><div className="space-y-2">{s.d.map((deal, j) => (<div key={j} className="bg-white rounded p-2 border shadow-sm"><p className="font-medium text-gray-900 text-xs">{deal.t}</p><p className="text-xs font-semibold text-gray-900 mt-1">{fmt(deal.a)}</p></div>))}</div></div>
      ))}
    </div>
  </div>
);

const Leads = () => (
  <div className="p-4 space-y-4">
    <div className="flex justify-between items-center"><h1 className="text-lg font-bold text-gray-900">Leads</h1><button className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-medium">Add Lead</button></div>
    <div className="grid grid-cols-4 gap-3">{[{ l: 'New', c: 8, cl: 'blue' }, { l: 'Contacted', c: 6, cl: 'yellow' }, { l: 'Qualified', c: 5, cl: 'green' }, { l: 'Converted', c: 4, cl: 'purple' }].map((s, i) => (<div key={i} className="bg-white rounded-lg border p-3 text-center"><p className={`text-xl font-bold text-${s.cl}-600`}>{s.c}</p><p className="text-[10px] text-gray-500">{s.l}</p></div>))}</div>
    <div className="bg-white rounded-lg border overflow-hidden">
      <table className="w-full text-xs">
        <thead className="bg-gray-50 border-b"><tr><th className="text-left px-3 py-2 text-[10px] font-medium text-gray-500 uppercase">Lead</th><th className="text-left px-3 py-2 text-[10px] font-medium text-gray-500 uppercase">Company</th><th className="text-left px-3 py-2 text-[10px] font-medium text-gray-500 uppercase">Status</th><th className="text-left px-3 py-2 text-[10px] font-medium text-gray-500 uppercase">Rating</th></tr></thead>
        <tbody className="divide-y">{[{ n: 'Mohamed Khaled', c: 'Pyramid Tech', s: 'New', r: 'Hot' }, { n: 'Fatma Ibrahim', c: 'Nile Software', s: 'Contacted', r: 'Warm' }, { n: 'Youssef Ahmed', c: 'Smart Systems', s: 'Qualified', r: 'Hot' }].map((l, i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-3 py-2 font-medium text-gray-900">{l.n}</td><td className="px-3 py-2 text-gray-600">{l.c}</td><td className="px-3 py-2"><span className={`px-1.5 py-0.5 text-[9px] font-medium rounded-full ${l.s === 'New' ? 'bg-blue-100 text-blue-700' : l.s === 'Contacted' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{l.s}</span></td><td className="px-3 py-2"><span className={`px-1.5 py-0.5 text-[9px] font-medium rounded-full ${l.r === 'Hot' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>{l.r}</span></td></tr>))}</tbody>
      </table>
    </div>
  </div>
);
