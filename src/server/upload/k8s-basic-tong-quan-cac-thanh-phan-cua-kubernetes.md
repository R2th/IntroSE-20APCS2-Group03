# Lời nói đầu
Có rất rất nhiều bài viết trên mạng nói về "Kubernetes là gì" rồi. Tuy nhiên với series kubernetes cho người mới bắt đầu thì mình cũng nhấn mạnh về việc hỏi rõ kiến trúc và thành phần của Kubernetes. Đó là căn bản nhất để tiếp thu tiếp các khái niệm về sau này.
Trong bài viết này chúng ta sẽ cùng tìm hiểu sơ bộ về từng thành phần của một hệ thống Kubernetes và vai trò, chức năng của nó trong hệ thống như thế nào.

# Kubernetes gồm những thành phần gì
Đầu tiên, kubernetes (còn gọi tắt là k8s) là một phần mềm điều phối và quản trị container, hay thường gọi là **Container Orchestration**. 
Về ý tưởng, k8s tạo ra một platform (nền tảng) để chạy các container trên các máy chủ (baremetal hoặc VM) mà việc cấp phát và quản lý tài nguyên cho các container sẽ do k8s đảm nhiệm.
Nếu bạn nào từng làm việc với ảo hóa (như VMware chẳng hạn) thì sẽ thấy về ý tưởng k8s cũng gần giống VMware Hypervisor, với các container thì tương đương với VM vậy. 

