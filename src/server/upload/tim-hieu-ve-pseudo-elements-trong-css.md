Trong bài viết ngắn này mình xin giới thiệu một phương thức đặc biệt trong css đó là **Pseudo-Elements**. Vậy **Pseudo-Elements** là gì và nó có những gì hay ho thì chúng ta sẽ cùng đi vào chi tiết bài viết để hiểu rõ hơn nhé!

***Lưu ý**: Bài viết chống chỉ định với Frontend Developer =))*

## Pseudo-Elements là gì?

Pseudo-Elements có thể dịch nôm na là ***phần tử giả*** , được sử dụng để tạo một số style đặc biệt của element được chọn.

**Ví dụ, nó có thể được sử dụng để:**

*- Style cho chữ cái đầu tiên, hoặc dòng đầu tiên của phần tử.*

*- Chèn nội dung trước hoặc sau nội dung của phần tử.*

## Cú pháp

Cú pháp của một Pseudo-Elements như sau:
 ```
 selector::pseudo-element {
    property:value;
}
```

> **Lưu ý ký hiệu hai dấu hai chấm -** `::pseudo-element` so với `:pseudo-element`
> 
> Hai dấu hai chấm đã thay thế ký hiệu một dấu hai chấm cho các pseudo-element trong CSS3. Đây là một nỗ lực từ W3C để phân biệt giữa pseudo-classes và pseudo-element. 
> 
> Cú pháp một dấu hai chấm được sử dụng cho cả hai pseudo-classes và pseudo-element trong CSS2 và CSS1. 
> 
> Đối với tính tương thích ngược, cú pháp một dấu hai chấm được chấp nhận cho các pseudo-element trong CSS2 và CSS1.

## Ví dụ về các Pseudo-Elements

Dưới đây sẽ là phần chi tiết và các ví dụ mô tả về các Pseudo-Elements trong css

### `::before` pseudo-element

Đây có lẽ là pseudo-element được sử dụng nhiều và thông dụng nhất. `pseudo-element` thường được sử dụng để thêm text, hình ảnh hay bất kỳ nội dung gì phía trước nội dung của phần tử được chọn.

Ví dụ dưới đây mô tả việc dùng `::before` để tạo 1 arrow icon có màu xanh lá đơn giản cho thẻ `h1` mà không cần dùng image hay icon bằng hình ảnh nào.

{@codepen: https://codepen.io/tranquocy/pen/wjNzWO}

### `::after` pseudo-element

Tương tự như `::before`, `::after` cũng được sử dụng để thêm nội dung nhưng là vào phía sau phần tử được chọn.

Ví dụ dưới đây mô tả cho việc dùng `::after` để thêm 1 đoạn text sau phần tử được chọn và thêm 1 số style css

{@codepen: https://codepen.io/tranquocy/pen/rvPMmW}

### `::selection` pseudo-element 

Pseudo-element này được dùng để style cho một vùng văn bản được người dùng chọn (hay còn gọi là "**bôi đen**"). Chỉ có một số thuộc tính css khả dụng với `::selection` là `color`, `background`, `curso`, và `outline`.

Ví dụ dưới đây mô tả khi người dùng bôi đen thì đoạn văn bản đó sẽ có màu đỏ và nền vàng

{@codepen: https://codepen.io/tranquocy/pen/deapVe}

### `::first-line` pseudo-element

Như đã nói ở phần giới thiệu của bài viết, *Pseudo-Elements được sử dụng để tạo style một số phần đặc biệt của element được chọn.*. Và pseudo-element `::first-line` dùng để style cho dòng đầu tiên của phần tử được chọn

Cùng xem ví dụ dưới đây:

{@codepen: https://codepen.io/tranquocy/pen/xjMOvg}

**Lưu ý:** `::first-line` chỉ có thể được áp dụng cho các phần tử html là block.

Các thuộc tính css sau áp dụng cho `::first-line` pseudo-element:

* font properties
* color properties
* background properties
* word-spacing
* letter-spacing
* text-decoration
* vertical-align
* text-transform
* line-height
* clear

### `::first-letter` pseudo-element

`::first-letter` được sử dụng để thêmstyle đặc biệt vào chữ cái đầu tiên của văn bản.

Ví dụ sau định dạng chữ cái đầu tiên của văn bản trong tất cả các phần tử `<p>`: 

{@codepen: https://codepen.io/tranquocy/pen/pVGEJo}

Tương tự như `::first-line` thì `::first-letter` cũng chỉ có thể áp dụng được cho các phần tử html là block

Các thuộc tính css sau áp dụng cho `::first-letter` pseudo-element:

* font properties
* color properties 
* background properties
* margin properties
* padding properties
* border properties
* text-decoration
* vertical-align (only if "float" is "none")
* text-transform
* line-height
* float
* clear

Như vậy là mình đã giới thiệu xong về **Pseudo-Element** trong CSS. Hy vọng qua bài viết ngắn này sẽ giúp các bạn chưa hiểu có thể hiểu rõ hơn về các phương thức đặc biệt này trong CSS. Xin cảm ơn và hẹn gặp lại.

Tham khảo: [https://www.w3schools.com/css/css_pseudo_elements.asp](https://www.w3schools.com/css/css_pseudo_elements.asp)