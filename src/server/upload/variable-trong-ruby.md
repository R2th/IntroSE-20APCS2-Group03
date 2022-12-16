## 1. Variable scope trong Ruby
Scope định nghĩa nơi mà một biến có thể truy cập trong chương trình. Việc nắm bắt rõ được scope của mỗi biến trong trương trình sẽ giúp ích rất nhiều trong việc tránh các lỗi cũng như debug. Trong Ruby có 4 kiểu scope: local, global, instance và class. Bên cạnh đó Ruby có thêm biến Constant. Trong Ruby mỗi kiểu biến có một ký tự bắt đầu riêng biệt:

|     Ký tự bắt đầu     |  Variable scope|
| -------- | -------- 
| [a-z] hoặc _    | Local variable     |
| $     | Global variable     |
| @   | Instance variable     |
| @@     | Class variable     |
| [A-Z]     | Constant     |

Như vậy bạn có thể xác định kiểu biến chỉ dựa và ký tự đầu tiên của biến. Nhưng còn cách khác, đó là sử dụng phương thức ```defined?```
```
x = "Hello"
puts defined? x

=> local-variable
```
## 2. Local variable
```Local variable``` là biến được bắt đầu bằng ký tự ```[a-z]``` hoặc ``` _```. Khả năng truy cập của biến local phụ thuộc vào nơi mà nó được khai báo. Ví dụ khi khai báo biến local trong một class, mehtod hay vòng lặp bạn sẽ không thể truy cập vào biến local bên ngoài class, method hay vòng lặp đó.
```
def helloWorld
    hello_world = "Hello world!"
    puts hello_world
end

helloWorld
puts hello_world
```
Khi chạy sẽ cho ra kết quả
```
Hello world
error: undefined local variable or method 'hello_world' for main:object
```
## 2. Global variable
```Global variable``` trong Ruby được bắt đầu bằng ký tự ```$```. Biến Global có thể được truy cập từ bất kỳ đâu trong chương trình.
```
class HelloWorld
    $hello_world = "Hello world"
    puts "#{$hello_world} inside class"
end

puts "#{$hello_world} outside class"
```
Khi chạy sẽ cho kết quả
```
Hello world inside class
Hello world outside class
```
## 3. Instance variable
```Instance variable``` trong Ruby được bắt đầu bằng ký tự ```@```. Nó chỉ thuộc về một đối tượng riêng lẻ hoặc một đối tượng của một lớp.
```
class HelloWorld
    def initialize p
        @person = p
    end
    
    def speak
        puts "#{@person} says 'Hello world'"
    end
end

hello = HelloWorld.new "Alex"
hello.speak
```
Khi chạy sẽ cho kết quả
```
Alex says 'Hello world'
```
Như ví dụ trên ta thấy biến instance chỉ thuộc tính riêng lẻ cho mỗi đối tượng và phạm vi sử dụng của nó là toàn bộ trong lớp.
## 4. Class variable
```Class variable``` trong Ruby được bắt đầu bằng ký tự ```@@```. ```Class variable``` có thể được truy cập trong tất cả các thể hiện của lớp đó. Khác với ```Global variable``` phạm vi hoạt động là cả chương trình, ```Class variable``` có phạm vi hoạt động là nằm trong class.
```
class HelloWorld
    @@person = "Alex"
    def setPerson p
        @@person = p
    end
    
    def speak
        puts "#{@@person} says 'Hello world'"
    end
end

hello = HelloWorld.new
hello.speak

hello.setPerson "Micheal"
hello.speak
```
Khi chạy sẽ cho kết quả
```
Alex says 'Hello world'
Micheal says 'Hello world'
```
## 5. Constant
```Constant``` trong Ruby được bắt đầu bằng ký tự chữ viết hoa ```[A-Z]```. ```Constant``` trong Ruby cũng tương tự như một biến, nhưng chỉ có một điều là giá trị của nó không được thay đổi. Trình thông dịch của Ruby không bắt buộc về sự cố định giá trị của ```Constant```, nhưng nếu có sự thay đổi giá trị của ```Constant``` thì trình thông dịch sẽ có thông báo về sự thay đổi đó.
## Nguồn tham khảo
https://www.techotopia.com/index.php/Ruby_Variable_Scope