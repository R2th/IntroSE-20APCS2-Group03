Trong hầu hết các ứng dụng web và di động, tính năng xác thực Email được coi là một trong những phần quan trọng nhất của việc thử nghiệm, để đảm bảo chất lượng trong thành phần Email cũng như với các thành phần khác của hệ thống.

Các email được kích hoạt trong các tình huống khác nhau được coi là được xác thực bằng cách kiểm tra tất cả các thành phần của nó bao gồm một mẫu Email, Liên kết / nút trong Email, Từ, Đến, Cc, Bcc, Tệp đính kèm, Nội dung theo thông báo Email, v.v.

![](https://images.viblo.asia/ffd4fa3e-291a-492d-939a-ea25c2caa6a7.jpg)

## Tại Sao Chúng Ta Cần Kiểm Tra Email?

Mỗi thành phần trong hệ thống (ứng dụng Web / Di động) có thể có các mục đích khác nhau để gửi Email. Tích hợp giữa (các) thành phần và Email đóng vai trò quan trọng trong việc tiếp cận người dùng cuối với các thông báo phù hợp. Bất kỳ sơ suất nào khi chúng ta xác nhận tính năng này sẽ dẫn đến hiểu lầm cho khách hàng, hack, v.v.

Ví dụ , hãy tưởng tượng một tình huống mà người dùng đã nhận được email để đặt lại mật khẩu. Điều gì xảy ra nếu nút / liên kết Đặt lại mật khẩu hoặc URL được cung cấp để sao chép dán trong trình duyệt không hoạt động? Tùy chọn duy nhất còn lại ở đây là liên hệ với bộ phận hỗ trợ khách hàng,  tưởng tượng một tình huống mà người dùng liên tục nhận được Email hàng ngày về ngày đáo hạn để thanh toán hóa đơn từ 10-15 ngày trước hoặc nhận được lời nhắc sau ngày đáo hạn thông qua. Vô cùng khó chịu phải không ??

Có rất nhiều tình huống trong đó Email đã trở thành một phần không thể thiếu trong cuộc sống của chúng ta vì chúng có nghĩa là giữ cho người dùng cập nhật thông tin chính xác.

## Các tình huống Real-time và các điểm cần xác thực

Điểm xác nhận trong thử nghiệm Email thay đổi từ loại này sang loại khác và có thể từ ứng dụng này sang ứng dụng khác. Thông thường, tất cả các Email phải được xác thực theo mẫu (bao gồm logo ứng dụng, tên ứng dụng, Địa chỉ người dùng, Nội dung - Bản quyền, Chi tiết hỗ trợ khách hàng), ngày và mốc thời gian cho các múi giờ khác nhau.

Ở đây chúng ta sẽ thảo luận về một số loại Email phổ biến mà hầu hết mọi người đều biết (tất cả các điểm xác thực được cung cấp dưới đây là kiểm tra cơ bản mà người kiểm tra phải thực hiện trong khi kiểm tra Email của ứng dụng).

### 1. Email kích hoạt

Khi người dùng đăng ký ứng dụng lần đầu tiên, anh ấy / cô ấy cần kích hoạt tài khoản bằng cách nhấp vào liên kết kích hoạt được gửi trong Email. Điều này cũng xác minh địa chỉ Email đã cho của người dùng là hợp lệ và có thể truy cập.

Điểm xác nhận như sau:

* Liên kết kích hoạt hoặc nút - Nhấp vào nó sẽ:
  * Đưa người dùng đến trang của ứng dụng tương ứng với tài khoản người dùng đã đăng nhập
  * Tài khoản Email của người dùng sẽ được xác minh tự động nếu trang ứng dụng được truy cập thành công thông qua Email
* Thời lượng - Kiểm tra thời lượng mà liên kết phải được nhấp và xác minh.
  * Xác minh trong thời hạn quy định
  * Cố gắng xác minh sau khi hết thời gian - Tài khoản không được kích hoạt và Email sẽ không được xác minh

### 2. Quên email

Khi người dùng quên mật khẩu để đăng nhập vào ứng dụng, có thể thực hiện luồng quên mật khẩu  để nhận Email có liên kết để đặt lại mật khẩu (tính năng thay đổi tùy theo ứng dụng).

Điểm xác nhận như sau:

* Đặt lại liên kết mật khẩu:
  * Nhấp vào nó sẽ đưa người dùng đến trang của ứng dụng tương ứng để đặt lại mật khẩu
  * Một số ứng dụng sẽ yêu cầu người dùng trả lời câu hỏi bảo mật trước khi hiển thị màn đặt lại mật khẩu và một số ứng dụng sẽ có câu hỏi bảo mật được tích hợp với chính trang đặt lại mật khẩu và một số sẽ không có tính năng này.
  * Nếu người dùng đặt lại mật khẩu thành công, liên kết trong Email Quên mật khẩu đã nhận được sẽ bị vô hiệu hóa và không hoạt động
  * Nếu người dùng hủy luồng đặt lại mật khẩu, liên kết trong Email Quên mật khẩu đã nhận sẽ vẫn được kích hoạt
* Thời lượng - Kiểm tra thời lượng mà liên kết phải được nhấp để đặt lại mật khẩu
  * Nhấp vào liên kết và đặt lại mật khẩu thành công trong khoảng thời gian được chỉ định
  * Hãy thử nhấp vào liên kết sau khi thời lượng đã hết - Liên kết sẽ bị hủy kích hoạt và hết hạn

### 3. Thông báo ngày đáo hạn

Điều này là để nhắc nhở người dùng về hành động thực hiện trong một số ngày cụ thể. Thường là thanh toán hóa đơn, thực hiện hành động đối với các mặt hàng đang chờ xử lý (ví dụ: chấp nhận hoặc từ chối lời mời tham gia một số sự kiện trong một số ngày cụ thể, gửi biểu mẫu, v.v.).

Điểm xác nhận như sau:

* Số ngày đến hạn / Ngày đáo hạn
* * Nếu email thông báo về một số ngày đáo hạn thì số đó phải bằng 0 hoặc nhiều hơn, ngày bằng không có nghĩa là ngày hiện tại đến hạn. Nó không nên là số âm. Nếu email thông báo về Ngày đáo hạn (Ngày dương lịch) thì ngày đó sẽ là ngày hiện tại hoặc tương lai.
* Loại hành động
* * Kiểm tra loại hành động cần thiết là gì. Cần nêu rõ loại hành động mà người dùng phải thực hiện. Có thể là thanh toán hóa đơn, đệ trình, phản hồi, vv

### 4. Thông báo quá hạn

Điều này là để thông báo cho người dùng về ngày đáo hạn đã qua. Điều này thường là để thông báo cho người dùng rằng họ đã không hành động đối với các mặt hàng trong ngày đáo hạn.

* Số ngày quá hạn
  * Kiểm tra xem số ngày quá hạn phải là một hay nhiều. Không nên là số 0 hoặc số âm
* Tần suất
  * Rất ít ứng dụng sẽ có điều khoản để tùy chỉnh các email quá hạn được gửi hàng ngày / hàng tuần / hàng tháng, sau khi hết hạn cho đến khi người dùng hoàn thành hành động. Rất ít ứng dụng sẽ có thông báo được gửi mà thông thường họ  chỉ gửi một lần sau khi hết hạn.

### 5. Đăng ký 

Điều này thay đổi theo yêu cầu người dùng. Người dùng có thể chọn một trong số các đăng ký Hàng ngày, Hàng tuần, Hai tháng hoặc Hàng tháng sau đây. Điều này thường dành cho các bản tin, cập nhật, cung cấp, vv

* Tần suất
  * Email nên được gửi theo lựa chọn của người dùng cho một thuê bao. Nếu hàng ngày, thì email đăng ký nên được gửi một lần trong một ngày. Nếu hàng tuần, có nghĩ là một lần trong một tuần. 
* Liên kết
  * Mọi liên kết trong email sẽ điều hướng đến trang tương ứng của ứng dụng. Nếu email là để cập nhật, thì liên kết sẽ chuyển hướng đến trang nơi cập nhật được hiển thị. Nếu email là dành cho ưu đãi, thì liên kết sẽ chuyển hướng đến trang Ưu đãi của ứng dụng. Nó phụ thuộc vào loại người dùng đăng ký đã chọn.

### 6. Biểu mẫu

Email ở đây dự định người dùng cung cấp phản hồi thông qua biểu mẫu / liên kết đến biểu mẫu. Điểm xác nhận như sau:

* Liên kết
  * Liên kết trong email sẽ chuyển hướng người dùng đến trang gửi biểu mẫu của ứng dụng theo loại người dùng được yêu cầu để gửi
  * Sau khi gửi, nhấp vào liên kết một lần nữa sẽ thông báo cho người dùng rằng biểu mẫu đã được gửi. Nó không nên cho phép người dùng gửi lại biểu mẫu

### 7. Email xác nhận

Email ở đây là để thông báo cho người dùng về việc xác nhận hành động được thực hiện. Đây thường là xác nhận đặt phòng, xác nhận đơn hàng, xác nhận truy vấn, v.v.

Điểm xác nhận như sau:

* Chi tiết xác nhận:
  * Số thứ tự / số đặt phòng phải chính xác và khớp với số được hiển thị trong giao diện người dùng ứng dụng. Vì nó là định danh để theo dõi các đơn đặt hàng / đặt chỗ, nên nó là duy nhất (được xác thực trong backend - DB) trong toàn bộ ứng dụng. Không có đơn đặt hàng / đặt phòng nên chia sẻ cùng một định danh.
  * Cùng với đó, nó cũng cần được xác nhận cho loại đơn đặt hàng, thông tin người dùng, địa chỉ thanh toán, địa chỉ giao hàng và giá cả. Tất cả thông tin phải giống hệt với những gì người dùng đã cung cấp trong giao diện người dùng ứng dụng.
* Liên kết:
  * Một liên kết trong email sẽ đưa người dùng đến trang chi tiết của đơn hàng trong giao diện người dùng ứng dụng. Cần có sự trùng khớp chính xác giữa thông tin trong Email và giao diện người dùng ứng dụng

### 8. Cuộc hội thoại

Tại đây, một người dùng nhận được toàn bộ bản sao trò chuyện dưới dạng Email. Điều này thường xảy ra khi một cuộc Trò chuyện trực tiếp với hỗ trợ khách hàng kết thúc.

Điểm xác nhận như dưới đây

* Chi tiết
  * Kiểm tra tên của người cung cấp hỗ trợ trực tuyến. Kiểm tra xem toàn bộ cuộc trò chuyện có trong email với thông tin chi tiết của người gửi cho mỗi mục trò chuyện (Tên người, Ngày và thời gian tin nhắn trò chuyện được gửi, v.v.)


### 9. Email có tệp đính kèm

Người dùng nhận được Email với tệp đính kèm. Tệp đính kèm có thể được bảo vệ bằng mật khẩu / không được bảo vệ. Đây thường là các báo cáo từ các lĩnh vực tài chính, Thỏa thuận cấp phép người dùng cuối để tham khảo, Điều khoản & điều kiện để tham khảo, v.v., điều này một lần nữa thay đổi tùy theo từng ứng dụng.

Điểm xác nhận như sau:

* Loại tệp đính kèm
  * Các loại tệp hợp lệ nên được gửi dưới dạng tệp đính kèm. Tất cả các tệp đính kèm đang được mở phải được quét vi-rút trước khi tải xuống / mở. Điều này một lần nữa có thể được tùy chỉnh ở cấp ứng dụng ở phần backend, như quét virus chỉ được thực hiện khi tải xuống, chỉ khi mở, cho cả tải xuống và mở.
  * Mật khẩu được đính kèm nên tải xuống mà không cần hỏi mật khẩu. Nhưng trong khi mở nó từ Email hoặc mở bản sao đã tải xuống, bạn phải luôn hỏi mật khẩu. Các mục nhập mật khẩu không chính xác ở đây sẽ không xác định vì bản sao cục bộ không thể được theo dõi trực tuyến để khóa tệp đính kèm.

## Các loại email

Loại email có thể là HTML (đầy màu sắc và hấp dẫn người dùng, người dùng quan tâm để đọc Email đầy đủ) hoặc Văn bản thuần túy (chỉ là một văn bản).

HTML được ưa thích nhất và thường được đặt làm mặc định trong hầu hết các ứng dụng tại phần backend. Nếu được yêu cầu, các ứng dụng có thể chọn gửi email văn bản thuần cho người dùng, một lần nữa điều này yêu cầu thay đổi ở phần backend.

### Email  kích hoạt:

Email có thể được gửi ngay lập tức hoặc dưới dạng tóm tắt. Các email ngay lập tức được kích hoạt bởi hành động của người dùng. Chúng thường là email kích hoạt, đặt lại email mật khẩu, sao chép trò chuyện, email xác nhận, v.v., tức là email Tóm tắt / lô được kích hoạt dựa trên các cài đặt trong phần backend của ứng dụng.

Điểm kích hoạt email sẽ được xác định để kích hoạt tại thời điểm cụ thể ( ví dụ: ngày thứ 3 mỗi tuần vào lúc 12:00 sáng). Đây thường sẽ là các báo cáo từ các lĩnh vực tài chính (báo cáo ngân hàng), thông báo ngày đáo hạn cho các hóa đơn, thông báo quá hạn, đăng ký, v.v.

### Bouncebacks:

Đây là một trường hợp rất phổ biến khi email bị trả lại khi chúng được gửi đến địa chỉ email không hợp lệ. Thông thường, địa chỉ email bị vô hiệu hóa / không còn được sử dụng và hoàn toàn không tồn tại.

Máy chủ thường cố gắng trong một số lần xác định để gửi Email đến địa chỉ dự định. Khi nó không đến được địa chỉ email dự định, nó sẽ bị trả về và sẽ tạo một mục trong máy chủ cho sự thất bại của nó. Sẽ có một máy chủ khác để duy trì các loại hoạt động này và thường được gọi là máy chủ bị trả lại. 

Dưới đây là một vài điểm khác cho việc gửi mail thất bại:

* Máy chủ email ngừng hoạt động trong một thời gian dài
* Thuật toán tìm đường đi ngắn nhất để tiếp cận người dùng không hoạt động chính xác và mất rất nhiều thời gian để tiếp cận người dùng, đến lúc đó có lẽ nó đã vượt qua thời gian được chỉ định để tiếp cận người dùng. Điều này thường được gọi là tăng số bước nhảy
* Tên miền email của người dùng không hoạt động trong một thời gian dài
* Tài khoản người dùng cho ứng dụng không được kích hoạt để nhận email

## Phạm vi bản địa hóa để kiểm tra email

Khi ứng dụng hỗ trợ nhiều ngôn ngữ, thì hỗ trợ ngôn ngữ cũng sẽ mở rộng cho Email.

Tất cả các Email được gửi phải bằng ngôn ngữ hồ sơ người dùng. Nếu người dùng đã đặt tiếng Anh làm ngôn ngữ hồ sơ, thì tất cả các email được gửi cho anh ấy / cô ấy phải bằng tiếng Anh. Nếu ngôn ngữ hồ sơ của người dùng là tiếng Pháp, thì tất cả các email được gửi cho anh ấy / cô ấy phải bằng tiếng Pháp. Ngôn ngữ hồ sơ người dùng có thể là cài đặt một lần hoặc có thể được thay đổi khi cần thiết, tùy thuộc vào cài đặt của ứng dụng.

Email phải được gửi bằng ngôn ngữ mà người dùng có tại thời điểm nó được kích hoạt.

Các điểm xác nhận phổ biến để kiểm tra bản địa hóa các Email như sau:

* Dòng tiêu đề
* Nội dung email
* Nội dung - văn bản của body
* Tên liên kết / tên nút
* Thông tin bản quyền
* Chi tiết hỗ trợ khách hàng

##  Tiêu chuẩn / Tùy chỉnh email

* Email có thể được tùy chỉnh tại phần backend

Ví dụ: một số ứng dụng hỗ trợ người dùng tùy chỉnh Email khi chúng được gửi. Người dùng có thể thay đổi ở đây dòng Tiêu đề và / hoặc nội dung email để thuận tiện hoặc nhằm mục đích nhận biết dễ dàng. Trong trường hợp này, thử nghiệm kỹ lưỡng phải được thực hiện bởi nhóm thử nghiệm vì cơ hội xâm nhập là rất cao.

Việc kiểm tra phải được thực hiện để  - gửi mã HTML, mã Java, SQL, v.v ... Tất cả những điều này sẽ thất bại để tăng mức độ bảo mật. Nếu ứng dụng không hỗ trợ tùy chỉnh email, thì tất cả các email được gửi sẽ tuân theo chủ đề / nội dung tiêu chuẩn như đã được thiết lập .

## Phần kết luận

Kiểm tra email là một hoạt động quan trọng vì hầu hết các thành phần của ứng dụng được tích hợp với chức năng này.

Cần phải hỗ trợ và nỗ lực toàn bộ để kiểm tra hoàn toàn chức năng email của ứng dụng. Điều này cần được lên kế hoạch nhiều trước khi bắt đầu thử nghiệm thực tế và phải song hành trong khi thử nghiệm từng thành phần / thành phần liên quan.

Kiểm tra email phải có các trường hợp kiểm tra riêng được viết cho từng loại Email bao gồm tất cả các khía cạnh cần kiểm tra. Điều này nên được thực hiện trong tất cả các loại thử nghiệm Thử nghiệm hồi quy, thử nghiệm Adhoc, thử nghiệm UAT và thử nghiệm trên production.

Bất cứ điều gì sai trong Email trong thời gian thực, sẽ để lại ấn tượng xấu cho ứng dụng, khách hàng và cuối cùng, nó sẽ chuyển tiếp đến những người thử nghiệm ứng dụng đó. Vì vậy, Xác thực Email là hoạt động rất quan trọng và được yêu cầu nhiều trong kiểm thử Phần mềm.

Tham khảo: [https://www.softwaretestinghelp.com/email-validation-testing/?fbclid=IwAR2hZjGGFZYtgxbEwiUyG9397SIAEpTATXd0eBVxWmdafN4YzKpQzvhaRFI](https://www.softwaretestinghelp.com/email-validation-testing/?fbclid=IwAR2hZjGGFZYtgxbEwiUyG9397SIAEpTATXd0eBVxWmdafN4YzKpQzvhaRFI)