Ngày nay, trong lĩnh vực lập trình web, chúng ta nhanh chóng nhận ra rằng không thể theo kịp với sự phát triển chóng mặt của các thiết bị điện tử (smartphone, tablet,..) mới với những độ phân giải màn hình khác nhau. Chính vì vậy thay vì thiết kế từng phiên bản phù hợp cho từng thiết bị thì giải pháp tối ưu là sử dụng responsive design - giúp trang web của chúng ta có thể phù hợp với tất cả các thiết bị.
![](https://images.viblo.asia/4fd77225-0cbb-42d3-ac82-247a586a8bea.jpeg)
# Responsive Web Design là gì
Responsive Web Design (RWD) là xu hướng mới theo đó quy trình thiết kế và phát triển web sẽ đáp ứng mọi thiết bị và môi trường của người dùng theo các tiêu chí kích thước và chiều của màn hình thiết bị. Responsive Web Design được tạo nên từ 3 thành phần cơ bản:

1. Flexible Grid based layout
2. Media Queries
3. Flexible Media
# Tại sao cần Responsive Web Design
1. Giúp  tiết kiệm rất nhiều thời gian và chi phí khi mà bạn không cần phải duy trì từng phiên bản web khác nhau cho điện thoại và máy tính
2. Responsive Web Design giúp cải thiện SEO (search ranking) cho trang web của bạn khi mà mọi luồng đều chỉ dẫn đến một địa chỉ URL duy nhất thay vì nhiều URL khác nhau. Các báo cáo Google Analytics của bạn sẽ vẽ nên một bức tranh tốt hơn về việc sử dụng trang web của bạn vì dữ liệu từ người dùng di động và máy tính để bàn sẽ được hợp nhất. Điều tương tự cũng xảy ra với các chỉ số (like, chia sẻ) trên các trang mạng xã hội như Facebook, Twitter,...
3. Responsive Design giúp bạn dễ dàng bảo trì trang web khi mà nó không liên quan gì đến phía server, chỉ việc thay đổi html và css để thay đổi giao diện hoặc bố cục thích hợp với các thiết bị khác nhau.

Chúng ta sẽ đi vào tìm hiểu từng thành phần và cách sử dụng chúng.
# I. Flexible Grid Based Layouts
## 1. Viewport

> Viewport là khung hình người dùng nhìn thấy trên thiết bị của họ khi vào một trang web bất kì. Với mỗi thiết khác nhau lại có viewport khác nhau. Nếu trang web cố định kích thước thì trình duyệt sẽ tự động thu nhỏ nội dung khi chuyển từ màn hình máy tính qua smartphone - điều này tạo nên trải nghiệm không tốt cho người dùng.

Thật may thay HTML5 cung cấp cho chúng ta phương pháp kiểm soát view một cách dễ dàng thông qua thẻ `<meta>` :
```sql:js
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
`width=device-width`: thiết lập chiều rộng của trang web theo chiều rộng của thiết bị

`initial-scale=1.0`: thiết lập mức độ zoom ban đầu khi trang web được load bởi trình duyệt

Xem qua ví dụ sau đây để thấy rõ sự khác biệt khi sử dụng `viewport` và khi không sử dụng `viewport`:

![](https://images.viblo.asia/f9eb61b7-8bf6-4fe3-b9fb-b170994b5715.png)

## 2. GridView
![](https://images.viblo.asia/b9244f4e-1c84-4c34-8556-750a9c59e8ee.png)
Rất nhiều trang web được xây dựng trên gridview, có nghĩa là trang web được chia thành các cột đều nhau. Một gridview thường có 12 cột ứng với 100% độ rộng và sẽ thu nhỏ hoặc mở rộng khi bạn thay đổi kích thước trình duyệt. Việc sử dụng gridview sẽ giúp bạn dễ dàng đặt vị trí các phần tử trên trang hơn, thuận lợi cho việc thực hiện responsive về sau.

Cùng xem qua ví dụ sau:
```css:js
.container {
  width: 538px;
}
section,
aside {
  margin: 10px;
}
section {
  float: left;
  width: 340px;
}
aside {
  float: right;
  width: 158px;
}
```
![](https://images.viblo.asia/849ece92-4dcb-4d4b-ae28-e0b0de52ad36.png)

Ở đây các phần tử được giữ cố định nên khi thay đổi kích thước container thì kích thước các phần tử bên trong vẫn không thay đổi. Thay vào đó chúng ta có thể sử dụng `%` hoặc `em` để giúp các phần tử thay đổi theo kích thước của container
```css:js
section,
aside {
  margin: 1.858736059%; /*  10px ÷ 538px = .018587361 */
}
section {
  float: left;
  width: 63.197026%;    /* 340px ÷ 538px = .63197026 */   
}
aside {
  float: right;
  width: 29.3680297%;  /* 158px ÷ 538px = .293680297 */
}
```

![](https://images.viblo.asia/af8fd501-e431-4a75-9712-855f253056f4.png)

> Lưu ý: Trong nội dung trên Grid-View sẽ được xây dựng hoàn toàn 1 cách thủ công để chúng ta có thể hiểu rõ cơ chế hoạt động của 1 Grid-View là như thế nào, hoàn toàn không phụ thuộc vào các thư viện CSS có sẵn như Bootstrap hay Foundation.
> 
Ngoài ra chúng ta có thể sử dụng các class của bootstrap để chia grid. 
```js
<div class="row">
  <div class="col-3">...</div> <!-- 25% -->
  <div class="col-9">...</div> <!-- 75% -->
</div>
```
Xem thêm tại: https://getbootstrap.com/docs/4.0/layout/grid/

Tuy nhiên Flexible grid layout không là không đủ. Khi trang web có độ rộng nhỏ thì kích thước các phần tử bên trong cũng nhỏ theo khiến nội dung hiển thị không tốt. Để giải quyết vấn đề này chúng ta cùng đi đến phần tiếp theo.
# II. Media Queries
> Media Queries là một kỹ thuật CSS được giới thiệu trong CSS3. Ta sử dụng cú pháp @media để bao gồm một khối các thuộc tính CSS chỉ khi một điều kiện nhất định là đúng. Nói một cách đơn giản là ta sẽ định nghĩa CSS riêng cho một nhóm các thiết bị có kích thước giống nhau.
> 
Media Queries có thể được sử dụng trực tiếp trong thẻ HTML hoặc viết bên trong file css. ( Nên sử dụng `@media` bên trong css để tránh việc phải viết lặp lại nhiều lần)
```js
<!-- Separate CSS File -->
<link href="styles.css" rel="stylesheet" media="all and (max-width: 1024px)">
```
```js
/* @media Rule */
@media all and (max-width: 1024px) {...}

/* @import Rule */
@import url(styles.css) all and (max-width: 1024px) {...}
```sql
Mỗi media query có thể bao gồm một media type và theo sau bởi nhiều biểu thức. Các media types phổ biến bao gồm `all`, `screen`, `tv`,`print`. HTML5 còn bao gồm cả `3d-glasses`. Nếu media type không được chỉ định thì media query sẽ mặc định media type là `screen`.
## 1. Các biểu thức logic bên trong Media Queries
Có 3 loại toán tử logic khác nhau có thể sử dụng bên trong  media queries bao gồm `and`, `not` và `only`.

Sử dụng toán tử `and` trong media queries cho phép ta thêm điều kiện bổ sung. Ví dụ sau chọn tất cả các màn hình có độ rộng từ 800 đến 1024 pixels:
```js
@media all and (min-width: 800px) and (max-width: 1024px) {...}
```
Trong khi đó toán tử `not` lại phủ định truy vấn được xác định. Ví dụ dưới đây áp dụng với các thiết bị màn hình không màu ( đen và trắng screen):
```css:js
@media not screen and (color) {...}
```
Cuối cùng là toán tử only áp dụng cho truy vấn thỏa mãn điều kiện. Biểu thức dưới đây chỉ chọn màn hình hướng theo chiều dọc:
```css:js
@media only screen and (orientation: portrait) {...}
```
## 2. Media Features trong Media Queries 
Media feature xác định các thuộc tính hoặc thành phần nào sẽ được nhắm tới trong media queries.
### Height & Width

Đây chính là một trong những media feature phổ biến nhất xoay quanh việc xác định chiều cao và chiều rộng cho viewport của thiết bị hoặc browser. Chiều cao và chiều rộng được chỉ định qua từ khóa `height` và `width`.  Giá trị của `height` hoặc `width` có thể là đơn vị độ dài, tương đối hoặc tuyệt đối. Chúng còn thường được đi kèm với các tiền tố `min` và `max` để xác định giới hạn màn hình mà các truy vấn được áp dụng. Ví dụ 
```css:js
@media all and (min-width: 320px) and (max-width: 780px) {...}
```

### Orientation: Portrait / Landscape
Media queries còn được sử dụng để xác định hướng của browser thiết bị sử dụng từ khóa `orientation`, cho phép ta xác định thiết bị đang được xem nằm ở hướng dọc (`portrait`) hay ngang (`landscape`). Tính năng này được áp dụng chủ yếu trên các thiết bị di động. 
```css:js
@media all and (orientation: landscape) {...}
```
### Aspect Ratio 
Tỉ lệ khung hình (aspect ratio) trong media queries  cho phép ta chỉ định tỉ lệ chiều rộng\chiều cao của thiết bị mà truy vấn được áp dụng . Chúng cũng thường đi kèm với các tiền tố `min` và `max`. 
```css:js
@media all and (min-device-aspect-ratio: 16/9) {...}
```
### Resolution 
Tính năng độ phân giải (resolution) chỉ định độ phân giải của thiết bị đầu ra theo mật độ pixel, hay còn được gọi là điểm ảnh trên mỗi inch (DPI - **D**ots **P**er **I**nch) . Chúng sẽ **không** đi kèm với các tiền tố `min` và `max` mà thay vào đó là số điểm ảnh trên mỗi pixel `dppx` và số điểm ảnh trên cm `dpcm`. 
```css:js
@media print and (min-resolution: 300dpi) {...}
```
## 3. Nguyên tắc Mobile First trong Responsive
![](https://images.viblo.asia/3a0ecdce-19ac-47f9-ab91-34979e4fd259.png)
Moble First nghĩa là bạn luôn thiết kế ứng dụng cho màn hình mobile trước rồi mới đến các màn hình lớn dần. ( Điều này giúp trang web hiển thị nhanh hơn trên các thiết bị màn hình nhỏ hơn) .
Ví dụ :
```css:js

/*Smart phone nhỏ*/
@media screen and (min-width: 240px){

}
/*Iphone(480 x 640)*/
@media screen and (min-width: 320px){

}
/*Tablet nhỏ(480 x 640)*/
@media screen and (min-width: 480px){

}
/*Ipad dọc(768 x 1024)*/
@media screen and (min-width: 768px){

}
/*Ipad ngang(1024 x 768)*/
@media screen and (min-width: 1024px){

}
```
## 4. Media Queries Demo
```css:js
@media all and (max-width: 420px) {
  section, aside {
    float: none;
    width: auto;
  }
}
```
![](https://images.viblo.asia/6fe73dc2-b30c-41ae-b29e-afa6ef4459cd.png)
# III. Flexible Media
Cuối cùng nhưng không kém phần quan trọng chính là flexible media. Khi mà viewport thay đổi kích thước thì các đa phương tiện (ảnh, video,..) cũng cần có khả năng thay đổi sao cho phù hợp. 

Một cách thông dụng là set `width`  là `100%` cùng với `height: auto`. Khi đó ảnh hoặc video sẽ thay đổi chiều rộng và chiều cao sao cho phù hợp với độ dãn của màn hình.
```css:js
img {
  width: 100%;
  height: auto;
}
```
Nếu muốn ảnh hoặc video thay đổi theo viewport nhưng không quá kích thước gốc của nó ta có thể sử dụng thuộc tính `max-width`:
```css:js
img {
  max-width: 100%;
  height: auto;
}
```
# Tổng kết 
Như vậy là chúng ta đã cùng nhau tìm hiểu các khái niệm cơ bản của Responsive Web Design cũng như cách áp dụng chúng trong các trường hợp cụ thể. Hy vọng qua bài viết này các bạn có thể cải thiện responsive cho trang web của mình sao cho hợp lý và khoa học nhất. Cảm ơn các bạn đã theo dõi. 
# Nguồn tham khảo
https://www.w3schools.com/css/css_rwd_intro.asp
https://learn.shayhowe.com/advanced-html-css/responsive-web-design/
https://medium.com/level-up-web/best-practices-of-responsive-web-design-6da8578f65c4