Model chứa nhiều thuộc tính với nhiều kiểu.  Một yêu cầu phổ biến là tạo ra một thuộc tính mà có thể được gán cho một trong số một vài giá trị có sẵn. Trong lập trình, nó được gọi là `enumeration` hoặc ngắn gọn là `enum`. Hơi khó hiểu nhỉ, phần tiếp theo mình sẽ đưa ra một ví dụ để dễ hiểu hơn. Lưu ý là Rails chỉ hỗ trợ `enums` từ version 4.1 nhé.

Bài viết gồm 3 phần:
1.  Giải pháp cơ bản - giới thiệu về `ActiveRecord::Enum`, cơ bản nhất có thể.
2.  5 bước khác nhau để cải thiện `enums` 
3.  Giải pháp cuối cùng - tổng hợp lại 5 cách thành 1 giải pháp hoàn hảo

Ví dụ mình đưa ra dưới đây liên quan đến các tác phẩm nghệ thuật. Các tác phẩm nghệ thuật thuộc các `Catalogs`. Trong các thuộc tính của `Catalogs` có 4 loại `enums`:
```ruby
state: ["incoming", "in_progress", "finished"]

auction_type: ["traditional", "live", "internet"]

status: ["published", "unpublished", "not_set"]

localization: ["home", "foreign", "none"]
```

## Giải pháp cơ bản
Thêm `enums` vào một Model có sẵn vô cùng đơn giản.  Đầu tiên, cần tạo một `migration`. Lưu ý loại của cột phải là `integer`, đấy là cách Rails giữ giá trị của `enums` trong database.

```ruby
rails g migration add_status_to_catalogs status:integer

class AddStatusToCatalogs < ActiveRecord::Migration[5.1]
  def change
    add_column :catalogs, :status, :integer
  end
end
```
Tiếp theo ta khai báo thuộc tính `enum` trong Model 
```ruby
class Catalog < ActiveRecord::Base
  enum status: [:published, :unpublished, :not_set]
end
```
Chạy migration và xong, từ giờ bạn có thể dùng các giá trị của `enum` như một phương thức. 

