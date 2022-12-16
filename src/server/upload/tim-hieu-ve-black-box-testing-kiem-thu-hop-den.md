Chào các bạn,lại là mình đây :D.Trong bài viết lần này, mình sẽ giới thiệu cho các bạn những kỹ thuật kiểm thử đầu tiên và gần như đây là những kỹ thuật quan trọng nhất bạn cần phải nắm chắc nếu bạn muốn theo ngành kiểm thử phần mềm. Bắt đầu thôi nào ;)

## **1.  Kiểm thử hộp đen là gì?**

 Kiểm thử hộp đen là phương pháp kiểm thử phần mềm mà chức năng của phần mềm được đưa vào xem xét. Tester thực hiện kiểm thử dựa trên đầu vào và đầu ra của chương trình mà không quan tâm tới code bên trong được viết ra sao. Kiểu kiểm thử này được thực hiện hoàn toàn dựa trên bản đặc tả yêu cầu phần mềm.
 
##  **2. Các bước kiểm thử hộp đen**

Dưới đây là các bước làm chung để thực hiện kỹ thuật kiểm thử hộp đen:
- Kiểm tra sơ bộ yêu cầu và đặc tả của hệ thống.
- Chọn các giá trị đầu vào hợp lệ để xác định xem phần mềm có hoạt động đúng hay không. Đồng thời chúng ta cũng chọn cả các giá trị không hợp lệ để kiểm tra các thông báo lỗi của hệ thống.
- Tester xác định các kết quả mong đợi của đầu ra tương ứng với các giá trị đầu vào.
- Xây dựng testcase hoặc test checklist tương ứng với các giá trị đầu vào và đầu ra đã chọn.
- Thực hiện chạy các testcase.
- So sánh các kết quả thực tế khi chạy trên hệ thống so với kết quả mong đợi.
- Log bug lên hệ thống quản lý lỗi ( nếu tìm thấy lỗi).

##  **3.Các loại kiểm thử hộp đen**

Có rất nhiều loại trong phương pháp kiểm thử hộp đen , dưới đây là 1 vài phương pháp nổi bật:

*3.1. Kiểm thử chức năng*

Đây là loại kiểm thử liên quan đến các yêu cầu chức năng của hệ thống , được thực hiện bởi các kỹ sư kiểm thử phần mềm.

*3.2. Kiểm thử phi chức năng*

Các loại kiểm thử phi chức năng phổ biến thường là kiểm thử hiệu suất , kiểm thử khả năng mở rộng, kiểm thử tính khả dụng.

*3.3. Kiểm thử hồi quy*

 Là một dạng kiểm thử phần mềm để xác minh rằng phần mềm vốn đã được phát triển và kiểm thử từ trước vẫn sẽ hoạt động chính xác sau khi bị thay đổi hoặc giao tiếp với các phần mềm khác.( Wikipedia)
 
Mình sẽ lấy ví dụ cho các bạn dễ hiểu hơn về loại kiểm thử này nhé :D. Ví dụ phần mềm của chúng ta có 3 chức năng là A, B và C đã làm xong và đã được kiểm thử cẩn thận. Nhưng cho đến một ngày đẹp trời, spec của chức năng C bị thay đổi và có lẽ việc sửa ở chức năng C sẽ ít nhiều ảnh hưởng đến chức năng A và B. Do đó, ngoài việc test chức năng C thì chúng ta cũng cần test lại chức năng A và B nữa. Việc test lại các chức năng đã được test rồi như thế này được gọi là kiểm thử hồi quy.

## **4.Các công cụ sử dụng trong kiểm thử hộp đen**

-Với kiểm thử chức năng hoặc kiểm thử hồi quy, chúng ta có thể sử dụng QTP , selenium.

-Còn với kiểm thử phi chức năng, chúng ta có thể sử dụng LoadRunner , Jmeter.
 
## **5.Các kỹ thuật kiểm thử hộp đen**

Có rất nhiều phương pháp kiểm thử hộp đen nhưng trong bài viết này, mình sẽ giới thiệu cho các bạn 4 phương pháp quan trọng và phổ biến nhất đó là : Phân vùng tương đương, phân tích giá trị biên, bảng quyết định và đoán lỗi.

### *5.1. Phân vùng tương đương*

