// ============================================================
// POS / Retail - Part 1: Stores, Registers, Configuration
// Multi-Tenant ERP System with SAP Business One Integration
// ============================================================

import React, { useState } from 'react';
import {
  Store, Monitor, Users, Package, Barcode, Settings, Search,
  Plus, MoreHorizontal, Edit, Trash2, Eye, Download, Upload,
  RefreshCw, CheckCircle2, XCircle, AlertTriangle, MapPin,
  Clock, Wifi, WifiOff, DollarSign, CreditCard, Warehouse,
  Tag, Building2, User, Shield, Percent, Globe, Calendar,
  ChevronRight, Activity, Database, Zap, Hash, ToggleLeft, ToggleRight
} from 'lucide-react';

// ============================================================
// TYPE DEFINITIONS
// ============================================================

type PosRole = 'Cashier' | 'Supervisor' | 'StoreManager';

interface PosStore {
  id: string;
  tenantId: string;
  sapCompanyId: string;
  code: string;
  name: string;
  branchCode?: string;
  warehouseCode: string;
  priceListCode: string;
  currency: string;
  isActive: boolean;
  address?: string;
  city?: string;
  country?: string;
  timeZone?: string;
  cashAccountCode?: string;
  cardClearingAccountCode?: string;
  pricesIncludeTax: boolean;
  registersCount?: number;
  todaySales?: number;
  createdAt: string;
  updatedAt: string;
}

interface PosRegister {
  id: string;
  storeId: string;
  storeName?: string;
  code: string;
  name: string;
  serialNumber?: string;
  isActive: boolean;
  lastSyncAt?: string;
  offlineAllowed: boolean;
  isOnline?: boolean;
  currentSessionId?: string;
  currentCashier?: string;
  createdAt: string;
}

interface PosUserProfile {
  id: string;
  userId: string;
  userName: string;
  storeId: string;
  storeName: string;
  role: PosRole;
  canOverrideDiscountPercent: number;
  maxCashRefundAmount?: number;
  isActive: boolean;
}

interface PosItemCache {
  id: string;
  tenantId: string;
  sapCompanyId: string;
  itemCode: string;
  itemName: string;
  itemGroup?: string;
  barcodes: string[];
  uomCode: string;
  isActive: boolean;
  vatGroup?: string;
  priceListCode: string;
  unitPrice: number;
  currency: string;
  inStock?: number;
  lastSyncAt: string;
}

// ============================================================
// SAMPLE DATA
// ============================================================

const sampleStores: PosStore[] = [
  {
    id: 'store-001',
    tenantId: 'tenant-1',
    sapCompanyId: 'company-1',
    code: 'CAIRO-MALL-1',
    name: 'Cairo Mall Store',
    branchCode: 'BR-CAIRO',
    warehouseCode: 'WH-CAIRO-1',
    priceListCode: 'PL-RETAIL',
    currency: 'EGP',
    isActive: true,
    address: 'Cairo Festival City, Ring Road',
    city: 'Cairo',
    country: 'Egypt',
    timeZone: 'Africa/Cairo',
    cashAccountCode: 'CASH-CAIRO',
    cardClearingAccountCode: 'CARD-CLEARING',
    pricesIncludeTax: true,
    registersCount: 4,
    todaySales: 45600,
    createdAt: '2024-01-15',
    updatedAt: '2025-11-25'
  },
  {
    id: 'store-002',
    tenantId: 'tenant-1',
    sapCompanyId: 'company-1',
    code: 'ALEX-CITYCTR',
    name: 'Alexandria City Centre',
    branchCode: 'BR-ALEX',
    warehouseCode: 'WH-ALEX-1',
    priceListCode: 'PL-RETAIL',
    currency: 'EGP',
    isActive: true,
    address: 'City Centre Alexandria',
    city: 'Alexandria',
    country: 'Egypt',
    timeZone: 'Africa/Cairo',
    cashAccountCode: 'CASH-ALEX',
    cardClearingAccountCode: 'CARD-CLEARING',
    pricesIncludeTax: true,
    registersCount: 3,
    todaySales: 32100,
    createdAt: '2024-03-20',
    updatedAt: '2025-11-25'
  },
  {
    id: 'store-003',
    tenantId: 'tenant-1',
    sapCompanyId: 'company-1',
    code: 'GIZA-MALL',
    name: 'Giza Mall Outlet',
    warehouseCode: 'WH-GIZA-1',
    priceListCode: 'PL-OUTLET',
    currency: 'EGP',
    isActive: false,
    city: 'Giza',
    country: 'Egypt',
    pricesIncludeTax: true,
    registersCount: 2,
    createdAt: '2024-06-10',
    updatedAt: '2025-10-15'
  }
];

