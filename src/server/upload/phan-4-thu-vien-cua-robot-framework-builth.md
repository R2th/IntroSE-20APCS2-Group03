- Link Tham khảo trên trang này nhé : https://robotframework.org/robotframework/
- Robot Framework có rất nhiều thư viện hỗ trợ phục vụ cho việc test.
- Mình chỉ giới thiệu các lib cơ bản thôi  => **Standard Libraries: **
* BuiltIn: chứa các từ khóa chung cần thiết cơ bản trong robot, Cung cấp các key word như là Should Be Equal, Should Contain,  Convert To Integer, Log, Sleep, Run Keyword If,  Set Global Variable, Should Be True, Run Keyword If, Evaluate,  Should Match, …
* Collections:  Chứa các keyword xử lý cho kiểu dữ liệu List và dictionary
* DateTime: hỗ trợ  tạo xác thực giá trị dạng date time tính toán khoảng cách ngày giờ, tháng năm ..
* Dialogs: Hỗ trợ tạm dừng thực thi thử nghiệm và  cho phép lấy input đầu vào từ việc nhập liệu của user
* Operating System: cho phép thực thi các tác vụ liên quan tới hệ điều hành
* Screenshot: Cung cấp các từ khóa để chụp và lưu trữ ảnh chụp màn hình của màn hình nền. 
* String: Thư viện chứa các key word thao tác với chuỗi
* Telnet: Hỗ trợ kết nối với máy chủ Telnet và thực hiện lệnh trên các kết nối đã mở.
* XML:  hỗ trợ verify hoặc sửa đổi định dạng xml

**Builth**

**1. Loạt keywork liên quan tới đánh giá  gọi là Evaluating expressions**

** Should Be True**

 trả về false nếu biểu thức không phải true,
 
        + Tham số : condition và msg ( trong đó condition là bắt buộc còn msg ko bắt buộc và có giá trị default  )
        
       Ví dụ : 
       
```
*** Test cases ***
TC01 - Should Be True with number
   ${robotVar}     set variable       ${11}
   # so sánh với dạng số
   Should Be True ${robotVar} == ${11}        msg=len smaller than 11
   ${number}     set variable       ${0}
   Should Be True ${number}           # Pass neu number ko phai 0
TC02 - Should Be True with string
   # so sánh với dạng string
   ${robotVar}     set variable       PASS
   Should Be True '${robotVar}'== 'PASS'        msg=is not PASS
TC03 - Should Be True with List
   ${list}     create list    
   Should Be True ${list}    # Passes if ${list} is not empty
```

**- Run keyword if:**

- Thực hiện keyword ở đằng sau nếu điều kiện trả về đúng

- Tham số: condition, name , args
- 
      +  condition là điều kiện, name là tên keywords muốn thực hiện nếu điều kiện đúng, args là tham số của keywords
Ví dụ: 

```
TC04 - Run Keyword If
    ${list}     create list
    Run Keyword If    ${list}         log to console      List is not empty
    ...        ELSE            log to console      List is empty
```

**Should Be Equal**: so sánh biểu thức thứ nhất và biểu thức thứ 2 có bằng nhau không

- Tham số: first ( bắt buộc) , second (bắt buộc) , msg ( mặc định None), values=True, ignore_case=False, formatter=str , strip_spaces=False
- trong đó các tham số , msg, values, formatter được sử dụng để xây dựng thông báo khi mà biểu thức trả về FAIL. thông báo mặc định của keyword này là <msg>: <first> != <second>.
- formatter: sử dụng chỉ định định dạng của thông báo, mặc định là dạng str, sau đó repr, ascii
- ignore_case: được sử dụng khi compare 2 chuỗi không phân biệt hoa thường
- nếu biểu thức <first> != <second>. là True  và values=True  => thông báo sẽ là <msg>: <first> != <second>.
- nếu biểu thức <first> != <second>. là True  và values=FALSE  => thông báo sẽ là <msg>
    
```
TC06 - Should Be Equal
   ${x}   set variable   4
   ${y}   set variable   4
   Should Be Equal        ${x}    ${y}
   ${y}   set variable   5
   Should Be Equal    ${x}   ${y}   ko bang     values=FALSE
   ${x}   set variable   Abc
   ${y}   set variable   ABC
   Should Be Equal    ${x}   ${y}   ignore_case=TRUE   formatter=repr
```

