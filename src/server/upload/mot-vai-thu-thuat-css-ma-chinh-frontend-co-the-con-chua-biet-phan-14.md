![](https://images.viblo.asia/25637ad0-68df-438c-af60-72ac51819af4.jpg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 14 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1. "One Page Scroll" mà không cần JS luôn! [Not Cross-Browsers]

Đã bao giờ bạn làm 1 trang web có hiệu ứng như thế này chưa nhỉ?

{@codepen: https://codepen.io/alvarotrigo/pen/NxyPPp}

Thì đây là những từ khoá bạn có thể tìm kiếm: `onepage scrolling`, `fullpage scrolling`

Theo từ khoá trên, bạn có thể tìm ra những plugin được viết bằng JS như:

- https://github.com/alvarotrigo/fullPage.js
- https://github.com/peachananr/onepage-scroll

Nhưng `CSS Scroll Snapping` đã thay đổi tư duy đó, tức nghĩa là chỉ cần vài dòng code CSS, bạn vẫn có thể tạo được hiệu ứng như trên.

Bạn có thể hình dung đại khái trông như này:

1. Disable scroll mặc định của html, thay vào đó là tạo vùng scroll cho thẻ div wrapper
2. Đặt vào thẻ div wrapper đoạn code này `scroll-snap-type: y mandatory`
3. Đặt vào thẻ children (là con trực tiếp của thẻ parent) đoạn code này `scroll-snap-align: start`
4. Xong rồi đấy!

Hãy thưởng thức demo dưới đây

{@codepen: https://codepen.io/tinhh/pen/BXjLxM}

> **Lưu ý rất quan trọng:** Scrolling bằng touchpad sẽ thấy rõ sự smooth của hiệu ứng hơn!

Hãy hiểu 1 điều rằng, CSS cũng có giới hạn về sức mạnh, không thể nào cover 100% chức năng của người dùng như là JS được!

Việc của dev là phải xem xét thật kỹ, trong dự án cụ thể của mình, có thể apply nó được hay không?

Với tính năng này của CSS, bạn có thể thêm chút JS (1 ít dòng code JS là nhẹ hơn rất nhiều so với 1 plugin) mà vẫn có thể implement được tương đối chức năng bằng JS trước đây như Slider, Carousel.

> Tóm lại là vẫn có ích nhiều lắm đấy nhé!

#### Đọc hiểu thêm

- https://developers.google.com/web/updates/2018/07/css-scroll-snap
- https://css-tricks.com/practical-css-scroll-snapping/
- https://nolanlawson.com/2019/02/10/building-a-modern-carousel-with-css-scroll-snap-smooth-scrolling-and-pinch-zoom/
- https://caniuse.com/#feat=css-snappoints

### 2. `text-decoration` thì ai không biết, nhưng `box-decoration` thì mới à nghen! [Not Cross-Browsers]

Thật ra thì chính xác thuộc tính tên là `box-decoration-break` nhé mọi người :joy: 

`box-decoration-break` rất đơn giản chỉ có 2 values là `slice` và `clone` 

Dưới đây là demo cho hiệu ứng `box-decoration-break: clone`

{@codepen: https://codepen.io/tinhh/pen/bXEgeR}

> Bạn lưu ý nhé! element được set `box-decoration-break` phải là dạng inline element nha!

#### Đọc hiểu thêm

- https://developer.mozilla.org/en-US/docs/Web/CSS/box-decoration-break
- https://css-tricks.com/almanac/properties/b/box-decoration-break/
- https://caniuse.com/#search=box-decoration-break

### 3. Style layout kiểu tạp chí với `shape-outside` [Not Cross-Browsers]

Tạp chí hay những tờ báo giấy thường rất hay có những style layout lạ mắt và nó thật sự đẹp. Nhưng đấy là thứ style mà đội designer họ thiết kế ra.

Vậy thì trên web, bằng cái thứ CSS với ngày càng nhiều sức mạnh được trang bị kia, liệu có làm được không?

Xin thưa với mọi người là hoàn toàn được nhé!

Hãy xem demo bên dưới

{@codepen: https://codepen.io/tinhh/pen/VoepGX}

Ví dụ trên là 1 cách dùng `shape-outside` đơn giản nhất, là value được cung cấp sẵn `circle()`.

Ngoài ra nó còn cung cấp các value có khác như:

- `ellipse()`
- `inset()`
- `polygon()`
- `url()`

Với những hình dạng không phải là hình tròn, thì bạn vẫn có thể hoàn toàn customize được hình dạng theo ý muốn bằng các điểm (points)  được sét trong `shape-outside: polygon( your values)` nhé!

#### Đọc hiểu thêm

- https://developer.mozilla.org/en-US/docs/Web/CSS/shape-outside
- https://css-tricks.com/almanac/properties/s/shape-outside/
- https://twitter.com/pmarquees/status/1151468771590193152
- https://caniuse.com/#search=shape-outside

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!