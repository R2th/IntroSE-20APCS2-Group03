### `nil?`
* Là một method của Ruby.
* Có thể sử dụng trên mọi object.
* Chỉ trả về `true` nếu đó là `nil`.
```ruby
nil.nil?
# => true

false.nil?
# => false

0.nil?
# => false

"".nil?
# => false
```

### `empty?`
* Là một method của Ruby.
* Có thể sử dụng trên các *collection* như `Array`, `Hash`, `Set`.
* Trả về `true` khi *collection* đó không có phần tử nào.
* Tuy nhiên, method này không thể sử dụng với `Enumerable`.

```ruby
[].empty?
# => true

{}.empty?
# => true

Set.new.empty?
# => true

[1, 2, 3].each.empty?
# undefined method `empty?' for #<Enumerator: [1, 2, 3]:each>
```
* Có thể sử dụng với `String` (vì `String` là một mảng của các `character`).
```ruby
"".empty?
# => true

" ".empty?
# => false

nil.empty?
# => undefined method `empty?' for nil:NilClass
```
* Vấn đề với `empty?` là nó sẽ raise exception nếu object đó `nil`. Chúng ta có thể giải quyết vấn đề này với `blank?`.
### `blank?`
* Là một method của Rails.
* Với object có giá trị là `nil` và `false` thì `blank?` sẽ trả về `true`.
* Với object có giá trị là `true` thì `blank?` sẽ trả về `false`.
```ruby
nil.blank?
# => true

false.blank?
# => true

true.blank?
# => false
```
* `Array` và `Hash` sẽ `blank?` khi chúng `empty?`. Thực chất `blank?` và `empty?` là `alias_method` của nhau.
```ruby
class Array
  #   [].blank?        # => true
  #   [1, 2, 3].blank? # => false
  alias_method :blank?, :empty?
end

class Hash
  #   {}.blank?                # => true
  #   { key: "value" }.blank?  # => false
  alias_method :blank?, :empty?
end
```
* `String#blank?` hoạt động khác với `String#empty?` một chút, vì `blank?` sẽ xử lý cả khoảng trắng nữa.
```ruby
class String
  BLANK_RE = /\A[[:space:]]*\z/

  # A string is blank if it's empty or contains whitespaces only:
  #
  #   "".blank?       # => true
  #   "   ".blank?    # => true
  #   "\t\n\r".blank? # => true
  #   " blah ".blank? # => false
  #
  # Unicode whitespace is supported:
  #
  #   "\u00a0".blank? # => true
  #
  def blank?
    # The regexp that matches blank strings is expensive. For the case of empty
    # strings we can speed up this method (~3.5x) with an empty? call. The
    # penalty for the rest of strings is marginal.
    empty? || BLANK_RE.match?(self)
  end
end
```
* Điều này sẽ rất tiện lợi khi bạn muốn *reject* hoặc *handle* những chuỗi chỉ có khoảng trắng.
### `present?`
* Là một method của Rails.
* `present?` đơn giản chỉ là nghịch đảo của `blank?` và có thể sử dụng trên mọi object.
```ruby
class Object
  # An object is present if it's not blank.
  def present?
    !blank?
  end
end
```
### `presence`
* Là method của Rails.
* Với `presence` thì thay vì:
```ruby
continent = params[:continent] if params[:continent].present?
country   = params[:country]   if params[:country].present?
region    = continent || country || "Vietnam"
```
* bạn có thể viết thế này:
```ruby
params[:continent].presence || params[:country].presence || "Vietnam"
```
* Cũng có tiện hơi đôi chút. Cách implement của nó cũng rất đơn giản:
```ruby
class Object
  def presence
    self if present?
  end
end
```
### `any?` và `exists?`
* Chúng ta thường thấy `present?` được dùng trong các *ActiveRecord Relation*, tuy nhiên đây chưa phải là cách tiếp cận tốt nhất. Vẫn có method tốt hơn `present?`, đó là `any?` và `exists?`.

