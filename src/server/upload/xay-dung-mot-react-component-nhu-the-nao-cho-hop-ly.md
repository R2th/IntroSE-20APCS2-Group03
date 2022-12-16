# Mở đầu
   Một trong những feature hay nhất của React, một trong vạn lý do mà có rất nhiều người yêu thích khi sử dụng React, đó là vì nó cho bạn khả năng tự do lựa chọn các cách tiếp cận khác nhau đối với từng vấn đề. Là một thư viện cốt yếu sử dụng cho việc thiết kế và xây dựng View, React cung cấp cho bạn vô vàn những phương án khác nhau trong việc bạn gửi các HTTP request như thế nào, bạn thiết kế, trang trí các component của bạn như thế nào, hay việc bạn sử dụng convention nào để đặt tên và rất nhiều vấn đề khác. React để cho bạn toàn quyền quyết định những việc đó. Theo kinh nghiệm của một số người thì đây là điều rất tốt, và thường thì một số bộ convention hoạt động tốt ở một trong các ứng dụng của bạn xây dựng chưa chắc đã là hợp lý đối với các ứng dụng khác, việc sở hữu sự linh hoạt đó là điều ta cần phải đánh giá, xem xét lại. Qua một vài năm ngồi viết, xây dựng các React Component, mình đã tìm hiểu và thống kê được một vài quy chuẩn mà mình thường xuyên làm theo khi xây dựng các component và dưới đây mình muốn chia sẻ những quy định mình tự đúc kết được đó. Và mình rất vui  nếu được nghe những ý kiến khác phản đối hay góp ý  hay thêm các quy chuẩn cho bài viết bởi tất cả dưới đây đều là các tham khảo cá nhân mình thu thập được.

# 1. Một component chỉ nên thực hiện một nhiệm vụ hay có một trách nhiệm duy nhất

   Nếu phải lựa chọn ra một quy định hay nhất, chính xác nhất trong danh sách dưới đây thì chắc chắn cá nhân mình sẽ chọn quy định này. Cách tiếp cận mà mình hướng tới ở đây đó là việc bạn có thể có thật nhiều, rất nhiều các React Component mà bạn thấy cần thiết và đừng bao giờ cảm thấy sợ việc mình đang sử dụng hay xây dựng quá nhiều component. Các component được sinh ra là để kết hợp vào với nhau và bạn nên kết hợp các component với nhau khi thấy nó hợp lý và tránh việc để một component phải thực hiện quá nhiều chức năng.

Một dấu hiệu để nhận biết bạn có thực hiện đúng quy định này không đó là việc kiểm tra xem hàm render của bạn có dài quá mức không. Đó là một biểu hiện của việc một component đang làm quá nhiều việc đáng lẽ ra có thể tách và giao phó cho một component khác. Một biểu hiện đơn giản khác đó là việc component của bạn đang sở hữu quá nhiều state hoặc props.  Nếu bạn đang phải lưu trữ một lượng lớn dữ liệu trong một component, hoặc phải nhận vào đến 10 props  để có thể đảm bảo chắc chắn rằng component đó đã được configure đúng, thì rất có thể bạn nên thay vào đó sử dụng nhiều các component nhận vào ít props hơn. 
    
   Lấy ví dụ về một component được dùng lấy về dữ liệu của các user từ một API, liệt kê các user đó vào một danh sách và cho phép bạn click để xem thông tin của user được chọn. Ta sẽ có khoảng 3 hàm riêng biệt để tạo ra component này. Đầu tiên là xử lý logic HTTP trong hàm `componentDidMount` để lấy về thông tin các user:

```javascript
    componentDidMount() {
        fetchUsersFromMyApi()
            .then(users => this.setState({ users }))
            .catch(error => this.handleErrors(error));
    }
```

Sau đó bạn có đoạn code để liệt kê danh sách các user ra, có thể là trực tiếp trong hàm `render` hoặc trong một hàm khác mà bạn sẽ gọi lại trong hàm `render`:

