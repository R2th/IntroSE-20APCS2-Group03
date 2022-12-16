#  1.Tìm hiểu về getter và setter. <br/>
- Chúng ta sẽ thực hành trên 1 class để có thể hiểu rõ hơn về Getter và Setter:
```
    class Person
    end
    person = Person.new
    person.read #=> Không có method lỗi.
```
- Bây giờ chúng ta sẽ định nghĩa cho method read:
```
class Person
    def read
      @name # chỉ cần trả về 1 instance variable @name
    end
end
    person = Person.new
    person.read # => nil
    person.write = "Anh" # => Không có method lỗi.
```
- Từ ví dụ trên ta nhận ra rằng: <br/>
    + Khi khai báo xong method read, chúng ta có thể đọc được giá trị @name trong Class Person.<br/>
    + Nhưng không thể gán giá trị vào cho @name vì chúng ta chưa có 1 method để thực hiện điều đó.<br/>
 - Chúng ta hãy thử định nghĩa để sử dụng được nó nhé:
 ```
    class Person
        def read
            @name
        end
        def write=(str)
            @name = str
        end
    end
    person = Person.new
    person.write = "Anh"
    person.write # => "Anh"
 ```
 - Thật là hay. Bây giờ chúng ta có thể viết hay đọc được biến @name bằng cách sử dụng 2 method là read và write.<br/>
 - Nhưng câu hỏi là: Tại sao chúng ta phải luôn mất thời gian để tạo 2 phương thức này mỗi khi phải sử dụng để lấy dữ liệu hoặc ghi dữ liệu.<br/>
 - Do đó ruby hỗ trợ 1 cách dễ dàng hơn để chúng ta thực hiện nó 1 cách nhanh chóng đó là attr_reader, attr_writer, attr_accessor.<br/>
     + attr_reader: Giúp ta tạo ra 1 method read giống như chúng ta định nghĩa ở phía trên.<br/>
     + attr_writer: Tương tự tạo cho chúng ta method write.<br/>
     + attr_accessor: Tạo ra đồng thời 2 method là read và read. Sử dụng khi bạn muốn cả lấy và ghi dữ liệu.<br/>
 - Giờ chúng ta sẽ tiến hành thử sử dụng nó nhé :).
 ```
    class Person
        attr_reader :name # tạo method read(getter)
        attr_writer :name # tạo method write(setter) 
    end
    
    class Person
        attr_accessor :name # tạo 2 method getter và setter
    end
    person = Person.new
    person.name = "Anh"
    person.name # => "Anh"
 ```
#  2. Thực hành ví dụ
 - Tiến hành 1 ví dụ khác để hiểu hơn về nó nhé :D.
 ```
   class Person
        attr_accessor :name # Tạo 2 method getter và setter
        def welcome
            "Hello #{@name}"
        end
    end
    person = Person.new
    person.name = "Anh"
    person.welcome # => "Hello Anh"
 ```
 - Giờ chúng ta có thể sử dụng nó 1 cách ok phải không nào :D.<br/>
 - Đây là chia sẻ của mình về getter và setter trong ruby.<br/>
 - Bạn có thể tham khảo thêm các nguồn khác và góp ý cho mình thêm nếu có sai sót nhé :D.<br/>
 - Cám ơn các bạn đã dành thời gian đọc bài chia sẻ của mình nhé.!!!