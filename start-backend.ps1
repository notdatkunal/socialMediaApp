# Start Flask backend (Social Media API)
# Run from repo root: .\start-backend.ps1

$BackendDir = Join-Path $PSScriptRoot "backend"
Set-Location $BackendDir

if (-not (Test-Path "venv")) {
    Write-Host "Creating virtual environment..."
    python -m venv venv
}
& "$BackendDir\venv\Scripts\Activate.ps1"
if (-not $?) {
    Write-Host "Trying alternative activation..."
    & "$BackendDir\venv\Scripts\activate"
}

Write-Host "Installing dependencies if needed..."
pip install -q -r requirements.txt

Write-Host "Starting Flask server at http://localhost:5000"
python run.py
