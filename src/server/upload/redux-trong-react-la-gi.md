Trong bài viết này, mình sẽ đưa ra một số lý do tại sao bạn nên sử dụng Redux bằng cách thảo luận về lợi ích của nó. Đầu tiên, chúng ta sẽ hiểu những điều cơ bản của Redux và cách thức hoạt động của nó. Sau đó, chúng ta sẽ thấy cách sử dụng Redux có thể giúp bạn trong ứng dụng của mình bằng cách sử dụng một thành phần đơn giản nhưng thiết thực.


# Redux là gì?

Nói một cách đơn giản, Redux là một công cụ quản lý trạng thái. Mặc dù nó được sử dụng chủ yếu với React, nhưng nó có thể được sử dụng với bất kỳ khung hoặc thư viện JavaScript nào khác. Nó rất nhẹ ở mức 2KB (bao gồm cả phụ thuộc), vì vậy bạn không phải lo lắng về việc nó làm cho ứng dụng của bạn có kích thước lớn.

Với Redux, trạng thái ứng dụng của bạn được giữ trong một "store" và mỗi thành phần có thể truy cập bất kỳ trạng thái nào mà nó cần từ "store"này. Sâu hơn một chút để xem tại sao bạn có thể cần một công cụ quản lý trạng thái.

## Tại sao cần một công cụ quản lý trạng thái.

Hầu hết các thư viện như React, Angular, v.v. được xây dựng với cách để các thành phần quản lý nội bộ trạng thái của chúng mà không cần đến thư viện hoặc công cụ bên ngoài. Nó hoạt động tốt cho các ứng dụng có ít thành phần, nhưng khi ứng dụng phát triển lớn hơn, việc quản lý các trạng thái được chia sẻ giữa các thành phần trở thành một việc mất thời gian.

Trong một ứng dụng nơi dữ liệu được chia sẻ giữa các thành phần, có thể khó để biết thực sự biết một trạng thái nên sử dụng ở đâu. Lý tưởng nhất là dữ liệu trong một thành phần chỉ nên dùng trong một thành phần, do đó việc chia sẻ dữ liệu giữa các thành phần trở nên khó khăn.

Dưới đây, một ví dụ đơn giản về việc Login trong React. Đầu vào của dữ liệu ảnh hưởng đến những gì được hiển thị bởi thành phần con của nó, thành phần trạng thái:

```
class App extends React.Component {
  constructor(props) {
    super(props);
    // First the Parent creates a state for what will be passed
    this.state = { userStatus: "NOT LOGGED IN"}
    this.setStatus = this.setStatus.bind(this);
  }
  // A method is provided for the child component to update the state of the
  // userStatus
  setStatus(username, password) {
    const newUsers = users;
    newUsers.map(user => {
      if (user.username == username && user.password === password) {
        this.setState({
          userStatus: "LOGGED IN"
        })
      }
    });
  }
 
  render() {
    return (
      <div>
        // the state is passed to the sibling as a props as is updated whenever
        // the child component changes the input
        <Status status={this.state.userStatus} />
        // this method is passed to the child component as a props which it
        // uses to change the state of the userStatus
        <Login handleSubmit={this.setStatus} />
      </div>
    );
  }
});
```
> Lưu ý, dữ liệu này không cần thiết bởi thành phần cha, nhưng vì thành phần con của nó cần chia sẻ dữ liệu, nó phải cung cấp trạng thái.
> 
Bây giờ hãy tưởng tượng những gì xảy ra khi một trạng thái phải được chia sẻ giữa các thành phần cách xa nhau trong cấu trúc thành phần. Trạng thái phải được truyền từ thành phần này sang thành phần khác cho đến khi đến nơi cần thiết.

Về cơ bản, trạng thái sẽ phải được nâng lên thành phần cha gần nhất và tiếp theo cho đến khi nó đến một thành phần chung cho cả hai thành phần cần trạng thái, và sau đó nó được truyền lại. Điều này làm cho trạng thái khó duy trì và dữ liệu được truyền đến các thành phần không cần sử dụng nó!

Rõ ràng rằng việc quản lý trạng thái trở nên lộn xộn khi ứng dụng trở nên phức tạp. Đây là lý do tại sao bạn cần một công cụ quản lý trạng thái như Redux giúp duy trì các trạng thái này dễ dàng hơn. Hãy để có được một cái nhìn tổng quan về các khái niệm Redux trước khi xem xét lợi ích của nó.

# Vậy Redux hoạt động như nào?

Cách Redux hoạt động rất đơn giản. Có một "store" trung tâm chứa toàn bộ trạng thái của ứng dụng. Mỗi thành phần có thể truy cập trạng thái được lưu trữ mà không phải gửi từ thành phần này sang thành phần khác.

