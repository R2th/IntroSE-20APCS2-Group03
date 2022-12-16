### I. Giới thiệu
Nếu bạn là một người giỏi hình học không gian thì sẽ dễ hiểu về z-index này. Cụ thể index gồm 3 tọa độ là x, y, z. Với x, y là tọa độ mặt phẳng, có thể nói nó là width và height trong css. z là trục không gian để tạo ra cấu trúc 3D. Hình dưới là của smashingmagazine sẽ giúp bạn hiểu rõ hơn:
![](https://images.viblo.asia/f5ab668e-f89c-4439-8f68-d285c1ab4308.PNG)
z-index giúp các element chồng lên nhau theo cách mà mình muốn hiển thị.
### II. Định nghĩa
* Thuộc tính z-index thiết lập thứ tự xếp chồng nhau của một thành phần vị trí. Thứ tự chồng nhau được sắp xếp dựa theo giá trị số, thành phần HTML nào có chỉ số z-index cao hơn sẽ nằm trên, ngược lại sẽ nằm dưới, giá trị mặc định là 0, có thể sử dụng số âm. Giá trị tốt nhất là không sử dụng đơn vị.
* Chú ý: z-index chỉ làm việc cùng với thuộc tính position.
### III. z-index và position
Bây giờ mình sẽ tạo 3 block là green, red và blue đều thuộc một div có class là colors. 3 block này sẽ nằm cùng một mặt phẳng, ta có thể nói hiện tại nó nằm trên cùng một viewport của màn hình
```
<div class="colors">
  <div class="red">
    <span>Red</span>
  </div>
  <div class="green">
    <span>Green</span>
  </div>
  <div class="blue">
    <span>Blue</span>
  </div>
</div>
```
```
.colors {
  margin-left: 40px;
  margin-top: 40px;
}
.red, .green, .blue {
  width: 100px;
  height: 100px;
  color: white;
  line-height: 100px;
  text-align: center;
}
.red {
  background: red;
}
.green {
  margin-top: -40px;
  margin-left: 60px;
  background: green;
}
.blue {
  margin-top: -40px;
  margin-left: 120px;
  background: blue;
}
```
![](https://images.viblo.asia/84f2552e-ef65-477c-bc93-078ff0b8562d.PNG)
* Ta thêm thuộc tính z-index vào 3 block tương ứng, red là 3, green là 2 và blue là 1 để cho red nổi lên đầu tới green và cuối cùng là blue
```
.red {
  z-index: 3;
}
.green {
  z-index: 2;
}
.blue {
  z-index: 1;
}
```
* OOP! Không có gì thay đổi cả? Tất nhiên vì chúng ta đang thiếu thuộc tính position
* Chú ý! chỉ có 3 giá trị của position mới ảnh hưởng tới z-index là `absolute, fixed, relative`
```
.red {
  z-index: 3;
  position: relative;
}
.green {
  z-index: 2;
  position: relative;
}
.blue {
  z-index: 1;
  position: relative;
}
```
![](https://images.viblo.asia/591d5d8f-ecd9-42fe-afe0-341fe07db73d.PNG)
### IV. z-index âm và element không có thuộc tính position
* Hiện tại chúng ta xóa position của green đi
```
.green {
  z-index: 2;
  /*position: relative;*/
}
```
![](https://images.viblo.asia/f909e6d9-f9f6-48d1-9c02-cbe583dff30b.PNG)
* Lúc này index của green trở về giá trị mặc định của nó là `z-index: 0`
* Tiếp theo ta set giá trị âm cho z-index của block blue
```
.blue {
  z-index: -1;
  position: relative;
}
```
![](https://images.viblo.asia/23ea64ce-101a-414d-becd-5b9c758459eb.PNG)
* Mọi thứ lại như cũ :D
### V. Lưu ý
Trong các dự án và khi bạn search về z-index sẽ thấy nhiều người luôn chỉ bạn cách dùng z-index với giá trị là từ 99 hoặc 999 trở xuống. Vậy bạn có thắc mắc vì sao k? Đơn giản là bạn muốn block đó ở cao nhất và các block tiếp theo thì chỉ cần giảm dần là được và nhìn số nguyên nó vẫn tốt hơn là bạn đang set cho giá trị cao nhất của mình là 4 rồi cứ giảm dần tới giá trị âm :v. Vì trong một dự án không phải chỉ có một mình bạn code mà còn nhiều người khác nên việc đánh giá trị cao cho z-index cũng giúp cho việc làm việc hiệu quả hơn
### VI. Tham khảo
* https://hocwebchuan.com/reference/cssSection/pr_z-index.php
* https://viblo.asia/p/dieu-khong-ai-noi-cho-ban-ve-z-index-gDVK2jOeKLj