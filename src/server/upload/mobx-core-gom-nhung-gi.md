Xin chào, tiếp tục chạy cronjob viết bài report hàng tháng thì mình trở lại với series Mobx và Mobx trong React. Trong bài viết này, mình sẽ đem đến cho các bạn cái nhìn khái quát về những thứ cốt lõi hiện được sử dụng Mobx, những thứ giúp bạn xây dựng store Mobx và cách sử dụng chúng để tương tác với React UI một cách dễ hiểu và đơn giản nhất. Let's go!
# Mobx core

## Observable state

- Về cơ bản, state của Mobx không có gì khác biệt so với React hay Redux. Điểm khác biệt cũng như là điểm nổi bật là "under the hood", Mobx sử dụng cơ chế Proxy object giúp bạn có thể mutate (thay đổi) trực tiếp state và Mobx sẽ tự kiểm tra những sự thay đổi đó để trigger việc re render UI.

## Actions

- Tương tự như những state management khác, Mobx cũng sử dụng concept action để đại diện cho những function được sử dụng để update giá trị cho state. Hiểu đơn giản, khi 1 event như click vào button, thay đổi value của input thì sẽ trigger 1 action.

## Computeds

- Computeds được trả về từ hàm getter, thường được sử dụng để tính toán hoặc transform dữ liệu từ 1 hoặc nhiều observable state
- Computeds sẽ chỉ được trigger lại nếu 1 trong những observable state thay đổi. Điều này khá giống với useMemo() của React, giúp tăng performance khi không tạo ra quá nhiều reference cho function cũng như tránh được việc re render khi không cần thiết.
- Có một lưu ý là trong compoteds không nên thực hiện side effects hay update state và cũng không nên tạo state mới trong computeds.

## Reactions

- Một trong những vũ khí lợi hại giúp Mobx trở thành một ứng cử viên sáng giá cho vị trí state management.
- Hiểu một cách đơn giản nhất thì những reaction functions mà Mobx cung cấp hoạt động tương tự như useEffect() của React vậy.
- Bạn có thể sử dụng reaction functions để "quan sát" 1 state bất kì trong store, từ đó thực hiện implement logic dựa trên những sự thay đổi đó.
- Tuy nhiên, không nên thực hiện việc call API trong reaction function, nên useEffect() vẫn còn rất nhiều tác dụng nhé =)).
- Mobx cung cấp 1 số reaction functions như:
    - autorun(): Được trigger khi có bất kì 1 state nào thay đổi.
    - reaction(): Giống với autorun() nhưng sẽ nhận vào tham số là 2 function. Tham số thứ nhất (data function) sẽ được reaction theo dõi và dùng giá trj trả về của function này cho tham số thứ 2 (effect function). Chỉ khi data function trả về 1 data mới thì effect function mới được trigger và effect function sẽ không chạy ngay khi init store.
    - when(): when() cũng nhận vào tham số là 2 function. Tham số thứ nhất (predicate function) được when theo dõi và function này sẽ trả về boolean. Nếu predicate function trả về giá trj là true thì function thứ 2 (effect function) được trigger và chỉ trigger duy nhất 1 lần đầu  tiên khi predicate trả về true.

# Implement Mobx trong React

## Khởi tạo 1 store Mobx đơn giản

```jsx
// TaskStore.js
import {
  makeObservable,
  observable,
  action,
  computed,
  when,
  reaction,
  autorun
} from "mobx";
import shortid from "shortid";

class TaskStore {
  tasks = [];
  constructor() {
    makeObservable(this, {
      tasks: observable,
      totalTask: computed,
      addNewTask: action.bound,
      removeTask: action.bound
    });

    autorun(() => console.log("run each state change", this.tasks.slice()));

    reaction(
      () => this.totalTask,
      (totalTask) => {
        console.log(totalTask);
      }
    );

    when(
      () => this.totalTask >= 3,
      () => console.log("3 task reached")
    );
  }

  get totalTask() {
    return this.tasks.length;
  }

  addNewTask(task) {
    this.tasks.push({ id: shortid.generate(), value: task });
  }

  removeTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}

const taskStore = new TaskStore();

export default taskStore;
```

- Store của Mobx thường được khởi tại bằng 1 class (có thể để phục vụ mục đích trong tương lai sẽ chuyển toàn bộ các functions, annotations hiện tại sang decorators).
- Trong khuôn khổ bài viết này, chúng ta sẽ sử dụng makeObservable() để khai báo những thành phần trong store như:
    - Observable state: tasks.
    - Action: addNewTask() và  removeTask()
    - Computed: totalTask().
    - Reaction: autorun(), reaction() và when().
- Ở đây, mình sẽ giải thích thêm về cách những reactions trên hoạt động:
    - autorun(): Sẽ chạy khi init store và thêm hoặc remove value trong state tasks. 1 lưu ý nhỏ, observable array state thực chất không có type là array, nên nếu kiểm tra với Array.isArray() sẽ trả về fail. Cách lấy ra real array trong observable array thì có thể dùng method slice() để autorun có quan sát real array này. Tham khảo thêm về observable array bạn có thể tham khảo thêm [ở đây](https://mobx.js.org/api.html#observablearray).
    - reaction(): Mỗi khi getter totalTask trả về 1 giá trị mới thì sẽ thực hiện console log ra giá trị mà getter này trả về trước đó.
    - when(): Tuy điều kiện của predicate function kiểm tra khi getter totalTask ≥ sẽ thực hiện chạy effect function console log ra dòng text 3 task reached. Tuy nhiên, when chỉ chạy 1 lần duy nhất nên có thể hiểu khi totalTask trả về giá trị là 3 thì reaction when() cũng đã chạy xong, không thực hiện bất kì lần chạy nào nữa.
- Một lưu ý nhỏ, khi khai báo 2 actions addNewTask() và removeTask(), mình có sử dụng 1 annotation của action là bound để thực hiện bind this vào 2 action này (Mobx cũng như React không thực hiện việc auto bind this cho method). Nếu bạn đã code React từ thời class based component thì khá giống với việc trong constructor của component thực hiện bind this cho method. Còn nếu không muốn gọi bound thì chuyển action về dạng arrow function như sau:

```jsx
addNewTask = (task) => {
    this.tasks.push({ id: shortid.generate(), value: task });
  };

removeTask = (id) => {
  this.tasks = this.tasks.filter((task) => task.id !== id);
};
```

- Như đã nói ở trên cũng như ở trong bài viết trước, ta có thể thấy trong các actions đang mutate trực tiếp state tasks. Ví dụ như addNewTask() với Redux khi viết 1 cách tường minh các bước thì sẽ như sau:

```jsx
  addNewTask(task) {
		const newTask = { id: shortid.generate(), value: task };
		const newTasks = [...this.tasks, newTask];
    return newTasks;
  }
```

- Nhìn thì cũng không khác biệt quá nhiều vì cấu trúc của state tasks vẫn còn khá đơn giản. Redux cần thực hiện copy lại state rồi mới thực hiện thay đổi trong đó. Tuy nhiên, khi xử lý nested state thì việc copy state sẽ rất phức tạp, nhìn khá đau đầu...

## Reactive React components với Mobx

```jsx
// App.js
export default function App() {
  return (
    <div>
      <TaskForm store={taskStore} />
      <TaskList store={taskStore} />
    </div>
  );
}
```

- Trước hết cần thực hiện truyền store đã khởi tạo ở trên vào components như 1 props. Cách này có thể sử dụng cho những app nhỏ gọn tuy nhiên khi có quá nhiều components thì việc này khá mất thời gian. Do đó, có thể tạo 1 custom hook nho nhỏ để khiến việc này dễ dàng hơn:

```jsx
// hooks.js
import { useContext } from "react";
import { MobXProviderContext } from "mobx-react";

const useStore = () => {
  const { store } = useContext(MobXProviderContext);
  return store;
};

export default useStore;
```

- Mục đích của useStore hook là để tạo ra 1 context chứa store của Mobx sau đó có thể gọi ở bất kì component nào. Nên tiếp theo cần thực hiện provide context và refactor lại phần truyền store vào component:

```jsx
// index.js
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import taskStore from "./TaskStore";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Provider store={taskStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  rootElement
);
```

```jsx
//App.js
export default function App() {
  return (
    <div>
-      <TaskForm store={taskStore} />
-      <TaskList store={taskStore} />

			 <TaskForm />
       <TaskList />
    </div>
  );
}
```

- Implement component components:

```jsx
// TaskList.js
import React from "react";
import { observer } from "mobx-react";
import useStore from "./hooks";

const TaskList = () => {
  const { tasks, removeTask, totalTask } = useStore();
  const onRemoveTask = (id) => {
    removeTask(id);
  };

  return (
    <div>
      <p>Total tasks: {totalTask}</p>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} onClick={onRemoveTask.bind(null, task.id)}>
            {task.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default observer(TaskList);
```

```jsx
// TaskForm.js
import React, { useState } from "react";
import useStore from "./hooks";

const TaskForm = () => {
  const { addNewTask } = useStore();
  const [inputValue, setInputValue] = useState("");

  const onChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const onAddNewTask = () => {
    if (!inputValue) return;

    addNewTask(inputValue);
    setInputValue("");
  };

  return (
    <div>
      <input onChange={onChange} value={inputValue} />
      <button onClick={onAddNewTask}>Add task</button>
    </div>
  );
};

export default TaskForm;
```

- Sử dụng hook để lấy ra những properties, method của store. Lưu ý, để re render component khi state thay đổi trong component TaskList thì cần sử dụng HOC observer của mobx-react để giúp Mobx có thể quan sát quan sát được việc thay đổi này.
- Với computed totalTask thì có thể gọi như 1 biến bình thường.

# Chốt

Trên đây là 1 demo rất nhỏ để các bạn có thể hình dung ra việc xử lý state với Mobx trong React, 1 số điểm cần lưu ý:

- Nếu sử dụng makeObservable() và action là các normal function thì cần sử dụng annotation bound bind this cho action (computed thì không có vấn đề gì).
- Với những components sử dụng state của mobx thì cần dùng HOC observer của mobx-react để giúp Mobx lắng nghe những thay đổi của state, từ đó trigger re render component khi state thay đổi.
- Nên sử dụng React context tất cả các component đều có thể access store.

Ở bài viết tiếp theo, mình sẽ nói về việc xây dựng cấu trúc khi bạn muốn tạo nhiều store và xử lý việc call API trong Mobx. Nếu bạn cảm thấy Mobx là 1 chủ đề thú vị thì hãy cho mình 1 upvote, comment để chúng ta cùng trao đổi thêm và theo dõi bài viết tiếp theo của mình nhé.

Code demo: https://codesandbox.io/s/demo-mobx-lj1gz?file=/src/TaskList.js

Happy coding!

# Tài liệu tham khảo
[https://mobx.js.org/README.html](https://mobx.js.org/README.html)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)