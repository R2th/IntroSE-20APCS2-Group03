Không biết suy nghĩ đầu tiên của các bạn về **throw** và **catch** trong Ruby là gì, có lẽ các bạn sẽ nghĩ rằng chúng được dùng để xử lý lỗi đúng không. Mình cũng từng nghĩ như vậy khi mới nhìn thấy 2 từ khóa này, nhưng mình đã rất bất ngờ khi biết rằng mình đã SAI !

## Cách throw và catch hoạt động
Đúng vậy, **throw** và **catch** không hề được dùng để xử lý lỗi !. `While`, `iterator` đều có một `block` đi kèm và chúng ta có thể buộc các block đó dừng hoạt động bằng cách sử dụng method `break`. Tương tự như vậy, **catch** cũng có một `block` đi kèm và **throw** sẽ đóng vai trò như method `break` của block đó.

```ruby
catch(:a_catch_block) do
  x = 0

  while x < 10
    print x
    x += 1

    throw :a_catch_block if x == 5
  end
end

# kết quả:
#
# 01234
```

ở ví dụ trên, **catch** được dùng để tạo ra một `block` có tên là `a_catch_block` và các đoạn code bên trong block này sẽ được chạy cho đến khi **throw** có tham số là `a_catch_block` được thực thi. Do mình đã **throw** block của **catch** khi `x==5` được thực thi nên kết quả in ra chỉ là `01234`.

Điểm mấu chốt trong cách hoạt động của 2 method này chính là tham số của chúng. **Catch** nhận vào một symbol(hoặc một string), tham số này sẽ đóng vai trò như một `id` của **catch** vậy. **throw** cũng nhận vào một tham số(tham số này chỉ có thể là một symbol) và khi được chạy, nó sẽ tìm method **catch** gần nhất chứa nó có tham số giống với tham số nó nhận vào, nếu nó không tìm được method **catch** nào tương ứng thì **throw** sẽ báo lỗi `UncaughtThrowError`.

Ở ví dụ trên, nếu như các bạn không sử dụng **catch** và **throw** trong ví dụ trên thì chúng ta buộc phải sử dụng `break` để dừng các câu lệnh `if` hoặc chúng ta cũng có thể đưa 2 câu lệnh `if` vào trong một method rồi dùng `return` thay cho **throw**. Nhưng chẳng phải như vậy sẽ bất tiện hơn sao.

Ngoài việc dừng chạy các block bên trong block của **catch** dừng chạy thì **throw** cũng có thể buộc các `iterator` và `method` phải dừng chạy.

```ruby
catch(:a_catch_block) do
  def test
    1.upto(19).each do |x|
      print x
      throw :a_catch_block if x == 5
    end
  end

  test
end

# kết quả:
#
# 12345
```

Như các bạn có thể thấy, cả iterator `upto` và method `test` đều đã bị **throw** buộc phải dừng chạy khi `x == 5`.  

Một đặc điểm thú vị của **throw** và **catch** đó là chúng có thể được đặt ở 2 method khác nhau kể khi 2 method đó không lồng nhau. Miễn là method chứa **throw** được gọi bên trong method **catch** của method chữa **catch** và tham số của **catch** + **throw** giống nhau.

```ruby
def method1
  p 'method 2 - message 1'
  throw :a_catch_block
  p 'method 2 - message 2'
end

def method2
  catch(:a_catch_block) do
    p 'method 1'
    method1
  end
end

method2

# kết quả:
#
# "method 1"
# "method 2 - message 1"
```

Tất cả mọi thức trong Ruby đều là một expression và sẽ trả về một giá trị nào đó, **catch** cũng vậy. **catch** sẽ trả về giá trị của expression cuối cùng được đặt trong block của nó. Tuy nhiên, các bạn cũng có thể định nghĩa giá trị trả về của **catch** thông qua **throw** bằng cách truyền vào **throw** thêm một tham số ngoài tham số đầu tiên, tham số này sẽ là giá trị trả về của **catch** nếu method **throw** được chạy.

```ruby
catch_return_value = catch(:a_catch_block) do
  throw :a_catch_block, 'giá trị trả về của catch'
end

p catch_return_value # => "giá trị trả về của catch"
```

## Lời kết
Như các bạn có thể thấy, **throw** và **catch** không hề được sử dụng để xử lý lỗi, việc này đã được `raise` và `rescue` thực hiện rồi. Trong thực tế thì **throw** và **catch** không được dụng thười xuyên và có thể gây khó hiểu nên tuy rằng chúng rất tiện và ngắn gọn, Nên mình nghĩ việc sử dụng `return` và `method` sẽ ok hơn. BTW, chúc các bạn một ngày làm việc vui vẻ. Cheer !