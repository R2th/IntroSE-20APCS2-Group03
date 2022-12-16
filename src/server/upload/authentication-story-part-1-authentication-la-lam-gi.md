**!!!WARNING!!!**

Series này chứa đựng nội dung hết sức dài dòng và những suy nghĩ hết sức rối rắm của một lập trình viên giao tiếp kém. Mong quí vị và các bạn hết sức cảnh giác và thận trọng khi đọc.

## First things first

Mình gần đây ngoài việc viết code ra thì còn được sếp ưu ái cho đi phỏng vấn các ứng viên. Khổ một nỗi là mình thì hơi non kinh nghiệm nên thường chả biết hỏi người ta câu gì. Thế rồi trong một lần phỏng vấn ngẫu hứng, mình mới hỏi bạn đối diện:

- Bạn làm cách nào để đăng nhập người dùng vào hệ thống?
- Ơ... thì em cho user nhập username, password rồi đăng nhập thôi ạ.
- Không mình muốn bạn mô tả lại quá trình ấy chi tiết hơn cơ.
- Thì user sẽ nhập username, password, hệ thống sẽ check với db, nếu đúng thì đăng nhập, còn không thì sẽ báo lỗi.
- Ừ nhưng làm cách nào để hệ thống biết là người đó đã đăng nhập?
- ...

Và thế là buổi phỏng vấn dừng rất nhanh sau đó, vì mình nhận ra là ứng viên của mình dù đã đi làm backend mấy năm nhưng lại không thể mô tả lại một quá trình cực kỳ basic của lập trình web, cho dù chỉ là một phương pháp nào đó quen thuộc.

Sau khi nhận ra sự thật ngỡ ngàng ấy, mình tiếp tục hỏi những bạn ứng viên sau cũng chính với câu hỏi này, tuy nhiên không có lần nào nhận được câu trả lời chạm tới tí xíu nào của vấn đề. Sau đây là một số câu trả lời:

- Em dùng passport để đăng nhập người dùng.
- Thế bạn có hiểu passport hoạt động thế nào không?
- ...

Bạn khác

- Em tạo 1 cái form có username/password rồi submit. Server sẽ check và trả về kết quả đã đăng nhập.
- Ừ thế sau đó tại sao trang web lại biết bạn đang đăng nhập?
- Chắc nó có lưu đâu đó.
- ...

Một bạn khác:

- Em không nhớ rõ lắm, vì cái đó framework nó hỗ trợ hết rồi.
- Ừ nhưng bạn cũng nên hiểu nó hoạt động như thế nào chứ?
- À cái đó thì em chưa để ý lắm.

Sau đợt phỏng vấn ấy, mình quyết định sẽ viết cái gì đó này để kiểm tra lại hiểu biết của chính mình cũng như tránh việc nhiều bạn quên mất điều căn bản này khi đi phỏng vấn hay trong công việc.

Để có thể phác họa cho các bạn một bức tranh đầy đủ, toàn cảnh về những kiến thức liên quan tới authentication, mình sẽ chia bài viết ra làm các phần để các bạn đọc đỡ chán:

- **Phần 1: Authentication là làm gì?**
- **Phần 2: Authentication cơ bản**
- **Phần 3: Các phương thức xác thực hay dùng**
- **Phần 4: Best practices**

Series có thể có phần 5, phần 6 nếu mình nghĩ ra cái gì đó để nói thêm =))

## Đối tượng và giới hạn kiến thức

Trong phần 1 này, mình sẽ nói về **bản chất của quá trình xác thực người dùng** với các **ứng dụng web**. Và vì series này dành cho những người làm việc với **Web API**, **Web service**, nên sẽ phù hợp với các đối tượng như **web developer**, **mobile developer**. 

Thứ 2, các bạn cần có nền tảng **kiến thức về web cơ bản**, hiểu được khái niệm **HTTP request** (định nghĩa, cấu trúc, cú pháp). Đây là điều cốt yếu để các bạn hiểu được bản chất của vấn đề, tránh bị những khái niệm rối rắm nhan nhản như OAuth, Token-based, Passwordless,... làm cho quay cuồng.

