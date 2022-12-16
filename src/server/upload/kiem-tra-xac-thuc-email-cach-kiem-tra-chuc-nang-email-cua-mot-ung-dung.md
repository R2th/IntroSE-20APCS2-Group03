Trong hầu hết các ứng dụng web và di động, việc xác thực tính năng Email được coi là một trong những phần quan trọng nhất của thử nghiệm, để đảm bảo chất lượng trong thành phần Email cũng như với các thành phần khác của hệ thống.

Email được kích hoạt trong các kịch bản khác nhau được coi là được xác thực bằng cách kiểm tra tất cả các thành phần bao gồm mẫu Email, Liên kết / nút trong các trường Email, Từ, Tới, Cc, Bcc, Tệp đính kèm, Nội dung theo thông báo qua Email, v.v.


![](https://images.viblo.asia/b5cef18f-cd6a-48b2-bee4-b0ea41143393.jpg)

### Tại sao chúng ta cần kiểm tra email?
Mỗi thành phần trong hệ thống (các ứng dụng Web / Di động) có thể có các mục đích khác nhau để gửi Email. Tích hợp giữa các thành phần (s) và Email đóng một vai trò quan trọng trong việc tiếp cận người dùng cuối với các thông báo thích hợp. Bất kỳ sự sơ suất nào khi chúng tôi xác thực tính năng này sẽ dẫn đến hiểu lầm, tên xấu trên khách hàng, hack, v.v ...

Có rất nhiều kịch bản mà email đã trở thành một phần không thể thiếu trong cuộc sống của chúng tôi vì chúng có nghĩa là giữ cho người dùng luôn cập nhật thông tin chính xác.

### Các kịch bản thời gian thực phổ biến và các điểm xác nhận cho email

Các điểm xác nhận trong kiểm tra Email thay đổi từ loại này sang loại khác và từ ứng dụng đến ứng dụng. Thông thường, tất cả email phải được xác nhận cho mẫu (bao gồm biểu trưng ứng dụng, tên ứng dụng, địa chỉ người dùng, nội dung chân trang - Bản quyền, chi tiết hỗ trợ khách hàng), ngày và dấu thời gian cho các múi giờ khác nhau.

Ở đây chúng tôi sẽ thảo luận về một số loại Email phổ biến mà hầu hết mọi người đều biết (tất cả các điểm xác nhận được đưa ra dưới đây là kiểm tra cơ bản mà người kiểm thử phải thực hiện trong khi kiểm tra Email của ứng dụng).
#### 1) Email kích hoạt

Khi người dùng đăng ký ứng dụng lần đầu tiên, họ cần kích hoạt tài khoản bằng cách nhấp vào liên kết kích hoạt được gửi trong Email. Điều này cũng xác minh địa chỉ email đã cho của người dùng là hợp lệ và có thể truy cập được.

**Các điểm xác nhận như sau:**

- Nút hoặc liên kết kích hoạt - Nhấp vào nút này:

    - Đưa người dùng đến trang của ứng dụng tương ứng với tài khoản người dùng đã đăng nhập
    - Tài khoản Email của người dùng sẽ được xác minh tự động nếu trang ứng dụng được tiếp cận thành công qua Email
        
- Thời lượng - Kiểm tra thời lượng trong đó liên kết phải được nhấp và xác minh.
     - Xác minh trong khoảng thời gian được chỉ định
     - Hãy thử xác minh sau khi hết thời hạn - Tài kho![](https://images.viblo.asia/5a2b0842-246c-4a48-8db2-2e8af1f8dd32.jpg)ản không được kích hoạt và Email vẫn chưa được xác minh

#### 2) Quên mật khẩu email
Khi người dùng quên mật khẩu để đăng nhập vào ứng dụng, quên lưu lượng mật khẩu có thể được thực hiện để nhận Email có liên kết để đặt lại mật khẩu (tính năng thay đổi từ ứng dụng này sang ứng dụng khác. Đây là thông tin chung).

*Các điểm xác nhận như sau:*

- Đặt lại liên kết mật khẩu:
   - Nhấp vào nó sẽ đưa người dùng đến trang của ứng dụng tương ứng để đặt lại mật khẩu
   - Một số ứng dụng sẽ yêu cầu người dùng trả lời câu hỏi bảo mật trước khi hiển thị trang đặt lại mật khẩu và một số sẽ có câu hỏi bảo mật được tích hợp với trang đặt lại mật khẩu và một số sẽ không có tính năng này
  - Nếu người dùng đặt lại mật khẩu thành công, liên kết trong Email Quên Mật khẩu đã nhận được sẽ bị hủy kích hoạt và không hoạt động
  - Nếu người dùng hủy lưu lượng mật khẩu đặt lại, liên kết trong Email Quên Mật khẩu đã được nhận sẽ vẫn được kích hoạt
- Thời lượng - Kiểm tra thời lượng trong đó liên kết phải được nhấp để đặt lại mật khẩu
   - Nhấp vào liên kết và đặt lại mật khẩu thành công trong khoảng thời gian được chỉ định
   - Hãy thử nhấp vào liên kết sau khi thời lượng đã trôi qua - Liên kết sẽ bị hủy kích hoạt và đã hết hạn

![](https://images.viblo.asia/8993aaca-4111-4b2f-a082-ffaa6500827f.jpg)

 #### 3) Thông báo ngày đến hạn
Điều này là để nhắc nhở người dùng về hành động thực hiện trong một số ngày cụ thể. Đây thường là các khoản thanh toán hóa đơn, thực hiện hành động đối với các mục đang chờ xử lý (ví dụ: chấp nhận hoặc từ chối lời mời tham gia một số sự kiện trong một số ngày cụ thể, gửi biểu mẫu, v.v.).

**Các điểm xác nhận như sau:**

- Số ngày đến hạn / Ngày đến hạn
   - Nếu email thông báo về một số ngày đến hạn thì số đó phải bằng 0 hoặc hơn, số ngày không phải là ngày hiện tại đến hạn. Nó không phải là số âm. Nếu email thông báo về Ngày đến hạn (Ngày theo lịch) thì ngày đó phải là ngày hiện tại hoặc tương lai.
- Loại hành động
   - Kiểm tra loại hành động được yêu cầu là gì. Cần nêu rõ loại hành động mà người dùng phải thực hiện. Có thể là thanh toán hóa đơn, gửi, phản hồi, v.v.

![](https://images.viblo.asia/2cc14148-f14e-4b55-a658-7efb2a9323ba.jpg)

![](https://images.viblo.asia/5005b342-9ea5-409e-b5bf-be802f3bfd73.jpg)

#### 4) Thông báo quá hạn
Điều này là để thông báo cho người dùng về ngày hết hạn đã qua. Điều này thường là để thông báo cho người dùng rằng họ đã không thực hiện hành động đối với các mặt hàng trong ngày đến hạn.

- Số ngày quá hạn
   - Kiểm tra xem số ngày quá hạn có nên là một hoặc nhiều ngày không. Nó không bao giờ là số không hoặc số âm
- Tần số
   - Rất ít ứng dụng sẽ có quy định để tùy chỉnh các email quá hạn được gửi hàng ngày / hàng tuần / hàng tháng, một lần đến hạn đã trôi qua, cho đến khi người dùng hoàn thành hành động. Rất ít ứng dụng sẽ có thông báo chuẩn được gửi chỉ một lần sau khi ngày hết hạn đã qua.

#### 5) Đăng ký
Điều này thay đổi theo yêu cầu của người dùng. Người dùng có thể chọn một trong số các đăng ký Hàng ngày, Hàng tuần, Bi-Hàng tháng hoặc Hàng tháng sau đây. Điều này thường sẽ dành cho các bản tin, bản cập nhật, phiếu mua hàng, v.v.

- Tần số
   - Email phải được gửi theo lựa chọn của người dùng cho đăng ký. Nếu hàng ngày, sau đó email đăng ký sẽ được gửi chỉ một lần trong một ngày. Nếu hàng tuần, sau đó một lần trong một tuần. Và tiếp tục…
- Liên kết
   - Mọi liên kết trong email sẽ điều hướng đến trang tương ứng của ứng dụng. Nếu email là để cập nhật, thì liên kết sẽ chuyển hướng đến trang nơi cập nhật có nghĩa là được hiển thị. Nếu email dành cho phiếu mua hàng thì liên kết sẽ chuyển hướng đến trang Phiếu mua hàng của ứng dụng. Nó phụ thuộc vào loại người dùng đăng ký đã chọn.

![](https://images.viblo.asia/0c8701ca-901c-40f9-80aa-b1e2a67a4b3f.jpg)

![](https://images.viblo.asia/20d64692-2ad8-40c2-85f3-1cd2a145a70f.jpg)

 #### 6) Biểu mẫu
Email ở đây dự định người dùng cung cấp phản hồi thông qua biểu mẫu / liên kết tới biểu mẫu. Các điểm xác nhận như sau:

- Liên kết
   - Liên kết trong email sẽ chuyển hướng người dùng đến trang gửi biểu mẫu của ứng dụng theo loại người dùng biểu mẫu được yêu cầu để gửi
   - Sau khi gửi, nhấp vào liên kết một lần nữa sẽ thông báo cho người dùng rằng biểu mẫu đã được gửi. Không nên cho phép người dùng gửi lại biểu mẫu

![](https://images.viblo.asia/dd85c5f9-0328-4b11-9844-c2c0459240f3.jpg)

![](https://images.viblo.asia/b79cd1ce-e911-43cd-9e8b-82e2c8e69ac3.jpg)

#### 7) Email xác nhận
Email ở đây là để thông báo cho người dùng về xác nhận của hành động được thực hiện. Điều này thường là xác nhận đặt trước, xác nhận đơn đặt hàng, xác nhận truy vấn, v.v.

**Các điểm xác nhận như sau:**

- Chi tiết xác nhận:
   - Số đơn đặt hàng / số đặt phòng phải chính xác và khớp với số được hiển thị trong giao diện người dùng ứng dụng. Vì nó là định danh để theo dõi các đơn đặt hàng / đặt chỗ, nó phải là duy nhất (để được xác nhận trong backend - DB) trong suốt ứng dụng. Không có đơn đặt hàng / đặt phòng nào nên chia sẻ cùng một số nhận dạng.
   - Cùng với số này, nó cũng phải được xác thực cho loại đơn đặt hàng, thông tin người dùng, địa chỉ thanh toán, địa chỉ giao hàng và giá. Tất cả thông tin phải giống chính xác với những gì người dùng đã cung cấp trong giao diện người dùng ứng dụng.
- Liên kết:
   - Một liên kết trong email sẽ đưa người dùng đến trang chi tiết của đơn đặt hàng trong giao diện người dùng ứng dụng. Nên có kết hợp chính xác giữa thông tin trong Email và giao diện người dùng ứng dụng

![](https://images.viblo.asia/b86c2cc2-96df-45b9-8987-418b428e9f08.jpg)

#### 8) Bản ghi trò chuyện
Tại đây, người dùng nhận được toàn bộ bản ghi trò chuyện dưới dạng Email. Điều này thường là khi hỗ trợ Live Chat with Customer được kết thúc.

**Các điểm xác nhận như sau:**

- Chi tiết
   - Kiểm tra tên của người đã cung cấp hỗ trợ trực tuyến. Kiểm tra xem toàn bộ cuộc trò chuyện có xuất hiện trong email có thông tin chi tiết của người gửi cho mỗi mục trò chuyện hay không (Tên người, Ngày giờ gửi tin nhắn trò chuyện, v.v.)
#### 9) Email có tệp đính kèm
Người dùng nhận được email có tệp đính kèm. Tệp đính kèm có thể được bảo vệ bằng mật khẩu / không được bảo vệ. Đây thường là các tuyên bố từ các lĩnh vực tài chính, Thỏa thuận cấp phép người dùng cuối để tham khảo, Điều khoản & điều kiện để tham khảo, v.v., điều này một lần nữa thay đổi từ ứng dụng sang ứng dụng.

**Các điểm xác nhận như sau:**

- Loại tệp đính kèm
   - Các loại tệp hợp lệ phải được gửi dưới dạng tệp đính kèm. Tất cả các tập tin đính kèm được mở nên được quét virus trước khi tải / mở. Điều này một lần nữa có thể được tùy chỉnh ở cấp ứng dụng ở phần phụ trợ, giống như, quét vi-rút chỉ được thực hiện khi tải xuống, chỉ khi mở, cho cả việc tải xuống và mở.
   - Tệp đính kèm được bảo vệ bằng mật khẩu phải tải xuống mà không yêu cầu mật khẩu. Nhưng trong khi mở nó hoặc từ chính Email hoặc mở bản sao tải xuống nên luôn luôn yêu cầu mật khẩu. Các mục nhập mật khẩu không chính xác ở đây sẽ không xác định vì bản sao cục bộ không thể được theo dõi trực tuyến để khóa tệp đính kèm

![](https://images.viblo.asia/923542c6-98dd-49f9-954b-67c5b93ba4a2.jpg)

![](https://images.viblo.asia/12861195-8cfe-4355-9f36-d5f4848efe97.jpg)

**Các loại email**

Loại email có thể là HTML (đầy màu sắc và hấp dẫn đối với người dùng, người dùng quan tâm để đọc toàn bộ email) hoặc Văn bản thuần túy (chỉ là văn bản).

HTML là những cái được ưu tiên nhất và thường được đặt làm mặc định trong hầu hết các ứng dụng ở phần cuối. Nếu được yêu cầu, ứng dụng có thể chọn gửi email văn bản thuần túy cho người dùng, điều này yêu cầu thay đổi ở phần cuối.

**Email Các điểm kích hoạt:**

Email có thể được gửi ngay lập tức hoặc dưới dạng tóm tắt / đợt. Email ngay lập tức được kích hoạt bởi hành động của người dùng. Những email này thường là email kích hoạt, đặt lại email mật khẩu, phiên âm trò chuyện, email xác nhận, v.v. tức là email Tóm tắt / hàng loạt được kích hoạt dựa trên các cài đặt tại phần cuối của ứng dụng.

Email Các điểm kích hoạt sẽ được xác định để kích hoạt tại thời điểm cụ thể ( ví dụ: ngày thứ 3 hàng tuần lúc 12:00 sáng). Những thông báo này thường sẽ là báo cáo từ các lĩnh vực tài chính (Báo cáo ngân hàng), thông báo ngày đến hạn cho các hóa đơn, thông báo quá hạn, đăng ký, v.v.

**Số lần trả về:**

Đây là một trường hợp rất phổ biến khi email bị trả lại khi chúng được gửi đến địa chỉ email không hợp lệ. Thông thường, địa chỉ email bị hủy kích hoạt / không còn được sử dụng nữa và không tồn tại chút nào - là các ứng viên đã trả lại.

Máy chủ thường cố gắng cho một số lần được chỉ định để gửi Email đến địa chỉ dự định. Khi nó không đạt được địa chỉ email dự định, nó sẽ bị trả lại và sẽ tạo một mục trong máy chủ vì lỗi của nó. Sẽ có một máy chủ khác nhau để duy trì các loại hoạt động này và thường được gọi là các máy chủ trả lại. Có thể có một số lý do khiến email không thành công bằng cách tiếp cận người dùng của nó.

**Dưới đây là vài điểm khác cho thất bại:**

- Máy chủ email bị ngừng hoạt động trong một thời gian dài
- Thuật toán để tìm một tuyến đường ngắn để tiếp cận người dùng không hoạt động chính xác và mất rất nhiều thời gian để tiếp cận người dùng, vào thời điểm đó có thể nó đã vượt qua thời gian được chỉ định để tiếp cận người dùng. Điều này thường được gọi là tăng số lần nhảy
- Miền email của người dùng bị ngừng hoạt động trong một thời gian dài
- Tài khoản của người dùng cho ứng dụng không được kích hoạt để nhận email


#### Phạm vi địa phương hóa cho kiểm tra email

Khi ứng dụng hỗ trợ nhiều ngôn ngữ, thì hỗ trợ cũng sẽ mở rộng cho email.

Tất cả email được gửi phải bằng ngôn ngữ hồ sơ người dùng. Nếu người dùng đã đặt tiếng Anh làm ngôn ngữ hồ sơ thì tất cả các email được gửi cho họ phải bằng tiếng Anh. Nếu ngôn ngữ hồ sơ của người dùng là tiếng Pháp, thì tất cả email được gửi cho họ phải bằng tiếng Pháp. Ngôn ngữ hồ sơ người dùng có thể là cài đặt một lần hoặc có thể được thay đổi khi và khi được yêu cầu, tùy thuộc vào cài đặt của ứng dụng.

Email phải được gửi bằng ngôn ngữ mà người dùng có tại thời điểm nó được kích hoạt.

**Các điểm xác nhận phổ biến cho việc kiểm tra bản địa hóa các email như sau:**

- Dòng chủ đề
- Nội dung của email
   - Nội dung - văn bản của nội dung
   - Tên liên kết / tên nút
   - Thông tin bản quyền
   - Chi tiết hỗ trợ khách hàng


#### Tiêu chuẩn / Tùy chỉnh email
Email có thể được tùy chỉnh tại backend.

Ví dụ , vài ứng dụng hỗ trợ người dùng tùy chỉnh email khi chúng được gửi đi. Người dùng có thể thay đổi ở đây dòng Chủ đề và / hoặc nội dung của email để thuận tiện hoặc với mục đích dễ dàng nhận ra. Trong trường hợp này, thử nghiệm kỹ lưỡng phải được thực hiện bởi nhóm thử nghiệm vì cơ hội xâm nhập cao.

Thử nghiệm phải được thực hiện để tiêm - gửi mã HTML, mã Java, SQL, vv Tất cả những điều này sẽ thất bại để tăng mức độ bảo mật. Nếu ứng dụng không hỗ trợ tùy chỉnh email, thì tất cả email được gửi sẽ tuân theo tiêu chuẩn / nội dung tiêu chuẩn như được thiết lập bởi một ứng dụng.

#### Phần kết luận

Kiểm tra email là một hoạt động quan trọng vì hầu hết các thành phần của ứng dụng được tích hợp với chức năng này.

Nó sẽ là sự hỗ trợ và nỗ lực của cả nhóm để kiểm tra hoàn toàn chức năng email của ứng dụng. Điều này cần được lên kế hoạch tốt trước khi thử nghiệm thực sự bắt đầu và nên đi đôi với nhau trong khi kiểm tra từng thành phần / thành phần liên quan.

Kiểm tra email phải có các trường hợp kiểm tra riêng được viết cho từng loại Email bao gồm tất cả các khía cạnh cần kiểm tra. Điều này nên được thực hiện trong tất cả các loại thử nghiệm Kiểm tra hồi quy, thử nghiệm Adhoc, Thử nghiệm bản địa hóa, kiểm tra UAT và Thử nghiệm sản xuất.

Bất cứ issues nào trong Email trong thời gian thực, sẽ để lại một ấn tượng xấu về ứng dụng, khách hàng, và cuối cùng, nó mang đến cho người kiểm thử ứng dụng đó. Vì vậy, Email Validation là hoạt động rất quan trọng và được yêu cầu nhiều trong kiểm thử phần mềm.

*Bài viết được tham khảo tại: https://www.softwaretestinghelp.com/email-validation-testing/*