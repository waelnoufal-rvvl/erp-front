'use client';

// ============================================================
// UNIFIED ERP DASHBOARD - Main Application Shell
// Multi-Tenant ERP System with SAP Business One Integration
// All Modules Under One Roof
// ============================================================

import React, { useState } from 'react';
import {
  // Navigation & Layout
  LayoutDashboard, ChevronDown, ChevronRight, Menu, X, Search,
  Bell, Settings, User, LogOut, Building2, Moon, Sun,
  
  // Section 8: Finance
  Calculator, Landmark, Receipt, PiggyBank, Scale, Coins, Building,
  
  // Section 9: Sales & CRM
  ShoppingCart, Users, Target, Store, Globe, Gift, TrendingUp,
  FileText, CreditCard, Percent, Tag, Heart,
  
  // Section 10: Procurement & Inventory
  Package, Truck, ClipboardList, Warehouse, Factory, CheckSquare,
  
  // Section 11: Projects & Service
  FolderKanban, FileSignature, Repeat, Wrench, HardHat,
  
  // Section 12: HR & Payroll
  UserCircle, Clock, Calendar, Wallet,
  
  // Section 13: Reports
  BarChart3, PieChart, FileBarChart, Send,
  
  // General
  Home, Zap, Database, Shield, HelpCircle, ExternalLink,
  AlertCircle, CheckCircle2, Loader2, ArrowUpRight, Plus,
  Eye, Edit, MoreHorizontal, RefreshCw, Download, Upload,
  Filter, SortAsc, Layers, Grid3X3, List, Activity
} from 'lucide-react';

// ============================================================
// TYPES
// ============================================================

type ModuleStatus = 'ready' | 'coming-soon' | 'in-progress';

interface NavItem {
  id: string;
  label: string;
  icon: any;
  href?: string;
  status?: ModuleStatus;
  badge?: string | number;
  children?: NavItem[];
}

interface NavSection {
  id: string;
  title: string;
  icon: any;
  color: string;
  items: NavItem[];
}

// ============================================================
// NAVIGATION CONFIGURATION
// ============================================================

