### Swap là gì
Swap là khái niệm bộ nhớ ảo được sử dụng trên hệ điều hành Linux. Khi VPS/Server hoạt động, nếu hết RAM hệ thống sẽ tự động sử dụng một phần ổ cứng để làm bộ nhớ cho các ứng dụng hoạt động.
### 1.Tạo phân vùng swap - mkswap

Để tạo phân vùng swap thì chúng ta sử dụng lệnh mkswap. Có thể tạo phân vùng swap chỉ định device hoặc phân vùng swap file.   
   **Format của lệnh mkswap**
```
mkswap [option] device/swapfile
```
※Trong đó,

 [option] : có 2 options có thể chỉ định hoặc không.
*  -c: Trước khi tạo phân vùng swap, thực hiện check bad block đối với device, nếu thấy có bad block thì hiển thị count number của nó.
*  -L label: Chỉ định nhãn (label) để có thể swapon  bằng nhãn đó.

device/swapfile: chỉ định device hoặc file

**Ví dụ**

```
# mkswap /dev/sdb1　← Trường hợp chỉ định device
```
```
# mkswap /swapfile　← Trường hợp chỉ định file
```

Để chỉ định phân vùng đĩa (Disk partition) trong device thì hãy tạo kiểu phân vùng (systemID của phân vùng) là 82 (Linux swap) bằng lệnh **`fdisk`**.
```
# fdisk /dev/sdb

command  (mở help bằng m ): p 　←confirm trạng thái hiện tại

Disk / dev / sdb: 5368 MB, 5368709120 bytes
Head 255, sector 63, cylinder 652
Units = Number of cylinders of 16065 * 512 = 8225280 bytes
Sector size (logical / physical): 512 bytes / 512 bytes
I / O size (minimum / optimal): 512 bytes / 512 bytes
Disk identifier: 0x00000000

Device boot     Start point     End point     Block         Id         System
/dev/sdb1       1              652         5237158+    83         Linux
　↑systemID của phân vùng của /dev/sdb1 là 83


command  (mở help bằng m ): t 　←để thay đổi systemID của phân vùng thì input 「t」
Selected area 1
 (Hiển thị list code bằng command L ): 82 　←Để sử dụng kiểu phân vùng Linux thì input 82
Changed the system type of the area from 1 to 82 (Linux swap / Solaris)

command  (mở help bằng m ): p　←confirm lại trạng thái lần nữa

Disk / dev / sdb: 5368 MB, 5368709120 bytes
Head 255, sector 63, cylinder 652
Units = Number of cylinders of 16065 * 512 = 8225280 bytes
Sector size (logical / physical): 512 bytes / 512 bytes
I / O size (minimum / optimal): 512 bytes / 512 bytes
Disk identifier: 0x00000000

Device boot     Start point     End point     Block         Id         System
/dev/sdb1               1         652     5237158+  82  Linux swap / Solaris
　↑systemID của phân vùng đã đổi thành Linux swap là 82
　　Lưu nội dung thay đổi bằng「w」
```

Để chỉ định file trong device thì hãy tạo file dùng cho swap trước bằng lệnh **`dd`** như bên dưới.
 **Format của lệnh dd**
 ```
 # dd if=/dev/zero of=File name to create bs=blocksize(byte) count=Number of blocks
 ```

 ```
# dd if=/dev/zero of=/swapfile bs=1M count=50
※ Lệnh trên sẽ tạo swapfile với nội dung bên trong được điền toàn số 0 có dung lượng 50Mbyte

# mkswap /swapfile
mkswap: /swapfile: warning: don't erase bootbits sectors
        on whole disk. Use -f to force.
Setting up swapspace version 1, size = 51196 KiB
no label, UUID=10038d16-aea9-4b86-a895-a3fff55d2a25
 ```
### 2.Kích hoạt phân vùng swap - swapon
Để kích hoạt phân vùng swap đã tạo bằng lệnh mkswap thì chúng ta sử dụng lệnh swapon.
   **Format của lệnh swapon**
