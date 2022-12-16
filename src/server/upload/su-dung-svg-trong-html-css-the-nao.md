# Lời nói đầu
Các tính năng ưu việt của svg đã có quá nhiều các bài viết nói về nó, trong bài viết này mình sẽ chỉ giới thiệu về cách sử dụng SVG trong HTML/CSS.
# SVG là gì?
SVG (Scalable Vector Graphics), là một định dạng hình ảnh (tương tự như JPG, PNG,... mà chúng ta vẫn thường dùng) sử dụng cấu trúc XML để hiển thị hình ảnh dưới dạng vector.
Vì là hình ảnh dạng vector nên chúng ta có thể hiển thị, co giãn (scale) thoải mái mà không làm giảm chất lượng hình ảnh.
Một ưu điểm của SVG là tất cả mọi element và attribute của các element đó đều có thể animate
![](https://images.viblo.asia/ed74b8bb-e1da-4dfc-9a9c-abd1194c6cb5.png)
Ví dụ một file SVG để vẽ hình tròn: : 
```html
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
</svg>
```

# Dùng trong HTML thế nào?
## Dùng trực tiếp:
Bạn có thể chèn trực tiếp nội dung file SVG vào trang HTML, cho vào 1 cái thẻ DIV chẳng hạn.
```html
<div class="circle">
  <svg width="100" height="100">
    <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
  </svg>
</div>
```
## Dùng thông qua thẻ IMG
Hoặc bạn có thể dùng qua thẻ IMG như một hình ảnh bình thường.
```html
<img src="circle.svg" />
```
# Dùng trong CSS thế nào?
```html
<div class="icon-facebook"></div>
```
## Sử dụng Background Image
```css
.icon-facebook {
  background-image: url("facebook.svg");
  ...
}
```
## Sử dụng Mask Image
với width, height và background color tương ứng
```css
.icon-facebook {
    mask-image: url('facebook.svg');
   display: block;
   width: 20px;
   height: 20px;
   background-color: blue;
  }
```
# Nguồn
Bài viết phía trên được tham khảo từ Techblog.vn :https://techblog.vn/su-dung-file-svg-cho-website
và một số nguồn khác. Phần tới mình sẽ cùng tìm hiểu một số hiệu ứng khá hay khi sử dụng SVG