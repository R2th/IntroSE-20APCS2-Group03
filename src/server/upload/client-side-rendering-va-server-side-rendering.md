Thuở ban đầu, trong các web framework, view được render tại server, nhung giờ đây việc này đã có thể được thực hiện trên client. Hãy cùng khám phá những ưu điểm và nhược điểm của hai phương pháp này.

# **Hiệu năng**
Với server-side rendering, bất cứ khi nào bạn muốn xem một trang web mới, bạn sẽ phải lấy trang web ấy từ server.

Điều này có thể ví von với việc mỗi khi bạn muốn ăn cái gì thì bạn sẽ lại phải đi siêu thị.
Với client-side rendering, bạn đến siêu thị một lần và dành 45 phút đi bộ xung quanh siêu thị để mua đồ ăn cho cả tháng. Sau đó, bất cứ khi nào bạn muốn ăn, bạn chỉ cần mở tủ lạnh.

Mỗi cách tiếp cận đều có ưu điểm và nhược điểm về mặt hiệu năng:
Với client-side rendering, lần đầu bạn tải trang sẽ chậm. Bởi vì giao tiếp qua mạng rất chậm và phải mất hai chuyến khứ hồi đến server trước khi bạn có thể bắt đầu hiển thị nội dung cho người dùng. Tuy nhiên, sau đó, các lần tải trang tiếp theo sẽ rất nhanh.
Với server-side rendering, tải trang lần đầu sẽ không bị chậm. Tuy nhiên cũng sẽ không nhanh. Và các request khác cũng sẽ không nhanh không chậm như vậy.
Để cụ thể hơn, với client-side rendering, trang ban đầu sẽ trông giống như thế này:

```
<html>
<head>
<script src="client-side-framework.js"></script>
<script src="app.js"></script>
</head>
<body>
<div class="container"></div>
</body>
</html> 
```

app.js sẽ có tất cả các trang HTML bằng JavaScript dưới dạng chuỗi. Kiểu kiểu thế này:

```
var pages = {
'/': '<html> ... </html>',
'/foo': '<html> ... </html>',
'/bar': '<html> ... </html>',
}; 
```

Sau đó, khi trang được tải, framework sẽ nhìn vào thanh URL, lấy chuỗi tại các trang ['/'] và chèn nó vào <div class="container"></div> . Ngoài ra, khi bạn nhấp vào liên kết, framework sẽ chặn sự kiện, chèn chuỗi mới (giả dụ như là ['/ foo']) vào container và ngăn trình duyệt thực hiện request HTTP như bình thường.

# **SEO**

Giả sử có một con web crawler gửi request đến trang reddit.com:
```
var request = require('request');
request.get('reddit.com', function (error, response, body) {
// body looks something like this:
// <html>
// <head> ... </head>
// <body>
// <a href="espn.com">ESPN</a>
// <a href="news.ycombinator.com">Hacker News</a>
// ... other <a> tags ...
}); 
```
Sau đó, con crawler sử dụng <a href> trong phần response để tạo các request mới:
```
var request = require('request');
request.get('reddit.com', function (error, response, body) {
  // body looks something like this:
  // <html>
  //   <head> ... </head>
  //   <body>
  //     <a href="espn.com">ESPN</a>
  //     <a href="news.ycombinator.com">Hacker News</a>
  //     ... other <a> tags ...  request.get('espn.com', function () { ... });
  request.get('news.ycombinator.com', function () { ... });
});
```
 
Sau đó, con crawler tiếp tục quá trình bằng cách sử dụng các liên kết trên Espn.com và news.ycombinator.com để tiếp tục crawl.
Mã đệ quy ví dụ:
```
var request = require('request');function crawlUrl(url) {
  request.get(url, function (error, response, body) {
    var linkUrls = getLinkUrls(body);    linkUrls.forEach(function (linkUrl) {
      crawlUrl(linkUrl);
    });
  });
}crawlUrl('reddit.com');
```
 
