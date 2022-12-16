Lúc tìm hiểu wordpress, thì wordpress cho phép bạn có thể tạo nhiều Category lồng nhau dưới dạn tree. Thế nên mình mới thắc mắc, nếu là trong Rails thì chúng ta sẽ xử lí thế nào ? Sau một hồi nghiên cứu tìm hiểu, thì mình sẽ tổng hợp những gì mình tìm hiểu được để giải quyết bài toán cấu trúc dữ liệu dạng tree trong Rails với ActiveRecord.

## Overview
Để bắt đầy thì mình sẽ bịa ra một bài toán như sau:

> Bạn đang xây dựng một trang e-commerce, và bạn có một model là Category dùng để phân biệt Product data của bạn thuộc về danh mục nào (Ví dụ như tivi thì thuộc danh mục đồ điện tử, chúch chích thì thuộc danh mục Thực phẩm chẳng hạn), giúp cho người dùng có thể dễ dàng tìm kiếm sản phẩm. Và một category sẽ có nhiều subcategory và được thể hiện bởi cùng một model. Ví dụ ở danh mục đồ điện tử, thì sẽ chia làm nhiều danh mục con như là Tivi, laptop. Trong tivi, laptop lại chia thành nhiều danh mục con khác theo thương hiệu như là LG, Samsung chẳng hạn.

Có thể nhận thấy rằng chúng ta đang xử lí một cấu trúc dữ liệu ở dạng tree. Từng bước một, mình sẽ giới thiệu 3 cách để có thể truy vấn dữ liệu với cấu trúc dữ liệu như trên và so sánh performance của chúng.
Vấn đề mà chúng ta hay gặp ở dạng cấu trúc dữ liệu này đó là làm thế nào để xây dựng một function có thể lấy về toàn bộ các dữ liệu con cháu của của một node. Trong ví dụ của mình, thì mình sẽ tìm cách để lấy ra tất cả subcategory của một category cụ thể nào đó.

Trước khi bắt đầu, chúng ta sẽ chuẩn bị project và một vài dữ liệu mẫu :D

## Chuẩn bị dữ liệu
Hãy tạo một Rails app với database là postgresql như sau:
```
rails new shop --database=postgresql
```

Configure file database.yml và chạy câu lệnh bên dưới:
```
rails db:create
```

Khởi tạo Category model bao gồm trường name và reference đến chính nó.
```
rails g model category name:string category:references
```
Sau đó tiến hành migrate database:
```
rails db:migrate
```

Việc chuẩn bị ở tầng database của chúng ta đến đây đã hoàn tất. Bây giờ chungs ta sẽ tiến hành thêm relationship vào model Category như sau:
```
class Category < ApplicationRecord
  belongs_to :parent, class_name: 'Category', optional: true, foreign_key: :category_id
  has_many :children, class_name: 'Category', dependent: :destroy
end
```
Chú ý rằng parameter **optional** cần được thêm vào. Vì từ Rails 5 trở đi, thì app sẽ raise ra lỗi nền như chúng ta truyền giá trị nil vào trong quan hệ belongs_to. Chúng ta cần setting là optional bởi vì với root category thì sẽ không tôn tại parent nào cả.
OK, bây giờ mình sẽ seed một vài dữ liệu để tets như bên dưới
```
# Root category
root = Category.create name: 'sport'

# Sport subcategories
basketball_cat = root.children.create name: 'basketball'
fitness_cat = root.children.create name: 'fitness'

# Basketball categories
basketball_cat.children.create name: 'clothing'
basketball_cat.children.create name: 'basketballs'
basketball_cat.children.create name: 'footwear'

# Fitness subcategories
fitness_cat.children.create name: 'dumbbells'
fitness_cat.children.create name: 'benches'
fitness_cat.children.create name: 'kettlebells'
```
Vậy là chúng ta đã chuẩn bị đầy đủ dữ liệu cũng như môi trường cần thiết. Tiếp theo sẽ là xây dựng function để truy vấn tất cả các subcategory của một đối tượng category nào đó.
## Vòng lặp while
Giải pháp đơn giản nhất chính là sử dụng vòng lặp while. Nó sẽ duyệt qua từ node trong tree và push các children vào một array. Function có thể xử lý như bên dưới:
```
def all_children_iteration
  childs_to_visit = children.to_a
  childs_to_return = []
  while childs_to_visit.present?
    current_node = childs_to_visit.shift
    childs_to_return << current_node
    childs_to_visit.concat(current_node.children)
  end
  childs_to_return
end
```
## Đệ quy
Một cách thứ hai khá giống với vòng lặp while đó chính là sử dụng đệ quy.
```
def all_children_recursion
  children.flat_map do |child_cat|
    child_cat.all_children_recursion << child_cat
  end
end
```

