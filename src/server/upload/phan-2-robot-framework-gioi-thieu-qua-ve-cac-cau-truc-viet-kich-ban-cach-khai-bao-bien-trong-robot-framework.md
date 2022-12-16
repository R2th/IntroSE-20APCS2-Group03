Hi Lại là Mình đây, tiếp tục với chuỗi bài robot framework 
Chúng ta sẽ bắt đầu từ cấu trúc khi viết kịch bản test bằng robot framework :
Tài liệu mình tham khảo trên trang này nhé :  https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#creating-dictionary-variables
![](https://images.viblo.asia/0a10a46c-7fa1-4d56-98a9-6c84ef58638e.png)
![](https://images.viblo.asia/820a7361-e95b-4b49-b8d8-d61d84510e39.png)
![](https://images.viblo.asia/b4cadfbf-1202-44c7-b981-18275fc8791e.png)

 Settings: sử dụng để import các resource file, libraries, là nơi định nghĩa các metadata dành cho test suites và test case
 
 Documentation : sử dụng mô tả nội dung test
 
Suite Setup : được sử dụng thiết lập khởi đầu cho toàn bộ kịch bản, chỉ chạy 1 lần duy nhất ban đầu

 Suite Teardown: sử dụng setup khi chạy xong toàn bộ test case, chạy 1 lần khi chạy xong toàn bộ test case
 
Test setup: sử dụng thiết lập cho mỗi test case

Test teardown: được sử dụng khi chạy xong test case

Library: các thư viện hỗ trợ sử dụng

resource: sử dụng để import các file chứa các keywords , để tái sử dụng các keywords

test templates: cho phép chuyển test case thông thường theo hướng dữ liệu. 

Variables:Thành phần này cho phép chúng ta định nghĩa các biến sử dụng trong test case và keywords,  cho phép việc xây dựng kịch bản test dễ dàng hơn và dễ dàng hơn cho việc  maintain  thích hợp cho Data-driven test.

Test Cases: thần test case là phần chính => được sử dụng để định nghĩa ra các trường hợp cần kiểm thử, => trong phần test case này sẽ gọi các keyword kiểm tra Output xem có đúng như expected

Tasks:cho phép chạy test hiệu quả hơn, sử dụng trong việc run test case, cho phép lựa chọn các test case để thực thi

Keywords:  Keywords chính là các step để sử dụng cho việc chuẩn bị và việc kiểm tra kết quả trong test case, Keyword có thể gọi đến các keywords khác để thực hiện các keyword khác

Comments: robot sẽ ignored ko chạy phần comment

**Các khai báo biến trong robot**

$ để khai báo trước 1 biến

@ để khai báo biến có kiểu  list

& sử dụng khai báo biến có kiểu dictionary

% sử dụng để khai báo biến môi trường

**ví dụ : Tạo biến dưới Variables**

```
*** Variables ***
${NAME}         Robot Framework
${VERSION}      2.0
${ROBOT}        ${NAME} ${VERSION}
```

**bạn có thể dùng ký tự = sau biến**
```
*** Variables ***
${NAME} =       Robot Framework
${VERSION} =    2.0
```
**Ngoài ra có thể dùng … khai báo tiếp tục**
```
${EXAMPLE}      This value is joined
...             together with a space.
${MULTILINE}    SEPARATOR=\n
...             First line.
...             Second line.
...             Third line.
```

*** Testcases ***
```
TC01 - Bien
   log to console      ${NAME}
   log to console      ${VERSION}
   log to console      ${EXAMPLE}
   log to console      ${MULTILINE}
```

**Khai báo biến local:**

- khai báo hai số nguyên a = 5, b = 4 và tính tổng hai số nguyên đó => sử dụng từ khóa Set Variable 
- 
```
TC02 - bien
  ${a}    Set Variable   ${4}
  ${b}    Set Variable   ${5}
  ${tong}     Evaluate    ${a} + ${b}
  log to console      ${tong}
```

**Khai báo biến global: sử dụng keyword Set Global Variable**

```
TC003 - Xet biet global
  ${a}                 Set Variable    ${5}
  ${b}                 Set Variable    ${4}
  ${c}                 Evaluate        ${a} + ${b}
  Set Global Variable                  ${c}
  Log To Console       Tổng 2 số nguyên: ${a} + ${b} là ${c}
```
```

TC004 - Xet biet global
  ${a}                 Set Variable    ${5}
  ${b}                 Set Variable    ${4}
  ${tong}              Evaluate        ${a}+${b}+${c}
  Log To Console       Tổng 3 số nguyên: ${a} + ${b} + ${c} là ${tong}
```

Khai báo List
```
*** Variables ***
@{NAMES}        Matti       Teppo
@{NAMES2}       @{NAMES}    Seppo
@{NOTHING}
@{MANY}         one         two      three      four
...             five        six      seven
${items} =    Create List    first    second    third

*** Testcases ***
TC01 - List
   ${items} =    Create List    first    second    third
   log Many    ${items}[1:]
   ${nested} =    Evaluate    [['a', 'b', 'c'], {'key':['x', 'y']}]
   Log Many    @{nested}[0]         # Logs 'a', 'b' and 'c'.
   Log Many    ${nested}[1]
   Log Many    ${nested}[1][key]    # Logs 'x' and 'y'.
```
**khai báo Dictionary **
```
*** Variables ***
&{USER 1}       name=Matti    address=xxx         phone=123
&{USER 2}       name=Teppo    address=yyy         phone=456
&{MANY}         first=1       second=${2}         ${3}=third
&{EVEN MORE}    &{MANY}       first=override      empty=
...             =empty        key\=here=value

*** Test Cases ***
TC02 - Dictionary
   &{dict} =    Create Dictionary    first=1    second=${2}    ${3}=third
   Length Should Be    ${dict}    3
   Log    ${dict}[first]
   Log    ${dict.first}
```

![](https://images.viblo.asia/de2c9e6b-126a-4e41-acf2-62c4425db4a4.png)
![](https://images.viblo.asia/b51d17ec-d178-46fe-a3bd-c0175fdadb7c.png)

![](https://images.viblo.asia/82fdce80-233a-4017-8702-2135f24dc996.png)

**Cách sử dụng test templates**:

- Cho phép chuyển test case thông thường theo hướng dữ liệu. 

Ví dụ :
```
*** Testcases ***
TC01 - Template with embedded arguments
  [Template]    The result should be
   2
   3

*** Keywords ***
The result should be
  [Arguments]         ${bien}
  log to console     ${bien}
```

**Bạn có thể thiết lập trong Setting**

```
*** Settings ***
Test Template   The result should be
*** Testcases ***
TC01 - Template with embedded arguments
   2
   3

*** Keywords ***
The result should be
  [Arguments]         ${bien}
  log to console     ${bien}
  
```
  
**  Templates với vòng lặp**
```
*** Test Cases ***
TC02 - Template with for
   [Template]    The result should be
   FOR     ${index}    in     1  2   3
       ${index}
   END
*** Keywords ***
The result should be
  [Arguments]         ${bien}
  log to console     ${bien}
```