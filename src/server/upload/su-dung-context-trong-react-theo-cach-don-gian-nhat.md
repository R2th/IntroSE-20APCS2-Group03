# Sử dụng Context trong React theo cách đơn giản nhất


Bạn đã bao giờ gặp trường hợp một Prop được yêu cầu bởi một component ở mọi nơi trong hierarchy tree?

Bạn đã bao giờ thấy bực bội vì phải truyền một prop xuống 1 component trong React chỉ với mục đích đẩy tiếp nó xuống component cháu chưa?

Để giải quyết những khó khăn trên, bạn có thể cân nhắc sử dụng Context API trong React.


## Đặt vấn đề

Trước bắt tay vào tìm hiểu React Context, mình đặt ra bài toán mà bạn gặp phải như sau:

* Bạn có dữ liệu là 1 số với giá trị là tin nhắn “Ông trúng số 100 triệu rồi“
* Bạn cần dữ liệu này trong 2 components: Red và Green.
* Green componentlà con của Blue component và Blue lại là con của Red component. Theo như “gia phả” thì Green là cháu của Red conponent.

Vậy làm thế nào để gửi dữ liệu từ Red đến Green? Thông thường thì bạn sẽ phải gửi dữ liệu xuống Blue trước, sau đó từ Blue mới gửi tới Green.




![](https://images.viblo.asia/3a539540-3f98-468e-919c-6e913c4fa75b.JPG)

Với bài toán trên, bạn sẽ có code như sau:

```
const Green = (props) => (
  <div className="green">{props. message}</div>
)
const Blue = (props) => (
  <div className="blue">
    <Green message={props. message} />
  </div>
)
 
class Red extends Component {
  state = {
    message : 'Ông trúng số 100 triệu rồi'
  }
  render() {
    return  <div className="red">
      {this.state. message}
      <Blue message={this.state. message} />
    </div>
  }

```

Nếu dự án thực tế, bạn có nhiều hơn 3 tầng như trên thì vấn đề nó còn phức tạp và ức chế đến thế nào nữa?

Nếu trước đây, bạn có thể sử dụng Redux hoặc Mobx để xử lý vấn đề này. Từ React 16.3 thì bạn đã có giải pháp ngay trong React rồi. Đó chính là React Context.

## React Context API là gì?

Theo tài liệu nguyên gốc của React mô tả:

> Context is designed to share data that can be considered “global” for a tree of React components


Hiểu đơn giản thì React Context API là cách tạo các biến toàn cục có thể sử dụng trong toàn ứng dụng. Như trong ứng dụng, các giá trị trong theme, user hay current locale… sẽ được sử dụng ở bất kỳ đâu.

Chúng ta cùng xem hình so sánh bên dưới đây:

![](https://images.viblo.asia/700455eb-c1c8-4363-af03-922ba5c98bc1.JPG)

Phần tiếp theo, mình sẽ hướng dẫn cách sử dụng Context trong React nhé. Nhưng để bạn có thể dễ tiếp thu phần này, mình khuyên bạn nên có những kiến thức cơ bản sau:

* Đã biết và phân biệt cách viết component theo kiểu functional hay class
* Đã biết cách sử dụng React Hook.

Cả hai kiến thức ở trên bạn nào chưa biết thì xem lại ở đây nhé [Link](https://reactjs.org/docs/hooks-intro.html)

## Sử dụng React Context
Bài toán ví dụ là chúng ta cần phải quản lý người dùng trong ứng dụng.

Đầu tiên, mình tạo một context đặt tên là: UserContext.js. Tiếp theo, mình tạo một provider (là một component cung cấp các giá trị) và một consumer (là một component sử dụng các giá trị).

## Tạo Context

Đầu tiên, nội dung của UserContext.js

```
import React from 'react';
// here we can initialise with any value we want.
const UserContext = React.createContext({}); 
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
export default UserContext;
```
## Providing Context

Provider cần phải wrap element cha. Vì vậy, chúng ta sẽ wrap App component trong provider.

```
import React from 'react';
import { UserProvider } from './UserContext'
const App = props => {
    const user = { name: 'Ustat', age: 24 };
    
    return (
        <UserProvider value={user}>
            <div> This is App Component </div>
        </UserProvider>
    )
}
export default App;
```

Phần bên dưới đây, chúng ta sẽ tìm cách lấy giá trị từ Context.

## Consuming Context

Việc cung cấp giá trị với provider thì làm giống nhau khi viết component theo kiểu class hay function. Tuy nhiên, với việc lấy giá trị thì cách viết sẽ khác nhau đôi chút giữa 2 trường phái đó.

Viết consumer component theo kiểu class:
```
import React from 'react';
import { UserConsumer } from './UserContext';
class OrderInfo extends React.Component {
    static contextType = UserContext;
    
    componentDidMount() {
        let user = this.context;
        console.log(user); // { name: 'Ustat', age: 24 }
    }
    
    render() {
    
        // use this if you are retrieving value using contextType.
        let user = this.context;
        
        return (
            <div>{user.name}</div>
        )
        
        OR
        
        // use this if you wish to use UserConsumer
        return (
            <UserConsumer>
                {context => {
                    return <div>{context.name}</div>
                }}
            </UserConsumer>
        )
    }
}
```

Viết consumer component theo kiểu function

```
import React, { useContext } from 'react';
import UserContext from './UserContext';
const HomePage = () => {
  const user = useContext(UserContext);
  console.log(user); // { name: 'Ustat', age: 24 }
  return null;
}
```

Vậy là xong.

Hi vọng qua bài viết này, các bạn có thêm một giải pháp để viết code React được sạch sẽ, gọn gàng hơn.

Cảm nhận của bạn về React Context này thế nào?  Để lại bình luận bên dưới cho mình và mọi người biết nhé.