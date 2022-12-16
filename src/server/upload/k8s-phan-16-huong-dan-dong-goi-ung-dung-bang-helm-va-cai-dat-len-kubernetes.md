# Giới thiệu
Chào các bạn, theo dòng thời gian thì  series chinh phục kubernetes cũng đã tiến tới những phần hấp dẫn hơn :)

Trong bài trước mình đã chia sẻ cách để [**triển khai một ứng dụng đơn giản viết bằng Nodejs lên K8S**](https://viblo.asia/p/k8s-phan-15-trien-khai-ung-dung-nodejs-len-k8s-1VgZv2QOZAw) một cách thủ công dùng các file manifest. Vấn đề đặt ra là khi bạn dev và muốn deploy lên môi trường DEV thì lại phải thực hiện một loạt các việc commit - pull - build - edit value -  deploy. Những việc lặp lại này không những gây tốn thời gian mà còn vô cùng nhàm chán, chưa kể đến lúc bụng đói mắt hoa là sửa sai một vài tham số thì lại được bonus cho một đống issue không đáng có.

Do đó để lên thêm một level nữa của phát triển thì ta cần nghĩ tới phương án đóng gói ứng dụng để triển khai trên K8S. Giải pháp chính là dùng **helm**. Đây sẽ là  tiền đề khá quan trọng để đưa toàn bộ quá trình thành tự động với CICD sau này.

***Phần code sử dụng trong bài lab này [các bạn tham khảo ở đây nhé!](https://github.com/rockman88v/nodejs-helm-demo.git)***

## Helmchart là gì
Khi mới tiếp cận với Kubernetes thì khái niệm helm-chart là một cái gì đó khá trừu tượng. Helm là một trình quản lý gói và công cụ quản lý ứng dụng cho Kubernetes, nó đóng gói nhiều tài nguyên Kubernetes vào một đơn vị triển khai logic duy nhất được gọi là Chart. Bên trong của Chart sẽ có phần chính là các "**template**, là định nghĩa các tài nguyên sẽ triển khai lên k8s. 

Cụ thể, ở bài trước để deploy một app lên k8s mình cần tạo 3 file yaml gồm **deployment.yaml**, **service.yaml** và **ingress.yaml**. Các file này định nghĩa rõ ràng các tham số cấu hình cho việc triển khai ứng dụng. Tuy nhiên khi cần thay đổi tham số thì việc sử dụng các file đó sẽ trở nên cồng kềnh và khó kiểm soát, không có quản lý version trên k8s. 

Còn khi dùng helm, thì ta sẽ có các file tương tự như vậy nhưng ở dạng "**template**", tức là nó ở mức độ linh động hơn. Khung của các file mô tả deployment hay service cơ bản vẫn vậy, nhưng thay vì các giá trị cụ thể như ban đầu chúng ta thực hiện, thì nó sẽ kết hợp với các "**giá trị**" được khai báo từ một file value khác (file values.yaml trong helm chart) để sinh ra file yaml cuối cùng để appy vào hệ thống. 

## Cách tạo helmchart
Để tạo helmchart, trước tiên ta phải cài helm và kubectl và cấu hình kết nối tới k8s của bạn. Sau đó tạo helmchart bằng lệnh "**helm create [chart-name]**":
```
helm create app-demo
```
**Kết quả sinh ra một thư mục chứa helm-chart mới. File values.yaml chứa các tham số mặc định ban đầu, ta sẽ tạo copy file này ra thêm một file mới để điều chính một giá trị theo thực tế.**
```
[sysadmin@vtq-cicd helmchart]$ cd app-demo/
[sysadmin@vtq-cicd app-demo]$ ll
total 8
drwxr-xr-x 2 sysadmin sysadmin    6 Aug 14 23:36 charts
-rw-r--r-- 1 sysadmin sysadmin 1144 Aug 14 23:36 Chart.yaml
drwxr-xr-x 3 sysadmin sysadmin  162 Aug 14 23:56 templates
-rw-r--r-- 1 sysadmin sysadmin 1875 Aug 14 23:36 values.yaml
```
**Trong đó, trước tiên ta quan tâm tới thư mục templates:**
```
[sysadmin@vtq-cicd templates]$ ls -lrt
total 28
-rw-r--r-- 1 sysadmin sysadmin 2081 Aug 14 23:36 ingress.yaml
drwxr-xr-x 2 sysadmin sysadmin   34 Aug 14 23:36 tests
-rw-r--r-- 1 sysadmin sysadmin  364 Aug 14 23:36 service.yaml
-rw-r--r-- 1 sysadmin sysadmin  322 Aug 14 23:36 serviceaccount.yaml
-rw-r--r-- 1 sysadmin sysadmin 1751 Aug 14 23:36 NOTES.txt
-rw-r--r-- 1 sysadmin sysadmin  919 Aug 14 23:36 hpa.yaml
-rw-r--r-- 1 sysadmin sysadmin 1792 Aug 14 23:36 _helpers.tpl
-rw-r--r-- 1 sysadmin sysadmin 1843 Aug 14 23:48 deployment.yaml
```
Mặc định khi tạo một helmchart ta sẽ có các template cho: **deployment**, **service**, **service account**, **ingress**, **hpa** và các **tests**.
So sánh với phần trước khi cài đặt ứng dụng bằng các manifest file thì ta đã viết 3 file gồm: **deployment**.yaml, **service**.yaml và **ingress**.yaml.

Thay vì ta phải tự viết từng tham số trong file deployment.yaml, thì khi dùng helmchart ta sẽ có một file template gần như đầy đủ các thành phần của một deployment, còn dùng những thành phần cụ thể nào thì ta định nghĩa qua file values (**values.yaml**).

**Lưu ý:**
- Trong phần trước ta có gán thêm các biến môi trường vào deployment, cái này trong template mặc định của deployment không có ==> Ta phải customize template của deployment để đạt mục đích tương tự (bổ sung cấu hình env trong deployment).
- Trong cấu hình mặc định của deployment template này chỉ có 01 container và sử dụng port mặc định là 80, port này sẽ dùng cho các phần kiểm tra liveness và readiness của port. Ứng dụng hiện tại mình viết đang listen port 8080 nên để không phải sửa code thì mình sẽ sửa giá trị này thành 8080.

**Như vậy, ta có thể hiểu đơn giản cách dùng helmchart template như sau:**

- templates/deployment.yaml + values.yaml **==>** File deployment.yaml mà ta viết ở bài trước
- templates/service.yaml + values.yaml **==>** File service.yaml mà ta viết ở bài trước
- templates/ingress.yaml + values.yaml **==>** File ingress.yaml mà ta viết ở bài trước

**Tóm lại để customize một ứng dụng trước khi deploy nó lên k8s bằng helmchart thì bạn không phải sửa lại tất cả các file yaml như thông thường, mà bạn chỉ cần update một file values duy nhất.**

**Thông thường mình sẽ copy file values.yaml mặc định trong helmchart ra ngoài để tùy biến:**
```
-bash-4.2$ pwd
/var/lib/jenkins/workspace/APP_DEMO/my-app/helmchart
-bash-4.2$ cp app-demo/values.yaml app-demo-value.yaml
-bash-4.2$ ls -lrt
total 4
drwxr-xr-x 4 jenkins jenkins   93 Aug 14 23:36 app-demo
-rw-r--r-- 1 jenkins jenkins 1910 Aug 14 23:41 app-demo-value.yaml
```

**Mình sẽ giải thích một vài tham số customize cho file app-demo-value.yaml như sau:**
```
# Default values for app-demo.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 2 # Tương ứng số lượng replicas trong file deployment.yaml

image:
  repository: harbor.prod.viettq.com/demo/my-app #Tương ứng image trong file deployment.yaml
  pullPolicy: Always #Tương ứng imagePullPolicy trong file deployment.yaml
  # Overrides the image tag whose default is the chart appVersion.
  tag: "v1"

imagePullSecrets: []
nameOverride: ""
fullnameOverride: ""

serviceAccount:
  # Specifies whether a service account should be created
  create: true
  # Annotations to add to the service account
  annotations: {}
  # The name of the service account to use.
  # If not set and create is true, a name is generated using the fullname template
  name: ""

podAnnotations: {}

podSecurityContext: {}
  # fsGroup: 2000

securityContext: {}

service:
  type: ClusterIP #Tương ứng service/type trong file service.yaml
  port: 80 #Tương ứng service/port trong file service.yaml

ingress:
  enabled: true
  className: "local" #Tương ứng ingressClass trong file ingress.yaml
  annotations: {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  hosts:
    - host: demo-helm.prod.viettq.com #Tương ứng ingress/host trong file ingress.yaml
      paths:
        - path: / #Tương ứng ingress/path trong file ingress.yaml
          pathType: ImplementationSpecific
  tls: []
resources: {}
autoscaling:
  enabled: false
  minReplicas: 1
  maxReplicas: 100
  targetCPUUtilizationPercentage: 80
  # targetMemoryUtilizationPercentage: 80

nodeSelector: {}
tolerations: []
affinity: {}
```


**Riêng với template của deployment thì bình bổ sung thêm phần cấu hình env:**
```
          env:
            - name: MY_NODE_NAME
              valueFrom:
                fieldRef:
                  fieldPath: spec.nodeName
            - name: MY_POD_NAME
              valueFrom:
                fieldRef:
                  fieldPath: metadata.name
            - name: MY_POD_NAMESPACE
              valueFrom:
                fieldRef:
                  fieldPath: metadata.namespace
            - name: MY_POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP
            - name: MY_POD_SERVICE_ACCOUNT
              valueFrom:
                fieldRef:
                  fieldPath: spec.serviceAccountName
```      

**Sau khi cập nhật các tham số thì ta sẽ tiến hành cài đặt helmchart này lên k8s:**

Cú pháp: **helm install** -n [**namespace**] [**release-name**] -f [**custom-value-file**] [**chart**]
```
kubectl create ns helm-demo
helm -n helm-demo install my-app -f app-demo-value.yaml app-demo
```
Kết quả:
```
[sysadmin@vtq-cicd .kube]$ kubectl -n helm-demo get all
NAME                                  READY   STATUS    RESTARTS   AGE
pod/my-app-app-demo-9cd4f7659-vfdsq   1/1     Running   0          19h
pod/my-app-app-demo-9cd4f7659-zbf4l   1/1     Running   0          19h

NAME                      TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE
service/my-app-app-demo   ClusterIP   10.233.57.19   <none>        80/TCP    23h

NAME                              READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/my-app-app-demo   2/2     2            2           23h

NAME                                        DESIRED   CURRENT   READY   AGE
replicaset.apps/my-app-app-demo-9cd4f7659   2         2         2       19h
```

**Nhìn thấy Pod running là thấy ưng bụng rồi, vào thử web xem ok chưa nhé:**
![image.png](https://images.viblo.asia/204f2a8e-b5fc-4cff-afa3-0578bd0dc431.png)

***Okela, vậy là mình đã hoàn thành đóng gói ứng dụng này bằng helm và ready cho việc mang đi triển khai trên các hệ thống K8S rồi. Việc tạo helmchart cho ứng dụng này hoàn toàn có thể tái sử dụng. Nghĩa là bạn có một nhóm ứng dụng tương đồng nhau về cách triển khai thì có thể dùng chung chart, chỉ khác nhau ở các customized values sẽ được set riêng cho từng ứng dụng khi triển khai.***

Mở rộng ra thêm bạn có thể tạo ra các template cho statefulset, daemonset để bổ sung vào helmchart của bạn. Bạn cũng có thể bổ sung thêm cấu hình về persistent, configmap hay secrete.. trong template của deployment. Một kinh nghiệm của mình là lấy các template trong các chart của các opensource phổ biến, hầu hết config ở đó đều rất đầy đủ, cần phần nào thì copy về tùy biến và dùng thôi. 

**Trong bài tiếp theo mình sẽ tiếp tục thực hiện xây dựng luồng CICD để tự động hoàn toàn việc build và deploy ứng dụng lên hệ thống sử dụng các công cụ Gitlab (SCM) + Jenkins (build/push docker/deploy k8s) và Harbor Registry.**

***Nếu thấy hữu ích hãy cho mình một  upvote để tạo động lực tiếp tục với các topic tiếp theo nhé! Many thanks***