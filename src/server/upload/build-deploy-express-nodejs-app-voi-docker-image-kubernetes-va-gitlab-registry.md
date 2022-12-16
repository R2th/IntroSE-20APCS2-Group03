### I, Đôi chút về Kubernetes
Kubernetes: là dịch vụ điều phối container. Được phát triển bởi Google và tặng lại cho Tổ chức Điện toán đám mây CNCF. Kubernetes hiện là nguồn mở. Có lợi thế là tận dụng nhiều năm kinh nghiệm trong quản lý container của Google. Đó là một hệ thống toàn diện để tự động hóa việc triển khai, lập lịch và nhân rộng các ứng dụng được đóng gói và hỗ trợ nhiều công cụ container hóa như Docker.

Nếu các bạn đã tìm hiểu về docker và hiểu rõ về khái niệm docker container. Thì Kubernetes cũng tương tự như thế, nó cũng nhân rộng và quản lý các ứng dụng container.

Để tìm hiểu chi tiết về các khái niệm Pods, Node hay Image Registry, Api bạn có thể đọc thêm tại: [Cùng tìm hiểu về Kubernetes Architecture](https://viblo.asia/p/cung-tim-hieu-ve-kubernetes-architecture-yMnKMvJEZ7P)

![](https://images.viblo.asia/0b65942a-9c74-4556-8b6d-0b73af27a89d.png)

### II, Build, Deploy Express Nodejs App với Docker Image, Kubernetes và Gitlab Registry
**1. Cài đặt Kubernetes Client:**
- Chúng ta sử dụng command `kubectl` để chạy các commands của Kubernetes clusters
Cài đặt kubectl binary với curl trên Linux
Tải về phiên bản mới nhất với câu lệnh:
```bash
curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl
```
Để tải về phiên bản cụ thể, hãy thay thế phần $(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt) trong câu lệnh với một phiên bản cụ thể.

Ví dụ như, để tải về phiên bản v1.20.0 trên Linux, hãy nhập như sau:

```bash
curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.20.0/bin/linux/amd64/kubectl
```
Tạo kubectl binary thực thi.
```bash
chmod +x ./kubectl
```
Đưa bản binary vào biến môi trường PATH của bạn.

```bash
sudo mv ./kubectl /usr/local/bin/kubectl
```
Kiểm tra chắc chắn rằng phiên bản bạn cài là mới nhất:

```bash
kubectl version
```
Cài đặt với OS khác tham khảo tại: [Cài đặt và cấu hình kubectl](https://kubernetes.io/vi/docs/tasks/tools/install-kubectl/)

**2. Tạo Express Node.js app**
#### Tạo Node.js app
- Bạn mở command line lên vào gõ:
```cmd
    mkdir node-server
```
- Sau đó tạo liên kết đến npm
```cmd
    npm init
```
- Tạo file index.js, .env.example
```cmd
    touch index.js env.example
```
Và đây là nội dung của file index.js
```js
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
var cors = require('cors')
const app = express();
app.use(cors());

app.get('/', async (req, res) => {
   console.log('Hello world');
});

app.listen(process.env.PORT);
```
Tạo file .env
```cmd
    cp .env.example .env
```
Các bạn chạy thử app sẽ thấy:

![](https://images.viblo.asia/a5d4635e-5841-4f00-8f6e-bce5ece16fd4.png)

Để deploy image lên Registry gitlab tham khảo tại: [Deploy Node.js app đơn giản với Docker và Gitlab Registry](https://viblo.asia/p/deploy-nodejs-app-don-gian-voi-docker-va-gitlab-registry-ORNZq1nNZ0n)

**3. Kubernetes**

Tạo file deployment.yaml
```deployment.yaml
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  name: node-server-deployment
spec:
  replicas: 3
  template:
    metadata:
      labels: # labels to select/identify the deployment
        app: node-app
    spec:     # pod spec                  
      containers: 
      - name: node-server 
        image: registry.gitlab.com/web-sale/node-server:master
        ports:
        - containerPort: 3000
 ```
 Và sau đó run command:
 
 ```kubectl create -f deployment.yaml --save-config```
 
 Để xem các deployment đã chạy dùng lệnh:
 ```bash
 kubectl get deployments
 ```
 Xem các pods đang chạy: 
 ```
 kubectl get pods
 ```
 
 Hoặc bạn có thể chạy riêng từng lệnh như sau:
- Kiểm tra các worker nodes: ```kubectl get nodes```
- Tạo một deployment:
```
kubectl create deployment --image registry.gitlab.com/web-sale/node-server:master node-app
```
- Scale up to 3 replicas:
```
kubectl scale deployment node-app --replicas 3
```
- Expose deployment với port:
```
kubectl expose deployment node-app --port 3000
```

### III. Tạm kết
Hy vọng sau bài viết các bạn đã có thể Build, Deploy Express Nodejs App với Docker Image, Kubernetes và Gitlab Registry. Rất mong được sự góp ý của các bạn
![](https://images.viblo.asia/de712910-d0ef-4e55-aaf8-d7cffca1e892.jpg)