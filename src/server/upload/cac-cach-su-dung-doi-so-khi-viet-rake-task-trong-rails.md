### Lời nói đầu
Rake task là một cách tuyệt vời để bạn có thể nâng cao hoặc tự động hóa công việc trong project của bạn.
Khi lần đầu tiên tôi học ruby, một người đã nói với tôi "Cần thời gian để học viết rake task, nó sẽ giúp ich cho bạn rất nhiều khi code project."

-----

Nhưng khi tôi bắt đầu viết vấn đề bắt đầy nảy sinh .Đó là làm sao để truyền đối số vào rake task ?????.Chúng ta sẽ cùng đi tìm hiểu nha.

-----

Đến với ví dụ đơn giản khi không có đối số trước:

```ruby
task :add do
  puts 1 + 2
end
```
Và khi đó bạn chạy:
```ruby
$ rake add

# => 3
```
Và thực tế là bạn không bao giờ chỉ viết một rake task đơn giản và chỉ làm những công việc đơn giản như vậy.

-----
Thông thường chúng ta sẽ có 4 kiểu rake task sau:
### Method #1: The Rake Way
- Rake task sử dụng đối số:
```ruby
task :add, [:num1, :num] do |t, args|
  puts args[:num1].to_i + args[:num].to_i
end
```
Và khi ta chạy:
```ruby
$ rake add[1,2]

# => 3
```
Với phương pháp này tôi đã dùng nó trong thời gian dài và cảm thấy nó thật dài dòng kể cả khi viết hay chạy nó.
### Method #2: Environment Variables
- khi bạn làm việc với rake task, bạn có thể sẽ biết đến biến môi trường, nếu bạn deploy một project rails, khi đó bạn sẽ phải chạy 1 câu đại loại câu như sau:
```ruby
$ RAILS_ENV=production bundle exec rake ...
```
Và trong phương pháp này chúng ta sẽ sử dụng biến môi trường trong khi viểt rake task:
```ruby
task :add do
  puts ENV['NUM1'].to_i + ENV['NUM2'].to_i
end
```
Và khi đó chạy sẽ như sau:
```ruby
$ rake add NUM1=1 NUM2=2
```
Có vẽ nhưng tốt hơn phương pháp đầu. Nhưng nhiều khi nó có thể thực sự không cần thiết. =))
### Method #3: Using ARGV
Khi bạn đọc đến đây bạn có thể nghĩ chắc có một cách nào đó hay hơn những gi bạn đã đọc(có thể sai :D).Và thật sự cách viết sau làm cho bạn tinh giảm rất nhiều code khi mà bạn chạy hay viết.Đó là sử dụng ARGV.
```ruby
task :add do

  ARGV.each { |a| task a.to_sym do ; end }

  puts ARGV[1].to_i + ARGV[2].to_i

end
```

### Method #4: Ruby OptionParser
Đây là phương pháp phức tạp và tẻ nhạt nhất. Nhiệm vụ trông như thế này:
```ruby
require 'optparse'

task :add do

  options = {}
  OptionParser.new do |opts|
    opts.banner = "Usage: rake add [options]"
    opts.on("-o", "--one ARG", Integer) { |num1| options[:num1] = num1 }
    opts.on("-t", "--two ARG", Integer) { |num2| options[:num2] = num2 }
  end.parse!

  puts options[:num1].to_i + options[:num2].to_i
  exit

end
```
Và khi chạy:
```ruby
$ rake add -- --one 1 --two 2
```
Điều này thực sự có ích nếu bạn có nhiều đối số khác nhau. Nó cũng thực sự sạch sẽ. Nó phù hợp hơn với các lệnh bạn đang sử dụng để chạy.
### Kết luận.
Tùy theo quan điểm cá nhân mà mỗi người khi viết rake take sẽ chọn những cách viết rake task khác nhau.
Cảm ơn các bạn.
### Tham khảo.
https://cobwwweb.com/4-ways-to-pass-arguments-to-a-rake-task