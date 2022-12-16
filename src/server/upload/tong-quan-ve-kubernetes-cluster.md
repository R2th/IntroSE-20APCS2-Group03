Mình lại chào các bạn đã quay trở lại với [Series học Kubernetes](https://viblo.asia/s/hoc-kubernetes-tu-co-ban-den-gan-nang-cao-aAY4qQ6w4Pw) 😊😊

Ở [bài trước](https://viblo.asia/p/kubernetes-gui-loi-chao-W13VM2A04Y7) chúng ta đã xem qua tổng quát những thứ mà Kubernetes mang lại, những vấn đề mà nó giải quyết, và những thứ ta sẽ cùng nhau tìm hiểu thông qua cả series này.

Ở bài này chúng ta sẽ cùng bắt đầu đi vào tìm hiểu về có những gì trên 1 Kubernetes Cluster nhé.

Mình đã khá là cân nhắc liệu có nên gộp bài này vào bài đầu tiên [Kubernetes gửi lời chào](https://viblo.asia/p/kubernetes-gui-loi-chao-W13VM2A04Y7) luôn không, vì nó cũng mang tính giới thiệu, tổng quan. Nhưng về sau thấy kiến thức ở bài này nó sẽ hơi đi sâu vào kĩ thuật nên có thể sẽ dài 1 chút nên mình tách ra làm 1 bài riêng.

Ta cùng lên thuyền thôi nào 🚅🚅🚅
# Cluster
K8S Cluster là 1 tập hợp nhiều node được kết nối với nhau, node ở đây bạn có thể hiểu nó là 1 máy, 1 VPS, hay 1 server cũng đc.

Tất cả mọi thứ sau này ta làm việc sẽ đều xảy ra trong K8S Cluster, tất tần tật. K8S làm nhiệm vụ điều phối tất cả mọi thứ xảy ra bên trong cluster:
- start, stop, restart, kill các container của bạn
- quản lý volume
- phân quyền
- đưa ra quyết định khi nào cần scale app của bạn lên
- load balance
- ....

Thường ta sẽ dùng các dịch vụ cloud để chạy K8S Cluster cho nhàn, họ sẽ thay chúng ta chạy cluster, ta chỉ việc dùng nó và deploy app của chúng ta thôi, chứ ít khi ta tự chạy hẳn cả 1 cluster, vì khá là tốn công, và đi kèm là vô vàn vấn đề cần phải quản lý. Nhưng mình cũng thấy nhiều công ty (to), do yêu cầu riêng mà họ tự chạy K8S Cluster và tự quản lý nó. Và ở trong ta sẽ học trực tiếp trên K8S Cluster của mình, cùi cùi nhưng hi vọng đủ cho các bạn dùng, ta sẽ nói ở bài sau nhé ;).
# Trong K8S Cluster có gì
Ta sẽ đi từ bên ngoài vào tận trong cùng của cluster để xem 1 cluster thì có những gì nhé. (phần này mình sẽ dùng 1 số hình ảnh lấy trực tiếp từ trang chủ k8s)

## Node
Như ở trên mình đã nói, thì 1 cluster là 1 tập hợp của nhiều node và 1 thứ vô hình gọi là Control Plane, mô tả như hình dưới

![Screenshot 2022-10-02 at 5.50.47 PM.png](https://images.viblo.asia/a5569a72-d38b-4d50-92b5-5d13b136d28e.png)

Control Plane giống như bộ não của cả cluster, nó làm nhiệm vụ quản lý cả cluster, chịu trách nhiệm deploy app của các bạn, scale, giữ app của các bạn ở trạng thái ổn định nhất có thể,...

1 Node như trong ảnh thì có thể là 1 máy ảo VPS hay là 1 máy tính vật lý (PC bạn đang dùng chẳng hạn). Mỗi node làm nhiệm vụ như worker bên trong cluster vậy, kiểu như anh công nhân, bên trên - Control Plane bảo gì thì làm nấy. 💪

Bên trong mỗi node thì ta có 1 thanh niên tên là Kubelet, kiểu như trưởng phòng, chịu trách nhiệm giao tiếp với bên Control Plan thông qua K8S API, và bởi vì K8S chuyên dành để deploy containerized app (app chạy trong container), do vậy ta sẽ cần phải có 1 thứ gọi là [Container Runtime](https://kubernetes.io/docs/setup/production-environment/container-runtimes/), ủa cái này là cái gì vậy nhỉ có phải là Docker như trong ảnh kia không, vì nãy giờ trình bày hết mấy thứ trong ảnh, thấy còn mỗi Docker 🤔🤔🤔 ???

Đúng rồi đó các bạn, Container Runtime là thứ để chạy container, đó có thể là Docker hoặc một cái khác. Và ở thời điểm hiện 10/2022 thì K8S đã chuyển qua dùng [containerd](https://github.com/containerd/containerd) làm container runtime rồi, trước đó thì K8S đã dùng Docker 1 khoảng thời gian dài

Khi ta deploy app trên K8S cluster, tức là ta nói với Control Plane là triển khai app trên các node của cluster

> Cluster chạy cho production nên có tối thiểu 3 nodes để đảm bảo tính high-availability

À, có bạn sẽ thắc mắc là vậy cái Control Plane kia thì chạy ở đâu??? thì nó sẽ được chạy trên 1 trong các node, và node đó ta gọi là master node
## Bên trong mỗi node
Khi deploy, app của chúng ta sẽ được chạy trên các node của cluster, bên trong 1 thực thể gọi là Pod (đọc là "pọt") (hình màu đỏ bên dưới). Pod là thực thể nhỏ nhất trên cluster mà ta có thể deploy được, và hầu như sau khi ta deploy thì Pod là thứ ta theo dõi nhiều nhất

![Screenshot 2022-10-02 at 6.24.51 PM.png](https://images.viblo.asia/72c67e02-0467-43d7-afe7-d362b944b1cb.png)

1 node có thể chạy nhiều Pod và bên trong mỗi pod thì ta có thể chạy 1 hoặc nhiều container:

![Screenshot 2022-10-02 at 6.27.34 PM.png](https://images.viblo.asia/914899bd-a9c6-422a-8499-0bb30bd0efc2.png)

Trong Pod còn có cả volume ta mount vào đó nữa và để xác định địa chỉ cho mỗi Pod thì nó sẽ được gán 1 IP, gọi là Cluster IP, chi tiết về Pod ta sẽ nói sâu hơn vào bài sau nhé
# Kết bài
Ủa, bài gì mà ngắn vậy?? 😂😂

Mình cố gắng giữ mỗi bài thật ngắn để các bạn có thể hấp thụ dễ hơn, vì K8S nó có rất nhiều thứ, lan man sợ nó lại hơi xa vời. Qua bài này mong rằng các bạn đã có cái nhìn tổng quát về K8S Cluster và những thứ cơ bản của nó. 

Ở bài tiếp theo ta sẽ cùng nhau tìm hiểu tiếp về K8S và cũng là bài thực hành đầu tiên. ;)

Hẹn gặp lại các bạn ở bài kế tiếp nhé 👋👋