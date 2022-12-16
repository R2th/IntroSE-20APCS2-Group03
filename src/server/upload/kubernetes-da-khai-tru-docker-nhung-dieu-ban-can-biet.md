### MIẾNG TRẦU, À KHÔNG, CONTAINER LÀ ĐẦU CÂU CHUYỆN

Thông thường, khi nhắc đến container, người ta nghĩ ngay đến Docker và Kubernetes. Docker đã trở nên quá quen thuộc đối với những ai thường xuyên build, run containers, và Kubernetes cũng phổ biến chẳng kém khi nhắc tới việc quản lý, điều phối (managing and orchestrating) chúng.

Kể từ phiên bản [v1.24](https://kubernetes.io/blog/2022/05/03/kubernetes-1-24-release-announcement/), K8s không còn hỗ trợ Docker như là một container runtime nữa. Điều này khi mới nghe có vẻ shock, nhưng thật sự mọi chuyện không tệ đến nỗi vậy.

Mình muốn nhân cơ hội giải thích ý nghĩa của sự thay đổi này, liệu người dùng Kubernetes cần làm gì để thích ứng với những phiên bản mới kể từ [v1.24]((https://kubernetes.io/blog/2022/05/03/kubernetes-1-24-release-announcement/)) ?

### ĐIỀU GÌ THỰC SỰ ĐANG DIỄN RA Ở ĐÂY?

Kubernetes đã sẽ không còn sử dụng Docker như một container runtime. Container runtime là một phần mềm chịu trách nhiệm khởi tạo và chạy container trên máy chủ theo mệnh lệnh của Kubernetes. Có khá nhiều option cho bạn lựa chọn để làm container runtime.
* Low-level container runtime: runC, crun, **containerd**
* High-level container runtime: Docker, CRI-O, Windows Container, Hyper-V Container, ...

Trong đó, Docker vẫn là sự lựa chọn phổ biến nhất.

Tuy nhiên, kể từ thời điểm phiên bản K8s v1.24 xuất hiện, mọi chuyện sẽ khác. Chúng ta sẽ không thể sử dụng Docker như một container runtime nữa (nhưng vẫn có thể dùng vào việc khác).

### TẠI SAO KUBERNETES LẠI LOẠI BỎ CONTAINER RUNTIME DOCKER ?

Trước giờ Kubernetes vẫn hỗ trợ Docker ngon lành, sao giờ họ lại bỏ?

Sự thật là kubernetes có thể hoạt động với tất cả các container runtime, miễn là chúng đáp ứng [CRI](https://kubernetes.io/blog/2016/12/container-runtime-interface-cri-in-kubernetes/) (Container Runtime Interface), về cơ bản [CRI](https://kubernetes.io/blog/2016/12/container-runtime-interface-cri-in-kubernetes/) là tập hợp các tiêu chuẩn để Kubernetes có thể giao tiếp với container runtime.

Mọi container runtime software, kể cả software bạn tự viết, nếu implement [CRI](https://kubernetes.io/blog/2016/12/container-runtime-interface-cri-in-kubernetes/) đều hoạt động được với Kubernetes.

**Docker không đáp ứng được CRI**. Ngày trước, khi không có quá nhiều sự lựa chọn cho container runtime, Kubernetes đã chấp nhận tạo thêm một layer chức năng mới (Dockershim) để giao tiếp được với Docker.

Tuy nhiên, như đã nói ở trên, khi đã có quá nhiều container runtime khác, Kubernetes không cần thiết phải duy trì đặc quyền này cho Docker.

Để hiểu rõ hơn, ta có thể đào sâu thêm một chút. 

Docker được xây dựng dựa trên container runtime **containerd**, với giao diện đa tính năng, dễ sử dụng hơn. Đây cũng là lý do Docker được xếp vào loại high-level container runtime.

Và khi tương tác trên Kubernetes, Docker thực chất chỉ là trung gian trong cuộc trò chuyện giữa Kubernetes với containerd. 
![](https://images.viblo.asia/b938f919-b225-4771-a271-863c07da5f14.png)


Trong khi Kubernetes có thể trực tiếp làm việc với containerd (do containerd đáp ứng CRI), Docker không còn cần thiết nữa.

Hơi đâu đi hỗ trợ Docker, để rồi phải duy trì thêm tính năng Dockershim, đúng không? Vậy nên đội ngũ phát triển Kubernetes đã lên kế hoạch loại bỏ Docker ra khỏi danh sách supported container runtime, và mãi đến phiên bản v1.24 gần đây họ mới làm được, bằng cách **remove Dockershim**.

Tuy nhiên, ta vẫn có thể sử dụng Docker cho những vai trò khác trong hệ sinh thái của kubernetes. Docker vẫn là một công cụ mạnh mẽ để build image, chạy container local (với docker run command), cũng như quản trị image trên registry (với docker pull, push).

### CHÚNG TA, NHỮNG NGƯỜI QUẢN TRỊ KUBERNETES CẦN LÀM GÌ?
Nếu bạn đang sử dụng Docker trên k8s, bạn sẽ cần thay thế Docker với các ứng cử viên khác: containerd, CRI-O hay Mirantis Container Runtime. Thay thế trên tất cả các kubernetes node. Có thể ngay từ bây giờ, bạn nên tạo các node mới không sử dụng Docker.

Ngoài ra thì bạn chẳng cần quan tâm gì khác! 

Hy vọng rằng kiến thức này bổ ích, cảm ơn mọi người đã dành thời gian theo dõi!!

### Nguồn tham khảo
https://acloudguru.com/blog/engineering/kubernetes-is-deprecating-docker-what-you-need-to-know

https://www.aquasec.com/cloud-native-academy/container-security/container-runtime/