Rake task hẳn là đã khá quen thuộc với các bạn làm việc với Rails rồi. Từ các task mặc định của Rails như `rails db:migrate`  cho đến các task tự viết như

```ruby
namespace :hello do
  task create: :environment do
    puts "Hello"
  end
end

rake hello:create
```

Hẳn là các bạn cũng từng gặp trường hợp là làm sao để truyền params vào một rake task và gọi nó như thế nào?

Hôm nay mình xin giới thiệu một số cách để truyền params vào rake task và gọi nó.

### Cách 1: Rake built-in way

Chắc chắn rồi, rake có một cách dựng sẵn cho phép bạn truyền parameters

```ruby
namespace :name do
  task :take, [:first_name, :last_name] do |t, args|
    puts "Fullname: #{args[:first_name]} #{args[:last_name]}"
  end
end

rake name:take\["LQ","Canh"\]
=> Fullname: LQ Canh
```

Với cách làm này, bạn phải thêm dấu `\` sau cặp dấu `[]`, đặt parasm theo đúng thứ tự, và giữa các params chỉ có dấu `,` không có space. Còn không nếu bạn sử dụng zsh shell, bạn sẽ nhận được lỗi (mình không chắc với bash shell :D)

```
zsh: no matches found: name:take[LQ,Canh]
```

### Cách 2: Sử dụng biến môi trường

Cách này khá là đơn giản, bạn chỉ cần khai báo mọi thứ trong file quản lý biến môi trường, sau đó lấy ra và chạy

```ruby
namespace :name do
  task :take do
    puts "Fullname: #{ENV["FIRST_NAME"]} #{ENV["LAST_NAME"]}"
  end
end

rake name:take
=> Fullname: LQ Canh
```

hoặc nếu không muốn lưu biến môi trường, bạn cũng có thể gọi

```
rake name:take FIRST_NAME="LQ" LAST_NAME="Canh"
=> Fullname: LQ Canh
```

Với cách này thì hoặc là bạn phải set biến môi trường (không cần thiết), hoặc là bạn phải truyền vào đầy đủ key, value. Tuy nhiên, cảm giác nó vẫn tự nhiên hơn cách 1

### Cách 3: Sử dụng ARGV

Khi bạn chạy một rake task, cái task name nó luôn được đính kèm trong một hằng số `ARGV`. Vì vậy có thể tận dụng nó

```ruby
namespace :name do
  task :take do
    ARGV.each { |argv| task argv.to_sym do ; end }
    puts "Fullname: #{ARGV[1]} #{ARGV[2]}"
  end
end

rake name:take "LQ" "Canh"
=> Fullname: LQ Canh
```

Dòng đầu tiên `ARGV.each { |argv| task argv.to_sym do ; end }` là một cách generate task khi đang thực thi.

Khi bạn run

```ruby
rake name:take "LQ" "Canh"
```

Thì đồng thời rake sẽ run

```ruby
rake "LQ"
rake "Canh"
```

và bởi vì `LQ` và `Canh` chúng ta không định nghĩa task này nên nó được xem như là task rỗng và không thực thi việc gì.

Nhược điểm của cách làm này là rake se tạo ra những task rỗng khi thực thi. Và ngoài ra, nếu params bạn truyền vào trùng tên với một cái task mà bạn đã định nghĩa trước đó thì kết quả sẽ không như mong muốn


Ở bài viết này, mình đã giới thiệu với các bạn 3 cách để truyền params vào rake task, cùng với đó các bạn cũng có thể nhận ra ưu, nhược điểm của từng cách. Hi vọng sẽ giúp ích cho các bạn. Cảm ơn các bạn đã theo dõi.

Bài viết tham khảo từ: https://cobwwweb.com/4-ways-to-pass-arguments-to-a-rake-task