Xin chào các bạn, chắc dân làm web chúng ta chẳng còn xa lạ gì với keyword `fontawesome` nữa rồi. Với phiên bản 5 xịn xò, FA ngày càng đa dạng với list icon đồ sộ thách thức mọi thư viện icon khác. Và từ version **5.10.0** trở đi chúng ta lại có thêm một lựa chọn tuyệt vời nữa đó là Duotone Icons. Vậy nó là gì và dùng như nào ? Hãy cùng mình tìm hiểu qua bài viết này

![](https://images.viblo.asia/f1166270-fe72-44d9-9613-9ea7317fb9af.png)
Lưu ý rất quan trọng đó là Duotone Icons tính tới hiện tại NOT FREE, đồng nghĩa với việc bạn phải mua gói Pro mới có thể sử dụng được list icon của nó.

Đọc đến đây chắc nhiều bạn thấy hơi hụt hẫng nhỉ, nhưng yên tâm có mình ở đây rồi bạn sẽ không mất đồng nào và vẫn có hàng xịn để dùng nhé =)

Vậy Duotone Icons là gì ? nó đơn giản được hiểu là "2 icon" gộp lại thành 1 để ta có thể custom color, opacity,... so với việc custom 1 icon truyền thống
![](https://images.viblo.asia/e03f1ea8-1d0d-4c58-85f2-4ac3f35d68f5.png)
## Cài đặt
+ Truy cập http://fa.hung1001.com/ để lấy phiên bản 5.x mới nhất (CDN Free only), bạn chỉ cần nhúng 1 trong 2 link vào project của mình là có thể sử dụng được
+ Nếu bạn muốn host thủ công hãy truy cập https://github.com/hung1001/font-awesome/releases và tải về phiên bản mong muốn
## Sử dụng
Cũng như các anh em của nó Duotone Icons sử dụng class `fad` làm prefix. 

Bạn có thể truy cập https://fontawesome.com/icons?d=gallery&s=duotone để lấy list icon cũng như code

### 1. Basic markup

![](https://images.viblo.asia/ce33c019-62bd-46c4-9525-3e3e4e2d9558.png)
```html
<div class="fa-3x">
  <i class="fad fa-camera"></i> <!-- a duotone style camera icon -->
  <i class="fad fa-fire-alt"></i> <!-- a duotone style fire-alt icon -->
  <i class="fad fa-bus-alt"></i> <!-- a duotone style bus-alt icon -->
  <i class="fad fa-fill-drip"></i> <!-- a duotone style fill-drip icon -->
</div>
```

### 2. Swapping Layer Opacity
Bạn có thể đảo ngược opacity bằng việc sử dụng thêm class `fa-swap-opacity`

![](https://images.viblo.asia/5fb47090-9847-416b-a392-8cda408090b3.png)
```html
<div class="fa-3x">
  <i class="fad fa-camera"></i> <!-- a duotone style camera icon -->
  <i class="fad fa-camera fa-swap-opacity"></i> <!-- a duotone style camera icon with swapped opacity -->

  <i class="fad fa-fire-alt"></i> <!-- a duotone style fire-alt icon -->
  <i class="fad fa-fire-alt fa-swap-opacity"></i> <!-- a duotone style fire-alt icon with swapped opacity -->

  <i class="fad fa-bus-alt"></i> <!-- a duotone style bus-alt icon -->
  <i class="fad fa-bus-alt fa-swap-opacity"></i> <!-- a duotone style bus-alt icon with swapped opacity -->
</div>
```

### 3. Changing Opacity
FA sử dụng 2 biến **--fa-primary-opacity** (default 1) và **--fa-secondary-opacity** (default .4) cho Duotone Icons. Bạn có thể thay đổi chúng bằng việc sử dụng style như sau

![](https://images.viblo.asia/75d90244-5e1d-4f36-b676-8a2ff4c90aa1.png)
```html
<div class="fa-3x">
  <i class="fad fa-bus-alt" style="--fa-primary-opacity: 0.20"></i> <!--  primary layer's opacity set to 20% -->
  <i class="fad fa-bus-alt" style="--fa-primary-opacity: 0.40"></i> <!--  primary layer's opacity set to 40% -->
  <i class="fad fa-bus-alt" style="--fa-primary-opacity: 0.60"></i> <!--  primary layer's opacity set to 60% -->
  <i class="fad fa-bus-alt" style="--fa-primary-opacity: 0.80"></i> <!--  primary layer's opacity set to 80% -->
  <i class="fad fa-bus-alt" style="--fa-primary-opacity: 1.0"></i> <!--  primary layer's opacity set to 100% -->
</div>
```

### 4. Coloring Duotone Icons
Tương tự FA sử dụng 2 biến **--fa-primary-color** và **--fa-secondary-color** để chỉ định màu sắc cho 2 icon, trong trường hợp bạn muốn custom có thể sử dụng như sau 

![](https://images.viblo.asia/0d218076-5346-418f-8fee-bb69d007e40e.png)
```html
<div class="fa-3x">
  <i class="fad fa-bus-alt" style="--fa-primary-color: gold;"></i>  <!-- primary layer color defined -->
  <i class="fad fa-bus-alt" style="--fa-primary-color: orangered;"></i> <!-- primary layer color defined -->
  <i class="fad fa-fill-drip" style="--fa-secondary-color: limegreen;"></i>  <!-- secondary layer color defined -->
  <i class="fad fa-fill-drip" style="--fa-secondary-color: rebeccapurple;"></i> <!-- secondary layer color defined -->
  <i class="fad fa-battery-full" style="--fa-primary-color: limegreen; --fa-secondary-color: dimgray;"></i> <!-- secondary + primary layer color defined -->
  <i class="fad fa-battery-quarter" style="--fa-primary-color: orange; --fa-secondary-color: dimgray;"></i> <!-- secondary + primary layer color defined -->
</div>
```

### 5. Kết hợp các biến
Bạn cũng có thể sử dụng kết hợp các biến để custom theo ý thích 

![](https://images.viblo.asia/d58081cd-40f0-4404-ae9a-2dcc6f1267d8.png)
```html
<div class="fa-3x">
  <i class="fad fa-book" style="--fa-primary-color: lightseagreen; --fa-secondary-color: linen; --fa-secondary-opacity: 1.0;"></i>
  <i class="fad fa-book-spells" style="--fa-primary-color: mediumpurple; --fa-secondary-color: linen; --fa-secondary-opacity: 1.0;"></i>
  <i class="fad fa-book-medical" style="--fa-primary-color: crimson; --fa-secondary-color: linen; --fa-secondary-opacity: 1.0;"></i>
  <i class="fad fa-book-user" style="--fa-primary-color: peru; --fa-secondary-color: linen; --fa-secondary-opacity: 1.0;"></i>

  <i class="fad fa-toggle-off" style="--fa-primary-color: white; --fa-secondary-color: gray; --fa-secondary-opacity: 1.0;"></i>
  <i class="fad fa-toggle-on" style="--fa-primary-color: dodgerblue; --fa-secondary-color: white; --fa-secondary-opacity: 1.0;"></i>

  <i class="fad fa-file-plus" style="--fa-primary-color: white; --fa-secondary-color: limegreen; --fa-secondary-opacity: 1.0;"></i>
  <i class="fad fa-file-exclamation" style="--fa-primary-color: white; --fa-secondary-color: gold; --fa-secondary-opacity: 1.0;"></i>
  <i class="fad fa-file-times" style="--fa-primary-color: white; --fa-secondary-color: tomato; --fa-secondary-opacity: 1.0;"></i>
</div>
```

### 6. Custom thông qua CSS Internal
![](https://images.viblo.asia/544b2335-752a-4798-9db2-32a5f4a1a77c.png)
```xml
<style>
  .theme-ravenclaw {
    --fa-secondary-opacity: 1.0;
    --fa-primary-color: rgb(4, 56, 161);
    --fa-secondary-color: rgb(108, 108, 108);
  }
</style>

<div class="fa-3x">
  <i class="fad fa-hat-wizard theme-ravenclaw"></i>
  <i class="fad fa-flask-potion theme-ravenclaw"></i>
  <i class="fad fa-wand-magic theme-ravenclaw"></i>
  <i class="fad fa-scarf theme-ravenclaw"></i>
  <i class="fad fa-book-spells theme-ravenclaw"></i>
</div>
```

### 7. Sử dụng với pseudo
Với pseudo code css có vẻ hơi dài nhưng cũng rất cần thiết cho một số trường hợp nhất định 

![](https://images.viblo.asia/50b4e726-3093-4653-b669-9176493c7f2a.png)
```xml
<i class="duotone-pseudo"></i>
<style>
.duotone-pseudo {
  font-size: 100px; /* for demo */

  position: relative; /* important */
  font-family: 'Font Awesome 5 Duotone'; /* important */
  font-weight: 900;
  font-style: normal; /* important when using i tag */
}
.duotone-pseudo:before {
  color: rgb(255,11,11);
  position: absolute; /* important */
  content: "\f55e";
}
.duotone-pseudo:after {
  color: rgb(105,105,105);
  content: "\10f55e"; /* important */
}
</style>
```
### Kết luận
Hết rồi đó :) thực ra cũng không có gì cao siêu đúng không. Trên đây mình đã hướng dẫn cho các bạn một style mới của FA và cách sử dụng.

Nếu thấy bài viết hay, hãy cho mình +1 upvote nhé. Nếu thích mình hãy nhấn nút follow để biết thêm nhiều thứ hay ho hơn.

Chúc bạn thành công và có những sản phầm tuyệt vời với FA Duotone Icons nhé ! Xin cảm ơn và hẹn gặp lại ở các bài viết sau !