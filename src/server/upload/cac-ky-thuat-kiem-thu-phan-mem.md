# 1. Kỹ thuật kiểm thử phần mềm là gì?
Kỹ thuật kiểm thử phần mềm giúp bạn thiết kế các trường hợp kiểm thử tốt hơn. Vì kiểm thử toàn diện là không thể nên kỹ thuật kiểm tra thủ công sẽ giúp giảm số lượng các trường hợp kiểm thử được thực thi trong khi tăng phạm vi kiểm thử. Chúng giúp xác định các điều kiện kiểm tra khó nhận biết.

Dưới đây là các loại kỹ thuật kiểm thử thông dụng

* Phân vùng tương đương (Equivalence Class Partitioning)
* Phân tích giá trị biên (Boundary Value Analysis (BVA) )
* Bảng quyết định (Decision Table based testing)
* Đoán lỗi (Error Guessing)

# 2. Phân vùng tương đương

Phân vùng lớp tương đương cho phép bạn phân chia tập hợp các điều kiện kiểm tra thành một phân vùng nên được coi là giống nhau. 

Phương pháp kiểm thử phần mềm này chia miền đầu vào của chương trình thành các lớp dữ liệu mà từ đó các trường hợp kiểm thử nên được thiết kế.

Với các giá trị đầu vào chia thành các vùng tương đương:
* Vùng tương đương hợp lệ: tập hợp các giá trị kiểm thử thỏa mãn điều kiện của hệ thống
* Vùng tương đương không hợp lệ: Tập hợp các giá trị kiểm thử mô tả trạng thái khác của hệ thống: sai, thiếu, không đúng,...

Mục đích :
Giảm đáng kể số lượng test case cần phải thiết kế vì với mỗi lớp tương đương ta chỉ cần test trên các phần tử đại diện.

Thiết kế Test-case bằng phân lớp tương đương tiến hành theo 2 bước:

*    Xác định các lớp tương đương
*    Xác định các ca kiểm thử

Nguyên tắc:
* 1 lớp các giá trị lớn hơn
* 1 lớp các giá trị nhỏ hơn
* n lớp các giá trị hợp lệ

**Ví dụ**:  Thiết kế testcase cho ô text chỉ cho nhập số nguyên với độ dài ký tự thuộc [1-10] hoặc [20-30]
 
Với yêu cầu trên ta có các vùng:
- nhỏ hơn 1 : vùng không hợp lệ
- [1-10] : vùng hợp lệ
- lớn hơn 10 và  nhỏ hơn 20  : vùng không hợp lệ
* [20-30] : vùng hợp lệ
* lớn hơn 30: vùng không hợp lệ
* Nhập các ký tự không phải số nguyên : vùng không hợp lệ

Vì vậy có các case:
* Case hợp lệ:

     - Nhập 5 ký tự
     
     - Nhập 25 ký tự số
* Case không hợp lệ:

     - Không nhập vào trường
     
     - Nhập 15 ký tự
     
     - Nhập số thập phân
     
     - Nhập 35 kí tự 
     
     - Nhập ký tự chữ: Tiếng việt, Tiếng anh, Full-size, Half-size
     
     - Nhập ký tự đặc biệt, space, kí tự Enter
     
     - Nhập câu lệnh SQL injection, HTML, XSS
 
 
# 3. Phân tích giá trị biên
Phân tích giá trị biên dựa trên việc kiểm thử tại các ranh giới giữa các phân vùng, Chúng ta sẽ tập trung vào các giá trị biên chứ không test toàn bộ dữ liệu. Thay vì chọn nhiều giá trị trong lớp đương tương để làm đại diện, phân tích giá trị biên yêu cầu chọn một hoặc vài giá trị là các cạnh của lớp tương đương để làm điều kiện test.

Chúng ta thường thấy rằng một số lượng lớn lỗi xảy ra tại các ranh giới của các giá trị đầu vào được xác định thay vì các giá trị giữa, còn được gọi là các giá trị biên. Từ đó đưa ra lựa chọn các test cases thực hiện giá trị đầu vào các giá trị biên.

Kỹ thuật thiết kế test cases này bổ sung cho phân vùng tương đương. Kỹ thuật kiểm thử phần mềm này dựa trên nguyên tắc: Nếu một hệ thống hoạt động tốt với các giá trị biên thì nó sẽ hoạt động tốt cho tất cả các giá trị nằm giữa hai giá trị biên.

Phân tích giá trị biên sẽ chọn các giá trị:
* Giá trị ngay dưới giá trị nhỏ nhất
* Giá trị nhỏ nhất
* Giá trị ngay trên giá trị nhỏ nhất
* Giá trị ngay dưới giá trị lớn nhất
* Giá trị lớn nhất
* Giá trị ngay trên giá trị lớn nhất

