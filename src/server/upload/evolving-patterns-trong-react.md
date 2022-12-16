# Giới thiệu 
Sau khi tìm hiểu  cơ bản về các khái niệm  React và hệ sinh thái của nó cùng với quá trình làm việc vs Reactjs. Mình có tìm hiểu 1 số patterns đang nổi lên trong hệ  sinh thái React. Các patterns này cãi thiện khả năng đọc, độ rõ của code và push code của bạn về phía component và khả năng tái sự  dụng lại.

# 1. Conditional render
Khi mọi người nghĩ về **React** và **JSX** , họ vẫn nghĩ về **Html** và **Javascript**.
vì vậy  bước đầu tiên là tách logic điều khiện khỏi code trả về thực tế.

```js
const condition = true;

const App = () => {
  const innerContent = condition ? (
    <div>
      <h2>Conditional Render</h2>
      <p>Content</p>
    </div>
  ) : null;
  
  return (
    <div>
      <h1>Sun*</h1>
      { innerContent }
    </div>
  );
};
```
Điều này có xu hướng vượt ra khỏi tầm kiểm soát,  với nhiều trường hợp ở đầu mỗi  chức năng render . Bạn phải liên tục phải nhảy vào bên trong  hàm để hiểu khi nào 1 phần tử nào đó được render hay không.
Để thay thế, hãy thử pattern sau, nơi bạn được hưởng lợi từ mô hình thực thi ngôn ngữ
```js
const condition = true;

const App = () => (
  <div>
    <h1>Conditional Render</h1>
    {
      condition && (
        <div>
          <h2>title</h2>
          <p>Content</p>
        </div>
      )
    }
  </div>
);

```
Nếu điều kiện false , thì toán hạng thứ 2 của toán  tử &&  không được thực hiện. Nếu điều kiện đó là true, toán hạnh thứ 2 hoặc jsx mà chúng ta muốn render được trả về. Điều này cho phép chúng ta trộn logic Ui với các component UI thực tế theo cách khai báo. Hãy đối xử vs jsx như đó là 1 phần không thể thiếu trong code của bạn. Và nó cũng chỉ là javascript.

# 2. Passing Down Props
Khi ứng dụng của bạn phát triển . bạn có các component nhỏ hơn hoạt động như các thùng chứa cho các components khác.
Khi điều này xảy ra , bạn cần truyền lại một đoạn props tốt thông qua 1 component. Component này không cần chúng , nhưng  con của nó thì có .
Một cách tốt để bỏ qua điều này là sử dụng các props destructuring khác với jsx pread  :
```js

const Details = ( { name, language } ) => (
  <div>
    <p>{ name } works with { language }</p>
  </div>
);

const Layout = ( { title, ...props } ) => (
  <div>
    <h1>{ title }</h1>
    <Details { ...props } />
  </div>
);

const App = () => (
  <Layout 
    title="I'm here to stay"
    language="JavaScript"
    name="Thu"
  />
);
```
Vì vậy, bây giờ bạn có thể thay đổi các props cần thiết Details và chắc chắn  rằng các props đó không được tham chiếu trong nhiều  Components.
# 3.Destructuring Props
Ứng dụng thay đổi theo thời gian và các components của bạn cũng vậy. Một components đã viết từ 2 năm trước có thể là trạng thái nhưng bây giờ nó có thể chuyển  thành 1 thành phần stateless. 
Vì vậy chúng ta đã nói về việc  props destructuring, đây là một mẹo hay mà tôi sử dụng để giúp cuộc sống của tôi dễ dàng hơn về lâu dài . Bạn có thể sử dụng destructure  props của mình theo cách tương tự cho cả 2 loại components, như bạn có thể thấy dưới đây.
```js
const Details = ( { name, language } ) => (
  <div>
    <p>{ name } works with { language }</p>
  </div>
);

class Details extends React.Component {
  render() {
    const { name, language } = this.props;
    return (
      <div>
        <p>{ name } works with { language }</p>
      </div>
    )
  }
}
```
Lưu ý rằng các dòng 2-4 và 11-13  là giống hệt nhau. Chuyển đổi các thành phần dễ dàng hơn nhiều bằng cách sử dụng mô hình này. Ngoài ra ,  chúng ta nên hạn chế sử dụng this bên trong components.
# 4. Provider Pattern
Chúng ta cùng xem xét 1 ví dụ nơi các props cần được gửi xuống thông qua 1 components khác. Những nếu bạn phải gửi nó xuống 15 components khác .
**React Context.**
Đây không nhất thiết là tính năng dược khuyên dùng nhất của React , nhưng nó hoàn thành công việc khi cần.
Xem cách nó hoạt động với API ngày nay cũng sẽ giúp bạn hiểu được API mới.
```js
import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

class MousePositionProvider extends React.Component {
  constructor( ) {
    super();
    this.state = { };
    this.onMouseMove = this.onMouseMove.bind( this );
  }

  getChildContext() {
    return { 
      posX: this.state.posX,
      posY: this.state.posY
    };
  }

  componentDidMount( ) {
    window.addEventListener( "mousemove", this.onMouseMove );
  }

  onMouseMove( e ) {
    this.setState({ posX: e.clientX, posY: e.clientY });
  }

  render( ) {
    return this.props.children
  }
}

MousePositionProvider.childContextTypes = {
  posX: PropTypes.number,
  posY: PropTypes.number
};



class MousePositionConsumer extends React.Component {
  render( ) {
    return (
      <div>Your position is ( {this.context.posX},{this.context.posY} )</div>
    )
  }
}

MousePositionConsumer.contextTypes = {
  posX: PropTypes.number,
  posY: PropTypes.number
};



const App = () => (
  <MousePositionProvider>
    <div>
      <MousePositionConsumer />
      <MousePositionConsumer />
    </div>
  </MousePositionProvider>
);

render(<App />, document.getElementById('root'));

```
Component cao cấp nhất - được gọi là Provider - đặt một số giá trị trên context. Các components con  - được goi là - sẽ lấy các giá trị đó từ  context.

