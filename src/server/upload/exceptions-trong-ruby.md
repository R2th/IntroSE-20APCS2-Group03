1. Giới thiệu
2. Xử lý như thế nào ?
3.  Một số cách bắt exceptions
4. Kết
# 1. Giới thiệu
- Biết được các ngoại lệ được xác định trước là một chuyện, nhưng để sử dụng hiệu quả hơn các ngoại lệ trong ứng dụng của bạn, điều quan trọng là phải hiểu cách tạo và chỉnh sửa theo câchs của riêng bạn. 
- Về cốt lõi, mọi ngoại lệ Ruby đều bắt nguồn từ một lớp Exception dựng sẵn và bao gồm một số ít các phương thức tích hợp sẵn , nhưng phương thức ngoại lệ được sử dụng phổ biến nhất là message. Phương thức này có thể được sử dụng để truy xuất một thông báo ngoại lệ cụ thể từ một đối tượng ngoại lệ được nâng lên.
- Với một lập trình viên Ruby chắc hẳn đã từng gặp các exception, vậy làm sao để xử lý chung? bạn có biết về các cách bắt ngoại lệ không ? nếu bạn đã sử dụng liệu bạn đã có thực sự hiểu về cách hoạt động của nó chưa?
- Trong bài này mình sẽ giới thiệu cho các bạn về một số cách xử lý exception trong Ruby

# 2. Xử lý thế nào ?
- Tương tự như try-catch của PHP, việc xử lý ngoại lệ của Ruby bắt đầu bằng khối begin..rescue. 
- Tóm lại begin..rescue là một khối mã có thể được sử dụng để xử lý các trường hợp ngoại lệ được nêu ra mà không làm gián đoạn việc thực thi chương trình. Nói cách khác, bạn có thể begin thực thi một khối mã và rescue bất kỳ ngoại lệ nào được nêu ra.
# 3. Một số cách bắt exceptions
### *Sử dụng rescue*
- Về cơ bản begin..rescue có đủ các ví dụ của lớp StandardError. Không bao gồm một số loại như: method errors, type errors, runtime errors,..
- Để bắt exception của lớp StandardError, chỉ cần bọc phần mã được chỉ định trong một khối begin..rescue:
```
begin
  # ...
rescue
  # ...
end
```
- Khi một StandardError ngoại lệ được tạo ra trong khối begin, một thể hiện của nó sẽ được chuyển đến khối giải cứu dưới dạng biến e (để biết thêm thông tin về cấu trúc của Exceptionlớp Ruby , hãy xem thêm tại [đây](https://rollbar.com/guides/ruby-raising-exceptions) ).
```
begin
  # ...
rescue => e
  # ...
end
```
- Nhưng nếu chúng ta muốn bắt nhiều exception hơn một loại exception thì sao? Giống như một if-elsif-else, một begin..rescue khối có thể có nhiều rescue..which, khi được kết hợp với việc kiểm tra lớp StandardError, cho phép bạn thích ứng một cách hợp lý với bất kỳ và tất cả các vấn đề có thể phát sinh:
```
begin
  # ...
rescue ArgumentError => e
  # ...
rescue TypeError => e
  # ...
rescue => e
  # ...
end
```
- Chúng ta có thể hiểu rõ hơn bằng cách xem danh sách exceptions dưới đây
```
Exception
  NoMemoryError
  ScriptError
    LoadError
    NotImplementedError
    SyntaxError
  SecurityError
  SignalException
    Interrupt
  StandardError -- default for rescue
    ArgumentError
      UncaughtThrowError
    EncodingError
    FiberError
    IOError
      EOFError
    IndexError
      KeyError
      StopIteration
    LocalJumpError
    NameError
      NoMethodError
    RangeError
      FloatDomainError
    RegexpError
    RuntimeError -- default for raise
    SystemCallError
      Errno::*
    ThreadError
    TypeError
    ZeroDivisionError
  SystemExit
  SystemStackError
```

### *Sử dụng ensure*
- Bạn cũng có thể chọn đưa một mệnh đề ensure vào khối begin..rescue của mình sau mệnh đề rescue cuối cùng . Điều này đảm bảo rằng code trong ensure sẽ luôn được thực thi, cho dù một ngoại lệ được đưa ra hay không. 
- Vì vậy, điều này hữu ích khi nào? Một ví dụ đơn giản là quản lý tài nguyên hay đóng kết nối với db, xóa file tạm,..; mã dưới đây cho thấy làm việc với một tệp. Cho dù có xuất hiện ngoại lệ khi làm việc với tệp hay không, mã này đảm bảo rằng nó sẽ luôn được đóng.
```
file = open(file_name, 'w')

begin
  # do something with file
rescue
  # handle exception
rescue
  # handle a different exception
ensure
  file.close
  # executes every time
end
```
- Nếu có nhiều mệnh đề rescue trong khối begin..rescue, mệnh đề ensure này đóng vai trò là một điểm thoát duy nhất cho khối và cho phép bạn đặt tất cả mã của mình vào một nơi, như đã thấy trong đoạn mã trên.

- Lưu ý một điều quan trọng cần nhớ ensure luôn được thực thi và mã này không tự tạo ra một ngoại lệ. Nếu mã trong mệnh đề ensure tạo ra một ngoại lệ, bất kỳ ngoại lệ nào được nêu ra trước đó trong quá trình thực thi khối begin..rescue sẽ bị bor qua và việc gỡ lỗi có thể trở nên rất khó khăn.

### *Sử dụng retry*
- Retry cho phép bạn thử lại một đoạn mã trong một khối
- Sử dụng retry trong khối begin..rescue của bạn sẽ chuyển hướng chương trình của bạn trở lại câu lệnh begin
```
begin
  puts "Iteration"
  raise
rescue
  retry
end
```
- Ví dụ dưới đây in từ "Iteration" vào bảng điều khiển trước khi đưa ra một ngoại lệ. 
- Thực thi khối rescue, khối này sẽ gọi retry và bắt đầu lại từ đầu. Điều này dẫn đến chương trình của chúng ta in liên tục Iteration. Các từ khóa retry cho phép bạn đạt được hiệu quả cao khi sử dụng vòng lặp. Điều này hữu ích trong các tình huống mà bạn cần thử lại trong khi lặp lại chẳng hạn.
```
10.times do |i| 
  begin
    puts "Iteration #{i}"
    raise if i > 2
  rescue
  
    # Using retry 
    retry
  end
end
```
- kết quả:
```
Iteration 0
Iteration 1
Iteration 2
Iteration 3
Iteration 3
Iteration 3
...
```
# 4. Kết
- Tôi rất là hy vọng rằng bài viết này đã giúp bạn cảm thấy tự tin và bắt được mọi loại exception mong muốn, cảm ơn rất rất nhiều vì đã đọc bài viết này.