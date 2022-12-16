***React** (còn được gọi là `React.js` hoặc `ReactJS` ) là một thư viện JavaScript để xây dựng giao diện người dùng. Nó được duy trì bởi Facebook và một cộng đồng gồm các nhà phát triển và công ty cá nhân. -- Wikipedia.*

React là một framework JavaScript tuyệt vời có một cộng đồng tuyệt vời đằng sau nó. Nó ngày càng phát triển và mở rộng và React đang thay đổi cách mọi người trên toàn thế giới trải nghiệm internet.

Trong bài viết này, mình muốn trình bày cách tạo một ứng dụng cơ bản nhưng đã organized, có cấu trúc và sẵn sàng để áp dụng ứng dụng của React. Đối với mình, kết quả cuối cùng của bài này có thể được coi là khung để bắt đầu một dự án mới.

## 1. Điều kiện tiên quyết và giả định
* Hiểu biết chung về lập trình, phát triển web và JavaScript.
* Phiên bản mới nhất của Yarn cho hệ điều hành của bạn.
* Trình chỉnh sửa văn bản yêu thích của bạn (Mình thì hay sử dụng Sublime Text gọn nhẹ =)) ).

## 2. Tạo ứng dụng ban đầu

*LƯU Ý: Trong suốt hướng dẫn này, mình khuyên bạn nên thường xuyên kiểm tra xem có lỗi nào xuất hiện trên cả terminal và browser của bạn hay không nhé.*

Trước tiên kiểm tra xem bạn đã cài đặt Yarn chưa. Trên terminal chạy:
```
yarn -v
1.15.2
```
Chúng ta sẽ thấy ở trên, số xuất ra là phiên bản yarn chúng ta đã cài đặt. Nếu có lỗi hoặc 'command không tìm thấy' thì xem lại cài đặt cấu hình chung của bạn bị lỗi.

Bây giờ, cùng bắt đầu nào, chạy lệnh tạo project:
```
yarn create react-app my-react-app
```

Lệnh này sẽ tạo ra init React. Chạy ứng dụng này ngay bây giờ và xem nó trông như thế nào nhé. Di chuyển vào thư mục dự án chúng ta vừa tạo và chạy ứng dụng:
```
cd my-react-app
yarn start
```
Nếu chúng ta truy cập http://localhost:3000/ trong trình duyệt, chúng ta có thể thấy ứng dụng ban đầu được tạo. Nó sẽ trông giống như thế này:

![](https://images.viblo.asia/dc93c0d0-177d-4507-9a43-d912678774fd.gif)

Những dòng ứng dụng đầu tiên đã được cài đặt và bây giờ hãy biến nó thành của riêng mình nhé.

## 3. Thực hiện một ứng dụng có cấu trúc

Trước khi chúng ta thực sự bắt đầu đào sâu, hãy hoàn thiện tổ chức cơ bản. Cấu trúc file hiện tại của chúng ta trông như thế này:
![](https://images.viblo.asia/9d888e86-aaa6-4cd1-9e40-9019ba8664d0.png)

Ban đầu chúng ta sẽ tạo ba thư mục bên trong thư mục `src`.

* `components` - Trong thư mục này `Components` sẽ được tạo, chúng ta có thể định nghĩa các thành phần là các phần UI độc lập và có thể sử dụng lại.
*  `pages` - Đây là nơi chúng ta sẽ tạo `Pages` cho ứng dụng web này, cả tĩnh và động. Sự khác biệt giữa các thành phần và các trang rất quan trọng. Các trang sẽ là toàn bộ chế độ xem mà người dùng sẽ thấy. Nói chung, một trang được tạo nên từ các thành phần ghép lại.
* `services` - Thư mục dịch vụ là nơi sẽ tạo nhiều `services` cho phép tìm nạp, chuyển đổi và lưu trữ dữ liệu. Chúng ta sẽ tạo ra các service để xử lý các chức năng khác nhau trong ứng dụng.

Bây giờ thư mục src của chúng ta sẽ trông như thế này:

![](https://images.viblo.asia/436f6e1a-adf1-4feb-87e4-a93bd8f7d482.png)

Bây giờ chúng ta có một cấu trúc cơ bản để làm theo trước khi chúng ta bắt đầu code. Một việc khác, sẽ phải làm trước đó chỉ là clear tất cả những thứ mà React ban đầu  tạo ra cho chúng ta.

Đầu tiên, chúng ta có thể xóa logo.svg vì chúng ta thực sự không cần logo React lớn. Tiếp theo, hãy mở App.js và xem mã bên trong, nó sẽ trông giống như thế này:

![](https://images.viblo.asia/42f489aa-8a3a-4ab1-819c-1d78a7ce8bcd.png)

Ta sẽ xóa và giữ lại để App.js như thế này:
```js
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Xin chào các bạn!</h1>
    </div>
  );
}

export default App;
```
Nếu chúng ta kiểm tra ứng dụng của mình bây giờ thì hy vọng nó sẽ trông như thế này.

![](https://images.viblo.asia/d09c9f35-5bf9-4f44-b0eb-d7deeef9f482.png)

## 4. Cùng dựng Project của riêng mình nào

### 4.1. Router
Chúng ta sẽ cài đặt và thiết lập router cho ứng dụng. Router cho phép người dùng dễ dàng điều hướng qua các trang trong ứng dụng. Hãy dừng server và trong thư mục gốc của dự án chạy cài đặt:
```
yarn add react-router-dom
```

Package này là `React Router` mà trước đây đã trở thành một tiêu chuẩn cho React. Với cài đặt này, chúng ta có thể cấu hình nó trong ứng dụng. Hãy xem tệp `index.js`:

*index.js*

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

```


Chúng ta sẽ wrap thành phần `App` bằng router, cụ thể là `Browser Router`, bạn có thể tìm hiểu thêm về lợi ích của `Browser Router` trong tài liệu [React Router](https://reacttraining.com/react-router/web/api/BrowserRouter?source=post_page---------------------------). Sau khi ta cập nhật `index.js` với router của mình, nó sẽ trông như thế này:

*index.js*
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, document.getElementById('root')
);

serviceWorker.unregister();
```

### 4.2. Các thành phần cơ bản
Đầu tiên, chúng ta sẽ tạo hai thành phần trong thư mục thành phần :
![](https://images.viblo.asia/a0f38f4a-cd0f-4967-9e18-368a08f35bc9.png)
Lưu ý rằng mình đã tạo một thư mục cho mỗi thành phần sau đó thêm tệp JavaScript bên trong nó. Điều này sẽ có ích sau này.

Thành phần `Main` sẽ là nơi các trang khác nhau sẽ hiển thị và thay đổi nhau, trong khi thành phần Header sẽ hiển thị trong mỗi trang.

Ở đây mình sẽ tạo ra các thành phần dựa trên chức năng bởi vì chúng nhẹ và nhanh chóng để thực hiện (tìm hiểu thêm về các thành phần dựa trên chức năng và các lớp thành phần của chúng ở [đây](https://reactjs.org/docs/components-and-props.html?source=post_page---------------------------) ).

Nhưng trước khi tạo các thành phần này, bạn cập nhật `App.js` nhé:
```js
import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

function App() {
  return (
    <div className="App">
      <Header/>
      <Main/>
    </div>
  );
}

export default App;
```

Chúng ta đã thêm cả hai component vào `components` App. Bây giờ, tạo `Header` và `Main` để không bị gặp lỗi:

*components/Header/Header.js*
```js
import React from "react";

function Header() {
  return (
    <header>
      <h1>Our React Starter</h1>
    </header>
  );
}

export default Header;
```

*component/Main/Main.js*
```js
import React from "react";

function Main() {
  return (
    <main>
      <h1>This is the Main Component</h1>
    </main>
  );
}

export default Main;
```

Bây giờ `yarn start` lại ứng dụng nhé, bạn sẽ thấy:

![](https://images.viblo.asia/63ce808d-80ac-40fd-bd7b-a8b05f95ecec.png)

Điều này có vẻ khá tốt rồi, nhưng nó vẫn chưa làm được gì nhiều. Hãy thử và tạo các trang và điều hướng giữa chúng nhé

### 4.3. Tạo trang

Vì mục đích của hướng dẫn này, mình sẽ chỉ tạo hai trang khác nhau để điều hướng là: `Home` và hiển thị thông tin người dùng `User` . `Home`  sẽ hiển thị danh sách người dùng mà ta sẽ truy xuất từ một số API (trong trường hợp này là [https://jsonplaceholder.typicode.com/users/](https://jsonplaceholder.typicode.com/users?source=post_page---------------------------)). Khi một trong những người dùng đó được nhấp vào, ta sẽ điều hướng đến trang `User` nơi dữ liệu của họ sẽ được hiển thị.

Đầu tiên, ta sẽ tạo cấu trúc cơ bản của các trang này và tạo các `router` cho mỗi trang. Mình đã chọn sử dụng các thành phần dựa trên lớp cho các trang và mình có xu hướng sử dụng các thành phần dựa trên lớp (dựa trên chức năng) cho các trang vì nhiều trang thường cần quản lý state. Tìm hiểu thêm về `state` ở [đây](https://reactjs.org/docs/state-and-lifecycle.html?source=post_page---------------------------) .

Vì vậy, sau khi tạo các tệp của mình, cấu trúc sẽ trông như thế này:
![](https://images.viblo.asia/adbac0c9-cd8a-4f0b-9cda-5ca5004650b6.png)
Lưu ý một lần nữa mình đã tạo các thư mục cho mỗi trang giống như mình đã làm với các thành phần trước đó. Khi chúng được tạo, hãy thêm mã init vào mỗi trang. Cả hai sẽ gần giống nhau nhưng sẽ có sự khác biệt nhỏ giữa chúng:

*pages/Home/Home.js*
```js
import React from "react";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    console.log("Home Page");
  }
  render() {
    return (
      <div>
        <h2>Here's a list of users: </h2>
      </div>
    );
  }
}

export default Home;

```

*pages/UserPage/UserPage.js*
```js
import React from "react";

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    console.log("User Page");
    console.log(this.props.match.params.number);
  }

  render() {
    return (
      <div>
        <h2>User: </h2>
      </div>
    );
  }
}

export default UserPage;

```
Một vài điểm chung trong cả hai trang này đó là đều khởi tạo lớp `constructor` là nơi xác định trạng thái ban đầu. Tiếp theo, hàm `componentDidMount` được gọi và sẽ kích hoạt khi trang này được render. Nó sẽ ghi tên trang trong bảng điều khiển `browser` (cũng như `id` người dùng cho trang `UserPage`). Cuối cùng, chức năng `render` là nơi mà thực tế sẽ được hiển thị.

Cuối cùng, hãy cập nhật thành phần `Main` để ta có thể tạo `router` chính xác cho trang của bạn.

*components/Main/Main.js*
```js
import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "../../pages/Home/Home";
import UserPage from "../../pages/UserPage/UserPage";

function Main() {
  return (
    <main>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users/:id" component={UserPage} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default Main;

```


Trong thành phần `Main`, chúng ta tạo hai router, một `router` cho `Home` và một `router` khác cho `User Page` (lưu ý rằng đường dẫn này có một biến `id`). Bây giờ chúng ta có thể tạo liên kết đến từng trang!

Đảm bảo rằng sau khi thực hiện tất cả điều này, dự án của bạn đang được xây dựng chính xác và kiểm tra trang của bạn ( http://localhost:3000/ và http://localhost:3000/user/1 )!

### 4.4. Tạo một Service và triển khai nó

Khi chúng ta bắt đầu tạo trang, ta nói rằng chúng sẽ hiển thị một số dữ liệu mà chúng tôi đã truy xuất từ đâu đó. Để làm điều đó, chúng ta sẽ tạo ra một dịch vụ sẽ xử lý các yêu cầu và sau đó liên kết chúng trong các trang. Để bắt đầu, chúng ta sẽ cài đặt `Axios`, một Máy khách HTTP phổ biến cho React.

```
yarn add axios
```

Khởi động lại server của bạn và bây giờ chúng ta có thể dễ dàng tạo dịch vụ này. Tương tự như trước đây, hãy tạo một thư mục cho dịch vụ có tên `UserService` và tệp JavaScript phù hợp bên trong.

![](https://images.viblo.asia/5087d3ef-078e-4639-af3b-4e35219bf716.png)

Trong file này, chúng ta có thể tạo yêu cầu thực tế cho ứng dụng của mình. Chúng ta sẽ sử dụng tài liệu Axios để xem cách package xử lý các yêu cầu và sau đó hãy lấy một số dữ liệu! Như mình có nhắc trước đó, chúng ta sẽ nhận được dữ liệu từ [https://jsonplaceholder.typicode.com/users/](https://jsonplaceholder.typicode.com/users/) (bạn có thể truy cập liên kết đó để xem response mà chúng ta sẽ nhận được). Dưới đây mình đã tạo một số chức năng để thực hiện các yêu cầu `GET` đến điểm cuối này.

*services/UserService.js*
```js
import axios from "axios";
const API_URL = "https://jsonplaceholder.typicode.com";

class UserService {
  async getAllUsers() {
    const url = `${API_URL}/users/`;

    return axios.get(url).then(response => response.data);
  }

  async getUser(id) {
    const url = `${API_URL}/users/${id}`;

    return axios.get(url).then(response => response.data);
  }
}

export default UserService;

```

Ở đây mình đã tạo một `class` sẽ chứa tất cả các chức năng liên quan đến `user`. Hai chức năng đã được thực hiện, một để lấy tất cả người dùng và một chức năng khác chỉ cho một `id` người dùng.

Bây giờ chúng ta thực sự có thể thực hiện các phương thức này vào các trang của mình và hiển thị dữ liệu được truy xuất. Đây là trang chủ được cập nhật:

*pages/Home/Home.js*
```js
import React from "react";
import { Link } from "react-router-dom";
import UserService from "../../services/UserService/UserService";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };

    this.userService = new UserService();
  }

  componentDidMount() {
    this.userService.getAllUsers().then(response => {
      this.setState({ users: response });
    });
  }

  renderUsers = () => {
    return this.state.users.map((user, key) => {
      return (
        <li key={key}>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </li>
      );
    });
  };

  render() {
    return (
      <div>
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

export default Home;

```
Thấy rằng ở đây chúng ta đang khởi tạo của `UserService` của chúng ta đã xây dựng, sau đó lấy tất cả những `users` khi `render` thành phần, và cuối cùng là hiển thị từng user (renderUsers ). Lưu ý rằng chức năng `renderUser` đã được tạo, tách riêng như này để sau này khi `render` ít bị lộn xộn hơn.

Cập nhật UserPage:

*pages/UserPage/UserPage.js*
```js
import React from "react";
import UserService from "../../services/UserService/UserService";

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };

    this.userService = new UserService();
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    this.userService.getUser(id).then(response => {
      this.setState({ user: response });
    });
  }

  render() {
    const user = this.state.user;

    return (
      <div>
        <h2>Name: {user.name}</h2>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
      </div>
    );
  }
}

export default UserPage;

```
Trang này khá giống với trang `Home` nhưng vẫn có một số khác biệt chính. Lưu ý rằng `constructor` đang sử dụng các `props`, chúng ta thực hiện điều này bởi vì chúng ta đang đưa các thuộc tính vào thành phần như URL param `id`.

Sau khi tất cả các thay đổi được xây dựng và bạn đảm bảo rằng bạn không có lỗi nào, hãy liên tục kiểm tra ứng dụng của mình nhé!

![](https://images.viblo.asia/b3b51ac6-d7d4-4c1e-9d11-58ac875a019c.gif)

Chúng ta đã tạo một ứng dụng nhiều trang lấy dữ liệu từ một nơi khác! Và trên hết nó là mã của mình đã được Organized (<3<3<3)

### 4.5. Favorite Styling

Mặc dù mình không muốn dành nhiều thời gian cho việc tạo style nhưng mình nghĩ rằng việc import vào một số style khi mình đang sử dụng ở đây để đẹp mắt hơn. Chúng ta phải tạo các file của mình, cấu trúc file được cập nhật như sau:

![](https://images.viblo.asia/dec74692-9bcd-4695-b5cd-f7e16b54c3fd.png)

Mình hy vọng bây giờ các bạn đã thấy tại sao ban đầu chúng ta lại tạo ra các thư mục con cho mỗi thành phần. Bằng cách thực hiện phạm vi cục bộ có thể tạo riêng style của mình, điều này cho phép ứng dụng của chúng ta có tổ chức hơn, đặc biệt là khi nó mở rộng.

*LƯU Ý: Những thứ khác cuối cùng cũng đã có thể được thêm vào trong các thư mục con này, chẳng hạn như `Test` cho các `components`, `pages`, hoặc `services`.*

Đây là style thêm vào:

*components/Header/Header.css*
```css
header {
  color: white;
  background-color: #c1c1c1;
  height: 100%;
}
h1 {
  text-align: left;
  margin: 0 5px 5px 5px;
}

```
*components/Main/Main.css*
```css
li {
  list-style-type: none;
}
.link {
  text-decoration: none;
  color: black;
  cursor: auto;
}
.link:hover {
  text-decoration: none;
  color: #1192d3;
  cursor: auto;
}
.link:visited {
  text-decoration: none;
  cursor: auto;
}

```
Mặc dù điều này không có cách nào lý tưởng về phong cách và quy ước CSS, nhưng nó sẽ hoàn thành công việc ngay bây giờ. Quá thực tế để thực hiện các style chúng ta cũng phải import các file này trong mỗi component. Giống như này:

*components/Header/Header.js*
```js
import React from "react";
import './header.css';

function Header() {
 return (
    <header>
      <h1>Our React Starter</h1>
    </header>
  );
}

export default Header;

```
*components/Main/Main.css*
```js
import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "../../pages/Home/Home";
import UserPage from "../../pages/UserPage/UserPage";

import './main.css';

function Main() {
  return (
    <main>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users/:id" component={UserPage} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default Main;

```
Chúng ta cũng đã đặt một `class` có tên 'link', ở file Home

*pages/Home/Home.js*
```js
renderUsers = () => {
    return this.state.users.map((user, key) => {
      return (
        <li key={key}>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </li>
      );
    });
  };
```

Và giờ hãy tới xem thành quả của chúng ta nào
![](https://images.viblo.asia/6cbe35c4-6611-4de9-a996-72caeeb5a378.gif)

Mặc dù bài này chỉ trình bày những điều cơ bản ban đầu để tạo ra ứng dụng React. Nhưng bằng cách tạo ứng dụng React theo cách mình hy vọng có thể dễ dàng thêm, thay đổi và xóa các tính năng trong ứng dụng của chính mình. Thêm vào các thư mục Test với Jest, SCSS, TypeScript, v.v. là tất cả những gì chúng ta có thể làm để cải thiện ứng dụng mà chúng ta vừa tạo.

source: https://medium.com/swlh/creating-a-create-react-project-e0f022a229ee