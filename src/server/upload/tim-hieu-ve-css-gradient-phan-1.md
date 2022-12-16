Chào các bạn!

Bài viết hôm nay mình xin phép đi sâu vào vấn đề tìm hiểu CSS gradient. Cụm từ **gradient** này chắc cũng không lạ lẫm gì với các bạn nữa. Khi sử dụng gradient, bạn sẽ thấy được sự mượt mà khi giao thoa của 2 hoặc nhiều màu sắc. Lấy ví dụ như này:

![](https://images.viblo.asia/bd730320-5b43-432b-9b46-5d87a97e87c2.png)

CSS gradient có 2 kiểu hiển thị:

- **Linear Gradients (goes down/up/left/right/diagonally)**: Hiểu đơn giản là trải dài gradient. Hình ví dụ bên trên nhé.
- **Radial Gradients**: Gradient tập trung về 1 điểm trung tâm. Có thể hiểu như là radius ấy, nhìn sẽ như thế này:
![](https://images.viblo.asia/fd48119d-6d89-4af5-b65f-37912de9d556.png)

Bây giờ chúng ta đi tìm hiểu chi tiết vào từng kiểu nhé.

## 1. Linear Gradients

Như mình đã nói bên trên, để tạo được gradient, bạn phải có ít nhất là 2 màu trở nên, tức là phải xác định được ít nhất 2 điểm đầu và cuối của lớp gradient này.
Cấu trúc như sau:

```
background-image: linear-gradient(direction, color1, color2, ...);
```

**linear-gradient** có 4 hướng như sau:

- Từ trên xuống dưới (linear-gradient(to bottom, color1, color2,..))
- Từ dưới lên trên (linear-gradient(to top, color1, color2,..))
- Từ trái qua phải (linear-gradient(to right, color1, color2,..))
- Từ phải qua trái (linear-gradient(to left, color1, color2,..)) 

Ví dụ cho các bạn dễ hiểu nhé:

```HTML
<div id="grad1" class="gradient">Top to Bottom</div>

<div id="grad2" class="gradient">Bottom to Top</div>

<div id="grad3" class="gradient">Left to Right</div>

<div id="grad4" class="gradient">Right to Left</div>

```

```CSS
.gradient {
  height: 200px;
  line-height: 200px;
  width: 300px;
  font-size: 30px;
  text-align: center;
  display: inline-block;
}

#grad1 {
  background-color: red; /* For browsers that do not support gradients */
  background-image: linear-gradient(red, yellow);
}

#grad2 {
  background-color: red; /* For browsers that do not support gradients */
  background-image: linear-gradient(to top, red , yellow);
}

#grad3 {
  background-color: red; /* For browsers that do not support gradients */
  background-image: linear-gradient(to right, red , yellow);
}

#grad4 {
  background-color: red; /* For browsers that do not support gradients */
  background-image: linear-gradient(to left, red , yellow);
}
```

![](https://images.viblo.asia/4c855547-8ca8-454a-933b-128f2873d5b1.png)

Giải thích 1 chút là tại sao chúng ta lại gọi thuộc tính **background-color: red;** là để hiển thị background-color cho những trình duyệt không hỗ trợ CSS3 hoặc không hỗ trợ gradient.

Ngoài 4 kiểu cơ bản này, gradient còn có thêm 1 kiểu gọi kép nữa.

```CSS
#grad1 {
  background-color: red; /* For browsers that do not support gradients */
  background-image: linear-gradient(to bottom right, red, yellow);
}
```

![](https://images.viblo.asia/dadf10de-f4e8-4535-891a-363da9b1fc20.png)

### Angles

1 vấn đề khác, nếu như các bạn muốn thay đổi hướng đi của gradient, bạn hãy sử dụng **Angles**.
Mình sẽ define cụ thể với 4 hướng cơ bản bên trên nhé:

- Top to Bottom: 

```CSS
background-image: linear-gradient(180deg, red, yellow);
```

- Left to Right:
```CSS
background-image: linear-gradient(90deg, red, yellow);
```

- Bottom to Top:
```CSS
background-image: linear-gradient(0deg, red, yellow);
```

- Right to Left:
```CSS
background-image: linear-gradient(-90deg, red, yellow);
```

Hình demo thì các bạn xem tạm bên trên nhé :D

### Mutiple color stops

**Mutiple color stops** nôm na là điểm dừng của một màu trong một đống màu mà chúng ta đã cho và từ đó nó sẽ bắt đầu chuyển hóa thành màu khác bằng việc đặt % (tức khoảng muốn kết thúc vào cuối màu đó, như thế này:

```
background: linear-gradient(color %stop, color %stop, color %stop,...);
```

Lấy ví dụ: Đây là trường hợp các màu không set % hiển thị, tức là chúng sẽ được chia đều % cho nhau:

![](https://images.viblo.asia/6aea37fb-7fb8-4bf0-8b1a-eddc07d12ed8.png)

Còn dưới đây là trường hợp set % cho từng màu.

```
background:linear-gradient(to right,red 60%, yellow 70%, blue 90%);
```

![](https://images.viblo.asia/eaf5b689-5773-4926-90fb-33a6d3bf938c.png)

Đã thấy rõ sự chênh lệch ở đây rồi nhé.

### Transparency

Các bạn chắc cũng không lạ gì với **transparent** nữa rồi nhỉ. Hiểu nôm na, **transparent** là chỉ số trong suốt của màu sắc. **Transparent** càng giảm dần về 0 thì độ trong suốt càng cao, cái này chắc không cần giải thích nhiều nữa rồi nhỉ.

Với gradient, tất nhiên nó cũng support transparent. Khi thêm transparent, chắc chắn là chúng ta cần sử dụng **rgba()** để define độ trong suốt cho các color stops. Ví dụ cho trực quan nhé:

```HTML
#grad {
  background-image: linear-gradient(to right, rgba(255, 0, 0, 0), rgba(255, 0, 0, 1));
}
```

![](https://images.viblo.asia/f69571cc-0e26-412a-98f3-6a0f38d8f696.png)

### Repeating a linear-gradient

Hiểu đơn giản là gradient được lặp đi lặp lại cho tới khi hết không gian thì thôi.

```CSS
#grad {
  background-image: repeating-linear-gradient(red, yellow 10%, green 20%);
}
```

![](https://images.viblo.asia/85ae0dcb-2f20-4fa0-a650-b3207d5a733d.png)

Okie, xấu muốn mù con mắt luôn.

Và chúng ta thử kết hợp với Angles bên trên xem sao nhé.

- Repeat gradient 45 độ, bắt đầu là red và kết thúc là green.

```CSS
#grad {
  height: 200px;
  background-color: red; /* For browsers that do not support gradients */
  background-image: repeating-linear-gradient(45deg,red,yellow 7%,green 10%);
}
```

![](https://images.viblo.asia/1bb4f473-8dde-46b5-98dd-0e96ca3d657b.png)

- Repeat gradient 190 độ, bắt đầu là red và kết thúc là green.

```CSS
#grad {
  height: 200px;
  background-color: red; /* For browsers that do not support gradients */
  background-image: repeating-linear-gradient(190deg,red,yellow 7%,green 10%);
}
```

![](https://images.viblo.asia/22080df8-80c6-4fc3-91b0-a7b231f65256.png)


- Repeat gradient 90 độ, bắt đầu là red và kết thúc là green.

```
#grad {
  height: 200px;
  background-color: red; /* For browsers that do not support gradients */
  background-image: repeating-linear-gradient(90deg,red,yellow 7%,green 10%);
}
```

![](https://images.viblo.asia/18a0bd7d-d89b-4dae-8976-3ea6f578d60b.png)

Quả thực cũng không đẹp đẽ gì cho cam. Nhưng thôi cứ để tạm.

Gradient còn 1 kiểu hiển thị nữa là **Radial Gradients** nhưng mà bài này dài quá rồi, thôi để bài sau mình sẽ giới thiệu về  **Radial Gradients** nhé.

Link tham khảo: https://www.w3schools.com/css/css3_gradients.asp