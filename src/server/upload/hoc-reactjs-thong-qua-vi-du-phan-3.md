# 1. Mở đầu.
xin chào các bạn, trong phần 2 mình và các bạn chúng ta đã cùng nhau hoàn thiện những phần tiếp của todo app. Trong phần trước chúng ta đã hoàn thiện: 

* Tạo mock data.
* Thêm gói uuid để tạo id phân biệt cho các item.
* Render Item tại App.
* In gía trị của các Item.
Các bạn có thể tham khảo các bài viết trước ở đây.

[PHẦN 2](https://viblo.asia/p/hoc-reactjs-thong-qua-vi-du-phan-2-eW65Ge2RZDO).
 [PHẦN 1](https://viblo.asia/p/hoc-reactjs-thong-qua-vi-du-phan-1-yMnKMnGaZ7P).
và trong bài viết này chúng ta sẽ xoá item  với 1 popup thông báo - bằng cách tìm hiểu thêm 1 gói đã hỗ trợ sẵn là react-bootstrap-sweetalert.
Nào chúng ta cùng bắt đầu nào.
# 2. Delete Item.
Luồng xử lí của chúng ta ở bài này là khi người dùng click vào nút Delete sẽ hiện ra một popup thông báo xóa sản phẩm cùng với tên sản phẩm đó, khi nhấn vào xác nhận thì mới xóa, còn không thì thôi.
## Bước 1:  Tìm hiểu và sử dụng package SweetAlert.
Về phần demo của SweetAlert các bạn có thể xem tại https://sweetalert.js.org/.
Chúng ta sẽ sử dụng SweetAlert dành cho ReactJS các bạn có thể xem tại https://github.com/chentsulin/sweetalert-react.
Để thêm package chúng ta gõ vào cmd như sau: 
`npm install sweetalert-react --save`
Sau khi thêm package và chạy lại ứng dụng của mình, mở file App.js và import nó vào:
`import SweetAlert from 'sweetalert-react';`
Việc ẩn hay hiện popup alert sẽ dựa vào một state kiểu boolean khai báo trong App.js mặc định là false vì ban đầu nó chưa hiện ra.

```javascript
constructor(props) {    
    super(props);
    this.state = {
        items: Items,
        showAlert: false
    }
}
```
Chúng ta test thử xem package có hoạt động ngon nghẻ không trước đã. Viết đoạn JSX này vào phần return của hàm render.
``` javascript
render() {
    return (
        <div className="container">
            <button onClick={()=>this.setState({ showAlert: true })}>Alert</button>
            <SweetAlert
                show={this.state.showAlert}
                title="Demo"
                text="SweetAlert in React"
                onConfirm={()=>this.setState({ showAlert: false })}
            />
            <Title />
            ...
        </div>
    );
}
```
Nếu click thử vào button mà hiện ra Alert là gần ngon rồi chỉ thiếu mỗi css nữa thôi. 
Theo tác giả: You should import sweetalert.css from cdn, file, node_modules(sweetalert/dist/sweetalert.css) or wherever can find the css code.
Sau một hồi mò mẫm thì chúng ta đã import được css của nó
import './../node_modules/sweetalert/dist/sweetalert.css';
## Bước 2: Xây dựng các hành động ẩn popup SweetAlert.
Sau khi đã import được SweerAlert và cả css của nó thành công, chúng ta tập trung vào các hành động để ẩn popup này. Có 3 hành động chính để ẩn popup:
1. Click vào nút Cancel.
2. Nhấn ESC trên bàn phím.
3.Click vào vùng bên ngoài của popup để ẩn.
Sau khi tìm kiếm trên github của họ chúng ta sửa lại đoạn SweetAlert như sau:
```javascript
<SweetAlert
    show={this.state.showAlert}
    title="Demo"
    text="SweetAlert in React"
    showCancelButton
    onOutsideClick={()  => this.setState({ showAlert: false })}
    onEscapeKey={()     => this.setState({ showAlert: false })}
    onCancel={()        => this.setState({ showAlert: false })}
    onConfirm={()       => this.setState({ showAlert: false })}
/>
```
## Bước 3: Lấy tên của sản phẩm muốn xóa.
Trong popup Alert chúng ta sẽ phải để tên sản phẩm cần xóa vào đó chứ không ghi một đoạn text là "SweetAlert in React" cố định như ở trên.
Trong file App.js ta sẽ tạo ra một state kiểu string để lưu tên sản phẩm muốn xóa và gắn state này vào trong SweetAlert đồng thời sửa luôn title SweetAlert cho hợp lí.
```javascript
constructor(props) {    
    super(props);
    this.state = {
        ...
        titleAlert: ''
    }
}
....
<SweetAlert
    show={this.state.showAlert}
    title="Delete Item"
    text={this.state.titleAlert}
    showCancelButton
    onOutsideClick={()  => this.setState({ showAlert: false })}
    onEscapeKey={()     => this.setState({ showAlert: false })}
    onCancel={()        => this.setState({ showAlert: false })}
    onConfirm={()       => this.setState({ showAlert: false })}
/>
```
Trong file App.js chúng ta viết hàm handleShowAlert với tham số nhận vào là item.
```javascript
handleShowAlert = (item) => {
    console.log(item);
}
```
Tiếp tục ta gắn hàm này vào làm props của Component Item.
```javascript
renderItem = () => {
    let {items} = this.state;
    return mapld(items,(item,index) => {
        return (
            <Item 
                ...
                handleShowAlert={this.handleShowAlert}
            />
        )
    });
}
```
Trong file Item.js ta viết sự kiện onClick cho nút Delete và truyền toàn bộ đối tượng Item vào làm tham số.
```javascript
<button 
    type="button" className="btn btn-danger btn-sm"
    onClick={()=>this.props.handleShowAlert(item)}
>
    Delete
</button>
```
Vậy là khi click vào button Delete ta đã truyền được toàn bộ thông tin Item muốn xóa sang cho file App.js.
Trong App.js hàm handleShowAlert có nhiệm vụ bật popup lên và truyền tên sản phẩm muốn xóa vào popup đó.
```javascript
handleShowAlert = (item) => {
    this.setState({
        showAlert: true,
        titleAlert: item.name
    });
}
```
## Bước 4 : Lấy id của sản phẩm muốn xóa.
Qua các bước trên khi click vào Delete ở sản phẩm nào thì hiện lên một popup với tên của sản phẩm đó.
Để xử lí việc xóa sản phẩm chúng ta cần phải biết id của sản phẩm. Trong các thông tin được gửi sang App.js đã bao gồm cả id giờ ta chỉ việc tạo một state lưu giá trị đó.
```javascript
class App extends Component {
    constructor(props) {    
        super(props);
        this.state = {
            ...
            titleAlert: '',
            idAlert: ''
        }
    }
    ...
    handleShowAlert = (item) => {
        this.setState({
            showAlert: true,
            titleAlert: item.name,
            idAlert: item.id
        });
    }
}
```
## Bước 5 :  Xóa sản phẩm.
Chúng ta chỉ xóa sản phẩm khi popup hiện lên và người dùng bấm OK để xác nhận. Trong sự kiện onConfirm của Component SweetAlert ta sẽ gọi đến một hàm để xử lí xác nhận.
```javascript
<SweetAlert
    ...
    onConfirm={() => this.handleDeleteItem()}
/>
```
Trong hàm handleDeleteItem ta phải lấy state chứa id muốn xóa và state chứa mảng các sp ban đầu .
```javascript
handleDeleteItem = () => {
    let {idAlert, items} = this.state;
}
```
Check độ dài mảng items lớn hơn 0. - Dùng hàm for để duyệt mảng items, ta so sánh id từng phần tử có giống với id muốn xóa không. Nếu giống thì xóa đi.
```javascript
handleDeleteItem = () => {
    let {idAlert, items} = this.state;
    if(items.length > 0) {
        for(let i = 0; i < items.length; i++) {
            if(items[i].id === idAlert) {
                items.splice(i, 1);
                break;
            }
        }
    }
}
```
Việc cuối cùng chúng ta cần làm là khi xóa xong sản phẩm thì ẩn cái popup đi bằng cách thay đổi giá trị state showAlert thành false.
```javascript
handleDeleteItem = () => {
    let {idAlert, items} = this.state;
    if(items.length > 0) {
        ...
    }
    this.setState({
        showAlert: false
    });
}
```
Ở phần trên nếu các bạn kĩ lưỡng có thể khi xóa sản phẩm xong thì set lại các giá trị idAlert và titleAlert về ban đầu, nói chung tùy các bạn.
## Bước 6 : Hiển thị thông báo khi không còn sản phẩm.
Khi chúng ta xóa hết các sản phẩm thì nên hiển thị ra ngoài một câu thông báo cho người dùng biết.
Trong file App.js hàm renderItem ta thêm một câu lệnh điều kiện kiểm tra độ dài của mảng.
```javascript
renderItem = () => {
    let {items} = this.state;
    if(items.length === 0) {
        return <Item item={0} />
    }
    return mapld(items,(item,index) => {
        ...
    });
}
```
Trong file Item.js hàm render ta kiểm tra điều kiện và trả về một kiểu hiển thị riêng.
```javascript
render() {
    let {item,index} = this.props;
    if(item === 0) {
        return (
            <tr>
                <td colSpan="4" className="text-center">  
                    <h4>No Item</h4>
                </td>
            </tr>
        )
    }
    let classNameLabel = '';
    ... 
}
```
# 3 . Tạm Kết.
Bài viết cũng đã khá dài, mình xin kết thúc bài viết tại đây, hẹn gặp lại các bạn trong các phần về sau này.