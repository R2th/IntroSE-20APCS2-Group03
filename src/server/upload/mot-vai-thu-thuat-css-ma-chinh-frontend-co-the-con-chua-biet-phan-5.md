![](https://images.viblo.asia/e3c6d63f-154a-44b6-a0bd-564684bf099a.jpg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 5 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

## 1. CSS canh giữa 1 thành phần theo chiều ngang và dọc với code ngắn nhất

Có khá nhiều [bài viết](https://css-tricks.com/centering-css-complete-guide/) hướng dẫn canh giữa 1 thành phần theo chiều ngang, theo chiều dọc hoặc theo cả 2 chiều với từng trường hợp yêu cầu ta ứng dụng mỗi kiểu CSS khác nhau. 

Dạo gần đây bên cạnh Flexbox với 3 dòng code là giúp ta canh giữa dễ dàng:

```css
.container {
    display: flex;
    align-items: center;
    justify-content: center;
}
```

Thì chắc rằng những người làm Frontend như mình đã nghe qua về CSS Grid. Nói sơ qua là CSS Grid ra đời đã làm thay đổi tư duy làm layout của người làm Frontend khá nhiều, nó xử nhiều layout vô cùng khó bằng CSS trước đây 1 cách gọn gàng. Vậy thì CSS Grid có thể thay thế cho Flexbox giải quyết trường hợp canh giữa trên không? Được! Hoàn toàn được, với CSS Grid thì code sẽ như sau:

```css
.container {
    display: grid;
    align-items: center;
    justify-items: center;
}
```

Cái cách đặt tên properties của CSS Grid cũng dễ nhớ hơn nữa. Không những thế CSS Grid còn cung cấp shorthand properties cho 2 thuộc tính `align-items` và `justify-items` này bằng thuộc tính `place-items`. Vậy code của chúng ta sẽ sửa lại như sau:

```css
.container {
    display: grid;
    place-items: center;
}
```

Kết quả cho ra là như nhau với 3 kiểu code trên:
{@codepen: https://codepen.io/tinhh/pen/OoeVjG}

Để hiểu thêm cách hoạt động của thuộc tính này các bạn có thể xem thêm [ở đây](https://developer.mozilla.org/en-US/docs/Web/CSS/place-items)

## 2. Thừa kế `color` trong thuộc tính `border`

Bạn đã từng CSS cho 1 button như này:

{@codepen: https://codepen.io/tinhh/pen/aRaBZG}

Đoạn CSS cho button ở đấy nó kiểu như này:
```
color: lightblue;
border: 1px solid lightblue;

&:hover {
  color: orange;
  border: 1px solid orange;
}
```

Nhưng liệu bạn có biết rằng với thuộc tính `border` màu của nó là inherit, tức là nếu bạn khai báo `border: 1px solid` thì màu `border-color` sẽ lấy màu như thuộc tính `color`, trong trường hợp nếu element đó bạn không có mô tả `color` cho nó thì hầu hết browsers sẽ mặc định lấy màu `black`. Tận dụng tính năng này, quay lại CSS cho button ở trên, code của chúng ta sẽ đơn giản hơn:

```
color: lightblue;
border: 1px solid;

&:hover {
  color: orange;
}
```

Vẫn cho được kết quả tương tự:
{@codepen: https://codepen.io/tinhh/pen/XxPNgE}

## 3. Dùng `display: flex` thì icon bị móp méo khi text dài

Đối với các bạn Frontend thì không còn quá lạ với Flexbox gì nữa rồi, từ khi biết đến Flexbox mình hầu như không dùng `float` hay `display: inline-block` khi làm layout nữa, vì Flexbox quá tiện, code ít nhưng làm được nhiều thứ.

Nhưng có bao giờ bạn gặp lỗi như dưới đây:

{@codepen: https://codepen.io/tinhh/pen/xyaRmM}

Đầu tiên là các bạn không lường trước được text sẽ dài, đến tay QA là phát hiện ra lỗi ngay, lúc này có thể nhiều bạn sẽ fix bằng cách sét thêm cho class `.wrap-icon` có thuộc tính `min-width: 50px`. Nhưng theo mình đây không phải là cách hay, thay vào đó bạn nên set class `.text` có thuộc tính `flex: 1`

{@codepen: https://codepen.io/tinhh/pen/BqOpjZ}

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!