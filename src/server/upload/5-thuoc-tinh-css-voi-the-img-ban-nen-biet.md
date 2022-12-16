# Lời nói đầu: 
CSS có rất nhiều thuộc tính liên quan đến image như : background images, border images, masking hay clipping mà bạn có thể thêm trực tiếp hình ảnh vào các trang web và kiểm soát hành vi của chúng.
Tuy nhiên, cũng có các thuộc tính CSS liên quan đến hình ảnh ít được đề cập hơn, hoạt động trên các hình ảnh được thêm bằng thẻ <img> HTML, cách ưa thích để thêm hình ảnh vào các trang web.
Chúng ta cùng tìm hiểu các thuộc tính ấy là gì nhé.


# 1. Làm sắc nét hình ảnh với  image-rendering 
Khi một hình ảnh được nâng cấp, trình duyệt sẽ làm mịn hình ảnh, do đó, nó trông không giống pixel. Nhưng, tùy thuộc vào độ phân giải của hình ảnh và màn hình, điều này có thể không phải là tốt nhất mọi lúc. Bạn có thể kiểm soát hành vi trình duyệt này với thuộc tính **image-rendering property.**
Thuộc tính được hỗ trợ tốt này kiểm soát thuật toán được sử dụng để chia tỷ lệ hình ảnh. Hai giá trị chính của nó là **crisp-edge** và **pixelated.**
Giá trị **crisp-edge**duy trì độ tương phản màu giữa các pixel. Nói cách khác, không làm mịn đối với hình ảnh, điều này rất tốt cho tác phẩm nghệ thuật
Khi **pixelated** được sử dụng, các pixel của pixel gần đó có thể chiếm diện mạo của nó, làm cho nó giống như chúng tạo thành một pixel lớn, tuyệt vời cho màn hình độ phân giải cao..
Nếu bạn cứ nhìn kỹ vào các cạnh hoa trong GIF bên dưới, bạn có thể thấy sự khác biệt giữa hình ảnh thông thường và hình ảnh **pixelated.**
```CSS
img {
  image-rendering: pixelated;
}
```
![](https://images.viblo.asia/6ceb79c2-e80e-4881-b1e0-b09017e3f08b.gif)

# 2. Kéo dài hình ảnh với object-fit
Các giá trị **contain**, **cover**, **fill** đều quen thuộc, chúng tôi sử dụng chúng cho thuộc tính kích thước nền để kiểm soát cách hình ảnh nền lấp đầy phần tử mà nó thuộc về. Thuộc tính object-fit khá giống với nó, vì nó cũng xác định kích thước hình ảnh bên trong vùng chứa của nó.
Giá trị **contain** chứa hình ảnh trong thùng chứa của nó. **cover** cũng tương tự, nhưng nếu tỷ lệ khung hình của hình ảnh và vùng chứa không khớp với nhau, hình ảnh sẽ bị cắt bớt. **fill** làm cho hình ảnh kéo dài và fill vào thùng chứa của nó. giảm tỷ lệ chọn phiên bản nhỏ nhất của hình ảnh để hiển thị.
```html
<div id='container'>
  <img src="rose.png' alt="rose flower'>
</div>
```
```CSS
    #container {
  width: 300px;
  height: 300px;
}
img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
```
![](https://images.viblo.asia/7be91893-ed44-4106-a181-412773da84e9.gif)
# 3. Thay đổi vị trí  hình ảnh với object-position
Tương tự như thuộc tính background-position, background-size, object-position cũng có một thuộc tính object-fit.
Thuộc tính object-fit di chuyển một hình ảnh bên trong một thùng chứa hình ảnh đến các tọa độ đã cho. Các tọa độ có thể được xác định là đơn vị độ dài tuyệt đối, đơn vị độ dài tương đối, từ khóa (trên cùng, bên trái, giữa, dưới và bên phải) hoặc kết hợp hợp lệ của chúng (trên 20px bên phải 5px, giữa bên phải 80px).

```html
<div id='container'>
  <img src="rose.png' alt="rose flower'>
</div>
```

```CSS
#container {
  width: 300px;
  height: 300px;
}
img {
  width: 100%;
  height: 100%;
  object-position: 150px 0;
}
```

![](https://images.viblo.asia/f6d725ba-479c-4240-be6e-12e55ed187d6.jpg)
# 4. Tình huống căn chỉnh dọc hình ảnh với vertical-align
Đôi khi chúng ta thêm <img> (theo bản chất là nội tuyến) bên cạnh chuỗi văn bản để thêm thông tin hoặc trang trí. Trong trường hợp đó, việc căn chỉnh văn bản và hình ảnh vào vị trí mong muốn có thể là một chút khó khăn nếu bạn không biết sử dụng thuộc tính nào.
Thuộc tính vertical-align không chỉ dành riêng cho các ô của bảng. Nó cũng có thể căn chỉnh một phần tử nội tuyến trong một hộp nội tuyến và do đó có thể được sử dụng để căn chỉnh một hình ảnh trong một dòng văn bản. Phải mất một số lượng lớn các giá trị có thể được áp dụng cho một phần tử nội tuyến, vì vậy bạn có nhiều tùy chọn để chọn.
```html
<p>
PDF <img width="15px" src="pdf.png"
style="vertical-align:text-top" alt="Image">
</p>
```
![](https://images.viblo.asia/26f03308-c83e-4d5b-ac39-1e9d6e46c3ce.jpg)
# 5. Tạo bóng cho hình ảnh  với filter: drop-Shadow ()
Khi được sử dụng không rõ ràng trong các văn bản và hộp, bóng có thể thêm sự sống vào một trang web. Điều này cũng đúng với hình ảnh. Hình ảnh có hình dạng lõi và nền trong suốt có thể được hưởng lợi từ bộ lọc CSS bóng đổ.
Các đối số của nó tương tự như các giá trị của các thuộc tính CSS liên quan đến bóng (text-shadow, drop-shadow). Hai cái đầu tiên biểu thị khoảng cách dọc và ngang giữa bóng và hình ảnh, thứ ba và thứ tư là độ mờ và bán kính trải của bóng và cái cuối cùng là màu bóng.
Giống như bóng văn bản, bóng đổ cũng tạo ra một bóng được đúc theo đối tượng thuộc. Vì vậy, khi nó được áp dụng cho một hình ảnh, bóng sẽ có hình dạng của phần có thể nhìn thấy của hình ảnh.

```CSS
img {
  filter: drop-shadow(0 0 5px blue);
}
```
![](https://images.viblo.asia/9e4fe791-4105-432b-a2fc-0a15a7416b13.jpg)
# Nguồn: 
hongkiat.com