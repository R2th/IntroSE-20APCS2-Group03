## Chạy nhiều processes

Đôi khi, bạn muốn chia 1 task thành nhiều đoạn với process-size hoặc muốn chạy 1 thread riêng biệt mà không phải viết bằng Ruby. Không vấn đề gì, Ruby cung cấp cho bạn 1 số phương pháp để sinh process cũng như quản lí chúng.

### Sinh process mới

Có 1 số cách để sinh process trong Ruby. Cách dễ nhất là chạy chạy 1 vài command và đợi cho đến khi chúng hoàn thành. Bạn có thể làm như vậy khi muốn chạy những câu lệnh độc lập hay khi muốn lấy data từ 1 host system nào đó chẳng hạn. Ruby xử lí việc này với method `system` và ``back quote (` `)``

```Ruby
2.5.0 :005 > system("curl google.com.vn")
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>301 Moved</TITLE></HEAD><BODY>
<H1>301 Moved</H1>
The document has moved
<A HREF="http://www.google.com.vn/">here</A>.
</BODY></HTML>
 => true
 2.5.0 :006 > puts `date`
Sun Feb  4 17:55:34 +07 2018
 => nil
```

Method `Kernel::system` thực hiện lệnh trong 1 sub-process, trả về `true` nếu tìm thấy command và thực hiện được, ngược lại trả về `false`. Trong trường hợp `false` bạn sẽ thu được exit code của process trong biến global `$?`

```Ruby
2.5.0 :020 > system("curl dantri.com.gn")
curl: (6) Could not resolve host: dantri.com.gn
 => false
2.5.0 :021 > puts $?
pid 44991 exit 6
 => nil
```

Một vấn đề với lệnh `system` là output của câu lệnh không được trả về mà chỉ có các giá trị `true` (khi câu lệnh tồn tại và chạy thành công), `false` (câu lệnh tồn tại nhưng kết quả không thành công, exit code > 0), `nil` (câu lệnh không tồn tại, không chạy được) và đôi khi nó không phải là điều bạn mong muốn. Để lấy thông tin output của câu lệnh chạy trong subprocess thì bạn có thể dùng ``backquote (` `)`` nhưng hãy nhớ dùng `String#chomp` để loại bỏ kí tự xuống dòng cuối trong kết quả.

```Ruby
# Output của system
2.5.0 :025 > system("curl dantri.vn")
 => true
2.5.0 :026 > system("curl dantri.gn")
curl: (6) Could not resolve host: dantri.gn
 => false
2.5.0 :027 > system("cur dantri.vn")
 => nil
 # Kí tự line-ending trong kết quả khi dùng backquote
 2.5.0 :028 > a = `date`
 => "Sun Feb  4 18:13:03 +07 2018\n"  
```

Đây là những trường hợp đơn giản khi chúng ta chỉ đơn thuần chạy lệnh và lấy về kết quả trả về. Nhưng khi cần có sự điều khiển, giao tiếp giữa các sub-process, gửi-nhận thông tin thì sao ? Đây là lúc dùng method `IO.popen`.  Method `popen` cho phép chúng ta chạy command trong subprocess đồng thời liên kết standard input và output của subprocess với Ruby IO object.

```Ruby
2.5.0 :034 > py_output = ""
 => ""
2.5.0 :035 > IO.popen('python', 'w+') do |pipe|
2.5.0 :036 >       pipe.puts("print('l = {0}'.format(len([1,2,4])))")
2.5.0 :037?>     pipe.close_write
2.5.0 :038?>     py_output = pipe.read
2.5.0 :039?>   end
 => "l = 3\n"
2.5.0 :040 >
2.5.0 :041 > puts py_output
l = 3
 => nil
2.5.0 :042 >
```

Phân tích 1 chút ví dụ trên, đầu tiên chúng ta tạo ra 1 object IO, thực hiện ghi các gía trị vào object IO đó thông qua `IO#puts` rồi lấy lại những giá trị đó thông qua `IO#read`. Với cách thức này chúng ta có thể chạy 1 python interactive shell, tính toán, ghi lại kết quả vào trong object IO rồi lại có thể lấy ra kết quả để sử dụng trong chương trình ruby của mình. Bằng cách tương tự, chúng ta có thể gọi 1 ruby interactive shell hay 1 mysql interactive shell ngầm trong 1 chương trình ruby.

Chúng ta có thể chứng thực được việc có 2 process riêng biệt để chạy ruby và python bằng cách sưả lại đoạn code trên 1 chút

