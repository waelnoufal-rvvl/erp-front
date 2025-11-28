import React, { useState } from 'react';
import {
  ChevronRight, ChevronDown, Plus, Search, Filter, Download, Upload, RefreshCw,
  MoreHorizontal, Edit, Trash2, Eye, Copy, Check, X, AlertCircle, CheckCircle,
  Wallet, Calendar, DollarSign, Settings, Layers, Target, Shield, Clock,
  ChevronLeft, Save, FileText, Link2, Database, ArrowRight, Percent, Building,
  Hash, Activity, Receipt, Scale, Globe, Flag, Building2, Banknote, Tag,
  CreditCard, BadgePercent, CircleDollarSign, FileCheck, AlertTriangle, Play,
  Zap, GitBranch, Users, Briefcase, Package, ArrowDownUp, Calculator, Info
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
    Sales: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    Purchasing: { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
    Service: { bg: 'bg-violet-50', text: 'text-violet-700', dot: 'bg-violet-500' },
    ICP: { bg: 'bg-cyan-50', text: 'text-cyan-700', dot: 'bg-cyan-500' },
    General: { bg: 'bg-slate-100', text: 'text-slate-700', dot: 'bg-slate-500' },
    Customer: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    Vendor: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    VAT: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    WHT: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
    GrossAmount: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    NetOfDiscount: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
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

const Button = ({ children, variant = 'primary', size = 'md', icon: Icon, onClick, disabled }) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300',
    secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50',
    success: 'bg-green-600 text-white hover:bg-green-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
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

const FormField = ({ label, required, children, hint }) => (
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

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 cursor-pointer">
    <input type="checkbox" checked={checked} onChange={onChange} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
    <span className="text-sm text-slate-700">{label}</span>
  </label>
);

const formatCurrency = (amount, currency = 'EGP') => new Intl.NumberFormat('en-EG', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);

// ============================================================
// TAX RULES PAGE
// ============================================================
const TaxRulesPage = ({ onCreateRule, onTestRule }) => {
  const [filterScope, setFilterScope] = useState('all');

  const rules = [
    {
      id: '1', name: 'Standard Sales VAT - Egypt', description: 'Default VAT for domestic sales',
      priority: 10, scope: 'Sales', country: 'EG', bpType: 'Customer', bpGroup: null, bpTaxCategory: 'Registered',
      itemGroup: null, itemTaxCategory: 'Standard', taxType: 'VAT', taxCode: 'VAT14', reverseCharge: false,
      validFrom: '2024-01-01', validTo: null, isActive: true
    },
    {
      id: '2', name: 'Zero-Rated Exports', description: 'Zero VAT for export sales',
      priority: 5, scope: 'Sales', country: 'EG', bpType: 'Customer', bpGroup: null, bpTaxCategory: 'Foreign',
      itemGroup: null, itemTaxCategory: 'Standard', taxType: 'VAT', taxCode: 'VAT0', reverseCharge: false,
      validFrom: '2024-01-01', validTo: null, isActive: true
    },
    {
      id: '3', name: 'Exempt Services', description: 'VAT exempt for specific service items',
      priority: 3, scope: 'Sales', country: 'EG', bpType: null, bpGroup: null, bpTaxCategory: null,
      itemGroup: 'GR-SERVICE', itemTaxCategory: 'Exempt', taxType: 'VAT', taxCode: 'EXEMPT', reverseCharge: false,
      validFrom: '2024-01-01', validTo: null, isActive: true
    },
    {
      id: '4', name: 'Standard Purchase VAT', description: 'Input VAT for domestic purchases',
      priority: 10, scope: 'Purchasing', country: 'EG', bpType: 'Vendor', bpGroup: null, bpTaxCategory: 'Registered',
      itemGroup: null, itemTaxCategory: 'Standard', taxType: 'VAT', taxCode: 'VAT14', reverseCharge: false,
      validFrom: '2024-01-01', validTo: null, isActive: true
    },
    {
      id: '5', name: 'Reverse Charge - Import Services', description: 'Reverse charge VAT for imported services',
      priority: 2, scope: 'Purchasing', country: 'EG', bpType: 'Vendor', bpGroup: null, bpTaxCategory: 'Foreign',
      itemGroup: 'GR-SERVICE', itemTaxCategory: 'Standard', taxType: 'VAT', taxCode: 'VAT-RC', reverseCharge: true,
      validFrom: '2024-01-01', validTo: null, isActive: true
    },
    {
      id: '6', name: 'ICP VAT - Construction', description: 'VAT for Interim Payment Certificates',
      priority: 8, scope: 'ICP', country: 'EG', bpType: null, bpGroup: null, bpTaxCategory: 'Registered',
      itemGroup: null, itemTaxCategory: 'Standard', taxType: 'VAT', taxCode: 'VAT14', reverseCharge: false,
      validFrom: '2024-01-01', validTo: null, isActive: true
    },
  ];

  const filteredRules = filterScope === 'all' ? rules : rules.filter(r => r.scope === filterScope);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Tax Rules Engine</h2>
          <p className="text-sm text-slate-500">Configure rules for automatic tax code determination</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={Play} onClick={onTestRule}>Test Rules</Button>
          <Button icon={Plus} onClick={onCreateRule}>New Tax Rule</Button>
        </div>
      </div>

      {/* Info Card */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <Info size={20} className="text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">How Tax Rules Work</p>
            <p className="text-blue-700">Rules are evaluated by <strong>priority</strong> (lowest number = highest priority). The first matching rule determines the tax code. Ensure rules are specific enough to avoid conflicts.</p>
          </div>
        </div>
      </Card>

      {/* Summary & Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {['all', 'Sales', 'Purchasing', 'Service', 'ICP'].map(scope => (
            <button key={scope} onClick={() => setFilterScope(scope)}
              className={`px-3 py-1.5 text-sm rounded-lg ${filterScope === scope ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {scope === 'all' ? 'All Scopes' : scope}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">{filteredRules.length} rules</span>
          <Button variant="secondary" size="sm" icon={ArrowDownUp}>Reorder</Button>
        </div>
      </div>

      {/* Rules List */}
      <div className="space-y-3">
        {filteredRules.sort((a, b) => a.priority - b.priority).map(rule => (
          <Card key={rule.id} className="hover:shadow-md transition-shadow">
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    <span className="font-bold text-slate-600">{rule.priority}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">{rule.name}</h3>
                      <StatusBadge status={rule.scope} />
                      {rule.reverseCharge && (
                        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full">Reverse Charge</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 mb-3">{rule.description}</p>
                    
                    {/* Conditions */}
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2 py-1 bg-slate-100 rounded flex items-center gap-1">
                        <Globe size={12} /> {rule.country}
                      </span>
                      {rule.bpType && (
                        <span className="px-2 py-1 bg-slate-100 rounded flex items-center gap-1">
                          <Users size={12} /> {rule.bpType}
                        </span>
                      )}
                      {rule.bpTaxCategory && (
                        <span className="px-2 py-1 bg-slate-100 rounded flex items-center gap-1">
                          <Tag size={12} /> BP: {rule.bpTaxCategory}
                        </span>
                      )}
                      {rule.itemGroup && (
                        <span className="px-2 py-1 bg-slate-100 rounded flex items-center gap-1">
                          <Package size={12} /> {rule.itemGroup}
                        </span>
                      )}
                      {rule.itemTaxCategory && (
                        <span className="px-2 py-1 bg-slate-100 rounded flex items-center gap-1">
                          <Tag size={12} /> Item: {rule.itemTaxCategory}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={rule.taxType} />
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 font-mono text-sm rounded-lg font-semibold">
                      {rule.taxCode}
                    </span>
                  </div>
                  <StatusBadge status={rule.isActive ? 'Active' : 'Inactive'} />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Valid: {rule.validFrom} {rule.validTo ? `to ${rule.validTo}` : '(ongoing)'}
                </span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" icon={Copy}>Clone</Button>
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
// TAX RULE FORM
// ============================================================
const TaxRuleForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '', description: '', priority: 10, scope: 'Sales', country: 'EG',
    bpType: '', bpGroupCode: '', bpTaxCategory: '', itemGroupCode: '', itemTaxCategory: '',
    taxTypeId: '', taxCodeId: '', reverseCharge: false, validFrom: '', validTo: '', isActive: true
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Rule Name" required>
          <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g., Standard Sales VAT - Egypt" />
        </FormField>
        <FormField label="Priority" required hint="Lower number = higher priority">
          <Input type="number" value={formData.priority} onChange={(e) => setFormData({...formData, priority: parseInt(e.target.value) || 0})} min="1" max="999" />
        </FormField>
      </div>

      <FormField label="Description">
        <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="Describe when this rule applies..." />
      </FormField>

      <Card className="p-4 bg-slate-50">
        <h3 className="font-medium text-slate-900 mb-4">Matching Conditions</h3>
        <div className="grid grid-cols-3 gap-4">
          <FormField label="Transaction Scope" required>
            <Select value={formData.scope} onChange={(e) => setFormData({...formData, scope: e.target.value})}
              options={[
                { value: 'Sales', label: 'Sales' },
                { value: 'Purchasing', label: 'Purchasing' },
                { value: 'Service', label: 'Service' },
                { value: 'ICP', label: 'ICP (Construction)' },
                { value: 'General', label: 'General' },
              ]} />
          </FormField>
          <FormField label="Country">
            <Select value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})}
              options={[
                { value: '', label: 'Any Country' },
                { value: 'EG', label: 'EG - Egypt' },
                { value: 'SA', label: 'SA - Saudi Arabia' },
                { value: 'AE', label: 'AE - UAE' },
              ]} />
          </FormField>
          <FormField label="BP Type">
            <Select value={formData.bpType} onChange={(e) => setFormData({...formData, bpType: e.target.value})}
              options={[
                { value: '', label: 'Any' },
                { value: 'Customer', label: 'Customer' },
                { value: 'Vendor', label: 'Vendor' },
              ]} />
          </FormField>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-4">
          <FormField label="BP Group">
            <Select value={formData.bpGroupCode} onChange={(e) => setFormData({...formData, bpGroupCode: e.target.value})}
              options={[
                { value: '', label: 'Any' },
                { value: 'GR-LOCAL', label: 'Local' },
                { value: 'GR-FOREIGN', label: 'Foreign' },
                { value: 'GR-GOV', label: 'Government' },
              ]} />
          </FormField>
          <FormField label="BP Tax Category">
            <Select value={formData.bpTaxCategory} onChange={(e) => setFormData({...formData, bpTaxCategory: e.target.value})}
              options={[
                { value: '', label: 'Any' },
                { value: 'Registered', label: 'Registered' },
                { value: 'Unregistered', label: 'Unregistered' },
                { value: 'Foreign', label: 'Foreign' },
                { value: 'Government', label: 'Government' },
              ]} />
          </FormField>
          <FormField label="Item Group">
            <Select value={formData.itemGroupCode} onChange={(e) => setFormData({...formData, itemGroupCode: e.target.value})}
              options={[
                { value: '', label: 'Any' },
                { value: 'GR-MATERIAL', label: 'Materials' },
                { value: 'GR-SERVICE', label: 'Services' },
                { value: 'GR-ASSET', label: 'Assets' },
              ]} />
          </FormField>
          <FormField label="Item Tax Category">
            <Select value={formData.itemTaxCategory} onChange={(e) => setFormData({...formData, itemTaxCategory: e.target.value})}
              options={[
                { value: '', label: 'Any' },
                { value: 'Standard', label: 'Standard' },
                { value: 'Exempt', label: 'Exempt' },
                { value: 'ZeroRated', label: 'Zero-Rated' },
              ]} />
          </FormField>
        </div>
      </Card>

      <Card className="p-4 bg-slate-50">
        <h3 className="font-medium text-slate-900 mb-4">Tax Assignment</h3>
        <div className="grid grid-cols-3 gap-4">
          <FormField label="Tax Type" required>
            <Select value={formData.taxTypeId} onChange={(e) => setFormData({...formData, taxTypeId: e.target.value})}
              options={[
                { value: '', label: 'Select Type...' },
                { value: 'vat', label: 'VAT' },
                { value: 'wht', label: 'WHT' },
                { value: 'stamp', label: 'Stamp' },
              ]} />
          </FormField>
          <FormField label="Tax Code" required>
            <Select value={formData.taxCodeId} onChange={(e) => setFormData({...formData, taxCodeId: e.target.value})}
              options={[
                { value: '', label: 'Select Code...' },
                { value: 'vat14', label: 'VAT14 - Standard 14%' },
                { value: 'vat0', label: 'VAT0 - Zero-Rated' },
                { value: 'exempt', label: 'EXEMPT - Exempt' },
                { value: 'vat-rc', label: 'VAT-RC - Reverse Charge' },
              ]} />
          </FormField>
          <div className="flex items-end">
            <Checkbox label="Reverse Charge Scenario" checked={formData.reverseCharge} onChange={(e) => setFormData({...formData, reverseCharge: e.target.checked})} />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <FormField label="Valid From">
          <Input type="date" value={formData.validFrom} onChange={(e) => setFormData({...formData, validFrom: e.target.value})} />
        </FormField>
        <FormField label="Valid To">
          <Input type="date" value={formData.validTo} onChange={(e) => setFormData({...formData, validTo: e.target.value})} />
        </FormField>
        <div className="flex items-end">
          <Checkbox label="Rule is Active" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button icon={Save} onClick={() => onSave(formData)}>Save Tax Rule</Button>
      </div>
    </div>
  );
};

// ============================================================
// TAX RULE TESTER
// ============================================================
const TaxRuleTester = ({ onClose }) => {
  const [testInput, setTestInput] = useState({
    scope: 'Sales', country: 'EG', bpCode: 'C10001', bpTaxCategory: 'Registered',
    itemCode: 'ITEM-001', itemGroup: 'GR-MATERIAL', itemTaxCategory: 'Standard',
    documentDate: '2025-07-15', baseAmount: 10000
  });
  const [result, setResult] = useState(null);

  const runTest = () => {
    setResult({
      taxType: 'VAT', taxCode: 'VAT14', ratePercent: 14, taxAmount: 1400,
      isExempt: false, isZeroRated: false, reverseCharge: false,
      matchedRule: 'Standard Sales VAT - Egypt', ruleId: 'rule-1', rulePriority: 10
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <Play size={20} className="text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium">Tax Rule Tester</p>
            <p className="text-blue-700">Enter transaction details to test which tax rule matches and see the calculated tax.</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        {/* Input */}
        <Card>
          <div className="p-4 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900">Test Input</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Transaction Scope">
                <Select value={testInput.scope} onChange={(e) => setTestInput({...testInput, scope: e.target.value})}
                  options={[{ value: 'Sales', label: 'Sales' }, { value: 'Purchasing', label: 'Purchasing' }, { value: 'ICP', label: 'ICP' }]} />
              </FormField>
              <FormField label="Country">
                <Select value={testInput.country} onChange={(e) => setTestInput({...testInput, country: e.target.value})}
                  options={[{ value: 'EG', label: 'Egypt' }, { value: 'SA', label: 'Saudi Arabia' }]} />
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="BP Code">
                <Input value={testInput.bpCode} onChange={(e) => setTestInput({...testInput, bpCode: e.target.value})} />
              </FormField>
              <FormField label="BP Tax Category">
                <Select value={testInput.bpTaxCategory} onChange={(e) => setTestInput({...testInput, bpTaxCategory: e.target.value})}
                  options={[{ value: 'Registered', label: 'Registered' }, { value: 'Unregistered', label: 'Unregistered' }, { value: 'Foreign', label: 'Foreign' }]} />
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Item Code">
                <Input value={testInput.itemCode} onChange={(e) => setTestInput({...testInput, itemCode: e.target.value})} />
              </FormField>
              <FormField label="Item Tax Category">
                <Select value={testInput.itemTaxCategory} onChange={(e) => setTestInput({...testInput, itemTaxCategory: e.target.value})}
                  options={[{ value: 'Standard', label: 'Standard' }, { value: 'Exempt', label: 'Exempt' }, { value: 'ZeroRated', label: 'Zero-Rated' }]} />
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Document Date">
                <Input type="date" value={testInput.documentDate} onChange={(e) => setTestInput({...testInput, documentDate: e.target.value})} />
              </FormField>
              <FormField label="Base Amount">
                <Input type="number" value={testInput.baseAmount} onChange={(e) => setTestInput({...testInput, baseAmount: parseFloat(e.target.value) || 0})} />
              </FormField>
            </div>
            <Button icon={Calculator} onClick={runTest} className="w-full">Calculate Tax</Button>
          </div>
        </Card>

        {/* Result */}
        <Card>
          <div className="p-4 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900">Result</h3>
          </div>
          {result ? (
            <div className="p-4 space-y-4">
              <div className={`p-4 rounded-lg ${result.taxAmount > 0 ? 'bg-green-50' : 'bg-amber-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Tax Code</span>
                  <span className="font-mono font-bold text-lg">{result.taxCode}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Rate</span>
                  <span className="font-semibold">{result.ratePercent}%</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-2 mt-2">
                  <span className="text-sm font-medium text-slate-700">Tax Amount</span>
                  <span className="text-xl font-bold text-slate-900">{formatCurrency(result.taxAmount)}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Tax Type</span>
                  <StatusBadge status={result.taxType} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Matched Rule</span>
                  <span className="font-medium">{result.matchedRule}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Rule Priority</span>
                  <span className="font-medium">{result.rulePriority}</span>
                </div>
                {result.reverseCharge && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Reverse Charge</span>
                    <CheckCircle size={16} className="text-green-500" />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400">
              <Calculator size={48} className="mx-auto mb-3" />
              <p>Run a test to see results</p>
            </div>
          )}
        </Card>
      </div>

      <div className="flex justify-end">
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};

// ============================================================
// WITHHOLDING TAX PAGE
// ============================================================
const WithholdingTaxPage = ({ onCreateWHT }) => {
  const definitions = [
    { id: '1', taxCode: 'WHT3', name: 'WHT 3% - Professional Services', bpType: 'Vendor', baseType: 'GrossAmount', rate: 3, minAmount: 0, maxAmount: null, accountCode: '230500', certRequired: true },
    { id: '2', taxCode: 'WHT5', name: 'WHT 5% - Contractors', bpType: 'Vendor', baseType: 'GrossAmount', rate: 5, minAmount: 5000, maxAmount: null, accountCode: '230510', certRequired: true },
    { id: '3', taxCode: 'WHT10', name: 'WHT 10% - Royalties', bpType: 'Vendor', baseType: 'NetOfDiscount', rate: 10, minAmount: 0, maxAmount: null, accountCode: '230520', certRequired: true },
    { id: '4', taxCode: 'WHT1', name: 'WHT 1% - Goods', bpType: 'Vendor', baseType: 'GrossAmount', rate: 1, minAmount: 10000, maxAmount: null, accountCode: '230530', certRequired: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Withholding Tax Definitions</h2>
          <p className="text-sm text-slate-500">Configure WHT rates, thresholds and GL accounts</p>
        </div>
        <Button icon={Plus} onClick={onCreateWHT}>New WHT Definition</Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-50"><CreditCard size={20} className="text-purple-600" /></div>
            <div><p className="text-2xl font-bold text-slate-900">4</p><p className="text-xs text-slate-500">WHT Definitions</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-50"><Banknote size={20} className="text-amber-600" /></div>
            <div><p className="text-2xl font-bold text-slate-900">1-10%</p><p className="text-xs text-slate-500">Rate Range</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50"><FileCheck size={20} className="text-blue-600" /></div>
            <div><p className="text-2xl font-bold text-slate-900">3</p><p className="text-xs text-slate-500">Cert Required</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-50"><CheckCircle size={20} className="text-green-600" /></div>
            <div><p className="text-2xl font-bold text-slate-900">4</p><p className="text-xs text-slate-500">Active</p></div>
          </div>
        </Card>
      </div>

      {/* WHT Definitions Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Tax Code</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Name</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">BP Type</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Base Type</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Rate %</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Min Amount</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">GL Account</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Certificate</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {definitions.map(def => (
                <tr key={def.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <span className="font-mono font-semibold text-purple-700">{def.taxCode}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">{def.name}</td>
                  <td className="px-4 py-3 text-center"><StatusBadge status={def.bpType} /></td>
                  <td className="px-4 py-3 text-center"><StatusBadge status={def.baseType} /></td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">{def.rate}%</td>
                  <td className="px-4 py-3 text-right text-sm text-slate-600">
                    {def.minAmount > 0 ? formatCurrency(def.minAmount) : '-'}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm">{def.accountCode}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {def.certRequired ? (
                      <CheckCircle size={18} className="mx-auto text-green-500" />
                    ) : (
                      <X size={18} className="mx-auto text-slate-300" />
                    )}
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

      {/* WHT Calculator */}
      <Card>
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900">Quick WHT Calculator</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-4 gap-4">
            <FormField label="Gross Amount">
              <Input type="number" placeholder="50000" />
            </FormField>
            <FormField label="WHT Code">
              <Select options={[
                { value: 'WHT3', label: 'WHT3 - 3%' },
                { value: 'WHT5', label: 'WHT5 - 5%' },
                { value: 'WHT10', label: 'WHT10 - 10%' },
              ]} />
            </FormField>
            <div className="flex items-end">
              <Button icon={Calculator}>Calculate</Button>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-xs text-purple-600">WHT Amount</p>
              <p className="text-xl font-bold text-purple-700">{formatCurrency(2500)}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function TaxCompliancePart2() {
  const [activeTab, setActiveTab] = useState('rules');
  const [showRuleForm, setShowRuleForm] = useState(false);
  const [showTester, setShowTester] = useState(false);

  const tabs = [
    { id: 'rules', label: 'Tax Rules', badge: '6' },
    { id: 'withholding', label: 'Withholding Tax', badge: '4' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-100">
              <Scale size={24} className="text-emerald-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Tax & Compliance</h1>
              <p className="text-sm text-slate-500">Part 2: Tax Rules Engine & Withholding Tax</p>
            </div>
          </div>
        </div>
        <div className="px-6">
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'rules' && (
          <TaxRulesPage onCreateRule={() => setShowRuleForm(true)} onTestRule={() => setShowTester(true)} />
        )}
        {activeTab === 'withholding' && <WithholdingTaxPage onCreateWHT={() => {}} />}
      </div>

      {/* Modals */}
      <Modal isOpen={showRuleForm} onClose={() => setShowRuleForm(false)} title="Create Tax Rule" size="xl">
        <TaxRuleForm onSave={(data) => { console.log(data); setShowRuleForm(false); }} onCancel={() => setShowRuleForm(false)} />
      </Modal>

      <Modal isOpen={showTester} onClose={() => setShowTester(false)} title="Tax Rule Tester" size="xl">
        <TaxRuleTester onClose={() => setShowTester(false)} />
      </Modal>
    </div>
  );
}
