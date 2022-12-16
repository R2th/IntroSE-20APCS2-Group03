Trong bài chia sẻ lần trước mình đã chia sẻ những gì cơ bản nhất về ReactJS, các bạn có thể tham khảo [link1](https://viblo.asia/p/tap-toe-nhung-buoc-chan-dau-tien-reactjs-gAm5yqpV5db) và [link2](https://viblo.asia/p/lifecycle-component-trong-reactjs-gGJ59jzxKX2). Hôm nay mình muốn giới thiệu thêm cho các bạn về một chút Advance Component trong React. Chúng mình cùng đi tìm hiểu nhé.
# Ref a DOM Element
Đôi lần mình muốn tương tác với các phần tử trong DOM React. Thì từ khóa mà mình search được ngay ra để tưởng tác với các node trong DOM là **ref**
`ref` cho phép chúng ta truy cập vào các phần tử trong DOM, các bạn cứ hiểu nôm na như kiểu đặt id, class xong các bạn dùng JQuery để tưởng tác với các phần tử HTML ý, như hide, append, remove, vân vân và mây mây...

Mình sẽ lấy một ví dụ để xem **ref** nó hoạt động ra sao nhé. Chúng ta sẽ sử dụng `Search Component` làm ví dụ nhé. Khi ứng dụng render lần đầu tiên, mong muốn là cái ô input Search đó sẽ được focuss vào. Đây là một trường hợp mà chúng ta cần truy cập đến DOM API. Thuộc tính `ref` có thể được sử dụng cả ha trường hợp: `functional stateless components` và `ES6 class component`.
```Javascript
class Search extends React.Component {
  render() {
    const {
      value,
      onChange,
      onSubmit,
      children
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
        />
        <button type="submit">
          {children}
        </button>
      </form>
    );
  }
}
```
Từ khóa `this` sẽ giúp chúng ta trỏ đến được DOM với thuộc tính `ref`
```Javascript
class Search extends React.Component {
  render() {
    const {
      value,
      onChange,
      onSubmit,
      children
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          ref={el => this.input = el}
        />
        <button type="submit">
          {children}
        </button>
      </form>
    );
  }
}
```

Và bây giờ bạn có thể focus vào trường Input bằng cách viết các dòng lệnh code trong `componentDidMount()` lifecycle
```Javascript
class Search extends React.Component {
  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const {
      value,
      onChange,
      onSubmit,
      children
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          ref={el => this.input = el}
        />
        <button type="submit">
          {children}
        </button>
      </form>
    );
  }
}
```
Chúng ta truy cập `ref` ở trong functional stateless component mà không cần từ khóa `this`
```Javascript
const Search = ({
  value,
  onChange,
  onSubmit,
  children
}) => {
  let input;
  
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        ref={el => this.input = el}
      />
      <button type="submit">
        {children}
      </button>
    </form>
  );
}
```
Bây giờ chúng ta có thể truy cập được vào phần tử input DOM. Ở trong trường hợp này nó sẽ không giúp cho chúng ta nhiều,  bởi vì chẳng có lifecycle method nào ở trong functional stateless component được trigger cho chúng ta viết các dòng code để focus vào trường input. Vì vậy chúng 
# Loading...
Quay lại ứng dụng của chúng, khi chúng ta enter request search lên thì mình mong muốn là sẽ show Loading ra, vì thế chúng ta sẽ đi làm Loading Component để mỗi lần request lên, trong lúc thời chờ response trả về thì chúng ta sẽ hiển thị Loading component đó ra.
```Javascript
const Loading = () =>
  <div>Loading ...</div>
```
Bây giờ chúng ta cần một property để lưu giữ `loading` state. Và chúng ta dựa vào `loading` state đó, chúng ta có thể show `Loading` component ra.
```Javascript
class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,
    };

    ...
  }

  ...

}
```
Init giá trị `isLoading` default là `false`. Chúng ta không load bất cứ thứ gì trước khi App component được mount. Khi request được gửi lên server để get dữ liệu về thì `isLoading` được set bằng true . Khi response trở về thành công, thì chúng ta lại set `isLoading` bằng false.
```Javascript
class App extends Component {

  ...

  setSearchTopStories(result) {
    ...

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      },
# leanpub-start-insert
      isLoading: false
# leanpub-end-insert
    });
  }

  fetchSearchTopStories(searchTerm, page = 0) {
  // set State isLoading
    this.setState({ isLoading: true });
  // end set State isLoading

    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({ error }));
  }

  ...

}
```
Và ở phần render chúng ta sẽ sử dụng `Loading` component trong App component. 
```Javascript
class App extends Component {

  ...

  render() {
    const {
      searchTerm,
      results,
      searchKey,
      error,
# leanpub-start-insert
      isLoading
# leanpub-end-insert
    } = this.state;

    ...

    return (
      <div className="page">
        ...
        <div className="interactions">
# leanpub-start-insert
          { isLoading
            ? <Loading />
            : <Button
                onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
              >
              More
            </Button>
          }
# leanpub-end-insert
        </div>
      </div>
    );
  }
}
``` 
Các bạn có thể sử dụng thư viện [Font Awesome](https://fontawesome.com/) để Loading component của bạn có thể đẹp hơn nhé :)
# Higher-Order Components
Cái này nghe có vẻ khá trừu tượng và cao siêu đúng không các bạn :))) Tuy nhiên mình thấy đây là một phần khá hay. Higher-order components(HOC) là advanced concept trong React. HOCs tương đương với higher-order functions. Các bạn cứ hiểu là nó nhận đầu vào là một component như là argument và trả về "phiên bản mở rộng" của component đó.

