### Dữ liệu kiểm tra là gì? Tại sao nó lại quan trọng?
Dữ liệu thử nghiệm thực sự là đầu vào được đưa ra cho một chương trình phần mềm. Nó đại diện cho dữ liệu ảnh hưởng hoặc bị ảnh hưởng bởi việc thực hiện mô-đun cụ thể. Một số dữ liệu có thể được sử dụng để thử nghiệm tích cực, thường để xác minh rằng một bộ đầu vào nhất định cho một chức năng nhất định sẽ tạo ra kết quả như mong đợi. Các dữ liệu khác có thể được sử dụng để kiểm tra tiêu cực để kiểm tra khả năng của chương trình xử lý đầu vào bất thường, cực đoan, đặc biệt hoặc bất ngờ. Dữ liệu thử nghiệm được thiết kế kém có thể không kiểm tra tất cả các kịch bản thử nghiệm có thể sẽ cản trở chất lượng của phần mềm.
![](https://images.viblo.asia/7520b3f6-b10d-4d14-99c2-d39c13abf6ba.jpg)
### Kiểm tra tạo dữ liệu là gì? Tại sao dữ liệu thử nghiệm phải được tạo trước khi thực hiện thử nghiệm?
Tùy thuộc vào môi trường thử nghiệm của bạn, bạn có thể cần TẠO Dữ liệu thử nghiệm (Hầu hết các lần) hoặc ít nhất là xác định dữ liệu thử nghiệm phù hợp cho các trường hợp thử nghiệm của bạn (là dữ liệu thử nghiệm đã được tạo).

Thông thường dữ liệu thử nghiệm được tạo không đồng bộ với trường hợp thử nghiệm được sử dụng cho.

Dữ liệu thử nghiệm có thể được tạo -

* Thủ công
* Bản sao dữ liệu lớn từ sản xuất đến môi trường thử nghiệm
* Bản sao hàng loạt dữ liệu thử nghiệm từ các hệ thống máy khách cũ
* Công cụ tạo dữ liệu thử nghiệm tự động

Thông thường dữ liệu mẫu phải được tạo trước khi bạn bắt đầu thực hiện kiểm tra vì khó xử lý việc quản lý dữ liệu kiểm tra. Vì trong nhiều môi trường thử nghiệm, việc tạo dữ liệu thử nghiệm cần nhiều bước trước hoặc cấu hình môi trường thử nghiệm rất tốn thời gian. Ngoài ra Nếu việc tạo dữ liệu kiểm tra được thực hiện trong khi bạn đang trong giai đoạn thực hiện kiểm tra, bạn có thể vượt quá thời hạn kiểm tra.
Dưới đây được mô tả một số loại thử nghiệm cùng với một số gợi ý về nhu cầu dữ liệu thử nghiệm của họ.

### Kiểm tra dữ liệu để kiểm tra hộp trắng
Trong Kiểm thử hộp trắng, Quản lý dữ liệu kiểm tra có nguồn gốc từ kiểm tra trực tiếp mã được kiểm tra. Dữ liệu thử nghiệm có thể được chọn bằng cách tính đến những điều sau đây:

* Đó là mong muốn để bao gồm càng nhiều chi nhánh càng tốt; dữ liệu thử nghiệm có thể được tạo sao cho tất cả các nhánh trong mã nguồn chương trình được kiểm tra ít nhất một lần
* Kiểm tra đường dẫn: tất cả các đường dẫn trong mã nguồn chương trình được kiểm tra ít nhất một lần - việc chuẩn bị dữ liệu thử nghiệm có thể được thực hiện để bao quát nhiều trường hợp nhất có thể
* Kiểm tra API tiêu cực:
   + Dữ liệu thử nghiệm có thể chứa các loại tham số không hợp lệ được sử dụng để gọi các phương thức khác nhau
  + Dữ liệu thử nghiệm có thể bao gồm các kết hợp đối số không hợp lệ được sử dụng để gọi các phương thức của chương trình

### Kiểm tra dữ liệu để kiểm tra hiệu suất
Kiểm thử hiệu năng là loại kiểm thử được thực hiện để xác định hệ thống đáp ứng nhanh như thế nào trong một khối lượng công việc cụ thể. Mục tiêu của loại thử nghiệm này không phải là tìm lỗi, mà là loại bỏ các nút thắt cổ chai. Một khía cạnh quan trọng của Kiểm tra hiệu suất là tập hợp dữ liệu mẫu được sử dụng phải rất gần với dữ liệu 'thực' hoặc 'sống' được sử dụng trong sản xuất. Câu hỏi sau đây được đặt ra: ‘Ok, thật tốt khi kiểm tra dữ liệu thực, nhưng làm thế nào để tôi có được dữ liệu này? Câu trả lời khá đơn giản: từ những người hiểu rõ nhất - khách hàng. Họ có thể cung cấp một số dữ liệu họ đã có hoặc, nếu họ không có một bộ dữ liệu hiện có, họ có thể giúp bạn bằng cách đưa ra phản hồi về cách dữ liệu trong thế giới thực trông như thế nào. Trong trường hợp bạn đang ở trong một dự án thử nghiệm bảo trì, bạn có thể sao chép dữ liệu từ môi trường sản xuất vào giường thử nghiệm. Đó là một cách thực hành tốt để ẩn danh (xáo trộn) dữ liệu khách hàng nhạy cảm như Số An sinh Xã hội, Số Thẻ Tín dụng, Chi tiết Ngân hàng, v.v. trong khi bản sao được tạo.

### Kiểm tra dữ liệu để kiểm tra bảo mật
Kiểm tra bảo mật là quá trình xác định xem một hệ thống thông tin có bảo vệ dữ liệu khỏi mục đích xấu hay không. Tập hợp dữ liệu cần được thiết kế để kiểm tra đầy đủ bảo mật phần mềm phải bao gồm các chủ đề sau:

* **Bảo mật**: Tất cả các thông tin được cung cấp bởi khách hàng được bảo mật nghiêm ngặt và không được chia sẻ với bất kỳ bên ngoài nào. Ví dụ ngắn gọn, nếu một ứng dụng sử dụng SSL, bạn có thể thiết kế một tập hợp dữ liệu thử nghiệm để xác minh rằng mã hóa được thực hiện chính xác.
* **Tính toàn vẹn** : Xác định rằng thông tin được cung cấp bởi hệ thống là chính xác. Để thiết kế dữ liệu thử nghiệm phù hợp, bạn có thể bắt đầu bằng cách xem xét sâu về thiết kế, mã, cơ sở dữ liệu và cấu trúc tệp.
* **Xác thực** : Thể hiện quá trình thiết lập danh tính của người dùng. Dữ liệu thử nghiệm có thể được thiết kế dưới dạng kết hợp khác nhau giữa tên người dùng và mật khẩu và mục đích của nó là kiểm tra xem chỉ những người được ủy quyền mới có thể truy cập hệ thống phần mềm.
* **Ủy quyền** : Cho biết các quyền của một người dùng cụ thể là gì. Dữ liệu thử nghiệm có thể chứa một sự kết hợp khác nhau của người dùng, vai trò và hoạt động để chỉ kiểm tra người dùng có đủ đặc quyền mới có thể thực hiện một thao tác cụ thể.

### Kiểm tra dữ liệu để kiểm tra hộp đen
Trong hộp đen Kiểm tra mã không hiển thị cho người kiểm tra. Các trường hợp kiểm tra chức năng của bạn có thể có dữ liệu kiểm tra đáp ứng các tiêu chí sau -
* **Không có dữ liệu:** Kiểm tra phản hồi của hệ thống khi không có dữ liệu nào được gửi
* **Dữ liệu hợp lệ:** Kiểm tra phản hồi của hệ thống khi dữ liệu kiểm tra hợp lệ được gửi
* **Dữ liệu không hợp lệ**: Kiểm tra phản hồi của hệ thống khi dữ liệu thử nghiệm InValid được gửi
* **Định dạng dữ liệu bất hợp pháp**: Kiểm tra phản hồi của hệ thống khi dữ liệu thử nghiệm ở định dạng không hợp lệ
* **Bộ dữ liệu điều kiện biên**: Kiểm tra dữ liệu đáp ứng các điều kiện giá trị biên
* **Tập dữ liệu phân vùng tương đương**: Kiểm tra dữ liệu đủ điều kiện phân vùng tương đương của bạn.
* **Tập dữ liệu bảng quyết định**: Dữ liệu kiểm tra đủ điều kiện chiến lược kiểm tra bảng quyết định của bạn
* **Tập dữ liệu kiểm tra chuyển đổi trạng thái**: Dữ liệu kiểm tra đáp ứng chiến lược kiểm tra chuyển đổi trạng thái của bạn
* **Sử dụng dữ liệu kiểm tra trường hợp**: Kiểm tra dữ liệu không đồng bộ với các trường hợp sử dụng của bạn.
### Công cụ tạo dữ liệu thử nghiệm tự động
Để tạo các bộ dữ liệu khác nhau, bạn có thể sử dụng một loạt các công cụ tạo dữ liệu thử nghiệm tự động. Dưới đây là một số ví dụ về các công cụ như vậy:

Trình tạo dữ liệu thử nghiệm của GSApps có thể được sử dụng để tạo dữ liệu thông minh trong hầu hết mọi cơ sở dữ liệu hoặc tệp văn bản. Nó cho phép người dùng:

* Hoàn thành kiểm tra ứng dụng bằng cách thổi phồng cơ sở dữ liệu với dữ liệu có ý nghĩa
* Tạo dữ liệu cụ thể theo ngành có thể được sử dụng để trình diễn
* Bảo vệ quyền riêng tư dữ liệu bằng cách tạo một bản sao của dữ liệu hiện có và che giấu các giá trị bí mật
* Đẩy nhanh chu trình phát triển bằng cách đơn giản hóa thử nghiệm và tạo mẫu
Trình tạo dữ liệu thử nghiệm của DTM, là một tiện ích hoàn toàn có thể tùy chỉnh để tạo dữ liệu, bảng (dạng xem, quy trình, v.v.) để kiểm tra cơ sở dữ liệu (kiểm tra hiệu suất, kiểm tra QA, kiểm tra tải hoặc kiểm tra khả năng sử dụng).

Datatect là trình tạo dữ liệu SQL của Banner Software, tạo ra nhiều dữ liệu thử nghiệm thực tế trong các tệp phẳng ASCII hoặc trực tiếp tạo dữ liệu thử nghiệm cho RDBMS bao gồm Oracle, Sybase, SQL Server và Informi.

Tóm lại, dữ liệu thử nghiệm được thiết kế tốt cho phép bạn xác định và sửa các lỗi nghiêm trọng trong chức năng. Lựa chọn dữ liệu thử nghiệm được chọn phải được đánh giá lại trong mọi giai đoạn của chu kỳ phát triển sản phẩm nhiều pha. Vì vậy, luôn luôn để mắt đến nó.

### Mẹo và thủ thuật để tạo dữ liệu thử nghiệm:
Dưới đây là một số mẹo và thủ thuật để tạo dữ liệu thử nghiệm:

1. Luôn đảm bảo rằng các tệp dữ liệu Kiểm tra không bị hỏng. Điều này có thể dẫn đến đầu ra không hợp lệ và cũng có thể bỏ lỡ các khiếm khuyết quan trọng.
2. Dữ liệu kiểm tra nên được cập nhật một cách thường xuyên. Điều này sẽ cho một bức tranh rõ ràng về đầu ra dự kiến.
3. Dữ liệu thử nghiệm phải được tạo trước khi thực hiện trường hợp thử nghiệm để tiết kiệm thời gian và đáp ứng thời hạn.
4. Đó là một thực tiễn tốt để sử dụng một số công cụ tự động hóa để tạo ra lượng dữ liệu thử nghiệm khổng lồ vì nỗ lực thủ công trong việc tạo ra dữ liệu đó sẽ nhiều hơn và cũng sẽ tốn thời gian.
5. Dữ liệu thử nghiệm phải có đầu vào không hợp lệ để kiểm tra các kịch bản tiêu cực.
6. Người kiểm tra có thể nhờ nhà phát triển giúp đỡ để tạo dữ liệu thử nghiệm.
7. Luôn luôn là một thực tiễn tốt hơn để bao gồm tất cả các kết hợp có thể có của các định dạng được hỗ trợ và không được hỗ trợ trong dữ liệu thử nghiệm để đảm bảo rằng phạm vi thử nghiệm là tối đa.

Hãy để lấy một ví dụ rất cơ bản về việc tạo dữ liệu thử nghiệm cho một người dùng mới trên màn hình người dùng tạo ra một ứng dụng web. Vì vậy, màn hình này sẽ có một số hộp văn bản như Tên, Họ, Giới tính, Ngày sinh, ID Email, Địa chỉ, Số điện thoại, Mật khẩu và Xác nhận Mật khẩu.


Bây giờ để tạo dữ liệu Kiểm tra cho một ứng dụng như vậy, chúng ta cần kiểm tra những trường bắt buộc nào có thể để trống và trường nào có thể bỏ qua. Đầu vào không hợp lệ có thể là nếu người dùng đặt các bảng chữ cái khác ngoài kiểu Miêu và Kiểu Fợi trong trường giới tính hoặc thay vì số nếu anh ta đặt bảng chữ cái trong trường số điện thoại. Ranh giới có thể nhập hơn 10 chữ số trong số điện thoại. Vì vậy, trong trường hợp trên, dữ liệu thử nghiệm sẽ có các giá trị hợp lệ, giá trị không hợp lệ, điều kiện biên và dữ liệu trống.

### Tổng kết:
Dữ liệu thử nghiệm là một trong những phần quan trọng nhất của môi trường thử nghiệm được thiết lập mà không thực hiện các trường hợp thử nghiệm nào sẽ khó khăn. Gần như không thể thực hiện kiểm tra tải, hiệu suất và căng thẳng mà không sử dụng dữ liệu thử nghiệm. Dữ liệu thử nghiệm có thể được tạo thủ công hoặc có thể được thực hiện với sự trợ giúp của tự động hóa. Nó nên được tạo ra như phạm vi kiểm tra là tối đa và được cập nhật thường xuyên theo các yêu cầu mới nhất và các trường hợp thử nghiệm.

Hãy chia sẻ kinh nghiệm của bạn với việc tạo dữ liệu thử nghiệm trong các bình luận bên dưới.


**Nguồn**: 

https://www.softwaretestingclass.com/what-is-test-data-tips-and-tricks-to-create-test-data/
https://www.guru99.com/software-testing-test-data.html