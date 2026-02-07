# Start React Native (Expo) frontend
# Run from repo root: .\start-frontend.ps1
# Ensure backend is running first for auth.

$FrontendDir = Join-Path $PSScriptRoot "frontend"
Set-Location $FrontendDir

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..."
    npm install
}

Write-Host "Starting Expo (React Native)..."
npm start
