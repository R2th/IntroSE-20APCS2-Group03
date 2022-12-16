Trong quá trình sử dụng React, chúng ta đều biết đến khái niệm `inline functions` và được sử dụng khá nhiều. Tuy nhiên, có một vài ý kiến là inline functions khiến cho ứng dụng bị chậm đi. Vậy, trong bài viết này, chúng ta sẽ cùng tìm hiểu xem tại sao lại có ý kiến đó.

## Đầu tiên, Inline function là gì?

Theo khái niệm trong React, inline function là một hàm được định nghĩa trong khi React đang thực hiện rendering. Có 2 ý nghĩa của quá trình render trong React mà mọi người hay nhầm lẫn là: 
- Nhận các thành phần React từ component của bạn (hay là quá trình gọi hàm render của component) trong khi thực hiện quá trình update 
- Thực sự render các thay đổi vào DOM.

Chúng ta tạm thời quy ước, rendering được hiểu theo nghĩa thứ nhất.

VD về inline function:

```ruby
class App extends Component {
  // ...
  render() {
    return (
      <div>
        
        {/* 1. Một inline event handler của một "DOM component" */}
        <button
          onClick={() => {
            this.setState({ clicked: true })
          }}
        >
          Click!
        </button>
        
        {/* 2. Một "custom event" hay "action" */}
        <Sidebar onToggle={(isOpen) => {
          this.setState({ sidebarIsOpen: isOpen })
        }}/>
        
        {/* 3. Một render prop callback */}
        <Route
          path="/topic/:id"
          render={({ match }) => (
            <div>
              <h1>{match.params.id}</h1>}
            </div>
          )
        />
      </div>
    )
  }
}
```

## Tối ưu hoá quá sớm là nguyên nhân gốc rễ của mọi vấn đề 

Trước khi đề cập tiếp đến inline function, chúng ta sẽ tìm hiểu chút về tối ưu hoá một chương trình. Khi hỏi các chuyên gia tối ưu hoá, tất cả họ sẽ nói với bạn là không nên thực hiện tối ưu chương trình quá sớm. 100% ngưới với kinh nghiệm sâu về tối ưu hoá đều khuyên bạn không nên tối ưu code quá sớm. 

VD: khi code script, thay vì sử dụng cú pháp gọi object thông thường (obj.foo), thì tôi sử dụng key bằng string, và dùng ngoặc vuông để truy cập vào object (`obj[stringForFoo]`), ý tưởng là nhờ vậy sẽ thu nhỏ và thực hiện gzip, giảm dung lượng file, với kiểu viết code không thông thường này sẽ làm cho file nhỏ hơn là kiểu viết code bình thường. Tuy nhiên, khi tôi sửa lại viết theo kiểu bình thường thi dung lượng file giảm nhiều hơn so với kiểu bất thường kia, chúng tôi không hề biết cách nào là tối ưu hơn, tốt hơn, và thậm chí không hề biết là sẽ làm cho tồi tệ hơn.

Không chỉ vậy, việc tối ưu quá sớm còn làm ảnh hưởng đến thời gian phát triển, khó tạo code đẹp hoặc thậm chí làm phát sinh vấn đề hiệu năng như VD trên. 

## Tại sao nói inline function chậm?
 
 Có 2 lý do: `Memory/garbage collection` (dọn dẹp bộ nhớ / rác) và `shouldComponentUpdate`
 
 ### Dọn dẹp bộ nhớ và rác 
 
 Đầu tiên, folks và eslint đều đề cập đến tiêu tốn khi thực hiện dọn rác và bộ nhớ khi tạo các inline function. Điều này luôn được nhắc đến trước khi arrow function trở nên phổ biến. Rất nhiều code có thể gọi bind chính nó, điều này làm cho hiệu năng trở nên tồi tệ. VD 
 
 ```ruby
 <div>
  {stuff.map(function(thing) {
    <div>{thing.whatever}</div>
  }.bind(this)}
</div>
 ```

Vấn đề hiệu năng với Function.prototype.bind đã được sửa tại đây và arrow function vừa là một hướng native vừa được phiên dịch bởi babel thành các hàm tường minh và chúng đều không làm cho chậm.

