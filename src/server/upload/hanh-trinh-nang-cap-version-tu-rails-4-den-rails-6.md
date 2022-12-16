# Lời mở đầu
Chào mọi người, ở bài viết này mình xin được chia sẻ về một số điểm khá quan trọng trong quá trình nâng cấp version Rails 4 lên Rails 6 mà mình đã rất may mắn khi được trực tiếp làm và một số điểm bổ sung tham khảo từ các tài liệu.

Đây là một trải nghiệm rất tích cực cho bản thân mình và mình cũng rút ra được nhiều điều từ đây. Đặc biệt là rèn luyện tính kiên trì và không nghĩ đến chuyện từ bỏ !!! :v 

Và trước khi bước vào nội dung chính, mình muốn note lại một điều là "Nếu bạn có ý định nâng cấp version cho Rails thì hãy kiểm soát version ngay trước đó một cách tốt nhất có thể, hay nói cách khác là nên nâng version mới khi bạn đang sử dụng version ngay trước đó của nó :v"

# I. Update từ Rails 4.2 lên 5.0
## 1. Application code
### a. ActiveRecord
ActiveRecord kế thừa từ ApplicationRecord, vì vậy trong các file model bạn nên create như sau
```ruby
class ApplicationRecord < ActiveRecord::Base
		self.abstract_class	= true
end
```
Và sau đó cập nhật tất cả các model để kế thừa từ ```ApplicationRecord```. Lớp duy nhất kế thừa từ ```ActiveRecord::Base``` sẽ là ```ApplicationRecord```

Với associations ```belongs_to``` được tạo mặc định trong model,  có nghĩa là nếu liên kết không tồn tại cho model khi lưu, một lỗi sẽ được kích hoạt.  Sử dụng ```option: true``` để tránh gặp lỗi này ```belongs_to :user, optional: true```

### b. Controllers
Khi mình thực hiện các thao tác nâng cấp cho Controllers đã gặp phải một vấn đề liên quan đến Parameters như sau:  từ Rails 5 trở đi thì ActionController::Parameters không kế thừa Hash, điều này tương đương với việc các params ở Rails 5 trở đi sẽ không sử dụng được các method như fetch, slice, except,... 

Example lỗi:
```ruby
NoMethodError - undefined method `exclude?' for #<ActionController::Parameters:0x00005626cd391508>:
  app/controllers/admin/manager_items_controller.rb:145:in `block (2 levels) in create_event_items'

ActionController::UnfilteredParameters - unable to convert unpermitted parameters to hash
```

Cần permit các params muốn sử dụng các method của Hash hoặc sử dụng to_unsafe_h để convert sang HashWithIndifferentAccess. Thử tưởng tượng số chỗ sử dụng params trong hệ thống của bạn là rất nhiều thì bạn sẽ phải vã mồ hôi khi biết nâng lên Rails 5 sẽ như thế này :v vì độ ảnh hưởng của nó là gần như cả hệ thống !!!



## 2. Testing
Ở Rails 5.0, điểm thay đổi của Rspec (Unit Test) có thể kể đến method ```assigns```, method này đã được đưa vào gem ```rails-controller-testing```.  Nếu muốn sử dụng bạn cần thêm vào Gemfile ```gem 'rails-controller-testing'```

# II. Update từ Rails 5.0 lên 5.1
## 1. Application code
### a. ActiveRecord
Ở Rails 5.1 có một sự thay đổi khá quan trọng trong ActiveRecord mà mình gặp phải đó là ```ActiveRecord::Base#uniq``` đã không còn được sử dụng và được thay thế bởi ```distinct```. 

Ngoài ra, còn có một số thay đổi khác như: ```raise_in_transactional_callbacks ``` hiện đã bị xóa và ```use_transactional_fixenses``` được thay thế bởi ```use_transactional_tests```

### b. Controllers
Trước 5.1, điều kiện trong filters có thể được gọi qua "string", còn ở Rails 5.1 nó được gọi qua "symbol" 
Before:

```before_action :authenticate_user!, unless: 'has_project_guest_id'```

After:

```before_action :authenticate_user!, unless: :has_project_guest_id```

Tất cả các method ```*_filter``` bây giờ sẽ chuyển sang gọi qua ```*_action.```

