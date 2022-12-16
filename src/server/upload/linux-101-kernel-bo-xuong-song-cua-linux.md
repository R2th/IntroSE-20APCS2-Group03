Tiếp nối series LINUX 101, mọi người có thể xem lại bài đầu tiên của mình trong series [tại đây](https://viblo.asia/p/linux-101-bo-ngo-buoc-vao-the-gioi-linux-oOVlYWOQK8W), trong bài viết đầu tiên này mình đã giới thiệu đến các bạn một cái nhìn tổng quan nhất về Linux, nó là gì, do ai tạo ra, bao gồm những thành phần chính nào, ... Trong bài viết hôm nay mình sẽ đi sâu hơn về thành phần đầu tiên và cũng là chính yếu của Linux - Kernel.<br>
[Part 1: Bỡ ngỡ bước vào thế giới Linux](https://viblo.asia/p/linux-101-bo-ngo-buoc-vao-the-gioi-linux-oOVlYWOQK8W)
<br>

### 1. Đặt vấn đề
Trong bài viết trước mình đã đề cấp đến 4 nhiệm vụ chính của kernel bao gồm:

* Quản lý bộ nhớ hệ thống
* Quản lý các chương trình phần mềm
* Quản lý phần cứng
* Quản lý hệ thống tập tin (filesystem)

Bài viết hôm nay mình và các bạn sẽ cùng đi cụ thể từng chức năng một nhé!

### 2. Quản lý bộ nhớ hệ thống
Một trong những chức năng đầu tiên và quan trọng bậc nhất của kernel là quản lý bộ nhớ, kernel không chỉ quản lý bộ nhớ vật lý thật ( khi nói đến physical memory trong máy tính thì nó là ram chứ không phải là hdd hay ssd nhé mọi người ) mà còn có khả năng tạo và quản lý các phân vùng bộ nhớ ảo. Kernel sử dụng một phần bộ nhớ trống trên đĩa cứng (hdd hoặc ssd) của bạn làm bộ nhớ ảo, thuật ngữ trong linux gọi là **swap space** ( Phân vùng mà các bạn thường phải chọn dung lượng cho nó trong bước cài đặt linux lên máy tính ). Kernel có khả năng trao đổi nội dung qua lại giữa bộ nhớ ảo (swap) và bộ nhớ thật, điều này cho phép hệ thống **nghĩ rằng** nó có nhiều bộ nhớ hơn là sơ với thực tế.

![](https://images.viblo.asia/0fdca001-d1e3-4901-84f9-80208bf6e266.png)


Các ô nhớ được nhóm thành các blocks, các blocks này được gọi là các **pages** ( cái này các bạn học về vi xử lý, vi điều khiển chắc sẽ hiểu ), kernel sẽ kiểm soát vị trí của các pages nhớ ( ở cả bộ nhớ thật và bộ nhớ ảo) sau đó nó sẽ khởi tạo 1 bảng để kiểm soát việc pages nào đang ở bộ nhớ thật, pages nào đang ở bộ nhớ ảo ( Có thể hình dung bảng này như bảng db mà ta hay tạo trong mysql cho dễ mường tượng). Kernel sẽ theo dõi việc pages nhớ nào được sử dụng trên bộ nhớ thật và tự động chuyển các pages nhớ không được động tới trong một khoảng thời gian nhất định sang bộ nhớ ảo để giải phóng bộ nhớ thật cho các tác vụ khác. Khi một chương trình muốn truy cập tới những pages nhớ đã được chuyển ra bộ nhớ ảo thì sẽ thông báo cho kernel, kernel dọn dẹp những pages không dùng tới trong bộ nhớ thật, chuyển chúng ra bộ nhớ ảo và đưa pages đang cần xử lý vào lại bộ nhớ thật. Quá trình này sẽ tốn thời gian và hiệu năng xử lý của cpu, đó chính là lý do vì sao khi bạn chạy càng nhiều tác vụ nặng thì việc chuyển đổi giữa chúng, truy xuất các thông tin sẽ chậm chạp hơn đáng kể so với khi mở ít ứng dụng.

### 3. Quản lý chương trình phần mềm
Hệ điều hành Linux gọi một chương trình đang chạy là 1 process, một process có thể chạy ở foreground ( các ứng dụng mở bình thường và có hiển thị cho người dùng thấy trên màn hình ), hoặc có thể chạy background ( chạy ẩn ). Nhiệm vụ của kernel là quản lý tất cả các process đang chạy trên hệ thống.

<br>

Kernel sẽ được start khi hệ thống khởi động, khi kernel start nó sẽ khởi tạo một process đầu tiên cho hệ thống được gọi là **init process**, init process này sẽ có nhiệm vụ khởi chạy tất cả những process khác trên hệ thống. Khi kernel bắt đầu chạy nó load init process vào bộ nhớ ảo (swap area), sau khi init process khởi chạy xong các process liên quan của nó thì kernel sẽ dành ra một phần bộ đặc biệt trong bộ nhớ ảo để lưu trữ data + code mà các process này sử dụng tới.

![](https://images.viblo.asia/cd9f57e0-1cbb-4549-b4ac-aa7c663cf310.png)


Hệ thống Linux **thường** sẽ tạo một bảng để lưu trữ những process nào được khởi chạy cùng hệ thống, bảng này thường được lưu trong đường dẫn **/ect/inittabs.** với hầu hết các distro linux, các bạn lưu ý là hầu hết nhé vì không phải distro nào cũng được lưu tại đường dẫn đó ( vdu như với ubuntu thì bảng này được lưu tại **/etc/init.d**). Ở trên mình đã nói là trong bảng này chưá các process để khởi chạy bởi init process thật ra đây chỉ là cách diễn đạt cho các bạn dễ hình dung còn về bản chất thật sự là nó sẽ chứa các đoạn script để khởi chạy hoặc dừng các process đó. Trong này sẽ có rất nhiều script, và tất nhiên không phải là script nào cũng được chạy cùng hệ thống, vậy thì việc script nào sẽ được chạy hay không sẽ được quy định bởi cái gì? Đó là **run level**, hình dung mỗi process sẽ được đánh thứ tự ưu tiên bởi **run level**, có 5 run level trong hệ điều hành linux. Hệ thống run level được sử dụng để init process quyết định script nào sẽ khởi chạy cùng hệ thống:
* Với run level 1, chỉ những process cơ bản của hệ thống được khởi chạy kèm theo với process console terminal. Đây được gọi là single-user mode. Chế độ này chủ yếu được dùng cho những trường hợp khẩn cấp khi hệ thống có sự cố và thường là chỉ có 1 user có thể vào chế độ này đó là admin.
* Run level 3 là chế độ khởi chạy standard, phần lớn các phần mềm được khởi động cùng hệ thống.
* Chế độ mà ta hay sử dụng đó là run level 5, ở run level 5 hệ thống được khởi động cùng giao diện đồ họa cho phép người sử dụng log in vào hệ thống qua giao diện đồ họa desktop.

<br>

### 4. Quản lý phần cứng
Nhiệm vụ chính tiếp theo của kernel là quản lý phần cứng. Bất kì thiết bị phần cứng nào kết nối với hệ thống linux đều cần đưa code driver của thiết bị đó vào kernel Linux. Driver code của thiết bị cho phép kernel truyền tải dữ liệu điều khiển qua lại giữa hệ thống và thiết bị. Có 2 phương pháp được sử dụng để đưa code driver vào Linux kernel:
* Driver được biên dịch trong kernel
* Các module driver được thêm vào kernel

Trước đây cách duy nhất để thêm driver của device là cách thứ nhất, mỗi lần user kết nối thêm một thiết bị mới vào hệ thống thì bắt buộc phải recompile code của kernel, quá trình này dần trở nên không hiệu quả khi người dùng ngày càng add thêm nhièu thiết bị. Vì lý do như vậy mới phát sinh thêm phương pháp thứ 2 sử dụng các modules driver để thêm vào kernel ngay cả khi nó đang chạy và không phải recompile lại kernel, và tất nhiên thêm và dễ thì bỏ đi cũng dễ. Các module này có thể dễ dàng bỏ ra khởi kernel khi thiết bị phần cứng không còn được sử dụng nữa.

![](https://images.viblo.asia/f98ffdae-c93a-455c-9433-625ac057e129.jpg)

Hệ thống Linux nhìn nhận các thiết bị phần cứng như là các files đặc biệt được gọi là **device files**, chúng được chia làm 3 dạng device files chính, bao gồm: 
* Character: Character device files bao gồm những thiết bị có thể xử lý dữ liệu dưới dạng từng dữ liệu vào một thời điểm.
* Block: Là những thiết bị có thể xử lý một lượng dữ liệu lớn vào một thời điểm ( vdu như ổ cứng )
* Network: Cái tên nói lên tất cả chắc ko cần giải thích nhiều đúng ko ạ (:D)

### 5. Quản lý hệ thống tập tin (filesystem)
Không như các nền tảng hệ điều hành khác chỉ hỗ trợ một vài định dạng hệ thống tập tin ( các phiên bản Windows đa số chỉ hỗ trợ FAT, FAT32, NTFS, OSX trên mac thì hỗ trợ APFS, FAT, exFAT, MacOS Extended) thì Linux kernel có thể hỗ trợ vô cùng đa dạng các định dạng filesystem. Ngoài ra kernel của Linux còn giúp cho hệ thống Linux có khả năng đọc và ghi dữ liệu vào các filesystem được sử dụng bởi các nền tảng hệ điều hành khác (vdu như Windows). Dưới đây là danh sách các định dạng filesystem mà Linux hỗ trợ:


| Filesystem | Mô tả | 
| -------- | -------- |
| ext     | Linux Extended filesystem - hệ thống filesystem nguyên gốc đầu tiên của Linux |
| ext2     | Second extended filesystem, cung cấp nhiều chức năng ưu việt hơn ext     |
| ext3   | Third extended filesystem, hỗ trợ journaling     |
| ext4     | Fourth extended filesystem, hỗ trợ advanced journaling     |
| hpfs     | Fourth extended filesystem, hỗ trợ advanced journaling     |
| jfs     | IBM’s journaling filesystem     |
| iso9660     | ISO 9660 fi lesystem (CD-ROMs)     |
| minix     | MINIX fi lesystem     |
| msdos     | Microsoft FAT16     |
| ncp     | Microsoft FAT16     |
| nfs     | Network File System     |
| ntfs     | Network File System     |
| proc     | Access to system information     |
| ReiserFS     | Advanced Linux filesystem cho hiệu năng cao hơn và khả năng khôi phục đĩa     |
| smb     | BSD filesystem     |
| sysv     | BSD filesystem     |
| ufs     | BSD filesystem     |
| umsdos     | Unix-like filesystem     |
| vfat     | Windows 95 filesystem (FAT32)     |
| XFS    | High-performance 64-bit journaling filesystem     |

Bất kì đĩa cứng nào mà hệ thống Linux kết nối vào đều cần phải format ở bằng một trong các định dạng kể trên. Kernel của Linux giao tiếp với các filesystem khác nhau ( được sử dụng bởi các hệ đh khác nhau trên cùng một máy tính ) thông qua hệ thống tập tin ảo ( Virtual File System VFS).

### 6. Lời kết
Thông qua bài thứ 2 của series **LINUX 101** mình hi vọng mọi người đã có 1 cái nhìn rõ ràng hơn hiều về kernel của hệ thống Linux, nếu có câu hỏi gì các bạn có thể thảo luận ngay trong bài viết này để mình và mọi người có thể cùng giải đáp nhé.