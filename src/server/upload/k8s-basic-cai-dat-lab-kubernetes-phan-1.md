# Giới thiệu
Trong bài này mình giới thiệu cách sử dụng phần mềm VMware Workstation Pro trên window để tạo các máy ảo (VM). Sau đó cài đặt kubernetes lên các VM này.
![image.png](https://images.viblo.asia/406c9848-78c7-4e9a-8a3a-c7cbfe129956.png)

Yêu cầu: Có máy chủ cấu hình 16GB RAM trở lên (8GB hoặc 12GB cũng có thể nhưng sẽ không đảm bảo lắm)
Máy chủ cài win10/win11/winserver đều được và quan trọng nhất là máy phải có kết nối internet (để tải gói, docker image..)
Kiến trúc của hệ thống lab sẽ như sau:
![image.png](https://images.viblo.asia/97e99a30-05ba-4b05-b14e-4e623a0f62dd.png)

**Mình dự định cài các máy với thông tin như sau:**

| Máy ảo | Role | IP | RAM | CPU | HDD | Note|
| -------- | --------  |-------- |-------- |-------- |-------- |-------- |
| master1 | master | 192.168.10.11 (NAT) | 3GB      | 2 core | 30GB |Sẽ cài thêm haproxy|
| worker1 | worker | 192.168.10.12 (NAT) | 4GB      | 2 core | 30GB | Sẽ cài thêm rancher|
| worker2 | worker | 192.168.10.13 (NAT) | 4GB      | 2 core | 30GB + 30GB| Sẽ cài thêm nfs-server|
| kubespray | installation server | 192.168.10.8 (NAT) | 2GB |2 core |30GB |

Note: Cấu hình RAM/CPU bên trên là ví dụ với case máy 16GB RAM, nếu bạn có nhiều hơn thì có thể tăng lên cho thoải mái. Lưu ý cấu hình của k8s node tối thiểu là 2GB RAM. 

Cơ bản là cài VMware Workstation lên máy PC để tạo các máy ảo. Tạo 3 máy ảo chạy Centos7 (master1, worker1, worker2) để cài k8s, máy ảo kubespray để làm server cài đặt. Từ máy ảo kubespray này mình sẽ thực hiện cài đặt k8s lên 3 node trên.

Trên máy PC sẽ cài mobaxterm (hoặc puty hay SSH-Client nào bạn quen dùng) để kết nối vào k8s sau khi cài đặt.

# Các bước thực hiện
Mình sẽ hướng dẫn cách cài đặt hệ thống lab kubernetes theo các bước chính (giả định bạn đã có PC có window rồi)
- Cài đặt VMware Workstation Pro lên máy PC Window + Cấu hình network cho vmware
- Cài đặt một VM mới dùng Centos7 + cấu hình các tham số cơ bản 
- Clone VM bên trên thành 04 VM với tên lần lượt là: master1, worker1, worker2 và kubespray
- Cập nhật lại hostname, IP.. cho các VM mới clone
- Cài đặt cấu hình máy ảo kubespray để chuẩn bị cài đặt k8s
- Cấu hình tham số cho việc cài đặt + cài đặt k8s bằng kubespray

# Hướng dẫn chi tiết
## Cài đặt VMware Workstation Pro
Các bạn tham khảo [link tải và cài đặt VMware Workstation Pro ở đây](https://cuongquach.com/download-vmware-workstation-pro-16-full.html)  về cài. Cơ bản chỉ toàn next là xong rồi mình không hướng dẫn thêm. 

## Cấu hình network cho VMware Workstation Pro
Bước này nhằm mục đích setup dải IP mình sẽ dùng cho các máy ảo (VM) sau này. Để thực hiện, các bạn mở VMware Workstation Pro vào mục **edit** ==> **Virtual Network Editor** ==> Chọn vào loại network là **NAT**:
![image.png](https://images.viblo.asia/7f23b983-c30f-4d5b-8498-2c7aad0e60dd.png)

Ở đây mình hướng dẫn sử dụng NAT, khi đó các VM sẽ được cấp một private IP trong dải mà bạn cài đặt ở mục **Subnet IP**. Các bạn có thể setup dải này tùy ý, ở đây mình recommend dùng dải 192.168.10.0 mask 255.255.255.0 (như hình).

## Hướng dẫn cài đặt Centos7 và cấu hình tham số 
### Cài đặt centos7 lên máy ảo (VM)
Đầu tiên các bạn download bộ cài Centos7 [ở đây](http://centos-hcm.viettelidc.com.vn/7/isos/x86_64/), nhớ chọn đúng file "**CentOS-7-x86_64-Minimal-2009.iso**" cho nó nhẹ!

Sau khi download file về máy, thì mở VMware Workstation Pro để chuẩn bị cài đặt một VM mới. Các bạn vào **File** ==> **New Virtual Machine..** ==> **Typical** ==> Next ==> **Installer disc image file (iso):** ==> Trỏ tới file iso centos mà đã download về máy ở bước trước ==> Next

Tiếp tục điền tên của VM (tên hiển thị trên VMworkstation Pro) và nơi lưu các bạn muốn lưu máy ảo này ==> Next:
![image.png](https://images.viblo.asia/e056dd54-e856-40da-957c-21e9caa11f72.png)

Trong mục "Maximum disk size (GB)" chọn dung lượng 30GB, tick chọn "**Split virtual disk into multiple files** ==> Next.

Gần xong rồi, giờ tới bước cấu hình tài nguyên cho máy ảo. Tick vào "**Poweron this virtual machine after creation**" và ấn vào **Customize Hardware...**:
![image.png](https://images.viblo.asia/6a2fb895-d5df-453f-a3b4-d98ec2d763cf.png)

Ở đây lưu ý vài chỗ:
- Memory: Chọn 2048 (2GB)
- Processors: Chọn 1 processor * 2 core. Nếu máy bạn chip xịn thì có thể tăng lên tương ứng.
![image.png](https://images.viblo.asia/0112f8e8-f60d-4deb-a513-fb48f5731530.png) 
- Network Adapter: Tick chọn vào mục "**NAT: Used to share the host's IP address**"
![image.png](https://images.viblo.asia/5cf885ca-a0d9-408f-92c3-dc296b211933.png)

Okie rồi, giờ ấn **Finish** thôi để bắt đầu cài đặt thôi.
Ở giao diện này các bạn ấn Enter để thực hiện cho nhanh không phải chờ mấy chục giây nhé:

![image.png](https://images.viblo.asia/9e229482-73a6-431c-8e6b-f6fe68510102.png)

Ở giao diện đầu tiên chọn ngôn ngữ English:
![image.png](https://images.viblo.asia/153a8317-5254-4822-8b45-95643c609374.png)











































Tiếp theo ở giao diện này ta sẽ cầu hình thời gian (datetime), phân vùng cài đặt (INSTALLATION DESTINATION) và network.
![image.png](https://images.viblo.asia/59acff6d-65d2-4a5c-820a-82117ba05675.png)

Chọn vào **DATE & TIME** và cài đặt giờ cho máy chủ + set timezone về HCM ==> Ấn **Done** khi hoàn thành.
![image.png](https://images.viblo.asia/6b223bce-a9f1-44b2-8824-0e1001276fb9.png)

Tiếp tục chọn "**INSTALLATION DESTINATION**" ==> Chọn vào ổ 30GB mà ta đã tạo ==> Done
![image.png](https://images.viblo.asia/b94462af-2ad3-4a6b-a389-42e11e4ca6d2.png)


Tiếp theo là cấu hình Hostname và network. Đầu tiên điền hostname là centos7 ==> Apply. Tiếp theo enable cái network Ethernet (ens33) cho nó thành màu xanh như hình:
![image.png](https://images.viblo.asia/dfb2d124-68a0-4b4b-8206-0552876d68a0.png)

Chọn tiếp vào **Configure...** để cấu hình IP cho nó:
![image.png](https://images.viblo.asia/187435b8-2f68-45b0-9ccf-732ddb5998e8.png)
Ta chọn vào thẻ **IPv4 Settings** và chọn **Method** từ "DHCP" thành "Manual", ấn nút **Add** và đặt thông số như sau: 

| IP | Netmask |Gateway |
| -------- | -------- | -------- |
| 192.168.10.20     | 255.255.255.0     | 192.168.10.2     |

DNS mình đặt là 2 DNS của google để VM có thể kết nối ra internet: 8.8.8.8, 8.8.4.4

***Sở dĩ ở đây mình đặt IP là 192.168.10.20 là để tránh các IP mình đã planning cho các node. Sau này khi clone máy ảo này ra mình sẽ sửa lại IP theo đúng quy hoạch.***

Hoàn thành bước trên thì ta ấn vào **Begin Installation** để bắt đầu quá trình cài đặt Centos 7.
Tiếp theo ta cần set password cho user root bằng cách ấn vào **ROOT PASSWORD** và nhập 2 lần pass vào đó. 

![image.png](https://images.viblo.asia/5e614119-b972-432a-b41e-412b12745866.png)

Ấn tiếp vào **USER CREATION** để tạo thêm một super user có tên sysadmin:
![image.png](https://images.viblo.asia/dc35570e-8117-4a8b-bccd-432ea07b128c.png)

***Các bạn lưu ý ghi nhớ password cho user root và sysadmin này để sử dụng về sau nhé!***

Khi hoàn tất cài đặt sẽ có thông báo để reboot máy ảo, các bạn ấn vào **reboot**:

![image.png](https://images.viblo.asia/06ffbc96-dd61-488f-ab02-099088fb9f4c.png)

Sau khi reboot ta có thể login bằng user/pass đã tạo bên trên và kiểm tra luôn IP của máy ảo:

![image.png](https://images.viblo.asia/f037a7b1-7198-4fb3-9200-c58e3f2fceef.png)

Như vậy nó đã được gán thành công IP 192.168.10.20 rồi.

Tiếp theo ta dùng phần mềm SSH client để kết nối tới nó thao tác cho dễ dàng hơn là làm trực tiếp trên console của VMware workstation.

### Cấu hình tham số cho máy ảo
Đầu tiên ta cấu hình cho user sysadmin có quyền sudo không cần password. Ta sửa file /etc/sudoers và thêm vào cuối file dòng sau:
```
[sysadmin@centos7 ~]$ sudo vi /etc/sudoers
```

```
sysadmin        ALL=(ALL)       NOPASSWD: ALL
```

Sau đó ta cần kiểm tra và disable swap trên centos. Dùng lệnh sau để kiểm tra:
```
[sysadmin@centos7 ~]$ free -h
              total        used        free      shared  buff/cache   available
Mem:           1.8G        234M        1.4G        9.6M        191M        1.4G
Swap:          2.0G          0B        2.0G
[sysadmin@centos7 ~]$ cat /etc/fstab |grep -v "^#" |grep -v "^$"
/dev/mapper/centos-root /                       xfs     defaults        0 0
UUID=6472fc80-1e29-406a-9864-20962b525d37 /boot                   xfs     defaults        0 0
/dev/mapper/centos-swap swap                    swap    defaults        0 0
```
Như vậy hệ thống đang có dùng swap, và có mount ở trong cấu hình fstab. 

Để disable swap ta thực hiện 2 việc:
- Dùng lệnh disable swap: 
```
[sysadmin@centos7 ~]$ sudo swapoff -a
[sysadmin@centos7 ~]$ free -h
              total        used        free      shared  buff/cache   available
Mem:           1.8G        236M        1.4G        9.6M        191M        1.4G
Swap:            0B          0B          0B

```
- Xóa dòng mount swap trong file /etc/fstab (dòng nào có swap thì comment nó lại bằng dấu "#" ở đầu dòng:
```
[sysadmin@centos7 ~]$ sudo vi /etc/fstab
```

```
#/dev/mapper/centos-swap swap                    swap    defaults        0 0
```

Tới đây bạn download repo này về máy để lấy các file script cài đặt ban đầu: https://github.com/rockman88v/kubernetes_basic_course.git

Trong thư mục session02-Installation/scripts các bạn copy 2 file "**update-vm.sh**" và "**configure-vm.sh**" lên máy ảo ở thư mục /home/sysadmin (thư mục gốc của user sysadmin). Sau đó gán quyền thực thi cho 2 file script này và chạy script **configure-vm.sh**:
```
[sysadmin@centos7 ~]$ sudo chmod +x update-vm.sh
[sysadmin@centos7 ~]$ sudo chmod +x configure-vm.sh
[sysadmin@centos7 ~]$ ls -lrt
total 8
-rwxrwxr-x. 1 sysadmin sysadmin 556 Sep 14 19:10 update-vm.sh
-rwxrwxr-x. 1 sysadmin sysadmin 272 Sep 14 19:10 configure-vm.sh
[sysadmin@centos7 ~]$ ./configure-vm.sh
Removed symlink /etc/systemd/system/multi-user.target.wants/firewalld.service.
Removed symlink /etc/systemd/system/dbus-org.fedoraproject.FirewallD1.service.
net.ipv4.ip_forward = 1
```

Cơ bản tới đây là đã cài đặt và cấu hình xong một máy ảo ready cho việc cài k8s về sau. Ta sẽ tắt máy ảo nào để clone nó thành các máy ảo để cài đặt.

Tắt máy ảo từ session ssh hiện tại:
```
sudo poweroff
```

## Clone máy ảo
Vào VMware Workstation chọn máy ảo ta vừa cài ==> Chuột phải chọn Manage ==> Clone ==> Next ==> Next ==> Create a full clone:
![image.png](https://images.viblo.asia/b774b592-0690-46ad-90a0-be7ece0a31c6.png)

Đầu tiên ta thực hiện clone thành máy ảo master1 ta thực hiện đặt tên và chọn thư mục lưu máy ảo:

![image.png](https://images.viblo.asia/f7fdafac-8262-4fa7-82ed-0da0a7fd3208.png)

Sau khi hoàn thành ta chọn máy ảo mới clone xong (master1) ==> Chuột phải ==> Setting và điều chỉnh thông số RAM/CPU/HDD như planning ban đầu.

Lặp lại bước clone máy ảo thành các máy worker1, worker2 và kubespray (lưu ý điều chỉnh thông số RAM/CPU/HDD như planning ban đầu).

Riêng với máy ảo **worker2** ta sẽ add thêm cho nó một disk mới dung lượng **30GB** (sau này làm NFS server để cài storage class sẽ dùng ở các bài sau):
Chuột phải vào máy ảo worker2 ==> Setting ==> Add... ==> Hard Disk ==> SCSI ==> Create a new virtual disk ==> Đặt dung lượng 30GB + tick **split virtual disk into multiple files** ==> Next ==> Finish ==> OK

***Kết thúc quá trình clone ta được 04 máy ảo đúng theo thiết kế***.

## Cập nhật lại hostname, IP cho các VM mới clone
Sau khi clone xong 4 máy ảo, thì ta sẽ bật từng máy ảo lên để cấu hình lại cho đúng hostname/IP theo planning (vì full clone nên cả 4 máy ảo này đang được set cùng hostnam/IP).

Ví dụ với master1 ta bật lên, và cập nhật hostname/IP bằng lệnh bên dưới: 

**NOTE:**

***Nên thực hiện trên console của VMware Workstation vì sau khi chạy IP của VM sẽ thay đổi về đúng theo planning. Do đó nếu SSH từ một SSH Client thì nó sẽ bị mất kết nối sau khi chạy script***
```
[sysadmin@master1 ~]$ ./update-vm.sh master1 192.168.10.11
master1
[sysadmin@master1 ~]$ sudo systemctl restart network
[sysadmin@master1 ~]$ ifconfig ens33 |grep inet
        inet 192.168.10.11  netmask 255.255.255.0  broadcast 192.168.10.255
        inet6 fe80::9dcd:369b:47bd:f107  prefixlen 64  scopeid 0x20<link>
```
Như vậy là hostname và IP đã được update.

Thực hiện tương tự với các máy ảo còn lại. 

***Riêng với máy ảo worker2***, ta cần thêm một bước nữa là mount disk mới cho nó (ở bước trước ta đã thêm một disk cho nó)
```
[sysadmin@worker2 ~]$ lsblk
NAME            MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda               8:0    0   30G  0 disk
├─sda1            8:1    0    1G  0 part /boot
└─sda2            8:2    0   29G  0 part
  ├─centos-root 253:0    0   27G  0 lvm  /
  └─centos-swap 253:1    0    2G  0 lvm
sdb               8:16   0   30G  0 disk
sr0              11:0    1  973M  0 rom
```
Như vậy disk mới đang ở **/dev/sdb**. Ta thực hiện mount như sau:
```
[sysadmin@worker2 ~]$ sudo mkfs.ext4 /dev/sdb
mke2fs 1.42.9 (28-Dec-2013)
/dev/sdb is entire device, not just one partition!
Proceed anyway? (y,n) y
<output truncated>
Writing superblocks and filesystem accounting information: done
[sysadmin@worker2 ~]$ sudo mkdir /nfs-data
[sysadmin@worker2 ~]$ sudo mount /dev/sdb /nfs-data
[sysadmin@worker2 ~]$ df -h
Filesystem               Size  Used Avail Use% Mounted on
devtmpfs                 899M     0  899M   0% /dev
tmpfs                    910M     0  910M   0% /dev/shm
tmpfs                    910M  9.6M  901M   2% /run
tmpfs                    910M     0  910M   0% /sys/fs/cgroup
/dev/mapper/centos-root   27G  1.5G   26G   6% /
/dev/sda1               1014M  194M  821M  20% /boot
tmpfs                    182M     0  182M   0% /run/user/1000
/dev/sdb                  30G   45M   29G   1% /nfs-data
```
Như vậy disk mới đã được mount vào /nfs-data. Ta cần cấu hình thêm trong **/etc/fstab** để sau khi khởi động lại nó sẽ tự được mount lại. Ta thêm dòng sau vào file:
```
/dev/sdb                    /nfs-data  ext4  defaults        0 0
```

**Như vậy tới đây cơ bản chúng ta đã setup xong 04 VM có cấu hình đúng theo planning ban đầu**:

| Máy ảo | Role | IP | RAM | CPU | HDD | Note|
| -------- | --------  |-------- |-------- |-------- |-------- |-------- |
| master1 | master | 192.168.10.11 (NAT) | 3GB      | 2 core | 30GB |Sẽ cài thêm haproxy|
| worker1 | worker | 192.168.10.12 (NAT) | 4GB      | 2 core | 30GB | Sẽ cài thêm rancher|
| worker2 | worker | 192.168.10.13 (NAT) | 4GB      | 2 core | 30GB + 30GB| Đã mount vào /nfs-data|
| kubespray | installation server | 192.168.10.8 (NAT) | 2GB |2 core |30GB |


***Phần tiếp theo ta sẽ cấu hình VM kubespray để cài đặt cụm k8s cluster***.