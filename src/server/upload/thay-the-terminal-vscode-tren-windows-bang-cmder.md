Với những bạn đã quen với Linux hoặc quen thuộc với cách gõ lệnh thì Terminal (cmd hay PowerShell) trên Windows phải nói là ... không thể xài tốt được. Có một vài trình Terminal khá tốt được tạo ra để thay thế cho terminal mặc định trên windows. Một trong những cái mình đang xài là Cmder. Dùng một thời gian thấy khá tốt, hỗ trợ cả Unicode, gõ không lỗi bất chợt, build code đều hiển thị khá tốt. 

# Hướng dẫn
## Chuẩn bị
* VSCode: Tất nhiên phải có. Tải tại: [](https://code.visualstudio.com/download)
* Cmder: Chọn bản Mini tại mục Download: https://cmder.net/

## Tiến hành
Giải nén Cmder vào một như mục bất kì, Ở đây mình giải nén vào thư mục **D:\DeveloperTools\Cmder**.
Tiếp thao mở VScode, **File/ Preferences/ Settings** Hoặc bấm **Ctrl+,** , Mở Settings dạng JSON
![](https://images.viblo.asia/3725fd14-5db6-4dc8-b66a-5d5d37de688f.png)
Sau đó bạn thay thế (nếu tồn tại) hoặc thêm 2 dòng bên dưới, chú ý đường dẫn phải có 2 dấu \\
```
    "terminal.integrated.shell.windows": "cmd.exe",
    "terminal.integrated.env.windows": {
        "CMDER_ROOT": "D:\\DeveloperTools\\Cmder"
    },
    "terminal.integrated.shellArgs.windows": [
        "/k",
        "%CMDER_ROOT%\\vendor\\init.bat"
    ],
  ```
  
  Khởi động lại VSCode để trải nghiệm.