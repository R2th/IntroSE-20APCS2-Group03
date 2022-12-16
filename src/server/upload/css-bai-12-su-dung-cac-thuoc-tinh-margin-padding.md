Các thuộc tính `margin` & `padding` là những công cụ mạnh mẽ giúp chúng ta kiểm soát các khoảng trống. Các thuộc tính này thường được sử dụng để thiết lập kích thước và canh chỉnh vị trí các thành phần trong trang web. Hãy cùng thảo luận về chúng.

## Các thuộc tính `margin` & `padding`

Kiểm soát khoảng trống là một trong những kĩ thuật quan trọng nhất trong hầu hết mọi khía cạnh của cuộc sống.

![thiền định](https://images.viblo.asia/1809b758-ff46-4edd-9a76-8e186a158965.jpg)

Trong CSS, việc kiểm soát khoảng trống có thể giúp chúng ta nhanh chóng thiết lập kích thước và canh chỉnh vị trí của các phần tử. Dưới đây là một vài thuộc tính được sử dụng để kiểm soát khoảng trống bên trong và xung quanh các phần tử:

- Các thuộc tính `padding` - kiểm soát khoảng trống bên trong các phần tử.
- Các thuộc tính `margin` - kiểm soát khoảng trống xunh quanh các phần tử.

## Các thuộc tính `padding`

Chúng ta có tất cả 4 thuộc tính `padding`:

- [`padding-top`](https://www.w3schools.com/cssref/pr_padding-top.asp) - khoảng cách giữa cạnh trên của container và nội dung mà nó chứa.
- [`padding-right`](https://www.w3schools.com/cssref/pr_padding-right.asp) - khoảng cách giữa cạnh phải của container và nội dung.
- [`padding-bottom`](https://www.w3schools.com/cssref/pr_padding-bottom.asp) - khoảng cách giữa cạnh dưới của container và nội dung.
- [`padding-left`](https://www.w3schools.com/cssref/pr_padding-left.asp) - khoảng cách giữa cạnh trái của container và nội dung.

Trong bài viết về [các kiểu `container`](https://viblo.asia/p/1Je5EAkL5nL), chúng ta đã tạo ra một vài liên kết có phong cách hiển thị trông giống như các nút nhấn bằng cách sử dụng các thuộc tính `width` và `height`. Việc sử dụng các thuộc tính `width` và `height` để thiết lập kích thước của các nút nhấn có một vài điểm bất cập. Đó là chúng ta sẽ cần phải chỉnh sửa code CSS để đáp ứng với nội dung chữ cụ thể bên trong nút nhấn.

Các thuộc tính `padding` có thể giúp chúng ta đơn giản hóa cả 2 tác vụ thiết lập kích thước cho các nút nhấn và canh giữa nội dung chữ.

```space.css
.btn {
   display: inline-block;

   padding-top: 15px;
   padding-right: 36px;
   padding-bottom: 15px;
   padding-left: 36px;

   font-size: 18px;
   text-decoration: none;
}

.btn-primary {
   color: White;
   background-color: RoyalBlue;
}

.btn-success {
   color: White;
   background-color: LimeGreen;
}

.btn-warning {
   color: White;
   background-color: Orange;
}
```

```space.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Space</title>
      <link rel="stylesheet" href="space.css">
   </head>
   <body>
      <a class="btn btn-primary" href="#">Register</a>
      <a class="btn btn-success" href="#">Add To Cart</a>
      <a class="btn btn-warning" href="#">More Info</a>
   </body>
</html>
```

[Xem kết quả hiển thị](https://codepen.io/semiarthanoi/full/bGaddrG)

Các thuộc tính `padding` cũng có một dạng viết thu gọn có thể giúp chúng ta chỉ định
cả 4 giá trị trong 1 dòng code. 4 giá trị sẽ được đặt theo thứ tự thuận theo chiều kim đồng hồ - `top`, `right`, `bottom`, `left`.

```css
padding: 15px 36px 15px 36px;
```

Nếu như chỉ có 3 giá trị được liệt kê trong dạng viết ngắn, giá trị đầu tiên sẽ là `top`, giá trị thứ 2 là `right/left`, và giá trị cuối cùng là `bottom`.

```css
padding: 15px 36px 15px;
```

Chúng ta cũng có thể sử dụng dạng viết ngắn chỉ với 2 giá trị. Khi đó thì giá trị đầu tiên sẽ là `top/bottom` và giá trị thứ 2 sẽ là `right/left`.

```css
padding: 15px 36px;
```

Trong trường hợp chỉ có 1 giá trị duy nhất được liệt kê, nó sẽ được áp dụng cho cả 2 hướng `padding`.

```css
padding: 15px;
```

## Các thuộc tính `margin`

Các thuộc tính `padding` giúp chúng ta kiểm soát khoảng trống bên trong các container, do đó nên chúng thường được sử dụng để thiết lập kích thước của các phần tử và canh chỉnh vị trí của các nội dung bên trong.

Ở mặt khác, các thuộc tính `margin` lại giúp chúng ta kiểm soát khoảng trống ở phía bên ngoài và xung quanh các phần tử. Do đó nên chúng thường được sử dụng để canh chỉnh vị trí của các container:

- [`margin-top`](https://www.w3schools.com/cssref/pr_margin-top.asp) - khoảng cách tối thiểu từ cạnh trên của 1 container tới 1 phần tử khác; hoặc cạnh trên của container bên ngoài nó.
- [`margin-right`](https://www.w3schools.com/cssref/pr_margin-right.asp) - khoảng cách tối thiểu từ cạnh phải của 1 container tới 1 phần tử khác; hoặc cạnh phải của container bên ngoài nó.
- [`margin-bottom`](https://www.w3schools.com/cssref/pr_margin-bottom.asp) - khoảng cách tối thiểu từ cạnh dưới của 1 container tới 1 phần tử khác; hoặc cạnh dưới của container bên ngoài nó.
- [`margin-left`](https://www.w3schools.com/cssref/pr_margin-left.asp) - khoảng cách tối thiểu từ cạnh trái của 1 container tới 1 phần tử khác; hoặc cạnh trái của container bên ngoài nó.

Các thuộc tính `margin` cũng có thể được viết ở dạng thu gọn giống như các thuộc tính `padding`. Hãy cùng viết một đoạn code CSS để xem các thuộc tính `margin` hoạt động như thế nào. Chúng ta sẽ tận dụng ví dụ đã có trước đó. Lần này, chúng ta sẽ tạo ra một vài khoảng trống xung quanh các nút nhấn.

```space.css
.btn {
   display: inline-block;
   padding: 15px 36px;

   /* thêm khoảng trống vào bên trái
     * và bên phải các nút nhấn
     */
   margin-right: 18px;
   margin-left: 18px;

   font-size: 18px;
   text-decoration: none;
}

.btn-primary {
   color: White;
   background-color: RoyalBlue;
}

.btn-success {
   color: White;
   background-color: LimeGreen;
}

.btn-warning {
   color: White;
   background-color: Gold;
}
```

## Giá trị `auto`

Chúng ta lại được gặp lại `auto` ở đây. Giá trị này thường được sử dụng với `margin` để nhanh chóng thiết lập vị trí cho các phần tử. Ví dụ dưới đây sẽ minh họa cách canh giữa vị trí cho một phần tử hoặc canh sát lề phải.

```auto.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Automa-g-ic</title>
      <link rel="stylesheet" href="auto.css">
   </head>
   <body>
      <div class="container">
         <div class="square center"></div>
      </div>

      <div class="container">
         <div class="square right"></div>
      </div>
   </body>
</html>
```

```auto.css
.container {
   padding: 30px 15px;
}

.square {
   width: 90px;
   height: 90px;

   background-color: Crimson
}

/* margin ft. auto :D */

.square.center {
   /* di chuyển khối vuông vào giữa (theo phương ngang) */
   margin-left: auto;
   margin-right: auto;
}

.square.right {
   /* di chuyển khối vuông sang bên phải */
   margin-left: auto;
}
```

[Xem kết quả hiển thị](https://codepen.io/semiarthanoi/full/PoEqqEM)

Đối với hình vuông đầu tiên, mục đích của chúng ta là canh giữa theo phương ngang bằng cách tạo ra khoảng trống ở cả 2 phía bên trái và bên phải. Tuy nhiên, mình nghĩ tác vụ thực hiện tính toán kích thước của khoảng trống được ủy thác lại cho trình duyệt web sẽ tốt hơn. Do đó mình thử sử dụng giá trị `auto` và thấy nó hoạt động rất hoàn hảo.

Đối với hình vuông thứ hai thì mình muốn canh vị trí về phía bên phải của container cha bao quanh bên ngoài. Do đó mình chỉ thêm khoảng trống vào phía bên trái của hình vuông với kích thước `auto`.

Điểm tuyệt vời nhất của phương thức canh chỉnh vị trí này đó là trình duyệt web sẽ luôn
theo dõi và áp dụng những điều chỉnh phù hợp ở mọi thời điểm khi người dùng đang sử dụng trang web. Nếu như bạn thử thu hẹp lại cửa sổ trình duyệt web thì bạn sẽ thấy nội dung trong trang web cũng sẽ được điều chỉnh tự động để đáp ứng với kích thước hiển thị mới. Hình vuông đầu tiên sẽ luôn luôn được hiển thị ở chính giữa và hình vuông thứ hai sẽ luôn hiển thị ở phía bên phải.

Trong bài tiếp theo, chúng ta sẽ gặp gỡ cú pháp truy vấn thiết bị trong CSS. Cú pháp này cho phép chúng ta viết code CSS hướng đến từng khoảng kích thước hiển thị. Sau đó, chúng ta sẽ cùng xây dựng một thanh điều hướng sử dụng thiết kế đáp ứng và có thể đóng/mở trên
các thiết bị di động.

[[CSS] Bài 13 - Cú Pháp Truy Vấn Thiết Bị](https://viblo.asia/p/V3m5WRzglO7)