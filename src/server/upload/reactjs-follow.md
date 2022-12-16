*đây là mình tự memo nhé không phải chia sẻ gì cả anh em thông cảm chưa tìm được cách private lại   :grin:*

ReactJs Follow

### 1. install create-react-app
```npm
npm install -g create-react-app
```

### 2. create-react-app *new-project*
```npm
create-react-app *new-project*
```

### 3. tìm hiểu cách cấu trúc thư mục cho COMPONENT
https://viblo.asia/p/cau-truc-thu-muc-va-cach-viet-component-chuan-trong-react-RQqKLxypK7z

### 4. tìm hiểu về Props & State
 ###### Hai thuộc tính quan trọng của một React Component là Props và State. 

Sự khác biệt giữa hai kiểu thì hơi khó khăn để hiểu ngay từ ban đầu, ít nhất là về mặt khái niêm. Nhưng một khi bạn bắt đầu code, bạn sẽ nhanh chóng tách biệt được hai loại.

* State biểu diễn  "trạng thái" của Component, state là private và chỉ có thể được thay đổi bên trong bản thân component.
* Props thì mang tính external, và không bị kiểm soát bởi bản thân component. Nó được truyền từ component cao hơn theo phân cấp, hay có thể hiểu đơn giản là truyền từ component cha xuống component con.

 ###### Tạm thời hiểu là:
* State thay đổi, còn Props thì read-only trong mỗi Components.
* Props:  trong component sẽ hứng giá trị thay đổi từ view thông qua props.
* State:  sẽ được thay đổi trong component (có thể thông qua props truyền vào) và tự động render ra view.

 ###### xem ví dụ sau:
```javascript
class App extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      name: 'user1'
    }
  }

  onChange(e) {
    this.setState({name: e.target.value});
  }

  render() {
    return (
      <div>
        <input type='text' onChange={this.onChange.bind(this)} />
        <lable name={this.state.name} />
      </div>
    );
  }
}
```

Ở vị dụ này  `state` sẽ được thay đổi qua việc truyền action Dom là `onChange`  và thông qua `setState`  sau đó sẽ được auto render lên `lable`

###### **Chú ý:**  this.setState là hàm async, nên truy cập this.state ngay sau khi setState sẽ không nhận được giá trị mới của this.state

bạn phải dùng callback như sau
    
```
this.setState(nextProps, ()=>{
    this.updateDatabase(this.state)
})
```

### 5. học cách viết 1 component react đúng chuẩn
 #####  5.1 Quy tắc cơ bản

* Chỉ bao gồm một React component cho mỗi file. Tuy nhiên, cho phép nhiều Stateless, hoặc Pure, Components cho mỗi file.
* Luôn luôn sử dụng cú pháp JSX. Không sử dụng React.createElement trừ khi bạn đang khởi tạo ứng dụng từ file không phải là JSX.


#####  5.2 Vòng đời của 1 Component
* Khởi tạo Component
  * Khởi tạo Class (đã thừa kế từ class Component của React)
  * Khởi tạo giá trị mặc định cho Props (defaultProps)
  * Khởi tạo giá trị mặc định cho State (trong hàm constuctor)
  * Gọi hàm componentWillMount()
  * Gọi hàm render()
  * Gọi hàm componentDidMount()

* Khi State thay đổi
  * Cập nhật giá trị cho state
  * Gọi hàm shouldComponentUpdate()
  * Gọi hàm componentWillUpdate() – với điều kiện hàm trên return true
  * Gọi hàm render()
  * Gọi hàm componentDidUpdate()

* Khi Props thay đổi
  * Cập nhật giá trị cho props
  * Gọi hàm componentWillReceiveProps()
  * Gọi hàm shouldComponentUpdate()
  * Gọi hàm componentWillUpdate() – với điều kiện hàm trên return true
  * Gọi hàm render()
  * Gọi hàm componetDidUpdate()

* Khi Unmount component
  * Gọi hàm componentWillUnmount()