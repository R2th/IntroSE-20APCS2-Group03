Phạm vi bài viết này chúng ta cùng tìm hiểu ít nhiều về `exception` trong ruby. Những điều cơ bản về cách làm việc với các ngoại lệ. 
Chắc hẳn bạn đã gặp phải nhiều các ngoại lệ trong các chương trình Ruby của mình, nhưng bạn có thể không  hiểu tường tận về các lỗi này đến từ đâu. Để bắt đầu, chúng ta sẽ cùng thảo luận về khái niệm `exception`, cũng như các loại ngoại lệ khác nhau và mức độ nghiêm trọng của chúng.
Sau đó, bài viết sẽ đưa ra một số kỹ thuật cơ bản để xử lý các ngoại lệ phổ biến khi chúng xảy ra trong đoạn mã code của bạn. 
Cuối cùng thì sẽ hướng đến việc có thể sử dụng các lớp ngoại lệ tùy chỉnh.

### Exception là gì?

Một `exception` đơn giản chỉ là một trạng thái ngoại lệ trong đoạn mã code. Đó là cách mà Ruby để cho bạn biết rằng đoạn code của bạn đang chạy không như mong đợi. Nếu ngoại lệ được raise ra và code của bạn không xử lý ngoại lệ thì chương trình sẽ bị lỗi và Ruby sẽ đưa ra thông báo lỗi đang gặp phải.

*Cùng xem ví dụ sau:*

```
333 + "bia cua dan ba"
# Program execution stops
#=> TypeError: String can't be coerced into Fixnum
```

### Phân cấp các class exception

Ruby cung cấp một hệ thống phân cấp các class built sẵn để đơn giản hóa việc xử lý ngoại lệ. 
Trong thực tế, tên các ngoại lệ mà bạn thấy khi chương trình của bạn gặp lỗi, chẳng hạn như `TypeError` thực ra là các tên `class`. `Exception` là class  ở trên cùng của cây phân cấp. `Exception` cũng có có một số `subclass`, nhiều trong số đó có các lớp con cháu của riêng chúng.

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
  StandardError
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
    RuntimeError
    SystemCallError
      Errno::*
    ThreadError
    TypeError
    ZeroDivisionError
  SystemExit
  SystemStackError
  fatal
  ```
 
Hãy dành một chút thời gian để kiểm tra một số class trong hệ thống phân cấp này và suy nghĩ về thời điểm bạn có thể gặp phải chúng. Chắc hẳn rằng bạn đã thấy một số ngoại lệ được nêu ra trong các chương trình của mình khi viết chương trình với Ruby.


Bạn đã từng nhấn `ctrl-c` để thoát khỏi chương trình chưa? Làm như vậy thực sự đặt ra một ngoại lệ thông qua lớp `Interrupt`.

- `SyntaxError`: đúng với tên gọi của mình, nó sẽ được raise ra khi Ruby cố gắng thực thi mã chứa cú pháp không hợp lệ. Lỗi này thực sự trông quen thuộc, chẳng hạn như khi định nghĩa một method mà thiếu mất `def` hay `end`..vv...

- `SystemStackError` được raise trong trường hợp tràn ngăn xếp. Bạn có thể đã thấy ngoại lệ này nếu bạn đã chạy một vòng lặp vô hạn đệ quy trong chương trình của bạn.

- `StandardError` thì dễ nhận biết và có các lớp con sau: `ArgumentError`, `TypeError`, `ZeroDivisionError`, và `NoMethodError`.

### Cách xử lý một Exception state

**1.Khối lệnh `begin/rescue`:**

việc sử dụng `begin/rescue` bao quanh đoạn mã code để xử lý lỗi có thể khiến chương trình của bạn không bị chết nếu ngoại lệ bạn đã chỉ định được raise ra.

`begin/rescue` về bản chất cũng chính là `try{}..catch()` trong java.

```
1| begin
2|  // khối lệnh được thực thi
3| rescue TypeError
4|  // xử lý ngoại lệ ở đây
5| end
```

Khi đoạn mã code ở ví dụ trên raise ra một `TypeError` thì sẽ thực thi mã code ở `rescue` thay vì việc thoát khỏi chương trình.
Nếu như đoạn code ở line2 mà không phát sinh ra một ngoại lệ nào thì chương trình vẫn chạy bình thường.

Muốn xử lý ngoại lệ nào phát sinh thì chúng ta đặt nó sau `rescue` như ở line3.

Nếu không có kiểu ngoại lệ nào được chỉ định thì mặc định sẽ bắt tất cả các ngoại lệ của lớp `StandardError` và xử lý chúng.

Chú ý nên xác định cụ thể, rõ ràng ngoại lệ cần xử lý, không nên dùng:

```
rescue Exception => e
```
Bởi vì thằng `Exception` là lớp cha to nhất trong hệ thống phân cấp các lỗi trong ruby. Khi gọi như trên sẽ phải lookup tất cả các ngoại lệ trong toàn bộ hệ thống phân cấp exceptions và tìm ra chính xác exception mà nó gặp phải. điều này hạn chế tốc độ xử lý rất nhiều.


- **xử lý nhiều ngoại lệ khác nhau có thể xảy ra với `rescue`:**

```
begin
  # some code at risk of failing
