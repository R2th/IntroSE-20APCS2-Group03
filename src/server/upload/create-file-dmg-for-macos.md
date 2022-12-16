Bài viết này hướng dẫn cách để có thể tạo được file dmg install cho ứng dụng trên macos.

# Chuẩn bị
- File cài application: *.app File này thường được gen ra từ việc build app: Product -> Archive.
- Chuẩn bị background install cho file dmg. Thường thì như sau:
![](https://images.viblo.asia/d0ced769-0dee-4abc-a3dc-220508dc99e8.png)

![](https://images.viblo.asia/288dd679-404f-4ad0-94ff-13754fafb292.png)

- Script hỗ trợ việc gen file dmg: https://github.com/create-dmg/create-dmg

# Bước 1
Bạn thế thể install script thông qua Homebrew:
-  `brew install create-dmg`


Bạn có thể tải xuống bản phát hành mới nhất và cài đặt nó từ đó:
- `make install`


Hoặc clone từ git của trang chủ và run nó
- `git clone https://github.com/create-dmg/create-dmg.git`

# Bước 2
Tạo 1 thư mục chứa bản build, background install và scrip để gen file dmg

Cấu trúc có thể như sau:
- Build DMG
    - installer_background.png
    - script.sh
    - source_folder
        - demo.app

# Bước 3

Viết scrip để thực hiện việc gen app. Mọi người có thể tham khảo từ source hoặc file sau

```
#!/usr/bin/env bash

//config create-dmg script ở đây
if [[ -e ../../create-dmg ]]; then
  # We're running from the repo
  CREATE_DMG= create-dmg
else
  # We're running from an installation under a prefix
  CREATE_DMG= create-dmg
fi

//config các thuộc tính để gen file dmg
create-dmg \
  --volname "demo" \ //tên của application trong folder đã nêu bên trên
  --background "installer_background.png" \ // background đã nói ở phần đầu
  --window-pos 200 120 \ // Tọa độ của cửa sổ install sau khi hiện lên
  --window-size 800 400 \ // kích thước của cửa sổ
  --icon-size 100 \ // kích thước của icon
  --icon "demo.app" 200 220 \ // tọa độ của app hiển thị trên window
  --app-drop-link 600 220 \ // tọa độ của folder applications
  "demo.dmg" \ // tên file dmg sau khi gen
  "source_folder/" // source của file *.app
```

# Bước 4
Sign file application.  Vì app không được publish qua Apple Store nên chúng ta cần sign/verify app để user có thể install mà không cần bất cứ quyền từ hệ thống.
Mình đã có 1 bài viết về phần này rồi. Mọi người có thể tham khảo.

DONE!

Cảm ơn mọi người đã luôn theo dõi và ủng hộ : )