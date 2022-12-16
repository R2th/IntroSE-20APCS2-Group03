React là một thư viện JavaScript được tạo bởi Facebook. Xử lý dữ liệu trong React có thể hơi phức tạp, nhưng không phức tạp như vẻ ngoài của nó. Tôi hiện đã biên soạn ba phương thức Xử lý dữ liệu trong React: 
1. From Parent to Child using Props
2. From Child to Parent using Callbacks
3. Between Siblings :
    i. Combine above two methods
    ii. Using Redux
    iii. Using React’s Context API
Blog này chủ yếu chứa một bản tổng hợp về việc thực hiện các khái niệm này, điều này chắc chắn sẽ có ích cho bất kỳ người mới bắt đầu cố gắng nắm bắt mọi thứ trong nháy mắt.
**From Parent to Child Using Props **

Hãy xem xét cấu trúc thư mục của chúng Parent Component renders child components in the Application.<br/>
App<br/>
└── Parent<br/>
    ├── Child1<br/>
    └── Child2
<br/>
Đây là hướng dễ dàng nhất của luồng dữ liệu trong React và là hướng cơ bản nhất.
```
class Parent extends React.Component {
state = { data : "Hello World" } 
render() {
        
        return (
            <div>
                 <Child1/>            //no data to send             
                 <Child2 dataFromParent = {this.state.data} />
            </div>
        );
    }
}
//It is no compulsion to use the data to send as a state, simple vars or const variables could also be used to send data from Parent to Child.
```
Đơn giản, sử dụng this.props.dataFromParent (chỉ là một biến được sử dụng để gửi props) truy cập dữ liệu được gửi từ Parent to Child.

