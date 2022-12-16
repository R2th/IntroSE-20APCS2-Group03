Loạt bài này mình sẽ giới thiệu cho các bạn về automation test, cũng như cách cài đặt và và viết thử một số testcase tự động bằng robot framework nhé!
vậy Robot Framework là gì?  
=> Nó chỉ đơn giản là một testing framework được sử dụng để viết automation cho việc test mà thôi.
Cung cấp cho các bạn các keyword sẵn để các bạn xây dựng test case. 

Trong robot bạn sẽ gặp khá nhiều từ liên quan tới keyword vậy keyword trong Robot là gì ?
===> Là các từ khóa được viết bằng python ngoài ra bạn có thể define keyword của riêng bạn mục đích sử dụng trong test case.

Mình lấy ví dụ cho dễ hiểu nhé, chúng ta sẽ viết test case cho phần login 
Vậy chúng ta sẽ có các test case : - Login thành công, login ko thành công 

Nhưng đều phải làm các bước nhập user, nhập pass
Vậy trong robot mình sẽ viết keyword phục vụ cho việc nhập thông tin User, keyword phục vụ cho việc nhập thông tin pass , 1 keyword Click vào button login

-  Test case login success mình chỉ cần truyền user và pass đúng 
-  Test case login success mình chỉ cần truyền user hoặc pass sai 

===> như vậy sẽ viết được kiểm thử tự động cho chức năng login rồi

**1. Cài Đặt ** :

 **Cài đặt python**
- vào link https://www.python.org/downloads/   ===> sau đó bạn download với version tương ứng với hệ điều hành của các bạn , giải nén và chạy
-  máy mình là Mac do vậy bạn vào terminal để kiểm tra nhé :
    +  pip3 -V
  ===> đây là kết quả của : 
  pip 18.1 from /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages/pip (python 3.6)
  
- Cài đặt Tool để code  và để chạy test case  ====> Mình đang dùng IntelliJ , các bạn có thể dùng Pycharm
 
**2. Tạo test case cơ bản**
phần này mình sẽ làm test case cơ bản để chạy trước, còn các thành phần test case các bạn đọc ở phần thứ 2 nhé sẽ rõ hơn đấy

- trước khi tạo test case => thì chúng ta phải cấu hình môi trường chạy cho nó đã
- đầu tiên vào IntelliJ tạo 1 project  trước đã :
![](https://images.viblo.asia/5786093d-b90e-46ac-8db7-ac862aeeaf94.png)

===> Chọn python rồi next và nhập tên project của bạn là okay   ( với các project đã có sẽ thì bạn chỉ cần import nó vào là xong )
 - sau đó vào References để cấu hình extenal tool

![](https://images.viblo.asia/850c5277-3fc3-4790-9b9f-21651435de1b.png)

===> Chọn Tool ==> Chọn External Tools  => nhấn vào dấu + để tạo external mới

nhập thông tin như sau:
Name : run_local ====> cái này thì đặt tên gì cũng được

Program: /Library/Frameworks/Python.framework/Versions/3.6/bin/robot

Arguments: -d $ProjectFileDir$/results/local -v env:local -v browser:chrome -e not-ready -e ignore -e local -v is_running_local:Y -t "*$SelectedText$*" "$FilePath$"

Working directiory: $ProjectFileDir$

![](https://images.viblo.asia/171c2c62-ef85-4606-ae4d-c6120ac3649b.png)

=== các bước trên là cài đặt python và môi trường chạy thôi bạn còn pải add 1 số lib cần dùng nữa
==> đầu tiên sẽ add robot framework  vào 
- nhấn tổ hợp phím : Command  ;  
=======> sẽ ra được cửa sổ ở dưới 
- Chọn dấu + ở dưới để 

![](https://images.viblo.asia/99c69b26-54a0-4c39-8f81-5131ff5d68df.png)

==> Nhập lib robotframework , do mình đang dùng version 3.1.2 rồi nên mình sẽ cài bản đó nhé

(Note : ngoài ra bạn có thể dùng pip3 để cài đặt nó bằng lệnh như sau:  pip3 install robotframework==3.1.2 )

- Tiếp theo tạo 1 folder TestCase trong Project => tạo file bai1.robot như sau:

![](https://images.viblo.asia/4102ec44-26fb-4113-9c0c-03c32c238c23.png)

trong file bai1.robot mình sẽ viết 1 test case cơ bản  như ở dưới để chạy thử

```
*** Test Cases ***
TC01 - Log
    log to console     thuonghoang
```


Để chạy test case bạn bôi đen TC01 rồi chọn extenal => chọn cấu hình external như trên mình hướng dẫn là được

![](https://images.viblo.asia/ae378de7-3113-4c6d-9c73-5eb1af212e18.png)

==== Và kết quả ở dưới nhé
![](https://images.viblo.asia/4d1018d2-5642-4510-b3db-df4bb7062048.png)

==> đây là bài giới thiệu sơ qua về  hướng dẫn cài đặt và thử chạy robot  bài tiếp theo mình sẽ giới thiệu chi tiết hơn về robot framework  sau đó mình sẽ hướng dẫn các bạn cách xây dựng keyword và viết các test case cơ bản

Thanks you !