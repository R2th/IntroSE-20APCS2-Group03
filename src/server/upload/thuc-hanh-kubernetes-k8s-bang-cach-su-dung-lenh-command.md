Bài hướng dẫn hôm nay sẽ hướng dẫn sử dụng K8S bằng cách sử dụng câu lệnh thay vì UI trên web. 
Có rất nhiều ưu điểm, tránh phụ thuộc quá nhiều vào giao diện web.
Có 2 lựa chọn để thực hiện:
* Sử dụng **Cloud Shell**
+ Active cloud shell theo hướng dẫn [này](https://cloud.google.com/shell/docs/using-cloud-shell) 
+ Trong cloud shell đã có sẵn **gcloud** và **kubectl** (Kubernetes command-line tool)

* Sử dụng **Command-line tools locally **
+ Install gcloud cho máy local của bạn tại [đây](https://cloud.google.com/sdk/docs/quickstart) 
+ Sử dụng gcloud cài **kubectl**
```
gcloud components install kubectl
```
Nếu trong quá trình cài bị lỗi, có thể theo hướng dẫn [này](https://kubernetes.io/vi/docs/tasks/tools/install-kubectl/)
+ Cài [Docker](https://docs.docker.com/engine/installation/) ở máy local 
+ Cài [Git ](https://git-scm.com/downloads)

Các bước chuẩn bị đã xong, bây giờ vào phần chính.
1. Cấu hình các tham số mặc định của google-cloud
```
gcloud init
```
theo hướng bạn chọn các thông số phù hợp
- Đăng nhập google account cho lần đầu
- Chọn default project
- Chọn default zone (chứa default region) trong ví dụ này mình chọn zone **us-central1-a** nằm trong **us-central1**

Sau khi config xong banj cos thể xem lại thông tin của mình 

```
gcloud config list
```

sẽ có kết quả như sau  (*** là mình che thông tin cá nhân)
```
[compute]
region = us-central1
zone = us-central1-a
[core]
account = ***@gmail.com
disable_usage_reporting = True
project = ***

```
2. Tạo 1 cluster, trong ví dụ này mình sẽ tạo autopilot cluster, **my-cluster** là tên của cluster

```
gcloud container clusters create-auto my-cluster --region us-central1
```

Chờ khoẳng 5p để hệ thống tạo cluster
3. Connect cluster
```
gcloud container clusters get-credentials my-cluster --region us-central1

message 
Fetching cluster endpoint and auth data.
kubeconfig entry generated for my-cluster.
```

4. Tạo deployment từ sample image : nginx:latest lấy từ dockerhub
```
kubectl create deployment hello-app --image=nginx:latest
deployment.apps/hello-app created

```

5. Tạo HorizontalPodAutoscaler cho deployment, giúp auto scale (dự vào % sử dụng CPU, hệ thống sẽ tự động scale)
```
kubectl autoscale deployment hello-app --cpu-percent=80 --min=1 --max=5
```

Có thể kiểm tra các Pods được tạo 
```
kubectl get pods
```

6. Các pod được tạo ra, chạy trên mạng nội bộ, cần phải cho phép bên ngoài có thể sử dụng được các service này.
Chúng ta đi đến bước tạo service. 
Do nginx chạy port 80 nên **--target-port = 80**
Mở liên kế từ bên ngoài, port 8080 **--port 8080**
Kiểu expose LoadBalancer (khi ta có nhiều pod, các request sẽ được phân chia vào các pod)
```
kubectl expose deployment hello-app --name=hello-app-service --type=LoadBalancer --port 8080 --target-port 80
```

7. Kiểm tra các service đã được tạo

```
kubectl get service
```

output
```
NAME                TYPE           CLUSTER-IP    EXTERNAL-IP   PORT(S)          AGE
hello-app-service   LoadBalancer   10.62.1.116   <pending>     8080:31699/TCP   29s
kubernetes          ClusterIP      10.62.0.1     <none>        443/TCP          49m
```

Ban đầu **external-ip** là <pending> chờ 1 chút. check lại, hệ thống sẽ khởi tạo và gán external ip cho service, khi đó việc tạo service sẽ thực hiện được.
```
NAME                TYPE           CLUSTER-IP    EXTERNAL-IP     PORT(S)          AGE
hello-app-service   LoadBalancer   10.62.1.116   35.184.165.64   8080:31699/TCP   25m
kubernetes          ClusterIP      10.62.0.1     <none>          443/TCP          73m
```

Trong trường hợp của mình, mình đã có thể truy cập vào web
http://35.184.165.64:8080/

8. Khi muốn update version mới của image **new_image**
```
kubectl set image deployment/hello-app nginx=nginx:1.16.1
```

9. Khi không sử dụng có thể delete service và cluster
```
kubectl delete service hello-app-service
gcloud container clusters delete hello-cluster --region us-central1    
```