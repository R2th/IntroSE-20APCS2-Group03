Có rất nhiều cách để thực hiện animation trên web, và hôm nay mình xin giới thiệu một cách rất hay để animate đó là sử dụng thư viện `Greensock` `(GSAP)`.
### GSAP giúp điều khiển thuộc tính dễ dàng
Animation về cơ bản là thay đổi các giá trị của một thuộc tính nhiều lần trong một quang thời gian. `GSAP` nhận vào giá trị ban đầu và kết thúc của một thuộc tính rồi animate nó 60 lần mỗi giây. Chính vì vậy nó mới có tên là "GreenSock Property Manipulator" (GSPM) nhưng vì cái tên đó không xuôi lắm nên họ đã đổi tên thành `GSAP`.
### Tương tác cùng DOM, SVG, Canvas và nhiều hơn nữa
`GSAP` gần như có thể animate mọi thứ trên web, ví dụ như :
* **CSS**: 2D and 3D `transforms`, `colors`, `width`, `opacity`, `border-radius`, `margin` và gần như mọi thuộc tính CSS.
* **SVG**: `viewBox`, `width`, `height`, `fill`, `stroke`, `cx`, `r`, `opacity`.
* Hoặc bất kỳ giá trị số nào trong `Canvas`.
### Nhanh và mượt
* `GSAP` có thể animate mọi thứ mà Javascript có thể chạm tới, với một tốc độ nhanh chóng (nhanh hơn 20 lần so với JQuery)
* `GSAP` hỗ trợ sãn rất nhiều [easing function](https://greensock.com/ease-visualizer)
* `GSAP` luôn tương thích với rất nhiều trình duyệt như IE, FF...
### Animate DOM element
Chúng ta có một div với class là `ball`
```HTML
<div class="ball"></div>
```
```JS
gsap.to('.ball', {
  duration: 1,
  x: 200,
  scale: 2
})
```
Để animate `div` này chúng ta nói với GSAP rằng hãy nhận lấy `div` có class `ball` và thay đổi `.to()` một số thuộc tính.
`x: 200` dịch ra CSS sẽ là `transform: translateX(200px)`, tương tự như vậy ta có thể khai báo như sau
```CSS
x: 100 // transform: translateX(100px)
y: 100 // transform: translateY(100px)
z: 100 // transform: translateZ(100px)
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
Đối với `SVG` cũng tương tự như vậy
```HTML
<svg viewBox="0 0 500 400">
  <circle class="ball" cx="80" cy="80" r="80" />
</svg>
```
```JS
gsap.to('.ball', {
  duration: 1,
  x: 200,
  scale: 2
})
```
### Eases
Như đã đề cập đến phía trên, `GSAP` hỗ trợ chúng ta rất nhiều Easing function, ví dự như
```JS
gsap.to('.ball', {
  duration: 1.5,
  x: 200,
  scale: 2,
  ease: 'bounce'
})
```
Chúng ta có thể thêm một khoảng thời gian delay như sau
```JS
gsap.to('.ball', {
  duration: 1.5,
  delay: 1.5,
  x: 0,
  scale: 1,
  ease: 'back.inOut(3)'
})
```

Tôi hi vọng rằng bài viết này có thể giúp bạn tiếp cận thư viện `Greensock(GSAP)` một cách dễ dàng hơn. Cảm ơn vì đã đọc.
[Tham khảo](https://css-tricks.com/how-to-animate-on-the-web-with-greensock/)