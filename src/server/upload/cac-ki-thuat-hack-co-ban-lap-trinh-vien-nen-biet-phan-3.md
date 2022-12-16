## [Part 1](https://viblo.asia/p/cac-ki-thuat-hack-co-ban-lap-trinh-vien-nen-biet-phan-1-gDVK2BvrKLj)
## [Part 2](https://viblo.asia/p/cac-ki-thuat-hack-co-ban-lap-trinh-vien-nen-biet-phan-2-4dbZN92gKYM)
## Part 3
### Open Redirects
Là lỗ hổng lợi dụng việc điều hướng trang sau khi thực hiện một hành động nào đó (thường là đăng nhập), thường là do trang web đó không kiểm tra lại param khi điều hướng. Theo xếp hạng của OWASP thì nó nằm trong top 10 nguy cơ bảo mật web năm 2013.

Hacker có thể điều hướng nạn nhân đến trang web chứa mã độc, hoặc lừa để nạn nhân để chiếm đoạt tài khoản của nạn nhân

Kịch bản khá đơn giản: 
+ web ~~xịn~~ chuẩn `www.example.com` sẽ redirect bạn sau khi đăng nhập về trang trước đó bạn đọc với param dạng `www.example.com/login?redirect=http://www.example.com/post/1234`
+ hacker nhận ra chỉ cần thay đổi param thì có thể redirect đến bất kì trang nào kể cả ngoài trang gốc mà không có bất cứ thông báo nào
+ hắn tạo ra trang giả mạo là `www.examplee.com/login` có giao diện giống hệt trang `www.example.com/login`
+ sau đó gửi đường dẫn chứa link đã encode param và thêm một vài param hầm bà nhằng để che mắt rồi gửi cho nạn nhân `www.example.com/login?_g=DernKFjelgnne&vid=iguana-party&referrer=email&next=http%3A%2F%2Fwww.examplee.com%2Flogin`
+ nạn nhân theo link, sau khi đăng nhập thành công sẽ bị điều hướng sang trang giả mạo kèm thông báo đăng nhập thất bại
+ điều gì xảy ra tiếp thì các bạn chắc cũng đoán được, tên na ná, giao diện y hệt, đăng nhập thất bại, => tất yếu là nạn nhân sẽ đăng nhập lại và thế là tài khoản về tay hacker dễ như một trò đùa :joy:

####  Phòng chống
##### 1. Ngăn chặng việc điều hướng ra ngoài trang hiện tại
##### 2. Check Referrer, Referrer lạ thì cũng không cho điều hướng luôn


### Unencrypted Communication
Bằng cách tạo một wifi bình thường và nhử cho nạn nhân sử dụng, mọi truy vấn vào những trang không được bảo mật (không có https) sẽ bị hacker dùng một phần mềm đọc lại.

Có thể nhưng gì nạn nhân làm trên trang đó không quan trọng, nhưng bằng việc phân tích các hành động và thói quen của nạn nhân, hacker có thể tìm ra được nhiều thông tin quan trọng

VD:
+ bạn vô tình sử dụng wifi của hacker và vào một forum tào lao nào đó không https,
+ sau vào câu comment vô thưởng vô phát, bạn khoe con mèo của bạn, tên nó là XXX, sinh nhật nó là YY/ZZ
+ bằng vào phân tích, hacker đoán rằng rất có thể bạn dùng tên hoặc ngày sinh của con mèo làm mật khẩu, và vì người dùng thường dùng chung mất khẩu cho nhiều tài khoản, anh ta có thể thử với email, fb,... 
+ và tất nhiên nếu cái web trên nó phèn quá thì chỉ cần đăng nhập là anh bạn hacker cũng đã thể biết mật khẩu rồi, và lại như trên, test nó trên các loại tài khoản của bạn.

####  Phòng chống
Cài và cấu hình ssl cho server web

### User Enumeration
Enumeration nghĩa là liệt kê, đại khái thì là cái khi cái thông báo lỗi cho người dùng khá là chi tiết dẫn đến việc hacker có thể lợi dụng để kiếm thông tin về web.

Ví dụ như khi đăng nhập bạn thông báo chính xác "User không tồn tại" hoặc "Password không chính xác", người dùng có thể vui, nhưng bạn cũng vô tình cung cấp cho hacker những thông tin như rằng người này có hay không tồn tại trong hệ thống.
Hoặc đôi khi cũng là khi phản hồi lâu hơn bình thường, hacker cũng sẽ nhận ra rằng user name này có thể tồn tại nên hiện đang phải check thêm password nên mới lâu như vậy....

Lỗi này thường xảy ra tại các đoạn đăng nhập, đăng ký, reset mật khẩu, hoặc khi xem profile của user khác.