const navigationConfig: NavSection[] = [
  // SECTION 8: FINANCE
  {
    id: 'finance',
    title: 'Finance',
    icon: Calculator,
    color: 'emerald',
    items: [
      {
        id: 'finance-core',
        label: 'Finance Core',
        icon: Landmark,
        status: 'ready',
        children: [
          { id: 'chart-of-accounts', label: 'Chart of Accounts', icon: Layers, href: '/finance/coa' },
          { id: 'journal-entries', label: 'Journal Entries', icon: FileText, href: '/finance/journals' },
          { id: 'bank-accounts', label: 'Bank & Cash', icon: Building, href: '/finance/bank' },
          { id: 'reconciliation', label: 'Reconciliation', icon: CheckSquare, href: '/finance/reconciliation' },
          { id: 'fiscal-periods', label: 'Fiscal Periods', icon: Calendar, href: '/finance/periods' },
        ]
      },
      {
        id: 'finance-lite',
        label: 'Finance Lite',
        icon: Receipt,
        status: 'ready',
        children: [
          { id: 'ar-aging', label: 'AR Aging', icon: TrendingUp, href: '/finance-lite/ar' },
          { id: 'ap-aging', label: 'AP Aging', icon: TrendingUp, href: '/finance-lite/ap' },
          { id: 'approvals', label: 'Approvals', icon: CheckSquare, href: '/finance-lite/approvals', badge: 5 },
          { id: 'payments', label: 'Payments', icon: CreditCard, href: '/finance-lite/payments' },
        ]
      },
      {
        id: 'budgeting',
        label: 'Budgeting & Cost Control',
        icon: PiggyBank,
        status: 'coming-soon',
        children: [
          { id: 'budgets', label: 'Budgets', icon: FileText, href: '/budgeting/budgets' },
          { id: 'budget-vs-actual', label: 'Budget vs Actual', icon: BarChart3, href: '/budgeting/vs-actual' },
          { id: 'cost-centers', label: 'Cost Centers', icon: Building2, href: '/budgeting/cost-centers' },
        ]
      },
      {
        id: 'cost-accounting',
        label: 'Cost Accounting',
        icon: Scale,
        status: 'coming-soon',
        children: [
          { id: 'distribution-rules', label: 'Distribution Rules', icon: Repeat, href: '/cost/rules' },
          { id: 'allocation-runs', label: 'Allocation Runs', icon: Zap, href: '/cost/allocation' },
        ]
      },
      {
        id: 'tax-compliance',
        label: 'Tax & Compliance',
        icon: Shield,
        status: 'coming-soon',
        children: [
          { id: 'tax-codes', label: 'Tax Codes', icon: Tag, href: '/tax/codes' },
          { id: 'tax-returns', label: 'Tax Returns', icon: FileText, href: '/tax/returns' },
          { id: 'e-invoicing', label: 'E-Invoicing', icon: Send, href: '/tax/e-invoicing' },
        ]
      },
      {
        id: 'fixed-assets',
        label: 'Fixed Assets',
        icon: Building,
        status: 'coming-soon',
        children: [
          { id: 'asset-master', label: 'Asset Master', icon: Database, href: '/assets/master' },
          { id: 'depreciation', label: 'Depreciation', icon: TrendingUp, href: '/assets/depreciation' },
        ]
      },
    ]
  },
  
  // SECTION 9: SALES & CRM
  {
    id: 'sales',
    title: 'Sales & CRM',
    icon: ShoppingCart,
    color: 'blue',
    items: [
      {
        id: 'sales-core',
        label: 'Sales Core',
        icon: ShoppingCart,
        status: 'ready',
        children: [
          { id: 'quotations', label: 'Quotations', icon: FileText, href: '/sales/quotations', badge: 12 },
          { id: 'sales-orders', label: 'Sales Orders', icon: ClipboardList, href: '/sales/orders', badge: 8 },
          { id: 'deliveries', label: 'Deliveries', icon: Truck, href: '/sales/deliveries' },
          { id: 'invoices', label: 'Invoices', icon: Receipt, href: '/sales/invoices' },
          { id: 'pricing', label: 'Pricing & Discounts', icon: Percent, href: '/sales/pricing' },
        ]
      },
      {
        id: 'crm',
        label: 'CRM & Pipeline',
        icon: Users,
        status: 'ready',
        children: [
          { id: 'accounts', label: 'Accounts', icon: Building2, href: '/crm/accounts' },
          { id: 'contacts', label: 'Contacts', icon: User, href: '/crm/contacts' },
          { id: 'leads', label: 'Leads', icon: Target, href: '/crm/leads', badge: 23 },
          { id: 'opportunities', label: 'Opportunities', icon: TrendingUp, href: '/crm/opportunities' },
          { id: 'pipeline', label: 'Pipeline View', icon: Layers, href: '/crm/pipeline' },
          { id: 'activities', label: 'Activities', icon: Calendar, href: '/crm/activities' },
          { id: 'campaigns', label: 'Campaigns', icon: Zap, href: '/crm/campaigns' },
        ]
      },
      {
        id: 'pos',
        label: 'POS / Retail',
        icon: Store,
        status: 'ready',
        children: [
          { id: 'pos-terminal', label: 'POS Terminal', icon: ShoppingCart, href: '/pos/terminal' },
          { id: 'pos-transactions', label: 'Transactions', icon: Receipt, href: '/pos/transactions' },
          { id: 'cash-sessions', label: 'Cash Sessions', icon: Wallet, href: '/pos/cash-sessions' },
          { id: 'stores', label: 'Stores', icon: Store, href: '/pos/stores' },
          { id: 'registers', label: 'Registers', icon: Database, href: '/pos/registers' },
          { id: 'promotions', label: 'Promotions', icon: Tag, href: '/pos/promotions' },
        ]
      },
      {
        id: 'ecommerce',
        label: 'E-Commerce',
        icon: Globe,
        status: 'ready',
        children: [
          { id: 'channels', label: 'Channels', icon: Layers, href: '/ecommerce/channels' },
          { id: 'online-orders', label: 'Online Orders', icon: ShoppingCart, href: '/ecommerce/orders', badge: 35 },
          { id: 'products-sync', label: 'Products Sync', icon: RefreshCw, href: '/ecommerce/products' },
          { id: 'customers-sync', label: 'Customers', icon: Users, href: '/ecommerce/customers' },
          { id: 'sync-status', label: 'Sync Status', icon: Activity, href: '/ecommerce/sync' },
        ]
      },
      {
        id: 'loyalty',
        label: 'Loyalty & Rewards',
        icon: Gift,
        status: 'coming-soon',
        children: [
          { id: 'loyalty-accounts', label: 'Loyalty Accounts', icon: Users, href: '/loyalty/accounts' },
          { id: 'points-rules', label: 'Points Rules', icon: Tag, href: '/loyalty/rules' },
          { id: 'redemptions', label: 'Redemptions', icon: Gift, href: '/loyalty/redemptions' },
          { id: 'tiers', label: 'Membership Tiers', icon: Layers, href: '/loyalty/tiers' },
        ]
      },
    ]
  },
  
  // SECTION 10: PROCUREMENT & INVENTORY
  {
    id: 'procurement',
    title: 'Procurement & Inventory',
    icon: Package,
    color: 'orange',
    items: [
      {
        id: 'purchasing',
        label: 'Purchasing',
        icon: ClipboardList,
        status: 'coming-soon',
        children: [
          { id: 'requisitions', label: 'Requisitions', icon: FileText, href: '/procurement/requisitions' },
          { id: 'rfq', label: 'RFQ', icon: FileText, href: '/procurement/rfq' },
          { id: 'purchase-orders', label: 'Purchase Orders', icon: ClipboardList, href: '/procurement/orders' },
          { id: 'grpo', label: 'Goods Receipt', icon: Package, href: '/procurement/grpo' },
          { id: 'ap-invoices', label: 'AP Invoices', icon: Receipt, href: '/procurement/invoices' },
          { id: 'vendors', label: 'Vendors', icon: Building2, href: '/procurement/vendors' },
        ]
      },
      {
        id: 'inventory',
        label: 'Inventory',
        icon: Warehouse,
        status: 'coming-soon',
        children: [
          { id: 'items', label: 'Items Master', icon: Package, href: '/inventory/items' },
          { id: 'warehouses', label: 'Warehouses', icon: Warehouse, href: '/inventory/warehouses' },
          { id: 'stock-transfers', label: 'Stock Transfers', icon: Repeat, href: '/inventory/transfers' },
          { id: 'stock-count', label: 'Stock Count', icon: ClipboardList, href: '/inventory/count' },
          { id: 'stock-reports', label: 'Stock Reports', icon: BarChart3, href: '/inventory/reports' },
        ]
      },
      {
        id: 'production',
        label: 'Production / MRP',
        icon: Factory,
        status: 'coming-soon',
        children: [
          { id: 'bom', label: 'Bill of Materials', icon: Layers, href: '/production/bom' },
          { id: 'work-orders', label: 'Work Orders', icon: ClipboardList, href: '/production/work-orders' },
          { id: 'mrp', label: 'MRP Wizard', icon: Zap, href: '/production/mrp' },
        ]
      },
      {
        id: 'quality',
        label: 'Quality Management',
        icon: CheckSquare,
        status: 'coming-soon',
        children: [
          { id: 'inspections', label: 'Inspections', icon: Eye, href: '/quality/inspections' },
          { id: 'defects', label: 'Defects', icon: AlertCircle, href: '/quality/defects' },
          { id: 'certifications', label: 'Certifications', icon: Shield, href: '/quality/certifications' },
        ]
      },
    ]
  },
  
  // SECTION 11: PROJECTS & SERVICE
  {
    id: 'projects',
    title: 'Projects & Service',
    icon: FolderKanban,
    color: 'purple',
    items: [
      {
        id: 'project-management',
        label: 'Project Management',
        icon: FolderKanban,
        status: 'coming-soon',
        children: [
          { id: 'projects-list', label: 'Projects', icon: FolderKanban, href: '/projects/list' },
          { id: 'wbs', label: 'WBS / Tasks', icon: Layers, href: '/projects/wbs' },
          { id: 'resources', label: 'Resources', icon: Users, href: '/projects/resources' },
          { id: 'project-budget', label: 'Project Budget', icon: PiggyBank, href: '/projects/budget' },
          { id: 'gantt', label: 'Gantt Chart', icon: BarChart3, href: '/projects/gantt' },
        ]
      },
      {
        id: 'contracts',
        label: 'Contract Management',
        icon: FileSignature,
        status: 'coming-soon',
        children: [
          { id: 'contracts-list', label: 'Contracts', icon: FileSignature, href: '/contracts/list' },
          { id: 'milestones', label: 'Milestones', icon: Target, href: '/contracts/milestones' },
          { id: 'billing-schedule', label: 'Billing Schedule', icon: Calendar, href: '/contracts/billing' },
          { id: 'revenue-recognition', label: 'Revenue Recognition', icon: TrendingUp, href: '/contracts/revenue' },
        ]
      },
      {
        id: 'icp',
        label: 'Inter-Company (ICP)',
        icon: Repeat,
        status: 'coming-soon',
        children: [
          { id: 'icp-transactions', label: 'ICP Transactions', icon: Repeat, href: '/icp/transactions' },
          { id: 'icp-reconciliation', label: 'ICP Reconciliation', icon: CheckSquare, href: '/icp/reconciliation' },
        ]
      },
      {
        id: 'field-service',
        label: 'Field Service',
        icon: Wrench,
        status: 'coming-soon',
        children: [
          { id: 'service-calls', label: 'Service Calls', icon: Wrench, href: '/service/calls' },
          { id: 'technicians', label: 'Technicians', icon: HardHat, href: '/service/technicians' },
          { id: 'scheduling', label: 'Scheduling', icon: Calendar, href: '/service/scheduling' },
          { id: 'mobile-app', label: 'Mobile App', icon: ExternalLink, href: '/service/mobile' },
        ]
      },
    ]
  },
  
  // SECTION 12: HR & PAYROLL
  {
    id: 'hr',
    title: 'HR & Payroll',
    icon: UserCircle,
    color: 'pink',
    items: [
      {
        id: 'employee-master',
        label: 'Employee Master',
        icon: Users,
        status: 'coming-soon',
        children: [
          { id: 'employees', label: 'Employees', icon: User, href: '/hr/employees' },
          { id: 'departments', label: 'Departments', icon: Building2, href: '/hr/departments' },
          { id: 'positions', label: 'Positions', icon: UserCircle, href: '/hr/positions' },
          { id: 'org-chart', label: 'Org Chart', icon: Layers, href: '/hr/org-chart' },
        ]
      },
      {
        id: 'attendance',
        label: 'Attendance & Time',
        icon: Clock,
        status: 'coming-soon',
        children: [
          { id: 'attendance-log', label: 'Attendance Log', icon: Clock, href: '/hr/attendance' },
          { id: 'timesheets', label: 'Timesheets', icon: Calendar, href: '/hr/timesheets' },
          { id: 'leave-requests', label: 'Leave Requests', icon: Calendar, href: '/hr/leave' },
          { id: 'overtime', label: 'Overtime', icon: Clock, href: '/hr/overtime' },
        ]
      },
      {
        id: 'payroll',
        label: 'Payroll',
        icon: Wallet,
        status: 'coming-soon',
        children: [
          { id: 'payroll-run', label: 'Payroll Run', icon: Zap, href: '/hr/payroll/run' },
          { id: 'payslips', label: 'Payslips', icon: FileText, href: '/hr/payroll/payslips' },
          { id: 'deductions', label: 'Deductions', icon: Percent, href: '/hr/payroll/deductions' },
          { id: 'bank-file', label: 'Bank File', icon: Download, href: '/hr/payroll/bank' },
        ]
      },
    ]
  },
  
  // SECTION 13: REPORTS & ANALYTICS
  {
    id: 'reports',
    title: 'Reports & Analytics',
    icon: BarChart3,
    color: 'cyan',
    items: [
      {
        id: 'dashboards',
        label: 'Dashboards',
        icon: LayoutDashboard,
        status: 'coming-soon',
        children: [
          { id: 'executive-dashboard', label: 'Executive Dashboard', icon: BarChart3, href: '/reports/executive' },
          { id: 'sales-dashboard', label: 'Sales Dashboard', icon: TrendingUp, href: '/reports/sales' },
          { id: 'finance-dashboard', label: 'Finance Dashboard', icon: PiggyBank, href: '/reports/finance' },
          { id: 'custom-dashboards', label: 'Custom Dashboards', icon: Grid3X3, href: '/reports/custom' },
        ]
      },
      {
        id: 'report-builder',
        label: 'Report Builder',
        icon: FileBarChart,
        status: 'coming-soon',
        children: [
          { id: 'report-designer', label: 'Report Designer', icon: Edit, href: '/reports/designer' },
          { id: 'report-templates', label: 'Templates', icon: Layers, href: '/reports/templates' },
          { id: 'saved-reports', label: 'Saved Reports', icon: FileText, href: '/reports/saved' },
        ]
      },
      {
        id: 'scheduled-reports',
        label: 'Scheduled Reports',
        icon: Send,
        status: 'coming-soon',
        children: [
          { id: 'schedules', label: 'Schedules', icon: Calendar, href: '/reports/schedules' },
          { id: 'recipients', label: 'Recipients', icon: Users, href: '/reports/recipients' },
          { id: 'history', label: 'Delivery History', icon: Clock, href: '/reports/history' },
        ]
      },
    ]
  },
];

