Ngày nay, single page apps nổi lên như mội sự xu thế của công nghệ.Trước những lợi ích mà nó đem lại, rất nhiều developer đang xây dựng nó và thay thế dần cho web apps truyền thống.
Vậy phải chăng single page apps là lựa chọn số một và web apps truyền thống sẽ không còn được sử dụng trong tương lai nữa ???. Sau đây, bài viết của mình sẽ giúp mọi người nhìn nhận một cách rõ ràng hơn để lựa chọn xây dựng ứng dụng web phù hợp giữa web apps truyền thống hay single page apps.

# Tổng quan
Ngày nay có 2 hướng để xây dựng một ứng dụng web: web applications - chủ yếu thực hiện logic ở trên server và single page applications - chủ yếu thực hiện logic ở giao diện người dùng trong trình duyệt và giao tiếp với web server bằng việc sử dụng các API.

**Ta nên sử dụng web applications khi:**
1. Các yêu cầu phía client-side đơn giản và thậm chí chỉ để đọc dữ liệu
2. Ứng dựng cần hoạt động cả trong trình duyệt không hỗ trợ javascript
3. Đội phát triển ứng dụng không thông thạo công nghệ phát triển bởi javascript hoặc typescript.

**Ta nên sử dụng SPA khi:**
1. Ứng dụng của bạn phải thể hiện một giao diện người dùng phong phú với nhiều tính năng.
2. Đội ngũ phát triển đã khá thông thạo với JavaScript hoặc TypeScript.
3. Ứng dụng của bạn phải phát hành API cho các khách hàng khác (nội bộ hoặc công khai).
# Khi nào chọn web apps:
Sau đây là giải thích chi tiết hơn khi lựa chọn các ứng dụng web truyền thống.

**Các yêu cầu phía client-side đơn giản và thậm chí chỉ để đọc dữ liệu**

Nhiều ứng dụng web chủ yếu được dùng trong việc chỉ đọc thông tin.Các ứng dụng chỉ đọc (hoặc chủ yếu đọc) có xu hướng đơn giản hơn nhiều so với các ứng dụng duy trì và điều khiển rất nhiều trạng thái. Ví dụ: search engine như google chẳng hạn chỉ cần một trang ô textbox để điền từ khóa và trang thứ hai để hiển thị kết quả tìm kiếm. Bất kỳ người dùng có thể dễ dàng thực hiện các yêu cầu và có rất ít nhu cầu về logic phía client. Tương tự, ứng dụng blog hoặc hệ thống quản lý nội dung thường bao gồm chủ yếu nội dung và có ít hành vi phía client. Các ứng dụng như vậy dễ dàng được xây dựng bằng ứng dụng web  truyền thống khi chủ yếu thực hiện logic trên web server và sinh ra HTML để hiển thị trong trình duyệt. Thực tế là mỗi trang duy nhất của trang web có URL riêng của nó có thể được đánh dấu và lập chỉ mục bởi công cụ tìm kiếm.

**Ứng dựng cần hoạt động cả trong trình duyệt không hỗ trợ javascript**

Các ứng dụng web cần phải hoạt động trong các trình duyệt hạn chế  hỗ trợ JavaScript hoặc không có JavaScript thì nên được viết bằng ứng dụng web truyền thống. SPA yêu cầu JavaScript hoạt động phía client.Nếu không có thì SPA không phải là lựa chọn tốt.

**Đội phát triển ứng dụng không thông thạo công nghệ phát triển bởi javascript hoặc typescript**

Nếu nhóm của bạn không quen thuộc với JavaScript hoặc TypeScript nhưng quen thuộc với việc phát triển ứng dụng web phía server-side, thì có thể việc lựa chọn ứng dụng web truyền thống sẽ nhanh hơn SPA. Trừ khi nghiên cứu chương trình SPA là mục tiêu, hoặc qua kinh nghiệm, yêu cầu SPA là bắt buộc. Các ứng dụng web truyền thống vẫn là lựa chọn hiệu quả hơn cho các team đã quen thuộc với việc xây dựng chúng.
# Khi nào chọn SPA
Sau đây là giải thích chi tiết hơn khi lựa chọn kiểu ứng dụng single page để phát triển cho ứng dụng web của bạn.

**Ứng dụng của bạn phải thể hiện một giao diện người dùng phong phú với nhiều tính năng.**

Các SPA có thể hỗ trợ chức năng phía client rất phong phú mà không yêu cầu tải lại trang khi người dùng thực hiện hành động hoặc điều hướng. SPA có thể load nhanh hơn, thao tác của người sẽ được phản hồi nhanh hơn vì nó không phải tải lại trang một cách đầy đủ.Ngoài ra, SPA còn hỗ trợ cập nhật, lưu dữ liệu form hay văn bản mà không cần ấn submit form.
Các SPA có thể hỗ trợ các hành vi phía client phong phú, chẳng hạn như kéo và thả, dễ dàng hơn nhiều so với các ứng dụng truyền thống. SPA có thể được thiết kế để chạy ở chế độ ngắt kết nối, model được cập nhất phía client và cuối cùng được đồng bộ hóa trở lại server khi kết nối được thiết lập lại.Bạn nên chọn một ứng dụng kiểu SPA nếu các yêu cầu của ứng dụng của bạn bao gồm chức năng phong phú vượt ra ngoài những gì các form HTML điển hình cung cấp.Lưu ý rằng các SPA thường xuyên cần phải triển khai các tính năng được tích hợp trong các ứng dụng web truyền thống, chẳng hạn như
khi hiển thị URL có ý nghĩa trong thanh địa chỉ - phản ánh hoạt động hiện tại (và cho phép người dùng đánh dấu trang hoặc liên kết sâu tới URL này để quay lại). Các SPA cũng sẽ cho phép người dùng sử dụng các nút quay lại và tiến trình của trình duyệt với kết quả không làm họ ngạc nhiên.

**Đội ngũ phát triển đã khá thành thạo JavaScript hoặc TypeScript.**

Viết ứng dụng single page yêu cầu chúng ta phải thành thạo JavaScript hoặc TypeScript và các kỹ thuật cũng như thư viện lập trình bên phía client. Team của bạn cần phải đủ khả năng viết JavaScript hiện đại, chẳng hạn như sử dụng một framework SPA như Angular.

**Ứng dụng của bạn phải phát hành một API cho các client khác (nội bộ hoặc công khai).**

Nếu ứng dụng của bạn hỗ trợ cung cấp các API để các ứng dụng client khác có thể sử dụng thì dường như công sức để xây dựng nó bỏ ra sẽ ít hơn.Vì khi ấy, ta sẽ tận dụng các API này để truy vấn và cập nhật dữ liệu khi người dùng tương tác với ứng dụng thay vì tái tạo logic ở phía server-side.
# Bảng quyết định - Web truyền thống hay SPA
Sau đây là bảng so sánh giữa web truyền thống và spa để mọi người có thể nhìn nhận một cách rõ ràng hơn cũng nhưng có một quyết định chính xác khi xây dựng ứng dụng web
![](https://images.viblo.asia/8203bc77-ae1c-44e8-9872-13e5cd128076.png)
# Lời kết
Mỗi một phương pháp lại có ưu, nhược điểm riêng.Vì vậy, ta hãy xem xét thật kỹ lưỡng những yêu cầu và có thể tham khảo những người có kinh nghiệm để có một quyết định đúng đắn nhé