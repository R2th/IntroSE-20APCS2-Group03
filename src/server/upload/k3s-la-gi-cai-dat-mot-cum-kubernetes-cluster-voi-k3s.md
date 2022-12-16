## K3s là gì?
-   K3s là một giải pháp triển khai slim K8s. Dễ dàng cài đặt, dung lượng nhỏ và tất cả đều ở dạng nhị phân dưới 100MB.

## Nguồn gốc của K3s.
-   K3s được phát triển bởi Rancher Labs, với mong muốn tạo ra một bản triển khai Kubernetes nhẹ, dễ vận hành và có thể chạy trên cơ sở hạ tầng x86 và ARM mà không cần sử dụng bộ nhớ hơn 512 MB.
-   Ý nghĩa cái tên K3s. Tại sao lại là K3s? Như chúng ta đã biết Kubernetes là 1 từ gồm 10 chữ cái được cách điệu thành K8s. Vậy thì K3s được xây dựng với mong muốn có kích thước chỉ bằng một nửa so với K8s về dung lượng bộ nhớ, nên nó sẽ là một cái tên với khoảng 5 chữ cái :)

## K3s vs K8s
-   Là phiên bản rút gọn của K8s, nhưng K3s cũng vẫn mạnh mẽ khi được đặt vào đúng môi trường. Thật sự, khi suy nghĩ kỹ, K3s là một bản phân phối mã nguồn mở Kubernetes nhỏ hơn, đã được kiểm chứng,  tuân thủ đầy đủ quy chuẩn công nghệ và nó là ứng viên hoàn hảo phù hợp với cơ sở hạ tầng IoT, CI một cách tuyệt vời và nó siêu tập trung vào các môi trường hạn chế tài nguyên. 
-   Phân phối này nhỏ đến mức nào? Nó có kích thước bằng ¼ bản Kubernetes vanilla, và nó có thể khởi động trong khoảng 30s cùng với các vùng chứa (container) ngay lập tức. Thực sự điều đó thật ấn tượng! Bạn có thể thiết lập và chạy với một cụm K3 trong vài phút, rất dễ dàng.
-   K3s là 1 bản phân phối K8s tuần thủ đầy đủ quy chuẩn công nghệ, với các cải tiến và thay đổi như sau:
    +   Được đóng gói dưới dạng một tệp nhị phân duy nhất.
    +   Các tính năng kế thừa, alpha, không mặc định được loại bỏ.
    +   Hầu hết các plugin in-tree (nhà cung cấp đám mây và plugin lưu trữ) đã bị xóa; chúng có thể được thay thế bằng các out-of-tree add-ons.
    +   Sqlite3 được thêm làm cơ chế lưu trữ mặc định. Etcd3 vẫn có sẵn, nhưng không phải mặc định.
    +   Nó được gói trong launcher đơn giản xử lý rất nhiều sự phức tạp của TLS và các tùy chọn khác.
    +   Nó có minimal hoặc không OS dependencies tối thiểu để không phụ thuộc hệ điều hành; chỉ cần một sane kernel và cgroup mount là cần thiết.

-   **Cách K3s hoạt động**