Nếu bạn chưa trang bị cho mình những kiến thức trên, mình đề nghị bạn nên đọc trước khi tiếp tục với bài viết này. Còn nếu đã có, thì hãy tiếp tục dấn thân vào cuộc phiêu lưu tưởng chừng đơn giản mà vô cùng rắc rối này.

## Authentication là gì?

Thể theo định nghĩa của wikipedia, *một trang web rất nổi tiếng và cũng chả cần lời ghi chú dài dòng thừa thãi này*:

> Xác thực (**authentication**) là một hành động nhằm thiết lập hoặc chứng thực một cái gì đó (hoặc một người nào đó) đáng tin cậy, có nghĩa là, những lời khai báo do người đó đưa ra hoặc về vật đó là sự thật.

Quả là một định nghĩa không những rộng lớn mà còn mang tính bao quát nhiều mặt của vấn đề. Một kinh nghiệm rất lớn khi các bạn tiếp cận khái niệm nào đó chính là đưa nó về một ngữ cảnh cụ thể. Cái định nghĩa authentication mà wikipedia đưa ra nó bao hàm rất nhiều thứ, và khi áp dụng vào mỗi hoàn cảnh cụ thể nó lại có một ý nghĩa khác nhau. 

Ví dụ cùng là authentication trong ứng dụng web thì nó có thể xuất hiện ở các lớp nghĩa khác nhau:

- VD1: Việc server xác thực **yêu cầu** do đúng là từ client của người dùng gửi lên hay không cũng là authentication.
- VD2: Việc server xác thực **nội dung yêu cầu** do đúng từ người dùng A gửi lên hay không cũng là authentication.

Với 2 lớp nghĩa này, các bạn có thể tưởng tượng như ở VD1 là xác thực **cái phong bì**, kiểm tra tem thư, địa chỉ gửi xem có đúng là từ thôn cành lá xã cành cây huyện trời mây gửi đến hay không, rồi thì phong bì có bị bóc hay chưa, còn niêm phong không. Còn VD2 là xác thực **nội dung thư**, kiểm tra chữ ký xem có đúng là của anh Khá từ trại không,...

Tuy nhiên, việc kiểm tra **cái phong bì** thường là việc của một bộ phận dev khác, liên quan tới hệ thống nhiều hơn, do vậy mình sẽ không đề cập nhiều tới trong bài viết này. Các bạn chỉ cần hiểu được nó là quá trình gì thôi là được. Từ đây về sau khi mình nhắc tới **authentication** tức là sẽ nhắc tới việc **xác thực người dùng** ở cấp ứng dụng, hay chính là cái **thư được gửi từ ai** nhé.

## Bản chất của authentication?

Vậy thì chúng ta làm sao biết được thư này được gửi đến từ anh Khá mà không phải từ một thằng ất ơ nào mạo danh? Chúng ta cũng đều biết Website, Web service được tạo nên từ các **HTTP request**. 

> Ví dụ bạn vào trang web facebook.com. Đầu tiên trình duyệt gọi 1 HTTP request tới facebook.com để lấy nội dung HTML. Sau đó lại gọi nhiều HTTP request tới lấy nội dung JS, css, ảnh,... rồi lại gọi nhiều HTTP request để lấy danh sách bạn bè, bài đăng,... Có tất cả những thông tin này, trình duyệt mới hiển thị cho bạn được trang facebook với rất nhiều nội dung và tương tác như thế.

Tuy nhiên, về cơ bản thì **HTTP request là một stateless protocol** (HTTP2 có stateful component nhưng cơ bản HTTP vẫn là stateless). **Stateless** nghĩa là sao? Tức là server xử lý các request một cách **độc lập, không phụ thuộc vào trạng thái hay kết quả của request trước**.

> Stateless/stateful là tính chất mang tính tương đối. Dưới góc độ protocol thì HTTP là stateless, tuy nhiên dưới góc độ application thì ta đang cố làm nó trở thành stateful.

Cái này cũng giống như 2 người thư từ với nhau, mỗi lá thư là **độc lập**. Lá thư đầu tiên gửi từ địa chỉ A mình tin là của anh Khá, nhưng lá thư thứ 2 cũng từ địa chỉ A gửi tới thì mình chưa chắc đã tin và lại phải xác nhận lại.

