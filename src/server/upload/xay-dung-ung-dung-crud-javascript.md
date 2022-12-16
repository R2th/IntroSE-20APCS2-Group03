### Introduction
Trong hướng dẫn này, chúng ta sẽ xem xét cách tạo một ứng dụng Crud bằng JavaScript. Chúng ta sẽ tạo một ứng dụng tên Todo. Nó tập trung nhiều hơn vào những người mới học javascript. Ứng dụng đơn giản là thứ phổ biến nhất để xây dựng khi học một ngôn ngữ lập trình mới. Chúng ta cùng bắt đầu:
### Required
Bạn cần phải có kiến thức cơ bản Variables, Arrays, Function, and Objects trước khi bắt đầu theo bài hướng dẫn này.
### Result
Ở trong hướng dẫn này bạn có thể làm được các việc sau:
* Thêm mới task
* Đánh dấu 1 task đã hoàn thành
* Delete một task đã được thêm mới thành công.

### Creating UI
Chúng ta sẽ bắt đầu bằng cách xây dựng giao diện người dùng. Đầu tiên chúng ta cần tạo một file `.hmtl` file mà chúng ta sẽ viết tất cả các mã html.
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>To Do List</title>
    <link rel="stylesheet" href="index.css" />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="container">
      <div class="todo">
        <h1>Todo</h1>
        <p>What do you want to get done today?</p>
        <form id="form">
          <input type="text" id="input" placeholder="Enter task" />
        </form>
      </div>

      <div class="list-todo">
        <ul id="todo"></ul>
      </div>
    </div>

    http://index.js
  </body>
</html>
```

Trong đoạn mã trên là một thẻ `meta` `html` và một `div` với class="container". Bên trong `div` chúng ta có một thẻ `form` và một thẻ `ul`.
Thể `form` có các phần tử đầu vào. phần tywr đầu vào có  `id=”input”` cái mà chúng ta sẽ dùng để nhận giá trị nhập vào của người dùng.
Thẻ `ul` nơi chúng ta hiển thị giá tri người dùng nhập vào sau khi nhấn button `Enter`
Chúng ta sẽ tạo style cho html để ứng dụng. Tạo file .css và link nó đến phần thân của file .html

```
html,
body {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
  --text-color: #333;
  color: var(--text-color);
  background-color: #e0f0fd;
}
.container {
  text-align: center;
  width: 40%;
  margin: auto;
  color: #181818;
  min-height: 90vh;
  margin-top: 2%;
}
.todo {
  width: 100%;
  padding-bottom: 15px;
  background: #3366ff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  color: #ffffff;
}
h1 {
  margin-bottom: 20px;
  font-size: 80px;
  margin-top: 0;
  padding-left: 10px;
}
input {
  background: none;
  outline: none;
  border: none;
  border-bottom: 2px solid #ffffff;
  color: #ffffff;
  padding: 8px;
  font-size: 20px;
}
.list-todo {
  height: 60vh;
  background-color: #ffffff;
  overflow-x: scroll;
}
#todo {
  padding: 0 10px 0 10px;
}
#todo li {
  list-style: none;
  font-size: 16px;
  width: 100%;
  max-width: 100%;
  display: flex;
  --webkit-display: flex;
  align-items: flex-start;
  justify-content: space-between;
  text-align: justify;
  margin-bottom: 15px;
  border-bottom: 1px solid #777777;
  padding-bottom: 8px;
}
#todo li.completed {
  text-decoration: line-through;
}

