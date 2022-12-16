Đã bao giờ bạn muốn tự spam với các thông báo phiền nhiễu và đầy xâm lấn chưa? Hoặc nhắc nhở bản thân rằng kế hoạch làm việc của chúng ta ngày hôm nay sắp đến mỗi khi lưới web chứ?

Chà chà, không đâu xa. 

**Chrome Extension** có thể thực hiện tất cả những điều này, và phần hay nhất là bạn không thể thoát ứng dụng bằng cách reload lại trang. Thêm vào đó, không phải ai cũng biết cách tắt những thứ phiền phức này.

Trong bài viết này, chúng ta sẽ thử tạo một ứng dụng Todo và triển khai nó dưới Local như một ứng dụng Chrome extension với React.
Thực sự việc này là không cần thiết, nhưng hãy thử crazy lên một chút nó đánh thức sáng tạo chút nhé. 

**Điều kiện cần:**
- Kiến thức nhập môn về React
- Một chút thông thạo về custom React Hooks

**Clone the Repo:** 

Clone: https://gitlab.com/sk3pt1cc/react-starter

![](https://images.viblo.asia/a7e0da12-95cc-4f0c-add3-1a3f22913f5c.png)


Run cmd `npm install` & `npm run start`

Mở `localhost:3000` để thử chạy thử ứng dụng.

### **Tạo Todo App**

Bao gồm 3 phần là: App Component, Component form để tạo mới Todos, và `useTodos` Hook. Chúng ta sẽ đi vào chi tiết từng phần

**`<CreateTodoForm />`**

```JS
import React from 'react';

const CreateTodoForm = ({ createNewTodo }) => {
	const [label, setLabel] = React.useState('');

	return (
		<div className="create-todo-form">
	    	<input placeholder="Enter todo label" onChange={e => setLabel(e.target.value)} value={label} />
	    	<button onClick={() => createNewTodo(label)}>
	    		Save
	    	</button>
	  	</div>
	);
};

export default CreateTodoForm;
```

Một form đơn giản để nhập Label và button để lưu thông tin. Khi nó nhận được một function `createNewTodo` prop.

**`useTodos`**
```JS
import React from 'react';
import uuid from "uuid";

const getTodos = () => {
  const todos = window.localStorage.getItem('todos');
  if (!todos) {
    return [];
  }
  return JSON.parse(todos);
}

const useTodos = () => {
	const [todos, setTodos] = React.useState(getTodos());

	const updateTodos = (newTodos) => {
		const stringifiedTodos = JSON.stringify(newTodos);
		window.localStorage.setItem('todos', stringifiedTodos);
		setTodos(newTodos);
	};

	const setTodoCompleted = (id, completed) => {
		const todoIds = todos.findIndex(todo => todo.id == id);
		const newTodos = [...todos];

		newTodos[todoIds].completed = completed;

		updateTodos(newTodos);
	};

	const addTodo = (label) => {
		const newTodos = { label, completed: false, id: uuid() };
		updateTodos([...todos, newTodos]);
	};

	return [todos, addTodo, setTodoCompleted];
};

export default useTodos;
```

Đây là phần quan trọng nhất nên chúng ta sẽ cùng nhau phân tích từng chút một nhé.

```JS
const getTodos = () => {
  const todos = window.localStorage.getItem('todos');
  if (!todos) {
    return [];
  }
  return JSON.parse(todos);
}
```

Đầu tiên `getTodos`, một function để lấy dữ liệu Todos từ dưới local storage.  Nếu `todos` không tồn tại chúng ta sẽ trả về một mảng rỗng. Còn không chúng ta sẽ trả về một javascript object dưới dạng chuỗi.

`const [todos, setTodos] = React.useState(getTodos());`

Chúng ta sẽ sử dụng State để re-render lại mỗi khi todos thay đổi giá trị. Giá trị ban đầu sẽ được gọi từ `getTodos`.

```JS
const updateTodos = (newTodos) => {
  const stringifiedTodos = JSON.stringify(newTodos);
  window.localStorage.setItem('todos', stringifiedTodos);
  setTodos(newTodos);
};
```

Một function cập nhật các todos mới dưới local storage và thiết lập chúng trong State. Chúng ta cần sử dụng `JSON.stringify` trong newTodos vì local storage chỉ lưu dạng chuỗi.
```JS
const setTodoCompleted = (id, completed) => {
  const todoIds = todos.findIndex(todo => todo.id === id);
  const newTodos = [...todos];
  newTodos[todoIds].completed = completed;
  updateTodos(newTodos);
};
```

Một function để đánh dấu Todos đã hoàn thành. Đầu tiên, chúng ta cần lấy dữ liệu từ mảng `todos` trong State. Kê tiếp, chúng ta sẽ sử dụng array spread syntax để copy array thành 1 trường mới để không biến đổi giá trị của nó. Cuối cùng, chúng ta cập nhật `completed` và gọi `updateTodos` để cập nhật array mới.

```JS
const addTodo = (label) => {
  const newTodo = { label, completed: false, id: uuid() };
  updateTodos([...todos, newTodo]);
};
```

Một function để thêm một todo vào danh sách việc cần làm. Chúng ta cần tạo mới một todo objec thông qua `<CreateTodoForm />`. Chúng ta cũng thiết lập giá trị `completed = false` và sử dụng thư viện `uuid()` để tạo ra một unique id cho todo mới. và gọi `updateTodos` để append `newTodo` vào mạng `todos` hiện tại.

Phần cuối cùng trả về mảng todos và refer đến 2 function: `addTodos` và `setTodoCompleted`. 

`<App />` Component

```JS
import React from 'react';
import CreateTodoForm from './CreateTodoForm';
import useTodos from './useTodos';
import './App.css';

const App = () => {
	const [todos, addTodo, setTodoCompleted] = useTodos();

	return (
	  <div className="App">
	    <div className="todo-container">
	    	<h2>Your Todos</h2>
	    	<hr />

	    	{
	    		todos.map(todo => (
	    			<div className="todo">
	    				<p>{todo.label}</p>

	    				<input
	    					type="checkbox"
	    					checked={todo.completed}
	    					onChange={() => setTodoCompleted(todo.id, !todo.completed)}
	    				/>
	    			</div>
    			))
	    	}
	    </div>
    	<CreateTodoForm createNewTodo={addTodo} />
	  </div>
	);
};

export default App;


```

`App` Component sẽ gắn kết tất cả lại với nhau. Chúng ta sẽ nối các items trong `todos` và render ra mỗi items một label và một checkbox. Chúng sẽ thực hiện xác nhận đánh dấu xử lý todos hoàn thành với sự kiện `onChange` gọi tới function `setTodoCompleted` trong `setTodoCompleted`.

Cùng làm đẹp chút form ứng dụng với các style cơ bản sau:

**`App.css`**

```CSS
.App {
  padding: 32px;
}
.todo {
  display: flex;
  padding: 8px;
  margin: 8px;
  background-color: whitesmoke;
}
.todo p {
  margin: 0;
  margin-right: 16px;
}
.create-todo-form {
  text-align: center;
}
.create-todo-form button {
  margin: 5px;
}
```

Mọi thứ đã sẵn sàng, chúng ta sẽ chạy ứng dụng để kiểm tra xem nhé.

### Deploying as a Chrome Extension
Mở `public/manifest.json` và cấu hình thông tin cho ứng dụng như sau:
```JSON
{
  "short_name": "TodoApp",
  "name": "TodoApp Sample",
  "manifest_version": 2,
  "browser_action": {
    "default_popup": "index.html",
    "default_title": "TodoApp"
  },
  "permissions": [
    "storage"
  ],
  "version": "1.0"
}

```
Thuộc tính `browser_action.default_popop` sẽ đánh dấu chỉ mục main page, trường hợp phổ biến sẽ là `index.html`.
 Tiếp theo chúng ta sẽ build ứng dụng với `npm run build` từ thư mục root của app.
 
 Mở Chrome và nhập địa chỉ  `chrome://extensions`. Bật chế độ **`Developer Mode`** ở trên cùng bên phải cửa sổ trình duyệt và click vào `Load Unpacked` ở bên trái. 
 
 Tìm đến thư mục `build/` và chọn select. Ngay sau đó Extension của bạn sẽ xuất hiện trong danh sách.
 
 
**Lưu ý:** Ứng dụng có thể không hoạt động. Chính sách của Google Chrome ngăn chặn các extension thực thi nội tuyến. Để giải quyết vấn đề này, chúng ta cần thêm dòng này vào `manifest.json`:
```
"content_security_policy": "script-src 'self' '<your-sha>'; object-src 'self'"
```

Nếu extension của bạn gặp lỗi, quay lại `chrome://extensions` và click vào `Errors` sẽ nhìn thấy dòng chữ `Refused to execute inline script...`. Rebuild lại ứng dụng và load lại bên trong thư viện tiện ích chrome `Load unpacked`.

![](https://images.viblo.asia/a83d1589-363e-4b13-9da8-009c4d1cefc9.png)

Chúng ta cùng xem thành quả nhé:
![](https://images.viblo.asia/5fbde4a5-d868-4d51-86cf-01b700f06c2f.png)
Và bây giờ chúng ta đã có thể tự tạo một Google Chrome extension. Thế giới đã trong tay bạn hãy cùng phát triển những ứng dụng công nghệ hay nhé. Cảm ơn đã theo dõi bài viết này. Mọi đóng góp sẽ được ghi nhận và lưu ý cho những bài viết sau.

Thanks and Best Regards

> Tài liệu tham khảo
> 
> https://medium.com/javascript-in-plain-english/creating-a-todo-chrome-extension-with-react-custom-hooks-and-local-storage-f8f8d8910ee