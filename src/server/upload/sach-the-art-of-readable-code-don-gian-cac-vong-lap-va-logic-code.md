## Giới thiệu
Cuốn sách **"The Art of Readable Code"** là cuốn sách dành cho tất cả các developer - Những người mong muốn viết code sao cho "clean"

Nó là một cuốn sách: 
* Giúp cho các developer hiểu được các nguyên tắc để viết code sao cho dễ đọc, dễ chia sẻ, dễ bảo trì và mở rộng
* Không giống như các cuốn sách về các ngôn ngữ lập trình khác
* Đây là một cuốn sách trình bày súc tích, đi thẳng vào vấn đề với các ví dụ dễ hiểu, gắn liền với các công việc hàng ngày của một developer mà không phụ thuộc vào ngôn ngữ lập trình nào.

Cuốn sách gồm có 4 phần gồm:
* Surface-Level Improvements
* Simplifying loops and logic
* Reorganizing your code
* Selected topics 

Hôm nay, mình xin trích dẫn các nội dung trong phần II. Simplifying loops and logic của cuốn sách, để các bạn nếu ai chưa biết về cuốn sách này thì sẽ khơi gọi sự tò mò và tìm hiểu về cuốn sách hay ho và thiết thực này.

## Nội dung Part II. Đơn giản hóa các vòng lặp và logic
![](https://images.viblo.asia/4f7e7839-80bc-42b7-b158-6c39bc8a68c4.png)

Nhìn vào hình các bạn thấy gì, riêng mình thì mình thấy mệt :D, có khi nhiều người phải thốt lên là thật là chóng mặt.
Vậy các bạn thường thấy nó ở đâu? Hiển nhiên là trong dự án của chúng ta.

Đôi lúc, mình hay gặp phải có nhưng logic nó bị thừa hay xử lý quá cồng kềnh, và mình hỏi tại sao lại bị như vậy. Thường thì mình nghe đáp án là: mình chưa có suy nghĩ về việc phải refactor code của chính mình, do vội quá, hay đôi lúc lại là vì code trước đó là của người khác, hệ thống đã phát triển từ lâu, mình chưa đủ skill để dám refactor nó. Để giải quyết vấn đề này thì mình sẽ không bàn đến trong bài viết này.

Nhưng có khi nào, các bạn đọc logic của method và bị "bắt phải dừng lại" và buộc phải đi đọc lại những đoạn code trước đó không.
Nếu câu trả lời là có, thì bạn có muốn làm như vậy không? Hiển nhiên là KHÔNG.

Vậy, cuốn sách này bạn nên dành thời gian để đọc rồi. Vì mục tiêu của Chapter này là hãy viết các vòng lặp và các xử lý điều kiện tự nhiên nhát có thể để không phải khiến cho người đọc phải DỪNG LẠI và ĐỌC LẠI các dòng code trước đó

***Key idea***

**Make all your conditionals, loops, and other changes to control flow as “natural” as possible—written in a way that doesn’t make the reader stop and reread your code.**

### The Order of Arguments in Conditionals
Chúng ta có 2 xử lý code như sau:
``` ruby
# 1
if (age >= 18)

# 2
if (18 <= age)

```
Hay
``` ruby 
# 1
while (val_received < val_expected)

# 2
while (val_expected > val_received)

```

Với ví dụ trên, một câu hỏi là liệu nội dung nào sẽ dễ đọc hơn?
![](https://images.viblo.asia/ace1cc5f-e55e-4d3b-83d2-abb5f519e6f6.png)

Mình không rõ các bạn chọn sao, chứ mình là mình đều chọn đáp án là #1
Bởi vì chúng ta hay nói: Nếu các bạn từ 18 tuổi từ trở lên thì sẽ...; chứ chẳng ai nói nếu 18 tuổi nhỏ hơn hoặc bằng tuổi bạn thì sẽ ...
Tương tự, với val_received là giá trị mà chúng ta muốn kiểm tra nó, và nó đang được thay đổi theo vòng lặp. Còn val_expected là giá trị ổn định


**Và nguyên tắt mà tác giả cuốn sách đưa ra đó là : **

| Bên trái |Bên phải|
| -------- | -------- |
| Biểu thức hoặc tham số cần kiểm tra     | Biểu thức tham số được sử dụng để so sánh. Thường giá trị này sẽ ổn định|

### The Order of if/else Blocks
Cùng xem ví dụ tiếp theo nào
``` ruby
# Ex 1
if (a == b) do
	# Case One ...
else
	# Case Two ...
end
```
``` ruby
# Ex 2
if (a != b) do
	# Case Two ...
else
	# Case One ...
end
```
Rõ ràng, ví dụ [# Ex 1] sẽ  được lựa chọn là nên đúng không nào.

Tiếp tục kiểm tra tiếp xem nào
``` ruby
# Ex1
if (!file) do
   # Log an error
else
   # Actually do stuff
end
```

``` ruby
# Ex2
if (file) do
	# Actually do stuff
else
	# Log an error
end
```
Lựa chọn lần này nên là [#Ex1]

Thêm 1 ví dụ nữa nào 
``` ruby
if !url.include? "expand_all" do
   redirect_to items
else
  items.each do |i|
    ...
  end
  ...
end
```
Khi liếc nhìn dòng đầu tiên, não chúng ta nghĩ ngay đến trường hợp [expand_all]. Giống như khi ai đó nói, "Đừng nghĩ về một con voi màu hồng." Bạn không thể không nghĩ về điều đó — “đừng” bị át bởi “con voi hồng” khác thường hơn.

Ở đây, expand_all là con voi màu hồng của chúng ta. Vì đây là trường hợp thú vị hơn (và đây cũng là trường hợp tích cực), nên hãy giải quyết nó trước
``` ruby
if url.include? "expand_all" do
   # Interesting code
   # ...
else
  # Easy case
end
```

Thêm 1 ví dụ nữa để kết thúc cho chapter này nào
``` ruby
if (isPanda) do
	# Case One ...
else 
	# Case Two ...
end
```

``` ruby
if (!isPanda) do
	# Case Two ...
else 
	# Case One ...
end
```
![](https://images.viblo.asia/be23b645-152e-4244-92e1-6410fd75a769.png)

**Mục tiêu của chapter này là**
* Ưu tiên xử lý trường hợp khẳng định trước thay vì trường hợp tiêu cực như  if (debug) thay vì (!debug)
* Ưu tiên giải quyết trường hợp đơn giản trước để có thể trả về kết quả sớm nhất
* Ưu tiên giải quyết các trường hợp dễ thấy trước

### The ?: Conditional Expression
Câu hỏi là nên hay ko nên sử dụng **biểu thứ 3 ngôi**
Chúng ta cùng xem ví dụ cụ thể nào
Ví dụ 1:
``` ruby
time_str << (hour >= 12) ? "pm" : "am"
```

``` ruby
if hour >= 12 do
   time_str << "pm"
else
   time_str << "am"
end
```

Ví dụ 2:
``` ruby
return exponent >= 0 ? mantissa * (1 << exponent) : mantissa / (1 << -exponent)
```
Mục đích thực sự khi thực hiện sử dụng biểu thức 3 ngôi là để gọi code và ép chúng trên dùng 1 dòng. Vậy qua ví dụ 2, có nên hay không lúc nào cũng cần phải cố gắng đưa code lên cùng 1 dòng.
![](https://images.viblo.asia/ece2cf81-7e3e-4b95-abd0-cab9948c1774.png)

Câu trả lời rõ ràng là không nhỉ.
Vì thay vì giảm số lượng line code, thì vô tình chúng ta lại tăng thời gian để người đọc hiểu về code đó :D 

Vì vậy hãy nhớ
Thay vì giảm số lượng line code thì ta nên **giảm** thiểu thời gian cần thiết để người đọc có thể **hiểu** code đó

**Lời khuyên của tác giả:**
* Theo mặc định, sử dụng **if / else**. 
* **Ternary ?:** chỉ nên được sử dụng cho những trường hợp **đơn giản nhất**

### Returning Early from a Function
``` ruby
def contains str, substr
  is_contain = false
  if str == nil || substr == nil do
    is_contain = false
  end
  
  if substr.blank? do
    is_contain = true
  end
  
  ...
  return is_contain
end
```
``` ruby
def contains str, substr
  is_contain = false
  return false if str == nil || substr == nil
  
  return true if substr.blank?
  ...
end
```
**Lời khuyên của tác giả qua ví dụ này đó là hãy cố gắng trả về kết quả sớm nhất cho xử lý nếu có thể**

### Minimize Nesting
Và đây là nội dung cuối cũng mà mình muốn giới thiệu trong bài viết lần này
``` ruby
if user_result == SUCCESS do
  if permission_result != SUCCESS do
    reply.writeErrors "error reading permissions"
    reply.done()
    return
  else
    reply.writeErrors ""
else
  reply.writeErrors user_result
end
reply.done()
```
Và đây là code sau khi refactor
``` ruby
if user_result != SUCCESS do
  reply.writeErrors user_result
  return reply.done()
end

if permission_result != SUCCESS do
    reply.writeErrors "error reading permissions"
    return reply.done()
end

reply.writeErrors ""
reply.done()
```

Mục tiêu mà tác giả đưa ra là **đừng nên TRÁNH lồng quá nhiều if hay vòng lặp với nhau**

Mình nhắc một điều: Bên trên là **LỜI KHUYÊN** - chứ không phải là tiên quyết phải làm theo. Chúng ta nên lựa chọn cách xử lý phù hợp với ngữ cảnh của bài toàn của mình nhé

Bên trên là toàn bộ review của mình trong chapter 7. Hy vọng đây có thể là nguồn cảm hứng để các bạn có thể tìm và đọc toàn bộ cuốn sách này