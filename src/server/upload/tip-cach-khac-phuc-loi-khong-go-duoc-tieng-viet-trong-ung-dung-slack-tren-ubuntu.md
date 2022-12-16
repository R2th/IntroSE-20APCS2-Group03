Như tiêu đề, nếu bạn nào đang gặp tình trạng không gõ được Tiếng Việt trong ứng dụng Slack / Telegram trong môi trường Ubuntu thì có thể tham khảo cách này để khắc phục nhé! :laughing: 

## Issue

Trường hợp lỗi của mình như này:
- Mình cài đặt Slack thông qua Ubuntu Software (Snap) - Ubuntu 18.04
- Hoàn tất quá trình đăng nhập
- Mở một channel lên và gõ: *"Em ddang lafm gif thees?"* :D
- Kết quả hiển thị trong khung chat: **"Em ddagn lafm gif thees?"** thay vì *"Em đang làm gì thế?"*

## Solution

Cách mình đã thực hiện để khắc phục là gỡ đi cài lại bằng file DEB như sau:
1. Mở Ubuntu Software
2. Tìm app Slack và nhấn "Remove" để gỡ cài đặt
3. Truy cập trang Download của Slack: https://slack.com/downloads/linux
4. Nhấn nút *"Download .DEB app"* để tải file cài dạng `*.deb`
5. Mở file `.deb` vừa tải lên và nhấn nút *Install*

![image.png](https://images.viblo.asia/6b24e518-fb86-4c1a-99ed-23400672c594.png)

## Kết quả

Mình đã gõ được Tiếng Việt trở lại rồi này!

![image.png](https://images.viblo.asia/7b210e59-c2b0-4ea5-896e-0be96e595603.png)