# Requirements Traceability Matrix (RTM) là gì? 

![](https://images.viblo.asia/1d359cdc-8b3c-4c7b-8d90-eb51fd24a814.png)

 Ma trận truy xuất yêu cầu (RTM) là một tài liệu cấp cao để lập bản đồ và theo dõi các yêu cầu của người dùng với các test cases để đảm bảo rằng cho  mọi yêu cầu ở tất cả mức độ kiểm thử đều đạt được.
 
Quá trình xem xét tất cả các testcases  được xác định cho bất kỳ yêu cầu nào được gọi là Truy xuất nguồn gốc. Truy xuất nguồn gốc cho phép xác định các yêu cầu nào sinh ra nhiều lỗi nhất trong quá trình kiểm thử.

Trọng tâm của bất kỳ cam kết kiểm thử nào cũng nên đạt độ bao phủ tối đa. Nghĩa là tất cả mọi thứ đều phải được kiểm thử. Mục đích của bất kỳ dự án kiểm thử nào cũng phải là phạm vi kiểm tra 100%.

RTM thiết lập một cách để đảm bảo bao phủ tất cả yêu cầu. Nó giúp tạo ra một ảnh chụp nhanh để xác định khoảng trống bao phủ. Nó cũng có thể được gọi là một metrics  xác định số lượng Testcases đã chạy qua, Pass or Fail .. cho mọi yêu cầu. 

# Tại sao cần phải truy xuất yêu cầu phần mềm. 

Ma trận truy xuất yêu cầu (RTM) giúp liên kết các yêu cầu (requiremetn), Testcases và lỗi xảy ra một cách chính xác. Toàn bộ ứng dụng được kiểm tra bằng cách truy xuất nguồn gốc yêu cầu 
Truy xuất yêu cầu đảm bảo ‘Chất lượng’ tốt của ứng dụng vì tất cả các tính năng đều được kiểm tra. Kiểm soát chất lượng có thể đạt được khi phần mềm được kiểm tra cho các tình huống không lường trước được với các lỗi nhỏ nhất và tất cả các yêu cầu chức năng và phi chức năng được thỏa mãn.

Ma trận truy xuất yêu cầu hướng ứng dụng phần mềm được kiểm thử trong khoảng thời gian quy định  , phạm vi của dự án được xác định rõ và việc thực hiện của nó đạt được theo yêu cầu và nhu cầu của khách hàng và chi phí của dự án được kiểm soát tốt.

Defect Leakages được ngăn chặn vì toàn bộ ứng dụng được kiểm thử dựa trên yêu cầu. 

![](https://images.viblo.asia/e0abdff1-a6cc-475c-b055-9a4fea1a28fe.jpg)

# Các loại Ma trận truy xuất  (Traceability Matrix)

## Forward Traceability:
 Truy xuất Yêu cầu với testcases: đảm bảo rằng dự án tiến triển theo hướng mong muốn và mọi yêu cầu đều được kiểm tra kỹ lưỡng.

![](https://images.viblo.asia/34aea1bb-3549-4571-8afb-7819edf1983b.jpg)

## Backward Traceability:

Truy xuất nguồn gốc ngược:
Các trường hợp kiểm tra được ánh xạ (mapping) với các yêu cầu trong 'Truy xuất ngược lại'. Mục đích chính của nó là đảm bảo rằng sản phẩm hiện tại đang được phát triển đang đi đúng hướng. Nó cũng giúp xác định rằng không có thêm chức năng không xác định được thêm vào và do đó phạm vi của dự án bị ảnh hưởng.

![](https://images.viblo.asia/30db8ee9-e461-4ade-8827-5eea6a21b8c8.jpg)

## Bi-Directional Traceability
**Kết hợp (Forward + Backward)**

Một ma trận truy xuất tốt có tham chiếu từ các test cases đến yêu cầu (requirement) và ngược lại (các yêu cầu đối với các testcases ). Điều này được gọi là Truy xuất nguồn gốc hai chiều. Nó đảm bảo rằng tất cả các trường hợp Kiểm thử có thể được truy xuất theo yêu cầu và mỗi yêu cầu được chỉ định có các testcases 
chính xác và hợp lệ cho chúng.

![](https://images.viblo.asia/6541e9eb-d1ce-4951-9bfa-190162bb5bf4.jpg)

# Ví dụ về RTM

1. Yêu cầu nghiệp vụ

BR1: Tùy chọn viết email

Test scenario (đặc tả kỹ thuật) cho BR1

TS1: Tùy chọn soạn thư được cung cấp.

Test Cases

Test Case 1 (TS1.TC1): Tùy chọn soạn thư được bật và hoạt động thành công.

Test Case 2 (TS1.TC2): Tùy chọn soạn thư bị tắt.


2. Lỗi

Sau khi thực hiện các test cases nếu có bất kỳ lỗi nào được phát hiện có thể được liệt kê và ánh xạ với các yêu cầu nghiệp vụ, test scenario và test cases 

Ví dụ: Nếu TS1.TC1 không thành công, tức là tùy chọn Soạn thư mặc dù đã bật không hoạt động bình thường thì lỗi có thể được ghi lại. Giả sử ID lỗi được tạo tự động hoặc được gán theo cách thủ công là D01, thì điều này có thể được ánh xạ bằng các số BR1, TS1 và TS1.TC1.

Thể hiện ở bảng dưới đây 



| Business Requirement | Test Scenario | Test Case |Defects|
| -------- | -------- | -------- |------- |
| BR1    | TS1   | TS1.TC1, TS1.TC2    |D01    |
| BR2     | TS2     | TS2.TC1, TS2.TC2, TS2.TC3    |D02 , D03  |
| BR3     | TS3     | TS1.TC1, TS2.TC1, TS3.TC1,TS3.TC2   |NIL     |


# Test coverage and Requirement Traceability ( Độ bao phủ kiểm thử và Truy xuất yêu cầu ) 

## Test coverage là gì ?

Độ bao phủ kiểm thử hay phạm vi kiểm thử được yêu cầu xác định khi bắt đầu giai đoạn kiểm thử. Nó xác định xem các testcases  được viết và thực thi có đảm bảo kiểm tra hoàn toàn ứng dụng phần mềm hay không.

## Làm thế nào để đạt được test coverage ?

Test coverage có thể đạt được bằng cách sử dụng  ‘Requirement Traceability’ ( Truy xuất yêu cầu) 

* Ánh xạ tất cả lỗi nội bộ với testcases 
* Ánh xạ lỗi mà khách hàng report với testcases để tạo bộ kiểm thử hồi quy trong tương lai 

# Các loại đặc tả yêu cầu (Requirement Specifications)

##  1) Yêu cầu nghiệp vụ :
Yêu cầu của khách hàng thực tế được liệt kê trong tài liệu được gọi là Tài liệu yêu cầu nghiệp vụ (BRS). BRS này là danh sách yêu cầu cấp cao , sau một tương tác ngắn với khách hàng.

Nó thường được chuẩn bị bởi BA (bussiness analysis).Tài liệu đặc tả yêu cầu (SRS) bắt nguồn từ BRS.

## 2) Tài liệu đặc tả yêu cầu phần mềm (SRS):
Nó là một tài liệu chi tiết có chứa tất cả các chi tiết tỉ mỉ của tất cả các yêu cầu chức năng và phi chức năng. SRS này là cơ sở để thiết kế và phát triển ứng dụng phần mềm.

## 3) Tài liệu yêu cầu dự án (PRD):
PRD là một tài liệu tham khảo cho tất cả các thành viên trong một dự án để cho họ biết chính xác những gì một sản phẩm nên làm. Nó có thể được chia thành các phần như Mục đích của sản phẩm, Tính năng sản phẩm, Tiêu chí phát hành và Lập ngân sách & Lịch biểu của dự án.

##  4) Tài liệu use case:
Đây là tài liệu giúp thiết kế và triển khai phần mềm theo yêu cầu nghiệp vụ. Nó ánh xạ các tương tác giữa một actor và 1 event  với một vai trò (role) cần được thực hiện để đạt được mục tiêu. Đây là một mô tả chi tiết từng bước về cách thực hiện một nhiệm vụ.

**Thí dụ:**

Actor: Khách hàng

Role : Tải xuống trò chơi

Tải xuống trò chơi thành công.

Use cases cũng có thể là một phần được bao gồm trong tài liệu SRS theo quy trình làm việc của tổ chức.

##  5) Tài liệu xác minh lỗi:
Nó là tài liệu có chứa tất cả các chi tiết liên quan đến lỗi. Team có thể sử dụng và sửa chữa tài liệu này cho việc fix lỗi và retest lại lỗi. Tester có thể dựa vào tài liệu này để xác định xem lỗi nào cần fix hay không cần fix, retest lỗi trên các hệ điều hành khác nhau, thiết bị khác nhau và các hệ thống được cấu hình khác nhau .

##  6) User Stories:
User Stories chủ yếu được sử dụng trong phát triển ‘Agile’ để mô tả tính năng phần mềm từ góc nhìn của người dùng cuối. User Stories xác định loại người dùng và theo cách nào và tại sao họ muốn một tính năng nhất định. Yêu cầu được đơn giản hóa bằng cách tạo User Stories.
Hiện nay, tất cả các ngành công nghiệp phần mềm đang hướng tới việc sử dụng User Stories và Agile cùng các công cụ phần mềm tương ứng để ghi lại các yêu cầu.

# Những thách thức để thu thập yêu cầu
1.  Các yêu cầu thu thập phải được chi tiết, rõ ràng, chính xác và được quy định cụ thể. Nhưng KHÔNG có biện pháp thích hợp để tính toán các chi tiết này, sự rõ ràng, chính xác và các thông số kỹ thuật được xác định rõ ràng cần thiết cho việc thu thập yêu cầu.

2. Cách giải thích của ‘BA (Bussiness Analysis)’ hoặc ‘Product Owner’ bất kỳ ai cung cấp thông tin yêu cầu là rất quan trọng. Tương tự như vậy, nhóm nhận được thông tin phải nêu rõ các giải thích hợp lý để hiểu được sự mong đợi của các bên liên quan.

      Sự hiểu biết phải được đồng bộ với cả yêu cầu nghiệp vụ và những effort thực tế cần thiết để thực hiện ứng dụng.

3. Thông tin cũng nên được bắt nguồn theo quan điểm của người dùng cuối.

4.  Các yêu cầu xung đột hoặc mâu thuẫn  của các bên liên quan tại các thời điểm khác nhau.

5. Quan điểm của người dùng cuối không được xem xét vì nhiều lý do và các bên liên quan nghĩ rằng họ “hoàn toàn” hiểu những gì cần thiết cho một sản phẩm.

6. Nguồn nhân lực thiếu kỹ năng cho ứng dụng được phát triển.

7.  Thay đổi thường xuyên 'Phạm vi' của ứng dụng hoặc thay đổi ưu tiên cho mô-đun.

8.  Yêu cầu bị thiếu, tiềm ẩn hoặc không được ghi lại .

9.  Các yêu cầu không phù hợp hoặc mơ hồ được xác định bởi khách hàng.

10.  Kết luận của tất cả các yếu tố nêu trên là ‘Thành công’ hoặc ‘Thất bại’ của một dự án phụ thuộc đáng kể vào yêu cầu.


# Làm thế nào để truy xuất yêu cầu (Requirement Traceability) có thể giúp ích được? 
## 1) Yêu cầu được thực hiện ở đâu? 

Thí dụ:

**Yêu cầu**: Thực hiện chức năng 'Soạn thư' (compose) trong ứng dụng thư.

**Triển khai**: Ở trang chính, nút ‘Soạn thư’ (compose) sẽ được đặt và truy cập.

![](https://images.viblo.asia/a1f7decd-5cb1-44ec-9f57-7f54fb8360d0.png)

## 2) Yêu cầu có cần thiết không?

Thí dụ:

**Yêu cầu**: Chỉ thực hiện chức năng ‘Soạn thư’ trong ứng dụng thư cho một số người dùng nhất định.

**Triển khai**: Theo quyền truy cập của người dùng nếu hộp thư đến email là ‘Chỉ đọc’ thì trong trường hợp này, nút ‘Soạn thư’ sẽ không được hiển thị .

##  3) Làm cách nào để diễn giải yêu cầu?

Thí dụ:

**Yêu cầu**: Chức năng 'Soạn thư' trong ứng dụng thư có phông chữ và tệp đính kèm.

**Triển khai**: Khi click vào soạn thư thì tất cả các tính năng (font chữ, tệp) sẽ được cung cấp?

* Textbody để viết email và chỉnh sửa trong các loại phông chữ khác nhau và cũng in đậm, in nghiêng, gạch dưới chúng
* Các loại tệp đính kèm (Hình ảnh, tài liệu, các email khác, v.v.)
* Kích thước tệp đính kèm (Kích thước tối đa được phép)

Vì vậy, các yêu cầu được chia nhỏ thành các yêu cầu phụ.

##  4) Những quyết định thiết kế nào ảnh hưởng đến việc thực hiện một yêu cầu?

Thí dụ:

**Yêu cầu**: Tất cả các thành phần  ‘Hộp thư đến’, ‘Thư đã gửi’, ‘Thư nháp’, ‘Spam’, ‘Thùng rác’, v.v. phải được hiển thị rõ ràng.

**Triển khai**: Các thành phần cần hiển thị sẽ được hiển thị ở định dạng ‘Tree’ hoặc ‘Tab’.

##  5) Tất cả các yêu cầu  đã được thực hiện hay chưa?

Thí dụ:

**Yêu cầu**: Tùy chọn thư 'Thùng rác' được cung cấp.

**Triển khai**: Nếu tùy chọn thư 'Thùng rác' đã được cung cấp, thì tùy chọn 'Xoá' thư (yêu cầu) phải được triển khai ban đầu và phải hoạt động chính xác. Nếu tùy chọn 'Xóa' thư hoạt động bình thường thì chỉ những email đã xóa sẽ được thu thập trong 'Thùng rác' và việc triển khai tùy chọn thư 'Thùng rác' (yêu cầu) sẽ có ý nghĩa (sẽ hữu ích).

# Ưu điểm của RTM và Test coverage 
1) Bản build được phát triển và kiểm thử có chức năng bắt buộc đáp ứng nhu cầu và kỳ vọng của ‘khách hàng’ / ‘người dùng’. Khách hàng phải có được những gì mình muốn. Để làm cho khách hàng ngạc nhiên với một ứng dụng không làm những gì được mong đợi là không phải là một trải nghiệm thỏa mãn đối với bất kỳ ai.

2) Sản phẩm cuối cùng (ứng dụng phần mềm) được phát triển và phân phối cho khách hàng phải chỉ bao gồm các chức năng cần thiết và được mong đợi. Các tính năng bổ sung được cung cấp trong ứng dụng phần mềm có thể có vẻ hấp dẫn ban đầu cho đến khi có chi phí thời gian, tiền bạc và công sức để phát triển nó.

     Các tính năng bổ sung cũng có thể trở thành một nguồn gây ra lỗi, có thể gây ra vấn đề cho khách hàng sau khi cài đặt.


3) Nhiệm vụ ban đầu của developer được xác định rõ ràng khi họ làm việc đầu tiên về việc triển khai các yêu cầu, có mức độ ưu tiên cao, theo yêu cầu của khách hàng. Nếu các yêu cầu có mức độ ưu tiên cao của khách hàng được chỉ định rõ ràng, thì các thành phần mã đó có thể được phát triển và triển khai theo ưu tiên hàng đầu.

Vì vậy, nó được đảm bảo rằng cơ hội của sản phẩm cuối cùng được vận chuyển đến khách hàng là theo yêu cầu cao nhất và theo đúng tiến độ.

4) Testers xác minh đầu tiên chức năng quan trọng nhất được thực hiện bởi developer. Khi xác minh (kiểm tra) của thành phần phần mềm ưu tiên được thực hiện trước tiên, nó giúp xác định khi nào và nếu các phiên bản đầu tiên của hệ thống đã sẵn sàng để được phát hành chưa.

5) Các test plan, các test cases được viết và thực hiện để xác minh rằng tất cả các yêu cầu ứng dụng được triển khai chính xác. Các trường hợp kiểm tra ánh xạ với các yêu cầu giúp đảm bảo rằng không có lỗi lớn nào bị bỏ sót. Nó tiếp tục giúp trong việc thực hiện một sản phẩm chất lượng theo mong đợi của khách hàng.

6) Trong trường hợp có 'yêu cầu thay đổi' từ khách hàng, tất cả các thành phần ứng dụng bị ảnh hưởng bởi yêu cầu thay đổi được sửa đổi và không có gì bị bỏ qua. Điều này tiếp tục tăng cường trong việc đánh giá, tác động của một yêu cầu thay đổi đối với ứng dụng phần mềm.

7) Một yêu cầu thay đổi dường như đơn giản có thể ngụ ý những sửa đổi cần được thực hiện đối với một số phần của ứng dụng. Tốt hơn là nên tìm ra kết luận về việc cần bao nhiêu effort trước khi đồng ý thực hiện thay đổi.

(Còn tiếp) 

Bài viết tham khảo từ nguồn: https://www.softwaretestinghelp.com/requirements-traceability-matrix/