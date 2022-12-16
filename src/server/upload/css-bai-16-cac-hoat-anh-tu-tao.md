Trong bài này, chúng ta sẽ nói về việc tạo ra các hoạt ảnh phức tạp. Các ví dụ trong bài viết này yêu cầu các trình duyệt web được cập nhật với phiên bản được phát hành gần đây.

## Thuộc tính `animation`

Hãy bắt đầu với một ví dụ đơn giản. Ở đây chúng ta có một hoạt ảnh di chuyển một chiếc hộp từ bên trái sang bên phải và màu nền của chiếc hộp cũng sẽ thay đổi dần từ đỏ sang xanh.

```animation.css
box {
   width : 100px;
   height: 100px;

   position: relative;
   background-color: Black;

   animation: moveAndChangeBackGround 3s linear 2s;
}

@keyframes moveAndChangeBackGround {
   from {
      left: 0;
      background-color: Crimson;
   }

   to {
      left: 50%;
      background-color: RoyalBlue;
   }
}
```

```animation.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Animation</title>
      <link rel="stylesheet" href="animation.css">
   </head>
   <body>
      <div class="box"></div>
   </body>
</html>
```

[**Xem kết quả hiển thị**](https://codepen.io/semiarthanoi/full/ZEvGrjK)

Như bạn thấy thì thuộc tính `animation` được viết trong ví dụ ở trên trông rất giống với thuộc tính `transition`. Cú pháp của `animation` cũng có 4 giá trị là: tên hoạt ảnh, thời gian hoàn thành, kiểu phân bố tốc độ thực hiện hoạt ảnh, và thời gian trễ trước khi bắt đầu thực hiện hoạt ảnh. Điểm mới mẻ ở đây là `tên hoạt ảnh`. Chúng ta có thể đặt cho các hoạt ảnh những cái tên đẹp. :D

Tuy nhiên thì đó không phải là tất cả. Chúng ta đã thấy là hoạt ảnh được `tự động` thực hiện khi trang web được tải xong; Và sau khi hoạt ảnh hoàn thành thì vị trí và màu nền của chiếc hộp đều đượt thiết lập lại như trạng thái ban đầu. Đây là những điểm khác biệt chính giữa `animation` và `transition` mà chúng ta có thể nói ở thời điểm hiện tại. Hãy xem chúng ta còn những gi tiếp theo.

## Lặp hoạt ảnh

Tính năng này cũng không có ở `transition`. Chúng ta có thể tạo ra các `animation` được lặp lại nhiều lần. Mặc định thì số lần lặp của hoạt ảnh được thiết lập bởi luật CSS sau:

```css
animation-iteration-count: 1;
```

Điều này có nghĩa là mặc định thì các hoạt ảnh sẽ chỉ được thực hiện 1 lần duy nhất. Chúng ta cũng có thể thiết lập số lần lặp với giá trị `infinite` để hoạt ảnh được lặp vô hạn.

## Hoạt ảnh nhiều pha

Hãy cùng xem lại ví dụ ở phần đầu tiên. Bên trong khối `@keyframes` chúng ta có hoạt ảnh được định nghĩa với 2 trạng thái `stoppoint`. Chúng ta cũng có thể sử dụng `0%` và `100%` thay vì `from` và `to`. Bạn có đoán được điều này có ý nghĩa gì không? :D

Chúng ta có thể thiết lập nhiều điểm `stoppoint` và tạo ra các hoạt ảnh phức tạp với nhiều chặng. Hãy cập nhật code CSS của chúng ta để tạo ra một hoạt ảnh lặp vô hạn với chuyển động phức tạp.

```animation.css
.box {
   width : 100px;
   height: 100px;
   border-radius: 50%;

   position: relative;
   background-color: Black;

   animation: moveAndChangeBackGround 9s linear 2s;
   animation-iteration-count: infinite;
}

@keyframes moveAndChangeBackGround {
   0% {
      background-color: Orange;
      top : 0;
      left: 0;
   }

   25% {
      background-color: ForestGreen;
      top : 240px;
      left: 420px;
   }

   50% {
      background-color: RoyalBlue;
      top :     0;
      left: 420px;
   }

   75% {
      background-color: Crimson;
      top : 240px;
      left:     0;
   }

   100% {
      background-color: Orange;
      top : 0;
      left: 0;
   }
} /* @keyframes */
```

[**Xem kết quả hiển thị**](https://codepen.io/semiarthanoi/full/XWVbEzx)

## Trạng thái phát

Mặc định thì các hoạt ảnh sẽ được tự động phát khi trang web của chúng ta được tải xong. Điều đó có nghĩa là không có sự tương tác với người dùng ở đây. Tuy nhiên thì đôi khi chúng ta sẽ muốn để người dùng có thể tắt/bật các hoạt ảnh. Điều này có thể được thực hiện bằng cách thay đổi giá trị của thuộc tính `animation-play-state`.

```css
animation-play-state: running /* paused */;
```

Hãy cập nhật các đoạn code HTML và CSS của chúng ta một chút để dùng thử thuộc tính này.

```animation.html
<input id="toggler" type="checkbox" checked> Play/Paused
<div class="box"></div>
```

```animation.css
/* ... */

.box {
   animation-play-state: paused;
}

#toggler:checked + .box {
   animation-play-state: running;
}
```

[Xem kết quả hiển thị](https://codepen.io/semiarthanoi/full/rNpVdER)

Bài viết về thuộc tính `animation` của chúng ta tới đây là kết thúc. Tới đây thì bạn đã có thể nghĩ tới việc bổ sung thêm tính năng tự động chuyển ảnh cho slide ảnh mà chúng ta đã xây dựng trong bài trước. Tính năng này chỉ cần hoạt động khi trang web mới được tải xong và chưa có tương tác gì từ người dùng. Ngay khi người dùng click chuột chuyển tới xem một ảnh bất kỳ thì tính năng tự động phát có thể được tắt hẳn và không cần kích hoạt trở lại.

Trong bài tiếp theo, chúng ta sẽ nói về các hàm chức năng trong CSS. Đây là các công cụ giúp chúng ta thực hiện một số tác vụ tính toán hỗ trợ cho các thuộc tính.

[[CSS] Bài 17 - Các Hàm Chức Năng](https://viblo.asia/p/Eb85oABmZ2G)