const sampleRegisters: PosRegister[] = [
  { id: 'reg-001', storeId: 'store-001', storeName: 'Cairo Mall Store', code: 'REG-01', name: 'Register 1 - Main', serialNumber: 'SN-2024-001', isActive: true, lastSyncAt: '2025-11-25T14:30:00', offlineAllowed: true, isOnline: true, currentSessionId: 'sess-001', currentCashier: 'Ahmed Hassan', createdAt: '2024-01-15' },
  { id: 'reg-002', storeId: 'store-001', storeName: 'Cairo Mall Store', code: 'REG-02', name: 'Register 2', serialNumber: 'SN-2024-002', isActive: true, lastSyncAt: '2025-11-25T14:28:00', offlineAllowed: true, isOnline: true, currentSessionId: 'sess-002', currentCashier: 'Sara Mohamed', createdAt: '2024-01-15' },
  { id: 'reg-003', storeId: 'store-001', storeName: 'Cairo Mall Store', code: 'REG-03', name: 'Register 3', serialNumber: 'SN-2024-003', isActive: true, lastSyncAt: '2025-11-25T10:15:00', offlineAllowed: false, isOnline: false, createdAt: '2024-02-20' },
  { id: 'reg-004', storeId: 'store-001', storeName: 'Cairo Mall Store', code: 'REG-04', name: 'Register 4 - Express', isActive: false, offlineAllowed: false, createdAt: '2024-05-10' },
  { id: 'reg-005', storeId: 'store-002', storeName: 'Alexandria City Centre', code: 'REG-01', name: 'Register 1', serialNumber: 'SN-2024-010', isActive: true, lastSyncAt: '2025-11-25T14:25:00', offlineAllowed: true, isOnline: true, currentSessionId: 'sess-005', currentCashier: 'Omar Farouk', createdAt: '2024-03-20' },
  { id: 'reg-006', storeId: 'store-002', storeName: 'Alexandria City Centre', code: 'REG-02', name: 'Register 2', isActive: true, offlineAllowed: true, isOnline: true, createdAt: '2024-03-20' }
];

const sampleUserProfiles: PosUserProfile[] = [
  { id: 'prof-001', userId: 'user-1', userName: 'Ahmed Hassan', storeId: 'store-001', storeName: 'Cairo Mall Store', role: 'Supervisor', canOverrideDiscountPercent: 15, maxCashRefundAmount: 5000, isActive: true },
  { id: 'prof-002', userId: 'user-2', userName: 'Sara Mohamed', storeId: 'store-001', storeName: 'Cairo Mall Store', role: 'Cashier', canOverrideDiscountPercent: 5, maxCashRefundAmount: 1000, isActive: true },
  { id: 'prof-003', userId: 'user-3', userName: 'Omar Farouk', storeId: 'store-002', storeName: 'Alexandria City Centre', role: 'StoreManager', canOverrideDiscountPercent: 25, maxCashRefundAmount: 10000, isActive: true },
  { id: 'prof-004', userId: 'user-4', userName: 'Mona Ali', storeId: 'store-001', storeName: 'Cairo Mall Store', role: 'Cashier', canOverrideDiscountPercent: 5, maxCashRefundAmount: 1000, isActive: true },
  { id: 'prof-005', userId: 'user-5', userName: 'Khaled Ibrahim', storeId: 'store-002', storeName: 'Alexandria City Centre', role: 'Cashier', canOverrideDiscountPercent: 5, isActive: false }
];

