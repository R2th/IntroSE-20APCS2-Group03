![Screen Shot 2022-06-15 at 11.21.31.png](https://images.viblo.asia/2ec94991-0e3b-48c8-9823-9af46b1dc011.png)

Nếu là một ruby on rails developer, chắc rằng bạn đã từng sử dụng hoặc nghe đến gem [Annotate](https://github.com/ctran/annotate_models), 
1 gem sinh ra các dòng comment bên trên mỗi file model hoặc routes khi nội dung các columns cũng như index, foreign key của table.

## Auto chạy annotate khi migrate hoặc rollback
 
Khi ban đầu bạn cài đặt gem, mặc định khi bạn chạy câu lệnh
```
rails g annotate:install
```
Sẽ tự động sinh ra file ```lib/tasks/auto_annotate_models.rake```, trong đó chứa config của annotate và nó sẽ tự động cập nhật annotate tương ứng với model được tác động mỗi lần chạy migrate hoặc rollback.

Tuy nhiên, có những trường hợp mà annotate không tự động cập nhật comment trong models. Bạn có thể thử với 2 cách bên dưới:
1. Cách 1 (trong rails 3)
```ruby
# lib/tasks/auto_annotate_models
# Annotate models on each run of rake db:migrate
Dir["#{Gem::Specification.find_by_name("annotate").full_gem_path}/**/tasks/**/*.rake"].each {|ext| load ext} if Rails.env.development?
```

2. Cách 2 (Mình cũng hay xài)
Thêm đoạn code bên dưới vào file ```lib/tasks/auto_annotate_models.rake```:
```ruby
# Annotate models
  task :annotate do
    puts 'Annotating models...'
    system 'bundle exec annotate'
  end

  # Run annotate task after db:migrate and db:rollback tasks
  Rake::Task['db:migrate'].enhance do
    Rake::Task['annotate'].invoke
  end

  Rake::Task['db:rollback'].enhance do
    Rake::Task['annotate'].invoke
  end
```
Như vậy, Annotate sẽ tự động chạy sau mỗi lần migrate hoặc rollback. Chúc các bạn thành công <3

## Tài liệu tham khảo
https://github.com/ctran/annotate_models

https://github.com/ctran/annotate_models/wiki