## 1. Mở đầu
Các bạn có bao giờ tự hỏi: Làm sao để đọc lại tin nhắn đã bị xóa trên facebook? 

Các bà vợ muốn quản lý chồng của mình có nhắn tin tán gái hay không nhưng lại không thể online 24/24 bằng tài khoản của của chồng để kiểm tra?

Hoặc đơn giản bạn chỉ ghi lại các tin nhắn mà người đối phương đã gỡ khỏi tin nhắn làm  bằng chứng tùy vào mục đích của bạn.

 **Note: Bài này không giúp các bạn đọc lại tin nhắn ngày trước ( trước thời điểm các bạn làm các việc dưới đây)**

## 2. The idea
Ý tưởng đơn giản là làm một con câu  tất cả các tin nhắn được gửi vào tài khoản của mình và lưu nó ở một nơi khác.

## 3. Requirement
1. Node.js version > 8

## 4. Brainstorming
Ui giời tưởng gì, Thằng này ta dùng Graph API của thằng facebook gọi phát là xong ấy mà...

#### Ôi không.. Graph API của facebook nó chỉ dành cho tài khoản là một Page..

![](https://images.viblo.asia/2e7074f8-3408-49f8-be66-5777d1dcfad7.png)

Bỏ cuộc chăng? Nghĩ cách khác.... Tạo một request login vào facebook xong rồi sẽ get tin nhắn?
Noooooo... 
```python
Unauthorized Login detected. Your account is temporarily locked.
```

Nà ní?? Nghe chừng facebook cũng bảo mật  ghê... Ca này căng,....
Đăng nhập lại facebook bằng browser thì facebook bắt mình xác minh danh tính rồi mới mở khóa :cold_sweat::cold_sweat:
#### Facebook-chat-api
Vài ngày sau khi tuyệt vọng trước ý tưởng phishing kia thì đang lan man trên github chơi chợt thấy một repo facebook-chat-api (Unofficial) này cho phép mình thao tác hầu hết các chức năng của facebook messenger.

Link repo: https://github.com/Schmavery/facebook-chat-api

Bắt đầu tìm hiểu nó đăng nhập facebook kiểu gì.. 

Với vài dòng desciption ở trên cái repo này thì cụ thể nó sẽ giả lập một browser để có thể đăng nhập facebook. => Thì ra là vậy. Đánh lừa facebook mình đang sử dụng một browser để đăng nhập :joy::joy:

## 5. Let's give it a try

Thấy repo hay hay rồi thì bắt tay và làm thôi :rofl::rofl: . 

Ở đây mình mặc định là các bạn đang sử dụng Ubuntu và đã có Node.js version > 8 cài sẵn trong máy rồi nhé.

Bạn nào chưa cài thì làm theo hướng dẫn dưới đây: 

Cài đặt node.js
```shell
sudo apt-get update
sudo apt-get install nodejs
```
Cài đặt npm:
```markdown
sudo apt-get install npm
```

Kiểm tra lại đã cài thành công chưa:
```shell
nodejs -v
```
Như thế này là đã thành công nhé!!
![](https://images.viblo.asia/ee2d4f8d-a348-4a3d-af3e-6e2f1c0bf5bf.png)

Tạo một thư mục mới để bắt đầu làm 
```javascript
mkdir ./justforfun
```

Di chuyển đến thư mục đó bằng lệnh dưới đây:
```markdown
cd ./justforfun
```
Init npm sử sụng lệnh dưới đây: 
```php
npm init
```
Các bạn sẽ thấy node_modules và  package.log và pakage.json đã được khởi tạo trong thư mục. Tiếp đến ta sẽ cài thử `facebook-chat-api`

```shell
npm install facebook-chat-api
```
Tạo một file test thử với lện sau
```javascript
touch testlogin.js
```
Mở thư file vừa tạo và thêm nội dung như sau:
```javascript
const login = require("facebook-chat-api");

// Create simple echo bot
login({email: "FB_EMAIL", password: "FB_PASSWORD"}, (err, api) => {
    if(err) return console.error(err);

    api.listen((err, message) => {
        api.sendMessage(message.body, message.threadID);
    });
});
```

Trong đó thay  `FB_EMAIL` và  `FB_PASSWORD` bằng email và mật khẩu bạn đăng nhập facebook.

*Note: Trông có vẻ ngon rồi đấy :sunglasses::sunglasses: nhưng mà chưa chạy đâu anh em nhé =))

Chạy thử với:

```javascript
node testlogin.js
```

