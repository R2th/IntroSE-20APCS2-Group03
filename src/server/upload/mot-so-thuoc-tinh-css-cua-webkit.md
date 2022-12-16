## **aspect-ratio**
Tính năng này dùng để kiểm tra tỷ lệ khung hình của viewport, được dùng kết hợp với media queries
Cú pháp như sau:
```css
/* Exact aspect ratio */
@media (aspect-ratio: 1/1) {
  div {
    color: red;
  }
}

/* Minimum aspect ratio */
@media (min-aspect-ratio: 8/5) {
  div {
    background: yellow;
  }
}

/* Maximum aspect ratio */
@media (max-aspect-ratio: 2/1) {
  div {
    border: 2px solid blue;
  }
}
```
{@embed: https://codepen.io/buiduccuong30051989/pen/qgwrjv}

## -webkit-appearance****
Sử dụng thuộc tính này ta có thể biến một thẻ span trở thành giống như 1 radio input, nói chung là làm thay đổi cách hiển thị của các thành phần html mặc định.

Cú pháp như sau: 
```css
span.lookLikeRadio {
	-webkit-appearance: radio;
}

span.lookLikeTextarea {
	-webkit-appearance: textarea;
}

span.lookLikeScrollbar {
	-webkit-appearance: scrollbartrack-horizontal;
}
```

{@embed: https://codepen.io/buiduccuong30051989/pen/KJYmPB}

## -webkit-text-security****
Thuộc tính này dùng để style input dạng password, dùng để thay đổi các dấu ký tự tròn thành các hình thù khác hay ho hơn. Mục đích chính để đáp ứng design.
Cú pháp: 

```css
input.pw { -webkit-text-security: disc; }
input.pw2 { -webkit-text-security: circle; }
input.pw3 { -webkit-text-security: square; }
```

{@embed: https://codepen.io/buiduccuong30051989/pen/ZwZKWP}