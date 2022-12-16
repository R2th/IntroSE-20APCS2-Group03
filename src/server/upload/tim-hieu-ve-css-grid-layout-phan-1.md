## Giới thiệu
Hello mọi người, chào mừng đến với channel của mình =))

Mình tự hứa với bản thân là phải tìm hiểu CSS Grid đã lâu nhưng hôm nay mới có dịp để cùng tìm hiểu và đồng thời muốn sharing về CSS Grid Layout, một hệ thống layout khá mạnh mẽ và được sử dụng hiện nay.

**CSS Grid layout** là một hệ thống cung cấp các bố cục dạng lưới hai chiều, đặc biệt không dùng đến float và position và nhằm mục đích mang lại các thay đổi mới mẻ cho việc thiết kế bố cục giao diện người dùng.

Các trình duyệt hiện nay hầu hết đều hổ trợ CSS Grid Layout, bạn có thể xem thêm hình ảnh bên dưới
hoặc ở link này (https://caniuse.com/#feat=css-grid)

![](https://images.viblo.asia/6d578dc4-bd74-42f2-87f3-f5afece27eff.PNG)

## OK, cùng bắt đầu thôi (len)

## Các thuật ngữ quan trọng

Tại sao lại có mục này, vì chúng ta cần hiểu rõ về các khái niệm trong grid layout để đỡ nhầm lẫn và hiểu được chúng được áp dụng như thế nào cho việc thiết kế các layout
### Grid Container
   Đây là element cha quyết định các element con có hiển thị theo grid layout hay không
   Vd:
   
   ```
    <div class="container" style="display: grid">
		<div class="item item 1"></div>
		<div class="item item 2"></div>
		<div class="item item 3"></div>
		<div class="item item 4"></div>
	</div>
   ```
### Grid item
   Hiểu đơn giản grid item là các phần tử con mà nó được tuân theo grid layout
### Grid Line
Line là gì, line là đường kẻ, dòng kẻ, thế thôi :D => Grid Line là các đường kẻ ngang hoặc dọc giữa các phần tử con,
đường kẻ vàng bên dưới là một grid line
![](https://images.viblo.asia/bd68f363-d131-4402-972b-2af6a1b7752c.PNG)
### Grid Cell
Cell là gì, cell là ô :D, Grid Cell là khoảng cách giữa hai line ngang và hai line dưới liền kề, mình hiểu là ntn, hình minh họa bên dưới sẽ dễ hiểu hơn =))
![](https://images.viblo.asia/533cda3c-6945-47e2-9bab-b2fb680f1e6b.PNG)
### Grid Track
Track là gì, mấy bro tự transalte đi :D, còn Grid Track là khoảng cách giữa 2 line ngang liền kề hoặc 2 line dọc liền kề

![](https://images.viblo.asia/e47307c9-adff-45c4-8996-b2fc4f3ae386.PNG)
### Grid Area
Area là gì, là khu vực, các mục có thể kéo dài một ô hoặc nhiều ô theo chiều hàng hoặc theo cột để tạo thành một Grid Area
![](https://images.viblo.asia/839c7c9c-0943-48fd-94aa-d1522d1726dd.PNG)


## Thực hành thôi
### display grid
```
.container {
  display: grid; // các phần tử con sẽ hiển thị theo khối block
  display: inline-grid; // các phần tử con sẽ hiển thị theo khối inline
}
```
2 value grid và inline-grid cũng khá giống với việc set các phần tử con là tag ```<div>``` hoặc ```<span>```
### grid-template-columns và grid-template-rows
Dùng để xác định các rows và colums
```
.container {
  grid-template-columns: 40px 50px auto 50px 40px;
  grid-template-rows: 25% 100px auto;
}
```
Kết quả:
![](https://images.viblo.asia/81f2e583-b876-444e-a18f-30f72a4a48ba.PNG)
Nếu muốn định nghĩa các row hoặc column lặp lại có cùng khoản cách thì có thể sử dụng repeat()
Rất hữu ích khi muốn các element có không gian bằng nhau. Vd:
```
/* CSS */
.container {
    display: inline-grid;
    grid-template-columns: repeat(3, 120px);
    grid-template-rows: repeat(3, 120px);
    border: 1px solid green;
}
.container div {
    border: 1px solid green;
}
/* HTML */
<div class="container">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>
```
Kết quả
![](https://images.viblo.asia/d664556a-d037-4581-9afb-ab6c71c2d178.PNG)
### grid-template-areas
Xác định các vùng lưới theo tên của các mẫu lưới được xác định = grid-area: "area-name";
Vd:
```
/* CSS */
.item-a {
    grid-area: header;
}
.item-b {
    grid-area: main;
}
.item-c {
    grid-area: sidebar;
}
.item-d {
    grid-area: footer;
}
.container {
    display: grid;
    grid-template-columns: 50px 50px 50px 50px;
    grid-template-rows: auto;
    grid-template-areas: 
    "header header header header"
    "main main . sidebar"
    "footer footer footer footer";
}
/* HTML */
<div class="container">
    <div class="item-a"></div>
    <div class="item-b"></div>
    <div class="item-c"></div>
    <div class="item-d"></div>
</div>
```
Kết quả:
![](https://images.viblo.asia/0c830184-7dbf-4e06-b551-1c4d20b33ede.PNG)
### grid-template
1 shorthand để thiết lập grid-template-rows, grid-template-columns, và grid-template-areas trong 1 lần khai báo


Syntax:
```
.container {
    grid-template: <grid-template-areas> | <grid-template-rows> / <grid-template-columns>;
}
```
### column-gap, row-gap
Xác định độ dày của các line, khá giống padding khi chia layout đúng k ạ =))
Ví dụ:
```
.container {
    grid-template-columns: 100px 50px 100px;
    grid-template-rows: 80px auto 80px; 
    column-gap: 10px;
    row-gap: 15px;
}
```
Kết quả:
![](https://images.viblo.asia/f57312b0-6d86-4c31-a700-1a8c92b87514.PNG)
### gap
1 shorthand hữu ích để set cho column-gap và row-gap

Ví dụ và kết quả như trên
```
.container {
  grid-template-columns: 100px 50px 100px;
  grid-template-rows: 80px auto 80px; 
  gap: 15px 10px; /*<row-gap> <column-gap>*/
}
```
## Tổng kết
Trên đây là bài tìm hiểu phần đầu của mình về CSS Grid Layout, còn rất nhiều các properties khác mình để tìm hiểu dần cho phần 2, hi vọng sẽ giúp ích cho mình và cả mọi người và nhớ đăng ký kênh của mình nha =))