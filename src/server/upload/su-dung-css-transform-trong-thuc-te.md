- Trong bài viết này, chúng tôi sẽ tìm hiểu cách sử dụng CSS transform trong thực tế để giải quyết các mục đích khác nhau và đạt được kết quả rất thú vị.  Cụ thể, bạn sẽ học cách điều chỉnh transform theo chiều dọc , tạo mũi tên đẹp mắt, xây dựng icon loading  và tạo hình  lật ngược sống động

## 1. Căn giữa theo chiều dọc

- Khi làm web cần căn giữa theo chiều dọc, yêu cầu này có vẻ khó khăn với người không thông thạo với css . Một số gợi ý sử dụng **display: inline** với **vertical-align: middle** hay display: table với 1số kiểu style đi kèm. Ngoài ra có thể giải quyết bằng Flexbox và Grids, nhưng đối với các component nhỏ hơn, sử dụng transform có thể là 1 lựa chọn đơn giản

- Căn giữa theo chiều dọc có thể phức tạp khi chiều cao của phần tử thay đổi. Tuy nhiên với việc sử dụng transform css lại giúp ta giải quyết vấn đề đó

- Xem ví dụ dưới đây: 

```
<div class="parent">
  <div class="child">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
  </div>
</div>

<div class="parent">
  <div class="child">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
  </div>
</div>
```

- Không có gì phức tạp: chỉ có hai khối  với một văn bản Lorem Ipsum có độ dài khác nhau.

- Hãy  đặt chiều rộng, chiều cao và đường viền cho **.parent**, cũng như một số khoảng cách để làm cho nó trông đẹp hơn:  

```
.parent {
  height: 300px;
  width: 600px;
  padding: 0 1em;
  margin: 1em;
  border: 1px solid red;
}
.child {
  font-size: 1.2rem;
}
```

Và kết qủa chúng ta nhận được như hình ảnh sau: 