**Should Be Equal As Strings **
    
    - Tương tự giống keyword should be equal tham số thứ 1 và thứ 2 đều dạng string.

    -Tham số : first,  second, msg=None, values=True, ignore_case=False,  formatter=str 

    - Thực hiện so sánh first với second
   - Tham số msg, values, ingore_case , formatter sử dụng để xây dựng thông báo cho trường hợp khi so sánh first và second trả về false ( ignore_case => so sánh ko quan tâm hoa thường, value= True hiển thị biểu thức first != second , value= false sẽ ko hiển thị chỉ hiển thị mess, formatter => định dạng cho chuỗi thông báo )
  ```
  Ví dụ
T07 - Should Be Equal As Strings
   Should Be Equal As Strings      thuong          Thuong      msg=Sai     values=FALSE    ignore_case=True           formatter=repr
    
```
**Should Be Equal As Numbers**
    
   -  Tham số: first , second, msg=None, values=True, precision=6
trong đó thông báo khi tham số thứ nhất và tham số thứ 2 là 2 tham số cần so sánh được chuyển sang dạng number
Precision là độ chính xác muốn so sánh
msg , values được sử dụng để tạo lên thông báo khi so sánh trả về False

```
T08 - Should Be Equal As Numbers
   Should Be Equal As Numbers      5.12   5.123       msg=Khac nhau       values=True     precision=2
   Should Be Equal As Numbers      5.13   5.123       msg=Khac nhau       values=True     precision=2
# ==================== kết quả trả về  ==========
Khac nhau: 5.13 != 5.12
```
**Should Be Empty**: kiểm tra xem biến có empty hay không ( tham số: item ( biến muốn kiểm tra ), msg : message trả về trường hợp biến khác emtpy
    
**Should Be Equal**: kiểm tra xem giá trị thứ nhất có khác giá trị thứ 2 không
    
tham số: first , second, msg =None, values=True, ignore_case=False, formatter=str, strip_spaces=False
    
- Tham số msg, values, ingore_case , formatter sử dụng để xây dựng thông báo cho trường hợp khi so sánh first và second trả về false ( ignore_case => so sánh ko quan tâm hoa thường, value= True hiển thị biểu thức first != second , value= false sẽ ko hiển thị chỉ hiển thị mess, formatter => định dạng cho chuỗi thông báo )
    
```
T28 -    Should Be Equal
   Should Be Equal      thuong          Thuont      msg=Sai     values=False    ignore_case=True           formatter=repr
T29 -    Should Be Equal
   Should Be Equal      thuong          Thuont      msg=Sai     values=True    ignore_case=True           formatter=repr
```

**Should Be Equal As Integers **: chuyển sang dạng nguyên và  kiểm tra xem 2 giá trị có bằng nhau không
    
- tham số: first ,   second , msg=None, values=True, base=None
- trong đó tham số msg, value sử dụng tạo message trường hợp so sánh trả về false , base ( là hệ số so sánh, ví dụ là hệ số 2, 10, 8, 16)
    
ví dụ:
```
T29 - Should Be Equal As Integers
   Should Be Equal As Integers    42 ${42}  Error message
   Should Be Equal As Integers    ABCD   abcd   base=16
   Should Be Equal As Integers    0b1011 11
```

**Should Be Equal As Numbers**: chuyển sang dạng số và kiểm tra xem 2 giá trị có bằng nhau không
    
tham số:first, second, msg=Nonevalues=True, precision=6
    
**Should Be Equal As Strings**: chuyển sang dạng strings và kiểm tra 2 giá trị có giống nhau không
    
Tham số: first, second, msg=None, values=True, ignore_case=False, strip_spaces=False, formatter=str
( trong đó msg, values, ignore_case, strip_spaces, formatter => sử dụng để tạo ra thông báo khi so sánh ko giống nhau)

 **Should Be True**: sử dụng kiểm tra điều kiện có đúng hay không

    - Tham số: condition, msg=None
    
ví dụ:
```
Should Be True	${rc} < 10
Should Be True	'${status}' == 'PASS'	# Strings must be quoted
Should Be True	${number}	# Passes if ${number} is not zero
Should Be True	${list}		# Passes if ${list} is not empty
```
**Should Contain**: kiểm tra container có chứa item
                          
Tham số: container, item, msg=None, values=True, ignore_case=False, strip_spaces=False
 (thường áp dụng cho list, string, strip_spaces => áp dụng cho robot framework 4.0 )
    
ví dụ:
```
T30 - Should Contain
   Should Contain PASS LIST PASS PASS
   ${lst}      create List     PASS       Failure   True      FAlse
   Should Contain ${lst} Failure        msg=Failure!   values=False
   Should Contain ${lst} pass       ignore_case=True
```
    
**Should Contain Any**: trả về False nếu container không chứa bất kỳ giá trị nào items
    
( Thường Apps dụng cho List, String )
    
- Tham số: container, * items, ** configuration
```
TC31 - Should Contain Any
   Should Contain Any PASS FAIL TRUE FALSE       FALSE       TRUE
   ${lst}      create List     PASS       Failure   True      FAlse
   Should Contain Any     ${lst}     Failure        FAlse
   Should Contain Any ${lst} FAilure        False      ignore_case=True
   ${items}      create List     PASS     Failure   True      FAlse
   Should Contain Any ${lst}     @{items}   msg=Custom message values=False
```

**Should Contain X Times**: 
    
- trả về False nếu số lần xuất hiện của items trong container không bẳng count
    
- Tham số: container, item, count, msg=None, ignore_case=False, strip_spaces=False => chỉ áp dụng cho robot framework từ 4.0)
- Thường áp dụng cho List hoặc String
```
T32 - Should Contain X Times
   Should Contain X Times hi hello there hello       hello  2
   ${lst}      create List     PASS       Failure   True      FAlse       FALSE
   Should Contain X Times ${lst} false  2  ignore_case=True
```
    
