'use client';

import React, { useState } from 'react';
import { 
  ChevronLeft, Plus, Search, Download, Eye, X, AlertCircle, CheckCircle, 
  Clock, Save, Send, FileText, DollarSign, Calendar, Mail, Phone,
  CheckSquare, XSquare, MessageSquare, Paperclip, Trash2, Upload,
  AlertTriangle, CreditCard, Receipt, Banknote, Printer, Building2,
  User, MapPin, Hash, FileCheck, ArrowRight, Link, Copy, RefreshCw
} from 'lucide-react';

// ============================================================
// SHARED COMPONENTS
// ============================================================
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;
  const sizes = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl', xl: 'max-w-6xl' };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className={`bg-white rounded-xl shadow-xl w-full ${sizes[size]} max-h-[90vh] overflow-hidden flex flex-col`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    paid: 'bg-emerald-100 text-emerald-700', partial: 'bg-blue-100 text-blue-700',
    open: 'bg-amber-100 text-amber-700', overdue: 'bg-red-100 text-red-700',
    pending: 'bg-amber-100 text-amber-700', approved: 'bg-emerald-100 text-emerald-700',
    rejected: 'bg-red-100 text-red-700', draft: 'bg-slate-100 text-slate-600',
    sent: 'bg-blue-100 text-blue-700', scheduled: 'bg-purple-100 text-purple-700',
  };
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-slate-100'}`}>{status?.charAt(0).toUpperCase() + status?.slice(1)}</span>;
};

