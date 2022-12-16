Gió đông đang về, len lỏi trong vạn vật, mang theo cái buồn man mác, thấm đẫm những hàng cây, lối nhỏ. Sau một vài cơn bão, thời tiết đã dần chuyển lạnh, những vỉa hè tràn ngập tiếng lá khô xào xạc. Chỉ còn 1 tháng nữa là đến Noel, một không khí thật hạnh phúc nhưng cũng thật cô đơn đối với những mảnh ghép còn đơn độc. Mình thích cái thời tiết này ghê, cái thời tiết se lạnh như buổi tối ở Đà Lạt, thoang thoảng hương gió lạnh, thở nhẹ ra chút khói sương trải nghiệm qua việc đi tản bộ dọc bờ hồ Xuân Hương. Mình chợt lặng thinh, dưới cái lạnh năm nào, những ngày tháng mình miệt mài với những template design để chuyển thành những website đẹp lộng lẫy cùng những hiệu ứng bắt mắt.

Chỉ còn một tháng nữa là đã đến Noel, mình hi vọng với một vài dòng code đơn giản, bạn có thể tự mình tạo cho crush một chiếc thiệp với những chú tuần lộc, kéo sau mình là chiếc xe chở ông già Santa Claus trong bộ đồ đỏ giữa làn tuyết trắng lung linh.

Hôm nay, một ngày cuối tuần trong tiết trời cũng se lạnh ấy, mình sẽ giới thiệu đến các bạn một thư viện **GreenSock** - một nền tảng giúp tạo hiệu ứng web mạnh mẽ, cho phép bạn tạo animations gần như với mọi thuộc tính của phần tử `DOM`, giá trị `CSS`, đối tượng `canvas` và  nhiều hơn thế nữa.

