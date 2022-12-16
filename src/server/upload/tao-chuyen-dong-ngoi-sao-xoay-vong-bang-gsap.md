{@embed: https://codepen.io/tuanvothanh/pen/BaWLJeB}

-----

Trọng tâm của hướng dẫn này, mình sẽ đưa bạn để cách làm dễ nhất và có thể bắt tay vào làm ngay. Do đó, mình không cố để viết một bài chi tiết hay nặng về lý thuyết. Bạn có thể tìm hiểu sâu thêm từ internet. Trước khi đi vào bài viết, mình có để lại link bài viết về cách tạo SVG được sử dụng trong bài viết này.
* https://naututs.com/svg-star/

Mình sử dụng [Codepen](https://codepen.io/tuanvothanh/pen/BaWLJeB) để demo các animation này.

Đầu tiên, bạn cần CDN để liên kết thư viện GSAP. Tại mục setting JS, bạn gõ chọn GSAP và Save.
![image.png](https://images.viblo.asia/43468fec-5283-474e-8b56-d4a280c29589.png)
Sau đó, bạn copy HTML và CSS bên dưới và dán chúng vào các ô tương ứng.

```html
<svg viewBox='0 0 300 200'>
  <polygon points='150,30 105,165 215,80 85,80 195,165'/>
</svg>
```
```css
svg {background: #B71C1C; border-radius: 0px; max-width: 300px}
polygon {fill: white}
```
Mình dùng timeline() vì có 2 sự kiện nối tiếp nhau. Ngôi sao sẽ chuyển động từ ngoài vào vị trí ban đầu nên mình dùng from().

```javascript
gsap.timeline()
.from('polygon', {rotation: 360, opacity: 0, duration: 3})
```
Sau đó, ngôi sao sẽ chuyển màu dần sang vàng nên mình dùng to().

```javascript
gsap.timeline()
.from('polygon', {rotation: 360, opacity: 0, duration: 3})
.to('polygon', {fill: '#FFD600', duration: 1})
```
Cuối cùng, mình tinh chỉ lại hiệu ứng và tạo chuyển động lặp lại kiểu yoyo.

```javascript
gsap.timeline({repeat: -1, repeatDelay: 1, yoyo: true})
.from('polygon', {x: 300, y: 100, rotation: 360, opacity: 0, duration: 3, ease: 'back'})
.to('polygon', {fill: '#FFD600', duration: 1, ease: 'slow'})
```
Bây giờ, bạn có thể tạo chuyển động ngôi sao xoay vòng bằng SVG thật dễ dàng!

Nguồn: www.naututs.com