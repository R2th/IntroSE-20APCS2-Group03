![](https://images.viblo.asia/20833854-7de1-49e6-aac0-8d08e763ffb3.jpg)

Trước đây khi tạo dựng một app đa nền tảng với React Native, mọi người đã quen với việc init project trên terminal rồi open project bằng Atom, VSCode, Sublime Text, Vim hay Emacs ..v.v Ngay cả với việc dùng Expo với phiên bản trước thì họ cũng đưa ra XDE để làm việc open source code giúp cho các lập trình viên làm việc dễ dàng hơn.
Hiện tại đã có giải pháp đơn giản và tiện ích hơn bằng việc sử dụng **Expo Snack** chúng ta có thể tạo 1 project react native chỉ với 1 click đơn giản ( à đương nhiên là bạn phải login vào trang chủ https://snack.expo.io/ rồi nhé). 
Dưới đây sẽ trình bày lần lượt các thao tác để chúng ta làm việc với Expo Snack tốt nhất các bạn làm theo trình tự nhé, nếu bạn nào đã cài Node JS rồi thì bỏ qua bước đó.

### 1. Cài đặt Expo Snack

Cài đặt Node.js : 

**Ubuntu OS:**

`sudo apt install curl`

`curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -`

`sudo apt install nodejs`

**Mac OS:**

Yêu cầu : **XCode** & **Homebrew** 

 Nếu chưa có XCode thì bạn tải về từ App Store nhé.
 Homebrew cài bằng command trên terminal :
 `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

 Ok, sau khi cài đặt hoàn tất bạn chỉ cần chạy lệnh sau để cài Node thôi: `brew install node`
 
**Kiểm tra:**
 Chạy lệnh sau : 
 
` node -v`
=> v11.1.0 | Nếu nó hiển thị ra dòng sau là thành công (phiên bản hiện tại của node, của bạn có thể khác so với ví dụ)

` npm -v`
=> 6.4.1

Tiếp theo sẽ cài đặt Expo, hãy chạy command sau:

`npm install -g expo-cli`
`npm install expo-cli --global` 

Package dưới để dùng khi bạn hoàn thành app và publish nó.

Cuối cùng là chúng ta tải app Expo tương ứng với điện thoại hiện tại của mình trên [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent) hay [App Store.](https://itunes.com/apps/exponent)
App này hoạt động gần giống Testflight trên iOS.

Hoặc bạn có thể chạy trực tiếp trên simulator nếu muốn, thậm chí là không cần simulator luôn vì nó được tích hợp sẵn trên trình duyệt của bạn rồi. Ok giờ chúng ta sẽ sang phần thú vị hơn nhé =))

### 2. Tạo React Native App với Snack Expo

**a) Khởi tạo App**

Sign up 1 account tại : https://snack.expo.io

Sau khi login thành công bạn nhìn thấy giao diện như này, của mình đang có vài project sample: 

![](https://images.viblo.asia/75e8dcf7-8e14-44ae-aa39-62164248384a.jpg)

Click "**Create A New Snack**". Rất nhanh chóng chúng ta có sẵn code react native sample và có ngay simulator để chạy ứng dụng mà bạn tạo ra :

![](https://images.viblo.asia/418a4f48-8fa3-4f4c-b17d-4b406d9c063b.png)

**b) Chạy thử**

Bạn có thể click vào button "**Tab to Play**" trên simulator của trình duyệt. Hoặc click vào **Run** để chạy trên device thật. Với điều kiện bạn đã cài app Expo ở bước 1 rồi nhé. 
Nhập id của device ở cuối app.

Hình ảnh chạy thử của mình, đây là một ứng dụng Chat:

![](https://images.viblo.asia/b69ca4dd-cdb2-4712-9e74-0e3b53d53c46.jpg)

Từ giờ bạn chỉ việc chỉnh sửa trên trình duyệt và lưu lại code hoặc export xuống máy tính của mình. Mỗi khi run app bạn chỉ cần vào app Expo và click vào project snack đang phát triển của mình thôi.


### 3. Tổng kết

Trên đây là các bước làm để các bạn có thể phát triển react native đa nền tảng mà không phải quá lo lắng về việc cài đặt môi trường phức tạp và những môi trường riêng biệt như iOS và Android. Bạn có thể code ngay trên trình duyệt máy tính của mình và build khá dễ dàng. Mình hy vọng bài viết sẽ mang lại sự hữu ích cho ai đó mới tiếp xúc với react native hoặc đang tìm kiếm sự đơn giản hơn để phát triển ứng dụng, nếu bạn có ý kiến đóng góp hoặc cách làm thú vị hãy chia sẻ cho mình ở dưới comment nhé. Thank you for reading :)