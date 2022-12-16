# Mở đầu
Khi bạn vào một trang web muốn sử dụng các dịch vụ của một trang web khác — chẳng hạn như đăng nhập vào bằng tài khoản Facebook — thay vì yêu cầu bạn chia sẻ tài khoản Facebook của mình của mình, thì họ sẽ sử dụng một giao thức gọi là OAuth.
Bài viết này sẽ đề cập đến cách một chương trình, trang web hoặc ứng dụng có thể xác thực bạn là user - họ có quyền phù hợp không? Bạn đã cấp cho họ một số cách xác minh bạn là ai - và thay mặt bạn truy cập dữ liệu chưa? OAuth giúp hợp lý hóa quy trình này: nhưng ngay cả khi tự động hóa, hãy luôn lưu ý về cách một người hoặc công ty sử dụng (hoặc lưu trữ) dữ liệu của bạn.

# OAuth là gì ?
OAuth là một open-standard authorization protocol (tiêu chuẩn mở để ủy quyền truy cập) hoặc một framework cung cấp cho các ứng dụng khả năng “truy cập được chỉ định an toàn”. Ví dụ: bạn có thể cho Facebook biết rằng viblo.asia có thể truy cập hồ sơ của bạn hoặc đăng cập nhật lên dòng thời gian của bạn mà không cần phải cung cấp mật khẩu Facebook cho Viblo. Điều này giảm thiểu rủi ro theo một cách chính: Trong trường hợp Viblo bị vi phạm, mật khẩu Facebook của bạn vẫn an toàn.

OAuth không chia sẻ dữ liệu mật khẩu mà thay vào đó sử dụng mã thông báo ủy quyền để chứng minh danh tính giữa user và nhà cung cấp dịch vụ. OAuth là một giao thức xác thực cho phép bạn thay mặt bạn phê duyệt một ứng dụng tương tác với ứng dụng khác mà không cần cung cấp mật khẩu của bạn.

# Ví dụ đơn giản ta hay sử dụng OAuth
Ví dụ đơn giản nhất về hoạt động của OAuth là một trang web nói "Bạn có muốn đăng nhập vào trang web của chúng tôi bằng thông tin đăng nhập của trang web khác không?. Ứng dụng Facebook là một ví dụ điển hình về trường hợp sử dụng OAuth. Giả sử bạn đang sử dụng một ứng dụng trên Facebook và ứng dụng này yêu cầu bạn chia sẻ hồ sơ và hình ảnh của mình. Trong trường hợp này, Facebook là nhà cung cấp dịch vụ: nó có dữ liệu đăng nhập và hình ảnh của bạn. Ứng dụng là consumer và với tư cách là user, bạn muốn sử dụng ứng dụng để làm điều gì đó với hình ảnh của mình. Bạn đã đặc biệt cấp cho ứng dụng này quyền truy cập vào ảnh của mình mà OAuth đang quản lý ở chế độ nền.

# OAuth hoạt động như thế nào ?
*   Giải thích đơn giản 
OAuth là về ủy quyền chứ không phải xác thực. Ủy quyền là yêu cầu sự cho phép để làm công việc. Xác thực là để chứng minh bạn là người chính xác bởi vì bạn biết mọi thứ. OAuth không chuyển dữ liệu xác thực giữa consumer và nhà cung cấp dịch vụ - mà thay vào đó hoạt động như một loại mã thông báo ủy quyền.
* Giải thích về OAuth
Mã thông báo OAuth giống như một cái key chỉ có thể mở được một phần. Với tư cách là user, bạn phải cho consumer biết những gì họ có thể sử dụng và những gì họ không thể sử dụng từ mỗi nhà cung cấp dịch vụ. Bạn có thể cung cấp cho mỗi consumer một key chỉ có thể mở được một phần khác nhau. Họ không bao giờ có key đầy đủ hoặc bất kỳ dữ liệu cá nhân nào cho phép họ truy cập vào key đầy đủ.

Có 3 roles trong giao dịch OAuth: user, consumer và service provider. Bộ ba này đã được trìu mến gọi là yam giác tình yêu OAuth.

