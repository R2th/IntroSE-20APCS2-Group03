Khi dự án của bắt đầu, ta có thể thiết kế sơ đồ ERD hoặc một sơ đồ tương tự. Sau đó, mỗi khi khách hàng request specs mới thì ta lại cần phải sửa đổi nó. Quá trình đó giúp chúng ta hiểu được domain cụ tỷ và phản ánh thực tế. Các thực thể mà model chứa nhiều thuộc tính của nhiều types khác nhau. Một yêu cầu khá phổ biến là tạo một thuộc tính có thể được gán cho một trong những giá trị có sẵn. Trong lập trình, được gọi là `enumeration` hoặc `enum` - chắc hẳn mọi người đã vô cùng quen thuộc.

Ở phạm vi bài viết này chúng ta cùng tìm hiểu 3 phần:
- solution cơ bản - giới thiệu thằng ActiveRecord::Enum đơn giản nhất có thể
- 5 steps khác nhau để cải thiện chức năng enum
- solution cuối cùng - gộp tất cả những cải tiến trong một lần implementation


Ta cùng đi tìm hiểu những phần này từ ví dụ:

Giả sử đang làm việc trên một hệ thống liên quan đến tác phẩm nghệ thuật(Artworks). `Artworks` được tập hợp vào `Catalogs` và`Catalogs` là một trong những model lớn nhất trong ứng dụng này. Trong số nhiều thuộc tính thì có 4 loại enum sau: 


`state: ["incoming", "in_progress", "finished"]`

`auction_type: ["traditional", "live", "internet"]`

`status: ["published", "unpublished", "not_set"]`

`localization: ["home", "foreign", "none"]`

### Basic Solution

Thêm enum vào 1 model hiện tại là cách thực sự giản đơn. 
Đầu tiên là tạo một migrate thích hợp và luôn lưu ý rằng type column này là integer và đó cũng chính là cách Rails giữ các giá trị enums trong cơ sở dữ liệu.

Chúng ta lưu `enum` vào DB là kiểu integer nhưng lại có thể truy vấn thuộc tính mà dùng `enum` theo tên.

```
rails g migration add_status_to_catalogs status:integer


class AddStatusToCatalogs < ActiveRecord::Migration[5.1]
  def change
    add_column :catalogs, :status, :integer
  end
end
```

tiếp theo chỉ cần khai báo `enum` trong chính model đó:

```
class Catalog < ActiveRecord::Base
  enum status: [:published, :unpublished, :not_set]
end
```

Từ bây giờ bạn có thể tận dụng toàn bộ các methods bổ sung, cũng như tận dụng scope mà `enum` hỗ trợ các dựa trên chính giá trị đã khai báo.

```
catalog = Catalog.first

- check giá trị hiện tại xem được set 1 giá trị cụ thể hay không:
catalog.published? # false

- change status sang giá trị khác:
catalog.status = "published" # published
catalog.published! # published

- liệt kê list catalog đã pulished
Catalog.published
```

