import dynamic from 'next/dynamic';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { previewModules } from '@/ui/previews/registry';

interface PreviewPageProps {
  params: { slug: string };
}

export default function PreviewPage({ params }: PreviewPageProps) {
  const preview = previewModules[params.slug];

  if (!preview) {
    redirect('/previews/integrated-erp-system');
  }

  const PreviewComponent = dynamic(preview.loader, {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center py-12 text-slate-600">
        Loading {preview.title}...
      </div>
    )
  });

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8">
      <header className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Preview
          </p>
          <h1 className="text-2xl font-bold text-slate-900">{preview.title}</h1>
          <p className="text-sm text-slate-600">{preview.description ?? 'Preview snapshot from the Claude artifacts.'}</p>
        </div>
        <Link
          href="/previews"
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow"
        >
          Back to list
        </Link>
      </header>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <PreviewComponent />
      </div>
    </main>
  );
}
