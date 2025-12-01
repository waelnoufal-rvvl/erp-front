'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, Settings, Bell, FileText, Activity, Menu, Search, 
  ChevronLeft, ChevronRight, ChevronDown, Sun, Moon, User, LogOut,
  Wallet, CreditCard, ShoppingCart, Package, FolderKanban, UserCircle, 
  BarChart3, HelpCircle, X, Building2, TrendingUp, TrendingDown,
  Clock, CheckCircle, AlertCircle, FileCheck
} from 'lucide-react';

// Navigation Data
const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '#', active: true },
  { 
    id: 'platform', label: 'Platform', icon: Settings, 
    children: [
      { id: 'workflow', label: 'Workflow Engine', badge: 5 },
      { id: 'notifications', label: 'Notifications' },
      { id: 'documents', label: 'Documents (EDMS)' },
      { id: 'monitoring', label: 'System Health' },
    ]
  },
  { 
    id: 'finance', label: 'Finance', icon: Wallet,
    children: [
      { id: 'gl', label: 'General Ledger' },
      { id: 'arap', label: 'AR/AP Views', badge: 3 },
      { id: 'budgeting', label: 'Budgeting' },
      { id: 'tax', label: 'Tax & Compliance' },
    ]
  },
  { 
    id: 'sales', label: 'Sales & CRM', icon: ShoppingCart,
    children: [
      { id: 'quotes', label: 'Quotations' },
      { id: 'orders', label: 'Sales Orders' },
      { id: 'crm', label: 'CRM / Pipeline' },
    ]
  },
  { 
    id: 'procurement', label: 'Procurement', icon: Package,
    children: [
      { id: 'purchasing', label: 'Purchasing' },
      { id: 'inventory', label: 'Inventory' },
      { id: 'production', label: 'Production' },
    ]
  },
  { 
    id: 'projects', label: 'Projects', icon: FolderKanban,
    children: [
      { id: 'jobcosting', label: 'Job Costing' },
      { id: 'contracts', label: 'Contracts & ICP', badge: 2 },
      { id: 'maintenance', label: 'Maintenance' },
    ]
  },
  { id: 'hr', label: 'HR & Payroll', icon: UserCircle },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
];

