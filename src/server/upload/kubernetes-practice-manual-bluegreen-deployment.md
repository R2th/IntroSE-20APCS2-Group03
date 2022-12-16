Link bài viết gốc - [Kubernetes Practice - Manual Blue/Green Deployment](https://devopsvn.tech/kubernetes-practice/manual-bluegreen-deployment)

## Giới thiệu
Khi ứng dụng của ta đang chạy trên môi trường production thì việc triển khai phiên bản mới của ứng dụng luôn luôn yêu cầu không bị downtime, có một số cách để làm được việc này và một trong những cách giúp ta tránh được việc downtime là Blue/Green Deployment.

![](https://images.viblo.asia/48d4e35b-054a-4c19-bad0-a5d6fbdefd65.png)

Ở bài hôm nay chúng ta sẽ tìm hiểu cách thực hiện Blue/Green Deployment bằng cách thủ công, ở bài tiếp theo mình sẽ hướng dẫn các bạn cách làm tự động bằng *Argo Rollouts*. Bài này mình tham khảo từ CNCF Presentation Template K8s Deployment.

## Steps to follow
Bài này mình dùng minikube để chạy, để triển khai Blue/Green Deployment thì chúng ta sẽ tiến hành theo thứ tự sau:
1. Gọi phiên bản mà đang đang chạy và nhận traffic từ người dùng của ta là verison 1.
2. Ta triển khai phiên bản mới của ứng dụng là version 2.
3. Chờ cho version 2 hoạt động.
4. Chuyển traffic từ version 1 sang version 2.
5. Tắt version 1 đi.

## Practice
Giờ ta sẽ bắt đầu thực hành, tạo một file tên là `app-v1.yaml` để triển khai ứng dụng version 1 của ta, cấu hình như sau:

```app-v1.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-v1
  labels:
    app: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
      version: v1.0.0
  template:
    metadata:
      labels:
        app: my-app
        version: v1.0.0
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "9101"
    spec:
      containers:
      - name: my-app
        image: containersol/k8s-deployment-strategies
        ports:
        - name: http
          containerPort: 8080
        - name: probe
          containerPort: 8086
        env:
        - name: VERSION
          value: v1.0.0
        livenessProbe:
          httpGet:
            path: /live
            port: probe
          initialDelaySeconds: 5
          periodSeconds: 5
        readinessProbe:
          httpGet:
            path: /ready
            port: probe
          periodSeconds: 5
```

Ở trên ta tạo một Deployment với số lượng Pod là 3, và ta đánh cho nó hai label là `app: my-app` và `version: v1.0.0`, lát nữa các bạn sẽ biết tại sao ta lại đặt như vậy.

Tiếp theo ta tạo Service cho app-v1, đặt file tên là `service.yaml`.

```service.yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app
  labels:
    app: my-app
spec:
  type: NodePort
  ports:
  - name: http
    port: 80
    targetPort: http
  # Note here that we match both the app and the version
  selector:
    app: my-app
    version: v1.0.0
```

Điểm ta cần chú ý ở đây là ở phần `selector` của Service, như ta thấy là nó sẽ chọn cả hai label là *app* và *version*, với label *version* là cái ta rất cần quan tâm, nó là mấu chốt để ta chuyển traffic giữa các phiên bản của ứng dụng.

Tạo Deployment và Service.

```bash
kubectl apply -f app-v1.yaml && kubectl apply -f service.yaml
```

![](https://images.viblo.asia/e916da85-728b-4365-97dd-abce2e4100f8.png)

Sau khi tạo xong thì ta kiểm tra nó đã chạy được chưa, nếu các bạn cũng xài minikube thì chạy như sau.

```
curl $(minikube service my-app --url)
2022-10-03T20:16:04+07:00 - Host: host-1, Version: v1.0.0
```

Còn không thì các bạn dùng `port-forward`.

```
kubectl port-forward <name of pod> 8080:8080
```

Sau khi kiểm tra ứng dụng version 1 của ta đã chạy thì các bạn tắt `port-forward` đi vì lát nữa ta sẽ xài nó tiếp.

Tiếp theo ta sẽ triển khai phiên bản mới của ứng dụng là version 2, tạo một file tên là `app-v2.yaml` như sau:

```app-v2.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-v2
  labels:
    app: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
      version: v2.0.0
  template:
    metadata:
      labels:
        app: my-app
        version: v2.0.0
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "9101"
    spec:
      containers:
      - name: my-app
        image: containersol/k8s-deployment-strategies
        ports:
        - name: http
          containerPort: 8080
        - name: probe
          containerPort: 8086
        env:
        - name: VERSION
          value: v2.0.0
        livenessProbe:
          httpGet:
            path: /live
            port: probe
          initialDelaySeconds: 5
          periodSeconds: 5
        readinessProbe:
          httpGet:
            path: /ready
            port: probe
          periodSeconds: 5
```

Các bạn chú ý ở phần `labels`, ta sẽ khai báo label *version* là `v2.0.0`, bây giờ thì ta triển khai ứng dụng version 2.

```bash
kubectl apply -f app-v2.yaml
```

Chờ cho tất cả Pod ở trạng thái running thì ta mới làm tiếp.

```bash
kubectl rollout status deploy my-app-v2 -w
deployment "my-app-v2" successfully rolled out
```

![](https://images.viblo.asia/4f83d871-131c-49a6-ade8-1257316593a0.png)

Kiểm tra ứng dụng version 2 đã có thể nhận traffic thành công.

```bash
kubectl port-forward deployment/my-app-v2 8080:8080
```

Mở một terminal khác và gọi ứng dụng version 2 và chắc chắn là nó đã có thể nhận traffic từ người dùng.

```bash
curl localhost:8080
```

Nếu ứng dụng version 2 đã chạy thành công và có thể nhận traffic thì tiếp theo là ta sẽ làm phần quan trọng nhất là chuyển traffic từ version 1 sang version 2. Để làm việc đó thì ta chỉ đơn giản là cập nhật lại label của Service ở trên thành version 2 là được. Ta có thể sửa file yaml hoặc thao tác nhanh bằng command như sau.

```bash
kubectl patch service my-app -p '{"spec":{"selector":{"version":"v2.0.0"}}}'
```

Lúc này traffic sẽ được chuyển từ ứng dụng version 1 qua version 2.

![](https://images.viblo.asia/63d2b197-fa2a-4d16-bf8b-3b17516be52c.png)

Kiểm tra thử.

```bash
curl $(minikube service my-app --url)
2022-10-03T20:30:54+07:00 - Host: host-1, Version: v2.0.0
```

Oke, nếu bạn thấy kết quả  trả về là `Version: v2.0.0` thì ta đã thực hiện thành công Blue/Green Deployment. Nếu có việc gì xảy ra và các bạn muốn quay lại version 1 thì ta làm bằng cách cập nhật lại label *version*.

```
kubectl patch service my-app -p '{"spec":{"selector":{"version":"v1.0.0"}}}'
```

Nếu các bạn muốn tiết kiệm tài nguyên thì ta tắt ứng dụng version 1 đi.

```
kubectl delete deploy my-app-v1
```

![](https://images.viblo.asia/65d50fc7-aadb-4015-afcc-20c3a40051e2.png)
 
 Done 😁. Các bạn like page [DevOps VN](https://www.facebook.com/profile.php?id=100085570585155) để nhận thông báo về bài viết sớm nhất nhé.

## Kết luận
Vậy là ta đã tìm hiểu xong cách triển khai Blue/Green Deployment, như bạn thấy thì nó cũng không phức tạp lắm, nhưng đây chỉ là cách thực hành chơi để biết 😁, nên ở bài sau chúng ta sẽ cùng tìm hiểu cách làm cho dự án thực tế với *Argo Rollouts*.

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