```
swapon [option] device/swapfile
```
※Trong đó,

 [option] : có 2 options có thể chỉ định hoặc không.
*  -a: Kích hoạt toàn bộ device đang là swap.
*  -s: Hiển thị trạng thái sử dụng của swap.

device/swapfile: chỉ định phân vùng swap đã tạo bằng lệnh mkswap

**Ví dụ**
```
# swapon /dev/sdb1　← Kích hoạt phân vùng swap của partition sdb1
```
```
# swapon /swapfile　← Kích hoạt phân vùng swap của file swapfile
```
```
# swapon -s　←confirm trạng thái swap
Filename    Type          Size    Used    Priority
/dev/dm-1   partition     2064376   0       -1
/dev/sdb1   partition     5237148   0       -2 　← Đang được công nhận là phân vùng swap .
/swapfile   file          51192     0       -3 　← Đang được công nhận là phân vùng swap .
```
Cũng có thể confirm phân vùng swap từ file proc/swaps 
```
# cat /proc/swaps
Filename    Type            Size    Used    Priority
/dev/dm-1   partition       2064376 0       -1
/dev/sdb1   partition       5237148 0       -2
/swapfile   file            51192   0       -3
```
### 3. Vô hiệu phân vùng swap - swapoff
Để vô hiệu phân vùng swap thì dùng lệnh swapoff
   **Format của lệnh swapoff**
```
swapoff [option] device/swapfile
```
※Trong đó,

 [option] : có thể chỉ định hoặc không.
*  -a: Vô hiệu hóa toàn bộ swap devide, swap file trong /proc/swaps, /etc/fstab.

device/swapfile: chỉ định phân vùng swap đã tạo bằng lệnh mkswap

**Ví dụ**
```
#  swapon -s　←confirm trạng thái swap
Filename    Type        Size     Used    Priority
/dev/dm-1   partition   2064376  0       -1
/dev/sdb1   partition   5237148  0       -2
/swapfile   file        51192    0       -3

# swapoff /dev/sdb1  　← Vô hiệu hóa phân vùng swap của /dev/sdb1 
# swapoff /swapfile  　← Vô hiệu hóa phân vùng swap của /swapfile 

# swapon -s　←confirm trạng thái swap
Filename                                Type            Size    Used    Priority
/dev/dm-1                               partition       2064376 0       -1
※swapfile đã bị vô hiệu hóa, không hiển thị lên nữa
```
### 4.Tự động gắn phân vùng swap
Để phân vùng swap đã tạo được tự động gắn ngay cả khi hệ điều hành được khởi động lại, hãy ghi vào /etc /fstab như sau.
```
# vi /etc/fstab

/dev/sdb1  swap   swap    defaults   0 0 　←Gắn phân vùng swap /dev/sdb1
/swapfile  swap   swap    defaults   0 0 　←Gắn phân vùng swap /swapfile
```
Các field của file fstab (thao thứ tự từ bên trái quá)
* field 1: Mô tả tên device của phân vùng swap, hoặc là tên file muốn gắn.
* field 2: Mô tả điểm gắn của file hệ thống. Để chỉ định phân vùng swap thì mô tả là swap.
* field 3: Mô tả loại file hệ thống. Để chỉ định phân vùng swap thì mô tả là swap.
* field 4: Mô tả option gắn của mỗi file hệ thống
* field 5: Mô tả có cần thiết dump file hệ thống bằng lệnh dunp hay không. 1 là cần thiết, 0 là không cần. Nếu không mô tả thì cungx là không cần.
* field 6: fsck tham chiếu để quyết định thứ tự thực hiện check của file hệ thống khi khởi động. Nếu là root file hệ thống thì cần phải ghi là 1. Ngoài ra, partition thì ghi 2. 0 thì là fsck không cần check.

### Nguồn tham khảo:
http://kazmax.zpp.jp/linux_beginner/mkswap.html

https://dev.classmethod.jp/cloud/ec2linux-swap-bestpractice/