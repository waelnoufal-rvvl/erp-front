'use client';

// ============================================================
// POS / Retail - Part 3: Cash Sessions, Promotions, SAP Sync
// Multi-Tenant ERP System with SAP Business One Integration
// ============================================================

import React, { useState } from 'react';
import {
  Wallet, DollarSign, TrendingUp, TrendingDown, Clock, Calendar,
  User, Lock, Unlock, Plus, Minus, AlertCircle, CheckCircle2,
  XCircle, ChevronRight, ChevronDown, Edit, Trash2, Eye, Search,
  RefreshCw, Database, Zap, AlertTriangle, FileText, ArrowUpRight,
  ArrowDownLeft, Calculator, MoreHorizontal, Percent, Tag, Gift,
  Package, ShoppingBag, Target, Settings, History, Download, Filter
} from 'lucide-react';

// ============================================================
// TYPE DEFINITIONS
// ============================================================

type CashSessionStatus = 'Open' | 'Closed';
type CashMovementType = 'CashIn' | 'CashOut';
type PromotionType = 'ItemDiscount' | 'BasketDiscount' | 'Bundle';
type PosSyncStatus = 'NotSynced' | 'SyncPending' | 'Synced' | 'SyncFailed';

interface PosCashSession {
  id: string;
  storeId: string;
  storeName: string;
  registerId: string;
  registerCode: string;
  openedByUserId: string;
  openedByUserName: string;
  openedAt: string;
  openingFloatAmount: number;
  closedByUserId?: string;
  closedByUserName?: string;
  closedAt?: string;
  closingAmountDeclared?: number;
  expectedCashAmount?: number;
  variance?: number;
  status: CashSessionStatus;
  currency: string;
  transactionsCount?: number;
  totalSales?: number;
}

interface PosCashMovement {
  id: string;
  cashSessionId: string;
  type: CashMovementType;
  amount: number;
  reason: string;
  createdByUserId: string;
  createdByUserName: string;
  createdAt: string;
}

interface PosPromotion {
  id: string;
  tenantId: string;
  sapCompanyId: string;
  code: string;
  name: string;
  type: PromotionType;
  description: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  priority: number;
  conditions: { type: string; value: string; operator?: string }[];
  actions: { type: string; value: number; maxDiscount?: number }[];
  usageCount?: number;
  createdAt: string;
}

interface SyncQueueItem {
  id: string;
  transactionId: string;
  posReceiptNo: string;
  storeName: string;
  totalAmount: number;
  currency: string;
  syncStatus: PosSyncStatus;
  sapDocType?: string;
  sapDocEntry?: number;
  sapDocNum?: number;
  errorMessage?: string;
  lastAttemptAt?: string;
  attemptCount: number;
  createdAt: string;
}

// ============================================================
// SAMPLE DATA
// ============================================================

const sampleCashSessions: PosCashSession[] = [
  { id: 'sess-001', storeId: 'store-001', storeName: 'Cairo Mall Store', registerId: 'reg-001', registerCode: 'REG-01', openedByUserId: 'user-1', openedByUserName: 'Ahmed Hassan', openedAt: '2025-11-25T09:00:00', openingFloatAmount: 1000, status: 'Open', currency: 'EGP', transactionsCount: 45, totalSales: 32500 },
  { id: 'sess-002', storeId: 'store-001', storeName: 'Cairo Mall Store', registerId: 'reg-002', registerCode: 'REG-02', openedByUserId: 'user-2', openedByUserName: 'Sara Mohamed', openedAt: '2025-11-25T09:15:00', openingFloatAmount: 1000, status: 'Open', currency: 'EGP', transactionsCount: 38, totalSales: 28750 },
  { id: 'sess-003', storeId: 'store-001', storeName: 'Cairo Mall Store', registerId: 'reg-001', registerCode: 'REG-01', openedByUserId: 'user-1', openedByUserName: 'Ahmed Hassan', openedAt: '2025-11-24T09:00:00', openingFloatAmount: 1000, closedByUserId: 'user-1', closedByUserName: 'Ahmed Hassan', closedAt: '2025-11-24T21:30:00', closingAmountDeclared: 15300, expectedCashAmount: 15250, variance: 50, status: 'Closed', currency: 'EGP', transactionsCount: 68, totalSales: 45230 },
  { id: 'sess-004', storeId: 'store-002', storeName: 'Alexandria City Centre', registerId: 'reg-005', registerCode: 'REG-01', openedByUserId: 'user-3', openedByUserName: 'Omar Farouk', openedAt: '2025-11-25T10:00:00', openingFloatAmount: 1500, status: 'Open', currency: 'EGP', transactionsCount: 25, totalSales: 18900 }
];

