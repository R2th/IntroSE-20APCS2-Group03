Vài ngày trước, trong lúc lướt web mình có xem được một trang portfolio khá đẹp của [Melanie Daveid](http://melaniedaveid.com/). Mình thấy có một số animation khá đẹp, và bắt đầu tìm hiểu xem họ đã làm thế nào. 
![](https://images.viblo.asia/7a7ba969-20b6-4488-975d-074dbd4ef2ff.png)

Inspect element thì thấy một mớ code dạng thế này
```
<svg version="1.1" class="lettering" 
 xmlns="http://www.w3.org/2000/svg" 
 xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
 width="455px" 
 height="455px" 
 viewBox="0 0 455 455" 
 enable-background="new 0 0 455 455" xml:space="preserve">
        <defs>
            <clipPath id="welcome-clip">
                <path fill="#fff" d="M329.837 307.818c2.51 1.666"></path>
........
```
SVG thì đã từng nghe qua, nhưng thực chất nó là gì, và làm thế nào để animate nó. Dưới đây là một số khái niệm sơ khai để bắt đầu  tìm hiểu xem cách sử dụng SVG như thế nào.

## Vậy thì... SVG là cái gì?
**SVG (Scalable Vector Graphics)**, là một định dạng hình ảnh (tương tự như JPG, PNG,... mà chúng ta vẫn thường dùng) sử dụng cấu trúc XML để hiển thị hình ảnh dưới dạng vector.

Vì là hình ảnh dạng vector nên chúng ta có thể hiển thị, co giãn (scale) thoải mái mà không làm giảm chất lượng hình ảnh.

Một ưu điểm của SVG là tất cả mọi element và attribute của các element đó đều có thể animate.

Ví dụ một file SVG để vẽ hình tròn:
```
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="red" stroke-width="2" fill="pink" />
</svg>
```

## Tại sao nên sử dụng SVG?

### Bảo đảm chất lượng hình ảnh
Như đã biết hình ảnh dưới dạng vector có thể hiện thị tốt trên bất kỳ kích thước hay độ phân giải nào. Bạn có thể phóng to thu nhỏ nó tùy thích mà không phải lo ảnh bị vỡ, nhòe mờ không như hình ảnh bitmap thông thường . Vì thế mà mấy bác designer thích dùng những phần mềm dựng vector như Corel, Illustrator để thiết kế quảng cáo, in ấn ....

### Tiết kiệm dung lượng
Lại một ưu điểm nữa của ảnh vector. Một ảnh vector sẽ có dung lượng nhỏ hơn nhiều so với bitmap do cấu trúc của ảnh.

### Animation
Đây là thứ mà mình thấy hứng thú. Như đã nói ở trên, tất cả mọi element và thuộc tính của chúng trong file SVG đều có thể animate được. Nên chúng ta hoàn toàn có thể sử dụng một file SVG duy nhất và dùng CSS hoặc Javascript để làm animation cho từng thành phần của hình ảnh đó. Để thực hiện công việc tương tự cho các định dạng ảnh khác, chúng ta phải export từng thành phần muốn làm animation thành từng hình ảnh riêng biệt, điều này sẽ giúp tăng thêm số request để load ảnh và làm cho trang web của bạn load chậm một cách thần kì.

### Độ tương thích
Đối với các trình duyệt hiện tại, svg đều hỗ trợ rất tốt, nên chúng ta có thể sử dụng mà không cần đắn đo gì cả.
Có thể xem chi tiết về độ tương thích với các trình duyệt tại [đây](http://caniuse.com/#feat=svg)

## Khi nào thì sử dụng svg?
SVG tốt như vậy tại sao không thay toàn bộ ảnh trên trang web bằng svg???

Nhược điểm của SVG là giới hạn về độ chi tiết và màu sắc, tất nhiên chúng ta có thể sử dụng SVG để vẽ một hình ảnh phức tạp, hoặc thực như ảnh chụp, nhưng nếu làm vậy thì performance sẽ rất tệ.

Ta chỉ nên dùng SVG với những hình ảnh đơn giản, điều này rất phù hợp với những xu hướng thiết kế hiện nay như flat design chẳng han.

## Dùng svg thế nào?

Rất đơn giản, cách dùng svg khá linh hoạt:

### Dùng trực tiếp
Bạn có thể ném trực tiếp svg vào trang HTML của mình, nó sẽ hiển thị ngay lập tức
```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
  "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:mc="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title></title>
  </head>
  <body>
    <svg width="100" height="100">
      <circle cx="50" cy="50" r="40" stroke="red" stroke-width="2" fill="pink" />
    </svg>
  </body>
</html>  
```
### src cho thẻ img
Bạn cũng có thể dùng thông quả thẻ img
```
<img src="circle.svg" />
```
### Hoặc dùng trong CSS
```
<div class="circle"></div>
```
```
.circle {
  background-image: url("facebook.svg");
  ...
}
```

Trên đây mới là một số thứ mà có thể mọi người cũng biết về svg, chúng ta sẽ cùng tìm hiểu về svg và svg animation trong những phần sau....