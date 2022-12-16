{@embed: https://codepen.io/tuanvothanh/pen/QWpKape}


-----


Trọng tâm của hướng dẫn này, mình sẽ đưa bạn để cách làm dễ nhất và có thể bắt tay vào làm ngay. Do đó, mình không cố để viết một bài chi tiết hay nặng về lý thuyết. Bạn có thể tìm hiểu sâu thêm từ internet. Trước khi đi vào bài viết, mình có để lại link bài viết về cách tạo SVG được sử dụng trong bài viết này.

* https://naututs.com/svg-circle/

Mình sử dụng [Codepen](https://codepen.io/tuanvothanh/pen/QWpKape) để demo các animation này.

Đầu tiên, bạn cần CDN để liên kết thư viện GSAP. Tại mục setting JS, bạn gõ chọn GSAP và Save.
![image.png](https://images.viblo.asia/1af8abcf-dc6d-4c82-a78f-26c098b6c0bf.png)
Sau đó, bạn copy HTML và CSS bên dưới và dán chúng vào các ô tương ứng.

```html
<h2>SVG Circle</h2>
<svg viewBox='0 0 300 200'>
  <circle cx='150' cy='100' r='40'/>
</svg>
```

```css
svg {background: cyan; border-radius: 0px; max-width: 300px}
circle {fill: blue; stroke: orange; stroke-width: 4; fill-opacity: 0.5}
```

Bây giờ, mình sẽ cho hình tròn di chuyển xuống dưới rồi sau đó di chuyển ngược lên trên. Ở đây, mình dùng gsap.timeline() để thực hiện 2 sự kiện nối tiếp nhau.

```javascript
gsap.timeline()
.to("circle", { cy: 158 })
.to('circle', {cy: 42})
```

Mình muốn hình tròn rơi xuống nhanh và nảy lên lâu hơn. Do đó, mình sẽ thay đổi thuộc tính duration.

```javascript
gsap.timeline()
.to("circle", { cy: 158, duration: 1, ease: 'bounce'})
.to('circle', {cy: 42, duration: 2, ease: 'bounce'})
```

Bây giờ, bạn có thể tạo một hình tròn bằng SVG thật dễ dàng!

Nguồn: www.naututs.com