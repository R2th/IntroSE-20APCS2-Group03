## Đặt vấn đề
Tuần vừa rồi mình tham gia một buổi `Meetup` nho nhỏ và được nghe các `developer` "tay to" chém gió nhiều kiến thức hay ho trong `ReactJS`. Cá nhân mình nghĩ rằng, điều tối quan trọng để ta có thể tạo ra những project có `design structures` tuyệt vời là hiểu rõ được điểm mạnh của `React` và vận dụng triệt để nó. Điều mình đang muốn nhắc tới đó là tính `component-based` trong `React` 😺😺

![](https://images.viblo.asia/efaeda77-7c18-4e92-8875-e1dd00cb379f.gif)

*Trong bài viết này chúng ta sẽ cùng nhau tìm hiểu về các `React component patterns` nhé😽* 


## Component là cái chi chi?

*Khi nhấp vào đọc vài biết này gần như phần lớn bạn nào cũng dư sức biết component là gì rồi, song, mình vẫn xin phép overview qua về **conponent definication** để các bạn mới sẽ nắm qua một chút ^^*

Theo reactjs.org:
> Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.

<br/>

Lần đầu tiên `npm install react`, ta sẽ có `component` và các `API's` của nó. Tương tự như các `Javascript function`, một `component` nhận `props` và trả về một `React element`. Đó là lý do đôi khi, `React` được xem như là một **declarative API**. Bạn chỉ cần để nó biết (`declare`) `UI` trông như thế nào? Việc còn lại cứ để `React` lo. 😄😄

**Note**:

*Để hiểu rõ hơn về tính `declarative`, xét một ví dụ như việc bạn đi taxi tới một điểm đến. Bạn chỉ cần nói với tài xế nơi bạn muốn tới, và bác tài xế xe sẽ đưa bạn tới nơi an toàn. Ngược lại với `declarative`, bạn có xe, và chính bản thân mình, nhưng bạn phải tự lái xe tới địa điểm đó !!!*

## Component API’s
Khi bạn `install React`, có các `API's` chính đó là:
1. `render()`
2. `state`
3. `props`
4. `context`
5. `lifecycle events`

Mặc dù `component` có thể sử dụng tất cả các `API's` trên, song, trên thực tế, các `component` được dùng chỉ một vài trong số đó.

*Okay, điểm qua một chút về `component` như vậy được rồi, tiếp theo ta sẽ đi vào các `component patterns` trong `React`. Đó là các `best practise` có tác dụng phân tách tầng `data - logic` và tầng `UI - presentational`.
Bằng việc chia component theo mục đích sử dụng, ta có được các component tái sử dụng, dễ quản lý và kết hợp vào các component có UI phức tạp hơn.*

*Vào chi tiết nào* 🖖🖖

## Component patterns
Các **component patterns** phổ biến:
1. `Container`
2. `Presentational`
3. `Higher order components (HOC’s`)
4. `Render callback`

<br/>

**Notes**: *Với `Container component` vs. `Presentational Component`, ta có các từ khóa tương tự như `Fat vs. Skinny`, `Smart vs. Dumb`, `Stateful vs. Pure`, `Screens vs. Components`,...*

### Container

> A container does data fetching and then renders its corresponding sub-component.
> 
<br/>

**Note**: *`Corresponding` ở đây có nghĩa là thành phần cùng tên:*

**Eg:**
```
StockWidgetContainer => StockWidget
TagCloudContainer => TagCloud
```

#### Tư tưởng
* `Container` trả lời câu hỏi: *How things work?* 
* Có thể chứa cả `presentational` và `container components`
* Không có bất kì các `DOM markup` và `styles` nào ngoại trừ một vài `wrapping div-s`
* Truyền `data` và `callbacks` cho `presentational` hoặc các `container component` khác *( `data sources`, `callback sources`)*
* `Call/dispatch actions`, lấy `state` trên `store`... qua `HOC's` *(như `connect()` từ `Redux`, `createContainer()` from `Relay`, hay `Container.create()` từ `Flux Utils`)*.

<br/>

