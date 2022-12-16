### 1. Lời tựa

Khi làm việc với Rails , hay  cụ thể ở đây mình muốn nói làm việc với model trong rails. Bình thường các bạn thường lưu một giá trị trên một column. Nhưng bài toán ở đây là giá sử bạn muốn lưu một mảng giá trị cho một column hay thậm trí một hash. Vậy sẽ giải quyết thế nào? Vâng giải pháp ở đây chính là "Serialized Columns" 
### 2. Tạo model với Serialized Columns
```ruby
# Migration for adding a JSON column to the users table.
def change
  add_column :users, :facebook_profile_data, :json
end
# user.rb
class User < ApplicationRecord
  #...
  serialize :facebook_profile_data, JSON
end
````

Và bậy giờ đơn giản có thé chạy:
```ruby
    user = User.create!({
  username: 'usama.ashraf',
  facebook_profile_data: {
    object_id: '...',
    profile_image_url: '...'
  }
})
user.facebook_profile_data
# {'object_id' => '...', 'profile_image_url' => '...'}
user.facebook_profile_data['profile_image_url']
user.facebook_profile_data['object_id'] = 'new-object-id'
user.save
```
Việc tạo như vậy nhiều khi thực sự là không cần thiết. Nhưng ở đây mình thực sự không muốn tạo thêm một bảng nên sẽ làm như vậy.
3. Custom serializer
- Chúng ta sẽ sửa lại model trên một chút:
```ruby
# models/user.rb
class User < ApplicationRecord
  #...
  serialize :facebook_profile_data, FacebookProfileData
end
# models/facebook_profile_data.rb
class FacebookProfileData
  attr_accessor :object_id, :profile_image_url
  include Serializable
end
```
Và sau đó thêm custom như sau:
```ruby

# models/concerns/serializable.rb
module Serializable
  extend ActiveSupport::Concern
  def initialize(json)
    unless json.blank?
      if json.is_a?(String)
        json = JSON.parse(json)
      end
      # Will only set the properties that have an accessor,
      # such as those provided to an attr_accessor call.
      json.to_hash.each { |k, v| self.public_send("#{k}=", v) }
    end
  end
  class_methods do
    def load(json)
      return nil if json.blank?
      self.new(json)
    end
    def dump(obj)
      # Make sure the type is right.
      if obj.is_a?(self)
        obj.to_json      
      else
       raise StandardException, "Expected #{self}, got #{obj.class}" 
      end
    end
  end
end
```
Sau khi custom chúng tạo tạo như thế này sẽ lỗi.
```ruby
# This will now raise an error because of the type mismatch.
user = User.create!({
  username: 'usama.ashraf',
  facebook_profile_data: {
    object_id: '...',
    profile_image_url: '...'
  }
})
```
Mà sẽ phải là:
```ruby
user = User.create!({
  username: 'usama.ashraf',
  facebook_profile_data: FacebookProfileData.new({
    object_id: '...',
    profile_image_url: '...'
  })
})
```
Nếu ta có để ý thì dòng này:
```ruby
json.to_hash.each { |k, v| self.public_send("#{k}=", v) }
```
Dòng đảm bảo các attr phải được `attr_accessor`
Và bây giờ bạn có thẻ dễ dàng thêm một attr mới:

```ruby
# models/facebook_profile_data.rb
class FacebookProfileData
  attr_accessor :object_id, :profile_image_url, :city, :birthday
  include Serializable
end
```
### 3. Note
Trên đó là cách mình đã tạo 1 serialize json ngoài ra bạn có thể tạo vơi aray...

### 4.Tham khảo
https://codeburst.io/json-serialized-columns-with-rails-a610a410fcdf