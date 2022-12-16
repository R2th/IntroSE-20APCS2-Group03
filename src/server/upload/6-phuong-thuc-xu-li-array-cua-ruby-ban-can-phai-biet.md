![](https://images.viblo.asia/7b62e37c-9248-4f75-b8c2-5a9fd7588541.png)

Mảng (Array) là một trong những kiểu cấu trúc dữ liệu cơ bản trong lập trình. Việc nhanh chóng vận dụng và đọc, xử lí dữ liệu từ mảng là điều khá quan trọng để xây dựng những thứ to tát hơn với máy tính. Với một thằng nhóc con như mình, trong thời gian thực tập mình đã thấy các anh dev múa lửa với mấy cái select, map, ... nối đuôi nhau dài dằng dặc và nhìn rối cả mắt mà cũng không hiểu nó sẽ chạy như thế nào. Nên hôm nay mình xin giới thiệu 6 phương thức xử lí mảng khá phổ biến trong Ruby mà bạn không thể bỏ qua - nếu bạn là một Ruby developer (để tránh bị hoa mắt như mình khi bước lên trên đường ray của Ruby).

# 1. Map và Each
![](https://images.viblo.asia/0171a889-4cfe-46ed-b02f-d0445b4d598b.jpg)
Hai phương thức này trông có vẻ khá là giống nhau. Chúng cho phép bạn "lướt" qua từng phần từ và xử lí chúng.
```ruby
array = [1, 2, 3]
effects = array.each{ |x| x + 2 }
added = array.map{ |x| x + 2 }
```
Kết quả:
```ruby
effects = [1, 2, 3]
added = [3, 4, 5]
```

Đây chính là sự khác biệt giữa map và each: `.map` sẽ return 1 mảng mới đã bị thay đổi, còn `.each` vẫn giữ nguyên mảng ban đầu.

### Faster and Better: `.map(&:method)`
Giả sử ta có 1 mảng chữ và mình muốn convert nó thành số, thì như cú pháp ở trên ta làm như sau:
```ruby
 numbers = ["5", "4", "8"]
 string_numbers = numbers.map { |number| number.to_i }
 => [5, 4, 8] 
```
 
 Nhưng có 1 cách nhanh gọn lẹ hơn nữa, đó là dùng cú pháp `.map(&:method)` :
```ruby
 string_numbers = numbers.map(&:to_i)
 => [5, 4, 8]
```
 
 Ngắn hơn rất nhiều phải không nào?

# 2. Select
`.select` giúp bạn tìm các phần tử thoả mãn điều kiện trong mảng. Bạn cần đưa cho `.select` một câu điều kiện trả về true/false, `.select` sẽ giúp bạn lấy ra các phần tử thoả mãn điều kiện đó.
```ruby
2.5.1 :011 > array = ['framgia', 'beetsoft', 'fsoft']
2.5.1 :013 > array.select{|word| word.length == 8}
 => ["beetsoft"] 
```

# 3. Reject
`reject` là phương thức ngược lại của `select`. Thử một ví dụ kết hợp `reject` và `map` với nhau xem nào:
```ruby
 girls = [
   {name: "Bích Phương", height: 165}, 
   {name: "Jun Vũ", height: 170}, 
   {name: "Phương Ly", height: 172}
   ]
```

Bây giờ chúng ta muốn "quăng" đi những cô gái cao bằng hoặc dưới 1m70:
```ruby
girls.reject { |girl| girl[:height] <= 170 }.map { |girl| girl[:name] }
=> ["Phương Ly"] 
```
![](https://images.viblo.asia/5a9c4d5b-5d8f-4784-8855-4c706468a712.png)




Thay vì chọn những phần tử thoả mãn điều kiện như `select`, chúng ta sẽ loại bỏ mọi thứ không thoả mãn điều kiện đã cho. Mọi phần tử thoả mãn điều kiện sẽ bị loại bỏ đi (như `Bích Phương` và `Jun Vũ` ở ví dụ trên vậy).

# 4. Reduce
![](https://images.viblo.asia/053d2188-59be-420f-a9da-7faf7aec95b5.jpeg)

`Reduce` có cấu trúc hơi phức tạp 1 xíu so với các phương thức mà mình đã giới thiệu, tuy nhiên nó thường được sử dụng trong các vấn đề tính toán cộng trừ nhân chia các thứ trong Ruby. Lần này, chúng ta quan tâm rằng sau mỗi lần chạy, mảng đó sẽ return lại cái gì. Ví dụ ngay và luôn:

* Tính tổng trong mảng

```ruby
array = [1, 2, 3]
array.reduce{|sum, x| sum + x}
 => 10
```

* Cũng tương tự với mảng String

```ruby
bands = ["nirvana", "queen", "sabbath"]
bands.reduce { |sum, band| sum+band }
 => "nirvanaqueensabbath"
```

Chúng ta có thể truyền tham số mặc định cho `reduce` để xác định giá trị ban đầu:
```ruby
array = [1, 2, 3]
array.reduce(4) { |sum, x| sum+x }
 => 10 
```
### Faster and Better: `.reduce(default value, :operation)`
```ruby
array = [1, 2, 3]
array.reduce(4, :+)
=> 6
```

**Lưu ý nhỏ:** Nếu bạn thực hiện với kiểu dữ liệu không phải là số hoặc chuỗi, bạn sẽ phải khai báo giá trị ban đầu trong tham số của reduce:

```ruby
employees = [{team: "Ruby", number: 8}, {team: "ReactNative", number: 6}]

# Truyền giá trị ban đầu bằng 0
employees.reduce(0) {|sum, employee| sum + employee[:number] }
 => 14
 
# Không truyền giá trị mặc định
employees.reduce{|sum, employee| sum + employee[:number] }

**NoMethodError (undefined method `+' for {:team=>"Ruby", :number=>8}:Hash)**

```

# 5. Join
![](https://images.viblo.asia/1d4fc693-943a-4cc1-ac90-b33a07d36d30.png)

Đúng như tên gọi của nó, `join` là một phương thức để ~~giao lưu và kết hợp~~ nối các phần tử trong mảng lại với nhau. `join` khá là giống với `reduce` ngoại trừ việc nó có syntax sạch sẽ hơn. `Join` cần 1 đối số truyền vào - chuỗi sẽ được chèn giữa các phần tử được nối của mảng. `Join` sẽ tạo ra một chuỗi string dàiiiiiiii bất kể bạn đưa cho nó những-thứ-không-phải-String. Xem qua ít ví dụ nào:

```ruby
places = Place.all.limit 3
places.join(" ")
=> "#<Place:0x00005645c39f9200> #<Place:0x00005645c39f9070> #<Place:0x00005645c39f8c38>"
```

```ruby
cars = [{type: 'porsche', color: 'red'}, {type: 'mustang', color: 'orange'}]
cars.join(" and ")
 => "{:type=>\"porsche\", :color=>\"red\"} and {:type=>\"mustang\", :color=>\"orange\"}" 

```

# Lời kết
Qua bài viết này, mình hi vọng các bạn có thể hiểu hơn về các phương thức xử lí trong Ruby, đặc biệt là các bạn newbie đang bắt đầu học Ruby / Rails. Ngoài ra còn có khá nhiều phương thức mà mình chưa nhắc đến ở đây như `reject`, `sort`, ... Các bạn có thể tìm hiểu thêm tại Ruby doc.
Đây là lần đầu mình dịch và viết bài nên sẽ có nhiều sai sót, mong mọi người góp ý để bài viết của mình thêm hoàn thiện hơn ạ.


### Tham khảo
https://medium.freecodecamp.org/six-ruby-array-methods-you-need-to-know-5f81c1e268ce
https://ruby-doc.org/core-2.5.3/Array.html