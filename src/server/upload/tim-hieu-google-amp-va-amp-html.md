Tính đến đầu năm 2018 thì trên thế giới đã có hơn 1,24 tỷ website. Vậy nên sự cạnh tranh giữa các website ngày càng lớn. Từ đó đòi hỏi các website cần tối ưu hơi để đáp ứng và tiếp cận đến nhiều người dùng hơn. Đặc biệt là trên các thiết bị di động, bởi số lượng người dùng các thiết bị di động để truy cập vào website ngày càng tăng. Để đáp ứng xu hướng đó, vào tháng 02/2016 Google đưa công nghệ **Google AMP** vào hoạt động. Vậy **AMP** là gì? =))

![](https://images.viblo.asia/9e0beac0-b9c0-47a4-b8ec-9dd2635a469c.jpeg)
## 1. Google AMP được hiểu như nào?
AMP(Accelerated Pages Mobile), được hiểu là tăng tốc độ cho các trang di động. Vậy nên từ cái tên chúng ta có thể biết được công nghệ này chỉ áp dụng cho website trên thiết bị di động.
Khi người dùng sử dụng thiết bị di động click vào đường dẫn của website (đã được hỗ trợ AMP) trên công cụ tim kiếm Google, Twitter thì ngay lập tức website sẽ được hiển thị.
### Để phân biệt các website được hỗ trợ AMP và các trang không được hỗ trợ như nào?
![](https://images.viblo.asia/9d93732a-13cd-4e84-9ee7-dfd56cce6ce6.png)

Từ hiển thị của google ta thấy kết quả tìm kiếm của trang 24h.com có icon của AMP ==> có hỗ trợ AMP trên thiết bị di đông.
Khi click vào kết quả của trang 24h.com thì nó sẽ hiển thị ngay lập tức còn trang m.vietnamnet.vn nó sẽ đá link rồi hiển thị (xem hình ảnh dưới đây)

![](https://images.viblo.asia/244fa32f-47fb-46a2-abb5-a8c328b1e791.png)

Đến đây chúng ta có thể hiểu phần nào về tác dụng của AMP và khi tìm kiếm trên các thiết bị di động thì chúng ta có thể nhận ra được trang nào được hỗ trợ.
## 2. Ưu điểm và nhược điểm 
###  Ưu điểm
* Tăng tốc độ tải trang so với trang web không cài AMP. Thường thì các trang AMP thường tải trang chưa đến 1 giây
* Tăng thứ hạng trong kết quả tìm của google trên thiết bị di động
* Tăng hiệu suất quảng cáo cho chiến dịch quảng cáo trên google
### Nhược điểm
* Ảnh hưởng đến doanh thu quảng cáo trên website
* Không thể sử dụng các file js nằm ngoài thư viện AMP JS, một số thẻ HTML bị cấm dùng
* Khó cài đặt do phải chỉnh sửa cho đúng chuẩn AMP

### Cách kiểm tra một trang AMP
1. Nếu sử dụng trình duyệt chrome ta có thể cài [AMP Validator](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc?hl=vi)
2.  Hoặc copy trang bạn cần kiểm tra rồi vào trang web có [link ở đây ](https://search.google.com/test/amp?utm_source=support.google.com/webmasters/&utm_medium=referral&utm_campaign=%207320015)để kiểm tra

***Lưu ý**: Mặc dù được google hỗ trợ về tốc độ và ưu tiên thứ hạng trên công cụ tìm kiếm nhưng tính đến hiện tại AMP vẫn chưa được áp dụng nhiều, tìm kiếm thì thấy có một số trang như 24h.com, vnexpress. Google AMP chính thức hoạt động vào tháng 02/2016, vậy nên các website được tạo ra trước đó nếu muốn cập nhật công nghệ này thì khá vất vả, do  phải cập nhật lại các thẻ, xóa các thư viện js trước đó, ... có lẽ tạo mới thì tốt hơn =)). *


## 3. Cấu trúc 
trang amp được xây dựng từ ba thành phần:

* AMP HTML
    
    * HTML AMP về cơ bản là html mở rộng với thuộc tính AMP tùy chỉnh, các phần tử tùy chỉnh này , được gọi là các thành phần HTML AMP.
    * Trang AMP HTML mẫu sẽ có cấu trúc như sau: 
```html
<!doctype html>
<html ⚡>
  <head>
    <meta charset="utf-8">
    <title>Sample document</title>
    <link rel="canonical" href="./regular-html-version.html">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-custom>
      h1 {color: red}
    </style>
    <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "NewsArticle",
      "headline": "Article headline",
      "image": [
        "thumbnail1.jpg"
      ],
      "datePublished": "2015-02-05T08:00:00+08:00"
    }
    </script>
    <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <h1>Sample document</h1>
    <p>
      Some text
      <amp-img src=sample.jpg width=300 height=300></amp-img>
    </p>
    <amp-ad width=300 height=250
        type="a9"
        data-aax_size="300x250"
        data-aax_pubname="test123"
        data-aax_src="302">
    </amp-ad>
  </body>
</html>
```
    
* AMP JS
    * Là một thư viện js đảm bảo việc hiển thị nhanh các trang AMP HTML
    * Cung cấp các thẻ AMP HTML tùy chỉnh
    
* AMP Cache


    * Tìm nạp các trang AMP và lưu vào bộ nhớ cache và cải thiện hiệu năng trang một cách tự động
    * Hệ thống xác thực đánh dấu trang đáp ứng chuẩn AMP

##  4. Một số lưu ý trong việc sử dụng các thẻ AMP HTML
như đã nói ở các phần trên thì AMP HTML cơ bản là HTML mở rộng thêm các thuộc tính AMP, hay ở ví dụ mẫu trong phần 3 thì chúng ta cũng thấy phần nào sự khác biệt giữa HTML và AMP HTML. Vậy cụ thể các thẻ nó khác nhau ra sao?


| Thẻ HTML | AMP HTML |
| -------- | -------- |
| script     | Chỉ dùng trong trường hợp nội dung thẻ có dạng type="application/ld+json" hoặc văn bản     | 
| noscript     | Được dùng ở mọi nơi | 
| base     | Cấm dùng     | 
| img     | Chuyển thành  amp-img (thẻ amp-img không có thẻ kết thúc </amp-img>)  | 
| video     | Chuyển thành amp-video     | 
| audio     |Chuyển thành  amp-audio   | 
| iframe     | Chuyển thành   amp-iframe   | 
| frame     | Cấm dùng     | 
| frameset     | Cấm dùng      | 
| object     | Cấm dùng      | 
| param     | Cấm dùng      | 
| applet     | Cấm dùng      | 
| embed	     | Cấm dùng      | 
| frameset     | Cấm dùng      | 
| form     | Được dùng, thêm amp-form: `<script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>` | 
 | input elements     | Được dùng ngoại trừ một số dạng sau  `<input[type=image]>`, `<input[type=button]>`, `<input[type=password]>`, `<input[type=file]>` . Các thẻ tương tự cũng được dùng `<fieldset>`, `<label>`   | 
 | button     | Được dùng      | 
 | style     | Thẻ này phải có thuộc tính `amp-custom ` `<style amp-custom></style>`    | 
 | a     | thuộc tính href ko được bắt đầu bằng` javscript:`  . Nếu đặt thuộc tính target thì phải đặt là` _blank` . Nếu không không được dùng  | 
 


-----
## Kết luận 

 Có rất nhiều các để làm một trang web tốt lên. Trong số đó Google amp là một cách rất tốt để tối ưu hơn cho website. Tuy nhiên trong bài viết cũng đã đề cập đến những vấn đề khó khăn khi áp dụng công nghệ này vào.
 
## Tài liệu tham khảo 
* https://www.ampproject.org/learn/overview/
* https://ampbyexample.com/