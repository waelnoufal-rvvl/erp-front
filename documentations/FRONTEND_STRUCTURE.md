# Frontend structure

- `src/ui/previews`: All preview UIs live here, grouped by domain folders (`erp`, `finance`, `sales`, `pos`, `tax`, `fixed-assets`). Add new preview screens in these folders and register them in `src/ui/previews/registry.ts`.
- `src/ui/workspace`: The main ERP workspace shell (`integrated-erp-system.tsx`) that stitches every module together.
- `src/app/previews/page.tsx`: Lists available previews from the registry.
- `src/app/previews/[slug]/page.tsx`: Dynamic route that loads the preview component from the registry (no individual wrapper files).
- `src/app/page.tsx`: Entry point that renders the workspace shell from `src/ui/workspace`.

Notes
- Removed the duplicate `finance-core-ui (1).tsx` preview file with the stray space in the filename.
- Registry-driven preview loading continues through `src/ui/previews/registry.ts` (used by `src/app/previews/page.tsx` and `[slug]/page.tsx`).
