# 1. Phân vùng tương đương(Equivalence Class)
**1.1 Khái niệm:**

**Kỹ thuật phân vùng tương đương**: là một kỹ thuật kiểm thử phần mềm có liên quan đến phân chia các giá trị đầu vào thành các phân vùng hợp lệ và không hợp lệ, sau đó chúng ta sẽ viết ra các kịch bản kiểm thử cho từng phần, chọn giá trị đại diện từ mỗi phân vùng làm dữ liệu thử nghiệm.

Phân vùng tương đương: là kỹ thuật thực hiện test theo từng class đồng giá trị (tập hợp điều kiện cùng một thao tác).

Tập hợp giá trị input có cùng một kết quả xử lý, tập hợp thời gian có cùng một kết quả xử lý, tập hợp kết quả export được xử lý cùng một giá trị nhập.

**1.2.Mục đích** 

Giảm đáng kể số lượng test case cần phải thiết kế vì với mỗi lớp tương đương ta chỉ cần test trên các phần tử đại diện.

Chọn tối thiểu một giá trị đại diện từ các class đồng giá trị để tiến hành test.

**1.3.Các bước thực hiện**

Xác định các lớp tương đương  

Xác định các ca kiểm thử

Nguyên tắc:

- 1 lớp giá trị lớn hơn
- 1 lớp giá trị nhỏ hơn
- n lớp giá trị hợp lệ

Bảng liệt kê các lớp tương đương: Chúng ta có thể liệt kê ra note, hoặc vào bảng như sau:



| Điều kiện vào/ra |Các lớp tương đương hợp lệ| Các lớp tương đương không hợp lệ |
| -------- | -------- | -------- |
|            
|     |    |









 
 

**Ví dụ:** 

Phân vùng tương đương cho nghiệp vụ: Nhập giá tiền là 1 số nguyên dương, 5 ký tự 

- Điều kiện đầu vào: Giá tiền
- Các lớp tương đương hợp lệ:
Số nguyên dương, 5 ký tự 

- Các lớp không khợp lệ: Ký tự chữ, ký tự đặc biệt, số âm, nhỏ hơn 5 ký tự, lớn hơn 5 ký tự 



 
# 2. Phân tích giá trị biên (Boundary Value Analysis)
**2.1 Khái niệm**

**Phân tích giá trị biên**: là một kỹ thuật kiểm thử phần mềm có liên quan đến việc xác định biên (ranh giới) của điều kiện mô tả cho các giá trị đầu vào và chọn giá trị ở biên và bên cạnh giá trị biên làm dữ liệu kiểm thử.

**2.2. Mục đích**

Phương pháp phân tích giá trị biên sẽ đưa ra các giá trị đặc biệt, bao gồm loại dữ liệu, giá trị lỗi, bên trong, bên ngoài biên giá trị, lớn nhất và nhỏ nhất.

**2.3 Cách thức thực hiện** 

Test giá trị biên được thực hiện theo trình tự dưới đây:

- Tìm ra đường biên
- Quyết định giá trị biên
- Quyết định giá trị để test

Một số lưu ý khi phân tích giá trị biên: 

- Luôn test giá trị "0" nếu nó nằm trong vùng kiểm tra và cả khi nó nằm ngoài vùng bởi vì 0 là giá trị khá đặc biệt

- Luôn test các chuỗi rộng nếu nó nằm trong vùng test và cả khi nó nằm ngoài vùng

