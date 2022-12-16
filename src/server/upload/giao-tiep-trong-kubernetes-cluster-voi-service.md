Helloooooooooooooooooooooooo những người anh em thiện lành 👋👋

Cuộc sống của anh em có ổn không? có giống anh em hi vọng, đồng nghiệp có dễ thương, sếp có bắt chạy deadline hay không???? 🤗 Mình thì vẫn nhớ Việt Nam quá 🥲

...

Mà thôi, nhớ nhung đành phải để sau, hôm nay ta tiếp tục với [series học Kubernetes](https://viblo.asia/s/hoc-kubernetes-tu-co-ban-den-gan-nang-cao-aAY4qQ6w4Pw) nhé, ở bài trước ta đã tìm hiểu về [Pod trên K8S](https://viblo.asia/p/mo-dau-voi-pod-tren-kubernetes-2oKLn2ryLQO), không biết các bạn đã thấm chưa?

Đoạn đầu lúc mình mới học K8S cũng có rất nhiều chỗ mình thấy mơ hồ và trừu tượng quá, cũng vật vã một thời gian đó, nhưng dần dần thì thực hành nhiều rồi cũng quen.

Ở bài này ta sẽ cùng tìm hiểu về Service trên K8S nhé. Anh em theo mình lên tàu nào.....🚀🛩️🛩️

# Lấy K8S Session
Trước khi bắt đầu các bạn đảm giúp mình là đã lấy được K8S Session để truy cập vào cluster của mình đẻ lát nữa ta thực hành nhé. Xem lại [bài cũ giúp mình nhé](https://viblo.asia/p/mo-dau-voi-pod-tren-kubernetes-2oKLn2ryLQO#_setup-0)
# Mở đầu
Như ở bài trước - [tìm hiểu về Pod](https://viblo.asia/p/mo-dau-voi-pod-tren-kubernetes-2oKLn2ryLQO) mình có trình bày, mỗi khi Pod được tạo ra thì nó sẽ được gán 1 ClusterIP, là duy nhất (global unique) trên toàn bộ Cluster. Ta có thể dùng ClusterIP đó và gọi vào port. 

![](https://images.viblo.asia/bff86dd7-eb17-445e-8af9-0603c15677f1.png)

Vậy nhưng có 1 vài điểm ta cần lưu ý:
- ClusterIP kia là động (dynamic) được gán bởi Kubernetes Control Plan
- Số lượng Pod cho app của chúng ta tại mỗi thời điểm có thể khác nhau: ban đầu có 1 pod, sau traffic cao thì tự autoscale lên 10 pods. Các pod có thể bị khởi tạo và destroy đi một cách tự động.

Vậy câu hỏi đặt ra là: giả sử ta có Frontend (1 pod), cần gọi API vào Backend (10 pods), vậy thì Frontend có cần phải lưu 10 Cluster IP của Backend??? Hay khi Backend autoscale lên 20 pods thì Frontend có cần tự "tìm" rồi thêm vào 10 Cluster IP nữa

# K8S Service
## Mở đầu
Để giải quyết vấn đề trên thì K8S cung cấp cho chúng ta Service, nơi ta có thể định nghĩa logics cách truy cập vào 1 tập hợp 1 hoặc nhiều pod để các app khác có thể gọi vào. Cái "tập hợp các Pod" kia thường được đinh nghĩa bởi `selector` - lát nữa ta sẽ xem selector là gì nhé

Các bạn tưởng tượng Service nó như kiểu "tổ trưởng dân phố" vậy, người nắm giữ thông tin các cư dân trong phố của mình, nếu ai muốn hỏi gì thì có thể hỏi trực tiếp ông ý, thay vì tự đi tìm :)

Trước khi định nghĩa service thì ta cần deploy 1 Pod nào đó trước để test nhé, các bạn tạo cho mình 1 file manifest mới với nội dung như sau, giả sử ta đặt tên là `pod.yml` nhé:

```go:yml
apiVersion: v1
kind: Pod
metadata:
  name: helloworld
spec:
  containers:
  - name: helloworld
    image: tutum/hello-world
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
Nom đã quen dần chưa các bạn ;), bên trên ta có 1 pod tên `helloworld` có 1 container trong đó cũng tên là `helloworld` chạy image như trên, expose port 80, port này lát nữa Service của ta sẽ dùng nhé

> chú ý phần resource bên trên là để định nghĩa cpu/RAM tối thiểu cần và tối đa được sử dụng cho pod của chúng ta nhé, K8S khuyên chúng ta nên luôn có cái đó, và bởi vì các bạn share cluster của mình nên mình có đặt ResourceQuota và nó bắt buộc ta phải có cái đó, các bạn cứ tạm bỏ qua nó sau này ta sẽ tìm hiểu nhé

Tiếp theo ta sẽ `apply` để deploy Pod này nhé:
```shell
kubectl apply -f pod.yml --kubeconfig=kubernetes-config
```
> chú ý nếu các bạn không muốn thêm `--kubeconfig=kubernetes-config` cho mọi command thì các bạn có thể thêm nó vào biến môi trường nhé. Mình đã nói [ở bài trước](https://viblo.asia/p/mo-dau-voi-pod-tren-kubernetes-2oKLn2ryLQO#_dat-config-mac-dinh-vao-bien-moi-truong-3) rồi nhé.

Sau khi apply xong thì ta `get` xem Pod thế nào rồi nhé:
```sql
kubectl get po --kubeconfig=kubernetes-config

------

NAME         READY   STATUS    RESTARTS   AGE
helloworld   1/1     Running   0          25s
```
> ta có thể viết "po", "pod", "pods" đều được nhé, mình thích cách ngắn nhất

Pod này nhẹ nên pull và start khá nhanh, như các bạn thấy ở trên thì Pod của ta đã `Running`, ta thử chui vào Pod và đảm bảo là API trong đó đang chạy ngon rồi nhé:
```shell
kubectl exec -it helloworld --kubeconfig=kubernetes-config -- sh

---- Sau đó ta cài curl
apk update && apk add curl

curl localhost:80
```
Thấy in ra như sau là oke rồi đó các bạn:

![](https://images.viblo.asia/7d058a5a-8d8e-4964-8e88-32f8cac6c878.png)

Giờ ta lại chui ra ngoài (bấm CTRL + D) và thử `describe` pod của chúng ta xem chút thông tin chi tiết hơn về Pod nhé:

```sql
kubectl describe po helloworld --kubeconfig=kubernetes-config
```

Ta thấy in ra như sau:

![Screenshot 2022-10-13 at 11.40.06 AM.png](https://images.viblo.asia/b9a83717-49f4-473d-9da6-0ea3604d357b.png)

Ta thấy rằng Pod của ta có IP (ClusterIP) là `10.244.0.159`

Tiếp theo ta sẽ chạy thêm 1 pod nginx nữa để test API call vào pod Hello World nhé. Ta tạo file `nginx-pod.yml`
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
Sau đó ta apply để tạo pod này:
```shell
kubectl apply -f nginx-pod.yml --kubeconfig=kubernetes-config
```
Tiếp theo ta chui vào Pod nginx mới tạo này và thử gọi sang bên Hello World xem nhé:
```shell
kubectl exec -it --kubeconfig=kubernetes-config nginx -- sh
```
Sau đó nếu ta thử `curl` vào bên pod Helloworld dùng tên pod thì sẽ gặp lỗi:
```markdown
curl helloworld:80

---
curl: (6) Could not resolve host: helloworld
```
Bởi vì từ bên nginx thì nó không biết được cái host nào tên là `helloworld` cả, mà thay vào đó ta phải dùng ClusterIP của pod `helloworld`
```css
curl 10.244.0.239:80
```
Và ta sẽ thấy kết quả như sau:

![Screenshot 2022-10-13 at 12.12.44 PM.png](https://images.viblo.asia/fdf33b20-008a-4929-af77-cf4a71df23ff.png)

> chú ý rằng các bạn phải lấy cluster IP của Pod Helloworld từ command `describe` nhé, đừng lấy y hệt như của mình vì của các bạn nó sẽ khác đó ;)

Như các bạn thấy, từ bên Nginx ta đã gọi thành công sang HelloWorld dùng ClusterIP. Thế nhưng nếu bây giờ mà ta `delete` pod HelloWorld đi và chạy lại, thì nó lại có 1 clusterIP mới. Vậy chẳng lẽ nếu từ bên Nginx muốn gọi được Hello World thì ta cứ phải `describe` HelloWorld trước để lấy ClusterIP của nó hay sao????

Oke vậy giờ phải dùng Service đúng không, nãy giờ cứ nhá hàng mãi 😒 ....

Đúng rồi đó các bạn, để giải quyết vấn đề này ta sẽ cùng định nghĩa Service cho app Hello world của chúng ta nhé

## Ví dụ
Nhưng trước khi tạo Service các bạn update lại file `pod.yml` của helloworld để thêm cho nó `labels` như sau nhé:
```swift:yml
apiVersion: v1
kind: Pod
metadata:
  name: helloworld
  labels:
    app.kubernetes.io/name: helloworld #  ----->>> Ở đây
spec:
  containers:
  - name: helloworld
    image: tutum/hello-world
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
Sau đó ta `delete` pod HelloWorld hiện tại đi:
```shell
kubectl delete po helloworld --kubeconfig=kubernetes-config
```
Và `apply` để tạo lại pod mới:
```shell
kubectl apply -f pod.yml --kubeconfig=kubernetes-config
```
Vậy là giờ pod của chúng ta đã có `labels`, các bạn có thể `describe` nó sẽ thấy nhé.

Tiếp theo ta bắt đầu tạo file service, các bạn đặt tên là `helloworld-svc.yml` nhé:
```python:yml
apiVersion: v1
kind: Service
metadata:
  name: helloworld
spec:
  type: ClusterIP
  ports:
    - name: http
      protocol: TCP
      port: 3000
      targetPort: 80
  selector:
    app.kubernetes.io/name: helloworld
```
Ở trên các bạn thấy ta có file manifest cấu hình Service cho HelloWorld, có 1 số điểm cần lưu ý:
- `type=ClusterIP`: mở cho service này chỉ được truy cập trong cluster (type có 1 vài giá trị khác ta sẽ nói ở phần dưới nhé)
- protocol=TCP: chỉ cho phép traffic là TCP (các dạng request http thông thường mà ta vẫn hay gọi),  hoặc cũng có thể có UDP hay ICMP
- port=3000: định nghĩa cho Service này 1 cái port, thì lát nữa ở nơi khác gọi vào service thì sẽ là `Service_name:3000`
- targetPort=80: đây là cái `containerPort` của Helloworld mà service này sẽ `target` vào
- selector: áp dụng service này cho 1 tập hợp pod được chỉ định có các `labels` như ta định nghĩa

Nom âu kây phết rồi đó, ta `apply` service này nhé:
```shell
kubectl apply -f helloworld-svc.yml --kubeconfig=kubernetes-config
```
Ta cùng nhau `get` tất cả các service trong namespace hiện tại nhé:
```sql
kubectl get services --kubeconfig=kubernetes-config

----
Thấy in ra như sau là được:
NAME         TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
helloworld   ClusterIP   10.245.243.233   <none>        3000/TCP   22s
```
Như ở output các bạn thấy service của chúng ta có 1 cluster IP, tức là ngoài được gọi bằng tên service thì ta cũng có thể dùng clusterIP, nhưng hầu như ta đều dùng name vì dễ dùng hơn nhiều.

Service của ta không có Extenal-IP -> không được truy cập từ bên ngoài Cluster. Và cuối cùng là port=3000 của Service.

Giờ ta "chui" lại Pod Nginx và thực hiện gọi API lại vào bên HelloWorld bằng tên service nhé:
```shell
kubectl exec -it --kubeconfig=kubernetes-config nginx -- sh
```
Tiếp theo ta gọi vào Pod HelloWorld thông qua Service của nó:
```perl
curl helloworld:3000
```
Ta sẽ thấy như sau:

![Screenshot 2022-10-14 at 10.53.25 AM.png](https://images.viblo.asia/602b5a96-d6fc-404e-bd48-e77286d73aad.png)

Yayyyyyyyyy vậy là ta đã thành công tạo 1 Service cho Pod HelloWorld rồi............ (thành công lớn lao ghê 🙃 )

Từ giờ ở bất kì đâu trong Cluster ta gọi theo đúng format như trên `<tên_service>:<port_của_svc>` là được, dễ nhìn hơn rất nhiều, Pod của ta tha hồ restart, scale thoải mái, ta cứ dùng tên service thì vẫn gọi được bình thường. Và đây cũng là cách ta thường làm thật ở production - luôn có service "đứng trước" pod của chúng ta, giao tiếp với những nơi khác đều qua Service.

# Vọc vạch
Bên trên mới chỉ là cấu hình cơ bản (nhưng phổ biến) của 1 Service, ngoài ra service còn cho ta rất nhiều thứ khác, ta cùng xem nhé ;)
### Tạo nhiều port cho Service
Ở trên thì Service của chúng ta chỉ có 1 port là 3000, ta có thể thoải mái thêm vào nhiều port cho service cũng được nhé:
```markdown:yml
apiVersion: v1
kind: Service
metadata:
  name: helloworld
spec:
  type: ClusterIP
  ports:
    - name: http
      protocol: TCP
      port: 3000
      targetPort: 80
      #==========
    - name: http2
      protocol: TCP
      port: 3001
      targetPort: 80

  selector:
    app.kubernetes.io/name: helloworld
```
Ở trên các bạn thấy mình thêm vào 1 port nữa với tên là `http2`, port=3001 và vẫn target vào port 80 của Pod. Giờ ta chỉ cần `apply` lại service này 1 lần nữa, sau đó "chui" lại vào Pod nginx thì ta có thể gọi được sang helloworld bằng cổng 3001:
```perl
curl helloworld:3001
```
> Tương tự thì các bạn cũng có thể tạo nhiều port cho Service để target được vào nhiều port của container trong Pod Hello World nhé (`targetPod`)
## Cách hay hơn cho targetPort
Như các bạn thấy thì hiện tại, người viết cấu hình manifest cho Service cần biết được là "à container HelloWorld có `containerPort=80`", và từ đó cho Service target vào port 80.

Và cứ mỗi khi `containerPort` thay đổi thì `targetPort` bên Service cũng phải thay đổi theo.

Để cải thiện điều này thì ta sẽ định nghĩa cho cái `containerPort` bên Pod Helloworld, sau đó bên Service chỉ đơn giản là dùng cái tên đó là được.

Ta update lại file `pod.yml` như sau nhé:
```swift:yml
apiVersion: v1
kind: Pod
metadata:
  name: helloworld
  labels:
    app.kubernetes.io/name: helloworld
spec:
  containers:
  - name: helloworld
    image: tutum/hello-world
    ports:
    - containerPort: 80
      name: myport # -----> ở đây
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
```
Như các bạn thấy ở trên, thì ngoài `containerPort` ta cũng cho nó 1 cái tên "name=myport"

Sau đó ta xoá Pod cũ đi và deploy Pod mới nhé:
```perl
kubectl delete po helloworld --kubeconfig=kubernetes-config
kubectl apply -f pod.yml --kubeconfig=kubernetes-config
```
> lý do ta phải xoá pod cũ đi là bởi vì K8S không chỉ cho phép ta update 1 số thuộc tính như "image" thôi

Oke tiếp theo ta update lại file service nhé:
```swift:yml
apiVersion: v1
kind: Service
metadata:
  name: helloworld
spec:
  type: ClusterIP
  ports:
    - name: http
      protocol: TCP
      port: 3000
      targetPort: myport # ---->  ở đây
  selector:
    app.kubernetes.io/name: helloworld
```
và `apply` lại service:
```shell
kubectl apply -f helloworld-svc.yml --kubeconfig=kubernetes-config
```
Và giờ các bạn lại chui vào `nginx` và thử `curl` ta thấy kết quả tương tự ;) (phần này các bạn tự làm nhé)
## Các Type khác của Service
Như trong file manifest file của Service ta có trường "type" trong "spec":
```python:yml
apiVersion: v1
kind: Service
metadata:
  name: helloworld
spec:
  type: ClusterIP
```
Type này để định nghĩa kiểu của Service này sẽ là gì, các type khác nhau sẽ cho ta kết quả khác nhau. Mặc định không nói gì thì `type=ClusterIP`. 

Ta cùng xem các type khác của service có gì nữa nhé 🚀🚀
### NodePort
Khi ta để `type=NodePort` thì service của chúng ta sẽ được "expose" mở ra cho truy cập trên mỗi node của Cluster cùng với 1 cổng cố định (giá trị được K8S tự gán ta chỉ việc sử dụng).

các bạn mở lại file manifest của Service và đổi type thành NodePort nhé:
```swift:yml
apiVersion: v1
kind: Service
metadata:
  name: helloworld
spec:
  type: NodePort # ---- > ở đây
  ports:
    - name: http
      protocol: TCP
      port: 3000
      targetPort: myport
  selector:
    app.kubernetes.io/name: helloworld
```
Sau đó ta `apply` lại service:
```shell
kubectl apply -f helloworld-svc.yml --kubeconfig=kubernetes-config
```
Sau đó ta thử `get` lại service đang có:
```sql
kubectl get svc --kubeconfig=kubernetes-config
```
> các bạn có thể viết là "services", "service", hay "svc" đều được nhé, mình luôn dùng ngắn :)

Sau đó ta thấy in ra như sau:
```sql
NAME         TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
helloworld   NodePort   10.245.30.54   <none>        3000:32203/TCP   72m
```
Chú ý rằng ở cột PORTS thì có 1 chút thay đổi, như ta thấy nó là `3000:32203/TCP`, tức là ở đây K8S đã expose service của chúng ta trên tất cả các node tại địa chỉ `<NODE_IP>:32203`, và có thể truy cập được từ bên ngoài cluster (Internet).

Giờ ta test thử truy cập từ bên ngoài cluster xem nhé ;)

