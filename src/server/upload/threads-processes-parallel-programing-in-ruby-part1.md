## Thread và process

Ruby cung cấp 1 phương pháp để tổ chức chương trình sao cho bạn có thể chạy nhiều phần xử lí cùng 1 lúc. Bạn có thể tách thành các task trong 1 chương trình bằng cách sử dụng multiple thread hoặc có thể phân thành các task giữa các chương trình khác nhau bằng cách dùng multiple processes. Hãy xem xét từng trường hợp một.

## Multithreading

Thông thường cách đơn giản nhất để làm 2 việc 1 lúc là sử dụng Ruby thread. Việc xử lí này được thực hiện bởi bộ thông dịch của Ruby - Ruby interpreter, giúp cho Ruby thread có khả năng portable không bị phụ thuộc vào hệ điều hành tuy nhiên bù lại bạn sẽ không có được những lợi ích mà native thread mang lại. Việc sử dụng multithreading có thể dẫn đến tình trạng thread starvation - đói thread khi mà thread có độ ưu tiên thấp không có cơ hội để chạy. Nếu 1 vài thread gọi tới hệ điều hành và tốn quá nhiều thời gian, các thread còn lại có thể bị treo. Tuy nhiên đừng vội quá lo lắng tới những vấn đề đó mà bỏ qua việc sử dụng multithreading - 1 cách thức hiệu quả để có thể xử lí song song (parallel) cho code của bạn .

### Tạo thread trong ruby

Việc tạo thread trong ruby khá đơn giản. Dưới đây là ví dụ cho việc download song song các trang web. Với mỗi request, đoạn code tạo 1 thread riêng biệt để xử lí các HTTP transaction.

```Ruby
require 'net/http'
pages = %w( google.com.vn
            dantri.com.vn
            tinhte.vn
           )
threads = []

for page in pages
  threads << Thread.new(page) { |myPage|
    h = Net::HTTP.new(myPage, 80)
    puts "Fetching: #{myPage}"
    resp, data = h.get('/', nil )
    puts "Got #{myPage}:  #{resp.message}"
  }
end

threads.each { |aThread|  aThread.join }
```
Kết quả

```
Fetching: tinhte.vn
Fetching: google.com.vn
Fetching: dantri.com.vn
Got tinhte.vn:  Found
Got google.com.vn:  Moved Permanently
Got dantri.com.vn:  OK
```

Hãy xem xét chi tiết đoạn code. Thread mới được tạo ra bằng lệnh gọi `Thread.new`. Nó được truyền vào 1 block chứa đoạn code sẽ được chạy trong thread mới đó. Trong ví dụ này block thực hiện dùng thư viện `net/http` để lấy top page của các trang web trong list cho trước. Khi chúng ta tạo thread, chúng ta cũng truyền vào tham số `page` là domain của trang web đó. Tham số đó được truyền vào block với tư cách là `myPage` thay vì dùng thẳng biến `page`. Vậy lí do tại sao chúng ta lại cần làm thế thay vì dùng thẳng biến `page` ?

Một thread thực hiện chia sẻ - share các biến local, global tồn tại vào thời điểm thread bắt đầu chạy. Tuy nhiên việc chia sẻ này không phải lúc nào cũng ổn. Trong trường hợp này cả 3 thread đều dùng chung biến `page`. Thời điểm thread đầu tiên chạy biến `page` được set giá trị là `google.com.vn`. Trong khi đó, vòng lặp tiếp tục chạy để tạo thread mới. Lượt thứ 2, biến `page` được set giá trị là `dantri.com.vn`. Nếu như lúc này thread 1 vẫn chưa kết thúc thì thread 1 sẽ sủe dụng biến `page` với giá trị được set tại thread 2. Những bug kiểu này khi xảy ra rất khó để tracking. Tuy nhiên biến local được tạo trong thread block sẽ có những bản copy riêng cho từng thread. Trong trường hợp này biến `myPage` sẽ đảm bảo có giá trị đúng bằng giá trị `page` tại thời điểm thread được tạo ra.

### Quản lí threads

Có 1 phần xử lí nữa nằm ở cuối đoạn code ví dụ trên. Tại sao chúng ta lại phải `join` các thread mà chúng ta tạo ra.

Khi 1 chương trình Ruby kêt thúc, tất cả các thread đang chạy sẽ bị kill, bất kể trạng thái của nó như thế nào. Tuy nhiên bạn có thể bắt chương trình phải đợi cho đến khi thread kết thúc bằng cách dùng method `Thread#join`. Thread gọi sẽ bị block cho đến khi thread tham số được truyền vào kết thúc. Bằng cách này chúng ta có thể đảm bảo cả 3 thread trong ví dụ trên sẽ chạy xong hết trước khi chương trình chính kết thúc.

