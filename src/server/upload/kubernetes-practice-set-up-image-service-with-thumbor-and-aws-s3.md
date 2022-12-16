## Giới thiệu
Chào mọi người đến với series practice về kubernetes. Ở bài này chúng ta sẽ tìm hiểu về cách cài đặt Thumbor ở trên môi trường Kubernetes và sử dụng AWS S3 làm nơi lưu trữ hình ảnh cho Thumbor.

![image.png](https://images.viblo.asia/5ef58915-ea23-497f-a492-45578998d7ca.png)

## Thumbor
Thumbor là một service xử lý hình ảnh rất mạnh và được cộng đồng sử dụng rất nhiều.  Thumbor cho phép ta xử lý thao tác trên hình ảnh rất dễ dàng, ví dụ như xử lý crop, resizing và flipping cho hình ảnh.

Ví dụ ta sẽ dùng Thumbor để lấy hình ảnh với chiều rộng là 300 và chiều dài là 200.

```
http://thumbor-server/K97LekICOXT9MbO3X1u8BBkrjbu5/300x200/smart/example.jpg
```

Sau đó nếu ta cần lấy hình ảnh với chiều rộng là 350 và chiều dài là 300 thì chỉ cần thay đổi giá trị `300x200` thành `350x300`, rất tiện 😁.

## Set up Thumbor
Ok, giờ ta sẽ tiến hành cài đặt thumbor trên môi trường kubernetes.

Đầu tiên ta tạo một file tên là `thumbor-deployment.yaml` với config như sau:

```thumbor-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: thumbor-server
spec:
  replicas: 1
  selector:
    matchLabels:
      app: thumbor
  template:
    metadata:
      labels:
        app: thumbor
    spec:
      containers:
        - name: thumbor
          image: minimalcompact/thumbor:6.7.5
          command: ["thumbor"]
          args: ["-p", "80", "-c", "/conf/thumbor.conf"]
          ports:
            - containerPort: 80
          volumeMounts:
            - name: thumbor-conf
              mountPath: /conf
      volumes:
        - name: thumbor-conf
          configMap:
            name: thumbor
```

Ta sẽ dùng ConfigMap để lưu cấu hình cho thumbor server và mount nó vào trong Pod thumbor-server ở đường dẫn `/conf`. Sau đó ta dùng hai thuộc tính `command` và `args` để chỉ định thumbor sẽ chạy ở port 80 và sử dụng `/conf/thumbor.conf` làm file cấu hình.

Tiếp theo ta tạo ConfigMap để lưu cấu hình của file `thumbor.conf`, tạo một file tên là `thumbor.cm.yaml`.

```thumbor.cm.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: thumbor
data:
  thumbor.conf: |
    UPLOAD_ENABLED = True
```

Trong file `thumbor.conf` sẽ có một thuộc tính là `UPLOAD_ENABLED = True` để cho phép thumbor bật tính năng upload hình. Các bạn xem toàn bộ cấu hình ở đường dẫn này https://thumbor.readthedocs.io/en/latest/configuration.html.

Tiếp theo ta tạo Service và Ingress để expose thumbor server ra bên ngoài, tạo một file tên là `thumbor.svc.yaml`.

```thumbor.svc.yaml
apiVersion: v1
kind: Service
metadata:
  name: thumbor
spec:
  selector:
    app: thumbor
  ports:
    - port: 80

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: thumbor
  annotations:
    kubernetes.io/ingress.class: alb
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/healthcheck-path: /healthcheck
spec:
  rules:
  - host: thumbor.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: thumbor
            port:
              number: 80
```

Ở bài này vì mình xài Kubernetes trên AWS nên Ingress mình dùng của `aws-load-balancer-controller`, các bạn xem cách cài ở đường dẫn này https://aws.amazon.com/premiumsupport/knowledge-center/eks-alb-ingress-controller-fargate. Còn đối với môi trường on premises thì các bạn nên xài Ingress của [NGINX Ingress](https://kubernetes.github.io/ingress-nginx).

Còn nếu bạn muốn test trên môi trường local thì ta sẽ tạo Service kiểu NodePort.

```thumbor.svc.yaml
apiVersion: v1
kind: Service
metadata:
  name: thumbor
spec:
  type: NodePort
  selector:
    app: thumbor
  ports:
    - port: 80
      nodePort: 30000
```

Tạo resources.

```
kubectl apply -f thumbor.cm.yaml
kubectl apply -f thumbor-deployment.yaml
kubectl apply -f thumbor.svc.yaml
```

Nếu bạn cài Ingress dưới on premises thì ta cần trỏ domain tới địa chỉ IP của Worker Node mà host Ingress Controler. Còn nếu bạn cài Ingress trên Cloud thì khi ta tạo Ingress thì Ingress Controler sẽ tạo cho ta một AWS Application Load Balancer, ta chỉ cần trỏ domain tới ALB là được.

Sau đó ta dùng câu lệnh sau để upload hình lên trên Thumbor.

```
curl -i -H "Content-Type: image/jpeg" -H "Slug: photo.jpg" -XPOST http://thumbor.example.com/image --data-binary "@example.jpg"
```

Bạn sẽ thấy kết quả trả về như sau.

```
HTTP/1.1 201 Created
Content-Length: 0
Content-Type: text/html; charset=UTF-8
Location: /image/05b2eda857314e559630c6f3334d818d/photo.jpg
Server: TornadoServer/4.5.3
```

Để truy cập hình ảnh thì ta chỉ cần dán đường dẫn sau lên trên trình duyệt.

```
http://thumbor.example.com/image/05b2eda857314e559630c6f3334d818d/photo.jpg
```

Ok, vậy là ta đã cài đặt thumbor thành công. Nhưng bây giờ nếu bạn xóa thằng Deployment đi và tạo lại thì lúc này nếu ta truy cập vào đường dẫn hình ảnh ở trên thì nó sẽ báo 404 Not Found.

Lý do là vì ta chưa cấu hình persistent storage cho thumbor server, ta có thể xài StatefulSet và cấu hình PersistentVolume, nhưng khi ta scale lên thì hình của ta sẽ được lưu ở các PV khác nhau và điều này sẽ gây ra lỗi khi ta truy cập hình ảnh => Do đó ta cần một chỗ lưu trữ chung cho toàn bộ thumbor server trong trường hợp ta cần scale.

## Set up Thumbor with S3 Storage
Ở bài này ta sẽ sử dụng AWS S3 dùng làm chỗ lưu trữ chung cho toàn bộ thumbor server, để xài được S3 cho thumbor thì ta làm theo những bước sau .

Đầu tiên ta cần tạo một IAM user có quyền truy cập S3 bucket mà bạn sẽ sử dụng nó để lưu trữ hình. Các bạn xem hướng dẫn ở đây https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-walkthroughs-managing-access-example1.html. Sau đó bạn tạo access key và secret key cho IAM user đó, dùng hai giá trị đó để tạo Kubernetes Secret, ví dụ như sau.

```
kubectl create secret generic s3-credentials --from-literal=AWS_ACCESS_KEY_ID=AKIAR4725YR2POTRRS5G --from-literal=AWS_SECRET_ACCESS_KEY=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
```

Sau đó ta cập nhật ConfigMap thêm vào cấu hình để thumbor có thể sử dụng S3.

```thumbor.cm.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: thumbor
data:
  thumbor.conf: |
    UPLOAD_ENABLED = True
    TC_AWS_REGION = 'us-west-2'
    TC_AWS_STORAGE_BUCKET = 'thumbor-test'
    TC_AWS_STORAGE_ROOT_PATH = 'storage'
    TC_AWS_RESULT_STORAGE_BUCKET = 'thumbor-test'
    TC_AWS_RESULT_STORAGE_ROOT_PATH = 'result_storage'
    STORAGE = 'tc_aws.storages.s3_storage'
    UPLOAD_PHOTO_STORAGE = 'tc_aws.storages.s3_storage'
    RESULT_STORAGE = 'tc_aws.result_storages.s3_storage'
```

Các bạn xem toàn bộ cấu hình ở đường dẫn này https://github.com/thumbor-community/aws. Ở trên ta sẽ dùng cấu hình `STORAGE = 'tc_aws.storages.s3_storage'` và `UPLOAD_PHOTO_STORAGE = 'tc_aws.storages.s3_storage'` để chỉ định cho thumbor sử dụng S3 làm nơi lưu trữ hình.

Sau đó ta cập nhật lại Deployment như sau.

```thumbor-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: thumbor-server
spec:
  replicas: 1
  selector:
    matchLabels:
      app: thumbor
  template:
    metadata:
      labels:
        app: thumbor
    spec:
      containers:
        - name: thumbor
          image: minimalcompact/thumbor:6.7.5
          command: ["thumbor"]
          args: ["-p", "80", "-c", "/conf/thumbor.conf"]
          ports:
            - containerPort: 80
          envFrom:
            - secretRef:
                name: s3-credentials
          volumeMounts:
            - name: thumbor-conf
              mountPath: /conf
      volumes:
        - name: thumbor-conf
          configMap:
            name: thumbor
```

Ta tạo lại Configmap và Deployment.

```
kubectl apply -f thumbor.cm.yaml
kubectl apply -f thumbor-deployment.yaml
```

Bây giờ ta upload hình ảnh lên.

```
curl -i -H "Content-Type: image/jpeg" -H "Slug: photo.jpg" -XPOST http://thumbor.example.com/image --data-binary "@example.jpg"
```

Sau đó bạn vào S3 kiểm tra thì sẽ thấy file của ta.

![image.png](https://images.viblo.asia/2d5ff50e-9877-4faa-996c-908da3b96bad.png)

Oke, ta đã cấu hình thành công 😁.

English version [Set up image service with Thumbor and AWS S3](https://medium.com/@hmquan08011996/kubernetes-practice-set-up-image-service-with-thumbor-and-aws-s3-9056247c111e). Please follow me on Medium 😁.

## Kết luận
Vậy là ta đã tìm hiểu xong cách cấu hình Thumbor với S3. Thumbor là một service xử lý hình ảnh rất hay mà có lẻ ta sẽ sử dụng nhiều trên môi trường production. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/17647fc7-67d1-44a8-aae1-a8a1f2266351.jpg)

Hiện tại thì công ty bên mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và sở hữu trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:
+ Senior Backend Engineer (Java, Go). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java, Go). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221
+ Manual QC. https://tuyendung.hoang-phuc.com/job/seniorjunior-manual-qc-1039

Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:
+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn đề cần giải quyết, và sẽ có rất nhiều bài toán thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email của mình nha `hmquan08011996@gmail.com`. Cảm ơn các bạn đã đọc.