# Tổng Quan Về Công Nghệ Ảo Hóa?
Theo nghĩa rộng nhất, ảo hóa là quá trình tạo ra một bản sao ảo của một thực thể nào đó. Ảo trong trường hợp này có nghĩa là một cái gì đó rất giống với bản gốc, giống đến nỗi mà bạn hầu như không thể phân biệt được nó với bản gốc, như trong cụm từ "hầu như giống nhau hoàn toàn". Còn theo định nghĩa trong công nghệ thông tin thì ảo hóa là một công nghệ được thiết kế để tạo ra tầng trung gian giữa hệ thống phần cứng máy tính và phần mềm chạy trên nó. Ý tưởng của công nghệ ảo hóa máy chủ là từ một máy vật lý đơn lẻ có thể tạo thành nhiều máy ảo độc lập. Mỗi một máy ảo đều có một thiết lập nguồn hệ thống riêng rẽ, hệ điều hành riêng và các ứng dụng riêng. Ảo hóa có nguồn gốc từ việc phân chia ổ đĩa, chúng phân chia một máy chủ thực thành nhiều máy chủ logic. Một khi máy chủ thực được chia, mỗi máy chủ logic có thể chạy một hệ điều hành và các ứng dụng độc lập.

# Hypervisor là gì?
**Hypervisor** – Phần mềm giám sát máy ảo: Là một chương trình phần mềm quản lý một hoặc nhiều máy ảo (VM). Nó được sử dụng để tạo, startup, dừng và reset lại các máy ảo. Các hypervisor cho phép mỗi VM hoặc “guest” truy cập vào lớp tài nguyên phần cứng vật lý bên dưới, chẳng hạn như CPU, RAM và lưu trữ. Nó cũng có thể giới hạn số lượng tài nguyên hệ thống mà mỗi máy ảo có thể sử dụng để đảm bảo cho nhiều máy ảo cùng sử dụng đồng thời trên một hệ thống.

Có hai loại Hypervisor chính đó là : **Native** và **Hosted**

### Loại 1 - Hypervisor Native 
- Một hypervisor ở dạng native (hay còn gọi “bare-metal”) chạy trực tiếp trên phần cứng. Nó nằm giữa phần cứng và một hoặc nhiều hệ điều hành khách (guest operating system). 

