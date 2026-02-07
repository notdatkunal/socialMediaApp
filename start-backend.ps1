# Start Flask backend (social media API)
# Run from repo root: .\start-backend.ps1

$backendDir = Join-Path $PSScriptRoot "backend"
if (-not (Test-Path $backendDir)) {
    Write-Error "Backend folder not found: $backendDir"
    exit 1
}

Set-Location $backendDir

$venvPath = Join-Path $backendDir "venv"
if (-not (Test-Path $venvPath)) {
    Write-Host "Creating virtual environment..."
    python -m venv venv
}
& (Join-Path $venvPath "Scripts\Activate.ps1")

Write-Host "Installing dependencies..."
pip install -r requirements.txt -q

Write-Host "Starting Flask server on http://localhost:5000"
python run.py
