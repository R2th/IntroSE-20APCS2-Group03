Trước khi cài đặt Visual Studio Code bạn cần phải cài đặt Python. Xem bài viết hướng dẫn dưới đây:

[Hướng dẫn cài đặt Python](https://viblo.asia/s/huong-dan-cai-dat-python-tren-he-dieu-hanh-windows-macos-linux-2020-b85og8R452G)

Visual Studio Code: là mã nguồn mở, là công cụ đắc lực cho việc lập trình với ưu điểm là nhẹ và hỗ trợ nhiều ngôn ngữ: Python, ReactJS, Node,...

Chúng ta sẽ sử dụng Homebrew để cài đặt Visual Studio Code.

**Homebrew** là công cụ quản lý package phổ biến, được sử dụng để cài đặt phần mềm mã nguồn mở như là: Node.

### Cài đặt HomeBrew

Mở ứng dụng terminal (/Applications/Utilities/Terminal) và chạy lệnh sau:

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Trong lúc cài đặt sẽ yêu cầu bạn nhập mật khẩu, bạn nhập mật khẩu máy tính vào, và đợi cài đặt trong 1-2 phút, tuỳ theo tốc độ mạng.

![Install HomeBrew Terminal](https://images.viblo.asia/03c2442b-c7f7-4406-8132-44720a52f706.png)

### Cài đặt Visual Studio Code

Trước khi cài đặt Visual Studio Code, chúng ta cập nhập HomeBrew bằng lệnh sau:

```
brew update
brew tap caskroom/cask
```

Sau đó cài đặt Visual Studio Code bằng cách nhập lệnh dưới đây:

```
brew cask install visual-studio-code 
```

Mở Visual Studio Code (/Applications/Visual Studio Code). Tại màn hình welcome chọn `Add workspace folder...` tạo thư mục với tên là `hello`

![Welcome screen](https://images.viblo.asia/db382e0c-ec8e-41bf-8071-b7ce7900dba0.png)

Click phải vào thư mục, chọn `New File` đặt tên file là `hello_world.py`.

![New File](https://images.viblo.asia/fe3ea0af-c666-4dd8-b1f6-b2bca99af26e.png)

Nhập đoạn code sau vào file `hello_world.py`.

```
print("Hello to Python world!")
```

Click vào góc dưới bên trái màn hình chọn phiên bản Python mới nhất, ở đây mình chọn 3.8.1

![Select Python version](https://images.viblo.asia/f942e388-f879-4352-9246-35b7e74dd877.png)

Click phải vào khung soạn thảo văn bản, chọn `Run Python File in Terminal`

Kết quả sẽ xuất ra là `Hello to Python world!`

![Hello Result](https://images.viblo.asia/e466ea60-f688-4051-a784-a7149fe1a063.png)

### Tổng kết

**Homebrew** là công cụ quản lý package phổ biến, được sử dụng để cài đặt phần mềm mã nguồn mở.
Sử dụng **Homebrew** giúp cho chúng ta cài đặt Visual Studio Code trong thời gian ngắn.

Trong lúc cài đặt. Nếu có vấn đề khi cài đặt, bạn hãy comment bên dưới, mình sẽ hỗ trợ trong thời gian sớm nhất!

Cảm ơn các bạn đã quan tâm bài viết này.

Tham khảo
[Cài đặt Homebrew](https://www.code2bits.com/how-to-install-visual-studio-code-on-macos-using-homebrew/).