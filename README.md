# WTF — Way To First World Country

Civic issue reporting platform. First city: Kakinada, Andhra Pradesh, India.

## Milestone 1 status: Project Scaffolding ✅

This is the project skeleton — folder structure, routing, styling system, and
constants. No real features (auth, reporting, maps) are built yet. Every page
you see is a labeled stub.

## Getting started

1. Install [Node.js](https://nodejs.org/) (LTS version) if you don't have it.
2. Open a terminal in this folder and install dependencies:
   ```
   npm install
   ```
3. Start the dev server:
   ```
   npm run dev
   ```
4. Open the URL it prints (usually `http://localhost:5173`).

You should see a bare "Welcome to WTF" page with a navbar and footer. Try
visiting `/map`, `/report`, `/track`, `/login`, and `/admin` — each shows a
placeholder page confirming routing works.

## Environment variables

Copy `.env.example` to `.env` and fill in your Firebase + Google Maps keys
once you create those accounts (covered in a later milestone).

## Folder structure

```
src/
  components/   Reusable UI pieces (buttons, cards, forms)
    common/       Shared across citizen + admin
    citizen/      Citizen-only components
    admin/        Admin-only components
  pages/        One file per route/screen
    citizen/      Report, Map, Track pages
    admin/        Admin dashboard pages
    shared/       Home, Login, 404
  layouts/      Page wrappers (navbar+footer, admin sidebar)
  routes/       (reserved for route-guard logic, added later)
  hooks/        Custom React hooks (reusable logic)
  context/      App-wide state (e.g. logged-in user)
  services/
    firebase/     Firebase setup + calls
    api/           Any non-Firebase API calls
  constants/     Single-source-of-truth lists (categories, statuses)
  utils/         Small helper functions
  assets/        Images, icons
```

## Common mistakes to avoid

- **Don't hardcode categories or statuses** in new components — always
  import from `src/constants/categories.js` and `src/constants/status.js`.
- **Don't commit `.env`** — it will contain secret keys once filled in.
- **`npm install` before `npm run dev`** — the dev server needs
  `node_modules/` to exist first.

## Next milestone

Citizen authentication (register/login) with Firebase Authentication.
