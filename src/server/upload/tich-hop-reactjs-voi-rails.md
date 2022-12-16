# React.js là gì?
React.js là 1 thư viện JavaScript dùng dể xây dựng giao diện người dùng tạo ra bởi Facebook.
# Một số thành phần của React: 
Props:  là properties của một component, chúng ta có thể thay đổi props của component bằng cách truyền dữ liệu từ bên ngoài vào. Props có thể là 1 object, funtion, string, number.....

State: biểu diễn trạng thái của component, state là private chỉ có thể thay đổi bên trong bản thân của chính component đó. Chúng ta có thể change state bằng cách gọi this.setState()

# Vòng đời của component:
Để hiểu về vòng đời của 1 component, chúng ta có thểm xem ảnh sau:
![](https://images.viblo.asia/ed5fccf7-2974-430e-bfb0-c29a9a173e91.png)
# Cài đặt React với Rails:
Thêm `gem "react-rails"` vào Gemfile

Sau đó chạy lệnh:
```
bundle install
rails webpacker:install       # OR rake webpacker:install nếu dùng Rails dưới 5.0
rails webpacker:install:react # OR rake webpacker:install:react
rails generate react:install
```

Sau khi chạy xong: 
* `app/javascript/components/` Chứa các React components
* ReactRailsUJS setup in `app/javascript/packs/application.js`
* `app/javascript/packs/server_rendering.js` cho server-side rendering

<!-- application.html.erb -->
<%= javascript_pack_tag 'application' %>

Tạo Component đầu tiên:
Để tạo component, chúng ta chạy lệnh:

`rails g react:component HelloWorld greeting:string`
Component sẽ được sinh ra ở thư mục mặc định là `app/javascript/components/`

Hoặc tạo component trong thư mục:

`rails g react:component my_subdirectory/HelloWorld greeting:string`

Render trong view:

`<%= react_component("HelloWorld", { greeting: "Hello" }) %>`

# Sử dụng React với Asset Pipeline
React-rails cung cấp pre-bundled React.js và UJS driver.
`rails g react:install`
Sau đó restart server
Sau khi chạy xong"

* Thêm //= requires to application.js
* Tạo thư mục components/ for React components
* add server_rendering.js for server-side rendering

Bây giờ, chúng ta có thể tạo React components in .jsx

```
class Post extends React.Component {
  render() {
    return <h1>{this.props.title}</h1>
  }
}
```

Render component trong views:

`<%= react_component("Post", {title: "Hello World"}) %>`