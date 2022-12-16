Là một người thử nghiệm, bạn có thể nghĩ rằng: Tạo các kịch bản test với các case test là đủ rồi, vậy tại sao phải bận tâm quá nhiều về một thứ tầm thường như dữ liệu kiểu thử? Tuy vậyg, thực thế khi kiểm thử chúng tasử dụng một lượng rất lớn data. Data được sử dụng trong kiểm thử mô tả các điều kiện tiền đề của kiểm thử và là phương tiện để các testers tác động đến phần mềm.Nhưng Test data thực sự là gì?Tạo Test data như thế nào? Hãy cùng tìm hiểu ở bài viết này !

## Dữ liệu thử nghiệm trong Kiểm thử phần mềm là gì?
Dữ liệu kiểm tra trong Kiểm thử phần mềm là dữ liệu đầu vào được cung cấp cho một chương trình phần mềm trong quá trình thực thi kiểm tra. Nó đại diện cho dữ liệu bị ảnh hưởng hoặc bị ảnh hưởng bởi việc thực thi phần mềm trong khi thử nghiệm. Dữ liệu thử nghiệm được sử dụng cho cả  kiểm thử khả quan (positive testing) để xác minh rằng các chức năng tạo ra kết quả mong đợi hay không? Và được sử dụng cho cả kiểm thử phủ định (negative testing) để kiểm tra khả năng phần mềm xử lý các đầu vào bất thường, đặc biệt hoặc bất ngờ.
Dữ liệu kiểm thử được thiết kế kém có thể không kiểm tra được tất cả các tình huống kiểm thử có thể xảy ra, điều này sẽ cản trở chất lượng của phần mềm.

