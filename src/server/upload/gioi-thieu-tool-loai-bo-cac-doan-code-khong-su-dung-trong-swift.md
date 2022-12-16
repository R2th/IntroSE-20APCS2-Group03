# Giới thiệu
Trong các project, khi developer chúng ta thực hiện việc viết code, đôi khi định nghĩa ra các variable, các func hoặc các class mà có thể không bao giờ sử dụng đến, hoặc khi maintain chúng ta lại sử dụng một cái khác, không sử dụng cái cũ nữa mà không xoá hay không kiểm soát được các đoạn code không sử dụng đến, việc này làm cho code của chúng ta trở thành 'rác' :v: . Vậy hôm nay tôi sẽ giới thiệu đến với các bạn một công cụ để các bạn có thể tìm ra những variable, func hay đoạn code mà các bạn không sử dụng đến trong project iOS (swift): đó là  [Periphery](https://github.com/peripheryapp/periphery)
# Cài đặt
## Cài đặt Homebrew
**Periphery** được cài đặt thông qua **Homebrew**, một trình quản lý pagekage phổ biến với nhiều nhà phát triển sử dụng macOS. Nếu bạn đã là người dùng **Homebrew**, bạn có thể bỏ qua bước này.

Cài đặt **Homebrew**:
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
## Cài đặt Periphery
Sau khi cài đặt Homebrew, chúng ta cài đặt  **Periphery**
```
brew tap peripheryapp/periphery
brew cask install periphery
```
# Sử dụng Periphery
Sử dụng command *scan*

Chúng ta truy cập vào thư mục iOS project rồi thực hiện việc *scan*:
```
periphery scan
```

sau khi chạy lệnh scan, *periphery* sẽ hỏi bạn một số config:

![](https://images.viblo.asia/b188a579-ce2c-406d-ba8b-0a60c6711d8d.png)https://images.viblo.asia/b188a579-ce2c-406d-ba8b-0a60c6711d8d.png

sau đó, *periphery* sẽ quét trong project của bạn tất cả các đoạn code mà bạn không sử dụng đến:

![](https://images.viblo.asia/4d763a08-c60d-499f-8350-49e10a61cfe0.png)https://images.viblo.asia/4d763a08-c60d-499f-8350-49e10a61cfe0.png

Các bạn có thể thấy, bên trên là một project nhỏ cá nhân của tôi, sau khi thực hiện việc scan thì thấy quá nhiều đoạn code thừa :(. Sau khi tìm được chúng ta thực hiện việc fix lại những dòng code này, để dễ cho việc maintain sau này hơn.

# Kết luận
Trên đây tôi đã giới thiệu đến các bạn một tool để quét tất cả các đoạn code không sử dụng trong iOS project, nó sẽ giúp cho project của các bạn clean hơn, chuyên nghiệp hơn :v:.
Cám ơn các bạn đã đọc bài viết.
[Nguồn](https://github.com/peripheryapp/periphery)