![Authentication phần 1](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/fq28pddcuf_Authentication-1.png)

Vì thế bản chất của authentication ở đây chính là việc bạn xác nhận **HTTP request** được gửi từ **một người nào đó**. 

![Authentication phần 1](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/uacfiyvr11_http%20%282%29.png)

## Authentication được thực hiện như thế nào?

Các bạn đã hiểu bản chất của authentication rồi, vậy thì nó sẽ được thực hiện như thế nào?

Đối với một bức thư, cách để bạn biết thư được gửi đúng từ một người nào đó là **chữ ký**, **nét chữ**,... hay bất kể một **dấu hiệu** nào đó được **thống nhất** từ trước giữa 2 người.

Quay trở lại với một **HTTP request**. Bản chất của HTTP request cũng là một bản tin biểu diễn bằng text. Do đó cũng sẽ cần một **dấu hiệu** nào đó được **thống nhất** để ứng dụng của chúng ta nhận ra nó xuất phát từ người dùng nào. 

- Một dấu hiệu nhận biết người dùng có thể là bất kỳ thứ gì mang tính đặc trưng, như **tên đăng nhập**, **mật khẩu**, **một chuôĩ chứa thông tin được mã hóa**, hay thậm chí là **một chuỗi ký tự random**.
- Dấu hiệu nhận biết người dùng có thể ở bất kỳ vị trí nào có thể trong bản tin HTTP như: **URL**, **Header** (Cookie header, Authorization header, Custom header), **Body** (Form field,...)

![Các vị trí authentication](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/8pt7zbtoka_untitled.png)

> Minh họa sử dụng **1 trong các vị trí trên**.

## Quá trình authentication

Để có được dấu hiệu nhận dạng phía trên, ta cần có **sự thống nhất** trước giữa người dùng và ứng dụng để ứng dụng của chúng ta có thể nhận dạng được người dùng. Một quá trình authentication sẽ bao gồm 3 phần:

- **Sinh ra dấu hiệu:** Đây là việc chúng ta quyết định xem **dùng dấu hiệu gì**, tạo ra dấu hiệu đó như thế nào. Một quá trình authentication có thể có sự xuất hiện của nhiều dấu hiệu, ví dụ username/password, user token, api key,... Các dấu hiệu này sẽ có cách sinh ra khác nhau, quy ước sử dụng khác nhau.
- **Lưu trữ dấu hiệu:** Đây là việc ứng dụng sẽ quyết định lưu trữ dấu hiệu này ở đâu, ở cả server và client, thông qua vị trí nào trên bản tin HTTP,...
- **Kiểm tra dấu hiệu:** Đây là việc ứng dụng của chúng ta kiểm tra lại tính hợp lệ của dấu hiệu, đối chiếu xem dấu hiệu này là của người dùng nào,...

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/d7ztcnu779_http%20%282%29%20%281%29.png)

Phía trên ảnh là ví dụ quá trình authentication, trong đó mỗi request tùy thuộc vào thông tin đầu vào sẽ được xử lý qua 1 hoặc nhiều phần của quá trình authentication.

## Tổng kết

Trên đây chính là những khái niệm cơ bản nhất về authentication. Cho dù là bạn dùng Basic Authentication, Single Sign-on, OAuth 2.0, Social Sign-in,... hay là phương thức nào đi chăng nữa thì chung quy lại cũng đều là làm việc sau: 

**Xác thực một HTTP request bằng một dấu hiệu nào đó**. 

Còn việc xuất hiện ra những phương pháp xác thực phía trên nó chỉ là ở 3 việc:

- **Tạo ra dấu hiệu gì**
- **Lưu trữ dấu hiệu ở đâu** 
- **Kiểm tra dấu hiệu thế nào** 

Nắm được điểm cơ bản này, mình tin các bạn sẽ tiếp cận với tất cả các hình thức authentication dưới một cái nhìn khác mang tính hệ thống hơn.

Hẹn gặp lại các bạn trong **Phần 2: Authentication cơ bản**, nơi mình sẽ nói kỹ hơn về các phương thức xác thực người dùng cơ bản.