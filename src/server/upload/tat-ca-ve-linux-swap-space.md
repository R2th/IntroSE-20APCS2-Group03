Tất cả về Linux swap space
Khi máy tính cần chạy những chương trình lớn hơn khả năng có thể của bộ nhớ vật lý (RAM), hệ điều hành sẽ sử dụng một công nghệ có tên gọi swapping. Nói nôm na thì công nghệ này sẽ dùng đến những mảng bộ nhớ tạm được lưu trên đĩa cứng, trong khi phần dữ liệu khác vẫn được chuyển vào RAM. Công nghệ này giúp bạn quản lý việc hoán đổi (swapping) tốt hơn cũng như tăng hiệu năng sử dụng.

Linux chia bộ nhớ vật lý thành các pages. swapping là một tiến trình thực hiện việc copy một page của bộ nhớ đến một không gian đã được cấu hình trước trên đĩa cứng (gọi là swap space), để giải phóng các pages của bộ nhớ. Tổng dung lượng của RAM và không gian hoán đổi (swap space) chính là tổng số bộ nhớ ảo (virtual memory)

swapping cần thiết vì 2 lý do:
1. Khi hệ thống yêu cầu một lượng bộ nhớ nhiều hơn mức RAM cho phép, chức năng hoán đổi của kernel sẽ đẩy bớt các pages được dùng ít hơn ra ngoài và gửi lượng bộ nhớ cho ứng dụng đang cần ngay lập tức.
2. Có một số pages quan trọng được sử dụng bởi 1 ứng dụng trong suốt quá trình startup, có thể chỉ được dùng cho khởi tạo thôi, sau đó không bao giờ dùng lại nữa, hệ thống có thể swap out những pages này ra, giải phóng bộ nhớ cho những ứng dụng khác, hoặc cho việc cache đĩa.

Tuy nhiên, swapping có một bất lợi. Tốc độ truy cập đĩa (milliseconds) chậm hơn từ 10 đến 1000 lần so với tốc độ truy cập RAM (nanoseconds). Thỉnh thoảng sẽ xảy ra sự trao đổi quá mức, kiểu như: một pages vừa được swapped out, ngay sau đó lại
swapped in rồi lại swapped out và cứ thế. Trong trường hợp này, hệ thống vừa phải vật lộn để tìm những phần bộ nhớ rỗi, vừa phải giữa cho các ứng dụng kia vẫn chạy. Cách tốt nhất trong tình huống này là tăng RAM lên.

Có 2 loại swap space, đó là: swap partition và swap file. swap partition là một phân vùng độc lập nằm trên đĩa cứng, chỉ có mục đích là hoán đổi (swapping), không có file nào khác nằm trên đó. swap file là một file riêng biệt nằm trên hệ thống, nó có thể nằm giữa hệ thống của bạn và các file dữ liệu

Để xem swap space trên hệ thống, bạn có thể dùng lệnh swapon -s

$ swapon -s
Filename                                Type            Size    Used    Priority
/dev/sda9                               partition       1132540 0       -1
Mỗi dòng là một swap space tách biệt trên hệ thống của bạn. Type chỉ ra rằng swap space là partition hay file. Filename như bạn thấy là sda9 (partition). Size là kích cỡ tính bằng KB của swap space. Used là lượng swap hiện đang được dùng. Priority chỉ ra swap nào sẽ được dùng trước (nếu bạn có nhiều swap). Một điều thú vị là: nếu bạn mount 2 hoặc nhiều swap space trên 2 thiết bị khác nhau với cùng độ ưu tiên, hệ thống sẽ thực hiện xen kẽ việc swapping giữa 2 swap space này để tăng performance.

Thêm 1 swap partition vào hệ thống
+ Xác định partition nào sẽ lấy làm swap

# fdisk -l
/dev/sda9         swap                    swap    defaults        0 0
+ Tạo hệ thống file swap cho nó

# mkswap /dev/sda9
+ Kích hoạt nó ngay lập tức:

# swapon /dev/sda9

+ Xác nhận xem nó đã được dùng chưa bằng lệnh:

# swapon -s

Để mount swap space tự động khi boot, bạn chỉnh sửa /etc/fstab và thêm vào một dòng tương tự như:

/dev/sda9 swap swap defaults 0 0 

Để kiểm tra xem swap space đã được mounted tự động chưa mà không cần reboot, bạn có thể gõ, swapoff -a, sau đó lại swapon -a và check bằng swapon -s

Swap file cũng hoàn toàn tương tự như swap partition. Thuận lợi của nó là không cần tìm một partition độc lập hoặc phân vùng lại đĩa cứng để thêm vào. Có thể tạo swap file bằng lệnh dd như sau:

dd if=/dev/zero of=/swapfile bs=1024 count=1048576
Lệnh này tạo một file trống có kích thước 1048576 KB (1GB), với tên gọi swapfile
Tạo và mount nó:
Code:

mkswap /swapfile
swapon /swapfile
Thêm một dòng vào /etc/fstab cũng tương tự như trên:

/swapfile swap swap defaults 0 0 

Tôi nên dành bao nhiêu dung lượng cho swap space?
Không có một nguyên tắc nào cả, nhưng mọi người thường chia theo quy luật:
+ Hệ thống Desktop: nên để bằng 2*RAM – đủ để bạn chạy một số lượng lớn các ứng dụng
+ Server: cần ít hơn (có người cho rằng chỉ cẩn để bằng 1/2*RAM). Tuy nhiên bạn cần theo dõi swap space và tăng lượng RAM nếu cần thiết
+ Older desktop (hệ thống có ít RAM – 128 MB chẳng hạn): bạn có thể dành 3*RAM cho swap, hoặc có thể để 1GB.

Với Linux kernel 2.6 có 1 tham số mới là swappiness – để bạn có thể tweak cách mà Linux hoán đổi. Tham số này có giá trị từ 0 đến 100. Giá trị cao có nghĩa là nhiều paged được swapped, giá trị thấp có nghĩa là nhiều ứng dụng được giữ trong bộ nhớ – ngay cả khi chúng không làm gì cả (idle). Giá trị mặc định của swapiness là 60, bạn có thể thay đổi nó tạm thời (reboot mới có hiệu lực thật sự) bằng lệnh sau (với root):

echo 50 > /proc/sys/vm/swappiness
Nếu bạn muốn thay đổi vĩnh viễn, có thể chỉnh vm.swappiness trong /etc/sysctl.conf

Quản lý swap space là công việc cần thiết của người quản trị hệ thống. Một kế hoạch tốt kết hợp với việc sử dụng đúng đắn sẽ đem lại nhiều lợi ích. Đừng sợ thử nghiệm, hãy luôn luôn theo dõi hệ thống của bạn, chắc chắn bạn sẽ thu được những kết quả mong muốn.

Nguồn : https://techzones.me/2019/08/23/tat-ca-ve-linux-swap-space/