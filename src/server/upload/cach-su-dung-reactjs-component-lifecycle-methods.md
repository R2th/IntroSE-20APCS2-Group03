## Mở đầu:
Mọi thứ vận hành đều có vòng đời, hay chu trình của nó, từ khi nó được tạo ra cho đến kết thúc. Và chúng ta gọi nó là `lifecycle`.

React.js cũng không ngoại lệ,  chúng cũng có vòng đời. Chúng cần trải qua các giai đoạn hay còn gọi là các `phase` theo như thuật ngữ của `React`. Các giai đoạn đó bao gồm:

1. Mounting
2. Updating
3. Unmounting 

Ban đầu khi một `Component` được sinh ra, nó sẽ được render và đi vào phase `Mounting`. Sau đó, khi component đó được sử dụng và vận hành, nó sẽ bước sang giai đoạn `Updating`. Và cuối cùng khi đến lúc kết thúc, nó sẽ trải qua giai đoạn `Unmounting`.
Vòng đời của React components có thể cực ngắn cũng có thể rất dài.Nó phụ thuộc vào nhu cầu ứng dụng web của bạn và cách sử dụng của người dùng.

Khi User mở ứng dùng React của bạn- các component cần thiết sẽ đi qua giai đoạn "Mounting". Khi người dùng tương tác với ứng dụng React của bạn- một số component sẽ đi qua giai đoạn `Updating`, trong khi những component khác sẽ bước đến giai đoạn `Unmounting`.

Đối với một Developer , đương nhiên bạn sẽ muốn khai thác triệt để vòng đời của các component và được thông báo khi các component đó chuyển sang giai đoạn khác. Điều này sẽ cho phép bạn kiểu soát ứng dụng của bạn một trơn tru và linh hoạt.

Vậy làm thế nào chúng ta có thể nhận được thông báo khi các thành phần đang trải qua các giai đoạn khác nhau?
React cung cấp cho chúng ta một tập hợp các methods. Khi chúng ta khai báo chúng, React sẽ gọi chúng khi các component chuyển từ giai đoạn này sang giai đoạn khác!

Trong hướng dẫn này, chúng ta sẽ xây dựng một ứng dụng React đơn giản để minh họa cách sử dụng `lifecycle` với React components.
## Xây dựng hệ thống đơn giản
Dưới đây là hệ thống:

```
import React, { Component } from 'react';

class Demo extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      isCounterHidden: true
    }
  }

  toggleCounter = () => {
    this.setState({
      isCounterHidden: !this.state.isCounterHidden
    })
  }

  incrementCounter = () => {
    this.setState({
      counter: this.state.counter + 1
    })
  }

  renderBoxIncrement() {
    const { counter } = this.state;

    return (
      <div>
        <button onClick={this.incrementCounter}>Increment</button>
        {counter}
      </div>
    )
  }

  render() {
    const { isCounterHidden } = this.state;

    return (
      <div >
        <button onClick={this.toggleCounter}>{isCounterHidden ? 'Show' : 'Hidden'}</button>
        {isCounterHidden ? null : this.renderBoxIncrement()}
      </div>
    );
  }
}

export default Demo;
```
Đầu tiên chúng ta khai báo component initial:
```JSX
  constructor() {
    super();
    this.state = {
      counter: 0,
      isCounterHidden: true
    }
  }
```

Trong hàm `constructor` , hai giá trị `counter` và `isCounterHidden` được khởi tạo với 2 giá trị là 0 và true và được lưu vào trong `state`.
Giá trị `counter` sẽ theo dõi số lượng click còn giá trị `isCounterHidden`  sẽ quyết định xem có hiển thị hay không.

Và chúng ta sẽ sử dụng hai hàm `toggleCounter` và `incrementCounter` để thay đổi và update cho hai biến trên.

