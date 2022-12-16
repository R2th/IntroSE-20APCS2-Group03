Biết hướng của luồng dữ liệu qua các thành phần của bạn là rất quan trọng khi làm việc với React vì nó cho phép bạn phát hiện các vấn đề và khắc phục mọi thứ dễ dàng hơn.
Tuy nhiên, theo thời gian, ứng dụng của bạn có thể phát triển và quản lý các chế độ views multiplex có thể trở nên khá khó khăn. Tại thời điểm này, việc truyền dữ liệu chung trong các component trees lớn có thể gây căng thẳng. Đó là nơi mà API React sắp ra mắt. Bối cảnh cho phép bạn truyền dữ liệu qua component tree mà không phải truyền props xuống ở mọi level. Cần lưu ý rằng tài liệu React nhấn mạnh đến việc không cần phải triển khai context trừ khi bạn là ngưởi phát triển React có kinh nghiệm và quen thuộc với các thư viện như Redux và MobX. Trong bài đăng này, tôi sẽ giải thích context nào cũng như những nguy hiểm khi thực hiện sai và làm thế nào để sử dụng nó một cách an toàn.

### Vậy Context là gì?

Context là API React cho phép tương tác với các components gốc sâu. Hãy nói rằng một component gốc xác định một danh sách hoặc chứa một số thông tin mà một số component khác trong component tree quan tâm. Với ngữ cảnh, thông tin có thể được truyền trực tiếp qua component tree, do đó không cần phải chuyển các props xuống theo cách thủ công ở mọi level. Ví dụ chính thức trong tài liệu React Js giải thích rõ nhất cách hoạt động của bối cảnh:

```
class Button extends React.Component {
    render() {
      return (
        <button style={{background: this.props.color}}>
          {this.props.children}
        </button>
      );
    }
  }

  class Message extends React.Component {
    render() {
      return (
        <div>
          {this.props.text} <Button color={this.props.color}>Delete</Button>
        </div>
      );
    }
  }

  class MessageList extends React.Component {
    render() {
      const color = "purple";
      const children = this.props.messages.map((message) =>
        <Message text={message.text} color={color} />
      );
      return <div>{children}</div>;
    }
  }
```

Trong ví dụ trên, style **Button** và **Message** yêu cầu chúng ta xử lý thủ công thông qua thuộc tính **color**.  Với context, cách tiếp cận vấn đề khá khác biệt vì **color** có thể được truyền qua tree một cách tự nhiên:

```
import PropTypes from 'prop-types';
  class Button extends React.Component {
    render() {
      return ({
        this.props.children
      });
    }
  }
  Button.contextTypes = {
    color: PropTypes.string
  };
  class Message extends React.Component {
    render() {
      return ({
          this.props.text
        }
        Delete);
    }
  }
  class MessageList extends React.Component {
    getChildContext() {
      return {
        color: "purple"
      };
    }
    render() {
      const children = this.props.messages.map((message) => );
      return {
        children
      };
    }
  }
  MessageList.childContextTypes = {
    color: PropTypes.string
  };
```

Trong phần thứ hai của ví dụ của chúng tôi, một vài methods đã được giới thiệu thông qua context API. Hãy cùng xem các methods sau:

* **childContextTypes**: Một thuộc tính tĩnh cho phép bạn khai báo cấu trúc của context object được truyền cho các hậu duệ thành phần của bạn. Theo nhiều cách, nó tương tự như **PropTypes** nhưng không giống như **PropTypes**, nó không phải là optional.

* **getChildContext**: Một method nguyên mẫu trả về context object để truyền xuống cấu trúc phân cấp của component. Đối với mỗi khi state thay đổi hoặc component nhận props mới, method này sẽ được gọi.

Bằng cách thêm **childContextTypes** và **getChildContext** vào **MessageList** , đảm bảo rằng React tự động chuyển thông tin xuống và bất kỳ component nào trong subtree là **Button** trong trường hợp của chúng ta đều có thể truy cập nó bằng cách xác định **contextTypes**. Nếu **contextTypes** không được xác định, thì **context** sẽ là một object trống.


### Nguy hiểm của việc sử dụng Context không đúng cách

Context có thể được tham chiếu trong các method  được gọi khi một component đang được re-rendered:

```
 componentWillReceiveProps(nextProps, nextContext) { ... 
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) { ... 
  } 
  componentWillUpdate(nextProps, nextState, nextContext) { ...
  } 
  componentDidUpdate(previousProps, previousContext) { ... 
  }
```

