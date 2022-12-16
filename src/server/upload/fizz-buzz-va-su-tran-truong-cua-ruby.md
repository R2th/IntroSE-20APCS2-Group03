Bạn có tin chúng ta có thể lập trình mà không dùng đến các ký tự chữ và số. Chúng ta đã biết Ruby mang đến cho chúng ta sự tiện lợi, tinh gọn trong từng dòng code và hôm nay cùng xem giới hạn của sự tối giản đến mức "trần truồng" của nó. Để cụ thể hơn chúng ta cùng tìm hiểu qua bài toán kinh điển FizzBuzz.

![](https://images.viblo.asia/653862ac-e020-41d8-9ddd-a959e8961922.png)
## 1. Bài toán FizzBuzz:

> "Viết một chương trình để in ra các số từ 1 đến 100. Nhưng đối với các số chia hết cho 3 thì in ra chữ “Fizz” thay vì hiển thị số đó và đối với các số chia hết cho 5 thì in ra chữ “Buzz”. Đối với các số vừa chia hết cho 3 và 5 thì in ra chữ “FizzBuzz”".

Đây là một trong những câu hỏi phỏng vấn kinh điển từ các nhà tuyển dụng lập trình viên. Xuất phát của nó là từ nước Anh với mục đích dạy cho trẻ em làm quen với số và các phép tính, sau này người ta biến đổi thêm để nó trở thành bài toán "nhập môn" cho hầu hết lập trình viên hiện nay.

![](https://images.viblo.asia/2c3de109-0ab6-4f07-aec1-f53dabfdb5c8.png)

Lấy cảm hứng từ [Programming with Nothing](http://codon.com/programming-with-nothing) của Tom Stuart, chúng ta sẽ xem làm cách nào để đẩy Ruby đến giới hạn trần của nó để giải quyết bài toán FizzBuzz. Từng bước chúng ta sẽ khám phá ra rằng có thể viết các chương trình Ruby đáng kể mà không cần đến các ký tự chữ và số. 

## 2. Non-Alphanumeric Ruby

Tất nhiên là chúng ta sẽ không thể có được những con số mà không gõ rõ ràng những con số, chúng ta cần tạo ra nó. Hãy xem ruby cho chúng ta điều gì từ `global variables`:

```
global_variables.select { |g| Fixnum === eval(g.to_s) }
# [:$SAFE, :$., :$$, $-W]
```

 $SAFE và $-W là 0, 1. $. là 100 và $$ là process ID. Chừng ấy là quá đủ bạn tin không, bằng cách chia cho chính nó ta được số 1 và cũng nhờ phép chia ta sẽ có tất cả các số mà chúng ta cần.
 
 Chúng ta đã có các số, vấn đề tiếp theo là làm sao lưu trữ chúng. Thật may có thể sử dụng các ký tự gạch chân và có thể kết hợp làm prefix với `@` hoặc `$` để tạo ra các biến `instance` và `global`. 
 
 Bây giờ chúng ta có thể lưu trữ số, hãy tiếp tục và lấy số chúng ta sẽ cần để viết FizzBuzz.
```
 _   = $$ / $$ #  1
__  =  _ -  _ #  0
@_  =  _ +  _ #  2
$_  = @_ +  _ #  3
$-  = @_ + $_ #  5
$-_ = $- * $_ # 15
```

Việc tạo ra các con số không còn khó khăn nữa, nên chúng ta sẽ thực hiện in ra Fizz, Buzz, hoặc kết hợp giữa chúng. Bằng cách sử dụng toán tử <<, chúng ta sẽ thực hiện kết hợp các string lại với nhau:

```
"a" << "b" << "c"
=> "abc"
```

Nếu kết hợp các mã unicode chúng ta sẽ có
```
'' << 97 << 98 << 99
=> "abc"
```
Tương tự với bài toán này nếu cần in ra Fizz hay Buzz chúng ta chỉ cần:
```
z    = '' << 122
fizz = '' << 70 << 105 << z << z
buzz = '' << 66 << 117 << z << z
```
Cuối cùng thay thế bởi những biến chứa giá trị tương ứng mà chúng ta đã khai báo ở trên:
```
@__  = '' << $-_ * ($- + $_) + @_
$___ = '' << $-_ * $- - $- << $-_ * ($- + @_) << @__ << @__
@___ = '' << $-_ * $- - $_ * $_ << $-_ * ($- + $_) - $_ << @__ << @__
```
Vì vậy, chúng ta đã có các số và chuỗi mà chúng ta sẽ cần để viết FizzBuzz, nhưng chúng ta sẽ lặp từ 1 đến 100 như thế nào? Đó là đệ quy. Chúng tôi sẽ định nghĩa một lambda thực hiện công việc, kiểm tra biến số so với 100 ở cuối và chạy lại lambda nếu nó nhỏ hơn 100 (bỏ qua yêu cầu không sử dụng chữ và số).
```
n = 0

fizzbuzz = -> {
  n += 1
  puts n % 15 == 0 ? 'FizzBuzz'
    :  n %  3 == 0 ? 'Fizz'
    :  n %  5 == 0 ? 'Buzz'
    :  n
  n < 100 ? fizzbuzz[] : 0
}

fizzbuzz[]
```
Rất dễ hiểu, chúng ta sẽ bắt đầu từ 0, tăng giá trị lên và in ra giá trị sau mỗi lần lặp. Chúng ta có thể gọi tới `lambda` ngay trong chính nội tại của nó, sử dụng `#[]` như là một `alias` của `#call`. Sau khi thay thế bằng các kí tự:
```
___ = -> {
  $. += _
  puts $. % $-_ == __ ? $___ + @___
    :  $. % $_  == __ ? $___
    :  $. % $-  == __ ? @___
    :  $.
  $. < 100 ? ___[] : __
}

___[]
```
Trông có vẻ OK rồi, tuy nhiên chúng ta cần thay thế phương thức puts, thật may khi Ruby có hỗ trợ `$>` là một `alias` của `$stdout`, bản chương trình hoàn thiện:
```
 1 _   = $$  / $$ #  1
 2 __  =  _  -  _ #  0
 3 @_  =  _  +  _ #  2
 4 $_  = @_  +  _ #  3
 5 $__ = @_  + $_ #  5
 6 $-_ = $__ * $_ # 15
 7 
 8 @__  = '' << $-_ * ($__ + $_) + @_ # z
 9 $___ = '' << $-_ * $__ - $__ << $-_ * ($__ + @_) << @__ << @__ # Fizz
10 @___ = '' << $-_ * $__ - $_ * $_ << $-_ * ($__ + $_) - $_ << @__ << @__ # Buzz
11 
12 (___ = -> { # the fizzbuzz lambda
13   $. += _   # increment n
14   $> << ($. % $-_ == __ ? $___ + @___ # "FizzBuzz" if mod-15
15        : $. % $_  == __ ? $___        # "Fizz" for 3
16        : $. % $__ == __ ? @___        # "Buzz" for 5
17        : $.) <<                       # Otherwise, n
18        ('' << $__ * @_)               # and a newline
19   $. < ($__ * @_) ** @_ ? ___[] : _   # Check n against 100.
20 })[] # Immediately invoke the lambda.
```
Refactor lại chúng ta sẽ có:
```
_=$$/$$;__=_-_;@_=_+_;$_=@_+_;$__=@_+$_;$-_=$__*$_
@__ =''<<$-_*($__+$_)+@_
$___=''<<$-_*$__-$__<<$-_*($__+@_)<<@__<<@__
@___=''<<$-_*$__-$_*$_<<$-_*($__+$_)-$_<<@__<<@__
(___=->{$.+=_;$><<($.%$-_==__ ?$___+@___:$.%$_==__ ?$___:$.%
$__==__ ?@___:$.)<<(''<<$__*@_);$.<($__*@_)**@_?___[]:_})[]
```
> Bên cạnh bài toán FizzBuzz, chúng ta có thể tham khảo ở [Repo này](https://github.com/threeifbywhiskey/narfnme) còn rất nhiều đoạn code hay với những bài toán kiểu như Fibonaci, vvv...vvv...
> 
Bài toán Fibonaci:
```
$_ = $$ / $$ # a = 1
@_ = $_      # b = 1
$. = $_ + $_ + $_  #  3 for 10
$. *= $.; $. += $_ # 10 for newline

($-_ = -> {
  $> << $_ << ('' << $.) # Output a.
  $_ += @_ # Add b to a.
  $> << @_ << ('' << $.) # Output b.
  @_ += $_ # Add a to b.
  $-_[] # Repeat ad infinitum.
})[]
```
Cảm ơn các bạn đã theo dõi và rất mong có những giây phút vui vẻ bên Ruby:

Tham khảo: [Non-Alphanumeric Ruby for Fun and Not Much Else](http://threeifbywhiskey.github.io/2014/03/05/non-alphanumeric-ruby-for-fun-and-not-much-else/)