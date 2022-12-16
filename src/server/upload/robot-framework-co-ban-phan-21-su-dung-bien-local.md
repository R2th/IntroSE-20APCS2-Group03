Bài trước mình đã làm một ví dụ [**In ra màn hình console dòng chữ HelloWorld**](https://viblo.asia/p/robot-framework-co-ban-phan-1-helloworld-ORNZqjxql0n). Bài này mình xin chia sẻ một chút về cách sử dụng biến local (biến địa phương) trong Robot Framework
### Lesson 2.1: Khai báo hai số nguyên a=5; b=4 và tính tổng hai số nguyên đó
* Để khai báo biến a=5, b=4 mình sử dụng từ khóa(hay keyword) **Set Variable** 
* Để thực hiện các phép toán **a + b** mình sử dụng từ khóa(hay keyword) **Evaluate**
 
Viết đoạn code sau vào Notepad++

```
*** Test Cases ***
# Lesson 2.1: Khai báo hai số nguyên a=5; b=4 và tính tổng hai số nguyên đó
TC002.1-Lesson 2.1
    ${a}                 Set Variable    ${5}
    ${b}                 Set Variable    ${4}
    ${tong}              Evaluate        ${a}+${b}
    Log To Console       Tổng hai số nguyên: ${a}+${b} là ${tong}
```

Save file với tên **TC002-Variables.robot**. Hiện tại mình sẽ lưu vào thư mục tên là RF trên Desktop

![](https://images.viblo.asia/182f64e0-3955-4b4b-aed2-b33017adf664.PNG)

Runcode:

* Step 1: mở command prompt
* Step 2: gõ lệnh để cd đến thư mục RF (C:\Users\Dell>**cd Desktop\RF** )
* Step 3: gõ lệnh để thực thi file robot như sau C:\Users\Dell\Desktop\RF>**robot TC002-Variables.robot**

Sau khi chạy command line, output:

![](https://images.viblo.asia/56737992-9333-4fc3-a37a-f9487b60fc8d.PNG)

Nếu màn hình console hiển thị kết quả **...Tổng hai số nguyên: 5+4 là 9** !!! thì bạn đã thành công, các bạn kiểm tra log file html sẽ được kết quả như sau: 
![](https://images.viblo.asia/10fbcb30-f578-44aa-8be6-bd7ba2624ea0.PNG)

Phần tiếp theo mình sẽ chia sẻ **Sử dụng biến global** trong Robot Framework! Thân.