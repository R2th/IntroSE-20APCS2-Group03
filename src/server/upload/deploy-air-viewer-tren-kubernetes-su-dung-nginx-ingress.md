![](https://images.viblo.asia/9a2020d4-0e5f-4b95-8f2a-7fe134cde4c0.png)
Ở phần trước mình đã deploy nginx, cùng các service như `tea` hay  `coffee`, đến phần này mình sẽ deploy 1 ứng dụng web có hệ thống được miêu tả như hình trên, phần sensor thì mình sẽ không làm chi tiết, các bạn có thể tham khảo [tại đây](https://viblo.asia/p/tu-do-chi-so-o-nhiem-khong-khi-tai-nha-voi-sensor-va-raspberry-pi-YWOZrBBvZQ0) hoặc qua [github](https://github.com/sun-asterisk-research/air-viewer#pi-sensor-client). Chúng ta có các services như Flask, mysql, nuxt.js được định tuyến chung với nginx-ingress sau đó sử dụng luôn worker node làm domain, loadbalancer. Dự án đo nồng độ ô nhiễm bụi trong không khí này  cũng được xây dựng microservices các bạn có thể tham khảo tại đây https://github.com/sun-asterisk-research/air-viewer

# CleanUp phần trước

```
# xóa service
kubectl delete service coffee-svc tea-svc
# xóa các deployment
kubectl delete deployment coffee tea
# xóa các ingress của các services
kubectl delete ingress cafe-ingress
# xóa các secret của ingress
kubectl delete secret cafe-secret
```

# Clone Project Air-viewer
```bash
git clone https://github.com/sun-asterisk-research/air-viewer.git
```

# Install đối với các bạn chưa đọc bài trước
Ở phần trước mình đã cài đặt kubernetes-ingress nên mình sẽ đi nhanh phần này nếu các bạn chưa cài đặt kubernetes-ingress. Từ giờ trở đi mặc định các câu lệnh thực thi trên `master node` thôi
```
# vào thư mục install
cd air-viewer/kubernetes/nginx-ingress/install
```
### Create a Namespace, a SA, the Default Secret, the Customization Config Map, and Custom Resource Definitions
```
kubectl apply -f ns-and-sa.yaml
```
### Tạo một secret với chứng chỉ TLS và key cho server mặc định NGINX:

```
kubectl apply -f default-server-secret.yaml
```
### Tạo một config map cho tùy biến NGINX configuration

```
kubectl apply -f nginx-config.yaml
```

### Tạo custom resource definitions cho VirtualServer và VirtualServerRoute

```
kubectl apply -f custom-resource-definitions.yaml
```

### Configure RBAC
```
kubectl apply -f rbac.yaml
```
### Deploy the Ingress Controller
```
kubectl apply -f nginx-ingress.yaml
```

# Config Air-viewer
## Create Namespaces
```
kubectl create namespace air-viewer
```
## Deploy Mysql
Về deploy mysql chúng ta cần `persistent Volume` nơi chưa database, `secret` chứa các password của root và user name để che dấu password tránh người khác cùng quản lý các services khác đọc được thông qua câu lệnh `describe deployment của mysql`. Cuối cùng là các file chứa `service` và `deployment`

```
cd air-viewer/kubernetes/mysql
```

### Secret
```
echo -n "root" | base64
```
ouput: `cm9vdA==`

```secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: mysql-secrets
  namespace: air-viewer
type: Opaque
data:
  ROOT_PASSWORD: cm9vdA==
---
apiVersion: v1
kind: Secret
metadata:
  name: mysql-pass-non-root
  namespace: air-viewer
type: Opaque
data:
  ROOT_PASSWORD: ZXhhbXBsZQ==
```

```
kubectl apply -f secret.yaml
```

Chúng ta có thể liệt kê các secret trong namespace air-viewer
```
kubectl get secret -n air-viewer
```

Output:
```
NAME                  TYPE                                  DATA   AGE
default-token-p6j5h   kubernetes.io/service-account-token   3      105m
mysql-pass-non-root   Opaque                                1      3m54s
mysql-secrets         Opaque                                1      3m54s
```

mô tả hiển thị thông tin của secret `mysql-secrets`, tương tự `mysql-pass-non-root`
```
kubectl describe secret mysql-secrets -n air-viewer
```
Output:
```
Name:         mysql-secrets
Namespace:    air-viewer
Labels:       <none>
Annotations:  
Type:         Opaque

Data
====
ROOT_PASSWORD:  4 bytes
```

### Persistent Storage
Container là một cấu trúc ephemeral. Mọi thay đổi đối với container đang chạy sẽ bị mất dữ liệu khi container stop. Vì đó, container sẽ không phù hợp cho cơ sở dữ liệu lưu trữ, chúng ta bắt buộc phải sử dụng volume store để mount với các pod của mysql

```persistentVolume.yaml
# tạo kho 2Gi trống
apiVersion: v1
kind: PersistentVolume
metadata:
  name: mysql-pv-volume
  namespace: air-viewer
  labels:
    type: local
spec:
  storageClassName: manual
  capacity:
    storage: 2Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/mnt/data"
---
# mysql sẽ sử dụng mysql-pv-claim thông qua deployment
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-pv-claim
  namespace: air-viewer
spec:
  storageClassName: manual
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 2Gi
```
```
kubectl apply -f persistentVolume.yaml
```
### Deployment
```deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql
  labels:
    app: mysql
  namespace: air-viewer
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mysql
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - image: mysql:5.7
        name: mysql
        env:
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-secrets
              key: ROOT_PASSWORD
        - name: TZ
          value: Asia/Ho_Chi_Minh
        - name: MYSQL_DATABASE
          value: air_viewer
        - name: MYSQL_USER
          value: example
        - name: MYSQL_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-pass-non-root
              key: ROOT_PASSWORD
        ports:
        - containerPort: 3306
          name: mysql
        volumeMounts:
        - name: mysql-persistent-storage
          mountPath: /var/lib/mysql
      volumes:
        - name: mysql-persistent-storage
          persistentVolumeClaim:
            claimName: mysql-pv-claim
```
Như trên có thể thấy việc mapping giữa `deployment` với `secret` và `mysql-pv-claim` 
```
kubectl apply -f deployment.yaml
```

Kiểm tra trạng thái của deployment mysql
```
kubectl describe deployment mysql -n air-viewer
```

output:
```
Name:               mysql
Namespace:          air-viewer
CreationTimestamp:  Mon, 17 Feb 2020 06:19:55 +0000
Labels:             app=mysql
Annotations:        deployment.kubernetes.io/revision: 1
                    kubectl.kubernetes.io/last-applied-configuration:
                      {"apiVersion":"apps/v1","kind":"Deployment","metadata":{"annotations":{},"labels":{"app":"mysql"},"name":"mysql","namespace":"air-viewer"}...
Selector:           app=mysql
Replicas:           1 desired | 1 updated | 1 total | 1 available | 0 unavailable
StrategyType:       Recreate
MinReadySeconds:    0
Pod Template:
  Labels:  app=mysql
  Containers:
   mysql:
    Image:      mysql:5.7
    Port:       3306/TCP
    Host Port:  0/TCP
    Environment:
      MYSQL_ROOT_PASSWORD:  <set to the key 'ROOT_PASSWORD' in secret 'mysql-secrets'>  Optional: false
      TZ:                   Asia/Ho_Chi_Minh
      MYSQL_DATABASE:       air_viewer
      MYSQL_USER:           example
      MYSQL_PASSWORD:       <set to the key 'ROOT_PASSWORD' in secret 'mysql-pass-non-root'>  Optional: false
    Mounts:
      /var/lib/mysql from mysql-persistent-storage (rw)
  Volumes:
   mysql-persistent-storage:
    Type:       PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)
    ClaimName:  mysql-pv-claim
    ReadOnly:   false
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  <none>
NewReplicaSet:   mysql-6454669767 (1/1 replicas created)
Events:
  Type    Reason             Age   From                   Message
  ----    ------             ----  ----                   -------
  Normal  ScalingReplicaSet  99s   deployment-controller  Scaled up replica set mysql-6454669767 to 1
```

Truy cập môi trường bên trong của pods được tạo
```
kubectl get pods -n air-viewer
```

output: 
```
NAME                     READY   STATUS    RESTARTS   AGE
mysql-6454669767-7md6f   1/1     Running   0          6m18s
```

```
 kubectl exec -it mysql-6454669767-7md6f bash -n air-viewer
```
output:
```
root@mysql-6454669767-7md6f:/# mysql -u root -p
password: root (đã được mã hóa ở trên) là truy cập được mysql
```

### Service
Dựng service cho các pod(s)
```service.yaml
apiVersion: v1
kind: Service
metadata:
  name: mysql
  namespace: air-viewer
  labels:
    app: mysql
spec:
  type: ClusterIP
  ports:
    - port: 3306
  selector:
    app: mysql
```
```
kubectl apply -f service.yaml
```

Kiểm tra lại:
```
kubectl describe svc mysql -n air-viewer
```
output:
```
Name:              mysql
Namespace:         air-viewer
Labels:            app=mysql
Annotations:       kubectl.kubernetes.io/last-applied-configuration:
                     {"apiVersion":"v1","kind":"Service","metadata":{"annotations":{},"labels":{"app":"mysql"},"name":"mysql","namespace":"air-viewer"},"spec":...
Selector:          app=mysql
Type:              ClusterIP
IP:                10.108.61.223
Port:              <unset>  3306/TCP
TargetPort:        3306/TCP
Endpoints:         10.244.1.3:3306
Session Affinity:  None
Events:            <none>
```

## Deploy Backend (Flask, UWSGI)
### Deployment
```
cd air-viewer/kubernetes/backend
```
```deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-air-viewer
  labels:
    app: backend-air-viewer
  namespace: air-viewer
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend-air-viewer
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: backend-air-viewer
    spec:
      containers:
      - image: quanghung97/backend-air-viewer:v1
        imagePullPolicy: Always
        name: backend-air-viewer
        env:
          - name: DB_HOST
            value: mysql:3306
          - name: DB_DATABASE
            value: air_viewer
          - name: DB_USERNAME
            value: example
          - name: DB_PASSWORD
            valueFrom:
                secretKeyRef:
                  name: mysql-pass-non-root
                  key: ROOT_PASSWORD
        ports:
        - containerPort: 80
          protocol: TCP
```
Deploy này sẽ kết hợp với secret user, password đã tạo trước đó.
```
kubectl apply -f deployment.yaml
```

Kiểm tra:
```
kubectl describe deployment backend-air-viewer -n air-viewer
```
output: 
```
Name:               backend-air-viewer
Namespace:          air-viewer
CreationTimestamp:  Mon, 17 Feb 2020 06:53:19 +0000
Labels:             app=backend-air-viewer
Annotations:        deployment.kubernetes.io/revision: 1
                    kubectl.kubernetes.io/last-applied-configuration:
                      {"apiVersion":"apps/v1","kind":"Deployment","metadata":{"annotations":{},"labels":{"app":"backend-air-viewer"},"name":"backend-air-viewer"...
Selector:           app=backend-air-viewer
Replicas:           2 desired | 2 updated | 2 total | 2 available | 0 unavailable
StrategyType:       Recreate
MinReadySeconds:    0
Pod Template:
  Labels:  app=backend-air-viewer
  Containers:
   backend-air-viewer:
    Image:      quanghung97/backend-air-viewer:v1
    Port:       80/TCP
    Host Port:  0/TCP
    Environment:
      DB_HOST:      mysql:3306
      DB_DATABASE:  air_viewer
      DB_USERNAME:  example
      DB_PASSWORD:  <set to the key 'ROOT_PASSWORD' in secret 'mysql-pass-non-root'>  Optional: false
    Mounts:         <none>
  Volumes:          <none>
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  <none>
NewReplicaSet:   backend-air-viewer-69dd45dfbd (2/2 replicas created)
Events:
  Type    Reason             Age   From                   Message
  ----    ------             ----  ----                   -------
  Normal  ScalingReplicaSet  2m3s  deployment-controller  Scaled up replica set backend-air-viewer-69dd45dfbd to 2
```
### Service
```service.yaml
apiVersion: v1
kind: Service
metadata:
  name: backend-air-viewer
  namespace: air-viewer
  labels:
    app: backend-air-viewer
spec:
  selector:
    app: backend-air-viewer
  ports:
   -  protocol: TCP
      port: 80
      targetPort: 80
```

```
kubectl apply -f service.yaml
```

# Deploy Frontend (Nuxt.js)
```
cd air-viewer/kubernetes/frontend
```
### Deployment
```deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-air-viewer
  labels:
    app: frontend-air-viewer
  namespace: air-viewer
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend-air-viewer
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: frontend-air-viewer
    spec:
      containers:
      - image: quanghung97/frontend-air-viewer:framgia2c
        imagePullPolicy: Always
        name: frontend-air-viewer
        ports:
        - containerPort: 3000
          protocol: TCP
        env:
        - name: TZ
          value: Asia/Ho_Chi_Minh
```
```
kubectl apply -f deployment.yaml
```
### Service
```service.yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend-air-viewer
  namespace: air-viewer
  labels:
    app: frontend-air-viewer
spec:
  selector:
    app: frontend-air-viewer
  type: ClusterIP
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
```
```
kubectl apply -f service.yaml
```

Kiểm tra:
```
kubectl describe deployment frontend-air-viewer -n air-viewer
```

Output:
```
Name:               frontend-air-viewer
Namespace:          air-viewer
CreationTimestamp:  Mon, 17 Feb 2020 06:59:19 +0000
Labels:             app=frontend-air-viewer
Annotations:        deployment.kubernetes.io/revision: 1
                    kubectl.kubernetes.io/last-applied-configuration:
                      {"apiVersion":"apps/v1","kind":"Deployment","metadata":{"annotations":{},"labels":{"app":"frontend-air-viewer"},"name":"frontend-air-viewe...
Selector:           app=frontend-air-viewer
Replicas:           3 desired | 3 updated | 3 total | 3 available | 0 unavailable
StrategyType:       Recreate
MinReadySeconds:    0
Pod Template:
  Labels:  app=frontend-air-viewer
  Containers:
   frontend-air-viewer:
    Image:      quanghung97/frontend-air-viewer:framgia2c
    Port:       3000/TCP
    Host Port:  0/TCP
    Environment:
      TZ:    Asia/Ho_Chi_Minh
    Mounts:  <none>
  Volumes:   <none>
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  <none>
NewReplicaSet:   frontend-air-viewer-67d5dd75c7 (3/3 replicas created)
Events:
  Type    Reason             Age   From                   Message
  ----    ------             ----  ----                   -------
  Normal  ScalingReplicaSet  88s   deployment-controller  Scaled up replica set frontend-air-viewer-67d5dd75c7 to 3
```

# Ingress controller config
Sơ sơ về `VirtualServer`: `VirtualServer` để định cấu hình cân bằng tải cho một tên miền

Ở phần này mình có chút yêu cầu về `Virtual server route` và `virtual server` tìm hiểu thêm [ở đây](https://docs.nginx.com/nginx-ingress-controller/configuration/virtualserver-and-virtualserverroute-resources/)

```
cd air-viewer/kubernetes/nginx-ingress
```
### Secret DNS framgia2c.mylabserver.com
```air-viewer-secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: air-viewer-secret
  namespace: air-viewer
type: Opaque
data:
  # change this to your crt and key with your DNS
  tls.crt: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURMakNDQWhZQ0NRREFPRjl0THNhWFdqQU5CZ2txaGtpRzl3MEJBUXNGQURCYU1Rc3dDUVlEVlFRR0V3SlYKVXpFTE1Ba0dBMVVFQ0F3Q1EwRXhJVEFmQmdOVkJBb01HRWx1ZEdWeWJtVjBJRmRwWkdkcGRITWdVSFI1SUV4MApaREViTUJrR0ExVUVBd3dTWTJGbVpTNWxlR0Z0Y0d4bExtTnZiU0FnTUI0WERURTRNRGt4TWpFMk1UVXpOVm9YCkRUSXpNRGt4TVRFMk1UVXpOVm93V0RFTE1Ba0dBMVVFQmhNQ1ZWTXhDekFKQmdOVkJBZ01Ba05CTVNFd0h3WUQKVlFRS0RCaEpiblJsY201bGRDQlhhV1JuYVhSeklGQjBlU0JNZEdReEdUQVhCZ05WQkFNTUVHTmhabVV1WlhoaApiWEJzWlM1amIyMHdnZ0VpTUEwR0NTcUdTSWIzRFFFQkFRVUFBNElCRHdBd2dnRUtBb0lCQVFDcDZLbjdzeTgxCnAwanVKL2N5ayt2Q0FtbHNmanRGTTJtdVpOSzBLdGVjcUcyZmpXUWI1NXhRMVlGQTJYT1N3SEFZdlNkd0kyaloKcnVXOHFYWENMMnJiNENaQ0Z4d3BWRUNyY3hkam0zdGVWaVJYVnNZSW1tSkhQUFN5UWdwaW9iczl4N0RsTGM2SQpCQTBaalVPeWwwUHFHOVNKZXhNVjczV0lJYTVyRFZTRjJyNGtTa2JBajREY2o3TFhlRmxWWEgySTVYd1hDcHRDCm42N0pDZzQyZitrOHdnemNSVnA4WFprWldaVmp3cTlSVUtEWG1GQjJZeU4xWEVXZFowZXdSdUtZVUpsc202OTIKc2tPcktRajB2a29QbjQxRUUvK1RhVkVwcUxUUm9VWTNyemc3RGtkemZkQml6Rk8yZHNQTkZ4MkNXMGpYa05MdgpLbzI1Q1pyT2hYQUhBZ01CQUFFd0RRWUpLb1pJaHZjTkFRRUxCUUFEZ2dFQkFLSEZDY3lPalp2b0hzd1VCTWRMClJkSEliMzgzcFdGeW5acS9MdVVvdnNWQTU4QjBDZzdCRWZ5NXZXVlZycTVSSWt2NGxaODFOMjl4MjFkMUpINnIKalNuUXgrRFhDTy9USkVWNWxTQ1VwSUd6RVVZYVVQZ1J5anNNL05VZENKOHVIVmhaSitTNkZBK0NuT0Q5cm4yaQpaQmVQQ0k1ckh3RVh3bm5sOHl3aWozdnZRNXpISXV5QmdsV3IvUXl1aTlmalBwd1dVdlVtNG52NVNNRzl6Q1Y3ClBwdXd2dWF0cWpPMTIwOEJqZkUvY1pISWc4SHc5bXZXOXg5QytJUU1JTURFN2IvZzZPY0s3TEdUTHdsRnh2QTgKN1dqRWVxdW5heUlwaE1oS1JYVmYxTjM0OWVOOThFejM4Zk9USFRQYmRKakZBL1BjQytHeW1lK2lHdDVPUWRGaAp5UkU9Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K
  tls.key: LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFb3dJQkFBS0NBUUVBcWVpcCs3TXZOYWRJN2lmM01wUHJ3Z0pwYkg0N1JUTnBybVRTdENyWG5LaHRuNDFrCkcrZWNVTldCUU5semtzQndHTDBuY0NObzJhN2x2S2wxd2k5cTIrQW1RaGNjS1ZSQXEzTVhZNXQ3WGxZa1YxYkcKQ0pwaVJ6ejBza0lLWXFHN1BjZXc1UzNPaUFRTkdZMURzcGRENmh2VWlYc1RGZTkxaUNHdWF3MVVoZHErSkVwRwp3SStBM0kreTEzaFpWVng5aU9WOEZ3cWJRcCt1eVFvT05uL3BQTUlNM0VWYWZGMlpHVm1WWThLdlVWQ2cxNWhRCmRtTWpkVnhGbldkSHNFYmltRkNaYkp1dmRySkRxeWtJOUw1S0Q1K05SQlAvazJsUkthaTAwYUZHTjY4NE93NUgKYzMzUVlzeFR0bmJEelJjZGdsdEkxNURTN3lxTnVRbWF6b1Z3QndJREFRQUJBb0lCQVFDUFNkU1luUXRTUHlxbApGZlZGcFRPc29PWVJoZjhzSStpYkZ4SU91UmF1V2VoaEp4ZG01Uk9ScEF6bUNMeUw1VmhqdEptZTIyM2dMcncyCk45OUVqVUtiL1ZPbVp1RHNCYzZvQ0Y2UU5SNThkejhjbk9SVGV3Y290c0pSMXBuMWhobG5SNUhxSkpCSmFzazEKWkVuVVFmY1hackw5NGxvOUpIM0UrVXFqbzFGRnM4eHhFOHdvUEJxalpzVjdwUlVaZ0MzTGh4bndMU0V4eUZvNApjeGI5U09HNU9tQUpvelN0Rm9RMkdKT2VzOHJKNXFmZHZ5dGdnOXhiTGFRTC94MGtwUTYyQm9GTUJEZHFPZVBXCktmUDV6WjYvMDcvdnBqNDh5QTFRMzJQem9idWJzQkxkM0tjbjMyamZtMUU3cHJ0V2wrSmVPRmlPem5CUUZKYk4KNHFQVlJ6NWhBb0dCQU50V3l4aE5DU0x1NFArWGdLeWNrbGpKNkY1NjY4Zk5qNUN6Z0ZScUowOXpuMFRsc05ybwpGVExaY3hEcW5SM0hQWU00MkpFUmgySi9xREZaeW5SUW8zY2czb2VpdlVkQlZHWTgrRkkxVzBxZHViL0w5K3l1CmVkT1pUUTVYbUdHcDZyNmpleHltY0ppbS9Pc0IzWm5ZT3BPcmxEN1NQbUJ2ek5MazRNRjZneGJYQW9HQkFNWk8KMHA2SGJCbWNQMHRqRlhmY0tFNzdJbUxtMHNBRzR1SG9VeDBlUGovMnFyblRuT0JCTkU0TXZnRHVUSnp5K2NhVQprOFJxbWRIQ2JIelRlNmZ6WXEvOWl0OHNaNzdLVk4xcWtiSWN1YytSVHhBOW5OaDFUanNSbmU3NFowajFGQ0xrCmhIY3FIMHJpN1BZU0tIVEU4RnZGQ3haWWRidUI4NENtWmlodnhicFJBb0dBSWJqcWFNWVBUWXVrbENkYTVTNzkKWVNGSjFKelplMUtqYS8vdER3MXpGY2dWQ0thMzFqQXdjaXowZi9sU1JxM0hTMUdHR21lemhQVlRpcUxmZVpxYwpSMGlLYmhnYk9jVlZrSkozSzB5QXlLd1BUdW14S0haNnpJbVpTMGMwYW0rUlk5WUdxNVQ3WXJ6cHpjZnZwaU9VCmZmZTNSeUZUN2NmQ21mb09oREN0enVrQ2dZQjMwb0xDMVJMRk9ycW40M3ZDUzUxemM1em9ZNDR1QnpzcHd3WU4KVHd2UC9FeFdNZjNWSnJEakJDSCtULzZzeXNlUGJKRUltbHpNK0l3eXRGcEFOZmlJWEV0LzQ4WGY2ME54OGdXTQp1SHl4Wlp4L05LdER3MFY4dlgxUE9ucTJBNWVpS2ErOGpSQVJZS0pMWU5kZkR1d29seHZHNmJaaGtQaS80RXRUCjNZMThzUUtCZ0h0S2JrKzdsTkpWZXN3WEU1Y1VHNkVEVXNEZS8yVWE3ZlhwN0ZjanFCRW9hcDFMU3crNlRYcDAKWmdybUtFOEFSek00NytFSkhVdmlpcS9udXBFMTVnMGtKVzNzeWhwVTl6WkxPN2x0QjBLSWtPOVpSY21Vam84UQpjcExsSE1BcWJMSjhXWUdKQ2toaVd4eWFsNmhZVHlXWTRjVmtDMHh0VGwvaFVFOUllTktvCi0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0tCg==
```
```
kubectl apply -f air-viewer-secret.yaml
```
### Backend Virtual Server Route
Cấu hình route của backend với prefix `/api`
```backend-virtual-server-route.yaml
apiVersion: k8s.nginx.org/v1
kind: VirtualServerRoute
metadata:
  name: backend-air-viewer
  namespace: air-viewer
spec:
  # change this to your DNS
  host: framgia2c.mylabserver.com
  upstreams:
  - name: backend-air-viewer
    service: backend-air-viewer
    port: 80
  subroutes:
  - path: /api
    action:
      pass: backend-air-viewer
```

```
kubectl apply -f backend-virtual-server-route.yaml
```

### Frontend Virtual Server Route
Cấu hình route của frontend với prefix `/`
```frontend-virtual-server-route.yaml
apiVersion: k8s.nginx.org/v1
kind: VirtualServerRoute
metadata:
  name: frontend-air-viewer
  namespace: air-viewer
spec:
  # change this to your DNS
  host: framgia2c.mylabserver.com
  upstreams:
  - name: frontend-air-viewer
    service: frontend-air-viewer
    port: 80
  subroutes:
  - path: /
    action:
      pass: frontend-air-viewer
```

```
kubectl apply -f frontend-virtual-server-route.yaml
```

### Air-viewer Virtual Server
Map các quy tắc đường dẫn cho nginx controller
```air-viewer-virtual-server.yaml
apiVersion: k8s.nginx.org/v1
kind: VirtualServer
metadata:
  name: air-viewer
  namespace: air-viewer
spec:
  # change this to your DNS
  host: framgia2c.mylabserver.com
  tls:
    secret: air-viewer-secret
  routes:
  - path: /api
    route: air-viewer/backend-air-viewer
  - path: /
    route: air-viewer/frontend-air-viewer
```

Kiểm tra `frontend-air-viewer` cũng tương tự đối với `backend-air-viewer`
```
kubectl describe virtualserverroute frontend-air-viewer -n air-viewer
```
output: 
```
Name:         frontend-air-viewer
Namespace:    air-viewer
Labels:       <none>
Annotations:  kubectl.kubernetes.io/last-applied-configuration:
                {"apiVersion":"k8s.nginx.org/v1","kind":"VirtualServerRoute","metadata":{"annotations":{},"name":"frontend-air-viewer","namespace":"air-vi...
API Version:  k8s.nginx.org/v1
Kind:         VirtualServerRoute
Metadata:
  Creation Timestamp:  2020-02-17T07:10:40Z
  Generation:          1
  Resource Version:    30179
  Self Link:           /apis/k8s.nginx.org/v1/namespaces/air-viewer/virtualserverroutes/frontend-air-viewer
  UID:                 4a2a194a-1303-42c3-812a-1d35299a1bd0
Spec:
  Host:  framgia2c.mylabserver.com
  Subroutes:
    Action:
      Pass:  frontend-air-viewer
    Path:    /
  Upstreams:
    Name:     frontend-air-viewer
    Port:     80
    Service:  frontend-air-viewer
Events:
  Type     Reason                 Age    From                      Message
  ----     ------                 ----   ----                      -------
  Warning  NoVirtualServersFound  2m31s  nginx-ingress-controller  No VirtualServer references VirtualServerRoute air-viewer/frontend-air-viewer
  Warning  NoVirtualServersFound  2m30s  nginx-ingress-controller  No VirtualServer references VirtualServerRoute air-viewer/frontend-air-viewer
  Normal   AddedOrUpdated         31s    nginx-ingress-controller  Configuration for air-viewer/frontend-air-viewer was added or updated
  Normal   AddedOrUpdated         30s    nginx-ingress-controller  Configuration for air-viewer/frontend-air-viewer was added or updated
```

Kiểm tra virtualserver air-viewer
```
kubectl describe virtualserver air-viewer -n air-viewer
```
output:
```
Name:         air-viewer
Namespace:    air-viewer
Labels:       <none>
Annotations:  kubectl.kubernetes.io/last-applied-configuration:
                {"apiVersion":"k8s.nginx.org/v1","kind":"VirtualServer","metadata":{"annotations":{},"name":"air-viewer","namespace":"air-viewer"},"spec":...
API Version:  k8s.nginx.org/v1
Kind:         VirtualServer
Metadata:
  Creation Timestamp:  2020-02-17T07:12:38Z
  Generation:          1
  Resource Version:    30469
  Self Link:           /apis/k8s.nginx.org/v1/namespaces/air-viewer/virtualservers/air-viewer
  UID:                 7867f15d-4b5e-4fad-b279-25217c7cc18c
Spec:
  Host:  framgia2c.mylabserver.com
  Routes:
    Path:   /api
    Route:  air-viewer/backend-air-viewer
    Path:   /
    Route:  air-viewer/frontend-air-viewer
  Tls:
    Secret:  air-viewer-secret
Events:
  Type    Reason          Age    From                      Message
  ----    ------          ----   ----                      -------
  Normal  AddedOrUpdated  3m12s  nginx-ingress-controller  Configuration for air-viewer/air-viewer was added or updated
  Normal  AddedOrUpdated  3m11s  nginx-ingress-controller  Configuration for air-viewer/air-viewer was added or updated
```

# Kiểm tra đối với trình duyệt truy cập
truy cập https://framgia2c.mylabserver.com/api/ chúng ta sẽ truy cập đến service backend do quy tắc prefix: `/api`

output:

![](https://images.viblo.asia/747e5c45-7ea8-4826-bc21-8479f4a5c94b.png)

truy cập https://framgia2c.mylabserver.com/vi/faq chúng ta sẽ dẫn đến info FAQ của air-viewer

output:

![](https://images.viblo.asia/bfb3da40-868b-42f0-b8fd-b20bca89f32e.png)

Hiện tại thì chúng ta chưa có client PI + sensor để thu thập dữ liệu không khí để gửi đến tên miền này, dữ liệu sẽ bị trống không được như trang http://airviewer.sun-asterisk.vn/

![](https://images.viblo.asia/de744219-cf86-463b-9396-13f129f99031.png)

**Do server dạng phục vụ mục đích học tập nên rất có thể chỉ hoạt động trong mấy tiếng rồi bị shutdown. Tên miền sẽ không truy cập được mong các bạn thông cảm**

# Một vài thí nghiệm nhỏ
### Thí nghiệm 1 (loại bỏ 1 worker node)
Chúng ta sẽ shut down worker node 2 có domain `framgia3c.mylabserver.com` tức ko ảnh hưởng đến domain hiện tại và cũng ko làm thay đổi master node. Nhận thấy rằng app vẫn chạy bình thường, kiểm tra các `pods` được dịch chuyển sang worker node 1 để gồng gánh các pods đã bị shutdown.
### Thí nghiệm 2(loại bỏ hẳn master node)
Chúng ta đang có 3 nodes, 1 master và 2 worker đang chạy và thử shutdown con master nodes. App vẫn chạy như bình thường, chỉ có chết 1 số service mà `NuxtServerInit` của `Nuxt.js` gọi API trên nền server kết nối với Flask sẽ bị chết, ngoài ra các services hay các API khác vẫn hoạt động như bình thường. Cũng giống như 1 tổ chức, leader nghỉ 1 hôm làm việc, member vẫn làm như bình thường theo lịch trình, nhưng chỉ cần thay đổi lịch trình, hay có vấn đề gì ở các member (shutdown tiếp cả worker node) lúc đó chắc chắn web của chúng ta sẽ bị chết. Do các `pods` sẽ không được điều phối nữa vì master node không còn quản lý hoạt động.

**Qua 2 thí nghiệm trên rút ra được zero downtime của kubernetes nó mạnh đến cỡ nào**

# Kết thúc
Việc triển khai này cũng sẽ vẫn chưa đầy đủ, ngoài ra chúng ta cần kết hợp các công cụ khác của DevOps khác để quản lý các monitor, logs... thu thập phân tích báo cáo các logs tình trạng cuả hệ thống, rất nhiều thứ khác mà đến mình còn đang rất mung lung. Hứa hẹn sẽ đến với bài viết tương lai sau