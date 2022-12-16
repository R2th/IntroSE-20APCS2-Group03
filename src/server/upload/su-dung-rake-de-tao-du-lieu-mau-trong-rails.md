### Giới thiệu
Trong quá trình tạo project, việc tạo dữ liệu mẫu để kiểm thử sau khi code tính năng nào đó, đặc biệt là các trang index quản lý dữ liệu. Nếu ta tạo dữ liệu bằng tay rất lãng phí thời gian, vì vậy ta cần tạo dữ liệu một cách tự động. <br>
Rails hỗ trợ lệnh rails db:seed để tạo dữ liệu từ file seed.rb, tuy nhiên khi ta muốn rake lại một số câu lệnh trong file thì lại phải seed lại toàn bộ các câu lệnh viết trong file seed.rb. <br>
Để giải quyết vấn đề đó, ta có thể viết các file rake để tạo dữ liệu riêng lẻ cho từng model và tùy theo mục đích sử dụng của chúng ta và khi cần seed lại dữ liệu cho một model nào đó ta có thể dễ dàng thực hiện. Bài viết này mình sẽ hướng dẫn cách sử dụng rake để tạo dữ liệu mẫu.
### Định nghĩa file rake
Tạo rake file bằng cách tạo file mới `.rake` trong thư mục` lib/task/`, hoặc dùng lệnh sau trong project:
```ruby
rails g task [namespace] [name_task]
```
Định nghĩa `dependency :enviroment`  <br>
```ruby
namespace :name_task do
  desc "This is for description"
  task data: :environment do
    #do_something
  end
end
```
### Sử dụng gem "bulk_insert"
Đây là phần mở rộng nhỏ của ActiveRecord hỗ trợ insert nhiều bản ghi trong một câu lệnh insert. <br>
Để sử dụng, ta định nghĩa trong file rake <br>
Ví dụ tạo nhiều users
```ruby
namespace :create_supervisor do
  task supervisor_data: :environment do
    puts "Create Users"
    User.bulk_insert do |user|
      ...
    end
  end
end
```
### Câu lệnh chạy file rake để tạo dữ liệu
Bạn có thể kểm tra danh sách các rake tasks đã được định nghĩa trong hệ thống
```
rake -T
```
Ta chạy file .rake để tạo dữ liệu
```
rake name_task:data
```
### Cách chạy nhiều file rake bằng lệnh rails db:seed
Để chạy nhiều file rake khi gọi câu lệnh `rails db:seed `. Ta cấu hình file `seed.rb` như sau: <br>
Thêm dòng sau để migrate lại db trước khi tạo dữ liệu <br>
```ruby
Rake::Task["db:migrate:reset"].invoke
```
Định nghĩa lời gọi các task cần tạo dữ liệu
```ruby
Rake::Task["name:environment"].invoke
```

### Tham khảo
https://github.com/jamis/bulk_insert