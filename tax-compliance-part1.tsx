import React, { useState } from 'react';
import {
  ChevronRight, ChevronDown, Plus, Search, Filter, Download, Upload, RefreshCw,
  MoreHorizontal, Edit, Trash2, Eye, Copy, Check, X, AlertCircle, CheckCircle,
  Wallet, Calendar, DollarSign, Settings, Layers, Target, Shield, Clock,
  ChevronLeft, Save, FileText, Link2, Database, ArrowRight, Percent, Building,
  Hash, Activity, Receipt, Scale, Globe, Flag, Building2, Banknote, Tag,
  CreditCard, BadgePercent, CircleDollarSign, FileCheck, AlertTriangle
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
    Default: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    VAT: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    WHT: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
    Stamp: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    Local: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    Input: { bg: 'bg-cyan-50', text: 'text-cyan-700', dot: 'bg-cyan-500' },
    Output: { bg: 'bg-pink-50', text: 'text-pink-700', dot: 'bg-pink-500' },
    Exempt: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    ZeroRated: { bg: 'bg-slate-100', text: 'text-slate-700', dot: 'bg-slate-500' },
    ReverseCharge: { bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-500' },
    Sales: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    Purchasing: { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
    Service: { bg: 'bg-violet-50', text: 'text-violet-700', dot: 'bg-violet-500' },
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

// ============================================================
// TAX TYPES PAGE
// ============================================================
const TaxTypesPage = ({ onCreateTaxType }) => {
  const taxTypes = [
    { id: '1', code: 'VAT', name: 'Value Added Tax', description: 'Standard VAT/GST for goods and services', isWithholding: false, isIndirect: true, codesCount: 8 },
    { id: '2', code: 'WHT', name: 'Withholding Tax', description: 'Tax withheld at source on payments', isWithholding: true, isIndirect: false, codesCount: 5 },
    { id: '3', code: 'STAMP', name: 'Stamp Duty', description: 'Tax on legal documents and transactions', isWithholding: false, isIndirect: true, codesCount: 3 },
    { id: '4', code: 'LOCAL', name: 'Local Charges', description: 'Municipal and local government levies', isWithholding: false, isIndirect: true, codesCount: 2 },
  ];

  const getTypeIcon = (code) => {
    switch (code) {
      case 'VAT': return <BadgePercent size={24} className="text-blue-600" />;
      case 'WHT': return <CreditCard size={24} className="text-purple-600" />;
      case 'STAMP': return <FileCheck size={24} className="text-amber-600" />;
      case 'LOCAL': return <Building2 size={24} className="text-emerald-600" />;
      default: return <Receipt size={24} className="text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Tax Types</h2>
          <p className="text-sm text-slate-500">Categories of taxes (VAT, WHT, Stamp Duty, etc.)</p>
        </div>
        <Button icon={Plus} onClick={onCreateTaxType}>New Tax Type</Button>
      </div>

      {/* Tax Types Grid */}
      <div className="grid grid-cols-2 gap-4">
        {taxTypes.map(type => (
          <Card key={type.id} className="hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${
                    type.code === 'VAT' ? 'bg-blue-50' :
                    type.code === 'WHT' ? 'bg-purple-50' :
                    type.code === 'STAMP' ? 'bg-amber-50' : 'bg-emerald-50'
                  }`}>
                    {getTypeIcon(type.code)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{type.name}</h3>
                    <p className="text-sm text-slate-500">{type.code}</p>
                  </div>
                </div>
                <StatusBadge status="Active" />
              </div>

              <p className="text-sm text-slate-600 mb-4">{type.description}</p>

              <div className="flex items-center gap-4 text-sm">
                {type.isWithholding && (
                  <span className="flex items-center gap-1 text-purple-600">
                    <CreditCard size={14} /> Withholding
                  </span>
                )}
                {type.isIndirect && (
                  <span className="flex items-center gap-1 text-blue-600">
                    <Receipt size={14} /> Indirect Tax
                  </span>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm text-slate-500">{type.codesCount} tax codes</span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" icon={Edit}>Edit</Button>
                  <Button variant="ghost" size="sm" icon={Eye}>View Codes</Button>
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
// TAX CODES PAGE
// ============================================================
const TaxCodesPage = ({ onCreateTaxCode }) => {
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const taxCodes = [
    { id: '1', code: 'VAT14', name: 'Standard VAT 14%', taxType: 'VAT', rate: 14, country: 'EG', isInput: true, isOutput: true, isExempt: false, isZeroRated: false, reverseCharge: false, sapCode: 'V14', validFrom: '2024-01-01' },
    { id: '2', code: 'VAT0', name: 'Zero-Rated VAT', taxType: 'VAT', rate: 0, country: 'EG', isInput: true, isOutput: true, isExempt: false, isZeroRated: true, reverseCharge: false, sapCode: 'V0', validFrom: '2024-01-01' },
    { id: '3', code: 'EXEMPT', name: 'VAT Exempt', taxType: 'VAT', rate: 0, country: 'EG', isInput: false, isOutput: true, isExempt: true, isZeroRated: false, reverseCharge: false, sapCode: 'VX', validFrom: '2024-01-01' },
    { id: '4', code: 'VAT-RC', name: 'Reverse Charge VAT', taxType: 'VAT', rate: 14, country: 'EG', isInput: true, isOutput: true, isExempt: false, isZeroRated: false, reverseCharge: true, sapCode: 'VRC', validFrom: '2024-01-01' },
    { id: '5', code: 'WHT3', name: 'WHT 3% - Services', taxType: 'WHT', rate: 3, country: 'EG', isInput: false, isOutput: false, isExempt: false, isZeroRated: false, reverseCharge: false, sapCode: 'W3', validFrom: '2024-01-01' },
    { id: '6', code: 'WHT5', name: 'WHT 5% - Contractors', taxType: 'WHT', rate: 5, country: 'EG', isInput: false, isOutput: false, isExempt: false, isZeroRated: false, reverseCharge: false, sapCode: 'W5', validFrom: '2024-01-01' },
    { id: '7', code: 'WHT10', name: 'WHT 10% - Royalties', taxType: 'WHT', rate: 10, country: 'EG', isInput: false, isOutput: false, isExempt: false, isZeroRated: false, reverseCharge: false, sapCode: 'W10', validFrom: '2024-01-01' },
    { id: '8', code: 'STAMP1', name: 'Stamp Duty 0.5%', taxType: 'Stamp', rate: 0.5, country: 'EG', isInput: false, isOutput: true, isExempt: false, isZeroRated: false, reverseCharge: false, sapCode: 'ST1', validFrom: '2024-01-01' },
  ];

  const filteredCodes = taxCodes.filter(code => {
    if (filterType !== 'all' && code.taxType !== filterType) return false;
    if (searchTerm && !code.code.toLowerCase().includes(searchTerm.toLowerCase()) && !code.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Tax Codes</h2>
          <p className="text-sm text-slate-500">Specific tax codes with rates and configurations</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={RefreshCw}>Sync from SAP</Button>
          <Button icon={Plus} onClick={onCreateTaxCode}>New Tax Code</Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-100"><Receipt size={20} className="text-slate-600" /></div>
            <div><p className="text-2xl font-bold text-slate-900">8</p><p className="text-xs text-slate-500">Total Codes</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50"><BadgePercent size={20} className="text-blue-600" /></div>
            <div><p className="text-2xl font-bold text-slate-900">4</p><p className="text-xs text-slate-500">VAT Codes</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-50"><CreditCard size={20} className="text-purple-600" /></div>
            <div><p className="text-2xl font-bold text-slate-900">3</p><p className="text-xs text-slate-500">WHT Codes</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-50"><FileCheck size={20} className="text-amber-600" /></div>
            <div><p className="text-2xl font-bold text-slate-900">1</p><p className="text-xs text-slate-500">Stamp Codes</p></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-50"><Globe size={20} className="text-green-600" /></div>
            <div><p className="text-2xl font-bold text-slate-900">1</p><p className="text-xs text-slate-500">Countries</p></div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search tax codes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm" />
        </div>
        <Select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="w-40"
          options={[
            { value: 'all', label: 'All Types' },
            { value: 'VAT', label: 'VAT' },
            { value: 'WHT', label: 'WHT' },
            { value: 'Stamp', label: 'Stamp' },
          ]} />
        <Button variant="secondary" icon={Download}>Export</Button>
      </div>

      {/* Tax Codes Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Code</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Name</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Type</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Rate %</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Country</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Direction</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Special</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">SAP Code</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCodes.map(code => (
                <tr key={code.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <span className="font-mono font-semibold text-slate-900">{code.code}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">{code.name}</td>
                  <td className="px-4 py-3 text-center"><StatusBadge status={code.taxType} /></td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-semibold text-slate-900">{code.rate}%</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="flex items-center justify-center gap-1">
                      <Flag size={14} className="text-slate-400" />
                      <span className="text-sm">{code.country}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      {code.isInput && <span className="px-2 py-0.5 bg-cyan-100 text-cyan-700 text-xs rounded">Input</span>}
                      {code.isOutput && <span className="px-2 py-0.5 bg-pink-100 text-pink-700 text-xs rounded">Output</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      {code.isExempt && <StatusBadge status="Exempt" />}
                      {code.isZeroRated && <StatusBadge status="ZeroRated" />}
                      {code.reverseCharge && <StatusBadge status="ReverseCharge" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-mono rounded">{code.sapCode}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1.5 hover:bg-slate-100 rounded"><Eye size={14} className="text-slate-400" /></button>
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
// TAX CODE FORM
// ============================================================
const TaxCodeForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    code: '', name: '', description: '', taxTypeId: '', countryCode: 'EG',
    jurisdictionCode: '', ratePercent: 0, isWithholding: false, isInputTax: true,
    isOutputTax: true, reverseCharge: false, isExempt: false, isZeroRated: false,
    validFrom: '', validTo: '', sapTaxCode: ''
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Tax Code" required>
          <Input value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} placeholder="e.g., VAT14" />
        </FormField>
        <FormField label="Name" required>
          <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g., Standard VAT 14%" />
        </FormField>
      </div>

      <FormField label="Description">
        <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="Optional description..." />
      </FormField>

      <div className="grid grid-cols-3 gap-4">
        <FormField label="Tax Type" required>
          <Select value={formData.taxTypeId} onChange={(e) => setFormData({...formData, taxTypeId: e.target.value})}
            options={[
              { value: '', label: 'Select Type...' },
              { value: 'vat', label: 'VAT - Value Added Tax' },
              { value: 'wht', label: 'WHT - Withholding Tax' },
              { value: 'stamp', label: 'Stamp - Stamp Duty' },
              { value: 'local', label: 'Local - Local Charges' },
            ]} />
        </FormField>
        <FormField label="Country" required>
          <Select value={formData.countryCode} onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
            options={[
              { value: 'EG', label: 'EG - Egypt' },
              { value: 'SA', label: 'SA - Saudi Arabia' },
              { value: 'AE', label: 'AE - UAE' },
              { value: 'JO', label: 'JO - Jordan' },
            ]} />
        </FormField>
        <FormField label="Rate %" required>
          <Input type="number" value={formData.ratePercent} onChange={(e) => setFormData({...formData, ratePercent: parseFloat(e.target.value) || 0})}
            step="0.01" min="0" max="100" />
        </FormField>
      </div>

      <Card className="p-4 bg-slate-50">
        <h3 className="font-medium text-slate-900 mb-4">Tax Direction & Behavior</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-600">Direction</p>
            <Checkbox label="Input Tax (Purchases)" checked={formData.isInputTax} onChange={(e) => setFormData({...formData, isInputTax: e.target.checked})} />
            <Checkbox label="Output Tax (Sales)" checked={formData.isOutputTax} onChange={(e) => setFormData({...formData, isOutputTax: e.target.checked})} />
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-600">Special Handling</p>
            <Checkbox label="Exempt" checked={formData.isExempt} onChange={(e) => setFormData({...formData, isExempt: e.target.checked})} />
            <Checkbox label="Zero-Rated" checked={formData.isZeroRated} onChange={(e) => setFormData({...formData, isZeroRated: e.target.checked})} />
            <Checkbox label="Reverse Charge" checked={formData.reverseCharge} onChange={(e) => setFormData({...formData, reverseCharge: e.target.checked})} />
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-600">Tax Category</p>
            <Checkbox label="Withholding Tax" checked={formData.isWithholding} onChange={(e) => setFormData({...formData, isWithholding: e.target.checked})} />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <FormField label="Valid From">
          <Input type="date" value={formData.validFrom} onChange={(e) => setFormData({...formData, validFrom: e.target.value})} />
        </FormField>
        <FormField label="Valid To" hint="Leave empty for ongoing">
          <Input type="date" value={formData.validTo} onChange={(e) => setFormData({...formData, validTo: e.target.value})} />
        </FormField>
        <FormField label="SAP Tax Code" hint="Mapping to SAP B1">
          <Input value={formData.sapTaxCode} onChange={(e) => setFormData({...formData, sapTaxCode: e.target.value})} placeholder="e.g., V14" />
        </FormField>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button icon={Save} onClick={() => onSave(formData)}>Save Tax Code</Button>
      </div>
    </div>
  );
};

// ============================================================
// TAX POSTING SCHEMAS PAGE
// ============================================================
const TaxPostingSchemasPage = ({ onCreateSchema }) => {
  const [selectedSchema, setSelectedSchema] = useState('default');

  const schemas = [
    { id: 'default', name: 'Default Posting Schema', description: 'Standard GL mapping for all tax codes', isDefault: true, linesCount: 12 },
    { id: 'construction', name: 'Construction Projects Schema', description: 'Special mapping for construction contracts', isDefault: false, linesCount: 8 },
  ];

  const schemaLines = [
    { taxCode: 'VAT14', transactionType: 'Sales', glAccount: '220100', glName: 'Output VAT Payable', isInput: false, isOutput: true },
    { taxCode: 'VAT14', transactionType: 'Purchasing', glAccount: '130200', glName: 'Input VAT Recoverable', isInput: true, isOutput: false },
    { taxCode: 'VAT0', transactionType: 'Sales', glAccount: '220100', glName: 'Output VAT Payable', isInput: false, isOutput: true },
    { taxCode: 'EXEMPT', transactionType: 'Sales', glAccount: '220100', glName: 'Output VAT Payable', isInput: false, isOutput: true },
    { taxCode: 'VAT-RC', transactionType: 'Purchasing', glAccount: '220100', glName: 'Output VAT Payable (RC)', isInput: false, isOutput: true },
    { taxCode: 'VAT-RC', transactionType: 'Purchasing', glAccount: '130200', glName: 'Input VAT Recoverable (RC)', isInput: true, isOutput: false },
    { taxCode: 'WHT3', transactionType: 'Purchasing', glAccount: '230500', glName: 'WHT Payable - Services', isInput: false, isOutput: false },
    { taxCode: 'WHT5', transactionType: 'Purchasing', glAccount: '230510', glName: 'WHT Payable - Contractors', isInput: false, isOutput: false },
    { taxCode: 'WHT10', transactionType: 'Purchasing', glAccount: '230520', glName: 'WHT Payable - Royalties', isInput: false, isOutput: false },
    { taxCode: 'STAMP1', transactionType: 'Sales', glAccount: '220200', glName: 'Stamp Duty Payable', isInput: false, isOutput: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Tax Posting Schemas</h2>
          <p className="text-sm text-slate-500">GL account mappings for tax codes by transaction type</p>
        </div>
        <Button icon={Plus} onClick={onCreateSchema}>New Schema</Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Schemas List */}
        <div className="col-span-1 space-y-3">
          {schemas.map(schema => (
            <Card key={schema.id} 
              className={`cursor-pointer hover:shadow-md transition-all ${selectedSchema === schema.id ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setSelectedSchema(schema.id)}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-900">{schema.name}</h3>
                  {schema.isDefault && <StatusBadge status="Default" />}
                </div>
                <p className="text-sm text-slate-500 mb-3">{schema.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{schema.linesCount} mappings</span>
                  <Button variant="ghost" size="sm" icon={Edit}>Edit</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Schema Lines */}
        <Card className="col-span-2">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">GL Mappings</h3>
              <p className="text-sm text-slate-500">Tax code to GL account relationships</p>
            </div>
            <Button variant="secondary" size="sm" icon={Plus}>Add Mapping</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Tax Code</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Transaction</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">GL Account</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Direction</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {schemaLines.map((line, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <span className="font-mono font-semibold text-slate-900">{line.taxCode}</span>
                    </td>
                    <td className="px-4 py-3 text-center"><StatusBadge status={line.transactionType} /></td>
                    <td className="px-4 py-3">
                      <div>
                        <span className="font-mono text-sm text-slate-900">{line.glAccount}</span>
                        <p className="text-xs text-slate-500">{line.glName}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        {line.isInput && <span className="px-2 py-0.5 bg-cyan-100 text-cyan-700 text-xs rounded">Input</span>}
                        {line.isOutput && <span className="px-2 py-0.5 bg-pink-100 text-pink-700 text-xs rounded">Output</span>}
                        {!line.isInput && !line.isOutput && <span className="text-slate-400 text-xs">N/A</span>}
                      </div>
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
      </div>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function TaxCompliancePart1() {
  const [activeTab, setActiveTab] = useState('taxTypes');
  const [showTaxCodeForm, setShowTaxCodeForm] = useState(false);

  const tabs = [
    { id: 'taxTypes', label: 'Tax Types', badge: '4' },
    { id: 'taxCodes', label: 'Tax Codes', badge: '8' },
    { id: 'postingSchemas', label: 'Posting Schemas', badge: '2' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-100">
              <Receipt size={24} className="text-emerald-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Tax & Compliance</h1>
              <p className="text-sm text-slate-500">Part 1: Tax Types, Tax Codes & Posting Schemas</p>
            </div>
          </div>
        </div>
        <div className="px-6">
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'taxTypes' && <TaxTypesPage onCreateTaxType={() => {}} />}
        {activeTab === 'taxCodes' && <TaxCodesPage onCreateTaxCode={() => setShowTaxCodeForm(true)} />}
        {activeTab === 'postingSchemas' && <TaxPostingSchemasPage onCreateSchema={() => {}} />}
      </div>

      {/* Modals */}
      <Modal isOpen={showTaxCodeForm} onClose={() => setShowTaxCodeForm(false)} title="Create Tax Code" size="lg">
        <TaxCodeForm onSave={(data) => { console.log(data); setShowTaxCodeForm(false); }} onCancel={() => setShowTaxCodeForm(false)} />
      </Modal>
    </div>
  );
}
