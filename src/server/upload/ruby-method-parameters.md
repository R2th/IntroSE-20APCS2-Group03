![](https://images.viblo.asia/44d7ffb3-89a6-458f-ba70-202662995561.png)

---
Khi làm việc với các `method` trong `ruby`, các bạn có thể gặp các trường hợp tham số được định nghĩa trong `method` sẽ có dạng: `*args`, `**kwargs`, `&block`, ... Vậy chúng là gì, hôm nay ta sẽ tìm hiểu về vấn đề này thông qua **ruby method parameters**

:penguin:

---

## Default parameters
* Khi định nghĩa một `method`, ta có thể chỉ ra giá trị `default` (mặc định) cho chúng. Khi `method` được gọi, nếu các giá trị `arguments` (đổi số) ít hơn những giá trị `parameters` (tham số) được khai báo trước đó thì những tham số mặc định sẽ sử dụng những giá trị được gán mặc định đó.
    ```ruby
     def info(name, sex="male")
            puts "Name: #{name}, with sex: #{sex}"
     end
 
     info("huy", "female") 
     # => Name: huy, with sex: female
     info("huy") 
     # => Name: huy, with sex: male
    ```
* Nếu trong định nghĩa `method` có nhiều hơn một `default parameter` thì những `parameters` này phải được đặt liền kề nhau. Ví dụ, không thể đặt một `parameter` khác nằm giữa hai `default parameter` được.
* `method` có nhiều hơn một `default parameter` khi được thực thi với một danh sách các `arguments` được truyền vào, thì những `arguments` này sẽ được gắn giá trị cho các `default parameters` từ trái sang phải:
    ```ruby
      def f(a, b=1, c=2)
        puts a, b, c
      end
      
      f(10) 
      # => 10, 1, 2
      f(10, 100) 
      # => 10, 100, 2
      f(10, 100, 200) 
      # => 10, 100, 200
    ```
---
## Parameter with splat operator (*)
* Tham số kiểu mảng được gắn dấu `*` phía trước được sử dụng khi muốn truyền một mảng các đối số bất kỳ:
    ```ruby
      def f(first, *rest)
          puts rest, rest.class
      end

      f(1, 2, 3, 4) 
      # => [2, 3, 4], Array
    ```
* Một `method` có không quá một tham số loại này, tham số kiểu mảng phải theo liền kề sau những tham số mặc định, và có thể đứng trước các tham số bình thường khác:
    ```ruby
      def f(a=1, *args, b)
          puts "a: #{a}, args: #{args}, b: #{b}"
      end

      f(10, 20, 30, 40) 
      # => a: 10, args: [20, 30], b: 40
    ```
* Ngoài ra, `*` còn được sử dụng khi ta muốn truyền một mảng các đối số khi gọi `method`:
```ruby
    def f(name, age, sex)
        puts name, age, sex
    end
    
    user = ["sherlock", 20, "male"]
    f(*user)
    # => sherlock, 20, male
```
---
## Mapping arguments to parameters
Ta sẽ tìm hiểu cách `ruby` gán các đối số được truyền tới các tham số đã được định nghĩa trong `method`.

Giả sử một `method` có `o` tham số `original` (tham số thường), `d` tham số được gán giá trị mặc định, 1 tham số kiểu mảng. `method` được gọi với `a` đối số, khi đó:
* Nếu `a < o`:  lỗi `ArgumentError` xảy ra
* Nếu `o <= a <= o+d`: `a-o` tham số mặc định sẽ được gán giá trị, phần còn lại, `o+d-a` tham số mặc định sẽ sử dụng giá trị mặc định ban đầu.
* Nếu `a > o+d`: `a-o-d` đối số được truyền vào sẽ gán cho tham số mảng cuối cùng
---
## Using hash for named arguments
 Khi một `method` yêu cầu nhiều hơn 2 hoặc 3 tham số sẽ rất khó trong việc thực thi `method` này, ta cần phải nhớ hết thứ tự của tất cả các tham số này khi truyền các đối số vào. Đễ giải quyết vấn đề này, trong `ruby` ta có thể sử dụng `hash argument`:

```ruby
  def f(opts)
    puts opts
  end
  
  f({name: "huy", age: 11}) 
  # => {:name=>"huy", :age=>11}
```
* Nếu trong `method` tham số dạng hash nằm ở cuối cùng (hoặc theo sau nó là một `block`), ta có thể bỏ qua dấu `{}` khi gọi `method` đó:
    ```ruby
      f(name: "huy", age: 11)
      # => {:name=>"huy", :age=>11}
    ```
### Parameter with double splat (**) operator

Một cách nữa để khai báo tham số kiểu hash: dùng `**`:
```ruby
  def f(**hash)
      puts hash
  end
  
  f(a: 1, b: 2)
  # => {:a=>1, :b=>2}
  f()
  # Nếu không truyền đối số nào, mặc định cho `hash` sẽ là `{}`
  # => {}
```

 ---
## Block arguments with (&)
* Một `block` có thể được truyền vào khi gọi `method`:
    ```ruby
      def f(name, &block)
          yield name
      end

      f("sherlock") { |name| puts name }
      # => sherlock
    ```
    Nếu trong danh sách tham số không có `&`, `block` vẫn có thể được truyền vào qua `{}` hoặc `do; ;end`
* Lưu ý rằng tham số với `&` chỉ được định nghĩa một lần duy nhất, và nó phải được đặt ở vị trí cuối cùng trong danh sách:
```ruby
  def f(&block, &other_block)
    ...
   end
  # => syntax error, unexpected ',', expecting ')'
  
  def f(&block, name)
    ...
   end
   
   # => syntax error, unexpected ',', expecting ')'
```
---