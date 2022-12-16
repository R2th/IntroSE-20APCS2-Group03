Chao,
Hôm nay mình có bài giới thiệu với các bạn một Framework mới đang rất được quan tâm trong thời gian gần đây, đó chính là ReactJS
Nội dung phần chia sẻ của mình sẽ gồm các mục chính sau: 
* ReactJs là gì, nó hoạt động ra sao?
* Cấu hình, cài đặt ReactJs với server Rails
* Một số thành phần cơ bản của ReactJs
* Bài tập vận dụng: Build một app rails hoạt động tốt với ReactJs
* Ưu-nhược điểm của ReactJs
Nào, bây giờ hay cùng lượt qua từng mục ;)
# ReactJs là gì?
**React là một thư viện Javascrip được phát triển bởi Facebook dùng chuyên cho thiết kế giao diện**
Nó có 2 loại chính:
* React Native: Được dùng để thiết kế giao diện IOs hoặc Android
* React Js: Được dùng chuyên để thiết kế giao diện Website
Trong phạm vi bài viết này, mình chỉ xin chia sẻ về ReactJs(vì mình đang làm lập trình Web) :D

**Về hoạt động của ReactJs**

React được hoạt động khi người dùng gửi request lên server, mớ response đó sẽ được server gửi trả kèm theo mã js React, điều này giúp cho React có thể xử lý và hiển thị data lên view theo cách mình muốn.

Điều này có nghĩa là khi server gửi trả mớ response cùng mã js react cho client, sẽ có 2 trường hợp xảy ra

1. Mã js react cho client được gửi đi ngay trên server và sau đó, client có thể dùng mã đó để render ra HTML tương ứng
2. Mã js react render ra HTML tương ứng ngay trên server rồi mới gửi xuống client

Chúng ta có thể thấy ở thời điểm ban đầu, ReactJs dùng cách 1 để gửi data từ server về client, nó sẽ phát sinh ra một vấn đề tương đối lớn là những đối tượng gửi đi chưa ở dạng HTML, nên Goolge khó mà bắt được những kết quả đó cho quá trình SEO. Và phương pháp 2 ra đời để giải quyết được vấn đề ta vừa đặt ra.

Nhưng trên chỉ là thông tin mang tín tham khảo về hai hình thức trền data đi của server, bởi lẽ bây giờ thì Google nó bắt được cả hai loại gửi luôn. Nên bạn không còn phải băn khoăn về việc lựa chọn cách (1) hay (2) nữa. (len)

*Note: React không quan tâm đến server bạn đang dùng là gì nhé, bạn hoàn toàn có thể dùng Ruby, ASP.Net, Java...
*

# Cấu hình và cài đặt React Js trong Rails

Trước tiên, ta cài đặt gem  `gem "react-rails"` sau đó chạy `bundle install`

Tiếp theo, bạn chạy lệnh `rails g react:install`  hoặc trực tiếp thêm các `require` sau vào file `application.js`
```
# application.js
  //= require react
  //= require react_ujs
  //= require components
```
Okie, vậy là config đã xong, giờ bạn có thể dùng react như "người trong nhà" :D :D

# Một sống thành phần cơ bản của ReactJs
* Props: Được sử dụng để truyền dữ liệu vào trong React view, bất kì có sự thay đổi nào thì props sẽ được kích hoạt tự động đối với cả thành phần cha và con
* State: Thuộc tính state của React class cho phép chúng ta theo dõi được sự thay đổi trong view. Nó cũng như props cũng sẽ tự động kích hoạt render view khi mà state thay đổi với điều kiện phải gọi method setState.
* Component: React được xây dựng xung quanh các component, chúng ta có thể tái sử dụng component ở nhiều nơi với các trạng thái và thuộc tính khác nhau, trong một component lại chứa một thành phần khác


Đây chỉ là những khái niệm ban đầu, đưng lo lắng nếu như bạn vẫn đang còn bay trên mây, sau khi vào phần ứng dụng, bạn sẽ hiểu nhanh những phần tôi vừa nói, và tôi cũng sẽ lặp lại nó một lần nữa bên dưới để các bạn nắm rõ hơn.

# Bài tập vận dụng: Build một app rails hoạt động tốt với ReactJs

Và đây là phần quan trọng nhất, tạo mới một ứng dụng thật nhanh với ReactJs  ;)

**B1. Ta cần có một ứng dụng còn nguyên tem để dễ dàng hơn cho practice **

