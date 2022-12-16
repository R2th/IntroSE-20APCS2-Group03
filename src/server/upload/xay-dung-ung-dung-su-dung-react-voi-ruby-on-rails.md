## Giới thiệu

Có hai phương pháp phổ biến mà bạn có thể sử dụng để tạo ứng dụng react với ruby on rails. Cách đầu tiên là tạo 2 ứng dụng riêng biệt - một cho frontend react vào của bạn và một rails api. Cách thứ 2 là tạo một ứng dụng duy nhất, thiết lập nó với react ngay từ đầu bằng cách sử dụng webpack.

Trong bài viết này, chúng ta sẽ đi xây dựng  một ứng dụng "Hello world" đơn giản kết hợp react với rails và webpack.

## Xây dựng

Bắt đầu tạo mới một project rails. Tuy nhiên, khi chạy lệnh tạo mới project rails, ta sẽ thêm webpack ngay ngoài cổng và chỉ định react. 

`rails new react-app --webpack=react`

Các lệnh tiếp theo sẽ tự động chạy, nếu không, bạn cần thêm các mục sau:

```
rails webpacker:install
rails webpacker:install:react
bundle exec spring binstub
```

Điều này sẽ xử lý cài đặt và thiết lập cơ bản cho ứng dụng rails / react. Bây giờ chúng ta có thể tạo controller với trang index và thiết lập root path cho ứng dụng của mình. Sử dụng lệnh tạo controller trong rails:

`rails g controller pages index`

Bây giờ, hãy để pages#index  thành root path cho ứng dụng này:

*config/routes.rb*

`root "pages#index"`

Tiếp theo, bên trong thư mục javascript, hãy thay đổi file mặc định từ hello.jsx thành index.jsx. Sau đó, chúng ta có thể đưa file pages#index  vào khi chúng ta tạo controller trang ở trên:

*views/pages/index.html.erb*

`<%= javascript_pack_tag "index" %>`

Bây giờ, hãy  tạo một thư mục components và thêm một App component mới vào ứng dụng react / rails:

*javascript/App.js*

```
import React from "react"

class App extends React.Component {
  render () {
    return (
      <div>Hello World</div>
    ) 
  } 
}  
export default App
```

Sau đó quay lại file index.js, chúng ta có thể đưa vào component mới của mình:

*javascript/packs/index.jsx*

```
import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import App from "App"

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App/>,
    document.body.appendChild(document.createElement('div')),
  )
})
```

Bây giờ, hãy chạy ứng dụng của bạn để thấy kết quả:
![](https://images.viblo.asia/be345b5e-2551-4d21-8925-9f366abf896f.png)

## React router

Tiếp theo, ta sẽ tạo ra các trang mới. Ở đây ta sẽ sử dụng router trong react để dẫn tới các trang đó.

React Router là một thư viện điều hướng tiêu chuẩn trong React. Nó giúp cho UI được đồng bộ với URL. Nó có API đơn giản nhưng mạnh mẽ, có thể giúp giải quyết được rất nhiều vấn đề.

Để sử dụng được router, ta phải thiết lập cài đặt trong ứng dụng. Cài đặt cũng khá đơn giản, bạn chỉ cần chạy: 
```
npm install react-router
npm install react-router-dom
```

Sau khi cài đặt xong, ta bắt đầu đi tạo các component và sử dụng router.

Trong file index.jsx bạn thêm: `import { BrowserRouter as Router, Route, Link } from "react-router-dom";` và viết lại file index như sau:

```
import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import App from "App"

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
      <Route path = "/" component = {App}>
   </Router>,
    document.body.appendChild(document.createElement('div')),
  )
})
```

Tiếp theo, trong file App.jsx ta sửa lại như sau:

```
import React from "react"
import { Route, Switch } from "react-router-dom"

class App extends React.Component {
  render () {
    return (
      <div>
        <Switch>
          <Route exact path = "/" component = {Home} />
          <Route exact path = "/about" component = {About} />
          <Route exact path = "/contact" component = {Contact} />
      </Switch>
   </div>
    ) 
  } 
}
export default App
```

Sau đó, ta tạo các file component Hom.jsx, About.jsx và Contact.jsx như dưới đây:

```
//File Home.jsx
import React from "react"

class Home extends React.Component {
   render() {
      return (
         <div>
            <h1>This is the Home page.</h1>
         </div>
      )
   }
}
export default Home

//File About.jsx
import React from "react"

class About extends React.Component {
   render() {
      return (
         <div>
            <h1>This is the About page.</h1>
         </div>
      )
   }
}
export default About

//File Contact.jsx
import React from "react"

class Contact extends React.Component {
   render() {
      return (
         <div>
            <h1>This is the Contact page.</h1>
         </div>
      )
   }
}
export default Contact
```

Tiếp đó, ta import các file đó vào file App.jsx:

```
import Home from "./Home"
import About from "./About"
import Contact from "./Contact"
```

Cuối cùng, bạn phải cấu hình đường dẫn trong routes:

`match "*path", to: "pages#index", via: :all`

## Kết luận

Bài viết trên hướng dẫn các bước để tạo một ứng dụng rails kết hợp với react và webpack cơ bản nhất, giúp cho những bạn mới tìm hiểu về react có thể tự tạo được một app đơn giản để hiểu về cách react hoạt động cũng như có thể vận dụng để phát triển app một cách tốt nhất và hiệu quả nhất.

Tài liệu tham khảo: https://www.youtube.com/watch?v=5F_JUvPq410&t=9s