![](https://images.viblo.asia/5c20bf02-7406-491e-917d-27121d376196.png)

Đây là một kỹ thuật kiểm thử phần mềm liên quan đến việc chia các giá trị đầu vào thành các vùng tương đương hợp lệ và không hợp lệ. Với mỗi miền giá trị , chúng ta sẽ chọn một vài giá trị đại diện làm dữ liệu để test.

Ví dụ : Cho 1 ô textbox yêu cầu nhập password trong [6, 12]  kí tự.
Trong ví dụ này, chúng ta có thể chia thành các vùng tương đương như sau:
Vùng tương đương hợp lệ: 6<= password<= 12 kí tự
Vùng tương đương không hợp  lệ: <6 kí tự, >12 kí tự và để trống.

Từ đó chúng ta có thể xây dựng được các testcase như sau:
- Nhập vào password với 10 kí tự.
- Nhập vào password với 3 kí tự.
- Nhập vào password với 15 kí tự.
- Để trống password.

### *5.2. Phân tích giá trị biên*
![](https://images.viblo.asia/320370f7-08e5-452d-a6a8-18b28595f033.jpg)

Việc lựa chọn các giá trị bất kỳ trong các cùng tương đương hợp lệ và không hợp lệ có thể dẫn tới việc chúng ta sẽ bị lack lỗi ở biên. Do đó phương pháp phân tích giá trị biên được ra đời.
Xét với cùng ví dụ bên trên, trong phương pháp này, chúng ta sẽ chọn tập các giá trị biên để làm dữ liệu test như sau:
- Giá trị lớn nhất 
- Giá trị nhỏ nhất
- Giá trị lớn nhất + 1
- Giá trị nhỏ nhất -1
- Giá trị bình thường

Tương tự chúng ta sẽ được các testcase:

- Nhập vào password gồm 6 kí tự.
- Nhập vào password gồm 12 kí tự.
- Nhập vào password gồm 13 kí tự.
- Nhập vào password gồm 5 kí tự.
- Nhập vào password gồm 10 kí tự.

### *5.3. Bảng quyết định*

Đây là 1 phương pháp khá tốt khi các giá trị đầu vào có nhiều sự kết hợp.
Các bước để xây dựng bảng quyết định:
- Liệt kê tất cả các điều kiện đầu vào.
- Tính số các trường hợp kết hợp có thể ( Rules).
- Giảm thiểu các case kết hợp và quyết định các testcase.

Ví dụ: Tạo bảng quyết định cho chức năng Login với 2 điều kiện đầu vào là Email và Password. Mỗi điều kiện đầu vào có 2 kết quả trả về là True hoặc Fail. 
Số trường hợp ( Rules) = 2^ (Số điều kiện đầu vào) = 2^2 = 4.
Chúng ta sẽ xây dựng được bảng quyết định như sau:
![](https://images.viblo.asia/2313f685-4b48-4324-909d-e22f3d316a40.PNG)


### *5.4. Đoán lỗi*
![](https://images.viblo.asia/4479da75-8842-4da7-8549-2f41a7555421.PNG)

Đây là 1 kỹ thuật kiểm thử mà tester không cần tuân theo 1 luật chung nào , lỗi được tìm ra chủ yếu dựa vào kinh nghiệm của người kiểm thử.

**6.Các ưu và nhược điểm của kiểm thử hộp đen**

*Ưu điểm :*

Việc kiểm thử phần mềm trở nên khách quan hơn vì đội kiểm thử và đội phát triển làm việc độc lập.

Tester chỉ thực hiện test dưới cái nhìn của người dùng, dựa hoàn toàn theo bản đặc tả yêu cầu mà không yêu cầu phải hiểu biết về code.

Thiết kế kịch bản kiểm thử nhanh, ngay khi các yêu cầu chức năng được xác định.

*Nhược điểm:*
- Tester khó có thể hiểu được cấu trúc chương trình được xây dựng ra sao.
- Dữ liệu đầu vào là 1 khối lượng mẫu (sample) khá lớn.
- Khó khăn trong việc xác định các yếu tố đầu vào.
- Tester dễ bị rơi vào tình trạng khám phá mù, tức là họ sẽ đi tìm những lỗi mà không biết khi nào mới tìm ra. 

## Tài liệu tham khảo
https://www.guru99.com/black-box-testing.html