**Ví dụ**: Với ví dụ trên ta có các case:
* Không nhập ký tự nào (Giá trị ngay dưới giá trị nhỏ nhất vùng 1)
* Nhập 1 ký tự (giá trị nhỏ nhất vùng 1)
* Nhập 2 ký tự (giá trị ngay trên giá trị nhỏ nhất vùng 1)
* Nhập 9 ký tự (giá trị ngay dưới giá trị lớn nhất vùng 1)
* Nhập 10 ký tự(giá trị lớn nhất vùng 1)
* Nhập 11 ký tự(giá trị ngay trên giá trị lớn nhất vùng 1)
* Nhập 19 ký tự (giá trị ngay dưới giá trị nhỏ nhất vùng 2)
* Nhập 20 ký tự(giá trị nhỏ nhất vùng 2)
* Nhập 21 ký tự (giá trị ngay trên giá trị nhỏ nhất vùng 2)
* Nhập 29 ký tự(giá trị ngay dưới giá trị lớn nhất vùng 2)
* Nhập 30 ký tự(giá trị lớn nhất vùng 2)
* Nhập 31 ký tự(giá trị ngay trên giá trị lớn nhất vùng 2)

 
**=>** Kết  hợp kỹ thuật phân vùng tương đương với phân tích giá trị biên ta có các case:
* Không nhập ký tự nào
* Nhập 1 ký tự 
* Nhập 5 ký tự 
* Nhập 10 ký tự 
* Nhập 11 ký tự 
* Nhập 19 ký tự 
* Nhập 20 ký tự 
* Nhập 21 ký tự 
* Nhập 25 ký tự 
* Nhập 30 ký tự 
* Nhập 31 ký tự 
*  Nhập số thập phân   
*  Nhập ký tự chữ: Tiếng việt, Tiếng anh, Full-size, Half-size    
*  Nhập ký tự đặc biệt, space, kí tự Enter   
*  Nhập câu lệnh SQL injection, HTML, XSS
# 4. Bảng quyết định
Bảng quyết định còn được gọi là bảng Nguyên nhân – Kết quả (Cause-Effect). 

Kỹ thuật kiểm thử phần mềm này được sử dụng cho các chức năng cần  sự kết hợp của các yếu tố đầu vào các biến. 

**Ví dụ**: Nút Submit phải được enable nếu người dùng đã nhập tất cả các trường bắt buộc.

Đầu tiên là xác định đấu ra của các chức năng có phụ thuộc vào sự kết hợp của các đầu vào. Nếu có tập hợp kết hợp đầu vào lớn, thì hãy chia nó thành các tập hợp nhỏ hơn hữu ích cho việc quản lý bảng quyết định.

Đối với mọi chức năng, cần tạo một bảng và liệt kê tất cả các loại kết hợp đầu vào và đầu ra tương ứng. Điều này giúp xác định các điều kiện bị tester bỏ qua.

Các bước để tạo bảng quyết định:
* Nhập đầu vào theo hàng
* Nhập tất cả các quy tắc trong cột
* Điền vào bảng với sự kết hợp của đầu vào
* Trong hàng cuối cùng, ghi chú đầu ra so với kết hợp đầu vào.

**Ví dụ**: Nút **Submit** chỉ được enable khi tất cả các đầu vào được nhập bởi người dùng cuối.
 
![](https://images.viblo.asia/a1543971-7caa-4b0d-9a66-746f560d705a.png)



# 5. Đoán lỗi
Đoán lỗi là một kỹ thuật kiểm thử phần mềm dựa trên việc đoán lỗi có thể chiếm ưu thế trong code. Đây là một kỹ thuật dựa trên kinh nghiệm, trong đó nhà phân tích kiểm thử sử dụng kinh nghiệm của mình để đoán phần có vấn đề hoặc có lỗi của ứng dụng kiểm thử.

Kỹ thuật xác định danh sách các lỗi có thể xảy ra hoặc các tình huống dễ xảy ra lỗi. Sau đó, người kiểm thử viết test cases để tìm kiếm những lỗi đó. Để thiết kế các test cases dựa trên kỹ thuật kiểm thử phần mềm này, nhà phân tích có thể sử dụng các kinh nghiệm trong quá khứ để xác định các điều kiện.

Cách đoán lỗi:
* Tester nên sử dụng kinh nghiệm trước đây để kiểm thử các ứng dụng tương tự
* Hiểu biết về hệ thống đang kiểm thử
* Kiến thức về các lỗi thực hiện điển hình
* Nhớ những chức năng phức tạp trước đây
* Đánh giá lịch sử dữ liệu và kết quả kiểm thử

## Kết luận
Trên đây, mình đã giới thiệu một số kỹ thuật thường sử dụng để thiết kế testcase, vừa tiết kiệm thời gian vưa tăng độ bao phủ của testcase). Tùy vào spec của từng hệ thống để áp dụng các kỹ thuật phù hợp

## Tài liệu tham khảo
https://www.guru99.com/software-testing-techniques.html