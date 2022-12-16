#### Introduction
Hooks là xu hướng mới trong cộng đồng React và là điều không thể tránh cho các nhà phát triển React các function, class, components. Hooks thay đổi cách mà chúng ta viết mã React, làm cho mã chúng ta viết sẽ dễ dàng đọc vào bảo trì hơn.
Trong bài viết này chúng ta sẽ học cách tùy chỉnh Hooks và sử dụng Hooks trong ứng dụng của chúng ta.
#### Hooks
Chúng là ác hàm javascript sử dụng trong components và cho phép chúng ta sử dụng `state` và `life cycle` phương thức 
`componentDidUpdate`, `componentDidMount` và nhiều function khác. Nó đóng vai trò quan trọng và khả năng tái xử dụng cao vì mã sẽ cho phép chúng ta sử dụng logic thành phần và trạng thái trên các thành phần khác.
#### Custom Hooks

Đây là javascript function bình thường chứa các hooks khác bên trong nó cùng với một số logic trạng thái chung có thể được sử dụng lại trong nhiều thành phần. Các chức năng này thường bắt đầu bằng từ `use`
Trước khi xuất hiện các hooks tùy chỉnh, có thể xử lý logic trạng thái lặp lại và dư thừa bên trong nhiều thành phần bằng cách dựa vào Render props and Higher Order Components.
Nhưng các phần tùy chỉnh chúng ta có thể thực hiện điều này một cách đơn giản và gọn gàng hơn nhiều.
#### Rules of Hooks
Có 2 quy tắc cần tuân theo khi sử dụng Hooks. Và react đã có plugin `linter plugin` để thực thi quy tắc một cách tự động.

* Rule 1:
Không goi Hooks bên trong vòng lặp. điều kiện hoặc các hàm lồng nhau. Thay vào đó hãy xử dụng Hooks ở tầng cao nhất của Function React. Bằng quy tắc này sẽ đảm bảo các Hooks được gọi theo cùng một thức tự mỗi khi một thành phần được hiển thị.
Đó là việc duy trùy chính xác state of Hooks giữa nhiều `useState` và `useEffect`
* Rule 2:
Chỉ gọi Hooks từ các F Reactunction
Không gọi Hooks từ các function javascript thông thường. Thay vào đó bạn có thể:
Gọi Hooks từ các thành phần hàm React. Gọi Hooks từ Hooks tùy chỉnh.

Bằng cách tuân theo quy tắc này, bạn đảm bảo rằng tất cả logic trạng thái trong một thành phần có thể nhìn thấy rõ ràng từ source code.
#### Building our React Custom hooks
Trước khi chúng tôi bắt đầu xây dựng các hooks tùy chỉnh của mình. Sử dụng npm là hướng dẫn tốt nhất vì có khả năng ai đó đã xuất bản nó trên npm.


Đầu tiên, chúng ta cần tạo một ứng dụng bằng lệnh create react như sau:

```
 npx create-react-app custom-hooks

```

Next, run the following command:

```
cd custom-hooks
npm start
```
##### useOrderCount hook

Di chuyển đên filder src vào tạo 1 file `useOrderCount.js` để viết tùy chình Hooks logic theo hướng dẫn sau:
```
import { useState } from 'react';
function useOrderCountHook() {
   const [orderCount, setOrderCount] = useState(0);

   const incrementOrderCount = () => {
      setOrderCount( orderCount + 1 ) 
    }

    const decrementOrderCount = () => {
      setOrderCount( orderCount - 1 ) 
    }
   return { orderCount, incrementOrderCount, decrementOrderCount };
}
export default useOrderCountHook;
```
Ở đoạn mã trên chúng ta đã sử dụng hàm `orderCount` với giá trị ban đầu là 0. Tiếp theo chúng ta sẽ tạo hook `useOrderCountHook` đây chỉ là 1 function bình thường chứa `incrementOrderCount`và `decrementOrderCount`
chức năng để thay đổi `orderCount`. Bây giờ chúng ta sẽ xây dựng hook `orderCountHook` và xử dụng nó.
 Using  **useOrderCountHook** trong components khác.
 Trong src folder, tạo 1 file DisplayCount.js và thêm nội dung sau:
 ```
 import React from 'react';
 import useOrderCountHook from '../hooks/useOrderCount';
 function DisplayCount() {
    const orderHook = useOrderCountHook();
    return (
      <div>
        <h1>count:{orderHook.orderCount}</h1>
        <button type='button' onClick
          {orderHook.incrementOrderCount}>Increment</button>
         <button type='button' onClick
          {orderHook.decrementOrderCount}>Decrement</button>
     </div>
    );
 }
 export default DisplayCount;
 ```
 Cập nhật thành phần app.js như sau:
 ```
 import React from 'react';
 import DisplayCount from './components/useOrderCount';
 import './App.css';
 function App() {
    return (
      <div>
        <DisplayCount/>
     </div>
    );
 }
 export default App;
 ```
 Chạy ứng dụng trên trình duyệt chúng ta có thể tăng giảm số lượng order.
 
