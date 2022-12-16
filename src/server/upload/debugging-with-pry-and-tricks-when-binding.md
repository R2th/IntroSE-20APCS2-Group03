# Giới thiệu
Trong bài này, mình sẽ giới thiệu về pry - một loại REPL và cách cài đạt và sử dụng nó để gỡ lỗi của chương trình
# REPL là gì?
REPL là từ viết tắt của Read Eval Print Loop (hiểu nôm na là: Đọc - Đánh giá - In - Lặp) và nó biểu diễn môi trường máy tính như màn hình console trong Linux shell nơi bạn có thể gõ các dòng lệnh và hệ thống sẽ trả về các kết quả.

`Read`: Đọc các thông tin input của người dùng, chuyển đổi thành các dữ liệu và lưu trữ trong bộ nhớ.

`Eval`: Đánh giá các cấu trúc dữ liệu này.

`Print`: In các kết quả.

`Loop`: Lặp các dòng lệnh đến khi người dùng gõ ctrl-c hai lần.

Ruby cài đặt với REPL riêng của mình, tức là IRB. Mỗi khi bạn nhập irb vào terminal của bạn, bạn đang nhập vào một REPL.
# Pry là gì?
Pry là một Ruby REPL với một số tính năng bổ sung. Khi dùng IRB, nó tạo ra môi trường tương tác riêng biệt. 

Tất cả code mình muốn chạy trong IRB mình phải viết tất cả các code rồi paste vào IRB, còn Pry lại khác, mình có thể nhúng vào chương trình

Pry thì linh hoạt hơn IRB. Mỗi khi bạn muốn cài đặt Pry (thông qua gem) bạn có thể dùng dòng `binding.pry` ở bất cứ đâu trong code của bạn

# Binding là gì?
Bingding là một lớp trong ruby tích hợp các đối tượng có thể gói gọn ngữ cảnh của scope hiện tại(variables, methods,...) và giữ chúng để suử dụng bên ngoài ngữ cảnh đó. 

Gọi binding.pry chủ yếu là prying vào ràng buộc hiện tại hoặc ngữ cảnh của mã, từ bên ngoài file.

Vì vậy, khi bạn đặt dòng binding.pry trong code, dòng đó sẽ đựoc dịch khi chương trình được chạy. 

Khi thông dịch chạm vào dòng đó chuơng trình của bạn sẽ dừng lại và chuyển sang chế độ REPL nó tồn tại ngay giữa chuơng trình nơi mà mình thêm dòng `binding.pry`

# Debugger
```
help ls -- Hiển thị các options cho lệnh ls
ls <Object> -- HIển thị tất cả các phương thực có thể gọi bởi object.
_ -- Giá trị cuối cùng
? <Object> -- Hiển thị thêm nhiều thông tin cho object, method
_file_ -- Tái hiện file cuối cùng Pry vừa động tới.
wtf? -- In ra dấu vết (stack trace), giống với _ex_.backtrace
$ -- HIển thị source đoạn binding, viết tắt của show-source
edit Class -- (Mở file bằng editor  $EDITOR, ví duk edit String, edit User)
edit Class#instance_method --  (Mở file bằng editor  $EDITOR, ví dụ edit User.new)
<ctrl+r> -- lịch sử search
_out_ -- Mảng các biến output, tương tự  _in_
cd <var> -- Nhảy con trỏ chương trình vào trong 1 object,  thay đổi giá trị của self
cd .. -- Nhảy ra  1 level
binding.pry -- Breakpoint
edit --ex -- Sửa file cuối cùng mà exception được throw
.<Shell> -- Chạy command
whereami -- In ra nội dung ở nơi debugger được dừng lại
whereami 20 -- In ra nội dung 20 dòng ở nơi debugger được dừng lại
; -- bỏ qua return output bởi Ruby
play -l -- Thực thi dòng hiện tại của binding.pry
```

