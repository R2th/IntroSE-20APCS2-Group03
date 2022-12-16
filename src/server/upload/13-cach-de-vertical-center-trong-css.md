Quay lại một chút về thời kì đồ đá của CSS, để vertical center luôn là một thách thức lớn, khi lúc đó CSS còn quá đơn giản để cung cấp một phương pháp tối ưu nhất, và thậm chí chúng ta còn phải sử dụng đến Javascript. Việc vertical center thời đó quả là một thứ xa xỉ bất khả thi với CSS. Nhưng trải qua năm dài tháng rộng, CSS hiện tại đã đem đến một kho tàng lớn mà ở đó chúng ta có thể vertical center bằng đủ mọi cách, mọi lúc mọi nơi. Dưới đây là tổng hợp sương sương nhiều cách bao gồm cách thức thực hiện và một số điểm hạn chế để vertical center.

### 1. Absolute position và margin auto
Một element không chứa kích thước trong thì có thể thoải mái "căn giữa" bằng việc sử dụng các value *top bottom* bằng nhau. Với trường hợp này, chúng ta có thể set *top* và *bottom* bằng 0, sau đó sử dụng *margin auto*. Và element sẽ tự động căn giữa như này:
```
.container{
  position:relative;
}
.element{
  position:absolute;
  top: 0; bottom: 0; left: 0; right: 0;
  margin: auto;
  height: 20px; /*requires explicit height*/
}
```
{@embed: https://codepen.io/ngannk/pen/vYErvWP}

Tất nhiên là với điều kiện height của element phải được khai báo rõ ràng, hoặc là có thể full container cũng được.

### 2. Top 50% và translate -50%

Đây là một cách thông dụng nhất, được nhiều dev ưa chuộng nhất. Một trick đơn giản, dựa vào việc absolute positioning bên trong element là 50% tính từ *top* của parent, sau đó đẩy nó lên top một đoạn bằng 50%:
```
.container{
  position: relative;
}
.element{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```
{@embed: https://codepen.io/ngannk/pen/MWYXZro}

Đây là một cách khá hay, nhưng có nhược điểm là việc sử dụng *translate* có thể gây xung đột với các *transforms* khác, ví dụ khi apply transitions hay animations.

### 3. Tables

Đây là một cách cơ bản khi sử dụng table, sử dụng *tables cell* và *vertical-align* để căn center cho element trong *container*.
Cách này đáp ứng được tình huống element chiều cao không xác định. Với điều kiện element này không có sibling nào cần căn giữa, và gây chút khó khăn với việc sử dụng background.
Ngoài ra cách này không thích hợp với các thiết bị đọc màn hình. Kể cả khi set CSS display là *table* hay *table-cell* thì với các thiết bị cầm tay nó vẫn hiển thị thành dạng table như bình thường thôi.

```
.container{
  display: table;
  height: 100%;
}
.element{
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
```
{@embed: https://codepen.io/ngannk/pen/oNgyJpQ}


### 4. Sử dụng pseudo element

Sử dụng *inline-block* với một pseudo element với *height* parent là 100% , sau đó set thuộc tính *vertical-align middle*:
```
.container::before {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  margin-left: -1ch;
}
.element{
  display: inline-block;
  vertical-align: middle;
}
```
{@embed: https://codepen.io/ngannk/pen/QWwxzQK}

### 5. Margin auto với flex-item
Hạn chế duy nhất của cách này là nó chỉ hoạt động tốt với một single element.
```
.container{
  display:flex;
}
.element{
  margin:auto;
}
```
{@embed: https://codepen.io/ngannk/pen/eYmKbVG}

### 6. Pseudo-elements với flex-container

Cách này khá hữu ích với trường hợp muốn giữ một khoảng cách flexible trong *column-oriented flex-container* với trường nhiều nhiều items.
```
.container{
  display:flex;
  flex-direction:column;
}
.container::before,
.container::after {
  content: "";
  flex: 1;
}
.element{
  margin:0 auto;
}
```
{@embed: https://codepen.io/ngannk/pen/oNgyJEQ}

### 7 & 8. Align với flex-container hoặc the flex-item
Flexbox lúc nào cũng giới thiệu những thuộc tính căn chỉnh vô cùng tuyệt vời. Cách này cho phép chúng ta kiểm soát được vị trí đặt item và phân bổ khoảng trống cho một số element đặc biệt. Tuỳ thuộc vào *flex-direction* mà chúng ta có thể sử dụng *justify-content* hoặc *align-items* khi cần.

Trong container:
```
.container{
  display: flex;
  justify-content: center;
  align-items: center;
}
```
{@embed: https://codepen.io/ngannk/pen/bGNKOvE}
Trong một *flex-item* cụ thể:
```
.container{
  display: flex;
}
.element{
  align-self: center;
  margin: 0 auto;
}
```
{@embed: https://codepen.io/ngannk/pen/dyPKwmw}
Hạn chế duy nhất là không support nhiều cho các trình duyệt cũ. Cách này tuy có hoạt động trên IE11, nhưng việc sử dụng flexbox lại dễ gây lỗi nên phải rất cẩn thận khi sử dụng trên IE11.

### 9 & 10. Align với grid-container hoặc the grid-item
CSS Grid bao gồm khá nhiều tuỳ chọn căn chỉnh như flexbox, và sử dụng chúng trong *grid-container*:
```
.container{
  display: grid;
  align-items: center;
  justify-content: center;
}
```
{@embed: https://codepen.io/ngannk/pen/QWwxzrK}
Hoặc dùng trong một *grid-item* cụ thể:
```
.container{
  display: grid;
}
.element{
  justify-self: center;
  align-self: center
}
```
Không hỗ trợ trình duyệt cũ là hạn chế duy nhất của cách này.
{@embed: https://codepen.io/ngannk/pen/yLyEGjb}

### 11. Pseudo-elements với grid
Tương tự flexbox, chúng ta có thể sử dụng 3 hàng *grid* với pseudo elements:
```
.container{
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 1fr);
}
.container::before,
.container::after{
  content:"";
}
```
Hãy nhớ rằng *1fr* nghĩa là *minmax(auto, 1fr)*, vì thế các empty rows sẽ không nhất thiết phải chiếm 1/3 *height* của container. Chúng sẽ collapse nếu cần khi đạt đến giá trị auto tối thiểu, và không có content nào thì sẽ tương ứng là 0.
{@embed: https://codepen.io/ngannk/pen/OJPErEV}
Ngoại trừ việc nếu cần support trên IE, thì lại thiếu sót mất auto-placement. Và như vậy dẫn đến phương pháp tiếp theo dưới đây.

### 12. Explicit grid row placement
CSS grid cho phép các item được đặt rõ ràng trên một *row* cụ thể, vì thế chúng ta sẽ khai báo *grid* tương tự như trên và đặt item ở trên *row* thứ hai là được:
```
.container{
  display:grid;
  grid-template-columns:1fr;
  grid-template-rows: repeat(3, 1fr);
}
.element{
  grid-row: 2 / span 1; /* or grid-row: 2/3 */
}
```
Các này có thể hoạt động được trên IE10. Nó dựa trên một bản draft tuy hoàn toàn khác nhưng chúng ta vẫn có thể khiến nó chạy ngon lành:

```
.container{
  display: -ms-grid;
  -ms-grid-rows: (1fr)[3];
  -ms-grid-columns: 1fr;
}
.element{
  -ms-grid-column: 1;
  -ms-grid-row: 2;
}
```
{@embed: https://codepen.io/ngannk/pen/dyPKwKa}

### 13. Margin auto với grid-item
Tương tự như flexbox, sử dụng *margin auto* trong grid items:
```
.container{
  display: grid;
}
.element{
  margin: auto;
}
```
{@embed: https://codepen.io/ngannk/pen/XWJYoBZ}

Tham khảo bài viết [tại đây](https://dev.to/bnevilleoneill/13-ways-to-vertical-center-2j37)