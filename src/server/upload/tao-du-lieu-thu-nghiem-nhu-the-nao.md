Mọi người đều biết rằng kiểm thử là một quá trình xây dựng và sử dụng một lượng lớn dữ liệu. Dữ liệu được sử dụng trong thử nghiệm mô tả các điều kiện ban đầu cho thử nghiệm người sử dụng dùng nó để ảnh hưởng trực tiếp đến phần mềm. Đây là một phần quan trọng của hầu hết các thử nghiệm chức năng . Nhưng những gì thực sự là dữ liệu thử nghiệm? Tại sao nó được sử dụng? Có thể bạn sẽ tự hỏi 'Thiết kế các trường hợp thử nghiệm là đủ rồi, vậy thì tại sao phải bận tâm về thứ gì như dữ liệu thử nghiệm?' Mục đích của bài viết này là giới thiệu cho bạn về dữ liệu thử nghiệm, tầm quan trọng của nó và đưa ra các mẹo và thủ thuật thực tế để tạo dữ liệu thử nghiệm nhanh chóng . 

## Dữ liệu kiểm tra là gì? Tại sao nó lại quan trọng?

Dữ liệu thử nghiệm thực sự là đầu vào được đưa ra cho một chương trình phần mềm. Nó đại diện cho dữ liệu ảnh hưởng hoặc bị ảnh hưởng bởi việc thực hiện mô-đun cụ thể. Một số dữ liệu có thể được sử dụng để positive testing , thường để xác minh rằng một bộ đầu vào nhất định cho một chức năng nhất định tạo ra kết quả mong đợi. Các dữ liệu khác có thể được sử dụng cho negative testing  để kiểm tra khả năng của chương trình khi xử lý đầu vào bất thường, cực đoan, đặc biệt hoặc bất ngờ. Dữ liệu thử nghiệm được thiết kế kém có thể không kiểm tra tất cả các kịch bản thử nghiệm có thể sẽ ảnh hưởng xấu tới chất lượng của phần mềm.

## Test Data Generation là gì?  Tại sao dữ liệu thử nghiệm phải được tạo trước khi thực hiện test?
Tùy thuộc vào môi trường thử nghiệm của bạn, bạn có thể cần tạo data test hoặc không (đa số là có) hoặc ít nhất là xác định data test phù hợp cho các trường hợp test của bạn (là data test đã được tạo).

Thông thường data test được tạo không đồng bộ với test case và dự định được sử dụng cho nó.
Dữ liệu thử nghiệm có thể được tạo như sau:

- Tạo thủ công
+ Sao chép dữ liệu và môi trường test
+ Sao chép dữ liệu từ hệ thống client
+ Sử dụng tools để tạo tự động test data

Thông thường dữ liệu mẫu phải được tạo trước khi bạn bắt đầu thực hiện kiểm tra vì khó xử lý việc quản lý dữ liệu kiểm tra . Vì trong nhiều môi trường thử nghiệm, việc tạo dữ liệu thử nghiệm cần nhiều bước trước hoặc cấu hình môi trường thử nghiệm rất tốn thời gian . Ngoài ra nếu việc tạo dữ liệu kiểm tra được thực hiện trong khi bạn đang trong giai đoạn thực hiện kiểm tra, bạn có thể vượt quá thời hạn kiểm tra.

Dưới đây được mô tả một số loại thử nghiệm cùng với một số gợi ý về nhu cầu dữ liệu thử nghiệm của họ.

### Kiểm tra dữ liệu để kiểm tra hộp trắng
Trong kiểm thử hộp trắng , quản lý dữ liệu kiểm tra có nguồn gốc từ kiểm tra trực tiếp mã được kiểm tra. Dât test có thể được chọn bằng cách dựa trên những điều sau đây:

- Mong muốn để bao gồm càng nhiều chi nhánh càng tốt; dữ liệu thử nghiệm có thể được tạo sao cho tất cả các nhánh trong mã nguồn chương trình được kiểm tra ít nhất một lần
- Kiểm tra đường dẫn (Path testing) : Tất cả các các path trong source code của chương trình được kiểm tra ít nhất một lần - Kiểm tra data có thể được tạo ra để cover càng nhiều trường hợp càng tốt.
- Negative API testing :
  + Data test có thể chứa các loại tham số không hợp lệ được sử dụng để gọi các phương thức khác nhau
  + Data test có thể bao gồm các kết hợp đối số không hợp lệ được sử dụng để gọi các phương thức của chương trình

