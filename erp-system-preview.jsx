// ============================================================
// INTEGRATED ERP SYSTEM - Preview Component
// Multi-Tenant ERP with SAP Business One Integration
// ============================================================

import React, { useState } from 'react';

// Icon components (inline for artifact compatibility)
const Icon = ({ name, className = "w-5 h-5" }) => {
  const icons = {
    menu: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>,
    home: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    search: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    bell: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
    chevronDown: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>,
    chevronRight: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>,
    chevronLeft: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>,
    building: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    zap: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    cart: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    users: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    store: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
    globe: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    target: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    trendingUp: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    calculator: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
    package: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
    folder: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>,
    user: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    chart: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    check: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
    plus: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
    file: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    receipt: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" /></svg>,
    truck: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>,
    calendar: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    clock: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    database: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>,
    layers: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
    wallet: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
    refresh: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
    creditCard: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
    tag: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>,
    gift: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>,
    unlock: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>,
    lock: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    phone: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
    mail: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    alert: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
    checkCircle: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    money: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  };
  return icons[name] || <span>?</span>;
};

// Navigation configuration
const navSections = [
  { id: 'finance', title: 'Finance', icon: 'calculator', color: 'emerald', items: [
    { id: 'finance-core', label: 'Finance Core', status: 'soon' },
    { id: 'finance-lite', label: 'Finance Lite', status: 'soon' },
  ]},
  { id: 'sales', title: 'Sales & CRM', icon: 'cart', color: 'blue', items: [
    { id: 'sales-core', label: 'Sales Core', status: 'ready', views: ['sales-dashboard', 'quotations', 'sales-orders'] },
    { id: 'crm', label: 'CRM & Pipeline', status: 'ready', views: ['crm-dashboard', 'accounts', 'leads', 'pipeline'] },
    { id: 'pos', label: 'POS / Retail', status: 'ready', views: ['pos-dashboard', 'pos-terminal', 'transactions'] },
    { id: 'ecommerce', label: 'E-Commerce', status: 'ready', views: ['ecom-dashboard', 'channels', 'orders'] },
    { id: 'loyalty', label: 'Loyalty', status: 'soon' },
  ]},
  { id: 'procurement', title: 'Procurement', icon: 'package', color: 'orange', items: [
    { id: 'purchasing', label: 'Purchasing', status: 'soon' },
    { id: 'inventory', label: 'Inventory', status: 'soon' },
  ]},
  { id: 'projects', title: 'Projects', icon: 'folder', color: 'purple', items: [
    { id: 'project-mgmt', label: 'Projects', status: 'soon' },
    { id: 'contracts', label: 'Contracts', status: 'soon' },
  ]},
  { id: 'hr', title: 'HR & Payroll', icon: 'user', color: 'pink', items: [
    { id: 'employees', label: 'Employees', status: 'soon' },
    { id: 'payroll', label: 'Payroll', status: 'soon' },
  ]},
  { id: 'reports', title: 'Reports', icon: 'chart', color: 'cyan', items: [
    { id: 'dashboards', label: 'Dashboards', status: 'soon' },
  ]},
];

