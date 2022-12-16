## 1. Mở đầu
<hr>

Trong hai bài viết trước về `Hooks` trong React chúng ta đã cùng lần lượt tìm hiểu về chức năng cũng như cách sử dụng cơ bản của các `Hooks` như: `useState`, `useReducer`, `useEffect`, `useMemo` và `useCallback`. Nếu bạn chưa đọc hai bài trước đó thì có thể xem lại trong link dưới đây:
- `useState`, `useReducer`, `useEffect`: https://viblo.asia/p/tim-hieu-ve-hooks-trong-react-Ljy5VzGG5ra
- `useMemo`, `useCallback`: https://viblo.asia/p/tim-hieu-ve-hooks-trong-react-p2-GrLZDkyEKk0

Ở bài viết ngày hôm này mình sẽ giới thiệu nốt cho các bạn về `Custom Hooks` cũng như một số `Hooks` mà các thư viện quen thuộc của `React` đã hỗ trợ.

## 2. React Hook
<hr>

### f. Custom Hook

Ngoài việc sử dụng các `Hooks` mà React cung cấp sẵn cho chúng ta như một số mà mình đã giới thiệu trước đó thì React còn cho phép chúng ta tự tạo các `Custom Hook` hay bạn có thể hiểu nôm na là các `Hooks` riêng do bạn tự tạo. Bên trong các `Hooks` tự tạo này bạn hoàn toàn có thể sử dụng luôn các `Hook` mà React đã cung cấp như `useState`, `useReducer`, `useEffect`, `useMemo`, `useCallback`, ... . Mục đích của việc tạo `Custom Hook` này theo như documents của React nói thì nó sẽ giúp chúng ta:

> Building your own Hooks lets you extract component logic into reusable functions.

<br>

Hay chính xác là việc hỗ trợ chúng ta trong việc tách phần logic ra thành các `Hooks` để có thể tái sử dụng dễ dàng hơn hoặc đơn giản hơn là làm gọn component của chúng ta. Để tạo một `Custom Hook` chúng ta sẽ cần tạo một function mới và function này bắt buộc phải bắt đầu bằng từ khóa **use** giống như tên các `Hook` khác của React. Vì nó là một function nên tất nhiên cũng có thể nhận về các tham số mà ta truyền vào và trả về kết quả theo ta muốn. Chúng ta cùng đi đến một ví dụ như sau, nếu các bạn vào Medium và chọn đọc một bài bất kì sẽ thấy được rằng mỗi khi bạn scroll chuột xuống thì phần header của trang web sẽ bị ẩn đi. Ngược lại nếu bạn chỉ scroll chuột lên một cái thì lập tức phần header này sẽ lại được hiển thị ra ngay. Bây giờ chúng ta sẽ cùng thử dựng một cái header có chức năng tương tự như vậy. Code sẽ có dạng như sau:

```javascript:Header.js
const Header = () => {

  const [style, setStyle] = useState({});
  useEffect(() => {
    const handleChangeHeaderStyle = () => {
      if (document.body.getBoundingClientRect().top > scrollPos) {
        // Nếu scroll chuột lên
        setStyle({});
      } else {
        // Nếu scroll chuột xuống
        setStyle({ transform: "translateY(-100%)" });
      }
      scrollPos = document.body.getBoundingClientRect().top;
    };
    let scrollPos = 0;
    window.addEventListener("scroll", handleChangeHeaderStyle);
    
    return () => {
      window.removeEventListener("scroll", handleChangeHeaderStyle);
    };
  }, []);

  return (
    <div className="App">
      <div className="App__header" style={style}>
        HEADER
      </div>
      <div className="App__seperator" />
      <div className="App__body">
        <h1>TITLE</h1>
        <p>
            SOME LONG CONTENT
        </p>
      </div>
    </div>
  );
};
```

ở đây mình áp dụng luôn các `Hook` đã trình bày ở các bài trước đó là `useState` và `useEffect`. Về cơ bản đoạn code trên các bạn có thể hiểu ý tưởng ở đây là:
- Khi ta scroll chuột xuống thì sẽ dùng style để ẩn phần header đi bằng cách cho nó `translateY(-100%)` còn ngược lại sẽ cho nó hiển thị như ban đầu
- Phần `style` này ta sẽ chưa trong một local state bằng cách dùng `useState`
- Tiếp đó ta sử dụng `useEffect` để dùng để lăng nghe sự kiện scroll chuột trong trang và thay đổi `style` sao cho phù hợp với sự kiện

Kết quả bạn có thể xem ở đây: https://codesandbox.io/s/usescrollhook-tceov

