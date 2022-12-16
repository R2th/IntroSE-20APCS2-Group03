# Giới thiệu về LVM
Logical Volume Management(LVM) dùng quản lí các thiết bị lưu trữ. LVM là một tiện ích cho phép chia không gian đĩa cứng thành những Logical Volume từ đó giúp cho việc thay đổi kích thước trở nên dễ dàng.

## 1. Tạo và quản lý LVM trong Linux
Các bước để quản lý và tạo LVM bằng các lệnh **vgcreate**, **lvcreate** và **lvextend**

Chuẩn bị: add thêm 3 đĩa cứng vật lí **sdb**, **sdc**, **sdd** dung lượng **10G**

## 2. Tạo Physical Volume
Chạy lệnh sau để tạo physical volume(PV) trên **/dev/sdb**, **/dev/sdc**, và **/dev/sdd**

```
[root@localhost ~]# pvcreate /dev/sdb /dev/sdc /dev/sdd
```

Liệt kê các physical volume(PV) mới được tạo, chạy như sau:

```
[root@localhost ~]# pvs
```

Ý nghĩa các trường của pvs:

* PV: Đĩa được sử dụng
* PFree: Kích thước đĩa vật lý (Kích thước PV)


Để có được thông tin chi tiết về mỗi physical volume(PV), sử dụng lệnh sau: pvdisplay

Xem thông tin chi tiết về physical volume(PV) /dev/sdb. Chúng ta thực hiện như sau:
```
[root@localhost ~]# pvdisplay /dev/sdb
```
Tương tự cho **/dev/sdc** và **/dev/sdd**:

> Lưu ý: Nếu chúng ta có 2 ổ đĩa hay nhiều ổ đĩa để tạo một volume mà một đĩa ở volume bị mất thì dẫn tới volume đó mất luôn, vì thế phải chạy LVM trên RAID hoặc dùng tính năng RAID của LVM để có khả năng dung lỗi.

## 3.Tạo Volume Group
Để tạo volume group với tên vg0 bằng cách sử dụng /dev/sdb và /dev/sdc. Chúng ta thực hiện như sau:
```
[root@localhost ~]# vgcreate vg0 /dev/sdb /dev/sdc
```
Xem thông tin volume group vừa tạo:
```
[root@localhost ~]# vgdisplay vg0
```
Vì vg0 chứa hai đĩa 10GB nên VG Size = 19.99GB

Ý nghĩa các thông tin của Volume group khi chạy lệnh vgdisplay:

* VG Name: Tên Volume Group.
* Format: Kiến trúc LVM được sử dụng.
* VG Access: Volume Group có thể đọc và viết và sẵn sàng để sử dụng.
* VG Status: Volume Group có thể được định cỡ lại, chúng ta có thể mở rộng thêm nếu cần thêm dung lượng.
* PE Size: Mở rộng Physical, Kích thước cho đĩa có thể được xác định bằng kích thước PE hoặc GB, 4MB là kích thước PE mặc định của LVM
* Total PE: Dung lượng Volume Group có
* Alloc PE: Tổng PE đã sử dụng
* Free PE: Tổng PE chưa được sử dụng

Kiểm tra số lượng physical volume(PV) dùng để tạo volume group như sau:
```
[root@localhost ~]# vgs
```
Trong đó:
* VG: Tên Volume Group
* PV: Physical Volume sử dụng trong Volume Group
* VFree: Hiển thị không gian trống có sẵn trong Volume Group
* VSize: Tổng kích thước của Volume Group
* LV: Logical Volume nằm trong volume group
* SN: Số lượng Snapshot của volume group
* Attr: Trạng thái của Volume group có thể ghi, có thể đọc, có thể thay đổi,

## 4. Tạo Logical Volume

Chúng ta sẽ tạo 2 logical volume với tên projects có dung lượng là 10GB và backups sử dụng toàn bộ dung lượng còn lại của volume group. Chúng ta chạy lệnh sau:
```
[root@localhost ~]# lvcreate -n projects -L 10G vg0
Logical volume "projects" created.
[root@localhost ~]# lvcreate -n backups -l 100%FREE vg0
```
Logical volume "backups" created.
Trong đó:

> -n: Sử dụng chỉ ra tên của logical volume cần tạo.
> 
> -L: Sử dụng chỉ một kích thước cố định.
> 
> -l: Sử dụng chỉ phần trăm của không gian còn lại trong volume group.

Xem danh sách logical volume vừa được tạo:
```
[root@localhost ~]# lvs
```
Ý nghĩa các trường của lvs:

* LV: Tên logical volume
* %Data: Phần trăm dung lượng logical volume được sử dụng
* Lsize: Kích thước của logical volume

Hiển thị thông tin chi tiết của các logical volume:
```
[root@localhost ~]# lvdisplay vg0/projects
```
Chúng ta sẽ sử dụng file system ext4 vì nó cho phép chúng ta tăng và giảm kích thước của mỗi logical volume (với file system xfs chỉ cho phép tăng kích thước). Chúng ta thực hiện như sau:
```
[root@localhost ~]# mkfs.ext4 /dev/vg0/projects
```
Mở rộng Volume Group và thay đổi kích thước các Logical Volume

Trong ví dụ dưới đây chúng ta sẽ thêm một physical volume có tên /dev/sdd với kích thước 10GB vào volume group vg0, sau đó chúng ta sẽ tăng kích thước của logical volume /projects lên 10GB thực hiện như sau:

Chạy các lệnh sau để tạo nơi lưu trữ gắn kết:
```
[root@localhost ~]# mkdir /projects
[root@localhost ~]# mkdir /backups
```
Chạy lệnh sau để mount:
```
[root@localhost ~]# mount /dev/vg0/projects /projects/
[root@localhost ~]# mount /dev/vg0/backups /backups/
```
Kiểm tra sử dụng không gian đĩa hệ thống tập tin:
```
[root@localhost ~]# df -TH
```
Sử dụng lệnh sau để thêm /dev/sdd vào volume group vg0:
```
[root@localhost ~]# vgextend vg0 /dev/sdd
```
Volume group “vg0” successfully extended

Chúng ta chạy lệnh vgdisplay vg0 trước và sau khi thực hiện lệnh vgextend vg0 /dev/sdd, bạn sẽ thấy sự tăng kích thước của volume group(VG):

Trước khi chạy lệnh vgextend vg0 /dev/sdd
```
[root@localhost ~]# vgdisplay vg0
```
Sau khi chạy lệnh vgextend vg0 /dev/sdd
```
[root@localhost ~]# vgdisplay vg0
```
Qua lệnh kiểm tra trên chúng ta thấy dung lượng thêm vào của chúng ta là 10GB chúng ta có thể tăng kích thước của logical volume /projects lên 10GB thực hiện như sau:
```
[root@localhost ~]# lvextend -l +2000 /dev/vg0/projects
```
Sau khi chạy lệnh trên chúng ta cần thay đổi kích thước hệ thống tệp, vì thế chúng ta phải chạy lệnh sau để resize:

* Đối với file system (ext2, ext3, ext 4): resize2fs.
* Đối với file system (xfs): xfs_growfs.

```
[root@localhost ~]# resize2fs /dev/vg0/projects
[root@localhost ~]# df -TH
```
# Lời kết
Như vậy là qua bài giới thiệu này các bạn hiểu LVM tong Linux là gì rồi. Chúc các bạn thành công.!

Tham khảo: [Tìm hiểu LVM trong Linux](https://vietcalls.com/tim-hieu-lvm-trong-linux/)