![k3sio](https://k3s.io/images/how-it-works-k3s.svg)

## Cài đặt k3s cluster
Các hướng dẫn dưới đây là các hướng dẫn giúp bạn cài đặt nhanh một cụm K3s cluster với các tùy chọn mặc định. Bạn có thể tham khảo thêm các tùy chọn cài đặt tại  [Installation Options](https://rancher.com/docs/k3s/latest/en/installation/install-options/) và các tùy chọn về network trong cụm tại [Network Options](https://rancher.com/docs/k3s/latest/en/installation/network-options/).

### Requirements
-   Yêu cầu phần cứng để cài đặt K3s là rất thấp. Ta có thể dễ dàng cài đặt nó trên một Raspberry Pi hoặc một VM rất dễ dàng.
-   Yêu cầu tối thiếu nên có để chạy K3s:
    +   Linux 3.10 or higher
    +   512 MB RAM (mỗi server)
    +   75 MB RAM mỗi node
    +   200 MB of free disk space
    +   86/64/ARMV7/ARM64 chip
 
 -   Ngoài ra, tùy theo ứng dụng mà ta muốn chạy trên cụm mà ta sẽ co dãn tài nguyên cho hợp lý. 
 
### Cài đặt K3s server (master node)
-   K3s cung cấp sẵn một script cài đặt, giúp ta có thể thuận tiện để cài đặt nó như một dịch vụ trên hệ thống dựa trên systemd hoặc openrc. Script này có sẵn tại https://get.k3s.io . Để cài đặt K3s bằng phương pháp này, chỉ cần chạy:

```
curl -sfL https://get.k3s.io | sh -
```
-   Sau khi chạy script cài đặt, gần như không phải làm gì quá nhiều vì trình cài đặt đã gúp ta làm mọi thứ:
    +   K3s service sẽ được cấu hình để tự động khởi động lại sau khi node khởi động lại hoặc nếu process bị lỗi hoặc bị chết.
    +   Các công cụ tiện ích bổ sung sẽ được cài đặt, bao gồm kubectl, crictl, ctr, k3s-killall.sh, và k3s-uninstall.sh.
    +   Một file kubeconfig sẽ được ghi vào /etc/rancher/k3s/k3s.yaml và kubectl được cài đặt bởi K3s sẽ tự động sử dụng nó. 
   
        **Lưu ý:** Trình cài đặt K3s tạo file kubeconfig trong thư mục /etc với quyền hạn chế, sử dụng K3S_KUBECONFIG_MODE để gán các quyền cần thiết cho file kubeconfig, giúp cho user client có thể truy cập vào cụm. Chẳng hạn: `644` .   Sau đó, bạn hãy sao chép tất cả nội dung k3s.yaml từ máy chủ của bạn vào ~/.kube/config trên server client mà bạn muốn có quyền truy cập từ xa vào cụm.
       ```
       curl -sfL https://get.k3s.io | K3S_KUBECONFIG_MODE=644 sh -
       ```

-    Ngoài ra script cài đặt cũng có thể được thay đổi bằng [các biến môi trường](https://rancher.com/docs/k3s/latest/en/installation/install-options/#options-for-installation-with-script).

### Cài đặt K3s agent (worker node)
-   Để cài đặt trên các worker node và thêm chúng vào cụm, hãy chạy script cài đặt với các biến môi trường K3S_URL và K3S_TOKEN. Dưới đây là một ví dụ cho thấy cách cài đặt và thêm một node worker vào cụm:

```
curl -sfL https://get.k3s.io | K3S_URL=https://myserver:6443 K3S_TOKEN=mynodetoken sh -
```
-   Để có thể thêm node vào cụm ta cần có 2 thông tin sau:
    +   K3S_URL: sẽ là địa chỉ ip node master của bạn.
    +   K3S_TOKEN: được lưu trữ trong file /var/lib/rancher/k3s/server/node-token trong node master.

-   Lưu ý: Mỗi máy phải có một tên máy duy nhất. Nếu máy của bạn không có tên máy chủ duy nhất, hãy thêm biến môi trường K3S_NODE_NAME và cung cấp giá trị có tên máy chủ hợp lệ và duy nhất cho mỗi node.

### Kiểm tra cụm sau khi cài đặt
-   Xác nhận các node đang chạy trong cụm
```
kubectl get nodes -o wide
```

Ta sẽ có kết quả trả về tương tự như sau:

```
kubectl get node -o wide
NAME         STATUS   ROLES    AGE   VERSION        INTERNAL-IP     EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION     CONTAINER-RUNTIME
i121035-lt   Ready    master   17d   v1.18.6+k3s1   192.168.19.29   <none>        Ubuntu 18.04.3 LTS   5.4.0-42-generic   containerd://1.3.3-k3s2
```

-   Kiểm tra các namespaces đang có trong cụm

```
kubectl get namespaces
```

Ta sẽ có kết quả trả về tương tự như sau:

```
kubectl get namespaces           
NAME              STATUS   AGE
kube-system       Active   17d
default           Active   17d
kube-public       Active   17d
kube-node-lease   Active   17d
```

-   Xác nhận các pods đang chạy trong cụm
```
kubectl get pods --all-namespaces
```

Ta sẽ có kết quả trả về tương tự như sau:

```
kubectl get pods --all-namespaces  
NAME                                     READY   STATUS    RESTARTS   AGE
local-path-provisioner-6d59f47c7-cwnnp   1/1     Running   18         17d
coredns-8655855d6-rxktr                  1/1     Running   18         17d
metrics-server-7566d596c8-vd9sf          1/1     Running   18         17d
```