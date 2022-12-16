**Xin chào các mọi người. Đây sẽ là bài mở đầu cho một series mới của mình series về Kubernetes. Đây sẽ là Phần 1 - Tổng quan về Kubernetes.**

Để việc đọc và hiểu được Kubernetes bạn sẽ cần có kiến thức cơ bản về container trước. Nếu chưa có kiến thức cơ bản về container bạn có thể xem series về Docker của mình **[DEVOPS] [Docker] Docker là dễ!**.

Tổng quan toàn bộ về Kubernetes sẽ là việc Docker có công nghệ container hóa, một dự án thực tế có thể chạy tới hàng trăm hàng ngàn thậm chí hàng chục ngàn container, lúc này Kubernetes sinh ra với sứ mệnh để quản lý dễ dàng hàng trăm hàng ngàn container cùng lúc. Trong series về Kubernetes của mình sẽ xoay quanh việc hiểu kiến trúc và cách sử dụng, vận hành Kubernetes.
## I. Kubernetes là cái gì
### 1.1. Khái niệm cơ bản
Kubernetes là một nền tảng mã nguồn mở, có thể mở rộng để quản lý các ứng dụng được đóng gói trên container, giúp thuận lợi trong việc cấu hình và tự động hoá việc triển khai ứng dụng mà không cần phải triển khai thủ công các ứng dụng trên mỗi máy chủ. 

Hoặc Kubernetes cho phép chạy các ứng dụng phần mềm của mình trên hàng nghìn nút máy tính như thể tất cả các nút đó là một máy tính khổng lồ. Nó loại bỏ cơ sở hạ tầng cơ bản và bằng cách đó, đơn giản hóa việc phát triển, triển khai và quản lý cho cả nhóm phát triển và hoạt động. Việc triển khai các ứng dụng thông qua Kubernetes luôn đơn giản, cho dù cluster của bạn chỉ chứa một vài hoặc hàng nghìn nút trong số đó, kích thước của Cluster ảnh hưởng gì cả.
 
 Kubernetes là một hệ sinh thái lớn và phát triển nhanh chóng. Các dịch vụ, sự hỗ trợ và công cụ có sẵn rộng rãi.

### 1.2. Lợi ích
Kubernetes đơn giản hóa rất nhiều vấn đề phức tạp trong công tác quản lý container. Và nó thực sự đem lại rất nhiều lợi ích to lớn đối với các quản trị viên như:
* **Đơn giản hóa khai thác ứng dụng**: Vì Kubernetes hiển thị tất cả các nút worker của mình như một nền tảng triển khai duy nhất, các nhà phát triển ứng dụng có thể bắt đầu triển khai các ứng dụng của riêng họ và không cần quan tâm nhiều về các thông số phần cứng phức tạp trên các máy chủ tạo nên cluster. 
* **Tối ưu hóa phần cứng**: Kubernetes sẽ tự động chọn nút thích hợp nhất để chạy ứng dụng của bạn dựa trên mô tả về các yêu cầu tài nguyên của ứng dụng với các tài nguyên có sẵn trên mỗi nút. Nếu triển khai thủ công bạn sẽ chủ động triển khai ứng dụng trên một máy cố định nào đó, điều này không tối ưu hóa được phần cứng trong suốt quá trình phát triển ứng dụng. Nhưng Kubernetes sẽ tự động phân tích mức độ yêu cầu tài nguyên của mỗi giai đoạn và cho ứng dụng chạy trên máy có lượng tài nguyên đáp ứng, vì vậy ở các thời điểm phát triển khác nhau ứng dụng có thể chạy trên các nút khác nhau.
* **Kiểm tra hóa và khắc phục lỗi**: Kubernetes giám sát các thành phần ứng dụng và các nút chạy ứng dụng trên đó và tự động xử lý cho phép ứng dụng chạy trên một nút khác nếu nút đó bị lỗi. Trong thực tế để di chuyển một ứng dụng từ máy này sang máy khác là rất vất vả và mất rất nhiều thời gian. Nhưng Kubernetes thực hiện điều này một cách tự động và cực kỳ nhanh chóng. Thời gian downtime của ứng dụng gần như bằng 0.
* **Tự động hóa mở rộng**: Kubernetes giám sát lưu lượng truy cập vào ứng dụng. Và có thể điều chỉnh số lượng phiên bản đang chạy của mỗi ứng dụng. Kubernetes có thể tự động điều chỉnh kích thước toàn bộ cluster lên hoặc xuống dựa trên nhu cầu của các ứng dụng đã triển khai. Đây là một điểm mạnh về khả năng mở rộng của Kubernetes so với Docker swarm.
* **Đơn giản hóa phát triển ứng dụng**: Kubernetes hỗ trợ phát hiện lỗi của ứng dụng. Điều này đồng nghĩa với việc giảm rủi ro khi đưa ra ứng dụng và giảm thời khắc phục lỗi giúp việc phát triển ứng dụng giảm bớt công việc áp lực của nhà phát triển ứng dụng, tăng độ tin tưởng của người dùng với ứng dụng và nhà phát triển. Thông thường, ứng dụng chỉ tra cứu một số biến môi trường nhất định hoặc thực hiện tra cứu DNS nhưng Kubernetes hỗ trợ ứng dụng có thể truy vấn trực tiếp máy chủ Kubernetes API để lấy một số thông tin khác.

