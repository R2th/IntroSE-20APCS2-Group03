Doanh nghiệp hay các website kinh doanh dịch vụ hiện nay đang rất nhiều nhưng việc sử dụng email doanh nghiệp như của[ google email for business](https://gsuite.google.com) thì cần phải mất phí trung bình nếu một user thì mức giá tầm 30$/user/năm nếu việc kinh doanh thịnh vượng thì rất đơn giản nhưng nếu việc kinh doanh hoặc website bạn tạo ra chỉ vì mục đích cộng đồng thì nguồn chi phí thấp vì vậy mà để tiết kiệm chi phí thì các dịch vụ email doanh nghiệp miễn phí sẽ giúp đỡ các bạn vấn đề này. Hiện nay trên mạng thì có rất nhiều dịch vụ email hỗ trợ doanh nghiệp miễn phí như zoho, yandex,.... tuy nhiên mình thấy Yandex có khá nhiều ưu điểm như việc lưu trữ dung lượng không giới hạn, hỗ trợ 1000 mailbox, cấu hình không quá khó khăn vì vậy mình lựa chọn viết bài này. 

## Yandex mail là gì ?

Yandex mail là một dịch vụ nhỏ của công cụ tìm kiếm Yandex của Nga đây là công cụ tìm kiếm lớn nhất của họ tại đây google còn phải xếp sau Yandex, về dịch vụ mail của yandex thì nó tương tự như G Suite của google chỉ khác một điều là nó hoàn toàn miễn phí. Về cơ bản thì nếu bạn là một coder hay yêu thích công nghệ thì việc cấu hình một tài khoản mail trên Yandex cũng không quá phức tạp mà chỉ cần vài bước đơn giản là bạn đã có một phiên bản Yandex tiêu chuẩn.

## Hướng dẫn đăng ký và cấu hình tài khoản Yandex mail

### Đăng ký

Để có thể bắt đầu sử dụng dịch vụ thì các bạn phải tiến hành đăng ký như thông thường với bất cứ website nào tuy  nhiên đến bước nhập số điện thoại (mobile number) các bạn cần phải bấm vào nút Send code để nhận mã xác nhận về điện thoại  
![](https://images.viblo.asia/a2bd1811-5dcc-4415-931a-a5a2b12b6729.jpg)

Sẽ mất 1 lúc để nhận mã các nhận sau khi các bạn nhận được mã thì bấm vào nút **Confirm**  để xác nhận mã gồm 6 số mà hệ thống yandex đã gửi cho bạn. sau khi hoàn tất các bạn bấm vào nút Register để đăng ký nhé.

Sau khi xong bạn sẽ được chuyển qua trang cá nhân của bạn nếu bạn cảm thấy thông tin như mình liệt kê lúc đầu đã ổn thì các bạn không cần phải cập nhật lại nhunggw thấy cần phải chỉnh sửa thì thay đổi lại cho phù hợp nhé.
![](https://images.viblo.asia/aaf03bfe-4d6b-41ff-840e-fcb378a326d6.jpg)

Vậy là xong bước đăng ký các bạn chuyển qua bước theo là cấu hình nhé.

### Thêm domain vào yandex mail

Để thêm domain vào Yandex các bạn truy cập [vào đây](https://domain.yandex.com/).  sau đó tại ô **domain name** các bạn nhập domain mình muốn cấu hình vào. 
![](https://images.viblo.asia/38315bc8-c5ee-437f-9676-41e4f507f08a.jpg) 

Bấm vào nút **Connect Domain** để chuyển qua trang xác nhận domain bạn mới add vào. 

![](https://images.viblo.asia/d12dd57b-657e-4f7f-98c1-c6825810357f.jpg)

Sau khi bấm vào connect domain thông tin xác nhận của bạn sẽ được liệt kê như vậy.

### Xác nhận quyền sở hữu tên miền với yandex 
### 

Có 2 cách để bạn có thể xác nhận mình là chủ sỡ hữu của tên miền mới thêm vào và có toàn quyền sử dụng.

**Cách 1 tại file hmtl và upload lên host**

Với bước **Step 1. Verify domain ownership**  khá đơn giản các bạn chỉ cần cần dùng Noterpad tạo 1 file html với nội dung là "**a7ee1c67c70f**" và tên file là "**cbb44331fbf5.html**" (mỗi tài khoản được cấp phép mã số khác nhau nhé các bạn.) sau đó các bạn upload lên thư mục chính của website sau khi hoàn thành nó sẽ có dạng https://viblo.asia/cbb44331fbf5.html nếu click vào mà có nội dung như bạn mới soạn là ok đã hoàn thành bước này.

**Cách 2 cấu hình record CNAME**
![](https://images.viblo.asia/01adab20-bcfb-4e3b-b708-e417b8e00655.jpg)

Cách này đơn giản hơn cách 1 khá nhiều bạn chỉ cần truy cập vào trang quản lý DNS vào tạo 1 file CNAME với giá trị là yamail-cbb44331fbf5 và trỏ đến http://mail.yandex.com là xong. 

Sau khi thực hiện xong 1 trong 2 bước này các bạn quay lại trang quản lý của yandex mail bấm vào "**Verify domain ownership**" để xác nhận nhé.

**Chi tiết các bạn vui lòng xem và làm theo video nhé **

https://www.youtube.com/watch?v=nwbPpSU6zIY&t=242s

### Cấu hình  SPF và DKIM

Để mail có thể vào trực tiếp hộp thư inbox các bạn phải cấu hình bước này vì nếu [email cho doanh nghiệp](https://tinomail.com/) mà sử dụng nó gửi nhầm vào thư spam nhiều khi nó còn tệ hơn cả dịch vụ email thông thường nữa nhưng trước khi cấu hình mình nghĩ các bạn nên tham khảo qua về [SPF](https://support.google.com/a/answer/33786?hl=en) và [DKIM](https://support.google.com/a/answer/174124?hl=en) để hiểu rõ hơn nhé. 

Trong trang quản lý https://domain.yandex.com/ các bạn click vào **DNS editor**.
![](https://images.viblo.asia/e665aaf9-b3c2-433b-aace-99307c0dd0be.jpg)

trong đó sẽ hiện rất nhiều DNS records nhưng các bạn chỉ cần chú ý cho mình đó là 2 dòng SPF và DKIM 

![](https://images.viblo.asia/c48cf6cc-0db5-4eb9-8e36-006110fd4734.jpg)

thêm 2 records đó vào trang quản lý DNS của bạn và sau khi hoàn thành nó sẽ hiển thị theo dạng.

![](https://images.viblo.asia/87d8d076-176c-4e4a-8c22-d6b4745b1c4b.jpg)

Ok vậy là hoàn thành rồi các bạn thử xem thành quả các bạn cấu hình như thế nào rồi nhé.