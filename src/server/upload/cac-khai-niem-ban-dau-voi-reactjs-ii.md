Tiếp tục phần tìm hiểu lần trước https://viblo.asia/p/cac-khai-niem-ban-dau-voi-reactjs-gDVK2p9elLj, lần này mình xin giới thiệu về các objectives như bên dưới:
- React được xây dựng xung quanh các Component như thế nào?
- Hai khái niệm Props và State của data trong React
- Tìm hiểu thêm về inverse data flow
- Khái niệm về refs và findDOMNode
## 1. Component trong React
### 1.1 Giới thiệu:
Trong React, chúng ta xây dựng trang web sử dụng những thành phần (component) nhỏ. Chúng ta có thể tái sử dụng một component ở nhiều nơi, với các trạng thái hoặc các thuộc tính khác nhau, trong một component lại có thể chứa thành phần khác.
![](https://images.viblo.asia/c780e48a-d960-4c1f-bf27-f736f795b00d.png)

### 1.2  Cách khai báo component
**Cách 1**: Chúng ta sẽ sử dụng *React.createClass()*
```js
const MyComponent = React.createClass({
  render: function() {
    return <div className={this.props.className}/>;
  }
});
```

**Cách 2**: React 0.14 mới cho phép bạn viết nhanh 1 Components bằng 1 hàm với tham số props
```js
const MyComponent = props => (
  <div className={props.className}/>
);
```
**Cách 3**: Sử dụng cú pháp ES6
```js
class UserInfo extends React.Component {
    render() {
        return (
            <div>
                <p>Name: {this.props.name}</p>
                <p>Email: {this.props.email}</p>
            </div>
        );
    }
}
```

Với các Components lớn và nhiều xử lý, nên sử dụng cách 1 hoặc 2. Còn trong đa số các trường hợp khác, Components không cần state, chỉ render() từ props thì nên sử dụng cách thứ 3 này, giúp cho ứng dụng mạch lạc và nhanh hơn.

### 1.3 Method/function của component
* constructor(props)
    * Hàm này Thực hiện việc thiết lập state cho component.
Việc sử dụng super(props) là để có thể sử dụng this.props trong phạm vi hàm constructor này
```js
constructor(props){
   super(props)
}
```
* componentWillMount() :
    * Thực hiện một số tác vụ, hàm này được gọi một lần trên cả client và server trước khi render diễn ra.
* componentDidMount() :
    * Thực hiện một số tác vụ, hàm này được gọi một lần chỉ trên client, sau khi render.
    * Hàm này rất hữu dụng khi bạn làm việc thêm với Map, bởi vì map chỉ render được khi có node (id) trong DOM
* componentWillUnmount() :
    * Thực hiện một lần duy nhất, khi component sẽ unmount, được gọi trước khi tách component.
    * Hàm này hữu dụng khi bạn cần xóa các timer không còn sử dụng
* componentWillReceiveProps(nextProps) :
    * Hàm này thực hiện liên tục mỗi khi props thay đổi
* shouldComponentUpdate(nextProps, nextState) :
    * Thực hiện khi state và props thay đổi
    * Hàm này sẽ trả về kết quả true/false, bạn sẽ cần sử dụng đến hàm này để xử lý xem có cần update component không.
* componentWillUpdate(nextProps, nextState) :
    * Hàm này thực hiện dựa vào kết quả của hàm trên (shouldComponentUpdate)
    * Nếu hàm trên trả về false, thì React sẽ không gọi hàm này
* componentDidUpdate(prevProps, prevState) :
    * Hàm này thực hiện sau khi component được render lại, từ kết quả của componentWillUpdate
* render() :
```js
render() {
    return (
      <div>
        // thực hiện việc render
      </div>
    );
}
```
* Khai báo kiểu biến cho props
```
    User.propTypes = {};
```

* Khai báo giá trị mặc định cho props
```js
    User.defaultProps = {}
```
### 1.4 Vòng đời Component
![](https://images.viblo.asia/6104498a-6d77-4bf5-93e0-2be8c0cf4c85.png)

*Theo hình bên trên, vòng đời component lần lượt gồm các giai đoạn:*
* **KHỞI TẠO COMPONENT:**
    * Lần lượt các hành động sau để khởi tạo component:
    * Khởi tạo Class (đã thừa kế từ class Component của React)
    * Khởi tạo giá trị mặc định cho Props (defaultProps)
    * Khởi tạo giá trị mặc định cho State (trong hàm constuctor)
    * Gọi hàm componentWillMount()
    * Gọi hàm render()
    * Gọi hàm componentDidMount()
 
* **KHI STATE THAY ĐỔI**
    * Cập nhật giá trị cho state
    * Gọi hàm shouldComponentUpdate()
    * Gọi hàm componentWillUpdate() – với điều kiện hàm trên return true
    * Gọi hàm render()
    * Gọi hàm componentDidUpdate()
 
* **KHI PROPS THAY ĐỔI**
    * Cập nhật giá trị cho props
    * Gọi hàm componentWillReceiveProps()
    * Gọi hàm shouldComponentUpdate()
    * Gọi hàm componentWillUpdate() – với điều kiện hàm trên return true
    * Gọi hàm render()
    * Gọi hàm componetDidUpdate()

* **KHI UNMOUNT COMPONENT**
    * Gọi hàm componentWillUnmount()

* Ngoài ra, mình xin nói thêm về  **SETSTATE**:

Trong React, bạn chỉ khởi tạo giá trị this.state một lần duy nhất, sau khi khởi tạo xong, nếu bạn muốn cập nhật this.state, bạn phải dùng hàm this.setState.

Khi sử dụng this.setState, chính là kích hoạt danh sách các phương thức thuộc vòng đời của component (shouldComponentUpdate, componentWillUpdate, render, componentDidUpdate). Và cũng luôn nhớ rằng, this.setState là hàm async, nên truy cập this.state ngay sau khi setState sẽ không nhận được giá trị mới của this.state.

<br>

*Hãy thử xem đoạn code sau:*
```js
componentWillReceiveProps(nextProps){
  this.setState(nextProps)
  console.log(this.state) //=> in ra giá trị cũ của state, không được cập nhật nextProps
}
```
Để khắc phục khi bạn muốn thực hiện thêm 1 hành động nào đó như lưu log, tracking, thông báo… thì bạn sử dụng hàm callback như sau:
```js
componentWillReceiveProps(nextProps){
  this.setState(nextProps, ()=>{
    this.updateDatabase(this.state)
  })
}
```

Ở đoạn code trên mình lồng trong componentWillReceiveProps chỉ là ví dụ thôi nhé, bạn có thể sử dụng cách viết callback sau khi setState ở bất cứ đâu trong component ngoại trừ hàm render()

***Tóm lại:***

Khi mới bước chân vào hệ sinh thái React, bạn cũng sẽ như mình lúng túng với Flux, Redux…Nó là những khái niệm rất khó nuốt, và càng khó nuốt hơn khi bạn chưa nắm rõ vòng đời của component trong React như thế nào.

Mình nhắc lại là việc hiểu rõ nó rất quan trọng, hi vọng qua bài viết này sẽ giúp bạn đạt được điều đó. Với những ứng dụng không quá phức tạp về phía người dùng, sự liên kết trao đổi dữ liệu giữa các component không cùng cha-con thì không cần phải quan tâm đến Flux/Redux.

### 1.5 Multiple Component
```js
var Form = React.createClass({
    render: function(){
        return (
            <div>
                <h3>Click the button</h3>
                <input type="submit" />
            </div>
        );
    }
});
var App = React.createClass({
    render: function(){
        return (
            <div>
                <h1> Welcome to my app!</h1>
                <Form />
            </div>
        );
    }
});
React.render(<App />,  document.getElementById("app"));
```

Ở ví dụ này, Form component được lồng vào trong App component. Đây là một dạng quan hệ cha con.

Phương thức React.render() ở trên nhằm mục đích kích hoạt việc render, và render thừ root component, trong trường hợp trên là App vào trong DOM với container cụ thể là element có id là app.

Các bạn có thể thử viết Component để show ra form login như bên dưới xem mình đã hiểu được vòng đời của component:
![](https://images.viblo.asia/fc57be7d-8ba2-449a-9f89-1bdf417a7769.png)


## 2. Props and States
Tiếp tục, mình xin chuyển đến 2 keyword quan trọng ko kém trong React
![](https://images.viblo.asia/baea6c6b-adea-4855-937a-6a2fb5a5a138.png)

### 2.1 Props
![](https://images.viblo.asia/a095d6ab-beec-4063-9ab4-ebb9b36890d5.png)
* props là một attribute của Component. Chúng ta có thể sử dụng props như là một Object hay là một Function
* props chứa giá trị được chuyển từ bên ngoài vào trong Component.
* Khi bạn muốn validate props, hãy sử dụng PropTypes để làm việc đó.
```js
propTypes: {
   name:   React.PropTypes.string.isRequired,
   id:     React.PropTypes.number.isRequired,
   width:  React.PropTypes.number.isRequired,
   height: React.PropTypes.number.isRequired,
   alt:    React.PropTypes.string
 }
```
* Default Prop value
React cung cấp cho bạn cách define default values cho props rất rõ ràng  
```js
var Hello = React.createClass({
 getDefaultProps() {
   return {
     name: "React"
   }; 
 },
 render() {
   return <div>Hello {this.props.name}</div>
 }
});
```

* SetProps và ReplaceProps

Khi bạn gọi setProps(), nó sẽ thay đổi properties của Component và trigger một re-render. Ngoài ra, bạn cũng có thể đưa vào một callback function mà sẽ được thực thi một khi setProps được hoàn thành.

Với setProps() nó merge property nào mà nó set.

Với replaceProps() nó delete các props tồn tại trước đó và thay bởi properties mới.

```js
AvatarComponent.setProps({name: "Bar"}, function(){
     alert("AvatarComponent setProps Done!");
});

AvatarComponent.replaceProps({name: "Bar-Foo"}, function(){
     alert("AvatarComponent replaceProps Done!");
});
```
* Ví dụ với Props

Tạo component form đơn giản nhận props test từ component cha truyền vào
```js
class Form extends React.Component {
    render(){
        return (
            <div>
                <h3>{this.props.test}</h3>
                <input type="submit" />
            </div>
        );
    }
}
```
```js
class App extends React.Component {
    render(){
        return (
            <div>
                <h1> Welcome to my app!</h1>
                <Form test="abcxyz"/>
            </div>
        );
    }
};
ReactDOM.render(<App text={text}/>, document.getElementById("root"));
```

* Thao tác để biết mình hiểu Props như thế nào?
Bây giờ, chúng ta hãy thử tạo 1 array Tracks trong index.js gồm list bài hát lưu theo dạng hash như sau:
```js
{
   id: 1,
   title: 'Vo nguoi ta'
}
```
Bây giờ, hãy viết Component TrackList truyền vào props tracks để liệt kê ra các tiêu đề của list bài hát đó?

*Gợi ý*: Bởi vì React component cần thuộc tính key để xác định bản thân nó trong một list các components. Hãy sửa nó bằng cách thêm key vào div hiển thị tên bài hát. Sau khi sửa, chỉ cần đơn giản save file, lúc này react-hot-reload sẽ làm nhiệm vụ của nó, các bạn chỉ cần đơn giản là nhìn vào console và không thấy lỗi hiển thị nữa.
```js
this.props.tracks.map((track, key) => {
  return <div key={key}>Track: {track.title}</div>;
})
```
### 2.2 States
* Giới thiệu:

Khi props đóng vai trò như là IF để truyền data từ parent vào trong Component, nó được “sở hữu” bởi parent đó. Có thể coi props như một **Component’s configuration**.  Còn state như là một biến **private** của Component. Chúng ta có thể change states bằng cách gọi** this.setState()**

* *Lưu ý*: để thay đổi props ta phải gọi setProps từ bên ngoài Component: AvatarComponent.setProps

    * props và state đều là** plain JS objects**
    * props và state đều trigger **render update** khi thay đổi
  
***Như vậy, chúng ta có thể tóm lại:***

State lưu giữ linh hồn của ứng dụng. React với các ứng dụng lớn và mở rộng liên tục, ta nên giữ State luôn đơn giản (stateless components); chỉ sử dụng State khi cần thiết, và phản ánh đúng trạng thái của Components.

* State làm cho test khó khăn hơn.
* State liên quan đến việc render() hiển thị, mỗi lần render() ta sẽ quan tâm: đã khởi tạo dữ liệu cho state hay chưa, state có thay đổi hay chưa, có nên render() lại hay không, ... 
* State chỉ tồn tại nội bộ trong 1 Components, với việc trao đổi dữ liệu với bên ngoài, việc sử dụng nhiều  state là không cần thiết. 

<br>

* Cài đặt State
Để cài đặt state, đơn giản chúng ta cài đặt hàm getInitialState() vào component, và trả về bất cứ gì bạn muốn cài đặt trong state của component đó.
```js
getInitialState: function(){
       return {
           active: true
       }
}
```
* Thay đổi giá trị của State
Để thay đổi state, đơn giản ta gọi hàm this.setState(), và truyền vào state mới như là một tham số.
```js
handleClick: function(){
       this.setState({
           active: !this.state.active
       });
}
```

* Ví dụ thao tác với State
```js
var App = React.createClass({
   getInitialState: function(){},
   handleClick: function(){},
   render: function(){
       var buttonSwitch = this.state.active ? "On" : "Off";
       return (
           <div>
               <p>Click the button!</p>
               <input type="submit" onClick={this.handleClick} />
               <p>{buttonSwitch}</p>
           </div>
       );
   }
});

React.render(<App />,  document.getElementById("app"));
```
Đoạn code trên cũng cho bạn làm quen với hệ thống event trong React, rất đơn giản. Chúng ta hook một event listener vào trong button, ở trên là onClick. Khi nó được trigger, chúng ta gọi hàm handleClick, cái mà đã được cài đặt trước đó, và luôn sẵn sàng được gọi thông qua từ khóa this.

Trong hàm handleClick, chúng ta gọi this.setState(), cái mà sẽ thay đổi trạng thái của component.

***Chú ý***: React event được wrap để chạy trên tất cả các browser, có nghĩa là React giúp bạn đảm bảo event của bạn chạy được trên tất cả các trình duyệt.

* Thao tác để biết mình hiểu State như thế nào?
Viết 1 form đơn giản gồm 1 thẻ input và 1 label show ra gia trị của input đó khi thay đổi giá trị trong input thì đồng thời thay đổi states tương ứng và show ra giá trị ở label ?
![](https://images.viblo.asia/4910b539-ba2a-4a70-a685-4e994989b341.png)

* **Chúng ta nên giữ state ở đâu?**
Để hình dung việc state được giữ ở đâu, bạn hãy hỏi bản thân một vài câu hỏi, những câu hỏi này được lấy từ React docs:


    * Xác định mỗi component mà render thông tin gì đó dựa trên state.
    * Tìm một component mà nó chủ sở hữu chung của các component khác (một component nằm bên trên tất cả các component khác trong hệ thống phân cấp thì cần có state)
    * Hoặc là những component là chủ sở hữu chung hoặc là những component nằm trên hệ thống phân cấp sẽ nên giữ state.
* Nếu bạn không thể tìm ra component nào phù hợp, hãy tạo một component mới đơn giản giữ nhiệm vụ lưu trữ state và đặt nó đâu đó nằm bên trên các component là chủ sở hữu chung trong hệ thống phân cấp.
    
    Nên cố gắng giữ số lượng các stateful component ít nhất có thể, và thậm chí giữ tối thiểu lượng dữ liệu trong state. Nếu component cấp dưới cần truy xuất dữ liệu từ state, thì hãy truyền nó thông qua props.

***Lưu ý***: Stateful component thì luôn luôn là higher level, trong khi Stateless component thường là lower level trong hệ thống phân cấp.


Ngoài ra, để sử dụng States hiệu quả, bạn có thể tham khảo các tips ở link: https://viblo.asia/p/su-dung-state-trong-react-mot-cach-hieu-qua-aWj531mwZ6m
## 3. Inverse data flow
Chúng ta đã nói rất nhiều về việc làm thế nào luồng dữ liệu chỉ có một chiều trong React, từ cha đến con. 

Khi mà một component nằm sâu bên trong cây phân cấp cần phải thay đổi trạng thái của cha nó?

Vẫn có cách để thêm một dòng dữ liệu theo hướng ngược lại (Inverse data flow).
![](https://images.viblo.asia/e1ef8b22-8bb6-4a13-890b-b0189e2c1551.png)

*Làm thế nào khi click vào button trong Form component mà nó sẽ trigger việc thay đổi trạng thái (state change) trong App component, cái nằm bên trên nó, cũng như việc có thể truy xuất vào phương thức onUserClick.????*

=> Câu trả lời là thông qua thuộc tính Key

Chúng ta cùng tìm hiểu lại ví dụ về Tracks nhé
![](https://images.viblo.asia/9a71c354-e7f9-4b67-9b85-a380296c11d8.png)
Khi bạn tạo các component một cách dynamically, mỗi thành phần đều cần thuộc tính key, và thuộc tính này là duy nhất (unique). Trong suốt quá trình rendering, các component sẽ bị xáo trộn, chúng cũng có thể bị destroy hay recreate tùy vào sự khác nhau của mỗi giải thuật, việc gán cho nó một key để định danh và đảm bảo rằng các component đều ở đúng vị trí của nó, tối ưu hóa việc rendering.

## 4. refs và findDOMNode
Thỉnh thoảng, bạn có thể sẽ muốn tiếp cận cây DOM, và làm một số thay đổi, nhưng không cần thiết phải sử dụng state hay là props. 
React cung cấp cho bạn một cách thủ công để có thể lấy DOM node. Đơn giản bạn gọi phương thức React.findDOMCode(component), và truyền vào component mà bạn mong muốn.

Để lấy được tham chiếu của component đã chọn bạn có thể sử dụng thuộc tính refs. Đơn giản thêm một ref vào trong phần tử như thế này.
```js
<input ref="textField" ... />
```

## 5. Event
* Event Handling and Synthetic Events

    Có thể dễ dàng truyền event handler giống như với HTML thông thường. React đảm bảo mọi event hoạt động giống như trên IE8 và
React biết cách bubble và capture các sự kiện thông qua spec, Các sự kiện sẽ được xử lý bởi event handler và được đảm bảo phù hợp với w3c spec. Nó chạy được trên tất các các trình duyệt khác nhau.

* Autobinding

    Khi làm việc với js thông thường, khi tạo ra một callback bạn thường phải bind một phương thức tới một thành phần một cách tường minh.

    Với React Mọi phương thức sẽ tự động được bind tới các component. React lưu vào cache các phương thức đã được bind, điều này làm giảm tải CPU vào tiết kiệm bộ nhớ.

* Event delegation

    Thực tế thì React không mang theo các event handler bên trong các node của chúng. Khi React được load nó sẽ lắng nghe tất các các event ở top level sử dụng event listener đơn. Khi một thành phần được đưa vào hay xóa khỏi DOM thì event của nó sẽ được thêm hoặc xóa tương ứng, hay nói cách khác thì các event và các sự kiện sẽ được map với nhau.
    
* Các thành phần cũng giống như State Machines
    * React coi các UIs như các state machines, bạn dễ dàng cập nhật được các trạng thái của các thành phần và render một UI mới dựa trên những trạng thái đó. React sẽ đảm nhiệm việc cập nhật những sự thay đổi vào trong DOM.
    * Cách mà State trong React làm việc: Có một cách thông thường để thông báo Data của React thay đổi bằng cách gọi hàm setState(data, callback), phương thức này sẽ merge data vào this.state và re-render lại component, sau khi đã render lại component, callback sẽ được gọi. Trong hầu hết các trường hợp thì bạn không cần gọi callback bởi vì React sẽ đảm nhận việc đó, và luôn đảm bảo UI của bạn được luôn luôn được cập nhật.
    * Hầu hết các thành phần đều lấy dữ liệu từ props, thế nhưng trong một số trường hợp bạn cần phải dùng state như cần phải response lại những gì mà user vừa input, một request lên server, hay những dữ liệu liên quan đến thời gian.

***Tóm lại:***
* Có thể dễ dàng truyền event handler giống như với HTML thông thường. React đảm bảo mọi event hoạt động giống như trên IE8 và
React biết cách bubble và capture các sự kiện thông qua spec, Các sự kiện sẽ được xử lý bởi event handler và được đảm bảo phù hợp với w3c spec. Nó chạy được trên tất các các trình duyệt khác nhau.
* Khi làm việc với js thông thường, khi tạo ra một callback bạn thường phải bind một phương thức tới một thành phần một cách tường minh.
* Với React Mọi phương thức sẽ tự động được bind tới các component. React lưu vào cache các phương thức đã được bind, điều này làm giảm tải CPU vào tiết kiệm bộ nhớ.

## 6. KẾT
***Tài liệu mình tham khảo chắp vá ở nhiều bài trên viblo và trang chủ của Reactjs nên nếu có chỗ nào sai sót mong mọi người góp ý và thông cảm (bow)***

Phần tiếp theo mình sẽ chia sẽ về các Objective sau:
* Event handling with React elements
* Conditional rendering
* Keys and rendering multiple components
* React form
* Composition vs Inheritance 
* Reacting with Flux
* Tạo các components để sử dụng lại