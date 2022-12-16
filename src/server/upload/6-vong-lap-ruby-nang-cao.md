![](https://images.viblo.asia/cb72519e-764a-45f9-b9d4-0002f8265897.jpeg)

Ruby là ngôn ngữ với nguyên tắc "tối ưu hóa cho nhà phát triển". Đó là một ngôn ngữ dễ đọc, dễ viết, tích hợp, mẫu và nguyên mẫu cùng với các lợi ích khác. Một trong những tính năng tốt nhất của nó là cung cấp các phương thức trợ giúp cho nhiều phương thức thường được sử dụng. Lặp lại, sắp xếp, lọc, chuyển đổi và các phương thức khác đều có nhiều helper trợ giúp được tích hợp sẵn trong ngôn ngữ (có thể liệt kê trong mô-đun).

Bạn có thể tập trung vào logic của mình nhiều hơn và ít hơn vào việc viết các helper trợ giúp lặp lại đã được hỗ trợ sẵn. Điều làm cho code dễ đọc hơn.

Các phương thức trợ giúp này trừu tượng hóa các chi tiết về cách lặp lại xảy ra và cung cấp cho logic của chính nó. Vì code được đọc thường xuyên hơn nhiều so với được viết, nên nó cũng giúp code hiệu quả hơn.

Tôi muốn xem qua một số vòng lặp Ruby ít được biết đến. Những điều này sẽ làm cho code ít dài dòng hơn, dễ đọc hơn và viết nhanh hơn:

    1. map
    2. each_with_object
    3. each_with_index
    4. partition
    5. select/reject
    6. any?/all?

Lưu ý: Tất cả các phương thức này sẽ hoạt động cho cả arrays và hashes. Cả hai đều được coi là liệt kê.

**map**

Hữu ích cho việc tạo một mảng từ một mảng có sẵn và áp dụng một số logic nhất định cho từng phần tử.
Ví dụ: bình phương từng giá trị trong một mảng. Vì vậy, thay vì sử dụng từng thành phần để lặp lại và chèn kết quả vào một mảng khác, bạn chỉ có thể sử dụng map.

```
# ok: Instead of using each and appending to a var
def build_array(nums)
result = []
nums.each do |num|
result << calculate(num)
end
result
end
# better: You can just use map
def build_array(nums)
result = nums.map { |num| calculate(num) }
end
# best: Or even shorter.
def build_array(nums)
result = nums.map(&:calculate)
end
# Actually, we can skip this method and just inline `result = nums.map(&:calculate)`.
```

**each_with_object**

Hữu ích để tạo một đối tượng bằng cách lặp qua một số liệu.
Ví dụ: muốn tạo một hashes từ một array? Hay một đối tượng Person từ một hashes đã cho?

```
# ok: you can use an instantiated hash, which isnt pretty
def build_hash(nums)
  h = {}
  nums.each { |num| h[num] = calculate(num) }
  h
end

# better: or you can use each_with_object
def build_hash(nums)
  # it receives the object to start with ({}) and accumulates on top of it
  nums.each_with_object({}) { |num, res| res[num] = calculate(num) }
end

# bonus: works with any kind of object
def build_array(nums)
  # you can replace the accumulator to be an array, or any object really.
  nums.each_with_object([]) { |num, res| res << calculate(num) }
end
```

**each_with_index**

Hữu ích khi, ngoài việc lặp qua một số liệu, bạn cũng cần sử dụng chỉ mục. Ví dụ: Cần ghi lại chỉ mục hiện tại mà chúng ta đang xử lý?

```
# ok: Let's print a stauts log before each iteration
def handle(nums)
  num_count = nums.count
  # we can use the count to iterate
  for i in 0..num_count do
    Rails.logger.info("Handling item #{i}/#{num_count}")
    do_something(nums[i])
  end
end

# better: much more readable
def handle(nums)
  nums.each_with_index do |num, i|
    Rails.logger.info("Handling item #{i}/#{nums.count}")
    do_something(num)
  end
end
```

**partition**

Hãy tưởng tượng bạn có thể chia một mảng thành hai mảng, dựa trên một điều kiện. Bạn có thể làm chính xác điều đó với phân vùng:

```
# ok: let's split an array to an odd array and even array
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

# better: ruby helps you out! So simple, just inline it
def odd_even_short(nums)
  nums.partition(&:odd?)
end
```

**select/reject**

select lặp lại trên một liệt kê và chỉ trả về các phần tử trả về cho block đã cho. từ chối các hành động giống nhau nhưng ngược lại, nó trả về những hành động không thỏa mãn điều kiện:

```
### select ###
# ok: get a new array with only odd numbers
def only_odds(nums)
  result = []
  nums.each do |num|
    result << num if num.odd?
  end
  result
end

# better: shorter and cleaner
def only_odds_object(nums)
  nums.each_with_object([]) do |num, arr|
    arr << num if num.odd?
  end
end

# best: so simple you can just inline it
def only_odds_simple(nums)
  nums.select(&:odd?)
end

### reject ###
# exact opposite of `select`
def only_odds(nums)
  nums.reject(&:even?)
end
```

Đối với mảng, select and reject có sẵn ! : select! và reject!, điều này sẽ sửa đổi kiểu liệt kê đã cho.

**any?/all?**

any? kiểm tra xem ít nhất một phần tử trong một kiểu liệt kê tương ứng với một điều kiện. all? xác minh rằng tất cả các yếu tố đều phù hợp với điều kiện.

```
### all? ###
# ok: checking if all nums are odd
def all_odds?(nums)
  nums.each do |num|
    return false if num.even?
  end
  true
end

# better: so simple you don't even really need a method, just inline it
def easier_all_odds?(nums)
  nums.all?(&:odd?)
end

### any? ###
# ok: checking if any of the numbers are greater than 0
def any_greater_than?(nums, x)
  nums.each do |num|
    return true if num > x
  end
  return false
end

# better: so simple, it might be better to just write it inline
def easier_any_greater_than?(nums, x)
  nums.any? { |num| num > x }
end
```