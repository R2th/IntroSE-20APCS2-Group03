Dưới đây là một số mẹo khi viết Css
### 1. Hiển Thị Ảnh:
```css
img.QRcode {
  image-rendering: pixelated;
}
```
thuộc tính image-rendering rất hữu dụng trong việc hiển thị mà QR và các ảnh thumbnails trong việc chất lượng của ảnh
### 2. Sử dụng thuộc tính css với Safari 11+:
```css
@supports (padding: env(safe-area-inset)) {
  /* Your code for Safari 11+ */
}
```
Hàm env và biến môi trường ( environment variables ) được viết bởi Safari 11 trở lên, nhằm mục đích hỗ trợ hiển thị màn hình Iphone X
### 3. Kiểm tra xem có phải 1 node rỗng không
```css
my-component:empty {
  display: none;
}
```
Dùng để ẩn phẩn tử khi nó không có nội dung bên trong.
### 4. Tạo khối cho văn bản
```css
p {
  shape-outside: polygon(0 0, 0 200px, 300px 600px);
}
```
Thay đổi cách nội dùng bọc xung quanh phần tử 
### 5.Sử dụng SVG như ảnh background
```css
my-component {
  background-image: url('data:image/svg+xml;utf8,<svg>...</svg>');
}
```
Sử dụng thẻ <svg> làm background mà không cần chuyển sang base64

##### [Nguồn](https://dev.to/clabuxd/hot-tips-css-4jmc)