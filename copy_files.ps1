$src = "C:\Users\hayat\OneDrive\Documents\WiseDynamics\Wiseness Dashboard\Wise dynamics Dashboard Web Code"
$dst = "C:\Users\hayat\OneDrive\Documents\WiseDynamics\Wiseness Dashboard\Dashboard\Wise dynamics Dashboard Web Code Alt 15,04"
$live = "C:\Users\hayat\OneDrive\Documents\WiseDynamics\wiseness Web code"

# Ensure target directories exist
New-Item -ItemType Directory -Force "$dst\src\components\common" | Out-Null

# Copy to backup
Copy-Item "$src\src\i18n\translations.js" "$dst\src\i18n\translations.js" -Force
Copy-Item "$src\src\components\landing\LandingPage.jsx" "$dst\src\components\landing\LandingPage.jsx" -Force
Copy-Item "$src\src\components\landing\LandingPage.module.css" "$dst\src\components\landing\LandingPage.module.css" -Force
Copy-Item "$src\src\components\common\FounderQuote.jsx" "$dst\src\components\common\FounderQuote.jsx" -Force
Copy-Item "$src\src\components\common\FounderQuote.module.css" "$dst\src\components\common\FounderQuote.module.css" -Force

Write-Host "Files copied to backup successfully"

# Fix wiseness Web code translations.js: heroTitle must be CEO slogan (their LandingPage uses heroTitle in <h1>)
$liveTranslations = "$live\src\i18n\translations.js"
if (Test-Path $liveTranslations) {
    $c = [System.IO.File]::ReadAllText($liveTranslations, [System.Text.UTF8Encoding]::new($false))
    # Replace heroTitle 'WISENESS' with CEO slogan in all 3 language blocks
    # TR
    $c = $c.Replace("      heroTitle:     'WISENESS',`r`n      heroHeadline:  'Süreçler net şekilde yönetilir.`nKararlar bilgece alınır.',", "      heroTitle:     'Süreçler net şekilde yönetilir.`r`nKararlar bilgece alınır.',")
    # DE
    $c = $c.Replace("      heroTitle:     'WISENESS',`r`n      heroHeadline:  'Abläufe werden klar geführt.`nEntscheidungen werden weise getroffen.',", "      heroTitle:     'Abläufe werden klar geführt.`r`nEntscheidungen werden weise getroffen.',")
    # EN
    $c = $c.Replace("      heroTitle:     'WISENESS',`r`n      heroHeadline:  'Processes are clearly managed.`nDecisions are made wisely.',", "      heroTitle:     'Processes are clearly managed.`r`nDecisions are made wisely.',")
    [System.IO.File]::WriteAllText($liveTranslations, $c, [System.Text.UTF8Encoding]::new($false))
    Write-Host "wiseness Web code translations.js fixed"
}
