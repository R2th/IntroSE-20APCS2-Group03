## Javascript Injection là gì?

Javascript là một trong những công nghệ phổ biến nhất và được sử dụng rộng rãi nhất cho các trang web và ứng dụng web.
Nó có thể được sử dụng để thực hiện các chức năng khác nhau trên web. Tuy nhiên, công nghệ này có thể mang lại một số vấn đề về bảo mật mà nhà phát triển và người kiểm tra cần phải lưu ý.

Javascript không chỉ được sử dụng cho mục đích tốt mà còn được sử dụng trong một số cuộc tấn công nguy hiểm . Một trong số đó là Javascript Injection. Bản chất của JS Injection là tiêm mã Javascript vào phía máy khách, nó sẽ được chạy từ phía máy khách.

Để thực thi bất kỳ javascript nào trong phiên hiện tại, người dùng sẽ nhập các lệnh javascript cụ thể trong thanh url của trình duyệt trừ đi http: //. Tất cả các lệnh javascript phải bắt đầu bằng thẻ javascript: theo sau là bất kỳ lệnh javascript nào sẽ được thực thi. Tất cả javascript được kết thúc bằng a; để người dùng có thể nhập nhiều lệnh javascript, miễn là mỗi lệnh kết thúc bằng;

![](https://images.viblo.asia/79744462-f2d8-4bc0-9aab-32047a2a119b.jpg)

## Rủi ro của JavaScript Injection

JS Injection làm cho kẻ xâm nhập có thể sửa đổi thiết kế của trang web, lấy thông tin của trang web, thay đổi thông tin của trang web được hiển thị và thao tác với các tham số (ví dụ: cookie). Do đó điều này có thể mang lại một số thiệt hại nghiêm trọng cho trang web, rò rỉ thông tin.

Mục đích chính của JS Injection là thay đổi giao diện của trang web và can thiệp vào những thông số của hệ thống. Hậu quả của JS Injection có thể rất khác, từ việc phá hoại thiết kế của trang web để truy cập vào tài khoản của người khác.

## Tại sao việc kiểm thử JS Injection là quan trọng?

Nhiều người sẽ hỏi nếu kiểm thử cho JS Injection là thực sự cần thiết?
Kiểm tra lỗ hổng JS Injection là một phần của kiểm tra bảo mật. Kiểm tra bảo mật thường chỉ được thực hiện nếu nó được đưa vào kế hoạch của dự án phát triển phần mềm, vì nó đòi hỏi thời gian, rất nhiều sự chú ý và kiểm tra nhiều chi tiết.

Trong quá trình thực hiện dự án, team thường tiết kiệm thời gian của dự án bằng việc bỏ qua quá trình kiểm thử, kể cả JS Injection. Tuy nhiên, kết quả sản phẩm phần mềm sau khi release sẽ phải nhận rất nhiều khiếu nại của khách hàng.
Nên biết rằng, kiểm tra bảo mật được khuyến khích ngay cả khi nó không được đưa vào kế hoạch dự án. Kiểm tra các cuộc tấn công mạng có thể xảy ra- đồng thời phải kiểm tra các lỗ hổng JS Injection có thể xảy ra.

Việc khắc phục và hạn chế các lỗ hổng Javascript Injection trong sản phẩm có thể làm tăng chất lượng sản phẩm và danh tiếng của công ty.

## So sánh với các cuộc tấn công khác

Cần lưu ý rằng JS Injection không nguy hiểm như SQL Injection, vì nó được thực hiện ở phía máy khách và nó không chiếm được cơ sở dữ liệu của hệ thống như khi nó xảy ra trong khi tấn công SQL Injection. Ngoài ra, nó không phải là nguy hiểm như tấn công XSS.

Trong cuộc tấn công này, chỉ xảy ra việc thay đổi giao diện trên trang web vào những thời điểm bị tấn công, trong khi mục đích chính của tấn công XSS là để hack dữ liệu đăng nhập của người khác.

Tuy nhiên, JS Injection cũng có thể gây ra một số thiệt hại nghiêm trọng cho trang web. Nó không chỉ có thể phá hủy giao diện của trang web mà còn có thể trở thành cơ sở tốt để lấy cắp dữ liệu đăng nhập của người khác.

## Kiểm tra Javascript Injection

Khi bạn bắt đầu kiểm thử với JS Injection, điều đầu tiên bạn nên làm là kiểm tra xem JS Injection có khả thi hay không. Việc kiểm tra rất dễ dàng. Khi điều hướng đến trang web, bạn nhập vào địa chỉ của trình duyệt như sau:

***javascript:alert(‘Executed!’);***
![](https://images.viblo.asia/c5d84609-b384-4024-832a-50b28d245585.jpg)


Nếu cửa sổ bật lên có thông báo 'Executed!' Xuất hiện thì trang web dễ bị tấn công bởi JS Injection.
Sau đó, trong thanh địa chỉ của trang web, bạn có thể thử các lệnh Javascript khác nhau.

Cần lưu ý rằng JS Injection không chỉ bị khai khác từ thanh địa chỉ của trang web. Có nhiều yếu tố khác nhau của trang web  có thể dễ bị tấn công bởi JS Injection. Điều quan trọng nhất là biết chính xác các phần của trang web có thể bị ảnh hưởng bởi Javascript Injection và cách kiểm tra nó.

***Các mục tiêu JS Injection điển hình là:***

* Diễn đàn
* Bình luận bài viết
* Sổ khách
* Bất kỳ biểu mẫu nào khác có thể chèn văn bản vào.


Để kiểm tra xem cuộc tấn công này có thể cho mẫu lưu văn bản hay không, hãy nhập mã Javascript như được đề cập bên dưới và lưu văn bản trong biểu mẫu và làm mới trang.

**javascript:alert(‘Executed!’);**

Nếu trong trang mới mở bao gồm một hộp văn bản có thông báo 'Executed!', Thì loại tấn công này có thể xảy ra đối với biểu mẫu được kiểm tra.
Tất nhiên, việc sử đổi các thông số được coi là một rủi ro hơn là sửa đổi thiết kế. Vì vậy, trong khi kiểm thử nên chú ý nhiều hơn cho trường hợp các thông số có thể sẽ bị sửa đổi.

Ngoài ra, cần lưu ý rằng các phần của trang web dễ bị tấn công hơn đối với Javascript Injection là các trường nhập, nơi mọi loại dữ liệu được lưu.



## Sửa đổi thông số

Như đã đề cập trước đó, một trong những thiệt hại có thể của Javascript Injection là sửa đổi các thông số.
Trong lần này, kẻ xâm nhập có thể lấy thông tin thông số hoặc thay đổi bất kỳ giá trị thông số nào (Ví dụ, cài đặt cookie). Điều này có thể gây ra rủi ro khá nghiêm trọng khi kẻ xâm nhập có thể có được nội dung nhạy cảm. Loại tấn công như vậy có thể được thực hiện bằng cách sử dụng một số lệnh Javascript.

Hãy nhớ rằng, lệnh Javascript trả về cookie phiên hiện tại được viết bên dưới:

***javascript: alert(document.cookie);***

Được nhập vào thanh URL của trình duyệt, nó sẽ trả lại một cửa sổ bật lên với các cookie phiên hiện tại.
![](https://images.viblo.asia/c7ad4a83-43fc-4903-8404-71eb75d6a46f.jpg)

Nếu trang web đang sử dụng cookie, bạn có thể đọc thông tin như id phiên máy chủ hoặc dữ liệu người dùng khác được lưu trữ trong cookie.

***Ví dụ:*** nếu bạn đã tìm thấy trang web dễ bị tấn công, lưu trữ id phiên trong thông số cookie ‘session_id’. Sau đó, bạn có thể viết một hàm, thay đổi id phiên hiện tại:

***javascript:void(document.cookie=“sessionid=<<other session id>>“);***

Bằng cách này, giá trị id phiên sẽ được thay đổi. Ngoài ra, bất kỳ cách nào khác để thay đổi thông số cũng có thể.

***Ví dụ:*** kẻ xâm nhập muốn đăng nhập với tư cách người khác. Để thực hiện đăng nhập, trước tiên kẻ xâm nhập sẽ thay đổi cài đặt cookie ủy quyền thành true. Nếu cài đặt cookie không được đặt là "true", thì giá trị cookie có thể được trả về là "không xác định".


Để thay đổi các giá trị cookie đó, kẻ xâm nhập sẽ thực hiện theo lệnh Javascript từ thanh URL trong trình duyệt:

***javascript:void(document.cookie=“authorization=true“);***

![](https://images.viblo.asia/41869160-72eb-474c-ad5e-ec9d4d8b8d57.jpg)

Trong kết quả, thông số cookie hiện tại authorization = false sẽ được thay đổi thành authorization = true. Bằng cách này, kẻ xâm nhập sẽ có thể truy cập vào nội dung nhạy cảm.

Ngoài ra, đôi khi mã Javascript trả về thông tin khá nhạy cảm.

***javascript:alert(document.cookie);***

***Ví dụ:*** nếu nhà phát triển của trang web không có kinh nghiệm về bảo mật có thể trả về tên và giá trị thông số tên người dùng và mật khẩu. Sau đó, thông tin đó có thể được sử dụng để truy cập trang web hoặc chỉ thay đổi giá trị của thông số.

Ví dụ:   với đoạn mã dưới đây chúng ta có thể thay đổi giá trị tên người dùng:

***javascript:void(document.cookie=”username=otherUser”);***

Bằng cách này, bất kỳ giá trị thông số nào khác cũng có thể được sửa đổi.



## **Sửa đổi thiết kế của trang web**

Javascript cũng có thể được sử dụng để sửa đổi bất kỳ biểu mẫu nào của trang web và nói chung thiết kế của trang web.

***Ví dụ:*** với Javascript, bạn có thể thay đổi bất kỳ thông tin nào được hiển thị trên trang web:

* Văn bản được hiển thị.
* Nền của trang web.
* Giao diện của trang web.
* Cửa sổ bật lên (Popup).

***Ví dụ:***      để thay đổi địa chỉ email được hiển thị trên trang web:

***javascript:void(document.forms[0].email.value=”test@test.com”);***

![](https://images.viblo.asia/07a4cc74-ba03-441d-8a8e-a8ffe388ff2c.jpg)

***Ví dụ:***  nếu muốn thay đổi hình nền của trang web bằng JS Injection, thì lệnh sẽ được chạy tương ứng:

***javascript:void(document.background-image: url(“other-image.jpg“);***
![](https://images.viblo.asia/93a817c8-7608-495d-98cd-06fd63375e35.jpg)

Ngoài ra, một kẻ xâm nhập có thể viết mã Javascript Injection được đề cập dưới đây trong biểu mẫu chèn văn bản và lưu nó.

***javascript: void (alert („Hello!“));***

Sau đó, mỗi khi một trang được mở ra, một hộp thoại văn bản có thông báo “Hello!” Sẽ xuất hiện.

Thay đổi thiết kế của trang web bằng Javascript Injection ít rủi ro hơn so với sửa đổi thông số. Tuy nhiên, nếu thiết kế của trang web sẽ bị thay đổi thì nó có thể làm mất uy tín của công ty.



## Cách kiểm tra chống lại JavaScript Injection

Nó có thể được kiểm tra theo các cách sau:

* Thủ công
* Với công cụ kiểm tra
* Với plugin trình duyệt


Các lỗ hổng Javascript có thể có thể được kiểm tra thủ công nếu bạn có kiến ​​thức tốt về cách thực hiện nó. Ngoài ra, nó có thể được kiểm thử với các công cụ tự động hóa khác nhau.

***Ví dụ:*** nếu bạn đã tự động kiểm tra ở level API bằng công cụ SOAP UI, thì bạn cũng có thể chạy kiểm thử Javascript Injection với giao diện người dùng SOAP.


Ngoài ra, bạn có thể tìm thấy các plugin của trình duyệt khác nhau để kiểm tra khả năng tấn công có thể xảy ra. Tuy nhiên, bạn không nên quên kiểm tra theo cách thủ công vì nó thường trả về kết quả chính xác hơn.

Việc kiểm thử thủ công với Javascript Injection sẽ tốt hơn về bảo mật của trang web. Bằng cách này bạn có thể chắc chắn rằng không có biểu mẫu nào bị bỏ qua khi kiểm tra và tất cả các kết quả đều hiển thị cho bạn.


## Có thể bảo vệ, chống lại cuộc tấn công này


Thứ nhất, để ngăn chặn cuộc tấn công này, mọi đầu vào nhận được phải được xác thực. Đầu vào phải được xác thực mỗi lần, không chỉ thực hiện xác nhận phía khách hang mà cần thực hiện xác nhận cả ở phía máy chủ.

Nhiều người cố gắng chống lại Javascript Injection bằng cách thêm dấu “<” vào thẻ script nhưng không nên được thực hiện theo cách đó.

***Ví dụ:***  bình thường bạn viết **<script>…</script>** thì đổi thành **<< script >>… << / script >>**.
Bằng cách này, mã Javascript đã nhập sẽ không được thực thi.

Việc thay thế dấu ngoặc ở trên là một thực tế khá phổ biến để tránh các cuộc tấn công JS Injection có thể xảy ra. Tuy nhiên, có một vài cách để mã hóa các dấu ngoặc kép để làm cho mã JS Injection được thực hiện. Do đó việc thay đổi dấu ngoặc không phải là cách hoàn hảo để bảo vệ chống lại cuộc tấn công này.

## Kết luận

Cần lưu ý rằng Javascript Injection là một trong những cuộc tấn công có thể xảy ra đối với các trang web, vì Javascript là một trong những công nghệ được sử dụng rộng rãi nhất cho các trang web. Vì vậy, trong khi kiểm thử các trang web hoặc bất kỳ công nghệ web nào khác không nên bỏ qua kiểm thử về Javascript Injection.

Khi thực hiện kiểm tra bảo mật, JS Injection không nên bị lãng quên. Một số người xem kiểm thử này như là một cuộc tấn công ít nguy hiểm hơn vì nó được thực hiện ở phía khách hàng.

Tuy nhiên, đó là cách tiếp cận sai và chúng ta nên nhớ rằng Javascript Injection có thể gây ra thiệt hại nghiêm trọng cho trang web như rò rỉ thông tin nhạy cảm, thay đổi thông số hoặc xâm nhập tài khoản người dùng.

Do đó, chúng ta nên coi đây là một phần quan trọng của kiểm thử và nó là một phần của đầu tư cho danh tiếng của sản phẩm và danh tiếng của công ty.

Thử nghiệm cho JS Injection không phải là khó. Thứ nhất, bạn nên có kiến ​​thức chung về Javascript và phải biết cách kiểm tra xem cuộc tấn công này có khả thi cho giải pháp web hiện tại hay không.

Ngoài ra trong khi kiểm thử bạn nên nhớ rằng một trang web có thể đã được lập trình để chống lại kiểu tấn công này, nhưng có thể nó còn quá yếu và nó cũng nên được kiểm tra. Một điều quan trọng cần nhớ là có nhiều loại tấn công Javascript Injection khác nhau và không nên bỏ qua bất kì rủi ro nào về Javascript Injection.


*Nguồn: http://www.softwaretestinghelp.com/javascript-injection-tutorial/#more-24310*