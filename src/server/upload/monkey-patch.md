# 1. Monkey patch là gì
- Là 1 tính năng của ruby cho phép bạn chỉnh sửa 1 hàm có sẵn hoặc thêm mới 1 hàm vào trong class bất kỳ.

## a. Thêm mới method vào class
- Đoạn code sau sẽ raise lỗi `NoMethodError (undefined method shuffle for "aaa":String)`
    ```ruby
    "monkey patch".shuffle
    ```
- Nguyên nhân là class `String` không có method `shuffle`
- Chúng ta có thể sử dụng monkey path để thêm method `shuffle` vào class `String`
    ```ruby
    class String
      def shuffle
        self.chars.shuffle.join
      end
    end

    puts "monkey patch".shuffle
    # n ptchemkyao
    ```

## b. Chỉnh sửa method có sẵn trong class
- Tương tự chúng ta cũng có thể sử dụng monkey path để chỉnh sửa method có sẵn trong class
- Ví dụ
    ```ruby
    class String
      def length
        100
      end
    end

    puts "monkey patch".length
    # 100
    ```

# 2. Cách tổ chức code với monkey patch
- Monkey patch là 1 công cụ mạnh mẽ nhưng cũng có thể gây ra lỗi và khó khăn khi debug nếu không được sử dụng và tổ chức code tốt.
- Trong các ví dụ trên mình đã monkey path trực tiếp vào class
- Đó không phải là 1 cách tốt vì các nguyên nhân sau.

### i. Code sẽ bị override
- Khi 1 method có 2 monkey-path thì bản path thứ 2 sẽ overide bản path thứ 1 và ảnh hưởng đến các đoạn code đã chạy với bản path thứ 1.
- Ví dụ:
    ```ruby
    class String
      def length
        100
      end
    end

    puts "monkey patch".length
    # 100

    class String
      def length
        200
      end
    end

    puts "monkey patch".length
    # 200
    ```

### ii. Không handle được mình có đang sử dụng monkey path hay không
- Khi không muốn sử dụng monky-path, bạn chỉ có cách comment lại đoạn code monkey path
- Tuy nhiên làm như vậy sẽ ảnh hưởng đến các đoạn code đang chạy đúng với monkey path

### iii. Solution
- Sử dụng module chứa monkey path và include chỉ khi cần sử dụng monkey path
```ruby
module CoreExtensions
  module String
    module MonkeyPath
      def shuffle
        self.chars.shuffle.join
      end
    end
  end
end

String.include CoreExtensions::String::MonkeyPath

puts "monkey patch".shuffle
```