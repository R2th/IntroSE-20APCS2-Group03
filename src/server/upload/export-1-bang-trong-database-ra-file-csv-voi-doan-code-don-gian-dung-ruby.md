![](https://images.viblo.asia/7b1b3ea1-3e69-4ac8-995c-328a9c67a31f.jpg)
Nếu bạn có một dự án Rails và muốn export một bảng dưới dạng CSV. Chắc hẳn có nhiều cách để làm việc này. Ở đây, có một cách dễ dàng và nhanh chóng để export một bảng cụ thể từ database của bạn ra file CSV.

Dưới đây là đoạn code bạn cần chạy. Bạn có thể viết nó như một rake task và chạy nó:

```
require "csv"
 
file = "#{Rails.root}/public/data.csv"
 
table = User.all
 
CSV.open( file, "w" ) do |writer|
  writer << User.column_names
  table.each do |r|
    writer << r.attributes.values
  end
end
```

Như vậy các thuộc tính bảng cũng như dữ liệu của bảng User sẽ được lưu vào file data.csv

Hi vọng bài viết này có thể có ích với bạn trong một vài trường hợp naò đó :))