Điều gì sẽ xảy ra nếu response body trông như thế này:
```
<html>
<head>
<script src="client-side-framework.js"></script>
<script src="app.js"></script>
</head>
<body>
<div class="container"></div>
</body>
</html> 
```
Bạn có thể thấy là không có bất kỳ thẻ <a href> nào để lấy link đi vào cả. Ngoài ra, trang web này trông khá nhạt nhẽo, vì vậy có lẽ các search engine sẽ không muốn hiện trang này lên kết quả tìm kiếm.
Nhưng con crawler nào hay biết là framework phía khách hàng chuẩn bị fill nội dung vào <div class = "container"> </ div>.
Đây là lý do tại sao client-side rendering ảnh hưởng không tốt tới SEO.

Prerendering
 
Vào năm 2009, Google đã giới thiệu một cách khắc phục điều này.

https://webmasters.googleblog.com/2009/10/proposed-for-making-ajax-crawlable.html
Khi con crawler bắt gặp www.example.com/page?query#!mystate, nó sẽ chuyển đổi nó thành www.example.com/page?query&_escoped_fragment_=mystate. Bằng cách này, khi server của bạn nhận được yêu cầu với _esc hành_fragment_, nó biết rằng yêu cầu đến từ con crawler chứ không phải con người.
Hãy nhớ rằng - server muốn con crawler nhìn thấy <div class = "container"> ... </ div> (với nội dung bên trong), chứ không phải <div class = "container"> </ div>. Vậy thì:
Khi yêu cầu đến từ con crawler, chúng ta có thể phục vụ <div class = "container"> ... </ div>.
Khi yêu cầu đến từ một người bình thường, chúng ta chỉ có thể phục vụ <div class = "container"> </ div> và để JavaScript chèn nội dung bên trong.
Tuy nhiên, có một vấn đề khác: máy chủ không biết có cái gì bên trong <div class = "container"> </ div>. Để biết được, nó phải chạy JavaScript, tạo DOM và thao tác với DOM đó. Vì các máy chủ web truyền thống không có thể làm được các thao ấy, chúng sử dụng một service được gọi là Headless Browser.

**Crawler thông minh **
Sáu năm sau, Google thông báo rằng crawler của họ đã được nâng cấp. Khi Crawler 2.0 nhìn thấy các thẻ <script>, nó thực sự tạo request, chạy mã và thao tác với DOM. Giống như một trình duyệt web.
Vì vậy, thay vì chỉ nhìn thấy:
<div class="container"></div>
 
Nó thấy:
<div class="container">
...
...
...
...
...
</div> 
Bạn có thể sử dụng Fetch as Google để cài đặt nội dung mà crawler Google nhìn thấy khi truy cập một URL nhất định.
Đoạn trích liên quan từ thông báo nói trên của Google:
“Trước đây, các hệ thống của chúng tôi không thể render và hiểu các trang sử dụng JavaScript để trình bày nội dung cho người dùng. Bởi vì các crawler [..] không thể thấy bất kỳ nội dung nào được tạo ra động, nên chúng tôi đã đề xuất một bộ practices mà các quản trị web có thể làm theo để đảm bảo rằng các ứng dụng dựa trên AJAX của họ được index bởi các công cụ tìm kiếm.
Thời đại đã thay đổi. Ngày nay, miễn là bạn không chặn Googlebot thu thập dữ liệu tệp JavaScript hoặc CSS, chúng tôi có thể render và hiểu các trang web của bạn giống các trình duyệt hiện đại.”

**Crawler ít thông minh hơn**
    Thật không may, Google không phải là công cụ tìm kiếm duy nhất. Ngoài ra còn có Bing, Yahoo, Duck Duck Go, Yahoo, v.v. Vâng, cũng có người thực sự sử dụng các công cụ tìm kiếm này.
Các công cụ tìm kiếm khác không thể xử lý JavaScript tốt như Google. Xem bài SEO vs. React: Web Crawlers are Smarter Than You Think để biết thêm chi tiết.

**Kết hợp ưu điểm của cả hai**
Để có thể tận dụng ưu điểm của cả hai, bạn có thể làm như sau:
1.	Sử dụng server-side rendering để tải trang đầu tiên.
2.	Sử dụng client -side rendering để cho tất cả các lần tải trang tiếp theo.

