# Lời nói đầu
* Nếu như bạn có thể xây dựng một Website, thì bạn cũng có thể xây dựng được một Desktop App. Electron là một framework giúp tạo ra những Native application bằng những ngôn ngữ lập trình web Javascript, HTML và CSS

* Vue.js là một framework linh động dùng để xây dựng giao diện người dùng (user interfaces). Khác với các framework nguyên khối (monolithic), Vue được thiết kế từ đầu theo hướng cho phép và khuyến khích việc phát triển ứng dụng theo từng bước. Khi phát triển lớp giao diện (view layer), người dùng chỉ cần dùng thư viện lõi (core library) của Vue, vốn rất dễ học và tích hợp với các thư viện hoặc dự án có sẵn. Cùng lúc đó, nếu kết hợp với những kĩ thuật hiện đại như SFC (single file components) và các thư viện hỗ trợ, Vue cũng đáp ứng được dễ dàng nhu cầu xây dựng những ứng dụng một trang (SPA - Single-Page Applications) với độ phức tạp cao hơn nhiều

# Cài đặt chương trình
### Vuejs
* Vue.js cung cấp một CLI giúp nhanh chóng khởi tạo nền tảng (scaffolding) cho các ứng dụng một trang
```
# cài đặt vue-cli
$ npm install --global vue-cli
# tạo một dự án mới với template "webpack"
$ vue create  demo-electron
```

* Sau khi quá trình cài đặt và khởi tạo project Vuejs hoàn tất. Ta tiến hành chạy project
```
$ cd demo-electron
$ npm run serve
```

Truy cập vào địa chỉ http://localhost:8080/, ta nhận được màn hình hiển thị như ảnh dưới:

![](https://images.viblo.asia/a93817e2-dbe7-4161-90e2-f63b2575d4c9.png)

Như vậy nghĩa là chúng ta đã cài đặt và khởi tạo thành công một project Vuejs bằng vue-cli. Tiếp theo, chúng ta sẽ tiến hành cài đặt Electron và tạo một Desktop app cơ bản

### Electron
* Tiến hành cái đặt Electron: 
```
# To install globally
$ sudo npm install -g electron
# Or install local
$ npm install electron
```

* Tiến hành cài đặt package electron-packager để đóng gói app

```
$ npm install --save-dev electron-packager
```

*  Tạo một file js đặt tên là "elect.js" để chạy Electron app. Sau đó, thêm một cặp key - value gọi là "main" vào file package.json

*Package.json*

```
{
  "name": "demo-electron",
  "version": "0.1.0",
  "private": true,
  "main": "elect.js",
  "scripts": {
    "serve": "vue-cli-service serve --open",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "start": "electron .",
    "package": "electron-packager ./ --platform=darwin --arch=x64 --out=package --overwrite=force --ignore=dist"
  },
  "dependencies": {
    "electron": "^1.8.4",
    "vue": "^2.5.13"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "^3.0.0-beta.6",
    "@vue/cli-plugin-eslint": "^3.0.0-beta.6",
    "@vue/cli-service": "^3.0.0-beta.6",
    "electron-packager": "^11.1.0",
    "vue-template-compiler": "^2.5.13"
  },
  "babel": {
    "presets": [
      "@vue/app"
    ]
  },
  "eslintConfig": {
    "root": true,
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ]
  },
  "postcss": {
    "plugins": {
      "autoprefixer": {}
    }
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
```

*Elect.js*

```
const {app, BrowserWindow} = require('electron')

let win = null;

app.on('ready', function () {

  // Initialize the window to our specified dimensions
  win = new BrowserWindow({width: 1000, height: 600});

  // Specify entry point to default entry point of vue.js
  win.loadURL('http://localhost:8080');

  // Remove window once app is closed
  win.on('closed', function () {
  win = null;
  });

});
//create the application window if the window variable is null
app.on('activate', () => {
  if (win === null) {
  createWindow()
  }
})
//quit the app once closed
app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
  app.quit();
  }
});
```

* Tiến hành chạy thử app. Ở màn hình terminal thứ nhất, chúng ta sẽ chạy Vuejs app: 
```
$ npm run serve
```

* Ở màn hình terminal thứ hai. chúng ta sẽ chạy Electron app: 
```
# Ở đây mình đã gắn câu lệnh 'electron .' vào script 'start'
$ npm start
```

* Ta được kết quả sau: 

![](https://images.viblo.asia/c268c123-75b2-4da1-b8de-8bb417a061a2.png)

* Tiến hành đóng gói app, ở đây mình thực thi đóng gói cho desktop app chạy trên HĐH Mac OS. Ta chạy câu lệnh đóng gói. Ở đây, mình đã gán câu lệnh này vào script "package":

```
# câu lệnh thực thi : "electron-packager ./ --platform=darwin --arch=x64 --out=package --overwrite=force --ignore=dist" được gán vào script "package"
$ npm run package
```

* Thành quả của chúng ta là Desktop app có thể chạy trên HĐH Mac OS. Ngoài ra chúng ta cũng có thể đóng gói thành những desktop app cho các hệ điều hành như Window hay Linux

# Lời kết
* Trên đây mình đã hướng dẫn các bạn cách xây dựng một desktop app cơ bản sử dụng Vuejs và Electron. Ngoài Vuejs, chúng ta hoàn toàn có thể xây dựng bằng những framework khác như AngularJS, React ... . Electron là một công cụ được sử dụng phổ biến trên thế giới để xây dựng desktop app. Nhiều ứng dụng nổi tiếng đã được xây dựng bằng framework này, có thể kể đến như Visual Studio Code, Skype, Slack, Antom, ... . Mong rằng bài viết của mình sẽ phần nào giúp các bạn tiếp cận với Electron dễ dàng hơn.