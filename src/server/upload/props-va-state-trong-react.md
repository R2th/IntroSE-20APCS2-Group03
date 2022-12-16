![](https://images.viblo.asia/d0325af4-85c5-4e0d-a32d-2aeea0171f3a.png)

- Hello mọi người ở bài này mình sẽ giới thiệu đến các bạn về props và state trong React, Phân biệt props và state


# Props là gì?

 - Props là viết tắt của properties.**Props** là cách các components tương tác với nhau.

Nếu các bạn đã quen thuộc với React, hẳn các bạn đã biết rằng props được truyền vào từ parent components. Props là bất biến

Làm sao để tạo props?

Trước tiên, khởi tạo trong class:
```
  constructor(props) {
        super(props);   // init props
        this.state= {}  // init state
  }
```


- Ví dụ:

```
  class App extends React.Component {
   render() {
      return (
         <div>
            <h1>{this.props.title}</h1>
            <h2>{this.props.des}</h2>
         </div>
      );
   }
}
App.defaultProps = {
   title: "Hello",
   des: "How are you"
}
```


```
function Hello(props) {
  return (
    <div>
          <h1>{props.title}</h1>
          <h2>{props.des}</h2>
    </div>
  )
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Hello
          title="Hello"
          des="How are you"
        />
      </div>
    );
  }
}
```
- kết quả của 2 cách trên đều ra hình ảnh sau :
![](https://images.viblo.asia/7e98ce34-edbe-4de3-8afc-2c26324e0c84.png)

link demo https://codesandbox.io/s/props-xdzey

- Trong component App, để lấy được dữ liệu cho title, des, sử dụng this.props.title(trong class)  hoặc props.title (trong function)

- Nguyên nhân của việc sử dụng this.props.* trong class là vì trong component, tồn tại sẵn một props dùng để chứa tất cả các val truyền vào.

- Sau khi chuyển sang component khác, nếu bạn muốn đưa nó vào className của JSX chẳng hạn, chúng ta làm như sau:


```
<div className={ 'col-md-6' + this.props.title}
```



### State

- Không giống như props, state là một tính năng private và nó chỉ thuộc về một component duy nhất. State cho phép các components trong React có thể linh động thay đổi output trong quá trình chạy, để đáp ứng với các sự kiện nhất định.

- State trong React cũng giống với scope trong AngularJS.

ví dụ về state:

```
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {counter: 0}
    this.increment = this.increment.bind(this);
  }
  increment(){
    this.setState({counter: this.state.counter + 1})
  }
  render(){
    return(
      <div>
        <button onClick={this.increment}>Like</button>
        <p>{this.state.counter}</p>
      </div>
    )
  } 
}
```

- Kết qủa hình ảnh 
![](https://images.viblo.asia/d1f231a9-ab9d-4c48-8878-3bb3220dfa74.png)

Khi click vào button like thì counter sẽ tăng lên 1. 

Link demo: https://codesandbox.io/s/state-c9zl7



### Tóm lại:

Từ các ví dụ trên, chúng ta có thể thấy state tương đối giống với props, Tuy nhiên State nó chỉ được chứa trong một component duy nhất, và có thể thay đổi khi chúng ta cần. Trong khi đó, props là bất biến, chỉ được sử dụng để đọc cho các component sở hữu props đó.

“Props được sử dụng để truyền data từ parent component sang child component, hoặc trong chính component đó. Props là bất biến và do đó sẽ không thay đổi được.

State được sử dụng cho dữ liệu có thể thay đổi được, hoặc dữ liệu sẽ thay đổi trong tương lai.”