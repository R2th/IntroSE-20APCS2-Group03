## Mục tiêu bài viết

- Giới thiệu về ngôn ngữ Javascript
- Giới thiệu một vài ví dụ về Javascript



| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Text     | Text     | Text     |



## Nội dung bài viết

### Javascript là gì?

- Javascript là ngôn ngữ lập trình phổ biến nhất thế giới.
- Javascript là ngôn ngữ lập trình của web.
- JavaScript và Java là hai ngôn ngữ hoàn toàn khác nhau, cả về khái niệm và thiết kế.
- JavaScript được Brendan Eich phát minh vào năm 1995 và trở thành tiêu chuẩn ECMA vào năm 1997.
- ECMA-262 là tên chính thức của tiêu chuẩn. ECMAScript là tên chính thức của ngôn ngữ.

### Javascript có thể thay đổi nội dung HTML

Javascript có thể thay đổi nội dung của HTML

> Các ví dụ dưới đây sử dụng hàm `getElementById()` của Javascript, hàm này sẽ lấy ra phẩn tử HTML có Id là giá trị truyền vào. Tiếp theo chúng ta sẽ cùng tìm hiểu xem javascript có thể làm được gì nhé!!!

Ví dụ:

```js
document.getElementById("demo").innerHTML = "Hello JavaScript";
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_intro_inner_html" target="_blank">Click để xem kết quả</a>
</div>

### Javascript có thể thay đổi thuộc tính HTML

Javascript có thể thay đổi thuộc tính của HTML như thay đổi giá trị của thuộc tính `src` của thẻ ` <img>`

Ví dụ:

```html
<button onclick="document.getElementById('myImage').src='pic_bulbon.gif'">
  Turn on the light
</button>

<img id="myImage" src="pic_bulboff.gif" style="width:100px" />

<button onclick="document.getElementById('myImage').src='pic_bulboff.gif'">
  Turn off the light
</button>
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_intro_lightbulb" target="_blank">Click để xem kết quả</a>
</div>

### Javascript có thể thay đổi CSS của thẻ HTML

Javascript có thể thay đổi CSS của HTML như thay đổi cỡ chữ của thẻ `p`.

Ví dụ:

```html
<p id="demo">JavaScript can change the style of an HTML element.</p>

<button
  type="button"
  onclick="document.getElementById('demo').style.fontSize='35px'"
>
  Click Me!
</button>
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_intro_style" target="_blank">Click để xem kết quả</a>
</div>

### Javascript có thể ẩn hiện các phần tử HTML

Việc ẩn hiện các phần tử HTML có thể thực hiện bằng cách thay đổi thuộc giá trị của thuộc tính `display`
Ví dụ ẩn phần tử HTML:

```js
document.getElementById("demo").style.display = "none";
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_intro_hide" target="_blank">Click để xem kết quả</a>
</div>

Ví dụ hiện phần tử HTML:

```js
document.getElementById("demo").style.display = "block";
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_intro_show" target="_blank">Click để xem kết quả</a>
</div>