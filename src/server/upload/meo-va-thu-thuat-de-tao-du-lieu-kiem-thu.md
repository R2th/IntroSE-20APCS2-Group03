Mọi người đều biết rằng kiểm thử  là một quá trình sản xuất và dùng một lượng lớn dữ liệu. Dữ liệu được sử dụng trong kiểm thử miêu tả các điều kiện khởi tạo cho một kiểm thử . Nó là một phần quan trọng của hầu hết các kiểm thử  chức năng . Nhưng dữ liệu kiểm thử  thực sự là gì? Tại sao nó được sử dụng? Mục đích của hướng dẫn này là giới thiệu cho bạn dữ liệu kiểm  thử , tầm quan trọng của nó và đưa ra các mẹo và thủ thuật thiết thực để tạo dữ liệu kiểm thử  nhanh chóng. Vì vậy, hãy bắt đầu!

**Dữ liệu kiểm thử là gì? Tại sao nó lại quan trọng?**




Dữ liệu kiểm thử thực sự là đầu vào được đưa ra cho một chương trình phần mềm. Nó đại diện cho dữ liệu ảnh hưởng hoặc bị ảnh hưởng bởi việc thực thi mô-đun cụ thể. Một số dữ liệu có thể được sử dụng để kiểm thử tích cực, thông thường để verify một tập hợp đầu vào cho một chức năng để tạo ra kết quả mong đợi. Các dữ liệu khác có thể được sử dụng để kiểm thử tiêu cực để kiểm tra khả năng của chương trình xử lý đầu vào bất thường, biên, ngoại lệ, hoặc đầu vào không mong muốn. Dữ liệu kiểm thử được thiết kế không tốt có thể không kiểm tra tất cả các tình huống kiểm thử , cản trở chất lượng của phần mềm.
![](https://images.viblo.asia/0eaa032b-518f-4f30-8664-74195578cc89.jpg)

**Việc tạo dữ liệu kiểm thử là gì? Tại sao phải tạo dữ liệu thử nghiệm trước khi thực thi kiểm thử?**



Tùy thuộc vào môi trường kiểm thử của bạn, bạn có thể cần CREATE dữ liệu kiểm thử (Hầu hết các lần) hoặc ít nhất một lần để xác định dữ liệu kiểm thử phù hợp cho các trường hợp kiểm thử của bạn (là dữ liệu kiểm thử đã được tạo).

Thông thường, dữ liệu kiểm thử được tạo ra đồng bộ hóa với trường hợp kiểm tra nó được dự định sẽ được sử dụng .

Dữ liệu kiểm thử có thể được tạo ra:

* Thủ công
* Sao chép dữ liệu từ môi trường production đến môi trường testing
* Bản sao khối lượng dữ liệu thử nghiệm từ các hệ thống máy khách cũ
* Công cụ tạo dữ liệu thử nghiệm tự động
 

Thông thường, dữ liệu mẫu sẽ được tạo trước khi bạn bắt đầu thực hiện kiểm tra vì rất khó thực hiện việc quản lý dữ liệu kiểm thử. Vì trong nhiều môi trường kiểm thử việc tạo ra dữ liệu kiểm thử  phải mất nhiều bước trước hoặc cấu hình môi trường kiểm thử rất tốn thời gian . Ngoài ra Nếu việc tạo dữ liệu kiểm thử  được thực hiện trong khi bạn đang trong giai đoạn thực thi kiểm thử, bạn có thể vượt quá thời hạn kiểm thử của mình.

Một số loại thử nghiệm được mô tả dưới đây cùng với một số đề xuất liên quan đến dữ liệu thử nghiệm cần thiết của chúng.

**Dữ liệu kiểm thử cho kiểm thử hộp trắng**



Trong kiểm thử hộp trắng , dữ liệu thử nghiệm bắt nguồn từ việc kiểm tra trực tiếp mã được kiểm tra. Dữ liệu kiểm thử có thể được chọn bằng cách tính đến những điều sau:

* Nó là mong muốn để cover càng nhiều chi nhánh càng tốt; dữ liệu kiểm thử có thể được tạo ra sao cho tất cả các nhánh trong mã nguồn chương trình được kiểm tra ít nhất một lần
* Kiểm tra đường dẫn: tất cả các đường dẫn trong mã nguồn chương trình được kiểm tra ít nhất một lần - dữ liệu kiểm thử có thể được thiết kế để bao gồm nhiều trường hợp nhất có thể
* Thử nghiệm Api Tiêu cực :
* Dữ liệu kiểm tra có thể chứa các loại tham số không hợp lệ được sử dụng để gọi các phương thức khác nhau
* Dữ liệu kiểm tra có thể bao gồm các kết hợp các đối số không hợp lệ được sử dụng để gọi các phương thức của chương trình
 

**Dữ liệu kiểm thử cho kiểm thử  hiệu suất**



Kiểm thử hiệu suất là loại kiểm thử  được thực hiện để xác định hệ thống phản ứng nhanh như thế nào theo một khối lượng công việc cụ thể. Mục tiêu của loại kiểm thử  này không phải là để tìm lỗi, nhưng để loại bỏ tắc nghẽn. Một khía cạnh quan trọng của Kiểm thử hiệu suất là tập dữ liệu mẫu được sử dụng phải rất gần với dữ liệu 'thực' hoặc 'trực tiếp' được sử dụng cho sản xuất. Câu hỏi sau nảy sinh: 'Ok, thật tốt khi thử nghiệm với dữ liệu thực, nhưng làm cách nào để có được dữ liệu này?' Câu trả lời là khá đơn giản: từ những người biết điều tốt nhất - khách hàng . Họ có thể cung cấp một số dữ liệu mà họ đã có hoặc nếu họ không có tập dữ liệu hiện có, họ có thể giúp bạn bằng cách đưa ra phản hồi về cách dữ liệu trong thế giới thực có thể trông như thế nào. Trong trường hợp bạn đang ở trong mộtdự án kiểm thử bảo trì, bạn có thể sao chép dữ liệu từ môi trường sản xuất vàomôi trường thử nghiệm. Đó là một phương pháp hay để ẩn danh dữ liệu khách hàng nhạy cảm  như Số an sinh xã hội, Số thẻ tín dụng, Chi tiết ngân hàng, v.v. trong khi sao chép được thực hiện.


**Dữ liệu kiểm thử để kiểm tra bảo mật**




Kiểm tra bảo mật là quá trình xác định xem hệ thống thông tin có bảo vệ dữ liệu khỏi mục đích độc hại hay không. Tập dữ liệu cần được thiết kế để kiểm tra đầy đủ bảo mật phần mềm phải bao gồm các chủ đề sau:

* Bảo mật: Tất cả các thông tin được cung cấp bởi khách hàng được tổ chức một cách nghiêm ngặt và không được chia sẻ với bất kỳ bên ngoài nào. Như một ví dụ ngắn, nếu một ứng dụng sử dụng SSL, bạn có thể thiết kế một bộ dữ liệu thử nghiệm để xác minh rằng mã hóa được thực hiện đúng.
* Tính toàn vẹn: Xác định rằng thông tin được cung cấp bởi hệ thống là chính xác. Để thiết kế dữ liệu thử nghiệm phù hợp, bạn có thể bắt đầu bằng cách xem xét sâu về thiết kế, mã, cơ sở dữ liệu và cấu trúc tệp.
* Xác thực: Đại diện cho quá trình thiết lập danh tính của người dùng. Dữ liệu kiểm tra có thể được thiết kế như sự kết hợp khác nhau của tên người dùng và mật khẩu và mục đích của nó là để kiểm tra xem chỉ những người được ủy quyền mới có thể truy cập vào hệ thống phần mềm hay không.
* Ủy quyền: Cho biết các quyền của một người dùng cụ thể là gì. Dữ liệu kiểm thử có thể chứa sự kết hợp khác nhau của người dùng, vai trò và hoạt động để chỉ kiểm tra người dùng có đủ đặc quyền có thể thực hiện một hoạt động cụ thể.
 

**Dữ liệu kiểm thử cho kiểm thử hộp đen**




Trong kiểm thử hộp đen mã (code) không hiển thị với người kiểm thử. Các trường hợp kiểm thử chức năng của bạn có thể có dữ liệu kiểm thử đáp ứng các tiêu chí sau :

* Không có dữ liệu : Kiểm tra phản hồi của hệ thống khi không có dữ liệu nào được gửi
* Dữ liệu hợp lệ : Kiểm tra phản hồi của hệ thống khi dữ liệu kiểm thử hợp lệ được gửi
* Dữ liệu không hợp lệ : Kiểm tra phản hồi của hệ thống khi   dữ liệu kiểm thử không hợp lệ được gửi
* Dữ liệu không đúng format : Kiểm tra phản hồi của hệ thống khi dữ liệu kiểm thử ở định dạng không hợp lệ
* Bộ dữ liệu biên : Dữ liệu kiểm thử đáp ứng các điều kiện giá trị biên
* Bộ dữ liệu phân vùng tương đương : Dữ liệu kiểm thử đủ điều kiện cho các phân vùng tương đương của bạn.
* Bảng dữ liệu bảng quyết định : Dữ liệu kiểm thử đủ điều kiện chiến lược kiểm thử bảng quyết định của bạn
* Bộ dữ liệu kiểm thử chuyển tiếp trạng thái: Dữ liệu kiểm thử đáp ứng chiến lược kiểm thử chuyển tiếp trạng thái của bạn
* Sử dụng dữ liệu kiểm thử use case : Dữ liệu kiểm thử  đồng bộ hóa với các trường hợp sử dụng của bạn.
 

Lưu ý : Tùy thuộc vào ứng dụng phần mềm được kiểm tra, bạn có thể sử dụng một số hoặc tất cả việc tạo dữ liệu kiểm thử ở trên


**Tạo dữ liệu kiểm thử tự động**



Để tạo ra nhiều bộ dữ liệu khác nhau, bạn có thể sử dụng một gam màu của các công cụ tạo dữ liệu kiểm thử tự động. Dưới đây là một số ví dụ về các công cụ như vậy:

Việc tạo dữ liệu kiểm thử của GSApps có thể được sử dụng để tạo dữ liệu thông minh trong hầu hết mọi cơ sở dữ liệu hoặc tệp văn bản. Nó cho phép người dùng:

* Hoàn thành kiểm tra ứng dụng bằng cách tăng cơ sở dữ liệu với dữ liệu có ý nghĩa
* Tạo dữ liệu theo ngành cụ thể có thể được sử dụng để trình diễn
* Bảo vệ bảo mật dữ liệu bằng cách tạo bản sao dữ liệu hiện có và che giấu các giá trị bảo mật
* Tăng tốc chu trình phát triển bằng cách đơn giản hóa việc kiểm thử và tạo mẫu


Việc tạo  dữ liệu kiểm thử  bằng DTM , là một tiện ích hoàn toàn có thể tùy chỉnh tạo ra dữ liệu, bảng (dạng xem, thủ tục, vv) để kiểm tra cơ sở dữ liệu (kiểm tra hiệu năng, kiểm tra QA, kiểm tra tải hoặc kiểm tra khả năng sử dụng). 
Datatect là trình tạo dữ liệu SQL của Banner Software, tạo ra nhiều dữ liệu kiểm thử thực tế trong các tệp  ASCII flat hoặc trực tiếp tạo dữ liệu kiểm thử cho RDBMS bao gồm Oracle, Sybase, SQL Server và Informi.

 

Tóm lại, dữ liệu thử nghiệm được thiết kế tốt cho phép bạn xác định và sửa lỗi nghiêm trọng trong chức năng. Lựa chọn dữ liệu kiểm thử được lựa chọn phải được đánh giá lại trong mọi giai đoạn của chu kỳ phát triển sản phẩm nhiều giai đoạn.

Refer: https://www.guru99.com/software-testing-test-data.html