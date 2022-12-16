Các components là trái tim của React, vì vậy việc hiểu cách sử dụng chúng là điều tối quan trọng để tạo ra các cấu trúc thiết kế tuyệt vời. 

## Component là gì?

Theo reactjs.org:
> “Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.”
> 
> Hiểu là:
> 
> Các components cho phép bạn chia giao diện người dùng thành các phần độc lập, có thể tái sử dụng và suy nghĩ về từng phần riêng biệt.

Lần đầu tiên bạn *`npm install react`* bạn nhận được: một component và các API của nó. Tương tự như các hàm JavaScript, một component chấp nhận các đầu vào được gọi là "props" và trả về các phần tử React, mô tả (declares) giao diện người dùng (UI) sẽ trông như thế nào. Đây là lý do tại sao React được gọi là một API khai báo, bởi vì bạn cho nó biết bạn muốn giao diện người dùng trông như thế nào và React sẽ xử lý phần còn lại.

Hãy suy nghĩ về khai báo như khi bạn đi taxi đến một địa điểm cần đến - bạn sẽ nói cho tài xế biết là đi đâu và tài xế sẽ thực sự lái xe để đưa bạn đến đó. Bắt buộc sẽ ngược lại - bạn đang tự lái xe để đến địa điểm đó
.

## Component API’s

