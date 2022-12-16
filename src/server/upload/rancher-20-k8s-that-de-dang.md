### Mở đầu
Để hiểu được bài viết này các bạn cần có một số kiến thức cơ bản về K8S, có thể tham khảo bài viết [Tìm hiểu cơ bản về Kubernetes - K8s](https://viblo.asia/p/tim-hieu-co-ban-ve-kubernetes-k8s-part-1-924lJ4bbKPM#_kubernetes-la-gi-2). 

Việc khởi chạy một hệ thống K8S trên một máy có khá nhiều bất tiện và không thấy được hết tính năng của K8S. Trên thực tế các đội nhóm, tổ chức cần một công cụ thao tác và kiểm soát duy nhất. Ra đời nhằm đáp ứng nhu cầu này đó là **Rancher 2.0**. Bài viết này mình xin phép được giới thiệu lại cách sử dụng Rancher.

Môi trường mình sử dụng sẽ là AWS EC2. Máy chủ này có kết nối mạng tương đối ổn định với Việt Nam và trên hết là có tính năng pay-as-you-go, cho phép trả tiền theo thời gian sử dụng tính bằng phút. Rất thuận tiện demo mà không mất chi phí thuê tháng trọn gói.

### Rancher là gì?
Rancher giúp quản lý Docker container bằng giao diện một cách tiện dụng, mọi thao tác đều trên giao diện website. Rancher còn tích hợp thêm một số công cụ tiện ích cho System Admin như Shell, App Catalog ...
Rancher là dự án miễn phí, bắt đầu phát triển cách đây từ năm 2014. Với mục tiêu ban đầu là phát triển phần mềm để quản lý và xây dựng các cấu trúc hệ thống container trong mọi công ty, chạy với mọi kiến trúc hạ tầng. Qua nhiều phiên bản, Rancher dần trở thành công cụ hỗ trợ rất nhiều container orchestration như: Docker Swarm, Mesos hay Kubernete. Quản lý các tài nguyên tại AWS EC2, Digital Ocean ... bằng API. Quản lý các kết nối mạng nội bộ giữa các container hoặc internet.

![](https://images.viblo.asia/065ae1ed-4104-4bc4-a7b0-6430b215d089.png)

### Kiến trúc Cluster
Mô hình như sau:
![](https://images.viblo.asia/e31139e0-78fc-4a35-ae6d-821957db0d08.png)

Danh sách server sẽ dựng:

* Rancher: 1 server
* Master: 1 server
* Node: 2 server

#### Chuẩn bị môi trường
Như hình phía trên thì chúng ta cần chuẩn bị:

* 4 máy VPSs
* Mình chọn OS: CentOS 7.4
* Mỗi server đã được cài docker
```shell
#Docker install
$ sudo yum update -y 
$ sudo yum install docker -y 
$ sudo systemctl enable docker
$ sudo systemctl start docker
```

Cấu hình cơ bản khởi động Docker
```shell
$ sudo groupadd docker
$ sudo service docker restart
$ sudo usermod -a -G docker {user_name}
```

Sau khi cài đặt xong thì chúng ta được hình như bên dưới:
![](https://images.viblo.asia/f5c8552b-445f-48eb-b09d-f4baf3232ad0.png)

#### Rancher Install
Mình sử dụng phiên bản mới nhất của Rancher

```shell
$ sudo docker run -d --name rancher_server --restart=unless-stopped -p 80:80 -p 443:443 rancher/rancher
```

#### Login Rancher
Truy cập vào rancher theo đường dẫn: https://{IP server cài Rancher}

Thiết lập Password tuỳ ý:
![](https://images.viblo.asia/0339df28-526c-4bb3-8d42-3eb8574503a1.png)

Sau khi thiết lập password xong, tiếp đến là bước thiết lập URL. Ở bước này thì server cài đặt Rancher cần phải cung cấp public IP, hoặc public domain. Vì khi join các Server vào Cluster cần truy cập đến server này.

#### Create Cluster
1. Click Nút Add Cluster
2. Chọn Custom
3. Điền Cluster name.
4. Click Next

![](https://images.viblo.asia/eb1006a5-5728-463b-a3db-e95613f9fba5.png)

5. Chọn checkbox etcd và Control
6. Copy command và chạy ở máy cài Master
7. Click Done.

Quá trình chạy có thể mất chút thời gian, các bạn đợi cho đến khi trạng thái của Cluster hoàn thành thì mới thêm Node tiếp theo.

Click vào menu Cluster trên thanh menu ta có được hình như sau khi hoàn thành.
![](https://images.viblo.asia/af93944e-aeb3-4f16-8664-d1d1f0a718f6.png)


Đến đây thì Cluster của chúng ta như sau:
![](https://images.viblo.asia/66463e71-7abc-471c-b924-0ed6bf233fff.png)

#### Add Node
1. Cũng tại mune Cluster, click biểu tượng "3 chấm dọc" góc bên phải phía trên, chọn edit.
2. Tại đây chúng ta click chọn checkbox Worker, copy command trong ô chạy ở 2 server dành cho Nodes.
3. Nhấn Save
Sau khi chạy hoàn thành (các Server đã join vào Cluster), chúng ta có thể kiếm tra bằng cách truy cập menu Node.
![](https://images.viblo.asia/33df1c11-006d-4657-8865-e8b0ad509c8c.png)

Nếu như bạn có toàn quyền quản lý tài khoản AWS, còn một cách rất dễ hơn đó là dùng API của EC2 để tạo node luôn thông qua API key 

![](https://images.viblo.asia/09e2a5d5-d921-47de-8bbf-2934b9f1e620.png)

Hướng dẫn lấy Access key: [AWS Blog](https://aws.amazon.com/blogs/security/wheres-my-secret-access-key/)

Bạn có thể tuỳ chỉnh cấu hình mà Rancher sẽ sử dụng cho node mới của bạn: [Rancher Document](https://rancher.com/deploying-rancher-from-the-aws-marketplace)

### Tổng kết
Thay vì dùng các công cụ quản lý K8S trả phí như GKE, EKS thì đội nhóm có thể sử dụng Rancher - một công cụ miễn phí với những tính năng tuyệt vời giúp ta xây dựng Kubernetes Cluster một cách nhanh chóng. Rancher còn cung cấp nhiều tính năng hữu ích cho quản lý lớn hơn nhiều, ở bài viết tiếp mình sẽ chia sẻ các thủ thuật môi trường Production nhé.

Tham khảo:
https://blog.vietnamlab.vn/nhap-mon-kubernetes-p3-rancher-2-0-kien-truc-k8s/