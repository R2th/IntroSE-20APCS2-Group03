Bài viết tham khảo nguồn [Ruby's Sort and Sort_by](https://mixandgo.com/learn/ruby-sort-and-sort-by) của tác giả [Cezar Halmagean](https://twitter.com/chalmagean)

![](https://images.viblo.asia/ca33bea5-dfc0-4346-8a4c-87e8ab6e47fc.png)

Sắp xếp là một bài toán có thể nói là rất basic trong bất cứ ngôn ngữ lập trình nào, chắc hẳn để trở thành một developer thì bạn đã từng học qua trên ghế nhà trường. Bài viết này xin đề cấp đến method `sort` và `sort_by` trong Ruby.

Hãy cùng điểm lại một số thuật toán sắp xếp phổ biến (mình nghĩ nó sẽ có ích cho các newbie hay là các bạn chuẩn bị đi phỏng vấn xin việc :))

### Một số thuật toán sắp xếp
Phần này bài viết chỉ để cập đến sắp xếp **tăng dần**.

#### Bubble sort
Hay quen thuộc với chúng ta với tên thuần Việt là sắp xếp nổi bọt (bong bóng). Các bước thực hiện của thuật toán này như sau:

- **b1:** Bắt đầu duyệt từ phần tử đầu tiên của danh sách
- **b2:** So sánh với từng phần tử nó duyệt đến
- **b3:** Nếu phần tử bên trái lớn hơn phần tử đang duyệt thì đổi chỗ
- **b4:** Lặp đi lặp lại 3 bước ở trên cho đến khi hoàn thành

![](https://images.viblo.asia/70136e4b-6467-4ed9-a419-fa6456238f43.png)

Một cách đơn giản để cải thiện hiệu năng của thuật toán này là sau mỗi vòng duyệt, ta sẽ loại bỏ phần tử cuối cùng ra (vì nó đã là phần tử lớn nhất).

#### Merge sort

Các bước thực hiện như sau:

- **b1:** Chia danh sách cần sắp xếp ra thành các nhóm cặp 2 phần tử cạnh nhau
- **b2:** Sắp xếp từng cặp nhỏ đó
- **b3:** Ghép 2 cặp nhỏ cạnh nhau, khi ghép thì sắp xếp luôn, ghép xong ta được một nhóm lớn hơn đã được sắp xếp
- **b4:** Tiếp tục lặp lại b3 cho đến khi nào ghép lại thành cả danh sách ban đầu đã được sắp xếp

Bạn hãy xem hình ví dụ minh hoạ đơn giản bên dưới đây:

![](https://images.viblo.asia/02003ac1-afca-494c-a5d7-e7bee0055692.png)

Merge sort sẽ làm việc tốt hơn bubble sort cho một danh sách lớn.

#### Quicksort

Các bước thực hiện như sau:
- **b1:** Chọn một phần tử bất kỳ (phần tử cuối cùng như bên dưới) làm điểm phân chia
- **b2:** Duyệt từng phần tử để chia danh sách ra làm 2 nửa, nửa bên trái cho các phần tử nhỏ hơn hoặc bằng điểm phân chia
- **b3:** Nửa bên phải cho các phần tử lớn hơn điểm phân chia
- **b4:** Trong mỗi danh sách con, lặp lại các bước 1 -> 2 -> 3 cho đến khi nào không phân chia được nữa => danh sách được sắp xếp

Cùng xem ảnh bên dưới để hiểu hơn về hoạt động của quicksort.

![](https://images.viblo.asia/bd0db0f1-dd8a-4057-a4fb-000451499022.png)

Với thuật toán quicksort này thì cách bạn lựa chọn điểm phân chia sẽ quyết định đến hiệu suất hoạt động, lý tưởng nhất là chọn được điểm phân chia nằm ở giữa danh sách :)

### Sắp xếp trong Ruby

Trong Ruby, method `sort` làm việc bằng cách sử dụng toán tử `<=>` để so sánh các phần tử của danh sách, và ta sử dụng thuật toán **quicksort** đã được đề cập ở trên.

Bạn cũng có thể truyền vào method `sort` một block tuỳ chọn nếu bạn muốn thực hiện một sắp xếp tuỳ chỉnh. Block đó sẽ nhận vào 2 tham số để quy định cách ta so sánh giữa chúng. Hãy xem ví dụ bên dưới.

#### Sắp xếp mảng giảm dần 
```
[1, 2, 3].sort { |a, b| b <=> a } # => [3, 2, 1]
```

### Toán tử sắp xếp `<=>`

Với phép so sánh `a <=> b` thì sẽ trả về:

- `-1` nếu a nhỏ hơn b
- `0` nếu a = b
- `1` nếu a lớn hơn b
- `nil` nếu a với b không thể so sánh được với nhau

Bạn có thể search với thuật ngữ `spaceship operator`.

### Method `sort` với `sort_by`

Điểm khác biệt ở 2 method này chính là nằm ở các tham số được truyền vào block của chúng.

- `sort` nhận vào 2 tham số là 2 đối tượng mà ta sẽ dùng để so sánh bằng toán tử `<=>`
- `sort_by` chỉ nhận một đối tượng, và bạn phải gọi đến một phương thức mà sẽ được sử dụng cho danh sách.

Nếu bạn muốn sắp xếp một mảng 2 chiều dựa vào kích thước của các mảng con bên trong, bạn có thể gọi method `size` cho đối tượng được truyền vào trong block, ví dụ:

```ruby
matrix = [
  [1, 2, 3, 4, 5, 6],
  [1, 2, 3],
  [1, 2, 3, 4, 5],
  [:a, :b, :c, :d]
]

matrix.sort_by { |obj| obj.size }
# => [
  [1, 2, 3],
  [:a, :b, :c, :d],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5, 6]
]
```

Bạn cũng có thể thực hiện nhiều phân loại - sử dụng nhiều giá trị để sắp xếp. Giả sử bạn muốn sắp xếp dựa trên `first name` và `last name`, bạn có thể làm như sau:

```ruby
Person = Struct.new(:fname, :lname)

p1 = Person.new("John", "Doe")
p2 = Person.new("Jane", "Doe")
p3 = Person.new("Marry", "Mackan")
p4 = Person.new("John", "Beck")

[p1, p2, p3, p4].sort_by { |p| [p.fname, p.lname] }
# => [
  #<struct  fname="Jane", lname="Doe">,
  #<struct  fname="John", lname="Beck">,
  #<struct  fname="John", lname="Doe">,
  #<struct  fname="Marry", lname="Mackan">
]
```

Nếu không truyền block  lên, method `sort_by` sẽ trả về một **enumerator**.

Khi làm việc với một danh sách lớn thì `sort_by` sẽ là một lựa chọn đúng đắn.

### Sắp xếp một chuỗi theo alphabe

Kết hợp với method `chars` sẵn có - methed này trả về mảng các ký tự trong chuỗi, bạn có thể sắp xếp mảng và join lại thành chuỗi mới.

```ruby
"jhmaeb".chars.sort.join # => "abehjm"
```

Nếu chuỗi có cả ký tự in hoa thì bạn có thể tiến hành sắp xếp như sau:

```ruby
"cdBghaZosa".chars.sort(&:casecmp).join # => "aaBcdghosZ"
```

### Sắp xếp một Hash

Thường thì bạn muốn sắp xếp một hash cũng giống như khi sắp xếp một array. Hash là một danh sách các cặp key/value. Bạn có thể sắp xếp hash theo các key/value của nó như sau:

```ruby
my_hash = {
  name: "John",
  age: 21,
  address: "Main Str. 11",
  email: "john@example.com"
}

my_hash.sort_by { |k, v| k }
# => [
  [:address, "Main Str. 11"],
  [:age, 21],
  [:email, "john@example.com"],
  [:name, "John"]
]

my_hash.sort_by { |k, v| v.to_s }
# => [
  [:age, 21], 
  [:name, "John"], 
  [:address, "Main Str. 11"], 
  [:email, "john@example.com"]
]
```

Như bạn cũng thấy thì kết quả trả về là một mảng 2 chiều, để đưa về Hash như ban đầu thì đơn giản bạn chỉ cần gọi thêm `to_h` ở cuối.

### Sắp xếp một mảng các hash

```ruby
scores = [
  {name: "Superman", score: 745},
  {name: "Ironman", score: 9},
  {name: "Batman", score: 10}
]

scores.sort_by { |h | h[:name] }
# => [
  {:name=>"Batman", :score=>10},
  {:name=>"Ironman", :score=>9},
  {:name=>"Superman", :score=>745}
]
```



-----

### Tham khảo

- https://mixandgo.com/learn/ruby-sort-and-sort-by

***

Cám ơn bạn đã theo dõi bài viết, hi vọng nó sẽ có ích cho bạn.