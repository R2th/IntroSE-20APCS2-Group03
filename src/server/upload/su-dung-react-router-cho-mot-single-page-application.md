React không tích hợp sẵn router, nhưng chúng ta có thể dễ dàng cài đặt với thư viện` react-router-dom`. Routing là cách web chuyển hướng. 

Ví dụ : bạn truy cập  taniarascia.com, bạn sẽ tới trang chủ  taniarascia.com. Nếu bạn chuyển tới trang taniarascia.com/me, bạn sẽ được điều hướng đến trang "about me". Nếu bạn truy cập  taniarascia.com/categories/javascript hoặc taniarascia.com/categories/css, bạn sẽ tới trang danh sách danh mục. Routes sẽ như sau :
```
/ - root
/:page_id - page
/categories/:category_id - category
```
Website này cũng là một SPA, chỉ 1 page được tải và mọi click đến trang mới sẽ tải một số dữ liệu JSON bổ sung, nhưng không thực sự request resource từ index.html và about-me.html . Tôi sẽ cho bạn biết cách cài đặt một SPA đơn giản với React với react-router-dom, và kéo dữ liệu qua URL. Bạn có thể xem source code ở [đây](https://github.com/taniarascia/router-example) :

Trước khi đọc bài này, bạn nên đọc :
-  [ Getting Started with React](https://www.taniarascia.com/getting-started-with-react/) hoặc [Build a React App with Hooks](https://www.taniarascia.com/crud-app-in-react-with-hooks/)  nếu bạn chưa biết về React hoặc React hooks
-  [How to Connect to an API in JavaScript ](https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/) nếu bạn chưa biết về cách làm việc với API.

# Cài đặt
Tạo một app React mới
```
npx create-react-app router-example
```
Project có 2 đính kèm là `react-router-dom` cho router và `axios` dùng cho gọi API :
```
npm install react-router-dom axios
```
Hoặc
```
yarn add react-router-dom axios
```
## BrowserRouter
Để sử dụng `react-router-dom`, chúng ta cần bọc toàn bộ App component trong BrowserRouter. Có 2 loại router:
- BrowserRouter - tạo URL chuẩn đẹp kiểu example.com/about
- HashRouter - tạo URL với hashtag kiểu như example.com/#about

Hãy cùng sử dụng BrowserRouter 
```
// src/index.js

import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#root')
)
```
## Router và Switch
Trong file App.js, chúng ta có thể quyết định routes chúng ta muốn sử dụng và điều hướng phù hợp. Chúng ta sẽ sử dụng Route và Switch cho phần này.
- switch - nhóm tất cả các routes lại với nhau, và đảm bảo chúng được ưu tiên từ trên xuống dưới.
- route - từng route riêng
```
// App.js

import React from 'react'
import { Route, Switch } from 'react-router-dom'
// We will create these two pages in a moment
import HomePage from './pages/HomePage'
import UserPage from './pages/UserPage'

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/:id" component={UserPage} />
    </Switch>
  )
}
```
Chúng ta đang để root` (/)` là HomePage, và tự động khớp với các trang khác với UserPage. Tôi chỉ có 1 route cho ví dụ đơn giản này, nhưng bạn có thể làm nhiều hơn thế :
```
<Switch>
  <Route exact path="/" component={HomePage} />
  <Route path="/:id" component={UserPage} />
  <Route path="/categories" component={CategoriesPage} />
  <Route path="/categories/:id" component={IndividualCategoryPage} />
</Switch>
```
Điều này đảm bảo rằng taniarascia.com/categories sẽ dẫn tới 1 trang danh sách các danh mục, nhưng taniarascia.com/categories/javascript sẽ dẫn đến một mẫu hoàn toàn khác cho danh sách danh mục.
## Link
Để link tới một trang SPA khác , chúng ta sử dụng thẻ Link. nếu sử dụng thẻ `<a href="/route">`, nó sẽ tạo một request mới và reload lại trang, và `Link` giúp ta làm điều này.
```
//src/pages/HomePage.js

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="container">
      <h1>Home Page</h1>
      <p>
        <Link to="/taniarascia">taniarascia</Link> on GitHub.
      </p>
    </div>
  )
}
```
Bây giờ cùng đến route đầu tiên, root được load ở HomePage, và thấy nội dung kem theo link như hình.
![](https://images.viblo.asia/a8fb9927-d271-462d-83d3-661f0381aa0a.png)
## Dynamic Route Parameter
Link điều hướng tới /taniarasca, nơi sẽ match với /:id trong Route. Để tự linh động trong việc lấy nội dung từ URL - trong trường hợp này, taniarasca -  chúng tôi sẽ sử dụng `match.params.id` từ props.

Tôi sẽ sử dụng param để tạo một cuộc gọi tới Github API và  lấy data. Trong ví dụ này, tôi sẽ sử dụng Hooks, nên nếu bạn không quen với chúng, bạn có thể đọc bài [Building a CRUD App with Hooks](https://www.taniarascia.com/crud-app-in-react-with-hooks/).
```
src/pages/UserPage.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function UserPage(props) {
  // Setting initial state
  const initialUserState = {
    user: {},
    loading: true,
  }

  // Getter and setter for user state
  const [user, setUser] = useState(initialUserState)

  // Using useEffect to retrieve data from an API (similar to componentDidMount in a class)
  useEffect(() => {
    const getUser = async () => {
      // Pass our param (:id) to the API call
      const { data } = await axios(`https://api.github.com/users/${props.match.params.id}`)

      // Update state
      setUser(data)
    }

    // Invoke the async function
    getUser()
  }, []) // Don't forget the `[]`, which will prevent useEffect from running in an infinite loop

  // Return a table with some data from the API.
  return user.loading ? (
    <div>Loading...</div>
  ) : (
    <div className="container">
      <h1>{props.match.params.id}</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Website</th>
            <th>Followers</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.name}</td>
            <td>{user.location}</td>
            <td>
              <a href={user.blog}>{user.blog}</a>
            </td>
            <td>{user.followers}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
```
![](https://images.viblo.asia/57659f29-273b-409f-bd39-eab2819e9aec.png)
# Kết luận
Nếu bạn lỡ một điều gì trong bài thì có thể xem source [tại đây ](https://github.com/taniarascia/router-example)

Nguồn : https://www.taniarascia.com/using-react-router-spa/