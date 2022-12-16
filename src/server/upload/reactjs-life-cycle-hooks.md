Có thể nói, khái niệm component trong ReactJS là một trong những thành phần quan trọng nhất của ReactJS. Do vậy, việc hiểu rõ vòng đời (LifeCycle Hook ) của component sẽ giúp cho bạn hiểu rõ hơn về ReactJS. Với những bạn mới dùng ReactJS thì ban đầu có thể gặp khó khăn hoặc lúng túng để hiểu và sử dụng LifeCycle Hooks.Vậy trong bài này mình hi vọng có thể giúp các bạn hiểu hơn về bản chất của các hàm LifeCycle này.
# Lifecycle Methods
## ComponentWillMount 
   Khi chúng ta gọi một Component thì hàm này sẽ được gọi trước khi hàm render được thực thi bên cả phía Server và phía Client. Quá trình này diễn ra hết sức nhanh chóng, vì vậy không nên làm quá nhiều điều tại đây. Lúc này chưa có DOM nào đã được xây dựng, nên cũng không thể thực thi các hàm xử lý, tính toán DOM lúc này.<br>
   Cú pháp:  <br>
   ``` 
   componentWillMount() {
      console.log('Component WILL MOUNT!')
   }
   ```
   ## componentDidMount
   Hàm này chỉ thực hiện 1 lần duy nhất.Thực hiện sau khi render lần đầu tiên bên phía client. Đây là thời điểm lý tưởng để gọi các AJAX trên cũng như các xử lý với DOM.Hàm này cũng dùng kết hợp với các Javascript Framework khác và bất kỳ hàm làm hoãn sự thực thi như SetTimeOut hoặc SetInterval. <br>
   Cú pháp: <br>
   ```
   componentDidMount() {
      console.log('Component DID MOUNT!')
   }
   ```
   
   ## componentWillReceiveProps
   Hàm này được thực thi liên tục ngay khi các Props có sự thay đổi và trước khi một  render khác được gọi. Thường sử dụng để thay đổi trạng thái (state) của component phụ thuộc props<br>
   Cú Pháp: <br>
   ```
   componentWillReceiveProps(newProps) {    
      console.log('Component WILL RECIEVE PROPS!')
   }
   ```
   ## shouldComponentUpdate
   Hàm này trẻ về kết quả `True` or `False`.Dùng để xác định Component có update hay không.Mặc định giá trị trả về là `True`.nếu bạn muốn Component không cần render sau khi `Props` hoặc `State` thay đổi thì bạn có thể set giá trị trả về là `False`.<br>
   Cú Pháp: <br>
   ```
   shouldComponentUpdate(newProps, newState) {
      return true;
   }
   ```
   ## componentWillUpdate
   Hàm này thực hiện phụ thuộc vào hàm `shouldComponentUpdate`.nếu hàm `shouldComponentUpdate` trả về `False` thì React sẽ không gọi hàm này.ngược lại nếu trả về `True` thì React sẽ  gọi đén hàm này.Và hàm này sẽ được thực thi trước khi hàm render() được thực thi.<br>
   Cú pháp: <br>
   ```
   componentWillUpdate(nextProps, nextState) {
      console.log('Component WILL UPDATE!');
   }
   ```
   ## componentDidUpdate 
   Hàm này thực hiện sau khi component được render lại, từ kết quả của componentWillUpdate<br>
   Cú pháp: <br>
   componentDidUpdate(prevProps, prevState) {
      console.log('Component DID UPDATE!')
   }
   
   ## componentWillUnmount 
   Hàm này được gọi sau khi component unmounted từ DOM<br>
   Cú Pháp: <br>
   ```
   componentWillUnmount() {
      console.log('Component WILL UNMOUNT!')
   }
   ```
   # Example:
   ```
   import React, { Component } from 'react';

class App extends React.Component {
  constructor(props) {
     super(props);

     this.state = {
        data: 0
     }
     this.setNewNumber = this.setNewNumber.bind(this)
  };
  setNewNumber() {
     this.setState({data: this.state.data + 1})
  }
  render() {
     return (
        <div>
           <button onClick = {this.setNewNumber}>INCREMENT</button>
           <Content myNumber = {this.state.data}></Content>
        </div>
     );
  }
}
class Content extends React.Component {
  componentWillMount() {
     console.log('Component WILL MOUNT!')
  }
  componentDidMount() {
     console.log('Component DID MOUNT!')
  }
  componentWillReceiveProps(newProps) {
     console.log('Component WILL RECIEVE PROPS!')
  }
  shouldComponentUpdate(newProps, newState) {
     return true;
  }
  componentWillUpdate(nextProps, nextState) {
     console.log('Component WILL UPDATE!');
  }
  componentDidUpdate(prevProps, prevState) {
     console.log('Component DID UPDATE!')
  }
  componentWillUnmount() {
     console.log('Component WILL UNMOUNT!')
  }
  render() {
     return (
        <div>
           <h3>{this.props.myNumber}</h3>
        </div>
     );
  }
}
export default App;

   ```
   <br>
   Cảm ơn các bạn đã theo bài viết.Hi vọng sau khi đọc xong bài viết này các bạn có thể hiểu rõ hơn về LifeCycle Hooks trong ReactJS.để đạt được kết quả cao nhất các bạn cố gắng làm nhiều ví dụ để có thể trực quan hơn nhé.
   
   # Tham khảo
https://www.tutorialspoint.com/reactjs/reactjs_component_life_cycle.htm
<br>
https://fullstackstation.com/vong-doi-cua-component-trong-react/
<br>
https://engineering.musefind.com/react-lifecycle-methods-how-and-when-to-use-them-2111a1b692b1