# Social Media App

React Native (Expo) frontend and Flask backend with SQLite. Auth flow: Login/Register → Home.

## Structure

- **backend/** – Flask API (auth, SQLite)
- **frontend/** – React Native (Expo) app

## Quick start

From the **repo root** (this folder):

1. **Start backend** (creates venv and runs Flask on http://localhost:5000):
   ```powershell
   .\start-backend.ps1
   ```

2. **Start frontend** (installs deps and runs Expo):
   ```powershell
   .\start-frontend.ps1
   ```

Use two terminals so both run at once. In Expo, press `a` for Android or `i` for iOS simulator, or scan the QR code with Expo Go.

## Backend (Flask)

- **Port:** 5000
- **Endpoints:** `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` (Bearer token)
- **DB:** SQLite at `backend/instance/social_media.db` (created on first run)

Manual run:

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python run.py
```

## Frontend (React Native)

- Login and Register screens; JWT stored in AsyncStorage.
- After login, app shows Home screen with user info and Sign out.
- API base URL: `http://localhost:5000` (iOS simulator); use `http://10.0.2.2:5000` for Android emulator (configured in `frontend/src/config/api.js`).

Manual run:

```powershell
cd frontend
npm install
npx expo start
```

## Auth flow

1. Open app → Login (or Register).
2. On success, JWT is saved and app navigates to Home.
3. On next launch, token is read and user stays logged in until Sign out.
