Sau một thời gian dừng lại ở phần một, hôm nay mình quay lại với phần hai trong series bài viết về những vấn đề mình cảm thấy cần lưu ý khi học và làm ReactJs. Chưa chắc đã là phần cuối vì càng làm mình càng thấy có nhiều thứ hay ho cần note lại. Tuy nhiên ở bài viết này mình sẽ cố gắng đưa ra những điều dễ gặp phải trước.
![](https://images.viblo.asia/2edaed5c-4592-4347-a357-656feb8bf074.png)
# State và Props 
Ok đây là 2 khái niệm căn bản nhất khi học ReactJs, việc sử dụng chúng trong ReactJs là điều chắc chắn, tuy nhiên không phải khi nào cũng bắt buộc sử dụng chúng. Dưới đây là một ví dụ:
```JS
import React from 'react';

class ShowName extends React.Component {
  constructor (props) {
    this.state = {
      yourName: props.name
    };
  }

  render () {
    let {yourName} = this.state; 

    return (
      <div>
        <span>{yourName}</span>
      </div>
    );
  }
}
```
Thứ nhất, công việc của *component* chỉ là hiển thị tên mà không tương tác gì, việc sử dụng `state` chỉ như một biến trung gian. Dù nó có thể hiện công việc của *component* nhưng nếu không cần thiết hãy bỏ đi và dùng luôn `props` cho lành.
```JS
    return (
      <div>
        <span>this.props.name</span>
      </div>
    );
```
Thứ hai, việc sử dụng `props` trong trường hợp này tránh được tình huống khi `props` thay đổi mà *constructor* chỉ khởi tạo giá trị cho `state` lần đầu dẫn đến giá trị `state` không đổi còn `props` đã thay đổi rồi.
# setState()
Ngược lại ví dụ trên, khi *component* cần tương tác thì việc sử dụng `state` là điều cần thiết. Tuy nhiên:
*  Không thay đổi `state` một cách trực tiếp, hãy sử dụng `setState()` để *render* lại *component* giúp *component* hiển thị khớp giá trị của `state`.
```JS
// Sai
this.state.yourName = 'TuanNDA';

// Đúng
this.setState({yourName: 'TuanNDA'});
```
*  Khi cập nhật `state` dựa trên giá trị `state` cũ, ReactJs sẽ thực hiện gói nhiều `setState()` để chạy cùng 1 lần, việc bất đồng bộ này sẽ gây ra vấn đề nếu truyền *object* cho `setState()`, để khắc phục điều đó hãy truyền *function* cho nó.
```JS
// Sai
this.setState({yourName: this.state.yourName + yourBirthDay});

// Đúng
this.setState((prevState) => ({
  yourName: prevState.yourName + yourBirthDay
}));
```  
# Key
Khi muốn *render* nhiều *component* bằng hàm `map()`, ví dụ:
```
users.map((user) => <Row user={user} />)
```
Khi đó React thông báo 1 *warning* trong *console* như sau:` “Warning: Each child in an array or iterator should have a unique “key” prop.”`

Có thể mường tượng ra thuộc tính `key` có tác dụng phân biệt các *component* và đảm bảo các *component* ở đúng vị trí của nó.
```
users.map((user) => <Row user={user} key={user.id} />)
```
Hãy gán `key` bằng `id` của `user` để nó luôn là duy nhất, nếu không thì có thể dùng `index`, tuy nhiên nó không được khuyến khích cho lắm.
```
users.map((user, index) => <Row user={user} key={index} />)
```
Một ví dụ khác cho thấy tầm quan trọng của key: http://jsfiddle.net/frosas/S4Dju/

Ngoài ra các bạn có thể vận dụng kể cả khi không dùng `map()` để tối ưu tốt hơn.

# Tạm kết
Phần 2 của mình tạm kết thúc ở đây, mong rằng một số vấn đề trên sẽ giúp đỡ được các bạn trong quá trình học và làm việc với ReactJs. Cảm ơn đã theo dõi và hẹn gặp lại ở một bài khác.