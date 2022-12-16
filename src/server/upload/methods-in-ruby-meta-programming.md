- Metaprogramming có thể hiểu là dùng code để viết code 1 cách dynamic hơn, code sẽ được sinh ra lúc runtime.
- Ruby sử dụng 1 số method để thực hiện metaprogramming, chúng ta sẽ tìm hiểu những method đó trong bài viết này

# 1. eval
- `eval` sẽ thực thi đoạn code được truyền vào hàm dưới dạng string
    ```ruby
    puts eval("7  * 6") # 42

    eval("def sum(a, b); a + b; end")
    puts sum(1, 2) # 3
    ```

# 2. instance_eval
- `instance_eval` dùng để khai báo thêm class method cho class
    ```ruby
    String.instance_eval do
      def some_class_method
        puts "some_class_method is called"
      end
    end
    
    String.some_class_method # some_class_method is called
    ```

# 3. class_eval
- `class_eval` dùng để khai báo thêm instance method cho class
    ```ruby
    String.class_eval do
      def some_instance_method
        puts self.upcase
      end
    end

    "Hello world".some_instance_method # HELLO WORLD
    ```

# 4. define_method
- `define_method` được dùng để định nghĩa method của 1 class
- Trong trường hợp 1 class có nhiều method có xử lý tương tự nhau, chỉ khác nhau ở tên hoặc 1 số chi tiết nhỏ khác, define method được sử dụng để giữ cho code được DRY hơn.
    ```ruby
    class Developer
      ROLES = [:front_end, :back_end, :dev_ops]
      SKILLS = {
        front_end: ["HTML", "CSS", "JavaScript"],
        back_end: ["Ruby", "MySQL", "Rails"]
      }

      ROLES.each do |role|
        define_method "#{role}_developer" do
          puts "Learning #{SKILLS[role].join(', ')}"
        end
      end
    end

    Developer.new.front_end_developer
    ```

# 5. method_missing
- `method_missing` là method được gọi khi gọi đến 1 method chưa được define
- Khi `method_missing` của class chưa được defind, method_missing của class cha (class Object) sẽ được gọi và raise lỗi `NoMethodError`
    ```ruby
    3.0.0 :001 > "hello world".demo
    Traceback (most recent call last):
            4: from /home/le.tan.thanh/.rvm/rubies/ruby-3.0.0/bin/irb:23:in `<main>'
            3: from /home/le.tan.thanh/.rvm/rubies/ruby-3.0.0/bin/irb:23:in `load'
            2: from /home/le.tan.thanh/.rvm/rubies/ruby-3.0.0/lib/ruby/gems/3.0.0/gems/irb-1.3.0/exe/irb:11:in `<top (required)>'
            1: from (irb):1:in `<main>'
    NoMethodError (undefined method `demo' for "hello world":String)
    ```
- Bạn có thể định nghĩa `method_missing` cho class như sau
    ```ruby
    String.class_eval do
      def method_missing method, *args, &block
        puts "Method #{method} is called with #{args} "
      end
    end

    "hello world".demo(1, 2, 3) # Method demo is called with [1, 2, 3]
    ```

# 6. remove_method:
- `remove_method` được dùng để remove method ra khỏi class
- Method đã được remove sẽ raise lỗi `NoMethodError` khi được gọi
    ```ruby
    puts "hello world".upcase
    String.remove_method(:upcase)
    puts "hello world".upcase
    # undefined method `upcase' for "hello world":String (NoMethodError)
    # Did you mean?  upcase!
    ```

# 7. class_variable_set
- `class_variable_set` được dùng để gán giá trị cho class variable của 1 class nào đó
    ```ruby
    class Foo
      @@value = 100

      def foo
         puts @@value
      end
    end

    Foo.new.foo # 100
    Foo.class_variable_set("@@value", 101)
    Foo.new.foo # 101
    ```

# 8. class_variable_get
- `class_variable_get` được dùng để lấy giá trị của class variable của 1 class nào đó
    ```ruby
    class Bar
      @@value = 100
    end

    puts Bar.class_variable_get("@@value") # 100
    ```

# 9. class_variables
- `class_variables` được dùng để lấy ra tất cả các class variable của 1 class nào đó
    ```
    class FooBar
      @@foo = 100
      @@bar = 100
    end

    puts FooBar.class_variables # ["@@foo", "@@bar"]
    ```

# 10. instance_variable_set
- `instance_variable_set` được dùng để gán giá trị cho instance variable của 1 instance nào đó
    ```ruby
    class Foo
      def initialize
        @value = 10
      end

      def value
        @value
      end
    end

    foo = Foo.new
    puts foo.value # 10
    foo.instance_variable_set("@value", 100)
    puts foo.value # 100
    ```

# 11. instance_variable_get
- `instance_variable_get` được dùng để lấy giá trị của instance variable của 1 instance nào đó
    ```ruby
    class Foo
      def initialize
        @value = 10
      end
    end

    foo = Foo.new
    puts foo.instance_variable_get("@value") # 10
    ```

# 12. class_variables
- `instance_variables` được dùng để lấy ra tất cả các instance variable của 1 instance nào đó
    ```ruby
    class FooBar
      def initialize
        @foo = 100
        @bar = 100
      end
    end

    puts FooBar.new.instance_variables # ["@foo", "@bar"]
    ```

# 13. const_set
- `const_set` được dùng để gán giá trị cho constant variable của 1 class nào đó
    ```ruby
    class Foo
      VALUE = 10
    end

    puts Foo::VALUE # 10
    Foo.const_set("VALUE", 100)
    puts Foo::VALUE # 100
    ```

# 14. const_get
- `const_get` được dùng để lấy giá trị của constant variable của 1 class nào đó
    ```ruby
    class Bar
      VALUE = 10
    end

    puts Bar.const_get("VALUE") # 10
    ```

# 15. constants
- `constants` được dùng để lấy tất cả các constants có trong class
    ```ruby
    class FooBar
      FOO = 10
      BAR = 100
    end

    puts Foo.constants # ["FOO", "BAR"]
    ```
    
- Ở bài tiếp theo, chúng ta sẽ tìm hiểu kỹ hơn meta-programming thực sự là gì và cách sử dụng những method trên trong meta-programming (seeyou)