// Stat Card Component
const StatCard = ({ title, value, change, changeType, icon: Icon }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        {change && (
          <div className={`flex items-center gap-1 mt-2 text-sm ${changeType === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
            {changeType === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{change}</span>
          </div>
        )}
      </div>
      <div className="p-3 rounded-lg bg-blue-50">
        <Icon size={22} className="text-blue-600" />
      </div>
    </div>
  </div>
);

// Status Badge
const StatusBadge = ({ status }) => {
  const styles = {
    active: 'bg-blue-100 text-blue-700',
    approved: 'bg-emerald-100 text-emerald-700',
    pending: 'bg-amber-100 text-amber-700',
    draft: 'bg-slate-100 text-slate-600',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Main App Component
export default function ERPPreview() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState(['finance']);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = (id) => {
    setExpandedMenus(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className={`h-screen flex overflow-hidden ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        flex flex-col bg-slate-900 text-slate-200
        transition-all duration-300 ease-in-out
        ${sidebarCollapsed ? 'w-16' : 'w-64'}
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Building2 size={18} className="text-white" />
            </div>
            {!sidebarCollapsed && (
              <span className="font-semibold text-white">SAP B1 ERP</span>
            )}
          </div>
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex p-1.5 rounded hover:bg-slate-800"
          >
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-1.5 rounded hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {navigation.map((item) => (
            <div key={item.id} className="mb-1">
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-slate-800 ${expandedMenus.includes(item.id) ? 'bg-slate-800' : ''}`}
                  >
                    <item.icon size={20} className="flex-shrink-0 text-slate-400" />
                    {!sidebarCollapsed && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        <ChevronDown size={16} className={`transition-transform ${expandedMenus.includes(item.id) ? 'rotate-180' : ''}`} />
                      </>
                    )}
                  </button>
                  {!sidebarCollapsed && expandedMenus.includes(item.id) && (
                    <div className="ml-5 mt-1 space-y-1 border-l border-slate-700 pl-4">
                      {item.children.map((child) => (
                        <a
                          key={child.id}
                          href="#"
                          className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                          <span>{child.label}</span>
                          {child.badge && (
                            <span className="px-1.5 py-0.5 text-xs rounded-full bg-amber-500 text-white">
                              {child.badge}
                            </span>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href="#"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${item.active ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-slate-800'}`}
                >
                  <item.icon size={20} className={`flex-shrink-0 ${item.active ? 'text-blue-400' : 'text-slate-400'}`} />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </a>
              )}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-slate-700">
            <p className="text-xs text-slate-500">SAP B1 Integration v1.0</p>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`h-16 flex items-center justify-between px-4 border-b ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              <Menu size={20} />
            </button>
            
            {/* Search */}
            <div className={`hidden sm:flex items-center gap-2 rounded-lg px-3 py-2 w-64 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search... (Ctrl+K)"
                className={`bg-transparent outline-none text-sm flex-1 ${darkMode ? 'placeholder:text-slate-500' : 'placeholder:text-slate-400'}`}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button className={`relative p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}>
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            
            <button className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}>
              <HelpCircle size={20} />
            </button>

            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-medium text-blue-700">WA</span>
              </div>
              <ChevronDown size={16} className="text-slate-400" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className={`flex-1 overflow-y-auto p-6 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
          {/* Page Header */}
          <div className="mb-6">
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Dashboard</h1>
            <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Welcome back! Here's your business overview.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard 
              title="Active Contracts" 
              value="24" 
              change="+12% this month"
              changeType="up"
              icon={FileCheck}
            />
            <StatCard 
              title="Pending IPCs" 
              value="8" 
              change="3 awaiting approval"
              changeType="up"
              icon={Clock}
            />
            <StatCard 
              title="Revenue (YTD)" 
              value="$1.2M" 
              change="+8.2% vs last year"
              changeType="up"
              icon={TrendingUp}
            />
            <StatCard 
              title="Open Tasks" 
              value="12" 
              change="5 due today"
              changeType="down"
              icon={AlertCircle}
            />
          </div>

          {/* Recent Activity Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200">
              <h2 className="font-semibold text-slate-900">Recent Documents</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
                  <tr>
                    <th className="px-5 py-3 text-left font-medium">Document</th>
                    <th className="px-5 py-3 text-left font-medium">Type</th>
                    <th className="px-5 py-3 text-left font-medium">Status</th>
                    <th className="px-5 py-3 text-left font-medium">Date</th>
                    <th className="px-5 py-3 text-right font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 text-sm font-medium text-slate-900">IPC-2024-0042</td>
                    <td className="px-5 py-4 text-sm text-slate-600">Interim Certificate</td>
                    <td className="px-5 py-4"><StatusBadge status="pending" /></td>
                    <td className="px-5 py-4 text-sm text-slate-500">Nov 24, 2024</td>
                    <td className="px-5 py-4 text-sm text-slate-900 text-right font-medium">$125,000</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 text-sm font-medium text-slate-900">PO-2024-0156</td>
                    <td className="px-5 py-4 text-sm text-slate-600">Purchase Order</td>
                    <td className="px-5 py-4"><StatusBadge status="approved" /></td>
                    <td className="px-5 py-4 text-sm text-slate-500">Nov 23, 2024</td>
                    <td className="px-5 py-4 text-sm text-slate-900 text-right font-medium">$45,200</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 text-sm font-medium text-slate-900">CNT-2024-0018</td>
                    <td className="px-5 py-4 text-sm text-slate-600">Contract</td>
                    <td className="px-5 py-4"><StatusBadge status="active" /></td>
                    <td className="px-5 py-4 text-sm text-slate-500">Nov 22, 2024</td>
                    <td className="px-5 py-4 text-sm text-slate-900 text-right font-medium">$890,000</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 text-sm font-medium text-slate-900">SO-2024-0289</td>
                    <td className="px-5 py-4 text-sm text-slate-600">Sales Order</td>
                    <td className="px-5 py-4"><StatusBadge status="draft" /></td>
                    <td className="px-5 py-4 text-sm text-slate-500">Nov 21, 2024</td>
                    <td className="px-5 py-4 text-sm text-slate-900 text-right font-medium">$12,500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
