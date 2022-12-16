## 1. Yêu cầu 

- Giả sử bạn đã biết cách login thành công bằng cách nhập trực tiếp vào parameter trong request login. Sau đó, bạn muốn login bằng nhiều account khác nhau mà chỉ cần 1 request login thì sẽ làm thế nào?. 
## 2. Kịch bản 

Kịch bản của chúng ta cần những gì nào ?

- Một file csv chứa username hoặc email và password
- Một request login 

=> Vậy làm thế nào để login được bằng n account khác nhau ?. Có rất nhiều cách, ở đây tôi sẽ hướng dẫn các bạn tìm hiểu về import data bằng CSV Data Set Config trong Jmeter

## 3. Demo 

### 3.1. Tạo file data 

Mở 1 file txt hoặc excel sau đó nhập thông tin như hình bên dưới => Save đuôi dưới dạng *filename.csv* như hình phía dưới:
![](https://images.viblo.asia/f36da371-0032-4762-b06f-a232347fe1e2.png)

Hình 1. File CSV

### 3.2. CSV Data Set Config

Để hiển thị chức năng import csv. Nhấp chuột phải vào request login => Chọn [Add] => Chọn [Config Element] => Chọn [CSV Data Set Config] như hình bên dưới :
![](https://images.viblo.asia/762128c7-5895-49f3-bf75-e354475ac9c6.png)

Hình 2. Chọn CSV Data Set Config

Mở màn hình CSV Data Set Config ra, chúng ta sẽ cùng tìm hiểu ý nghĩa:
![](https://images.viblo.asia/2c3e5a30-a37b-4ee3-8801-a830b6d558d7.png)

Hình 3. Ý nghĩa tham số
- Filename: Chọn [Browse] => Mục đích là trỏ tới file csv chúng ta đã tạo ở bước 3.1 bên trên 
- File encoding: Thông thường sẽ là utf-8
- Variable Names: Chính là tên biến chúng ta sẽ đặt, đặt tên gì là tuỳ thuộc vào bạn, miễn sao rõ ràng, dễ hiểu. Ở đây, tôi đang import data cho request login bằng email và password nên tôi sẽ đặt tên biến là email, password luôn. Lưu ý: Đặt bao nhiêu biến tuỳ thuộc và số lượng column trong file csv của bạn và cách nhau bằng dấu ,
- Ignore first line(only used if Variable Names is not empty) = True tức là dòng đầu tiên trong file sẽ bị bỏ qua. Giả sử dòng đầu tiên trong file bạn định nghĩa theo ví dụ dưới đây:

 | Email | Password |
 | -------- | -------- |
 |aaa@gmail.com   |12345678   |

 Và = False tức là sẽ đọc từ dòng đầu tiên. Chỗ này rất quan trọng, nếu file của bạn ko có tiêu đề thì mặc định set là False
 
 - Delimiter: Thông thường để mặc định là dấu phẩy để ngăn cách biến, dữ liệu trong file excel. Bạn cũng có thể thay đổi dấu ngăn cách tuỳ ý.
 - Allow quoted data?: Thông thường một vài trường hay dùng dấu ngăn cách. Ví dụ địa chỉ: Ngõ 192, cầu giấy, hà nội. Bạn nên cho trích dẫn kiểu như "Ngõ 192, cầu giấy, hà nội". Nếu không sẽ hiểu và chia thành 3 cột riêng biệt. 
 - Recycle on EOF?: Mặc định thì giá trị này là true và với mục đích là bạn muốn lặp lại file csv này nhiều lần trong Plan. 
 - Stop thread on EOF?: Mặc định thì giá trị là false. Tuy nhiên nếu bạn muốn nó dừng sau khi đọc xong hết file thì set là true 
 - Sharing mode: 
  
   + All threads: File được sử dụng chung cho toàn bộ Thread của Test Plan 
   + Current Thread Group: Chỉ sử dụng cho Thread hiện tại khi gọi các biến
   + Current Thread: Mỗi tệp sẽ được mở riêng cho từng Thread
 
###  3.3. Gọi tên biến trong request
 
 Thay vì việc nhập trực tiếp email và password vào request login. Lúc này bạn hãy gọi tên biến đã khai báo tại đây. Xem hình bên dưới: 
 
 ![](https://images.viblo.asia/b3647140-ee60-4ae2-96d0-e9953195248e.png)
Hình4. Set tên biến trong request login

### 3.4. Run Thread

Sau khi đã cấu hình xong hết. Giờ hãy chạy Thread và kiểm tra kết quả nhé ạ. 
Lưu ý: Ở đây tôi có sử dụng thêm Count. Để biết ý nghĩa của Count, xin mời hay tham khảo link demo phía dưới ạ 
> https://viblo.asia/p/phan-2-config-element-demo-counter-trong-jmeter-6J3Zgy1B5mB

![](https://images.viblo.asia/5698186f-30cc-4382-a10a-aa3358e27eec.png)
 Hình 5. Kết quả ở màn hình View Result Tree

![](https://images.viblo.asia/1cd3f84a-3ad9-4492-8d67-64e64046dc81.png)
Hình 6. Kết quả ở màn hình Summary Report