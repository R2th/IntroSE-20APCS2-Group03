> Link bài viết gốc: https://www.taniarascia.com/javascript-mvc-todo-app/
>
. 

Tôi đã muốn viết một ứng dụng đơn giản theo mô hình **model-view-controller**  và chỉ sử dụng Javascript. Vì vậy tôi đã làm nó và... chúng ta có bài viết này. Đât thật sự là một khái niệm khó hiểu khi bạn lần đầu tiên nghe về nó, vì vậy tôi hy vọng bài viết này có thể giúp bạn hiểu thêm về MVC.

Tôi đã làm một ứng dụng Todo. Một ứng dụng đơn giản chạy trên trình duyệt của bạn cho phép bạn quản lý các công việc cần làm. Nó chỉ bao gồm 3 file `index.html`, `style.css`, và `script.js`, đẹp, cơ bản, chỉ phục vụ cho mục đích học tập.


## Điều kiện cần có
* Hiểu cơ bản về Javascript và HTML
* Biết các cách viết mã Javascript mới nhất

## Mục tiêu

Tạo một ứng dụng quản lý công việc cần làm chỉ với Javascript chạy trên trình duyệt, và tìm hiểu về mô hình MVC (và OOP - lập trình hướng đối tượng)

* [Xem demo](https://taniarascia.github.io/mvc/)
* [Mã nguồn](https://github.com/taniarascia/mvc)

## Model-View-Controller là gì?

MCV là một mô hình sử dụng để quản lý và tổ chức code của bạn. Đây là một trong các mô hình nổi tiếng nhất.

* **Model** - Quản lý dữ liệu của ứng dụng.
* **View** - Một đại diện trực quan của model.
* **Controller** - Kết nối giữa người dùng và hệ thống.


**Model** là các dữ liệu. Trong ứng dụng của chúng ta, nó chính là các công việc cần làm. Và các phương thức sẽ là thêm, sửa và xóa.

**View** là cách dữ liệu được hiển thị. Trong ứng dụng này, chúng ta sẽ hiển thị mã HTML trong DOM và CSS.

**Controller** kết nối giữa Model và View. Nó nhận thông tin từ user, ví dụ như click chuột hoặc gõ bàn phím, và xử lý các thông tin đó.

Phần model sẽ không liên quan đến view. View sẽ không liên quan đến model. Chỉ có controller sẽ kết nối cả hai lại với nhau.

## Khởi tạo ứng dụng

Đây sẽ hoàn toàn là một ứng dụng chỉ có Javascript. Vì vậy mọi thứ sẽ được xử lý với Javascript. Phần HTML sẽ chỉ bao một root element trong body. (Giống như react vậy)

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />

    <title>Todo App</title>

    <link rel="stylesheet" href="style.css" />
  </head>

  <body>
    <div id="root"></div>

    <script src="script.js"></script>
  </body>
</html>
```

I wrote a small bit of CSS just to make it look acceptable, which you can find here and save to style.css. I'm not going to write any more about the CSS, because it's not the focus of this article.

Okay, so now that we have the HTML and CSS, so it's time to actually start writing the app.

## Bắt đầu

Chúng ta sẽ viết thật sự đẹp và đơn giản để có thể hiểu mỗi class liên quan đến phần nào trong MVC. Tôi sẽ tạo một Model class, View class, và Controller class. Controller class sẽ nhận model và view trong khi khởi tạo. Vì vậy ứng dụng này sẽ là một thể hiện của controller.

```js
class Model {
  constructor() {}
}

class View {
  constructor() {}
}

class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view
  }
}

const app = new Controller(new Model(), new View())
```

Rất đẹp và trừu tượng.

## Model

Đầu tiên hãy tập trung vào model, vì nó đơn giản nhất trong ba phần. Nó không liên quan đến bất kỳ sự kiện hoặc thao tác DOM nào. Nó chỉ lưu trữ và sửa đổi dữ liệu.

```js
class Model {
  constructor() {
    // The state of the model, an array of todo objects, prepopulated with some data
    this.todos = [
      { id: 1, text: 'Run a marathon', complete: false },
      { id: 2, text: 'Plant a garden', complete: false },
    ]
  }

  addTodo(todoText) {
    const todo = {
      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
      text: todoText,
      complete: false,
    }

    this.todos.push(todo)
  }

