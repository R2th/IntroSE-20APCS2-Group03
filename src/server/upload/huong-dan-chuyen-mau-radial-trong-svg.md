{@embed: https://codepen.io/tuanvothanh/pen/gOmmxLW}

-----
Đầu tiên, mình sẽ tạo một khung bao bằng thẻ <svg> như sau:


![](https://images.viblo.asia/8a81b3f1-e671-44a6-b397-adbddf14cecf.png)
```html
<svg width="300" height="200" style="background: cyan"></svg>
```
Sau đó, mình sẽ tạo hình oval bằng thẻ <ellipse/> và di chuyển hình đến vị trí trung tâm:

![](https://images.viblo.asia/4a495d69-3a1d-47a8-aab4-9bc86ea386fc.png)
```html
<svg width="300" height="200" style="background: cyan">
  <ellipse cx='150' cy='100' rx='100' ry='50'/>
</svg>
```
Tiếp theo, mình sẽ tạo hiệu ứng Radial Gradient bằng thẻ linearGradient. Từ thẻ ellipse mình sẽ thêm thuộc tính [ fill=’url(#id)’ ] liên kết với thẻ linearGradient:
    ![](https://images.viblo.asia/554a185c-a4c4-440f-9ed9-ac3d37bb33ed.png)
```html
<svg width="300" height="200" style="background: cyan">
  <radialGradient id='grad1'>
    <stop offSet='0%' stop-color='lime'/>
    <stop offSet='100%' stop-color='green'/>
  </radialGradient>
  <ellipse cx='150' cy='100' rx='100' ry='50' fill='url(#grad1)'/>
</svg>
```
Bây giờ, bạn có thể tạo ra hiệu ứng chuyển màu radial trong SVG thật dễ dàng!

Nguồn: www.naututs.com