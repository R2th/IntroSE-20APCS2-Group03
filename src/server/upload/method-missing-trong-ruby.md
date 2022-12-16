* Bài viết được dịch và bổ sung từ nguồn: [Method Missing in Ruby](https://medium.com/podiihq/method-missing-in-ruby-af4c6edd5130)

## 1. method_missing là gì?

Nếu bạn chưa từng biết qua hoặc làm việc với `method_missing`, rất có thể khi bắt gặp câu hỏi này, đáp án thực tế sẽ khác xa với những gì bạn nghĩ. Tôi đã từng thu lượm được cả tá câu trả lời tương tự nhau: "`method_missing` là một method...đang bị thiếu, đúng chứ?"

Haha, sai mất rồi. Tuy nhiên, bạn cũng đúng một phần, ấy là `method_missing` là một method. Nó là một method được xây dựng sẵn của class BasicObject trong Ruby. Bạn có thể kiểm tra điều này cụ thể hơn bằng cách tham khảo [tài liệu Ruby online](http://ruby-doc.org/core-2.6.3/BasicObject.html#method-i-method_missing) hoặc chạy câu lệnh `BasicObject.private_methods.sort` ở môi trường `irb`. Có thể thấy rằng, `method_missing` là một private instance method của class này ([tham khảo source code github](https://github.com/ruby/ruby/blob/trunk/vm_eval.c#L650)). Trong cây phân cấp class, BasicObject là tổ tiên cuối cùng của mọi class khác, tức là nó là nút gốc của cây này. Do vậy, từ đặc điểm của tính chất kế thừa trong Ruby, mọi class đều sẽ kế thừa method `method_missing` này.

`method_missing` đóng vai trò như là phòng tuyến cuối cùng để xử lý việc gọi đến những method mà không tồn tại, chưa được định nghĩa. Nó làm việc với những `message` mà một `object` không thể phản hồi khi được gửi cho `message` ấy. Chúng ta hãy cùng xem xét ví dụ sau đây:

```ruby
class Animal
  def walk
    puts "I am walking!"
  end
end
```

Tôi đã tạo một class `Animal` và định nghĩa một instance method `walk`.
Bây giờ, tôi sẽ tạo một instance của class này, giả sử như là một chú bò. `walk` là hành động tự nhiên mà mọi con bò có thể thực hiện được:

```ruby
cow = Animal.new     # tạo một instance gọi là 'cow'
cow.walk             # truyền method 'walk' cho object 'cow'
=> "I am walking!"   # kết quả in ra màn hình
```

Bây giờ, nếu như chúng ta nói với chú bò ấy là hãy bay đi, một điều mà chỉ những loài bò trong truyện cổ tích mới làm được:

```ruby
cow.fly
NoMethodError: undefined method `fly' for object:cow
```

![fly-cow](https://images.viblo.asia/21820534-f5d0-4cbc-82be-c0248e50973b.gif)

Ây chà, có vẻ như chú bò của chúng ta không bay được...
Kết quả trả về là một exception.

Bây giờ, thay vì nhận lại một exception `NoMethodError`, tôi muốn nó trở nên rõ ràng hơn, cụ thể là hiển thị thông điệp: "Sorry, cows can’t fly!", thì tôi phải làm sao? Đây chính là lúc `method_missing` xen vào câu chuyện của chúng ta. Nó cho phép bạn có thể tùy chỉnh những thông báo lỗi, dựa trên khái niệm `method overriding` (ghi đè phương thức) của lập trình hướng đối tượng.

Cú pháp của method `method_missing` trông sẽ như sau:

```ruby
def method_missing method, *args, &block
  # return something
end
```

Method này nhận vào 3 tham số:
- `method`: tên của phương thức chưa tồn tại/chưa được định nghĩa mà object gọi tới. Tham số bắt buộc này thường xuất hiện dưới dạng một symbol và sẽ được chuyển đổi thành string khi sử dụng
- `*args`: mảng chứa danh sách các tham số của phương thức 'bị thiếu'. Đây là tham số tùy chọn, không bắt buộc phải có
- `&block`: nếu tham số này xuất hiện, nó thể hiện phương thức đang được gọi có đi kèm một block ở tận cùng, sau danh sách tham số

Bây giờ chúng ta hãy cùng viết lại phương thức `method_missing` để nó hoạt động theo cách mong muốn:

```ruby
class Animal
  def method_missing method, *args, &block
    if method.to_s == "fly"
      puts "Sorry, cows can’t fly!"
    else
      super
    end
  end
end
```

Bây giờ, chúng ta hãy thử lại để xem chú bò đã biết bay hay chưa:

```ruby
cow = Animal.new
cow.fly
"Sorry, cows can’t fly!"
```

Dĩ nhiên, nó vẫn sẽ không bay được đâu, nhưng kết quả nhận được đã dễ hiểu và thân thiện hơn nhiều rồi. Tuy nhiên, nếu bây giờ tôi muốn kiểm tra những khả năng khác của chú bò này thì sao, ví dụ như nó có biết hát hay không:

```ruby
cow.sing
NoMethodError: undefined method `sing' for object:cow
```

Khi này, luồng hoạt động của chương trình sẽ rẽ vào nhánh `else`: từ khóa `super` giúp gọi đến phương thức `method_missing` của `BasicObject`. Hành động mặc định của method này ấy là trả về ngoại lệ `NoMethodError`.

## 2. Áp dụng trong Rails Active Record

Ví dụ điển hình của việc áp dụng `method_missing` trong Rails Active Record là kĩ thuật sử dụng dynamic finder. Đó là những method đòi hỏi các hậu tố là tên các thuộc tính, ví dụ như:

- find_by_
- find_all_by_
- find_last_by_

Active Record được sử dụng như cầu nối giữa ứng dụng và cơ sở dữ liệu. Khi chúng ta viết những phương thức này, cần cung cấp cho nó những hậu tố liên quan đến thuộc tính của đối tượng đang sử dụng.

Giả sử như chú bò của chúng ta có những thuộc tính như: name, age, weight. Khi đó bạn có thể gọi đến phương thức `find_by_name` đối với object `cow`. Active Record sẽ phân tách tên phương thức, lấy ra hậu tố của nó và so sánh với các cột trong bảng dữ liệu. Nếu tồn tại cột khớp với hậu tố này, nó sẽ lấy ra bản ghi tương ứng thỏa mãn điều kiện. Còn nếu như mọi thứ không khớp với nhau, nghĩa là object đang gọi đến phương thức chưa được định nghĩa. Khi này, từ khóa `super` sẽ thực hiện chức năng của nó, giống như những gì mà chúng ta đã khảo sát ở trên.

Cảm ơn các bạn đã đón đọc bài viết.

## 3. Tài liệu tham khảo

- [Understanding method missing](https://www.leighhalliday.com/understanding-method-missing)
- [Ruby Metaprogramming - Method Missing](https://www.leighhalliday.com/ruby-metaprogramming-method-missing)