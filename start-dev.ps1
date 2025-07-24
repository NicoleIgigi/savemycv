Write-Host "Setting up Node.js environment..." -ForegroundColor Green
$env:PATH += ";C:\Program Files\nodejs"

Write-Host ""
Write-Host "Node.js version:" -ForegroundColor Yellow
node --version

Write-Host ""
Write-Host "NPM version:" -ForegroundColor Yellow
npm --version

Write-Host ""
Write-Host "Starting development server..." -ForegroundColor Green
npm run dev 