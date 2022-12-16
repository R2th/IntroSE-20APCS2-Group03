## React Native là gì?
React Native là framework giúp ta viết các ứng dụng Native chỉ bằng Javascript do Facebook phát hành. Nó sử dụng cùng thiết kế như React.
Hiểu đơn giản bạn viết code Javascript để có thể sử dụng cho cả thiết bị iOS và Android.
Do đó React Native sẽ rất dễ dàng với người đã nắm vững Javascript.
## Cài đặt
Bây giờ mình sẽ hướng dẫn cài đặt với Linux
 + Install android sdk
```
sudo add-apt-repository ppa:openjdk-r/ppa
sudo apt-get update
sudo apt-get install openjdk-7-jre

# install openjdk
sudo apt-get install openjdk-7-jdk

# download android sdk
wget http://dl.google.com/android/android-sdk_r24.2-linux.tgz

tar -xvf android-sdk_r24.2-linux.tgz
cd android-sdk-linux/tools

# install all sdk packages
./android update sdk --no-ui

# set path
vi ~/.zshrc << EOT

export PATH=${PATH}:$HOME/sdk/android-sdk-linux/platform-tools:$HOME/sdk/android-sdk-linux/tools:$HOME/sdk/android-sdk-linux/build-tools/22.0.1/

EOT

source ~/.zshrc

# adb
sudo apt-get install libc6:i386 libstdc++6:i386
# aapt
sudo apt-get install zlib1g:i386
```
+ Install watchman
https://gist.github.com/scr1p7ed/4fb6728613b6bd5b185cb3e8314f07a4
+ install adb
```
sudo apt update
sudo apt install android-tools-adb android-tools-fastboot
```
+ Install Genymotion
https://sysads.co.uk/2014/06/21/install-genymotion-in-ubuntu-14-04/

## Build app
+ Sau khi cài xong, giờ thực hiện build app
```
npm install -g create-react-native-app
create-react-native-app AwesomeProject
cd AwesomeProject
npm start
```
+ Nếu build fail do lỗi version nodejs or npm thì update lại version 
```
 sudo npm install -g npm@4.6.1 #update version npm
 curl -sL https://deb.nodesource.com/setup_9.x | sudo bash -  #update version node 9._
 sudo apt-get install nodejs
```
+ Nếu bạn muốn build app không dùng máy ảo có thể dùng Expo App trên điện thoại iOS hoặc Android của bạn và kết nối với cùng một mạng không dây như máy tính của bạn.
Sử dụng ứng dụng Expo, quét mã QR từ thiết bị đầu cuối của bạn để mở project của bạn.
https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en
## Kết quả
ví dụ:
```
# App.js
import React, { Component } from 'react';
import { Text } from 'react-native';

export default class App extends Component {
  render() {
    return (
      <Text>Hello world!</Text>
    );
  }
}
```
![](https://images.viblo.asia/c356283b-a0fa-4916-b76e-1343c1bc8168.png)

## Tài liệu tham khảo
https://facebook.github.io/react-native/docs/getting-started.html

Bài tiếp theo sử dụng firebase https://viblo.asia/p/react-native-firebase-4P856RXa5Y3