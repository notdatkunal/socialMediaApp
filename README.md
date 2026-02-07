# Social Media App

React Native (Expo) frontend and Flask backend with SQLite and JWT auth.

## Project layout

- **`backend/`** – Flask API (SQLite, JWT auth: register, login, `/api/users/me`)
- **`frontend/`** – React Native (Expo) app with login → register → home flow

## Quick start

1. **Backend** (from repo root):
   ```powershell
   .\start-backend.ps1
   ```
   API: http://localhost:5000

2. **Frontend** (from repo root, in another terminal):
   ```powershell
   .\start-frontend.ps1
   ```
   Then scan QR with Expo Go, or press `a` for Android / `i` for iOS simulator.

## Auth flow

- **Login** – Email + password → JWT stored in AsyncStorage → navigate to Home.
- **Register** – Email, username, password → same as login after success.
- **Home** – Shows current user; **Sign out** clears token and returns to Login.

On app launch, if a stored token exists, the app opens on Home; otherwise on Login.
