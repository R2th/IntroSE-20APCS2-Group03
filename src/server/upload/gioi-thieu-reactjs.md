# Giới Thiệu 
React.js là một thư viện Javascript đang nổi lên trong những năm gần đây với xu hướng Single Page Application. Trong khi những framework khác cố gắng hướng đến một mô hình MVC hoàn thiện thì React nổi bật với sự đơn giản và dễ dàng phối hợp với những thư viện Javascript khác. Hôm nay chúng ta sẽ tìm hiểu những khái niệm cơ bản trong React .
##     1. React là gì ?
React là một thư viện UI phát triển tại Facebook để hỗ trợ việc xây dựng những thành phần (components) UI có tính tương tác cao, có trạng thái và có thể sử dụng lại được. React được sử dụng tại Facebook trong production, và www.instagram.com được viết hoàn toàn trên React.

Một trong những điểm hấp dẫn của React là thư viện này không chỉ hoạt động trên phía client, mà còn được render trên server và có thể kết nối với nhau.

React sử dụng khái niệm DOM ảo (Virtual DOM) để chọn lựa và render những phần tử của node dựa tên sự thay đổi trạng thái khiến cho ta chỉ cần thay đổi ít thành phần nhất có thể để giữ DOM update.

##     2 .Virtual DOM hoạt động như thế nào ?
![](https://images.viblo.asia/be32e693-9dc7-41d5-a933-ef1513beb037.jpg)

Tưởng tượng bạn có một vật thể được thiết kế dựa trên một người. Nó có mọi bộ phận một người có thể có, và phản ánh lại trạng thái hiện tại của người đó. Đây là điều cơ bản React làm với DOM.

Bây giờ thử nghĩ rằng nếu bạn lấy vật thể đó và thay đổi một vài bộ phận. Thêm ria, bắp tay và đôi mắt xanh. Trong React, khi chúng ta tạo ra thay đổi, sẽ diễn ra 2 việc. Đầu tiên, React chạy một thuật toán so sánh sự khác biệt để phát hiện ra thay đổi. Bước thứ 2 là điều hòa bằng cách cập nhật DOM với kết qủa của thuật toán ở bước 1.

Cách React hoạt động là thay vì lấy một người thật và tái tạo lại từ đầu, React chỉ thay đổi khuôn mặt và tay. Điều này có nghĩa là khi bạn nhập vào 1 đoạn text và render xong thì đoạn text này sẽ không bị ảnh hưởng cho tới khi parent node được sắp xếp lại.

Vì React sử dụng một DOM giả nên cũng có khá nhiều ý tưởng thú vị xung quanh thư viện này. Ví dụ như ta có thể render DOM giả này trên server.

##     3 .Bắt đầu
Bắt đầu với React đơn giản bằng cách download React Starter Kit

Bạn cũng có thể fork trên React JSFiddle

Thiết lập trang
Khi thiết lập trang web, bạn cần thêm vào các thư viện react.js, react-dom.js và JSXTransformer.js, và sau đó thêm component của bạn vào một node script có type="text/jsx":
```js
<!DOCTYPE html>
 <html>
   <head>
   <script src="build/react.js"></script>
   <script src="build/react-dom.js"></script>
   <script src="build/JSXTransformer.js"></script>
  </head>
  <body>
    <div id="mount-point"></div>
     <script type="text/jsx">
      // React Code Goes Here
    </script>
   </body>
 </html>
```

React DOM là một thư viện hỗ trợ và mới được thêm vào trong React. React DOM trước đó là một phần của thư viện React nhưng được tách ra từ bản 0.14

Trong React, component được cài trên một thành phần nên trong ví dụ này ta có thể sử dụng div như một thành phần bao ngoài.

Đây là cách dễ nhất để bắt đầu, tuy nhiên khi thực sự xây dựng một apps hoàn chỉnh thì tốt hơn hết là sử dụng Browserify hoặc Webpack và thiết lập components trong files riêng biệt.

##     4 .Cơ bản
Thành phần cơ bản của React được gọi là components. Syntax để viết HTML khá là kỳ quặc khi sử dụng Javascript để render:
```js
<script type="text/jsx">
    ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('myDiv')
    );
</script>
```

### JSX

Đoạn Javascript trên được gọi là JSX và nó là syntax chuyển từ Javascript XML. JSX cho phép bạn viết Javascript theo phong cách HTML.

Đối với những tag html bình thường, attribute class được gọi là className và for là htmlFor vì đây là những từ được quy định sẵn. Bạn có thể xem thêm tại JSX Gotchas của Facebook.

Nếu như không sử dụng JSX thì syntax sẽ trông như đoạn code này:

```js
React.render(
  React.createElement('h1', null, 'Hello!'),
  document.getElementById('myDiv')
);
```

Bạn có thể đọc thêm về các thành phần hỗ trợ tại[ đây](https://reactjs.org/docs/dom-elements.html)

### Components

Khi sử dụng method render với React DOM như trên, argument đầu tiên chính là component chúng ta muốn render, và argument thứ hai là DOM node nó được cài lên. Chúng ta có thể sử dụng method createClass để tạo các class component. Nó có thể nhận một vài giá trị từ một object làm argument.

```js
var MyComponent = React.createClass({
    render: function(){
        return (
            <h1>Hello, world!</h1>
        );
    }
});
```

Sau khi tạo một class, ta có thể render nó trong document như bên dưới:

```js
ReactDOM.render(
    <MyComponent/>,
    document.getElementById('myDiv')
);
```

### Props

Khi sử dụng components của mình, chúng ta có thể thêm attributes gọi là props. Những attributes này được gọi ra trong components bằng this.props và có thể được sử dụng trong method render để render dữ liệu động.

```js
var MyComponent = React.createClass({
    render: function(){
        return (
            <h1>Hello, {this.props.name}!</h1>
        );
    }
});

ReactDOM.render(<MyComponent name="Handsome" />, document.getElementById('myDiv'));
```

### Specs, Lifecycle & State

Method render là spec duy nhất cần có khi tạo một component, nhưng một vài methods lifecycle và spec chúng ta có thể sử dụng vô cùng hữu ích khi bạn thực sự muốn component của bạn thực hiện gì đó. The render method is the only required spec for creating a component, but there are several lifecycle methods & specs we can use that are mighty helpful when you actually want your component to do anything.

#### Các method lifecycle
componentWillMount – được gọi một lần trên cả client và server trước khi render diễn ra.
componentDidMount – được gọi một lần chỉ trên client, sau khi render.
shouldComponentUpdate – trả lại giá trị quyết định xem component có được update không.
componentWillUnmount – được gọi trước khi tách component.
#### Các method specs
getInitialState – trả lại giá là giá trị ban đầu của state.
getDefaultProps – lấy props mặc định nếu props không được cung cấp.
mixins – một chuỗi các object được sử dụng để extend các tính năng của component.
Có một vài method lifecycle và specs khác mà bạn có thể đọc thêm tại đây.

#### Trạng thái (state)
Mọi component đều có một object state và một object props. State được thiết lạp sử dụng method setState. Gọi setState kích hoạt cập nhật UI và gắn liền với hoạt động của React. Nếu chúng ta muốn thiết lập một trạng thái ban đầu trước khi có tương tác thì ta có thể sử dụng method getInitialState.

```js
var MyComponent = React.createClass({
    getInitialState: function(){
        return {
            count: 5
        }
    },
    render: function(){
        return (
            <h1>{this.state.count}</h1>
        )
    }
});
```

### Events

React cũng có một hệ thống events sử dụng được ở các browser khác nhau. Những events này được gắn liền như thành phần của components và có thể kích hoạt các method.

```js
var Counter = React.createClass({
  incrementCount: function(){
    this.setState({
      count: this.state.count + 1
    });
  },
  getInitialState: function(){
     return {
       count: 0
     }
  },
  render: function(){
    return (
      <div class="my-component">
        <h1>Count: {this.state.count}</h1>
        <button type="button" onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
});

ReactDOM.render(<Counter/>, document.getElementById('mount-point'));
```

### Dòng dữ liệu một chiều

Trong React, dòng dữ liệu của application là một chiều thông qua state và props, khác với dòng dữ liệu hai chiều trong những thư viện như Angular. Điều này có nghĩa là trong cấu trúc nhiều tầng components, một component cha có thể quản lý state và truyền xuống component bên dưới thông qua props.

State có thể được update sử dụng method setState để đảm bảo rằng UI được cập nhật liên tục. Kết qủa sẽ được truyền xuống component con sử dụng attributes thông qua this.props.

```js
var FilteredList = React.createClass({
  filterList: function(event){
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function(item){
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  },
  getInitialState: function(){
     return {
       initialItems: [
         "Apples",
         "Broccoli",
         "Chicken",
         "Duck",
         "Eggs",
         "Fish",
         "Granola",
         "Hash Browns"
       ],
       items: []
     }
  },
  componentWillMount: function(){
    this.setState({items: this.state.initialItems})
  },
  render: function(){
    return (
      <div className="filter-list">
        <input type="text" placeholder="Search" onChange={this.filterList}/>
      <List items={this.state.items}/>
      </div>
    );
  }
});

var List = React.createClass({
  render: function(){
    return (
      <ul>
      {
        this.props.items.map(function(item) {
          return <li key={item}>{item}</li>
        })
       }
      </ul>
    )
  }
});

ReactDOM.render(<FilteredList/>, document.getElementById('mount-point'));
```

## 5. Kết luận

React là một thư viện rất thú vị và được phát triển dựa trên rất nhiều cấu trúc phức tạp. Tuy nhiên thư viện này lại rất dễ sử dụng và thêm vào trong nhiều application khác nhau. Các bạn có thể đọc hướng dẫn sử dụng React chi tiết hơn tại [đây](https://reactjs.org/tutorial/tutorial.html). Ngoài ra React còn có thư viện [React Native](https://facebook.github.io/react-native/) được dùng để thiết kế native apps.