### Giới thiệu

Khi phát triển ứng dụng React , việc tách thành các components cho phép quản lý code dễ dàng hơn. Tuy nhiên, nó đặt ra một vấn đề khác là truyền dữ liệu giữa các components. Vì React chỉ hỗ trợ liên kết dữ liệu một chiều, nên có thể gây nhầm lẫn cho người mới bắt đầu.

Có ba cách mà luồng dữ liệu có thể xảy ra trong các components: Truyền từ Parent sang Child, Child sang Parent hoặc giữa các Sibling. 
```
Parent
 |__ Child
 |__ AnotherChild
```

### Parent to Child

Đầu tiên là cách dễ nhất trong ba phương pháp. Giả sử rằng chúng ta cần truyền state isClicked từ parent sang cho child. Trong khai báo component child, bạn cần chỉ rõ tên biến isClickedParent sẽ được sử dụng trong component child. Trong ví dụ này, ta sẽ chuyển state isClicked của parent cho component child. 

Với quan hệ parent-child thì ta sử dụng props. Component parent sẽ tương tự như đoạn mã sau:
```javascript
import React from 'react';

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: true,
    }
  }

  handleClick = () => {
    this.setState({
      isClicked: true,
    });
  }

  render() {
    return (
       <button onclick={this.handleClick}>Click</button>
       <ChildComponent isClickedParent={this.state.isClicked} />
    );
  }
 }
```

Bạn nên gán giá trị từ parent tức là  this.props.isClickedParent cho State. Component Child sẽ tương tự như đoạn mã sau:

```javascript
import React from 'react';

class Child extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
         isClickedChild: this.props.isClickedParent,
      }
  }

  render(){
      return (
          <div>{this.props.isClickedChild}</div>
      );
  }
}
```
Trong Child ta khai báo một state mới, và giá trị của state này được lấy từ giá trị của parent bằng cách sử dụng props.

 Tuy nhiên, ở đây tại sao lại sử dung this.props.isClickedChild chứ không phải là this.state.isClickedChild mà ta đã khai báo ở trong state của Child. 
 
 Nhiều bạn ko để ý và sẽ sử dụng this.state.isClickedChild thay vì this.props.isClickedChild, một lỗi phổ biến mà nhiều người mắc phải. Khi sử dụng this.props.isClickedChild thì ta sẽ truy cập và sử dụng được giá trị trong component.

### Child to Parent

Ở đây để cập nhật được state cho parent khi state của child có thay đổi bạn cần phải thực hiện một hàm callback. Cách làm như sau:
* Xác định một callback trong parent để lấy dữ liệu ta cần làm tham số.
* Truyền callback đó như một prop cho child.
* Gọi callback bằng cách sử dụng this.props.callback trong child và truyền dữ liệu làm đối số.

Chúng ta cần xác định hàm callback trong parent để xử lý dữ liệu từ child. Component parent sẽ tương tự như sau:
```javascript
import React from 'react'; 

class Parent extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
           isClicked: true,
       }
   } 

   callbackHandlerFunction = (clickStatus) => {
       this.setState({
            isClicked: clickStatus,
       });
   }

   render() {
       return (
           <Child handleClickParent={this.callbackHandlerFunction} />
       );
   }
}
```
Ở đây, hàm callback là callbackHandlerFunction và được truyền vào Child.
```javascript
import React from 'react'; 

class Child extends React.Component {
    constructor(props) {
         super(props);
         this.state = {
               isClicked: false,
         }
    } 

    handleClick = () => {
         this.setState({
              isClicked: true,
         });
         this.props.handleClickParent(true);
    }

    render(){
         return (
            <button onclick={this.handleClick}>Click</button>
        );
    }
}
```
Trong Child ta sử dụng  this.props.handleClickParent để gọi hàm callback và đồng thời truyền dữ liệu cho nó. Khi có yêu cầu thì state của Child được cập nhật và đồng thời nó cũng gọi hàm callback và cập nhật cho Parent.

### Sibling to Sibling

Để truyền dữ liệu từ Sibling sang cho Sibling thì ta sẽ kết hợp những điều trên. Trong ví dụ đã cho, luồng sẽ như sau:
```
 Child => Parent => AnotherChild
```

Không có gì đáng ngạc nhiên, để truyền dữ liệu giữa Sibling, bạn phải sử dụng parent làm trung gian. Đầu tiên truyền dữ liệu từ child sang parent, như là một đối số thành một callback từ parent. Đặt tham số này như một state trên component parent, sau đó truyền nó làm props cho child khác. Child sau đó có thể sử dụng dữ liệu như một props.

### Kết luận
Việc truyền dữ liệu giữa các component React ban đầu có thể hơi khó khăn, nhưng một khi bạn thực hành ba kỹ thuật này, bạn sẽ có thể truyền dữ liệu giữa bất kỳ component nào bạn muốn.


Tài liệu tham khảo: [https://medium.com/@ruthmpardee/passing-data-between-react-components-103ad82ebd17]()