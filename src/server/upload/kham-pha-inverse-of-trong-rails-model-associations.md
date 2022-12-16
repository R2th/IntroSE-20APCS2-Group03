Chắc hẳn bạn đã từng thấy trong project rails của mình đoạn `:inverse_of`  trong một association. Đã bao giờ bạn tự hỏi nó đã làm gì và tại sao nó lại ở đó mà không phải là một lựa chọn khác ?

```
class Criminal < ActiveRecord::Base
 belongs_to :prison, inverse_of: :criminals
end

class Prison < ActiveRecord::Base
 has_many :criminals, inverse_of: :prison
end
```

Lần đầu tiên khi tôi thấy, hình như đó là một điều không cần thiết cho lắm. Tại sao lại `:inverse_of` ?

### Tối ưu hóa bộ nhớ khi truy vấn các bản ghi liên kết

Theo mặc định thì các đối tượng được liên kết sẽ không cùng trỏ tới cùng bộ nhớ. Theo dõi ví dụ minh họa:

```
prison = Prison.create(name: 'Bad House')
criminal = prison.criminals.create(name: 'Krazy 8')

# Without :inverse_of
criminal.prison == prison
# Prison Load (0.1ms) SELECT "prisons".* FROM "prisons" WHERE "prisons"."id" = 2 LIMIT 1
# => true

# With :inverse_of
criminal.prison == prison
# => true
```

Khi chúng ta gọi `criminal.prison` mà không thêm option `:inverse_of` trong cả hai quan hệ `:blongs_to` và `:has_many`, khi thực hiện phép so sánh, nó sẽ truy vấn lại vào cơ sở dữ liệu để tìm kiếm và so sánh. Với `:inverrse_of`, nếu nếu bản ghi `prison` thực sự tồn tại trong cơ sở dữ liệu, khi chúng ta gọi `criminal.prison` sẽ trỏ về cùng một `prison`


Làm rõ điều này sẽ giúp bạn tiết kiệm cơ sở dữ liệu khi truy vấn từ Criminal tới Prison (:belongs_to). 

```
prison = Prison.last
# Prison Load (0.1ms) SELECT "prisons".* FROM "prisons" ORDER BY "prisons"."id" DESC LIMIT 1
# => #<Prison id: 3, name: "Broadmoor", created_at: "2014-10-10 20:26:38", updated_at: "2014-10-10 20:26:38">

criminal = prison.criminals.first
# Criminal Load (0.3ms) SELECT "criminals".* FROM "criminals" WHERE "criminals"."prison_id" = 3 LIMIT 1
# => #<Criminal id: 3, name: "Charles Bronson", prison_id: 3, created_at: "2014-10-10 20:26:47", updated_at: "2014-10-10 20:26:47">

prison.criminals.first == criminal
# Criminal Load (0.2ms) SELECT "criminals".* FROM "criminals" WHERE "criminals"."prison_id" = 3 LIMIT 1
# => true
```

Một model associations, liên quan đến bộ nhớ, là các ràng buộc một chiều. Tùy chọn: inverse_of về cơ bản cung cấp cho chúng ta các ràng buộc bộ nhớ hai chiều khi một trong các liên kết là `:belongs_to`. Tối ưu hóa bộ nhớ không phải là điều duy nhất `:inverse_of` giúp bạn. Tiếp theo, chúng ta sẽ xem xét hai trường hợp sử dụng liên quan đến việc tạo các bản ghi liên kết.

### Tạo một đối tượng  và các đối tượng của nó thông qua `accepts_nested_attributes_for` trong quan hệ `:has_many`

Giả sử chúng ta có một form trong ứng dụng muốn người dùng có thể tạo một đối tượng `prison` và thêm một hoặc nhiều `prisons`. Quan sát model có dạng:

```
class Prison < ActiveRecord::Base
 has_many :criminals, inverse_of: :prison

 accepts_nested_attributes_for :criminals
end

class Criminal < ActiveRecord::Base
 belongs_to :prison, inverse_of: :criminals

 validates :prison, presence: true
end
```

Khi không có `:inverse_of` trên `has_many` của `:criminals`, đây là những gì sẽ xảy ra khi đẩy 1 form lên:
```
params = { name: 'Alcatraz', criminals_attributes: [{ name: 'Al Capone' }] }
# => {:name=>gt;"Alcatraz", :criminals_attributes=>[{:name=>"Al Capone"}]}
Prison.create(params)
 (0.1ms) begin transaction
 (0.1ms) rollback transaction
# => #<Prison id: nil, name: "Alcatraz", created_at: nil, updated_at: nil>
Prison.create!(params)
 (0.1ms) begin transaction
 (0.1ms) rollback transaction
ActiveRecord::RecordInvalid: Validation failed: Criminals prison can't be blank
```

Khi Rails cố gắng lưu đối tượng `criminal`, `prison` vẫn chưa được lưu vào trong database và do đó thiếu `id`. Điều này xảy ra khi `criminal` có xác thực `:prison, present: true`.

