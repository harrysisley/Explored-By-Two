$gtmHead = @"
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-TFSLNG22');</script>
    <!-- End Google Tag Manager -->
"@

$gtmBody = @"
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TFSLNG22"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
"@

$files = @(
    "blog-post-mardigras.html",
    "blog-post-newzealand.html",
    "blog-post-patagonia.html",
    "blog-post-photography.html",
    "blog-post-romania-castles.html",
    "blog-post-vietnam.html"
)

foreach ($file in $files) {
    $filePath = Join-Path "c:\Users\Student\EB2\Explored-By-Two" $file
    
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        
        # Check if GTM is already added
        if ($content -notmatch "Google Tag Manager") {
            # Add GTM to head (after <head>)
            $content = $content -replace '(<head>\r?\n)', "`$1$gtmHead`r`n"
            
            # Add GTM noscript to body (after <body>)
            $content = $content -replace '(<body>\r?\n)', "`$1$gtmBody`r`n"
            
            # Save the file
            Set-Content -Path $filePath -Value $content -NoNewline
            Write-Host "Added GTM to $file" -ForegroundColor Green
        } else {
            Write-Host "GTM already exists in $file" -ForegroundColor Yellow
        }
    } else {
        Write-Host "File not found: $file" -ForegroundColor Red
    }
}

Write-Host "`nDone! GTM added to all blog post files." -ForegroundColor Cyan
