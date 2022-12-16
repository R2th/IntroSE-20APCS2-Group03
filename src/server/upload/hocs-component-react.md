# HOCs (higher-order components) 
HOCs (higher-order components) là một function, nó sẽ nhận vào 1 component và trả về một component mới. Khi mà nhiều component có cùng chung một logic và ít có sự khác nhau thì ta có thể dùng một cách nào đó để share login cũng như truyền những logic khác nhau vào parameter của một hàm để tạo ra một component mới.

HOCs không phải là library nó là một pattern của React

```
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

Component sẽ chuyển props sang UI, trong khi đó HOC chuyển một component thành một component khác

HOCs sử dụng phổ biến ở third-party React lib như connect trong redux, createFragmentContainer trong Relay. 

# Sử dụng HOCs

Xét ví dụ sau:
ComponentList class
```

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      comments: DataSource.getComments()
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
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

Và một class BlogPost

```
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
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

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    });
  }

  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}

```
ComponentList và BlockPost là 2 component không giống nhau, chúng gọi các method khác nhau và render output cũng khác nhau thế nhưng việc thực thi của 2 component này là tương tự nhau, về cơ bản logic như sau:
* add change listener on Mount
* Update state khi data source thay đổi
* ở Unmount thì xoá listener 

Ta có thể viết một function để tạo ra component CommentList và BlogPost. Funtion này sẽ suscrible DataSource. Bạn cần truyền một child component vào tham số của hàm này 

```
const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);
```

Tham số đầu là wrapped component, tham số sau là dữ liệu cần truyền vào cho component và props

Khi CommentListWithSubscription và BlogPostWithSubscription được render thì CommentList và BlogPost sẽ được được truyền props (dữ liệu được lấy từ DataSource)

```
function withSubscription(WrappedComponent, selectData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
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

    handleChange() {
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

Có thể thấy được sau khi viết thêm hàm withSubscription đã DRY code đi rất nhiều, việc code dài dòng và lặp code không còn nữa. Không chỉ có CommentList hay BlogPost có thể dùng hàm này mà bất cứ hàm nào trong ứng dụng có cùng chung một kiểu logic ta có thể biến đổi một chút để tái sử dụng code

Chú ý: HOC không chỉnh sửa hay làm thay đổi component truyền vào, HOC là một pure function không có size-effects

# Không sử dụng HOCs bên trong render method

Thông thường bạn không nên sử dụng HOCs bên trong một render method của một component bởi vì nó không những ảnh hưởng tới perfomance mà khi sử HOC bên trong render method sẽ dẫn tới component remount state của component và tất cả state của các component con sẽ bị mất

```
render() {
  //các version mới của EnhancedComponent sẽ được tạo ra mỗi lần component render
  // dẫn tới toàn bộ các subtree sẽ được unmount/remount
  const EnhancedComponent = enhance(MyComponent);
  return <EnhancedComponent />;
}
```
apply HOCs bên ngoài component definition, bạn có thể apply nó ở component life cycle method hoặc ở constructor của component. 

# Static method phải được copied lại
Khi bạn apply một HOC component, thì component gốc sẽ được wrapped trong một container component, điều đó có nghĩa là component mới sẽ không có bất cứ một static method nào của component gốc.

```
// Định nghĩa một static method
WrappedComponent.staticMethod = function() {/*...*/}
// Apply HOC
const EnhancedComponent = enhance(WrappedComponent);

//  enhanced component không có static method nào cả
typeof EnhancedComponent.staticMethod === 'undefined' // true
```
Để giải quyết vấn đề này ta có thể copy static method vào trong container trước khi sử dụng apply HOC

```
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  // phải biết chính xác static method là gì
  Enhance.staticMethod = WrappedComponent.staticMethod;
  return Enhance;
}
```

Thế nhưng phương pháp trên có mặt hạn chế đó là phải biết chính xác staticMethod đó là gì thì mới đưa vào được.
Thật may là có một thư viện đã hỗ trợ cho việc copy hết tất cả các static method vào trong HOC
```
import hoistNonReactStatic from 'hoist-non-react-statics';
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
}
```

# ref không được truyền vào trong HOC
Đối với HOC bạn có thể truyền props vào trong wrapped component thế nhưng đối với `ref` thì không bởi vì `ref` nó không thực sự là một props.


# Nguồn tham khảo 
demo: https://github.com/khanhhd/react-testing

https://reactjs.org/docs/higher-order-components.html

https://medium.com/dailyjs/react-composing-higher-order-components-hocs-3a5288e78f55