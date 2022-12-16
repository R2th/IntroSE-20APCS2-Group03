### Hyper-V là gì ?
Hyper-V là tính năng cực được chào đón với những người dùng là doanh nghiệp trên Windows. Với khả năng ảo hóa đi kèm nhiều hỗ trợ mở rộng, Hyper-V giúp người dùng tăng hiệu suất làm việc trong khi tiết kiệm được năng lượng điện và chi phí. Hyper-v lần đầu tiên được đưa vào hệ điều hành Windows Server 2008, và kể từ đó nó trở thành một thành phần không thể thiếu của Windows. Bản Windows 11 tất nhiên cũng cung cấp tính năng tuyệt vời này, nhưng Hyper-V lại chỉ có Hyper-V trên Windows 11 phiên bản Pro. Dù thế, nếu bạn đang dùng Windows 11 bản Home thông thường thì vẫn có thể sử dụng tính năng này bằng cách cài đặt Hyper-V theo hướng dẫn sau.

### cài đặt Hyper-V trên Windows 11 Home

* Mở Notepad hoặc một trình soạn thảo nào đó như vscode chẳng hạn để tạo một file text
* Dán nội dung code bên dưới vào file 
    ```
    pushd "%~dp0"
    dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hv.txt
    for /f %%i in ('findstr /i . hv.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"
    del hv.txt
    Dism /online /enable-feature /featurename:Microsoft-Hyper-V -All /LimitAccess /ALL
    pause
   ```C
* Lưu file với tên file là *hv.bat*. Bạn có thể lưu file này ở bất cứ thư mục nào bạn muốn.

    ![image.png](https://images.viblo.asia/9dc71f6a-db49-4c52-9319-47185886e786.png)
* Click phải chuột và chọn *Run as administrator.*
* Bạn cần phải chờ một vài phút để cài đặt. Sau khi việc cài đặt hoàn tất bạn phải khởi động lại máy
* Hyper-v sẽ được tự động cài đặt và bạn có thể thấy nó khi nhập *Hyper-V Manager* trên thanh tìm kiếm tại menu Start

    ![image.png](https://images.viblo.asia/fd01baa1-3ca4-4625-9cf2-fe35ad9fe673.png)
* Nếu bạn khong thấy nó hiển thị có thể cố gắng thực hiện những bước như dưới:
    * Mở *Settings* và chọn *Apps* > *Optional features*
    * Scroll xuống dưới cùng và click *More Windows features*
    * Tìm Hyper-V trên danh sách và enable nó. Bây h bạn cần phải khởi động lại máy
    
        ![image.png](https://images.viblo.asia/57ba7f77-7c3a-4ab1-98d7-a2cabd92191c.png)

Bây giờ bạn có thể sử dụng Hyper-V để tạo và quản lý các máy ảo cho riêng mình.

Một điểm rất đáng tiếc là việc cài đặt Hyper-V không kích hoạt Windows Sandbox. Đây là một tính năng ảo hóa thú vị khác của Windows.