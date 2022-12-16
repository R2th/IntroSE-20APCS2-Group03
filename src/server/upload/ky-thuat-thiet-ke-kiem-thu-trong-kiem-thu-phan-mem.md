# I/ Thiết kế kiểm thử là gì?
* Kỹ thuật thiết kế kiểm thử giúp chúng ta thiết kế một cách đầy đủ nhất các trường hợp kiểm thử. Vì việc test toàn diện là không thể; 
* Kỹ thuật thiết kế kiểm thử giúp làm giảm số lượng các trường hợp kiểm thử mà vẫn đảm bảo chất lượng test, giúp xác định các phạm vi và điều kiện test mà khó nhận biết.
# II/ Phân loại các kỹ thuật thiết kế kiểm thử
Có 2 dạng chính của kỹ thuật thiết kế kiểm thử:
* Static Testing (Kiểm thử tĩnh)
* Dynamic Testing (Kiểm thử động)
![](https://images.viblo.asia/e530b795-79f0-41d5-adda-0bbe6313a1de.jpg)

## 1. Static Testing (Kiểm thử tĩnh)
Static Testing hay còn gọi là Kiểm thử tĩnh là việc kiểm tra từng phần của phần mềm, chủ yếu dựa trên các tài liệu của phần mềm, hoặc tự phân tích các cú pháp của code để kiểm tra tính logic mà không cần phải chạy phần mềm một cách trực tiếp.
Các loại Static Testing:
* Informal review: là quá trình đánh giá mà không cần hồ sơ cuộc họp, cũng không cần ghi chép lại nội dung cuộc họp. Informal review chủ yếu được thực hiện giữa 2 người ở bất kỳ đâu có thể là quán cà phê, căng-tin,... Phương pháp này không cần phải tuân theo chu trình gì, nên đem lại lợi ích khá nhanh chóng và không tốn kém chi phí.
* Walkthroughs: Đây là hình thức hướng dẫn, giải thích bởi người nắm rõ về logic phần mềm nhất, nhằm mục đích chuyển giao kiến thức tới những người tham gia vào chu trình test, qua đó mọi người sẽ có đạt được sự hiểu biết nhất định. Thường thì phương pháp này sẽ truyền tải qua một buổi họp, và có người ghi chép riêng.
* Technical review: Phương pháp này tập trung vào việc đánh giá kỹ thuật của phần mềm. Thường được dẫn dắt bởi moderator hoặc người có kiến thức kỹ thuật cùng với sự tham gia của các chuyên gia kỹ thuật. Đây là một cuộc thảo luận tập trung vào việc đạt được sự đồng thuận về nội dung kỹ thuật nhằm đưa ra quyết định, đánh giá sự thay thế, tìm kiếm lỗi, giải quyết vấn đề kỹ thuật...
* Inspection: Phương pháp này cũng được điều hành bởi moderator. Mục đích của nó là để xác định rõ vai trò của từng người trong quy trình cũng như các tiêu chuẩn đầu vào, đầu ra của phần mềm. Từ đó tìm kiếm lỗi cũng như tập hợp và phân tích để tối ưu hóa quy trình.
## 2. Dynamic Testing (Kiểm thử động)
### Kỹ thuật specification-based
Nhóm kỹ thuật specification-based chỉ tập trung kiểm thử những yếu tố bên ngoài của hạng mục kiểm thử. Chúng có thể là các đặc điểm kỹ thuật, thiết kế, cách vận hành bên ngoài,… Nhờ đó, tester có thể test chất lượng bên ngoài mà không làm hỏng cấu trúc bên trong phần mềm. 
Nhóm kỹ thuật này gồm có:

**a. Phân vùng tương đương (Equivalence Partitioning)**

Là phương pháp chia miền đầu vào của một chương trình thành các lớp dữ liệu, từ đó suy dẫn ra các ca kiểm thử, thường được tiến hành theo 2 bước sau: 
- B1: phân các vùng dữ liệu thành các vùng điều kiện tương đương 
- B2: Xác định các ca kiểm thử

***Nguyên tắc xác định các lớp tương đương:***

* Nếu điều kiện đầu vào định rõ giới hạn của một mảng thì chia vùng tương đương thành 3 tình huống: Xác định một lớp tương đương hợp lệ. Xác định hai lớp tương đương không hợp lệ.
Ví dụ: giá trị của mật khẩu phải từ 6-24 ký tự, vậy ta có 1 lớp giá trị tương đương hợp lệ là [6-24], 2 lớp tương đương không hợp lệ là: <6 và 24>
* Nếu điều kiện đầu vào là một giá trị xác định thì chia vùng tương đương thành 3 tình huống: Một lớp tương đương hợp lệ. Hai lớp tương đương không hợp lệ.
Ví dụ: test font chữ = 12, vậy ta có 1 lớp giá trị tương đương hợp lệ là 12, 2 lớp tương đương không hợp lệ là: <12 và 12>.

**b. Phân tích giá trị biên (Boundary Value Analysis)**

Test các giá trị biên của các vùng dữ liệu vào và ra.
- 2 cách tiếp cận:
* Kiểm tra 2 giá trị: Có 4 test cases (Nhỏ nhất, Sát dưới mức nhỏ nhất, Sát trên mức lớn nhất, Lớn nhất). Ví dụ: 
![](https://images.viblo.asia/0df03db1-0136-45bf-9235-45bdd00bfc94.png)
* Kiểm tra 3 giá trị: Có 6 test cases (Nhỏ nhất, Sát dưới mức nhỏ nhất, Sát trên mức nhỏ nhất, Lớn nhất, Sát dưới mức lớn nhất, Sát trên mức lớn nhất). Ví dụ:
![](https://images.viblo.asia/2c63afd4-6ea4-4125-87e1-39fb3842f5f3.png)

**c. Bảng quyết định (Decision Table Testing)**

Bảng quyết định là một kỹ thuật tốt khi input có nhiều điều kiện và có nhiều action output. Giúp giảm thời gian chạy thử nhưng vẫn giữ đủ độ bao phủ của test. 
- Các bước thực hiện:
1. Liệt kê tất cả các điều kiện và action
2. Tính số lượng các trường hợp tổ hợp có thể
3. Điền các tổ hợp vào Bảng
4. Lược bỏ các tổ hợp test và đưa ra action cho các trường hợp test.
- Ví dụ về bảng quyết định:
![](https://images.viblo.asia/1c44da57-b7e8-4762-bb55-8d895367260a.png)

**d. Chuyển đổi trạng thái (State Transition Testing)**

Đây là một phương pháp kiểm thử mà trong đó dựa vào thay đổi điều kiện đầu vào gây ra thay đổi trạng thái trong phần mềm được kiểm thử. Trong kỹ thuật này, tester sẽ cung cấp cả giá trị kiểm thử đầu vào hợp lệ và không hợp lệ, sau đó xác định cách xử lý của hệ thống.
- Các bước tạo bảng chuyển đổi trạng thái:
1. Liệt kê tất cả các trạng thái từ biểu đồ chuyển đổi trạng thái vào cột đầu tiên của bảng.
2. Liệt kê tất cả các kết hợp event/condition
3. Tạo bảng với trong đó, mỗi hàng sẽ cho 1 trạng thái với kết hợp event/condition

* Mỗi hàng bao gồm 4 trường:
    * Current state
    * Event/condition
    * Action
    * New state

Ví dụ về bảng chuyển đổi trạng thái:
![](https://images.viblo.asia/81ee841b-06e3-467a-b90e-8169305021f4.png)

**e. Use cases Testing**

Là một kỹ thuật kiểm thử phần mềm, giúp xác định các test cases bao phủ toàn bộ hệ thống trên cơ sở chuyển giao từ điểm bắt đầu đến điểm kết thúc. Ta có thể sử dụng Kiểm thử Use Case để tìm các liên kết còn thiếu sót hay các yêu cầu không hoàn chỉnh, từ đó tìm cách khắc phục, hệ thống sẽ hoạt động chính xác hơn.

### Kỹ thuật Structure-based
Nhóm kỹ thuật structure-based giúp tester kiểm thử cấu trúc và cách vận hành bên trong của phần mềm. Cấu trúc phần mềm thường bao gồm code (mã), control flow (luồng điều khiển), data flow (luồng dữ liệu),… Lúc này, tester sẽ nạp các input để thực thi code và kiểm tra đối chiếu những output thu được. Vì có liên quan đến cấu trúc phần mềm nên tester phải có kiến thức lập trình. Dưới đây là các kỹ thuật thiết kế test case thuộc nhóm structure-based:

**a. Statement testing (kiểm thử câu lệnh)**
Trong kỹ thuật statement testing, mọi câu lệnh trong cấu trúc code sẽ thực thi ít nhất một lần. Qua đó, tester có thể test được cách vận hành của toàn bộ source code (mã nguồn) phần mềm. Tuy nhiên, tester không thể kiểm thử điều kiện sai mà chỉ có thể thực thi các điều kiện đúng.

**b. Decision testing (kiểm thử quyết định)**
Decision testing sẽ thực thi, test những quyết định dựa trên decision result (kết quả quyết định). Để làm điều này, test case sẽ đi theo các control flow từ decision point (điểm quyết định). Decision testing giúp kiểm thử xem có câu lệnh không thể truy cập hay gây bất thường không.

**c. Condition testing (kiểm thử điều kiện)**
Condition testing được dùng để test các biểu thức Boolean có dạng True (đúng) hoặc False (sai). Mỗi biểu thức Boolean sẽ được thực thi ít nhất một lần bằng cả tham số True và False. Với kỹ thuật này, test case được thiết kế để những điều kiện Boolean có thể thực thi dễ dàng.

**d. Multiple condition testing (kiểm thử đa điều kiện)**
Mục đích của kỹ thuật này là kiểm thử mọi tổ hợp điều kiện có thể của quyết định. Công thức tính số tổ hợp này là 2 lũy thừa bậc N, với N là số biến điều kiện. Số lượng tổ hợp này cũng chính là số lượng test case mà bạn phải dùng.

### Kỹ thuật experience-based
Như tên gọi của mình, nhóm kỹ thuật này phụ thuộc vào hiểu biết và năng lực của tester. Những kiến thức, kinh nghiệm của tester sẽ là cơ sở để thiết kế test case. Do đó, chất lượng của các test case dựa trên kinh nghiệm sẽ hoàn toàn phụ thuộc vào tester. Nhóm kỹ thuật này được chia thành 2 loại:

**a. Exploratory testing (kiểm thử thăm dò)**
Đây là kỹ thuật test không cần chuẩn bị hay theo một lịch trình cụ thể. Khi thực hiện exploratory testing, tester sẽ vừa phân tích phần mềm, vừa thiết kế và thực thi kiểm thử. Ngoài ra, việc lên kế hoạch và lưu kết quả cũng diễn ra linh động trong quá trình kiểm thử.

**b. Error guessing (phỏng đoán lỗi)**
Error guessing được dùng để dự đoán các lỗi tiềm ẩn dựa trên kiến thức của tester. Những kiến thức này thường về cách vận hành trước đây của phần mềm, các lỗi đã và có khả năng xuất hiện, những lỗi mà tester từng phát hiện,…

Nguồn tham khảo: https://vn.got-it.ai/blog/khai-quat-ve-ky-thuat-thiet-ke-test-case-trong-kiem-thu-phan-mem