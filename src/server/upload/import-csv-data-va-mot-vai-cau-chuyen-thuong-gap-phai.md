Khi tôi thực hiện import 1 file CSV vào database, thì có một vài vấn đề mà tôi đã từng gặp phải:
* Vấn đề hiệu năng khi import 
* Đánh index elasticsearch data import 
* Import dữ liệu có xử lý validation 

### Vấn đề hiệu năng khi import 
Vấn đề này đã được đề cập nhiều, khi import 1 file, nếu chỉ là một master data, có tầm chục record, thì không đáng kể, ta có thể sử dụng cách đơn giản nhất là gọi hàm save truyền thống , tuy nhiên, mới dữ liệu vài chục nghìn, trăm nghìn hay vài triệu thì đó là câu chuyện khác. 

Bạn có thể chạy lệnh import trong background job, để không ảnh hưởng đến tốc độ trải nghiệm trang web, nhưng nó vẫn sẽ ảnh hưởng đến tài nguyên hệ thống, khi mà cần quá nhiều thời gian và dữ liệu để thực hiện import. Vì vậy, có một vài phương pháp import data với dữ liệu lớn sau:

Giả sử ta có model với 
```
class Post < ActiveRecord::Migration
  def change 
      create_table :posts do |t|
      t.string :comment
      t.integer :star

      t.timestamps null: false
    end
  end
end
```
1. Sử dụng duy nhất một transactions
Đây là cách dễ nhất và cơ bản nhất để insert 1000 bản ghi dữ liệu vào model

Khi đó, ta chỉ cần chạy 
```
 1000.times {Post.create options}
```

Nhưng với cách này bạn phải gọi đến 1000 transaction. Tương ứng với việc gọi 1000 câu lệnh INSERT trong SQL
```
INSERT INTO models (...) VALUES (...);
INSERT INTO models (...) VALUES (...);
INSERT INTO models (...) VALUES (...);
INSERT INTO models (...) VALUES (...);
```
2. Bỏ qua validations trong khi insert vào SQL
Khi chạy lệnh `create` thì model sẽ thực hiện kiểm tra validation rồi mới gọi dến database để insert, khi đó, ta sẽ phải khởi tạo đối tượng, chạy valid?, vì vậy với 1000 lệnh create là sẽ phải khởi tạo 1000 object, tốn kha khá thời gian 

Vì vậy, ta có thể gọi trực tiếp đến database đổ dữ liệu vào mà không cần qua validation 
```
1000.times do |i|
  ActiveRecord::Base.connection.execute "INSERT INTO posts values (...)"
end
```

3. Chèn vào một khối
Nhiều cơ sở dữ liệu hỗ trợ chèn vào một khối dữ liệu trong lệnh INSERT 

```
sql = ["('comment 1', 1)", "('comment 2', 2)", "(...)", ].join(", ")
ActiveRecord::Base.connection.execute "INSERT INTO posts values (#{sql})"
```

Cách này có hiệu năng cao nhất, vì hầu như không phải xử lý import gì ở rails cả, chuyển trực tiếp sang cho db xử lý, ngoài ra chỉ có 1 lệnh truy vấn insert duy nhất, khi gộp tất cả values vào trong 1 truy vấn sql 

4. Sử dụng gem activerecord-import 
Gem này hỗ trợ khả năng import thông qua việc vài method import cho model 
```
columns = [:comment, :start]
values = []
TIMES = 5

TIMES.times do
    values.push ["comment", 1]
end

Post.import columns, values
```
Gem hỗ trợ validation thông qua 2 option true, false 
```
Post.import columns, values, validate: false
```
sẽ giúp tăng hiệu năng import vì bỏ qua validation dữ liệu 

Sau đây là kết quả so sánh hiệu năng import của các phương pháp trên:
```
require "ar-extensions"

CONN = ActiveRecord::Base.connection
TIMES = 10000

def do_inserts
  TIMES.times {|i| Post.create comment: "comment #{i}", start: i}
end

def raw_sql
  TIMES.times {CONN.execute "INSERT INTO `posts` (`comment`, `star`, `updated_at`) VALUES('comment', 1, '2009-01-23 20:21:13')"}
end

def mass_insert
  inserts = []
  TIMES.times do
    inserts.push "('comment', 1, '2009-01-23 20:21:13')"
  end
  sql = "INSERT INTO posts (`comment`, `star`, `updated_at`) VALUES #{inserts.join(", ")}"
  CONN.execute sql
end

def activerecord_extensions_mass_insert validate = true
  columns = [:comment, :star]
  values = []
  TIMES.times do |i|
    values.push ["comment #{i}", i]
  end

  Post.import columns, values, {validate: validate}
  
  
puts "Testing various insert methods for #{TIMES} inserts\n"
puts "ActiveRecord without transaction:"
puts base = Benchmark.measure {do_inserts}

puts "ActiveRecord with transaction:"
puts bench = Benchmark.measure {ActiveRecord::Base.transaction{ do_inserts }}
puts sprintf("%2.2fx faster than base", base.real / bench.real)

puts "Raw SQL without transaction:"
puts bench = Benchmark.measure {raw_sql}
puts sprintf("%2.2fx faster than base", base.real / bench.real)

puts "Raw SQL with transaction:"
puts bench = Benchmark.measure {ActiveRecord::Base.transaction {raw_sql }}
puts sprintf("%2.2fx faster than base", base.real / bench.real)

puts "Single mass insert:"
puts bench = Benchmark.measure {mass_insert}
puts sprintf("%2.2fx faster than base", base.real / bench.real)

puts "ActiveRecord::Extensions mass insert:"
puts bench = Benchmark.measure {activerecord_extensions_mass_insert}
puts sprintf("%2.2fx faster than base", base.real / bench.real)

puts "ActiveRecord::Extensions mass insert without validations:"
puts bench = Benchmark.measure {activerecord_extensions_mass_insert(true)}
puts sprintf("%2.2fx faster than base", base.real / bench.real)
end
```

