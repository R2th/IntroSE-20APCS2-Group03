![](https://images.viblo.asia/dcf949c6-1e26-4be3-a57c-57f2ef3c2c0a.jpeg)

## 1. Introduction

Thuộc tính `clip-path` tạo ra một vùng cắt nơi nội dung bên trong nó được hiển thị và nội dung bên ngoài nó bị ẩn đi.

Đây là một ví dụ cơ bản về `clip-path: circle`.

```css
.card {
  background-color: #77cce9;
  clip-path: circle(80px at 50% 50%);
}
```

![](https://images.viblo.asia/cea00671-8c25-48d8-8858-762c7ffc5174.png)


Với việc sử dụng `clip-path`, vùng hiển thị chỉ là vòng tròn màu xanh lam (`#77cce9`).

Bất cứ phần nào bên ngoài vòng tròn là vô hình.

Đây là một hình ảnh động cho thấy một đoạn cắt của vòng tròn trong ví dụ trước.

![](https://images.viblo.asia/74d847fd-9ad0-4968-8111-526eae50a72f.gif)


## 2. The Coordinate System

Trước khi đi sâu vào chi tiết của `clip-path`, cần đề cập đến cách thức hoạt động của hệ trục tọa độ. 

Điểm gốc là điêm góc trên cùng bên trái với trục x hướng sang phải và trục y hướng xuống dưới.

![](https://images.viblo.asia/6bd555d6-ea3d-4eef-8d42-3c8425c5390a.png)

Với ý nghĩ đó, hãy lấy một ví dụ đơn giản để xem cách một phần tử sử dụng `clip-path`.

Trong ví dụ bên dưới, vùng bị cắt là một hình tròn có kích thước `100px` và tâm của nó được đặt ở vị trí `0,0` (top left).

![](https://images.viblo.asia/9efcd344-2e88-4dd4-abbf-8358f95cedad.png)

Lưu ý rằng người dùng chỉ có thể nhìn thấy khu vực được đánh dấu (màu xanh lam đậm).

Phần còn lại của hình tròn được cắt bớt (cliped).

Câu hỏi đặt ra là, làm thế nào chúng ta có thể hiển thị toàn bộ vòng tròn?

Đó là việc chúng ta cần thay đổi các điểm trục x và trục y.

![](https://images.viblo.asia/eb039309-4eac-473a-91ea-93e84510d568.png)

Tâm của vòng tròn được đặt `100px` từ bên trái và `100px` từ trên cùng.

Bây giờ bạn đã hiểu cách hoạt động của hệ tọa độ, tôi sẽ giải thích các giá trị có thể có cho thuộc tính `clip-path`.

## 3. The Clip-Path Values

### 3.1 Inset

Giá trị `inset` xác định một hình chữ nhật `inset`.

Chúng ta có thể kiểm soát bốn cạnh, giống như chúng ta xử lý `margin` hoặc `padding`.

Trong ví dụ sau, `.card` có độ dài `20px` từ tất cả các cạnh (trên, phải, dưới và trái).

```css
.card {
  clip-path: inset(20px);
}
```

![](https://images.viblo.asia/db616060-2be5-43be-8c81-36aa3a7b9d3f.png)

Nếu bạn cần điều chỉnh phần chèn từ một trong các cạnh, bạn có thể. Đây là một ví dụ khác:

```css
.card {
  clip-path: inset(20px 20px 50px 20px);
  // hoặc:
  // clip-path: inset(20px 20px 50px);
  // theo tứ tự là trên - phải - dưới - trái giống như margin hoặc padding
}
```

The eleent has a 50px inset from the bottom.

`.card` mới có một `inset` `50px` từ bên dưới.

![](https://images.viblo.asia/72548cfe-ca1d-4b8c-903e-b19d24a01112.png)

Một câu hỏi nữa là, liệu chúng ta có thể làm các góc được bo tròn như các block bình thuờng không?

Tất nhiên là có thể nhờ thuộc tính `round`. 

Thêm`round <border-radius>` có thể bo tròn các góc.
    
```css
.card {
  clip-path: inset(20px 20px 50px round 15px);
}
```

![](https://images.viblo.asia/da6c2874-f2a0-4c5c-baaf-89879ef49f83.png)

Không chỉ vậy, chúng ta có thể điều chỉnh bán kính cho từng bên một cách riêng biệt.

Bên dưới là một ví dụ với bán kính bằng `0` cho các góc trên cùng bên phải và dưới cùng bên trái.

```css
.card {
  clip-path: inset(20px 20px 50px round 15px 0);
}
```

![](https://images.viblo.asia/a0b74bb4-2f7f-4a27-9d53-fb835901301c.png)

### 3.2 Circle

Để sử dụng giá trị `circle()`, chúng ta cần bán kính và vị trí của nó. Đây là một ví dụ:

```css
.card {
  clip-path: circle(80px at 50% 50%);
}
```

Bán kính của hình tròn là `80px` và nó được định vị `50%` trên trục x và `50%`1 trên trục y.

### 3.3 Ellipse

Với `ellipse()`, chúng ta có thể thiết lập chiều rộng và chiều cao để tạo một hình cắt hình bầu dục.

```css
.card {
  clip-path: ellipse(100px 80px at center);
}
```

![](https://images.viblo.asia/0345f5f7-71ae-451c-9d59-b612ce16745b.png)

### 3.4 Polygon

Giá trị `polygon()` là giá trị thú vị nhất.

Chúng ta có khả năng kiểm soát nhiều bộ giá trị trục x và trục y khác nhau.

```css
.card {
  clip-path: polygon(x y, x y, x y, x y);
}
```

Đây là một ví dụ sử dụng `polygon()` để cắt một hình chữ nhật.

Lưu ý cách chúng ta ánh xạ từng tập hợp điểm với tọa độ của nó trên các trục.

```css
.card {
  clip-path: polygon(5% 5%, 95% 5%, 95% 95%, 5% 95%);
}
```

![](https://images.viblo.asia/ceef742a-67a9-42ab-9b6a-52f38e7c20dd.png)

Chúng ta cũng có thể vẽ các hình phức tạp với nhiều điểm bằng cách sử dụng giá trị `polygon`.

### 3.5 Path

Giá trị `path()` cho phép chúng ta sử dụng một đường dẫn `SVG` để cắt một khu vực cụ thể.

Hiện tại, việc hỗ trợ các trình duyệt khác nhau còn nhiều hạn chế.

Chúng ta cần sử dụng inline SVG, sau đó sử dụng `url()` làm giá trị cho `clip-path`.

```html
<svg class="svg">
  <clipPath id="triangle" clipPathUnits="objectBoundingBox">
    <path d="M0.05,0.05 h1 v1"></path>
  </clipPath>
</svg>
```

Trong CSS, chúng ta cần thêm đường dẫn bằng giá trị `url()`.

```css
.card {
  clip-path: url("#triangle");
}
```

![](https://images.viblo.asia/e636c4a9-c845-41b6-8e85-6e254fbebafa.png)

Hiện tại, chúng ta đã xem qua lý thuyết về `clip-path` và các giá trị tổng quát, đã đến lúc áp dụng nó vào thực tế rồi.

(go)

## 4. Use Cases

### 4.1 Angled Effect

Trong các trang web hiện đại, bạn có thể đã thấy nhiều mẫu tương tự như hình bên dưới, trên web sẽ có một số phần có nền hơi góc cạnh và có độ dài các cạnh không đều nhau.

Đó là một trường hợp hoàn hảo để sử dụng `clip-path`

![](https://images.viblo.asia/53597bd1-c4bb-4080-b74a-41a1bb5cf2a1.png)

Chúng ta sẽ sử dụng `polygon()`.

```css
.section {
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
}
```

Trong một số trường hợp, việc điều chỉnh 8 số cho giá trị đa giác có thể gây khó chịu.

Vì lý do đó, chúng ta có một mẹo nhỏ đó là phụ thuộc vào trình duyệt để tạo ra hình dạng mà chúng ta muốn.

Đầu tiên, chúng ta cần thêm những điều sau:

```css
.section {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
```

Sau đó, chúng ta cần kiểm tra phần đó của `DevTools`.

Sau khi hoàn tất, hãy lưu ý rằng có một biểu tượng đa giác nhỏ ở phía bên trái của giá trị `polygon()`.

![](https://images.viblo.asia/83362623-6ccd-45d5-b6f1-5b7186497103.png)

Sau khi nhấp vào biểu tượng đó, chúng ta có thể chỉnh sửa đa giác trong trình duyệt.

Thật tuyệt vời phải không? Gif bên dưới sẽ là ví dụ cho bạn.

![](https://images.viblo.asia/f421d75c-d921-446b-b3a7-6ad5174b75d0.gif)

### 4.2 Making The Angle Relative To The Viewport Width

Chúng ta cũng có thể sử dụng CSS `calc()` kết hợp với CSS `viewport unit` để tạo góc so với chiều rộng của `viewport`. 
 
 ```css
 .section {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 5vw), 0 100%);
}
```

- Tài liêu tham khảo:

https://kilianvalkhof.com/2017/design/sloped-edges-with-consistent-angle-in-css/

### 4.3 Multiple Angled Effects

Tôi có một câu hỏi trong đầu về việc liệu chúng ta có cần nhiều phần tử có nhiều góc cạnh không?

![](https://images.viblo.asia/d5d0bc6d-480a-48fe-a954-7f5b045ca1fb.png)

Điều đầu tiên tôi nghĩ đến là chỉ cần thêm một lớp `box-shadow` hoặc `border`.

Thật không may, chúng cũng sẽ nằm trong phạm vi ảnh hưởng của `clip-path`, vì vậy ngay cả khi chúng ta thêm `box-shadow` hoặc `border`, nó cũng sẽ không xuất hiện như mong đợi.

Trong trường hợp như vậy, giải pháp là sử dụng nhiều phần tử, với mỗi phần tử có một điểm cắt khác nhau. Đây là cách chúng ta có thể làm điều đó.

```html
<div class="hero">
  <img src="bg.jpg" alt="" />
</div>
```

```css
.hero {
  position: relative;
  min-height: 350px;
}

.hero img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 90%);
}

.hero:after {
  content: "";
  position: absolute;
  left: 0;
  // Đây chính là thuộc tính làm lớp nền bên dưới ở bên d
  bottom: -20%;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #4545a0;
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 90%);
}
```


Chúng ta có một phần tử giả có cùng kích thước và đường dẫn clip như phần tử kia.

Sự khác biệt là nó được đặt bên dưới nó với `bottom: -20%` và `z-index: -1`.

Tôi đã sử dụng giá trị `20%` vì nó là kết quả của `100 - 80`.

### 4.4 Reveal On Scroll

Bằng cách sử dụng API [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) , chúng ta có thể hiển thị các phần tử nhất định trên trang khi người dùng đang cuộn.

Giá trị `clip-path` mà tôi thấy hữu ích cho hiệu ứng này là `inset`.

![](https://images.viblo.asia/cb927614-6a55-4b84-b1a4-dad493f24c71.png)

Lưu ý rằng hình chữ nhật màu xanh có thể hoàn toàn vô hình bằng cách áp dụng `inset(50%)`.

 Giá trị làm cho nó vô hình là `50%` vì chúng ta đang áp dụng nội dung từ bốn phía.
 
 Nói cách khác, hình chữ nhật được áp dụng từ cạnh đến tâm của hình chữ nhật.

Trong hình bên dưới, `inset` đang được sử dụng để hiển thị hình ảnh trong khi người dùng đang cuộn.

![](https://images.viblo.asia/f4d51457-85b7-4471-9e87-ebf0378d6455.png)

Với nó, chúng ta có thể làm cho hình ảnh hiển thị bằng cách cuộn.

```js
const images = document.querySelectorAll("img");

function check(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}

const observer = new IntersectionObserver(check);
images.forEach((image) => observer.observe(image));
```

```css
img {
  clip-path: inset(50%);
  transition: 1.2s ease-in;
}

img.is-visible {
  clip-path: inset(0);
}
```

Nó thực sự đơn giản phải không?

Chúng ta đã tạo một hiệu ứng cuộn đơn giản với một vài dòng CSS và Javascript.

{@embed: https://codepen.io/shadeed/pen/mdrvKEz}

Không chỉ vậy, chúng ta còn có thể kiểm soát hướng của quá trình chuyển đổi do scroll.

Để làm điều đó, chúng ta chỉ cần sử dụng một giá trị từ bốn cạnh.

Ví dụ: nếu chúng ta muốn chuyển đổi từ trên xuống dưới, giá trị dưới cùng phải được chuyển từ 100% sang 0.

Đây là hình ảnh giải thích điều đó.

![](https://images.viblo.asia/97fe7228-ef65-4acf-b9f8-c897c7e42b99.png)

And here is an interactive demo.

Và đây là một bản demo:

{@embed: https://codepen.io/shadeed/pen/WNGPKPM}

### 4.5 Hover And Animation Effects

Khả năng tạo hiệu ứng `hover` và `click` với `clip-path` là vô tận.

Hãy xem xét ví dụ sau.

![](https://images.viblo.asia/70d9db93-f968-41de-9d43-fe9403d3c47b.png)

Những gì chúng ta cần làm là thêm hiệu ứng `hover` từ một vị trí đã được chỉ định.

Trong trường hợp này, hãy sử dụng giá trị `circle()`.

Để làm cho nó dễ dàng hơn và dễ maintaince hơn, hãy sử dụng các biến CSS.

Bằng cách đó, chúng ta sẽ không trùng lặp toàn bộ `clip-path`.

Chúng ta sẽ chỉ thay đổi các biến CSS cần thiết.

```css
:root {
  --pos: left center;
  --size: 0;
}

.stats__item:before {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #7777e9;
  clip-path: circle(var(--size) at var(--pos));
  transition: 0.4s linear;
}

.stats__item:hover:before {
  --size: 300px;
}
```

Gif bên dưới để biết cách hoạt động.

![](https://images.viblo.asia/22735e23-4c48-4566-b2f3-e24f803a3e11.gif)

Không chỉ vậy, chúng ta có thể thay đổi vị trí của ảnh động rất dễ dàng.

Tôi đã tạo một bản demo với khả năng thay đổi vị trí từ menu thả xuống.

{@embed: https://codepen.io/shadeed/pen/vYXbrrb}

Nếu bạn muốn tìm hiểu sâu hơn về các hiệu ứng hoạt hình, ông Adam Argyle đã tạo ra một thư viện hoạt hình CSS rất hữu ích dựa 100% vào CSS `clip-path`.

Tài liệu tham khảo:

https://www.transition.style/

### 4.6 Ripple Effect

The ripple effect has been popular since the release of Material design. With clip-path, we can easily replicate this effect.

Hiệu ứng gợn sóng đã trở nên phổ biến kể từ khi phát hành `Material design`.

Với `clip-path`, chúng ta có thể dễ dàng sao chép hiệu ứng này.

![](https://images.viblo.asia/12c456f0-6069-4de6-ace0-69f3405f86d0.png)

```html
<button class="button"><span>Sign up now</span></button>
```

```css
.button {
  position: relative;
}

.button span {
  position: relative;
  z-index: 1;
}

.button:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  opacity: 0.1;
  clip-path: circle(0 at center);
  transition: 0.3s ease-out;
}

.button:hover:before {
  clip-path: circle(100px at center);
}
```

{@embed: https://codepen.io/shadeed/pen/LYRaNwg}

## Complement

Để dễ dàng hơn trong việc sử dụng giá trị `clip-path`, bennettfeely sẽ giúp bạn làm điều đó 

- Link tham khảo:

https://bennettfeely.com/clippy/ 


## Conclusion

Bên trên là tìm hiểu về thuộc tính `clip-path` trong CSS, hi vọng giúp ích được cho mọi người trong việc vẽ hay custom lại những giao diện khó

Thank for watching!!!

## Reference

- [bennettfeely](https://bennettfeely.com/clippy/ )
- [transition](https://www.transition.style/)
- [Sloped edges with consistent angle in css](https://kilianvalkhof.com/2017/design/sloped-edges-with-consistent-angle-in-css/)
- [Clip-path](https://ishadeed.com/article/clip-path/)