Và để làm được việc quản lý, điều phối container thì k8s được thiết kế với kiến trúc như sau:
![image.png](https://images.viblo.asia/5b66b7b4-d1e1-4280-a6b7-2267d39e6681.png)


Các K8S node được chia làm 2 loại chính là Master Node (còn gọi là Control Plane) và Worker Node (Data Plane). Về cơ bản các master node làm nhiệm vụ điều khiển (đúng nghĩa của việc quản lý và điều phối), còn tải thực sự, nơi cấp tài nguyên để chạy các ứng dụng trên container là các worker node.

Tuy nhiên lưu ý, master node cũng có thể được cấu hình để đồng thời làm worker node. Nghĩa là ngoài nhiệm vụ quản lý (control plane) thì nó còn có thể đồng thời làm nhiệm vụ chạy các ứng dụng như worker node (data plane).

Điều này khá quan trọng, vì đôi khi trong nhiều tình huống thực tế ta vẫn phải chạy master node đồng thời là worker node. Nên các bạn cần hiểu rõ mà ko bị định kiến rằng đã là master node thì không thể là worker node, điều đó không đúng.


**Trên các master node ta có 4 thành phần chính gồm:**
- kube-api-server
- etcd
- kube-scheduler
- kube-controller-manager
- cloud-controller-manager (optional)

**Trên các worker node ta có các thành phần:**
- kubelet
- kube-proxy
- container runtime interface (CRI)

***Ta sẽ đi vào tìm hiểu từng thành phần có vai trò gì trong hệ thống k8s.***

# Thành phần điều khiển (Control Plane Component)
## kube-api-server
Trong k8s thì kube-api-server là một trong những thành phần quan trọng nhất. Nó giống như là trái tim của hệ thống để bơm máu đi khắp nơi nuôi cơ thể vậy. Tại sao lại nói như vậy? Đơn giản bởi vì hầu hết các thành phần trong hệ thống đều làm việc với kube-api-server.
kube-api-server cung cấp ra các API của Kubernetes, nó giống như frontend của Kubernetes control plane.

## etcd
etcd là một CSDL dạng key-value (khác với các CSDL quan hệ - SQL hay phi quan hệ - noSQL) được dùng để lưu dữ liệu của kubenetes cluster. Các dữ liệu này là dữ liệu quản lý tài nguyên của k8s nhưng thông tin node, pod, service, deployment, configmap.. Các loại tài nguyên này sẽ được đề cập trong các bài tiếp theo.

Một lưu ý quan trọng là khi sử dụng etcd thì luôn phải có kế hoạch backup DB định kỳ.

## kube-scheduler
Đây là thành phần điều khiển có nhiệm vụ theo dõi các Pods mới được tạo mà chưa được gán vào node, và thực hiện tìm kiếm một node phù hợp trong cluster để chạy Pods đó lên.
Có rất nhiều tham số ảnh hưởng tới việc điều phối một Pod vào một node như: 
- Các yêu cầu về tài nguyên cho Pod như RAM/CPU..
- Các ràng buộc về phần cứng phần mềm
- Các chỉ định về affinity và anti-affinity.. và nhiều yếu tố khác nữa

## kube-controler-manager
Là thành phần điều khiển có vai trò quản lý, trong đó nó là tổng hợp của nhiều controller khác nhưng chạy chung 1 process, bao gồm:
- Node controller: Có trách nhiệm phát hiện và cảnh báo khi node bị down
- Job controller: Theo dõi các object (đại diện cho một task cụ thể nào đó) được tạo ra sau đó tạo Pods để chạy các task đó tới khi hoàn thành.
- Endpoints controller: Quản lý các endpoints, là việc tạo sự kết nối giữa Service và Pods. 
- Service Account và Token controllers:  Tạo ra các account và token API mặc định cho namespace mới.

## cloud-controller-manager
Là thành phần điều khiển mà nhúng các logic điều khiển của nền tảng cloud cụ thể. Cloud-controller-manager cho phép người quản lý kết nối k8s cluster với API của nhà cung cấp cloud. Thành phần này là không bắt buộc nếu bạn không sử dụng cloud của cloud provider.

# Thành phần node (Node Component)
## kubelet
Là một agent chạy trên từng node trong cluster. Nó có vai trò đảm bảo các container ở trạng thái running ở trong Pod. Công việc của nó là lắng nghe thông tin các Pod được gán cho node đó (mà nó đang chạy) và dùng nhiều cơ chế để đảm bảo việc tạo ra các container đúng theo mô tả trong podspec được chạy (running) và không bị lỗi (healthy). 
Nó cũng đồng thời cập nhật trạng thái của các container trên node cũng như thông tin của node về control plane. Ví dụ đơn giản nhất là nếu kubelet bị stop thì node đó sẽ hiển thị trạng thái NotReady trong cluster.

## kube-proxy
Đây là network-proxy chạy trên từng node. Nó quản lý và duy trì các network rule trên các node. Những rule này đảm bảo kết nối tới các Pods từ bên trong hoặc bên ngoài cluster. 

## container runtime
Đây là thành phần có trách nhiệm cho việc chạy các container. Một số container runtime điển hình mà k8s hỗ trợ gồm có Docker và Containerd.

# Thành phần addon
## DNS
Dù addon thì thường không phải là bắt buộc nhưng mọi kubernetes cluster đều cần có nó. Nó bản chất làm một DNS server lưu trữ các bản ghi cho các service của kubernetes. Sau này khi làm việc với k8s các bạn sẽ thấy hầu hết chúng ta làm việc với các service qua service name, và đương nhiên thì để làm được việc đó thì k8s cần có DNS. 

## Web UI (Dashboard)
Dashboard là một giao diện web-UI giúp ta theo dõi,quản lý cũng như troubleshoot các ứng dụng chạy trên cluster và chính tình trạng của cluster một cách trực quan hơn. 
Ngoài sử dụng dashboard, thì có nhiều giải pháp tương tự cũng khá phổ biến như sử dụng Rancher, Lens hay k9s.. để có giao diện quản trị với k8s cluster.

**Tới đây thì ta đã điểm qua được các thành phần chính trong một kubernetes cluster. Nhưng chỉ có lý thuyết thế này rất mau quên. Vậy thì ta sẽ đi vào một vấn đề cụ thể để hiểu hơn và nhớ hơn về các thành phần của hệ thống.** 

***Ta sẽ xem xét luồng tạo ra một Pod mới và xóa 1 Pod đang chạy và xem khi đó điều gì sẽ xảy ra và các thành phần bên trên tham gia vào quá trình này như thế nào.***

# Vòng đời của Pod (Pod lifecycle)
## Tạo Pod 
**Khi tạo một Pod mới, thì cơ bản các sự kiện diễn ra và các thành phần tham gia và các sự kiện đó như sau:**

![image.png](https://images.viblo.asia/13b70a01-6638-4bcc-8c88-687b6cde491d.png)

**Chi tiết luồng tạo Pod:**
1.  Khi ta thực hiện tạo một Pod mới, thông tường là dùng lệnh kubectl để apply một file yaml là file mô tả chi thiết các thông tin cần thiết cho việc tạo Pod. Khi đó bản chất lệnh kubectl sẽ làm việc với api-server để gọi một api tương ứng cho việc tạo Pod. 

2. API server xử lý yêu cầu trên bằng cách validate cú pháp của file yaml và nếu không có vấn đề gì thì sẽ thực hiện ghi dữ liệu này vào etcd - Là key-value db đã mô tả bên trên. Như vậy tại thời điểm này, trên hệ thống đã ghi nhận một Pod mới cần được tạo. Sau khi ghi xong vào etcd thì api-server phản hồi lại kết quả cho client là Pod đã được tạo.

3.  Lúc này tới lượt scheduler tham gia vào. Như đã nói, nó sẽ theo dõi các Pod mới tạo trên hệ thống (bằng cách định kỳ kiểm tra api-server xem có thay đổi không) mà chưa được gán vào node để xử lý. Giờ nó phát hiện ra Pod mới này, nó sẽ lấy thông tin của Pod này và tìm một node thỏa mãn các yêu cầu, ví dụ là node1 và update vào thông tin của Pod là nó hãy chạy trên node1. Thông tin này được scheduler gửi cho api-server

4. API server nhận được thông tin Pod mới được gán vào node1 thì thực hiện update thông tin này và etcd. Lúc nào pod ở trạng thái bound.

5. Tiếp đến là kubelet cũng theo dõi các Pod ở trạng thái bound và được xếp lịch chạy trên node đó (bằng cách định kỳ lấy thông tin từ api-server). Ví dụ trong trường hợp này kubelet trên node1 phát hiện Pod mới được yêu cầu chạy trên node1 nên nó sẽ lấy thông tin cần thiết cho Pod và chạy Pod này thành các container trên node1. sau đó update lại trạng thái của Pod cho api-server. 

6. API server nhận được thông tin cập nhật trạng thái Pod từ kubelet ở node1 thì nó thực hiện ghi thông tin này vào etcd và nhận phản hồi kết quả từ etcd. Sau đó nó gửi bản tin acknowledgement tới kubelete để báo rằng event này đã được chấp nhận. 

## Xóa Pod
**Ngược lại với tạo Pod thì ta xem xét luồng xóa Pod như sau:**

![image.png](https://images.viblo.asia/398c4741-5a39-4e7e-8041-8b692e1bbea2.png)

**Chi tiết luồng xóa Pod:**
1. Người dùng gửi lệnh để xóa Pod
2. Đối tượng Pod trên k8s được cập nhật trạng thái thành "dead" sau một khoảng thời gian gọi là grace-time
3. Các hành động sau diễn ra song song:
  - Pod sẽ hiện thị ở trạng thái "Terminating" khi được kiểm tra từ phía client
  - Kubelet thấy một Pod được đánh dấu là Terminating thì nó bắt đầu thực hiện dừng process của Pod
  - Endpoint controller theo dõi pod đã được xóa chưa để xóa thông tin pod đó khỏi các endpoint mà nó phục vụ
4. Nếu pod có định nghĩa một **preStop hook**, thì nó được gọi tới bên trong pod. Nếu preStop hook vẫn đang chạy mà grace-time đã hết, thì bước (2) sẽ lại được gọi với thời gian grace-time nới thêm là 2 giây. Các bạn có thể tìm hiểu thêm về [**"Container hook"** ở đây](https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/).
5. Process bên trong Pod đã được gửi tín hiệu yêu cầu terminate (TERM signal)
6. Sau khi grace-time kết thúc, thì mọi process bên trong Pod sẽ bị kill bởi SIGKILL.
7. Kubelet hoàn thành xóa Pod bằng cách gọi API server và set grace-time bằng 0, nghĩa là yêu cầu xóa ngay lập tức. Lúc này Pod sẽ không còn và client sẽ không thể thấy được Pod này nữa. 

# Tổng kết
Như vậy qua nội dung ngày hôm nay ta đã hiểu về kiến trúc của hệ thống và vai trò của từng thành phần là gì.
Trong bài tiếp theo mình sẽ hướng dẫn xây dựng một hệ thống lab nhỏ xinh để vừa học, vừa thực hành các nội dung.

***Rất cảm ơn các bạn đã theo dõi và rất mong nhận được sự ủng hộ của các bạn bằng cách cho mình 1 UPVOTE vào các bài viết để thêm động lực ra thêm nhiều bài nữa nhé!***