**Note:** Từ phiên bản *Rails 5.1* trở đi, `any?` và `exists?` đã được chỉnh sửa lại nên *performance* của hai method này là như nhau.
* Khi dùng `present?`:
```ruby
irb(main):003:0> Project.find(57).tasks.where.not(deleted_at: nil).present?
Project Load (0.5ms)  SELECT  "projects".* FROM "projects"  WHERE "projects"."enabled" = 't' AND "projects"."id" = $1 LIMIT 1  [["id", 57]]
Task Load (918.7ms)  SELECT "tasks".* FROM "tasks" INNER JOIN "boards" ON "tasks"."board_id" = "boards"."id" WHERE "tasks"."enabled" = 't' AND "boards"."project_id" = $1 AND "boards"."enabled" = 't' AND ("tasks"."deleted_at" IS NOT NULL)  [["project_id", 57]]
=> true
```
* Bạn sẽ thấy thời gian để *load* đoạn code trên là khá nhiều (khoảng **900ms**), tốn khá nhiều bộ nhớ và thời gian.
* Một cách tốt hơn đó là dùng `any?`:
```ruby
irb(main):004:0> Project.find(57).tasks.where.not(deleted_at: nil).any?
Project Load (0.9ms)  SELECT  "projects".* FROM "projects"  WHERE "projects"."enabled" = 't' AND "projects"."id" = $1 LIMIT 1  [["id", 57]]
(119.0ms)  SELECT COUNT(*) FROM "tasks" INNER JOIN "boards" ON "tasks"."board_id" = "boards"."id" WHERE "tasks"."enabled" = 't' AND "boards"."project_id" = $1 AND "boards"."enabled" = 't' AND ("tasks"."deleted_at" IS NOT NULL)  [["project_id", 57]]
=> true
```
* `any?` sẽ sử dụng câu lệnh `SQL COUNT` thay vì *load* toàn bộ, điều này làm giảm thời gian query xuống khá nhiều (từ **~900ms** xuống còn **~100ms**). Tuy nhiên, ở đây chúng ta chỉ cần kiểm tra xem  trong *scope* có bản ghi nào hay không mà thôi. Vì vậy, `COUNT (*)` ở đây vẫn bị thừa, không cần thiết. Chính vì thế, nên dừng lại khi tìm thấy bản ghi đầu tiên.
* `exists?` sẽ thêm `LIMIT` vào câu query khiến cho thời gian *load* được giảm xuống tới mức tối đa:
```ruby
irb(main):005:0> Project.find(57).tasks.where.not(deleted_at: nil).exists?
Project Load (0.5ms)  SELECT  "projects".* FROM "projects"  WHERE "projects"."enabled" = 't' AND "projects"."id" = $1 LIMIT 1  [["id", 57]]
Task Exists (0.9ms)  SELECT  1 AS one FROM "tasks" INNER JOIN "boards" ON "tasks"."board_id" = "boards"."id" WHERE "tasks"."enabled" = 't' AND "boards"."project_id" = $1 AND "boards"."enabled" = 't' AND ("tasks"."deleted_at" IS NOT NULL) LIMIT 1  [["project_id", 57]]
=> true
```
* Bằng cách `SELECT 1` và thêm `LIMIT 1` vào trong câu query, `exists?` trả về `true` ngay khi tìm thấy bản ghi đầu tiên. Thời gian *load* lúc này đã giảm từ **~900ms** xuống còn **~1ms**!!!
* Dưới đây là bảng so sánh thể hiện thời gian thực hiện các câu query với ba method này  (dùng [benchmark-ips](https://github.com/evanphx/benchmark-ips)):
```ruby
Benchmark.ips do |x|
  x.report("present?") do
    Project.find(1).tasks.where.not(deleted_at: nil).present?
  end
  x.report("any?") do
    Project.find(1).tasks.where.not(deleted_at: nil).any?
  end
  x.report("exists?") do
    Project.find(1).tasks.where.not(deleted_at: nil).exists?
  end
  x.compare!
end

 exists?:      158.4 i/s
    any?:       10.1 i/s - 15.65x  slower
present?:        2.3 i/s - 68.39x  slower
```
**NOTE:** Bảng so sánh trên được thực hiện bằng **Rails 4.2**, database **PostgreSQL**. Vì vậy kết quả này có thể sẽ không chính xác với các phiên bản mới hơn của Rails cũng như với các database khác. 
* Nếu bạn đang dùng `present?` trong project hiện tại thì hãy đổi sang `any?` hoặc `exists?` nhé. Hệ thống của bạn sẽ chạy nhanh hơn nhiều đấy!
### Tài liệu tham khảo
* [nil?, empty?, blank? in Ruby on Rails - what's the difference actually?](https://blog.arkency.com/2017/07/nil-empty-blank-ruby-rails-difference/)
* [Present? vs Any? vs Exists?](https://www.ombulabs.com/blog/benchmark/performance/rails/present-vs-any-vs-exists.html)