const sampleItems: PosItemCache[] = [
  { id: 'item-001', tenantId: 'tenant-1', sapCompanyId: 'company-1', itemCode: 'ITEM-1001', itemName: 'T-Shirt White L', itemGroup: 'Apparel', barcodes: ['6223000000012', '6223000000029'], uomCode: 'Each', isActive: true, vatGroup: 'VAT14', priceListCode: 'PL-RETAIL', unitPrice: 500, currency: 'EGP', inStock: 45, lastSyncAt: '2025-11-25T08:00:00' },
  { id: 'item-002', tenantId: 'tenant-1', sapCompanyId: 'company-1', itemCode: 'ITEM-1002', itemName: 'T-Shirt Black M', itemGroup: 'Apparel', barcodes: ['6223000000036'], uomCode: 'Each', isActive: true, vatGroup: 'VAT14', priceListCode: 'PL-RETAIL', unitPrice: 500, currency: 'EGP', inStock: 32, lastSyncAt: '2025-11-25T08:00:00' },
  { id: 'item-003', tenantId: 'tenant-1', sapCompanyId: 'company-1', itemCode: 'ITEM-2001', itemName: 'Jeans Blue 32', itemGroup: 'Apparel', barcodes: ['6223000000043'], uomCode: 'Each', isActive: true, vatGroup: 'VAT14', priceListCode: 'PL-RETAIL', unitPrice: 1200, currency: 'EGP', inStock: 18, lastSyncAt: '2025-11-25T08:00:00' },
  { id: 'item-004', tenantId: 'tenant-1', sapCompanyId: 'company-1', itemCode: 'ITEM-3001', itemName: 'Sneakers Running 42', itemGroup: 'Footwear', barcodes: ['6223000000050'], uomCode: 'Pair', isActive: true, vatGroup: 'VAT14', priceListCode: 'PL-RETAIL', unitPrice: 2500, currency: 'EGP', inStock: 12, lastSyncAt: '2025-11-25T08:00:00' },
  { id: 'item-005', tenantId: 'tenant-1', sapCompanyId: 'company-1', itemCode: 'ITEM-4001', itemName: 'Leather Belt Brown', itemGroup: 'Accessories', barcodes: ['6223000000067'], uomCode: 'Each', isActive: true, vatGroup: 'VAT14', priceListCode: 'PL-RETAIL', unitPrice: 350, currency: 'EGP', inStock: 56, lastSyncAt: '2025-11-25T08:00:00' },
  { id: 'item-006', tenantId: 'tenant-1', sapCompanyId: 'company-1', itemCode: 'ITEM-5001', itemName: 'Gift Card 500', itemGroup: 'Gift Cards', barcodes: ['6223000000074'], uomCode: 'Each', isActive: true, priceListCode: 'PL-RETAIL', unitPrice: 500, currency: 'EGP', lastSyncAt: '2025-11-25T08:00:00' }
];

// ============================================================
// UTILITY COMPONENTS
// ============================================================

const StatusBadge: React.FC<{ active: boolean }> = ({ active }) => (
  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
    active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
  }`}>
    {active ? 'Active' : 'Inactive'}
  </span>
);

const OnlineBadge: React.FC<{ online?: boolean }> = ({ online }) => {
  if (online === undefined) return null;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${
      online ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
    }`}>
      {online ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
      {online ? 'Online' : 'Offline'}
    </span>
  );
};

