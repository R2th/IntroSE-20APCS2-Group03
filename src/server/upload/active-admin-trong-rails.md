### Sơ lược về Active admin

Gem Active admin được sử dụng để xây dựng nhanh chóng một giao diện trang quản trị đẹp mắt, nhanh chóng và dễ dàng sử dụng.

Chỉ với một số thao tác đơn giản cài đặt và cấu hình cho gem, ta sẽ có thể tạo ra một trang admin tiện lợi nhất.

**Cài đặt**

Trong Gemfile
```
gem 'activeadmin'
```
Sau khi thực hiện cài đặt gem, ta sẽ có một số thao tác cơ bản như sau

Nếu muốn sử dụng một lớp với tên là user, ta cung cấp cho nó với tham số:
```
rails g active_admin:install User
```
Còn nếu không chỉ định, ta sẽ nhận được một lớp với tên mặc định là AdminUser để sử dụng với Devise.
```
rails g active_admin:install
```
Ta thêm một số lớp cần thiết
```
app/admin/dashboard.rb
app/assets/javascripts/active_admin.js
app/assets/stylesheets/active_admin.scss
config/initializers/active_admin.rb
```
Và sau đó chỉ cần chạy migrate và đăng nhập vào `http://localhost:3000/admin` với user mặc định được cung cấp sẵn
```
User: admin@example.com
Password: password
```
Vậy là ta đã đăng nhập được vào trang quản trị hoàn toàn dễ dàng

