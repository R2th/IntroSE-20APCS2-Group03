Khi tạo 1 Class Components trong React, chúng ta thường gọi ***super*** trong constructor của Component và cũng như truyền vào nó 1 props. Nhưng có thật sự cần thiết truyền ***props*** vào ***super*** hay không?
React Document có viết
> Class components should always call the base constructor with props.

và class ES6 phải gọi ***super*** nếu chúng là subclass.
Tại sao phải  đưa ***props*** vào trong ***super***? 
```php
class MyComponent extends React.Component {
  constructor(props) { 
    super();
    console.log(this.props); // undefined
    console.log(props); // defined
  }
render() {
    return <div>Hello {this.props.message}</div>; // defined
  }
}
```
Tuy nhiên nếu ta sử dụng ***super(props)***
```php
class MyComponent extends React.Component {
  constructor(props) { 
    super(props);
    console.log(this.props); // props sẽ trả về dữ liệu.
  }
render() {
    return <div>Hello {this.props.message}</div>; // defined
  }
}
```
Như vây, việc truyền hoặc không truyền ***props*** vào trong ***super*** đều không ảnh hưởng đến việc dùng ***this.props*** ở ngoài constructor. 
Nhưng nếu bạn muốn dùng ***this*** trong constructor, bạn cần phải truyền nó vào trong ***super***

**Nguồn tham khảo**: https://stackoverflow.com/questions/30571875/whats-the-difference-between-super-and-superprops-in-react-when-using-e