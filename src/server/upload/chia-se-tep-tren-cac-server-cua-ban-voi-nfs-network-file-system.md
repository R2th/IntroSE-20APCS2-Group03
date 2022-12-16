![](https://images.viblo.asia/b5ed43e5-2bce-4ecd-be60-41d3f8c43263.jpg)
Chuyện là mình có 1 trang web bán hàng, ban đầu hệ thống cũng khá ít người dùng. Nên mình có thuê server của Linode với 4 GB RAM, CPU 2 Cores và ổ cứng 80 GB SSD. Thời gian thấm thoát thoi đưa vào một ngày đẹp giời server có quá tải nên mình quyết định thuê thêm 1 server nữa cũng với thông số như server 1. Trong quá trình deploy và chạy code trên production thì mình phát hiện ra mỗi lần request đến thư viện ảnh thì response trả ra thông tin khác nhau, cụ thể là response lúc có ảnh lúc không. Mình có điều tra và phát hiện ra là hình ảnh của hệ thống đang chỉ nằm trên server 1 nên khi hệ thống Load Balancer (cân bằng tải), request chuyển qua server 2 sẽ không lấy được ảnh vì thư mục ảnh không hề có gì. Chính vì vậy mình đã tìm hiểu và sử dụng NFS (Network File System) để giải quyết vấn đề này cho hệ thống của mình.
### 1. NFS là gì?
NFS (Network File System) là một hệ thống giao thức chia sẻ file phát triển bởi Sun Microsystems từ năm 1984, cho phép một người dùng trên một máy tính khách truy cập tới hệ thống file chia sẻ thông qua một mạng máy tính giống như truy cập trực tiếp trên ổ cứng. 
### 2. Những tính năng của NFS là gì?
- NFS cho phép truy cập cục bộ đến các tệp từ xa, cho phép nhiều máy tính sử dụng cùng một tệp để mọi người trên mạng có thể truy cập vào cùng một dữ liệu
- Với sự trợ giúp của NFS, chúng ta có thể cấu hình các giải pháp lưu trữ tập trung.
- Giảm chi phí lưu trữ bằng cách để các máy tính chia sẻ ứng dụng thay vì cần dung lượng ổ đĩa cục bộ cho mỗi ứng dụng của người dùng
- Giảm chi phí quản lý hệ thống và minh bạch hệ thống tập tin
- Cung cấp tính nhất quán và độ tin cậy của dữ liệu vì tất cả người dùng đều có thể đọc cùng một bộ tệp
- Có thể bảo mật với Firewalls và Kerberos
### 3. Cài đặt và cấu hình NFS trên server Linux
Mình có 2 server như này, các bạn có thể dùng máy ảo VMware, VM virtualbox hoặc hyper-v manager để tạo ra các server test. Và mình có setup 2 server như sau. Mình coi server 1 là server gốc và chứa các tập tin chính của hệ thống của mình.
```
Server 1: 192.168.1.10
Server 2: 192.168.1.11
```

- Cấu hình tại Server 1, mình có cài đặt NFS server:
```bash
[root@192.168.1.10 ~]# $ apt install apt-get update
```

```bash
[root@192.168.1.10 ~]# $ apt install nfs-kernel-server
```

Kiểm tra trạng thái của NFS server:
```bash
[root@192.168.1.10 ~]# $ service nfs-kernel-server status
```
![](https://images.viblo.asia/6e1c1f3a-84ac-4bd4-9e23-3205a52bc413.png)

Để share được thư mục với NFS, bạn phải sưả nội dung bên trong `/etc/exports` bao gồm folder share, ip và một số đặc quyền. Đầu tiên hãy tạo 1 thư mục mà bạn muốn share, ở đây mình tạo thư mục có tên `nfs_share`. Bạn cũng có thể dùng luôn 1 thư mục sẵn có cũng được.
```bash
[root@192.168.1.10 ~]# $ mkdir /nfs_share
```
Thay đổi nội dung trong `/etc/exports`
```bash
[root@192.168.1.10 ~]# $ nano /etc/exports

/nfsshare 192.168.1.11(rw,sync,no_root_squash)
```
Có một vài tùy chọn của đặc quyền mà bạn cần phải biết:
* ro: Các máy khách chỉ có quyền đọc các tập tin chia sẻ.
* rw: Tùy chọn cho phép quyền đọc và ghi tập tin.
* sync: Đồng bộ xác nhận các yêu cầu tới thư mục được chia sẻ chỉ khi các thay đổi đã được cam kết.
* no_subtree_check: Tùy chọn này ngăn việc kiểm tra cây con. Khi một thư mục dùng chung là thư mục con của một hệ thống tệp lớn hơn, nfs thực hiện quét mọi thư mục bên trên nó, để xác minh các quyền và chi tiết của nó. Việc tắt kiểm tra cây con có thể làm tăng độ tin cậy của NFS, nhưng làm giảm tính bảo mật..
* no_root_squash: Cụm từ này cho phép `root` kết nối với thư mục được chỉ định.


Mở tường lửa cho các máy khách(server 2):
Ta sử dụng lệnh sau:
```bash
[root@192.168.1.10 ~]# $ ufw allow from 192.168.1.11/24 to any port nfs
```
Và sau đó kiểm tra xem ip đã được tường lửa `allow` chưa:
```
[root@192.168.1.10 ~]# $ ufw status
```
- Cấu hình tại server 2:
```bash
[root@192.168.1.11 ~]# $ apt install apt-get update
```

Cài đặt nfs-common:
```bash
[root@192.168.1.11 ~]# $ apt-get install nfs-common
```
Tại server 2 bạn tạo 1 share folder để server 1 NFS mount tới:
```bash
[root@192.168.1.11 ~]# $ mkdir -p /mnt/nfs_share
```
Tại server 2 sử dụng lệnh mount để kết nối thư mục tại đây với thư mục share ở server 1:
```bash
[root@192.168.1.11 ~]# $ mount -t nfs 192.168.1.10:/nfs_share /mnt/nfs_share
```
Lệnh trên sẽ mount vào thư mục share là `/mnt/nfs_share`. Bạn có thể kiểm tra nó với lệnh:
```bash
[root@192.168.1.11 ~]# $ mount | grep nfs

sunrpc on /var/lib/nfs/rpc_pipefs type rpc_pipefs (rw)
nfsd on /proc/fs/nfsd type nfsd (rw)
192.168.1.10:/nfs_share on /mnt type nfs (rw,addr=192.168.1.10)
```
### 3. Kiểm tra
Vậy là chúng ta đã cấu hình xong NFS ở server 1 và server 2.
Các bạn thử tạo một tập tin tại server 1 như sau
```bash
[root@192.168.1.10 ~]# $ cat > /nfs_share/test.txt

This is a test NFS.
```

Tại server 2 bạn check thử:
```bash
[root@192.168.1.11 ~]# $ ll /mnt/nfs_share
total 4
-rw-r--r-- 1 root root 61 Jun 21 10:30 test.txt
[root@192.168.1.11 ~]# $ cat /mnt/nfs_share/test.txt
This is a test NFS.
```
Ok vậy là 2 server của bạn đã share tập tin cho nhau rồi đó.
### 4. Xóa NFS mount
Đương nhiên rồi, một ngày đẹp trời nào đó bạn cần chuyển server khác không phải server 2 nữa, bạn có thể unmount bằng lệnh:
```bash
[root@192.168.1.11 ~]# $ umount /mnt/nfs_share
```