Trong lập trình, chúng tôi sử dụng tệp env hoặc tệp cấu hình riêng biệt để lưu trữ các cài đặt, cấu hình hoặc các biến được yêu cầu để thực thi chương trình. Trong Kubernetes, chúng ta có thể sử dụng ConfigMaps để đạt được chức năng tương tự.

## ConfigMap là gì?

Một ConfigMap là một Kubernetes API object  có thể được sử dụng để lưu trữ dữ liệu dưới dạng các cặp key-value. Kubernetes có thể sử dụng ConfigMaps đã tạo dưới dạng:

* Configuration file
* Environment variable
* Command-line argument

ConfigMaps cung cấp khả năng làm cho các ứng dụng linh động bằng cách tách các cấu hình dành riêng cho môi trường khỏi các containers.

Quan trọng, ConfigMaps không thích hợp để lưu các dữ liệu quan trọng. Chúng không cung cấp bất kỳ loại mã hóa nào, và tất cả dữ liệu trong đó đều hiển thị cho bất kỳ ai có quyền truy cập vào tệp (Kubernetes cung cấp các **Secrets** để chứa có dữ liệu nhạy cảm).

Một xem xét khác của ConfigMaps là kích thước của tệp, tốt nhất là dưới 1MB, đối với các dữ liệu lớn, tốt hơn nên sử dụng các file service, database hoặc mount tệp riêng biệt.

**Ví dụ một ConfigMap**

```
kind: ConfigMap
apiVersion: v1
metadata:
  name: example-configmap
  namespace: default
data:
  # Configuration Values are stored as key-value pairs
  system.data.name: "app-name"
  system.data.url: "https://app-name.com"
  system.data.type_one: "app-type-xxx"
  system.data.value: "3"
  # File like Keys
  system.interface.properties: |
    ui.type=2
    ui.color1=red
    ui.color2=green
```

## Cách tạo ConfigMaps

ConfigMaps và pods đi cùng với nhau vì ConfigMaps có thể được sử dụng làm biến môi trường và thông tin cấu hình trong một Kubernetes pod.

Trong phần này, chúng ta sẽ xem xét cách tạo ConfigMaps.

### Tạo ConfigMaps từ thư mục

Chúng ta dùng command sau để tạo ConfigMap directories

```
kubectl create configmap
```

Nó sẽ tìm kiếm các tệp thích hợp trong một thư mục cụ thể có thể được sử dụng để tạo ConfigMap trong khi bỏ qua bất kỳ loại tệp nào khác (tệp ẩn, thư mục con, liên kết biểu tượng, v.v.)

Trước tiên, hãy tạo một thư mục bằng lệnh sau:

```
mkdir configmap-example
```

Sau đó, ta sẽ tải xuống các tệp mẫu vào thư mục. Các tệp này sẽ được sử dụng để tạo ConfigMap.

```
wget https://kubernetes.io/examples/configmap/game.properties -O configmap-example/game.properties

wget https://kubernetes.io/examples/configmap/ui.properties -O configmap-example/ui.properties
```

