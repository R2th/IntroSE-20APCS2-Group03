![](https://images.viblo.asia/976ed974-a9b1-4014-a836-a8f3e6ea718c.png)

-----

Đầu tiên, mình sẽ tạo một khung bao bằng thẻ <svg> như sau:
```html
<svg width='200' height='100' style='background: cyan'></svg>
```
  ![](https://images.viblo.asia/bdd1e6e1-ebd8-45c9-8776-c032e21ed01b.png)
Sau đó, mình sẽ vẽ các đoạn thẳng bằng thẻ <line/>, với điểm kết thúc của đoạn thẳng trước là điểm bắt đầu của đoạn thẳng tiếp theo:
```html
<svg width='200' height='100' style='background: cyan'>
   <line x1='10' y1='5' x2='50' y2='25' stroke='orange' stroke-width='4' stroke-linecap='round'/>
   <line x1='50' y1='25' x2='100' y2='25' stroke='orange' stroke-width='4' stroke-linecap='round'/>
   <line x1='100' y1='25' x2='150' y2='75' stroke='orange' stroke-width='4' stroke-linecap='round'/>
   <line x1='150' y1='75' x2='190' y2='75' stroke='orange' stroke-width='4' stroke-linecap='round'/>
</svg>
```
 ![](https://images.viblo.asia/56c6cf75-027f-4e53-9fc5-30b0fcbf2564.png)

Bây giờ, bạn có thể vẽ các đường kẻ gấp khúc bằng SVG thật dễ dàng!
    
*Lưu ý khi dùng thẻ line là ta cần gắn thuộc tính stroke để chúng có thể hiện thị ngay.*    
    
   Nguồn: www.naututs.com