#####  useLocalStorageState hook
 *useLocalStorageState* sẽ lưu trữ tuổi của người dùng trong bộ nhớ cục bộ, cập nhật và nhận giá trị của tuổi đó từ localStorage.
Di chuyển đến src và tạo file `useLocalStorageState.js` và thêm nội dung.
```
import React, { useState} from 'react'
function useLocalStorageState(key, defaultValue) {
    const [state, setState] = useState(() => {
        let value;
        try {
            value = JSON.parse(
                window.localStorage.getItem(key) || String(defaultValue)
            );
        } catch (e) {
            value = defaultValue;
        }
        return value;
    });
    useEffect(
        () => {
            window.localStorage.setItem(key, state);
        }, [state]
    )
    return [state, setState];
}
export default useLocalStorageState;

```
`useLocalStorageState`  hook nhận hai parameters (key, defaultValue). Nó sử dụng khối try để truy xuất giá trị của khóa và gán giá trị cho biến.
Nó sẽ gán giá trị cho `defaultValue` biến giá trị nếu có lỗi xảy ra. `useEffect` sẽ gán và cập nhật key với giá trị `state` là các thông số thay đổi.
Sử  `useLocalStorageState`dụng  trong các components khác:
 Bên trong component folder tạo file  `DisplayLocalStorageData.js` với nội dung sau:
 ```
 import React, { useState} from 'react'
 import useLocalStorageState from '../hooks/useLocalStorageState'
 function DisplayLocalStorageData () {
     const [userAge, setUserAge] = useLocalStorageState("age",20);
     return (
         <div>
             <h1>{userAge}</h1>
     <button onClick={() => setUserAge(userAge + 1)}>Increment</button>
     <button onClick={() => setUserAge(userAge - 1)}>Decrement</button>
         </div>
     )
 }
 export default DisplayLocalStorageData;
 
 ```
Để xử dụng `useLocalStorageState` chúng ta chỉ cần call nó với key và default value.  Và key của
`localStorage`  được thêm với default value. Nó sẽ đươc tìm nạp bởi Hooks trong khi số lượng được cập nhật. Tất các cac đoạn mã tương tác với `localstorage` đều trong `useLocalStorageState` đều trong Hooks trong khi phần cập nhật nằm trong thành phần `DisplayLocalStorageData`.
Một hiệu quả lớn ở đây là khả năng tái sử dụng mã hiệu quả hơn trên nhiều components. Chúng ta có thể sử dụng lại đoạn mã này  ( useLocalStorageState hook) trong bất kỳ thành phần nào khác cần lưu trữ trang thái trong bộ nhớ.
##### Creating global state Hooks

Hầu hết khi xây dựng ứn dưng web chúng ta trường truy cập trạng thái global. Ví dụ trong 1 trang blog một số thành phần cần nhận xét, một số thành phần khác cần trạng thái đăng bài.
Để xử lý vấn đề này chúng ta có thể có các Hooks tùy chỉnh để có được các component nhất định.
Tạo file contexts.js
```
// contexts.js
import React from 'react'
export const StateContext = React.createContext({
  state: {
    comments: [],
    posts: []
  },
})
```
Tiếp theo chúng ta tạo `useCommentState` hook sẽ trả về bình luận là global state.
 ```
 // useCommentState.js
 import { useContext } from 'react'
 import { StateContext } from './contexts'
 export default function useCommentState () {
   const { state } = useContext(StateContext)
   return state.comments
 }
 ```
 Tương tự, chúng ta có thể tạo một hook `usePostState` sẽ trả về tất cả các bài viết từ trạng thái chung.
 ```
 // usePostsState.js
 import { useContext } from 'react'
 import { StateContext } from './contexts'
 export default function usePostsState () {
   const { state } = useContext(StateContext)
   return state.posts
 }
 ```
 
 Sử dụng hook `useCommentState` trong các thành phần khác:
 ```
 import React, { useState} from 'react'
 import useCommentState from './useCommentState'
 function DisplayComments () {
     const comments = useCommentState();
     return (
         <div>
             {comments.length > 0 ? (
               comments.map( (comment, idx) => (<h4 key={idx}>{comment}</h4>
               ) : ( <h4>No comment</h4> )
             }
         </div>
     )
 }
 export default DisplayComments;
 ```
 #### Conclusion
 Trong bài viết này chúng ta đã học được cách tạo ra đoạn mã có thể tái xử dụng và chia sẻ nó trên nhiều components bằng các sử dụng  react hooks. Điều này làm cho code của chúng ta dễ đọc và clean hơn.
 
 #### Tài liệu tham khảo. 
https://reactjs.org/docs/getting-started.html

https://www.npmjs.com/package/eslint-plugin-react-hooks

https://codesource.io/building-and-using-custom-react-hooks-in-our-application/