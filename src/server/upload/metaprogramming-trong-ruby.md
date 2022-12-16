### **I. Metaprogramming là gì?**

-  “Metaprogramming is a programming technique in which computer programs have the ability to treat programs as their data” (`https://en.wikipedia.org/wiki/Metaprogramming`)
-  Định nghĩa một cách đơn giản, `Metaprogramming` là một kỹ thuật giúp code của chúng ta "động" hơn, ngắn gọn hơn, mở hơn, tránh bị lặp lại những thứ giống nhau.

### **II. Metaprogramming basic**

Có 3 hàm cơ bản trong Ruby áp dụng cho việc triển khai metaprograming đơn giản nhất.

1. Hàm send():
-  `#send( )` là một instance method của Object class
-  Hàm `send()` dùng để gọi các hàm một cách "động"
-  Hàm `send()` tránh lặp lại các hàm có nội dung tương tự nhau
-  Ví dụ cách sử dụng hàm `send()`: 
    -  Để tránh lặp lại các hàm `authenticated?` như định dạng

```
def password_authenticated?(token)
    digest = self.password_digest
    return false if digest.nil?
    BCrypt::Password.new(digest).is_password?(token)
  end
  
  def reset_authenticated?(token)
    digest = self.reset_digest
    return false if digest.nil?
    BCrypt::Password.new(digest).is_password?(token)
  end
  
  def activation_authenticated?(token)
    digest = self.activation_digest
    return false if digest.nil?
    BCrypt::Password.new(digest).is_password?(token)
  end
  
  def remember_authenticated?(token)
    digest = self.remember_digest
    return false if digest.nil?
    BCrypt::Password.new(digest).is_password?(token)
  end
```

- Chúng ta sẽ dùng một hàm `authenticated?` chung cho cả 4 chức năng với tên chức năng được truyền vào từ tham số

```
# Returns true if the given token matches the digest.
  def authenticated?(attribute, token)
    digest = send("#{attribute}_digest")
    return false if digest.nil?
    BCrypt::Password.new(digest).is_password?(token)
  end
```

-  Như vậy, chúng ta có thể rút gọn và tổng quát hóa được các hàm có cùng chức năng.
-  Hàm `send()` cũng dùng để gọi một private method của class:

```
class Klass
  private
  def hello(*args)
    "Hello " + args.join(' ')
  end
end
k = Klass.new
k.hello  "gentle", "readers" #=> NoMethodError: undefined method `hello' for #<Klass:0x0000000004822888>
k.send :hello, "gentle", "readers"   #=> "Hello gentle readers"
```

2. Module#define_method():
- `Module#define_method( )` là một private instance method của class Module
- `define_method()` là cách để tạo ra method một cách "động"
- Thay vì tạo ra một hàm "động" như dùng hàm `send()` thì `define_method()` dùng để tạo ra các hàm một cách "động"
- Cách dùng `define_method()` như sau:

```
%w(password reset activation remember).each do |attribute|
    define_method("#{attribute}_authenticated?") do |token|
        digest = self.send "#{attribute}_digest"
        return false if digest.nil?
        BCrypt::Password.new(digest).is_password?(token)
    end
end
```

-  Bằng cách này, ta đã tạo được 4 hàm với chức năng tương tự như sau:

```
def password_authenticated?(token)
    digest = self.password_digest
    return false if digest.nil?
    BCrypt::Password.new(digest).is_password?(token)
  end
  
  def reset_authenticated?(token)
    digest = self.reset_digest
    return false if digest.nil?
    BCrypt::Password.new(digest).is_password?(token)
  end
  
  def activation_authenticated?(token)
    digest = self.activation_digest
    return false if digest.nil?
    BCrypt::Password.new(digest).is_password?(token)
  end
  
  def remember_authenticated?(token)
    digest = self.remember_digest
    return false if digest.nil?
    BCrypt::Password.new(digest).is_password?(token)
  end
```

- Như vậy, sử dụng `define_method()` cũng là một cách để thu gọn và tổng quát hóa các hàm tương tự nhau.

3. Kernel#method_missing():
- `Kernel#method_missing( )` được trả về khi xảy ra lỗi NoMethodError
- `method_mising()` cũng là một private method, là một cách để không raise errors khi method không được khai báo
- Cách dùng `method_missing()` rất đơn giản:

```
class Roman
  def roman_to_int(str)
    # ...
  end
  def method_missing(methId)
    str = methId.id2name
    roman_to_int(str)
  end
end

r = Roman.new
r.iv      #=> 4
r.xxiii   #=> 23
r.mm      #=> 2000
```

### **V. Kết luận**

Trên đây là các method cơ bản của metaprogramming trong Ruby. Trong bài viết tiếp theo, chúng ta sẽ tìm hiểu về các method nâng cao của metaprogramming trong Ruby (#eval, #instance_variable_get, #instance_variable_set). Hi vọng bài viết có thể giúp các bạn có được cách nhìn tổng quan về metaprogramming và cách dùng các hàm cơ bản trong Ruby.

## **Cảm ơn đã theo dõi**