# Giới thiệu
## `nvm`
Mình bấy lâu nay hay sử dụng một công cụ tên là **nvm** để quản lý đa phiên bản Node.js trên máy tính. *nvm* giúp mình có thể cài đặt được nhiều phiên bản node khác nhau, và đồng thời chuyển qua lại giữa chúng dễ dàng. Sau vài bước cài đặt đơn giản, bạn có thể sử dụng các lệnh như `nvm install 8.9.1` để cài đặt tự động ngay phiên bản 8.9.1, hay `nvm use 10.10.0` để chuyển sang sử dụng phiên bản 10.10.0 ở thư mục hiện tại, quá dễ đúng không?

Chưa kể, nó còn hỗ trợ đọc file tên là *.nvmrc* cùng thư mục để tự động chuyển sang dùng đúng phiên bản nodejs mà project cần. Với *nvm*, bạn cũng không cần phải dùng lệnh *sudo* mỗi khi muốn cài một package nào đó dưới dạng global (so với việc cài Node qua *apt* hay *pacman*), vân vân và mây mây...

Với ngôn ngữ **ruby** cũng có những trình quản lý phiên bản tương tự, bạn có thể đọc thêm bài viết về [chruby - ruby version manager](https://viblo.asia/p/de-dang-quan-ly-da-phien-ban-ruby-voi-chruby-YWOZrw3NlQ0) của mình nếu có sử dụng ruby.

## Nhược điểm của `nvm`
Sau một thời gian hạnh phúc với *nvm*, mình dần để ý đến việc cái terminal của máy mình **khởi động lên kha khá chậm** (cỡ 5-10s mới lên), và càng về sau mình càng thấy bực mình hơn! Mình sử dụng *zsh shell* cùng với *Oh my zsh*, *zsh* thì được cho là nhanh hơn cả *bash*, còn ờ thì *Oh my zsh* cũng khá chậm (sau mình đã thay thế nó với người hàng xóm là prezto hoặc zim), nhưng **thủ phạm chính thật bất ngờ** là *nvm*!

Sau khi comment đi những đoạn script load *nvm* trong file `~/.zshrc`, cái terminal của mình đã khởi động **nhanh trong chớp mắt**! Ờ thì muốn dùng công cụ xịn xò thì phải chấp nhận đánh đổi, nhưng mình vẫn thử tìm trên mạng xem có giải pháp nào tốt hơn không, và rất may là tìm thấy *fnm*!

# `fnm`
Nhắm đến việc trở thành một công cụ quản lý phiên bản cho Node.js nhanh và đơn giản nhất, *fnm* hoàn toàn được biên dịch thành dạng nhị phân chứ không phải là đoạn shell script. *fnm* được cho là **nhanh hơn x40 lần so với *nvm***!
![](https://raw.githubusercontent.com/Schniz/fnm/master/docs/fnm.svg)

## Cài đặt
Bạn chỉ cần chạy một dòng lệnh sau để tải và thực thi script tự động cài đặt *fnm*. Hỗ trợ 3 loại shell: bash, zsh và fish.

Câu lệnh cài đặt cho Linux:
```shell
curl -fsSL https://github.com/Schniz/fnm/raw/master/.ci/install.sh | bash
```

Sử dụng homebrew để cài đặt cho macOS:
```
brew install Schniz/tap/fnm
```

Hiện *fnm* mới chỉ hỗ trợ Linux và macOS nhé.
## Cách sử dụng
Dù nhỏ gọn đơn giản nhưng *fnm* cũng không thua gì với *nvm* cả. Các câu lệnh đơn giản như dưới đây.

Đọc tài liệu:
```
fnm --help
```

Danh sách các phiên bản Node đang có:
```
fnm ls
```

Danh sách các phiên bản Node có thể tải về:
```
fnm ls-remote
```

Cài phiên bản Node được ghi trong file `.nvmrc`/`.node-version` ở thư mục hiện tại:
```
fnm install
```

(Ví dụ) tải về phiên bản Node 10.10.0:
```
fnm install 10.10.0
```

Kích hoạt phiên bản Node được ghi trong file `.nvmrc`/`.node-version` ở thư mục hiện tại:
```
fnm use
```

(Ví dụ) kích hoạt phiên bản Node 10.10.0:
```
fnm use 10.10.0
```

Chừng ấy chắc cũng đủ dùng rồi nhỉ? Để biết đầy đủ hơn, hãy vào trang [GitHub của fnm](https://github.com/Schniz/fnm) để đọc thêm!

# Tham khảo
* [🚀 fnm: Fast and Simple Node.js Version Manager](https://hackernoon.com/fnm-fast-and-simple-node-js-version-manager-df82c37d4e87)
* https://github.com/Schniz/fnm