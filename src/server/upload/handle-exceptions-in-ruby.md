## Exception là gì?

Exception (ngoại lệ) là một loại đối tượng đặc biệt, một thể hiện của class Exception. Hiểu đơn giản, nó là lỗi, là những event không mong muốn xảy ra trong quá trình thực thi chương trình, nó sẽ làm gián đoạn luồng hoạt động bình thường của chương trình.

Trong Ruby, exception handling là một quy trình mô tả cách chúng ta sẽ xử lý các lỗi xảy ra trong một chương trình. Các exceptions hoạt động tương tự như `break`, khiến con trỏ (pointer) nhảy đến một vị trí khác; vị trí này có thể là một layer khác của ngăn xếp chương trình. Theo mặc định, các chương trình Ruby sẽ bị kết thúc khi có một ngoại lệ xảy ra và không được xử lý.

## Khi nào cần xử lý?

Chúng ta thường có xu hướng muốn xử lý tất cả các trường hợp ngoại lệ có thể xảy ra, nhưng lại khó trong việc chọn giải pháp thích hợp và thường chỉ log lại một `message` và tiếp tục chương trình. Việc này vô tình dẫn đến việc phải viết thêm code để xử lý các lỗi thực sự không cần thiết. 

Một quy tắc đơn giản khi xử lý các ngoại lệ là chúng ta chỉ nên xử lý những thứ mà mình có thể thực hiện một số action hợp lý để sửa lỗi và cho phép chương trình tiếp tục hoạt động.
Cơ chế ngoại lệ trong Ruby rất mạnh mẽ nhưng thường bị lạm dụng.

## Phân loại

Ngoại lệ là một khái niệm thường được sử dụng trong Ruby. Thư viện chuẩn của Ruby định nghĩa khoảng 30 sub-class khác nhau của các ngoại lệ, một trong số đó có các sub-class riêng của chúng. 

