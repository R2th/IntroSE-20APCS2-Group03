{@embed: https://codepen.io/tuanvothanh/pen/JjWRMBO}

-----

Trọng tâm của hướng dẫn này, mình sẽ đưa bạn để cách làm dễ nhất và có thể bắt tay vào làm ngay. Do đó, mình không cố để viết một bài chi tiết hay nặng về lý thuyết. Bạn có thể tìm hiểu sâu thêm từ internet. Trước khi đi vào bài viết, mình có để lại link bài viết về cách tạo SVG được sử dụng trong bài viết này.
* https://naututs.com/svg-line/

Mình sử dụng [Codepen](https://codepen.io/tuanvothanh/pen/JjWRMBO) để demo các animation này.

Đầu tiên, bạn cần CDN để liên kết thư viện GSAP. Tại mục setting JS, bạn gõ chọn GSAP và Save.
![image.png](https://images.viblo.asia/6dd61379-8285-4eb6-bf83-a4f72453abb5.png)
Sau đó, bạn copy HTML và CSS bên dưới và dán chúng vào các ô tương ứng.

```html
<svg viewBox='0 0 200 100'>
  <line id='line1' x1='10' y1='5' x2='50' y2='25'/>
  <line id='line2' x1='50' y1='25' x2='100' y2='25'/>
  <line id='line3' x1='100' y1='25' x2='150' y2='75'/>
  <line id='line4' x1='150' y1='75' x2='190' y2='75'/>
</svg>
```
```css
svg {background: cyan; border-radius: 0px; max-width: 200px}
line {stroke: orange; stroke-width: 4}
```
Các chuyển động theo tuần tự thì mình sẽ dùng gsap.timeline(). Và chúng xuất hiện ngay tại vị trí đó nên mình dùng from() và đặt opacity là 0.

```javascript
gsap.timeline({repeat: -1})
.from('#line1', {duration: 1, opacity: 0, ease: 'bounce'})
.from('#line2', {duration: 1, opacity: 0, ease: 'bounce'})
.from('#line3', {duration: 1, opacity: 0, ease: 'bounce'})
.from('#line4', {duration: 1, opacity: 0, ease: 'bounce'})
```
Mình nhận thấy có khác nhiều thuộc tính lặp lại, do đó mình sẽ làm gọn lại bằng cách đưa chúng vào defauts như sau:
```javascript
gsap.timeline({repeat: -1, defaults: {duration: 1, opacity: 0, ease: 'bounce'}})
.from('#line1', {})
.from('#line2', {})
.from('#line3', {})
.from('#line4', {})
```
Bây giờ, bạn có có thể tạo hiệu ứng xuất hiện theo trình tự bằng GSAP thật dễ dàng!

Nguồn: www.naututs.com