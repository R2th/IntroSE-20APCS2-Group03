# Lời tựa
Bài viết là một trong những phần mình tìm hiểu được trong quá trình đọc tài liệu về CSS (https://developer.mozilla.org/en-US/docs/Web/CSS) mà mình thấy hữu ích, giúp mình hiểu ra được nhiều thứ. Có rất nhiều khái niệm nền tảng của CSS (**Cascade & Inheritance, **Box model, CSS layout, containing block, stacking context**, ...) ( gọi là nền tảng nhưng không có nghĩa là basic, dễ hiểu) mà nếu hiểu nó, bạn sẽ hiểu cách CSS hoạt động. Trong bài này, mình xin giới thiệu một vài khái niệm: **Cascade & Inheritance, Box model**.
# CSS - Cái tên nói lên tất cả
Có 3 yếu tố ảnh hưởng đến việc lựa chọn khai báo CSS để áp dụng lên thuộc tính (xếp theo thứ tự giảm dần):
### 1. Important
Không gì giải thích dễ hiểu hơn bằng một ví dụ.
{@codepen: https://codepen.io/NLAQ/pen/OBmZKy?editors=1100}
### 2. Specificity
**Specificity** là một giá trị dùng để đánh giá độ ưu tiên của một khai báo CSS. **Specificity** được tính thông qua 4 giá trị, **thousands**, **hundreds**, **tens**, **ones**.
Trong đó: 
* **Thousands**: Tính điểm 1000 nếu khai báo CSS được sử dụng trong thuộc tính style của phần tử.
* **Hundreds**: Tính điểm là 100 cho mỗi ID selector trong một khai báo CSS.
* **Tens**: Tính điểm là 10 cho mỗi class selector, attribute selector, pseudo-class trong một khai báo CSS. 
* **Ones**: Tính điểm là 1 cho mỗi element selector, pseudo-element trong một khai báo CSS.\
Ví dụ: 

| Selector | Thousands | Hundreds | Tens | Ones | Total specificity |
| -------- | -------- | -------- | -------- | -------- | ---------|
| h1       | 0        | 0        | 0        | 1        | 0001     |
| h1 + p::first-letter| 0 | 0 | 0 | 3 | 0003 |
| li > a[href*="en-US"] > .inline-warning| 0 | 0 | 2 | 2 | 0022|
| #identifier| 0 | 1 | 0 | 0 | 0100|
| No selector, with a rule inside an element's style attribute| 1 | 0 | 0 | 0 | 1000 |
Dưới đây là một ví dụ cụ thể. (***Bạn chọn tab CSS để xem giải thích***)
{@codepen: https://codepen.io/NLAQ/pen/jemKvz?editors=1100}
### 3. Source order
Nếu có nhiều khai báo CSS cùng tham chiếu đến một phần tử, và giá trị **specificity** là bằng nhau thì CSS của khai báo đứng sau sẽ được áp dụng lên phần tử.\
Ví dụ (***Bạn chọn tab CSS để xem giải thích***)
{@codepen: https://codepen.io/NLAQ/pen/NOjBrB?editors=1100}
Một ví dụ khác, ví dụ này mình có đọc được trong một group, [bắt nguồn từ bài này](https://twitter.com/mxstbr/status/1038073603311448064). (***Nhớ chọn tab CSS để xem điều đặc biệt***)
{@codepen: https://codepen.io/NLAQ/pen/mzmjpp?editors=1100}

Một câu hỏi nhỏ: CSS - Cascade Style Sheet, qua đoạn giới thiệu trên, bạn hiểu thế nào là **Cascade**???
# Thế giới của những chiếc hộp (box model)
Trong thế giới HTML, CSS, tất cả các phần tử được coi là một phần tử hình chữ nhật (box) với các thuộc tính **width**, **height**, **padding**, **border**, **margin**.<br>
Đây là một ví dụ về box của một phần tử<br>
![alt](http://imageshack.com/a/img923/7872/eyxuET.png)<br>
Trong hình trên, phần màu xanh da trời với kích thước 1060 * 24 được gọi là content box.<br>
Kiểu CSS box được áp dụng lên một phần tử được xác định qua thuộc tính display ( các giá trị có thể của thuộc tính **display**: **block**, **inline-block**, **inline**, **none**)<br>
### 1. Các kiểu CSS box
* **Block element**: Phần tử này sẽ chiếm hết độ rộng có thể, bất kể nội dung bên trong của nó và sẽ bắt đầu ở dòng mới. Ví dụ: thẻ <div>, <p>... là block element.
* **Inline element**: Phần tử này sẽ chỉ chiếm độ rộng để vừa đủ cho nội dung bên trong nó. Ví dụ: thẻ <span>,...
* **Inline-block element**: Cho phép một phần tử hành xử như một block element nhưng mà lại hiển thị như một inline element.<br>
***Một số lưu ý***
* **Inline element** không thể có kích thước cố định.
* Thuộc tính **width** và **height** chỉ áp dụng cho phần tử **non-inline element**, tức là **block element** và **inline-block** element.<br>
Một vài ví dụ minh họa.
{@codepen: https://codepen.io/NLAQ/pen/yRbxOe?editors=1010}<br>
### 2. Kích thước của một box - thuộc tính box-sizing
Mặc định, giá trị width và height mà chúng ta gán cho một phần tử sẽ được áp dụng lên content box của phần tử đó. Nếu phần tử này có thêm thuộc tính border hoặc padding thì lúc này kích thước thật sự lúc render của phần tử sẽ được cộng thêm các giá trị này.
* Các giá trị của box-sizing:
    * **content-box**: Giá trị mặc định của box-sizing. Kích thước của content box chính là thuộc tính width và height, không bao gồm thuộc tính padding, border.<br>
        Ví dụ: 
        ```
        .box {
            width: 350px;
            border: 10px solid black;
            padding: 25px;
        }
        ```
        Đoạn code CSS trên sẽ render ra một box có chiều rộng là 400px
    * **border-box**: Kích thước khi render của một phần tử sẽ bao gồm content, padding, border, không gồm margin.<br>
        Ví dụ: 
        ```
        .box {
            width: 350px;
            border: 10px solid black;
            padding: 25px;
        }
        ```
       Đoạn code CSS trên sẽ render ra một box có chiều rộng là 350px.<br>
Ví dụ minh họa cụ thể.
 {@codepen: https://codepen.io/NLAQ/pen/gBRwLZ}
# Tạm kết
Mình vừa giới thiệu với các bạn một số khái niệm quan trọng của CSS. Nếu bạn muốn hiểu sâu về CSS, hiểu một vài cách để tạo ra hiệu ứng trong CSS thì không thể bỏ qua những khái niệm này, ngoài ra còn một số khái niệm, thuộc tính cũng quan trọng không kém, ví dụ như: **stacking context**,  **z-index**, **position**,... Mình sẽ giới thiệu với các bạn trong các bài viết tiếp theo.<br>
**Tài liệu tham khảo:**<br>
CSS Cascade: https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Cascade_and_inheritance<br>
Model box: https://developer.mozilla.org/vi/docs/Learn/CSS/Introduction_to_CSS/Box_model<br>
box-sizing: https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing