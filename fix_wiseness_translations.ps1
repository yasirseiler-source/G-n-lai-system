$file = "C:\Users\hayat\OneDrive\Documents\WiseDynamics\wiseness Web code\src\i18n\translations.js"
$c = [System.IO.File]::ReadAllText($file, [System.Text.UTF8Encoding]::new($false))

# Simply replace 'WISENESS' heroTitle with CEO slogan (heroTitle is the one rendered in h1 in wiseness Web code)
# Keep heroHeadline as-is but update heroTitle to be the slogan
# TR
$c = $c.Replace("      heroTitle:     'WISENESS',", "      heroTitle:     'Suerecler net sekilde yoenetilir.',")

[System.IO.File]::WriteAllText($file, $c, [System.Text.UTF8Encoding]::new($false))
Write-Host "Done"
