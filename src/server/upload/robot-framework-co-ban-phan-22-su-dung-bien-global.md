### Lesson 2.2: Khai báo hai số nguyên a=5; b=4; c=10 (c là biến global) và tính tổng ba số nguyên a, b, c

Viết đoạn code sau vào Notepad++

```
# Biến c=10 được khai báo như global như thế này ???
*** Variables ***
${c}                                     ${10}

*** Test Cases ***
# Lesson 2.1: Khai báo 2 số nguyên a=5; b=4 và tính tổng 2 số nguyên đó
TC002.1-Lesson 2.1
    ${a}                 Set Variable    ${5}
    ${b}                 Set Variable    ${4}
    ${c}                 Evaluate        ${a} + ${b}
    Log To Console       Tổng 2 số nguyên: ${a} + ${b} là ${c}

# Lesson 2.2: Khai báo 3 số nguyên a=5; b=4; c=10 và tính tổng 3 số nguyên đó
TC002.2-Lesson 2.2
    ${a}                 Set Variable    ${5}
    ${b}                 Set Variable    ${4}
    ${tong}              Evaluate        ${a}+${b}+${c}
    Log To Console       Tổng 3 số nguyên: ${a} + ${b} + ${c} là ${tong}
```
Save file với tên **TC002-Variables.robot**. Hiện tại mình sẽ lưu vào thư mục tên là RF trên Desktop

![](https://images.viblo.asia/cfe83dad-a5cd-4eba-93df-992d95ab180a.PNG)

**Runcode:**

* Step 1: mở command prompt
* Step 2: gõ lệnh để cd đến thư mục RF (C:\Users\Dell>**cd Desktop\RF** )
* Step 3: gõ lệnh để thực thi file robot như sau C:\Users\Dell\Desktop\RF>**robot TC002-Variables.robot**

**Sau khi chạy command line, output:**
![](https://images.viblo.asia/5ed84c2c-aa4e-466a-b933-69325af56095.PNG)
Với code trên biến c được khởi là 10, sau khi đi qua TC002.1-Lesson 2.1, biến c được gán bằng 9. Nhưng khi đi qua TC002.2-Lesson 2.2 biến c vẫn giữ nguyên như giá trị lúc khởi tạo bẳng 10. Vậy để  biến c như một biến global ta làm thế nào.
```
*** Variables ***
${c}                                     ${10}

*** Test Cases ***
# Lesson 2.1: Khai báo 2 số nguyên a=5; b=4 và tính tổng 2 số nguyên đó
TC002.1-Lesson 2.1
    ${a}                 Set Variable    ${5}
    ${b}                 Set Variable    ${4}
    ${c}                 Evaluate        ${a} + ${b}
    Set Global Variable                  ${c}
    Log To Console       Tổng 2 số nguyên: ${a} + ${b} là ${c}

# Lesson 2.2: Khai báo 3 số nguyên a=5; b=4; c=10 và tính tổng 3 số nguyên đó
TC002.2-Lesson 2.2
    ${a}                 Set Variable    ${5}
    ${b}                 Set Variable    ${4}
    ${tong}              Evaluate        ${a}+${b}+${c}
    Log To Console       Tổng 3 số nguyên: ${a} + ${b} + ${c} là ${tong}
```
Save file với tên **TC002-Variables.robot**. Hiện tại mình sẽ lưu vào thư mục tên là RF trên Desktop

![](https://images.viblo.asia/e1bd6a4d-f219-4cb4-b0db-1636fb666962.PNG)

**Runcode:**

* Step 1: mở command prompt
* Step 2: gõ lệnh để cd đến thư mục RF (C:\Users\Dell>**cd Desktop\RF** )
* Step 3: gõ lệnh để thực thi file robot như sau C:\Users\Dell\Desktop\RF>**robot TC002-Variables.robot**

**Sau khi chạy command line, output:**

![](https://images.viblo.asia/4ab2c9c2-523f-4fdd-a23c-6fc80c736795.PNG)

Với code trên biến c được khởi là 10, sau khi đi qua TC002.1-Lesson 2.1, biến c được gán bằng 9. Và khi đi qua TC002.2-Lesson 2.2 biến c vẫn giữ nguyên là 9. Như vậy để biến c có thể dùng như biến global, mình thêm vào dòng lệnh
```
    Set Global Variable                  ${c}
```

Phần tiếp theo mình sẽ chia sẻ List trong Robot Framework! Các bạn đóng góp ý kiến để mình viết tốt hơn nhé! Thân !