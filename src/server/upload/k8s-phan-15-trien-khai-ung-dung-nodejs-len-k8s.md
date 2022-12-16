# Giới thiệu
Trong các phần trước mình đã giới thiệu về cách dựng một hệ thống Kubernetes Cluster với khá đầy đủ các thành phần cần thiết như:

- Cài đặt [Kubernetes Cluster](https://viblo.asia/p/k8s-phan-2-cai-dat-kubernetes-cluster-va-rancher-m68Z0BL95kG)
- Cài đặt Storage Class ([Dùng NFS](https://viblo.asia/p/k8s-phan-3-cai-dat-storage-cho-k8s-dung-nfs-RnB5pAw7KPG) và [dùng Longhorn](https://viblo.asia/p/k8s-phan-4-cai-dat-storage-cho-k8s-dung-longhorn-1Je5EAv45nL))
- Cài đặt Load Balancing ([cài đặt Haproxy và nginx-ingress](https://viblo.asia/p/k8s-phan-6-load-balancing-tren-kubernetes-dung-haproxy-va-nginx-ingress-4dbZNRpaZYM))
- [Dựng Private Docker Registry](https://viblo.asia/p/k8s-phan-11-xay-dung-private-docker-registry-phuc-vu-cicd-voi-kubernetes-Qbq5QRQRKD8)

Sau khi đã hoàn thiện các thành phần thiết yếu trên, trong bài hôm nay mình sẽ trình bày về cách thức triển khai một ứng dụng đơn giản lên k8s sử dụng nodejs. Đây sẽ là tiền đề để phát triển tiếp tới các chủ đề liên quan tới CICD, automation mà mình sẽ đề cập ở các phần tiếp theo

# Các bước cài đặt trong bài lab này có thể tóm tắt lại như sau:
- Cài đặt môi trường để triển khai app nodejs
- Code một module nodejs bé xinh và trả về web html
- Build và tạo Docker Image cho ứng dụng
- Triển khai ứng dụng lên K8S dùng các file manifest yaml 

**Kết quả là ta có thể cài đặt được ứng dụng và truy cập vào ứng dụng bằng IP hoặc domain name.**

# Giờ bắt tay vào làm thôi!! 
## Cài đặt môi trường để build NodeJs App (centos7):
Như các bài hướng dẫn trước đã đề cập, mình có một máy chủ cicd để lưu các file cấu hình cài đặt. Mình sẽ cài môi trường lên máy chủ này để build ứng dụng ở đây và triển khai lên k8s.

Đầu tiên máy chủ này phải cài [Docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-centos-7), [nodejs](https://computingforgeeks.com/installing-node-js-10-lts-on-centos-7-fedora-29-fedora-28/) và npm. 
Những hướng dẫn này khá phổ biến trên mạng rồi, nó cũng chỉ loanh quanh vài lệnh thôi, đây là cài cho centos7 nhé:
```bash
sudo yum clean all && sudo yum makecache fast
sudo yum install -y gcc-c++ make
sudo yum install -y nodejs
sudo yum install -y npm
```

## Tạo thư mục cài đặt và pull code về
Các bạn tạo một thư mục và pull code về ở repo này nhé: https://github.com/rockman88v/nodejs-demo-k8s

Kết quả sẽ được thư mục như thế này:
```shell
[sysadmin@vtq-cicd nodejs-demo-k8s]$ ls -lrt
total 52
-rw-rw-r--  1 sysadmin sysadmin   116 Aug 12 05:35 Dockerfile
-rw-rw-r--  1 sysadmin sysadmin   560 Aug 12 05:52 package.json
-rw-rw-r--  1 sysadmin sysadmin 32524 Aug 12 22:26 package-lock.json
drwxrwxr-x 51 sysadmin sysadmin  4096 Aug 12 22:26 node_modules
-rw-rw-r--  1 sysadmin sysadmin  1501 Aug 12 23:40 README.md
-rw-rw-r--  1 sysadmin sysadmin  1652 Aug 12 23:41 app.js
drwxrwxr-x  2 sysadmin sysadmin    69 Aug 12 23:43 kubernetes
drwxrwxr-x  2 sysadmin sysadmin    58 Aug 12 23:43 documents
```
***Các file html ở đây là mình tìm sẵn template trên mạng và customize đi một chút. Code nodejs cũng là lấy ví dụ trên mạng và sửa lại  để demo cho việc sử dụng các biến môi trường từ k8s vào ứng dụng nodejs.***

Cơ bản app nó làm nhiệm vụ sau:
- Gọi vào "/" trả về file index.html, trong đó có cập nhật giá trị các biến môi trường liên quan tới triển khai (POD_NAME, POD_IP..)
- Gọi vào "/about" hay "/about-us" trả về about.html
- Các request khác thì  trả về 404.html

Ở đây đã có sẵn node_modules rồi, hoặc các bạn có thể cài lại bằng lệnh:
```swift
npm install
```

## Build docker và push vào registry
Ở đây mình có local registry là **harbor.prod.viettq.com**, các bạn thay đổi thông tin registry theo hệ thống của các bạn nhé! 

*Trong phần trước mình đã có hướng dẫn cách xây dựng và sử dụng local registry rồi, các bạn có thể  [**xem lại ở đây**](https://viblo.asia/p/k8s-phan-11-xay-dung-private-docker-registry-phuc-vu-cicd-voi-kubernetes-Qbq5QRQRKD8)*

**Thực hiện build docker:**
```markdown
[sysadmin@vtq-cicd nodejs-demo-k8s]$ docker build -t harbor.prod.viettq.com/demo/my-app:v5 .
Sending build context to Docker daemon  3.082MB
Step 1/7 : FROM node:10
 ---> 28dca6642db8
Step 2/7 : WORKDIR /usr/src/app
 ---> Using cache
 ---> 8bafdc7f0d3d
Step 3/7 : COPY package*.json ./
 ---> f8e58ab5b350
Step 4/7 : RUN npm install
 ---> Running in 01a81426aca7
npm WARN read-shrinkwrap This version of npm is compatible with lockfileVersion@1, but package-lock.json was generated for lockfileVersion@2. I'll try to do my best with it!
added 57 packages from 42 contributors and audited 57 packages in 2.434s

7 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

Removing intermediate container 01a81426aca7
 ---> 18e36a7661fe
Step 5/7 : COPY . .
 ---> e6421f170c83
Step 6/7 : EXPOSE 8080
 ---> Running in b764f46a66ca
Removing intermediate container b764f46a66ca
 ---> de280724aa81
Step 7/7 : CMD ["node", "app.js"]
 ---> Running in a67764ebddf2
Removing intermediate container a67764ebddf2
 ---> 87dc4eaddb18
Successfully built 87dc4eaddb18
Successfully tagged harbor.prod.viettq.com/demo/my-app:v5
```

**Sau đó push lên registry:**
```ruby
[sysadmin@vtq-cicd nodejs-demo-k8s]$ docker push harbor.prod.viettq.com/demo/my-app:v5
The push refers to repository [harbor.prod.viettq.com/demo/my-app]
b960f07798ee: Pushed
617f020fecea: Pushed
97140b150373: Pushed
fc0ca60dc722: Layer already exists
3ab01e8988bf: Layer already exists
c98dc9a94132: Layer already exists
3ffdb7e28503: Layer already exists
33dd93485756: Layer already exists
607d71c12b77: Layer already exists
052174538f53: Layer already exists
8abfe7e7c816: Layer already exists
c8b886062a47: Layer already exists
16fc2e3ca032: Layer already exists
v5: digest: sha256:bbd3843ecc11992948d0289a1876ea2c316772962b6f6ce988238c26ccdd2528 size: 3052
```

## Triển khai lên k8s
Để triển khai lên k8s thì mình có dùng 3 resource chính là deployment, service và ingress.
- Trong cấu hình deployment có gán các biến môi trường lấy từ thông tin metadata của Pod khi deploy lên k8s
- Service cài đặt nodeport 31123 để kết nối trực tiếp qua IP của Node
- Ingress cài đặt ở địa chỉ host là **demo-node.prod.viettq.com**

**Trong cấu hình của deployment bạn cần đổi thông tin image theo bước bạn build docker bên trên:**

Các bạn cũng có thể set số lượng replicas (là số pod sẽ chạy ứng dụng này) ở tham số **replicas**.
```python
    spec:
      containers:
        - name: node-app
          image: harbor.prod.viettq.com/demo/my-app:v1
          imagePullPolicy: Always
```

**Trong cấu hình service bạn có thể đổi cấu hình nodeport  theo ý muốn, hiện tại mình đang để là nodePort: 31123:**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: node-app-service
spec:
  selector:
    app: node-app-viettq
  type: LoadBalancer
  ports:
    - protocol: TCP
      port: 5000
      targetPort: 8080
      nodePort: 31123
```

**Trong cấu hình ingress bạn đổi host theo cấu hình domain của bạn:**

host: demo-node.prod.viettq.com --> Tên host bạn mong muốn

ingressClassName: local --> Thường thì mặc định class là nginx, tuy nhiên nếu bạn muốn chỉ định class cụ thể thì cấu hình ở đây.

```yaml
apiVersion: networking.k8s.io/v1
# Specifying the kind as Ingress
# because we want's to manage the external user to our service
kind: Ingress
metadata:
# Naming our Ingress
name: node-app-ingress
labels:
  name: node-app-ingress
spec:
  ingressClassName: local
rules:
  # Defining rules such as
  # Providing the cluster name, DNS_NAME (where we want this image to be visible)
  - host: demo-node.prod.viettq.com
    http:
      paths:
        - pathType: Prefix
          path: "/"
          backend:
            service:
              # Specifying the name of the service that the pods are using
              name: node-app-service
              port:
                # Specifying the PORT to map with the service
                number: 5000
```

**Xong rồi thì deploy các manifest file này lên k8s, mình sẽ cài trên namespace demo:**
```shell
kubectl create ns demo
kubectl -n demo apply -f kubernetes/deployment.yaml
kubectl -n demo apply -f kubernetes/service.yaml
kubectl -n demo apply -f kubernetes/ingress.yaml
```

**Kết quả khi cài đặt xong ta sẽ có 1 deployment với 3 pod, 1 service và 1 ingress:**
```shell
[sysadmin@vtq-cicd kubernetes]$ kubectl -n demo get all
NAME                                       READY   STATUS    RESTARTS   AGE
pod/node-app-deployment-75c7c88b58-66m69   1/1     Running   0          3h15m
pod/node-app-deployment-75c7c88b58-7mqsb   1/1     Running   0          3h15m
pod/node-app-deployment-75c7c88b58-n7qbn   1/1     Running   0          3h18m

NAME                       TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
service/node-app-service   LoadBalancer   10.233.53.78   <pending>     5000:31123/TCP   20h

NAME                                  READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/node-app-deployment   3/3     3            3           20h

NAME                                             DESIRED   CURRENT   READY   AGE
replicaset.apps/node-app-deployment-75c7c88b58   3         3         3       4h19m
[sysadmin@vtq-cicd kubernetes]$ kubectl -n demo get ingress -owide
NAME                        CLASS   HOSTS                       ADDRESS         PORTS   AGE
demo-node.prod.viettq.com   local   demo-node.prod.viettq.com   192.168.10.81   80      83m
```

## Như vậy là mọi thứ đã hoàn thành, cùng kiểm tra kết quả xem sao.
**Kết nối vào bằng IP:Port (IP của node bất kỳ trong k8s cluster): 192.168.10.81:31123**

![image.png](https://images.viblo.asia/ec6d94a2-7c73-4a30-b2fe-8d5369378ebf.png)

![image.png](https://images.viblo.asia/649d982e-2f4a-435d-ab99-e0d751a69119.png)

**Kết nối vào host như đã cấu hình trong ingress: https://demo-node.prod.viettq.com/**

![image.png](https://images.viblo.asia/9c5d7512-33dc-4ea0-b61c-405db6ecbd31.png)

Hola! Chạy dc rồi, nó cũng đã hiển thị được các thông tin như namespace, node, pod name, podIP ra luôn. Vì mình đang cấu hình 3 replicas tương ứng 3 pod nên khi bạn f5 lại web thì có thể pod khác sẽ đang xử lý và thông tin hiển thị trên web sẽ thay đổi theo, các bạn để ý tham số PodName và PodIP nhé. 

**Mình thử f5 thì ra kết quả:**

![image.png](https://images.viblo.asia/1eece427-bf12-4178-8cc5-9399e9ab957e.png)

## Kết luận
Như vậy là mình đã triển khai xong một ứng dụng lên k8s. Nhưng trong quá trình thực hiện bài lab này thì việc update code và deploy lên để test rất mất công. Cụ thể mình làm như sau:
- Sửa code trên máy cá nhân --> Commit lên gihub
- Kết nối vào máy chủ cicd pull code update về
- Build docker & push registry
- Re-apply các file manifest

***Vậy bài toán đặt ra là làm sao để cái luồng kia nó bớt thủ công hơn, cho tay bớt to? Thì đó là câu chuyện của mọi người hay nhắc tới, đó là CICD và mình trình bày trong phần sau.***

## Trong phần tiếp theo mục tiêu mình sẽ thực hiện:
- Dựng helm chart cho ứng dụng --> Khi apply lên k8s sẽ thực hiện qua helm thay vì dùng kubectl để apply các file manifest
- Cài đặt gitlab để dùng local cho giống thực tế hơn (chắc không ai để code cty lên github đâu :D )
- Cài đặt jenkins để thực hiện luồng CICD
- Update code vào thực hiện one-click trên giao diện Jenkins để chờ kết quả 

***Cảm ơn mọi người đã đọc tới đây. Trong bài viết có thể có những thiếu xót mong được mọi người góp ý để hoàn thiện thêm.
Nếu thấy series này hữu ích thì các bạn cho mình xin 1 nút upvote để tạo động lực viết tiếp các bài tiếp theo nhé!***

**Thank mọi người.**