# 5. High Order Components
Hãy nói về tái sử dụng, Cùng với việc bỏ React.createElement()  factory cũ, nhóm React cũng  bỏ hỗ trợ cho minxins . Tại một số điểm, chúng là cách chuẩn của các component thông qua components đối tượng đơn giản.

Các component bậc cao (HOC) - đã ra đời để đáp ứng như cầu sử dụng lại hành vi trên nhiều components.
HOC là một hàm lấy components đầu vào và trả về một phiên bản nâng cao/ sửa đổi của components đó. bạn sẽ tìm thấy HOC dưới những cái tên khác nhau, nhưng tôi thích nghĩ về chúng như  decorators.

Nếu bạn đang sử dụng Redux, bạn sẽ nhận ra rằng chức năng connect là HOC - lấy component của bạn và thêm 1 loạt props vào nó.
Hãy thực hiện 1 HOC cơ bản để có thêm props cho các components hiện có.

```js

const withProps = ( newProps ) => ( WrappedComponent ) => {
  const ModifiedComponent = ( ownProps ) => ( 
    <WrappedComponent { ...ownProps } { ...newProps } />
  );

  return ModifiedComponent;
};

const Details = ( { name, title, language } ) => (
  <div>
    <h1>{ title }</h1>
    <p>{ name } works with { language }</p>
  </div>
);

const newProps = { name: "Alex" }; 
const ModifiedDetails = withProps( newProps )( Details ); 

const App = () => (
  <ModifiedDetails 
    title="I'm here to stay"
    language="JavaScript"
  />
);
```
Nếu bạn thích lập trình chức năng, bạn sẽ thích làm việc với các thành phần bậc cao. **Recompose** là một package tuyệt vời mà cung cấp cho bạn tất cả những tiện ích tuyệt với như `witProps`, `withContext`, `lifecycle`,....
Chúng ta cùng xem một ví dụ rất hữu ích về r**eusing functionality.**
```js
function withAuthentication(WrappedComponent) {
  const ModifiedComponent = (props) => {
    if (!props.isAuthenticated) {
      return <Redirect to="/login" />;
    }

    return (<WrappedComponent { ...props } />);
  };

  const mapStateToProps = (state) => ({
    isAuthenticated: state.session.isAuthenticated
  });

  return connect(mapStateToProps)(ModifiedComponent);
}
```
Bạn có thể sử dụng `withAuthentication`  khi bạn muốn hiển thị nội dung nhạy cảm trong 1 route. Nội dung đó sẽ chỉ có sẵn cho người dùng đã đăng nhập.


