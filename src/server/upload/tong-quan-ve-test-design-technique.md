TEST DESIGN TECHNIQUE

# A. Test Design Technique là gì?
Kỹ thuật kiểm thử phần mềm giúp chúng ta thiết kế một cách đầy đủ nhất các trường hợp kiểm thử. Vì việc thử nghiệm toàn diện là không thể (EXHAUSTIVE testing is not possible); Kỹ thuật kiểm tra thủ công (Manual Testing Techniques) giúp làm giảm số lượng các trường hợp kiểm thử mà vẫn đảm bảo chất lượng test, giúp xác định các phạm vi và điều kiện test mà khó nhận biết.

# B. Các dạng test design technique:
Nhìn chung, chúng ta có hai dạng chính của Kỹ thuật thiết kế kiểm thử, đó là Static Testing (kiểm thử tĩnh) và Dynamic Testing (kiểm thử động)

##  1. Static Testing: 
Static Testing hay còn gọi là Kiểm thử tĩnh là việc kiểm tra từng phần của software chủ yếu dựa trên các tài liệu của phần mềm, hoặc tự phân tích các cú pháp của code để kiểm tra logic mà không cần phải chạy phần mềm trực tiếp. 

Kiểm thử tĩnh thường bao gồm các phương thức sau:
 - Informal review: là quá trình đánh giá mà không cần hồ sơ cuộc họp đang lưu trữ, cũng không cần ghi chép lại nội dung cuộc họp. Nó được thực hiện ở bất cứ 1 tài liệu nào. Informal review chủ yếu được thực hiện giữa 2 người ở bất kỳ đâu có thể là quán cà phê, căng-tin,... Phương pháp này không cần phải tuân theo chu trình gì, nên đem lại lợi ích khá nhanh chóng và không tốn kém chi phí.
- Walkthroughs: Đây là hình thức hướng dẫn, giải thích bởi người nắm rõ về logic phần mềm nhất, nhằm mục đích chuyển giao kiến thức tới những người tham gia vào chu trình test, qua đó mọi người sẽ có đạt được sự hiểu biết nhất định. Thường thì phương pháp này sẽ truyền tải qua một buổi họp, và có người ghi chép riêng. 
- Technical review: Phương pháp này tập trung vào việc đánh giá kỹ thuật của phần mềm. Thường được dẫn dắt bởi moderator hoặc người có kiến thức kỹ thuật cùng với sự tham gia của các chuyên gia kỹ thuật. Đây là một cuộc thảo luận tập trung vào việc đạt được sự đồng thuận về nội dung kỹ thuật nhằm đưa ra quyết định, đánh giá sự thay thế, tìm kiếm lỗi, giải quyết vấn đề kỹ thuật...
- Inspection: Phương pháp này cũng được điều hành bởi moderator. Mục đích của nó là để xác định rõ vai trò của từng người trong quy trình cũng như các tiêu chuẩn đầu vào, đầu ra của phần mềm. Từ đó tìm kiếm lỗi cũng như tập hợp và phân tích để tối ưu hóa quy trình.

## 2. Dynamic Testing 
Dynamic Testing hay còn gọi là kiểm thử động, là phương pháp kiểm thử phần mềm thông qua việc dùng máy để chạy phần mềm nhằm điều tra các mã lệnh của phần mềm, nhập các giá trị đầu vào và kiểm tra xem giá trị đầu ra có như mong muốn hay không. 
Các kỹ thuật Dynamic Testing bao gồm:
        
