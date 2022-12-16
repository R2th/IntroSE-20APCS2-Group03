# Xử lý lỗi khi sử dụng Ajax trong Rails 6
Có rất nhiều bài báo nói về việc xử lý các lỗi khi sử dụng Ajax với Rails. Tuy nhiên, hầu hết chúng đều khá lỗi thời. Hãy nói về cách để giải pháp Ajax của riêng bạn hoạt động với Rails 6.

Trong Rails 6, các biểu mẫu không yêu cầu rõ ràng tùy chọn remote: true . Các biểu mẫu, theo mặc định, được bật Ajax. Trong trường hợp bạn muốn tắt Ajax, bạn cần đảm bảo thêm tùy chọn local: true . Nếu không, bạn nên sử dụng form_with hoặc form_for ngay lập tức.
### Controller
**Ví dụ**: Ứng dụng có 1 model Room, bạn muốn tạo và cập nhật các bản ghi trong **RoomController** như sau:
```ruby
class RoomController < ApplicationController
  before_action :authenticate_user!
  .
  .
  respond_to :html, :json, :js 
  
  def create
    if @room.save
      redirect_to room_path
    else
      respond_to do |format|
        format.json { render json: @room.errors.full_messages, status: :unprocessable_entity }
        format.js
      end
    end
    
     def update
     @room = Room.find_by params[:id]
    if @room.save
      redirect_to room_path
    else
      respond_to do |format|
        format.json { render json: @room.errors.full_messages, status: :unprocessable_entity }
        format.js
      end
    end
  end
```

### View
Hãy nhớ rằng, trong mẫu Rails thông thường, nếu có lỗi xác thực mô hình - bạn sẽ hiển thị lại trang :new hoặc trang :edit với các lỗi xác thực được hiển thị ở đầu biểu mẫu. Trong trường hợp Ajax, nếu xảy ra lỗi khi tạo thì bạn sẽ cần một tệp erb javascript để xử lý nó. 

Trong thư mục chế độ xem cho bộ điều khiển tương ứng, hãy tạo tệp 'create.js.erb' và để xử lý lỗi cập nhật, hãy tạo tệp 'update.js.erb' . Hai tệp này sẽ cho phép bạn hiển thị thông báo lỗi trên biểu mẫu bằng cách hiển thị một phần có thể được tạo trong thư mục chia sẻ.

**app/view/rooms/create.js.erb**
```ruby
<% if @room.errors.any? %>
    document.getElementById("somediv").innerHTML = "";

    document.querySelector('#somediv').insertAdjacentHTML('afterbegin', '<%= escape_javascript(render "shared/error_messages", object: @room) %>');
<% end %>
```
**app/view/rooms/update.js.erb**
```
<% if @room.errors.any? %>
    document.getElementById("somediv").innerHTML = "";

    document.querySelector('#somediv').insertAdjacentHTML('afterbegin', '<%= escape_javascript(render "shared/error_messages", object: @room) %>');
<% end %>
```

**Note**: *Đảm bảo thêm một div với id được đề cập trong create.js.erb và update.js.erb của bạn ngay phía trên biểu mẫu của bạn. Bạn đã sẵn sàng để bắt đầu!*

Mặc dù Rails và turbolinks hoạt động thực sự tốt với các biểu mẫu và bạn có thể không cần phải triển khai giải pháp Ajax của riêng mình, nhưng mẫu này cực kỳ tiện dụng khi làm việc với Modals.

### Destroy bằng ajax trong rails
Tương tự như create và update, ta cũng tạo một action destroy trong controller như sau:
```ruby
class RoomController < ApplicationController
  def destroy
    respond_to do |format|
      if @room.destroy
        format.html{redirect_to rooms_root_path, notice: t("success.destroy_room", name: @room.name)}
        format.js
      else
        format.html
        format.json{render json: @room.errors, status: :unprocessable_entity}
      end
    end
  end
end
```
Sau đó, trong folder view rooms, bạn tạo một file có tên destroy.js.erb:
```ruby
$(".destroy-room").bind("ajax:success", function() {
   $(this).closest("tr").remove();
});
```
File html trong view có dạng như sau:
```ruby
.
.
<tr>
  .
  .
  <td align="center">
    <%= link_to room_path(room), method: :delete,
      data: {confirm: t(".confirm", name: room.name)}, remote: true,
      class: "btn btn-outline btn-link btn-id destroy-room" do %>
      <i class="fa fa-trash fa-lg animation-resize trash-icon"></i>
    <% end %>
  </td>
</tr>
```
**Note**: *Lưu ý rằng trong thẻ liên kết có chứa class "destroy-room" để có thể gọi tới file js.

### Lỗi Uncaught ReferenceError: $ is not defined With Ruby on Rails
Khi xử lý trong rails 6, mình đã gặp phải lỗi như thế này: $ is not defined With Ruby on Rails. Sau khi tìm hiểu một số cách trên stackoverflow, mình đã sửa được lỗi này bằng các bước như sau:

Đầu tiên mình cái expose-loader bằng yarn:
```
yarn add expose-loader
```
Sau đó sửa một chút ở file environtment.js trong thư mục config/webpack. File environtment của mình đã chỉnh sửa như sau:
```js
const { environment } = require('@rails/webpacker')

const less_loader= {
  test: /\.less$/,
  use: ['css-loader', 'less-loader']
 };
 environment.loaders.append('less', less_loader)

const webpack = require('webpack')

environment.plugins.prepend(
  'Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  })
)

environment.loaders.append("jquery", {
  test: require.resolve("jquery"),
  use: [
    { loader: "expose-loader", options: { exposes: ["$", "jQuery"] } },
  ],
});

module.exports = environment
```
**Note**: *Trước đó, mình đã cấu hình environment.js theo tài liệu document của expose-loader webpack. Tuy nhiên mình gặp một lỗi về "expose loader options misses the property 'exposes'". Cách viết ở trên đã giúp mình sửa được lỗi này. Hi vọng có thể giúp được các bạn nếu gặp một lỗi tương tự.

Nguồn bài viết mình tham khảo: **[Error handling using Ajax in Rails 6](https://medium.com/@aniket.rao92/working-with-errors-using-ajax-in-rails-6-8c11a287feff)** by *Aniket Rao*