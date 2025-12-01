import React from 'react';

export interface PreviewDefinition {
  title: string;
  description?: string;
  loader: () => Promise<{ default: React.ComponentType<any> }>;
}

export const previewModules: Record<string, PreviewDefinition> = {
  'erp-dashboard-shell': {
    title: 'ERP Dashboard Shell',
    description: 'Multi-module navigation shell for the ERP workspace.',
    loader: () => import('./erp-dashboard-shell')
  },
  'erp-preview-artifact': {
    title: 'ERP Preview (Artifact)',
    description: 'Snapshot layout generated during prototyping.',
    loader: () => import('./erp-preview-artifact')
  },
  'erp-preview': {
    title: 'ERP Preview',
    description: 'High-level ERP experience mock.',
    loader: () => import('./erp-preview')
  },
  'erp-system-preview': {
    title: 'ERP System Preview',
    description: 'Connected modules preview shell.',
    loader: () => import('./erp-system-preview')
  },
  'finance-core-complete-1': {
    title: 'Finance Core - Journals & GL',
    loader: () => import('./finance-core-complete-1')
  },
  'finance-core-complete-2': {
    title: 'Finance Core - Bank & Cash',
    loader: () => import('./finance-core-complete-2')
  },
  'finance-core-complete-3': {
    title: 'Finance Core - Reconciliation & Audit',
    loader: () => import('./finance-core-complete-3')
  },
  'finance-core-ui': {
    title: 'Finance Core UI',
    loader: () => import('./finance-core-ui')
  },
  'finance-core-ui-alt': {
    title: 'Finance Core - Chart of Accounts',
    loader: () => import('./finance-core-ui-alt')
  },
  'finance-lite-forms': {
    title: 'Finance Lite Forms',
    loader: () => import('./finance-lite-forms')
  },
  'finance-lite-module': {
    title: 'Finance Lite Module',
    loader: () => import('./finance-lite-module')
  },
  'finance-lite-module-2': {
    title: 'Finance Lite - Invoices & Payments',
    loader: () => import('./finance-lite-module-2')
  },
  'finance-lite-part4': {
    title: 'Finance Lite - Collections & Dunning',
    loader: () => import('./finance-lite-part4')
  },
  'fixed-assets-part1': {
    title: 'Fixed Assets - Part 1',
    loader: () => import('./fixed-assets-part1')
  },
  'fixed-assets-part2': {
    title: 'Fixed Assets - Part 2',
    loader: () => import('./fixed-assets-part2')
  },
  'fixed-assets-part3': {
    title: 'Fixed Assets - Part 3',
    loader: () => import('./fixed-assets-part3')
  },
  'fixed-assets-preview': {
    title: 'Fixed Assets Preview',
    loader: () => import('./fixed-assets-preview')
  },
  'pos-retail-part1': {
    title: 'POS Retail - Part 1',
    loader: () => import('./pos-retail-part1')
  },
  'pos-retail-part2': {
    title: 'POS Retail - Part 2',
    loader: () => import('./pos-retail-part2')
  },
  'pos-retail-part3': {
    title: 'POS Retail - Part 3',
    loader: () => import('./pos-retail-part3')
  },
  'pos-retail-part4': {
    title: 'POS Retail - Part 4',
    loader: () => import('./pos-retail-part4')
  },
  'sales-core-part1': {
    title: 'Sales Core - Sales Documents',
    loader: () => import('./sales-core-part1')
  },
  'sales-core-part2': {
    title: 'Sales Core - Pricing & Discounts',
    loader: () => import('./sales-core-part2')
  },
  'sales-core-part3': {
    title: 'Sales Core - Fulfillment & Analytics',
    loader: () => import('./sales-core-part3')
  },
  'sales-core-preview': {
    title: 'Sales Core Preview',
    loader: () => import('./sales-core-preview')
  },
  'tax-compliance-part1': {
    title: 'Tax Compliance - Part 1',
    loader: () => import('./tax-compliance-part1')
  },
  'tax-compliance-part2': {
    title: 'Tax Compliance - Part 2',
    loader: () => import('./tax-compliance-part2')
  },
  'tax-compliance-part3': {
    title: 'Tax Compliance - Part 3',
    loader: () => import('./tax-compliance-part3')
  },
  'tax-compliance-preview': {
    title: 'Tax Compliance Preview',
    loader: () => import('./tax-compliance-preview')
  },
  'integrated-erp-system': {
    title: 'Integrated ERP System',
    description: 'Primary all-in-one ERP experience.',
    loader: () => import('../integrated-erp-system')
  }
};

export const previewList = Object.entries(previewModules).map(([slug, meta]) => ({
  slug,
  ...meta
}));
