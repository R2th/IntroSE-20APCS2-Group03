# Generator là gì
Hôm nay mình sẽ giới thiệu với mọi người về cách tạo mới và customize 1 generator. 
Chắc chắn chúng ta khi code Rails đều quá quen với một số lệnh generate như:
```
rails generate model ..
rails generate controller
rails generate scaffold 
```
Generator là bộ công cụ giúp chúng ta thêm mới hoặc chỉnh sửa nội dung của file để thực hiện một chức năng và mục đích nào đó.
# Hello generator
Từ rails 3.0 chúng ta có thể tạo riêng cho mình 1 generator, dưới dây là 1 ví dụ đơn giản tạo 1 file `config/initializers/initializer.rb` bằng câu lệnh generate.
Tạo 1 file `lib/generators/initializer_generator.rb` có nội dung như sau:
```
class InitializerGenerator < Rails::Generators::Base
  def create_initializer_file
    create_file "config/initializers/initializer.rb", "# Add initialization content here"
  end
end
```
sau đó chúng ta chạy lệnh sau:
```
rails generate initializer --help
```
Thông tin của generator của chúng ta sẽ được hiển thị lên.

Tiếp theo chạy lệnh sau để thực thi:
```
rails generate initializer
      create  config/initializers/initializer.rb
```

Như chúng ta thấy `class InitializerGenerato`r kế thừa từ `Rails::Generators::Base` và có 1 method `create_initializer_file` được định nghĩa. Khi chúng ta thự thi generate, mỗi public method trong generator sẽ được thực thi tuần tự.
# Tạo mới generator
Như ví dụ bên trên là chúng ta có thể tạo một generator bằng tay.

Ngoài ra chúng ta có một cách khác đó là sử dụng generator để tạo generator:
```
$ rails generate generator initializer
```
thằng Rails sẽ tự động ra các file:
```
$ rails generate generator initializer
      create  lib/generators/initializer
      create  lib/generators/initializer/initializer_generator.rb
      create  lib/generators/initializer/USAGE
      create  lib/generators/initializer/templates
      invoke  test_unit
      create    test/lib/generators/initializer_generator_test.rb
```

Một generator vừa tạo ra sẽ có nội dung như sau:
```
class InitializerGenerator < Rails::Generators::NamedBase
  source_root File.expand_path('templates', __dir__)
end
```

Chúng ta có một bộ các method giúp chúng ta xử lý thao tác với generator được cung cấp bới `Thor::Actions` như `create_file`, `copy_file`, ... Chi tiết tại [đây](http://rdoc.info/github/erikhuda/thor/master/Thor/Actions.html)

Khác biệt ở đây đó chính là class cha là `Rails::Generators::NamedBase` chứ không phải `Rails::Generators::Base`. Điều đó có nghĩa là generator của chúng ta sẽ có ít nhất một đối số được truyền vào.
Chạy lại lệnh --help để hiểu thêm
```

$ bin/rails generate initializer --help
Usage:
  rails generate initializer NAME [options]
```
Ta thêm 1 method vào generator như sau:
```
class InitializerGenerator < Rails::Generators::NamedBase
  source_root File.expand_path('templates', __dir__)
 
  def copy_initializer_file
    copy_file "config/initializers/initializer.rb", "config/initializers/#{file_name}.rb"
  end
end
```

sau đó thực thi generator:
```
$ rails generate initializer core_extensions

```
File `config/initializers/core_extensions.rb` sẽ được tạo ra giống hệt so với file `config/initializers/initializer.rb`


Phần này mình kết thúc tại đây nhé. Phần sau sẽ hướng dẫn cho mọi người cách customized 1 generator

Tham khảo: https://guides.rubyonrails.org/generators.html