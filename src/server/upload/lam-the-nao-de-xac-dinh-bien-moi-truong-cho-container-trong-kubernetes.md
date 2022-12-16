# Biến môi trường (Environment Variables) là gì?

Hầu hết các ứng dụng khi chạy đều đòi hỏi các cấu hình bên ngoài. ví dụ: API key cho các service  sử dụng, định dang đầu ra của Python Flask API (XML hoặc JSON) hay là các thông tin liên quan đến tài khoản email, v..v.. Cách tốt nhất là không nên đặt cấu hình cứng trong code vì điều này yêu cầu triển khai lại hoặc thậm chí xây dựng lại ứng dụng bất cứ khi nào một biến thay đổi, gây bất lợi khi ứng dụng của bạn chạy trên nhiều môi trường khác nhau.

# Biến môi trường với Kubernetes.

Như chúng ta đã biết, Pod trong kubernetes chính là nơi ứng dụng được chạy trong đó. Bản thân Pod có thể chứa 1 hoặc nhiều hơn 1 container. Pod là các tiến trình nằm trên các Worker Node. Bản thân Pod có tài nguyên riêng về file system, cpu, ram, volumes, địa chỉ network… Khi bạn tạo một Pod (với `Deployment` , `StatefulSet` hoặc các phương tiện khác), bạn đặt các biến môi trường cho các container chạy trong Pod, sau đó Kubernetes sẽ chuyển đến ứng dụng bên trong Pod.

Vậy với các ứng dụng được triển khai trên Kubernetes, làm thế nào để chúng ta cá thể cấu hình các biến môi trường cho Pod hoặc khởi tạo file config cho dịch vụ Container? Trong bài viết này, chúng ta sẽ cùng thảo luận về các phương pháp để xác định các biến môi trường cho container trong Kubernetes Pod.

# Sử dụng các cặp `name` và `value`

Để đặt các biến môi trường, trong file cấu hình của bạn, hãy thêm vào trường `env`. Trong trường `env` là một mảng `EnvVar`, mỗi `EnvVar` lại bao gồm một `name` là tên biến và `value` (string) là giá trị của biến.

Ví dụ:

```
spec:
  containers:
  - env:
    - name: DATABASE_HOST
      value: mysql
    - name: DATABASE_NAME
        value: develop
    - name: DATABASE_PASSWORD
        value: abc123
    - name: DATABASE_USER
        value: develop
    - name: DATABASE_PORT
        value: "3306"
```

Ngoài ra, các biến môi trường mà bạn xác định trong cấu hình của Pod có thể được sử dụng ở nơi khác trong cấu hình, ví dụ: trong các lệnh và đối số mà bạn đặt cho container của Pod.

```
spec:
  containers:
  - env:
    - name: DATABASE_HOST
      value: mysql
    - name: DATABASE_NAME
      value: develop
    - name: DATABASE_PASSWORD
      value: abc123
    - name: DATABASE_USER
      value: develop
    - name: DATABASE_PORT
      value: "3306"
    command: ["echo"]
    args: ["$(DATABASE_HOST) $(DATABASE_NAME) $(DATABASE_PASSWORD)"]
```

Sau khi tạo, lệnh `echo mysql develop abc123` sẽ được chạy trên container.

# Sử dụng file `configmap`

Với cách trên, chúng ta đã có thể dễ dàng cài đặt biến môi trường cho container. Tuy nhiên, giả sử có 10 biến môi trường trở lên cần đặt cho mỗi pod và các biến môi trường này là giống nhau, vậy thì sẽ tốt hơn nhiều nếu có 1 file cấu hình riêng cho biến môi trường. Trong Kubernetes, ta có thể thực hiện điều này bằng cách sử dụng `configmap`. Ví dụ:
```
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-env
data:
  VARIABLE1: test1
  VARIABLE2: test2
  VARIABLE3: test3
```
Với một `configmap` như trên thì rất dễ dàng để nhiều container cùng chia sẻ một file cấu hình biến môi trường. Sau đó, trong container, chúng ta cần tham chiếu đến file `configmap` bằng cách sử dụng  `configMapRef`.
```
spec:
  containers:
  - envFrom:
      - configMapRef:
          name: my-env
```

