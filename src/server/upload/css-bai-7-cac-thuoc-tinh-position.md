Chúng ta đã biết cách thiết lập kích thước và trang trí các container. Việc canh chỉnh và sắp xếp vị trí chính là bước tiếp theo để khiến trang web của chúng ta trông gọn gàng và ngăn nắp. Hãy cùng thảo luận về các thuộc tính `position`.

## Các thuộc tính `position` trong CSS

Có 4 thuộc tính `nổi tiếng` có thể giúp chúng ta thay đổi vị trí và di chuyển các phần tử HTML. Các thuộc tính này rất mạnh mẽ nên đã được người ta gọi chung là `bộ tứ`:

- [`top`](https://www.w3schools.com/cssref/pr_pos_top.asp)
- [`right`](https://www.w3schools.com/cssref/pr_pos_right.asp)
- [`bottom`](https://www.w3schools.com/cssref/pr_pos_bottom.asp)
- [`left`](https://www.w3schools.com/cssref/pr_pos_left.asp)

Tuy nhiên, để giữ cho nội dung văn bản HTML của chúng ta được sắp xếp trình tự, các trình duyệt web luôn mặc định khóa cứng vị trí của các phần tử bằng `position: static;`. Để giải phóng bộ tứ và chứng kiến tiềm năng của họ, chúng ta cần thay đổi giá trị của thuộc tính `position`.

Thuộc tính `position` có thể được sử dụng với một trong các giá trị sau -`static` (mặc định), `fixed`, `absolute`, `relative`.

Đối với mỗi giá trị của thuộc tính `position`, bộ tứ nói trên sẽ hoạt động theo những cách khác nhau. Vì vậy nên chúng ta sẽ tạo ra một vài phần thảo luận cho 3 giá trị cuối cùng của thuộc tính `position` và xem bộ tứ hoạt động ra sao.

## Sử dụng `position: fixed;`

Luật CSS `position: fixed;` sẽ nói với các trình duyệt web rằng, chúng ta muốn thiết lập vị trí của phần tử HTML tương quan với khung hiển thị của trình duyệt web. Luật CSS này có một hiệu ứng phụ đó là nó sẽ khiến cho phần tử HTML tách rời khỏi dòng hiển thị thông thường của trang và không còn chiếm không gian hiển thị như bình thường nữa.

```pinned.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Pinned Button</title>
      <link rel="stylesheet" href="pinned.css">
   </head>
   <body>
      <button id="up">Pinned Button</button>

      <!--
         These image is for testing purpose.
         They make the document long enough to be scrollable.
      -->
      <img class="img-responsive" src="https://s19.postimg.cc/cgsyns1qr/snow.jpg">
      <img class="img-responsive" src="https://s19.postimg.cc/cgsyns1qr/snow.jpg">
      <img class="img-responsive" src="https://s19.postimg.cc/cgsyns1qr/snow.jpg">
   </body>
</html>
```

```pinned.css
#up {
   font-size: 15px;
   
   width: 150px;
   height: 50px;

   color: White;
   background-color: Crimson;
   border: none;
   
   /* set position */
   position: fixed;
   right: 20px;
   bottom: 10px;
}

/* for testing purpose */
.img-responsive {
   width: 100%;
   height: auto;
}
```

[Xem kết quả hiển thị](https://codepen.io/semiarthanoi/full/jOYPNGq)

Đây là cách thức mà đoạn code phía trên hoạt động:

- Đầu tiên, nút nhấn được tách khỏi dòng hiển thị thông thường của trang web. Vì vậy nên bạn để ý là hình ảnh sẽ xuất hiện ngay từ phần đầu trang chứ không có khoảng trống nào ở phía trên. Dường như là nút nhấn đó không hề tồn tại.
- Luật CSS `right: 20px;` được áp dụng để thiết lập khoảng cách giữa cạnh bên phải của nút nhấn và cạnh bên phải của khung hiển thị của trình duyệt.
- Luật CSS `bottom: 10px;` được áp dụng để thiết lập khoảng cách giữa cạnh bên dưới của nút nhấn và cạnh bên dưới của khung hiển thị của trình duyệt.

## Sử dụng `position: absolute;`

Luật CSS `position: absolute;` sẽ nói với các trình duyệt web rằng, chúng ta muốn thiết lập vị trí của phần tử tương quan với `container` cha bao quanh phía bên ngoài phần tử. Và điều kiện cần thêm là `container` ở bao quanh phía ngoài không sử dụng `position: static;`.

Chúng ta sẽ xem một trường hợp sử dụng đơn giản của `absolute` khi phác họa một thẻ sản phẩm có gắn một nhãn sale-off nhỏ. Nhãn sale-off sẽ được canh chỉnh vị trí tương quan với container cha chính là thẻ sản phẩm bao quanh bên ngoài.

```product.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Good product</title>
      <link rel="stylesheet" href="product.css">
   </head>
   <body>
      <div class="card">
         <!--
            some elements for product's
            information go here
         -->

         <span class="card-tag"></span>
      </div>
   </body>
</html>
```

```product.css
.card {
   width: 270px;
   height: 360px;

   background-color: WhiteSmoke;
}

.card-tag {
   width: 110px;
   height: 40px;

   background-color: Tomato;
}

/* positioning .card-tag */

.card {
   position: relative;
}

.card-tag {
   position: absolute;
   right: 0px;
   top: 15px;
}
```

[Xem kết quả hiển thị](https://codepen.io/semiarthanoi/full/BaJNBJa)

Trong trường hợp container cha ở phía bên ngoài có `position: static`, trình duyệt web sẽ kiểm tra container tiếp theo bao quanh container cha, và cứ thế tiếp tục cho đến khi tìm thấy một container vỏ bọc không phải là `static`, sau đó thực hiện canh chỉnh phần tử ban đầu theo vị trí của container phù hợp đã tìm được.

## Sử dụng `position: relative;`

Luật CSS `position: relative;` sẽ nói với các trình duyệt web rằng, chúng ta muốn thiết lập vị trí của phần tử HTML tương quan với vị trí mặc định của chính nó. Không giống với 2 giá trị `fixed` và `absolute`, giá trị `relative` không tách phần tử HTML khỏi dòng hiển thị thông thường của trang web. Vì vậy nên giá trị này thường được sử dụng khi chúng ta muốn thực hiện những chỉnh sửa nhỏ về vị trí của phần tử HTML ví dụ như di chuyển khoảng vài `px` để cân bằng thiết kế.

Hãy xem xét ví dụ dưới đây. Nút nhấn thứ 2 có nội dung chữ bên trong được canh chỉnh lại
một chút để trông cân bằng hơn.

```relative.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Back to Top</title>
      <link rel="stylesheet" href="relative.css">
   </head>
   <body>
      <button class="btn">
         ^ Back to Top
      </button>

      <button class="btn">
         <span class="btn-icon">^</span>
         <span class="btn-label">Back to Top</span>
      </button>
   </body>
</html>
```

```relative.css
.btn {
   font-size: 15px;
   
   width: 150px;
   height: 50px;

   color: White;
   background-color: DodgerBlue;
   border: none;
   
   cursor: pointer;
}

.btn-label {
   position: relative;
   left: 4px;
}

.btn-icon {
   font-weight: bold;
   
   position: relative;
   top: 3px;
   left: -5px;
}
```

[Xem kết quả hiển thị](https://codepen.io/semiarthanoi/full/gOopYoN)

## Thuộc tính `z-index`

Phần này không nằm trong kế hoạch ban đầu khi mình chuẩn bị viết bài này. Và được bổ sung sau một khoảng thời gian mình xem lại tổng quan về các kiến thức mà chúng ta đã đi qua. Thuộc tính `z-index` được tạo ra để hỗ trợ cho tác vụ canh chỉnh vị trí với `position`.

Thông thường thì khi hiển thị các nội dung trong văn bản HTML, trình duyệt web sẽ hiển thị 
theo một dòng chảy nội dung nối tiếp và các nội dung không bị xếp chồng chéo che lấp lẫn nhau. Tuy nhiên khi sử dụng `position` để canh chỉnh nội dung thì trong nhiều trường hợp chúng ta sẽ có các phần tử được hiển thị ở cùng vị trí. Lúc này trình duyệt web sẽ có một quy tắc hiển thị đó là các phần tử được tạo ra sau thì sẽ được hiển thị ở phía trên theo phương `z` gần với mắt người xem hơn và che lấp các phần tử còn lại ở cùng vị trí.

Chúng ta có thể hiểu đơn giản là trong văn bản HTML, cứ phần tử nào bắt đầu xuất hiện ở
dòng dưới thì sẽ được hiển thị ở vị trí cao hơn và sẽ che lấp các phần tử được viết mở đầu
ở các dòng HTML phía trên. Giá trị sử dụng với `z-index` là các số nguyên và tùy chúng 
ta lựa chọn.

```css
z-index: 1;
```

Lưu ý quan trọng ở đây là `z-index` được tạo ra để hỗ trợ cho các trường hợp canh chỉnh bằng `position`. Do đó nên thuộc tính này sẽ chỉ có hiệu lực đối với các phần tử được đặt `position` khác với `static`.

Chúng ta sẽ xem một ví dụ về một khung hiển thị ảnh đơn giản. Ở đây các tấm ảnh được hiển thị xếp chồng để người dùng xem chi tiết từng tấm thay vì hiển thị ở dạng lưới. Thuộc tính `z-index` được sử dụng để nâng tấm ảnh đang được kích hoạt `.active` lên vị trí hiển thị cao hơn và gần mắt người xem hơn so với các tấm ảnh còn lại.

```carousel.html
<!doctype html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">

   <title>Simple Carousel</title>

   <link rel="stylesheet" href="carousel.css">  
</head>
<body>
   <div class="carousel">
      <img class="active" src="https://bit.ly/3i5Jmh1">
      <img src="https://bit.ly/3I9YBzZ">
      <img src="https://bit.ly/3CGlCt6">
      <img src="https://bit.ly/35QI7zS">
   </div>
</body>
</html>
```

```carousel.css
.carousel {
   max-width: 800px;
  
   margin: 0 auto;
  
   position: relative;
}

.carousel > img {
   width: 100%;
   height: auto;
  
   position: absolute;
   top: 0;
   left: 0;
   z-index: 1;
}

.carousel > .active {
   z-index: 2;
}
```

[Xem kết quả hiển thị](https://codepen.io/semiarthanoi/pen/mdpJdWV)

Bài viết về các thuộc tính `position` của chúng ta đến đây là kết thúc. Trong bài tiếp theo,
chúng ta sẽ nói về việc thiết lập phong cách hiển thị cho các nội dung chữ và xây dựng một
thanh điều hướng (1 cái đơn giản thôi :D).

[[CSS] Bài 8 - Trang Trí Nội Dung Chữ](https://viblo.asia/p/XL6lAVYm5ek)