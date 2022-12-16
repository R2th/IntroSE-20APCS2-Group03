Có nhiều lúc bạn phải import 1 lượng lớn dữ liệu. Nó có thể được lấy từ Json, CSV hoặc nhiều loại tệp khác nhau. Ở bài viết này mình xin viết về import bằng file CSV.

# Tạo mới
### Cách 1
Chúng ta có 1 file csv là `file.csv` và cần phải tạo các bản ghi tương ứng với dữ liệu trong file csv. Cùng nhìn vào ví dụ, giả sử file CSV có hàng chục (hàng trăm) nghìn hàng:
```
require 'csv'

csv = File.read('link/to/file.csv')
CSV.parse(csv, headers: true).each do |row|
  Item.create(row.to_h)
end

```
Nó sẽ bị đóng băng do
* Tải toàn bộ CSV vào bộ nhớ
* Tạo hàng trăm hàng nghìn bản ghi
### Cách 2
```
CSV.foreach('link/to/file.csv', headers: true) do |row|
  Item.create(row.to_h)
end
```
Cách 2 tốt hơn cách 1 do vòng lặp lặp lại trên mỗi hàng của CSV thay vì tải toàn bộ tệp vào bộ nhớ. Tuy nhiên vẫn có nhược điểm là mất nhiều thời gian tạo do phải foreach nhiều lần.
### Cách 3
Đây là cách tối ưu nhất. Ta sẽ sử dụng gem [ActiveRecord import](https://github.com/zdennis/activerecord-import) . Thay vì phải foreach và insert nhiều lần vào database thì ta chỉ insert 1 lần
```
items = []
CSV.foreach('link/to/file.csv', headers: true) do |row|
  items << Item.new(row.to_h)
end
Item.import(items)
```

Gem cung cấp method `import` rất tiện dụng giúp chúng ta có thể insert 1 lần vào database nhiều bản ghi cùng 1 lúc. 
# Tạo mới dựa trên cái có sẵn
Giả sử chung ta có nhiều bản ghi mới cần import, nhưng chúng cần được liên kết với 1 bản ghi hiện có. chúng ta có 2 model: `List` và `Item`. quan hệ: `List` có nhiều `items`. Mỗi `item` thuộc về một `list`
### Cách 1
```
items = []
CSV.foreach('link/to/file.csv', headers: true) do |row|
  list = List.find_by(name: row[:name])
  items << Item.new(list: list, title: row[:title])
end
Item.import(items)
```
Ở đây ta có sử dụng method `import`, nhưng hiện tại ta phải chạy `find_by` ở mỗi vòng lặp
### Cách 2
```
lists_hash = List.pluck(:name, :id).to_h
# => {'todo list' => 213, 'another list' => 319}

items = []
CSV.foreach('link/to/file.csv', headers: true) do |row|
  list_id = lists_hash[row[:name]]
  items << Item.new(list_id: list_id, title: row[:title])
end
Item.import(items)
```
`List.pluck` sẽ chạy 1 query duy nhất lấy `name` và `id`. Query này chạy k tốn thời gian kể cả với lượng dữ liệu lớn. Sau đó thay vì ta tìm `id` qua truy vấn database thì ta sẽ thực hiện trên mảng. Vậy tất cả chỉ tốn 2 query. Cách 2 tối ưu hơn cách 1 rất nhiều phải không?
Nếu bạn có 1 file CSV, json lớn có thể đến hàng trăm, hàng triệu bản ghi thì chúng ta phải chia nhỏ chúng trước khi import. Khi đó có thể `ActiveRecord.import` sẽ fail. Nhưng có thể dễ dàng sử dụng `import` bằng cách sử dụng `array.each_slice` chia nhỏ chúng ra sau đó import. 
# Một vài cách import khác
Đôi khi chúng ta đã có dữ liệu được build trong 1 array và tất cả những gì chúng ta cần làm là import sao cho khớp với dữ liệu trong đó. Nếu bạn muốn dừng việc build đối tượng trong bộ nhớ, ta có thể import trực tiếp bằng array mà k phải là list các object:
```
columns = [:email, :address]

# E.g. [ ['email 1', 'ha noi'], ['email 2', 'ho chi minh'], ...]
array_of_user_attrs = convert_csv_to_user_attributes

Book.import columns, array_of_user_attrs, validate: true
```

`validate: true` nó sẽ import đồng thời validate dữ liệu.
Nếu muốn nhanh hơn nữa ta có thể dừng validate bằng cách `validate: false`.

Ngoài ra bạn có thể tìm hiểu thêm các options khác mà gem `activerecord-import` cung cấp như
- validate: true hoặc false, quá trình import sẽ chạy validate hay không, mặc định là có
- on_duplicate_key_ignore: true hoặc false, quá trình import sẽ bỏ qua các bản ghi trùng lặp (duplicate các primary key) và tiếp tục import hay không? Trong Postgress nó tương đương với: ON CONFLICT DO NOTHING hay trong Mysql là INSERT IGNORE
- ignore: là một alias của on_duplicate_key_ignore
- on_duplicate_key_update: một mảng hoặc một hash, nó tương tự như option ON DUPLICATE KEY UPDATE khi insert trong mysql, hay ON CONFLICT DO UPDATE trong Postgress.
- synchronize: đồng bộ các bản ghi được chỉ định khi nó đc đang được import
- batch_size: chỉ định số lượng tối đa các bản ghi mỗi lần insert. Mặc định là all

Bạn có thể xem thêm tại:
https://www.rubydoc.info/gems/activerecord-import/ActiveRecord/Base#bulk_import-class_method

Ví dụ: 
```
class BlogPost < ActiveRecord::Base ; end

# Sử dụng array các object
posts = [ BlogPost.new author_name: 'Zach Dennis', title: 'AREXT',
          BlogPost.new author_name: 'Zach Dennis', title: 'AREXT2',
          BlogPost.new author_name: 'Zach Dennis', title: 'AREXT3' ]
BlogPost.import posts

# Sử dụng array các hash
# NOTE: column_names will be determined by using the keys of the first hash in the array. If later hashes in the
# array have different keys an exception will be raised. If you have hashes to import with different sets of keys
# we recommend grouping these into batches before importing.
values = [ {author_name: 'zdennis', title: 'test post'} ], [ {author_name: 'jdoe', title: 'another test post'} ] ]
BlogPost.import values

# Sử dụng array column name và các hash giá trị
columns = [ :author_name, :title ]
values = [ {author_name: 'zdennis', title: 'test post'} ], [ {author_name: 'jdoe', title: 'another test post'} ] ]
BlogPost.import columns, values

# Sử dụng array column name và array giá trị
columns = [ :author_name, :title ]
values = [ [ 'zdennis', 'test post' ], [ 'jdoe', 'another test post' ] ]
BlogPost.import columns, values

# Sử dụng kết hợp với option
columns = [ :author_name, :title ]
values = [ [ 'zdennis', 'test post' ], [ 'jdoe', 'another test post' ] ]
BlogPost.import( columns, values, validate: false  )

# Example synchronizing existing instances in memory
post = BlogPost.where(author_name: 'zdennis').first
puts post.author_name # => 'zdennis'
columns = [ :author_name, :title ]
values = [ [ 'yoda', 'test post' ] ]
BlogPost.import posts, synchronize: [ post ]
puts post.author_name # => 'yoda'

# Example synchronizing unsaved/new instances in memory by using a uniqued imported field
posts = [BlogPost.new(title: "Foo"), BlogPost.new(title: "Bar")]
BlogPost.import posts, synchronize: posts, synchronize_keys: [:title]
puts posts.first.persisted? # => true
```

Hi vọng bài viết giúp ích cho bạn :D 


**Nguồn tham khảo**

https://mattboldt.com/importing-massive-data-into-rails/
https://www.rubydoc.info/gems/activerecord-import/ActiveRecord