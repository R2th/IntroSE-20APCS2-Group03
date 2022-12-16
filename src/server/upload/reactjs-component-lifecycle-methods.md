# Mở đầu
Khi học và tìm hiểu về React Component, có lẽ bạn đã đôi lần nhìn thấy các phương thức như componentDidMount(), componentDidUpdate(), componentWillUnmount(),… Chúng được gọi là các “React lifecycle methods” – các phương thức trong vòng đời của React Component. Chúng cho phép bạn override để thực hiện một số nhiệm vụ nhất định. Do đó, việc hiểu và biết cách sử dụng các phương thức này là vô cùng quan trọng. Vì vậy, bài viết này mình sẽ đi vào tìm hiểu về React Component Lifecycle. Hay nói ngắn gọn hơn là “React Lifecycle”.
# Component Lifecycle là gì?
Một loạt các thay đổi mà Component trải qua từ khi nó được tạo ra cho tới khi nó kết thúc (bị hủy) được gọi là một vòng đời (lifecycle) của Component. Trong quá trình tồn tại của Component các phương thức sẽ được gọi, dưới đây là hình ảnh minh họa vòng đời của Component và các phương thức sẽ được gọi trong các giai đoạn khác nhau.
Các phương thức trong React Component Lifecycle có thể chia ra làm 3 pha chính là: Mounting, Updating và Unmounting.
![](https://images.viblo.asia/375fb22a-2fa2-4bb7-a158-a2dd734b0626.png)

Bây giờ chúng ta sẽ tìm hiểu lần lượt từng pha một nhé :smiley:
## Các phương thức trong pha Mounting
> Mounting là giai đoạn khi React Component được tạo ra và render lên trên DOM tree.

Các React lifecycle methods được gọi trong giai đoạn này lần lượt là:

* constructor()
* static getDerivedStateFromProps()
* render()
* componentDidMount()

Trong đó, phương thức render() BẮT BUỘC phải có; getDerivedStateFromProps() ít khi sử dụng;  constructor() và componentDidMount() thường xuyên được sử dụng – nhưng không bắt buộc.

Vì vậy, dưới đây mình sẽ chỉ trình bày về các React lifecycle methods quan trọng và hay sử dụng.
### constructor()
Đối với class nói chung, **constructor()** luôn là phương thức được gọi đến ĐẦU TIÊN mỗi khi khởi tạo. Tuy nhiên, bạn chỉ nên sử dụng phương thức này với 2 mục đích:

* Khởi tạo state cho React Component.
* Bind method (xử lý event, sử dụng trong setTimeout hoặc setInterval) với this.

```
constructor(props) {
  super(props);
  this.state = { count: 0 };
  this.updateCounter = this.updateCounter.bind(this);
}
```

Trong đó:

* Component bạn khai báo kế thừa từ React.Component, nên bạn cần phải gọi hàm super(props) để gọi đến hàm khởi tạo của thằng cha React.Component. Nếu thiếu thì this.props sẽ là **undefined**.
*  `this.state = { count: 0 }`: khởi tạo biến thuộc state là: **count = 0**.
* Cuối cùng, this.updateCounter là hàm được sử dụng trong setInterval  mà mình sẽ sử dụng trong ví dụ dưới. Mình cần phải **bind** phương thức này với **this** – là tham chiếu đến đối tượng Component hiện tại.
    
### render()
Đây là phương thức duy nhất **bắt buộc** phải có đối với React Component và có cấu trúc như sau:
```
render() {
  
  return (
    /* Định nghĩa cấu trúc Component tại đây */
  )
}
```

Phương thức này dùng để miêu tả cấu trúc của Component sau khi nó được chèn vào DOM tree. Nó bắt buộc được gọi lần đầu tiên để chèn Component vào HTML, và có thể được gọi lại để cập nhật giao diện mỗi khi state của Component thay đổi.

Đặc biệt, bạn nên để phương thức này là **Pure Function** – nghĩa là nó không làm thay đổi state của Component, không tương tác với trình duyệt, không lấy dữ liệu từ server,…

Chỉ đơn giản là nó lấy data từ **this.props** và **this.state** để xây dựng và cập nhật giao diện.

### componentDidMount()
Phương thức componentDidMount() được gọi một lần duy nhất ngay sau khi Component được render xong. Và nếu để so sánh với JavaScript thuần thì mình thấy phương thức này khá giống với việc bạn đăng ký sự kiện DOMContentLoaded.

Chính vì tính chỉ được gọi một lần duy nhất nên bên trong phương thức này, mình có thể:

* Lấy dữ liệu từ server để cập lại state cho Component.
* Định nghĩa interval thông qua setInterval để thực hiện một số nhiệm vụ lặp lại.
* Lấy thông tin liên quan đến DOM node như kích thước thực tế (width, height) – vì lúc này chúng đã được hiển thị lên màn hình.
* Đăng ký sự kiện: resize, scroll,…


Hết phương thức này, nghĩa là mình đã xử lý xong trong pha Mounting. Có 3 phương thức quan trọng mà bạn cần nhớ là:
* constructor()
* render()
* componentDidMount()
    
## Các phương thức trong pha Updating
> Updating là giai đoạn khi React Component cần cập nhật giao diện mỗi khi props hoặc state của nó thay đổi.

Các React lifecycle methods được gọi trong giai đoạn này lần lượt là:

* static getDerivedStateFromProps()
* shouldComponentUpdate()
* render()
* getSnapshotBeforeUpdate()
* componentDidUpdate()
Trong đó, phương thức render() là bắt buộc và đã được trình bày ở phần trước; phương thức getDerivedStateFromProps(), shouldComponentUpdate() và getSnapshotBeforeUpdate() ít khi được sử dụng; phương thức componentDidUpdate() thường xuyên được sử dụng nên mình sẽ trình bày ở phía dưới.
### render() vả shouldComponentUpdate()
Như mình đã nói ở trên, phương thức render() trong pha **Updating** có thể được gọi hoặc không, phụ thuộc vào phương thức shouldComponentUpdate().

Mặc định, phương thức shouldComponentUpdate() sẽ trả về **true**. Nghĩa là mỗi khi bạn gọi phương thức this.setState để cập nhật **state** của Component thì render() sẽ được gọi lại để cập nhật giao diện.

Tuy nhiên, sẽ có trường hợp dù bạn gọi lại this.setState, nhưng giá trị của **state** vẫn không thay đổi. Khi đó, việc gọi lại hàm render() là vô nghĩa.

Trong ví dụ phía trên, giả sử bạn chủ động gọi hàm this.setState để cập nhật giá trị của biến **count**, nhưng giá trị mới vẫn là 0 – bằng giá trị ban đầu.
```
this.setState({
  count: 0
})
```

Lúc này, phương thức render() mặc định sẽ bị gọi lại, nhưng như vậy chẳng phải là vô nghĩa hay sao?

Tuy nhiên, nếu bạn định nghĩa thêm phương thức shouldComponentUpdate() như này:
```
shouldComponentUpdate(nextProps, nextState) {
  return nextState.count !== this.state.count;
}
```
thì phương thức render() sẽ không bị gọi lại nữa.

Bởi vì, nextState.count và this.state.count lúc này đều bằng 0, nên `nextState.count !== this.state.count` sẽ trả về **false**. Suy ra, hàm render() sẽ không bị gọi lại. Hay nói tổng quát hơn là: phương thức render() chỉ bị gọi lại khi **props** hoặc **state** mới** có giá trị khác** so với hiện tại.
Tuy nhiên, nếu không quá quan trọng về hiệu năng thì bạn có thể bỏ qua phương thức shouldComponentUpdate().

### componentDidUpdate()
Phương thức này được gọi sau khi việc update kết thúc – component với những dữ liệu mới đã được cập nhật xong lên giao diện. Trong phương thức này, bạn có thể xử lý việc lấy dữ liệu từ server, ví dụ:
```
componentDidUpdate(prevProps) {
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

Tức là nếu giá trị của props userID thay đổi thì bạn sẽ lấy dữ liệu từ server xuống và làm một số thứ sau đó. Ở đây, bạn cần chú ý điều kiện trong if. Nếu không có điều kiện này thì việc this.fetchData từ server xuống vẫn được thực hiện dù cho giá trị userID không thay đổi.

Ngoài ra, bạn cũng có thể xử lý DOM node trong phương thức này, ví dụ như: ẩn hiện 1 phần tử, thay đổi width/height của nó để phù hợp với dữ liệu mới,…

Hoặc thậm chí bạn cũng có thể thay đổi state của Component tại đây. Nhưng phải cẩn thận với điều này vì: khi bạn gọi this.setState thì componentDidUpdate() lại được gọi. Nếu bạn không xử lý điều kiện if else hợp lý thì rất có thể vòng lặp vô hạn sẽ xảy ra.

Tóm lại trong pha Updating này có 3 phương thức bạn cần chú ý là:

* shouldComponentUpdate()
* render()
* componentDidUpdate()
    
## Phương thức trong pha Unmouting – componentWillUnmount()
> Unmounting là giai đoạn khi React Component bị xoá khỏi DOM tree.

Trong giai đoạn này, chỉ có một phương thức được gọi duy nhất là: componentWillUnmount().

Phương thức này tương ứng với phương thức componentDidMount() trong giai đoạn Mounting. Nghĩa là phương thức này cũng chỉ được **gọi 1 lần duy nhất**. Và quan trọng là những thứ bạn khởi tạo, đăng ký ở componentDidMount() thì bạn phải xoá, huỷ đăng ký trong phương thức componentWillUnmount().

Giả sử mình khởi tạo Interval và đăng ký sự kiện **resize** bên trong componentDidMount():
```
this.counterInterval = setInterval(this.updateCounter, 1000);
window.addEventListener("resize", this.updateDimensions);
```

Thì sau đó, mình phải xoá interval và huỷ đăng ký sự kiện resize trong componentWillUnmount():
```
window.removeEventListener("resize", this.updateDimensions);
clearInterval(this.counterInterval);
```
# Ví dụ
Giả sử mình xây dựng **Counter Component** như sau.

*index.html*
```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Understand React Component Lifecycle</title>
  <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  <link href="../main.css" rel="stylesheet">
  <style>
    main {
      width: 100%;
      max-width: 640px;
      margin: auto;
      padding: 15px;
    }
  </style>
</head>

<body>
  <main>
    <h3>Understand React Component Lifecycle</h3>
    <div id="container"></div>
  </main>
  <script src="main.js" type="text/babel"></script>
</body>

</html>
```

*main.js*
```
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.updateCounter = this.updateCounter.bind(this);
    console.log("constructor");
  }

  componentDidMount() {
    this.counterInterval = setInterval(this.updateCounter, 1000);
    console.log("componentDidMount");
  }

  updateCounter() {
    this.setState({
      count: this.state.count + 1
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(`componentDidUpdate: count from ${prevState.count} to ${this.state.count}`);
    if (this.state.count === 5) {
      ReactDOM.unmountComponentAtNode(document.querySelector("#container"));
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    clearInterval(this.counterInterval);
  }

  render() {
    console.log(`render: count = ${this.state.count}`);

    return (
      <div style={{ fontSize: `2rem` }}>
        {this.state.count}
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.querySelector("#container"));
```

**Kết quả:**
![](https://images.viblo.asia/15245937-8f6b-48d5-8674-743787005150.gif)
# Lời kết
Trên đây là một số kiến thức cơ bản mà mình đã tìm hiểu về React Component Lifecycle. Trước khi kết thúc bài viết, mình xin nhắc lại các React Lifecycle Methods quan trọng mà bạn cần quan tâm là:

* Mounting:
    1.  constructor()
    2.  render()
    3.  componentDidMount()
* Updating:
    1.  shouldComponentUpdate()
    2.  render()
    3.  componentDidUpdate()
* Mounting:
    1.  componentWillUnmount()


Cảm ơn mọi người đã xem bài viết của mình. 😄

**Nguồn tham khảo:**
* [https://www.freecodecamp.org/news/how-to-understand-a-components-lifecycle-methods-in-reactjs-e1a609840630/](https://www.freecodecamp.org/news/how-to-understand-a-components-lifecycle-methods-in-reactjs-e1a609840630/)
* [https://www.tutorialspoint.com/reactjs/reactjs_component_life_cycle](https://www.tutorialspoint.com/reactjs/reactjs_component_life_cycle)
* [https://reactjs.org/docs/react-component.html](https://reactjs.org/docs/react-component.html)