  // Map through all todos, and replace the text of the todo with the specified id
  editTodo(id, updatedText) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { id: todo.id, text: updatedText, complete: todo.complete } : todo
    )
  }

  // Filter a todo out of the array by id
  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }

  // Flip the complete boolean on the specified todo
  toggleTodo(id) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { id: todo.id, text: todo.text, complete: !todo.complete } : todo
    )
  }
}
```

Chúng ta có `addTodo`, `editTodo`, `deleteTodo`, và `toggleTodo`. Tôi sẽ giải thích các hàm này - add sẽ thêm một công việc làm mới vào mảng. edit tìm theo id của công việc và thay thế nó, delete lọc bỏ công việc cần xóa trên mảng và toggle sẽ thay đổi giá trị của thuộc tính `complete`.

Sau khi chúng ta hoàn thành ứng dụng trên trình duyệt, và ứng dụng có thể truy cập được từ window (global), bạn có thể test các hàm ở trên một cách dễ dàng, chỉ cần viết lệnh sau:

```js
app.model.addTodo('Take a nap')
```

Nó sẽ thêm một công việc mới vào danh sách, và bạn có thể thấy nội dụng của `app.model.todos`.

Hiện tại vậy là đủ với model. Vào cuối bài, chúng ta sẽ lưu trữ dữ liệu với `local storage`, còn bây giờ dữ liệu sẽ bị làm mới mỗi khi bạn tải lại trang.

Như bạn có thể thấy, model chỉ quan tâm đến dữ liệu thực tế, và sự thay đổi của nó. Nó không biết về các tương tác của người dùng. Hay cách dữ liệu được hiển thị.

Vào thời điểm này bạn đã có thể chạy một ứng dụng CRUD hoàn chỉnh, chỉ với console, bạn có thể gõ lệnh trên console và xem dữ liệu hiển thị trên đó.

## View

Tiếp theo chúng ta sẽ tạo view bằng cách điều khiển DOM - document object model. Vì chúng ta làm điều này chỉ với Javascript mà không sử dụng templating language như JSX. Nó sẽ dài dòng và xấu xí, nhưng đây là bản chất của việc điều khiển DOM một cách trực tiếp

Cả controller và model đều sẽ không liên quan đến các phần như DOM, các đối tượng HTML, CSS. Mọi thứ liên quan đề việc hiển thị sẽ chỉ có được đặt ở view.

Đầu tiên tôi sẽ viết mốt số helper methods để lấy ra hoặc tạo một phần tử trên DOM.

```js
class View {
  constructor() {}

  // Create an element with an optional CSS class
  createElement(tag, className) {
    const element = document.createElement(tag)
    if (className) element.classList.add(className)

    return element
  }

  // Retrieve an element from the DOM
  getElement(selector) {
    const element = document.querySelector(selector)

    return element
  }
}
```

Cho đến nay mọi thứ vẫn tốt. Bây giờ trong hàm constructor, Tôi sẽ khai báo những thứ tôi cần trong view. Bao gồm:

* root element của ứng dụng - `#root`
* Tiêu đề trang - `h1`
* Form, các ô input và nút submit để thêm công việc mới - `form`, `input`, `button`
* Danh sách công việc - `ul`

Tôi sẽ khai báo tất cả các biến trong constructor và chúng ta có thể dễ dàng truy xuất chúng.

```js
class View {
  constructor() {
    // The root element
    this.app = this.getElement('#root')

    // The title of the app
    this.title = this.createElement('h1')
    this.title.textContent = 'Todos'

    // The form, with a [type="text"] input, and a submit button
    this.form = this.createElement('form')

    this.input = this.createElement('input')
    this.input.type = 'text'
    this.input.placeholder = 'Add todo'
    this.input.name = 'todo'

    this.submitButton = this.createElement('button')
    this.submitButton.textContent = 'Submit'

    // The visual representation of the todo list
    this.todoList = this.createElement('ul', 'todo-list')

    // Append the input and submit button to the form
    this.form.append(this.input, this.submitButton)

    // Append the title, form, and todo list to the app
    this.app.append(this.title, this.form, this.todoList)
  }
  // ...
}
```

Bây giờ các thiết lập có sẵn của view sẽ không thay đổi được.

