'use client';

import React, { useState } from 'react';
import {
  ChevronRight, ChevronDown, Plus, Search, Filter, Download, Upload, RefreshCw,
  MoreHorizontal, Edit, Trash2, Eye, Copy, Check, X, AlertCircle, CheckCircle,
  Wallet, Calendar, DollarSign, Settings, Layers, Target, Shield, Clock,
  ChevronLeft, Save, FileText, Link2, Database, ArrowRight, Percent, Building,
  Hash, Activity, Box, MapPin, Truck, Users, ShoppingCart, Package, Globe,
  CreditCard, Receipt, FileCheck, Send, XCircle, AlertTriangle, Tag, Zap,
  Gift, BadgePercent, TrendingDown, Star, Crown, Sparkles, Calculator
} from 'lucide-react';

// ============================================================
// SHARED COMPONENTS
// ============================================================

const Tabs = ({ tabs, active, onChange }) => (
  <div className="flex border-b border-slate-200">
    {tabs.map(tab => (
      <button key={tab.id} onClick={() => onChange(tab.id)}
        className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
          active === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
        }`}>
        <span className="flex items-center gap-2">{tab.label}
          {tab.badge && <span className={`px-2 py-0.5 text-xs rounded-full ${tab.badgeColor || 'bg-slate-100 text-slate-600'}`}>{tab.badge}</span>}
        </span>
      </button>
    ))}
  </div>
);

const StatusBadge = ({ status }) => {
  const config = {
    Active: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    Inactive: { bg: 'bg-slate-100', text: 'text-slate-500', dot: 'bg-slate-400' },
    Expired: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
    Scheduled: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    Line: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    Header: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
    Promotion: { bg: 'bg-pink-50', text: 'text-pink-700', dot: 'bg-pink-500' },
    All: { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
    POS: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    Ecommerce: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
    SalesCore: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    PriceList: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    CustomerSpecific: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    ContractPrice: { bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-500' },
  };
  const c = config[status] || config.Active;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`}></span>
      {status.replace(/([A-Z])/g, ' $1').trim()}
    </span>
  );
};

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl border border-slate-200 ${className}`}>{children}</div>
);

const Button = ({ children, variant = 'primary', size = 'md', icon: Icon = null, onClick = () => {}, disabled = false, className = '' }) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300',
    secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50',
    success: 'bg-green-600 text-white hover:bg-green-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    warning: 'bg-amber-500 text-white hover:bg-amber-600',
    ghost: 'text-slate-600 hover:bg-slate-100',
  };
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm', lg: 'px-5 py-2.5 text-base' };
  return (
    <button onClick={onClick} disabled={disabled}
      className={`inline-flex items-center gap-2 font-medium rounded-lg transition-colors ${variants[variant]} ${sizes[size]} disabled:cursor-not-allowed ${className}`}>
      {Icon && <Icon size={size === 'sm' ? 14 : 16} />}
      {children}
    </button>
  );
};

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;
  const sizes = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl', xl: 'max-w-6xl' };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className={`bg-white rounded-xl shadow-xl w-full ${sizes[size]} max-h-[90vh] overflow-hidden flex flex-col`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
};

const FormField = ({ label, required = false, children, hint = '' }) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {hint && <p className="text-xs text-slate-500">{hint}</p>}
  </div>
);

const Input = ({ className = '', ...props }) => (
  <input {...props} className={`w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`} />
);

const Select = ({ options, className = '', ...props }) => (
  <select {...props} className={`w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}>
    {options.map(opt => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
  </select>
);

const formatCurrency = (amount, currency = 'EGP') => new Intl.NumberFormat('en-EG', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);

// ============================================================
// PRICE LISTS PAGE
// ============================================================
const PriceListsPage = ({ onViewPriceList, onCreatePriceList }) => {
  const priceLists = [
    { id: '1', code: 'PL-RETAIL', name: 'Retail Price List', currency: 'EGP', isDefault: true, isActive: true, itemCount: 1250, validFrom: '2025-01-01', validTo: null },
    { id: '2', code: 'PL-WHOLESALE', name: 'Wholesale Price List', currency: 'EGP', isDefault: false, isActive: true, itemCount: 1250, validFrom: '2025-01-01', validTo: null },
    { id: '3', code: 'PL-VIP', name: 'VIP Customers', currency: 'EGP', isDefault: false, isActive: true, itemCount: 850, validFrom: '2025-01-01', validTo: null },
    { id: '4', code: 'PL-EXPORT', name: 'Export Price List', currency: 'USD', isDefault: false, isActive: true, itemCount: 420, validFrom: '2025-01-01', validTo: null },
    { id: '5', code: 'PL-PROMO-Q3', name: 'Q3 2025 Promotion', currency: 'EGP', isDefault: false, isActive: true, itemCount: 125, validFrom: '2025-07-01', validTo: '2025-09-30' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Price Lists</h2>
          <p className="text-sm text-slate-500">Manage base prices for items by customer segment</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={RefreshCw}>Sync from SAP</Button>
          <Button icon={Plus} onClick={onCreatePriceList}>New Price List</Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Total Price Lists</p>
          <p className="text-2xl font-bold text-slate-900">5</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Active</p>
          <p className="text-2xl font-bold text-green-600">5</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Total Items Priced</p>
          <p className="text-2xl font-bold text-blue-600">3,895</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Currencies</p>
          <p className="text-2xl font-bold text-slate-900">2</p>
        </Card>
      </div>

      {/* Price Lists Grid */}
      <div className="grid grid-cols-2 gap-4">
        {priceLists.map(pl => (
          <Card key={pl.id} className={`hover:shadow-md transition-shadow ${pl.isDefault ? 'ring-2 ring-blue-500' : ''}`}>
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${pl.isDefault ? 'bg-blue-100' : 'bg-slate-100'}`}>
                    <Tag size={20} className={pl.isDefault ? 'text-blue-600' : 'text-slate-600'} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">{pl.name}</h3>
                      {pl.isDefault && <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded">Default</span>}
                    </div>
                    <p className="text-sm text-slate-500">{pl.code}</p>
                  </div>
                </div>
                <StatusBadge status={pl.isActive ? 'Active' : 'Inactive'} />
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500">Currency</p>
                  <p className="font-semibold">{pl.currency}</p>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500">Items</p>
                  <p className="font-semibold">{pl.itemCount.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500">Valid</p>
                  <p className="font-semibold text-xs">{pl.validTo ? `Until ${pl.validTo}` : 'No Expiry'}</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button variant="ghost" size="sm" icon={Eye} onClick={() => onViewPriceList(pl)}>View Prices</Button>
                <Button variant="ghost" size="sm" icon={Edit}>Edit</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// PRICE LIST ITEMS VIEW
// ============================================================
const PriceListItemsView = ({ priceList, onClose }) => {
  const items = [
    { itemCode: 'ITEM-001', description: 'Standard Widget A', uom: 'PC', price: 200, minQty: null, validFrom: null, validTo: null },
    { itemCode: 'ITEM-002', description: 'Premium Widget B', uom: 'PC', price: 350, minQty: null, validFrom: null, validTo: null },
    { itemCode: 'ITEM-003', description: 'Economy Widget C', uom: 'PC', price: 120, minQty: null, validFrom: null, validTo: null },
    { itemCode: 'ITEM-001', description: 'Standard Widget A (Bulk)', uom: 'PC', price: 180, minQty: 100, validFrom: null, validTo: null },
    { itemCode: 'SERV-001', description: 'Installation Service', uom: 'HOUR', price: 500, minQty: null, validFrom: null, validTo: null },
    { itemCode: 'SERV-002', description: 'Maintenance Service', uom: 'HOUR', price: 350, minQty: null, validFrom: null, validTo: null },
  ];

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <Card className="p-4 bg-slate-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900">{priceList?.name || 'Retail Price List'}</h3>
            <p className="text-sm text-slate-500">{priceList?.code || 'PL-RETAIL'} • {priceList?.currency || 'EGP'}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" icon={Upload}>Import</Button>
            <Button variant="secondary" size="sm" icon={Download}>Export</Button>
            <Button size="sm" icon={Plus}>Add Item</Button>
          </div>
        </div>
      </Card>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" placeholder="Search items..." className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm" />
      </div>

      {/* Items Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Item Code</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Description</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">UoM</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Price</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Min Qty</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Validity</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-sm font-semibold text-slate-900">{item.itemCode}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{item.description}</td>
                  <td className="px-4 py-3 text-center text-sm text-slate-600">{item.uom}</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">{formatCurrency(item.price)}</td>
                  <td className="px-4 py-3 text-center text-sm">
                    {item.minQty ? <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">{item.minQty}+</span> : <span className="text-slate-400">-</span>}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-slate-500">
                    {item.validFrom || item.validTo ? `${item.validFrom || ''} - ${item.validTo || ''}` : 'Always'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1.5 hover:bg-slate-100 rounded"><Edit size={14} className="text-slate-400" /></button>
                      <button className="p-1.5 hover:bg-slate-100 rounded"><Trash2 size={14} className="text-slate-400" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex justify-end">
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};

// ============================================================
// SPECIAL PRICES PAGE
// ============================================================
const SpecialPricesPage = ({ onCreateSpecialPrice }) => {
  const specialPrices = [
    { id: '1', bpCode: 'C10001', bpName: 'Cairo Industries Ltd', itemCode: 'ITEM-001', itemName: 'Standard Widget A', uom: 'PC', price: 175, currency: 'EGP', minQty: null, validFrom: '2025-01-01', validTo: '2025-12-31', priority: 1, isActive: true },
    { id: '2', bpCode: 'C10001', bpName: 'Cairo Industries Ltd', itemCode: 'SERV-001', itemName: 'Installation Service', uom: 'HOUR', price: 400, currency: 'EGP', minQty: 10, validFrom: '2025-01-01', validTo: '2025-12-31', priority: 1, isActive: true },
    { id: '3', bpCode: 'C10002', bpName: 'Alexandria Trading Co', itemCode: 'ITEM-002', itemName: 'Premium Widget B', uom: 'PC', price: 300, currency: 'EGP', minQty: 50, validFrom: '2025-06-01', validTo: '2025-08-31', priority: 2, isActive: true },
    { id: '4', bpCode: 'C10003', bpName: 'Delta Electronics', itemCode: 'ITEM-001', itemName: 'Standard Widget A', uom: 'PC', price: 185, currency: 'EGP', minQty: null, validFrom: '2025-01-01', validTo: null, priority: 1, isActive: true },
    { id: '5', bpCode: 'C10004', bpName: 'Giza Supplies', itemCode: 'ITEM-003', itemName: 'Economy Widget C', uom: 'PC', price: 100, currency: 'EGP', minQty: 200, validFrom: '2025-03-01', validTo: '2025-05-31', priority: 1, isActive: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Special Prices</h2>
          <p className="text-sm text-slate-500">Customer-specific pricing agreements</p>
        </div>
        <Button icon={Plus} onClick={onCreateSpecialPrice}>New Special Price</Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Total Rules</p>
          <p className="text-2xl font-bold text-slate-900">156</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Active</p>
          <p className="text-2xl font-bold text-green-600">142</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Customers</p>
          <p className="text-2xl font-bold text-blue-600">45</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Expiring Soon</p>
          <p className="text-2xl font-bold text-amber-600">8</p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search by customer or item..." className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm" />
        </div>
        <Select className="w-40" options={[
          { value: 'all', label: 'All Status' },
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
          { value: 'expired', label: 'Expired' },
        ]} />
      </div>

      {/* Special Prices Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Item</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Special Price</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Min Qty</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Priority</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Validity</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {specialPrices.map(sp => (
                <tr key={sp.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900">{sp.bpName}</p>
                    <p className="text-xs text-slate-500">{sp.bpCode}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900">{sp.itemName}</p>
                    <p className="text-xs text-slate-500">{sp.itemCode} • {sp.uom}</p>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <p className="font-semibold text-amber-600">{formatCurrency(sp.price)}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {sp.minQty ? <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">{sp.minQty}+</span> : <span className="text-slate-400">-</span>}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded">{sp.priority}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-slate-600">
                    {sp.validFrom} {sp.validTo ? `to ${sp.validTo}` : '→'}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={sp.isActive ? 'Active' : 'Inactive'} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1.5 hover:bg-slate-100 rounded"><Edit size={14} className="text-slate-400" /></button>
                      <button className="p-1.5 hover:bg-slate-100 rounded"><Copy size={14} className="text-slate-400" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// ============================================================
// DISCOUNT RULES PAGE
// ============================================================
const DiscountRulesPage = ({ onCreateRule }) => {
  const discountRules = [
    { id: '1', code: 'DISC-VOL10', name: 'Volume Discount 10%', scope: 'Line', discountPercent: 10, minQty: 100, minDocTotal: null, bpGroup: null, itemGroup: 'Electronics', canStack: true, validFrom: '2025-01-01', validTo: null, isActive: true },
    { id: '2', code: 'DISC-VOL15', name: 'Volume Discount 15%', scope: 'Line', discountPercent: 15, minQty: 500, minDocTotal: null, bpGroup: null, itemGroup: 'Electronics', canStack: true, validFrom: '2025-01-01', validTo: null, isActive: true },
    { id: '3', code: 'DISC-VIP5', name: 'VIP Customer Discount', scope: 'Header', discountPercent: 5, minQty: null, minDocTotal: 50000, bpGroup: 'VIP', itemGroup: null, canStack: false, validFrom: '2025-01-01', validTo: null, isActive: true },
    { id: '4', code: 'DISC-LOYAL', name: 'Loyalty Discount', scope: 'Header', discountPercent: 3, minQty: null, minDocTotal: null, bpGroup: 'Loyal', itemGroup: null, canStack: true, validFrom: '2025-01-01', validTo: null, isActive: true },
    { id: '5', code: 'DISC-SUMMER', name: 'Summer Sale', scope: 'Promotion', discountPercent: 20, minQty: null, minDocTotal: null, bpGroup: null, itemGroup: 'Seasonal', canStack: false, validFrom: '2025-06-01', validTo: '2025-08-31', isActive: true },
  ];

  const getScopeIcon = (scope) => {
    switch (scope) {
      case 'Line': return <Package size={16} className="text-blue-500" />;
      case 'Header': return <FileText size={16} className="text-purple-500" />;
      case 'Promotion': return <Gift size={16} className="text-pink-500" />;
      default: return <BadgePercent size={16} className="text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Discount Rules</h2>
          <p className="text-sm text-slate-500">Automatic discounts based on conditions</p>
        </div>
        <Button icon={Plus} onClick={onCreateRule}>New Discount Rule</Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50"><Package size={20} className="text-blue-600" /></div>
            <div><p className="text-2xl font-bold text-slate-900">12</p><p className="text-xs text-slate-500">Line Discounts</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-50"><FileText size={20} className="text-purple-600" /></div>
            <div><p className="text-2xl font-bold text-slate-900">8</p><p className="text-xs text-slate-500">Header Discounts</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-pink-50"><Gift size={20} className="text-pink-600" /></div>
            <div><p className="text-2xl font-bold text-slate-900">5</p><p className="text-xs text-slate-500">Promotions</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-50"><CheckCircle size={20} className="text-green-600" /></div>
            <div><p className="text-2xl font-bold text-slate-900">23</p><p className="text-xs text-slate-500">Active Rules</p></div>
          </div>
        </Card>
      </div>

      {/* Rules List */}
      <div className="space-y-3">
        {discountRules.map(rule => (
          <Card key={rule.id} className="hover:shadow-md transition-shadow">
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    rule.scope === 'Line' ? 'bg-blue-50' :
                    rule.scope === 'Header' ? 'bg-purple-50' : 'bg-pink-50'
                  }`}>
                    {getScopeIcon(rule.scope)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">{rule.name}</h3>
                      <span className="font-mono text-xs text-slate-500">{rule.code}</span>
                      <StatusBadge status={rule.scope} />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      {rule.minQty && <span className="flex items-center gap-1"><Package size={14} />Min Qty: {rule.minQty}</span>}
                      {rule.minDocTotal && <span className="flex items-center gap-1"><DollarSign size={14} />Min Total: {formatCurrency(rule.minDocTotal)}</span>}
                      {rule.bpGroup && <span className="flex items-center gap-1"><Users size={14} />BP Group: {rule.bpGroup}</span>}
                      {rule.itemGroup && <span className="flex items-center gap-1"><Tag size={14} />Item Group: {rule.itemGroup}</span>}
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                      <span>{rule.validFrom} {rule.validTo ? `to ${rule.validTo}` : '→ No Expiry'}</span>
                      {rule.canStack && <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded">Stackable</span>}
                      {!rule.canStack && <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded">Non-stackable</span>}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">{rule.discountPercent}%</p>
                  <StatusBadge status={rule.isActive ? 'Active' : 'Inactive'} />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// PROMOTIONS PAGE
// ============================================================
const PromotionsPage = ({ onCreatePromotion }) => {
  const promotions = [
    { id: '1', code: 'PROMO-SUMMER25', name: 'Summer Sale 2025', description: 'Get 20% off on all seasonal items', channelScope: 'All', benefitType: 'Percentage', benefitValue: 20, conditionSummary: 'Items in "Seasonal" group', validFrom: '2025-06-01', validTo: '2025-08-31', isActive: true, usageCount: 1250 },
    { id: '2', code: 'PROMO-BOGO', name: 'Buy One Get One Free', description: 'Buy any Widget, get Economy Widget free', channelScope: 'POS', benefitType: 'FreeItem', benefitValue: 'ITEM-003', conditionSummary: 'Buy ITEM-001 or ITEM-002', validFrom: '2025-07-01', validTo: '2025-07-31', isActive: true, usageCount: 89 },
    { id: '3', code: 'PROMO-WEB10', name: 'Online Exclusive', description: '10% off for online orders', channelScope: 'Ecommerce', benefitType: 'Percentage', benefitValue: 10, conditionSummary: 'All items, online channel only', validFrom: '2025-01-01', validTo: null, isActive: true, usageCount: 3420 },
    { id: '4', code: 'PROMO-BUNDLE', name: 'Service Bundle', description: 'Get free installation with Premium Widget', channelScope: 'SalesCore', benefitType: 'FreeService', benefitValue: 'SERV-001', conditionSummary: 'Buy ITEM-002 (min 10)', validFrom: '2025-04-01', validTo: '2025-12-31', isActive: true, usageCount: 156 },
    { id: '5', code: 'PROMO-FLASH', name: 'Flash Sale', description: '30% off for 24 hours', channelScope: 'All', benefitType: 'Percentage', benefitValue: 30, conditionSummary: 'All items', validFrom: '2025-07-15', validTo: '2025-07-16', isActive: false, usageCount: 892 },
  ];

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'POS': return <CreditCard size={16} className="text-green-500" />;
      case 'Ecommerce': return <Globe size={16} className="text-purple-500" />;
      case 'SalesCore': return <ShoppingCart size={16} className="text-blue-500" />;
      default: return <Sparkles size={16} className="text-pink-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Promotions & Campaigns</h2>
          <p className="text-sm text-slate-500">Time-limited offers and special deals</p>
        </div>
        <Button icon={Plus} onClick={onCreatePromotion}>New Promotion</Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Active Promotions</p>
          <p className="text-2xl font-bold text-green-600">4</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Total Usages MTD</p>
          <p className="text-2xl font-bold text-blue-600">5,807</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Discount Given MTD</p>
          <p className="text-2xl font-bold text-amber-600">{formatCurrency(325000)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Ending Soon</p>
          <p className="text-2xl font-bold text-red-600">2</p>
        </Card>
      </div>

      {/* Promotions Grid */}
      <div className="grid grid-cols-2 gap-4">
        {promotions.map(promo => (
          <Card key={promo.id} className={`hover:shadow-md transition-shadow ${!promo.isActive ? 'opacity-60' : ''}`}>
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${promo.isActive ? 'bg-pink-100' : 'bg-slate-100'}`}>
                    <Gift size={20} className={promo.isActive ? 'text-pink-600' : 'text-slate-400'} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">{promo.name}</h3>
                      <StatusBadge status={promo.isActive ? 'Active' : 'Inactive'} />
                    </div>
                    <p className="text-xs text-slate-500">{promo.code}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {getChannelIcon(promo.channelScope)}
                  <StatusBadge status={promo.channelScope} />
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-3">{promo.description}</p>

              <div className="p-3 bg-slate-50 rounded-lg mb-3">
                <p className="text-xs text-slate-500 mb-1">Condition</p>
                <p className="text-sm font-medium text-slate-700">{promo.conditionSummary}</p>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-slate-500">Benefit</p>
                  <p className="text-lg font-bold text-green-600">
                    {promo.benefitType === 'Percentage' && `${promo.benefitValue}% OFF`}
                    {promo.benefitType === 'FreeItem' && `Free ${promo.benefitValue}`}
                    {promo.benefitType === 'FreeService' && `Free ${promo.benefitValue}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Usages</p>
                  <p className="text-lg font-bold text-slate-900">{promo.usageCount.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                <span>{promo.validFrom} → {promo.validTo || 'No Expiry'}</span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" icon={Eye}>View</Button>
                  <Button variant="ghost" size="sm" icon={Edit}>Edit</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// PRICING CALCULATOR
// ============================================================
const PricingCalculator = () => {
  const [result, setResult] = useState(null);

  const calculatePrice = () => {
    setResult({
      lines: [
        { itemCode: 'ITEM-001', basePrice: 200, priceSource: 'PriceList', discountPercent: 10, finalUnitPrice: 180, lineTotal: 1800, promotionApplied: null },
        { itemCode: 'SERV-001', basePrice: 500, priceSource: 'CustomerSpecific', discountPercent: 0, finalUnitPrice: 400, lineTotal: 16000, promotionApplied: null },
      ],
      totalBeforeDiscount: 17800,
      headerDiscountPercent: 5,
      totalAfterHeaderDiscount: 16910,
      taxAmount: 2367,
      grandTotal: 19277
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Pricing Calculator</h2>
          <p className="text-sm text-slate-500">Test pricing rules and see calculated prices</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Input */}
        <Card className="p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Calculate Price</h3>
          <div className="space-y-4">
            <FormField label="Customer">
              <Select options={[
                { value: 'C10001', label: 'C10001 - Cairo Industries Ltd' },
                { value: 'C10002', label: 'C10002 - Alexandria Trading Co' },
              ]} />
            </FormField>
            <FormField label="Price List">
              <Select options={[
                { value: 'PL-RETAIL', label: 'Retail Price List' },
                { value: 'PL-WHOLESALE', label: 'Wholesale Price List' },
              ]} />
            </FormField>
            <FormField label="Document Date">
              <Input type="date" defaultValue="2025-07-16" />
            </FormField>

            <div className="pt-4 border-t">
              <p className="text-sm font-medium text-slate-700 mb-2">Items</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input placeholder="Item Code" className="flex-1" defaultValue="ITEM-001" />
                  <Input type="number" placeholder="Qty" className="w-20" defaultValue="10" />
                </div>
                <div className="flex items-center gap-2">
                  <Input placeholder="Item Code" className="flex-1" defaultValue="SERV-001" />
                  <Input type="number" placeholder="Qty" className="w-20" defaultValue="40" />
                </div>
                <Button variant="ghost" size="sm" icon={Plus}>Add Item</Button>
              </div>
            </div>

            <Button icon={Calculator} onClick={calculatePrice} className="w-full">Calculate</Button>
          </div>
        </Card>

        {/* Result */}
        <Card className="p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Calculation Result</h3>
          {result ? (
            <div className="space-y-4">
              {result.lines.map((line, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-slate-900">{line.itemCode}</span>
                    <StatusBadge status={line.priceSource} />
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <div><p className="text-xs text-slate-500">Base</p><p className="font-medium">{formatCurrency(line.basePrice)}</p></div>
                    <div><p className="text-xs text-slate-500">Discount</p><p className="font-medium text-red-600">-{line.discountPercent}%</p></div>
                    <div><p className="text-xs text-slate-500">Unit</p><p className="font-medium">{formatCurrency(line.finalUnitPrice)}</p></div>
                    <div><p className="text-xs text-slate-500">Total</p><p className="font-medium text-blue-600">{formatCurrency(line.lineTotal)}</p></div>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t space-y-2">
                <div className="flex justify-between text-sm"><span className="text-slate-500">Total Before Discount</span><span>{formatCurrency(result.totalBeforeDiscount)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-500">Header Discount ({result.headerDiscountPercent}%)</span><span className="text-red-600">-{formatCurrency(result.totalBeforeDiscount - result.totalAfterHeaderDiscount)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-500">Tax (14%)</span><span>{formatCurrency(result.taxAmount)}</span></div>
                <div className="flex justify-between text-lg font-bold border-t pt-2"><span>Grand Total</span><span className="text-blue-600">{formatCurrency(result.grandTotal)}</span></div>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-400 py-12">
              <Calculator size={48} className="mx-auto mb-3 opacity-50" />
              <p>Enter items and click Calculate</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function SalesCorePart2() {
  const [activeTab, setActiveTab] = useState('priceLists');
  const [showPriceListItems, setShowPriceListItems] = useState(false);
  const [selectedPriceList, setSelectedPriceList] = useState(null);

  const tabs = [
    { id: 'priceLists', label: 'Price Lists', badge: '5' },
    { id: 'specialPrices', label: 'Special Prices', badge: '156' },
    { id: 'discounts', label: 'Discount Rules', badge: '25' },
    { id: 'promotions', label: 'Promotions', badge: '4', badgeColor: 'bg-pink-100 text-pink-700' },
    { id: 'calculator', label: 'Calculator' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-100">
              <BadgePercent size={24} className="text-amber-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Sales Core - Pricing & Discounts</h1>
              <p className="text-sm text-slate-500">Pricing Engine, Discounts, Channels & Cross-Sells</p>
            </div>
          </div>
        </div>
        <div className="px-6">
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'priceLists' && (
          <PriceListsPage
            onViewPriceList={(pl) => { setSelectedPriceList(pl); setShowPriceListItems(true); }}
            onCreatePriceList={() => {}}
          />
        )}
        {activeTab === 'specialPrices' && <SpecialPricesPage onCreateSpecialPrice={() => {}} />}
        {activeTab === 'discounts' && <DiscountRulesPage onCreateRule={() => {}} />}
        {activeTab === 'promotions' && <PromotionsPage onCreatePromotion={() => {}} />}
        {activeTab === 'calculator' && <PricingCalculator />}
      </div>

      {/* Modals */}
      <Modal isOpen={showPriceListItems} onClose={() => setShowPriceListItems(false)} title="Price List Items" size="lg">
        <PriceListItemsView priceList={selectedPriceList} onClose={() => setShowPriceListItems(false)} />
      </Modal>
    </div>
  );
}
