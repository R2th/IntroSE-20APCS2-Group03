Hề lô các bạn, lại là mình đâyyyyyyyyyyyyyyy 🤙🤙🤙 

Cuối tuần vừa rồi của các bạn thế nào, mình nhớ VN quá, mong ngóng cái không khí ở nhà 😮‍💨😮‍💨😮‍💨

........

Thôi yểu điệu đủ rồi 🤣🤣, ở bài trước ta đã cùng nhau xem qua [Tổng quan về K8S Cluster](https://viblo.asia/p/tong-quan-ve-kubernetes-cluster-EvbLbkdZVnk) như thế nào, ở bài này ta sẽ cùng nhau tìm hiểu về Pod, thành phần cơ bản nhất trên K8S cluster, và chắc cũng là thứ ta làm việc với nó nhiều nhất sau khi deploy.

Ta cùng nhau bắt đầu thôi nhé, lên tàu nào ae ơiiiiiii, bài này hơi dài đó mang theo đầy đủ đạn dược nhé 🚀🚀🚀🚀

# Setup
> Phần này cực kì quan trọng, các bạn cần nhớ cho các bài sau

Khi tới bài thực hành, mình đã đau đầu mất 2 hôm là làm thế nào để cho các bạn có được môi trường thực hành sao cho giống với thực tế nhất, gần nhất với production khi làm thật, chọn môi trường thực hành làm sao đồng nhất xuyên suốt toàn bộ series này:
- có tối thiểu 3 node để giống với production nhất (lời khuyên từ K8S)
- có đầy đủ khả năng để tạo pod, deployment, service, secret,....
- khi tới các bài về ingress, setup HTTPS, SSL có thể làm được, có domain thật để test
- Có volume thật để thực hành ở các bài về Persistent Volume
- Có từ 3 node trở lên cũng sẽ làm rõ nhất cho các bạn thấy quá trình scale/auto scale được diễn ra như thế nào và traffic được điều phối ra sao...

Mình nghĩ nát óc, vọc hết trên mạng để tìm những giải pháp tốt nhất, những cái playground phù hợp nhất, free,... nhưng không có cái nào mình thấy đầy đủ, cái thì thiếu cái này cái thiếu cái kia:
- minikube thì chỉ có 1 node
- [kind](https://github.com/kubernetes-sigs/kind): thì tới những bài về load balancer, https ingress sẽ phải custom
- Một số tool khác cho setup kubernetes ở local nhưng quá vất vả và mình thấy không cần thiết, hơi lan man
- Hay những chỗ khác thì nói "free" nhưng bắt nhập credit card :)
...
😮‍💨😮‍💨 

Mình muốn từ đầu tới cuối các bạn được thực hành trên **môi trường cloud, giống production nhất có thể (>= 3 node)**. Vì 96,69% khi làm thật thì hầu như **ta cũng dùng Kubernetes chạy trên cloud** chứ không tự chạy K8S trên VPS hay local machine làm gì cho mệt, rồi những bài về load balancer thì phải là LB thật, tới những bài về domain/HTTPS thì phải có domain thật trỏ vào...

Cuối cùng mình quyết định là sẽ dùng chính cluster của mình để cho các bạn thực hành, lởm lởm, cùi cùi nhưng đủ những điều kiện mình đề ra như ở trên. Domain thì sẽ share chung domain với domain của mình luôn ;)

Chúng ta cũng bắt đầu setup nhé.🚀🚀🚀

