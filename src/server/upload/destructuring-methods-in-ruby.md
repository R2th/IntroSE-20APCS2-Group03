Những đoạn mã thú vị trong Ruby mà chưa chắc bạn đã biết
```
destructure def adds(a: 1, b: 2)
  a + b
end
adds(a: 1, b: 2)
# => 3
adds(OpenStruct.new(a: 1, b: 2))
# => 3
Foo = Struct.new(:a, :b)
adds(Foo.new(1,2))
# => 3
```

# Destructure
Dưới đây là đoạn code chúng ta cùng tìm hiểu trong bài viết này
```
def destructure(method_name)
  meta_klass  = class << self; self end
  method_proc = method(method_name)
  unless method_proc.parameters.all? { |t, _| t == :key }
    raise "Only works with keyword arguments"
  end
  arguments = method_proc.parameters.map(&:last)
  destructure_proc = -> object {
    values = if object.is_a?(Hash)
      object
    else
      arguments.map { |a| [a, object.public_send(a)] }.to_h
    end
    method_proc.call(values)
  }
  meta_klass.send(:define_method, method_name, destructure_proc)
  method_name
end
```
Cùng mình tìm hiểu destructuring trong ruby được thực hiện như thế nào nhé.
# Định nghĩa method
Như trên đầu bài viết, chúng ta dễ dàng thấy được cách định nghĩa 1 method như sau:
```
destructure def adds(a: 1, b: 2)
  a + b
end
```
Khi định nghĩa method xong, kết quả trả về sẽ là 1 symbol chính là tên của method vừa tạo
```
def foo; end
=> :foo
```
Thực tế, destructure đơn thuần là 1 method và nhận đối số chính là method_name chúng ta định nghĩa.
```
def destructure(method_name)
```
Nhưng chính xác là nó đang làm gì với cái tên đó, bây giờ đó là một vấn đề hoàn toàn khác.
# Meta Klass
Nếu chúng ta muốn overide lên một dynamic method trong Ruby ngay tại thân của nó, chúng ta sẽ làm thế nào? Làm thế nào về việc tạo một tham chiếu meta cho class ?

Khi định nghĩa như vậy, chúng ta có thể dễ dàng tái cấu trúc lại nội dung của method như sau:
```
meta_klass.send(:define_method, method_name, destructure_proc)
```
Vậy thì có cách nào để chúng ta có thể lấy được nội dung của method ban đầu ?
# Phương thức Method
Ruby cung cấp một phương thức `method` để chuyển đổi một :method_name thành 1 proc. 
```
def add(a, b) a + b end
=> :add
method(:add)
=> #<Method: Object#add>
method(:add).call(1, 2)
=> 3
```
Chúng ta sử dụng `.call` để thực thi proc như bình thường.
Điều đó có nghĩa là chúng ta có thể tham chiếu đến method sử dụng để thực hiện 1 nhiệm vụ mà chúng ta có thể thực hiện bất cứ khi nào chúng ta muốn.
```
`curl json_source.com/users.json`.yield_self(&JSON.method(:parse))
```
Thực ra đây không phải là 1 cách tối ưu, mà đây là 1 tính năng rất thú vị của Rails mà bạn hãy nên thử.
Những điều này rất mới mẻ mà không phải Ruby dev nào cũng biết đâu nha. Vậy còn về arguments thì sao nhỉ?

# Parameters
Procs và Proc-like objects có một method rất thú vị là `parameters`
```
-> a, *b, c: 1, **d, &fn {}.parameters
=> [[:req, :a], [:rest, :b], [:key, :c], [:keyrest, :d], [:block, :fn]]
```
Kết quả trả về là 1 mảng, mỗi phần tử 1 mảng bao gồm `type` và `name`
Nếu bạn chỉ muốn method hoạt động khi có đối số thì hãy làm như sau:
```
unless method_proc.parameters.all? { |t, _| t == :key }
  raise "Only works with keyword arguments"
end
```
Từ 1 method gốc chúng ta có thể lấy được các đối số của nó 
```
arguments = method_proc.parameters.map(&:last)
```
và chúng ta sẽ nhận được 1 mảng các đối số dạng symbol

Tham khảo:
https://medium.com/@baweaver/destructuring-in-ruby-9e9bd2be0360