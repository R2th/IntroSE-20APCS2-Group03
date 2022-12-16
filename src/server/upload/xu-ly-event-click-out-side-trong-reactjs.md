#### 1. Mở đầu
Trong bài viết này, mình xin trình bày phương pháp viết **function** xử lý sự kiện (**event**) **Click Outside** trong **Reactjs**. Trong ứng dụng **Web** chúng ta thường gặp **function** này trong các khối **UI** như **Tooltip**, **Modal** hay **Dropdown**, và thường được xử lý sẵn bởi các **Library** như **Bootstrap**, **Material-ui**,... 
#### 2. Ý tưởng  
Đầu tiên hãy ngừng nghĩ về điều này nhé, vì chẳng có event nào như thế này cả.
```js
class App extends React.Component {
    
    handleClickOutside = () => {
        console.log('you clicked outside components!')
    }
    
    render() {
        return (
            <div onClickOutSide={this.handleClickOutside}>
                Hello I am an div element
            </div>
        )
    }
}
```
Chúng ta sẽ lắng nghe sự kiện **"_Click_"**, tất nhiên rồi, và sau đó xác định xem vị trí **Click** đó có nằm trong **Component** hay không, nếu không thì đó là lúc **Event** **Click OutSide** đã xảy ra. Vấn đề là **Click OutSide** tức là có thể **Click** ở bất kỳ đâu trên trang **Web**, vậy có nên đặt sự kiện ở đây?
```js
<div id="app-main" onClick={.....}></div
```
Chắc chắn sẽ không được rồi nhỉ, vì trong ứng dụng còn biết bao **function** xử lý **event onClick** khác, nếu làm như trên thì việc chắc chắn ứng dụng của bạn sẽ không hoạt động đúng được nữa. Cách đơn giản khi gặp vấn đề dạng này là sử dụng **HTML DOM addEventListener()**
#### 3. Thực hiện
Đầu tiên hãy cho **document** biết nó cần lắng nghe **event click** và luôn ghi nhớ sử dụng **componentWillUnmount**  để đảm bảo việc này chỉ được thực hiện tại **component** cần xử lý, nếu không nó sẽ ảnh hưởng sang cả những **component** khác.
```js
class App extends React.Component {
  constructor(props) {
    super(props)
    this.wrapperRef = React.createRef()
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick)
  }
  
  componentWillUnmount() {
    // important
    document.removeEventListener('click', this.handleClick)
  }
  
  handleClick = () => {
  // do things here
  }
    
  render() {
     return (
      <div ref={this.wrapperRef}>
        Hello I am an div element
      </div>
     )
    }
}
```
Như đã nói ở phần trước, ta cần xác định xem **event click** có được thực hiện trong **component App** hay không, và **component App** được xác định bởi thẻ **div**, được định danh bằng cách sử dụng **Refs** trong **Reactjs**, ở đây mình sử dụng **React.createRef** để tạo một **ref** - **API** mới từ phiên bản **React 16.3** thay cho việc sử dụng **callback ref**, tham khảo thêm về **createRef** tại [đây](https://reactjs.org/docs/refs-and-the-dom.html).  
Bây giờ chỉ cần thêm phần **logic** xác định **Click Outside** nữa là xong nhé!
```js
 handleClick = (event) => {
   const { target } = event
   if (!this.wrapperRef.current.contains(target)) {
     alert('you clicked outside!')
   }
 }
```
Mình giải thích một xíu nhé, **this.wrapperRef.current** sẽ trỏ đến phần tử **div**, đây là phần hơi khác so với **callback - ref**, **target** là đối tượng vừa được **click** vào, phần còn lại dễ hiểu thôi phải không, đó là cách chúng ta xác định **event onClickOutSide** với **Reactjs**, tất nhiên, cách này có thể áp dụng với các thư viện khác nữa, chỉ  khác về cách thực hiện mà thôi.  
Trên đây mình đã giới thiệu phương pháp sử dụng lý **event onClickOutSide** trong **Reactjs**, hi vọng bài chia sẽ này sẽ hữu ích.