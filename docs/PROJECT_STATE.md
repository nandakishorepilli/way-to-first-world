# Project state

## Current milestone

WTF v0.3.0: protected admin issue management. Citizens can submit and track reports; authorized administrators can review report details and update the workflow status.

## Completed

- Public routes `/`, `/report`, `/track`, `/map`, and `/login` use React Router links; no public admin link is present.
- `MainLayout` now owns the responsive desktop/mobile navigation and footer. The mobile menu is keyboard-accessible and closes after navigation.
- The home page communicates the real current workflow instead of fabricated statistics, testimonials, AI detection, notifications, or rewards.
- Firebase Email/Password sign-in and registration share `AuthProvider`; registration validates name, email, six-character password, and password confirmation.
- Authenticated citizens can submit a report with category, description, optional image, manual location or browser geolocation, optional details, and a generated reference ID.
- Reports are stored in Firestore and evidence in Firebase Storage when Firebase is configured and the supplied rules are deployed.
- Tracking looks up a reference ID only within the signed-in citizen’s reports and displays the stored status timeline.
- The map page is an honest responsive empty state until Google Maps and real markers are implemented.
- `/admin` still requires Firebase authentication plus the trusted `admin: true` custom claim.
- The protected admin dashboard lists Firestore reports, exposes their details, and lets an authorized administrator update only the supported workflow statuses: submitted, under review, assigned, in progress, and resolved.

## Architecture

- `src/components/citizen/PublicNav.jsx` and `PublicFooter.jsx` are shared public UI.
- `src/context/AuthContext.jsx` owns Firebase session restoration, sign-in, registration, and logout.
- `src/services/firebase/auth.js` provides one Firebase app plus Auth, Firestore, and Storage accessors.
- `src/services/firebase/reports.js` contains report create and reference lookup operations.
- `src/routes/AdminRoute.jsx` remains the reusable custom-claim guard for all future admin routes.

## Data and security decisions

Reports use `reports/{reportId}` and include `referenceId`, `userId`, category, location, status, optional image URL, and server timestamps. `reportReferences/{referenceId}` maps an owner-safe reference ID to the report document. Firestore rules permit citizens to create/read only their own reports and only custom-claim administrators to read them or change `status` and `updatedAt`; no report deletion is allowed. Storage is not enabled on the Spark plan, so photo uploads are unavailable.

Firebase configuration is exclusively from `.env` Vite variables. Email/Password must be enabled; Firestore, Storage, and the included rules must be deployed. No local `.env` was present during this session, so live Firebase submission/authentication was not exercised.

## Current routes

- Public: `/`, `/report`, `/track`, `/map`, `/login`
- Protected administrator: `/admin`

## Known limitations

- The existing photo form control is not usable until Firebase Storage is enabled; do not enable billing solely for it.
- Map integration, public marker display, password reset, report editing, notifications, assignments, and analytics are not implemented.
- The local automation environment had no browser surface, so visual browser checks at target widths could not be executed here; lint and production build passed.

## Exact next recommended task

Deploy the updated Firestore rules, assign `admin: true` to the intended Firebase Auth user through a trusted Admin SDK environment, then test an admin status update and citizen tracking against the configured project.

## Recently changed files

- `src/components/citizen/PublicNav.jsx`, `src/components/citizen/PublicFooter.jsx`
- `src/layouts/MainLayout.jsx`, `src/pages/shared/HomePage.jsx`, `src/pages/shared/LoginPage.jsx`
- `src/pages/citizen/ReportPage.jsx`, `TrackPage.jsx`, `MapPage.jsx`
- `src/context/AuthContext.jsx`, `src/services/firebase/auth.js`, `src/services/firebase/reports.js`
- `src/pages/admin/AdminDashboardPage.jsx`, `src/constants/status.js`, `firestore.rules`
- `firestore.rules`, `storage.rules`, `README.md`
