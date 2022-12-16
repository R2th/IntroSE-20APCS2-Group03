{@embed: https://codepen.io/tuanvothanh/pen/oNZBOQW}

-----

Đầu tiên, mình sẽ tạo một khung bao bằng thẻ <svg> như sau:

```html
<svg width="400" height="200" style="background: #00A389"></svg>
```
   ![](https://images.viblo.asia/217477eb-e384-4def-92c1-6c49be665b38.png)

Sau đó, mình sẽ tạo hình chữ bằng thẻ <rect/> và di chuyển hình đến vị trí trung tâm:
    
```html
<svg width="400" height="200" style="background: #00A389">
  <rect x='100' y='50' width='200' height='100' fill='#FFD600'/>
</svg>
```
   ![](https://images.viblo.asia/9b844fb8-1ad3-46ba-a172-a441b12f2092.png)
Tiếp theo, mình sẽ tạo hiệu ứng GaussianBlur bằng thẻ <feGaussianBlur/>, đặt bên trong thẻ <filter>. Từ thẻ <rect/> mình sẽ liên kết với với thẻ <filter> thông qua thuộc tính [ filter=’url(#id)’ ].
Bạn có thể tăng giảm độ nhòe đối tượng từ thuộc tính stdDeviation, ở đây mình sẽ để là 10.
    
```html
<svg width="400" height="200" style="background: #00A389">
  <filter id='f1'>
    <feGaussianBlur stdDeviation='10'/>
  </filter>
  <rect x="100" y="50" width="200" height="100" fill="#FFD600" filter='url(#f1)'/>
</svg>
```
   ![](https://images.viblo.asia/eb87b116-2b13-4275-bece-db01ff9e02ab.png)
Bây giờ, bạn có thể tạo ra hiệu ứng làm nhòe bằng SVG Filter thật dễ dàng!

Nguồn: www.naututs.com