{@embed: https://codepen.io/tuanvothanh/pen/ExWWXqM}

-----
Đầu tiên, mình sẽ tạo một khung bao bằng thẻ <svg> như sau:

```html
<svg width="300" height="200" style="background: cyan"></svg>
```
![](https://images.viblo.asia/bcb15d63-cb27-4a60-b548-0f9efada66e8.png)
Sau đó, mình sẽ tạo hình oval bằng thẻ <ellipse/> và di chuyển hình đến vị trí trung tâm:

```html
<svg width="300" height="200" style="background: cyan">
   <ellipse cx='150' cy='100' rx='100' ry='50'/>
</svg>
```
![](https://images.viblo.asia/e082c64b-e363-4402-b6e8-fb9f6dcf7aea.png)
Tiếp theo, mình sẽ tạo hiệu ứng Linear Gradient bằng thẻ <linearGradient/>. Từ thẻ <ellipse/> mình sẽ thêm thuộc tính [ fill=’url(#id)’ ] liên kết với thẻ <linearGradient/>:

```html
<svg width="300" height="200" style="background: cyan">
   <linearGradient id='grad1'>
      <stop offSet='0%' stop-color='#FF6D00'/>
      <stop offSet='100%' stop-color='#B71C1C'/>
   </linearGradient>
   <ellipse cx="150" cy="100" rx="100" ry="50" fill='url(#grad1)'></ellipse>
</svg>
```
   ![](https://images.viblo.asia/2ae847fc-65a4-4b42-8b3a-6ad159fc7538.png)
Bây giờ, bạn có thể tạo ra hiệu ứng chuyển màu linear trong SVG thật dễ dàng!

Nguồn: www.naututs.com