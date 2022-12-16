### HTML là gì?

Để có nhận thức tốt hơn về HTML Injection, đầu tiên cần hiểu HTML là gì.

HTML là một ngôn ngữ đánh dấu mà tất cả các element của website đều được viết trong các thẻ. Nó hầu hết được sử dụng để tạo website. Các  trang web sẽ được gửi tới trình duyệt dưới dạng các tài liệu HTML. Sau đó, các tài liệu HTML đó được convert sang website thông thường và hiển thị cho người dùng.

## Vậy HTML Injection là gì?

Là một loại tấn công mà hacker sẽ tiêm những code HTML vào website thông qua những lỗ hổng, với mục đích thay đổi thiết kế hoặc một số thông tin của website, rồi hiển thị cho user. Kết quả, user có thể nhìn thấy những dữ liệu mà hacker đã gửi. 

Những dữ liệu này sẽ khác nhau dựa vào loại tấn công. Nó có thể là 1 vài thẻ HTML, cũng có thể là 1 form hoặc 1 trang web fake. Khi tấn công xảy ra, trình duyệt sẽ hiển thị dữ liệu mà hacker đã tiêm vào.

Thay đổi hiển thị website không phải là rủi ro duy nhất khi cuộc tấn công này xảy ra. Nó cũng tương tự cuộc tấn công XSS, nên hacker có thể dễ dàng lấy cắp danh tính của người dùng.

## Các loại HTML Injection

Như đề cập, HTML Injection được thực hiện với 2 mục đích: 

- Thay đổi giao diện hiển thị trang web
- Lấy cắp danh tính của người dùng

Tuy nhiên, các loại HTML Injection chủ yếu là:

- Tấn công HTML lưu trữ (stored HTML Injection)
- Tấn công HTML phản ánh (reflected HTML Injection)

### 1. Stored HTML Injection:

Stored HTML injection xảy ra khi đoạn mã HTML độc hại được lưu trữ vào web server và được thực thi mỗi khi user gọi một tính năng phù hợp. Loại tấn công này thường ảnh hưởng đến nhiều người dùng.

### 2. Reflected HTML Injection:

Với loại tấn công này, các mã độc không được lưu trữ vĩnh viễn trên web server. Reflected HTML Injection xảy ra khi website phản hồi ngay lập tức với đầu vào độc hại. Loại tấn công này thường ảnh hưởng đến từng người dùng độc lập.

**Có thể chia thành các loại sau:**

- Reflected GET
- Reflected POST
- Reflected URL

Cuộc tấn công reflected HTML injection có thể thực hiện theo những phương thức HTML khác nhau. Ví dụ: GET và POST. Với phương thức POST, dữ liệu sẽ được gửi đi. Còn với phương thức GET, dữ liệu sẽ được get về. 

Để biết phương thức nào đang được sử dụng cho website, chúng ta có thể check source của trang (*sử dụng phím F12, hoặc click chuột phải -> Inspect*).

**Ví dụ:** đoạn code form login dưới đây sử dụng phương thức post