// ============================================================
// MAIN ERP SHELL COMPONENT
// ============================================================

export const ERPDashboardShell: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState<string[]>(['sales']);
  const [expandedItems, setExpandedItems] = useState<string[]>(['crm']);
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleItem = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const navigateTo = (href: string) => {
    setCurrentPath(href);
  };

  const getColorClasses = (color: string, variant: 'bg' | 'text' | 'border' | 'light' = 'bg') => {
    const colors: Record<string, Record<string, string>> = {
      emerald: { bg: 'bg-emerald-500', text: 'text-emerald-600', border: 'border-emerald-500', light: 'bg-emerald-50' },
      blue: { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-500', light: 'bg-blue-50' },
      orange: { bg: 'bg-orange-500', text: 'text-orange-600', border: 'border-orange-500', light: 'bg-orange-50' },
      purple: { bg: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-500', light: 'bg-purple-50' },
      pink: { bg: 'bg-pink-500', text: 'text-pink-600', border: 'border-pink-500', light: 'bg-pink-50' },
      cyan: { bg: 'bg-cyan-500', text: 'text-cyan-600', border: 'border-cyan-500', light: 'bg-cyan-50' },
    };
    return colors[color]?.[variant] || colors.blue[variant];
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      {/* Top Header */}
      <header className={`fixed top-0 left-0 right-0 h-14 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b z-50 flex items-center px-4`}>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <Menu className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 ml-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>ERP System</h1>
            <p className="text-xs text-gray-500">SAP B1 Integration</p>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search modules, documents, customers..." 
              className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-100 border-gray-200 text-gray-900'
              } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-gray-200 text-gray-500 text-xs rounded">⌘K</kbd>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            {darkMode ? <Sun className="w-5 h-5 text-gray-300" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
          
          <button className={`p-2 rounded-lg relative ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <Bell className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <Settings className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          {/* Tenant Selector */}
          <button className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <Building2 className={`w-4 h-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Acme Corp</span>
            <ChevronDown className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </button>

          {/* User Menu */}
          <button className="flex items-center gap-2 ml-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">WA</span>
            </div>
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-14 bottom-0 ${sidebarOpen ? 'w-64' : 'w-16'} ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r transition-all duration-300 z-40 overflow-y-auto`}>
        {/* Home Link */}
        <div className="p-2">
          <button 
            onClick={() => navigateTo('/dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${
              currentPath === '/dashboard' 
                ? 'bg-blue-50 text-blue-700' 
                : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Home className="w-5 h-5" />
            {sidebarOpen && <span className="font-medium">Dashboard</span>}
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="p-2">
          {navigationConfig.map((section) => (
            <div key={section.id} className="mb-2">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-md ${getColorClasses(section.color, 'bg')} flex items-center justify-center`}>
                    <section.icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  {sidebarOpen && (
                    <span className={`font-semibold text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {section.title}
                    </span>
                  )}
                </div>
                {sidebarOpen && (
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.includes(section.id) ? 'rotate-180' : ''}`} />
                )}
              </button>

              {/* Section Items */}
              {sidebarOpen && expandedSections.includes(section.id) && (
                <div className="ml-3 mt-1 space-y-0.5">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      {/* Item with children */}
                      <button
                        onClick={() => item.children ? toggleItem(item.id) : navigateTo(item.href || '')}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
                          darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="w-4 h-4" />
                          <span>{item.label}</span>
                          {item.status === 'coming-soon' && (
                            <span className="px-1.5 py-0.5 bg-gray-200 text-gray-500 text-xs rounded">Soon</span>
                          )}
                          {item.status === 'ready' && (
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          )}
                        </div>
                        {item.children && (
                          <ChevronRight className={`w-3 h-3 text-gray-400 transition-transform ${expandedItems.includes(item.id) ? 'rotate-90' : ''}`} />
                        )}
                      </button>

                      {/* Children */}
                      {item.children && expandedItems.includes(item.id) && (
                        <div className="ml-6 mt-0.5 space-y-0.5">
                          {item.children.map((child) => (
                            <button
                              key={child.id}
                              onClick={() => navigateTo(child.href || '')}
                              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-sm ${
                                currentPath === child.href
                                  ? `${getColorClasses(section.color, 'light')} ${getColorClasses(section.color, 'text')}`
                                  : darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <child.icon className="w-3.5 h-3.5" />
                                <span>{child.label}</span>
                              </div>
                              {child.badge && (
                                <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${
                                  currentPath === child.href 
                                    ? `${getColorClasses(section.color, 'bg')} text-white` 
                                    : 'bg-gray-200 text-gray-600'
                                }`}>
                                  {child.badge}
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* SAP Status */}
        {sidebarOpen && (
          <div className={`absolute bottom-0 left-0 right-0 p-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className={`rounded-lg p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-2 mb-2">
                <Database className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>SAP B1 Status</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Connected • SBO_Demo</span>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className={`${sidebarOpen ? 'ml-64' : 'ml-16'} mt-14 transition-all duration-300`}>
        <MainDashboard currentPath={currentPath} darkMode={darkMode} />
      </main>
    </div>
  );
};

// ============================================================
// MAIN DASHBOARD CONTENT
// ============================================================

const MainDashboard: React.FC<{ currentPath: string; darkMode: boolean }> = ({ currentPath, darkMode }) => {
  // Show module-specific content based on path, or main dashboard
  if (currentPath !== '/dashboard') {
    return <ModulePlaceholder path={currentPath} darkMode={darkMode} />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-500 to-indigo-600'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back, Wael! 👋</h1>
            <p className="text-blue-100 mt-1">Here's what's happening with your business today.</p>
          </div>
          <div className="text-right text-white">
            <p className="text-sm text-blue-200">Thursday, November 27, 2025</p>
            <p className="text-2xl font-bold">6:08 PM</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Sales", value: 'EGP 281.5K', change: '+18%', icon: TrendingUp, color: 'blue' },
          { label: 'Open Orders', value: '43', change: '12 urgent', icon: ShoppingCart, color: 'orange' },
          { label: 'Pending Approvals', value: '8', change: '3 overdue', icon: CheckSquare, color: 'purple' },
          { label: 'SAP Sync Queue', value: '5', change: '1 failed', icon: Database, color: 'red' },
        ].map((stat, idx) => (
          <div key={idx} className={`rounded-xl p-5 ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                <p className={`text-2xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                <p className={`text-xs mt-1 ${stat.color === 'red' ? 'text-red-500' : 'text-green-500'}`}>{stat.change}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-50`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Module Quick Access */}
      <div>
        <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'New Quote', icon: FileText, color: 'blue', module: 'Sales' },
            { label: 'POS Terminal', icon: Store, color: 'orange', module: 'Retail' },
            { label: 'E-Commerce Orders', icon: Globe, color: 'indigo', module: 'E-Com', badge: 35 },
            { label: 'Leads', icon: Target, color: 'green', module: 'CRM', badge: 23 },
            { label: 'Approvals', icon: CheckSquare, color: 'purple', module: 'Finance', badge: 8 },
            { label: 'Inventory', icon: Package, color: 'cyan', module: 'Stock' },
          ].map((action, idx) => (
            <button key={idx} className={`rounded-xl p-4 text-center ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors relative`}>
              <div className={`w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center bg-${action.color}-50`}>
                <action.icon className={`w-6 h-6 text-${action.color}-600`} />
              </div>
              <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{action.label}</p>
              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{action.module}</p>
              {action.badge && (
                <span className="absolute top-2 right-2 px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full">
                  {action.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Module Status Grid */}
      <div>
        <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Module Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {navigationConfig.map((section) => {
            const readyCount = section.items.filter(i => i.status === 'ready').length;
            const totalCount = section.items.length;
            return (
              <div key={section.id} className={`rounded-xl p-5 ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${getColorClasses(section.color, 'bg')} flex items-center justify-center`}>
                    <section.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{section.title}</h3>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{readyCount}/{totalCount} modules ready</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {section.items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <item.icon className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.label}</span>
                      </div>
                      {item.status === 'ready' ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <span className="text-xs text-gray-400">Coming Soon</span>
                      )}
                    </div>
                  ))}
                  {section.items.length > 3 && (
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>+{section.items.length - 3} more</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MODULE PLACEHOLDER
// ============================================================

const ModulePlaceholder: React.FC<{ path: string; darkMode: boolean }> = ({ path, darkMode }) => {
  const pathParts = path.split('/').filter(Boolean);
  const moduleName = pathParts.join(' > ').replace(/-/g, ' ');

  return (
    <div className="p-6">
      <div className={`rounded-xl p-12 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Layers className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className={`text-xl font-bold capitalize ${darkMode ? 'text-white' : 'text-gray-900'}`}>{moduleName}</h2>
        <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          This module view will load the corresponding component.
        </p>
        <p className={`text-sm mt-4 font-mono ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{path}</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            Load Module
          </button>
          <button className={`px-4 py-2 border rounded-lg text-sm font-medium ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-600'}`}>
            View Documentation
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function for color classes
const getColorClasses = (color: string, variant: string) => {
  const colors: Record<string, Record<string, string>> = {
    emerald: { bg: 'bg-emerald-500', text: 'text-emerald-600', light: 'bg-emerald-50' },
    blue: { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-50' },
    pink: { bg: 'bg-pink-500', text: 'text-pink-600', light: 'bg-pink-50' },
    cyan: { bg: 'bg-cyan-500', text: 'text-cyan-600', light: 'bg-cyan-50' },
  };
  return colors[color]?.[variant] || colors.blue[variant];
};

// ============================================================
// EXPORT
// ============================================================

export default ERPDashboardShell;
