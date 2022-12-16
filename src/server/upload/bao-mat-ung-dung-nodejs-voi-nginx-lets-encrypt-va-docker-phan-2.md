**Phần trước**: [Bảo mật ứng dụng NodeJS với Nginx, Let's Encrypt và Docker | Phần 1](https://viblo.asia/p/bao-mat-ung-dung-nodejs-voi-nginx-lets-encrypt-va-docker-phan-1-gDVK29em5Lj)

Vậy là kết thúc phần 1, chúng ta đã cài đặt thành công docker và khởi tạo file docker compose cho project. Chúng ta cùng tiếp tục với phần 2

## Obtaining SSL Certificates and Credentials
Chúng ta cùng bắt đầu với lệnh **docker-compose up**. Lệnh này sẽ tạo và chạy container theo thứ tự mà chúng ta đã chỉ định trong file docker-compose.yml. Nếu tên miền của chúng ta đã được kết nối thành công tới server, chúng ta sẽ nhìn thấy toàn bộ certificates được mount vào trong **/etc/letsencrypt/live** trong container webserver.

Chúng ta cùng tiến hành chạy các server dựa vào câu lệnh **docker-compose up -d**. Với tham số -d, docker sẽ chạy các server dưới chế độ detach.

```bash
> docker-compose up -d
```

Sau khi chạy, chúng ta có thể nhìn thấy output như sau:

```bash
Creating nodejs ... done
Creating webserver ... done
Creating certbot   ... done
```

Sử dụng lệnh **docker ps** để xem status của các server đang chạy:

```bash
> docker ps
```

Nếu chạy thành công, chúng ta sẽ nhìn thấy service nodejs và webserver đang ở trạng thái **Up**, và certbot sẽ ở trạng thái **Exit** với status là 0:

```bash
Name        Command                          State          Ports
------------------------------------------------------------------------
certbot     certbot certonly --webroot ...   Exit 0
nodejs      node app.js                      Up             8080/tcp
webserver   nginx -g daemon off;             Up             0.0.0.0:80->80/tcp
```

Nếu kết quả của bạn không được như vậy, bạn hãy kiểm tra logs với lệnh:

```bash
> docker-compose logs [service_name]
```

Bây giờ chúng ta có thể kiểm tra folder **/etc/letsencrypt/live** trong webserver bằng lệnh sau:

```bash
docker-compose exec webserver ls -la /etc/letsencrypt/live
```

Nếu bạn thấy kết quả như dưới đây, có nghĩa là đã thực hiện thành công:

```bash
total 16
drwx------ 3 root root 4096 Dec 23 16:48 .
drwxr-xr-x 9 root root 4096 Dec 23 16:48 ..
-rw-r--r-- 1 root root  740 Dec 23 16:48 README
drwxr-xr-x 2 root root 4096 Dec 23 16:48 example.com
```

Trong đó **example.com** chính là domain mà bạn đã sử dụng.

Giờ chúng ta hãy cùng xóa tham số **--staging** trong service certbot ở file docker-compose. Chúng ta cùng tiến hành mở file docker-compose với lệnh

```bash
> nano docker-compose.yml
```

Chúng ta cùng tìm đến đoạn định nghĩa service certbot, sau đó thay đổi tham số **--staging** thành tham số **--force-renewal**. Với tham số này, mỗi khi lệnh được chạy, sẽ buộc certbot lấy về certificate mới với domain có sẵn.

Lúc này đoạn định nghĩa service certbot sẽ như sau:

```docker-compose
...
  certbot:
    image: certbot/certbot
    container_name: certbot
    volumes:
      - certbot-etc:/etc/letsencrypt
      - certbot-var:/var/lib/letsencrypt
      - web-root:/var/www/html
    depends_on:
      - webserver
    command: certonly --webroot --webroot-path=/var/www/html --email sammy@example.com --agree-tos --no-eff-email --force-renewal -d example.com -d www.example.com
...
```

Bây giờ, chúng ta sẽ chạy lệnh sau để tiến hành chạy lại service certbot:

```bash
> docker-compose up --force-recreate --no-deps certbot
```

Nếu sau khi chạy mà bạn nhìn thấy kết quả như sau hiện ra thì bạn đã thực hiện thành công:

```bash
certbot      | IMPORTANT NOTES:
certbot      |  - Congratulations! Your certificate and chain have been saved at:
certbot      |    /etc/letsencrypt/live/example.com/fullchain.pem
certbot      |    Your key file has been saved at:
certbot      |    /etc/letsencrypt/live/example.com/privkey.pem
certbot      |    Your cert will expire on 2019-03-26. To obtain a new or tweaked
certbot      |    version of this certificate in the future, simply run certbot
certbot      |    again. To non-interactively renew *all* of your certificates, run
certbot      |    "certbot renew"
certbot      |  - Your account credentials have been saved in your Certbot
certbot      |    configuration directory at /etc/letsencrypt. You should make a
certbot      |    secure backup of this folder now. This configuration directory will
certbot      |    also contain certificates and private keys obtained by Certbot so
certbot      |    making regular backups of this folder is ideal.
certbot      |  - If you like Certbot, please consider supporting our work by:
certbot      |
certbot      |    Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
certbot      |    Donating to EFF:                    https://eff.org/donate-le
certbot      |
certbot exited with code 0
```

Như vậy trong bài viết này, chúng ta đã thực hiện lấy thành công certificate với certbot. Trong bài viết sau chúng ta cùng tiến hành bảo mật webserver với giao thức https. Cảm ơn các bạn đã theo dõi.

**Bài viết tham khảo**: [How To Secure a Containerized Node.js Application with Nginx, Let's Encrypt, and Docker Compose](https://www.digitalocean.com/community/tutorials/how-to-secure-a-containerized-node-js-application-with-nginx-let-s-encrypt-and-docker-compose)