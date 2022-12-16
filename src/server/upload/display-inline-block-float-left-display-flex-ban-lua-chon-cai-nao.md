**Trong quá trình xây dựng giao diện website thì việc bắt gặp xây dựng layout cho bố cục hay hiển thị list box ta gặp khá nhiều, mình xin trình bày 3 cách để xử lý bài toán này với ví dụ thực tế.**
## Yêu cầu
 Hiển thị một list box với yêu cầu 4 box trên một hàng.

  Ta có khối html với phần style ban đầu:
```
 <ul>
  <li class="box1"><a>box1</a></li>
  <li class="box2"><a>box2</a></li>
  <li class="box3"><a>box3</a></li>
  <li class="box4"><a>box4</a></li>
  <li class="box5"><a>box5</a></li>
  <li class="box6"><a>box6</a></li>
  <li class="box7"><a>box7</a></li>
  <li class="box8"><a>box8</a></li>
  <li class="box9"><a>box9</a></li>
  <li class="box10"><a>box10</a></li>
</ul>
```
style
```
li{
  font-size: 25px;
  list-style: none;
  height: 300px;
  width:25%;
}


li a {
  display: block;
  background: green;
  height: 100%;
  color: #fff;
  text-align: center;
  line-height:300px;
  margin: 10px;
}
```

## Display: inline-block

Phần lý thuyết bạn có thể tìm hiểu tại [here](https://www.w3schools.com/css/css_inline-block.asp)

Bây giờ ta thay đổi lại style:
```
li {
display: inline-block;
}
```
nhưng kết quả:

![](https://images.viblo.asia/ac215029-365f-4605-876c-cd853be673ef.png)

Bây giờ ta thay đổi  thêm phần style:
```
ul {
  font-size: 0;
}
```
kết quả nhận được như ý muốn:

![](https://images.viblo.asia/07a15f69-7f81-467d-a487-accf0905fae3.png)

## Float: left
Chi tiết bạn có thể tham khảo tại [here](https://www.w3schools.com/cssref/pr_class_float.asp)

Thay vì sử dụng thuộc tính inline-block ta thay vào đó là thuộc tính float: left
```
li {
  float: left;
}
```
kết quả ta đạt được hoàn toàn như mong muốn:
![](https://images.viblo.asia/07a15f69-7f81-467d-a487-accf0905fae3.png)

*nhưn*g, điều gì sẽ xảy ra nếu một phần tử trong đó có kích thước nhở hơn so với phần tử bên cạnh

```
li.box4 {

  height: 150px;
}
```
giao diện sẽ không còn được như trước:
![](https://images.viblo.asia/47acac20-e3c6-470e-a879-09af5aa9bebd.png)

Điều quan trong nhất khi sử dụng float: left là làm sao để tránh trường hợp height của phần tử cần đồng đều, khi xây dựng layout thuộc tính này thường đi kèm với thuộc tính clear: both.
Thuộc tính này ta có thể thấy nó được sử dụng rất nhiều trong Boostrap3 với hệ thống grid chia layout.

## Display: flex

Phần tài liệu chi tiết bạn có thể tham khảo tại [here](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
Các thuộc tính đi kèm với display: flex là rất nhiều nhưng mình chỉ đề cập tới một số thuộc tính để giải quyết bài toán phía trên.

Nếu ta chỉ sử dụng mỗi thuộc tính display: flex ở phần tử cha thì kết quả:
```
ul {
  display: flex;
}
```
![](https://images.viblo.asia/81c2e333-94c3-4e3a-aadb-4cf65aa7652b.png)

Mặc định khi chỉ sử dụng thuộc tính này là sẽ chia đều các phần tử có và hiển thị trên một hàng.
Để hiển thị theo mong muốn ta thêm thuộc tính:
```
ul {
  display: flex;
  flex-wrap: wrap; # có thể hiển thị trên nhiều dòng
}

li {
  #trong flex ta có thể thay thế thuộc tính width thành flex-basis để set mặc định.
  flex-basis: 25%;
}
```
kết quả ta nhận được
![](https://images.viblo.asia/07a15f69-7f81-467d-a487-accf0905fae3.png)

Đối với 'display: flex' thì đây là thuộc tính rất mạnh mẽ và được ưa chuộng nhất hiện nay, hiện các framwork mới nhất cũng đã apply thuộc tính này vào dượng layout (hệ thống grid của Bootstrap4 ...). Điểm trừ duy nhất mình nhận thấy là việc sử dụng nó trên IE phiên bản thấp.

## Tổng kết
## Tài liệu tham khảo
https://css-tricks.com/snippets/css/a-guide-to-flexbox/
https://www.w3schools.com/cssref/pr_class_float.asp
https://www.w3schools.com/css/css_inline-block.asp