{@embed: https://codepen.io/tuanvothanh/pen/vYxypoz}

-----

Đầu tiên, mình sẽ tạo một khung bao bằng thẻ svg như sau:

```html
<svg width="200" height="200" style="background: #B71C1C"></svg>
```
   ![](https://images.viblo.asia/2d5a2d63-9427-4a09-a58b-7db60a8228f5.png)
    
Sau đó, mình sẽ tạo các đường kẻ bằng thẻ path, lưu ý là M xuất hiện ở tọa độ điểm đầu tiên:

```html
<svg width="200" height="200" style="background: #B71C1C">
   <path stroke='white' d='M20,20 180,20'/>
   <path stroke='white' stroke-width='2' d='M20,40 180,40'/>
   <path stroke='white' stroke-width='3' d='M20,60 180,60'/>
</svg>
```
![](https://images.viblo.asia/715fabdb-c982-488e-b341-fc792e37c5c8.png)
Tiếp theo, mình sẽ tạo thêm một số kiểu đường kẻ khác nhau:
+ 3 dòng kẻ đầu: ở thuộc tính stroke-width (thay đổi độ dày của đường kẻ)
+ 3 dòng kẻ giữa: ở thuộc tính stroke-linecap (thay đổi kiểu kết thúc tại 2 đầu đường kẻ của đường kẻ)
+ 3 dòng kẻ cuối: ở thuộc tính stroke-dasharry (thay đổi kiểu đứt nét của đường kẻ)

```html
<svg width="200" height="200" style="background: #B71C1C">
   <path stroke="white" d="M20,20 180,20"></path>
   <path stroke="white" stroke-width="2" d="M20,40 180,40"></path>
   <path stroke="white" stroke-width="3" d="M20,60 180,60"></path>
    
   <path stroke="white" stroke-width="8" stroke-linecap="butt" d="M20,80 180,80"></path>
   <path stroke="white" stroke-width="8" stroke-linecap="square" d="M20,100 180,100"></path>
   <path stroke="white" stroke-width="8" stroke-linecap="round" d="M20,120 180,120"></path>
    
   <path stroke="white" stroke-width="3" stroke-dasharray="5,5" d="M20,140 180,140"></path>
   <path stroke="white" stroke-width="3" stroke-dasharray="10,10" d="M20,160 180,160"></path>
   <path stroke="white" stroke-width="3" stroke-dasharray="20,10,5,5,5,10" d="M20,180 180,180"></path>
</svg>
```
![](https://images.viblo.asia/98c4aa4e-5485-4fcd-b341-56ae0a3fb178.png)

Bây giờ, bạn có thể tạo ra nhiều kiểu đường kẻ bằng SVG thật dễ dàng!

Nguồn: www.naututs.com