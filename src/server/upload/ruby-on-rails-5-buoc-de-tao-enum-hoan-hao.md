Chắc hẳn các lập trình viên Rails không xa lạ gì với từ khóa enum. 
Một model của bạn có thể chứa nhiều thuộc tính với các loại dữ liệu khác nhau. Trong một số trường hợp, thuộc tính của bạn chỉ có thể được gán cho một trong một vài giá trị đã được định nghĩa sẵn, kiểu đó được gọi là `enumeration` hoặc đơn giản là `enum`. Ví dụ như một loại của hình thức phân phối: chuyển phát nhanh, gói bưu kiện hoặc cá nhân. Rails support enum từ version 4.1
 
 Project ví dụ được dùng trong bài viết có liên quan đến các tác phẩm nghệ thuật, `Artworks ` được thu thập trong một `Catalogs`. Catalog là một trong những model lớn nhất của project và trong số các thuộc tính của bảng này, chúng ta có 4 enum:
 ```
 state: ["incoming", "in_progress", "finished"]

auction_type: ["traditional", "live", "internet"]

status: ["published", "unpublished", "not_set"]

localization: ["home", "foreign", "none"]
```

### Giải pháp cơ bản
 
 Thêm một enum vào một model đã tồn tại thực sự rất đơn giản. Trước hết bạn cần thêm một migration thích hợp, chú ý kiểu dữ liệu của cột nên là integer vì đây là cách mà Rails lưu các giá trị enum trong database.
 ```
 rails g migration add_status_to_catalogs status:integer
 ```
 ```
 class AddStatusToCatalogs < ActiveRecord::Migration[5.1]
  def change
    add_column :catalogs, :status, :integer
  end
end
```
Bước tiếp theo là khai báo thuộc tính enum trong model:

```
class Catalog < ActiveRecord::Base
  enum status: [:published, :unpublished, :not_set]
end
```
Chạy `rake migrate` và thế là xong! Từ bây giờ bạn có thể tận dụng toàn bộ các phương thức hữu ích của enum.

