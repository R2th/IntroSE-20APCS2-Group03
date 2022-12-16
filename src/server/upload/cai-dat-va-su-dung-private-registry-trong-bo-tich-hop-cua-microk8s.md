Trước tiên thì hệ thống mình hướng dẫn trong series sẽ triển khai trong moi trường VM và các image sẽ không public ra Internet nên mình sử dụng private registry

## Kích hoạt registry

Mình ssh vào VM **stg-02 (10.19.2.92)** để thực hện, vai trò con stg-02 hiện giờ đang đóng vai trò Master 

```sql
ssh ubuntu@10.19.2.92 
Nhập Pass
```

Sau khi login vào stg-02 thành công ta tiến hành kích hoạt registry bằng lệnh 

```markdown
microk8s enable registry
```

![image.png](https://images.viblo.asia/e01b0033-e8b8-4825-8751-ae6019a1eac2.png)

Sau khi kích hoạt registry thì persistent volume mặt định là 20G dùng để lưu trữu images, tuy nhiên bạn có thể cấp thêm để phù hợp với ứng dụng của bạn

```ruby
microk8s enable registry:size=40Gi
```

## Cách sử dụng Private Registry

1. Cài đặt **Docker Engine** trên ubuntu 22.04 (các bạn tham khảo thêm ở nguồn https://docs.docker.com/engine/install/ubuntu/)

* Gỡ cài đặt phiên bản cũ

```markdown
sudo apt-get remove docker docker-engine docker.io containerd runc
```

### Thiết lập repository
-  Cập nhật chỉ mục gói apt và cài đặt các gói để cho phép apt sử dụng kho lưu trữ qua HTTPS:
``
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release
``

- Thêm khóa GPG chính thức của Docker:
```shell
 sudo mkdir -p /etc/apt/keyrings
 curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

- Sử dụng lệnh để thiết lập repository

```shell
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### Cài đặt Docker Engine

1. Cập nhât các gói apt

```sql
 sudo apt-get update
```

2. Cài đặt Docker Engine, containerd và Docker Compose.
```markdown
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### Cấu hình Insecure registry (Cho phép push image không cần SSL)

Ở máy build và máy push từ Docker chúng ta cần thêm cấu hình ở file **/etc/docker/daemon.json**

```python
sudo nano /etc/docker/daemon.json
```

thêm đoạn cấu hình vào 
```rust
{
  "insecure-registries" : ["10.19.2.92:32000"]
}
```

![image.png](https://images.viblo.asia/a7bd9ced-9c1d-427c-a432-cfe5aafd6c4a.png)

Lưu lại và khởi động lại service docker 
```shell
sudo systemctl restart docker
```

Bây giờ ta test cấu hình theo các bước:
1. Pull image Nginx
```cpp
docker pull nginx
```
![image.png](https://images.viblo.asia/8d58395e-78ad-4337-ac00-b3b428e65d1f.png)

2. tag file image nginx -> 10.19.2.92:32000/big-dog-nginx

```css
 docker tag nginx 10.19.2.92:32000/big-dog-nginx
```
![image.png](https://images.viblo.asia/e8de8112-11a3-46b7-8ef2-dab56a8dfa72.png)

4. Push image 10.19.2.92:32000/big-dog-nginx lên registry
```css
 docker push 10.19.2.92:32000/big-dog-nginx
```

![image.png](https://images.viblo.asia/0c4d3201-daf1-4172-ad79-ba724f543d9a.png)

### Cấu hình microk8s 

Microk8s 1.23 và các phiên bản mới hơn sử dụng các tệp máy chủ riêng biệt cho mỗi đăng ký hình ảnh. Đối với Cơ quan đăng ký http://10.19.2.92:32000, tiệp cấu hình sẽ ở **/var/snap/microk8s/current/args/certs.d/10.19.2.92:32000** 

Đầu tiên, hãy tạo thư mục và tiệp nếu nó không tồn tại:

```shell
sudo mkdir -p /var/snap/microk8s/current/args/certs.d/10.19.2.92:32000
sudo touch /var/snap/microk8s/current/args/certs.d/10.19.2.92:32000/hosts.toml
```

Sau đó, chỉnh sửa tệp bạn vừa tạo và đảm bảo đúng nội dung như sau:

```rust
# /var/snap/microk8s/current/args/certs.d/10.19.2.92:32000/hosts.toml
server = "http://10.19.2.92:32000"

[host."http://10.19.2.92:32000"]
capabilities = ["pull", "resolve"]
```

![image.png](https://images.viblo.asia/a8d81df1-f2d5-4c51-a2e8-680e3b487cbe.png)

Lưu lại và khởi động lại dịch vụ microk8s 

```go
microk8s stop
microk8s start
```

### Deploy và test image mới push

1. Tạo tiệp **big-dog-nginx-all.yaml**

```markdown
apiVersion: apps/v1
kind: Deployment
metadata:
  name: big-dog-nginx-deployment
  labels:
    app: nginx
spec:
  selector:
    matchLabels:
      app: big-dog-nginx
  template:
    metadata:
      labels:
        app: big-dog-nginx
    spec:
      containers:
      - name: big-dog-nginx
        image: 10.19.2.92:32000/big-dog-nginx
        ports:
        - containerPort: 80
---

apiVersion: v1
kind: Service
metadata:
  name: big-dog-nginx-svc
  labels:
    app: big-dog-nginx-svc
spec:
  type: NodePort
  selector:
    app: big-dog-nginx
  ports:
  - name: http
    port: 80
    targetPort: 80
    nodePort: 30039
    protocol: TCP
```

2. Run file  **big-dog-nginx-all.yaml**

```sql
 microk8s kubectl apply -f big-dog-nginx-all.yaml
```

![image.png](https://images.viblo.asia/92dfade4-1da8-4033-8233-bb6463997ba5.png)

Có 2 cách để test: 
1. Vào port 30039 để kiểm tra : http://10.19.2.92:30039  

![image.png](https://images.viblo.asia/6fda0347-2055-4c17-aa4d-7ca063cd074c.png)

2. run dashboard để kiểm tra

```python
microk8s dashboard-proxy
```

![image.png](https://images.viblo.asia/0c878dc2-ba78-4a92-9cbd-488fcd79e1fc.png)

![image.png](https://images.viblo.asia/516a3f6a-8f07-420a-a4c6-c466d3e54e23.png)

Nếu bạn thấy bài chia sẽ này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé.
Cảm ơn các bạn nhiều ♥️♥️♥️♥️

Link [github](https://github.com/tdduydev/microk8s-series/) để các bạn copy cho nhanh các tiệp