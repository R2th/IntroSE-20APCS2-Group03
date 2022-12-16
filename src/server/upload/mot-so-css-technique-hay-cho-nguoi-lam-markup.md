### Giới thiệu
Hôm nay mình xin chia sẻ 1 số CSS Technique dành cho người làm Markup, tuy nhỏ đơn giản nhưng không phải ai cũng biết
rất có ích cho công việc thực tế.
###  CSS Technique
**1. Đổi style sang chế độ Dark Mode**
<br>Để làm được cái này thì đơn giản chỉ cần dùng ***prefers-color-scheme: dark*** là có thể chuyển màu từ sáng sang tối.
<br>CSS
```CSS
media (prefers-color-scheme: dark) {
  body {
    background: #333;
    color: #fff;
  }
}
```
**2.  Scroll theo từng Section**
<br>Phần này sẽ cần đến scroll-snap để tạo ra được scroll theo từng Section.
<br>HTML
```HTML
<main class="container">
  <section class="section">Section 1</section>
  <section class="section">Section 2</section>
  <section class="section">Section 3</section>
  <section class="section">Section 4</section>
</main>
```
<br>CSS
```CSS
html,
body {
  height: 100%;
}
 
.container {
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  height: 100%;
}
 
.section {
  scroll-snap-align: start;
  height: 100%;
}
```

**3.Bỏ heightlight đi khi hover chuột**
<br>Cái này hữu ích với những anchor link hay button
```CSS
.class {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
```
**4.Hiển thị list chọn đối với input field**
<br>Cái này khá là giống với select dropdown, có thể chọn được các option
<br>HTML
```HTML
<input list="" />
```
```HTML
<form>
  <input list="animals" />
  <datalist id="animals">
    <option value="dog"></option>
    <option value="cat"></option>
    <option value="elephant"></option>
  </datalist>
</form>
```
<br> CSS
```CSS
input {
  border: 1px solid #ffd152;
  padding: 8px;
  outline: none;
  width:300px;
  background-color:#ffeebf;
}
```
### Lời kết
 Hi vọng những tip nhỏ trên sẽ có ích cho các bạn làm Markup và hẹn mọi người ở phần 2 nhé.