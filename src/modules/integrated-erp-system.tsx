'use client';

// ============================================================
// INTEGRATED ERP SYSTEM - All Modules Connected
// Multi-Tenant ERP System with SAP Business One Integration
// ============================================================

import React, { useState } from 'react';
import FinanceCoreUIAlt from './previews/finance-core-ui-alt';
import FinanceCoreComplete1 from './previews/finance-core-complete-1';
import FinanceCoreComplete2 from './previews/finance-core-complete-2';
import FinanceLiteModule from './previews/finance-lite-module';
import FinanceLiteModule2 from './previews/finance-lite-module-2';
import FinanceLiteForms from './previews/finance-lite-forms';
import SalesCorePart1 from './previews/sales-core-part1';
import SalesCorePart2 from './previews/sales-core-part2';
import SalesCorePart3 from './previews/sales-core-part3';
import {
  // Navigation & Layout
  LayoutDashboard, ChevronDown, ChevronRight, Menu, X, Search,
  Bell, Settings, User, LogOut, Building2, Moon, Sun,
  
  // Section 8: Finance
  Calculator, Landmark, Receipt, PiggyBank, Scale, Coins, Building,
  
  // Section 9: Sales & CRM
  ShoppingCart, Users, Target, Store, Globe, Gift, TrendingUp,
  FileText, CreditCard, Percent, Tag, Heart, UserPlus, Phone,
  Mail, MessageSquare, Star, Award, Briefcase, DollarSign,
  
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
  Filter, SortAsc, Layers, Grid3X3, List, Activity,
  ArrowRight, Trash2, Copy, Pause, Play, Lock, Unlock,
  Banknote, MapPin, Wifi, WifiOff, Barcode, Printer,
  QrCode, RotateCcw, XCircle, ChevronLeft
} from 'lucide-react';

// ============================================================
// TYPES
// ============================================================

type ModuleView = 
  // Main
  | 'dashboard'
  // Finance
  | 'finance-coa' | 'finance-journals' | 'finance-bank'
  | 'finance-ar' | 'finance-ap' | 'finance-approvals'
  // Sales Core
  | 'sales-dashboard' | 'quotations' | 'sales-orders' | 'deliveries' | 'invoices' | 'pricing'
  // CRM
  | 'crm-dashboard' | 'accounts' | 'contacts' | 'leads' | 'opportunities' | 'pipeline' | 'activities' | 'campaigns' | 'quotes'
  // POS
  | 'pos-dashboard' | 'pos-terminal' | 'pos-transactions' | 'cash-sessions' | 'stores' | 'registers' | 'pos-promotions' | 'items-cache' | 'sap-sync'
  // E-Commerce  
  | 'ecom-dashboard' | 'channels' | 'channel-detail' | 'online-orders' | 'order-detail' | 'ecom-products' | 'ecom-customers' | 'sync-jobs'
  // Placeholders
  | 'placeholder';

// ============================================================
// NAVIGATION CONFIG
// ============================================================

interface NavItem {
  id: string;
  label: string;
  icon: any;
  view?: ModuleView;
  status?: 'ready' | 'coming-soon';
  badge?: number;
  children?: NavItem[];
}

interface NavSection {
  id: string;
  title: string;
  icon: any;
  color: string;
  items: NavItem[];
}

const navigationConfig: NavSection[] = [
  {
    id: 'finance',
    title: 'Finance',
    icon: Calculator,
    color: 'emerald',
    items: [
      {
        id: 'finance-core', label: 'Finance Core', icon: Landmark, status: 'ready',
        children: [
          { id: 'coa', label: 'Chart of Accounts', icon: Layers, view: 'finance-coa' },
          { id: 'journals', label: 'Journal Entries', icon: FileText, view: 'finance-journals' },
          { id: 'bank', label: 'Bank & Cash', icon: Building, view: 'finance-bank' },
        ]
      },
      {
        id: 'finance-lite', label: 'Finance Lite', icon: Receipt, status: 'ready',
        children: [
          { id: 'ar', label: 'AR Aging', icon: TrendingUp, view: 'finance-ar' },
          { id: 'ap', label: 'AP Aging', icon: TrendingUp, view: 'finance-ap' },
          { id: 'approvals', label: 'Approvals', icon: CheckSquare, view: 'finance-approvals', badge: 5 },
        ]
      },
    ]
  },
  {
    id: 'sales',
    title: 'Sales & CRM',
    icon: ShoppingCart,
    color: 'blue',
    items: [
      {
        id: 'sales-core', label: 'Sales Core', icon: ShoppingCart, status: 'ready',
        children: [
          { id: 'sales-dashboard', label: 'Dashboard', icon: LayoutDashboard, view: 'sales-dashboard' },
          { id: 'quotations', label: 'Quotations', icon: FileText, view: 'quotations', badge: 12 },
          { id: 'sales-orders', label: 'Sales Orders', icon: ClipboardList, view: 'sales-orders', badge: 8 },
          { id: 'deliveries', label: 'Deliveries', icon: Truck, view: 'deliveries' },
          { id: 'invoices', label: 'Invoices', icon: Receipt, view: 'invoices' },
          { id: 'pricing', label: 'Pricing & Discounts', icon: Percent, view: 'pricing' },
        ]
      },
      {
        id: 'crm', label: 'CRM & Pipeline', icon: Users, status: 'ready',
        children: [
          { id: 'crm-dashboard', label: 'Dashboard', icon: LayoutDashboard, view: 'crm-dashboard' },
          { id: 'accounts', label: 'Accounts', icon: Building2, view: 'accounts' },
          { id: 'contacts', label: 'Contacts', icon: User, view: 'contacts' },
          { id: 'leads', label: 'Leads', icon: Target, view: 'leads', badge: 23 },
          { id: 'opportunities', label: 'Opportunities', icon: TrendingUp, view: 'opportunities' },
          { id: 'pipeline', label: 'Pipeline View', icon: Layers, view: 'pipeline' },
          { id: 'activities', label: 'Activities', icon: Calendar, view: 'activities' },
          { id: 'campaigns', label: 'Campaigns', icon: Zap, view: 'campaigns' },
          { id: 'quotes', label: 'Quotes', icon: FileText, view: 'quotes' },
        ]
      },
      {
        id: 'pos', label: 'POS / Retail', icon: Store, status: 'ready',
        children: [
          { id: 'pos-dashboard', label: 'Dashboard', icon: LayoutDashboard, view: 'pos-dashboard' },
          { id: 'pos-terminal', label: 'POS Terminal', icon: ShoppingCart, view: 'pos-terminal' },
          { id: 'pos-transactions', label: 'Transactions', icon: Receipt, view: 'pos-transactions' },
          { id: 'cash-sessions', label: 'Cash Sessions', icon: Wallet, view: 'cash-sessions' },
          { id: 'stores', label: 'Stores', icon: Store, view: 'stores' },
          { id: 'registers', label: 'Registers', icon: Database, view: 'registers' },
          { id: 'pos-promotions', label: 'Promotions', icon: Tag, view: 'pos-promotions' },
          { id: 'items-cache', label: 'Items Cache', icon: Package, view: 'items-cache' },
          { id: 'sap-sync', label: 'SAP Sync Queue', icon: RefreshCw, view: 'sap-sync' },
        ]
      },
      {
        id: 'ecommerce', label: 'E-Commerce', icon: Globe, status: 'ready',
        children: [
          { id: 'ecom-dashboard', label: 'Dashboard', icon: LayoutDashboard, view: 'ecom-dashboard' },
          { id: 'channels', label: 'Channels', icon: Layers, view: 'channels' },
          { id: 'online-orders', label: 'Online Orders', icon: ShoppingCart, view: 'online-orders', badge: 35 },
          { id: 'ecom-products', label: 'Products Sync', icon: Package, view: 'ecom-products' },
          { id: 'ecom-customers', label: 'Customers', icon: Users, view: 'ecom-customers' },
          { id: 'sync-jobs', label: 'Sync Jobs', icon: Activity, view: 'sync-jobs' },
        ]
      },
      {
        id: 'loyalty', label: 'Loyalty & Rewards', icon: Gift, status: 'coming-soon',
        children: [
          { id: 'loyalty-accounts', label: 'Loyalty Accounts', icon: Users, view: 'placeholder' },
          { id: 'points-rules', label: 'Points Rules', icon: Tag, view: 'placeholder' },
        ]
      },
    ]
  },
  {
    id: 'procurement',
    title: 'Procurement',
    icon: Package,
    color: 'orange',
    items: [
      {
        id: 'purchasing', label: 'Purchasing', icon: ClipboardList, status: 'coming-soon',
        children: [
          { id: 'requisitions', label: 'Requisitions', icon: FileText, view: 'placeholder' },
          { id: 'purchase-orders', label: 'Purchase Orders', icon: ClipboardList, view: 'placeholder' },
        ]
      },
      {
        id: 'inventory', label: 'Inventory', icon: Warehouse, status: 'coming-soon',
        children: [
          { id: 'items', label: 'Items Master', icon: Package, view: 'placeholder' },
          { id: 'warehouses', label: 'Warehouses', icon: Warehouse, view: 'placeholder' },
        ]
      },
    ]
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: FolderKanban,
    color: 'purple',
    items: [
      {
        id: 'project-mgmt', label: 'Project Management', icon: FolderKanban, status: 'coming-soon',
        children: [
          { id: 'projects-list', label: 'Projects', icon: FolderKanban, view: 'placeholder' },
        ]
      },
      {
        id: 'contracts', label: 'Contracts', icon: FileSignature, status: 'coming-soon',
        children: [
          { id: 'contracts-list', label: 'Contracts', icon: FileSignature, view: 'placeholder' },
        ]
      },
    ]
  },
  {
    id: 'hr',
    title: 'HR & Payroll',
    icon: UserCircle,
    color: 'pink',
    items: [
      {
        id: 'employees', label: 'Employees', icon: Users, status: 'coming-soon',
        children: [
          { id: 'employee-list', label: 'Employee List', icon: User, view: 'placeholder' },
        ]
      },
      {
        id: 'payroll', label: 'Payroll', icon: Wallet, status: 'coming-soon',
        children: [
          { id: 'payroll-run', label: 'Payroll Run', icon: Zap, view: 'placeholder' },
        ]
      },
    ]
  },
  {
    id: 'reports',
    title: 'Reports',
    icon: BarChart3,
    color: 'cyan',
    items: [
      {
        id: 'dashboards', label: 'Dashboards', icon: LayoutDashboard, status: 'coming-soon',
        children: [
          { id: 'exec-dashboard', label: 'Executive', icon: BarChart3, view: 'placeholder' },
        ]
      },
    ]
  },
];

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

