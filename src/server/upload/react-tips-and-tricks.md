![React](https://images.viblo.asia/f26e7287-e35d-4697-985f-808a4a96bf13.png)
Trong thời gian gần đây, React đã và đang phát triển rất nhanh, việc sử dụng nó trong các project không còn xa lạ với hầu hết các web developer nữa. Làm việc với nó không khó, tuy nhiên, để làm việc hiệu quả với nó thì chúng ta sẽ phải mất khá nhiều thời gian để rèn luyện và đúc kết.

Dưới đây là một số `tips & tricks` mà mình tổng kết được trong suốt quá trình làm việc cùng react :) Và bài viết mang tính chất cá nhân, nếu có vấn đề hay nhận định gì các bạn có thể comment ở dưới nhé!

### 1. Sử dụng `Arrow Function` thay vì dùng `bind`
Hãy xem qua các ví dụ dưới đây:

**Ví dụ 1**: sử dụng `bind`
```js
class A extends PureComponent {
    constructor() {
        super();
        this.state = {
            count: 0
        }
        this.onButtonClick = this.onButtonClick.bind(this);
    }
    
    onButtonClick() {
        const { count } = this.state;
        this.setState({ count: count+1 });
    }
    
    render() {
        return (
            <button onClick={this.onButtonClick}>Click me!</button>
        );
    }
}
```

