Đối với việc deploy nginx lên kubernetes thì giống như hello word của ngôn ngữ lập trình. Sau đó học gì thì học, cứ chạy được cái đã :grinning:

Từ bây giờ đa phần chúng ta sẽ làm việc chủ yếu với thằng `Master Node` này
## Khởi tạo file .yaml

```
nano nginx-deployment-service.yaml
```
paste đoạn sau đây
```yaml
apiVersion: apps/v1
# ở đây phiên bản cũ hơn của kubernetes có dạng extensions/v1beta1
kind: Deployment
# kind là loại Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 2
  # replica ở đây sẽ tạo ra 2 pods luôn luôn chạy, khi một số pods bị down hay chết hay bất kì lý do nào đó sẽ tự động tạo lại số lượng pods bằng 2
  selector:
    matchLabels:
      app: nginx-deployment
  template:
    metadata:
      labels:
        app: nginx-deployment
    spec:
      containers:
      - name: nginx-deployment
      # image của container docker
        image: nginx
        ports:
        # port bên trong container
        - containerPort: 8080
---
apiVersion: v1
# kind là loại Service
kind: Service
metadata:
  name: nginx-svc
spec:
  ports:
  # port bên ngoài của pods mà các pods có thể giao tiếp được với nhau
  - port: 80
  # port target với 8080 của deployment
    targetPort: 8080
    protocol: TCP
    name: http
  selector:
  # dựa theo app : nginx-deployment ở labels trên kia sẽ map với service này
    app: nginx-deployment
  type: ClusterIP
```

Cuối cùng chạy

```
kubectl apply -f nginx-deployment-service.yaml
```

Vậy là deploy xong rồi, khá là dễ.

## Kiểm tra deploy được chưa
```
kubectl get pods
```

thì ra được 2 pods
```
nginx-deployment-8c8ff9b4f-dn7jj   1/1     Running   0          7h2m
nginx-deployment-8c8ff9b4f-nnj6l   1/1     Running   0          7h2m
```

bây giờ bạn thử xóa 1 pods xem chuyện gì xảy ra 
```
kubectl delete pod nginx-deployment-8c8ff9b4f-nnj6l
```

Bạn nên nhớ rằng các pods của nginx-deployment có thể rải rác chia đều qua 2 worker node kia. Câu hỏi đặt ra, điều gì 1 server worker node bị shutdown ? Mình nghĩ câu hỏi này có thể tìm thấy qua hình ảnh trực quan này :+1:

![](https://images.viblo.asia/c66f3db6-63a5-4ef5-9182-d70be6339400.png)

ví dụ pod có địa chỉ 10.10.10.2 chết vì lý do worker node shutdown, nó sẽ tự sinh ra 1 pods mới là 10.10.10.5 ở 1 node khác và Service vẫn hoạt động bình thường.

sau đó `get pods` thì ngay lập tức 1 pods mới được tạo 9s trước gần như được bảo toàn realtime

```
nginx-deployment-8c8ff9b4f-dn7jj   1/1     Running   0          7h6m
nginx-deployment-8c8ff9b4f-q2pg5   1/1     Running   0          9s
```

Chạy thử vài lệnh xem thế nào
```
kubectl get deployments
or
kubectl get deploy
```
kết quả:
```
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deployment   2/2     2            2           7h3m
```

```
kubectl get services
or
kubectl get svc
```

```
NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE
nginx-svc    ClusterIP   10.96.71.39    <none>        80de/TCP    7h5m
kubernetes   ClusterIP   10.96.0.1      <none>        443/TCP   8h
```

bây giờ chúng ta thử scale nginx-deployment và `get pods` thử xem sao =))
```
kubectl scale deployment --replicas 10 nginx-deployment
```

Chi tiết của service nginx-svc

```
kubectl describe svc/nginx-svc
```

kết quả:
```
Name:              nginx-svc
Namespace:         default
Labels:            <none>
Annotations:       <none>
Selector:          app=nginx-deployment
Type:              ClusterIP
IP:                10.96.71.39
Port:              http  80/TCP
TargetPort:        8080/TCP
Endpoints:         10.244.1.5:8080,10.244.2.8:8080
Session Affinity:  None
Events:            <none>
```

SSH vào worker Node bất kỳ và chạy lệnh sau

```
curl 10.96.71.39
```

```
curl 10.244.1.5:8080
```

đều ra `welcome nginx ...`

Muốn browser truy cập được thì cần phải thay đổi 
`type: ClusterIP` => `type: NodePort` cái này sẽ truy cập trực tiếp vào worker node (cách này được cảnh báo không nên dùng vì an toàn bảo mật). Còn cách tiếp cận nữa là sử dụng type là `LoadBalancer` của các dịch vụ cloud như AWS, Azure, Google Cloud hoặc phần mềm `MetalLB`

![](https://images.viblo.asia/972e41cc-a834-4d56-99ab-1f4cbe33af80.png)


MetalLB cung cấp triển khai cân bằng tải mạng cho các cụm Kubernetes không chạy trên nền tảng nhà cung dịch vụ cloud, cho phép sử dụng hiệu quả Dịch vụ LoadBalancer trong bất kỳ cụm nào.
![](https://images.viblo.asia/13bfd883-a97f-455a-9ce7-b929a8b0e91d.jpg)

Cách cuối cùng sử dụng các công cụ `Ingress` như `kubernetes-ingress`, `nginx-ingress`, `traefik`... để định tuyển phân ra các quy tắc định tuyến proxy bên trong kubernetes.
![](https://images.viblo.asia/464d83b9-f2d4-4d52-aecc-9b9505817b9f.png)


## CleanUp
Xóa service và deployment
```
kubectl delete svc/nginx-svc
kubectl delete deploy/nginx-deployment
```

## Tiếp theo
Sử dụng `kubernetes-ingress` với project mẫu để deploy mà mạng ngoài, browser truy cập được.
Tương lai mình sẽ có phần deploy kubernetes sử dụng loadbalancer AWS và nhiều tiện ích rút ngắn config hệ thống. Từ lúc học DevOps khá tốn kém về mặt kinh phí, mất mấy USD trên AWS chỉ để deploy kubernetes các kiểu. :sob:

facebook: facebook.com/quanghung997