Vậy bạn sẽ có những API nào khi bạn cài đặt react? Câu trả lời là 5 và chúng là:
![](https://images.viblo.asia/f978674c-1bdc-4d90-9c25-bfe2a98ef85e.png)

* render
* state
* props
* context
* lifecycle events

Mặc dù một component có đầy đủ khả năng sử dụng tất cả các API ở trên, tuy nhiên bạn sẽ thấy tự nhiên rằng một số component có xu hướng chỉ sử dụng một số API nhất định trong khi các component khác chỉ sử dụng những API khác. Phân chia giữa hai phân loại được gọi là các **stateless** và **stateful** components. Các stateful components thường sử dụng API của stateful: `render`, `state` và `lifecycle events`, trong khi các stateless components sử dụng `render`, `props` và `context`.

![](https://images.viblo.asia/caade41d-12ff-4508-9851-1f496921ad66.png)

Đây là nơi chúng ta giới thiệu các **component patterns**. Các component patterns là cách sử dụng tốt nhất và được giới thiệu lần đầu tiên để tách lớp data hoặc logic và giao diện người dùng hoặc lớp presentational (lớp trình bày). Bằng cách chia trách nhiệm giữa các components, bạn có thể tạo thêm các components có thể tái sử dụng, các components gắn kết có thể được sử dụng để xây dựng UI phức tạp. Điều này đặc biệt quan trọng khi xây dựng ứng dụng để mở rộng quy mô.

## Component patterns

Các component patterns chung là:
* Container
* Presentational
* Higher order components (HOC’s)
* Render callback
### Container
> “A container does data fetching and then renders its corresponding sub-component. That’s it.” - Jason Bonta đã nói.
> 
> Hiểu là: Một container tìm nạp data và sau đó renders cho các components con tương ứng.

Containers là lớp data hoặc logic của bạn và sử dụng API của stateful. Sử dụng các lifecycle events, bạn có thể kết nối với một kho lưu trữ quản lý state như Redux hoặc Flux, truyền data và callback qua props cho các components con. Trong method render của container là nơi bạn soạn giao diện người dùng bao gồm các components con hiện tại. Để có quyền truy cập vào tất cả các API của stateful, một container phải là class component trái ngược với một functional component.

Trong ví dụ dưới đây, chúng ta có một class component được gọi là `Greeting`, có state, một lifecycle event `componentDidMount()` và render.

```
class Greeting extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
  }

  componentDidMount() {
    // AJAX
    this.setState(() => {
      return {
        name: "Taku Kudo",
      };
    });
  }

  render() {
    return (
      <div>
        <h1>Hello! {this.state.name}</h1>
      </div>
    );
  }
}
```

Tại thời điểm này, component này là một class component stateful. Để tạo một Greeting container component, chúng ta có thể chia UI thành một presentational component mà tôi sẽ minh họa bên dưới.

### Presentational
Presentational components sử dụng `props`, `render`, and `context` (**stateless** API’s) :
```
const GreetingCard = (props) => {
  return (
    <div>
      <h1>Hello! {props.name}</h1>
    </div>
  )
}
```

Các presentational component chỉ nhận data và callback từ các props có thể được cung cấp bởi container hoặc component cha của nó.
Các container và presentational component cùng nhau đóng gói logic và trình bày cho các component về sau của chúng:

```
const GreetingCard = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

class Greeting extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
  }

  componentDidMount() {
    // AJAX
    this.setState(() => {
      return {
        name: "Taku Kudo",
      };
    });
  }

  render() {
    return (
      <div>
       <GreetingCard name={this.state.name} />
      </div>
    );
  }
}
```

Như bạn có thể thấy, tôi đã loại bỏ phần presentation từ Greeting class component thành functional stateless component của nó. Tất nhiên, đây là một ví dụ rất dễ  - nhưng nó là cơ bản để xây dựng các ứng dụng phức tạp hơn.

### Higher order components (HOC’s - Các components bậc cao)

Một component bậc cao là một hàm nhận một component làm đối số và trả về một component mới.

Đây là một pattern mạnh mẽ cung cấp tìm nạp và dữ liệu cho bất kỳ số lượng component nào và có thể được dùng để tái sử dụng component logic. Hãy suy nghĩ `react-router-v4` và `Redux`. Với react-router-v4, bạn có thể sử dụng `withRouter()` để kế thừa các phương thức được truyền dưới dạng các `props` cho component của bạn. Và với Redux, bạn có quyền truy cập vào các hành động được chuyển qua `props` khi bạn `connect({}) ()`.
Ví dụ:

```
import {withRouter} from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {path: ''}
  }
  
  componentDidMount() {
    let pathName = this.props.location.pathname;
    this.setState(() => {
      return {
        path: pathName,
      }
    })
  }
  
  render() {
    return (
      <div>
        <h1>Hi! I'm being rendered at: {this.state.path}</h1>
      </div>
    )
  }
}

export default withRouter(App);
```

Khi export component, tôi sẽ gói nó với `withRouter()` của `react-router-v4`. Trong lifecycle events `componentDidMount()` của App, tôi đang cập nhật state với giá trị được cung cấp bởi `this.props.location.pathname`. Bằng cách gói component với `withRouter()`, class component của tôi bây giờ có quyền truy cập vào các phương thức của `react-router-v4` thông qua các props: `this.props.location.pathname`. Đây chỉ là một ví dụ trong rất nhiều ví dụ khác.

### Render callbacks

Tương tự như HOC's, render callbacks hoặc render props được sử dụng để chia sẻ hoặc tái sử dụng component logic. Trong khi nhiều developers có khuynh hướng nghiêng về phía HOC để có thể sử dụng lại logic hơn thì có một số lý do và lợi ích rất tốt để sử dụng render callbacks - điều này được giải thích rõ nhất trong ["Never write another HOC"](https://www.youtube.com/watch?v=BcVAq3YFiuc) của Michael Jackson. Dựa trên một số điểm chính của cuộc nói chuyện, render callbacks cung cấp việc giảm namespace đụng nhau và minh họa tốt hơn hơn logic chính xác đến từ đâu.

```
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  increment = () => {
    this.setState(prevState => {
      return {
        count: prevState.count + 1,
      };
    });
  };

  render() {
    return (
      <div onClick={this.increment}>{this.props.children(this.state)}</div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <Counter>
        {state => (
          <div>
            <h1>The count is: {state.count}</h1>
          </div>
        )}
      </Counter>
    );
  }
}
```

Ở Counter class phía trên, tôi đang lồng hàm `this.props.children` trong phương thức `render` và lấy `this.state` làm đối số. Bên dưới trong App class, tôi có thể gói component của mình trong Counter component, do đó có quyền truy cập vào logic của Counter. Phần render callback là dòng 28, nơi có `{state => ()}`  khi đó tôi tự động có quyền truy cập vào state của Counter ở trên.


-----



Refer link: [React component pattern](https://medium.com/teamsubchannel/react-component-patterns-e7fb75be7bb0)