Để có thể chạy qua trường hợp này, chúng ta cần phải có `:inverse_of` được định nghĩa minh họa như dưới ví dụ, sau đó chúng ta có thể tạo các bản ghi liên quan như mong muốn.
```
params = { name: 'Alcatraz', criminals_attributes: [{ name: 'Al Capone' }] }
# => {:name=>"Alcatraz", :criminals_attributes=>[{:name=>"Al Capone"}]}
Prison.create(params)
 (0.1ms) begin transaction
 SQL (3.0ms) INSERT INTO "prisons" ("created_at", "name", "updated_at") VALUES (?, ?, ?) [["created_at", Mon, 13 Oct 2014 16:34:11 UTC +00:00], ["name", "Alcatraz"], ["updated_at", Mon, 13 Oct 2014 16:34:11 UTC +00:00]]
 SQL (0.2ms) INSERT INTO "criminals" ("created_at", "name", "prison_id", "updated_at") VALUES (?, ?, ?, ?) [["created_at", Mon, 13 Oct 2014 16:34:11 UTC +00:00], ["name", "Al Capone"], ["prison_id", 4], ["updated_at", Mon, 13 Oct 2014 16:34:11 UTC +00:00]]
 (2.3ms) commit transaction
# => #<Prison id: 4, name: "Alcatraz", created_at: "2014-10-13 16:34:11", updated_at: "2014-10-13 16:34:11">
```


### Tạo các đối tượng được liên kết thông qua `has_many :through`

Một trường hợp hay mắc phải vấn đề là khi chúng ta tạo một đối tượng đã được liên kết `has_many :thought`. Cùng theo dõi ví dụ dưới:
```
class Criminal < ActiveRecord::Base
 has_many :sentences, inverse_of: :criminal
 has_many :prisons, through: :sentences
end

class Sentence < ActiveRecord::Base
 belongs_to :criminal, inverse_of: :sentences
 belongs_to :prison, inverse_of: :sentences
end

class Prison < ActiveRecord::Base
 has_many :sentences, inverse_of: :prison
 has_many :criminals, through: :sentences
end
```
Bây giờ, `criminals` có thể được liên kết với nhiều `prisons`. Và chúng ta muốn làm một số hành động tương tự như:

```
prison = Prison.create(name: 'Alcatraz')
criminal = prison.criminals.build(name: 'Al Capone')
# then save our criminal record..
```

Khi không có `:inverse_of`. Mọi thứ sẽ xảy ra như sau:

```
criminal.save
 (0.1ms) begin transaction
 SQL (0.4ms) INSERT INTO "criminals" ("created_at", "name", "prison_id", "updated_at") VALUES (?, ?, ?, ?) [["created_at", Mon, 13 Oct 2014 12:37:51 UTC +00:00], ["name", "Al Capone"], ["prison_id", nil], ["updated_at", Mon, 13 Oct 2014 12:37:51 UTC +00:00]]
 (8.5ms) commit transaction
# => true

criminal.prisons
 Prison Load (0.2ms) SELECT "prisons".* FROM "prisons" INNER JOIN "sentences" ON "prisons"."id" = "sentences"."prison_id" WHERE "sentences"."criminal_id" = 8
# => []

criminal.sentences
 Sentence Load (0.1ms) SELECT "sentences".* FROM "sentences" WHERE "sentences"."criminal_id" = 8
# => []
```

`criminal.prisons` = [] và `criminal.sentences` = []

Nhưng khi sử dụng `:inverse_of` bên tronng `:belongs_to` tại model `Sentence` 



```
criminal.save
 (0.1ms) begin transaction
 SQL (5.9ms) INSERT INTO "criminals" ("created_at", "name", "updated_at") VALUES (?, ?, ?) [["created_at", Mon, 13 Oct 2014 12:50:17 UTC +00:00], ["name", "Al Capone"], ["updated_at", Mon, 13 Oct 2014 12:50:17 UTC +00:00]]
 SQL (0.4ms) INSERT INTO "sentences" ("created_at", "criminal_id", "duration", "prison_id", "updated_at") VALUES (?, ?, ?, ?, ?) [["created_at", Mon, 13 Oct 2014 12:50:17 UTC +00:00], ["criminal_id", 5], ["duration", nil], ["prison_id", 9], ["updated_at", Mon, 13 Oct 2014 12:50:17 UTC +00:00]]
 (8.3ms) commit transaction
# => true

criminal.prisons
 Prison Load (0.2ms) SELECT "prisons".* FROM "prisons" INNER JOIN "sentences" ON "prisons"."id" = "sentences"."prison_id" WHERE "sentences"."criminal_id" = 5
# => [#<Prison id: 9, name: "Alcatraz", created_at: "2014-10-13 12:40:55", updated_at: "2014-10-13 12:40:55">]

criminal.sentences
# => [#<Sentence id: 3, prison_id: 9, criminal_id: 5, duration: nil, created_at: "2014-10-13 12:50:17", updated_at: "2014-10-13 12:50:17">]
```

Trên đây là phần tìm hiểu và dịch của mình. Rất mong nhận được ý kiến đóng góp của mọi người tại phần comment phía dưới (bow)