Có ba phần xây dựng: actions, store, and reducers. Hãy nói ngắn gọn về cách hoạt động của từng loại. Điều này rất quan trọng vì chúng giúp chúng ta hiểu được lợi ích của Redux và cách sử dụng nó. 

Chúng ta sẽ thực hiện lại ví dụ về Login ở bên trên nhưng lần này sẽ sử dụng Redux

## Actions trong Redux
Nói một cách đơn giản, **action** là sự kiện. Chúng là cách duy nhất bạn có thể gửi dữ liệu từ ứng dụng của mình đến "store" Redux. Dữ liệu có thể là từ các tương tác của người dùng, các lệnh gọi API hoặc là gửi form.

Các hành động được gửi bằng phương thức **store.dispatch()**. Các hành động là các đối tượng JavaScript đơn giản và chúng phải có thuộc tính loại để chỉ ra loại hành động sẽ được thực hiện. Họ cũng phải có một "payload" có chứa thông tin cần được xử lý bằng hành động. Hành động được tạo thông qua Action Creator.

Dưới đây, một ví dụ về hành động có thể được thực hiện trong quá trình đăng nhập trong ứng dụng:
```
{ 
  type: "LOGIN",
  payload: {
    username: "foo",
    password: "bar"
  }
}
```
Dưới đây là một ví dụ về Action Creator

```
const setLoginStatus = (name, password) => {
  return {
    type: "LOGIN",
    payload: {
      username: "foo",
      password: "bar"
    }
  }
}
```
Như đã giải thích trước đó, action phải chứa thuộc tính và sau đó thành phầnkhác sẽ được "payload" lưu trữ.

## Reducers trong Redux

Reducers là các hàm thuần túy lấy trạng thái hiện tại của ứng dụng, thực hiện một hành động và trả về trạng thái mới. Các trạng thái này được lưu trữ dưới dạng đối tượng và chúng xác định trạng thái của ứng dụng thay đổi như thế nào để đáp ứng với hành động được gửi đến "store".

Nó dựa trên hàm "reduce" trong JavaScript, trong đó một giá trị được tính từ nhiều giá trị sau khi thực hiện chức năng gọi lại.

Ví dụ

```
const LoginComponent = (state = initialState, action) => {
    switch (action.type) {

      // This reducer handles any action with type "LOGIN"
      case "LOGIN":
          return state.map(user => {
              if (user.username !== action.username) {
                  return user;
              }

              if (user.password == action.password) {
                  return {
                      ...user,
                      login_status: "LOGGED IN"
                  }
              }
          });
default:
          return state;
      } 
};
```

> Reducers lấy trạng thái trước của ứng dụng và trả về trạng thái mới dựa trên hành động được truyền cho nó.
> 
Vì là các hàm thuần túy, chúng không thay đổi dữ liệu trong đối tượng được truyền cho chúng hoặc thực hiện bất kỳ tác dụng phụ nào trong ứng dụng. Cho cùng một đối tượng, chúng phải luôn tạo ra cùng một kết quả.

## Store trong Redux

Các "store" giữ trạng thái ứng dụng. **Chỉ có một** "store" trong bất kỳ ứng dụng Redux nào. Bạn có thể truy cập trạng thái được lưu trữ, cập nhật trạng thái và đăng ký hoặc hủy đăng ký "listeners" thông qua các phương thức trợ giúp.

Tạo store cho việc đăng nhập:

```
const store = createStore(LoginComponent);
```

Các hành động được thực hiện trên trạng thái luôn trả về một trạng thái mới.  Vì vậy, quản lý trạng thái là rất dễ dàng và có thể dự đoán. 

Bây giờ chúng ta đã biết thêm một chút về Redux, hãy quay lại ví dụ thành phần đăng nhập đã được triển khai trước đó và xem Redux có thể cải thiện thành phần như thế nào.

```
class App extends React.Component {
    render() {
        return (
            <div>
                <Status user={this.props.user.name}/>
                <Login login={this.props.setLoginStatus}/>
            </div>
        )
    }
}
```

Với Redux, có một trạng thái chung trong store và mỗi thành phần có quyền truy cập vào trạng thái. Điều này giúp loại bỏ sự cần thiết phải liên tục chuyển trạng thái từ thành phần này sang thành phần khác.


-----
[Redux còn một số lợi ích khác, giúp chúng ta dễ dàng trong quá trình phát triển](https://blog.logrocket.com/why-use-redux-reasons-with-clear-examples-d21bffd5835/). Có thể mình sẽ đề cập ở bài viết sau.


Cảm ơn mọi người đã theo dõi!