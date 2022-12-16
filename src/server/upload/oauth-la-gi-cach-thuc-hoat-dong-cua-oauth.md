![](https://images.viblo.asia/ac009d4b-4479-4c00-9b69-d80f5167edef.jpg)

OAuth cho phép các trang web và dịch vụ chia sẻ tài nguyên giữa những người dùng. Nó được sử dụng rộng rãi, nhưng hãy lưu ý về các lỗ hổng của nó.

Kể từ khi bắt đầu có các mạng máy tín phân tán, một trong những bảo mật khó bẻ khóa nhất là truy cập liên tục, đăng nhập một lần (SSO) giữa nhiều máy tính, mỗi máy tính đều yêu cầu các tài khoản đăng nhập không liên quan để truy cập dịch vụ của họ và tài nguyên. Mặc dù vẫn chưa được thực hiện đầy đủ trên toàn bộ internet, giờ đây có thể truy cập vô số các trang web hoàn toàn không liên quan bằng một lần đăng nhập duy nhất. Bạn có thể sử dụng mật khẩu, điện thoại, chứng chỉ kỹ thuật số, sinh trắc học, xác thực hai yếu tố (2FA) hoặc giải pháp SSO xác thực đa yếu tố (MFA) để đăng nhập vào một nơi và không phải nhập thông tin xác thực truy cập khác để truy cập. Vì thế OAuth đã được sinh ra để làm điều đó.

**Định nghĩa OAuth** 

OAuth là giao thức ủy quyền tiêu chuẩn mô tả cách các máy chủ và dịch vụ không liên quan có thể cho phép truy cập an toàn khi đã xác thực vào nội dung mà không chia sẻ thông tin đăng nhập ban đầu. Theo cách nói xác thực, điều này được gọi là ủy quyền an toàn, bên thứ ba, tác nhân người dùng được ủy quyền.

**Lịch sử OAuth**

Được tạo và hỗ trợ mạnh mẽ ngay từ đầu bởi Twitter, Google và các công ty khác, OAuth được phát hành dưới dạng tiêu chuẩn vào năm 2010 với tên gọi RFC 5849, và nhanh chóng được áp dụng rộng rãi. Trong hai năm tiếp theo, nó đã được sửa đổi đáng kể và phiên bản 2.0 của OAuth, được phát hành vào năm 2012 với tên gọi RFC 6749. Mặc dù phiên bản 2.0 đã bị chỉ trích rộng rãi vì nhiều lý do được đề cập bên dưới, nó thậm chí còn được phổ biến hơn. Ngày nay, bạn có thể thêm Amazon, Facebook, Instagram, LinkedIn, Microsoft, Netflix.

**Ví dụ về OAuth**

Ví dụ đơn giản nhất về OAuth là khi bạn đăng nhập vào một trang web và nó cung cấp một hoặc nhiều cách để đăng nhập bằng thông tin đăng nhập của trang web / dịch vụ khác. Sau đó, bạn nhấp vào nút được liên kết với trang web khác, trang web khác xác thực bạn và trang web bạn đã kết nối ban đầu để ghi lại nhật ký của bạn sau đó bằng cách sử dụng quyền có được từ trang web thứ hai. Một trường hợp OAuth ví dụ phổ biến khác có thể là người dùng gửi các tệp được lưu trữ trên đám mây cho người dùng khác qua email, khi hệ thống lưu trữ đám mây và email hỗ trợ OAuth (ví dụ: Google Gmail và Microsoft OneDrive). Khi người dùng cuối đính kèm tệp vào email của họ và duyệt để chọn tệp để đính kèm, OAuth có thể được sử dụng đằng sau để cho phép hệ thống email xác thực liền mạch và duyệt đến các tệp được bảo vệ mà không yêu cầu đăng nhập thứ hai vào bộ lưu trữ tệp hệ thống. Một ví dụ khác, một ví dụ được đưa ra trong OAuth 2.0 RFC, là người dùng cuối sử dụng dịch vụ in của bên thứ ba để in các tệp ảnh được lưu trữ trên một máy chủ web không liên quan. Trong mọi trường hợp, hai hoặc nhiều dịch vụ đang được người dùng cuối sử dụng cho một giao dịch và người dùng cuối sẽ đánh giá cao việc không được yêu cầu đăng nhập lần thứ 2. Để OAuth hoạt động, phần mềm ứng dụng khách của người dùng cuối (ví dụ: trình duyệt), các dịch vụ liên quan và nhà cung cấp xác thực phải hỗ trợ đúng phiên bản OAuth (1.0 so với 2.0).

**Giải thích về OAuth**

Khi cố gắng hiểu OAuth, có thể hữu ích khi nhớ rằng các tình huống OAuth hầu như luôn đại diện cho hai trang web hoặc dịch vụ không liên quan đang cố gắng hoàn thành điều gì đó thay mặt cho người dùng hoặc phần mềm của họ. Cả ba phải làm việc cùng nhau liên quan đến phê duyệt để giao dịch hoàn thành được ủy quyền.

Cũng hữu ích khi nhớ rằng OAuth nói riêng về ủy quyền chứ không phải trực tiếp về xác thực. Xác thực là quá trình người dùng / chủ thể chứng minh quyền sở hữu của mình đối với danh tính được trình bày, bằng cách cung cấp mật khẩu hoặc một số yếu tố được sở hữu hoặc trình bày duy nhất khác. Ủy quyền là quá trình cho phép một chủ thể truy cập tài nguyên sau khi xác thực thành công, thường là ở một nơi khác. 

Người triển khai ban đầu mô tả OAuth tương tự như chìa khóa người phục vụ của ô tô, có thể được sử dụng để cho phép người phục vụ tạm thời lái xe và đỗ ô tô, nhưng nó không cho phép người giữ quyền truy cập không giới hạn, đầy đủ như chìa khóa thông thường. Thay vào đó, xe chỉ có thể được điều khiển một vài dặm, không thể truy cập vào các thân cây hoặc hộp găng tay bị khóa, và có thể có nhiều hạn chế khác. Về cơ bản, OAuth cho phép người dùng, thông qua nhà cung cấp dịch vụ xác thực mà họ đã xác thực thành công trước đó, cung cấp cho một trang web / dịch vụ khác mã thông báo xác thực truy cập hạn chế để ủy quyền cho các tài nguyên bổ sung.

Ngoài ra, OAuth 2.0 là một khuôn khổ, không phải là một giao thức (như phiên bản 1.0). Nó sẽ giống như tất cả các nhà sản xuất xe hơi đồng ý về cách người phục vụ sẽ tự động yêu cầu, nhận và sử dụng chìa khóa người phục vụ, cũng như cách nhìn chung của chìa khóa người phục vụ. Những gì người phục vụ có thể làm được so với các chức năng đầy đủ sẽ tùy thuộc vào từng nhà sản xuất xe hơi. Giống như trong cuộc sống thực, người phục vụ và chủ xe không cần quan tâm đến cách hoạt động của tất cả. Họ chỉ muốn tất cả hoạt động trơn tru nhất có thể khi họ giao chìa khóa.

**Cách hoạt động của OAuth**

Giả sử người dùng đã đăng nhập vào một trang web hoặc dịch vụ (OAuth chỉ hoạt động khi sử dụng HTTPS). Sau đó, người dùng bắt đầu một tính năng / giao dịch cần truy cập vào một trang web hoặc dịch vụ không liên quan khác. Điều sau sẽ xảy ra (được đơn giản hóa rất nhiều):

1. Trang web đầu tiên thay mặt người dùng kết nối với trang web thứ hai, sử dụng OAuth, cung cấp danh tính đã xác minh của người dùng.
2. Trang web thứ hai tạo mã thông báo một lần và bí mật một lần duy nhất cho giao dịch và các bên liên quan.
3. Trang web đầu tiên cung cấp mã thông báo và bí mật này cho phần mềm ứng dụng khách của người dùng khởi tạo.
4. Phần mềm của khách hàng gửi mã thông báo yêu cầu và bí mật cho nhà cung cấp ủy quyền của họ (có thể có hoặc không phải là trang thứ hai).
5. Nếu chưa được xác thực với nhà cung cấp ủy quyền, khách hàng có thể được yêu cầu xác thực. Sau khi xác thực, khách hàng được yêu cầu phê duyệt ủy quyền đến trang web thứ hai.
6. Người dùng phê duyệt (hoặc phần mềm của họ phê duyệt âm thầm) một loại giao dịch cụ thể tại trang web đầu tiên.
7. Người dùng được cấp một mã thông báo truy cập đã được phê duyệt (lưu ý rằng nó không còn là mã thông báo yêu cầu nữa).
8. Người dùng cung cấp mã thông báo truy cập đã được phê duyệt cho trang web đầu tiên.
9. Trang web đầu tiên cung cấp mã thông báo truy cập cho trang web thứ hai làm bằng chứng xác thực thay mặt cho người dùng.
10. Trang web thứ hai cho phép trang web đầu tiên truy cập trang web của họ thay mặt cho người dùng.
11. Người dùng thấy một giao dịch đã hoàn tất thành công đang xảy ra.
12. OAuth không phải là hệ thống xác thực / ủy quyền đầu tiên hoạt động theo cách này thay mặt cho người dùng cuối. Trên thực tế, nhiều hệ thống xác thực, đặc biệt là Kerberos, hoạt động tương tự. Điều đặc biệt về OAuth là khả năng hoạt động trên web và khả năng áp dụng rộng rãi của nó.

Mặc dù không đơn giản như nó có thể được, các lập trình viên web dường như dễ dàng hiểu. Việc tạo một trang web tương thích với OAuth có thể được thực hiện trong vài giờ đến một ngày (nhanh hơn nhiều nếu bạn đã làm trước đó). Đối với một chút nỗ lực nữa, quyền truy cập trang web được xác thực có thể được mở rộng cho hàng trăm triệu người dùng bổ sung theo đúng nghĩa đen. Không cần trang web phải chứa hệ thống xác thực của riêng nó với khả năng mở rộng quy mô theo tỷ lệ khổng lồ. Bạn có thể tìm thấy một ví dụ về một gói giao dịch HTTP riêng lẻ tại đây.