# Ví dụ
1. Fork và clone repository (https://github.com/tuanhnt1712/debugging-with-pry)
2. Install Pry trong máy của bạn bằng cách điều hướng về danh mục home của bạn( cd ~ trong terminal) và thực thi `gem install pry`
3. Quay lại folder và xem code trong file lib/pry_is_awesome.rb

Bạn sẽ thấy như sau:
```
require 'pry'

def prying_into_the_method
    inside_the_method = "We're inside the method"
    puts inside_the_method
    puts "We're about to stop because of pry!"
    binding.pry
    this_variable_hasnt_been_interpreted_yet = "The program froze before it could read me!" 
    puts this_variable_hasnt_been_interpreted_yet
end

prying_into_the_method
```
Ở đây chúng ta require pry, để sử dụng pry và đinh nghĩa một method, sau đó gọi phương thức đó.

4. Trong đường dẫn của repo ở trong thư terminal, chạy file bằng cách gõ `ruby lib/pry_is_awesome.rb`. Bây giờ, bạn sẽ thấy terminal trông như thế này:
```
3: def prying_into_the_method
     4:     inside_the_method = "We're inside the method"
     5:     puts inside_the_method
     6:     puts "We're about to stop because of pry!"
 =>  7:     binding.pry
     8:     this_variable_hasnt_been_interpreted_yet = "The program froze before it could read me!" 
     9:     puts this_variable_hasnt_been_interpreted_yet
    10: end
[1] pry(main)> 
```
Chúng ta đã dừng chương trình cụar mình khi nó thực hiện và hiện tại nó đang nằm trong REPL bên trong chương trình.

5. Trong terminal, trong console của bạn, gõ tên biến *inside_the_method* và nhấn enter. Bạn sẽ nhìn thấy một giá trị trả về *"We're about to stop because of pry"*
Bây giờ, nếu bạn nhập tên biến `this_variable_hasnt_been_interpreted_yet`. bạn sẽ thấy giá trịn trả về là 0 vì chúng ta đã đông cứng chương trình lại ở dòng 7. Do đó REPL chưa hế biết về nó. Sau đó, gõ exit và chương trình sẽ tiếp tục thực hiện.

# Tricks sử dụng khi binding

1. binding 1 vài trường hợp trong vòng lặp, không phải tất cả
```Ruby

30.times do |n|
    binding.pry if n >27
end

```
2. Hiển thị danh sách các methods của object hoặc class
```Ruby
    30.times do |n|
        binding.pry if n >27
    end


=> n.methods
```
3. Xem source code , để phân biệt Array#map và Array#map!

```Ruby
show-doc Array#map
```
tương tự, nhưng dùng short cut
```Ruby
? Array#map!
```
4. Chui vào ngữ cảnh của object
 ```Ruby
[4] pry(main)> arr = [1, 2, 3]
=> [1, 2, 3]
[5] pry(main)> cd arr
[6] pry(#<Array>):1>

#Để quay trở lại
cd ..
```

5. Lịch sử các command đã chạy trong pry
 ```Ruby
pry(main)>  history
```
6. Binding trong gem và đặt binding.pry

`EDITOR=editor_executable bundle open gem_name`

`EDITOR=vim bundle open sidekiq`
```Ruby
         # /home/user/.rvm/gems/ruby-2.3.0@my-ruby-project/gems/sidekiq-4.1.1/lib/sidekiq/cli.rb
@ line 364 Sidekiq::CLI#parse_config:
    358: def parse_config(cfile)
    359:   opts = {}
    360:   if File.exist?(cfile)
    361:     opts = YAML.load(ERB.new(IO.read(cfile)).result) || opts
    362:     opts = opts.merge(opts.delete(environment) || {})
    363:     parse_queues(opts, opts.delete(:queues) || [])
 => 364:     require 'pry'; binding.pry
    365:   else
  ```
  
  Sau khi kết thúc, để rollback trang thái gốc của gem
  `gem pristine gem_name`
# Tài liệu tham khảo
https://www.sitepoint.com/rubyists-time-pry-irb/

https://blog.eq8.eu/article/rails-debuging-tricks.html