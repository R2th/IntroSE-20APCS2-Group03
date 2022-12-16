## Giới thiệu
- Fluid layouts là một phần tất yếu của sự phát triển front-end trong nhiều năm qua. Tuy nhiên, ý tưởng về kiểu Fluid typography là tương đối mới và vẫn chưa được khám phá đầy đủ. Cho đến nay, hầu hết ý tưởng về fluid typography của các nhà phát triển chỉ đơn giản là sử dụng các đơn vị với một số kích thước tối thiểu và tối đa. 

- Khi làm việc với các nhà thiết kế, trên các bản thiết kế web của họ sẽ đặt ra các breakpoint cụ thể cho từng màn hình riêng như ví dụ dưới đây :
```
1.The h1 at the small layout could be 22px
2.The h1 at the medium layout could be 24px
3.The h1 at the large layout could be 34px
```

```
h1 {
  font-size: 22px;
}
@media (min-width:480px) {
  h1 {
    font-size: 22px;
  }
}
@media (min-width:768px) {
  h1 {
    font-size: 24px;
  }
}
@media (min-width:992px) {
  h1 {
    font-size: 34px;
  }
}
```
Với yêu cầu như trên ta thường sử dụng CSS với media queries, nhưng có điều nó chỉ thay đổi font-size của thẻ h1 khi độ rộng của viewport bằng với 3 breakpoint đã dùng ở trên, như vậy nó sẽ bị bó cứng với 3 điểm breakpoint đó. Nhưng nếu thiết kế của bạn ở dạng Fluid layouts thì ta cần làm gì để cải thiện điều này. Câu trả lời đó là sử dụng các đơn vị liên quan đến Viewport, chúng cho phép ta thay đổi kích thước một cách dễ dàng.
## Viewport units
- **vw, vh**: Liên quan đến 1% chiều rộng và chiều cao của viewport
- **vmin, vmax**: liên quan đến chiều cao và chiều rộng tối đa hoặc tối thiểu của Viewport
## Cách tạo fluid typography
**1. Fluid typography với CSS**
Để tao ra fluid typography ta sử dụng các viewport units và calc (), chúng ta có thể điều chỉnh kích thước phông chữ (và các thuộc tính khác) dựa trên kích thước của màn hình. Vì vậy, thay vì luôn luôn có cùng kích thước, hoặc nhảy từ kích thước này sang kích thước tiếp theo tại các truy vấn media queries, kích thước có thể co vào hoặc dãn ra theo kích thước màn hình.

Chúng ta áp dùng công thức dưới đây :
> font-size: calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width])));
> 

**Ví dụ:**
```
body {
  font-size: calc(14px + (26 - 14) * ((100vw - 300px) / (1200 - 300)));
}
```
![](https://images.viblo.asia/95acfdc5-dfe0-4e27-9b3b-b8f0b3a9bc6e.gif)
{@embed: https://codepen.io/TrinhThang/pen/wOYQWQ}
- Ở ví dụ trên ta có thể xác định được vị trí  breakpoint 1200px thì front-size sẽ bằng 26px, và khi resize màn hình lớn hơn 1200px thì font-size sẽ tăng lên, hoặc nhỏ hơn thì font-size sẽ giảm xuống theo tỉ lệ đã được tính trong hàm calc ở trên.

**2. Fluid typography với SCSS**
- Ngoài cách sử Fluid typography với CSS bạn có thể sử dụng nó với SCSS, khi sử dụng với @mixin của SCSS thì nó khá là mạnh bạn có thể sử dụng cho nhiều element khác nhau mà không cần viết lại nhiều lần, và có thể set thêm giá trị max và min khi sử dụng với media queries
- Đầu tiên ta tạo ra 1 mixin:
```
@mixin fluid-type($min-font-size, $max-font-size, $lower-range, $upper-range) {

  font-size: calc(#{$min-font-size} + #{(($max-font-size / ($max-font-size * 0 + 1)) - ($min-font-size / ($min-font-size * 0 + 1)))} * ( (100vw - #{$lower-range}) / #{(($upper-range / ($upper-range * 0 + 1)) - ($lower-range / ($lower-range * 0 + 1)))}));
  
  @media screen and (max-width: $lower-range) {
    font-size: $min-font-size;
  }
  @media screen and (min-width: $upper-range){
    font-size: $max-font-size;
  }
}

```
- Sử dụng minxin fluid-type vừa tạo :
```
p {
  @include fluid-type(14px, 20px, 600px, 1200px); 
  font-weight: normal
}

// 14px: min-font-size
// 20px: max-font-size
// 600px: min-screen
// 1200px: max-screen

h1 {
  @include fluid-type(28px, 52px, 600px, 1200px);
  font-weight: 100;
}

// 28px: min-font-size
// 52px: max-font-size
// 600px: min-screen
// 1200px: max-screen

//** Với màn hình nhỏ hơn 600px thì sẽ nhận giá trị min-font-size
//** Với màn hình lớn hơn 1200px thì sẽ nhận giá trị max-font-size
//** Với màn hình 600px - 1200px thì sẽ nhận giá trị trong khoảng min-font-size đến trị max-font-size
```
{@embed: https://codepen.io/TrinhThang/pen/drgQBj}

## Lời kết 
Như vậy, sau bài viết này, các bạn có thể tạo ra Fluid typography mạnh mẽ để sử dụng trong layout đòi hỏi đáp ứng trên nhiều màn hình khác nhau, ngoài ra phương pháp này không chỉ áp dụng font-size mà còn áp dụng cho 1 số đơn vị khác  (margin, padding, vv). Bạn chỉ cần chuyển tên thuộc tính mong muốn vào mixin dưới dạng chuỗi.

Chúc các bạn thành công!