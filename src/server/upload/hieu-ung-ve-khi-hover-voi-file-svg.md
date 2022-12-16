# Lời nói đầu
Trong những phần trước mình đã [hướng dẫn sử dụng SVG](https://viblo.asia/p/su-dung-svg-trong-html-css-the-nao-GrLZD892Zk0), [thay đổi đổi màu file SVG](https://viblo.asia/p/lam-the-nao-de-doi-mau-duoc-file-svg-Qbq5Q4yElD8) ở phần này mình sẽ viết về chủ đề tạo hiệu ứng với SVG và ở đây là hiệu ứng vẽ khi hover vào hình ảnh SVG
![](https://images.viblo.asia/65dc53c6-ee3e-459b-8c07-f5ad8cce75ef.png)
# Tìm hiểu vài thuộc tính của SVG
Bắt đầu với những ví dụ đơn giản để chúng ta dễ hiểu, để ý thấy hình trên đơn giản chỉ là một đường (path).
Nếu mở tập tin ảnh này trên trình biên soạn text (ví dụ: notepad), chúng ta sẽ thấy cấu trúc của file khá giống với mã HTML.
Mở 1 hình ảnh svg bất kì ta sẽ có vài thuộc tính như sau
![](https://images.viblo.asia/90dc9973-fbb7-4dc6-b7c8-c52dc138ed1b.png)
Hai thuộc tính cần lưu ý ở đây là stroke và stroke-width. Stroke quy định màu của phần tử, stroke-width quy định kích thước của phần tử.
Phần tử path này cũng có hai thuộc tính rất quan trọng mà chúng ta sẽ dùng để tạo hiệu ứng là:
stroke-dasharray
stroke-dashoffset
Hai thuộc tính nay điều khiển các dấu gạch ngang và khoảng trống tùy chỉnh cho stroke. Stroke-dasharray tùy chỉnh độ dài đoạn gạch nối, stroke-dashoffset tùy chỉnh khoảng cách giữa cách đoạn gạch. 
# Sử dụng css để tạo hiệu ứng
```CSS
svg {
  max-width: 95%;
  max-height: 95%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  &:hover {
    path {
      fill-opacity: 0;
      stroke: #000;
      stroke-width: 3;
      stroke-dasharray: 870;
      stroke-dashoffset: 870;
      animation: draw 10s infinite linear;
    }
  }
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
```
Trong phần này trọng nhất là xác định được chiều dài của path như ở đây là 870
```CSS
    stroke-dasharray: 870;
      stroke-dashoffset: 870;
```

Ta có thể lấy được chiều dài từng path với JAVASCRIPT

```JS

var path = document.querySelector('.path');
var length = path.getTotalLength();
```

# Codepen ví dụ:
https://codepen.io/phamngoc9x/pen/OebdMV

# Nguồn:
https://css-tricks.com/svg-line-animation-works/
https://codepen.io/MyXoToD/post/howto-self-drawing-svg-animation