Ví dụ bạn có thể kiểm tra `status` hiện tại có được set một giá trị cụ thể không:
```ruby
catalog.published? # false
```
hoặc sửa `status` thành 1 giá trị khác
```ruby
catalog.status = "published" # published
catalog.published! # published
```
Liệt kê tất cả Catalog có `status` là `published`:
```ruby
Catalog.published
```
Bạn có thể tham khảo thêm các phương thức tại [ActiveRecord::Enum](http://api.rubyonrails.org/v5.1/classes/ActiveRecord/Enum.html).

Đây là một giải pháp tuyệt vời để bắt đầu, nhưng sẽ gặp vài vấn đề khi dự án của bạn lớn hơn. Để chuẩn bị cho điều đó, bạn có thể thực hiện một vài cải thiện cho `enums`.

## 5 bước để cải thiện enums
Thực ra gọi là 5 bước nhưng bạn hoàn toàn có thể thực hiện riêng biệt từng bước mà không hề ảnh hưởng đến nhau.
### 1. Khai báo `enum` dưới dạng Hash , không phải mảng
**Nhược điểm trước khi thay đổi**: việc ghép giá trị khai báo với số nguyên lưu trong database phụ thuộc vào thứ tự sắp xếp các phần tử trong mảng.

Trong ví dụ này, việc ghép giá trị sẽ như sau:
```ruby
class Catalog < ActiveRecord::Base
  enum localization: [:home, :foreign, :none]
end

0 -> home
1 -> foreign
2 -> none
```
Cách tiếp cận này không linh hoạt một chút nào. Thử tưởng tượng nếu có 1 yêu cầu thay đổi tách `foreign` thành `America` và `Asia`. Trong trường hợp này bạn phải bỏ đi giá trị cũ và thêm vào 2 giá trị mới. Tuy nhiên, bạn không thể bỏ đi `foreign` vì nó sẽ làm hỏng thứ tự sắp xếp các cái còn lại. Để tránh tình trạng này, bạn nên khai báo `enum` dưới dạng Hash. Cũng không phải thay đổi gì nhiều:
```ruby
class Catalog < ActiveRecord::Base
  enum localization: { home: 0, foreign: 1, none: 2 }
end
```
Cách khai báo này không phụ thuộc vào thứ tự nên bạn hoàn toàn có thể thay đổi và loại bỏ giá trị `enum` không sử dụng.
### 2. Tích hợp `ActiveRecord::Enum` với `PostgreSQL enum`
**Nhược điểm trước khi thay đổi**: giá trị không có nghĩa trong cơ sở dữ liệu

Làm việc với các thuộc tính được đại diện bởi số nguyên trong database có thể gây phiền toái. Tưởng tượng bạn phải thực hiện 1 query trong `rails console` hoặc viết 1 `scope` dựa trên trường `enum` . Quay trở lại ví dụ trước, mình muốn lấy ra tất cả Catalog vẫn còn thời hạn:
```ruby
Catalog.where.not(“state = ?”, “finished”)
```
Chúng ta sẽ gặp phải lỗi này:
```ruby
ActiveRecord::StatementInvalid: PG::InvalidTextRepresentation: ERROR: invalid input syntax for integer: "finished"
```
Vấn đề này chỉ xảy ra khi sử dụng `where`, vì giá trị thứ 2 sẽ được đặt trực tiếp vào trong câu sql, mà "finished" chắc chắn không phải một số nguyên.

Trường hợp tương tự cũng có thể xảy ra khi bạn trực tiếp gọi đến 1 câu SQL phức tạp, bỏ qua `ActiveRecord`. Khi truy vấn không được gọi vào Model, nó sẽ không hiểu được giá trị của các số nguyên mà chỉ hiểu đó là các số nguyên bình thường. Trong trường hợp đó, bạn cần mất công để làm các số nguyên đó có ý nghĩa trở lại.

`PostgreSQL` thường được sử dụng như một database trong Ruby on Rails. Bạn có thể sử dụng  `PostgreSQL enum` như một kiểu của thuộc tính trong database.
Giờ hãy xem thử nó như thế nào.
```ruby
rails g migration add_status_to_catalogs status:catalog_status
```
Tiếp theo chúng ta cần thay đổi migration một chút.
```ruby
class AddStatusToCatalogs < ActiveRecord::Migration[5.1]
  def up
    execute <<-SQL
      CREATE TYPE catalog_status AS ENUM ('published', 'unpublished', 'not_set');
    SQL
    add_column :catalogs, :status, :catalogs_status
  end

  def down
    remove_column :catalogs, :status
    execute <<-SQL
      DROP TYPE catalog_status;
    SQL
  end
end
```
Khai báo `enum` thì vẫn tương tự như trước
```ruby
class Catalog < ActiveRecord::Base
  enum status: { published: "published", unpublished: "unpublished", not_set: "not_set" }
end
```
### 3. Thêm index vào thuộc tính enum
**Nhược điểm trước khi thay đổi**: Hiệu suất truy vấn

Việc truy vấn để tìm kiếm hay lọc theo thuộc tính là khá thường xuyên, vì vậy nên thêm `index` vào trường đấy. Sửa đổi migration một chút:
```ruby
class AddIndexToCatalogs < ActiveRecord::Migration
  def change
    add_index :catalogs, :status
  end
end
```
### 4. Sử dụng prefix hay suffix trong enum
**Nhược điểm trước khi thay đổi**: Các phương thức không trực quan, khó đọc hiểu, dễ lỗi

Ví dụ trong Catalog có một vài `enum`:
```ruby
state: ["incoming", "in_progress", "finished"]

auction_type: ["traditional", "live", "internet"]

status: ["published", "unpublished", "not_set"]

localization: ["home", "foreign", "none"]
```
Ta thêm `prefix` hay `suffix` bằng cách:
```ruby
class Catalog < ActiveRecord::Base
  enum status: { published: "published", unpublished: "unpublished", not_set: "not_set" }, _prefix: :status
  enum auction_type: { traditional: "traditional", live: "live", internet: "internet" }, _suffix: true
end
```
Giờ hãy xem vì sao nó lại hữu dụng. Trước kia Catalog có 4 `enum` với 12 giá trị. Nó sẽ tạo ra 12 scope rất không trực quan.
```ruby
Catalog.not_set
Catalog.live
Catalog.unpublished
Catalog.in_progress
```
Nhìn vào đây bạn có dễ dàng biết được nó sẽ trả về gì không? Không, bạn sẽ phải nhớ hết 4 `enum` với 12 giá trị. Nó sẽ khá là phiền. Sau khi thêm `prefix` và `suffix`, nó sẽ như thế này:
```ruby
Catalog.status_not_set
Catalog.live_auction_type
Catalog.status_unpublished
Catalog.state_in_progress
```
Dễ nhìn hơn nhiều phải không.

Giả sử giờ ta cần thêm 1 `enum` nữa vào Model. Nó chỉ định thứ tự sắp xếp của các Catalog. Quan trọng là Catalog đứng đầu và đứng cuối, những cái khác có thể không set một giá trị cụ thể, ta gọi nó là `none`. 
```ruby
class Catalog < ActiveRecord::Base
  enum order: { first: "first", last: "last", other: "other", none: "none" }
end
```
Giờ hãy mở rails console để test `enum` mới. Chúng ta gặp phải lỗi sau:
```ruby
ArgumentError: You tried to define an enum named "order" on  the model "Catalog", but this will generate a class method "first", which is already defined by Active Record.
 ```
 Ok, chúng ta sẽ sửa lại nó:
 ```ruby
 class Catalog < ActiveRecord::Base
  enum order: { first_catalog: "first_catalog", last_catalog: "last_catalog", other: "other", none: "none" }
end
```
Lại một lỗi khác:
```ruby
ArgumentError (You tried to define an enum named "order" on the model "Catalog", but this will generate an instance method "none?", which is already defined by another enum.)
```
Quên mất `none` cũng được định nghĩa trong một thuộc tính khác.

`prefix` và `suffix` là giải pháp hoàn hảo để tránh vấn đề này. Chúng ta có thể khai báo các giá trị chúng ta muốn, không việc gì phải thay đổi cả. Các `scope` cũng sẽ trực quan và có ý nghĩa hơn. Chúng ta sẽ sửa lại thành như này:
```ruby
class Catalog < ActiveRecord::Base
  enum order: { first: "first", last: "last", other: "other", none: "none" }, _prefix: :order
end
```
### 5. Triển khai Value Object để xử lý enum
**Nhược điểm trước khi thay đổi**: Model bị phình to

Bạn nên tách các thuộc tính `enum` vào các Value Object trong 2 trường hợp sau:
1. Thuộc tính `enum` được sử dụng trong nhiều Model (ít nhất 2).
2. Thuộc tính `enum` có logic cụ thể làm phức tạp Model.

Để hiểu bước này thì trước tiên bạn cần hiểu [Value Object là gì](https://viblo.asia/p/value-objects-trong-ruby-on-rails-YWOZrM1pKQ0). 

Chúng ta sẽ tiếp tục sử dụng ví dụ về các tác phẩm nghệ thuật. Nơi bán các tác phẩm (auction houses) được đặt ở nhiều nơi. Ba Lan chia làm 16 khu vực, được gọi là `voivodeships`. Mỗi nơi bán tác phẩm có Address chứa thuộc tính `voivodeships`. Giả dụ chúng ta cần lấy ra danh sách các nơi bán tác phẩm ở phía Bắc hay ở các `voivodeships` phổ biến. Trong trường hợp này, việc đưa thêm logic vào model khiến nó phức tạp hơn rất nhiều. Thay vì thế ta có thể đưa logic vào một class khác để có thể tái sử dụng và dễ nhìn hơn.
```ruby
class Voivodeship
  VOIVODESHIPS = %w(dolnoslaskie kujawsko-pomorskie lubelskie    lubuskie lodzkie
    malopolskie mazowieckie opolskie podkarpackie podlaskie
    pomorskie slaskie swietokrzyskie warminsko-mazurskie
    wielkopolskie zachodnio-pomorskie).freeze
  NORTHERN_VOIVODESHIPS = %w(warminsko-mazurskie pomorskie zachodnio-pomorskie podlaskie).freeze
  MOST_POPULAR_VOIVODESHIPS = %w(dolnoslaskie mazowieckie slaskie malopolskie).freeze

  def initialize(voivodeship)
    @voivodeship = voivodeship
  end

  def northern?
    NORTHERN_VOIVODESHIPS.include? @voivodeship
  end

  def popular?
    MOST_POPULAR_VOIVODESHIPS.include? @voivodeship
  end

  def eql?(other)
    to_s.eql?(other.to_s)
  end

  def to_s
    @voivodeship.to_s
  end
end
```
Sau đó, trong model tương ứng, bạn cần overwrite lại các thuộc tính này. Trong model Address, ta sử dụng `array_to_enum_hash` để chuyển mảng `enum` thành Hash. 
```ruby
class Address < ApplicationRecord
  enum voivodeship: array_to_enum_hash(Voivodeship::VOIVODESHIPS), _sufix: true

  def voivodeship
    @voivodeship ||= Voivodeship.new(read_attribute(:voivodeship))
  end
end
```
Tất cả logic của `voivodeship` đã được đóng gói thành 1 lớp. Bạn có thể mở rộng nó tùy ý mà ko làm ảnh hưởng tới model Address.

Giờ, khi bạn muốn lấy ra thuộc tính `voivodeship`, nó sẽ trả về đối tượng của class Voivodeship. Nó gọi là Value Object.
```ruby
voivodeship_a = Address.first.voivodeship
# #<Voivodeship:0x000000000651eef0 @voivodeship="pomorskie">

voivodeship_b = Address.second.voivodeship
# #<Voivodeship:0x00000000064e9cf0 @voivodeship="pomorskie">

voivodeship_c = Address.third.voivodeship
# #<Voivodeship:0x000000000641ef00 @voivodeship="lodzkie">
```
voivodeship_a và voivodeship_b có giá trị giống nhau, nhưng vì nó là object, nên không thể so sánh bằng theo cách bình thường, chúng ta có thể kiểm tra bằng cách sử dụng `.eql?`
```ruby
voivodeship_a.eql? voivodeship_b
# true

voivodeship_a.eql? voivodeship_c
# false
```
Giờ bạn có thể sử dụng các phương thức được định nghĩa để thực hiện yêu cầu nêu phía trên.
```ruby
voivodeship_a.northern? # true
voivodeship_a.popular? # false

voivodeship_c.northern? # false
voivodeship_c.popular? # false
```
## Giải pháp cuối cùng
Cuối cùng cũng xong 5 bước, giờ chúng ta sẽ tổng hợp lại các bước thành 1 giải pháp. Chúng ta vẫn sử dụng thuộc tính `status` của model Catalog.

**Tạo migration:**
```bash
rails g migration add_status_to_catalogs status:catalog_status
```
**Sửa file migration:**
```ruby
class AddStatusToCatalogs < ActiveRecord::Migration[5.1]
  def up
    execute <<-SQL
      CREATE TYPE catalog_status AS ENUM ('published', 'unpublished', 'not_set');
    SQL
    add_column :catalogs, :status, :catalogs_status
    add_index :catalogs, :status
  end

  def down
    remove_column :catalogs, :status
    execute <<-SQL
      DROP TYPE catalog_status;
    SQL
  end
end
```
**Thiết lập ValueObject:**
```ruby
class CatalogStatus
  STATUSES = %w(published unpublished not_set).freeze

  def initialize(status)
    @status = status
  end

  # what you need here
end
```
**Model Catalog và khai báo enum:**
```ruby
class Catalog
  enum status: array_to_enum_hash(CatalogStatus::STATUSES), _sufix: true

  def status
    @status ||= CatalogStatus.new(read_attribute(:status))
  end
end
```

Hết rồi đó, hy vọng bài viết sẽ có ích với bạn! :3 

Nguồn tham khảo: [http://naturaily.com/blog/post/ruby-on-rails---how-to-create-perfect-enum-in-5-steps](http://naturaily.com/blog/post/ruby-on-rails---how-to-create-perfect-enum-in-5-steps)