const sampleCashMovements: PosCashMovement[] = [
  { id: 'mov-001', cashSessionId: 'sess-001', type: 'CashOut', amount: 5000, reason: 'Bank deposit drop', createdByUserId: 'user-1', createdByUserName: 'Ahmed Hassan', createdAt: '2025-11-25T13:00:00' },
  { id: 'mov-002', cashSessionId: 'sess-001', type: 'CashIn', amount: 200, reason: 'Change replenishment', createdByUserId: 'user-1', createdByUserName: 'Ahmed Hassan', createdAt: '2025-11-25T15:30:00' },
  { id: 'mov-003', cashSessionId: 'sess-002', type: 'CashOut', amount: 3000, reason: 'Bank deposit drop', createdByUserId: 'user-2', createdByUserName: 'Sara Mohamed', createdAt: '2025-11-25T14:00:00' },
];

const samplePromotions: PosPromotion[] = [
  { id: 'promo-001', tenantId: 'tenant-1', sapCompanyId: 'company-1', code: 'WEEKEND20', name: 'Weekend 20% Off', type: 'BasketDiscount', description: '20% off entire basket on weekends', startDate: '2025-11-01', endDate: '2025-12-31', isActive: true, priority: 1, conditions: [{ type: 'dayOfWeek', value: 'Sat,Sun' }], actions: [{ type: 'percentDiscount', value: 20, maxDiscount: 500 }], usageCount: 1250, createdAt: '2025-10-25' },
  { id: 'promo-002', tenantId: 'tenant-1', sapCompanyId: 'company-1', code: 'APPAREL15', name: 'Apparel 15% Off', type: 'ItemDiscount', description: '15% off all apparel items', startDate: '2025-11-15', endDate: '2025-11-30', isActive: true, priority: 2, conditions: [{ type: 'itemGroup', value: 'Apparel' }], actions: [{ type: 'percentDiscount', value: 15 }], usageCount: 890, createdAt: '2025-11-10' },
  { id: 'promo-003', tenantId: 'tenant-1', sapCompanyId: 'company-1', code: 'BUYGETFREE', name: 'Buy 2 Get 1 Free', type: 'Bundle', description: 'Buy 2 T-Shirts get 1 free (lowest price)', startDate: '2025-11-20', isActive: true, priority: 3, conditions: [{ type: 'itemGroup', value: 'T-Shirts' }, { type: 'minQuantity', value: '3' }], actions: [{ type: 'freeItem', value: 1 }], usageCount: 156, createdAt: '2025-11-18' },
  { id: 'promo-004', tenantId: 'tenant-1', sapCompanyId: 'company-1', code: 'VIP10', name: 'VIP Customer Discount', type: 'BasketDiscount', description: '10% off for VIP loyalty members', startDate: '2025-01-01', isActive: true, priority: 10, conditions: [{ type: 'customerTier', value: 'VIP' }], actions: [{ type: 'percentDiscount', value: 10 }], usageCount: 3420, createdAt: '2025-01-01' },
  { id: 'promo-005', tenantId: 'tenant-1', sapCompanyId: 'company-1', code: 'BLACKFRI50', name: 'Black Friday 50% Off', type: 'BasketDiscount', description: '50% off everything - Black Friday only', startDate: '2025-11-28', endDate: '2025-11-28', isActive: false, priority: 0, conditions: [], actions: [{ type: 'percentDiscount', value: 50, maxDiscount: 2000 }], usageCount: 0, createdAt: '2025-11-20' }
];