HOCs được sử dụng nhiều các use case khác nhau. Chúng có thể chuẩn bị properties, quản lý state, hay thay thế đại diện bằng một component. Một trường hợp được sử dụng HOC đó là giúp cho rendering. Bạn hãy tưởng tượng rằng bạn có List component render ra một list các item hoặc không có gì. bởi vì list có thể trống hoặc null. HOC có thể tránh được một list render ra chẳng có gì . 

Bắt đầu với một HOC đơn giản như sau lấy một component làm đầu vào và trả về kết quả là một component.
```Javascript
function withFoo(Component) {
  return function(props) {
    return <Component { ...props } />;
  }
}
```

Bởi vì chúng ta sử dụng Javascript ES6, chúng ta có thể viết như sau
```Javascript
const withEnhancement = (Component) => (props) =>
  <Component { ...props } />
```

Ở ví dụ của chúng ta, đầu vào component ở đây giống với output kết quả trả về, vì thế nó cũng không có gì đặc sắc cho lắm. Vì thế chúng ta sẽ kết hợp với Loading component phía trên mình đã viết như sau nhé
```Javascript
const withLoading = (Component) => (props) =>
  props.isLoading
    ? <Loading />
    : <Component { ...props } />
```
Dựa vào thuộc tính `isLoading` mà hàm sẽ trả kết quả rendering.  Tổng quan mà nói, nó có thể hiệu quả  với `spread object` giống như props object  như là một input cho component. Bạn hãy xem sự khác nhau giữa 2 đoạn code sau nhé
```Javascript
// trước khi bạn phải destructure props trước khi pass chúng vào component
const { firstname, lastname } = props;
<UserProfile firstname={firstname} lastname={lastname} />

// nhưng trường hợp này bạn có thể sử dụng object spread operator để pass hết các thuộc tính của object
<UserProfile { ...props } />
```
Chúng ta sẽ pass tất cả các prop bao gồm cả `isLoading` bởi spearding object vào trong input component. Input component sẽ không quan tâm lắm về `isLoading` lắm nên chúng ta sẽ destructuring ra sao cho `isLoading` phục vụ cho việc render conditional, còn phần thuộc tính còn lại pass hết cho input component
```Javascript
const withLoading = (Component) => ({ isLoading, ...rest }) =>
  isLoading
    ? <Loading />
    : <Component { ...rest } />
```
Nếu các bạn chưa rõ các bạn có thể đọc thêm [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
Nào bây giờ chúng ta có thể sử dụng JSX trong HOC. Có thể là chúng ta muộn show "More" button hoặc Loading component. Loading component được đóng gói trong HOC, nhưng thiếu một input component. Để hiển thị Button component hoặc Loading component, Button là input component của HOC. `enhanced output component` là ButtonWithLoading component
```Javascript
const Button = ({
  onClick,
  className = '',
  children,
}) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>

const Loading = () =>
  <div>Loading ...</div>

const withLoading = (Component) => ({ isLoading, ...rest }) =>
  isLoading
    ? <Loading />
    : <Component { ...rest } />

// enhanced output component
const ButtonWithLoading = withLoading(Button);
```
Và cuối cùng, chúng ta sẽ sử dụng ButtonWithLoading component, component này nhận isLoading là thuộc tính. 
```Javascript
class App extends Component {

  ...

  render() {
    ...
    return (
      <div className="page">
        ...
        <div className="interactions">
// add ButtonWithLoading
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
            More
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}
```

Qua đó chúng ta thấy Higher-order components là advanced parttern trong React. Chúng có một vài các mục đích sau:
* cải thiện khả năng tái sử dụng của các component
* là một abstraction
* khả năng kết hợp của components
* thao tác của props, state, view

Mình thì mình khuyến khích các bạn đọc và tìm hiểu thêm về HOC trong [doc](https://www.robinwieruch.de/react-higher-order-components/), nó sẽ show cho bạn những cách để sử dụng `functional programming` một cách dễ hiểu nhât và giải quyết các vấn đề conditional rendering với HOC.
# Tổng kết
Qua một vài những chia sẻ của mình ở trên thì mong rằng phần nào các bạn cũng hiểu thêm về những thứ advance trong React một chút. Cảm ơn các bạn đã đọc bài viết của mình.
# Tham khảo
https://reactjs.org/docs/refs-and-the-dom.html
https://reactjs.org/docs/higher-order-components.html