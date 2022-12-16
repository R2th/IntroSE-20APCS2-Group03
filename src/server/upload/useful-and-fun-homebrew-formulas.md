Homebrew là một trình quản lý gói nguồn mở cho macOS. Nó được biết đến như là trình quản lý gói bị thiếu cho macOS. Homebrew cũng được viết bằng ngôn ngữ lập trình Ruby.

Lý do tại sao các trình quản lý gói quan trọng là khi các nhà phát triển kết nối các ứng dụng của họ, chuyển hướng hoặc viết kịch bản, các gói phần mềm trở nên phụ thuộc lẫn nhau rất nhiều. Với một trình quản lý gói, việc kiểm tra tính tương thích và phụ thuộc hệ thống được loại bỏ và việc cài đặt các ứng dụng trở nên dễ dàng hơn rất nhiều.

## 1. Cask

Cask mang đến sự đơn giản và tốc độ để cài đặt và quản lý các ứng dụng GUI trên macOS. Nói một cách đơn giản, đó là một cách để cài đặt các ứng dụng trên máy Mac của bạn mà không gặp rắc rối khi googling nó và cài đặt nó trực tuyến.

```
$ brew install cask
```

- List apps: brew search —- casks
- Search apps: brew search (app_name)
- Install: brew cask install (app_name)
- Update: brew cask upgrade
- Help: brew cask help

[https://github.com/Homebrew/homebrew-cask](https://github.com/Homebrew/homebrew-cask)

## 2. Youtube-dl

Youtube-dl là một chương trình dòng lệnh được sử dụng để tải xuống video hoặc video YouTube từ bất kỳ nền tảng nào ở độ phân giải cao. Ngoài ra còn có rất nhiều chức năng khác mà bạn có thể thử nghiệm và bạn có thể kiểm tra chúng tại kho GitHub của họ bên dưới.

```
$ brew install youtube-dl
```

- Install ffmpeg: brew install youtube-dl ffmpeg
- Download highest-res: youtube-dl -f bestvideo+bestaudio 'link'
- Help: youtube-dl —- help

[https://github.com/ytdl-org/youtube-dl](https://github.com/ytdl-org/youtube-dl)

## 3. Speedtest

Speedtest-cli là giao diện dòng lệnh để kiểm tra băng thông internet. Nó cho phép bạn kiểm tra các máy chủ cụ thể và thậm chí cung cấp cho bạn một URL để bạn có thể khoe khoang về tốc độ internet của mình với bạn bè.

```
$ brew install speedtest-cli
```

- Run: speedtest-cli

[https://github.com/sivel/speedtest-cli](https://github.com/sivel/speedtest-cli)

## 4. Imagemagick

Imagemagick là một công cụ đa chức năng có thể được sử dụng để chuyển đổi một định dạng hình ảnh sang định dạng khác (ví dụ: JPEG thành PNG). Nó cũng có thể được sử dụng để thêm viền, hiệu ứng, cũng như thay đổi kích thước.

```
$ brew install imagemagick
```

- Add border (sample): convert testing.png -border 1x1 -bordercolor black result.png
- Add effect (sample): convert testing.png -charcoal 2 example.png
- Resize (sample): convert testing.png -resize 1920 (or x1080) example.png
- Help: convert help

[https://imagemagick.org/index.php](https://imagemagick.org/index.php)

## 5. mas

mas là giao diện dòng lệnh của Mac App Store cho phép bạn cài đặt các ứng dụng Mac từ App Store trực tiếp từ dòng lệnh.

Bạn có thể tìm kiếm ứng dụng, cài đặt tất cả các bản cập nhật hiện có, in số phiên bản của một ứng dụng trong cửa hàng và hơn thế nữa. Có cả một tùy chọn thú vị gọi là may mắn sẽ cài đặt kết quả tìm kiếm đầu tiên.

```
$ brew install mas
```

- List all apps: mas list
- Search for apps: mas search Xcode
- Install apps: mas install 497799835 (the version number of the app)
- Pending update apps: mas outdated
- Update apps: mas upgrade

[https://github.com/mas-cli/mas](https://github.com/mas-cli/mas)

## 6. wifi-password

wifi-password thực hiện chính xác những gì tên của nó gợi ý, nó hiển thị mật khẩu Wi-Fi của mạng mà bạn hiện đang kết nối. Sau khi nhập xác thực Keychain của bạn, mật khẩu hiển thị màu xanh lá cây tươi sáng.

```
$ brew install wifi-password
```

- Run: wifi-password

[https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)

## 7. tree

Tree là một công cụ liệt kê nội dung của các thư mục trong một thư mục theo định dạng giống như cây. Thủ thuật hữu ích này là một trình cứu sinh cho những ai muốn thể hiện trực quan nhanh cấu trúc tệp dự án.

```
$ brew install tree
```

- Run: tree

[http://mama.indstate.edu/users/ice/tree/](http://mama.indstate.edu/users/ice/tree/)

## 8. archey

archey hiển thị thông tin hệ thống của bạn bên trong terminal với biểu tượng Apple theo phong cách retro dựa trên văn bản.
```
$ brew install archey
```

- Run: archey
- Color: archey -c
- Black and white: archey -b

[https://obihann.github.io/archey-osx/](https://obihann.github.io/archey-osx/)