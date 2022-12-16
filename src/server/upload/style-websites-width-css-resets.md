Những phần tử HTML có những quy tắc hiển thị do từng trình duyệt quy định có thể giống hoặc khác nhau. Thế nên chúng ta cần thiết lập lại các style chung cho các thẻ HTML về một tiêu chuẩn chung, giúp cho việc hiển thị tương đồng nhau giữa các trình duyệt gọi là Reset css
Trong bài viết này, tôi muốn chia sẻ các tuỳ chọn css này, thiết lập các nhân ( mà tôi sử dụng cùng file Normalize.css).
1. Box sizing
2. Removing margins and paddings
3. Lists
4. Forms and Buttons
5. Images and embeds
6. Tables
7. The hidden attribute
## Box Sizing

Thuộc tinh  `box-sizing` thay đổi cách thức hoạt động của Box model. Nó thay đổi dẫn đến `height`, `width`, `border`, `padding` và `margin` được tính toán lại.

Giá trị mặc định cho `box-sizing`là `content-box`. Với tôi thì tôi thích dùng `border-box` hơn vì nó giúp tôi tạo style dễ dàng hơn cho `padding` và `width`.

Để tìm hiểu thêm các thông tin về Box Sizing, bạn có thể xem tại "[Understanding Box sizing](https://zellwk.com/blog/understanding-css-box-sizing/)"

```
html {
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}
```

## Removing margins and paddings

Với các element khác nhau, trình duyệt sẽ đặt các giá trị `margin`và `padding` khác nhau. Thường thì mấy giá trị mặc định này thì mọi người không để ý đến hoặc không biết đến nó. Khi tôi code, tôi thường thích đặt lại các giá trị cho `margin` và `padding`.

```
/* Reset margins and paddings on most elements */
body,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
ol,
li,
p,
pre,
blockquote,
figure,
hr {
  margin: 0;
  padding: 0;
}
```

## Lists

Tôi sử dụng các danh sách không có thứ tự trong nhiều tình huống và tôi không cần một style `disc`  trong hầu hết các danh sách đó. Tôi đặt `list-style` là `none` . Khi cần thiết phải đặt style `disc` , thì ta đặt nó về như ban đầu.

```
/* Removes discs from ul */
ul {
  list-style: none;
}
```

## Forms and buttons
Trình duyệt không kế thừa kiểu chữ cho form và các button. Chúng đặt ```font: 400 11px sýtem-ui```, tôi thấy điều này là kỳ lạ. Và tôi luôn phải làm cho chúng kế thừa các yếu tố từ tổ tiên chúng một cách thủ công.
```
input,
textarea,
select,
button {
  color: inherit; 
  font: inherit; 
  letter-spacing: inherit; 
}
```

Các trình duyệt khác nhau có style border cho forms và buttons là khác nhau. Tôi không thích những kiểu mặc định này và muốn đặt lại cho chúng thành ```1px solid gray```
```
input,
textarea,
button {
  border: 1px solid gray; 
}
```

Tôi đã thực hiện một vài điều chỉnh cho các button
1.  Xét ```padding: 0.75em 1rem``` bởi vì chúng có vẻ như hợp lý dựa trên kinh nghiệm của tôi.
2.  Xoá mặc định ```border-radius``` được áp dụng cho các button
3. Màu nền button là trong suốt.

```
button {
  border-radius: 0; 
  padding: 0.75em 1em;
  background-color: transparent;
```
Cuối cùng tôi xét  ```pointer-event: none``` cho các phần tử trong một button. Điều này chủ yếu được sử dụng cho tương tác Javascript.
(Khi người dùng nhấp vào một cái gì đó trong một nút, event.target là thứ họ nhấp vào chứ không phải button. Kiểu này giúp làm việc với clickcác sự kiện dễ dàng hơn nếu có các phần tử HTML bên trong một button).
```
```css
button * {
  pointer-events: none;
}
```
Các thành phần bao gồm hình ảnh, video, đối tượng, iframe và embed. Tôi có xu hướng để cho các thành phần này phù hợp với chiều rộng của container của chúng.
Tôi cũng đặt các phần tử này thành display: block vì inline-blocktạo khoảng trắng không mong muốn ở dưới cùng của phần tử.

```
embed,
iframe,
img,
object,
video {
  display: block;
  max-width: 100%;
}
```

## Tables 
Tôi ít khi sử dụng table, nhưng đôi khi chúng có thể hữu ích. Đây là kiểu mặc định tôi sẽ bắt đầu bằng:

```
table {
  table-layout: fixed;
  width: 100%;
}
```

Khi một phần tử có thuộc tính  hidden, chúng sẽ bị ẩn khỏi chế độ xem. Normalize.css làm điều này rồi.
```
[hidden] {
  display: none;
}
```
## Tổng kết
Trên đây mình đã giới thiệu cai trò của reset css và một số thiết lập khi reset css. Nếu cần bổ sung, hãy góp ý với mình. Chúc các bạn may mắn !