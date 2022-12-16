# 1. Yêu cầu bài toán
+ Https: Bảo mật đường truyền -> CloudFlare 
+ Bảo vệ trang web -> CloudFlare 
+ Thống kê, báo cáo -> CloudFlare 
+ Reverse Proxy: Phân tải, có thể publish nhiều application với các port khác nhau trên cùng 1 server -> NginX
# Cách thực hiện 
## Nginx
Mình cài đặt [NginX](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-centos-7) trên CentOS, các môi trường khác tương tự.
Nginx config nằm ở đây.
```
/etc/nginx
```

### Xóa config mặc định port 80
/etc/nginx/nginx.conf

```
    server {
        listen       80;
        listen       [::]:80;
        server_name  _;
        root         /usr/share/nginx/html;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        error_page 404 /404.html;
        location = /404.html {
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        }
    }

```

### Thêm config cho reverse proxy

tạo trong thư mục reserver-proxies.conf
```
/etc/nginx/default.d/
```

```
server {
        listen 80;
        server_name test1.tuanld.tk;
        location / {
                proxy_pass      http://127.0.0.1:8080;
        }
}

server {
        listen 80;
        server_name test2.tuanld.tk;
        location / {
                proxy_pass      http://127.0.0.1:8088;
        }
}
```

Trong config trên, dựa vào từng subdomain, nó sẽ forward đến từng service khác nhau.

## CloudFlare
- Tạo 1 tài khoản miễn phí trên https://www.cloudflare.com/
- Add a new website 
![image.png](https://images.viblo.asia/2da39a00-e960-4b39-9823-2fed55259677.png)

- Cloudflare sẽ yêu cầu chọn gói, mình dùng cơ bản nên chọn gói FREE. 

- Config DNS, bạn thể mua domain miễn phí theo hướng dẫn [này](https://viblo.asia/p/lam-the-nao-de-dang-ky-ten-mien-mien-phi-gVQvlwmLkZJ) 
![image.png](https://images.viblo.asia/6974a852-7f5f-4a85-861f-05c7f4b759e1.png)

- CloudFlare sẽ forward đến port 80 trên server, chính vì vậy mình config reserve-proxy nhận port 80 ở trên
![image.png](https://images.viblo.asia/f61443c5-bd05-48ce-b6c4-b22a555218d5.png)
- Bước tiếp theo là config NameServers trên tài khoản Domains 

![image.png](https://images.viblo.asia/6b215ce6-d940-4193-8864-99f8a29d73e0.png)

Tùy vào nơi mình mua domain thì sẽ có UI khác nhau. 
Ví dụ bạn mua của Tenten https://tenten.vn/help/huong-dan-cau-hinh-nameserver-o-tenten/
hay của GoDaddy https://vn.godaddy.com/help/thay-doi-may-chu-ten-cho-mien-cua-toi-664

bước này rất quan trọng. 

Sau bước này coi như xong, đợi thôi, thường mất 5-10p sâu khi config bạn sẽ nhận được email thông báo config thành công. 

![image.png](https://images.viblo.asia/3ff7a59c-c4e4-4023-842a-d20fb944b845.png)

- Redirect http -> https
![image.png](https://images.viblo.asia/128181ff-2d36-4437-855e-7976fd61256b.png)

Kết quả. mình tạo 2 webpage khác nhau, ở 2 subdomain khác nhau. 
![image.png](https://images.viblo.asia/d6656cc2-4fb4-45fd-96bd-b8f55166f72f.png)
![image.png](https://images.viblo.asia/88cd702a-ab63-4811-b906-22af96eab8b5.png)

+ HTTPS 
+ redirect theo từng subdomain
+ Analytics rõ ràng và rất nhiều tính năng khác của cloudflare cần tự khám phá.
![image.png](https://images.viblo.asia/94565303-7f3f-4146-b7ab-b626acc1a919.png)

# Kết luận
Theo mình thì đây là combo đúng là ngon bổ và miễn phí.