......

Mà ủa, thế rồi truy cập như nào, cái ip của node kia lấy đâu ra??????🙄🤔

Thì để lấy ip của các nodes trên cluster các bạn chạy command sau:
```shell
kubectl get nodes -o wide --kubeconfig=kubernetes-config
```
Xong tự nhiên ta thấy báo:
```python
Error from server (Forbidden): nodes is forbidden: User "learnk8s-335556" cannot list resource "nodes" in API group "" at the cluster scope
```
Ý bảo là user của các bạn không có quyền được xem thông tin về nodes trên cluster, cái này mình đã limit user của các bạn chỉ thao tác được trên namespace lúc mà tạo file `kubernetes-config` và gửi vào hòm mail của các bạn rồi.

Tính đùa các bạn tí vậy 🤣🤣🤣🤣 sau này các bạn có cluster riêng làm bố đời thì thích xem gì thì xem nhé :D

Đây mình đã `get nodes` cho các bạn bằng user admin của mình và ta được như sau:

![Screenshot 2022-10-14 at 12.10.04 PM.png](https://images.viblo.asia/643c58a6-b56d-468a-b309-a18f28221f31.png)

Như các bạn thấy ở trên ta có EXTERNAL-IP cho từng node, nó là static và không đổi. Giờ các bạn mở trình duyệt, chọn IP của 1 node bất kì và truy cập vào địa chỉ `NODE_IP:32203` (port 32203 là dynamic và được gen ngẫu nhiên khi thực hành nhớ thay lại cho đúng trong trường hợp của các bạn nhé) và ta sẽ thấy kết quả như sau:

![Screenshot 2022-10-14 at 12.16.06 PM.png](https://images.viblo.asia/5628330d-c5ce-4372-9e91-c835f043db77.png)

Yeahhhh, vậy là ta đã "expose" - mở cho app của chúng ta truy cập từ bên ngoài cluster được rồi đó, gửi link cho đứa bạn và khoe thôi nào💪💪💪💪💪
### LoadBalancer
Khi ta để type là Load Balancer thì K8S sẽ expose Service của chúng ta dùng Load Balancer cung cấp bởi cloud provider - nơi mà ta đang dùng cloud để chạy K8S Cluster (AWS, Google, Azure, Digital ocean,....), và ta cũng được 1 public IP , IP đó là IP của load balancer.

Và chú ý là khi ta set type=LoadBalancer thì K8S cũng sẽ cấp cho Service của chúng ta ClusterIP và expose ra NodePort.

Để demo rõ nhất phần này ta sẽ cùng đổi lại type của Service về ClusterIP trước đã nhé:
```swift:yml
apiVersion: v1
kind: Service
metadata:
  name: helloworld
spec:
  type: ClusterIP # ---- > ở đây
  ports:
    - name: http
      protocol: TCP
      port: 3000
      targetPort: myport
  selector:
    app.kubernetes.io/name: helloworld
```
Sau đó ta `apply`:
```shell
kubectl apply -f helloworld-svc.yml --kubeconfig=kubernetes-config
```
Rồi `get` để kiểm tra lại thay đổi ta vừa cập nhât:
```sql
kubectl get svc --kubeconfig=kubernetes-config

----
Ta sẽ thấy như sau:

NAME         TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
helloworld   ClusterIP   10.245.243.233   <none>        3000/TCP   22s
```
Đảm bảo là type=ClusterIP và không còn NodePort nhé các bạn.

Âu cây tiếp theo ta sẽ đổi tiếp type của Service thành LoadBalancer:
```swift:yml
apiVersion: v1
kind: Service
metadata:
  name: helloworld
spec:
  type: LoadBalancer # ---- > ở đây
  ports:
    - name: http
      protocol: TCP
      port: 3000
      targetPort: myport
  selector:
    app.kubernetes.io/name: helloworld
```
Và ta lại tiếp tục `apply`:
```shell
kubectl apply -f helloworld-svc.yml --kubeconfig=kubernetes-config
```
Sau đó ta thử `get` lại các service trong namespace:
```sql
kubectl get svc --kubeconfig=kubernetes-config
```
Ta sẽ thấy in ra như sau:
```sql
NAME         TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
helloworld   LoadBalancer   10.245.30.54   <pending>     3000:30623/TCP   102m
```
Như các bạn thấy, Service của ta đã có ClusterIP mới, EXTERNAL-IP thì là `PENDING` tức là Load balancer đang được tạo, nếu sau này các bạn có cluster riêng thì có thể lên trang quản trị cluster sẽ thấy thông báo đang tạo Load balancer (LB). Và ta thấy Service cũng được gán cho 1 cái `NodePort=30623`

Ta chờ tầm vài phút để bên Cloud tạo xong LB, sau đó thử `get` lại lần nữa sẽ thấy có EXTERNAL-IP (IP của LB):
```sql
kubectl get svc --kubeconfig=kubernetes-config

------

NAME         TYPE           CLUSTER-IP     EXTERNAL-IP      PORT(S)          AGE
helloworld   LoadBalancer   10.245.30.54   139.59.219.145   3000:30623/TCP   110m
```
Và giờ ta có thể truy cập app của chúng ta trực tiếp thông qua LB rồi, các bạn mở trình duyệt và truy cập ở địa chỉ `<IP_của_LB>:3000` ta sẽ thấy app chạy bình thường:

![Screenshot 2022-10-14 at 12.16.06 PM.png](https://images.viblo.asia/adb8b65a-1980-45ec-9ca8-1193ea054f67.png)

LB sẽ tự động điều phối traffic vào từng node của chúng ta, đảm bảo cân bằng tải giữa các node

**Kết luận**: qua đây các bạn thấy rằng, việc dùng LB khá là "friendly" hơn, ta chỉ việc dùng 1 IP và port thì cũng cố định là port của Service, là có thể gọi được vào app rồi. Nếu dùng nodeport thì mỗi lần gọi ta lại phải chỉ định chính xác Node IP, mà cái đó khi cluster scale lên nhiều node thì ta lại phải lưu thêm nhiều Node IP hay sao? Do vậy theo mình thấy thì cách phổ biến hơn là dùng LoadBalancer thay vì NodePort

> Nhưng dùng LB cũng sẽ bị tính 1 chút phí đó các bạn, nhưng không đáng kể đâu ;)

> cũng đôi khi có 1 số trường hợp cho đơn giản thì mình vẫn dùng NodePort nhưng rất ít
### ExternalName
Nếu ta set `type=ExternalName` thì theo mình xin được lấy luôn câu từ trên trang chủ K8S: 
>Maps the Service to the contents of the externalName field (e.g. foo.bar.example.com), by returning a CNAME record with its value. No proxying of any kind is set up.

Thực tế là mình chưa bao giờ dùng type này và cũng thấy rất ít người, ít nơi dùng nó
## Endpoint
Như ở trên các bạn thấy trong file manifest của Service ta phải có `selector` thì service nó mới biết là nó cần "quan tâm" tới Pod nào.

Nếu ta không có selector thì ta sẽ cần dùng tới Endpoint, khi đó ta có thể dùng Service cho 1 backend nào đó nằm ngoài cluster cũng được. Phần này mình cũng rất rất ít khi đụng tới ,vì hầu như thực tế thì ta đều "select" vào Pod trong cluster cả, nếu backend/app ở ngoài thì chúng nó cũng có IP/domain rồi không cần đụng tới Endpoint làm chi cho cách rách
# Câu hỏi liên quan
## Type LoadBalancer nom ổn phết, thôi mọi service cứ phang luôn cái đó?
Đúng là như các bạn thấy, để ServiceType=LoadBalancer thì app của chúng ta được access được từ cả trong lẫn ngoài cluster, ta không cần quan tâm tới số lượng pod vì LB sẽ tự điều phối traffic vào đó.

Nhưng thực tế mình thấy nếu không cần thiết phải dùng tới type là LB thì ta không cần thiết phải dùng nó, tốn thêm phí nữa vì LB là của cloud provider, và với cả làm như thế thì service của chúng ta sẽ được "expose" ra internet ai cũng vào được.

*Lời khuyên của mình (cá nhân mình thấy thôi nhé)*: luôn giữ app bảo mật, chỉ cần expose cái nào thật sự cần thiết. Ví dụ ta có 1 frontend, 10 backend, user chỉ sử dụng thông qua UI của frontend, thì không có lý do gì ta lại đi expose ra 10 backend kia cho Internet (thông qua NodePort hay LB), ta chỉ cần expose ra frontend, còn 10 backend kia ta để ClusterIP hết, như thế sẽ bảo mật hơn, cùng với đó thì theo lý thuyết request gọi từ frontend đến backend cũng nhanh hơn, vì nó gọi trực tiếp bên trong cluster, nếu gọi qua LB thì nó phải đi qua 1 lớp LB của cloud provider.
## Setup HTTPS như thế nào nhỉ??
Cái này ta sẽ xem ở bài về Ingress nhé
##  Gọi sang service ở namespace khác như thế nào nhỉ?
Nếu các bạn để ý, hiện tại ta đang làm việc trên 1 namespace, pod, service mình tạo ra trong bài này đểu nằm trên cùng 1 namespace, khi ta "chui" vào trong nginx và gọi vào service của Helloworld thì đơn giản là ta nhập luôn tên service:
```perl
curl helloworld:3000
```
Ở trên K8S sẽ tìm tới service trong namespace hiện tại.

Trong trường hợp ta muốn gọi tới 1 service ở namespace khác, ví dụ cũng tên là `helloworld` thì ta làm như sau:
```python
curl helloworld.namespace-abc.svc.cluster.local
```
`namespace-abc` là tên namespace ta muốn gọi tới
## Tạo service ở trong 1 namespace thế nào nhỉ?
Mọi resource khi ta tạo, ở file manifest, nếu ta không nói namespace nào thì K8S sẽ tạo ở namespace ở "context" hiện tại, context của các bạn mình đã tạo sẵn cho các bạn rồi, các bạn có namespace của riêng các bạn, không cần nói gì tự K8S sẽ tạo resource trên namespace đó.

Còn sau này khi các bạn có cluster riêng thì các bạn thoải mái tạo resource trên các namespace khác tuỳ ý:
```markdown:yml
apiVersion: v1
kind: Service
metadata:
  name: helloworld
  namespace: abc # -----> ở đây
```
# Tí quên
Nếu Pod của các bạn cần Service, và **được tạo sau khi tạo Service** thì mặc định khi container của Pod khởi động lên thì K8S sẽ inject (bơm tiêm - hay cụ thể là khởi tạo) 1 số biến môi trường ta có thể sử dụng:
```python
HELLOWORLD_SERVICE_HOST=10.0.0.11
HELLOWORLD_SERVICE_PORT=3000
HELLOWORLD_PORT=tcp://10.0.0.11:3000
HELLOWORLD_PORT_3000_TCP=tcp://10.0.0.11:3000
HELLOWORLD_PORT_3000_TCP_PROTO=tcp
HELLOWORLD_PORT_3000_TCP_PORT=3000
HELLOWORLD_PORT_3000_TCP_ADDR=10.0.0.11
```
> 10.0.0.11 bên trên là ClusterIP của Service

Phần này các bạn tự kiểm tra nhé (`exec` vào container và thử `echo` là thấy ;)

# Kết bài
Phùuuuu.... bài nào cũng dài thế nhỉ??? 😂😂 mình cố viết ngắn gọn rồi mà nó cứ dây ra. Hi vọng là các bạn có thể thấm được phần nào.

Qua bài này mong là các bạn đã hiểu về Service trên K8S, cách sử dụng và khi nào nên dùng Type nào. Dùng Service là các ta thường dùng ở production chứ mình chưa thấy ai dùng ClusterIP để truy cập trực tiếp vào Pod bao giờ (có chăng nó là khi debug) :).

Hẹn gặp lại các bạn vào những bài sau. Chúc chúng ta cuối tuần vui vẻ.

Mạnh mẽ, quyết thắng 🇻🇳🇻🇳🇻🇳🇻🇳🇻🇳