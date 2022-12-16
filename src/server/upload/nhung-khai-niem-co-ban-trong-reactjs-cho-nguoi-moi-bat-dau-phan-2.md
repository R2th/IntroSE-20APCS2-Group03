Xin chào tất cả mọi người! Trong bài viết trước, mình đã giới thiệu với các bạn về những khái niệm cơ bản nhất trong ReactJS như là: Component, JSX, Props, State. Các bạn có thể xem lại bài viết [tại đây](https://viblo.asia/p/nhung-khai-niem-co-ban-trong-reactjs-cho-nguoi-moi-bat-dau-WAyK8pDpKxX). Và để tiếp nối chủ đề này thì hôm nay mình sẽ giới thiệu những khái niệm quan trọng không kém khác trong ReactJS :)
<br/>
## **Handling Events** <br/>
Handling Events dùng để xử lý sử kiện trong React, nó cũng tương tự như handling event trên DOM Element, tuy nhiên có 1 số điểm khác nhau về cách sử dụng. Để mọi người dễ hình dung thì chúng ta cùng nhau xem qua 1 ví dụ sau:<br/>

```js
import React, { Component } from 'react';

export default class App extends Component {
  handleAlertText() {
    alert('Hello World');
  }
  render() {
    return(
      <button onClick={this.handleAlertText}>Click me</button>
    )
  }
}
```

Ở ví dụ trên khi ta nhấn vào button `Click me` thì sẽ hiện ra thông báo *'Hello World'*, ở đây có 1 sự kiện là `handleAlertText` và ta đã gán nó vào button thông qua onClick. Khác với DOM Element là truyền vào onClick 1 string thì ở React ta truyền vào 1 JSX. Đó chính là 1 điểm khác biệt cơ bản giữa handling event trong React với DOM Element. Ngoài ra thì có 1 điểm mà mọi người cũng cần phải chú ý đó là quy tắc đặt tên các sự kiện trong React phải tuân thủ theo kiểu **camelCase** không được đặt theo dạng **lowercase** 
<br/><br/>
Về vấn đề sử dụng `this` trong handling event thì khi ta sử dụng `this` trong handle event thì mặc định React sẽ không hiểu `this` đấy là gì và sẽ báo lỗi Undefined. Để có thể sử dụng `this` thì ta có 2 cách: <br/>
* Cách 1: Gán context cho `this` bằng hàm `constructor`:<br/>

```js
import React, {Component} from 'react';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      content: "Hello World"
    }
    this.handleAlertText = this.handleAlertText.bind(this)   // gán context cho this
  }
  handleAlertText() {
    alert(this.state.content);
  }
  render() {
    <button onClick={this.handleAlertText}>Click me</button>
   }
}
```

* Cách 2: Sử dụng Arrow function:<br/>

```js
...
handleAlertText = () => {
  this.setState({content: "Hello World123"});
  alert(this.state.content);
}
...
```
## **Conditional Rendering** <br/>
**Conditional Rendering** hoạt động tương tự với Conditional trong Javascript. Trong React thường sử dụng javascript operator như là `if..else` để tạo các phần tử đại diện cho trạng thái hiện tại. Tức là với mỗi trạng thái khác nhau thì react sẽ tự động render ra cho chúng ta những Component tương ứng. Lấy ví dụ: <br/>
```js
import React, { Component } from 'react';

class App extends Component {
  render(){
    if (this.props.show) {
      return(<p>Hello World</p>)
    }
    return(<p>This content was hidden</p>)
  }
}
export default App;
```

Đầu tiên, ta sẽ tạo ra 1 Component App, nhiệm vụ của nó là render ra 1 thẻ `p` có nội dung tùy thuộc vào điều kiện `this.props.show` trả về là `true` hay `false`.<br/>

```js
ReactDOM.render(<App show={false} />, document.getElementById('root'));
```

Sau đó, ta sẽ truyền thuộc tính `show` có giá trị là `true` hoặc `false` thông qua việc gọi Component App. Ở trường hợp trên, `show` có giá trị là `false` nên màn hình sẽ hiển thị kết quả là *"The content was hidden"* <br/><br/>
Ngoài ra, trong React còn có thể dùng các biến để lưu trữ Component. Điều này giúp ta render một phần của Component trong khi những phần còn lại không hề thay đổi. Ví dụ:<br/>

```js
import React, { Component } from 'react';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
       show: false,
    }
  }

  handleToggle = () => {
    this.setState({ 
      show: !this.state.show 
    })
  }

  render() {
    const contentElm = this.state.show 
      ? <p>Hello World</p>
      : <p>Content hidden</p>

    return(
      <div>
        <button onClick={this.handleToggle}>Show/Hide</button>
          {contentElm}
      </div>
    )
  }
}
```

Ở đây mình có sử dụng cú pháp Ternary operation (toán tử 3 ngôi) thay thế cho `if...else` để conditional rendering trở nên ngắn gọn và đơn giản hơn.
## **Lists and Keys**<br/>
Trong React, List và Key được dùng để render nhiều Component khác nhau. Key là 1 thuộc tính giúp React xác định item nào được thêm mới, thay đổi hay gỡ bỏ khi chúng ta render nhiều item cùng 1 lúc.<br/><br/>
Giá trị của Key phải là duy nhất để phân biệt 1 item với các item khác. Đối với những trường hợp giá trị của item không đổi trong mỗi lần render thì ta gắn `index` của item để làm Key, tuy nhiên thường thì giá trị của item là thay đổi liên tục cho nên cách tốt nhất là ta lấy id của data để làm Key.<br/><br/>
1 ví dụ về trường hợp data thay đổi và gắn `index` làm key: <br/>

```js
import React, { Component } from 'react';
function Row(props) {
   return <div>{props.value}</div>;
}
class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         arr: [3,2,1],
         lastAddedItem: 3,
      }
      this.handleClick = this.handleClick.bind(this);
   }
   handleClick() {
      let item = this.state.lastAddedItem + 1;
      this.setState({
         arr: [item].concat(this.state.arr),
         lastAddedItem: item,
      })
   }

   render() {
      return (
         <div>
            <div>{this.state.arr.map((value, index) => <Row value={value} key={index} />)}</div>
            <button onClick={this.handleClick}>Click</button>
         </div>
      );
   }
}
```
* Trong lần render đầu tiên React sẽ render ra 1 list Component như sau: <br/>
![](https://images.viblo.asia/1dde8550-6eea-4ffb-8a57-dd2422818050.png) <br/>
* Sau khi click vào button `Click`: <br/>
![](https://images.viblo.asia/1820c335-8c4a-4876-be40-d69c8b0c679e.png) <br/>

Khi click vào button `Click` thì React sẽ so sánh key hiện tại với key của các Row trước, nó nhận thấy key của các Row trước là không đổi nhưng giá trị value thì lại thay đổi, vì vậy nó sẽ phải update value của các Row đã render, còn Row với `key="3"` chưa có nên nó sẽ khởi tạo mới.<br/><br/>
Ta cùng xem xét trường hợp khi thay đổi key bằng `value`:<br/>

```js
<div>{this.state.arr.map(value => <Row value={value} key={value} />)}</div>
```
![](https://images.viblo.asia/ffdee15a-3acb-41e8-9df0-1bf8864a4bcf.png) <br/>
![](https://images.viblo.asia/0a88ce99-b5af-4e42-ad90-7d543a48fe8f.png) <br/>
Như mọi người thấy, sau khi click button `Click` thì React nó sẽ nhận ra rằng các key của các Row đã render lần trước có các value không đổi vì vậy nó sẽ giữ nguyên và chỉ render ra Row có `key={4}`. <br/><br/>
Rõ ràng, ở ví dụ trên trong trường hợp gắn value làm key thì performance đã được cải thiện đáng kể phải không nào :D  Thực tế, sau này khi tham gia 1 dự án thật thì chắc chắn mọi người sẽ phải làm quen với ESLint - 1 công cụ giúp coding convention của chúng ta trở nên tối ưu nhất, trong ESLint có 1 rule đó là `no-array-index-key`, và lúc này chắc chắn các bạn sẽ phải thay thế key cũ là `index` bằng 1 key mới nào đó nếu như không muốn code của mình bị báo lỗi ESLint đỏ lòm =))

## **Kết luận** <br/>
Hy vọng sau bài viết này mọi người đã có thể điều khiển được việc render trong React theo ý muốn, từ đó có thể tự mình xây dựng những app đơn giản. Các bạn có thể tham khảo thêm tại [đây](https://reactjs.org/docs/)