const sampleSyncQueue: SyncQueueItem[] = [
  { id: 'sync-001', transactionId: 'tx-001', posReceiptNo: 'RC-2025-000455', storeName: 'Cairo Mall Store', totalAmount: 2770.2, currency: 'EGP', syncStatus: 'Synced', sapDocType: 'AR Invoice', sapDocEntry: 1450, sapDocNum: 600123, attemptCount: 1, createdAt: '2025-11-25T14:30:00' },
  { id: 'sync-002', transactionId: 'tx-002', posReceiptNo: 'RC-2025-000454', storeName: 'Cairo Mall Store', totalAmount: 1539, currency: 'EGP', syncStatus: 'Synced', sapDocType: 'AR Invoice', sapDocEntry: 1449, sapDocNum: 600122, attemptCount: 1, createdAt: '2025-11-25T13:15:00' },
  { id: 'sync-003', transactionId: 'tx-004', posReceiptNo: 'RC-2025-000450', storeName: 'Alexandria City Centre', totalAmount: 890, currency: 'EGP', syncStatus: 'SyncPending', attemptCount: 0, createdAt: '2025-11-25T12:00:00' },
  { id: 'sync-004', transactionId: 'tx-005', posReceiptNo: 'RC-2025-000448', storeName: 'Cairo Mall Store', totalAmount: 3250, currency: 'EGP', syncStatus: 'SyncFailed', errorMessage: 'SAP B1: Item ITEM-9999 not found in warehouse WH-CAIRO-1', lastAttemptAt: '2025-11-25T11:35:00', attemptCount: 3, createdAt: '2025-11-25T11:30:00' },
  { id: 'sync-005', transactionId: 'tx-006', posReceiptNo: 'RC-2025-000447', storeName: 'Cairo Mall Store', totalAmount: 1120, currency: 'EGP', syncStatus: 'SyncPending', attemptCount: 0, createdAt: '2025-11-25T11:15:00' },
];

// ============================================================
// UTILITY COMPONENTS
// ============================================================

const formatCurrency = (amount: number, currency: string = 'EGP') => {
  return `${currency} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const SessionStatusBadge: React.FC<{ status: CashSessionStatus }> = ({ status }) => (
  <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${
    status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
  }`}>
    {status === 'Open' ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
    {status}
  </span>
);

const SyncStatusBadge: React.FC<{ status: PosSyncStatus }> = ({ status }) => {
  const styles: Record<PosSyncStatus, string> = { NotSynced: 'bg-gray-100 text-gray-600', SyncPending: 'bg-yellow-100 text-yellow-700', Synced: 'bg-green-100 text-green-700', SyncFailed: 'bg-red-100 text-red-700' };
  const icons: Record<PosSyncStatus, any> = { NotSynced: Database, SyncPending: RefreshCw, Synced: CheckCircle2, SyncFailed: XCircle };
  const labels: Record<PosSyncStatus, string> = { NotSynced: 'Not Synced', SyncPending: 'Pending', Synced: 'Synced', SyncFailed: 'Failed' };
  const Icon = icons[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${styles[status]}`}>
      <Icon className={`w-3 h-3 ${status === 'SyncPending' ? 'animate-spin' : ''}`} />
      {labels[status]}
    </span>
  );
};

const PromoTypeBadge: React.FC<{ type: PromotionType }> = ({ type }) => {
  const styles: Record<PromotionType, string> = { ItemDiscount: 'bg-blue-100 text-blue-700', BasketDiscount: 'bg-purple-100 text-purple-700', Bundle: 'bg-orange-100 text-orange-700' };
  const labels: Record<PromotionType, string> = { ItemDiscount: 'Item', BasketDiscount: 'Basket', Bundle: 'Bundle' };
  return <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${styles[type]}`}>{labels[type]}</span>;
};

