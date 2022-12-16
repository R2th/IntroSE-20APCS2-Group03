# Higher-Order Components
**Higher-order component** (HOC) là một kỹ thuật nâng cao trong React được sử dụng trong việc sử dụng lại các component. HOCs không là một phần trong React API. Một cách cụ thể, **một higher-order component là một hàm và nó nhận đối số là một component và trả về một component mới.**
Higher-order component là một pattern tuyệt với và nó được chứng minh trong nhiều thư viện React ví dụ như Redux (thư viện được sử dụng để quản lý state) hay React-DnD (là một thư viện về drag and drop, nó khá khó hiểu cho người mới bắt đầu)...
```
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```
Trong bài viết này, chúng ta sẽ thảo luận tại sao higher-order components thì thực sự hữu ích và cách để sử dụng nó.
## Sử dụng HOCs cho Cross-Cutting Concerns
**Cross-cutting concerns**, hiểu nôm na là những xử lý phụ được xảy ra trước khi xử lý chính được thực hiện. Thực ra ta có thể sử dụng mixins để có thể áp dụng cross-cutting concerns, nhưng mixins sẽ tạo ra nhiều vấn đề hơn là những gì nó làm được.

Components là đơn vị cơ bản nhất trong React mà ta có thể sử dụng lại. Tuy nhiên, ta sẽ tìm một số các phần mà không phù hợp với việc ta đang muốn sử dụng và ta sẽ phải implement component đó theo mong muốn của ta.

Ví dụ, ta có component `CommentList` nhận thông tin từ một data source để render ra một danh sách các comments:
```
class CommentList extends React.Component {
  constructor() {
    super();
    this.state = {
      // "DataSource" is some global data source
      comments: DataSource.getComments()
    };
  }

  componentDidMount() {
    // Subscribe to changes
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // Clean up listener
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange = () => {
    // Update component state whenever the data source changes
    this.setState({
      comments: DataSource.getComments()
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}
```
Sau đó, ta lại viết một component sử dụng cho việc nhận dữ liệu là các bài viết để hiện thị danh sách, với một pattern tương tự:
```
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange = () => {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    });
  }

  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}
```
Sau khi đọc xong 2 component trên, ta có thể thấy rằng 2 component trên đang thực hiện một quy trình tương tự:
- Ở componentDidMount, truyền hàm khi thực hiện thay đổi handleChange cho DataSource.
- Trong hàm handleChange thực hiện việc setState khi dữ liệu thay đổi.
- Ở componentWillUnmount, thực hiện bỏ hàm handleChange.

Ta có thể tưởng tượng với một ứng dụng lớn, việc lặp lại này được thực hiện liên tục. Do vậy ta sẽ muốn một cách trừu tượng hóa để cho phép ta có thể định nghĩa logic ở một nơi và chia sẻ chúng cho nhiều compoment khác. Và chính điều này làm cho higher-order components nổi trội hơn cả.

Chúng ta có thể viết một hàm mà tạo ra các component như là `CommentList` và `BlogPost` nhận thông tin từ `DataSource`. Nó sẽ nhận đối số là một component con:
```
const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
});
```
Hàm này nhận 2 đối số, một là component được gói vào, hai là hàm lấy dữ liệu mà ta muốn.

Khi `CommentListWithSubscription` và `BlogPostWithSubscription` được render thì `CommentList` và `BlogPost` sẽ nhận dữ liệu từ prop:
```
function withSubscription(WrappedComponent, selectData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange = () => {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```
Note that an HOC doesn't modify the input component, nor does it use inheritance to copy its behavior. Rather, an HOC composes the original component by wrapping it in a container component. An HOC is a pure function with zero side-effects.

And that's it! The wrapped component receives all the props of the container, along with a new prop, data, which it uses to render its output. The HOC isn't concerned with how or why the data is used, and the wrapped component isn't concerned with where the data came from.

Cần nhớ một điều là HOC không chỉnh sửa, làm khác đi component đầu vào mà nó chỉ kế thừa các hành vi của component đó.

Component được gói vào nhận tất các props của container, với props nó có thể sử dụng để render ra nội dung mà mình mong muốn. HOC không liên quan đến việc dữ liệu được sử dụng như thế nào, từ đâu, và component được gói vào cũng không liên quan đến dữ liệu được truyền từ đâu.

## Đừng thay đổi component gốc, hãy soạn lại component
Ví dụ ta có 1 HOC chỉ in ra props và trả về chính component đầu vào:
```
function logProps(InputComponent) {
  InputComponent.prototype.componentWillReceiveProps(nextProps) {
    console.log('Current props: ', this.props);
    console.log('Next props: ', nextProps);
  }
  return InputComponent;
}

const EnhancedComponent = logProps(InputComponent);
```
Có một số vấn đề ở đây. Thứ nhất InputComponent không thể sử dụng lại một cách riêng biệt với EnhancedComponent. Quan trọng hơn nữa, nếu ta muốn sử dụng một HOC khác có EnhancedComponent thì cũng sẽ thay đổi hàm componentWillReceiveProps của HOC đầu tiên, vì vậy ta cần phải biết ta đang implement cái gì để tránh conflict với những HOC khác.

Thay vì thay đổi, ta nên sử dụng composition bằng việc gói component đầu vào bên trong một container:
```
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log('Current props: ', this.props);
      console.log('Next props: ', nextProps);
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
}
```
HOC này có chức năng tương tự như HOC ở bên trên (đã bị thay đổi) trong khi tránh được việc thay đổi, nguy cơ tiềm ẩn.
This HOC has the same functionality as the mutating version while avoiding the potential for clashes. It works equally well with class and functional components. And because it's a pure function, it's composable with other HOCs, or even with itself.

You may have noticed similarities between HOCs and a pattern called container components. Container components are part of a strategy of separating responsibility between high-level and low-level concerns. Containers manage things like subscriptions and state, and pass props to components that handle things like rendering UI. HOCs use containers as part of their implementation. You can think of HOCs as parameterized container component definitions.