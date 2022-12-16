Nếu như bạn đã làm việc với React thì chắc hẳn bạn đã nghe đến Redux , một framework dùng để quản lý các state của ứng dụng React và thậm chí là các ứng dụng JavaScript thuần. Tuy nhiên để quản lý state của ứng dụng thì không chỉ có Redux mà còn có Recoil , MobX , HookState .... 
Vậy trong bài viết này chúng ta sẽ cùng tìm hiểu về cách để xây dựng một ứng dụng Todo List với MobX và useContext hook.
# 1. MobX là gì :
MobX là một thư viện JavaScript dùng để quản lý state của ứng dụng. MobX có thể sử dụng với ứng dụng javascript thuần hoặc với các ứng dụng modern framework như Angular, VueJS và ReactJS. Tư tưởng của MobX là Reactive Programming, bạn có thể tìm hiểu về thư viện RxJS để hiểu thêm behind the scence của MobX.
# 2. Concept hoạt động của MobX:
![image.png](https://images.viblo.asia/7ebaf868-4fc8-4406-b4cd-e677717c803a.png)

Flow hoạt động của Mobx sẽ gồm 4 bước chính như sau:
1. Các event từ UI sẽ gọi đến những actions trong store của Mobx.
2. Các actions này sẽ thay đổi trực tiếp (mutate) các observable state trong store.
3. Những observable state sau khi thay đổi sẽ được truyền đến các cập nhật lại những computed value (những giá trị được tính toán và trả về bởi method getter).
4. Cuối cùng, các side-effect (như render component) sẽ được trigger để render component với state mới.
# 3. Tạo ứng dụng Todo List:
Chúng ta sẽ tạo 1 ứng dụng todo list thông qua create-react-app. Đầu tiên chúng ta sẽ tạo 1 store cho ứng dụng bằng functional component
```
import { v4 as uuidv4 } from 'uuid';

export function TodoStore() {
	return {
		todos: [],
		addTodo(todo) {
			this.todos.push({
				title: todo,
				id: uuidv4(),
			});
		},
		removeTodo(id) {
			this.todos = this.todos.filter((todo) => todo.id !== id);
		},
		updateTodo(id, text) {
			this.todos.map((todo) => {
				if (todo.id === id) {
					todo.title = text;
				}
				return this.todos;
			});
		},
	};
}

```
Store của ứng dụng sẽ bao gồm một array todos dừng để lưu trữ các todo được người dùng thêm vào và các method dùng để thêm, sửa mà xóa todo khỏi list.
Tiếp theo chúng ta sẽ cài đặt các thư viện `mobx`, `mobx-react` để quản lý state của ứng dụng và `styled-components` để xây dựng các component UI.
```

import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
`;
export const ContainerGrid = styled.div`
	max-width: 1200px;
	margin: 0 auto;
`;
export const FlexBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;
export const Button = styled.button`
	font-size: 15px;
	margin: 0 10px;
	border: 1px solid #ccc;
	background-color: ${(props) => (props.background ? '#FF6B6B' : 'white')};
	padding: 12px;
	border-radius: 5px;
	cursor: pointer;
	color: white;
	&:hover {
		background-color: transparent;
		color: black;
	}
`;
export const ButtonAdd = styled(Button)`
	background-color: #3db2ff;
	color: #fff;
`;

export const ButtonUpdate = styled(Button)`
	background-color: #3db2ff;
`;
const StyledTable = styled.table`
	width: 100%;
	padding: 14px;
	font-size: 16px;
	border: 1px solid #ccc;
	margin-top: 30px;
`;
const TableHeader = styled.thead`
	text-transform: uppercase;
`;
const TableTH = styled.th``;
const TableTR = styled.tr`
	border: 1px solid #ccc;
`;
const TableBody = styled.tbody``;
const TableTD = styled.td`
	text-align: center;
	padding: 12px;
`;

export const Table = ({ children, ...props }) => {
	return <StyledTable {...props}>{children}</StyledTable>;
};
Table.Head = ({ children, ...rest }) => {
	return <TableHeader {...rest}>{children}</TableHeader>;
};

Table.Body = ({ children, ...rest }) => {
	return <TableBody {...rest}>{children}</TableBody>;
};

Table.TH = ({ children, ...rest }) => {
	return <TableTH {...rest}>{children}</TableTH>;
};

Table.TR = ({ children, ...rest }) => {
	return <TableTR {...rest}>{children}</TableTR>;
};

Table.TD = ({ children, ...rest }) => {
	return <TableTD {...rest}>{children}</TableTD>;
};
export const Input = styled.input`
	padding: 8px 10px;
	border-radius: 20px;
	font-size: 14px;
	border: 1px solid #ccc;

	&:focus {
		outline: none;
	}
`;
```
Tiếp theo chúng ta sẽ tạo ra một file TodoContext như là một global state cho ứng dụng.
```

import React from 'react';
import { useLocalObservable } from 'mobx-react';
import { TodoStore } from './TodoStore';

const TodoContext = React.createContext(null);

export const TodoProvider = ({ children }) => {
	const todoStore = useLocalObservable(TodoStore);
	return <TodoContext.Provider value={todoStore}>{children}</TodoContext.Provider>;
};
export const useTodoContext = () => React.useContext(TodoContext);
```
- Khởi tạo một `TodoContext` bằng `React.createContext`. Sau đó là một TodoProvider để chúng ta có thể truyền đi dữ liệu của store xuống các thành phần con.
- Chúng ta sẽ tạo một `observable store` có tên là todoStore thông qua một hook của `mobx-react ` đó là  `useLocalObservable`.
- `useLocalObservable` như là một cách viết ngắn gọn hơn thay vì chúng ta sử dụng cách như này : `const [store] = useState(() => observable({ /* something */}))`
- Khi sử dụng  `useLocalObservable` tất cả các thuộc tính của đối tượng được trả về sẽ được tự động làm cho có thể quan sát được (observable), các getters sẽ được chuyển thành các thuộc tính được tính toán và các phương thức sẽ được liên kết với store và tự động áp dụng các giao dịch mobx.
- `TodoProvider` sẽ trả về cho chúng ta một component với props là children bao gồm những component con được bao bọc bởi `TodoContext`.
Cuối cùng là ta sẽ tạo `useTodoContext` để truy cập vào `store` của ứng dụng.

Sau đó chúng ta sẽ bao bọc toàn bộ app của chúng ta bằng `TodoProvider` trong file `index.js`
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { TodoProvider } from './MobX-Store/TodoContext';

ReactDOM.render(
	<TodoProvider>
		<App />
	</TodoProvider>,
	document.getElementById('root'),
);
```
**Bước cuối cùng** là chúng ta sẽ render giao diện ở file `App.js`
```
import { Observer } from 'mobx-react';
import { useState } from 'react';
import './App.css';
import { useTodoContext } from './MobX-Store/TodoContext';
import { Button, ButtonAdd, ButtonUpdate, Container, ContainerGrid, FlexBox, Input } from './Styled Component/Container';
import { GlobalStyle } from './Styled Component/GlobalStyle';
import { Table } from './Styled Component/Table';
function App() {
	const todoStore = useTodoContext();
	const [input, setInput] = useState('');
	const [inputUpdate, setInputUpdate] = useState('');
	const handleAddTodo = () => {
		todoStore.addTodo(input);
		setInput('');
	};
	return (
		<Observer>
			{() => (
				<>
					<GlobalStyle black />
					<Container>
						<ContainerGrid>
							<FlexBox style={{ marginTop: '30px' }}>
								<Input value={input} onChange={(e) => setInput(e.target.value)} />
								<ButtonAdd onClick={() => handleAddTodo()}>Add Todo</ButtonAdd>
							</FlexBox>
							<Table>
								<Table.Head>
									<Table.TR>
										<Table.TH>#N.O</Table.TH>
										<Table.TH>List Todo</Table.TH>
										<Table.TH>Action</Table.TH>
									</Table.TR>
								</Table.Head>
								<Table.Body>
									{todoStore.todos.map((item, index) => (
										<Table.TR key={item.id}>
											<Table.TD>{index + 1}</Table.TD>
											<Table.TD>{item.title}</Table.TD>
											<Table.TD>
												<FlexBox>
													<Button background onClick={() => todoStore.removeTodo(item.id)}>
														Delete
													</Button>
													<ButtonUpdate onClick={() => todoStore.updateTodo(item.id, inputUpdate)}>Update</ButtonUpdate>
													<Input defaultValue={item.title} onChange={(e) => setInputUpdate(e.target.value)} />
												</FlexBox>
											</Table.TD>
										</Table.TR>
									))}
								</Table.Body>
							</Table>
						</ContainerGrid>
					</Container>
				</>
			)}
		</Observer>
	);
}
export default App;
```

Ở đây chúng ta sẽ sử dụng `Observer` để lắng nghe sự thay đổi của store khi có bất kỳ hành động nào làm thay đổi store thì ứng dụng sẽ được re-render lại. 
**Observer** là một component của React. Nó coi như là một hàm con, một hàm không đối số, sẽ trả về chính xác một  React component.Render trong hàm sẽ được theo dõi và sẽ được re-render khi cần thiết.

![image.png](https://images.viblo.asia/3d397c07-b55d-408c-8aec-02ef4ef02d21.png)

# 4. Kết luận: 
Vậy là chúng ta đã hoàn thành một ứng dụng todo list đơn giản với MobX và useContext. Qua ứng dụng đơn giản này các bạn có thể hiểu được cơ bản MobX hoạt đông như thế nào khi sử dụng cùng với useContext.
Các bạn có thể tham khảo thêm về MobX tại trang chủ của nó. (https://mobx.js.org/README.html).