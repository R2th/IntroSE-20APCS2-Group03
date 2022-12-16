![](https://images.viblo.asia/3017c13f-2bcf-4571-8eb3-8bc1cc211cb1.png)


-----


Đầu tiên, mình sẽ tạo một khung bao bằng svg như sau:
```html
<svg width='300' height='200' style='background: cyan'></svg>
```
![](https://images.viblo.asia/9dc6a7aa-ec63-4496-8f95-2292f0fd2fee.png)

Tiếp theo, mình sẽ tạo hình chữ nhật bằng rect, với chiều rộng 200px, chiều cao 100px:
```html
<svg width='300' height='200' style='background: cyan'>
   <rect width='200' height='100' />
</svg>
```
![](https://images.viblo.asia/da0911c0-56de-45bc-91b5-2bd682e291bc.png)

Hình chữ nhật có mặc định màu đen ở góc trên bên trái, bắt đầu tại điểm tọa độ x = 0, y = 0. Mình sẽ di chuyển hình vào vị trí trung tâm.
```html
<svg width='300' height='200' style='background: cyan'>
   <rect x='50' y='50' width='200' height='100' />
</svg>
```
![](https://images.viblo.asia/1fd9c397-43be-410d-84d1-8c137ca0c4f8.png)

Cuối cùng, mình sẽ thêm một số thuộc tính màu nền và viền như bên dưới:
```html
<svg width="300" height="200" style="background: cyan">
   <rect x="50" y="50" width="200" height="100" fill="blue" stroke="orange" stroke-width="4" fill-opacity='0.5'></rect>
</svg>
```
![](https://images.viblo.asia/76186e0c-4c42-4186-a4a9-0aa247bd35b1.png)

Bây giờ, bạn có thể tạo một hình chữ nhật bằng SVG thật dễ dàng!

Nguồn: www.naututs.com