![](https://images.viblo.asia/ec0a83e8-7413-4911-8572-c77a4cd94d51.png)

Bây giờ chúng ta hãy xem nội dung tệp bằng các lệnh sau.

```
cat game.properties
cat ui.properties
```
![](https://images.viblo.asia/f79656ef-acd9-48f4-988e-23e8100f8599.png)

Khi tạo ConfigMaps dùng thư mục, yếu tố quan trọng nhất là bạn phải xác định chính xác các cặp key-value pairs trong mỗi tệp.

```
kubectl create configmap game-config-example --from-file=configmap-example/
```
![](https://images.viblo.asia/710cdfd2-333f-4839-ac20-44b6d77fb3fa.png)


Lệnh này sẽ đóng gói các tệp trong thư mục được chỉ định và tạo tệp ConfigMap. Chúng ta có thể sử dụng lệnh kubectl describe để xem tệp ConfigMap.

```
kubectl describe configmaps game-config-example
```

![](https://images.viblo.asia/878190fc-4b6c-4b93-b499-d1070a27162a.png)

Chúng ta có thể lấy ConfigMap ở định dạng YAML bằng lệnh sau.

```
kubectl get configmaps game-config-example -o yaml
```

![](https://images.viblo.asia/89e7dcd3-3881-4096-a7ed-28a5dd66e289.png)

### Tạo ConfigMaps từ files

Giống như cách chúng ta tạo ConfigMaps bằng cách sử dụng thư mục, chúng ta cũng có thể tạo ConfigMaps bằng cách sử dụng tệp bằng cách sử dụng tham số –-from-file để trỏ đến một tệp duy nhất trong lệnh kubectl create configmap. Vì vậy, hãy tạo ConfigMap bằng tệp game.properties như được hiển thị bên dưới.

```
kubectl create configmap game-config-example-2 --from-file=configmap-example/game.properties
```
![](https://images.viblo.asia/e99565a8-efa9-4248-ba00-141c821bd143.png)

```
kubectl describe configmap game-config-example-2
```

![](https://images.viblo.asia/1f750c1d-88bc-46e7-91a4-ce6630432f20.png)

Chúng ta có thể xác định nhiều đối số –-from-file nhiều lần để tạo một tệp ConfigMap duy nhất bằng cách sử dụng nhiều tệp khác nhau.

### Tạo ConfigMaps từ environment file

Kubernetes cho phép bạn tạo ConfigMaps dùng env files. Chúng ta có thể dùng đối số –-from-env-file khi định nghĩa env file. Đối số này cũng có thể được sử dụng nhiều lần để xác định nhiều tệp env.

Khi sử dụng tệp env, mỗi dòng phải tuân theo định dạng `name=value`. Các dòng trống và nhận xét sẽ bị bỏ qua, trong khi dấu ngoặc kép sẽ là một phần của ConfigMap.

```
cat configmap-example/game-env-file.properties
```

![](https://images.viblo.asia/c1f00bd0-2765-43e2-aca2-d043eef726fc.png)


```
kubectl create configmap game-config-env-file-example --from-env-file=configmap-example/game-env-file.properties
```
![](https://images.viblo.asia/d03295f6-b478-4926-946d-dd6729588c13.png)

```
kubectl get configmap game-config-env-file-example -o yaml
```
![](https://images.viblo.asia/776ae3b3-c041-4838-8521-63aed2d855d4.png)

### Tạo ConfigMap từ một file với key xác định trước

Khi tạo ConfigMap, chúng ta có thể sử dụng định dạng sau trong đối số –-from-file để xác định tên khóa sẽ ghi đè tên tệp được sử dụng trong phần dữ liệu.

```
--from-file=<Key-Name>=<File-Path>
```

Ví dụ sau minh họa cách xác định khóa trong khi tạo ConfigMap.

```
kubectl create configmap game-config-key-example --from-file=game-key-example-data=configmap-example/game.properties
```

![](https://images.viblo.asia/24bf28f2-490b-483f-b55f-edf56c91dfa8.png)

```
kubectl get configmap game-config-key-example -o yaml
```
![](https://images.viblo.asia/f65ad3dd-eae4-4cdf-83ef-74b8b9eadf47.png)

### Tạo ConfigMap từ values

Một cách khác để tạo ConfigMaps là cung cấp các giá trị làm tham số trong lệnh create configmap. Trong trường hợp này chúng ta có thể dùng đối số –-from-literal để pass từng cặp khóa. Điều này đặc biệt hữu ích khi chúng ta cần tạo ConfigMap một cách nhanh chóng.

```
kubectl create configmap config-example-values --from-literal=example.value=one --from-literal=example-type=2 --from-literal=example.url="http://example.com"
```


![](https://images.viblo.asia/668a6c8a-8e36-4d5e-8e4d-db3257c644cd.png)


```
kubectl get configmap config-example-values -o yaml
```

![](https://images.viblo.asia/f7e09bd9-8091-4417-a65c-123677299d70.png)

## Sử dụng ConfigMaps trong Pods

Bây giờ chúng ta đã hiểu cơ bản về cách tạo ConfigMaps. Bước tiếp theo là sử dụng ConfigMaps đã tạo để tạo Pod. Trong phần này, chúng ta sẽ tạo một ConfigMap đơn giản và sử dụng nó khi tạo một Pod trong Kubernetes.

Bước đầu tiên, hãy tạo một tệp có tên `app-basic.properties` và bao gồm hai cặp key-value.

Chúng ta sẽ tạo một ConfigMap có tên là `app-basic-configmap` bằng cách sử dụng tệp ở trên và tùy chọn –-from-file.

```
kubectl create configmap app-basic-configmap --from-file=configmap-example/app-basic.properties
```
![](https://images.viblo.asia/cc2acb39-1118-4db8-899a-5f0349bb6c7e.png)

```
kubectl get configmap app-basic-configmap -o yaml
```

![](https://images.viblo.asia/1264d1cc-c338-4af5-9cf8-207d969c0785.png)

Cuối cùng, hãy tạo một Pod tham chiếu đến ConfigMap mới được tạo. Chúng tôi sẽ sử dụng tệp YAML sau để tạo Pod.

```
example-pod.yaml
```

```
apiVersion: v1
kind: Pod
metadata:
  name: configmap-example-pod
spec:
  containers:
    - name: configmap-example-busybox
      image: k8s.gcr.io/busybox
      command: [ "/bin/sh", "-c", "env" ]
      envFrom:
        # Load the Complete ConfigMap
        - configMapRef:
            name: app-basic-configmap
  restartPolicy: Never
```

Như bạn có thể thấy từ ví dụ trên, chúng tôi sẽ load ConfigMap hoàn chỉnh mà chúng ta đã tạo vào Kubernetes Pod.

```
kubectl create -f example-pod.yaml
kubectl get pods
```

![](https://images.viblo.asia/8c18c58b-861e-4844-b964-b923e02f46f8.png)

```
kubectl logs configmap-example-pod | grep system.number
```
![](https://images.viblo.asia/24ea97ad-1cac-4fbf-a794-b78ab1a2c696.png)

Kết quả trên chỉ ra rằng ConfigMap `app-basic-configmap` đã được tải thành công khi tạo Kubernetes Pod.

## Mapping keys từ ConfigMaps sang Pods

Một cách khác mà chúng ta có thể sử dụng ConfigMaps là ánh xạ trực tiếp các giá trị từ ConfigMaps tới các biến môi trường cụ thể trong Pod.

Trong phần này, chúng tôi sẽ tạo hai tệp configmap đơn giản theo cách thủ công, load và mapping các giá trị trực tiếp đến Kubernetes Pod. Chúng ta sẽ xác định các ConfigMaps dưới dạng tệp YAML và sau đó sử dụng lệnh kubectl create để tạo ConfigMap.
```
application-defaults.yaml
```

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: application-configs
  namespace: default
data:
  app.value: "45000"
  app.type: test-application
  app.ui: web
```

```
application-logs.yaml
```

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: application-log-configs
  namespace: default
data:
  log_level: WARNING
  log_type: TEXT
```
```
kubectl create -f application-defaults.yaml
kubectl create -f application-logs.yaml
```

![](https://images.viblo.asia/a736f43a-53e2-4665-ae53-3a922e246925.png)

```
example-pod.yaml
```
```
apiVersion: v1
kind: Pod
metadata:
  name: configmap-example-pod
spec:
  containers:
    - name: configmap-example-busybox
      image: k8s.gcr.io/busybox
      command: [ "/bin/sh", "-c", "env" ]
      env:
        - name: APPLICATION_TYPE
          valueFrom:
            configMapKeyRef:
              name: application-configs
              key: app.type
        - name: APPLICATION_UI_TYPE
          valueFrom:
            configMapKeyRef:
              name: application-configs
              key: app.ui
        - name: LOG_LEVEL
          valueFrom:
            configMapKeyRef:
              name: application-log-configs
              key: log_level
  restartPolicy: Never
```
Trong cấu hình này, chúng tôi đang mapping các biến môi trường thành các giá trị trong mỗi ConfigMap.

Sau đây là cấu trúc cơ bản để mapping một giá trị.

```
env:
  - name: <<VARIABLE NAME>>
    valueFrom:
      configMapKeyRef:
        name: <<>CONFIMAP NAME>
        key: <<CONFIGMAP KEY>>
```
Tiếp theo chúng ta sẽ tạo Pod
```
kubectl create -f example-pod.yaml
kubectl get pods
```
![](https://images.viblo.asia/6ea9616c-1cf1-42d7-a267-f6be4bf2d638.png)

Sau khi tạo Pod thành công, chúng ta có thể khám phá các biến môi trường như hình bên dưới.
```
kubectl logs configmap-example-pod | grep APPLICATION_TYPE
kubectl logs configmap-example-pod | grep APPLICATION_UI_TYPE
kubectl logs configmap-example-pod | grep LOG_LEVEL
```
![](https://images.viblo.asia/a1419d98-3ff1-43ca-a8f8-2e987fd2f7ac.png)

## ConfigMap đã xác định các biến môi trường trong pod commands

Một cách khác chúng ta có thể sử dụng các biến môi trường được xác định trong ConfigMap là sử dụng chúng trong Pod Commands.

Code sau đây trình bày cách sử dụng các biến môi trường này trong command element bằng cách sử dụng example-pod.yaml.
```
apiVersion: v1
kind: Pod
metadata:
  name: configmap-example-pod
spec:
  containers:
    - name: configmap-example-busybox
      image: k8s.gcr.io/busybox
      command: [ "/bin/echo", "Application Type $(APPLICATION_TYPE) - $(APPLICATION_UI_TYPE)" ]
      env:
        - name: APPLICATION_TYPE
          valueFrom:
            configMapKeyRef:
              name: application-configs
              key: app.type
        - name: APPLICATION_UI_TYPE
          valueFrom:
            configMapKeyRef:
              name: application-configs
              key: app.ui
        - name: LOG_LEVEL
          valueFrom:
            configMapKeyRef:
              name: application-log-configs
              key: log_level
  restartPolicy: Never
```

Trong trường hợp này, các biến môi trường được xác định khi thực hiện lệnh (khi bắt đầu container) và chúng sẽ được hiển thị trực tiếp trong terminal.

## Thêm dữ liệu ConfigMap vào volume

Người dùng có thể sử dụng ConfigMaps  gắn dữ liệu ConfigMap vào Kubernetes volume. Trong ví dụ sau, chúng ta đang gắn dữ liệu ConfigMap `application-log-config` vào một volume được gọi là `config-volume` được gắn trong `/etc/config` trong container. Sau đó, chúng ta đã cấu hình một lệnh sẽ liệt kê tất cả các tệp trong thư mục /etc/config.

```
apiVersion: v1
kind: Pod
metadata:
  name: configmap-example-volume-pod
spec:
  containers:
    - name: configmap-volume-example-busybox
      image: k8s.gcr.io/busybox
      command: [ "/bin/sh", "-c", "ls /etc/config/" ]
      volumeMounts:
      - name: config-volume
        mountPath: /etc/config
  volumes:
    - name: config-volume
      configMap:
        name: application-log-configs
  restartPolicy: Never
```

ConfigMaps được gắn được tự động cập nhật. kubenet sẽ định kỳ kiểm tra xem ConfigMap được gắn kết có được cập nhật hay không và cập nhật ConfigMap lắp đặt cho phù hợp. Tuy nhiên, cơ chế tự động cập nhật này không áp dụng cho các volumes được ánh xạ dưới dạng SubPath volume.

##  Tổng kết

Trong bài viết này, chúng ta đã tìm hiểu về Kubernetes ConfigMaps, bao gồm nhiều cách có thể được sử dụng để tạo ConfigMaps và cách sử dụng ConfigMaps trong Kubernetes Pod. ConfigMaps là một phần thiết yếu của bất kỳ Kubernetes cluster nào, cung cấp một phương pháp mạnh mẽ để lưu trữ dữ liệu ứng dụng hoặc container đơn giản và được truy cập thường xuyên.