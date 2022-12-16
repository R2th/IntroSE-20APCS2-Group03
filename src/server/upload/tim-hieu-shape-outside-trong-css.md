Chào các bạn, các bạn có biết làm thế nào để nội dung trang web (cụ thể là một đoạn văn bản) hiện thị bao quanh một hình ảnh có hình dạng là hình tròn hay hình ellipse ... không? Nay mình sẽ giới thiệu cho các bạn một thuộc tính trong css, nó sẽ giúp chúng ra làm điều đó một cách đơn giản.

![](https://images.viblo.asia/3ecf3b5c-c218-473c-b774-76b74fe719ac.PNG)

> Bọc văn bản quanh một khối.
> 
> Văn bản được bọ quanh một hình ảnh. Hình ảnh bên trái là một hình tròn,nhưng do khối bao nó là một hình hộp, văn bản được bao quanh nó với các cạnh vuông. Văn bản được bọc bị ràng buộc bởi cái hình vuông này, chính vì thế bạn bị giới hạn trong thiết kế. Điều này rất khó chịu để đưa hình ảnh bao quanh một hình ảnh, cụ thể là hình tròn

## Shape-outside
Trong CSS có một thuộc tính mới đó là shape-outside cho phép bạn bọc văn bản phù hợp với hình dạng bức ảnh của bạn.

![](https://images.viblo.asia/8a64170b-4cfb-4c37-864b-5f95a11148c1.PNG)

> Thuộc tính mới của css là shape-outside, chúng ta có thể dễ dàng bọc  văn bản bên ngoài để khớp với hình ảnh. không bị giới hạn trong mô hình hộp. Như bạn có thể thấy văn bản bao quanh vòng tròn chạy xung quanh nó bằng cách sử một hình dạng tương tự như hình ảnh. Điều này có thể thực hiện bằng cách sử dụng thuộc tính shape-outside 
> 
> Tương tự với các bức ảnh bên dưới

## Sử dụng shape-outside
Thuộc tính shape-outside có một hình dạng cơ bản và nó được áp dụng một shape function cho nó. Hàm shape được sử đụng để thay đổi hình dạng khu vực nổi của hình. Thuộc tính shape-outside cung cấp các hàm sau để thay đổi hình dạng:
* circle
* ellipse
* polygon
* rectangle
* url

Hình ảnh phải được đặt kích thước, bạn phải đặt `width`  và `height` cho ảnh. Điều này sẽ được sử dụng bởi hàm shape để tạo ra một hệ tọa độ được sử dụng khi bọc văn bản xung quanh hình ảnh 

## Circle
`circle` là một trong những hàm chức năng được cung cấp bởi shape-outside. Kí hiệu đầy đủ là `circle ( r at cx cy)` trong đó: r là bán kính của hình tròn và cx cy là tọa độ tâm của hình tròn. Nếu bỏ chúng thì hình ảnh sẽ được sử dụng làm giá trị mặc định.
Dưới đây là hình ảnh ví dụ khi sử dụng `circle ()`

![](https://images.viblo.asia/8a64170b-4cfb-4c37-864b-5f95a11148c1.PNG)

```
.circle {
    height: 200px;
    width: 200px;
    border-radius: 50%;
    background-color: #7db9e8;
    margin: 0 25px 5px 0;
    float: left;
    -webkit-shape-outside: circle();
    shape-outside: circle();
}
```

## Ellipse
Hàm này là một biến thể của hình tròn, nó được kéo dài trên trục dọc hay trục ngang của hình tròn. Kí hiệu đầy đủ là `ellipse (rx ry at cx cy)` trong đó rx ry là bán kính của hình ellipse, cx cy là tọa độ tâm của hình ellipse.
Dưới đây là hình ảnh ví dụ khi sử dụng hàm `ellipse ()`

![](https://images.viblo.asia/24b21093-f901-4757-b327-92127d27888d.PNG)

```
.ellipse {
    width: 100px;
    height: 200px;
    border-radius: 50%;
    background-color: #7db9e8;
    margin: 0 25px 5px 0;
    float: left;
    -webkit-shape-outside: ellipse(50px 100px at 50% 50%);
    shape-outside: ellipse(50px 100px at 50% 50%);
}
```

## Polygon
Hàm polygon cung cấp một phạm vi hình dạng không giới hạn. Kí hiệu đầy đủ là `polygon (x1 y1, x2 y2, ...)` trong đó mỗi cặp chỉ tọa độ cho một đỉnh của đa giác, lưu ý để sử dụng hàm `polygon ()` thì ta phải khai báo tối thiểu 3 cặp đỉnh tọa độ.
Polygon được sử dụng cùng với một clip-path. Thuộc tính clip-path trong CSS tạo một vùng cắt xác định phần nào của phần tử sẽ được sử dụng . Bất cứ điều gì trong khu vực được hiển thị, bên ngoài sẽ được ẩn.
Dưới đây là ví dụ sử dụng `shape-outside` để tạo ra hai hình đa giác và văn bản nằm giữa chúng

![](https://images.viblo.asia/ce7bc35a-84a2-44ef-afc9-4fbfe9902a6f.PNG)

```
.leftTriangle {
    width: 150px;
    height: 300px;
    background-color: #7db9e8;
    margin: 0 25px 5px 0;
    float: left;
    -webkit-clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
    clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
    -webkit-shape-outside: polygon(0% 0%, 100% 0%, 50% 100%);
    shape-outside: polygon(0% 0%, 100% 0%, 50% 100%);
}
.rightTriangle {
    width: 150px;
    height: 300px;
    background-color: #7db9e8;
    margin: 0 0 5px 25px;
    float: right;
    -webkit-clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
    clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
    -webkit-shape-outside: polygon(0% 0%, 100% 0%, 50% 100%);
    shape-outside: polygon(0% 0%, 100% 0%, 50% 100%);
}
```

## Các trình duyệt hỗ trợ

![](https://images.viblo.asia/4b94cf3f-90c5-4b8f-8b0b-dd8b25903212.PNG)

Nguồn tham khảo: [https://medium.freecodecamp.org](https://medium.freecodecamp.org/mastering-css-series-shape-outside-44d626270b25)
                                    [https://css-tricks.com](https://css-tricks.com/almanac/properties/s/shape-outside/)