const formatCurrency = (amount: number, currency: string = 'EGP') => 
  `${currency} ${amount.toLocaleString()}`;

const getColorClasses = (color: string, variant: 'bg' | 'text' | 'light' = 'bg') => {
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
// MAIN ERP APPLICATION
// ============================================================

export const IntegratedERPSystem: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState<string[]>(['finance', 'sales']);
  const [expandedItems, setExpandedItems] = useState<string[]>(['finance-core', 'crm']);
  const [currentView, setCurrentView] = useState<ModuleView>('dashboard');
  const [darkMode, setDarkMode] = useState(false);

  // For sub-views that need context
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) ? prev.filter(id => id !== sectionId) : [...prev, sectionId]
    );
  };

  const toggleItem = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const navigateTo = (view: ModuleView) => {
    setCurrentView(view);
    setSelectedChannelId(null);
    setSelectedOrderId(null);
  };

  // Render the appropriate content based on current view
  const renderContent = () => {
    switch (currentView) {
      // Main Dashboard
      case 'dashboard':
        return <MainDashboard onNavigate={navigateTo} />;
      
      // Finance
      case 'finance-coa':
        return <FinanceCoreUIAlt />;
      case 'finance-journals':
        return <FinanceCoreComplete1 />;
      case 'finance-bank':
        return <FinanceCoreComplete2 />;
      case 'finance-ar':
        return <FinanceLiteModule />;
      case 'finance-ap':
        return <FinanceLiteModule2 />;
      case 'finance-approvals':
        return <FinanceLiteForms />;
      
      // Sales Core
      case 'sales-dashboard':
        return <SalesDashboard onNavigate={navigateTo} />;
      case 'quotations':
        return <SalesCorePart1 />;
      case 'sales-orders':
        return <SalesCorePart2 />;
      case 'deliveries':
        return <SalesCorePart3 />;
      case 'invoices':
        return <SalesCorePart1 initialTab="invoices" />;
      case 'pricing':
        return <PricingView />;
      
      // CRM
      case 'crm-dashboard':
        return <CRMDashboard onNavigate={navigateTo} />;
      case 'accounts':
        return <AccountsList />;
      case 'contacts':
        return <ContactsList />;
      case 'leads':
        return <LeadsList />;
      case 'opportunities':
        return <OpportunitiesList />;
      case 'pipeline':
        return <PipelineKanban />;
      case 'activities':
        return <ActivitiesList />;
      case 'campaigns':
        return <CampaignsList />;
      case 'quotes':
        return <CRMQuotesList />;
      
      // POS
      case 'pos-dashboard':
        return <POSDashboard onNavigate={navigateTo} />;
      case 'pos-terminal':
        return <POSTerminal />;
      case 'pos-transactions':
        return <POSTransactionsList />;
      case 'cash-sessions':
        return <CashSessionsList />;
      case 'stores':
        return <StoresList />;
      case 'registers':
        return <RegistersList />;
      case 'pos-promotions':
        return <POSPromotionsList />;
      case 'items-cache':
        return <ItemsCacheList />;
      case 'sap-sync':
        return <SAPSyncQueue />;
      
      // E-Commerce
      case 'ecom-dashboard':
        return <EcommerceDashboard 
          onViewChannel={(id) => { setSelectedChannelId(id); setCurrentView('channel-detail'); }}
          onViewOrder={(id) => { setSelectedOrderId(id); setCurrentView('order-detail'); }}
        />;
      case 'channels':
        return <ChannelsList onViewChannel={(id) => { setSelectedChannelId(id); setCurrentView('channel-detail'); }} />;
      case 'channel-detail':
        return <ChannelDetail channelId={selectedChannelId} onBack={() => setCurrentView('channels')} />;
      case 'online-orders':
        return <OnlineOrdersList onViewOrder={(id) => { setSelectedOrderId(id); setCurrentView('order-detail'); }} />;
      case 'order-detail':
        return <OrderDetail orderId={selectedOrderId} onBack={() => setCurrentView('online-orders')} />;
      case 'ecom-products':
        return <EcomProductsList />;
      case 'ecom-customers':
        return <EcomCustomersList />;
      case 'sync-jobs':
        return <SyncJobsList />;
      
      // Placeholder for coming soon
      default:
        return <PlaceholderView viewName={currentView} />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      {/* Top Header */}
      <header className={`fixed top-0 left-0 right-0 h-14 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b z-50 flex items-center px-4`}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
          <Menu className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        </button>

        <div className="flex items-center gap-3 ml-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>ERP System</h1>
            <p className="text-xs text-gray-500">SAP B1 Integration</p>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search modules, documents, customers..." 
              className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-200'} border focus:outline-none focus:ring-2 focus:ring-blue-500`} 
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            {darkMode ? <Sun className="w-5 h-5 text-gray-300" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
          <button className={`p-2 rounded-lg relative ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <Bell className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-px h-6 bg-gray-300 mx-2"></div>
          <button className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <Building2 className={`w-4 h-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Acme Corp</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center ml-2">
            <span className="text-white text-sm font-medium">WA</span>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-14 bottom-0 ${sidebarOpen ? 'w-64' : 'w-16'} ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r transition-all duration-300 z-40 flex flex-col overflow-hidden`}>
        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            <button onClick={() => navigateTo('dashboard')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${currentView === 'dashboard' ? 'bg-blue-50 text-blue-700' : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}>
              <Home className="w-5 h-5" />
              {sidebarOpen && <span className="font-medium">Dashboard</span>}
            </button>
          </div>

          <nav className="p-2">
            {navigationConfig.map((section) => (
              <div key={section.id} className="mb-2">
                <button onClick={() => toggleSection(section.id)} className={`w-full flex items-center justify-between px-3 py-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-md ${getColorClasses(section.color)} flex items-center justify-center`}>
                      <section.icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    {sidebarOpen && <span className={`font-semibold text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{section.title}</span>}
                  </div>
                  {sidebarOpen && <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.includes(section.id) ? 'rotate-180' : ''}`} />}
                </button>

                {sidebarOpen && expandedSections.includes(section.id) && (
                  <div className="ml-3 mt-1 space-y-0.5">
                    {section.items.map((item) => (
                      <div key={item.id}>
                        <button onClick={() => item.children ? toggleItem(item.id) : null} className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                          <div className="flex items-center gap-2">
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                            {item.status === 'coming-soon' && <span className="px-1.5 py-0.5 bg-gray-200 text-gray-500 text-xs rounded">Soon</span>}
                            {item.status === 'ready' && <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>}
                          </div>
                          {item.children && <ChevronRight className={`w-3 h-3 text-gray-400 transition-transform ${expandedItems.includes(item.id) ? 'rotate-90' : ''}`} />}
                        </button>

                        {item.children && expandedItems.includes(item.id) && (
                          <div className="ml-6 mt-0.5 space-y-0.5">
                            {item.children.map((child) => (
                              <button key={child.id} onClick={() => child.view && navigateTo(child.view)} className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-sm ${currentView === child.view ? `${getColorClasses(section.color, 'light')} ${getColorClasses(section.color, 'text')}` : darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-50'}`}>
                                <div className="flex items-center gap-2">
                                  <child.icon className="w-3.5 h-3.5" />
                                  <span>{child.label}</span>
                                </div>
                                {child.badge && <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${currentView === child.view ? `${getColorClasses(section.color)} text-white` : 'bg-gray-200 text-gray-600'}`}>{child.badge}</span>}
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
        </div>

        {sidebarOpen && (
          <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-3`}>
            <div className={`rounded-lg p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>SAP B1 Connected</span>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className={`${sidebarOpen ? 'ml-64' : 'ml-16'} mt-14 transition-all duration-300 min-h-screen`}>
        {renderContent()}
      </main>
    </div>
  );
};

// ============================================================
// MAIN DASHBOARD
// ============================================================

const MainDashboard: React.FC<{ onNavigate: (view: ModuleView) => void }> = ({ onNavigate }) => (
  <div className="p-6 space-y-6">
    <div className="rounded-xl p-6 bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back, Wael! 👋</h1>
          <p className="text-blue-100 mt-1">Here's what's happening with your business today.</p>
        </div>
        <div className="text-right text-white">
          <p className="text-sm text-blue-200">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className="text-2xl font-bold">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "Today's Sales", value: 'EGP 281.5K', change: '+18%', icon: TrendingUp, color: 'blue', view: 'sales-dashboard' as ModuleView },
        { label: 'E-Commerce Orders', value: '86', change: '35 pending', icon: Globe, color: 'indigo', view: 'ecom-dashboard' as ModuleView },
        { label: 'POS Transactions', value: '108', change: '3 registers', icon: Store, color: 'orange', view: 'pos-dashboard' as ModuleView },
        { label: 'Open Opportunities', value: '24', change: 'EGP 4.2M', icon: Target, color: 'green', view: 'pipeline' as ModuleView },
      ].map((stat, idx) => (
        <button key={idx} onClick={() => onNavigate(stat.view)} className="bg-white rounded-xl p-5 border border-gray-200 text-left hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <p className="text-xs text-green-600 mt-1">{stat.change}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-50`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
            </div>
          </div>
        </button>
      ))}
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {[
        { label: 'CRM', icon: Users, color: 'blue', view: 'crm-dashboard' as ModuleView },
        { label: 'Sales', icon: ShoppingCart, color: 'green', view: 'sales-dashboard' as ModuleView },
        { label: 'POS', icon: Store, color: 'orange', view: 'pos-dashboard' as ModuleView },
        { label: 'E-Commerce', icon: Globe, color: 'indigo', view: 'ecom-dashboard' as ModuleView },
        { label: 'Pipeline', icon: Layers, color: 'purple', view: 'pipeline' as ModuleView },
        { label: 'Leads', icon: Target, color: 'pink', view: 'leads' as ModuleView },
      ].map((action, idx) => (
        <button key={idx} onClick={() => onNavigate(action.view)} className={`rounded-xl p-4 text-center bg-white border border-gray-200 hover:shadow-md transition-shadow`}>
          <div className={`w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center bg-${action.color}-50`}>
            <action.icon className={`w-6 h-6 text-${action.color}-600`} />
          </div>
          <p className="font-medium text-sm text-gray-900">{action.label}</p>
        </button>
      ))}
    </div>
  </div>
);

