# Khái quát về threading trong Ruby
Làm việc đa nhiệm không phải là một chuyện dễ dàng nhưng lại thường là một phần thiết yếu trong cuộc sống của mỗi chúng ta. Khi bận, chúng ta thường sẽ phải tìm cách hoàn thành nhiều việc trong cùng một khoảng thời gian. Tuy nhiên, làm việc đa nhiệm quá nhiều cũng dễ dàng khiến chúng ta mất tập trung và gây ra những sai lầm.
![](https://images.viblo.asia/1de709d1-8278-45b1-9ec1-8bf65baa7515.gif)

Điều trên cũng đúng đối với các chương trình. Tuy việc tính toán thường sẽ diễn ra rất nhanh đến nỗi chúng ta quên mất rằng chương trình sẽ cần thời gian để xử lý một việc gì đó. Nhưng bản chất thì máy tính vẫn là máy tính, không phải là phép thuật - nếu bạn yêu cầu chúng là quá nhiều việc một lúc thì chúng sẽ làm các việc đó chậm lại. Ví dụ như xử lý một lượng lớn data hay là một chuỗi request liên tục tới một server bên ngoài... sẽ khiến cho chương trình của bạn bị ngưng trệ.
<br>

Phân luồng (threading) là một giải pháp cho vấn đề này. Class **Thread** của Ruby tạo ra một process riêng biệt chạy song song với process chính. Thay vì chạy từng tác vụ theo trình tự, threading cho phép chương trình thực hiện nhiều việc cùng một lúc!
<br>

Hãy thử xem ví dụ sau, chúng ta sẽ so sánh:
```ruby
def slow_method
  time = Benchmark.measure do
    10.times do
      slow_task #sleeps for one second and then prints "."
    end
  end
  puts time
end
```
với:
```ruby
def fast_method
  time = Benchmark.measure do
    threads = []
    10.times do
      threads << Thread.new { slow_task }
    end
    threads.each { |t| t.join }
  end
  puts time
end
```
slow_task:
```ruby
def slow_task
  sleep(1)
  puts "."
end
```

Về cơ bản, hai method trên đều làm cùng một việc tương tự nhau, chạy **#slow_task** 10 lần và trả về tổng thời gian chạy. Tuy nhiên, method thứ hai thay vị chạy tuần tự từng lần thì sẽ chạy cả 10 task trong các luồng khác nhau. Kết quả chúng ta có được là gì?
```ruby
2.3.1 :024 > require 'benchmark'
 => true 
2.3.1 :025 > slow_method
.
.
.
.
.
.
.
.
.
.
  0.000000   0.000000   0.000000 ( 10.001765)
 => nil 
2.3.1 :026 > fast_method
...


.
..

...


.
  0.000000   0.010000   0.010000 (  1.003020)
 => nil 
```
Method được phân luồng sẽ hoàn thành nhanh gấp 10 lần method thông thường! Awesome!

---
# join thread
Tạo ra một luồng cũng đơn giản như khởi tạo một block. Tuy nhiên các bạn hãy chú ý ở ví dụ trên mình có sử dụng **#join**, vậy method này có tác dụng gì? Vì các thread sẽ chạy song song với luồng chính nên rất có khả năng luông chính sẽ kết thúc rất sớm, khi luồng chính kết thúc thì tất cả các luồng phụ của nó cũng sẽ bị kết thúc theo dù đã hoàn thành hay chưa. Ví dụ ta có method sau:
```ruby
def without_join
  t = Thread.new { puts "Please Help Me!" }
  t2 = Thread.new { puts "This Method's Thread Is About To End!" }
  t3 = Thread.new { puts "No! I want to live!" }
end
```

Phương thức trên thực hiện ba việc, khởi tạo ba luồng và sau đó kết thúc. Hai luồng đầu tiên có thể có cơ hội đứa ra output của chúng, nhưng vì các luồng cần một lượng thời gian xử lý để thiết lập nên không có tác vụ nào trong số này có thể được đảm bảo thực hiện xong trước khi luồng chính kết thúc.
<br>

**#join** giải quyết vấn đề này. Nó tạm dừng luồng cha cho đến khi các luồng con của nó hoàn thành.
```ruby
def with_join
  t = Thread.new { puts "Please Help Me!" }
  t2 = Thread.new { puts "This Method's Thread Is About To End!"; sleep 1 }
  t3 = Thread.new { puts "No! I want to live!"; sleep 60 }
  t.join
  t2.join
  t3.join(5)
  puts "Threading Complete"
end
```

Bây giờ các thread đã được nối lại, chúng được đảm bảo sẽ kết thúc trước khi luồng chính kết thúc. Tuy nhiên hãy lưu ý rằng chúng sẽ có thể sẽ hoàn thành theo thứ tự không thể đoán trước (“Please Help Me!” có thể được puts sau “This Method's Thread Is About To End!”)
<br>

Method trên sẽ mất khoảng bao lâu để hoàn thành? t3 sleep trong 60 giây. Tuy nhiên, #join được call với tham số là 5. Điều này có nghĩa là luồng chính sẽ cho luồng con 5 giây để  kết thúc trước khi tiếp tục.

---
# scope của thread
Xét ví dụ sau:
```ruby
def scope_example
  apples = 5
  thread = Thread.new do
    while (apples > 1)
      apples -= 2
      print " thread "
    end
  end
  peaches = 5
  while apples > 1
    apples -= 1
    peaches -= 1
    print " parent "
  end
  thread.join
  apples
end
```
Cả hai luồng đều có thể lấy táo, vì táo đã được khai báo trước luồng. Tuy nhiên, chỉ vòng lặp của method mới có thể lấy đào, vì chúng được khai báo sau thread.
<br>

Vậy method trên sẽ trả về kết quả là gì? Hãy thử chạy nó nhiều lần:
```ruby
2.3.1 :134 > scope_example
 parent  parent  parent  parent  => 1 
2.3.1 :135 > scope_example
 parent  parent  thread  => 1 
2.3.1 :136 > scope_example
 parent  parent  parent  parent  => 1 
2.3.1 :137 > scope_example
 parent  parent  parent  parent  => 1 
2.3.1 :138 > scope_example
 parent  parent  parent  parent  => 1 
```

Có vẻ như method của chúng ta không đảm bảo được một đầu ra nhất định. Điều này là không tốt. Vậy tại sao điều này xảy ra? Thread con lấy 2 quả táo một lúc, trong khi thread cha chỉ lấy một quả. Tuy nhiên các thread lại không được "lịch sự" với nhau cho lắm. Chúng thực hiện việc của mình mà không quan tâm tới việc của các luồng khác. Ví dụ này cũng cho thấy sự không thể đoán trước được của thứ tự thực thi luồng và khoảng thời gian thiết lập nhỏ mà class Thread cần để khởi tạo.
<br>

Vấn đề trên càng trở nên khó khăn hơn khi chúng ta thêm nhiều biến hơn:
```ruby
def shared_scope_2
  x = 0
  str = "hello world"
  t = Thread.new do
    while (x < str.length)
      print str[x].downcase
      x += 1
    end
  end
  t2 = Thread.new do
    while (x < str.length)
      print str[x].upcase
      x += 1
    end
  end
  sleep 1
  puts ""
end
```
```ruby
2.3.1 :019 > shared_scope_2
hHEllo WoRlD
 => nil 
2.3.1 :020 > shared_scope_2
hello worHlD
 => nil 
2.3.1 :021 > shared_scope_2
hHeLlO WoRlD
 => nil 
2.3.1 :022 > shared_scope_2
hHello world
 => nil 
2.3.1 :023 > shared_scope_2
hHeLLo WoRLD
 => nil 
```
Các luồng có thể dùng chung các biến, nhưng chúng không có bất kỳ thứ tự thực thi nào được thống nhất. Giải quyết vấn đề này sẽ cần dùng đến locking. Class [Mutex](https://ruby-doc.org/core-2.3.1/Thread/Mutex.html) của Ruby là một lựa chọn tốt.

---
# Tổng kết
Một câu hỏi mà bạn có thể thấy tại thời điểm này là: Nếu hai luồng có quyền truy cập vào cùng một biến, điều gì sẽ xảy ra nếu chúng thay đổi biến đã nói cùng một lúc? Liệu có mối nguy hiểm nào không khi cố gắng cùng lúc gán *hai* giá trị khác nhau cho biến *apples* (tạo ra lỗ đen vũ trụ trong chương trình của chúng ta chẳng hạn? :D)
<br>

May mắn thay là sẽ không có mối nguy hiểm nào cả. Cho đến nay, chúng ta vẫn chưa rõ chính xác ý nghĩa của “*cùng một lúc*” trong Thread của Ruby. Trong lập trình, thường có rất nhiều sự nhầm lẫn giữa *Parallelism* (song song) và *Concurrency* (đồng thời). *Parallelism* liên quan đến việc sử dụng một CPU đa lõi để thực hiện nhiều tác vụ cùng một lúc theo đúng nghĩa đen (các CPU đơn lõi trông có vẻ như đang làm nhiều việc cùng một lúc, nhưng bản chất chúng vẫn phải thực hiện từng việc một). Mặt khác, *Concurrency* liên quan đến việc một CPU duy nhất xử lý một số tác vụ, chuyển đổi giữa tác vụ này tác vụ kia cho đến khi tất cả đã hoàn thành.
<br>

Nếu bạn đang nấu một bữa ăn theo cách tuần tự (không phải đồng thời hoặc song song), bạn sẽ phải thực hiện từng bước riêng lẻ và hoàn chỉnh. Điều này có nghĩa là, khi bạn đặt nước sôi, bạn sẽ không thể làm gì khác ngoài việc chờ đợi nước sôi. Tuy nhiên, nếu bạn làm theo cách "*concurrency*", bạn có thể để nồi nước đó và bắt đầu thái rau. Cuối cùng, nếu bạn làm theo cách "*parallelism*, bạn sẽ có một đầu bếp khác hỗ trợ bạn, (mặc dù sẽ tốn diện tích trong nhà bếp hơn và gặp rủi ro cao hơn do các vấn đề về giao tiếp).
<br>

Vậy thì Ruby xử lý vấn đề đa nhiệm như thế nào? Thực ra thì vấn đề này thực sự là một vấn đề khá là nhức nhối đối với Ruby. Các trình thông dịch Ruby tiêu chuẩn (MRI và YARV) không sử dụng "*parallelism*". Hơn nữa, về mặt kỹ thuật, các luồng cho phép "*concurrency*", nhưng nó chỉ theo một cách khá hạn chế. MRI và YARV sử dụng Global Interpreter Lock ([GIL](https://en.wikipedia.org/wiki/Global_interpreter_lock)), có nghĩa là chỉ một luồng có thể được thực thi trong trình thông dịch tại bất kỳ thời điểm nào. Vì vậy, ngay cả trên một máy tính đa lõi, "*parallelism*" là không thể.
<br>

Ở đầu bài viết, chúng ta đã thấy cách mười thread có thể thực hiện một tác vụ “cùng một lúc”. Thực ra thì, đã có một sự ngây thơ vô (số) tội ở đây. Tác vụ chậm mà các method đó xử lý chỉ đơn giản là sleep một giây và sau đó puts ra. Tác vụ này, giống như đợi nồi nước sôi, có thể được hưởng lợi đáng kể từ "*Concurrency*". Nếu chúng ta thay thế tác vụ đó bằng một phép tính toán phức tạp thì kết quả sẽ chẳng có sự chênh lệch gì đáng kể cả.
<br>

Điều này không có nghĩa rằng Threads không có tác dụng gì. Cũng giống như slow_method có sleep trong ví dụ ở đâu bài viết, các quy trình khác mà có sự gián đoạn trong việc thực thi thì áp dụng "*concurrency*" sẽ cải thiện tốc độ lên rất nhiều. Mà thông thường thì bất kỳ thứ gì liên quan đến input - dù từ người dùng hoặc server đều có những sự gián đoạn như vậy. Nếu không phân luồng thì chương trình của chúng ta sẽ phải tạm dừng cho đến khi nhận được đầu vào. Và Threads của Ruby hoàn toàn có thể giải quyết tốt sự thiếu hiệu quả này.
<br>

Nếu việc Ruby không "thực sự" đa nhiệm khiến bạn thất vọng thì bạn có thể cân nhắc chuyển trình thông dịch của mình sang thứ gì đó như [JRuby](https://github.com/jruby/jruby/wiki/Concurrency-in-jruby) (sử dụng Java Virtual Machine và cho phép chạy "*parallelism*". Nếu không, hãy sử dụng threading để tăng hiệu suất chương trình của bạn (cố gắng chú ý đừng để xảy ra lỗi nào quá dị nhé :D).

---
*source: https://medium.com/@micksheridan.24/unravelling-ruby-threads-2798f2c46e45*