Xin chào mn, chắc hẳn đối với mọi ae Dev như chúng ta thì không quá xa lạ khi nge đến [Exception](https://docs.oracle.com/javase/tutorial/essential/exceptions/definition.html) rồi nhỉ. Phạm vi bài viết này  mình không giới thiệu chi tiết về Exception là gì, hay cấu trúc nó như thế nào mà mình chỉ tập trung vào vấn đề xử lí Exception đó như thế nào trong chương trình của chúng ta thôi nhé. Let's go thôi nào

### Tìm hiểu về Begin/Rescue
Gỉa sử mình có method tên là `divide` như sau:

```ruby
def divide x, y
    x / y
end
```

Trông đoạn code thật ngon lành và ngắn gọn nhỉ, thử một vài tham số `x`, `y` xem nó hoạt động thế nào nhé

```ruby
> puts divide 10, 5
2
```

Đúng như ta nghĩ, code chạy ngon lành rồi :D :D. Thử thêm một số case khác xem nhé
```ruby
> puts divide 10, 0
ZeroDivisionError (divided by 0)

> puts divide 10, "a"
TypeError (String can't be coerced into Integer)
```

Toang rồi các bạn ơi :D :D. Coding nó không đơn giản như ta nghĩ nhỉ, cũng giống như chơi một ván cờ vậy, người chơi cờ giỏi thường trước khi đánh một nước cờ thì họ phải tính toán rất nhiều nước cờ mà đối thủ có thể đánh sau đó(không hẳn là tất cả các nước nhé) và họ luôn suy nghĩ cho mình hướng đi tương ứng với từng trường hợp đó. Gần đây có bộ phim khá nổi đó là `Phi vụ triệu đô`, nhân vật `professor` trong bộ phim rất thông minh và để có được một vụ trộm hoàn hảo thì a này phải tính đến các trường xảy ra ngoài ý muốn có thể trong plan của mình và đưa ra phương án giải quyết cho mỗi trường hợp cụ thể cũng như đoạn code của mình ở trên vậy mình chỉ nghĩ đến một ngữ cảnh qúa tuyệt vời mà chưa tính toán đến các trường hợp ngoại lệ -> Code toang :D. Ngoài ra chúng ta cũng không nên quá tin tưởng input đầu vào quá nhé(ở đoạn code trên là `x`, `y`).

Chúng ta sửa lại đoạn code trên sử dụng khối `begin... end` để bao phủ những rủi ro của hàm `divide` có thể có và mệnh đề `rescue` để xử lí lỗi như ghi log, thông báo message cho hệ thống. Let's go!

```ruby
def divide x, y
    begin
        x / y
    rescue
        puts "Lỗi mất rồi!"
        
        return nil
    end
end
```

Chúng ta thử lại đoạn code lỗi ở trên xem thế nào nhé:
```ruby
> puts divide 10, 0
Lỗi mất rồi!
=> nil

> puts divide 10, "a"
Lỗi mất rồi!
=> nil
```

Wow, tạm ổn hơn rồi :D :D

### Xử lí message error
* Để thuận tiện cho việc `debugger` thì message thông báo lỗi phải thực sự cụ thể và chi tiết nhất có thể. 

```ruby
def divide x, y
    begin
        x / y
    rescue => e
        puts "Đã có một %s (%s)" % [e.class, e.message]
        puts e.backtrace
    end
end
```

Thử lại xem nhé:
```ruby
> divide 10, 0
Đã có một ZeroDivisionError (divided by 0)
(irb):39:in `/'
(irb):39:in `divide'
(irb):45:in `irb_binding'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb/workspace.rb:85:in `eval'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb/workspace.rb:85:in `evaluate'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb/context.rb:380:in `evaluate'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb.rb:491:in `block (2 levels) in eval_input'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb.rb:623:in `signal_status'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb.rb:488:in `block in eval_input'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb/ruby-lex.rb:246:in `block (2 levels) in each_top_level_statement'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb/ruby-lex.rb:232:in `loop'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb/ruby-lex.rb:232:in `block in each_top_level_statement'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb/ruby-lex.rb:231:in `catch'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb/ruby-lex.rb:231:in `each_top_level_statement'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb.rb:487:in `eval_input'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb.rb:428:in `block in run'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb.rb:427:in `catch'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb.rb:427:in `run'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb.rb:383:in `start'
/Users/admin/.rbenv/versions/2.5.5/bin/irb:11:in `<main>'
=> nil
```

```ruby
> divide 10, "a"
Đã có một TypeError (String can't be coerced into Integer)
(irb):39:in `/'
(irb):39:in `divide'
(irb):46:in `irb_binding'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb/workspace.rb:85:in `eval'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb/workspace.rb:85:in `evaluate'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb/context.rb:380:in `evaluate'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb.rb:491:in `block (2 levels) in eval_input'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb.rb:623:in `signal_status'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb.rb:488:in `block in eval_input'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb/ruby-lex.rb:246:in `block (2 levels) in each_top_level_statement'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb/ruby-lex.rb:232:in `loop'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb/ruby-lex.rb:232:in `block in each_top_level_statement'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb/ruby-lex.rb:231:in `catch'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb/ruby-lex.rb:231:in `each_top_level_statement'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb.rb:487:in `eval_input'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb.rb:428:in `block in run'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb.rb:427:in `catch'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb.rb:427:in `run'
/Users/admin/.rbenv/versions/2.5.5/lib/ruby/2.5.0/irb.rb:383:in `start'
/Users/admin/.rbenv/versions/2.5.5/bin/irb:11:in `<main>'
=> nil
```

Sau nhìu lần thay áo thì cũng thấy ổn rồi ae nhỉ :D :D.

* Trong một số trường hợp, mỗi Exception phải có một message error riêng biệt không chung format như đoạn code ta vừa xử lí ở trên. Để làm được việc này thì bạn phải biết được tên từng Exception, bạn có thể tham khảo [ở đây](https://www.honeybadger.io/blog/understanding-the-ruby-exception-hierarchy/).

```ruby
def divide x, y
    begin
        x / y
    rescue ZeroDivisionError
        puts "Không thể chia cho 0!"
        
        return nil
    rescue TypeError
        puts "Divide chỉ hoạt động với numbers!"
        
        return nil
    end
end
```

Thử run lại xem thế nào nhé:

```ruby
> divide 10, 0
Không thể chia cho 0!

> divide 10, "a"
Divide chỉ hoạt động với numbers!
```
### Retrying
Trong mệnh đề `rescue` bạn có thể sử dụng `retry` để chạy lại đoạn code trong block `begin... end` lần nữa

```ruby
def divide x, y
    begin
        puts "Bắt đầu chia..."
        x / y
    rescue ZeroDivisionError
        puts "Không thể chia cho 0!"
        y = 1
        retry
    rescue TypeError
        puts "Divide chỉ hoạt động với numbers!"
        
        return nil
    end
end
```

Kết quả:

``` ruby
> divide 10, 0
Bắt đầu chia... # first time
Không thể chia cho 0!
Bắt đầu chia... # second time
=> 10
```

=> Lưu ý là trong ruby `retry` nó chạy vô hạn nhé, nên hãy cẩn thận không là code của bạn chạy hoài đấy :D :D

### Else
* Mệnh đề `else` được thực thi không có bất kì `Exception` nào xảy ra cả.

```
def divide x, y
    begin
        x / y
    rescue ZeroDivisionError
        puts "Không thể chia cho 0!"
    rescue TypeError
        puts "Divide chỉ hoạt động với numbers!"
    else
        puts "Chúc mừng bạn đã thành công!"
    end
end
```

Thử chạy xem nhé:
```ruby
> divide 10, 3
Chúc mừng bạn đã thành công!
=> nil
```

*  Nếu trong block `begin` có thực thi `return` thì sẽ không chạy vào `else` mặc dù không có bất kì `Exception` này xảy ra cả nhé

```ruby
def divide x, y
    begin
        return x / y # return and exit when don't have any exception raised
    rescue ZeroDivisionError
        puts "Không thể chia cho 0!"
    rescue TypeError
        puts "Divide chỉ hoạt động với numbers!"
    else
        puts "Chúc mừng bạn đã thành công!"
    end
end
```

Thử lại nhé:

```ruby
> divide 10, 1
=> 10
```
### Ensure
Đặc quyền hơn else một tí là `ensure` luôn luôn chạy.

```ruby
def divide x, y
    begin
    puts "ád"
       return  x / y
    rescue ZeroDivisionError
        puts "Không thể chia cho 0!"
    rescue TypeError
        puts "Divide chỉ hoạt động với numbers!"
    ensure
        puts "Ensure luôn luôn chạy"
        return "het"
    end
end
```


```ruby
> divide 10, 1
Ensure luôn luôn chạy
=> 10

> divide 10, 0
Không thể chia cho 0!
Ensure luôn luôn chạy
=> nil

> divide 10, nil
Divide chỉ hoạt động với numbers!
Ensure luôn luôn chạy
=> nil
```

=> `ensure` luôn thực thi trước `return` trong `begin` or `rescue`, nếu ở block `ensure` có `return` thì nó sẽ overrived lại `return` trong `begin` or `rescue`.
### Kết bài
Qua bài viết mình hy vọng các bạn có thể biết thêm các xử lí một `Exception` trong ruby như thế nào, nếu có cách nào khác thì hãy comment vào bên dưới để mọi người cùng biết nhé.:heart_eyes::heart_eyes:

Cảm ơn mọi người đã đọc bài viết của mình nhé.

Happy coding!