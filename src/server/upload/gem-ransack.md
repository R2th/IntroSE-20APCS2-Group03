Khi làm form tìm kiếm bình thường bạn có thể tự mình viết các câu query, tuy rằng rails cũng có những method như : where, find, order,... nhưng khá là dài dòng nhất là khi phải query với nhiều thuộc tính. Và gem Ransack sẽ là một công cụ hữu ích khi bạn cần làm các công việc như tìm kiếm và sắp xếp.
Ransack có thể tạo cả form search đơn giản (simple) và nâng cao(advanced) cho ứng dụng Ruby on Rails của bạn. Hỗ trợ rails 5.2 6.0 6.1 với ruby > 2.6.6. 
Ransack có thể được sử dụng một trong 2 mode, simple hoặc advance. Để tìm kiếm hoặc lọc không yêu cầu logic phức tạp, có thể sử dụng chế độ simple

# I. Cài đặt 
Để cài đặt bạn thêm dòng sau vào Gemfile sau đó bundle.

`gem 'ransack'`
# II. Cách sử dụng
## Simple mode

Trong controller

Method ransack dùng để tìm kiếm dữ trong database dựa vào các điều kiện được truyền từ params[:q], sau đó kết quả được lấy ra thông qua method result.
```
def index
  @q = Person.ransack(params[:q])
  @people = @q.result(distinct: true)
end
```
Trong view 
- Hai helper trong view là search_form_for và sort_link : 
- search_form_for thay thế form_for để tạo form tìm kiếm trong view
```
<%= search_form_for @q do |f| %>

  # Search if the name field contains...
  <%= f.label :name_cont %>
  <%= f.search_field :name_cont %>

  # Search if an associated articles.title starts with...
  <%= f.label :articles_title_start %>
  <%= f.search_field :articles_title_start %>

  # Attributes may be chained. Search multiple attributes for one value...
  <%= f.label :name_or_description_or_email_or_articles_title_cont %>
  <%= f.search_field :name_or_description_or_email_or_articles_title_cont %>

  <%= f.submit %>
<% end %>

```
- Đối số của f.search_field phải ở dạng như sau:
Attribute_name[_or_attribute_name]..._predicate trong đó attribute_name là tên thuộc tính của model [_or_another_attribute_name] nghĩa là bạn muốn kết hợp thêm thuộc tính khác. _predicate là cont (chứa) , start( bắt đầu với )

Ví dụ trên name_or_description_or_email_cont tức là tìm các Person có name, description hoặc email chứa trong chuỗi nhập vào form.

- Helper sort_link của Ransack giúp header của các table có thể sắp xếp theo thứ tự 
```
<%= sort_link(@q, :name) %>
```
- Các tùy chọn bổ sung có thể được đặt sau các cột thuộc tính, như tiêu đề cột khác hoặc thứ tự sắp xếp mặc định. 
```
<%= sort_link(@q, :name, 'Last Name', default_order: :desc) %>
```
### - Note:
-  Với liên kết polymorphic, bạn có thể chỉ định tên của liên kết 1 cách rõ ràng để tránh trường hợp uninitialized constant Model::Xxxable
```
<%= sort_link(@q, :xxxable_of_Ymodel_type_some_attribute, 'Attribute Name') %>
```
- Sắp xếp theo nhiều trường khác nhau bằng cách chỉ định một mảng có kí tự : Ví dụ bạn có vehicle có mã là hợp lại của 2 thuộc tính character và plate_number, bạn muốn sắp sếp vehicle đó theo tăng dần của character rồi mới đến plate_number bạn có thể sử dụng như sau : 
```
<%= sort_link (@q, :character, ['character asc', 'plate_number asc'], default_sort: :asc) %>
```
- Nhiều trường default_order cũng có thể được chỉ định bằng một hàm băm :
```
<%= sort_link(@q, :last_name, %i(last_name first_name),
  default_order: { last_name: 'asc', first_name: 'desc' }) %>
```
Trong ví dụ này chuyển đối hướng sắp xếp của cả hai trường, theo mặc định ban đầu sắp xếp trường last_name theo thứ tự tăng dần và trường first_name theo thứ tự giảm dần.
- Trong trường hợp bạn muốn sắp xếp theo một số giá trị phức tạp, chẳng hạn như kết quả của một hàm SQL, bạn có thể làm vậy bằng cách sử dụng scope. Trong model định nghĩa scope có tên trùng với trường ảo mà bạn muốn sắp xếp như 
```
class Person < ActiveRecord::Base
  scope :sort_by_reverse_name_asc, lambda { order("REVERSE(name) ASC") }
  scope :sort_by_reverse_name_desc, lambda { order("REVERSE(name) DESC") }
```
- và sau đó bạn có thể sắp xếp theo trường ảo : 
```
<%= sort_link(@q, :reverse_name) %>
```
Các mũi tên chỉ thứ tự liên kết sắp xếp có thể được tùy chỉnh trên toàn cầu bằng cách đặt tùy chọn custom_arrows trong file khởi tạo config/initializers/ransack.rb
Bạn có thể kích hoạt default_arrow được hiển thị trên tất cả các trường có thể sắp xếp hiện không được sử dụng trong việc sắp xếp. Điều này được tắt mặc định nên sẽ không có gì được hiển thị, để tùy chỉnh bạn có thể tùy chỉnh như sau: 

