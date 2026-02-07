# Start React Native (Expo) frontend
# Run from repo root: .\start-frontend.ps1

$frontendDir = Join-Path $PSScriptRoot "frontend"
if (-not (Test-Path $frontendDir)) {
    Write-Error "Frontend folder not found: $frontendDir"
    exit 1
}

Set-Location $frontendDir

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..."
    npm install
}

Write-Host "Starting Expo dev server..."
npx expo start
