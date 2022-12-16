## Giới thiệu
Trong bài viết trước thì mình có hướng dẫn các bạn làm chatbot facebook messenger cho fanpage. Hôm nay mình sẽ hướng dẫn các bạn tạo chatbot cho một tài khoản facebook cá nhân. 

Bài viết này mình sẽ sử dụng nodejs và dialogflow để viết và train cho con bot này.

## Chuẩn bị
1. Cài đặt nodejs ở trang [Nodejs](https://nodejs.org/en/download/)
2. Một tài khoản google. 
3. Một tài khoản facebook.

## Các bước thực hiện
#### Bước 1: 
Đầu tiên cài đặt đầy đủ `nodejs` , `npm` hoặc có thể thay thế bằng `yarn` cái này tùy mọi người. Ở đây mình sử dụng `yarn`.
Có rất nhiều cách để cài đặt node. Các bạn vào trang https://nodejs.org/en/download/
  - Nếu bạn đang dùng window thì chỉ cần tải file `node-vx.x.x.msi` về cài đặt là xong
  - Nếu bạn sử dụng ubuntu bạn gõ lệnh `sudo apt install nodejs npm`
  - Nếu bạn sử dụng macOS bạn có thể tải file `node-vx.x.x.pkg`
 Sau khi đã cài xong, bạn kiểm tra lại xem nodejs đã có hay chưa bằng cách:
 
![](https://images.viblo.asia/67ab9da8-96ac-4e29-ac43-b5ba034d4b0c.png)

Như vậy là đã có môi trường nodejs cho máy bạn. Tiếp theo mình sẽ cài `yarn` thay cho `npm`. Cái này không bắt buộc các bạn cài nhưng nếu các bạn thích thì vẫn có thể cài cả 2 cái.
Bạn có thể cài `yarn` bằng cách đơn giản nhất thông qua `npm` với câu lệnh `npm install --global yarn`

OK vậy là bạn đã có môi trường để làm việc với nodejs.
#### Bước 2:
 Tạo project nodejs bằng lệnh `yarn init`
 
 ![](https://images.viblo.asia/e0ad7f86-82e2-41b3-a362-4ad3e72c3618.JPG)
 
 Như vậy là bạn đã tạo được một project node. 
 Tiếp theo việc cần làm là cài thêm một số package cần thiết. Mình sẽ sử dụng cacs package sau:
 ```
 {
  "name": "ChatBot",
  "version": "1.0.0",
  "description": "Chatbot messenger for personal account",
  "main": "server.js",
  "scripts": {
    "start": "node starter.js",
  },
  "keywords":
  "author": "LCD",
  "license": "MIT",
  "dependencies": {
    "babel-polyfill": "^6.26.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-stage-2": "^6.24.1",
    "babel-register": "^6.26.0",
    "dialogflow": "^0.6.0",
    "facebook-chat-api": "^1.6.0",
    "node-env-file": "^0.1.8"
  }
}
 ```
Phía trên là các package mình dùng trong project được đặt ở trong file `package.json`. Bạn có thể copy các `dependencies` rồi dán vào file `package.json` của mình. Rồi dùng lệnh `yarn install` để cài dặt chúng.
Hoặc các bạn có thể thêm các package trên bằng lệnh `yarn add ten-package` mà ko cần chỉnh sửa file `package.json`.
Một số package:
- `babel-polyfill, babel-register, ...` dùng để dịch ES6 sang các đời ES thấp hơn. 
- `dialogflow` để connect với dialogflow
- `node-env-file` để đọc biến môi trường ở file env ở local. File này để lưu các thông tin như tài khoản, mật khẩu fb, id project dialogflow, ...
- `facebook-chat-api` đây chính là package chính giúp chúng ta login vào fb và xử lý dữ liệu từ người dùng khacs gửi đến. Và gưit trả lại tin nhắn.
#### Bước 3: Tạo project dialogflow
Các bạn tạo tài khoản dialogflow bằng cách đăng nhập thông qua tài khoản google của các bạn ở địa chỉ sau https://dialogflow.com/

![](https://images.viblo.asia/23bba70b-dec5-43a8-ae87-305b039e6ac5.JPG)

![](https://images.viblo.asia/0fdffa41-f976-4dfb-a538-11fde425f215.JPG)

Sau khi tạo tài khoản thành công

![](https://images.viblo.asia/118f6079-ed25-486b-b1f9-c7f318365861.JPG)

Sau đó tạo một project dialogflow. Đặt tên con bot là gì thì tùy ý bạn. Ở đây google chỉ mới hỗ trợ một số ngôn ngữ nhất định. Hy vọng trong tương lai sẽ hỗ trợ tiếng Việt.

![](https://images.viblo.asia/76cb0bf9-8df1-441f-a2e5-90dd11d0ca63.JPG)
Sau khi tạo xong thì đây là màn hình quản lý con bot của bạn

![](https://images.viblo.asia/6b38ead9-4ec5-40f3-a81e-5597148ff945.JPG)
Các bạn bấm vào Small Talk và enable nó lên

![](https://images.viblo.asia/58927084-620a-49a0-bbeb-703b626ee2d0.JPG)

Sau đã bật Small Talk lên bạn việc bạn cần làm tiếp theo là train các câu hỏi mặc định cho nó trong phần ở dưới. 


Việc tiếp theo là bạn cần lấy id của con bot. Bằng cách nhập vào settings

![](https://images.viblo.asia/4a687cd4-5dd8-4b1b-86a1-8bf29605c90d.JPG)

Lấy file config của project dialogflow tại trang https://console.cloud.google.com

![](https://images.viblo.asia/1d3b3181-0259-4485-9dbf-880bf4c4cbbe.png)

`Select a project` bạn chọn cái dialogflow vừa tạo lúc nãy

![](https://images.viblo.asia/bbed6858-40d4-4f12-9816-59d8786c2804.png)

Ở thanh menu bên trái chọn `API & Services -> Credentials`
![](https://images.viblo.asia/2365df69-d1e4-458a-a0e0-734b8c3a3dd1.png)

Tìm phần `OAuth 2.0 client IDs` và dowload file config về
![](https://images.viblo.asia/ef82ad4e-394e-4650-b64d-b5e74a161132.png)
File này bạn để ở trong project node vừa tạo ở trên.

#### Bước 4: Viết code nodejs
Quay lại project node bạn vừa tạo lúc nãy.
1. Bạn cần 1 file `.env` để lưu tên tài khoản, mật khẩu,  bot id
```
FB_EMAIL=your.fb.email@gmail.com
FB_PASSWORD=your.fb.password
PROJECT_DIALOGFLOW_ID=your-bot-id
DIALOGFLOW_SESSION_ID=quickstart-session-id
GOOGLE_APPLICATION_CREDENTIALS=./your-crdential-file.json
```
Mình giải thích 1 chút:
- FB_EMAIL: là email đăng nhập vào tài khoản fb của bot
- FB_PASSWORD: password đăng nhập tài khoản fb của bot
- PROJECT_DIALOGFLOW_ID: id của bot ở trên
- DIALOGFLOW_SESSION_ID: id session dialogflow (cái này bạn đặt gì cũng được)
- GOOGLE_APPLICATION_CREDENTIALS: là đường dẫn đến file config dialogflow bại tải về lúc nãy
Mục đích của file `.env` này là để tránh đặt các mã bí mật bị lộ trong code ở môi trường product thì mình không cần file này nữa mà hãy config chúng vào trong biến môi trường của server.

2. Tiếp theo là file `starter.js` mình dùng như thế này để có thể viết được ES6 trong project của mình
```
require('babel-register')({
  presets: [ 'env' ]
});
module.exports = require('./server.js');
```
3. File xử lý dữ liệu từ dialogflow `dialogflow.handle.js`
```
import dialogflow from 'dialogflow';

export default class DialogflowHandle {
  constructor () {
    this.query = '';
    this.sessionClient = new dialogflow.SessionsClient();
    this.sessionPath =
      this.sessionClient.sessionPath(
        process.env.PROJECT_DIALOGFLOW_ID,
        process.env.DIALOGFLOW_SESSION_ID
      );
    this.request = {
      session: this.sessionPath,
      queryInput: {
        text: {
          text: '',
          languageCode: 'en-US',
        },
      },
    };
  }

  handleMessage (sentence) {
    this.request.queryInput.text.text = sentence
    return new Promise(
      (resolve, reject) => {
        this.sessionClient.detectIntent(this.request)
          .then(resolve)
          .catch(reject);
      }
    )
  }
}
```
4. Và đây là file `server.js`
```
if (process.env.NODE_ENV !== 'production') { // Đọc biến môi trường trong file env ở local
  var env = require('node-env-file');
  env('.env');
}

import fbApi from 'facebook-chat-api';
import fs from 'fs';
import DialogflowHandle from './dialogflow.handle';

const readFileSestion = () => { // Hàm này để đọc file sessions đăng nhập của facebook
  try{
    const file = fs.readFileSync('appstate.json', 'utf8');
    return JSON.parse(file);
  } catch(error) {
    return null;
  }
};

const appState = readFileSestion();
const credientials = { // Tạo biến lưu sesstions, email và mật khẩu fb. (Nêu như đã có sessions và sessions vẫn còn hạn thì không đăng nhập lại)
  appState,
  email: process.env.FB_EMAIL,
  password: process.env.FB_PASSWORD
};
const dialogflowHandle = new DialogflowHandle();

fbApi(credientials, (err, api) => {
  if(err) return console.error(err);
  fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState())); // Ghi lại sessions mới sau khi đã refresh

  api.listen((err, message) => {
    dialogflowHandle.handleMessage(message.body)
      .then((data) => {
        const result = data[0].queryResult;
        api.sendMessage(result.fulfillmentText, message.threadID);
      })
      .catch((error) => {
          api.sendMessage(`Error: ${error}`, message.threadID);
      });
  });
});
```
Để chạy project thì bạn chỉ cần gõ `yarn start`

![](https://images.viblo.asia/e561a72d-f307-41e6-93dc-fe85ecc5aab3.png)

Đây là kết quả :)
![](https://images.viblo.asia/e3667382-53f7-4415-a694-6a451efd3b97.png)
## Kết luận
Đây là bài viết hướng dẫn tạo chat bot đơn giản cho tài khoản facebook cá nhân dựa trên module không chính thức `facebook-chat-api` . Nhưng nó cũng đã hỗ trợ khá nhiều chức năng. Bạn có thể tìm hiểu thêm tại https://github.com/Schmavery/facebook-chat-api

Và dialogflow còn có rất nhiều chức năng đang chờ bạn khám phá như ML (Machine Learning), thống kê, phân loại câu hỏi, ... 

Cám ơn các bạn đã đọc bài viết của mình. Chúc các bạn thành công!!!!