Bạn không chắc chắn làm thế nào để bắt đầu? 
Trong hướng dẫn này , chúng tôi sẽ hướng dẫn bạn cách tạo 1 trang HTML AMP cơ bản .
# 1.  Tạo 1 AMP HTML của bạn:
```
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hello, AMPs</title>
    <link rel="canonical" href="http://example.ampproject.org/article-metadata.html">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Open-source framework for publishing content",
        "datePublished": "2015-10-07T12:02:41Z",
        "image": [
          "logo.jpg"
        ]
      }
 </script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
```
Sử dụng HTTPS: Khi tạo trang và nội dung AMP, bạn nên cân nhắc sử dụng giao thức HTTPS (so với HTTP). Mặc dù, HTTPS không bắt buộc đối với tài liệu AMP hoặc cho hình ảnh và phông chữ, có nhiều tính năng AMP yêu cầu HTTPS (ví dụ: video, iframe và hơn thế nữa). Để đảm bảo các trang AMP của bạn tận dụng tối đa tất cả các tính năng AMP, hãy sử dụng giao thức HTTPS
Những điều chú ý bắt buộc :

- <! Doctype html> doctype : tiêu chuẩn của HTML
- Chứa thẻ <html ⚡> ( <html amp> cũng được chấp nhận) : Xác định trang dưới dạng nội dung AMP.
- Chứa các thẻ <head> và <body> : Tùy chọn trong HTML nhưng không phải trong AMP.
- Chứa thẻ <meta charset = "utf-8"> thẻ con đầu tiên trong thẻ <head> của HTML : Xác định mã hóa cho trang.
- Chứa thẻ <script async src = "https://cdn.ampproject.org/v0.js"> </ script> trong thẻ <head> của chúng. Cách tốt nhất là bạn nên bao gồm tập lệnh càng sớm càng tốt trong <head> : Bao gồm và tải thư viện AMP JS.
- Chứa thẻ <link rel = "canonical" href = "$ SOME_URL"> bên trong <head> : Điểm đến phiên bản HTML thông thường của tài liệu HTML AMP hoặc chính nó nếu không có phiên bản HTML nào tồn tại.
- Chứa thẻ <meta name = "viewport" content = "width = device-width, minimum-scale = 1"> bên trong thẻ <head> của chúng. Bạn cũng nên bao gồm tỷ lệ ban đầu = 1: Chỉ định chế độ xem tương ứng.
- Chứa mã boilerplate AMP trong thẻ <head> của chúng : CSS boilerplate để ẩn nội dung ban đầu cho đến khi AMP JS được tải.

# 2. Xử lý hình ảnh: 
Hầu hết các thẻ HTML có thể được sử dụng trực tiếp trong HTML AMP, nhưng một số thẻ nhất định, chẳng hạn như thẻ <img>, được thay thế bằng thẻ HTML AMP tùy chỉnh tương đương hoặc được tăng cường nhẹ (và một số thẻ có vấn đề bị cấm hoàn toàn, xem Thẻ HTML trong đặc điểm kỹ thuật )
Mã nhúng :
```
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
Modify the presentation
<style amp-custom>
  /* any custom style goes here */
  body {
    background-color: white;
  }
  amp-img {
    background-color: gray;
    border: 1px solid black;
  }
</style>
```
# 3. Bố cục và trình bày:
Preview :
Xem trước trang AMP giống như bạn sẽ xem trước bất kỳ trang HTML tĩnh nào khác. Không có bước xây dựng hoặc tiền xử lý được yêu cầu. Bạn có thể chọn:
- Mở trang trực tiếp trong trình duyệt từ hệ thống tệp (các phần tử nhất định có thể không hoạt động do lỗi XMLHttpRequests).
- Sử dụng máy chủ web cục bộ như Apache 2 hoặc Nginx.
Validate:
Tiếp theo, hãy đảm bảo rằng trang AMP của bạn thực sự là AMP hợp lệ hoặc nó sẽ không được phát hiện và phân phối bởi các nền tảng của bên thứ ba như Google Tìm kiếm. Để xác nhận:
1. Mở trang của bạn trên trình duyệt của bạn
2. Thêm "# development = 1" vào URL, ví dụ: http: // localhost: 8000 / released.amp.html # development = 1.
3. Mở bảng điều khiển Chrome DevTools và kiểm tra lỗi xác thực.
# 4. Xem và kiểm tra lại: 
Liên kết các trang với <link>:
Để thiết lập trang không phải AMP và trang AMP phải được coi là "ghép nối" với nhau, chúng tôi thêm thông tin về trang AMP vào trang không phải AMP và ngược lại, dưới dạng thẻ <link> trong < đầu>.
Thêm nội dung sau vào trang không phải AMP:
```
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
Và điều này đến trang AMP:
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
```
Link tham khảo: https://www.ampproject.org/docs/getting_started/create