![](https://images.viblo.asia/7ee94477-f925-428d-9b56-60ba8b1c6640.jpg)

Đơn giản hóa, ngoại lệ có thể chia ra thành 3 loại: 
* Ngoại lệ bất thường có thể xảy ra (possible)
* Ngoại lệ thông thường có thể xảy ra (probable)
* Ngoại lệ không thể tránh (inevitable)

### Possible Exceptions

Về mặt lý thuyết, `Possible Exceptions` là các ngoại lệ có thể xảy ra, nhưng thực tế nó không thể xảy ra trong hệ thống. Khi những loại ngoại lệ này xảy ra, đó thường là do hệ thống thực sự đã bị hỏng. Trong trường hợp này, sẽ không thể phục hồi và chúng ta không nên cố gắng xử lý các ngoại lệ.

### Probable Exceptions

`Probable Exceptions` có thể xảy ra trong quá trình thực thi chương trình. Ví dụ: lỗi REST do vấn đề DNS gây ra. 

Đây là những ngoại lệ chúng ta có thể thấy trước được khi phát triển chương trình. Và trong một số trường hợp, có thể có luôn giải pháp cho những ngoại lệ này. Đây là những ngoại lệ mà chúng ta nên tập trung để xử lý.

### Inevitable Exceptions

`Inevitable Exceptions` sẽ xảy ra khá thường xuyên. Xu hướng phổ biến hiện tại cho phép những ngoại lệ này xảy ra trong chương trình bằng cách chủ động phát hiện và phân nhánh xung quanh nó.

Nhưng chúng ta không nên sử dụng các ngoại lệ để kiểm soát luồng. Nếu có thể xác định một hành động bất sẽ tạo ra ngoại lệ thì chúng ta không nên thực thi hành động đó.

## Exception handling

Như đã nói, các chương trình Ruby sẽ kết thúc khi có một ngoại lệ xảy ra. Nhưng chúng ta có thể tiếp tục thực thi chương trình bằng cách khai báo các trình xử lý ngoại lệ (exception handlers). Trình xử lý ngoại lệ là một block sẽ được thực thi nếu một ngoại lệ xảy ra trong quá trình thực thi một số block code khác. 

Raising một ngoại lệ có nghĩa là dừng thực thi luồng chạy bình thường của chương trình và chuyển luồng điều khiển sang block xử lý ngoại lệ nơi sẽ xử lý vấn đề đang gặp phải hoặc thoát khỏi chương trình hoàn toàn phụ thuộc vào việc đã có `rescue` clause hay chưa.

`Rescue` là một khái niệm cơ bản trong Ruby. Nếu không khai báo nó, chương trình sẽ kết thúc; ngược lại, luồng điều khiển sẽ chuyển qua block `rescue` và tiếp tục được xử lý. Ruby yêu cầu form chung, ngoại lệ hoặc lỗi được raise phải làm trong block `begin-rescue`. Cú pháp như sau:

```ruby
begin
   #... process
   raise
   # raise an exception (optional)
rescue =>
    #... error handler
else
    #... executes when no error
ensure
    #... always executed
end
```

Để làm rõ hơn, chúng ta cùng phân tích ví dụ:

```ruby
def raise_and_rescue     
  begin
    puts 'Processing...'
       
    raise 'Creating an exception!'
    puts 'After exception!' 
  rescue    
    puts 'Handling exception...'    
  end    
   
  puts 'Outside begin block!'    
end  
  
raise_and_rescue  
```

Kết quả,
```ruby
Processing…
Handling exception...
Outside begin block!
```

Ở chương trình trên, một ngoại lệ được `raise` trong `begin` block (raise block) làm gián đoạn luồng thực thi của chương trình. Code trong `rescue` block được sử dụng để xử lý ngoại lệ này và tiếp tục thực hiện chương trình.

### raise 
Lệnh được sử dụng để raise một ngoại lệ với các cú pháp:
```ruby
raise
```
Cú pháp này được sử dụng để raise lại ngoại lệ hiện có. Nó thường được sử dụng bởi trình xử lý ngoại lệ khi một ngoại lệ bị ngắt trước khi chuyển nó vào.

```ruby
raise "error message"
```
Cú pháp này được sử dụng để tạo một ngoại lệ `RuntimeError` và nó làm tăng call stack.

```ruby
raise ExceptionType, "error message"
```
Trong cú pháp này, đối số đầu tiên được sử dụng để tạo một ngoại lệ và sau đó gán message vào đối số thứ hai.

```ruby
raise ExceptionType, "error message" condition
```

Đối số đầu tiên được sử dụng để tạo một ngoại lệ và sau đó gán message vào đối số thứ hai. Cũng có thể đặt một câu lệnh điều kiện để raise một ngoại lệ.

### rescue

Block rescue sẽ được thực thi khi có một ngoại lệ xảy ra. 
```ruby
rescue ...error handler...
```

***Không nên rescue tất cả các ngoại lệ***

Chúng ta có thể buộc Ruby bắt tất cả các ngoại lệ có thể có (ngoại trừ các ngoại lệ nghiêm trọng, không thể xử lý được) bằng cách chỉ định "Exception" trong rescue, nhưng nó được coi là hành vi xấu do cách cấu trúc phân cấp ngoại lệ của Ruby. 

Tất cả các ngoại lệ và lỗi đều kế thừa từ class Exception và nhiều trong số chúng (các ngoại lệ bên ngoài hệ thống phân cấp `StandardError`) được Ruby sử dụng riêng cho các chức năng chung của môi trường nội bộ Ruby.

Ví dụ, `SignalException::Interrupt` được sử dụng để báo hiệu rằng Ctrl-C đã được sử dụng trong quá trình thực thi một tập lệnh.

```ruby
begin
  # ...
rescue Exception => e
  # ...
end
```
Việc sử dụng cấu trúc này sẽ rescue mọi ngoại lệ và lỗi phát sinh, từ ngắt đến lỗi cú pháp và thậm chí cả lỗi bộ nhớ, vì vậy hãy sử dụng nó một cách tiết kiệm và thận trọng.

Nếu rescue mọi ngoại lệ được raise trong Ruby, thì ngoại lệ `Interrupt` sẽ không hoạt động như mong đợi, và điều này có thể phá vỡ chương trình theo một cách vô tình nào đó. 

Vì có nhiều rủi ro như trên, chúng ta nên cụ thể hóa ngoại lệ hơn là bắt và xử lý tất cả các trường hợp ngoại lệ có thể xảy ra.

***Gán lỗi vào một biến***

Theo mặc định, `begin-rescue` sẽ xử lý mọi trường hợp của class `StandardError` (tên class chung nhất). Cái này không bao gồm lỗi method, type, runtime và mọi lỗi custom được thiết kế để xử lý trong ứng dụng Ruby. Để rescue mọi `StandardError`, chỉ cần để mã được chỉ định trong một block `begin-rescue`:

```ruby
begin
  # ...
rescue => error
  # ...
end
```
Khi một ngoại lệ `StandardError` được tạo ra trong begin, một thể hiện của nó sẽ được chuyển đến rescue dưới dạng biến error.

```ruby
begin
  # ...
rescue StandardError => error
  # ...
end
```

Cú pháp trên sẽ bắt `StandardError` và tất cả các sub-types của nó - nghĩa là, nó sẽ bắt bất kỳ class nào được raise kế thừa từ StandardError. Và đây chính là vấn đề. Chúng ta chỉ nên rescue những trường hợp ngoại lệ mà thực sự có thể thực hiện. Các trường hợp ngoại lệ khác nên được skip qua.

***Cụ thể hóa ngoại lệ***
```ruby
begin
  # ...
rescue class_name_error => error
  # ...
end
```

***Multiple rescues***

Nhưng, điều gì sẽ xảy ra nếu chúng ta muốn giải cứu nhiều hơn một loại ngoại lệ? 

Giống như một chuỗi `if-elsif-else`, một block `begin-rescue` có thể có nhiều `rescue-which` khi được kết hợp với việc kiểm tra class `StandardError`, cho phép đối ứng một cách hợp lý với bất kỳ và tất cả các vấn đề có thể phát sinh:

```ruby
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

Nhiều `rescue` có thể được sử dụng trong cùng một chương trình có nghĩa là nếu một ngoại lệ không được xử lý bởi rescue này, thì một rescue khác chắc chắn sẽ xử lý ngoại lệ đó. Nếu không có rescue nào khớp hoặc nếu một ngoại lệ xảy ra bên ngoài block `begin-end`, thì Ruby sẽ di chuyển lên ngăn xếp và tìm kiếm một trình xử lý ngoại lệ trong trình gọi.

### else

Lệnh này nằm giữa `rescue` và `ensure` block, chỉ thực thi khi không có ngoại lệ nào xảy ra.

```ruby
begin
  puts "no exception"
rescue    
  puts "rescue..."
else
  puts "else block"  
ensure
  puts "ensure block"
end 
 
# Output
# no exception
# else block
# ensure block
```

### ensure

Lệnh này đảm bảo rằng các lệnh bắt buộc sẽ được thực thi ở cuối block, cho dù ngoại lệ có được raise và rescue hay chương trình kết thúc do một ngoại lệ không được xử lý. Block này luôn cho kết quả đầu ra, đặt dưới rescue block.
```ruby
begin       
  raise "exception"
  puts "any..."
rescue    
  puts "rescue block"    
ensure
  puts "ensure block"
end   

# Output
# rescue block
# ensure block
```

## Kết luận

Ruby cũng cung cấp các methods riêng biệt giúp đơn giản việc xử lý các ngoại lệ với class `Exception`. Trong Ruby, tất cả các ngoại lệ và lỗi đều kế thừa class Exception, do vậy việc xử lý ngoại lệ có thể đa dạng hơn nhờ vào hệ thống phân cấp được thiết kế của các ngoại lệ.

Bài viết sau, chúng ta sẽ cùng tìm hiểu thêm về chúng và các cách xử lý ngoại lệ trong Rails.

***Tham khảo***

https://stackify.com/rescue-exceptions-ruby