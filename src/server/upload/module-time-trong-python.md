Chào các bạn trong bài viết này, mình sẽ giới thiệu với các bạn về Mobule Time trong Python.Mình sẽ giải thích cho các bạn hiểu về khái niệm của chúng là gì, cú pháp và cách xử dụng của chúng. Các bạn cùng tìm hiểu trong bài viết của mình nhé!


----

Trong bài này, chúng ta sẽ tìm hiểu chi tiết về mô-đun `Time`. Chúng ta sẽ học cách sử dụng các hàm liên quan đến thời gian khác nhau được xác định trong mô-đun `time` và các ví dụ.

Python có một mô-đun được đặt tên là `time` để xử lý các tác vụ liên quan đến thời gian. Để sử dụng các chức năng được xác định trong mô-đun, trước tiên chúng ta cần import mô-đun.

``` html
import time
```

----

Dưới đây là các hàm liên quan đến thời gian thường được sử dụng

####  Python time.time()

Hàm `time ()` trả về thời gian chi tiết đến số giây.

``` html
import time
seconds = time.time()
print("Seconds since epoch =", seconds)	
```

----

####  Python time.ctime()

Hàm `time.ctime ()` nhận vào thời gian dưới dạng đối số và trả về một chuỗi biểu thị thời gian hiện tại.

``` html
import time

# seconds passed since epoch
seconds = 1545925769.9618232
local_time = time.ctime(seconds)
print("Local time:", local_time)	
```

Nếu bạn chạy chương trình, kết quả sẽ như sau:

``` html
Local time: Thu Dec 27 15:49:29 2018
```



----

####  Python time.sleep()


Hàm `sleep ()`sẽ thực hiện tạm dừng luồng xử lý hiện tại trong một thời gian nhất định(thời gian được tính bằng giây).
``` html
import time

print("This is printed immediately.")
time.sleep(2.4)
print("This is printed after 2.4 seconds.")
```

----

#### Python time.localtime()
Hàm `localtime ()` lấy số giây được truyền vào  làm đối số và trả về `struct_time` theo giờ local hiện tại.

``` html
import time

result = time.localtime(1545925769)
print("result:", result)
print("\nyear:", result.tm_year)
print("tm_hour:", result.tm_hou
```

Khi bạn chạy chương trình, kết quả sẽ như sau:

``` html
result: time.struct_time(tm_year=2018, tm_mon=12, tm_mday=27, tm_hour=15, tm_min=49, tm_sec=29, tm_wday=3, tm_yday=361, tm_isdst=0)

year: 2018
tm_hour: 15
```
----

#### Python time.gmtime()

Hàm `gmtime ()` lấy số giây được truyền vào làm đối số và trả về `struct_time` sẽ là giờ  **UTC**.

``` html
import time

result = time.gmtime(1545925769)
print("result:", result)
print("\nyear:", result.tm_year)
print("tm_hour:", result.tm_hour)
```
Khi bạn chạy chương trình, kết quả sẽ như sau:
``` html
result = time.struct_time(tm_year=2018, tm_mon=12, tm_mday=28, tm_hour=8, tm_min=44, tm_sec=4, tm_wday=4, tm_yday=362, tm_isdst=0)

year = 2018
tm_hour = 8
```
----

#### Python time.mktime()
Hàm `mktime ()` sẽ  nhận  `struct_time`(hoặc một tuple chứa 9 phần tử tương ứng với `struct_time`) làm đối số và trả về số giây đã trôi qua theo giờ local. Về cơ bản, nó sẽ  là hàm nghịch đảo của hàm  `localtime ()`.

``` html
import time

t = (2018, 12, 28, 8, 44, 4, 4, 362, 0)

local_time = time.mktime(t)
print("Local time:", local_time)
```

----

Mình sẽ có Ví dụ dưới đây để chỉ ra  `mktime ()` và `localtime ()` có liên quan như thế nào với nhau.

``` html
import time

seconds = 1545925769

# returns struct_time
t = time.localtime(seconds)
print("t1: ", t)

# returns seconds from struct_time
s = time.mktime(t)
print("\s:", seconds)
```

Khi bạn chạy chương trình, kết quả sẽ như sau:

``` html
t1:  time.struct_time(tm_year=2018, tm_mon=12, tm_mday=27, tm_hour=15, tm_min=49, tm_sec=29, tm_wday=3, tm_yday=361, tm_isdst=0)

s: 1545925769.0
```

----

#### Python time.asctime()

Hàm `asctime ()` sẽ nhận  `struct_time` (hoặc một tuple chứa 9 phần tử tương ứng với `struct_time`) làm đối số và trả về thời gian chi tiết cụ thể theo format từ ngày tháng năm đến thời gian hiện tại tính đến đơn vị giây.

``` html
import time

t = (2018, 12, 28, 8, 44, 4, 4, 362, 0)

result = time.asctime(t)
print("Result:", result)
```

Khi bạn chạy chương trình, kết quả sẽ như sau:

``` html
Result: Fri Dec 28 08:44:04 2018
```

----

#### Python time.strftime()

Hàm `strftime ()` nhận `struct_time` (hoặc tuple tương ứng với nó) làm đối số và trả về giá trị thời giạn dựa vào format mà bạn quy định.
``` html
import time

named_tuple = time.localtime() # get struct_time
time_string = time.strftime("%m/%d/%Y, %H:%M:%S", named_tuple)

print(time_string)
```

Khi bạn chạy chương trình, kết quả sẽ như sau:
``` html
12/28/2018, 09:47:41
```

Dưới đây `%Y`, `%m`, `%d`, `%H` sẽ được quy định .
* `%Y`: Năm sẽ được định dạnh [0001,..., 2018, 2019,..., 9999]
* `%m`: Tháng sẽ được định dạnh [01, 02, ..., 11, 12]
* `%d`: Ngày sẽ được định dạnh[01, 02, ..., 30, 31]
* `%H`: Giờ sẽ được định dạnh[00, 01, ..., 22, 23]
* `%M`: Phút sẽ được định dạnh [00, 01, ..., 58, 59]
* `%S`: Giây sẽ được định dạnh [00, 01, ..., 58, 59]

----

#### Kết Luận
Dưới đây mình đã giới thiệu với các bạn về  Module`Time`cũng như 1 số hàm `Time` thường xuyên được sử dụng trong Python
Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.

---

### Tham Khảo chi tiết hơn

https://www.programiz.com/python-programming/time