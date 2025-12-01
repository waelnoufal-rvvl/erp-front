import React from 'react';

export interface PreviewDefinition {
  title: string;
  description?: string;
  loader: () => Promise<{ default: React.ComponentType<any> }>;
}

export const previewModules: Record<string, PreviewDefinition> = {
  'erp-dashboard-shell': {
    title: 'Dashboard Preview',
    description: 'Standalone dashboard shell for quick KPI exploration.',
    loader: () => import('./erp/erp-dashboard-shell')
  },
  'integrated-erp-system': {
    title: 'Main ERP Preview',
    description: 'Full workspace shell; use the sidebar to browse finance, sales, POS, e-commerce, and CRM modules.',
    loader: () => import('../workspace/integrated-erp-system')
  }
};

export const previewList = Object.entries(previewModules).map(([slug, meta]) => ({
  slug,
  ...meta
}));
