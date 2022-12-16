Việc phát triển các ứng dụng di động "Hybrid" (Hybrid mobile application) đang là một trong những topic nóng tại thời điểm hiện tại. PhoneGap là một trong những Framework có thể được sử dụng để phát triển các ứng dụng di động "Hybrid".  Bài viết này mình sẽ hướng dẫn các bạn cách cài đặt và chạy PhoneGap trên Ubuntu với một Android Emulator. Nhưng trước hết,
# PhoneGap là gì ?
[PhoneGap](https://phonegap.com/) là một  framework open source miễn phí  được áp dụng rộng rãi để phát triển ứng dụng di động đa nền tảng, giúp chúng ta build được các app di động sử dụng nhưng Web API cơ bản để chạy trên các nền tảng khác nhau. Framework open source này đã được Nitobi Software (nay là Adobe) phát triển. Nó cho phép các nhà phát triển build các ứng dụng bằng HTML, JavaScript và CSS.

PhoneGap lần đầu tiên được đặt tên là Apache Cordova, được giới thiệu bởi Nitobi. Adobe đã mua Nitobi và đổi cái tên Apache Cordova thành PhoneGap. 

![](https://images.viblo.asia/fa2cf132-d706-4241-af40-7dd022b760bc.png)
## Cài đặt PhoneGap
Bắt đầu thôi!
### 1. Cài đặt NodeJs
```shell
sudo apt-get update
sudo apt-get install nodejs
```

Tiếp theo là cài đặt trình quản lý Package của Node.js: `npm`

```shell
sudo apt-get install npm
```

Lúc này `Node.js` và `npm` đã được cài đặt. Khi ubuntu cài đặt package, nó tự động đặt tên thực thi cho `Node.js` là `nodejs`. Tuy nhiên đối với một vài ứng dụng, bao gồm cả PhoneGap, đều mặc định coi tên thực thi của  `Node.js` là `node`. Để sửa lại việc không đồng bộ này, chúng ta chỉ việc tạo một `symlink` tên là `node` rồi trỏ nó đến `nodejs` như sau: 
```shell
sudo ln -s /usr/bin/nodejs /usr/bin/node 
```

### 2. Cài đặt Git
```shell
sudo apt-get install git
```

### 3. Cài đặt Ant

```shell
sudo apt-get install ant
```

### 4. Cài đặt PhoneGap
```shell
sudo npm install -g phonegap
sudo npm install -g cordova
```

Việc cài `Cordova`  không thật sự quan trọng nhưng sẽ cần thiết nếu sau này bạn sử dụng các plugins của `Cordova`

Cài các thư viện C/C++ mà PhoneGap sử dụng: 
```shell
sudo apt-get install lib32z1 lib32ncurses5 lib32bz2-1.0 lib32stdc++6
```

Gõ `phonegap` để kiểm tra xem `PhoneGap` đã được cài đặt hay chưa:
![](https://images.viblo.asia/b516eced-04e3-40eb-92c3-edbdc5d8bcd3.png)
### 5. Cài đặt Android SDK
Bạn có thể tải bộ SDK tại [đây](http://developer.android.com/sdk/index.html). Giải nén vào thư mục `/usr/local/android-sdk` bằng câu lệnh sau
```shell
sudo tar -zxvf ~/Downloads/android-sdk_r24.0.2-linux.tgz -C /usr/local/
```

Tiếp theo chúng ta sẽ thiết lập các biến môi trường cho file config bash, để PhoneGap có thể gọi tới máy ảo giả lập Android bằng cách sửa file `.bashrc`: 

```shell
vim ~/.bashrc
```

Thêm các dòng sau

```shell
export PATH=$PATH:/usr/local/android-sdk-linux/
export PATH=$PATH:/usr/local/android-sdk-linux/tools
export PATH=$PATH:/usr/local/android-sdk-linux/platform-tools
export PATH=$PATH:/usr/local/android-sdk-linux/build-tools
```

Sau đó lưu lại những thay đổi

```shell
source ~/.bashrc
```

Gõ `android` để bật `Android SDK Manager`
![](https://images.viblo.asia/8b442e25-6300-413a-b995-ea9b04d042ce.png)

### 6. Cài đặt Java (JDK & JRE)
```shell
sudo apt-get install openjdk-7-jre
sudo apt-get install openjdk-7-jdk
```

### 7. Cài đặt trình giả lập Android
Trong bài này mình sẽ hướng dẫn các bạn cài đặt [Genymotion](https://www.genymotion.com/).

 1. Trước tiên để cài được Genymotion cần cài VirtualBox. Bạn nào đã cài VirtualBox trên Ubuntu rồi thì bỏ qua bước này.
 ```shell
sudo apt-get install virtualbox
```
2. Truy cập trang tải [Genymotion](https://www.genymotion.com/) => Sign in => Tải phiên bản Genymotion phù hợp với bản Ubuntu của bạn.

3. Truy cập thư mục chứa file vừa tải về mà mở Terminal gõ các lệnh sau:
```shell
chmod +x genymotion-2.7.1-linux_x64.bin
./genymotion-2.7.1-linux_x64.bin
```
4. Truy cập vào thư mục cài đặt Genymotion. Mặc định là: ‘/home/[username]/genymotion/’
```shell
cd /home/[username]/genymotion/
./genymotion
```
Nhấn Yes để bắt đầu thêm Virtual Device đầu tiên

![](https://images.viblo.asia/c3efd7b1-70d5-4f3e-8202-aef00a3cb67e.png)
Nhấn Connect => Login => Install một Device

![](https://images.viblo.asia/23fc997c-8852-4824-a38c-b7da53a95fc7.png)
Chọn Device và nhấn Next

![](https://images.viblo.asia/e3cfeb91-8643-4635-98c6-5cab136560da.png)
Nhập tên Device và nhấn Next

![](https://images.viblo.asia/eaa2ebd9-6890-475e-a482-3c13b8dfb911.png)
Đợi một chút trong khi Device được tải và cài đặt

![](https://images.viblo.asia/8fd53b21-036a-4c58-baf5-aecb46d66c4f.png)
 Nhấn Finish
 
 ![](https://images.viblo.asia/ee504172-299f-4af6-a2cd-0d6520e4bdd8.png)
 
 Nhấn Play để chạy Device
 ![](https://images.viblo.asia/c3100e42-dd7e-4f15-b73c-ff8890e28a30.png)
 
 ## Khởi tạo và chạy một sample project
 Chúc mừng bạn đã đến tới bước này ! Bây giờ bạn đã có mọi thứ để giả lập và chạy một ứng dụng bằng Cordova/PhoneGap. Để chạy một ứng dụng sample, chúng ta làm các bước sau: 
 ### 1. Khởi tạo project
 Vào thư mục mà bạn muốn khởi tạo project và chạy lệnh sau:
```shell
cordova create TestApp
```

Lệnh này sẽ tạo ra một project "TestApp" trong thư mục bạn đã chọn
### 2.  Tạo thiết bị giả lập

```shell
cd TestApp
cordova platform add android
```
 Câu lệnh trên dùng để thêm platform (ở đây là Android) cho ứng dụng của bạn
 
 Bạn sẽ nhìn thấy kết quả như sau:

```shell
Using cordova-fetch for cordova-android@~7.0.0
Adding android project...
Creating Cordova project for the Android platform:
	Path: platforms/android
	Package: io.cordova.hellocordova
	Name: HelloCordova
	Activity: MainActivity
	Android target: android-26
Subproject Path: CordovaLib
Subproject Path: app
Android project created with cordova-android@7.0.0
Android Studio project detected
Android Studio project detected
Discovered plugin "cordova-plugin-whitelist" in config.xml. Adding it to the project
Installing "cordova-plugin-whitelist" for android

               This plugin is only applicable for versions of cordova-android greater than 4.0. If you have a previous platform version, you do *not* need this plugin since the whitelist will be built in.
          
Adding cordova-plugin-whitelist to package.json
Saved plugin info for "cordova-plugin-whitelist" to config.xml
--save flag or autosave detected
Saving android@~7.0.0 into config.xml file ...
```

Để kiểm tra các platform đã được thêm vào ứng dụng:

```shell
cordova platform -ls
```

Kết quả:

```shell
Installed platforms:
  android 7.0.0
Available platforms: 
  browser ~5.0.1
  ios ~4.5.4
  osx ~4.0.1
  windows ~5.0.0
  www ^3.12.0
```

Để remove platform:
```shell
cordova platform remove android
```

### 3. Chạy ứng dụng
Để chạy ứng dụng, hãy nhớ bật sẵn giả lập để ứng dụng của chúng ta có thể chạy trên đó.

```shell
cordova run android
```


# Tổng kết
Cảm ơn các bạn đã theo dõi bài viết. Ở bài viết sau chúng ta sẽ xây dựng  ứng dụng PhoneGap đầu tiên. Xin cảm ơn

*Nguồn*

[The complete guide to running PhoneGap on Ubuntu](http://www.levibotelho.com/development/the-complete-guide-to-running-phonegap-on-ubuntu/)

[HOW TO INSTALL/RUN PHONEGAP ON UBUNTU](https://dasunhegoda.com/installrun-phonegap-ubuntu/797/)