Ví dụ

Before:

```ruby
skip_before_filter :authenticate_user!
before_filter :authenticate_user!
after_filter :do_something
```

After:

```ruby
skip_before_action :authenticate_user!
before_action :authenticate_user!
after_action :do_something
```

## 2. Testing
Với Rspec ở version 5.1 có một điểm lưu ý rất quan trọng về params key. Rails 5.1 hỗ trợ cho việc truyền tham số mà không cần sử dụng keyword arguments.

Before:

```ruby
expect { post :create, params }.to change(Project, :count).by(1)
```

After:

```ruby
expect { post :create, params: params }.to change(Project, :count).by(1)
```

# III. Update từ Rails 5.1 lên 5.2

## Application code
### a. ActiveRecord
Ở rails 5.2, **ActiveRecord::Dirty** có một số thay đổi đáng chú ý. Có một số cảnh báo liên quan đến các thay đổi API khi chạy rails 5.1. Hầu hết trong số đó là thay đổi action.

### b. Controllers
Khi mình kiểm tra một số lỗi liên quan đến dữ liệu kiểu DateTime không sử dụng được trong một số hàm như year(), date(),... **as_json** ở version cũ khi convert một dữ liệu thì sẽ không phân loại kiểu dữ liệu DateTime nên bản cũ vẫn sử dụng được.

Như vậy, với các bản rails 5 hay rails 6 thì việc phân loại dữ liệu đã được rõ ràng hơn, tức là **as_json** giờ sẽ trả về kiểu dữ liệu string cho DateTime khi convert.

Một lỗi khác về **to_josn** và **as_json** là undefined methods khi tham số only hoặc method chứa method/attribute không thuộc object hiện tại, do đó cần bỏ những method thừa này ra khỏi tham số của **as_json**. Nếu gặp trường hợp này thì cần khai báo riêng các tham số với các method riêng sử dụng cho từng phần chứ không nên gọi chung các method cho 1 tham số.

### c.Active Storage
Mình có tìm được một lỗi liên quan đến thẻ image_tag như sau
```ruby 
ActionView::Template::Error: Can't resolve image into URL: undefined method `to_model' for #
```

Nguyên nhân là do đối tượng thuộc ImageUploader của gem carrier wave khi sử dụng với image_tag thì image_tag nhận vào một object chứ ko phải string

Để giải quyết vấn đề này mình có 1 solution an toàn tránh tăng phạm vi ảnh hưởng như sau
```ruby
chuyển result từ ImageUploader thành string như sau "#{object}"
nếu object không phải class ImageUploader thì vẫn sẽ chuyển về string
```


# IV. Update từ Rails 5.2 lên 6.0
### Một số loại bỏ của Rails 6
* Một số loại bỏ của Rails 6 bao gồm: **after_bundle, capify!, config.secret_token**
* Trong Action Pack loại bỏ **fragment_cache_key** và thay bằng **combined_fragment_cache_key**
* Trong ActionDispatch::TestResponse có một số thay đổi như **#success?** thay bằng **#successful?, #missing?** thay bằng **#not_found?**, **error?** thay bằng **#server_error?**
* Action View loại bỏ **image_alt** , **RecordTagHelper** thay bằng gem **record_tag_helper**
* Active Record loại bỏ **#set_stat** từ transaction của object, **#supports_statement_cache?** của database adapters, **"sum, count"** khi làm việc với column
* Loại bỏ **ActiveRecord::Migrator.migrations_path= , expand_hash_conditions_for_aggregates**


**Trên đây là một phần nhỏ trong quá trình nâng version Rails 6 mà mình cùng team đã thực hiện, cảm ơn các bạn đã theo dõi, xin chào và hẹn gặp lại ^^!**

Nguồn tham khảo: một số trích dẫn từ cuốn **The Complete Guide To Upgrade Rails** 

![](https://images.viblo.asia/dfd8055b-96bd-44b3-a5f0-e8f66e23af46.png)

https://stackoverflow.com/questions/53883893/cant-resolve-image-into-url-undefined-method-to-model

https://github.com/rails-api/active_model_serializers/issues/1851

https://stackoverflow.com/questions/46029084/rails-unable-to-convert-unpermitted-parameters-to-hash