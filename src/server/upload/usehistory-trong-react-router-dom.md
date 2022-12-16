`react-router-dom` là thư viện giúp cho việc điều hướng url tới các component (nôm na là như vậy) trong react js

Link
- https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom
- https://reactrouter.com/web/guides/quick-start

Trong thư viện này `useHisrtory` được sử dụng để thay đổi url, ví dụ như khi bạn đang ở mà hình login chẳng hạn, `\users\login`, sau khi đã authen xong thì cần redirect tới màn dashboard, ta dùng 

```
const history = useHistory();

history.push('\dashboard`);
```

Vậy 2 dòng code trên đã được `react-router-dom` xử lý ra sao?

Để dùng `react-router-dom` ta thường dùng wrapper như sau (có thể có những cách custom khác nhau nhưng về cơ bản tương tự)

```
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const SomeFunctionComponent = () => {
  ...
  <Router> 
    ...
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
    ...
  <Router>
  ...
}
```

Các componenrt được wrap bởi provider là Router (thực ra nó là BrowserRouter), hãy thử thay đổi 1 chút trên phần import, chuyển `BrowserRouter as Router` thành `Router`

```
import { Router, Switch, Route, Link } from "react-router-dom";
```

Ta sẽ thấy ngay errors là:

```
TypeError
props.history is undefined
...
Router
https://bnpsd.csb.app/node_modules/react-router/esm/react-router.js:166:7
...
```

Muốn sử dụng `Router` của `react-router-dom` ta phải truyền vào nó history (trường này dc required), đây chính là prop để dùng cho `useHistory` mà chúng ta đang nói đến.

Vậy `BrowserRouter` khác `Router` ở điểm gì?, thực chất là nó chỉ wrap `Router` và pass history vào `Router` mà thôi.

```
...
import { createBrowserHistory as createHistory } from "history";
...

class BrowserRouter extends React.Component {
  history = createHistory(this.props);

  render() {
    return <Router history={this.history} children={this.props.children} />;
  }
}

...
```

Đây là đoạn code của `BrowserRouter`, vậy muốn dùng `Router` giống như `BrowserRouter` ta chỉ cần viết như sau

```
import { createBrowserHistory } from "history";

  ...
  <Router history={createBrowserHistory()}>
  ...
  </Router>
  ...
```

history ở đây được tạo ra bởi `createBrowserHistory` của `history` lib,  còn đây là về history lib:

*The history library lets you easily manage session history anywhere JavaScript runs. A history object abstracts away the differences in various environments and provides a minimal API that lets you manage the history stack, navigate, and persist state between sessions.*

Mình để nguyên tiếng Anh cho nó sát nghĩa :)

Link: https://github.com/ReactTraining/history

Link hàm `createBrowserHistory` của `history`: https://github.com/ReactTraining/history/blob/master/packages/history/index.ts#L397

trong method này, hàm `push` thực chất là gọi `pushState` của window.histoy, các bạn có thể inspect console trong browser rồi gõ history là ra

```
History
​
length: 1
​
scrollRestoration: "auto"
​
state: null
​
<prototype>: HistoryPrototype { go: go(), back: back(), forward: forward(), … }
```

còn hàm `push` thì như sau:

```
function push(to: To, state?: State) {
    let nextAction = Action.Push;
    let nextLocation = getNextLocation(to, state);
    function retry() {
      push(to, state);
    }

    if (allowTx(nextAction, nextLocation, retry)) {
      let [historyState, url] = getHistoryStateAndUrl(nextLocation, index + 1);

      // TODO: Support forced reloading
      // try...catch because iOS limits us to 100 pushState calls :/
      try {
        globalHistory.pushState(historyState, '', url);
      } catch (error) {
        // They are going to lose state here, but there is no real
        // way to warn them about it since the page will refresh...
        window.location.assign(url);
      }

      applyTx(nextAction);
    }
  }
```

còn `globalHistory` thì chính là `window.history;`

Hàm `pushState` của `window.history` làm thay đổi url nhưng không tạo ra 1 HTTP request, nó khác với việc khi bạn dùng `window.location.href = ...`

Cuối cùng là làm sao khi gọi 

```
const history = useHistory();
```

thì lấy được history của wrap `Router` bên ngoài, thực ra cái này các lib khi muốn truyền những tham số vào child component đều sử dụng phương pháp là dùng `context`, thực chất  `useHistory()` tạo ra 1 component có contextType là `Router` để lấy context từ Router Provider

```
const useContext = React.useContext;

export function useHistory() {
  if (__DEV__) {
    invariant(
      typeof useContext === "function",
      "You must use React >= 16.8 in order to use useHistory()"
    );
  }

  return useContext(HistoryContext);
}
```

Tóm lại `useHistory()` được cấu trúc như sau để sử dụng: 
- Provider `<Router>` với history được tạo sẵn với hàm push sử dụng pushState của window.history 
- `useHistory()` tạo ra 1 component với contextType là Router để lấy history của wraper component (Router) và trả về để thực thi các method  createHref, push, replace,  ...

Cảm ơn và hi vọng bài viết có ích trong công việc của bạn.