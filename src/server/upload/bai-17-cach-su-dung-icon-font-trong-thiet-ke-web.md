Chào các bạn!
Ngày nay thiết kế web ngày càng phát triển và ngày càng có nhiều kỹ thuật mới được sử dụng, một trong những kỹ thuật khá hay đó là dùng **icon font**. Khái niệm chắc các bạn  cũng đã từng nghe và sử dụng.  Tuy nhiên, bạn dùng nó nhưng bạn đã hiểu khái niệm thực sự của **icon font** là gì chưa?  Và những ưu điểm, lợi ích mà icon font mang lại khi sử dụng nó là gì? Bài viết này mình sẽ nói cụ thể hơn vế icon font nhé.

## 1. Khái niệm icon font

Như chúng ta đã biết, ảnh bitmap thì hiển thị không tốt khi bị thay đổi kích thước, chúng ta sẽ thấy ảnh bị vỡ khi phóng to và mất chi tiết khi thu nhỏ và mỗi ảnh lại cần một http request khi load, điều này cũng góp phần làm giảm tốc độ load site của bạn. Và nếu muốn đẹp chắc chắn chúng ta phải dùng photoshop tạo ra nhiều kích cỡ, điều này quả thực là rất mất thời gian. Với font thì chúng ta không gặp phải những vấn đề này, font có thể phóng to thu nhỏ thoải mái, ko yêu cầu http request cho từng ký tự, thường chúng ta cứ nghĩ là font thì chỉ dùng để viết nhưng thực ra chúng có thể chứa trong mình các biểu tượng và chúng ta gọi những font như vậy là icon font

Icon font là cách thức dùng những font chữ được thiết kế đặc biệt để thay thế cho các hình ảnh được dùng trong việc thiết kế website, đặc biệt với những website hỗ trợ responsive thì điều này càng cần thiết vì khi đó các hình ảnh cần có kích thước khác nhau trên các thiết bị khác nhau và nếu chỉ dùng một hình ảnh thì sẽ không thể tạo được sự sắc nét khi hiển thị với nhiều kích thước và icon font ra đời để khắc phục nhược điểm này.

## 2. Ưu điểm của icon font

Icon font ngày được sử dụng rộng rãi trong các website hiện nay. Icon font mang nhiều ưu điểm:

- Giảm số lượng HTTP Request, giúp website của bạn load nhanh hơn.
- Dễ dàng thay đổi màu sắc, kích thước của biểu tượng.
- Cung cấp nhiều biểu tượng phù hợp giúp bạn tiết kiệm thời gian thiết kế.
- Có thể sử dụng CSS3 như transition, transform, text-shadow giúp các icon được linh hoạt hơn.
- Phóng to thu nhỏ dễ dàng
- Các trình duyệt phổ biến đều hỗ trợ
- Kích thước file nhỏ gọn

## 3. Cách sử dụng icon font

Mỗi thư viện icon font sẽ có các class nhúng khác nhau nhưng chung quy lại thì phương pháp khai báo thư viện đều như nhau.
Để an toàn nhất thì khi dùng, bạn nên download cả bộ về, giải nén rồi ném vào thư mục font trong dự án. Nếu trong folder font mà bạn download về có sẵn file css khai báo thì chỉ cần làm 1 bước đơn giản là khai báo file css đó thôi. Còn không có file css thì bạn có thể khai báo icons vào trong CSS đơn giản như sau:

```
@font-face {
  font-family: 'your-fonts';
  src: url('fonts/your-fonts.eot');
  src: url('fonts/your-fonts.eot?#iefix') format('embedded-opentype'),
       url('fonts/your-fonts.woff') format('woff'),
       url('fonts/your-fonts.ttf') format('truetype'),
       url('fonts/your-fonts.svg#[set]Foundicons') format('svg');
  font-weight: normal;
  font-style: normal;
}

[class*="icon-"] {
	font-family: 'your-fonts';
	speak: none;
	font-style: normal;
	font-weight: normal;
	font-variant: normal;
	text-transform: none;
	line-height: inherit;
	-webkit-font-smoothing: antialiased;
}

[class*="icon-"]:before {
  content: "your-fonts-character";
}
```

## 4. Một số thư viện icon font miễn phí

### 4.1.  Font Awesome

Hiện tại bộ font icon này chưa hơn 600 biểu tượng đủ mọi chủ đề. 
Với bộ icon này bạn có thể tự do tùy chỉnh màu, kích thước, thông qua css.
Đặt biệt bộ icon này ko yêu cầu javascript, tương thích với mọi trình duyệt.

Thư viện này hiện tại cung cấp 2 version.

#### 4.1.1. Version cũ 4.7

https://fontawesome.com/v4.7.0/icons/

![](https://images.viblo.asia/dcdee9b3-06d9-4fd2-b54d-79b6acf6df84.png)

#### 4.1.2. Version mới 5.0.x

https://fontawesome.com/icons?d=gallery

![](https://images.viblo.asia/1fc3b807-da2d-48ea-9794-9b4e196b074e.png)

### 4.2.  Material Icon Font

https://material.io/icons/

Đây là thư viện icon google xây dựng để cung cấp cho các dự án web.
Các bạn có thể down icon về dưới dạng SVG, PNG hoặc chèn vào web site dưới dạng các đoạn mã.
Bộ sưu tập này đang được mở rộng.

![](https://images.viblo.asia/5cd1f2db-1af5-4f7f-b4d0-da468fb6fe75.png)

### 4.3.  IcoMoon

https://icomoon.io/app/#/select

Thư viện chứa hơn 4000 icon vector
Bạn có thể tùy chọn chỉnh sửa các icon trong quá trình tạo
Các biểu tượng có thể được xuất ra các dịnh dạng: SVG, Polymer, PDF, CSH, XAML, PNG …
Bạn có thể inport các icon dạng SVG để tùy chỉnh.

![](https://images.viblo.asia/5a26a199-818c-4b62-9709-8a71195654d4.png)

### 4.4.  Ionicons

http://ionicons.com/

Thư viện này chứa rất nhiều icon đẹp mắt.

![](https://images.viblo.asia/03296f7b-3b09-462b-966d-e5db13b6b420.png)

## 5. Kết bài

Như vậy, qua bài này các bạn cũng đã hiểu thêm được về icon font. Với những ưu điểm mà mình đã kể trên thì việc sử dụng icon font trong thiết kế web là sự lựa chọn rất chính xác. Mình cũng luôn lựa chọn cách sử dụng icon font thay vì phải sử dụng ảnh nhiều.
Ngoài 4 thư viện mà mình kể bên trên thì còn rất nhiều thư viện miễn phí khác cho các bạn sử dụng. Hãy lựa chọn những thư viện thích hợp nhất cho website của bạn nhé. 
Chúc may mắn!