Tuy nhiên, chúng ta cần nhớ là bạn không cần phải ngồi lại và tưởng tượng là đoạn code này chậm. Bạn chỉ cần viết code theo kiểu thông thường, sau đó dùng tool để đo lại. Nếu có vấn đề hiệu năng, hãy sửa chúng. Chúng ta không cần phải chứng minh một  inline arrow function nhanh, hay ai đó bảo cần chứng mình là nó chậm. Hay là khi tối ưu quá sớm.

Nếu ảnh hưởng của việc tạo một inline function lớn tới mức mà eslint đưa ra lời cảnh báo, thì bạn nên tìm hướng khác để cải thiện? 

VD:

```ruby
class Dashboard extends Component {
  state = { handlingThings: false }
  
  constructor(props) {
    super(props)
    
    this.handleThings = () =>
      this.setState({ handlingThings: true })

    this.handleStuff = () => { /* ... */ }

    // thậm chí làm nặng hơn với bind
    this.handleMoreStuff = this.handleMoreStuff.bind(this)
  }

  handleMoreStuff() { /* ... */ }

  render() {
    return (
      <div>
        {this.state.handlingThings ? (
          <div>
            <button onClick={this.handleStuff}/>
            <button onClick={this.handleMoreStuff}/>
          </div>
        ) : (
          <button onClick={this.handleThings}/>
        )}
      </div>
    )
  }
}
```

Với việc tối ưu trên, chúng ta đã làm chậm quá trình khởi tạo component 3 lần. Nếu tất cả các quá trình xử lý đều là inline, việc khởi tạo render sẽ chỉ tạo một function. Thay vì, chúng ta tạo 3 function. 

### PureComponent và shouldComponentUpdate

Đây là nguyên nhân chính của vấn đề. Bạn sẽ thấy sự cải thiện hiệu năng thực sự khi hiểu được 2 vấn đề: shouldComponentUpdate và so sánh sự giống nhau nghiêm ngặt trong  JavaScript. Nếu bạn không hiểu kỹ những điều này, bạn có thể làm cho code React khó hơn trong vấn đề hiệu năng.

Khi bạn gọi setState, React sẽ so sánh các phần tử React cũ với một tập các phân tử React mới ( còn được gọi quá trình reconciliation _ sự hoà hợp ) và sau đó sử dụng kết quả đó để cập nhật các phần tử DOM thực sự. Khi đấy có thể sẽ làm cho bị chậm nếu bạn có quá nhiều phần tử để kiểm tra. Trong trường hợp này, React cung cấp giải pháp `shouldComponentUpdate`

```ruby
class Avatar extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return stuffChanged(this, nextProps, nextState))
  }
  
  render() {
    return //...
  }
}
```

Nếu component của bạn định nghĩa shouldComponentUpdate, trước khi React so sánh các phần tử cũ và mới, nó sẽ gọi shouldComponentUpdate nếu có gì thay đổi. Nếu nó trả về false, React sẽ dừng hoàn toàn việc so sánh phần tử, nhờ đó sẽ tiết kiệm được nhiều thời gian. Nếu component của bạn đủ lớn, điều này có thể ảnh hưởng đáng kể đến hiệu năng.

Cách phổ biến nhất để tối ưu một component là mở rộng React.PureComponent thay vì React.Component. Một PureComponent sẽ so sánh props và state của bạn trong  shouldComponentUpdate vì vậy bạn không cần phải làm.

```ruby
class Avatar extends React.PureComponent { ... }
```

`Avatar` bây giờ sẽ sử dụng cách so sánh sự bằng nhau một cách nghiêm ngặt cho props và state khi được gọi khi cập nhật, hi vọng điều này sẽ tăng tốc đáng kể. 

### Strict Equality Comparison

Có 6 kiểu dữ liệu nguyên thuỷ trong Javascript: string, number, boolean, null, undefined và symbol. Khi bạn dùng một `strict equality comparison` cho 2 kiểu cơ bản có cùng giá trị, nó sẽ trả về true, VD:

```ruby
const one = 1
const uno = 1
one === uno // true
```

Khi PureComponent so sánh props, nó sử dụng strict equality comparison. Điều này khá hiệu quả với kiểu dữ liệu nguyên thuỷ được inline `<Toggler isOpen={true}/>`

