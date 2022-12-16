React context API là một cách cơ bản để tạo các biến toàn cục có thể được truyền qua trong ứng dụng React. đây là phương pháp thay thế cho "prop drilling", hoặc truyền props từ ông nội sang cha và sang con, v..v.. Context thường được coi là đơn giản hơn, nhẹ nhàng hơn để sử dụng Redux cho quản lý state. Bài viết này sẽ nêu một số bước ngắn gọn, súc tích để bắt đầu với Context.

Bên nên đọc [Getting Started with React ](https://www.taniarascia.com/getting-started-with-react/)hoặc [Build a React App with Hooks](https://www.taniarascia.com/crud-app-in-react-with-hooks/) nếu bạn chưa biết về React hoặc React hook.
# Tạo context
Tưởng tượng có một số thông tin muốn có thể dùng ở bất cứ đâu trong ứng dụng React. Một chủ đề có thể được thực hiện bằng cách sử dụng Context - ví dụ, trên trang này, có Context phục vụ 3 chủ đề : chế độ dark, light, và MS-DOS (trên 404 page). Trong ví dụ đơn giản này, ta sẽ sử dụng một user đã đăng nhập.

Tạo Context, và gọi nó là UserContext. Điều này sẽ cung cấp UserContext.Provider và UserContext.Consumer. Những gì hai thành phần này làm đơn giản là :
- Provider : thành phần cung cấp giá trị
- Consumer : thành phần sử dụng giá trị
Vậy ta sẽ tạo nó với React.createContext() trong 1 file mới gọi là UserContext.js
```
import React from 'react'

const UserContext = React.createContext({})

export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer
export default UserContext
```
Ttruyền vào một object rỗng ở dây để thể hiện rằng có thể điền dữ liệu này sau bằng gọi API. Bạn có thể điền trước dữ liệu này với bất kỳ dữ liệu nào bạn muốn, trong trường hợp bạn không truy xuất dữ liệu thông qua API.
  ```
  React.createContext(true)
  ```
# Providing Context
Provider luôn cần tồn tại như một trình bao bọc xung quanh phần tử cha, bất kể bạn chọn tiêu thị các giá trị như nào. Ta sẽ bao thành phần App component trong Provider. Chỉ tạo một vài giá trị user và truyền nó xuống như giá trị prop Provider.
```
src/App.js
import React from 'react'
import HomePage from './HomePage'
import { UserProvider } from './UserContext'

function App() {
  const user = { name: 'Tania', loggedIn: true }

  return (
    <UserProvider value={user}>
      <HomePage />
    </UserProvider>
  )
}
```
Bây giờ bất kì con, cháu, chắt .v.v.. sẽ có thể truy cập vào user như một prop. Không may, việc lấy giá trị này có liên quan nhiều hơn một chút so với chỉ đơn giản là nhận nó như bạn có thể với` this.props` hoặc `this.state`
# Consumer context
Cách bạn cung cấp Context giống nhau cho các class và functional component, nhưng việc sử dụng nó có chút khác biệt.
## Class component
Cách truyền thống để truy xuất các giá trị Context là bằng cách gói thành phần con trong Consumer. Từ đó, bạn sẽ có thể truy cập prop giá trị như props.
```
src/HomePage.js (class example)
import React, { Component } from 'react'
import { UserConsumer } from './UserContext'

class HomePage extends Component {
  render() {
    return (
      <UserConsumer>
        {props => {
          return <div>{props.name}</div>
        }}
      </UserConsumer>
    )
  }
}
```
Nhưng còn về phương thức vòng đời ? nếu bạn cần giá trị từ context ngoài của render thì sao ? phương thức bao bị hạn chế. thay vào đó, chúng ta có thể làm điều này trong một class với contextType, đây là một biến static trong class.
```
src/HomePage.js (class example)
import React, { Component } from 'react'
import UserContext from './UserContext'

class HomePage extends Component {
  static contextType = UserContext

  componentDidMount() {
    const user = this.context

    console.log(user) // { name: 'Tania', loggedIn: true }
  }

  render() {
    return null
  }
}
```
## Functional component and Hooks
Với Functional component bạn sẽ sử dụng `useContext` như ví dụ bên dưới. Điều này tương đương với `static contextType`.
```
src/HomePage.js
import React, { useContext } from 'react'
import UserContext from './UserContext'

function HomePage() {
  const user = useContext(UserContext)

  console.log(user) // { name: 'Tania', loggedIn: true }

  return null
}
```
# Kết luận
- Sử dụng` const xContext = React.createContext()` để tạo context.
- Kéo` xContext.Provider` và `xContext.Consume`r ra ngoài `xContext`
- `Provider` bao quanh component cha
- Một class có thể sử dụng với `static contextType = xContext`
- Một functional component có thể sử dụng với `const x = useContext(xContext)`

Nguồn : https://www.taniarascia.com/using-context-api-in-react/