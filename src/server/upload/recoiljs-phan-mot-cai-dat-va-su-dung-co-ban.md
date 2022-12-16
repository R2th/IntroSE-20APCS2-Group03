### Tại sao lại xuất hiện RecoilJS  
**Redux** dường như là thư viện quản lý **state** phổ biến và mạnh mẽ nhất trong hệ sinh thái **react**, **mobx** cũng thật sự phổ biến và ấn tượng không kém, **Context** của **react** cũng là một công cụ không tệ, vậy tại sao **facebook** lại phát triển **recoil** ?. Sau đây là một số ưu điểm của **recoil** so với **redux**:  
     1. Tạo ra một công cụ quản lý **state** đơn giản, với cú pháp trực quan giống như **state** đơn thuần của **react**.  
     2. Hỗ trợ quản lý **state** bất đồng bộ.  
     3. Cung cấp khả năng lưu trữ **state** lâu dài (**persist state**).  
Chúng ta sẽ cùng tìm hiểu lần lượt trong **series** này nhé.  

### Các thành phần chính của RecoilJS
#### Atom  
**Recoil** lưu trữ dữ liệu theo các đơn vị gọi là **atom**, **React component** có thể truy cập tới dữ liệu chứa trong **atom** và thay đổi giá trị của dữ liệu.  **atom** yêu cầu 2 tham số là mã định danh duy nhất (**unique key**) và giá trị mặc định của dữ liệu.
```js
const count = atom({
  key: 'count',
  default: 0,
})
```

#### RecoilRoot  
Để có thể sử dụng **recoil**, ứng dụng cần được bao bọc bởi một **component** có tên là **RecoilRoot**, chúng ta sẽ tìm hiểu thêm về **api** này hơn sau này, trước mắt cứ hiểu nó như **Provider** trong **redux**, và không cần truyền vào **store** nào cả.  
```js
  <RecoilRoot>
    <App />
  </RecoilRoot>
```
#### Selectors 
**Selectors** trả về dữ liệu đã được tính toán (giống với thư viện **reselect** trong hệ sinh thái **redux**). Nếu bạn chưa sử dụng **reselect**,chúng ta sẽ tìm hiểu khái niệm dữ liệu tính toán thông qua ví dụ phía sau đây.  
**Selectors** nhận vào hai tham số, mã định danh duy nhất và hàm **get** trả về dữ liệu được tính toán.  
#### Hooks  
**Component** sẽ tương tác với dữ liệu thông qua các **hooks** được cung cấp bởi **recoil**, chúng ta sẽ tìm hiểu kĩ hơn ở phần sau. 
### Ứng dụng Todo đầu tiên  
Lý thuyết sơ như vậy là đủ rồi, chúng ta cùng dùng thử **recoil** bằng ứng dụng cơ bản **todo app** nhé:  
#### Cài đặt ứng dụng  
Sử dụng **create-react-app** để tạo ứng dụng **react** và cài đặt thêm thư viện **recoil**
```
npx create-react-app recoil-todo
```
sau đó là
```
npm install recoil 
or
yarn add recoil
```
Cấu trúc thư mục của chúng ta sẽ như sau
```
src
    index.js
    state.js
    TodoList.jsx
    TodoForm.jsx
    TodoItem.jsx
```
#### Khởi tạo component root  
Chúng ta sẽ tạo ra một **component App** sau đó đặt nó trong **RecoilRoot** như sau:  
```js
import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

function App() {
    return (
      <div className="todo-app">
        <TodoForm />
        <TodoList />
      </div>
    );
}

ReactDOM.render(
    <RecoilRoot>
        <App />
    </RecoilRoot>,
    document.getElementById('root')
);
```

#### Khởi tạo dữ liệu
Như đã nói chúng ta sẽ lưu dữ liệu theo các **atom**, giả sử chúng ta có một dữ liệu là danh sách các **todo**, được khởi tạo bằng **atom** như sau:  
**state.js**
```js
import { atom } from 'recoil';

const TODO_LIST = 'todoListData';

const todoListState = atom({
  key: TODO_LIST,
  default: []
});

export { todoListState };
```
Ở đây mình có khai báo **key** của **state** bằng một **constant** để dễ quản lý, vì lưu ý rằng **key** của mỗi **atom** phải là duy nhất. Việc khởi tạo dữ liệu chỉ đơn giản như vậy thôi, không có gì phức tạp phải không?  
#### Render dữ liệu ra component  
Oke, chúng ta đã khởi tạo được dữ liệu, điều cơ bản đầu tiên là làm sao **component** có thể nhận vào dữ liệu đó, trong **redux** thì ta dùng hàm **connect** với hai tham số **kinh điển mapStateToProps và matchDispatchToProps** gây khó khăn cho biết bao nhiêu thế hệ **dev** khi tiếp xúc với **redux** (nói vui vậy thôi chứ mình dùng **redux** rất nhiều và vẫn rất thích **redux** nhé, ngoài ra **react-redux** cũng có các **hooks** thay thế hàm **connect** rồi).  
Như mình nói ở trên, chúng ta sẽ sử dụng toàn bộ bằng các **hooks**. Cùng bắt đầu với **hook** đầu tiên trong **TodoList.jsx** nhé:  
```js
import React from 'react';
import { useRecoilValue } from 'recoil';
import { todoListState } from './state';
import TodoItem from './TodoItem';

function TodoList() {
  const todoList = useRecoilValue(todoListState);
  
  return (
      <ul>
        {todoList.map(todo => (
            <TodoListItem data={todo} key={todo.id} />
        ))}
      </ul>
  );
}

export default TodoList;
```
Khá là dễ phải không, **import** **state** vào và chỉ cần dùng một **hook** là có thể nhận được luôn giá trị của **state**. Có thể dễ dàng hiểu rằng **useRecoilValue** cung cấp khả năng truy cập vào dữ liệu của một **atom** và sử dụng nó trong **component**.

