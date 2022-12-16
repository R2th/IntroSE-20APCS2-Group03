Về cơ bản thì sau khi làm xong các bạn sẽ được một "cái gì đó" tương tự như này :laughing:

{@embed: https://codepen.io/hungpv-2151/pen/QWjbGRq}

## HTML
Đầu tiên, các bạn cần có html đã
  
```
<div id="slider">
  <div id="stage">
    <div id="shape" class="ring backfaces">
      <div class="plane item-1"> 1 </div>
      <div class="plane item-2"> 2 </div>
      <div class="plane item-3"> 3 </div>
      <div class="plane item-4"> 4 </div>
      <div class="plane item-5"> 5 </div>
      <div class="plane item-6"> 6 </div>
      <div class="plane item-7"> 7 </div>
      <div class="plane item-8"> 8 </div>
      <div class="plane item-9"> 9 </div>
    </div>
  </div>
</div>
```

## CSS
Tiếp theo là CSS, mình sẽ đi từ tag to nhất vào dần bên trong nhé...

### #slider

```
#slider {
  background-color: black;
  background-image: -webkit-gradient(radial, 50% 300, 1, 50% 300, 400, from(rgba(255, 255, 255, 0.3)), to(rgba(255, 255, 255, 0)));
  width: 100%;
  padding: 50px 0;
  -webkit-perspective: 800px;
  -moz-perspective: 800px;
  -webkit-perspective-origin: 50% 100px;
  -moz-perspective-origin: 50% 100px;
}
```

Mấy cái background thì ai cũng biết rồi, mình sẽ nói chút về mấy cái dưới thôi, dù là tí ae thử cái là biết nó là gì hết ấy mà

+ perspective: Tạo chiều sâu cho slider, tức là càng ra xa càng bé lại ấy. Ở đây, bạn chỉnh càng nhỏ thì tức là "càng xa". Phần "px" có thể bỏ nếu chỉ dùng trên chrome, firefox.
+ perspective-origin: Tạo độ "vênh" của slideshow, là chỉ cho nó ngửa mặt nên hay cúi mặt xuống ấy :laughing: Nếu bạn muốn slideshow "nhìn thẳng" thì có thể dùng `center` hoặc bỏ luôn dòng đó cũng được

### #stage

```
#stage {
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  transform-style: preserve-3d;
  transform: translateZ(-200px);
}
```

Không có gì phải nói nhiều ngoài `translateZ(-200px)`, nó dùng để fix chút cho phần `-webkit-perspective: 800px;` ở `#slider` do thằng này phóng ảnh quanh 1 trục, ảnh "sau" thì nhỏ lại, và tất nhiên là ảnh "trước" thì sẽ to ra, nên ta cần đẩy lùi "cái trục" này về "sau" một chút cho khỏi "vỡ khung"

###  #shape

```
#shape {
  position: relative;
  margin: 0 auto;
  height: 210px;
  width: 210px;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-animation: spin 9s infinite linear;
  -moz-animation: spin 9s infinite linear;
  -ms-animation: spin 9s infinite linear;
  animation: spin 9s infinite linear;
}
@-webkit-keyframes spin {
  from { transform: rotateY(0); }
  to { transform: rotateY(-360deg); }
}
```

Đây chỉ chỉ có mỗi cái chú ý cho bạn nào chưa biết chỗ animation, nó chạy cái keyframes spin do bạn định nghĩa trong 9s, lặp lại vô tận, còn cái linear chạy tốc độ đều từ khi bắt đầu đến kết thúc, nó còn có kiểu nhanh dần hay chậm dần nữa, nhưng ở đây thì bỏ qua đi.

Cái keyframes trên là nó chạy y trang cái mẫu trên đầu ấy, nếu bạn muốn nó dừng một chút ở mỗi slide thì có thể dùng cái sau

```
@-webkit-keyframes spin {
  from, 10% { transform: rotateY(0); }
  11.11%, 21.11% { transform: rotateY(-40deg); }
  22.22%, 32.22% { transform: rotateY(-80deg); }
  33.33%, 43.33% { transform: rotateY(-120deg); }
  44.44%, 54.44% { transform: rotateY(-160deg); }
  55.56%,65.56% { transform: rotateY(-200deg); }
  66.67%, 76.67% { transform: rotateY(-240deg); }
  77.78%, 87.78% { transform: rotateY(-280deg); }
  88.89%, 98.89% { transform: rotateY(-320deg); }
  to { transform: rotateY(-360deg); }
}
```

### .plane

```
.plane {
  position: absolute;
  height: 210px;
  width: 210px;
  border: 1px solid white;
  border-radius: 12px;
  text-align: center;
  font-size: 114pt;
  color: black;
  background-color: rgba(255, 255, 255, 0.6);
}
```

Từ chỗ này là phần then chót để giúp bạn có thể bớt thêm slide các kiểu mà "dáng" vẫn chuẩn, ta cần thiết lập vị trị cho các slide, animation chỉ giúp nó quay vòng vòng thôi nhé.

Và cũng không có cách nào ngoài xếp tay đâu, trừ khi bạn dùng thêm js, phần đó thì bạn tự tìm hiểu, hoặc mình có thể làm thêm 1 bài nữa có dùng Js vào một ngày "nào đó" :sunglasses:

Giờ thì, "đây, code đây"

```
.ring>.item-1 { transform: rotateY(0deg) translateZ(288px); }
.ring>.item-2 { transform: rotateY(40deg) translateZ(288px); }
.ring>.item-3 { transform: rotateY(80deg) translateZ(288px); }
.ring>.item-4 { transform: rotateY(120deg) translateZ(288px); }
.ring>.item-5 { transform: rotateY(160deg) translateZ(288px); }
.ring>.item-6 { transform: rotateY(200deg) translateZ(288px); }
.ring>.item-7 { transform: rotateY(240deg) translateZ(288px); }
.ring>.item-8 { transform: rotateY(280deg) translateZ(288px); }
.ring>.item-9 { transform: rotateY(320deg) translateZ(288px); }
```

Phần `rotateY` thì dễ hiểu rồi, cái cần chú ý là phần `translateZ`, nó không phải một số ngầu nhiên đâu nhé, có công thức tính cả đấy, phải chuẩn thì mới đẹp được :sunglasses:

Số `translateZ` là khoảng cách từ "trục" ra đến slide, sẽ được tính như vậy 

![](https://images.viblo.asia/7153a647-4f64-4569-a7bd-f4f65de3dc13.png)

![](https://images.viblo.asia/679083e2-7d15-4fea-89ce-9c1c07b1dafa.png)

Dựa vào công thức này, bạn có thể chỉnh sửa, thêm bớt slide thoả mái mà không sợ bị vỡ

###  Hoàn thành

Hết rồi đó, giờ chạy code là đẹp luôn rồi :laughing:

Code full:
```
<div id="slider">
  <div id="stage">
    <div id="shape" class="ring backfaces">
      <div class="plane item-1"> 1 </div>
      <div class="plane item-2"> 2 </div>
      <div class="plane item-3"> 3 </div>
      <div class="plane item-4"> 4 </div>
      <div class="plane item-5"> 5 </div>
      <div class="plane item-6"> 6 </div>
      <div class="plane item-7"> 7 </div>
      <div class="plane item-8"> 8 </div>
      <div class="plane item-9"> 9 </div>
    </div>
  </div>
</div>
<style>
#slider {
  background-color: black;
  background-image: -webkit-gradient(radial, 50% 300, 1, 50% 300, 400, from(rgba(255, 255, 255, 0.3)), to(rgba(255, 255, 255, 0)));
  width: 100%;
  padding: 50px 0;
  -webkit-perspective: 800px;
  -moz-perspective: 800px;
  -webkit-perspective-origin: 50% 100px;
  -moz-perspective-origin: 50% 100px;
}

#stage {
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  transform-style: preserve-3d;
  transform: translateZ(-200px);
}

#shape {
  position: relative;
  margin: 0 auto;
  height: 210px;
  width: 210px;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-animation: spin 9s infinite linear;
  -moz-animation: spin 9s infinite linear;
  -ms-animation: spin 9s infinite linear;
  animation: spin 9s infinite linear;
}

@-webkit-keyframes spin {
  from { transform: rotateY(0); }
  to { transform: rotateY(-360deg); }
}

.plane {
  position: absolute;
  height: 210px;
  width: 210px;
  border: 1px solid white;
  border-radius: 12px;
  text-align: center;
  font-size: 114pt;
  color: black;
  background-color: rgba(255, 255, 255, 0.6);
}

.ring>.item-1 { transform: rotateY(0deg) translateZ(288px); }
.ring>.item-2 { transform: rotateY(40deg) translateZ(288px); }
.ring>.item-3 { transform: rotateY(80deg) translateZ(288px); }
.ring>.item-4 { transform: rotateY(120deg) translateZ(288px); }
.ring>.item-5 { transform: rotateY(160deg) translateZ(288px); }
.ring>.item-6 { transform: rotateY(200deg) translateZ(288px); }
.ring>.item-7 { transform: rotateY(240deg) translateZ(288px); }
.ring>.item-8 { transform: rotateY(280deg) translateZ(288px); }
.ring>.item-9 { transform: rotateY(320deg) translateZ(288px); }
</style>
```

Chúc các bạn thành công!!