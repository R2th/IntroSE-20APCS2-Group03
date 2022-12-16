# Tối ưu hóa Html/Css/js
Tối ưu hóa trâng web là một điều mà mọi lập trình viên đều hướng đến , điều này giúp cho trang web của bạn cải thiệu hiệu năng , giảm thời gian chờ và được ưu tiên trong các bộ máy tìm kiếm ... ví dụ như của Google :) . Tuy nhiên để tối ưu hóa một trang web thì bạn phải làm đúng cách và đôi khi còn phụ thuộc vào framework bạn đang sử dụng nữa . Trong bài viết này sẽ hướng dẫn một số mẹo giúp bạn có thể tối ưu hóa html/css/js đúng chuẩn nhất .
## 1.Tránh chèn hoặc nhúng code css/js vào file Html
  -Inline 
  
  ```
  <div style="color:red;">
  <button class="btn" onclick="alert('Hello World')">
  ```
  
  -Nhúng
  
  ```
  <style>.red {color: red;}</style>
  <script>alert('Hello World');</script>
  ```
  
  - Dùng file bên ngoài
  
  ```
  <link rel="stylesheet" href="file.css">
  <script type="text/javascript" src="script.js">
  ```
  
  Đối với 2 cách Inline/Nhúng cách này làm giảm kết nối đến server , nhưng lại làm tăng kích thước file Html .Cách thứ 3 được dùng rộng rãi nhất giúp bạn quản lý        source code dễ dàng và browser có thể lưu lại cache cho các file này .
  ## 2.Hạn chế việc thao tác trên các Dom
  Cùng xem một ví dụ sau:
  Ta có 2 trường hợp thao tác trên Dom
  -TH1
  
  ```
    for (var i = 0; i < 100; i++) {
      document.getElementById("test").innerHTML += "<span>" + i + "</span>";
    }
  ```
  
  -TH2
  
  ```
    var test = "";
    for (var i = 0; i < 100; i++) {
      test += "<span>" + i + "</span>";
    }
     document.getElementById("test").innerHTML = test;
  ```
  
  So sánh hiệu năng giữa hai cách trên chúng ta có thể nhận ra. Việc sử dụng thao tác trên Dom nhiều ảnh hưởng rất lớn đến tốc độ của trang web.
  ![](https://images.viblo.asia/ba71a002-4fbb-42f7-bcc0-ea07d708397b.PNG)
  
  ## 3.Nối các file css/js lại với nhau
    
  Việc tác cách file css/js như tôi đã nói phía trên sẽ giúp bạn quản lý code dễ dàng hơn , tuy nhiêu điều này lại khiến cho trình duyệt của chúng ta mất nhiều kết nối mới tải về đủ. Thông thường đối với việc tải các trang tài nguyên trình duyệt sẽ cho bạn từ 4 đến 8 kết nối đồng thời.
  Vì thế, hãy gộp các file CSS/JS của bạn lại để giảm số lượng kết nối cần thiết, và tăng tốc tải trang nhanh nhất có thể.
  
  ## 4.Tải Css trước Js
  Khi tải trang nếu trình duyệt của bạn gặp thẻ <script/> nó sẽ dừng việc load Html để ưu tiên cho việc tải các file Js về và khởi chạy. Điều này làm gián đoạn việc load các file html . Vì vậy nếu file js của bạn không phải xử lý đặc biệt thì nên lưu nó sau cùng .
  Ngược lại bạn nên tải các file css đầu tiên để người dùng khi đợi tải trang không phải thấy một trang web xấu xí khi chưa có CSS.
  
  ```
      <html lang="vi">
        <head>
            <meta charset="UTF-8" />
            <title>Test | KarmiPhuc</title>
            <link type='...' src='public/css/style.css'>
        </head>
        <body>
            <!-- HTML here -->
            ...
            <script type='...' src='public/js/script.js'>
        </body>
    </html>
  ```
  
  ## 5. Sử dụng các kĩ thuật tải không đồng bộ
   Khi lập trình một trang web thì việc làm tăng tương tác lên các mạng xã hội là điều rất phổ biến. (share Facebook, Twitter). Tuy nhiên đều này đòi hỏi bạn phải tải về các file cần thiết và đôi khi nó ngốn kha khá thời gian khi tải trang . 
   Có 2 cách để giải quyết vấn đề này .
   - Sử dụng JS để tải không đồng bộ các file JS bên ngoài
   
   ```
     (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
   ```
   
   - Sử dụng Iframe 
   
   ```
     (function() {
      var url = 'http://example.org/js.js';
      var iframe = document.createElement('iframe');
      (iframe.frameElement || iframe).style.cssText =
        "width: 0; height: 0; border: 0";
      iframe.src = "javascript:false";
      var where = document.getElementsByTagName('script')[0];
      where.parentNode.insertBefore(iframe, where);
      var doc = iframe.contentWindow.document;
      doc.open().write('<body onload="'+
        'var js = document.createElement(\'script\');'+
        'js.src = \''+ url +'\';'+
        'document.body.appendChild(js);">');
      doc.close();
     }());
   ```
   
   ## 6.Tránh sử dụng @import
   Có 2 cách để chèn file css vào trang web
   ```
     <link rel="stylesheet" href="file.css">
   ```
   Với cách này trình duyệt có thể tải nhiều file css đồng thời .
   ```
     @import url('style.css');
   ```
   Khi sử dụng @import file style.css chỉ được tải sau khi các file css gốc đã tải xong, hạn chế khả năng tải đồng thời của trình duyệt