Các bạn chạy lệnh sau để tạo một project mới nhé
```
rails new react_demo
```
Cài đặt react gem cho Gemfile -> `bundle install` (đã nói phần trên)
Chạy lệnh 
```
rails g react:install 
```
để cài đặt và require react

Trong ứng dụng này, chúng ta cần một model `User` chưa các thuộc tính `name`, `age`(tạo dữ liệu mẫu trong file seed), một `users_controller` với function `index` để tập tành hiển thị dữ liệu

**B2. Thực hiện code với ReactJS**

```
#users_controller.rb
class UsersController < ApplicationController

  def index
    @users = User.all
  end
end
```

```
#app/view/users/index.html.erb
<%= react_component("Table", {users: @users}) %>

```

Các bạn có thể thấy hiện tại trên trang index.html, mình không hiển thị list @users theo cách truyền thống là dùng vòng lặp Rails hay những thứ tương tự mà lại chỉ có vỏn vẹn một dòng code. Chuyện gì đang xảy ra? :-?

Như tôi đã nói ở trên, sau khi có data từ server, cả data và mã js của react(hoặc đã được render ra HTML tương ứng) sẽ được gửi đồng thời xuống client để hiển thị trên view. Vậy rõ ràng công việc xử lý dữ liệu để hiển thị bây giờ đang do code react thực hiện. Mà tụi nó đang ở đâu? :D

```
#app/assets/javascripts/components/table.jsx
class Table extends React.Component {
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
            <th>Id</th>
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

Trong fodel `app/assets/javascripts/components`, các bạn tạo file table.jsx và khời tạo một class có tên Table kế thừa từ React.Component
Lưu ý: tên class phải trùng với tên mà mình trỏ ở `index.html.erb`

Trong file table.jsx:

```
constructor(props, context) {
    super(props, context);
    this.state = {
      users: this.props.users
    }
  }
```
Vì sao chữ nó nhạt đi thế nhở?-bỏ qua chổ đậm nhạt đó đi nhé, mình sẽ giải thích từng phần code nhỏ trong file table.jsx :-?

Đoạn code trên có ý nghĩa khởi tạo một props, nhận list users được truyền vào và gán nó cho state, có nghĩa là bây giờ `this.state.users` sẽ là list user mình cần hiển thị ở view.
`props` ở đây đóng vai trò như một object, một function có thể nhận giá trị đầu vào
`state` có vai trò làm biến giám sát giá trị đó và bất cứ sự thay đổi nào trên view

```
render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <Users users={this.state.users} />
      </table>
    )
  };
```

Phần code này return về một table-nó cũng chính là table được hiển thị lên view. Nhưng ta lại thấy phần table trên chỉ tường minh mỗi phần `<thead></thead>`, chứ phần `<tbody></tbody>` nó nằm ở đâu thì chả ai thấy. Vậy thì dữ liệu người dùng đâu được hiện ra? :-?

Các bạn hãy nhìn vào dòng code: 

```
<Users users={this.state.users} />
```
Theo thuyết âm mưu, ta hoàn toàn có thể dự đoán được phần `<tbody></tbody>` của table user đã được thay thế và trá hình ở đoạn code này/

Nhìn nó có vẻ như đang khai báo một đối tượng cho class nào đó và gửi đi thằng `this.state.users`

Chắc chắn là thế rồi, phần hiển thị của table đang ở một class có tên Users 

```
#app/assets/javascripts/components/table.jsx
class Users extends React.Component {
  render() {
    var users = this.props.users.map((user) => {
      return (
        <tr>
          <td>{user.id}</td>
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
```

Class này sau khi nhận vào list users thì sẽ map nó và lần lượt render ra từng dòng của table với 3 cột là `id`, `name`, và `age`. Sau đó thì nhét cả cục đó vào `tbody` và return trả về class Table lúc nãy gọi nó.

Và đây chính là view các bạn có được sau khi thực thi những đoạn code trên

![](https://images.viblo.asia/26b82c1c-2fde-4037-b71f-4053d03894dc.png)

Thế đấy, trên là toàn bộ chu trình sinh nở của một quá trình gửi và hiển thị data của ReactJS. Các bạn có thể download demo ở link: [https://github.com/XuanVuPham/react_demo](https://github.com/XuanVuPham/react_demo)
 
 Chúc các bạn sớm nắm bắt được Framwork hay ho này và hẹn gặp lại! :))))