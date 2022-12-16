> Bài việt được dịch từ ngồn [Source](http://cobwwweb.com/4-ways-to-pass-arguments-to-a-rake-task)
 
Rake task là một phương pháp nâng cao (hoặc tự động) trong workflow với một dự án ruby. 
Bắt đầu với rake task đơn giản:

```
task :add do
  p 1 + 2
end
```
Khi bạn chạy rake này kết qủa sẽ là `=> 3`. Nhưng trong thực tế không bao giờ viết rake task kiểu này nhưng coi như là một ý tưởng để làm bài toán thực tế.
Làm sao để truyền các số vào task trên để tính toán?

> Note: Nếu làm theo các phương pháp dưới phải chắc chắn rằng bắt các giá trị error `nil` mà trong bài viết này chỉ tập trung vào cách truyền đối số thôi.

## Cách 1: Theo cách của Rake
Rake có một cách đã định nghĩa sắn để nhận các đối số. Dưới này là ví dụ cụ thể:
```
task :add, [:num1, :num] do |t, args|
  p args[:num1].to_i + args[:num].to_i
end
```
Khi chạy sẽ có kết quả như sau
```
$ rake add[1,2]
=> 3
```

Nếu bạn dùng zsh shell bạn có thể gặp lỗi `zsh: no matches found ...` vì vậy để khắc phục lỗi phải thêm back slash như sau:

```
$ rake add\[1,2\]
```

Trông rất khó nhìn mà phải thêm back slash trong command line. 
Bạn phải biết thứ tự truyền đối số vào và nhớ rằng không thêm `space sau dấu ,`.
Ví dụ:
```
$ rake db:create_admin_account["admin@example.com"]
-> zsh: no matches found: db:create_admin_account[admin@example.com]
// Fix bằng thêm dấu `\`
$ rake db:create_admin_account\["admin@example.com"\]
-> Admin account created.
```

## Cách 2: Biến môi trường
Nếu bạn đang làm việc với Rake chắc chắn bạn sẽ biết về biến môi trường. Ví dụ: Khi deploy một project rails lên production bạn sẽ phải chạy rake như sau:
```
$ RAILS_ENV=production bundle exec rake ...
```
Với trường hợp này [biến môi trường](http://en.wikipedia.org/wiki/Environment_variable) là `RAILS_ENV`.
Chúng ta có thể dùng phương pháp tương tự với Rake như sau:

```
task :add do
  p ENV['NUM1'].to_i + ENV['NUM2'].to_i
end
```

Chạy rake sẽ cho kết quả như sau:

```
rake add NUM1=1 NUM2=2

=> 3
```
Rake này đã chạy nhưng nó set biến môi trường không cần thiết. Nó lại ép bạn phải viết hoa trong command line. So với phương pháp đầu tiên thì nó cảm thấy quen vì nó giống với cú pháp của command line.

## Cách 3: Sử dụng ARGV
Khi bạn chạy rake task, tên nó được gói lại là một constant - `ARGV`. Vậy bạn có thể làm như sau:
```
task :add do
  ARGV.each { |a| task a.to_sym do ; end }
  p ARGV[1].to_i + ARGV[2].to_i
end
```

chạy rake 
```
$ rake add 1 2

 => 3
```

Quay lại dòng đầu tiên `ARGV.each { |a| task a.to_sym do ; end }` là cách viết task tự động bởi vì khi chúng ta chạy `$ rake add 1 2` rake sẽ thử chạy 

```
$ rake 1
$ rake 2
```

Bởi vì `1` và `2` không phải task vậy sẽ gây lỗi. Đến đây phương pháp này cần tạo các blank task trong bất kỳ task mà nhận đối số. Chúng ta cũng cần biết thứ tự mà phải truyền đối số như phương pháp 1.

## Cách 4: Ruby OptionParser
Đây là phương pháp phức tạp và hơi khó một chút nưng nó lại chi tiết trong command line. 
```
require 'optparse'

task :add do

  options = {}
  OptionParser.new do |opts|
    opts.banner = "Usage: rake add [options]"
    opts.on("-o", "--one ARG", Integer) { |num1| options[:num1] = num1 }
    opts.on("-t", "--two ARG", Integer) { |num2| options[:num2] = num2 }
  end.parse!

  p options[:num1].to_i + options[:num2].to_i
  exit

end
```
Khi chạy
```
$ rake add -- --one 1 --two 2
```
Cách viết này rất dễ dàng khi có các đối số khác nhưng nó mất thêm vài dòng cả rake task và command.

### Kết luận
Đây là những cách mà rake task nhận đối số với đó bạn có thể tham khảo thêm về command `rails generate` nó cũng có nhiều cái giúp chúng ta làm việc nhanh hơn.

#### References
- [4 Ways to Pass Arguments to a Rake Task](http://cobwwweb.com/4-ways-to-pass-arguments-to-a-rake-task)
- [Passing parameters to a Rake task](https://itshouldbeuseful.wordpress.com/2011/11/07/passing-parameters-to-a-rake-task/)
- [How do I pass command line arguments to a rake task?](http://stackoverflow.com/a/825832/2241124)