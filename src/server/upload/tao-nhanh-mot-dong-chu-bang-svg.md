{@embed: https://codepen.io/tuanvothanh/pen/QWpGEoZ}


-----

Đầu tiên, mình sẽ tạo một khung bao bằng thẻ svg như sau:

```html
<svg width='200' height='200' style='background: #B71C1C'></svg>
```
   ![](https://images.viblo.asia/2500ee10-7fb4-4677-9e44-6761b777d18c.png)
Sau đó, mình sẽ gõ nội dung hiện thị bên trong thẻ text, với tọa độ x = 50, y = 24 và kích cỡ chữ 24pt như bên dưới:

```html
<svg width='200' height='200' style='background: #B71C1C'>
  <text x='50' y='24' font-size='24pt'>I LOVE SVG</text>
</svg>
```
   ![](https://images.viblo.asia/18f1fc88-6ece-4c79-a2ef-fe6f5711fbce.png)
Mình sẽ xoay dòng chữ ở góc 45 độ và tùy chỉnh tọa độ để canh chữ vào chính giữa, thay đổi màu chữ như bên dưới:

```html
<svg width='200' height='200' style='background: #B71C1C'>
  <text x='50' y='18' font-size='24pt' transform='rotate(45)' fill='#FFD600'>I LOVE SVG</text>
</svg>
```
   ![](https://images.viblo.asia/f776c97c-ca82-434e-9a12-e9aac7a9f328.png)
Bây giờ, bạn có thể tạo một dòng chữ bằng SVG thật dễ dàng!

   Nguồn: www.naututs.com