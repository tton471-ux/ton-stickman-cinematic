$ErrorActionPreference = "Stop"
$installer = Get-ChildItem "$PSScriptRoot/../dist" -Filter "*.exe" | Where-Object { $_.Name -notmatch "uninstaller" } | Select-Object -First 1
if (-not $installer) { throw "Windows installer artifact was not produced" }
Start-Process -FilePath $installer.FullName -ArgumentList "/S" -Wait
$appPath = Join-Path $env:ProgramFiles "TON Stickman Cinematic/TON Stickman Cinematic.exe"
if (-not (Test-Path $appPath)) { throw "Installed desktop executable not found at $appPath" }
$app = Start-Process -FilePath $appPath -PassThru
try {
  $ready = $false
  for ($i=0; $i -lt 60; $i++) {
    try { $health = Invoke-RestMethod "http://127.0.0.1:4177/api/health" -TimeoutSec 2; if ($health.ok) { $ready=$true; break } } catch {}
    Start-Sleep -Milliseconds 500
  }
  if (-not $ready) { throw "Installed Studio API did not start" }
  $body = @{command="doctor"} | ConvertTo-Json -Compress
  $job = Invoke-RestMethod -Method Post -Uri "http://127.0.0.1:4177/api/jobs" -ContentType "application/json" -Body $body
  $result = $null
  for ($i=0; $i -lt 120; $i++) {
    Start-Sleep -Milliseconds 500
    $result = Invoke-RestMethod "http://127.0.0.1:4177/api/jobs/$($job.id)"
    if ($result.status -ne "running") { break }
  }
  if ($result.status -ne "succeeded") { throw "Runtime doctor failed: $($result.stderr) $($result.stdout)" }
  $checks = $result.stdout | ConvertFrom-Json
  $failed = $checks.checks.PSObject.Properties | Where-Object { -not $_.Value }
  if ($failed) { throw "Runtime doctor reported failed checks: $($failed.Name -join ', ')" }
  Write-Host "Installed app smoke test passed; bundled runtime, fonts, canvas, Sharp and FFmpeg are available."
} finally {
  if ($app -and -not $app.HasExited) { Stop-Process -Id $app.Id -Force }
}
