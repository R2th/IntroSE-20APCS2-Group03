# phân vùng ổ đĩa trên linux
Trong bài viết trước tôi đã giới thiệu cho các bạn về [linux và 8  điểm của hệ điều hành mạnh nhất](https://85network-share.blogspot.com/2021/08/linux-la-gi.html). hôm nay chúng ta sẽ đào sâu hơn về **linux** một tí nha!. Riêng tôi tôi đang làm việc với hệ điều hành [linux mint ](https://linuxmint.com/download.php)và thấy chủ đề này là các kiến thức cơ bản cực kỳ hữu ích trong quá trình cài đặt cũng như vận hành 1 hệ thống** linux.** Hy vọng nó sẽ giúp ích được các bạn trong quá trình học tập cài đặt cũng như vận hành** linux.**
![](https://images.viblo.asia/97b52c42-a07a-4399-ac59-e34e2d266415.jpg)

## 1. Các khái niệm cơ bản.
### 1.1 hệ thống file(file system)
    File system hiểu đợn giản đó là cách tập tin được tổ chức trên ổ đĩa (ssd, hdd), dùng để quản lý cách mà dữ liệu được đọc và lưu trữ trên thiết bị. File system có thể dùng để chỉ một phân vùng hoặc một ổ đĩa dùng để lưu trữ các tập tin và hệ thống tập tin.(hình fsx.png)
### 1.2 Master boot record (MBR)
![](https://images.viblo.asia/baf340f2-5f62-4bae-96b2-f5b4864605ef.jpg)

    Được giới thiệu vào năm 1983. MBR chứa thông tin về cách phân vùng logical và các hệ thống tệp tin được sắp xếp trên đĩa và chứa Bootloader (bộ tải khởi động) được cài đặt trên hệ điều hành. MBR hỗ trợ tối đa bốn phân vùng chính nếu muốn nhiều phân vùng hơn bạn phải thực hiện chuyển đổi 1 trong những phân vùng chính thành "extended partition" (phân vùng mở rộng) và tạo phân vùng Logical bên trong phân vùng đó, mbr sử dụng 32 bit để lưu trữ các địa chỉ khối và đối với các ổ đĩa cứng có các sector 512 byte mbr chỉ xử lý tối đa 2TB. Trên ổ đĩa MBR, dữ liệu phân vùng và dữ liệu khởi động được lưu trữ ở một vị trí. Nếu dữ liệu này bị ghi đè hoặc bị hỏng thì coi như bạn gặp rắc rối rồi đó.
### 1.3 bảng phân vùng GUID Partition Table (GPT)
    GPT viết tắt GUID (globally unique identifier ) partition table là chuẩn mới đang dần thay thế MBR. GPT liên quan với UEFI - UEFI thay thế cho BIOS, UEFI có giao diện và tính năng hiện đại hơn , và GPT cũng thay thế các hệ thống phân vùng MBR xa xưa bằng các tính năng, giao diện hiện đại hơn.
    GPT có thể có 128 phân vùng. GPT sử dụng 64 bit cho địa chỉ khối và cho các đĩa cứng có các sector 512 byte, kích thước tối đa là 9,4 ZB (9,4 × 10^21 byte) hoặc 8ZiB. 
    GPT cho phép một số lượng không giới hạn các phân vùng, và giới hạn này sẽ là hệ điều hành của bạn - Windows cho phép lên đến 128 phân vùng trên một ổ đĩa GPT, và bạn không cần phải tạo Extended partition (phân vùng mở rộng).
    ![](https://images.viblo.asia/5aebcb8e-d759-45a4-a599-1a01942596b7.png)

    GPT lưu trữ nhiều bản sao của các dữ liệu này trên đĩa, do đó bạn có thể khôi phục các dữ liệu nếu các dữ liệu này bị lỗi.
    GPT cũng lưu trữ các giá trị Cyclic Redundancy Check (CRC) để kiểm tra xem các dữ liệu này còn nguyên vẹn hay không. Nếu dữ liệu này bị lỗi, GPT sẽ phát hiện được vấn đề và cố gắng khôi phục các dữ liệu bị hư hỏng từ một vị trí khác trên ổ đĩa.
### 1.4 quá trình load một hệ thống linux.
    Sau khi ấn nút power on thì BIOS (Basic input/output system) là chương trình khởi chạy đầu tiên BIOS thực hiện  quá trình POST (Power-on Self-test) kiểm tra các thông số phần cứng trên máy tính, Quá trình POST kết thúc thành công, BIOS sẽ tìm kiếm và khởi chạy một hệ điều hành được chứa trong các thiết bị lưu trữ như ổ cứng. Hệ điều hành Linux được cài trên ổ cứng thì BIOS sẽ tìm đến MBR (Master Boot Record) để nạp vào bộ nhớ một chương trình. Chương trình này sẽ định vị và khởi động bootloader – đây là chương trình chịu trách nhiệm cho việc tìm và nạp nhân của hệ điều hành. Linux có 2 boot loader phổ biến trên Linux là GRUB và ISOLINUX. Chương trình này có mục đích: cho phép lựa chọn hệ điều hành có trên máy tính để khởi động, sau đó chúng sẽ nạp kernel của hệ điều hành đó vào bộ nhớ và chuyển quyền điều khiển máy tính cho kernel này.
Hệ th![](https://images.viblo.asia/c5772d32-65ef-4011-a56d-5846f6baa34f.jpg)
ống sử dụng phương pháp BIOS/MBR, bộ tải khởi động nằm ở khu vực đầu tiên của đĩa cứng. Kích thước của MBR chỉ là 512 byte. Trong giai đoạn này, bộ nạp khởi động kiểm tra bảng phân vùng và tìm một phân vùng có khả năng khởi động. Nó tìm thấy một phân vùng có khả năng khởi động, nó sẽ tìm kiếm bộ tải khởi động giai đoạn thứ hai.
Với hệ thống sử dụng phương pháp EFI / UEFI, phần mềm UEFI đọc dữ liệu trình quản lý khởi động để xác định ứng dụng UEFI nào sẽ được khởi chạy và từ nơi nào. Linux kernel được nạp và khởi chạy. Boot loader nạp một phiên bản dạng nén của Linux kernel. Nó tự giải nén và tự cài đặt lên bộ nhớ hệ thống nơi mà nó sẽ ở đó cho tới khi tắt máy. Kernel được khởi chạy xong, nó sẽ gọi duy nhất một chương trình tên là init. 
Gần cuối quá trình khởi động, init sẽ bắt đầu một chế độ đăng nhập text mode. Nhập tên người dùng và mật khẩu của bạn để đăng nhập và xuất hiện các dấu nhắc lệnh shell. Bước cuối cùng là đăng nhập vào hệ thống 
## 2. Phân vùng ổ cứng bằng tiện ích.
### 2.1 tiện ích fdisk: 
fdisk là tiện ích quản lý phân vùng đĩa cứng trên Linux. Sử dụng fdisk, bạn có thể xem, tạo, thay đổi kích thước, xóa, thay đổi, sao chép và di chuyển các phân vùng, fdisk cho phép tạo tối đa bốn phân vùng chính được Linux cho phép với mỗi phân vùng yêu cầu kích thước tối thiểu 40mb. Fdisk không thể sử dụng đối với bảng phân vùng GUID(GPT) và nó không hoạt động phân vùng lớn hơn 2TB

### một số lệnh trong FDISK:
sudo fdisk -l /dev/sda: xem tất cả phân vùng đĩa hiện có
sudo fdisk /dev/sda (thêm tham số m): xem tất cả lệnh Fdisk hỗ trợ
fdisk -l: xem tất cả phân vùng hiện có
fdisk -l  /dev/sda: xem phân vùng hiện có trên đĩa
### 2.2 tiện ích parted:
Parted là một chương trình để thao tác phân vùng đĩa. Nó hỗ trợ nhiều định dạng bảng phân vùng, bao gồm MS-DOS và GPT. Nó cho phép người dùng tạo, xóa, thay đổi kích thước, thu nhỏ, di chuyển và sao chép phân vùng, sắp xếp lại việc sử dụng đĩa và sao chép dữ liệu vào các đĩa cứng mới. Parted là một công cụ cấp cao hơn fdisk. Nó cho phép chúng ta tạo phân vùng khi kích thước đĩa lớn hơn 2TB nhưng fdisk không cho phép.
Một số lệnh của tiện ích Parted:
cài đặt parted trên debian/ubuntu: sudo apt-get install parted
cài đặt parted trên rhel/centos: sudo yum install parted. sau khi cài đặt thì khời chạy trên terminnal bằng lênh parted
parted -l: xem tất cả các phân vùng
## 3. quản lý phân vùng trong quá trình vận hành.
3.2 lệnh df -h: hiện thị tất cả các hệ thống tệp và việc sử dụng ở dang người đọc 
3.3 lệnh fsck: kiểm tra và sửa chữa hệ thống tệp l
3.4 lệnh e2fsck: là một bộ tập hợp các công cụ để bảo trì các kiểu hệ thống tệp ext2, ext3 và ext4.(tham số: -p tự động sửa tất cả vấn đề mà không nhắc bạn, - n chỉ thực hiện kiểm tra)
3.4 lệnh mke2fs: để tạo một hệ thống tập tin ext2/ext3/ext4 trên thiết bị
3.5 lệnh tune2fs: được sử dụng để sửa đổi các tham số có thể điều chỉnh trên các hệ thống tệp kiểu ext2, ext3 và ext4.
3.6 lệnh xfs-repair: sửa chữa một hệ thống tập tin xfs.
### Vậy là tôi đã giới thiệu xong tất cả những gì mình tìm hiểu được về phân vùng ổ đĩa trên hệ thống linux. Tôi đã cố gắng cô động hết mức có thể những gì tìm hiểu được. Hy vọng sẽ giúp ích được các bạn. Thanks!
###  85network-share! Kiến thức như một ngọn lửa càng chia sẻ càng bùng cháy mạnh mẽ.