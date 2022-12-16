# Mở đầu
React là một thư viện Javascript được duy trì bởi Facebook. Nó rất phổ biến và cũng khá phức tạp trong khâu xử lí data. Bài viết này sẽ tóm lược lại 3 cách xử lí data trong React:
* Truyền data từ cha sang con sử dụng props
* Truyền data từ con sang cha sử dụng callbacks
* Truyền data giữa các con. Nó có thể được thực hiện qua các phương pháp:

1. Sử dụng đồng thời các phương pháp ở trên.
2. Sử dụng Redux.
3. Sử dụng Context API của React.

# Từ cha sang con sử dụng props
Hãy thử hình dung cấu trúc thư mục của app như sau: component cha render component con trong app.
```
App
 └── Parent
   ├── Child1
   └── Child2
```
Đây là dataflow cơ bản nhất trong React
```js
class Parent extends React.Component {state = { data : "Hello World" } 
render() {
        
        return (
            <div>
                 <Child1/>            //no data to send             
                 <Child2 dataFromParent = {this.state.data} />
            </div>
        );    }
}
```
Dùng biến this.props.dataFromParent để lấy data được truyền từ cha sang con.
```js
class Child2 extends React.Component {
 render() {
         
         return (
             <div>
                 Data from parent is:{this.props.dataFromParent}
             </div>
         );
     }
 }
```
# Từ con sang cha sử dụng callbacks
Say you want to send a message from child1 to parent withthe message "Hello, how are you?" Take the following steps:

In the Parent.js, set a callback function to take in the parameter that you have accessed from the child.
Send the callback function to the child1.js as a prop.

Ví dụ bạn muốn gửi một message từ component child1 tới component parent với message "Hello, how are you?". Hãy thử các bước sau:

1. Trong Parent.js, tạo một hàm callback để nhận tham số lấy từ child1.
2. Gửi hàm callback tới child1.js như là một prop.
```js
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
3. Truyền data sử dụng this.props.callback(dataToParent) trong child1.js.
```js
class Child1 extends React.Component{sendData = () => {
         this.props.parentCallback("Hey Popsie, How’s it going?");
    },

render() { 
//Any time you wish to send data from child to parent component, call the sendData function.
    }
}
```

# Giữa các con

Chọn một phương pháp để chia sẻ data giữa các con có thể khá khó khăn cho người mới vào nghề. Bài viết này sẽ tóm lược lại 3 phương pháp.

1. Sử dụng các phương pháp đã được nêu ra ở các mục trên.
Mặc dù là phương phép đơn giản nhất, nhưng nó lại không phù hợp với các cấu trúc component phức tạp. Bạn có thể sẽ cần phải code rất nhiều chỉ để gửi data giữa các component chỉ cách nhau vài level. Data của bạn sẽ được truyền đi truyền lại giữa mỗi bước trung gian.

2. Sử dụng Redux bằng cách giữ nguyên các state của các con mà bạn cần ở cấp độ toàn cục và lấy dữ liệu từ cục bộ.
3. Sử dụng Context API của React

Gần đây, nhiều lập trình viên hay lựa chọn cách này thay vì Redux vì nó giúp họ tránh được prop-drilling. Prop-drilling là một tên gọi cho quá trình truyền các biến xuống các component phụ.

Hãy xem thử một ví dụ sau khi mà bạn cần truyền data qua lại giữa Child1 và Child2. Trong ví dụ này, hãy giả sử rằng bạn cần truyền "How are you?" từ Child 1 sang Child2.

```
App
├── Child1
└── Child2
```

Việc này có thể được thực hiện sử dụng Context API như sau:

**1. Tạo một component trung gian giữa 2 component con.**

Nhiệm vụ chính của component này là:
* Duy trì state, bao gồm data mà cả 2 component sẽ sử dụng cùng với một callback để kiểm soát nó.
* Trả về một contextObject.Provider JSX component.


**2. Trong component trung gian, truyền state và callback sử dụng ở trên như props tới tất cả các con.**

```js
export const MContext = React.createContext();  //exporting context object
class MyProvider extends Component {
state = {message: ""}
render() {
        return (
            <MContext.Provider value={
            {   state: this.state,
                setMessage: (value) => this.setState({
                            message: value })}}>
            {this.props.children}   //this indicates that all the child tags with MyProvider as Parent can access the global store.
            </MContext.Provider>)
    }
}
```

Bạn có thể nghĩ rằng component trung gian là thứ kiểm soát các component con. Điều này bao gồm việc biến lưu trữ toàn cục của tất cả các state cũng như callback có nhiệm vụ duy trì các state đó. Bất kì component nào cần thứ gì đều phải liên hệ với component trung gian để truy cập được các object.

Hay nói cách khác:
* Để Child1 có thể tạo hoặc sửa message, nó cần liên hệ với component trung gian và đặt state của nó.
* Để Child2 lấy data, nó cần truy cập vào component trung gian và lấy state.

**3. Đặt component trung gian như cha của 2 component con, Child1 và Child2.**

```js
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

**4. Làm tương tự, sử dụng ContextObject.Consumer như sau:**

Child1 và Child2 đều có thể truy cập component trung gian.
```js
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
Bây giờ Child2 có thể nhận data bằng các truy cập vào component trung gian.

```js
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

# Kết luận
Bài viết này tóm lược lại các cách để truyền data giữa các component trong React theo 3 cách: cha sang con, con sang cha và giữa các con. Nó cũng nêu ra 3 cách phổ biến để truyền data giữa các con. Bạn hãy thử sử dụng chúng xem và hãy lựa chọn cách phù hợp nhất với bản thân nhé.

Nguồn: https://www.pluralsight.com/guides/how-to-pass-data-between-react-components