#todo li.uncompleted {
  text-decoration: none;
  color: black;
}
#todo li input {
  margin-right: 10px;
}
#todo li button {
  outline: none;
  border: none;
  border-radius: 200px;
  margin-left: 10px;
  background-color: #3366ff;
  color: #ffffff;
  width: 6%;
  height: 5vh;
}
```

### Add a task
Chúng ta sẽ tạo 1 file .js và link nó đến phần thân của file .html
File .js chúng ta sẽ viết mã sẽ kích hoạt thẻ đầu vào để gửi giá trị bất cứ khi nào người dùng thêm tác vụ

```
const form = document.getElementById("form");
const input = document.getElementById("input");
const button = document.getElementById("button");
const todo = document.getElementById("todo");
let todoList = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  // get input
  const newTodo = input.value;
  // return if nothing was entered
  if (!newTodo) return;
  // add the new task to todo list
  todoList.push({
    text: newTodo,
    completed: false,
  });
  // add the todo list to localstorage
  localStorage.setItem("todos", JSON.stringify(todoList));
  // render todo list
  render();
}
```

Trong đoạn mã trên chúng ta đã khai báo một vài biến hằng số biên snayf có thể sử dụng ở bất kỳ đâu trong file .js
Thuộc tính `document.getElementById` là một phương thức trả về thành phần mà có thuộc tính `id`. Bạn có thể thấy rằng 
tất cả các mã chung ta tạo ra đều có một `id` cụ thể.
`form.addEventListener` gửi giá trị sau khi người dùng nhấn button `Enter`
`e.preventDefault` ngăn chặn việc reload lại trang khi người dùng nhấn button `Enter` để submit `form`
chúng ta sẽ call funtion addTodo().

Chúng ta sẽ tạo function addTodo() chúng ta sẽ call nó mỗi khi người dùng thêm mới task. Trong function 
 chúng ta đã khai báo một biến newTodo là hằng số được gnas giá trị là `theinput.value`.
 Biến này chỉ có truy cập trong function vì nó là biến cục bộ.
 
 Chúng ta sẽ lưu trữ mảng trong `localStorage` để chúng tôi vẫn có thể truy cập giá trị bất cứ lúc nào.
 
###  Mark a task as completed

 ```
 function render() {
   // clear the list
   todo.innerHTML = null;
 
   // get the todo list from localstorage
   const todos = localStorage.getItem("todos");
   todoList = JSON.parse(todos) || [];
 
   for (let i = 0; i < todoList.length; i++) {
 
     const item = document.createElement("li");
 
     // create checkbox to update completed state
     const checkbox = document.createElement("input");
 
     checkbox.type = "checkbox";
 
     checkbox.addEventListener("click", function (e) {
       todoList[i].completed = e.target.checked;
       localStorage.setItem("todos", JSON.stringify(todoList));
 
         // check if todo item is completed and add appropriate class
         if (todoList[i].completed) {
            item.classList.add("completed");
            item.classList.remove("uncompleted");
           checkbox.checked = todoList[i].completed;
        } else {
          item.classList.add("uncompleted");
          item.classList.remove("completed");
          checkbox.checked = todoList[i].completed;
       }

     });

   }
 }
 ```
 
Chúng ta đã tạo một hàm `render()` khác. Trong hàm `render()`, trước tiên chúng ta sẽ xóa thẻ đầu vào sau khi người dùng add task.
Chúng ta cũng lấy giá trị mà chúng ta đã lưu trữ trong localStorage và lặp qua giá trị này.
Tạo thẻ `li`, `input`, và sset input tyle là checkbox. Để check nó là checked hay không chúng ta sẽ thêm sự kiện
kích hoạt khi checkbox được chọn.
Kiểu giá trị đầu vào sẽ có giá trị là `boolean` khi chon nó sẽ trả về  `true` và ngược lại trả về `false`
và chúng ta sẽ lưu trữ chúng vào `localStorage`
`if()` điều kiện chạy khi người dùng chọn checkbox hoặc bỏ chọn checkbook.

### Delete an already added task
```
    // create text node
    const text = document.createElement("p");
    text.innerText = todoList[i].text;

    // create delete button
    const button = document.createElement("button");
    button.innerText = "X";
    button.addEventListener("click", function () {
      todoList.splice(i, 1);
      localStorage.setItem("todos", JSON.stringify(todoList));
      render();
    });

```
Tuy nhiên bên trong hàm `render()`, chúng ta có một thẻ P để giữ văn bản và hiển thị lên sau khi người add task mới.
Chúng ta  tạo một thẻ button và thêm văn bản bên trong “x” nó và chúng tôi muốn khi người dùng nhấp vào nút, nó sẽ xóa một task đã hoàn thành hoặc bất kỳ task nào.
Chúng ta đã thêm xử lý xự kiện để kích hoạt button "x" bất cứ khi nào sự kiện nhấp chuột được thực hiện.
`TodoList.splice(i, 1)` xóa  một tacsk vụ từ localStorage và sau đó, chúng t achạy lại hàm.
```
    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(button);
    todo.appendChild(item);
    input.value = null;
```
`item.appendChild()` nối tất cả các phần tử Html mà chúng tôi đã tạo vào DOM và cũng thu hồi sau đó có thứ tự như hình bên dưới.
### Conclusion
Trong bài viết này, chúng ta đã có thể xây dựng một ứng dụng to-do đơn giản cho phép người dùng thêm task, đánh dấu task đã hoàn thành và xóa các công task đã hoàn thành.
![](https://images.viblo.asia/2ed72e00-e777-49c5-99f2-2f09ef251ae6.png)


### Tài liệu tham khảo.
https://developer.mozilla.org/vi/docs/Web/JavaScript

https://codesource.io/crud-application-with-javascript/