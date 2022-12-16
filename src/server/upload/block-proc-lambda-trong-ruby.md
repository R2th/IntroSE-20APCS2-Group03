## I. Khái niệm
### 1. Block
- Block đơn giản là tập hợp các lệnh thành 1 khối, nằm trong `{...}` hoặc `do ... end`.
- Có 1 quy ước chung là sử dụng `{...}` cho các block đơn (1 dòng lệnh) và `do...end` cho các block bội (multi-line). Ví dụ:
```
[1, 2, 3].each do |n|
   puts n*n
end

[1, 2, 3].each { |n| puts n*n }
```
- Thông thường block được dùng để thực hiện một chức năng nào đó đối với từng phần tử trong một array hoặc hash.
- Mọi thứ trong ruby đều là object ngoại trừ block.
- Block được truyền vào phương thức ở vị trí giống như là một tham số cuối cho phương thức được gọi và được gọi ra bằng câu lệnh `yield` trong định nghĩa phương thức. Ví dụ:
```
def sum
    yield 3, 4
end
sum { |i, j| Sumary is: #{ i + j } }
```
- Khi sử dụng block thì có hạn chế đó là khi muốn thay đổi đầu vào thì chúng ta phải viết lại toàn bộ block để hiển thị giá trị cho input mới.

### Proc
- Proc là 1 object, cũng có thể nói Proc là 1 Block được đặt tên.
- Chúng ta có thể lưu trữ 1 Proc trong 1 biến và sau đó truyền nó 1 cách rõ ràng tới bất kỳ method nào gọi nó. Ví dụ:
```
p = Proc.new { |n| puts n*n }
[1, 2, 3].each(&p)
[4, 5, 6].each(&p)
# Ký hiệu & để hiểu tham số truyền vào là 1proc, bản chất nó là chuyển symbol thành proc object, và truyền vào cho hàm như 1 block/
```

```
proc = Proc.new do
    puts "Hello"
end
proc.call
# Chúng ta có thể gọi Proc bằng phương thức .call
```

- Proc là 1 Proc object.

### Lambda
- Lambda là một function và không có tên cụ thể.
- Nó có thể được sử dụng để gán 1 đoạn code.
- Là 1 object
- Những gì lambda làm hoàn toàn độc lập với fucntion gọi nó.
- Lambda là 1 Proc object.
- Lambda thể hiện tính chất của một method
- Ví dụ:
```
result = lambda { |x| x + 1 }
hoặc
result = -> { |x| x + 1 }
Dùng .call để gọi
result.call(10)
```

## II. So sánh
### Block và Proc
- Proc là objects, còn Block thì không
- 1 proc là thể hiện của 1 lớp Proc
- Proc khi đứng một mình vẫn được định nghĩa còn Block thì không, nó chỉ là 1 thành phần trong 1 câu lệnh, nếu đứng không sẽ không có ý nghĩa gì cả.
- Chỉ truyền được 1 block vào trong danh sách đối số của methods, còn với proc thì có thể truyền nhiều proc vào methods.

### Proc và Lambda
- Đều là Proc object
- Lambda kiểm tra số lượng các tham số của nó nhận và trả về một `ArgumentError` nếu số lượng đó không phù hợp với số lượng đối số trong method của nó; còn Proc thì nếu không truyền tham số thì proc mặc định tham số đó bằng nil.
```
p = Proc.new { |x| puts x +1 }
p.call(1, 2)
# return 2
l = lambda { |x| puts x +1 }
l.call(1, 2)
# return Argument Error
```

- Đối với hàm dùng return trong lambda và proc thì với proc thì sẽ return ngay sau khi thực hiện xong proc, còn với lambda thì vẫn tiếp tục chạy hết hàm sau khi gọi xong lambda.
```
def method_lambda
  lam = lambda { return puts "xin chao" }
  lam.call
  puts "cac ban"
end
# khi gọi lambda trên
method_lambda
# kết quả in ra là
xin chao
cac ban

def method_proc
  proc = Proc.new { return puts "xin chao" }
  proc.call
  puts "cac ban"
end
# gọi proc trên
method_proc
# kết quả in ra là
xin chao
```

- Việc dùng proc hay lambda phụ thuộc việc có dùng return hay không.

Qua so sánh 3 loại trên, ta có thế rút ra được các đặc trưng của từng loại :
+ Procs là object còn block thì không.
+ Hầu hết block xuất hiện trong một danh sách các đối số (argument).
+ Lambda kiểm tra số lượng đối số còn proc thì không.
+ Lambda và proc xử lý với return không giống nhau.

Hy vọng sau bài viết này các bạn sẽ có cái nhìn rõ hơn về các khái niệm Block, Proc & Lambda!

Nguồn:

http://code.tutsplus.com/tutorials/ruby-on-rails-study-guide-blocks-procs-and-lambdas--net-29811

http://www.reactive.io/tips/2008/12/21/understanding-ruby-blocks-procs-and-lambdas/

http://www.rubyguides.com/2016/02/ruby-procs-and-lambdas/