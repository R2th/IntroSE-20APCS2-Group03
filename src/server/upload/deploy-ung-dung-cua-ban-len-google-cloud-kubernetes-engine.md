# Mở đầu
Bài viết này mình chia sẻ cách đóng gói ứng dụng trong một *image* của Docker và chạy *image* đó trên Google Kubernetes Engine cluster sử dụng Load-Balanced để có thể scale theo nhu cầu của người dùng.

# Mục tiêu
Để đóng gói và deploy ứng dụng của bạn trên GKE, bạn phải:

1. Gói ứng dụng của bạn thành *image* của Docker
2. Chạy *image* trên máy local của bạn (tùy chọn)
3. Tải *image* lên Registry
4. Tạo một Cluster trên Kubernetes Engine
5. Deploy ứng dụng của bạn lên Cluster
6. Expose ứng dụng của bạn ra Internet
7. Deploy một phiên bản mới của ứng dụng của bạn 

Một vài yêu cầu trước khi bắt đầu:

1. Thực hiện các bước sau để bật API Kubernetes Engine:
    * Truy cập trang [Kubernetes Engine page](https://console.cloud.google.com/projectselector/kubernetes?_ga=2.75767829.-1409758357.156040988) trong Google Cloud Platform Console.
    * Tạo hoặc chọn một dự án.
    * Đợi API và các dịch vụ liên quan được bật.
    * Đảm bảo rằng thanh toán được bật cho dự án Google Cloud Platform của bạn.

2. Cài đặt Google Cloud Shell:
    * Cài đặt [Google Cloud SDK](https://cloud.google.com/sdk/docs/quickstarts)
    * Sử dụng công cụ dòng lệnh *gcloud*, cài đặt công cụ dòng lệnh Kubernetes. *kubectl* được sử dụng để liên lạc với Kubernetes
    * Cài đặt [Docker](https://docs.docker.com/engine/installation/). Bạn sẽ sử dụng Docker để đóng gói ứng dụng của bạn trong một *image*.

# Bước 1: Xây dựng image 
Để xây dựng *image* Docker, bạn cần có một ứng dụng và *Dockerfile*.

Đối với bài viết này, bạn sẽ triển khai một ứng dụng web mẫu có tên docker-demo, một web server được viết bằng Nestjs sử dụng Graphql.


Tải mã nguồn *docker-demo*:

```
cd docker-demo
```

Đặt biến môi trường **PROJECT_ID** cho id của dự án GCP của bạn. Biến này sẽ được sử dụng để liên kết *image* với [Container Registry](https://cloud.google.com/container-registry) của dự án của bạn.
```
export PROJECT_ID=[PROJECT_ID]
```

Để xậy dựng *image* chứa ứng dụng này và gắn thẻ để tải lên, hãy chạy lệnh sau:
```
docker build -t gcr.io/${PROJECT_ID}/docker-demo:v1.0 .
```

Lệnh này chỉ cho Docker xây dựng một image bằng cách sử dụng *Dockerfile* trong thư mục hiện tại và gắn thẻ nó với một tên, chẳng hạn như *gcr.io/${PROJECTID}/docker-demo:v1.0*. Tiền tố *gcr.io* đề cập đến [Google Container Registry,](https://cloud.google.com/container-registry) nơi *image* sẽ được lưu trữ. Lưu ý chạy lệnh trên *image* vẫn chưa được tải lên.

Bạn có thể chạy lệnh *docker images* để xác minh rằng quá trình xây dựng đã thành công:
```
docker images
```
Kết quả:
```
REPOSITORY                           TAG                 IMAGE ID            CREATED              SIZE
gcr.io/${PROJECT_ID}/docker-demo     v1.0                1111111        About a minute ago   339MB
```
# Bước 2: Upload image
Bạn cần tải *image* lên một Registry để GKE có thể tải xuống và chạy nó.

Bạn có thể sử dụng công cụ dòng lệnh *docker* để tải *image* lên [Container Registry](https://cloud.google.com/container-registry)  của mình:
```
docker push gcr.io/${PROJECT_ID}/docker-demo:v1.0
```
# Bước 3: Chạy Image (local - Tuỳ chọn)
Để kiểm tra *image* của bạn bằng công cụ *docker* của bạn, hãy chạy lệnh sau:
```
docker run --rm -p 3000:3000 gcr.io/${PROJECT_ID}/docker-demo:v1.0
```

Truy cập http://localhost:3000 sẽ thấy *"Hello World!"* để xác minh xem *image* có hoạt động không.

Khi bạn đã thấy phản hồi thành công, bạn có thể tắt ứng dụng bằng cách nhấn `Ctrl + C` trong tab docker đang chaỵ.

# Bước 4: Tạo cluster
Bây giờ *image* được lưu trữ trong Registry, bạn cần tạo một Cluster để chạy *image*.

Khi bạn đã tạo một cụm GKE, bạn sử dụng Kubernetes để triển khai các ứng dụng đến Cluster và quản lý vòng đời của ứng dụng.

Đặt *project id* cho công cụ *gcloud*:
```
gcloud config set project $PROJECT_ID
gcloud config set compute/zone asia-northeast1
```


Chạy lệnh sau để tạo Cluster với 2 Node có tên *docker-demo-cluster*:
```
gcloud container clusters create docker-demo-cluster --num-nodes=2
```
Khi lệnh đã hoàn thành, hãy chạy lệnh sau để xác nhận thành công hay không.
```
gcloud container clusters get-credentials docker-demo-cluster
```
Kết quả:
```
Fetching cluster endpoint and auth data.
kubeconfig entry generated for docker-demo-cluster.
```

# Bước 5: Deploy ứng dụng
Để deploy và quản lý các ứng dụng trên Cluster của GKE, bạn sử dụng công cụ dòng lệnh *kubectl*.

Kubernetes đại diện cho các ứng dụng dưới dạng Pods. Trong bài viết này, mỗi Pod chỉ chứa  một *container* ứng dụng của bạn.

Chạy lệnh sau để deploy ứng dụng của bạn:
```
kubectl create deployment docker-demo --image=gcr.io/${PROJECT_ID}/docker-demo:v1.0
```

Để xem Pod được tạo, hãy chạy lệnh sau:
```
kubectl get pods
```
Kết qủa:
```
NAME                            READY   STATUS              RESTARTS   AGE
docker-demo-568ddd7ccb-11g3s   1/1     Running             0          108s
```

# Bước 6: Đưa ứng dụng của bạn lên Internet
Theo mặc định, các *container* bạn chạy trên GKE không thể truy cập được từ Internet, vì chúng không có địa chỉ IP bên ngoài. Bạn phải *expose* rõ ràng ứng dụng của mình để  truy cập từ Internet, chạy lệnh sau:
```
kubectl expose deployment docker-demo --type=LoadBalancer --port 80 --target-port 3000
```

Lệnh trên tạo ra resource [Service](https://kubernetes.io/docs/concepts/services-networking/service/), cung cấp hỗ trợ mạng và IP cho các Pods của ứng dụng của bạn. GKE tạo một IP bên ngoài và Load Balancer cho ứng dụng của bạn.

`--port` chỉ định số cổng được định cấu hình trên Load Balancer và `--target-port` chỉ định số cổng mà bộ chứa ứng dụng của bạn đang nghe.

Bạn có thể kiểm tra Service bằng lệnh *kubectl get service*:
```
kubectl get service
```
Kết quả:
```
NAME           TYPE           CLUSTER-IP     EXTERNAL-IP    PORT(S)          AGE
docker-demo   LoadBalancer   11.11.111.92   35.111.234.9   80:32081/TCP   78s
```

Hãy sao chép địa chỉ **EXTERNAL-IP** . Bây giờ bạn có thể truy cập ip này (chẳng hạn như http://35.111.234.9) để kiểm tra xem ứng dụng của bạn có truy cập được không.

# Bước 7: Triển khai phiên bản mới của ứng dụng của bạn
Cơ chế cập nhật cuộn của GKE đảm bảo rằng ứng dụng của bạn vẫn hoạt động và khả dụng ngay cả khi hệ thống thay thế các thể hiện của *image* cũ của bạn bằng cái mới trên tất cả các bản sao đang chạy.

Bạn có thể tạo một *image* với phiên bản v2.0 của ứng dụng của mình bằng cách xây dựng cùng một mã nguồn và gắn thẻ nó là v2.0 (hoặc bạn có thể thay đổi chuỗi "Hello, World!" Thành "Hello, GKE!" Trước khi xây dựng *image*):
```
docker build -t gcr.io/${PROJECT_ID}/docker-demo:v2.0 .
```

Sau đó đẩy *image* lên Google Container Registry:
```
docker push gcr.io/${PROJECT_ID}/docker-demo:v2.0
```

Bây giờ, áp dụng triển khai hiện có với bản cập nhật *image*:
```
kubectl set image deployment/docker-demo docker-demo=gcr.io/${PROJECT_ID}/docker-demo:v2.0
```

Truy cập lại ứng dụng của bạn tại http://[EXTERNAL_IP] và quan sát những thay đổi bạn đã thực hiện.

# Dọn dẹp
Xoá Service: 
```
kubectl delete service docker-demo
```
Xoá Cluster:
```
gcloud container clusters delete docker-demo-cluster
```
# Tham khảo
https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app