Vấn đề so sánh props lại trở nên đáng suy nghĩ bởi vì với kiểu dữ liệu không nguyên thuỷ. Đó là Object, vậy với function và array thì sao, thực ra thì chúng cũng chính là kiểu object.

```
Functions are regular objects with the additional capability of being callable.

Hàm là các object thông thường với khả năng là có thể được gọi.
```

Với strict equality cho object, dù cùng giá trị nhưng kết quả vẫn là false

```ruby
const one = { n: 1 }
const uno = { n: 1 }
one === uno // false
one === one // true
```

Vì vậy, nếu bạn sử dụng một object trong JSX, nó sẽ làm cho việc so sánh prop trong PureComponent không chính xác và sẽ chuyển sự khác nhau thành các phần tử React rất lớn. 
Trong khi so sánh phần tử lại là rỗng, và bây giờ chúng ta lãng phí thời gian vào cả 2.

```ruby
// lần render đầu tiên 
<Avatar user={{ id: ‘ryan’ }}/>

// lần render kế tiếp
<Avatar user={{ id: ‘ryan’ }}/>

// so sánh prop diff nghĩ là có một vài thứ thay đổi vì {} !== {}
// so sánh phần tử không tìm thấy có gì thay đổi 
```

Bởi vì các function là các object, và PureComponent thực hiện kiểm tra strict equality với props, một inline function sẽ luôn luôn thất bị trong việc so sánh props và sẽ chuyển sang so sánh phần tử trong quá trình reconciler

Để có thể hỗ trợ cho shouldComponentUpdate, bạn phải giữ cho tính định danh tương đối của function. Với các nhà lập trình Javascript có kinh nghiệm, điều đó không quá khó. Nhưng, điều này lại không hề dễ với đa số những người còn lại. Lớp ES không cung cấp sự hỗ trợ nào, giờ hãy cùng lần mò từ đầu:

```ruby
class Dashboard extends Component {
  constructor(props) {
    super(props)
    
    var _this = this
    this.handleStuff = function() {
      _this.setState({})
    }
    
    this.handleStuff = () => {
      this.setState({})
    }
  }
  
  handleStuff = () => {}
}
```

Học cách biết xác định đinh danh tham chiếu của một function sẽ là quá trình khá dài. 

Nhưng không có lý nào để ép mọi người phải làm điều này hơn là cấu hình eslint để điều tra giúp. Tuy nhiên, dưới đây tôi sẽ đề cập cách sử dụng inline function và tối ưu hiệu năng cùng lúc. 

### Tối ưu hiệu năng cùng với inline function

Khi lần đầu tìm hiểu về PureRenderMixin, phiên bản trước của PureComponent, tôi đã thực hiện một chuỗi các phép đo và kiểm trả hiệu năng của app. Sau đó, thêm PureRenderMixin cho mỗi component. Khi kiểm tra lại, tôi hi vọng sẽ giúp cho mọi thứ nhanh hơn.

Nhưng, thật tiếc là app lại chậm hơn.

Tại sao? bởi vì nếu bạn có một Component, thì bao nhiêu sự khác nhau sẽ có? Nuế bạn có một PureComponent thì bao nhiêu sự khác nhau sẽ có? câu trả lời là chỉ một và ít nhất một, thỉnh thoảng 2. Nếu một component luôn thay đổi khi có một cập nhật, sau đó một PureComponent sẽ thực hiện 2 so sánh thay vì 1 (props và state trong shouldComponentUpdate , và với việc so sánh các phần tử bình thường). Nghĩa là sẽ làm cho chậm hơn nhưng thỉnh thoảng sẽ nhanh hơn. Nhưng hầu hết component của tôi thay đổi hầu như mọi lúc, vì vậy tổng thể, app của tôi sẽ chậm hơn.

Vì vậy, chúng ta cần đo và kiểm tra

Có 3 bối cảnh:

**Bộ bắt sự kiện DOM component**

```ruby
<button
  onClick={() => this.setState(…)}
>click</button>
```

Nó phổ biến không làm gì khác hơn là setState bên trong các trình xử lý sự kiện cho các button, input và các thành phần DOM khác. Điều này thường làm cho một inline function trở thành cách tiếp cận sạch nhất. Thay vì phải bao xung quanh tập tin để tìm các trình xử lý sự kiện, họ đã được tập trung lại. Cộng đồng React thường hoan nghênh colocation.

