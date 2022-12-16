Khi làm việc với `Redux`, nó yêu cầu một lượng code lớn. Và điều này có thể khiến mã nguồn của chúng ta trở nên rất phức tạp và khó bảo trì.

Vấn đề trên khiến `Redux` trở thành một giải pháp không hoàn hảo để quản lý `state` trong các ứng dụng `React`. Nhưng đa số các lập trình viên `React` hiện này đều mặc định sử dụng `Redux` để quản lý state mà không cân nhắc đến việc tìm kiếm các giải pháp thay thế khác.

Kết hợp `Hooks` và `React Context API` thực sự sẽ là một lựa chọn đáng được xem xét bởi những lý do sau.

## Tại sao cần một công cụ quản lý State trong React?

Trong `React`, cách để giao tiếp dữ liệu giữa các component đều phải thông qua việc sử dụng `prop` (`prop drilling`). Vì `React` không có `state toàn cục` để các component có thể cùng truy cập được.

***Ví dụ:*** Bạn muốn chuyền dữ liệu từ một component cha đến một component con cấp thứ 5, bạn sẽ phải chuyền dữ liệu này như một `prop` cho mỗi component con mà nó đi qua cho tới khi đến được component con mà bạn muốn.

Điều này dẫn đến việc phải viết thêm rất nhiều mã bổ sung và chuyền các `props` cho các components mà chúng có thể sẽ không bao giờ sử dụng đến.

