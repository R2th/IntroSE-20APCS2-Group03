# GIỚI THIỆU 
Nói đến thư viện dùng để đảm bảo tính bất biến của dữ liệu thì hẳn các bạn nghĩ ngay đến ImmuatableJS của Facebook, tuy nhiên thì bản thân mình thấy thư viện này sử dụng khá lằng nhằng và phức tạp nên không sử dụng nhiều. Trong lúc lượn lờ trên Twitter thì mình có thấy dòng tweet của anh bạn Dan Abramov (nằm trong team phát triển ReactJS và là đồng tác giả của Redux) giới thiệu về thư viện ImmerJS nên mình đã tìm hiểu qua về thư viện này.
> https://twitter.com/dan_abramov/status/1045993442449518592

Immer (Tiếng Đức nghĩa là: Luôn luôn) là 1 thư viện nhỏ cho phép bạn làm việc với immutable state 1 cách thuận tiện hơn. Cách hoạt động của thư viện này dựa trên cơ chế [copy-on-write](https://en.wikipedia.org/wiki/Copy-on-write).

Ý tưởng ban đầu là bạn sẽ áp dụng mọi thứ bạn muốn thay đổi trong 1 trạng thái tạm thời gọi là draftState và đại diện cho currentState. Một khi tất cả các thay đổi đã hoàn thành, Immer sẽ tạo ra nextState dựa trên sự thay đổi trong draftState. Điều này có nghĩa là bạn hoàn toàn có thể tương tác với dữ liệu bằng cách thay đổi nó trực tiếp trong khi vẫn có thể giữ lại tính bất biến của dữ liệu.

![alt](https://raw.githubusercontent.com/mweststrate/immer/master/images/hd/immer.png)

# API:
Immer cung cấp 1 API duy nhất nhưng đảm nhiệm mọi công việc.

`produce(currentState, producer: (draftState) => void): nextState`

# Áp dụng
Mình sẽ đưa ra các ví dụ về việc sử dụng, gồm cả việc sử dụng trong React.setState và trong Reducer của Redux.

## Ví dụ 1
```javascript
import produce from "immer"

// baseState là 1 Array Object

const baseState = [
    {
        todo: "Học TypeScript",
        done: true
    },
    {
        todo: "Dùng thử immer",
        done: false
    }
]

// Giờ ta muốn thêm 1 phần tử vào Array này

const nextState = produce(baseState, draftState => { // draftState chính là 1 bản sao của baseState,
                                                     // ta có thể thay đổi draftState tùy ý mà không sợ ảnh hưởng đến baseState
    draftState.push({todo: "Post facebook khoe thành quả"})
    draftState[1].done = true                        // draftState[1] == baseState[1] => { todo: "Dùng thử immer", done: true }
})
```

## Ví dụ 2 (Sử dụng trong React.setState)
setState theo cách thông thường
```javascript
onBirthDayClick1 = () => {
    this.setState(prevState => ({
        user: {
            ...prevState.user,
            age: prevState.user.age + 1
        }
    }))
}
```

Tuy nhiên thì setState cũng nhận giá trị đầu vào là function nên ta có thể tạo một curried producer và đơn giản hơn
```javascript
onBirthDayClick2 = () => {
    this.setState(
        produce(draft => {
            draft.user.age += 1
        })
    )
}
```

## Ví dụ 3 (Dùng trong Reducer của Redux)
Đây là một ví dụ đơn giản về lợi ích mà Immer đem lại trong thực tế.

```javascript
// Redux reducer
// Dựa trên: https://github.com/reactjs/redux/blob/master/examples/shopping-cart/src/reducers/products.js
const byId = (state, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        ...action.products.reduce((obj, product) => {
          obj[product.id] = product
          return obj
        }, {})
      }
    default:
      return state
  }
}
```

Sau khi sử dụng Immer:
```javascript
import produce from "immer"

const byId = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RECEIVE_PRODUCTS:
        action.products.forEach(product => {
          draft[product.id] = product
        })
      }
  })
```
Ngay khi đọc qua ta có thể thấy, thay vì phải dùng spread operator của ES6 trong mỗi action, ta chỉ cần bọc toàn bộ action trong hàm produce của Immer và thay đổi trực tiếp giá trị trong draftState giúp cho reducer của ta vừa ngắn gọn, vừa dễ chỉnh sửa và vẫn đảm bảo tính bất biến
# Lợi ích
* Cá nhân mình thấy lợi ích đầu tiên của nó là API đơn giản, dễ đọc dễ hiểu, cú pháp ngắn gọn hơn các thư viện cùng mục đích (cụ thể là ImmutableJS).
* Update dữ liệu nhanh hơn
* Nhỏ gọn: Đóng gói và nén lại còn 2KB.
* Vân vân và mây mây
Các bạn muốn tìm hiểu nhiều hơn về thư viện này thì có thể vào [đây](https://github.com/mweststrate/immer) để đọc.