rescue TypeError
  # take action
rescue ArgumentError
  # take a different action
end
```

- **thực hiện cùng một hành động cho nhiều loại ngoại lệ:**
  
```
begin
  # some code at risk of failing
rescue ZeroDivisionError, TypeError
  # take action
end
```

**2. Đối tượng Exception và các phương thức Built-In**

`Exception objects` chỉ là các đối tượng Ruby bình thường mà chúng ta có thể thu được thông tin hữu ích từ đó. Ruby cung cấp các `built-in behaviors` cho các đối tượng này mà bạn có thể muốn sử dụng trong khi xử lý ngoại lệ hoặc debug. Xem thêm tài liệu `Exception` của Ruby tại [đây](https://ruby-doc.org/core-2.4.0/Exception.html)


**Vậy dùng `exception object` như thế nào?**

```
rescue TypeError => e
```
Cú pháp trên xử lý bất kỳ `TypeError` nào và lưu trữ `exception object` trong `e`.
Ruby cung cấp một số instance method hữu ích: `Exception#message` và `Exception#backtrace` trả về một thông báo lỗi và một backtrace liên kết với ngoại lệ tương ứng.

*Ví dụ:*

```
begin
  # code at risk of failing here
rescue StandardError => e   # storing the exception object in e
  puts e.message            # output error message
end
```

*Chú ý rằng các `exception object` chỉ là các đối tượng Ruby bình thường và các kiểu ngoại lệ khác nhau, chẳng hạn như `ArgumentError` và `NoMethodError`, thực sự là các tên lớp. Vì vậy, chúng ta thậm chí có thể gọi `Object#class` trên một `exception object` để trả về tên lớp của nó.*

```
e.class
#=> TypeError
```


**3. ensure**

Khi muốn chương trình luôn luôn được thực hiện dù `exception` có raise ra hay không, thì ta sử dụng `ensure` thêm vào  sau `rescue` cuối cùng trong khối `begin/rescue`. 

Nó thực chất giống như `finally` trong khi sử dụng `try/catch` của java.

Ví dụ:

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

Vậy `ensure` thêm vào khi nào thì hữu ích? 
Như ví dụ đơn giản là quản lý tài nguyên; đoạn code trên mô tả làm việc với file. Dù có hay không có ngoại lệ được raise ra khi làm việc với file thì đoạn mã này luôn đảm bảo rằng file sẽ được close.


**4. retry**

Dùng `retry` sẽ giúp lặp lại việc thực hiện đoạn mã trong khối lệnh `begin`. 

- Cú pháp:
```
begin
  // khối lệnh được thực thi
rescue
  // xử lý ngoại lệ ở đây
  retry // thực hiện lại code trong khối begin
end
```
Tuy nhiên, cần phải chú ý đến việc sử dụng lệnh này vì nó sẽ tạo ra vòng lặp vô hạn nếu bạn không xử lý nó tốt.

Để tránh việc này, bạn nên đặt giới hạn về số lần bạn muốn thử lại để thực thi.

*Ví dụ:*

```
RETRY_LIMIT = 5

begin
  attempts = attempts || 0
  # do something
rescue
  attempts += 1
  retry if attempts < RETRY_LIMIT
end
```

**Raising Exceptions Manually**

Ruby thực sự cung cấp cho bạn khả năng tự tạo ra `exception` bằng cách gọi `Kernel#raise`.  Điều này cho phép bạn chọn loại ngoại lệ raise ra và thậm chí đặt luôn thông báo lỗi của riêng mình.

```
raise TypeError.new("Something went wrong!")

raise TypeError, "Something went wrong!"

```

`Raise` là phương thức giúp bạn đưa ra một ngoại lệ. Bất cứ khi nào gặp lệnh `raise` thì chương trình của bạn sẽ ngay lập tức đưa ra `Exception` (nếu không gặp ngoại lệ nào thì đưa ra `RuntimeError` - một lớp con của`StandardError`).


**Raising Custom Exceptions**

Ruby cho phép linh động trong việc tùy chỉnh tạo một class execption.

- Cú pháp:
```
class ExceptionCustomClassName < StandardError; end
```

Khi sử dụng một lớp ngoại lệ tùy chỉnh, bạn có thể cụ thể về lỗi mà chương trình của bạn gặp phải bằng cách đặt tên cho lớp. Làm như vậy có thể hỗ trợ việc debug.

Ví dụ:

```
# khai báo 1 class exception
class ValidateAgeError < StandardError
  def validate_age(age)
    raise ValidateAgeError, "invalid age" unless (0..105).include?(age)
  end
end

# sử dụng
begin
  validate_age(age)
rescue ValidateAgeError => e
  # take action
end
```


Hy vọng rằng bài viết này có thể giúp ích cho bạn về cách làm việc với các ngoại lệ trong các chương trình Ruby. 

**Thanks for your reading!**