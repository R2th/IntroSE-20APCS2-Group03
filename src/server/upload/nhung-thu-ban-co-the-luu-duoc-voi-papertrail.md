Khi sử dụng PaperTrail để lưu log, ngoài việc muốn biết bản record được update những attributes nào thì bạn lại càng muốn biết ai là người đã update/create/destroy hay chỉ đơn giản là bạn muốn thêm các thuộc tính khác có thể lưu lại của 1 record. Hãy tìm cách để thực hiện chúng.

Trước tiên phải add gem PaperTrail vào project đã https://github.com/paper-trail-gem/paper_trail

## 1. Ai đã thay đổi record?
Mặc định PaperTrail sẽ có thuộc tính `whodunnit` để lưu id của người thay đổi, và cũng cung cấp cho bạn 1 callback. Nếu trong controller có method `current_user` thì callback sẽ thực hiện assign `current_user.id` vào trường `whodunnit`.

```ruby
# callback
class ApplicationController
  before_action :set_paper_trail_whodunnit
end
```

```ruby
# Tells PaperTrail who is responsible for any changes that occur.
    def set_paper_trail_whodunnit
        if ::PaperTrail.request.enabled?
          ::PaperTrail.request.whodunnit = user_for_paper_trail
        end
    end
```

```ruby
# Returns the user who is responsible for any changes that occur.
    def user_for_paper_trail
        return unless defined?(current_user)
        ActiveSupport::VERSION::MAJOR >= 4 ? current_user.try!(:id) : current_user.try(:id)
    rescue NoMethodError
        current_user
    end
```

Ơ.... thế nếu controller của bạn không có method `current_user` mà là 1 method khác lưu user hiện tại đang đăng nhập thì sao? Override method `user_for_paper_trail` lại là được, ví dụ:

```ruby
    def user_for_paper_trail
        return unless defined?(current_member)
        ActiveSupport::VERSION::MAJOR >= 4 ? current_member.try!(:id) : current_member.try(:id)
    rescue NoMethodError
        current_member
    end
```

## 2. Associations
Muốn theo dõi hay thống nhất các `association` (tạm dịch các mối quan hệ) ta sử dụng thêm  [gem này](https://github.com/westonganger/paper_trail-association_tracking)

Cái này mình chỉ hiểu được một phần đó là "Nếu record cha và record con đều được update cùng 1 lần thì với việc sử dụng PaperTrail-AssociationTracking(PT-AT) thì ta có thể thống nhất lại các bản ghi như trước transaction"

```ruby
class Location < ActiveRecord::Base
  belongs_to :user
  has_paper_trail
end

class User < ActiveRecord::Base
  has_one :location
  has_paper_trail
end
user.name                  # dinvvan
user.location.address      # Số 1 Lương

User.transaction do
    user.location.update_attributes address: "BacNinh"
    user.update_attributes name: "DangVan"
end

t = user.versions.last.reify(has_one: true)
t.name                         # dinvvan
t.location.address              # "Số 1 Lương", instead of "BacNinh"
```

Vậy là nó sẽ `restore` lại bản ghi trước khi thực hiện transaction

Ở đây ta chỉ cần lưu ý là 
- Has-One association thì option của method `reify` là `has_one:true`
- Has-Many-Through association thì là `has_many: true`
- Belongs-To association là `belongs_to: true`

## 3. Storing Metadata
Bằng cách sử dụng Model Metadata hay Controller MetaData chúng ta có thể thêm các cột cho bảng `versions`
example:

 **Model Metadata**
```ruby
Class Song < ActiveRecord::Base
    has_many :playlists

    has_paper_trail(
        meta: {
            singer: :singer_id,
            views: :total_views,
        }
    )
    def total_views
        200
    end
end
```

Sử dụng ở controller
**Metadata from Controllers**
```ruby
class ApplicationController
  def info_for_paper_trail
    { ip: request.remote_ip, user_agent: request.user_agent }
  end
end
```

Nâng cao hơn chút nữa, ta có một ví dụ nhỏ

`singer_id` là một thuộc tính của `Song` để biết là người hát bài hát đó và PaperTrail nó đã mặc định sẽ lưu nó rồi. Nhưng mà vấn đề đặt ra là nếu bạn muốn lấy ra versions của 1 ca sĩ cụ thể (singer); nếu không dùng metadata bạn sẽ phải thống nhất lại bảng `version` để tìm ra những versions thuộc về ca sĩ đó => **bất khả thi**. Vậy thì dùng `metadata` thì có gì gọi là **khả thi**?

Đơn giản là metadata sẽ tìm ra những version bạn muốn nếu bạn sử dụng nó :))
```
PaperTrail::Version.where(singer_id: singer_id) => #<...
```

Cảm ơn bạn đã đọc và chúc bạn có thêm được một vài thông tin bổ ích.