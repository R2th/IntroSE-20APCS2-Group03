# Lời tựa
Trong bài viết này mình sẽ giới thiệu ngắn gọn, không mang tính chất hàn lâm mà sẽ chủ yếu dựa vào các kiến thức và kinh nghiệm thực tế để bạn đọc tiết kiệm được thời gian và đi thẳng vào các vấn đề mình quan tâm.
Trong phần 1 này mình sẽ giới thiệu lại một chút về K8S là gì, kiến trúc và các thành phần chính của nó là gì trước khi đi vào hướng dẫn cài đặt và cấu hình thực tế.
Nếu các bạn đã có cái nhìn tổng quan này rồi có thể sang luôn phần 2 là bắt tay và xây dựng một hệ thống Lab đầy đủ và chi tiết.
# Giới thiệu về Kubernetes (K8S)
K8S là một phần mềm mã nguồn mở, có vai trò là một **Container Orchestration**, tức là một hệ quản trị các Container và các thành phần khác liên quan. Nó tương đương với Docker Swarm nhưng có nhiều tính năng ưu việt và mạnh mẽ hơn.
Chắc hẳn để tìm hiểu về K8S thì hầu hết các bạn sẽ đều có phải kiến thức nhất định về Container hay Docker, nếu không thì sẽ khá khó để tiếp nhận được các kiến thức của K8S.

Nếu bạn đã chạy các container trên Docker (dùng lệnh docker, docker-compose hoặc dùng docker-swarm) sẽ thấy khi số lượng container đủ lớn thì việc quản lý nó sẽ gặp nhiều khó khăn trong việc quản trị như giám sát, scale hệ thống, kiểm soát lỗi.. 

**Vậy nên sử dụng Kubernetes khi nào?**
- Khi cty bạn đủ lớn, cần phải scaling hệ thống nhanh chóng, và đã sử dụng container (Docker).
- Khi số lượng container đủ lớn cho các dịch vụ
- Các dự án xác định cần scale hệ thống về sau

**Kubernetes giải quyết vấn đề gì?**

Sử dụng docker bạn đã có thể tạo nhiều container nhưng khi cty bạn đủ lớn thì việc triển khai, quản lý, cập nhật ứng dụng sẽ gặp rất nhiều khó khăn và tốn nhiều effort. Do đó Kubernetes sinh ra để giải quyết các vấn đề sau:

- Việc quản lý hàng loạt docker host
-  Container Scheduling
-  Rolling update
-  Scaling/Auto Scaling
-  Monitor vòng đời và tình trạng sống chết của container.
-  Self-hearing trong trường hợp có lỗi xãy ra. (Có khả năng phát hiện và tự correct lỗi)
-  Service discovery
-  Load balancing
-  Quản lý data, work node, log
-  Infrastructure as Code
-  Sự liên kết và mở rộng với các hệ thống khác

