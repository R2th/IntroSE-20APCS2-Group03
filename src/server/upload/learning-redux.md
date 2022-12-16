# Redux
Có 2 mục đích chính của redux đó là 
- Việc xác định View Renders
- Xác định việc tạo ra state
Việc xác định là rất quan trọng cho viẹc test ứng dụng và fix bugs, nếu một ứng dụng mà không xác định được view nào sẽ thay đổi, state khi nào update thì rất khó để biết được liệu views hay state có hợp lệ hay không
Mục đích chính của Redux là để tách biệt phần quản lý state từ I/O side như render view hay làm việc với network …,
Khi mà các bên độc lập với nhau thì code trở nên đơn giản hơn, dễ hiểu, dễ dàng cho việc test logic …
## Benefit
* Predictable state update: dễ dàng cho việc hiểu cách luồng data trong ứng dụng sẽ thực thi ra sao
* Sử dụng “Pure reducer function” làm cho logic trên nên đơn giản hơn, việc test debug trở nên dễ dàng
* Centralizing the state: Dễ dàng thực thi việc logging change data, persisting data


# flux architecture
* Đầu tiên là fixed state
* Sau đó render view, và state không thể thay đổi tại thời điểm render
* Khi render cùng 1 state (state không thay đổi) thì view sẽ luôn luôn được render giống nhau.
* Event listeners lắng nghe user input và network request, Khi lấy được dữ liệu, actions sẽ được dispatch tới store
* Khi một action được dispatched, state sẽ được update. Chỉ có dispatched action mới có thể giao tiếp với state.

One way data:

Đối với flux , view sẽ listen user input và chuyển hoá nó thành action objects ( những object này sẽ được gửi tới store). Store sẽ update application state và thông báo tới view để render lại

State update trong flux là transaction, nó không chỉ đơn giản là gọi một phương thức để update state hay update giá trị trực tiếp mà các action objects sẽ được gửi tới store. 1 action object là một transaction record, 

action object: 
```

{
 type: ADD_TODO,
 payload: 'Learn Redux'
}
```
Object có khả năng giữ log của tất cả các transactions state, log này được dùng để tái tạo lại state.

Khi bạn khởi tạo cùng một state và cùng một thứ tự transaction thì nó luôn luôn trả về cùng một kết quả

Điều này có ý nghĩa quan trọng:
* dễ dàng test
* dễ dàng undo/redo
* Time travel debugging
* Durability: Nếu state bị xoá và nếu bạn có record của các transaction thì bạn hoàn toàn có thể tái tạo lại state
# Một số ứng dụng không cần dùng tới redux
Nếu như một UI workflow đơn giản thì việc sử dụng redux là thừa thãi không cần thiết như các trường hợp sau:
* các user workflow là đơn giản
* Các user không có sự liên kết, kết nối với nhau
* Không cần quan lý sự kiện của server hay websocket
* Bạn lấy dữ liệu từ một single data cho mỗi view

Thế nhưng nếu ứng dụng của bạn ngày một lớn việc quản lý view state ngày càng trở nên phức tạp thì redux sẽ là lựa chọn hữu  ích.
# Reducer
```
Redux = Flux + Functional Programming
```
Reducer phải là một Pure functional :
* Cho cùng một đầu vào thì luôn luôn trả về cùng giá trị ở đầu ra
* No side-effects

Reducer phải trả về một object mới , bạn có thể sử dụng
`Object.assign({}, state, { thingToChange })`

Mảng là kiểu tham chiếu, bạn không thể sử dụng push, pop... để thêm items mới (bỏ đi) vào trong một mảng của reducer bởi push sẽ làm thay đổi , chỉnh sửa lại giá trị của reducers, bạn có thể sử dụng `concat` thay vì push

```
const ADD_CHAT = 'CHAT::ADD_CHAT';
const defaultState = {
  chatLog: [],
  currentChat: {
    id: 0,
    msg: '',
    user: 'Anonymous',
    timeStamp: 1472322852680
  }
};
 
const chatReducer = (state = defaultState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CHAT:
      return Object.assign({}, state, {
        chatLog: state.chatLog.concat(payload)
      });
    default: return state;
  }
};
```
Như ví dụ trên có thể thấy new object được tạo ra với `Object.assign()` và được append vào array bằng concat thay vì push.

## Sử dụng constant cho action type
Nếu sử dụng string cho các action type làm cho code đọc khó hiểu. Hay nếu như bạn có gõ sai action type action sẽ bị lỗi mà bạn một cách không rõ ràng.

Nhưng nếu sử dụng constant thì khi bạn typo và dispatch đi một undefined action constant app sẽ sinh ra một lỗi constant. 

Giữ tất cả các action type cho reducer ở một nơi điều đó làm cho việc đọc dễ hiểu hơn:
* Tránh trùng lặp tên
* Nhanh hiểu được reducer app
* dễ dàng xem được sự thay đổi trong pull request.

Demo source: https://github.com/khanhhd/client_friendly_shop

## nguồn tham khảo 
https://medium.com/javascript-scene/10-tips-for-better-redux-architecture-69250425af44