### Test Data cho Performance Testing
Performance testing là kiểu test được thực hiện để xác định hệ thống phản ứng nhanh trước một workload đặc biệt. Mục tiêu của kiểu test này không phải là để tìm lỗi, nhưng là để phòng chống việc gián đoạn. Một khía cạnh quan trọng của performance testing là tập hợp các test data rất gần với thực tế hoặc data thực sẽ được đưa vào để thực hiện test. Các câu hỏi sau đây được đặt ra: "Ok, Test data rất tốt, nhưng làm thế nào tôi mới có được test data này?" Câu trả lời khá là đơn giản: Từ những người hiểu rõ nhất - Khách hàng, họ có thể cung cấp một bộ test data họ đã có hoặc nếu hiện tại họ chưa có, họ có thể trợ giúp bạn bằng cách đưa ra thông tin phản hồi liên quan đến data đó trong thực tế có dạng như thế nào. Trong trường hợp bạn đang ở trong một dự án maintenance testing, bạn có thể sao chếp data từ môi trường production vào test. Đó là một hoạt động tốt để ẩn (scramble) dữ liệu nhạy cảm của khách hàng như số an ninh xã hội, số thẻ tín dụng, chi tiết ngân hàng,... trong khi các bản sao được thực hiện.

### Data test để kiểm tra bảo mật
Kiểm tra bảo mật là quá trình xác định xem một hệ thống thông tin có bảo vệ dữ liệu khỏi mục đích xấu hay không. Tập hợp dữ liệu cần được thiết kế để kiểm tra đầy đủ bảo mật phần mềm phải bao gồm các chủ đề sau:

- Bảo mật: Tất cả các thông tin được cung cấp bởi khách hàng được bảo mật nghiêm ngặt và không được chia sẻ với bất kỳ bên ngoài nào. Ví dụ ngắn gọn, nếu một ứng dụng sử dụng SSL, bạn có thể thiết kế một tập hợp dữ liệu thử nghiệm để xác minh rằng mã hóa được thực hiện chính xác.
- Tính toàn vẹn: Xác định rằng thông tin được cung cấp bởi hệ thống là chính xác. Để thiết kế dữ liệu thử nghiệm phù hợp, bạn có thể bắt đầu bằng cách xem xét sâu về thiết kế, mã, cơ sở dữ liệu và cấu trúc tệp.
- Xác thực: Thể hiện quá trình thiết lập danh tính của người dùng. Dữ liệu thử nghiệm có thể được thiết kế dưới dạng kết hợp khác nhau giữa tên người dùng và mật khẩu và mục đích của nó là kiểm tra xem chỉ những người được ủy quyền mới có thể truy cập hệ thống phần mềm.
- Ủy quyền: Cho biết các quyền của một người dùng cụ thể là gì. Dữ liệu thử nghiệm có thể chứa một sự kết hợp khác nhau của người dùng, vai trò và hoạt động để chỉ kiểm tra người dùng có đủ đặc quyền mới có thể thực hiện một thao tác cụ thể.

### Kiểm tra dữ liệu để kiểm tra hộp đen
Trong hộp đen kiểm tra mã không giành cho tester. Các testcase functional  có thể xây dựng data test dựa trên các tiêu chí sau:

- Không có dữ liệu : Kiểm tra phản hồi của hệ thống khi không có dữ liệu nào được gửi
- Dữ liệu hợp lệ : Kiểm tra phản hồi của hệ thống khi dữ liệu kiểm tra hợp lệ được gửi
- Dữ liệu không hợp lệ : Kiểm tra phản hồi của hệ thống khi   dữ liệu thử nghiệm InValid được gửi
- Định dạng dữ liệu bất hợp pháp : Kiểm tra phản hồi của hệ thống khi dữ liệu thử nghiệm ở định dạng không hợp lệ
- Bộ dữ liệu điều kiện biên : Kiểm tra dữ liệu đáp ứng các điều kiện giá trị biên
- Tập dữ liệu phân vùng tương đương : Kiểm tra dữ liệu đủ điều kiện phân vùng tương đương của bạn.
- Tập dữ liệu bảng quyết định : Dữ liệu kiểm tra đủ điều kiện chiến lược kiểm tra bảng quyết định của bạn
- Tập dữ liệu kiểm tra chuyển đổi trạng thái: Dữ liệu kiểm tra đáp ứng chiến lược kiểm tra chuyển đổi trạng thái của bạn
- Use Case Data  : Kiểm tra dữ liệu không đồng bộ với các trường hợp sử dụng của bạn.

### Xây dựng data test cho Automated Test 

Để tạo ra những bộ test data khác nhau, bạn có thể sử dụng nhiều tool khác nhau để tạo ra chúng. ví dụ: Test data được tạo bởi GSApps có thể được sử dụng để tạo ra các data thông minh trong hầu hết các cơ sở dữ liệu hoặc tập tin văn bản. Nó cho phép người sử dụng để:

- Hoàn thành test ứng dụng bởi quá trình nhân bản cơ sở dữ liệu với dữ liệu thông minh.
- Tạo dữ liệu industry-specific có thể dùng để chứng minh.
- Bảo vệ dữ liệu riêng bằng cách tạo ra bản sao của dữ liệu và có ẩn các giá trị.
- Đẩy nhanh quá trình tạo dữ liệu và kiểm thử.

Bài viết được dịch lại từ nguồn: https://www.guru99.com/software-testing-test-data.html