Và nhận lỗi :
```markdown
Logging in...
You have login approvals turned on.
Something went wrong with login approvals.
```
Trời, Facebook phát hiện ra mình đang đăng nhập bằng một browser lạ hoặc nó detect ra mình đăng nhập bằng facebook-chat-api nên đã chặn đăng nhập.

Đối với 1 số tài khoản thì sẽ gặp phải tình trạng như vậy, và tài khoản mình đã không ngoại lệ

Trở lại đăng nhập facebook với browser và nó lại bắt mình xác minh danh tính mới vào được... Haizzz.... 

#### Tìm ra giải pháp 
Tiếp tục đọc Docs của thằng facebook-chat-api này thì thấy nó có hỗ trợ cả đăng nhập có 2 Factor Authentication

Đăng nhập bình thường thì facebook không cho thì lần này ta force login bằng đăng nhập bằng One-time-password (OTP) xem sao.

Các bác tiến hành tải App Google Authenticator trên điện thoại của mình. Bật bảo mật 2 lớp của Facebook trong phần Cài đặt > Bảo mật và đăng nhập (Security and Login)

![](https://images.viblo.asia/76e7fd8b-ab1d-4aad-8c35-9f3b95e95f2b.png)

Chọn Sử dụng xác thực 2 lớp > Ứng dụng xác thực

![](https://images.viblo.asia/94c0701c-c7b2-4b5a-a078-3ba587d85fbf.png)

Sửa lại file `testlogin.js`

```javascript
const fs = require("fs");
const login = require("facebook-chat-api");
const readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const obj = {email: "FB_EMAIL", password: "FB_PASSWORD"};
login(obj, (err, api) => {
    if(err) {
        switch (err.error) {
            case 'login-approval':
                console.log('Enter code > ');
                rl.on('line', (line) => {
                    err.continue(line);
                    rl.close();
                });
                break;
            default:
                console.error(err);
        }
        return;
    }

    // Logged in!
});
```

Vẫn thay `FB_EMAIL` và  `FB_PASSWORD` bằng email và mật khẩu bạn đăng nhập facebook và vào console chạy thử:
```javascript
node testlogin.js
```

Vào App Google Authenticator và nhập mã OTP đang hiển thị và kết quả: 
![](https://images.viblo.asia/992d8d19-da7d-4850-a66a-9430aaa455a2.png)

Vậy là đã login xong rồi đó :grinning::+1::+1:

Nhưng mỗi lần login lại phải đăng nhập, lại phải nhập mã bảo mật 2 lớp thế này thì không tiện lắm nhỉ....

Nhưng package này cũng hỗ trợ luôn chúng ta đăng nhập bằng cookie nhé.
Ta sẽ tiến hành đăng nhập lần đầu tiên bằng tài khoản và mật khẩu như thường => Facebook trả về cookie => chúng ta lưu nó lại để sử dụng cho đợt sau đăng nhập.

Ta tiếp tục sửa code `testlogin.js` 

```javascript
const fs = require("fs");
const login = require("facebook-chat-api");
const readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const obj = {email: "FB_EMAIL", password: "FB_PASSWORD"};
login(obj, (err, api) => {
    if(err) {
        switch (err.error) {
            case 'login-approval':
                console.log('Enter code > ');
                rl.on('line', (line) => {
                    err.continue(line);
                    rl.close();
                });
                break;
            default:
                console.error(err);
        }
        return;
    }

    // Logged in!
    fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
});
```

Như vậy sau khi đăng nhập xong ta sẽ tạo 1 file và lưu cookie của facebook lại và code đăng nhập bằng cookie có thể trông thế này:

```javascript
const fs = require("fs");
const login = require("facebook-chat-api");

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);
    // Here you can use the api
});
```

#### Lưu tin nhắn vào database. (Google Sheet)

Nhà nghèo không có tiền thuê sever database nên mình đành chọn google sheet làm database thôi.

Các bác tạo một form bằng Google Form 
![](https://images.viblo.asia/9cdec694-fd57-4422-ab29-4fde7d93489b.png)

Tạo các trường mà mình muốn lưu bằng các câu hỏi trong form. 

Các bạn để ý chỗ mình bôi đen ở trên thanh địa chỉ. Các bác lấy ra form id
Các bác gán nó vào code dưới đây ta sẽ được một link để post dữ liệu vào:

```shell
https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/formResponse?
// https://docs.google.com/forms/d/e/1V7ZsBG4wBXL0aYPldLgpdvAd8D01VMYS6PItxzxcH/formResponse?
```


Chuyển sang tab response chọn Create Spread-Sheet

![](https://images.viblo.asia/7382945c-a781-4579-a54d-5abf770321a5.png)

Và trông sheet của chúng ta sẽ như thế này:

![](https://images.viblo.asia/b349e78a-4eb4-4864-a06e-2c114efb1c68.png)



Tiếp tục chuyển về phần Google form các bác chọn Preview ( Hình con mắt ở bên trên ) 
![](https://images.viblo.asia/7382945c-a781-4579-a54d-5abf770321a5.png)

Ở tab này các bác inspect ra trường name của các trường input lấy ra mấy cái entry này 

![](https://images.viblo.asia/c609dd03-dc32-410f-82a3-fd88a66b2d82.png)

Tiếp theo vào trong code vì để bảo mật hơn ta sẽ tạo các file dưới đây:

```javascript
getappstate.js
appstate.json
worker.js
```

File `getappstate.js`

```javascript
const fs = require("fs");
const login = require("facebook-chat-api");
const readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const obj = {email: process.env.USER_NAME, password: process.env.USER_PASSWORD};
login(obj, (err, api) => {
    if(err) {
        switch (err.error) {
            case 'login-approval':
                console.log('Enter code > ');
                rl.on('line', (line) => {
                    err.continue(line);
                    rl.close();
                });
                break;
            default:
                console.error(err);
        }
        return;
    }
    fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
});

```

Trong đó thay `process.env.USER_NAME, process.env.USER_PASSWORD` bằng tài khoản đăng nhập facebook của bạn nếu bạn chạy nó ở local, còn nếu để deploy lên 1 sever thì bạn nên để nó ở 1 file .env nào đó. (Code bên trên dùng để deploy lên heroku)

File `worker.js`

```javascript
const fs = require("fs");
const login = require("facebook-chat-api");
var FormData = require('form-data');

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {

    api.setOptions({
     selfListen: true,
        logLevel: "silent",
        updatePresence: false
    });
    if(err) return console.error(err);
    api.listen((err, message) => {
        if(err) return console.error(err);

        if (!message.isGroup) {
         if (typeof message.body === "string") {
             var form = new FormData();
             if (message.attachments.length == 0){
                 //Do nothing
             }
             else if (message.attachments[0].type === "photo") {
                 form.append("entry.1366768221", message.attachments[0].largePreviewUrl);
                 } else {
                     form.append("entry.1366768221", message.attachments[0].url);
                 }
             form.append("entry.1524614322", message.threadID);
             form.append("entry.1184740740", message.senderID);
             form.append("entry.520057091", message.body);
             form.submit('https://docs.google.com/forms/d/e/1FAIpQLSdcjFkgt_sfsdHadsasd-dshrcv_frGXilUSab08tM_qA/formResponse?', 
                 function(err, res) {
                         console.log(res.statusCode);
                 });
         }

     }

    });

});
```

Vậy là tạm xong phần code backend rồi. 
Để nó chạy thì anh em làm lần lượt thế này nhé.
```javascript
node getappstate.js
node worker.js
```
Và hưởng thụ thành quả nhé. 

### 6. Deploy lên Heroku 

Bác nào muốn nó chạy 24/24 thì Deploy lên Heroku nhé.

Các bác install Heroku CLI:

```markdown
sudo snap install --classic heroku
```

Tạo một file Procfile để define file ` worker.js` chạy như một worker.

Nội dung file như sau:
```sql
node worker.js
```

Tiến hành deploy:
Tạo 1 project trên Heroku, thêm remote cho herokugit các bác tham khảo trên mạng nhé. Ở trên máy mình:

Tạo file .gitignore và ignore `/node_modules `ra nhé.

```shell
git init
```

```shell
git add .
```

```shell
git commit -m "Init Project"
```

```shell
git push heroku master 
```

Config biến môi trường cho project:

```objectivec
heroku config:set USER_NAME=abcxyz@gmail.com
heroku config:set USER_PASSWORD= abcxyz
```

Thay `abcxyz` bằng user name và mật khẩu của bạn

Get appstate:
```javascript
heroku run node getappstate.js
```

Vào project trên heroku > Resources và bật worker lên và hưởng thụ thành quả nhé!

![](https://images.viblo.asia/2c5b4f7a-cb98-4c5c-a2b2-9445a113de01.png)

## Kết luận:
Chúc các bác thành công!

*Note: Như vậy là đã có dữ liệu, hiển thị thế nào thì tùy các bác làm frontend thế nào nhé. 
Các bác có thể dùng các database khác thay thế cho google sheet như Mongo, Mysql, ...

Google sheet cũng có giới hạn 5 triệu Cell thôi anh em nhé. 

Thực chất mình đang dùng DynamoDB và ae nào cần thì mình share code cho nhé.