*Lưu ý:  Ubuntu/Windows chỉ code được cho Android, muốn code được cho iOS bạn cần phải có Mac.*
***
# Cài đặt dependencies
Chúng ta sẽ cần:
* Node;
* React Native CLI (giao diện dòng lệnh React Native);
* Một JDK (Java Development Kit);
* Android Studio.
#### Node
*Node.js v11.x:*
```
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get install -y nodejs
```
#### React Native CLI
```
npm install -g react-native-cli
```
#### Java Development Kit
Bạn có thể dùng Oracle JDK hoặc OpenJDK, ở đây mình dùng OpenJDK.

*JDK 8:*
```
sudo apt-get install openjdk-8-jdk
```
#### Môi trường phát triển Android
**1. Cài đặt Android Studio**

Mở **Ubuntu Software** và tìm **Android Studio** bằng search bar rồi chọn **Install**:

![](https://images.viblo.asia/fa6f7b47-9686-41d3-b612-b43ef0db03a1.png)

Khi vào màn hình cài đặt, chọn next rồi chọn **Custom** rồi chọn next tiếp:

![](https://images.viblo.asia/bef96674-9b94-4f75-8d22-5b8532d79513.png)

Chọn theme mà bạn thích rồi next. Hãy tích vào các ô sau:
* ```Android SDK```
* ```Android SDK Platform```
* ```Android Virtual Device```

Chọn next, next rồi finish để tải và cài đặt các components trên. Cài đặt khá lâu, các bạn chịu khó đợi một chút. Khi màn hình Welcome hiện ra thì có nghĩa là bạn đã hoàn thành việc thiết lập, tuy nhiên đừng chuyển màn hình vội, chúng ta sang bước tiếp theo.

**2. Cài đặt Android SDK**

Android Studio mặc định cài cho chúng ta Android SDK mới nhất. Tuy nhiên, xây dựng một React Native app với native code lại cần đặc biệt ```Android 9 (Pie)``` SDK. Các Android SDK khác có thể cài đặt thông qua SDK Manager trong Android Studio.

Chúng ta có thể vào SDK Manager từ màn hình "Welcome to Android Studio". Click vào **Configure** rồi chọn **SDK Manager**:

![](https://images.viblo.asia/1de48770-e33a-4015-8764-9b94a6f5abe7.png)

Chọn tab "SDK Platforms" trong **SDK Manager** và check ô "Show Package Details" ở góc dưới bên phải. Trong mục ```Android 9 (Pie)``` check các items sau:
* ```Android SDK Platform 28```
* ```Intel x86 Atom_64 System Image``` hoặc ```Google APIs Intel x86 Atom System Image```

Tiếp theo, chọn tab "SDK Tools" và check cả ô "Show Package Details" ở đây luôn. Trong mục "Android SDK Build-Tools", tích vào ô ```28.0.3```.

Cuối cùng, chọn "Apply" để tải và cài đặt Android SDK cùng cái build tools liên quan.

**3. Cấu hình biến môi trường ANDROID_HOME**

Mở file config:
```
cd
gedit ~/.profile
```
Bạn cần thêm vào file config các dòng sau:
```
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```
Gõ ```source $HOME/.profile``` để load config. Gõ ```echo $PATH``` để verify rằng ANDROID_HOME đã được thêm vào path.
#### Watchman
Watchman là một một tool của Facebook dùng để theo dõi thay đổi trong hệ thống file. Bạn có thể tiếp tục mà không cần cái nó, tuy nhiên cài luôn bây giờ thì có thể tránh được một số rắc rối xảy ra sau này.
```
sudo apt-get install libssl-dev autoconf automake libtool python-dev
cd
git clone https://github.com/facebook/watchman.git
cd watchman
git checkout v4.9.0  # the latest stable release
./autogen.sh
./configure
make
sudo make install
```
# Tạo một ứng dụng mới
Mình sẽ tạo một project mới đặt tên là "fightClub":
```
react-native init fightClub
```
# Chuẩn bị thiết bị Android
Bạn cần có một thiết bị Android để chạy ứng dụng React Native Android tạo ở phía trên. Thiết bị này có thể là thiết bị thật hoặc là thiết bị ảo tạo bằng giả lập trên máy tính.

Trong bài viết này mình sẽ chỉ hướng dẫn cách dùng máy Android ảo thôi vì mình cũng mới dùng mỗi máy ảo :D. Nếu các bạn muốn dùng máy thật thì tham khảo tại link sau https://facebook.github.io/react-native/docs/running-on-device.
#### Sử dụng thiết bị ảo
Đầu tiên, bạn mở Android Studio và chọn **File -> Open...** để mở project:

![](https://images.viblo.asia/f018cab9-3dea-4c9d-ad6e-f9e7ca01bab5.png)

Sau đó chọn **Tools -> AVD Manager** hoặc ấn vào biểu tượng ![](https://images.viblo.asia/dbe5da2e-cfc4-4e08-83bb-5035262dbfea.png) ở góc trên bên phải để mở danh sách máy ảo rồi chọn **Create Virtual Device...** để tạo máy ảo (chọn máy nào có density cao cao tí cho nó nét :D):

![](https://images.viblo.asia/c1a615a5-c0db-4f81-b0f8-e2854056dbe4.png)

Chọn xong thì ấn "Next" rồi chọn **Pie** API Level 28 image rồi "Next" tiếp:

![](https://images.viblo.asia/128943b7-0330-4540-a598-0bde0583c8fd.png)

bạn có thể bỏ tích ở ô **Enable Device Frame** để bỏ khung của máy ảo đi hoặc không rồi ấn "Finish":

![](https://images.viblo.asia/a666dd73-7130-4cc4-9102-d66d861275bc.png)

Như vậy là bạn đã tạo xong máy ảo, bây giờ bạn có thể ấn vào biểu tượng hình tam giác để launch máy ảo, thành quả như trong hình :heart_eyes::

![](https://images.viblo.asia/fe035e77-e557-49c7-ac56-1ee3e7fe607d.png)
#### Cài đặt KVM (optional)
React Native khuyến khích cấu hình VM acceleration trên hệ thống của bạn để cải thiện hiệu suất chạy giả lập.

**1. Kiểm tra xem CPU của bạn có hỗ trợ hardware virtualization không**
```
egrep -c '(vmx|svm)' /proc/cpuinfo
```
* **0** có nghĩa rằng CPU của bạn không hỗ trợ hardware virtualization :(.

* **1** trở lên có nghĩa là có.

Tiếp theo chạy lệnh:
```
kvm-ok
```
nếu output như sau có nghĩa là máy bạn có thể dùng KVM:
```
INFO: /dev/kvm exists
KVM acceleration can be used
```

**2. Cài đặt**
```
sudo apt-get install qemu-kvm libvirt-bin ubuntu-vm-builder bridge-utils
```
Thêm Users vào Groups:
```
sudo adduser `id -un` libvirtd
```
chạy xong lệnh trên, bạn cần relogin để user trở thành member của group libvirtd. Những member của group này mới có thể chạy máy ảo.

Verify Installation:
```
$ virsh list --all
 Id Name                 State
----------------------------------
```
# Chạy ứng dụng React Native
```
cd
cd fightClub
react-native run-android
```
Đợi một lúc để build app. Nếu mọi thứ đã được thiết lập chính xác bạn sẽ thu được kết quả như sau:

![](https://images.viblo.asia/d3430210-651c-4f85-be97-8fdaf11cff60.png)

#### Modifying your app
Giờ bạn đã chạy thành công app, hãy cùng nghịch nó một chút.

Mở file App.js bằng text editor tùy chọn (mình dùng VSCode với Sublime Babel extension của nó) và sửa:
```
<Text style={styles.welcome}>Welcome to React Native!</Text>
```
thành:
```
<Text style={styles.welcome}>Welcome to Fight Club!</Text>
```
ấn R hai lần để thấy sự thay đổi:
![](https://images.viblo.asia/ad69c0e5-7dd4-4e12-9b2d-63ff93823a97.png)

Tiếp theo, mình sẽ giới thiệu một số tính năng trong Developer Menu. Ấn ```Ctrl + M``` để mở menu:

![](https://images.viblo.asia/6c299e3a-8b03-41d8-8f03-9cbc06166527.png)

chọn **Enable Hot Reloading**, sau đó vào App.js sửa:
```
<Text style={styles.instructions}>To get started, edit App.js</Text>
```
thành:
```
<Text style={styles.instructions}>The first rule of Fight Club is: You do not talk about Fight Club.</Text>
```
Quay sang giả lập ta sẽ thấy text trên màn hình đã thay đổi mà ta không cấn phải ấn RR, chức năng này rất thuận tiện trong việc thiết kế, chỉnh sửa UI. Bên cạnh Hot Reloading thì có Live Reloading, Hot Reloading sẽ chỉ tự động refresh lại màn hình có sự thay đổi còn Live Reloading sẽ tự động refresh lại toàn bộ app khi có sự thay đổi ở bất cứ màn hình nào.

Một chức năng quan trọng nữa mà mình muốn giới thiệu đó là Debug. Trước khi dùng tính năng này, bạn hãy tải về file **rn-debugger-linux-x64.zip** tại https://github.com/jhen0409/react-native-debugger/releases. Giải nén file zip rồi vào thư mục vừa giải nén chạy file **React Native Debugger**:

![](https://images.viblo.asia/ad724dfa-d934-4f92-b77f-fb71b1e2e097.png)

Mở Developer Menu trong giả lập rồi chọn **Debug JS Remotely**, nếu Debugger của bạn giống như trong hình thì bạn đã kết nối với app thành công:

![](https://images.viblo.asia/7c7a14e5-19a0-4462-8664-d21483a42d3a.png)

Như vậy là cơ bản bạn đã có được những thứ cần thiết để build một ứng dụng React Native. Bài viết của mình xin kết thúc tại đây.

Nguồn tham khảo: https://facebook.github.io/react-native/docs/getting-started.