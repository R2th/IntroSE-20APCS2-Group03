Vue Native vừa được giới thiệu cách đây khoảng hơn 1 tuần, vừa đọc xong cái blog giới thiệu thế là cũng xem qua vọc thử xem có gì hay ho, tiện viết luôn 1 bài Hello World giới thiệu với mọi người.

# Vue Native là gì?
[What is Vue Native?](https://vue-native.io/docs/index.html#What-is-Vue-Native)

Nói ngắn gọn thì nó là một tool có thể tạo ra các ứng dụng native bằng VueJS. Và bên trong nó chính là các API của React Native.

# Các điều kiện cần
 - Node 6.0 trở lên
 - Npm 4.0 trở lên
 - React Native CLI được cài đặt global.

Cài đặt React Native CLI

```sh
npm install -g react-native-cli
npm install -g create-react-native-app
```

# Vue Native CLI

Tạo một dự án Vue Native bằng Vue Native CLI

```sh
npm install -g vue-native-cli
```

Đừng quên khởi động lại terminal sau khi cài đặt.

```sh
vue-native init <project name> # use Create React Native App
vue-native init <project name> --no-crna # Do not use Create React Native App
```

Tham số `--no-crna` nghĩa là lựa chọn có sử dụng __Create React Native App__ hay không.
__Create React Native App__ cho phép chạy thử ứng dụng trên device thật thông qua __[Expo.io](https://expo.io/)__

Tham khảo:
- [Create React Native app](https://github.com/react-community/create-react-native-app)
- [Expo](https://expo.io/)
- [React Native アプリの開発で create-react-native-app を使うべきかどうか - IT探検記](http://itexplorer.hateblo.jp/entry/20170902-create-react-native-app)

Ở đây mình sẽ tạo một ứng dụng tên `helloVueNative` có sử dụng __Create React Native App__.

# Cấu trúc thư mục

```yml
helloVueNative
├── .babelrc
├── .gitignore
├── .watchmanconfig
├── App.vue
├── node_modules
├── README.md
├── app.json
├── package.json
├── rn-cli.config.js
├── vueTransformerPlugin.js
└── yarn.lock
```

# Start ứng dụng

```sh
cd helloVueNative
npm start
```
Opps... Lỗi rồi =))

```zsh
➜  helloVueNative npm start                    

> helloVueNative@0.1.0 start /Users/framgia/sontd/workspace/helloVueNative
> react-native-scripts start

4:18:16 PM: Unable to start server
See https://git.io/v5vcn for more information, either install watchman or run the following snippet:
  sudo sysctl -w kern.maxfiles=5242880
  sudo sysctl -w kern.maxfilesperproc=524288

npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! helloVueNative@0.1.0 start: `react-native-scripts start`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the helloVueNative@0.1.0 start script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/framgia/.npm/_logs/2018-06-21T09_18_16_828Z-debug.log
```

Theo cái message nhận được thì có vẻ như phải cài thêm `watchman` hoặc chạy 2 lệnh `sysctl` để cài đặt các tham số của kernel.
Fine, mình sẽ cài `watchman`.
```sh
brew install watchman
```

Vậy là con phố đã lên đèn :yeah:

```sh
npm start

> helloVueNative@0.1.0 start /Users/framgia/sontd/workspace/helloVueNative
> react-native-scripts start

4:27:09 PM: Starting packager...
Packager started!
...
```

# Giới thiệu các phương thức
Sau khi chạy `npm start`, các bạn sẽ nhìn thấy các thông tin sau:

>› Press `a` to open Android device or emulator, or `i` to open iOS emulator.
>>› Press `s` to send the app URL to your phone number or email address
>>>› Press `q` to display QR code.
>>>>› Press `r` to restart packager, or `R` to restart packager and clear cache.
>>>>>› Press `d` to toggle development mode. (current mode: development)

Cũng đơn giản nhỉ, cài ứng dụng __Expo Client__ lên thiết bị của bạn, đảm bảo điện thoại và máy tính đang connect chung một mạng LAN, sau đó quét mã QR trên terminal là đã có thể lunch app trên device thật rồi.

![](https://images.viblo.asia/c7f60658-6f06-4b08-86ec-7b1943f0b984.png)

Sửa lại file `App.vue` vậy là bạn đã có một ứng dụng __Hello World__ đầu tiên cho mình :v
```diff
<template>
  <view class="container">
-    <text class="text-color-primary">My Vue Native App</text>
+    <text class="text-color-primary">Hello Vue Native App</text>
    </view>
</template>
```

![](https://images.viblo.asia/0b8a3a7e-bc58-4214-8478-458572856f18.png)

Phần còn lại chỉ cần bạn có chút kiến thức về VueJS là có thể build một app cho mình chẳng khác gì là viết một web app cả.

Nếu bạn chưa biết VueJS, HỌC! đừng lo, nó đơn giản và dễ học hơn React nhiều. Bạn có thể ghé qua [bài viết này](#) của mình để đọc qua về VueJS.