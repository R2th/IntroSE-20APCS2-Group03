Như chúng ta đã biết quản lí **state** trong react đôi lúc rất khó khăn đó là lí do tại sao chúng ta sử dụng **redux** hoặc một số thư viện khác như **mobx** để giúp việc quản lí state trở nên dễ dàng hơn. **Recoil** cũng là một thư viện quản lí state được mô phỏng chặt chẽ theo các API của **react hook**. Nó cho phép chúng ta khai báo state bằng **atom** và tính toán state bằng **selector**. Nếu bạn muốn tìm hiều về những hạn chế mà team Facebook phải đối mặt, và cách họ giải quyết bằng **recoil** thì có thể theo dõi trên [video](https://www.youtube.com/watch?v=_ISAA_Jt9kI&ab_channel=ReactEurope) này.

Một lưu ý quan trọng: Mặc dù nhiều công ty bao gồm cả Facebook đang sử dụng recoil, nhưng nó chỉ đang ở trạng thái thử nghiệm. Các API và chức năng của nó có thể thay đổi.

Trong bài viết này, mình sẽ hướng dẫn các bạn chuyển từ **redux** sang **recoil** đồng thời so sánh sự khác biệt giữa chúng.  Mình sẽ làm việc với ví dụ TodoMVC từ [Github](https://github.com/reduxjs/redux/tree/master/examples/todomvc) của redux. App của chúng ta sẽ hoạt động như thế này

![](https://images.viblo.asia/f55e9186-ee3b-49e0-85c0-1ed8c1507179.gif)

##### Cài đặt recoil
Bước đầu tiên để sử dụng bất kì một thư viện Javascript nào là thêm nó vào project.  Bạn có thể tham chiếu đến thư viện bằng HTML ``<script />`` hoặc cài đặt thông qua ``npm`` , ``yarn``. 
Tương tự như redux, chúng ta sẽ bọc component ``root`` bằng một provider do recoil cung cấp ``<RecoilRoot />``. 

Mở ``src/index.js`` và import thư viện recoil.

```
import { RecoilRoot } from "recoil";
```

Và update hàm render như sau
```
render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.getElementById("root")
);
```

##### Khai báo và cập nhật state

Để khai báo state chúng ta dùng **atom**. Trong ví dụ Todo, chúng ta cần lưu trữ một danh sách các công việc cần làm, mình sẽ tạo một **atom** với một state mặc định. Tạo một thư mục ``recoil`` và một file ``todos`` với nội dung như sau

```
import { atom } from "recoil";

export const todos = atom({
  key: "todos",
  default: [],
});
```

Bây giờ, mở ``component/Header.js`` và sửa code với nội dung

```
import React from "react";
import TodoTextInput from "./TodoTextInput";
import { useSetRecoilState } from "recoil";
import { todos } from "../recoil/todos";

const Header = () => {
  const setTodos = useSetRecoilState(todos);

  const save = (text) => {
    if (text.length !== 0) {
      setTodos((todos) => [
        ...todos,
        {
          id: Date.now(),
          text,
          completed: false,
        },
      ]);
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput
        newTodo
        onSave={save}
        placeholder="What needs to be done?"
      />
    </header>
  );
};

export default Header;
```

``component`` này sẽ hiển thị một ``text input`` dùng cho việc nhập công việc cần làm và lưu trữ chúng. Để thêm mới một công việc, chúng ta cần một ``function`` để update danh sách công việc nơi đã tạo state ``todos``. Chúng ta dùng hook ``useSetRecoilState`` để lấy một làm ``setter`` được sử dụng trong hàm ``save()``.

Nếu bạn so sánh nó với ``redux``, thì bạn sẽ không cần tạo ``action creator`` và ``reducers`` để update state và sau đó kết nối  ``component`` với ``redux store`` và ``dispatch action``. Trong ``Recoil`` bạn sử dụng atom để lưu state, và dùng các hook API để tương tác với state.  Nếu bạn là người mới sử dụng React và hiểu về hooks API, thì sẽ nhanh chóng nắm bắt được Recoil vì nó được mô phỏng chặt chẽ với API của React, không giống như Redux - bạn cần hiểu luồng dữ liệu một chiều của nó.
##### Tính toán state
Phần tiếp theo chúng ta sẽ update ``<MainSection />``. Nó hiển thị một đầu vào để đánh dấu tất cả các việc cần làm là đã hoàn thành và cũng có hai thành phần bổ sung mà chúng ta sẽ nói đến sau. Mơ đường dẫn ``componenrs/MainSection.js`` và update code với nội dung như sau

```
import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import Footer from "./Footer";
import VisibleTodoList from "../containers/VisibleTodoList";
import { completedTodoCount, todos } from "../recoil/todos";

const MainSection = () => {
  const completedCount = useRecoilValue(completedTodoCount);
  const [todoList, setTodoList] = useRecoilState(todos);
  const todosCount = todoList.length;

  const clearCompleted = () => {
    setTodoList((previousTodos) =>
      previousTodos.filter((todo) => todo.completed === false)
    );
  };

  const completeAllTodos = () =>
    setTodoList((previousTodos) => {
      const areAllMarked = previousTodos.every((todo) => todo.completed);
      return previousTodos.map((todo) => ({
        ...todo,
        completed: !areAllMarked,
      }));
    });

  return (
    <section className="main">
      {!!todosCount && (
        <span>
          <input
            className="toggle-all"
            type="checkbox"
            checked={completedCount === todosCount}
            readOnly
          />
          <label onClick={completeAllTodos} />
        </span>
      )}
      <VisibleTodoList />
      {!!todosCount && (
        <Footer
          completedCount={completedCount}
          activeCount={todosCount - completedCount}
          onClearCompleted={clearCompleted}
        />
      )}
    </section>
  );
};

export default MainSection;
```

Những gì bạn thấy ở trên là thay vì kêt nối với store bằng ``mapStateToProps`` và ``mapDispatchToProps``  như ``redux`` thì chúng ta sẽ dùng hooks API ``useRecoilValue`` và ``useRecoilState``. ``useRecoilValue`` dùng để đọc nội dung của state, trong trương hợp này là một selector ``completedTodoCount``.
Chúng ta sẽ khai báo một hàm ``completedTodoCount``. Hàm này sẽ là hàm tính toán từ state, vì vậy nó được gọi là ``selector`` trong ``recoil``. Mở **recoil/todos.js**  và import ``selector`` từ module ``recoil``.
```
import { atom, selector } from "recoil";
```

Sau đó khai báo ``selector`` như bên dưới:

```
export const completedTodoCount = selector({
  key: "completedTodoCount",
  get: ({ get }) => {
    const list = get(todos);

    return list.reduce(
      (count, todo) => (todo.completed ? count + 1 : count),
      0
    );
  },
});
```

Để khai báo một ``selector`` ban gọi function ``selector()`` với một object gồm tên của trạng thái và function ``get()`` sẽ tính toán và trả về một giá trị. Function này sẽ nhận một đối tượng có hàm ``get()`` có thể sử dụng để lấy dữ liệu từ các ``atom`` hoặc ``selector`` khác.

##### Lọc dữ liệu todos

Tới đây, chúng ta đã nắm được hầu hết các khái niệm cơ bản về ``Recoil`` và bạn có thể thấy nó khác với Redux như thế nào. Phần còn lại của bài viết là làm cho ứng dụng hoạt động đầy đủ các chức năng bằng cách sử dụng recoil.
``<FilterLink />`` là component tiếp theo chúng ta sẽ triển khai.  Mở **containers/FilterLink.js** và sửa lại code như dưới:

```
import React from "react";
import { useRecoilState } from "recoil";
import Link from "../components/Link";
import { visibilityFilter } from "../recoil/todos";

export default ({ filter, children }) => {
  const [visibility, setVisibilityFilter] = useRecoilState(visibilityFilter);
  const setFilter = () => setVisibilityFilter(filter);

  return (
    <Link
      active={filter === visibility}
      setFilter={setFilter}
      children={children}
    />
  );
};
```
Mở **recoil/todos.js** và thêm function như bên dưới

```
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
} from "../constants/TodoFilters";

export const visibilityFilter = atom({
  key: "visibilityFilter",
  default: SHOW_ALL,
});

```

##### Hiển thị todos
Điều tiếp theo, là hiển thị các công việc dựa trên bộ lọc. Để làm được điều đó, chúng ta sẽ thêm mới một ``selector`` và sửa component ``VisibleTodoList``.  Trong khi bạn vẫn đang ở **recoil/todos.js** , hãy thêm mới một selector như sau
```
export const filteredTodos = selector({
  key: "filteredTodos",
  get: ({ get }) => {
    const filter = get(visibilityFilter);
    const list = get(todos);

    switch (filter) {
      case SHOW_COMPLETED:
        return list.filter((t) => t.completed);
      case SHOW_ACTIVE:
        return list.filter((t) => !t.completed);
      default:
        return list;
    }
  },
});
```

Mở **containers/VisibleTodoList.js** và sửa như sau

```
import React from "react";
import TodoList from "../components/TodoList";
import { filteredTodos, todos } from "../recoil/todos";
import { useRecoilValue, useSetRecoilState } from "recoil";

const VisibleTodoList = () => {
  const filteredTodoList = useRecoilValue(filteredTodos);
  const setTodos = useSetRecoilState(todos);

  const completeTodo = (todoId) => {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (todoId) => {
    setTodos((previousTodos) =>
      previousTodos.filter((todo) => todo.id !== todoId)
    );
  };

  const editTodo = (todoId, text) => {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === todoId ? { ...todo, text } : todo
      )
    );
  };

  return (
    <TodoList
      filteredTodos={filteredTodoList}
      actions={{ completeTodo, deleteTodo, editTodo }}
    />
  );
};

export default VisibleTodoList;
```

OK! vậy là chúng ta đã biết được một số khái niệm cơ bản của ``recoil`` trong việc chuyển cách sử dụng redux sang recoil thông qua ví dụ todos. Mình nghĩ sau này thư viện sẽ trở thành trending nếu nó hoàn thiện hơn, nên việc tìm hiểu nó trước sẽ là một lợi thế :v. Còn việc nó có thể thay thế redux hay một số thư viện quản lí state khác hay không thì mình không nói trước được :v. Cuối cùng, cảm ơn mọi người đã theo dõi bài viết. (thanks)

Bài viết có tham khảo tại: [How to switch from redux to recoil](https://dev.to/pmbanugo/how-to-switch-from-redux-to-recoil-22op)