## Giới thiệu counter cache
Trong ứng dụng rails quan hệ **1-n** (has_many - belongs) là rất phổ biến.
Ví dụ ở đây ta có quan hệ một Author có nhiều bài posts
```
class Author < ApplicationRecord
  has_many :posts, dependent: :destroy
end

class Post < ApplicationRecord
  belongs_to :author
end
```

Thay vì đếm các bài **posts** theo **author** trong cơ sở dữ liệu mỗi khi tải trang, thì c**ounter cache của ActiveRecord** cho phép lưu trữ bộ đếm và cập nhật nó mỗi khi một bài post liên kết được tạo hoặc xóa. Sử dụng **counter_cache** trong tình huống này sẽ dẫn đến ít truy vấn hơn do đó sẽ cải thiện được performance tốt hơn.

```
 author = Author.first
 count = author.posts_count
```

Rails có support counter cache nhưng nó không thể dùng đối với các trường hợp nâng cao như scope nên ở đây mình sẽ giới thiệu thêm về gem counter_culture, nó giúp bạn làm việc dễ dàng với trường hợp scope.

## Cài đặt:
Thêm **counter_culture** vào trong Gemfile:
```
gem 'counter_culture', '~> 2.0'
```
chạy **bundle install**

## Database schema
Thêm cột mới vào bảng Author
```
rails generate counter_culture Category products_count
```
Tiếp theo chạy **rake db:migrate**
## Sử dụng
**Simple counter-cache**
```
class Product < ActiveRecord::Base
  belongs_to :category
  counter_culture :category
end

class Category < ActiveRecord::Base
  has_many :products
end
```

Bây giờ model Category sẽ cập nhật counter-cache trong cột products_count của bảng categories.
**Multi-level counter-cache**
```
class Product < ActiveRecord::Base
  belongs_to :sub_category
  counter_culture [:sub_category, :category]
end

class SubCategory < ActiveRecord::Base
  has_many :products
  belongs_to :category
end

class Category < ActiveRecord::Base
  has_many :sub_categories
end
```

**tùy biến tên cột**
```
class Product < ActiveRecord::Base
  belongs_to :category
  counter_culture :category, column_name: "products_counter_cache"
end

class Category < ActiveRecord::Base
  has_many :products
end
```

**Dynamic column name**
```
class Product < ActiveRecord::Base
  belongs_to :category
  counter_culture :category, column_name: proc {|model| "#{model.product_type}_count" }
  # attribute product_type may be one of ['awesome', 'sucky']
end

class Category < ActiveRecord::Base
  has_many :products
end
```
**Conditional counter cache**

```
class Product < ActiveRecord::Base
  belongs_to :category
  counter_culture :category, column_name: proc {|model| model.special? ? 'special_count' : nil }
end

class Category < ActiveRecord::Base
  has_many :products
end
```

Tới đây bạn đã có thể sửa dụng counter cache cho hầu hết các trường hợp rồi, tiếp theo mình xin chia sẽ 1 ít kinh nghiệm dự án có thể sẽ giúp bạn trong một vài trường hợp.

## Single-Table Inheritance
Giả sử ta có các  quan hệ sau, ở đây chúng ta chỉ quan tâm model Influencer và model Post. Trong bảng influencers ta có thể dùng counter cache với 3 column là **youtube_posts_count, ins_post_count, twitter_posts_count** <br>

**app/models/user.rb**
```
class Actor < ApplicationRecord
end
```

**app/models/user.rb**
```
class Agent < Actor
end
```
**app/models/influencer.rb**
```
class Influencer < Actor
  has_many :youtube_posts, class_name: YoutubePost.name, dependent: :destroy
  has_many :ins_posts, lambda { Post.type_ins }, class_name: Post.name, dependent: :destroy
  has_many :twitter_posts, lambda { Post.type_twitter }, class_name: Post.name, dependent: :destroy
end
```
**app/models/post.rb**
```
class Post < ApplicationRecord
  scope :type_ins, lambda { where type: %w[InsHighlightPost InsImagePost InsVideoPost] }
  scope :type_twitter, lambda { where type: %w[TwitterVideoPost TwitterImagePost] }
end
```

**app/models/youtube.rb.**
```
class YoutubePost < Post
end
```

Đối với model **YoutubePost** này ta không cần làm giống với cách sử dung **Simple counter-cache** mà mình hướng dẫn ở trên. Tiếp theo ta chỉ cần thao tác với model **Post** 


**app/models/post.rb.** <br>
Ta có gem counter_culture có thể support scope https://github.com/magnusvk/counter_culture#handling-dynamic-column-names, nhưng chưa có hướng dẫn cụ thể cho trường hợp scope where theo điều kiện in array như bên dưới, chỗ này ta sẽ cần 1 method để set **Dynamic column name** trong trường hợp này.

```
class Post < ApplicationRecord
  belongs_to :influencer
  
  scope :type_ins, lambda { where type: %w[InsHighlightPost InsImagePost InsVideoPost] }
  scope :type_twitter, lambda { where type: %w[TwitterVideoPost TwitterImagePost] }
  
  // khai báo counter_culture
  counter_culture :influencer,
  column_name: proc { |model| model.counter_culture_column_name.to_s }, // Dynamic column name
  // cập nhật counter-cache trong cột tương ứng của bảng influencers.
  column_names: {
    ["posts.type IN (?)", %w[InsHighlightPost InsImagePost InsVideoPost]] => "ins_posts_count",
    ["posts.type IN (?)", %w[TwitterVideoPost TwitterImagePost]] => "twitter_posts_count",
    ["posts.type = ?", "YoutubePost"] => "youtube_posts_count"
  }
  
  def counter_culture_column_name
    type = "#{campaign.media_type}_post".camelize

    if INS_POSTS.include?(type)
      "ins_posts_count"
    elsif TWITTER_POSTS.include?(type)
      "twitter_posts_count"
    else
      "#{campaign.media_type}_posts_count"
    end
  end
end
```

Tiếp theo ta chỉ cần viết rake task để cập nhật lại các cột **youtube_posts_count, ins_post_count, twitter_posts_count** trong bảng influencer với câu lệnh.
```
Post.counter_culture_fix_counts
```
Kết quả.
![](https://images.viblo.asia/2d3e0d37-f2ec-4cf5-822a-d79147cfe07a.png)

**counter_cache** hoạt động dựa trên callback nên việc tạo hoặc xóa record sẽ cập nhật lại counter cache, bạn có thể xem hình để dễ hiểu hơn. <br>
**Note:** Cần chú ý đến những phương thức không gọi callback như **delelte**, **import**... vì việc tạo hoặc xóa record bằng 2 phương thức này sẽ không cập nhật lại counter cache. <br>
![](https://images.viblo.asia/6fd57278-369b-48b2-bdec-c3e037741797.png)

## Kết luận.
Việc sử dụng **counter_cache** giúp bạn cải thiện được performance tốt hơn. Trên chỉ là bài hướng dẫn cơ bản giúp bạn làm quen với **counter_cache và gem counter_culture**. Bạn có thể tham khảo thêm ở đây. <br>
https://github.com/magnusvk/counter_culture#handling-dynamic-column-names<br>
https://guides.rubyonrails.org/association_basics.html#options-for-belongs-to<br>
https://redpanthers.co/counter-cache-how-to-get-started/