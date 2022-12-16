### Lời mở đầu
Với những ai từng làm chatbot cho Tiếng Việt chắc đều biết phần tiền xử lí thời gian là phần cực kỳ mệt và hiện giờ tôi đang làm phần này đây :(. Vì khuôn khổ bài viết có hạn, tôi sẽ chỉ nêu ra một số vấn đề xảy ra trong khi xử lí ngày tháng Tiếng Việt và cách giải quyết vấn đề đó, nếu còn thiếu sót nhờ các bạn góp ý thêm.

### Vấn đề bạn chắc chắn gặp phải
Như các bạn đã biết, khi làm chatbot cho Tiếng Việt, dù ít hay nhiều chúng ta luôn sẽ động chạm tới phần xử lí ngày tháng, thời gian. Ví dụ như trong dự án đặt phòng, đặt vé máy bay, đặt lịch họp, hỏi các sự kiện đã từng xảy ra hoặc sắp tới xảy ra, hỏi thời lượng sự kiện, v.v...
Thường thì các bạn sẽ gặp những câu hỏi như sau:

- Cho tôi đặt lịch họp từ ngày ... đến ngày ...
- Tôi muốn biết các sự kiện diễn ra trong các ngày ..., ..., ... tháng ...
- Trong khoảng thời gian ... đến ... còn phòng không
- Tuần trước có sự kiện gì
- Tôi muốn gặp bạn vào tuần sau
- Tháng này thì sao
- Tôi muốn xin nghỉ ngày ... và ngày ... tháng ...

Trên đây chỉ là một số trường hợp bạn gặp phải (còn nhiều hơn nhưng tôi không rảnh liệt kê :().

À quên, trước khi đến phần xử lí các case liên quan đến ngày tháng thì bạn phải có bước tiền xử lí là trích xuất ngày tháng từ câu hỏi của người dùng. Chú ý, không phải ngày tháng nào cũng có cùng một format, ví dụ:

-  tháng trước, tháng này, tháng sau
-  tuần trước, 2 tuần trước, tuần tới
-  ngày 30-04-2020, ngày 30/04/2020
-  ngày 7 tháng 2
-  mùng 1 tháng giêng
-  thứ hai tuần trước

### Cách giải quyết
Đầu tiên chúng ta sẽ tìm cách trích xuất ngày tháng trong câu hỏi.

Ở đây, tôi dùng kỹ thuật n-gram và kỹ thuật matching:
1. N-gram: tôi sử dụng vòng lặp duyệt từ trái qua phải, matching các từ trong tin nhắn người dùng với các từ có trong cơ sở dữ liệu. Nhưng như thế độ chính xác không cao nên ở mỗi phần tử duyệt (ở đây chỉ một từ trong câu), tôi dùng n-gram để bắt từ tiếp theo của từ hiện tại, tạo thêm dữ kiện để duyệt. Minh họa ở hình dưới, số n-gram tôi dùng ở đây là từ 2 -> 8 từ
 
![](https://images.viblo.asia/814a66c1-c28d-412e-8b05-f8e3e32c431d.jpg)

Ví dụ về đoạn code sử dụng n-gram, mình cũng lợi rất nhiều khi tham khảo ý tưởng của đàn anh.
```
n_grams = (8, 7, 6, 5, 4, 3, 2)
    i = 0
    while i < len(words):
        has_gram = False
        token = None
        for n_gram in n_grams:
            token = ' '.join(words[i:i + n_gram])
            if token in data:
                w = words[i - 1]
                i += n_gram
                has_gram = True
                break
        if has_gram is False:
            token = words[i]
            i += 1
```

2. Sử dụng regex và một núi if-else để bắt ngày tháng: cách này mình không dùng vì mình không cam đoan là bắt hết tất cả các case. Bạn có thể sử dụng thư viện re của python để vọc thử :').

Tiếp theo, chúng ta đi vào xử lí đống ngày tháng đã được trích xuất.

Ở đây, tôi cũng chia thành 2 format ngày tháng: date format string và date theo kiểu Việt (tháng, tuần, năm, ...)

Với dạng date format string thì dễ rồi, bạn chỉ cần dùng regex để trích xuất ra là đc. Tham khảo:
https://stackoverflow.com/questions/4709652/python-regex-to-match-dates
```
date="13-11-2017"

x=re.search("^([1-9] |1[0-9]| 2[0-9]|3[0-1])(.|-)([1-9] |1[0-2])(.|-|)20[0-9][0-9]$",date)

x.group()
```

Giải thích cái pattern 1 chút: 

- "^ ... $": bắt đầu chuỗi ... kết thúc chuỗi
- "[1-9]": các số từ 1 đến 9
- "1[1-9]": các số từ 11 đến 19
- "|": phép or
- "([1-9] |1[0-9]| 2[0-9]|3[0-1])": đoạn này chỉ ngày, từ 1 đến 31 ngày
- "(.|-)": ngày tháng năm phân tách bởi dấu chấm, gạch, và dấu thẳng
- "([1-9] |1[0-2])": tháng từ 1 đến 12
- "20[0-9][0-9]": năm bắt đầu từ 20xx

Với dạng date theo kiểu Việt, tôi dùng một núi if-else kết hợp với thư viện datetime và calendar của python để xử lí.

Do tính chất công việc nên tôi cũng không thể show chi tiết cho bạn xem được, đây là 1 vài đoạn code ví dụ:

```
import datetime
import calendar
import pytz

# bạn có thể dùng múi giờ Asia/Ho_Chi_Minh
tz = pytz.timezone(timezone="UTC")
# Thời điểm hiện tại
now = datetime.datetime.now(tz=tz)
# Hôm nay
today = datetime.date(now.year, now.month, now.day)

# Ở đây mình đã quy đổi hôm nay thành today, ngày mai thành tomorrow, hôm qua thành yesterday, v.v...
if token == "today":
    date = today + datetime.timedelta(days=0)
if token == "yesterday":
    date = today + datetime.timedelta(days=(-1))
if token == "tomorrow":
    date = today + datetime.timedelta(days=1)
if token == "startmonth":
    day = 1
if token == "endmonth":
    day = calendar.monthrange(now.year, now.month)[1]
```

Còn các trường hợp khác như tháng trước, tháng sau, tuần trước, tuần sau, tôi sẽ chỉ đề xuất ý kiến:
```
monday = calendar.MONDAY
tuesday = calendar.TUESDAY
wesneday = calendar.WEDNESDAY
thurday = calendar.THURSDAY
friday = calendar.FRIDAY
saturday = calendar.SATURDAY
sunday = calendar.SUNDAY
```


-  bạn dùng ```now.month``` - 1 là tháng trước, + 1 là tháng sau
-  bạn lấy thứ hiện tại bằng ```today.weekday()``` => tuần này:  ```today + datetime.timedelta(today.weekday())```
-  tuần trước ```today + datetime.timedelta(today.weekday()-7)```
-  tuần sau ```today + datetime.timedelta(today.weekday()+7)```

Trên đấy là 1 chút cơ bản khi bạn xử lí ngày tháng, bởi vì lí do công việc nên mình không tiện show cho các bạn sâu hơn. Mong các bạn thông cảm. :bow: