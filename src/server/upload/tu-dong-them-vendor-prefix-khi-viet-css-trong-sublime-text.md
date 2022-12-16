Vendor Prefix nghĩa là tiền tố hay là phần thêm vào phía trước các thuộc tính CSS3, giúp cho các trình duyệt khác nhau có thể hiểu được thuộc tính CSS3 đó. Ví dụ, thuộc tính `transition` trong CSS3 hiện tại cần phải viết đầy đủ như sau để các trình duyệt khác nhau có thể hiểu được.
> CSS code:
```
.example {
  -webkit-transition: all 4s ease;
  -moz-transition: all 4s ease;
  -ms-transition: all 4s ease;
  -o-transition: all 4s ease;
  transition: all 4s ease;
 }
```

Và rất nhiều thuộc tính CSS3 khác nữa...

Có nhiều thuộc tính CSS3 vẫn đang thử nghiệm. Một thuộc tính CSS thử nghiệm đều phải sử dụng prefix, và như chúng ta đã biết, mỗi trình duyệt có tiền tố riêng của nó. Firefox sử dụng `-moz-`, Internet Explorer sử dụng `-ms-`, Chrome và Safari sử dụng `-webkit-`, và sử dụng Opera `-o-`(hoặc `-webkit-`).

Vấn đề ở đây là chúng ta không thể nào mất thời gian viết đi viết lại những prefix như vậy với mỗi lần sử dụng một thuộc tính CSS3, điều đó rất mất thời gian. Vì vậy, trong nội dung bài viết này, mình xin chia sẻ một cách để viết CSS prefix nhanh hơn dành cho những bạn dùng Sublime Text và không chuyên về CSS.

Dưới đây là các bước để thực hiện:

### 1. Cài đặt Node.js
Đầu tiên, chúng ta cần cài đặt NodeJS. Gói cài đặt có sẵn cho Windows, OSX và Linux mà bạn có thể tải xuống tại [đây](https://nodejs.org/download/). Nếu bạn không chắc liệu mình có NodeJS hay không, hãy chạy lệnh sau trong Terminal.

> `node -v`

Nếu NodeJS đã được cài đặt, nó sẽ trả về phiên bản, như hình dưới đây.

![](https://images.viblo.asia/b6355efb-bc32-4271-8dea-65c43c852a85.jpg)

### 2. Cài đặt AutoPrefixer
[Autoprefixer](https://github.com/postcss/autoprefixer) được phát triển bởi [Andrey Sitnik](https://sitnik.ru/en) . Sau đó nó được phát triển cho Sublime Text bởi [Sindre Sorhus](https://twitter.com/sindresorhus).

Lời khuyên là bạn nên cài đặt Package Control để cài đặt các Package dễ dàng hơn. Bạn có thể vào [đây](https://packagecontrol.io/installation) để xem hướng dẫn cách cài đặt Package Control. Sau đó, bạn có thể nhấn tổ hợp phím `Command + Shift + P` và chọn "Install Package". Sau đó tìm kiếm Autoprefixer như hình dưới đây và nhấn Enter để cài đặt.

![](https://images.viblo.asia/c6b4221d-a6b1-4617-afd9-6148ada97d81.jpg)

### 3. Sử dụng AutoPrefixer
Chúng ta có thể cấu hình AutoPrefixer trong Sublime Text bằng cách vào Preferences -> Package Settings -> AutoPrefixer. Ví dụ:

```
{
  "browsers": ["last 2 versions"]
}
 ```

Autoprefixer sử dụng cơ sở dữ liệu [CanIUse.com](https://caniuse.com) để thêm các prefix. CanIUse.com liệt kê các thuộc tính CSS3 cũng như số liệu thống kê sự hỗ trợ HTML5, JS và SVG trong các trình duyệt bao gồm việc sử dụng vendor prefix. Và như chúng ta có thể thấy từ thiết lập mặc định, Autoprefixer thêm tiền tố cho 2 phiên bản cuối cùng.

Nếu chúng ta lấy CSS3 Transition làm ví dụ, nó sẽ thêm tiền tố cho trình duyệt Webkit và Opera. 

![](https://images.viblo.asia/f2eefa66-4fe3-42ef-9582-120067e8aa14.jpg)

Và nếu muốn AutoPrefixer tự động thêm prefix cho bao nhiêu trình duyệt thì config tương tự, ví dụ 7 trình duyệt:

```
{
  "browsers": ["last 7 versions"]
}
 ```
 
 Nó cũng sẽ bao gồm `-moz-` cho Firefox
 
 ![](https://images.viblo.asia/9acb731d-bb8f-48db-9eba-467bfb04d258.jpg)
 
 Để thêm prefix, bạn có thể nhấn tổ hợp phím `Command + Shift + P` và chọn Autoprefix CSS như dưới đây:
 
 ![](https://images.viblo.asia/68ae0ea2-1696-4d23-b970-907e903f5318.jpg)
 
 Bây giờ, bạn có thể chỉ cần viết cú pháp CSS3 chuẩn và plugin này sẽ tự động prefix cho bạn trong tích tắc.
 
 Trên đây là bài viết ngắn của mình chia sẻ về cách viết CSS prefix nhanh hơn cho các bạn không chuyên về CSS. Hy vọng là sẽ giúp được các bạn khi áp dụng vào công việc.
 
 Tham khảo: [Hong Kiat](https://www.hongkiat.com/blog/css-automatic-vendor-prefix/)