// ============================================================
// SALES CORE VIEWS
// ============================================================

const SalesDashboard: React.FC<{ onNavigate: (view: ModuleView) => void }> = ({ onNavigate }) => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div><h1 className="text-2xl font-bold text-gray-900">Sales Dashboard</h1><p className="text-sm text-gray-500 mt-1">Overview of sales performance</p></div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><Plus className="w-4 h-4" /> New Quote</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { label: 'Quotations', value: '12', sub: 'EGP 450K', icon: FileText, color: 'blue', view: 'quotations' as ModuleView },
        { label: 'Sales Orders', value: '8', sub: 'EGP 320K', icon: ClipboardList, color: 'green', view: 'sales-orders' as ModuleView },
        { label: 'Deliveries', value: '5', sub: 'Pending', icon: Truck, color: 'orange', view: 'deliveries' as ModuleView },
        { label: 'Invoices', value: '15', sub: 'This month', icon: Receipt, color: 'purple', view: 'invoices' as ModuleView },
      ].map((stat, idx) => (
        <button key={idx} onClick={() => onNavigate(stat.view)} className="bg-white rounded-xl p-5 border border-gray-200 text-left hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-50`}><stat.icon className={`w-6 h-6 text-${stat.color}-600`} /></div>
            <div><p className="text-2xl font-bold text-gray-900">{stat.value}</p><p className="text-sm text-gray-500">{stat.label}</p><p className="text-xs text-gray-400">{stat.sub}</p></div>
          </div>
        </button>
      ))}
    </div>
  </div>
);