```
Ransack.configure do |c|
  c.custom_arrows = {
    up_arrow: '<i class="custom-up-arrow-icon"></i>',
    down_arrow: 'U+02193',
    default_arrow: '<i class="default-arrow-icon"></i>'
  }
end
```
Hoặc bạn có thể tắt các mũi tên bằng cách đặt hide_sort_order_indicators thành true trong file khởi tạo. Lưu ý điều này sẽ ẩn các mũi tên ngay khi chúng được tùy chỉnh 
```
Ransack.configure do |c|
  c.hide_sort_order_indicators = true
end
```
- Nếu không muốn đặt nó trên global , các sort_link riêng lẻ có thể được hiển thị mà không có dầu mũi tên bằng cách sử dụng như sau:
```
<%= sort_link(@q, :name, hide_indicator: true) %>
```
### Sort_url
- sort_url : giống như sort_link nhưng chỉ trả về url . sort_url có cùng  API như sort_link
```
<%= sort_url(@q, :name, default_order: :desc) %>
<%= sort_url(@q, :last_name, [:last_name, 'first_name asc']) %>
<%= sort_url(@q, :last_name, [:last_name, 'first_name asc']) %>
<%= sort_url(@q, :last_name, %i(last_name first_name),
  default_order: { last_name: 'asc', first_name: 'desc' }) %>
```
## Advanced mode
Advanced search dùng chức năng của nested attributes trong rails để tạo câu query phức tạp với các hành động group and/or được nested. Thao tác này tốn nhiều công hơn một chút nhưng có thể tạo ra một giao diện tìm kiếm khá thú vị , mang lại nhiều quyền lực cho người dùng của bạn. Một nhược điểm đáng chú ý với các tìm kiếm này là kích thước chuỗi tham số tăng lên thường sẽ buộc bạn phải sử dụng phương thức HTTP POST thay cho GET
- Điều đó có nghĩa là bạn cần điều chỉnh routes của mình 
```
resources :people do
  collection do
    match 'search' => 'people#search', via: [:get, :post], as: :search
  end
end
```
và add thêm một action khác vào controller

```
def search
  index
  render :index
end
```
- cập nhật search_form_for của bạn trong view:
```
<%= search_form_for @q, url: search_people_path,
                        html: { method: :post } do |f| %>
```
Khi bạn đã làm như vậy, bạn có thể sử dụng các trình trợ giúp trong Ransack :: Helpers :: FormBuilder để tạo các biểu mẫu tìm kiếm phức tạp hơn nhiều.

### Associations
Bạn có thể dễ dàng sử dụng Ransack để tìm kiếm các đối tượng trong các liên kết has_many và belong_to
VD: 
```
class Employee < ActiveRecord::Base
  belongs_to :supervisor

  # has attributes first_name:string and last_name:string
end
```

```
class Department < ActiveRecord::Base
  has_many :supervisors

  # has attribute title:string
end
```

```
class Supervisor < ActiveRecord::Base
  belongs_to :department
  has_many :employees

  # has attribute last_name:string
end
```
và trong controller
```
class SupervisorsController < ApplicationController
  def index
    @q = Supervisor.ransack(params[:q])
    @supervisors = @q.result.includes(:department, :employees)
  end
end
```
trong view bạn có thể cài đặt form của mình như sau: 
```
<%= search_form_for @q do |f| %>
  <%= f.label :last_name_cont %>
  <%= f.search_field :last_name_cont %>

  <%= f.label :department_title_cont %>
  <%= f.search_field :department_title_cont %>

  <%= f.label :employees_first_name_or_employees_last_name_cont %>
  <%= f.search_field :employees_first_name_or_employees_last_name_cont %>
   <%= f.submit "search" %>
<% end %>
...
<%= content_tag :table do %>
  <%= content_tag :th, sort_link(@q, :last_name) %>
  <%= content_tag :th, sort_link(@q, :department_title) %>
  <%= content_tag :th, sort_link(@q, :employees_last_name) %>
<% end %>

```
nếu bạn gặp khó khăn khi sắp xếp các liên kết hãy thử sử dụng một chuỗi SQL với bảng đa năng : ('departments.title','employees.last_name') thay vì 
:department_title), :employees_last_name).
### Ransack Aliases
Bạn có thể tùy chỉnh tên thuộc tính cho các tìm kiếm Ransack của mình bằng cách sử dụng ransack_alias. Điều này đặc biệt hữu ích cho các tên thuộc tính dài cần thiết khi truy vấn các liên kết hoặc nhiều cột.

