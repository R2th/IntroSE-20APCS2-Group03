Như đã nói trong bài trước thì trong bài viết này mình sẽ hướng dẫn cách để tạo một switch đơn giản.
## 1. Tạo HTML 
Vẫn là kỹ thuật cũ thì chúng ta dùng cấu trúc:
```html
<label>
    <input tpye="checkbox">
    <span></span>
</label>
```
chúng ta sẽ bắt đầu tạo 2 checkbox với đoạn HTML sau:
```html
<label class="switch">
  <input type="checkbox">
  <span class="slider"></span>
</label>
<label class="switch">
  <input type="checkbox">
  <span class="slider rounder"></span>
</label>
```
## 2. Style cho checkbox với CSS
Cũng vẫn là kỹ thuật cũ chúng ta sẽ sử dụng các pseudo element `::before` và `::after`
Mình đã code sẵn một đoạn css sau:
```css
.switch {
  position: relative;
  display: block;
  margin-bottom:20px;
}
.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}
.slider{
  position:absolute;
  top: 0;
  cursor:pointer;
  width:50px;
  height:30px;
  background:#ccc;
  transition: .5s;
}
.slider:before{
  content:"";
  position:absolute;
  background:#fff;
  width:30%;
  height: 70%;
  top:50%;
  left:10%;
  transform:translateY(-50%);
  transition: .5s;
}
input:checked + .slider{
  background: #2196F3;
}
input:focus + .slider {
  box-shadow: 0 0 2px #2196F3;
}
input:checked + .slider:before{
  left:60%;
}
.slider.rounder{
  border-radius:15px;
}
.slider.rounder:before{
  border-radius:50%;
}
```
Và chúng ta có kết quả như sau :
{@embed: https://codepen.io/duy-nguyn-the-vuer/pen/wvwdaVb?editors=1100}
## 3. Kết
Cảm ơn các bạn đã đọc, hẹn gặp lại tại bài viết tiếp theo.