**Ví dụ 2**: sử dụng `inline arrow function`
```js
class A extends PureComponent {
    onButtonClick() {
        const { count } = this.state;
        this.setState({ count: count+1 });
    }
    
    render() {
        return (
            <button onClick={() => this.onButtonClick()}>Click me!</button>
        );
    }
}
```
Nhìn vào ví dụ 1: nếu chúng ta muốn truyền tham số vào `onButtonClick` thì chúng ta phải sử dụng `bind` ở `render`, vậy thì `bind` ở `constructor` chả có ý nghĩa gì.
Ở ví dụ 2: chúng ta có thể truyền tham số vào, tuy nhiên ở mỗi lần `render` (lại), hàm `arrow` đó lại được tạo lại, gây lãng phí tài nguyên.
<br/><br/>
Để khắc phục 2 vấn đề của 2 ví dụ trên, chúng ta có thể sử dụng `arrow function`
**Ví dụ 3**: sử dụng `arrow function`
```js
class A extends PureComponent {
    onButtonClick = () => {
        const { count } = this.state;
        this.setState({ count: count+1 });
    }
    
    render() {
        return (
            <button onClick={this.onButtonClick}>Click me!</button>
        );
    }
}
```
Đoạn code trên sẽ giúp chúng ta không phải tạo lại hàm như ở ví dụ 2. Còn để truyền tham số vào hàm, chúng ta có thêm 1 chút chính sửa như sau:
```js
class A extends PureComponent {
    onButtonClick = (param1, param2) => () => {
        const { count } = this.state;
        this.setState({ count: count+1 });
    }
    
    render() {
        return (
            <button onClick={this.onButtonClick(1, 2)}>Click me!</button>
        );
    }
}
```
Bạn có thể thấy, chúng ta có đến 2 cái `arrow`, nó được gọi là [curried function](https://en.wikipedia.org/wiki/Currying). Nó giúp chúng ta khắc phục được nhược điểm của 2 ví dụ trên.
### 2. Sử dụng `kế thừa` nếu không muốn code bị lặp lại quá nhiều.
Nhắc đến `kế thừa` thì thứ đầu tiên chúng ta nghĩ tới đó là `lập trình hướng đối tượng` :laughing:
Có thể các bạn không để ý nhưng khi tạo một `Class Component`, chúng ta đang `extends Component` của React
```js
import React, { PureComponent } from 'react';
class ABC extends PureComponent {
    // .....
}

export default ABC;
```

Trong React, khi chúng ta có nhiều `component` tương tự nhau, nhưng khác nhau chút ít ở việc `render`, chúng ta thường cố gắng viết chúng thành 1 component duy nhất và sử dụng [Conditional Rendering](https://reactjs.org/docs/conditional-rendering.html). Tuy nhiên, việc đó sẽ làm cho hàm `render()` của bạn rất khó nắm bắt, đặc biệt là khi chúng ta cố gộp quá nhiều component lại. Khi đó các bạn nên sử dụng kế thừa. Chú ý 1 chút, các phương thức của lớp cha sẽ là `public` đối với lớp kế thừa.

### 3. Sử dụng `React.createRef()` thay vì sử dụng `callback ref`
`ref` trong `react` là một thứ khá là `op`. Từ phiên bản [16.3](https://reactjs.org/docs/refs-and-the-dom.html), `React` cung cấp thêm một phương thức mới đó là `React.createRef()`. Nó cho phép chúng ta tạo trước `ref`, giúp chúng ta quản lý `ref` dễ dàng hơn và không phải tạo lại `ref` mỗi khi phải `render` lại component.
Ví dụ:
```js
// inline-ref
class CustomTextInput extends React.Component {
    constructor(props) {
        super(props);
    }

    focusTextInput = () => {
        this.textInput.current.focus();
    }

    render() {
        return (
            <div>
                <input type="text" ref={(ref) => this.textInput = ref} />
                <input type="button" value="Focus the text input"onClick={this.focusTextInput} />
            </div>
        );
    }
}

// New way
class CustomTextInput extends React.Component {
    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element
        this.textInput = React.createRef();
    }

    focusTextInput = () => {
        this.textInput.current.focus();
    }

    render() {
        // tell React that we want to associate the <input> ref
        // with the `textInput` that we created in the constructor
        return (
            <div>
                <input type="text" ref={this.textInput} />
                <input type="button" value="Focus the text input"onClick={this.focusTextInput} />
            </div>
        );
    }
}
```

### 4. Sử dụng `propTypes`, `defaultProps` và `displayName`
Đối với một project lớn và có nhiều thành viên tham gia, việc người này chỉnh sửa code của người kia là không thể tránh khỏi. Do đó, việc chỉnh sửa dẫn đến lỗi thường xuyên xảy ra, và nhọ hơn nữa là có thể lỗi đó không bị phát hiện trước khi `release`. Để tránh những lỗi cơ bản như vậy, chúng ta nên sử dụng `propTypes`, `defaultProps` và `displayName`.
- `propTypes`:  Khai báo xem định dạng của các `props` được truyền vào component là gì
- `defaultProps`: Giá trị mặc định của `prop`, khi một `prop` không phải là `required`, chúng ta nên đặt giá trị mặc định cho nó
- [displayName](https://reactjs.org/docs/react-component.html#displayname): không bắt buộc phải có nhưng "nên có", nó sẽ giúp chúng ta xác định lỗi xảy ra ở đâu sớm hơn dựa vào **tên** của component

```js
class QuillEditor extends React.Component {
    constructor(props) {
        super(props);
        this.editorRef = React.createRef();
    }

    render() {
        const { showToolbar, ...rest} = this.props;
        return (
            <ReactQuill
                {...rest}
                ref={this.editorRef}
                theme={QuillEditor.theme}
                formats={QuillEditor.formats}
                modules={QuillEditor.modules}
                className={`quill-editor ${showToolbar ? '' : 'hide-toolbar'}`}
            />
        );
    }
}

QuillEditor.displayName = "QuillEditor";

QuillEditor.defaultProps = {
    placeholder: 'Enter news content here...',
    showToolbar: true,
};

QuillEditor.propTypes = {
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    showToolbar: PropTypes.bool
};

export default QuillEditor;
```

Phía trên là 1 ví dụ sử dụng `propTypes`, `defaultProps` và `displayName`.
Đối với `displayName`, không có nhiều tài liệu về nó, đây là 2 trong số khá nhiều tác dụng của `displayName`:  [Invalid Return](https://github.com/facebook/react/blob/90294ead4c627715cb70f20ff448bb0d34ee4c1b/src/renderers/shared/stack/reconciler/ReactCompositeComponent.js#L50-L52) và [Inline style error](https://github.com/facebook/react/blob/ab72f626deb86040e042df518801524f9da5b7f4/src/renderers/native/NativeMethodsMixin.js#L182)

### 5. Sử dụng đồng thời Container và presentational components
Hiểu một cách đơn giản, bạn nên tách riêng phần xử lý, thao tác với dữ liệu với phần render của một component
- Container component: chứa các logic, thao tác với dữ liệu
- Presentationaln component: nhận dữ liệu, callback từ props và chỉ thực hiện việc hiển thị

Việc tách riêng 2 phần này sẽ giúp các bạn dễ dàng hơn trong việc maintain cũng như cập nhật, sửa đổi một component. Đồng thời giúp chúng ta có thể `reuse` một component dễ dàng hơn.

### 6. Sử dụng HOC - Higher Order Component
Một trong những ứng dụng dễ thấy nhất của `HOC` là trong route. Ví dụ, bạn cần check xem người dùng đã đăng nhập hay chưa trước khi chuyển họ tới trang đích, chúng ta sử dụng 1 hoc như ở dưới:
```js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthenticatedRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => (rest.loggedIn ? // eslint-disable-line
            <Component {...props} />
            : <Redirect to={{pathname: '/login', state: { from: props.location }}} />)}
    />
);

export default AuthenticatedRoute;

// Other component
<Switch>
    <GuestRoute
        exact
        path='/login'
        component={Login}
        loggedIn={user.loggedIn}
    />
    <AuthenticatedRoute
        exact
        path='/'
        component={Dashboard}
        loggedIn={user.loggedIn}
    />
 </Switch>
```

Tương tự, chúng ta có thể tạo `GuestRoute` để kiểm tra và redirect người dùng về trang home nếu họ đã login mà vào trang login :smirk: