# Giới thiệu về MobX và React trong mười phút.
MobX rất đơn giản, có thể mở rộng (scalable) và là một giải pháp để quản lý trạng thái (state management). Hướng dẫn sau sẽ giúp bạn hiểu khái niệm cơ bản của MobX trong mười phút. MobX là một thư viện độc lập, nhưng hầu hết mọi người sử dụng nó với React và hướng dẫn sau sẽ tập trung vào sự kết hợp đó.

### Ý tưởng cốt lõi (The core idea)

**Trạng thái** (State) là trái tim của mỗi ứng dụng và ở đây không có con đường nào tạo ra nhiều lỗi, không thể quản lý ứng dụng nhanh hơn việc tạo ra một trạng thái không nhất quán (inconsistent state) hoặc một state không đồng bộ với các biến cục bộ xung quanh. Do đó có nhiều giải pháp quản lý state bằng cách cố gắng hạn chế các cách mà bạn có thể sửa đổi state, ví dụ như làm state bất biến (state immutable). Nhưng các cách này lại phát sinh vấn đề mới, dữ liệu cần được chuẩn hóa, tính toàn vẹn tham chiếu có thể không còn được đảm bảo và nó không thể sử dụng các khái niệm mạnh mẽ như prototype.

**MobX** có thể làm state management trở nên đơn giản bởi giải quyết vấn đề cốt lõi: không thể ạo ra trạng thái không nhất quán. Để làm được điều này thật đơn giản: đảm bảo mọi thứ có thể được dẫn xuất từ trạng thái ứng dụng một cách tự động.