![](https://images.viblo.asia/b8d7fb71-b33b-4446-b768-6d3704463b8e.png)

![](https://images.viblo.asia/2dcc4418-8844-4df1-be07-b808afdd253e.png)

####  Phòng chống
##### 1. Login
+ Chỉ đẩy ra thông báo chung chung khi đăng nhập thất bại
+ Đảm bảo HTTP response và thời gian phản hồi là tương tự nhau trong các trường hợp.

##### 2. Password Reset
+ không tiết lộ username
+ nếu cần gửi mail thì bắt người dùng nhập email ấy, không phải username

##### 3. Registration
+ dùng CAPTCHA
+ nếu email đăng ký đã tồn tại, gửi thông báo cho người dùng sở hữu email đó rằng ai đó đang cố đăng ký/đăng nhập với email của họ

##### 4. Profile Pages
+ chỉ hiển thì trang profile với những user đã đăng nhập
+ nếu bạn ẩn trang profile, đảm bảo rằng nó không khác biệt gì với khi mà profile không tồn tại (cái ảnh 2 ở ngay trên :point_up:)

### Information Leakage
Information Leakage - rò rỉ thông tin, nghe thì có vẻ chung chung, nhưng thật ra nó chung chung thật, tôi lần mò mãi mà cũng không chắc viết đoạn này thế nào cho đúng :'(

Vidu: hacker biết tên con mèo nhà bạn và đoán rằng có thể bạn dùng nó làm password cho tài khoản nào đó, cũng là rò rỉ thông tin. Trang web của bạn vô tình để lộ thông tin nhạy cảm của ngườ dùng, nhưng email chẳng hạn, cũng là rò rỉ thông tin. Hoặc bằng cách xem cấu trúc thông tin trả về, cấu trúc đường dẫn đến các file js, css, format của cookie,... hacker đoán ra được kĩ thuật mà bạn dùng cho web site của mình, đó cũng là rò rỉ thông tin

![](https://images.viblo.asia/04948718-b28f-4520-96b6-9fdfa2629825.png)

![](https://images.viblo.asia/91b834de-be20-492e-9d3f-58e0486d3a50.png)

####  Phòng chống
##### 1. Disable the “Server” HTTP Header and Similar Headers
##### 2. Sử dụng Clean URL
Là các url có thể đọc được, dễ hiểu kể cả với người dùng không chuyên, vừa che dấu được thôn tin backend, vừa giúp người dùng dễ dàng phát hiện khi hacker dùng link giả mạo
##### 3. Đảm bảo parameters của Cookie là dạng chung
=> thế thì không khó đoán kỹ thuật dùng ở backend hơn
##### 4. Tắt thông báo lỗi kiểu debug ở phía client, chỉ thông báo chung chung kiểu trang không tồn tại, bạn không được phép,...
##### 5. "Làm sạch" thông tin khi đưa cho client
##### 6. Bảo mật JavaScript
Nén nó lại, mã hóa cái biến, hàm,... mấy tool minify có hết đó, hoặc không thì ae encode nó cũng được, thích vui chơi thì dùng jjencode, aaencode cũng vui, nhưng cái file js nó nở ra khiếp hồn lắm =))
##### 7. "Vệ sinh" file template
##### 8. Đảm bảo cấu hình chính xác cho folder web

### Password Mismanagement
Xử lý password một cách an toàn là điều khó nhất, cũng là điều quan trọng nhất khi build một website. Vì nó là điều khó nhất, nên ae cũng đừng mong một thằng tí trượt tốt nghiệp vì môn văn như tôi nói rõ ràng được :'( đoạn nào không hiểu thì bỏ não ra mà đọc thôi

Vấn đề này cũng nằm một phần ở phía người dùng, bạn đặt ra các rule với mong muốn người dùng sẽ chú ý đến vấn đề bảo mật và có một password mạnh, nhưng thường thì phần lớn là làm cho có lệ. Dù là vậy, đó cũng chỉ là một phần, việc xử lý, lưu trữ vẫn là việc của bạn thôi.

Việc băm chặt (hashing), tra mắm muối (salt), giới hạn số lần đăng nhập sai là những vấn đề cơ bản cần lắm được.

Mà từ đầu thì cũng cần phải làm rõ, bạn có cần phải làm một cái hệ thống đăng nhập riêng hay không khi đã có đăg nhập qua FB, Google rồi, nó ngon value ra ấy nên dùng thì đỡ khổ, đỡ lo, có thằng khác làm hộ rồi.

Còn bắt buộc phải làm thì cũng đừng nhưng cái thằng này :point_down:

![nguồn: internet](https://images.viblo.asia/a227f426-1600-47ba-a38f-26a695b116eb.jpg)

Cái này cũng có liên quan đến vấn đề khi xử lý quên mật khẩu, dùng bên thứ 3 như trên thì sướng, chả lo gì, còn tự viết thì khi gửi link reset về mail, nhớ đặt hạn sử dụng cho nó, 15phút, 1h, 1 ngày gì đó, và nhớ đó là hàng dùng 1 lần nhé.

Và nhớ là luôn kèm theo CAPTCHA, SSL nhé

####  Phòng chống
tóm tắt lại đoạn kể lể lủng củng phía trên thôi
##### 1. Dùng xác thực bên thứ 3 nếu có thể
##### 2. Đảm bảo password đủ phức tạp (nhưng đừng như thằng trên :point_up:)
##### 3. Cho phép reset Password bằng email khi chưa đang nhập (nhớ đặt hạn sử dụng cho link reset)
##### 4. Xác nhận Password cũ khi reset trong trường hợp người dùng đã đăng nhập
##### 5. Ngăn Brute-Forcing với CAPTCHA và limit số lần được đăng nhập sai
##### 6. Lưu mật khẩu với các thuật toán Hash, Salted mạnh
##### 7. Đặt HSD cho session sau khi người dùng ngừng sử dụng, và tất nhiên là khi đăng xuất thì cũng ngừng luôn cái secction đó
##### 8. Dùng HTTPs


*Còn lứa...*