![](https://images.viblo.asia/7bc0db69-2c6d-42bd-89a7-3e7c56a30f3c.png)

- Và khi khách hàng xem kết qủa của bạn họ yêu cầu: Hãy căn chỉnh văn bản ra giữa. Các bạn sẽ làm sao, chúng tôi sẽ hướng dẫn bạn căn giữa khi sử dụng transform.  Bước đầu tiên là cố định vị trí của **.child**  và di chuyển chúng xuống 50%


```
.child {
  font-size: 1.2rem;
  position: relative;
  top: 50%;
}
```

![](https://images.viblo.asia/ab8d353a-2a1f-4449-ad72-b7a587512b48.png)

- Sau đó, áp dụng một thành phần bí mật - thuộc tính **translateY** - sẽ định vị lại các element theo chiều dọc:

```
.child {
  font-size: 1.2rem;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
```

![](https://images.viblo.asia/1e09ca13-ed3f-459e-842e-37f7abb700e9.png)

- Trong thực tế một số developer đã nói rằng với cách này có thể khiến class con  bị mờ do yếu tố được đặt trên **“half pixel”** . Một giải pháp cho việc này là dùng **perspective** cho element con


```
.child {
  font-size: 1.2rem;
  position: relative;
  top: 50%;
  transform: perspective(1px) translateY(-50%);
}
```

- Link demo ví dụ: https://codepen.io/ngc-yn/pen/NWKrQgV

## 2. Tạo mũi tên( Arrows)

- Các bạn có thể tạo ra mũi tên bằng chỉnh sửa đồ hoạ và nó khá là tẻ nhạt. Chúng ta có thể tạo ra mũi tên bằng sử dụng thuộc tính **Scale** của transform
- Đầu tiên chúng ta tạo 1 box và có 1 mũi tên chỉ ra ngoài kiểu như dạng comment

```
<div class="box">
  <div class="box-content">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
  </div>
</div>
```

```
html {
  font-size: 16px;
}

.box {
  width: 10rem;
  background-color: #e0e0e0;
  padding: 1rem;
  margin: 1rem;
  border-radius: 1rem;
}
```

như hình ảnh này: 
![](https://images.viblo.asia/fe427cb4-a840-4bfb-9e5a-b19bb0a36dd8.png)

- Và tạo mũi tên bên phải box trên hình ảnh bằng sử dụng : **::before pseudo-selector**

```
.box::before {
  content: '';
  width: 1rem;
  height: 1rem;
  background-color: #e0e0e0;
  overflow: hidden;
}
```

- Chiều rộng và chiều cao càng lớn, mũi tên sẽ càng lớn.

Bây giờ di chuyển mũi tên sang phải và căn chỉnh nó theo chiều dọc:
```
.box {
  // ...
  position: relative;
}

.box::before {
  // ...
  position: absolute;
  right: -0.5rem;
  top: 50%;
  margin-top: -0.5rem;
}
```

![](https://images.viblo.asia/026f46d3-96bf-485f-a84c-bfc3e384919a.png)


-   Tất cả những gì chúng ta cần làm là xoay cái hộp nhỏ này để biến nó thành một hình tam giác, trông sẽ giống như một mũi tên. Bằng sử dụng **transform: rotate(45deg);** . Link demo https://codepen.io/ngc-yn/pen/JjPKQdg Kết qủa như hình ảnh bên dưới

![](https://images.viblo.asia/fd401f02-e872-4a1e-8ce5-4bbb5065cd17.png)


##  3. Tạo icon Loading với SVG

- Thật không may, những yêu cầu trên web ko xảy ra ngay lập tức. Người dùng thường phải chờ một khoảng thời gian để yêu cầu hoàn tất, có thể là gửi email, đăng bình luận hoặc tải ảnh lên. Do đó, một ý tưởng hay khác là hiển thị **loading** để để người dùng hiểu rằng họ sẽ phải chờ trong vài giây.

- Trước đây, khi không có animation và transform CSS, chúng ta đã sử dụng bằng hình ảnh GIF. Và giờ việc sử dụng ảnh GIF ko còn cần thiết vì CSS3 cung cấp các tùy chọn mạnh mẽ. Vì vậy, việc tạo ra các loading đẹp mắt bằng việc kết hợp giữa animation, svg và transform.


```
<svg class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"> <!-- 1 -->

  <circle class="path spinner-border" cx="33" cy="33" r="31" stroke="url(#gradient)"></circle> <!-- 2 -->

  <linearGradient id="gradient"> <!-- 3 -->
    <stop offset="50%" stop-color="#000" stop-opacity="1"></stop>
    <stop offset="65%" stop-color="#000" stop-opacity=".5"></stop>
    <stop offset="100%" stop-color="#000" stop-opacity="0"></stop>
  </linearGradient>
</svg>
```

- Chúng ta có một khung nhìn 66 × 66. ( **viewBox="0 0 66 66"**)
- Vòng tròn với trung tâm của nó nằm ở (33,33) và bán kính là 31px. Chúng tôi cũng có một nét 2px, có nghĩa là 31 * 2 + 2 * 2 = 66. Stroke = "url (#gradient) có nghĩa là màu của nét được xác định bởi một phần tử có ID là #gradient.
- Đó là gradient của chúng tôi cho vòng quay. Nó có ba điểm dừng đặt các giá trị độ mờ khác nhau, điều này sẽ dẫn đến một hiệu ứng khá tuyệt vời.

- Bây giờ style cho khung svg

```
.spinner {
  margin: 10px;
  width: 180px;
  height: 180px;
}
```

Bây giờ style cho **.spinner-Border, .spinner-dot **

```

.spinner-border {
  fill: transparent;
  stroke-width: 2;
  width: 100%;
  height: 100%;
}

.path {
  stroke-dasharray: 170;
  stroke-dashoffset: 20;
}
```
![](https://images.viblo.asia/bcbb3ee9-310e-4ce2-8ff4-d62bad92b1f5.png)

- Bây giờ cho nó quay 360 độ :
```
.spinner {
  // ...
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}

```

Link demo: https://codepen.io/ngc-yn/pen/OJLRZWo

## 4. Tạo những hình lật ngược

- Tạo một bức ảnh với một hình ảnh lật. Khi bạn di chuột qua một bức ảnh, nó lật và mô tả của nó được hiển thị.  Nó có thể hữu ích cho các trang web giống như Instagram.

Vì vậy, trước hết, hãy để tạo một layout:

```
<section class="container">

  <figure class="photo">
    <img src="https://images.freeimages.com/images/large-previews/535/natural-wonders-1400924.jpg" class="front side">

    <figcaption class="back side">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </figcaption>
  </figure>

  <figure class="photo">
    <img src="https://images.freeimages.com/images/large-previews/6d5/lake-at-the-cottage-1372381.jpg" class="front side">

    <figcaption class="back side">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </figcaption>
  </figure>

  <figure class="photo">
    <img src="https://images.freeimages.com/images/large-previews/a0d/autumn-tree-1382832.jpg" class="front side">

    <figcaption class="back side">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </figcaption>
  </figure>

</section>
```

- Ở đây chúng tôi có một container với ba hình ảnh. Những bức ảnh này sẽ thực sự có hai mặt: mặt trước và mặt sau, giống như một đồng xu có đầu và đuôi. Mặt trước chứa hình ảnh thực tế, trong khi mặt sau (không thể nhìn thấy ) chứa mô tả.
-  **.photo** được bố trí trong không gian 3D với  thuộc tính **transform-style**

```
.photo {
  transform-style: preserve-3d;
}
```

- Ban đầu ta ko nhìn thấy **.side** bằng cách sử dụng **backface**. và xoay nó 180 độ so với trục Y

```
.side {
  backface-visibility: hidden;
}

.back {
  transform: rotateY(180deg);
  text-align: center;
  background-color: #e0e0e0;
}
```

- Tiếp theo khi di chuột vào ảnh **.photo** thì ảnh sẽ xoay và bạn sẽ có thể nhìn thấy mặt sau của nó với mô tả. Bạn muốn nó diễn ra  một cách trơn tru, vì vậy hãy thêm  css **transition**:

```
.photo:hover {
  transform: rotateY(180deg);
  transition: transform 0.8s ease-in-out;
}
```

- Link demo : https://codepen.io/ngc-yn/pen/KKPgyzo


##  Kết Luận

-  Css Transform  và css Animation  là những công cụ rất mạnh dùng để tạo ra các hiệu ứng thú vị và đẹp mắt. Tuy nhiên, điều quan trọng là phải hợp lý về cách sử dụng của nó và không lạm dụng chúng. Hãy nhớ rằng bạn đang tạo trang web cho người dùng chứ không phải cho chính mình. Do đó, sử dụng chúng hợp lý để trải nghiệm người dùng tốt hơn, thay vì hiển thị tất cả các thủ thuật hay mà bạn đã biết được từ trước đến nay.
-  Còn một điều nữa quá nhiều hiệu ứng trên trang đôi khi làm mất tập trung của người dùng, một số ng dùng có thể bị say hoặc rối loạn tiền đình vì vậy họ khó có thể sử dụng một trang web với nhiều hiệu ứng. Trên hết, khi làm web bạn cần đảm bảo page của mình sẽ chạy dc trên các trình duyệt thay vì các hiệu ứng bị ẩn, ko thể truy nhập, hoặc ko hoạt động .
-  Trong bài viết này, chúng ta đã tạo ra những hiệu ứng đẹp mắt để giải quyết những mục đích khác nhau của thiết kế. Nếu các bạn có những cách hay và thú vị khi sử dụng transform hoặc có câu hỏi nào vui lòng chia sẻ ở bình luận
-  Link tham khảo bài viết: https://www.sitepoint.com/css-transforms-real-world/