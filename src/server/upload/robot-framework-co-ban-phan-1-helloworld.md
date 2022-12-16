### Pre-condition:
1. Installed Python
2. Installed Robot Framework
3. Installed Notepad++ (Các bạn dùng editor nào cũng ok nhé! Ở đây mình quen sử dụng notepad++ nên mình sài thôi)

### Lesson 1: In ra màn hình console dòng chữ HelloWorld
Viết đoạn code sau vào Notepad++
```
*** Test Cases ***
TC001-Greeting
    Log To Console                      Hello World !!!
```
**Save** với tên file là **TC001-Greeting.robot**. Hiện tại mình sẽ lưu vào thư mục tên là RF trên Desktop

![](https://images.viblo.asia/2377728a-a082-4aaa-a701-d6f3152754cd.PNG)

Runcode:
* Step 1: mở command prompt
* Step 2: gõ lệnh để cd đến thư mục RF (C:\Users\Dell>**cd Desktop\RF** )
* Step 3: gõ lệnh để thực thi file robot như sau  C:\Users\Dell\Desktop\RF>**robot TC001-Greeting.robot**

Sau khi chạy command line, output:

![](https://images.viblo.asia/6a048443-b3cb-4b05-848b-2b7d4fea0056.PNG)

Nếu màn hình console hiển thị Hello World !!! thì bạn đã thành công, các bạn kiểm tra log file html sẽ được kết quả như sau:
![](https://images.viblo.asia/248daff2-976a-48fd-b854-ccd64e2d2423.PNG)

Phần tiếp theo mình sẽ giới thiệu về **sử dụng biến local** trong Robot Framework! Thân


-----

[Robot Framework Cơ Bản - Phần 1 - HelloWorld](https://viblo.asia/p/robot-framework-co-ban-phan-1-helloworld-ORNZqjxql0n)

[Robot Framework Cơ Bản - Phần 2.1 - Sử dụng biến local](https://viblo.asia/p/robot-framework-co-ban-phan-21-su-dung-bien-local-4P8564NOZY3)