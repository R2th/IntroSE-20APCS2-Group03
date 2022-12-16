Đối với một Frontend developer thì việc sử dụng CSS Preprocessor là rất cần thiết. Nó có rất nhiều tính năng hữu ích giúp bạn giảm thiểu thời gian code và tăng khả năng quản lý mã nguồn cũng như dễ dàng bảo trì khi cần thiết. Tuy nhiên, không phải tính năng nào cũng hữu ích trong mọi trường hợp như bạn nghĩ. Ví dụ như **@extend** trong **SASS** chẳng hạn.

## 1. Vấn đề

Tất cả chúng ta đều biết, SASS cho phép bạn kế thừa một đoạn styles từ một selector khác với **@extend**. Tuy nhiên, mình khuyên bạn không nên dùng nó với tag selector, class selector và id selector nếu không cần thiết. Tại sao ư? Chúng ta hãy cùng xem qua vài ví dụ dưới đây để biết tại sao.
Chẳng hạn mình có một đoạn **SCSS** như sau:
```scss:SCSS
h4 {
  color: black;
  font-size: 20px;
  font-weight: bold;
}

label {
  @extend h4;
  cursor: pointer;
}
```
Mục đích của nó rất đơn giản, mình muốn thẻ **label** sẽ kế thừa styles của thẻ **h4**. Và khi biên dịch sang **CSS** ta được:
```scss:CSS
h4,
label {
  color: black;
  font-size: 20px;
  font-weight: bold;
}

label {
  cursor: pointer;
}
```
Đây chính xác là đoạn **CSS** mà chúng ta mong đợi. Tuy nhiên giờ mình sẽ thêm một đoạn style khác vào file **SCSS** như sau:
```scss:SCSS
h4 {
  color: black;
  font-size: 20px;
  font-weight: bold;
}

label {
  @extend h4;
  cursor: pointer;
}

// New styles
.header h4 {
  font-weight: normal;
}

.footer h4 {
  display: inline;
}
```
Đây có lẽ là đoạn **CSS** mà chúng ta mong muốn nhận được sau khi biên dịch:
```scss:CSS
h4,
label {
  color: black;
  font-size: 20px;
  font-weight: bold;
}

label {
  cursor: pointer;
}

// New styles
.header h4 {
  font-weight: normal;
}

.footer h4 {
  display: inline;
}
```
Nhưng lạ thay nó lại được biên dịch thành:
```scss:CSS
h4,
label {
  color: black;
  font-size: 20px;
  font-weight: bold;
}

label {
  cursor: pointer;
}

// New styles
.header h4,
.header label {
  font-weight: normal;
}

.footer h4,
.footer label {
  display: inline;
}
```
Rõ ràng chúng ta chỉ thêm 2 selectors là **.header h4** và **.footer h4**, vậy tại sao lại có tới 4 selectors sau khi biên dịch? 2 selectors **.header label** và **.footer label** ở đâu ra?

Đó là do khi sử dụng **@extend** giữa 2 selectors (cha và con) thì SASS sẽ tự động thêm selector con (tức là label) ở bất cứ nơi nào có selector cha (tức là h4). Nó giống như một gia đình vậy, thằng con lúc nào cũng phải đi theo thằng cha. Nghe thì có vẻ rất hữu ích, nhưng đa số trong nhiều trường hợp nó sẽ phản tác dụng. Giả sử, trong code html của bạn cụ thể là phần footer không có thẻ label vậy thì selector **.footer label** ở trong **CSS** sẽ trở nên thừa, đó là còn chưa kể tới các selector khác được SASS tự động thêm dựa vào selector cha như **.header label** chẳng hạn. Đôi lúc điều này sẽ khiến các selector của bạn bị ghi đè styles bởi các selector được **SASS** tự động thêm vào khi biên dịch. Không những thế, nó còn làm tăng dung lượng file **.css** của bạn lên đáng kể. Vậy thì chúng ta sẽ kế thừa các đoạn styles bằng cách nào nếu không dùng **@extend**?

