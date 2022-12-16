# Rake là gì?
Rake (viết tắt của Ruby Make) là một `task runner` phổ biến được viết bằng `Ruby`, với mục đích gom nhóm các đoạn code ruby thường xuyên được sử dụng vào một task chung để sử dụng lại nhiều lần.

Vậy task là gì? :grin: Task ở đây có thể là những tác vụ như:
* Tạo backup database
* Cleanup database
* Chạy test
* ...

Rake dùng `Rakefile` và các file có đuôi `.rake` để định nghĩa một tập các task.
# Rake trong Rails
Khi dùng Rails, ta đã quen với các câu lệnh như: `rake routes`, `rake db:migrate`, `rake db:seed`... Thực chất đó là những Rake task đã được định nghĩa sẵn trong Rails nên ta chỉ việc gọi ra dùng thôi :v 

Trong Rails, Rake được dùng để định nghĩa các task ở cấp độ quản lý chung. Để xem các task được định nghĩa sẵn và mô tả của chúng, ta chạy lệnh:
``` ruby
rake -T
```
Ta sẽ có kết quả sau đây:
![](https://images.viblo.asia/90dbcb2e-dcc4-4da0-9a31-a2f434d2e613.png)

> **Lưu ý**: Từ Rails 5.0 trở đi, bạn có thể dùng `rails` thay cho `rake` để chạy các task trong Rails. Do vậy ta có thể viết `rails db:migrate` thay vì `rake db:migrate`


-----


Ngoài những task mặc định được Rails định nghĩa, ta cũng override những task mặc định hoặc tạo các task mới để phục vụ mục đích riêng. Chúng ta cùng tìm hiểu cách dùng nhé :v 
# Cách dùng Rake
## Tạo Rake task đơn giản:
Bạn có thể tạo file `.rake` trong thư mục `lib/tasks` hoặc chạy lệnh sau để tạo task:
```ruby
rails g task [namespace] [task]
```
Ví dụ, ta tạo 1 task như sau:
![](https://images.viblo.asia/fc23a3f8-c810-4811-a182-176b841b1758.png)
Lệnh này sẽ tạo 1 file `show.rake` trong `lib/tasks`, ta thêm vào file như sau:
``` ruby
namespace :show do
  desc "TODO"
  task hello: do
      puts "Hello World"
  end
end
```

Ta chạy thử task vừa tạo: `rails show:hello`. Kết quả console sẽ in ra "Hello world" thôi :v Dễ hiểu mà :D
## Sử dụng namespace
Vì các task có thể trùng tên nhau và cũng để gom nhóm tiện cho việc quản lý nên Rake đã tạo  ra  `namespace`

Ví dụ:
``` ruby
namespace :backup do
  task :create do
    # ...
  end

  task :list do
    # ...
  end

  task :restore do
    # ...
  end
end
```
Để chạy task, ta sử dụng: 
``` ruby
rails [namespace]:[task]
```
## Dependent Tasks
Rake cho phép bạn chạy 1 danh sách task trước khi chạy task hiện tại
```ruby
task create_examples: :load_database do
  # ...
end
```
Ví dụ trên: `load_database` sẽ được chạy trước khi ta chạy `create_examples`

Bạn cũng có thể truyền vào một danh sách các Dependent Tasks dưới dạng mảng các String hoặc Symbol. 

Các tasks này sẽ được thực hiện tuần tự theo đúng thứ tự trong mảng truyền vào.
##  Dependency `:environment`
Khi tạo task cần thao tác với model để thực hiện truy vấn database,.. Bạn cần chạy task `environment` trước để load code của rails app ra trước khi chạy task:
``` ruby
namespace :user do
  task create: :environment do
    User.create name: "Hau Nguyen"
  end
end
```
## Chạy task trong task
Rake cho phép gọi task trong 1 task khác với `execute` hoặc `invoke`
```ruby
namespace :show do
  desc "Hello"
  task :hello do
    puts "Hello World"
  end

  desc "Task 1"
  task task1: :hello do
    puts "Task 1"
  end

  desc "Task 2"
  task :task2 do
    puts "Task 2"
    Rake::Task["show:task1"].execute
    # OR
    Rake::Task["show:task1"].invoke
  end
end
```
Sự khác nhau giữa `execute` và `invoke`:
* `execute`: chạy task mà KHÔNG chạy các Dependent Task của nó
* `invoke`: chạy task và các Dependent Task của nó
## Override Task mặc định
Rails cũng cho phép chúng ta định nghĩa lại 1 task mặc định, chẳng hạn như `db:migrate`. 
> **Lưu ý:**  Task mới mà chúng ta định nghĩa lại sẽ không override lại hoàn toàn mà chỉ đơn giản là thêm các dòng lệnh phía sau task gốc đó. 

Để định nghĩa lại 1 task, cần dùng cùng tên, cùng namespace:
```ruby
namespace :db do
  task migrate: :environment do
    puts "Hello, I override db:migrate task."
  end
end
```
## Truyền tham số hoặc biến ENV
### Tham số:
```ruby
namespace :calculate do
  task :add, [:num1, :num2] do |_, args|
    puts args[:num1].to_i + args[:num2].to_i
  end
end
```
Chạy thử task:
```ruby
rake calculate:add[10,20]
```
### Biến ENV:
```ruby
task :add_env do
    puts ENV['NUM1'].to_i + ENV['NUM2'].to_i
end
```
Chạy thử task:
```ruby
rake calculate:add_env NUM1=1 NUM2=20
```
## Default Rake task
Nếu không chỉ rõ task được chạy thì Rake sẽ chạy default task được định nghĩa trong Rakefile.
Bạn có thể định nghĩa 1 default task như sau:

**Rakefile**
```ruby
task :default => ["my_default_task"]
```
Sau đó, khi chạy lệnh `rake`, Rake sẽ mặc định chạy task `my_default_task`
## Làm việc với File
Rake cung cấp 1 số câu lệnh hữu ích như:

* `ruby`: để chạy 1 file ruby
* `sh`: để chạy 1 lệnh trên system commands

Rake còn tích hợp module `FileUtils` cho ta có hàng loạt method thao tác với file như `cp`, `mkdir`, `rm`, `mv`.. 


Ví dụ, copy file `exam.rb` sang file `exam_copy.rb` dùng rake task:
```ruby
  task :copy do
    FileUtils.cp "exam.rb", "exam_copy.rb"
  end
```


Bạn có thể xem thêm về module `FileUtils` tại [đây](https://ruby-doc.org/stdlib-2.5.3/libdoc/fileutils/rdoc/FileUtils.html)
# Ví dụ thực tế sử dụng Rake
Triết lý của Rake là gom nhóm và tự động hóa các task nhỏ, vì vậy ta có thể định nghĩa ra các task để giúp quá trình phát triền project trở nên nhanh gọn hơn.

Ví dụ, khi init project rails, ta cần duplicate các file chứa thông tin cần bảo mật:
```ruby
config/database.yml
config/credentials.yml.enc
config/storage.yml
```
Đổi tên chúng thành đuôi `.example` và thêm vào `.gitignore`.
Ngoài ra, ta cũng muốn xóa bỏ comment, các dòng trống, chuyển nháy đơn sang nháy kép trong một số file.

Ok, vậy mình sẽ viết task để thực hiện tự động việc đó:
```ruby
namespace :file do
  desc "Create example file"
  task :create_example do
    gitignore = File.open Rails.root.join(".gitignore"), "a"

    file_names = [
        "config/database.yml",
        "config/credentials.yml.enc",
        "config/storage.yml"]

    file_names.each do |file|
      FileUtils.cp file, file + ".example"
      gitignore << file + "\n"
    end

    gitignore.close
  end
  
  desc "Remove default comments"
  task :rm_comment do
    file_names = ["Gemfile", "config/application.rb"]

    file_names.each do |file_name|
      text = File.read file_name
      
      # Xoa comment
      new_contents = text.gsub(/^\s*#.*/, "")
      # Chuyen nhay don => nhay kep 
      new_contents.gsub!(/'/, '"')
      # Xoa dong thua
      new_contents.gsub!(/^$\n/, "")

      puts new_contents
      File.open(file_name, "w") {|file| file.puts new_contents }
    end
  end
end
```
Mỗi khi muốn tạo file `.example`, ta chỉ cần chạy `rake file:create_example` là xong :v Rất chính xác và tiết kiệm thời gian phải không :D
# Kết luận
Mình đã trình bày xong về cách sử dụng cơ bản của Rake và những ví dụ mình thấy là cần thiết dùng Rake. Mong rằng các bạn sẽ có thể sử dụng Rake task vào project của riêng mình :D
# Tài liệu tham khảo
1. https://guides.rubyonrails.org/command_line.html#custom-rake-tasks
2. https://www.rubyguides.com/2019/02/ruby-rake/
3. http://jacobswanner.com/development/2013/rake-file-tasks/