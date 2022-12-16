Khi làm việc với React thì khi viết constructor mà không có super() thì sẽ lỗi. Không viết super(props) thì sẽ không thể dùng được this.props trong `constructor`. 
```
class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOn: true };
  }
}
```
Bây giờ chúng ta sẽ cùng tìm hiểu tại sao tại sao lại gọi `super()`. Có thể không gọi không ? Nếu gọi mà không pass props vào thì sao, có tham số khác ngoài props không ?
### Tại sao phải gọi super()
trong  Javascript `super` như là "hàm khởi tạo của class cha" (parent class constructor). Trong ví dụ trên là class `React.Component`. Có nghĩa là bạn không thể dùng `this` cho đến khi gọi `super()`
```
class Checkbox extends React.Component {
  constructor(props) {
    // 🔴 Can’t use `this` yet
    super(props);
    // ✅ Now it’s okay though
    this.state = { isOn: true };
  }
  // ...
}
```
### Không truyền props vào super thì sẽ ra sao ?
Sẽ ra sao khi bạn truyền tham số props vào `super()`. Khi không gọi `super(props)` thì bạn sẽ không thể dùng `this.props` bên trong constructor. Bên trong `React.Component` sẽ xử lý như sau:
```
// Inside React
class Component {
  constructor(props) {
    this.props = props;
    // ...
  }
}
```
Nhưng mà đôi khi bạn chỉ gọi `super()` thay vì `super(props)` ở constructor mà vẫn có thể dùng `this.props` ở `render` hay ở các lifecycle khác ? Bởi vì React sẽ gán props sau khi gọi hàm contructor 
```
  // Inside React
  const instance = new YourComponent(props);
  instance.props = props;
```
Vậy cả khi bạn quên truyền props vào `super()` thì React vẫn sẽ set cho bạn. 
### Có còn tham số nào ngoài props không ?
Khi mà bản React 16.6 được ra mắt cùng với contextAPI mới thì ngoài props ra thì còn có 1 tham số khác đó là `context`.  
### Nguồn
Bài viết mình dịch lại từ đây và có lược bỏ một số chỗ mà mình thấy không cần thiết. Các bạn có thể xem thêm ở đây
https://overreacted.io/why-do-we-write-super-props/