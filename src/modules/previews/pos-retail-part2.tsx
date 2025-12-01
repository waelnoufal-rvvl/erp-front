'use client';

// ============================================================
// POS / Retail - Part 2: POS Terminal, Transactions, Payments
// Multi-Tenant ERP System with SAP Business One Integration
// ============================================================

import React, { useState } from 'react';
import {
  ShoppingCart, Barcode, Search, Plus, Minus, Trash2, User,
  CreditCard, Banknote, Smartphone, Gift, X, Check, Printer,
  Mail, QrCode, Receipt, Clock, AlertCircle, Percent, Tag,
  ChevronRight, ChevronDown, Calculator, DollarSign, Package,
  UserPlus, Building2, Phone, Hash, ArrowRight, RotateCcw,
  Pause, Play, XCircle, CheckCircle2, Edit, MoreVertical,
  Keyboard, ScanLine, Volume2, VolumeX, Settings, LogOut,
  Sun, Moon, Maximize2, History, RefreshCw, Wallet, Download
} from 'lucide-react';

// ============================================================
// TYPE DEFINITIONS
// ============================================================

type PosTransactionStatus = 'Open' | 'Completed' | 'Voided' | 'Refund' | 'Parked';
type PaymentMethod = 'Cash' | 'Card' | 'Voucher' | 'MobileWallet';
type PosCustomerType = 'WalkIn' | 'Named';

interface PosTransactionLine {
  id: string;
  lineNum: number;
  itemCode: string;
  itemName: string;
  barcode?: string;
  quantity: number;
  uomCode: string;
  unitPrice: number;
  lineDiscountPercent: number;
  lineDiscountAmount: number;
  lineSubtotal: number;
  taxCode?: string;
  taxAmount: number;
  lineTotal: number;
  warehouseCode: string;
  isPromoLine: boolean;
  promoId?: string;
  promoName?: string;
}

interface PosPayment {
  id: string;
  paymentMethod: PaymentMethod;
  amount: number;
  currency: string;
  cardType?: string;
  cardLast4?: string;
  approvalCode?: string;
  voucherCode?: string;
  createdAt: string;
}

interface PosCustomer {
  id: string;
  type: PosCustomerType;
  bpCode?: string;
  name: string;
  phone?: string;
  email?: string;
  loyaltyId?: string;
  loyaltyPoints?: number;
}

interface PosTransaction {
  id: string;
  posReceiptNo: string;
  businessDate: string;
  transactionDatetime: string;
  status: PosTransactionStatus;
  customer?: PosCustomer;
  lines: PosTransactionLine[];
  payments: PosPayment[];
  subtotalAmount: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  roundingAmount: number;
  changeDue: number;
  createdByUserName: string;
}

// ============================================================
// SAMPLE DATA
// ============================================================

const walkInCustomer: PosCustomer = {
  id: 'cust-walkin',
  type: 'WalkIn',
  bpCode: 'CASH-CUST',
  name: 'Walk-in Customer'
};

const sampleCustomers: PosCustomer[] = [
  { id: 'cust-001', type: 'Named', bpCode: 'C00125', name: 'Ahmed Mohamed', phone: '+20 100 123 4567', email: 'ahmed@email.com', loyaltyId: 'LYL-00125', loyaltyPoints: 2500 },
  { id: 'cust-002', type: 'Named', bpCode: 'C00089', name: 'Sara Hassan', phone: '+20 101 234 5678', email: 'sara@email.com', loyaltyId: 'LYL-00089', loyaltyPoints: 1200 },
  { id: 'cust-003', type: 'Named', bpCode: 'C00156', name: 'Omar Farouk', phone: '+20 102 345 6789', loyaltyId: 'LYL-00156', loyaltyPoints: 800 },
];