Bây giờ ở đây, nơi sử dụng context trở thành một trách nhiệm pháp lý. **ShouldComponentUpdate** bỏ qua việc render một phần của component tree. Nếu **props** hoặc **state** của một component không được thay đổi theo cách có ý nghĩa, nó sẽ trả về **false** từ **ShouldComponentUpdate** và con của nó sử dụng **props** và / hoặc **state** không được cập nhật. Bản demo CodePen dưới đây nêu bật những gì tôi đã giải thích ở đây:

{@codepen: https://codepen.io/oBuiThiHuyen/pen/pXewXq}

Trong bản demo ở trên, **ShouldComponentUpdate** và context không đồng bộ và điều này có thể được nhìn thấy rõ ràng một khi **You Can Go!** button được bấm. Chỉ có **You Can Go!** được update màu dự định màu **green**, các **motor** items không được update. 

Lý do cho điều này là component **MotorSport** của chúng tôi thừa hưởng một số khả năng từ **PureComponent**, bao gồm triển khai **ShouldComponentUpdate**, một trong những khả năng này bao gồm **MotorSport** không re-rendering bất cứ khi nào nó không nhận được bất kỳ motor items mới nào. Điều này cuối cùng khiến thành phần **RulesTheme** bên trong **MotorSport** không nhận được context mới với color **aqua** được update. **ShouldComponentUpdate** trả về **false** do đó component **MotorSport** của chúng ta và tất cả con của nó không được update. Ý nghĩa của điều này là gì?

* **MotorSport** và tất cả các con của nó không được update ngụ ý rằng mọi nhà cung cấp và người tiêu dùng context trong app của chúng ta đều bị hỏng. Size của app càng lớn, việc debug này sẽ càng khó chịu hơn. 

* Hành vi này cho thấy context về cơ bản là một biến toàn cục trong phạm vi của React subtree duy nhất. Điều này làm cho component của chúng tôi được ghép nối nhiều hơn và rất nguy hiểm khi sử dụng lại bên ngoài subtree

### Cách sử dụng Context an toàn 

Nếu bạn xem xét tốt ví dụ trước, bạn sẽ nhận thấy vấn đề bắt đầu từ đâu khi context được cập nhật. Với suy nghĩ này, đây là hai hướng dẫn để thực hiện context một cách an toàn:

* Context không nên thay đổi (nó nên bất biến).
* Một component sẽ chỉ nhận được context một lần, khi nó đang được xây dựng.
* Không lưu trữ state trực tiếp trong context.

Nếu các hướng dẫn này được tuân theo, ShouldComponentUpdate sẽ không đi vào context cần phải được thông qua vì nhu cầu chuyển context đến các component gốc đã bị loại bỏ. Một lần nữa kiểm tra bản demo trước, lần này với các hướng dẫn được liệt kê ở trên theo sau:

{@codepen: https://codepen.io/oBuiThiHuyen/pen/mZWMxL}

Để rõ ràng, tôi sẽ liệt kê những gì đã xảy ra khi ứng dụng được xây dựng lại theo hướng dẫn:
* Mặc dù **MotorSport** vẫn mở rộng **PureComponent** tại đây, các **motor** items hiện có được thay đổi update color.

* Không cần thay đổi API của các components chính như **Race**, **MotorSport** và **RulesTheme**.

* **RaceTheme** chứa một object **Track**. Chức năng của **Track** là giữ state của ứng dụng kiểu dáng và cũng để phát ra các sự kiện cho phép **RulesTheme** đáp ứng với những thay đổi trong tương lai.

* **Track** được chuyển qua component tree bởi **RaceTheme**. Mặc dù context là sức mạnh mà sau thời gian ban đầu được thông qua, context không còn cần thiết vì các bản cập nhật khác được tạo bởi **Track** chứ không phải bằng cách tạo context mới như trong ví dụ trước.

### Kết Luận
Không thể nhấn mạnh rằng bối cảnh trong React là một tính năng thử nghiệm và nâng cao với API có thể thay đổi trong các bản phát hành React trong tương lai. Context triển khai đã được ví như sử dụng các biến toàn cục để chuyển trạng thái thông qua ứng dụng của bạn. Theo tôi, nếu bạn vẫn phải sử dụng context, hãy sử dụng nó một cách tiết kiệm, cố gắng tách biệt việc sử dụng context của bạn với một phần nhỏ trong ứng dụng của bạn và tránh sử dụng API context trực tiếp khi có thể để dễ dàng nâng cấp hơn trong tương lai khi API thay đổi.