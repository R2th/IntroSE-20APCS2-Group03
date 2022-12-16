# Nội dung
* Hiểu được ReactJS là gì
* Các thành phần trong ReactJS
* Ưu Khuyết điểm của ReactJS
* Cài đặt và sử dụng.
Chúng ta cùng bắt đầu nhé:
#  ReactJS là gì?
* Reactjs là một thư viện JavaScript tạo ra bởi Facebook chứ không phải framework.
Mục đích của nó là tập trung và hướng vào giao diện của người dùng.
* Hỗ trợ việc xây dựng những thành phần (components) UI có tính tương tác cao, có trạng thái và có thể sử dụng lại được.
* Được xây dựng xung quanh các component.
* Không chỉ hoạt động trên phía client, mà còn được render trên server và có thể kết nối với nhau…
# Các thành phần trong ReactJS
* Props: là properties của một component, chúng ta có thể thay đổi props của component bằng cách truyền dữ liệu từ bên ngoài vào. Props có thể là 1 object, funtion, string, number.....

* State: biểu diễn trạng thái của component, state là private chỉ có thể thay đổi bên trong bản thân của chính component đó. Chúng ta có thể change state bằng cách gọi this.setState().
# Khuyết điểm và ưu điểm:
## Khuyết điểm:
* Khá nặng so với framework khác.
* Ít tài liệu liên quan.
* Chỉ vục phụ tầng view
* Tích hợp vào MVC truyền thống thì cần config lại.
* Khó hiểu đối với người mới bắt đầu.
## Ưu điểm:
* ReactJS giúp việc code js trở lên dễ dàng hơn bao giờ hết với JSX.
* Render React phía server.
* Biết được component của mình sẽ sinh ra mã HTML như thế nào bằng cách nhìn vào source code.
# Cài đặt và sử dụng:
 Thêm gem "react-rails"' và bundle
 tiếp theo install react:
 ```
 rails g react:install
 ```
 mở file application.js và thêm:
 ```
 //= require react
//= require react_ujs
//= require components
```
* Ở file index.html.erb sẽ gọi ReactJs để render HTML với cú pháp <%= react_component("HelloEveryBody") %>
* Chúng ta tạo 1 file hello.jsx trong thư mục 'javascripts/components'
```
class HelloEveryBody extends React.Component {
      render() {
         return <h1>Hello Every Body</h1>
      }
    }
```
   
class HelloEveryBody tương ứng khi gọi ở file HTML. Khi đó React sẽ render ra mã HTML và hiển thị lên.
Tiếp theo chúng ta thử thêm data vào và gọi bằng React xem thế nào nhé.
Chạy lệnh

```
rails g resource User name:string email:string age:integer
```

* users_controller.rb
 ```
 def index
    @users = User.all
  end
 ```
 
* index.html.erb

```
<%= react_component("IndexUser", { users: @users } ) %>
```

* Tương tự mình tạo 1 file trong thư mục 'javascripts/components' là users.jsx
```
class Users extends React.Component {
  render() {
    var users = this.props.users.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.age}</td>
        </tr>
      )
    })

    return(
      <tbody>
        {users}
      </tbody>
    )
  }
}
class Index extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      users: this.props.users
    }
  }
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <Users users={this.state.users} />
      </table>
    )
  };
}
```

Cho mình giải thích 1 tí:
* Ở class Index chúng ta thấy:
    * constructor(props): chúng sẽ thiết lập state
    * super(props): để chúng ta có thể sủ dụng props trong component
Vậy rốt cuộc props và state là gì thì mình đã có giải thích ở các thành phần ở phía trên rồi mình giải thích rõ hơn tí về props:

Propes: props là một attribute của Component. Chúng ta có thể sử dụng props như là một Object hay là một Function vai trò của props là chứa giá trị được chuyển từ bên ngoài vào trong Component. Hiểu nôm na thì theo dỗi sự thay đổi như kiểu $watch của angular và chắc propes truyền dữ liệu kiểu như two-way binding và state thì kiểu các one-way binding Sau đó bạn reder và trả về mã HTML. trong đây mình có gọi đến class Users nhằm render ra dữ liệu bằng <Users users={this.state.users} /> như vậy là mình sẽ gọi đến class Users. Thật ra là ở class Tabe mình có thể ko cần dùng contructor để thiết lập state. và mình có thể viết <Users users={this.props.users} /> nhưng nếu dùng props sẽ dẫn đến tình trạng cả Users và Table đều gọi this.props.users tất nhiên chúng ta có thể đổi tên biến truyền vào là <Users usersS={this.state.users} /> tuy nhiên sẽ khó quản lý hơn và có thể dẫn đến tình trạng duplication và bạn sẽ không biết dữ liệu thật sự nằm ở đâu (https://en.wikipedia.org/wiki/Single_source_of_truth) OK. sau đó bạn sẽ return var users trong thẻ <tbody>

# Tóm lại:
Trên đây là những kiến thức mình biết về React JS hy vọng những bài kế tới mình có những chia sẽ hay hơn về chủ đề này.
[link tham khảo](https://github.com/reactjs/react-rails)