Ví dụ: bạn có thể kiểm tra xem status hiện tại có giá trị là giá trị đặc tả hay không:
```
catalog.published? # false
```
Hoặc thay đổi giá trị khác cho status:
```
catalog.status = "published" # published
catalog.published! # published
```
Liệt kê tất cả catalog đã publish:
```
Catalog.published
```
Bạn có thể xem tất cả các phương thức của enum tại [ ActiveRecord::Enum](https://api.rubyonrails.org/v5.1/classes/ActiveRecord/Enum.html)

Giải pháp trên phù hợp cho dự án lúc ban đầu, nhưng bạn có thể gặp rắc rối khi dự án của bạn ngày càng phát triển. Để chuẩn bị, bạn có thể thực hiện một vài cải tiến giúp cho enums của bạn dễ bảo trì hơn:

### 1. Khai báo enum của bạn là một hash thay vì một array

Nhược điểm khi dùng array: Mapping giữa các giá trị được khai báo và số nguyên lưu trong database là dựa trên thứ tự trong mảng. 

Ví dụ:
```
class Catalog < ActiveRecord::Base
  enum localization: [:home, :foreign, :none]
end

=>
    0 -> home
    1 -> foreign
    2 -> none
```
Cách tiếp cận này không linh hoạt chút nào. Hãy tưởng tượng rằng các yêu cầu vừa thay đổi, bây giờ, localization `foreign` sẽ được chia thành "America" và "Asia". Trong trường hợp đó, bạn nên xóa giá trị cũ và thêm hai giá trị mới. Nhưng… bạn không thể xóa loại "foreign" sẽ không được sử dụng, bởi vì nó ảnh hưởng đến thứ tự của các giá trị còn lại. Để tránh tình trạng này, bạn nên khai báo enum của bạn dưới dạng Hash. Đơn giản bạn chỉ cần thay đổi:
```
class Catalog < ActiveRecord::Base
  enum localization: { home: 0, foreign: 1, none: 2 }
end
```
Cách khai báo này không phụ thuộc vào thứ tự các phần tử, bạn có thể thực hiện các thay đổi hoặc loại bỏ các giá trị không sử dụng.

### 2. Tích hợp ActiveRecord::Enum với PostgreSQL enum

Nhược điểm của bước trước: Các giá trị số nguyên không có ý nghĩa trong cơ sở dữ liệu.

Làm việc với các thuộc tính có giá trị là các số nguyên trong database có thể gây phiền toái. Hãy tưởng tượng rằng bạn muốn truy vấn một cái gì đó trong rails console hoặc khi bạn tạo một scope dựa trên các trường enum của bạn, giả sử bạn muốn lấy tất cả các catalog vẫn đang được cập nhập, bạn có thể viết một mệnh đề `where` như sau:
```
Catalog.where.not(“state = ?”, “finished”)
```
Chúng ta có thể nhận lại lỗi:
```
ActiveRecord::StatementInvalid: PG::InvalidTextRepresentation:
ERROR: invalid input syntax for integer: "finished"
```
Vấn đề này xảy ra chỉ trong định dạng array của mệnh đề `where` vì giá trị thứ 2 được truyền trực tiếp vào mệnh đề `where SQL` là "finished' và đây không phải là một số nguyên.

Một trường hợp tương tự có thể xuất hiện khi bạn triển khai truy vấn SQL phức tạp mà không sử dụng ActiveRecord. Khi truy vấn không truy cập được vào model thì bạn sẽ mất thông tin có ý nghĩa về các giá trị của enum và chỉ còn lại các số nguyên thuần túy không có ý nghĩa. Trong trường hợp đó, bạn cần phải tìm cách để làm cho các số nguyên này có ý nghĩa trở lại.

Một tình huống khó chịu khác có thể xảy ra khi bạn làm việc với một cơ sở dữ liệu kế thừa như thế này. Bạn có quyền truy cập vào cơ sở dữ liệu và bạn chỉ quan tâm đến dữ liệu được lưu giữ ở đó. Bạn không thể nhận được thông tin ngay lập tức từ những gì bạn thấy và luôn cần phải mapping những con số này thành các giá trị thực tế của enum.

Bạn nên nhớ rằng khi enum integer bị tách khỏi model của nó như trong các ví dụ trên thì chúng ta sẽ mất thông tin của dữ liệu đó.

Để thuyết phục hơn, khi khai báo `ActiveRecord::Enum`, không có gì đảm bảo rằng dữ liệu của bạn sẽ bị hạn chế chỉ với các giá trị đã được cung cấp. Thay đổi có thể được thực hiện bởi bất kỳ lệnh SQL insert nào. Mặt khác, khi bạn khai báo `PostgreSQL enum` bạn sẽ bị hạn chế về mức cơ sở dữ liệu. Bạn cần phải quyết định mức độ chắc chắn của mình.

`PostgreSQL` thường được sử dụng như một database trong các dự án Ruby on Rails. Bạn có thể sử dụng `PostgreSQL enum` làm kiểu của một thuộc tính trong bảng.

Hãy xem nó trông như thế nào:
```
rails g migration add_status_to_catalogs status:catalog_status
```
Bạn cần thay đổi loại thuộc tính. Tôi không khuyên bạn nên tạo các loại dữ liệu như "status" vì có khả năng một trạng thái khác sẽ xuất hiện trong tương lai. Tiếp theo, bạn cần thay đổi file migration một chút. Nên cài đặt một hàm có thể rollback migration và có thể thực thi SQL.

```
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
 Và khai báo giống như trước trong model:
 ```
 class Catalog < ActiveRecord::Base
  enum status: { published: "published", unpublished: "unpublished", not_set: "not_set" }
end
```

### 3. Thêm index cho thuộc tính enum

Nhược điểm của bước trước: Hiệu suất truy vấn.


Việc thêm index này thì đơn giản. Thuộc tính enum của bạn có khả năng được dùng để phân biệt các đối tượng trong một model cụ thể. Giống như `status` của chúng ta: một số Catalog được publish và một số khác thì không. Kết quả là, tìm kiếm hoặc lọc theo thuộc tính đó sẽ là một hành động khá thường xuyên, do đó, chúng ta nên thêm một chỉ mục vào trường đó giúp cho việc tìm kiếm nhanh hơn. Hãy thêm migration để thực hiện điều đó:

```
class AddIndexToCatalogs < ActiveRecord::Migration
  def change
    add_index :catalogs, :status
  end
end
```

### 4. Sử dụng tiền tố(prefix) hoặc hậu tố(suffix) trong tên enum

Nhược điểm của bước trước:
 - Các scope không trực quan
 - Tính dễ đọc kém của các phương thức helper
 - Dễ bị lỗi

Hãy nhớ lại các enum trong model catalog:
```
state: ["incoming", "in_progress", "finished"]

auction_type: ["traditional", "live", "internet"]

status: ["published", "unpublished", "not_set"]

localization: ["home", "foreign", "none"]
```
Để thêm  prefix hoặc suffix cho enum, thêm vào option khi khai báo enum:
```
class Catalog < ActiveRecord::Base
  enum status: { published: "published", unpublished: "unpublished", not_set: "not_set" }, _prefix: :status
  enum auction_type: { traditional: "traditional", live: "live", internet: "internet" }, _suffix: true
end
```
Giờ hãy xem sự hữu dụng của chúng, trong model catalog có 4 enum và 12 giá trị trong đó, nó tạo ra 12 scopes và những scope này đều không trực quan:
```
Catalog.not_set
Catalog.live
Catalog.unpublished
Catalog.in_progress
```
Liệu bạn có thể đễ dàng nhìn ra giá trị mà những phương thức này trả về? Không, bạn phải luôn nhớ các scope trông như thế nào và nó thực sự là phiền nhiễu.
```
Catalog.status_not_set
Catalog.live_auction_type
Catalog.status_unpublished
Catalog.state_in_progress
```
như thế này thì trông tốt hơn.

Giả sử bây giờ bạn cần thêm một enum nữa vào model của bạn và nó lưu thông tin về thứ tự của mỗi catalog bên trong catalog chung. Thứ tự của một số catalog có thể không được chỉ định. Điều quan trọng nhất là phải biết cái nào là cái đầu tiên và cái nào là cuối cùng. Chúng ta có thể tạo một enum khác:

```
class Catalog < ActiveRecord::Base
  enum order: { first: "first", last: "last", other: "other", none: "none" }
end
```
Hãy mở rails console và test enum mới:
```
Catalog.order
```
Bạn sẽ nhận lỗi:
```
 ArgumentError: You tried to define an enum named "order" on
 the model "Catalog", but this will generate a class method
 "first", which is already defined by Active Record.
```
OK, chúng ta có thể fix nó:
```
class Catalog < ActiveRecord::Base
  enum order: { first_catalog: "first_catalog", last_catalog: "last_catalog", other: "other", none: "none" }
end
```
nhưng lại nhận một lỗi khác:
```
ArgumentError (You tried to define an enum named "order" on the
model "Catalog", but this will generate an instance method
"none?", which is already defined by another enum.)
```
Ok, giờ thì rõ ràng. Chúng ta quên rằng giá trị "none" đã được khai báo trong một thuộc tính khác.

Prefix hoặc suffix là lựa chọn hoàn hảo để tránh các rắc rối. Chúng ta có thể khai báo các giá trị giống như chúng ta muốn, không có lý do gì để thay đổi các từ mà dễ mô tả nhất. Theo cách tiếp cận đó, các scope sẽ trực quan và có ý nghĩa hơn. Như vậy, thuộc tính mới có thể khai báo như sau:
```
class Catalog < ActiveRecord::Base
  enum order: { first: "first", last: "last", other: "other", none: "none" }, _prefix: :order
end
```

### 5. Cài đặt Value Object để xử lý một enum

Nhược điểm của bước trước: Fat model

Enum nên được tách thành value object trong hai trường hợp:

- Thuộc tính enum được sử dụng trong nhiều model (ít nhất là 2).
- Thuộc tính enum đặc tả một logic phức tạp trong một model.

Giờ hãy xem tình huống của chúng ta: Các nhà đấu giá của chúng ta (auction house - nơi các tác phẩm nghệ thuật được bán) được đặt trên toàn quốc. Ba Lan chia thành 16 vùng, được gọi là voivodeships. Mỗi model `AuctionHouse` có `Address` cụ thể chứa thuộc tính `Voivodeship`. Bạn có thể tưởng tượng rằng vì một lý do nào đó cần thiết để chỉ liệt kê những nhà đấu giá phía bắc hoặc những nơi có voivodeship phổ biến nhất. Trong trường hợp đó, nó là cần thiết để đưa thêm logic vào model của chúng ta, những gì khiến cho nó thành fat model. Để tránh điều đó, bạn có thể trích xuất logic đó vào một lớp khác mà nó có thể tái sử dụng và gọn gàng hơn.
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
Sau đó, trong model tương ứng của bạn, bạn cần phải ghi đè lên thuộc tính này. Trong project của chúng ta là model `Address`. `array_to_enum_hash` chỉ là phương thức helper chuyển đổi array của các giá trị enum thành một Hash.
```
class Address < ApplicationRecord
  enum voivodeship: array_to_enum_hash(Voivodeship::VOIVODESHIPS), _sufix: true

  def voivodeship
    @voivodeship ||= Voivodeship.new(read_attribute(:voivodeship))
  end
end
```
Đây là những gì bạn đạt được. Toàn bộ logic liên quan đến voivodeships được đóng gói thành một class duy nhất. Bạn có thể mở rộng nó như bạn muốn và model `Address` vẫn giữ nguyên.

Giờ, khi bạn muốn lấy thuộc tính `voivodeship`, đối tượng của lớp `Voivodeship` sẽ được trả về, đó chính là Value Object của bạn.
```
voivodeship_a = Address.first.voivodeship
# #<Voivodeship:0x000000000651eef0 @voivodeship="pomorskie">

voivodeship_b = Address.second.voivodeship
# #<Voivodeship:0x00000000064e9cf0 @voivodeship="pomorskie">

voivodeship_c = Address.third.voivodeship
# #<Voivodeship:0x000000000641ef00 @voivodeship="lodzkie">
```
Hãy xem cả hai voivodeships có cùng giá trị (voivodeship_a và voivodeship_b), nhưng vì chúng là đối tượng nên chúng không bằng nhau. chúng ta có thể kiểm tra điều đó nhờ phương thức `eql?`:
```
voivodeship_a.eql? voivodeship_b
# true

voivodeship_a.eql? voivodeship_c
# false
```

và chúng ta cũng có thể sử dụng được các phương thức đã mà chúng ta đã định nghĩa ra trước đó:

```
voivodeship_a.northern? # true
voivodeship_a.popular? # false

voivodeship_c.northern? # false
voivodeship_c.popular? # false
```


Ok, bạn vừa đọc qua 5 phương án cải tiến enum. Bây giờ là lúc tổng hợp tất cả các bước và tạo ra giải pháp tối ưu. Ví dụ: hãy lấy thuộc tính `status` từ model `Catalog`. Việc cài đặt có thể  như sau:
- Tạo migration:
```
rails g migration add_status_to_catalogs status:catalog_status
```
- Chạy migrate:

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
- Tạo ValueObject:

```
class CatalogStatus
  STATUSES = %w(published unpublished not_set).freeze

  def initialize(status)
    @status = status
  end

  # what you need here
end
```
- Tạo catalog model và khai báo enum:

```
class Catalog
  enum status: array_to_enum_hash(CatalogStatus::STATUSES), _sufix: true

  def status
    @status ||= CatalogStatus.new(read_attribute(:status))
  end
end
```

### Tổng kết

Trên đây là 5 bước giúp cải tiến enum trong ứng dụng Rails. Một số trong số chúng có thể cần thiết, một số thì không được sử dụng nhiều lắm. Bạn có thể lựa chọn giải pháp nào tùy theo nhu cầu của mình. Hy vọng rằng bạn đã tìm thấy một cái gì đó hữu ích trong bài viết này.

Link nguồn: [ruby-on-rails-enum](https://naturaily.com/blog/ruby-on-rails-enum)