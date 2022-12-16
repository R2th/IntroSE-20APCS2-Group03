![image.png](https://images.viblo.asia/ab699f9c-2f39-4836-bba7-8ce020b84305.png)
# Giải quyết vấn đề gì?
Nếu như bạn đang chạy các ứng dụng, dịch vụ trên nền tảng K8s đặc biệt là các ứng dụng Stateful thì sẽ không còn quá lạ lẫm với việc sử dụng các Persistent Volume Claim (PVC) hay Persistent Volume (PV) để lưu dữ liệu cho các ứng dụng khi restart hoặc bị xóa. Có nhiều cách để chúng ta có thể tạo và sử dụng PV và PVC như sử dụng CInder của OpenStack, NFS hay các plugin của các nhà cung cấp dịch vụ thứ 3. Mỗi cách đều có nhưng ưu nhược điểm khác nhau. 

Trong bài viết ngày hôm này mình sẽ giới thiệu bạn sử dụng Disk trên nền tảng của BizflyCloud để tự động tạo Persistent Volume cho PVC khi có yêu cầu. Mình sẽ thực hiện cài BizFly Cloud Volume CSI driver for Kubernetes lên trên cụm K8s đang sử dụng để có thể tạo ra các StorageClass. Sau đó khi đã có StorageClass ta chỉ cần chỉ định StorageClass này có các PVC là K8s sẽ tự động tạo ra các PV với kích thước tương ứng để chứa PVC này. Hầu hết các nhà cung cấp dịch vụ Cloud lớn như AWS, GCP hay Azure đều có plugin để hỗ trợ việc tạo theo cách tương tự nên sau khi hiểu bài viết này bạn hoàn toàn có thể ứng dụng cho các Cloud provider khác.

# Điều kiện tiên quyết

- Cụm Kubernetes 
- Tài khoản tại BizflyCloud có đủ quyền tạo ổ đĩa.

# Cài đặt
## Tạo secret
Các bước để cài đặt khá đơn giản chỉ cần follow đúng theo hướng dẫn trên document. Đầu tiên ta cần tạo 1 secret chứa các thông tin để tạo resoure disk trên cloud.
```
apiVersion: v1
kind: Secret
metadata:
 name: bizflycloud
 namespace: kube-system
stringData:
 application_credential_id: "your_application_credential_id"
 application_credential_secret: "your_application_credential_secret"
 tenant_id: "your_tenant_id"
 region: "your_region" # HN, HCM
```

Trong phần này bạn sẽ tạo secret tên bizflycloud ở namespace kube-system, trong đó chứa các thông tin về application id, application secret, tenant_id hay project_id và region là nơi bạn muốn disk được khởi tạo. Hiện tại Bizfly đang có 2 region là Hà Nội và Hồ Chí Minh.

Để lấy thông tin về application credential ta truy cập đường dẫn https://manage.bizflycloud.vn/account/security#application-credential và tạo mới Credential.

![image.png](https://images.viblo.asia/7c8d43e5-8063-447c-a822-9b6c9152996d.png)

Sau đó ta sẽ có ID và secret của Application
![image.png](https://images.viblo.asia/0ed754e1-7614-4a43-8104-ba809ccaa042.png)

Để lấy được tenant_id ta truy cập vào API https://manage.bizflycloud.vn/account/api/users/info và tìm key tenant_id.

## Deploy CSI Plugin
Tạo CSI Plugin
```
kubectl apply -f https://raw.githubusercontent.com/bizflycloud/csi-bizflycloud/master/manifest/plugin/csi-driver.yaml
```

Thêm RBAC cho controller plugin và node plugin
```
kubectl apply -f https://raw.githubusercontent.com/bizflycloud/csi-bizflycloud/master/manifest/plugin/csi-bizflycloud-controllerplugin-rbac.yaml
kubectl apply -f https://raw.githubusercontent.com/bizflycloud/csi-bizflycloud/master/manifest/plugin/csi-bizflycloud-nodeplugin-rbac.yaml
```

Cài đặt CSI Statefulset và Daemonset
```
kubectl apply -f https://raw.githubusercontent.com/bizflycloud/csi-bizflycloud/master/manifest/plugin/csi-bizflycloud-controllerplugin.yaml
kubectl apply -f https://raw.githubusercontent.com/bizflycloud/csi-bizflycloud/master/manifest/plugin/csi-bizflycloud-nodeplugin.yaml
```

Như vậy ta đã tạo xong các thành phần cần thiết, tiếp theo ta tạo StorageClass. Ta tạo file storageClasses.yaml với nội dung như sau:
```
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: premium-hdd
  annotations:
    storageclass.kubernetes.io/is-default-class: "true"
provisioner: volume.csi.bizflycloud.vn
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
parameters:
  category: premium
  type: HDD
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: premium-ssd
provisioner: volume.csi.bizflycloud.vn
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
parameters:
  category: premium
  type: SSD
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: enterprise-hdd
provisioner: volume.csi.bizflycloud.vn
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
parameters:
  category: enterprise
  type: HDD
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: enterprise-ssd
provisioner: volume.csi.bizflycloud.vn
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
parameters:
  category: enterprise
  type: SSD
```

Ở đây ta tạo ra 4 storage class tương ứng với 4 loại ổ đĩa khác nhau với tốc độ khác nhau Premium => Enterprise, Ngoài ra còn có ổ địa Dedicated, ta có thể thêm bằng cách tương tự. Với file yaml trên ta đang để loại ổ điã mặc định là hdd-premium nên với 1 PVC không được set StorageClass thì mặc định sẽ sử dụng hdd-prenium. Ta apply file trên để có các storageclass
> kubectl apply -f storageClasses.yaml
![image.png](https://images.viblo.asia/4d749506-47dc-4bf8-abfc-f4a7df4e6993.png)

Như vậy ta đã cài đặt xong CSI hỗ trợ cho việc khởi tạo các PV tương ứng cho PVC. Sau đây ta sẽ thử nghiệm để xem mọi thứ đã hoạt động như mong đợi chưa.
# Thử nghiệm
Để thử nghiệm ta tạo một ứng dụng stateful sử dụng PVC, trong ví dụ này sẽ là Redis sử dụng[ bitnami helm chart](https://github.com/bitnami/charts/tree/master/bitnami/redis).

![image.png](https://images.viblo.asia/b4045801-da44-43f2-a4c8-8dc494d315f0.png)

Sau khi cài đặt helm chart thì ta thấy các pvc đã được claim vào các PV tự động gen ra như hình 

Như vậy nếu không set StorageClassName thì mặc định PVC sẽ sử dụng StorageClass hdd-premium

**Lưu ý:**  Size volume nên để chia hết cho 10

## Ưu điểm
* Tiện lợi hơn trong việc quản trị các resource.
* Đa dạng các loại ổ đĩa để chọn (HDD, SSD) với các tốc độ khác nhau.
* Có thể tích hợp với dịch vụ backup trên Cloud để bảo mật dữ liệu.
* ...

## Nhược điểm
* Chi phí đắt hơn.
* Đòi hỏi người quản trị cần có kiến thức nhất định về dịch vụ đang sử dụng trên Cloud đó.

# Kết

Hy vong bài viết sẽ giúp bạn một lúc nào đó trong công việc.

# Tham khảo
https://github.com/bizflycloud/bizfly-cloud-controller-manager
https://github.com/bizflycloud/csi-bizflycloud
https://kubernetes.io/blog/2019/01/15/container-storage-interface-ga/
https://github.com/bitnami/charts/tree/master/bitnami/redis