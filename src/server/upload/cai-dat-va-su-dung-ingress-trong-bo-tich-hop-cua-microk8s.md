Ở bài này thì mình cần thêm 1 VM cài Nginx để loadbalancer ở đây mình sẽ tạo thêm 1 VM ubuntu 22.04

| IP       | Hostname| vCPU | RAM | DISK |
| -------- | -------- | -------- | -------- | -------- |
| 10.19.2.91 | nginx | 2 core     | 8G     | 100G     |
| 10.19.2.92 | stg-02 | 6 core     | 12G     | 100G     |
| 10.19.2.93 | stg-03     | 6 core     | 12G     | 100G     |
| 10.19.2.94 | stg-03     | 6 core     | 12G     | 100G     |

Ta cài đặt theo mô hình 
![image.png](https://images.viblo.asia/4ceb7ba9-6d91-4714-9894-2e796336372c.png)

# Cài đặt Nginx trên Ubuntu 22.04
Kết nối vào VM **nginx (10.19.2.91)**

```
ssh ubuntu@10.19.2.91
Nhập Pass
```

Bước 1 – Cài đặt Nginx

Cập nhật các gói cài đặt apt

```
sudo apt update
```

Cài đặt Nginx
```
sudo apt install nginx -y
```

Bước 2 – Cấp quyền HTTP Firewall

```
sudo ufw allow 'Nginx HTTP'
```

Bước 3 – Kiểm tra Máy chủ Web của bạn

Kiểm tra service nginx có hoạt đông không?

![image.png](https://images.viblo.asia/a1a7fe65-fc40-4b1b-a890-c5da04c2f000.png)

# Kích hoạt INGRESS 

Để kích hoạt [Inpress Controller](https://github.com/kubernetes/ingress-nginx) của Microk8s chúng ta sử dụng lệnh: 

```
microk8s enable ingress
```

![image.png](https://images.viblo.asia/ced428f0-7ad7-4adb-b358-42a8e14265b1.png)

Sau khi kích hoạt thành công chúng ta sẽ thử tạo tiệp ingress của dashboard

Tiệp: **ingress-dashboard.yaml**

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: https-ingress-dashboard
  namespace: kube-system 
  annotations: 
      kubernetes.io/ingress.class: public
      nginx.ingress.kubernetes.io/backend-protocol: "HTTPS"
spec:
  rules:
   - http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: kubernetes-dashboard
            port:
              number: 443
```

Chạy lệnh ```microk8s kubectl apply -f ingress-dashboard.yaml```

![image.png](https://images.viblo.asia/ad42bee3-447b-4828-a6b5-00823dc94496.png)

Khi thành công ta vào đường dẫn https://10.19.2.92/ để kiểm tra

![image.png](https://images.viblo.asia/a7694569-fa42-4520-b53e-23a4a22e0bc9.png)

# Cấu hình nginx Reverse Proxy
Bước 1: bạn vào file hosts để thêm 1 dòng ở cuối ở máy bạn đang sử dụng, ở đây mình sử dụng Windows

Windows Path: **C:\Windows\System32\drivers\etc\hosts**

MacOS & Linux Path: **/etc/hosts** 

```
10.19.2.91 kubernetes-dashboard.localhost 
```

![image.png](https://images.viblo.asia/b3f5deb5-92d2-4d7f-8c07-5ba54fce5356.png)

Bước 2: Cấu hình nginx

Kết nối vào VM **nginx (10.19.2.91)**

```
ssh ubuntu@10.19.2.91
Nhập Pass
```
 
sau đó đi đến thư mục: **/etc/nginx/sites-enabled**

```
cd /etc/nginx/sites-enabled
```

tạo file **kubernetes-dashboard.localhost.conf**
```
sudo nano kubernetes-dashboard.localhost.conf 
```

copy đoạn config thêm vào file **kubernetes-dashboard.localhost.conf**

```
	upstream host_stg {
		server 10.19.2.92;
        server 10.19.2.93;
        server 10.19.2.94;
	}

	server {
		listen 80 ;
	    server_name kubernetes-dashboard.localhost;
		location / {
			limit_req zone=speedbump burst=20 nodelay;
			proxy_pass http://host_stg;
			proxy_redirect off;
            proxy_set_header   Host             $host;
            proxy_set_header   X-Real-IP        $remote_addr;
	}
}
```

Lưu lại và kiểm tra config xem đã chính xác chưa : **sudo nginx -t** 

```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

Khởi động lại service: 

```
sudo systemctl restart nginx
```

## Cấu hình ingress-dashboard.yaml

Thêm dòng   **host: kubernetes-dashboard.localhost** vào 

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: https-ingress-dashboard
  namespace: kube-system 
  annotations: 
      kubernetes.io/ingress.class: public
      nginx.ingress.kubernetes.io/backend-protocol: "HTTPS"
spec:
  rules:
  - host: kubernetes-dashboard.localhost
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: kubernetes-dashboard
            port:
              number: 443
```

Chạy lại config : ```microk8s kubectl apply -f ingress-dashboard.yaml```

![image.png](https://images.viblo.asia/37ac3dd4-92ec-4cbe-ab88-5bd82835b86c.png)

Nếu bạn thấy bài chia sẽ này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Cảm ơn các bạn nhiều ♥️♥️♥️♥️

Các bài tham khảo: 
* https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04
* https://microk8s.io/docs/addon-ingress