# Kiến trúc hệ thống Kubernetes
![image.png](https://images.viblo.asia/2b0f4647-45a4-4d96-9b67-be1184439ed1.png)
Hệ thống Kubernetes gồm 2 phần chính gọi là Control Plane và Data Plane hay còn gọi là Master Node và Worker Node.
Trong đó Master Node sẽ đóng vai trò xử lý các tác vụ quản lý, điều khiển của hệ thống, còn Worker Node sẽ là nơi xử lý các work load của hệ thống. Các pod sẽ được tạo và chạy trên các Worker Node này.

Trên các Master Node sẽ có 4 thành phần chính gồm:
- **etcd:** Là một cơ sở dữ liệu dạng key-value có tính khả dụng và đồng nhất cao. Etcd là nơi K8S lưu trữ toàn bộ các thông tin cấu hình của hệ thống
- **controller:** Là một tiến trình chạy nền trên các Master Node. Các tiến trình này chạy liên tục để điều tiết trạng thái của hệ thống Kubernetes. Trong K8S, controller là một vòng lặp điều khiển giám sát trạng thái của cluster được chia sẻ qua qua các api và thực hiện các thay đổi cần thiết để chuyển trạng của cluster tới trạng thái mong muốn. 

- **kube api-server:** Đây là **core** của K8S Master, nó mở ra các HTTP API cho phép người dùng cuối cũng như các thành phần khác nhau trong chính K8S cluster có thể trao đổi thông tin với nhau. K8S API cho phép người dùng lấy thông tin về trạng thái của các đối tượng trong hệ thống như Pods, Namespaces, Services... Hầu hết các tác vụ sử dụng kube-api thông qua lệnh kubectl nhưng cũng có thể gọi trực tiếp REST API. 
- **kube-scheduler:** Đây là service mặc định của K8S làm nhiệm vụ phân phối Pod sẽ được chạy trên node nào. Mỗi Container bên trong Pod có thể có những yêu cầu khác nhau, hoặc ngay các Pod cũng có yêu cầu khác nhau. Do đó nhiệm vụ của Scheduler là tìm kiếm các node thỏa mãn các điều kiện trên và lựa chọn node tối ưu nhất để chạy. Tron trường hợp không có node nào thỏa mãn các điều kiện đặt ra thì Pod sẽ ở trạng thái chưa được lên lịch thực hiện cho tới khi Scheduler tìm được node phù hợp. 

**Trên các Worker Node sẽ có các thành phần chính gồm:**

- **kubelet**: Nó đóng vai trò như một "Node Agent" của K8s trên các Worker Node. Nhiệm vụ của nó để Worker Node được đăng ký và quản lý bởi cụm K8S cũng như là nhận nhiệm vụ triển khai các Pod (thường thông qua kube api-server) và đảm báo các container đó chạy ổn định. Lưu ý là kubelete không quản lý các container không được tạo bởi Kubernetes
- **kube-proxy**: Kube-proxy là một network proxy chạy trên mỗi node trong K8S cluster, thực hiện một phần Kubernetes Service. Kube-proxy duy trình network rules trên các node. Những network rules này cho phép kết nối mạng đến các pods từ trong hoặc ngoài cluster.

Như trên có lẽ vẫn chưa đủ thực tế để hiểu rõ về các thành phần của K8S và cách hoạt động, nên ta sẽ đi vào một ví dụ rất cụ thể để hiểu rõ hơn
# Một pod được tạo trên K8S như thế nào
**Bài toàn đặt ra là tôi muốn tạo một Pod chạy trên K8S Cluster, ta sẽ xem K8S xử lý như thế nào để thực hiện yêu cầu trên**.

Tôi dùng lệnh kubectl với cú pháp như sau để tạo một pod chạy nginx:
```bash
kubectl run --generator=run-pod/v1 nginx --image=nginx --restart="Always"
```
**Bước 1: kubectl --> api-server --> etcd**

Như đề cập bên trên, kubectl sẽ kết nối tới **kube api-server** và nói với kube api-server rằng tôi muốn tạo một Pod mới có tên là **nginx**.
Lúc này kube api-server đã nhận thông tin yêu cầu, và việc tiếp theo nó sẽ thực hiện ghi thông tin yêu cầu đó vào **etcd**. Bạn có thể hiểu giống như bạn đang order một món ăn và api-server như một người quản lý nhận thông tin order và ghi vào giấy vậy. Khi ghi dữ liệu thành công vào etcd, etcd sẽ trả lời api-server và api-server trả về kết quả cho kubectl rằng pod đã được tạo (Pod created). Tuy nhiên thực tế tại thời điểm này chưa có Pod nào được tạo cả.

**Bước 2: scheduler --> api-server**

Tiếp đến sẽ tới nhiệm vụ của Scheduler. Scheduler sẽ định kỳ hỏi lại api-server rằng "Hey, có yêu cầu gì mới cần thực hiện không?" và api-server sẽ trả lời Scheduler rằng có một request tạo mới một Pod tên là **nginx**, hãy lên lịch thực hiện nó đi. Scheduler lúc này sẽ thực hiện kiểm tra tất cả các node đang sẵn sàng và chọn ra một node tối ưu nhất (ví dụ node1) có thể chạy Pod trên và trả kết quả về cho api-server.

**Bước 3: api-server --> etcd**

Khi nhận được kết quả của Scheduler, api-server sẽ ghi thông tin vào etcd, hiểu rằng Pod nginx sẽ cần được tạo trên node1.

**Bước 4: kubelet --> api-server** 

kubelet định kỳ kết nối với api-server để cập nhật trạng thái node mà nó đang quản lý, trạng thái các Pod đang chạy trên node đó cũng như nhận các yêu cầu mới từ api-server. Hiểu đơn giản thì kubelet trao đổi với api-server 2 câu:  "Hey api-server tao đang chạy 5 pod và tất cả đều đang running ok không có vấn đề gì cả, tao cũng đang sống khỏe"  "Mày có việc gì mới cho tao không?"
Lúc này api-server trả lời "Có, tao cần mày chạy một Pod mới với thông tin như thế này".

**Bước 5: kubelet --> CRI**

kubelet đã nhận thông tin từ api-server, nó làm việc với CRI (*CRI là viết tắt của cụm từ **Container Runtime Interface** đảm nhiệm vai trò duy trì hoạt động của container*) để tạo một Pod mới theo yêu cầu (CRI có thể là Docker hoặc ContainerD)

**Bước 6: controller manager**

Giờ thì Pod đã được tạo xong, tuy nhiên lưu ý rằng trong lệnh tạo Pod ta đã set tham số **--restart="Always"** nghĩa là nếu Pod này vì lý do gì mà bị down thì cần phải tạo một Pod khác thay thế. 
Vậy làm sao để làm được việc đó? Câu trả lời là **controller manager**.

Controller định kỳ sẽ gọi api-server để biết trạng thái hiện tại (current state) và trạng thái mong muốn (desired state). Trạng thái mong muốn là có 1 Pod nginx chạy trên node1, còn hiện tại thì không có Pod nginx nào đang chạy --> Controller Manager sẽ yêu cầu tạo lại Pod nginx để đảm bảo trạng thái hiện tại phải giống với trạng thái mong muốn.

# Lời kết
***Như vậy qua bài này, đặc biệt là ví dụ ở cuối bài thì hy vọng các bạn đã có cái nhìn tương đối tổng quan về K8S và các thức hoạt động của các thành phần của nó.
Trong bài tiếp theo, mình sẽ chia sẻ việc thực hiện cài đặt một hệ thống lab k8s và từ đó sẽ là cơ sở để giới thiệu kỹ hơn về k8s với các ví dụ cụ thể.***

***Hẹn gặp lại các bạn ở phần 2.***