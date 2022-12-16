Flexbox? Chắc mọi người đã biết rồi nhỉ :grinning:, mình cũng xin giới thiêu lại cho những ai chưa biết@@

Flexbox là một tiêu chuẩn CSS được tối ưu hóa để thiết kế giao diện người dùng. Sử dụng các thuộc tính flexbox khác nhau, có thể xây dựng trang của mình từ các khối nhỏ, sau đó được định vị và thay đổi kích thước một cách dễ dàng theo bất kỳ cách nào chúng ta muốn. Các trang web và ứng dụng được thực hiện theo cách này rất nhạy và thích ứng tốt với mọi kích thước màn hình.

Trong bài viết này, mình sẽ hướng dẫn mọi người 5 cách để giải quyết các vấn đề bố cục CSS phổ biến.

# 1. Tạo các cột có cùng độ cao

Có vẻ không khó nhưng để làm cho các cột có cùng độ cao sẽ mất kha khá thời gian của bạn đấy. Chúng ta thường set `min-height` nhưng chúng sẽ không hoạt động khi lượng nội dung trong các cột bắt đầu khác nhau, một trong số chúng sẽ tăng lên và một số khác sẽ ngắn hơn.

Flexbox giải quyết vấn đế này không thể dễ dàng hơn. Những gì chúng ta cần là sử dụng `flex` và thuộc tính của nó: `flex-direction`, `align-items`.

```
// HTML

<div class="container">
    <div>...</div>
    <div>...</div>
    <div>...</div>
</div>

```

```
// CSS

.container {
    display: flex;
    flex-direction: row;
    align-items: stretch;
}
```

Dưới đây là kết quả:

![](https://images.viblo.asia/b561fe24-ae30-4e78-9652-588c076c6eec.png)

# 2. Sắp xếp lại các element

Trước đây, nếu muốn thay đổi thứ tự các element một cách linh hoạt, có lẽ chúng ta sẽ thử dùng CSS-hack,với flexbox nó khá là đơn giản :upside_down_face:

Thuộc tính này được gọi là `order`, nó cho phép chúng ta đổi chỗ bất kỳ items nào và thay đổi trình tự xuất hiện trên màn hình. Chỉ có một tham số duy nhất là vị trí của element - số nhỏ hơn thì xếp trước.

```
// HTML

<div class="container">

    <div class="one">...</div>
    <div class="two">...</div>
    <div class="three">...</div>

</div>
```

```
// CSS

.container{
    display: flex;
}

.one{
    order: 3;
}

.two{
    order: 2;
}

.three{
    order: 1;
}
```

Thuộc tính `order` ứng dụng nhiểu trong thực tế. Ở đây là một ví dụ về [responsive comment](https://tutorialzine.com/2015/11/using-flexbox-to-create-a-responsive-comment-section):

![](https://images.viblo.asia/8216f3d8-87d0-46b4-844e-e958908ec89e.png)

# 3. Định tâm ngang và dọc

Định tâm dọc trong CSS là một trong những vấn đề khiến chúng ta phải tự hỏi: Làm thế nào một việc tầm thường như vậy vẫn còn quá phức tạp để làm? Và đó là điều thực sự xảy ra. Nếu bạn tìm kiếm *vertical centering css* vô số kỹ thuật khác nhau sẽ xuất hiện và hầu hết trong số chúng sẽ liên quan đến các bảng hoặc *transforms* - những thứ không được thiết kế để tạo bố cục.

Flexbox cung cấp một giải pháp dễ dàng hơn cho vấn đề. Mỗi *flex layout* có 2 hướng (trục X và trục Y) và 2 thuộc tính riêng biệt cho căn chỉnh của chúng. Bằng cách căn giữa cả hai chúng ta có thể định vị bất kỳ phần tử nào.

```
// HTMl

<div class="container">

    <!-- Any element placed here will be centered
         both horizonally and vertically -->

    <div>...</div>

</div>
```

```
// CSS

.container{
    display: flex;
    justify-content: center;
    align-items: center;
}

```

Kết quả: 
![](https://images.viblo.asia/18301885-354e-4926-a813-27b5c766dd77.png)

# 4. Tạo responsive grids

Hầu hết mọi người đều dựa vào frameworks khi tạo responsive grids. Bootstrap là phổ biến nhất nhưng có hàng trăm thư viện có thể giúp bạn thực hiện nhiệm vụ này. Chúng thường hoạt động tốt và có hàng tấn tùy chọn, nhưng có xu hướng khá nặng. sử dụng *flexbox* để tạo responsive grids khá đơn giản :sweat_smile:.

Một hàng trong *flexbox grid* chỉ đơn giản là *container* với `display:flex`. Các cột ngang bên trong nó có thể là bất kỳ phần tử nào, thiết lập kích thước được thực hiện thông qua *flex*. Mô hình flex thích ứng với kích thước khung nhìn, vì vậy thiết lập này sẽ khá ổn trên tất cả các thiết bị. Tuy nhiên, nếu chúng ta quyết định không có đủ không gian theo chiều ngang trên màn hình, chúng tôi có thể dễ dàng biến bố cục thành dạng dọc với *media-query*.

```
// HTMl

<div class="container">

    <!-- This column will be 25% wide -->
    <div class="col-1">...</div>

    <!-- This column will be 50% wide -->
    <div class="col-2">...</div>

    <!-- This column will be 25% wide -->
    <div class="col-1">...</div>

</div>
```

```
// CSS

.container{
    display: flex;
}

/* Classes for each column size. */

.col-1{
    flex: 1;
}

.col-2{
    flex: 2;
}

@media (max-width: 800px){
    .container{
        /* Turn the horizontal layout into a vertical one. */
        flex-direction: column;     
    }
}
```

Bạn có xem chi tiết ví dụ [tại đây](https://tutorialzine.com/2016/02/quick-tip-easiest-way-to-make-responsive-headers)

# 5. Tạo sticky footer

Flexbox có một giải pháp dễ dàng cho vấn đề. Khi xây dựng các trang có *sticky footer*, bằng cách đặt toàn bộ mọi thứ trong *flex elements*, chúng ta có thể chắc chắn rằng *footer* sẽ luôn ở cuối trang.

Áp dụng `display: flex` cho thẻ body cho phép chúng ta xây dựng toàn bộ bố cục trang của mình bằng các thuộc tính của *flex*. 

```
// HTMl

<body>

    <!-- All the page content goes here  -->

    <div class="main">...</div>

    <!-- Our sticky foooter -->

    <footer>...</footer>

</body>
```

```
// CSS

html{
    height: 100%;
}

body{
    display: flex;
    flex-direction: column;
    height: 100%;
}

.main{
   /* The main section will take up all the available free space
      on the page that is not taken up by the footer. */
   flex: 1 0 auto;
}

footer{
   /* The footer will take up as much vertical space as it needs and not a pixel more. */
   flex: 0 0 auto;
}
```

Bạn có thể xem chi tiết [ví dụ](https://tutorialzine.com/2016/03/quick-tip-the-best-way-to-make-sticky-footers)

![](https://images.viblo.asia/e7208a57-5069-4155-9a16-f8037756a752.png)

Cảm ơn các bạn đã đọc bài viết.
Nguồn:  [tutorialzine](https://tutorialzine.com/2016/04/5-flexbox-techniques-you-need-to-know-about)