CLo anh em  :sunglasses:

Hôm nay mình sẽ cùng mọi người tìm hiểu qua một chút về cách sử dụng của thằng Router trong React js, nhằm mục đích hỗ trợ các anh em đang tập tành làm quen với React js.

Vào việc luôn thôi nào !!!

Học cái gì thì đầu tiên cũng nên biết về khái niệm của nó đúng không :

## Vậy thì React Router là gì ???

Như mọi người cũng đã biết, trong React thì các components được coi như một trái tim đầy sức mạnh, nhưng bản thân React lại không hỗ trợ `Router`. Chính vì vậy , `React Router` ra đời nhằm hộ trợ việc định tuyến (routing) tiêu chuẩn trong React. `React Router` giúp cho giao diện của ứng dụng đồng bộ với URL trên trình duyệt, định tuyến luồng dữ liệu trong ứng dụng một cách rõ ràng. Nói một cách đơn giản, nếu anh em đang có URL này , nó sẽ tương ứng với Route và giao diện tương ứng.

Theo mình thấy trên github thì phiên bản hiện tại là : **v5.2.0**.

Link github : https://github.com/ReactTraining/react-router

# Bắt đầu nào :

Trước khi làm gì thì anh em cũng nên khởi tạo một project demo đúng ko : 
```javascript
npx create-react-app demo-react-router
```

Tiếp sau đó anh em cài đặt cho mình :

```javascript
npm install react-router-dom
```
Để có thể tạo được routes, việc đầu tiên chúng ta cần làm là import **BrowserRouter** từ **react-router-dom**

```javascript
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
```

Thằng  **BrowserRouter**  thì hay được sử dụng hơn, do nó sử dụng **History API** trong HTML 5 để theo dõi lịch sử bộ định tuyến.

Tiếp theo muốn tạo ra các `route` thì mọi thứ trong `App.js` cần phải được bao quanh bằng thẻ` <Router>`. Ở trên phần import, anh em có thể thấy mình sử dụng **Switch**

Mục đích sử dụng của thằng `<Switch>` này là gì ? Nó sẽ watch tất cả các thằng con trong `<Route>` và hiển thị phần tử đầu tiên có đường dẫn khớp với URL hiện tại. Switch được sử dụng bất cứ lúc nào khi mà chúng ta có quá nhiều routes, nhưng lại chỉ muốn một trong số chúng được render tại một thời điểm.
    
Okk sau khi thêm đầy đủ thì App.js của anh em sẽ như sau :
```javascript
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";

function App() {
    return (
        <Router>
            <div>
                // Route của anh em đặt ở đây nhé
            </div>
        </Router>
    );
}

export default App;
```

Do quá lười tạo folder nên anh em chịu khó thêm phần này dưới cho mình, mình không khuyến khích làm thế này nhé =)), các component nên được tách ra, anh em có thể xem lại bài viết này của mình : https://viblo.asia/p/7-lan-code-react-cua-ban-boc-mui-bWrZnm2QKxw

```javascript
function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}

function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
}

function Dashboard() {
    return (
        <div>
            <h2>Dashboard</h2>
        </div>
    );
}
```

Rồi, giờ đến phần đăng kí các routes, để đăng kí được các routes, chúng ta sử dụng thẻ **<Route>**, thằng này thì bao gồm hai phần **path** và **component**, path chính là phần mà chúng ta sẽ hiển thị trên URL, còn **component** chính là thành phần mà sẽ được trỏ đến khi nhập đúng route, thử nhé :
   
```javascript
function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
```
Kết quả sẽ được như sau :
    
![](https://images.viblo.asia/6596d8a8-0812-4a0f-9ee9-98fc5b681db4.gif)

Okk thế là chúng ta đã tạo được route rồi, giờ mình lại có một vấn đề như sau, anh em cùng xem hình nhé :
![](https://images.viblo.asia/76565373-5687-4c0a-ae26-22850c9eecc3.gif)

 Giờ khi mình muốn truy cập vào about/detail và muốn hiển thị About Detail thì sao ? mình lại giới thiệu cho anh em thuộc tính exact, exact được sử dụng trong **<Route>** để khẳng định rằng **<Route>** này chỉ hoạt động nếu URL trên trình duyệt phù hợp tuyệt đối với giá trị của thuộc tính trong path của nó :
```javascript
        <Switch>
            <Route exact path="/">
               <Home/>
             </Route>
             <Route exact path="/about">
                <About/>
              </Route>
              <Route exact path="/about/detail">
                <AboutDetail/>
               </Route>
               <Route path="/dashboard">
                <Dashboard/>
               </Route>
         </Switch>
```
    
Thế là chúng ta sơ sơ đã sử dụng được về Route rồi đó, giờ để sử dụng bất kì route nào, chúng ta bắt đầu dùng để thằng <Link>, cách sử dụng nó như sau : 
```javascript
 <Link to="/about">About</Link>
```
Link bao gồm **to**, chính là route mà anh em muốn liên kết đến. Ngay say khi nhập /about, có thể thấy được ngay lập tức chúng ta sẽ thấy được những gì mà Component About sẽ hiển thị.
    
# Bonus : Truyền tham số trong URL
Anh em tạo cho mình một component như sau : 
```javascript
import React from "react";

export const SpecificPost = ({ history, match }) => {
    return (
        <div>
            <p className="m-3">This is post number {match.params.id} 😍</p>
            <button
                className="btn btn-dark mx-3 my-2"
                onClick={() => {
                    history.push("/posts");
                }}
            >
                Back To Posts
            </button>
        </div>
    );
};

```
Sau đó import lại vào trong App.js :
```javascript
import {SpecificPost} from "./SpecificPost";
```
Giờ chúng ta bắt đầu truyền tham số nhé : 
    
```javascript
<Route path="/posts/:id" component={SpecificPost} />
```
  `:id` ở đây chỉ ra rằng nó có thể thay đổi động và có thể nhận các giá trị.
    
Bây giờ, giả sử muốn truy cập giá trị đó bên trong một component. Chúng ta có thể làm như vậy bằng cách sử dụng **match**, được sử dụng để truy cập giá trị trong đường dẫn động. 
    
![](https://images.viblo.asia/7a9bf582-eae6-46fa-a3e3-bfb945c221ef.gif)

Okk, đó là toàn bộ những gì sơ bộ về React Router mà mình muốn giới thiệu với các anh em đang tìm hiểu về nó, lưu ý rằng đây là cách sử dụng sơ bộ thôi nhé , nếu muốn custom thêm mọi người có thể lên trang chủ mà mình đã để link bên trên để sử dụng thêm.
    
 Đây là toàn bộ phần code mà mình đã demo hôm nay :
    
```javascript
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import {SpecificPost} from "./SpecificPost";

function App() {
     return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                </ul>
                <hr/>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/about">
                        <About/>
                    </Route>
                    <Route exact path="/about/detail">
                        <AboutDetail/>
                    </Route>
                    <Route path="/dashboard">
                        <Dashboard/>
                    </Route>
                    <Route path="/posts/:id" component={SpecificPost}/>
                </Switch>
            </div>
        </Router>
    );
}

function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}

function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
}

function AboutDetail() {
    return (
        <div>
            <h2>About Detail</h2>
        </div>
    );
}

function Dashboard() {
    return (
        <div>
            <h2>Dashboard</h2>
        </div>
    );
}

export default App;

```
    
Cảm ơn mọi người rất nhiều. Nếu thấy bài viết của mình hay, hãy **upvote**, **like** và **share** nhé.
    
Many thankssss.