## GitStatus - ZSH theme

Hôm nay mình sẽ giới thiệu tới mọi người một theme cho Oh My ZSH mà mình đã làm cách đây cũng không lâu đó là Git Status. Mời anh em cùng tham khảo và trải nghiệm. Nếu thấy ổn thì đừng quên cho mình một sao vào repository nhé. Hoặc tạo issue nếu nó có vấn đề cần cải tiến.

Phiên bản GitStatus mình viết là bản phối lại các tính năng có trong theme https://github.com/oh-my-fish/theme-gitstatus của Oh My Fish, để mang GitStatus về cho Oh My ZSH.

Còn đây sẽ là ảnh screenshot khi sử dụng GitStatus để anh em chiêm ngưỡng trước:

![](https://github.com/kimyvgy/gitstatus-zsh-theme/raw/master/gitstatus.png)

## Đối tượng sử dụng

Vậy theme này sẽ hướng tới những ai? GitStatus là theme dành cho người thích sự đơn giản, không cầu kỳ mà vẫn cung cấp các tính năng, các thông tin hữu ích với Git để phục vụ quá quá coding cho các anh em thao tác các lệnh với git thường xuyên.

## Các tính năng chính

- Hiển thị full đường dẫn của thư mục hiện tại.  VD:
    - `/var/www/html`
    - `~/kimyvgy/gitstatus-zsh-theme`
- Tích hợp với plugin Shrink Path của Oh My ZSH giúp hiển thị đường dẫn rút gọn thay vì full path theo mặc định.
    - `/var/www/html` => `/v/w/html`
    - `~/kimyvgy/gitstatus-zsh-theme` => `~/k/gitstatus-zsh-theme`
- Tích hợp với Git để hiển thị các thông tin cần thiết:
    - HIển thị tên branch hiện tại
    - Hiển thị biểu tượng `*` nếu nhánh hiện tại đã có nội dung sửa đổi và chưa được commit
    - Hiển thị `!` nếu nhánh hiện tại có sửa đổi mà chư được commit, trong đó có file mới được thêm
    - Hiển thị `#` nếu toàn bộ các sửa đổi của nhánh hiện tại đã được add vào stage
    - Hiển thị `✓` nếu nhánh hiện tại sạch sẽ, không có nội dung bị sửa đổi mà chưa được commit
    - Highlight biểu tượng + tên nhánh với màu sắc riêng, chẳng hạn trường hợp hiển thị `*` ở trên sẽ có màu đỏ
- Highlight dấu nhắc lệnh `>` với màu đỏ khi lệnh được vừa thực thi trước đó có status code lỗi.

## Hướng dẫn cài đặt

- Việc cài đặt theme với Oh My ZSH thực hiện bằng cách clone source code của plugin về cho Oh My ZSH như sau:

```bash
git clone https://github.com/kimyvgy/gitstatus-zsh-theme.git ${ZSH_CUSTOM}/themes/gitstatus
```

- Sau khi thực hiện clone thành công, chọn theme GitStatus bằng cách đổi lại environment trong `~/.zshrc`:

```bash
ZSH_THEME="gitstatus/gitstatus"
```

- Áp dụng theme cho terminal hiện tại:

```bash
source ~/.zshrc
```

- Bật tính năng Shrink Path để hiển thị đường dẫn rút gọn thay thế, chỉ cần bật plugin `shrink-path`:
```bash
```

## Tổng kết

Trên đây là giới thiệu về ZSH theme ưu thích của mình. Một lần nữa mời mọi anh em Viblo trải nghiệm và cho mình xin feedback nhé. Cảm ơn mọi người rất nhiều!

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***