Để linh hoạt hơn, ta cũng có thể sử dụng file cấu hình bên ngoài trong các định dạng VAR = VAL , và tạo configMap từ chúng bằng cách sử dụng một câu lệnh với `kubectl` . Ví dụ:

`kubectl create configmap postgres-config --from-env-file=postgres-config.properties`

Nội dung file `postgres-config.properties` có thể như sau:
```
POSTGRES_DB=viblo
POSTGRES_USER=viblo
POSTGRES_PASSWORD=secret
PGDATA=/var/lib/postgresql/data/pgdata
```
# Sử dụng file `secrets`

Một cách sử dụng phổ biến khác khi cần đặt các biến môi trường là sử dụng `secrets`, nhất là khi biến môi trường là các thông tin quan trọng cần bảo mật như mật , access key,  API key, ... `Secrets` hoạt động theo cách tương tự như `confifmap` và ta có thể sử dụng chúng với mục đích tương tự như `configmap`. Điểm khác biệt là `secrets` có mức độ bảo mật và quyền riêng tư cao hơn và Kubernetes sẽ yêu cầu mã hóa base64 đối với thông tin trong secrets.

Ví dụ, chúng ta có secrets sau:
```
apiVersion: v1
kind: Secret
metadata:
  name: postgres-secrets
type: Opaque
data:
  POSTGRES_USER: cHJvZHVjdF9yb2JvdA==
  POSTGRES_PASSWORD: cHIwZHIwYjB0
```
Chúng ta ũng có thể sử dụng `stringData` thay vì `data` và thay vào đó sử dụng các giá trị chưa được mã hóa, Kubernetes sau đó mã hóa các giá trị cho ta khi tạo hoặc cập nhật secrers. Điều này hữu ích khi quá trình triển khai tạo ra cấu hình và chúng ta muốn đặt giá trị ở giai đoạn này.

Sau đó chúng ta sẽ thêm secrets trong file cấu hình của container tương tự như sau:
```
spec:
  containers:
  - name: postgres
    image: postgres:latest
    envFrom:
      - secretRef:
          name: postgres-secrets
```

# Sử dụng các trường Pod và resources container

Trong Kubernetes, ngoài đặt giá trị trực tiếp cho trường `value` khi cài đặt biến môi trường, chúng ta còn có thể lấy các trường pod và trường `resources` của container có sẵn thông qua Kubernetes API và đặt chúng làm biến môi trường. Để làm được điều này, chúng ta sẽ sử dụng trường `valueFrom` và các trường `fieldRef`, `fieldPath`, `resourceFieldRef`.

Dưới đây là các trường pod và trường `resources` của container có sẵn được Kubernetes cung cấp, thay thế <CONTAINER_NAME> bằng tên container mà bạn muốn lấy thông các trường. Danh sách này còn có thể được mở rộng trong tương lai.

```
spec:
  containers:
  - env:
    - name: MY_NODE_NAME
      valueFrom:
        fieldRef:
          fieldPath: spec.nodeName
    # Kubernetes 1.7+
    - name: MY_NODE_IP
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
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
    # Kubernetes 1.8+
    - name: MY_POD_UID
      valueFrom:
        fieldRef:
          fieldPath: metadata.uid
    - name: MY_CPU_REQUEST
      valueFrom:
        resourceFieldRef:
          containerName: <CONTAINER_NAME>
          resource: requests.cpu
    - name: MY_CPU_LIMIT
      valueFrom:
        resourceFieldRef:
          containerName: <CONTAINER_NAME>
          resource: limits.cpu
    - name: MY_MEM_REQUEST
      valueFrom:
        resourceFieldRef:
          containerName: <CONTAINER_NAME>
          resource: requests.memory
    - name: MY_MEM_LIMIT
      valueFrom:
        resourceFieldRef:
          containerName: <CONTAINER_NAME>
          resource: limits.memory
```
# Tổng kết

Như bài viết vừa trình bày, có rất nhiều phương pháp, tùy chọn có sẵn trong Kubernetes để xác định các biến môi trường cho container trong Kubernetes pod. Khi sử dụng, chúng ta cần chọn lựa giữa các phương pháp để phù hợp với yêu cầu của ứng dụng. Ví dụ, khi ta muốn quản lý thông tin nhạy cảm như mật khẩu và các bí mật khác, thì `secrets` là một lựa chọn ưu tiên thay cho `configmap` hay `env` thông thường.