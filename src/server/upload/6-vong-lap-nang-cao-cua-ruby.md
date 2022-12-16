Ruby là một ngôn ngữ được cho là tối ưu hóa cho nhà phát triển, nó dễ đọc, viết, có template, prototype, cùng với các lợi ích khác. Một trong những tính năng tốt nhất của nó là cung cấp các helper method cho nhiều thủ tục thường được sử dụng. Vòng lặp, sắp xếp, lọc, chuyển đổi và các phương thức khác đều có nhiều helper được tích hợp sẵn trong ngôn ngữ.

Bạn có thể tập trung vào logic của mình nhiều hơn là việc viết các phương thức helper lặp đi lặp lại. Điều này không chỉ làm cho việc viết code trở nên thú vị hơn, mà còn làm cho code dễ đọc hơn.

Các phương thức trợ giúp này trừu tượng hóa chi tiết về cách vòng lặp hoạt động và đưa ra logic chính nó. Vì code được đọc thường xuyên hơn nhiều so với việc viết code giúp cho code hiệu quả hơn.

Trong bài viết này giới thiệu một số vòng lặp trong Ruby sẽ giúp cho code của bạn ít dài dòng hơn, dễ đọc hơn và viết nhanh hơn:
# map
Hữu ích cho việc tạo một mảng bằng vòng lặp và áp dụng logic nhất định cho mỗi phần tử.

Ví dụ, bình phương mỗi giá trị trong một mảng số. Vì vậy, thay vì sử dụng `each` để lặp và gán kết quả vào mảng khác, bạn có thể sử dụng `map`.
```ruby
# ok: Thay vì sử dụng each và gán vào biến
def build_array(nums)
  result = []
  nums.each do |num|
    result << calculate(num)
  end
  result
end

# better: Có thể sử dụng map
def build_array(nums)
  result = nums.map { |num| calculate(num) }
end

# best: Hoặc ngắn gọn hơn.
def build_array(nums)
  result = nums.map(&:calculate)
end
# Thực tế chúng ta có thể bỏ qua method này và dùng trực tiếp `result = nums.map(&:calculate)`.
```
# each_with_object
Hữu ích cho việc tạo một đối tượng bằng vòng lặp.

Ví dụ, nếu chúng ta muốn tạo ra một hash từ một mảng thì sao? Hoặc một đối tượng Person từ một hash?

Bạn cũng có thể sử dụng phương thức `reduce`, nhưng tôi thấy cú pháp của nó khó hiểu, vì vậy tôi thích each_with_object.

```ruby
# ok: bạn có thể khởi tạo một hash và gán giá trị
def build_hash(nums)
  h = {}
  nums.each { |num| h[num] = calculate(num) }
  h
end

# better: sử dụng each_with_object
def build_hash(nums)
  # nó nhận object để bắt đầu bằng ({}) và tích lũy vào đầu
  nums.each_with_object({}) { |num, res| res[num] = calculate(num) }
end

# bonus: hoạt động với object bất kì
def build_array(nums)
  # bạn có thể thay thế bộ tích lũy thành một mảng hoặc bất kỳ đối tượng nào thực sự.
  nums.each_with_object([]) { |num, res| res << calculate(num) }
end
```
# each_with_index
Hữu ích khi, ngoài việc lặp đi lặp lại vô số, bạn cũng cần sử dụng chỉ mục. Ví dụ, điều gì sẽ xảy ra nếu chúng ta cần ghi lại chỉ mục hiện tại mà chúng ta đang xử lý?

```ruby
# ok: Hãy in nhật ký trạng thái trước mỗi lần lặp
def handle(nums)
  num_count = nums.count
  # chúng ta có thể sử dụng một biến đếm để lặp
  for i in 0..num_count do
    Rails.logger.info("Handling item #{i}/#{num_count}")
    do_something(nums[i])
  end
end

# better: dễ đọc hơn nhiều
def handle(nums)
  nums.each_with_index do |num, i|
    Rails.logger.info("Handling item #{i}/#{nums.count}")
    do_something(num)
  end
end
```
# partition
Hãy nghĩ xem bạn có thể chia một mảng thành hai mảng dựa trên một điều kiện chỉ vơi một dòng code. Với ví dụ dưới đây, bạn có thể làm chính xác điều đó với `partition`:

