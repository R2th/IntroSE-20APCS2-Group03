Sau [phần năm](https://viblo.asia/p/nhung-thuoc-tinh-thu-vi-trong-css-p5-Ljy5VqVMlra) về các thuộc tính thụ vị trong CSS, hôm nay có lẽ là bài viết cuối cùng về series này. Hi vọng những bài viết trước đã giúp ích cho việc học tập, làm việc của bạn :blush:
## 1. -webkit-overflow-scrolling
Thuộc tính này cho phép chúng ta cuộn màn hình một cách có quán tính trên các thiết bị iOS. Có hai giá trị:

- **auto**: sử dụng cuộn thông thường, cuộn sẽ dừng lại trong khoảnh khắc khi bạn gỡ ngón tay ra khỏi màn hình.
- **touch**: sử dụng quán tính khi cuộn, sẽ tiếp tục cuộn màn hình sau khi bạn gỡ ngón tay ra khỏi màn hình.
 
## 2. -webkit-touch-callout
Thuộc tính này cho phép chúng ta ẩn chú thích mặc định trên thiết bị iOS. Khi bạn chạm và giữ một đối tượng, một menu sẽ xuất hiện với các điều khiển thông tin.
- **none**: vô hiệu hóa chú thích
- **default**: chú thích được hiển thị

 ## 3. -webkit-scrollbar
 Thuộc tính này giúp chúng ta tùy chỉnh thanh scrollbar mặc định của trình duyệt. Có một cách để ẩn thanh cuộn trên một element.
```css
#container::-webkit-scrollbar {
  display: none;
}
```

Ngoài ra còn có một cách để tự động cuộn thanh cuộn trên IE10 + và Edge.
```css
html {
  -ms-overflow-style: ms-autohiding-scrollbar;
}
```
 ## 4. Animatable
 CSS animation là công nghệ được giới thiệu trong phiên bản CSS3. Nó cho phép chúng ta tạo hiệu ứng chuyển động mà không phải sử dụng Javascript hay Flash.
 
Chúng ta thường áp dụng các hiệu ứng **transition** trong giao diện cho  **opacity**, **background-color**, v.v. nhưng thật tuyệt khi biết rằng chúng ta có thể áp dụng **transition**  nhiều thứ khác, như **letter-spacing** chẳng hạn, ví dụ:
{@embed: https://codepen.io/gregh/pen/ZLYvBO}

Để tìm hiểu kĩ hơn về **CSS Animation** bạn có thể xem thêm ở [đây](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties)

### Tham khảo 
* [CSS-Tricks](https://css-tricks.com/lets-look-50-interesting-css-properties-values/)