Trong ví dụ dưới đây, Tôi là user, AppA là consumer và Facebook là dịch vụ được cung cấp để kiểm soát tài nguyên  Tôi muốn AppA có thể đăng bài lên facebook của anh ấy thông qua AppA. Đây là cách nó hoạt động:

Bước 1 - user thể hiện ý định

* Tôi (user): “Này, AppA, tôi muốn bạn có thể đăng bài lên facebook của tôi.”
AppA (consumer): “Tuyệt vời! Để tôi đi xin phép ”.

Bước 2 - Consumer được phép

* AppA: “Tôi có một người dùng muốn tôi đăng lbài lên facebook của anh ấy. Tôi có thể có mã thông báo yêu cầu không? ”
* Facebook (service provider): “Chắc chắn rồi. Đây là một token và một secret.”
   The secret được sử dụng để ngăn chặn việc giả mạo yêu cầu. Consumer sử dụng bí mật để ký vào mỗi yêu cầu để service provider có thể xác minh rằng nó thực sự đến từ ứng dụng của consumer.

Bước 3 - User được chuyển hướng đến service provider

* AppA: “Tôi đang gửi cho bạn Facebook để bạn có thể phê duyệt. Hãy mang theo token này với bạn ”.
  <AppA hướng Tôi đến Facebook để được ủy quyền>

Đây là phần đáng sợ. Nếu AppA có ý đồ mờ ám,  nó có thể bật ra một cửa sổ trông giống như Facebook để yêu cầu bạn nhập tài khoản và mật khẩu của facebook. Luôn đảm bảo xác minh rằng URL mà bạn được chuyển hướng đến thực sự là service provider (trong trường hợp này là Facebook).

Bước 4 - User cấp quyền

* Tôi: “Facebook, tôi muốn ủy quyền request token này mà Bitly đã cung cấp cho tôi.”
* Facebook: “OK, chỉ để chắc chắn, bạn muốn cho phép Bitly thực hiện X, Y và Z bằng tài khoản Facebook của mình?”
* Tôi: "Vâng!"
* Facebook: “OK, bạn có thể quay lại AppA và nói với họ rằng họ có quyền sử dụng request token của họ.”
* Facebook đánh dấu request token là "tốt để đi", vì vậy khi consumer yêu cầu quyền truy cập, nó sẽ được chấp nhận (miễn là nó được ký bằng secret được chia sẻ của họ).

Bước 5 - Người tiêu dùng có được access token

* AppA: “Facebook, tôi có thể đổi request token này để lấy access token không?”
* Facebook: “Chắc chắn rồi. Đây là access token và secret ”

Bước 6 - Consumer truy cập tài nguyên được bảo vệ

* AppA: “Tôi muốn đăng bài post này lên tường của user. Đây là access token của tôi! ”
* Facebook: "Đã xong!"
  Trong kịch bản của chúng tôi, Tôi không bao giờ phải chia sẻ thông tin đăng nhập Facebook của mình với AppA. Tôi chỉ cần ủy quyền quyền truy cập bằng OAuth một cách an toàn. Bất kỳ lúc nào tôi cũng có thể đăng nhập vào Facebook và xem lại quyền truy cập mà tôi đã cấp và thu hồi token cho các ứng dụng cụ thể mà không ảnh hưởng đến người khác. 

# Kết luận
Hy vọng rằng đây là phần cơ bản tốt để giúp bạn làm quen với OAuth, để lần tới khi bạn thấy thông báo “Đăng nhập bằng Facebook” hoặc xác minh danh tính được ủy quyền tương tự, bạn sẽ biết rõ về những gì đang diễn ra.

# Tài liệu tham khảo ?
Nếu bạn muốn tìm hiểu sâu hơn về cơ chế của OAuth, đây là một số liên kết hữu ích:

 * http://marktrapp.com/blog/2009/09/17/oauth-dummies
 * https://dev.twitter.com/docs/auth/oauth/faq
 * http://stackoverflow.com/questions/4113934/how-is-oauth-2-different-from-oauth-1
 * http://googlecodesamples.com/oauth_playground/