![](https://images.viblo.asia/515d5d75-932c-4b5c-8077-7acce013dd71.png)

## Tạo dữ liệu thử nghiệm là gì? Tại sao dữ liệu thử nghiệm nên được tạo trước khi thực hiện thử nghiệm?
Mọi người đều biết rằng kiểm tra là một quá trình tạo ra và tiêu thụ một lượng lớn dữ liệu. Dữ liệu được sử dụng trong thử nghiệm mô tả các điều kiện ban đầu cho một thử nghiệm và đại diện cho phương tiện mà người thử nghiệm ảnh hưởng đến phần mềm. Nó là một phần quan trọng của hầu hết các functional testing.

Tùy thuộc vào môi trường thử nghiệm của bạn, bạn có thể cần tạo dữ liệu thử nghiệm (hầu hết các trường hợp) hoặc ít nhất là  một dữ liệu thử nghiệm phù hợp cho các trường hợp thử nghiệm của bạn.

Thông thường, dữ liệu thử nghiệm được tạo đồng bộ với trường hợp thử nghiệm mà nó được dự định sử dụng.

Dữ liệu thử nghiệm có thể được tạo theo những cách: 

+ Thủ công
+ Sao chép hàng loạt dữ liệu từ sản xuất sang môi trường thử nghiệm
+ Bản sao hàng loạt dữ liệu thử nghiệm từ các hệ thống khách hàng cũ
+ Công cụ tạo dữ liệu thử nghiệm tự động

Dưới đây là mô tả một số loại thử nghiệm cùng với một số gợi ý về nhu cầu dữ liệu thử nghiệm của chúng.


## Dữ liệu thử nghiệm để kiểm tra hộp trắng ( White testing )
Trong Kiểm tra hộp trắng , quản lý dữ liệu kiểm tra bắt nguồn từ việc kiểm tra trực tiếp mã cần kiểm tra. Dữ liệu thử nghiệm có thể được chọn bằng cách tính đến những điều sau:

* Điều mong muốn ở đây là  bao phủ càng nhiều  nhánh càng tốt; dữ liệu thử nghiệm có thể được tạo ra sao cho tất cả các nhánh trong mã nguồn chương trình đều được kiểm tra ít nhất một lần
* Kiểm tra đường dẫn: tất cả các đường dẫn trong mã nguồn chương trình đều được kiểm tra ít nhất một lần - việc chuẩn bị dữ liệu kiểm tra có thể được thực hiện để bao gồm nhiều trường hợp nhất có thể
* Kiểm tra API tiêu cực :
1. Dữ liệu kiểm tra có thể chứa các loại thông số không hợp lệ được sử dụng để gọi các phương thức khác nhau
2. Dữ liệu kiểm tra có thể bao gồm các tổ hợp đối số không hợp lệ được sử dụng để gọi các phương thức của chương trình

![](https://images.viblo.asia/d24eccc2-15f4-4c08-8fb6-6419ace45854.jpg)

## Dữ liệu thử nghiệm để kiểm tra hiệu suất
Kiểm tra hiệu suất là loại kiểm tra được thực hiện để xác định hệ thống phản hồi nhanh như thế nào trong một khối lượng công việc cụ thể. Mục tiêu của loại thử nghiệm này không phải là tìm ra lỗi mà là loại bỏ các nút thắt cổ chai. Một khía cạnh quan trọng của Kiểm tra hiệu suất là tập dữ liệu mẫu được sử dụng phải rất gần với dữ liệu 'thực' hoặc 'trực tiếp' được sử dụng trong quá trình sản xuất. Câu hỏi sau đặt ra: 'Được rồi, kiểm tra với dữ liệu thực thì tốt, nhưng làm cách nào để lấy dữ liệu này?' Câu trả lời khá đơn giản: từ những người hiểu rõ nhất - khách hàng . 
Họ có thể cung cấp một số dữ liệu mà họ đã có hoặc, nếu họ không có bộ dữ liệu hiện có, họ có thể giúp bạn bằng cách đưa ra phản hồi về cách dữ liệu trong thế giới thực có thể trông như thế nào.dự án thử nghiệm bảo trì bạn có thể sao chép dữ liệu từ môi trường sản xuất vào giường thử nghiệm. Một phương pháp hay là ẩn danh (xáo trộn) dữ liệu khách hàng nhạy cảm như Số an sinh xã hội, Số thẻ tín dụng, Chi tiết ngân hàng, v.v. trong khi sao chép được thực hiện.

## Dữ liệu thử nghiệm để kiểm tra bảo mật

Kiểm tra bảo mật là quá trình xác định xem hệ thống thông tin có bảo vệ dữ liệu khỏi mục đích xấu hay không. Bộ dữ liệu cần được thiết kế để kiểm tra đầy đủ tính năng bảo mật phần mềm phải bao gồm các chủ đề sau:

* Bảo mật: Tất cả thông tin do khách hàng cung cấp đều được bảo mật chặt chẽ và không được chia sẻ với bất kỳ bên ngoài nào. Ví dụ ngắn gọn, nếu một ứng dụng sử dụng SSL, bạn có thể thiết kế một tập hợp dữ liệu thử nghiệm để xác minh rằng mã hóa được thực hiện chính xác.
* Tính toàn vẹn: Xác định rằng thông tin do hệ thống cung cấp là chính xác. Để thiết kế dữ liệu thử nghiệm phù hợp, bạn có thể bắt đầu bằng cách xem xét chuyên sâu về thiết kế, mã, cơ sở dữ liệu và cấu trúc tệp.
* Xác thực: Đại diện cho quá trình thiết lập danh tính của người dùng. Dữ liệu kiểm tra có thể được thiết kế như một sự kết hợp khác nhau giữa tên người dùng và mật khẩu và mục đích của nó là kiểm tra xem chỉ những người được ủy quyền mới có thể truy cập vào hệ thống phần mềm.
* Ủy quyền: Cho biết các quyền của một người dùng cụ thể là gì. Dữ liệu kiểm tra có thể chứa một tổ hợp người dùng, vai trò và hoạt động khác nhau để kiểm tra chỉ những người dùng có đủ đặc quyền mới có thể thực hiện một hoạt động cụ thể.

![](https://images.viblo.asia/c65b333a-74b2-404c-a861-dce089275334.jpg)


## Dữ liệu thử nghiệm để kiểm tra hộp đen(Black testing)
Trong Kiểm tra hộp đen, người thử nghiệm không nhìn thấy mã. Các trường hợp thử nghiệm chức năng của bạn có thể có dữ liệu thử nghiệm đáp ứng các tiêu chí sau:

* Không có dữ liệu : Kiểm tra phản hồi của hệ thống khi không có dữ liệu nào được gửi
* Dữ liệu hợp lệ : Kiểm tra phản hồi của hệ thống khi dữ liệu kiểm tra hợp lệ được gửi
* Dữ liệu không hợp lệ : Kiểm tra phản hồi của hệ thống khi   dữ liệu thử nghiệm InValid được gửi
* Định dạng dữ liệu không hợp lệ : Kiểm tra phản hồi của hệ thống khi dữ liệu kiểm tra ở định dạng không hợp lệ
* Tập dữ liệu điều kiện ranh giới : Dữ liệu thử nghiệm đáp ứng các điều kiện giá trị biên
* Tập dữ liệu phân vùng tương đương : Dữ liệu kiểm tra đủ điều kiện cho phân vùng tương đương của bạn.
* Tập dữ liệu bảng quyết định : Dữ liệu thử nghiệm đủ điều kiện cho chiến lược thử nghiệm bảng quyết định của bạn
* Tập dữ liệu kiểm tra chuyển đổi trạng thái: Dữ liệu kiểm tra đáp ứng chiến lược kiểm tra chuyển đổi trạng thái của bạn
* Dữ liệu kiểm tra trường hợp sử dụng : Dữ liệu kiểm tra đồng bộ với các trường hợp sử dụng của bạn.

## Công cụ tạo dữ liệu thử nghiệm tự động
Để tạo nhiều bộ dữ liệu khác nhau, bạn có thể sử dụng hàng loạt công cụ tạo dữ liệu thử nghiệm tự động. Dưới đây là một số ví dụ về các công cụ như vậy:

Trình tạo dữ liệu thử nghiệm DTM , là một tiện ích hoàn toàn có thể tùy chỉnh để tạo dữ liệu, bảng (chế độ xem, thủ tục, v.v.) cho mục đích kiểm tra cơ sở dữ liệu (kiểm tra hiệu suất, kiểm tra QA, kiểm tra tải hoặc kiểm tra khả năng sử dụng).
Datatect là trình tạo dữ liệu SQL của Phần mềm Banner, tạo ra nhiều loại dữ liệu thử nghiệm thực tế trong các tệp phẳng ASCII hoặc trực tiếp tạo dữ liệu thử nghiệm cho RDBMS bao gồm Oracle, Sybase, SQL Server và Informix.

![](https://images.viblo.asia/515d5d75-932c-4b5c-8077-7acce013dd71.png)


## Phần kết luận
Tóm lại, dữ liệu thử nghiệm được thiết kế tốt cho phép bạn xác định và sửa các lỗi nghiêm trọng trong chức năng. Lựa chọn dữ liệu thử nghiệm đã chọn phải được đánh giá lại trong mọi giai đoạn của chu kỳ phát triển sản phẩm nhiều giai đoạn. Vì vậy, hãy luôn để mắt đến nó.