```javascript
renderUsers() {
  return (
    <ul>
      {this.state.users.map(user =>
         <li key={user.id} onClick={() => this.viewUser(user.id)}>{user.name}</li>
      )}
    </ul>
  )
}
```

Và bạn cần có đoạn logic để set user được active vào trong state:

```javasciprt
viewUser(userId) {
  this.setState({ activeUser: this.state.users[userId] })
}
```

Cuối cùng là đoạn logic trong hàm `render`:

```javascript
render() {
  return (
    <div>
      { this.renderUsers() }
      { this.state.activeUser && <div>output user things here</div>}
    </div>
  )
}
```

Ta có thể dễ dàng tuy code ngắn nhưng component này đang phải làm quá nhiều công việc bên trong nó. Hãy tưởng tượng nếu bạn phải viế t test cho component này, bạn sẽ phải mock ra một request HTTP, kiểm tra xem nó có xử lý đúng trong trường hợp thành công, trường hợp có lỗi hay không, kiểm tra xem nó có liệt kê ra đúng danh sách các user và kiểm tra xem nó có show ra đúng thông tin user được chọn khi bạn click vào từng user hay không. Có quá nhiều test case phải viết ra chỉ cho một component. Thay vào đó, hãy thử tưởng tượng nếu ta có một bộ các component có thể kết hợp lại với nhau.

Component đầu tiên được gọi là `UsersContainer`, có thể sẽ phụ trách việc lấy về dữ liệu của các user từ API và sau đó truyền xuống cho component `UserList`, và cùng lúc đó có thể sẽ render ra component `User`.

Bằng cách làm như trên, bạn sẽ có được một cây các component, với mỗi component chỉ có duy nhất một công việc và sau đó chuyển các phần việc còn lại xuống cho các component con:

* `UserContainer` lấy dữ liệu, hiển thị loading spinner hoặc lỗi, truyền dữ liệu xuống.
* `UserList` liệt kê danh sách các user, giao nhiệm vụ render từng user ra cho component `User`. Theo dõi xem user nào được active.
* `User` có thể render ra từng user riêng biệt và xử lý việc tương tác qua UI.

# 2. Giao phó việc xử lý dữ liệu cho một module bên ngoài
Việc luôn giữ cho các React component của mình được ngắn gọn, xúc tích nhất một cách có thể dường như là một luật lệ chung yêu thích đối với mình, và một trong các cách tốt nhất để làm được điều đó là kéo phần xử lý logic ra ngoài và đặt trong các module riêng. Hãy lại lấy danh sách các user ở trên làm ví dụ, tưởng tượng rằng component phải thực hiện việc gửi request và sau đó xử lý dữ liệu:

```javascript
componentDidMount() {
  this.fetchUsers()
      .then(users => this.processUsersFromApi(users))
      .catch(error => this.handleErrors(error));
}

processUsersFromApi(users) {
  // xử lý dữ liệu user từ Api
}

render() {
  // render một cái gì đó
}
```

Để kiểm tra đoạn code trên bạn sẽ luôn luôn phải đi qua component. Thật sự sẽ rất là khó nếu ta muốn sử dụng lại đoạn xử lý logic này (hãy thử tưởng tượng nếu có nhiều hơn một nơi trong code của ta cần đến đoạn xử lý dữ liệu user lấy về từ Api), và khó để duy trì cho React component có một lượng code vừa đủ mà không có liên quan gì đến UI.

Thay vào đó, tốt nhất ta nên tách đoạn code trên ra một module riêng biệt:

```javascript
import processUsersFromApi from './process-users-from-api'

componentDidMount() {
    this.fetchUsers()
      .then(processUsersFromApi(users))
      .catch(error => this.handleErrors(error));
}

render() {
  // render một cái gì đó
}
```

Giờ đây component đã trở nên ngắn gọn hơn và chứa ít hơn các đoạn logic mà ta phải hiểu để có thể làm việc với nó. Một ích lợi khác đó là từ bây giờ ta đã có thể kiểm tra việc xử lý business logic một cách riêng biệt mà không cần phải mount hay render component đó ra để làm việc đó.

