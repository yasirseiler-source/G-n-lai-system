$src = "C:\Users\hayat\OneDrive\Documents\WiseDynamics\Wiseness Dashboard\Wise dynamics Dashboard Web Code"
$dst = "C:\Users\hayat\OneDrive\Documents\WiseDynamics\Wiseness Dashboard\Dashboard\Wise dynamics Dashboard Web Code Alt 15,04"

# Ensure target common directory exists
New-Item -ItemType Directory -Force "$dst\src\components\common" | Out-Null

Copy-Item "$src\src\i18n\translations.js" "$dst\src\i18n\translations.js" -Force
Copy-Item "$src\src\components\landing\LandingPage.jsx" "$dst\src\components\landing\LandingPage.jsx" -Force
Copy-Item "$src\src\components\landing\LandingPage.module.css" "$dst\src\components\landing\LandingPage.module.css" -Force
Copy-Item "$src\src\components\common\FounderQuote.jsx" "$dst\src\components\common\FounderQuote.jsx" -Force
Copy-Item "$src\src\components\common\FounderQuote.module.css" "$dst\src\components\common\FounderQuote.module.css" -Force

Write-Host "Files copied successfully"
