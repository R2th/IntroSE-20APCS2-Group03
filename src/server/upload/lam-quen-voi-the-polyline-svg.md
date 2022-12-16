{@embed: https://codepen.io/tuanvothanh/pen/vYxXdBb}


-----

Khác SVG Polygon sẽ nối tất cả các điểm thành một vòng khép kín. SVG Polyline sẽ không nối điểm đầu và điểm cuối.

Đầu tiên, mình sẽ tạo một khung bao bằng thẻ svg như sau:

```html
<svg width='200' height='200' style='background: #B71C1C'></svg>
```
![](https://images.viblo.asia/1dc9a552-2d50-4012-9c52-26fdde8eea6d.png)
Sau đó, mình sẽ vẽ các đoạn thẳng bằng thẻ polyline, với tọa độ bắt đầu là x=20, y=20, bằng cách tạo ra các điểm khác nhau trên hành trình. Lưu ý rằng x dương hướng sang phải, y dương hướng xuống dưới.
```html 
<svg width='200' height='200' style='background: #B71C1C'>
   <polyline points='20,20 180,20 180,180 20,180 20,40 160,40 160,160 40,160 40,60 140,60 140,140 60,140 60,80 120,80 120,120 80,120 80,100 100,100' fill='none' stroke='white'/>
</svg>
```
![](https://images.viblo.asia/cf45bc34-785b-4b30-9c7a-4552d0aa8d14.png)
Cuối cùng, mình sẽ thay đổi màu và độ dày của đường viền như bên dưới:

```html
<svg width='200' height='200' style='background: #B71C1C'>
   <polyline points='20,20 180,20 180,180 20,180 20,40 160,40 160,160 40,160 40,60 140,60 140,140 60,140 60,80 120,80 120,120 80,120 80,100 100,100' fill='none' stroke='#FFD600' stroke-width='4'/>
</svg>
```
![](https://images.viblo.asia/6abd6764-e824-41ac-8477-755417b6f6c2.png)
Bây giờ, bạn có thể vẽ các đường kẻ gấp khúc bằng SVG Polyline thật dễ dàng!

Nguồn: www.naututs.com