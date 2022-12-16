## Flexbox là gì?

**Flexbox** là một kiểu dàn trang (layout mode) mà nó sẽ tự cân đối kích thước của các phần tử bên trong để hiển thị trên mọi thiết bị. Nói theo cách khác, bạn không cần thiết lập kích thước của phần tử, không cần cho nó float, chỉ cần thiết lập nó hiển thị chiều ngang hay chiều dọc, lúc đó các phần tử bên trong có thể hiển thị theo ý muốn.

Hiện nay, theo lời khuyên từ Mozilla thì chúng ta sử dụng **Flexbox** để thiết lập bố cục trong phạm vi nhỏ (ví dụ như những khung trong website) và khi thiết lập bố cục ở phạm vi lớn hơn (như chia cột website) thì vẫn nên sử dụng kiểu thông thường là dàn trang theo dạng lưới (grid layout).

Thuật ngữ các thành phần trong **Flexbox**.

Trước khi đi vào tìm hiểu sâu hơn về **Flexbox**, chúng ta cần nắm qua cấu trúc của **Flexbox** là như thế nào và một số thuật ngữ liên quan.

Dưới đây là sơ đồ cấu trúc **Flexbox** .

![](https://images.viblo.asia/839da714-330f-42b8-adf4-336cd7f95bd4.jpg)

Hai thành phần quan trọng nhất trong một bố cục **Flexbox** là gồm **container** và **item**:
* **Container**: là thành phần lớn bao quanh các phần tử bên trong, bạn sẽ thiết lập kiểu hiển thị inline (sắp xếp theo chiều ngang) hoặc kiểu sắp xếp theo chiều dọc. Khi đó, các item bên trong sẽ hiển thị dựa trên thiết lập của container này.
* **item**: Các phần tử con của container được gọi là item, ở item bạn có thể thiết lập nó sẽ sử dụng bao nhiêu cột trong một container, hoặc thiết lập thứ tự hiển thị của nó.

Ngoài hai thành phần chính đó, chúng ta có thể thấy hình trên sẽ có:
* **Main start**, main end: Khi thiết lập flexbox, điểm bắt đầu của container gọi là main start và điểm kết thúc được gọi là main end. Điều này có nghĩa, các item bên trong sẽ heienr thị từ main start đến main end (hoặc là được phép hiển thị đến main end). Và chiều vuông góc của nó là cross start, cross end cũng có ý nghĩa tương tự nhưng luôn vuông góc với main start, main end.
* **Main axis**: Trục này là trục chính để điều khiển hướng mà các item sẽ hiển thị. Như bạn thấy ở trên hình main axis là trục dọc nên các item sẽ hiển thị theo chiều dọc, tuy nhiên ta có thể sử dụng thuộc tính flex-direction để thay đổi trục của main axis và lúc đó các item sẽ hiển thị theo nó. Và cross axis luôn là trục vuông góc của main axis.
* **Main size**: Bạn có thể hiểu đơn giản là kích thước (chiều rộng hoặc dọc) của mỗi item dựa theo trục main axis.
* **Cross size**: Là kích thước (chiều rộng hoặc dọc) của mỗi item dựa theo trục cross axis.

## Bắt đầu với Flexbox

Trước tiên mình bắt đầu với một cấu trúc html đơn giản sau:

```
<div class="container">  
   <div class="item item1">1</div>  
   <div class="item item2">2</div>  
   <div class="item item3">3</div>  
   <div class="item item4">4</div>  
</div>
```

Và một đoạn CSS ban đầu để thiết lập màu sắc và kích thước để dễ nhìn từng thành phần:
```
/** Global CSS **/
.container {
 background: red;
 max-width: 960px;
 max-height: 1000px;
 margin: 0 auto;
 padding: 5px;
}
.item {
 background: blue;
 margin: 5px;
 color: white;
 height: 50px;
 text-align: center;
 line-height: 50px;
}
```
Bây giờ chúng ta sẽ bắt đầu làm việc với Flexbox ở đây. Trước tiên chúng ta sẽ đưa `.container` về hiển thị ở dạng flexbox với `display: flex`.

```
/** Flex layout **/
.container {
 display: flex;
}
```

Và đây là kết quả, các `item` class sẽ chuyển từ sắp xếp dọc sang sắp xếp ngang trên 1 hàng.
![](https://images.viblo.asia/13602212-90e1-4d3f-b641-1352e9c816c0.PNG)

Nếu bạn muốn đổi trục thì chỉ cần thêm thuộc tính **flex-direction** vào container. Cụ thể:
**flex-direction:**
* **row**: Chuyển trục main axis thành chiều ngang, nghĩa là hiển thị theo hàng.
* **colum**: Chuyển trục main axis thành chiều dọc, nghĩa là hiển thị theo cột.
* **row-reverse**: Hiển thị theo hàng nhưng đảo ngược vị trí các item.
* **column-reverse**: Hiển thị theo cột nhưng đảo ngược vị trí các item.
Khá đơn giản đúng không? 

**flex-wrap**
Bây giờ để hiểu cái này, chúng ta thử thêm chiều rộng cho mỗi item bên trong là 1000px xem chuyện gì sẽ xảy ra khi dùng flexbox.

```
.item {
 width: 1000px;
}`
```
Cùng xem kết quả nhé
![](https://images.viblo.asia/fc855df1-b5f0-4a6e-a544-05f6852441f6.PNG)

Như bạn thấy, dù chúng ta có thêm chiều rộng cho mỗi item bên trong là 1000px nhưng nó vẫn hiển thị trên một hàng đều nhau. Lý do là mặc định, flexbox tự căn chỉnh các phần tử hiển thị đều nhau theo trục main axis của nó dựa theo chiều rộng của container. Vì vậy cho dù bạn có chỉnh chiều rộng vượt quá giới hạn của nó thì nó vẫn không bị nhảy lung tung.

Bây giờ hãy thử thêm thuộc tính `flex-wrap: wrap` vào container thử nhé.

```
.container {
 display: flex;
 flex-wrap: wrap;
}
```

Kết quả là: 
![](https://images.viblo.asia/3c28ce09-44a5-41b1-b5b0-14f21954e120.PNG)

Thuộc tính này cho phép container có thể bọc lại các item kể cả khi kích thước của item bị thay đổi, mặc định là nowrap. Thuộc tính này có thể áp dụng với cả chiều dọc của container và item

**order**
Trong đoạn HTML ví dụ của mình trong bài này, mình có đặt số thứ tự cho mỗi phần tử là 1, 2, 3 và 4 với class tương ứng là .item1, .item, .item3 và .item4. Mặc định item này sẽ hiển thị theo thứ tự trong HTML, nhưng với thuộc tính order chúng ta có thể sắp xếp lại vị trí sắp xếp của các item.
Và mình sẽ thêm thuộc tính **order** như sau:
```
.item1 {
 order: 4;
}
.item2 {
 order: 3;
}
.item3 {
 order: 1;
}
.item4 {
 order: 2;
}
```
Kết quả
![](https://images.viblo.asia/dbec9ff9-f3f2-4033-8934-9c8b5a7024b2.PNG)

Các bạn có thế thấy sắp xếp của các item đã có sự thay đổi theo thứ tự của thuộc tính `order`, nhờ vậy các bạn có thể dễ dàng thay đổi vị trí xuất hiện của các phần tử trên 1 hàng.

**flex-grow**
Để làm ví dụ này trước tiên mình hãy bỏ chức năng wrap đi và thiết lập chiều rộng của item là 50px.
![](https://images.viblo.asia/9e882ee4-5344-42e4-ab07-8262fe40accc.PNG)


Bây giờ ở `.item2`, mình cho giá trị `flex-grow: 1` thử nhé.
```
.item2 {
 flex-grow: 1;
}
```
Kết quả:
![](https://images.viblo.asia/d7b5f019-10f0-4ee5-98dc-607b449045d5.PNG)

Khi thiết lập nó `flex-grow: 1`, thì nó sẽ lấy phần trống còn lại của container đắp vào. Bây giờ hãy thử cho `.item1` với` flex-grow: 2` thử.
```
.item1 {
 flex-grow: 2;
}
```
![](https://images.viblo.asia/dc64d287-3437-4448-b4a8-01c6d29354ff.PNG)

Lúc này giá trị flex-grow: 2 sẽ lấy phần dư lớn gấp đôi của flex-grow: 1.

**flex-shrink**

Bạn có thể hiểu mặc định tất cả các item đều có giá trị flex-shrink là 1. Điều này có nghĩa là khi chúng ta thu nhỏ trình duyệt lại, các phần tử đều co lại bằng nhau. Tuy nhiên giả sử mình muốn .item3 nó co lại nhiều hơn so với các item khác thì mình sẽ tăng giá trị flex-shrink của nó lên.

```
.item3 {
 flex-shrink: 2;
}
```

**flex-basis**

Cái này bạn có thể hiểu đơn giản nhất là gán cho item một kích thước nhất định. Bạn có thể sử dụng giá trị tuyệt đối hoặc tương đối (căn cứ theo kích thước của container).

```
.item3 {
 flex-basis: 500px;
}
```
**justify-content**
Mặc định các item bên trong sẽ rải đều bắt đầu từ main start đến main end, tuy nhiên nếu container vẫn còn khoảng trống thì có thể dùng thuộc tính justify-content để điều chỉnh lại vị trí bắt đầu của nó.

Thuộc tính này có 5 giá trị và bạn có thể xem tấm ảnh bên dưới mình mượn của CSS Tricks để hiểu hơn về ý nghĩa các giá trị của justify-content.

![](https://images.viblo.asia/dcc60875-3c80-405e-94a1-0dc7cffb6df5.jpg)

Ví dụ:
```
.container {
 display: flex;
 justify-content: flex-end;
}
```
Kết quả:
![](https://images.viblo.asia/d16c2555-545c-44c4-a21b-fddc602e8ac1.PNG)

Tương tự các bạn có thể thử với các thuộc tính còn lại.

Trên đây là một số thuộc tính hay dùng trong **Flexbox**, các bạn có thể xem thêm các thuộc tính khác [tại đây](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout).

## Lời kết

Flexbox trong CSS có thể nói là một trong những kiểu dàn trang rất tốt để thay thế cho cách dàn trang thông thường là dùng float, thích hợp khi dàn trang những thành phần nhỏ trong website để hạn chế tối đa việc dùng float không cần thiết.

Mặc dù hiện tại chưa phải tất cả trình duyệt đều hỗ trợ CSS Flexbox nhưng trong tương lai, chắc chắn đây là một trong những tính năng mà các trình duyệt sẽ sớm hỗ trợ do khả năng tiện dụng và tùy biến tốt của nó mang lại. Cảm ơn các bạn đã đọc bài.

## Nguồn tham khảo

https://thachpham.com/web-development/html-css/huong-dan-css3-flexbox-toan-tap.html
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout
https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties
https://css-tricks.com/snippets/css/a-guide-to-flexbox/