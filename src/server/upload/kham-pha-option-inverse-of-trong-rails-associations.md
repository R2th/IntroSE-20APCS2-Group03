Bạn đã bao giờ nhìn thấy tùy chọn **:inverse_of** trên một liên kết và tự hỏi nó đã làm gì và tại sao nó lại ở đó?
```ruby
class Criminal < ActiveRecord::Base
 belongs_to :prison, inverse_of: :criminals
end

class Prison < ActiveRecord::Base
 has_many :criminals, inverse_of: :prison
end
```
Lần đầu tiên tôi nhìn thấy một thứ như vậy, nó có vẻ như là một tùy chọn không cần thiết. Vậy **:inverse_of** có tác dụng gì ?
# Tối ưu hóa bộ nhớ khi tìm nạp các bản ghi được liên kết
Theo mặc định, các đối tượng được liên kết không trỏ đến cùng các đối tượng trong bộ nhớ.  Ví dụ
```ruby
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
Khi chúng ta gọi **`criminal.prison`** mà không có option **:inverse_of**, nó sẽ truy xuất vào cơ sở dữ liệu. Với **:inverse_of**, nếu chúng ta đã có **prison** đó trong bộ nhớ thì **crime.prison** sẽ chỉ đến cùng một **prison**. <br>
Điều này giúp bạn tiết kiệm 1 lần tra cứu cơ sở dữ liệu khi đi từ **Criminal** đến **Prison** (từ 1 đến n trong quan hệ 1-n). Ví dụ nếu đi từ hướng khác
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
Liên kết trong model, liên quan đế bộ nhớ là các ràng buộc một chiều. **:inverse_of** về cơ bản cung cấp cho chúng ta các ràng buộc bộ nhớ hai chiều khi một trong các liên kết là **:belongs_to**. Tối ưu hóa bộ nhớ không phải là điều duy nhất mà **:inverse_of** giúp bạn.<br>Tiếp theo, chúng ta sẽ xem xét hai trường hợp sử dụng liên quan đến việc tạo các bản ghi liên quan.
# Tạo đối tượng và đối tượng con của nó thông qua accept_nested_attributes_for trong liên kết :has_many
Giả sử chúng ta có một quan hệ như hình dưới và, ta muốn tạo **Prison** và thêm nhiều **Criminal**
```ruby
class Prison < ActiveRecord::Base
 has_many :criminals, inverse_of: :prison

 accepts_nested_attributes_for :criminals
end

class Criminal < ActiveRecord::Base
 belongs_to :prison, inverse_of: :criminals

 validates :prison, presence: true
end
```
Nếu không có **:inverse_o**f, đây là những gì xảy a khi chúng ta gửi form
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

Khi Rails lưu criminal, prison chưa được tạo vào cơ sở dữ liệu và do đó thiếu id. Đó là lý do khiến `validates :prison, presence: true`
trả về fail<br>
Để điều này hoạt động, chúng ta cần có **:inverse_of** và kết quả là: 
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
# Tạo các đối tượng được liên kết has_many :through

Trường hợp bạn gặp sự cố khi bạn đang tạo một đối tượng được liên kết ở phía bên kia của **has_many :through**. Giả sử chúng ta có quan hệ n-n được khai báo như sau:
```ruby
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

Nếu chúng ta muốn làm gì  đó như: 

```
prison = Prison.create(name: 'Alcatraz')
criminal = prison.criminals.build(name: 'Al Capone')
# then save our criminal record..
```
Nếu không có inverse_of, ta nhận được:
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

**criminal**  của chúng ta sẽ không có bất kỳ **prisons** nào vì **sentence** cần thiết không được tạo tự động.<br>
Còn với inverse_of
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
Tuyệt vời, kết quả đã như chúng ta mong muốn :D

# Tin tốt

Kể từ phiên bản 4.1, Rail sẽ tự động đặt option **:inverse_of** cho chúng ta. Trong ví dụ trên của chúng ta, với **Criminal** có liên kết **:belongs_to** với **Prison**, nó sẽ cố gắng suy ra nghịch đảo từ tên class - trong trường hợp này là **:criminals** dựa trên class **Criminal**. Chắc chắn điều này sẽ sai khi tên class không trùng khớp. Ví dụ, khi chúng ta sử dụng tùy chọn **:class_name** hoặc **:foreign_key** chúng ta phải đặt **:inverse_of** một cách chính xác, vì vậy bạn vẫn nên biết cách hoạt động của **:inverse_of**.

# Tài liệu tham khảo
https://www.viget.com/articles/exploring-the-inverse-of-option-on-rails-model-associations/