# 3. Sử dụng PropTypes một cách đồng nhất ( hoặc TypeScript/Flow)
   Thật là dễ dàng bị cám dỗ để ta viết một component mà không sử dụng đến PropTypes. Nó liên quan đến việc phải bỏ ra thêm công sức vừa phải viết nó ban đầu, vừa sau đó duy trì trong quá trình ta phát triển một component.  Tuy nhiên, nó cung cấp một lượng giá trị lớn đối với bất kỳ ai sử dụng component của ta, và cho những người khác phải maintain code trong đội ngũ của ta. Bạn sẽ phải cảm ơn chính bản thân mình khi bạn quay lại một component sau 6 tháng và phải loay hoay tìm hiểu làm thế nào để sử dụng nó.

Việc làm tài liệu sử dụng prop types có nghĩa rằng một lỗi chính tả cũng sẽ được phát hiện nhanh hơn bình thường khi ta không sử dụng nó:

```javascript
const UserComponent = () => {}
UserComponent.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}

// sau đó...

class App extends Component {
  render() {
    // sẽ in ra lỗi trên console nếu bạn thiếu thuộc tính isAuthenticated (missing prop)
    return (
      <div>
        <UserComponent isAuthenticatd={true} />
      </div>
    )
  }
}
```

# 4. Có một hàm `render` ngắn gọn và rõ ràng
   Một dấu hiệu cho thấy rằng một component đang phải gánh chịu quá nhiều trách nhiệm đó là nếu hàm `render` của nó trở nên khó hiểu. Sẽ là lý tưởng nếu một component có thể render ra một số lượng ít phần tử DOM, hoặc giao phó việc render các thành phần của nó cho các component khác.

