Căn giữa 1 element theo chiều ngang (horizontally) và chiều dọc (vertically) là một câu hỏi phổ biến được dùng khi phỏng vấn. Giả sử có 1 element cha bao 1 element con như thế này:

```html
<div class="parent">
    <div class="child">hello world</div>
</div>
```

Trong bài này chúng ta cùng xem các cách khác nhau để căn element trên vào giữa page:
1. **Sử dụng Flex**
2. **Sử dụng Grid**
3. **Sử dụng position absolute**
4. **Sử dụng Table**
5. **Sử dụng writing-mode**
6. **Sử dụng thẻ Table**
7. **Sử dụng margin auto**

## 1. Sử dụng Flex
Khi sử dụng flex, chúng ta có thể sử dụng `justify-content` hoặc `align-items` để căn chỉnh nếu cần thiết:
```css
.parent {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
```

## 2. Sử dụng Grid
CSS Grid bao gồm khá nhiều tùy chọn căn chỉnh giống như flexbox, vì vậy chúng ta có thể sử dụng nó trên element cha như thế này:
```css
.parent {
    height: 100vh;
    display: grid;
    place-items: center;
}
```
Hoặc
```css
.parent {
    height: 100vh;
    display: grid;
    align-items: center;
    justify-content: center;
}
```
## 3. Sử dụng position absolute
Một trick đơn giản sử dụng position absolute:
```css
.parent {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```
## 4. Sử dụng Table
Một cách tiếp cận thực sự đơn giản và là một trong những cách tiếp cận đầu tiên (trước đây, mọi thứ đều là bảng), là sử dụng behavior của các ô trong bảng và căn chỉnh theo chiều dọc để căn giữa một phần tử trên vùng chứa.
```css
.parent {
    width: 100vw;
    height: 100vh;
    display: table;
}

.child {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}
```

## 5. Sử dụng writing-mode
**writing-mode** có thể thay đổi hướng hiển thị của văn bản. Ví dụ: bạn có thể sử dụng **writing-mode** để thay đổi hướng hiển thị của văn bản thành chiều dọc.
```css
.parent {
    writing-mode: vertical-lr;
    text-align: center;
    height: 100vh;
}

.child {
    writing-mode: horizontal-tb;
    display: inline-block;
    width: 100%;
}
```
## 6. Sử dụng thẻ Table
Bạn cũng có thể sử dụng thẻ `table`
```html
<table>
    <tbody>
        <tr>
            <td class="father">
                <div class="child">hello world</div>
            </td>
        </tr>
   </tbody>
</table>
```
```css
table {
    height: 100vh;
    width: 100%;
}

.father {
    text-align: center;
}
```
## 7. Sử dụng margin auto
Sử dụng margin-auto với element con, và display ở element cha:
```css
.parent {
    display: flex;
    height: 100vh;
}

.child {
    margin: auto;
}
```
Cách tốt nhất theo tác giả là Sử dụng Flex(1) và Sử dụng Grid(2)

Nguồn: [dev.to](https://dev.to/suprabhasupi/center-element-using-css-13ib)