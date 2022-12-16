# 1. Căn giữa với Flexbox
Kể từ khi có sự xuất hiện của Flexible Box Layout Model (hay flexbox), nó trở nên rất phổ biến vì việc định vị (positioning) và căn chỉnh (aligning) element đã trở nên dễ dàng hơn bao giờ hết. Sử dụng flexbox giúp căn chỉnh dọc nhanh, đẹp và dễ dàng làm tiền đề cho các bước xử lý phức tạp hơn.

{@embed: https://codepen.io/annafromduomly/pen/eYYgNQb}

```css
display: flex;
align-items: center;
justify-content: center; 
```

Như các bạn có thể thấy trong đoạn code trên sẽ đảm bảo phần tử con sẽ nằm chính xác ở phần giữa của phần tử cha. Thật đơn giản phải không nào. :grin:

# 2. Chế độ Blend
Có hai thuộc tính cho chế độ blend: **mix-blend-mode**, định nghĩa pha trộn giữa phần tử và phần tử phía sau nó; và **background-blend-mode**, định nghĩa pha trộn giữa hình nền và màu nền của phần tử. Hãy cùng xem cách thức hoạt động của nó:

{@embed: https://codepen.io/annafromduomly/pen/NWWdOPN}

Trong đoạn code trên, bao gồm 1 ảnh nền (**background image**) và thẻ header **`<h1>`** với nội dung `NATURE`. Đoạn text header trên sẽ là phần tử được sử dụng để blend với hình nền. Ở đây mình sử dụng giá trị **`overlay`** cho blend-mode, nhưng ngoài ra còn có các giá trị khác nữa có thể thiết lập cho nó. Các bạn có thể tham khảo thêm tại [**đây**](https://developer.mozilla.org/en-US/docs/Web/CSS/blend-mode) để biết thêm các giá trị khác cũng như cách thức hoạt động của chúng.

Kế tiếp là ví dụ về background-blend-mode:

{@embed: https://codepen.io/annafromduomly/pen/JjjEmyx}

# 3. Hiệu ứng Parallax
Parallax là một xu hướng rất phổ biến nếu nói về các hiệu ứng khi scrolling trong css. Parallax hiểu đơn giản là khi scroll thì tốc độ scroll của content hoặc foreground sẽ khác (nhanh hơn hoặc chậm hơn) với tốc độ scroll của background:

{@embed: https://codepen.io/annafromduomly/pen/oNNBQeL}

Trong ví dụ các bạn có thể thấy đoạn text **SWEETIES** và background image của đang di chuyển với tốc độ khác nhau phải không. Việc sử dụng `transform: translateZ(...);`, sẽ giúp cho làm scroll nhanh 1 phần tử và làm chậm phần tử còn lại.

# 4. Shape outside
Mặc dù không quá phổ biến nhưng shape-outside cũng là 1 tính năng tuyệt với được css cung cấp. Nó quyết định cách nội dung sẽ bao quanh phần tử được float. Hãy cùng xem cách thức hoạt động của nó nào:

{@embed: https://codepen.io/annafromduomly/pen/MWWJZyw}

Trong đoạn code, các bạn có thể thấy rằng đoạn text bao quanh lấy vòng tròn. Ngoài ra chúng ta cũng có thể thay thế hình tròn bằng hình ảnh, hình tam giác, hình vuông, v.v. 

# 5. Clip path
Thuộc tính css clip-path tạo một vùng cắt để lọc ra phần nào của phần tử sẽ được dùng để hiển thị. Các phần bên trong khu vực chỉ định sẽ được hiển thị, trong khi những phần bên ngoài sẽ bị ẩn đi. Dưới đây là 1 ví dụ về cách thức hoạt động của nó:

{@embed: https://codepen.io/annafromduomly/pen/KKKaJyX}

Ngoài ra còn có thể kết hợp với kỹ thuật masking để tạo nên các hiệu ứng khác khá thú vị. Các bạn có thể xem thêm tại [**đây**](https://viblo.asia/p/interactive-effects-with-css-clip-path-vyDZOwoxZwj)
# 6. Image filters
Chỉ với hình ảnh có thể mang lại cho ta nhiều hiệu ứng tuyệt vời cho bố cục và giúp tạo ra kết quả tuyệt với khác nhau. Css cho phép sử dụng nhiều bộ lọc trên hình ảnh để thay đổi hình ảnh không cần phải thông qua Photoshop. Dưới đây là ví dụ về các bộ lọc chúng ta có thể sử dụng trên cùng 1 hình ảnh:

{@embed: https://codepen.io/annafromduomly/pen/PooKweE}

# 7. CSS animations
Ảnh động (animation) thường thu hút sự chú ý của end user trên trang web và đây là lý do tại sao nó thường được sử dụng trong các trang web. Với css việc tạo ra 1 animation là rất dễ dàng và đa dạng, dưới đây là 1 ví dụ tiêu biểu về animation trong CSS:

{@embed: https://codepen.io/annafromduomly/pen/abbyzeZ}

Trong đoạn code trên, mình đã tạo ra một chấm nhỏ thay đổi vị trí và độ mờ cứ sau 25% của chu kỳ chuyển động cho đến 100% rồi sau đó lặp lại chuỗi chuyển động đó. Ngoài ra cũng có thể thay đổi màu sắc và các thuộc tính khác của phần tử.
# 8. Masking
Nếu bạn đã từng làm thiết kế đồ họa, có lẽ bạn biết kỹ thuật masking hữu ích như thế nào. Kỹ thuật này cũng có thể được sử dụng trong CSS. Dưới đây là 1 ví dụ về masking:

{@embed: https://codepen.io/annafromduomly/pen/qBBXdxp}