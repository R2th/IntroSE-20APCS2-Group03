***::marker*** pseudo element cho phép style lại hoặc tuỳ chỉnh giá trị đánh dấu cho các list style item. Thông thường khi muốn style list item theo mong muốn, cách tốt nhất là remove list-style mặc định sẵn có và sử dụng các pseudo element như ::before, :after để style lại.

 Bình thường sẽ style như này:
 
{@embed: https://codepen.io/ngannk/pen/vYNyajr}

Nhưng nếu sử dụng *::marker* thì chỉ mất một dòng code thôi:

{@embed: https://codepen.io/ngannk/pen/BaoQPxb}

Tuy nhiên, *::marker* chỉ được support trên Firefox ở dạng mặc định và thông qua các flags trên Edge, Chrome, cho nên hiện tại nó chưa được phổ biến rộng rãi. Vì thế đành phải sử dụng cách cũ.

Cách style trước đây áp dụng khá tốt với các loại lists không cần theo thứ tự, nhưng nếu muốn thay đổi color của các số thứ tự đối với các list cần theo thứ tự thì phải làm sao? Đây là lúc cần đến CSS counters rồi đây. CSS counter sẽ cho phép CSS tự động đếm các phần tử và tự tạo số thứ tự tăng dần cho các list item. CSS counter không những chỉ áp dụng được với loại list mà còn áp dụng được với bất kì loại element nào khác, chẳng hạn như Heading. Khá tiện lợi và gọn gàng.

Trước tiên muốn sử dụng chúng cần phải nắm được một vài thuộc tính và chức năng sau:

- *counter-reset* - Tạo mới hoặc reset một counter
- *counter-increment* - Tự động tăng giá trị counter
- *counter() or counters()* - Thêm giá trị của một counter vào một phần tử

Để bắt đầu với CSS counters, đầu tiên cần sử dụng *counter-reset* để định nghĩa counter muốn sử dụng:

```
ul {
  counter-reset: my-awesome-counter;
}
```

*counter-reset* hoạt động bằng cách chuyển tên counter tự đặt tương ứng với một giá trị của nó. Nó có thể làm bất cứ điều gì người dùng muốn, kể cả với việc hạn chế đặt tên giống như cách đặt tên class hoặc id. Điều này sẽ reset lại value của counter về 0 nếu counter trên đã được dùng trước đó. Tiếp đó, có thể tham chiếu với thuộc tính *counter-increment* như sau:

```
li {
  counter-increment: my-awesome-counter;
}
```

Đoạn code trên sẽ tự động tăng thêm 1 cho mỗi thẻ li thuộc parent ul thuộc counter đã được định nghĩa tên ở trên là "my-awesome-counter" . Tuy nhiên cần gọi hàm counter() nếu muốn phần đếm thứ tự được hiển thị:

```
li:before {
  content: counter(my-awesome-counter);
}
```

Ghép lại với nhau và ta sẽ có một custom counter cho phần ordered list như sau:

{@embed: https://codepen.io/ngannk/pen/yLYVqEY}

Ngoài ra hàm counters() còn cho phép dạng nested counters với tên tương ứng với tên đã đặt và có thể kết hợp lại thành các subcounters. Hàm này sẽ lấy đối số (argument) thứ hai để xác định chuỗi được sử dụng làm dấu phân cách "-" :

{@embed: https://codepen.io/ngannk/pen/zYvoLaN}

Cuối cùng, như đã đề cập đến ở trên, CSS counter có thể sử dụng cho bất kì kiểu loại phần tử nào, và hoàn toàn có thể kết hợp để tạo cấu trúc phân cấp như ví dụ dưới đây:

{@embed: https://codepen.io/ngannk/pen/JjYbBZy}

CSS counters là một dạng khá linh hoạt và hữu dụng. Nếu muốn tìm hiểu thêm có thể đọc phần CSS Counters Guide [tại đây](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Lists_and_Counters/Using_CSS_counters).

Link tham khảo [tại đây](https://dev.to/luisaugusto/using-css-counters-for-styling-numbered-content-2khd)