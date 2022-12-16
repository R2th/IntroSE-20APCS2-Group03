### Giới thiệu
**Google fonts** với gần 1000 bộ fonts được dùng rất phổ biến, có tới **38 nghìn tỷ** lần được xem trên các ứng dụng web, các bạn có thể xem thống kê [tại đây](https://fonts.google.com/analytics).
Bài viết này mình sẽ giới thiệu một vài cách để cải thiện tốc độ tải google font cho trang web của bạn, hãy cùng bắt đầu nhé.

### 1. Giới hạn số lượng fonts sử dụng
Mỗi font chữ có thể chiếm tới **vài trăm kb**, vì vậy nếu bạn dùng càng nhiều bộ font thì nó sẽ càng chiếm nhiều tài nguyên hơn. 
Mình khuyên các bạn chỉ nên dùng tối đa 2 fonts cho trang web, một font cho thẻ tiêu đề, một font cho nội dung của trang web.
Kết hợp với sử dụng kích thước (font-size), trọng lượng (font-weight), màu sắc (color) để đạt được thiết kế tốt với chỉ tối đa 2 fonts chữ. 

### 2. Chỉ tải font style sử dụng
Có những bộ font mà ở đó có chứa nhiều loại style, tuy nhiên khi sử dụng bạn không cần sử dụng tất cả các loại style đó, vậy thì hãy chỉ import những style bạn sử dụng.
Ví dụ như font Roboto ở [đây](https://fonts.google.com/specimen/Roboto) có tới 12 styles

1. Thin 100
2. Thin 100 Italic
3. Light 300
4. Light 300 italic
5. Regular 400
6. Regular 400 italic
7. Medium 500
8. Medium 500 italic
9. Bold 700
10. Bold 700 italic
11. Black 900
12. Black 900 italic


Thông thường mình chỉ cần dùng chữ đậm, chữ nghiêng, và chữ không đậm (Regular 400, Regular 400 italic, Bold 700, Bold 700 italic), vậy thì không lý do gì mình phải tải cả bộ font cả:
```
// Tải tất cả styles
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">

// Chỉ tải styles sử dụng
<link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet">
```

### 3. Hạn chế requests
Thay vì tải mỗi một font bằng một thẻ **link** thì chúng ta có thể kết hợp lại để chỉ tải font vào 1 thẻ link duy nhất:
```
// Nhiều requests
<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet">

// Kết hợp requests
<link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i|Open+Sans:400,400i,600" rel="stylesheet">
```

### 4. Sử dụng DNS Prefetch/Preconnect
**DNS Prefetch** (tạm dịch là nạp trước DNS) là một kỹ thuật phân giải địa chỉ IP trước cho các tên miền web, được dùng để tăng tốc cho website.
Mục đích chính của **DNS Prefetch** là để tăng tốc độ trang web tải về nội dung khi trang này sử dụng nhiều tài nguyên dữ liệu từ các tên miền (domain) khác nhau. Do đó, thời gian tìm kiếm địa chỉ IP của các tên miền được rút ngắn giúp giảm thời gian tải trang web tổng thể.
```
// Sử dụng DNS Prefetch
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
```

**Preconnect** là một tính năng được hỗ trợ bởi các trình duyệt hiện đại để tăng hiệu năng trang web. **Preconnect** gợi ý trình duyệt để thiết lập kết nối đến tên miền khác trên nền ẩn backround để tiết kiệm thời gian cho DNS lookup , chuyển hướng, TCP handshake, TLS negotiation vv. Ý tưởng là để giảm độ trễ & tăng tốc tải tài nguyên nhanh chóng bằng cách phân chia từ một tên miền khác.
```
// Sử dụng Preconnect
<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
```

### 5. Lưu trữ fonts ở host
Một giải pháp khác là bạn có thể lưu trữ fonts ở host, nơi mà bạn đặt resource trang web, như vậy thì thay vì gửi request đến google font thì trang web sẽ tải font ở chính host của bạn.
Để làm được việc này bạn cần tải bộ source fonts về, google fonts trên github tại [đây](https://github.com/google/fonts).
Sau đó bạn khai báo và sử dụng font-face để kết nối với bộ font trên web.

### 6. Sử dụng thuộc tính font-display
Chúng ta có thể sử dụng thuộc tính css `font-display: swrap` để có font mặc định cho trang web trước khi font chính được tải xong, cách sử dụng như sau:
```
@font-face {
    font-family: 'Roboto';
    src: local('Roboto Thin Italic'),
  url(https://fonts.gstatic.com/s/roboto/v19/KFOiCnqEu92Fr1Mu51QrEz0dL-vwnYh2eg.woff2)
  format('woff2');
    font-display: swap;
  }
```

Thêm vào ở url
```
https://fonts.googleapis.com/css?family=Roboto&display=swap
```

### 7. Sử dụng text parameter
Nếu bạn chỉ cần sử dụng bộ font này cho một hoặc vài text như là logo trang web, thì bạn có thể truyền tham số text vào, khi đó kích thước font có thể giảm tới 90%
```
https://fonts.googleapis.com/css?family=Roboto&text=YourLogo
```

Ngoài ra với trường hợp này thì cá nhân mình khuyên các bạn không nên dùng font, bạn có thể dùng trình tạo ảnh như Photoshop hay Sketch ... để tạo Logo với font mà bạn cần rồi export ra thành ảnh rồi sử dụng.

### Kết luận
Đây là một số cách mình tham khảo được, hi vọng nó có thể giúp cho trang web của các bạn cải thiện hiệu năng khi sử dụng cùng google fonts.

Nguồn tham khảo [source](https://www.smashingmagazine.com/2019/06/optimizing-google-fonts-performance/)