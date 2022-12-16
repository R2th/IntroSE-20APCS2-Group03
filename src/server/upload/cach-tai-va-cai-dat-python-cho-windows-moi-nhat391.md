Trong bài viết hôm nay mình sẽ chỉ các bạn cách tải và cài đặt Python trên môi trường windows nhằm phục vụ cho quá trình học tập và thực hành. 

## Tải bản cài đặt Python về máy
Việc trước tiên cần làm là chúng ta phải tải bản cài đặt về máy tính. Tại thời điểm viết bài viết này thì phiên bản mới nhất của python là *3.9.1* nếu các bạn có vấn đề trong quá trình cài đặt có thể comment trong phần comment của bài viết gốc. Mình rất sẵn lòng được hỗ trợ các bạn.

Truy cập đường link tới trang chủ của python: ***https://www.python.org/downloads/***

![](https://images.viblo.asia/2066851e-e736-4d91-9d98-758493d2a7ef.png)

Chờ quá trình tải về hoàn tất ta sẽ có file: ***python-3.9.1-amd64.exe***

## Các bước cài đặt
mở file .exe vừa được tải về. Nếu có Security Warning như hình dưới thì các bạn cứ chọn Run để tiếp tục.
![](https://images.viblo.asia/25394cde-a95e-420f-89ac-f2a3e6adad59.png)

Khi trình cài đặt được mở ra cách bạn chọn **Install Now**.  Mình thường chọn **Add Python 3.9 to PATH** để có thể dùng trong một số khác và nhiều ứng dụng khác cần python để hoạt động

![](https://images.viblo.asia/83a76146-5b12-4aa8-8919-bcec61121e9e.png)

Giờ chúng ta chỉ cần chờ quá trình cài đặt hoàn tất.
![](https://images.viblo.asia/166ccae0-62e0-49c3-879b-d42ecc4ef360.png)

Sau khi quá trình cài đặt hoàn tất sẽ có hình như bên dưới. 
![](https://images.viblo.asia/ac09bb53-50ba-40b4-b133-55f2e49e48bc.png)

**Khuyến khích:** Sau khi cài đặt thành công chúng ta có 1 thêm một việc nên làm là vô hiệu hóa chiều dài tối đa của hệ điều hành. Thông thường đường dẫn tuyệt đối của một tệp không được quá 260 ký tự. Việc vô hiệu hóa giới hạn độ dài file cho chúng ta có thể tạo tên file dài hơn và có đường dẫn dài hơn. Để làm điều này chỉ cần click chuột vào **Disable path length limit** mọi việc còn lại để trình cài đặt lo liệu. Giờ chúng ta có thể đóng(Close) trình cài đặt.

## Chạy chương trình "Hello world" bằng Python

Để kiểm tra xem quá trình cài đặt cho kết quả như nào chúng ta hãy chạy chương trình "Hello world" kinh điển trong giới lập trình. 

Mở trình command line và gõ ***python***
Sau khi gõ và nhấn enter ta sẽ thấy thông tin về phiên bản python đã được cài đặt tương tự như dưới:

```
Python 3.9.1 (tags/v3.9.1:1e5d33e, Dec  7 2020, 17:08:21) [MSC v.1927 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

Viết chương trình hiện thị "Hello world" nào, gõ **`print("Hello world, I'm a great Python developer")`**

**Kết quả:**
```
>>> print("Hello world, I'm a great Python developer")
Hello world, I'm a great Python developer
>>>
```



-----


Bài viết gốc: ***https://www.tranthanhdeveloper.com/2020/12/tai-va-cai-at-python-cho-windows.html***