# K8S là gì ?
Kubernetes được thiết kế bởi Google, về ngữ nghĩa thì tên này là tiếng Hy Lạp có nghĩa là tài công.
K8S là một phần mềm mã nguồn mở, có vai trò là một hệ quản trị các Container và các thành phần liên quan. Nó khá tương đương với **Docker Swarm** nhưng chứa nhiều tính năng ưu việt và mạnh mẽ hơn. Nếu bạn đọc được bài viết này chắc hẳn cũng đã có những khái niệm cơ bản về container, docker. (Nếu chưa các bạn có thể xem qua series **Docker Swarm** của mình)

# Khi nào nên dùng K8S
Nếu như bạn đã dùng **Docker Swarm**, **Docker Compose** cho các dự án thực tế của mình thì sẽ thấy khi số lượng container lớn sẽ gặp không ít khó khăn trong việc kiểm soát, monitor cũng như auto scale hệ thống của mình... Khi đó K8S là một giải pháp thay thế tuyệt vời khi có thể kiểm soát linh hoạt và mạnh mẽ khi so sánh với Docker Swarm.

# Kiến trúc và các thành phần của K8S

![image.png](https://images.viblo.asia/c0edc901-8528-40b6-9703-a2a81de9602f.png)

## Trên master node gồm có các thành phần

**Master Server** là máy chính của cluster, tại đây điều khiển cả cụm máy.

**etct** là thành phần cơ bản cần thiết cho Kubernetes, nó lưu trữ các cấu hình chung cho cả cụm máy, etct chạy tại máy master. etct là một dự án nguồn mở (xem tại etcd) nó cung cấp dịch vụ lưu dữ liệu theo cặp key/value

**kube-apiserver** chạy tại máy master, cung cấp các API Restful để các client (như kubectl) tương tác với Kubernetes

**kube-scheduler** chạy tại master, thành phần này giúp lựa chọn Node nào để chạy các ứng dụng căn cứ vào tài nguyên và các thành phần khác sao cho hệ thống ổn định.

**kube-controller** chạy tại master, nó điều khiển trạng thái cluster, tương tác để thực hiện các tác vụ tạo, xóa, cập nhật ... các tài nguyên

## Trên worker node gồm các thành phần

**Kubelet** dịch vụ vụ chạy trên tất cả các máy (Node), nó đảm đương giám sát chạy, dừng, duy trì các ứng dụng chạy trên node của nó.

**Kube-proxy**: cung cấp mạng proxy để các ứng dụng nhận được traffic từ ngoài mạng vào cluster.

**Đương nhiên nếu bạn triển khai các thành phần worker trên master, nó vẫn sẽ hoạt động bình thường**

# Cách hoạt động của K8S
Để thao tác với cụm K8S chúng ta sử dụng kubectl, Vậy kubectl là gì ?
Kubectl là công cụ quản trị Kubernetes thông qua giao diện dòng lệnh, cho phép bạn thực thi các câu lệnh trong Kubernetes cluster. Kubectl sử dụng Kubernetes API để tương tác với Kubernetes cluster.

Để khởi tạo một pod, chúng ta chạy lệnh.

kubectl run myhttpd --generator=run-pod/v1 --image=httpd --restart="Always"

![image.png](https://images.viblo.asia/7452efaa-e068-4ce8-938c-6e62f071d164.png)

## Bước 1: Receive Request
Kubectl sẽ kết nối với API Server và gửi lệnh tạo một pod mới với tên myhttpd, khi đó thông tin này được API Server tiếp nhận và ghi thông tin xuống etcd và etc sẽ phản hồi khi dữ liệu được ghi thành công là 1 pod đã được tạo.
Trên thực tế tại thời điểm response thì chưa có pod nào được tạo mới mà sẽ cần chờ các thành phần phía sau đó thực hiện.
## Bước 2: Select Worker
Scheduler sẽ định kỳ hỏi API Server xem có y/c tạo pod mới hay không, nếu có Scheduler sẽ kiểm tra tất cả các worker và chọn ra một node tối ưu nhất để triển khai pod lên trên đó và thông báo lại cho API Server
## Bước 3: Update Info
Khi nhận được phản hồi từ Scheduler, API Server sẽ ghi nhận pod được tạo trên worker nào và ghi thông tin đó xuống etcd
## Bước 4: Update status
Kubelet sẽ định kỳ kết nối tới API server để cung cấp thông tin các pod do nó quản lý ở worker cũng như tiếp nhận các y/c mới.
## Bước 5: Create container
kubelet đã nhận thông tin từ api-server, nó làm việc với CRI (Container Runtime Interface) để tạo một Pod mới theo yêu cầu (CRI có thể là Docker hoặc ContainerD) và cập nhật thông tin về cho API Server.
## Bước 6: Controller Manager
Đến đây việc tạo pod đã thành công tuy nhiên quá trình xóa bỏ cũng như thay thế pod hiện tại cần một thành phần nữa là Controller Manager
![image.png](https://images.viblo.asia/ad7a348a-1f85-42cd-878f-da436cda69b9.png)
Controller định kỳ sẽ gọi api-server để biết trạng thái hiện tại (current state) và trạng thái mong muốn (desired state). Trạng thái mong muốn là có 1 Pod myhttpd chạy trên worker1, còn hiện tại thì không có Pod myhttpd nào đang chạy --> Controller Manager sẽ yêu cầu tạo lại Pod để đảm bảo trạng thái hiện tại phải giống với trạng thái mong muốn.

# Tổng kết
Trong bài này mình đã cung cấp cho các bạn các khái niệm cơ bản về K8S cũng như vòng đời của 1 pod được tạo ra như thế nào.
Trong phần tiếp theo mình sẽ hướng dẫn các bạn cài đặt một cụm K8S cơ bản gồm các thành phần như trên.

Hẹn các bạn ở [phần tiếp theo](https://viblo.asia/p/k8s-phan-2-cai-dat-mot-cum-cluster-kubernetes-bang-rke-n1j4l0KM4wl) nhé.