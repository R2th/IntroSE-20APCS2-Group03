# 1 . Hooks là gì
Trong phiên bản 16.8 React đã giới thiệu đến người dùng một khái niệm mới "Hooks" với mục tiêu hướng tương lai đến cách viết **functional component**. Hooks cho phép bạn sử dụng state trong **functional component** mà không phải dùng **class component** như trước đây. Sau một thời gian dài áp dụng Hooks thì giờ đây Hooks gần như có thể thay thế được hoàn toàn **class component**. Trong bài viết này mình sẽ chủ yếu nói về cách code để các bạn mới chuyển từ cách viết **class component** có thể dễ dàng áp dụng ngay Hooks trong project của các bạn.
# 2. useState - khởi tạo một và nhiều state
Hàm useState giúp chúng ta khai báo và cập nhật state, nó trả về 1 cặp: giá trị state hiện tại và phương thức để cập nhật state đó. Ví dụ: 
```javascript
import React, { useState, useEffect } from "react";
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  // ...

  const handleChangeAge = () => {
      setAge(age+1);
  }

  return(
      <div>
          <button onClick={handleChangeAge}></button>
      </div>
  )

}
```
2 hàm **setAge** và **setFruit** có tác dụng như khi dùng **this.setState()** trong class component, chúng giúp chúng ta update giá trị của state khi cần.Ví dụ trên khi viết trong cách viết class component sẽ là:

```javascript
import React from "react";
class ExampleWithManyStates extends React.Component {
    constructor(props){
        super(props);
          this.state = {
            age : 42,
            fruit: 'banana'
        }
    }

    handleChangeAge=()=>{
        this.setState({
               age: this.state.age + 1;
        })
    }

    render(){
        return(
            <div>
                <button onClick = {this.handleChangeAge()}></button>
            </div>
        )
    }

}
```

**Khai báo nhiều state trong một function component**
Khi khai báo state với cách viết function trên chỉ phù hợp khi component của bạn chỉ có một hoặc hai state, tưởng tượng khi nó có 100 state thì sao? Ok Hooks cũng đã có giải pháp cho nó để biến nó vừa ngắn vừa rất giống với cách khai báo state trong class component.
```javascript
import React, { useState, useEffect} from "react";
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [state, setState] = useState({
      age: 42,
      fruit:'banana'
  });

  const handleChangeAge = () => {
      setState({
          age: state.age +1,
          fruit: "apple"
      });
  }

  return(
      <div>
          <p onClick={handleChangeAge}></p>
      </div>
  )

}
```

Ở trên tôi dùng hàm setState() dùng chung cho cả việc cập nhật age và fruit
**Đây chính là cách khai báo state bạn nên dùng, nếu có 10 state thôi với mỗi state chúng ta dùng cách khai báo state và hàm set tương ứng thì component của chúng ta sẽ trở thành một đống hổ lốn và chả ai muốn đọc nữa(chưa nói đến cả trăm :(((, mình chưa gặp cái component 100 state bao giờ :))  )** 

# 3 . use Effect() - sự thay thế cho lifecycle methods 
Các lifecycle methods hay dùng nhiều trước đây như: componentDidMount(), componentDidUpdate(), componentWillUnmount,.. giờ được gói gọn trong một function duy nhất đó là useEffect(). Dưới đây là cách viết các lifecycle tương đương khi ta sử dụng useEffect()

1. ComponentDidMount() 
    ```
    useEffect(() => {
      // Your code here
    }, []);
    ```
    Hàm này có tác dụng như componentDidMount(), được gọi một lần khi component được mounted, chúng ta hãy chú ý tham số thứ 2 "[ ]" là một array rỗng. Điều này khiến code bên trong hàm useEffect() chỉ chạy đúng một lần.

2. ComponentDidUpdate()
    ```
    useEffect(() => {
      // Your code here
    });
    ```
    Nếu không có tham số thứ 2 ([]) code trong hàm useEffect() sẽ chạy mỗi khi component được render. Điều này làm nó giống với hàm componentDidUpdate.

3. ComponentWillUnMount()
```javascript

  useEffect(() => {
  window.addEventListener('mousemove', () => {});

  // returned function will be called on component unmount 
  return () => {
    window.removeEventListener('mousemove', () => {})
  }
}, [])
```
Khi chúng ta return về 1 function trong hàm useEffect() thì hàm được return sẽ có tác dụng giống như componentWillMount, vì vậy window.removeEventListener('mousemove', () => {}) sẽ được chạy khi component unmount.
# 4. Callback sau khi setState
Với nhiều người đã từng làm các project React với class component thì chắc chắn không thể không biết việc dùng **callback function** ngay sau khi gọi hàm **this.setState({})** (lí do chính ở đây là hàm setState của React là hàm bất đồng bộ) nó giúp ta giải quyết được vấn đề gọi các api liên tiếp có thứ tự với ràng buộc thằng sau sử dụng cái gì đó được trả về từ thằng trước. Trường hợp này thường gặp trong bài toán quan hệ **n-n** trong sql khiến ta phải sinh thêm một bảng phụ. Ví dụ Room và BookRoom có quan hệ n-n thì ta sinh ra 1 bảng BookRoomDetail để lưu trữ thông tin của từng phiên đặt phòng (BookRoom).

Ví dụ khi tôi tạo mới một đặt phòng  : 
```javascript
    ///....................
        callCreateBookRoomAPI.then(res=>{
            this.setState({
                bookroomID: res.data// == id nhận được khi gọi api create bookRoom
            }, () => {
                callCreateBookRoomDetailAPI(this.state.bookroomID).then(res1 => {
                    // Tạo bookRoomDetail từ id nhận được sau khi gọi api create bookRoom
                     // code here
                }).catch(e => {

                });
            });
        }).catch(e => {
               /// e
        })
```
Tôi đã dùng bookRoomID được trả về từ câu gọi API đầu tiên **callCreateBookRoomAPI** để truyền vào làm tham số của câu gọi API thứ 2 **callCreateBookRoomDetailAPI**

Để làm được điều này trong Hooks thì chúng ta lại dùng đến hàm **useEffect() vi diệu**  : 

```javascript
 useEffect(() => {
    callCreateBookRoomDetailAPI(state.bookRoomID);
  }, [state.bookRoomID]);
```

Giải thích : Khi ta truyền một giá trị vào trong [] ở hàm useEffect() thì mỗi khi giá trị đó thay đổi thì hàm useEffect() sẽ chạy một lần giúp bạn có thể bắt được bookRoomID hiện tại và gọi **callCreateBookRoomDetailAPI** , bạn nên dùng ...state để giữ lại những state không muốn thay đổi và cập nhật lại bookRoomID. 

# 5. useRef
Một điều đáng lưu ý nữa là useRef. **Ref** giúp tiếp cận DOM nodes hoặc React elements được tạo trong hàm render
Một vài tác dụng của **ref** bạn có thể lên trang chủ của Reactjs https://reactjs.org/docs/refs-and-the-dom.html để tìm hiểu thêm
```
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}

```
Chúng ta sử dụng useRef() để khởi tạo và sử dụng thuộc tính **current** khi muốn gọi ref 

# 6. Kết luận
Mong rằng các kiến thức mình chia sẻ trong bài viết này sẽ giúp ích được mọi người khi mới tiếp cận React Hooks và muốn tìm hiểu nhanh những điều tương tự giữa kiểu viết class cũ và hooks. Nếu muốn tìm hiểu nhiều hơn nữa bạn có thể lên docs https://reactjs.org/docs để tìm hiểu thêm. Cảm ơn các bạn đã đọc bài viết của mình, chúc các bạn thành công!