**Should End With**: kiểm tra chuỗi 1 kết thúc có là chuỗi 2 hay không
    
- Tham số: str1, str2, msg=None, values=True, ignore_case=False, strip_spaces=False ( tham số này áp dụng robot framework từ 4.0 )
trong đó msg, value => sử dụng để tạo ra thông báo trường hợp điều kiện trả về false
ví dụ:
```
T33 - Should End With
   Should End With    hi hello there hello       hello
   Should End With    hi hello there hello       Hello       msg=Failure!       values=False        ignore_case=True

    
```
Ngoài ra còn rất nhiều keyword khác bạn có thể tham khoản ở trang http://robotframework.org/robotframework/latest/libraries/BuiltIn.html

 **    Catenate**: 
-    sử dụng để nối các chuỗi lại với nhau, tham số: SEPARATOR, danh sách tham số cần nối
```
T09 - Catenate
   ${str1} =  Catenate   Hello  world
   log to console      ${str1}
   ${str2} =  Catenate   SEPARATOR=---  Hello  world
   log to console      ${str2}
   ${str3} =  Catenate   SEPARATOR= Hello  world
   log to console      ${str3}
```
    
 -**  Log:** sử dụng để ghi log trong robot
    
    Tham số: message( tin nhắn hiển thị trên log) , level=INFO, html=False, console=False, repr=False, formatter=str
    ví dụ:
```
T10 - Log Comment
   Log        Hello, world!        # thường  dùng sẽ ghi log ra file log.html
   Log        Warning, world!        WARN      # level Warn
   Log        Debug, world!      DEBUG     # level DEBUG
   Log        Info, world!       INFO      #  level Info
   Log    <b>Hello</b>, world!   html=yes      # level INFO bôi đậm chữ Hello
   Log    <b>Hello</b>, world!   HTML      # tương tự như trên
   Log    <b>Hello</b>, world!   DEBUG  html=true  # level log DEBUG  hiểu định dnajg HTML
   Log    Hello, console!    console=yes       # ghi log trên file htlm và trong console
   Log    Null is \x00   formatter=repr    # Log với format repr
```
**Log To Console **: ghi log xuống console, ko ghi ra file log
    
- tham số : message,  stream=STDOUT ( ko bắt buộc default STDOUT)  , no_newline=False (ko bắt buộc ,  cho phép ghi message trên dòng mới hay không)
    
**Log Many**: cho phép ghi log nhiều message cùng 1 lúc trong file log
    
- Tham số: danh sách message
- Comment: cho phép nghi log trong file log.html

**Convert To Binary: cho phép convert to Binary**

    Tham số: item, base=None, prefix=None, length=None
    
```
TC14 - Convert To Binary
   ${result} =    Convert To Binary  10       # Result is 1010
   log to console      ${result}
   ${result} =    Convert To Binary  F  base=16        prefix=0b  # Result is 0b1111
   log to console      ${result}
   ${result} =    Convert To Binary  -20        prefix=B   length=4   # Result is -B0010
   log to console      ${result}
```

