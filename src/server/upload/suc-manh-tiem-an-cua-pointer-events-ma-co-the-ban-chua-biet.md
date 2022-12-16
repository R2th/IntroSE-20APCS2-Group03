Chào các bạn, nếu học CSS cơ bản thì chắc chẳng ai còn xa lạ gì với thuộc tính `pointer-events` nữa. Tuy nhiên ngoài chức năng ngăn cản một hành động nào đó tác động lên phần tử thì nó còn gì hay ho hơn không ? Hãy cùng mình tìm hiểu qua bài viết này nhé

![](https://images.viblo.asia/99272522-2379-4481-a97c-5afb6c50af6b.png)

## 1. Vô hiệu hóa button

Thông thường để vô hiệu hóa một button ta có thể dễ dàng thêm thuộc tính `disabled='disabled'`, vậy còn cách nào nữa không, câu trả lời là có thông qua ví dụ dưới đây (hãy click vào button để kiểm tra)

{@embed: https://codepen.io/hoanghung96cs/pen/MMXPxm}

## 2.  Thay đổi style của `parent-element` khi hover

Rất ảo diệu, nhờ có `pointer-events` ta có thể dễ dàng thực hiện được kịch bản 'hover vào con thay đổi style của cha' thông qua ví dụ sau

{@embed: https://codepen.io/hoanghung96cs/pen/rEKQWd}

## 3.  Thay đổi style của `previous-element` khi hover

Tương tự như phần 2 ta cũng có thể thay đổi được style của phần tử trước nó khi sử dụng `pointer-events`

{@embed: https://codepen.io/hoanghung96cs/pen/VJdVbJ}

## 4. "Mũi tên" selectbox

Thông thường khi muốn thay đổi style 'mũi tên xổ xuống' của thẻ `select` ta sẽ dùng một `div` bọc ngoài và style mũi tên cho nó, tuy nhiên một bất cập gặp phải đó là **khi người dùng click vào trúng mũi tên** đó thì thẻ `select` sẽ không xổ xuống. Đừng lo ! Hãy để `pointer-events` xử lý vấn đề này

{@embed: https://codepen.io/hoanghung96cs/pen/MMyEYz}

## 5. Selecting text

Bạn hãy xem ví dụ sau để xem tác dụng của `pointer-events` nhé

{@embed: https://codepen.io/hoanghung96cs/pen/qzKQjv}

### Kết luận

Trên đây là một số tips hay về `pointer-events` mà mình đã sưu tập được cũng như rút ra trong quá trình làm việc thực tế. Nếu bạn có tips nào hay đừng ngần ngại chia sẻ cho cộng đồng FE nhé !

Nếu thấy bài viết hay hãy upvote cho mình nhé, nếu thích mình hãy nhấn follow để nhận thêm nhiều bài viết hay. 

Xin cảm ơn !