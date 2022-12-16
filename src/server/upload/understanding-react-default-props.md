Bài viết được dịch từ nguồn (https://blog.bitsrc.io/understanding-react-default-props-5c50401ed37d)


Trong bài viết này, chúng ta sẽ tìm hiểu tất cả về các props mặc định trong React. Nó sẽ giúp chúng ta không chỉ trở thành dev tốt hơn mà còn cung cấp trải nghiệm tốt hơn cho người dùng của chúng ta nữa. Bắt đầu nào!

## Short Intro
Reactjs, một thư viện JavaScript UI dựa trên JSX là thư viện JS phổ biến nhất hiện nay. Hàng nghìn ứng dụng được xây dựng bằng React, nó cung cấp rất nhiều tính năng:

- High performance
- Smaller builds
- Virtual DOM
- Code reuse
- UI based on Components
- Runs on different platforms: Mobile/Tablet and Desktop
- Easy start for beginners

Được xây dựng để sử dụng khái niệm `Component` cho mỗi dạng xem hoặc nhóm dạng xem. Một `component` React tương tự như một phần tử HTML. Và một `component` về cơ bản là một lớp chứa:

- props
- data
- state (manipulated via `setState()`)
- markup (delivered by `render()`)

Tất cả những thứ này kết hợp với nhau tạo ra một tiện ích giao diện người dùng.

Vì vậy đó là niềm vui, nhờ? nhưng các bạn đã biết tất cả những điều đó.

Các `components` là công cụ chính mà chúng ta sử dụng để xây dựng giao diện người dùng tương tác. Tất cả các ứng dụng React đều có `component` gốc, thường được gọi là `App component`

React cung cấp các cách để các `components` truyền dữ liệu cho nhau và phản hồi các sự kiện của nhau.

Bạn có thể viết một `component` và sử dụng nó như một `child component` trong một số `components` khác - chúng được thiết kế để khép kín và liên kết lỏng lẻo cho mục đích này.

Mỗi `component` chứa dữ liệu có giá trị về chính nó:

- Đầu vào dữ liệu như thế nào ?
- Làm sao để tạo ra một component đúng nghĩa ?

Cùng tìm hiểu tiếp nhé

## Statement

Như trên, các `components` React lấy đầu vào trong đối số props

```
// ES6 class
class CatComponent extends React.Component {
    constructor(props) {}
    render() {
        return <div>{this.props.catName} Cat</div>
    }
}
// Functional component
function CatComponent(props) {
    return <div>{props.catName} Cat</div>
}
```
Điều này được truyền lại từ `parent component`
```
// ES6 class
class CatsComponent extends React.Component {
    constructor(props) {}
    render() {
        return <div><CatComponent catName="Picky" /></div>
    }
}
// Functional component
function CatsComponent() {
    return <div><CatComponent catName="Picky" /></div>
}
```

Bạn thấy chúng ta đã truyền vào một `catName` thuộc tính với giá trị `Picky`, CatComponent sẽ nhận giá trị thuộc tính từ đối số props. Tất cả các thuộc tính được gắn vào một `component` trong React được chuyển trong đối tượng props cho `child component`. Ở trên sẽ được thông qua như thế này:
```
props = {
    catName: "Picky"
}
```
Và nếu
```
...
    return <div><CatComponent catName="Picky" eyeColor="blue" age="4" /></div>
...
```
Đối số `props` sẽ là:
```
props = {
    catName: "Picky",
    eyeColor: "blue",
    age: "4"
}
```
`Child component` sẽ truy cập chúng từ đối tượng props với tên thuộc tính đóng vai trò là khóa:

```
// ES6 class
class CatComponent extends React.Component {
    constructor(props) {}
    render() {
        return <div>{this.props.catName} Cat, Eye Color: {this.props.eyeColor}, Age: {this.props.age}</div>
    }
}
// Functional component
function CatComponent(props) {
    return <div>{props.catName} Cat, Eye Color: {props.eyeColor}, Age: {props.age}</div>
}
```

Vấn đề ở đây là điều gì xảy ra nếu `parent component` không chuyển bất kỳ thuộc tính nào cho `child component`?
```
// ES6 class
class CatsComponent extends React.Component {
    constructor(props) {}
    render() {
        return <div><CatComponent /></div>
    }
}
// Functional component
function CatsComponent() {
    return <div><CatComponent /></div>
}
```
Hoặc `parent component` không chuyển tất cả các thuộc tính mà `child component` hiển thị.

```
// ES6 class
class CatsComponent extends React.Component {
    constructor(props) {}
    render() {
        return <div><CatComponent age="4" /></div>
    }
}
// Functional component
function CatsComponent() {
    return <div><CatComponent age="4" /></div>
}
```

Chắc chắn chúng ta sẽ thấy hiển thị không xác định thay cho các props không được gửi bởi `parent component`.

Vì một số lý do, chúng ta có thể quyết định không vượt qua một số props nhưng bất kể lý do gì có thể là lý do chúng ta sẽ không muốn thấy không xác định trong ứng dụng của mình !! nhờ ! Người dùng của chúng ta có thể sẽ nghi ngờ rằng ứng dụng của chúng ta đang trục trặc.

## The Solution — defaultProps
Để giải quyết vấn đề này, chúng ta có thể sử dụng toán tử logic || để đặt giá trị dự phòng, vì vậy khi thiếu một phần hỗ trợ, nó sẽ hiển thị giá trị dự phòng thay cho phần hỗ trợ bị thiếu.
```
// ES6 class
class CatComponent extends React.Component {
    constructor(props) {}
    render() {
        return <div>{this.props.catName || "Sandy"} Cat, Eye Color: {this.props.eyeColor || "deepblue" }, Age: {this.props.age || "120"}</div>
    }
}
// Functional component
function CatComponent(props) {
    return <div>{props.catName || "Sandy"} Cat, Eye Color: {props.eyeColor || "deepblue"}, Age: {props.age || "120"}</div>
}
```

Thấy rằng catName sẽ hiển thị "Sandy" khi nó không được đặt trong đối số props. Ngoài ra eyeColor sẽ hiển thị “deepblue” và age sẽ hiển thị “120”.
Điều này hoạt động tốt nhưng chúng ta sẽ không đính kèm || cho tất cả mã của chúng ta. React cung cấp một cách tốt hơn và nó được thực hiện một lần, thưa quý vị, tôi xin giới thiệu với các bạn defaultProps. defaultProps là một thuộc tính trong `component` React được sử dụng để đặt giá trị mặc định cho đối số props. Nó sẽ được thay đổi nếu thuộc tính prop được chuyển qua.

> defaultProps có thể được định nghĩa như một thuộc tính trên chính lớp `component` đó, để đặt các props mặc định cho lớp. - [React Blog](https://reactjs.org/docs/react-component.html)

## ES6 React Component
Sử dụng ES6 class, chúng ta sẽ định nghĩa một thuộc tính tĩnh có tên là defaultProps.

```
class ReactComp extends React.Component {}
ReactComp.defaultProps = {}

// Our CatComponent
// ES6 class
class CatComponent extends React.Component {
    constructor(props) {}
    render() {
        return <div>{this.props.catName} Cat, Eye Color: {this.props.eyeColor }, Age: {this.props.age}</div>
    }
}
CatComponent.defaultProps = {
    catName: "Sandy",
    eyeColor: "deepblue",
    age: "120"
}
```
Bạn xem tất cả các || không còn nữa, làm cho mã của chúng ta trông gọn gàng và chuyên nghiệp hơn.

Chúng ta đã xác định một thuộc tính tĩnh, defaultProps trên lớp CatComponent với các giá trị mà chúng ta muốn các props có khi không được chuyển.

## Functional Component
Trong React, chúng ta có thể sử dụng các hàm làm `component` để hiển thị các khung nhìn. Cũng như đối với `component` ES6 của nó, chúng ta có thể thêm các props mặc định vào `component` bằng cách thêm thuộc tính static defaultProps vào hàm:
```
function Reactcomp(props) {}
ReactComp.defaultProps = {}
// CatComponent
// Functional component
function CatComponent(props) {
    return <div>{props.catName} Cat, Eye Color: {props.eyeColor}, Age: {props.age}</div>
}
CatComponent.defaultProps = {
    catName: "Sandy",
    eyeColor: "deepblue",
    age: "120"    
}
```

## Conclusion
Vậy là chúng ta đã thấy cách đặt giá trị mặc định cho đối số props trong các `components` React, có thể là lớp ES6 hoặc `functinal component`.