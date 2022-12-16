# Mở đầu
Như chúng ta đã biết, Kubernetes cung cấp cho chúng ta một tài nguyên cơ bản là Pod. Một Pod là đơn vị nhỏ nhất có thể triển khai trong Kubernetes, thực chất nó đại diện cho một nhóm gồm một hoặc nhiều ứng dụng containers và một số tài nguyên được chia sẻ cho các containers đó, được sử dụng để lưu trữ phiên bản chạy của ứng dụng của bạn.

Tuy nhiên, trong thực tế, khi triển khai một ứng dụng trên Kubernetes, chúng ta không chỉ xoay quanh kiến trúc của một Pod. Thay vào đó, bạn sẽ nhận thấy, hầu như mọi cấu trúc triển khai hay biểu đồ Helm chart mà bạn sử dụng sẽ cung cấp cho bạn một Deployment, StatefulSet hoặc DaemonSet. Đây là những tài nguyên có kiến trúc cấp cao hơn được Kubernetes cung cấp để giúp bạn có thể triển khai các Pod. Các Deployments, StatefulSets và DaemonSets này cho phép bạn scale up các Pod, roll out image mới hay cấu hình mới, v.v.. Vậy sự khác nhau giữa những tài nguyên này là gì và bạn nên chọn tài nguyên nào để sử dụng trong một tình huống nhất định? Chúng ta hãy cùng tìm hiểu vấn đề thông qua bài viết này nhé!

# Deployments
Deployment là tài nguyên Kubernetes dễ dàng nhất và được sử dụng nhiều nhất để triển khai ứng dụng của bạn. Deployment trong Kubernetes cho phép quản lý vòng đời của các Pod và một Resource liên quan gọi là ReplicaSet. Deployment chứa đặc tả (specification) cho một Pod và các thông tin thêm, như số lượng Pod để chạy. ReplicaSet được tạo khi Deployment được tạo hoặc được chỉnh sửa và ReplicaSet thật sự được dùng như định nghĩa để tạo Pod. 

Ví dụ: Nếu bạn tạo một Deployment với 1 bản sao (1 pod), nó sẽ kiểm tra rằng trạng thái mong muốn của ReplicaSet là 1 và trạng thái hiện tại là 0, vì vậy nó sẽ tạo một ReplicaSet, ReplicaSet này sẽ tiếp tục tạo nhóm.