**From Child to Parent Using Callbacks** <br/>
Chúng ta hãy giả sử rằng tôi cần gửi một tin nhắn từ Child1 to Parent — “Hey Popsie, How’s it going?”. Để làm điều đó, tôi cần phải làm theo một loạt các bước.<br/>
***Step 1***: Xác định hàm gọi lại có tham số mà chúng tôi xem là đã truy cập từ child in the Parent.js<br/>
***Step 2***: Đồng thời, gửi chức năng gọi lại được xác định làm props to the Child1.js
```
class Parent extends React.Component {
state = { message: "" }
callbackFunction = (childData) => {
      this.setState({message: childData})
},
render() {
        return (
            <div>
                 <Child1 parentCallback = {this.callbackFunction}/>
                 <p> {this.state.message} </p>
            </div>
        );
}
}
```
***Step 3***: Trong Child1.js gửi dữ liệu bằng this.props.callback(dataToParent)
```
class Child1 extends React.Component{
sendData = () => {
         this.props.parentCallback("Hey Popsie, How’s it going?");
    },
render() { 
//you can call function sendData whenever you'd like to send data from child component to Parent component.
    }
};
```
**Between Siblings**<br/>
Khi tôi mới bắt đầu, tôi đã mất một thời gian khó khăn để quyết định chọn phương pháp nào để chia sẻ dữ liệu giữa siblings, có ba phương pháp mà tôi chưa biết để chia sẻ dữ liệu giữa siblings và tất cả đều có đặc quyền và khuyết điểm riêng.<br/>
**Method 1**: Kết hợp hai phương pháp chia sẻ dữ liệu trên.<br/>
Tuy nhiên, phương thức này sẽ không hoạt động đối với các cấu trúc thư mục phức tạp vì người ta sẽ phải viết các đoạn mã lớn để gửi dữ liệu giữa các thành phần ở mức độ xa nhau. Dữ liệu, sau đó sẽ phải được đẩy và kéo qua từng cấp trung gian.
![](https://images.viblo.asia/628eecd3-2ab5-47ac-a62f-e3a9b43d8787.gif)
<br/>
**Method 2**: Sử dụng một cửa hàng toàn cầu duy trì trạng thái của tất cả các thành phần con cần thiết để tương tác và tiêu thụ dữ liệu cần thiết từ store - **Redux**
<br/>
![](https://images.viblo.asia/c1f5b6fd-4c27-4647-8500-0930c40d1780.gif)
<br/>
**Method 3**: Use React’s Context API<br/>
Có rất nhiều bài viết và blog đã đề cập đến lý do tại sao React nâng cấp lên API ngữ cảnh và cái nào tốt hơn về mặt nào, hai bài viết này sẽ giúp người ta hiểu tất cả:<br/>
[React Context API — A Replacement for Redux?](https://blog.bitsrc.io/react-context-api-a-replacement-for-redux-6e20790492b3)<br/>
[You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)<br/>
Tôi đã sử dụng phương pháp này và đã có một chút thiên hướng về việc sử dụng phương pháp này so với Redux.
> The major advantage of Context API is that it saves the developer from Prop-Drilling.( Prop-drilling  
> refers to the technique of passing down variables to sub components.
> The main idea is functional programming where you pass the parameters to the next function and so on)
> 
![](https://images.viblo.asia/df8d93cf-b39c-4799-be79-fe3bc4d7f02d.png)
Hãy xem xét cấu trúc thư mục và chúng ta cần truyền dữ liệu giữa Child1 và Child2. [Child1 phải gửi tin nhắn - Em trai SSup ?? Nghiêng đến Child2] Chúng tôi thực hiện điều này theo phương pháp sau bằng API bối cảnh:<br/>
App<br/>
├── Child1<br/>
└── Child2<br/>
**Step1**: *Create a Provider Component for the two children.*<br/>
This Provider mantains the state (data to be used by both components and some callback used to manipulate the states) and returns a contextObject.Provider JSX component )<br/>
**Step 2**: *Pass the state and the callback function as props to all children inside the Provider Component.*
```
export const MContext = React.createContext();  //exporting context object
class MyProvider extends Component {
state = {message: ""}
render() {
        return (
            <MContext.Provider value={
            {   state: this.state,
                setMessage: (value) => this.setState({
                            message: value })}}>
            {this.props.children}   //this indicates that the global store is accessible to all the child tags with MyProvider as Parent
            </MContext.Provider>)
    }
}
```
> The provider is the boss for its children (the global store of all the states and 
> callback functions to manipulate those states). Who-ever needs anything has 
> to contact the provider first to access the objects.
> 

<br/>
(a) Để đặt hoặc thao tác tin nhắn bằng Child1, nó phải truy cập Provider và đặt trạng thái của Provider. <br/>
(b) Để xem / truy cập dữ liệu bằng Child2, nó phải truy cập Provider để lấy các trạng thái.

```
class App extends React.Component {
render() {
        return (
            <div>
                 <MyProvider>
                      <div className="App">
                      <Child1/>
                      <Child2/>
                      </div>
               </MyProvider>
            </div>
        );
}
}
```


**Step 4**: *Implement the desired result in the same manner, but this time, using ContextObject.Consumer as explained below:*<br/>
Both the children — Child1 and Child2 are the consumers of the Provider. Henceforth, they access the Provider within Consumer Tags.<br/>
```
import MContext
class Child1 extends React.Component {
render() {
    return (
        <div>
        <Mcontext.Consumer>
        {(context) => (
       <button onClick={()=>{context.setMessage("New Arrival")}}>Send</button>
       )}
        </Mcontext.Consumer>
        </div>
    ) }
}
```

Làm thế nào để Child2 nhận được dữ liệu bây giờ? Simply, accessing the Provider withing Consumer tags.

```
import MContext
class Child2 extends React.Component {
render() {
       return (
         <div>
            <Mcontext.Consumer>
             {(context) => (
              <p>{context.state.message}}</p>)}
            </Mcontext.Consumer>
         </div>
   )}
}
```

Tôi hy vọng điều này cung cấp chi tiết triển khai rõ ràng cho Truyền dữ liệu giữa các thành phần khác nhau trong React. Đề xuất:<br/>
[Using Context in React](https://medium.com/@wisecobbler/using-context-in-react-56a8e7da5431)