const sampleLines: PosTransactionLine[] = [
  { id: 'line-001', lineNum: 1, itemCode: 'ITEM-1001', itemName: 'T-Shirt White L', barcode: '6223000000012', quantity: 2, uomCode: 'Each', unitPrice: 500, lineDiscountPercent: 0, lineDiscountAmount: 0, lineSubtotal: 1000, taxCode: 'VAT14', taxAmount: 140, lineTotal: 1140, warehouseCode: 'WH-CAIRO-1', isPromoLine: false },
  { id: 'line-002', lineNum: 2, itemCode: 'ITEM-2001', itemName: 'Jeans Blue 32', barcode: '6223000000043', quantity: 1, uomCode: 'Each', unitPrice: 1200, lineDiscountPercent: 10, lineDiscountAmount: 120, lineSubtotal: 1080, taxCode: 'VAT14', taxAmount: 151.2, lineTotal: 1231.2, warehouseCode: 'WH-CAIRO-1', isPromoLine: false },
  { id: 'line-003', lineNum: 3, itemCode: 'ITEM-4001', itemName: 'Leather Belt Brown', barcode: '6223000000067', quantity: 1, uomCode: 'Each', unitPrice: 350, lineDiscountPercent: 0, lineDiscountAmount: 0, lineSubtotal: 350, taxCode: 'VAT14', taxAmount: 49, lineTotal: 399, warehouseCode: 'WH-CAIRO-1', isPromoLine: false },
];

const sampleParkedTransactions: PosTransaction[] = [
  {
    id: 'park-001',
    posReceiptNo: 'PARK-001',
    businessDate: '2025-11-25',
    transactionDatetime: '2025-11-25T10:30:00',
    status: 'Parked',
    customer: sampleCustomers[0],
    lines: [sampleLines[0]],
    payments: [],
    subtotalAmount: 1000,
    discountAmount: 0,
    taxAmount: 140,
    totalAmount: 1140,
    currency: 'EGP',
    roundingAmount: 0,
    changeDue: 0,
    createdByUserName: 'Ahmed Hassan'
  },
  {
    id: 'park-002',
    posReceiptNo: 'PARK-002',
    businessDate: '2025-11-25',
    transactionDatetime: '2025-11-25T11:15:00',
    status: 'Parked',
    lines: [sampleLines[2]],
    payments: [],
    subtotalAmount: 350,
    discountAmount: 0,
    taxAmount: 49,
    totalAmount: 399,
    currency: 'EGP',
    roundingAmount: 0,
    changeDue: 0,
    createdByUserName: 'Ahmed Hassan'
  }
];

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

