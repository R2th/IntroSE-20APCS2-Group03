## Giới thiệu
Tôi nhớ lần đầu tiên tôi học CSS và cách tôi hào hứng tìm hiểu về float và inline display để đặt các thành phần trong bố cục mong muốn. Tôi tự hỏi làm thế nào tôi có thể tạo ra một hệ thống layout bố trí hai chiều có sẵn tại thời điểm đó. Trên thực tế, ngay cả bây giờ tôi rất phấn khích về điều này bởi vì nó thay đổi mọi thứ: cách chúng ta viết CSS nhưng cũng là cách chúng ta markup. Với grid CSS, việc xây dựng bố cục responsive, dynamic và theo thứ tự nhất định dễ dàng hơn bao giờ hết.

Trong bài đăng này, chúng ta sẽ tìm hiểu về tất cả các thuộc tính grid CSS để xây dựng layout dễ dàng và một số layout nâng cao hơn. Chúng ta sẽ định nghĩa mọi thứ sau đó chúng ta sẽ đào sâu hơn một chút để xem những gì chúng ta có thể đạt được với grid CSS.

### Trước khi chúng ta bắt đầu
Nhưng trước khi chúng ta bắt đầu, tôi muốn giải quyết một số lo ngại mà bạn có thể có, cũng như đảm bảo rằng chúng ta đã quen thuộc với những điều cơ bản về grid CSS và các thuật ngữ của nó.

**Q&A**   
**Q**: Grid CSS có thay thế flex-box không?   
**A**: Chà, grid CSS không thay thế flex-box. Chúng là hai công cụ khác nhau cho các mục đích khác nhau. Trên thực tế, chúng hoạt động rất tốt với nhau, chúng ta có thể có `flex` hiển thị bên trong `grid` và ngược lại.

**Q**: Sự khác biệt giữa grid CSS và flex-box là gì?             
**A**: Có rất nhiều sự khác biệt, nhưng cái chính là hộp flex là hệ thống layouts một chiều trong khi grid CSS là hệ thống layouts hai chiều. Hãy nhìn vào dưới đây:

![](https://images.viblo.asia/4e398879-6369-4979-93e1-b64dedcca22b.png)    

**Q**: Tại sao không sử dụng bootstrap thay thế?   
**A**: Tôi nghĩ rằng câu trả lời tốt nhất cho câu hỏi này là trích dẫn này của Jen Simmons:
> The more I use CSS Grid, the more convinced I am that there is no benefit to be had by adding a layer of abstraction over it. CSS Grid is the layout framework baked right into the browser —  Jen Simmons  

### Khái niệm cơ bản
Về cơ bản, một grid có thể được chia thành hai yếu tố: `the grid container` và `the grid-items`.

![](https://images.viblo.asia/c13230f9-c794-4bb6-a5c6-cc94a869a270.png)

Như chúng ta thấy trong hình trên , grid container là một tập hợp các cột và hàng. row là khoảng trắng giữa hai dòng liên tiếp (đường ngang) và column là khoảng cách giữa hai đường cột liên tiếp (đường dọc). Một hàng có thể được gọi là một track và tương tự cho một cột. Vì vậy, một grid `track` là một không gian giữa hai grid-lines song song.

Mỗi rãnh có thể có một hoặc nhiều grid cells. Grid `cell` là đơn vị grid cơ bản vì nó là đơn vị nhỏ nhất. Đó là khoảng trống giữa bốn grid-lines giao nhau. Nếu chúng ta kết hợp nhiều grid cells với nhau, chúng ta có một `grid area`. Điều quan trọng cần đề cập là một khu vực grid phải là hình chữ nhật, chúng ta không thể có một khu vực grid hình chữ T được.

Các grid-lines bắt đầu từ 1 đến số lượng dòng bạn xác định rõ ràng hoặc ngầm định. Số grid-lines cuối cùng có thể được gọi là -1, grid-lines trước nó là -2 và cứ thế. Điều này sẽ có ích sau này.

Trong hình trên , số lượng các dòng cột đi từ 1 đến 6 (từ -6 đến -1) và số lượng các dòng hàng đi từ 1 đến 5 (hoặc -5 đến -1).

Số lượng các grid-lines được xem xét `explicit` nếu bạn đặt nó rõ ràng trong CSS của mình. Và nó được xem xét `implicit` nếu nó được thiết lập bởi trình duyệt một cách linh hoạt.

Cuối cùng, các grid cells có thể được phân tách bằng khoảng trắng hoặc khoảng cách. Những khoảng trống đó được gọi `gutters`, nhưng chúng ta thường gọi chúng là `gaps` :).

### Thuộc tính cơ bản của Grid CSS 
Ok, với điều đó chúng ta nên sẵn sàng để bắt đầu thực hiện một số grids. Trước tiên chúng ta sẽ nói về tất cả các thuộc tính chúng ta có thể sử dụng với grid container, sau đó chúng ta sẽ xem xét các thuộc tính của grid-items sau.

Hãy xem xét đoạn code sau cho phần này:
```
<div class="grid-container">
    <div class="grid-item">grid item 1</div>
    <div class="grid-item">grid item 2</div>
    <div class="grid-item">grid item 3</div>
    <div class="grid-item">grid item 4</div>
    <div class="grid-item">grid item 5</div>
    <div class="grid-item">grid item 6</div>
    <div class="grid-item">grid item 7</div>
    <div class="grid-item">grid item 8</div>
    <div class="grid-item">grid item 9</div>
</div>
```
#### The Grid container
##### Display
Một grid CSS được xác định bằng cách sử dụng giá trị grid của thuộc tính display. Vì vậy, để xác định grid bằng cách sử dụng code ở trên, chúng ta nên thêm css:
```
.grid-container {
  display: grid;
}
```
##### Rows & Columns
Chúng ta có thể xác định các rows và columns trên grid của bạn bằng cách sử dụng các thuộc tính grid-template-rows và grid-template-columns:
```
.grid-container {
  grid-template-columns:  1fr 1fr 1fr 1fr;
  grid-template-rows:  1fr auto 2fr;
}
```
Hoặc chúng ta có thể sử dụng grid-template, đầu tiên chúng ta xác định grid-template-rows sau đó grid-template-columns(cách nhau bằng dấu gạch chéo):
```
.grid-container {
  grid-template:  1fr auto 2fr  / 1fr 1fr 1fr 1fr;
}
```
Chú thích: an fr là một đơn vị phân số, vì vậy 1fr là cho 1 phần của khoảng không có sẵn.
##### Repeat function
Các hàm repeat() đại diện cho một đoạn lặp đi lặp lại của các track-list.
Vì vậy, chúng ta có thể có 1 cách làm khác để nó show ra tương tự như trên
```
.grid-container {
  grid-template:  1fr auto 2fr / repeat(4, 1fr);
}
```
##### Minmax function
CSS xác định phạm vi kích thước lớn hơn hoặc bằng `min` và nhỏ hơn hoặc bằng `max`.
Chúng ta có thể sử dụng với hàm repeat() như thế này:
```
.grid-container {
  grid-template-columns:  repeat(3, minmax(100px, 1fr));
}
```
##### Gaps
Chúng ta có thể thêm các khoảng trống giữa các row-lines bằng cách sử dụng `row-gap`, chúng ta có thể làm tương tự giữa các column-lines bằng cách sử dụng column-gap:
```
.grid-container {
 row-gap: 5px;
 column-gap: 10px;
}
```
Hoặc chúng ta có thể sử dụng `gap`: đoạn đầu xác đinh `row-gap` sau đó là xác định `column-gap`:
```
.grid-container {
  gap: 5px 10px;
}
```
Nếu khoảng cách row giống với khoảng cách column, chúng ta chỉ cần chỉ định một giá trị.
##### The grid items
Để chỉ định vị trí bắt đầu và kết thúc của một `grid items` trong grid, về cơ bản chúng ta sử dụng bốn thuộc tính. Chúng ta hãy xem định nghĩa của nó:
Định nghĩa

| Properties | Definitions | 
| -------- | -------- |
| grid-row-start | Thuộc tính CSS grid-row-start chỉ định vị trí bắt đầu của một item-grid trong grid-row bằng cách đóng góp a line, a span, or nothing (tự động)     | 
| grid-row-end | Thuộc tính CSS grid-row-end chỉ định vị trí kết thúc của item-grid trong grid-row bằng cách đóng góp a line, a span, or nothing (tự động)  | 
| grid-column-start| Thuộc tính CSS của grid-column-start chỉ định vị trí bắt đầu của một item-grid trong grid-column bằng cách đóng góp a line, a span, or nothing (tự động)    | 
| grid-column-end | Thuộc tính CSS của grid-column-end chỉ định vị trí kết thúc của một item-grid trong grid-column bằng cách đóng góp a line, a span, or nothing (tự động)   |                                                                                                                                       
 ####
##### Basic template spacing
Vì vậy, xem xét makup chúng ta có ở đầu phần này, giả sử chúng ta muốn grid-item thứ ba lấy 4 ô thay vì một ô (chúng ta muốn nó trải dài qua hai grid-column và hai grid-row) như trong hình dưới . 
![](https://images.viblo.asia/6e6aacda-fa9c-42b1-8d7f-cd3d75a07e80.png)
Làm thế nào chúng ta có thể làm điều đó?   
Chúng ta có thể thực hiện như thế này:
```
// Grid container
.grid-container {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
}

// Grid item (third)
.grid-container .grid-item:nth-child(3) {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
  // or
  grid-column: 1 / 3;
  grid-row: 1 / 3;
  // or
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;
  // or
  grid-column: -5 / span 2; // because we have 4 columns
  grid-row: -4 / span 2; // because we have 3 rows
}
```

## 3. Advanced templating
Có nhiều thuộc tính nâng cao hơn có thể giúp bạn điều chỉnh mẫu của bạn như bạn muốn. Trong phần này, chúng ta sẽ xem xét các thuộc tính này và xem cách chúng ta có thể sử dụng chúng trong CSS của mình.

Đối với phần này, hãy xem xét đoạn code sau:
 ```
<div class="grid-container">
   <div class="grid-item header">Header</div>
   <div class="grid-item content">Content</div>
   <div class="grid-item navbar">Navbar</div>
   <div class="grid-item meta">Meta</div>
   <div class="grid-item footer">Footer</div>
 </div>
```
Sử dụng những gì chúng ta đã học phía, chúng ta có thể thực hiện CSS sau để làm cho nó trông giống như một bố cục trang web cơ bản:
```
.grid-container {
  grid-template: repeat(6, 1fr) / repeat(12, 1fr);// rows then columns
}
.grid-container .header {
  grid-column: 1 / -1;  grid-row: 1 / 2;
}
.grid-container .navbar {
  grid-column: 1 / 2;  grid-row: 2 / -1;
}
.grid-container .content {
  grid-column: 2 / -1;  grid-row: 2 / -2;
}
.grid-container .footer {
  grid-column: 2 / -1;  grid-row: -2 / -1;
}
.grid-container .meta {
  grid-column: -3 / -1;  grid-row: 2 / 4;
}
```
![](https://images.viblo.asia/2f4c73c2-ea49-4a6e-92be-4a41b5eca488.png)

Bây giờ tôi muốn thanh navbarcủa chúng ta (ở bên phải) rộng hơn một chút. Hiện tại, nó trải dài trên một column-lines, chúng tôi muốn nó trải dài qua hai column-lines. Để làm điều này, chúng ta phải thay đổi vị trí .navbar nhưng nếu làm thế ta cũng phải thay đổi vị trí .content và .footer, bởi vì hiện tại .navbar đi từ cột 1 đến 2 và .footer& .content đi từ cột 2 đến cuối cùng.

Có thể rất lởm khi thay đổi vị trí của các yếu tố nếu mỗi lần ta muốn thay đổi một yếu tố, sẽ thật tuyệt nếu có một cách để đảm bảo grid CSS tự động làm điều này cho chúng ta. Chà, không có một cách, nhưng có ít nhất hai :D

#### Named lines
Giải pháp đầu tiên là đặt tên cho dòng cụ thể, sau đó chúng ta đề cập đến nó bằng cách sử dụng bí danh của nó thay vì số của nó. Hãy thử thực hiện điều này.
```
.grid-container {
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: 1fr 1fr [content-start navbar-end] repeat(10, 1fr);
}
```
Trong đoạn mã trên, chúng ta đã đặt tên cho dòng thứ ba bằng cách sử dụng dấu ngoặc đơn giản với các aliass bên trong (một dòng sigle có thể có nhiều aliasses). Sau đó, bây giờ chúng ta sẽ thay đổi CSS của các yếu tố khác:
.grid-container .navbar {
```
  grid-column: 1 / navbar-end;  grid-row: 2 / -1;
}
.grid-container .content {
  grid-column: content-start / -1;  grid-row: 2 / -2;
}
.grid-container .footer {
  grid-column: content-start / -1;  grid-row: -2 / -1;
}
```
Kết quả sẽ như thế này:
![](https://images.viblo.asia/b7fa9620-aaab-4f00-9c61-36ec7415ddd7.png)

#### Element template areas
Giải pháp thứ hai bao gồm sử dụng các template areas. Các grid-template-areas quy định cụ thể thuộc tính CSS được đặt tên grid-area. Thuộc tính này có một cú pháp kỳ lạ cho CSS nhưng chúng ta sử dụng chúng như thế này:
```
grid-container {
  grid-template-areas:
    'h h h h h h h h h h h h'
    'n n c c c c c c c c c c'
    'n n c c c c c c c c c c'
    'n n c c c c c c c c c c'
    'n n c c c c c c c c c c'
    'n n f f f f f f f f f f';
}
.grid-container .navbar {
  grid-area: n;
}
.grid-container .content {
  grid-area: c;
}
.grid-container .footer {
  grid-area: f;
}
.grid-container .header {
  grid-area: h;
}
.grid-container .meta {
  grid-column: -3 / -1;  grid-row: 2 / 4;
}
```
Chúng ta sử dụng grid-template-areas để xác định các grid-area, sau đó chúng ta đặt các item-grid trong khu vực mong muốn bằng cách sử dụng grid-area.
Xin nhắc lại, tất cả các area phải là hình chữ nhật.

### Phần kết luận
Phía trên có khá nhiều thông tin cần xử lý, nhưng cùng với đó, chúng tôi đã đề cập đến nhiều thuộc tính grid CSS để bạn cảm thấy thoải mái khi bắt đầu sử dụng grid CSS trong ứng dụng của mình. Bài này là bài đầu tiên của loạt bài, trong phần tiếp theo chúng ta sẽ thực hiện 3 ví dụ thực tế sử dụng grid, vì vậy hãy theo dõi nhé!!!!!

<<<< tadaaa bài thứ 2 có rồi đây [example](https://viblo.asia/p/css-grid-3-practical-examples-924lJ37N5PM)