Để giải quyết vấn đề này, chúng ta cần một cách để cung cấp `state toàn cục` mà tất cả các components đều có thể truy cập được bất kể chúng được lồng nhau đến mức nào. [Redux](https://redux.js.org/) là một thư viện `JavaScript` mã nguồn mở để quản lý các state, và nó đã trở thành giải pháp phù hợp cho các nhà phát triển `React`.

## Tại sao lại là Reatc Hooks và Context API?

`Redux` hoạt động khá tốt, và có nhiều ưu điểm ở một mức độ nào đó khi quản lý `state` trong ứng dụng `React`. Nhưng thực sự nó khá rườm rà và cần rất nhiều mã bổ sung để có thể hoạt động chính xác trong ứng dụng, điều này dẫn đến nhiều sự phức tạp không cần thiết.

Mặt khác, với `useContext API` và `Hooks`, không cần cài đặt thêm các thư viện ngoài hay thêm các tệp và thư mục khác để ứng dụng hoạt động. Cách này đơn giản và dễ dàng hơn nhiều khi xử lý quản lý state  toàn cục trong các ứng dụng `React`.

## Redux là gì?

Tài liệu `Redux` mô tả nó như một container chứa state có thể dự đoán cho các ứng dụng `JavaScript`, giúp chúng ta viết các mã nhất quán, chạy trong nhiều môi trường khác nhau và dễ dàng kiểm thử.

Một nhược điểm của `prop drilling` là cần phải viết một lượng lớn mã bổ sung để truy cập dữ liệu từ một component cấp cao hơn.

Với `Redux`, nhược điểm này trở nên nghiêm trọng hơn vì tất cả mã bổ sung mà nó yêu cầu để thiết lập state toàn cục thậm chí còn phức tạp hơn thế. `Redux` yêu cầu ba phần chính: ***Actions***, ***Reducers*** và ***store***.

### Actions

Đây là các đối tượng được sử dụng để gửi dữ liệu đến `store`. 

Chúng thường có hai thuộc tính: 
- ***type***: để mô tả hành động sẽ thực hiện. Nó thường được viết hoa toàn bộ với các từ được phân tách bằng dấu gạch dưới.
- ***payload***: chứa thông tin cần được thay đổi trong state.

Ví dụ,
```javascript
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'

const addProductToCart = product => {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: ADD_PRODUCT_TO_CART,
        payload: product,
      })
    }, 500)
  }
}
export default addProductToCart;
```

### Reducers

Đây là những `function` để thực hiện hành vi `action`. Chúng có state ứng dụng hiện tại, thực hiện một `action` và sau đó trả về `state` mới:

Ví dụ,
```javascript
import {ADD_PRODUCT_TO_CART} from './actions'

const initialState = {
  products: [
    { id: 'a1', title: 'Book', price: 30 },
    { id: 'a2', title: 'Pen', price: 5 }
  ],
  cart: [],
}

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return { ...state, cart: updatedCart }
    default:
      return state
  }
}

export default shopReducer;
```

### Store

`Store` là nơi chứa `state` của ứng dụng. Một ứng dụng `React` chỉ có ***một*** `Store`.

```javascript
import { createStore} from 'redux'

const store = createStore(Provier);
```
Vì ứng dụng của chúng ta chỉ có thể có một `store`, nên để tạo một `reducer` gốc duy nhất cho tất cả các components, chúng ta sẽ cần phương thức `connectReducers` từ `Redux`.

Với quá trình dài và lượng mã đáng kể cần thiết để thiết lập `Redux`, hãy tưởng tượng codebase của chúng ta sẽ như thế nào khi làm việc cùng nhiều components.

Mặc dù `Redux` giải quyết được vấn đề quản lý state, nhưng để sử dụng nó thì thực sự tốn khá nhiều thời gian, học tập khó và đưa ra một layer hoàn toàn mới và phức tạp cho ứng dụng của chúng ta.

`Context API` giải quyết được vấn đề này. Khi kết hợp với `Hooks`, chúng ta có một giải pháp quản lý state ít tốn thời gian hơn khi cài đặt, học tập dễ dàng và yêu cầu ít mã hơn.

## Context API là gì?

`Context API` mới đi kèm với `React 16.3`, cho phép chia sẻ dữ liệu "toàn cầu” cho một cây các components `React`, như `current authenticated user`, `theme`, hay ngôn ngữ.

Trong tài liệu chính của `React`, có giải thích
> Context cung cấp một cách để chuyền dữ liệu qua cây component mà không phải chuyển các props xuống theo cách thủ công ở mọi cấp độ.

`Context API` là cách `React` quản lý state trong nhiều components không được kết nối trực tiếp.

Để tạo một `context`, sử dụng phương thức `createContext` từ `React`, phương thức này chấp nhận một tham số cho giá trị mặc định của nó:

```javascript
import React from 'react';

const newContext = React.createContext({ color: 'black' });
```

Phương thức `createContext` trả về một đối tượng với components `Provider` và `Consumer`:

```javascript
const { Provider, Consumer } = newContext;
```

- `Provider` là component có chức năng khiến state "khả dụng" cho tất cả các components con, bất kể chúng được lồng nhau như thế nào trong phân cấp component. `Provider` nhận một prop `value`. Đây là nơi chúng tôi sẽ chuyển `value` hiện tại:

```javascript
<Provider value={color: 'blue'}>
  {children}
</Provider>
```
- `Consumer`, như tên gọi của nó, sử dụng dữ liệu từ `Provider` mà không cần `prop drilling`:

```javascript
<Consumer>
  {value => <span>{value}</span>}}
</Consumer>
```

Nếu không có `Hooks`, `Context API` có vẻ không giống lắm khi so sánh với `Redux`, nhưng kết hợp với `useReducer` Hook, chúng ta có một giải pháp để giải quyết vấn đề quản lý state.

## React Hooks là gì?

`Hooks` là một loại `function` cho phép thực thi mã tùy chỉnh. Trong `React`, `Hooks` là các `functions` đặc biệt cho phép chúng ta “khai thác” các tính năng cốt lõi của nó.

`React Hooks` cung cấp một giải pháp thay thế cho việc viết các component `class-based` bằng cách cho phép chúng ta xử lý dễ dàng việc quản lý state từ các `functional` component.

### useContext

Nếu chú ý, khi giải thích `Context API`, chúng ta cần gói nội dung của mình trong `Consumer` và sau đó chuyền một hàm như con để có thể truy cập (hoặc sử dụng) state.

Cái này đưa ra các component lồng nhau không cần thiết và làm tăng độ phức tạp của mã code.

`useContext` sẽ khiến cho mọi thứ "đẹp" và đơn giản hơn rất nhiều. Để truy cập state, cần gọi `useContext` với `context` đã tạo, như là một đối số:

```javascript
const newContext = React.createContext({ color: 'black' });

const value = useContext(newContext);

console.log(value);
// { color: 'black' }
```
Bây giờ, thay vì gói nội dung trong `Consumer`, chúng ta có thể chỉ cần truy cập `state` thông qua biến `value`.

### useReducer

`useReducer` đi kèm với `React 16.8`. Cũng giống như phương thức `reduce()` trong JavaScript, `useReducer` nhận hai giá trị làm đối số của nó - một hàm `reducer` và một `state khởi tạo` - và sau đó trả về một `state mới`:

```javascript
const [state, dispatch] = useReducer((state, action) => {
  const { type } = action;
  switch(action) {
    case 'action description':
      const newState = ... // do something with the action
      return newState;
    default:
      throw new Error()
  }
}, []);
```

Trong đoạn code trên, chúng ta đã xác định state và một phương thức tương ứng, `dispatch` để xử lý nó. Khi chúng ta gọi phương thức này, `useReducer()` sẽ thực hiện một `action` dựa trên `type` mà phương thức của chúng ta nhận được trong đối số `action` của nó:

```javascript
...
return (
  <button onClick={() =>
    dispatch({ type: 'action type'})}>
  </button>
)
```

## useReducer + Context API

### Setup store

Bây giờ chúng ta đã biết cách `Context API` và `useReducer` hoạt động riêng lẻ, hãy cùng xem điều gì sẽ xảy ra khi kết hợp chúng để có được giải pháp quản lý state toàn cục lý tưởng.

Tạo state toàn cục trong file `store.js`:
```javascript
import React, {createContext, useReducer} from 'react';

const initialState = {};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'action description':
        const newState = ... // do something with the action
        return newState;
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{state, dispatch}}>{children}</Provider>;
};

export { store, StateProvider }
```

Trong file `store.js`, sử dụng phương thức `createContext()` để tạo một `context` mới.

Hãy nhớ rằng phương thức `createContext()` trả về một ***object*** có các components `Provider` và `Consumer`. Lần này, chúng ta sẽ chỉ sử dụng `Provider` và sau đó là `useContext()` khi cần truy cập state.

Lưu ý cách sử dụng `useReducer()` trong `StateProvider`. Khi cần thao tác với state, chúng ta sẽ gọi phương thức `dispatch` và chuyền vào một `object` có `type` mong muốn làm đối số của nó.

Trong `StateProvider`, trả về component `Provider` với một prop `value` và `dispatch` từ `useReducer`.

### Truy cập state phạm vi toàn cục

Để truy cập state phạm vi toàn cục, chúng ta cần gói `<App />` root trong `StoreProvider` trước khi render nó trong hàm `ReactDOM.render()`:
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StateProvider } from './store.js';

const app = (
  <StateProvider>
    <App />
  </StateProvider>
);

ReactDOM.render(app, document.getElementById('root'));
```
Bây giờ, context `store` có thể được truy cập từ bất kỳ component nào trong cây component. Để làm điều này, cần import `useContext` từ `react` và `store` từ file `./store.js`:

```javascript
// Product.js
import React, { useContext } from 'react';
import { store } from './store.js';

const Product = () => {
  const globalState = useContext(store);
  console.log(globalState); 
};
```

### Thêm, xóa dữ liệu

Để thêm và xóa dữ liệu khỏi state, chúng ta sẽ cần phương thức `dispatch` từ context `store`. Chúng ta chỉ cần gọi `dispatch` và chuyền vào một đối tượng có `type` làm tham số của nó.

```javascript
import React, { useContext } from 'react';
import { store } from './store.js';

const Product = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  dispatch({ type: 'action description' })
};
```

### Tham khảo
[Redux vs Hooks, Context](https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/)