Ta có thể xem toàn bộ các method ở [ActiveRecord::Enum.](https://api.rubyonrails.org/v5.1/classes/ActiveRecord/Enum.html)

### 5 steps để cải thiện enum
1. Khai báo enum là một Hash không phải Array  

**Nhược điểm trước khi thay đổi:** Ánh xạ giữa các giá trị khai báo và số nguyên được lưu vào trong cơ sở dữ liệu dựa trên thứ tự trong mảng.

```
class Catalog < ActiveRecord::Base
  enum localization: [:home, :foreign, :none]
end

0 -> home
1 -> foreign
2 -> none

```

Việc khai báo `enum` bằng Array thực sự không được linh hoạt. Với trường hợp cần thêm vào giá trị mới hay xóa đi giá trị cũ nó sẽ gây xáo trộn thứ tự các giá trị đã có.

Chẳng hạn như, ta giả sử rằng `localization` của `foreign`  nên được chia thành America” và “Asia". Trong trường hợp đó,  ta nên loại bỏ giá trị cũ `foreign` và thêm vào hai giá trị mới. Nhưng ta lại không thể loại bỏ `foreign` không được sử dụng vì nó vi phạm một trật tự của các giá trị còn lại. Để tránh tình trạng này, ta nên khai báo enum là Hash.

```
class Catalog < ActiveRecord::Base
  enum localization: { home: 0, foreign: 1, none: 2 }
end
```

Khai báo như vậy sẽ không phụ thuộc vào order, do đó bạn sẽ có thể thực hiện các thay đổi và thoát khỏi giá trị enum không sử dụng.


2.  Tích hợp ActiveRecord::Enum với PostgreSQL enum

**Nhược điểm trước khi thay đổi:** Các giá trị nguyên vô nghĩa trong cơ sở dữ liệu.

Làm việc với các thuộc tính đại diện bởi số nguyên trong DB có thể gây phiền toái.
Hãy tưởng tượng rằng bạn muốn query trên `rails console` hay thậm chí bạn cần tạo một `scope` dựa trên trường enum của mình.

Trở lại với ví dụ trong bài viết này, giả sử rằng bây giờ muốn query tất cả catalog vẫn còn đang cập nhật, ta sẽ query như sau:

```
Catalog.where.not(“state = ?”, “finished”)
```

raise 1 lỗi như expected

```
ActiveRecord::StatementInvalid: PG::InvalidTextRepresentation:
ERROR: invalid input syntax for integer: "finished"
```

Vấn đề này chỉ xảy ra ở format array của mệnh đề where bởi vì giá trị thứ hai được đặt trực tiếp vào mệnh đề where SQL và rõ ràng là "finished" không phải là một số nguyên.


Một trường hợp tương tự có thể xuất hiện khi bạn triển khai query SQL phức tạp và bỏ qua lớp ActiveRecord. Khi query không có quyền truy cập vào model thì bạn sẽ mất thông tin có ý nghĩa về các giá trị và trở thành các số nguyên thuần túy. Trong trường hợp đó, bạn cần phải làm cho các số nguyên này có ý nghĩa trở lại.

Một tình huống phiền toái khác có thể xảy ra khi bạn làm việc với DB kế thừa như thế này. Bạn có quyền truy cập vào DB và bạn chỉ quan tâm đến data được lưu giữ ở đó. Bạn không thể get được thông tin ngay tức thì từ những gì bạn nhìn thấy. Luôn luôn cần mapping những số này thành các giá trị thực từ domain.

*Do đó, ta phải nhớ rằng khi `integer enum` được tách ra khỏi model của nó như trong các ví dụ ở trên thì chúng ta sẽ mất thông tin.*


Khi khai báo `ActiveRecord :: Enum`, không có gì đảm bảo rằng data của bạn sẽ chỉ bị giới hạn ở các giá trị được cung cấp. Thay đổi có thể được thực hiện bởi bất kỳ SQL insertions. Mặt khác, khi bạn khai báo ` PostgreSQL enum` bạn sẽ bị ràng buộc về mức độ DB. 

`PostgreSQL` thường được sử dụng làm cơ sở dữ liệu trong các dự án Ruby on Rails. Bạn có thể sử dụng `PostgreSQL enum` như một loại thuộc tính trong bảng cơ sở dữ liệu.

```
rails g migration add_status_to_catalogs status:catalog_status
```
- thay đổi 1 chút migrate như sau:

```
class AddStatusToCatalogs < ActiveRecord::Migration[5.1]
  def up
    execute <<-SQL
      CREATE TYPE catalog_status AS ENUM ('published', 'unpublished', 'not_set');
    SQL
    add_column :catalogs, :status, :catalog_status
  end

  def down
    remove_column :catalogs, :status
    execute <<-SQL
      DROP TYPE catalog_status;
    SQL
  end
end
```

- Khai báo trong model:
```
class Catalog < ActiveRecord::Base
  enum status: { published: "published", unpublished: "unpublished", not_set: "not_set" }
end
```

3.  Add index cho một thuộc tính enum

**Nhược điểm trước khi thay đổi**:  Tốc độ query

Giống như với `status` trong ví dụ: thì một số `catalog` được `published` và một số khác thì không. Do đó, tìm kiếm hoặc filter theo thuộc tính đó sẽ là một task khá thường xuyên, vậy nên đáng để thêm một index vào trường status vì nó sẽ cải thiện được tốc độ query một cách đáng kể.

```
class AddIndexToCatalogs < ActiveRecord::Migration
  def change
    add_index :catalogs, :status
  end
end
```

4.  Dùng frefix và suffix cho enums

**Nhược điểm trước khi thay đổi:**

- scope không trực quan

- Khả năng đọc kém của các helper method

- Dễ bị lỗi

Có thể thêm prefix và suffix như sau:

```
class Catalog < ActiveRecord::Base
  enum status: { published: "published", unpublished: "unpublished", not_set: "not_set" }, _prefix: :status
  enum auction_type: { traditional: "traditional", live: "live", internet: "internet" }, _suffix: true
end
```

Chúng ta cùng xem tại sao khi thêm frefix hay suffix lại thêm hữu ích như vậy. 

- Trong model `Catalog`, chúng tôi có 4 enum và 12 values. Nó tạo ra 12 scope và scope này thật sự rất không trực quan.

```
Catalog.not_set
Catalog.live
Catalog.unpublished
Catalog.in_progress

```
**Bạn thấy clear và hiểu những gì các method trả về?** Không, bạn cần phải nhớ tất cả các scope trông như thế nào và điều này thật sự gây nên sự phiền toái.

- Nhưng sau khi thêm prefix hay suffix nó sẽ trở nên clear và dễ nhìn hơn hẳn

```
Catalog.status_not_set
Catalog.live_auction_type
Catalog.status_unpublished
Catalog.state_in_progress
```

5.  Implement một Value Object để xử lý một enum

**Nhược điểm trước khi thay đổi**: Fat model

Nên trích xuất thuộc tính enum vào Value Object tách biệt trong hai trường hợp:
- Thuộc tính Enum được sử dụng trong nhiều model (từ 2 trở lên)
- Thuộc tính Enum có logic cụ thể làm phức tạp model.

Cùng xem xét thông qua ví dụ cụ thể sau đây:

Tại các nhà đấu giá (nơi bán tác phẩm nghệ thuật - artworks trong ví dụ phía trên bài viết) được đặt trên toàn quốc. Ba Lan chia thành 16 khu vực, được gọi là `voivodeships`. Mỗi một model `AuctionHouse` thì có `Address` cụ thể có chứa thuộc tính `Voivodeship`. 

Giả sử rằng vì một số lý do, chỉ cần liệt kê các nhà đấu giá phía bắc hoặc những nhà từ các `voivodeships` phổ biến. Trong trường hợp đó, cần phải đưa thêm logic vào model, điều này dẫn đến tình trạng `fat model`. 

Chúng ta có thể thấy class Voivodeship sau đây bị phình to nhìn rất rối mắt

```
class Voivodeship
  VOIVODESHIPS = %w(dolnoslaskie kujawsko-pomorskie lubelskie lubuskie lodzkie
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

- Để tránh việc `fat model`, bạn có thể đưa logic đó vào một class khác làm cho nó có thể tái sử dụng và clear hơn.
- Sau đó, cần overwrite thuộc tính này trong model tương ứng. Trong ví dụ này thì đó là model `Address`. `array_to_enum_hash` là method giúp convert mảng giá trị enum thành hash.

=>  Và chúng ta đã đạt được mục đích khi đã đưa được toàn bộ logic liên quan đến voivodeships gói gọn trong một class duy nhất.


```
class Address < ApplicationRecord
  enum voivodeship: array_to_enum_hash(Voivodeship::VOIVODESHIPS), _sufix: true

  def voivodeship
    @voivodeship ||= Voivodeship.new(read_attribute(:voivodeship))
  end
end
```

- cả 2 `voivodeships` đều có cùng value nhưng object của chúng lại khác nhau. Nhờ vào method helper mà chúng ta có thể kiểm tra được equal theo cách đó:

```
voivodeship_a = Address.first.voivodeship
# #<Voivodeship:0x000000000651eef0 @voivodeship="pomorskie">

voivodeship_b = Address.second.voivodeship
# #<Voivodeship:0x00000000064e9cf0 @voivodeship="pomorskie">

voivodeship_c = Address.third.voivodeship
# #<Voivodeship:0x000000000641ef00 @voivodeship="lodzkie">

voivodeship_a.eql? voivodeship_b
# true

voivodeship_a.eql? voivodeship_c
# false
```

- Và những gì mạnh nhất bạn có thể tận dụng tất cả ưu thể của các method được xác định đại diện cho các yêu cầu đã chỉ định trước đó.


```
voivodeship_a.northern? # true
voivodeship_a.popular? # false

voivodeship_c.northern? # false
voivodeship_c.popular? # false
```

### Giải pháp cuối 

Chúng ta đã đi qua 5 steps để cải tiến `enum` và giờ là lúc tổng hợp tất cả các bước và tạo ra giải pháp cuối cùng. 

Ví du: lấy thuộc tính `status` của `Catalog` và làm như bên dưới đây

- Migration Generation:

```
rails g migration add_status_to_catalogs status:catalog_status
```
- Migration:

```
class AddStatusToCatalogs < ActiveRecord::Migration[5.1]
  def up
    execute <<-SQL
      CREATE TYPE catalog_status AS ENUM ('published', 'unpublished', 'not_set');
    SQL
    add_column :catalogs, :status, :catalog_status
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


- ValueObject:

```
class CatalogStatus
  STATUSES = %w(published unpublished not_set).freeze

  def initialize(status)
    @status = status
  end

  # what you need here
end
```

- Catalog model & khai báo enum:

```
class Catalog
  enum status: array_to_enum_hash(CatalogStatus::STATUSES), _sufix: true

  def status
    @status ||= CatalogStatus.new(read_attribute(:status))
  end
end
```

Tóm lại, bài viết đưa ra tất cả - 5 bước để xây dựng một implement enum trong Rails tốt hơn.

Bài viết được dịch từ [how to create perfect enum in 5 steps](https://naturaily.com/blog/ruby-on-rails-enum)

**Thanks for your reading!**