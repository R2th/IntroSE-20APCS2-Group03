Confluent Kafka giúp dễ dàng kết nối các ứng dụng, hệ thống của bạn với các luồng dữ liệu và xử lý chúng theo thời gian thực. Confluent Platform cung cấp giải pháp để triển khai các cluster Kafka trên Docker và Kubernetes đơn giản hơn so với Apache Kafka
# Điều kiện tiên quyết
* `Kubectl` và `Helm 3` đã được cài đặt
* Đối với bài hướng dẫn này, cluster Kubernetes của bạn được giả định đã có một [default dynamic storage provisioner](https://kubernetes.io/docs/concepts/storage/dynamic-provisioning/).
Dùng lệnh `kubectl get sc` để kiểm tra xem cluster Kubernetes đã có default dynamic storage provisioner hay chưa.

![image.png](https://images.viblo.asia/df6ae988-dc84-47a0-bc70-2c5b30906cea.png)

# Bước 1: Tạo một namespace
```
kubectl create namespace confluent
```
Set namespace confluent thành namespace mặc định 
```
kubectl config set-context --current --namespace confluent
```

# Bước 2: Cài đặt Confluent Platform cho Kubernetes
Thêm Confluent vào Helm repository.
```
helm repo add confluentinc https://packages.confluent.io/helm
helm repo update
```
Cài đặt Confluent Platform sử dụng `helm`
```
helm upgrade --install confluent-operator confluentinc/confluent-for-kubernetes
```
Hãy chắc chắn rằng Operator đã running và ready trước khi đi đến bước tiếp theo
```
kubectl get pods
```

![image.png](https://images.viblo.asia/54495fb8-3290-4b33-9a03-d4b7636904de.png)

# Bước 3: Cài đặt các components của Confluent Platform
Các components của Confluent Platform bao gồm:
* Zookeepers
* Kafka Brokers
* Kafka Connectors
* KsqlDB
* Control Center (Kafka Web UI)
* Schema Registry
* Kafka Rest Proxy

```
kubectl apply -f https://raw.githubusercontent.com/confluentinc/confluent-kubernetes-examples/master/quickstart-deploy/confluent-platform.yaml
```

Cài đặt một producer app và tạo topic để test.
```
kubectl apply -f https://raw.githubusercontent.com/confluentinc/confluent-kubernetes-examples/master/quickstart-deploy/producer-app-data.yaml
```

Kiểm tra mọi thứ đã Running và Ready hay chưa:
```
kubectl get pods
```

![image.png](https://images.viblo.asia/83280f4e-ac3f-48ae-8201-9737e8ee5147.png)

# Bước 4: Tạo External Load balancer cho Control Center
Tạo một file control-center.yaml với nội dung như sau:
```
apiVersion: v1
kind: Service
metadata:
  name: kafka-ui-lb
spec:
  type: LoadBalancer
  sessionAffinity: None
  selector:
    app: controlcenter
  ports:
    - name: kafka-ui-lb
      port: 9021
      protocol: TCP
      targetPort: 9021
```

Dùng kubectl để apply file cấu hình và kiểm tra xem Load balancer đã được tạo thành công hay chưa
```
kubectl apply -f control-center.yaml

kubectl get svc
```

![image.png](https://images.viblo.asia/2d3c9cee-a7f7-4074-a64b-4ad66ae040bd.png)

Mở Web Browser và truy cập đến địa chỉ <External-IP>:9021

![image.png](https://images.viblo.asia/6d2b118e-0156-4cdd-89e4-a21f95cc5876.png)
    
# Giới thiệu sơ qua về Control Center:
    
Đây là giao diện chính:
![image.png](https://images.viblo.asia/0d7fc730-aa7f-43b3-8316-0fb19856d48e.png)

Brokers: Theo dõi tình trạng của các nút Brokers 
![image.png](https://images.viblo.asia/180f98de-b1a1-43f1-84b6-7cd0a57a7c4b.png)
    
Topics: Xem lại các Topic đã tạo, xem msg bên trong từng Topic, Produce msg
![image.png](https://images.viblo.asia/812f4334-cb64-4b79-8f9a-464a5d9acc90.png)
    
![image.png](https://images.viblo.asia/979e041f-e3d1-48ee-bb9f-180d103c27d4.png)
 
Connect: Quản lý các source, sink connectors 
![image.png](https://images.viblo.asia/7f5ab1b5-05cd-484d-87bb-d017de9406df.png)

KsqlDB: Xử lý các tác vụ liên quan đến Kafka Stream
![image.png](https://images.viblo.asia/27c92d69-1ec8-4190-847b-8142592282c8.png)