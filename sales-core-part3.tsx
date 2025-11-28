import React, { useState } from 'react';
import {
  ChevronRight, ChevronDown, Plus, Search, Filter, Download, Upload, RefreshCw,
  MoreHorizontal, Edit, Trash2, Eye, Copy, Check, X, AlertCircle, CheckCircle,
  Wallet, Calendar, DollarSign, Settings, Layers, Target, Shield, Clock,
  ChevronLeft, Save, FileText, Link2, Database, ArrowRight, Percent, Building,
  Hash, Activity, Box, MapPin, Truck, Users, ShoppingCart, Package,
  CreditCard, Receipt, FileCheck, Send, XCircle, AlertTriangle, ArrowUpDown,
  Store, Globe, Briefcase, Wrench, RotateCcw, ClipboardList, Ban, CheckCircle2,
  Printer, Mail, ExternalLink, GitBranch, History, Banknote, TrendingUp, User
} from 'lucide-react';

// ============================================================
// SHARED COMPONENTS
// ============================================================

const StatusBadge = ({ status }) => {
  const config = {
    Draft: { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
    UnderReview: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    Approved: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    Open: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    PartiallyDelivered: { bg: 'bg-cyan-50', text: 'text-cyan-700', dot: 'bg-cyan-500' },
    Delivered: { bg: 'bg-teal-50', text: 'text-teal-700', dot: 'bg-teal-500' },
    PartiallyInvoiced: { bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-500' },
    Invoiced: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
    Closed: { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
    Cancelled: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
    Quotation: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    Order: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    Delivery: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    Invoice: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
    WithinLimit: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    OverLimitWarning: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    Ok: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    LowMarginWarning: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  };
  const c = config[status] || config.Draft;
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

const Button = ({ children, variant = 'primary', size = 'md', icon: Icon, onClick, disabled }) => {
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
      className={`inline-flex items-center gap-2 font-medium rounded-lg transition-colors ${variants[variant]} ${sizes[size]} disabled:cursor-not-allowed`}>
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

const formatCurrency = (amount, currency = 'EGP') => new Intl.NumberFormat('en-EG', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);

// ============================================================
// DOCUMENT DETAIL VIEW
// ============================================================
const DocumentDetailView = ({ document, onClose, onConvert }) => {
  const doc = document || {
    id: '1',
    docCode: 'SO-2025-001234',
    docType: 'Order',
    bpCode: 'C10002',
    bpName: 'Alexandria Trading Co',
    contactPerson: 'Mohamed Fathy',
    docDate: '2025-07-14',
    deliveryDate: '2025-07-20',
    postingDate: '2025-07-14',
    currency: 'EGP',
    paymentTerms: 'NET30',
    warehouse: 'WH-CAIRO',
    priceList: 'Retail Price List',
    salesperson: 'Sara Mohamed',
    sourceChannel: 'Ecommerce',
    status: 'PartiallyDelivered',
    creditCheck: 'WithinLimit',
    marginCheck: 'Ok',
    sapDocEntry: 1234,
    sapDocNum: 'SO-1234',
    totalBeforeDiscount: 92000,
    discountPercent: 5,
    discountAmount: 4600,
    totalBeforeTax: 87400,
    taxAmount: 12236,
    totalAfterTax: 99636,
    remarks: 'Priority order - expedite delivery',
    lines: [
      { lineNum: 1, itemCode: 'ITEM-001', description: 'Standard Widget A', uom: 'PC', quantity: 100, deliveredQty: 50, invoicedQty: 0, unitPrice: 200, discount: 10, lineTotal: 18000, taxCode: 'VAT14', priceSource: 'PriceList' },
      { lineNum: 2, itemCode: 'ITEM-002', description: 'Premium Widget B', uom: 'PC', quantity: 50, deliveredQty: 50, invoicedQty: 50, unitPrice: 350, discount: 0, lineTotal: 17500, taxCode: 'VAT14', priceSource: 'CustomerSpecific' },
      { lineNum: 3, itemCode: 'SERV-001', description: 'Installation Service', uom: 'HOUR', quantity: 40, deliveredQty: 40, invoicedQty: 40, unitPrice: 400, discount: 20, lineTotal: 12800, taxCode: 'VAT14', priceSource: 'CustomerSpecific' },
    ]
  };

  const getDocIcon = (type) => {
    switch (type) {
      case 'Quotation': return <FileText size={20} className="text-blue-600" />;
      case 'Order': return <ShoppingCart size={20} className="text-green-600" />;
      case 'Delivery': return <Truck size={20} className="text-amber-600" />;
      case 'Invoice': return <Receipt size={20} className="text-purple-600" />;
      default: return <FileText size={20} className="text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg ${
            doc.docType === 'Quotation' ? 'bg-blue-100' :
            doc.docType === 'Order' ? 'bg-green-100' :
            doc.docType === 'Delivery' ? 'bg-amber-100' : 'bg-purple-100'
          }`}>
            {getDocIcon(doc.docType)}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-900">{doc.docCode}</h2>
              <StatusBadge status={doc.docType} />
              <StatusBadge status={doc.status} />
            </div>
            <p className="text-slate-500">{doc.bpName} ({doc.bpCode})</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" icon={Printer}>Print</Button>
          <Button variant="ghost" size="sm" icon={Mail}>Email</Button>
          {doc.sapDocEntry && (
            <Button variant="ghost" size="sm" icon={ExternalLink}>View in SAP</Button>
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Document Date</p>
          <p className="font-semibold">{doc.docDate}</p>
          {doc.deliveryDate && <p className="text-xs text-slate-500 mt-1">Delivery: {doc.deliveryDate}</p>}
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Salesperson</p>
          <p className="font-semibold">{doc.salesperson}</p>
          <p className="text-xs text-slate-500 mt-1">via {doc.sourceChannel}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Credit Check</p>
          <StatusBadge status={doc.creditCheck} />
          {doc.marginCheck && <div className="mt-1"><StatusBadge status={doc.marginCheck} /></div>}
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">SAP Reference</p>
          {doc.sapDocEntry ? (
            <p className="font-mono font-semibold text-blue-600">{doc.sapDocNum}</p>
          ) : (
            <p className="text-slate-400">Not Posted</p>
          )}
        </Card>
      </div>

      {/* Customer & Shipping */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <Users size={16} /> Customer Information
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">Customer</span><span>{doc.bpName}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Contact</span><span>{doc.contactPerson}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Payment Terms</span><span>{doc.paymentTerms}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Price List</span><span>{doc.priceList}</span></div>
          </div>
        </Card>
        <Card className="p-4">
          <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <Truck size={16} /> Shipping Information
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">Warehouse</span><span>{doc.warehouse}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Delivery Date</span><span>{doc.deliveryDate || '-'}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Ship To</span><span>Alexandria Branch</span></div>
          </div>
        </Card>
      </div>

      {/* Lines */}
      <Card>
        <div className="p-4 border-b border-slate-200">
          <h4 className="font-semibold text-slate-900">Document Lines</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">#</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Item</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">UoM</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Qty</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Delivered</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Invoiced</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Unit Price</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Disc %</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Line Total</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {doc.lines.map(line => (
                <tr key={line.lineNum} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm">{line.lineNum}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900">{line.itemCode}</p>
                    <p className="text-xs text-slate-500">{line.description}</p>
                  </td>
                  <td className="px-4 py-3 text-center text-sm">{line.uom}</td>
                  <td className="px-4 py-3 text-right font-medium">{line.quantity}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={line.deliveredQty >= line.quantity ? 'text-green-600' : line.deliveredQty > 0 ? 'text-amber-600' : 'text-slate-400'}>
                      {line.deliveredQty}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={line.invoicedQty >= line.quantity ? 'text-purple-600' : line.invoicedQty > 0 ? 'text-indigo-600' : 'text-slate-400'}>
                      {line.invoicedQty}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">{formatCurrency(line.unitPrice)}</td>
                  <td className="px-4 py-3 text-right text-red-600">{line.discount > 0 ? `-${line.discount}%` : '-'}</td>
                  <td className="px-4 py-3 text-right font-semibold">{formatCurrency(line.lineTotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Totals & Remarks */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <h4 className="font-semibold text-slate-900 mb-3">Remarks</h4>
          <p className="text-sm text-slate-600">{doc.remarks || 'No remarks'}</p>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm"><span className="text-slate-500">Total Before Discount</span><span>{formatCurrency(doc.totalBeforeDiscount)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-500">Discount ({doc.discountPercent}%)</span><span className="text-red-600">-{formatCurrency(doc.discountAmount)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-500">Total Before Tax</span><span>{formatCurrency(doc.totalBeforeTax)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-500">Tax (14%)</span><span>{formatCurrency(doc.taxAmount)}</span></div>
            <div className="flex justify-between text-lg font-bold border-t pt-2"><span>Grand Total</span><span className="text-blue-600">{formatCurrency(doc.totalAfterTax)}</span></div>
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-2">
          {doc.docType === 'Quotation' && doc.status === 'Approved' && (
            <Button variant="success" icon={ShoppingCart} onClick={() => onConvert('Order')}>Convert to Order</Button>
          )}
          {doc.docType === 'Order' && ['Open', 'PartiallyDelivered'].includes(doc.status) && (
            <Button variant="warning" icon={Truck} onClick={() => onConvert('Delivery')}>Create Delivery</Button>
          )}
          {doc.docType === 'Order' && ['Delivered', 'PartiallyInvoiced'].includes(doc.status) && (
            <Button variant="primary" icon={Receipt} onClick={() => onConvert('Invoice')}>Create Invoice</Button>
          )}
          {doc.docType === 'Delivery' && doc.status === 'Delivered' && (
            <Button variant="primary" icon={Receipt} onClick={() => onConvert('Invoice')}>Create Invoice</Button>
          )}
          {!doc.sapDocEntry && (
            <Button variant="secondary" icon={Send}>Post to SAP</Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" icon={History}>History</Button>
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// DOCUMENT FLOW VIEW
// ============================================================
const DocumentFlowView = ({ document }) => {
  const flowData = {
    quotation: { docCode: 'QT-2025-001542', date: '2025-07-10', status: 'Closed', total: 125000 },
    order: { docCode: 'SO-2025-001234', date: '2025-07-14', status: 'PartiallyInvoiced', total: 99636 },
    deliveries: [
      { docCode: 'DL-2025-000890', date: '2025-07-16', status: 'Invoiced', total: 45000 },
      { docCode: 'DL-2025-000892', date: '2025-07-18', status: 'Delivered', total: 54636 },
    ],
    invoices: [
      { docCode: 'INV-2025-001560', date: '2025-07-17', status: 'Open', total: 45000 },
    ]
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-slate-900 mb-6 flex items-center gap-2">
        <GitBranch size={18} /> Document Flow
      </h3>

      <div className="flex items-start justify-between">
        {/* Quotation */}
        <div className="flex-1 text-center">
          <div className="inline-flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <FileText size={24} className="text-blue-600" />
            </div>
            <p className="font-semibold text-slate-900">{flowData.quotation.docCode}</p>
            <p className="text-xs text-slate-500">{flowData.quotation.date}</p>
            <StatusBadge status={flowData.quotation.status} />
          </div>
        </div>

        <ArrowRight size={24} className="text-slate-300 mt-6" />

        {/* Order */}
        <div className="flex-1 text-center">
          <div className="inline-flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <ShoppingCart size={24} className="text-green-600" />
            </div>
            <p className="font-semibold text-slate-900">{flowData.order.docCode}</p>
            <p className="text-xs text-slate-500">{flowData.order.date}</p>
            <StatusBadge status={flowData.order.status} />
          </div>
        </div>

        <ArrowRight size={24} className="text-slate-300 mt-6" />

        {/* Deliveries */}
        <div className="flex-1 text-center">
          <div className="space-y-3">
            {flowData.deliveries.map((del, idx) => (
              <div key={idx} className="inline-flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-1">
                  <Truck size={18} className="text-amber-600" />
                </div>
                <p className="font-medium text-sm text-slate-900">{del.docCode}</p>
                <p className="text-xs text-slate-500">{del.date}</p>
                <StatusBadge status={del.status} />
              </div>
            ))}
          </div>
        </div>

        <ArrowRight size={24} className="text-slate-300 mt-6" />

        {/* Invoices */}
        <div className="flex-1 text-center">
          <div className="space-y-3">
            {flowData.invoices.map((inv, idx) => (
              <div key={idx} className="inline-flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-1">
                  <Receipt size={18} className="text-purple-600" />
                </div>
                <p className="font-medium text-sm text-slate-900">{inv.docCode}</p>
                <p className="text-xs text-slate-500">{inv.date}</p>
                <StatusBadge status={inv.status} />
              </div>
            ))}
            {flowData.deliveries.length > flowData.invoices.length && (
              <div className="inline-flex flex-col items-center opacity-50">
                <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center mb-1">
                  <Plus size={18} className="text-slate-400" />
                </div>
                <p className="text-xs text-slate-400">Pending</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

// ============================================================
// CONVERSION WIZARD
// ============================================================
const ConversionWizard = ({ sourceDoc, targetType, onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [selectedLines, setSelectedLines] = useState([]);

  const lines = [
    { lineNum: 1, itemCode: 'ITEM-001', description: 'Standard Widget A', quantity: 100, openQty: 50, unitPrice: 180 },
    { lineNum: 2, itemCode: 'ITEM-002', description: 'Premium Widget B', quantity: 50, openQty: 0, unitPrice: 350 },
    { lineNum: 3, itemCode: 'SERV-001', description: 'Installation Service', quantity: 40, openQty: 0, unitPrice: 320 },
  ].filter(l => l.openQty > 0);

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-center gap-4">
        {['Select Lines', 'Review', 'Confirm'].map((s, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step > idx + 1 ? 'bg-green-500 text-white' :
              step === idx + 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
            }`}>
              {step > idx + 1 ? <Check size={16} /> : idx + 1}
            </div>
            <span className={step >= idx + 1 ? 'text-slate-900 font-medium' : 'text-slate-400'}>{s}</span>
            {idx < 2 && <ChevronRight size={16} className="text-slate-300 ml-2" />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 1 && (
        <Card>
          <div className="p-4 border-b bg-slate-50">
            <h3 className="font-semibold">Select Lines to {targetType === 'Delivery' ? 'Deliver' : 'Invoice'}</h3>
            <p className="text-sm text-slate-500">Choose which open lines to include</p>
          </div>
          <div className="divide-y">
            {lines.map(line => (
              <div key={line.lineNum} className="p-4 flex items-center gap-4 hover:bg-slate-50">
                <input type="checkbox" checked={selectedLines.includes(line.lineNum)}
                  onChange={(e) => setSelectedLines(e.target.checked ? [...selectedLines, line.lineNum] : selectedLines.filter(l => l !== line.lineNum))}
                  className="w-4 h-4 rounded border-slate-300" />
                <div className="flex-1">
                  <p className="font-medium">{line.itemCode} - {line.description}</p>
                  <p className="text-sm text-slate-500">Open: {line.openQty} of {line.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(line.openQty * line.unitPrice)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Review {targetType}</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500">Source Document</p>
                <p className="font-semibold">{sourceDoc?.docCode || 'SO-2025-001234'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Target Document</p>
                <p className="font-semibold">{targetType}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Lines Selected</p>
                <p className="font-semibold">{selectedLines.length || 1}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Amount</p>
                <p className="font-semibold text-blue-600">{formatCurrency(45000)}</p>
              </div>
            </div>
            {targetType === 'Delivery' && (
              <div className="p-4 bg-amber-50 rounded-lg">
                <p className="text-sm font-medium text-amber-800">Inventory will be updated</p>
                <p className="text-xs text-amber-600">Stock will be reduced from WH-CAIRO warehouse</p>
              </div>
            )}
            {targetType === 'Invoice' && (
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-800">AR Invoice will be created</p>
                <p className="text-xs text-purple-600">Document will be posted to SAP B1 and Finance Core</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card className="p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">{targetType} Created Successfully</h3>
          <p className="text-slate-500 mb-4">Document Number: {targetType === 'Delivery' ? 'DL-2025-000893' : 'INV-2025-001568'}</p>
          <p className="text-sm text-slate-500">Posted to SAP B1</p>
        </Card>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button variant="secondary" onClick={step === 1 ? onCancel : () => setStep(step - 1)}>
          {step === 1 ? 'Cancel' : 'Back'}
        </Button>
        <Button onClick={step === 3 ? onComplete : () => setStep(step + 1)} disabled={step === 1 && selectedLines.length === 0}>
          {step === 3 ? 'Done' : step === 2 ? 'Create ' + targetType : 'Next'}
        </Button>
      </div>
    </div>
  );
};

// ============================================================
// SALES ANALYTICS
// ============================================================
const SalesAnalytics = () => {
  const topCustomers = [
    { bpCode: 'C10001', name: 'Cairo Industries Ltd', orders: 45, revenue: 2850000 },
    { bpCode: 'C10002', name: 'Alexandria Trading Co', orders: 38, revenue: 2150000 },
    { bpCode: 'C10003', name: 'Delta Electronics', orders: 32, revenue: 1890000 },
    { bpCode: 'C10004', name: 'Giza Supplies', orders: 28, revenue: 1450000 },
    { bpCode: 'C10005', name: 'Luxor Hotels', orders: 22, revenue: 1120000 },
  ];

  const topItems = [
    { itemCode: 'ITEM-001', name: 'Standard Widget A', qty: 4500, revenue: 810000 },
    { itemCode: 'ITEM-002', name: 'Premium Widget B', qty: 2200, revenue: 770000 },
    { itemCode: 'SERV-001', name: 'Installation Service', qty: 850, revenue: 340000 },
    { itemCode: 'ITEM-003', name: 'Economy Widget C', qty: 3800, revenue: 380000 },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-5 gap-4">
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Total Revenue MTD</p>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(4250000)}</p>
          <p className="text-xs text-green-600 mt-1">↑ 12% vs last month</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Orders</p>
          <p className="text-2xl font-bold text-slate-900">89</p>
          <p className="text-xs text-green-600 mt-1">↑ 8%</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Avg Order Value</p>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(47753)}</p>
          <p className="text-xs text-green-600 mt-1">↑ 3%</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Quote Conversion</p>
          <p className="text-2xl font-bold text-green-600">68%</p>
          <p className="text-xs text-green-600 mt-1">↑ 5pp</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Avg Margin</p>
          <p className="text-2xl font-bold text-blue-600">32%</p>
          <p className="text-xs text-slate-500 mt-1">On target</p>
        </Card>
      </div>

      {/* Top Lists */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Top Customers</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="divide-y">
            {topCustomers.map((c, idx) => (
              <div key={c.bpCode} className="px-4 py-3 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-semibold text-slate-600">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{c.name}</p>
                  <p className="text-xs text-slate-500">{c.orders} orders</p>
                </div>
                <p className="font-semibold text-slate-900">{formatCurrency(c.revenue)}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Top Products</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="divide-y">
            {topItems.map((item, idx) => (
              <div key={item.itemCode} className="px-4 py-3 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-semibold text-slate-600">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.qty.toLocaleString()} units</p>
                </div>
                <p className="font-semibold text-slate-900">{formatCurrency(item.revenue)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Sales by Channel */}
      <Card className="p-5">
        <h3 className="font-semibold text-slate-900 mb-4">Sales by Channel</h3>
        <div className="grid grid-cols-5 gap-4">
          {[
            { channel: 'CRM', icon: Users, color: 'blue', amount: 1850000, percent: 44 },
            { channel: 'E-commerce', icon: Globe, color: 'purple', amount: 1250000, percent: 29 },
            { channel: 'POS', icon: Store, color: 'green', amount: 650000, percent: 15 },
            { channel: 'ICP', icon: Briefcase, color: 'indigo', amount: 350000, percent: 8 },
            { channel: 'Other', icon: MoreHorizontal, color: 'slate', amount: 150000, percent: 4 },
          ].map(ch => (
            <div key={ch.channel} className="text-center">
              <div className={`w-12 h-12 mx-auto rounded-lg bg-${ch.color}-100 flex items-center justify-center mb-2`}>
                <ch.icon size={20} className={`text-${ch.color}-600`} />
              </div>
              <p className="font-semibold text-slate-900">{formatCurrency(ch.amount)}</p>
              <p className="text-xs text-slate-500">{ch.channel}</p>
              <div className="h-2 bg-slate-100 rounded-full mt-2">
                <div className={`h-full bg-${ch.color}-500 rounded-full`} style={{ width: `${ch.percent}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function SalesCorePart3() {
  const [activeView, setActiveView] = useState('detail');
  const [showConversionWizard, setShowConversionWizard] = useState(false);
  const [conversionTarget, setConversionTarget] = useState('Delivery');

  const handleConvert = (target) => {
    setConversionTarget(target);
    setShowConversionWizard(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100">
                <Receipt size={24} className="text-purple-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Sales Core</h1>
                <p className="text-sm text-slate-500">Part 3: Document Details, Conversion & Analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant={activeView === 'detail' ? 'primary' : 'secondary'} size="sm" onClick={() => setActiveView('detail')}>Document Detail</Button>
              <Button variant={activeView === 'flow' ? 'primary' : 'secondary'} size="sm" onClick={() => setActiveView('flow')}>Document Flow</Button>
              <Button variant={activeView === 'analytics' ? 'primary' : 'secondary'} size="sm" onClick={() => setActiveView('analytics')}>Analytics</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeView === 'detail' && (
          <DocumentDetailView onClose={() => {}} onConvert={handleConvert} />
        )}
        {activeView === 'flow' && <DocumentFlowView />}
        {activeView === 'analytics' && <SalesAnalytics />}
      </div>

      {/* Conversion Wizard Modal */}
      <Modal isOpen={showConversionWizard} onClose={() => setShowConversionWizard(false)} title={`Create ${conversionTarget}`} size="md">
        <ConversionWizard
          targetType={conversionTarget}
          onComplete={() => setShowConversionWizard(false)}
          onCancel={() => setShowConversionWizard(false)}
        />
      </Modal>
    </div>
  );
}
