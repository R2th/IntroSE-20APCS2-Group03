Đây là bài cuối của phần cơ bản Robot Framework , Mình sẽ giới thiệu nốt phần dictionary và 1 ít thư viện Datetime mà mình hay dùng )

Ngoài ra còn khá nhiều các thư viện khác có thể sử dụng liên quan tới tạo atuto cho API và Web , Mình sẽ làm chuỗi viết auto cho API ở các chuỗi bài sau :

**Copy Dictionary:** tạo 1 dictionary mới có items được copy từ dictionary truyền vào

tham số: dictionary, deepcopy

```
T01 - Copy Dictionary
   ${a}    Create Dictionary        key=3       value=4
   ${dic}=      Copy Dictionary       ${a}
   log to console      ${dic}
```


**Dictionaries Should Be Equal**: Fail nếu 2 dictionary không giống nhau

tham số: dict1, dict2, msg=None, values=True

```
T02 - Dictionaries Should Be Equal
   ${a}    Create Dictionary        key=3          value=4
   ${b}    Create Dictionary        value=4        key=3
   Dictionaries Should Be Equal          ${a}      ${b}
   ${b}    Create Dictionary        value=4        key=1
   Dictionaries Should Be Equal          ${a}      ${b}    msg=dictionary a khac dictionary b
   Dictionaries Should Be Equal          ${a}      ${b}    msg=dictionary a khac dictionary b      values=False
```
   
**Dictionary Should Contain Item**: kiểm tra key và value có tương ứng và tồn tại trong dictionary ko, ko có trả về Fail
Tham số: dictionary, key, value, msg=None
```

T03 - Dictionary Should Contain Item
   ${a}    Create Dictionary        key=3          value=4
   Dictionary Should Contain Item      ${a}    key     3
```

**Dictionary Should Contain Key**: Fail nếu key không thuộc dictionary
Tham số: dictinary, key, msg=None

```
T04 - Dictionary Should Contain Key
   ${a}    Create Dictionary        key=3          value=4
   Dictionary Should Contain Key      ${a}    key
```

`Dictionary Should Contain Sub Dictionary`: Fail nếu thành phần dict 2 không thuộc dict1

tham số: dict1, dict2, msg=None, values=true

```
T05 - Dictionary Should Contain Sub Dictionary
   ${a}    Create Dictionary        3=3          4=4       5=5
   ${b}    Create Dictionary        4=4          4=4
   Dictionary Should Contain Sub Dictionary    ${a}        ${b}
```

**Dictionary Should Contain Value**: kiểm tra dictionary có chứa value truyền vào, Fail khi dictionary ko tồn tại value

tham số: dictionary, value, msg=None

```
T06 - Dictionary Should Contain Value
   ${a}    Create Dictionary        key=3       value=4
   Dictionary Should Contain Value     ${a}        4
   
   
```
**Dictionary Should Not Contain Key**: Fail nếu key tồn tại trong dictionary

Tham số: dictionary, key, msg=None

```
T07 - Dictionary Should Not Contain Key
   ${a}    Create Dictionary        key=3       value=4
   Dictionary Should Not Contain Key     ${a}        value1
```
   
**Dictionary Should Not Contain Value**: Fail nếu trong dictionary tồn tại value
tham số: dictionary, value, msg=None
```

T09 - Dictionary Should Not Contain Value
   ${a}    Create Dictionary        key=3       value=4
   Dictionary Should Not Contain Value    ${a}        6
```

**Get Dictionary Items**: chuyển các items trong dictionary về thành List

tham số: Dictionary , sort_keys= true

```
T10 - Get Dictionary Items
   ${a}    Create Dictionary        key=3       value=4
   ${unsorted} =  Get Dictionary Items   ${a}   sort_keys=False
   log to console      ${unsorted}
```
   
  
**Get Dictionary Keys**: trả về danh sách keys của dictionary dưới dạng list
tham số: dictionary , sort_keys = True

```
T11 - Get Dictionary Keys
   ${a}    Create Dictionary        key=3       value=4
   ${unsorted} =  Get Dictionary Keys        ${a}   sort_keys=True
   log to console      ${unsorted}
```
   
**Get Dictionary Values**: trả về danh sách values của dictionary dưới dạng list
tham số: dictionary, sort_keys=True

```
T12 - Get Dictionary Values
   ${a}    Create Dictionary        key=3       value=4
   ${unsorted} =  Get Dictionary Values      ${a}   sort_keys=True
   log to console      ${unsorted}
```

**Get From Dictionary**: trả về value tương ứng với key 

tham số: dictionary, key

```
T13 - Get From Dictionary
   ${a}    Create Dictionary        key=3       value=4
   ${unsorted} =  Get From Dictionary        ${a}       key
   log to console      ${unsorted}
```

**Keep In Dictionary**: giữ lại items tương ứng với key xóa tất cả items khác 

Tham số: dictionry, * keys

```
T14 - Keep In Dictionary
   ${a}    Create Dictionary        key=3       value=4
   Keep In Dictionary     ${a}       key
   log to console      ${a}
```

**Log Dictionary**: hiển thị size và nội dung của dictionary theo level truyền vào

tham số: dictionary, level=INFO ( level có TRACE, DEBUG, INFO)
Pop From Dictionary: trả về value tương ứng với key, đồng thời xóa items tương ứng ra khỏi dictionary

```
T15 - Pop From Dictionary
   ${a}    Create Dictionary        key=3       value=4
   ${b}=   Pop From Dictionary        ${a}       key
   log to console      ${b}
   log to console      ${a}
```