![](https://images.viblo.asia/b28f80e5-f473-4a08-a5aa-04bf2cc74429.png)

- Nó được khởi động trước cả hệ điều hành và tương tác trực tiếp với kernel. Điều này mang lại hiệu suất cao nhất có thể vì không có hệ điều hành chính nào cạnh tranh tài nguyên máy tính với nó. Tuy nhiên, nó cũng đồng nghĩa với việc hệ thống chỉ có thể được sử dụng để chạy các máy ảo vì hypervisor luôn phải chạy ngầm bên dưới.

### Loại 2 - Hypervisor Hosted
- Một hypervisor dạng hosted được cài đặt trên một máy tính chủ (host computer), mà trong đó có một hệ điều hành đã được cài đặt. 

![](https://images.viblo.asia/fd2f04da-df86-4be7-9acb-580e0720e3c7.png)

- Nó chạy như một ứng dụng cũng như các phần mềm khác trên máy tính. Hầu hết các hypervisor dạng hosted có thể quản lý và chạy nhiều máy ảo cùng một lúc. Lợi thế của một hypervisor dạng hosted là nó có thể được bật lên hoặc thoát ra khi cần thiết, giải phóng tài nguyên cho máy chủ. Tuy nhiên, vì chạy bên trên một hệ điều hành, nó khó có thể đem lại hiệu suất tương tự như một hypervisor ở dạng native. Ví dụ về các hypervisor dạng hosted bao gồm VMware Workstation, Oracle VirtualBox và Parallels Desktop for Mac.


&nbsp;



Nói chung, các hypervisor dạng hosted phổ biến cho việc sử dụng cá nhân và doanh nghiệp nhỏ, trong khi các hypervisor dạng native được sử dụng cho các ứng dụng doanh nghiệp và điện toán đám mây – cloud computing. Trong phần này chúng ta sẽ nói kỹ về một thằng hypervisor loại 1 đó là thằng Xen Hypervisor.

# Tìm Hiểu Về Xen Hypervisor
**Xen Hypervisor** là một trình giám sát máy ảo Virtual Machine Monitor (VMM)  hypervisor loại 1 và là một sản phẩm mã nguồn mở. Nó được sử dụng làm cơ sở cho một số ứng dụng thương mại mã nguồn mở khác nhau như: server virtualization, Infrastracture as a Service (IaaS), desktop virtualization, security application, embedded and hardware devices

### Một số tính năng chính
1. Size và Interface nhỏ (có kích thước khoảng 1MB). Bởi vì nó sử dụng thiết kế microkernel, với dung lượng memory và interface hạn chế cho máy guest, nên nó mạnh mẽ và an toàn hơn so với các trình ảo hóa khác.

2. Hệ điều hành không rõ ràng: Hầu hết các cài đặt chạy với Linux là do stack điều khiển chính ( còn gọi là "domain 0"). Nhưng một số hệ điều hành có thể thay thế, bao gồm NetBSD và OpenSolaris.

3. Trình điều khiển được cách ly: Xen Project hypervisor có khả năng cho phép trình điều khiển thiết bị chính của hệ thống chạy bên trong một máy ảo. Nếu trình điều khiển gặp sự cố hoặc bị xâm phạm, VM (Virtual Machine)  có chứa trình điều khiển có thể được khởi động lại mà không hề ảnh hưởng đến phần còn lại của hệ thống.

4. Paravirtualization - Ảo hóa song song : Fully paravirtualized guests đã được tối ưu như một máy ảo. Điều này cho phép guest chạy nhanh hơn nhiều so với các tiện ích mở rộng phần cứng ( Hardware Virtual Machine -  HVM). Ngoài ra, trình ảo hóa có thể chạy trên phần cứng không hỗ trợ các tiện ích mở rộng ảo hóa.

### Kiến Trúc Của XEN

Trình ảo hóa **Xen Hypervisor** chạy trực tiếp và chịu trách nghiệm xử lý CPU, bộ nhớ, bộ hẹn giờ và ngắt. Đây là chương trình đầu tiên chạy sau khi thoát khỏi bộ nạp khởi động. Một phiên bản đang chạy của máy ảo sẽ được gọi là **domain** hoặc **guest**. Một domain đặc biệt, được gọi là **domain0** chứa trình điều khiển cho tất cả các thiết bị trong hệ thống. Domain0 cũng chứa control stack và các service systems khác để quản lý hệ thống trên Xen.  Lưu ý rằng thông qua Dom0 Disaggregation, có thể chạy một số trình điều khiển dịch vụ và thiết bị này trong một máy ảo chuyên dụng: tuy nhiên đây không phải là thiết lập hệ thống thông thường.

![](https://images.viblo.asia/5c70e173-0bb8-4660-971e-33e4026319f0.png)
&nbsp;

**Guest Domain/ Virtual Machines** Là môi trường ảo hóa, mỗi môi trường chạy hệ điều hành và ứng dụng riêng của chúng. Trình ảo hóa hỗ trợ một số chế độ ảo hóa khác nhau, được mô tả chi tiết dưới đây. **Guest VM** hoàn toàn tách biệt với phần cứng: nói cách khác, chúng không có quyền truy cập vào phần cứng hoặc functions I/O. Do đó chúng còn được gọi là domain không có đặc quyền (hoặc DomU)

**Domain Điều Khiển (hoặc Dom0)** Là một máy ảo chuyên dụng có đặc quyền đặc biệt như khả năng truy cập trực tiếp vào phần cứng, xử lý tất cả các quyền truy cập vào functions I/O của hệ thống và tương tác với VM khác. Không thể sử dụng trình ảo hóa Xen mà không có Domain0, đây là VM đầu tiên được khởi động. Trong một thiết lập tiêu chuẩn, Dom0 chứa các chức năng sau:

- **System Services:** chẳng hạn như `XenStore/XenBus(XS)` để quản lý cài đặt. `Toolstack(TS)` hiển thị giao diện người dùng Xen sử dụng thiết bị mô phỏng (DE) dựa trên QEMU(Quick EMUlator) trong các hệ thống được sử dụng bởi Xen.
- **Native Device Drivers:** Dom0 là nguồn của trình điều khiển thiết bị vật lý và do đó hỗ trợ phần cứng riêng cho hệ thống Xen.
- **Virtual Device Drivers:** Dom0 chứa trình điều khiển thiết bị ảo (còn được gọi back-ends)
- **Toolstack:** Cho phép người quản lý việc tạo, hủy và cấu hình máy ảo. Bộ công cụ hiển thị giao diện được điều khiển bởi bảng điều khiển dòng lệnh, giao diện đồ họa hoặc bởi cloud orchestration stack như OpenStack hoặc CloudStack. Lưu ý rằng một số công cụ khác nhau có thể được sử dụng với Xen.

# Công Cụ Ảo Hóa Cho Web Server
### Công nghệ của Xen Citrix
Đây là giải pháp ảo hóa miễn phí phù hợp với các doanh nghiệp vừa và nhỏ. XenServer cung cấp những tính năng cao cấp không trả phí bao gồm:
- Hỗ trợ số lượng máy chủ không giới hạn, máy ảo và bộ nhớ vật lý.
- Cho phép chuyển đổi từ một máy chủ ảo thành một máy chủ vật lý và ngược lại nếu cần (tính năng này có tính phí ).
- Chia sẻ hệ thống lưu trữ SAN và NAS giữa các máy chủ.
- Quản lý dễ dàng các máy chủ ảo từ một nơi duy nhất.
- Khi máy chủ vật lý bị lỗi, những máy ảo bị ảnh hưởng sẽ được tự động khởi động trên một máy chủ vật lý khác.
- Một thư viện máy ảo mẫu được cấu hình sẵn.
- Quản lý tập trung việc cập nhật các bản vá lỗi cho máy chủ ảo
- Nhân bản dễ dàng các máy chủ ảo từ máy chủ vật lý này sang máy chủ vật lý khác.
- XenServer là mã nguồn mở nên có ưu thế là nhiều người cùng đóng góp và xây dựng.
- XenServer tương thích hầu hết với phần cứng hiện tại.

### Xen Desktop
Đây là giải pháp ảo hóa Desktop của Citrix. XenDesktop sẽ phân phối giao diện người dùng đến bất cứ đâu. Các tính năng bao gồm: 
- Người dùng có thể truy cập vào giao diện người dùng của họ ở bất kì đâu và trên nhiều thiết bị hỗ trợ khác nhau như PC, Mac, Smart Phone, ...
- Được tối ưu hóa hiệu suất và bảo mật cho người dùng.
- Tương thích với hầu hết hết thiết bị người dùng đầu cuối.

### Xen App
**XenApp**: là giải pháp ảo hóa ứng dụng của Citrix cho phép người dùng kết nối trực tiếp đến ứng dụng Windows thông qua một máy Desktop hay một trình duyệt web. Những tính năng bao gồm:
- Truy cập ứng dụng Windows trên các thiết bị sử dụng hệ điều hành không thuộc Windows có hơn 30 hệ điều hành được hỗ trợ .
- Giải pháp này yêu cầu chỉ một bản sao ảo của ứng dụng như là Office được cài đặt, trong khi nó cho phép số lượng không giới hạn người dùng truy cập và sử dụng. 
- Ứng dụng có thể được truyền đi trực tiếp từ máy chủ đến người dùng đang làm việc trong mạng cục bộ hay ở xa cho phép người dùng tải và truy cập ứng dụng trong khi đang Offline. Tương thích với hầu hết hết thiết bị người dùng đầu cuối

### Lịch Sử
XenServer là sản phẩm của dự án phát triển mã nguồn mở Xen, được hãng XenSource thực hiện từ năm 2002. Đến năm 2007, hãng Citrix mua lại XenSource và vì thế sản phẩm này trở thành của Citrix. XenServer sử dụng công nghệ “paravirtualization”, cho phép hệ điều hành của máy ảo (hay còn gọi là hệ điều hành guest OS) có thể tương tác với lớp ảo hóa để tăng hiệu quả và tốc độ máy ảo. Sử dụng paravirtualization có thể mang lại tốc độ hoạt động nhanh hơn, nhưng yêu cầu hệ điều hành của máy ảo phải có hỗ trợ một số tính năng liên quan đến ảo hóa.

#### Hướng dẫn cài đặt 
Nếu nói tiếp ở bài này thì rất dài nhưng mình có đọc được một bài viết của anh @hoangminhung về phần cài đặt thằng này khá là chi tiết mọi người có thể đọc tại đây: **[Hướng dẫn sử dụng XenServer - Công nghệ ảo hóa xịn mà không mất tiền !](https://viblo.asia/p/huong-dan-su-dung-xenserver-cong-nghe-ao-hoa-xin-ma-khong-mat-tien-bJzKmLR659N)**

&nbsp;
&nbsp;
&nbsp;


## Nguồn 
https://viblo.asia/p/tan-man-ao-hoa-ai-cung-biet-nhung-cu-the-no-la-gi-Do754NV3ZM6
https://wiki.xen.org/wiki/Xen_Project_Software_Overview