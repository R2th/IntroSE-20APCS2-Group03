**Vòng lặp For**
bạn có các cách sử dụng vòng lặp for trong robot framework như sau:

```
TC01 - For example
   Log to console      \n
   FOR    ${animal}    IN    cat    dog
       Log to console    ${animal}
   END
   Log to console      ===============
   FOR    ${index}    IN RANGE    5    26    10
       Log to console    ${index}
   END
   Log to console      ==============
   FOR    ${index}    IN RANGE    13    -13    -10
       Log to console    ${index}
   END
   Log to console      ==============
   FOR    ${index}    IN RANGE    3.14    6.09    1.2
       Log to console    ${index}
   END
   
```

**For-in-enumerate loop** : Cho phép for theo cả index và giá trị của list
```
** Variables ***
@{LIST}         a    b    c
@{NUMBERS}       ${1}    ${2}    ${5}
@{NAMES}         one     two     five
*** Testcases ***
TC02 - for with ENUMERATE
 FOR    ${index}    ${item}    IN ENUMERATE    @{LIST}
     log to console    ${index} value ${item}
 END
```
 
**# FOR THEO ĐỘ DÀI CỦA LIST NHỎ HƠN**   Bạn có thể for 2 List cùng 1 lúc nữa nhé
 ```
FOR    ${number}    ${name}    IN ZIP    ${NUMBERS}    ${NAMES}
  	log to console    ${number} VALUE ${name}
  END
```


**Vòng lặp For với Dictionary** : cho phép bạn For theo key hoặc Value   hoặc key và value nữa nhé

```
*** Settings ***
*** Variables ***
&{DICT}          a=1    b=2    c=3
*** Testcases ***
TC01 - For loop
   Dictionary iteration
*** Keywords ***
Dictionary iteration
 FOR  ${key}   IN    @{DICT}
      Log to console   Key is '${key}' and value is '${DICT}[${key}]'.
 END
```

**Exiting for loop** => Keyword này dùng để kết thúc vòng lặp sẽ ko chạy vòng lặp nữa
```
*** Variables ***
&{DICT}          a=1    b=2    c=3  d=4
*** Testcases ***
TC01 - Exiting for loop
   ${text} =    Set Variable    ${EMPTY}
   FOR    ${var}    IN    one    two
      Run Keyword If    '${var}' == 'two'    Exit For Loop
      ${text} =    Set Variable    ${text}${var}
      log to console      ${text}
   END
   Should Be Equal    ${text}    one
```
**Continuing for loop**  : Keyword này sẽ bỏ qua key word ở dưới mà tiếp tục chạy tiếp vòng lặp
cho phép dừng vị trí hiện tại và tiếp tục vòng lặp cho giá trị tiếp theo
```
TC12 - Continue For Loop
   @{VALUES}   create List     1   2    CONTINUE   3
   FOR    ${var} IN @{VALUES}
       Run Keyword If '${var}' == 'CONTINUE' Continue For Loop
       log to console ${var}
   END
```

**Continue For Loop If:** sẽ thực hiện skip nếu biểu thức true

tham số: condition
    
```
TC13 - Continue For Loop If
   FOR    ${var} IN NEXT    TIME       CONTINUE     NEXT
       Continue For Loop If   '${var}' == 'CONTINUE'
       log to console ${var}
   END
```

**If expression: Key word dùng để kiểm tra điều kiện**
```
TC02 - If expression
   FOR     ${i}    IN RANGE   10
          ${ran}=      Set Variable    ${i}

          Run Keyword IF  ${ran}==${7}     log to console      =${ran}
          ...     ELSE    Run Keyword IF    ${ran} > ${7}      Log To Console    ${ran} Too high than ${7}
          ...    ELSE      Log To Console    ${ran}Too low than ${7}
      END
```
**Exit For Loop:** sử dụng để dừng vòng lặp

```
T19 - Exit For Loop
   FOR    ${var} IN ABC    BCD  EXIT    DHD
       Run Keyword If '${var}' == 'EXIT' Exit For Loop
       log to console      ${var}
   END
```
**Exit For Loop If** : dừng vòng lặp lến điều kiện trả về true   

tham số: condition
```
T20 - Exit For Loop If
   FOR        ${var}     IN     ABC    BCD  EXIT   DHD
       Exit For Loop If   '${var}' == 'EXIT'
       log to console      ${var}
   END

```

**Repeating single keyword:** Cho phép thực hiện keyword theo số lần truyền vào       
```
*** Testcases ***
TC01 Repeat Keyword
   Repeat Keyword    5    Continue Example
*** Keywords ***
Continue Example
  log to console       Repeat keyword
```