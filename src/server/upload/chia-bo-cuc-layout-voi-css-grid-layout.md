Với Css Grid, bạn có thể tạo các thiết kế web phức tạp. Nó rất trực quan và được hỗ trợ tốt với nhiều trình duyệt khác nhau. Trong bài viết này chúng ta cùng tìm hiểu cách xây dựng layout với CSS Grids.
![](https://images.viblo.asia/0598dc39-cce2-42c9-ba24-c7ff3f774014.png)


# Setting up CSS Grid

Hai thành phần cốt lõi của `grid` là các `div` bọc ngoài (cha mẹ) và các `item` bên trong (con).

`div` bọc ngoài tạo ra `grid` và `item` chính là nội dung bên trong cần sắp xếp của `grid`.

Bên dưới là ví dụ của class `container` cùng với 6 `item` con
```html
<div class="container">
    <div class="item item1">1</div>
    <div class="item item2">2</div>
    <div class="item item3">3</div>
    <div class="item item4">4</div>
    <div class="item item5">5</div>
    <div class="item item6">6</div>
</div>
```

Để biến `div.container` thành 1 `grid`, chúng ta cần sẽ css vào class `container`
```css
.container {
    display: grid;
}
```

Chúng ta đã định nghĩa `div` cha dạng `grid` nhưng vẫn chưa custom từng `item`.

Vì vậy, mặc định các `item` sẽ xếp chồng lên nhau.

![](https://images.viblo.asia/b042bf43-3624-4a91-853b-e4e704015bb9.png)

# Defining Columns and Rows

CSS Grid là một phương pháp bố trí CSS được phát triển dưới dạng bố cục 2 chiều của các mục trên trang web hoặc ứng dụng, có nghĩa là nó có thể quản lý cả cột và hàng.

CSS Grid vượt trội hơn trong việc chia một trang thành nhiều phần hoặc xác định mối tương quan về kích thước, vị trí và lớp.

![](https://images.viblo.asia/6cab5ea9-2243-4e9d-851d-2b7814416efa.png)

Vậy để làm cho grid có dạng bố cục 2 chiều, chúng ta sẽ cần xác định số lượng cột và số lượng hàng. Giả sử rằng, cần tạo 3 cột và 2 hàng.

Chúng ta sử dụng thuộc tính `grid-template-row` và `grid-template-column`
```css
.container {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 100px 100px;
}
```

![](https://images.viblo.asia/31e6140d-2310-431b-9033-300dc1286267.png)

> 3 giá trị của grid-template-columns tương ứng sẽ được 3 cột
> 
> 2 giá trị của grid-template-rows tương ứng với 2 hàng
>
>*Những giá trị cụ thể kể trên cho ta biết mỗi cột rộng 200px và cao 100px

# Adding Grid-Gap Between Items

Để đặt khoảng cách giữa các hàng và cột, bạn có thể sử dụng `grid-column-gap` và `grid-row-gap` hoặc `grid-gap`.
```css
.container {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 100px 100px;
  grid-gap: 20px;
}
```

![](https://images.viblo.asia/f582f0f4-d53f-4612-9add-7a74365ee442.png)

Ở đây, mình đang sử dụng thuộc tính `grid-gap`. Thì ở đây các bạn có thể hiểu đơn giản nó là thuộc tính viết gắn gọn, *kết hợp bởi 2 thuộc tính `grid-column-gap` và `grid-row-gap`*.
```css
grid-gap: grid-row-gap grid-column-gap;
```
**Note:** Khi sử dụng 1 trong 3 thuộc tính trên, các khoảng trống chỉ được tạo ra giữa các `item` và không có ở bên ngoài `grid`.

# Explicit And Implicit Grid (Lưới rõ ràng và Lưới ngầm định)

Trước khi tiếp tục, chúng ta cần tìm hiểu khái niệm `grid lines`. Với CSS grid, các đường nằm giữa các cột được gọi là `column line`, trong khi các đường nằm giữa các hàng được gọi là `row line`.

Giả sử với một `grid` 3x3, ta có các `grid lines` như sau:

![](https://images.viblo.asia/f70e4376-cae2-40a8-88d8-6b106bf2204f.jpg)

**Cần lưu ý** là `grid line` được đánh số bắt đầu từ 1, không phải từ 0 như bình thường chúng ta hay code bạn nhé :sweat_smile::sweat_smile::sweat_smile:

**Mẹo nhỏ**: Nếu đang sử dụng `Firefox`, bạn có thể dùng tính năng `debug CSS Grid` trong `Developer Tool` để nhìn thấy `grid lines` rõ ràng hơn.
![](https://images.viblo.asia/e440fefb-99e5-4af1-90e1-51bf12ebca71.jpg)

## Explicit

`Explicit` sẽ set cho 1 `grid` được tạo ra bởi `columns` and `rows` với thuộc tính `grid-template-columns` và `grid-template-rows`. Và bạn có thể sử dụng thuộc tính `grid-template` để xác định các `rows` và `columns`.
```css
//Cú pháp:
grid-template: none|grid-template-rows / grid-template-columns|grid-template-areas|initial|inherit;
```
```css
.container {
  display: grid;
  grid-template: 100px 100px / 200px 200px 200px;
  grid-gap: 20px;
}
```

![](https://images.viblo.asia/35ced46a-fc63-4cd8-b0cd-fc5377ea5161.png)

## Implicit

Thuộc tính `grid-auto-columns` và `grid-auto-rows` dùng để xác định `Implicit grid`.

Bây giờ, ta thử cho các hàng có chiều cao 50px và xem điều gì sẽ xảy ra:

```css
grid-auto-rows: 50px;
```

![](https://images.viblo.asia/c7833cba-1e4a-4210-8d85-0c40a7aa5c75.png)

Bây giờ tất các dòng được thêm sẽ cao 50px.

`Grid` chỉ có thể phát triển theo 1 hướng, vì vậy nó chỉ thêm hàng (row) hoặc cột (column). Kết quả là chỉ 1 trong những tính chất trên là có hiệu quả. Và bạn có thể thay đổi hướng của `Implicit grid` theo ý thích của mình bằng việc sử dụng thuộc tính `grid-auto-flow`
```css
grid-auto-flow: row|column|dense|row dense|column dense;
```

# Repeating Grid Tracks

Nếu trong 1 `grid` chúng ta cần lặp lại nhiều lần các `grid tracks` thì chúng ta có thể sử dụng thuộc tính `repeat()`.

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: repeat(2, 100px);
  grid-gap: 20px;
}
```

![](https://images.viblo.asia/f582f0f4-d53f-4612-9add-7a74365ee442.png)

# Fractional Units (Đơn vị phân số)

* Ký hiệu là: `fr`

Bên cạnh việc sử dụng các đơn vị quen thuộc như `px`, `%`, `em`, `rem` ... Bạn có thể dùng đến `fr`. `fr`, viết tắt của `"fraction" (phân số)`, là một đơn vị kích thước mới được thiết kế dành riêng cho `grid`. 1fr tương ứng với một phần trong không gian trống của `grid container`. 

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
```
Với 3 cột (column) có chiều rộng bằng nhau, chúng ta có thể sử dụng đơn vị `fr`, thay vì đặt 1 thuộc tính `width: calc(100%/3)`. Với cách sử dụng này, ta có thể thêm nhiều phần tử con, trong khi độ rộng vẫn giữ nguyên trên tất cả các phần tử con.

![](https://images.viblo.asia/f582f0f4-d53f-4612-9add-7a74365ee442.png)

Chúng ta cũng có thể dễ dàng kết hợp đơn vị `fr` với bất kỳ đơn vị CSS quen thuộc nào khác.
```css
.container {
  display: grid;
  grid-template-columns: 60% 1fr 2fr;
  grid-gap: 20px;
}
```

![](https://images.viblo.asia/ffcf3fdb-7c50-4679-98e9-993905722775.png)

# Sizing Individual Grid Items (Định cỡ các mục grid)

Để xác định chiều rộng của 1 mục bên trong class `container` ở dạng `grid`, ta sẽ sử dụng với keyword là `span`
```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: repeat(2, 100px);
}
.item5 {
  grid-column: 1 / span 3; //or grid-column: span 3;
  background: #CAC4CE;
}
```

![](https://images.viblo.asia/6c059c0a-e25f-4ef1-a763-985e5d9607e2.png)

> grid-column: 1 / span 3 nghĩa là nó chiếm 3 cột từ track line số 1 chạy từ trái sang phải của cột.

Ngoài việc sử dụng keyword `span`, bạn có thể đặt điểm bắt đầu và điểm kết thúc mở rộng.
```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: repeat(2, 100px);
}

.item1 {
  grid-column: 1 / 4;
  grid-row: 1 / 3;
  background: #D7CDCC;
}
```

![](https://images.viblo.asia/69ef504f-16ac-4392-9329-cef0f05d4edb.png)

> grid-column: 1 / 4 nghĩa là nó sẽ bắt đầu từ track line số 1 tới track line 4 từ trái sang phải của cột.
> 
> grid-row: 1 / 3 nghĩa là nó sẽ bắt đầu từ track line số 1 tới track line 3 từ trên xuống dưới của hàng.

**Note:** Nếu bạn muốn `item` của bạn trải rộng toàn bộ chiều rộng của `grid`, tuy nhiên không biết `grid` rộng bao nhiêu, bạn có thể đặt
```css
grid-column: 1 / -1;
```

# Positioning Items in the Grid (Ví trí item của grid)

Với CSS Grid, bạn có thể đặt vị trí (position) các thành phần trong `grid` theo ý muôn. Bạn có thể di chuyển các phần tử con với 4 thuộc tính CSS: `grid-row-start`, `grid-row-start`, `grid-column-start` hoặc `grid-column-end`. Có 1 điều cần chú ý, vị trí (position) không được thực hiện bởi các cột (grid columns), mà bằng các track line.
```css
.item1 {
  grid-column-start: 1;
  grid-column-end: 4;
  background: #D7CDCC;
}

//or

.item1 {
  grid-column: 1 / 4;
  background: #D7CDCC;
}
```

![](https://images.viblo.asia/b27dfb5d-a1a3-47ac-bd00-fa634ce38868.png)

# Track sizing and minmax()

Khi thực hiện `responsive`, bạn đặt kích thước cố định cho các `item`, việc này dẫn đến khi bạn xem ở viewport nhỏ hơn sẽ bị đẩy content. Vì vậy `minmax()` sẽ làm cho kích thước item của bạn có thể linh hoạt với từng kích thước màn hình

Hàm `minmax ()` có 2 tham số: thứ nhất là kích thước tối thiểu của track và thứ hai là kích thước tối đa.

Bên cạnh giá trị được cố định chúng ta cũng có giá trị cũng có thể tự động, cho phép các track có thể tự động thay đổi kích thước dựa trên trên kích thước của nội dung.
```css
grid-template-rows:    minmax(80px, auto);
grid-template-columns: minmax(auto, 10%) 1fr 2fr;
```

# Auto-Fill vs Auto-Fit

Hai giá trị thường được sử dụng trong hàm` repeat()`.

**Auto-fill**: fill vào hàng (row) với càng nhiều cột (column) càng tốt.
```css
.container {
  display: grid;
  border:1px solid #1D1E2C;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
  padding: 5px;
}
```

![](https://images.viblo.asia/97a88fd9-5783-4a0b-aa5c-b3af860f44dc.png)

**Auto-fit**: Cột (Column) chiếm hết không gian có sẵn.
```css
.container {
  display: grid;
  border:1px solid #1D1E2C;
  grid-template-columns: repeat(auto-fit, minmax(200px,1fr));
  grid-gap: 20px;
  padding: 5px;
}
```

![](https://images.viblo.asia/a4b89bd2-4203-4e67-ae79-e0abba9767b4.png)

# Justify Content

`Justify Content` giúp bạn căn chỉnh các `items grid` trên `row axis`.
```css
.container {
  display: grid;
  border: solid 1px #1D1E2C;
  grid-template-columns: repeat(3, 200px);
  grid-gap: 20px;
  justify-content: ***;
}
```

![](https://images.viblo.asia/c1ed992d-98da-4cc6-8df5-ffc5cdcfe4ec.png)

![](https://images.viblo.asia/1de3b922-5351-468d-be12-aca0f701a55a.png)

![](https://images.viblo.asia/7b33c844-fc5c-495b-8cef-ef9980a48033.png)

![](https://images.viblo.asia/f7c1b5c4-db0e-4b77-ac22-57764ebbf277.png)

# Align Content

`Align Content` giúp bạn căn chỉnh các `items grid` trên `column axis`.

```css
.container {
  display: grid;
  border: solid 1px #1D1E2C;
  height: 500px;
  grid-template-columns: repeat(3, 200px);
  grid-gap: 20px;
  justify-content: space-around;
  align-content: space-around;
}
```
![](https://images.viblo.asia/3cd53508-ed80-4646-ad0f-68bdd1a8f223.png)

# Tổng kết

Trên đây là cách sử dụng một số thuộc tính cơ bản nhất của `CSS Grid`. Mong rằng qua bài này có thể giúp ít nhiều cho ai đang muốn tìm hiểu về `CSS Grid`. Cảm ơn bạn đọc hết bài viết của mình ạ! :hugs::hugs::hugs:

**Tài liệu tham khảo:**

https://medium.com/@js_tut/css-grid-tutorial-filling-in-the-gaps-c596c9534611

https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/

https://www.w3schools.com/css/css_grid.asp

https://developer.mozilla.org/en-US/docs/Learn/CSS