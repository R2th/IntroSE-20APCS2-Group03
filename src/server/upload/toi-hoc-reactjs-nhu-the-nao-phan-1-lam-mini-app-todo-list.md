> Chào các bạn mình là Kiệt , nếu các bạn thấy được bài viết này , thì cảm ơn bạn vì đã tốn thời gian để đọc bài viết này của mình


## Lời mở đầu : 

Hiện tại mình đang là developer Vuejs  , như mọi developer khác chúng ta luôn có mục tiêu hướng về phía trước cũng như học hỏi thêm về những thứ hay ho  , nên mình muốn chia sẻ quá trình mình học React và cũng như luyện thêm kỹ năng viết của mình , nếu bài viết của mình hay ho thì rất vui khi được giúp bạn ,  **bắt đầu**  thôi ... 


## Mục lục : 
1. Chuẩn bị gì ? 
2. Công nghệ App
3. Todolist



### 1.Chuẩn bị gì cho việc bắt đầu ? 
Trước tiên chúng ta phải xác định lộ trình học của bản thân tránh lang man và ko có mục tiêu cụ thể 
- Ở đây mình lựa chọn lộ trình là học thông qua việc làm project rồi đút kết lại (Việc này có nhược điểm là chúng ta sẽ không nắm hết được các doc của React mà gặp vấn đề gì sẽ search trong quá trình làm ) 


### 2.Công nghệ App : (Đây chỉ là dự tính và sẽ thêm vào khi cần thiết )

