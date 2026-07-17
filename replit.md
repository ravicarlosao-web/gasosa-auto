# Gasosa AutoAgro — floema-site

## Project overview
Corporate website for **Gasosa AutoAgro**, an Angolan company operating in the automotive and agricultural sectors. Built as a React + Vite single-page application with Tailwind CSS, Framer Motion animations, and i18n support (Portuguese / English).

The monorepo also includes an Express API server (`artifacts/api-server`) and a mockup sandbox (`artifacts/mockup-sandbox`), though only the frontend site runs by default.

## Stack
- **Frontend**: React 18, Vite, Tailwind CSS v4, Framer Motion, Wouter (routing), TanStack Query
- **UI components**: Radix UI + shadcn/ui (`artifacts/floema-site/src/components/ui/`)
- **Package manager**: pnpm (workspace monorepo)
- **API server**: Express 5, Drizzle ORM (not running by default)

## Running the app
The workflow `Start application` runs the frontend on port 5000:
```
PORT=5000 BASE_PATH=/ pnpm --filter @workspace/floema-site run dev
```

## Key directories
| Path | Description |
|---|---|
| `artifacts/floema-site/src/` | Main React app source |
| `artifacts/floema-site/src/components/` | UI components (layout, sections, ui) |
| `artifacts/floema-site/src/pages/` (under `libpages/`) | Route pages |
| `artifacts/floema-site/src/data/` | Static content / data files |
| `artifacts/floema-site/src/i18n.tsx` | Internationalisation context |
| `artifacts/api-server/src/` | Express API server |
| `attached_assets/` | Brand images and design references |

## User preferences
<!-- Agent: record confirmed user preferences here -->
