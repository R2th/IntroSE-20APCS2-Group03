Xin chào các bạn, bài viết này mình sẽ giới thiệu redux là gì, cấu trúc nó ra làm sao, nguyên lý cơ bản của nó.
## Redux là gì?
Theo định nghĩa trong doc của redux:
```
Redux is a predictable state container for JavaScript apps.
```
Hiểu nôm na nó là 1 thư viện JavaScript giúp quản lý state của ứng dụng 1 cách khoa học và hiệu quả hơn. Redux này nó là **predictable**, cái này mình sẽ giải thích sau nhé.
## Nguyên tắc hoạt động của Redux
### Cấu trúc
![](https://images.viblo.asia/02b5e869-9205-4791-88b1-de11b90d3591.gif)
Redux có 4 thành phần như sau:

**1. Actions**

 Action là nơi mang các thông tin gửi từ ứng dụng đến Store, mô tả mình muốn làm cái gì với cái store này. Các thông tin này là 1 object mô tả những gì đã xảy ra. Action gồm 2 phần là type (kiểu mô tả action), và giá trị tham số truyền lên:
 ```
 {
  type: "KIEU_ACTION",
  payload: //tham số
}
 ```
 Ví dụ: tạo 1 action có kiểu là LOGIN, và tham số là email và password
 ```
 const handleLogin = (email, pass) => {
  return {
    type: Action.LOGIN.value,
    email,
    password: pass
  };
};
 ```
**2. Reducers**

Action có nhiệm vụ mô tả những gì xảy ra nhưng lại không chỉ rõ phần state nào của response thay đổi và thay đổi như thế nào -> việc này sẽ do Reducer đảm nhiệm.
Reducer nhận 2 tham số: state cũ và thông tin action được gửi lên, sau đó nó biến đổi trả ra một state mới, không làm thay đổi state cũ.

```
(previousState, action) => newState
```

**3. Store**

Store là 1 object lưu trữ tất cả state của ứng dụng, cho phép truy cập state qua getState(), update state qua dispatch(action), đăng kí listener qua subscribe(listener).
Quay lại cái cấu trúc của redux ở bên trên, bạn nhìn vào cái phần Store nhé. Trong store nó có Dispatcher, Reducer, State. Dispatcher là cái phần nó quản lý middleware, thường dùng để gọi API, log, vv... , phần này phức tạp mình sẽ nói ở bài viết sau nhé :). Sau khi dispatch xong thì nó đẩy xuống ông Reducer, ông reducer này đơn giản là 1 function nhận vào 2 thứ: state cũ và thông tin action, biến đổi cho ra state mới (như phần reducer mình nói bên trên). Chính nhờ cái này mà redux có tính *predictable*, tức là cùng 1 state, cùng 1 action thì nó luôn luôn cho ra 1 state mới giống nhau, luôn luôn là như vậy.

**4. View**

 View là phần giao diện của mình, hiển thị giao diện thông qua state của store.

### Ví dụ
Mình sẽ phân tích ví dụ đơn giản ở trong doc của redux:
```
import { createStore } from 'redux'

/**
 // 1.
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

// 2.
let store = createStore(counter)

// 3.
store.subscribe(() => console.log(store.getState()))

// 4.
store.dispatch({ type: 'INCREMENT' }) // in ra 1
store.dispatch({ type: 'INCREMENT' }) // in ra 2
store.dispatch({ type: 'DECREMENT' }) // in ra 1
```

Giải thích:
* Step 1. (là mục 2.): khởi tạo **store** cho project mà nó nhận tham số đầu vào là **reducer counter** ở trên:
```
let store = createStore(counter)
```
* Step 2. (là mục 4.): gọi action thông qua hàm dispatch của store, action là 1 object có type là 'INCREMENT' hoặc 'DECREMENT' như ở trên và không có tham số.
* Step 3. (là mục 1.): lúc này là nhiệm vụ của reducer, nó sẽ kiểm tra xem kiểu của action gửi lên là gì ('INCREMENT' hay 'DECREMENT') để nó return ra 1 new state cụ thể là state + 1 hay là state - 1.
* Step 4. (là mục 3.): thằng subcrible() trong store sẽ làm nhiệm vụ cập nhật tình hình thay đổi ra View, ở đây mình chỉ log ra state thôi.

Đến đây thì cơ bản bạn đã nắm được nguyên lý hoạt động của Redux:
```
action -> reducer -> store -> View
```

Có mấy nguyên tắc bạn cần nhớ về Redux như sau:
* Redux sử dụng kiến trúc 1 chiều, tức là nó có flow như bên trên, chỉ vòng vòng 1 chiều như vậy, action -> reducer -> store -> view.
* State của toàn bộ ứng dụng được lưu trong trong 1 store duy nhất là 1 Object mô hình tree: Single source of truth.
* Redux state là READ-ONLY: bạn không thể thay đổi trực tiếp state được, chỉ có 1 cách duy nhất để update state là phải dispatch một action (là một js object).
* Những thay đổi của redux state được thực hiện bởi Pure functions (reducer).

Bài viết tiếp theo mình sẽ viết về ***middleware*** , một phần quan trọng nhất của redux, cái mà chúng ta sẽ dùng liên tục trong các dự án thực tế. Cảm ơn các bạn đã theo dõi bài viết.