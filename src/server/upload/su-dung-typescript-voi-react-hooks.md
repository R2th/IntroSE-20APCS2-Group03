Trong bài viết này mình sẽ chia sẻ cách sử dụng **type** vào các **hook** trong xây dựng ứng dụng **react-typescript**

### I. Sử dụng type với useState
**useState** chắc chắn là **hook** được gần như hàng ngày đối với mỗi **react dev**,**useState** cho phép chúng ta khởi tạo và quản lý **state** bên trong **function component** tương tự như **this.state** trong **class component**, sau đây là ví dụ đơn giản sử dụng **useState** để khai báo một **state** với **typescript**
```js
import React from 'react'

const App: React.FC = () => {
    const [inputValue, setInputValue] = React.useState<string>('')

    return (
        <div className="main">
            <input
                placeholder="type something..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
             />
        </div>
    );
}
```
Để chỉ định **type** cho **state** được tạo ra bởi **useState**, ta chỉ định **type** với cú pháp **useState<type>(defaultValue)**. Lưu ý là chúng ta hoàn toàn có thể chỉ định **type** hỗn hợp đối với **state**: **useState<string | null>(null)**.    
 
### II. Sử dụng type với useRef  
Tương tự với  **createRef** trong **classe component**, **useRef** là **hook** giúp tạo ra một đối tượng cho phép liên kết với phần tử **DOM** bên trong **function component**. Việc chỉ định **type** cho đối tượng **ref** sử dụng **useRef** khá tượng tự với **useState** ở trên, có thể thấy rõ hơn qua ví dụ dưới đây:
```
import React from 'react'

const App: React.FC = () => {
    const  [inputValue, setInputValue] = React.useState<string>('')
    const mainRef = React.useRef<HTMLDivElement | null>(null)

    return (
        <div ref={mainRef} className="main">
            <input
                placeholder="type something..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
             />
        </div>
    );
}
```
### III. Sử dụng type với useContext  
**useContext** cho phép bạn thao tác với **Context API** một cách dễ dàng hơn, nếu chưa tìm hiểu về **Context API**, hãy hiểu đơn giản nó là một **api** của **React** cho phép chúng ta tạo ra những **state** có thể truy cập tới bởi các **component** thấp hơn mà không mất công truyền **props** và nhiều cấp **components**, tham khảo thêm tại [đây](https://reactjs.org/docs/context.html#gatsby-focus-wrapper).  
Với **typescript**, chúng ta cần chỉ định **type** từ bước tạo ra **context**  
```
import React from 'react'
    
interface User {
  name: string;
  age: number;
}
    
const UserContext = React.createContext<User[] || []>([]);
    
const App: React.FC = () => {
   const userList = React.useState<User[] | []>([{
           name: 'User 01',
           age: 15
    }]) 
    return (
    <UserContext.Provider value={{ userList }}>
        <ChildComponent />
    </UserContext.Provider>
    )
}
```
Sau đó chỉ định **type** ở bước truy cập tới **data**
```
const ChildComponent: React.FC = () => {
     const { userList } = React.useContext<User[] | []>(UserContext)
     return (
        <div>
            {userList.map(user => (
                <UserItem user={user} />
            ))}
        </div>
    ); 
 }
```
Bằng cách trên, chúng ta đã có thể xử lý **type** đối với **state** được tạo bởi **Context API**.  
### III. Sử dụng type với useReducer
**useReducer** là một lựa chọn thay thế **useState** khi chúng ta cần quản lý những **state** phức tạp, khá tương đồng với cách quản lý **state** với thư viện **redux**, có lẽ vì vậy mà nó có cái tên **reducer**.  
Để sử dụng **useReducer** với **typescript** đúng cách, ta cần lưu ý việc chỉ định **type** cho **action** và **state**, sẽ hơi khác nhau một chút, giả sử ta có một **state** đơng giản, chứ một giá trị **count** và hai **actions** cho phép chúng ta tăng (**increase**) hoặc giảm (**decrease**) giá trị **count**, ta sẽ làm như sau.  
```js
import React from 'react'

enum ActionTypes {
     INCREMENT = 'INCREMENT',
     DECREMENT = 'DECREMENT'
}

interface TypeActions {
    type: ActionTypes,
    ue: number,
}
 
interface TypeState {
   count: number;    
}

const initialState: TypeState = {
    count: 0
}
```
Ta sử dụng **interface** để khai báo **type** cho **state, actions** và sử dụng **enum** - **api** của **Typescript** cho phép chúng ta định nghĩa một nhóm các tên biến không thay đổi, dùng để định nghĩa các trường hợp **type** sẽ có của **actions**. Sau khi đã **setup** xong, chúng ta chỉ việc khai báo **reducer**:
```
const reducer: React.Reducer<TypeState, TypeActions> = (state, action) => {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return { count: state.count + action.value };
    case ActionTypes.DECREMENT:
      return { count: state.count - action.value };
    default:
      return state;
  }
};
 ```
Sau đó sử dụng **reducer** vừa được tạo bên trong **component**:  
```
 const App: React.FC = () => {
  const [state, dispatch] = React.useReducer<React.Reducer<TypeState, TypeActions>>(
    reducer,
    initialState
  );

  return (
    <div className="App">
      <h1>Count: {state.count}</h1>
      <button
        onClick={() =>
          dispatch({ type: ActionTypes.INCREMENT, value: countValue })
        }> +
      </button>
      <button
        onClick={() =>
          dispatch({ type: ActionTypes.DECREMENT, value: countValue })
        }> -
      </button>
    </div>
  );
}
```
Trên đây mình vừa chia sẻ cách sử dụng **typescript** với một số hàm **React Hooks**, bài viết được tham khảo từ bài viết [The React TypeScript Cheatsheet – How To Set Up Types on Hooks](https://www.freecodecamp.org/news/react-typescript-how-to-set-up-types-on-hooks/), hi vọng những thông tin trong bài viết này sẽ hữu ích.