Đây là phần thứ hai trong loạt bài gồm ba phần về các quan hệ đa hình trong Ruby on Rails, sử dụng Active Model. Phần này sẽ giải thích các quan hệ đa hình ngược - chúng là gì và làm thế nào để tạo ra chúng.
Ba phần là:

1. [Giới thiệu và cách tạo ra một Polymorphic Associations cơ bản](https://viblo.asia/p/polymorphic-associations-trong-ruby-on-rails-part-1-gioi-thieu-1Je5EyO45nL)

2. Quan hệ đa hình nghịch đảo(Reverse Polymorphic Associations)

3. Quan hệ đa hình nhiều-nhiều (Many-to-Many Polymorphic Associations)

Trong bài viết trước, mình đã trình bày loại quan hệ đa hình "tiêu chuẩn" trong Rails, trong đó các model con (`comments`) trong association có thể thuộc về các model cha khác nhau (`post`, `image` và `page`). Polymorphic đã giải quyết việc sinh ra nhiều bảng trung gian tuơng đồng và rút ngắn chỉ trong 1 bảng trung gian ảo (trong ví dụ của bài viết trước, là  `commentable_id` và `commentable_type` trong bảng `comment`).
## I. Quan hệ đa hình đảo ngược

Trong một quan hệ đa hình đảo ngược, đó là các model cha có thể có nhiều model con thuộc nhiều loại. Điều này phức tạp hơn một chút vì không có nơi rõ ràng cho trường "xxxx_type" - ứng với trường "xxxx_id", nhưng các model con vẫn cần cặp "xxxx_type" - "xxxx_id" này để liên kết . 
Vì vậy, những gì chúng ta thực sự cần là một bảng khác, một bảng đại diện cho mối quan hệ này. Một điều khác cần lưu ý, "association table" sẽ sử dụng một liên kết đa hình thông thường.
Nói sơ qua như trên sẽ rất khó hiểu, vậy ta đi vào ví dụ để có cái hiểu đơn giản nhất nhé ...
## II. Ví dụ demo
Trong Rails, thuật ngữ ***"reverse polymorphic association"*** dùng để chỉ phương pháp thiết lập quan hệ đa hình qua nhiều model, trên thực tế không có từ khóa "Reverse_polymorphic".
### 1. Vấn đề

Giả sử các bài viết trong blog tin tức được tạo thành từ nhiều loại phương tiện - khối văn bản, ảnh và video(text blocks, photos and videos).
Mỗi bài viết sẽ là một tập hợp các loại phương tiện được tổ chức theo một trình tự cụ thể. Gọi tắt là "article elements" - các yếu tố trong bài viết.
Sơ đồ mô tả các elements của 1 or nhiều article cần có:
![](https://images.viblo.asia/ca57b79b-28a4-477b-8768-fed125177ecd.png)

### 2. Quan hệ đa hình đảo ngược

Như trong model trên, 1 article đều có ảnh, video, text blocks; Ở đây rõ ràng không sử dụng polymorphic thông thường được, vì article và các video, photos, text blocks đều có thể thuộc nhiều article khác; lúc này thay vì cơ chế tiêu chuẩn; ta xây dựng 1 bảng trung gian giữa chúng và đặt polymorphic trong bảng này; đại diện các types của article. Tạm gọi model này là `ArticleElement`

Dưới đây là sơ đồ mô hình (và trường cơ sở dữ liệu) mà chúng ta phải thực hiện:
![](https://images.viblo.asia/b19bcd7b-32cc-489e-911a-a44b40205857.png)
***Generate và migration các models:***

```
rails g model Article title:string published_on:date
rails g model TextBlock body:string
rails g model Photo caption:string filename:string
rails g model Video title:string filename:string
```

Và model trung gian:
```
rails g model ArticleElement sequence:int references:article references:element{polymorphic}
```

Hãy nhìn vào các model. Đầu tiên, mô hình `Article` :
```
class Article < ApplicationRecord
  has_many :article_elements, dependent: :destroy
end
```

Sau đó, các loại phương tiện mà một `article` được tạo thành:
```
class TextBlock < ApplicationRecord
  has_one :article_element, as: :element, dependent: :destroy
  has_one :article, through: :article_element
end

class Photo < ApplicationRecord
  has_one :article_element, as: :element, dependent: :destroy
  has_one :article, through: :article_element
end

class Video < ApplicationRecord
  has_one :article_element, as: :element, dependent: :destroy
  has_one :article, through: :article_element
end
```

Và cuối cùng, model trung gian:
```
class ArticleElement
  belongs_to :article
  belongs_to :element, polymorphic: true
  default_scope { order(:sequence).includes(:element) }
end
```

Mô hình `ArticleElement` là model đại diện cho quan hệ giữa các `Article` và các  `Element`(ba loại phương tiện truyền thông). Các bản ghi thuộc loại này đều thuộc về n `Article` và thuộc về một `Element`- và đó là nơi `polymorphic: true` xuất hiện - các bản ghi `ArticleElement` sẽ có cả trường `element_id`  và `element_type`.

Nếu bạn nhớ từ bài viết trước, các association polymorphic có tên "commentable". Trong trường hợp này, tôi vừa đặt tên cho model thể hiện asociation ở đây là "Element", vì đó là bản ghi của mỗi loại phương tiện, là một element của một article.

Ba model `Video`, `Photo`, `TextBlock` đều khai báo quan hệ:
  `has_one :article, through: :article_element`
  
 Tức chúng đều thuộc 1 `article` thông qua `article_element` tuơng ứng. Điều này cho phép nhanh chóng tìm thấy bài viết có một yếu tố nào đó như:
```
photo = Photo.find(:photo_id)
puts photo.article
```
Cũng lưu ý các tuyên bố `dependent: :destroy` trên các quan hệ. Vì đang sử dụng bảng trung gian, nên cần đảm bảo rằng các bản ghi trong bảng đó sẽ bị hủy khi một `article` hoặc một `element` bị xóa. Ngoài ra, nếu chúng ta xóa một `article` , nó cũng sẽ xóa các `element` của `article`  đó. Nếu chúng ta không làm điều này, chúng ta sẽ có những bản record mồ côi làm xáo trộn cơ sở dữ liệu.

Cuối cùng, lưu ý rằng có một `default scope` trên Model `ArticleElement`. Điều này đảm bảo rằng các `element`của `article` được truy xuất theo đúng trình tự và cũng có thể, nếu đang truy xuất bản ghi của loại model này, chúng ta thực sự đang tìm bản ghi `element` được liên kết với (text blocks, photos hoặc videos ). 

***Truy xuất dữ liệu***

Chắc hẳn các bạn đang thắc mắc sử dụng loại Quan hệ đa hình đảo ngược như này thì việc truy xuất dữ liệu hay tạo 1 record mới có gì khác biệt với polymorphic thông thường không thì đây là 1 vaì ví dụ cho thấy việc truy xuất hay tạo mới record không có nhiều sự khác biệt:
```
article = Article.find(:article_id)
elements = article.article_elements

# First, check the element_type
if elements[0].element_type == 'Photo'
  # To get the photo's caption, we have to do this:
  elements[0].element.caption

  # This won't work
  elements[0].caption
end

# To add a new element, we have to create the ArticleElement
# record that links a article to the element:
article = Article.find(:article_id)
photo = Photo.create({ caption:"Alien Abduction Infographic", filename:"aa_info.jpg" })
Article.article_elements.create({ element: photo })
```

## III. Lời kết
Trên đây mình đã giới thiệu 1 loại polymorphic khá đặc biệt mà hữu dụng cho các mối liên kết phức tạp. Rất mong chúng hữu ích và giúp được các bạn. Thank you! :)

Tài liệu: 
 https://guides.rubyonrails.org/association_basics.html#polymorphic-associations