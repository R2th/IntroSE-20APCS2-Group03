Nếu làm việc với Rails hẳn bạn đã quá quen thuộc với các lệnh `rake db:seed`, `rake db:migrate`, .... Vậy rake ở đây là gì? và nó đóng vai trò gì trong Rails app?
### Khái niệm
Rake task là một câu lệnh dùng để quản lí và chạy tự động các ruby code thường xuyên được thực hiện trong một task và sử dụng nhiều lần mà được viết trong các file **rake**.
### Khai báo rake task
Có 2 cách để tạo 1 file rake trong Rails<br>
Cách 1. Dùng câu lệnh trên terminal:
```ruby
     rails g task [namespace] [task](optional)
```
Câu lệnh trên sẽ tạo một file .rake mới trong thư mục lib/tasks có tên trùng với tên task được viết trong lệnh. <br>
Ví dụ 1:
```ruby
    rails g task update_user_data
    #=> create lib/tasks/update_user_data.rake
```
Trong file update_user_data.rake trên sẽ có dạng:
```ruby
    namespace :update_user_data do
        # logic write here
    end
```
Ví dụ 2:
```ruby
    rails g task company import_data_from_csv
    #=> create lib/tasks/company.rake
```
Trong file company.rake sẽ có dạng:
```ruby
    namespace :company do
      desc "TODO"
      task import_data_from_csv: :environment do
          # logic write here
      end
    end
```
=> Khi muốn chạy task được khai báo ta dùng câu lênh:
```ruby
    rake/rails namespace:task
```
Nếu không muốn chỉ cần gọi tên task ra ta khai báo trong file .rake như sau:
```ruby
    task :update_data do
        # logic here
    end
    #=> rake update_data
```
Cách 2. Tạo thủ công trong thư mục lib/tasks
### Một số câu lệnh mặc định thường dùng 
```ruby
    rake -T               # hiển thị toàn bộ rake task  
    rake test             # chạy toàn bộ test(được thay thế bằng "rake rspec" nếu dùng rspec )
    rake routes           # hiển thị toàn bộ các route
    rake db:create        # tạo mới database
    rake db:drop          # xóa database
    rake db:migrate       # chạy toàn bộ các file migration
    rake db:seed          # Load dữ liệu mẫu trong file db/seed.rb
    rake db:rollback      # Đưa schema về  phiên bản trước
    ...
```
### Custom rake task
#### 1. Truyền tham số vào rake tasks
```ruby
    task :hello, [:name] => :environment do |name, args|
      puts "Hello #{args.name}"
    end
```
Khi gọi lệnh rake:
```ruby
    rake hello[world]
    #=> Hello world
```
#### 2. Chạy task khác bên trong một task 
```ruby
    task :greeting do
      puts "hello"
      Rake::Task["add_user_name"].invoke
    end
    
    task :add_user_name do
      puts "John"
    end
```
Khi ta gọi task `greeting` thì sẽ chạy cả task `add_user_name`:
```ruby
    rake greeting
    #=> hello
    #=> John
```
Lưu ý method `invoke` chỉ execute những task nào chưa từng được invoke trước đó:
```ruby
task :greeting do
  puts "hello"
  Rake::Task["add_user_name"].invoke
  Rake::Task["add_other_name"].invoke
end

task :add_user_name do
  puts "John"
  Rake::Task["add_other_name"].invoke
end

task :add_other_name do
  puts "Cena"
end

=> rake greeting
#=> hello
#=> John
#=> Cena
```
Nếu muốn chạy lại lệnh đã được invoke rồi cần phải dùng thêm method `reenable`:
```ruby
 task :greeting do
  puts "hello"
  Rake::Task["add_user_name"].invoke
  Rake::Task["add_other_name"].reenable
  Rake::Task["add_other_name"].invoke
end

task :add_user_name do
  puts "John"
  Rake::Task["add_other_name"].invoke
end

task :add_other_name do
  puts "Cena"
end

=> rake greeting
#=> hello
#=> John
#=> Cena
#=> Cena
```
#### 3. Overriding task
Có 2 kiểu overriding rake task.<br>
Kiểu 1: Chèn thêm các dòng code mới ngay sau những dòng code cũ 
```ruby
    namespace :db do
      task reset: :environment do
        puts "custom code here"
      end
    end
    
    => rake db:reset
    #=> Dropped database 'cleanify_development'
    #=> Dropped database 'cleanify_test'
    #=> Created database 'cleanify_development'
    #=> Created database 'cleanify_test'
    #=> custom code here

```
Kiểu 2: Xóa hoàn toàn những câu lệnh cũ và thêm những câu lệnh mới
```ruby
    Rake::Task["db:reset"].clear
    namespace :db do
      task reset: :environment do
        puts "custom code here"
      end
    end
    
    => rake db:reset
    #=> custom code here
```
### Tổng kết
Trên đây là những gì tôi học được khi tìm hiểu về rake task trong rails mà mình tôi muốn chia sẻ với mọi người. Bài viết còn nhiều thiếu sót, mong mọi người góp ý để bài viết có thể hoàn thiện hơn.<br>
*Good luck and happy coding!*
### Link tham khảo
https://dev.to/vinistock/customizing-rails-rake-tasks-3bg5<br>
https://railsguides.net/how-to-generate-rake-task/