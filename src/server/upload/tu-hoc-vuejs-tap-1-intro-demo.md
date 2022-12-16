# Vue.js là gì?
Gọi tắt là Vue (phát âm là /vjuː/, giống như view trong tiếng Anh), Vue.js là một progressive framework dùng để xây dựng giao diện người dùng. 

Khác với các framework nguyên khối (monolithic), Vue được thiết kế từ đầu theo hướng cho phép và khuyến khích việc phát triển ứng dụng theo từng bước. Khi phát triển lớp giao diện, người dùng chỉ cần dùng thư viện lõi của Vue, vốn rất dễ học và tích hợp với các thư viện hoặc dự án có sẵn. 

Cùng lúc đó, nếu kết hợp với những kĩ thuật hiện đại như SFC (single file components) và các thư viện hỗ trợ, Vue cũng đáp ứng được dễ dàng nhu cầu xây dựng những ứng dụng một trang (SPA - Single-Page Applications) với độ phức tạp cao hơn nhiều.

# Để học Vue.js bạn cần gì?
Điều kiện cần là phải có kiến thức cơ bản về HTML, CSS và quan trọng nhất là Javascript. Nếu bạn đã có sẵn kinh nghiệm với các framework khác như React hoặc Angular thì tốt, nhưng nếu không thì cũng không sao cả :wink:

Để dùng thử Vue.js, không gì dễ hơn là bắt đầu với một ví dụ Hello Vuejs. Let's get started!
# Viết chương trình Vuejs đầu tiên
Dưới đây mình đã có sẵn một mini project với HTML, CSS, "Vanilla Javascript" (nghĩa là chỉ JS thôi) và mình sẽ hướng dẫn bạn chuyển sang Vue.js 

File index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>A First App</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div id="app">
      <div>
        <label for="goal">Goal</label>
        <input type="text" id="goal" />
        <button>Add Goal</button>
      </div>
      <ul>
       
      </ul>
    </div>
    <script src="app.js"></script>
  </body>
</html>
```

File styles.css
```css
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

#app {
  margin: 3rem auto;
  max-width: 40rem;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

label, input {
  margin-bottom: 0.5rem;
  display: block;
  width: 100%;
}

label {
  font-weight: bold;
}

ul {
  list-style: none;
  margin: 1rem 0;
  padding: 0;
}

li {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ccc;
}
```
File app.js

```js
const buttonEl = document.querySelector('button');
const inputEl = document.querySelector('input');
const listEl = document.querySelector('ul');

function addGoal() {
  const enteredValue = inputEl.value;
  const listItemEl = document.createElement('li');
  listItemEl.textContent = enteredValue;
  listEl.appendChild(listItemEl);
  inputEl.value = '';
}

buttonEl.addEventListener('click', addGoal);
```

OK, bạn hãy chạy thử project, sau đó comment tất cả nội dung file app.js hiện tại và thực hiện các bước sau.
### Bước 1: import thư viện Vue trong file index.html
Nhúng thư viện Vue bằng cách thêm thẻ script sau vào **trước** thẻ scripts app.js
```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
```

### Bước 2: tạo Vue object trong file app.js
```js
var app = new Vue({})
```
### Bước 3: cấu hình cho app
- thêm thuộc tính **el** để báo cho app biết nó sẽ kiểm soát phần nào của trang. Phần mình muốn kiểm soát ở đây là thẻ div có id="app" và các thẻ con của nó.

```js
var app = new Vue({
  el: '#app'
})
```
- thêm thuộc tính **data** để set up data app sẽ sử dụng. Mình cần làm việc với nội dung goal người dùng nhập vào và danh sách các goals.
```js
var app = new Vue({
  el: '#app',
  data: {
      goals: [],
      enteredValue: ''
  }
})
```
- thêm chỉ thị **v-model** vào thẻ input để kết nối nội dung người dùng nhập vào với **enteredValue**. Vue sẽ tự động lắng nghe nội dung của thẻ và cập nhật giá trị cho **enteredValue**.
```html
<input type="text" id="goal" v-model="enteredValue" />
```
- thêm thuộc tính **methods** và xác định các hàm sẽ được gọi bên trong HTML code. Mình cần gọi hàm addGoal() khi người dùng click vào button. Từ khóa **this** giúp mình truy cập trực tiếp các thuộc tính trong data object và các hàm trong methods object mà app đang có.
```
var app = new Vue({
  el: '#app',
  data: {
      goals: [],
      enteredValue: ''
  },
  methods: {
    addGoal() {
      this.goals.push(this.enteredValue)
      this.enteredValue = ''
    }
  }
})
```
- thêm chỉ thị **v-on:event** vào thẻ button để gọi hàm mỗi khi button có sự kiện click
```html
<button v-on:click="addGoal">Add Goal</button>
```
- để hiển thị danh sách goals, mình sẽ thêm thẻ li và chỉ thị **v-for**. Giống như for loop, Vue sẽ duyệt lần lượt các phần tử goal trong mảng goals và tạo ra thẻ li tương ứng. Bạn có thể sử dụng tên biến chạy khác "goal". Sử dụng **{{ }}** để hiển thị biến goal. 
```html
<li v-for="goal in goals">{{ goal }}</li>
```
Để tối ưu performance thì Vue không render lại list khi có sự thay đổi trong mảng mà chỉ thêm vào DOM hoặc tái sử dụng phần tử có sẵn trong DOM. Mình sẽ giới thiệu chi tiết ở tập tiếp theo.

Okay, giờ chỉ cần save và chạy lại project là bạn đã hoàn thành chương trình Vuejs đầu tiên của mình rồi! Hãy so sánh với phiên bản "Vanilla Javascript" và cảm nhận các ưu điểm của Vue nhé.

Tham khảo tại https://vuejs.org/v2/guide/