Component button (và mọi component DOM khác) thậm chí có thể là một PureComponent, do đó không quan tâm nhận dạng tham chiếu cho ShouldComponentUpdate ở đây.

Vì vậy, lý do duy nhất để nghĩ rằng điều này là chậm là nếu bạn nghĩ chỉ cần định nghĩa một function là một chi phí đủ lớn để lo lắng. Chúng tôi đã thảo luận rằng không có bằng chứng ở bất cứ đâu.

**Một “custom event” hay “action”**

```ruby
<Sidebar onToggle={(isOpen) => {
  this.setState({ sidebarIsOpen: isOpen })
}}/>
```

Nếu Sidebar là một PureComponent, chúng ta sẽ thực hiện so sánh prop. Với một sự kiên như onToggle, tại sao Sidebar lại phải so sánh no? có 2 lý do cho việc cần một prop trong so sánh  shouldComponentUpdate:

1. Bạn sử dụng prop để render
2. Bạn sử dụng prop làm ảnh hưởng trong hàm componentWillReceiveProps, componentDidUpdate, hay componentWillUpdate

 Với hầu hết component, chúng ta nên tạo một lớp PureComponentMinusHandlers và kế thừa nó thay vì kế thừa từ PureComponent. Nó chỉ có thể bỏ qua tất cả sự kiểm tra cho function.
    
Nếu bạn nhận một function và truyền function đó trực tiếp vào component khác, nó sẽ không ổn lắm. VD:

```ruby
// 1. App sẽ luôn truyền một prop vào Form
// 2. Form sẽ truyền một function xuống button với prop được lấy từ App
// 3. App sẽ được setState sau khi gán và truyền một prop mới cho Form
// 4. Form truyền một hàm mới cho Button, kết thúc prop mới
// 5. Button sẽ bỏ qua function mới, và dùng cập nhật bộ sự kiên click,
//    submit với dữ liệu cũ.

class App extends React.Component {
  state = { val: "one" }

  componentDidMount() {
    this.setState({ val: "two" })
  }

  render() {
    return <Form value={this.state.val} />
  }
}

const Form = props => (
  <Button
    onClick={() => {
      submit(props.value)
    }}
  />
)

class Button extends React.Component {
  shouldComponentUpdate() {
    // hãy giả sử như chúng ta so sánh mọi thứ trừ functions
    return false
  }

  handleClick = () => this.props.onClick()

  render() {
    return (
      <div>
        <button onClick={this.props.onClick}>This one is stale</button>
        <button onClick={() => this.props.onClick()}>This one works</button>
        <button onClick={this.handleClick}>This one works too</button>
      </div>
    )
  }
}
```

Vì vậy, tôi thích ý tưởng kế thừa từ một PureRenderWithoutHandlers, sẽ đảm bảo bạn không truyền trực tiếp các bộ bắt sự kiện được bỏ qua vào các component khác - mà bạn cần phải đóng gói chúng theo một cách khác.

**render prop**

```ruby
<Route
  path=”/topic/:id”
  render={({ match }) => (
    <div>
      <h1>{match.params.id}</h1>}
    </div>
  )
/>
```

Render props là một mẫu thường được dùng để tạo một component đã tồn tại để tạo và quản lý các state được chia sẻ. Nội dung của render prop là không thể biết bởi component. VD:

```ruby
const App = (props) => (
  <div>
    <h1>Welcome, {props.name}</h1>
    <Route path=”/” render={() => (
      <div>
        {/*
          props.name nằm ngoài phạm vi của Route và không được truyền vào như
          một prop, vì vậy Route không thể là một PureComponent,
          nó không biết sẽ được render trong đây
        */}
        <h1>Hey, {props.name}, let’s get started!</h1>
      </div>
    )}/>
  </div>
)
```

ĐIều đó nghĩa là một inline render prop function không gây ra vấn đề với shouldComponentUpdate.

## Kết luận

1. Viết code theo kiểu thông thường, code theo thiết kế
2. Đo sự tương tác của bạn và tìm ra các vùng bị chậm.
3. Sử dụng `PureComponent` và `shouldComponentUpdate` chỉ khi bạn cần, bỏ qua prop function