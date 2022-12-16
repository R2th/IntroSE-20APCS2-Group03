Chào các bạn,

Tính ra cũng đã hơn một năm kể từ lần cuối mình viết bài chia sẻ. Trong quá trình học và làm việc, mình có tìm hiểu được vài thứ hay ho muốn chia sẻ với mọi người nhưng vì bận quá nên vẫn ngâm nó đến bây giờ. Nhân lúc Viblo đang có sự kiện Mayfest 2022 nên mình quyết định dành chút thời gian chia sẻ với mọi người về một chủ đề mà mình vừa tìm hiểu trong đợt làm đồ án tốt nghiệp vừa rồi.

Vào chủ đề chính thôi, cùng mình điểm danh qua một số extension trong Burp Suite giúp cho việc kiểm thử ứng dụng web của bạn đạt được hiệu quả hơn nhé!

# Sơ lược về Burp Suite
**Burp Suite** là một công cụ kiểm thử bảo mật ứng dụng web mạnh mẽ có thể được sử dụng để thực hiện nhiều tác vụ khác nhau. Điều phân biệt Burp Suite với các máy chủ proxy khác hiện có trên thị trường và khiến nó trở thành lựa chọn ưu tiên số 1 cho đa số cá nhân và tổ chức chính là tính đơn giản, giao diện trực quan và khả năng tích hợp các tiện ích mở rộng để cung cấp thêm chức năng không được bao gồm theo mặc định.

Trong bài viết này, mình sẽ chia sẻ một số tiện ích mở rộng phục vụ cho nhiều công việc khác nhau của Burp Suite mà mình đã từng sử dụng qua và mình nhận thấy rằng chúng sẽ giúp việc kiểm thử xâm nhập ứng dụng web của pentester dễ dàng và nhanh chóng hơn.

À, còn một lưu ý nhỏ trước khi đến với từng extension cụ thể đó là các extension của Burp Suite có thể được viết bằng các ngôn ngữ như Java, Python hoặc Ruby. Đối với các tiện ích mở rộng được viết trong môi trường Java thì không yêu cầu cấu hình ở phía người sử dụng. Tuy nhiên, với những extension được viết bằng Python hoặc Ruby thì yêu cầu người dùng phải cài đặt thêm JPython và JRuby tương ứng.

## 1. JSON Beautifier
JSON là viết tắt của **JavaScript Object Notation**. Nó là một định dạng để lưu trữ hoặc truyền dữ liệu. Một trong những ưu điểm nổi bật nhất của JSON chính là tính dễ hiểu của nó. 

Việc sử dụng API ngày càng tăng và lựa chọn ưu tiên khi xây dựng API là JSON. Tuy nhiên, đối với các ứng dụng lớn và phức tạp, chúng ta có thể sẽ bị choáng bởi lượng dữ liệu nhận được từ response trả về. Các dữ liệu quá nhiều và rối mắt khiến chúng ta khó khăn trong việc đọc và quan sát. Vậy giải pháp cho vấn đề này là gì? Một số người sẽ sao chép toàn bộ dữ liệu đó và dán vào một trình soạn thảo như Sublime Text chẳng hạn và sau đó format chúng, hoặc cũng có người sử dụng các công cụ trực tuyến sẵn có.

Và trong Burp Suite cũng có một extension hỗ trợ làm việc đó, chính là JSON Beutifier. Đây là một tiện ích mở rộng của Burp Suite cung cấp cho người kiểm thử sự linh hoạt trong việc format lại các dữ liệu đầu ra dưới dạng JSON một cách đẹp hơn.

Để cài đặt extension này, chỉ cần vào phần BApp trong tab **Extender** và tra cứu với tên **JSON Beautifier**. Sau khi cài đặt, nó sẽ xuất hiện trong tab Repeater. 
Mã nguồn của extension này cũng được công khai trên Github tại link sau: https://github.com/PortSwigger/json-beautifier

*Minh họa trước khi áp dụng extension*:

