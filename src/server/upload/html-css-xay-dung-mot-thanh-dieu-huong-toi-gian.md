Trong bài viết này, chúng ta sẽ cùng nhau xây dựng một thanh điều hướng đơn giản với HTML và CSS. Bài viết này là một phần của bài hướng dẫn CSS thứ 8 trong [Series Tự Học Lập Trình Web Một Cách Thật Tự Nhiên](https://viblo.asia/s/Wj53OQQP56m) mà mình đang thực hiện.

Trước khi bắt đầu, mình sẽ giả định là bạn đến từ bài hướng dẫn CSS về trang trí nội dung chữ mà mình đã đăng tải trước đó. Như vậy thì tính tới thời điểm hiện tại, chúng ta đang có một vài công cụ cơ bản như sau:

- Các bộ chọn CSS cơ bản, bộ chọn `class`, và bộ chọn `id`
- Các thuộc tính phổ biến: `color` & `background-color`
- Các thuộc tính canh chỉnh vị trí.
- Và các thuộc tính khác để trang trí nội dung chữ.

Chúng ta sẽ sử dụng chỉ những công cụ này để xây dựng một thanh điều hướng đơn giản. Và đây là kết quả mà chúng ta dự kiến.

`Ảnh chụp màn hình`
![thanh điều hướng đơn giản](https://images.viblo.asia/246df7e7-c464-4acb-b6a5-2a0c73c100f9.jpg)

Bài viết này chỉ là một ví dụ, bạn có thể sử dụng những màu sắc và font chữ yêu thích của riêng mình để thu được kết quả như ý muốn dành riêng cho trang web của bạn.

## Chuẩn bị code HTML

Từ kết quả dự kiến ở phía trên thì thanh điều hướng của chúng ta sẽ có khoảng 7 liên kết, 2 trong số đó sẽ có phong cách hiển thị đặc biệt so với phần còn lại và vì thế nên có `id` riêng:

- Đầu tiên là `#logo` có màu nền nổi bật.
- Và cái còn lại là `#about` có vị trí hiển thị đặc biệt (tách rời khỏi số còn lại).

Bản thân thanh điều hướng cũng có thể có `id` nếu như bạn dự kiến rằng đó cũng sẽ là một phần đặc trưng duy nhất, không lặp lại trên trang web của bạn.

```topnav.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>A simple navigation bar</title>
      <link rel="stylesheet" href="topnav.css">
   </head>
   <body>
      <nav id="topnav">
         <a id="logo" class="nav-link" href="#">MY NAME</a>
         <a class="nav-link" href="#">Link 1</a>
         <a class="nav-link" href="#">Link 2</a>
         <a class="nav-link" href="#">Link 3</a>
         <a class="nav-link" href="#">Link 4</a>
         <a class="nav-link" href="#">Link 5</a>

         <a id="about" class="nav-link" href="#">About Me</a>
      </nav>
   </body>
</html>
```

![](https://images.viblo.asia/a6006ce9-cabc-4cb2-851f-1f58c7909010.png)

## Những việc cần làm trong CSS

Việc trang trí bằng CSS có thể được chia thành các tác vụ nhỏ như sau:

1. Đặt màu nền cho `<nav>`, màu chữ cho các liên kết, và gắn cố định thanh điều hướng ở phần trên của khung hiển thị web.
2. Thiết lập kích thước cho tất cả các liên kết.
3. Thiết lập phong cách hiển thị đặc biệt cho `#logo` (có thể là màu nền hay font chữ đặc biệt :D).
4. Thiết lập vị trí của `#about` đứng ở phía bên phải của thanh điều hướng.

### 1. Trang trí container `<nav>`

Việc gắn cố định thanh điều hướng ở trên đầu của khung hiển thị là một tác vụ đơn giản và trước đó chúng ta đã thực hiện một lần trong bài viết về các thuộc tính [`position`](https://viblo.asia/p/3Q75wADDZWb).

Tuy nhiên bạn nhớ thiết lập độ rộng `width` của container thành `100%` nhé. Bởi vì lệnh `position: fixed;` sẽ khiến container thu lại nếu như chúng ta không chỉ định `width`.

```topnav.css
/* Color */

#topnav {
   background-color: Black;
}

#logo,
.nav-link {
   color: White;
}

/* Positioning */

#topnav {
   position: fixed;
   top: 0;
   left: 0;

   width: 100%;
}

/* Font & Text-size */

#logo, 
.nav-link {
   font-family: Arial, sans-serif;
   font-size: 15px;
   text-decoration: none;
}
```

![](https://images.viblo.asia/2db587a0-72c4-4048-aaab-a553a178bef2.png)

### 2. Thiết lập kích thước cho tất cả các liên kết

Tác vụ này chúng ta cũng đã từng thực hiện một lần trong bài viết về 
[các kiểu `container` trong CSS](https://viblo.asia/p/1Je5EAkL5nL).

```topnav.css
/* Sizing Links */

.nav-link {
   display: inline-block;
   width: 90px;
   height: 55px;

   /* centering text */
   text-align: center;    /* horizontally */
   line-height: 55px;     /* vertically */
}
```

![](https://images.viblo.asia/c536309a-9027-4c2e-8c36-469c0ae6c5da.png)

### 3. Thiết lập phong cách đặc biệt cho `#logo`

Phần này chỉ là tùy chọn và tùy thuộc vào phong cách của riêng bạn, bạn cũng có thể sẽ muốn sử dụng một hình ảnh hay một từ nào đó như trong code ví dụ.

```topnav.css
/* Styling Logo */

#logo {
   width: 150px;

   background-color: RoyalBlue;
   
   font-weight: bold;
}
```

![](https://images.viblo.asia/ff8597be-ddaf-467e-b865-a459beef5b05.png)

### 4. Thiết lập vị trí cho `#about`

Đây là tác vụ cuối cùng và cũng là tác vụ dễ thực hiện nhất. Chúng ta sẽ thiết lập vị trí của `#about` đứng phía bên phải của thanh điều hướng. :D

```topnav.css
/* Positioning #about */

#about {
   position: absolute;
   top: 0;
   right: 0;
}
```

![](https://images.viblo.asia/2cf6f165-09cf-40eb-b402-f923ec865ece.png)

### Dọn dẹp code

Xin chúc mừng! :D

Bạn vừa mới xây dựng xong một thanh điều hướng đơn giản cho trang web của bạn. Hãy lưu lại các đoạn mã đầu đó trong máy tính để bạn có thể sử dụng lại sau này.

```topnav.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>A simple navigation bar</title>
      <link rel="stylesheet" href="topnav.css">
   </head>
   <body>
      <nav id="topnav">
         <a id="logo" class="nav-link" href="#">MY NAME</a>
         <a class="nav-link" href="#">Link 1</a>
         <a class="nav-link" href="#">Link 2</a>
         <a class="nav-link" href="#">Link 3</a>
         <a class="nav-link" href="#">Link 4</a>
         <a class="nav-link" href="#">Link 5</a>

         <a id="about" class="nav-link" href="#">About Me</a>
      </nav>
   </body>
</html>
```

```topnav.css
/* Color */

#topnav {
   background-color: Black;
}

#logo,
.nav-link {
   color: White;
}

/* Positioning */

#topnav {
   position: fixed;
   top: 0;
   left: 0;

   width: 100%;
}

/* Font & Text-size */

#logo, 
.nav-link {
   font-family: Arial, sans-serif;
   font-size: 15px;
   text-decoration: none;
}

/* Sizing Links */

.nav-link {
   display: inline-block;
   width: 90px;
   height: 55px;

   /* centering text */
   text-align: center;    /* horizontally */
   line-height: 55px;     /* vertically */
}

/* Styling Logo */

#logo {
   width: 150px;

   background-color: RoyalBlue;
   
   font-weight: bold;
}

/* Positioning #about */

#about {
   width: 120px;

   position: absolute;
   top: 0;
   right: 0;
}
```

## Tổng kết

Thanh điều hướng này rất đơn giản và cũng đã sẵn sàng để sử dụng, tuy nhiên nó vẫn còn một vài điểm chưa hoàn thiện:

- Thiếu hiệu ứng lướt trỏ chuột `hover`. Đây là một tính năng nhỏ để khiến trang web của chúng ta có khả năng đáp ứng linh động hơn với người sử dụng. Những người dùng máy tính sẽ cảm thấy thoải mái hơn nếu như họ rê trỏ chuột tới một liên kết và thấy một hiệu ứng hiển thị nào đó. Có thể là màu chữ hoặc màu nền của liên kết sẽ được thay đổi đôi chút...
- Độ rộng của các liên kết đang cố định. Trong trường hợp các liên kết của bạn có chứa các từ với độ dài khác nhau, tổng quan của thanh điều hướng trông sẽ hơi mất đồng đều. Và chúng ta sẽ phải thay đổi code CSS để đáp ứng với nội dung chữ cụ thể.
- Thanh điều hướng này không khả chuyển `responsive` và không có khả năng thay đổi phong cách hiển thị để đáp ứng với các thiết bị di động. Thông thường thì trên các thiết bị di động màn hình nhỏ, phần chính của khối các liên kết có thể được đóng/mở bằng việc click chuột vào một nút nhấn.

Không có gì để chúng ta phải thất vọng ở đây cả. Điều đó chỉ đơn giản có nghĩa là chúng ta sẽ có thể khiến mọi thứ trở nên tốt đẹp hơn trong tương lai, khi mà chúng ta có trong tay nhiều công cụ hơn (các bộ chọn nâng cao, các thuộc tính kiểm soát khoảng trống, cú pháp truy vấn thiết bị hiển thị, ...).

Đã đến lúc chúng ta quay trở lại để hoàn thành bài hướng dẫn CSS mà chúng ta đang bỏ dở. Ở đó vẫn còn rất nhiều thứ thú vị khác đang chờ đợi.

[[CSS] Bài 8 - Trạng Trí Nội Dung Chữ](https://viblo.asia/p/XL6lAVYm5ek)