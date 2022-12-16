{@embed: https://codepen.io/tuanvothanh/pen/eYvJmBV}


-----

Trọng tâm của hướng dẫn này, mình sẽ đưa bạn để cách làm dễ nhất và có thể bắt tay vào làm ngay. Do đó, mình không cố để viết một bài chi tiết hay nặng về lý thuyết. Bạn có thể tìm hiểu sâu thêm từ internet. Trước khi đi vào bài viết, mình có để lại link bài viết về cách tạo SVG được sử dụng trong bài viết này.

* https://naututs.com/svg-rectangle/

Mình sử dụng [Codepen](https://codepen.io/tuanvothanh/pen/eYvJmBV) để demo các animation này.

Đầu tiên, bạn cần CDN để liên kết thư viện GSAP. Tại mục setting JS, bạn gõ chọn GSAP và Save.
![image.png](https://images.viblo.asia/fd4ce28a-ef25-4ef6-a663-19c3034ab133.png)

Sau đó, bạn copy HTML và CSS bên dưới và dán chúng vào các ô tương ứng.

```html
<h2>SVG Rectangle</h2>
<svg viewBox='0 0 300 200'>
  <rect x='50' y='50' width='200' height='100'/>
</svg>
```

```css
svg {background: cyan; border-radius: 0px; max-width: 300px}
rect {fill: blue; stroke: orange; stroke-width: 4; fill-opacity: 0.5}
```

Tại JS, mình thêm dòng code sau để làm chuyển động tại các góc hình chữ nhật:

```javascript
gsap.to('rect', {rx: 20})
```

Cuối cùng, mình tùy chỉnh một số thuộc tính để animation hấp dẫn hơn.

```javascript
gsap.to('rect', {rx: 20, duration: 4, repeat: -1, ease: 'bounce')
```

Bây giờ, bạn có thể tạo ra hiệu ứng bo tròn góc hình chữ nhật thật dễ dàng!

Nguồn: www.naututs.com