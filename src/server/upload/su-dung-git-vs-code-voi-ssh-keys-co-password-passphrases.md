VSCode thật sự là một công cụ tuyệt vời để code. Kèm với yêu cầu bảo mật và thuận tiện trong quá trình lập trình. Việc sử dụng SSH KEY đang ngày càng phổ biến và để bảo mật thì hầu hết chúng ta đều đặt mật khẩu (passphrases) cho khóa SSH. Với các bạn sử dụng Terminal thì sẽ được yêu cầu nhập mật khẩu mỗi khi bạn tương tác với Git Source. Số còn lại sẽ sử dụng Tool có sẵn của VS Code và tất nhiên các bạn sẽ gặp thông báo lỗi "Permission Denied". Và chỉ có cách dùng Terminal để giải quyết thông báo đó. 

![](https://images.viblo.asia/c3d5c402-0edf-4e35-a651-54356b96d809.png)
![](https://images.viblo.asia/f978968e-68fe-47f6-83ea-2bb4fa667c3e.png)

Tôi cũng đã mất khá nhiều thời gian trước khi tìm ra giải pháp. Hiện tại, chúng ta bắt đầu một vài cấu hình đơn giản để quên đi thông báo lỗi đó.

# Chuẩn bị công cụ
Trước khi bắt đầu, các bạn cần một số công cụ sau trước khi bắt đầu.
* PuTTY: Công cụ quản lý Server. Ở đây chúng để "chỉnh sửa" file id_rsa
    * Homepage: https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html
    * 32bit: https://the.earth.li/~sgtatham/putty/latest/w32/putty.zip
    * 64bit: https://the.earth.li/~sgtatham/putty/latest/w64/putty.zip
* Git: Quản lý source
    * Homeple: https://git-scm.com/download/win

## Bước 1. Thiết lập SSH Agent
Mở ứng dụng **PUTTYGEN.EXE** và thiết lập như sau
![](https://images.viblo.asia/ff87b7bb-12f4-4e18-bbf7-4720199fe24c.gif)

Mở ứng dụng **PAGEANT.EXE** và thiết lập như sau
![](https://images.viblo.asia/cf3c2ad9-3eff-460f-becd-adb3bb8c558e.gif)

## Bước 2. Thêm SSH Server Fingerprints
Tiếp theo chúng ta sẽ sử dụng ứng dụng **PLINK.EXE** để liên kết Domain Git với Key mới. Ứng dụng sẽ tự động xác thực mỗi khi chúng ta "PUSH" hoặc "PULL" từ Domain này. Mở Terminal ( cmd hoặc PowerShell )
```
// Đường dẫn putty phụ thuộc vào máy tính của bạn, nếu tải file zip thì giải nén và trỏ đến đấy, nếu cài đặt thì tìm trong C:\Program Files (x86)\PuTTY\
$ cd D:\putty
$ plink.exe git@github.com
$ plink.exe git@gitlab.com
$ plink.exe ... // Nếu bạn còn dùng thêm URL nào nữa thì add vào.
```

## Bước 3. Thiết lập biến môi trường ( Environment Variables )
Bước cuối cùng, bạn cần thay đổi biến môi trường GIT_SSH để Git sử dụng những thay đổi mới thay vì dùng SSH mặc định ban đầu của nó. 
* Kích chuột phải **My Computer** hoặc **This PC** trong **Windows/File Explorer** chọn **Properties**
* Chọn Advanced system settings
* Ở Dialog mở ra, mở thẻ Advanced  và chọn  Environment Variables...
* Tại ô User variables pane kích **New...**

![](https://images.viblo.asia/bf095223-ee42-41db-b380-3dcbe14a9489.png)

Khởi động lại VSCode để tận hưởng thành quả của bạn.

-----
Bài viết tham khảo từ nguồn: https://www.cgranade.com/blog/2016/06/06/ssh-keys-in-vscode.html