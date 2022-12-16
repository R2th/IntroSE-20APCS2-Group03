# Giới thiệu
Ở bài viết trước mình đã giới thiệu cho các có được cái nhìn tổng quan về **Kubernetes**. Giúp các bạn nắm được một số khái niệm quan trọng trong k8s như **pod**, **service**, **ingress**, **label**, **annotations**, **replicaset**, **configmap**, **secrets** và sơ qua kiến trúc của **Kubernetes** bạn nào quan tâm về nó có xem lại bài viết ở [đây](https://viblo.asia/p/tim-hieu-ve-kubernetes-OeVKBrRAKkW). Trong bài viết này mình và các bạn tiếp tục tìm hiểu về những thành phần( hay khái niệm) quan trọng khác của **Kubernetes**.

Lưu ý: đối với những phần cấu hình YAML file cho từng compoent mình ví dụ trong bài viết thì các bạn chưa cần hiểu rõ về nó vội chỉ cần đọc và nắm được đại khái nó sẽ như thế nào. Bạn nào muốn tìm hiểu về nó luôn thì hoàn toàn có thể xem docs của [Kubernetes](https://kubernetes.io/docs/concepts/). Phần chi tiết những cấu hình này mình sẽ đề cấp ở một bài khác trong series học **Kubernetes** của mình.

# Một số khái niệm quan trọng trong Kubernetes (tiếp theo)
## Volumes
![image.png](https://images.viblo.asia/521acfb9-e193-4f66-bcd0-128c4b6a77c6.png)

Chúng ta cùng đến một khái niệm quan trọng khác đó là **volumes**. **Volumes** là nơi lưu trữ dữ liệu của của **K8s**. Giả sử container `db` hoặc `logging` sinh ra dữ liệu trong quá trình chạy và **pod** đó bị khởi động lại (restart) thì toàn bộ dữ liệu sinh ra trong quá trình chạy **pod** sẽ bị mất. Vì vậy để dữ liệu của `database` hoặc `log data` không bị mất để ta sẽ cần sử dụng đến **volumes** để gán cho **pod**. **Volumes** còn giải quyết được vấn đề chia sẻ dữ liệu giữa những container chạy trong cùng một **pod**. Nó có thể là bộ nhớ vật lý của server nơi mà **pod** đang chạy hoặc những **remote storage** nằm ngoài **Kubernetes cluster** (server hiện tại). Có một lưu ý ở đây là những bộ nhớ lưu trữ này được coi như một bộ nhớ bên ngoài được gắn vào **Kubernetes cluster** vì vậy **K8s** không quản lý tính bền vững của dữ liệu mà admin phải tự tiến hành có những cơ chế backup cho chúng như tạo một bản sao của dữ liệu ra một bộ nhớ vật lý khác, ... **Kubernetes** hỗ trợ rất nhiều kiểu volumes có thể kể đến một số như `awsElasticBlockStore`, `azureDisk`, `cephfs`, ...

Để sử dụng thành thạo **Kubernetes Storage** ngoài khái niệm **volumes** ta cũng cần biết một số component quan trọng khác đó là **Persistent Volume(PV)**, **Persistent Volume Claim(PVC)** và **Storage Class**.

### Persistent Volume (PV) 

**Persistent Volume (PV)** là một phần không gian lưu trữ dữ liệu trong **cluster** và nó được cung cấp bởi `admin` hoặc cung cấp động bằng cách sử dụng **Storage Class** mà ta sẽ nói ở phần dưới. Những **volumes** này tồn tại độc lập với `lifecycle` của **pod** (pod bị xóa hoặc restart thì **persistent volume** vẫn tồn tại). **Kubernetes** hỗ trợ rất nhiều loại **persistent volume** khác nhau như NFS, iSCSI, ... Ta có thể hiểu đơn giản **persistent volume** là storage được lấy từ ổ cứng của **cluster node**, NFS server ngoài **cluster** hoặc cloud storage như AWS, Google Cloud Storage, ... Storage có kiểu như nào, được lấy như nào, ở đâu hoàn toàn do người quản trị quyết định.

**Persistent Volume** cũng như những component khác được tạo bằng cách sử dụng YAML file như hình bên dưới:

![full.png](https://images.viblo.asia/e5b12136-2b3f-4601-90a7-16719586f410.png)

* `kind`: chúng ta để là `PersistentVolume`
* `spec`: để chúng ta định nghĩa ra một số tham số khác ví dụ như dung lượng của volume này là bao nhiêu?, chế độ quyền truy cập, storage backend ... đầy đủ các bạn có thể tham khảo ở [đây](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)

Tùy theo loại `storage` mà ta sẽ có những tham số khác nhau.

Trước khi bắt đầu tìm hiểu về **Persistent Volume Claim (PVC)** ở phần tiếp theo ta sẽ so sánh một chút về **K8s Administrator** và **K8s User**:
* **K8s Administrator** : là người tạo và quản trị **cluster** đồng thời đảm bảo **cluster** có đủ `resource` để sử dụng.
* **K8s User** (Developer): là những người deploy(triển khai) ứng dụng này lên **cluster**.

=> Vì resource của **cluster** là do **K8s Administrator** thiết lập nên người admin cần chắc chắn rằng storage được sử dụng cho **cluster** còn hoạt động (nfs sever storage, cloud storage server) và tạo persistent volume từ storage này. Tùy theo yêu cầu từ developer cần storage nào thì người admin sẽ tạo loại storage đó. Developer cũng cần cấu hình và tạo YAML file để sử dụng những **Persistent Volume** đã được tạo do đó ta sẽ sử dụng đến một component khác của **Kubernetes** đó là **Persistent Volume Claim (PVC)**.

![tfniF.png](https://images.viblo.asia/61f37edc-4cf7-4fbc-9840-6a4dec2b3857.png)

### Persistent Volume Claim (PVC)

**Persistent Volume Claim (PVC)** là yêu cầu sử dụng không gian lưu trữ của **persistent volume** đã được tạo. Developer sẽ tạo một YAML file cho **PVC** chỉ định dung lượng, loại lớp lưu trữ (**storage class**), các mức tài nguyên, quyền truy cập, ... Dưới dây là một ví dụ về YAML file.

![file.png](https://images.viblo.asia/5725ee75-8fbb-46a9-aed4-40165561be21.png)

Để có thể sử dụng **PVC** được tạo thì developer cũng phải cấu hính nó vào trong **pod** như ví dụ dưới đây:

![pod.png](https://images.viblo.asia/975af469-072e-47dd-8154-53f683ffab08.png)

Như các bạn có thể thấy ở file cấu hình pod mình có sử dụng thuộc tiunhs `volumes` với tên là `pvc-volume-name` mà mình đã định nghĩa ở trên. Lưu ý là **PVC** cần ở cùng trong namespace với **pod**. Tổng thể quá trình bạn có thể hiểu là **pod** sẽ yêu cầu `volume` thông qua **PV claim** -> **PVC** sẽ tìm `volume` trong **cluster** để cho **pod** -> **Pod** sẽ mount `volume` đó cho `container`. Để ý trong file config bạn sẽ thấy khi **pod** yêu cầu được `volume` thì nó sẽ được mount vào container `nginx` ở đường dẫn `var/www/html`.

### Storage Class

 Giả sử trong **cluster** của của mình có rất nhiều application được deploy hàng ngày và cần storage cho nó thì developer sẽ cần hỏi admin để tạo **persistent volume** cho ứng dụng trước khi deploy. Admin cần phải xử lý rất nhiều yêu cầu từ developer để tạo **PV** cho ứng dụng. Điều này sẽ gây khó khăn, mất nhiều thời gian cho admin. Để làm cho việc này trở nên đơn giản và tiện lợi ta sẽ dùng đến một component khác của **Kubernetes** đó là **Storage Class**.

**Storage Class** là một cách để admin mô tả "class"(lớp) của hệ thống storage được cung cấp. Mỗi class khác nhau sẽ được ánh xạ với những chính sách tùy ý được xác định bởi **cluster** admin. Hay bạn có thể hiểu đơn giản là **Storage Class** giúp cũng cấp những **PV** một cách tự động khi nhận yêu cầu từ **PVC**. Dưới đây là một ví dụ về cấu hình của **Storage Class**.

![storageclass.png](https://images.viblo.asia/fea59380-53ee-4a5d-a244-9bace5da915a.png)

* `kind`: chúng ta để là `StorageClass`
* `provisioner`: đây là thuộc tính quan trọng của **storage class** vì nó cho **K8s** biết là `provisioner` (storage platform, cloud provider) nào được sử dụng để tạo **persistent volume**. Mỗi một server storage sẽ có `provisioner` của nó. Ở đây mình sử dụng `internal provisioner` của **K8s** với prefix là `kubernetes.io`. Bạn có thể sử dụng một số `external provisioner` khác.
* `parameters`: những tham số của storage đó.

Bởi vì **PV** được yêu cầu bởi **PVC** nên trong cấu hình của **PVC** mình sẽ thêm thuộc tính cho storage class như bên dưới.

![pvc-sc.png](https://images.viblo.asia/c5685b7f-6add-4955-b797-c844fab28bcf.png)

Sau khi đã có **Storage Class** thì ta sẽ có quá trình như sau: **Pod** lấy storage từ **PVC** -> **PVC** yêu cầu storage từ **Storage Class** -> **Storage Class** tạo ra **PV** cho yêu cầu của `Claim` đó.

## Deployment and Stateful Set

![snip.PNG](https://images.viblo.asia/831ec080-8fc6-45eb-99fd-3197d5ccba2e.PNG)

Khi mọi thứ được chạy ổn định trong **K8s**. Chuyện gì sẽ xảy ra khi ứng dụng của ta bị crash và ta cần tạo mới một container image. Lúc này sẽ sinh ra down time cho ứng dụng. Để không sinh ra down time cho ứng dụng ta cần `replicate` node mà ứng dụng ta chạy. Những `replicate` cùng cấu hình với chung **service** (**IP** không đổi, có **load balancer**). Ta sẽ đĩnh nghĩa một bản vẽ (`blueprint`) cho **pod** và định nghĩa số lượng `replicate` chạy tùy theo ý muốn. Những bản vẽ này được gọi là **deployment** trong **K8s**. Khi làm việc với **K8s** hều hết ta sẽ không tạo **pod** mà ta sẽ tiến hành tạo **deployment** vì chúng ta có thể định nghĩa số lượng `replicate` tùy theo ý muốn. **Deployment** giúp ta dễ dàng quản lý và cấu hình **pod**. Khi đã `replicate` **node** một trong những `replicate` bị crash thì sever sẽ điều hướng requets đến những `replicate` khác.

Ứng dụng của mình được `replicate` thì database cũng nên được `replicate` vì khi một trong những `replicate` database bị crash ta có thể dùng những  `replicate` khác. Nhưng chúng ta không thể `replicate` database với **Deployment** vì database có `state` (dữ liệu được thay đổi, cập nhật liên tục). Giả sử ta có 2 `replicate` đang cần cùng truy cập vào cùng data storage thì ta sẽ cần có một cơ chế để quản lý xem `replicate` nào đang tiến hành sửa hoặc đọc dữ liệu của storage đó để tránh dữ liệu không được nhất quán giữa các `replicate`. Cơ chế này có trong một component khác của **K8s** đó là **StatefulSet**.

**StatefulSet** để quản lý các ứng dụng stateful như mysql, mongoDB, elastic search, ... Những ứng dụng này nên được tạo bằng **StatefulSet** chứ không phải **Deployment**. Cũng giống như **Deployment**, **StatefulSet** cũng `replicating` **pod**, scale up nhưng nó đảm bảo rằng database được đọc và viết một cách đồng bộ (synchronize). Tuy nhiên việc deploy **StatefulSet** trong **K8s** không hề dễ dàng nên database thường được host ngoài **K8s cluster**.

Với setup 2 `replicate` của ứng dụng và database thì khi một node bị crash hay restart thì người dùng vẫn có thể truy cập vào ứng dụng của ta bình thường vì service load balancer sẽ điều hướng ta tới **node** còn lại nên ta có thể tránh down time.

# Lời kết
Trong bài viết này mình và các bạn đã tìm hiểu thêm về một số khái niệm (component) quan trọng khác trong **K8s**. Bạn nào cảm thấy chưa hiểu một số khái niệm mình nêu trong bài viết bạn có thể xem lại bài viết trước ở [đây](https://viblo.asia/p/tim-hieu-ve-kubernetes-OeVKBrRAKkW) vì trong bài mình có sử dụng khá nhiều khái niệm ở bài trước hoặc bạn có thể bình luận phía bên dưới để chúng ta cùng thảo luận. Nếu trong bài viết có phần nào chưa được đúng và đầy đủ mong được các bạn góp ý để bài viết được đầy đủ hơn. Cảm ơn các bạn đã theo dõi đến hết bài viết ❤️.

# Tham khảo
[K8s docs](https://kubernetes.io/docs/home/)

[How storage work](https://rancher.com/docs/rancher/v2.5/en/cluster-admin/volumes-and-storage/how-storage-works/)