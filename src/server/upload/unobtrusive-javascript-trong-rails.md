# **Giới thiệu**

Gần đây tôi đã chọn Ruby và để làm quen với ngôn ngữ này, tôi quyết định xây dựng một ứng dụng nhỏ bằng Ruby on Rails. Trong khi làm việc với dự án, nhu cầu tạo nội dung trên một trang mà không cần tải lại (reload) trang đã xuất hiện. Có một chút bực bội khi cố gắng để có được một bài viết giải thích khái niệm này cho một người mới, vì vậy tôi quyết định viết về nó.

JavaScript là một ngôn ngữ rất mạnh mẽ; Đối với tôi, nó thống trị web. Một trong những cách sử dụng JavaScript phổ biến nhất là cập nhật nội dung của trang mà không phải tải lại trang (hay còn gọi là kỹ thuật Ajax). Bài viết này sẽ tập trung vào cách đạt được điều này trong Rails.

Với hầu hết các mã JavaScript ngoài kia, có lẽ người ta sẽ cần truy xuất dữ liệu từ máy chủ và sử dụng JavaScript để thao tác dữ liệu trên trang nhưng với Rails, nó khác với những gì tôi biết.
# **Rails’ AJAX..**
Rails sử dụng một kỹ thuật được gọi là Unobtrusive JavaScript để xử lý việc gắn JavaScript vào DOM. Theo các tài liệu:

*"Chúng tôi gọi đây là Unobtrusive JavaScript  không phô trương vì chúng tôi không còn trộn JavaScript vào HTML. Chúng tôi đã phân tách đúng mối quan tâm của mình, giúp thay đổi trong tương lai dễ dàng."*

Hãy xem một ví dụ đơn giản: 

Hãy giả sử rằng chúng ta có `UsersController` và một  resource route `/user/:name` liên kết đến *controller's* `index` chúng ta có thể thực hiện hành động JavaScript trên một trang từ *controller's*

Trong `UsersController`, thêm đoạn mã sau:
```
class UsersController < ApplicationController
  def index
    render js: "alert("The username to be displayed is: #{params[:name]}")"
  end
end
```

Trong trang `wellcome `của bạn, hãy thêm đoạn mã sau sẽ tạo ra một `Display a name` để có liên kết trên trang:

`<%= link_to "Display a name", display_path("DuyDuKma"), remote: true %>`

Thêm `remote:true` vào thẻ liên kết cho Rails biết bạn muốn thực hiện yêu cầu AJAX và khi chúng tôi nhấp vào liên kết, một cảnh báo JavaScript sẽ bật lên trên trang hiển thị  `The username to be displayed is: DuyDuKma`. Nó rất đơn giản và thậm chí còn kỳ diệu trong ví dụ tiếp theo của tôi.

Cũng giống như tôi, tôi chắc chắn rằng bạn không muốn hiển thị cảnh báo cho người dùng của mình. Bây giờ, hãy để Giả sử hành động chỉ mục `UsersController`'s của `index` thực hiện một số truy vấn quan trọng và trả về một mảng người dùng, tôi muốn hiển thị danh sách người dùng này trên trang của tôi.

Với mục đích của ví dụ này, tôi sẽ liệt kê các tập tin mà tôi sẽ đề cập đến, vì vậy mọi thứ không có gì khó hiểu.

•	`Welcome Page: `Với trang `Display a name` một liên kết để thực hiện yêu cầu AJAX.

•	`index action: `Hành động trong `UsersController` truy vấn cơ sở dữ liệu và kết xuất dữ liệu.

•	`index template:` Tệp JavaScript nhắm mục tiêu thành phần trên trang nơi hiển thị danh sách tên (nằm trong thư mục  `/app/view/users/index.js.erb`).

•	`_index partial: ` Tệp có chứa mẫu để hiển thị tên của người dùng (nằm trong thư mục `/app/view/users/_index.html.erb`)

Quay lại ví dụ thứ hai của tôi. Từ ví dụ trên, tôi đã có một liên kết trên `Welcome Page` của tôi gọi `index action` của `UsersController`. Vì vậy, tiếp theo, tôi sửa đổi mã trong bộ điều khiển của tôi:

```
class UsersController < ApplicationController
  def index
    @users = User.all # a random query that returns an array of imaginary users 
    respond_to do |format|
      format.js
    end
  end
end
```
Trong` index template` của tôi, tôi thêm mã sau đây:

`$("user-list").html(“<%= j render("index", users: @users) %>”)`

Trong đoạn mã trên, tôi sử dụng jQuery để nhắm mục tiêu một div  với id của `user-list` nơi chúng tôi muốn hiển thị danh sách người dùng. Sau đó, tôi lấy nội dung được tạo bởi một phần có tên gọi là `show`là HTML bên trong `div` đó. `J` là `alias` cho phương thức `escape_javascript`,  thoát khỏi trả về dấu ngoặc đơn và dấu ngoặc kép cho các phân đoạn JavaScript. `render (‘index, name: @users)` tìm kiếm một phần tệp có tên là `index` (mà tôi đặt tên là `_index`) và chuyển biến đối tượng `@users` của tôi cho nó như một biến được gọi là users.

Trong phần` _index partial` của tôi, tôi thêm đoạn mã sau:
```
<% if !users.empty? %>
  <ul>
    <% users.each do |user| %>
      <li><%= user.name %></li>
    <% end %>
  </ul>
<% else %>
  <div>
    <p>User not found</p>
  </div>
<% end %>
```
Một phần `_index partial` của tôi mong đợi một biến được gọi là `users`  (đến từ `index template`). Sau đó, nó lặp qua mảng người dùng của tôi và tạo một danh sách người dùng sau đó được chèn vào div ` user-list` của tôi.

Vì vậy, hãy cho phép chạy qua các sự kiện từ thời điểm nhấp vào liên kết  `Display a name` của tôi trên trang chỉ mục:

•	Nhấp vào nút sẽ tạo một yêu cầu AJAX cho `index action` của ` UsersController`.

•	Các `index action` `UsersController` bằng cách tạo truy vấn, nhận phản hồi từ máy chủ của chúng tôi và gửi nó dưới dạng` js`.

•	Rails automatically (một cách kỳ diệu) tìm kiếm một tệp mẫu tương ứng với `index action` là `index.js.erb`.

•	`index template `nhắm mục tiêu một phần tử trên trang và hiển thị một phần và chuyển mảng người dùng sang một phần.

•	Các vòng lặp một phần thông qua mảng người dùng và tạo danh sách người dùng được hiển thị trên trang.

# **Kết Luận**
Tôi chắc chắn ngay bây giờ, bạn làm kinh ngạc về Ajax đã được thực hiện. Điều này giúp bạn làm rất nhiều điều tuyệt vời mà không làm rối tung quan điểm của bạn và nếu nhu cầu thay đổi mọi thứ phát sinh, bạn có thể làm tất cả những việc đó ở một nơi.

Tôi hy vọng điều này đã giúp bạn hiểu cách Unobtrusive JavaScript  hoạt động trong Rails.