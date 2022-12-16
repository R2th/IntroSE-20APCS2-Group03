![](https://images.viblo.asia/5dbbc47e-8479-46b3-b83c-8507a5e527b3.png)

Bài viết này sẽ giới thiệu tổng quan về `grid` cơ bản cho các bạn.

Có 5 phút thôi, chúng ta cùng bắt đầu nào. `Let go!!!`

## 1. `Grid` layout

Hai thành phần cốt lõi của `grid` là các `div` bọc ngoài (cha mẹ) và các `item` bên trong (con). 

`div` bọc ngoài tạo ra `grid` và `item` chính là nội dung bên trong cần sắp xếp của `grid`.

Bên dưới là ví dụ của class `wrapper` cùng với 6 `item` con

```
<div class="wrapper">
  <div class="item1">1</div>
  <div class="item2">2</div>
  <div class="item3">3</div>
  <div class="item4">4</div>
  <div class="item5">5</div>
  <div class="item6">6</div>
</div>
```

Chúng ta sẽ css cho class `wrapper` trình bày dưới dạng `grid`

```
.wrapper {
    display: grid;
}
```

Chúng ta đã định nghĩa `div` cha dạng `grid` nhưng vẫn chưa custom từng `item`.

Vì vậy, các `item` chỉ đơn giản là xếp chồng lên nhau.

Kết quả:

![](https://images.viblo.asia/0515b647-8920-4601-8dcd-fc73f238069e.png)

## 2. Columns and rows

Để các item trông xịn, mịn hơn, chúng ta cần xác định số hàng và số cột của `wrapper`.

Chúng ta sử dụng thuộc tính `grid-template-row` và `grid-template-column`

```
.wrapper {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 50px 50px;
}
```

Chúng ta viết 3 giá trị của `grid-template-columns` tương ứng sẽ được 3 cột

Còn 2 giá trị của `grid-template-rows` tương ứng với 2 hàng

Những giá trị cụ thể kể trên cho ta biết mỗi cột rộng `100px` và cao `50px`

Đây là kết quả: 

![](https://images.viblo.asia/5ffd347b-7979-45c3-9f2e-e7affa8bd7e9.png)

Để đảm bảo bạn hiểu chính xác về các giá trị, ta thử thay đổi freestyle chút xem sao:

```
.wrapper {
    display: grid;
    grid-template-columns: 200px 50px 100px;
    grid-template-rows: 100px 30px;
}
```

Kết quả sẽ là:

![](https://images.viblo.asia/f2076d89-8d10-463b-b888-df4e388e2cf5.png)

Đơn giản chỉ vậy thôi đó =))

## 3. Sắp xếp các phần tử

Phần này sẽ giới thiệu cho các bạn làm sao để sắp xếp các phần tử trên `grid`

Đây sẽ là phần các bạn quan tâm nhiều nhất, vì nó thật sự là vi diệu =))

Với class `wrapper` trên, chúng ta thử tạo một `grid` với 3x3 phần tử nào.

```
.wrapper {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
}
```

Kết quả:

![](https://images.viblo.asia/6caa651d-66ad-4fa2-83d1-24516e6b6e9b.png)

**Lưu ý**: chúng ta thấy chỉ hiển thị 3x2 phần tử vì chúng ta chỉ có 6 `item`, nếu có thêm 3 `item` nữa, thì chỗ trống bên dưới cũng sẽ được lấp đầy theo trật tự trên.

Để xác định vị trí và thay đổi kích thước của `item`, chúng ta sẽ phải sử dụng thêm thuộc tính `grid-column` và `grid-row`

```
.item1 {
    grid-column-start: 1;
    grid-column-end: 4;
}
```

Với code trên, chúng ta muốn css `item1` bắt đầu từ `grid line` thứ 1 đến `grid line` thứ 4

Vì vậy, `item1` sẽ chiếm hết cả hàng đầu tiên, các `item` khác sẽ bị đẩy xuống dưới theo thứ tự

Kết quả:

![](https://images.viblo.asia/9ef433ac-4e95-4a6c-91fc-b5e8a4966c82.png)

Nếu các bạn còn băn khoăn về `grid line`, chúng ta có 3 cột nhưng có tận 4 `grid line` cơ =))

![](https://images.viblo.asia/e428e0b7-08bb-4edf-b46a-458e0d6294ab.png)


Code trên, ta có thể viết đơn giản hơn:

```
.item1 {
    grid-column: 1 / 4;
}
```

Để mọi người có thể hiểu một cách chính xác hơn về `grid`, ta sẽ sắp xếp lại các `item` thêm sinh động hơn nào:

```
.item1 {
    grid-column-start: 1;
    grid-column-end: 3;
}
.item3 {
    grid-row-start: 2;
    grid-row-end: 4;
}
.item4 {
    grid-column-start: 2;
    grid-column-end: 4;
}
```

Kết quả:

![](https://images.viblo.asia/0c70e484-517a-4cf8-83db-fe3a53ea467b.png)

Nhìn trông rất hịn min đúng hem =))

## 4. Kết luận

Trong 5 phút qua, hi vọng bạn có cái nhìn tổng quát về `grid layout`

Ngoài ra, còn có rất nhiều thuộc tính của `grid` mà mình chưa kể ra, bạn có thể xem chi tiết ở [đây](https://css-tricks.com/snippets/css/complete-guide-grid/)

Cảm ơn các bạn đã theo dõi bài viết.

## 5. Tài liệu tham khảo
https://css-tricks.com/snippets/css/complete-guide-grid/

https://medium.com/free-code-camp/learn-css-grid-in-5-minutes-f582e87b1228