![](https://images.viblo.asia/09659349-5eb9-4f82-9030-6b453f9caedf.PNG)

**`Containers` là tầng xử lý data - logic và các stateful API’s, lifecycle events**... Chúng ta có thể kết nối với `store` quản lý `state` như  *Redux*, *Flux*,... sau đó truyền `data || callbacks` như một `props` xuống các component con. Cũng chính vì việc sử dụng, truy cập các `statefull API's` nên `container component` thường được tạo qua `Class (ES6)`.

#### Ví dụ

Một số trường hợp dùng container components như *UserPage, FollowersSidebar, StoryContainer, FollowedUserList...*

```js
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
        name: "William",
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
```
*Trong ví dụ này,  `Greeting` là một `stateful class component`. 
 Để `Greeting` trở thành một `container component`, chúng ta cần tách `UI` ra khỏi component này thành một `Presentational component`:*
 
 ### Presentational
 
 #### Tư tưởng
 
* `Presentational` trả lời câu hỏi: *How things look?*
* Có thể chứa cả `presentational` và `container components`, hoặc `this.props.children`
* Thường kèm các `DOM markup` và các `styles` riêng của nó.
* Không quan tâm tới các thành phần còn lại của `app` (ví dụ như `Flux actions` hoặc `stores`) hay `third-party`
* Chỉ nhận `data` qua `props` và `emit event` qua `callbacks`, không load `data`, không xử lý các luồng dữ liệu
* Hiếm khi có `state` riêng (nếu có, thì nó thường là `UI state` hơn)
* Được `declare` dưới dạng `functional components` vì chúng không dùng các `stateful API's` (`state`, `lifecycle hooks`, or `performance optimizations`)

![](https://images.viblo.asia/23e72f9f-53d5-4f01-ae8c-a59ab0763aa0.PNG)
 
  #### Ví dụ
 Trong `Presentational components` thường có các `props`, `render`, and `context` (`stateless API’s`), như là `stateless component`:
 ```js
const GreetingCard = (props) => {
  return (
    <div>
      <h1>Hello! {props.name}</h1>
    </div>
  )
}
```
Ngoài ra thường được dùng cho các *Page, Sidebar, Story, UserInfo, List*.

Như vậy, `containers` gói gọn các `logic` và truyền `data` và `callbacks` xuống `presentational components` để thể hiển thị ra `UI` của nó.
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
        name: "William",
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

#### Kết luận
Một `component` đảm nhiệm cả vai trò `fetching data` *(container components)* và `rendering` *(presentational components)* chẳng có gì là sai cả, làm vậy thì ứng dụng vẫn chạy nhưng vô hình chung ta đã bỏ qua mất một vài lợi ích mà `React` mang lại.

Hơn nữa, nếu bạn nào đã đọc qua cuốn ***Clean code*** thần thánh hẳn đã nghe qua **`Single responsibility principle`**  thì cũng hiểu lý do việc phân chia ra như vậy lại là một ***Best practise*** 😄😄

Việc phân chia thành phần ra `container component` và `presentational component` có các lợi ích như sau:

* Tách biệt rõ ràng phần xử lý logic của `component` và phần `view`, giúp ta quản lý `UI` dễ dàng hơn
* `Reusability`: Có thể tái sử dụng các `presentational component` với các `data sources` hay `callback sources` trong nhiều `context` khác nhau
* `Presentational components` được xem như là “*palette*” của `app`. Ta có thể để chúng ở một folder riêng để *Designer* dễ dàng chỉnh sửa các *biến màu, fontsize*... mà không đụng vào `logic` của `app`. Còn có thể test riêng trên mỗi `component` một cách dễ dàng, sử dụng triệt để được Data structure với PropsTypes trong React
* Ngoài ra, chúng ta có thể trích xuất các `layout components` như *Sidebar, Page, ContextMenu* và sử dụng `this.props.children` cho một số các `container component`.


<br/>

#### Bonus
*Ta có một vài notes về `Technicals` cần phải phân biệt rõ như:*
* **Stateful vs. Stateless** <br/>`Container components` thường là `stateful`, `presentational components` thường là `stateless`. Tuy nhiên, các một vài trường hợp `container component` vẫn có thể là `stateless` hay `presentational component` vẫn có thể là `stateless`. *(Bạn có thể hiểu rõ hơn về Stateful vs. Stateless component trong [bài viết này](https://viblo.asia/p/phan-biet-stateful-vs-stateless-components-V3m5WGGv5O7) nhé)*
* **Classes vs. Functions** <br/> Kể từ `React 0.14`, `components` có thể được định nghĩa theo  `classes` hoặc `functions`.  Trước đây thì `functional components` "thua kém" `class component` ở chỗ là quản lý `state` và `lifecycle`, song, bây giờ với `lifecycle hook` vẫn giúp ta có thể khai báo các `container component` hay `presentational component` đều được. Cá nhân mình thì thường dùng `class` cho các `container component` và `function` cho các `presentational component`.
* **Pure and Impure** <br/>Theo định nghĩa, *Pure component is pure if it is guaranteed to return the same result given the same props and state*. `Pure components` có thể được định nghĩa qua `classes` hoặc `functions`, nó có thể là `stateful` hoặc `stateless`. Một điểm nổi bật của `pure components` là có tính `shallow mutations in props or state` ( việc `rendering performance` có thể được tối ưu qua các `shallow comparison` trong `shouldComponentUpdate() hook`).

`Presentational components` và `container components` có thể là một trong các kiểu `component` được liệt kê trên. Theo những trải nghiệm bé nhỏ của mình, `presentational components` có xu hướng là `stateless pure functions`, và `container components` có xu hướng là `stateful pure classes`.

<br/>

*Okay, tiếp theo mình tìm hiểu về HOC's và Render Callbacks nhé* *😽😽*

### Higher order components (HOC’s)
 #### Tư tưởng
 
Theo `MDN`:
> A higher order component is a function that takes a component as an argument and returns a new component.

<br/>

Đây là một trong những `pattern` có sức mạnh nổi bật trong cung cấp các `fetching` và `data` cho nhiều `components` và tái sử dụng lại các `logic`.

![](https://images.viblo.asia/c9ced8d1-b9d9-4e80-bdb0-d6a26e2a2e1a.PNG)

 #### Ví dụ
Để minh họa, ta quay lại với `React Router version 4` và `Redux` một xíu 😉😉 :

*Với `React Router` có `withRouter()` để kế thừa các `methods` được truyền qua `props`. Với `Redux` ta có thể truy cập vào các `actions` được truyền như một `props` thông qua hàm `connect({})`.*


```js
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

### Render callbacks
 #### Tư tưởng

Tương tự như `HOC's`, `render callbacks` hay `render props` được sử dụng như một `component` để chia sẻ, tái sử dụng các `logic`.
Thông thường ta hay có xu hướng dùng các `HOC's` hơn, song, có một vài điểm mạnh với `render callbacks` như hạn chế `namspace collision`, `logic` đó xuất phát từ đâu ...

![](https://images.viblo.asia/009f012c-37f7-4cc1-971b-812bcee90756.PNG)

 #### Ví dụ
Bạn có thể xem chi tiết [tại đây](https://www.youtube.com/watch?v=BcVAq3YFiuc).
Một đoạn code minh họa cho `Render callbacks`:
```js
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

### Kết

*Yayyyy...* Vậy là chúng ta đã điểm qua một vài `component patterns` trong `React` rồi 🤗🤗


Mong rằng bài viết này sẽ mang lại cái nhìn tổng quan nhất cho các bạn, giúp các bạn hiểu rõ về `Container - Representational Component`, `HOC's`, `Render callbacks` và các `use cases` liên quan để có những `best practise` trong `project` của mình nhé ^^

![](https://i.pinimg.com/originals/21/74/53/217453365c72d4ea6ff7192d6833ebe3.gif)

Mình cảm ơn các bạn đã đọc bài chia sẻ này. Tặng mình `1 upvote` để có thêm động lực cho những bài viết sắp tới nha 😺😺

*Tham khảo thêm các bài viết về `Technical` [tại đây](http://haodev.wordpress.com) ^^*

<br/>

*Happy Coding !!!*


<br/>

*Reference: [Michael Chan's Video](https://www.youtube.com/watch?v=YaZg8wg39QQ), [Medium](https://medium.com/@learnreact/container-components-c0e67432e005),  [Scotch](https://scotch.io/courses/5-essential-react-concepts-to-know-before-learning-redux/presentational-and-container-component-pattern-in-react)*