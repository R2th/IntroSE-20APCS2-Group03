![](https://images.viblo.asia/1b74e951-2942-4d1a-ba12-f5e8259b61b1.jpg)

Khi bạn hoặc team mình develop ra một ứng dụng Web thì bạn có biết là, ứng dụng Web đó đã có các biện pháp bảo mật hay chưa không ? Nếu một lỗ hổng tồn tại trong ứng dụng web của bạn, thì rất dễ phát sinh ra các trường hợp trang web của bạn bị giả mạo, bị đánh sập, hoặc thậm chí là sẽ bị rò rỉ thông tin cá nhân.

Ví dụ dễ hiểu nhất là, hình dung trường hợp một site EC của một công ty mà bị sập thì ta sẽ hiểu được vấn đề ở đây nghiêm trọng như thế nào. Tuy nhiên, đang tiếc là chúng ta lại thường không biết về các lỗ hổng của ứng dụng Web mà chúng ta xây dựng lên.

Ở bài viết này, tôi muốn giới thiệu công cụ chẩn đoán bảo mật "OWASP ZAP". Bằng cách sử dụng OWASP ZAP, bạn có thể kiểm tra lỗ hổng của ứng dụng web. Và quan trọng nhất là, bạn hoàn toàn có thể sử dụng nó miễn phí :laughing:.

Hãy cùng tìm hiểu một chút về OWASP ZAP.

## Lỗ hổng của ứng dụng Web là gì ?
Nếu đây là lần đầu tiên bạn nghe về thuật ngữ "Ứng dụng web", thì tôi muốn bạn nhớ định nghĩa của nó một cách đơn giản chỉ là "một trang web có chức năng tiện lợi trên Internet". Ví dụ: các công cụ tìm kiếm như Google và Yahoo! là "ứng dụng web".

Một trang web phục vụ việc kiểm tra số dư tài khoản ngân hàng cũng là một ứng dụng web. Ngoài ra, các trang e-learning, blog... tất cả đều là các ứng dụng web.

Để hiểu rõ hơn về lỗ hổng, hãy cùng  xem xét trường hợp của các trang EC (như Tiki, Lazada ...). Đối với các công ty quản lý EC, trang web EC là một công cụ bán hàng quan trọng.

Nếu có một lỗ hổng trong ứng dụng web của trang EC này, và nếu nó bị tấn công mạng, bị hack,  thì có khả năng nó sẽ phải chịu những thiệt hại sau.

* Mất cơ hội bán hàng do trang EC bị đình chỉ
* Bị rò rỉ thông tin khách hàng
* Phải xin lỗi khách hàng và bồi thường
* Bị đánh mất hình ảnh thương hiệu ...

Để tránh xảy ra các thiệt hại như trên, tôi nghĩ bạn sẽ muốn điều tra lỗ hổng của ứng dụng web của mình bằng công cụ chẩn đoán bảo mật OWASP ZAP.

## Ai đã tạo ra OWASP ZAP ?
Công cụ chẩn đoán bảo mật "OWASP ZAP" được tạo bởi một cộng đồng quốc tế có tên là The Open Web Application Security Project (OWASP).
OWASP được điều hành bởi tổ chức có tên The OWASP Foundation (Quỹ OWASP) tại Hoa Kỳ và được thành lập vào năm 2001. Ngày nay thì đã có hơn 200 chi nhánh trên khắp thế giới. Tại Nhật Bản cũng có OWASP Nhật Bản. Mục đích của The OWASP Foundation là bảo vệ các ứng dụng Web, vì vậy các thành viên của OWASP đang thực hiện hơn 120 dự án. Và OWASP ZAP là tool được tạo ra bên trong hơn 120 dự án đó, để cho bất cứ ai cũng có thể kiểm tra các lỗ hổng của ứng dụng web một cách miễn phí.

## Cách sử dụng OWASP ZAP
Cách sử dụng của OWASP ZAP thực sự rất đơn giản.

Chỉ cần tải OWASP ZAP về máy tính của bạn và nhập URL của ứng dụng Web mà bạn muốn kiểm tra lỗ hổng. Nó sẽ cố gắng tấn công ứng dụng Web đó để kiểm tra, xác định điểm yếu và  đưa ra cho chúng ta biết những điểm yếu mà nó đã tìm thấy.

Có thể tải xuống OWASP ZAP từ URL sau.
https://github.com/zaproxy/zaproxy/wiki/Downloads

Khi tải xuống, một thông báo "Bạn có muốn lưu ?" xuất hiện, hãy lưu nó. 
Tiếp theo, sẽ xuất hiện thông báo hỏi "Bạn muốn lưu ZAP session như thế nào ?", check vào checkbox "Không lưu liên tục, chỉ lưu session khi cần"  rồi nhấp vào "Bắt đầu". 
Như vậy, OWASP ZAP đã sẵn sàng để chạy trên máy tính, sau khi thực hiện cài đặt proxy thì bạn có thể thực hiện kiểm tra lỗ hổng.

## OWASP ZAP kiểm tra những gì ?
OWASP ZAP kiểm tra lỗ hổng của ứng dụng web bằng ba phương pháp kiểm tra sau.

* Scan đơn giản
* Scan tĩnh
* Scan động

Hãy cùng xem xét cụ thể từng phương pháp.

### Scan đơn giản sẽ làm gì ?
"Scan" nghĩa là tấn công ứng dụng web mục tiêu. Khi nhập URL của ứng dụng Web cần kiểm tra trong OWASP ZAP, quá trình scan đơn giản sẽ bắt đầu. Tùy trường hợp mà việc scan  có thể được thực hiện trong vài phút, nhưng hoặc có thể mất vài giờ.

OWASP ZAP sẽ gửi một số lượng lớn request đến ứng dụng Web mục tiêu. ("Request" theo thuật ngữ máy tính là "yêu cầu" hoặc "tin nhắn" được trao đổi trên hệ thống máy tính.) Khi quá trình scan đơn giản hoàn tất, các lỗ hổng được tìm thấy sẽ được hiển thị ở mục "Alert (warning)" trên màn hình.

### Scan tĩnh sẽ làm gì ?
Trong quá trình scan tĩnh, người thao tác OWASP ZAP (user) sẽ thực sự sử dụng thử ứng dụng Web mục tiêu.
Ví dụ: nếu ứng dụng Web mục tiêu là trang EC, thì user sẽ mở trang sản phẩm, cho sản phẩm vào "Giỏ hàng" rồi thực hiện thanh toán.
Bằng cách thực hiện các thao tác mà user luôn thực hiện ở ứng dụng Web, OWASP ZAP sẽ thực hiện kiểm tra là ứng dụng Web đã hoạt động như thế nào ứng với thao tác của user.
Khi scan tĩnh hoàn thành, các lỗ hổng được tìm thấy cũng sẽ được hiển thị dưới dạng Warning.

### Scan động sẽ làm gì ?
Scan động được thực hiện bằng cách gửi một số lượng lớn request (giống như quá trình scan đơn giản) đối với các vị trí thực hiện scan tĩnh. Mục đích là "Thử cố gắng tấn công một lần nữa" nhằm tìm ra các điểm yếu đã bị sót ở scan đơn giản  và scan tĩnh.

## Kết luận~ Hãy sử dụng thử OWASP ZAP
OWASP ZAP có thể được sử dụng miễn phí. Vì vậy, hãy thử sử dụng nó để kiểm tra ứng dụng web của mình. Và nếu tìm thấy lỗ hổng, bạn có thể yêu cầu bên phát triển hệ thống thực hiện kiểm tra bảo mật thông tin một cách đầy đủ. Hãy thử sử dụng OWASP ZAP.