Tuy nhiên nó có một nhược điểm là mỗi HOC sẽ giới thiệu một React Component  bổ sung trong cấu trúc DOM/vDOM của bạn. Điều này có thể đãn đến các vấn đề hiệu suất tiềm năng khi ứng dụng của bạn trở nên lớn hơn
# 6. Render Props
Mặc dù đúng là các render props và HOCs có thể hoán đổi cho nhau và cả 2  được sử dụng để cải thiện  khả năng sử dụng lại và độ rõ của code.

Ý tưởng là bạn yield quyền điều khiển  chức năng render của mình cho một components khác, sau đó chuyển bạn trở lại điều khiển thông qua chức năng prop.

Một số người thích sử dụng một **dynamic prop** cho việc này, một số chỉ sử dụng **this.props.children.**
Để hiểu rõ  nó , chúng ta hay cùng xem một ví dụ đơn giản sau 
```js
class ScrollPosition extends React.Component {
  constructor( ) {
    super( );
    this.state = { position: 0 };
    this.updatePosition = this.updatePosition.bind(this);
  }
  
  componentDidMount( ) {
    window.addEventListener( "scroll", this.updatePosition );
  }

  updatePosition( ) {
    this.setState( { position: window.pageYOffset } )
  }

  render( ) {
    return this.props.children( this.state.position )
  }
}

const App = () => (
  <div>
    <ScrollPosition>
      { ( position ) => (
        <div>
          <h1>Hello World</h1>
          <p>You are at { position }</p>
        </div>
      ) }
    </ScrollPosition>
  </div>
);
```
Ở đây chúng ta đang sử dụng `children` như render prop. Bên trong `<ScrollPosition>` components, chúng  ta sẽ gửi một hàm nhận *position* như là 1 tham số.

Render props có thể được sử dụng trong các tình huống bạn cần một số logic có thể sử dụng lại bên trong component và bạn không muốn wrap components của mình trong HOC.
[React-Motion](https://github.com/chenglou/react-motion) là một trong những thư viện cung cấp một số ví dụ tuyệt vời về việc sử dụng render props.

Cuối cùng, chúng ta hãy xem làm thế nào chúng ta có thể tích hợp async dòng với render props . Đây là một ví dụ hay về việc tạo ra một fetch component có thể tái sử dụng.
```js
import React from 'react';
import { render } from 'react-dom';

class Fetch extends React.Component {
  constructor() {
    super();
    this.state = {
      content: ""
    }
  }
  componentDidMount() {
    this.setState({ content: this.props.loading() })
    fetch(this.props.url)
      .then(res => res.json())
      .then(
        res => this.setState({ content: this.props.done(res) }),
        res => this.setState({ content: this.props.error() })
      )
  }

  render() {
    return this.state.content;
  }
}

const App = () => (
  <Fetch
    url="https://www.booknomads.com/api/v0/isbn/9789029538237"
    loading={() => (
      <div>Loading ... </div>
    )}
    done={(book) => (
      <div>You asked for: { book.Authors[0].Name } - {book.Title}</div>
    )}
    error={() => (
      <div>Error fetching content</div>
    )}
  />
);

render(<App />, document.getElementById('root'));

```
Bạn có thể có nhiều render props cho cùng 1 components. Với mẫu này bạn có khả năng sáng tác và tái sử dụng chức năng vô tận.

# Lời kết
Bạn có đang sử dụng patten nào trong các patten trên, hãy cùng nhau chia sẻ.
 Cảm ơn các bạn đã theo dõi bài viết :stuck_out_tongue_winking_eye:

# Tài liệu tham khảo
Nguồn : https://medium.freecodecamp.org/evolving-patterns-in-react-116140e5fe8f