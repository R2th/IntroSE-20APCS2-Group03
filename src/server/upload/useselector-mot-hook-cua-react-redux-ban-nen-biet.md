Khi react hook sinh ra cho phép ta sử dụng các hook như một phép thay thế lifecyce  cho function component. Hẳn là đã rất vui mừng rồi phải không. Nhưng nếu dùng hết hook cho function component liệu redux có nằm ngoài cuộc chơi này.

Câu trả lời chắc chán là không rồi, ai đã từng làm reactjs mà không dùng qua redux để quản lí store một lần thì thật thiếu sót.

Để bắt kịp xu hướng, thì react redux, cũng cho ra mắt hàng loạt các hook của mình, giúp các nhà phát triển cảm thấy mình được nâng nui, chiều chuộng.

Một trong các hook mà mình hay dùng nhất, và mình cho là hay nhất của redux hook đó là `useDispatch` và `useSelector`.

Hôm nay mình sẽ giới thiệu cách dùng `useSelector`, nó có gì hay chúng ta cùng phân tích

1. Nếu trong một component, mà bạn muốn lấy giữ liệu trong store thì có những cách nào

Một là connect vào store sau đó mapStateToProp truyền vào container, sau đó từ container truyền vào cho component. Đây là cách truyền thống, chúng ta thường rất hay làm, nhưng chúng ta có nhận thấy một điều là, truyền như thế nếu truyền tới nhiều component con, thì code sẽ lặp lại rất nhiều tầng

Từ component A truyền cho B và B truyền cho C. Giả sử đến component C mới dùng props đó, thì việc truyền như thế gây code thừa, không những thế còn validate các `propType` ở các component nữa.

Nếu bạn sử dùng typescript, hoặc fow để check props type cho các component là rất nhiều phải không nào, props ở các compnent A, B không dùng đến nhưng C lại cần nó. Để giải quyết vấn đề này mình thường hay dùng `useSelector` để access vào thằng store để lấy dữ liệu cần thiết cho component C.

API `useSelector` các bạn có thể tham khảo trực tiếp trên trang chủ của [reac redux](https://react-redux.js.org/api/hooks)

Mình cùng phân tích một ví dụ sau để hiểu sâu hơn vấn đề nhé

giả sử trong store mình có dữ liệu như sau:

```js
{
   user: {
       firstname: 'Cuong',
       lastname: 'Nguyen Phuc' 
    }
}

```

Mình định nghĩa một component `User` để hiển thị thông tin user ra

Cách một mình sẽ `mapStateToProps` như bình thường vẫn làm 

```js
function mapStateToProps(state) {
  return {
    user: state.user
  }
}
```

Hoặc bạn có thể dùng với `reselect` tuỳ ứng dụng bạn đang dùng là nhé :yum: 

còn nếu bạn dùng `useSelector` thì đơn giản chúng ra import vào vào gọi một cách rất đơn giản như sau:

```js
import React from 'react'
import { useSelector } from 'react-redux'

export const User = props => {
  const user = useSelector(state => state.user)
  return (<>
          <div>{user.fisrtname}</div>
          <div>{user.lastname}</div>
          </>
      )
}

```

Câu hỏi đặt ra là, liệu khi `dispacth` một action giả sử là `changeUser` thì component `User` kia có thay đổi giá trị của user đó không? 

Câu trả lời là có, cơ chế của `userSelector` là, nó sẽ so sánh giá trị trước và sau nếu khác nhau thì component tự động re-render lại, ngược lại giống nhau sẽ không re-render lại component các bạn nhé

Việc sử dụng hook redux cũng rất hay ho phải không các bạn, hi vọng bài chia sẻ này giúp bạn sử dụng thêm một api mới của `react redux` mà không phải maps state to prop rồi truyền qua nhiều component con nữa