Chúng ta đều yêu ReactJS. Đây là một trong những thứ tốt nhất và phổ biến để tạo SPA (Single Page Application). Nó cung cấp sự linh hoạt và thuận tiện. Nó có tính năng tuyệt vời để sử dụng nó để tạo ra một component đơn trong trang web hiện tại hoặc sử dụng nó để tạo toàn bộ trang web từ đầu.

Hiện tại ReactJS là framework được sử dụng bởi nhiều frameworks hoặc các bộ Toolkits khác như NextJs, GatsByJs, Razzle, AfterJs, .v.v. Vì vậy, trở thành một nhà phát triển ReactJS tốt hơn sẽ giúp bạn sử dụng tốt hơn các frameworks này.

Hãy nâng cao level code React của bạn bằng cách sử dụng những kỹ thuật dưới đây.


-----



## Sử dụng Fragment thay vì div
Nhiều khi chúng ta muốn giữ nhiều components và khi render chỉ cho phép một component trả về, chúng ta sử dụng thẻ div để chứa tất cả các components. Việc làm này sẽ thêm một phần tử HTML phụ trong document của chúng ta.

Theo hướng dẫn [chính thức](https://reactjs.org/docs/accessibility.html):
> Sometimes we break HTML semantics when we add `<div>` elements to our JSX to make our React code work, especially when working with lists (`<ol>`, `<ul>` and `<dl>`) and the HTML `<table>`. In these cases we should rather use React Fragments to group together multiple elements.

Có nghĩa là: đôi khi chúng ta phá vỡ ngữ nghĩa HTML khi chúng ta thêm các phần tử `<div>` vào JSX để làm cho code React hoạt động, đặc biệt khi làm việc với các list (`<ol>`, `<ul>` và `<dl>`) và HTML `<table>`. Trong những trường hợp này, chúng ta nên sử dụng React Fragments để nhóm nhiều phần tử lại với nhau.

```
import React, { Fragment } from 'react';

function ListItem({ item }) {
  return (
    <Fragment>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment>
  );
}

function Maths(props) {
  return (
    <dl>
      {props.items.map(item => (
        <ListItem item={item} key={item.id} />
      ))}
    </dl>
  );
}
```

Chi tiết hơn, các bạn hãy tham khảo [Fragments docs](https://reactjs.org/docs/fragments.html).

## Sử dụng context nhiều hơn

Như các chuyên gia chính thức nói về nó thì *`context`* cung cấp một cách để truyền dữ liệu thông qua component tree mà không cần phải chuyển `props` xuống theo cách thủ công ở mọi cấp độ.

Vì vậy, nếu bạn có nhiều components cần một giá trị thì hãy sử dụng context. Ngược lại, nếu bạn chỉ có một component con duy nhất cần giá trị này thì hãy sử dụng [compositions](https://reactjs.org/docs/context.html#before-you-use-context).

Một ví dụ được đưa ra trong hướng dẫn:

**theme-context.js**
```
export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

export const ThemeContext = React.createContext(
  themes.dark //default value here
);
```

**themed-button.js**

```
import {ThemeContext} from './theme-context';

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;
    return (
      <button
        {...props}
        style={{backgroundColor: theme.background}}
      />
    );
  }
}
ThemedButton.contextType = ThemeContext;

export default ThemedButton;
```

**app.js**

```
import {ThemeContext, themes} from './theme-context';
import ThemedButton from './themed-button';

// An intermediate component that uses the ThemedButton
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }

  render() {
    // The ThemedButton button inside the ThemeProvider
    // uses the theme from state while the one outside uses
    // the default dark theme
    return (
      <Page>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <Section>
          <ThemedButton />
        </Section>
      </Page>
    );
  }
}

ReactDOM.render(<App />, document.root);
```

## Có ít nhất một Error Boundaries

React 16 đi kèm với một tính năng tuyệt vời đó là `Error Boundaries`. Như cái tên cho chúng ta thấy, nó bao bọc lỗi của tất cả các component con. Ý tưởng rất đơn giản. Tạo một component React và sử dụng nó như là component cha ở bất cứ đâu bạn muốn xử lý các lỗi. Nếu có bất kỳ lỗi nào trong component con của bạn thì `Error Boundaries` component của bạn sẽ được gọi để xử lý lỗi.

> Hãy nhớ rằng lỗi render được xử lý bằng cách sử dụng các error boundaries. Các lỗi bắt buộc như trong Event handler sẽ được xử lý bằng cách sử dụng các khối try/catch javascript.

Sử dụng `componentDidCatch ()` để ghi thông tin lỗi.

```
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
static getDerivedStateFromError(error) {
   //  Update state để render tiếp theo sẽ hiển thị fallback UI.
    return { hasError: true };
  }
componentDidCatch(error, info) {
    // Bạn cũng có thể log lỗi vào một service báo cáo lỗi
    logErrorToMyService(error, info);
  }
render() {
    if (this.state.hasError) {
      // Bạn có thể render bất kỳ custom fallback UI nào
      return <h1>Something went wrong.</h1>;
    }
return this.props.children; 
  }
}
```

Sau đó, bạn có thể sử dụng nó như một component thông thường:

```
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

Nếu `ErrorBoundary` component có lỗi trong chính nó thì nó không thể tự xử lý.

## Sử dụng production build trong môi trường thật
Trang web chính thức đã liệt kê nhiều cấu hình có thể tăng performance của bạn. Đừng quên check chúng trước khi triển khai vào môi trường thật.

Check các hướng dẫn ở đây: [https://reactjs.org/docs/optimizing-performance.html](https://reactjs.org/docs/optimizing-performance.html)

Nó sẽ chỉ mất 10 phút để cấu hình và sẽ mang đến performance tuyệt vời cho ứng dụng của bạn.

## Sử dụng Refs để tương tác với các con
Chúng ta có thể sử dụng Refs để trigger các animation, text selection hoặc quản lý focus.

Ví dụ, để set focus trong React, chúng ta có thể dùng [Refs to DOM elements](https://reactjs.org/docs/refs-and-the-dom.html).
Để sử dụng cái này, trước tiên chúng ta tạo một tham chiếu cho một element trong JSX của một component class:

```
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // Tạo một ref tham chiếu để lưu giữ textInput DOM element
    this.textInput = React.createRef();
  }
  render() {
  // Sử dụng `ref` callback để lưu giữ một tham chiếu tới text input DOM
  // element trong một instance field (ví dụ: this.textInput).
    return (
      <input
        type="text"
        ref={this.textInput}
      />
    );
  }
}
```

Sau đó, chúng ta có thể focus nó vào nơi khác trong component của mình khi cần:

```
focus() {
  // Lưu ý: chúng ta đang truy cập "current" để lấy DOM node
  this.textInput.current.focus();
}
```

Chi tiết hơn các bạn hãy tham khảo [programmatically-managing-focus](https://reactjs.org/docs/accessibility.html#programmatically-managing-focus).

## Sử dụng tách code (code-spliting)

Nếu bạn đang sử dụng CRA (create react app) hoặc NextJs thì sẽ có file cấu hình webpack. Nó sẽ tạo ra một file (bundle) sẽ chứa toàn bộ ứng dụng của bạn. Bây giờ nếu bạn sử dụng thư viện của bên thứ ba hoặc ứng dụng của bạn trở nên lớn hơn thì bundle file của bạn cũng sẽ lớn hơn. Khi người dùng truy cập vào trang web thì trình duyệt sẽ tải xuống toàn bộ bundle file và sau đó hiển thị trang web. Điều này có thể làm chậm trang web của bạn rất nhiều vì vậy tách code cho phép generated để chia nhỏ và tạo ra nhiều kết quả outputs. Vì vậy, trình duyệt sẽ tải bundle thích hợp khi cần. Lần lượt cải thiện thời gian tải trang web.

Chúng ta có thể sử dụng `React.lazy` để đạt được điều này:

> Official Note: React.lazy and Suspense is not yet available for server-side rendering. If you want to do code-splitting in a server rendered app, we still recommend React Loadable. It has a nice guide for bundle splitting with server-side rendering.

=> Lưu ý là React.lazy và Suspense vẫn chưa có sẵn cho server-side rendering. Vì thế nếu bạn muốn tách code ở 1 server render thì bạn nên sử dụng React Loadable.

Bạn có thể tách code theo nhiều cách khác nhau nhưng điểm bắt đầu tốt nhất là dựa vào routes.

Hầu hết mọi người trên web được sử dụng để chuyển tiếp trang đều mất một lượng thời gian để load. Bạn cũng có xu hướng hiển thị lại toàn bộ trang cùng một lúc để người dùng của bạn không tương tác với các elements khác trên trang cùng một lúc.

Dưới đây là ví dụ về cách thiết lập tách code dựa trên routes trong ứng dụng của bạn bằng các thư viện như React Router với React.lazy:

```
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./routes/Home'));

const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```

**Suspense** không có gì đặc biệt ngoài việc là một cơ chế fallback. Nếu bundle được yêu cầu chưa được load thì nó sẽ được hiển thị. Bạn có thể thêm một spinner của bạn ở đây để hiển thị dấu hiệu load cho người dùng của bạn.

> You can even use ErrorBoundary as parent to Suspense to handle other error such as network error!

=> Bạn thậm chí có thể dùng ErrorBoundary như là cha để Suspense handle các lỗi khác như lỗi network chẳng hạn.

React.lazy hiện chỉ hỗ trợ default exports. Vì vậy, nếu bạn muốn sử dụng nó với named exports , hãy tham khảo [named-exports](https://reactjs.org/docs/code-splitting.html#named-exports).

## Static Type Checking

Javascript không phải là ngôn ngữ được định kiểu (typed language) và nhiều vấn đề phát sinh do các kiểu chưa đúng.

Chúng ta có thể sử dụng nhiều loại checkers khác nhau có sẵn. Nhưng có một tool nổi tiếng và bắt đầu dễ dàng là [Flow](https://flow.org/). Nó được phát triển tại Facebook và thường được sử dụng với React. Nó cho phép bạn chú thích các biến, hàm, và các React components với một cú pháp kiểu đặc biệt, và bắt các lỗi sớm. Bạn có thể đọc phần [giới thiệu về Flow](https://flow.org/en/docs/getting-started/) để tìm hiểu các khái niệm cơ bản của nó. Hướng dẫn step by step được đưa ra trong [guide official này](https://reactjs.org/docs/static-type-checking.html#flow).



-----
Cảm ơn các bạn đã đọc.
Nếu có bất kỳ comments hay suggestion nào thì các bạn hãy để lại dưới mục comments nhé. :)

Ref: [Advanced React developer](https://medium.com/wineofbits/concepts-to-become-an-advanced-react-developer-684d90c086c2)