const QuotationsList: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div><h1 className="text-2xl font-bold text-gray-900">Quotations</h1><p className="text-sm text-gray-500 mt-1">Manage sales quotations</p></div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><Plus className="w-4 h-4" /> New Quotation</button>
    </div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Quote #</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th><th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Date</th></tr></thead>
        <tbody className="divide-y">
          {[
            { no: 'QT-2025-0045', customer: 'Ahmed Trading Co.', amount: 125000, status: 'Draft', date: '2025-11-25' },
            { no: 'QT-2025-0044', customer: 'Cairo Electronics', amount: 89500, status: 'Sent', date: '2025-11-24' },
            { no: 'QT-2025-0043', customer: 'Nile Distributors', amount: 234000, status: 'Approved', date: '2025-11-23' },
          ].map((q, i) => (
            <tr key={i} className="hover:bg-gray-50"><td className="px-4 py-4 font-mono text-sm font-medium text-blue-600">{q.no}</td><td className="px-4 py-4 text-sm text-gray-900">{q.customer}</td><td className="px-4 py-4 text-right text-sm font-medium">{formatCurrency(q.amount)}</td><td className="px-4 py-4"><span className={`px-2 py-0.5 text-xs font-medium rounded-full ${q.status === 'Approved' ? 'bg-green-100 text-green-700' : q.status === 'Sent' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{q.status}</span></td><td className="px-4 py-4 text-sm text-gray-500">{q.date}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const SalesOrdersList: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div><h1 className="text-2xl font-bold text-gray-900">Sales Orders</h1><p className="text-sm text-gray-500 mt-1">Manage sales orders</p></div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><Plus className="w-4 h-4" /> New Order</button>
    </div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Order #</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th><th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">SAP Doc</th></tr></thead>
        <tbody className="divide-y">
          {[
            { no: 'SO-2025-0089', customer: 'Tech Solutions Ltd', amount: 156000, status: 'Open', sap: '500123' },
            { no: 'SO-2025-0088', customer: 'Global Trade Inc', amount: 78900, status: 'Delivered', sap: '500122' },
            { no: 'SO-2025-0087', customer: 'Delta Manufacturing', amount: 312000, status: 'Invoiced', sap: '500121' },
          ].map((o, i) => (
            <tr key={i} className="hover:bg-gray-50"><td className="px-4 py-4 font-mono text-sm font-medium text-blue-600">{o.no}</td><td className="px-4 py-4 text-sm text-gray-900">{o.customer}</td><td className="px-4 py-4 text-right text-sm font-medium">{formatCurrency(o.amount)}</td><td className="px-4 py-4"><span className={`px-2 py-0.5 text-xs font-medium rounded-full ${o.status === 'Invoiced' ? 'bg-green-100 text-green-700' : o.status === 'Delivered' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{o.status}</span></td><td className="px-4 py-4 font-mono text-sm text-green-600">#{o.sap}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const PricingView: React.FC = () => (
  <div className="p-6 space-y-6">
    <div><h1 className="text-2xl font-bold text-gray-900">Pricing & Discounts</h1><p className="text-sm text-gray-500 mt-1">Manage price lists and discount rules</p></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { name: 'Retail Price List', code: 'PL-RETAIL', items: 342, default: true },
        { name: 'Wholesale Price List', code: 'PL-WHOLESALE', items: 342, default: false },
        { name: 'VIP Price List', code: 'PL-VIP', items: 156, default: false },
      ].map((pl, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3"><span className="font-mono text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{pl.code}</span>{pl.default && <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Default</span>}</div>
          <h3 className="font-semibold text-gray-900">{pl.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{pl.items} items</p>
        </div>
      ))}
    </div>
  </div>
);

// ============================================================
// CRM VIEWS
// ============================================================

const CRMDashboard: React.FC<{ onNavigate: (view: ModuleView) => void }> = ({ onNavigate }) => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div><h1 className="text-2xl font-bold text-gray-900">CRM Dashboard</h1><p className="text-sm text-gray-500 mt-1">Customer relationship overview</p></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { label: 'Accounts', value: '156', icon: Building2, color: 'blue', view: 'accounts' as ModuleView },
        { label: 'Contacts', value: '423', icon: User, color: 'green', view: 'contacts' as ModuleView },
        { label: 'Leads', value: '23', icon: Target, color: 'orange', view: 'leads' as ModuleView },
        { label: 'Opportunities', value: '24', icon: TrendingUp, color: 'purple', view: 'opportunities' as ModuleView },
      ].map((stat, idx) => (
        <button key={idx} onClick={() => onNavigate(stat.view)} className="bg-white rounded-xl p-5 border border-gray-200 text-left hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-50`}><stat.icon className={`w-6 h-6 text-${stat.color}-600`} /></div>
            <div><p className="text-2xl font-bold text-gray-900">{stat.value}</p><p className="text-sm text-gray-500">{stat.label}</p></div>
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

const AccountsList: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div><h1 className="text-2xl font-bold text-gray-900">Accounts</h1><p className="text-sm text-gray-500 mt-1">Manage customer accounts</p></div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><Plus className="w-4 h-4" /> Add Account</button>
    </div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Account</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Type</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Industry</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">SAP BP</th></tr></thead>
        <tbody className="divide-y">
          {[
            { name: 'Tech Solutions Ltd', type: 'Customer', industry: 'Technology', status: 'Active', bp: 'C00125' },
            { name: 'Cairo Electronics', type: 'Customer', industry: 'Retail', status: 'Active', bp: 'C00089' },
            { name: 'Delta Manufacturing', type: 'Prospect', industry: 'Manufacturing', status: 'Active', bp: null },
          ].map((a, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-4"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"><Building2 className="w-5 h-5 text-blue-600" /></div><span className="font-medium text-gray-900">{a.name}</span></div></td>
              <td className="px-4 py-4"><span className={`px-2 py-0.5 text-xs font-medium rounded-full ${a.type === 'Customer' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{a.type}</span></td>
              <td className="px-4 py-4 text-sm text-gray-600">{a.industry}</td>
              <td className="px-4 py-4"><span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">{a.status}</span></td>
              <td className="px-4 py-4">{a.bp ? <span className="font-mono text-sm text-green-600">{a.bp}</span> : <span className="text-gray-400">—</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ContactsList: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div><h1 className="text-2xl font-bold text-gray-900">Contacts</h1><p className="text-sm text-gray-500 mt-1">Manage contact persons</p></div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><Plus className="w-4 h-4" /> Add Contact</button>
    </div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Contact</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Account</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Title</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Email</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Phone</th></tr></thead>
        <tbody className="divide-y">
          {[
            { name: 'Ahmed Hassan', account: 'Tech Solutions Ltd', title: 'CEO', email: 'ahmed@techsol.com', phone: '+20 100 123 4567' },
            { name: 'Sara Mohamed', account: 'Cairo Electronics', title: 'Procurement Manager', email: 'sara@cairoelec.com', phone: '+20 101 234 5678' },
            { name: 'Omar Ali', account: 'Delta Manufacturing', title: 'Operations Director', email: 'omar@delta.com', phone: '+20 102 345 6789' },
          ].map((c, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-4"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium">{c.name.split(' ').map(n => n[0]).join('')}</div><span className="font-medium text-gray-900">{c.name}</span></div></td>
              <td className="px-4 py-4 text-sm text-gray-600">{c.account}</td>
              <td className="px-4 py-4 text-sm text-gray-600">{c.title}</td>
              <td className="px-4 py-4 text-sm text-blue-600">{c.email}</td>
              <td className="px-4 py-4 text-sm text-gray-600">{c.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const LeadsList: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div><h1 className="text-2xl font-bold text-gray-900">Leads</h1><p className="text-sm text-gray-500 mt-1">Manage sales leads</p></div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><Plus className="w-4 h-4" /> Add Lead</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      {[{ label: 'New', count: 8, color: 'blue' }, { label: 'Contacted', count: 6, color: 'yellow' }, { label: 'Qualified', count: 5, color: 'green' }, { label: 'Converted', count: 4, color: 'purple' }].map((s, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 text-center"><p className={`text-2xl font-bold text-${s.color}-600`}>{s.count}</p><p className="text-sm text-gray-500">{s.label}</p></div>
      ))}
    </div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Lead</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Company</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Source</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Rating</th></tr></thead>
        <tbody className="divide-y">
          {[
            { name: 'Mohamed Khaled', company: 'Pyramid Tech', source: 'Website', status: 'New', rating: 'Hot' },
            { name: 'Fatma Ibrahim', company: 'Nile Software', source: 'Referral', status: 'Contacted', rating: 'Warm' },
            { name: 'Youssef Ahmed', company: 'Smart Systems', source: 'Trade Show', status: 'Qualified', rating: 'Hot' },
          ].map((l, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-4"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center"><Target className="w-5 h-5 text-orange-600" /></div><span className="font-medium text-gray-900">{l.name}</span></div></td>
              <td className="px-4 py-4 text-sm text-gray-600">{l.company}</td>
              <td className="px-4 py-4 text-sm text-gray-600">{l.source}</td>
              <td className="px-4 py-4"><span className={`px-2 py-0.5 text-xs font-medium rounded-full ${l.status === 'New' ? 'bg-blue-100 text-blue-700' : l.status === 'Contacted' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{l.status}</span></td>
              <td className="px-4 py-4"><span className={`px-2 py-0.5 text-xs font-medium rounded-full ${l.rating === 'Hot' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>{l.rating}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const OpportunitiesList: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div><h1 className="text-2xl font-bold text-gray-900">Opportunities</h1><p className="text-sm text-gray-500 mt-1">Manage sales opportunities</p></div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><Plus className="w-4 h-4" /> Add Opportunity</button>
    </div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Opportunity</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Account</th><th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Stage</th><th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase">Probability</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Close Date</th></tr></thead>
        <tbody className="divide-y">
          {[
            { name: 'Enterprise License Deal', account: 'Tech Solutions Ltd', amount: 450000, stage: 'Negotiation', prob: 75, close: '2025-12-15' },
            { name: 'Hardware Upgrade Project', account: 'Cairo Electronics', amount: 180000, stage: 'Proposal', prob: 50, close: '2025-12-30' },
            { name: 'Annual Support Contract', account: 'Delta Manufacturing', amount: 95000, stage: 'Qualification', prob: 25, close: '2026-01-15' },
          ].map((o, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-4 font-medium text-gray-900">{o.name}</td>
              <td className="px-4 py-4 text-sm text-gray-600">{o.account}</td>
              <td className="px-4 py-4 text-right font-medium text-gray-900">{formatCurrency(o.amount)}</td>
              <td className="px-4 py-4"><span className={`px-2 py-0.5 text-xs font-medium rounded-full ${o.stage === 'Negotiation' ? 'bg-purple-100 text-purple-700' : o.stage === 'Proposal' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{o.stage}</span></td>
              <td className="px-4 py-4 text-center"><div className="flex items-center justify-center gap-2"><div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-green-500 rounded-full" style={{ width: `${o.prob}%` }}></div></div><span className="text-sm font-medium">{o.prob}%</span></div></td>
              <td className="px-4 py-4 text-sm text-gray-600">{o.close}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const PipelineKanban: React.FC = () => {
  const stages = [
    { name: 'Qualification', color: 'gray', deals: [{ name: 'Support Contract', account: 'Delta Mfg', amount: 95000 }] },
    { name: 'Proposal', color: 'blue', deals: [{ name: 'Hardware Upgrade', account: 'Cairo Elec', amount: 180000 }, { name: 'Cloud Migration', account: 'Nile Soft', amount: 120000 }] },
    { name: 'Negotiation', color: 'purple', deals: [{ name: 'Enterprise License', account: 'Tech Sol', amount: 450000 }] },
    { name: 'Closed Won', color: 'green', deals: [{ name: 'Training Package', account: 'Smart Sys', amount: 45000 }] },
  ];
  return (
    <div className="p-6 space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">Pipeline View</h1><p className="text-sm text-gray-500 mt-1">Drag and drop opportunities between stages</p></div>
      <div className="grid grid-cols-4 gap-4">
        {stages.map((stage, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-gray-700">{stage.name}</h3><span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs font-medium rounded-full">{stage.deals.length}</span></div>
            <div className="space-y-3">
              {stage.deals.map((deal, j) => (
                <div key={j} className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-move">
                  <p className="font-medium text-gray-900 text-sm">{deal.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{deal.account}</p>
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

const ActivitiesList: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div><h1 className="text-2xl font-bold text-gray-900">Activities</h1><p className="text-sm text-gray-500 mt-1">Manage tasks, calls, meetings</p></div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><Plus className="w-4 h-4" /> Add Activity</button>
    </div>
    <div className="bg-white rounded-xl border border-gray-200 divide-y">
      {[
        { type: 'Call', subject: 'Follow up on proposal', related: 'Tech Solutions Ltd', due: 'Today, 2:00 PM', priority: 'High' },
        { type: 'Meeting', subject: 'Product demo', related: 'Cairo Electronics', due: 'Tomorrow, 10:00 AM', priority: 'Medium' },
        { type: 'Task', subject: 'Prepare quotation', related: 'Delta Manufacturing', due: 'Nov 28', priority: 'High' },
        { type: 'Email', subject: 'Send contract draft', related: 'Nile Distributors', due: 'Nov 29', priority: 'Low' },
      ].map((a, i) => (
        <div key={i} className="p-4 flex items-center gap-4 hover:bg-gray-50">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${a.type === 'Call' ? 'bg-green-100' : a.type === 'Meeting' ? 'bg-blue-100' : a.type === 'Email' ? 'bg-purple-100' : 'bg-orange-100'}`}>
            {a.type === 'Call' ? <Phone className="w-5 h-5 text-green-600" /> : a.type === 'Meeting' ? <Calendar className="w-5 h-5 text-blue-600" /> : a.type === 'Email' ? <Mail className="w-5 h-5 text-purple-600" /> : <CheckSquare className="w-5 h-5 text-orange-600" />}
          </div>
          <div className="flex-1"><p className="font-medium text-gray-900">{a.subject}</p><p className="text-sm text-gray-500">{a.related}</p></div>
          <div className="text-right"><p className="text-sm text-gray-600">{a.due}</p><span className={`px-2 py-0.5 text-xs font-medium rounded-full ${a.priority === 'High' ? 'bg-red-100 text-red-700' : a.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>{a.priority}</span></div>
        </div>
      ))}
    </div>
  </div>
);

const CampaignsList: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div><h1 className="text-2xl font-bold text-gray-900">Campaigns</h1><p className="text-sm text-gray-500 mt-1">Marketing campaigns and automation</p></div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><Plus className="w-4 h-4" /> Create Campaign</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { name: 'Black Friday 2025', type: 'Email', status: 'Active', sent: 5420, opens: 2180, clicks: 890 },
        { name: 'Product Launch', type: 'Multi-channel', status: 'Draft', sent: 0, opens: 0, clicks: 0 },
        { name: 'Customer Survey Q4', type: 'Email', status: 'Completed', sent: 3200, opens: 1890, clicks: 450 },
      ].map((c, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3"><span className={`px-2 py-0.5 text-xs font-medium rounded-full ${c.status === 'Active' ? 'bg-green-100 text-green-700' : c.status === 'Draft' ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-700'}`}>{c.status}</span><span className="text-xs text-gray-500">{c.type}</span></div>
          <h3 className="font-semibold text-gray-900">{c.name}</h3>
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div><p className="text-lg font-bold text-gray-900">{c.sent.toLocaleString()}</p><p className="text-xs text-gray-500">Sent</p></div>
            <div><p className="text-lg font-bold text-blue-600">{c.opens.toLocaleString()}</p><p className="text-xs text-gray-500">Opens</p></div>
            <div><p className="text-lg font-bold text-green-600">{c.clicks.toLocaleString()}</p><p className="text-xs text-gray-500">Clicks</p></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CRMQuotesList: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div><h1 className="text-2xl font-bold text-gray-900">Quotes</h1><p className="text-sm text-gray-500 mt-1">CRM quotes linked to opportunities</p></div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><Plus className="w-4 h-4" /> Create Quote</button>
    </div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Quote</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Opportunity</th><th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Valid Until</th></tr></thead>
        <tbody className="divide-y">
          {[
            { no: 'CQ-2025-0012', opp: 'Enterprise License Deal', amount: 450000, status: 'Sent', valid: '2025-12-15' },
            { no: 'CQ-2025-0011', opp: 'Hardware Upgrade Project', amount: 180000, status: 'Draft', valid: '2025-12-30' },
          ].map((q, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-4 font-mono text-sm font-medium text-blue-600">{q.no}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{q.opp}</td>
              <td className="px-4 py-4 text-right font-medium">{formatCurrency(q.amount)}</td>
              <td className="px-4 py-4"><span className={`px-2 py-0.5 text-xs font-medium rounded-full ${q.status === 'Sent' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{q.status}</span></td>
              <td className="px-4 py-4 text-sm text-gray-500">{q.valid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ============================================================
// POS VIEWS
// ============================================================

const POSDashboard: React.FC<{ onNavigate: (view: ModuleView) => void }> = ({ onNavigate }) => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div><h1 className="text-2xl font-bold text-gray-900">POS Dashboard</h1><p className="text-sm text-gray-500 mt-1">Point of Sale operations overview</p></div>
      <button onClick={() => onNavigate('pos-terminal')} className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 flex items-center gap-2"><ShoppingCart className="w-4 h-4" /> Open Terminal</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { label: "Today's Sales", value: 'EGP 80.2K', icon: TrendingUp, color: 'green' },
        { label: 'Transactions', value: '108', icon: Receipt, color: 'blue' },
        { label: 'Open Sessions', value: '3', icon: Unlock, color: 'orange' },
        { label: 'Pending Sync', value: '2', icon: RefreshCw, color: 'purple' },
      ].map((stat, idx) => (
        <div key={idx} className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-50`}><stat.icon className={`w-6 h-6 text-${stat.color}-600`} /></div>
            <div><p className="text-2xl font-bold text-gray-900">{stat.value}</p><p className="text-sm text-gray-500">{stat.label}</p></div>
          </div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { label: 'Transactions', icon: Receipt, view: 'pos-transactions' as ModuleView },
        { label: 'Cash Sessions', icon: Wallet, view: 'cash-sessions' as ModuleView },
        { label: 'Stores', icon: Store, view: 'stores' as ModuleView },
        { label: 'SAP Sync', icon: Database, view: 'sap-sync' as ModuleView },
      ].map((a, i) => (
        <button key={i} onClick={() => onNavigate(a.view)} className="bg-white rounded-xl p-4 border border-gray-200 text-center hover:shadow-md">
          <a.icon className="w-8 h-8 text-orange-600 mx-auto mb-2" /><p className="font-medium text-gray-900">{a.label}</p>
        </button>
      ))}
    </div>
  </div>
);

const POSTerminal: React.FC = () => (
  <div className="h-[calc(100vh-3.5rem)] bg-gray-100 flex">
    {/* Left Panel - Cart */}
    <div className="flex-1 flex flex-col bg-white border-r">
      <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-between">
        <div><p className="font-bold">Cairo Mall Store</p><p className="text-sm text-orange-100">REG-01 • Ahmed Hassan</p></div>
        <p className="text-sm">{new Date().toLocaleString()}</p>
      </div>
      <div className="p-4 border-b"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" placeholder="Scan barcode or search item..." className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-lg" autoFocus /></div></div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="text-center py-12 text-gray-400"><ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" /><p className="text-lg">Cart is empty</p><p className="text-sm">Scan items or search to add</p></div>
      </div>
      <div className="p-4 border-t grid grid-cols-4 gap-2">
        <button className="p-3 bg-yellow-50 text-yellow-700 rounded-lg font-medium text-sm"><Pause className="w-4 h-4 mx-auto mb-1" />Park</button>
        <button className="p-3 bg-blue-50 text-blue-700 rounded-lg font-medium text-sm"><RotateCcw className="w-4 h-4 mx-auto mb-1" />Recall</button>
        <button className="p-3 bg-purple-50 text-purple-700 rounded-lg font-medium text-sm"><Percent className="w-4 h-4 mx-auto mb-1" />Discount</button>
        <button className="p-3 bg-red-50 text-red-700 rounded-lg font-medium text-sm"><XCircle className="w-4 h-4 mx-auto mb-1" />Void</button>
      </div>
    </div>
    {/* Right Panel - Payment */}
    <div className="w-80 flex flex-col bg-gray-50">
      <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center"><p className="text-sm text-blue-200">Receipt #RC-2025-000459</p></div>
      <div className="p-4 space-y-2 border-b">
        <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span>EGP 0.00</span></div>
        <div className="flex justify-between text-sm"><span className="text-gray-500">Discount</span><span className="text-green-600">-EGP 0.00</span></div>
        <div className="flex justify-between text-sm"><span className="text-gray-500">Tax (14%)</span><span>EGP 0.00</span></div>
        <div className="flex justify-between text-xl font-bold pt-2 border-t"><span>Total</span><span>EGP 0.00</span></div>
      </div>
      <div className="p-4 flex-1">
        <p className="text-sm text-gray-500 mb-2">Quick Cash</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[50, 100, 200, 500].map(amt => (<button key={amt} className="p-3 bg-white border border-gray-200 rounded-lg font-medium hover:bg-gray-50">EGP {amt}</button>))}
        </div>
      </div>
      <div className="p-4 space-y-2">
        <button className="w-full p-4 bg-green-600 text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2"><Banknote className="w-5 h-5" /> Cash</button>
        <button className="w-full p-4 bg-blue-600 text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2"><CreditCard className="w-5 h-5" /> Card</button>
      </div>
    </div>
  </div>
);

const POSTransactionsList: React.FC = () => (
  <div className="p-6 space-y-6">
    <div><h1 className="text-2xl font-bold text-gray-900">Transaction History</h1><p className="text-sm text-gray-500 mt-1">View and manage POS transactions</p></div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Receipt</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Time</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Payment</th><th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th></tr></thead>
        <tbody className="divide-y">
          {[
            { no: 'RC-2025-000458', time: '14:32', customer: 'Ahmed Mohamed', payment: 'Card', amount: 1250, status: 'Completed' },
            { no: 'RC-2025-000457', time: '14:15', customer: 'Walk-in', payment: 'Cash', amount: 890, status: 'Completed' },
            { no: 'RC-2025-000456', time: '13:58', customer: 'Sara Hassan', payment: 'Cash', amount: 2340, status: 'Completed' },
          ].map((t, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-4 font-mono text-sm font-medium text-gray-900">{t.no}</td>
              <td className="px-4 py-4 text-sm text-gray-600">{t.time}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{t.customer}</td>
              <td className="px-4 py-4"><span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${t.payment === 'Cash' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{t.payment === 'Cash' ? <Banknote className="w-3 h-3" /> : <CreditCard className="w-3 h-3" />}{t.payment}</span></td>
              <td className="px-4 py-4 text-right font-medium">{formatCurrency(t.amount)}</td>
              <td className="px-4 py-4"><span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">{t.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const CashSessionsList: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div><h1 className="text-2xl font-bold text-gray-900">Cash Sessions</h1><p className="text-sm text-gray-500 mt-1">Manage till sessions</p></div>
      <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 flex items-center gap-2"><Unlock className="w-4 h-4" /> Open Session</button>
    </div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Store</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Register</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Cashier</th><th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Float</th><th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase">Transactions</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th></tr></thead>
        <tbody className="divide-y">
          {[
            { store: 'Cairo Mall Store', reg: 'REG-01', cashier: 'Ahmed Hassan', float: 1000, txns: 45, status: 'Open' },
            { store: 'Cairo Mall Store', reg: 'REG-02', cashier: 'Sara Mohamed', float: 1000, txns: 38, status: 'Open' },
            { store: 'Alexandria City Centre', reg: 'REG-01', cashier: 'Omar Farouk', float: 1500, txns: 25, status: 'Open' },
          ].map((s, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-4 font-medium text-gray-900">{s.store}</td>
              <td className="px-4 py-4 font-mono text-sm text-gray-600">{s.reg}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{s.cashier}</td>
              <td className="px-4 py-4 text-right font-medium">{formatCurrency(s.float)}</td>
              <td className="px-4 py-4 text-center text-sm">{s.txns}</td>
              <td className="px-4 py-4"><span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full"><Unlock className="w-3 h-3" />{s.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const StoresList: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div><h1 className="text-2xl font-bold text-gray-900">Stores</h1><p className="text-sm text-gray-500 mt-1">Manage retail store locations</p></div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><Plus className="w-4 h-4" /> Add Store</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { name: 'Cairo Mall Store', code: 'STORE-001', regs: 4, online: 2, sales: 61250, active: true },
        { name: 'Alexandria City Centre', code: 'STORE-002', regs: 3, online: 1, sales: 18900, active: true },
        { name: 'Giza Mall Outlet', code: 'STORE-003', regs: 2, online: 0, sales: 0, active: false },
      ].map((s, i) => (
        <div key={i} className={`bg-white rounded-xl border p-5 ${s.active ? 'border-gray-200' : 'border-gray-100 opacity-60'}`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3"><div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.active ? 'bg-blue-100' : 'bg-gray-100'}`}><Store className={`w-5 h-5 ${s.active ? 'text-blue-600' : 'text-gray-400'}`} /></div><div><h3 className="font-semibold text-gray-900">{s.name}</h3><p className="text-xs text-gray-500 font-mono">{s.code}</p></div></div>
            <span className={`w-2 h-2 rounded-full ${s.active ? 'bg-green-500' : 'bg-gray-300'}`}></span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-gray-50 rounded-lg p-2"><p className="text-lg font-bold text-gray-900">{s.regs}</p><p className="text-xs text-gray-500">Registers</p></div>
            <div className="bg-gray-50 rounded-lg p-2"><p className="text-lg font-bold text-green-600">{s.online}</p><p className="text-xs text-gray-500">Online</p></div>
            <div className="bg-gray-50 rounded-lg p-2"><p className="text-lg font-bold text-gray-900">{(s.sales / 1000).toFixed(0)}K</p><p className="text-xs text-gray-500">Today</p></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RegistersList: React.FC = () => (
  <div className="p-6 space-y-6">
    <div><h1 className="text-2xl font-bold text-gray-900">Registers</h1><p className="text-sm text-gray-500 mt-1">POS terminal devices</p></div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Register</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Store</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Cashier</th></tr></thead>
        <tbody className="divide-y">
          {[
            { code: 'REG-01', name: 'Main Register', store: 'Cairo Mall Store', online: true, cashier: 'Ahmed Hassan' },
            { code: 'REG-02', name: 'Register 2', store: 'Cairo Mall Store', online: true, cashier: 'Sara Mohamed' },
            { code: 'REG-03', name: 'Register 3', store: 'Cairo Mall Store', online: false, cashier: null },
          ].map((r, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-4"><p className="font-medium text-gray-900">{r.name}</p><p className="text-xs text-gray-500 font-mono">{r.code}</p></td>
              <td className="px-4 py-4 text-sm text-gray-600">{r.store}</td>
              <td className="px-4 py-4"><span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${r.online ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}><span className={`w-1.5 h-1.5 rounded-full ${r.online ? 'bg-green-500' : 'bg-gray-400'}`}></span>{r.online ? 'Online' : 'Offline'}</span></td>
              <td className="px-4 py-4 text-sm text-gray-600">{r.cashier || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const POSPromotionsList: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div><h1 className="text-2xl font-bold text-gray-900">POS Promotions</h1><p className="text-sm text-gray-500 mt-1">Manage pricing rules and discounts</p></div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><Plus className="w-4 h-4" /> Create Promotion</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { code: 'WEEKEND20', name: 'Weekend 20% Off', type: 'Basket', active: true, used: 1250 },
        { code: 'APPAREL15', name: 'Apparel 15% Off', type: 'Item', active: true, used: 890 },
        { code: 'BUYGETFREE', name: 'Buy 2 Get 1 Free', type: 'Bundle', active: true, used: 156 },
      ].map((p, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-start justify-between mb-3"><span className="font-mono text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{p.code}</span><span className="w-2 h-2 bg-green-500 rounded-full"></span></div>
          <h3 className="font-semibold text-gray-900">{p.name}</h3>
          <div className="flex items-center justify-between mt-4 pt-3 border-t">
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${p.type === 'Basket' ? 'bg-purple-100 text-purple-700' : p.type === 'Item' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>{p.type}</span>
            <span className="text-sm text-gray-500">Used {p.used.toLocaleString()}x</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ItemsCacheList: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div><h1 className="text-2xl font-bold text-gray-900">Items Cache</h1><p className="text-sm text-gray-500 mt-1">Local item data synced from SAP</p></div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Sync from SAP</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { code: 'ITEM-1001', name: 'T-Shirt White L', barcode: '6223000000012', price: 500, stock: 45 },
        { code: 'ITEM-2001', name: 'Jeans Blue 32', barcode: '6223000000043', price: 1200, stock: 23 },
        { code: 'ITEM-3001', name: 'Sneakers Sport 42', barcode: '6223000000055', price: 2500, stock: 8 },
      ].map((item, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-start gap-3"><div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center"><Package className="w-6 h-6 text-gray-400" /></div><div><h3 className="font-medium text-gray-900">{item.name}</h3><p className="text-xs text-gray-500 font-mono">{item.code}</p></div></div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t"><span className="text-lg font-bold text-gray-900">{formatCurrency(item.price)}</span><span className={`text-sm ${item.stock > 10 ? 'text-green-600' : 'text-yellow-600'}`}>{item.stock} in stock</span></div>
        </div>
      ))}
    </div>
  </div>
);

const SAPSyncQueue: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div><h1 className="text-2xl font-bold text-gray-900">SAP Sync Queue</h1><p className="text-sm text-gray-500 mt-1">Transaction posting to SAP B1</p></div>
      <div className="flex gap-2">
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2"><RotateCcw className="w-4 h-4" /> Retry Failed</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><Zap className="w-4 h-4" /> Process Queue</button>
      </div>
    </div>
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3"><AlertCircle className="w-5 h-5 text-red-600 shrink-0" /><div><p className="text-sm font-medium text-red-800">1 transaction failed to sync</p><p className="text-sm text-red-700">Review the error and retry.</p></div></div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Receipt</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Store</th><th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">SAP Doc</th></tr></thead>
        <tbody className="divide-y">
          {[
            { r: 'RC-2025-000455', store: 'Cairo Mall', amount: 2770, status: 'Synced', doc: '#600123' },
            { r: 'RC-2025-000450', store: 'Alexandria', amount: 890, status: 'Pending', doc: null },
            { r: 'RC-2025-000448', store: 'Cairo Mall', amount: 3250, status: 'Failed', doc: null },
          ].map((item, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-4 font-mono text-sm font-medium text-gray-900">{item.r}</td>
              <td className="px-4 py-4 text-sm text-gray-600">{item.store}</td>
              <td className="px-4 py-4 text-right font-medium">{formatCurrency(item.amount)}</td>
              <td className="px-4 py-4"><span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${item.status === 'Synced' ? 'bg-green-100 text-green-700' : item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{item.status === 'Synced' ? <CheckCircle2 className="w-3 h-3" /> : item.status === 'Pending' ? <Clock className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}{item.status}</span></td>
              <td className="px-4 py-4 font-mono text-sm text-green-600">{item.doc || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ============================================================
// E-COMMERCE VIEWS
// ============================================================

const ecomChannels = [
  { id: 'ch-1', code: 'SHOPIFY-MAIN', name: 'Main Shopify Store', type: 'Shopify', status: 'Active', url: 'my-store.myshopify.com', ordersToday: 45, pending: 12, revenue: 125000, products: 342, lastSync: '5 min ago' },
  { id: 'ch-2', code: 'WOO-B2B', name: 'B2B WooCommerce', type: 'WooCommerce', status: 'Active', url: 'b2b.mycompany.com', ordersToday: 18, pending: 5, revenue: 89000, products: 156, lastSync: '10 min ago' },
  { id: 'ch-3', code: 'AMAZON-EG', name: 'Amazon Egypt', type: 'Marketplace', status: 'Syncing', url: 'amazon.eg', ordersToday: 23, pending: 8, revenue: 67500, products: 89, lastSync: '30 min ago' },
];

const ecomOrders = [
  { id: 'ord-1', orderNo: 'SHOP-10045', channel: 'Shopify', customer: 'Ahmed Hassan', items: 3, total: 2450, status: 'Pending', payment: 'Paid', sap: null },
  { id: 'ord-2', orderNo: 'SHOP-10044', channel: 'Shopify', customer: 'Sara Mohamed', items: 1, total: 890, status: 'Processing', payment: 'Paid', sap: '600125' },
  { id: 'ord-3', orderNo: 'WOO-5023', channel: 'WooCommerce', customer: 'Tech Solutions Ltd', items: 12, total: 45600, status: 'Processing', payment: 'Pending', sap: '600124' },
  { id: 'ord-4', orderNo: 'AMZ-88912', channel: 'Amazon', customer: 'Omar Ali', items: 2, total: 1560, status: 'Shipped', payment: 'Paid', sap: '600120' },
];

const EcommerceDashboard: React.FC<{ onViewChannel: (id: string) => void; onViewOrder: (id: string) => void }> = ({ onViewChannel, onViewOrder }) => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div><h1 className="text-2xl font-bold text-gray-900">E-Commerce Dashboard</h1><p className="text-sm text-gray-500 mt-1">Unified view across all channels</p></div>
      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2"><Plus className="w-4 h-4" /> Add Channel</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-5 text-white">
        <p className="text-indigo-100 text-sm">Today's Revenue</p>
        <p className="text-3xl font-bold mt-1">{formatCurrency(281500)}</p>
        <p className="text-indigo-200 text-xs mt-1">+23% vs yesterday</p>
      </div>
      {[
        { label: 'Orders Today', value: '86', icon: ShoppingCart, color: 'blue' },
        { label: 'Pending', value: '25', icon: Clock, color: 'yellow' },
        { label: 'Active Channels', value: '3/4', icon: Globe, color: 'green' },
      ].map((stat, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-50`}><stat.icon className={`w-6 h-6 text-${stat.color}-600`} /></div>
            <div><p className="text-2xl font-bold text-gray-900">{stat.value}</p><p className="text-sm text-gray-500">{stat.label}</p></div>
          </div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {ecomChannels.map((ch) => (
        <button key={ch.id} onClick={() => onViewChannel(ch.id)} className="bg-white rounded-xl border border-gray-200 p-4 text-left hover:shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">{ch.name}</span>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${ch.status === 'Active' ? 'bg-green-100 text-green-700' : ch.status === 'Syncing' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>{ch.status}</span>
          </div>
          <p className="text-xs text-gray-500 mb-3">{ch.url}</p>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-gray-50 rounded p-2"><p className="font-bold text-gray-900">{ch.ordersToday}</p><p className="text-xs text-gray-500">Orders</p></div>
            <div className="bg-gray-50 rounded p-2"><p className="font-bold text-gray-900">{(ch.revenue / 1000).toFixed(0)}K</p><p className="text-xs text-gray-500">Revenue</p></div>
          </div>
        </button>
      ))}
    </div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-4 border-b flex items-center justify-between"><h2 className="font-semibold text-gray-900">Recent Orders</h2></div>
      <table className="w-full">
        <thead className="bg-gray-50"><tr><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Order</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Channel</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th><th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Total</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th></tr></thead>
        <tbody className="divide-y">
          {ecomOrders.slice(0, 4).map((o) => (
            <tr key={o.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onViewOrder(o.id)}>
              <td className="px-4 py-4 font-mono text-sm font-medium text-gray-900">{o.orderNo}</td>
              <td className="px-4 py-4 text-sm text-gray-600">{o.channel}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{o.customer}</td>
              <td className="px-4 py-4 text-right font-medium">{formatCurrency(o.total)}</td>
              <td className="px-4 py-4"><span className={`px-2 py-0.5 text-xs font-medium rounded-full ${o.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : o.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{o.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ChannelsList: React.FC<{ onViewChannel: (id: string) => void }> = ({ onViewChannel }) => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div><h1 className="text-2xl font-bold text-gray-900">Sales Channels</h1><p className="text-sm text-gray-500 mt-1">Manage e-commerce integrations</p></div>
      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2"><Plus className="w-4 h-4" /> Add Channel</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {ecomChannels.map((ch) => (
        <div key={ch.id} className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3"><div className={`w-12 h-12 rounded-xl flex items-center justify-center ${ch.type === 'Shopify' ? 'bg-green-100' : ch.type === 'WooCommerce' ? 'bg-purple-100' : 'bg-blue-100'}`}><Store className={`w-6 h-6 ${ch.type === 'Shopify' ? 'text-green-600' : ch.type === 'WooCommerce' ? 'text-purple-600' : 'text-blue-600'}`} /></div><div><h3 className="font-semibold text-gray-900">{ch.name}</h3><p className="text-sm text-gray-500">{ch.type} • {ch.url}</p></div></div>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${ch.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{ch.status}</span>
          </div>
          <div className="grid grid-cols-4 gap-3 mb-4 text-center">
            <div><p className="text-xl font-bold text-gray-900">{ch.ordersToday}</p><p className="text-xs text-gray-500">Orders</p></div>
            <div><p className="text-xl font-bold text-yellow-600">{ch.pending}</p><p className="text-xs text-gray-500">Pending</p></div>
            <div><p className="text-xl font-bold text-gray-900">{(ch.revenue / 1000).toFixed(0)}K</p><p className="text-xs text-gray-500">Revenue</p></div>
            <div><p className="text-xl font-bold text-gray-900">{ch.products}</p><p className="text-xs text-gray-500">Products</p></div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-sm text-gray-500">Last sync: {ch.lastSync}</span>
            <button onClick={() => onViewChannel(ch.id)} className="px-3 py-1.5 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-lg hover:bg-indigo-100">View Details</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ChannelDetail: React.FC<{ channelId: string | null; onBack: () => void }> = ({ channelId, onBack }) => {
  const channel = ecomChannels.find(c => c.id === channelId) || ecomChannels[0];
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft className="w-5 h-5 text-gray-500" /></button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{channel.name}</h1>
          <p className="text-sm text-gray-500">{channel.type} • {channel.url}</p>
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Sync Now</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Orders Today', value: channel.ordersToday, icon: ShoppingCart, color: 'blue' },
          { label: 'Pending', value: channel.pending, icon: Clock, color: 'yellow' },
          { label: 'Revenue', value: `${(channel.revenue / 1000).toFixed(0)}K`, icon: CreditCard, color: 'green' },
          { label: 'Products', value: channel.products, icon: Package, color: 'purple' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${stat.color}-50 mb-2`}><stat.icon className={`w-4 h-4 text-${stat.color}-600`} /></div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Connection Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Store URL</label><input type="text" defaultValue={channel.url} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Warehouse</label><select className="w-full px-3 py-2 border border-gray-300 rounded-lg"><option>WH-ECOM-1</option><option>WH-MAIN</option></select></div>
        </div>
      </div>
    </div>
  );
};

const OnlineOrdersList: React.FC<{ onViewOrder: (id: string) => void }> = ({ onViewOrder }) => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div><h1 className="text-2xl font-bold text-gray-900">Online Orders</h1><p className="text-sm text-gray-500 mt-1">Orders from all channels</p></div>
      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2"><Download className="w-4 h-4" /> Export</button>
    </div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Order</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Channel</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th><th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase">Items</th><th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Total</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">SAP</th></tr></thead>
        <tbody className="divide-y">
          {ecomOrders.map((o) => (
            <tr key={o.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onViewOrder(o.id)}>
              <td className="px-4 py-4 font-mono text-sm font-medium text-gray-900">{o.orderNo}</td>
              <td className="px-4 py-4 text-sm text-gray-600">{o.channel}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{o.customer}</td>
              <td className="px-4 py-4 text-center text-sm">{o.items}</td>
              <td className="px-4 py-4 text-right font-medium">{formatCurrency(o.total)}</td>
              <td className="px-4 py-4"><span className={`px-2 py-0.5 text-xs font-medium rounded-full ${o.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : o.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{o.status}</span></td>
              <td className="px-4 py-4">{o.sap ? <span className="font-mono text-sm text-green-600">#{o.sap}</span> : <button className="text-xs text-indigo-600">Create</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const OrderDetail: React.FC<{ orderId: string | null; onBack: () => void }> = ({ orderId, onBack }) => {
  const order = ecomOrders.find(o => o.id === orderId) || ecomOrders[0];
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft className="w-5 h-5 text-gray-500" /></button>
        <div className="flex-1">
          <div className="flex items-center gap-3"><h1 className="text-2xl font-bold text-gray-900 font-mono">{order.orderNo}</h1><span className={`px-2 py-0.5 text-xs font-medium rounded-full ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>{order.status}</span></div>
          <p className="text-sm text-gray-500">{order.channel}</p>
        </div>
        {!order.sap && <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 flex items-center gap-2"><Database className="w-4 h-4" /> Create SAP Order</button>}
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
          <div className="space-y-3">
            {[{ name: 'T-Shirt White L', qty: 2, price: 500 }, { name: 'Jeans Blue 32', qty: 1, price: 1200 }].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3"><div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center"><Package className="w-6 h-6 text-gray-400" /></div><span className="font-medium text-gray-900">{item.name}</span></div>
                <div className="text-right"><p className="text-sm">{item.qty} × {formatCurrency(item.price)}</p><p className="font-medium">{formatCurrency(item.qty * item.price)}</p></div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t"><div className="flex justify-between text-xl font-bold"><span>Total</span><span>{formatCurrency(order.total)}</span></div></div>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5"><h3 className="font-semibold text-gray-900 mb-3">Customer</h3><p className="font-medium text-gray-900">{order.customer}</p><p className="text-sm text-gray-500">customer@email.com</p></div>
          {order.sap && <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-600" /><div><p className="text-sm font-medium text-green-800">Synced to SAP</p><p className="text-sm text-green-700">Order #{order.sap}</p></div></div>}
        </div>
      </div>
    </div>
  );
};

const EcomProductsList: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div><h1 className="text-2xl font-bold text-gray-900">Products Sync</h1><p className="text-sm text-gray-500 mt-1">Manage product listings across channels</p></div>
      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2"><Upload className="w-4 h-4" /> Publish to Channels</button>
    </div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Product</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Channels</th><th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase">Stock</th><th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Price</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th></tr></thead>
        <tbody className="divide-y">
          {[
            { sku: 'TSH-WHT-L', name: 'T-Shirt White L', channels: ['Shopify', 'WooCommerce'], stock: 145, price: 500, synced: true },
            { sku: 'JNS-BLU-32', name: 'Jeans Blue 32', channels: ['Shopify'], stock: 67, price: 1200, synced: true },
            { sku: 'SNK-SPT-42', name: 'Sneakers Sport 42', channels: ['Shopify', 'Amazon'], stock: 23, price: 2500, synced: false },
          ].map((p, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-4"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"><Package className="w-5 h-5 text-gray-400" /></div><div><p className="font-medium text-gray-900">{p.name}</p><p className="text-xs text-gray-500 font-mono">{p.sku}</p></div></div></td>
              <td className="px-4 py-4"><div className="flex flex-wrap gap-1">{p.channels.map((ch, j) => (<span key={j} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{ch}</span>))}</div></td>
              <td className="px-4 py-4 text-center"><span className={`font-medium ${p.stock > 20 ? 'text-green-600' : 'text-yellow-600'}`}>{p.stock}</span></td>
              <td className="px-4 py-4 text-right font-medium">{formatCurrency(p.price)}</td>
              <td className="px-4 py-4">{p.synced ? <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">Synced</span> : <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">Needs Sync</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const EcomCustomersList: React.FC = () => (
  <div className="p-6 space-y-6">
    <div><h1 className="text-2xl font-bold text-gray-900">E-Commerce Customers</h1><p className="text-sm text-gray-500 mt-1">Customers synced from online channels</p></div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Channel</th><th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase">Orders</th><th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Total Spent</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">SAP BP</th></tr></thead>
        <tbody className="divide-y">
          {[
            { name: 'Ahmed Hassan', email: 'ahmed@email.com', channel: 'Shopify', orders: 12, spent: 45600, bp: 'C00125' },
            { name: 'Sara Mohamed', email: 'sara@email.com', channel: 'Shopify', orders: 8, spent: 23400, bp: 'C00126' },
            { name: 'Tech Solutions Ltd', email: 'orders@techsol.com', channel: 'WooCommerce', orders: 45, spent: 890000, bp: 'C00089' },
          ].map((c, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-4"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium">{c.name.split(' ').map(n => n[0]).join('')}</div><div><p className="font-medium text-gray-900">{c.name}</p><p className="text-xs text-gray-500">{c.email}</p></div></div></td>
              <td className="px-4 py-4 text-sm text-gray-600">{c.channel}</td>
              <td className="px-4 py-4 text-center text-sm">{c.orders}</td>
              <td className="px-4 py-4 text-right font-medium">{formatCurrency(c.spent)}</td>
              <td className="px-4 py-4"><span className="font-mono text-sm text-green-600">{c.bp}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const SyncJobsList: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div><h1 className="text-2xl font-bold text-gray-900">Sync Jobs</h1><p className="text-sm text-gray-500 mt-1">Monitor data synchronization</p></div>
      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2"><Play className="w-4 h-4" /> Run Full Sync</button>
    </div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Channel</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Type</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Started</th><th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase">Records</th></tr></thead>
        <tbody className="divide-y">
          {[
            { channel: 'Shopify', type: 'Orders', status: 'Completed', started: '14:30:00', records: 12 },
            { channel: 'WooCommerce', type: 'Products', status: 'Running', started: '14:28:00', records: 156 },
            { channel: 'Amazon', type: 'Inventory', status: 'Queued', started: '-', records: 0 },
          ].map((job, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-4 font-medium text-gray-900">{job.channel}</td>
              <td className="px-4 py-4 text-sm text-gray-600">{job.type}</td>
              <td className="px-4 py-4"><span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${job.status === 'Completed' ? 'bg-green-100 text-green-700' : job.status === 'Running' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{job.status === 'Running' && <Loader2 className="w-3 h-3 animate-spin" />}{job.status}</span></td>
              <td className="px-4 py-4 text-sm text-gray-600">{job.started}</td>
              <td className="px-4 py-4 text-center text-sm text-green-600">{job.records}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ============================================================
// PLACEHOLDER VIEW
// ============================================================

const PlaceholderView: React.FC<{ viewName: string }> = ({ viewName }) => (
  <div className="p-6">
    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4"><Layers className="w-8 h-8 text-gray-400" /></div>
      <h2 className="text-xl font-bold text-gray-900 capitalize">{viewName.replace(/-/g, ' ')}</h2>
      <p className="text-gray-500 mt-2">This module is coming soon.</p>
      <span className="inline-block mt-4 px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">Coming Soon</span>
    </div>
  </div>
);

// ============================================================
// EXPORT
// ============================================================

export default IntegratedERPSystem;
