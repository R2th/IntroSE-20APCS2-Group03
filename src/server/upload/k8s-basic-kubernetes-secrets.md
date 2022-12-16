# Secret là gì
## Giới thiệu về Secret
Secret tương tự với configmap, là một tài nguyên mức namespace trên k8s dùng để lưu trữ các dữ liệu dạng key-value. Điểm khác biệt lớn nhất giữa secret và configmap đó là secret sinh ra để lưu những thông tin nhạy cảm (sensitive data) như username, password, token... và các thông tin này sẽ được mã hóa bằng base64 khi lưu vào hệ thống.

Về cách sử dụng thì gần như không có khác biệt gì so với configmap, chúng ta sẽ vẫn có một số cách sử dụng cơ bản như:
- Tạo biến môi trường từ key của secret
- Sử dụng secret như một volume chứa các file (ví dụ các file certificate, key..)

![image.png](https://images.viblo.asia/c6d86210-ebf3-4f2c-96d1-57718a71cfd6.png)

## Cấu trúc file manifest của Secret
Một đối tượng secret có dạng như sau:
```
apiVersion: v1
kind: Secret
metadata:
  name: my-secret
type: Opaque
stringData:
  EMAIL: "viettq@gmail.com"
  PASSWORD: "Try2HackM3H3H3"
  secret.txt: |
    My supersecret
```
Cơ bản thì cấu trúc này khá giống với configmap, nhưng nó có thêm một tham số "type". 

**Secret có nhiều loại khác nhau cho các mục đích sử dụng khác nhau:**
![image.png](https://images.viblo.asia/4c8286af-9bf9-476c-8cfa-4375616d4000.png)

Thông thường thì chúng ta sẽ làm việc thường xuyên nhất với loại secret là Opaque. Trong bài này chúng ta sẽ tìm hiểu cách tạo và sử dụng loại secret này.


# Các usecase sử dụng secret
## Các cách tạo secret
Có một số cách phổ biến dùng để tạo secret từ câu lệnh như sau:
- Tạo từng giá trị key/value cụ thể
- Tạo từ file
- Tạo từ folder
- Tạo từ file và lưu vào khóa mới
- Tạo từ file env (file env chứa các thông tin dạng key:value tương tự với configmap)

![image.png](https://images.viblo.asia/79204994-ab36-4ac2-9f32-0882feacf9be.png)

### Tổng hợp lệnh tạo secret
**Tạo secret từ giá trị cụ thể**:
```
kubectl -n [namespace] create secret generic [secret-name] --from-literal [key1=value1] --from-literal [key2=value2] --from-literal [keyN=valueN]
```
**Tạo secret từ file** ***filename***:
```
kubectl -n [namespace] create secret generic [secret-name] --from-file [filename]
```

**Tạo secret từ thư mục** ***config-dir***:
```
kubectl -n [namespace] create secret generic [secret-name] --from-file [secret-dir]
```
**Tạo secret từ file biến môi trường có tên** ***env-file***:
```
kubectl -n [namespace] create secret generic [secret-name] --from-env-file [env-file]
```
**Kiểm tra nội dung của secret vừa tạo**:
```
kubectl -n [namespace] get secret [secret-name] -oyaml
```

### Tạo secret bằng cách gán giá trị từng key-value cụ thể (from-literal)
**Ví dụ:**
```
[sysadmin@vtq-cicd secret]$ kubectl -n secret-demo create secret generic sec-from-literal --from-literal USER=viettq --from-literal PASSWORD="VeryHard2H@ck"
secret/sec-from-literal created
```
**Kiểm tra kết quả tạo secret:**
```
[sysadmin@vtq-cicd secret]$ kubectl -n secret-demo get secrets sec-from-literal -oyaml
```
```
apiVersion: v1
data:
  PASSWORD: VmVyeUhhcmQySEBjaw==
  USER: dmlldHRx
kind: Secret
metadata:
  name: sec-from-literal
  namespace: secret-demo  
type: Opaque
```
**Các bạn sẽ thấy giá trị của 2 key USER và PASSWORD đã bị mã hóa. Để xem nội dung ta phải giải mã bằng base64:**
```
[sysadmin@vtq-cicd secret]$ echo "VmVyeUhhcmQySEBjaw==" |base64 -d
VeryHard2H@ck
```

### Tạo secret từ file (sử dụng nội dung file)
Tạo một file có nội dung như sau:
```
cat <<EOF>> secret-file.conf
> USER="viettq"
> PASS="ABC_123456"
> EOF
```
Tạo secret từ file có tên `secret-file.conf` với keyword là `--from-file=file-name`:
```
kubectl -n secret-demo create secret generic sec-from-file --from-file=secret-file.conf
```
Kết quả:
```
kubectl -n secret-demo get secret sec-from-file -oyaml
```

```
apiVersion: v1
data:
  secret-file.conf: VVNFUj0idmlldHRxIgpQQVNTPSJBQkNfMTIzNDU2Igo=
kind: Secret
metadata:  
  name: sec-from-file
  namespace: secret-demo  
type: Opaque
```
Kết quả ta đã tạo một secret có **key** có tên là tên file, **value** là nội dung file. Nội dung file đã được mã hóa dạng base64.

### Tạo secret từ một thư mục chứa các file 
Cách tạo này cũng thường dùng khi ta cần gán cả một thư mục chứa các file vào secret và sau này sẽ được mount vào Pod để sử dụng dưới dạng file và volumes. Ta thường gặp với case là thư mục chứ file cert (.crt) và key (.key).

Tạo thư mục và các file config mẫu trong đó có nội dung như sau:
```
[sysadmin@vtq-cicd]$ mkdir secret-dir
[sysadmin@vtq-cicd]$ cd secret-dir
[sysadmin@vtq-cicd secret-dir]$ ll
total 8
-rw-rw-r-- 1 sysadmin sysadmin 26 Nov 28 21:39 login-policy.conf
-rw-rw-r-- 1 sysadmin sysadmin 55 Nov 28 21:37 password-policy.conf
[sysadmin@vtq-cicd secret-dir]$ cat login-policy.conf
lock_after=5
lock_time=60
[sysadmin@vtq-cicd secret-dir]$ cat password-policy.conf
password_length=8
expire_day=30
special_character=true
```

Như vậy ở thư mục `secret-dir` đang có 2 file config có tên `login-policy.conf` và `password-policy.conf`.
Ta sẽ tạo secret từ thư mục trên để lưu cả 2 file config này vào secret:
```
[sysadmin@vtq-cicd ]$ ls -lrt
drwxrwxr-x 2 sysadmin sysadmin  59 Nov 28 21:39 secret-dir
[sysadmin@vtq-cicd ]$ kubectl -n secret-demo create secret generic sec-from-dir --from-file=secret-dir
```
Kết quả:
```
kubectl -n secret-demo get secret sec-from-dir -oyaml
```
```
apiVersion: v1
data:
  login-policy.conf: bG9ja19hZnRlcj01CmxvY2tfdGltZT02MAo=
  password-policy.conf: cGFzc3dvcmRfbGVuZ3RoPTgKZXhwaXJlX2RheT0zMApzcGVjaWFsX2NoYXJhY3Rlcj10cnVlCg==
kind: Secret
metadata: 
  name: sec-from-dir
  namespace: secret-demo  
type: Opaque
 
```
Như vậy secret được tạo ra với 2 key là tên của 2 file trong thư mục mà chúng ta tạo config. Value của các key đó chính là nội dung của file.

### Tạo secret từ file biến môi trường
Sử dụng trong trường hợp ta đã có file biến môi trường có nội dung dạng key=value và muốn tạo ra secret với các key/value tương ứng với file môi trường.

Tạo file biến môi trường mẫu:
```
[sysadmin@vtq-cicd secret]$ cat sec-env.conf
USER=viettq
PASS=Abc_123456
```
Thực hiện lệnh tạo secret với tham số `--from-env-file=`
```
[sysadmin@vtq-cicd secret]$ kubectl -n secret-demo create secret generic sec-from-env-file --from-env-file=sec-env.conf
secret/sec-from-env-file created
```
Kiểm tra kết quả:
```
[sysadmin@vtq-cicd secret]$ kubectl -n secret-demo get secrets sec-from-env-file -oyaml
```
```
apiVersion: v1
data:
  PASS: QWJjXzEyMzQ1Ng==
  USER: dmlldHRx
kind: Secret
metadata:
  name: sec-from-env-file
  namespace: secret-demo  
type: Opaque
```

Như vậy một biến môi trường tương ứng sẽ là một key-value trong secret. Nó khác với việc tạo secret từ file thông thường thì tên file là key, nội dung file là value

### Tạo secret từ một file vào một key xác định
Trong trường hợp ta muốn tạo secret từ nội dung một file tên là A, nhưng ta không muốn tên của key trong secret là tên của file A mà là một tên gì đó gợi nhớ hơn, thì ta sẽ thực hiện theo cách này.

Tạo file mẫu:
```
[sysadmin@vtq-cicd secret]$ cat secret-file.conf
USER="viettq"
PASS="ABC_123456"
```
Sau đó ta sẽ tạo một secret có key là **my-secret-key** và value là nội dung file trên:
```
kubectl -n secret-demo create secret generic sec-from-file-to-key --from-file=my-secret-key=secret-file.conf
secret/sec-from-file-to-key created
```
Kết quả:

```
[sysadmin@vtq-cicd secret]$ kubectl -n secret-demo get secret sec-from-file-to-key -oyaml
```
```
apiVersion: v1
data:
  my-secret-key: VVNFUj0idmlldHRxIgpQQVNTPSJBQkNfMTIzNDU2Igo=
kind: Secret
metadata:
  name: sec-from-file-to-key
  namespace: secret-demo
type: Opaque
```
Các bạn có thể thấy, nếu tạo secret từ file thông thường thì tên key sẽ là tên của file. Còn dùng cách này tao có thể set tên key theo ý muốn.

## Sử dụng secret trong Pod
### Sử dụng key-value cụ thể trong secret thành biến môi trường trong Pod
Tạo file manifest `sec-as-env.yaml` có nội dung như sau:
```
apiVersion: v1
kind: Pod
metadata:
  name: sec-as-env
spec:
  containers:
  - name: env-print-demo
    image: busybox
    env:
    - name: USER
      valueFrom:
        secretKeyRef:
          name: sec-from-literal
          key: USER
    - name: PASSWORD
      valueFrom:
        secretKeyRef:
          name: sec-from-literal
          key: PASSWORD    
    command: ["sh","-c","echo user=$(USER) password=$(PASSWORD);sleep 365d"]
```
Tạo pod vào hệ thống:
```
[sysadmin@vtq-cicd secret]$ kubectl -n secret-demo apply -f sec-as-env.yaml
pod/sec-as-env created
```
Kiểm tra biến môi trường bên trong Pod đã nhận đúng value từ secret hay chưa:
```
[sysadmin@vtq-cicd secret]$ kubectl -n secret-demo exec -it sec-as-env -- env |egrep "USER|PASS"
USER=viettq
PASSWORD=VeryHard2H@ck
```
Như vậy trong Pod đã có 2 biến môi trường là USER và PASSWORD lấy giá trị từ giá trị của key trong secret.

### Sử dụng tất cả key-value trong secret thành biến môi trường trong Pod
Sử dụng khi ta muốn mapping toàn bộ các key-value của một secret vào thành biến môi trường trong Pod luôn. Thay vì ta phải ánh xạ từng key trong secret và thành một biến môi trường mới trong Pod.

Ta sẽ sử dụng tất cả các key-value của secret `sec-from-literal` thành các biến môi trường trong Pod bằng cách khai báo file manifest `pod-map-sec.yaml` như sau:
```
apiVersion: v1
kind: Pod
metadata:
  name: pod-map-sec
spec:
  containers:
    - name: pod-map-sec
      image: busybox
      command: ["sh","-c","echo user=$(USER) password=$(PASSWORD);sleep 365d"]
      envFrom:        
        - secretRef:
            name: sec-from-literal
  restartPolicy: Never
```
Tạo Pod:
```
[sysadmin@vtq-cicd secret]$ kubectl -n secret-demo apply -f pod-map-sec.yaml
pod/pod-map-sec created
```
Kiểm tra kết quả các biến môi trường trong Pod:
```
[sysadmin@vtq-cicd secret]$ kubectl -n secret-demo exec -it  pod-map-sec -- env |egrep "USER|PASS"
PASSWORD=VeryHard2H@ck
USER=viettq
```
Như vậy toàn bộ các key-value của secret được dùng thành biến môi trường trong Pod. 

### Mount secret dưới dạng volume trong Pod để sử dụng nội dung file  trong secret
Bên trên ta đã tạo một secret như vậy có tên **sec-from-dir**
```
[sysadmin@vtq-cicd secret]$ k -n secret-demo get secret sec-from-dir -oyaml
```
```
apiVersion: v1
data:
  login-policy.conf: bG9ja19hZnRlcj01CmxvY2tfdGltZT02MAo=
  password-policy.conf: cGFzc3dvcmRfbGVuZ3RoPTgKZXhwaXJlX2RheT0zMApzcGVjaWFsX2NoYXJhY3Rlcj10cnVlCg==
kind: Secret
metadata:  
  name: sec-from-dir
  namespace: secret-demo  
type: Opaque
```
Tạo Pod sử dụng secret **sec-from-dir** và mount vào thành volume trong Pod. Khai báo file manifest `pod-sec-dir.yaml` cho Pod như sau:
```
apiVersion: v1
kind: Pod
metadata:
  name: pod-sec-dir
spec:
  containers:
  - name: env-print-demo
    image: busybox
    command: ["sh","-c","sleep 365d"]    
    volumeMounts:
    - name: secret-volume
      mountPath: "/app/config"
      readOnly: true
  volumes:
      - name: secret-volume
        secret:
          name: sec-from-dir
          items:
          - key: "login-policy.conf"
            path: "login-policy.conf"
          - key: "password-policy.conf"
            path: "password-policy.conf"  
```
Với cách khai báo Pod như trên, ta đã mount được nội dung file **login-policy.conf** vào đường dẫn **/app/config/login-policy.conf** trong container của Pod.

Tương tự mount nội dung file **password-policy.conf** vào đường dẫn **/app/config/password-policy.conf** trong container của Pod.

Tạo Pod từ file manifest trên:
```
[sysadmin@vtq-cicd secret]$ kubectl -n secret-demo apply -f pod-sec-dir.yaml
pod/pod-sec-dir created
```

**Kiểm tra trong Pod xem đã mount được nội dung file trong secret vào Pod hay chưa:**
```
[sysadmin@vtq-cicd secret]$ kubectl -n secret-demo exec -it  pod-sec-dir -- ls -lrt /app/config
total 0
lrwxrwxrwx    1 root     root            27 Dec  2 11:16 password-policy.conf -> ..data/password-policy.conf
lrwxrwxrwx    1 root     root            24 Dec  2 11:16 login-policy.conf -> ..data/login-policy.conf
[sysadmin@vtq-cicd secret]$ kubectl -n secret-demo exec -it  pod-sec-dir -- cat /app/config/password-policy.conf
password_length=8
expire_day=30
special_character=true
[sysadmin@vtq-cicd secret]$ kubectl -n secret-demo exec -it  pod-sec-dir -- cat /app/config/login-policy.conf
lock_after=5
lock_time=60
```
Như vậy ta đã mount được nội dung file config vào trong Pod bằng cách sử dụng secret.

Trong thực tế triển khai ứng dụng thì configmap và secret là không thể thiếu. Qua bài này hy vọng các bạn sẽ có cái nhìn rõ hơn về secret và các cách sử dụng của secret từ đó sẽ áp dụng được vào công việc của mình nếu có.