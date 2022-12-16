![](https://images.viblo.asia/709e9529-63af-4423-b5ed-f632d4abc5db.png)


-----

Đầu tiên, mình sẽ tạo một khung bao bằng thẻ svg như sau:

```html
<svg width='300' height='200' style='background: #B71C1C'></svg>
```
   ![](https://images.viblo.asia/15ab17e1-f058-4a8f-bd7a-e8fb81c44615.png)
    
   Tiếp theo, mình sẽ tạo hình ngôi sao bằng thẻ polygon, tại điểm bắt đầu là x = 150, y = 30:

```html
<svg width='300' height='200' style='background: #B71C1C'>
   <polygon points='150,30 105,165' stroke='#FFD600'/>
</svg>
```
![](https://images.viblo.asia/c7202de9-1007-4222-92a2-adfab4f100b3.png)
```html
<svg width='300' height='200' style='background: #B71C1C'>
   <polygon points='150,30 105,165 215,80' stroke='#FFD600'/>
</svg>
```
![](https://images.viblo.asia/76fae380-1560-480f-9230-775789cc1d78.png)
```html
<svg width='300' height='200' style='background: #B71C1C'>
   <polygon points='150,30 105,165 215,80 85,80' stroke='#FFD600'/>
</svg>
```
![](https://images.viblo.asia/fdf9d068-a075-4e0d-9fd6-e7037be4b2fd.png)
```html
<svg width='300' height='200' style='background: #B71C1C'>
   <polygon points='150,30 105,165 215,80 85,80 195,165' stroke='#FFD600'/>
</svg>
```
![](https://images.viblo.asia/5e79d62d-3f6d-49fb-af31-64ab583aa803.png)
Cuối cùng, mình sẽ thay đổi màu nền của ngôi sao:

```html
<svg width='300' height='200' style='background: #B71C1C'>
   <polygon points='150,30 105,165 215,80 85,80 195,165' fill='#FFD600'/>
</svg>
```
![](https://images.viblo.asia/270cefa7-cd74-44eb-8629-97903922dd7a.png)
Bây giờ, bạn có thể tạo một hình ngôi sao bằng SVG thật dễ dàng!

Nguồn: www.naututs.com