Trong bài viết này, chúng ta sẽ nói về việc bổ sung các hiệu ứng chuyển tiếp cho các thành phần tương tác với người dùng. Các ví dụ trong bài viết này yêu cầu các trình duyệt web được cập nhật tới các phiên bản được phát hành gần đây.

## Thuộc tính `transition`

Thuộc tính [`transition`](https://www.w3schools.com/css/css3_transitions.asp) có thể giúp chúng ta dễ dàng bổ sung các hiệu ứng chuyển tiếp cho các thành phần tương tác với người dùng. Chúng ta chỉ cần đặt vào phần giá trị của `transition` tên của thuộc tính sẽ được thay đổi và thời gian chuyển tiếp:

```css
transition: property duration;
```

Ở đây chúng ta cũng cần lưu ý rằng không phải thuộc tính nào cũng hỗ trợ hiệu ứng chuyển tiếp. Bạn có thể xem danh sách đầy đủ của các thuộc tính có thể tạo hoạt ảnh chuyển tiếp tại đây - [CSS Animatable](https://www.w3schools.com/cssref/css_animatable.asp)

Hãy thử viết một ví dụ để xem thuộc tính `transition` hoạt động thực tế. Chúng ta sẽ mô phỏng đồi cỏ xuân có `background-color` chuyển tiếp mượt mà khi chúng ta thay đổi mùa.

```time.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Time</title>
      <link rel="stylesheet" href="time.css">
   </head>
   <body>
      <input id="spring" type="radio" name="season" checked> Spring |
      <input id="summer" type="radio" name="season"> Summer |
      <input id="fall"   type="radio" name="season"> Fall |
      <input id="winter" type="radio" name="season"> Winter
      
      <div class="field"></div>
   </body>
</html>
```

```time.css
.field {
   height: 320px;
   margin-top: 12px;
      
   transition: background-color 0.9s;
}

#spring:checked ~ .field {
   background-color: LimeGreen;
}

#summer:checked ~ .field {
   background-color: ForestGreen;
}

#fall:checked ~ .field {
   background-color: Yellow;
}

#winter:checked ~ .field {
   background-color: WhiteSmoke;
}
```

[Xem kết quả hiển thị](https://codepen.io/semiarthanoi/full/OJzPRwr)

Nếu như chúng ta muốn tạo hiệu ứng chuyển dịch với nhiều hơn 1 thuộc tính, cách đơn giản nhất là sử dụng từ khóa `all` thay cho tên của một thuộc tính cụ thể.

```css
transition: all 1s;
```

Thuộc tính `transition` còn có thể nhận thêm 2 giá trị nữa là:

- [`timing-function`](https://www.w3schools.com/cssref/css3_pr_transition-timing-function.asp) - kiểu phân bố thời gian chuyển tiếp.
- và thời gian trễ trước khi bắt đầu thể hiện hiệu ứng chuyển tiếp.

```css
transition: all 1s linear 0.5s;
```

Dòng code ví dụ vừa rồi sử dụng kiểu chuyển tiếp `linear` với tốc độ chuyển tiếp đều trong suốt thời gian chuyển tiếp `1s`, và thời gian trễ trước khi thể hiện hiệu ứng là `0.5s`.

## Hiệu ứng chuyển tiếp phức tạp

Thuộc tính `transition` còn cho phép chúng ta tạo ra hiệu ứng chuyển tiếp phức tạp hơn một chút. Lấy ví dụ là chúng ta muốn tạo ra những hiệu ứng chuyển tiếp với nhiều thuộc tính khác nhau. Việc này có thể thực hiện bằng cú pháp sau:

```css
transition: property1 duration1 [delay1],
            property2 duration2 [delay2],
            ...;
```

Trong trường hợp này, nếu cần sử dụng `timing-function` thì chúng ta cần chỉ định bằng thuộc tính [`transition-timing-function`](https://www.w3schools.com/cssref/css3_pr_transition-timing-function.asp).

```css
transition-timing-function: linear;
```

Hãy thử viết một ví dụ để triển khai một hiệu ứng hơi phức tạp một chút. Chúng ta sẽ tạo ra một khối có thể được mở rộng/thu gọn và có màu nền thay đổi với hiệu ứng chuyển tiếp.

```breath.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Breath</title>
      <link rel="stylesheet" href="breath.css">
   </head>
   <body>
      <input id="toggler" type="checkbox"> Expand/Collapse
      <div class="box"></div>
   </body>
</html>
```

```breath.css
.box {
   width: 100%;
   height: 300px;

   max-width: 100px;
   max-height: 100px;

   background-color: Crimson;

   transition: background-color 0.9s,
               max-width        0.6s 0.9s,
               max-height       0.3s 1.5s;
   
   transition-timing-function: linear;
}

#toggler:checked + .box {
   max-width: 100%;
   max-height: 300px;

   background-color: ForestGreen;
}
```

[Xem kết quả hiển thị](https://codepen.io/semiarthanoi/full/KKZwNwV)

## Xây dựng một slide ảnh đơn giản

Tới đây thì mình tin là bạn đã có thể hoàn thiện [thanh điều hướng `responsive`](https://viblo.asia/p/html-css-xay-dung-thanh-dieu-huong-responsive-LzD5dRAEZjY)
mà chúng ta đã xây dựng trước đó thêm một chút. Đó là bổ sung thêm hiệu ứng chuyển tiếp khi người dùng thiết bị di động màn hình nhỏ mở/đóng danh sách liên kết.

[[HTML + CSS] Xây Dựng Thanh Điều Hướng Responsive](https://viblo.asia/p/LzD5dRAEZjY)

Trước khi viết bài CSS về `transition` này thì mình dự định sẽ mời bạn cùng viết code cho một cái danh sách dạng sổ xuống `dropdown` mà chúng ta thường gặp trên bất kỳ trang web nào. Tuy nhiên thì cách xử lý ở đây không có gì khác lắm so với tính năng mở/đóng thanh điều hướng trên thiết bị di động màn hình nhỏ. Vì vậy nên khi viết tới đây mình đã nghĩ tới một thành phần khác cũng rất phổ biến trên các trang web đó là `slide` ảnh, còn hay được gọi với một cái tên khác là `carousel`.

Như thường lệ thì mình cũng di chuyển phần này tới một bài viết riêng để giữ cho nội dung ở đây được tập trung vào việc giới thiệu thuộc tính `transition`. Vì vậy nên bạn hãy duy trì Tab web hiện tại và mở thêm liên kết dưới đây để đi tới bài viết cho `carousel` nhé.

[[HTML + CSS] Xây Dựng Một Slide Ảnh Đơn Giản](https://viblo.asia/p/vyDZORX9Kwj)

Bạn đã hoàn thành việc xây dựng `carousel` chưa? :D Có phần phức tạp hơn đôi chút so với xây dựng một thanh điều hướng phải không? :D

Ở bài viết tiếp theo thì chúng ta sẽ cùng thảo luận về việc tạo ra các hoạt ảnh tự động trong CSS. Cái này nghe thì khá giống với `transition` mà chúng ta vừa nói đến ở đây nhưng có phần linh động hơn và có lẽ là thú vị hơn. :D

Hẹn gặp lại bạn trong bài viết tiếp theo.

[[CSS] Bài 16 - Các Hoạt Ảnh Tự Tạo](https://viblo.asia/p/Az45bRbq5xY)