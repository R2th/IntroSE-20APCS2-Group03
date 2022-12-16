Sau [phần một](https://viblo.asia/p/nhung-thuoc-tinh-thu-vi-trong-css-p1-OeVKBvL0KkW) về các thuộc tính thụ vị trong CSS, thì hôm nay mình sẽ tiếp tục với 10 thuộc tính tiếp theo. Không chờ lâu, bắt đầu nào !!!
## 1. calc
Hàm `calc()`, đúng như tên của nó đây là một hàm tính toán có khả năng tạo ra một `value` cho một `property` trong css.

```css
width: calc(100% - 32px)
``` 

> Chiều rộng sẽ bằng 100% trừ đi 32 pixel.

Nó có thể rất hữu ích để thiết lập độ rộng cột và trừ đi các lề. Không cần lồng nhiều phần tử vào nhau. Chấp nhận một biểu thức với các toán tử `+`, `-`, `*` và `\`. Toán tử có thể là bất kỳ một kiểu giá trị độ dài. 
``` css
calc(var(--someValue) / 2 - 2em) 
```

Nên sử dụng `fallback` này, đối với các trình duyệt không hỗ trợ:
```css
width: 98%; /* fallback for browsers without support for calc() */    
width: calc(100% - 1em);
```
## 2. column-count
Thuộc tính `column-count` xác định số lượng cột mà một phần tử có thể có.

VÍ dụ `column-count: 3` sẽ trải các phần tử `text` (hoặc phần tử `inline-*`-) thành 3 cột.  Có thể áp dụng  `inline-block` và `block` cho các `element` bên trong. Cái này sẽ không hoạt động với `display: table` nhưng vẫn sẽ làm việc với `display: table-cell`. 

Ngoài ra ta còn có nhưng thuộc tính `column-*` khác.
1. **column-gap**: chỉ định kích thước của khoảng cách giữa các cột
2. **column-rule**: là một đường thẳng đứng được vẽ giữa các cột một cách trực quan. Đây là thuộc tính có thể coi là rút gọn ( hoặc rất giống với đường `border`)
3. **column-rule-color**: chỉ định màu của  `column-rule`: `red`, `#FFF`,...
4. **column-rule-style**: nó chỉ định style của `column-rule`: Chấp nhận các `value` tương tự như `border-style`:  `none`, `hidden`, `dotted`,...
5. **column-rule-width**: chỉ định chiều rộng của `column-rule`. Chấp nhận các `value` như `border-style`: `thin`, `medium`, `px`,...

    {@embed: https://codepen.io/gregh/pen/pRoYMv}
  
 ## 3. content
 Thuộc tính content được sử dụng cùng với các `pseudo elements`  `::before` và `::after`. Ví dụ tạo dấu phẩy sau thẻ `<li>`
 ```css
 ul > li:after {
  content: ", ";
}
 ```
 ## 4. counters
`Counters` cho phép  đưa ra số (`index`) cho các phần tử. Ví dụ: bạn có một bài viết, với một số chủ đề, mỗi chủ đề có tiêu đề `<h2>` ở đầu và bạn có `<h3>` tiêu đề phụ. Bạn có thể tự động đánh số chúng!

Có bốn thuộc tính để làm việc với counters:
1. **counter-reset**: Đặt lại hoặc tạo mới một bộ đếm,  `value` của `property` này là tên của `counter` mà bạn xác định.
2. **counter-increment**: tăng bộ đếm, có `value` của là tên của `counter` mà bạn muốn tăng.
3. **content()** sử dụng để thêm `index` vào các phần tử.
4. **counter()** Hàm lấy giá trị của bộ đếm

    {@embed: https://codepen.io/gregh/pen/MJWRXm}
## 5. currentColor
`currentColor` có thể coi là đại diện cho `color` của `element` đó hoặc là từ `element` cha của nó.
```css
.parent {
  color: #ccc;
  border: 1px solid currentColor;
}
.child {
  background: currentColor;
}
```
Có một `trick` nhỏ để thẻ `svg` cùng màu với `element` bên ngoài bao bọc nó.
```css
button {
  color: red;
}
button svg {
  fill: currentColor;
} 
```
## 6. filter
Thuộc tính`filter` áp dụng hiệu ứng hình ảnh cho các `element`. Nó đi kèm với các `function` được xác định trước như `blur`, `brightness`, `contrast`, `sepia` và bạn cũng có thể áp dụng các `SVG filter` tùy chỉnh.
    {@embed: https://codepen.io/gregh/pen/GrJNdJ}
    
Và đặc biệt, có thể kết hợp nhiều `funtion` khác nhau vào một `filter`.
    {@embed: https://codepen.io/gregh/pen/ygNVMX}
## 7. flex
Thuộc tính `flex` là một `shorthand` của `flexbox layout`. Cách sử dụng phổ biến nhất của nó là `flex: 1;`, cái mà sẽ đẩy một `element` chiếm nhiều chỗ nhất có thể, hoặc cân bằng không gian nó đang sử dụng với các `element` khác cũng sử dụng `flex`. Giá trị mặc định của nó `flex: 0 1 auto`.
## 8. flex-flow
Flex-flow là `shorthand` của `flex-direction` và `flex-wrap`.

Chấp nhận các `value` của 
1. **flex-direction**: `row`, `row-reverse`, `column`, `column-reverse`
2.  **flex-wrap**: `nowrap`, `wrap`, `wrap-reverse`. 

Có thể sử dụng ngắn gọn hơn nữa như:
```css
flex-flow: row nowrap;
```
## 9. flex-basis
Thuộc tính `flex-basis` xác định kích thước ban đầu của một `element` `flex` (hơi giống `width`, bên trong `flexbox` ). Nó chấp nhận các giá trị chiều rộng như `px`, `em` và `auto`. Nó cũng chấp nhận các value như: `fill`, `max-content`, `min-content` và `fit-content`.
## 10. font-kerning
Thuộc tính `font-kerning`  - `kerning` được sử dụng để chỉ khoảng cách giữa các ký tự với nhau trong cùng một font chữ, `browser` sẽ sử dụng thông tin được lưu trong `font` để tính toán khoảng cách, hoặc sẽ `disable` nó đi.

Nếu một `font` chữ có `kerning` thì các ký tự có thể chồng chéo lên nhau theo chiều dọc. Điều này có nghĩa là, các ký tự không thực sự dính chặt vào nhau, mà thay vào đó 2 ký tự sẽ được cùng chung một không gian dọc. 
Có các `value` sau:
1. **auto**: Nếu `kerning` tồn tại thì sẽ sử dụng ngược lại thì không.
2. **normal**: Mặc định áp dụng thông tin có trong `font`.
3. **none**: `browser` sẽ không sử dung `kerning`

![](https://images.viblo.asia/43a0c4fd-e6cb-478f-9584-23ad90f59c99.png)

Phùuuu, đã được 20 thuộc tính rồi, hay đón đọc thêm bài viết tiếp theo nhé các bạn.
### Tham khảo 
* [CSS-Tricks](https://css-tricks.com/lets-look-50-interesting-css-properties-values/)