![](https://images.viblo.asia/f0a9d400-ea67-4aaa-8b66-d5f3a0566832.png)

![](https://images.viblo.asia/c4f00cf8-a2d7-483f-94ae-cb1ddc21f518.png)

Và giờ bắt tay tùy chỉnh để có một trang giao diện hoàn toàn phù hợp với nhu cầu sử dụng.

Trước tiên, ta thêm bảng Book vào active admin với câu lệnh
```
rails g active_admin:resource book
```

như vậy file `books.rb` đã xuất hiện trong thư mục `app/admin` và truy cập vào đường dẫn `http://localhost:3000/admin/books` ta sẽ có giao diện đơn giản

![](https://images.viblo.asia/49f57553-bcc7-4e70-a2ca-763c556029cf.png)

### Tùy chỉnh index

Hiển thị danh sách và thực hiện tìm kiếm là một trong những nhiệm vụ quan trọng trong việc xây dựng một trang quản trị dữ liệu. Và active admin cung cấp các chỉ mục index có sẵn:

* Table: Một bảng được vẽ với mỗi hàng tương ứng là một bản ghi (trong cơ sở dữ liệu).

* Grid: Một tập hợp các hàng và cột với mỗi ô là một bản ghi.

* Blocks: Một tập hợp các hàng (không phải dưới dạng bảng) với mỗi hàng là một bản ghi.

* Blog: Tiêu đề và nội dung chính.

**Multiple Index Pages**

Nếu bạn muốn nhiều hơn một trang chỉ mục cho tài nguyên sách của mình để hiển thị các chế độ xem khác nhau, bạn cần tạo nhiều chỉ mục trong lớp book của mình. Và nếu có nhiều trang chỉ mục, active admin sẽ tạo liên kết ở đầu trang chỉ mục mặc định.

```
index do
  id_column
  column :author
  actions
end

index as: :grid do |book|
  link_to image_tag(book.image_path), admin_book_path(book)
end
```
Và chỉ mục đầu tiên sẽ là trang chỉ mục mặc định. Còn nếu bạn không muốn điều đó, thì có thể sử dụng `default: true` để thay đổi tùy ý.
```
index as: :grid, default: true
```

Khi bạn sử dụng index thì các danh sách hiển thị dữ liệu sẽ bao gồm các trường mà được khai báo trong index và được sắp xếp đúng như trong index. Còn nếu không có index, thì toàn bộ các trường sẽ xuất hiện trên danh sách đầy đủ với đúng thứ tự. Và với việc khai báo thêm `actions` trong index, ta sẽ có được một hành động (có thể là thêm/ sửa/ xóa) trên từng hàng dữ liệu.

**Index Filters**

Theo mặc định, màn hình chính sẽ hiển thị các dữ liệu của books, và bên phải màn hình thực hiện tìm kiếm đối với từng trường dữ liệu đã khai báo cho bảng books (tham khảo hình trên). Để hiển thị bộ tìm kiếm cho từng thuộc tính của bảng, ta khai báo

```
ActiveAdmin.register Book do
  filter :name_book
  filter :price
end
```

Và lưu ý rằng, nếu bạn không khai báo bất kỳ một filter nào trong Book cũng đồng nghĩa với việc toàn bộ các trường trong books đều được hiển thị lên màn hình để có thể filter. Vì vậy, nếu không bỏ đi bất cứ trường nào của đối tượng, thì bạn có không nhất thiết phải khai báo filter. Và nó hữu ích với việc bạn chỉ muốn sử dụng một số trường nhất định.

Active admin hỗ trợ một số loại dữ liệu cho việc tìm kiếm

* string: hiển thị một drop down  để chọn các phần tử.

* date_range: Nhập ngày bắt đầu và kết thúc với calendar

* numeric: hiển thị một drop down  để chọn các phần tử số.

* select: hiển thị một drop down với các giá trị lựa chọn hoặc toàn bộ phần tử.
 
* check_boxes:  hiển thị check box và người dùng có thể bật và tắt để tìm kiếm.

Theo mặc định, nó sẽ chọn ra loại thuộc tính phù hợp cho từng trường. Và dĩ nhiên, ta cũng có thể thay đổi với tùy chọn `:as`
```
filter :author, as: :check_boxes
```

Cả hai loại check_boxes và select đều chấp nhận tùy chọn với collection. Bạn có thể sử dụng collection dưới dạng một Proc 
```
filter :author, as: :check_boxes, collection: proc { Author.all }
```
 
Đôi khi bạn sẽ muốn thay đổi tên hiển thị của filter của trường thì bạn sẽ sử dụng tùy chọn `label`
```
filter :author, label: 'Something else'
```

Một lưu ý hữu ích và tiện lợi: Khi bạn muốn tìm kiếm nhiều thuộc tính sử dụng phuơng pháp tìm kiếm của `Ransack` thì bạn cần phải chỉ định loại dữ liệu mà bạn tìm kiếm cùng với nhãn của nó

```
filter :name_or_author_cont, as: :string, label: "Name"
```

Như đã giới thiệu ở trên thì việc khai báo filter hoặc không khai báo cũng đều giúp ta có các bộ tìm kiếm cần thiết, còn nếu như bạn không muốn sử dụng nó, thì việc vô hiệu hóa nó sẽ được thực hiện đơn giản

```
ActiveAdmin.register Book do
  config.filters = false
end
```

Hay đơn giản là bạn đang muốn thêm hoặc bớt đi một số trường của filter mà không làm ảnh hưởng đến bộ filter mặc định của gem

```
  preserve_default_filters! //giữ nguyên filter mặc định
  filter :author // thêm trường filter
  remove_filter :id // loại bỏ trường filter
```

**Index Scopes**

Ta có thể định nghĩa một số scopes cho trang index.

```
scope :all, default: true

# model sử dụng ':active'
scope :active

# đổi tên model scope
scope "Subcategories", :leaves

# scope không được định nghĩa trên model
scope("Inactive") { |scope| scope.where(active: false) }

# điều kiện trong scope
scope "Published", if: -> { current_admin_user.can? :manage, Books } do |books|
  books.published
end
```

Ngoài những tùy chỉnh nêu trên, ta cũng có một số tùy chỉnh đơn giản hơn như `index default sort order` hoặc `index pagination`

```
ActiveAdmin.register Book do
  config.sort_order = 'name_asc' //xác định thứ tự sắp xếp mặc định
  config.per_page = 10 //cho phép số bản ghi hiển thị trên mỗi trang
  config.per_page = [10, 50, 100] //cho phép hiển thị một dropdown với các giá trị tùy chọn trên
end
```

Và Active admin cũng cung cấp cho bạn một số giao diện có sẵn như tạo mới hay chỉnh sửa đối tượng mà bạn không cần phải thêm giao diện html nào cho nó. Chắc hẳn nó là một gem vô cùng hữu ích và tiện lợi rồi :+1:

**Tài liệu tham khảo**

[wiki](https://github.com/activeadmin/activeadmin/wiki)

[index-pages](https://activeadmin.info/3-index-pages.html)