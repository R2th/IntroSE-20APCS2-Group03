<p><h6> Chúng ta tiếp tục tìm hiểu về những thay đổi có được ở trong phiên bản Rail 6 này.</h6></p>


**1.** **Hỗ trợ chèn số lượng lớn các bản ghi trong Rails 6**
- Rails 6 đã thêm hỗ trợ cho việc insert nhiều bản ghi cùng lúc tương tự như việc update nhiều bản ghi cùng lúc( sử dụng `update_all`)  hay xóa cùng lúc nhiều bản ghi được hỗ trợ bằng method `delete_all` .
- Có thể thực hiện insert hàng loạt các bản ghi bằng các method mới được thêm vào đó là: `insert_all`, `insert_all! ` và `upsert_all`.
- Tất cả các phương thức mới này cho phép chèn nhiều bản ghi của model vào cơ sở dữ liệu. Sử dụng một câu lệnh truy vấn SQL INSERT duy nhất và được gửi đến cơ sở dữ liệu mà không khởi tạo Model hay chạy qua các callback hoặc validations (các bạn có thể tìm hiểu chi tiết hơn về luồng hoạt động của nó tại đây: [Flow Insert_all](https://github.com/rails/rails/blob/16dae7684edc480ee3fe65dfff8e19989402c987/activerecord/lib/active_record/insert_all.rb#L141))
- Trong quá trìnhinsert số lượng lớn các bản ghi, có thể  phát sinh nhiều vấn đề như vi phạm primary key, vi phạm các unique index,...
Vì thế, Rails đã tận dụng các tính năng dành riêng cho CSDL để bỏ qua hoặc upsert các bản ghi duplicate, tùy theo trường hợp.
- Bây giờ, ta hãy tìm hiểu chi tiết hơn về các phương thức `insert_all`, `insert_all!` và `upsert_all`(tất cả đều được sử dụng để thực hiện insert số lượng lớn các bản ghi):
- Ví dụ: Ta sẽ tạo một bảng Post với 2 unique index.
```ruby
create_table :posts do |t|
  t.string :title, null: false
  t.string :author, null: false,
  t.string :category, null: false
  t.text :description

  t.index :category, unique: true
  t.index [:title, :author], unique: true
end
```
(chúng ta sẽ ngăn các bản ghi có các tiêu đề và cột tác giả trùng lặp với nhau.)
<hr>

**Thực hiện chèn số lượng lớn bằng cách bỏ qua các bản sao**
- Giả sử chúng ta muốn chèn nhiều bài viết cùng một lúc vào CSDL. Có thể sẽ xuất hiện các bản ghi vi phạm các ràng buộc duy nhất của bảng, các bản ghi đó được coi là trùng lặp. Nói cách khác, các row hoặc bản ghi được xác định là duy nhất bởi mỗi unique index trên bảng.
- Để bỏ qua các row hoặc bản ghi trùng lặp và chèn phần còn lại vào các bản ghi cùng một lúc, chúng ta có thể sử dụng phương thức `ActiveRecord :: Persistence # insert_all.`
<hr>

-  **Đối với PostgreSQL**
```ruby
result = Post.insert_all(
  [
    { id: 1,
      title: 'Lost stars',
      author: 'Adam Levine',
      category: 'Ballad' },

    { id: 1, # duplicate 'id' here
      title: 'Litte Flower',
      author: 'Jonny',
      category: 'R&B' },

    { id: 2,
      title: 'Hello world',
      author: 'Smith',
      category: 'rails' },

    { id: 3,
      title: 'Hello world',
      author: 'Smith', # duplicate 'title' & 'author' here
      category: 'ruby' },

    { id: 4,
      title: 'Docter Strand',
      author: 'Paul',
      category: 'marvel' },

    { id: 5,
      title: 'Fly high',
      author: 'Amanda',
      category: 'Ballad' }, # duplicate 'category' here

    { id: 6,
      title: 'Freedome',
      author: 'Lodder',
      category: 'sky' }
  ]
)
# Bulk Insert (2.3ms)  INSERT INTO "posts"("id","title","author","category") VALUES (1, 'Lost stars  [...still...] 'sky') ON CONFLICT  DO NOTHING RETURNING "id"

puts result.inspect
#<ActiveRecord::Result:0x00007fb6612a1ad8 @columns=["id"], @rows=[[1], [2], [4], [6]], @hash_rows=nil, @column_types={"id"=>#<ActiveModel::Type::Integer:0x00007fb65f420078 @precision=nil, @scale=nil, @limit=8, @range=-9223372036854775808...9223372036854775808>}>

puts Post.count
# 4
```
- Phương thức insert_all chấp nhận một đối số bắt buộc phải là một mảng chứa các hash với các thuộc tính của cùng một model.
- Lưu ý mệnh đề `ON CONFLICT DOHING` trong truy vấn INSERT(được hỗ trợ cho CDSL PostgreSQL và SQLite). Nó sẽ báo cho CSDL biết rằng khi nào xảy ra xung đột hoặc vi phạm ràng buộc khóa duy nhất trong việc chèn số lượng lớn các bản ghi, để nó có thể bỏ qua bản ghi xung đột và tiến hành chèn bản ghi tiếp theo.
<ul>
   <li>
      <p>Trong ví dụ trên, ta có 3 bản ghi vi phạm các ràng buộc duy nhất khác nhau được xác định trên bảng Post.</p>
      <ul>
         <li>
            <p>Một trong các bản ghi được chèn có thuộc tính <code>id: 1</code> bị trùng lặp vì vi phạm ràng buộc khóa chính duy nhất</p>
         </li>
          <li>
            <p>Một bản ghi khác có tiêu đề trùng lặp: <code>title: 'Hello world', author: 'Smith'</code>, nó vi phạm unique index được xác định trên các column title và author.</p>
         </li>
          <li>
              <p>Và một bản ghi có category trùng lặp: <code>category: 'Ballad'</code> vi phạm unique index được xác định trên colum category.</p>
         </li>
      </ul>
   </li>
</ul>

- Tất cả các bản ghi này vi phạm bất kỳ ràng buộc hoặc unique index nào đều bị bỏ qua và không được chèn vào cơ sở dữ liệu.
- Nếu thành công, `ActiveRecord::Persistence#insert_all` sẽ trả về một instance của `ActiveRecord::Result`. Nội dung của kết quả khác nhau trên mỗi CSDL. Trong trường hợp CSDL PostgreSQL, kết quả này chứa thông tin về các bản ghi được chèn thành công như tên cột được chọn, giá trị của các cột,...
- Đối với PostgreSQL, theo mặc định, phương thức `insert_all` sẽ nối thêm mệnh đề `RETURNING "id"` vào truy vấn SQL trong đó id là khóa chính. Mệnh đề này yêu cầu CSDL trả về `id` của mọi bản ghi được chèn thành công. Bằng cách inspect kết quả, đặc biệt là các thuộc tính `@columns=["id"], @rows=[[1], [2], [4], [6]]`, chúng ta có thể thấy rằng các bản ghi có id thuộc tính có giá trị `1, 2, 4 và 6 `đã được chèn thành công.
- **Vậy nếu chúng ta muốn xem nhiều thuộc tính hơn và không chỉ thuộc tính id của các bản ghi được chèn thành công trong kết quả thì sẽ làm thế nào?**
- Chúng ta sẽ sử dụng tùy chọn `returning option`, nó chấp nhận một mảng các tên thuộc tính
```ruby
result = Post.insert_all(
  [
    { id: 1,
      title: 'Lost stars',
      author: 'Adam Levine',
      category: 'Ballad' },
    #...still...
  ],
  returning: %w[ id title ] #option
)
# Bulk Insert (2.3ms)  INSERT INTO "posts"("id","title","author","category") VALUES (1, 'Lost stars  [...still...] 'sky') ON CONFLICT  DO NOTHING RETURNING "id","title"

puts result.inspect
#<ActiveRecord::Result:0x00007f902a1196f0 @columns=["id", "title"], @rows=[[1, "Lost stars"], [2, "Hello world"], [4, "Docter Strand"], [6, "Freedome"]], @hash_rows=nil, @column_types={"id"=>#<ActiveModel::Type::Integer:0x00007f90290ca8d0 @precision=nil, @scale=nil, @limit=8, @range=-9223372036854775808...9223372036854775808>, "title"=>#<ActiveModel::Type::String:0x00007f9029978298 @precision=nil, @scale=nil, @limit=nil>}>

puts result.pluck("id", "title").inspect
#[[1, "Lost stars"], [2, "Hello world"], [4, "Docter Strand"], [6, "Freedome"]]
```
- Lưu ý cách truy vấn INSERT nối thêm mệnh đề `RETURNING "id","title"`  và kết quả bây giờ sẽ chứa các thuộc tính id và title của các bản ghi được chèn thành công.
<hr>

-  **Đối với SQLite**
- Tương tự như PostgreSQL, các bản ghi vi phạm được bỏ qua trong việc chèn hàng loạt được thực hiện bằng `insert_all`.
- Ví dụ:
```ruby
result = Post.insert_all(
  [
     { id: 1,
      title: 'Lost stars',
      author: 'Adam Levine',
      category: 'Ballad' },

    { id: 1, # duplicate 'id' here
      title: 'Litte Flower',
      author: 'Jonny',
      category: 'R&B' },
    #..still..
  ]
)
# Bulk Insert (1.6ms)  INSERT INTO "posts"("id","title","author","category") VALUES (1, 'Lost stars  [...still...] 'sky') ON CONFLICT  DO NOTHING

puts result.inspect
#<ActiveRecord::Result:0x00007fa9df448ff0 @columns=[], @rows=[], @hash_rows=nil, @column_types={}>

puts Post.pluck(:id, :title)
#[[1, "Lost stars"], [2, "Hello world"], [4, "Docter Strand"], [6, "Freedome"]]

puts Post.count
# 4
```
- Lưu ý rằng vì SQLite không hỗ trợ mệnh đề `RETURING`, nên nó không được thêm vào truy vấn SQL. Do đó, `ActiveRecord::Result` trả về không chứa thêm được bất kỳ thông tin nào.
```ruby
Post.insert_all(
  [
    { id: 1,
      title: 'Lost stars',
      author: 'Adam Levine',
      category: 'Ballad' },
    #...still...
  ],
  returning: %w[ id title ]
)
# ActiveRecord::ConnectionAdapters::SQLite3Adapter does not support :returning (ArgumentError)
```
<hr>

- **Đối với MySQL**
- Các bản ghi vi phạm khóa chính, ràng buộc khóa duy nhất hoặc unique index được bỏ qua trong quá trình thao tác chèn hàng loạt được thực hiện bằng cách sử dụng `insert_all` trên CSDL MySQL.
```ruby
result = Post.insert_all(
  [
    { id: 1,
      title: 'Lost stars',
      author: 'Adam Levine',
      category: 'Ballad' },

    { id: 1, # duplicate 'id' here
      title: 'Litte Flower',
      author: 'Jonny',
      category: 'R&B' },
    #..still..
  ]
)
# Bulk Insert (20.3ms)  INSERT INTO `posts`(`id`,`title`,`author`,`category`) VALUES (1, 'Lost stars  [...still...] 'sky') ON DUPLICATE KEY UPDATE `id`=`id`

puts result.inspect
#<ActiveRecord::Result:0x000055d6cfea7580 @columns=[], @rows=[], @hash_rows=nil, @column_types={}>

puts Post.pluck(:id, :title)
#[[1, "Lost stars"], [2, "Hello world"], [4, "Docter Strand"], [6, "Freedome"]]

puts Post.count
# 4
```
- Ở đây, mệnh đề `ON DUPLICATE KEY UPDATE 'id'='id'` trong truy vấn INSERT về cơ bản thực hiện tương tự như mệnh đề `ON CONFLICT DO NOTHING` được hỗ trợ bởi PostgreSQL và SQLite.
- Tương tự như SQLite, MySQL không hỗ trợ mệnh đề `RETURING`, nên nó không được đưa vào truy vấn SQL và do đó, kết quả không có chứa thêm bất kỳ thông tin nào.
<hr>

**2. Thực hiện chèn hàng loạt bằng cách bỏ qua các bản sao trên một ràng buộc duy nhất được chỉ định nhưng sẽ raise exception nếu các bản ghi vi phạm các ràng buộc duy nhất khác**
- Trong trường hợp đầu tiên, chúng ta đã skip các bản ghi vi phạm bất kỳ ràng buộc duy nhất nào. Trong một số trường hợp, chúng ta có thể muốn bỏ qua các bản sao gây ra chỉ bởi một unique index cụ thể nhưng sẽ hủy bỏ transaction nếu các bản ghi khác vi phạm bất kỳ ràng buộc duy nhất nào khác.
- Tùy chọn `unique_by option` của phương thức `insert_all` cho phép xác định một ràng buộc duy nhất như vậy.
<hr>

- **Đối với PostgreSQL and SQLite**
- Hãy cùng xét một ví dụ skip các bản ghi trùng lặp chỉ vi phạm chỉ mục duy nhất được chỉ định `:index_posts_on_title_and_master` bằng tùy chọn `unique_by`. Các bản ghi trùng lặp không vi phạm `index_posts_on_title_and_master` index không được bỏ qua, và do đó sẽ raise lỗi.
```ruby
-> PostgreSQL

result = Post.insert_all(
  [
    { .... },
    { .... }, # duplicate 'id' here
    { .... },
    { .... }, # duplicate 'title' and 'author' here
    { .... },
    { .... }, # duplicate 'category' here
    { .... }
  ],
  unique_by: :index_posts_on_title_and_author
)
# PG::UniqueViolation: ERROR:  duplicate key value violates unique constraint "posts_pkey" (ActiveRecord::RecordNotUnique)
# DETAIL:  Key (id)=(1) already exists.

-> SQLite
# SQLite3::ConstraintException: UNIQUE constraint failed: articles.id (ActiveRecord::RecordNotUnique)
```
- Trong trường hợp này, chúng ta gặp lỗi `ActiveRecord::RecordNotUnique` do vi phạm ràng buộc khóa chính trên cột id. Nó đã không bỏ qua bản ghi thứ hai trong ví dụ ở trên đã vi phạm unique index trên id khóa chính vì tùy chọn `unique_by` được chỉ định với một unique index khác. Khi xảy ra ngoại lệ, không có bản ghi nào tồn tại trong CSDL vì `insert_all` chỉ thực hiện một truy vấn SQL duy nhất.
- Tùy chọn `unique_by` có thể được xác định bởi các cột hoặc tên unique index.
```ruby
unique_by: :index_posts_on_title_and_author
# tương tự
unique_by: %i[ title author ]

# Vì thế,
unique_by: :category
# tương tự
unique_by: %i[ :category ]
# và nó cũng giống
unique_by: :index_posts_on_category
```
- Bây giờ, ta sẽ xóa (sửa) bản ghi có khóa chính trùng lặp và rồi chạy lại ví dụ trên.
```ruby
-> PostgreSQL

result = Post.insert_all(
  [
    { .... },
    { .... },
    { .... },
    { .... }, # duplicate 'title' and 'author' here
    { .... },
    { .... }, # duplicate 'category' here
    { .... }
  ],
  unique_by: :index_posts_on_title_and_author
)
# PG::UniqueViolation: ERROR:  duplicate key value violates unique constraint "index_posts_on_slug" (ActiveRecord::RecordNotUnique)
# DETAIL:  Key (category)=(Ballad) already exists.

-> SQLite
# SQLite3::ConstraintException: UNIQUE constraint failed: articles.slug (ActiveRecord::RecordNotUnique)
```
- Lỗi `ActiveRecord::RecordNotUnique` trong ví dụ trên cho biết ràng buộc duy nhất index_posts_on_category bị vi phạm. Bây giờ chúng tôi sẽ xóa (sửa) bản ghi có cùng category.
```ruby
result = Post.insert_all(
  [
    { .... },
    { .... },
    { .... },
    { .... }, # duplicate 'title' and 'author' here
    { .... },
    { .... },
    { .... }
  ],
  unique_by: :index_posts_on_title_and_author
)
# Bulk Insert (2.5ms)  INSERT INTO "posts"("id","title","author","category") VALUES (1, 'Lost stars  [...still...] 'sky') ON CONFLICT ("title","author") DO NOTHING RETURNING "id"

puts result.inspect
#<ActiveRecord::Result:0x00007fada2069828 @columns=["id"], @rows=[[1], [7], [2], [4], [5], [6]], @hash_rows=nil, @column_types={"id"=>#<ActiveModel::Type::Integer:0x00007fad9fdb9df0 @precision=nil, @scale=nil, @limit=8, @range=-9223372036854775808...9223372036854775808>}>
```
- Ở đây, bản ghi thứ tư đã bị bỏ qua vì bản ghi đó vi phạm unique index: `index_posts_on_title_and_author` được chỉ định bởi tùy chọn `unique_by`.
- Tương tự, chúng ta có thể chỉ định một unique index khác bằng cách sử dụng tùy chọn `unique_by`. Ví dụ: nếu chúng ta chỉ định
`unique_by: :category` option, sau đó các bản ghi chứa các cột category trùng lặp sẽ bị bỏ qua nhưng sẽ raise exception `ActiveRecord::RecordNotUnique` nếu bất kỳ bản ghi nào vi phạm các ràng buộc duy nhất khác.
<hr>

- **Đối với MySQL**
- Tùy chọn `unique_by` không được hỗ trợ khi CSDL là MySQL.
<hr>

**3.Raise exception nếu bất kỳ bản ghi nào khi insert vào trong DB vi phạm bất kỳ ràng buộc duy nhất nào**
- Phương thức `insert_all!` không bao giờ bỏ qua bản ghi trùng lặp. Nếu một bản ghi vi phạm bất kỳ ràng buộc duy nhất nào, thì insert_all! Phương thức sẽ đơn giản đưa ra lỗi `ActiveRecord::RecordNotUnique.`
- Khi cơ sở dữ liệu là PostgreSQL,` insert_all!` method có thể chấp nhận tùy chọn `returning option`, mà chúng ta đã nói tới ở phần trên.
- Tùy chọn `unique_by` không được hỗ trợ bởi phương thức `insert_all!`
<hr>


**4. Thực hiện upserts số lượng lớn**
- Trong các phần 1, 2 và 3 ở trên, chúng ta đã đề cập đến việc bỏ qua các bản sao hoặc đưa ra ngoại lệ nếu gặp phải một bản sao trong khi chèn hàng loạt. Đôi khi, chúng ta muốn cập nhật bản ghi hiện có khi xảy ra sự trùng lặp nếu không thì chèn bản ghi mới. Thao tác này được gọi là upsert vì nó sẽ cập nhật bản ghi hoặc nếu không có bản ghi để cập nhật, thì nó sẽ insert.
- **upsert_all trong MySQL**
```ruby
result = Post.upsert_all(
  [
   { id: 1, title: 'Lost stars', author: 'Adam Levine', category: 'Ballad' },
    { id: 1, .... }, # duplicate 'id' here
    { id: 2, .... },
    { id: 3, .... }, # duplicate 'title' and 'author' here
    { id: 4, .... },
    { id: 5, .... }, # duplicate 'category' here
    { id: 6, .... }
  ]
)
# Bulk Insert (26.3ms)  INSERT INTO `posts`(`id`,`title`,`author`,`category`) VALUES (1, 'Lost stars  [...still...] 'sky') ON DUPLICATE KEY UPDATE `title`=VALUES(`title`),`author`=VALUES(`author`),`category`=VALUES(`category`)

puts result.inspect
#<ActiveRecord::Result:0x000055a43c1fae10 @columns=[], @rows=[], @hash_rows=nil, @column_types={}>

puts Post.count
# 5

puts Post.all
#<ActiveRecord::Relation [#<Article id: 1, title: "Litte Flower", category: "R&B", author: "Jonny", description: nil>, #<Article id: 2, title: "Hello world", category: "rails", author: "Smith", description: nil>, #<Article id: 4, title: "Docter Strand", category: "marvel", author: "Paul", description: nil>, #<Article id: 5, title: "Fly high", category: "Fly high", author: "Amanda", description: nil>, #<Article id: 6, title: "Freedome", category: "sky", author: "Lodder", description: nil>]>
```
**- Trong ví dụ bên trên:**
- Hàng thứ hai trong mảng đầu vào có thuộc tính `id: 1 `thay thế hàng đầu tiên(cũng có thuộc tính `id: 1` trùng lặp).
- Hàng thứ tư có` id: 3` thay thế các thuộc tính của hàng thứ ba vì cả hai đều có các thuộc tính title và `author` của Post.
- Các hàng còn lại không trùng lặp và đã được chèn mà không có bất kỳ vấn đề nào xảy ra.
- Lưu ý rằng các tùy chọn `return` và `unique_by` không được hỗ trợ trong phương thức upsert_all khi cơ sở dữ liệu là MySQL.
<hr>


- **upsert_all trong SQLite**
```ruby
result = Post.upsert_all(
  [
    { id: 1, title: 'Lost stars', author: 'Adam Levine', category: 'Ballad' },
    { id: 1, title: 'Litte Flower', author: 'Jonny', category: 'R&B' }, # duplicate 'id' here
    { id: 2, title: 'Hello world', author: 'Smith', category: 'rails' },
    { id: 3, title: 'Hello world', author: 'Smith', category: 'ruby' }, # duplicate 'title' and 'author' here
    { id: 4, title: 'Docter Strand', author: 'Paul', category: 'marvel' },
    { id: 5, title: 'Fly high', author: 'Amanda', category: 'Ballad' }, # duplicate 'category' here
    { id: 6, title: 'Freedome', author: 'Lodder', category: 'sky' }
  ]
)
# Bulk Insert (4.0ms)  INSERT INTO "posts"("id","title","author","category") VALUES (1, 'Lost stars  [...still...] 'sky') ON CONFLICT ("id") DO UPDATE SET "title"=excluded."title","author"=excluded."author","category"=excluded."category"

# SQLite3::ConstraintException: UNIQUE constraint failed: posts.title, posts.author (ActiveRecord::RecordNotUnique)
```
- Ở ví dụ trên, trong trường hợp SQLite, theo mặc định, bản ghi mới sẽ thay thế bản ghi hiện tại và bản ghi mới có cùng khóa chính. Nếu một bản ghi vi phạm bất kỳ ràng buộc duy nhất nào khác ngoài khóa chính, nó sẽ raise `ActiveRecord::RecordNotUnique.`
- Mệnh đề `ON CONFLICT ("id") DO UPDATE` trong truy vấn SQL ở trên truyền đạt cùng một mục đích. Ở đó, `upsert_all` trong SQLite không có hành vi giống như trong MySQL.
- Vì vậy, như một giải pháp thay thế, chúng ta sẽ cần upsert các bản ghi với sự trợ giúp khi dùng `multiple upsert_all` với việc sử dụng tùy chọn `unique_by`.
```ruby
Post.upsert_all(
  [
    { id: 1, title: 'Lost stars', author: 'Adam Levine', category: 'Ballad' },
    { id: 1, title: 'Litte Flower', author: 'Jonny', category: 'R&B' }, # duplicate 'id' here
  ],
  unique_by: :id
)

Post.upsert_all(
  [
    { id: 2, title: 'Hello world', author: 'Smith', category: 'rails' },
    { id: 3, title: 'Hello world', author: 'Smith', category: 'ruby' }, # duplicate 'title' and 'author' here
    { id: 4, title: 'Docter Strand', author: 'Paul', category: 'marvel' },
    { id: 5, title: 'Fly high', author: 'Amanda', category: 'Ballad' }, # duplicate 'category' here
    { id: 6, title: 'Freedome', author: 'Lodder', category: 'sky' }
  ],
  unique_by: %i[ title author ]
)

puts Post.count
# 5

puts Post.all
#<ActiveRecord::Relation [#<Article id: 1, title: "Litte Flower", category: "R&B", author: "Jonny", description: nil>, #<Article id: 2, title: "Hello world", category: "rails", author: "Smith", description: nil>, #<Article id: 4, title: "Docter Strand", category: "marvel", author: "Paul", description: nil>, #<Article id: 5, title: "Fly high", category: "Fly high", author: "Amanda", description: nil>, #<Article id: 6, title: "Freedome", category: "sky", author: "Lodder", description: nil>]>
```
- Ở đây, trước tiên chúng ta đã upsert all các bản ghi đã bị vi phạm chỉ mục khóa chính duy nhất trên cột id. Sau đó, chúng ta upsert thành công tất cả các bản ghi còn lại, vi phạm unique index trên cột title và author.
<hr>

- **upsert_all trong PostgreSQL**
```ruby
result = Post.upsert_all(
  [
    { id: 1, title: 'Lost stars', author: 'Adam Levine', category: 'Ballad' },
    { id: 1, title: 'Litte Flower', author: 'Jonny', category: 'R&B' }, # duplicate 'id' here
    { id: 2, title: 'Hello world', author: 'Smith', category: 'rails' },
    { id: 3, title: 'Hello world', author: 'Smith', category: 'ruby' }, # duplicate 'title' and 'author' here
    { id: 4, title: 'Docter Strand', author: 'Paul', category: 'marvel' },
    { id: 5, title: 'Fly high', author: 'Amanda', category: 'Ballad' }, # duplicate 'category' here
    { id: 6, title: 'Freedome', author: 'Lodder', category: 'sky' }
  ]
)
# PG::CardinalityViolation: ERROR:  ON CONFLICT DO UPDATE command cannot affect row a second time (ActiveRecord::StatementInvalid)
# HINT:  Ensure that no rows proposed for insertion within the same command have duplicate constrained values.
```
- Việc upsert_all hàng loạt không thành công trong ví dụ trên do ngoại lệ `ActiveRecord::StatementInvalid `không hợp lệ được gây ra bởi exception [PG::CardinalityViolation](https://github.com/postgres/postgres/blob/beeb8e2e0717065296dc7b32daba2d66f0f931dd/src/backend/executor/nodeModifyTable.c#L1335-L1355).
- Như một giải pháp thay thế, chúng ta có thể chia truy vấn `upsert_all` thành nhiều truy vấn `upsert_all` với việc sử dụng tùy chọn `unique_by` tương tự như cách chúng ta đã làm trong trường hợp SQLite trong phần 4.2 ở trên.
```ruby
Post.insert_all(
  [
    { id: 1, title: 'Lost stars', author: 'Adam Levine', category: 'Ballad' },
    { id: 2, title: 'Hello world', author: 'Smith', category: 'rails' },
    { id: 4, title: 'Docter Strand', author: 'Paul', category: 'marvel' },
    { id: 6, title: 'Freedome', author: 'Lodder', category: 'sky' }
  ]
)

Post.upsert_all(
  [
    { id: 1, title: 'Litte Flower', author: 'Jonny', category: 'R&B' }, # duplicate 'id' here
  ]
)

Post.upsert_all(
  [
    { id: 3, title: 'Hello world', author: 'Smith', category: 'ruby' }, # duplicate 'title' and 'author' here
  ],
  unique_by: :index_posts_on_title_and_author
)

Post.upsert_all(
  [
    { id: 5, title: 'Fly high', author: 'Amanda', category: 'Ballad' }, # duplicate 'category' here
  ]
)

puts Post.count
# 5

puts Post.all
#<ActiveRecord::Relation [#<Article id: 1, title: "Litte Flower", category: "R&B", author: "Jonny", description: nil>, #<Article id: 2, title: "Hello world", category: "rails", author: "Smith", description: nil>, #<Article id: 4, title: "Docter Strand", category: "marvel", author: "Paul", description: nil>, #<Article id: 5, title: "Fly high", category: "Fly high", author: "Amanda", description: nil>, #<Article id: 6, title: "Freedome", category: "sky", author: "Lodder", description: nil>]>
```
<hr>


**5. insert, insert! and upsert**
- Để thuận tiện hơn, Rails 6 cũng đã được giới thiệu thêm 3 method nữa đó là insert, insert! và upsert.
- Phương thức `insert` sẽ thêm một bản ghi vào cơ sở dữ liệu. Nếu bản ghi đó vi phạm một ràng buộc duy nhất, thì phương thức `insert` sẽ bỏ qua việc thêm bản ghi vào cơ sở dữ liệu mà không đưa ra một ngoại lệ.
- Tương tự, phương thức `insert!` cũng thêm một bản ghi vào cơ sở dữ liệu, nhưng sẽ raise exception `ActiveRecord::RecordNotUnique` nếu bản ghi đó vi phạm ràng buộc về tính duy nhất.
- Phương thức `upsert` sẽ thêm hoặc cập nhật một bản ghi vào cơ sở dữ liệu tương tự như cách upsert_all thực hiện.
- Ví dụ:
```ruby
Post.insert({ id: 5, title: 'Fly high', author: 'Amanda', category: 'Ballad' }, unique_by: :category)

# tương tự

Post.insert_all([{ id: 5, title: 'Fly high', author: 'Amanda', category: 'Ballad' }], unique_by: :category)
```
```ruby
Post.insert!({ id: 5, title: 'Fly high', author: 'Amanda', category: 'Ballad' }, returning: %w[ id title ])

# tương tự

Post.insert_all!([{ id: 5, title: 'Fly high', author: 'Amanda', category: 'Ballad' }], returning: %w[ id title ])
```
```ruby
Post.upsert({ id: 5, title: 'Fly high', author: 'Amanda', category: 'Ballad' }, unique_by: :category, returning: %w[ id title ])

# tương tự

Post.upsert_all([{ id: 5, title: 'Fly high', author: 'Amanda', category: 'Ballad' }], unique_by: :category, returning: %w[ id title ])
```

<hr>

- ###### Trên đây là những phương thức giúp chúng ta có thể insert hay upsert hàng loạt bản ghi cùng lúc mà Rails 6 hỗ trợ. Cảm ơn mọi người đã đọc bài viết này!
- ###### Tài liệu tham khảo: [Bulk support in Rails 6](https://blog.bigbinary.com/)