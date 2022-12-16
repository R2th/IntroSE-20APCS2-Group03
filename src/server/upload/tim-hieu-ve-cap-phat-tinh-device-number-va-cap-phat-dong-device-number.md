Bài học trước đã trình bày các bước khởi tạo char driver. Một trong những bước mà chúng ta cần thực hiện đó là yêu cầu kernel cấp phát device number. Có 2 phương pháp cấp phát device number: cấp phát động và cấp phát tĩnh. <br>
<br>
Thông thường, lập trình viên sẽ tạo ra char driver trên một máy tính, và char driver đó sẽ được sử dụng trên nhiều máy tính khác. Nếu lựa chọn phương pháp cấp phát tĩnh device number, thì device number đó có thể đã được sử dụng trên những máy tính khác, dẫn tới char driver không hoạt động được trên các máy tính ấy. Để giải quyết vấn đề này, lập trình viên nên sử dụng phương pháp cấp phát động device number.

## 1. Biểu diễn device number.
Linux kernel sử dụng cấu trúc **devt** để biểu diễn device number. Cấu trúc này có kích thước 32 bit, trong đó major number chiếm 12 bits, minor number chiếm 20 bits. Linux kernel cũng có các hàm hoặc macro để hỗ trợ chúng ta làm việc với biến kiểu **devt**. Chúng bao gồm:

![](https://images.viblo.asia/95a19f06-0805-4ca0-8bc4-4d774e49145e.PNG)

## 2. Cấp phát tĩnh
Các bước làm như sau:<br>

1. Bước 1: chọn một số không có trong /proc/devices làm major number. Cột đầu tiên chứa các major number đã được sử dụng bởi các driver khác. Vì thế, ta không chọn những số này. Ngoại trừ những số này, ta có thể chọn bất cứ số nào trong khoảng từ 0 đến (2^12 - 1) làm major number. <br>
2. Bước 2: sử dụng macro **MKDEV** để tạo ra số device number.
3.  Bước 3: gọi hàm **register_chrdev_region** để đăng ký số device number với kernel.<br><br>
Khi tháo char driver ra khỏi kernel, thì device number gắn với driver đó không còn được sử dụng nữa. Do đó, ta cần gọi hàm **unregister_chrdev_region** để giải phóng device number đó. Ta nên đặt hàm **unregister_chrdev_region** bên trong hàm kết thúc của char driver.

## 3. Cấp phát động

Trong phương pháp này, Linux kernel cung cấp một hàm là **alloc_chrdev_region**. Nhiệm vụ của hàm này là tìm ra một giá trị có thể dùng làm device number. Ta thường gọi hàm này trong hàm khởi tạo của char driver.
<br><br>
**alloc_chrdev_region( dev,firstminor, cnt, name)**
- Tham số đầu vào <br>
          -  [0]         *dev ; con trỏ này chứa giá trị trả về của hàm. Device number , đầu tiên của dải sẽ được trả về thông qua biến này.<br>
           -[1]         firsrminor : giá trị minor củ số device number đấu tiên trong dải.<br>
           - [2]       cnt : là số lượng device number mà hàm này yêu cầu cấp phát.<br>
            - [3]    *name : tên của character device. Tên này sẽ xuất hiện trong thư mục  /proc/devices
<br>
- Trả về <br>
  -  Nếu tìm được device number, hàm này sẽ trả về 0 . Devbice number đầu tiên trong dải sẽ được trả qua thông số *dev<br>
    -   Nếu không thể tìm được một device number nào, hàm sẽ trả về số nguyên âm<br><br>
        
Trong quá trình viết char driver, lập trình viên nên sử dụng phương pháp cấp phát động device number. Mục đích là để char driver đó có thể chạy được trên nhiều máy tính khác nhau. Để thực hiện cấp phát động device number, ta sẽ gọi hàm **alloc_chrdev_region** bên trong hàm khởi tạo của char driver.
<br> <br><br> 
Tham khảo: 
*     https://vimentor.com/vi/lesson/cap-phat-device-number
*     https://vimentor.com/vi/lesson/cap-phat-dong-device-number-1

<br> <br><br>