## Cài kubectl
Đầu tiên các bạn [vào trang chủ K8S](https://kubernetes.io/docs/tasks/tools/#kubectl) xem hướng dẫn cài kubectl nhé.
> kubectl đọc là "kúp ci ti eo" hoặc có người đọc là "kúp cần trô", mình hay theo cách số 1 "kúp ci ti eo" hơn

Nhớ sau khi cài xong thì phải test xem cài thành công chưa bằng cách chạy command:
```go
kubectl version --client

------

Thấy in ra kiểu như sau là được:

Client Version: version.Info{Major:"1", Minor:"22", GitVersion:"v1.22.0", GitCommit:"c2b5237ccd9c0f1d600d3072634ca66cefdf272f", GitTreeState:"clean", BuildDate:"2021-08-04T18:03:20Z", GoVersion:"go1.16.6", Compiler:"gc", Platform:"darwin/amd64"}
```
## Lấy session truy cập vào Cluster
Các bạn vào đây https://learnk8s.jamesisme.com để lấy session truy cập cluster của mình. Giao diện trang chủ như sau:

![Screenshot 2022-10-10 at 12.55.55 PM.png](https://images.viblo.asia/4aaacbfb-7aa0-426f-8e81-e24ba00d6d27.png)

Các bạn login bằng tài khoản Google (chắc sau này mình sẽ thêm support cho các dạng login khác như FB hay Github nữa ;)). Vào bên trong các bạn sẽ thấy giao diện như sau: 

![Screenshot 2022-10-10 at 12.56.15 PM.png](https://images.viblo.asia/485d122f-5209-4f72-a398-bd2c753ec94d.png)

Cluster dùng chung có 1 số thiết lập như sau:
- cho phép tối đa 10 sessions cùng lúc
- mỗi session gắn với 1 email, có namespace riêng và được truy cập trong 12 tiếng
- sau 12 tiếng thì mọi resource trong namespace của session của bạn sẽ bị "dọn" :D
- các bạn sẽ có permission để thao tác với các resouce sau: **pods,services,deployments,replicasets,statefulsets,secrets,configmaps,ingresses**
- Mỗi namespace mình set resource quota như sau, về cơ bản, đại loại là max CPU tổng là 0.75 CPU và 1 GB RAM, yên tâm sẽ đủ cho các bạn thực hành ;), mình sẽ tăng lên nếu các bài sau cần nhiều hơn:
```css:js
spec: {
  hard: {
    cpu: "750",
    memory: "1Gi"
  }
}
```

> resource quota là gì mình sẽ giải thích dần dần nhé

Ok, giới thiệu thế đủ rồi, để request session các bạn đơn giản là bấm submit, 1 file Kubernetes Config sẽ được gửi vào hòm mail của các bạn:

![Screenshot 2022-10-10 at 12.56.36 PM.png](https://images.viblo.asia/554bba33-7d19-4612-b2a7-8097c5d34773.png)

![Screenshot 2022-10-10 at 1.07.14 PM.png](https://images.viblo.asia/6d5bc612-d803-4d8f-a384-b8fe7404c354.png)

Các bạn tải file config kia về, để ở đâu cũng được, trong đó đã có config cho user để truy cập cluster cho các bạn, namespace, context các thứ luôn, chỉ việc dùng ;).

Để test truy cập cluster các bạn làm chạy thử command sau để get pods trong namespace:
```markdown
kubectl get pods --kubeconfig=<đường dẫn tới file config, relative hay absolute đều được>

----

Nếu thấy báo như sau là được:

No resources found in learnk8s-de7d02 namespace
```
## Đặt config mặc định vào biến môi trường
Như các bạn thấy là mỗi lần thực hiện bất kì command nào là các bạn đều phải thêm `--kubeconfig=...` vào, và nom nó khá bất tiện.

Cách hay hơn là ta nên đưa nó vào config mặc định của kubectl để command của ta nó gọn hơn, tiện hơn cho ta.

Nếu các bạn đang ở trên Mac/Linux thì chạy command, thì thêm cái sau vào `.bash_profile` và `.bashrc`:
```markdown
nano ~/.bash_profile

(hoặc dùng vim, vi cũng được)
```
Sau đó thêm **export KUBECONFIG=~/.kube/config:<đường dẫn tuyệt đối tới nơi bạn đang lưu file Kubernetes Config>** vào file nhé, sau đó ta đóng terminal lại mở cái mới. Cuối cùng là chạy command sau:
```markdown
kubectl config view --flatten
```

Sau đó ta test lại:
```sql
kubectl get pods
```

Với các bạn ở trên windows thì ta làm tương tự với Gitbash nhé, nếu các bạn không muốn dùng Gitbash mà muốn dùng Powershell hay command prompt thì phải thêm vào biến môi trường 1 cách thủ công, search Google giúp mình đoạn này nhé
## Sống nhân đức
Vì cluster này của mình share để chúng ta cùng học, nên các bạn đừng request nhiều session 1 lúc nhé, để người khác học chung với, mình đã limit theo email và device ID rồi, nhưng nếu các bạn vẫn cố chọc ngoáy thì mình ko thể chặn hết được.

Tương tự, ở bên trong namespace của các bạn, để các bạn được tự do thì mặc dù chỉ cho các bạn permission vào 1 số resource nhưng với những resouce đó mình cũng ko limit gì các bạn cả, nên đừng tạo ra nhiều quá nhé. (thực tế là mình có thể limit số lượng record cho từng resource đó, nhưng thôi ;))

Cuối cùng, mình **không lưu email** của các bạn vào bất kì database nào, **chỉ lưu trực tiếp trên metadata của namespace** để quản lý session, sau 12 tiếng thì namespace sẽ bị xoá và email của các bạn cũng bị xoá luôn, yên tâm nhé ;)

