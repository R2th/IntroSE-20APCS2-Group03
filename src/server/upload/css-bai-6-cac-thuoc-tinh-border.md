Sử dụng đường viền là một trong số những cách phổ biến để trang trí các container. Bạn có thể thấy cách trang trí này được sử dụng trên hầu hết mọi trang web. Hãy cùng thảo luận về các thuộc tính `border`.

## Các thuộc tính `border`

Có 4 thuộc tính có thể giúp chúng ta nhanh chóng tạo ra các đường viền bao quanh các container:

- [`border-top`](https://www.w3schools.com/cssref/pr_border-top.asp)
- [`border-right`](https://www.w3schools.com/cssref/pr_border-right.asp)
- [`border-bottom`](https://www.w3schools.com/cssref/pr_border-bottom.asp)
- [`border-left`](https://www.w3schools.com/cssref/pr_border-left.asp)

Và đây là cú pháp chung:

```css
border-left: 5px solid black;
```

- Giá trị đầu tiên `5px` là độ rộng của đường viền.
- Giá trị thứ 2 `solid` là kiểu hiển thị, trong đó `solid` có nghĩa là đường kẻ liền mạch.
- Giá trị cuối cùng là màu của đường viền sẽ được vẽ.  

Bạn có thể tìm thấy nhiều kiểu đường viền khác tại đây - [Danh sách kiểu hiển thị viền](https://www.w3schools.com/cssref/pr_border-style.asp).

Hãy thử trang trí một nút nhấn bằng việc sử dụng các thuộc tính `border`.

```explore.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Explore</title>
      <link rel="stylesheet" href="explore.css">
   </head>
   <body>
      <button>Explore</button>
   </body>
</html>
```

```explore.css
button {
   font-size: 17px;
   
   width: 170px;
   height: 50px;
   
   color: DodgerBlue;
   background-color: White;
   
   /* borders */
   border-top: 2px solid DodgerBlue;
   border-right: 2px solid DodgerBlue;
   border-bottom: 2px solid DodgerBlue;
   border-left: 2px solid DodgerBlue;
}
```

[**Xem kết quả hiển thị**](https://codepen.io/semiarthanoi/full/RwxPNWV)

Nếu như cả 4 đường viền đều sử dụng chung một bộ giá trị, chúng ta có một dạng viết ngắn để có thể gộp tất cả trong 1 dòng code:

```css
border: 2px solid DodgerBlue;
```

Để bỏ đi 1 đường viền, chúng ta chỉ cần nói `none`:

```css
border-left: none;
```

Và, để bỏ đi tất cả:

```css
border: none;
```

## Các thuộc tính `border-radius`

Các thuộc tính `border-radius` giúp chúng ta khiến cho các góc của container được bo tròn. Các thuộc tính này hoạt động hoàn toàn độc lập với các thuộc tính `border` đã nói đến ở trên, mặc dù tên gọi của chúng trông có hơi liên quan.

Về cơ bản thì chúng ta cũng có 4 thuộc tính `border-radius`:

- [`border-top-left-radius`](https://www.w3schools.com/cssref/css3_pr_border-top-left-radius.asp)
- [`border-top-right-radius`](https://www.w3schools.com/cssref/css3_pr_border-top-right-radius.asp)
- [`border-bottom-right-radius`](https://www.w3schools.com/cssref/css3_pr_border-bottom-right-radius.asp)
- [`border-bottom-left-raidus`](https://www.w3schools.com/cssref/css3_pr_border-bottom-left-radius.asp)

Hãy thử chỉnh sửa lại phong cách hiển thị của nút nhấn trong ví dụ trước. Lần này chúng ta sẽ khiến cho nút nhấn đó có các góc được bo tròn và màu nền được lấp đầy.

```explore.css
button {
   font-size: 17px;
   
   width: 170px;
   height: 50px;
   
   /* remove borders & invert colors */
   color: White;
   background-color: DodgerBlue;
   border: none;
   
   /* rounded corners */
   border-top-left-radius: 3px;
   border-top-right-radius: 24px;
   border-bottom-right-radius: 3px;
   border-bottom-left-radius: 24px;
}
```

[**Xem kết quả hiển thị**](https://codepen.io/semiarthanoi/full/oNpXgbz)

Chúng ta cũng có một dạng viết ngắn của các thuộc tính `border-radius` cho phép chỉ định cả 4 giá trị trong 1 dòng code. 4 giá trị sẽ được đặt theo thứ tự thuận theo chiều kim đồng hồ - `top-left`, `top-right`, `bottom-right`, `bottom-left`.

```css
border-radius: 3px 24px 3px 24px;
```

Nếu như chỉ có 2 giá trị được sử dụng ở dạng viết ngắn, giá trị đầu tiên sẽ được áp dụng cho `top-left` và `bottom-right`, còn giá trị thứ 2 sẽ được áp dụng cho `top-right` và `bottom-left`.

```css
border-radius: 3px 24px;
```

Nếu như tất cả 4 góc đều được bo tròn như nhau thì chúng ta có thể sử dụng dạng viết ngắn với 1 giá trị duy nhất.

`border-radius: 25px;`

## Thuộc tính `box-sizing`

Việc đề cập đến thuộc tính này nằm ngoài kế hoạch, tuy nhiên nó có liên quan đến việc sử dụng các đường viền. :D

Giả sử rằng chúng ta có một container với độ rộng `300px` và chúng ta tạo một `border-left` độ rộng `5px`. Như vậy chúng ta sẽ có một phần tử HTML có chiều rộng tổng cộng là `305px`, bởi vì đường viền sẽ được vẽ ở bên ngoài phần diện tích chính của container. Đây là cách xử lý mặc định của các trình duyệt và được thiết lập bởi luật CSS:

```css
box-sizing: content-box;
```

Tuy nhiên, đôi khi chúng ta lại muốn đảm bảng rằng kích thước sau cùng của các phần tử HTML không thay đổi cho dù phần tử đó có sử dụng đường viền hay không. Điều này có thể được thực hiện bằng cách thay đổi giá trị của thuộc tính `box-sizing`:

```css
box-sizing: border-box;
```

Giá trị `border-box` sẽ nói với các trình duyệt web rằng, đường viền sẽ được vẽ vào phía bên trong phần diện tích chính của container. Để làm rõ điểm này, ví dụ dưới đây sẽ minh họa 2 giá trị của thuộc tính `box-sizing`.

```sunny.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

      <title>Sunny</title>

      <link rel="stylesheet" href="sunny.css">
   </head>
   <body>
      <div class="circle-with-border  draw-outside"></div>
      <div class="circle-with-border  draw-inside"></div>
   </body>
</html>
```

```sunny.css
.circle-with-border {
   display: inline-block;
   width: 100px;
   height: 100px;

   background-color: crimson;
   border: 30px solid gold;
   border-radius: 50%;
}

.draw-outside {
   box-sizing: content-box;
   /* 160px wide in total */
}

.draw-inside {
   box-sizing: border-box;
   /* 100px wide in total */
}
```

[**Xem kết quả hiển thị**](https://codepen.io/semiarthanoi/full/VwyLYaP)

Bài viết về các thuộc tính `border` của chúng ta tới đây là kết thúc. Bây giờ thì chúng ta
đã biết cách làm thế nào để trang trí các container. Trong bài tiếp theo, chúng ta sẽ nói
về cách thiết lập vị trí và canh chỉnh các container.

P/s: Bên cạnh các thuộc tính `background` và `border`, CSS có cung cấp một vài 
thuộc tính khác giúp chúng ta trang trí các container để phù hợp với những mục đích 
khác nhau. Các thuộc tính này yêu cầu các trình duyệt web cần được cập nhật phiên bản mới. Trong trường hợp bạn muốn tìm hiểu thêm, hãy thử đọc về 2 thuộc tính sau:

- [`opacity`](https://www.w3schools.com/cssref/css3_pr_opacity.asp)
- [`box-shadow`](https://www.w3schools.com/cssref/css3_pr_box-shadow.asp)

[[CSS] Bài 7 - Các Thuộc Tính Position](https://viblo.asia/p/3Q75wADDZWb)