Hàm `toggleCounter` sẽ gán gán cho giá trị `isCounterHidden`:
```JSX
  toggleCounter = () => {
    this.setState({
      isCounterHidden: !this.state.isCounterHidden
    })
  }
```
Hàm `incrementCounter` sẽ gán giá trị cho `counter`:
```JSX
  incrementCounter = () => {
    this.setState({
      counter: this.state.counter + 1
    })
  }
```
Vậy chúng ta sẽ được gọi hàm `toggleCounter` và `incrementCounter` khi nào?
Chúng sẽ được hển thị thông qua hàm `render` của component `Demo` như dưới đây:
```JSX
  render() {
    const { isCounterHidden } = this.state;

    return (
      <div >
        <button onClick={this.toggleCounter}>{isCounterHidden ? 'Show' : 'Hidden'}</button>
        {isCounterHidden ? null : this.renderBoxIncrement()}
      </div>
    );
  }
```
phần hiển thị `button` để `increment` và hiển thị `counter` se được gói chung vào một hàm là `renderBoxIncrement`.
```JSX
  renderBoxIncrement() {
    const { counter } = this.state;

    return (
      <div>
        <button onClick={this.incrementCounter}>Increment</button>
        {counter}
      </div>
    )
  }
```

và phần quan trọng nhất của phần `render` là:
```HTML
<button onClick={this.toggleCounter}>{isCounterHidden ? 'Show' : 'Hidden'}</button>
{isCounterHidden ? null : this.renderBoxIncrement()}
```
Và chúng ta sẽ hiển thị 2 button để `Show/Hide`:
Trạng thái `Show` hoặc `Hide` được hiển thị dựa trên trạng thái của biến `isCounterHidden`, và giá trị này được truy xuất bằng cách `this.state.isCounterHidden` và mình viết gọn vào là biến `isCounterHidden`:
```
{isCounterHidden ? 'Show' : 'Hidden'}
```
*lưu ý: bình thường mình sẽ phải khai báo biến `const isCounterHidden = this.state.isCounterHidden` nhưng từ ES6 trở đi chúng ta có thể sử dụng hàm `const  {isCounterHidden} = this.state;` để khai báo, cả hai hàm có tác dụng tương tự nhau, do mình đã khai báo `const { isCounterHidden } = this.state;` ở trên mình chỉ cần sử dụng trực tiếp biến `isCounterHidden`, và biến này là biến cục bộ*

Nếu giá trị của `isCounterHidden` là `true`  thì `renderBoxIncrement` sẽ được hiển thị và khi nó là `false` thì nó sẽ ẩn đi. Khi trạng thái của `renderBoxIncrement` là `Hide` thì sẽ hiển thị button `Show`, và khi `renderBoxIncrement` là `Show` thì sẽ hiển thị button `Hide`
Vậy điều gì xảy ra khi người dùng `click` vào button đó? 
React sẽ gọi hàm `toggleCounter`, bởi vì nó được cài đặt thuộc tính `onClick`với giá trị của `this.toggleCounter`:
```
<button onClick={this.toggleCounter}>...</button>
```
Như chúng ta biết, hàm `toggelCounter` sẽ gọi `setState` để thay đổi trạng thái của component và khi mà trạng thái thay đổi, các thành phần liên quan cũng sẽ thay đổi theo.

Button thứ 2 là nút hiển thị tăng dần:
```
<button onClick={this.incrementCounter}>Increment</button>
```
Chúng ta cũng sử dụng thuộc tính `onClick` với giá trị của `this.incrementCounter`. Khi chúng ta click vào nó React sẽ gọi hàm `incrementCounter`và nó thay đổi `state` của component  `Demo` và sẽ `rerender` lại `Demo` component.

### Cách hiển thị và truyền biến
Bây giờ chúng ta đã biết cách chúng ta hiển thị các button và cách chúng hoạt động.
Chúng ta sẽ xem xét biến `counter` xem nó được hiển thị ở đâu và nó hoạt động như thế nào?

Khi chúng ta cẩn thận xem xét quá trình `render` trong `Demo` component, chúng ta sẽ nhận ra một số câu lệnh sau:
```
{isCounterHidden ? null : this.renderBoxIncrement()}
```
```JSX
  renderBoxIncrement() {
    const { counter } = this.state;

    return (
      <div>
        <button onClick={this.incrementCounter}>Increment</button>
        {counter}
      </div>
    )
  }
```
```JSX
  incrementCounter = () => {
    this.setState({
      counter: this.state.counter + 1
    })
  }
```
Nhìn ở trên chúng ta nhận ra giá trị của `isCounterHidden` sẽ quyết định xem phần `renderBoxIncrement` có được hiển thị hay không, và giá trị của `counter` sẽ được hiển thị ở trong  hàm `renderBoxIncrement`, và giá trị của `counter` được `update` và lưu trữ vào `state` thông qua  hàm `incrementCounter` với cơ chế tương tự như biến `isCounterHidden`.

