Trang web của bạn không chỉ nên được tối ưu hoá về SEO mà cần cho người dùng trải nghiệm tốt về thời gian load trang. Google và các công cụ tìm kiếm khác cũng sẽ đánh giá trang web của bạn qua tốc độ load. Nếu trang web chậm, khách truy cập sẽ rời khỏi trang web để tìm kiếm một trang web tốt hơn tải nhanh và cung cấp nội dung tương tự hoặc tốt hơn.

> *Làm sao để tối ưu hoá được tốc độ trang web của bạn?*

Trang web của bạn được xây dựng bằng nhiều file trong đó phần lớn là HTML, CSS và JS, chứa hàng tấn mã được developer viết hoặc tự động tạo. Nhưng thường thì chúng ta chỉ chú ý đến việc tối ưu thuật toán, tối ưu xử lí ở phần controller, model hay là xử lí với database mà quên đi rằng HTML, CSS, JS cũng chính là những đối tượng chính mà chúng ta trả về phía client. Tốc độ của trang web ngoài các yếu tố do server thì còn phụ thuộc rất lớn vào kích thước, số lượng file phải tải về. Chính vì thế nên việc giảm được kích thước file lẫn số lượng file cần phải tải về thì cũng đồng thời tăng tốc độ tải file và giảm số lượng request lên server. Một cách tuyệt vời để giúp tăng tốc độ các file của bạn là thực hiện minify các HTML, CSS, JS . Việc minify có thể thực hiện bằng cách thủ công hoặc bằng plugins.
![](https://images.viblo.asia/84face19-aecf-45ac-a6d0-9e70d48bed6b.png)


### Minify là gì?

Minify được hiểu đơn giản là kĩ thuật dùng để giảm bớt dung lượng hiện có của các file. Minify trong HTML, CSS hay JavaScript không bao gồm việc đóng gói file mà nó chỉ đơn giản là loại bỏ các khoảng trắng dư thừa, các dấu xuống dòng hay các đoạn ghi chú và cả những định dạng mà máy tính không cần đến...Nhờ đó chúng ta có được các file có dung lượng nhỏ hơn rất nhiều.

### Minify loại bỏ những gì?

Khi quá trình minify được thực hiện, nó sẽ giúp loại bỏ khỏi source code của bạn những điều sau:
1. New line characters
2. Whitespace characters
3. Block delimiters
4. Comments

Tất cả các ký tự và comment này được thêm vào source code chỉ giúp developer đọc code dễ dàng hơn, khi minify đi sẽ giúp dữ liệu tổng thể được chuyển khi một trang web được yêu cầu từ máy chủ. Thật dễ dàng để phân biệt giữa một file được minified và một tệp un-minified, file minified có phần mở rộng là `.min`. Ví dụ: `header.min.css`

### Khác nhau giữa Minification và compression

Tránh nhầm lẫn giữa minify và nén, vì chúng không tương tự nhau. Cả hai đều dùng cùng mục đích là giảm kích thước file nhưng cách tiếp cận lại khác nhau.

Nén file là hành động làm giảm kích cỡ của một file, trong khi vẫn có thể bảo tồn và phục vụ sử dụng các dữ liệu gốc. Cách thức này cho phép các file dữ liệu chiếm ít dung lượng lưu trữ hơn, ngoài ra còn giúp truyền dữ liệu qua internet dễ dàng hơn nữa.

Minification code vẫn giữ nguyên tính hợp lệ. Bạn sẽ không muốn thử đọc hoặc làm việc với các file đã được minification, nhưng nó không phá vỡ bất kỳ quy tắc nào. Trình duyệt có thể đọc và sử dụng nó giống như file gốc (file chưa minification).

Minification tạo ra file mới, cái mà bạn sẽ sử dụng trong phiên bản production. Ví dụ, bạn tạo một file 'style.css' để làm việc trong quá trình phát triển và sau đó sẽ minify nó thành 'style.min.css' trong bản production.

### Minifying thủ công

Chúng ta đã hiểu minification là gì và sự khác biệt của nó so với nén, giờ cùng nhau giải quyết nó thử nhé!
Quá trình đầu tiên rất đơn giản, điều chúng ta cần làm là loại bỏ những thứ không cần thiết khỏi source code của mình. Hãy cùng xem một ví dụ nào:
```html
<!DOCTYPE html>
<html>
<head>
 <title>Portfolio</title>
 <meta charset=”utf-8">
 <meta name=”viewpoint” content=”width=device-width”, initial-scale=”1">
 <link rel=”stylesheet” href=”https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
 <script src=”https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
 <script src=”https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
<nav>
 <ul>
 <li>Home</li>
 </ul>
</nav>
</body>
</html>
```

Sau khi được minify nó sẽ như thế này: 
```html
<!DOCTYPE html><html><head><title>Portfolio</title><meta charset=”utf-8"><meta name=”viewpoint” content=”width=device-width”, initial-scale=”1"><link rel=”stylesheet” href=”https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> <script src=”https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script> <script src=”https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script></head><body><nav><ul><li>Home</li></ul></nav></body></html>
```
Có phải bạn thắc mắc là sao khó đọc phải không? Đúng vậy, có thể khó đối với con người nhưng với máy tính thì không. Mà chính định dạng trên loại bỏ tất cả các khoảng trắng không cần thiết làm cho file nhỏ hơn và giảm thời gian tải file.

### Sử dụng các Tool online

Thực hiện thủ công thì gây lãng phí thời gian, các tool dưới đây sẽ giúp bạn khắc phục điều đó.

##### HTML
[htmlcompress.com](https://htmlcompressor.com/) : Một công cụ minification trực tuyến cho phép bạn minify HTML, CSS và JavaScript.

HTMLMinifier: Bạn cũng có thể kiểm tra trình nén HTML dựa trên JavaScript này.

##### CSS
CSSminifier.com: Một công cụ đơn giản để sử dụng cho phép bạn minify CSS. Tất cả bạn cần làm là sao chép và dán mã của bạn và tải xuống phiên bản rút gọn dưới dạng file.

phpied.com: Đây là một công cụ phát triển sử dụng thu nhỏ CSS YUI Compressor.

##### JS
Jscompress.com: Đây là một trình nén JavaScript trực tuyến cho phép bạn nén và thu nhỏ tất cả các tệp JS của bạn tới 80% kích thước ban đầu của chúng. Sao chép và dán mã của bạn hoặc bạn có thể tải lên và kết hợp nhiều tệp và sau đó nén. Công cụ này cho phép bạn sao chép-dán mã của bạn và tải xuống mã được rút gọn

yui.github.io: Một công cụ có thể được sử dụng trong quá trình phát triển.


Cảm ơn bạn dành thời gian đọc bài viết!

Tham khảo: https://codeburst.io/how-to-minify-css-js-and-html-ddd9dbea25c6