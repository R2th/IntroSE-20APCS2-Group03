# Lời đầu

Blue-green deployment là một chiến lược triển khai sản phẩm dịch vụ trong đó bạn tạo ra hai môi trường giống hệt nhau. Một môi trường sẽ chạy sản phẩm phiên bản hiện tại (thường gọi là blue) trong khi môi trường còn lại (green) chạy thử nghiệm phiên bản mới hơn. 

Sau khi thử nghiệm xong xuôi, truy cập từ bên ngoài của người dùng sẽ được điều hướng trực tiếp sang môi trường green, lúc này green trở thành phiên bản chính thức (production) thay thế blue.

![](https://images.viblo.asia/2246c311-e1cc-40aa-9768-cb7961ba7e29.jpg)

Ưu điểm của chiến lược này là tăng tính sẵn có cũng như giảm rủi ro khi triển khai sản phẩm dịch vụ.

Song song với đó thì chiến lược này cũng có một vài nhược điểm, có thể kể đến:
+ Tiêu tốn nhiều tài nguyên do cần duy trì 2 môi trường cùng lúc khi triển khai
+ Blue-green deployment đòi hỏi các service trên cả 2 môi trường sử dụng chung database, trong trường hợp code mới có tác động thay đổi cấu trúc database, cần xây dựng chiến lược đồng bộ sao cho cả hai môi trường có thể chạy cùng lúc mà không gặp sự cố. Với vấn đề này, ta có thể sử dụng liquibase để xây dựng giải pháp

# Áp dụng Blue-green deploymen trên kubernetes

## Tại sao lại là kubernetes?

Ngoài việc là một công cụ điều phối container cực kì hữu dụng, Kubernetes còn hỗ trợ nhiều mô hình kiến trúc mà developer/operator có thể tái sử dụng thông qua việc sử dụng manifest files, hay helm chart. Nhờ vậy ta có thể dễ dàng nhân bản một môi trường thứ hai mà không tốn nhiều công sức.

Cùng với đó, Kubernetes cung cấp một giải pháp Load balancing chất lượng: Ingress. Ta có thể sử dụng Ingress để switch hai môi trường blue/green bằng cách điều hướng truy cập người dùng thông quan các route rule.

Có thể nói Kubernetes là một nền tảng cực kỳ phù hợp để áp dụng chiến lược blue-green deployment.

## Tiến hành thử nghiệm

Trong phần này, mình sẽ áp dụng chiến lược blue-green deployment cho app trên kubernetes. Để đơn giản hóa vấn đề (nhất là những vấn đề liên quan đến mount storage), mình sử dụng kubernetes có 1 node master duy nhất.

### Setup môi trường

**Khởi tạo app**

Đầu tiên, mình sẽ cần khởi tạo 2 app BLUE, GREEN.

Tạo BLUE app với manifest file
```
apiVersion: apps/v1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    app: blue
  name: blue
spec:
  replicas: 1
  selector:
    matchLabels:
      app: blue
  strategy: {}
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: blue
    spec:
      containers:
      - image: nginx
        name: nginx
        resources: {}
        volumeMounts:
          - mountPath: /usr/share/nginx/html
            name: test-volume
      volumes:
      - name: test-volume
        hostPath:
          path: /data/blue-nginx/
status: {}
```

> Ở đây, mình mount thư mục html của nginx container tới thư mục /data/blue-nginx/ trên kubernetes node . Các file trong thư mục này sẽ được tạo ở phần sau

Expose BLUE app (hay nói cách khác là tạo service cho BLUE app)

```
$ kubectl expose deployment blue --port=8081 --target-port=80 --name=blueapp
```

Tương tự với GREEN app, mình có manifest file

```
apiVersion: apps/v1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    app: green
  name: green
spec:
  replicas: 1
  selector:
    matchLabels:
      app: green
  strategy: {}
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: green
    spec:
      containers:
      - image: nginx
        name: nginx
        resources: {}
        volumeMounts:
          - mountPath: /usr/share/nginx/html
            name: test-volume
      volumes:
      - name: test-volume
        hostPath:
          path: /data/green-nginx/
status: {}
```

Expose GREEN app (hay tạo service cho GREEN app)

```
$ kubectl expose deployment green --port=8081 --target-port=80 --name=greenapp
```

Tạo file /data/blue-nginx/index.html trên kubernetes node với nội dung

```
Blue app!
```

Tương tự với file /data/blue-nginx/index.html
```
Green app!
```

   
**Tạo ingress rule**

Nếu chưa rõ về Ingress, bạn có thể tham khảo [bài viết này](https://viblo.asia/p/giai-ngo-kubernetes-phan-biet-ingress-va-service-mesh-n1j4l31WVwl).

Note: để ingress rule có thể hoạt động, bạn cần cài đặt phần mềm implement Ingress Controller (xem chi tiết tại [link](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/)).

Trong ví dụ này, ta sẽ sử dụng HAProxy Ingress Controller.

Tạo ingress rule

```
kubectl create ingress blue-green \
--annotation kubernetes.io/ingress.class=haproxy \
--rule="blue.green.app/=blueapp:8081" \
--rule="test-blue.green.app/=greenapp:8081"
```

Rule này sẽ forward
- Các request có host blue.green.app tới service blueapp port 8081
- Các request có host test-blue.green.app tới service greenapp port 8081

Ở đây mình sử dụng 2 host: blue.green.app cho phiên bản chính thức và test-blue.green.app cho phiên bản thử nghiệm.

Để sử dụng đc 2 host này thì cần add host.

```
blue.green.app 127.0.0.1
test-blue.green.app 127.0.0.1
# lưu ý thay thế 127.0.0.1 với IP kubernetes node tương ứng
```

**Xác nhận app hoạt động ổn**

```
$ curl http://blue.green.app
$ curl http://test-blue.green.app
```

Nều cài đặt thành công, bạn sẽ thấy kết quả trả về lần lượt là

```
Blue app!
Green app!
```

###  Triển khai blue-green

Bài toán ở đây là ta sẽ áp dụng blue-green deployment với các điều kiện:
- Đầu vào: image phiên bản mới 
- Các bước cần thực hiện: 
   - 	cập nhật image lên môi trường test
   - 	tiến hành kiểm thử
   - 	switch môi trường kiểm thử với môi trường prod
- Đầu ra: người dùng truy cập được app phiên bản mới trên môi trường prod

Lưu ý: ở đây môi trường prod không cố định phải là blue app, môi trường kiểm thử cũng ko nhất thiết là green app, chúng sẽ thay đổi sau mỗi lần thực hiện switch. 

1. Cập nhật image cho môi trường test

Xây dựng script để cập nhật image cho app trên môi trường test (app có thể là blue hoặc green tùy từng thời điểm). 
Mình sử dụng thông tin của ingress để trích xuất tên service/app đang chạy trên môi trường test. 

```
CURRENT_TEST_SVC=$(kubectl get ingress blue-green -o=jsonpath="
{.spec.rules[1].http.paths[0].backend.service.name}")
CURRENT_TEST_DEPLOYMENT=$(kubectl get svc $CURRENT_TEST_SVC -o=jsonpath="
{.spec.selector.app}")
kubectl set image deployment $CURRENT_TEST_DEPLOYMENT nginx=nginx:latest
```

Với tên app có được, mình tiến hành cập nhật image với câu lệnh

```
$ kubectl set image deployment ...
```

2. Tiến hành kiểm thử

Thông thường ở bước này, khi áp dụng cho các sản phẩm thực sự, ta sẽ tiến hành chạy automation test script. Nếu pass, tiến hành tiếp bước 3, còn không thì rollback.

3. Switch môi trường kiểm thử với môi trường prod

Tương tự như bước 1, ở đây mình dùng script để lấy thông tin các app đang chạy trên prod, test.
Sau đó sẽ khởi tạo lại ingress blue-green với rule mới để switch app cho 2 môi trường.

```
TMP=$(kubectl get ingress blue-green)
RESULT=$?
# if ingress not exist, exit
if [ $RESULT != 0 ]; then
	echo "Fail to switch env! Ingress not exist"
	exit
fi
# get the current prod, test env
CURRENT_PROD=$(kubectl get ingress blue-green -o=jsonpath="{.spec.rules[0].http.paths[0].backend.service.name}")
CURRENT_TEST=$(kubectl get ingress blue-green -o=jsonpath="{.spec.rules[1].http.paths[0].backend.service.name}")
echo "switching from "  $CURRENT_PROD " to "  $CURRENT_TEST " ..."
PROD_RULE="blue.green.app/="$CURRENT_TEST":8081"
TEST_RULE="test-blue.green.app/="$CURRENT_PROD":8081"
# recreate ingress with new rules
kubectl delete ingress blue-green
kubectl create ingress blue-green \
	--annotation kubernetes.io/ingress.class=haproxy \
	--rule=$PROD_RULE \
	--rule=$TEST_RULE
```

Sau khi chạy script này, bạn có thể verify lại xem liệu 2 môi trường đã được switch chưa với câu lệnh
```
$ curl http://blue.green.app
$ curl http://test-blue.green.app
```

# Lời kết

Trong bài viết này, mình đã chia sẻ về blue-green deployment, cũng như cách thức áp dụng blue-green deployment cho các app chạy trên kubernetes. 

Hi vọng kiến thức sẽ hữu ích !

Cảm ơn mọi người đã dành thời gian theo dõi! 

# Tham khảo

https://www.haproxy.com/blog/rolling-updates-and-blue-green-deployments-with-kubernetes-and-haproxy/