# 1 . React Native hoạt động như thế nào?
![](https://images.viblo.asia/76dac112-c547-4692-921f-206ec3734832.png)

1. Khi ứng dụng khởi động, luồng chính bắt đầu thực thi và bắt đầu tải JS.
2. Khi mã JavaScript đã được tải, luồng chính sẽ gửi nó đến một luồng khác (JS Thread) để giữ phản hồi của luồng chính chịu trách nhiệm về UI. Có một luồng riêng cho JavaScript là một ý tưởng hay, bởi vì khi JS thực hiện một số tính toán nặng nề đóng băng luồng trong một thời gian, luồng UI sẽ không bị ảnh hưởng.
3. Khi React bắt đầu kết xuất Reconciler bắt đầu "diffing" và khi nó tạo ra một DOM (bố cục) ảo mới, nó sẽ gửi các thay đổi đến một luồng khác (Shadow thread).
4. Chủ đề Shadow ("shadow" vì nó tạo các nút shadow) tính toán bố cục và sau đó gửi các tham số / đối tượng bố trí đến luồng chính (UI)
5. Vì chỉ có luồng chính mới có thể hiển thị một cái gì đó trên màn hình, nên luồng shadow sẽ gửi bố cục được tạo đến luồng chính và chỉ sau đó UI mới hiển thị.

# 2. Chia React Native thành 3 phần.
Nói chung, chúng ta có thể tách React Native thành 3 phần

1. React Native - Native side
2. React Native - JS side 
3. React Native - Bridge

Đây là một trong những chìa khóa chính để hiểu hiệu suất React Native. Mỗi bên tự nó vận hành thì là rất nhanh chóng. 

Nút thắt hiệu suất thường xảy ra khi chúng ta chuyển từ phần này sang phần khác quá nhiều.

Để thiết kế một ứng dụng React Native hiệu suất cao, bạn phải giữ cầu nối không vượt qua hạn mức tối thiểu.
# 3. Sử dụng functional components
Nếu component chỉ có tác dụng hiển thị dữ liệu, thay vì dùng **class component** như:
```
class Watch extends React.Component {
  render () {
    return <div>{this.props.hours}:{this.props.minutes}</div>
  }
}
```
Chúng ta có thể dùng **functional component** để thay thế:

```
const Watch = (props) =>
<div>{props.hours}:{props.minutes}</div>;
```

=> Ngắn hơn và không cần sử dụng **this** nữa.

# 4. Sử dụng React.Fragment thay cho div
Tất cả các component phải được gói gọi vào trong 1 **template**, thường thì chúng ta sẽ dùng thẻ **div**.

Vậy trong trường hợp có nhiều thẻ **div** lồng nhau thì sao? 

Nếu sử dụng  `<div><div>...</div></div>` , React sẽ không complie được code của bạn.

May mắn là, React version 16 cung cấp cho chúng ta một feature khá hữu ích, đó là **React.Fragment**. 

**React.Fragment** cho phép chúng ta nhóm một tập hợp các component con mà không cần 2 đầu node. Ví dụ:

```
<div class="app">
  (...a bunch of other elements)
  <div> 
    (my react component)
    <ComponentA></ComponentA>
    <ComponentB></ComponentB>
    <ComponentC></ComponentC>
  </div>
  (...a bunch more elements)
</div>
```

```
<div class="app">
  (...a bunch of other elements)
  <React.Fragment> 
    (my react component) // Thay thế node <div>
    <ComponentA></ComponentA>
    <ComponentB></ComponentB>
    <ComponentC></ComponentC>
  </React.Fragment>
  (...a bunch more elements)
</div>
```

# 5. Follow SoC principle
Xét ví dụ:

```
export class DatePicker extends React.Component {
  state = { currentDate: null };

  handleDateSelected = ({target}) =>
     this.setState({ currentDate: target.value });

  render = () => 
     <input type="date" onChange={this.handleDateSelected}/>
}
```

Component **DatePicker** đang đảm nhận 2 nhiệm vụ: render tample và xử lý user action cùng một lúc. Sẽ tốt hơn nếu chúng ta tách **DatePick** thành 2 component:

```
const DatePicker = (props) => 
  <input type="date" onChange={props.handleDateSelected}/>
```

và

```
export class DatePickerController extends React.Component { 
  // ... No changes except render function ...
  render = () => 
     <DatePicker handleDateSelected={this.handleDateSelected}/>;
}
```

Component **DatePickerContainer** sẽ xử lý tương tác người dùng hoặc call API nếu cần thiết, sau đó sẽ render ra **DatePicker**.

Ý tưởng là, chúng ta sẽ cố gắng chia component sao cho chúng nhỏ nhất có thể để có thể dễ dàng hiểu, test và maintain.

# 6.  Use The React Context API For Passing Props

Có lẽ bạn đã nhiều lần trải qua tình huống mà các component bị lồng nhau quá nhiều cấp, và bạn cần truyền một props từ component cha xuống component con ở cấp dưới, trong đó những component ở giữa chỉ mang tính chất là nơi chung chuyển. Và React Context API xuất hiện để giải quyết vấn đề này giúp bạn.

Trong ví dụ này, mình sẽ tạo một context mới:

```
import React from 'react'

const AuthContext = React.createContext({})

export const AuthProvider = AuthContext.Provider
export default AuthContext
```
ParentComponent là nơi mà mình muốn phân phối props với provider vừa được tạo

```
import React from 'react'
import ChildComponent from './components/ChildComponent'
import { AuthProvider } from './context/AuthContext'

function ParentComponent() {
  const auth = { userId: '123456', loggedIn: true }

  return (
    <AuthProvider value={auth}>
      <ChildComponent />
    </AuthProvider>
  )
}
```

Và bây giờ, tất cả các phần tử con của ParentComponent có thể access vào auth như một props
Thật tuyệt phải không?
Bây giờ tất cả những gì chúng ta phải làm là sử dụng context tại component con. Mình sẽ dùng một function component và useContext Hook để làm điều này:

```
import React, { useContext } from 'react'
import AuthContext from './context/AuthContext'

function ChildComponent() {
  const auth = useContext(AuthContext)

  console.log(auth) // { userId: '123456', loggedIn: true }

  return null
}
```
Nếu có nhiều component con được lồng vào nhau, chúng cũng sẽ có quyền truy cập vào context. Awesome!

# 7. Conditionals in JSX
Viết JXS thật sự rất hay và nó là một trong những tính năng chính của React. Để cải thiện khả năng coding của bản thân, bạn có thể sử dụng một vài mẹo nhỏ này.

Thay vì sử dụng
```
{ return loginAttempts < maxAttempts ? <MyComponent/> : null }
```

chúng ta có thể viết ngắn gọn hơn như thế này:

```
{ return loginAttempts < maxAttempts && <MyComponent/> }
```

Ngoài ra để tối ưu hoá thêm một số case khác của câu lệnh điều kiện.

# 8. React DevTools

React DevTools là một tiện ích mở rộng trình duyệt thú vị có sẵn cho Chrome và Firefox, được phát triển bởi duy trì bởi Facebook React Core Team. Phiên bản mới nhất 4.5.0 ra mắt vào tháng 3 năm 2020 và extension này thực sự hữu ích cho bất kỳ nhà phát triển React nào.

![](https://images.viblo.asia/872e569d-b205-4f3e-9898-2e7e2292bc25.png)

Nó hoạt động tốt với React và React Native, giúp bạn nắm được những gì đang xảy ra bên trong ứng dụng React của bạn

Điều thú vị là một số công ty lớn như Airbnb hay Netflix đều đang sử dụng React và nếu bạn truy cập vào trang web của họ, bạn có thể tìm thấy thông tin về các trang web đó trong browser console nếu bạn đã cài đặt React DevTools

# 9. Hẹn gặp lại bạn trong các bài viết tiếp theo nhé . 😍👍👍👍

Nội dung sưu tầm và đúc kết từ kinh nghiệm của mình. Cảm ơn bạn đọc .