Với đoạn code trên mọi thứ đều ngon lành vì chúng ta đạt được mục tiêu mong muốn. Tuy nhiên, trong trường hợp web của bạn có thêm bản responsive cho riêng mobile và tất nhiên cũng cần tình năng nói trên thì chúng ta xử lý ra sao ? Tất nhiên ta cũng có thể đơn giản là copy cái đoạn code kia và paste lại qua file component của phần header cho mobile sử dụng và thường thì chả có vấn đề gì ở đây cả :D. Tuy nhiên vì đây là ví dụ nên giả sau sau này đoạn code trên được thay đổi và có thêm nhiều sự chỉnh sửa về style hơn là chỉ `translateY(-100%)` thì lúc này khi sửa bạn sẽ phải nhớ sửa cả hai file. Hoặc ngay từ đầu ta có thể tạo ra một `Hooks` dùng chung cho cả bản mobile và bản desktop thì sẽ hay hơn. Để làm được điều này rất đơn giản, ta sẽ tạo một file mới như sau:

```javascript:useScrollHook.js
import { useState, useEffect } from "react";

export default function useScollHook() {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const handleChangeHeaderStyle = () => {
      if (document.body.getBoundingClientRect().top > scrollPos) {
        setStyle({});
      } else {
        setStyle({ transform: "translateY(-100%)" });
      }
      scrollPos = document.body.getBoundingClientRect().top;
    };

    let scrollPos = 0;
    window.addEventListener("scroll", handleChangeHeaderStyle);

    return () => {
      window.removeEventListener("scroll", handleChangeHeaderStyle);
    };
  }, []);

  return style;
}
```

Như mình đã nói ban đầu các `Custom Hook` mà bạn tạo ra bắt buộc phải có tên bắt đầu bằng từ khóa **use**. Như bạn có  thể thấy đây đơn giản chỉ là một function `useScrollHook`, nó không nhận vào tham số gì cả và kết quả trả về ở đây là một object có tên là `style`. Ở đây mình đã copy toàn bộ phần logic liên quan đến việc thay đổi style header bao gồm phần `useState` và `useEffect` ở component ban đầu và cho vào trong function mới này. Lúc này trong component `Header` ta chỉ cần viết lại như sau:

```js:Header.js
import useScrollHook from './useScrollHook';

const Header = () => {

  const style = useScrollHook();

  return (
    <div className="App">
      <div className="App__header" style={style}>
        HEADER
      </div>
      <div className="App__seperator" />
      <div className="App__body">
        <h1>TITLE</h1>
        <p>
            SOME LONG CONTENT
        </p>
      </div>
    </div>
  );
};
```
Như bạn có thể thấy code của bạn đã gọn hơn rất nhiều so với ban đầu và đồng thời ở component cho header của mobile bạn cũng chỉ cần import lại `Hook` vừa tạo ra và sử dụng như trên. Trên thực tế trong dự án mình cũng hay sử dụng `Custom Hook` khá nhiều vì mình muốn thử sử dụng công nghệ mới của React xem nó ra làm sao :stuck_out_tongue::stuck_out_tongue::stuck_out_tongue:. Với cá nhân thì mình thấy việc sử dụng `Custom Hook` mang lại cho bản thân mình một số lợi ích như:
- Phân tách riêng được phần logic ra file riêng để làm gọn cho component chính. Component của bạn lúc này cũng chỉ chứa đa phần code liên quan đến UI.
- Trong trường hợp chỉ cần sửa style thì cho component đó thì bạn cũng sẽ không mất công scroll chuột quá nhiều vì logic không còn nằm ở chỗ này nữa mà chỉ có riêng phần UI.
- Trường hợp bạn cần sửa một phần logic riêng biệt ví dụ như chức năng scroll chuột nói trên thì bạn chỉ cần mở `Hook` phục vụ riêng cho phần logic đó ra thay vì phải lăn chuột đi tìm cái hàm phụ trách việc này

Tất nhiên như mình nói ở trên `Custom Hook` của bạn có thể nhận vào tham số bất kì và sử dụng nó:
```js
const useDemoHook = (param1, param2) => {
    // Do anything you want
    
    return result;
}

const DemoComponent = () => {
    const result = useDemoHook('Hello', 'Hi');
};
```

