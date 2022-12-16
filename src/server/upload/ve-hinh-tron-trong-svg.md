![](https://images.viblo.asia/989c472a-3b07-4a25-8e97-6dfb537bba82.png)

-----

Đầu tiên, mình sẽ tạo một khung bao bằng svg như sau:
```html
<svg width='300' height='200' style='background: cyan'></svg>
```
![](https://images.viblo.asia/2b6ce2c2-3cfa-4105-9ae7-3b92b08dbc6c.png)

Tiếp theo, mình sẽ tạo hình tròn bằng circle, với bán kính là 40px:
```html
<svg width='300' height='200' style='background: cyan'>
   <circle r='40' />
</svg>
```
![](https://images.viblo.asia/3acd8ec2-26ea-428a-a5ae-a7a08c1c00c6.png)
Hình tròn có mặc định màu đen ở góc trên bên trái và tâm đường tròn nằm tại điểm tọa độ x = 0, y = 0. Mình sẽ di chuyển hình vào vị trí trung tâm.
```html
<svg width='300' height='200' style='background: cyan'>
   <circle cx='150' cy='100' r='40' />
</svg>
```
![](https://images.viblo.asia/73485d9e-b73d-4944-9f68-dda374575782.png)
Cuối cùng, mình sẽ thêm một số thuộc tính màu nền, viền như bên dưới:
```html
<svg width='300' height='200' style='background: cyan'>
   <circle cx='150' cy='100' r='40' fill='blue' stroke='orange' stroke-width='4' fill-opacity='0.5'/>
</svg>
```
![](https://images.viblo.asia/373ea088-e2f9-4fb8-bf81-047b22dfdd1d.png)
Bây giờ, bạn có thể tạo một hình tròn bằng SVG thật dễ dàng!

Nguồn: www.naututs.com