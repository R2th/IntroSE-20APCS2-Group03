# Giới thiệu
Mục đích là để làm một seri blogs tập hợp tất cả những gem gần gũi, thường gặp nhất trong các dự án Rails. Mỗi bài từ 2-3 gem, với mong muốn giúp ích một phần nào đó cho những bạn muốn học và mới bắt đầu học rails trong việc tìm kiếm những gem thông dụng

Đây sẽ là bài mở đầu trong chuỗi seri gem của mình. Mình xin giới thiệu 2 gem rất quen thuộc là: 

1/Kaminari - phân trang/pagination

2/Paranoia - Xóa mềm/Soft delete

# 1. Kaminari
## Tổng quan
- Là một gem support cho việc phân trang rất phổ biến trong Rails, được hỗ trợ từ phiên bản Rails 4 trở lên
## Cài đặt 
Thêm vào Gemfile
```
gem 'kaminari'
```
rồi sau đó đọc thần chú ``` bundle install ``` để tiến hành cài gem

## Sử dụng
Để phân trang cho một list object trong hàm index, ta cần viết như sau 
```
  def index
    @object = ModelName.all.page params[:page]
  end
  ```
Ở đây, default sẽ phân ra 25 objects/1 trang. Để phân theo ý mình thì ta đổi lại  ``` @object = ModelName.all.page(params[:page]).per(10) ``` .  Như thế này sẽ lấy ra 10 objects/1 trang

Hoặc, bạn cũng có thể config số objects/1trang cho từng mỗi model bằng cách thêm dòng dưới đây vào file Model 
```
class User < ActiveRecord::Base
  paginates_per 50
end
```


Để config lại default của gem, ta chạy lệnh ``` rails g kaminari:config ```. Gem sẽ sinh ra 1 file config/initializers/kaminari_config.rb
```
Kaminari.configure do |config|
  # config.default_per_page = 25
  # config.max_per_page = nil
  # config.window = 4
  # config.outer_window = 0
  # config.left = 0
  # config.right = 0
  # config.page_method_name = :page
  # config.param_name = :page
end
```

Đó là tất cả những thứ cơ bản mà hầu như khi dùng đến Kaminari thì đều phải biết. Ngoài ra, phần nâng cao mời các bạn tham khảo thêm tại: https://github.com/kaminari/kaminari

# 2. Paranoia
## Tổng quan
- Thông thường, khi bạn xóa một record ở DB thì record đó sẽ biến mất hoàn toàn và không có cách nào để khôi phục (hard delete). Như vậy thật nguy hiểm, nếu chẳng may bạn lỡ tay hay vì bất cứ 1 lý do nào đó mà xóa bay mất 1 record trong DB cũng đủ cho bạn ra đảo. 
- Để khắc phục điểm này, gem Paranoia đã biến việc xóa cứng thành xóa mềm (soft delete), hay nói rõ ràng hơn là thêm vào table một column deleted_at với giá trị default là nil. Khi một record bị xóa thì sẽ update thời gian xóa vào column này thay vì cho record đó bay màu. Như vậy bạn có thể dễ dàng sửa chữa sai lầm mỗi khi có tai nạn xảy ra phải không nào :3 
## Cài đặt
Thêm vào Gemfile
```
 gem "paranoia"
```
rồi lại đọc thần chú ``` bundle install ``` 

Tiếp theo ta chạy dòng lệnh sau với các model cần áp dụng xóa mềm ``` bin/rails generate migration AddDeletedAtToTableName deleted_at:datetime:index ```

Và bạn sẽ có một file migration như sau:
```
class AddDeletedAtToTableName < ActiveRecord::Migration
  def change
    add_column :model_names, :deleted_at, :datetime
    add_index :model_names, :deleted_at
  end
end
```

## Sử dụng

Ở Model file, ta thêm acts_as_paranoid :
```
class Model < ActiveRecord::Base
  acts_as_paranoid

  # ...
end
```

Cài đặt như vậy là xong rồi, bây giờ khi chúng ta gọi phương thức destroy, mọi bản ghi trong bảng Model đều sẽ được soft delete. Hãy thử xóa một record bất kỳ bằng phương thức destroy, bạn sẽ thấy câu query sẽ là Update thay vì Delete như trước
```
Model.first.destroy
----------------
# UPDATE "models" SET deleted_at = '2021-01-01 19:37:41.021123' WHERE "models"."deleted_at" IS NULL AND "models"."id" = 1
```

Hoặc nếu bạn muốn xóa cứng ns luông thì ``` Model.first.really_destroy! ```

-Để lấy ra tất cả cả bản ghi chưa xóa ta dùng lệnh *Model.without_deleted* hoặc đơn giản là *Model.all* :D

-Để lấy ra tất cả các bản ghi bao gồm bản ghi đã bị xóa mềm: *Model.with_deleted *

-Để "sửa chữa sai lầm" khi bạn lỡ tay xóa 1 bản ghi: *Model.restore(id)*
### Giải thích
Bản chất của Paranoia là thêm một class method cho class ActiveRecord::Base là self.acts_as_paranoid
``` class ActiveRecord::Base
  def self.acts_as_paranoid(options={})
    ...
    def self.paranoia_scope
      where(paranoia_column => paranoia_sentinel_value)
    end
    ...

    unless options[:without_default_scope]
      default_scope { paranoia_scope }
    end
  ...
  end
end 
```

Do vậy trong model mỗi khi ta khai báo acts_as_paranoid thì class method này sẽ chạy

Việc thêm default_scope để loại bỏ những record theo setting của Paranoia. Giả sử đã add acts_as_paranoid vào model Order, khi gọi 1 câu scope bất kỳ từ bảng Model ta đều thấy:

```
Model.all
  Rails c> Model Load (1.9ms)  SELECT `t_model`.* FROM `t_model` WHERE `t_model`.`deleted_at` IS NULL
  ```
  
 ## Nhược điểm của paranoia
 - Gem paranoia sử dụng default scope để loại bỏ các bản ghi bị đáng dấu là đã bị xóa ra khỏi các câu query "thông thường". Việc này có thể có tác dụng phụ không mong muốn như:

- Sự hỗn độn giữa ORM và Raw SQL. Khi dự án bạn làm ngày một phình lớn lên, việc viết các câu SQL thuần để tăng hiệu năng là điều khó tránh khỏi. Và bất kỳ câu truy vấn SQL thuần nào cũng cần phải điểu chỉnh một cách thủ công để loại bỏ các bản ghi đã bị xóa mềm.

-Một vấn đề quan trọng cần xem xét là hiệu suất và khả năng mở rộng ảnh hưởng đến các bản ghi bị xóa mềm trên hệ thống. Mặc dù hầu hết các bản ghi như vậy có thể ẩn với hầu hết người dùng, chúng vẫn nằm trong cùng cơ sở dữ liệu với các bản ghi khác, và (tối thiểu là) sẽ tiếp tục chiếm không gian. Nếu các bản ghi bị xóa được đánh index (sẽ là mặc định, trừ khi bạn đánh index 1 phần và loại trừ chúng), thì bất kỳ index nào như vậy sẽ ảnh hưởng đến độ trễ khi thực hiện đọc/ghi dữ liệu.