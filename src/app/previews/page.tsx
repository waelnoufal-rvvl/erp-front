import Link from 'next/link';
import { previewList } from '@/modules/previews/registry';

export default function PreviewsIndexPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          UI Previews
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          ERP Experience Gallery
        </h1>
        <p className="text-slate-600">
          Browse the generated module previews and dashboards from the Claude artifacts. Click any card to open it in isolation.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {previewList.map((preview) => (
          <Link
            key={preview.slug}
            href={`/previews/${preview.slug}`}
            className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-blue-600">{preview.title}</p>
                <p className="text-base font-semibold text-slate-900">
                  {preview.slug}
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                View
              </span>
            </div>
            {preview.description ? (
              <p className="mt-3 text-sm text-slate-600">{preview.description}</p>
            ) : (
              <p className="mt-3 text-sm text-slate-500">Preview snapshot</p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
