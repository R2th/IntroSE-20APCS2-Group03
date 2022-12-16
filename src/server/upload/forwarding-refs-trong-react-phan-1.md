![](https://images.viblo.asia/7e1b6122-0b4f-4c10-bf76-ceed9f131870.jpg)

## 1. forwardRef là gì?

forwardRef là một method cho phép các components cha truyền các refs (tham chiếu) xuống các component con của chúng. forwardRef đưa cho component con một tham chiếu đến một phần tử DOM được tạo bởi cha của nó và điều này cho phép chúng có thể đọc và sửa đổi phần tử đó ở bất cứ đâu mà nó đang được sử dụng.

## 2. Cú pháp cơ bản
```js
React.forwardRef((props, ref) => {})
```
`forwardRef` là một hàm với các tham số là props và ref. Kết quả trả về là một JSX element.

## 3. Hoạt động

Trong React, các components cha thường sử dụng các props để truyền dữ liệu xuống cho con của chúng. Để thay đổi behavior của một component con, chúng ta phải render lại chúng bằng một tập các props mới. Do vậy, cần một cách để thay đổi hành vi của một thằng con mà không cần phải tìm state hoặc re-render lại component đó.

`refs` có thể giúp chúng ra làm điều này. Với `refs`, chúng ta có thể truy cập một node DOM được đại diện bởi một component bằng cách sử dụng `refs`. Do đó, sẽ thực hiện các thay đổi lên thằng con mà không ảnh hưởng đến state hay re-render lại nó.

Khi một components con cần tham chiếu đến node hiện tại của nó, thì components cha phải có cách để con nhận được ref của nó. Kỹ thuật này được gọi là forwarding refs.

## 4. Khi nào nên sử dụng `refs?`

### focus, text selection, media playback

Giả sử bạn có một component input **A** và trong một số chỗ của ứng dụng, bạn muốn con trỏ sẽ focus vào nó khi người dùng click vào button. 
Sẽ tốt hơn nếu chỉ sửa đổi instance cụ thể đó của **A** mà không thay đổi state (qua refs), thay vì thay đổi state (qua props) sẽ khiến A re-render mọi lúc. 

Tương tự, chúng ta cũng có thể sử dụng refs để kiểm soát state của trình phát nhạc hoặc video (tạm dừng, phát, dừng) mà không re-render bất cứ lúc nào chúng ta click vào button tương ứng.

### Tăng giá trị cho một phần tử

Hẳn mọi người cũng rất quen thuộc với "clap" button ở trang `Medium`. Chúng ta có thể sử dụng state để lưu giá trị đếm được tăng lên mỗi khi người dùng click vào hình bàn tay. 

Tuy nhiên, điều này không hiệu quả lắm. Mỗi khi người dùng click, clap sẽ re-render và nếu chúng ta đang gửi một network request để lưu giá trị trong server, nó sẽ được gửi nhiều lần khi click clap. Với refs, chúng tôi có thể set target là node cụ thể đó và tăng nó lên mỗi khi người dùng click mà không re-render lại và tất nhiên, chúng ta có thể gửi một request đến server với chỉ một giá trị cuối cùng.

Bằng cách này, có thể tăng hiệu suất ứng dụng vì chúng ta đã ngăn được re-render xảy ra nhiều lần, mặc dù nó chỉ nên được sử dụng trong những trường hợp cụ thể.

Ví dụ
```js
import React from 'react'
  
class App extends React.Component {
  constructor(props) {
    super(props)
    this.aRef = React.createRef()
  }
  render() {
    return (
      <>
        <Counter ref={this.aRef} />
        <button onClick={() => { console.log(this.aRef) }}>
          Ref
        </button>
      </>
    )
  }
}
  
const Counter = React.forwardRef((props, ref) => {
  class Counter extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        count: 0
      }
    }
    render() {
      return (
        <div>
          Count: {this.state.count}
          <button ref={ref} onClick={() => this.setState(
            { count: this.state.count + 1 })}>
            Increment
          </button>
        </div>
      )
    }
  }
  return <Counter />
})
  
export default App

```
Vì counter nằm trong hàm, nó có thể truy cập vào các tham số props và ref bằng cách sử dụng closure. `counter` sẽ được render và return. ref được chuyển đến component counter được set thành giá trị của thuộc tính ref của button. Bây giờ, thuộc tính ref của counter sẽ được set để tham chiếu đến button.

Component `Counter` được hiển thị bởi component `App`. Nó bắt đầu bằng cách tạo một ref `this.aRef` được gán cho thuộc tính ref của `Counter` dưới dạng một giá trị. 

`this.aRef` sẽ giữ `HTMLButtonElement` của button `Increment` trong Component Counter. Click button `Ref` sẽ xác nhận rằng nó sẽ log `this.aRef` là cái sẽ log object của button Increment HTMLButtonElement. Nó không log instance của Counter vì component Counter đã chuyển tiếp nó đến component con là button Increment.

### Trigger animations

Chúng ta có thể sử dụng các ref để kích hoạt animation giữa các phần tử dựa vào chính chúng cho state tiếp theo của chúng nhưng tồn tại trong các component khác nhau (forwarding ref). Refs cũng có thể được sử dụng để đơn giản hóa việc tích hợp với thư viện DOM của bên thứ ba và quản lý state giá trị multi-step form, …