Các keyword tương tự: Convert To Boolean, Convert To Bytes, Convert To Hex
**Convert To Integer**
- Cho phép đưa tham số về dạng số nguyên
- Tham số: item ( bắt buộc), base=None (hệ số, ví dụ hệ 2, hệ 8 hệ 16)
- Note: ngoài ra ko cần truyền Base thì vẫn có thể dùng prefix để xác định hệ nào , nếu item bắt đầu 0b => hệ số 2, 0o => hệ số 8, 0x => hệ số 16 hệ hexa)
```
TC15 - Convert To Integer
   ${result} =    Convert To Integer 100       # Result is 100
   ${result} =    Convert To Integer FF AA  16 # Result is 65450
   ${result} =    Convert To Integer 100    8  # Result is 64
   ${result} =    Convert To Integer -100   2  # Result is -4
   ${result} =    Convert To Integer 0b100     # Result is 4
   ${result} =    Convert To Integer -0x100    # Result is -256
    
```
**Convert To Number**: đưa về dạng số
    - Convert To String: chuyển về dạng ký tự
    - Tham số: item (giá trị cần chuyeer về dạng số ) , precision=None (giữ lại bao nhiêu số sau dấu thập phân)
```
    TC16 - Convert To Number
   ${result} =    Convert To Number  42.512    # Result is 42.512
   ${result} =    Convert To Number  42.512 1  # Result is 42.5
   ${result} =    Convert To Number  42.512 0  # Result is 43.0
   ${result} =    Convert To Number  42.512 -1 # Result is 40.0
```
**Create List : Cho phép tạo biến có kiểu dữ liệu List**
- Tham số: items ( không bắt buộc)
```
T18 - Create List
   @{list} =  Create List    a  b  c
   ${scalar} =    Create List    a  b  c
   ${ints}  Create List    ${1}   ${2}   ${3}
   ${ints} =  Create List    ${1}   ${2}   ${3}
```
**Get Count**: trả về số lần items xuất hiện trong 1 chuỗi
- Tham số: container, item 
```
T21 - Get Count
   ${count} = Get Count     Amber      A
   log to console      ${count}
```
- Ngoài ra còn 1 số keyword như : Get Length, Get Time, Get Variable Value, Get Variables, 
    
    
**3. Các keyword liên quan gán giá trị cho biến**
    **Evaluate**: sử dụng để gán giá trị cho biến 
- Tham số: 	expression, modules , namespace
    - expression: bắt buộc là biểu thức được đánh giá bởi python
    - modules: ko bắt buộc  tên lib module trong python
    - namespace: ko bắt buộc có giá trị là 1 dictionary để thực hiện biểu thức
    Ví dụ: 
```
T05 - Evaluate
   ${result}   set variable    3.14
   ${status} =    Evaluate   0 < ${result} < 10
   log to console    ${status}
   ${random} =    Evaluate       random.randint(0,100)       modules=random
   log to console    ${random}
   ${random} =    Evaluate       random.randint(0,100)       random
   log to console    ${random}
   ${ns} =    Create Dictionary  x=${4} y=${2}
   ${result} =    Evaluate   x*10 + y   namespace=${ns}
   log to console    ${result}
```
-  Set Test Variable: cho phép xét giá trị của biến, có thể gọi biến ở mọi nơi , tham số: name values
ví dụ: Set Test Variable       ${hi}       Hello, world!
    
**Sleep**: cho phép dừng thực thi trong thời gian  
    
- tham số: time_, reason=None
    
**Variable Should Exist**: Fail nếu biến tồn tại
    
- tham số: name, msg=None ( msg sử dụng để tại ra thông báo khi Fail)
    
**Variable Should Not Exist**: Fail nếu tốn tại
    
- tham số: name, msg=None ( msg sử dụng để tại ra thông báo khi Fail)
    
**Wait Until Keyword Succeeds**: thực thi keyword cho đến khi success
    
- Tham số: retry ( số lần retry hoặc là khoảng thời gian thực hiện ) , retry_interval ( thời gian wait để thực hiện retry) , name ( keyword muốn thực thi  ), * args ( tham số của keyword )
    
cú pháp:
    
Wait Until Keyword Succeeds	2 min		5 sec	My keyword		argument