```ruby
# ok: hãy chia một mảng thành một mảng lẻ và mảng chẵn
def split_odds_evens(nums)
  odds = []
  evens = []
  nums.each do |num|
    if num.odd?
      odds << num
    else
      evens << num
    end
  end
  [odds, evens]
end

# better: Ruby giúp bạn tìm ra đáp án! Rất đơn giản, chỉ với một dòng
def odd_even_short(nums)
  nums.partition(&:odd?)
end
```
# select/reject
`select` chạy vòng lặp và chỉ trả về các phần tử thõa mãn điều kiện đã cho. `reject` các hoạt động tương tự nhưng ngược lại, nó trả về những phần tử không thỏa mãn điều kiện:

```ruby
### select ###
# ok: trả về một mảng mới chỉ gồm số lẻ
def only_odds(nums)
  result = []
  nums.each do |num|
    result << num if num.odd?
  end
  result
end

# better: ngắn gọn hơn
def only_odds_object(nums)
  nums.each_with_object([]) do |num, arr|
    arr << num if num.odd?
  end
end

# best: đơn giản đến mức chỉ với một dòng code
def only_odds_simple(nums)
  nums.select(&:odd?)
end

### reject ###
# ngược lại với `select`
def only_odds(nums)
  nums.reject(&:even?)
end
```

Đối với mảng, `select` và `reject` có sẵn trong `!` (bang): `select!` và `reject!`. Những thứ này sẽ sửa đổi mảng đã cho vì vậy hãy cẩn thận khi sử dụng nó.
# any?/all?
`any?` kiểm tra xem ít nhất một phần tử trong một mảng thõa mãn với một điều kiện. `all?` xác minh rằng tất cả các phần tử phù hợp với điều kiện.

```ruby
### all? ###
# ok: kiểm tra xem tất cả các số có phải là số lẻ không
def all_odds?(nums)
  nums.each do |num|
    return false if num.even?
  end
  true
end

# better: đơn giản đến mức bạn thậm chí không cần viết phương thức
def easier_all_odds?(nums)
  nums.all?(&:odd?)
end

### any? ###
# ok: kiểm tra xem có bất kỳ số nào lớn hơn 0 không
def any_greater_than?(nums, x)
  nums.each do |num|
    return true if num > x
  end
  return false
end

# better: quá đơn giản, chỉ với một dòng
def easier_any_greater_than?(nums, x)
  nums.any? { |num| num > x }
end
```
# Bunus: find_index
Đôi khi, bạn chỉ cần tìm chỉ mục của một phần tử khớp với một điều kiện:
```ruby
# ok: tìm kiếm một chỉ mục của một đối tượng cụ thể - giải pháp rõ ràng
def find_num(nums, x)
  nums.each_with_index do |num, i|
    return i if num == x
  end
  nil
end

# better: đơn giản hơn với một dòng
def find_num(nums, x)
  nums.find_index(num)
end

# Nó cũng hoạt động với block. Nó hoạt động với tất cả các đối tượng
def find_obj(array, obj)
  array.find_index{ |element| yield(element, obj) }
end

# call it like this:
# find_obj([1,2,3], 2) { |x, y| x == y }
# => 1
```
# Tổng kết
Nếu bạn cần một cách đặc biệt để dùng vòng lặp trong Ruby, thì có khả năng nó đã tồn tại. Nếu bạn sử dụng framework (như Rails), bạn thậm chí có thể có nhiều phương thức hơn, vì chúng bao gồm các gem mở rộng trên nền tảng Rails.

Các phương thức ở trên giúp bạn viết code ngắn gọn và tập trung hơn, do đó giúp dễ đọc hơn.

*Nguồn:* [Benny Sitbon](https://medium.com/better-programming/6-advanced-ruby-loops-13695c20d012)