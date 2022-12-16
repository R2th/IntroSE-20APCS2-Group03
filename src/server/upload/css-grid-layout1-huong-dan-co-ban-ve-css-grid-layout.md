****CSS Grid Layout** là gì, ở bài viết này mình muốn giới thiệu một chút về nó qua một số ví dụ đơn giản để mọi người thấy được sự tiện dụng của nó để sau này có thể áp dụng được **Grid Layout** vào thực tế.**

### CSS Grid Layout là gì

Hệ thống Grid Layout của CSS cung cấp một hệ thống bố cục dạng lưới, với cột và hàng (Khá giống với col và row của Bootstrap) mà không còn cần sử dụng đến `float`  hay `position`

Đầu tiên, cái chúng ta cần quan tâm nhất là nó có thể sử dụng ở gần như tất cả các trình duyệt hiện đại. 

![](https://images.viblo.asia/34ce8f5d-55f4-4bdc-9967-c35a2e398524.png)

### Thuộc tính `display`
Một layout dạng lưới này phải có một element cha với `display` được set là `grid` hay `inline-grid`.

Khi dùng `display: grid;`, chúng ta sẽ được một container chứa grid dưới dạng block

**HTML**
```
<div class="container">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
    <div class="item">5</div>
    <div class="item">6</div>
    <div class="item">7</div>
    <div class="item">8</div>
</div>
```

**CSS**

```
.container {
  display: grid;
  grid-template-columns: auto auto;
  background-color: #3e2723;
  padding: 10px;
  border-radius: 10px;
}
.item {
  background-color: #80cbc4;
  border: 1px solid #fff;
  padding: 20px;
  font-size: 30px;
  text-align: center;
}
```
Và chúng ta sẽ có:
![](https://images.viblo.asia/0430efa3-36b7-4a56-8e80-03ccd0904e35.png)

Chúng ta có thể thay đổi kích thước các cột như sau:

**CSS**

```
.container {
  display: grid;
  grid-template-columns: 100px 500px;
}
```
![](https://images.viblo.asia/6b66489e-b287-41b0-b950-1004c5f8dbf5.png)

Các bạn có thể tùy biến layout của bạn ở [đây](https://codepen.io/serg-gavel/pen/OzBJpa/) 

Tương tự như `display: grid;`,   `display: inline-grid;` sẽ khiến tạo một container inline.

**CSS**
```
.container {
  display: inline-grid;
  grid-template-columns: auto auto auto auto;
  background-color: #3e2723;
  padding: 10px;
  border-radius: 10px;
}
.item {
  background-color: #80cbc4;
  border: 1px solid #fff;
  padding: 40px;
  font-size: 30px;
  text-align: center;
}
```
Chúng ta cũng có thể tùy biến được các hàng (rows) một cách đơn giản.

**CSS**
```
.container {
  display: grid;
  grid-template-rows: auto; 
}
```
![](https://images.viblo.asia/6b38e9ab-3169-4669-aab0-b55ba4d947c7.png)

### Khoảng cách trong Grid

Chúng ta cũng có thể thay đổi hoảng cách giữa các cột/hàng bằng cách sử dụng một số thuộc tính sau:

**CSS**
```
.container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  
  grid-column-gap: 10px;
  grid-row-gap: 25px;
 
  background-color: #3e2723;
  padding: 10px;
  border-radius: 10px;
}
.item {
  background-color: #80cbc4;
  border: 1px solid #fff;
  padding: 40px;
  font-size: 30px;
  text-align: center;
}
```
Hoặc có thể viết ngắn gọn lại là `grid-gap: 25px 10px;`
![](https://images.viblo.asia/f35faa65-f8f8-4991-b38a-5270b9e815ef.png)

### Đường kẻ
Đường kẻ giữa các hàng gọi là row lines, giữa các cột là column lines

![](https://images.viblo.asia/d1dbacf3-3f2d-4468-b148-a0f48c25f233.png)

Lấy ví dụ nào, chúng ta sẽ để ô 1 và 6 bắt đầu từ column line 1 và kết thúc ở column line 3

**HTML**
```
<div class="container">
    <div class="item1">1</div>
    <div class="item2">2</div>
    <div class="item3">3</div>
    <div class="item4">4</div>
    <div class="item5">5</div>
    <div class="item6">6</div>
    <div class="item7">7</div>
</div>
```
**CSS**
```
.container {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 10px;
  
  background-color: #3e2723;
  padding: 10px;
  border-radius: 10px;
}
.container > div {
  background-color: #80cbc4;
  border: 1px solid #fff;
  padding: 40px;
  font-size: 30px;
  text-align: center;
}
.item1,  .item6 {
  grid-column-start: 1;
  grid-column-end: 3;
  //hoặc có thể viết ngắn hơn bằng "grid-column":
  //grid-column: 1 / 3;
}
```

![](https://images.viblo.asia/a34f293f-a7e7-4a67-9d7a-a9db76df4fb8.png)

Và với thuộc tính `grid-row`: 
```
.item1, .item6 {
   grid-row: 1 / 3;
}
```
![](https://images.viblo.asia/1990827e-5ff2-4124-a257-95b28a288443.png)

### Thuộc tính `grid-area`

Thuộc tính  `grid-area` có thể được dùng thay cho các thuộc tính `grid-row-start`, `grid-column-start`, `grid-row-end`, và `grid-column-end`

```
<div class="container">
    <div class="item1">1</div>
    <div class="item2">2</div>
    <div class="item3">3</div>
    <div class="item4">4</div>
    <div class="item5">5</div>
    <div class="item6">6</div>
    <div class="item7">7</div>
    <div class="item8">8</div>
    <div class="item9">9</div>
    <div class="item10">10</div>
    <div class="item11">11</div>
</div>
```
```
.item5 {
  grid-area: 1 / 2 / 5 / 7;
}
```

`item5` sẽ bắt đầu ở row-line 1 và column-line 2, và kết thúc ở row-line 5 và column-line 7. Kết quả: 
![](https://images.viblo.asia/33b0b71c-4bd8-44b8-9703-c6dfd09d68d8.png)

[Demo](https://codepen.io/serg-gavel/pen/RxeWqe)

### Đặt tên cho các item của Grid
Chúng ta có thể gán tên cho từng item với thuộc tính `grid-area`.

**HTML**
```
<div class="container">
  <div class="item1">Header</div>
  <div class="item2">Left Side</div>
  <div class="item3">Main</div>  
  <div class="item4">Right side</div>
  <div class="item5">Footer</div>
</div>
```

**CSS**
```
.container {
  display: grid;
  grid-template-areas:
    'header header header header header header'
    'menu main main main right right'
    'menu footer footer footer footer footer';
}
.item1 { grid-area: header; }
.item2 { grid-area: menu; }
.item3 { grid-area: main; }
.item4 { grid-area: right; }
.item5 { grid-area: footer; }
```

![](https://images.viblo.asia/1c8db552-a828-43ec-bbb5-d9abc417b5da.png)

[Demo](https://codepen.io/serg-gavel/pen/wpYMvv)

Qua bài viết này chúng ta đã được làm quen với các thuộc tính và cách sử dụng cơ bản của hệ thống Grid Layout CSS, bài viết sau chúng ta sẽ áp dụng hế thống này vào trong việc thiết kế một layout website đơn giản để mọi người có thể hình dung ra ứng dụng thực tế của hệ thống khá thú vị này.

Thank you for attention!