#### Tạo một todo mới  
Sau khi làm một công việc đơn giản là nhận dữ liệu và **render** ra, chúng ta tiếp tục chuyển sang công việc tiếp theo, đó là tiến hành tạo một **todo** mới, việc này sẽ đòi hỏi cần phải thay đổi giá trị của **state**. Được thực hiện trong **TodoForm**:
```js
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todoListState } from './state';

function TodoForm() {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);
  
  function handleChange(e) {
    setInputValue(e.target.value);
  }
  
  function handleSubmit(e) {
   e.preventDefault();
   const getValue = inputValue.trim();
   // check if value exists
   if (getValue) {
     setTodoList((oldTodoList) => {
         return [
            ...oldTodoList,
            {
              id: Math.random().toString(),
              content: getValue,
              isDone: false
            }
          ];
     });
     
     // reset input value
    setInputValue('');
   }
  }
  
  return (
      <form onSubmit={handleSubmit}>
        <input value={inputValue} onChange={handleChange} />
        <input type="submit" value="Create Todo" />
      </form>
  );
}

export default TodoForm;
```
Chúng ta sử dụng một **hook** tiếp theo được cung cấp bởi **recoil**, cho phép nhận về **function** giúp thay đổi giá trị dữ liệu trong **atom**. **Function** này nhận vào một **callback** với tham số là giá trị hiện tại (trước khi thay đổi) của **state** và trả về giá trị mới của **state** đó. Ở đây ta thấy **component TodoForm** không cần **render** giá trị của **todoListState** mà chỉ cần thay đổi nó, vì vậy ta sử dụng **useSetRecoilState** thay vì **useRecoilValue**.   
Nếu **component** cần làm cả hai việc, **render** và thay đổi **state**, chúng ta không cần dùng cả 2 **hook** cùng  một lúc, mà **recoil** đã cung cấp sẵn một **hook** có tên là **useRecoilState**, trả về cả **todoList** và hàm **setTodoList** với cú pháp như sau:
```js
import { useRecoilState } from 'recoil'
import {todoListState} from './state'
...
// look like react useState :D
const [todoList, setTodoList] = useRecoilState(todoListState)
...
```

#### Cập nhật Status của các task đã tạo.
Mở rộng một chút ứng dụng, chúng ta sẽ thêm sự kiện, khi **click** vào một **TodoItem** thì sẽ đánh dấu là hoàn thành, tương tự, ta sẽ sử dụng **useSetRecoilState** như ở trên:
```js
import React from 'react'
import { todoListState } from './state'
import { useSetRecoilState } from 'recoil'

function TodoItem({ data }) {
  const setTodoItem = useSetRecoilState(todoListState);

  function handleComplete() {
    if (!data.isDone) {
      setTodoItem((oldTodoList) => {
        return oldTodoList.map(todo => {
          if (todo.id === data.id) return {...todo, isDone: true}
          return todo
        })
      })
    }
  }

  const className = data.isDone ? 'todo-item done' : 'todo-item'
  const taskTitle = data.isDone ? `${data.content} => done` : data.content

  return (
    <li onClick={handleComplete} className={className}>
      <data>{taskTitle}</data>
    </li>
  );
}

export default TodoItem;
```
Thêm một chút **css** và kiểm tra thành quả nào  
![](https://images.viblo.asia/cd771cc1-204c-4ac2-a3f8-241d6c0259bc.PNG)
#### Một vài nhận xét ban đầu 
Việc khởi tạo **state** khá là ngắn gọn ngắn gọn và tương đối tương đồng với **useState** của **React**, khác biệt là **state** có thể được truy cập ở bất cứ đâu, bên trong **RecoilRoot**.Tương tác giữa **component** và **state** thật sự đơn giản, mình chưa gặp khó khăn nào với cú pháp của **recoil** vì nhìn khá là tường minh và dễ hiểu. Tuy nhiên đây mới chỉ là ứng dụng **todo list** đơn giản, chúng ta cần kiểm chứng thêm khả năng của **recoil** với những ứng dụng lớn hơn, đồng thời đi sâu hơn vào các phần khác như xử lý **async** và **persist** để thấy liệu rằng **recoil** có phải là lựa chọn có thể thay thế **redux** hay **mobx**.
> Tham khảo [recoiljs documentation](https://recoiljs.org/)   
> Code demo trong bài viết: https://github.com/cuongnh-1139/recoil-demo