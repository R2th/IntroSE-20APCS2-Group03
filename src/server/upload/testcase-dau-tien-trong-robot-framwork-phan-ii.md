Bài viết được tham khảo từ nguồn:

https://robotframework.org/#examples
https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#creating-test-cases


*Trong phần II, mình xin giới thiệu một số nội dung như sau:*

- Cài đặt 3 package: Selenium, Robotframwork và Robotframework-seleniumlibrary
- Cấu trúc folder của một dự án
- Tạo từng testcase
- Chạy testcase
- Xem báo cáo

# 1. Cài đặt một số thư viện (tiếp theo Phần I)

## 1.1. Cài đặt 3 package

- Selenium
- Robotframwork
- Robotframework-seleniumlibrary

### 1.1.1. Cài đặt Selenium

Từ thanh Menu của Pycharm: File -> Setting

![](https://images.viblo.asia/48f8c1a6-a1f3-4cbf-8219-253c8c82c45b.png)

Trên cửa số Setting -> Tên dự án -> Chọn Python Interpreter

![](https://images.viblo.asia/4b3bd95d-cdd2-4f51-8dd5-c7754daa2257.png)

Từ biểu tượng cài đặt ở góc trên phải màn hình click vào và chọn [+]
![](https://images.viblo.asia/4ef016c3-b97a-476c-9d59-9bed23d7c053.png)

Install Package selenium

![](https://images.viblo.asia/151435e4-42d2-48b1-a0f5-6a4fcedd44b7.png)

### 1.1.2. Cài đặt Robotframwork

Install Package Robotframwork

![](https://images.viblo.asia/17f1e09e-a1f7-48eb-a089-9b53b41df32d.png)

### 1.2.3. Cài đặt Robotframework-seleniumlibrary

Install Package Robotframwork Robotframework-seleniumlibrary

![](https://images.viblo.asia/6f58dcad-aebf-41e6-807c-79aa27cbaa46.png)

# 2. Cấu trúc Folder dự án
- Tên dự án
- Testcase.robot
- Library (python.py)
- Result (report.html)

## 2.1. Tạo folder Testcase

Click vào tên dự án -> File -> Directory (Gõ tên folder muốn đặt, ví dụ: TestCases)

![](https://images.viblo.asia/cbf474df-ea3a-41ee-9192-fda935f73cbb.png)

## 2.2. Tạo từng testcase trong folder TestCase 

Click vào tên folder Testcase trên mục 1.3.1  -> File (Gõ ID testcase muốn đặt ví dụ: TC1.robot, TC2.robot...)

![](https://images.viblo.asia/f95ef50f-4045-46cc-8e30-92b1d32d3da1.png)

=> Sau khi tạo xong mục 1.3.1 và 1.3.2 ta được cấu trúc file Testcase như sau:

![](https://images.viblo.asia/86fc208e-2dde-40e9-bd33-ef426a566309.png)


# 3. Tạo từng Testcase

Các thành phần trong 1 file script:

1. Setting
2. Variables
3. Testcase
4. Keywords (Có thể có có thể không)

```
Ví dụ về một testcase cho chức năng "Login"

*** Settings ***
Documentation     A test suite with a single test for valid login.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.txt

*** Test Cases ***
Valid Login
    Open Browser To Login Page
    Input Username    demo
    Input Password    mode
    Submit Credentials
    Welcome Page Should Be Open
    [Teardown]    Close Browser
```
    
    
# 4. Chạy Testcase 
 
 Run testcase (ở đây là run TC1) bằng cách gõ câu lệnh cho cấu trúc như đã tạo ở trên: robot TestCases\TC1.robot -> Nhấn Enter key trên bàn phím.
 
 ![](https://images.viblo.asia/e74770b4-63cd-4b47-a0fa-8d96d69ee5bf.png)
 
# 5. Xem báo cáo

Từ Tên dự án -> report.html -> Open in Browser -> Chrome

![](https://images.viblo.asia/20b63cd1-3488-4cce-8870-905f7681096e.png)

File report nhìn sẽ như sau:

![](https://images.viblo.asia/eba09aa7-195c-4954-88e9-73e76a230827.png)

# Kết luận
Bên trên mình đã giới thiệu về cấu trúc tạo một folder của dự án, và một ví dụ về chức năng login. Các bạn có thể tham khảo khi dùng Pycharm để cho autotest.