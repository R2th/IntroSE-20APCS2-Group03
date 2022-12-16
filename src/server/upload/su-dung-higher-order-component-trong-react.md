### 1. Phân tích vấn đề
Chú thích: HOC là viết tắt của Higher-Order Component.\
Chúng ta hãy cùng đi vào một ví dụ thực tế: Giả sử bạn có một trang web thường xuyên sử dụng modal, như hình chẳng hạn.
![alt](https://i.imgur.com/VXz02G2.png)
Các thao tác cần hiện modal đó là:
+ Click vào từng dòng trong table.
+ Click vào icon User Profile để hiển thị thông tin người dùng đang đăng nhập hoặc login form.
+ ....\
Đây là cách mình xử lý modal cho table.
```javascript
import React from 'react';

const TableModal = ({data, closeModal}) => {
    return (
        // hiển thị dữ liệu
        // xử lý đóng modal
    );
}
const TableRow = ({ data, showModal }) => {
    return (
        <tr onClick={() => showModal(data)}>
            <td>Name</td>
            <td>Gender</td>
            <td>Address</td>
        </tr>
    );
}

class Table extends React.Component {
    constructor() {
        super();
        this.state = {
            modal: {
                show: false,
                data: null
            }
        }
    }
    // hiển thị modal với data được truyền vào.
    showModal = (data) => {
        const { modal } = this.state;
        this.setState({modal: {
            modal: {
                show: true,
                data: data
            }
        })
    }
    // đóng modal, xóa bỏ dữ liệu trong modal
    closeModal = () => {
        this.setState({
            show: false,
            data: null
        })
    }
    
    render() {
        const { modal } = this.state;
        return (
            <table>
                <thead>
                    // table header
                </thead>
                <tbody>
                    <TableRow />
                    <TableRow />
                    <TableRow />
                    {
                        modal.show
                        ? <TableModal data={modal.data} closeModal={this.closeModal} />
                        : null
                    }
                <tbody>
            </table>
        );
    }
}
```
Và do cái icon User Profile cũng cần hiển thị modal chứa thông tin user khi click vào, chúng ta cũng sẽ phải viết ra một vài component và phải xử lý phần hiển thị modal => lặp lại code xử lý modal.
```javascript
class UserProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            modal: {
                show: false,
                data: null
            }
        }
    }
    // đoạn code trong khoảng dấu "*" này đã bị lặp lại, và khi chúng ta
    // có nhiều phần xử lý modal tương tự như thế này,
    // chúng ta rất có khả năng copy đoạn code này nhiều lần.
    *************************************************
    // hiển thị modal với data được truyền vào.
    showModal = (data) => {
        const { modal } = this.state;
        this.setState({modal: {
            modal: {
                show: true,
                data: data
            }
        })
    }
    // đóng modal, xóa bỏ dữ liệu trong modal
    closeModal = () => {
        this.setState({
            show: false,
            data: null
        })
    }
    *************************************************
    render() {
        return (
            {
                this.state.showModal
                ? <UserModal />
                : null
            }
            <button type="button">User Profile</button>
        );
    }
}
```
Vậy, chúng ta giải quyết tình huống này như thế nào???
###  2. HOC và áp dụng vào giải quyết bài toán
Như đã nói ở trên, trong React có một khái niệm gọi là Higher-Order Component. Bản chất của Higher-Order Component là nhận vào một component và trả về một component - Ý tưởng rất đơn giản phải không nào :) (còn việc gì xảy ra bên trong thì ta không biết :D ). Lợi ích của việc sử dụng HOC là chúng ta gom nhóm việc xử lý, tái sử dụng được component.
Một HOC có hình dáng như sau
```javascript
const withModal = WrappedComponent => {
    return class extends React.Component {
     // do something
    }
}
```
Chúng ta hãy cũng dùng HOC để giải quyết vấn đề vừa nêu trên.\
Như đã phân tích, chúng ta đang bị lặp code ở phần xử lý hiển thị và đóng modal. Chúng ta mong muốn rằng HOC mà chúng ta đang chuẩn bị viết sẽ phải xử lý được phần modal đó và sẽ phải áp dụng được với bất kì component nào mà nó nhận vào.\
Hãy cùng xem.
```javascript
import ModalComponent from '../ModalComponent' // giả sử bạn đã có component này.

const withModal = WrappedComponent => {
    return class extends React.Component {
        constructor() {
            super();
            this.state = {
                show: false,
                data: null,
            }
        }
        showModal = (data) => {
            this.setState({
                show: true,
                data: data
            });
        }
        closeModal = () => {
            this.setState({
                show: false,
                data: null
            })
        }
        render() {
            return (
                <React.Fragment>
                    // truyền hàm xử lý hiển thị modal vào component mà kích hoạt hành động click
                    <WrappedComponet showModal={this.showModal} />
                    {
                        this.state.show
                        ? <ModalComponent data={this.state.data}
                                closeModal={this.closeModal}
                          /> // truyền data và hàm xử lý đóng modal vào ModalComponent
                        : null
                    }
                </React.Fragment>
            );
        }
    }
}
export default withModal;
```
Và trong WrappedCompoent, ta viết như sau
```javascript
import React from 'react';
import withModal from './withModal';
class UserProfile extends React.Component {
// viết xử lý của bạn
}
// chúng ta export ra component đã được "nâng cấp"
export default withModal(UserProfile);
```
Đến đây, chúng ta đã có một HOC đẹp đẽ, phân tách được logic xử lý, ko lặp lại code :v.
Tuy nhiên, còn một vấn đề nữa ở đây, với mỗi WrappedComponent chúng ta cần các Modal component khác nhau. Cụ thể: modal hiển thị nội dung khi click vào table khác với modal hiển thị nội dung khi click vào icon User Profile. (khác nhau về giao diện, về cách hiển thị). Lúc này, HOC của chúng ta cần thay đổi một chút
```javascript
const withModal = ModalComponent => WrappedComponent => {
    // xử lý như đoạn code ở trên
}
```
Việc chúng ta viết HOC mới như trên sẽ giúp bạn linh động trong việc viết các component modal, giả sử, bạn muốn viết mới một modal component, thì chỉ cần viết mới và truyền vào withModal, chứ không cần phải sửa lại modal component cũ.
Lúc này, WrappedComponent của bạn sẽ viết như sau
```javascript
import React from 'react';
import withModal from './withModal';
import UserModal from './UserModal';

class UserProfile extends React.Component {
    ...
}

export default withModal(UserModal)(UserProfile)
// bạn có thấy giống hàm connect của redux không???
```
### 3. Kết luận
Trên đây, mình đã giới thiệu với các bạn một ví dụ thực tế sử dụng kĩ thuật sử dụng Higher-Order Component để giải quyết trong React. Đây là một kĩ thuật rất hay, được sử dụng rất nhiều bởi các thư viện, trong đó, phải kể đến như redux - hàm connect, redux-form - hàm reduxForm. Nó giúp bạn tái sử dụng được mã nguồn, phân tách logic.