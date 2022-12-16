## Introduction
![](https://images.viblo.asia/650936e1-c73b-4960-8168-f93bb20587d8.gif)

**Thread** (luồng) về cơ bản là một tiến trình con (sub-process), là một đơn vị xử lý nhỏ nhất của máy tính có thể thực hiện một công việc riêng biệt.

**Multi-thread** (đa luồng) là một tiến trình thực hiện nhiều luồng đồng thời. Một ứng dụng ngoài luồng chính có thể có các luồng khác thực thi đồng thời làm ứng dụng chạy nhanh và hiệu quả hơn. 

Ruby cung cấp 1 phương pháp để tổ chức chương trình sao cho bạn có thể chạy nhiều phần xử lí cùng 1 lúc. Thông thường cách đơn giản nhất để làm 2 việc 1 lúc là sử dụng *Ruby thread*. Việc xử lí này được thực hiện bởi bộ thông dịch của Ruby là *Ruby interpreter*.

## Single thread vs. Multi-thread
Trước tiên ta sẽ tìm hiểu chi tiết xem *thread* là gì ? Thử run `ps aux` ở terminal, chúng ta sẽ thấy tất cả các tiến trình (process) đang chạy ở trong máy tính. Với mỗi tiến trình này sẽ tương ứng với một program hoặc một application. Trình duyệt mà chúng ta đang dùng để đọc bài viết này cũng đang sử dụng 1 hoặc nhiều tiến trình.
```
 ~$ ps aux
root       964  0.0  0.0   4396  1356 ?        Ss   21:12   0:00 /usr/sbin/acpid
syslog     966  0.0  0.0 266016  4612 ?        Ssl  21:12   0:00 /usr/sbin/rsyslogd -n
root       967  0.0  0.0 102844  7324 ?        Ss   21:12   0:00 /usr/sbin/cupsd -l
root       968  0.0  0.0  38616  3180 ?        Ss   21:12   0:00 /usr/sbin/cron -f
kibana     970  0.5  1.1 1260408 96200 ?       Ssl  21:12   0:09 /usr/share/kibana/bin/../src/cli -c /etc/kibana/kibana.yml
```
Nếu như tiến trình (process) là boss, thì *thread* ở đây sẽ là các employees. Mỗi một tiến trình có thể có 1 hay nhiều *thread* khi cần.

Tất cả các *thread* trong 1 process đều chia sẻ cùng 1 heap memory (vùng nhớ được tạo ra và lưu trữ trong RAM) nhưng đều chứa các execution stacks (ngăn xếp thực thi) riêng biệt. Điều đó có nghĩa là các *thread* có thể share data nhưng không call được chung function
![](https://images.viblo.asia/f8b9a95c-a27f-4d4b-95b4-d67c5d2c7ad9.png)

Lý do khiến **multithreading** rất hữu dụng chính là khi một chương trình (program) được thực thi, nó có thể ủy thác các tác vụ cho nhiều *thread* khác nhau. Điều này tương đương với việc boss sẽ thuê hàng chục hàng trăm ông dev để cùng build một sản phẩm nào đó thay vì chỉ có duy nhất một người. Cùng xét ví dụ bên dưới:
```ruby
def output(num)
 sleep 1
 puts num
end

start = Time.now

(1..10).each { |num| output(num) }

puts "#{Time.now.to_f - start.to_f} seconds to complete."
```
Và kết quả:
```ruby
1
2
3
4
5
6
7
8
9
10

10.02504587173462 seconds to complete.
```
Ở ví dụ trên, giả sử như chúng ta có một application yêu cầu lặp qua rất nhiều các task nhỏ và hoàn thành chúng. Với mỗi task cần tối thiểu 1 giây, nếu chúng ta chỉ dùng **single thread** mặc định của ruby thì sẽ cần ít nhất 10s để hoàn thành.

Tuy nhiên, nếu ở đây chúng ta gán các worker riêng biệt vào mỗi task, thì với 10 workers cùng hoạt động một lúc, tổng cộng chúng ta chỉ tốn khoảng 1s mà thôi, đó chính là **multi-threading**. Với ruby, việc tạo các *thread* khá đơn giản, chỉ cần dùng `Thread.new` để tạo ra các thread instance, sau đó truyền vào nó khối lượng công việc chúng ta muốn:
```ruby
def output(num)
 sleep 1
 puts num
end

start = Time.now

# Create all of the separate threads
threads = (1..10).map { |num| Thread.new { output(num) } }

# Call "join" on each thread instance so it merges back with main thread
threads.each(&:join)

puts "#{Time.now.to_f - start.to_f} seconds to complete."
```
và kết quả:
```ruby
5
4
8
6
10
2
1
9
3
7

1.0051839351654053 seconds to complete.
```

### Joining thread

Lưu ý là chúng ta không chỉ đơn giản là tạo *thread* sau đó nhồi công việc cho nó là xong. Khi một tiến trình trong ruby kết thúc, tất cả các thread đang chạy sẽ bị kill, bất kể trạng thái của nó như thế nào. 

Việc của chúng ta là phải đảm bảo chương trình chỉ kết thúc khi toàn bộ các thread đều đã hoàn thành công việc của mình bằng cách dùng method `join`. 
```ruby
threads.each(&:join)
```
Sử dụng method `join` cho từng *thread* để mỗi *thread* con sẽ join lại với main *thread* sau khi thực thi xong, đồng nghĩa với việc main *thread* sẽ bị block cho đến khi các thread tham số được truyền vào kết thúc.

### Race Conditions
Ở ví dụ về **multi-thread** bên trên nếu để ý chúng ta sẽ thấy các *thread* trả về ngẫu nhiên không theo một thứ tự nào, ngược lại hoàn toàn với **single thread**. Điều này chứng tỏ chúng là bất đồng bộ, mỗi *thread* được khởi tạo và hoàn thành công việc của chúng một cách độc lập và không quan tâm đến các *thread* khác xung quanh.

Điều này rất dễ dẫn đến *race conditions* - các vấn đề về tranh chấp bộ nhớ (xảy ra khi nhiều *thread* đều cố gắng truy cập tới cùng một vùng nhớ tại cùng một thời điểm), khiến một số tiến trình có thể bị mất, bị bỏ qua hoặc thậm chí dẫn đến *deadlock*.

Cùng xét ví dụ sau:
```ruby
class Dog
  def initialize
    @bark = false
  end
  
  def bark?
    @bark
  end
  
  def bark!
    puts "woof..."
    @bark = true
  end
end

def execute
  dog = Dog.new
  5.times.map do
    Thread.new do
      unless dog.bark?
        dog.bark!
      end
    end
  end.each(&:join)
end
```
Kết quả thu được:
```ruby
> execute
woof...
> execute
woof...
woof...
```
Có thể thấy với mỗi lần khởi chạy method `execute` thì tiếng woof sẽ có lúc là nhiều hơn một. Chứng tỏ rằng đã có *thread* nào nó bị xung đột memory với một hay nhiều *thread* khác trước nó. Chi tiết về *race condition* trong ví dụ trên, các bạn có thể tham khảo thêm ở [đây](http://www.rubyinside.com/does-the-gil-make-your-ruby-code-thread-safe-6051.html)

Giải pháp là chúng ta có thể sử dụng **Mutex** - nhằm đảm bảo chỉ duy nhất một thread được truy cập tới một vùng nhớ tại một thời điểm nhất định. Sử dụng *mutex* khá đơn giản, giống như *thread*, ta chỉ cần khởi tạo một instance variable của Mutex class rồi sau đó nhét đống code của *thread* vào trong `synchronize` block. 

Cụ thể với ví dụ bên trên ta có thể sửa method `execute` như sau:
```ruby
def execute
  dog = Dog.new
  mutex = Mutex.new
  
  5.times.map do
    Thread.new do
      mutex.synchronize do  
        unless dog.bark?
          dog.bark!
        end
      end
    end
  end.each(&:join)
end
```
và kết quả thu được:
```ruby
> execute
woof...
=> [#<Thread:0x00007fbc816e6550@(pry):36 dead>,
 #<Thread:0x00007fbc816e6410@(pry):36 dead>,
 #<Thread:0x00007fbc816e62f8@(pry):36 dead>,
 #<Thread:0x00007fbc816e61e0@(pry):36 dead>,
 #<Thread:0x00007fbc816e60c8@(pry):36 dead>]
```

## Summary
Bài viết nhằm chia sẻ một vài kiến thức về **multi-thread** và ứng dụng của nó trong ruby trong việc cải thiện tốc độ của hệ thống. Bài viết còn nhiều hạn chế và thiếu sót, cảm ơn các bạn đã dành thời gian theo dõi.

Nguồn và tài liệu tham khảo:

* https://dev.to/sunnyb/how-to-speed-up-your-code-with-multithreading-3l5e
* https://ruby-doc.org/core-2.5.0/Thread.html
* http://www.rubyinside.com/does-the-gil-make-your-ruby-code-thread-safe-6051.html