Có thể bạn đã nghe về CDN trước đó, trong khi hỏi một người có kinh nghiệm về giải pháp tăng hiệu suất cho website, tiết kiệm băng thông cho hosting. Hoặc cũng có thể bạn đã từng copy url của jQuery hoặc Bootstrap bỏ vào HTML mà không biết url đó là CDN của Google. Vậy CDN chính xác là gì, có bao nhiêu loại, và dùng như thế nào để nâng cao hiệu suất cho website thì bài viết này sẽ cung cấp cho bạn các thông tin cần thiết đó. 

### 1. CDN là gì?

CDN là viết tắt của Content Delivery Network tạm dịch sang Tiếng Việt là “mạng phân phối nội dung”. Nó là một hệ thống gồm nhiều máy chủ đặt trên toàn cầu làm nhiệm vụ sao lưu các nội dung tĩnh bên trong website, sau đó phân tán nó ra nhiều máy chủ khác (được gọi là PoP – Points of Presence) và từ các PoP đó nó sẽ gửi tới cho người dùng khi họ truy cập vào website.
- Người dùng truy cập từ Việt Nam, PoP đặt tại TP Hồ Chí Minh sẽ phục vụ bạn.
- Người dùng truy cập từ Mỹ, PoP ở San Jose, California hay Los Angeles, California,…. sẽ phục vụ bạn.
- Người dùng truy cập từ EU, PoP ở Amsterdam, Netherlands sẽ phục vụ bạn.
Trước tiên, mời bạn xem qua mô hình khác nhau giữa một website không sử dụng CDN và một website có sử dụng CDN.