```Ruby
# save to sub_python.rb
py_output = ""
IO.popen('python', 'w+') do |pipe|
  pipe.puts("print('l = {0}'.format(len([1,2,4])))")
  pipe.puts("import time")
  pipe.puts("time.sleep(20)")
  pipe.puts("print 'slept 20 seconds'")
  pipe.close_write
  py_output = pipe.read
end

puts py_output
```

Chúng ta cố tình thêm vào đoạn code python 1 đoạn xử lí sleep 20s và dùng lệnh `ps` trên terminal để kiểm tra xem có thực sự là có process ruby và python được chạy hay không. Kết quả thấy được sẽ có dạng như dưới

```Shell
$ ps aux | grep -E "\s(ruby|python)(\s|$)"
nguyen.thanh.tungb 58428   0.0  0.1  2463356   6628 s002  S+    8:47PM   0:00.08 python
nguyen.thanh.tungb 58427   0.0  0.1  2466188  11632 s002  S+    8:47PM   0:00.07 ruby sub_python.rb
```

### Process độc lập

Đôi lúc chúng ta chỉ đơn giản là muốn chạy thêm 1 process độc lập, không cần quan tâm việc sử dụng tiêos kết quả trả về của process mới như thế nào, đây là lúc bạn nên dùng `Kernel#exec`

```Ruby
 # save as independence.rb
puts "start at: #{Time.now}"
exec("curl -sS https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt | tail -n 10")
puts "wake up: #{Time.now}"
```

Kết quả

```Ruby
$ ruby independence.rb
start at: 2018-02-10 21:36:38 +0700
zwanziger
zwieback
zwiebacks
zwieselite
zwinglian
zwinglianism
zwinglianist
zwitter
zwitterion
zwitterionic$
```

Như đã thấy trong phần kết quả, không hề có "wake up", sau khi câu lệnh exec chạy xong thì cũng không có quay trở lại với chương trình chính ruby nữa mà tắt luôn nên kết quả cuối cùng chỉ là những giá trị thu được của lệnh `tail` mà thôi

### Chạy song song nhiều process

Các ví dụ trên đã cho thấy khả năng tạo 1 process mới để xử lí 1 số tác vụ đặc thù nằm ngoài phạm trù của ruby nhưng chúng có điểm chung là đều đợi process mới chạy xong thì mới quay trở lại chương trình ruby gốc và tiếp tục thực hiện tiếp các tác vụ ruby khác. Vậy trong trường hợp muốn chạy đồng thời nhiều process thì sao?

Ruby cung cấp phương pháp `fork` để xử lí việc này

```Ruby
# save as fork.rb
puts "This is the first line before the fork (pid #{Process.pid})"
puts fork
puts "This is the second line after the fork (pid #{Process.pid})"
```

```
$ ruby fork.rb
This is the first line before the fork (pid 58608)
58609
This is the second line after the fork (pid 58608)

This is the second line after the fork (pid 58609)
```

Ta có thể nhìn thấy `first line` chỉ được in ra 1 lần mà `second line` lại được in ra 2 lần. Bản chất của việc này là từ process chính (pid 58608), process phụ được tạo ra bằng lệnh `fork`, kể từ sau câu lệnh `fork` này các câu lệnh được thực hiện trên cả 2 process. Do đó ta mới thấy kết quả là `second line` được in 2 lần với `pid` khác nhau chính là `pid` của process chính và process phụ.

Ta cũng có thể chỉ định phần việc chỉ được thực hiện trong process phụ thông qua chỉ định block

```Ruby
# save as fork_block.rb
puts "You can also put forked code in a block pid: #{Process.pid}"
fork do
  puts "Hello from fork pid: #{Process.pid}"
end
puts "The parent process just skips over it: #{Process.pid}"
```

```Ruby
$ ruby fork_block.rb
You can also put forked code in a block pid: 58625
The parent process just skips over it: 58625
Hello from fork pid: 58626
```

Trong trường hợp này process chính vẫn hoạt động bình thường phó mặc đoạn xử lí trong block cho process phụ xử lí nên chúng ta có thể thấy là đoạn text `The parent process just skips over it:` vẫn được in ra trước `Hello from fork`

## Tổng hợp những phương pháp để launch process trong ruby

Dưới đây là sơ đồ tổng hợp các phương thức để làm việc với process. Tuỳ thuộc vào việc bạn có muốn quay về chương trình ruby chính sau khi thực hiện process phụ hay không, bạn muốn process chính-phụ của bạn chạy tuần tự hay song song, muốn thu được giá trị kết quả sau khi thực hiện process hay chỉ đơn giản là muốn biết quá trình chạy process có thành công hay không mà tuỳ theo đó chọn phương thức thích hợp 

![https://i.stack.imgur.com/1Vuvp.png](https://i.stack.imgur.com/1Vuvp.png)