Bên cạnh `join` chúng ta còn 1 số routines khác để quản lí thread. Bạn có thể lấy được thread hiện tại thông qua `Thread.current`. Bạn có thể lấy được danh sách các thread bằng cách dùng `Thread.list`. Để xác địnhtrangj thái của thread bạn có thể dùng `Thread#status`  hoặc `Thread#alive?`.

Bên cạnh đó bạn cũng có thể tuỳ chỉnh độ ưu tiên của thread bằng cách dùng `Thread#priority=`, thread có độ ưu tiên cao hơn sẽ thực hiện trước thread có độ ưu tiên thấp hơn.

### Biến thread

Như đã mô tả ở phần trước, thread có thể truy cập các biến nằm trong scope khi mà thread được tạo ra. Các biến local trong block của 1 thread là local cho thread đó và không chia sẻ cho các thread khác.

Vậy phải làm thế nào khi bạn cần 1 biến mà mọi thread bao gồm cả thread chính có thể truy cập được ?

Thread cung cấp 1 tính năng cho phép bạn biến local của thread có thể được tạo và truy cập thông qua tên biến. Bạn có thể đối xử với thread object như 1 hash và thực hiện ghi vào phần tử thông qua `[]=` và đọc chúng thông qua `[]`. Trong ví dụ này mỗi thread sẽ lưu lại giá trị của biến `count` tại thời điểm thread chạy vào biến thread-local với key là `mycount`

```Ruby
count = 0
arr = []
10.times do |i|
  arr[i] = Thread.new {
    sleep(rand(0)/10.0)
    Thread.current["mycount"] = count
    count += 1
  }
end
arr.each {|t| t.join; print t["mycount"], ", " }
puts "count = #{count}"
```

Kết quả

```
7, 2, 4, 1, 6, 5, 9, 3, 0, 8, count = 10
```

### Threads và Exceptions

Điều gì xảy ra nếu 1 thread raise exception. Nó tuỳ thuộc vào setting của flag [abort_on_exception](http://ruby-doc.org/core-2.2.0/Thread.html#method-c-abort_on_exception).

Nếu flag `abort_on_exception` là `false` theo như mặc định thì khi có exception xảy ra thread hiện tại sẽ bị kill, các thread khác chạy bình thường. Trong trường hợp dưới, thread 3 fail và không thể cho ra output nhưng bạn vẫn có thể thấy kết quả từ các thread khác.

```Ruby
threads = []
6.times { |i|
  threads << Thread.new(i) {
    raise "Boom!" if i == 3
    puts i
  }
}
threads.each {|t| t.join }
```

Kết quả

```
4
1
2
5
0
exception.rb:4:in `block (2 levels) in <main>': Boom! (RuntimeError)
```

Ngược lại nếu `abort_on_exception` là `true` thì nếu 1 thread bị dính exception, tất cả các thread khác cũng sẽ bị kill.

```Ruby
Thread.abort_on_exception = true
threads = []
6.times { |i|
  threads << Thread.new(i) {
    raise "Boom!" if i == 3
    puts i
  }
}
threads.each {|t| t.join }
```

Kết quả

```
1
exception.rb:5:in `block (2 levels) in <main>': Boom! (RuntimeError)
```

Tuỳ thuộc vào thread nào thực hiện xong trước khi thread cho `i=3` bị raise Exception mà kết quả có thể sẽ khác. Tuy nhiên rõ ràng là một khi exception đã bị raise thì các thread khác không còn cơ hội để thực hiện nốt phần việc của mình nữa.

### Điều khiển thread scheduler

Với 1 ứng dụng được thiết kế tốt, bạn chỉ việc để thread chạy 1 cách tự nhiên, việc xây dựng mối quan hê phụ thuộc về thời gian - timing dependencies - cho 1 app multithreading thường là không tốt.

Tuy nhiên cũng có những lúc bạn cần phải điều khiển được thread. Class Thread cung cấp nhiều method để điều khiển thread scheduler. Bạn có thể gọi `Thread.stop` để dừng thread, `Thread#run` để yêu cầu 1 thread nào đó chạy, `Thread.pass` để bỏ qua thread hiện lại, cho phép thread khác chạy, `Thread#join` và `Thread#value` để dừng thread chính cho đến khi thread tham số truyền vào chạy xong.

Ví dụ

```Ruby
t = Thread.new { sleep 0.5; Thread.pass; Thread.stop; }
puts t.status
t.run
puts t.status
t.run
puts t.status
```

Kết quả

```
run
sleep
run
```