#### Không sử dụng CDN
Khi người dùng xem một tập tin mà không thông qua CDN nào, nghĩa là họ đã gửi một request thẳng đến máy chủ chứa website để truy cập tập tin đó. Ví dụ liên kết này của viblo.asia nghĩa là truy cập thẳng vào máy chủ của viblo.asia.
![](https://images.viblo.asia/a35d39a1-00fa-452a-b2fd-485f4456089e.png)

#### Sử dụng CDN
Khi một tập tin được phân phối bởi CDN, người dùng truy cập vào nó thì PoP phân phối gần nhất so với người dùng sẽ trả nội dung về cho người dùng xem. Ví dụ bạn truy cập vào liên kết này là xem một nội dung của viblo.asia trên CDN, ví dụ bạn ở Việt Nam thì PoP CDN tại Việt Nam sẽ phân phối nội dung cho bạn.
![](https://images.viblo.asia/a5d40fcd-07f3-482d-a658-f048d73d9d63.png)

### 2. CDN tăng tốc website như thế nào?
Bãn hãy hình dung tình huống sau:
- Giả sử bạn mua đồ của TGDD, món đồ phải mất vài ngày từ Hồ Chí Minh ra tận Hà Nội để đến tay bạn. 
- Thế nhưng, nếu bạn muốn mua bó rau của VinMart, nhân viên sẽ đem bó rau từ siêu thị gần bạn nhất, đưa bác Grab cầm qua, bạn nhận được hàng trong vòng vài giờ. 

Địa điểm càng xa, hàng ship càng chậm. 
Tốc độ truyền dữ liệu cũng vậy! Tín hiệu điện cũng giống như hàng hóa, cũng phải di chuyển qua dây mạng hoặc cáp quang, di chuyển qua nhiều server khác nhau.

Mạng nhanh hay chậm, không quan trọng bằng việc server ở xa hay gần.
Tốc độ tải trang có thể được tóm tắt một câu là “nhất cự ly, nhì tốc độ”. Kết nối tới con server “cùi” ở VN vẫn nhanh hơn server “xịn” ở Mĩ, đơn giản là vì nó gần hơn, tín hiệu được truyền đi ở khoảng cách ngắn hơn.

Đó là lý do các ông lớn phải đặt data center của họ tại nhiều nơi. Các cloud provider như AWS, Azure cũng đặt máy chủ của mình tại mười mấy vùng lãnh thổ.

![](https://images.viblo.asia/c16cb957-6b2f-480c-8a3b-edb33e24e97a.png)

### 3. Những lợi ích khác khi dùng CDN
Không chỉ giúp tăng hiệu năng cho website, CDN còn mang lại nhiều lợi ích như sau:
- Chống DDOS: Một số CDN provider như Cloudflare còn đi kèm luôn dịch vụ chống DDOS. Các CDN này có khả năng chịu tải cao, có sẵn bộ lọc để chống DDOS trước khi những request này tới được server chính.
- Caching, tiết kiệm băng thông: Hiểu đơn giản nếu có nhiều website (gọi tắt là network) sử dụng chung một CDN thì khi truy cập vào website đầu tiên CDN đó sẽ được cache lại trên máy của user, khi chuyển qua các website khác cùng network thì không cần phải load lại CDN đó nữa, đây cũng cách tạo ra một network giúp tăng hiệu năng tất cả website trong network đó. 
- Tăng tính ổn định của hệ thống: Khi hệ thống chỉ hoạt động dựa trên một server duy nhất, nếu server có sự cố đồng nghĩa với toàn bộ hệ thống không thể truy cập được. Với CDN, ta có nhiều server nên nếu một server nào đó có bị sập, người dùng vẫn có thể truy cập được dữ liệu trên server khác của hệ thống CDN.

### 4. Khi nào nên dùng CDN?

* CDN chỉ thực sự mạnh khi một trong những case sau là đúng với website của bạn:
* Máy chủ của website đặt xa người dùng.
* Lượt truy cập lớn tốn nhiều băng thông.
* Có nhiều lượt truy cập trên nhiều quốc gia khác nhau.
* Khi sử dụng Load Balancing.

### 5. Hoặc đơn giản hơn là dùng cả hai
Nếu bạn vẫn còn băn khoăn nên chọn solution nào? Dùng CDN hay tạo một bản copy trên hosting của mình thì có một giải pháp đó là dùng cả hai như sau:
```html
<!doctype html>
<html>
  <head>
    <!-- Bootstrap CSS CDN -->
    <link rel="stylesheet" href="~https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.4.1/css/bootstrap.min.css">
    <!-- Bootstrap CSS local fallback -->
    <script>
      var test = document.createElement("div")
      test.className = "hidden d-none"
      document.head.appendChild(test)
      var cssLoaded = window.getComputedStyle(test).display === "none"
      document.head.removeChild(test)
      if (!cssLoaded) {
          var link = document.createElement("link");
          link.type = "text/css";
          link.rel = "stylesheet";
          link.href = "lib/bootstrap.min.css";

          document.head.appendChild(link);
      }
    </script>
  </head>
  <body>
    <h1>CDN + Local Fallback</h1>
    <p class="text-success">If this is green and the dropdown works, we're running</p>
    <div class="dropdown">
      <button type="button" data-toggle="dropdown" class="btn btn-default">
        Cat Dropdown
        <span class="caret"></span>
      </button>
      <ul class="dropdown-menu" aria-labelledby="dLabel">
        <li><a href="#">Frida</a></li>
        <li><a href="#">Gan</a></li>
        <li><a href="#">Gus</a></li>
      </ul>
    </div>
    
    <!-- jQuery CDN -->
    <script src="~https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
    <!-- jQuery local fallback -->
    <script>window.jQuery || document.write('<script src="lib/jquery.min.js"><\/script>')</script>

    <!-- Bootstrap JS CDN -->
    <script src="~https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <!-- Bootstrap JS local fallback -->
    <script>if(typeof($.fn.modal) === 'undefined') {document.write('<script src="lib/bootstrap.min.js"><\/script>')}</script>
  </body>
</html>
```
### 6. Kết luận
Nếu muốn thử áp dụng CDN cho website hiện tại, các bạn có thể tìm hiểu về [Cloudflare](https://www.cloudflare.com/). Hoặc các bạn có thể upload image/css lên [Azure Storage](https://azure.microsoft.com/en-in/services/storage/) hoặc [Amazon S3](https://aws.amazon.com/vi/s3/), sau đó dùng thử để hiểu hơn về CDN nhé!
### Tài liệu tham khảo
- https://thachpham.com/hosting-domain/cdn-la-gi-va-khi-nao-nen-dung-cdn-cho-website.html
- https://toidicodedao.com/2018/05/29/cdn-la-gi-tang-toc-do-tai-he-thong
- https://stackoverflow.com/questions/26192897/should-i-use-bootstrap-from-cdn-or-make-a-copy-on-my-server

Cảm ơn các bạn đã theo dõi nội dung bài viết! Happy coding and peace out! :v: