Trong bài viết này mình sẽ cùng các bạn tạo ứng dụng Viblo trên terminal nhé :smile:
# 1. Chức năng chính
✔ List posts with pagination

✔ Detail post

❌ Login/logout (sử dụng  [personal access token](https://viblo.asia/settings/oauth))

❌ Vote post

❌ Comment post

❌ Check/read new notifications
# 2. Chuẩn bị
- Ngôn ngữ: NodeJS  (>= 7.6 để support async await)
- Thư viện:
    - [VibloSDK](https://github.com/viblo-asia/sdk-js):  Official SDK của Viblo :clap: 
    - [chalk](https://www.npmjs.com/package/chalk): Hỗ trợ làm đẹp text :beer: 
    - [clear](https://www.npmjs.com/package/clear): Hỗ trợ xoá terminal 
    - [configstore](https://www.npmjs.com/package/configstore): Lưu thông tin người dùng, token, ...
    - [figlet](https://www.npmjs.com/package/figlet): Phóng to chữ :bird: 
    - [inquirer](https://www.npmjs.com/package/inquirer): Hỗ trợ tương tác trong terminal. Giúp tương tác với terminal như form trên web vậy =))
    - [marked](https://www.npmjs.com/package/marked): Hỗ trợ parse markdown ra abstract syntax tree (AST)
    - [marked-terminal](https://www.npmjs.com/package/marked-terminal): Hỗ trợ render AST ra terminal. Khá đẹp :hankey: 
    - [node-pager](https://www.npmjs.com/package/node-pager): Brigde lệnh more cho nodeJS. Nôm na là enter để cuộn bài :smirk: 
 
# 3. Một số hình ảnh
![](https://images.viblo.asia/4c1fa2ab-848a-4ea1-a10b-1f34e6b2c800.png)
![](https://images.viblo.asia/27b0cbc2-fa0c-491a-bd80-4f8d412819d7.png)
![](https://images.viblo.asia/36a8f5b4-cc51-4a9e-95a9-4711799f2822.png)
![](https://images.viblo.asia/f1366d9d-b800-439c-ae13-defe3c50c64d.png)
![](https://images.viblo.asia/b58bedf8-78e2-489e-bcee-1c76cd494063.png)
# 4. Tiến hành
GIT repository: https://github.com/tranduykhanh/viblo-cli
```
git clone git@github.com:tranduykhanh/viblo-cli.git 
cd viblo-cli 
yarn 
chmod +x viblo-cli.js 
./viblo-cli.js
```
Code cũng khá basic nên chắc mình cũng ko phải giải thích gì thêm :smiley:

Ngoài ra các bạn có ý tưởng gì hay hãy thoải mái comment hoặc gửi PR nhé. 

Chung tay vì một cộng đồng Viblo ngày càng lớn mạnh :smile:  

-----
Inspired by https://sitepoint.com/javascript-command-line-interface-cli-node-js