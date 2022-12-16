Ở bài trước tôi đã hướng dẫn các bạn cách xác thực[ REST API với JWT(JSON Web Token)](https://anonystick.com/blog-developer/json-web-token-van-de-xac-thuc-rest-api-voi-jwtjson-web-token-201906074991365.jsx) thông qua một Access Token, và hôm nay chúng ta tiếp tục tìm hiểu về Refresh Token. Tại sao lại có thêm Refresh Token? Và Refresh Token dùng để làm gì? 

Bài viết liên quan:

[Hướng dẫn xác thực tài khoản login bằng SMS, miễn phí sử dụng Firebase](https://anonystick.com/blog-developer/huong-dan-xac-thuc-tai-khoan-login-bang-sms-mien-phi-su-dung-firebase-2019052757983530.jsx)

[Firebase: Phần 1 - Vấn đề xác thực Firebase với custom token](https://anonystick.com/blog-developer/firebase-phan-1-van-de-xac-thuc-firebase-voi-custom-token-2019060582746819.jsx)

### Yêu cầu người đọc: 
1 - Hiểu mô hình xác thực giữa Client - Server. 

2 - Hiểu The OAuth 2.0 Authorization Framework. 

3 - Hiểu vì sao cần sử dụng OAuth 2.0 Authorization. 

Trong bài viết này, có lẽ sẽ khó khăn đối với các bạn mới lập trình. Có lẽ nó chỉ dành cho những bạn đi sâu vào back-end nhiều hơn bởi vì sao tôi lại nói như vậy? Bởi vì trong bài viết này có nhiều cụm từ mà chỉ phía back-end mới hiểu sâu hơn. Nhưng các bạn mới đừng ngại ngùng mà bỏ qua, không mất mát gì đúng không. Ok chiến thôi. 

Ngoài ra các bạn có thể đọc thêm bào viết trước "xác thực REST API với JWT(JSON Web Token)" 

Sau khi làm và đọc thêm tài liệu thì tôi sẽ chia sẻ cho các bạn các thông tin cũng như là quy trình việc xác thực 

### Roles.
OAuth định nghĩa 4 roles như sau: 

Ở đây có một bài viết nói khá tốt về định nghĩa này, tôi xin trích dẫn 
> 
> Resource Owner: là chủ sở hữu của dữ liệu ta muốn chia sẻ. Chẳng hạn, bạn muốn chia sẻ thông tin email + username facebook của bạn cho Viblo để có thể đăng nhập Viblo qua facebook, thì ở đây, thông tin email + username này là tài nguyên cần chia sẻ (resource), còn bạn chính là resource owner. 
> 
> Resource Server: là server nơi chứa thông tin dữ liệu cần chia sẻ. Server này phải có khả năng nhận và trả lời các yêu cầu (request) truy xuất dữ liệu. Như ở ví dụ trên của chúng ta thì resource server chính là facebook. 
> 
> Client: Là những chương trình, ứng dụng có như cầu muốn sử dụng tài nguyên được chia sẻ. Như trong ví dụ trên thì client chính là ứng dụng Viblo. 
> 
> Authorization Server: Là đối tượng quyết định việc cấp quyền truy cập vào dữ liệu cho client. Như trong ví dụ trên, đây chính là authorization server của facebook. Đôi khi resource server và authorization server có thể là một , nhưng về mặt chức năng mà nói, đây là 2 chức năng hoàn toàn riêng biệt.
> 
>  Nguồn: https://viblo.asia/p/tim-hieu-ve-oauth-20-part-i-ZabG91QYGzY6 

### Access Token là gì?
> Trích dẫn tiếp từ một bài viết khá rõ ràng về access token Access token là đoạn mã sinh ra ngẫu nhiên được sử dụng bí mật cho mỗi người dùng, ứng dụng khi thực hiện các thao tác quan trọng hay truy cập vào tài khoản của người dùng. Trong trường hợp này, bạn có thể hiểu access token như một đường hầm bí mật để đi vào ngôi nhà của bạn. Các hình thức xác thực như username, password giống như khóa và chìa khóa cửa nhà của bạn. Access token sẽ không đi qua cánh cửa này. Khi ai đó kết nối với một ứng dụng bằng hình thức đăng nhập facebook, ứng dụng đó có thể lấy access token cung cấp quyền truy cập tạm thời, an toàn vào API facebook. Access token là chuỗi không rõ xác định người dùng, ứng dụng hoặc trang và ứng dụng có thể dùng mã đó để thực hiện lệnh gọi API và có thể lấy access token bằng nhiều phương thức khác nhau. 
> 
> Nguồn: https://bigcoinvietnam.com/access-token-la-gi-cach-lay-token-don-gian

### Refresh Token là gì?
Access token (Chìa khoá có hạn sử dụng) là thông tin đăng nhập được sử dụng nhằm để truy cập những dữ liệu được bảo vệ. Mã token này là một chuỗi random được sinh ra được cấp cho phía client, nó đại diện cho thời gian cũng như phạm vi truy cập mỗi phiên làm việc của một client, và access token được cấp bởi resource server và authorization server. Resource server và authorization server là gì? Thì nhìn phía trên nha mới trích dẫn xong đó mấy ông devjs. Access token có thể có định dạng khau tuỳ theo mỗi bên nào cung cấp, chứ không nhất thiết giống nhau.

 Nhằm giúp các bạn hiểu thực tế hơn thì tôi lấy ví dụ về thằng thuê trọ (hay gọi là mấy ông devjs :v) và chủ nhà trọ. 

### Giả sử:
Chủ nhà trọ chính là Authorization Server 

Thằng thuê trọ chính là Client 

Nhà trọ chính là Resource Owner 

Khu nhà trọ chính là Resource Server

 Chìa khoá mở nhà trọ là Access token 

Thẻ đi ra vào khi nhà trọ là Refresh Token 

Ok như vậy chúng ta đã định nghĩa được các chủ thể liên quan đến bài viết này, giờ chúng ta sẽ đi vào mô hình đi thuê nhà trọ. Bắt đầu hay rồi đây. 

Xem hình bên dưới.

![](https://images.viblo.asia/ae0e130d-e410-40f6-b837-79f1519c083e.png)

 Đó là một mô hình khi đi thuê nhà trọ giờ ra đi xem xét từng bước cụ thể để có cái nhìn toàn diện. 

(A) Thằng thuê trọ đi tìm thông tin và may mắn tìm thấy một nới qúa ngon và đến nhà thằng chủ trọ xin được thuê trọ. 

(B) Thằng chủ trọ xem xét mọi giấy tờ rồi pháp lý nếu cảm thấy thằng thuê trọ ngon thì xác nhận cho thuê. Nếu không thco thuê thì step A lặp lại :D, ngược lại nếu cho thuê thì thằng chủ trọ (Authorization Server) phải đưa cho thằng thuê nhà (Client) hai thứ đó là Chìa khoá (Access Token) và thẻ (Refresh Token) ra vào khu nhà trọ. 

(C) Thằng thuê trọ (Client) cầm Chìa khoá (Access Token) và thẻ (Refresh Token) đó cất giấu đâu tuỳ nó miễn là đừng để mất or bị trộm. Bỏi vì nếu bị trộm chìa khoá thì xem như mất đồ rắng chịu. Lỗi không phải của chủ nhà trọ nữa rồi. Và nó dùng Chìa khoá (Access Token) để vào nhà và sử dụng. Còn thẻ (Refresh Token) nói sau? vì nó rất đặc biệt 

(D) Nó dùng chìa khoá (Access token) để mở nhà trọ nếu, nhà trọ nó xác thực được chìa khoá đó thì mở của xông vào. Nếu fail gặp thằng chủ nhà trọ hỏi chuyện? 

(E) Cứ như vậy đi học đi làm, (C) và (D) liên tục lặp lại cho đến khi chìa khoá bị hư (access token hết hạn). Nếu client làm được chìa khoá thì bỏ qua bước (G) nghĩa là nó có thể tự đi đánh chìa mới :D. 

(G) Client gửi một request lên Authorization Server để lấy một (access token) mới tuỳ theo những chính sách cụ thể. 

(H) Và cuối cùng của mô hình này là Authorization Server sẽ kiểm tra nếu hợp lệ thì sẽ cấp cho client một chìa khoá mới và có thể mà một (Refresh Token) mới. 

Đó là một mô hình hoàn chỉnh về việc xác thực việc thuê nhà trọ giữa các đối tượng cũng như các step trên. Nói tóm lại mô hình trên là như thế này. 

Client đi thuê nhà trọ thì phải tìm thông tin chính xác rồi gặp chủ nhà trọ để thuê trọ. CLient gửi CMND hay giấy tờ gì đó cho chủ nhà (gọi là pass, userID) nếu chủ nhà thấy tin tưởng và ok thì Chủ nhà trọ sẽ cấp cho client hai thứ đó là chia khoá và thẻ ra vào khu nhà trọ tương đương là Access Token và Refresh Token. Vì sao lại cả hai thì chút nữa giải thích tiếp.

Chìa khoá thì mở của nhà trọ đi vào và sử dụng tài sản cũng giống như dùng access token để lầy tài nguyên tại Resource Server. Và chú ý vì là chìa khoá nên có thể hư bất cứ lúc nào (đó là hết hạn của một access token). Còn Thẻ (Refresh token) có nhiệm vụ sẽ lấy lại chìa khoá mới từ chủ nhà khi hư or mất. Khi đửa thẻ cho chủ nhà thì phải xác nhận lại CMND đại loại như thế. Đó chính là sự khác biệt. 

Vậy ở đây làm rõ những câu hỏi sau: 

# Tại sao phải là hai token mà không phải là một token?
Chỉ cần Access Token được giới hạn dài hơn là được? Cũng có những ý kiến như vậy nhưng ở đây việc Access Token ngắn hạn là điều nên làm như firebase chẳng hạn, google chỉ cho 1 giờ thôi là hết hạn. Cũng giống như các tài khoản ngân hàng, phiên làm việc rất ngắn hạn đảm bảo cho việc không bị tấn công qua token, token của client rất dễ bị lộ đa số storage như cookies... Cho nên cũng dễ hiểu vì sao access token ngắn hạn.

# Xác thực Access Token và Refresh Token khác biệt gì?
Đây là vấn đề cốt lõi của việc xác thực. Bạn xem hình ảnh trên có thể thấy việc xác thực một accest token chỉ làm việc tại Resource Server. Nhưng khi xác thực một Refresh Token thì nó lại làm việc trên Authorization Server. Vì Authorization Server không những bắt buộc có một Refresh Token mà còn gửi cả password và username lên nữa mới có thể sinh ra một token mới. Đó là một sự khác biệt lớn. 

# Vậy có thể nói Refresh Token tồn tại mãi mãi không?
Cũng có thể việc đó xảy ra nếu như nó không được đưa vào blacklist của system. Bởi vì những có chế xác thực luôn có những phương án thu hồi lại những token bị ngi nghờ trong quá trình sử dụng đó là blacklist. 

Còn gì nữa không nhỉ? Nếu các bạn có câu hỏi nào xin đặt vấn đề chúng ta sẽ cùng thảo luận, vì đè tài này khá hay. 

Bài viết chỉ mang tính cá nhân cho nên nếu có góp ý xin comment or có thể gửi vào mail đề tiện thảo luận. 
Blogs: [https://anonystick.com](https://anonystick.com)
Happy codding!