const colorMap = {
  emerald: { bg: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-600' },
  blue: { bg: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-600' },
  orange: { bg: 'bg-orange-500', light: 'bg-orange-50', text: 'text-orange-600' },
  purple: { bg: 'bg-purple-500', light: 'bg-purple-50', text: 'text-purple-600' },
  pink: { bg: 'bg-pink-500', light: 'bg-pink-50', text: 'text-pink-600' },
  cyan: { bg: 'bg-cyan-500', light: 'bg-cyan-50', text: 'text-cyan-600' },
};

const formatCurrency = (amount) => `EGP ${amount.toLocaleString()}`;

// Main ERP Preview Component
export default function ERPSystemPreview() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState(['sales']);
  const [currentView, setCurrentView] = useState('dashboard');

  const toggleSection = (id) => {
    setExpandedSections(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 shrink-0">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
          <Icon name="menu" className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center gap-3 ml-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Icon name="zap" className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-sm">ERP System</h1>
            <p className="text-xs text-gray-500">SAP B1 Integration</p>
          </div>
        </div>
        <div className="flex-1 max-w-md mx-6">
          <div className="relative">
            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Icon name="bell" className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Icon name="building" className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Acme Corp</span>
          </div>
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">WA</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-60' : 'w-14'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col shrink-0`}>
          <div className="p-2 flex-1 overflow-y-auto">
            <button 
              onClick={() => setCurrentView('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-2 ${currentView === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Icon name="home" className="w-5 h-5" />
              {sidebarOpen && <span className="font-medium text-sm">Dashboard</span>}
            </button>

            {navSections.map(section => (
              <div key={section.id} className="mb-1">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-md ${colorMap[section.color].bg} flex items-center justify-center`}>
                      <Icon name={section.icon} className="w-3.5 h-3.5 text-white" />
                    </div>
                    {sidebarOpen && <span className="font-semibold text-xs text-gray-700">{section.title}</span>}
                  </div>
                  {sidebarOpen && <Icon name="chevronDown" className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.includes(section.id) ? 'rotate-180' : ''}`} />}
                </button>
                
                {sidebarOpen && expandedSections.includes(section.id) && (
                  <div className="ml-6 mt-1 space-y-0.5">
                    {section.items.map(item => (
                      <button
                        key={item.id}
                        onClick={() => item.views && setCurrentView(item.views[0])}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs ${
                          item.views?.includes(currentView) 
                            ? `${colorMap[section.color].light} ${colorMap[section.color].text}` 
                            : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span>{item.label}</span>
                        {item.status === 'ready' && <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>}
                        {item.status === 'soon' && <span className="px-1 py-0.5 bg-gray-200 text-gray-500 text-[10px] rounded">Soon</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {sidebarOpen && (
            <div className="p-3 border-t border-gray-200">
              <div className="rounded-lg p-3 bg-gray-50">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-xs text-gray-500">SAP B1 Connected</span>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {currentView === 'dashboard' && <DashboardView onNavigate={setCurrentView} />}
          {currentView === 'sales-dashboard' && <SalesDashboardView onNavigate={setCurrentView} />}
          {currentView === 'crm-dashboard' && <CRMDashboardView onNavigate={setCurrentView} />}
          {currentView === 'pos-dashboard' && <POSDashboardView onNavigate={setCurrentView} />}
          {currentView === 'pos-terminal' && <POSTerminalView />}
          {currentView === 'ecom-dashboard' && <EcommerceDashboardView />}
          {currentView === 'pipeline' && <PipelineView />}
          {currentView === 'leads' && <LeadsView />}
          {!['dashboard', 'sales-dashboard', 'crm-dashboard', 'pos-dashboard', 'pos-terminal', 'ecom-dashboard', 'pipeline', 'leads'].includes(currentView) && (
            <PlaceholderView name={currentView} />
          )}
        </main>
      </div>
    </div>
  );
}

// Dashboard View
const DashboardView = ({ onNavigate }) => (
  <div className="p-6 space-y-6">
    <div className="rounded-xl p-6 bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back, Wael! 👋</h1>
          <p className="text-blue-100 mt-1">Here's what's happening with your business today.</p>
        </div>
        <div className="text-right text-white">
          <p className="text-sm text-blue-200">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          <p className="text-2xl font-bold">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "Today's Sales", value: 'EGP 281.5K', sub: '+18%', icon: 'trendingUp', color: 'blue', view: 'sales-dashboard' },
        { label: 'E-Commerce', value: '86 orders', sub: '35 pending', icon: 'globe', color: 'indigo', view: 'ecom-dashboard' },
        { label: 'POS Sales', value: '108 txns', sub: '3 registers', icon: 'store', color: 'orange', view: 'pos-dashboard' },
        { label: 'Pipeline', value: 'EGP 4.2M', sub: '24 deals', icon: 'target', color: 'green', view: 'pipeline' },
      ].map((stat, i) => (
        <button key={i} onClick={() => onNavigate(stat.view)} className="bg-white rounded-xl p-4 border border-gray-200 text-left hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <p className="text-xs text-green-600 mt-1">{stat.sub}</p>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${stat.color}-50`}>
              <Icon name={stat.icon} className={`w-5 h-5 text-${stat.color}-600`} />
            </div>
          </div>
        </button>
      ))}
    </div>

    <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
      {[
        { label: 'CRM', icon: 'users', color: 'blue', view: 'crm-dashboard' },
        { label: 'Sales', icon: 'cart', color: 'green', view: 'sales-dashboard' },
        { label: 'POS', icon: 'store', color: 'orange', view: 'pos-dashboard' },
        { label: 'E-Commerce', icon: 'globe', color: 'indigo', view: 'ecom-dashboard' },
        { label: 'Pipeline', icon: 'layers', color: 'purple', view: 'pipeline' },
        { label: 'Leads', icon: 'target', color: 'pink', view: 'leads' },
      ].map((action, i) => (
        <button key={i} onClick={() => onNavigate(action.view)} className="rounded-xl p-4 text-center bg-white border border-gray-200 hover:shadow-md transition-shadow">
          <div className={`w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center bg-${action.color}-50`}>
            <Icon name={action.icon} className={`w-5 h-5 text-${action.color}-600`} />
          </div>
          <p className="font-medium text-xs text-gray-900">{action.label}</p>
        </button>
      ))}
    </div>

    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Module Status</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {navSections.map(section => {
          const readyCount = section.items.filter(i => i.status === 'ready').length;
          return (
            <div key={section.id} className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-lg ${colorMap[section.color].bg} flex items-center justify-center`}>
                  <Icon name={section.icon} className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-900">{section.title}</h3>
                  <p className="text-xs text-gray-500">{readyCount}/{section.items.length} ready</p>
                </div>
              </div>
              <div className="space-y-1">
                {section.items.slice(0, 3).map(item => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">{item.label}</span>
                    {item.status === 'ready' ? (
                      <Icon name="checkCircle" className="w-3.5 h-3.5 text-green-500" />
                    ) : (
                      <span className="text-gray-400">Soon</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

// Sales Dashboard
const SalesDashboardView = ({ onNavigate }) => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div><h1 className="text-2xl font-bold text-gray-900">Sales Dashboard</h1><p className="text-sm text-gray-500 mt-1">Overview of sales performance</p></div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
        <Icon name="plus" className="w-4 h-4" /> New Quote
      </button>
    </div>
    <div className="grid grid-cols-4 gap-4">
      {[
        { label: 'Quotations', value: '12', sub: 'EGP 450K', icon: 'file', color: 'blue' },
        { label: 'Orders', value: '8', sub: 'EGP 320K', icon: 'cart', color: 'green' },
        { label: 'Deliveries', value: '5', sub: 'Pending', icon: 'truck', color: 'orange' },
        { label: 'Invoices', value: '15', sub: 'This month', icon: 'receipt', color: 'purple' },
      ].map((stat, i) => (
        <div key={i} className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-50`}>
              <Icon name={stat.icon} className={`w-6 h-6 text-${stat.color}-600`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-xs text-gray-400">{stat.sub}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// CRM Dashboard
const CRMDashboardView = ({ onNavigate }) => (
  <div className="p-6 space-y-6">
    <h1 className="text-2xl font-bold text-gray-900">CRM Dashboard</h1>
    <div className="grid grid-cols-4 gap-4">
      {[
        { label: 'Accounts', value: '156', icon: 'building', color: 'blue' },
        { label: 'Contacts', value: '423', icon: 'users', color: 'green' },
        { label: 'Leads', value: '23', icon: 'target', color: 'orange' },
        { label: 'Opportunities', value: '24', icon: 'trendingUp', color: 'purple' },
      ].map((stat, i) => (
        <button key={i} onClick={() => stat.label === 'Leads' && onNavigate('leads')} className="bg-white rounded-xl p-5 border border-gray-200 text-left hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-50`}>
              <Icon name={stat.icon} className={`w-6 h-6 text-${stat.color}-600`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-900 mb-4">Pipeline Summary</h3>
      <div className="flex items-center gap-2">
        {['Qualification', 'Proposal', 'Negotiation', 'Closed Won'].map((stage, i) => (
          <div key={i} className="flex-1 text-center">
            <div className={`h-2 rounded-full ${i === 3 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ opacity: 1 - i * 0.2 }}></div>
            <p className="text-xs text-gray-500 mt-2">{stage}</p>
            <p className="text-lg font-bold text-gray-900">{[8, 6, 5, 5][i]}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// POS Dashboard
const POSDashboardView = ({ onNavigate }) => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div><h1 className="text-2xl font-bold text-gray-900">POS Dashboard</h1></div>
      <button onClick={() => onNavigate('pos-terminal')} className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 flex items-center gap-2">
        <Icon name="store" className="w-4 h-4" /> Open Terminal
      </button>
    </div>
    <div className="grid grid-cols-4 gap-4">
      {[
        { label: "Today's Sales", value: 'EGP 80.2K', icon: 'trendingUp', color: 'green' },
        { label: 'Transactions', value: '108', icon: 'receipt', color: 'blue' },
        { label: 'Open Sessions', value: '3', icon: 'unlock', color: 'orange' },
        { label: 'Pending Sync', value: '2', icon: 'refresh', color: 'purple' },
      ].map((stat, i) => (
        <div key={i} className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-50`}>
              <Icon name={stat.icon} className={`w-6 h-6 text-${stat.color}-600`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// POS Terminal
const POSTerminalView = () => (
  <div className="h-full bg-gray-100 flex">
    <div className="flex-1 flex flex-col bg-white border-r">
      <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-between">
        <div><p className="font-bold">Cairo Mall Store</p><p className="text-sm text-orange-100">REG-01 • Ahmed Hassan</p></div>
        <p className="text-sm">{new Date().toLocaleString()}</p>
      </div>
      <div className="p-4 border-b">
        <div className="relative">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Scan barcode or search item..." className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-lg" />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <div className="text-center">
          <Icon name="cart" className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Cart is empty</p>
          <p className="text-sm">Scan items to add</p>
        </div>
      </div>
      <div className="p-4 border-t grid grid-cols-4 gap-2">
        {['Park', 'Recall', 'Discount', 'Void'].map((action, i) => (
          <button key={i} className={`p-3 rounded-lg font-medium text-sm ${
            i === 0 ? 'bg-yellow-50 text-yellow-700' : i === 1 ? 'bg-blue-50 text-blue-700' : i === 2 ? 'bg-purple-50 text-purple-700' : 'bg-red-50 text-red-700'
          }`}>{action}</button>
        ))}
      </div>
    </div>
    <div className="w-72 flex flex-col bg-gray-50">
      <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center">
        <p className="text-sm text-blue-200">Receipt #RC-2025-000459</p>
      </div>
      <div className="p-4 space-y-2 border-b">
        <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span>EGP 0.00</span></div>
        <div className="flex justify-between text-sm"><span className="text-gray-500">Tax (14%)</span><span>EGP 0.00</span></div>
        <div className="flex justify-between text-xl font-bold pt-2 border-t"><span>Total</span><span>EGP 0.00</span></div>
      </div>
      <div className="p-4 flex-1">
        <p className="text-sm text-gray-500 mb-2">Quick Cash</p>
        <div className="grid grid-cols-2 gap-2">
          {[50, 100, 200, 500].map(amt => (
            <button key={amt} className="p-3 bg-white border border-gray-200 rounded-lg font-medium hover:bg-gray-50">EGP {amt}</button>
          ))}
        </div>
      </div>
      <div className="p-4 space-y-2">
        <button className="w-full p-4 bg-green-600 text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2">
          <Icon name="money" className="w-5 h-5" /> Cash
        </button>
        <button className="w-full p-4 bg-blue-600 text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2">
          <Icon name="creditCard" className="w-5 h-5" /> Card
        </button>
      </div>
    </div>
  </div>
);

// E-Commerce Dashboard
const EcommerceDashboardView = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-900">E-Commerce Dashboard</h1>
      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium">Add Channel</button>
    </div>
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-5 text-white">
        <p className="text-indigo-100 text-sm">Today's Revenue</p>
        <p className="text-3xl font-bold mt-1">{formatCurrency(281500)}</p>
        <p className="text-indigo-200 text-xs mt-1">+23% vs yesterday</p>
      </div>
      {[
        { label: 'Orders', value: '86', icon: 'cart', color: 'blue' },
        { label: 'Pending', value: '25', icon: 'clock', color: 'yellow' },
        { label: 'Channels', value: '3/4', icon: 'globe', color: 'green' },
      ].map((stat, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-50`}>
              <Icon name={stat.icon} className={`w-6 h-6 text-${stat.color}-600`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-3 gap-4">
      {[
        { name: 'Shopify Store', type: 'Shopify', orders: 45, revenue: 125000, status: 'Active' },
        { name: 'WooCommerce B2B', type: 'WooCommerce', orders: 18, revenue: 89000, status: 'Active' },
        { name: 'Amazon Egypt', type: 'Marketplace', orders: 23, revenue: 67500, status: 'Syncing' },
      ].map((ch, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-gray-900">{ch.name}</span>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${ch.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{ch.status}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-gray-50 rounded p-2"><p className="font-bold text-gray-900">{ch.orders}</p><p className="text-xs text-gray-500">Orders</p></div>
            <div className="bg-gray-50 rounded p-2"><p className="font-bold text-gray-900">{(ch.revenue / 1000).toFixed(0)}K</p><p className="text-xs text-gray-500">Revenue</p></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Pipeline Kanban
const PipelineView = () => {
  const stages = [
    { name: 'Qualification', deals: [{ name: 'Support Contract', amount: 95000 }] },
    { name: 'Proposal', deals: [{ name: 'Hardware Upgrade', amount: 180000 }, { name: 'Cloud Migration', amount: 120000 }] },
    { name: 'Negotiation', deals: [{ name: 'Enterprise License', amount: 450000 }] },
    { name: 'Closed Won', deals: [{ name: 'Training Package', amount: 45000 }] },
  ];
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Pipeline View</h1>
      <div className="grid grid-cols-4 gap-4">
        {stages.map((stage, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-700">{stage.name}</h3>
              <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs font-medium rounded-full">{stage.deals.length}</span>
            </div>
            <div className="space-y-3">
              {stage.deals.map((deal, j) => (
                <div key={j} className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                  <p className="font-medium text-gray-900 text-sm">{deal.name}</p>
                  <p className="text-sm font-semibold text-gray-900 mt-2">{formatCurrency(deal.amount)}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Leads View
const LeadsView = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">Add Lead</button>
    </div>
    <div className="grid grid-cols-4 gap-4 mb-4">
      {[{ label: 'New', count: 8, color: 'blue' }, { label: 'Contacted', count: 6, color: 'yellow' }, { label: 'Qualified', count: 5, color: 'green' }, { label: 'Converted', count: 4, color: 'purple' }].map((s, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className={`text-2xl font-bold text-${s.color}-600`}>{s.count}</p>
          <p className="text-sm text-gray-500">{s.label}</p>
        </div>
      ))}
    </div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Lead</th>
            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Company</th>
            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Rating</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {[
            { name: 'Mohamed Khaled', company: 'Pyramid Tech', status: 'New', rating: 'Hot' },
            { name: 'Fatma Ibrahim', company: 'Nile Software', status: 'Contacted', rating: 'Warm' },
            { name: 'Youssef Ahmed', company: 'Smart Systems', status: 'Qualified', rating: 'Hot' },
          ].map((l, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-4 font-medium text-gray-900">{l.name}</td>
              <td className="px-4 py-4 text-sm text-gray-600">{l.company}</td>
              <td className="px-4 py-4">
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                  l.status === 'New' ? 'bg-blue-100 text-blue-700' : l.status === 'Contacted' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                }`}>{l.status}</span>
              </td>
              <td className="px-4 py-4">
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${l.rating === 'Hot' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>{l.rating}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Placeholder
const PlaceholderView = ({ name }) => (
  <div className="p-6">
    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon name="layers" className="w-8 h-8 text-gray-400" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 capitalize">{name.replace(/-/g, ' ')}</h2>
      <p className="text-gray-500 mt-2">This view is ready to be implemented.</p>
    </div>
  </div>
);
