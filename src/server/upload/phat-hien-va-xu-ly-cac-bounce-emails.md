1. Giới thiệu
2. Các lý do khiến email bị bounce
3. Làm thế nào để xử lý?
4. Một số công cụ hữu ích
5. Kết luận
## 1. Giới thiệu
- Trong một ứng dụng web chúng ta thường có những tính năng liên quan tới email, tuy nhiên không phải lúc nào tính năng này cũng hoạt động hoàn hảo. Trong một số trường hợp nếu email không tồn tại thì việc gửi email sẽ bị bounce
- Bài viết này sẽ giới thiệu email bị bounce là gì và cách xử lý như thế nào.
- Một bounced email, hay bounce là một email bị máy chủ email từ chối. Khi một email bị bounce vì một lý do nào đó nó không thể được gửi tới đích.
- Email bị bounced có thể là hộp thì bị đầy, không nhận được phản hồi hay email không tồn tại. Email bị bounce ở trạng thái không thể gửi có nghĩa là địa chỉ email bị đóng vĩnh viễn và không nhận được thư điện tử. Email bị bounced ở mức thấp hơn là tạm thời và có thể do máy chủ ngừng hoạt động hoặc hộp thư đến đầy. Hầu hết các nhà cung cấp dịch vụ email sẽ cho phép một số lượng email bị bounce nhất định nếu vượt quá họ có thể dừng cung cấp dịch vụ.
## 2. Các lý do khiến email bị bounce
- Tại sao email bị bounce xảy ra? Có nhiều lý do khiến thư email có thể bị bounce: địa chỉ email không tồn tại, hộp thư đến đầy, máy chủ ngừng hoạt động, địa chỉ người gửi có khiếu nại về spam, nội dung bị gắn độc hại hay email bị hạn chế đối với miền gửi.
- Email bị bounce thường không phải là mối quan tâm lớn. Bạn có thể giảm tỷ lệ bounce bằng cách chỉ gửi đến các địa chỉ email đã xác thực, email thường xuyên được người dùng sử dụng.

**Một số lý do khiến email bị bounce chính**

- *Đia chỉ email không tồn tại:* nếu email bị bouce được đánh dấu là "địa chỉ email không tồn tại" thì địa chỉ email đó có thể có lỗi đánh máy hoặc người có địa chỉ của công ty đã ngừng hoạt động. Cũng có khả năng người liên hệ cung cấp sai địa chỉ email, trường hợp này có thể xảy ra nếu bạn đang cung cấp thứ gì đó trực tuyến để đổi lấy email. Trong trường hợp này, điều quan trọng là phải xem lại các địa chỉ liên hệ trong danh mục này và xem có bất kỳ lỗi chính tả rõ ràng nào trong địa chỉ email hay không. Nếu không, hãy cố gắng liên hệ với người cung cấp bằng các phương tiện khác để xác thực địa chỉ email chính xác.

- *Đia chỉ email không gửi được:* nếu email bị bounce thuộc danh mục "Không gửi được", điều đó có nghĩa là máy chủ email nhận tạm thời không khả dụng, bị quá tải hoặc không thể tìm thấy. Máy chủ không tìm thấy có thể đã bị lỗi hoặc đang được bảo trì, vì vậy email có thể gửi được lại sau khi máy chủ đã hoạt động trở lại. Tuy nhiên, nếu địa chỉ email này liên tục bị bounce nhiều lần có nghĩa là máy chủ này không hoạt động nữa.

- *Hộp thư đầy:* nếu email của người dùng có quá nhiều email trong hộp thư đến của họ mà họ không thể nhận được nữa, thì email của bạn sẽ bị bounce cho đến khi họ xóa bớt email. Đôi khi, điều này cũng có nghĩa là người dùng không sử dụng email này nữa. Đối với một địa chỉ email không tồn tại, bạn có thể muốn theo dõi liên hệ bằng mạng xã hội, điện thoại hoặc thư để kiểm tra xem địa chỉ đó có hợp lệ hay không. Theo dõi cẩn thận loại email này nếu nhiều tháng trôi qua và người đó vẫn chưa trở lại thì bạn có thể cân nhắc việc xóa liên hệ.