![image.png](https://images.viblo.asia/3d8c931f-aab1-4534-b180-92b469af06cd.png)

*Sau khi đã áp dụng extension JSON Beautifier*:

![image.png](https://images.viblo.asia/a5dce1ca-6885-4f62-91eb-48a72ddb6fa0.png)

Nguồn ảnh: https://github.com/PortSwigger/json-beautifier

## 2. JSON Web Tokens
JSON Web Token (JWT) đang dần được sử dụng rộng rãi hơn. Đó là một cách để thực hiện xác thực và ủy quyền bằng cách sử dụng cùng một token. Tuy nhiên, đa phần là nó được sử dụng cho việc xác thực. Mặc dù JWT có thể giải quyết nhiều vấn đề phức tạp của ID session, nhưng nó vẫn tồn tại các vấn đề về lỗi cấu hình trong cách JWT được triển khai.

Khi nói đến JWT, chúng ta có thể sử dụng các công cụ trực tuyến như jwt.io, CyberChef hoặc sử dụng các công cụ bằng dòng lệnh để áp dụng nó. Tuy nhiên, điều này đòi hỏi chúng ta phải thực hiện thêm một số bước nhưng không phải lúc nào cũng cho ra kết quà như mong muốn. Và JSON Web Tokens extension với tên gọi **JWT4B** chính là chìa khóa giải quyết vấn đề này.

JSON Web Tokens (JWT) support for the Burp Interception Proxy. JWT4B will let you manipulate a JWT on the fly, automate common attacks against JWT and decode it for you in the proxy history. JWT4B automagically detects JWTs in the form of 'Authorization Bearer' headers as well as customizable post body parameters and body content.

JSON Web Tokens (JWT) hỗ trợ Burp Interception Proxy. JWT4B sẽ cho phép người dùng thao tác với JWT một cách nhanh chóng, giải mã và thao tác với JWT và tự động hóa các cuộc tấn công thông thường. JWT4B tự động phát hiện các JWT ở dạng **'Authorization Bearer'** header cũng như cho phép tùy chỉnh các tham số và nội dung trong phần thân của POST request.

Để cài đặt extension này, chỉ cần vào phần BApp trong tab Extender và sau đó tìm kiếm với tên **JSON Web Token**. Sau khi cài đặt, nó sẽ hiển thị trong tab mới trong cửa sổ Burp Suite.
Mã nguồn của extension này cũng được công khai trên Github tại link sau: https://github.com/PortSwigger/json-web-tokens

Một số ảnh minh họa extension:

![image.png](https://images.viblo.asia/ca3e3851-c827-42ba-bf79-38f7c087142c.png)
![image.png](https://images.viblo.asia/7e0a0165-ab17-47cf-9f4e-0db0852c5755.png)
Nguồn ảnh: https://github.com/PortSwigger/json-web-tokens

## 3. Autorize
Việc phân quyền là một vấn đề khó giải quyết trong các hệ thống. Nhiều chức năng có thể không được kiểm soát phân quyền và do đó dễ bị tấn công. Một cách tiếp cận chung để kiểm tra các vấn đề về phân quyền là kiểm tra ứng dụng lần lượt với tư cách là người dùng đặc quyền, sau đó là người dùng không có đặc quyền và sau đó kiểm tra xem người dùng không có đặc quyền có quyền truy cập hoặc có thể truy cập các chức năng đặc quyền hay không.

Để thực hiện việc này trong Burp Suite, chúng ta sẽ làm với các bước như sau:
1. Chặn bắt request
2. Gửi request sang tab Repeater
3. Giả mạo cookie và header để xem liệu chúng ta có thể truy cập các chức năng bị hạn chế hay không. 

Liệu rằng có một tiện ích mở rộng làm được toàn bộ quá trình này hay không? Câu trả lời đó chính là **Autorize**. 

Người dùng chỉ cần đăng nhập vào ứng dụng web với tư cách là người dùng không có đặc quyền. Lấy cookie hoặc bất cứ nội dung gì có thể dùng để xác thực phiên người dùng, sau đó sao chép nó vào Autorize. Cuối cùng là đăng nhập vào ứng dụng với tư cách là người dùng có đặc quyền và thử thực hiện các chức năng khác nhau. Autorize sẽ cố gắng truy cập các chức năng và thực hiện các hành động giống như chúng ta đang thực hiện trong trình duyệt của mình. Sau đó, nó sẽ hiển thị những cái nào có thể được truy cập bởi một tài khoản không có đặc quyền.

Mã nguồn của extension này cũng được công khai trên Github tại link sau: https://github.com/PortSwigger/autorize
Chi tiết về các bước cài đặt và hướng dẫn sử dụng cũng đều được trình bày chi tiết trong repo phía trên.

Ảnh minh họa:

![image.png](https://images.viblo.asia/4a77cae3-9185-454b-8d85-c6efc57384d8.png)

# Tạm kết
Vậy là mình đã vừa điểm qua một số extension nổi bật giúp hỗ trợ pentester dễ dàng và thuận tiện hơn trong việc kiểm thử ứng dụng web bằng Burp Suite. Với những điều mình chia sẻ phía trên đây thì chắc chắn là chưa đủ, để có thể hiểu rõ hơn về cách sử dụng cũng như lợi ích mà nó mang lại thì mình nghĩ các bạn nên tự trải nghiệm bằng việc cài đặt và sử dụng. Hẹn gặp các bạn trong phần sau với các extension hữu ích khác trong Burp Suite nữa nhé!