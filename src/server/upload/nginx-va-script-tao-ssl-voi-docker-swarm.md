# 1. Giới thiệu.
Như bài trước mình đã dựng 1 cụm docker swarm và build BE + FE.
Bây giờ chúng ta chỉ còn thiếu cấu hình nginx và ssl certificate.
Bài này mình sẽ viết scripts để tạo file cấu hình nginx và tạo ssl cho domain.
# 2. Bắt đầu thôi nào.

## 2.1 Tạo script để tạo file cấu hình nginx và ssl certificate.
Mình có 3 file script như sau:
**create_domain.sh**: Tạo file cấu hình nginx và ssl cho 1 domain mới.

**create_ssl.sh**: Tạo ssl cho 1 domain mới.

**renew_domain_certificate.sh**: Gia hạn ssl cho 1 domain sắp hết hạn.

Các bạn tạo 3 file script này băng lệnh *vi*. 
Sau đó cấp quyền thực thi cho 3 script này.

*chmod +x tên script.*
![image.png](https://images.viblo.asia/c6bfbac4-2ece-4e76-b536-cc10e02819ea.png)
```
#!/bin/bash
DOMAIN=$1
PORT=$2
if [[ "$DOMAIN" == "" || "$PORT" == "" ]]; then
echo "Not enough params. Usage: $0 <domain> <backend_port>"
exit 1
fi

echo "Getting domain's SSL certificate..."
sudo docker run -it --rm --name certbot \
            -v "/mnt/data/ceph/letsencrypt/etc/:/etc/letsencrypt/" \
            -v "/mnt/data/ceph/letsencrypt/lib/:/var/lib/letsencrypt" \
            -v "/mnt/data/ceph/letsencrypt/data/:/data/letsencrypt/" \
            certbot/certbot \
            certonly \
                --agree-tos -m info@vietinterview.com \
                --webroot -w /data/letsencrypt/ -d $DOMAIN


echo "Creating nginx config file..."
FILE="/mnt/data/ceph/nginx/etc/conf.d/$DOMAIN.conf"
cat > $FILE <<- EOM
server {
    listen       443 ssl http2;
    server_name  $DOMAIN;
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;

    ssl_session_timeout 5m;

    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers "HIGH:!aNULL:!MD5 or HIGH:!aNULL:!MD5:!3DES";
    ssl_prefer_server_ciphers on;
    client_max_body_size    0;
    location / {
        proxy_pass http://localhost:$PORT;
        include proxy_params;
    }

}
EOM
echo "Restarting nginx service..."
docker service update --force nginx_proxy_nginx
```

![image.png](https://images.viblo.asia/c5668130-6e72-4b70-bc45-47ea73ac4a5c.png)
```
#!/bin/bash
DOMAIN=$1
if [[ "$DOMAIN" == "" ]]; then
echo "Not enough params. Usage: $0 <domain>"
exit 1
fi

echo "Getting domain's SSL certificate..."
sudo docker run -it --rm --name certbot \
            -v "/mnt/data/ceph/letsencrypt/etc/:/etc/letsencrypt/" \
            -v "/mnt/data/ceph/letsencrypt/lib/:/var/lib/letsencrypt" \
            -v "/mnt/data/ceph/letsencrypt/data/:/data/letsencrypt/" \
            certbot/certbot \
            certonly \
                --agree-tos -m info@vietinterview.com \
                --webroot -w /data/letsencrypt/ -d $DOMAIN


echo "Done..."
```
![image.png](https://images.viblo.asia/d0ff9714-58a0-4b08-82b8-a34a72376ff0.png)
```
#!/bin/bash
echo "Renewing certificates..."
sudo docker run -it --rm --name certbot \
            -v "/mnt/data/ceph/letsencrypt/etc/:/etc/letsencrypt/" \
            -v "/mnt/data/ceph/letsencrypt/lib/:/var/lib/letsencrypt" \
            -v "/mnt/data/ceph/letsencrypt/data/:/data/letsencrypt/" \
            certbot/certbot \
            renew
echo "Restarting nginx service..."
docker service update --force nginx_proxy_nginx
```

Tùy vào nhu cầu sử dụng mà các bạn chạy script nào cho hợp lý.
File cấu hình có tất cả trên các server trong cụm swarm do thư mục **/mnt/data** mình đã đồng bộ dữ liệu bằng glusterfs từ bài trước. 

Cấu hình nginx sẽ được tạo ở thư mục: **/mnt/data/ceph/nginx/etc/conf.d**.

Cấu hình ssl sẽ được tạo ở: **/mnt/data/ceph/letsencrypt**.

## 2.2 Sửa lại file cấu hình nginx cho phù hợp.
Do ở đây mình build cả Front end và backend trên cùng cụm swarm nên cần sửa lại file cấu hình nginx cho phù hợp.
Cấu hình nginx của Backend thì mình sửa như sau.
```
server {
    listen       443 ssl http2;
    server_name  domainBackend;
    ssl_certificate /etc/letsencrypt/live/domainBackend/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/domainBackend/privkey.pem;

    ssl_session_timeout 5m;

    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers "HIGH:!aNULL:!MD5 or HIGH:!aNULL:!MD5:!3DES";
    ssl_prefer_server_ciphers on;
    client_max_body_size    0;
    location / {
        proxy_pass http://localhost:backendPort;
        include proxy_params;
    }

}

```
Trong đó **domainBackend** là domain đã mua dùng cho backend, **backendPort** là port container chạy backend.

Cấu hình nginx của Frontend thì mình sửa như sau.
```
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name  daotaoyte.edu.vn www.daotaoyte.edu.vn;
    ssl_certificate /etc/letsencrypt/live/daotaoyte.edu.vn/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/daotaoyte.edu.vn/privkey.pem;

    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    #ssl_ciphers "HIGH:!aNULL:!MD5 or HIGH:!aNULL:!MD5:!3DES";
    ssl_prefer_server_ciphers on;
    charset utf-8;
    root /www/daotaoyte.edu.vn;	

    location / {
                try_files $uri $uri/home.html home.html;
        }
}
```
Đây chính là domain *daotaoyte.edu.vn* mà mình đã tạo từ bài trước.
Thư mục **daotaoyte.edu.vn** là thư mục được build từ Frontend và đưa vào thư mục **/mnt/data/www**.

# 3. Tổng kết.
Qua đây thì mình đã tạo xong file cấu hình nginx và ssl cho cụm docker swarm.
Các bạn có thể chạy cả backend và frontend trên cùng 1 cụm docker để tiết kiệm chi phí.
Cảm ơn các bạn.