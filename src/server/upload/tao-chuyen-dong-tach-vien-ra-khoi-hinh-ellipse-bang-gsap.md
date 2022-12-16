{@embed: https://codepen.io/tuanvothanh/pen/QWpKaaL}

-----

Trọng tâm của hướng dẫn này, mình sẽ đưa bạn để cách làm dễ nhất và có thể bắt tay vào làm ngay. Do đó, mình không cố để viết một bài chi tiết hay nặng về lý thuyết. Bạn có thể tìm hiểu sâu thêm từ internet. Trước khi đi vào bài viết, mình có để lại link bài viết về cách tạo SVG được sử dụng trong bài viết này.
* https://naututs.com/svg-ellipse/

Mình sử dụng [Codepen](https://codepen.io/tuanvothanh/pen/QWpKaaL) để demo các animation này.

Đầu tiên, bạn cần CDN để liên kết thư viện GSAP. Tại mục setting JS, bạn gõ chọn GSAP và Save.
![image.png](https://images.viblo.asia/a08050fa-e426-4254-8f43-12b1e6df4b2e.png)
Sau đó, bạn copy HTML và CSS bên dưới và dán chúng vào các ô tương ứng.

```html
<svg viewBox='0 0 300 200'>
  <ellipse id='ellipseFill' cx='150' cy='100' rx='80' ry='40'/>
  <ellipse id='ellipseStroke' cx='150' cy='100' rx='80' ry='40'/>
</svg>
```

```css
svg {
  background: cyan;
  border-radius: 0px;
  max-width: 300px;
}
#ellipseFill {
  fill: blue;
  fill-opacity: 0.5;
}
#ellipseStroke {
  fill: none;
  stroke: orange;
  stroke-width: 4;
}
```
Tại JS, mình sẽ bắt đầu bằng việc tạo chuyển động nền và viền đi vào vị trí trung tâm cùng một thời điểm. Do đó, mình sẽ dùng from() trong trường hợp này.

```javascript
gsap.timeline()
.from('#ellipseFill', {y: -142, duration: 1})
.from('#ellipseStroke', {y: 142, duration: 1}, '<')
```
Tiếp theo, mình để nền và viền nghĩ khoảng 2 giây rồi sau đó để chúng chuyển động ra khỏi khung. Do đó, mình sẽ dùng to() trong trường hợp này. Mình cũng thêm thuộc tính repeat: -1 để chuyển động lặp lại.

```javascript
gsap.timeline({repeat: -1})
.from('#ellipseFill', {y: -142, duration: 1})
.from('#ellipseStroke', {y: 142, duration: 1}, '<')
.to('#ellipseFill', {y: 142, duration: 1}, '>2')
.to('#ellipseStroke', {y: -142, duration: 1}, '<')
```
Bây giờ, bạn có thể tạo chuyển động tách viền ra khỏi hình ellipse thật dễ dàng!

Nguồn: www.naututs.com