Xin cám ơn những người anh em thiện lành 🙏🙏. Chúng ta zô phần chính thôi nhé, nãy giờ mình luyên thuyên quá rồi
# Kiến thức vỡ lòng
## Pod là gì?
Như mình đã nói ở bài [Tổng quan về K8S Cluster](https://viblo.asia/p/tong-quan-ve-kubernetes-cluster-EvbLbkdZVnk), thì Pod là thực thể nhỏ nhất có thể deploy và quản lý được trên K8S Cluster. 1 Pod được chạy trên 1 node trên cluster, trong 1 pod là 1 tập hợp của 1 hay nhiều containers, các containers đó sẽ dùng chung storage (volume) và network.

Mỗi pod chúng ta sẽ có các file template để chỉ định hướng dẫn nó "chú nên chạy các container kia như thế nào" 😎.

![Pod](https://images.viblo.asia/914899bd-a9c6-422a-8499-0bb30bd0efc2.png)

Như hình trên các bạn có thể thấy tổng quan 1 node có thể chứa nhiều Pod, mỗi Pod có thể có 1 hoặc nhiều container, có volume, có 1 ClusterIP (10.10.10.2,...) gán với Pod đó

## Pod thường được dùng như thế nào?
Ta có thể trực tiếp chạy 1 pod (cái mà ta sẽ làm trong bài này), và pod đó gọi là `naked pod` (đọc là: "nếch kựt pọt" - pod trần chuồng :D), dạng pod mà sẽ không được chạy lại nếu như bị failed.

Nhưng cách phổ biến nhất đó là dùng những resource khác như Deployment hay Job để khởi tạo nó, đây cũng là cách mà ta nên dùng.

## Ví dụ
Âu cây, tới công chuyện rồi, nãy giờ nói riết, giờ ta cũng làm 1 ví dụ nhỏ nhé.💪💪

Các bạn tạo giúp mình 1 file template, ở bất kì đâu cũng được. đặt tên là `pod.yml` (tên đặt là gì cũng được nhé các bạn):
```go:yml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.19
    ports:
    - containerPort: 80
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
```
Giải thích 1 chút về file bên trên:
- các bạn chú ý là đôi khi ta sẽ thấy mọi người gọi file bên trên là "template file" nhưng phổ biến hơn là "manifest file", do vậy sau này ta thống nhất gọi chung là "manifest file nhé"
- file ở dạng YAML, đuôi `yml` hoặc `yaml` đều được
- Ở đầu của mọi manifest file ta cần phải có apiVersion, kind và metadata
- `spec` là nơi ta chỉ định hưỡng dẫn Pod chạy các container như thế nào, như các bạn thấy bên trong ta có trường `containers` là 1 array (cú pháp của YAML các bạn phải tự học đó nhé, để biết như thế nào là Object, Array,...) :)
- Ở trên ta chỉ có 1 item trong array -> 1 container trong pod
- Tên của container là nginx, tên này để là gì cũng được
- Image là tên image của container, cái này cần phải chính xác
- Bên dưới ta có định nghĩa thêm `ports` - array of ports mà ta muốn expose - "mở" cho thế giới bên ngoài gọi vào, đến bài về Service ta sẽ cùng xem rõ hơn nhé
- Bên dưới ta có định nghĩa thêm phần resource cần thiết cho pod này nữa, `requests` là ta "xin" bao nhiêu cho pod (tối thiểu), `limits` là tối đa pod được "ăn" bao nhiêu. Lí do ta phải có cái này bởi vì mình đang limit resource cho namespace của các bạn nên buộc ta phải có cái này. Phần này các bạn tạm bỏ qua ta cùng tìm hiểu vào các bài sau nhé.

Oke rồi đó, chúng ta sẽ deploy pod này nhé:
```markdown
kubectl apply -f pod.yml --kubeconfig=kubernetes-config

----
Thấy in ra như sau là thành công:

pod/nginx created
```
Sau đó chúng ta sẽ xem pod ta vừa tạo nhé:
```sql
kubectl get pods --kubeconfig=kubernetes-config

NAME    READY   STATUS              RESTARTS   AGE
nginx   0/1     ContainerCreating   0          3s
```
Ở trên ta thấy 1 số thông tin như sau:
- `name`: tên của pod, mà ta định nghĩa ở `metadata` trong file manifest
- `READY`: số lượng container đã ready - ok trong pod, tại thời điểm bên trên là 0/1
- `Status`: trạng thái của pod đang là gì, ở trên là container đang được khởi tạo
- `Restarts`: pod này đã bị khởi động lại mấy lần
- `Age`: thời gian kể từ khi pod được tạo

Sau đó ta lại tiếp tục `get pod`:
```sql
kubectl get pods --kubeconfig=kubernetes-config

NAME    READY   STATUS    RESTARTS   AGE
nginx   1/1     Running   0          94s
```
Giờ đây các bạn đã thấy rằng pod của chúng ta đã Ready. Yayyyy 🤟🤟. Ta cùng "chui" vào trong pod xem bên trong đó có gì nhé:
```shell
kubectl exec -it --kubeconfig=kubernetes-config nginx -- sh
```
Ở trên `nginx` là tên của pod và `sh` ở cuối là shell mà ta muốn dùng khi vào trong pod. Nhìn chung khá giống với câu lệnh `docker-compose exec app sh` ;)

