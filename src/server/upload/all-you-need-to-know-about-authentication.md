### I. Tổng Quan

**Đăng nhập và Đăng xuất** là tính năng gần như bắt buộc của các ứng dụng web. Các nhà phát triển sẽ cho rằng ứng dụng chưa hoàn thiện nếu người dùng chưa thể **đăng nhập và đăng xuất**, vì nó làm cho ứng dụng an toàn và mạnh mẽ hơn. Do đó, hiểu cơ chế xác thực là rất quan trọng đối với tất cả các nhà phát triển để tạo ra một ứng dụng an toàn và đáng tin cậy. **Xác thực** được thực hiện rất nhiều trong gần như tất cả các ứng dụng ngày nay.
Dựa trên loại ứng dụng và cách triển khai của các nhà phát triển, việc duy trì phiên có thể tạo ra một ứng dụng an toàn hoặc tăng tính dễ bị tấn công của ứng dụng. Là một nhà phát triển, gần đây đã có rất nhiều cuộc thảo luận về nơi lưu trữ authentication token của người dùng. 

- Xác thực dựa trên **Cookie** hoặc **Authentication token** có tạo ra một ứng dụng an toàn hơn không?
- Sử dụng Cookies có an toàn hơn không, làm thế nào về lưu trữ cục bộ?
- Cơ chế và phương thức xác thực được ưu tiên lựa chọn cho một phiên được duy trì trong một ứng dụng là gì?

Trước khi chúng ta đi sâu vào cơ chế xác thực nào được ưu tiên cho một ứng dụng và thảo luận về nơi chúng ta nên lưu trữ **authentication token**, chúng ta cần hiểu các loại xác thực khác nhau và cách thức hoạt động của nó.
**Có hai loại xác thực**
- xác thực **dựa trên cookie** và xác thực **dựa trên token**. Tôi sẽ nhanh chóng giải thích làm thế nào hai phương thức xác thực này hoạt động. Sau đó, tôi sẽ đi sâu vào những **ưu và nhược điểm** của việc triển khai một trong những kiểu xác thực này, để bạn sẽ biết cách bạn có thể lưu trữ thông tin đăng nhập cho ứng dụng của mình.

### II. Xác thực dựa trên cookie

