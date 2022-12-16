## Mục tiêu bài viết

- Sự kiện trong Javascript là gì
- Hiểu và có thể sử dụng Sự kiện trong javascript

## Nội dung bài viết

Sự kiện là những gì xảy ra với các phần tử HTML.

### Sự kiện HTML

Dưới đây là một số ví dụ về các sự kiện:

- Một trang web được tải xong
- `form`, `input` thay đổi
- `button` được `click`

Ví dụ 1 sự kiện `onClick` được gắn vào `button`

```js
<button onclick="document.getElementById('demo').innerHTML = Date()">
  The time is?
</button>
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_event_onclick1" target="_blank">Click để xem kết quả</a>
</div>

Trong ví dụ trên, code JavaScript thay đổi nội dung của phần tử với id = "demo".

Trong ví dụ tiếp theo, chúng ta muôn thay đổi nội dung của phần tử của chính nút button.

```js
<button onclick="this.innerHTML = Date()">The time is?</button>
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_event_onclick" target="_blank">Click để xem kết quả</a>
</div>

### Viết mã riêng trong phần script và gọi hàm

```html
<button onclick="displayDate()">The time is?</button>
<script>
  function displayDate() {
    document.getElementById("demo").innerHTML = Date();
  }
</script>
```

### Các sự kiện HTML phổ biến

| Sự kiện       | Mô tả                                         |
| ------------- | --------------------------------------------- |
| `onchange`    | Một phần tử HTML đã được thay đổi             |
| `onclick`     | Người dùng nhấp vào một phần tử HTML          |
| `onmouseover` | The user moves the mouse over an HTML element |
| `onmouseout`  | Người dùng di chuyển chuột khỏi phần tử HTML  |
| `onkeydown`   | Người dùng nhấn một phím bàn phím             |
| `onload`      | Trình duyệt đã tải xong trang                 |

### Sự kiện Javascript có thể làm được những gì.

Ví dụ

- Những việc nên làm mỗi khi tải trang
- Những việc nên làm khi đóng trang
- Hành động sẽ được thực hiện khi người dùng nhấp vào nút
- Nội dung cần được xác minh khi người dùng nhập dữ liệu