##  2. Giải pháp
#### Giải pháp 1: Sử dụng @mixin
Với **@mixin**, bạn có thể tạo ra một đoạn global styles và sau đó sử dụng **@include** ở trong bất cứ selector nào mà bạn muốn kế thừa đoạn styles đó. Ví dụ:
```scss:SCSS
@mixin title {
  color: black;
  font-size: 20px;
  font-weight: bold;
}

h4 {
  @include title;
}

label {
  @include title;
  cursor: pointer;
}
```
Lúc này selector **h4** và **label** sẽ cùng kế thừa styles từ mixin title. Và đây là kết quả sau khi biên dịch sang **CSS**:
```scss:CSS
h4 {
  color: black;
  font-size: 20px;
  font-weight: bold;
}

label {
  color: black;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}
```
Bên cạnh đó, bạn cũng có thể truyền các tham số vào mixin:
```scss:SCSS
@mixin title($color, $fontSize, $fontWeight) {
  color: $color;
  font-size: $fontSize;
  font-weight: $fontWeight;
}

h4 {
  @include title(black, 20px, bold);
}

label {
  @include title(red, 18px, normal);
  cursor: pointer;
}
```
Sau khi biên dịch sang **CSS** ta được:
```scss:CSS
h4 {
  color: black;
  font-size: 20px;
  font-weight: bold;
}

label {
  color: red;
  font-size: 18px;
  font-weight: normal;
  cursor: pointer;
}
```
Tuy nhiên, trong ví dụ trên nếu như đoạn global styles của bạn là tĩnh (không được truyền vào các tham số) thì khi biên dịch sang **CSS** đoạn styles đó sẽ bị lặp. Điều đó khiến code **CSS** của chúng ta không những vẫn chưa được tối ưu, mà còn trở nên dài hơn so với lúc sử dụng **@extend**. Còn nếu đoạn global styles của bạn là động (được truyền vào các tham số) thì giải pháp này trở nên hoàn hảo nếu như ở mỗi selector bạn include mixin và truyền vào các tham số khác nhau như ví dụ trên.
<br><br>
#### Giải pháp 2: Sử dụng placeholder
Placeholder là một kiểu selector được bắt đầu bằng ký tự **%** (Ví dụ: %h4). Nó giống như một selector ẩn vậy, giả sử mình có một đoạn **SCSS** sau:
```scss:SCSS
%h4 {
  color: black;
  font-size: 20px;
  font-weight: bold;
}
```
Thì khi biên dịch sang **CSS**, file .css của ta sẽ trống trơn, vì nó chỉ có hiệu lực trong file .scss mà thôi. Vậy thì placeholder dùng để làm gì và nó có ý nghĩa gì? Mình sẽ thay đổi ví dụ về **@extend** mà mình đã nêu ra ở đầu bài viết một chút:
```scss:SCSS
h4, %h4 {
  color: black;
  font-size: 20px;
  font-weight: bold;
}

label {
  @extend %h4;
  cursor: pointer;
}

// New styles
.header h4 {
  font-weight: normal;
}

.footer h4 {
  display: inline;
}
```
Mình đã thêm placeholder selector **%h4** vào selector cha và ở selector con thay vì là **@extend h4** như đầu bài viết mình đã sửa thành **@extend %h4**, chúng ta hãy cùng xem kết quả sau khi biên dịch sang **CSS**:
```scss:CSS
h4,
label {
  color: black;
  font-size: 20px;
  font-weight: bold;
}

label {
  cursor: pointer;
}

// New styles
.header h4 {
  font-weight: normal;
}

.footer h4 {
  display: inline;
}
```
So sánh với kết quả biên dịch ở ví dụ đầu bài viết chúng ta thấy 2 selectors được **SASS** tự động thêm vào (**.header label** và **.footer label**) đã biến mất. Và đây chính xác là đoạn **CSS** mà chúng ta từng mong muốn nhận được sau khi biên dịch.

Khi chúng ta sử dụng placeholder selector thì selector này sẽ được coi như là một selector cha và khi kế thừa styles từ selector này thì nó vẫn sẽ hoạt động giống như cách mà nó đã làm với 1 selector bình thường, tuy nhiên chỉ khác là các selector con sẽ không tự động sinh ra khi biên dịch. Đây được xem là giải pháp hoàn hảo nếu đoạn styles mà bạn muốn kế thừa là tĩnh.

## 3. Kết luận
Nếu như, bạn muốn kế thừa một đoạn styles **tĩnh** thì mình khuyên bạn hãy dùng **placeholder** còn nếu là đoạn styles đó là **động** thì hãy dùng **mixin**. Trên đây là lý do tại sao bạn không nên dùng **@extend** quá nhiều đối với các selector bình thường (tag selector, class selector và id selector) và các giải pháp thay thế nếu không dùng nó.

-----

***Tài liệu tham khảo:*** https://webinista.com/updates/dont-use-extend-sass/