### Giới thiệu

[Electron](https://electronjs.org/) là một thư viện giúp cho việc xây dựng một ứng dụng Desktop chạy được đa nền tảng (chỉ cần hệ điều hành có cài đặt [nodejs](https://nodejs.org/en/)) dựa trên 3 ngôn ngữ phổ biến nhất thế giới là Javascript, HTML và CSS.

Bạn muốn viết thử auto login cho 1 web flash game? Nếu là auto login thông thường thì nghe chừng có vẻ khá đơn giản nhưng đây là web flash game nên trước tiên ta phải tìm cách tích hợp flash plugin vào ứng dụng của chúng ta đã nhỉ.

### Bắt đầu nào
 Nếu google search thì ta sẽ ra ngay được gợi ý trong [document](https://electronjs.org/docs/tutorial/using-pepper-flash-plugin) của electron.
Bài viết này mình sẽ implement với hệ điều hành MacOS, đối với các hệ điều hành khác (window hay linux) thì sẽ đề cập trong một bài viết khác.
Đầu tiên là tạo project:

```
    cd /your-workspace
    mkdir demo-electron && cd demo-electron
    npm init -y
```
mở project bằng một IDE bất kỳ (ví dụ như [visual studio code](https://code.visualstudio.com/))
sửa file `package.json` thành như sau:

```
    {
  "name": "demo-electron",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
cài đặt electron: `npm install --save-dev electron`

Như đã đề cập ở trên, trong [document](https://electronjs.org/docs/tutorial/using-pepper-flash-plugin) của electron có hướng dẫn cách implement nhưng mình thấy khá là khó hiểu và thiếu sót. Như mình hiểu thì việc ta làm là sẽ phải copy file chạy của Pepper Flash Plugin vào thư  mục project và lấy đường dẫn của file chạy để implement.
    ![](https://images.viblo.asia/7e4e74eb-6c78-442c-8788-8d9fec241457.png)
Nếu bạn thử và làm theo document bạn sẽ thấy việc copy được file 'PepperFlashPlayer.plugin' là bất khả thi, sau một hồi thử các cách thì mình đã chạy thành công với việc implement đường dẫn của plugin trong MacOS, cụ thể của mình là `/Library/Internet Plug-Ins/PepperFlashPlayer/PepperFlashPlayer.plugin`

Tiếp tục với demo của chúng ta

Trong thư mục project tạo file `touch main.js`
```
    const { app, BrowserWindow } = require('electron')

const pluginName = '/Library/Internet Plug-Ins/PepperFlashPlayer/PepperFlashPlayer.plugin'
app.commandLine.appendSwitch('ppapi-flash-path', pluginName)

app.on('ready', () => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      plugins: true
    }
  })
  win.loadURL(`http://get.adobe.com/flashplayer/about/`)
})
```

Bạn chạy thử và tận hưởng thành quả nhé: `npm start`

![](https://images.viblo.asia/18f9c314-eca7-4901-8216-18f9dbd0fde0.png)

Như vậy là ta đã chạy thành công một ứng dụng web flash trên electron, mình sẽ thử implement trên Window và Linux trong các bài viết khác, good luck! ;)