- *Email bị chặn:* nếu địa chỉ email được đặt trong danh mục "Bị chặn" có nghĩa là máy chủ thư đã chặn email đến. Điều này thường xảy ra đối với các tổ chức chính phủ hoặc trường học, nơi các máy chủ có thể nghiêm ngặt hơn khi nhận email. Để giải quyết vấn đề này, bạn cần liên hệ với người hỗ trợ và yêu cầu quản trị viên hệ thống của họ bỏ chặn địa chỉ IP.

Ngoài ra còn các lý do khác nữa.
## 3.  Làm thế nào để xử lý?
- Thông thường nhà cung cấp email sẽ thông báo cho bạn qua webhook nếu có bất kì email nào bị bounce. Điều này thường xảy ra sau khi email đã được gửi tới và bị trả lại. Bạn có thể gắn cờ và loại bỏ các email này ra khỏi danh sách người gửi.
- Sử dụng các nhà cung cấp dịch vụ để xác thực email, họ thường cung cấp hai lựa chọn là xác thực trực tiếp bằng cách dán các địa chỉ email vào công cụ hoặc sử dụng API.
- Ở đây tôi khuyên bạn nên sử dụng dịch vụ API để xác thực email. Trong một số tính năng dễ nhận email bị bounce chúng ta nên xác thực trước nếu không nó có thể khiến tỉ lệ bounce tăng cao dẫn tới tài khoản của bạn có thể bị khóa bất cứ lúc nào.
## 4. Một số công cụ hữu ích
**1. [millionverifier](https://www.millionverifier.com/)**

**Chi phí:** 

- 50.000 email xác thực chỉ với $59
- 100.000 email xác thực chỉ với $99
- 1.000.000 email xác thực chỉ với $299

**Độ chính xác:** 99%

**Miễn phí lần đầu:** Dùng thử miễn phí lên tới 200 email

**Tốc độ xử lý:** 100000 email chưa đầy 1 giờ

**Loại bỏ email trùng lặp:** có

**Hỗ trợ API:** Có

**Đảm bảo quyền truy cập dữ liệu:** thỏa thuận giữa 2 bên

**2. [myemailverifier](https://myemailverifier.com/)**

**Chi phí:** 
![](https://images.viblo.asia/a982ebb1-b203-43a6-8c4a-161e90ee950f.png)

**Độ chính xác:** 99%

**Tốc độ xử lý:** 1000 email trong vòng chưa đầy 5 phút 

**Loại bỏ email trùng lặp:** có

**Hỗ trợ API:** Có

**Miễn phí lần đầu:** Dùng thử miễn phí lên tới 500 email

**Đảm bảo quyền truy cập dữ liệu:** thỏa thuận giữa 2 bên

**3. [usebouncer](http://usebouncer.com/)**

**Chi phí:** 

![](https://images.viblo.asia/311f7989-bb72-4dfa-a1cf-2f2990d9de4c.png)

**Độ chính xác:** 99.5%

**Miễn phí lần đầu:** Dùng thử miễn phí lên tới 1000 email

**Tốc độ xử lý:** kéo thả 250k email cùng lúc, xử lý chưa đầy 1 giờ

**Loại bỏ email trùng lặp:** có

**Hỗ trợ API:** Có

**Đảm bảo quyền truy cập dữ liệu:** thỏa thuận giữa 2 bên

***Ví dụ về xác thực email sử dụng usebouncer***
![](https://images.viblo.asia/b682d441-cedb-4e36-bb30-f03213fea656.png)
- Về tài liệu API các bạn có thể xem tại [đây](https://docs.usebouncer.com/)
## 5. Kết luận
- Việc xác thực email trước khi gửi rất quan trọng bởi vì nó có thể ảnh hưởng tới performance hoặc mức độ trải nghiệm của trang web
- Hãy xem xét chúng bằng cách sử dụng các dịch vụ để tránh gặp các lỗi có thể xảy ra với hệ thống của bạn trước khi quá muộn.