Ý nghĩa của cách làm này:
•	Đối với lần tải trang đầu tiên, không cần phải mất hai chuyến đi khứ hồi đến máy chủ trước khi người dùng nhìn thấy nội dung.
•	Các lần tải trang tiếp theo rất nhanh.
•	Crawler nhận được nội dung HTML đơn giản. Giống như ngày xưa. Không cần phải làm công việc chạy JavaScript. Hoặc xử lý _esc hành_fragment_.
Tuy nhiên, phải mất một chút công để thiết lập như thế này trên máy chủ, và cũng sẽ làm server phức tạp hơn.
Angular, React và Ember đều đã chuyển sang phương pháp này.

Thảo luận
Đầu tiên, có một số điều cần xem xét:
•	Khoảng 2% người dùng đã tắt JavaScript, trong trường hợp đó, client-side rendering sẽ không hoạt động.
•	Khoảng 1/4 tìm kiếm trên web được thực hiện với các công cụ khác ngoài Google.
•	Không phải ai cũng có kết nối internet nhanh.
•	Người dùng internet trên điện thoại của họ thường không có kết nối internet nhanh.
•	Một giao diện người dùng quá nhanh có thể gây nhầm lẫn! Giả sử người dùng nhấp vào một liên kết. Ứng dụng sẽ đưa họ đến một view mới. Nhưng view mới chỉ khác biệt rất ít so với view trước. Và sự thay đổi đã xảy ra ngay lập tức (vì những người làm client-side rendering thích khoe tốc độ). Người dùng có thể không nhận thấy rằng một view mới đã được tải. Hoặc có thể người dùng có nhận ra, nhưng vì khác biệt nhỏ, người dùng phải mất công để ý xem thực sự quá trình chuyển đổi có xảy ra hay không. Đôi khi việc hiện loading một chút rồi hiển thị lại toàn bộ trang cũng không tồi. Nó giúp chúng ta đỡ phải cố để xem trang đã đổi hay chưa.
•	Bộ nhớ đệm. Với bộ nhớ đệm và server-side rending, thường thì người dùng không thực sự phải đi đến máy chủ. Và đôi khi, họ chỉ cần đến một máy chủ gần đó, chứ không phải là một cái máy chủ “chính thức” ở bên kia bờ đại dương.
•	Trên thực tế, đôi khi hiệu suất cũng không quan trọng lắm. Đôi khi tốc độ là “Đủ tốt”, và tăng tốc độ nhanh hơn nữa cũng không thực sự làm cho cuộc sống trở nên tốt hơn.
Với tất cả những gì đã nói ở trên, tôi tin rằng trong hầu hết các trường hợp, tốt nhất là chúng ta làm theo nguyên tắc KISS và chọn render phía máy chủ. Nhớ rằng:

Hầu hết người dùng của bạn sẽ có kết nối internet tốt, và nó sẽ đủ nhanh. Đặc biệt là nếu bạn đang nhắm tới mục tiêu là mấy bạn trẻ dùng Macbook Pros. Bạn không phải lo lắng về thời gian tải ban đầu quá dài khiến bạn mất người dùng. Bạn không phải lo lắng về các vấn đề về usability trong đó người dùng không nhận thấy rằng một trang mới thực sự đã được tải khi họ vừa nhấp vào một liên kết.
Tuy nhiên, chắc chắn có các trường hợp sử dụng để client-side rendering với server-side rendering khi lần đầu tải trang. Đối với các công ty lớn hơn, nó thường là trường hợp #perfMatters, bạn có người dùng có kết nối internet chậm và bạn có một nhóm kỹ thuật đủ lớn để dành thời gian cho việc tối ưu hóa.
Trong tương lai, tôi hy vọng các isomorphic web framework (thực hiện client-side rendering với server-side rendering vào lần tải trang đầu) sẽ ổn định hơn và dễ sử dụng hơn. Tại thời điểm đó, có lẽ sự phức tạp thêm vào sẽ là không còn đáng kể. Tuy nhiên, hiện tại, tất cả những điều này là rất mới, và tôi nghĩ rằng sẽ còn xảy ra nhiều tình trạng leaky abstraction. Thậm chí xa hơn trong tương lai, tôi hy vọng kết nối internet sẽ trở nên đủ tốt đến mức không cần client-side rendering nữa.

    Nguồn: https://medium.com/@adamzerner/client-side-rendering-vs-server-side-rendering-a32d2cf3bfcc