![](https://images.viblo.asia/a0021d7d-d864-4418-9797-d16fe9b8e5f3.png)

Hai điều nhỏ này nữa - một getter và resetter của ô input (việc cần làm mới).

```js
get _todoText() {
  return this.input.value
}

_resetInput() {
  this.input.value = ''
}
```

Tất cả thiết lập bây giờ đã xong. Phần phức tạp nhất là hiểu thị danh sách công việc cần làm. Đây là phần sẽ thay đổi mỗi khi có thay đổi với dữ liệu.

```js
displayTodos(todos) {
  // ...
}
```

Hàm `displayTodos` sẽ tạo một phần tử `ul` và hiển thị các công việc cùng làm với thẻ `li`. Mỗi lần có thay đổi nào với dữ liệu như là thêm, xóa, sửa đổi hàm `displayTodos` sẽ được gọi. Điều này sẽ giữ cho view luôn đồng bộ với trạng thái của model.

Đầu tiên công việc chúng ta cần làm là xóa tất cả các node mỗi lần nó được gọi. Sau đó chúng ta có thể kiểm tra có công việc cần làm nào hay không. Nếu không chúng ta sẽ hiển thị một thông báo danh sách trống.

```js
// Delete all nodes
while (this.todoList.firstChild) {
  this.todoList.removeChild(this.todoList.firstChild)
}

// Show default message
if (todos.length === 0) {
  const p = this.createElement('p')
  p.textContent = 'Nothing to do! Add a task?'
  this.todoList.append(p)
} else {
  // ...
}
```

Bây giờ chúng ta chỉ cần lặp qua hết các công việc và hiển thị ô checkbox, span, và nút delete,... cho mỗi công việc cần làm.

```js
else {
  // Create todo item nodes for each todo in state
  todos.forEach(todo => {
    const li = this.createElement('li')
    li.id = todo.id

    // Each todo item will have a checkbox you can toggle
    const checkbox = this.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = todo.complete

    // The todo item text will be in a contenteditable span
    const span = this.createElement('span')
    span.contentEditable = true
    span.classList.add('editable')

    // If the todo is complete, it will have a strikethrough
    if (todo.complete) {
      const strike = this.createElement('s')
      strike.textContent = todo.text
      span.append(strike)
    } else {
      // Otherwise just display the text
      span.textContent = todo.text
    }

    // The todos will also have a delete button
    const deleteButton = this.createElement('button', 'delete')
    deleteButton.textContent = 'Delete'
    li.append(checkbox, span, deleteButton)

    // Append nodes to the todo list
    this.todoList.append(li)
  })
}
```

Bây giờ chúng ta đã có model và view. Chúng ta vẫn chưa có cách để kết nối chúng - chưa theo dõi các tương tác của người dùng và xử lý.

Tuy nhiên Chrome console có thể sử dụng như một controller tạm thời, và bạn có thể thêm, xóa công việc với nó.

![](https://images.viblo.asia/9d6610ab-6130-4a8b-8f89-2f8667575bd8.png)

## Controller

Cuối cùng, controller là phần liên kết model và view. Đây là đoạn code chúng ta đang có cho controller:

```js
class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view
  }
}
```

Đầu tiên chúng ta se gọi hàm `displayTodos` mỗi khi dữ liệu thay đổi. Chúng ta cũng sẽ gọi nó một lần ở hàm constructor để hiển thị dữ liệu ban đầu từ model nếu có.

```js
class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    // Display initial todos
    this.onTodoListChanged(this.model.todos)
  }

  onTodoListChanged = todos => {
    this.view.displayTodos(todos)
  }
}
```

Controller sẽ xử lý các sự kiện sau khi chúng được xảy ra. Ví dụ khi bạn submit một công việc mới, hoặc click vào nút delete, một sự kiện sẽ xảy ra. View sẽ phải lắng nghe các sự kiện đó vì nó xảy ra trên các phần của view, nhưng việc xử lý và phản hồi sẽ là của controller.

Chúng ta sẽ tạo một số hàm xử lý các sự kiện trong controller:

```js
handleAddTodo = todoText => {
  this.model.addTodo(todoText)
}

handleEditTodo = (id, todoText) => {
  this.model.editTodo(id, todoText)
}

handleDeleteTodo = id => {
  this.model.deleteTodo(id)
}

handleToggleTodo = id => {
  this.model.toggleTodo(id)
}
```

## Thiết lập lắng nghe các sự kiện

Bây giờ chúng ta đã có các hàm xử lý (handlers), nhưng controller vẫn chưa biết khi nào thì cần phải gọi chúng. Chúng ta phải đặt các event listener trên các phần tử DOM ở view. 

```js
bindAddTodo(handler) {
  this.form.addEventListener('submit', event => {
    event.preventDefault()

    if (this._todoText) {
      handler(this._todoText)
      this._resetInput()
    }
  })
}

bindDeleteTodo(handler) {
  this.todoList.addEventListener('click', event => {
    if (event.target.className === 'delete') {
      const id = parseInt(event.target.parentElement.id)

      handler(id)
    }
  })
}

bindToggleTodo(handler) {
  this.todoList.addEventListener('change', event => {
    if (event.target.type === 'checkbox') {
      const id = parseInt(event.target.parentElement.id)

      handler(id)
    }
  })
}
```

Chúng ta cần gọi các handler, vì vậy chúng ta sẽ liên kết chúng trong controller:

```js
this.view.bindAddTodo(this.handleAddTodo)
this.view.bindDeleteTodo(this.handleDeleteTodo)
this.view.bindToggleTodo(this.handleToggleTodo)
```

Bây giờ handler tương ứng với từng event sẽ được gọi, khi bạn tương tác với ứng dụng.

## Phản hồi với callback trong model

Đây là một số điều chúng ta bỏ lỡ - các event đã được xử lý, nhưng model vẫn chưa biết về nó, và sẽ không có thay đổi nào xảy ra. Chúng ta có hàm `displayTodos`, nhưng hiện tại chúng vẫn model và view vẫn chưa thực sự liên kết với nhau.

Nghĩa là với mỗi sự kiện, model sẽ phải phản hồi cho controller biết điều gì xảy ra với dữ liệu.

Chúng ta đã có hàm `onTodoListChanged` trong controller để xử lý. Giờ chúng ta chỉ cần làm cho model phản hồi lại.

Trong model thêm `bindTodoListChanged` cho `onTodoListChanged`.

```js
bindTodoListChanged(callback) {
  this.onTodoListChanged = callback
}
```

Và trong controller:

```js
this.model.bindTodoListChanged(this.onTodoListChanged)
```

Giờ chúng ta sẽ cần gọi `onTodoListChanged` callback trong tất cả các phương thức của model.

```js
deleteTodo(id) {
  this.todos = this.todos.filter(todo => todo.id !== id)

  this.onTodoListChanged(this.todos)
}
```

## Thêm local storage

Hiện tại, ứng dụng của chúng ta đã gần như hoàn thành. Chúng ta chỉ cần thêm một vài bước để lưu trữ dữ liệu của chúng ta một cách lâu dài trên trình duyệt.

Bây giờ chúng ta sẽ khai báo giá trị mặc định là giá trị trong local storage hoặc một mảng rỗng.

```js
class Model {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || []
  }
}
```

Chúng ta sẽ tạo một hàm private `commit` để cập nhật dữ liệu vào `localStorage` cùng với trạng thái của model.

```js
_commit(todos) {
  this.onTodoListChanged(todos)
  localStorage.setItem('todos', JSON.stringify(todos))
}
```


Và sau tất cả các hàm thay đổi  `this.todos`. Chúng ta cần gọi nó:

```js
deleteTodo(id) {
  this.todos = this.todos.filter(todo => todo.id !== id)

  this._commit(this.todos)
}
```


## Tổng kết


Đến đây chúng ta đã có một ứng dụng quản lý các công việc cần làm viết bằng Javascript và áp dụng mô hình MVC, cùng với giải thích các khái niệm của MVC. Đây là demo và mã nguồn để bạn có thể tham khảo lần nữa:

* [Xem demo](https://taniarascia.github.io/mvc/)
* [Mã nguồn](https://github.com/taniarascia/mvc)

Tôi hy vọng bài hướng dẫn này đã giúp bạn hiểu về MVC. Sử dụng mô hình này, bạn có thể sẽ phải thêm rất viềc công việc phải làm với ứng dụng của mình. Nhưng đây là một mô hình phổ biến và quen thuộc, thường được sử dụng trong các dự án và framework, và là một mô hình quan trọng mà developer nên biết.