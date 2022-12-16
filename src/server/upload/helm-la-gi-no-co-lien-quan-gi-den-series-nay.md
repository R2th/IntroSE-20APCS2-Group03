> Helm là một trình quản lý gói và công cụ quản lý ứng dụng cho Kubernetes, gói nhiều tài nguyên Kubernetes vào một đơn vị triển khai logic duy nhất được gọi là **Chart**

Với mục đích deploy air-viewer sử dụng helm, bài viết lần này chỉ giới thiệu về helm và deploy Nginx với Helm
# Lợi ích từ Helm
* Deployment đơn giản hơn mang tính chất lặp lại với chỉ vài câu lệnh ngắn
* Quản lý sự phụ thuộc của ứng dụng với các version cụ thể
* Thực hiện nhiều deployment với các môi trường khác nhau như: test, staging, production ...
* Thực thi các jobs liên quan đến chạy ứng dụng trước khi deployment
* Dễ dàng update rollback và test deployment khi có vấn đề xảy ra hay muốn cập nhật phiên bản mới (zero downtime server)
# Cài đặt Helm CLI
```bash
curl -sSL https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash
```

check version
```bash
helm version --short
```

Tải các kho lưu trữ Chart 
```bash
helm repo add stable https://kubernetes-charts.storage.googleapis.com/
```

```bash
helm search repo stable
```

