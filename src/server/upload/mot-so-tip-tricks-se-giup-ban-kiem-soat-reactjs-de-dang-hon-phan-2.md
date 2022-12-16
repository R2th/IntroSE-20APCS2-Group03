Ở bài viết trước, mình đã giới thiệu đến các bạn một vài tip and tricks giúp chúng ta có thể kiểm soát ReactJS dễ dàng hơn. Bài viết hôm nay sẽ là phần 2 cho chủ đề này.

Bạn có thể xem lai phần 1 tại [đây](https://viblo.asia/p/mot-so-tip-tricks-se-giup-ban-kiem-soat-reactjs-de-dang-hon-phan-1-3P0lP2w8Kox)

## Use The React Context API For Passing Props

Có lẽ bạn đã nhiều lần trải qua tình huống mà các component bị lồng nhau quá nhiều cấp, và bạn cần truyền một props từ component cha xuống component con ở cấp dưới, trong đó những component ở giữa chỉ mang tính chất là nơi chung chuyển. Và React Context API xuất hiện để giải quyết vấn đề này giúp bạn.

Trong ví dụ này, mình sẽ tạo một context mới:

```
import React from 'react'

const AuthContext = React.createContext({})

export const AuthProvider = AuthContext.Provider
export default AuthContext
```

ParentComponent là nơi mà mình muốn phân phối props với provider vừa được tạo

```
import React from 'react'
import ChildComponent from './components/ChildComponent'
import { AuthProvider } from './context/AuthContext'

function ParentComponent() {
  const auth = { userId: '123456', loggedIn: true }

  return (
    <AuthProvider value={auth}>
      <ChildComponent />
    </AuthProvider>
  )
}
```

Và bây giờ, tất cả các phần tử con của ParentComponent có thể access vào `auth` như một props
Thật tuyệt phải không?
Bây giờ tất cả những gì chúng ta phải làm là sử dụng context tại component con. Mình sẽ dùng một function component và useContext Hook để làm điều này:

```
import React, { useContext } from 'react'
import AuthContext from './context/AuthContext'

function ChildComponent() {
  const auth = useContext(AuthContext)

  console.log(auth) // { userId: '123456', loggedIn: true }

  return null
}
```

Nếu có nhiều component con được lồng vào nhau, chúng cũng sẽ có quyền truy cập vào context. Awesome!

## Conditionals in JSX

Viết JXS thật sự rất hay và nó là một trong những tính năng chính của React. Để cải thiện khả năng coding của bản thân, bạn có thể sử dụng một vài mẹo nhỏ này.

Thay vì sử dụng

```
{ return loginAttempts < maxAttempts ? <MyComponent/> : null }
```

chúng ta có thể viết ngắn gọn hơn như thế này:

```
{ return loginAttempts < maxAttempts && <MyComponent/> }
```

Ngoài ra để tối ưu hoá thêm một số case khác của câu lệnh điều kiện, các bạn có thể tham khảo bài viết này của mình tại [đây](https://viblo.asia/p/toi-uu-cau-lenh-dieu-kien-de-doc-hon-trong-javascript-m68Z0x4MZkG)

## Higher Order Components

Hiểu cơ bản, Higher Order Components (HOC) là một kỹ thuật nâng cao trong React, nó nhận vào một component, và trả về một phiên bản mới cho component đó. Ví dụ như thế này:

```
const MyNewComponent = (MyBaseComponent) => {
  // ... copy old component, add additional data/functionality and update
  return UpdatedComponent
}
```

HOC được sử dụng trong một số trường hợp như tránh việc lặp lại code và sử dụng lại logic ở nhiều component khác nhau.

Một ví dụ điển hình chính là "connect" từ Redux. Và một ví dụ thực tế hơn có thể thấy:

```
const colorizeElement = Element => props => <Element {...props} color="blue" />
```

Đầu tiên, chúng ta tạo một HOC (colorizeElement) với một element giữ tất cả các props và có một props mới là color (blue). Chúng ta có thể sử dụng HOC để tạo một button màu xanh mới như thế này:

```
const MyButton = () => {
  return <button>I am a Button</button>
}

const ColoredButton = colorizeElement(MyButton)

function MyComponent() {
  return (
    <div className="MyComponentClass">
      <h1>Hello you colored Button</h1>
      <ColoredButton />
    </div>
  )
}
```

Khá hay phải không?

## React DevTools

React DevTools là một tiện ích mở rộng trình duyệt thú vị có sẵn cho Chrome và Firefox, được phát triển bởi duy trì bởi Facebook React Core Team. Phiên bản mới nhất 4.5.0 ra mắt vào tháng 3 năm 2020 và extension này thực sự hữu ích cho bất kỳ nhà phát triển React nào.

![](https://images.viblo.asia/05958609-cb98-470f-9913-f38d04d45a07.png)

Nó hoạt động tốt với React và React Native, giúp bạn nắm được những gì đang xảy ra bên trong ứng dụng React của bạn

Điều thú vị là một số công ty lớn như Airbnb hay Netflix đều đang sử dụng React và nếu bạn truy cập vào trang web của họ, bạn có thể tìm thấy thông tin về các trang web đó trong browser console nếu bạn đã cài đặt React DevTools

![](https://images.viblo.asia/1a5024fb-66c1-48a0-ab49-1ab03e5cf674.jpeg)

## Lời kết
Trên đây là một số tip trick nhỏ giúp chúng ta có thể làm chủ được React dễ dàng hơn. Mong bài viết này sẽ giúp đỡ phần nào các bạn trong việc học và bỏ túi ReactJS.

tham khảo: https://dev.to/simonholdorf/10-tips-tricks-that-will-make-you-a-better-reactjs-dev-4fhn