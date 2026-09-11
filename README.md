# WTF — Way To First World Country

WTF is a civic issue reporting platform for Kakinada, Andhra Pradesh.

## Current milestone: Citizen MVP foundation

The public site is responsive and uses real React Router navigation. Citizens can register or sign in with Firebase Email/Password, fill out a report form, attach an image, add a location, submit a Firestore/Storage-backed report, receive a reference ID, and look up reports from their own account. The map page deliberately shows no markers until real map integration and report-location display are built.

The protected `/admin` foundation remains separate and uses a Firebase `admin: true` custom claim.

## Run locally

1. Install Node.js LTS.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and fill in all Firebase values.
4. In Firebase Console, enable **Email/Password**, create Firestore and Storage, and deploy `firestore.rules` and `storage.rules`.
5. Run `npm run dev`.

Run `npm run lint` and `npm run build` before shipping.

## Required environment variables

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

`VITE_GOOGLE_MAPS_API_KEY` is reserved for the future map milestone. Never commit `.env`, credentials, or Firebase Admin SDK service-account data.

## Routes

- `/` — citizen home
- `/report` — authenticated Firestore/Storage-backed issue report
- `/track` — authenticated report lookup by reference ID
- `/map` — responsive, intentionally empty map state
- `/login` — sign in and registration
- `/admin` — protected administrator dashboard

## Security notes

Citizen reports are readable only by their submitting user or an administrator. Citizens can create reports but cannot alter them after submission; report updates are reserved for the `admin: true` custom claim. Uploaded evidence is stored under the submitting user’s Storage path with image-type and size restrictions.

The browser does not infer administrators from an email address. Assign `admin: true` only with Firebase Admin SDK in a trusted backend, then refresh the user’s token.

## Known limitations

- Firebase rules are included but must be deployed to the selected Firebase project.
- Photo upload can leave an orphaned Storage object if the Firestore batch fails; production hardening should clean it up through a trusted backend.
- Google Maps, public map markers, password reset, admin issue management, and notifications are future milestones.

See [docs/PROJECT_STATE.md](docs/PROJECT_STATE.md) for the detailed handoff state.
