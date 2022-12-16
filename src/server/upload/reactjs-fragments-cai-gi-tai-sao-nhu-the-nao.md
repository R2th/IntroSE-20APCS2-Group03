Fragments được giới thiệu trong phiên bản React 16.2.0. Mặc dù chúng đã xuất hiện được một thời gian tuy nhiên chúng ta vẫn chưa sử dụng chúng thường xuyên lý do là chúng ta đã nghe về nó nhưng lại không tìm hiểu về nó.

Vậy chúng là gì và chúng ta có nên bắt đầu sử dụng chúng? Câu trả lời sẽ có trong bài viết này.

## Vấn đề
Trước khi tìm hiểu về Fragments chúng ta hãy cùng nhau tìm hiểu vấn đề sau đây. Trong React các component cho phép trả về nhiều phần tử, thông thường các phần tử này được bọc trong một thẻ `div`. Trong nhiều trường hợp thẻ div bao bọc không liên quan gì và chỉ được thêm vào vì các component của React yêu cầu chỉ được trả về một phần tử. Điều này dẫn đến việc HTML sẽ hiển thị không hợp lệ, nó thật là không tốt đúng không 😄.

Ví dụ: chúng ta có thể có 1 component Table biểu hiện bằng table và có các cột được hiển thị với một component khác là Columns. Nó có thể như thế này:

```
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}
class Columns extends React.Component {
  render() {
    return (
      <div>
        <td>Hello</td>
        <td>World</td>
      </div>
    );
  }
}
```
Điều này dẫn đến một đoạn HTML hiển thị không hợp lệ vì `div` bọc các cột được hiển thị bên trong `<tr>`.
```
<table>
  <tr>
    <div>
      <td>Hello</td>
      <td>World</td>
    </div>
  </tr>
</table>
```
## Giải pháp
Vậy giải pháp cho vấn đề trên là gì? Như mở đầu chúng ta có fragments. React fragments cho phép bạn nhóm các phần tử vào với nhau mà không cần phải bổ sung một thẻ nào bao bọc chúng và nó cũng sẽ không thể hiện ra HTML. Vì vậy về cơ bản chúng ta có thể sử dụng `React.Fragment` để thay thế cho những nơi chúng ta để thẻ `div` bao bọc các phần tử bên trong. Vẫn với ví dụ trên nhưng sử dụng fragment trong component columns:
```
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```
Bây giờ HTML sẽ hiển thị như sau
```
<table>
  <tr>
    <td>Hello</td>
    <td>World</td>
  </tr>
</table>
```
## Các trường hợp sử dụng Fragments
### Trả về nhiều phần tử
Trường hợp phổ biến nhất để sử dụng các fragment là component trả về nhiều phần tử. Với các trường hợp này rất dễ dàng chúng ta thay vì sử dụng div để bọc các phần tử lại với nhau thì chúng ta hãy sử dụng `React.Fragment` để nhóm chúng lại:
```
class Application extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Content />
        <Footer />
      </React.Fragment>
    );
  }
}
```
### Khi có điều kiện để Render
Các fragments cũng có thể sử dụng khi các phần tử render có điều kiện. Chúng làm cho các nhóm phần tử render dễ dàng hơn mà không cần phải tách ra các phần tử ra component khác.
```
class LoginForm extends React.Component {
  render() {
    return (
      <form>
        {this.props.isLoggedIn ? (
            <React.Fragment>
              <h3>Welcome</h3>
              <p>You are logged in!</p>
            </React.Fragment>
        ) : (
            <React.Fragment>
              <h3>Login</h3>
              <label for="username">Username</label><br/>
              <input type="text" id="username" /><br/>
              <label for="password">Password</label><br/>
              <input type="password" id="password" /><br/>
              <input type="submit" value="Login" />
            </React.Fragment>
        )}
      </form>
    );
  }
}
```
### Mảng
Các fragments cũng có thể giúp chúng ta khi render mảng, bời vì các fragments có thể có các `key`. Giả sử bạn có một mảng các đối tượng người dùng và bạn muốn trả về render người dùng từ mảng đó. Bạn cần đặt key cho từng người dùng, do đó bạn sẽ cần sử dụng phần từ `div` để bọc thông tin người dùng. Nhưng các fragments có thể có các key của chính mình vì vậy bạn có thể sử dụng chúng để thay thế cho thẻ `div`:
```
class UserList extends React.Component {
  users = [
    {
      id: 1,
      name: "Jack Bauer",
      email: "jack.bauer@ctu.gov",
      phone: "+358509283928"
    },
    {
      id: 2,
      name: "Tony Almeida",
      email: "tony.almeida@ctu.gov",
      phone: "+358508829378"
    },
    {
      id: 3,
      name: "Chloe O'brian",
      email: "chloe.obrian@ctu.gov",
      phone: "+358508899012"
    }
  ];
  render() {
    return (
      <React.Fragment>
        {this.users.map(user => (
          <React.Fragment key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}
```
## Có nên sử dụng Fragments
Nhìn chung các Fragments có giá trị sử dụng để thay thế cho một thẻ div bao bọc các phần tử. Vậy câu hỏi đặt ra là chúng ta có nên sử dụng chúng? Đã có câu trả lời này trên [StackOverflow](https://stackoverflow.com/questions/47761894/why-are-fragments-in-react-16-better-than-container-divs):
* Nó nhanh hơn một chút và sử dụng ít bộ nhớ hơn (không cần tạo thêm DOM để đánh dấu).
* Một số cơ chế CSS như Flexbox và CSS Grid có mốt quan hệ cha-con đặc biệt và việc thêm div ở giữa khiến chúng ta khó giữ được bố cục mong muốn.
* DOM inspector đỡ lộn xộn hơn (ví dụ div nằm trong tr ở trên)

Với những lý do đó chúng ta nên sử dụng chúng.

## Kết luận
Như vậy chúng ta đã cùng nhau đi tìm hiểu về Fragments trong react. Chúc các bạn học tập hiệu quả.

Bài viết được dịch từ [React Fragment](https://dev.to/tumee/react-fragments-what-why-how-2kh1)