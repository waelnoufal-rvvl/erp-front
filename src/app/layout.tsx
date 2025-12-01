import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SAP B1 ERP Platform',
  description: 'Integrated ERP dashboards and previews for SAP Business One.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
