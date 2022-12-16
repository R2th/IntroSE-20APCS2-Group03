# Tại sao nên sử dụng thuộc tính CSS box-shadow
Sự chú ý đến các chi tiết nhỏ sẽ phân tách một trang web tốt với một trang web có giao diện đẹp. Nếu bạn muốn thêm những chi tiết nhỏ đó vào trang web của mình, bạn chắc chắn nên sử dụng thuộc tính này cùng với nhiều thuộc tính khác.
![](https://images.viblo.asia/b0d1d93e-bc17-4f10-b6a4-22aac899949f.PNG)
Hãy chú ý đến các thành phần nút trong hình trên. Bạn sẽ thấy rằng chúng tôi có một số bóng đổ. ☝

**Trước khi chưa sử dụng thuộc tính CSS box-shadow**
![](https://images.viblo.asia/ecb33f2b-dac3-4acd-9b3a-842891eca365.PNG)

**Sau khi sử dụng thuộc tính CSS box-shadow**
![](https://images.viblo.asia/bd093544-5ae1-4190-94a8-0d48a0936664.PNG)

Sau khi sử dụng thuộc tính CSS box-shadow, chúng ta thấy nút `Login` và `Sign up` nhìn đẹp mắt hơn.

Ở đây, mình sử dụng hiệu ứng đổ bóng. Bạn có thể xem cách mình triển khai đoạn code nhé 👇
# CSS box-shadow
### HTML
```
<div class="box-1"> A Button </div>
```
### CSS
```
*{
   margin: 0px;
   padding: 0px;
   box-sizing: border-box;
   font-family: sans-serif;
}
```
Bây giờ, bắt đầu css cho class `box-1` 👇
```
.box-1{
   margin: 100px 0 0 100px;
   height: 80px;
   width: 200px;
   border: 2px solid black;
   border-radius: 8px;
   font-size: 40px;
   display: grid;
   place-content: center;
}
```
![](https://images.viblo.asia/577328d6-2ed6-4a0c-9ea5-ce857610f9eb.PNG)
## Cú pháp của thuộc tính box-shadow
![](https://images.viblo.asia/ee87c3d1-45e0-4ba1-a2a1-dabf7817b67d.PNG)
### Tất cả các thuộc tính box-shadow
Đây là cú pháp cho thuộc tính `box-shadow` 👇
```
box-shadow: offset-x | offset-y | blur-radius | spread-radius | color ;
```
Chúng ta hãy xem xét từng phần chi tiết hơn.
## Cách sử dụng Offset-x trong thuộc tính box-shadow
Bạn sẽ sử dụng thuộc tính `offset-x` để di chuyển bóng sang trái và phải dọc theo `trục X`.

![](https://images.viblo.asia/687276af-a7a4-482f-a458-e509a555ae41.gif)
### Chúng ta có thể di chuyển bóng sang trái và phải
```
/* offset-x | offset-y | color */
.box-1{
   box-shadow: -50px 0px rgba(0,0,0,0.5);
}

/* Hoặc có thể là */

.box-1{
   box-shadow: 50px 0px rgba(0,0,0,0.5);
}
```
## Cách sử dụng Offset-y trong thuộc tính box-shadow
Bạn sẽ sử dụng thuộc tính `offset-y` để di chuyển bóng lên và xuống dọc theo` trục Y`.

![](https://images.viblo.asia/9814b157-152f-4407-993e-2ab6c21203da.gif)
### Chúng ta có thể di chuyển bóng đổ lên trên và dưới cùng
```
/* offset-x | offset-y | color */
.box-1{
   box-shadow: 0px -50px rgba(0,0,0,0.5);
}

/* Hoặc có thể là */

.box-1{
   box-shadow: 0px -50px rgba(0,0,0,0.5);
}
```
## Cách kết hợp cả offset-x và offset-y
Ném đoạn mã sau vào CSS của bạn 👇
```
.box-1{
   box-shadow: 10px 10px rgba(0,0,0,0.5);
}
```
Đây là kết quả với bóng hộp hiển thị ở bên phải và dưới cùng của nút 👇
![](https://images.viblo.asia/3d12c06d-c000-4c3e-8608-10f3a1ff5f7f.PNG)
## Cách sử dụng blur-radius trong Thuộc tính box-shadow
Thuộc tính `blur-radius` sẽ làm mờ màu xung quanh của nút, nhìn trông nó như thế này 👇

![](https://images.viblo.asia/a0423ec9-0bab-4f34-aa8f-abffe7bdec81.gif)
### Thử nghiệm với blur-radius
```
/* offset-x | offset-y | blur-radius | color */

.box-1{
   box-shadow: 0 0 50px rgba(0,0,0,0.8);
}
```
## Cách sử dụng spread-radius trong Thuộc tính box-shadow
Giá trị này trải bóng xung quanh nút, trông nó như thế này 👇

![](https://images.viblo.asia/b2f3a923-dbe4-4742-86c6-bfb82f281be5.gif)
### Thử nghiệm spread-radius
```
/* offset-x | offset-y | blur-radius | spread-radius | color */

.box-1{
   box-shadow: 0 0 0 50px rgba(0,0,0,0.5);
}
```
## Cách thêm bóng đổ vào nút
Tập hợp những gì chúng ta đã học được và thêm hiệu ứng đổ bóng vào nút 👇
```
.box-1{
   box-shadow: 8px 10px 10px 1px rgba(0,0,0,0.5);
}
```
Kết quả như sau: 👇
![](https://images.viblo.asia/a426e7f9-037f-410a-8fee-eebdeef9a30a.PNG)
## Inset trong Thuộc tính box-shadow CSS là gì?
Có một từ khóa có tên là `inset` mà bạn có thể sử dụng với thuộc tính `box-shadow`, thay vì độ bóng đổ ra bên ngoài thì ở đây, chúng lại đổ bên trong.

Chúng ta cùng xem cách sử dụng `insert` nhé 👇
```
.box-1{
   box-shadow: inset 8px 10px 10px 1px rgba(0,0,0,0.5);
}
```
Đây là kết quả: 👇
![](https://images.viblo.asia/d71baec1-fe22-4251-a747-f370b9f938c9.PNG)
## Xem thêm
* [GetCssScan](https://getcssscan.com/css-box-shadow-examples) - Thuộc tính `box-shadow` có sẵn.
* [keyframes.app](https://keyframes.app/animate/) - Trực tiếp thiết kế với các thuộc tính cho riêng bạn.
* [flatuicolors](https://flatuicolors.com/) - Bảng màu đẹp.

Giờ đây, bạn có thể tự tin sử dụng thuộc tính `box-shadow` để thêm không chỉ các bóng đổ mà còn để tăng thêm sự chú ý đến từng chi tiết cho các dự án của bạn.