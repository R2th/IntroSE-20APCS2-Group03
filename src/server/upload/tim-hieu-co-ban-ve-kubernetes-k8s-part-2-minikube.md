<div align="center">
    
# Lời mở đầu
    
</div>

- Xin chào các bạn, và sau  khoảng 10 tháng "ấp ủ" thì giờ phần 2 của series đã quay trở lại với các bạn rồi đây (thực sự xin lỗi các bạn vì om series này lâu đến vậy :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye:). Với [bài viết đầu tiên](https://viblo.asia/p/tim-hieu-co-ban-ve-kubernetes-k8s-part-1-924lJ4bbKPM), chúng ta đã cùng nhau tìm hiểu một số khái niệm cơ bạn về K8s như là ***cluster/nodes/pods***, ..., và sang đến bài viết này chúng ta sẽ tiếp tục tìm hiểu về cách setup K8s trên môi trường "local" để các bạn có thể tự học tập và nghiên cứu nhé, và công cụ chúng ta sử dụng ở đây là **Minikube**.

<div align="center">
    
# Nội dung
    
</div>

- Tìm hiều sơ quá 1 chút thì Minikube là một bộ cài đăt **K8s** bằng cách tạo ra một máy ảo trên máy tính của bạn và triển khai một **single-node Kubernetes cluster**(cluster mà chỉ có 1 node).

- Minikube có thể chạy trên đa nên tảng Linux, macOS, Windows nên bạn có thể dễ dàng cài đặt và sử dụng mà không gặp bất cứ khó khăn nào về về platform.

<div align="center">
    
## Cài đặt Minikube
    
</div>

### 1. Yêu cầu cấu hình:
- Tối thiểu 2 CPUs 
- 2GB of free memory
- Dung lượng ở cứng trống 20GB.
- Cài đặt một trong những driver sau để quản lý máy ảo: [**Docker**](https://minikube.sigs.k8s.io/docs/drivers/docker/), [**Hyperkit**](https://minikube.sigs.k8s.io/docs/drivers/hyperkit/), [**Hyper-V**](https://minikube.sigs.k8s.io/docs/drivers/hyperv/), [**KVM**](https://minikube.sigs.k8s.io/docs/drivers/kvm2/), [**Parallels**](https://minikube.sigs.k8s.io/docs/drivers/parallels/), [**Podman**](https://minikube.sigs.k8s.io/docs/drivers/podman/), [**VirtualBox**](https://minikube.sigs.k8s.io/docs/drivers/virtualbox/) hoặc [**VMWare**](https://minikube.sigs.k8s.io/docs/drivers/vmware/).

    => hãy lựa chọn driver phù hợp với OS mà bạn đang sử dụng nhé, chi tiết các driver ứng với từng OS các bạn có thể tham khảo ở [**đây**](https://minikube.sigs.k8s.io/docs/drivers/). Trong bài viết này, mình sẽ sử dụng OS **Linux** và driver **Docker**.
- Cuối cùng và không kém phần quan trọng, đó là kết nối Internet :sweat_smile::sweat_smile:

### 2. Cài đặt minikube:
- Sau khi đã đảm bảo được đầy đủ những yêu cầu phía trên, bạn có thể truy cập vào [**đây**](https://minikube.sigs.k8s.io/docs/start/) để tìm phiên bản phù hợp vs OS mà bạn đang sử dụng (có cả Linux/macOS/Window). 

![](https://images.viblo.asia/4a595721-977d-4917-8c9d-fe391a4bdb1a.png)


- Để kiểm tra rằng việc cài đặt đã thành công, bạn có thể sử dụng câu lệnh **`minikube version`**, như máy mình là đang cài đặt phiên bản mới nhất hiện tại 1.22 (đã được release vào ngày 07/07/2021):

![](https://images.viblo.asia/a195efa1-cf12-4e6c-a95b-d4ed6f1dd45f.png)


- Sau khi đã cài đặt xong, mở cửa sổ CLI và gõ lệnh **`minikube start`** hoặc **`minikube start --driver=docker`** để khởi động minikube (nhớ là thay câu lệnh bằng driver tương ứng của bạn nhé). Và đây là thành quả:

![](https://images.viblo.asia/319a996b-107f-4955-8555-f2043072de07.png)

### 3. Các câu lệnh quản lý cluster thường dùng
- Màn quản lý dashboard của minikube:
    ```bash
    minikube dashboard
    ```
    
    ![](https://images.viblo.asia/11e20f30-1a5e-46c5-95d0-2bcde16574d3.png)

    
    Sau khi chạy lệnh thì trình duyệt sẽ tự động mở tab dashboard như hình bên dưới:
    ![](https://images.viblo.asia/f1ef07ca-012d-439f-a98a-785f6cc52e8d.png)

    
- Tạm dừng (không ảnh hưởng đến các ứng dụng đang được deploy): 
    ```bash
    minikube pause [flags]
    minikube unpause [flags] # ngược với pause 
    
    #list flags
    # -A: pause/unpause tất cả namespaces
    # -m: pause/unpause theo namespaces chỉ định
    ```
    
    ![](https://images.viblo.asia/b8f307f3-0c4a-4d5a-b833-bc9a33f37137.png)

    
- Start/stop cluster:
    ```bash 
    minikube start
    minikube stop
    ```
    
- Thay đổi cấu hình, ví dụ như `memory` (bạn cần restart lại để có thể sử dụng được config này)
    ```bash 
    minikube config set memory XXXXX 
    ```
    
    Ngoài cấu hình memory, bạn có thể set cấu hình một số thông tin khác như là ***driver***,  ***cpus***, ***disk-size***, ...
    
- Xóa tất cả các cluster:
    ```bash
    minikube delete --all
    ```
    
### 4. Thử deploy ứng dụng

- Đầu tiên bạn cần tạo một deployment và config port cho nó:
    ```bash
    minikube kubectl -- create deployment hello-minikube --image=k8s.gcr.io/echoserver:1.4
    minikube kubectl -- expose deployment hello-minikube --type=NodePort --port=XXXX
    ```
    
    Sau khi chạy 2 câu lệnh trên, để kiểm tra tình trạng của deployment thì phải chạy câu lệnh ***minikube kubectl get services***. Ở đây bạn có thể thấy một số thông tin như **tên**/**phân loại**/**IP**/**Port**/**Thời gian khởi tạo** của deployment.
    
    ![](https://images.viblo.asia/a0ee37b9-9f8f-4d26-a901-7fefabd08a3f.png)

    Và để chạy service lên thì bạn sẽ cần chạy câu lệnh ***minikube service hello-minikube***
    
    ![](https://images.viblo.asia/5e2eb648-bf83-4db7-ac71-93f7422c716b.png)

### 5. Tạo service để LoadBalancer
- Cũng tương tự như phía trên, bạn sẽ phải tạo thêm 1 deployment có phân loại là LoadBalancer
    ```bash
    minikube kubectl -- create deployment hello-minikube-balance --image=k8s.gcr.io/echoserver:1.4
    minikube kubectl -- expose deployment hello-minikube-balance --type=LoadBalancer --port=XXXX #chú ý type ở đây là LoadBalance chứ ko phải NodePort như ở trên nhé 
    ```
    
- Sau đó kiểm tra ***minikube kubectl get services*** sẽ thấy 1 deployment *hello-minikube* loại **NodePort** đã khởi tạo ở phần 4 và 1 deployment *hello-minikube-balance* loại **LoadBalancer** vừa tạo xong.
    
    ![](https://images.viblo.asia/91b5895b-06d5-4fb8-a338-61d2c915e7bb.png)

- Sau khi đã tạo một LoadBalance deployment như hình bên trên, mở một cửa sổ cmd mới và bạn cần chạy câu lệnh ***minikube tunnel*** để truy cập vào LoadBalance deployment thông qua http://EXTERNAL-IP:PORT trên trình duyệt.

    ![](https://images.viblo.asia/8f94e452-9f14-456d-baf3-182382a2036b.png)


<div align="center">
    
# Tổng kết
    
</div>

- Trong phạm vi bài viết này, mình đã giới thiệu cho các bạn về **minikube** trong **K8s**, tất nhiên là chỉ mới dừng lại ở mức cài đặt và nhưngx thao tác cơ bản thôi. Hy vọng là những kiến thức này sẽ giúp ích cho các bạn đang tìm hiểu, nghiên cứu về chủ đề này. Nếu có bất cứ thắc mắc hoặc phản hồi gì về nội dung cũng như cách trình bày của bài viết, hãy comment góp ý cho mình nhé, mình sẽ cố gắng tiếp thu và giải đáp thắc mắc của các bạn.
- Và cũng rất xin lỗi các bạn về việc ra bài chậm trễ này, gần đây mình khá bận và không có nhiều thời gian để có thể research và viết tiếp series này, mong các bạn có thể thông cảm và tiếp tục ủng hộ những bài viết của mình.

<div align="center">
    
# Tài liệu tham khảo
    
</div>

- https://minikube.sigs.k8s.io/docs/
- Trong phần tutorial có một mục mình thấy khá hay, đó là tutorial tương tác trực tiếp trên web, step-by-step như sau 
    - Creating a Cluster: https://kubernetes.io/docs/tutorials/kubernetes-basics/create-cluster/cluster-interactive/
    - Deploying an App: https://kubernetes.io/docs/tutorials/kubernetes-basics/deploy-app/deploy-interactive/
    - Exploring Your App: https://kubernetes.io/docs/tutorials/kubernetes-basics/explore/explore-interactive/
    - Scaling Your App: https://kubernetes.io/docs/tutorials/kubernetes-basics/scale/scale-interactive/