```
class Post < ActiveRecord::Base
  belongs_to :author

  # Viết tắt  :author_first_name_or_author_last_name thành  :author
  ransack_alias :author, :author_first_name_or_author_last_name
end
```
Bây giờ thay vì sử dụng :author_first_name_or_author_last_name_cont trong form , bạn có thể sử dụng đơn giản hơn là :author_cont. Điều này giúp tạo ra các tham số truy vấn rõ ràng hơn trong các URL của bạn .
```
<%= search_form_for @q do |f| %>
  <%= f.label :author_cont %>
  <%= f.search_field :author_cont %>
<% end %>
```
### Search Matchers
Ở đây ransack sử dụng các vị ngữ để tìm kiếm. Các vị ngữ được sử dụng trong các truy vấn để tìm kiếm gồm:
* eq (equals). Trả về tất cả các bản ghi có giá trị của trường chính xác bằng một giá trị cho trước.
* not_eq (Not equals) ngược lại của eq
* matches. Trả về tất cả các bản ghi có giá trị của trường như giá trị cho trước.
* does_not_match. Ngược lại matches.
* lt (less than). Trả về tất cả các bản ghi có giá trị của trường nhỏ hơn giá trị cho trước.
* gteq (greater than or equal to). Trả về tất cả các bản ghi có giá trị của trường lớn hơn hoặc bằng giá trị cho trước.
* lteq (less than or equal to). Trả về tất cả các bản ghi có giá trị của trường nhỏ hơn hoặc bằng giá trị cho trước.
* gt (greater than). Trả về tất cả các bản ghi có giá trị của trường lớn hơn giá trị cho trước
* in. Trả về tất cả các bản ghi có giá trị của trường nằm trong danh sách được cho trước.
* not_in. Ngược lại của in.
* cont. Trả về tất cả các bản ghi có giá trị của trường chứa giá trị được cho trước.
* not_cont. Ngược lại của cont.
* cont_any (contains any). Trả về tất cả các bản ghi có giá trị của trường chứa bất kỳ giá trị nào.
* not_cont_any. Ngược lại của cont_any
* cont_all (contains all). Trả về tất cả các bản ghi có giá trị của trường chứa tất cả giá trị cho trước.
* not_cont_all. Ngược lại của cont_all
* start (starts with). Trả về tất cả các bản ghi có giá trị của trường bắt đầu bằng giá trị cho trước.
* not_start. Ngược lại của start
* end (ends with). Trả về tất cả các bản ghi có giá trị của trường kết thúc bằng giá trị cho trước.
* not_end. Ngược lại của end
* true. Trả về tất cả các bản ghi có giá trị của trường là true.
* not_true. Ngược lại của true.
* false. Trả về tất cả các bản ghi có giá trị của trường là false.
* not_false. Ngược lại của false.
* present. Trả về tất cả các bản ghi có giá trị của trường không phải null và không phải là một chuỗi trống.
* blank. Ngược lại của present.
* null. Trả về tất cả các bản ghi có giá trị của trường là null.
* not_null. Ngược lại của null
### Authorization (whitelisting/blacklisting)
Theo mặc định, tìm kiếm và sắp xếp được ủy quyền trên bất kỳ cột nào trong model của bạn và không có các methods/scope nào được đưa vào danh sách trắng. 
Ransack thêm 4 methods vào ActiveRecord:: Base mà bạn có thể xác định như là class methods trong model : ransackable_attributes, ransackable_associations, ransackable_scopes và  ransortable_attributes.
- Đây là 4 phương pháp được triển khai trong Ransack:
* Ransackable_attributes theo mặc định trả về tất cả các tên cột. Được xác định dưới dạng một mảng chuỗi. Để ghi đè với một mảng chuỗi trong whitelist. Ta có thể định nghĩa chỉ những trường nào mà ta muốn: 
```
def ransackable_attributes _auth_object = nil
   %w(column_name1 column_name2 ...)
 End

```
* ransackable_associations
Dùng để định nghĩa (ghi đè) những trường có thể search từ association. mặc định  returns  names của tất cả associations như là một array of strings.  Để ghi đè một whitelist array of strings.Ta có thể định nghĩa lại các trường bên trong ransackable_associations một cách tương tự như ransackable_attributes bên trên.
* ransortable_attributes
mặc định trả về theo names tất cả các attributes có thể sắp xếp như một array strings dùng để override whitelist `ransortable_attributes`  mặc định. Ta có thể định nghĩa lại các trường trong hàm ransortable_attributes tương tự như ransackable_attributes ở bên trên.
* ransackable_scopes
Ta có thể thêm các scopes vào whitelist của các trường có thể search. Vì mặc định không có scope nào nằm trong whitelist, nên những scope được liệt kê ở đây đều là thêm vào
```
 
 def ransackable_scopes(auth_object = nil)
    %w(scope1, scope2 ...)
end
```
### Ransacker
- Trong model 
```
ransacker :created_at do
  Arel.sql('date(created_at)')
end
```
Có thể gán câu truy vấn sql vào bên trong Arel.sql
Có thể truyền type cho kết quả của ransacker (mặc định là string)
```
ransacker :created_at, type: :date do
  # do anything
end
```
### Grouping queries by OR instead of AND
Mặc định AND có thể bị đổi thành OR bằng cách thêm m: 'or' tới query hash. 
Bạn có thể dễ dàng thử trong controller code bằng cách đổi params[:q] trong index thành params[:q].try(:merge, m: 'or') như dưới đây: 

Artist.ransack params[:q].try(:merge, m: 'or').

Thông thường bạn muốn những người dùng có khả năng chuyển đổi giữa AND và OR query, bản có thể muốn cài search form thì m sẽ nằm trong URL params hash nhưng assigned m bằng tay.

Cách nảy hoạt động cả với associations. Tưởng tượng Artist model có nhiều memberships, và nhiều Musicians thông qua Memberships. 

Ransack thực sự là một công cụ hỗ trợ tìm kiếm đơn giản và dễ dàng trong thư viện gem của Ruby on the Rails.

Tài liệu tham khảo :
https://github.com/activerecord-hackery/ransack
https://nddblog.com/posts/ransack-cong-cu-tuyet-voi-giup-tim-kiem-va-sap-xep-du-lieu-don-gian-hon