![](https://images.viblo.asia/020a2469-f01f-4443-bbda-042a88edbc2d.PNG)


   Hình 2.1. Phân tích giá trị biên

Phân tích giá trị biên sẽ chọn các giá trị:

- Giá trị nhỏ nhất

- Giá trị ngay dưới giá trị nhỏ nhất

- Giá trị bình thường

- Giá trị ngay trên giá trị lớn nhất

- Giá trị lớn nhất

**Ví dụ:** 

Phân tích giá trị biên cho điểm nằm trong khoảng [0,100] :

Điểm từ 0 đến 100 có giá trị biên là:

Giá trị nhỏ nhất: 0

Giá trị lớn nhất: 100

Giá trị nhỏ hơn giá trị nhỏ nhất: -1

Giá trị lớn hơn giá trị lớn nhất: 101

Giá trị trung bình: 50

# 3. Bảng quyết định (Decision Tables)

**3.1. Khái niệm**

**Kỹ thuật bảng quyết định**: là dùng bảng để hiển thị danh sách các thao tác phần mềm được quyết định trên các điều kiện khác nhau.

**3.2. Mục đích** 

Bảng quyết định: Chú trọng vào nhiều điều kiện để thực hiện test. Đây là phương pháp tốt để áp dụng cho trường hợp cần nhiều sự kết hợp.

Bảng quyết định hỗ trợ lựa chọn test case một cách có hệ thống và có nhiều lợi ích trong việc nhận biết vấn đề tiềm ẩn và sự không rõ ràng trong bản đặc tả yêu cầu. Phương pháp này quyết định số testcase tối thiểu với độ bao phủ tối đa

**3.3. Cách thức thực hiện** 

Các bước để tạo bảng quyết định: 

- Liệt kê tất cả các điều kiện đầu vào

- Tính số lượng kết hợp có thể

- Đặt tất cả các kết hợp trong bảng

- Giảm thiểu các case kết hợp và quyết định các testcase


**Ví dụ minh họa:** 

Chức năng đăng nhập có 2 textbox là username và password, chỉ thực hiện đăng nhập thành công nếu nhập cả username và password chính xác ngược lại thì hệ thống sẽ  thông báo nhập sai và yêu cầu nhập lại.

**Bước 1**: Xác định giá trị đầu vào 

Theo công thức 2 mũ n với n là số giá trị đầu vào. Như vậy số giá trị đầu vào = 2^2 =4

![](https://images.viblo.asia/864b159d-feca-4b2e-9f29-c7db1fb31721.PNG)


**Bước 2:** Nhập các giá trị có thể xảy ra ( T là true và F là false)

![](https://images.viblo.asia/864b159d-feca-4b2e-9f29-c7db1fb31721.PNG)

**Bước 3:** Xác định các giá trị đầu ra căn cứ theo đề bài

![](https://images.viblo.asia/3a24ac20-cf15-4831-b0f4-e6a6f04cdcf5.PNG)

**Note:**
Tùy trường hợp mà chúng ta có thể áp dụng linh hoạt để lập bảng ra file note hay trên file excel làm sao cho thuận tiện nhất
# 4. Đoán lỗi (Error Guessing)
Đoán Lỗi không có quy tắc rõ ràng để kiểm thử, test case có thể được thiết kế tùy thuộc vào tình hình, hoặc hoặc luồng công việc trong các tài liệu mô tả chức năng hoặc khi một lỗi không mong muốn / không được mô tả trong tài liệu được tìm thấy trong khi hoạt động kiểm thử.
Phương pháp này sẽ dựa vào kinh nghiệm của Tester(QA) để phân tích và xác định các lỗi có thể xảy ra sau đó viết các ca kiểm thử để đưa ra các lỗi đó

**Ví dụ:** 
- Dev hay bỏ qua những giá trị biên của data input
- Dev không xử lý case input html vẫn show alert
- Chặn maxlenght rồi nhưng khi inspect element không có message thông báo lỗi
- Click nhiều lần vào 1 button Save, Create,.. tạo thành nhiều bản ghi 
- Check phân quyền, khi có nhiều account và account ở nhiều site khác nhau có thể chỉ view, chỉ edit, không thể view được,...
# Kết Luận 

Bài viết này chỉ hy vọng giúp các bạn hiểu về 4 phương pháp thường xuyên sử dụng trong phương pháp kiểm thử hộp đen. Mong rằng các bạn có thể hiểu và áp dụng linh hoạt vào công việc của mình, từ đó rút ra được nhiều kinh nghiệm cho bản thân, đặc biệt là những bạn mới bắt đầu theo học Tester(QA).Bạn có thể tham khảo Website ở link tài liệu tham khảo bên dưới để có thể học, tìm hiểu một cách tốt nhất!

Tài liệu tham khảo: 
https://techblog.vn/kiem-thu-hop-den-black-box-testing