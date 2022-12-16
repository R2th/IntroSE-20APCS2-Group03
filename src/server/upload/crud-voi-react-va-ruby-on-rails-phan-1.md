## Nội dung
1. React là gì?
2. Thiết lập một Rails API cơ bản
3. Xây dựng controller
4. Tích hợp react vào ứng dụng rails
5. Xây dựng component đầu tiên
6. Xây dựng trang hiển thị tất cả các dữ liệu
7. Thêm mới dữ liệu
8. Xóa dữ liệu
9. Sửa dữ liệu
## React là gì?
* Reactjs là một thư viện JavaScript tạo ra bởi Facebook
* Là một thư viện sinh ra để xây dựng giao diện người dùng(UI). Nó không phải framework mà chỉ là thư viện, và trong mô hình MVC nó tương ứng với phần V - View.
* Đây là thư viện được quan tâm nhiều,  hiện nay Facebook, Instagram, Yahoo hay Airbnb đều dùng ReactJS
## Thiết lập một Rails API cơ bản
### Xây dựng model
1. Đầu tiên hãy khởi tạo ứng dụng Rails mới
```
$ rails new item_cart
```
2. Bây giờ hãy tạo model cho ứng dụng
```
$ rails g model Item name:string description:text
```
3. Sau khi tạo model có 2 thuộc tính là name và description. Chúng ta cần thêm model vào database schema bằng lệnh
```
$ rake db:migrate
``` 
### Thêm một số dữ liệu bằng Seed
Trong file `seeds.rb` ở thư mục `db` chúng ta sẽ thêm dữ liệu mẫu vào trong cơ sở dữ liệu:
```
#db/seeds.rb

10.times {
  Item.create!(name: "Item", description: "I am a description.")
}
```
Sau đó vào terminal chạy lệnh
```
$ rake db:seed
```
## Xây dựng controller
Bây giờ chúng ta bắt đầu xây dựng controller. Đầu tiên chúng ta sẽ cài đặt gem `responders`, gem này cho phép chúng ta áp dụng quy tắc `respond_to` cho tất cả các action trong controller. Sau đây hãy thêm gem này vào Gemfile bằng dòng lệnh:
```
gem 'responders'
```
Sau đó mở terminal lên và chạy
```
$ bundle install
```
Tiếp theo chúng ta sẽ thực hiện một điều chình nho nhỏ trong application controller. Bỏ qua việc ném một ngoại lệ, chúng ta sẽ làm cho controller ném ra một phiên trống vì chúng ta sử dụng JSON khác với HTML
```
#application_controller.rb

class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
end
```
Bởi vì đây là một ứng dụng dựa trên API, chúng ta sẽ xây dựng controller bằng cách sử dụng namespaces. Theo quy ước chúng ta phải đặt các Controller cho các namespaces khác nhau trong các thư mục tương ứng với namespace của chúng. Ví dụ tất cả các controller thuộc namespace api phải được đặt trong thư mục có tên là `api`. Trong thư mục controller của ứng dụng chúng ta khởi tạo một thư mục có tên là `api` và trong nó tạo một thư mục khác có tên là `v1`:
> app/controllers/api/v1
> 
Trong thư mục `app/controllers/api/v1` chúng ta tạo 2 controller.  `Base_controller` sẽ có các quy tắc chung để áp dụng cho tất cả các controller dựa trên API của chúng ta.
```
#basecontroller.rb

class Api::V1::BaseController < ApplicationController
  respond_to :json
end
```
Phương thức respond_to đảm bảo rằng tất cả các hành động từ các controller, được kế thừa từ base_controller, sẽ trả về dạng JSON. Đây là phương pháp chuẩn để xây dựng các API dựa trên JSON. Sau khi xây dựng xong base_controller chúng ta sẽ tạo 1 controller cho model Item vừa tạo ở trên. Controller này sẽ được kế thừa từ base_controller và ở đây chúng ta sẽ xây dựng các actions như index, create, update and destroy:
```
#items_controller.rb

class Api::V1::ItemsController < Api::V1::BaseController
  def index
    respond_with Item.all
  end

  def create
    respond_with :api, :v1, Item.create(item_params)
  end

  def destroy
    respond_with Item.destroy(params[:id])
  end

  def update
    item = Item.find(params["id"])
    item.update_attributes(item_params)
    respond_with item, json: item
  end

  private

  def item_params
    params.require(:item).permit(:id, :name, :description)
  end
end
```
Phương thức respond_with là 1 phương thức của gem `responders` và sẽ trả về một đối tượng JSON với kết quả của mỗi action trong Controller.

