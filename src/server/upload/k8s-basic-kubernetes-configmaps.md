# Configmap là gì
## Giới thiệu về configmap
Là một tài nguyên mức namespace trên k8s dùng để lưu trữ các dữ liệu dạng key-value. Pod có thể sử dụng configmaps dưới dạng các biến môi trường, dùng như tham số trong câu lệnh commandline trong pod hoặc sử dụng như một file cấu hình trong một volume. Lưu ý configmap không mã hóa dữ liệu, dữ liệu lưu trong configmap dưới dạng plain text.

Sử dụng configmap giúp cho ứng dụng trở nên linh động hơn. Các tham số của ứng dụng đều được cấu hình từ các biến môi trường hoặc từ file config. Các biến môi trường/file config này khi triển khai ở các môi trường cụ thể sẽ được gán giá trị từ configmap tương ứng. 

Lưu ý khi sử dụng configmap cho Pod thì configmap và pod phải ở cùng namespace.
![image.png](https://images.viblo.asia/db761fb2-0e77-4ab1-b145-1f05128502e9.png)

## Cấu trúc file manifest của configmap
Một đối tượng configmap có dạng như sau:
```
kind: ConfigMap
apiVersion: v1
metadata:
  name: example-configmap
  namespace: default
data:
  # Configuration Values are stored as key-value pairs
  title: "introduction to k8s"
  auth: "viettq"
  publish_date: "01/12/2022"  
```
Khác với một số object ta đã tìm hiểu qua như Pod, Service hay Deployment thì sẽ có trường `spec`, thì configmap sẽ không có trường `spec` mà thay vào đó là trường `data` và  trong đó là nơi khai báo các bộ giá trị `key:value`. 
# Các usecase sử dụng configmap
## Các cách tạo configmaps
Có một số cách phổ biến dùng để tạo configmap từ câu lệnh như sau:
- Tạo từng giá trị key/value cụ thể
- Tạo từ config file
- Tạo từ config folder
- Tạo từ file và lưu vào khóa mới
- Tạo từ file env (file enc chứ các thông tin dạng key:value tương tực với configmap)
![image.png](https://images.viblo.asia/cce36859-f012-4fa9-a665-e946bfd13298.png)

### Tổng hợp lệnh tạo configmap
**Tạo configmap từ giá trị cụ thể**:
```
kubectl -n [namespace] create configmap [configmap-name] --from-literal [key1=value1] --from-literal [key2=value2] --from-literal [keyN=valueN]
```
**Tạo configmap từ file** ***filename***:
```
kubectl -n [namespace] create configmap [configmap-name] --from-file [filename]
```

**Tạo configmap từ thư mục** ***config-dir***:
```
kubectl -n [namespace] create configmap [configmap-name] --from-file [config-dir]
```
**Tạo configmap từ file biến môi trường có tên** ***env-file***:
```
kubectl -n [namespace] create configmap [configmap-name] --from-env-file [env-file]
```
**Kiểm tra nội dung của configmap vừa tạo**:
```
kubectl -n [namespace] get configmap [configmap-name] -oyaml
```

### Tạo configmap bằng cách gán giá trị từng key-value cụ thể (from-literal)
Tạo configmap với tham số `--from-literal`:
```
kubectl -n cfg create configmap cm-from-literal --from-literal=author=viettq --from-literal=age=18
```
Kiểm tra kết quả tạo configmap bằng lệnh get:
```
[sysadmin@vtq-cicd configmap-dir]$ kubectl -n cfg get configmap cm-from-literal -oyaml
```

```
apiVersion: v1
data:
  author: viettq  
  age: "18"
kind: ConfigMap
metadata:
  name: cm-from-literal
  namespace: cfg
  <<output trancated>>
```

### Tạo configmap từ file (sử dụng nội dung file)
Tạo một file config:
```
cat <<EOF>> cm-file.conf
> author=viettq
> age=18
> EOF
```
Tạo configmap từ file có tên cm-file.conf với keyword là `--from-file=file-name`:
```
kubectl -n cfg create configmap cm-from-file --from-file=cm-file.conf
```
Kết quả:
```
kubectl -n cfg get configmap cm-from-file -oyaml
```

```
apiVersion: v1
data:
  cm-file.conf: |
    author=viettq
    age=18
kind: ConfigMap
metadata:  
  name: cm-from-file
  namespace: cfg  
<<output trancated>>
```
Kết quả là tạo một **key** có tên là tên file, **value** là nội dung file. Value của key này là phần nội dung sau dấu `"|"` cho tới hết nội dung có cùng indent. Các bạn có thể để ý thấy phần nội dung file thụt vào 2 indent so với tên của key. 

Cách mount nội dung file vào configmap thường là để sau này dùng cả file đó nhưng một file cấu hình cho một ứng dụng nào đó để đọc các tham số từ file config đó.

### Tạo configmap từ một thư mục chứa các file config
Cách tạo này cũng thường dùng khi ta cần gán cả một thư mục chứa các file config vào configmap và sau này sẽ được mount vào Pod để sử dụng dưới dạng file và volumes.

Tạo thư mục và các file config mẫu trong đó có nội dung như sau:
```
[sysadmin@vtq-cicd]$ mkdir configmap-dir
[sysadmin@vtq-cicd]$ cd configmap-dir
[sysadmin@vtq-cicd configmap-dir]$ ll
total 8
-rw-rw-r-- 1 sysadmin sysadmin 26 Nov 28 21:39 login-policy.conf
-rw-rw-r-- 1 sysadmin sysadmin 55 Nov 28 21:37 password-policy.conf
[sysadmin@vtq-cicd configmap-dir]$ cat login-policy.conf
lock_after=5
lock_time=60
[sysadmin@vtq-cicd configmap-dir]$ cat password-policy.conf
password_length=8
expire_day=30
special_character=true
```

Như vậy ở thư mục `configmap-dir` đang có 2 file config có tên `login-policy.conf` và `password-policy.conf`.
Ta sẽ tạo configmap từ thư mục trên để lưu cả 2 file config này vào configmap:
```
[sysadmin@vtq-cicd configmap-secret]$ ls -lrt
drwxrwxr-x 2 sysadmin sysadmin  59 Nov 28 21:39 configmap-dir
[sysadmin@vtq-cicd configmap-secret]$ kubectl -n cfg create configmap cm-from-dir --from-file=configmap-dir
```
Kết quả:
```
kubectl -n cfg get  configmap cm-from-dir -oyaml
```
```
apiVersion: v1
data:
  login-policy.conf: |
    lock_after=5
    lock_time=60
  password-policy.conf: |
    password_length=8
    expire_day=30
    special_character=true
kind: ConfigMap
metadata:  
  name: cm-from-dir
  namespace: cfg  
```
Như vậy configmap được tạo ra với 2 key là tên của 2 file trong thư mục mà chúng ta tạo config. Value của các key đó chính là nội dung của file.

### Tạo configmap từ file biến môi trường
Sử dụng trong trường ta đã có file biến môi trường có nội dung dạng key=value và muốn tạo ra configmap với các key/value tương ứng với file môi trường.

Tạo file biến môi trường mẫu:
```
[sysadmin@vtq-cicd configmap-secret]$ cat cm-env.conf
author=viettq
age=18
```
Thực hiện lệnh tạo configmap với tham số `--from-env-file=`
```
[sysadmin@vtq-cicd configmap-secret]$ kubectl -n cfg create configmap cm-from-env-file --from-env-file=cm-env.conf
configmap/cm-from-env-file created
```
Kiểm tra kết quả:
```
[sysadmin@vtq-cicd configmap-secret]$ kubectl -n cfg get configmap cm-from-env-file -oyaml
```
```
apiVersion: v1
data:
  author: viettq  
  age: "18"
kind: ConfigMap
metadata:        
  name: cm-from-env-file
  namespace: cfg
```
Như vậy một biến môi trường tương ứng sẽ là một key-value trong configmap. Nó khác với việc tạo configmap từ file thông thường thì tên file là key, nội dung file là value

### Tạo configmap từ một file vào một key xác định
Trong trường hợp ta muốn tạo configmap từ nội dung một file tên là A, nhưng ta không muốn tên của key trong configmap là tên của file A mà là một tên gì đó gợi nhớ hơn, thì ta sẽ thực hiện theo cách này.

Tạo file mẫu:
```
[sysadmin@vtq-cicd configmap-secret]$ cat cm-file.conf
author=viettq
age=18
```
Sau đó ta sẽ tạo một configmap có key là **my-config-key** và value là nội dung file trên:
```
kubectl -n cfg create configmap cm-from-file-to-key --from-file=my-config-key=cm-file.conf
configmap/cm-from-file-to-key created
```
Kết quả:

```
kubectl -n cfg get configmap cm-from-file-to-key -oyaml
```
```
apiVersion: v1
data:
  my-config-key: |
    author=viettq
    age=18
kind: ConfigMap
metadata:  
  name: cm-from-file-to-key
  namespace: cfg
```
Các bạn có thể thấy, nếu tạo configmap từ file thông thường thì tên key sẽ là tên của file. Còn dùng cách này tao có thể set tên key theo ý muốn.

## Sử dụng configmap trong Pod
### Sử dụng key-value cụ thể trong configmap thành biến môi trường trong Pod
Tạo file manifest cm-as-env.yaml có nội dung như sau:
```
apiVersion: v1
kind: Pod
metadata:
  name: cm-as-env
spec:
  containers:
  - name: env-print-demo
    image: busybox
    env:
    - name: AUTHOR
      valueFrom:
        configMapKeyRef:
          name: cm-from-literal
          key: author
    - name: AGE
      valueFrom:
        configMapKeyRef:
          name: cm-from-literal
          key: age
    command: ["sh","-c","echo author=$(AUTHOR) welcome=$(AGE);sleep 365d"]
```
Tạo pod vào hệ thống:
```
[sysadmin@vtq-cicd pod-configmap]$ kubectl -n cfg apply -f cm-as-env.yaml
pod/cm-as-env created
```
Kiểm tra biến môi trường bên trong Pod đã nhận đúng value từ configmap hay chưa:
```
[sysadmin@vtq-cicd pod-configmap]$ k -n cfg get pods
NAME        READY   STATUS    RESTARTS   AGE
cm-as-env   1/1     Running   0          8s
[sysadmin@vtq-cicd pod-configmap]$ kubectl -n cfg exec -it cm-as-env -- env |egrep "AGE|AUTHOR"
AUTHOR=viettq
AGE=18
```
Như vậy trong Pod đã có 2 biến môi trường là AUTHOR và AGE lấy giá trị từ giá trị của key trong configmap

### Sử dụng tất cả key-value trong configmap thành biến môi trường trong Pod
Sử dụng khi ta muốn mapping toàn bộ các key-value của một configmap vào thành biến môi trường trong Pod luôn. Thay vì ta phải ánh xạ từng key trong configmap và thành một biến môi trường mới trong Pod.

Tạo một file env như sau:
```
[sysadmin@vtq-cicd pod-configmap]$ cat tv.properties
tv=samsung
phone=apple
laptop=asus
```
Tạo configmap từ file env trên:
```
[sysadmin@vtq-cicd pod-configmap]$ k -n cfg create cm tv --from-env-file=tv.properties
configmap/tv created
```
Kết quả tạo configmap:
```
[sysadmin@vtq-cicd pod-configmap]$ k -n cfg get  cm tv -oyaml
```
```
apiVersion: v1
data:
  laptop: asus
  phone: apple
  tv: samsung
kind: ConfigMap
metadata:  
  name: tv
  namespace: cfg
```
Ta sẽ sử dụng tất cả các key-value của configmap trên thành các biến môi trường trong Pod như sau:
```
apiVersion: v1
kind: Pod
metadata:
  name: cm-file-as-env
spec:
  containers:
    - name: configmap-example-busybox
      image: k8s.gcr.io/busybox
      command: [ "/bin/sh", "-c", "env" ]
      envFrom:
        # Load the Complete ConfigMap
        - configMapRef:
            name: tv
  restartPolicy: Never
```
Tạo Pod:
```
[sysadmin@vtq-cicd pod-configmap]$  k -n cfg  apply -f cm-file-as-env.yaml
pod/cm-file-as-env created
```
Kiểm tra kết quả các biến môi trường trong Pod:
```
[sysadmin@vtq-cicd pod-configmap]$ k -n cfg logs cm-file-as-env |egrep "laptop|tv|phone"
laptop=asus
tv=samsung
phone=apple
```
Như vậy toàn bộ các key-value của configmap được dùng thành biến môi trường trong Pod. 
Lưu ý ở đây có sự khác biệt so với cách làm trước. Lúc trước khi ánh xạ từng key vào biến env, ta sử dụng từ khóa `configMapKeyRef`, còn để sử dụng toàn bộ key-value của configmap ta sẽ sử dụng từ khóa `configMapRef`

### Mount configmap dưới dạng volume trong Pod để sử dụng nội dung file config trong configmap
Áp dụng với các configmap có key tạo từ file. Và ta sẽ muốn mount configmap đó và trong Pod để có thể đọc được nội dung file.

Bên trên ta đã tạo một configmap như vậy có tên **cm-from-dir**
```
[sysadmin@vtq-cicd pod-configmap]$ k -n cfg get cm cm-from-dir -oyaml
apiVersion: v1
data:
  login-policy.conf: |
    lock_after=5
    lock_time=60
  password-policy.conf: |
    password_length=8
    expire_day=30
    special_character=true
kind: ConfigMap
metadata:     
  name: cm-from-dir
  namespace: cfg
```
Tạo Pod sử dụng configmap **cm-from-dir** và mount vào thành volume trong Pod:
```
apiVersion: v1
kind: Pod
metadata:
  name: cm-as-dir
spec:
  containers:
  - name: env-print-demo
    image: busybox
    command: ["sh","-c","sleep 365d"]    
    volumeMounts:
    - name: configmap-volume
      mountPath: "/app/config"
      readOnly: true
  volumes:
      - name: configmap-volume
        configMap:
          name: cm-from-dir
          items:
          - key: "login-policy.conf"
            path: "login-policy.conf"
          - key: "password-policy.conf"
            path: "password-policy.conf"  
```
Với cách khai báo Pod như trên, ta đã mount được nội dung file **login-policy.conf** vào đường dẫn **/app/config/login-policy.conf** trong container của Pod.

Tương tự mount nội dung file **password-policy.conf** vào đường dẫn **/app/config/password-policy.conf** trong container của Pod.

Tạo Pod trên và exec vào trong Pod để kiểm tra:
```
[sysadmin@vtq-cicd pod-configmap]$ k -n cfg get pods
NAME             READY   STATUS      RESTARTS   AGE
cm-as-dir        1/1     Running     0          13s
[sysadmin@vtq-cicd pod-configmap]$ k -n cfg exec -it cm-as-dir -- sh
/ # ls -lrt /app/config/
total 0
lrwxrwxrwx    1 root     root            27 Nov 29 04:44 password-policy.conf -> ..data/password-policy.conf
lrwxrwxrwx    1 root     root            24 Nov 29 04:44 login-policy.conf -> ..data/login-policy.conf
/ # cat /app/config/login-policy.conf
lock_after=5
lock_time=60
/ # cat /app/config/password-policy.conf
password_length=8
expire_day=30
special_character=true
```
Như vậy ta đã mount được nội dung file config vào trong Pod bằng cách sử dụng configmap.

**NOTES:** 

***Khi sử dụng configmap dưới dạng biên môi trường (env) trong container thì giá trị của các biến môi trường này sẽ KHÔNG ĐƯỢC UPDATE khi ta thay đổi giá trị của các key trong configmap. Muốn update biến môi trường này thì ta phải xóa Pod đi tạo lại, hay với Deployment thì cần restart Deployment để xóa Pod đi tạo lại thì mới cập nhật giá trị mới.***

***Chỉ khi ta sử dụng configmap bằng cách mount vào dưới dạng Volume thì giá trị của các key trong config mới được update vào trong Container khi có thay đổi ở configmap.***
## Immutable configmap
**Immutable configmap** là một dạng configmap đặc biệt, chúng ta không thể thay đổi nội dung của nó mà chỉ có thể xóa đi tạo lại. Việc tạo ra các **Immutable configmap** giúp bảo vệ chúng ta khỏi việc không may sửa nhầm configmap, cũng như giúp tăng performance của hệ thống do api-server sẽ không cần quan tâm tới các thay đổi tới các configmap dạng này để update vào trong Pod nữa.

Cấu trúc của **Immutable configmap** như bên dưới, trong đó có thêm một trường quan trọng nữa là `immutable: true`
```
apiVersion: v1
kind: ConfigMap
metadata:
  ...
data:
  ...
immutable: true
```

Trong thực tế triển khai ứng dụng thì configmap và secret là không thể thiếu. Qua bài này hy vọng các bạn sẽ có cái nhìn rõ hơn về configmap và các cách sử dụng của configmap từ đó sẽ áp dụng được vào công việc của mình nếu có.