const RoleBadge: React.FC<{ role: PosRole }> = ({ role }) => {
  const styles = {
    Cashier: 'bg-blue-100 text-blue-700',
    Supervisor: 'bg-purple-100 text-purple-700',
    StoreManager: 'bg-orange-100 text-orange-700'
  };
  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${styles[role]}`}>
      {role === 'StoreManager' ? 'Store Manager' : role}
    </span>
  );
};

const KPICard: React.FC<{
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, subtitle, icon, color }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

// ============================================================
// POS CONFIGURATION DASHBOARD
// ============================================================

export const POSConfigDashboard: React.FC = () => {
  const activeStores = sampleStores.filter(s => s.isActive).length;
  const activeRegisters = sampleRegisters.filter(r => r.isActive).length;
  const onlineRegisters = sampleRegisters.filter(r => r.isOnline).length;
  const todaySales = sampleStores.reduce((sum, s) => sum + (s.todaySales || 0), 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">POS Configuration</h1>
          <p className="text-sm text-gray-500 mt-1">Manage stores, registers, and POS settings</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Sync All
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Store
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard
          title="Active Stores"
          value={activeStores}
          subtitle={`${sampleStores.length} total`}
          icon={<Store className="w-5 h-5 text-blue-600" />}
          color="bg-blue-50"
        />
        <KPICard
          title="Active Registers"
          value={activeRegisters}
          subtitle={`${onlineRegisters} online now`}
          icon={<Monitor className="w-5 h-5 text-green-600" />}
          color="bg-green-50"
        />
        <KPICard
          title="Today's Sales"
          value={`EGP ${(todaySales / 1000).toFixed(1)}K`}
          subtitle="All stores"
          icon={<DollarSign className="w-5 h-5 text-purple-600" />}
          color="bg-purple-50"
        />
        <KPICard
          title="POS Users"
          value={sampleUserProfiles.filter(p => p.isActive).length}
          subtitle="Active profiles"
          icon={<Users className="w-5 h-5 text-orange-600" />}
          color="bg-orange-50"
        />
      </div>

      {/* Stores Grid */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Stores Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleStores.map((store) => {
            const storeRegisters = sampleRegisters.filter(r => r.storeId === store.id);
            const onlineRegs = storeRegisters.filter(r => r.isOnline).length;
            
            return (
              <div 
                key={store.id} 
                className={`bg-white rounded-xl border p-5 hover:shadow-md transition-shadow cursor-pointer ${
                  store.isActive ? 'border-gray-200' : 'border-gray-100 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg ${store.isActive ? 'bg-blue-50' : 'bg-gray-100'}`}>
                      <Store className={`w-5 h-5 ${store.isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{store.name}</h3>
                      <p className="text-xs text-gray-500 font-mono">{store.code}</p>
                    </div>
                  </div>
                  <StatusBadge active={store.isActive} />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{store.city}, {store.country}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Warehouse className="w-4 h-4 text-gray-400" />
                    <span>{store.warehouseCode}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <span>{store.priceListCode}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1">
                      <Monitor className="w-3 h-3 text-gray-400" />
                      {storeRegisters.length} registers
                    </span>
                    <span className="flex items-center gap-1 text-green-600">
                      <Wifi className="w-3 h-3" />
                      {onlineRegs} online
                    </span>
                  </div>
                  {store.todaySales && (
                    <span className="text-sm font-semibold text-gray-900">
                      EGP {(store.todaySales / 1000).toFixed(1)}K
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: Monitor, label: 'Manage Registers', count: sampleRegisters.length, color: 'text-blue-600 bg-blue-50' },
          { icon: Users, label: 'User Profiles', count: sampleUserProfiles.length, color: 'text-green-600 bg-green-50' },
          { icon: Package, label: 'Items Cache', count: sampleItems.length, color: 'text-purple-600 bg-purple-50' },
          { icon: Settings, label: 'POS Settings', color: 'text-orange-600 bg-orange-50' }
        ].map((item, idx) => (
          <button 
            key={idx}
            className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow text-left flex items-center gap-4"
          >
            <div className={`p-3 rounded-lg ${item.color}`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{item.label}</p>
              {item.count !== undefined && (
                <p className="text-xs text-gray-500">{item.count} items</p>
              )}
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// STORES LIST
// ============================================================

export const StoresList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStores = sampleStores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">POS Stores</h1>
          <p className="text-sm text-gray-500 mt-1">Manage retail store locations</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Store
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search stores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Stores Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Store</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Price List</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Registers</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredStores.map((store) => (
              <tr key={store.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Store className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{store.name}</p>
                      <p className="text-xs text-gray-500 font-mono">{store.code}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {store.city}, {store.country}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm font-mono text-gray-600">{store.warehouseCode}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm font-mono text-gray-600">{store.priceListCode}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-sm font-medium text-gray-900">{store.registersCount || 0}</span>
                </td>
                <td className="px-4 py-4">
                  <StatusBadge active={store.isActive} />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="View">
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="Edit">
                      <Edit className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="More">
                      <MoreHorizontal className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============================================================
// STORE DETAIL / CREATE FORM
// ============================================================

export const StoreForm: React.FC<{ storeId?: string }> = ({ storeId }) => {
  const isEdit = !!storeId;
  const store = storeId ? sampleStores.find(s => s.id === storeId) : null;

  const [formData, setFormData] = useState({
    code: store?.code || '',
    name: store?.name || '',
    branchCode: store?.branchCode || '',
    warehouseCode: store?.warehouseCode || '',
    priceListCode: store?.priceListCode || '',
    currency: store?.currency || 'EGP',
    address: store?.address || '',
    city: store?.city || '',
    country: store?.country || 'Egypt',
    timeZone: store?.timeZone || 'Africa/Cairo',
    cashAccountCode: store?.cashAccountCode || '',
    cardClearingAccountCode: store?.cardClearingAccountCode || '',
    pricesIncludeTax: store?.pricesIncludeTax ?? true,
    isActive: store?.isActive ?? true
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? 'Edit Store' : 'Create New Store'}
        </h1>
        <p className="text-sm text-gray-500 mt-1">Configure POS store settings</p>
      </div>

      <form className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="CAIRO-MALL-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Cairo Mall Store"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Branch Code</label>
              <input
                type="text"
                value={formData.branchCode}
                onChange={(e) => setFormData({ ...formData, branchCode: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="BR-CAIRO"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
              <select
                value={formData.timeZone}
                onChange={(e) => setFormData({ ...formData, timeZone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="Africa/Cairo">Africa/Cairo (EET)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Store address..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Cairo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Egypt"
              />
            </div>
          </div>
        </div>

        {/* SAP Integration */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">SAP B1 Integration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Warehouse Code <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.warehouseCode}
                onChange={(e) => setFormData({ ...formData, warehouseCode: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select warehouse...</option>
                <option value="WH-CAIRO-1">WH-CAIRO-1 - Cairo Main</option>
                <option value="WH-ALEX-1">WH-ALEX-1 - Alexandria</option>
                <option value="WH-GIZA-1">WH-GIZA-1 - Giza</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price List <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.priceListCode}
                onChange={(e) => setFormData({ ...formData, priceListCode: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select price list...</option>
                <option value="PL-RETAIL">PL-RETAIL - Retail Prices</option>
                <option value="PL-OUTLET">PL-OUTLET - Outlet Prices</option>
                <option value="PL-VIP">PL-VIP - VIP Prices</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="EGP">EGP - Egyptian Pound</option>
                <option value="USD">USD - US Dollar</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cash Account Code</label>
              <input
                type="text"
                value={formData.cashAccountCode}
                onChange={(e) => setFormData({ ...formData, cashAccountCode: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="CASH-CAIRO"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Clearing Account</label>
              <input
                type="text"
                value={formData.cardClearingAccountCode}
                onChange={(e) => setFormData({ ...formData, cardClearingAccountCode: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="CARD-CLEARING"
              />
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <div>
                <p className="text-sm font-medium text-gray-900">Prices Include Tax</p>
                <p className="text-xs text-gray-500">Display prices with VAT included</p>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, pricesIncludeTax: !formData.pricesIncludeTax })}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  formData.pricesIncludeTax ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  formData.pricesIncludeTax ? 'translate-x-5' : ''
                }`} />
              </button>
            </label>
            <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <div>
                <p className="text-sm font-medium text-gray-900">Store Active</p>
                <p className="text-xs text-gray-500">Allow transactions at this store</p>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  formData.isActive ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  formData.isActive ? 'translate-x-5' : ''
                }`} />
              </button>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            {isEdit ? 'Update Store' : 'Create Store'}
          </button>
        </div>
      </form>
    </div>
  );
};

// ============================================================
// REGISTERS LIST
// ============================================================

export const RegistersList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [storeFilter, setStoreFilter] = useState<string>('all');

  const filteredRegisters = sampleRegisters.filter(reg => {
    const matchesSearch = reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStore = storeFilter === 'all' || reg.storeId === storeFilter;
    return matchesSearch && matchesStore;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">POS Registers</h1>
          <p className="text-sm text-gray-500 mt-1">Manage POS terminals and devices</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Register
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search registers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={storeFilter}
          onChange={(e) => setStoreFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Stores</option>
          {sampleStores.map(store => (
            <option key={store.id} value={store.id}>{store.name}</option>
          ))}
        </select>
      </div>

      {/* Registers Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Register</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Store</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Connection</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Current Cashier</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Last Sync</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredRegisters.map((reg) => (
              <tr key={reg.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${reg.isActive ? 'bg-green-50' : 'bg-gray-100'}`}>
                      <Monitor className={`w-4 h-4 ${reg.isActive ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{reg.name}</p>
                      <p className="text-xs text-gray-500 font-mono">{reg.code}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-gray-600">{reg.storeName}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <OnlineBadge online={reg.isOnline} />
                    {reg.offlineAllowed && (
                      <span className="text-xs text-gray-500">(Offline OK)</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  {reg.currentCashier ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-medium">
                        {reg.currentCashier.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm text-gray-900">{reg.currentCashier}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-4">
                  {reg.lastSyncAt ? (
                    <span className="text-sm text-gray-600">
                      {new Date(reg.lastSyncAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">Never</span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <StatusBadge active={reg.isActive} />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="Edit">
                      <Edit className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-600" title="Sync">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="More">
                      <MoreHorizontal className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============================================================
// POS USER PROFILES
// ============================================================

export const UserProfilesList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfiles = sampleUserProfiles.filter(profile =>
    profile.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">POS User Profiles</h1>
          <p className="text-sm text-gray-500 mt-1">Manage user roles and permissions for POS</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Profile
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Profiles Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Store</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Max Discount</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Max Refund</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProfiles.map((profile) => (
              <tr key={profile.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-medium">
                      {profile.userName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{profile.userName}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-gray-600">{profile.storeName}</span>
                </td>
                <td className="px-4 py-4">
                  <RoleBadge role={profile.role} />
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="text-sm font-medium text-gray-900">{profile.canOverrideDiscountPercent}%</span>
                </td>
                <td className="px-4 py-4 text-right">
                  {profile.maxCashRefundAmount ? (
                    <span className="text-sm text-gray-600">
                      EGP {profile.maxCashRefundAmount.toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <StatusBadge active={profile.isActive} />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="Edit">
                      <Edit className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="Delete">
                      <Trash2 className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============================================================
// ITEMS CACHE MANAGEMENT
// ============================================================

export const ItemsCacheList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = sampleItems.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.barcodes.some(b => b.includes(searchTerm))
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">POS Items Cache</h1>
          <p className="text-sm text-gray-500 mt-1">Local item data synced from SAP B1</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Sync from SAP
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, code, or barcode..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Barcodes</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">In Stock</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Last Sync</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Package className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.itemName}</p>
                      <p className="text-xs text-gray-500 font-mono">{item.itemCode}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {item.barcodes.slice(0, 2).map((barcode, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-mono rounded">
                        {barcode}
                      </span>
                    ))}
                    {item.barcodes.length > 2 && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded">
                        +{item.barcodes.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-gray-600">{item.itemGroup || '—'}</span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="text-sm font-medium text-gray-900">
                    {item.currency} {item.unitPrice.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  {item.inStock !== undefined ? (
                    <span className={`text-sm font-medium ${item.inStock > 10 ? 'text-green-600' : item.inStock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {item.inStock}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-gray-600">
                    {new Date(item.lastSyncAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <StatusBadge active={item.isActive} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============================================================
// EXPORT ALL COMPONENTS
// ============================================================

export default {
  POSConfigDashboard,
  StoresList,
  StoreForm,
  RegistersList,
  UserProfilesList,
  ItemsCacheList
};
