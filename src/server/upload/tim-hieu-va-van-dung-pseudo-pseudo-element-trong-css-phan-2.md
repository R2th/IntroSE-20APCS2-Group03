Chào các bạn!

Trong bài trước mình đã giới thiệu với các bạn về định nghĩa, cách sử dụng cũng như 1 vài loại **pseudo-classes** hay dùng nhất. Bài này mình sẽ giới thiệu về **pseudo-elements** trong css.

## 1. Định nghĩa và cấu trúc của pseudo-element

Pseudo-element trong CSS được dùng để định dạng một phần đặc biệt của phần tử. Chẳng hạn bạn muốn sử dụng chúng để:

- Định dạng chữ hoặc dòng đầu tiên của phần tử
- Chèn nội dung vào trước hoặc sau nội dung của phần tử

Cấu trúc viết thì không khác so với pseudo-classes lắm.  

```
selector::pseudo-element {
    property:value;
}
```

Tuy nhiên, các bạn phải chú 1 vấn đề sau đây:

- Đối với pseudo-class thì khi gọi là chỉ cần viết 1 dấu 2 chấm. Chẳng hạn **:hover, :focus**,...
- Còn đối với pseudo-element thì phải viết 2 dấu 2 chấm. Ví dụ **::after, ::before**,...

Nếu như bạn viết 1 dấu 2 chấm đằng trước pseudo-element thì css vẫn có thể đọc được tuy nhiên khi bạn cài style-lint, scss-lint hay check validator w3c thì chắc chắn sẽ bị báo lỗi. Vì vậy chúng ta nên thống nhất cách viết **::after** ngay từ đầu cho quen.

Trong bài này mình sẽ chỉ giới thiệu tới các bạn những pseudo-element hay sử dụng sau đây:


| Selector | Ví dụ | Giải thích |
| -------- | -------- | -------- |
| ::after| p::after  |Chèn thêm 1 nội dung nào đó vào đằng sau nội dung của p element |
|::before  |p::before  | Chèn thêm 1 nội dung nào đó vào đằng trước nội dung của p element|
| ::first-letter | p::first-letter | Lựa chọn chữ cái đầu tiên của p element|
| ::first-line | p::first-line |Lựa chọn dòng đầu tiên của p element |
|::selection  |p::selection  |Dùng để thiết lập style CSS cho 1 vùng văn bản được chọn bởi người dùng (bằng thao tác như double-click vào nội dung hay giữ chuột trái để chọn nội dung) |
| ::placeholder |input::placeholder  | Dùng để định dạng cho những text placeholder của **input** hoặc **textarea** element|



## 2. Cách sử dụng các pseudo-elements

### 2.1. ::after 

**::after** được dùng để chèn một nội dung nào đó vào đằng sau nội dung của 1 element bất kỳ.

```
blockquote::after {
    content: '>';
}
```

Đối với **::after**, các bạn có thể hiểu nó như 1 element giả lập nào đó của 1 element chính thống. Tức là nó có thể nhận tất cả các thuộc tính css và bạn có thể style cho nó như 1 element. Có thể xét border, background, position, z-index, width, height,...

### 2.2. ::before

Tương tự như **::after**, **::before** được dùng để chèn một nội dung nào đó vào đằng trước nội dung của 1 element bất kỳ.

```
blockquote::before {
    content: '<';
}
```

Tất nhiên, không khác so với **::after**, **::before** cũng được xem như 1 element giả lập và có thể áp dụng các thuộc tính css lên nó như **::after**. Đây chính là điểm khác biệt của **::after** và **::before** với những pseudo-elements còn lại.

***Note:***

Việc sử dụng **::after** và **::before** thực sự rất nhiều. Các bạn có thể tham khảo 1 số bài viết trước đây của mình để style cho các element khác hoặc tạo các hình học bằng cách sử dụng **::after** và **::before** nhé.

https://viblo.asia/p/bai-10-css-cho-mot-so-tag-dac-biet-nhu-checkbox-radio-button-va-seclect-box-6J3ZgE1q5mB

https://viblo.asia/p/bai-24-tao-cac-khoi-hinh-hoc-bang-css3-phan-1-1Je5ExEYlnL

https://viblo.asia/p/bai-25-tao-cac-khoi-hinh-hoc-bang-css3-phan-2-Eb85opzjK2G

https://viblo.asia/p/bai-26-tao-cac-khoi-hinh-hoc-bang-css3-phan-3-OeVKBDYYlkW

Ngoài ra còn các bài về **hover đẹp với CSS3**. Đặc biệt **::after** và **::before** là mấu chốt trong việc sử dụng icon-font đó.

### 2.3. ::first-line

**::first-line** được dùng để style cho dòng đầu tiên trong nội dung của 1 element.

```
p::first-line {
    background: yellow;
    font-weight: bold;
}
```

**::first-line** có thể áp dụng được những thuộc tính css sau:
* Các thuộc tính về font 
* Các thuộc tính về color
* Các thuộc tính về background
* word-spacing
* letter-spacing
* text-decoration
* vertical-align
* text-transform
* line-height
* clear

Lưu ý **::first-line** chỉ áp dụng cho các block element như div, p, h1 - h6,...

### 2.4. ::first-letter

**::first-letter** được dùng để style cho ký tự đầu tiên trong nội dung của 1 element.

```
p::first-letter {
    color: red;
    font-weight: bold;
}
```

**::first-letter**  có thể áp dụng được những thuộc tính css sau:

* Các thuộc tính font
* Các thuộc tính color 
* Các thuộc tính background 
* Các thuộc tính margin 
* Các thuộc tính padding 
* Các thuộc tính border 
* text-decoration
* vertical-align (chỉ khi "float" là "none")
* text-transform
* line-height
* float
* clear

Cũng như **::first-line**,  **::first-letter** chỉ áp dụng cho các block element như div, p, h1 - h6,...

### 2.5. ::selection

**::selection** dùng để thiết lập style CSS cho nội dung phần tử được chọn bởi người dùng (bằng thao tác như double-click vào nội dung hay giữ chuột trái để chọn nội dung).

```
p::selection {
    color: red;
    background: yellow;
}
```

**::selection**  có thể áp dụng được những thuộc tính css sau:

* Các thuộc tính color 
* Các thuộc tính background 
* Cursor
* Outline.

Lưu ý  **::selection** không được hỗ trợ cho trình duyệt Internet Explorer 8 và phiên bản trước đó. Firefox hỗ trợ pseudo-element thay thế đó là **::-moz-selection**

### 2.6. ::placeholder

**::placeholder** là 1 pseudo-element đặc biệt chỉ áp dụng được cho **input** và **textarea** element. Pseudo-element này được dùng để style cho những text placehoder.

```
input::placeholder {
    color: blue;
    font-size: 1.5em;
}
```

Như vậy, trong bài này mình đã giới thiệu về định nghĩa cũng như cách sử dụng của những pseudo-elements thông dụng nhất. Tất nhiên, các bạn hoàn toàn có thể kết hợp nhiều pseudo-element cho cùng 1 element. Chẳng hạn, bạn tạo 1 hình bình hành thì có thể sử dụng **::after** và **::before** thay vì sử dụng ảnh. Còn tạo thế nào thì các bạn có thể tham khảo về 1 số bài viết mình đã đưa bên trên nhé.


Chúc các bạn thành công!