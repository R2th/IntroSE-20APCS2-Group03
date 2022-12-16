![](https://images.viblo.asia/52253feb-bae0-437a-a6be-6e70d3d42fc5.png)

-----
Đầu tiên, mình sẽ tạo một khung bao bằng thẻ svg như sau:

```html
<svg width='200' height='200' style='background: cyan'></svg>
```
   ![](https://images.viblo.asia/afc2dd3f-8c9c-45ee-93e0-287dfa580892.png)


Tiếp theo, mình sẽ tạo hình đa giác bằng thẻ polygon, với điểm bắt đầu tại điểm x = 65, y = 50 và đi đến các điểm còn lại:

```html
<svg width='200' height='200' style='background: cyan'>
   <polygon points='65,50 135,70 150,150 50,150'/>
</svg>
```
   ![](https://images.viblo.asia/209a9d7f-021a-4e72-8c23-018ef3e038af.png)

    
Cuối cùng, mình sẽ thêm một số thuộc tính màu nền, viền như bên dưới:

```html
<svg width='200' height='200' style='background: cyan'>\
   <polygon points='65,50 135,70 150,150 50,150' fill='blue' stroke='orange' stroke-width='4'/>
</svg>
```
 ![](https://images.viblo.asia/b4aa6300-e082-421a-a7fb-fab90b79a9d9.png)
        Bây giờ, bạn có thể tạo một hình đa giác bằng SVG thật dễ dàng!
    

   Nguồn: www.naututs.com