# Javascript Injection là cái gì

Javascript là một trong những công nghệ phổ biến nhất và ngôn ngữ này được sử dụng rộng rãi cho các trang web (phía người dùng ) cũng như phía máy chủ (với Nodejs) và ứng dụng web.

Javascript có thể được sử dụng để thực hiện các chức năng trên các trình duyệt khác nhau. Tuy nhiên, công nghệ này có thể mang đến một số vấn đề về bảo mật mà lập trình viên và người kiểm thử cần phải nắm rõ.

Javascript không chỉ được sử dụng cho mục đích tốt mà còn được sử dụng như  một công cụ tấn công nguy hiểm. Một trong số đó là Javascript Injection. Bản chất của JS Injection là tiêm mã Javascript, điều này sẽ được chạy từ phía máy khách .

*Trong hướng dẫn này, chúng ta sẽ tìm hiểu thêm về cách kiểm tra xem Javascript Injection có thể thực hiện được không, cách JS Injection có thể được thực hiện như thế nào và các hậu quả mà JS Injection có thể mang lại là gì.*

![](https://images.viblo.asia/6be5cb04-f222-43cb-966f-de7c3b0b7ad4.jpg)

# Nguy cơ rủi ro của JavaScript Injection
JS Injection mang đến nhiều khả năng sửa đổi thiết kế của trang web của người dùng, lấy thông tin của trang web, thay đổi thông tin của trang web được hiển thị và thao tác với các tham số (ví dụ: cookie). Do đó điều này có thể mang lại một số thiệt hại nghiêm trọng cho trang web, rò rỉ thông tin và thậm chí có thể bị hack.

Mục đích chính của JS Injection là thay đổi giao diện của trang web và kiểm soát các tham số. Hậu quả của JS Injection có thể rất khác nhau - từ việc phá hoại thiết kế của trang web để truy cập tài khoản của người khác.

# Tại sao kiểm thử  JS Injection lại quan trọng?
Nhiều người sẽ hỏi kiểm thử nghiệm JS Injection có thực sự cần thiết.

Kiểm tra lỗ hổng JS Injection là một phần của kiểm thử bảo mật. Kiểm thử bảo mật thường chỉ được thực hiện nếu nó được đưa vào kế hoạch dự án, vì nó đòi hỏi thời gian, rất nhiều sự chú ý và kiểm thử nhiều chi tiết.

Trong suốt quá trình thực hiện dự án, việc bỏ qua kiểm thử đối với bất kỳ cuộc tấn công nào có thể xảy ra khá phổ biến - kể cả JS Injection. Bằng cách này, các đội cố gắng tiết kiệm thời gian của dự án. Tuy nhiên, hành động này thường kết thúc với các khiếu nại của khách hàng.

Nên biết rằng, kiểm thử bảo mật được khuyến khích cao ngay cả khi nó không được đưa vào kế hoạch dự án. Kiểm tra các cuộc tấn công chính có thể được thực hiện - đồng thời phải kiểm tra các lỗ hổng JS Injection có thể xảy ra.

Việc loại bỏ các lỗ hổng Javascript Injection đơn giản trong sản phẩm có thể làm tăng chất lượng sản phẩm và danh tiếng của công ty. Bất cứ khi nào chúng ta cũng nên học để  kiểm thử chống lại các cuộc tấn công và trong kiểm thử bảo mật, chúng ta không bao giờ bỏ qua phần này của kiểm thử . Bằng cách này, chúng ta có thể chắc chắn hơn về chất lượng của sản phẩm.

# So sánh với các cuộc tấn công khác
Cần lưu ý rằng JS Injection không nguy hiểm như SQL Injection, vì nó được thực hiện ở phía máy khách và nó không đạt được cơ sở dữ liệu của hệ thống khi nó xảy ra trong khi tấn công SQL Injection. Ngoài ra, nó không phải là nguy hiểm như tấn công XSS.

Trong cuộc tấn công này vào những thời điểm, chỉ giao diện của website có thể được thay đổi, trong khi mục đích chính của tấn công XSS là để hack dữ liệu đăng nhập của người khác.

Tuy nhiên, JS Injection cũng có thể gây ra một số thiệt hại nghiêm trọng cho trang web. Nó không chỉ có thể phá hủy diện mạo của trang web mà còn có thể trở thành cơ sở tốt để lấy cắp dữ liệu đăng nhập của người khác.

# Kiểm tra việc JavaScript Injection
Khi bạn bắt đầu kiểm thử với JS Injection, điều đầu tiên bạn nên làm là kiểm tra xem JS Injection có khả thi hay không. Việc kiểm tra JS injection này rất dễ dàng - khi điều hướng đến trang web, bạn phải nhập vào mã vạch địa chỉ của trình duyệt như 

`javascript:alert(‘Executed!’);`

![](https://images.viblo.asia/0663b6ea-44ad-43a2-821b-e64d6ffccbc7.jpg)

Nếu  xuất hiện cửa sổ bật lên có thông báo 'Đã thực thi!' thì trang web dễ bị tấn công bởi JS Injection.
![](https://images.viblo.asia/bca4d3d3-47cf-451e-8a16-155660952637.jpg)

Sau đó, trong thanh địa chỉ của trang web, bạn có thể thử các lệnh Javascript khác nhau.

Cần lưu ý rằng JS Injection không chỉ có thể từ thanh địa chỉ của trang web. Có nhiều yếu tố khác nhau của trang web, có thể dễ bị tấn công bởi JS Injection. Điều quan trọng nhất là biết chính xác các phần của trang web có thể bị ảnh hưởng bởi Javascript Injection và cách kiểm tra nó.

Các mục tiêu JS Injection điển hình là:

* Các diễn đàn khác nhau
* Các trường nhận xét của bài viết
* Sổ khách
* Bất kỳ biểu mẫu nào khác có thể chèn văn bản vào.
          
Để kiểm tra xem cuộc tấn công này có thể cho mẫu lưu văn bản hay không, mặc dù cung cấp văn bản bình thường, hãy nhập mã Javascript như được đề cập bên dưới và lưu văn bản trong biểu mẫu và làm mới trang.


`javascript: alert (‘Executed!’);`

Nếu trong trang mới mở bao gồm một hộp văn bản có thông báo 'Đã thực thi!', Thì loại tấn công JS injection này có thể xảy ra đối với biểu mẫu được kiểm tra.

Nếu trong cả hai cách, một hộp văn bản với thông báo xuất hiện, bạn có thể thử phá vỡ trang web bằng các phương pháp JS Injection phức tạp hơn. Sau đó, bạn có thể thử các loại **Injection** khác  - sửa đổi thông số hoặc sửa đổi thiết kế.

Tất nhiên, các thông số sửa đổi được coi là một rủi ro hơn là sửa đổi thiết kế. Vì vậy, trong khi kiểm thử  nên được dành nhiều sự chú ý cho các thông số sửa đổi.

Ngoài ra, cần lưu ý rằng các phần của trang web dễ bị tấn công hơn đối với Javascript Injection là các trường nhập, nơi mọi loại dữ liệu được lưu lại.
# Sửa đổi thông số

Như đã đề cập trước đó, một trong những lỗi có thể của Javascript Injection là sửa đổi các tham số.

Trong lỗi này, người dùng có thể tấn công bằng cách lấy thông hoặc giá trị thông số gửi lên máy chủ. Điều này có thể gấy ra một số rủi ro cao gây lộ thông ting người dùng và hành động này thường được sử dụng một số lệnh sau

Hãy nhớ rằng, lệnh Javascript trả về cookie phiên hiện tại được viết tương ứng:

`javascript: alert(document.cookie);`

Được nhập vào thanh URL của trình duyệt, nó sẽ trả lại một cửa sổ bật lên với các cookie phiên hiện tại.

![](https://images.viblo.asia/d7c5493e-ec95-4cce-b088-f29c9991123e.jpg)


Nếu trang web đang sử dụng cookie, chúng ta có thể đọc thông tin như  session id  làm việc của máy chủ hoặc dữ liệu người dùng khác được lưu trữ trong cookie.

Ví dụ: nếu chúng ta đã tìm thấy trang web dễ bị tấn công, lưu trữ id session trong thông số cookie ‘session_id’. Sau đó, chúng ta có thể viết một hàm, thay đổi id phiên hiện tại:

`javascript:void(document.cookie=“session_id=<<other session id>>“);`

Bằng cách này, giá trị id session sẽ được thay đổi. Ngoài ra, bất kỳ cách nào khác để thay đổi thông số cũng có thể.

Ví dụ: người dùng độc hại muốn đăng nhập với tư cách người khác. Để thực hiện đăng nhập, trước tiên người dùng độc hại sẽ thay đổi cài đặt cookie ủy quyền thành true. Nếu cài đặt cookie không được đặt là "true", thì giá trị cookie có thể được trả về là "không xác định".

Để thay đổi các giá trị cookie đó, người dùng độc hại sẽ thực hiện theo lệnh Javascript từ thanh URL trong trình duyệt:

`javascript:void(document.cookie="authorization=true");`

![](https://images.viblo.asia/45ca2103-3192-49b9-9a4a-f9e8c6edcd90.jpg)

Trong kết quả, thông số cookie hiện tại authorization = false sẽ được thay đổi thành authorization = true. Bằng cách này, một người dùng sẽ có thể truy cập vào nội dung nhạy cảm của hệ thống.

Ngoài ra, nó phải được đề cập, đôi khi mã Javascript trả về thông tin khá nhạy cảm.

`javascript:alert(document.cookie);`

Ví dụ: nếu nhà phát triển của trang web không đủ thận trọng, nhà phát triển cũng có thể trả về tên và giá trị thông số tên người dùng và mật khẩu. Sau đó, thông tin đó có thể được sử dụng để truy cập trang web hoặc chỉ thay đổi giá trị của thông số nhạy cảm.

Ví dụ: Với đoạn mã dưới đây chúng ta có thể thay đổi giá trị tên người dùng:

`javascript:void(document.cookie=”username=otherUser”);`

Bằng cách này, bất kỳ giá trị thông số nào khác cũng có thể được sửa đổi

### Thay đổi thiết kế của trang web

Javascript cũng có thể được sử dụng để sửa đổi bất kỳ thành phần nào của trang web và nói chung thiết kế của trang web.

Ví dụ: với Javascript, bạn có thể thay đổi bất kỳ thông tin nào được hiển thị trên trang web

 + Văn bản được hiển thị.
 + Nền của trang web.
 + Form của trang web.
 + Cửa sổ bật lên.
 + Bất kỳ sự xuất hiện của phần tử trang web khác.

Ví dụ: Để thay đổi địa chỉ email được hiển thị trên trang web, lệnh Javascript thích hợp sẽ được sử dụng:

`javascript:void(document.forms[0].email.value=”test@test.com”);`

Rất ít thao tác phức tạp khác với thiết kế của trang web cũng có thể. Với cách tấn công này, chúng tôi cũng có thể truy cập và thay đổi lớp CSS của trang web.

Ví dụ: nếu chúng tôi muốn thay đổi hình nền của trang web bằng JS Injection, thì lệnh sẽ được chạy tương ứng:

`javascript:void(document.background-image: url(“other-image.jpg“);`

Ngoài ra, một người dùng độc hại có thể viết mã Javascript Injection được đề cập dưới đây trong form văn bản và lưu nó.

### Làm thế nào để phòng tránh JavaScript Injection

Nó có thể được kiểm tra theo các cách sau:

+ Thủ công
+ Với công cụ kiểm tra
+ Với plugin trình duyệt

Các lỗ hổng Javascript có thể có thể được kiểm tra thủ công nếu bạn có kiến thức tốt về cách thực hiện nó. Ngoài ra, nó có thể được thử nghiệm với các công cụ tự động hóa khác nhau.

Ví dụ: nếu bạn đã sử dụng automation test  ở cấp API bằng công cụ SOAP UI, thì bạn cũng có thể chạy thử nghiệm Javascript Injection với giao diện người dùng SOAP.

Tuy nhiên, tôi chỉ có thể nhận xét từ kinh nghiệm của riêng tôi, rằng bạn nên có kiến thức tốt về công cụ SOAP UI để kiểm tra với JS Injection, vì tất cả các bước kiểm tra nên được viết mà không có lỗi. Nếu bất kỳ bước kiểm tra nào được viết không chính xác, nó cũng có thể gây ra kết quả kiểm thử bảo mật sai.

Ngoài ra, bạn có thể tìm thấy các plugin của trình duyệt khác nhau để kiểm tra khả năng tấn công có thể xảy ra. Tuy nhiên, chúng tôi khuyên bạn không nên quên kiểm tra cuộc tấn công này theo cách thủ công vì nó thường trả về kết quả chính xác hơn.

Tôi muốn nói rằng việc thử nghiệm thủ công với Javascript Injection khiến tôi cảm thấy tự tin hơn và yên tâm hơn về bảo mật của trang web. Bằng cách này bạn có thể chắc chắn rằng không có form nào bị bỏ qua khi kiểm tra và tất cả các kết quả đều hiển thị cho bạn.

Để thử nghiệm chống lại Javascript Injection, bạn nên có kiến thức chung về Javascript và phải biết phần nào của trang web dễ bị tấn công hơn. Ngoài ra, bạn nên nhớ rằng trang web có thể được bảo vệ chống lại JS Injection và trong khi thử nghiệm, bạn nên cố gắng phá vỡ sự bảo vệ này.

Bằng các cách này bạn sẽ chắc chắn nếu cách phòng các cuộc tấn công này là đủ mạnh hay không.

### Chống lại các cuộc tấn công

Thứ nhất, để ngăn chặn cuộc tấn công này, mọi đầu vào nhận được phải được xác thực. Đầu vào phải được xác thực mỗi lần và không chỉ khi dữ liệu ban đầu được chấp nhận.

Nó rất khuyến khích không dựa vào xác nhận phía khách hàng. Ngoài ra, nó được khuyến khích để thực hiện một logic quan trọng ở phía máy chủ.

Ví dụ:  Bếu bạn sẽ viết vào trường comment bất cứ điều gì với dấu ngoặc kép <script>… <script />, các dấu ngoặc kép đó sẽ được thay thế bằng double - << script >>… << / script >>. Bằng cách này, mã Javascript đã nhập sẽ không được thực thi.
    
 Chúng ta có thể  nhận thấy rằng việc thay thế dấu ngoặc kép bằng dấu ngoặc kép là một thực tế khá phổ biến để tránh các cuộc tấn công JS Injection có thể xảy ra. Tuy nhiên, có một vài cách để mã hóa các dấu ngoặc kép để làm cho mã JS Injection được thực hiện. Do đó việc thay đổi dấu ngoặc kép không phải là cách hoàn hảo để bảo vệ chống lại cuộc tấn công này.
 
 ### Kết Luận
 
 Cần lưu ý rằng Javascript Injection là một trong những cuộc tấn công có thể xảy ra đối với các trang web, vì Javascript là một trong những công nghệ được sử dụng rộng rãi nhất cho các trang web. Vì vậy, trong khi thử nghiệm các trang web hoặc bất kỳ công nghệ web nào khác, nó không nên bị quên để kiểm tra chống lại cuộc tấn công này.
 
 Khi thực hiện kiểm tra bảo mật, JS Injection không nên bị quên. Một số người xem xét thử nghiệm này như là một cuộc tấn công ít nguy hiểm hơn vì nó được thực hiện ở phía khách hàng.
 
 Tuy nhiên, đó là cách tiếp cận sai và chúng ta nên luôn nhớ rằng Javascript Injection có thể gây ra thiệt hại nghiêm trọng cho trang web như rò rỉ thông tin nhạy cảm, các thông số thay đổi hoặc hack tài khoản người dùng
 
 Do đó, chúng ta nên coi đây là một phần quan trọng của thử nghiệm và nó là một phần của đầu tư cho sản phẩm.
 
Kiểm thử JS Injection không phải là quá khó khăn. Thứ nhất, bạn nên có kiến thức chung về Javascript và phải biết cách kiểm tra xem cuộc tấn công này có khả thi cho giải pháp web hiện tại hay không.
 
 Ngoài ra trong khi thử nghiệm bạn nên nhớ, rằng một trang web có thể có sự bảo vệ chống lại kiểu tấn công này, nhưng nó có thể quá yếu - nó cũng nên được kiểm tra. Một điều quan trọng cần nhớ là có nhiều loại tấn công Javascript Injection khác nhau và không ai trong số chúng bị quên để kiểm tra.
 
 Nguồn dịch: https://www.softwaretestinghelp.com/javascript-injection-tutorial/