Hoặc cũng có thể trả ra nhiều thứ hơn là chỉ một biến kết quả ta cũng có thể trả ra nhiều kết quả và thậm chỉ trả về cả một function như sau:
```js
const useLoginHook = () => {
    const [formData, setFormData] = useState({email: '', password: ''});
    
    function handleInputChange(event) {
        // Handle change email or password input
    }
    
    function handleLogin() {
        // Handle login
    }

    return [
        formData,
        handleInputChange,
        handleLogin
    ];
}

const DemoComponent = () => {
    const [formData, handleInputChange, handleLogin] = useLoginHook();

    return (
        <div className="form">
            <input name="email" value={formData.email} onChange={handleInputChange} />
            <input name="password" value={formData.password} onChange={handleInputChange} />
            <button onClick={handleLogin}>LOGIN</button>
        <div>
    )
};
```

Như bạn thấy với ví dụ trên thì thay vì ta phải viết rất nhiều logic liên quan đến việc login vào trong component đó như:
- Thay đổi nội dung input
- Validate nội dung nhập có hợp lệ không
- Gửi dữ liệu lên server để login

Thì giờ đây với việc tách ra thành `Custom Hooks` thì component của chúng ta lúc này chỉ nhận vào những gì nó cần và component trở nên gọn gàng hơn rất nhiều.

## 3. Hook trong các thư viện phổ biến khác
<hr>

### a. React Redux

Với tính `Hook` mà React cung cấp thì `react-redux` cũng đã hỗ trợ chúng ta sử dụng `Hooks` với ba `Hook` lần lượt là:
- `useSelector()`: Cho phép bạn lấy dữ liệu từ store của redux - đóng vai trò giống như `mapStateToProps`  trong hàm `connect()` mà chúng ta hay dùng trước kia. Chi tiết: https://react-redux.js.org/api/hooks#useselector
- `useDispatch()`: Cho phép chúng ta dispatch 1 action đến redux - đóng vai trò giống như `mapDispatchToProps` trong hàm `connect()` mà chúng ta dùng trước kia. Chi tiết: https://react-redux.js.org/api/hooks#usedispatch
- `useStore()`: Cho phép chúng ta truy cập trực tiếp đến object store trong redux và gọi đến các hàm như `store.getState()`, ... . Chi tiết: https://react-redux.js.org/api/hooks#usestore

Ví dụ sử dụng `useSelector()` và `connect()`:
```js
// connect()
const mapStateToProps = state => ({
    posts: state.posts,
});
export default connect(mapStateToProps)(SomeComponent);


// useSelector
const SomeComponent = () => {
    posts = useSelector(state => state.posts);
}
```
Như bạn đã thấy kết quả ở đây ta thu được tương tự nhau và kết quả cũng tương đương nếu bạn sử dụng `useDispatch()`.

### b. React Router

Nếu như trước kia để truy cập được những thông tin liên quan đến router thì việc chúng ta cần làm đó là bọc component của chúng  ta vào component `withRouter`. Tuy nhiên ở phiên bản mới nhất thì `React Router` đã cho phép chúng ta truy cập vào các thông tin liên quan đến router thông qua một số `Hook` như sau:
- `useHistory`: cho phép chúng ta truy cập vào object `history` để có thể thực hiện các thao tác liên quan đến thay đổi url, ví dụ từ documents:
```js
import { useHistory } from "react-router-dom";

function HomeButton() {
  let history = useHistory();

  function handleClick() {
    history.push("/home");
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}
```
- `useLocation`: nếu đơn giản bạn chỉ cần đến nội dung trong url hiện tại trong object `location` thì đây chính là hook bạn cần thay vì lấy toàn bộ từ `withRouter`. ví dụ từ documents:
```js
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  useLocation
} from "react-router-dom";

function usePageViews() {
  let location = useLocation();
  React.useEffect(() => {
    ga.send(["pageview", location.pathname]);
  }, [location]);
}

function App() {
  usePageViews();
  return <Switch>...</Switch>;
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  node
);
```
- `useParams`: trường hợp router của bạn nhận vào các tham số và bạn muốn sử dụng lại nó trong component thì hay sử dụng hooks này. Ví dụ:
```js
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

function BlogPost() {
  let { slug } = useParams();
  return <div>Now showing post {slug}</div>;
}

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/blog/:slug">
        <BlogPost />
      </Route>
    </Switch>
  </Router>,
  node
);
```

## 4. Kết bài
<hr>

Chuỗi bài viết liên quan đến `Hook` trong React của mình đến đây là kết thúc. Nếu các bạn có điều gì thắc mắc hoặc tìm thấy mình sai ở điểm nào hãy bình luận ngay phía dưới để mình biết. Cảm ơn các bạn đã đọc bài và đừng quên để lại 1 upvote :D