* **Ngôn ngữ TypeScript** 
    :Chúng ta sẽ chọn Typescript lun từ ban đầu để sau này còn tái sử dụng lại template này đỡ phải chuyển đổi cho mệt cũng như nó cũng dễ sử dụng chứ không quá khó , vừa làm vừa học lun :D 
 
 
 ![image.png](https://images.viblo.asia/89c9bf64-7fe7-4d6c-bb41-b230bddafc90.png)
 
* **MUI (dự tính)**
    :Mình dự định sẽ sử dụng UI Framework 
    
   ![mui-react-component-library.jpg](https://images.viblo.asia/f921af8b-ff43-4bae-8a09-ddec44205a87.jpg)

### 3.Mini app Todolist : 
- **CHUẨN Bị :** 
Đầu tiên mình sẽ tạo 1 RP template hay còn gọi là basecode trong quá trình mình là mình sẽ đút kết những cái cần thiết thông qua các dự án và nó sẽ giúp mình tích luỹ kinh nghiệm nên vì sao ở bước chuẩn bị mình đã có đề cập mình sẽ học thông qua dự án 
,Link Github : https://github.com/letuankiet212/basecode-reactjs-ts

- **HTML/CSS:** Chúng ta sử dụng lun giao diện trên mạng cho nhanh(https://codepen.io/hanhttm/pen/WjBdbz) ,HTML thì chúng ta sẽ bỏ vào file` App.tsx` và CSS thì vào file `App.css`
![image.png](https://images.viblo.asia/34a16f03-22b7-4ba9-b917-8adee2d9fe56.png)

Như hình chúng ta có thể thấy chức năng của app này sẽ gồm 
- Chức năng tạo task mới (*1)
- Hiển thị danh sách task (*2)
-  Chức năng hiển thị task theo trạng thái all,active,completed (*3)
- Chức năng clear (*4)
- Hiển thị số lượng task (*5)


Đầu tiên chúng ta sẽ thông qua các **happy case** của dự án để tìm ra những thứ cần chuẩn bị :

1.  Load trang -> Hiển thị list task có sẵn 
    
    
    =>` get[List task]`
    
2.  Sau khi nhập text để tạo task mới -> Lưu task mới vào list task 
      
    =>` [input] -> [List task]`

3.  Bấm các nút chức năng sẽ hiển thị các list theo trạng thái 
    
    => `[Button<status>] -> <status> + [List task] -> [new List<status>]`

4. Bấm nút clear sẽ xoá đi các task đã hoàn thành 
   
   => `[Button Delete <status need remove>] -> <status need remove> + [List task]` 
   
     ` -> [Show new list task <no have status>]`
   
Vậy chúng ta sẽ gồm có 3 thành phần chính **1 input** - **1 list show task hiển thị ra màn hình** - **1 list task chính đầy đủ** 

> Trước khi bắt đầu code mình muốn các bạn hãy luôn giữ cho mình ý nghĩ là chúng ta sẽ code cho 1 dự án lớn vậy nên chúng ta sẽ cố để clear code nhất có thể nhé mọi người 


Chúng ta tạo folder `untils` để chứa` types/constants/function--common`

`utils/types/Task.d.ts`
Chứa các khai báo type của Task 

```
export interface ITask {
	id: string | undefined;
	description: string;
	status: boolean;
}
```

`utils/contants/index.tsx`

```
export const NAME_LOCAL_STORAGE = 'todo';

export const STATUS_TASK = {
	ACTIVE: false,
	COMPLETE: true,
};
```

`utils/common.tsx` (chỗ này mình đặt thiếu đáng lẽ là function--common)

Các function ở đây sẽ có thể tái sử dụng không chỉ ở mỗi dự án này nó còn sẽ sử dụng ở những dự án khác 

```
export function setLocalStorage<T>(name: string, listData: Array<T>) {
	localStorage.setItem(name, JSON.stringify(listData));
}

export const getLocalStorage = (name: string) => {
	return JSON.parse(localStorage.getItem(name) as string);
};

```

H vào phần code chính thôi


`App.tsx`

Chúng ta sẽ tách code ra các phần nhỏ để thêm chức năng cho mỗi phần 
![image.png](https://images.viblo.asia/221eb6d2-5697-4ac4-8d83-1df0cbeb658c.png)
![image.png](https://images.viblo.asia/f9672c65-d04d-4a15-a076-d27a83f0903e.png)


Code còn lại sẽ như này 

```
import React, { useState, useEffect } from 'react';
import './App.css';
import { ITask } from './utils/types/Task';
import { setLocalStorage, getLocalStorage } from './utils/common';
import { NAME_LOCAL_STORAGE, STATUS_TASK } from './utils/constants';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoOptionShow from './components/TodoOptionShow';

function App() {
	const [taskList, setTaskList] = useState<ITask[]>([]);

	useEffect(() => {
		setTaskList(getLocalStorage(NAME_LOCAL_STORAGE));
	}, []);

	/**
	 * Update list Task in local storage and taskList
	 * @param newTaskList
	 */
	const updateNewTaskList = (newTaskList: ITask[]) => {
		setLocalStorage(NAME_LOCAL_STORAGE, newTaskList);
		setTaskList(getLocalStorage(NAME_LOCAL_STORAGE));
	};

	/**
	 * Clear Task Complete
	 */
	const removeTaskByStatus = (statusNeedRemove: boolean) => {
		const newTask: ITask[] = getLocalStorage(NAME_LOCAL_STORAGE).filter((task: ITask) => task.status !== statusNeedRemove);
		updateNewTaskList(newTask);
	};

	return (
		<section className="todoapp">
			<header className="header">
				<h1>todo list</h1>
			</header>
			<TodoForm updateNewTaskList={updateNewTaskList} taskList={taskList} />
			<section id="main">
				<input id="toggleInputAll" className="toggle-all" type="checkbox" />
				<label htmlFor="toggle-all">Mark all as complete</label>
				<TodoList updateNewTaskList={updateNewTaskList} taskList={taskList} />
			</section>
			<footer className="footer">
				<span className="todo-count">
					<strong id="todoCount">{taskList?.length ?? 0}</strong> item left
				</span>
				<TodoOptionShow setTaskList={setTaskList} />
				<button className="clear-completed" id="btnClear" onClick={() => removeTaskByStatus(STATUS_TASK.COMPLETE)}>
					Clear completed
				</button>
			</footer>
		</section>
	);
}

export default App;


```


`TodoForm.tsx`

Ở đây chúng ta sẽ xữ lý chức năng khi submit button khi nhâp vào tên công việc mới 

Code : 

```
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ITask } from '../utils/types/Task';
import { STATUS_TASK } from '../utils/constants';

type DataProps = {
	updateNewTaskList: any;
	taskList: ITask[];
};


function TodoForm({ updateNewTaskList, taskList }: DataProps) {
	const [taskNew, setTaskNew] = useState('');

	const clearInput = () => {
		setTaskNew('');
	};

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();

		const target = e.target as typeof e.target & { description: { value: string } };

		const formRequest = {
			id: uuidv4(),
			description: target.description.value,
			status: STATUS_TASK.ACTIVE,
		};

		updateNewTaskList([...(taskList || []), formRequest]);

		clearInput();
	};

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<input id="newTodo" className="new-todo" name="description" value={taskNew} onChange={(e) => setTaskNew(e.target.value)} placeholder="What needs to be done?" />
		</form>
	);
}
export default TodoForm;
```

`TodoList.tsx`

```
import React from 'react';
import { ITask } from './../utils/types/Task';
import { getLocalStorage } from '../utils/common';
import { NAME_LOCAL_STORAGE, STATUS_TASK } from '../utils/constants';

type DataProps = {
	updateNewTaskList: any;
	taskList: ITask[];
};

function TodoList({ updateNewTaskList, taskList }: DataProps) {
	const onDeleteTask = (id: string | undefined = undefined) => {
		if (!id) return;

		const newList = taskList.filter((task) => task.id !== id);

		updateNewTaskList(newList);
	};

	const changeStatus = (task: ITask) => {
		if (!task) return;

		onDeleteTask(task.id);

		const newTask = { ...task, status: !STATUS_TASK.ACTIVE };

		const preTaskList = getLocalStorage(NAME_LOCAL_STORAGE);

		updateNewTaskList([...preTaskList, newTask]);
	};

	return (
		<ul id="todoListView" className="todo-list">
			{taskList &&
				taskList.map((task, key) => (
					<li className="todoItem" key={key}>
						<input type="checkbox" className="itemList" defaultChecked={!!task.status} onChange={() => changeStatus(task)} />
						<label className="labelContent ">{task.description}</label>
						<button className="remove" onClick={() => onDeleteTask(task.id)} />
					</li>
				))}
		</ul>
	);
}

export default TodoList;

```

`TodoOptionShow.tsx`

```
import { NAME_LOCAL_STORAGE, STATUS_TASK } from '../utils/constants';
import { ITask } from '../utils/types/Task';
import { getLocalStorage } from '../utils/common';

type DataProps = {
	setTaskList: any;
};

const TodoOptionShow = ({ setTaskList }: DataProps) => {
	/**
	 * Function filter tasks with status
	 * @param task_status
	 * @returns
	 */
	const showTaskWithStatus = (task_status: any) => {
		const listTask = getLocalStorage(NAME_LOCAL_STORAGE) as ITask[];

		setTaskList(listTask.filter((task) => task.status === task_status));
	};

	return (
		<ul className="filters">
			<li>
				<a id="allWorks" href="#/" onClick={() => setTaskList(getLocalStorage(NAME_LOCAL_STORAGE))}>
					All
				</a>
			</li>
			<li>
				<a href="#active" id="activedItems" onClick={() => showTaskWithStatus(STATUS_TASK.ACTIVE)}>
					Active
				</a>
			</li>
			<li>
				<a href="#completed" id="completedTodos" onClick={() => showTaskWithStatus(STATUS_TASK.COMPLETE)}>
					Completed
				</a>
			</li>
		</ul>
	);
};

export default TodoOptionShow;

```

H tận hưởng thành quả thôi 🤣🤣🤣 
Ở miniapp đầu tiên thì mình chỉ tập làm quen với Reactjs cũng như useState + useEffect (mới mò 2 tk này thôi đã hết thời gian mất tiêu ) còn 1 số chỗ chưa quên nên mình cón code khá non nếu bạn góp ý thì giúp mình nhé , h up code lên github tận hưởng thành quá thôi thông qua video mình sẽ tạo 2 branch để up lên template 1 cái implement UI for TodoList và 1 cái chứa code common mình rút ra được từ miniapp này để sau này mình chỉ cần vào đây xem thôi :D 
![image.png](https://images.viblo.asia/38cf9348-f386-40bb-9e4c-b3ca3663bf70.png)

Bài đầu tiên của seri học React của mình tới đây thôi nếu bạn thấy hay thì hãy cho mình 1 upvote nhé :p , nó giúp cho mình có động lực để viết bài chia sẽ kinh nghiệm rất nhiều , hẹn gặp lại các bạn vào bài viết tuần sau