kết quả như hình:
![](https://images.viblo.asia/415f963a-cba4-4214-90ae-bc453668cbda.png)

như các bạn thấy rất nhiều repo stable để cài đặt.

# Deploy Nginx với Helm

## Cập nhật các repo
Để đảm bảo đã có đủ các repo stable có sẵn chúng ta sẽ chạy lệnh sau
```bash
helm repo update
```
![](https://images.viblo.asia/06442608-5a6d-4d43-813c-7b719df744b5.png)

## Tìm kiếm repo Nginx
```bash
helm search repo nginx
```
![](https://images.viblo.asia/3a8e572a-a4eb-414f-bea2-71c421408d76.png)

ở trên chúng ta có thể sử dụng nginx-ingress được config tích hợp sẵn với kubernetes. 
Đến đoạn này mình chỉ giới thiệu qua vì mình ko dùng nginx-ingress của helm stable.
Cài đặt nginx-ingress thông tin chi tiết thêm : https://github.com/helm/charts/tree/master/stable/nginx-ingress
```bash
helm install demo stable/nginx-ingress
```
còn chúng ta muốn xóa nginx-ingress với helm
```bash
helm uninstall demo
```

## Tự tạo chart nginx cho riêng mình và deploy chúng

### create chart
chúng ta sẽ có 1 cấu trúc thư mục như sau
```
/example-project
    /Chart.yaml # mô tả của chart
    /values.yaml # các giá trị mặc định, chúng ta có thể thay đổi trong khi cài đặt hay nâng cấp project của chúng ta
    /charts/ # subcharts
    /templates/ # template file
```
Bằng việc chạy lệnh
```bash
helm create example-project
```
![](https://images.viblo.asia/a8060d96-2014-4eb3-be64-c5c7c61be634.png)

### tùy chỉnh lại theo ý mình
trước khi tùy chỉnh chúng ta sẽ xem xét qua các nội dung của file
ở phần `templates` chúng ta có các file như:
* `deployment.yaml` deployment với kubernetes
* `_helpers.tpl` mẫu có sẵn có thể tái sử dụng trong chart
* `ingress.yaml` liệt kê triển khai các quyền để ứng dụng của bạn truy cập được kubernetes
* `serviceaccount.yaml` tạo tài khoản cho service mình dùng phần này có ví dụ cài đặt ingress-nginx ở 2 bài trước đó
* `service.yaml` triển khai các deployment với các service
* `tests/` thư mục chứa các testing về chart

chúng ta sẽ tự tạo chart từ đầu và chúng ta sẽ xóa các mục sau:
```bash
rm -rf example-project/templates/
rm -rf example-project/Chart.yaml
rm -rf example-project/values.yaml
```

Tiếp theo chúng ta sẽ mô tả chart theo ý mình thích
```bash
cat <<EoF > example-project/Chart.yaml
apiVersion: v2
name: example-project
description: A Helm chart for Kubernetes Microservices application
version: 0.1.0
appVersion: 1.0
EoF
```

Sau đó, chúng ta sẽ tạo các `deployment` và `service` đơn giản bên trong templates

```bash
#tạo subfolders
mkdir -p example-project/templates/deployment
mkdir -p example-project/templates/service
```

Có 1 chút khác biệt so với deployment thông thường là có config `{{ .Values.replicas }}` hay `{{ .Values.hello.image }}:{{ .Values.version }}` được maping đến `values.yaml` sẽ khai báo sau

```templates/deployment/coffee-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: coffee
spec:
  replicas: {{ .Values.replicas }}
  selector:
    matchLabels:
      app: coffee
  template:
    metadata:
      labels:
        app: coffee
    spec:
      containers:
      - name: coffee
        image: {{ .Values.hello.image }}:{{ .Values.version }}
        ports:
        - containerPort: 80
```

```templates/service/coffee-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: coffee-svc
spec:
  ports:
  - port: 80
    targetPort: 80
    protocol: TCP
    name: http
  selector:
    app: coffee
```

Tạo `values.yaml`
```bash
cat <<EoF > example-project/values.yaml
# Default values for example-project.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

# Release-wide Values
replicas: 3
version: 'plain-text'

# Service Specific Values
hello:
  image: nginxdemos/hello
EoF
```

### Deploy example-project Chart
Trước khi deployment chúng ta sẽ test Chart để xác nhận các config của chúng ta là chính xác
```bash
helm install --debug --dry-run example-project example-project
```
![](https://images.viblo.asia/2dcf4320-68e4-4638-bb6d-1f004d8fd77e.png)

Chúng ta sẽ deploy
```bash
helm install example-project example-project
```

![](https://images.viblo.asia/68a9c338-9d39-43fc-af1a-8e9f4ad0aa97.png)

Chúng ta kiểm tra các status của svc,deployment, pod
```bash
kubectl get svc,po,deploy
```

Chúng ta sẽ test thử nội dung cuả nginx này
```bash
kubectl describe svc coffee-svc
```

![](https://images.viblo.asia/81e3f53a-5bdb-4966-a08e-7bfe3dc059d1.png)

```bash
#chúng ta có 3 cái pods khác nhau, truy cập thử 1 cái
curl 10.244.1.16:80
```
![](https://images.viblo.asia/2e8bc843-5411-4f23-a090-991b97c738c3.png)

## Lợi ích của việc sử dụng helm qua ví dụ minh họa
Giả sử chúng ta update example-project của chúng ta với image không tồn tại vì 1 lý do nào đó thành `nginxdemos/hello-non-existing`
và cập nhật phiên bản mới của project của chúng ta
```bash
helm upgrade example-project example-project
```
![](https://images.viblo.asia/1f38fe62-472b-40da-9f2a-9680aac68b41.png)

Kubernetes sẽ tạo pod khác với image mới đó nhưng có lỗi là `ImagePullBackOff`. Vậy chúng ta phải Rollback lại phiên bản

![](https://images.viblo.asia/6bd8b833-7eba-4ff1-babe-b0c770332a71.png)

```bash
helm history example-project
```

![](https://images.viblo.asia/ed6d6a04-6c34-40c3-8490-2c1832d6ad1d.png)

Rollback:
```bash
helm rollback example-project 1
```

lỗi không còn nữa
![](https://images.viblo.asia/6a4306d4-2913-4b8b-b90b-93f252ddf5c5.png)


## Xóa example-project
Việc uninstall cũng nhanh không kém cạnh. Chúng ta không cần phải chạy 1 số câu lệnh lần lượt để delete svc, deployment, ingress, secret để xóa, mọi thứ chỉ 1 câu lệnh

```bash
helm uninstall example-project
```

# Kết luận
Bài viết mang tính chất tìm hiểu cơ bản về helm, ngoài ra còn nhiều chức năng khác làm việc khá hiệu quả với kubernetes, giúp devOps đỡ vất vả hơn khoản deploy sản phẩm của mình. Tiếp theo mình sẽ deploy air-viewer ở bài trước sử dụng helm.