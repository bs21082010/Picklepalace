# ============================================================
#  SVJ Pickles — one-click update script
#  After editing in editor.html, double-click this file.
#  It publishes the website, rebuilds the Android app, and backs
#  everything up on GitHub.
# ============================================================
$ErrorActionPreference = "Stop"

$root = "C:\Users\amin\maakehatonkaacchar"
$dl = "$env:USERPROFILE\Downloads"
$srcFiles = @("index.html", "styles.css", "script.js", "languages.js", "products.js", "site-config.js")
$jsFiles = @("script.js", "languages.js", "products.js", "site-config.js")

Write-Host ""
Write-Host "===== SVJ Pickles update =====" -ForegroundColor Green

# 1) Apply files downloaded by editor.html (only if newer than current)
foreach ($f in @("site-config.js", "products.js", "languages.js")) {
  $new = Join-Path $dl $f
  $cur = Join-Path $root $f
  if (Test-Path $new) {
    if (-not (Test-Path $cur) -or (Get-Item $new).LastWriteTime -gt (Get-Item $cur).LastWriteTime) {
      Copy-Item $new $cur -Force
      Remove-Item $new -Force
      Write-Host "  Applied $f (from Downloads)" -ForegroundColor Yellow
    } else {
      Write-Host "  Skipped $f (Downloaded copy is older than current)" -ForegroundColor DarkGray
      Remove-Item $new -Force
    }
  }
}

# 2) Validate all JavaScript
Write-Host "Validating JavaScript..."
foreach ($f in $jsFiles) {
  node --check (Join-Path $root $f) 2>$null
  if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: syntax problem in $f — update stopped." -ForegroundColor Red
    exit 1
  }
}
Write-Host "  All files OK" -ForegroundColor Green

# 3) Sync Android app files
foreach ($f in $srcFiles) {
  Copy-Item (Join-Path $root $f) -Destination (Join-Path $root "android\app\src\main\assets\www") -Force
}
Write-Host "Android app files synced"

# 4) Publish website
Write-Host "Publishing website..."
Push-Location $root
try {
  vercel deploy --prod --yes --name maa-achaar | Select-Object -Last 1
} finally {
  Pop-Location
}
Write-Host "  Website live" -ForegroundColor Green

# 5) Rebuild Android APK
Write-Host "Building Android APK (about 1 minute)..."
$env:ANDROID_HOME = "C:\Users\amin\AppData\Local\Android\Sdk"
$gradleDir = Get-ChildItem "C:\Users\amin\.gradle\wrapper\dists\gradle-8.14.3-all" -Directory -ErrorAction SilentlyContinue | Select-Object -First 1
if ($gradleDir) {
  $gradleBat = Join-Path $gradleDir.FullName "gradle-8.14.3\bin\gradle.bat"
  Push-Location (Join-Path $root "android")
  try {
    & $gradleBat assembleRelease --console=plain 2>&1 | Select-Object -Last 2
  } finally {
    Pop-Location
  }
  $apk = Join-Path $root "android\app\build\outputs\apk\release\app-release.apk"
  if (Test-Path $apk) {
    Copy-Item $apk -Destination (Join-Path $root "releases\MaaKeHatonKaAcchar-latest.apk") -Force
    Write-Host "  APK ready: releases\MaaKeHatonKaAcchar-latest.apk" -ForegroundColor Green
  } else {
    Write-Host "  APK build failed — check Gradle output above." -ForegroundColor Red
  }
} else {
  Write-Host "  Gradle not found — skipping APK build (website still updated)." -ForegroundColor Yellow
}

# 6) Backup on GitHub
Push-Location $root
try {
  git add -A
  if (git status --porcelain | Select-Object -First 1) {
    git -c user.name="bs21082010" -c user.email="bs21082010@users.noreply.github.com" commit -m "Site update via editor" 2>&1 | Select-Object -First 1
    git push origin main 2>&1 | Select-Object -Last 1
  } else {
    Write-Host "  No changes to back up" -ForegroundColor DarkGray
  }
} finally {
  Pop-Location
}

Write-Host ""
Write-Host "===== Done! Everything is updated. =====" -ForegroundColor Green
Read-Host "Press Enter to close"
