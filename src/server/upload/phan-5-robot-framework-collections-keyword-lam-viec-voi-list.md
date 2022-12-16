**Collections:**
- Thư viện chứa các keyword xử lý List và Dictionary
- Thực hiện import library để dùng thư viện này:  Library     Collections
Keyword của collections

**Append To List**: cho phép add value vào cuối list

- tham số: list_, * values
- cú pháp : Append To List		${L2}		x	y	z
- 
- **Combine Lists**: cho phép kết hợp các list lại với nhau thành 1 list mới
tham số: * lists

```
ví dụ: 
TC01 - Combine Lists
   ${L1}       create List     a   b    c      d
   ${L2}       create List     e   f    c      d
   ${x} = Combine Lists  ${L1}  ${L2}       # ['a', 'b', 'c', 'd', 'e', 'f', 'c', 'd']
```
   
- **Convert To List: cho phép chuyển đổi thành kiểu list**
- tham số: item
- 
```
T02 - Convert to List
   ${L1}       create List     a   b    c      d
   ${x}=     Convert To List     ${L1}
   log to console      ${x}
   ${x}    set variable    2
   ${x}=     Convert To List     ${x}
   log to console      ${x}
   ${d}    create dictionary   key=a     value=b
   log to console      ${d}
   ${x}=     Convert To List     ${d}
   log to console      ${x}
```

- **Copy List**: cho phép copy giá trị của danh sách

- Tham số: list_, deepcopy=False

```
T03 - Copy List
   ${L1}       create List     a   b    c      d
   ${x}=     Copy List   ${L1}
   log to console      ${x}
```

- **Count Values In List**: trả về số lần xuất hiện của Value trong list

- Tham số: list_, value, start=0, end=None

```
T04 - Count Values In List
   ${L1}       create List     a   b    c      d       e   c   f   k   c
   ${x}=   Count Values In List        ${L1}   c   start=4  end=7
   log to console      ${x}
   ${x}=   Count Values In List        ${L1}   c
   log to console      ${x}
```

**Get From List:** trả về giá trị tại vị trí index của list

- tham số: list_, index ( Fail nếu index vượt qua độ dài của list )

ví dụ: 
```

T05 - Get From List
   ${L1}       create List     a   b    c      d       e   c   f   k   c
   ${x} = Get From List  ${L1}  0  # L5[0]
   log to console      ${x}
   ${y} = Get From List  ${L1}  -2 # L5[-2]
   log to console      ${y}
  # ${z} = Get From List  ${L1}  20 # L5[-2]
   # log to console      ${z}
```

**- Get Index From List: trả về index của value trong list, trường hợp không tìm thấy trả về -1**
- tham số: list_, value, start=0, end=None
-
ví dụ: ${x} =	Get Index From List	${L5}

**Get Match Count**: trả về số lần match với patten trong list

- tham số: list, pattern, case_insensitive=False, whitespace_insensitive=False
-  trong đó case_insensitive ko phân biện hoa thường với patten
-  
ví dụ:
```
T06 - Get Match Count
   ${list}       create List     anddd   b    caaaa      ddkdkd       aldldl   c   f   k   c
   ${count}=  Get Match Count    ${list}        a* # ${count} will be the count of strings beginning with 'a'
   log to console  ${count}
   ${count}=  Get Match Count    ${list}    regexp=a.* # ${matches} will be the count of strings beginning with 'a' (regexp version)
   log to console  ${count}
   ${count}=  Get Match Count    ${list}    a* case_insensitive=${True}
   log to console  ${count}
```

**Get Matches: trả về list các giá trị match với pattern**

tham số:list, pattern, case_insensitive=False, whitespace_insensitive=False
```

T07 - Get Matches
   ${list}       create List     anddd   b    caaaa      ddkdkd       aldldl   c   f   k   c
   ${matches}=    Get Matches    ${list}    a* # ${matches} will contain any string beginning with 'a'
   log to console  ${matches}
   ${matches}=    Get Matches    ${list}    regexp=a.* # ${matches} will contain any string beginning with 'a' (regexp version)
   log to console  ${matches}
   ${matches}=    Get Matches    ${list}    a* case_insensitive=${True}
   log to console  ${matches}
```


**- Get Slice From List**: trả về list được lấy ra từ danh sách ban đầu , bắt đầu từ vị trí start  + 1 đến vị trí end - 1

- tham số: list_, start=0, end=None
ví dụ:

```
T08 - Get Slice From List
   ${L5}       create List     anddd   b    caaaa      ddkdkd       aldldl   c   f   k   c
   ${x} = Get Slice From List    ${L5}  2  4  # L5[2:4]
   log to console  ${x}
   ${y} = Get Slice From List    ${L5}  1     # L5[1:None]
   log to console  ${y}
   ${z} = Get Slice From List 
```


**Insert Into List**: cho phép thêm value tại vị trí index

- Tham số: list_, index, value ( 0 là vị trí đầu tiên , trường hợp index lớn hơn độ dài của list thì sẽ được add vào cuối danh sách)

ví dụ :

```
T09 - Insert Into List
   ${L1}       create List     anddd   b    caaaa      ddkdkd       aldldl   c   f   k   c
   Insert Into List   ${L1}  0  xxx
   log to console      ${L1}
   Insert Into List   ${L1}  4  yyy
   log to console      ${L1}
   Insert Into List   ${L1}  20 zzzzz
   log to console      ${L1}
   Insert Into List   ${L1}  ${-1}  kkkkkk
   log to console      ${L1}
```


