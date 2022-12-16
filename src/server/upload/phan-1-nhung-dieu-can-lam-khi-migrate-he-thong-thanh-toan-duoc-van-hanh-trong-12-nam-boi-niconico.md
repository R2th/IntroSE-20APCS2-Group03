Dưới đây là nội dung mình dịch lại từ bài viết của engineer đã tham gia trực tiếp vào quá trình migrate hệ thống xử lý tài chính của hệ thống Niconico (là hệ thống chia sẻ video rất nổi tiếng của Nhật Bản).  Vì nội dung khá là dài nên mình chia ra làm 2 phần.

Hy vọng bài viết này có thể chia sẻ thông tin bổ ích tới mọi người:heart_eyes:
# Lời mở đầu

Hôm nay tôi muốn viết về quá trình phân tách “hệ thống tính phí Premium” cung cấp dịch vụ hội viên Premium của Niconico, và quá trình thay đổi của nó. Hệ thống tính phí Premium là hệ thống xử lý tài chính nên chắc sẽ nhiều người có suy nghĩ rằng “việc nghe câu chuyện (đặc biệt nếu đã từng thất bại rồi) thì thấy thú vị nhưng mà bản thân thì chẳng muốn đụng tới đâu” phải không?
Trong bài viết này tôi muốn truyền đạt câu chuyện có thể áp dụng cách cải tiến tổng thể hệ thống kể cả có là hệ thống liên quan tới thanh toán. Ngoài ra, cũng có thể hiểu đây là một cách cải tiến hệ thống tin cậy mà không tiêu tốn quá nhiều chi phí.
# Bối cảnh
## Về Niconico
![](https://images.viblo.asia/0d729b5e-2b2d-433a-a001-32fd2677936a.jpg)
Niconico (ban đầu là Niconico video) là dịch vụ chia sẻ video được cung cấp và vận hành bởi công ty DWANGO Co.,Ltd. từ năm 12/12/2006 và sau đó đổi tên thành Niconico.


Người dùng được yêu cầu phải đăng ký một tài khoản để có thể tải lên, chia sẻ, xem và bình luận các video trên Niconico, mặc dù họ vẫn có thể tự do dyệt tìm tựa đề các video sẵn có. Không giống như nhiều website chia sẻ video trực tuyến khác, các bình luận được phủ trực tiếp lên video và được đồng bộ hóa vào một vị trí phát lại cụ thể. Tính năng này cho phép người xem gửi bình luận để phản hồi trực tiếp các sự kiện xảy ra trong video, đồng bộ với mọi khán giả—tạo ra cảm giác chân thực hơn về trải nghiệm được chia sẻ. Vào một số thời điểm cụ thể trong ngày, một chế độ xem video ở định dạng phân giải thấp là "Low Quality Mode" hay "Economy Mode" sẽ được tự động kích hoạt lên mọi người dùng miễn phí, cung cấp một tùy chọn đăng ký dịch vụ trả phí với mức giá 550 yen một tháng để vô hiệu hóa chế độ này (tính năng của hội viên Premium).


Chỉ trong vòng hơn một năm sau khi khởi động, Niconico là trang mạng đứng thứ 5 tại Nhật Bản về lưu lượng truy cập. Năm 2008, trang web đã được xem trực tuyến hơn 12 triệu giờ mỗi tháng. Vào thời điểm tháng 9 năm 2015, nó là trang mạng được truy cập nhiều thứ 8 tại Nhật Bản. Tính đến ngày 31 tháng 10 năm 2011, Niconico đã có hơn 23.690.000 người dùng đã đăng ký, 6.870.000 người dùng trên điện thoại và 1.390.000 người dùng trả phí. Trang này đã đoạt Giải thưởng Good Design Nhật Bản vào năm 2007, và giành giải Danh dự cho hạng mục Các cộng đồng Kỹ thuật số của Prix Ars Electronica năm 2008.
## Về dịch vụ hội viên Premium
![](https://images.viblo.asia/90a159b2-8310-4bc7-99b8-4e6631dfb51a.png)

Chế độ hội viên Premium mỗi tháng thu 500¥ (chưa gồm thuế) có tới 1.590.000 người (tính tới hiện tại là cuối tháng 9 năm 2020) tham gia, và là dịch vụ thu phí chủ yếu đem lại công việc kinh doanh của Niconico.
Niconico bắt đầu dịch vụ vào năm 2006 và bắt đầu mở dịch vụ hội viên premium vào năm 2007. 

Hệ thống thực hiện tính phí premium lúc đó được code trong hệ thống video. Những người biết tới công việc này lúc đó rất là ít, và tôi cũng chỉ có thể tưởng tượng từ trong code và tài liệu còn sót lại mà thôi. Nhưng mà tôi nghĩ là nó đã được tạo ra bằng rất nhiều sự nỗ lực để làm hệ thống trực tiếp mang lại doanh thu.
## Thay đổi yêu cầu nghiệp vụ
Hội viên Premium là những khách hàng quan trọng nhất đối với công việc kinh doanh của Niconico. Thế nhưng lại có một vấn đề là hệ thống tính phí Premium rất phức tạp và để thay đổi nó sẽ mất rất nhiều thời gian. Ngoài ra, do áp lực từ việc nếu hệ thống xảy ra vấn đề sẽ gây ảnh hưởng tới doanh thu nên khó để hình thành động lực để bắt tay vào làm.

## Sự phổ biến của cách thức thanh toán mới
Giữa thời đại phương thức thanh toán không dùng tiền mặt đang phổ biến nhanh chóng, đã xuất hiện thêm những phương thức thanh toán phù hợp với nền tảng thanh toán trong tương lai. Cụ thể như trả sau bằng thanh toán QR code hay là Micropayment (thực hiện các khoản thanh toán nhỏ mà không mất phí - https://coinstar.vn/micropayment). 

Do sự xuất hiện của những công ty cung cấp dịch vụ tài chính sử dụng ICT được gọi là Fintech, hình thức thanh toán sau này được cho là còn được đa dạng hóa nữa. Từ quan điểm cho phép end user lựa chọn được hình thức thanh toán yêu thích, hệ thống tính phí Premium cũng cần phải tiếp tục nỗ lực để tích hợp với những hình thức thanh toán mới này. 

## Tính cần thiết để sửa lại toàn bộ code
Kể từ khi mở hệ thống tới thời điểm năm 2019 đã lên kế hoạch phân tách hệ thống ra khỏi hệ thống video, đã trải qua 12 năm. 

Code của hệ thống tính phí Premium không được cải tiến liên tục, mà vẫn còn tồn tại cả những module còn sót lại từ thời điểm khởi đầu. Nôm na được gọi là PHP huyền thoại. Để thay đổi hệ thống này cần phải sửa lại toàn bộ code.
# Vấn đề
## Không được phép sửa hoàn toàn
Hệ thống tính phí Premium là hệ thống có yêu cầu nghiệp vụ rất phức tạp. Chỉ nhìn spec của Web/API thôi đã có thể thấy được kết cấu, nhưng mà thực tế thì có 2 đặc thù như dưới đây.
* Có nhiều system liên kết bên ngoài
Trong thanh toán, cần phải tích hợp với công ty đại lý thanh toán và hãng viễn thông.
Những hoạt động hay hành vi có thể xác nhận ở môi trường test của các công ty bị hạn chế
* Có yêu cầu chi tiết trong pháp luật nói chung
Từ quan điểm bảo vệ người tiêu dùng cần có yêu cầu chi tiết về requirement trên màn hình. 
Cần có require ví dụ như là phải lưu trữ hóa đơn đặc định trong tối thiểu 7 năm


Đặc biệt là việc liên kết với hệ thống bên ngoài chính là vấn đề, chỉ riêng tài liệu của các công ty đại lý thanh toán và hãng viễn thông đã tính sơ sơ đã hơn 1000 page. Có cả những chỗ sử dụng API đặc biệt mà không có bất cứ tài liệu nào, và rõ ràng là để nắm được ở mức độ có thể code lại toàn bộ cần rất nhiều thời gian.


Ngoài ra, hiện trạng là không có tài liệu ở mức business requirement và system requirement, tôi đã phán đoán ở trạng thái đó thì nếu có sửa đơn giản thôi cũng rất là nguy hiểm.

## Nhắm tới hệ thống có thể thay đổi an toàn
Nếu thay đổi system requirement tới hệ thống thì đương nhiên là cần thay đổi cả code rồi. Trạng thái lúc đó thì việc thay đổi code là cực kì khó khăn. 


Nguyên nhân trực tiếp được mô tả ở dưới đây.
* Không có và không thể tạo được môi trường phát triển (còn gọi là môi trường phát triển local) của riêng từng engineer
* Không có unit test hay là integration testing 
* Có phần không có tài liệu business requirement hay là specification
* Không đủ tài liệu thiết kế hệ thống, infra
* Đang quản lý version của code đã deploy bằng Subversion
Chỉ sử dụng tính năng review code của GitHub Enterprise 
# Lập kế hoạch dự án
![](https://images.viblo.asia/9ce677a9-b6f9-4f3f-97ac-9ea453c44a29.png)

## Thiết lập mục tiêu
Tôi vừa tham khảo những cái như ITIL (là bộ tập hợp các best practice Quản lý dịch vụ CNTT (ISMS), tập trung vào việc sắp xếp các dịch vụ CNTT sao cho phù hợp với yêu cầu kinh doanh), vừa sắp xếp vấn đề từ 2 quan điểm “thực hiện quản lý CR chỉn chu” và “thực hiện quản lý cấu trúc nghiêm ngặt”, và thiết lập mục tiêu.
### Giải quyết việc share repository (quản lý thay đổi)
Mục tiêu là giải quyết tình trạng share repository với hệ thống Niconico Video, có thể quản lý/vận hành repository ở hệ thống tính phí premium độc lập. Ngoài ra, các file setting cũng được phân tách tương tự và là các file setting độc lập với hệ thống Niconico video.
### Hoàn toàn thoát khỏi Subversion (quản lý thay đổi)
Mục tiêu là không team nào chủ động sử dụng Subversion trong nội bộ Dwango, và ngoài ra về mặt kỹ thuật thì Git cũng quen thuộc hơn nên bắt buộc bỏ hoàn toàn khỏi Subversion.
### Tool quản lý cấu trúc khác với môi trường thực tế (quản lý cấu trúc)
Đã sử dụng tool quản lý cấu trúc là Ansible nhưng mà bị rơi vào trạng thái không thể áp dụng lần nữa vào môi trường PRD và không thể đảm bảo tính idempotent. Mục tiêu được đề ra là phải có thể quản lý cấu trúc chắc chắn bằng cách giải quyết vấn đề này cùng với việc migrate hệ thống.


Idempotent: có thể tham khảo link sau https://viblo.asia/p/mot-so-chia-se-khi-thiet-ke-api-bWrZn6gOZxw
## Hình thành thống nhất việc migrate hệ thống
Nó khác xa với nội dung kỹ thuật nên tôi viết khá đơn giản, nhưng mà việc hình thành thống nhất việc migrate hệ thống lại dễ dàng bất ngờ. Khác với những gì tôi đã tưởng tượng trước đó, vì lý do bắt buộc phải trưởng thành về mặt business nên hoàn toàn không thấy có phản đối nào cả. 

Từ mục đích và những vấn đề đó, bắt buộc phải suy nghĩ nghiêm túc về thực hiện đối sách như nào đối với những rủi ro không thể migrate hoàn toàn.

Bài viết tương đối dài nên mời mọi người tiếp tục theo dõi phần 2 nhé...

Nguồn dịch: https://qiita.com/chiyoppy/items/2571e8e3ae675cc7a991