![](https://images.viblo.asia/5b855b1b-fbfc-45e1-a457-d92c63676ff8.gif)


## 1. Giới thiệu
Ngoài cách tạo animation đơn thuần chỉ bằng Pure CSS (chỉ HTML và CSS) hoặc với jQuery..., thì GSAP cũng mang lại cho bạn những tuỳ biến về UI rất đẹp mắt mà `CSS` hay `jQuery` không làm được thì GSAP là một lựa chọn rất thú vị.

Cơ chế của GreenSock (GSAP) là nhận vào giá trị ban đầu và kết thúc của một thuộc tính rồi animate nó 60 lần mỗi giây. Chính vì vậy nó mới có tên là ***"GreenSock Property Manipulator" (GSPM)*** nhưng vì cái tên đó không được đẹp cho lắm nên đã được gọi vớI một cái tên mới là **GSAP**.

## 2. Khám phá

#### GSAP có 4 công cụ chính
| TweenLite | Là thành phần core của GSAP, dùng để tạo các hiệu ứng cho các thuộc tính với giá trị number ví dụ như: width, height. Cùng với CSS plugin bạn có thể tạo hiệu ứng cho bất kỳ CSS property ví dụ như `fontSize, backgroundColor`. <br/>TweenLite thì tốt cho các hiệu ứng đơn giản với một vài elements |
| -------- | -------- |
| TimelineLite | Bao gồm nhiều hiệu ứng hoặc dòng thời gian. `Pause, reverse, restart, speed up, slow down, seek time, add labels...`<br/>Thường dùng để tạo hiệu ứng theo trình tự thời gian.|
| TimelineMax | TweenLite được thêm vào các function như `repeat, yoyo, tweening to previous or next label, custom callback functions...`<br/> TimelineMax dùng để tạo các hiệu ứng nâng cao theo trình tự thời gian. |
| TweenMax | Bao gồm tất cả các tính năng trên và được bổ sung các function như `repeat, yoyo, delay and stagger individual tweens or timelines` và nhiều hơn nữa. Nó cũng đi kèm với nhiều plugin phổ biến.<br/> TweenMax dùng là công cụ tạo hiệu ứng mạnh mẽ nhất. |

Ngoài ra bạn cũng có thể đọc thêm chi tiết ở đây https://ihatetomatoes.net/go/gsap

#### Tương tác cùng DOM, SVG, Canvas và nhiều hơn nữa

`GSAP` gần như có thể animate mọi thứ trên web, ví dụ như:
**CSS**: `2D` and `3D transforms, colors, width, opacity, border-radius, margin` và gần như mọi thuộc tính CSS.

**SVG**: `viewBox, width, height, fill, stroke, cx, r, opacity`.

Hoặc bất kỳ giá trị số nào trong `Canvas`.

#### Nhanh và mượt
`GSAP` có thể animate mọi thứ mà Javascript có thể chạm tới, với một tốc độ nhanh chóng (*nhanh hơn 20 lần so với JQuery*)

`GSAP` hỗ trợ sãn rất nhiều [easing function](https://greensock.com/ease-visualizer)

`GSAP` luôn tương thích với rất nhiều trình duyệt như **IE, FireFox**...

#### Animating 1 phần tử DOM
```html
<div class="ball"></div>
```
```css
body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #2F243A;
}

.ball {
  width: 80px;
  height: 80px;
  background: #f1faee;
  border: 2px solid transparent;
  transform: translateY(-100px);
}
```
```js
gsap.to('.ball', {
  duration: 1.5,
  delay: 0.5,
  x: 100,
  scale: 2,
  borderRadius: 50,
  background: "#457B9D",
  borderColor: "#a8dadc"
});
```

{@embed: https://codepen.io/nguyenhuukhuyenudn/pen/Pozrgpd}

Đoạn code ở trên cho GSAP hiểu rằng hãy tìm element có class `.ball` và thay đổi `.to()` một số thuộc tính. `x: 100` ở đây có nghĩa là `transform: translateX(100px)` và phóng to lên gấp đôi `transform: scale(2)` trong vòng `1500ms` và đổi màu. Ngoài ra bạn cũng có thể tham khảo các thuộc tính khác.

```js
x: 100 // transform: translateX(100px)
y: 100 // transform: translateY(100px)
z: 100 // transform: translateZ(100px)
// you do not need the null transform hack or hardware acceleration, it comes baked in with
// force3d: true. If you want to unset this, force3d: false
scale: 2 // transform: scale(2)
scaleX: 2 // transform: scaleX(2)
scaleY: 2 // transform: scaleY(2)
scaleZ: 2 // transform: scaleZ(2)
skew: 15 // transform: skew(15deg)
skewX: 15 // transform: skewX(15deg)
skewY: 15 // transform: skewY(15deg)
rotation: 180 // transform: rotate(180deg)
rotationX: 180 // transform: rotateX(180deg)
rotationY: 180 // transform: rotateY(180deg)
rotationZ: 180 // transform: rotateZ(180deg)
perspective: 1000 // transform: perspective(1000px)
transformOrigin: '50% 50%' // transform-origin: 50% 50%
```

Tương tự với `SVG`
```html
<svg viewBox="0 0 500 400">
  <circle class="ball" cx="80" cy="80" r="80" />
</svg>
```

```js
gsap.to('.ball', {
  duration: 1,
  x: 200,
  scale: 2
})
```

#### Eases
GSAP cũng hỗ trợ rất nhiều `easing function`
```js
gsap.to('.ball', {
  duration: 1.5,
  x: 200,
  scale: 2,
  ease: 'bounce'
})
```

{@embed: https://codepen.io/nguyenhuukhuyenudn/pen/wvWLZMY}

## 3. Tổng quan
**Naming:** Tương tự như `CSS in JS` các thuộc tính CSS được viết naming dạng `camelCase` ví dụ  `background-color` sẽ là `backgroundColor`, `border-radius` là `borderRadius`...

**CSS transform**: `rotate()` là  `rotation`. 2D transforms khác trong GSAP – `scaleX, scaleY, scale, skewX, skewY, x, y, xPercent, yPercent`
Nếu bạn dùng  SublimeText có thể dùng snippet: 

Như thường lệ, với mình khi tìm hiểu một thư viện, framework mới mình thường nghĩ đến từ khoá `cheatsheet`. Với GSAP cũng tương tự vậy, bạn có thể xem tổng quan ở đây: https://greensock.com/cheatsheet/

Khá đơn giản phải không, trước đây khi dùng một vài plugin slide với những hiệu ứng bắt mắt, mình cũng nghĩ rất phức tạp. Tuy nhiên sau khi được biết đến GSAP thì mình đỡ thấy "sợ hãi" phần nào. Với GSAP bạn có thể tạo ra được 1 chiếc thiệp noel để gửi đến crush, chúc các bạn một mùa đông thật ấm áp và chill bên người thương.