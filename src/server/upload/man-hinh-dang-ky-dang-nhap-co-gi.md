## Màn hình Đăng ký
Nếu là người dùng bạn có thích luôn phải điền thông tin vào màn hình Đăng ký của các trang web không? thì câu trả lời thường là không. Tại sao vậy? Đơn giản là vì điều người dùng muốn là nhanh, có ngay, muốn mua hàng ngay, tán gẫu ngay… Họ thật sự không thích điền thông tin để đăng ký, nhưng ở góc nhìn kinh doanh thì điều điều này là cần thiết.

### Vấn đề ở màn hình Đăng ký với người dùng là gì?
1. Mất thời gian.
2. Phức tạp và đôi khi khó hiểu có thể gây khó khăn cho người dùng.
3. Một số màn hình đăng ký còn yêu cầu người dùng đưa ra thông tin cá nhân mà họ ngại chia sẻ – số điện thoại, địa chỉ và đặc biệt là thông tin chi tiết về thẻ tín dụng.

Để chốt đơn hàng thì cần thông tin từ màn hình đăng ký nhưng nếu không khéo thì bạn sẽ mất khách hàng ở bước này vì có nhiều khách hàng từ chối và thoát khi trông thấy màn hình đăng ký. Làm thế nào để có được thiết kế “giữ chân” khách hàng, để họ điền các thông tin cần thiết vào form đăng ký? Hãy cùng tham khảo các tiêu chí sau khi cần thiết kế một màn hình đăng kí cho ứng dụng của mình.