const Tabs = ({ tabs, active, onChange }) => (
  <div className="flex border-b border-slate-200">
    {tabs.map(tab => (
      <button key={tab.id} onClick={() => onChange(tab.id)}
        className={`px-4 py-3 text-sm font-medium border-b-2 ${active === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
        {tab.label}
      </button>
    ))}
  </div>
);

// ============================================================
// INVOICE FORM (View/Create)
// ============================================================
const InvoiceForm = ({ invoice = null, onClose, onSave }) => {
  const isNew = !invoice;
  const [lines, setLines] = useState(invoice?.lines || [
    { id: 1, item: '', description: 'Professional Services', qty: 1, rate: 10000, amount: 10000 },
  ]);
  const [activeTab, setActiveTab] = useState('details');

  const subtotal = lines.reduce((s, l) => s + (l.amount || 0), 0);
  const taxRate = 0;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const addLine = () => setLines([...lines, { id: lines.length + 1, item: '', description: '', qty: 1, rate: 0, amount: 0 }]);
  const removeLine = (id) => setLines(lines.filter(l => l.id !== id));
  const updateLine = (id, field, value) => {
    setLines(lines.map(l => {
      if (l.id === id) {
        const updated = { ...l, [field]: value };
        if (field === 'qty' || field === 'rate') {
          updated.amount = (updated.qty || 0) * (updated.rate || 0);
        }
        return updated;
      }
      return l;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><ChevronLeft size={20} /></button>
            <div>
              <h1 className="text-xl font-bold text-slate-900">{isNew ? 'New Invoice' : `Invoice ${invoice?.id}`}</h1>
              <p className="text-sm text-slate-500">{isNew ? 'Create a new customer invoice' : 'View invoice details'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isNew && (
              <>
                <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
                  <Printer size={16} /> Print
                </button>
                <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
                  <Mail size={16} /> Email
                </button>
              </>
            )}
            {isNew && (
              <>
                <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
                  <Save size={16} /> Save Draft
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Send size={16} /> Submit for Approval
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs tabs={[
          { id: 'details', label: 'Details' },
          { id: 'attachments', label: 'Attachments' },
          { id: 'history', label: 'History' },
        ]} active={activeTab} onChange={setActiveTab} />

        {activeTab === 'details' && (
          <div className="mt-6 space-y-6">
            {/* Customer & Invoice Info */}
            <div className="grid grid-cols-2 gap-6">
              {/* Customer Selection */}
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="font-medium text-slate-900 mb-4">Customer</h3>
                {isNew ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Select Customer *</label>
                      <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                        <option value="">Choose customer...</option>
                        <option value="C-001">ABC Corporation</option>
                        <option value="C-002">XYZ Industries</option>
                        <option value="C-003">Global Tech Ltd</option>
                        <option value="C-004">Prime Solutions</option>
                      </select>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg text-sm text-slate-500">
                      Select a customer to populate billing details
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <Building2 size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">ABC Corporation</p>
                        <p className="text-sm text-slate-500">C-001</p>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-slate-100 space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin size={14} /> 123 Business Ave, Suite 100, New York, NY 10001
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail size={14} /> billing@abccorp.com
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone size={14} /> +1 555-0101
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Invoice Details */}
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="font-medium text-slate-900 mb-4">Invoice Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Invoice Number</label>
                    <input type="text" value={invoice?.id || 'INV-2024-0157'} disabled className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                    <div className="px-3 py-2"><StatusBadge status={invoice?.status || 'draft'} /></div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Invoice Date *</label>
                    <input type="date" defaultValue="2024-11-26" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Due Date *</label>
                    <input type="date" defaultValue="2024-12-26" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Payment Terms</label>
                    <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                      <option>Net 30</option>
                      <option>Net 15</option>
                      <option>Net 60</option>
                      <option>Due on Receipt</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Currency</label>
                    <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                      <option>USD - US Dollar</option>
                      <option>EUR - Euro</option>
                      <option>EGP - Egyptian Pound</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Reference Info */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-medium text-slate-900 mb-4">Reference</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">PO Number</label>
                  <input type="text" placeholder="Customer PO reference" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Project</label>
                  <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                    <option value="">Select project...</option>
                    <option>PRJ-001 - Alpha Project</option>
                    <option>PRJ-002 - Beta Development</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contract</label>
                  <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                    <option value="">Select contract...</option>
                    <option>CNT-001 - Service Agreement</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-medium text-slate-900">Line Items</h3>
                {isNew && (
                  <button onClick={addLine} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                    <Plus size={16} /> Add Line
                  </button>
                )}
              </div>
              <table className="w-full">
                <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium w-12">#</th>
                    <th className="px-4 py-3 text-left font-medium">Item</th>
                    <th className="px-4 py-3 text-left font-medium">Description</th>
                    <th className="px-4 py-3 text-right font-medium w-24">Qty</th>
                    <th className="px-4 py-3 text-right font-medium w-32">Rate</th>
                    <th className="px-4 py-3 text-right font-medium w-32">Amount</th>
                    {isNew && <th className="px-4 py-3 w-12"></th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lines.map((line, idx) => (
                    <tr key={line.id}>
                      <td className="px-4 py-3 text-sm text-slate-500">{idx + 1}</td>
                      <td className="px-4 py-3">
                        {isNew ? (
                          <select value={line.item} onChange={(e) => updateLine(line.id, 'item', e.target.value)} className="w-full px-2 py-1.5 text-sm border border-slate-200 rounded">
                            <option value="">Select item...</option>
                            <option value="SVC-001">Professional Services</option>
                            <option value="SVC-002">Consulting</option>
                            <option value="SVC-003">Support & Maintenance</option>
                          </select>
                        ) : (
                          <span className="text-sm font-medium text-slate-900">{line.item || 'SVC-001'}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {isNew ? (
                          <input type="text" value={line.description} onChange={(e) => updateLine(line.id, 'description', e.target.value)} placeholder="Description" className="w-full px-2 py-1.5 text-sm border border-slate-200 rounded" />
                        ) : (
                          <span className="text-sm text-slate-600">{line.description}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {isNew ? (
                          <input type="number" value={line.qty} onChange={(e) => updateLine(line.id, 'qty', parseFloat(e.target.value) || 0)} className="w-full px-2 py-1.5 text-sm text-right border border-slate-200 rounded" />
                        ) : (
                          <span className="text-sm text-right block">{line.qty}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {isNew ? (
                          <input type="number" value={line.rate} onChange={(e) => updateLine(line.id, 'rate', parseFloat(e.target.value) || 0)} className="w-full px-2 py-1.5 text-sm text-right border border-slate-200 rounded" />
                        ) : (
                          <span className="text-sm text-right block">${line.rate?.toLocaleString()}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-medium">${line.amount?.toLocaleString()}</td>
                      {isNew && (
                        <td className="px-4 py-3">
                          <button onClick={() => removeLine(line.id)} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-red-500">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50">
                  <tr><td colSpan={isNew ? 5 : 4}></td><td className="px-4 py-2 text-sm text-right text-slate-500">Subtotal</td><td className="px-4 py-2 text-sm text-right font-medium">${subtotal.toLocaleString()}</td>{isNew && <td></td>}</tr>
                  <tr><td colSpan={isNew ? 5 : 4}></td><td className="px-4 py-2 text-sm text-right text-slate-500">Tax ({(taxRate * 100).toFixed(0)}%)</td><td className="px-4 py-2 text-sm text-right">${tax.toLocaleString()}</td>{isNew && <td></td>}</tr>
                  <tr><td colSpan={isNew ? 5 : 4}></td><td className="px-4 py-2 text-sm text-right font-bold text-slate-900">Total</td><td className="px-4 py-2 text-lg text-right font-bold text-slate-900">${total.toLocaleString()}</td>{isNew && <td></td>}</tr>
                </tfoot>
              </table>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-medium text-slate-900 mb-4">Notes & Terms</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Internal Notes</label>
                  <textarea rows={3} placeholder="Notes for internal use..." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Terms & Conditions</label>
                  <textarea rows={3} defaultValue="Payment is due within 30 days. Late payments subject to 1.5% monthly interest." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'attachments' && (
          <div className="mt-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center">
                <Upload size={40} className="mx-auto text-slate-400 mb-4" />
                <p className="font-medium text-slate-900">Drop files here or click to upload</p>
                <p className="text-sm text-slate-500 mt-1">PDF, DOC, XLS up to 10MB</p>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">contract_agreement.pdf</p>
                      <p className="text-xs text-slate-500">2.4 MB</p>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-slate-200 rounded"><Trash2 size={16} className="text-slate-400" /></button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="mt-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="space-y-4">
                {[
                  { action: 'Invoice created', user: 'John Smith', date: '2024-11-26 09:30', icon: FileText, color: 'blue' },
                  { action: 'Submitted for approval', user: 'John Smith', date: '2024-11-26 09:35', icon: Send, color: 'amber' },
                  { action: 'Approved', user: 'Admin User', date: '2024-11-26 10:15', icon: CheckCircle, color: 'green' },
                  { action: 'Emailed to customer', user: 'System', date: '2024-11-26 10:20', icon: Mail, color: 'blue' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${item.color === 'blue' ? 'bg-blue-50' : item.color === 'amber' ? 'bg-amber-50' : 'bg-emerald-50'}`}>
                      <item.icon size={18} className={`${item.color === 'blue' ? 'text-blue-600' : item.color === 'amber' ? 'text-amber-600' : 'text-emerald-600'}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{item.action}</p>
                      <p className="text-xs text-slate-500">{item.user} • {item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================
// CREDIT NOTE FORM
// ============================================================
const CreditNoteForm = ({ creditNote = null, onClose }) => {
  const isNew = !creditNote;
  
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><ChevronLeft size={20} /></button>
            <div>
              <h1 className="text-xl font-bold text-slate-900">{isNew ? 'New Credit Note' : `Credit Note ${creditNote?.id}`}</h1>
              <p className="text-sm text-slate-500">{isNew ? 'Create a credit note for a customer' : 'View credit note details'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
              <Save size={16} /> Save Draft
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700">
              <Send size={16} /> Submit for Approval
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Warning Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="text-amber-600 flex-shrink-0" size={20} />
          <div>
            <p className="text-sm font-medium text-amber-800">Credit Note Requires Approval</p>
            <p className="text-sm text-amber-700">All credit notes must be approved before they can be applied to invoices.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Customer & Invoice Selection */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-medium text-slate-900 mb-4">Credit Note Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Customer *</label>
                <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                  <option value="">Select customer...</option>
                  <option value="C-001">ABC Corporation</option>
                  <option value="C-002">XYZ Industries</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Original Invoice *</label>
                <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                  <option value="">Select invoice...</option>
                  <option value="INV-2024-0156">INV-2024-0156 - $125,000</option>
                  <option value="INV-2024-0152">INV-2024-0152 - $45,000</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Credit Note Date *</label>
                <input type="date" defaultValue="2024-11-26" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-medium text-slate-900 mb-4">Reason for Credit</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Reason Type *</label>
                <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                  <option value="">Select reason...</option>
                  <option value="defective">Defective Goods</option>
                  <option value="return">Goods Returned</option>
                  <option value="pricing">Pricing Adjustment</option>
                  <option value="service">Service Credit</option>
                  <option value="dispute">Dispute Resolution</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Detailed Explanation *</label>
                <textarea rows={4} placeholder="Provide detailed reason for this credit note..." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Credit Lines */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-medium text-slate-900">Credit Lines</h3>
            <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
              <Plus size={16} /> Add Line
            </button>
          </div>
          <table className="w-full">
            <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Description</th>
                <th className="px-4 py-3 text-right font-medium w-24">Qty</th>
                <th className="px-4 py-3 text-right font-medium w-32">Rate</th>
                <th className="px-4 py-3 text-right font-medium w-32">Amount</th>
                <th className="px-4 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3"><input type="text" placeholder="Item description" className="w-full px-2 py-1.5 text-sm border border-slate-200 rounded" /></td>
                <td className="px-4 py-3"><input type="number" defaultValue={1} className="w-full px-2 py-1.5 text-sm text-right border border-slate-200 rounded" /></td>
                <td className="px-4 py-3"><input type="number" defaultValue={5000} className="w-full px-2 py-1.5 text-sm text-right border border-slate-200 rounded" /></td>
                <td className="px-4 py-3 text-sm text-right font-medium text-orange-600">-$5,000</td>
                <td className="px-4 py-3"><button className="p-1 hover:bg-slate-100 rounded text-slate-400"><Trash2 size={16} /></button></td>
              </tr>
            </tbody>
            <tfoot className="bg-slate-50">
              <tr>
                <td colSpan={3} className="px-4 py-3 text-sm text-right font-bold">Total Credit</td>
                <td className="px-4 py-3 text-lg text-right font-bold text-orange-600">-$5,000</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Attachments */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-medium text-slate-900 mb-4">Supporting Documents</h3>
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center">
            <Upload size={32} className="mx-auto text-slate-400 mb-2" />
            <p className="text-sm text-slate-600">Upload supporting documents (photos, correspondence, etc.)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// PAYMENT FORM (Incoming)
// ============================================================
const IncomingPaymentForm = ({ payment = null, onClose }) => {
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  
  const openInvoices = [
    { id: 'INV-2024-0156', customer: 'ABC Corporation', date: '2024-11-25', amount: 125000, balance: 125000 },
    { id: 'INV-2024-0152', customer: 'ABC Corporation', date: '2024-11-24', amount: 45000, balance: 45000 },
    { id: 'INV-2024-0148', customer: 'ABC Corporation', date: '2024-11-22', amount: 89000, balance: 44000 },
  ];

  const totalApplied = selectedInvoices.reduce((s, inv) => s + (inv.applied || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><ChevronLeft size={20} /></button>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Record Incoming Payment</h1>
              <p className="text-sm text-slate-500">Record a payment received from a customer</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
              <CheckCircle size={16} /> Record Payment
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Payment Details */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-medium text-slate-900 mb-4">Payment Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Customer *</label>
                <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                  <option value="">Select customer...</option>
                  <option value="C-001" selected>ABC Corporation</option>
                  <option value="C-002">XYZ Industries</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Payment Date *</label>
                  <input type="date" defaultValue="2024-11-26" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Amount Received *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <input type="number" defaultValue={50000} className="w-full pl-7 pr-3 py-2 text-sm border border-slate-200 rounded-lg" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Payment Method *</label>
                <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                  <option value="transfer">Bank Transfer</option>
                  <option value="check">Check</option>
                  <option value="cash">Cash</option>
                  <option value="card">Credit Card</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Reference Number</label>
                <input type="text" placeholder="e.g., TRF-445566" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Deposit To *</label>
                <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                  <option value="BA-001">BA-001 - Main Operating Account</option>
                  <option value="BA-002">BA-002 - Payroll Account</option>
                </select>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-medium text-slate-900 mb-4">Payment Summary</h3>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <p className="text-sm text-emerald-700">Amount Received</p>
                <p className="text-3xl font-bold text-emerald-700">$50,000</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500">Applied to Invoices</p>
                  <p className="text-lg font-bold text-slate-900">${totalApplied.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500">Unapplied Amount</p>
                  <p className="text-lg font-bold text-amber-600">${(50000 - totalApplied).toLocaleString()}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                <textarea rows={3} placeholder="Payment notes..." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Apply to Invoices */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h3 className="font-medium text-slate-900">Apply to Open Invoices</h3>
            <p className="text-sm text-slate-500">Select invoices to apply this payment</p>
          </div>
          <table className="w-full">
            <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3 text-left font-medium w-12">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-4 py-3 text-left font-medium">Invoice</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-right font-medium">Original</th>
                <th className="px-4 py-3 text-right font-medium">Balance Due</th>
                <th className="px-4 py-3 text-right font-medium w-40">Apply Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {openInvoices.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3"><input type="checkbox" className="rounded" /></td>
                  <td className="px-4 py-3 text-sm font-medium text-blue-600">{inv.id}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{inv.date}</td>
                  <td className="px-4 py-3 text-sm text-right">${inv.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right font-medium">${inv.balance.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <input type="number" placeholder="0.00" className="w-full px-2 py-1.5 text-sm text-right border border-slate-200 rounded" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// OUTGOING PAYMENT FORM
// ============================================================
const OutgoingPaymentForm = ({ payment = null, onClose }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg"><ChevronLeft size={20} /></button>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Create Payment Request</h1>
              <p className="text-sm text-slate-500">Request a payment to a vendor</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
              <Save size={16} /> Save Draft
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Send size={16} /> Submit for Approval
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Warning */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
          <div>
            <p className="text-sm font-medium text-blue-800">Payment Approval Required</p>
            <p className="text-sm text-blue-700">Payments over $50,000 require management approval before processing.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Vendor & Payment Details */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-medium text-slate-900 mb-4">Payment Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Vendor *</label>
                <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                  <option value="">Select vendor...</option>
                  <option value="V-001">ABC Supplies Co</option>
                  <option value="V-002">Global Materials Ltd</option>
                  <option value="V-003">Tech Equipment Inc</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Payment Date *</label>
                  <input type="date" defaultValue="2024-11-26" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Amount *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <input type="number" className="w-full pl-7 pr-3 py-2 text-sm border border-slate-200 rounded-lg" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Payment Method *</label>
                <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                  <option value="transfer">Bank Transfer</option>
                  <option value="check">Check</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pay From Account *</label>
                <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                  <option value="BA-001">BA-001 - Main Operating ($485,000)</option>
                  <option value="BA-002">BA-002 - Payroll Account ($125,000)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Priority & Notes */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-medium text-slate-900 mb-4">Additional Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                  <option value="normal">Normal</option>
                  <option value="high">High - Urgent</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Reason / Justification</label>
                <textarea rows={4} placeholder="Explain the purpose of this payment..." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-slate-700">Schedule for future date</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Bills to Pay */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h3 className="font-medium text-slate-900">Apply to Bills</h3>
          </div>
          <table className="w-full">
            <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3 text-left font-medium w-12"><input type="checkbox" className="rounded" /></th>
                <th className="px-4 py-3 text-left font-medium">Bill #</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Due Date</th>
                <th className="px-4 py-3 text-right font-medium">Amount</th>
                <th className="px-4 py-3 text-right font-medium">Balance</th>
                <th className="px-4 py-3 text-right font-medium w-40">Pay Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { id: 'BILL-2024-0089', date: '2024-11-20', due: '2024-12-20', amount: 45000, balance: 45000 },
                { id: 'BILL-2024-0085', date: '2024-11-15', due: '2024-12-15', amount: 28000, balance: 28000 },
              ].map(bill => (
                <tr key={bill.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3"><input type="checkbox" className="rounded" /></td>
                  <td className="px-4 py-3 text-sm font-medium text-blue-600">{bill.id}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{bill.date}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{bill.due}</td>
                  <td className="px-4 py-3 text-sm text-right">${bill.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right font-medium">${bill.balance.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <input type="number" placeholder="0.00" className="w-full px-2 py-1.5 text-sm text-right border border-slate-200 rounded" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// SEND STATEMENT FORM
// ============================================================
const SendStatementModal = ({ isOpen, onClose, customer }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Send Customer Statement" size="md">
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
        <Mail className="text-blue-600 flex-shrink-0" size={20} />
        <div>
          <p className="text-sm font-medium text-blue-800">Email Statement</p>
          <p className="text-sm text-blue-700">A statement will be generated and sent to the customer.</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Customer</label>
        <input type="text" value={customer?.name || 'ABC Corporation'} disabled className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Email To *</label>
        <input type="email" defaultValue="billing@abccorp.com" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">CC</label>
        <input type="email" placeholder="Additional recipients..." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Statement Period</label>
        <div className="grid grid-cols-2 gap-4">
          <input type="date" defaultValue="2024-01-01" className="px-3 py-2 text-sm border border-slate-200 rounded-lg" />
          <input type="date" defaultValue="2024-11-26" className="px-3 py-2 text-sm border border-slate-200 rounded-lg" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Include</label>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" defaultChecked />
            <span className="text-sm text-slate-700">Open invoices only</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" defaultChecked />
            <span className="text-sm text-slate-700">Aging summary</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span className="text-sm text-slate-700">Payment history</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Additional Message</label>
        <textarea rows={3} placeholder="Add a personalized message..." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
        <button onClick={onClose} className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Send size={16} /> Send Statement
        </button>
      </div>
    </div>
  </Modal>
);

// ============================================================
// MAIN DEMO COMPONENT
// ============================================================
export default function FinanceLiteForms() {
  const [activeForm, setActiveForm] = useState('menu');
  const [showStatement, setShowStatement] = useState(false);
  const demoCustomer = { name: 'ABC Corporation', email: 'billing@abccorp.com' };

  if (activeForm === 'invoice') return <InvoiceForm onClose={() => setActiveForm('menu')} onSave={() => setActiveForm('menu')} />;
  if (activeForm === 'creditnote') return <CreditNoteForm onClose={() => setActiveForm('menu')} />;
  if (activeForm === 'incoming') return <IncomingPaymentForm onClose={() => setActiveForm('menu')} />;
  if (activeForm === 'outgoing') return <OutgoingPaymentForm onClose={() => setActiveForm('menu')} />;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
            <CreditCard size={32} className="text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Finance Lite - Forms</h1>
          <p className="text-slate-500 mt-1">Select a form to preview</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => setActiveForm('invoice')} className="bg-white rounded-xl border border-slate-200 p-6 text-left hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
              <FileText size={24} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-900">Invoice Form</h3>
            <p className="text-sm text-slate-500 mt-1">Create and view customer invoices with line items</p>
          </button>

          <button onClick={() => setActiveForm('creditnote')} className="bg-white rounded-xl border border-slate-200 p-6 text-left hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
              <Receipt size={24} className="text-orange-600" />
            </div>
            <h3 className="font-semibold text-slate-900">Credit Note Form</h3>
            <p className="text-sm text-slate-500 mt-1">Issue credit notes against invoices</p>
          </button>

          <button onClick={() => setActiveForm('incoming')} className="bg-white rounded-xl border border-slate-200 p-6 text-left hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
              <DollarSign size={24} className="text-emerald-600" />
            </div>
            <h3 className="font-semibold text-slate-900">Incoming Payment</h3>
            <p className="text-sm text-slate-500 mt-1">Record payments received from customers</p>
          </button>

          <button onClick={() => setActiveForm('outgoing')} className="bg-white rounded-xl border border-slate-200 p-6 text-left hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
              <Banknote size={24} className="text-red-600" />
            </div>
            <h3 className="font-semibold text-slate-900">Outgoing Payment</h3>
            <p className="text-sm text-slate-500 mt-1">Request payments to vendors with approval</p>
          </button>

          <button onClick={() => setShowStatement(true)} className="bg-white rounded-xl border border-slate-200 p-6 text-left hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
              <Mail size={24} className="text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-900">Send Statement</h3>
            <p className="text-sm text-slate-500 mt-1">Email account statements to customers</p>
          </button>

          <div className="bg-slate-100 rounded-xl border border-dashed border-slate-300 p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-slate-200 flex items-center justify-center mx-auto mb-4">
              <Plus size={24} className="text-slate-400" />
            </div>
            <h3 className="font-semibold text-slate-400">More Forms</h3>
            <p className="text-sm text-slate-400 mt-1">Additional forms coming soon</p>
          </div>
        </div>
      </div>

      <SendStatementModal isOpen={showStatement} onClose={() => setShowStatement(false)} customer={demoCustomer} />
    </div>
  );
}
