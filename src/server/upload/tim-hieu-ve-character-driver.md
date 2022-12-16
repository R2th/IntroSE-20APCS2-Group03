Khi bắt đầu học lập trình C, chúng ta đã được làm quen với thao tác đọc dữ liệu từ bàn phím và in dữ liệu ra màn hình. Chúng ta không cần phải hiểu cấu tạo của bàn phím cũng như màn hình, nhưng chúng ta vẫn có thể đọc/ghi dữ liệu vào chúng. Vậy cái gì đã giúp chúng ta che giấu đi sự phức tạp của các thiết bị vật lý?
<br><br>
Bạn có thể trả lời rằng, đó là các hàm scanf() và printf() của thư viện C. Nhưng đó mới chỉ là phần nổi của tảng băng chìm. Bài học này sẽ giúp các bạn có một cái nhìn toàn diện về tảng băng ấy.<br><br>

* Trong Linux kernel, file được chia làm 6 loại:
1. file thông thường ( regular file)
2. thư mục ( directiry)
3. pipe
4. socket
5. symbolic link <br>
6.  ***device file ( device node)* **

## 1.Device file ( device node)

*  Với việc tạo ra device file, Linux kernel đã đánh lừa các tiến trình rằng, các char/block device cũng chỉ là các file thông thường. Do đó, các tiến trình sẽ nghĩ rằng, đọc/ghi dữ liệu từ thiết bị cũng giống như đọc/ghi dữ liệu từ file thông thường.

![](https://images.viblo.asia/5d040dc8-53db-400e-b440-693c3e0f92e7.PNG)

* Từ hình trên , chúng ta nhận thấy rằng:

   - Một device driver có thể ứng với một hoặc nhiều device file.
   -Một device driver có thể điều khiển một hoặc nhiều thiết bị.
   - Một device file có thể được sử dụng bởi nhiều tiến trình.
   -  Một tiến trình có thể cần dùng nhiều device file.

* Vì là một loại file, nên hoạt động tương tác với device file cũng tương tự như với các file thông thường. Các tương tác này bao gồm mở file (open), đóng file (close), ghi dữ liệu vào file (write), đọc dữ liệu từ file (read). Tuy nhiên, kết quả của các tương tác này thường không giống với kết quả tương tác với file thông thường. 
<br>
* Kernel sử dụng device number để biết device driver nào tương ứng với device file. Device number là một bộ gồm hai số: **major number** và **minor number**:

    -  Major number giúp kernel nhận biết device driver nào tương ứng với device file.<br>
    - Minor number giúp device driver nhận biết nó sẽ phải điều khiển thiết bị nào, nếu như device driver đó đang điều khiển nhiều thiết bị.<br>

* Khi nhiều tiến trình cùng dùng một device file, thì rất dễ xảy ra tranh chấp. Hiện tượng này gọi là race condition. 
 <br>
 Tuy nhiên, chính những giải pháp chống race condition lại khiến nảy sinh thêm một vấn đề khác. Khi trong hệ thống có nhiều tiến trình, mỗi tiến trình cùng dùng đồng thời nhiều device file khác nhau, thì hệ thống có thể bị rơi vào tình trạng deadlock.

## 2.Device number

* Device number là một thuộc tính quan trọng của device file. Nó gồm 2 số: 

    -Major number giúp kernel xác định device driver nào tương ứng với device file.<br>
    -Minor number giúp driver biết nó cần tương tác với thiết bị nào.

## 3. Cấu trúc của character driver ( char driver)

Character driver (gọi tắt là char driver) gồm 2 phần: Phần OS specific, Phần device specific
<br>
###   3.1 Phần OS specific:  

* Hàm khởi tạo: 
    1.  Yêu cầu kernel cấp phát device number.
    2. Yêu cầu kernel tạo device file.
    3.  Yêu cầu kernel cấp phát bộ nhớ cho các cấu trúc dữ liệu của driver và khởi tạo chúng.
     4.Yêu cầu khởi tạo thiết bị vật lý.
   5. Đăng ký các hàm entry point với kernel.
    6.Đăng ký hàm xử lý ngắt.<br>
    
* hàm kết thúc: Hàm này làm ngược lại những gì hàm khởi tạo đã làm.
<br>
* các hàm entry point. Ví dụ open(), release(), read(), write(), ioctl(), mmap()…

### 3.2 Phần device specific

* Nhóm các hàm khởi tạo/giải phóng thiết bị.
* Nhóm các hàm đọc/ghi vào các thanh ghi của thiết bị.<br>
        Đọc/ghi các thanh ghi dữ liệu. <br>
        Lấy thông tin từ các thanh ghi trạng thái.<br>
        Thiết lập lệnh cho các thanh ghi điều khiển.<br>
* Nhóm các hàm xử lý ngắt.
 <br> <br><br>
 
 Tham khảo:  https://vimentor.com/vi/lesson/gioi-thieu-character-driver
  <br> <br><br>