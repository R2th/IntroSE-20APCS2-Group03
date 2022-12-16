Link bài viết gốc - [Kubernetes Practice - Automating Blue/Green Deployment with Argo Rollouts](https://devopsvn.tech/kubernetes-practice/automating-bluegreen-deployment-with-argo-rollouts)

Ở bài trước chúng ta đã tìm hiểu cách triển khai Blue/Green Deployment bằng cách thủ công. Ở bài này chúng ta sẽ cùng tìm hiểu cách tự động hóa quá trình triển khai Blue/Green Deployment với Argo Rollouts.

![](https://images.viblo.asia/dcbb1785-bfa7-4796-bcfd-d72dc4493804.png)

Đừng nhầm lẫn ArgoCD với Argo Rollout vì chúng là hai dự án khác nhau.

## Argo Rollouts
Argo Rollouts là một Custom Resource Definitions (CRDs) mà cung cấp một số tính năng nâng cao cho việc triển khai ứng dụng lên trên Kubernetes so với Deployment thông thường. Argo Rollouts cho phép ta thực hiện triển khai ứng dụng theo kiểu blue-green, canary, canary analysis một cách rất dễ dàng.

![](https://images.viblo.asia/3a3b5eb2-5e32-4a35-a6bd-15e38a666c57.png)

Để sử dụng Argo Rollouts thì trước tiên ta cần cài đặt nó vào trong Kubernetes Cluster, cài đặt Argo Rollouts khá đơn giản, chạy các câu lệnh sau.

```sh
kubectl create namespace argo-rollouts

namespace/argo-rollouts created
```

```sh
kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml

customresourcedefinition.apiextensions.k8s.io/analysisruns.argoproj.io created
customresourcedefinition.apiextensions.k8s.io/analysistemplates.argoproj.io created
customresourcedefinition.apiextensions.k8s.io/clusteranalysistemplates.argoproj.io created
customresourcedefinition.apiextensions.k8s.io/experiments.argoproj.io created
customresourcedefinition.apiextensions.k8s.io/rollouts.argoproj.io created
serviceaccount/argo-rollouts created
clusterrole.rbac.authorization.k8s.io/argo-rollouts created
clusterrole.rbac.authorization.k8s.io/argo-rollouts-aggregate-to-admin created
clusterrole.rbac.authorization.k8s.io/argo-rollouts-aggregate-to-edit created
clusterrole.rbac.authorization.k8s.io/argo-rollouts-aggregate-to-view created
clusterrolebinding.rbac.authorization.k8s.io/argo-rollouts created
secret/argo-rollouts-notification-secret created
service/argo-rollouts-metrics created
deployment.apps/argo-rollouts created
```

Kiểm tra xem ta cài thành công chưa.

```
kubectl get pod -n argo-rollouts
```

```
NAME                             READY   STATUS    RESTARTS   AGE
argo-rollouts-76fcfc8d7f-k6mth   1/1     Running   0          58s
```

## Argo Rollouts Deployment Strategy
Để sử dụng Argo Rollouts thì ta sẽ khai báo cấu hình với thuộc tính *apiVersion* là `argoproj.io/v1alpha1` và thuộc tính *kind* là `Rollout`.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
```

Cấu hình của Argo Rollouts có thuộc tính *strategy* để ta chọn chiến lược triển khai mà ta muốn, có hai giá trị là `blueGreen` và `canary`. Chi tiết các bạn xem ở đây [Rollout Specification](https://argoproj.github.io/argo-rollouts/features/specification/),  **các bạn chỉ cần xem sơ qua thôi chứ không cần hiểu hết nhé.**

Ở bài này ta sẽ tìm hiểu về blue/green.

## Practice
Ở bài này ta sẽ thực hành trên môi trường minikube. Tạo một file tên là `bluegreen-rollout.yaml`.

```bluegreen-rollout.yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: bluegreen-demo
  labels:
    app: bluegreen-demo
spec:
  replicas: 2
  revisionHistoryLimit: 1
  selector:
    matchLabels:
      app: bluegreen-demo
  template:
    metadata:
      labels:
        app: bluegreen-demo
    spec:
      containers:
        - name: bluegreen-demo
          image: argoproj/rollouts-demo:green
          imagePullPolicy: Always
          ports:
            - name: http
              containerPort: 8080
              protocol: TCP
  strategy:
    blueGreen:
      autoPromotionEnabled: false
      activeService: bluegreen-demo
      previewService: bluegreen-demo-preview
```

Toàn bộ thuộc tính của Rollout đều giống với Deployment bình thường, chỉ khác ở thuộc tính *strategy*. Ở trên ta khai báo 3 thuộc tính là:
+ `autoPromotionEnabled: false` - khi ta cập nhật lại cấu hình Rollout ở trường `spec.template.spec`, ví dụ thay đổi image với phiên bản mới, thì ta không cho phép Rollout tự động switch traffic từ phiên bản cũ sang phiên bản mới một cách tự động mà cần ta xác nhận, xong nếu ta cần switch thì ta mới switch
+ `activeService: bluegreen-demo` - ta chọn Service cho phiên bản hiện tại của ứng dụng là bluegreen-demo
+ `previewService: bluegreen-demo-preview` - ta chọn Service cho phiên bản mới của ứng dụng là bluegreen-demo-preview

Tiếp theo ta tạo file tên là `service.yaml` để khai báo hai Service ở trên.

```service.yaml
apiVersion: v1
kind: Service
metadata:
  name: bluegreen-demo
  labels:
    app: bluegreen-demo
spec:
  type: NodePort
  selector:
    app: bluegreen-demo
  ports:
    - port: 80
      targetPort: http
      protocol: TCP
      name: http

---
apiVersion: v1
kind: Service
metadata:
  name: bluegreen-demo-preview
  labels:
    app: bluegreen-demo
spec:
  type: NodePort
  selector:
    app: bluegreen-demo
  ports:
    - port: 80
      targetPort: http
      protocol: TCP
      name: http
```

Ngoài tên ra thì thuộc tính của hai Service đều giống nhau. Tiếp theo ta tiến hành tạo Rollout.

```
kubectl apply -f bluegreen-rollout.yaml

rollout.argoproj.io/bluegreen-demo created
```

```
kubectl get rollout

NAME             DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
bluegreen-demo   2         2         2            2           30s
```

Khi ta tạo Rollout thì ở bên dưới Argo Rollouts sẽ tạo cho ta một thằng *ReplicaSet*.

```
kubectl get rs

NAME                       DESIRED   CURRENT   READY   AGE
bluegreen-demo-fbc7b7f55   2         2         2       4m37s
```

```
kubectl get pod

NAME                             READY   STATUS    RESTARTS   AGE
bluegreen-demo-fbc7b7f55-g6fst   1/1     Running   0          37s
bluegreen-demo-fbc7b7f55-vvdth   1/1     Running   0          37s
```

Sau khi kiểm tra ReplicaSet và Pod đều đã chạy thanh công thì ta tạo Service.

```
kubectl apply -f service.yaml

service/bluegreen-demo created
service/bluegreen-demo-preview created
```

Lúc này thì cả hai Service là bluegreen-demo và bluegreen-demo-preview đều trỏ về chung ReplicaSet là `bluegreen-demo-fbc7b7f55`, ta kiểm tra bằng cách truy cập vào hai Service trên. Nếu các bạn chạy minikube thì ta lấy địa chỉ như sau:

```
minikube service bluegreen-demo --url
172.26.123.245:30000
```

```
minikube service bluegreen-demo-preview --url
172.26.123.245:30001
```

Mở browser và truy cập hai địa chỉ trên, ta sẽ thấy UI như bên dưới.

![](https://images.viblo.asia/1187d9ad-13d0-479f-8159-6e5c23250204.png)

Giờ ta sẽ sửa thuộc tính image của Rollout thành blue.

```bluegreen-rollout.yaml
...
spec:
  containers:
    - name: bluegreen-demo
      image: argoproj/rollouts-demo:blue
...
```

Cập nhật lại Rollout.

```
kubectl apply -f bluegreen-rollout.yaml

rollout.argoproj.io/bluegreen-demo configured
```

Lúc này Argo Rollouts sẽ tạo cho ta một thằng ReplicaSet mới cho cấu hình mới.

```
kubectl get rs

bluegreen-demo-7d6459646d   2         2         2       2m11s
bluegreen-demo-fbc7b7f55    2         2         2       41m
```

```
kubectl get pod

NAME                              READY   STATUS    RESTARTS   AGE
bluegreen-demo-7d6459646d-2zm56   1/1     Running   0          2m13s
bluegreen-demo-7d6459646d-xz9bj   1/1     Running   0          2m13s
bluegreen-demo-fbc7b7f55-g6fst    1/1     Running   0          41m
bluegreen-demo-fbc7b7f55-vvdth    1/1     Running   0          41m
```

Sau đó Argo Rollouts sẽ cập nhật lại `bluegreen-demo-preview` Service chỉa tới thằng ReplicaSet mới, truy cập địa chỉ của `bluegreen-demo-preview` Service ta sẽ thấy UI khác.

![](https://images.viblo.asia/d25288eb-a910-416d-a8bb-afcb9c2a22cc.png)

Còn thằng `bluegreen-demo` Service vẫn như cũ.

![](https://images.viblo.asia/1187d9ad-13d0-479f-8159-6e5c23250204.png)

Sau khi ta kiểm tra phiên bản mới của ứng dụng và thấy tất cả đều ổn, ta sẽ tiến hành switch traffic, chạy câu lệnh sau **(các bạn đừng làm theo nhé, ta sẽ dùng cách khác)**.

```
kubectl argo rollouts promote bluegreen-demo

rollout 'bluegreen-demo' promoted
```

Lúc này Argo Rollouts sẽ cập nhật lại `bluegreen-demo` Service chỉa tới thằng ReplicaSet mới, sau đó nó sẽ xóa thằng ReplicaSet cũ đi (mặc định là 30 giây).

## UI Dashboard
Thuông thường nhiệm vụ switch traffic không phải là công việc của DevOps, nhiệm vụ của ta chỉ là dựng CI/CD để có thể cập nhật được Rollout khi có phiên bản mới của ứng dụng.

Còn việc kiểm tra phiên bản mới đã chạy ổn chưa và tiến hành switch traffic là của QC, nhưng QC không thể chạy câu CLI được nên ta cần phải có dashboard cho QC làm việc này. May là Argo Rollout có cung cấp cho ta một dashboard, ta có thể bật dashboard bằng kubectl hoặc dùng image `quay.io/argoproj/kubectl-argo-rollouts`.

```
kubectl argo rollouts dashboard

INFO[0000] Argo Rollouts Dashboard is now available at localhost 3100
```

Truy cập vào `localhost:3100` ta sẽ thấy dashboard của Argo Rollouts.
 
 ![](https://images.viblo.asia/88a2c897-5282-4ec1-8430-3dd0c505da83.png)
 
 Bấm vào `bluegreen-demo`.
 
 ![](https://images.viblo.asia/118e5781-67d7-4868-9a95-73d2e135cc7d.png)
 
Các bạn sẽ thấy nút **Promote**, người bấm nút này sẽ là QC, có gì thì QC sẽ chịu trách nhiệm =)))), ta bấm vào nút Promote để switch traffic.
 
![](https://images.viblo.asia/d907b6be-e6db-42c0-af2f-5acdc5996149.png)

Bấm Sure.

![](https://images.viblo.asia/212b4bc4-6940-4400-b40e-d87579b53046.png)

![](https://images.viblo.asia/26b49508-9bba-4707-b0a6-cbe76d51e28b.png)

Bây giờ bạn truy cập vào cả hai `bluegreen-demo` và `bluegreen-demo-preview` Service ta đều sẽ thấy UI mới.

![](https://images.viblo.asia/4a124b97-3828-4f37-b752-8c499f3ec3f2.png)

## Ingress
Cấu hình ví dụ của Ingress để ta public Service ra bên ngoài.

```yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: bluegreen-demo
  annotations:
    ingress.kubernetes.io/proxy-body-size: 100M
    kubernetes.io/ingress.class: nginx
    ingress.kubernetes.io/app-root: /
spec:
  rules:
  - host: blue-green.example.com
    http:
      paths:
      - path: /
        backend:
          serviceName: bluegreen-demo
          servicePort: 80

---
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: bluegreen-demo-preview
  annotations:
    ingress.kubernetes.io/proxy-body-size: 100M
    kubernetes.io/ingress.class: nginx
    ingress.kubernetes.io/app-root: /
spec:
  rules:
  - host: blue-green-preview.example.com
    http:
      paths:
      - path: /
        backend:
          serviceName: bluegreen-demo-preview
          servicePort: 80
```

Done 😁. Các bạn like page [DevOps VN](https://www.facebook.com/profile.php?id=100085570585155) để cập nhật tin tức về DevOps nhé.

## Kết luận
Vậy là ta đã tìm hiểu xong cách triển khai Blue/Green Deployment với Argo Rollouts, như bạn thấy thì nó cũng đơn giản 😁. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).

Đồng đội [Junior Backend Engineer](https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067).

Đồng đội [Junior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/junior-frontend-engineer-1068).

Đồng đội [Onsite Merchandising (Web Admin)](https://tuyendung.hoang-phuc.com/careers/job/945)