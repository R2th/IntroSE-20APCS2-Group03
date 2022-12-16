Bài viết tổng hợp một số kĩ thuật, khái niệm mình tìm hiểu được về Ruby, bài viết yêu cầu bạn đã có kiến thức cơ bản về Ruby như: method lookup, instance method, class method, ...
### 1. Open Class
Xem xét ví dụ sau:
```
    class A
       def say_hi
          puts "Say Hi to everybody"
       end
    end

    class A
       def say_goodbye
          puts "Say Goodbye to everybody"
       end
end
```
Trong ví dụ trên, khi lần đầu tiên viết "class A", thì chưa tồn tại "class A" nào, vì thế Ruby sẽ định nghĩa ra class này và "say_hi" method. Khi lần thứ 2, sử dụng "class A" thì "class A" đã tồn tại, do đó, Ruby không cần định nghĩa class này nữa, thay vì thế, Ruby "mở lại" "class A" và định nghĩa phương thức "say_goodbye".
Bạn có thể làm điều này với bất cứ class nào trong Ruby, tức là cả với các class có sẵn của Ruby như String, Array => cho phép bạn điều chỉnh class có sẵn tùy ý.\
Thử ví dụ sau:\
Giả sử bạn muốn thêm một hàm chuyển một số sang tiền VND.
```
    class Numeric
       def to_money
          puts self.to_s + " VND" // giả sử ở đây mình trả về chuỗi ghi ra giá tiền kèm đơn vị tiền tệ
       end
    end
```
Lúc này, nếu bạn gõ
```
   100.to_money
```
sẽ được kết quả sau:
```
   100 VND
````
Một vấn đề của kĩ thuật này đó là rất có thể, có tình huống, bạn sẽ thay đổi hành vi hiện tại của instance method. (Monkeypatch)\
Ví dụ:
```
    "hello".reverse  // sẽ in ra: "olleh"
    class String
       def reverse
          puts "override"
       end
    end
    "hello".reverse  // sẽ in ra: "override"
```
### 2. Defining Methods Dynamically
Hẳn các bạn đã từng nghe qua **define_method** nếu đọc về metaprogramming trong ruby. Đây là một kĩ thuật giúp chúng ta định nghĩa phương thức tại runtime.
Bạn chỉ cần truyền **define_method** tên phương thức và một block - block này sẽ trở thành nội dung của method.
Mình sẽ lấy một ví dụ về việc sử dụng **define_method** bằng việc viết mô phỏng cách ActiveRecord hoạt động.
```
    class ActiveRecord
      def self.has_one obj
         define_method obj do
            puts "#{self.class.to_s.downcase} has one #{obj}"
         end
      end

      def self.has_many objs
         define_method objs do
            puts "#{self.class.to_s.downcase} has many #{objs}"
         end
      end

      def self.belongs_to obj
         define_method obj do
            puts "#{self.class.to_s.downcase} belongs_to #{obj}"
         end
      end
    end

    class Moive < ActiveRecord
       has_many :actors
    end

    moive = Movie.new
    moive.actors // sẽ in ra: "movie has many actors"
```
### 3. Scope gates & Self
```
    v1 = 1
    class A            // bắt đầu scope của class, lúc này, self chính là class A
       v2 = 2
       def my_method   // bắt đầu scope của method, lúc này, self chính là instance
          v3 = 3
       end             // kết thúc scope của method
    end                // kết thúc scope của class
```

Khi một phương thức được gọi mà không xác định receiver thì thực chất là phương thức được gọi trên receiver ngầm định (self).
Xem ví dụ:
```
    class Parent
       def self.say_hi
          "Say Hi to the world"
       end
    end

    class Child < Parent
      say_hi
    end

    // sẽ in ra "Say Hi to the world"
```
Ở đoạn code trên, phương thức "say_hi" được gọi mà không xác định receiver => thực chất sẽ là "self.say_hi", lúc này, trong scope của class thì self chính là class, đó là lý do in ra dòng chữ "Say Hi to the world".
Một ví dụ khác:
```
   class A
      def say_hi
         introduce
      end
      
      def introduce
         "Hello everybody, My name is Ahi"
      end
   end
   
   a = A.new
   a.say_hi    // sẽ in ra "Hello everybody, My name is Ahi"
```
Ở đoạn code trên, phương thức introduce được gọi mà cũng không xác định receiver => self.introduce, lúc này, trong scope của method thì self là instance, => sẽ gọi phương thức "introduce" => in ra dòng chữ như trên.
### 4. Module
Trong Ruby, Module không quá khác biệt so với class, điều khác nhau duy nhất đó là chúng ta không thể tạo đối tượng từ Module (thông qua từ khóa new). Vậy, tại sao lại có module, lợi ích của nó là gì? Theo ý kiến của mình thì, module một cách bạn gom nhóm các phương thức, để sau đó có thể sử dụng ở nhiều nơi. Bạn có thể đem vào class này, class kia. Không như class, khi định nghĩa trong class thì phương thức sẽ bị gắn chặt với class đó và các class kế thừa nó.
Module trong Ruby thường được sử dụng với 2 từ khóa:
+ include: Trong trường hợp này, phương thức của module sẽ trở thành instance method của class.
```
    module M
      def say_hi
         puts "Say Hi to the world"
      end
    end

    class A
      include M
    end

    a = A.new
    a.say_hi        // sẽ in ra "Say Hi to the world"
```
Thực tế khi bạn include một Module vào một class thì biểu đồ kế thừa của class sẽ như sau
![alt](https://i.imgur.com/cW9SnQJ.png)
Đó là lý do method của module trở thành instance method của class.
+ extend: Trong trường hợp này, phương thức của module sẽ trở thành class method của class.
```
   module M2
      def sayonara
         puts "Sayonara"
      end
   end
   
   class A
      extend M2
   end
   
   A.sayonara      // sẽ in ra "Sayonara"
```
Biểu đồ class sẽ như sau:
![alt](https://i.imgur.com/TlXuGn7.png)\
Đó là lý do tại sao method của module trở thành class method của class.
Nếu bạn đã hiểu cách Ruby làm việc với từ khóa include, extend, thì giờ giả sử, chỉ sử dụng include, làm sao chúng ta có thể biến phương thức của module thành class method???\
Xem xét cách làm sau
```
    class C; end

    module M
      def say_hello
         "Say hello to the world"
      end
    end

    class << C
     include M
    end

    C.say_hello   // sẽ ỉn ra "Say hello to the world"
```
Bản chất của cách làm trên, chính là việc include module trong Singleton Class của class.
### 5. Kết luận
Trên đây là một vài khái niệm, kĩ thuật mình tìm hiểu được, giúp mình hiểu hơn về Ruby - một ngôn ngữ khá đẹp (cảm giác lúc code khá là sướng). Nếu các bạn có những hiểu biết gì khác về Ruby thì hãy chia sẻ thêm. Cảm ơn các bạn đã đọc bài.
Tài liệu tham khảo:\
[Metaprogramming Ruby - Paolo Perrotta](https://pragprog.com/book/ppmetr2/metaprogramming-ruby-2)\
https://pragmaticstudio.com/tutorials/ruby-macros