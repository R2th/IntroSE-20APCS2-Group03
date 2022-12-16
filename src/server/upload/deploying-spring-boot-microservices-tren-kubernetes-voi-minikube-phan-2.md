Tiếp nối phần một về deploy một microservice bằng docker , hôm  nay mình sẽ hướng dẫn các bạn cách deploy một microservices bằng kubernetes  .<br> Việc xây một ứng dụng thử để deploy cũng như hiểu về cách deploy bằng docker các bạn hãy quan lại phần 1 của mình [tại đây !](https://viblo.asia/p/deploying-spring-boot-microservices-tren-kubernetes-voi-minikube-phan-1-6J3Zg38gZmB) <br>

# 1. Tạo  cluster kubernetes local 
  Có nhiều cách để tạo một  cluster kubernetes 
   - Sử dụng dich vụ quản lý kubernetes như  [Google Kubernetes Service (GKE)](https://cloud.google.com/kubernetes-engine/), [Azure Kubernetes Service (AKS)](https://docs.microsoft.com/en-us/azure/aks/), or [Amazon Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc&eks-blogs.sort-by=item.additionalFields.createdDate&eks-blogs.sort-order=desc)<br>
   -  Cài đặt kubernetes của chính mình trên clound hoặc trên cơ sở hạ tầng tại chỗ với kubeadm hoặc kops<br>
   -   Tạo một cluster kubernetes trên máy local của bạn với công cụ như minikube , microk8s hoặc k3s<br>
   Trong bài này, chúng ta sẽ dử dụng Minikube<br>
   Minikube tạo một một  node cluster kubernetes duy nhất chạy trên một máy ảo <br>
   Trước khi cài dặt Minikube chúng ta cần cài đặt  kubectl 
   ```
   $ curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl"
   $ curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.19.0/bin/linux/amd64/kubectl
   $ chmod +x ./kubectl
   $ sudo mv ./kubectl /usr/local/bin/kubectl
   $ kubectl version --client
   ```
   Chi tiết cài đặt kubeclt các bạn có thể xem thêm [ở đây  !](https://kubernetes.io/docs/tasks/tools/install-kubectl/)<br>
   
  Tiếp theo ta sẽ cài đặt minikube 
  ```
  $ curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
  $ sudo install minikube-linux-amd64 /usr/local/bin/minikube
  ```
  Xem thêm cài đặt minikube[ tại đây !](https://minikube.sigs.k8s.io/docs/start/)
  Để tạo cluster kubernetes chúng ta sẽ chạy câu lệch dưới đây!
  ```
  $ minikube start --driver=docker
  ```
  Câu lệnh trên là chúng ta sẽ tạo môi trường kubernetes trên một máy ảo sử dụng docker tạo ra. Nếu bạn muốn tạo một máy ảo riêng để chạy bạn có thể dùng virtualbox , xem thêm[ tại đây](https://oracle-base.com/articles/vm/virtualbox-creating-a-new-vm) ! Để khởi tạo trên máy ảo các bạn chạy câu lệnh 
   ```
  $ minikube start --driver=virtual 
  ```
  Việc chỉ định driver sẽ được thực hiện ở lần đầu tiên, ở những lần tiếp theo tạo muốn khơi động lại( `$ minikube start `) nó sẽ tự động theo driver đã set up lần đầy. Nếu muốn thay đổi drive thì bạn cần phải xóa cluster bằng câu lệnh : 
  ```
 $ minikube delete --all
  ```
  Sau đó bạn sẽ chạy lại theo driver mà mình mong muốn như  là docker hoặc virtual . Việc khởi tạo có cluster có thể mất vài phút nên mong bạn có thể kiên nhẫn !<br>
  Khi việc khởi tạo hoàn tất, các bạn chạy câu lệnh dưới đây để xác minh xem cluster đã được tạo : 
  ```
$kubectl cluster-info
  ```
  ![](https://images.viblo.asia/ec66e796-6c1f-4c31-bd28-e2e1e579c5a6.png)

  Bây giờ bạn đã hoàn thành việc tạo một cluster kubernetes trên máy của bạn . Tiếp theo chúng ta sẽ tìm hiểu một vài khái niệm cơ bản về kubernetes!
# 2.  Các khái niệm cơ bản về kubernetes
Kubenetes có một giao diện để khai báo.<br>
Nói cách khác , bạn có thể mô tả bạn muốn việc triển khai ứng dựng của mình trong như thế nào và kuberntetes tìm ra các bước cần thiết để đạt được trạng thái này . <br>
Ngôn ngữ mà bạn sử dụng giao tiếp với kubernetes được gọi là các tài nguyên của kubenetes. Bạn có thể tìm thấy tất cả các tài nguyên của kubernetes ở [Kubernetes API reference ](https://v1-15.docs.kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/)
<br>
Các tài nguyên của kubernetes sẽ được định nghĩa trong tệp YAML và được gửi tới cluster thông qua HTTP API. Tương tự để truy vấn trạng thái các ứng dụng của bạn , bạn truy xuất tài nguyên kubernetes thông qua API Kubernetes HTTP.
Trong phần này chúng ta sẽ giải thích về những tài nguyên cơ bản là deployment, service và  pod
Đầu tiên hãy tạo một folder kube trong thư mục làm việc của bạn : 
```
$ mkdir kube
```
Mục tiêu tạo thư mục này là để ta quản lý tất cả các tệp YAML .
## Xác định tài nguyên Deployment
 Tạo một file knote.yaml  như dưới đây !
{@embed: https://gist.github.com/hoangnt-2197/e91c5c5009c0c0f2f0c83bafb879f640}
<br>

Nhìn có vẻ hơi phức tạp, h mình sẽ định nghĩa từng phần để các bạn hiểu hơn !<br>
Bốn dòng đầu tiên là để xác nhận loại tài nguyên ở đây là Deployment , apps/v1 là chỉ phiên bản (version) của loại tài nguyên. <br>
Tiếp theo , là bạn mô tả số bản sao tại replicas , ở đây là 1, nó tương tứng với 1 pod <br>
Poa là một vỏ bao quanh một hoặc nhiều container (container docker). Nếu một Pod chức nhiều containers. chúng có thể được tạo như một đơn vị, chúng sẽ được khởi tạo và dừng cùng với nhau và thực hiện trên một node.<br>
Phần tiếp theo lad định nghĩa tài nguyên Deployment với pod liên quan. Trường template.metadata.labels xác định nhãn cho Pods mà bao container knote của bạn (app: knote). <br>
Trường selector.matchLables lựa chọn những Pods với một nhãn là app: knote . Chú ý là phải có ít nhất một nhãn chia sẻ giữa hai trường này <br>
Tiếp theo, là phần xác định container bạn muốn chạy **
 -  Docker image : learnk8s/knote-java:1.0.0
 -  Cổng lắng nghe : 8080
 -  Biết môi trường : MONGO_URL , nó sẽ phần sẵn sang cho việc xử lý trong container
## Xác định tài nguyên Service 
Một tài ngyên service sẽ giúp các Pod có thể truy cập được từ một Pods hoặc một người dùng bên ngoài. Nếu không có service thì một Pod sẽ không thể được truy cập ở bất cứ đâu.<br>
Chúng ta sẽ bổ sung phần dười đây vào file knote.yaml để định nghĩa cho tài nguyên service 

![](https://images.viblo.asia/d7fd463d-e110-4581-88fc-6193955cf0e6.png)

Phần selector.app: knote chỉ ra  pod được lựa chọn, chính là phần được chỉ ra ở emplate.metadata.labels  trong phần định nghĩa của deployment.
  - port : 80, chỉ ra cổng sẽ được kết nối từ bên ngoài vào service
  - port: 8080 chỉ ra cổng kết nối từ service tơi pod <br>
Giờ tiếp theo chúng ta sẽ tạo ra một file tương tự để khởi tạo cho image mogo : tạo file mogo.yaml trong thư mục kube : <br>

{@embed: https://gist.github.com/hoangnt-2197/2a99d5ba2bf8bbfd0deca6b120f4ce84}

 # 3.  Các bước deploy
 Kiểm tra trang thái của  cluster : 
 ```
 $ minikube status
 ```
 ![](https://images.viblo.asia/6ad2c30c-b7a7-4bf5-80a4-1dda92332db8.png)

Apply file config yaml mà chúng ta đã định nghĩa ở trên . Chạy lệnh 
```
$ kubectl apply -f kube
```
![](https://images.viblo.asia/f54eaa90-862f-49b3-b1fa-58c2c7901ba9.png)

Kiểm tra các pod được tạo 
```
$ kubectl get pods --watch
```

Kiểm tra service được tạo 
```
minikube service knote
```

Nhân bản mở rộng các app được tạo : 
```
kubectl scale --replicas=2 deployment/knote
```

Như vậy là chúng ta đã thực hiện được các bước để deploy app lên kubernetes , sử dụng minikube để tạo !<br>
Chúc các bạn thành công ! Có bất kì câu hỏi hoặc câu thảo luận nào các bạn hãy comment bên dưới nhé ! <br>
<br>
<br>
Tài liệu tham khảo :  https://learnk8s.io/spring-boot-kubernetes-guide