Tuy nhiên với cách này cần chú ý rằng khi sử dụng đệ quy thì sẽ tiêu tốn nhiều bộ nhớ hơn. Cho nên trong trường hợp tập dữ liệu lớn sẽ dẫn đến lỗi stack overflow.
## PostgreSQL solution
Bây giờ sẽ đến phần khá là thú vị. Từ phiên bản 8.4 trở đi, thì PostgreSQL đã giới thiệu query "WITH RECURSIVE tree" ([reference](https://wiki.postgresql.org/wiki/Getting_list_of_all_children_from_adjacency_tree)), cho phép chúng ta có thể lấy ra những children từ một adjacency tree. Chúng ta có thể tận dụng đều đó để giải quyết bài toán của chúng ta. Ở file model Category, mình sẽ define một method như sau:
```
def all_children_sql
  Category.find_by_sql(recursive_tree_children_sql)
end
```
Câu lệnh SQL dùng để query sẽ khá là dài, cho nên mình sẽ tách nó vào một hàm như sau:
```
def recursive_tree_children_sql
  columns = self.class.column_names
  columns_joined = columns.join(',')
  sql =
    <<-SQL
      WITH RECURSIVE category_tree (#{columns_joined}, level)
      AS (
        SELECT
          #{columns_joined},
          0
        FROM categories
        WHERE id = #{id}

        UNION ALL
        SELECT
          #{columns.map { |col| 'cat.' + col }.join(',')},
          ct.level + 1
        FROM categories cat, category_tree ct
        WHERE cat.category_id = ct.id
      )
      SELECT * FROM category_tree
      WHERE level > 0
      ORDER BY level, category_id, name;
    SQL
  sql.chomp
end
```

Cuối cùng, khi thực thi đoạn query trên, thì kết quả trả về sẽ giống với việc sử dụng while hoặc là đệ quy như bên trên.
Ưu điểm lớn nhất của giải pháp này chính là việc sử dụng SQL sẽ khiến cho kết quả trả về nhanh hơn. Để chứng minh cho việc này thì chúng ta cùng so sánh performance của các phương pháp.
## So sánh performance
Chúng ta sẽ sử dụng thư viện **Benchmark** để đo lương performance của từng giải pháp.
Kịch bản của mình sẽ là tạo ra 10000 categories và sẽ được random assign cho một parents nào đó. Đoạn code mình sử dụng sẽ như sau:
```
[].tap do |categories|
  10_000.times do |i|
    categories << Category.create!(name: "Cat #{i}", parent: categories.sample)
  end
end
```
Vì mình chỉ quan tâm đến kết quả performance nên mình sẽ disable SQL logging.
```
ActiveRecord::Base.logger = nil
```
Đoạn code dùng để test performance:
```
root = Category.first

iterative_diff = Benchmark.realtime do
  root.all_children_iteration
end

# Reloading prevents SQL caching
root.reload

recursion_diff = Benchmark.realtime do
  root.all_children_recursion
end

root.reload

sql_diff = Benchmark.realtime do
  root.all_children_sql
end

puts "Iterative performance: #{iterative_diff}"
puts "Recursive performance: #{recursion_diff}"
puts "SQL performance: #{sql_diff}"
```

Kết quả:
```
Iterative performance: 11.911259000000427
Recursive performance: 11.971864999999525
SQL performance: 0.31752699999924516
```

Kết quả rất là rõ ràng. Việc sử dụng SQL rõ ràng là có performance tốt hơn nhiều lần so với việc dùng vòng lặp hay là đệ quy. Vậy có cách nào để có thể nâng cấp cho 2 phương pháp sử dụng vòng lặp hay đệ quy hay không ? Chúng ta cùng tham khảo phần tiếp theo.

## Cải tiến với preloading
Trước khi bắt đầu vòng lặp với các node con, chúng ta có thể sử dụng phương thức **includes** để có thể preload trước. Tuy nhiên cách tiếp cận này đòi hỏi chúng ta phải biết trước độ sâu của tree. Để làm điều đó, chúng ta có thể thêm vào một attribute để lưu lại độ sâu của tree. Nó sẽ lưu trữ độ sâu của mỗi node
```
rails g migration add_depth_to_categories depth:integer
```

Chúng ta cần tính độ sâu của 1 node trước khi insert nó vào database
```
before_create :assign_depth

def assign_depth
  self.depth = (parent.present? ? parent.depth + 1 : 0)
end
```

Sau đó chúng ta tiến hành tạo một method trả về hash sẽ includes lúc query Model
```
def includes_hash
  tree_depth = Category.order(depth: :desc).first.depth || 0
  tree_depth.times.inject(:children) { |h| { children: h } }
end
```

Cuối cùng chúng ta có thể test lại performance sau khi cải tiến như sau:

```
root = Category.first

iterative_diff = Benchmark.realtime do
  root = Category.includes(Category.first.includes_hash).first
  root.all_children_iteration
end

root.reload

recursion_diff = Benchmark.realtime do
  root = Category.includes(Category.first.includes_hash).first
  root.all_children_recursion
end

puts "Iterative performance: #{iterative_diff}"
puts "Recursive performance: #{recursion_diff}"
```

Kết quả:
```
Iterative performance: 0.777115999999296
Recursive performance: 0.7672039999997651
```

Các bạn có thể thấy là performance sau khi improve đã tăng lên rất nhiều lần. Tuy nhiên có thể thấy nó vẫn thấp hơn việc sử dụng 'SQL'.  Và cần lưu ý rằng mọi trường hợp xóa node có thể thay đổi toàn bộ cấu trúc cây. Trong trường hợp này, chúng ta cần xử lý cập nhật độ sâu của từng node bị ảnh hưởng.

Tuy nhiên, 3 cách trên vẫn chưa phải là các cách giải quyết duy nhất của bài toán dữ liệu dạng tree như thế này. Trong bài tiếp theo, mình sẽ giới thiệu đến các bạn 2 phương pháp khác để giải quyết bài toán dữ liệu phân cấp như thế này, đó là: materialised path và nested set.