### Nhóm thông tin liên quan hoặc chia thành nhiều bước
Chúng ta chỉ nên đưa các thông tin thật sự cần thiết vào màn hình Đăng ký. Nếu có thông tin nào đó là có cũng được, không có cũng không sao thì  không nên đưa vào. Chỉ nên có 1-2 thông tin là dạng tùy chọn và chắc chắn đó là các thông tin cần thiết. Nếu đã cố gắng, nhưng  vẫn phải có xây dựng màn hình Đăng ký với nhiều thông tin, nhiều lựa chọn thì tốt nhất là bạn nên chia thành nhiều bước (màn hình con) hoặc nhóm các thông tin có liên quan với nhau cho người dùng dễ thao tác hơn.
![](https://images.viblo.asia/efc00df7-cdd4-4592-ac05-8d30741bd4a6.png)

### Auto-focus vào thông tin đầu tiên trong form đăng ký
![](https://images.viblo.asia/f8d5019f-3455-454d-aaa2-2b7fa4369963.jpg)
Nên tự động hướng người dùng đến điểm xuất phát đầu tiên của màn hình Đăng ký và bạn cũng có thể gây chú ý ở thông tin đầu tiên thông qua đường viền màu sắc, màu nền hoặc cả hai.
Tiêu chí này nên được áp dụng cho cả màn hình Đăng nhập.

### Cảnh báo người dùng biết Caps Lock có BẬT
Người dùng nhập mật khẩu khi đang bật caps lock? Bạn nên báo cho họ biết việc này.\
Khi bạn cảnh báo, người dùng sẽ đỡ lúng túng nếu hệ thống cứ báo lỗi, thường thì người dùng có thể lỡ bấm phím Caps lock thay cho phím Shift.

![](https://images.viblo.asia/92af40d7-7ce5-49e4-95ed-57eef924de69.jpg)

### Giúp người dùng chọn mật khẩu tốt hơn
Có rất nhiều các luồng ý kiến khác nhau về việc ~~ép buộc~~ giúp đỡ người dùng lựa chọn mật khẩu khác với những mật khẩu dở khôn tả như [password123 và iloveyou, v.v.](https://blog.codinghorror.com/dictionary-attacks-101/)

Chúng ta vẫn thường gặp những công cụ đo độ mạnh của mật khẩu cập nhật theo mỗi kí tự bạn nhập vào trường mật khẩu.
![](https://images.viblo.asia/f18821be-bbe4-41dd-bdf2-98cae1ccd1f9.gif)
Đây là một ý tưởng hay, nhưng việc thực hiện ý tưởng này cũng còn nhiều điều chưa được chuẩn hóa, ví dụ như việc quyết định độ mạnh yếu của mật khẩu hoàn toàn phụ thuộc vào ý kiến chủ quan của người sở hữu (hoặc thiết kế) trang web. Một mật khẩu được coi là "tốt" trên trang này nhưng chưa chắc đã "tốt" ở một trang khác. Một điều không dễ chịu chút nào.

Nếu không có yêu cầu đặc biệt từ Khách hàng thì nhóm phát triển phần mềm chúng tôi thường đặt mặc định độ dài tối thiểu của mật khẩu phải là 6 hay có thể 8 kí tự.

### Dùng chung một form để đăng ký và đăng nhập – nhưng hãy cẩn thận
![](https://images.viblo.asia/be8179d4-12c4-4c0e-b883-242dcd4673e5.jpg)

Trong một số trường hợp thì Khách hàng yêu cầu có thể dùng chung một màn hình cho Đăng ký và Đăng nhập. Sau khi nhập email và mật khẩu, hệ thống sẽ kiểm tra xem email đã có trong cơ sở dữ liệu hay chưa. Nếu có, bạn sẽ đăng nhập, nếu không – ứng dụng sẽ tạo một tài khoản mới với email đó cho bạn. Nhưng trong trường hợp bạn nhập sai email thì sao, dịch vụ cũng sẽ tạo một tài khoản với email sai này. Ca này căng nha :grimacing:

### Nên tích hợp chức năng đăng nhập/đăng ký với tài khoản Google, Facebook… 
![](https://images.viblo.asia/48f17c37-221e-41e7-b1b8-590b79276cfb.jpg)

Tích hợp đăng nhập hệ thống của bạn bằng tài khoản mạng xã hội của người dùng là một cách cực kỳ hiệu quả, tạo điều kiện để chúng ta có được những thông tin cần thiết khi Đăng ký người dùng mà không cần yêu cầu người dùng nhập vào. Nhưng hệ thống phải cam kết với người dùng rằng dữ liệu trên tài khoản mạng xã hội của họ phải được bảo mật và chỉ rõ chúng ta chỉ dùng những thông tin cần thiết.
![](https://images.viblo.asia/4e37631a-081b-4635-8d73-3ab6a662b2de.jpg)

## Màn hình Đăng nhập
Trải nghiệm đăng nhập: nhập thông tin định danh người dùng và mật khẩu và nhấp chuột trên nút Đăng nhập và ... ời xong rồi đó, nếu bạn nhập đúng thông tin thì vào được hệ thống và nếu nhập sai thì sẽ có thông báo lỗi nhắc bạn kiểm tra lại thông tin. 
Đây là hình thức mặc định cho đến khi chúng ta cấu hình thêm các phương thức đăng nhập khác.

Một màn hình Đăng nhập với 2 trường, 1 nút và 2 liên kết (Đăng ký mới và Quên mật khẩu), có vẻ đơn giản phải không? Theo suy nghĩ thông thường là vậy. Và nó là như vậy, cho đến khi chúng ta cân nhắc tất cả các trường hợp mà một hành động đăng nhập đơn giản có thể dẫn đến những bất cập cho người dùng. Chúng ta hãy cùng xem xét.

### Hãy để người dùng nhập email khi đăng nhập
Danh tính người dùng luôn là email, rất minh bạch và giản dị. Điều gì xảy ra khi bạn quên mật khẩu? Bạn sử dụng email, đúng không? Vì thế, email là danh tính của bạn. Một số người thậm chí đề nghị sử dụng email làm phương thức đăng nhập duy nhất.
* Các dịch vụ mà định danh của người dùng đóng vai trò quan trọng (các thứ liên quan đến tiền bạc, thanh toán chẳng hạn). Thử tưởng tượng một dịch vụ gửi các email thông báo các vấn đề quan trọng đến một email khác (vì bạn nhập đại một email lúc đăng kí và dịch vụ không yêu cầu xác nhận)
* Loại bỏ những người dùng không có ý định nghiêm túc trước khi họ trở thành thành viên của hệ thống
* Tránh spam những người mà email của họ được người khác sử dụng đăng kí dịch vụ (tương tự giống ý 1, nhưng nằm ở một phạm trù khác), và điều gì xảy ra khi người này dùng email chính mình đăng kí vào dịch vụ, họ không thể đăng ký vì email của họ đã tồn tại trong hệ thống.

Đương nhiên là tốt khi có username, nhưng hãy luôn luôn để người dùng có thế đăng nhập bằng địa chỉ email hoặc username. Bởi vì chắc chắn 100% rằng khi người dùng quên mật khẩu, họ sẽ luôn luôn cần tới địa chỉ email để thiết lập lại mật khẩu. Email và mật khẩu là hai khái niệm có quan hệ chặt chẽ, và chúng thuộc về nhau. Luôn luôn là thế!

### Cho người dùng di chuyển giữa Đăng nhập và Đăng kí bất cứ lúc nào
Nhiều website khởi tạo với màn hình Đăng nhập, hiển thị nút Đăng nhập và Đăng kí cạnh nhau. Điều này khiến một vài người dùng bối rối, chẳng phải đăng nhập và đăng kí là hai hành động rất khác nhau?

Hiển thị 2 màn hình Đăng nhập và Đăng ký như là 2 tab, cho phép truy cập một trong hai màn hình bất cứ lúc nào thông qua 2 tab
![](https://images.viblo.asia/7cf456d4-e680-4d90-a247-b5ac27846684.gif)

Hoặc cả hai có thể được truy cập từ bất kì trang nào thông qua hai nút "Login" và "Register" ở góc phải trên đầu trang.
![](https://images.viblo.asia/60aee510-2868-4e48-bdf0-39b5a60a6541.jpg)

### Lựa chọn các từ thông dụng
Mỗi khi người dùng nhấn vào các nút tức là người dùng đang tương tác, gửi thông tin và mong muốn nhận được các phản hồi. Do đó, khi thiết kế các nút nhấn, chúng ta nên lưu ý các điểm sau:

Các nút phải rõ ràng. Thay vì sử dụng một nút Submit chung, thì nên gán tiêu đề cho các nút trên màn hình chính xác những gì người dùng cần thực hiện như: Tạo tài khoản, Đăng nhập, …

Vấn đề với ngôn ngữ (tiếng Anh) là chúng ta có quá nhiều từ cho các khái niệm:
* Sign In
* Log In
* Sign Up
* Register
* Join
* Create Account
* Register
* Get Started
* Subscribe

Đâu là từ "chuẩn"? [Dữ liệu nghiên cứu người dùng cũng không chắc chắn về điều này](https://ux.stackexchange.com/questions/1080/using-sign-in-vs-using-log-in).

![](https://images.viblo.asia/6f810355-fb82-4e3a-8b6b-35dd65a1c6aa.png)

"Sign in" có thể phổ thông hơn một chút, dù "Log In" có [nguồn gốc từ lịch sử hàng hải và máy tính](http://www.designcult.org/2011/08/why-do-we-call-in-logging-in.html) làm cho nó vẫn có giá trị nhất định:

> Cách đây vài năm tôi làm một khảo sát trên các trang web hàng đầu ở US và UK để tìm hiểu xem họ sử dụng "sign in", "log in", "login", "log on" hay các biến thể khác. Kết quả tại thời điểm đó là nếu như bạn tính "log in" và "login" làm một thì số lượng vượt quá "sign in", nhưng không nhiều. Tôi cũng để ý rằng xu hướng sử dụng "sign in" đang tăng lên, đặc biệt là với các địch vụ phổ biến. Tuy nhiên Facebook thì vẫn trung thành với "log in".
![](https://images.viblo.asia/d7ee58fe-e1e3-4c80-a8e9-c90099140bc6.jpg)

### Ghi nhớ dữ liệu đã nhập
Một trong những tính năng hữu ích nhất trong các màn hình Đăng nhập là ghi nhớ dữ liệu mà người dùng đã điền trước đó. Tất cả các màn hình Đăng nhập chúng ta tạo ra nên được kiểm thử với các trình quản lý mật khẩu mặc định  ...
* Internet Explorer
* Chrome
* Firefox
* Safari
* ...
Ít nhất, sau lần đăng nhập đầu tiên, username và mật khẩu nên được điền tự động ở những lần tiếp theo trên cùng trình duyệt.
![](https://images.viblo.asia/5ba9c0dc-4b0d-4e13-960b-7185cd355e9a.gif)

Người dùng dựa trên những trình quản lý mật khẩu có sẵn trong những trình duyệt họ dùng, và bất kỳ một hộp thoại đăng nhập tân tiến nào cũng nên tôn trọng điều này và thiết kế hợp cách. VD: trường mật khẩu nên có `type="password"` trong mã HTML với tên trường mà trình duyệt có thể nhận ra đó là một trường nhập mật khẩu.

### Đừng quên bàn phím
Ở thời điểm hiện nay, tôi cảm thấy những người dùng bàn phím (vật lý) đang dần vắng bóng, nhưng cho những người trong chúng ta vẫn đang dùng và giữ thói quen gõ thật nhanh như dưới đây khi gặp hộp thoại đăng nhập

`name@example.com`, `tab`, `p4$$w0rd`, `enter`

... làm ơn chắc chắn rằng (hộp thoại đăng nhập) vẫn hoạt động phù hợp với thói quen trên. Tab để chuyển trường, Enter để gửi, v.v.

### Giới hạn số lượt trên tất cả mọi thứ
Bạn nên giới hạn số lượt bất cứ việc gì mà người dùng có thể thực hiện, ở bất cứ đâu, và điều đó càng đúng đắn với màn hình Đăng nhập.

Nếu có người quên mật khẩu của mình và cố gắng đăng nhập 3 lần, hay gửi 3 yêu cầu quên mật khẩu, điều này là dễ hiểu. Nhưng sẽ hơi lạ nếu ai đó cố gắng đăng nhập hàng nghìn lần, hoặc gửi hàng ngàn yêu cầu quên mật khẩu. Tại sao, chúng ta có thể phỏng đoán rằng những yêu cầu trên không phải đến từ ... con người.

Trong trường hợp này chúng ta có thể bổ sung thêm chức năng như tạm khóa tài khoản hay cho hiển thị CAPTCHA nếu có quá nhiều lần đăng nhập thất bại, ...

Bạn thấy đấy, màn hình Đăng ký tốt không chỉ đơn giản là thiết kế đẹp mà còn phải mang lại nhiều khách hàng. Để giúp người dùng có những trải nghiệm tốt hơn, người thiết kế cần phải suy nghĩ thật kĩ về các quy trình đăng ký và tâm lý của khách hàng khi sử dụng. Màn hình Đăng ký rất quan trọng và nhiệm vụ của người làm UX là làm sao tăng tính tương tác và giảm thiểu sự từ chối từ khách hàng.
Việc đăng nhập chỉ gồm 1 biểu mẫu đơn giản với 2 trường, 1 liên kết và 2 nút. Nhưng sau khi đọc hết những điều trên, chắc chắn bạn sẽ đồng ý với tôi rằng đây là một vấn đề phức tạp, trái ngược với sự giản đơn bên ngoài.\
Và có lẽ, phương pháp tốt nhất là không xây dựng màn hình Đăng ký, Đăng nhập nào cả, mà dựa trên hệ thống xác thực bên ngoài bất cứ khi nào có thể =))

>  Bài viết đươc tham khảo từ nguồn **[Coding Horror](https://blog.codinghorror.com/the-god-login/)**