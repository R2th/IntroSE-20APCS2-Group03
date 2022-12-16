## Mở đầu
&nbsp;&nbsp;&nbsp;&nbsp;Xìn chào các bạn :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye:, mới gần đây mình có học sang reactjs..Rất nhiều thứ cần phải note lại. Qua quá trình học mình đã găp nhiều khó khăn. Mình rút ra kinh nghiệm là không nên nôn nóng mà hãy bắt đầu từ cái đơn giản nhất. Trong bài này mình và các bạn cùng tìm hiểu về làm thế nào để đưa giao diện html vào reactjs :smile::smile::smile:.
## Nội dung bài học
### Các nội dung chính
1.  Tạo project và chạy được ra màn hình mặc định của reactjs.
2.  Phân tích sơ qua các thư mục ban đầu.
3.  Cắt ghép một số giao diện đơn giản.
### 1.  Tạo project và chạy được ra màn hình mặc định của reactjs
&nbsp;&nbsp;&nbsp;&nbsp;Cú pháp để tạo một project reactjs là :

> yarn create react-app my-app


trong đó `my-app` là tên project.  
:kissing_heart: mình sẽ để link cài đặt `yarn` ở bên dưới dành cho bạn nào chưa cài nhé:kissing_heart:

![](https://images.viblo.asia/afacba7f-1f43-45d5-bc4d-3f1b2dd4855e.png) 

Dòng lệnh yarn create react-app my-app khi chạy trên terminal 

-----
Sau đó chúng ta vào thư mục chứa project và tiến hành chạy  `yarn start` đến đây chúng ta đã tạo xong rồi và câu lệnh kia để chạy.

![](https://images.viblo.asia/4a1714a0-fcb9-429a-b516-d41b0dfa6c33.png)

Khi chạy terminal với câu lệnh `yarn start` 

-----
Chờ một lúc trình duyệt sẽ tự mở và project của chúng ta đã hiện ra trước mắt rồi.
### 2. Phân tích sơ qua các thư mục ban đầu
![](https://images.viblo.asia/9e03a844-ca9b-4c95-ae3d-68a0fc8ff744.png)

&nbsp;&nbsp;&nbsp;&nbsp;Khi nhìn vào đây chúng ta cũng có thể hình dung phải không..:stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye:

&nbsp;&nbsp;&nbsp;&nbsp;Đầu tiên là `node_modules` nơi đây sẽ chứa các thư viện của app của chúng ta, 
thư mục `public` hiện tại mình mới biết thư mục chứa các file liên quan tới người dùng, ví dụ như ảnh sau này. 
Còn tiếp đến là cái lõi của chúng ta. Trong thư mục `src` là nơi chưa toàn bộ code của chúng ta dành cho app này.
### 3. Cắt ghép một số giao diện đơn giản 
&nbsp;&nbsp;&nbsp;&nbsp;Đầu tiên chúng ta tạo thêm một thư mục `components` nơi đây chứa các `components` của hệ thống. 
còn `Component` là gì thì mình xin phép để ở bài sau nha. Ở bài này mình coi như nó một phần không thể thiếu và dùng nha.

![](https://images.viblo.asia/395328de-92dd-4eae-8fe4-01fb58957dbd.png)


Cấu trúc thư mục sau khi thêm `Component`

-----
&nbsp;&nbsp;&nbsp;&nbsp;Trong cấu trúc này ta để ý đến `index.html` trong này là html của ứng dụng của chúng ta, chúng ta có thể nhúng các thư viện như javascript, css ...
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  </body>
</html>
```

bạn để ý đến thẻ `div` có `id="root"` vì chính thẻ này sẽ chứa nội dung ứng dụng của bạn. :stuck_out_tongue_winking_eye:

nó được gọi ở `index.js` 
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
```

&nbsp;&nbsp;&nbsp;&nbsp;Đến đây bạn lại thấy chỗ render `<App />` đó chính là component chính được gọi và đưa vào thẻ div có `id = "root"`

&nbsp;&nbsp;&nbsp;&nbsp;Tiếp theo bạn hãy theo mình vào xem file `app.js` có gì nha.
```javascript
import React, { Component } from 'react';
import '../App.css';
import UsersComponent from "./UsersComponent";
class App extends Component {
  render() {
    return (
      <div className="App">
        <UsersComponent/>
      </div>
    );
  }
}

export default App;
```

&nbsp;&nbsp;&nbsp;&nbsp;Ở component này mình coi là component cha và gọi các component khác vào khi muốn chạy chúng...như ở trên mình gọi `<UsersComponent/>` đây chính là nội dung ứng dụng của mình, ở đây mình cũng có import file `css` vào để dùng chung cho cả app.

&nbsp;&nbsp;&nbsp;&nbsp;Giờ chúng ta đến bước làm sao để viết nội dung cho các component đây..:relieved::relieved::relieved:

&nbsp;&nbsp;&nbsp;&nbsp;Nếu các bạn nhìn qua thì nó có vẻ là các thẻ html, nhưng thực chất chúng chỉ giống nhau, nhưng không phải tất cả..một bên là `html` thuần, bên còn lại là `jsx`..
ví dụ chúng ta thấy rõ rệt nhất đó `class` trong `html` nhưng lại là `className` ở `jsx`

&nbsp;&nbsp;&nbsp;&nbsp;Tuy nhiên bạn có thể vào đây [Click here](https://magic.reactjs.net/htmltojsx.htm) để chuyển toàn bộ code `html` sang
`jsx`

Quay lại với project của mình ở file `UsersComponent.js`
```javascript

import React, { Component } from 'react';
import AddUserComponent from "./AddUserComponent";
class UsersComponent extends Component {
    render() {
        return (
            <div className="container">
                <div className="panel panel-success conten-user">
                    <div className="panel-heading header-user">Users</div>
                    <div className="panel-body tabel-text-input">
                        <div className="row">
                            <div className="col-md-9">
                                <table className="table table-user">
                                    <thead>
                                    <tr>
                                        <td>STT</td>
                                        <td>Name</td>
                                        <td>Mobile</td>
                                        <td>Permission</td>
                                        <td>Action</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Vu Duy Luat</td>
                                        <td>0369199605</td>
                                        <td>HY</td>
                                        <td>
                                            <button type="button" className="btn btn-warning edit-user">Edit</button>
                                            <button type="button" className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Vu Duy Luat</td>
                                        <td>0369199605</td>
                                        <td>HY</td>
                                        <td>
                                            <button type="button" className="btn btn-warning edit-user">Edit</button>
                                            <button type="button" className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-3">
                                <AddUserComponent/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UsersComponent;
```

&nbsp;&nbsp;&nbsp;&nbsp;Như các bạn thấy trên đây là đoạn code nội dung , các bạn nhìn từ đầu đến cuối thì tất cả các nội dung được bao bởi `một` div duy nhất. Chúng ta có thể hiểu là nó chỉ có thể có một bố thôi...:grinning::grinning::grinning::stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye:

Sau khi viết code theo các code trên, các bạn có thể tạo ra cho mình ứng dụng chạy bằng `reactjs` rồi đó..kết quả nè 

![kết quả của app khi chạy trên trình duyệt ](https://images.viblo.asia/256d7e0d-1829-4e34-9b07-d2afd3c4418a.png)
Kết quả nè :heart_eyes::heart_eyes::heart_eyes:

-----
## Tổng kết
&nbsp;&nbsp;&nbsp;&nbsp;Qua những gì chúng ta vừa tìm hiểu và làm thì giờ đây cũng coi như là ta vừa xong cái bài huyền thoại của dân lập trình đó là `Hello Word` rồi ahihi..hi vọng các bạn vỡ ra được điều gì đó trước khi ta tìm hiểu vào sâu thêm.

## Tài liệu tham khảo

&nbsp;&nbsp;&nbsp;&nbsp;Các bạn có thể tìm hiểu và cài đặt `yarn` ở đây [Click here](https://yarnpkg.com/lang/en/docs/install/#debian-stable) :kissing_heart:

&nbsp;&nbsp;&nbsp;&nbsp;và cần hơn hết các link học đúng không ạ [basic reactjs ](https://reacttraining.com/react-router/web/example/basic) :stuck_out_tongue_closed_eyes: