# Giới thiệu
Như ta đã biết, Ruby là một ngôn ngữ được sử dụng rất nhiều trong việc lập trình web. Trong Ruby, Block có một vai trò vô cùng quan trong. Hôm nay, chúng ta sẽ tìm hiểu về Block, Proc và Lambda.
# Block
Trước khi tìm hiểu về block, chắc hẳn các bạn đã học và tìm hiểu rất kĩ về vòng lặp và các phương thức. Ví dụ về vòng lặp:
```
    [1, 2, 3].each do |item|
        puts item
    end
```
Ta thấy phía sau method .each của array có một đoạn code được đặt trong `do...end`. Đó chính là Block. 

Block là một đoạn code có thể thực thi được đặt bên trong `do...end` hoặc `{...}`. Chúng ta có thể khai báo các tham số cho block bên trong `|...|`. Sử dụng Block chính là một trong những điều cơ bản để có thể sử dụng tốt vòng lặp

Ngoài việc sử dùng block với vòng lặp, chúng ta có thể truyền Block vào một method và sử dụng trong method đó. Như ví dụ ở trên, ta thấy phương thức each là một phương thức của mảng. Việc ta đặt một Block phía sau each cũng đồng nghĩa với việc ta truyền Block đó vào phương thức each.

Có 2 kiểu block khi truyền vào một phương thức. Đó là Implicit block và Explicit block. Tiếp theo đây, ta sẽ đi tìm hiểu về chúng.
## Implicit block
Implicit block là các block được truyền vào một method mà block đó không được khai báo khai báo trong danh sách tham số truyền vào của method. Ta có thể gọi đến block đó thông qua từ khóa `yield`
```
def show
    yield
end

show do
    puts "Implicit block" 
end
```
Ngoài ra, ta cũng có thể truyền tham số cho block đó
```
def hello(name)
    yield(name)
end

hello("hau") do |name|
    puts "Hello #{name}"
end
```
## Explicit block
Ruby cho phép truyền bất kỳ đối tượng nào cho một phương thức. Nếu chúng ta đặt ký hiệu `&` ở trước tham số cuối cùng của một phương thức, thì Ruby sẽ cố gắng coi tham số này là block của phương thức.

Khi chúng ta viết định nghĩa phương thức của mình, chúng ta có thể khai báo rõ ràng rằng chúng ta muốn phương thức này có thể nhận một khối.

Để gọi đến block, thay vì dùng từ khóa` yield` như ở trên, ta dùng phương thức call

```
def show(&block)
    block.call
end

show do
    puts "Implicit block" 
end
```

Tương tự như Implicit block, ta cũng có thể truyền tham số cho Explicit block

```
def hello(name, &block)
    block.call(name)
end

hello("hau") do |name|
    puts "Hello #{name}"
end
```

Nếu tham số đã là một Proc object, Ruby sẽ chỉ cần liên kết nó với phương thức như một block. Nếu tham số không phải là Proc, Ruby sẽ cố gắng chuyển nó thành một (bằng cách gọi tới phương thức to_proc) trước khi liên kết nó với phương thức.

Block là một Proc object

```
def show_class(&block)
    puts block.class
end

show_class {}
```

# Proc
Nếu muốn dùng một block, ta phải khai báo, cài đặt block đó. Nếu ta dùng block đó nhiều lần thì ta phải viết lại code của block đó lặp đi lặp lại rất nhiều lần và điều này thực sự rất bất tiện. Do đó, Proc được sinh ra. Một "proc" là một thể hiện của lớp **Proc**. Nó nắm giữ một đoạn code nào đó và được lưu vào một biến cụ thể.

Để tạo một "proc", ta dùng phương thức `Proc.new`. Để thực thi code được proc nắm giữ, ta dùng phương thức call
```
proc = Proc.new do
    puts "Hello Ruby"
end

proc.call
```

Ta cũng có thể truyền proc vào method như block

```
proc = Proc.new do
    puts "Hello Ruby"
end

def hello(&block)
    block.call
end

hello(&proc)
```
# Lambda
Có thể các bạn cũng đã biết hàm Lambda ở một số ngôn ngữ lập trình khác. Hàm lambda trong Ruby cũng gần giống như vậy

Lambda là một hàm nặc danh. Đặc điểm của lambda là nó là một hàm không có tên, được sử dụng khi bạn không muốn khai báo nó một cách chính thức như các hàm khác. Nó gần như tương tự với proc và chỉ khác proc ở một vài điểm. Những điểm khác nhau này chúng ta sẽ đề cập ở phần sau.

Khai báo lambda trong Ruby, ta dùng từ khóa `lambda`. Để thực thi một lambda, ta dùng phương thức call.

```
hello = lambda do
    puts "Hello Ruby"
end

hello

```
# Sự khác nhau giữa Proc và Lambda
Sự khác nhau đầu tiên giữa proc và lambda là proc không kiểm tra số lượng tham số truyền vào còn lambda thì có
```
lam = lambda { |x| puts x }        # creates a lambda that takes 1 argument
lam.call(2)                        # prints out 2
lam.call                           # ArgumentError: wrong number of arguments (0 for 1)
lam.call(1,2,3)                    # ArgumentError: wrong number of arguments (3 for 1)
proc = Proc.new { |x| puts x }     # creates a proc that takes 1 argument
proc.call(2)                       # prints out 2
proc.call                          # returns nil
proc.call(1,2,3)                   # prints out 1 and forgets about the extra arguments
```
Sự khác biệt thứ hai là nếu trong cả lambda và proc đều `return` thì cách xử lí của chúng sẽ khác nhau. Khi `return` bên trong lambda được thực thi, nó kích hoạt code ngay bên ngoài lambda.Còn khi `return` bên trong proc được thực thi, nó kích hoạt code bên ngoài phương thức nơi proc đang được thực thi.

```
def lambda_test
     lam = lambda { return "Lambda" }
     lam.call
     puts "End lambda_test method"
end
def proc_test
     proc = Proc.new{return puts "Proc"}
     proc.call
     puts "End proc_test method"
end
puts "1. Execute lambda_test"
lambda_test
puts "2. Execute proc_test"
proc_test
```

```
#Result
1. Execute lambda_test
End lambda_test method
2. Execute proc_test
Proc
```
# Tài liệu tham khảo
https://www.rubyguides.com/2016/02/ruby-procs-and-lambdas/