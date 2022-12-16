![alt text](https://kumorilabs.com/img/blog/kubernetes-logo.png)

Đại khái thì đây sẽ là một article nho nhỏ, giúp mọi người có một cái nhìn ban đầu về khái niệm của Kurbernetes, các thành phần cơ bản cũng như ứng dụng của nó.

# Khởi tạo các app con

Để có 1 cái app demo xài được để dùng cho bài viết phía dưới, mình chỉ cần 2 cái app demo nhỏ nhỏ thôi:
- Client: tạo 1 app Angular với câu lệnh `ng new client` ([bạn nào chưa biết có thể đọc ở đây](https://angular.io/guide/quickstart), hoặc sử dụng app có sẵn của bạn, bằng bất kì framework nào cũng được :P)
- Server: 1 server đơn giản với [Express.js](https://expressjs.com/en/starter/installing.html) là đủ. (Hoặc bất kì ngôn ngữ hay framework nào mà bạn thích - Rails, Phoenix, .Net ...)
# Tạo container image cho mỗi app
Kubenetes là `Container Orchestrator`, do đó, hiển nhiên là ta cần container để cho Kubernetes điều phối chúng. Cơ mà container là gì ? 

Theo như định nghĩa từ Documentation của docker.

> Một container image là một package nhỏ, độc lập (stand-alone), có thể chạy được (executable), chứa 1 nhóm phần mềm và tất cả mọi thứ mà chúng cần để chạy được: code, runtime, tool hệ thống, thư viện hệ thống, setting ... Các app chạy bằng container sẽ luôn luôn hoạt động như nhau, bất kể môi trường nào.

Nó có nghĩa là container có thể chạy trên mọi máy tính - kể cả production server - mà không có sự khác biệt nào cả.

Để dễ hình dung, cùng so sánh 1 App angular chạy trên VM so với chạy qua container.

## Tạo container image cho Angular app

Làm việc với docker thì thường chỉ cần xoay quanh 1 file gọi là `.dockerfile`. Ta có thể hình dung file này như 1 file hướng dẫn cho docker cách xây dựng lên image cho app của mình vầy: từ các thành phần nền tảng, quá trình build, các bước xây dựng ...

Dockerfile sẽ bắt đầu với một `container image` nền tảng, thực hiện theo các bước được ghi để xây dựng nên 1 `container image` mới phục vụ cho nhu cầu của ta. Các bước thực hiện này thường cũng sẽ tương tự với các bước ta cần làm để làm cho app chạy được ngoài môi trường `non-docker`. Ví dụ, với app Angular của ta, ta có thể làm theo các bước sau để đưa 1 app lên production:

1. Build các file static với lệnh `yarn build` 
2. Chạy [nginx server](https://www.nginx.com/) 
3. Copy các content được build ở bước 1 vào thư mục public của nginx (hình như là `nginx/html` thì phải :-?)

Cũng với các bước tương tự như vậy, ta sẽ tạo 1 Container giống hệt với cách ta khởi tạo Angular trên local.

### Dockerfile cho Angular

Như đã nói ở trên, Dockerfile của ta sẽ bao gồm 2 phần:
1. Bắt đầu với 1 image gốc, ở đây ta sử dụng [Nginx image](https://hub.docker.com/_/nginx/)
2. Copy nội dung build ra của angular sang nginx

Convert 2 bước trên về Dockerfile sẽ trông kiểu kiểu như thế này:

```shell
FROM nginx
COPY dist/angular /usr/share/nginx/html
```

^ Cũng dễ đọc nhỉ ^^

> Nếu bạn thắc mắc tại sao lại copy vào `/usr/share/nginx/html`, thì hãy đọc trong [document của nginx image](https://hub.docker.com/_/nginx/) trên Docker Hub; mỗi một image được public trên đây đều có document hướng dẫn đi kèm.

Giờ, tạo `docker image` từ Dockerfile trên, ta chỉ cần chạy `docker build -t client .`

> `-t client` => image được build ra sẽ có tên là `client`.

Giờ, gõ lệnh `docker images`, ta sẽ thấy images vừa được tạo trong danh sách các image local.

```markdown
REPOSITORY                                      TAG                 IMAGE ID            CREATED             SIZE
client                                          latest              d78a722ef552        4 minutes ago       116MB
```

Tạo 1 container cho image với lệnh `docker run -p 80:80 client`, ta có thể check để thấy image được tạo thành công bằng cách vào `localhost:80` trên browser.

![](https://images.viblo.asia/6549e0c3-3ae6-4347-8217-10c2e2bd4029.png)

### Dockerfile cho Express server

Tương tự như với Angular app, giờ hãy xem lại xem với server thì ta cần những bước gì ?

1. Cần một cái nodeJS để chạy, ở đây ta có thể xài nodeJS v10.
2. install package cần thiết bằng `npm install`
3. chạy server với `npm start`

:| Cũng chỉ dài hơn Angular 1 chút nhỉ :|

Giờ thì convert 3 cái bước trên kia về Dockerfile 

```markdown
FROM node:10

# Khác với Angular app, ở đây ta ko có nginx, vì vầy ta nên quy định 1 directory là nơi sẽ chứa code trong docker này
WORKDIR /usr/src/app

# Install app dependencies, dấu * ở đây là để copy cả package.json và package-lock.json
COPY package*.json ./

RUN npm install
COPY . .

# Lại khác với ở trên nữa, mặc định thì nginx sẽ public cổng 80 ra ngoài, còn ở đây ta phải set bằng tay - đó là bắn cổng 8080 của nodeJS ra ngoài.
EXPOSE 8080
# chạy server với lệnh npm start
CMD [ "npm", "start" ]

```

Các bước còn lại cũng hoàn toàn tương tự - `docker build -t server .`

Ta sẽ có images vừa được tạo trong danh sách các image local. (Chả hiểu sao cái image này tận 700MB @@)

```markdown
REPOSITORY                                      TAG                 IMAGE ID            CREATED             SIZE
server                                          latest              816255748522        8 minutes ago       677MB
```

Tạo 1 container cho image với lệnh `docker run -p 8080:8080 server`

![](https://images.viblo.asia/2eb2fea4-4c06-406d-be10-ea458fc058f8.png)

**Xong bước 1 !** Vậy là ta đã có 2 cái image dành cho server và client. :)

![](https://images.viblo.asia/64fada1c-a3fa-4803-a620-91cdcd4b65b9.png)

# Kurbernetes
Giờ mới tới nội dung chính của bài viết :)

Ở phần trên, ta đã *lướt qua* về Dockerfile, về cách build 1 image, và cuối cùng là làm cho 1 app chạy được từ 1 container từ image. Vầy thì **Kurbernetes** - *toàn bộ phần còn lại của bài viết* - là để làm gì ?

> Tưởng tượng, 1 ngày nào đó cái app của ta được xây dựng xong, đi vào hoạt động, trở nên lớn mạnh và có tới hàng triệu người dùng :heart: 
> 
> Vậy thì khi đó, làm sao để ta xử lý được 1 cái hệ thống với hàng triệu request trong 1 phút như thế :thinking: Làm sao để xây dựng 1 cái app có thể dễ dàng scale được :thinking:

Những bài toán ở trên chính là lý do mà Google phát triển và tạo ra Kurrbernetes.

## Vậy kurbernetes là gì ?

Tiếp theo cái "giả sử" ở trên, cùng nhìn sâu hơn vào vấn đề với 1 vài câu hỏi dưới:

Q: Làm cách nào để scale container ?

A: Tạo 1 cái nữa :)

Q: Làm sao để chia sẻ công việc giữa chúng ? Nếu như 1 server đã gần quá tải và ta cần thêm server khác, thêm container ? Làm sao để tính toán khả năng đáp ứng của hạ tầng mà ta hiện có? 

A: Eh ...... (Chờ tí tao google).

Q: Làm cách nào để cập nhật code lên version mới mà ko làm hỏng hệ thống đang chạy ? Và nhỡ mà nó vẫn hỏng, làm sao rollback về trạng thái trước đó ?

A: ....

:thinking:

Kubernetes sinh ra để giải quyết tất cả các bài toán trên ! (và 1 vài bài khác nữa :smile_cat:). Vì vậy, để tóm tắt về định nghĩa Kubernetes là gì, thì tôi sẽ tóm nó lại trong một câu:

> Kubernetes là một công cụ để điều phối container, và nó ẩn đi toàn bộ hạ tầng sử dụng phía dưới.

Bạn hiểu rồi chứ ?

## Kubernetes che dấu đi hạ tầng bên dưới

Kubernetes giúp chúng ta không cần phải quan tâm tới hạ tầng (infrastructure) thực sự bên dưới là gì, bằng cách cung cấp 1 bộ API đóng vai trò trung gian cho ta giao tiếp. Ví dụ, một API sẽ có thể gọi đến như kiểu "Kubernetes hãy tạo 4 container cho image X" chẳng hạn. Khi đó, kubernetes sẽ tìm tới các node bên dưới nó và tạo các container mới cho ta (mà ta cũng chả cần quan tâm mấy cái node hay container nó ở đâu)

![](https://images.viblo.asia/0aa0c91d-54b3-4fce-9bd5-337bab93c81b.png)

Cái này đối với phía dev thì có tác dụng gì ? :thinking: 

Có nghĩa là, với cái mô hình này, thì developer không cần quan tâm  tới node ở đâu, container nó nằm ở đâu, chúng nó giao tiếp với nhau như thế nào. Dev cũng chả cần quan tâm tới việc tối ưu phần cứng hay quan tâm tới mấy cái vấn đề ngoài-code khác :blush:

Nhìn vào cái hình trên thì ta có thể thấy được 1 vài cái mới mẻ:

- **Api server**: là cách duy nhất để ta giao tiếp với Cluster. Đây cũng là chỗ để start hay stop các container (*pod*), kiểm tra trạng thái, check log ...
- **Kubelet**: Monitor các container (*pod*) nằm trong 1 node, giao tiếp với master node.
- **Pod**: Tạm thời thì cứ coi *pod* tương đương với container đi.

## Chuẩn hóa đối với các nhà cung cấp dịch vụ đám mây

Cái này thì hơi ngoài tầm quan tâm đối với ae dev 1 chút, nhưng 1 trong những công dụng của kubernetes là đây. Ví dụ như hệ thống của bạn đang chạy trên Azure, Amazon, hay Google Cloud ... đi. Một ngày đẹp trời nào đó, ông xếp của bạn bắt bạn chuyển nó sang 1 thằng provider nào khác mà bạn chưa từng làm quen, và hoàn toàn có khả năng là bạn sẽ phải học 1 đống thứ mới để chuyển toàn bộ cái hệ thống đang có để có thể tương thích với nhà cung cấp mới. 

Kubernetes giúp bạn xử lý vấn đề này. Lý do là bộ API ở trên (API của Kubernetes) hoạt động giống hệt nhau, không cần quan tâm thằng cung cấp dịch vụ cho bạn là ai. Bạn chỉ việc gọi tới Kubernetes và bảo cho nó biết **bạn muốn gì**, còn việc làm việc đó như thế nào là chuyện giữa Kubernetes và nhà cung cấp dịch vụ của bạn.

:blush:

Nói thế là đủ, vầy thì giờ hãy nghịch thử chút với Kubernetes.

## Kubernetes #1 - Cài đặt

Ta giữ các thành phần hệ thống của ta chạy trong các container. Ta thấy rõ ràng từ đầu rằng cách này chả có tí scalable nào cả. Từ giờ cho tới cuối bài viết, ta sẽ tiếp tục migrate service phía trên của ta để nó *có-thể-chạy-được* với kubernetes.

Với bài viết này, tôi chỉ có 1 cái máy tinh để chạy local, vì vậy bài viết sẽ sử dụng [Minikube](https://kubernetes.io/docs/setup/minikube/), dù rằng là các bước cũng tương tự nếu ta muốn chơi với mấy cái provider thật như kiểu Azure hay Google Cloud Platform.

### Cài đặt Minikube

Cứ theo documentation của [Minikube](https://kubernetes.io/docs/setup/minikube/) thôi. Trong quá trình cài minikube, ta cũng sẽ cài luôn **Kubectl**. Đây là cái client tool để tạo request tới API của Kubernetes.

Để chạy Minikube, chạy lệnh `minikube start`, sau khi nó download hết asset và cài đặt xong xuôi :tea: ta sẽ thấy được cái output dưới đây

```sql
> kubectl get nodes
NAME       STATUS   ROLES    AGE   VERSION
minikube   Ready    master   3h    v1.10.0
```

Minikube cung cấp cho ta 1 cái Cluster Kubernetes chỉ có 1 node, nhưng nhớ rằng ta ko cần quan tâm tới việc có bao nhiêu node - *Kubernetes ẩn nó đi rồi*. Giờ thì xem thử coi **Pod** là cái gì.

### Pod

Trong Kubernetes, pod được coi là đơn vị nhỏ nhất có thể được deploy. Nó có thể bao gồm một hoặc 1 nhóm các container cùng chia sẻ môi trường thực thi với nhau.

Vậy khi nào thì 2 (hay nhiều) container cần chạy chung trong 1 pod ? Thường thì đó là khi chúng cần share volume, hoặc khi chúng cần giao tiếp với nhau thông qua 1 tiến trình nào đó ...

Tóm lại, Pod:
- Có một địa chỉ IP trong Kubernetes cluster.
- Có thể chứa nhiều container. Các container này chia sẻ chung IP với nhau, phân biệt bởi port; các container cùng pod thì gọi nhau thông qua localhost cũng đc, và gọi tới các container ở pod khác thì phải kèm theo IP.

![](https://images.viblo.asia/f16b35f2-f357-4852-9de8-bb98eb370b04.png)

Dưới đây, ta có manifest file cho pod đầu tiên cảu ta - client.

```css
apiVersion: v1
kind: Pod                                            # 1
metadata:
  name: client                                       # 2
spec:                                                # 3
  containers:
    - image: client                                  # 4
      name: client                                   # 5
      ports:
        - containerPort: 80                          # 6
```

- Kind: Đánh dấu xem tài nguyên Kubernetes mà ta sẽ tạo với manifest file này. Ở đây ta muốn tạo 1 pod mới, vậy trường này có giá trị là **Pod**
- Name: tên của resource, ta cũng gọi nó là *frontend* luôn cho tiện.
- Spec: Object mà sẽ định nghĩa trạng thái cho resource. Thứ quan trọng nhất ở đây là danh sách các container trong pod.
- Image: image dùng để bắt đầu trong pod.
- Name: Tên của container trong pod.
- Container Port: Cổng mà container đó gắn với.

#### Tạo pod cho frontend

tạo 1 file `yaml` cho đống setting ở trên, ở đây ta có thể gọi nó là `frontend-pod.yaml` chẳng hạn. Chạy lệnh dưới đây để thực thi file:

```go
> kubectl create -f frontend-pod.yaml
pod/client created
```

Giờ, kiểm tra pod vừa được tạo với câu lệnh:

```sql
> kubectl get pods        
NAME     READY   STATUS    RESTARTS   AGE
client   1/1     Running   0          2m
```

Note: Thực ra ở bước 1 phía trên, ta chỉ tạo ra các image trên local, trong khi mặc định thì kubernetes sẽ kiếm các image từ Docker Hub xuống, nên ta cần config 1 chút để lấy các image local mà thôi. (Toàn bộ phần này không cần thực hiện một khi bạn tạo 1 tài khoản trên docker hub và public các image của mình lên đó).

1. Chạy lệnh `eval $(minikube docker-env)` để chỉ local docker environment tới minikube
2. Thực hiện lại lệnh build cho 2 image của server và client, lúc này khi chạy `docker images` bạn sẽ thấy 2 image nằm chung với các image đã có của kubernetes 
3. Chỉnh sửa 1 chút trong file định nghĩa pod (ngăn không pull image từ network xuống): 

```markdown
    # ...
    - image: client
      imagePullPolicy: Never
    # ...      
```

#### Nghịch thử với cái pod vừa tạo

Để access tới app mà ta vừa tạo, ta sẽ tạo thêm 1 resource Kubernetes nữa, lần này nó sẽ có type là `Service`. Nhưng nó sẽ nằm ở phần sau của bài viết, còn giờ ta có 1 cách khác, đó là public cái port của pod vừa tạo ra ngoài.

```css
kubectl port-forward client 80:80
```

Note: (local của mình cần chạy `sudo` với cái lệnh trên :thinking:)

![](https://images.viblo.asia/11eab9a9-0f04-4756-bf01-88c7bc382e86.png)

### Scale up

Ta vừa nói rằng tính năng chính của Kubernetes là scalable. 

Hiện tại, để tạo thêm 1 pod nữa, ta sẽ tạo 1 resource nữa cũng có type là pod

```markdown
apiVersion: v1
kind: Pod
metadata:
  name: client2       # => Thay đổi
spec:
  containers:
    - image: client
      imagePullPolicy: Never
      name: client
      ports:
        - containerPort: 80

```

Tạo pod này tương tự như trên

```markdown
> kubectl create -f frontend-pod2.yaml
pod/client2 created

> kubectl get pods                    
NAME      READY   STATUS    RESTARTS   AGE
client    1/1     Running   0          17m
client2   1/1     Running   0          22s
```

Giờ ta đã có 2 pod :D Giờ thì có 2 câu hỏi ta cần giải quyết:

- Làm sao để từ bên ngoài truy cập được tới 2 pod của ta thông qua URL (mà không phải thông qua `port-foward` như ở trên)
- Làm sao để thực hiện load balance giữa 2 pod ?

Để giải quyết 2 câu hỏi trên, hãy cùng nhảy tới resource tiếp theo của kubernetes - Service.

## Kubernetes #2 - Services

Như vừa nói ở trên, resource **Service** của Kubernetes sẽ đóng vai trò entry point tới 1 tập các pod khác cung cấp cùng 1 tính năng hay service. Resource này đảm nhiệm công việc điều phối, cân bằng tải giữa các pod kết nối.

![](https://images.viblo.asia/3d693a60-72c5-42cc-9117-4b66ce3e66f7.png)

Trong cluster của ta, ta sẽ có nhiều pod thực hiện các service khác nhau (server Express, client app Angular ...) Vậy làm sao để service biết nó cần kết nối tới pod nào ?

Ta có thể làm việc này bằng sử dụng **Label**

- Gắn thêm label cho tất cả các pod mà ta muốn Service kết nối tới.

```markdown
apiVersion: v1
kind: Pod
metadata:
  name: client
  labels:           # => thêm nhãn labels ở đây, cho cả client và client2
    app: client
spec:
  containers:
    - image: client
      imagePullPolicy: Never
      name: client
      ports:
        - containerPort: 80

```

- Lưu thay đổi của 2 pod trên:

```shell
> kubectl apply -f frontend-pod.yaml   
Warning: kubectl apply should be used on resource created by either kubectl create --save-config or kubectl apply
pod/client configured

> kubectl apply -f frontend-pod2.yaml
Warning: kubectl apply should be used on resource created by either kubectl create --save-config or kubectl apply
pod/client2 configured
```

Ta sẽ nhận được 1 cái warning ở đây, cơ mà kệ nó ở đấy. Check lại xem 2 pod của ta đã được gắn label đúng chưa:

```shell
> kubectl get pod -l app=client     
NAME      READY   STATUS    RESTARTS   AGE
client    1/1     Running   1          13h
client2   1/1     Running   1          13h
```

- Cuối cùng, ta định nghĩa cho service của ta, trong đó có 1 trường *selector* quy định xem service sẽ kết nối tới pod với label nào.

### File định nghĩa cho Service 

```css
apiVersion: v1
kind: Service              # 1
metadata:
  name: client-lb
spec:
  type: LoadBalancer       # 2
  ports:
  - port: 80               # 3
    protocol: TCP          # 4
    targetPort: 80         # 5
  selector:                # 6
    app: client            
```

Ở đây, ta có thể thấy 1 vài điểm cần chú ý:

- Kind: Khác với các Pod, trường này của service dĩ nhiên sẽ có giá trị là `Service` rồi :)
- Type: Đặc tả thêm về loại của Service, ở đây service của ta đóng vai trò là 1 load-balancer
- Port: Cổng mà service sẽ nhận request vào
- Protocol: Giao thức kết nối
- TargetPort: Cổng mà các request tới được foward về.
- Selector: Nơi định nghĩa *selector* mà dùng để lựa chọn các pod nào service sẽ kết nối tới. Ở đây là các pod nào có gắn nhãn `client`

Tạo service bằng câu lệnh dưới

```shell
> kubectl create -f service-frontend-lb.yaml 
service/client-lb created
```

Check lại service đã tạo thành công 

```shell
> kubectl get svc
NAME         TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
client-lb    LoadBalancer   10.109.197.143   <pending>     80:31272/TCP   30s
kubernetes   ClusterIP      10.96.0.1        <none>        443/TCP        1d
```

Item đầu tiên `client-lb` chính là service mà ta vừa tạo. Trong đó, `External-IP` hiện giờ đang có state là pending, do hiện giờ chúng ta mới chỉ đang test trên Minikube. Khi chúng ta deploy trên hàng thật như kiểu Azure hay Google Clound ... thì `External-IP` sẽ có giá trị thật, là địa chỉ IP mà ta có thể truy cập vào từ web.

Còn giờ, khi sử dụng Minikube, ta sẽ dùng 1 câu lệnh khác để chạy local debug:

```shell
> minikube service client-lb
Opening kubernetes service default/client-lb in default browser...
```

Câu lệnh này sẽ chạy và mở browser trên máy. Luồng request sẽ chạy đúng như ta mong muốn: Service nhận request, sau đó foward lại cho 1 trong các pod (cho pod nào thì ta không cần quan tâm - đây chính là mục đích của Kubernetes).

![](https://images.viblo.asia/bdffd630-ea6a-450d-9a8c-59d6b756a1ea.png)

## Kubernetes #3 - Deployment

Thêm 1 dạng resource nữa của Kubernetes - bên cạnh `Pod` và `Service` - mà ta sẽ làm quen ở đây, đó là `Deployment`. Vậy resource này để làm gì ?

Trong quy trình phát triển phần mềm, quá trình nâng cấp, cập nhật hệ thống là bắt buộc, và nó bao gồm nhiều bước: code, đóng gói code, deploy code ... trong mỗi bước như vậy, đều rất dễ xảy ra sai sót. Lúc này, resource `Deployment` đóng vai trò tự động hóa quy trình nâng cấp phiên bản phần mềm của ta, từ version này lên version khác, loại bỏ khoảng thời gian chết (downtime), ngoài ra cũng có thể dễ dàng rollback về phiên bản cũ nếu như việc nâng cấp xảy ra sai sót.

![](https://images.viblo.asia/3d693a60-72c5-42cc-9117-4b66ce3e66f7.png)

Quay lại với ví dụ từ đầu tới giờ : Hiện giờ, việc deploy 2 pod và 1 load-balancer đang được thực hiện 1 cách riêng rẽ, và thủ công (các khâu từ tạo, update, xóa tới giám sát trạng thái ...) Đó là còn chưa nói tới việc nâng cấp và rollback phiên bản. Đây là chỗ `Deployment` xuất hiện.

### File định nghĩa cho Deployment

```markdown
apiVersion: extensions/v1beta1
kind: Deployment                                          # 1
metadata:
  name: client
spec:
  replicas: 2                                             # 2
  minReadySeconds: 15
  strategy:
    type: RollingUpdate                                   # 3
    rollingUpdate: 
      maxUnavailable: 1                                   # 4
      maxSurge: 1                                         # 5
  template:                                               # 6
    metadata:
      labels:
        app: client                                       # 7
    spec:
      containers:
        - image: client
          imagePullPolicy: Never                          # 8
          name: client
          ports:
            - containerPort: 80
```

- Kind: có giá trị là `Deployment`
- Replicas: Số lượng bản sao các pod mà ta muốn có. Do ở trên ta đang dùng 2 pod, vậy ở đây ta cũng để giá trị là 2.
- Type: Quy định phương thức nâng cấp phiên bản version. ở đây ta lựa chọn `RollingUpdate` là để đảm bảo quá trình nâng cấp sẽ không gây ra Downtime. 
- MaxUnavailable: 1 property đi kèm với `RollingUpdate`, quy định số lượng pod tối đa có thể ở trạng thái unavailable khi thực hiện update. Với hệ thống của ta đang có 2 pod - 2 replica - thì khi thực hiện update, cần đảm bảo lúc nào cũng ít nhất 1 pod được chạy, tương đương với chỉ có 1 pod được phép down tại 1 thời điểm mà thôi.
- MaxSurge: cũng đi kèm với `RollingUpdate`, quy định số lượng pod tối đa có thể thêm vào khi deploy. Như của ta, điều này có nghĩa là trong quá trình nâng cấp version, tạm thời ta có thể có tới tối đa là 3 pod cùng thời điểm.
- Template: Template cho pod mà Deployment sẽ dùng để tạo pod mới. Có thể thấy là nó gần gần giống với cấu trúc định nghĩa 1 pod.
- app: ở dòng `#7`, đây là label cho pod sẽ được tạo.
- ImagePullPolicy: Như đã nói ở phía trên, là phương thức mà 1 image được sử dụng khi tạo mới pod. Vì đang chạy local với Minikube, ta có thể chọn giá trị `Never`; ngược lại có thể chọn `Always` khi ta muốn pull image mới về mỗi lần deploy.

Hơi bị nhiều chữ rồi, giờ chạy thử xem thế nào :smiley:

```rust
> kubectl apply -f frontend-deployment.yaml
deployment.extensions/client created
```

Check lại, ta sẽ thấy có tới 4 pod: trong đó 2 pod `client` và `client2` ta đã tạo thủ công ở trên, 2 cái có đánh id đằng sau là 2 cái được tạo thông qua `Deployment`. 

```shell
> kubectl get pods
NAME                     READY   STATUS    RESTARTS   AGE
client                   1/1     Running   2          1d
client-7b8d497db-snr57   1/1     Running   0          38s
client-7b8d497db-v5x7w   1/1     Running   0          37s
client2                  1/1     Running   2          1d
```

Xóa 2 cái trước đó đi bằng `kubectl delete pod client` và `kubectl delete pod client2`

```cpp
> kubectl delete pod client
pod "client" deleted
> kubectl delete pod client2
pod "client2" deleted
```

### Just for fun

Giờ thử xóa 1 trong 2 pod được tạo thông qua `Deployment` và xem chuyện gì xảy ra :thinking:

```cpp
> kubectl delete pod client-7b8d497db-snr57
pod "client-7b8d497db-snr57" deleted
```

Ta sẽ thấy 1 pod khác thay thế tự động được tạo.

```shell
> kubectl get pods                         
NAME                     READY   STATUS    RESTARTS   AGE
client-7b8d497db-bqbz8   1/1     Running   0          12s
client-7b8d497db-v5x7w   1/1     Running   0          3m
```

Khi ta xóa 1 pod đi, Deployment sẽ nhận biết được là ở hiện tại (có 1 pod đang chạy) sẽ khác với trạng thái mong muốn (2 pod), khi đó nó sẽ tự động tạo thêm pod.

Tiếp sau, ta sẽ nghịch thử 1 vài tính năng khác nữa của Deployment.

### Nâng cấp version với zero-downtime

1 ngày đẹp trời, thằng sếp tới và đưa yêu cầu mới về tính năng. Sau khi dev code xong, họ vứt cho ta sản phẩm cuối nằm trong 1 cái image - `client-v2` chẳng hạn. Việc của ta bây giờ là ném cái image này lên hệ thống.

Giờ, ta sẽ phải chỉnh sửa 1 chút xíu trong file yaml của Deployment: thay đổi tên của image sang tên mới:

```css
...
spec:
      containers:
        - image: client-v2
...
```

Lưu lại file dưới 1 tên khác - vd như `frontend-deployment-v2.yaml` - và chạy lệnh:

```shell
> kubectl apply -f frontend-deployment-v2.yaml --record
deployment.extensions/client configured
```

Chú ý thêm option `record` khi chạy apply, và ở kết quả thì khi thành công sẽ trả về `configured` chứ không phải `created` như khi tạo mới. Kiểm tra kết quả với câu lệnh:

```scala
> kubectl rollout status deployment client     
deployment "client" successfully rolled out
```

Giờ, ta có thể lên web và check tính năng mới đã được deploy thành công.

> Để hiểu hơn về cơ chế Rolling Update, và vì sao nó lại có thể thực hiện upgrade với zero downtime, bạn có thể đọc thêm [bài viết này](https://kubernetes.io/docs/tutorials/kubernetes-basics/update/update-intro/):
> 
![](https://images.viblo.asia/baa715c6-ecea-4b5e-bceb-4034207f56b0.gif)

### Rollback

Lại 1 ngày đẹp trời nữa, sau cái hôm deploy ở trên, khách hàng lúc này dùng thử sản phẩm và phát hiện ra **Bug**. Lão sếp chạy ngay xuống chỗ ta và ra lệnh, yêu cầu revert gấp xuống phiên bản trước đó.

Đầu tiên, check lại lịch sử deploy lại cho chắc:
```markdown
> kubectl rollout history deployment client     
deployment.extensions/client 
REVISION  CHANGE-CAUSE
1         <none>
2         kubectl apply --filename=frontend-deployment-v2.yaml --record=true
```

Thấy rõ rằng lần cập nhật cuối có bug, vậy thì việc của ta chỉ là revert lại về phiên bản trước mà thôi.

```shell
> kubectl rollout undo deployment client --to-revision=1
deployment.extensions/client
```

Done.

---

Quay lại 1 chút xíu lên trên: tại sao revision `#1` có `CHANGE-CAUSE` LÀ <none> trong khi của revision `#2` lại có giá trị ? Đó là do option `--record` khi ta apply image mới. Nếu muốn, bạn có thể check ý nghĩa của option này với câu lệnh:

```html
> kubectl apply --help

....
...
..
--record=false: Record current kubectl command in the resource annotation. If set to false, do not record the
command. If set to true, record the command. If not set, default to updating the existing annotation value only if one
already exists.
```

## Hoàn thiện hệ thống

`Pod`, `Service`, `Deployment` - ta đã tìm hiểu về 3 resource chính của Kurbernetes. Phần còn lại chỉ là hoàn thiện nốt demo của chúng ta, do đó các file `yaml` bên phía `server` sẽ giống hệt bên `client` (chỉ đổi lại tên các property mà thôi :D). Sau khi hoàn thiện, hệ thống của ta sẽ trông như thế này:

![](https://images.viblo.asia/116ce939-db49-4fcb-acef-5295a1fd0ba2.png)

# Kết thúc:

Vậy là ta đã tìm hiểu xong 1 vòng về Kurbernetes: định nghĩa nó là cái gì ? Nó làm công việc gì ? Có tác dụng như thế nào ? Bao gồm những thành phần chính gì ...

Bài viết chủ yếu là để giới thiệu về Kurbernetes, vì vậy nếu bạn nào còn chưa làm quen với các khái niệm cơ bản khác của Docker, thì các bạn có thể xem serie ở đây :D (nếu thấy hay các bạn hãy click :+1: và `subscribe`, vì hình như tác giả vẫn đang viết tiếp thì phải :thinking:)

- [Docker for Beginner](https://viblo.asia/p/docker-for-beginner-ByEZkp3ElQ0)
- [Docker for Beginner [Part II]](https://viblo.asia/p/docker-for-beginner-part-ii-3P0lPAqv5ox)

## Nguồn:
https://medium.freecodecamp.org/learn-kubernetes-in-under-3-hours-a-detailed-guide-to-orchestrating-containers-114ff420e882
https://kubernetes.io/docs/tutorials/kubernetes-basics/update/update-intro/