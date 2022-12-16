AJAX ngày càng trở nên phổ biến hơn trong những năm qua. AJAX có thể cung cấp nhiều chức năng bổ sung mà không thể thực hiện được bằng bất kỳ cách nào khác.

#### AJAX là gì? Làm thế nào nó hoạt động?

AJAX là viết tắt của Asynchronous JavaScript and XML. Nó được sử dụng để cho phép phía client của một ứng dụng giao tiếp với phía sever của ứng dụng. Trước khi có AJAX, không có cách nào để phía client của ứng dụng web giao tiếp trực tiếp với sever. Thay vào đó, bạn sẽ phải sử dụng tải trang. Với AJAX, client và sever có thể giao tiếp tự do với nhau.


#### Đây là cách tập lệnh AJAX thông thường hoạt động:

* Một số hành động kích hoạt sự kiện, chẳng hạn như người dùng nhấp vào nút.
* Lệnh AJAX kích hoạt và gửi yêu cầu tới tập lệnh phía máy chủ, sử dụng XML
* Tập lệnh phía máy chủ (PHP, ASP hoặc bất cứ thứ gì) lấy đầu vào từ JavaScript, có thể truy cập cơ sở dữ liệu nếu cần và xử lý dữ liệu.
* Sử dụng lại XML, tập lệnh sẽ gửi dữ liệu trở lại trang phía máy client đã thực hiện yêu cầu
* Một hàm JavaScript thứ hai, được gọi là callback function, lấy liệu và cập nhật trang web

#### 1. Biểu mẫu đăng nhập
![](https://images.viblo.asia/089b8107-64c3-4c64-9c0b-875924e955e0.png)

Thay vì truy cập trang đăng nhập, sau đó điều hướng trở lại trang bạn muốn ban đầu, với AJAX, người dùng có thể nhập trực tiếp tên người dùng và mật khẩu của họ vào trang gốc. Từ đó AJAX sẽ gửi yêu cầu đến máy chủ để 


#### 2. Tự động hoàn thành

Google là một trong những công ty lớn đầu tiên bắt đầu sử dụng AJAX và công cụ gợi ý tìm kiếm của Google là một trong những cách đầu tiên họ sử dụng nó và là một trong những công cụ tự động hoàn thành đầu tiên được tạo ra. Khi gõ vào thanh tìm kiếm của Google, nó sẽ bắt đầu sử dụng AJAX để nhận các kết quả chung từ cơ sở dữ liệu trên mỗi lần gõ phím. Tự động hoàn thành cho các biểu mẫu mà bạn có thể có nhiều input và nếu hiện một dropdown sẽ quá dài và rườm rà.

![](https://images.viblo.asia/786ed00b-5559-44ea-93ad-bb64fa91081e.png)


#### 3. Bỏ phiếu và xếp hạng

Các trang web đánh dấu trang xã hội như Digg và Reddit cho phép người dùng quyết định nội dung chính của trang web bằng cách bỏ phiếu cho nội dung mà người dùng thích. Họ sử dụng AJAX để xử lý tất cả các cuộc bỏ phiếu, để người dùng có thể nói lên ý kiến của họ về một số câu chuyện một cách nhanh chóng và dễ dàng.

![](https://images.viblo.asia/a1245f42-82c4-4a06-b3a0-a0e765058165.jpg)


#### 4. Cập nhật với nội dung người dùng

Một trong những điều khiến Twitter trở nên phổ biến là giao diện đơn giản và dễ sử dụng của họ. Khi ai đó tạo một "tweet", nó sẽ được thêm ngay lập tức vào nguồn cấp dữ liệu của họ và mọi thứ đều được cập nhật. Gần đây, Twitter đã bắt đầu sử dụng AJAX với các trang ‘chủ đề thịnh hành’ của họ. Cứ sau vài giây, trang cho phép người dùng biết rằng có nhiều tweet hơn đã được thực hiện về chủ đề này, cung cấp cho họ thông tin cập nhật từng giây.


#### 5. Gửi biểu mẫu & xác thực

Các biểu mẫu luôn phức tạp để làm việc, nhưng AJAX có thể làm cho chúng tốt hơn rất nhiều cho người dùng. AJAX có thể được sử dụng theo nhiều cách khác nhau, từ tự động hoàn thành đã đề cập ở trên, đến xác nhận và gửi. Một số trang web sử dụng AJAX để kiểm tra xem biểu mẫu có đáp ứng một số yêu cầu nhất định hay không, chẳng hạn như độ mạnh của mật khẩu hoặc liệu một thứ gì đó có phải là email hoặc URL hợp lệ hay không.


#### 6. Phòng trò chuyện và nhắn tin tức thì

Phòng trò chuyện và nhắn tin tức thì giờ đây có thể được xử lý hoàn toàn trong trình duyệt. Có hai quy trình AJAX chính trong phòng trò chuyện hoặc ứng dụng IM. Hãy coi một trong số chúng là tai của bạn và một trong số chúng là miệng của bạn. ‘Miệng’ của bạn cập nhật máy chủ và cho máy chủ biết rằng bạn đã gửi tin nhắn. "Tai" kiểm tra liên tục với máy chủ và cập nhật trang của bạn với các tin nhắn được gửi bởi bất kỳ ai bạn đang trò chuyện.


#### 7. Giao diện người dùng nhấp nháy

Tạo giao diện người dùng gọn gàng, mượt mà là cách sử dụng rất phổ biến của AJAX. Nó cho phép người dùng hoàn thành nhiều việc hơn trên một trang. Lợi ích của việc này gấp đôi: Thứ nhất, nó làm cho việc sử dụng ứng dụng web nhanh hơn và dễ dàng hơn cho người dùng; Thứ hai, nó cắt giảm số lượng yêu cầu bạn phải thực hiện với máy chủ, làm giảm băng thông và thời gian tải. Một dịch vụ tải lên tệp miễn phí có tên Drop.io sử dụng tốt điều này. Google cũng đã thực sự thúc đẩy những gì có thể với AJAX bằng cách tạo ra các ứng dụng giống như máy tính để bàn như Google Docs và Google Maps.


#### 8. Tiện ích bên ngoài

Khi sử dụng AJAX, trang đang sử dụng JavaScript không chỉ giới hạn ở máy chủ mà nó được đặt. AJAX có thể thực hiện cuộc gọi trực tuyến đến bất kỳ máy chủ nào. Đây là cách hoạt động của một số plugin cho Hệ thống quản lý nội dung như WordPress và các tập lệnh khác nhau như Google Adsense.


#### 9. Hộp đèn thay vì cửa sổ bật lên

Ngày nay, các trình chặn popup rất phổ biến và vì một lý do chính đáng: popup rất khó chịu. Sử dụng light boxes, là popup hiện bên trong cửa sổ trình duyệt, trình chặn popup không thể ngăn chặn nó và chúng không gây khó chịu cho người dùng. Một số người sử dụng chúng để quảng cáo. Chúng cũng có thể được sử dụng cho một cái gì đó như đăng nhập hoặc hộp đăng ký nhận thông tin.