**MobX xử lý ứng dụng của bạn như sau**
![](https://images.viblo.asia/c3813d3c-72b2-456d-969b-1ff1efa27bb3.png)

1. Đầu tiên, ở đây là **Application State**. Nhóm các Objects, array, primitives, tham chiếu tới các model của ứng dụng. Những giá trị này được coi như những "ô dữ liệu" (data cell) của ứng dụng.
2. Kế tiếp là **Phái sinh** (**Derivations**). Đơn giản nhất, các giá trị được tính toán tự động từ application state. Những phái sinh (được sinh ra từ cùng một nguyên mẫu). Các bạn có thể hiểu là MobX lưu giữ giá trị gốc, và giá trị mình lấy ra hiển thị là giá trị sao chép từ giá trị gốc đó.
3. **Phản ứng** ( **Reactions**) cũng tương tự như phái sinh. Điểm khác nhau của những hàm này là chúng không tạo ra giá trị. Thay vào đó, chúng có thể tự động thực thi vài tác vụ. Thường là liên quan tới I/O. Chúng đảm bảo DOM luôn được cập nhật hoặc thực hiện các request đúng thời điểm.
4. Cuối cùng là **hành động** (**Actions**). Hành động là cách duy nhất để thay đổi state. MobX muốn đảm bảo tất cả sự thay đổi của ứng dụng được gây ra bởi hành động được tự động xử lý bởi Derivations và Reactions. Bất đồng bộ và không có vấn đề gì.
Ví dụ xây dựng một lớp lưu giữ ghi chú đơn giản.
Để rõ ràng hơn về khái niệm cơ bản của MobX ta bắt đầu với một lớp lưu giữ ghi chú cơ bản. 
```
class TodoStore {
	todos = [];

	get completedTodosCount() {
    	return this.todos.filter(
			todo => todo.completed === true
		).length;
    }

	report() {
		if (this.todos.length === 0)
			return "<none>";
		return `Next todo: "${this.todos[0].task}". ` +
			`Progress: ${this.completedTodosCount}/${this.todos.length}`;
	}

    addTodo(task) {
		this.todos.push({
			task: task,
			completed: false,
            assignee: null
		});
	}
}

const todoStore = new TodoStore();
```
Chúng ta vừa tạo một thể hiện của **todoStore** với một danh sách các todos. Bỏ thời gian ra tạo một vài objects cho **todoStore**. Để đảm bảo chúng ta biết những gì chúng ta làm ảnh hướng đến state thì sẽ gọi **todoStore.report** sau mỗi thay đổi và lưu lại nó. 

```
todoStore.addTodo("read MobX tutorial");
console.log(todoStore.report());

todoStore.addTodo("try MobX");
console.log(todoStore.report());

todoStore.todos[0].completed = true;
console.log(todoStore.report());

todoStore.todos[1].task = "try MobX in own project";
console.log(todoStore.report());

todoStore.todos[0].task = "grok MobX tutorial";
console.log(todoStore.report());
```

Thêm các reactive
Ở đây không có gì đặc biệt trong đoạn code ở trên. Nhưng sẽ ra sao nếu chúng ta không muốn gọi report trực tiếp như vậy, nhưng vẫn muốn nó được invoked khi có state thay đổi. **MobX** có thể làm nó cho bạn, nó tự động xử lý code dựa trên trạng thái. Như đoạn code bên dưới thì report sẽ tự động được gọi mỗi khi state thay đổi. Nhưng để đạt được điều đó thì TodoStore trở thành trạng thái được quan sát (observable) để **MobX** theo dõi sự thay đổi và làm nó.
Kể cả thuộc tính **completedTodosCount** có thể được dẫn xuất tự động từ todo list.  Bởi sử dụng **@observable** và **@computed** decorators chúng ta có thể giới thiệu đối tượng sau là có thể quan sát (**observable**).
```
class ObservableTodoStore {
	@observable todos = [];
    @observable pendingRequests = 0;

    constructor() {
        mobx.autorun(() => console.log(this.report));
    }

	@computed get completedTodosCount() {
    	return this.todos.filter(
			todo => todo.completed === true
		).length;
    }

	@computed get report() {
		if (this.todos.length === 0)
			return "<none>";
		return `Next todo: "${this.todos[0].task}". ` +
			`Progress: ${this.completedTodosCount}/${this.todos.length}`;
	}

	addTodo(task) {
		this.todos.push({
			task: task,
			completed: false,
			assignee: null
		});
	}
}


const observableTodoStore = new ObservableTodoStore();
```

### Ứng dụng vào React 
 Vậy là ta đã làm được một reactive để report. Tiếp theo ta xây dựng một giao diện cho report đó. React components thì không có reactive bên ngoài chúng. Thẻ **@observer** từ package **mobx-react** có thể sửa nó bởi bao đóng React.component  hàm render trong autorun, sẽ giữ cho component của bạn tự động được đồng bộ với state. Ý tưởng này không khác với cách chúng ta thực hiện report trước đây.
 Tiếp theo ta khai báo một vài components của React. MobX chỉ cần một thẻ **@observer** là đủ để đảm bảo mỗi thành phần sẽ được re-render khi data thay đổi. Bạn không cần phải gọi setState, bạn cũng không cần phải dùng các selector hay các HOC (higher order components). Đơn giản là các component đã trở nên thông minh hơn. 
```
@observer
class TodoList extends React.Component {
  render() {
    const store = this.props.store;
    return (
      <div>
        { store.report }
        <ul>
        { store.todos.map(
          (todo, idx) => <TodoView todo={ todo } key={ idx } />
        ) }
        </ul>
        { store.pendingRequests > 0 ? <marquee>Loading...</marquee> : null }
        <button onClick={ this.onNewTodo }>New Todo</button>
        <small> (double-click a todo to edit)</small>
        <RenderCounter />
      </div>
    );
  }

  onNewTodo = () => {
    this.props.store.addTodo(prompt('Enter a new todo:','coffee plz'));
  }
}

@observer
class TodoView extends React.Component {
  render() {
    const todo = this.props.todo;
    return (
      <li onDoubleClick={ this.onRename }>
        <input
          type='checkbox'
          checked={ todo.completed }
          onChange={ this.onToggleCompleted }
        />
        { todo.task }
        { todo.assignee
          ? <small>{ todo.assignee.name }</small>
          : null
        }
        <RenderCounter />
      </li>
    );
  }

  onToggleCompleted = () => {
    const todo = this.props.todo;
    todo.completed = !todo.completed;
  }

  onRename = () => {
    const todo = this.props.todo;
    todo.task = prompt('Task name', todo.task) || todo.task;
  }
}

ReactDOM.render(
  <TodoList store={ observableTodoStore } />,
  document.getElementById('reactjs-app')
);
```
Sau khi run nó, các bạn có thể thử modify state như bên dưới và coi sự thay đổi.
```
const store = observableTodoStore;
store.todos[0].completed = !store.todos[0].completed;
store.todos[1].task = "Random todo " + Math.random();
store.todos.push({ task: "Find a fine cheese", completed: true });
// .. ...              
```

### Hành động bất đồng bộ (Asynchronous actions)
Từ khi mọi thứ trong Todo của ứng dụng được dẫn xuất từ state, nó sẽ không có vẫn đề gì khi state thay đổi. Chúng làm các hành động bất đồng bộ trở nên đơn giản hơn. 
```
observableTodoStore.pendingRequests++;
setTimeout(function() {
    observableTodoStore.addTodo('Random Todo ' + Math.random());
    observableTodoStore.pendingRequests--;
}, 2000);
```

Kết luận
Chỉ có vậy.Bạn có thể dễ dàng để bắt đầu với **mobx** và **mobx-react**. Tóm lược lại những gì đã coi qua nào:
1. Sử dụng thẻ **@observable** hoặc **observable** để làm một objects có thể dược theo dõi bởi MobX
2. Thẻ **@computed** (**decorator**) có thể dược sử dụng để tạo một hàm tự động dẫn xuất giá trị của chúng từ state
3. Sử dụng autorun để tự động chạy một hàm dựa trên sự thay đổi của vài observable state. Nó hữu dụng để logging, làm request network ...
4. sử dụng thẻ **@observer** từ **mobx-react** giúp component React của bạn có thể phản ứng lại (reactive). Chúng sẽ update tự động và hiệu quả kể cả khi sử dụng trong những ứng dụng phức tạp với lượng lớn dữ liệu.

**MobX không chỉ là một công cụ để quản lý trạng thái**
Nhiều người sử dụng **MobX** như một sự thay thế cho **Redux**. Nhưng **MobX** là một thư viện để giải quyết một vấn đề kỹ thuật và nó không phải là một cấu trúc hoặc một nơi quản lý sự kiện trạng thái. 

Tham khảo: https://mobx.js.org/getting-started.html. Các bạn có thể run code trực tiếp ở đây.