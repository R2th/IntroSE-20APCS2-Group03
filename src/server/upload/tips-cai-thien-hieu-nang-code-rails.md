**Dùng `where` thay `select`**<br><br>
Khi thực hiện nhiều tính toán, càng load ít dữ liệu vào bộ nhớ càng tốt, **luôn luôn** dùng SQL query thay cho object method.<br><br>
Ví dụ:
```ruby
shop_ids.map do |shop_id|
  products.select { |p| p.shop_id == shop_id }.first
end
```
Code sẽ chạy nhanh hơn nếu viết thế này:
```ruby
shop_ids.map do |shop_id|
  products.where(shop_id: shop_id).first
end
```
<br>

**Dùng `pluck` thay `map`**<br><br>
Nếu chỉ quan tâm một vài giá trị mỗi hàng, nên dùng **pluck** thay **map**<br><br>
Ví dụ:<br>
```
Order.where(number: 'R545612547').map &:id
# Order Load (5.0ms)  SELECT `orders`.* FROM `orders` WHERE `orders`.`number` = 'R545612547' ORDER BY orders.created_at DESC
=> [1]
```
Map sẽ load tất cả dữ liệu vào bộ nhớ trước, sau đó thực hiện lấy id, pluck nhanh hơn vì nó không phải load dữ liệu vào trước.
```ruby
Order.where(number: 'R545612547').pluck :id
# SQL (0.8ms)  SELECT `orders`.`id` FROM `orders` WHERE `orders`.`number` = 'R545612547' ORDER BY orders.created_at DESC
=> [1]
```
<br><br>
**Dùng `ActiveRecord::Calculations#sum` thay `Enumerable#sum`**<br><br>
Thông thường khi thực hiện tính toán đôi khi chúng ta sử dụng `Enumerable::sum` để tính tổng, đây là một sai lầm thường gặp bởi vì `ActiveRecord::Calculations` đã cho ta cách để tính mà không cần load một đống dữ liệu vào bộ nhớ trước. Nếu bạn muốn thưc hiện tính toán theo cách của Rails, `ActiveRecord::Calculations` là lựa chọn tốt nhất để sử dụng.<br><br>
```ruby
Benchmark.ips do |x|
  x.report("SQL sum") do
    Loan.sum(:balance)
  end

  x.report("Ruby sum") do
    Loan.sum(&:balance)
    # Same as: Loan.all.map { |loan| loan.balance }.sum
  end

  x.compare!
end

# Comparison:
#            SQL sum:        7.89 i/s
#           Ruby sum:        0.03 i/s - 209.85x  slower
```
<br><br>
**Dùng `ActiveRecord::Calculations#maximum` thay `Enumerable#max`**<br><br>
Như đã giải thích ở trên, ta nên dùng `ActiveRecord::Calculations` để thực thiện việc tính toán
```ruby
Benchmark.ips do |x|
  x.report("SQL max") do
    Loan.maximum(:amount)
  end

  x.report("Ruby max") do
    Loan.pluck(:amount).max
  end

  x.compare!
end

# Comparison:
#              SQL max:      541.9 i/s
#             Ruby max:        0.5 i/s - 1113.47x  slower
```
**Dùng `ActiveRecord::Calculations#minimum` thay `Enumerable#min`**<br><br>
```ruby
Benchmark.ips do |x|
  x.report("SQL min") do
    Loan.minimum(:amount)
  end

  x.report("Ruby min") do
    Loan.pluck(:amount).min
  end

  x.compare!
end

# Comparison:
#              SQL min:      533.3 i/s
#             Ruby min:        0.5 i/s - 1017.21x  slower
```
<br><br>
**Dùng `Model.find_each` thay `Model.all.each`**<br><br>
Một sai lầm rất hay gặp đó là dùng `ActiveRecord::Scoping::Named::ClassMethods#all` + `ActiveRecord::Result#each` để lặp qua một bảng có hàng ngàn record.
```ruby
Product.all.each do |product|
  product.update_column(:stock, 50)
end
```
Method `all` sẽ load tất cả dữ liệu vào bộ nhớ trước, điều này có thể dẫn đến nhiều vấn đề về bộ nhớ. Để cho rõ hơn, thì vấn để ở đây không phải là method `all` mà là số lượng records nó load ra.<br><br>
Để xử lý, ta load records vào từng batch (mặc định là 1000 record):
```ruby
Product.find_each do |product|
  product.update_column(:stock, 50)
end
```
Để custom số lượng record:
```ruby
Product.find_each(batch_size: 200) do |product|
  product.update_column(:stock, 50)
end
```
Có thể chỉ định điểm bắt đầu của batch, điều này hữu ích nếu có nhiều worker xử lý trong cùng 1 queue, bạn có thể cho 1 worker xử lý records từ id 1-5000, và worker còn lại xử lý record có id từ 500 trở đi.
```ruby
Product.find_each(batch_size: 200, start: 5000) do |product|
  product.update_column(:stock, 50)
end
```

-----

**Tham khảo**: https://www.fastruby.io/blog/performance/rails/writing-fast-rails.html