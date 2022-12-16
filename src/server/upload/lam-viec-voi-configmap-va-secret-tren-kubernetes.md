Mình lại chào các bạn 👋👋. Mong là chào hoài các bạn không chán 😂


Tiếp tục với [series học Kubernetes](https://viblo.asia/s/hoc-kubernetes-tu-co-ban-den-gan-nang-cao-aAY4qQ6w4Pw), ở [bài trước](https://viblo.asia/p/deploy-app-tren-kubernetes-cluster-voi-deployment-Yym40ZdWL91) ta đã học các Deploy app lên K8S Cluster, scale, update,... Cũng gọi là tự deploy trên K8S được rồi đấy, cơ mà một trong những thứ mà hầu như ta luôn cần khi deploy đó là cấu hình, secret, biến môi trường,... những thứ mà ta cần cấu hình tuỳ biến theo từng môi trường khác nhau (dev, staging, production),...Ở bài này chúng ta sẽ cùng nhau tìm hiểu cách dùng ConfigMap và Secret để làm điều đó nhé (và còn hơn thế nữa ;)).

> Nếu các bạn đã quen với Docker, Docker Compose, cách dùng `environment` hay `env_from` để truyền biến môi trường vào container thì bài này sẽ rất dễ xơi đấy ;) 

Lên thuyền cùng mình nào anh em ⛵️⛵️
# Lấy K8S Session
Vẫn như thường lệ, trước khi bắt đầu các bạn đảm giúp mình là đã lấy được K8S Session để truy cập vào cluster của mình đẻ lát nữa ta thực hành nhé. Xem lại [bài cũ giúp mình nhé](https://viblo.asia/p/mo-dau-voi-pod-tren-kubernetes-2oKLn2ryLQO#_setup-0)
# ConfigMap
Giới thiệu qua chút thì ConfigMap là 1 object lưu data dạng key-value, dùng cho các dạng data không bảo mật, không "nhạy cảm".

Ta có thể lưu string, number, boolean vào đó hoặc có thể lưu nội dung của cả 1 file text vào cũng được. 1 trong những trường hợp phổ biến nhất là ta dùng nó để lưu biến môi trường. Nghe đơn giản nhỉ ? :D, ta cùng nhau đi vào ví dụ cho dễ hiểu hơn nhé.

Ở bài này mình đã chuẩn bị cho các bạn ví dụ là 1 webapp rất đơn giản như sau:
- có 2 màn: login và main
- Sau khi login xong thì user được đưa vào màn main

Ví dụ về Configmap ta sẽ tập trung vào màn login nơi ta cấu hình 1 số thông tin không "nhạy cảm":

![Screenshot 2022-10-30 at 7.57.39 PM.png](https://images.viblo.asia/9cb51045-ddd6-47f2-a9ec-9cf60bafeeca.png)

Ở trên ta có app title và Introduction là những thứ public, và có thể config được, và ta sẽ dùng ConfigMap nhé.

Đầu tiên các bạn tạo cho mình file `configmap.yml` với nội dung như sau:
```yml
apiVersion: v1
kind: ConfigMap
metadata:
  name: myapp-config
data:
  app_name: "Hello World"
  introduction.txt: |
    My Introduction
```
Xem xem ở đây ta có gì nào: :)
- để tạo configmap thì `kind` ta phải để là `ConfigMap`
- bên trong `data` là nơi ta để config của chúng ta
- ta có thể để key-value đơn giản như `app_name`, value là string đơn giản là `Hello world`
- hoặc ta cũng có thể để cả 1 file rất dài vào đây, để ý dấu `|` nhé

Rất đơn giản phải không những người anh em thiện lành ;)

Sau đây ta `apply` để tạo Configmap nhé:
```
kubectl apply -f configmap.yml  --kubeconfig=kubernetes-config
```
Ta thấy in ra:
```
configmap/myapp-config created
```
Để `get configmap` thì ta cũng làm như ta thường làm với Pod, service,...
```
kubectl get configmap --kubeconfig=kubernetes-config

--->>

myapp-config       2      4m39s
```
Để xem cụ thể bên trong Configmap có đúng như ở trong file manifest ta viết hay không các bạn làm như sau:
```
kubectl get configmap myapp-config -o yaml --kubeconfig=kubernetes-config
```
Ta sẽ thấy in ra kiểu kiẻu như sau:

![Screenshot 2022-10-31 at 6.27.06 PM.png](https://images.viblo.asia/b0ec7270-25ed-4bc6-b630-44d0ae709bdb.png)

Nom ổn áp rồi đó 😎

Tiếp sau đây ta tạo deployment nhé, các bạn tạo cho mình file `myapp.yml` như sau:
```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
  labels:
    app: myapp
spec:
  selector:
    matchLabels:
      app: myapp-pod
  template:
    metadata:
      labels:
        app: myapp-pod
    spec:
      securityContext:
        runAsUser: 1001
        runAsGroup: 1001
        fsGroup: 1001
      containers:
      - name: myapp-container
        image: maitrungduc1410/configmap-and-secret
        ports:
        - containerPort: 3000
          name: http
        resources:
          requests:
            memory: "128Mi"
            cpu: "64m"
          limits:
            memory: "750Mi"
            cpu: "500m"
        env:
          - name: APP_NAME
            valueFrom:
              configMapKeyRef:
                name: myapp-config
                key: app_name
        volumeMounts:
        - name: config
          mountPath: "/app/storage"
          readOnly: true
      volumes:
      - name: config
        configMap:
          name: myapp-config
          items:
          - key: "introduction.txt"
            path: "introduction.txt"

---
apiVersion: v1
kind: Service
metadata:
  name: myapp-svc
spec:
  type: LoadBalancer
  ports:
    - name: http
      protocol: TCP
      port: 8080
      targetPort: http
  selector:
    app: myapp-pod
```

Ở bên trên nom khá giống với [bài trước về Deployment](https://viblo.asia/p/deploy-app-tren-kubernetes-cluster-voi-deployment-Yym40ZdWL91) ấy nhỉ 🤔

Cùng điểm qua 1 số điểm chính mới nhé:
- Đầu tiên ta có `env`là danh sách các biến môi trường ta muốn truyền vào container khi start, giống với `environment` mà ta vẫn dùng với `docker compose`. Ở đó ta định nghĩa 1 biến tên là `APP_NAME`, lấy giá trị từ ConfigMap (`valueFrom` -> `configMapKeyRef`), tiếp đó ta có tên của configmap `myapp-config` và cái key trong configmap mà ta muốn lấy ra `app_name`
- Tiếp theo ta định nghĩa 1 `volumes` tên là `config` (tên là gì tuỳ ý các bạn nhé), lấy từ configmap tương ứng, `items` là danh sách các key ta muốn lấy ra, ở đây ta chỉ muốn lấy ra 1 key trong configmap tên là `introduction.txt` và map nó vào file cùng tên `introduction.txt`
- Sau khi đã định nghĩa `volumes` thì việc của ta là sử dụng nó
- Bên trong phần cấu hình `containers` ta có `volumeMounts`, đây là nơi ta sẽ tham chiếu tới `volumes` kia. `name` là tên của volumes ta vừa định nghĩa, `mountPath` là ta muốn mount cái volume kia vào đường dẫn nào, cuối cùng là ta có `readOnly: true` ý là ta không cho phép container ghi đè vào file

úi xồi nhiều khái niệm quá, nom `volumes` rồi `volumeMounts` cứ loạn hết cả lên 😪😪 lằng nhà lằng nhằng (cái này ta sẽ làm rõ hơn ở bài về volume nhé)


> Bên cạnh đó mình cũng có thêm `securityContext`, để chỉ định ta muốn chạy container bằng user nào, group nào, nó sẽ override luôn cái `USER` mà ta định nghĩa ở Dockerfile nếu có, phần này ta sẽ nói thêm ở các bài sau nhé ;)

Nếu các bạn để ý thì sẽ thấy là `volumes` và `containers` được định nghĩa ngang hàng (level) với nhau:

![Screenshot 2022-10-31 at 11.24.08 PM.png](https://images.viblo.asia/b036f0d7-46c0-4628-98b8-85b487e92f89.png)

Tức là `volumes` không bị phụ thuộc vào 1 container nào mà nó có thể được dùng chung giữa nhiều container

Âu cây rồi đó, ta cùng deploy nhé:

```
kubectl apply -f myapp.yml --kubeconfig=kubernetes-config
```
Sau đó trong thời gian chờ LoadBalancer được khởi tạo (mất vài phút để bên cloud provider tạo LB) thì tranh thủ ta vọc vạch chút nhé.

Cùng chui zô container xem có gì nào 👁️👁️

À từ từ phải `get` xem có pod nào mới chui zô được chứ 😂😂:

```
kubectl get po --kubeconfig=kubernetes-config


---->>>
NAME                               READY   STATUS    RESTARTS   AGE
myapp-deployment-995b4d567-8p4fr   1/1     Running   0          18m
```
Gòi gòi, giờ mới chui zô container được lè 🤪
```
kubectl exec -it myapp-deployment-995b4d567-8p4fr --kubeconfig=kubernetes-config -- sh
```
> đổi tên pod sao cho khớp với của các bạn nhé

Thử check user id và group id tí xem `securityContext` đã được set đúng chưa nhé:
```
whoami
id -u
id -g
id
```
Ta thấy in ra như sau:
![Screenshot 2022-10-31 at 11.33.20 PM.png](https://images.viblo.asia/737d6afb-49a6-49d1-960f-4bc6ff866c0c.png)

Nom có vẻ đúng rồi đấy nhỉ :)
> App chúng ta chạy ở bài này là app NextJS. Anh em React đâu giơ tay xem cái nào 🖐️🖐️

Tiếp theo ta sẽ kiểm tra xem biến môi trường và volume của ta đã có chưa nhé:
```
ls -la

echo $APP_NAME

ls -la storage

cat storage/introduction.txt
```

Ta sẽ thấy in ra như sau:

![Screenshot 2022-10-31 at 11.36.26 PM.png](https://images.viblo.asia/7abc0c29-3664-4b03-8347-9f2524c0df47.png)

Nom xinh tươi rồi đó nhỉ, có hết rồi 😎😎

> Nếu các bạn để ý thì folder `storage` nơi ta mount volume vào nó đang nằm dưới user `root`, mặc dù group thì vẫn đúng `nodejs`. Cái này ta sẽ nói ở các bài sau nhé

Ổn rồi đó, giờ chui lại ra ngoài và `get service` để lấy EXTERNAL-IP nào (bấm CTRL + D để chui ra nhé):
```
kubectl get svc --kubeconfig=kubernetes-config

--->>>

NAME        TYPE           CLUSTER-IP      EXTERNAL-IP    PORT(S)          AGE
myapp-svc   LoadBalancer   10.245.64.155   167.99.30.23   8080:32101/TCP   3m20s
```
Như ở trên thì Service của mình có EXTERNAL-IP là `167.99.30.23`. Giờ ta quay lại trình duyệt và kiểm tra nhé, các bạn mở trình duyệt ở địa chỉ `167.99.30.23:8080` xem nhé:

![Screenshot 2022-10-31 at 11.41.44 PM.png](https://images.viblo.asia/25ae96da-1be5-4bb1-91a9-2bdfb65a550f.png)

yeah, app name đã được set thành Hello World, bấm thử nút `Download Introduction` ta sẽ thấy kết quả như mong đợi 🥰🥰:

![Screenshot 2022-10-31 at 11.41.59 PM.png](https://images.viblo.asia/b7039329-4e0e-47f3-b545-e72a85a8e940.png)

tuyệt vời ông mặt trời, cảm giác như vừa giải cứu thế giới vậy 🤩🤩🤩🤩


Giờ ta thử update lại Configmap xem nhé:
```yml
apiVersion: v1
kind: ConfigMap
metadata:
  name: myapp-config
data:
  app_name: "My Kubernetes App"
  introduction.txt: |
    This is to demo how to update Configmap
```
Sau đó ta `apply` lại Configmap nhé:

```
kubectl apply -f configmap.yml --kubeconfig=kubernetes-config

---->>>

configmap/myapp-config configured
```
Đoạn này mới vi diệu này. Ta quay trở lại trình duyệt, bấm F5, và bấm `Download Introduction`, mở file download ta sẽ thấy giá trị đã được update:

![Screenshot 2022-10-31 at 11.46.46 PM.png](https://images.viblo.asia/d90980bf-e336-4b40-8273-41024efbd584.png)

Uầy, nom xịn phết nhờ, update ngay cả khi container đang chạy luôn, không cần restart lại deployment....

Chuyện, hàng xịn mà lại 😎😎

Thế nhưng các bạn để thì APP_NAME vẫn không thay đổi, ta vẫn thấy `Hello world`

Volume được update ngay lập tức là vì bản chất nó chằng khác gì cái volume mà ta vẫn  dùng bên Docker suốt rồi, mọi thay đổi ở volume đều sẽ được mount trực tiếp vào container lúc runtime (đang chạy). Còn với biến môi trường thì ta sẽ phải restart lại deployment đấy. Ta chạy command `rollout restart` nhé:
```
kubectl rollout restart deploy myapp-deployment --kubeconfig=kubernetes-config
```
Chờ một tẹo cho Pod mới được deploy xong xuôi (các bạn tự `get pod` kiểm tra bao giờ thấy RUNNING là được nhé), và giờ ta quay lại trình duyệt F5:

![Screenshot 2022-10-31 at 11.50.56 PM.png](https://images.viblo.asia/22fbe27a-b726-45b7-a56d-83208d2b88db.png)

Tuyệt vời, `APP_NAME` đã được update 🥳🥳🥳. Sử dụng ConfigMap khá đơn giản ý nhỉ ;) Ta triển tiếp phần sau nhé

# Secret
Với các dạng config chung chung, không riêng tư thì ta có thể dùng Configmap như trên, nhưng còn với các dạng thông tin cần bảo mật: thông tin kết nối data, password, API key/secret, JWT secret, docker secret để pull image từ private registry,... Với những thứ riêng tư như vậy thì ta cần 1 thứ tốt hơn, K8S mang tới cho chúng ta Secret.

Secret thì có nhiều loại Secret, nhưng phổ biến và ta hay làm việc nhất là `type=Opaque`, cách dùng thì nom cũng không khác gì ConfigMap, rất dễ. Ta cùng xem nhé ;)

## Tạo và sử dụng secret
Ở cái app NextJS của mình thì ta còn có thể login với email và password của admin (được config từ phía backend), login thành công vào trong thì ta sẽ có thể download được file secret. Và bởi vì những thông tin như username/password, và file secret cần bảo mật hơn nên ta sẽ đưa nó vào secret nhé.

Các bạn tạo cho mình file `secret.yml` với nội dung như sau:
```yml
apiVersion: v1
kind: Secret
metadata:
  name: myapp-secret
type: Opaque
stringData:
  EMAIL: "admin@test.com"
  PASSWORD: "123456"
  secret.txt: |
    My supersecret
```
Nhìn vào secret ta vừa định nghĩa bên trên nom khá là giống với ConfigMap luôn ý nhỉ? đơn giản ghê.

Thì như mình đã nói ở trên đây là loại secret phổ biến nhất `type=Opaque` cách dùng rất đơn giản. Ta có thể truyền vào trực tiếp `stringData` là dạng data thuần, raw data. Hoặc ta cũng có thể truyền vào base64. Ví dụ với file secret bên trên mà ta muốn dùng base64 thì sẽ như sau:
```yml
...
type: Opaque
data:
  EMAIL: YWRtaW5AdGVzdC5jb20K
  PASSWORD: MTIzNDU2Cg==
  secret.txt: TXkgc3VwZXJzZWNyZXQK
```
> chú ý rằng với data dạng base64 thì ta phải dùng `data` thay vì `stringData` nhé

> còn nữa là nếu ta dùng `stringData`, thì lát nữa sau khi `apply` xong và `get` thì K8S sẽ show data dạng base64 thôi.

Giờ ta lưu file `secret.yml` lại (bản raw, dùng `stringData` ý nhé). Và `apply` để tạo secret nhé:

```
kubectl apply -f secret.yml --kubeconfig=kubernetes-config

--->>>

secret/myapp-secret created
```
ta thử get danh sách các secret hiện có ở namespace nhé:
```
kubectl get secret --kubeconfig=kubernetes-config

--->>>

NAME                  TYPE                                  DATA   AGE
default-token-4lggr   kubernetes.io/service-account-token   3      10m
myapp-secret          Opaque                                3      41s
```
âu cây secret của ta được tạo ngon rồi đó. Giờ ta thử `get` detail xem bên trong secret của ta sau khi tạo nó nom như thế nào nhé:

```
kubectl get secret myapp-secret -o yaml --kubeconfig=kubernetes-config
```
Ta sẽ thấy dạng dạng như sau:

![Screenshot 2022-11-01 at 12.58.27 PM.png](https://images.viblo.asia/43d9d3af-682a-4ffb-91f5-5307b92912b7.png)

Như các bạn thấy thì dù file manifest của ta để là `stringData` nhưng sau khi `apply` thì K8S đã đổi thành `data` và dùng dạng base64. Phần này K8S làm tự động ta không cần quan tâm, lát nữa dùng ta cũng không cần convert ngược lại mà cứ thế dùng thôi nhé.

Giờ ta quay lại file deployment `myapp.yml` và update lại 1 chút như sau để `inject` (truyền) biến môi trường vào cho phần login và cả file secret sau khi login để user có thể download nhé. Ta mở file `myapp.yml`:
```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
  labels:
    app: myapp
spec:
  selector:
    matchLabels:
      app: myapp-pod
  template:
    metadata:
      labels:
        app: myapp-pod
    spec:
      securityContext:
        runAsUser: 1001
        runAsGroup: 1001
        fsGroup: 1001
      containers:
      - name: myapp-container
        image: maitrungduc1410/configmap-and-secret
        ports:
        - containerPort: 3000
          name: http
        resources:
          requests:
            memory: "128Mi"
            cpu: "64m"
          limits:
            memory: "750Mi"
            cpu: "500m"
        env:
          - name: APP_NAME
            valueFrom:
              configMapKeyRef:
                name: myapp-config
                key: app_name
          - name: EMAIL
            valueFrom:
              secretKeyRef:
                name: myapp-secret
                key: EMAIL
          - name: PASSWORD
            valueFrom:
              secretKeyRef:
                name: myapp-secret
                key: PASSWORD
        volumeMounts:
        - name: config
          mountPath: "/app/storage/introduction.txt"
          subPath: introduction.txt
          readOnly: true
        - name: secret
          mountPath: "/app/storage/secret.txt"
          subPath: secret.txt
          readOnly: true
      volumes:
      - name: config
        configMap:
          name: myapp-config
          items:
          - key: "introduction.txt"
            path: "introduction.txt"
      - name: secret
        secret:
          secretName: myapp-secret
          items:
            - key: secret.txt
              path: secret.txt
---
apiVersion: v1
kind: Service
metadata:
  name: myapp-svc
spec:
  type: LoadBalancer
  ports:
    - name: http
      protocol: TCP
      port: 8080
      targetPort: http
  selector:
    app: myapp-pod
```
Có một số thay đổi ở Deployment, (Service thì giữ nguyên). Ta cùng xem nhé:
- đầu tiên là ở `volumes` tương tự như configMap ta định nghĩa thêm 1 volume dành cho secret để mount file `secret.txt` vào, các bạn để ý những keyword, cú pháp của nó nhé, gần như tương tự config map, khác mỗi cái bên configmap để là `name` thì bên secret ta để là `secretName`
- Ở `env` ta định nghĩa thêm 2 biến nữa là `EMAIL` và `PASSWORD` lấy từ secret, vẫn tương tự như configmap ;)
- cuối cùng là đoạn có vẻ "thay đổi nhiều nhất" là phần `volumeMounts`
- ở đó giống như configmap, ta mount thêm volume của secret vào, nhưng có 1 điều là cái `mountPath` của cả 2 ta vừa update lại để dùng đường dẫn có chứa cả tên file, và ta cũng thêm cả `subPath` là tên file nữa
- `subPath` chính là cái `path` mà ta định nghĩa ở phần `volumes` bên dưới
- còn lí do cái `mountPath` ta phải thêm cả tên file là bởi vì hiện tại ta muốn mount 2 volumes vào chung 1 đường dẫn `/app/storage` mà K8S không cho phép `mountPath` trùng nhau giữa các `volumeMounts`, nếu ta để 2 cái `mountPath` đều là `/app/storage` như cũ thì lúc `apply` sẽ có lỗi, nên ta phải thêm tên file vào cho nó khác nhau đi, và bởi vì ta dùng trực tiếp đường dẫn có cả tên file nên ta phải dùng chung với `subPath` để lấy ra đúng file ta mong muốn từ `volumes`

> ối dồi ôi nghe loạn cả óc, khóc ròng🤣🤣, nếu các bạn thấy khó nuốt quá thì dành ra đôi phút thiền để có thể thẩm thấu dễ hơn nhé ;)

Oke rồi đó giờ ta apply lại deployment nào:
```
kubectl apply -f myapp.yml --kubeconfig=kubernetes-config
```
Sau đó ta chờ 1 lúc để Pod mới được deploy (các bạn từ `get pod` để check status nhé), sau đó ta quay lại trình duyệt, bấm F5 và login với `EMAIL` và `PASSWORD` như ta định nghĩa trong file secret. Login thành công vào trong ta bấm nút Get Secret:

![Screenshot 2022-11-01 at 4.42.37 PM.png](https://images.viblo.asia/af929fae-252b-442a-8fce-63d09d149bc1.png)

Mở file download lên và ta thấy được nội dung file secret của chúng ta:

![Screenshot 2022-11-01 at 4.43.12 PM.png](https://images.viblo.asia/c8237510-9a5c-47b9-8b01-3d6e0b0271f7.png)

Oke vậy là ta đã hoàn thành setup Secret và Configmap rồi đó :).
# Vọc vạch
Thử vọc thêm tí nữa nhé. Bây giờ ta thử update lại `secret.yml`:
```yml
apiVersion: v1
kind: Secret
metadata:
  name: myapp-secret
type: Opaque
stringData:
  EMAIL: "newadmin@gmail.com"
  PASSWORD: "abcdefg"
  secret.txt: |
    This is new secret
```
Sau đó ta `apply` lại:
```
kubectl apply -f secret.yml --kubeconfig=kubernetes-config
```
Ngay bây giờ, đừng restart deployment vội nhé, ta chui luôn vô container để xem cái file `secret.txt` đã được cập nhật chưa:
```
kubectl exec -it myapp-deployment-6dcc8b9b68-gpnvk --kubeconfig=kubernetes-config -- sh
```
> đổi tên pod khi `exec` cho giống với của các bạn nhé

Sau khi vào trong ta xem file `secret.txt` có gì nhé:
```
/app $ cat storage/secret.txt 

--->>>

My supersecret
```

Ô, cái gì nó nổ ý nhề? 🧨🧨, ủa sao file secret lại không update nữa rồi. Khi nãy ở bên Configmap update volume cái thì bên trong nó tự động đổi luôn không cần restart mà??? 🤔🤔🤔

Lí do volume của ta **không được update "realtime" vào trong container** nữa là bởi vì hiện tại ta dùng `subPath` để mount, và như vậy ta sẽ không nhận được update mới nữa mà phải restart lại deployment. Đây là K8S quy định chứ không phải mình tự vẽ ra nhé các bạn 🤣🤣🤣. 

Bây giờ cái configmap và secret ta đều đang dùng `subPath` nên khi thay đổi chúng thì ta phải restart lại deployment, các bạn thử check với Configmap xem nhé ;) 

Giờ ta restart lại deployment là được nhé:
```
kubectl rollout restart deploy myapp-deployment --kubeconfig=kubernetes-config
```

Sau đó ta quay lại trình duyệt F5, thử login với EMAIL và PASSWORD mới, vô trong ta download file secret mới được rồi đó. Các bạn tự làm phần này nhé ;)

À tí quên, nếu các bạn để ý khi ta chui vào container và list file:

![Screenshot 2022-11-01 at 4.58.03 PM.png](https://images.viblo.asia/07644846-615a-46ff-b135-00c878e5b178.png)

![Screenshot 2022-11-01 at 4.58.12 PM.png](https://images.viblo.asia/b7b74d5e-d69c-43f5-8c19-c3ee236278cc.png)

Ta để ý thấy rằng, khi ta dùng `subPath`, thì ta chỉ mount file vào bên trong folder `storage` sẵn có từ trước (từ build image, trong Dockerfile), do vậy permission của folder storage vẫn được bảo toàn `nextjs:nodejs`, chỉ là 2 file được mount vào bên trong thì của `root:nodejs`.

Nó hơi khác 1 chút so với ở đầu bài đoạn làm với Configmap, ta mount cả volume vào thẳng đường dẫn `/app/storage`, tức là mount đè lên folder storage sẵn có của image, và làm cho cả folder `storage` bị đặt dưới quyền `root:nodejs`

Về permission thì ta sẽ thảo luận dần dần ở các bài sau để làm rõ hơn nhé :)

# Câu hỏi liên quan
## Có nên push cả ConfigMap và Secret lên Git?
Câu trả lời là không, à tuỳ :). nhưng best pratice là ta không bao giờ đưa thông tin "nhạy cảm" lên git, và secret cũng vậy.

Ví dụ ConfigMap của bạn chưa thông tin có thể public, không riêng tư thì có thể đưa lên được, còn Secret thì hầu như không.

Thông thường mình vẫn muốn push file `secret.yml` lên Git để mọi người có thể track được file đó là gì, cấu trúc như nào. Thì trước khi `git push` mình sẽ sửa lại như sau:
```yml
apiVersion: v1
kind: Secret
metadata:
  name: myapp-secret
type: Opaque
stringData:
  EMAIL: <PLACEHOLDER>
  PASSWORD: <PLACEHOLDER>
  secret.txt: <PLACEHOLDER>
```
## Secret có những Type nào?
Ở trong bài này ta mới chỉ nói về `Type=Opaque` là type phổ biến và hay dùng nhất cho Secret, nhưng Secret còn có 1 số type khác, như hình dưới:

![Screenshot 2022-11-01 at 5.05.49 PM.png](https://images.viblo.asia/fd844e3a-ae81-47a1-ac8b-9e416d1c89e9.png)

ví dụ type `dockercfg/dockerconfigjson` dùng để kết nối tới private registry để pull image, hiện tại ta pull trực tiếp từ Dockerhub Public nên không cần cái đó. Hay type `service-account-token` dành cho ServiceAccount, và một số type khác.

Các type này hầu như ta khá ít phải tự tay trực tiếp tạo chúng, chúng thường được tạo luôn bằng các tool như Helm hay như lúc ta dùng package dạng `cert-manager` nó cũng tự tạo cho chúng ta. Còn mấy type về docker config để pull image từ private registry thì ví dụ như mình dùng Digital Ocean thì họ có option để tự động inject (truyền) config vào luôn K8S cluster của mình nếu như mình dùng Registry của họ
## Tạo Secret bằng command?
Nếu các bạn muốn đi "tàu nhanh" dùng Terminal để tạo secret thì cũng được. Ta dùng các command dạng như sau:
```
kubectl create secret generic prod-db-secret --from-literal=EMAIL=admin@test.com --from-literal=PASSWORD=123456
```
Nhưng như mình vẫn nói, thì ta luôn ưu tiên dùng file manifest tạo tất cả mọi resource trên K8S nhé, để sau này có thể puhs lên Git, dễ dàng cho việc xem lại và track thay đổi
## Nom Secret có khác gì ConfigMap đâu???
Để ý thấy rằng từ lúc ta định nghĩa secret (type=Opaque) đến lúc ta dùng nó ở `env` hay mount nó vào bằng `volumes` thì có khác gì ConfigMap đâu??? Chả nhẽ nó được bảo mật hơn vì được hash thành base64 à, mà base64 thì làm gì có bảo mật vì nó có thể được revert 1 cách rất dễ dàng?? 🤔🤔🤔

Các bạn nói đúng suy nghĩ của mình lúc mới học K8S rồi đó, mình đã rất băn khoăn là ủa chúng có cái gì khác nhau nhỉ, mấy cái mình hay dùng bên secret thì configmap cũng có đủ cả, chả thiếu gì. Sao người ta lại phải bày vẽ ra thêm 1 loại làm gì cơ chứ?, sao không dùng 1 cái thôi????

Thì tìm được câu trả lời [ở trên StackOverflow](https://stackoverflow.com/a/36925553/7569705) từ trực tiếp author (người tham gia vào phát triển) của 2 tính này năng này.

Đơn giản ô ý cũng chỉ nói là:
- dùng secret cho data "nhạy cảm"
- còn configmap dùng cho những thứ không nhạy cảm
- tương lai thì họ sẽ thêm nhiều feature vào cho secret hơn nữa

Nhưng thật sự với mình thì giải thích như vậy chưa làm mình "thoả mãn" vì sự khác nhau giữa chúng vẫn chưa được nói rõ lên:
- vậy sao ta không dùng luôn secret cho rồi??
- secret gọi là là"bảo mật hơn" vì nó được mã hoá base64 à? base64 thì làm gì có bảo mật vì nó có thể được revert (đảo ngược dễ dàng)??

Ở thời điểm hiện tại (2022), từ góc độ của của mình thì nó vẫn hơi giống kiểu "best pratice", đó là "ừ, cứ cái nào nhạy cảm thì nên dùng secret, thế thôi" 😅😅
## Lấy toàn bộ secret vào truyền thẳng vào biến môi trường
Ở bên `Docker Compose` ta có thể khai báo `env_file` để truyền toàn bộ biến ở trong 1 file env nào đó vào biến môi trường, kiểu như sau:
```
APP_NAME="Hello World"
EMAIL=admin@test.com
PASSWORD=123456
```

Tương tự ở bên K8S thì ta cũng có thể truyền toàn bộ ConfigMap hay Secret vào làm biến môi trường, ở file `myapp.yml` phần khai báo `containers` ta thêm vào nhưu sau là được:
```yml
      containers:
      - name: myapp-container
        image: maitrungduc1410/configmap-and-secret
        envFrom:
        - secretRef:
            name: myapp-secret
        - configMapRef:
            name: myapp-config
```
Kiểu này mình khá là hay dùng, vì đơn giản và tiện lợi, mình thường tổ chức các file secret/configmap kiểu:
- file chỉ chứa biến môi trường ra 1 kiểu:
```yml
apiVersion: v1
kind: Secret
metadata:
  name: myapp-secret
type: Opaque
stringData:
  EMAIL: "newadmin@gmail.com"
  PASSWORD: "abcdefg"
```
- còn lại nếu file có chứa nội dung dài, dạng text bất kì thì đưa ra thành các configmap/secret riêng:
```yml
apiVersion: v1
kind: Secret
metadata:
  name: myapp-secret
type: Opaque
stringData:
  file1.txt: |
    This is new secret
  file2.txt: |
    This is new secret
```

Và như vậy thì khi mình muốn truyền toàn bộ configmap hay secret vào `env` sẽ tiện hơn, đỡ bị mix giữa biến môi trường và những dạng text kiểu file. Đây là hướng đi cá nhân thôi nhé, còn hoàn toàn tuỳ các bạn :D

## Với secret nên dùng `stringData` hay `data`

Câu trả lời là tuỳ các bạn nhé, vì `stringData` thì sau khi `apply` nó cũng được K8S convert thành `data`, và giữa 2 cái chẳng cái nào bảo mật hơn vì base64 của `data` thì cũng dễ dàng được revert :)
## Thôi bỏ qua ConfigMap, cứ dùng Secret cho lành
Như ở phần trên mình nói về sự khác biệt giữa ConfigMap và Secret. Thì với những dữ liệu dạng không "nhạy cảm" thì ta có thể dùng ConfigMap thay vì Secret.

Nhưng thật sự nếu các bạn nói là thôi cứ dùng Secret cho lành thì cũng không sao cả :)

> Mà kể ra nếu các bạn biết chia đâu là configmap đâu là secret, nó cũng cho thấy cách bạn tổ chức project, config,... tốt thế nào và bạn hiểu project của bạn ra sao: cái nào nhạy cảm, cái nào không,.... ;), vậy nên cố gắng đừng máy móc nhé

# Chấm hết
Phùu...... bài tưởng ngắn mà dãi quá đáng 😂😂

Mong là qua bài này các bạn đã biết về ConfigMap và Secret trên K8S, các tạo, sử dụng, update,...Thật ra nói thì nhiều vậy chứ thực tế thì mình thấy cách dùng nó khá đơn giản. Phổ biến nhất là dùng nó để truyền biến môi trường vào container, đơn giản như đan rổ 😎😎

Chúc các bạn thực hành vui vẻ. Hẹn gặp lại các bạn ở những bài sau ^^