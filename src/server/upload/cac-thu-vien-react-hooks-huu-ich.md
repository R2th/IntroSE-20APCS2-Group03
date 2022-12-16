Có lẽ không ai làm việc với React mà chưa từng tiếp xúc với React Hooks. Hooks xuất hiện giúp các developer làm mọi thứ đều trở nên dễ dàng hơn, từ việc giúp các dòng code trở nên sạch sẽ và dễ đọc hơn, cho đến việc maintain và tái sử dụng tốt như nào. Hiện nay khi Hooks ngày càng phát triển thì đồng nghĩa với việc có rất nhiều thư viện cung cấp Hooks phát triển. Chúng ta sẽ cùng tìm hiểu xem một số thư viện về Hooks khá hữu ích mà hiện nay các developer đang dùng có bộ dạng như nào.

### 1. use-http
**use-http** là một package phổ biến được sử dụng để thay thế cho Fetch API. Đây là một thư viện tốt cho maintain và dễ dàng tích hợp vào source code chỉ bằng vài dòng code đơn giản. Thư viện được viết bằng Typescript và có support cho Server Side Rendering (SSR), GraphQL. Nó sẽ trả về response, loading, error data và hoạt động với nhiều request method khác nhau, bao gồm GET, POST, PUT, PATCH, DELETE.

Tính năng:
- Request/Response Interceptors
- Abort/Cancel pending http requests trong một component unmount
- Retry Functionality
- Build-in Caching
- TypeScript Support