**Structure-based (white box test)**
Kiểm thử Hộp Trắng (còn gọi là Clear Box Testing, Open Box Testing, Glass Box Testing, Transparent Box Testing, Code-Based Testing hoặc Structural Testing:
Là một phương pháp kiểm thử phần mềm trong đó tester biết về cấu trúc nội bộ / thiết kế.
Kiểm thử hộp trắng bao gồm: phân tích dòng dữ liệu, điều khiển dòng, dòng thông tin, mã thực hành, ngoại lệ và những lỗi trình bày trong hệ thống để kiểm tra những hành động của phần mềm không được định hướng trước.

**Specification-based(black box test) - Kiểm thử hộp đen**
Là phương pháp test mà người test không biết bên trong code có gì và có chức năng như thế nào.
Các lỗi thường phát hiện khi dùng phương pháp kiểm thử hộp đen là:
    + Chức năng không chính xác hoặc thiếu; 
    + Lỗi giao diện; 
    + Lỗi trong cấu trúc dữ liệu hoặc truy cập cơ sở dữ liệu bên ngoài; 
    + Hành vi hoặc hiệu suất lỗi; Khởi tạo và chấm dứt các lỗi.
Ưu điểm của phương pháp này là không cần người kiểm thử phải có trình độ cao, tuy nhiên, việc viết kịch bản test sẽ có nhiều khó khăn và khả năng lạc lối trong khi test là khá lớn, ngoài ra dữ liệu đầu vào cần cho việc test cần phải là một mẫu lớn. 

- Các kỹ thuật cần có để thực hiện Kiểm thử hộp đen:

**Phân vùng tương đương (Equivalence Partitioning)**

Là phương pháp chia miền đầu vào của một chương trình thành các lớp dữ liệu, từ đó suy dẫn ra các ca kiểm thử, thường được tiến hành theo 2 bước sau: 
B1: phân các vùng dữ liệu thành các vùng điều kiện tương đương
B2: xác định các ca kiểm thử
 
Nguyên tắc xác định các lớp tương đương:
- Nếu điều kiện đầu vào định rõ giới hạn của một mảng thì chia vùng tương đương thành 3 tình huống:
Xác định một lớp tương đương hợp lệ.
Xác định hai lớp tương đương không hợp lệ.

Ví dụ: giá trị của mật khẩu phải từ 6-24 ký tự, vậy ta có 1 lớp giá trị tương đương hợp lệ là [6-24], 2 lớp tương đương không hợp lệ là: <6 và 24>

- Nếu điều kiện đầu vào là một giá trị xác định thì chia vùng tương đương thành 3 tình huống:
Một lớp tương đương hợp lệ.
Hai lớp tương đương không hợp lệ.

Ví dụ: test font chữ = 12, vậy ta có 1 lớp giá trị tương đương hợp lệ là 12, 2 lớp tương đương không hợp lệ là: <12 và 12>

**Phân tích giá trị biên (Boundary Value Analysis)**

Test các giá trị biên của các vùng dữ liệu vào và ra. 
Các giá trị biên có thể là: Giá trị nhỏ nhất; Giá trị ngay trên giá trị nhỏ nhất; Giá trị bình thường Giá trị ngay dưới giá trị lớn nhất; Giá trị lớn nhất

Ví dụ: a <= y1 <=b thì sẽ chọn a, a+1, a+b/2, b-1, b.

**Sử dụng bảng quyết định**

Phương pháp này khắc phục được khuyết điểm của 2 phương pháp trên, đó là kiểm soát được sự kết hợp của của các giá trị đầu vào bằng cách sử dụng mô hình quan hệ logic nguyên nhân - kết quả cho các thành phần phần mềm

**State Transition Testing (Chuyển đổi trạng thái)**

Đây là một phương pháp kiểm thử mà trong đó thay đổi điều kiện đầu vào để gây ra thay đổi trạng thái trong phần mềm được kiểm thử. Trong kỹ thuật này, tester sẽ cung cấp cả giá trị kiểm thử đầu vào hợp lệ và không hợp lệ, sau đó xác định cách xử lý của hệ thống.

Có 4 thành phần chính của Mô hình Chuyển đổi trạng thái như dưới đây:
1) Xác nhận rằng phần mềm có thể nhận được.
2) Chuyển từ trạng thái này sang trạng thái khác.
3) Các sự kiện bắt nguồn từ quá trình chuyển đổi 
4) Các hành động phát sinh từ quá trình chuyển đổi

**Use case testing**

Là một kỹ thuật kiểm thử phần mềm, giúp xác định các test cases bao phủ toàn bộ hệ thống trên cơ sở chuyển giao từ điểm bắt đầu đến điểm kết thúc.
Ta có thể sử dụng Kiểm thử Use Case để tìm các liên kết còn thiếu sót hay các yêu cầu không hoàn chỉnh, từ đó tìm cách khắc phục, hệ thống sẽ hoạt động chính xác hơn.