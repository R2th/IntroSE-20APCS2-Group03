Hôm nay chúng ta sẽ tìm hiểu về ReactJS, một thư viện JavaScript mã nguồn mở được phát triển bởi Facebook. Mục đích của các nhà phát triển Facebook muốn tạo cho chính trang web của hãng phải có tốc độ thật nhanh mượt mà, nhưng cần phải dễ dàng mở rộng khi dự án càng ngày càng lớn. Với mình thì ReactJS như Jquery version 9.69 vậy, code chạy nhanh và cú pháp logic, cộng đồng Reactjs cũng rất lớn.
# ReactJS có những gì?
## JSX
JSX là 1 cú pháp mở rộng của Javascript, dùng để viết giao diện theo cú pháp HTML trong javascript 1 cách trực quan hơn.
```js
//đây là cú pháp JSX
const h1 = <h1>Hello world</h1>;
```
## Components
ReactJS được xây dựng quanh các component,. ví dụ:
```js
class Divv extends React.Component {
    render() {
        return (
            //đây là cú pháp JSX
            <div>Hello World!</div>
        )
    }
};
ReactDOM.render(<Divv />, document.getElementById('root'));
```

Chúng ta có thể lồng các component với nhau:
```js
// Viết theo cú pháp ES6, bạn phải viết hoa tên class, nếu không sẽ báo lỗi
class Divv extends React.Component {
  render() {
    return (
               <div>
                   <Inputt></Inputt>
                   <Labell></Labell>
               </div>
           )
  }
};

// một cách tạo component khác. sử dụng với component stateless(những component chỉ có chức năng hiển thị)
const Labell = props => {
    return <label>Hello world</label>;
};

class Inputt extends React.Component {
  render() {
    return <input type="button" value="Click"></input>;
  }
};
ReactDOM.render(<Divv />, document.getElementById('root'));
```

## Props
Props là từ viết tắt của properties trong React. Các props giúp các component con có thể tiếp nhận dữ liệu từ component cha, bạn cũng có thể tạo props mặc định trong component. ví dụ: 
```js
class Divv extends React.Component {
  render() {
    return (
               <div>
                   //truyền dữ liệu buttonName có giá trị button 1
                   <Inputt buttonName="button 1"></Inputt>
               </div>
           )
  }
};

class Inputt extends React.Component {
  render() {
    // nhận giá trị từ component cha truyền sang bằng this.props.buttonName
    //lưu ý là biến props không thay đổi được
    return <input type="button" value={this.props.buttonName}></input>;
  }
};
ReactDOM.render(<Divv />, document.getElementById('root'));
```
## State
Các props không thể thay đổi được giá trị. nhưng state thì được. Để thay đổi các state thì bạn sử dụng hàm setState(), sau đó react tự động chạy một loạt sự kiện và cuối cùng là re-render toàn bộ component và người dùng có thể thấy được sự thay đổi ngay lập tức khiến trang web mượt mà hơn. Ví dụ:
```js
class Divv extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
          this.handleClick = this.handleClick.bind(this);
  }
	
  //xử lý khi người dùng click vào nút button
  handleClick(){
	  this.setState({
		  number : this.state.number + 1
	  });
  }
	
  render() {
      return (
          <div>
                <input type="button" onClick={ this.handleClick } value="click"></input>
                <label> Số click: {this.state.number}</label>
          </div>
      );
  }
}

ReactDOM.render(<Divv />, document.getElementById('root'));

```
# Kết luận
Bài viết trên với mục đích giúp cho những bạn mới bắt đầu lập trình với ReactJS có thể biết được những khái niệm cơ bản, và có thể bắt tay vào thực hành luôn. Hy vọng sẽ giúp ích được. Thank you =))