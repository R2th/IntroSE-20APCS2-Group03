# I. Border-Radius Property
Thuộc tính (property) `border-radius` là một khái niệm quan trọng cần hiểu trước khi chúng ta thực hiện styling bất cứ figures nào trong CSS. Nó cho phép làm cong các góc phần tư của phần tử HTML. Đường cong của các góc được định nghĩa bởi một hoặc hai bán kính dựa trên hình tròn hoặc ellipse. Bán kính được mở rộng ra toàn bộ brackground thậm chí ngay cả khi phần tử không đấy không có border. 

`border-radius` property cho phép làm cong tất cả các góc của một phần tử. Nếu chúng ta set cho thuộc tính đấy 2 giá trị thì giá trị thứ nhất sẽ  áp dụng cho góc trên bên trái và phải, giá trị thứ 2 sẽ được áp dụng cho các góc bên dưới còn lại. Một số đơn vị thường được sử dụng đó là `px, em, %`. 

Nếu bạn muốn định nghĩa độ cong của tất cả các góc một cách riêng lẻ có thể sử dụng các properties sau` border-top-left-radius, border-top-right-radius, border-bottom-left-radius, border-bottom-right-radius`. 

Các giá trị được phân cách bởi kí tự (/) định nghĩa cho bán kính theo chiều dọc và ngang. 

Để có thể dễ dàng hình dung hơn hãy cùng xem các ví dụ dưới đây nhé: 
![](https://images.viblo.asia/82039feb-26b8-4bff-870d-b41cb6f94eaa.png)
```
.shape1 { border-radius: 15px; }
.shape2 { border-top-left-radius: 15px; }
.shape3 { border-top-right-radius: 15px; }
.shape4 { border-bottom-left-radius: 15px; }
.shape5 { border-bottom-right-radius: 15px; }
.shape6 { border-radius: 0 0 15px 15px; }
.shape7 { border-radius: 15px 15px 0 0; }
.shape8 { border-radius: 0 10px 20px; }
.shape9 { border-radius: 10px 20px; }
.shape10 { border-radius: 10px/20px; }
.shape11 { border-radius: 5px 10px 15px 30px/30px 15px 10px 5px; }
.shape12 { border-radius: 10px 20px 30px 40px/30px; }

.shape {
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 5px solid #32557f;
}

```
Đây là một số website để bạn có thể tự custom border của mình: https://codepen.io/chriscoyier/pen/owBwKM,  https://9elements.github.io/fancy-border-radius/

# II. Circle
Hình tròn là một hình đơn giản nhất có thể định nghĩa bằng CSS bằng cách cho các giá trị width và height giống nhau, cùng xem demo dưới đây nhé: 
```
.circle {
  background: #32557f;
  width: 200px;
  height: 200px;
  border-radius: 50%; 
}
```
![](https://images.viblo.asia/29a25448-4a52-4576-b9c9-3f9782b2a5e0.png)

# III. Ovals/Ellipses
Hình bầu dục (hay còn gọi là hình ellipse trong toán học) được định nghĩa khá giống với hình tròn, điểm khác biệt duy nhất đó là sự khác nhau giữa 2 thuộc tính width và height
```
.ellipse {
  background: #32557f;
  width: 200px;
  height: 100px;
  border-radius: 50%;
}
```
![](https://images.viblo.asia/077fb72e-55ef-4619-bb6e-a15d1a75dd63.png)
# IV. Half-Ellipses
Để thiết hình nửa bầu dục, chúng ta cần dùng đến ký tự slash (/) để định nghĩa các bán kính dọc và ngang. Nếu như ta set giá trị 50% trước kí tự (/) chúng ta sẽ thu được một nửa hình bầu dục dọc hay hình bầu dục ngang trong ngược hợp ngược lại. 
```
.half-ellipse1 { border-radius: 50% / 100% 100% 0 0; }
.half-ellipse2 { border-radius: 50% / 0 0 100% 100%; }
.half-ellipse3 { border-radius: 100% 0 0 100% / 50%; }
.half-ellipse4 { border-radius: 0 100% 100% 0 / 50%; }

.half-ellipse {
  background: #32557f;
  width: 150px;
  height: 75px;
}
```
![](https://images.viblo.asia/f3dd0f5a-619c-4303-b500-927f8e3e81a9.png)

# V. Triangles 
Các css triangles là rất hữu ích để tạo các arrows có thể thấy ở select element hay trong các buttons. 
Để tạo một tam giác, ta có thể tạo một box với width và height đều bằng 0 
```
.triangle {
  width: 0;
  height: 0;
}
```
Giá trị width và height được xác định bởi width của border. Với up arrow, bottom border sẽ được tô màu trong khi các góc bên trái và phải là trong suốt. 
```
.triangle .triangle-up {
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid #32557f;
}

.triangle .triangle-down {
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 100px solid #32557f;
}

.triangle .triangle-left {
  border-top: 50px solid transparent;
  border-right: 100px solid #32557f;
  border-bottom: 50px solid transparent;
}

.triangle .triangle-right {
  border-top: 50px solid transparent;
  border-left: 100px solid #32557f;
  border-bottom: 50px solid transparent;
}
```
![](https://images.viblo.asia/3a4e3844-97aa-4ff8-8f0c-cc0f1cc88ba0.png)
Tương tự ta có thể ta có thể thiết kế các hình tam giác khác nhau bằng các làm trong suốt một trong số các góc còn lại 
```
.triangle .triangle-top-left {
  border-top: 100px solid #32557f;
  border-right: 100px solid transparent;
}

.triangle .triangle-top-right {
  border-top: 100px solid #32557f;
  border-left: 100px solid transparent;
}

.triangle .triangle-bottom-left {
  border-bottom: 100px solid #32557f;
  border-right: 100px solid transparent;
}

.triangle .triangle-bottom-right {
  border-bottom: 100px solid #32557f;
  border-left: 100px solid transparent;
}

```
![](https://images.viblo.asia/714aba60-0d27-4ff7-8593-3497a7b52dba.png)

Trên đây mình đã giới thiệu một số cách để thiết kế hình với css, chúc mọi người một ngày làm việc vui vẻ!

Tham khảo: [CSS Shapes](https://dev.to/sharkcoder/css-shapes-244j)