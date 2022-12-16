Đây là phần cuối cùng trong loạt bài gồm ba phần về các liên kết đa hình trong Ruby on Rails, sử dụng Active Model. Phần này bao gồm các liên kết đa hình từ nhiều đến nhiều.

Ba phần là:
1. [Giới thiệu và cách tạo ra một Polymorphic Associations cơ bản](https://viblo.asia/p/polymorphic-associations-trong-ruby-on-rails-part-1-gioi-thieu-1Je5EyO45nL)

2. [Quan hệ đa hình nghịch đảo(Reverse Polymorphic Associations)](https://viblo.asia/p/quan-he-da-hinh-trong-ruby-on-rails-part-2-da-hinh-nguoc-reverse-polymorphic-associations-maGK7Jqx5j2)

3. Quan hệ đa hình nhiều-nhiều (Many-to-Many Polymorphic Associations)

## I. Vấn đề

Trong các bài trước chúng ta đã xem xét các liên kết đa hình cơ bản và đảo ngược. Một quan hệ  đa hình nhiều-nhiều khá giống với một quan hệ đa hình ngược ở chỗ nó sẽ sử dụng một bảng mới có khả năng kết hợp giữa chúng (bảng nối).

Xét ví dụ, trên một blog, hãy cung cấp cho những độc giả(*readers*) đã đăng ký của blog khả năng "*favorite*" các bài đăng(*posts*), ảnh(*images*) và thậm chí cả tác giả(*Authors*) mà họ thích nhất.

## II. Quan hệ đa hình nhiều nhiều qua ví dụ thực tế 
### 1. Ví dụ demo
Đây là sơ đồ những gì ta sẽ làm:

![](https://images.viblo.asia/f741ada1-cbfd-4694-b009-e29e8c6d91e6.png)

Vì vậy, một *reader* có thể yêu thích nhiều *posts*, *images* và *authors*, nhưng cũng có thể một bài *post*, *image* hoặc *author* duy nhất có thể được nhiều độc giả yêu thích.

Dưới đây là sơ đồ về những model (và các trường cơ sở dữ liệu) chúng ta phải tạo:
![](https://images.viblo.asia/0b89a020-d429-47c0-81de-722d03143b3d.png)

Hãy tạo các model (Tôi bao gồm các model từ bài viết trước trong trường hợp bạn đến thẳng bài viết này. Nhưng tất nhiên bạn sẽ không tạo cùng một model hai lần trong đời thực.)

```
rails g model Reader username:string
rails g model Post tile:string body:text
rails g model Photo caption:string url:string
rails g model Author name:string
```

*Association model:*

```
rails g model Favorite references:reader references:favoritable{polymorphic} sequence:int
```

Chúng ta hãy nhìn vào các models. Đầu tiên, mô hình `Reader`:

```
class Reader < ApplicationRecord
  has_many :favorites, dependent: :destroy
end
```

Sau đó, những thứ mà người đọc có thể yêu thích(*favorite*):

```
class Post < ApplicationRecord
  has_many :favorites, as: :favoritable, dependent: :destroy
  has_many :readers_who_favorited_me, through: :favorites
end

class Photo < ApplicationRecord
  has_many :favorites, as: :favoritable, dependent: :destroy
  has_many :readers_who_favorited_me, through: :favorites
end

class Author < ApplicationRecord
  has_many :favorites, as: :favoritable, dependent: :destroy
  has_many :readers_who_favorited_me, through: :favorites
end
```

Và cuối cùng, bảng mới kết hợp (bảng tham gia):

```
class Favorite
  belongs_to :reader
  belongs_to :favoritable, polymorphic: true
  default_scope { includes(:favoritable) }
end
```
### 2. Giải thích và sử dụng
Sự khác biệt chính giữa liên kết đa hình ngược mà chúng ta đã xem xét trong bài viết trước là các mục (*posts*, *images* và *authors*) đều sử dụng liên kết `has_many` thay vì liên kết `has_one`. Đây là chính là thay đổi một-nhiều thành nhiều-nhiều mà mình muốn nói với các bạn.

Mô hình  là model `Favorite` đại diện cho sự liên kết giữa người reader và các mục riêng lẻ - các bản ghi cùng loại của nó vừa thuộc về một người đọc vừa thuộc về một mục  `favoritable` - và đó là lúc `polymorphic: true` phát huy tác dụng.

Các quan hệ đa hình đều có tên (`commentable`  từ bài viết trước). Trong ví dụ nay, tất cả các loại mặt hàng đều có thể được yêu thích và vì vậy chúng đều là `favoritable`.

Ngoài ra, ba loại mục đều khai báo:

```
  has_many :readers_who_favorited_me, through: :favorites
```

Điều này cho phép nhanh chóng tìm thấy những `reader` đã yêu thích một mục cụ thể với:

```
post = Post.find(:post_id)
puts post.readers_who_favorited_me
```

(Chắc chắn, `readers_who_favorited_me` có vẻ hơi ... cồng kềnh, Nhưng nó làm clear nghĩa để khi đọc lại ta vẫn hiểu nó làm gì.)

Cũng lưu ý các khai báo `dependent: destroy` trên một số bảng quan hệ. Vì ta đang sử dụng một bảng liên kết, nên cần đảm bảo rằng các bản ghi trong bảng đó sẽ bị xóa khi một `reader` hoặc một `item` bị xóa. Nếu không làm điều này, sẽ có các bản ghi mồ côi làm lộn xộn cơ sở dữ liệu.

Cuối cùng, lưu ý rằng có một phạm vi mặc định trên model `Favorite`. Rất có thể khi truy xuất bản ghi của model này, nó sẽ tìm loại bản ghi mà nó được liên kết (*post, photo hay author*).

### 3. Lưu ý
Chú ý khi sử dụng quan hệ đa hình nhiều nhiều, cần xác định bạn đang thực sự xử lý các bản ghi `favorite`, các bản ghi từ bảng liên kết. Những bản ghi này thể hiện "sự yêu thích của một item bởi reader" - và là chính item đó. Như sau đây:

```
current_reader = Reader.find(:reader_id)
favorites = current_reader.favorites

# First, check the favorite_type
if favorites[0]. favorite_type == 'Photo'
  # To get the photo's caption, we have to do this:
  favorites[0].favorite.caption

  # This won't work
  favorites[0].caption
end

# To add a new favorite, we have to create a new
# Favorite record that links a reader to an item:
reader = Reader.find(:reader_id)
photo = Photo.find(:photo_id)
Favorite.create({ reader: reader, favoriteable: photo })
```

Trong ví dụ này vì `favoritable` là một quan hệ đa hình, bảng cơ sở dữ liệu `favorite` sẽ có các trường `favoritable_id` và `favoritable_type`. Chúng ta có thể sử dụng `favoritable_type` để giúp chúng tôi sắp xếp các `item` tuơng ứng.

Ví dụ: nếu muốn có thể nhận được tất cả các `item` của một `type` cụ thể mà người đọc yêu thích, có thể thêm một số quan hệ khác vào model `reader` như sau:

```
class Reader < ApplicationRecord
  has_many :favorites, dependent: :destroy
  has_many :favorite_posts, through: :favorites, source: :favoritable, source_type: 'Post'
  has_many :favorite_photos, through: :favorites, source: :favoritable, source_type: 'Photo'
  has_many :favorite_authors, through: :favorites, source: :favoritable, source_type: 'Author'
end

current_reader = Reader(:reader_id)
puts current_reader.favorite_authors
```

Hoặc chúng ta có thể làm điều này:

```
class Reader < ApplicationRecord
  has_many :favorites, dependent: :destroy
end

class Favorite
  belongs_to :reader
  belongs_to :favoritable, polymorphic: true
  default_scope { includes(:favoritable) }
  scope :posts, -> { where(inventoriable_class: 'Post') }
  scope :photos, -> { where(inventoriable_class: 'Photo') }
  scope :authors, -> { where(inventoriable_class: 'Author') }
end

current_reader = Reader(:reader_id)
puts current_reader.favorites.authors
```

## III.Kết luận 
Trên đây mình đã giơí thiệu với các bạn trừong hợp polymorphic ít gặp chứa loại quan hệ n-n, và các sử dụng nó. Và tất nhiên trong các trường hợp cụ thể các bạn nên tránh phải sử dụng loại quan hệ phức tạp nếu như này nếu có phuơng pháp thay thế khác. 

Tham kháo: 
http://guides.rubyonrails.org/association_basics.html#polymorphic-associations
https://www.informit.com/articles/article.aspx?p=2220311&seqNum=6