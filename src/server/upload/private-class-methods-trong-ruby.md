# Vấn đề.
Một tip nhỏ để tạo nhanh class method như private method.Bây giờ chúng ta sẽ định nghĩa nhanh private instance method trong ruby.

-----
```ruby
class Dog
    def poop
     "Going outside, and will poop"
    end
    
    private
    def bark
     puts "woof woof"
    end
end
```
-----
Như ta thấy ở trên, method poop là một public method và bark là private method. Nếu như chúng ta gọi public method nó sẽ như sau:

-----
```ruby
dog = Dog.new
dog.new
# => "Going outside, and will poop"
```
Nhưng chúng ta gọi private method nó sẽ như sau:
```
dog = Dog.new
dog.bark
# NoMethodError: private method `bark' called for #<Dog>
```
-----
# Giải quyết.
Ok. Bậy giờ chúng ta sẽ định nghĩa class method nó không phải instance method.Và cho nó là private.

-----
```ruby
class Dog
  private
  def self.things_can_be_done
    [:bark, :poop, :sleep, :eat]
  end
end

> Dog.things_can_be_done
  # => [:bark, :poop, :sleep, :eat]
```
-----
Có vẻ hoạt động vẩn ổn :). Và điều khác lạ ở đây là chúng ta có thể call một method private. 

Điều này là do cách mà Ruby định nghĩa class method.
'self' có thể hiểu là Dog và các private khi đi với self thì nó không bao giờ được xem xét.
# Tips
Thật thú vị đúng không a.Sau đây sẽ là một số  cách mà bạn 
có thể định nghĩa một class method như private.

-----


1. private_class_method
    - Bằng cách sử dụng `private_class_method` trong ruby.
  ```ruby
    class Dog
      def self.things_can_be_done
        [:bark, :poop, :sleep, :eat]
      end

      private_class_method :things_can_be_done
    end

    > Dog.things_can_be_done
    # => NoMethodError: private method `things_can_be_done' called for Dog:Class
  ```
2. Using self as block
    - Bằng cách này chúng ta sẽ đưa private trong trong self thì khi đó cope sẽ được gói ở trong self.
   ```ruby
    class Dog
      class << self
        private

        def things_can_be_done
          [:bark, :poop, :sleep, :eat]
        end
      end
    end
    > Dog.things_can_be_done
    # => NoMethodError: private method `things_can_be_done' called for Dog:Class
   ```
# Tham khảo.
http://codebeerstartups.com/2016/07/private-class-methods-in-ruby/