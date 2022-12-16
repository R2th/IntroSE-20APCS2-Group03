**I. Introduction**

   Redux không phải là mới và nó khá là phổ biến. Tuy nhiên, không phải tất cả chúng ta đều biết nó là gì và cách sử dụng nó ra sao. Trong bài này, chúng ta sẽ xem xét một vài lý do tại sao nên sử dụng redux bằng cách phân tích những lợi ích mà nó mang lại. Đầu tiên, chúng ta sẽ đi tìm hiểu cơ bản về Redux và sau đó là cách nó hoạt động bằng một ví dụ cụ thể.

**II. What is Redux**

   Redux là một`predictable state management tool` cho các ứng dụng JS. Nó giúp bạn viết các ứng dụng hoạt động một cách nhất quán, chạy trong các môi trường khác nhau (client, server, and native) và dễ dàng để test. - https://redux.js.org/

   Mặc dù chủ yếu được sử dụng với React, nhưng nó có thể được sử dụng với bất kỳ thư viện hoặc framework JavaScript nào khác. Trọng lượng chỉ ở mức 2KB (bao gồm cả `dependencies`), vì vậy chúng ta không cần quá lo lắng về việc nó có thể làm ứng dụng trở lên nặng nề hơn.

   Với Redux, `state` của ứng dụng được giữ trong một nơi gọi là `store` và mỗi `component` đều có thể access bất kỳ state nào mà chúng muốn từ chúng store này. 

**III. Why we need a state management tool**

   Hầu hết các lib như React, Angular, etc được built theo một cách sao cho các components đến việc quản lý nội bộ các state của chúng mà không cần bất kỳ một thư viện or tool nào từ bên ngoài. Nó sẽ hoạt động tốt với các ứng dụng có ít components nhưng khi ứng dụng trở lên lớn hơn thì việc quản lý  states được chia sẻ qua các components sẽ biến thành các công việc lặt nhặt.

   Trong một app nơi data được chia sẻ thông qua các components, rất dễ nhầm lẫn để chúng ta có thể thực sự biết nơi mà một state đang live. Một sự lý tưởng là data trong một component nên live trong chỉ một component. Vì vậy việc share data thông qua các components anh em sẽ trở nên khó khăn hơn. 

   Ví dụ, trong react để share data thông qua các components anh em,  một state phải live trong component cha. Một method để update chính state này sẽ được cung cấp bởi chính component cha này và pass như props đến các components con.

   Đây là một ví dụ:

   ```
   class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userStatus: "NOT LOGGED IN"}
    this.setStatus = this.setStatus.bind(this);
  }

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
        <Status status={this.state.userStatus} />
        <Login handleSubmit={this.setStatus} />
      </div>
    );
  }
});
   ```

   Giờ chúng ta hãy tưởng tượng rằng nếu một state phải được chia sẻ giữa các component cách khá xa nhau trong một tree components và state này phải được passed từ một component đến một component khác cho đến khi nó đến được nơi mà nó được gọi.

   Cơ bản là, state mà chúng ta đang nói đến phải được nhấc lên một component cha gần nhất và tiếp nữa cho đến khi nó đến được cái component tổ tiên chứa tất cả các components nó cần cái state này sau đó pass cái state này xuống @@. Điêu này sẽ khiến state trở nên khó hơn trong việc maintain và less predictable. 

   Điều này khiến cho bộ phận quản lý state trong app trở lên bừa bộn cũng như app trở lên vô cùng phức tạp. Đó là lý do tại sao chúng ta cần một `state management tool` như `Redux`.

**IV. Understanding how Redux works**

   Cái cách mà Redux hoạt động là khá đơn giản. Nó có 1 store lưu trữ toàn bộ state của app. Mỗi component có thể access trực tiếp đến state được lưu trữ thay vì phải send drop down props từ component này đến component khác.

   Có 3 thành phần của Redux: `Actions`, `Store`, `Reducers`. 

   ***1. Actions in Redux***

   `Actions` đơn giản là các events. Chúng là cách mà chúng ta send data từ app đến Redux store. Những data này có thể là từ sự tương tác của user vs app, API calls hoặc cũng có thể là từ form submission.

   `Actions` được gửi bằng cách sử dụng `store.dispatch()` method, chúng phải có một type property để biểu lộ loại action để thực hiện. Chúng cũng phải có một payload chứa thông tin. Actions được tạo thông qua một action creator.
      Ví dụ:

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

 ***2. Reducers in Redux***

   Reducers là các function nguyên thủy chúng lấy state hiện tại của app, thực hiện một action và trả về một state mới. Những states này được lưu như những objects và chúng định rõ cách state của một ứng dụng thay đổi trong việc phản hồi một action được gửi đến store.

   Đây là một ví dụ về cách mà `educers` hoạt động trong Redux:

   ```
        const LoginComponent = (state = initialState, action) => {
            switch (action.type) {
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

   ***3. Store in Redux***

   `Store` lưu trạng thái ứng dụng và nó là duy nhất trong bất kỳ một ứng dụng Redux nào. Bạn có thể access các state được lưu, update state, và đăng ký or hủy đăng ký các listeners thông qua helper methods.

   Tạo một store cho một login app:

   ```
   const store = createStore(LoginComponent);
   ```

   Các `actions` thực hiện trên một state luôn luôn trả về một state mới. Vì vậy, state này là đơn giản và dễ  đoán.

   Bây giờ, chúng ta đã biết hơn một chúng về `Redux`, hãy trở lại với ví dụ Login component và xem cách cách mà Redux có thể giúp chúng ta được gì.

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

   Rất xịn!

  **V. Other benefits of using Redux**

   *1. Redux makes the state predictable.*
   *2. Maintainability.*
   *3. Debuggable for days.*
   *4. Ease of testing*
   *5. So forth*

 **VII. References**

   https://blog.logrocket.com/why-use-redux-reasons-with-clear-examples-d21bffd5835