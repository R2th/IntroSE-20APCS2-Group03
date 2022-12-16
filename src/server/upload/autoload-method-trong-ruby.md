Trong bài viết này, chúng ta sẽ khám phá các chủ đề sau:
* ***autoload*** registration & lazy loading
* method ***Module#autoload?*** method
* Đằng sau ***Module#autoload*** method 

### I. *autoload* **registration & lazy loading**

Phương thức ***Module#autoload*** đăng ký một đường dẫn file được tải lần đầu tiên khi namespace của một mô-đun hoặc class **cụ thể** gọi đến.

**Ví dụ:**
```car.rb
module Car
  autoload(:Engine, './engine.rb')

  puts "The Engine module isn't yet loaded!"
  Engine
  puts "The Engine module has been successfully loaded!"
end
```
```engine.rb
module Engine
  puts 'The Engine module is loading!'
end
```


Bây giờ hãy chạy tập lệnh Ruby script:
```
$> ruby car.rb
The Engine module isn’t yet loaded!
The Engine module is loading!
The Engine module has been successfully loaded!
```

Ở đây chúng ta thấy rằng sau một lệnh gọi để tự động tải **autoload(:Engine, './engine.rb ')**, **engine.rb** chưa được tải.

Trong thực tế, tệp này chỉ được tải khi chúng ta gọi rõ ràng mô-đun **Engine**.

Cơ chế này cho phép Ruby ko sử dụng bừa bãi, mà chỉ tải các tệp có chứa các mô-đun / lớp được sử dụng bởi luồng thực thi của chương trình đang chạy.

### II. Phương thức ***Module#autoload?***

***Module#autoload?*** có trách nhiệm kiểm tra xem mô-đun/lớp được đăng ký trong một namespace **đã được tải hay chưa**.

Nó cũng được sử dụng để kiểm tra xem một mô-đun **có được đăng ký (hoặc không)** trong một namespace hay không?

```a.rb
module A
  autoload(:B, './b.rb')

  p autoload?(:B)
  B
  p autoload?(:B)
end
```

```b.rb
module B
  puts 'The module B is loading!'
end
```

chạy ra kết quả như sau:
```
"./b.rb"
The module B is loading!
nil
```

Lần gọi đầu tiên ***autoload? :B***  trả về đường dẫn **"./b.rb"**.

Sau đó, mô-đun **B** được tải thông qua việc tải tệp **b.rb**.

Cuối cùng, lần gọi thứ hai ***autoload?(:B)*** trả về nil vì mô-đun **B** đã được load rồi.

Vì vậy, hãy autoload thử một mô-đun C bên ngoài namespace A

```a.rb
autoload(:C, './c.rb')

module A
  p autoload? :C
end

p autoload? :C
```

```c.rb
module C
end
```

chạy ra kết quả như sau:
```
nil
"./c.rb"
```

Lệnh gọi tới ***autoload? :C*** trong namespace **A** trả về **nil** vì mô-đun **:C** được đăng ký autoload trong namespace cấp cao nhất chứ không phải trong namespace A.

Ngược lại, lệnh gọi thứ hai để ***autoload? :C*** được gọi trong namespace cấp cao nhất. Nó nằm trong cùng với namespace đăng ký ***autoload(: C, './c.rb')*** nên nó trả về đường dẫn ***"./c .rb "***.

Bây giờ chúng ta đã quen thuộc hơn với cơ chế đăng ký **autoload**, hãy cùng khám phá những gì xảy ra đằng sau khi chúng ta đăng ký và gọi một mô-đun.

### III. Đằng sau phương thức ***Module#autoload***

Khi phương thức ***Module#autoload*** được gọi trong một namespace thì module/class và đường dẫn file được đưa ra làm đối số của phương thức được lưu trữ trong bảng hash bên trong.

Hãy theo dõi ví dụ này:
```a.rb
module A
  autoload(:B, './b.rb')
  
  p constants
end
```

```b.rb
module B
end
```

chạy ra kết quả như sau:
```
[:B]
```

Ở đây, chúng ta có thể thấy rằng hằng số B tồn tại ngay cả khi nó chưa được tải.

Trong thực tế, một lệnh gọi tới ***autoload*** sẽ tự động tạo một hằng số có tên là đối số đầu tiên của method và được gắn cờ là ***autoload*** đã đăng ký. Giá trị của hằng số này sẽ không được xác định và KHÔNG mang value rỗng.

Khi mô-đun ***B*** được gọi thì Ruby sẽ tìm kiếm mục B trong bảng hằng số hash của namespace A.

Sau đó, nó sẽ tải tệp bằng method ***Kernel#require***

Cuối cùng, bảng hằng số hash sẽ ngắt kết nối khi ***autoload*** mô-đun B.

Bài viết được dịch từ: https://medium.com/rubycademy/the-autoload-method-in-ruby-11fd079562ef