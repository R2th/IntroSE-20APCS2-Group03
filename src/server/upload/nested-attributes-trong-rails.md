Giả sử  ta có một bảng User có các trường id, tên, địa chỉ, tuổi, giới tính. Khi đăng kí người dùng mới chúng ta chỉ có thể lưu 1 bản ghi  của User với các thuộc tính tên, địa chỉ, tuổi, giới tính. Vậy nếu trong trường hợp người dùng có nhiều địa chỉ, làm thế nào để lưu được các địa chỉ đó vào database. Trong trường hợp này chúng ta tách bảng User thành hai bảng khác nhau là User và Address. Khi đó muốn thêm một User có nhiều địa chỉ ta có thể dùng nested attributes để giải quyết vấn đề này. 
Với nested attributes chúng ta có thể lưu đồng thời dữ liệu ở bảng User và bảng Address trong cùng một form
# 1. Định nghĩa 
Nested attributes là một tính năng của active record. Nó cho phép lưu bản ghi của đối tượng thông qua cha của nó.Mặc định tính năng này sẽ bị tắt tuy vậy ta có thể bật lại nó bằng cách sử dụng class method
accepts_nested_attributes_for .
Autosave được bật tự động cho mỗi association sử dụng nested attributes. Do đó khi lưu bản ghi cha, các bản ghi quan hệ của nó và hủy các liên kết được đánh dấu  đều xảy ra trong cùng một transaction. Nếu bất kì một bản ghi quan hệ nào fail (do validation) thì nó sẽ gửi một tin nhắn error cho bản ghi cha và cả quá trình này sẽ bị hủy .
# 2. Cách sử dụng
## 2.1. Quan hệ 1-1
```
class Member < ActiveRecord::Base
  has_one :avatar
  accepts_nested_attributes_for :avatar
end
```

Cho phép tạo Member và Avatar chỉ trong một lần  :

```
params = { member: { name: 'Jack', avatar_attributes: { icon: 'smiling' } } }
member = Member.create(params[:member])
member.avatar.id # => 2
member.avatar.icon # => 'smiling'
```

Có thể update Avatar  thông qua Member như :
```
params = { member: { avatar_attributes: { id: '2', icon: 'sad' } } }
member.update params[:member]
member.avatar.icon # => 'sad'
```

Nếu muốn update Avatar mà không cần cung cấp id thì phải thêm tùy chọn update_only trong model Member

```
class Member < ActiveRecord::Base
  has_one :avatar
  accepts_nested_attributes_for :avatar, update_only: true
end

params = { member: { avatar_attributes: { icon: 'sad' } } }
member.update params[:member]
member.avatar.id # => 2
member.avatar.icon # => 'sad'
```

Mặc định chỉ có thể update trên model được liên kết, nếu muốn destroy thông qua attributes hash  cần thêm option allow_destroy, thêm destroy vào attributes hash, với value là true thì ta sẽ hủy được bản ghi con.

```
class Member < ActiveRecord::Base
  has_one :avatar
  accepts_nested_attributes_for :avatar, allow_destroy: true
end

member.avatar_attributes = { id: '2', _destroy: '1' }
member.avatar.marked_for_destruction? # => true

```

marked_for_destruction? => check xem bản ghi này có bị hủy hay không?

Note: Bản ghi con sẽ không được destroy nếu bạn ghi cha chưa được lưu
## 2.2. Quan hệ 1-n 

```
class Member < ActiveRecord::Base
  has_many :posts
  accepts_nested_attributes_for :posts
end
```

Có thể set hoặc update  bài post của 1 member thông qua attribute hash của một member, bao gồm key : posts_attributes với một mảng các thuộc tính của post làm giá trị 

```
params = { member: {
  name: 'joe', posts_attributes: [
    { title: 'Kari, the awesome Ruby documentation browser!' },
    { title: 'The egalitarian assumption of the modern citizen' },
    { title: '', _destroy: '1' } # this will be ignored
  ]
}}

member = Member.create(params[:member])
member.posts.length # => 2
member.posts.first.title # => 'Kari, the awesome Ruby documentation browser!'
member.posts.second.title # => 'The egalitarian assumption of the modern citizen'
```

Đối với mỗi hàm băm không có khóa :id, một bản ghi mới sẽ được khởi tạo, trừ khi hàm băm cũng chứa khóa destroy :true.
Chúng ta cũng có thể đặt option reject_if để bỏ qua bất kỳ hàm băm bản ghi mới nào nếu chúng không đạt yêu cầu do mình đề ra. với ví dụ trên