const formatCurrency = (amount: number, currency: string = 'EGP') => {
  return `${currency} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// ============================================================
// POS TERMINAL - MAIN CASHIER SCREEN
// ============================================================

export const POSTerminal: React.FC = () => {
  const [lines, setLines] = useState<PosTransactionLine[]>(sampleLines);
  const [customer, setCustomer] = useState<PosCustomer>(walkInCustomer);
  const [showCustomerSearch, setShowCustomerSearch] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showParked, setShowParked] = useState(false);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [searchMode, setSearchMode] = useState<'barcode' | 'search'>('barcode');

  // Calculate totals
  const subtotal = lines.reduce((sum, l) => sum + l.lineSubtotal, 0);
  const discount = lines.reduce((sum, l) => sum + l.lineDiscountAmount, 0);
  const tax = lines.reduce((sum, l) => sum + l.taxAmount, 0);
  const total = lines.reduce((sum, l) => sum + l.lineTotal, 0);

  const updateQuantity = (lineId: string, delta: number) => {
    setLines(lines.map(l => {
      if (l.id === lineId) {
        const newQty = Math.max(1, l.quantity + delta);
        const lineSubtotal = l.unitPrice * newQty;
        const lineDiscountAmount = lineSubtotal * (l.lineDiscountPercent / 100);
        const afterDiscount = lineSubtotal - lineDiscountAmount;
        const taxAmount = afterDiscount * 0.14;
        return {
          ...l,
          quantity: newQty,
          lineSubtotal,
          lineDiscountAmount,
          taxAmount,
          lineTotal: afterDiscount + taxAmount
        };
      }
      return l;
    }));
  };

  const removeLine = (lineId: string) => {
    setLines(lines.filter(l => l.id !== lineId));
  };

  const handleBarcodeScan = () => {
    if (!barcodeInput.trim()) return;
    const newLine: PosTransactionLine = {
      id: `line-${Date.now()}`,
      lineNum: lines.length + 1,
      itemCode: 'ITEM-NEW',
      itemName: `Scanned Item (${barcodeInput})`,
      barcode: barcodeInput,
      quantity: 1,
      uomCode: 'Each',
      unitPrice: 250,
      lineDiscountPercent: 0,
      lineDiscountAmount: 0,
      lineSubtotal: 250,
      taxCode: 'VAT14',
      taxAmount: 35,
      lineTotal: 285,
      warehouseCode: 'WH-CAIRO-1',
      isPromoLine: false
    };
    setLines([...lines, newLine]);
    setBarcodeInput('');
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-gray-900">Cairo Mall Store</span>
              <span className="text-xs text-gray-500 ml-2">REG-01</span>
            </div>
          </div>
          <div className="h-6 w-px bg-gray-300" />
          <div className="text-sm">
            <span className="text-gray-500">Cashier:</span>
            <span className="font-medium text-gray-900 ml-1">Ahmed Hassan</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
          <span className="font-mono text-sm font-medium text-gray-900">
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
          <div className="h-6 w-px bg-gray-300 mx-2" />
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Settings className="w-5 h-5 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Maximize2 className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Line Items */}
        <div className="flex-1 flex flex-col bg-white m-3 mr-0 rounded-xl border border-gray-200 overflow-hidden">
          {/* Barcode Input */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  {searchMode === 'barcode' ? (
                    <ScanLine className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Search className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <input
                  type="text"
                  placeholder={searchMode === 'barcode' ? "Scan barcode or enter item code..." : "Search items..."}
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleBarcodeScan()}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  autoFocus
                />
              </div>
              <button
                onClick={() => setSearchMode(searchMode === 'barcode' ? 'search' : 'barcode')}
                className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50"
              >
                {searchMode === 'barcode' ? <Search className="w-5 h-5" /> : <ScanLine className="w-5 h-5" />}
              </button>
              <button
                onClick={handleBarcodeScan}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>

          {/* Customer Bar */}
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <button 
              onClick={() => setShowCustomerSearch(true)}
              className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-lg -ml-3"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                customer.type === 'WalkIn' ? 'bg-gray-200' : 'bg-blue-100'
              }`}>
                <User className={`w-5 h-5 ${customer.type === 'WalkIn' ? 'text-gray-500' : 'text-blue-600'}`} />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                {customer.type === 'Named' && customer.loyaltyPoints && (
                  <p className="text-xs text-blue-600">{customer.loyaltyPoints.toLocaleString()} points</p>
                )}
                {customer.type === 'WalkIn' && (
                  <p className="text-xs text-gray-500">Tap to assign customer</p>
                )}
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 ml-2" />
            </button>
            {customer.type === 'Named' && (
              <button 
                onClick={() => setCustomer(walkInCustomer)}
                className="p-2 hover:bg-gray-200 rounded-lg"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>

          {/* Line Items List */}
          <div className="flex-1 overflow-y-auto">
            {lines.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <ShoppingCart className="w-16 h-16 mb-4" />
                <p className="text-lg">Cart is empty</p>
                <p className="text-sm">Scan items to begin</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {lines.map((line) => (
                  <div key={line.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{line.itemName}</p>
                            <p className="text-xs text-gray-500 font-mono">{line.itemCode}</p>
                          </div>
                          <button 
                            onClick={() => removeLine(line.id)}
                            className="p-1 hover:bg-red-50 rounded text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-gray-500">
                              {formatCurrency(line.unitPrice)} × 
                            </span>
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button 
                                onClick={() => updateQuantity(line.id, -1)}
                                className="p-1.5 hover:bg-gray-100 rounded-l-lg"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-3 py-1 text-sm font-medium min-w-[40px] text-center">
                                {line.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(line.id, 1)}
                                className="p-1.5 hover:bg-gray-100 rounded-r-lg"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              {formatCurrency(line.lineTotal)}
                            </p>
                            {line.lineDiscountPercent > 0 && (
                              <p className="text-xs text-green-600">-{line.lineDiscountPercent}% off</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <div className="grid grid-cols-4 gap-2">
              <button 
                onClick={() => setShowParked(true)}
                className="flex flex-col items-center gap-1 p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                <Pause className="w-5 h-5 text-orange-500" />
                <span className="text-xs font-medium text-gray-700">Park Sale</span>
              </button>
              <button className="flex flex-col items-center gap-1 p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
                <Play className="w-5 h-5 text-green-500" />
                <span className="text-xs font-medium text-gray-700">Recall</span>
              </button>
              <button className="flex flex-col items-center gap-1 p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
                <Percent className="w-5 h-5 text-blue-500" />
                <span className="text-xs font-medium text-gray-700">Discount</span>
              </button>
              <button className="flex flex-col items-center gap-1 p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
                <XCircle className="w-5 h-5 text-red-500" />
                <span className="text-xs font-medium text-gray-700">Void</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Totals & Payment */}
        <div className="w-80 flex flex-col bg-white m-3 rounded-xl border border-gray-200 overflow-hidden">
          {/* Receipt Number */}
          <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-200">Receipt #</p>
                <p className="text-lg font-bold font-mono">RC-2025-000456</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-blue-200">Items</p>
                <p className="text-2xl font-bold">{lines.reduce((sum, l) => sum + l.quantity, 0)}</p>
              </div>
            </div>
          </div>

          {/* Totals */}
          <div className="flex-1 p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-600">Discount</span>
                  <span className="font-medium text-green-600">-{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Tax (14%)</span>
                <span className="font-medium">{formatCurrency(tax)}</span>
              </div>
              <div className="h-px bg-gray-200 my-2" />
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-2">Quick Cash</p>
              <div className="grid grid-cols-3 gap-2">
                {[50, 100, 200, 500, 1000, 2000].map((amount) => (
                  <button
                    key={amount}
                    className="py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700"
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Buttons */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <button 
              onClick={() => setShowPayment(true)}
              disabled={lines.length === 0}
              className="w-full py-4 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Banknote className="w-6 h-6" />
              Pay Cash
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button 
                disabled={lines.length === 0}
                className="py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Card
              </button>
              <button 
                disabled={lines.length === 0}
                className="py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Wallet className="w-5 h-5" />
                Split
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Search Modal */}
      {showCustomerSearch && (
        <CustomerSearchModal 
          onSelect={(c) => { setCustomer(c); setShowCustomerSearch(false); }}
          onClose={() => setShowCustomerSearch(false)}
        />
      )}

      {/* Payment Modal */}
      {showPayment && (
        <PaymentModal
          total={total}
          currency="EGP"
          onComplete={() => { setShowPayment(false); setLines([]); }}
          onClose={() => setShowPayment(false)}
        />
      )}

      {/* Parked Transactions Modal */}
      {showParked && (
        <ParkedTransactionsModal
          transactions={sampleParkedTransactions}
          onRecall={(tx) => { setLines(tx.lines); setShowParked(false); }}
          onClose={() => setShowParked(false)}
        />
      )}
    </div>
  );
};

// ============================================================
// CUSTOMER SEARCH MODAL
// ============================================================

const CustomerSearchModal: React.FC<{
  onSelect: (customer: PosCustomer) => void;
  onClose: () => void;
}> = ({ onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = sampleCustomers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone?.includes(searchTerm) ||
    c.bpCode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Select Customer</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, phone, or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto">
          <button
            onClick={() => onSelect(walkInCustomer)}
            className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 border-b border-gray-100"
          >
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-500" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Walk-in Customer</p>
              <p className="text-sm text-gray-500">Anonymous / Cash Customer</p>
            </div>
          </button>

          {filteredCustomers.map((customer) => (
            <button
              key={customer.id}
              onClick={() => onSelect(customer)}
              className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 border-b border-gray-100"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-semibold">
                  {customer.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900">{customer.name}</p>
                  {customer.loyaltyPoints && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {customer.loyaltyPoints.toLocaleString()} pts
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  {customer.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {customer.phone}
                    </span>
                  )}
                  {customer.bpCode && (
                    <span className="font-mono">{customer.bpCode}</span>
                  )}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
            <UserPlus className="w-5 h-5" />
            Create New Customer
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// PAYMENT MODAL
// ============================================================

const PaymentModal: React.FC<{
  total: number;
  currency: string;
  onComplete: () => void;
  onClose: () => void;
}> = ({ total, currency, onComplete, onClose }) => {
  const [cashReceived, setCashReceived] = useState<string>(total.toFixed(2));
  const [showReceipt, setShowReceipt] = useState(false);

  const change = parseFloat(cashReceived || '0') - total;

  const quickAmounts = [
    Math.ceil(total / 10) * 10,
    Math.ceil(total / 50) * 50,
    Math.ceil(total / 100) * 100,
    Math.ceil(total / 500) * 500
  ].filter((v, i, a) => a.indexOf(v) === i && v >= total).slice(0, 4);

  if (showReceipt) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl w-full max-w-sm mx-4 overflow-hidden">
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Payment Complete!</h2>
            <p className="text-gray-600 mb-4">Receipt #RC-2025-000456</p>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-500">Total</span>
                <span className="font-medium">{formatCurrency(total, currency)}</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-500">Cash Received</span>
                <span className="font-medium">{formatCurrency(parseFloat(cashReceived), currency)}</span>
              </div>
              <div className="h-px bg-gray-200 my-2" />
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">Change Due</span>
                <span className="text-xl font-bold text-green-600">{formatCurrency(change, currency)}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <button className="py-3 border border-gray-300 rounded-xl hover:bg-gray-50 flex flex-col items-center gap-1">
                <Printer className="w-5 h-5 text-gray-600" />
                <span className="text-xs text-gray-600">Print</span>
              </button>
              <button className="py-3 border border-gray-300 rounded-xl hover:bg-gray-50 flex flex-col items-center gap-1">
                <Mail className="w-5 h-5 text-gray-600" />
                <span className="text-xs text-gray-600">Email</span>
              </button>
              <button className="py-3 border border-gray-300 rounded-xl hover:bg-gray-50 flex flex-col items-center gap-1">
                <QrCode className="w-5 h-5 text-gray-600" />
                <span className="text-xs text-gray-600">QR Code</span>
              </button>
            </div>

            <button
              onClick={onComplete}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
            >
              New Sale
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Cash Payment</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-1">Total Due</p>
            <p className="text-4xl font-bold text-gray-900">{formatCurrency(total, currency)}</p>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-4">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setCashReceived(amount.toString())}
                className={`py-3 rounded-xl font-medium text-sm ${
                  parseFloat(cashReceived) === amount
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {amount}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cash Received</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">{currency}</span>
              <input
                type="number"
                value={cashReceived}
                onChange={(e) => setCashReceived(e.target.value)}
                className="w-full pl-16 pr-4 py-4 text-2xl font-bold text-right border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {change >= 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-green-700 font-medium">Change Due</span>
                <span className="text-2xl font-bold text-green-700">{formatCurrency(change, currency)}</span>
              </div>
            </div>
          )}
          {change < 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-red-700 font-medium">Amount Short</span>
                <span className="text-2xl font-bold text-red-700">{formatCurrency(Math.abs(change), currency)}</span>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowReceipt(true)}
            disabled={change < 0}
            className="w-full py-4 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Complete Payment
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// PARKED TRANSACTIONS MODAL
// ============================================================

const ParkedTransactionsModal: React.FC<{
  transactions: PosTransaction[];
  onRecall: (tx: PosTransaction) => void;
  onClose: () => void;
}> = ({ transactions, onRecall, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Parked Transactions</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {transactions.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Pause className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No parked transactions</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-medium text-gray-900">{tx.posReceiptNo}</span>
                        <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                          Parked
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {tx.customer?.name || 'Walk-in'} • {tx.lines.length} item(s)
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(tx.transactionDatetime).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(tx.totalAmount, tx.currency)}
                      </p>
                      <button
                        onClick={() => onRecall(tx)}
                        className="mt-2 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700"
                      >
                        Recall
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// TRANSACTIONS HISTORY LIST
// ============================================================

export const TransactionsHistory: React.FC = () => {
  const [dateFilter, setDateFilter] = useState('today');

  const sampleTransactions: PosTransaction[] = [
    {
      id: 'tx-001',
      posReceiptNo: 'RC-2025-000455',
      businessDate: '2025-11-25',
      transactionDatetime: '2025-11-25T14:30:00',
      status: 'Completed',
      customer: sampleCustomers[0],
      lines: sampleLines,
      payments: [{ id: 'pay-1', paymentMethod: 'Cash', amount: 3000, currency: 'EGP', createdAt: '2025-11-25T14:30:00' }],
      subtotalAmount: 2430,
      discountAmount: 120,
      taxAmount: 340.2,
      totalAmount: 2770.2,
      currency: 'EGP',
      roundingAmount: 0,
      changeDue: 229.8,
      createdByUserName: 'Ahmed Hassan'
    },
    {
      id: 'tx-002',
      posReceiptNo: 'RC-2025-000454',
      businessDate: '2025-11-25',
      transactionDatetime: '2025-11-25T13:15:00',
      status: 'Completed',
      lines: [sampleLines[0], sampleLines[2]],
      payments: [{ id: 'pay-2', paymentMethod: 'Card', amount: 1539, currency: 'EGP', cardType: 'Visa', cardLast4: '4532', createdAt: '2025-11-25T13:15:00' }],
      subtotalAmount: 1350,
      discountAmount: 0,
      taxAmount: 189,
      totalAmount: 1539,
      currency: 'EGP',
      roundingAmount: 0,
      changeDue: 0,
      createdByUserName: 'Sara Mohamed'
    },
    {
      id: 'tx-003',
      posReceiptNo: 'RC-2025-000453',
      businessDate: '2025-11-25',
      transactionDatetime: '2025-11-25T11:45:00',
      status: 'Voided',
      lines: [sampleLines[1]],
      payments: [],
      subtotalAmount: 1080,
      discountAmount: 120,
      taxAmount: 151.2,
      totalAmount: 1231.2,
      currency: 'EGP',
      roundingAmount: 0,
      changeDue: 0,
      createdByUserName: 'Ahmed Hassan'
    }
  ];

  const StatusBadge: React.FC<{ status: PosTransactionStatus }> = ({ status }) => {
    const styles = {
      Open: 'bg-blue-100 text-blue-700',
      Completed: 'bg-green-100 text-green-700',
      Voided: 'bg-red-100 text-red-700',
      Refund: 'bg-orange-100 text-orange-700',
      Parked: 'bg-yellow-100 text-yellow-700'
    };
    return (
      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${styles[status]}`}>
        {status}
      </span>
    );
  };

  const PaymentBadge: React.FC<{ method: PaymentMethod }> = ({ method }) => {
    const icons = {
      Cash: Banknote,
      Card: CreditCard,
      Voucher: Gift,
      MobileWallet: Smartphone
    };
    const Icon = icons[method];
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
        <Icon className="w-3 h-3" />
        {method}
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
          <p className="text-sm text-gray-500 mt-1">View and manage POS transactions</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Sales</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">EGP 45,230</p>
          <p className="text-xs text-green-600 mt-0.5">+12% vs yesterday</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Transactions</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">68</p>
          <p className="text-xs text-gray-500 mt-0.5">Avg: EGP 665</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Items Sold</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">156</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Voided</p>
          <p className="text-2xl font-bold text-red-600 mt-1">2</p>
          <p className="text-xs text-gray-500 mt-0.5">EGP 1,450</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Cashier</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sampleTransactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <span className="font-mono text-sm font-medium text-gray-900">{tx.posReceiptNo}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-gray-600">
                    {new Date(tx.transactionDatetime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-gray-900">{tx.customer?.name || 'Walk-in'}</span>
                </td>
                <td className="px-4 py-4">
                  {tx.payments.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {tx.payments.map((p, idx) => (
                        <PaymentBadge key={idx} method={p.paymentMethod} />
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(tx.totalAmount, tx.currency)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <StatusBadge status={tx.status} />
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-gray-600">{tx.createdByUserName}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="View Receipt">
                      <Receipt className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="Print">
                      <Printer className="w-4 h-4 text-gray-500" />
                    </button>
                    {tx.status === 'Completed' && (
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="Refund">
                        <RotateCcw className="w-4 h-4 text-gray-500" />
                      </button>
                    )}
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
// EXPORT
// ============================================================

export default function PosRetailPart2() {
  return <POSTerminal />;
}