### 1.3. Vì sao cần dùng Kubernetes
![1-Page-4.png](https://images.viblo.asia/99228fef-be1e-4e01-9020-fdd5c19d768c.png)
Để hiểu rõ hơn lý do dùng Kubernetes là cần thiết thì ta sẽ xem các giai đoạn triển khai một ứng dụng từ trước tới nay.

**Giai đoạn triển khai theo cách truyền thống**: \
Ban đầu, các ứng dụng được chạy trên các máy chủ vật lý. Không có cách nào để xác định ranh giới tài nguyên cho các ứng dụng trong máy chủ vật lý và điều này gây ra sự cố phân bổ tài nguyên. Ví dụ, nếu nhiều ứng dụng cùng chạy trên một máy chủ vật lý, có thể có những trường hợp một ứng dụng sẽ chiếm phần lớn tài nguyên hơn và kết quả là các ứng dụng khác sẽ hoạt động kém đi. Một giải pháp cho điều này sẽ là chạy từng ứng dụng trên một máy chủ vật lý khác nhau. Nhưng giải pháp này không tối ưu vì tài nguyên không được sử dụng đúng mức và rất tốn kém cho các tổ chức để có thể duy trì nhiều máy chủ vật lý như vậy.

**Giai đoạn triển khai ảo hóa**: \
Giải pháp ảo hóa đã được giới thiệu. Nó cho phép bạn chạy nhiều Máy ảo (VM) trên CPU của một máy chủ vật lý. Ảo hóa cho phép các ứng dụng được cô lập giữa các VM và cung cấp mức độ bảo mật vì thông tin của một ứng dụng không thể được truy cập tự do bởi một ứng dụng khác.\
Ảo hóa cho phép sử dụng tốt hơn các tài nguyên trong một máy chủ vật lý và cho phép khả năng mở rộng tốt hơn vì một ứng dụng có thể được thêm hoặc cập nhật dễ dàng, giảm chi phí phần cứng và hơn thế nữa. Với ảo hóa, bạn có thể có một tập hợp các tài nguyên vật lý dưới dạng một cụm các máy ảo sẵn dùng. Thời điểm này giải pháp ảo hóa thực sự đã thay thế cho giai đoạn trước đó vì nó khắc phục được rất nhiều hạn chế của giai đoạn triển khai theo cách truyền thống.

**Giai đoạn triển khai container**: \
Container hóa đem lại một luồng gió cực kỳ mát cho triển khai ứng dụng. Các container tương tự như VM, nhưng chúng có tính cô lập để chia sẻ Hệ điều hành (HĐH) giữa các ứng dụng. Do đó, container được coi là nhẹ (lightweight). Tương tự như VM, một container có hệ thống tệp (filesystem), CPU, bộ nhớ, process space, v.v. Khi chúng được tách rời khỏi cơ sở hạ tầng bên dưới, chúng có thể khả chuyển (portable) trên cloud hoặc các bản phân phối Hệ điều hành.\
Và hơn thế nữa container có thêm nhiều lợi ích và tối ưu hóa quy trình triển khai ứng dụng:
* Gia tăng tính dễ dàng và hiệu quả của việc tạo các container image so với việc sử dụng VM image.
* Phát triển, tích hợp và triển khai liên tục: cung cấp khả năng build và triển khai container image thường xuyên và đáng tin cậy với việc rollbacks dễ dàng, nhanh chóng.
* Khả năng giám sát không chỉ hiển thị thông tin và các metric ở mức Hệ điều hành, mà còn cả mức application health.
* Tính nhất quán về môi trường trong suốt quá trình phát triển, testing và trong production.
* Tính khả chuyển trên cloud và các bản phân phối HĐH: Chạy trên Ubuntu, RHEL, CoreOS, on-premises, Google Kubernetes Engine và bất kì nơi nào khác.
* Quản lý tập trung ứng dụng: Tăng mức độ trừu tượng từ việc chạy một Hệ điều hành trên phần cứng ảo hóa sang chạy một ứng dụng trên một HĐH bằng logical resources.
* Các micro-services phân tán, elastic: ứng dụng được phân tách thành các phần nhỏ hơn, độc lập và thể được triển khai và quản lý một cách linh hoạt - chứ không phải một app nguyên khối (monolithic).
* Tối ưu sử dụng tài nguyên.

Vì lợi ích quá to lớn của container đem lại nên hiện nay việc sử dụng container ngày càng rộng rãi. Và việc sử dụng các công cụ quản lý các container là điều tất yếu, khi đó Kubernetes được coi là chân ái.
## II. Kiến trúc Kubernetes
### 2.1. Kiến trúc tổng quan một cluster
**Kiến trúc cluster cơ bản**
![1-Page-5.drawio.png](https://images.viblo.asia/1bed4543-6691-4c8c-bb45-8fb0b54bf5c2.png)
Kubernetes gom nhiều node lại thành một cluster, tối thiểu sẽ có một node cùng một control plane. Hoặc có thể hiểu là worker node và master node.\
Control plane có: APIserver, control manager, etcd, scheduler, cloud control manager (tùy chọn).\
Node có: kubelet, kube proxy, container runtime.

Control plane chịu trách nhiệm đưa ra hầu hết các quyết định và hoạt động như một bộ não của một cluster.
Node chịu trách nhiệm về việc thực thi, chạy các ứng dụng. Chúng được quản lý bởi Control plane.

Một cluster có thể bao gồm nhiều worker node và một control plane. Một worker node có thể bao gồm nhiều service. Một service có thể bao gồm nhiều pod. Một pod có thể bao gồm nhiều container runtime. Và một control plane có thể bao gồm nhiều master node.

Ngoài ra, các Cloud provider phổ biến như AWS, Azure, Digital Ocean, Google Cloud,...

**Kiến trúc cluster đặc biệt minikube**\
![image.png](https://images.viblo.asia/e57bab80-cbb4-468c-bec4-94efc983a837.png)\
Kiến trúc của minikube khá đặc biệt khi toàn bộ control plane và node đều nằm trên cùng một node. Lúc này node vừa đóng vai trò làm worker node vừa đóng vai trò làm master node. Minikube chỉ chạy trên môi trường local.

Trong series này mình sẽ dùng minikube để làm có zú vị trong các phần sau.

### 2.2. Các thành phần trong cluster cơ bản
**Các thành phần Master node**
1. **kube apiserver**: kuber apiserver hoạt động như một trung tâm giao tiếp. Giao tiếp với các node bên ngoài thông qua CLI hoặc giao diện người dùng UI. Đồng thời các thành phần trong control plane giao tiếp với nhau cũng sẽ đều thông qua apiserver.
2. **etcd**: etcd là một kho lưu trữ key-value phân tán hoạt động như một nguồn đáng tin cậy duy nhất về cluster. Nó lưu trữ dữ liệu về cấu hình và các thông tin về trạng thái cluster. Thông tin trong etcd thường được định dạng bằng YAML mà con người có thể đọc được.
3. **kube controller manager**: kube controller manager chịu trách nhiệm kiểm soát trạng thái của cluster như: thông báo và phản hồi khi các nút gặp sự cố, tạo tài khoản và API kết nối, giám sát các đối tượng,...
4. **kube scheduler**: kube scheduler giám sát tài nguyên của cluster và quyết định sẽ tạo pod trên worker node nào khi bắt đầu khởi tạo dựa trên các yêu cầu được đưa ra. Để đảm bảo không có node nào bị quá tải.
5. **cloud controller manager**: cloud controller manage cho phép kết nối cluster với API của nhà cung cấp dịch vụ đám mây như GKE/EKS. Bằng cách này có thể thực hiện các thao tác quản lý trên môi trường cloud.

**Các thành phần Worker node**
1. **kuberlet**: kuberlet hoạt động trên worker node  thực hiện giao tiếp với control plane qua apiserver để nhận các chỉ thị. Nó cũng tương tác thêm với etcd để cập nhật trạng thái. Ngoài ra kuberlet cũng tương tác với các pod trong cùng worker node.
2. **kube proxy**: kube proxy xử lý các yêu cầu về mạng như định tuyến, forwarding, load balancer
3. **container runtime**: là các container dùng để chạy các ứng dụng. Container này có thể là containerd (Docker cung cấp), rkt (CoreOS cung cấp), cri-o

Trong cluster cơ bản bao gồm các thành phần tiêu chuẩn. Với mỗi kiến trức sẽ có nhưng thành phần bắt buộc và thành phần tùy chọn khác nhau.

***Cám ơn mọi người đã đọc bài viết của mình và khi đọc xong xin cho mình ý kiến phản hồi. Bài viết sau có hay hơn chính là nhờ vào các ý kiến phản hồi của các bạn. Nếu thấy bài viết có ích thì cho mình 1 upvote. Mình xin cám ơn.***