Redux là một kho chứa trạng thái  cho các ứng dụng JavaScript và là một công cụ rất có giá trị cho việc tổ chức trạng thái ứng dụng. Nó là một thư viện phổ biến để quản lý state trong các ứng dụng React, nhưng nó cũng có thể được sử dụng với Angular, Vue.js hoặc JavaScript vanilla cũ đơn giản.

Một điều mà mọi người cảm thấy khó khăn về Redux là biết khi nào nên sử dụng nó. Ứng dụng của bạn càng lớn và càng phức tạp thì càng có nhiều khả năng bạn sẽ được hưởng lợi từ việc sử dụng Redux. Nếu bạn bắt đầu làm việc trên một ứng dụng và bạn biết rằng nó sẽ phát triển đáng kể, thì bạn nên bắt đầu với Redux ngay lập tức để ứng dụng của bạn thay đổi và mở rộng, bạn có thể dễ dàng thực hiện những thay đổi đó mà không cần tái cấu trúc rất nhiều code hiện có của bạn.

Trong phần giới thiệu ngắn gọn về Redux này, chúng ta sẽ đi qua các khái niệm chính: reducers, actions, action creators và store. Thoạt nhìn có vẻ như là một chủ đề phức tạp, nhưng các khái niệm cốt lõi thực sự khá đơn giản.

#### What’s a Reducer?
Reducer là một hàm lấy State cũ và Action làm đối số và trả về State mới. Action là một đối tượng có thuộc tính type và một thuộc tính tùy chọn chứa thông tin cửa trạng thái mới:
```js
function myReducer(previousState, action) => {
  // use the action type and payload to create a new state based on
  // the previous state.
  return newState;
}
```
Các Reducer chỉ định cách thay đổi trạng thái của ứng dụng được thay đổi để đáp ứng với các Action được gửi đến từ Store.

> Do các Reducer là các pure function, chúng ta không thay đổi các đối số được cung cấp cho nó, như thực hiện các lệnh gọi API, hoặc gọi các non - pure function như Math.random () hoặc Date.now ().
> 
> *Pure function là các hàm  nhận đầu vào và trả về giá trị mà không sửa đổi bất kỳ dữ liệu nào ngoài phạm vi của nó (Side Effect)
> 

Nếu ứng dụng của bạn có nhiều phần State, thì bạn có thể có nhiều Reducer. Ví dụ: mỗi tính năng chính trong ứng dụng của bạn có thể có Reducer riêng. Reducer chỉ quan tâm đến giá trị của State.
#### What’s an Action?
CácAction là các đối tượng JavaScript đơn giản đại diện cho  dữ liệu từ ứng dụng của bạn đến Store. Action  có thuộc tính type và một thuộc tính tùy chọn chứa thông tin cửa trạng thái mới.

Hầu hết các thay đổi trong ứng dụng sử dụng Redux bắt đầu bằng một sự kiện được kích hoạt bởi người dùng trực tiếp hoặc gián tiếp. Các Action thường được gửi đi bằng cách sử dụng một Action creator.

#### What’s an Action Creator?
Trong Redux, Action creator là một hàm trả về một đối tượng Action. Action creator có vẻ như là một bước không cần thiết, nhưng nó làm cho mọi thứ trở nên linh hoạt hơn và dễ dàng cho việc test. Đối tượng Action được trả về từ một Action creator được gửi đến tất cả các Reducer ứng dụng.

Tùy thuộc vào Action là gì, Reducer có thể chọn trả về một phiên bản mới của State. Những thuộc tính mới trong State được trả về sau đó được chuyển sang State của ứng dụng, sau đó được chuyển trở lại vào ứng dụng React của chúng ta, điều này sau đó khiến tất cả các component được render lại.

Vì vậy, giả sử người dùng nhấp vào nút, sau đó chúng ta gọi Action creator là hàm trả về một Action. Action đó có một loại mô tả loại hành động vừa được kích hoạt.
```js
export function addTodo({ task }) {
  return {
    type: 'ADD_TODO',
    payload: {
      task,
      completed: false
    },
  }
}
```
Và ở đây, một Reducer đơn giản liên quan đến Action có type  = ADD_TODO:
```js
export default function(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      const newState = [...state, action.payload];
      return newState;

    // Xử lý nhiều Action khác như 'TOGGLE_TODO', 'DELETE_TODO',...

    default:
      return state;
  }
}
```
Tất cả các Reducer xử lý Action. Các Reducer không quan tâm đến loại Action cụ thể mà chỉ trả quan tâm đến việc trả về State mới. Bây giờ tất cả các component được thông báo về những thay đổi đối với State. Sau khi được thông báo, tất cả các component sẽ render lại với các props mới:
```
{
  currentTask: { task: '🛒 get some milk', completed: false },
  todos: [
    { task: '🛒 get some milk', completed: false },
    { task: '🎷 Practice saxophone', completed: true }
  ],
}
```
#### Combining Reducers
Redux cung cấp cho chúng ta một hàm gọi là CombReducers thực hiện hai nhiệm vụ:
* Nó tạo ra một hàm gọi tới các Reducer với một phần của State được chọn theo key của chúng.
* Sau đó, nó kết hợp các kết quả thành một đối tượng một lần nữa.

#### What is the Store?
Trong Redux, Store đề cập đến đối tượng mang các Action (đại diện cho những gì đã xảy ra) và các Reducer (cập nhật State theo các Action đó) cùng nhau. Chỉ có một Store duy nhất trong ứng dụng Redux.

Store có một số nhiệm vụ:
* Cho phép truy cập vào State thông qua getState()
* Cho phép State được cập nhật thông qua dispatch (action)
* Giữ toàn bộ State ứng dụng.
* Đăng ký listener bằng cách gọi subcribe(listener)
* Hủy đăng ký listener thông qua hàm được trả về bởi subcribe(listener

Về cơ bản tất cả những gì chúng ta cần để tạo ra một Store là Reducer. Sử dụng CombReducers để kết hợp nhiều Reducer thành một. Bây giờ, để tạo một Store, chúng ta sẽ  import combineReducers và truyển nó vào createdStore:

```js
import { createStore } from 'redux';
import todoReducer from './reducers';

const store = createStore(todoReducer);
```
Sau đó, chúng ta gửi các Action trong ứng dụng của mình bằng cách sử dụng phương thức dispatch của Store như sau:
```js
store.dispatch(addTodo({ task: '📖 Read about Redux'}));
store.dispatch(addTodo({ task: '🤔 Think about meaning of life' }));
// ...
```
#### Data Flow in Redux
Một trong nhiều lợi ích của Redux là tất cả dữ liệu trong một ứng dụng tuân theo cùng một mẫu vòng đời. Logic của ứng dụng của bạn dễ dự đoán hơn và dễ hiểu hơn, bởi vì kiến trúc Redux tuân theo một luồng dữ liệu đơn.

4 bước chính của vòng đời dữ liệu trong Redux:
* Một sự kiện bên trong ứng dụng của bạn sẽ kích hoạt lệnh gọi tới store.dispatch(actionCreator(payload)).
* Store  gọi tới Reducer gốc  với State hiện tại và Action
* Reducer gốc kết hợp đầu ra của nhiềuReducer thành một cây  State duy nhất.
    ```js
    export default const currentTask(state = {}, action){
      // deal with this piece of state
      return newState;
    };

    export default const todos(state = [], action){
      // deal with this piece of state
      return newState;
    };

    export default const todoApp = combineReducers({
      todos,
      currentTask,
    });
    ```
    Khi một Action được phát ra, ứng dụng sẽ gọi cả hai Reducer và kết hợp cả hai bộ kết quả vào một State
    ```js
    return {
      todos: nextTodos,
      currentTask: nextCurrentTask,
    };
    ```
*  Redux Store lưu cây State hoàn chỉnh được trả về bởi Reducer gốc. Cây State mới hiện là nextState của ứng dụng của bạn.


-----
Hết :D

Bài viết được dịch từ [An Introduction to Redux's Core Concepts](https://alligator.io/redux/redux-intro/)