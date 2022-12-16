Trong bài trước, chúng ta đã trang trí một vài container sử dụng thuộc tính `background-color`. Tuy nhiên vẫn còn nhiều cách khác nữa để khiến các container trông đẹp mắt hơn. Hãy cùng thảo luận thêm về các thuộc tính `background`.

## Thiết lập hình nền cho một container

Chúng ta đã sử dụng thuộc tính `background-color` một vài lần trong bài hướng dẫn trước. Lần này chúng ta sẽ thiết lập hình nền của một container sử dụng thuộc tính `background-image`. Đây là cú pháp của thuộc tính này:

```css
background-image: url(đường-dẫn-tới-tệp-ảnh);
```

Dạng của đường dẫn tới tệp ảnh sẽ tùy thuộc vào việc ảnh mà bạn sử dụng được lưu trữ cục bộ hay trên một trang web khác đâu đó trên internet. Trong code ví dụ phía bên dưới, chúng ta sẽ sử dụng một tấm ảnh đang được host tại [ImgUr.com](https://i.imgur.com/sp2xQEy.png).

```niceday.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>A Nice Day</title>
      <link rel="stylesheet" href="niceday.css">
   </head>
   <body>
      <section class="card">
         <h2 class="card-msg">A nice daaay !</h2>
      </section>
   </body>
</html>
```

```niceday.css
.card {
   display: inline-block;
   width: 320px;
   height: 600px;

   /* color is used in case browser cannot load image */
   background-color: Crimson;

   /* use image as background */
   background-image: url(https://bit.ly/3i8gJzS);
}

.card-msg {
   text-align: center;
   color: White;
}
```

[Xem kết quả hiển thị](https://codepen.io/semiarthanoi/full/dyJoyrG)

Chúng ta đã sử dụng một tấm hình có một cánh đồng trải dài. Nhưng một phần của tấm hình lại bị ẩn đi vì kích thước của container nhỏ hơn rất nhiều so với kích thước của ảnh nền. Hãy cùng sửa lại trong phần tiếp theo.

## Thuộc tính `background-size`

Thuộc tính `background-size` có thể được sử dụng với 1 trong 2 giá trị thông minh - `cover` và `container`. Cả 2 giá trị này sẽ đều cố gắng khiến cho hình nền điều chỉnh phù hợp với kích thước của container.

Trong khi `background-size: cover;` sẽ giúp đảm bảo rằng hình nền luôn lấp kín diện tích của container,  thì `background-size: container` sẽ giúp đảm bảo rằng hình nền luôn được hiển thị đầy đủ trong container.

Hãy thử nhân đôi container mà chúng ta đang có và dùng thử cả 2 giá trị này.

```nice.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Another Nice Day</title>
      <link rel="stylesheet" href="nice.css">
   </head>
   <body>
      <section class="card bg-cover">
         <h2 class="card-msg">A nice daaay !</h2>
      </section>
      
      <section class="card bg-contain">
         <h2 class="card-msg">Another nice daaay !</h2>
      </section>
   </body>
</html>
```

```nice.css
.card {
   display: inline-block;
   width: 320px;
   height: 600px;

   background-color: Crimson;
   background-image: url(https://bit.ly/3i8gJzS);
}

.card-msg {
   text-align: center;
   color: White;
}

.bg-cover {
   background-size: cover;
}

.bg-contain {
   background-size: contain;
}
```

[Xem kết quả hiển thị](https://codepen.io/semiarthanoi/full/BaJNaEm)

Như bạn đã thấy thì hình nền ở container thứ 2 có cùng độ rộng với container nhưng có 
chiều cao nhỏ hơn. Và theo mặc định thì trình duyệt web sẽ lặp hình nền để lấp đầy diện tích của container.

Để điều khiển việc lặp hình nền, chúng ta có thuộc tính `background-repeat` có thể được sử dụng với 1 trong 3 giá trị sau: `repeat-x`, `repeat-y`, và `no-repreat`. Bạn có thể thử sử dụng thuộc tính này với container thứ 2 để xem cách hoạt động. :D

P/s: Thuộc tính `background-size` cũng có thể được sử dụng với một cặp giá trị chỉ `độ dài`. Giá trị đầu tiên sẽ là `width` (chiều rộng) và giá trị thứ 2 sẽ là `height` (chiều cao). Ví dụ: 

```css
background-size: 500px 300px;
```

## Thuộc tính `background-position`

Thông thường thì chúng ta sẽ muốn đảm bảo hình nền luôn che phủ hết diện tích của container. Vì vậy nên sẽ hay có một phần của hình nền bị ẩn đi. Thuộc tính `background-position` có thể giúp chúng ta thiết lập vị trí của hình nền để đảm bảo phần đẹp nhất của hình nền sẽ được hiển thị.

Đây là các giá trị mặc định của `background-position`:

```css
background-position: left top;
```

Giá trị đầu tiên là vị trí theo phương ngang và có thể nhận một trong các khóa sau - `left` (bên trái), `center` (chính giữa), `right` (bên phải), hoặc một giá trị chỉ định `độ dài`.

Giá trị thứ 2 là vị trí theo phương dọc và có thể nhận một trong các khóa sau - `top` (phía trên), `center` (chính giữa), `bottom` (phía dưới), hoặc một giá trị chỉ định `độ dài`.

Hãy chỉnh sửa ví dụ trước đó của chúng ta một chút để xem `background-position` hoạt động như thế nào.

```nice.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>A Perfect Day</title>
      <link rel="stylesheet" href="nice.css">
   </head>
   <body>
      <section class="card bg-left-top">
         <h2 class="card-msg">A</h2>
      </section>

      <section class="card bg-center-top">
         <h2 class="card-msg">perfect</h2>
      </section>

      <section class="card bg-right-top">
         <h2 class="card-msg">daaay !</h2>
      </section>
   </body>
</html>
```

```nice.css
.card {
   display: inline-block;
   width: 320px;
   height: 600px;

   background-color: Crimson;
   background-image: url(https://bit.ly/3i8gJzS);
   background-size: cover;
}

.card-msg {
   text-align: center;
   color: White;
}

.bg-left-top {
   background-position: left top;
}

.bg-center-top {
   background-position: center top;
}

.bg-right-top {
   background-position: right top;
}
```

[Xem kết quả hiển thị](https://codepen.io/semiarthanoi/full/KKZpKLx)

Bài viết về các thuộc tính `background` của chúng ta đến đây là kết thúc. Ngoài những thuộc tính mà chúng ta đã nói đến ở trên, CSS còn một vài thuộc tính khác nữa để làm việc với `background` mà mình đã không mang vào bài viết này. Đây là danh sách tất cả các thuộc tính `background` trong trường hợp bạn muốn tìm hiểu sâu hơn:

- [`background-color`](https://www.w3schools.com/cssref/pr_background-color.asp)
- [`background-image`](https://www.w3schools.com/cssref/pr_background-image.asp)
- [`background-position`](https://www.w3schools.com/cssref/pr_background-position.asp)
- [`background-size`](https://www.w3schools.com/cssref/css3_pr_background-size.asp)
- [`background-repeat`](https://www.w3schools.com/cssref/pr_background-repeat.asp)
- [`background-origin`](https://www.w3schools.com/cssref/css3_pr_background-origin.asp)
- [`background-clip`](https://www.w3schools.com/cssref/css3_pr_background-clip.asp)
- [`background-attachment`](https://www.w3schools.com/cssref/pr_background-attachment.asp)
- [`background`](https://www.w3schools.com/cssref/css3_pr_background.asp) - Đây là dạng ngắn để viết gộp tất cả mọi thiết lập liên quan đến background trong 1 dòng.

[[CSS] Bài 6 - Các Thuộc Tính Border](https://viblo.asia/p/L4x5xAQBKBM)