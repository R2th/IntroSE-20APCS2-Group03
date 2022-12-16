Một trong những mục đích chính của việc sử dụng Kubernetes là nó lưu trữ các ứng dụng trên một cụm nhiều node máy chủ với các tính năng phân bổ tài nguyên cũng như cân bằng tải phức tạp. Điều này đảm bảo tính sẵn sàng cao, ứng dụng có thể hoạt động tốt ngay cả khi một số máy chủ bị lỗi. Đối với môi trường production, kiến trúc triển khai một cụm máy chủ Kubernetes là điều cần thiết.

Tuy nhiên, trong quá trình thử nghiệm và phát triển, có rất nhiều IT admin hay  developer muốn chạy Kubernetes cục bộ trên PC hoặc laptop. Một môi trường Kubernetes trên local có thể mang lại rất nhiều lợi ích như giúp các developer test code mới một cách nhanh mà không cần phải triển khai nó lên hẳn một cụm Kubernetes đầy đủ như cho môi trường production. Local Kubernetes cũng là một giải pháp tuyệt vời cho những người mới làm quen với Kubernetes, giảm bớt đi sự phức tạp cũng như chi phí tốn kém của việc triển khai nhiều máy chủ.

![](https://images.viblo.asia/0f9bc415-c7b5-4c8b-a22a-f413fe4cd8d0.jpeg)

Để đáp ứng nhu cầu này, có rất nhiều giải pháp đã được giới thiệu, đó là những bản phân phối Kubernetes có sẵn có thể được sử dụng để cài đặt Kubernetes ở local. Vậy, chúng ta nên lựa chọn giải pháp nào đây?. Qua bài viết này, mình hi vọng có thể giới thiệu đến các bạn một số giải pháp mà mình biết cũng như những đánh giá sơ bộ về các giải pháp này để các bạn có cái nhìn tổng quan hơn và đưa ra những lựa chọn phù hợp nhé.
# Minikube
![](https://images.viblo.asia/729367ce-a2ed-4371-a542-ebbdb5102ed0.png)
Minikube là bản phân phối Kubernetes lâu đời nhất và phổ biến nhất cho các môi trường local. Minikube là một bộ cài đặt Kubernetes bằng cách tạo ra một máy ảo trên máy tính của bạn và triển khai một cluster đơn giản bên trong máy ảo đó chỉ bao gồm một Node. Minikube có cho Linux, macOS, và Windows. 

Cài đặt Minikube khá đơn giản, vì trình cài đặt trên  Windows, Linux và macOS tự động hóa hầu hết quá trình, bao gồm cả setup VM. Tuy nhiên, trước tiên, bạn phải đảm bảo rằng đã cài đặt một VM platform, chẳng hạn như Hyper-V, VirtualBox hoặc KVM. Sau khi Minkube được cài đặt, bạn có thể sử dụng kubectl , công cụ dòng lệnh Kubernetes tiêu chuẩn, để tương tác với cụm.

- **Ưu điểm:** Nhẹ và dễ sử dụng, hỗ trợ nhiều nền tảng, có một loạt các tính năng rất mạnh mẽ để sử dụng và có nhiều tài liệu bằng văn bản. 
- **Nhược điểm:** Hạn chế chính của Minikube là cụm local chỉ có thể bao gồm 1 node, và do đó nó sẽ không phải là mô phỏng tốt của cụm Kubernetes nhiều node ở môi trường production. Thời gian khởi động của Minikube khá chậm (3–5 phút).
# MicroK8s
![](https://images.viblo.asia/de988a2b-fa5d-4ca0-b6f3-8461d1b6307b.png)
MicroK8s là cách Canonical thâm nhập vào thị trường Kubernetes. Nó là một bản phân phối Kubernetes được thiết kế để triển khai nhanh chóng và đơn giản, điều này làm cho nó trở thành một lựa chọn tốt để chạy Kubernetes ở local. Việc cài đặt MicroK8s rất đơn giản trên bất kỳ bản phân phối Linux nào hỗ trợ gói snap - một khung đóng gói ứng dụng mà Canonical đã tạo ra để sử dụng chủ yếu trên Ubuntu, bản phân phối Linux của công ty. Trên Windows hay macOS, việc cài đặt cũng không hề khó, vì trình cài đặt MicroK8s cho các hệ thống này sẽ tạo máy ảo dựa trên Ubuntu, sau đó sử dụng các gói snap để cài đặt MicroK8s trên chúng.

Không giống như Minikube, chúng ta có thể sử dụng MicroK8s để tạo các cụm đa node. Nếu MicroK8s chạy trên Linux, nó cũng mang lại lợi thế là không yêu cầu máy ảo. Trên Windows và macOS, MicroK8s sử dụng một VM framework là Multipass để tạo các máy ảo cho cụm Kubernetes.

- **Ưu điểm:** MicroK8s rất dễ cài đặt, nâng cấp, gỡ bỏ và có thể tạo các cụm đa node. 
- **Nhược điểm:** Có lẽ nhược điểm lớn nhất của MicroK8s là nó sẽ khó cài đặt trên các bản phân phối Linux không hỗ trợ gói snap.
# K3s
![](https://images.viblo.asia/184fb11f-4a65-4ca3-9e17-9f270f999689.jpg)
K3s là một giải pháp triển khai slim K8s, dung lượng nhỏ và tất cả đều ở dạng nhị phân dưới 100MB. K3s được phát triển bởi Rancher Labs, với mong muốn tạo ra một bản triển khai Kubernetes nhẹ, dễ vận hành và có thể chạy trên cơ sở hạ tầng x86 và ARM mà không cần sử dụng bộ nhớ hơn 512 MB. Nó cũng là một dự án CNCF.

Việc cài đặt K3s cũng rất dễ dàng, K3s cung cấp sẵn các script install để bạn có thể triển khai nhanh một cụm Kubernetes với các tuỳ chọn mặc định. K3s hoạt động trên hầu hết các hệ thống Linux. Trên Windows hay macOS, bạn sẽ cần đến một VM platform và tạo trước các VM thực hiện install K3s trên các VM này, K3s sẽ không tạo trc VM cho bạn.

K3s có thể chạy single node, cũng có thể chạy một cụm đa node. K3s yêu cầu nhiều công việc thủ công hơn để thiết lập và cung cấp so với MicroK8s và Minikube. Tuy nhiên, không chỉ với mục đích thử nghiệm và và phát triển, nó còn được thiết kế để hướng tới sử dụng cho môi trường production. Vì vậy, K3s cung cấp môi trường gần với với môi trường production nhất trên PC hoặc máy tính xách tay của bạn.

- **Ưu điểm:** K3s cũng hỗ trợ cụm đa node, rất nhẹ, dễ cài đặt, gỡ bỏ.
- **Nhược điểm:** K3s là phiên bản thu nhỏ của Kubernetes nên nó có thể sẽ ít tính năng hơn nhiều so với các lựa chọn thay thế khác (do giảm kích thước nên K3s loại bỏ một số tính năng nhất định và sử dụng các thành phần nhẹ như sqlite3 thay vì etcd3, ...).
# Kind
![](https://images.viblo.asia/91aaa8c9-17f0-464a-8495-757723ddd977.png)
Một giải pháp nữa mình muốn nhắc đến là Kind. Kind (Kubernetes-in-Docker), đúng như cái tên của nó - chạy các cụm Kubernetes trong vùng chứa Docker. Đây là công cụ chính thức được các nhà bảo trì Kubernetes sử dụng để kiểm tra sự phù hợp của phiên bản Kubernetes v1.11 +. Nó hỗ trợ các cụm đa node cũng như các cụm HA. Bởi vì nó chạy K8s trong Docker, loại có thể chạy trên Windows, Mac và Linux.
Bạn chỉ cần cài đặt Docker, cài đặt Kind và sau đó bạn có thể tạo cụm rất nhanh, đơn giản và có thể được thực hiện thông qua tệp YAML.

- **Ưu điểm:** Hoạt động rất tốt với Docker, có tùy chọn tạo một cụm với nhiều nút và có thời gian khởi động ngắn hơn nhiều so với Minikube.
- **Nhược điểm:** Ít tính năng hơn minikube. Thêm nữa là mình thấy Kind vẫn chưa có bản phát hành ổn định, nên khi chuyển đổi sang sử dụng Kind có lẽ cũng nên cân nhắc thêm.

# Tạm kết
Tất cả các giải pháp được thảo luận trong bài viết này đều có ưu và nhược điểm riêng của chúng, việc lựa chọn sử dụng giải pháp nào sẽ phụ thuộc vào trường hợp sử dụng, mục đích sử dụng chính sẽ là gì.
Với cá nhân mình, ở thời điểm bắt đầu làm quen với Kubernetes, mình đã sử dụng Minikube bởi nó rất dễ sử dụng và đầy đủ tính năng. Hiện tại thì mình đang sử dụng nhiều nhất là K3s bởi tốc độ, nó nhỏ và nhanh, tuy còn có mặt hạn chế về tính năng nhưng lại vừa đủ dùng cho nhu cầu của mình lúc này rồi! :D