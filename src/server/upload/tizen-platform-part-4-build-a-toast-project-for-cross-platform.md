### TOAST
Quay lại với series về Tizen, bài biết này mình xin giới thiệu với các bạn một framework được sử dụng rất nhiều trong cộng đồng tizen developer, đó chính là TOAST, mặc dù ngôn ngữ chính của framework này vẫn là bộ ba quen thuộc HTML, CSS và JS nhưng hãy cùng mình tìm hiểu xem framework này có gì hay ho không nhé.
#### Overview
TOAST là một Cordova plugin mã nguồn mở được được phát triển để dành riêng cho những ứng dụng TV Web, tạo ra bởi Samsung, TOAST cho phép bạn có thể tạo ra một giải pháp multiple-platform cho ứng dụng TV WEB, giảm thiểu chi phí phát triển. Với TOAST, bạn có thể viết code 1 lần, build và generate ra cho nhiều flatform khác nhau, nào, let's TOAST.

Mội số ưu điểm có thể kể đến của TOAST:
1. Hỗ trợ nhiều nền tảng
2. Mã nguồn mở, ai cũng có thể sử dụng và đóng góp vào [dự án này](https://github.com/Samsung/cordova-plugin-toast)
3. Dễ dàng sử dụng, nền tảng của TOAST là Cordova, một framework đã khá quen thuộc với rất nhiều lập trình viên.
#### Supported Platforms
Cho đến thời điểm hiện tại, TOAST đã hỗ trợ một số nền tảng sau
1. Samsung Legacy Platform
2. Tizen
3. Google Chrome
4. WebOS
### Create Project
#### Prepare to start
##### Precondition
Ok, để bắt đầu tạo ra một ứng dụng bằng TOAST, chúng ta cần phải cài đặt sẵn
* [nodejs](https://nodejs.org/en/)
* [git](https://git-scm.com/)
* [Chrome browser](https://www.google.co.kr/chrome/)
* [Samsung Tizen SDK](https://developer.samsung.com/tv)
* npm modules: cordova, grunt
```
 $ npm install -g cordova
 $ npm install -g grunt-cli
```

##### git clone
Để chuẩn bị cho việc copy các repositories cần thiết cho dự án, đầu tiên hãy tạo một thư mục root 
` $ mkdir <root directory>`

Trong thư mục root, clone những repo dưới đây
```
$ git clone https://github.com/apache/cordova-js.git
$ git clone https://github.com/apache/cordova-browser.git
$ git clone https://github.com/Samsung/cordova-plugin-toast.git
$ git clone https://github.com/Samsung/cordova-sectv-orsay.git
$ git clone https://github.com/Samsung/cordova-sectv-tizen.git
$ git clone https://github.com/Samsung/cordova-tv-webos.git
$ git clone https://github.com/Samsung/grunt-cordova-sectv.git
```
###### Cấu hình
- Sử dụng lệnh `npm install` để cài đặt những phụ thuộc trong các thư mục cordova-js, cordova-plugin-toast, cordova-sectv-orsay, cordova-sectv-tizen, cordova-tv-webos, grunt-cordova-sectv
- Mở file `cordova-js/Gruntfile.js`, thêm vào những task sau
module.exports = function(grunt) {
```
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compile: {
        ...
        "sectv-orsay": {},
        "sectv-tizen": {},
        "tv-webos": {}
    },
```
- Mở file `cordova-js/package.json`, thêm những platform sau 
```
"cordova-platforms" : {
      ...
  "cordova-sectv-orsay"   : "../cordova-sectv-orsay",
  "cordova-sectv-tizen"   : "../cordova-sectv-tizen",
  "cordova-tv-webos"   : "../cordova-tv-webos"
}
```
##### Compile
- Chạy lệnh `grunt compile` trong thư mục `cordova-js` để tiến hành đóng gói
`$ grunt compile:sectv-orsay compile:sectv-tizen compile:tv-webos `
- Tương tự trong thư mục `cordova-plugin-toast`
`$ grunt compile:sectv-orsay compile:sectv-tizen compile:tv-webos`
#### How to create Toast project
* Step by step để tạo một empty project

```
// Create cordova project
$ cordova create TestApp
$ cd TestApp

// Beware of hidden file
$ cp -rf ../grunt-cordova-sectv/sample/. ./
$ npm install ../grunt-cordova-sectv
// Grunt task for build and package

// Install dependency modules
$ npm install

// For toast browser simulator
$ cordova platform add browser

// Mandatory plugins for using browser simulator (not for other platforms)
$ cordova plugin add cordova-plugin-device
$ cordova plugin add cordova-plugin-network-information
$ cordova plugin add cordova-plugin-globalization

// Add toast plugin
$ cordova plugin add ../cordova-plugin-toast
```
#### Prepare and Build
Sau khi chúng ta đã tạo thành công project, có thể sử dụng bất kì một IDE nào, theo mình thì nên dùng luôn Tizen IDE luôn cũng được, .. code code code .. bây giờ chúng ta sẽ build project đó cho từng nền tảng khác nhau.

##### prepare
* browser
`$ cordova build browser`
* sectv-orsay
`$ grunt sectv-prepare:sectv-orsay`
* sectv-tizen
`$ grunt sectv-prepare:sectv-tizen`
* tv-webos
`$ grunt sectv-prepare:tv-webos`
##### build and package
* browser
```
// Test on browser platform
$ cordova emulate browser
```
* sectv-orsay
```
// Test on sectv-orsay platform
$ grunt sectv-build:sectv-orsay
// Run the application on target by using SDK
```
* sectv-tizen
```
// Test on sectv-tizen platform
$ grunt sectv-build:sectv-tizen
// Run the application on target by using SDK
```
* tv-webos
```
// Test on tv-webos platform
$ grunt sectv-build:tv-webos
// Run the application on target by using SDK
```
### Conclution
 Cross-platform là một xu hướng, không chỉ hiện tại mà còn là cả tuơng lai, chúng ta đã có rất nhiều framework hỗ trợ với vô vàn những ưu, nhược điểm khác nhau, TOAST cũng là một trong những sự lựa chọn đó, hy vọng qua bài viết này, bạn có thể biết được cách sử dụng TOAST để tạo nên những ứng dụng tuyệt vời, have fun !