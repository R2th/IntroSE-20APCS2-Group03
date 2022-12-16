### 1. Giới thiệu:
Nếu bạn làm việc với ReactJS, bạn sẽ thấy Props và State được sử dụng rất nhiều. Giống như Props, State dùng để lưu trữ thông tin của component, điểm khác biệt là State là một thành phần của component còn Props là giá trị được truyền từ ngoài vào component. Chúng ta thường cập nhật state ngay trong component bằng lệnh setState() để re-render component, Vậy trong trường hợp chúng ta muốn thay đổi state từ component cha thì giải quyết như thế nào????<br>
Một solution khá đơn giản đó là sử dụng Refs trong React. Nào hãy cùng xem ví dụ dưới đây để thấy rõ hơn nhé!!!
### 2. Ví  dụ:
Chúng ta sẽ thực hiện một ví dụ mà thay đổi tên ở component con bằng việc thực hiện click button ở component cha.<br>
Nào go go!!!<br>
Trước tiên, chúng ta sẽ tạo một component có tên **ChildComponent** có state là name với giá trị ban đầu là "**Diem My**". Component sẽ hiển thị đoạn text "My name is" và tên được lấy từ state.

```
class ChildComponent extends React.Component {
  state = {
    name: "Diem My"
  };
  
  render() {
    return (
      <div>
        My name is <span style={{ color: "red" }}>{this.state.name}</span>
      </div>
    );
  }
}
```
Tiếp theo, để thực hiện thay đổi state, chúng ta sẽ tạo function  **changeName()** và dùng this.setState() để thay đổi state:
```
  changeName = () => {
    this.setState({
      name: "Thu Trang"
    });
  };
```
**ChildComponent** hiện tại đã có state và một hàm thay đổi state, hiện tại nó sẽ trông như sau:
```
class ChildComponent extends React.Component {
  state = {
    name: "Diem My"
  };
  
  changeName = () => {
    this.setState({
      name: "Thu Trang"
    });
  };
  
  render() {
    return (
      <div>
        My name is <span style={{ color: "red" }}>{this.state.name}</span>
      </div>
    );
  }
}
```
Tiếp theo, chúng ta sẽ tạo ra một component cha có tên **ParentComponent** sẽ chưa **ChildComponent** , một button để thực hiện thay đổi tên khi click, và một function tạm để trống để lát chúng ta sẽ xử lý để thay đổi state trong **ChildComponent**:
```
class ParentComponent extends React.Component {
  handleClick = () => {
    // change state of ChildComponent
  };

  render() {
    const buttonStyle = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "8px",
      fontFamily: "Arial",
      borderRadius: "3px"
    };

    return (
      <div className="App">
        <h1>Update state from parent component</h1>
        <h2>Click Change Button to see result!</h2>
        <ChildComponent />
        <br />
        <button onClick={this.handleClick} style={buttonStyle}>Change name</button>
      </div>
    );
  }
}
```

Đã đến lúc chúng ta cần sử dụng Refs cho **ChildComponent** có tên **childRef**. Refs giúp chúng ta có thể refer tới node của **ChildComponent** bằng việc sử dụng .**current**. Nó sẽ in ra tất cả những gì liên quan tới **ChildComponent** và cả **changeName()** nữa. Giờ chúng ta chỉ việc sử dụng **changeName()** trong handleClick() để thực hiện thay đổi state thôi kaka.

![](https://images.viblo.asia/a34eccb1-f6de-45d6-8ebd-82e8b01cc327.png)

```
class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.childRef = React.createRef();
  }

  handleClick = () => {
    // change state of ChildComponent
    console.log("childRef node:", this.childRef.current);
    this.childRef.current.changeName();
  };

  render() {
    const buttonStyle = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "8px",
      fontFamily: "Arial",
      borderRadius: "3px"[](https://codesandbox.io/s/updatestatefromparentcomponent-dyd24)
    };

    return (
      <div className="App">
        <h1>Update state from parent component</h1>
        <h2>Click Change Button to see result!</h2>
        <ChildComponent ref={this.childRef} />
        <br />
        <button onClick={this.handleClick} style={buttonStyle}>
          Change name
        </button>
      </div>
    );
  }
}
```

Tada, vậy là ví dụ của chúng ta đã hoàn thiện rồi. Bạn có thể xem code và run tại đây nhé[ CodeSanbox](https://codesandbox.io/s/updatestatefromparentcomponent-dyd24)
### 3. Kết luận:
Giờ đây việc thay đổi State bằng action ở ngoài component đã trở nên đơn giản khi có Refs phải không nào!!!

## Tài liệu tham khảo:
- https://reactjs.org/docs/state-and-lifecycle.html
- https://www.freecodecamp.org/news/react-changing-state-of-child-component-from-parent-8ab547436271/