Xác thực dựa trên **cookie** là trạng thái, có nghĩa là máy khách và máy chủ sẽ cần giữ thông tin đăng nhập để quản lý phiên giữa các trang cho người dùng.
Cookie là một cặp giá trị tên của mã nhận dạng duy nhất của người dùng và mã thông báo được tạo có **thời hạn sử dụng**. Cookie thường được lưu trữ trên **cả máy khách và máy chủ**. Máy chủ sẽ lưu trữ cookie trong cơ sở dữ liệu, để theo dõi từng phiên người dùng và khách hàng sẽ giữ định danh phiên.
![](https://images.viblo.asia/3ff8ef91-0222-4cb6-97b0-7f776da75bc3.png)

### Hoạt động

**Đăng nhập** người dùng bằng cách **nhập thông tin đăng nhập**
Máy chủ xác minh rằng thông tin đăng nhập của người dùng là chính xác và tạo **cookie** với **thông tin phiên** được lưu trữ trong cơ sở dữ liệu
Cookie, với ID phiên và thông tin khác, cũng được lưu trữ trong trình duyệt
Khi người dùng điều hướng qua các trang khác nhau trên trình duyệt, cookie sẽ được xác minh dựa trên cơ sở dữ liệu để xác thực nếu thông tin đăng nhập của người dùng hợp lệ.
Khi người dùng đăng xuất, phiên cũng bị xóa khỏi cơ sở dữ liệu

### III. Xác thực dựa trên token

Khi chúng ta nói về xác thực dựa trên **token**, chúng ta thường đề cập đến **JWT (Mã thông báo web JSON)**, vì nó đã được sử dụng rộng rãi trong tất cả các ngành và đã trở thành một tiêu chuẩn thực tế để xác thực. **JWT** là một tiêu chuẩn mở xác định một cách **nhanh chóng, an toàn và khép kín** để truyền dữ liệu giữa các bên trong JSON.** JWT** là một loại xác thực không trạng thái. Điều đó có nghĩa là máy chủ không lưu trữ bất kỳ thông tin phiên nào trong cơ sở dữ liệu. **Không cần phải ghi lại** người dùng nào đã đăng nhập hoặc mã thông báo nào được phát hành cho người dùng nào. Thay vào đó, máy khách sẽ gửi các yêu cầu tiếp theo đến máy chủ với tiêu đề ở định dạng **bearer-{JWT-token}**, máy khách sẽ gửi nó trong phần thân của POST hoặc dưới dạng tham số URL.

![](https://images.viblo.asia/35b56f89-160d-4299-973e-c54c5c67517d.png)

### Hoạt động

Người dùng đăng nhập với thông tin đăng nhập của họ
Máy chủ xác minh thông tin đăng nhập của người dùng **tạo mã token và gửi lại mã token** cho khách hàng.
Mã **token** được lưu trữ trong bộ nhớ cục bộ hoặc bộ lưu trữ phiên ở phía máy khách.
Các yêu cầu tiếp theo đến máy chủ sẽ bao gồm **mã token** này, thường được nhúng trong tiêu đề ở định dạng **bearer- {JWT-token}**
Khi người dùng **đăng xuất**, mã token bị hủy ở phía máy khách; không cần tương tác với máy chủ vì máy chủ không lưu trạng thái.
Mã token Web JSON **chứa 3 phần**:
- **Header**
- **Payload (holds the user ID) + ngày hết hạn**
- **Signature**

Xác thực dựa trên token đã đạt được rất nhiều sự phổ biến do được sử dụng rộng rãi trong các ứng dụng web hiện đại, Ứng dụng trang đơn (SPA), API. Tuy nhiên, nó có thể **xảy ra các lỗ hổng mới** cho ứng dụng nếu các nhà phát triển thực hiện không đúng cách xác thực.

### IV. Xác thực dựa trên cookie và token
Hiểu cách các cơ chế xác thực này hoạt động giúp bạn phát triển xác thực người dùng đúng cách. Bạn có nhiều lựa chọn hơn để lựa chọn dựa trên loại ứng dụng bạn đang phát triển. Biết được những **ưu điểm** và **nhược điểm** của cả hai cơ chế xác thực có thể giúp bạn lựa chọn khôn ngoan giữa hai cơ chế và bảo mật ứng dụng của bạn khỏi các cuộc **tấn công phá hoại**.

- **Ưu điểm** của việc sử dụng Xác thực dựa trên **Cookie**

- Việc triển khai hoặc lưu trữ mã thông báo của bạn trong cookie làm cho ứng dụng trở nên rõ ràng. Sử dụng xác thực dựa trên **cookie** sẽ bảo mật cookie khỏi các cuộc tấn công **JavaScript** (tức là tấn công XSS). Tấn công **XSS** là một cuộc tấn công trong đó một thực thể tiêm một đoạn mã độc vào trang **web của nạn nhân**. Cuộc tấn công thực sự xảy ra khi nạn nhân cố gắng truy cập các trang web thực thi mã độc. Nó thường được ẩn dưới dạng **link** hoặc **hình ảnh** hoặc **nhúng iframe**. Hơn nữa, phiên có thể được tạo bằng cờ bảo mật ngăn chặn việc truyền mã thông báo qua các kênh không được mã hóa. Do đó, **luôn truyền dữ liệu qua HTTPS** để kẻ tấn công không thể nghe lén giữa kênh liên lạc của trình duyệt và máy chủ nên không thể đánh cắp cookie để mạo danh người dùng.
- Ít công việc hơn cho **client**, nhiều công việc hơn cho **máy chủ**
- Bằng cách tạo cookie trong máy chủ và chèn '**set-cookie**' vào tiêu đề phản hồi, trình duyệt sẽ tự động gửi thông tin xác thực trên mỗi yêu cầu tiếp theo đến máy chủ. Do đó, khách hàng không cần phải quản lý thủ công trạng thái cookie giữa các trang.

- **Nhược điểm** của việc sử dụng xác thực dựa trên **Cookie**

Tấn công **CSRF hoặc XSRF**

Tấn công CSRF là khi thực thể chạy tập lệnh **JavaScript**, nhắm mục tiêu trang web mà không có kiến thức về trình duyệt được sử dụng. Đây là một cuộc tấn công tập trung vào mục tiêu mà kẻ xâm nhập muốn biết người dùng muốn thực hiện những gì. **Tấn công CSRF** không dễ hiểu vì bạn sẽ cần biết kẻ tấn công nguồn đến từ đâu. Để bảo vệ chống lại CSRF, bạn có thể triển khai mã thông báo đồng bộ hóa. Với mã thông báo đồng bộ hóa, bạn sẽ cần triển khai logic JavaScript khác cho mã thông báo được đồng bộ hóa trong giao diện người dùng. Do đó, nó có thể thêm một lớp phức tạp trong hệ thống của bạn.

- **Hiệu suất và khả năng mở rộng**

- Lưu trữ cơ sở dữ liệu là cần thiết để lưu trữ cookie liên kết với người dùng. Nó thêm một sự phức tạp khác vào quản lý nhà nước và khó duy trì hơn. Mỗi lần người dùng gửi các yêu cầu tiếp theo trên mỗi trang đến máy chủ, bạn sẽ cần đọc từ cơ sở dữ liệu để xác thực nếu người dùng được ủy quyền. Mỗi lần người dùng khác đăng nhập, thông tin đăng nhập của họ cần được lưu trữ trong cơ sở dữ liệu, mọi yêu cầu tiếp theo đều yêu cầu xác thực và tra cứu từ cơ sở dữ liệu và cookie cần phải được xóa khỏi cơ sở dữ liệu khi người dùng đăng nhập ngoài.

- Hơn nữa, các ứng dụng hiện đại không chỉ được xây dựng trên web mà còn có nguồn gốc. Việc **triển khai cookie cho các ứng dụng di động khó khăn** và không đáng tin cậy hơn nhiều vì nó cần phải hoạt động trong nhiều môi trường khác nhau. Cookies trên web đã được tạo bên trong html, hoặc http, tạo ra một môi trường thống nhất cho tất cả các trình duyệt. Vì hầu hết người dùng sẽ liên tục sử dụng cùng một trình duyệt và máy tính, cookie phiên có thể theo dõi hoạt động của người dùng. Ngoài ra, đối với thiết bị di động, không chỉ các ứng dụng sẽ chạy trên các hệ điều hành khác nhau, mà mỗi ứng dụng gốc cũng có quy tắc riêng. Việc triển khai cookie cho các ứng dụng gốc trở nên rất khó khăn.

- **Ưu điểm** của việc sử dụng xác thực dựa trên **token**

Lợi ích chính của việc không trạng thái là **ít phức tạp** và **logic** trong ứng dụng. Do đó, việc quản lý, chia tỷ lệ, tách rời sẽ dễ dàng hơn và ít xảy ra lỗi hơn. Mỗi mã thông báo độc lập và không yêu cầu logic phụ trợ để xác minh từng yêu cầu. Các dịch vụ của bên thứ ba, như **OAuth**, có thể xử lý việc tạo ra token, để lại cho phụ trợ một chức năng duy nhất là kiểm tra tính hợp lệ của **token**.

- **Hiệu suất**
Thay vì phát hành một cơ sở dữ liệu khác cho phần phụ trợ để đọc, viết và xóa mã thông báo, mã thông báo JWT **có thể giải mã token** để xác thực tính xác thực và quyền hạn của người dùng.
Chẳng hạn, nếu bạn có **API** người dùng để tạo người dùng trong ứng dụng, chỉ những người dùng có quyền Quản trị viên mới có thể thực hiện thao tác. Trong thiết kế mã thông báo dựa trên cookie truyền thống, bạn sẽ cần thực hiện tra cứu cơ sở dữ liệu, sau đó xác thực nếu phiên hết hạn. Sau đó, bạn sẽ phải thực hiện một tra cứu khác để kiểm tra xem người dùng có quyền hay không. Cuối cùng, gửi yêu cầu Đăng để tạo người dùng. Mặt khác với **JWT**, bạn có thể **lưu trữ quyền của người dùng** trong **WT** trên trình duyệt, giải mã token  JWT để xác thực quyền của người dùng và gửi yêu cầu Đăng để tạo người dùng, từ **tất cả trình duyệt**.

**CSRF an toàn**
Không giống như xác thực dựa trên cookie, xác thực dựa trên token không thể bị tấn công **CSRF**, vì trang web của kẻ tấn công trước tiên sẽ cần phải đánh cắp **token** khi có thể thực hiện cuộc gọi **AJAX** đến trang web hợp pháp.

- **Nhược điểm** của việc sử dụng xác thực dựa trên **token**

**Tấn công XSS**

Các ứng dụng triển khai xác thực dựa trên **token** sẽ cần phải biết về Tấn công tập lệnh chéo trang. Tấn công kịch bản chéo trang xảy ra khi kẻ xâm nhập có thể thực thi mã đọc JavaScript từ bên trong ứng dụng của bạn. Cuộc tấn công này thường xảy ra khi đầu vào của biểu mẫu không được vệ sinh và dữ liệu được xác nhận hợp lệ trước khi gửi biểu mẫu. Do đó, mã thông báo **JWT** dễ bị ảnh hưởng.
Tuy nhiên, khung web hiện đại có các chức năng ngăn chặn mã tùy ý trong khi gửi biểu mẫu. Các cách khác để **ngăn chặn** cuộc tấn công XSS trong khi sử dụng xác thực dựa trên token là đặt giới hạn thời gian hết hạn của mã thông báo thành một giờ để ngay cả khi toke bị đánh cắp, nó sẽ nhanh chóng trở nên không sử dụng được.

### V. Cân nhắc thiết kế - Nơi lưu trữ token?

Một cách phổ biến để lưu trữ **token JWT** là trong bộ nhớ cục bộ và nó hoạt động tốt trong hầu hết các trường hợp và nó được khuyên dùng.
Tuy nhiên, có một số vấn đề với việc lưu trữ **token JWT** trong bộ nhớ cục bộ mà bạn cần phải biết, chẳng hạn như các cuộc tấn công Cross-Site Scripting. Một nơi khác để lưu trữ token là trong cookie. Tuy nhiên, vì mã thông báo JWT có thể lớn, bạn cần lưu ý đến kích thước tối đa của việc lưu trữ nó trong **cookie**. Cuối cùng, lưu trữ token trong **session** hoạt động giống như lưu trữ cục bộ. Tuy nhiên, **token** sẽ bị xóa sau khi người dùng đóng trình duyệt.

**Kích thước của JWT**
Kích thước của **JWT** có thể tương đối lớn so với **cookie** vì hầu hết các cookie đều nhỏ hơn kích thước trung bình của JWT. JWT có kích thước tối đa 8KB, lớn hơn nhiều so với cookie là 4KB. Tùy thuộc vào cách truyền dữ liệu, kích thước mã thông báo JWT có thể gặp vấn đề nếu bạn thêm nhiều khiếu nại vào đó.

**Ta nên sử dụng cái nào?**

**Cookie**
Nếu bạn có toàn quyền kiểm soát phía máy chủ và đó là một ứng dụng trình duyệt, việc máy chủ kiểm soát trạng thái của ứng dụng sẽ giảm bớt phía máy khách và tạo ra một ứng dụng mạnh mẽ hơn. Xác thực dựa trên **cookie** rất tốt cho trình duyệt và nó đã được nghiên cứu rộng rãi, điều này tạo ra một tùy chọn an toàn hơn nhiều. Nó có thể hạn chế hoặc giới hạn phiên trong một hoạt động nhất định hoặc thời gian nhất định và nó có thể làm mất hiệu lực người dùng nếu có bất kỳ mối quan tâm bảo mật nào.

**Token**
Nếu bạn muốn **linh hoạt** trong việc xử lý các miền và môi trường khác nhau, khuyến khích sử dụng **token**. Bạn không cần phải xử lý hai chương trình xác thực khác nhau để hỗ trợ lưu lượng truy cập trình duyệt.

**Không có cách nào là tốt nhất** cho một phương thức để xác thực, nhưng có một cách ưa thích tùy thuộc vào trường hợp sử dụng ứng dụng của bạn. Mọi cơ chế xác thực đều có **ưu điểm và nhược điểm** của nó. Tùy thuộc vào kịch bản, sử dụng kết hợp cả hai có thể dẫn đến một hệ thống an toàn hơn là sử dụng một mình. 
Tuy nhiên, để tạo một ứng dụng an toàn hơn, bạn sẽ cần hiểu cách thức cả hai xác thực hoạt động để bạn có thể thực hiện xác thực của mình đúng cách.
**Cảm ơn vì đã đọc!**

### VI. Tài liệu tham khảo

- https://medium.com/swlh/all-you-need-to-know-about-authentication-is-here-25c8d8135cd6
- https://security.stackexchange.com/questions/80727/best-place-to-store-authentication-tokens-client-side
- https://dzone.com/articles/cookies-vs-tokens-the-definitive-guide
- https://www.allaboutcookies.org/mobile/