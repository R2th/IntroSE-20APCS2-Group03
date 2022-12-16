© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Linux kernel: Hiểu về **Operating System** để tối ưu **Software**](https://viblo.asia/s/4x5xp74b5BM).

## 1) Overview
Bản chất, **Linux kernel** cũng là **software**. Tuy nhiên nó là một **open source project** rất lớn và quan trọng.

Nó là trái tim của OS, tương tác trực tiếp với hệ thống **hardware**. Tất cả **software** mà chúng ta viết ra đều phải chạy qua **kernel** sau đó đi đến **hardware** để thực thi hoặc giao tiếp với thế giới bên ngoài.

Có thể coi **kernel** là nhân bánh, được gói với nhiều lớp vỏ khác nhau. Với mỗi loại vỏ là một loại bánh khác nhau. Vỏ có thể ngon, chưa ngon, nhưng cuối cùng vẫn là tương tác kết hợp với phần nhân bên trong để làm cho chiếc bánh trở nên tuyệt vời.

Tương tự với **Linux kernel**, nó có nhiều phiên bản khác nhau, nổi tiếng và ta hay dùng hàng ngày đó là: Ubuntu, CentOS, Android, macOS...

Với series này, mình sử dụng **Ubuntu 21.10** với Docker. Nếu chưa biết Docker và cách sử dụng, các bạn có thể sử dụng VM nhé. Theo mình, thời gian **set up** và đọc qua về Docker có khi nhanh hơn so với cài mới VM.
```shell=
docker run -it ubuntu:21.10
```

## 2) Cụ thể hơn **Linux kernel** là gì?
Như mình nói ở trên, **Linux kernel** là một **software program**. Nó là chương trình được chạy đầu tiên khi máy tính khởi động. Ai sẽ làm điều đó?
> - Boot loader sẽ đọc thông tin của **kernel** được lưu trong disk (HDD, SSD), tiến hành load vào memory và chạy. 
> - Sau đó, nhường lại toàn bộ quyền điều khiển hệ thống **hardware** cho **kernel** xử lý.
> Với **Linux**, tên đầy đủ của boot loader là **GNU GRand Unified Bootloader (GRUB)**.

Ngoài ra, **Linux kernel** là một **API service**, tất nhiên không phải RESTful APIs Service nhé. Nó cung cấp API để giao tiếp với hệ thống **hardware**.

Các chương trình chúng ta viết ra (ví dụ viết bằng Java) sẽ không thể truy cập trực tiếp xuống **hardware** hoặc **kernel** mà phải thông qua nhiều level khác, trong đó có **Linux kernel API**. Vậy **Linux kernel API** là gì?

## 3) Tổng quan kiến trúc **GNU/Linux**
Hãy xem qua kiến trúc tổng quan của GNU/Linux (hệ điều hành Linux) trước. Ta sẽ thấy **Linux kernel API** bao gồm **System Call Interface**.

![](https://i.imgur.com/5Tj0Pw5.png)

Vài thành phần cần chú ý:
- **User application**. Chính là các ứng dụng desktop Skype, Chrome IntelliJ.. hoặc là các ứng dụng phần mềm mà chúng ta viết ra.
- **GNU C library (glibc)**. Hiểu đơn giản nó là các thư viện viết bằng C. Nó bao gồm các API tiêu chuẩn ví dụ như đọc/ghi file, xử lý chuỗi... hoặc thực hiện gọi **System Call Interface** xuống **kernel**.
- **User space**. Vùng không gian dành cho user, là nơi các chương trình được thực thi.
- **Kernel space**. Vùng không gian kernel, nơi kernel hoạt động và tương các với hệ thống **hardware**.
- **System Call Interface**. Hai vùng **user space** và **kernel space** hoạt động độc lập trên vùng nhớ khác nhau. **User space** không thể truy cập trực tiếp vào **Kernel space**. **System Call** là cánh cửa bí mật đi đến **kernel**. Các **User application** cần thông qua nó để yêu cầu **kernel** thực thi một nhiệm vụ. Ngoài ra **System call** bao gồm các **device files** để làm việc với **device drivers**, nói cách khác là tương tác với các thiết bị ngoại vi (mouse, keyboard...). 
 
Trên mô hình, **User application** có thể gọi trực tiếp xuống **System Call** với các ngôn ngữ low-level như C, C++ (chính là glibc). Tuy nhiên, chúng ta gọi qua **glibc** để đơn giản hóa quá trình viết code. Ví dụ để thực hiện lệnh in ra màn hình với **C** là `printf()` với 1 dòng code, nhưng bí ẩn đằng sau nó thì.. là một loạt các thao tác phức tạp khác nhau.

Ngoài **System Call**, **Linux kernel API** bao gồm một thành phần nữa để tương tác, đọc/ghi các thông tin với **kernel** là **Virtual file systems**:
- proc
- sys
- debugfs

Nếu coi **System Call** là người gác cổng từ **user space** xuống **kernel space**, thì **Linux kernel** là là người gác cổng từ **kernel space** xuống **hardware**, cụ thể là CPU. 

Đa số các ứng dụng thông thường **user process** chỉ được thực thi với quyền hạn nhất định với CPU. Tuy nhiên, với **root process**, chúng sẽ có mọi đặc quyền. CPU có những chỉ dẫn đặc biệt chỉ được thực thi trong chế độ giám sát đặc biệt (xịn sò thật).

Ngoài ra **kernel** cung cấp thêm các cơ chế liên quan đến kiểm soát quyền truy cập tới **hardware** và các **tài nguyên** khác. Đảm bảo các tương tác với **hardware/resource** diễn ra đúng trình tự và an toàn, không phải muốn làm gì cũng được nhé :joy_cat:.

Khi **kernel** được boot and run (GRUB thực thi), nó sẽ lần lượt load thêm các function hoặc divice driver cần thiết cho quá trình thực thi **user process** theo cơ chế module. Nếu các bạn đã biết Modular System trong Java 9 thì cơ chế load module trong **kernel** cũng khá giống vậy.

Như vậy, chúng ta biết rằng có thể config hệ thống **hardware** hoặc **kernel** để tăng performance cho các **software application**. Ví dụ như move tối đa các thành phần từ **user space** xuống **kernel space**, hoặc thực thi với các **root privileges**. Đón chờ trong các bài tiếp theo để hiểu rõ hơn nhé!

### Reference
- https://www.linux.org
- https://www.kernel.org/doc/html/latest

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)