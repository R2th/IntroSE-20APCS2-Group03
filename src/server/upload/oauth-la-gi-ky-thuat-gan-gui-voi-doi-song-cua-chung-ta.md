*Dịch từ bài viết[ 実は身近な存在？OAuthとは何かを探る](https://www.secioss.co.jp/実は身近な存在%ef%bc%9foauthとは何かを探る/)*
# 「OAuth」- kỹ thuật không thể thiếu
Chắc hẳn nhiều người sẽ cảm thấy xa lạ với từ OAuth. Bởi OAuth có chứa cụm Auth nên có lẽ các bạn cũng đã hình dung đái khái rằng nó có liên quan đến xác thực người dung. Thế nhưng còn “O” thì sao? “O” có ý nghĩa gì? Trường hợp tên chính thức của một sự vật, hiện tượng được cấu thành bằng một từ viết tắt, việc gặp  khó khăn khi đi tìm từ nguyên gốc là điều tất nhiên. 

Vậy thì, trước tiên chúng ta hãy bỏ qua việc đi tìm ý nghĩa của từng từ đơn cấu thành nên OAuth. Hãy cùng tìm hiểu xem kỹ thuật này được ứng dụng ở đâu? Trong số những câu trả lời cho câu hỏi này, có một đáp án quen thuộc đến mức khiến nhiều người bất ngờ: Tính năng liên kết giữa các mạng xã hội. 

Hãy thử tưởng tượng trường hợp bạn đăng một bức ảnh lên Instagram và đồng thời muốn bức ảnh ấy xuất hiện trên trang Facebook của bạn. Khi đó, bạn sẽ thực hiện thao tác đăng ký tài khoản Facebook liên kết với tài khoản Instagram. Sau khi thực hiện xong việc đăng ký này, những bức ảnh bạn đăng tải trên trang Instagram của bạn cũng sẽ trở thành bài đăng Facebook. Với Instagram, bạn không chỉ có thể thực hiện liên kết với Facebook mà còn có thể liên kết tài khoản của mình với các tài khoản SNS khác như Twitter, Tumblr, v.v. Đảm nhận vai trò nòng cốt cho tính năng liên kết này chính là OAuth.

# “Auth” không phải là “Xác thực”
Trong trường hợp vừa nêu trên chúng ta tất nhiên phải thực hiện xác thực người dung trên Instagram. Vậy còn các SNS như Facebook, Twitter thì phải làm sao? Tất nhiên, phía Instagram không sở hữu các thông tin xác thực như User ID, password bạn sử dụng cho tài khoản Facebook. 

Lúc này, hãy cùng nhau xem lại nguồn gốc của từ “Auth”. Từ “Auth” thực ra không phải là viết tắt của từ xác thực - “Authentification”, mà có nguồn gốc từ  “Authorization” nghĩa là cấp phép. Authentification – Authorization, đây là 2 từ khá tương tự nhau nhưng lại là 2 từ khác biệt.

*“Xác thực” nghĩa là xác nhận một đối tượng là ai. Cụ thể hơn một chút, authenfication là danh từ để chỉ việc xác nhận người sắp thực hiện thao tác là bản thân user mà không phải ai khác. *

Ví dụ tiêu biểu cho Authentification là mã PIN hay password của thẻ ngân hàng. Việc xác thực bằng userID và mật khẩu đang đem đến nhiều lợi ích cho con người. Những năm gần đây, việc xác thực người dung càng trở nên an toàn và bảo mật hơn nhờ vào sự xuất hiện và phổ cập của Biometric authentication.  

Vậy Authorization - Cấp phép là gì?

***Cấp phép nghĩa là cho phép đối tượng được cấp quyền được làm một việc nào đó, tức là sự chỉ định việc được phép làm. ***

Trong ví dụ kể trên, một user Instagram đã thông qua một số thủ tục nhất định, cho phép một user Facebook tự động đăng tải bài viết của mình. Hành động được thực hiện ở đây là cho phép thao tác đăng bài được thực hiện, chứ không phải xác nhận user đó là ai trên Facebook. 

Kết quả là, user không cần login phía Facebook mà vẫn có thể đăng bài thông qua Instagram. Ví dụ tôi đưa ra ở đây là ví dụ về việc liên kết SNS. Tuy nhiên, thực tế, cơ chế OAuth được sử dụng ngày càng phổ biến ở các Web application. 

Về chữ cái “O” trong OAuth, ngay cả trên trang chính thức  cũng không có sự giải thích tường minh, tuy nhiên, vì OAuth là open standard nên ta có lẽ có thể hiểu rằng O là viết tắt của Open. 

# Token sử dụng cho việc cấp quyền
Tất yếu cần có quy tắc cho việc cấp quyền. Nếu không có bất cứ quy tắc, quy định nào, application có thể bị sự công kích từ người dung  xấu và dẫn tới những hậu quả khó có thể tồn tại. Quy tắc ở đây là phương pháp trao access token. Access token là token biểu thị request được cho phép, có vai trò giống như một chiếc chìa khóa. Chiệc “chìa khóa” này được authorization server cấp cho client application.

Thực tế, với OAuth 2.0 được tiêu chuẩn hóa theo RFC6749, quy trình response một access token request đã được tiêu chuẩn hóa. Nói rằng OAuth được sử dụng trong việc liên kết SNS là bởi nó là thủ tục để một application khác có được những thông tin mong muốn. Server của Application sẽ nhận được access token thông qua API, tiến hành phân tích token. Nếu request đã được cấp phép, server sẽ tiến hành xử lý và trả về các thông tin cần thiết.

# Mối quan hệ của OAuth và OpenID
Việc cấp quyền bằng cách sử dụng OAuth rất tiện lợi nhưng không phải là vạn năng. Việc không có chức năng login thể hiện sự tạm thời, không ổn định. Chính vì vậy, OAuth 2.0 được mở rộng, thêm vào chức năng xác thực và get thuộc tính, trở thành phương pháp liên kết ID với tên gọi OpenID Connect.

Ở đây, hãy lưu ý OpenID Connect và OpenID 2.0 có chung một phần tên gọi, nhưng đây là 2 khái niệm khác nhau. OpenID có tên gọi chính thức là OpenID Authentication, là việc chia sẻ xác thực người dung thông qua Internet.

 Khi một người dung đồng thời sử dụng nhiều application và website, việc quản lý nhiều bộ thông tin userID, password rất phiền phức. 
 
 OAuth và OpenID là những kỹ thuật được sử dụng nhằm tiếp cận mục đích này.

# ▼Referenced link:

OAuth2.0 Official site:
https://oauth.net/2/

RFC6749 The OAuth 2.0 Authorization Framework
https://tools.ietf.org/html/rfc6749