Đó là sơ bộ cách vận hành trong `Demo`.

## Nói sâu hơn về lifecycle
Trong hướng dẫn này, chúng ta hướng đến tìm hiểu về `lifecycle` trong React. Mục tiêu của chung ta là hiển thị một giá trị truy cập thì nó phải trải qua vòng đời như thế nào?
Chúng ta sẽ cập nhật thêm cho component `Demo`:
```
import React, { Component } from 'react';

class Demo extends Component {
  constructor() {
    super();
    console.log('constructor');
    this.state = {
      counter: 0,
      isCounterHidden: true
    }
  }

  toggleCounter = () => {
    this.setState({
      isCounterHidden: !this.state.isCounterHidden
    })
  }

  incrementCounter = () => {
    this.setState({
      counter: this.state.counter + 1
    })
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps');
  }

  shouldComponentUpdate() {
    console.log('shouldComponentUpdate');
    return true;
  }

  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  renderBoxIncrement() {
    const { counter } = this.state;

    return (
      <div>
        <button onClick={this.incrementCounter}>Increment</button>
        {counter}
      </div>
    )
  }

  render() {
    const { isCounterHidden } = this.state;
    console.log('render');

    return (
      <div >
        <button onClick={this.toggleCounter}>{isCounterHidden ? 'Show' : 'Hidden'}</button>
        {isCounterHidden ? null : this.renderBoxIncrement()}
      </div>
    );
  }
}

export default Demo;
```

Như bạn đã thấy chúng ta có rất nhiều component lifecycle. chúng bao gồm:
- constructor
- componentWillMount
- componentDidMount
- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
- componentDidUpdate
- componentWillUnmount
- render

Tất cả các `methods` này đều được gọi bởi React và để hiểu rõ thời điểm nào, React sẽ gọi component nào, component nào trước, component nào sau, chúng sẽ sẽ sử dụng hàm `console.log`.
Thao tác này sẽ đưa ra thông báo trường trình trong Developer Console và chúng ta sẽ thông qua `console` để xem thứ tự các `component` được gọi.

Chúng sẽ thể thêm cả `console.log` cho hàm `render`
```JSX
render() {
  console.log('render');
  ...
}
```

Và giờ chúng ta sẽ chạy thử trên website và mở `console`.
Khi lần đầu tiên `load` website chúng ta sẽ thấy phần hiển thị trong `console` như dưới.
![](https://images.viblo.asia/37b37c5f-175d-4c8e-86f3-8defa9596c1e.png)
Chúng ta nhận thấy, khi `load` lần đầu tiên, dữ liệu sẽ được `load` và xử lý theo thứ tự 
* constructor
* componentWillMount
* render
* componentDidMount

sau đó chúng ta sẽ `Click` vào một button `<button onClick={this.toggleCounter}>{isCounterHidden ? 'Show' : 'Hidden'}</button>` trên trang hiển thị chúng ta sẽ thấy.
![](https://images.viblo.asia/7adf0cb9-36a2-4b22-9ade-9b6584fdb9bc.png)
khi `Click` vào đó, chúng ta sẽ gọi hàm `toggleCounter` và nó sẽ gọi đến các component theo thứ tự dưới đây: 
* shouldComponentUpdate
* componentWillUpdate
* render
* componentDidUpdate

## Kết Luận:
Qua ví dụ trên đây, chúng ta hiểu được phần nào cách để khai báo một giá trị `state` và `lifecycle` sử dụng trong React như thế nào
Hiện tại bài viết còn sơ sài, rất mong nhận được nhiều góp ý của mọi  người để bài viết có thể hoàn thiện hơn
Xin cám ơn các bạn.

link tham khảo:
http://react.tips/how-to-use-react-component-lifecycle-methods/
Link demo Github:
https://github.com/minhld1709/react-demo