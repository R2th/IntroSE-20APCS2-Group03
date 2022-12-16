![](https://images.viblo.asia/45b30927-7001-48aa-b6ff-0651b24d3cb3.png)
"Rails chậm lắm" - đây có vẻ là câu nói có thể bạn hay thấy trên các diễn đàn khi đem các ngôn ngữ ra so sánh để hạ thấp nhau. Câu nói này thực ra cũng không sai. Ruby dường như chậm hơn các đối thủ cạnh tranh trực tiếp như Node.js, Python. Tuy nhiên, nhiều công ty startups nhỏ vẫn sử dụng nó để build nên các platform với hàng triệu user. Vậy có thể giải thích sự mâu thuẫn này như thế nào?

## Điều gì làm cho app của bạn chậm?
Có rất nhiều lý do đằng sau nó, việc query và database dường như là 1 lý do lớn khiến performance của app thấp. Load quá nhiều data vào bộ nhớ, N+1 queries, nhiều values chưa được cache, quên đánh index là những nguyên nhân chủ chốt dẫn đến việc query chậm.

Thậm chí nếu app bạn đang chạy nhanh, nó vẫn có thể chậm đi chỉ trong vài tháng, các API đang gọi ngon lành đột nhiên lăn ra chết, HTTP 502 response xuất hiện :v. Sau tất cả thì việc làm việc với các bảng dữ liệu vài trăm records rất khác so với bảng cả triệu records.

## Việc kiểm tra sự tồn tại của đối tượng
Hay còn gọi là "existence check", việc này khá phổ biến khi làm việc với database.
Có rất nhiền cách để thực hiện existence check, chúng ta có các method như `present?`, `empty?`, `any?`, `exists?`. Nhưng mỗi method này lại có sự khác nhau rất lớn về performance.

Method luôn được recommend là `.exists?`.

Ví dụ: ta muốn tìm ra 1 bản build passed trong vòng 7 ngày đổ lại.
Hãy xem các trường hợp dưới đây:

```
Build.where(:created_at => 7.days.ago..1.day.ago).passed.present?

# SELECT "builds".* FROM "builds" WHERE ("builds"."created_at" BETWEEN
# '2019-02-22 21:22:27.133402' AND '2019-02-28 21:22:27.133529') AND
# "builds"."result" = $1  [["result", "passed"]]


Build.where(:created_at => 7.days.ago..1.day.ago).passed.any?

# SELECT COUNT(*) FROM "builds" WHERE ("builds"."created_at" BETWEEN
# '2019-02-22 21:22:16.885942' AND '2019-02-28 21:22:16.886077') AND
# "builds"."result" = $1  [["result", "passed"]]


Build.where(:created_at => 7.days.ago..1.day.ago).passed.empty?

# SELECT COUNT(*) FROM "builds" WHERE ("builds"."created_at" BETWEEN
# '2019-02-22 21:22:16.885942' AND '2019-02-28 21:22:16.886077') AND
# "builds"."result" = $1  [["result", "passed"]]


Build.where(:created_at => 7.days.ago..1.day.ago).passed.exists?

# SELECT 1 AS one FROM "builds" WHERE ("builds"."created_at" BETWEEN
# '2019-02-22 21:23:04.066301' AND '2019-02-28 21:23:04.066443') AND
# "builds"."result" = $1 LIMIT 1  [["result", "passed"]]
```
Cách gọi đầu tiên sử dụng `.present?`rất không hiệu quả. Nó load toàn bộ record của database vào bộ nhớ, tạo nên các Active Record objects, sau đó bắt đầu tìm theo điều kiện. Nếu có 1 table lớn, việc tìm kiếm sẽ trở nên rất mệt mỏi, load 1 lúc cả triệu records và gây downtime cho app.

Cách tiếp cận thứ 2 và 3, `any?`, `empty?` đã được optimized trong Rails và chỉ load `COUNT(*)` vào bộ nhớ, queries kiểu `COUNT(*)` thường hiệu quả hơn, ta có thể dùng nó thậm chí trong những table to mà không cần phải lo gì.

Còn cách thứ 4, `exists?`, được optimized tốt hơn nữa, nó nên là lựa chọn số 1 khi kiểm tra sự tồn tại của record, `SELECT 1 ... LIMIT 1`, siêu nhanh, nhỉ?

OK, đây là kêt quả của từng queries:
```
present? =>  2892.7 ms
any?     =>   400.9 ms
empty?   =>   403.9 ms
exists   =>     1.1 ms
```
Chỉ 1 tinh chỉnh nhỏ này cũng có thể làm code của bạn chạy nhanh hơn 400 lần trong vài trường hợp nào đó.

## Thế có nên lúc nào cũng dùng `exists?` không?
Mình cũng băn khoăn, có phải liệu nó có nên được mặc định cho việc tối ưu hiệu suất? Tuy nhiên cũng có vài ngoại lệ.

Ví dụ, nếu mình check tồn tại của 1 association record mà ko dùng scope, thì `any?`, `empty?` cũng cung cấp dạng query tối ưu kiểu `SELECT 1 FROM … LIMIT 1`, nhưng `any?` ko thọc vào database nữa nếu record đó đã được load vào bộ nhớ. Đỉnh chưa?
```
project = Project.find_by_name("eagle")

project.builds.load    # eager loads hết đống build vào cache

project.builds.any?    # ko thọc vào db
project.builds.exists? # thọc vào db

# nếu đống cache bị xóa
project.builds(true).any?    # thọc vào db
project.builds(true).exists? # thọc vào db
```

Kết luận cuối cùng là vẫn nên xài `exists?`! :#)

## Quy tắc đánh index
Khi tạo 1 column, cần xem thử column đó có dùng để tìm kiếm, lấy ra nhiều ko.
Ví dụ ta có model Project, với thuộc tính "name". Hiển nhiên việc tìm kiếm project bằng name diễn ra khá thường xuyên
```
project = Project.find_by name: params[:name]
```
Nếu ko có index, database engine sẽ phải check từng record một trong table projects cho tới khi nào tìm thấy thì thôi.

Nếu ta đánh index vào thì sao? Việc tìm kiếm sẽ trở nên rất nhanh.
```
class IndexProjectsOnName < ActiveRecord::Migration
  def change
    add_index :projects, :name
  end
end
```
Index giống như mục lục 1 cuốn sách, ta có thể đọc cả cuốn sách để tìm 1 từ, hoặc chỉ cần mở phụ lục, tìm đến phần chứa các từ quan trọng đã sắp xếp theo alphabet, lật đến trang đó và tìm trong đó thôi. Đơn giản hơn nhiều phải không?

## Cái gì cần đánh index?
Quy tắc ngón tay cái là đánh index cho mọi thứ liên quan đến `WHERE`, `HAVING` và `ORDER BY` trong SQL queries.

### Index cho tìm kiếm duy nhất
Việc tìm kiếm dựa trên column chứa giá trị duy nhất nên cần được đánh index. Ví dụ:
```
User.find_by username: "TVQ"
User.find_by email: "tvq@example.com"
```
query trên sẽ rất xịn xò nếu mình đánh index cho username và email
```
add_index :users, :username
add_index :users, :email
```

### Index cho khóa ngoại (foreign keys)
Nếu có các relationship như `belongs_to`, `has_many` thì việc đánh index cho các khóa ngoại sẽ giúp tối ưu quá trình tìm kiếm. Ví dụ:
```
class Project < ActiveRecord::Base
  has_many :branches
end

class Branch < ActiveRecord::Base
  belongs_to :project
end
```
Muốn tìm nhanh thì cần đánh index như bên dưới:
```
add_index :branches, :project_id
```

Với polymorphic associations, `owner` của `project` đồng thời có thể là `User` hoặc là `Organization`:
```
class Organization < ActiveRecord::Base
  has_many :projects, :as => :owner
end

class User < ActiveRecord::Base
  has_many :projects, :as => :owner
end

class Project < ActiveRecord::Base
  belongs_to :owner, :polymorphic => true
end
```
Ta cần 1 cái double index:
```
# Dỡ: cái này chẳng có tác dụng gì cả

add_index :projects, :owner_id
add_index :projects, :owner_type

# Ngon: index này là thích hợp

add_index :projects, [:owner_id, :owner_type]
```
### Index cho việc sắp xếp
Các đối tượng được sắp xếp thường xuyên đều nên được đánh index. Ví dụ: 
```
Build.order(:updated_at).take(10)
```
nên cần: 
```
add_index :updated_at
```
## Có nên lúc nào cũng đánh index không?
Việc dùng index cho các field quan trọng có thể giúp cải thiện performance, nhưng bên cạnh đó cũng có thể làm app chậm hơn. Ví dụ, table có nhiều phần tử thường xuyên bị xóa có thể gây ảnh hưởng tiêu cực đến performance. Table lớn với cả triệu record sẽ cần nhiều bộ chứa để lưu index. Tùy theo tình huống để đưa ra quyết định hợp lý.

Ref: https://link.sun-asterisk.vn/cL9owP, https://link.sun-asterisk.vn/0pVkWy