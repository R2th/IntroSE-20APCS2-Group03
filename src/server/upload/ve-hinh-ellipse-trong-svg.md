![](https://images.viblo.asia/da39244d-274d-4730-a5d6-04837738b9a8.png)

-----

Đầu tiên, mình sẽ tạo một khung bao bằng svg như sau:

```html
<svg width='300' height='200' style='background: cyan'></svg>
```
![](https://images.viblo.asia/2b6ce2c2-3cfa-4105-9ae7-3b92b08dbc6c.png)

Tiếp theo, mình sẽ tạo hình ellipse với bán kính trục tung là 40px và bán kính trục hoành là 80px:
```html
<svg width='300' height='200' style='background: cyan'>
   <ellipse rx='80' ry='40' />
</svg>
```
![](https://images.viblo.asia/75471395-7f76-48cc-b446-1502d71fea79.png)

Hình ellipse có mặc định màu đen ở góc trên bên trái và tâm đường ellipse nằm tại điểm tọa độ x = 0, y = 0. Mình sẽ di chuyển hình vào vị trí trung tâm.
```html
<svg width='300' height='200' style='background: cyan'>
   <ellipse cx='150' cy='100' rx='80' ry='40' />
</svg>
```
![](https://images.viblo.asia/08f6fd13-f69b-4b3f-b5da-6d09ede042eb.png)
Cuối cùng, mình sẽ thêm một số thuộc tính màu nền, viền như bên dưới:
```html
<svg width='300' height='200' style='background: cyan'>
   <ellipse cx='150' cy='100' rx='80' ry='40' fill='blue' stroke='orange' stroke-width='4' fill-opacity='0.5' />
</svg>
```
Bây giờ, bạn có thể tạo một hình ellipse bằng SVG thật dễ dàng!

Nguồn: www.naututs.com