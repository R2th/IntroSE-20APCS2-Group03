Trong bài này, chúng ta sẽ cùng xây dựng một thanh điều hướng `responsive` sử dụng HTML và CSS. Bài viết này là một phần của bài CSS số 13 trong [Series Tự Học Lập Trình Web Một Cách Thật Tự Nhiên](https://viblo.asia/s/Wj53OQQP56m) mà mình đang thực hiện.

Trước khi bắt đầu, hãy để mình giả định là bạn đến từ series bài viết về CSS mà mình đang thực hiện. Và như vậy thì tính tới thời điểm hiện tại, chúng ta đang có trong tay thêm một vài công cụ mới để sử dụng ở đây:

- Biết tất cả các bộ chọn trong CSS và biết tìm tài liệu về chúng ở đâu. Bởi vì chúng ta sẽ không cố gắng ghi nhớ tất cả mọi thứ. :D
- Các bộ chọn `pseudo-class` hay còn được gọi là các `class` giả định.
- Các thuộc tính `margin` và `padding`
- Cú pháp truy vấn thiết bị `@media`

Và... đây là kết quả mà chúng ta dự kiến.

`Khi xem trên máy tính`
![desktop](https://images.viblo.asia/ae8b73bf-893b-49ec-aaff-d3441d95beec.png)

`Khi xem trên điện thoại`
![mobile](https://images.viblo.asia/82790e36-4ccd-4d74-b2f0-89f9fd1351f2.png)

Bài viết này chỉ là một ví dụ, bạn có thể sử dụng phong cách trang trí riêng với font chữ và màu sắc yêu thích cho thiết kế mà bạn muốn sử dụng cho trang web của bạn.

## 1. Hãy để mọi thứ bắt đầu

Đầu tiên, chúng ta sẽ cấu trúc thanh điều hướng với một `container <nav>` và 3 phần tử con: `logo` và `2 danh sách liên kết`.

```navbar.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <title>Một thanh điều hướng responsive</title>
      <link rel="stylesheet" href="navbar.css">
   </head>
   <body>
      <nav class="navbar">
         <a class="navbar-brand" href="#">
            TÊN CỦA BẠN
         </a>
        
         <div class="navbar-left">
            <!-- một vài liên kết ở đây -->
         </div>
        
         <div class="navbar-right">
            <!-- một vài liên kết ở đây -->
         </div>
      </nav>
   </body>
</html>
```

Có thứ gì đó hơi lạ ở đây, một thẻ mới `<meta>` có liên quan tới khung hiển thị `viewport`.  Thẻ này được sử dụng để nói với các trình duyệt web rằng: "Nội dung của trang web này không nên được hiển thị ở dạng thu nhỏ". Và nếu như bạn nhìn thấy trang web nào đó khi hiển thị trên điện thoại di động có giao diện thu nhỏ cỡ chữ và hình ảnh thì lý do chính là vì thiếu thẻ `meta` này.

Tiếp theo, chúng ta cần thêm vào các liên kết điều hướng trong nội bộ trang web và các liên kết gắn tới các mạng xã hội. Chúng ta cũng sẽ giả định rằng các liên kết này sẽ có cùng phong cách hiển thị (kích thước, cỡ chữ, màu chữ, hiệu ứng trỏ chuột, ...) Và như vậy thì chúng ta sẽ nhóm các liên kết này bằng một tên `class` mô tả là `nav-link`.

```navbar.html
<nav class="navbar">
   <a class="navbar-brand" href="#">
      TÊN CỦA BẠN
   </a>

   <div class="navbar-left">
      <a class="nav-link" href="#">Link 1</a>
      <a class="nav-link" href="#">Link 2</a>
      <a class="nav-link" href="#">Link 3</a>
      <a class="nav-link" href="#">Link 4</a>
      <a class="nav-link" href="#">Link 5</a>
   </div>

   <div class="navbar-right">
      <a class="nav-link" href="#">Social 1</a>
      <a class="nav-link" href="#">Social 2</a>
      <a class="nav-link" href="#">Social 3</a>
   </div>
</nav>
```

![](https://images.viblo.asia/7c275d68-5ca3-445a-a71b-922f0551016b.png)

## 2. Viết code CSS cho các thiết bị màn hình lớn

Sẽ có nhiều người khác trên Trái Đất này nói với bạn rằng bạn nên viết code CSS cho các thiết bị có màn hình nhỏ trước bởi vì cái `Mobile First Design` được người ta nhắc tới ở mọi nơi. Tuy nhiên thì không hẳn là có nguyên tắc nào cố định về việc bạn phải làm như vậy mới đúng. Trong bài viết này thì chúng ta sẽ viết code CSS cho các thiết bị có màn hình lớn trước, rồi sau đó mới quan tâm tới các thiết bị di động có màn hình nhỏ như điện thoại hay máy tính bảng.

Tác vụ này có thể được chia nhỏ thành các tác vụ phụ như sau:

1. Dàn vị trí 2 danh sách liên kết để khiến cho các liên kết hiển thị cùng hàng, và di chuyển một danh sách sang phía bên phải của thanh điều hướng.
2. Lên màu chữ, màu nền, và thiết lập kích thước cho các liên kết.
3. Thêm hiệu ứng khi người dùng trỏ chuột tới các liên kết (ngoại trừ cái logo).

### 2.1 Dàn vị trí 2 danh sách liên kết

Theo mặc định thì 2 danh sách liên kết mà chúng ta tạo ra khi được đóng gói bằng thẻ `<div>` sẽ có thuộc tính `display: block;`. Vì vậy nên điều này đã khiến cho 2 danh sách này không được hiển thị trên cùng hàng với logo `.navbar-brand`. Hãy sửa lại thuộc tính này trước hết.

```navbar.css
/* * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Reset CSS
 */

* {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Start styling navbar
 */
 
 /* Positioning lists */

.navbar-left,
.navbar-right {
   display: inline-block;
}
```

![](https://images.viblo.asia/b0f36108-4ce2-4865-a766-8076a987e15d.png)

Để di chuyển khối `.navbar-right` về phía bên phải, giải pháp đơn giản là chúng ta có thể sử dụng `position: absolute;` và canh chỉnh vị trí theo `container` cha ở bên ngoài là `.navbar`.

Bạn cũng có thể cân nhắc luôn việc gắn cố định thanh điều hướng ở trên đầu của khung hiển thị trình duyệt web bằng cách sử dụng `position: fixed;`; Hoặc nếu không thì chúng ta sẽ chỉ cần sử dụng `position: relative` để có thể bắt đầu canh chỉnh vị trí cho khối `.navbar-right`.

```navbar.css
.navbar {
   position: relative;
}

.navbar-right {
   position: absolute;
   top: 0;
   right: 0;
}
```

![](https://images.viblo.asia/0d975f9b-962f-4177-9852-03523d6b8582.png)

### 2.2 Thiết lập màu sắc & kích thước cho các liên kết

Tới đây thì chúng ta sẽ thiết lập màu sắc cho các liên kết trước hết, bởi vì điều này sẽ giúp cho chúng ta có thể nhận biết được kích thước của các liên kết. Chúng ta cũng sẽ lược bỏ luôn hiệu ứng gạch chân nội dung chữ của các liên kết.

```navbar.css
/* Colors */

.navbar {
   background: Black;
}

.navbar-brand {
   background: RoyalBlue;
}

.navbar-brand,
.navbar .nav-link {
   color: White;
   text-decoration: none;
}
```

![](https://images.viblo.asia/68a7c5e8-79b8-42a5-8d36-93ba9116fb22.png)

Để thiết lập kích thước cho các liên kết, chúng ta sẽ sử dụng `padding` thay vì sử dụng các thuộc tính `width` và `height`. Cách làm này sẽ giúp cho kích thước của các liên kết trở nên linh động và chúng ta sẽ không phải quan tâm tới nội dung chữ bên trong mỗi liên kết dài ngắn ra sao.

```navbar.css
/* Sizing links */

.navbar-brand,
.navbar .nav-link {
   display: inline-block;
   padding: 15px;
}
```

![](https://images.viblo.asia/c8395675-e870-4a81-b34f-55bbee4aa984.png)

###  2.3 Bổ sung hiệu ứng khi người dùng trỏ chuột tới các liên kết

Bản thân mình thì khá thích những hiệu ứng chuyển biến nhẹ nhàng và trong ví dụ này thì mình sẽ sử dụng hiệu ứng giống như của Github. Khi người dùng di chuyển trỏ chuột tới một liên kết thì màu chữ sẽ được làm tối đi một chút, ngoại trừ logo.

```navbar.css
/* Hover effects */

.navbar .nav-link:hover {
   color: LightGray;
}
```

## 3. Viết code CSS cho các thiết bị di động

Bây giờ là lúc mà chúng ta cần sử dụng tới cú pháp truy vấn thiết bị `@media`. Ở đây thì chúng ta sẽ chỉ tạo ra 1 điểm `breakpoint` nơi mà phong cách hiển thị sẽ được thay đổi. Tuy nhiên thì bạn có thể tự tạo thêm nhiều điểm `breakpoint` nữa nếu cảm thấy cần thiết.

```navbar.css
/* Mobile design */

@media (max-width: 842px) {
   /*
      Nếu chiều rộng của khung hiển thị web nhỏ hơn hoặc bằng 842px,
      code CSS được viết ở đây sẽ được áp dụng thay thế cho
      code CSS được viết trước đó ở phía trên.
   */
} /* @media */
```

Trước khi nói về những công việc mà chúng ta cần phải thực hiện, hãy thu nhỏ cửa sổ trình duyệt web của bạn để xem thanh điều hướng của chúng ta sẽ được hiển thị như thế nào trên thiết bị di động.

`Ảnh chụp màn hình`
![](https://images.viblo.asia/8e6ccbaf-6649-4d8c-a252-857f20b2c099.png)

Từ kết quả đang được hiển thị thì chúng ta đã có thể gạch đầu dòng những nội dung cần xử lý rồi:

1. Dàn vị trí để 2 danh sách liên kết được hiển thị theo hàng dọc.
2. Thêm chức năng thu gọn/mở rộng cho thanh điều hướng.
3. Bổ sung thêm một nút nhấn làm công tắc thu gọn/mở rộng đặt ở góc phía bên phải của thanh điều hướng.

### 3.1 Dàn vị trí 2 danh sách liên kết

Ở phần trên, chúng ta đã sử dụng thiết lập `display: inline-block;` cho 2 `container` danh sách liên kết và cả các phần tử `<a></a>` bên trong; Sau đó chúng ta đã di chuyển danh sách thứ 2 sang phía bên phải bằng cách sử dụng `position: absolute;`. Vậy bây giờ thì chúng ta chỉ cần ghi đè lại 2 thuộc tính này là được.

```navbar.css
/* Mobile design */

@media (max-width: 842px) {
   /* Positioning lists */

   .navbar-right,
   .navbar-left {
      display: block;
   }

   .navbar-right {
      position: static;
   }

   .navbar .nav-link {
      display: block;
   }
} /* @media */
```

![](https://images.viblo.asia/54974220-8cbd-46c9-bf1a-32ff96532831.png)

### 3.2 Thêm chức năng thu gọn/mở rộng

Thông thường thì tác vụ này sẽ được xử lý bằng một ngôn ngữ khác nữa có tên gọi là JavaScript. Tuy nhiên thì tính cho tới thời điểm này chúng ta vẫn chưa được gặp JS, vì vậy nên chúng ta sẽ triển khai theo cách của CSS. Cụ thể là chúng ta sẽ sử dụng một [`checkbox`](https://viblo.asia/p/gAm5yExk5db)  làm thành phần tín hiệu biểu thị cho 2 trạng thái thu gọn/mở rộng của thanh điều hướng, và sử dụng `class` giả định `:checked` để thay đổi kích thước của thanh điều hướng dựa trên trạng thái của `checkbox`.

```navbar.html
<input class="navbar-collapse" type="checkbox" checked>
<nav class="navbar">
   <!--
      logo & các liên kết
   -->
</nav>
```

```navbar.css
/* Mobile design */

@media (max-width: 842px) {
   /* ... */
  
  /* Toggling navbar */
  
   .navbar-collapse:checked + .navbar {
      max-height: 50px;
      overflow: hidden;
   }
} /* @media */
```

![](https://images.viblo.asia/75537adc-f1ff-40a9-9fe3-c240faa3b193.png)

Khi `checkbox` được đánh dấu thì có nghĩa là thanh điều hướng sẽ được hiển thị ở trạng thái thu gọn và ngược lại sẽ là trạng thái hiển thị bình thường được mở rộng đầy đủ. Bây giờ thì chúng ta đã có thể đóng/mở danh sách liên kết bằng việc đánh dấu và bỏ đánh dấu `checkbox`.

### 3.3 Bổ sung thêm nút nhấn `đóng/mở`

Tất cả chúng ta đều biết là các `checkbox` không hẳn thân thiện với người dùng thiết bị di động. Sẽ rất khó để chạm chính xác vào một ô lựa chọn nhỏ được thiết kế dành cho người dùng máy tính với trỏ chuột thông thường. Giải pháp ở đây mà chúng ta có thể nghĩ đến đó là ẩn `checkbox` và sử dụng một phần tử [`label`](https://viblo.asia/p/gAm5yExk5db) để làm nút nhấn cho người dùng thiết bị di động.

Chúng ta hiển nhiên cũng sẽ muốn `checkbox` được ẩn khỏi giao diện hiển thị dành cho người dùng máy tính. Vì vậy nên bạn nhớ di chuyển một phần code CSS ra khỏi khối truy vấn `@media` nhé.

```navbar.html
<input id="navbar-indicator" class="navbar-collapse" type="checkbox" checked>
<nav class="navbar">
   <!--
      logo & các liên kết
   -->
   
   <label class="navbar-toggler" for="navbar-indicator">
      +
   </label>
</nav>
```

```navbar.css
/* Toggler checkbox */

.navbar-collapse,
.navbar-toggler {
   display: none;
}

@media (max-width: 842px) {
   /* ... */
   
   /* Toggler button */
  
   .navbar-toggler {
      color: White;

      display: inline-block;
      padding: 15px 20px;

      position: absolute;
      top: 0;
      right: 0;

      cursor: pointer;
   }
} /* @media */
```

## 4. Dọn dẹp và thu gọn code

Xin chúc mừng!!! Bạn đã xây dựng xong một thanh điều hướng `responsive`! :D

Có thể bạn cũng sẽ muốn bổ sung thêm một vài đường viền để phân tách 2 danh sách liên kết và nút nhấn đóng/mở trước khi dọn dẹp và lưu lại code.

```navbar.css
@media (max-width: 842px) {
   /* ... */
   
   /* Lists borders */
   
   .navbar-toggler {
      border-left: 1px solid DimGray;
   }

   .navbar-left,
   .navbar-right {
      border-top: 1px solid DimGray;
   }
} /* @media */
```

Dưới đây là code mà mình đã thu gọn xong và có bổ sung 1 chút điều chỉnh để thanh điều hướng trông được hoàn thiện hơn theo chủ ý cá nhân. Bạn có thể lưu lại để tham khảo hoặc bỏ qua cũng được. :D

```navbar.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <title>A responsive navigation bar</title>
      <link rel="stylesheet" href="master.css">
   </head>
   <body>
      <input id="navbar-indicator" class="navbar-collapse" type="checkbox" checked>
      <nav class="navbar">
         <a class="navbar-brand" href="#">
            N A T U R E
         </a>

         <div class="navbar-left">
            <a class="nav-link" href="#">Course 1</a>
            <a class="nav-link" href="#">Course 2</a>
            <a class="nav-link" href="#">Course 3</a>
            <a class="nav-link" href="#">Course 4</a>
            <a class="nav-link" href="#">Course 5</a>
         </div>

         <div class="navbar-right">
            <a class="nav-link" href="#">Github</a>
            <a class="nav-link" href="#">Youtube</a>
            <a class="nav-link" href="#">Facebook</a>
         </div>

         <label class="navbar-toggler" for="navbar-indicator">
            +
         </label>
      </nav>
   </body>
</html>
```

```navbar.css
/* * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Reseting CSS
 */

* {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Styling navigation bar for large screen devices
 */

.navbar {
   position: relative;

   background: Black;
}

.navbar-left {
   display: inline-block;

   margin-left: 15px;
}

.navbar-right {
   display: inline-block;

   margin-right: 15px;

   position: absolute;
   top: 0;
   right: 0;
}

.navbar-brand,
.navbar .nav-link {
   color: White;
   text-decoration: none;

   display: inline-block;
   padding: 15px;
}

.navbar-brand {
   font-weight: bold;

   padding-left: 30px;
   padding-right: 30px;

   background: RoyalBlue;
}

.navbar .nav-link:hover {
   color: LightGray;
}

.navbar-collapse,
.navbar-toggler {
   display: none;
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Override styles to support mobile devices
 */

@media (max-width: 842px) {
   .navbar-right,
   .navbar-left {
      display: block;

      border-top: 1px solid DimGray;
   }

   .navbar-right {
      position: static;
   }

   .navbar .nav-link {
      display: block;
   }

   .navbar-collapse:checked + .navbar {
      max-height: 50px;
      overflow: hidden;
   }

   .navbar-toggler {
      color: White;

      display: inline-block;
      padding: 15px 25px;

      position: absolute;
      top: 0;
      right: 0;

      border-left: 1px solid DimGray;

      cursor: pointer;
   }
} /* @media */
```

## 5. Tổng kết

Vậy là tổng cộng chúng ta đã phải viết khoảng ~100 dòng code CSS để xây dựng một thanh điều hướng `responsive`. Bạn đã hoàn thành một công việc nghiêm túc đấy. Tuy nhiên chúng ta vẫn còn có thể tạo ra thứ gì đó tốt hơn nữa trong tương lai:

- Thanh điều hướng này vẫn thiếu các hiệu ứng hoạt ảnh chuyển đổi khi thu gọn/mở rộng.
- Chúng ta cũng chưa có các bộ biểu tượng `icon` để mô tả các liên kết tới các mạng xã hội. Ồ, mà cũng không chắc là cần lắm. Cũng có thể là bạn cũng thích dùng chữ hơn là biểu tượng. :D

Bạn đã sẵn sàng học thêm những kiến thức mới để kiến tạo tốt hơn? :D  
Hãy cùng quay trở lại bài viết về CSS mà chúng ta đang bỏ dở. Vẫn còn rất nhiều thứ thú vị đang chờ đợi chúng ta ở phía trước.

[[CSS] Bài 13 - Cú Pháp Truy Vấn Thiết Bị](https://viblo.asia/p/css-bai-13-cu-phap-truy-van-thiet-bi-V3m5WRzglO7)