// ============================================================
// CASH SESSIONS LIST
// ============================================================

export const CashSessionsList: React.FC = () => {
  const [showOpenSession, setShowOpenSession] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'Open' | 'Closed'>('all');
  const filteredSessions = sampleCashSessions.filter(s => statusFilter === 'all' || s.status === statusFilter);
  const openSessions = sampleCashSessions.filter(s => s.status === 'Open');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cash Sessions</h1>
          <p className="text-sm text-gray-500 mt-1">Manage till sessions and cash reconciliation</p>
        </div>
        <button onClick={() => setShowOpenSession(true)} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 flex items-center gap-2">
          <Unlock className="w-4 h-4" />Open Session
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg"><Unlock className="w-5 h-5 text-green-600" /></div>
            <div><p className="text-sm text-gray-500">Open Sessions</p><p className="text-2xl font-bold text-gray-900">{openSessions.length}</p></div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg"><DollarSign className="w-5 h-5 text-blue-600" /></div>
            <div><p className="text-sm text-gray-500">Total Float</p><p className="text-2xl font-bold text-gray-900">EGP {openSessions.reduce((s, sess) => s + sess.openingFloatAmount, 0).toLocaleString()}</p></div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg"><ShoppingBag className="w-5 h-5 text-purple-600" /></div>
            <div><p className="text-sm text-gray-500">Today's Transactions</p><p className="text-2xl font-bold text-gray-900">{openSessions.reduce((s, sess) => s + (sess.transactionsCount || 0), 0)}</p></div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-lg"><TrendingUp className="w-5 h-5 text-orange-600" /></div>
            <div><p className="text-sm text-gray-500">Today's Sales</p><p className="text-2xl font-bold text-gray-900">EGP {(openSessions.reduce((s, sess) => s + (sess.totalSales || 0), 0) / 1000).toFixed(1)}K</p></div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {(['all', 'Open', 'Closed'] as const).map((status) => (
          <button key={status} onClick={() => setStatusFilter(status)} className={`px-4 py-2 rounded-lg text-sm font-medium ${statusFilter === status ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {status === 'all' ? 'All Sessions' : status}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Register</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Cashier</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Opened</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Float</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredSessions.map((session) => (
              <tr key={session.id} className="hover:bg-gray-50">
                <td className="px-4 py-4"><div><p className="text-sm font-medium text-gray-900">{session.storeName}</p><p className="text-xs text-gray-500">{new Date(session.openedAt).toLocaleDateString()}</p></div></td>
                <td className="px-4 py-4"><span className="text-sm font-mono text-gray-600">{session.registerCode}</span></td>
                <td className="px-4 py-4"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-medium">{session.openedByUserName.split(' ').map(n => n[0]).join('')}</div><span className="text-sm text-gray-900">{session.openedByUserName}</span></div></td>
                <td className="px-4 py-4"><span className="text-sm text-gray-600">{new Date(session.openedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span></td>
                <td className="px-4 py-4 text-right"><span className="text-sm font-medium text-gray-900">{formatCurrency(session.openingFloatAmount, session.currency)}</span></td>
                <td className="px-4 py-4 text-center"><span className="text-sm text-gray-900">{session.transactionsCount || 0}</span></td>
                <td className="px-4 py-4 text-right"><span className="text-sm font-medium text-gray-900">{session.totalSales ? formatCurrency(session.totalSales, session.currency) : '—'}</span></td>
                <td className="px-4 py-4"><SessionStatusBadge status={session.status} /></td>
                <td className="px-4 py-4"><div className="flex items-center justify-center gap-1"><button className="p-1.5 hover:bg-gray-100 rounded-lg" title="View Details"><Eye className="w-4 h-4 text-gray-500" /></button>{session.status === 'Open' && (<button className="p-1.5 hover:bg-red-50 rounded-lg" title="Close Session"><Lock className="w-4 h-4 text-red-500" /></button>)}<button className="p-1.5 hover:bg-gray-100 rounded-lg" title="More"><MoreHorizontal className="w-4 h-4 text-gray-500" /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showOpenSession && <OpenSessionModal onClose={() => setShowOpenSession(false)} />}
    </div>
  );
};

// ============================================================
// OPEN SESSION MODAL
// ============================================================

const OpenSessionModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState({ storeId: '', registerId: '', openingFloat: '1000' });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Open Cash Session</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><XCircle className="w-5 h-5 text-gray-500" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Store</label><select value={formData.storeId} onChange={(e) => setFormData({ ...formData, storeId: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"><option value="">Select store...</option><option value="store-001">Cairo Mall Store</option><option value="store-002">Alexandria City Centre</option></select></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Register</label><select value={formData.registerId} onChange={(e) => setFormData({ ...formData, registerId: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"><option value="">Select register...</option><option value="reg-001">REG-01 - Main</option><option value="reg-002">REG-02</option></select></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Opening Float Amount</label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">EGP</span><input type="number" value={formData.openingFloat} onChange={(e) => setFormData({ ...formData, openingFloat: e.target.value })} className="w-full pl-14 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" /></div><p className="text-xs text-gray-500 mt-1">Count the cash in the drawer before opening</p></div>
        </div>
        <div className="p-4 border-t border-gray-200 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 flex items-center gap-2"><Unlock className="w-4 h-4" />Open Session</button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// PROMOTIONS LIST
// ============================================================

export const PromotionsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<PromotionType | 'all'>('all');
  const filteredPromotions = samplePromotions.filter(promo => {
    const matchesSearch = promo.name.toLowerCase().includes(searchTerm.toLowerCase()) || promo.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || promo.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Promotions</h1><p className="text-sm text-gray-500 mt-1">Manage pricing rules and discounts</p></div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><Plus className="w-4 h-4" />Create Promotion</button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-64"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search promotions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" /></div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as PromotionType | 'all')} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"><option value="all">All Types</option><option value="ItemDiscount">Item Discount</option><option value="BasketDiscount">Basket Discount</option><option value="Bundle">Bundle</option></select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPromotions.map((promo) => (
          <div key={promo.id} className={`bg-white rounded-xl border p-5 hover:shadow-md transition-shadow ${promo.isActive ? 'border-gray-200' : 'border-gray-100 opacity-60'}`}>
            <div className="flex items-start justify-between mb-3">
              <div><div className="flex items-center gap-2 mb-1"><span className="font-mono text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{promo.code}</span><PromoTypeBadge type={promo.type} /></div><h3 className="font-semibold text-gray-900">{promo.name}</h3></div>
              <span className={`w-2 h-2 rounded-full ${promo.isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
            </div>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{promo.description}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(promo.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}{promo.endDate && ` - ${new Date(promo.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}</span>
              <span className="flex items-center gap-1"><Target className="w-3 h-3" />P{promo.priority}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-sm text-gray-500">Used {promo.usageCount?.toLocaleString() || 0} times</span>
              <div className="flex items-center gap-1"><button className="p-1.5 hover:bg-gray-100 rounded-lg"><Edit className="w-4 h-4 text-gray-500" /></button><button className="p-1.5 hover:bg-gray-100 rounded-lg"><MoreHorizontal className="w-4 h-4 text-gray-500" /></button></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// SAP SYNC QUEUE
// ============================================================

export const SAPSyncQueue: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<PosSyncStatus | 'all'>('all');
  const filteredQueue = sampleSyncQueue.filter(item => statusFilter === 'all' || item.syncStatus === statusFilter);
  const pendingCount = sampleSyncQueue.filter(s => s.syncStatus === 'SyncPending').length;
  const failedCount = sampleSyncQueue.filter(s => s.syncStatus === 'SyncFailed').length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">SAP B1 Sync Queue</h1><p className="text-sm text-gray-500 mt-1">Monitor POS transaction posting to SAP</p></div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2"><RefreshCw className="w-4 h-4" />Retry Failed</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><Zap className="w-4 h-4" />Process Queue</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4"><p className="text-sm text-gray-500">Total in Queue</p><p className="text-2xl font-bold text-gray-900 mt-1">{sampleSyncQueue.length}</p></div>
        <div className="bg-white rounded-xl border border-gray-200 p-4"><p className="text-sm text-gray-500">Pending</p><p className="text-2xl font-bold text-yellow-600 mt-1">{pendingCount}</p></div>
        <div className="bg-white rounded-xl border border-gray-200 p-4"><p className="text-sm text-gray-500">Failed</p><p className="text-2xl font-bold text-red-600 mt-1">{failedCount}</p></div>
        <div className="bg-white rounded-xl border border-gray-200 p-4"><p className="text-sm text-gray-500">Synced Today</p><p className="text-2xl font-bold text-green-600 mt-1">{sampleSyncQueue.filter(s => s.syncStatus === 'Synced').length}</p></div>
      </div>

      {failedCount > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div><p className="text-sm font-medium text-red-800">{failedCount} transaction(s) failed to sync to SAP</p><p className="text-sm text-red-700 mt-0.5">Review the errors below and retry after resolving the issues.</p></div>
        </div>
      )}

      <div className="flex items-center gap-2">
        {(['all', 'SyncPending', 'SyncFailed', 'Synced'] as const).map((status) => (
          <button key={status} onClick={() => setStatusFilter(status)} className={`px-4 py-2 rounded-lg text-sm font-medium ${statusFilter === status ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {status === 'all' ? 'All' : status === 'SyncPending' ? 'Pending' : status === 'SyncFailed' ? 'Failed' : 'Synced'}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Store</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">SAP Document</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Error</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredQueue.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-4"><div><p className="font-mono text-sm font-medium text-gray-900">{item.posReceiptNo}</p><p className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleString()}</p></div></td>
                <td className="px-4 py-4"><span className="text-sm text-gray-600">{item.storeName}</span></td>
                <td className="px-4 py-4 text-right"><span className="text-sm font-medium text-gray-900">{formatCurrency(item.totalAmount, item.currency)}</span></td>
                <td className="px-4 py-4"><SyncStatusBadge status={item.syncStatus} /></td>
                <td className="px-4 py-4">{item.sapDocNum ? (<div className="flex items-center gap-2"><Database className="w-4 h-4 text-green-600" /><span className="text-sm font-mono text-gray-900">#{item.sapDocNum}</span><span className="text-xs text-gray-500">({item.sapDocType})</span></div>) : (<span className="text-sm text-gray-400">—</span>)}</td>
                <td className="px-4 py-4">{item.errorMessage ? (<div className="max-w-xs"><p className="text-sm text-red-600 truncate" title={item.errorMessage}>{item.errorMessage}</p><p className="text-xs text-gray-500">{item.attemptCount} attempt(s)</p></div>) : (<span className="text-sm text-gray-400">—</span>)}</td>
                <td className="px-4 py-4"><div className="flex items-center justify-center gap-1">{item.syncStatus === 'SyncFailed' && (<button className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-600" title="Retry"><RefreshCw className="w-4 h-4" /></button>)}<button className="p-1.5 hover:bg-gray-100 rounded-lg" title="View Details"><Eye className="w-4 h-4 text-gray-500" /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function PosRetailPart3() {
  return <CashSessionsList />;
}
