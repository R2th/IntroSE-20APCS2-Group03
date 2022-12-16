# Mở đầu
Kubernetes Persistent Storage cung cấp cho các ứng dụng triển khai trên Kubernetes một cách thuận tiện để yêu cầu và sử dụng tài nguyên lưu trữ. Nếu như các Ephemeral Storage (lưu trữ tạm thời) có thời gian tồn tại là thời gian tồn tại của pod và nó có thể bị mất đi sau khi pod bị xoá hoặc gặp sự cố, vô tình bị tắt, thì các Persistent Storage (lưu trữ liên tục) có thời gian tồn tại độc lập với pod và không bị mất đi khi pod bị xoá hay gặp sự cố. Persistent Storage là điều cần thiết với các ứng dụng quan trọng cần lưu trữ ổn định, bền bỉ vượt xa pod hoặc thậm chí là node mà pod đang chạy.

Để tạo và sử dụng Persistent Storage, Kubernetes cung cấp cho chúng ta hai loại API resource là PersistentVolume (PV) and PersistentVolumeClaim (PVC). Trên thực tế, Kubernetes hỗ trợ rất nhiều loại volume storage khác nhau và một số các volume thuần vẫn có thể có persistent storage. Tuy nhiên, PV và PVC là rất hữu ích cho việc quản lý tài nguyên lưu trữ cho các dự án lớn. Nó giúp trừu tượng đi các chi tiết cơ sở hạ tầng, có độ phức tạp cao hơn so với chỉ sử dụng volume thuần. Trong phạm vi bài viết này, mình sẽ sùng các bạn có những tìm hiểu cơ bản về PersistentVolume và PersistentVolumeClaim cũng như cách sử dụng chúng nhé.
![](https://images.viblo.asia/34633c1d-343b-4a9a-ad97-b7a5c9aaec87.png)
# Persistent Volumes
**PersistentVolume** (PV) là một phần không gian lưu trữ dữ liệu trong cụm được cấp phát bởi Cluster Admin hoặc được cấp phát linh hoạt. Nó là một loại tài nguyên của của cụm cũng giống như 1 node là tài nguyên của cụm. Các PV này cũng giống như các Volume thuần khác, tuy nhiên nó tồn tại hoàn toàn độc lập với bất kỳ pod nào sử dụng PV. Hiện tại, Kubernetes hỗ trợ rất nhiều các loại PersistentVolume khác nhau được cài đặt dưới dạng plugin như glusterfs, nfs, csi, ... (Bạn có thể xem thêm chi tiết tại [đây](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#types-of-persistent-volumes)).
# Persistent Volume Claim
Một người dùng muốn sử dụng không gian lưu trữ (PV) thì cần tạo một **PersistentVolumeClaim** (PVC). Nó chính là một yêu cầu sử dụng không gian lưu trữ (yêu cầu sử dụng PV). Thông thường người dùng sẽ tạo một manifest PersistentVolumeClaim, chỉ định số lượng, loại lớp lưu trữ (storage class), yêu cầu các mức tài nguyên CPU, bộ nhớ,... Ngoài ra, PVC còn có thể xác định các chế độ quyền truy cập cụ thể vào vùng lưu trữ (ví dụ như: ReadWriteOnce, ReadOnlyMany or ReadWriteMany - bạn có thể xem thêm chi tiết về các quyền này tại [đây](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes)). Kubernetes sau đó sẽ dựa vào các thông tin này để tìm và dự trữ dung lượng lưu trữ cần thiết.

Để hiểu rõ hơn về mối quan hệ giữa PV và PVC, bạn có thể hình dung chúng giống như là node và pod. Nếu như Pod tiêu thụ tài nguyên của node thì ở đây, PVC sẽ tiêu thụ tài nguyên của PV.
# Ví dụ về cách tạo, sử dụng Persistent Volume và Persistent Volume Claim
- **Bước 1: Tạo Persistent Volume**

Trong ví dụ này, để đơn giản, mình sẽ hướng dẫn các bạn tạo một hostPath PersistentVolume. `hostPath` là loại volume storage được Kubernetes hỗ trợ để phát triển và thử nghiệm trên một cụm chỉ có 1 node đơn. Một hostPath PersistentVolume sẽ gắn một file hoặc thư mục ngay trên node máy chủ vào pod của bạn để làm không gian lưu trữ.

Ở đây, mình có 1 file cấu hình cho hostPath PersistentVolume là `example-pv-volume.yaml` như sau:

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: example-pv-volume
  labels:
    type: local
spec:
  storageClassName: hostpath
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/data"
```

Sau đó, tiến hành apply file cấu hình:

`kubectl apply -f example-pv-volume.yaml`

Bạn có thể xem thông tin về PersistentVolume vừa mới tạo được bằng câu lệnh:

`kubectl get pv example-pv-volume`

- **Bước 2: Tạo PersistentVolumeClaim**

Tạo một mainifest PersistentVolumeClaim có tên `example-pv-claim.yaml` để tạo yêu cầu sử dụng tới PersistentVolume đã tạo ở trên như sau:

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: example-pv-claim
spec:
  storageClassName: hostpath
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 4Gi
```

Tạo `PersistentVolumeClaim` với câu lệnh:

`kubectl apply -f example-pv-claim.yaml`

Sau khi bạn tạo PersistentVolumeClaim, Kubernetes sẽ tìm kiếm một PersistentVolume đáp ứng được các yêu cầu của PersistentVolumeClaim. Nếu Kubernetes tìm thấy một PersistentVolume phù hợp, với cùng một lớp lưu trữ (storageClassName), nó sẽ liên kết xác nhận quyền sở hữu của PV với PVC đó.

Bạn sẽ có thể thấy thông tin này sau khi chạy lệnh lấy thông tin mô tả của PV một lần nữa sau khi tạo PVC:

```
NAME             CAPACITY   ACCESSMODES   RECLAIMPOLICY   STATUS    CLAIM                   STORAGECLASS   REASON    AGE
example-pv-volume   10Gi       RWO           Retain          Bound     default/example-pv-claim   hostpath             2m
```

- **Bước 3: Tạo một pod sử dụng PersistentVolumeClaim**

Cuối cùng, bạn sẽ tạo một pod sử dụng PersistentVolumeClaim của bạn như là một volume được gắn vào pod.

Dưới đây là file config `pod-use-pvc.yaml` để tạo một pod nginx đơn giản sử dụng volume:

```
apiVersion: v1
kind: Pod
metadata:
  name: example-pv-pod
spec:
  containers:
    - name: task-pv-container
      image: nginx
      ports:
        - containerPort: 80
          name: "http-server"
      volumeMounts:
        - mountPath: "/usr/share/nginx/html"
          name: example-pv-storage
  volumes:
    - name: example-pv-storage
      persistentVolumeClaim:
        claimName: example-pv-claim
```

Và cuối cùng là tạo pod:

`kubectl apply -f pod-use-pvc.yaml`

Như vậy, bạn đã có được một pod sử dụng persistence volume là hostpath đang hoạt động. Tuy nhiên, một lưu ý cho bạn là trong cấu hình của pod, nó sẽ chỉ định một Persistent Volume Claim (PVC) mà không phải là một Persistent Volume (PV). Như vậy, dưới cái nhìn của một pod thì PVC sẽ là một volume và 1 pod có thể có nhiều volume thuộc nhiều loại khác nhau.

# Tạm kết
Trong thực tế sử dụng, việc lưu trữ tạm thời (Ephemeral Storage), sự tồn tại của các volume phụ thuộc vào sự tồn tại của pod là không đủ cho hầu hết các ứng dụng. Để có khả năng phục hồi, đáng tin cậy, khả dụng và có thể thay đổi kích cỡ, các ứng dụng Kubernetes cần có khả năng chạy nhiều phiên bản trên các Pod và chính các Pod này có thể được lên lịch hoặc đặt trên các Node khác nhau trong cluster Kubernetes. Những gì cần là một kho lưu trữ ổn định, bền bỉ vượt xa Pod hoặc thậm chí là Node mà Pod đang chạy. Cho nên Persistent Storage là cần thiết! Hi vọng, qua bài viết của mình, các bạn sẽ phần nào hiểu và nắm được cách sử dụng Persistent Volume (PV) và Persistent Volume Claim (PVC) cơ bản để tạo một Persistent Storage. Cảm ơn các bạn đã theo dõi bài viết của mình.
# Reference
- https://kubernetes.io/docs/concepts/storage/volumes/
- https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes