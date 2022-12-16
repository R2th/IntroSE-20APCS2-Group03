## 1. Giới thiệu ngắn
ReactJS, một thư viện JavaScript dựa trên JSX là một thư viện phổ biến hiện nay. Hàng nghìn ứng dụng được xây dựng bằng React bởi nó cung cấp rất nhiều tính năng:

* HIệu suất cao
* Virtual DOM
* Tái sử dụng code
* Chạy trên các nền tảng khác nhau: Mobile/Tablet and Desktop
* ...

Nó được xây dựng dựa trên các Component cho mỗi View hoặc Group View. Một React Component tương tự như một phần tử HTML. Và một Component về cơ bản là một class gồm:

* props
* data
* state (Update thông qua setState())
* markup (render)

Tất cả kết hợp với nhau tạo thành UI wedget.

Components là công cụ chính để xây dựng giao diện người dùng. Tất cả các ứng dụng React đều có root component - thường được gọi là App Component.

Component có thể sử dụng như một child component trong component khác. React cung cấp một cách để các Component có thể giao tiếp với nhau - đó là sử dụng đối tượng `props`.

## 2. Bắt đầu chủ để chính của bài viết này nào.

### Props
Như đã đề cập phía trên, các Component giao tiếp với nhau thông qua `props`. Tham số được truyền từ Parent component sang Child component.

Child Component:

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

Parent Component:
```
// ES6 class
class AnimalsComponent extends React.Component {
    constructor(props) {}
    render() {
        return <div><CatComponent catName="Picky" /></div>
    }
}
// Functional component
function AnimalsComponent() {
    return <div><CatComponent catName="Picky" /></div>
}
```

Chúng ta đã truyền thuộc tính `catName` với giá trị là `Picky`. Component `CatComponent` sẽ nhận giá trị thuộc tính thông qua đối tượng `props` với tên thuộc tính đóng vai trò là key. Đối tượng props trông sẽ như thế này:
```
props = {
    catName: "Picky"
}
```

Nếu có nhiều thuộc tính được truyền:
```
...
    return <div><CatComponent catName="Picky" eyeColor="blue" age="4" /></div>
...
```

Props là:
```
props = {
    catName: "Picky",
    eyeColor: "blue",
    age: "4"
}
```

***Điều gì sẽ xảy ra khi parent component không truyền bất kỳ thuộc tính tới child component, hoặc truyền tất cả các thuộc tính mà child component hiển thị?***
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

hoặc
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

Câu trả là: Nó sẽ không hiển thị gì cả.

Với một số trường hợp, chúng ta muốn hiển thị một giá trị nào đó chứ thay vì không hiển thị gì, à có cách `defaultProps`.

Nếu chúng ra muốn required dữ liệu đầu vào của Component, hãy đọc [Typechecking With PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)

### defaultProps
Để giải quyết vấn đề trên, chúng ta có thể sử dụng toán tử logic || để đặt giá trị dự phòng. Vì vậy khi thiếu thuộc tính nào nó sẽ hiển thị giá trị dự phòng.
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

Nó hoạt động tốt, nhưng chúng ta phải xử lý nó khá nhiều trong code. React cung cấp một cách tốt hơn, sử dụng `defaultProps`. Nó là một property trong React component được sử dụng để đặt giá trị mặc định cho props argument.

Tiếp theo, chúng ta sẽ xem cách sử dụng nó trong ES class và function component.

#### ES6 React Component
Sử dụng ES6 class, chúng ta sẽ định nghĩa một thuộc tính static có tên là `defaultProps`.
```
class ReactComp extends React.Component {}
ReactComp.defaultProps = {}
// or
class ReactComp extends React.Component {
    static defaultProps = {}
}
```

Áp dụng vào `CatComponent` chúng ta sẽ được:
```
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
// or 
class CatComponent extends React.Component {
    constructor(props) {}
    static defaultProps = {
        catName: "Sandy",
        eyeColor: "deepblue",
        age: "120"        
    }
    render() {
        return <div>{this.props.catName} Cat, Eye Color: {this.props.eyeColor }, Age: {this.props.age}</div>
    }
}
```

Code của chúng ta nhìn gọn gàng và chuyên nghiệp hơn phải không hihe.

#### Functional Component
Trong React, chúng ta cũng có thể sử dụng function để tạo component. Cũng như ES6 React Component, chúng ta cũng có thể định nghĩa thuộc tính `defaultProps`.
```
function Reactcomp(props) {}
ReactComp.defaultProps = {}
```

Áp dụng vào `CatComponent` chúng ta sẽ được:
```
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

#### Usage in TypeScript
Nếu chúng ta sử dụng TypeScript, việc định nghĩa default props cũng dễ dàng:
```
type catAge = "120"
type eyeColor = "deepblue"
type catName = "Sandy"
export interface CatProps {
    catName: catName ,
    eyeColor: eyeColor,
    age: catAge
}
class CatComponent extends React.Component<CatProps> {
    constructor(props) {}
    static defaultProps = {
        catName: "Sandy",
        eyeColor: "deepblue",
        age: "120"        
    }
    render() {
        return <div>{this.props.catName} Cat, Eye Color: {this.props.eyeColor }, Age: {this.props.age}</div>
    }
}
```

Trong function component:
```
type catAge = "120"
type eyeColor = "deepblue"
type catName = "Sandy"
export interface CatProps {
    catName: catName ,
    eyeColor: eyeColor,
    age: catAge
}
function CatComponent(props: CatProps) {
    return <div>{props.catName} Cat, Eye Color: {props.eyeColor}, Age: {props.age}</div>
}
CatComponent.defaultProps = {
    catName: "Sandy",
    eyeColor: "deepblue",
    age: "120"    
}
```

## 3. Tổng kết
Qua bài này, chúng ta đã biết cách thiết lập giá trị mặc định cho props argument trong React Component.

Cảm ơn các bạn đã đọc.

Source: https://blog.bitsrc.io/understanding-react-default-props-5c50401ed37d