Cài đặt (tham khảo thêm [tại đây](https://www.npmjs.com/package/use-http)):
> npm i use-http
```
import React, { useEffect, useState } from 'react';
import useFetch from 'use-http'

function UseHTTPExample() {
  const [todos, setTodos] = useState([])
  const { get, post, response, loading, error } = useFetch('https://jsonplaceholder.typicode.com')

  useEffect(() => { initializeTodos() }, []);

  async function initializeTodos() {
    const initialTodos = await get('/todos')
    if (response.ok) setTodos(initialTodos)
  }

  async function addTodo() {
    const newTodo = await post('/todos', { title: 'This is title' })
    if (response.ok) setTodos([newTodo, ...todos])
  }

  return (
    <>
      <button onClick={addTodo}>Add Todo</button>
      {error && 'Error!'}
      {loading && 'Loading...'}
      {todos.map(todo => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </>
  )
}
export default UseHTTPExample;
```

### 2. Redux Hooks
**Redux** là một thư viện quản lý state phổ biến nhất, có lẽ hầu hết những ai tiếp xúc với React đều đã từng sử dụng Redux. Redux Hooks cung cấp một giải pháp thay thế cho HOC (Higher Order Component) với phương thức connect() hiện có. Redux Hooks đã tạo ra một phương thức đơn giản để kết nối store, fetch data và dispatch action. Hãy cùng xem nó hoạt động như nào nhé.

Các React Hooks phổ biến bao gồm: useSelector, useDispatch, useStore.

Cài đặt (tham khảo thêm [tại đây](https://www.npmjs.com/package/@types/react-redux)):
> npm i react-redux @types/react-redux
```
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import * as actions from "./actions";

const ReduxHooksExample = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  return (
    <div>
      <span>{counter.value}</span>
      <button onClick={() => dispatch(actions.incrementCounter)}>
        Counter +1
      </button>
    </div>
  );
};
```

### 3. useMedia
Liệu đã bao giờ phải đối mặt với việc quản lý các CSS media query trong React chưa? **useMedia** sẽ giúp chúng ta đơn giản hoá vấn đề này chỉ bằng vài dòng code sương sương. Nó sẽ theo dõi state của CSS media query và giúp chúng ta thiết kế cũng như phát triển cấu trúc css cho app. useMedia được viết bằng TypeScript. 

Cài đặt (tham khảo thêm [tại đây](https://www.npmjs.com/package/use-media)):
> npm i use-media
```
const ResponsiveComponent = () => {
    const isWide = useMedia({ minWidth: "768px" });

    return (
      <span>
        Screen is wide: {isWide ? "It's WideScreen" : "It's NarrowScreen"}
      </span>
    );
  };
```

### 4. React Redux Form
**React Redux Form** là một thư viện hooks kiểu form, gần giống như Formik hay Redux Form, nhưng nó đơn giản, tiện lợi và ít bị re-rendering. useForm sẽ trả về register, handleSubmit, handleSubmit quản lý các action submit, errors giúp kiểm tra validation và hiển thị các input errors. 

Cài đặt (tham khảo thêm [tại đây](https://www.npmjs.com/package/react-hook-form)):
> npm i react-hook-form
```
import React from "react";
import { useForm } from "react-hook-form";

function SignUpComponent() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    // logs {firstName:"exampleFirstName", lastName:"exampleLastName"}
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="firstName" ref={register} />
      <input name="lastName" ref={register({ required: true })} />
      {errors.lastName && <span>"Last name is a mandatory field."</span>}
      <input name="age" ref={register({ required: true })} />
      {errors.age && <span>"Please enter number for age."</span>}
      <input type="submit" />
    </form>
  );
}
```

### 5. Constate
**Constate** khá hữu dụng khỉ sử dụng cùng một state trong nhiều components. Ví dụ, nếu có Themes, Colors, Fonts cùng được sử dụng trong nhiều component, thì users sẽ được phép thay đổi chỉ tại một chỗ thôi nhưng sẽ được đồng bộ cho toàn app. Package này được viết bằng TypeScript và khá nhỏ gọn.

Cài đặt (tham khảo thêm [tại đây](https://www.npmjs.com/package/constate)):
> npm i constate
```
import React, { useState } from "react";
import constate from "constate";

// custom hook
function useCounter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(prevCount => prevCount + 1);
  return { count, increment };
}

// hook passed in constate
const [CounterProvider, useCounterContext] = constate(useCounter);

function Button() {
  // use the context
  const { increment } = useCounterContext();
  return <button onClick={increment}>+</button>;
}

function Count() {
  // use the context
  const { count } = useCounterContext();
  return <span>{count}</span>;
}

function App() {
  // wrap the component with provider
  return (
    <CounterProvider>
      <Count />
      <Button />
    </CounterProvider>
  );
```

### 6. useDebounce
**useDebounce** được sử dụng để debouncing (một phương pháp kĩ thuật cải thiện performance). Nó được sử dụng để hoãn thực thi đến một thời điểm sau đó, giống như setTimeout trong React Native.

Cài đặt (tham khảo thêm [tại đây](https://www.npmjs.com/package/use-debounce)):
> npm i use-debounce
```
import React, { useState } from "react";
import { useDebounce } from "use-debounce";

export default function UseDebounceExample() {
  const [text, setText] = useState("Hello its me");
  const [value] = useDebounce(text, 3);

  return (
    <div>
      <input
        defaultValue={"Hello"}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <p>Value: {text}</p>
      <p>Debounced value: {value}</p>
    </div>
  );
}
```

### 7. React Router Hooks
**React Router**, cái tên không cần phải giới thiệu nhiều khi mức độ phổ biến của nó khá lớn rồi. Một số Router Hooks phổ biến bao gồm useHistory, useLoaction, useParams, useRouteMatch, useHistory. Trong đó, *useHistory* giúp các developer quản lý component navigation history. *useLocation* thì trả về objects đại diện cho URL hiện tại để quản lý các trường hợp URL tự thêm. *useParams* trả về các đối số (parameters) đã được gửi trong khi routing giữa các components. *useRouteMatch* sẽ match đến currentURL với một string đã cho sẵn. 

Cài đặt (tham khảo thêm [tại đây](https://www.npmjs.com/package/react-router-dom)):
> npm i react-router-dom
```
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";

const RouteExample = () => {
  let history = useHistory();
  let location = useLocation();
  let isMatchingURL = useRouteMatch("/blog/1");

  function handleClick() {
    history.push("/home");
  }

  return (
    <div>
      <span>Current URL: {location.pathname}</span>
      {isMatchingURL ? <span>Matching provided URL! </span> : null}
      <button type="button" onClick={handleClick}>
        Go home
      </button>
    </div>
  );
};
```

### 8. useHover
**useHover** xác định các react element khi được hover. Nó khá dễ sử dụng và tích hợp. Nó cũng cũng cấp độ trễ (delay) của hiệu ứng hover. *useHover* có hỗ trợ TypeScript.

Cài đặt (tham khảo thêm [tại đây](https://www.npmjs.com/package/react-use-hover)):
> npm i react-use-hover
```
import useHover from "react-use-hover";

const HoverExample = () => {
  const [isHovering, hoverProps] = useHover();
  return (
    <>
      <span {...hoverProps} aria-describedby="overlay">
        Hover me
      </span>
      {isHovering ? <div> Hey, you hover me! </div> : null}
    </>
  );
};
```

### 9. usePortal
**usePortal** cho phép tạo các elements bên ngoài phân cấp DOM của ứng dụng. một số biến trong *usePortal* được sử dụng rộng rãi bao gồm dropdowns, notification popups, modals, tooltips. *usePortal* được viết bằng TypeScript. Nó cho phép tuỳ chỉnh các kiểu style portal với có nhiều options khác. Có thể thao khảo thêm các ví dụ về usePortal liên quan đến Modal, Dropdown, Tooltip,.. [tại đây](https://codesandbox.io/s/w6jp7z4pkk).

Cài đặt (tham khảo thêm [tại đây](https://www.npmjs.com/package/react-useportal)):
> npm i react-useportal
```
import React, { useState } from "react";
import usePortal from "react-useportal";

const UsePortalExample = () => {
  const { ref, openPortal, closePortal, isOpen, Portal } = usePortal();

  return (
    <>
      <button ref={ref} onClick={() => openPortal()}>
        Open Portal
      </button>
      {isOpen && (
        <Portal>
          <p>
            This Portal handles its own state.{" "}
            <button onClick={closePortal}>Close me!</button>, hit ESC or click
            outside of me.
          </p>
        </Portal>
      )}
    </>
  );
};
```

### 10. useLocalStorage
**useStorage** cho phép các developer extract và lưu data trong localStorage. Nó sẽ tự động chuyển đổi và đồng bộ hoá JSON. *useLocalStorage* được viết bằng TypeScript.

Cài đặt (tham khảo thêm [tại đây](https://www.npmjs.com/package/@rehooks/local-storage)):
> npm i @rehooks/local-storage
```
import React, { useState } from "react";
import { writeStorage } from '@rehooks/local-storage';

const UseLocalStorageExample() {
  let counter = 0;
  const [counterValue] = useLocalStorage('counterValue');

  return (
    <div>
      <span>{counterValue}</span>
      <button onClick={() => writeStorage('i', ++counter)}>
        Click Me
      </button>
    </div>
  );
}
```

Bài viết được sưu tầm chủ yếu từ nguồn [tại đây](https://dev.to/kpiteng/top-10-react-hooks-library-3m38).