# 1. Giới thiệu
&nbsp;&nbsp;&nbsp;&nbsp;React context API  là một trong những forces chính đằng sau các packages hữu ích nhất trong hệ sinh thái React. Nó được sử dụng ở mọi nơi từ theo chủ đề , đến điều hướng , cho đến công cụ graphql . Và cũng quan trọng như vậy, bạn có thể đã nghe nói rằng React context API gần đây đã nhận được một bản cập nhật lớn.

&nbsp;&nbsp;&nbsp;&nbsp;Bắt đầu với React 16.3, context API liên quan đến việc sử dụng hai thành phần đặc biệt:  `<Provider>`và ` <Consumer> `. Và nếu một trong những cái tên này nghe có vẻ quen thuộc, thì đó là vì Redux cũng cung cấp một ` <Provider> ` component . Trên thực tế,  cả hai nhà cung cấp Redux và React đều làm điều tương tự . Vì vậy, theo một cách nào đó, context có thể thay thế Redux.

&nbsp;&nbsp;&nbsp;&nbsp;Nhưng đợi một lát.  Redux  `<Provider>` component  đã thực sự sử dụng context từ năm 2015, khi Redux được phát hành lần đầu tiên. Và điều này đặt ra câu hỏi:  nếu Redux đã và đang sử dụng context, làm thế nào context có thể thay thế Redux? React context APIReact context API.


&nbsp;&nbsp;&nbsp;&nbsp;Context API mới  đi kèm vs Reac 16.3 khá gọn gàng. Nó được xây dựng theo render props style theo xu hướng trong những tháng vừa qua , hãy khám phá nó :
```js
import React, { createContext } from 'react'

// khởi tạo 1 context
const Context = createContext()

// bối cảnh này chưa 2 component
const { Provider, Consumer } = Context

// Render Provider cung cấp 1 gía trị
<Provider value={{ firstName: 'Didier', lastName: 'Franc' }}>
  <App />
</Provider>
    
// Bây giờ bất cứ nơi nào trong <App /> bạn có thể sử dụng dữ liệu này
<Consumer>
  {({ firstName, lastName }) => <span>{`${firstName} ${lastName}`</span>}
</Consumer>
```
&nbsp;&nbsp;&nbsp;&nbsp;Nó khá đẹp phải không? Chúng ta hãy tiến xa hơn với việc thực hiện giống như flux
# 2. Implementation
Với ví dụ API **createContext()** ở trên, chúng tôi đã có **Store** → **View**
![](https://images.viblo.asia/c538c339-bfa9-43f5-acc4-2af5f6908ef5.png)

&nbsp;&nbsp;&nbsp;&nbsp;Những gì chúng ta cần là **action** và  **dispatchers** để tự đông cập nhật các store. Điều gì sẽ xảy ra nếu cửa hàng động của chúng ta chỉ là state của 1 React component gốc.

```js
import React, { Component }  from 'react'

class EnhancedProvider extends Component {
  state = {
    count: 0
  }

  render() {
    return (
      <Provider
        value={{
          state: this.state
          actions: {
            increment: () => this.setState({ count: this.state.count + 1 }),
          }
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}
```
Chúng ta vừa thông qua trạng thái và hành động như các giá trị của nhà cung cấp. Và bây giờ chúng ta có thể lấy nói với **<Consumer /> .**
```js
import React from 'react'

const Display = () => (
  <Consumer>
    {({ state, actions }) => (
      <Fragment>
        <span>{state.count}</span>
        <button onClick={actions.increment}>+</button>
      </Fragment>
    )}
  </Consumer>
)
```
Chúng ta đã tạo 1 thư viện để có mọi thứ chúng ta cần để sử dụng luồng dữ liệu này 1 cách dễ dàng trong khi vẫn giữ hiệu suất tuyệt vời.
# 3. react-waterfall
![](https://images.viblo.asia/7d4948d6-04b8-4073-8fc1-f2062deff1c2.png)

Chỉ cần **initStore** từ react-waterfall , đặt **initial state** của bạn và thực hiện một số actions: (**state**, …**arg**) → **stateChunk** 
Store  đã tạo cho bạn 1 số thứ hay ho như : 

* **Provider** và **Consumer** 

* **actions**

* **getState()**  để lấy state hiện tại

* **connect()** để map state và actions thành props của component

* **subscribe()** để đọc những state thay đổi 

# 4. So sánh với Redux
**Ưu điểm **

* Dễ thực hiện hơn

* Trọng lượng và hiệu suất

* Quay trở lại hành động clean hơn với  state chuck ( như trong setState)

**Nhược điểm**

* Nó chỉ hoạt động với React 16.3

# Tạm Kết
&nbsp;&nbsp;&nbsp;&nbsp; Qua bài viết này khiến cho chúng ta hiểu đôi chút và có hướng đi mới nếu bạn thích điều mới mẻ..@@
# Tài liệu tham khảo
https://medium.freecodecamp.org/replacing-redux-with-the-new-react-context-api-8f5d01a00e8c