```
class Member < ActiveRecord::Base
  has_many :posts
  accepts_nested_attributes_for :posts, reject_if: proc { |attributes| attributes['title'].blank? }
end

params = { member: {
  name: 'joe', posts_attributes: [
    { title: 'Kari, the awesome Ruby documentation browser!' },
    { title: 'The egalitarian assumption of the modern citizen' },
    { title: '' } # this will be ignored because of the :reject_if proc
  ]
}}

member = Member.create(params[:member])
member.posts.length # => 2
member.posts.first.title # => 'Kari, the awesome Ruby documentation browser!'
member.posts.second.title # => 'The egalitarian assumption of the modern citizen'
```

Nếu hash chứa khóa :id khớp với bản ghi đã được liên kết, bản ghi phù hợp sẽ được update . 
```
member.attributes = {
  name: 'Joe',
  posts_attributes: [
    { id: 1, title: '[UPDATED] An, as of yet, undisclosed awesome Ruby documentation browser!' },
    { id: 2, title: '[UPDATED] other post' }
  ]
}

member.posts.first.title # => '[UPDATED] An, as of yet, undisclosed awesome Ruby documentation browser!'
member.posts.second.title # => '[UPDATED] other post'
```
Có thể thay đổi được "id" bản ghi con không ==> không, nếu thay đổi thì param gửi lên vẫn là id cũ. 

Tuy nhiên điều trên chỉ áp dụng nếu mô hình cha đang được cập nhật. Ví dụ, nếu bạn muốn tạo một member có tên là Haibara và muốn cập nhật các post cùng lúc, điều này sẽ gây ra lỗi  ActiveRecord::RecordNotFound

Nếu bạn muốn validate một bản ghi con có phải là một bản ghi quan hệ với bản ghi cha hay không, bạn có thể dùng validate_presence_of và từ khóa inverse_of. Nếu không định nghĩa inverse_of thì active record sẽ cố gắng đoán xem là bản ghi đó quan hệ với bản ghi nào dựa trên heuristics.
```
class Member < ActiveRecord::Base
  has_many :posts, inverse_of: :member
  accepts_nested_attributes_for :posts
end

class Post < ActiveRecord::Base
  belongs_to :member, inverse_of: :posts
  validates_presence_of :member
end
```
##  2.3. Các option thường được sử dụng 
* allow_destroy : Cho phép xóa bản ghi con, truyền vào *destroy* một giá trị true sẽ thực hiện việc xóa các bản ghi con. Bản ghi chỉ được xóa khi bản ghi cha đã lưu thành công
* reject_if: Cho phép chỉ định một Proc hoặc một Symbol trỏ đến method kiểm tra điều kiện, cả hai có giá trị trả về là true/false. Khi false, reject_if không được gọi, nested attributes sẽ được tạo với đầy đủ giá trị cho từng trường ngoại trừ d*estroy*, khi điều kiện trả về false thì trường destroy sẽ được gán giá trị true để hủy đi bản ghi đó
* limit: (1-n) Cho phép chỉ định số lượng bản ghi con tối đa có thể tạo được trong bản ghi cha. Nếu số lượng bản ghi con vượt quá giới hạn limit thì raised exception NestedAttributes :: TooManyRecords
* update_only: (1-1) Nếu muốn update bản ghi con mà không cần thêm id
# 3. Nhược điểm và cách khắc phục 
Tuy nested attributes có rất nhiều lợi ích nhưng nó cũng có các nhược điểm là chỉ với số lượng chỉ định. Giả sử người dùng muốn thêm nhiều địa chỉ hơn số trường mình đã định sẵn  thì  Nested attributes không thể trùy biến điều đó ngay trên
trang web. Người dùng không thể thêm 1 trường địa chỉ khác không cần load lại trang trên trình duyệt mà phải dựa vào người code ra trang web đó.

Để khắc phục điều đó, chúng ta sẽ sử dụng nested form với Cocoon. Nhưng trước khi sử dụng cocoon, chúng ta tìm hiểu  nguyên lí hoạt động của Cocoon nhờ vào sử dụng nested form dùng Javascript thuần

