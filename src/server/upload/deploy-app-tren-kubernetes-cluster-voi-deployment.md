Hello các bạn lại là mình đây 👋👋👋

Tiếp tục trở lại với [series học Kubernetes](https://viblo.asia/s/hoc-kubernetes-tu-co-ban-den-gan-nang-cao-aAY4qQ6w4Pw), ở bài trước ta đã tìm hiểu về [giao tiếp trên K8S với Service](https://viblo.asia/p/giao-tiep-trong-kubernetes-cluster-voi-service-0gdJzjAjJz5).

Ở bài này ta sẽ tiếp tìm hiểu về Deployment, thứ mà chúng ta sẽ gặp và làm việc nhiều nhất khi làm thật. Ta sẽ cùng xem:
- cách tạo deployment thế nào
- scale app ra sao
- zero downtime deployment trên K8S là thế nào
- ....

Thôi không luyên thuyên nữa, ta bắt đầu thôi nào 🚀🚀🚀

# Lấy K8S Session
Vẫn như thường lệ, trước khi bắt đầu các bạn đảm giúp mình là đã lấy được K8S Session để truy cập vào cluster của mình đẻ lát nữa ta thực hành nhé. Xem lại [bài cũ giúp mình nhé](https://viblo.asia/p/mo-dau-voi-pod-tren-kubernetes-2oKLn2ryLQO#_setup-0)

# Kiến thức vỡ lòng
Ở bài [mở đầu với Pod](https://viblo.asia/p/mo-dau-voi-pod-tren-kubernetes-2oKLn2ryLQO), ta đã biết rằng app của chúng ta khi được deploy trên K8S thì bản chất là nó chạy ở trong Pod, ta có thể viết manifest để trực tiếp deploy 1 hoặc nhiều Pod tuỳ ta mong muốn.

Các Pod đó là `naked Pod` (pod trần chuồng 🤣🤣🤣), ý là nó sẽ không được deploy lại nếu xảy ra lỗi. Và ta nên hạn chế dạng Pod này

Khi làm thật, production, thì thường ta sẽ không deploy trực tiếp Pod như vậy mà làm qua Deployment (cùng với Service). Với Deploy *ta có thể tạo và quản lý Pod và Replicaset*. Ta định nghĩa `state` ta mong muốn cho app của chúng ta (bao nhiêu instance, như nào thì ok cho traffic đi vào pod, khi nào thì cần restart pod,...) và K8S Deployment sẽ giúp ta "đảm bảo" việc đưa trạng thái app của chúng ta về state đó.

Một số ưu điểm của Deployment:
- tự động deploy lại pod nếu xảy ra lỗi
- zero downtime deployment: mỗi khi ta update deployment (scale, đổi image với code mới, đổi cpu/ram limit,....), thì k8s sẽ thực hiện re-deploy 1 cách "từ từ" đảm bảo là app của chúng ta vẫn luôn chạy để user sử dụng
- rollout (deploy) mới hoặc rollback về version cũ bất kì lúc nào
- ta có thể *pause* tạm dừng deployment khi ta muốn
- ....

# Tạo deployment
Bây giờ ta cùng nhau bắt đầu tạo deployment và cả Service để có thể truy cập vào app của chúng ta nhé ;)

Đầu tiên ta tạo file manifest tên là `myapp.yml` với nội dung như sau nhé:
```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
  labels:
    app: myapp
spec:
  replicas: 2
  selector:
    matchLabels:
      app: myapp-pod
  template:
    metadata:
      labels:
        app: myapp-pod
    spec:
      containers:
      - name: myapp-container
        image: nginx:1.14.2
        ports:
        - containerPort: 80
          name: http
        resources:
          requests:
            memory: "64Mi"
            cpu: "64m"
          limits:
            memory: "128Mi"
            cpu: "128m"

---
apiVersion: v1
kind: Service
metadata:
  name: myapp-svc
spec:
  type: LoadBalancer
  ports:
    - name: first-port
      protocol: TCP
      port: 8000
      targetPort: http
  selector:
    app: myapp-pod
```
Ố ồ, dừnggggggggg, sao lại viết chung cả Service chung vào với Deployment thế kia??? 🤔🤔🤔

À thì đơn giản là ngoài tách riêng từng object ra các file (deployment, service) thì ta cũng có thể gộp tất cả chúng lại, các objects phân tách với nhau bởi dấu `---`, bạn có thể viết gộp bao nhiêu objects vào 1 file

Vọc vạch chút trước khi `apply` nhé những người anh em thiện lành:
- để tạo Deployment thì ta phải định nghĩa `kind=Deployment`, đặt cho nó label `app: myapp`.
- bên trong spec thì ta có `replicas=2` ý là ta muốn tạo 2 pod, khi ta `apply` thì sẽ có 1 Replicaset được tạo ra để quản lý 2 pod này, nếu ta không nói `replicas` bằng bao nhiêu thì mặc định là 1. Các bạn có thể set `replicas=0` cũng được
- tiếp đó ta có `selector`đây là label selector cho Pod. KHÔNG phải là label selector cho deploy ta định nghĩa bên trên nhé. Ở đây ta muốn nói rằng "deployment" này sẽ được `apply` cho các pod có label `match` với giá trị `app: myapp-pod`
- bên dưới đó là ta có `template` (cái này người ta cũng gọi là `PodTemplateSpec`), nơi ta định nghĩa `spec` cho pod
- bên trong template thì đầu tiên ta phải định nghĩa `metadata` với `labels` giống với giá trị cho pod label selector ở trên (`matchLabels`)
- tiếp đó cũng giống như ở bài viết manifest cho naked Pod, thì ta có `spec` nơi ta định nghĩa container cho Pod: tên container, image là gì, expose port 80 (ta cũng đặt tên "phụ" cho nó là `http`), và thêm resource request.

Bên dưới cùng thì ta có định nghĩa cho Service, giống như [bài trước](https://viblo.asia/p/giao-tiep-trong-kubernetes-cluster-voi-service-0gdJzjAjJz5) mình đã trình bày rồi nhé.

`apply` triển thôi nào anh em ơi 😎😎:
```
kubectl apply -f myapp.yml --kubeconfig=kubernetes-config
```
Sau đó ta sẽ `get pod` xem trạng thái ra sao rồi nhé:
```
kubectl get po --kubeconfig=kubernetes-config
```
Ta thấy in ra như sau:
```
NAME                                READY   STATUS    RESTARTS   AGE
myapp-deployment-55f998b87b-g7qtv   1/1     Running   0          4s
myapp-deployment-55f998b87b-n6pjq   1/1     Running   0          4s
```

> Như trên ta đã có 2 Pod `Running` ok

Check trạng thái chung của cả deployment thì ta cũng `get deployment` là ra:
```
kubectl get deploy --kubeconfig=kubernetes-config
```
Và ở terminal in ra:
```
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
myapp-deployment   2/2     2            2           8s
```
Ở trên ta thấy một số thông tin như sau:
- READY: đã có bao nhiêu pod đã "ready" cho user gọi vào, như ta thấy thì cả 2/2 pod đã ready
- UP-TO-DATE: bao nhiêu pod đã được update để đạt trạng thái mong muốn (2)
- AVAILABLE giống READY

> Ở trên mình viết tắt là "get deploy", ta có thể viết là "get deployment" hay "get deployments" cũng được

Mỗi 1 lần mà ta apply và Deployment chạy lại, hay ta update trực tiếp deployment từ terminal (đổi image, đổi volume,....) thì deployment cũng chạy lại. Mỗi lần "chạy lại" như thế thì ta gọi là 1 lần "rollout".

Ta thử "watch" trạng thái rollout của deployment này xem nhé:
```
kubectl rollout status -w deployment/myapp-deployment --kubeconfig=kubernetes-config

---

deployment "myapp-deployment" successfully rolled out
```
Bên trên K8S báo là deployment của chúng ta đã rollout thành công.

Ta thử check rollout history của deployment của chúng ta xem nhé:

```
kubectl rollout history deploy/myapp-deployment --kubeconfig=kubernetes-config

-----

deployment.apps/myapp-deployment 
REVISION  CHANGE-CAUSE
1         <none>
```
> bên trên mình vẫn viết tắt là "deploy/...", các bạn có thể viết đầy đủ ra cũng được nhé

Ta thấy output ra lịch sử rollout của deployment này, có `REVISION` (phiên bản, tăng dần từ 1,2,3 ...), và `CHANGE-CAUSE` thay đổi nào đã tác động tới lần rollout đó.

Ở đầu bài mình có nói là Deployment sẽ tạo ra 1 Replicate set tương ứng để quản lý pod. Ta thử `get` nó xem có gì nhé:
```
kubectl get rs --kubeconfig=kubernetes-config

------>>

NAME                          DESIRED   CURRENT   READY   AGE
myapp-deployment-55f998b87b   2         2         2       3m6s
```
Ở trên ta lại thấy các thông số như sau: (lắm thông số quá 😥😥😥😥)
- DESIRED: số Pod mà ta mong muốn, ta mong muốn nhé các bạn. Cái mà ta định nghĩa ở file manifest (replicas=2)
- CURRENT: hiện tại đang có bằng này pod RUNNING (nhưng chưa chắc đã READY cho user gọi vào)
- READY: số Pod thực tế ready để nhận traffic từ user

Giờ ta test thử xem là app của chúng ta chạy oke chưa đã nhé, các bạn `get service` để lấy load balancer  trước nhé:
```
kubectl get svc --kubeconfig=kubernetes-config

---

NAME        TYPE           CLUSTER-IP       EXTERNAL-IP    PORT(S)          AGE
myapp-svc   LoadBalancer   10.245.136.215   146.190.7.21   8000:30623/TCP   44m
```
Như ở trên các bạn thấy External-IP của mình là `146.190.7.21`, của các bạn sẽ khác đó nhé.

Và giờ ta mở trình duyệt truy cập ở địa chỉ `ExternalIP:8000` sẽ thấy như sau:

![Screenshot 2022-10-27 at 6.07.13 PM.png](https://images.viblo.asia/b4c85889-3f48-42de-8641-5d08192ec0af.png)
 
 > Để ý version hiện tại của nginx là 1.14.2 giống với tag của image mà ta đang dùng

Tiếp theo ta sẽ update lại deployment để chạy với image nginx phiên bản mới hơn nhé:
```
kubectl set image deploy/myapp-deployment myapp-container=nginx:1.16.1 --kubeconfig=kubernetes-config

---

deployment.apps/myapp-deployment image updated
```
Ở trên ta thay đổi trực tiếp image từ terminal, đổi image của container `my-container` lên `nginx:1.16.1`

Ngay sau đó nếu ta thử `get pod` và `watch rollout status` thì sẽ thấy như sau:

![Screenshot 2022-10-27 at 6.54.30 PM.jpg](https://images.viblo.asia/1503bf77-1fea-4d36-82e2-356ec168d4ff.jpg)

Ở trên ta thấy ngay sau khi `set image` thì K8S sẽ ngay lập tức triển khai pod mới, nhưng các pod cũ vẫn giữ nguyên, đảm bảo trong thời gian đó app của chúng ta không có downtime, user vẫn có thể truy cập thoải mái.

Sau khi deploy pod mới thành công thì K8S sẽ `teardown, terminate` dần pod cũ đi.

> Chú ý rằng trong quá trình deploy, bất kì Pod mới nào READY là cũng sẽ nhận được traffic đẩy vào. Nên có thể dẫn tới trường hợp là trong 1 khoảng thời gian ngắn (1 vài giây), lúc mà Deployment đang update thì cùng lúc tồn tại cả pod cũ và pod mới, dẫn tới việc cùng 1 user nhưng 2 requests có thể đi vào 2 pod chạy 2 version cũ/mới khác nhau. Cái này ta sẽ xử lý sau ở bài Blue Green deployment nhé

Nếu bây giờ ta quay lại trình duyệt truy cập thử thì sẽ thấy trong response trả về, nginx đã được update lên phiên bản mới:

![Screenshot 2022-10-27 at 7.05.11 PM.png](https://images.viblo.asia/9c972af4-d344-4de3-903d-18d02c2b6a3c.png)

Ngoài việc update deploy trực tiếp từ terminal như trên (`set image`), thì ta cũng có thể edit lại file manifest và chạy lại `apply`, đây là cách phổ biến hơn cả, và cũng là cách mình thường dùng.

Các bạn mở file `myapp.yml` và đổi lại image thành:
```yml
image: nginx:1.19.10
```
Sau đó ta thực hiện apply:
```
kubectl apply -f myapp.yml --kubeconfig=kubernetes-config

---

deployment.apps/myapp-deployment configured
service/myapp-svc unchanged
```
> như bên trên K8S báo là deployment đã được "cấu hình" (thay đổi), service thì không đổi gì cả (unchanged)

Ta lại get pod thì lại thấy kết quả tương tự, K8S đang bắt đầu triển khai pod mới:
```
kubectl get po --kubeconfig=kubernetes-config

--->>

NAME                                READY   STATUS              RESTARTS   AGE
myapp-deployment-5c5946dc8f-cvkg2   1/1     Running             0          15m
myapp-deployment-5c5946dc8f-j87wt   1/1     Running             0          15m
myapp-deployment-7749c46bcb-k9d8l   0/1     ContainerCreating   0          4s
```

Chờ 1 lúc cho deploy xong, get lại pod thấy RUNNING là oke nhé ;):
```
NAME                                READY   STATUS    RESTARTS   AGE
myapp-deployment-7749c46bcb-9gs86   1/1     Running   0          10s
myapp-deployment-7749c46bcb-k9d8l   1/1     Running   0          14s
```
Quay lại trình duyệt, F5 kiểm tra sẽ thấy phiên bản nginx được update:

![Screenshot 2022-10-27 at 7.12.02 PM.png](https://images.viblo.asia/337bc8f9-56ef-4ef3-a83d-fee52971c8c7.png)

> ngoài việc trực tiếp edit file thì ta cũng có thể chạy command sau để edit deployment na ná như edit file luôn `kubectl edit deploy myapp-deployment --kubeconfig=kubernetes-config`

# Vọc vạch sâu sâu hơn tí
## Scale
Hiện tại ở trong file manifest `myapp.yml` ta đang để `replicas=2` tức là sẽ có 2 pod chạy cho app của chúng ta, giờ ta thử scale lên 4 pod nhé.

Các bạn mở file `myapp.yml`, và sửa `replicas=4` nhé:
```yml
replicas: 4
```
Sau đó ta `apply` tiếp:
```
kubectl apply -f myapp.yml --kubeconfig=kubernetes-config
```
Thử `get` lại pod và ta sẽ thấy:
```
kubectl get po --kubeconfig=kubernetes-config

---

NAME                                READY   STATUS    RESTARTS   AGE
myapp-deployment-7749c46bcb-7jksl   1/1     Running   0          45s
myapp-deployment-7749c46bcb-h9fcl   1/1     Running   0          8m42s
myapp-deployment-7749c46bcb-kqvf9   1/1     Running   0          8m40s
myapp-deployment-7749c46bcb-qzd59   1/1     Running   0          45s
```
Quay lại trình duyệt thử F5 thấy không có gì khác biệt (từ phía end user), nhưng thực tế đằng sau thì app đã được scale từ 2 thành 4 instances, Service sẽ làm nhiệm vụ điều phối traffic vào các pod cho chúng ta, hoàn toàn tự động, rất đơn giản phải không các bạn ;)

Ở thực tế nếu ta có thể ước lượng được lượng traffic thì ta có thể chọn trước 1 con số `replicas` cho phù hợp

> Ở bài auto scale ta sẽ xem cách scale tự động khi có traffic tăng cao nhé

Cá nhân mình thấy "ấn tượng" với K8S khi mình biết tới deployment, mọi thứ đơn giản hơn vô cùng nhiều: deploy, update image mới, scale,....

So với cái thời ngày xửa ngày xưa khi mọi thứ phải làm bằng tay. Lúc deploy mới bằng Docker hay cái Deployer của PHP thì phải "down" cái cũ đi, bị downtime 1 tí (đôi khi là nhiều tí :D). Xong lúc scale lên thì phải tự add thêm instance mới vào Load balancer để LB nó biết để đẩy traffic vào. Nhìn chung là vất vả 😪😪😪
> Chú ý là namespace của các bạn mình đã limit 750m CPU/1Gi RAM, nên các bạn không scale được nhiều quá đâu nhé, mỗi instance hiện tại có thể ăn tối đa (`limits: 128m CPU / 128Mi` --> không có quá 750/128 = 5 Pod tại bất kì thời điểm nào)
## ReplicaSet
Mỗi 1 lần mà ta `apply` deployment, thì tương ứng nó sẽ tạo ra 1 ReplicaSet mới để quản lý số Pod của chúng ta. Bây giờ ta chạy command sau để `get replicaset` nhé:
```
kubectl get rs --kubeconfig=kubernetes-config
```
Ta thấy in ra như sau:
```
NAME                          DESIRED   CURRENT   READY   AGE
myapp-deployment-55f998b87b   0         0         0       43m
myapp-deployment-5c5946dc8f   0         0         0       35m
myapp-deployment-7749c46bcb   4         4         4       34m
```
Như bên trên ta thấy có tổng cộng 3 replicaset tương ứng với 3 lần ta `apply`, trừ lần cuối khi ta scale từ 2->4 pod


Rồi rồi, nói riết Replicaset, Replicaset, mà chẳng hiểu gì, thế bản chất nó là cái gì????? 😒😒😒

Thì ReplicaSet là 1 K8S object mà nhiệm vụ của nó là đảm bảo sự ổn định của 1 số lượng Pod đang chạy ở bất kì thời điểm nào. Kiểu mình bảo nó là: "ê ReplicaSet, tôi muốn có 4 pod luôn chạy ổn định ở mọi thời điểm, đảm bảo điều đó cho tôi, lúc nào mà tôi `get pod` mà thấy không đủ 4 thì liệu hồn" 😘😜

Ví dụ trong trường hợp của chúng ta thì K8S tạo ra ReplicaSet như sau:
```yml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: frontend
  labels:
    app: myapp
spec:
  replicas: 4
  selector:
    matchLabels:
      app: myapp-pod
  template:
    metadata:
      labels:
        app: myapp-pod
    spec:
      containers:
      - name: myapp-container
        image: nginx:1.19.10
```
Ủa nom giống manifest của Deployment thế nhỉ, thay mỗi `kind: ReplicaSet` 🤔🤔🤔 Đúng rồi đó các bạn 🤣

Thường thì ta rất ít khi, hay cụ thể là gần như không bao giờ phải tự tay tạo ReplicaSet, thay vào đó ta nên dùng Deployment, và Deployment sẽ tự làm điều đó và quản lý nó thay ta

## Rollback về version cũ
Giả sử giờ ta vừa deploy ra bản mới và đồng đội của ta thảng thốt: ông ơi bỏ mịa quên tôi lại đang log user password ra console, nãy quên dev ở local log ra để debug cho dễ, ông rollback lại version cũ hộ tôi tí không lát Leader nhìn thấy thì tháng này thiếu tiền mua sữa cho con bú ngoài 🙃🙃

Lúc là những lúc ta cần K8S giúp ta rollback về version cũ, 1 tính năng cũng rất đáng tiền của K8S nữa, vì đây cũng là 1 vấn đề khá phổ biến khi chạy production: vừa rollout bản mới phát thâý failed, muốn nhanh chóng đưa lại bản cũ stable.

Oke huyên thuyên đủ rồi, giờ ta cùng check rollout history xem từ đầu tới giờ ta đã deploy mấy lần nhé:
```
kubectl rollout history deploy/myapp-deployment --kubeconfig=kubernetes-config

----


REVISION  CHANGE-CAUSE
1         <none>
2         <none>
3         <none>
```
Ở trên ta đã deploy 3 lần, mỗi lần ta set image với 1 tag khác nhau: v1.14, v.1.16 và v1.19 (hiện tại)

Quay lại trình duyệt kiểm tra trước đảm bảo ta đang chạy bản 1.19 nhé:

![Screenshot 2022-10-28 at 3.23.47 PM.png](https://images.viblo.asia/14569e81-90a0-476c-9ff2-cd40f3e8d48f.png)

Giờ ta sẽ tiến hành rollback lại bản cũ v1.16 (REVISISON=2):

```
kubectl rollout undo deploy/myapp-deployment --kubeconfig=kubernetes-config
```
Ngay lập tức như 1 cơn gió, K8S sẽ tiến hành tạo các pod mới với image v1.16 và sau đó Terminate các pod v1.19:

![Screenshot 2022-10-28 at 3.25.39 PM.jpg](https://images.viblo.asia/12fae17d-fae7-4f87-bd92-165df483a1cb.jpg)

Và sau khi tất cả mọi thứ xong xuôi ta `get` pod sẽ thấy đủ 4 pod v1.16 RUNNING:
```
kubectl get pod --kubeconfig=kubernetes-config

----

myapp-deployment-5c5946dc8f-9n76q   1/1     Running   0          2m45s
myapp-deployment-5c5946dc8f-bzpbf   1/1     Running   0          2m41s
myapp-deployment-5c5946dc8f-wnzkl   1/1     Running   0          2m31s
myapp-deployment-5c5946dc8f-wr6z6   1/1     Running   0          2m44s
```
Quay lại trình duyệt kiểm tra cho chắc chắn đảm bảo nginx đã về phiên bản cũ nhé:

![Screenshot 2022-10-28 at 3.26.03 PM.png](https://images.viblo.asia/83ac8364-5508-40d0-8a2c-5d55e7ded077.png)

Command `undo` ta chạy bên trên sẽ đưa deployment về lần rollout ngay trước đó, nếu ta muốn nhảy cóc 1 phát về 1 REVISION bất kì thì ta thêm `--to-revision=2` vào là được:
```
kubectl rollout undo deploy/myapp-deployment --kubeconfig=kubernetes-config --to-revision=2
```
## Pause/Resume deployment
Ta thậm chí có thể Pause Deployment để dừng việc rollout của nó, cái này ta có thể làm khi ta muốn vọc vạch deploy các kiểu nhưng không muốn rollout.

Nhưng cái này mình thấy khá ít khi dùng, các bạn có nhu cầu tự tìm hiểu thêm giúp mình nhé :)

# Các câu hỏi liên quan
## Oke vậy là ta nên dùng Deployment thay vì tạo Pod trực tiếp (naked)?
Đúng vậy, ta nên luôn dùng Deployment để deploy thay vì dùng naked pod nhé, sẽ tiện hơn rất nhiều cho chúng ta, Deployment cũng cho ta thêm rất nhiều tính năng nữa mà naked Pod không có
## Nên update Deployment thế nào?
Như trong bài có đoạn ta `set image` cho deployment để rollout bản mới trực tiếp từ terminal.

Nhưng các mình khuyên dùng là tất cả mọi thứ, mọi update, ta đều làm qua file manifest, như vậy sau này khi đẩy manifest lên Git thì ta có thể track được thay đổi theo thời gian, và người khác cũng có thể biết chính xác ta đã đổi những gì
## Viết Deployment và Service chung hay riêng?
Tuỳ các bạn :)

Nhưng mình thì hay viết chung luôn. Deployment + Service như kiểu cặp bài trùng luôn đi cùng với nhau. 1 cái để deploy pod, 1 cái để expose Pod để nơi khác có thể gọi vào.
## Pull image từ private registry như thế nào?
Như các bạn thấy trong bài ta lấy image từ public Dockerhub Registry. Khi muốn pull image từ private registry, ví dụ như từ gitlab như các bài trong [series học Docker](https://viblo.asia/s/series-hoc-docker-cicd-tu-co-ban-den-ap-dung-vao-thuc-te-jeZ103QgKWz) thì ta cần dùng tới `imagePullSecret`. Cái này ta sẽ thảo luận ở các bài tới nhé
## Apply từ 1 url hay 1 folder?
K8S cho phép ta có thể apply trực tiếp từ 1 link nào đó thay vì phải có file manifest từ local.

Ví dụ bên dưới ta `apply` file manifest tạo ingress nginx trực tiếp từ Github:
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.4.0/deploy/static/provider/do/deploy.yaml
```

Còn nếu ta muốn apply cả 1 folder thì ta thêm option `-R` nhé:
```
kubectl -R -f .....
```
## Xoá Deployment
Để xoá Deploy thì ta có 2 cách: xoá trực tiếp hoặc xoá qua file manifest

1. Xoá trực tiếp

```
kubectl delete deploy myapp-deployment --kubeconfig=kubernetes-config
```
2. Xoá qua file manifest:
```
kubectl delete -f myapp.yml --kubeconfig=kubernetes-config
```

Chú ý rằng khi xoá qua file manifest thì K8S sẽ xoá tất cả mọi thứ trong đó luôn, như bài này là sẽ xoá cả Service trong đó
# À...
Trong bài nếu các bạn để ý thì ở file manifest thì mình đang để mỗi thứ 1 `label` khác nhau, để làm rõ nhất label nào để làm gì, được dùng ở đâu như thế nào.

Cả `name` cũng vậy, mình để `myapp-svc` cho service, `my-app-deployment` cho Deployment, `myapp-container` cho tên container,...

Thực tế thì mình hay để chúng giống nhau luôn cho tiện. Ví dụ như sau:
```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  labels:
    app: myapp
spec:
  replicas: 4
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: nginx:1.19.10
        ports:
        - containerPort: 80
          name: http
        resources:
          requests:
            memory: "64Mi"
            cpu: "64m"
          limits:
            memory: "128Mi"
            cpu: "128m"

---
apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  type: LoadBalancer
  ports:
    - name: http
      protocol: TCP
      port: 8000
      targetPort: http
  selector:
    app: myapp
```
Việc này hoàn toàn tuỳ thuộc vào các bạn nhé. Các  bạn cứ thoải mái chọn cách các bạn muốn, tiện cho các bạn nhé :)
# Chào thân ái
Lại hết bài ồiiiii 😆😆

Qua bài này hi vọng rằng các bạn đã biết về Deployment, biết về cách create/update , 1 thứ mà chắc chắn khi làm việc với Kubernetes ta sẽ phải đụng tới vô cùnggggggggggggg nhiều và luôn luôn :)

Thân ái chào tạm biệt. Hẹn gặp lại các bạn ở những bài sau 👋👋