Vào trong pod rồi thì môi trường y hệt như ngày xưa dùng Docker (Docker compose), ta tuỳ ý làm gì cũng đươc. Ta thử xem nginx chạy ok chưa nhé:
```cpp
curl localhost:80
```
Ta sẽ thấy in ra dòng text Welcome như sau nhé
![Screenshot 2022-10-10 at 5.52.05 PM.png](https://images.viblo.asia/de1e581f-37c9-45c9-a39c-20f0e4f38e90.png)

Yeahhhh, vậy là ta đã deploy thành công 1 pod trên K8S Cluster rồi đó, thành công nhỏ nhỏ đầu tiên 😊

> Để thoát khỏi pod ta bấm CTRL + D nhé

> Ở trên ta chỉ có 1 container trong pod nên K8S đưa ta "exec" thẳng vào  pod duy nhất kia luôn, trong trường hợp ta có nhiều hơn 1 container thì ta phải chỉ định container nào ta muốn exec vào bằng option "-c" nhé

## Vọc vạch vài chút
- Hiện tại pod của chúng ta không thể được truy cập từ bên ngoài cluster
- Bên trong cluster phải dùng Cluster IP (xem ở phần describe pod), chú ý rằng ClusterIP là "động" dynamic, được gán tự động, nên thực tế ta không dùng ClusterIP để gọi giữa các app, mà ta sẽ dùng Service, mình sẽ nói ở bài sau nhé
### Check log của pod
Đây là một trong những command mà mình hay dùng nhất để kiểm tra xem pod của mình đang chạy như thế nào, log này là "application log" tức là log do container của chúng ta in ra (`console.log`, `System.out.println`,....).

Ta cùng kiểm tra log trên pod của chúng ta nhé:
```perl
kubectl logs nginx --kubeconfig=kubernetes-config
```
Ta sẽ thấy in ra như sau:

![Screenshot 2022-10-10 at 6.07.31 PM.png](https://images.viblo.asia/ffa2b450-a8b3-4d3e-8658-7b668e305fc0.png)
### Describe pod
Để xem chi tiết thông tin về pod ta sẽ chạy command để describe - mô tả nó:
```sql
kubectl describe po nginx --kubeconfig=kubernetes-config
```
> Chú ý bên trên thay vì viết "pods" mình viết là "po", ta cũng có thể viết là "pod" đều oke nhé. 3 cách viết đó các bạn ;)

Ta thấy in ra như sau:

![Screenshot 2022-10-10 at 6.11.19 PM.png](https://images.viblo.asia/6a54e73b-46e2-4d09-b7da-057b7c251b90.png)
- Trên đầu ta có tên của pod và tên namespace. Mọi thứ trong namespace của các bạn là isolate - độc lập với namespace khác. Ta có thể tạo ra bao nhiêu namespace tuỳ ý
- Ở trên các bạn thấy pod của chúng ta đạng được chạy trên Node với tên như phần bôi đỏ
- IP trong hình là Cluster IP và là duy nhất trên toàn bộ cluster
- Port chính là `containerPort` mà ta định nghĩa ở file manifest
- Tận cùng file ta có Events, ở ví dụ này ta không có gì, nhưng sẽ khá hữu dụng khi ta làm thực tế, chủ yếu để debug khi có lỗi xảy ra
### Truy cập pod từ localhost
Pod của chúng ta có thể được truy cập từ localhost bằng `portforward`, đây là một command cực kì hữu dụng của K8S, giúp ta có thể đưa app từ K8S Cluster có thể được truy cập từ localhost, như kiểu đang chạy trên máy local của chúng ta vậy.

Các bạn chạy command sau:
```shell
kubectl port-forward po/nginx 3000:80 --kubeconfig=kubernetes-config
```
Ở trên ta nói với K8S rằng forward pod `nginx`, map cổng 3000 ở local vào cổng 80 trên pod. Sau đó ta mở trình duyệt ở địa chỉ `http://localhost:3000/` sẽ thấy như sau:

![Screenshot 2022-10-10 at 6.23.48 PM.png](https://images.viblo.asia/53400df7-95b2-48f7-9828-3edf012815a1.png)

Không khác gì như app đang được chạy ở máy của chúng ta vậy, cực kì thuận tiện trong quá trình dev hoặc debug 😎😎😎

Kiểm tra ở terminal ta thấy như sau:

![Screenshot 2022-10-10 at 6.30.12 PM.png](https://images.viblo.asia/8762d564-664d-44ae-874b-192010171ae4.png)

# Vỡ lòng thêm một chút
Ở bài này ta chạy một container trong pod, đó cũng là mô hình deploy phổ biến mình thấy mọi người thường làm, cũng có khi cần thì ta phải chạy nhiều hơn 1 container trên 1 pod, nhưng nhìn chung là ít. 

Các bạn tượng tượng 1 pod dùng để chạy  1 app của chúng ta. Câu hỏi là vậy 1 pod chạy nhiều app được không??

Thì câu trả lời là được, nhưng không nên, vì các container trong pod sẽ "tightly couple", dính chặt chẽ với nhau, thay vì độc lập, cái này có thể làm ảnh hưởng tới cái kia, đồng thời quá trình scale sẽ khó, vì khi scale là ta scale cả pod, tức là nhân lên mọi container có trong pod.

Trường hợp này giống y như 1 vấn đề mình đã trình bày ở bài [Tối ưu Docker image](https://viblo.asia/p/toi-uu-docker-image-Eb85o9D4Z2G#_tach-ung-dung-ra-thanh-cac-thanh-phan-rieng-biet-10), khi viết Dockerfile:
```markdown:dockerfile
FROM alpine:3.12

<Cài NodeJS, chạy npm install, cài pm2,....>

<Cài MongoDB, khởi động MongoDB>

<Cài + khởi động Redis>

CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
```
Ta có thể nhét tất cả mọi thứ vào trong 1 Dockerfile nhưng như thế rất không nên, nặng nề, khó scale, 1 cái thay đổi làm tất cả những cái khác cũng thay đổi theo. Và giống y như vậy trên K8S, khi 1 container trên pod thay đổi thì cả pod sẽ được deploy lại
# Hỏi đáp
1. Có vài nơi người ta dùng `kubectl create...` thay vì `kubectl apply`, nên dùng cái nào?

Câu trả lời là cả 2 cái đều dùng được oke nhé các bạn. Nhưng chúng có hơi khác 1 chút đó là:
- `kubectl create`: tạo object/resource mới, nếu tồn tại thì báo lỗi
- `kubectl apply`: có thể apply liên tục nhiều thay đổi vào object/resource, nếu chưa tồn tại thì tạo, còn nếu tồn tại rồi thì update

> như mình đã giải thích ở trên thì "gần như" chúng ta sẽ luôn dùng `kubectl apply` ;)

2. Xoá Pod thì làm thế nào?

Các bạn chạy command sau để xoá nhé:
```sql
kubect delete po nginx --kubeconfig=kubernetes-config
```
3. Trong hình minh hoạ thấy 1 node có Docker và Kubelet, vậy có phải bản chất bên dưới K8S cũng dùng Docker để chạy app của chúng ta như ở [series học Docker và CICD](https://viblo.asia/s/jeZ103QgKWz) chúng ta vẫn làm hay không?

![](https://images.viblo.asia/914899bd-a9c6-422a-8499-0bb30bd0efc2.png)

Đúng....... là ngày xưa K8S có dùng Docker để chạy app của chúng ta, nhưng về sau này thì K8S đã chuyển qua dùng [containerd](https://containerd.io/), nếu các bạn để ý command `describe` chúng ta chạy ở trong bài có đoạn như sau:

![](https://images.viblo.asia/610049c3-09a5-4186-ad39-b9ce2c75ddcd.png)

Lí do là vì Docker là cả 1 cục to bao gồm cả network, volume, image builder,... trong khi những thứ đó thì K8S cũng có cả rồi, nên containerd chỉ chuyên để chạy image thôi.

Do vậy từ giờ ta không gọi là "Docker image" nữa kẻo các bạn lại nhầm lẫn nhé, ta chỉ gọi chung là "image"

4. Tôi thấy người ta còn dùng cả cái gì gì tên `kustomize` hay `Helm` gì đó để deploy app trên K8S

Đúng rồi đó các bạn, chúng đều là những tool để quản lý phần cấu hình manifest cho các app của các bạn theo các tiện hơn, tái sử dụng nhiều hơn,....

Thế giới K8S mình thấy nó cực kì vô biên, có ti tỉ tool, thư viện xoay quanh K8S, cực cựccccc kì nhiều, và vô cùng hay ho nữa ;)

# Kết bài
Phùuuuuuuuuuuuuuuuuuuuuuu.... bài dài vãi chưởng, các bạn chịu khó hấp thụ tí nhé 🤣🤣🤣 thường mở đầu 1 topic gì thì nó cũng nhiều câu hỏi như vậy, giống như bên series học Docker của mình vậy đó. Nhưng dần dần về sau khi ta hiểu rồi thì câu hỏi và vấn đề sẽ ít dần đi (hi vọng vậy 😊)

Qua bài này hi vọng các bạn đã hiểu hơn về Pod là gì và cách để deploy "Naked Pod" trên K8S.

Hẹn gặp lại các bạn vào các bài sau. Chúc nhau ngủ ngon cái nàooo 🌙🌙

> như mình đã nhấn mạnh trong bài, khi chạy production thì thường ta sẽ không chạy "Naked pod" mà sẽ chạy nó thông qua resource khác ví dụ Deployment, ta sẽ tìm hiểu vào các bài sau nhé ;)