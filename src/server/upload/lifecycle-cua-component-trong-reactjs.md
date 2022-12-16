# Mở đầu
Nói qua về React một chút. React là một thư viện front-end được phát triển bới Facebook. Thư viện của React được chia làm 2 loại là: ReactJS và React Native. ReactJS sử dụng để phát triển các ứng dụng web còn React Native phát triển các ứng dụng về mobile (Android, iOS). ReactJS cho phép chúng ta có thể tạo ra các component và tái sử dụng chúng trong quá trình làm việc. Chúng ta sẽ làm việc chủ yếu với các component trong ReactJS, vì vậy ta cần phải nắm rõ được vòng đời của chúng để kiểm soát chúng trong quá trình viết code.

# Lifecycle của component
Trước khi hiểu về vòng đời của một component chúng ta cần biết 2 khá niệm Props và State của component.
## 1. Props và State
Props sử dụng để lưu các dữ liệu và chúng ta sẽ không thể thay đổi được chúng. Thường sử dụng props trong những trường hợp muốn truyền dữ liệu vào component.
Ví dụ ta có component Product:
```
import React, { Component } from 'react';

class Product extends Component {
    render() {
        return (
            <li>
                <a>{this.props.children}</a> -
                <span> {this.props.price}$</span>
            </li>
        );
    }
}

export default Product;
```

Truyền dữ liệu vào component Product:
```
<Product price={1250}>Macbook Pro</Product>
<Product price={1150}>Mac mini</Product>
<Product price={950}>Dell N5559</Product>
```

Kết quả hiển thị lên trang web:
![](https://images.viblo.asia/dea35bb8-f8f3-44e4-903f-bd6ca0058128.png)

Cũng giống với props, State là nơi chứa dữ liệu của component nhưng chúng có thể thay đối được trong toàn bộ vòng đời của component. State có thể được khởi tạo trong constructor:
```
constructor(props) {
super(props);
this.state = {
        header: "Header content from state"        
   };
}
```

## Lifecycle của component
![](https://images.viblo.asia/e61e803c-c84c-4547-8f43-da8f5a3a0225.png)

1. Initialization: Thời điểm khởi tạo một component, nó nằm trong hàm constructor component. Tại đây, component có thể nhận các props truyền vào và thiết lập các giá trị cho State.
2. Mouting: Ngay sau khi component được khởi tạo, hàm componentWillMount() được chạy và tại đây chúng ta có thể thực hiện những thao tác trước khi component được render(). Khi đã render được DOM rồi, chúng ta có thể thực hiện các thao tác update, kết nối với DB,... trong hàm componentDidMount(). Ví dụ sau sẽ cho thấy rõ hơn về thứ tự hoạt động của Mouting:
Code:
```
import React, { Component } from 'react';
import Product from '../Products/Product';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header: "Header content from state"
        };
        console.log("Initialization");
    }

    componentWillMount() {
        console.log("componentWillMount");
    }

    componentDidMount() {
        console.log("componentDidMount");
    }
    
    render() {
        console.log("render");
        return (
            <div className="container">
                <Product price={1250}>Macbook Pro</Product>
                <Product price={1150}>Mac mini</Product>
                <Product price={950}>Dell N5559</Product>
            </div>
        );
    }
}

export default App;
```
Kết quả trên console:
![](https://images.viblo.asia/510eeb4e-0afa-495a-b665-e796cf1393da.png)
3. Updation:

3.1. states:
Hàm shouldComponentUpdate() kiểm tra xem states có được chúng ta thay đổi hay không, nếu có thay đổi nó sẽ chạy tiếp đến hàm componentWillUpdate(). Cũng giống với Mounting, hàm componentWillUpdate() được chạy ngay trước khi render và sau khi render xong rồi sẽ tiếp tục chạy đến hàm componentDidUpdate().
Code ví dụ:
```
import React, { Component } from 'react';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Tuan"
        };
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate: " + nextState.name);
        return true;
    }
    
    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate: " + nextState.name);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate: " + prevState.name);
    }
    
    render() {
        console.log("render");
        return (
            <div>
                <div>{this.state.name}</div>
                <button onClick={() => {this.setState({name:"Nam"});}}>Click me</button>
            </div>
        );
    }
}

export default Content;
```
Và kết quả từ console cho thấy thứ tự chạy các hàm khớp so với sơ đồ bên trên:
![](https://images.viblo.asia/96abefc3-0d1e-4516-bd3c-d2f33a8f6a3c.png)
![](https://images.viblo.asia/d1509952-1857-4eb4-9c9a-8b5b682b3f85.png)

3.2. props:
Tương tự cách hoạt động với states, khi nhận được sự thay đổi props truyền vào từ component cha, hàm componentWillReceiveProps() được thực hiện. Tại đây, component con được cập nhật lại giá trị cho từng props. Sau đó, trình tự thực hiện các hàm cho việc update props được thực hiện hoàn toàn tương tự với update states.

4. Unmouting
Trong ReactJS, chúng ta không thể xóa các component một cách tùy tiện được. Chúng ta chỉ có thể xóa một component mà không có ràng buộc với một component cha nào khác, tức là nó phải là component lớn nhất bao bọc các component con. Dùng hàm ReactDOM.unmountComponentAtNode để unmount một component và nó sẽ biến mất trên giao diện trang web.
# Kết luận
Muốn làm việc với ReactJS một cách dễ dàng, chúng ta cần phải nắm chắc được vòng đời của một component. Tùy vào mục đích của các chức năng mà sử dụng những hàm đó sao cho phù hợp. Mong rằng bài viết này sẽ giúp ích được một phần nhỏ cho những ai mới bắt đầu học cũng như tìm hiểu về ReactJS. Happy coding!
# Tham khảo
ReactJS documentation: https://reactjs.org/docs/getting-started.html