Ví dụ, hãy lấy một component có nhiệm vụ hiển thị một user form. Nó sẽ hiển thị ra một số text field (để giữ cho ví dụ ngắn gọn một chút, mình sẽ bỏ qua một số trường) và một nút search. Output và các class của nút search phụ thuộc vào việc ta submit form hay chưa, và ta sẽ tận dụng được package [classnames](https://github.com/JedWatson/classnames) để có thể set các class tùy theo điều kiện.

```javascriptclass App extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            Your name
            <input
              type="text"
              value={this.state.input}
              placeholder="Enter your name"
              onChange={this.onChange}
            />
          </label>
          {/* Hãy thử tưởng tượng sẽ có thêm một vài textfield, label...*/}
          <button
            type="submit"
            className={classNames('btn', 'btn-primary', {
              loading: this.state.loading,
              disabled: this.state.input === '',
            })}
          >
            {this.state.loading ? 'Loading...' : 'Go'}
          </button>
        </form>
      </div>
    )
  }
}

```

Ngay cả trong ví dụ này thì việc hiểu được component này cũng đã phải tốn một chút công sức. Và đó là kể cả khi một số đoạn code đã được bỏ qua để tránh cho việc bài viết này quá dài. React và JSX vô cùng ấn tượng và nhìn chung là rất dễ theo, nhưng một khi hàm render của bạn có thêm một số chức năng và các câu điều kiện, nó sẽ có nguy cơ có thể trở nên khó để theo dõi.

Một trong các phương án đầu tiên bạn có thể nghĩ đến là việc viết ra một hàm riêng khác chỉ để xử lý button:

```javascript
class App extends Component {
  renderSubmit() {
    return (
      <button
        type="submit"
        className={classNames('btn', 'btn-primary', {
          loading: this.state.loading,
          disabled: this.state.input === '',
        })}
      >
        {this.state.loading ? 'Loading...' : 'Go'}
      </button>
    )
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            Your name
            <input
              type="text"
              value={this.state.input}
              placeholder="Enter your name"
              onChange={this.onChange}
            />
          </label>
          {/* Hãy thử tưởng tượng sẽ có thêm một vài textfield, label...*/}
          {this.renderSubmit()}
        </form>
      </div>
    )
  }
}
```

Đây là một trong những cách hay và hợp lý, nhưng giờ trong khi hàm `render` đã trở nên nhỏ hơn, nhưng tất cả những gì bạn đã làm là chuyển một phần của nó sang một hàm khác. Sẽ có nhiều lúc phương pháp này là đủ để tăng sự mạch lạc rõ ràng, nhưng một khía cạnh gây khó hiểu là nó sẽ trở nên khó hơn để có thể quan sát được button đang sử dụng props hay state nào. Và để làm rõ ràng hơn, ta có thể truyền thêm một vài tham số vào cho hàm render button:

```javascript
class App extends Component {
  renderSubmit(loading, inputValue) {
    return (
      <button
        type="submit"
        className={classNames('btn', 'btn-primary', {
          loading: loading,
          disabled: inputValue === '',
        })}
      >
        {loading ? 'Loading...' : 'Go'}
      </button>
    )
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            Your name
            <input
              type="text"
              value={this.state.input}
              placeholder="Enter your name"
              onChange={this.onChange}
            />
          </label>
          {/* Hãy thử tưởng tượng sẽ có thêm một vài textfield, label...*/}
          {this.renderSubmit(this.state.loading, this.state.input)}
        </form>
      </div>
    )
  }
}
```

Phương pháp này chắc chắn là sẽ tốt hơn vì nó giúp tạo ra sự rõ ràng minh bạch về các giá trị mà button submit cần, nhưng sẽ không có gì có thể cản một developer sẽ bỏ qua cơ chế này và dùng thẳng trực tiếp `this.props` hoặc `this.state` trong hàm. 

Cuối cùng, bước hay nhất, là thay vào đó tận dụng React ở mức cao nhất và tách ra một component Button Submit riêng.

```
class App extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            Your name
            <input
              type="text"
              value={this.state.input}
              placeholder="Enter your name"
              onChange={this.onChange}
            />
          </label>
          <Button
            loading={this.state.loading}
            disabled={this.state.input === ''}
          />
        </form>
      </div>
    )
  }
}
```

Giờ đây thì ta đã có một component gọn nhẹ hơn rất nhiều và đồng thời có một component button có thể sử dụng lại giúp ta tiết kiệm được hơn thời gian trong các lần xây dựng form sau.

# 5. Không lưu trữ những state có thể được tính toán từ props
   Một sai lầm thường được thấy ở những người mới bắt đầu sử dụng React đó là đặt quá nhiều thuộc tính vào trong state và bỏ ra quá nhiều thời gian và công sức để giữ cho chúng đồng bộ. Một đặc điểm rõ ràng của việc này đó là bạn thấy mình liên tục phải sử dụng đến hàm `componentWillReceiveProps` để đối phó khi thuộc tính của component thay đổi và cập nhật lại state. Chính xác hơn là sẽ có những lúc bạn cần phải sử dụng hàm này, nhưng nhìn chung bạn nên tránh việc phải áp dụng nó. 

Nếu bạn cần phải thực hiện một số công việc bất đồng bộ (như thực hiện các HTTP request) lúc component thực hiện việc cập nhật, bạn nên sử dụng `componentDidUpdate`.

Mình đã thử áp dụng một vài quy luật để có thể giúp tránh gặp phải các vấn đề sau:
* Nếu bất kì một dữ liệu nào có thể tính toán thuần túy từ thuộc tính truyền vào của component, ta không nên lưu nó vào state.
* Bất kì dữ liệu nào được component lưu thành state của nó thì chỉ có chính component đó được phép thay đổi dữ liệu đó. Một ví dụ biểu hiện của việc bạn có thể đã sử dụng sai state đó là việc bạn sử dụng đến `this.state.userName` mà không bao giờ cần phải gọi `this.setState` cho nó bên trong một component. Điều này có nghĩa là việc bạn lưu userName vào state đang là vô nghĩa khi mà dữ liệu của nó không bao giờ phải thay đổi hay tính toán lại bên trong nội bộ component đó.

Trong trường hợp đầu tiên, một ví dụ hay đó là một component nhận vào `firstName` và `lastName` làm thuộc tính:

```javascript
<UserProfileLink firstName="Jack" lastName="Franklin" />
```

Bên trong component ta có thể lại quyết định lưu chúng thành `fullName`:

```javascript
class UserProfileLink extends Component {
  constructor(props) {
    super(props);

    this.state = { 
        fullName: this.props.firstName + this.props.lastName 
    }
  }
}
```

Giờ ở trong hàm render ta sẽ gọi đến `this.state.fullName` để hiển thị ra tên đầy đủ của user, và ta đã có một state không bao giờ thay đổi bên trong component nhưng sẽ lại phải sử dụng `componentWillReceiveProps` để giữ cho chúng đồng bộ.

Việc phải giữ cho dữ liệu đồng bộ rất là khó và đó là công việc mà lẽ ra framework nên giải quyết cho bạn. Và thay vì việc phải xử lý công việc này bằng tay, ta có thể trực tiếp tính toán `fullName` ở ngay bên trong hàm `render` thông qua props:

```
class UserProfileLink extends Component {
  render() {
    const fullName = `${this.props.firstName} ${this.props.lastName}`

    return <div>{fullName}</div>
  }
}
```

Nếu việc tính toán trở nên dài hơn và bạn muốn chắc chắn rằng mình đang không tạo đi tạo lại giá trị cho `fullName` ngay cả khi các thuộc tính `lastName` và `firstName` không thay đổi gì mỗi khi component render, bạn có thể tìm hiểu và sử dụng một kĩ thuật gọi là "[memoization](https://addyosmani.com/blog/faster-javascript-memoization/)". Và cũng sẽ có rất nhiều các thư viện có sẵn giúp bạn điều này.

# 6. Đặt tên thống nhất cho các hàm xử lý sự kiện
   Một quy định nhỏ, nhưng lại là một quy định mà ta hay không tuân theo nhất. Thật là dễ dàng để có thể chọn một cái tên cho các hàm xử lý sự kiện trong một React component mà không theo một convention nào và với một component nhỏ hay ứng dụng nhỏ thì đó không phải là vấn đề quá to tát, nhưng với các ứng dụng lớn hơn thì bạn có thể lại phải cảm ơn mình lần nữa khi đã nghĩ ra một convention giúp cho mọi thứ dễ dàng hơn. 

Tất cả các hàm xử lý sự kiện của mình thường được thêm tiền tố `on`, để khi nhìn qua một component ta có thể thấy một cách rõ ràng hàm nào là hàm xử lý sự kiện. Cũng có nghĩa rằng bạn có thể tìm ở trong file với từ khóa `on`  và tìm thấy các method một cách dễ dàng.

Đây là một trong những đặc điểm rất nhỏ thôi nhưng sẽ trở nên ngày càng lớn mỗi lần bạn sử dụng nó trong một component mà bạn đang xây dựng. Việc sở hữu nhiều cách đặt tên khác nhau cho hàm khiến việc đọc code trở nên vô cùng khó khăn hơn. Một convention chính xác như trên có thể không phải là vấn đề, nhưng có một convention như vậy chắc chắn sẽ cải thiện khả năng maintain component của bạn.

# Kết luận
Trên đây là một số quy định mà mình tự đúc kết được cho bản thân trong việc xây dựng một React component. Những quy định trên sẽ giúp cho component của ta trở nên đáng tin cậy hơn, dễ maintain hơn, dễ dàng test hơn và mạch lạc rõ ràng khi làm việc với chúng. Mình mong các bạn có thể bổ sung thêm một vài kinh nghiệm riêng vào danh sách trên hoặc có một phương pháp cách làm khác. Điều tuyệt vời ở React đó là việc bạn có nhiều phương án tiếp cận khác nhau cho một vấn đề nên sẽ rất thú vị khi được xem một cách làm mới của người khác.
## Tham khảo
* https://javascriptplayground.com/habits-of-successful-react-components/