**- List Should Contain Sub List:  fail nếu tất cả các items list2 có thuộc trong list1**
- tham số:list1, list2, msg=None, values=True

Ví dụ:
```

T10 - List Should Contain Sub List
   ${L1}       create List     anddd   b    caaaa      ddkdkd       aldldl   c   f   k   c
   ${L2}       create List     b    caaaa    c     f       k
   ${check_contain}    List Should Contain Sub List        ${L1}       ${L2}
```

**List Should Contain Value**: trả về fails nếu value không thuộc List

-tham số: list_ , value, msg=None ( msg => sử dụng làm thông báo trường hợp fail )

ví dụ : List Should Contain Value		${list}		gia tri

**List Should Not Contain Duplicates**: fail nếu list có >=2 giá trị giống nhau
tham số: lst_ , msg

**List Should Not Contain Value**: Fail nếu value thuộc list

tham số: list_, value, msg=None

`Lists Should Be Equal`: Fail nếu list1 và list 2 có độ dài khác nhau, và values từng vị trí index khác nhau

tham số: list1, list2, msg=None, value=True,names= None, ignore_order=false (ignore_order tham số dùng version 3.2)
```
T11 - Lists Should Be Equal
   ${names1} =    Create List        First Name     Family  Name   Email
   ${names2} =    Create List        First Name     Family  Name   Email
   Lists Should Be Equal  ${names1}  ${names2}
   ${list1} = Create List    apple  cherry banana
   ${list2} = Create List    cherry banana apple
   Lists Should Be Equal      ${list1}       ${list2}       ignore_order=True
   
```
**Log List**: hiển thị leng và nội dung trong list

tham số: list_ , level = INFO ( level có các giá trị sau: TRACE, DEBUG, INFO (default), and WARN)

```

T12 - Log List
  ${names1} = Create List        First Name     Family  Name   Email
  Log List     ${names1}
  Log List     ${names1}       level=INFO
  Log List     ${names1}       level=TRACE
  Log List     ${names1}       level=DEBUG
  Log List     ${names1}       level=WARN
  
```
**Remove Duplicates**: tạo ra list mới lấy các giá trị từ List đầu vào ko bị trùng nhau

tham số: List
```

T13 - Remove Duplicates
   ${names1} =    Create List        First Name     Family  Name   Email       First Name      Email
   ${names2}=   Remove Duplicates       ${names1}
   log to console      ${names2}
```

**Remove From List**: Xóa values dựa vào index truyền vào ( index tính từ 0)

tham số:  list_, index
```

T14 - Remove From List
   ${names1} =    Create List        First Name     Family  Name   Email       First Name 
   Remove From List        ${names1}       2
   log to console      ${names1}
```
**Remove Values From List**: Thực hiện xóa value khỏi List

tham số:  List, * values ( danh sách giá trị cần xóa )

```
T15 - Remove Values From List
   ${names1}= Create List            Family      Name   Email       First Name      Email
   Remove Values From List     ${names1}       Email       Name
   log to console      ${names1}
```

**Reverse List**: thực hiện nghịch đảo list 
tham số:  list

```
T16 - Reverse List
   ${names1}= Create List        Family      Name   Email       First Name      Email
   Reverse List        ${names1}
   log to console      ${names1}
```
   
**Set List Value**: xét giá trị value tại index bằng value truyền vào

tham số:list_, index, value
```
T17 - Set List Value
   ${names1}= Create List        First Name     Family      Name   Email
   log to console      Before set list value: ${names1}
   Set List Value      ${names1}       2   Amber
   log to console      After set list value:${names1}
```

**Should Contain Match**: Fail khi các giá trị trong list khong match với pattern truyền vào

tham số: list, pattern, msg=None, case_insensitive=False, whitespace_insensitive=False
trong đó : case_insensitive = True sẽ không phân biện hoa thường đối với pattern
whitespace_insensitive: True sẽ không phân biệt khoảng trắng trước và sau pattern
ví dụ:
```

T18 - Should Contain Match
   ${names1}= Create List        First Name     Family      Name   Email       First Name      Email       123456
   Should Contain Match        ${names1}       E*          # bat dau voi E
   Should Contain Match        ${names1}       regexp=N.*  # bat dau voi ky tu N
   Should Contain Match        ${names1}       regexp=\\d{6}    # co noi dung 6 so
   Should Contain Match        ${names1}       e*    case_insensitive=True     # co noi dung 6 so
   Should Contain Match   ${names1}          ab*        whitespace_insensitive=yes      # bat dau la ab ko quan tam den khoan trang
```


**Should Not Contain Match**: trả về Fail nếu trong list có giá trị match với pattern

tham số: list, pattern, case_insensitive, whitespace_insensitive
```

T19 - Should Not Contain Match
   ${names1}= Create List        First Name     123      345   9494       2999      2222       123456
   Should Not Contain Match        ${names1}       E*          # bat dau voi E
   Should Not Contain Match        ${names1}       regexp=N.*  # bat dau voi ky tu N
   Should Not Contain Match        ${names1}       regexp=\\d{6}    # co noi dung 6 so
   Should Not Contain Match       ${names1}       e*    case_insensitive=True     # co noi dung 6 so
   Should Not Contain Match   ${names1}          ab*        whitespace_insensitive=yes      # bat dau la ab ko quan tam den khoan trang
```


**Sort List**: thực hiện sắp xếp lại thứ tự của list

- tham số: list
```

T20 - Sort List
   ${names1}= Create List        First Name     123      345   9494       2999      2222       123456
   log to console      ${names1}
   Sort List   ${names1}
   log to console      ${names1}
```