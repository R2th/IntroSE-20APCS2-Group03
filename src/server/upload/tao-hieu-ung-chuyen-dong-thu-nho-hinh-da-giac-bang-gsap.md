{@embed: https://codepen.io/tuanvothanh/pen/BaWLJvX}

-----

Trọng tâm của hướng dẫn này, mình sẽ đưa bạn để cách làm dễ nhất và có thể bắt tay vào làm ngay. Do đó, mình không cố để viết một bài chi tiết hay nặng về lý thuyết. Bạn có thể tìm hiểu sâu thêm từ internet. Trước khi đi vào bài viết, mình có để lại link bài viết về cách tạo SVG được sử dụng trong bài viết này.
* https://naututs.com/svg-polygon/

Mình sử dụng [Codepen](https://codepen.io/tuanvothanh/pen/BaWLJvX) để demo các animation này.

Đầu tiên, bạn cần CDN để liên kết thư viện GSAP. Tại mục setting JS, bạn gõ chọn GSAP và Save.
![image.png](https://images.viblo.asia/f4c32603-ce22-4d0b-8d6c-115d941b1d86.png)
Sau đó, bạn copy HTML và CSS bên dưới và dán chúng vào các ô tương ứng.

```html
<svg viewBox='0 0 200 200'>
  <polygon points='65,50 135,70 150,150 50,150'/>
</svg>
```
```css
svg {background: cyan; border-radius: 0px; max-width: 200px}
polygon {fill: blue; stroke: orange; stroke-width: 4; fill-opacity: 0.5}
```
Mình dùng gsap.timeline() vì có 2 sự kiện nối tiếp nhau.

Sự kiện đầu tiên, hình đa giác bắt đầu với kích thước lớn x3 lần ban đầu và bắt đầu hiện rỏ tại vị trí ban đầu. Trường hợp này mình dùng from().
```javascript
gsap.timeline()
.from('polygon', {scale: 3, opacity: 0, duration: 2})
```
Ở sự kiện thứ hai, hình đa giác bắt đầu thu nhỏ dần đến khi biến mất hoàn toàn. Trường hợp này mình to().
```javascript
gsap.timeline()
.from('polygon', {scale: 3, opacity: 0, duration: 2})
.to('polygon', {scale: 0, opacity: 0, duration: 2})
```
Cuối cùng mình sẽ làm gọn lại các thuộc tính trùng lặp, và để chuyển động lặp lại tự động.

```javascript
gsap.timeline({repeat: -1, defaults: {opacity: 0, duration: 2}})
.from('polygon', {scale: 3})
.to('polygon', {scale: 0})
```
Bây giờ, bạn có thể tạo hiệu ứng chuyển động thu nhỏ hình đa giác bằng GSAP thật dễ dàng!

Nguồn: www.naututs.com