![](https://images.viblo.asia/f4398e36-9348-4366-b648-d350c0e4a883.jpg)

**Reflected GET Injection** xảy ra khi dữ liệu đầu vào hiển thị (reflected) trên website. Giả sử, chúng ta có một trang đơn giản với form tìm kiếm là lỗ hổng cho cuộc tấn công này. Chúng ta sẽ nhập HTML code vào tìm kiếm, nó sẽ xuất hiện trên website cùng một thời điểm, và nó sẽ tiêm vào tài liệu HTML của web.

Ví dụ: chúng ta nhập một thẻ HTML đơn giản:

![](https://images.viblo.asia/fc8bee24-8066-4222-b848-d04a26c45413.jpg)

**Reflected POST Injection** khó hơn một chút. Nó xảy ra khi đoạn mã HTML độc hại được gửi thay vì gửi đúng parameters POST. 

Ví dụ: Chúng ta có form login có lỗ hổng cho tấn công HTML. Dữ liệu được nhập vào form login sẽ được gửi với phương thức POST. Sau đó, chúng ta sẽ nhập mã HTML thay cho nhập đúng các parameter login, và nó sẽ được gửi đi với phương thức POST và hiển thị trên website. 

Để thực hiện tấn công Reflected POST Injection, tôi đề nghị sử dụng plugin của trình duyệt đặc biệt, nó sẽ fake dữ liệu được gửi. Ví dụ như plugin “Tamper Data” của Firefox. Plugin sẽ lưu trữ dữ liệu được gửi đi và cho phép người dùng thay đổi chúng. Sau đó dữ liệu thay đổi sẽ được gửi và hiển thị trên website.

Ví dụ: Nếu chúng ta sử dụng plugin, rồi gửi cùng mã HTML `<h1>Testing test</h1>`, nó sẽ hiển thị giống như ví dụ ở trên.

![](https://images.viblo.asia/fc8bee24-8066-4222-b848-d04a26c45413.jpg)

**Reflected URL** xảy ra khi đoạn mã HTML được gửi thông qua URL của website, được hiển thị trong website, đồng thời việc tiêm vào tài liệu HTML.

## HTML Injection được thực hiện như thế nào?

Đầu tiên, hacker sẽ tìm các lỗ hổng của website. Các lỗ hổng này có thể là các trường nhập dữ liệu hoặc link website.

Đoạn mã HTML độc hại có thể được lấy từ source code bằng innerHTML. InnerHTML là thuộc tính của tài liệu DOM. Từ innerHTML, chúng ta có thể viết dynamic HTML code (code HTML động). Nó thường được sử dụng cho các trường nhập dữ liệu như các trường comment, form câu hỏi, form đăng ký, ... Do đó, những phần tử này dễ bị tấn công HTML nhất.

Giả sử, chúng ta có form các câu hỏi cần điền câu trả lời và họ tên. Khi hoàn thành form này, sẽ hiển thị một thông báo xác nhận. Trong thông báo này, tên của người dùng được chỉ định được hiển thị.

Ví dụ:

![](https://images.viblo.asia/4b133cbc-69b5-40c4-87cf-03c723f5b0c1.jpg)

Trong đó, Tester_name là tên được chỉ định của user. Và code của đoạn thông báo này như sau:

```
  var user_name=location.href.indexOf(“user=”);
 document.getElementById(“Thank you for filling our questionnaire”).innerHTML=” Thank you for filling our questionnaire, ”+user;
```

Nếu chúng ta nhập code HTML vào, thì đoạn thông báo sẽ hiển thị thông điệp của nó.

Tương tự, chúng ta có form comment như sau:

![](https://images.viblo.asia/16114486-c817-4997-8bd6-82540f299eab.jpg)

Trong form này, user cần nhập tên và nội dung comment. Tất cả các comment sẽ được liệt kê trong page và được tải lại khi tải trang. Do đó, mã độc hại có thể được nhập và lưu trữ, nó cũng sẽ được tải lại và hiển thị trên website.

Ví dụ, trong field comment chúng ta nhập đoạn code sau:

```
 <html>
 <body>
 <script>
 alert( 'Hello, world!' );
 </script>
 </body>
 </html>
```

Khi đó, đoạn code trên sẽ được hiển thị trên website.

Một cách khác để tấn công HTML là thực hiện thông qua link website, ví dụ PHP website link.

Như bạn biết, "site là một parameter and "1" là value của nó. Nếu parameter "site" thay cho value "1" chúng ta sẽ chỉ định được bất kỳ mã HTML nào có văn bản để hiển thị. Text được chỉ định này sẽ được hiển thị trên trang "Page Not Found". Điều này chỉ xảy ra khi trang có lỗ hổng dễ bị tấn công.

Do đó, nếu chúng ta nhập thẻ `<h1>Testing</h1>` thay thế cho giá trị của thông số parameter value, thì text sau sẽ hiển thị:

![](https://images.viblo.asia/c4ff1722-89b1-4697-b37c-48b8206f5df9.jpg)

## Test thế nào để chống lại được HTML Injection?

Đầu tiên, tester cần liệt kê tất cả các lỗ hổng có thể của website:

- Tất cả các field hập dữ liệu
- Website link

Sau đó, thực hiện manual test. 

Để test xem HTML Injection là có thể hay không, hãy nhập một đoạn code HTML đơn giản. Ví dụ, để check đoạn text nhập vào có hiển thị hay không, chỉ cần một đoạn code đơn giản là đủ để check điều này, không cần thiết phải sử dụng một đoạn code HTML phức tạp.

Ví dụ: có thể nhập thẻ tag đơn giản sau:

`<h1>HTML Injection testing</h1>`

Hoặc với search form, nếu bạn muốn test với cái gì đó phức tạp hơn:

```
<form method="post" action="index.html">
<p><input type="text" name="search" value="" placeholder="Search text"></p>
<p class="search_text">
<label>
<input type="checkbox" name="search_text" id="search_text">
```
    
 Nhập text để search:
    
```
 </label>
</p>
<p class="submit"><input type="submit" name="commit" value="Search"></p>
</form>
```

Nếu một đoạn code HTML được hiển thị, thì tester có thể chắc chắn rằng, tấn công HTML là có thể. Sau đó, tester có thể thử với đoạn code phức tạp hơn. Ví dụ, để hiển thị một form login fake.

Một giải pháp khác là quét HTML Injection. Quét tự động loại tấn công này có thể tiết kiệm thời gian của bạn. Tôi muốn chú ý rằng không có nhiều tool cho testing HTML Injection so với các loại tấn công khác.

Trong đó, một giải pháp khả thi là ứng dụng WAS. WAS có thể được gọi là một máy quét lỗ hổng khá mạnh, vì nó test với các đầu vào khác nhau, và không bị dừng lại với lần thất bại đầu tiên. 

Ngoài ra, ta có thể kể đến plugin browser bên trên, "Tamper Data", nó get dữ liệu đã gửi, cho phép tester thay đổi nó và gửi đến browser.

Chúng ta cũng có thể tìm vài công cụ scan online. Hãy nhớ rằng, khi lựa chọn tool scan, chúng ta phải chú ý đến khả năng phân tích kết quả và nó có chính xác hay không.

Tuy nhiên, cần lưu ý rằng, việc test thủ công không được phép bỏ qua. Vì đây là cách chúng ta có thể khẳng định chắc chắn rằng những đầu vào chính xác đã được thử nghiệm và những kết quả chính xác đã được trả về. Hơn nữa, đây cũng là cách dễ dàng hơn trong việc phân tích kết quả thử nghiệm. 

## Làm thế nào để ngăn chặn HTML Injection?

Không còn nghi ngờ gì nữa, nguyên nhân chính để xảy ra cuộc tấn công này là do các nhà phát triển thiếu chú ý và thiếu kiến thức. Loại tấn công này xảy ra khi đầu vào và đầu ra không được validate chính xác. Do đó, cách để ngăn chặn cuộc tấn công HTML là validate dữ liệu chính xác.

- Kiểm tra xem tất cả các đầu vào có chưa bất kỳ code script hay HTML nào không, như <script></script>, <html></html>, bằng cách sử dụng các function.

- Có nhiều function để check xem code có chứa bất kỳ đoạn HTML đặc biệt nào. Việc lựa chọn function phụ thuộc vào ngôn ngữ lập trình mà dev đang sử dụng.

Tôi chỉ lưu ý rằng, tuy các cuộc tấn công HTML là tương đối hiếm, cũng có ít tài liệu để học về nó, và cũng ít máy scanner để kiểm tra tự động. Tuy nhiên, không nên bỏ qua loại kiểm tra bảo mật này. 

Hơn nữa, cả developer và tester cũng nên có kiến thức tốt về cách thực hiện loại tấn công này. Sự hiểu biết về quy trình của loại tấn công này có thể sẽ giúp ngăn chặn nó. 

References: https://www.softwaretestinghelp.com/html-injection-tutorial/