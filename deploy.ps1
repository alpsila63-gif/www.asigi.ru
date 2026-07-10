Write-Host "Deploying files to agisi.ru..." -ForegroundColor Cyan

# 1. Upload files via SCP
scp -o StrictHostKeyChecking=no -i C:\Users\3300v\.ssh\id_ed25519_server -r public_html root@166.1.62.19:/var/www/agisi.ru/

# 2. Fix permissions on server
ssh -o StrictHostKeyChecking=no -i C:\Users\3300v\.ssh\id_ed25519_server root@166.1.62.19 "chmod 755 /var/www/agisi.ru/public_html; find /var/www/agisi.ru/public_html -type d -exec chmod 755 {} \;; find /var/www/agisi.ru/public_html -type f -exec chmod 644 {} \;"

Write-Host "Deployment completed successfully! Website is live." -ForegroundColor Green