## 3.1. Nested form sử dụng Javascript thuần
Ví dụ trong trường hợp muốn tạo User có nhiều địa chỉ như phần đầu bài, mong muốn thêm trường address khác ngay trên trình duyệt mà không phải load lại trang, chúng ta có thể sử dụng nested form.
![](https://images.viblo.asia/37dca895-5faf-4d3b-ba31-ecc2f33e9661.png)
Nguyên lí hoạt động của nested form là nó sẽ thêm 1 cái form vào bên trong nút Add Address, khi người dùng click, nó sẽ nối cái form đấy ra trình duyệt nhờ vào sử dụng javascript.

### Cách dùng 

Vẫn sử dụng nested attributes, chúng ta sẽ sửa lại 1 chút như bên dưới 
```
<div class="sub_address">
    <%= f.fields_for :address do |builder| %>
        <%= render "address_fields", f: builder %>
    <% end %>
</div>
<%= link_to "Add Address", "#", id: "sub-field",
    class: "btn btn-info prevent-load",
    data: {field: sub_address_field(f)} %>
```
Trong đó field sẽ nạp vào data, trong field truyền vào method sub_address_field. Nó sẽ đc truyền vào data để có thể sử dụng trong javascript
```
App/helpers/application_helper.rb
     module ApplicationHelper
         def sub_address_field form
             sub_address = form.object.address.build
             form.fields_for :address, sub_address,
                  child_index: "hello" do |builder|
                  render "address_fields", f: builder
             end
         end
      end
             
```
Trong method sub_address_field:
* sub_address: khởi tạo address của form.object với đối số là form (ở đây chính f của @user chúng ta truyền vào form)
* form.fields_for: tạo ra 1 cái form nested attributesnhư bình thường
* child_index: chính là index của các nested form, cần nó để id và name không bị trùng lặp, nếu bị trùng thì sẽ không thể tạo được các nội dung khác nhau
 
Tiếp theo, sẽ tạo 1 file javascript với nội dung như sau:
```
app/assets/javascripts/nested_attributes.js
    $(document).on('click', '#sub-field', function(){
        var field = $(this).data('field');
        var new_id = new Date().getTime();
        $('.sub_address').append(field.replace(/hello/g, new_id));
    });
    $(document).on('click', '.remove-btn', function() {
        $(this).parent().remove();
    });
```
Khi click phần tử với id là sub-field. Nó sẽ lấy data của this, this ở đây chính là gọi tới id sub-field data ở đây là field chúng ta nói ở hình ảnh trước new_id, lấy thời gian hiện tại.Câu lệnh dưới, sẽ thêm vào field vào trong class sub_address. Nghĩa
là nó sẽ nối thêm 1 cái form từ bên trong field và nối vào class sub_address. Đoạn /hello/g với /g sử dụng biểu thức chính qui, tìm tất cả các chữ là hello, thay thế với new_id
### Nhược điểm 
Tuy chúng ta đã có thể nested form nhưng cách làm trên  không hiệu quả do dùng javascript thuần. Tiếp theo chúng ta sử dụng gem Cocoon để có thể nhanh chóng tạo được nested form mà lại dễ  dùng và ngắn gọn
Cocoon vẫn sẽ cho ra chức nắng tương tự khi nested form với javascript thuần, nhưng nó sẽ đơn giản và dễ sử dụng hơn rất nhiều.

## 3.2.  Triển khai Cocoon
Để sử dụng Cocoon, các bạn thêm gem vào trong gemfile
Sau đó require nó vào trong application.js
```
//= require cocoon
```
Vẫn sử dụng nested attributes
```
<%= f.fields_for :address do |builder| %>
    <%= render "address_fields", f: builder %>
<% end %>
<div class="links">
    <%= link_to_add_association 'Add address', f, :address %>
</div>
```
Chúng ta chỉ cần render ra 1 partial và truyền vào object cho nó link_to_association, chính là đường link để hiện ra form khác cần sử dụng, add address là tên link, f chính là object mà form for đang sử dụng với :address là tên của nested attributes

app/view/users/_profilefields.html.erb
```
<div class="nested-fields">
    <%= f.label t :address %>
    <%= f.text_field :address, class: "form-control" %>
    <% end %>
</div>
```
Note: 
Callbacks (upon insert and remove of items)
- cocoon: before-insert: được gọi trước khi insert một nested child có thể bị canceled.
- cocoon:after-insert: được gọi sau khi insert.
- cocoon:before-remove: được gọi trước khi remove nested child có thể bị canceled.
- cocoon:after-remove: được gọi sau remove.
# 4. Tài liệu tham khảo 
https://laptrinhx.com/tim-hieu-nested-attribute-trong-ruby-on-rails-4161294927/
https://api.rubyonrails.org/classes/ActiveRecord/NestedAttributes/ClassMethods.html
https://github.com/nathanvda/cocoon