**Remove From Dictionary**: xóa items khỏi dictionary dựa vào key

tham số: dictionary, * key

```
T16 - Remove From Dictionary
   ${a}    Create Dictionary        key=3       value=4
   Remove From Dictionary     ${a}       key
   log to console      ${a}
```

**Set To Dictionary**: đưa cặp key values vào dictionary, trường hợp key tồn tại trong dictionary rồi thì sẽ thay thế value cũ bằng value mới

tham số: dictionary, * key_value_paris, ** items

```

T17 - Set To Dictionary
    ${a}    Create Dictionary        key=3       value=4
    Set To Dictionary          ${a}        key=value   second=${2}
    log to console     ${a}
```
    
** DateTime**   

- Thư viện hỗ trợ tạo và chuyển dổi cho dạng date vào time

**Get Current Date**: trả về thời gian hiện tại theo time zone local hoặc UTC

tham số: time_zone=local, increment=0, result_format=timestamp, exclude_millis=False
trong đó: increment: số time được tăng để add vào kết quả, result_format: sử dụng để hiển thị kết quả, exclude_millis: cho phép làm tròn ở milis

result_format: trong đó các định dạng timestamp, date_format sẽ theo format ( YYYY-MM-DD hh:mm:ss.mil) hoặc có thể truyền dịnh dạng đầu vào

```
T01 - Get Current Date
   ${date} =  Get Current Date
   log to console      ${date}
   ${date} =  Get Current Date   UTC
   log to console      ${date}
   ${date} =  Get Current Date   increment=02:30:00
   log to console      ${date}
   ${date} =  Get Current Date   UTC    - 5 hours
   log to console      ${date}
   ${date} =  Get Current Date   result_format=datetime
   log to console     ${date}
   log to console     ${date.year}
   log to console     ${date.month}
   ${date} =  Get Current Date   result_format=datetime
   log to console     ${date}
   ${date} =  Get Current Date   result_format=%d-%m-%Y %H:%M:%S
   log to console      ${date}
```

**Add Time To Date**: cho phép cộng thêm time vào ngày

tham số: date, time, result_format=timestamp, exclude_millis=FALSE, date_format = None
trong đó date hỗ trợ các dạng: timestamp, custom timestamp, python datetime, epoch time
time: hỗ trợ number, time string
time string: 
days, day, d
hours, hour, h
minutes, minute, mins, min, m
seconds, second, secs, sec, s
milliseconds, millisecond, millis, ms

```
T02 - Add Time To Date
   ${date} =  Add Time To Date   2014-05-28 12:05:03.111        7 days
   log to console      ${date}
   ${date} =  Add Time To Date   2014-05-28 12:05:03.111        1 hour 2 minutes 3 seconds
   log to console      ${date}
```

**Add Time To Time**: cho phép add time vào time khác

tham số: time1, time2, result_format=number, exclude_millis=False
```

T03 - Add Time To Time
   ${time} =  Add Time To Time   1 minute   42
   Should Be Equal    ${time}    ${102}
   ${time} =  Add Time To Time   3 hours 5 minutes  01:02:03   timer  exclude_millis=yes
   Should Be Equal    ${time}    04:07:03
```

**Convert Date**: cho phép convert date sang các định dạng khác nhau

tham số: date, result_format= timestamp, exclude_milis=False, date_format=None

```
T04 - Convert Date
   ${date} =  Convert Date   20140528 12:05:03.111
   log to console      ${date}
   ${date} =  Convert Date   ${date}    epoch
   log to console      ${date}
   ${date} =  Convert Date   5.28.2014 12:05        exclude_millis=yes     date_format=%m.%d.%Y %H:%M
   log to console      ${date}
```

**Convert Tim**e: cho phép convert giữa các time format

tham số: time, result_format=number, exclude_millis=False

Time hỗ trợ các định dạng : number, time string

```
T05 - Convert Time
   ${time} =  Convert Time   10 seconds
   log to console         ${time}
   ${time} =  Convert Time   1:00:01    verbose
   log to console         ${time}
   ${time} =  Convert Time   ${3661.5}  timer  exclude_milles=yes
   log to console         ${time}
```
   
**Subtract Date From Date:** trừ lượng date từ date

tham số: date1, date2, result_format=number, exclude_milis=False,date1_format=None, date2_format=None

```
T06 - Subtract Date From Date
   ${time} =  Subtract Date From Date    2014-05-28 12:05:52        2014-05-28 12:05:10
   log to console     ${time}
   ${time} =  Subtract Date From Date    2014-05-28 12:05:52    2014-05-27 12:05:10    verbose
   log to console     ${time}
```
   
   
**Subtract Time From Date**: trừ lượng time từ date
 
 tham số: date, time, result_format=timestamp , exclude_millis=False, date_format=None
 
```
T07 - Subtract Time From Date
   ${date} =  Subtract Time From Date    2014-06-04 12:05:03.111        7 days
  log to console     ${date}
   ${date} =  Subtract Time From Date    2014-05-28 13:07:06.115        1 hour 2 minutes 3 seconds
   log to console     ${date}
```

**Subtract Time From Time**: thực hiện trừ time cho time

tham số: time1, time2, result_format=number, exclude_millis=False

```
T08 - Subtract Time From Date
   ${time} =  Subtract Time From Time    00:02:30   100
   log to console     ${time}
   ${time} =  Subtract Time From Time        ${time}        1 minute
   log to console     ${time}
```