Ta có kết quả 
```
Testing various insert methods for 10000 inserts

ActiveRecord with transaction:
  1.29x faster than base
Raw SQL without transaction:
  5.07x faster than base
Raw SQL with transaction:
  11.46x faster than base
Single mass insert:
  70.35x faster than base
ActiveRecord::Extensions mass insert:
  2.01x faster than base
ActiveRecord::Extensions mass insert without validations:
  2.00x faster than base
```
Theo kết quả này thì single mass insert có hiệu năng cao nhất là nhanh gấp 70.35 lần cách bình thường, vì vậy nếu cần tăng tốc tối đa khi import thì ta sử dụng phương pháp chèn khối dữ liệu trong 1 raw insert sql.

Tuy nhiên, không phải cứ có bao nhiêu dữ liệu cũng chèn hết vào 1 raw sql, không phải import 1 triệu row là chỉ chạy 1 query insert sql, mà ta nên chia theo từng batch , sẽ đảm bảo database không bị quá tải, do phải chạy lệnh insert quá dài.

Theo đề xuất của rails thì nên chạy batch tối đa 5000 record 1 lần.

### Đánh index elasticsearch data import 
Sẽ có trường hợp chúng ta gặp phải là cần import dữ liệu phục vụ cho quá trình search, với engine search sử dụng là elastic search, thì việc đầu tiên là ta cần phải đánh index thì mới search được.
Tức là khi import thì sau khi chuyển dữ liệu vào database, ta phải đánh index.

Ta đã config chỉ là sau khi save record, thì sẽ đánh index. Vì vậy, nếu phải import dữ liệu lớn, chả lẽ ta phải chạy từng lệnh save. Mà ở bên trên đã thống kê, với phương pháp save từng record, thì chạy chậm hơn 70,35 lần so với cách nhanh nhất là tạo 1 raw insert sql, thêm vào đó, với cách này thì mỗi lần đánh index cho 1 record thì phải gửi 1 request đánh index cho server elastic., 1 triệu record là 1 triệu request, như vậy server elastic sẽ chẳng làm được gì ngoài việc chỉ đánh index thôi.

Elastic đã cung cấp giải pháp cho vấn đề này, tương tự như import, muốn import nhanh thì ta giảm bớt tối đa số lần phải import, đánh index cũng vậy, đó là giảm bớt số lần request api elastic.
Elastic cung cấp khả năng chạy batch index. Ta chỉ việc gửi 1 batch dữ liệu đã import lên server là được.

Tuy nhiên, có một vấn đề đặt ra là sau khi import bằng các phương pháp bulk như trên, muốn biết được đã import được những record nào, thì còn phải phụ thuộc vào database ta sử dụng.

Với Postgres db, khi sử dụng `import` của gem activerecord-import, với version 0.8.0 trở lên, thì
```
result = Post.import entries
ids = result.ids
```
ids có thể được trả về, thật là may mắn. Khi đó ta chỉ cần chạy 
```
Post.where(id: ids).reindex
```

Ngoai ra , sql server có hỗ trợ trả về kết quả bulk insert bằng cách 
```
ActiveRecord::Base.connection.select_all(insert_sql)
# insert_sql là câu truy vấn bulk insert 
```
từ đó, ta có thể lấy id và thực hiện reindex elasticsearch.

Vậy với db Mysql thì sao, đây là một db tôi hay sử dụng trong các dự án thì phải làm thế nào để lấy danh sách id sau import. Rất tiếc là Mysql hiện không hỗ trợ trả ngay kết quả import nếu ta thực hiện bulk insert, vì vậy, ta chỉ có thể sử dụng thủ thuật là chạy query tìm kiếm các record đã import.

Ta có thể đặt 1 flag để đánh dấu dữ liệu vừa import, có thể là thời điểm updated_at, vì ta fix cứng thời gian updated_at trong raw query, nên mỗi khi bulk import, ta phải thêm query 
`where updated_at: updated_at` để lấy lại dữ liệu import. Có thể thêm các flag khác để đánh dấu chuẩn xác hơn.

### Import dữ liệu có xử lý validation
Với các phương pháp import csv đều có 1 kết luận, nếu muốn tăng tốc độ import, thì phải bỏ qua validation. Vậy, chả lẽ ta phải import cả data sai vào db, diều đó là không ổn , sẽ mất tính toàn vẹn dữ liệu, và về sau sẽ rất mất công cập nhật là dữ liệu cho đúng

Vì vậy, trước khi import, ta tạo 1 service kiểm tra validation cho các row, bằng cách đơn giản là gọi hàm valid? cho từng object.
Có 1 thủ thuật tôi thấy rất hay cho trường hợp kiểm tra này, đó là 

```
# thay vì viết
post1 = Post.new(comment: "comment1", star: 1)
post1.valid?
post2 = Post.new(comment: "comment2", star: 1)
post2.valid?

# thì viết 
post = Post.new
post.assign_attributes comment: "comment1", star: 1
post.valid?

post.assign_attributes comment: "comment2", star: 1
post.valid?
```
lợi ích của cách này là giảm bớt số lượng lớn object phải khởi tạo, thay vì như cách cũ là từng comment thì tạo từng đấy object, thì ta tạo 1 object duy nhất và assign_attributes ọbect theo từng row, như vậy sẽ tăng hiệu năng rất nhiều vì đã giảm bớt tài nguyên cần lưu trữ object và thời gian cho GC.

Cách này rất giống với tư tưởng của bulk import và bulk index elastic là gom tất cả vào 1 chỗ để xử lý.