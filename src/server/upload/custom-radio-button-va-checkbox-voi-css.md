Trong bài viết này mình sẽ hướng dẫn các bạn làm sao để có thể thay đổi các radio button hay các checkbox mặc định nhàm chán. Kỹ thuật được sử dụng ở đây là sẽ dùng các pseudo element của CSS.

## 1. Custom radio button
### 1.1 Tạo HTML
Đầu tiên hãy tạo một đoạn HTML với cấu trúc:
```HTML
<label>
    <input type="radio">
</label>
```
Mình sẽ ví dụ theo đoạn HTML sau:
```HTML
<label class="container">1
  <input type="radio" name="radio" id="1">
  <span class="checkmark"></span>
</label>
<label class="container">2
  <input type="radio" name="radio" id="2">
  <span class="checkmark"></span>
</label>
<label class="container">3
  <input type="radio" name="radio" id="3">
  <span class="checkmark"></span>
</label>
```
Bây giờ đã có HTML và chúng ta sẽ dùng CSS để style cho nó.

### 1.2 Dùng CSS để style
Như ban đầu mình đã nói là sử dụng các pseudo element và cụ thể ở đây mình sẽ dùng `::after`. Các bạn có thể tham khảo theo đoạn CSS sau của mình.
```CSS
.container{
  display: inline-block;
  position:relative;
  cursor:pointer;
  font-size:30px;
  user-select: none;
  padding-left:40px;
  margin-bottom:10px;
}
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}
.checkmark{
  position:absolute;
  top:0;
  left:0;
  width:30px;
  height:30px;
  background:#eee;
  border-radius:50%;
}
.container:hover .checkmark{
  background:#ccc;
}
.checkmark:after{
  content:"";
  position:absolute;
  display:none;
}
.container .checkmark:after{
  top:50%;
  left:50%;
  width: 15px;
  height: 15px;
  border-radius:50%;
  border: solid 3px white;
  transform:translate(-50%,-50%) rotate(45deg);
}
.container input:checked ~ .checkmark{
  background:#2196F3;
}
.container input:checked ~ .checkmark:after{
  display:block;
}
```
Chúng ta sẽ được kết quả như sau:
{@embed: https://codepen.io/duy-nguyn-the-vuer/pen/LYPyVQL?editors=0100}

## 2. Custom checkbox
### 2.1 Tạo HTML
Tương tự như việc custom radio button thì đầu tiên hãy tạo một đoạn HTML với cấu trúc:
```HTML
<label>
    <input type="checkbox">
</label>
```
Demo theo đoạn HTML sau:
```html
<label class="container">1
  <input type="checkbox" checked="checked">
  <span class="checkmark"></span>
</label>
<label class="container">2
  <input type="checkbox">
  <span class="checkmark"></span>
</label>
<label class="container">3
  <input type="checkbox">
  <span class="checkmark"></span>
</label>
```
Tiếp theo chúng ta sẽ style cho nó.
### 2.2 Dùng CSS để slyte
Ở đây mình cũng sẽ sử dụng pseudo element `::after`.
```css
.container{
  display: inline-block;
  position:relative;
  cursor:pointer;
  font-size:30px;
  user-select: none;
  padding-left:40px;
  margin-bottom:10px;
}
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkmark{
  position:absolute;
  top:0;
  left:0;
  width:30px;
  height:30px;
  background:#eee;
  border-radius:3px;
}
.container:hover .checkmark{
  background:#ccc;
}
.checkmark:after{
  content:"";
  position:absolute;
  display:none;
}
.container .checkmark:after{
  top:50%;
  left:50%;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform:translate(-50%,-50%) rotate(45deg);
}
.container input:checked ~ .checkmark{
  background:#2196F3;
}
.container input:checked ~ .checkmark:after{
  display:block;
}
```
Kết quả chúng ta sẽ được:
{@embed: https://codepen.io/duy-nguyn-the-vuer/pen/VwZbZod?editors=1100}

## 3. Kết luận.
Như vậy trong bài viết này mình đã hướng dẫn cách làm sao để có thể custom lại các rado button hay các checkbox mặc định nhàm chán.
Trong bài viết sau mình sẽ giới thiệu cách để tạo một swich checkbox, hy vọng các bạn sẽ xem.
Cảm ơn các bạn đã đọc bài viết của mình.