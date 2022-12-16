# Flexbox là gì?
Flexbox là một kiểu dàn trang (layout mode) mà nó sẽ tự cân đối kích thước của các phần tử bên trong để hiển thị trên mọi thiết bị. Nói theo cách khác, bạn không cần thiết lập kích thước của phần tử, không cần cho nó float, chỉ cần thiết lập nó hiển thị chiều ngang hay chiều dọc, lúc đó các phần tử bên trong có thể hiển thị theo ý muốn.

# Các thành phần trong Flexbox
Trước khi đi vào tìm hiểu sâu hơn về Flexbox, chúng ta cần nắm qua cấu trúc của Flexbox là như thế nào và một số thuật ngữ liên quan.

![](https://images.viblo.asia/c15d84c9-6fed-46b5-b3fc-69aa8557a20f.jpg)

Hai thành phần quan trọng nhất trong một bố cục Flexbox là gồm container và item:

- **container**: là thành phần lớn bao quanh các phần tử bên trong, bạn sẽ thiết lập kiểu hiển thị inline (sắp xếp theo chiều ngang) hoặc kiểu sắp xếp theo chiều dọc. Khi đó, các item bên trong sẽ hiển thị dựa trên thiết lập của container này.
- **item**: Các phần tử con của container được gọi là item, ở item bạn có thể thiết lập nó sẽ sử dụng bao nhiêu cột trong một container, hoặc thiết lập thứ tự hiển thị của nó.

Ngoài hai thành phần chính đó, chúng ta có thể thấy hình trên sẽ có các thành phần khác mình xin chia sẻ sau.

# Bắt đầu với Flexbox nào
Trước tiên sẽ là vài dòng **html** đơn giản:
```html
<div class="container">
   <div class="item item1">1</div>
   <div class="item item2">2</div>
   <div class="item item3">3</div>
   <div class="item item4">4</div>
</div>
```
Và một đoạn **CSS** để style đoạn **html** trên:
```css
.container {
     background: #ff0000;
     max-width: 960px;
     max-height: 1000px;
     margin: 0 auto;
     padding: 5px;
     display: flex;
}

.item {
     background: #0061ff;
     margin: 5px;
     color: #fff;
     height: 50px;
     text-align: center;
     line-height: 50px;
     padding: 0 10px;
}
```

Bạn sẽ thấy các item bên trong đã tự hiển thị theo chiều dọc, tương ứng với trục main mặc định là chiều ngang.
![](https://images.viblo.asia/fa7ff229-90e1-47f2-8b28-0351ba3a5ce2.PNG)

Nếu bạn muốn đổi trục thì chỉ cần thêm thuộc tính **flex-direction** vào **container**. Cụ thể:
**flex-direction:**

- **row**: Chuyển trục main axis thành chiều ngang, nghĩa là hiển thị theo hàng.
- **colum**: Chuyển trục main axis thành chiều dọc, nghĩa là hiển thị theo cột.
- **row-reverse**: Hiển thị theo hàng nhưng đảo ngược vị trí các item.
- **column-reverse**: Hiển thị theo cột nhưng đảo ngược vị trí các item.

![](https://images.viblo.asia/2bade2f7-859d-41af-a230-3341bc13180a.PNG)

# flex-wrap
Với khai báo **CSS** ở trên, nếu bây giờ chúng ta **set width** cho **item** là **1000px** thì điều gì sẽ xảy ra, theo dõi hình ở dưới nhé.
```css
.container {
     background: #ff0000;
     max-width: 960px;
     max-height: 1000px;
     margin: 0 auto;
     padding: 5px;
     display: flex;
}

.item {
     background: #0061ff;
     margin: 5px;
     color: #fff;
     height: 50px;
     text-align: center;
     line-height: 50px;
     padding: 0 10px;
     width: 1000px;
}
```

![](https://images.viblo.asia/530ae95b-f198-491c-ab24-e15988a279d6.PNG)

Như bạn thấy, dù chúng ta có thêm chiều rộng cho mỗi item bên trong là 1000px nhưng nó vẫn hiển thị trên một hàng đều nhau. Lý do là mặc định, flexbox tự căn chỉnh các phần tử hiển thị đều nhau theo trục main axis của nó dựa theo chiều rộng của container. Vì vậy cho dù bạn có chỉnh chiều rộng vượt quá giới hạn của nó thì nó vẫn không bị nhảy lung tung.

Bây giờ hãy thử thêm thuộc tính **flex-wrap: wrap** vào container thử xem thế nào.

![](https://images.viblo.asia/2bade2f7-859d-41af-a230-3341bc13180a.PNG)

Nói tóm lại là thuộc tính này cho phép **container** có thể bọc lại các **item** kể cả khi kích thước của **item** bị thay đổi, mặc định là **nowrap**. Thuộc tính này có thể áp dụng với cả chiều dọc của **container** và **item**.

Còn một vài thành phần cũng khá hay của Flexbox mình chưa nêu ra, các bạn tự tìm hiểu thêm nhé.



-----

## Tham Khảo
- https://webdesign.tutsplus.com/tutorials/tricks-with-flexbox-for-better-css-patterns--cms-19449

- https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- https://thachpham.com