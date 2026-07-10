Write-Host "Запуск деплоя на сервер agisi.ru..." -ForegroundColor Cyan

# 1. Загрузка файлов по SCP
scp -o StrictHostKeyChecking=no -i C:\Users\3300v\.ssh\id_ed25519_server -r public_html root@166.1.62.19:/var/www/agisi.ru/

# 2. Исправление прав доступа на сервере
ssh -o StrictHostKeyChecking=no -i C:\Users\3300v\.ssh\id_ed25519_server root@166.1.62.19 "chmod 755 /var/www/agisi.ru/public_html; find /var/www/agisi.ru/public_html -type d -exec chmod 755 {} \;; find /var/www/agisi.ru/public_html -type f -exec chmod 644 {} \;"

Write-Host "Деплой успешно завершен! Сайт доступен в сети." -ForegroundColor Green