Xây dựng routes:
```
#app/config/routes.rb

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :items, only: [:index, :create, :destroy, :update]
    end
  end
end
```
Bây giờ để xem mọi thứ có hoạt động không chúng ta truy cập
> http://localhost:3000/api/v1/items.json
> 
Nếu bạn nhìn thấy một mảng cho các đối tượng JSON. Good! Bạn có thể tiếp tục.

Chúng ta đã hoàn thành việc xây dựng API, bây giờ là việc xây dựng Controller để hiển thị:
```
#app/controllers/site_controller.rb

class SiteController < ApplicationController
  def index
  end
end
```
```
#app/config/routes.rb

Rails.application.routes.draw do
  root to: "site#index"
  .........
```
##  Tích hợp react vào ứng dụng rails
Thêm gem `react-rails` vào Gemfile
```
gem 'react-rails'
```
Sau đó chạy
```
$ bundle install
```
Tiếp đó để thêm thư viện JavaScript vào thư mục assets của bạn chúng ta chạy lệnh:
```
$ rails g react:install
    create app/assets/javascripts/components
    create app/assets/javascripts/components/.gitkeep
    insert app/assets/javascripts/application.js
    insert app/assets/javascripts/application.js
    insert app/assets/javascripts/application.js
    create app/assets/javascripts/components.js
```
Thư mục `components` là nơi chúng ta sẽ sử dụng để xây dựng các file js. Chúng được sử dụng để phân tách các phần khác nhau của giao diện người dùng và được cấu trúc trong mối quan hệ cha-con. Ví dụ: giả sử bạn muốn tạo bố cục đơn giản với nội dung, tiêu đề và các danh mục thì đây sẽ là cách phân cấp cấu trúc của nó:
![](https://images.viblo.asia/300b5e99-5e17-4e8c-a517-e04854eda4b2.png)

`Main` trả về `header` và `body` và gửi thông tin xuống phân cấp. `Header` có thể nhận thông tin về `current user` or `menu` còn `body` có thể nhận được một mảng các `item`. `Items` sẽ lấy thông tin và tạo ra một danh sách `item` chứa các dữ liệu về đối tượng, `Attributes` sẽ chứa các thông tin của `item` và `Actions` sẽ chứa nút xóa và sửa.

Để cho rails có thể nhận được các React components chúng ta cần thêm helper view react_component vào route gốc của chúng ta.
```
#app/views/site/index.html.erb

<%= react_component 'Main' %>
```
`react_component` là phương thức của react-rails. Trong ví dụ trên nó trả về một component có tên là `Main` từ thư mục `components` trong  thư mục `assets` để hiển thị ra View.

## Xây dựng component đầu tiên
Đầu tiên chúng ta cần làm là thiết lập một tệp jsx trong thư mục component của chúng ta.
```
// app/assets/javascripts/components/_main.js.jsx

var Main = React.createClass({
  render() {
    return (
      <div>
        <h1>Hello, World!</h1>
      </div>
    );
  }
});
```
Các file có đuôi js.jsx trong React components hoạt động giống như html.erb trong Rails. Trong ví dụ ở trên phương thức `render()` sử dụng để trả về một trang html tĩnh. Phương thức `render()` cũng kích hoạt được `render()` cho tất cả các components con của components cha, cuối cùng nó sẽ in tất cả các components lên trang. Mỗi thành phần React chỉ có thể trả về một phần tử, vì vậy tất cả các phần tử jsx trong câu lệnh trả về cần nằm trong một thẻ bao bọc.

Component <Main/> có hai components con; <Header/> và <Body/>. Hãy bắt đầu với <Header/> trước.
```
// app/assets/javascripts/components/_header.js.jsx

var Header = React.createClass({
  render() {
    return (
      <div>
        <h1>Hello, World!</h1>
      </div>
    );
  }
});
```
Và thay đổi component <Main/> của chúng ta sao cho nó sẽ render <Header/> trong hàm render của nó.
```
// app/assets/javascripts/components/_main.js.jsx

var Main = React.createClass({
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
});
```
Vừa rồi chúng ta đã thực hiện lồng 2 components lại với nhau.

## Kết luận
Ở bài viết này mình đã hướng dẫn các bạn thực hiện tạo project rails, tích hợp react vào project và bắt tay vào xây dựng component đầu tiên. Ở bài sau mình sẽ tiếp tục hướng dẫn các bạn hiển thị dữ liệu sử dụng ruby on rails và react. Bài viết này sẽ còn nhiều thiếu sót rất mong các bạn thông cảm.

Trong bài viết có tham khảo tài liệu tại: https://www.pluralsight.com/guides/building-a-crud-interface-with-react-and-ruby-on-rails

Cảm ơn các bạn đã theo dõi!