![](https://images.viblo.asia/f77bb8f5-deb7-4d37-baf7-48f606359409.png)

Nếu bạn cần chạy một ứng dụng stateless mà nó sẽ chạy liên tục và việc mở rộng quy mô (scaling up) chỉ đơn giản là bạn cần tăng số lượng bản sao của pod, thì Deployment là cách phổ biến nhất và hoàn toàn phù hợp, rất hiệu quả với ứng dụng của bạn. 

Kubernetes sẽ cung cấp một cân bằng tải ở phía trước (thông qua tài nguyên Service) để định tuyến lưu lượng truy cập đến ứng dụng. Bản thân ứng dụng giữ tất cả trạng thái trong cơ sở dữ liệu quan hệ đằng sau nó, vì vậy nếu bạn muốn mở rộng quy mô, bạn chỉ cần yêu cầu một số lượng bản sao lớn hơn. Các Pod mới này khởi động với cùng một bộ biến môi trường và cùng một ConfigMaps được gắn vào, cho phép chúng giao tiếp với cơ sở dữ liệu giống như Pod đầu tiên.

![](https://images.viblo.asia/7fbb666e-422a-45d5-8ea5-41a9363cb8db.png)

Tuy việc sử dụng Deployment thường được sử dụng cho các ứng dụng stateless, bạn cũng có thể lưu trạng thái triển khai bằng cách gắn cho nó một [Persistent Volume](https://viblo.asia/p/kubernetes-storage-hoc-cach-su-dung-persistent-volume-pv-va-persistent-volume-claim-pvc-Qpmleyynlrd) và làm cho nó trở thành stateful. Nhưng lưu ý là ở đây tất cả các Pod của bạn sẽ cùng chia sẻ một Volume và dữ liệu của chúng cũng sẽ tương tự nhau.

![](https://images.viblo.asia/208b1e65-b61c-40a4-a468-86d99f3e177d.png)

# StatefulSets
StatefulSets là một tài nguyên Kubernetes được sử dụng để quản lý các ứng dụng stateful, nó quản lý việc triển khai (deployment) và mở rộng (scaling) của một nhóm các Pod, đồng thời nó cũng cung cấp sự đảm bảo về thứ tự và tính duy nhất của các Pod này. 

StatefulSet cũng là một Controller nhưng không giống như Deployments, nó không tạo ReplicaSet mà chính nó tạo Pod với quy ước đặt tên duy nhất. Ví dụ: Nếu bạn tạo StatefulSet với bộ đếm tên (counter), nó sẽ tạo một pod với tên *counter-0* và cho nhiều bản sao của một statefulset, tên của chúng sẽ tăng lên như *counter-0, counter-1, counter-2,* v.v.

![](https://images.viblo.asia/c5fd80d8-c813-4554-bbf2-92f48ceb8679.png)

Mỗi bản sao của StatefulSet sẽ có trạng thái riêng và nếu sử dụng PersistentVolume thì mỗi Pod sẽ tạo PVC (Persistent Volume Claim) riêng. Vì vậy, một StatefulSet có 3 bản sao sẽ tạo ra 3 Pod, mỗi Pod có Volume riêng.

![](https://images.viblo.asia/b6915895-5b3c-4177-821e-34268ad38b9d.png)

Với những đặc điểm ở trên thì StatefulSet thường sẽ được sử dụng tốt nhất trong những trường hợp:
- Các dịch vụ dữ liệu (Database, lưu trữ key-value,v.v..)
- Các hệ thống nhạy cảm với việc định danh (consensus-systems, leader-election clustering,v.v..)
- Và bất cứ kiến trúc nào cần việc slow roll-out và liên kết theo cụm.

# DaemonSets
Trong Kubernetes, DaemonSets là một controller đảm bảo rằng Pod của bạn sẽ được chạy trên tất cả các node trong cụm. Và nếu một node được thêm/xoá khỏi cụm thì DaemonSets cũng sẽ tự động thêm/xoá Pod.

Một số trường hợp sử dụng điển hình DaemonSets là chạy các ứng dụng cấp cụm như:
- Monitoring Exporters: Chẳng hạn bạn muốn giám sát tất cả các node trong cụm của mình vì vậy bạn cần một trình giám sát chaỵ trên tất cả các node, ví dụ như Node-Exporter.
- Logs Collection Daemon: Tương tự, bạn cũng muốn thu được log từ tất cả các node thì bạn cũng cần một DaemonSet của log collector như Fluentd trên mỗi node.
- v..v..

![](https://images.viblo.asia/9380fe1a-4837-464a-aaa4-9c41c0424864.png)

Khi bạn sử dụng DaemonSets, nó sẽ triển khai các Pod bằng số lượng node. Tuy nhiên, về mặt hoạt động, nó sẽ hoạt động tương tự như một Deployment, tức là tất cả các Pod cũng sẽ cùng chia sẻ một Persistent Volume.

![](https://images.viblo.asia/f35f79ba-823f-44a8-bbca-17869e8a7425.png)

**Lưu ý**: Một chút lưu ý ở đây là DaemonSets sẽ không chạy trên các node có một *taint* (ví dụ: Master). Bạn sẽ phải chỉ định *toleration* cho nó trên Pod. *Taints* ở trong Kubernetes là một cách để yêu cầu các node loại trừ một Pod, tức là không cho phép Pod nào được chạy trên node này trừ khi Pod được chỉ định một *toleration* matching với *taint*. Nếu chưa rõ về Taint và Toleration, bạn có thể xem thêm tại [đây nhé.](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/)
# Nguồn tham khảo
- https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
- https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/
- https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/
- https://medium.com/stakater/k8s-deployments-vs-statefulsets-vs-daemonsets-60582f0c62d4
- https://blogd.net/kubernetes/kien-truc-kubernetes/