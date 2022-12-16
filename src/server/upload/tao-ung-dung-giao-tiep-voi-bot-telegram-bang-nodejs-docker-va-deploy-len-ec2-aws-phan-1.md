Telegram đang ngày càng được sử dụng rộng rãi vì những chức năng mà nó mang lại (chỉnh sửa tin nhắn đã gửi, gửi file dung lượng lớn, last seen,...) với một performance vô cùng tuyệt vời. Một trong những tính năng đó là Bot Telegram, có rất nhiều bot trong các loại dịch vụ khác nhau phục vụ mục đích giao tiếp kỹ thuật số.

Bot Telegram có thể làm mọi thứ và giúp tiết kiệm thời gian.
Vì thế hôm nay mình sẽ hướng dẫn tạo một project sử dụng Node.js + Docker để tương tác với Bot Telegram nhé.

## I. Đăng kí Bot với Telegram
1. Mở ứng dụng telegram và tìm kiếm từ khoá `BotFather` và chọn BotFather có tick xanh
![image.png](https://images.viblo.asia/125b82c9-7cfe-41fe-990d-3df2f56861f0.png)

2. Nhấn vào `Start` 
3. Hệ thống sẽ hiển thị đoạn chat, bạn có thể chọn ngay ` /newbot - create a new bot` hoặc nhắn trực tiếp từ khoá `/newbot` bằng khung chat
![image.png](https://images.viblo.asia/e7b71eff-5195-41da-a908-c566742d1bd9.png)

4. Nhập tên cho Bot
![image.png](https://images.viblo.asia/9833fc99-fa9b-4a6a-a537-5cba2cee91b8.png)

5. Nhập username cho Bot
6. Hệ thống sẽ trả về kết quả có chứa secret token nếu bước trên thành công
![image.png](https://images.viblo.asia/baf4ce87-df24-4185-abbb-6cc2a85e5bc5.png)

## II. Tạo ứng dụng Node.js
1. Cài đặt NodeJs nếu chưa có: https://nodejs.org/en/
2. Tạo folder chứa project và đặt tên `bot-tele-sample`
3. Cd *your-path*/bot-tele-sample bằng terminal/cmd
4. Gõ `Code .` (Ở đây mình shortcut vscode, bạn có thể mở project một cách thủ công)
5. Chạy lệnh `npm init`
![image.png](https://images.viblo.asia/0db7028b-85e8-4289-8fc5-938040fd1ba3.png)

6. Enter (lấy tên folder cho tên package) hoặc nhập tên package khác
7. Ở các bước tiếp theo bạn cứ Enter cho nhanh 😹
![image.png](https://images.viblo.asia/f25c4f05-c36d-4cc0-89c8-7b06fcddc8df.png)

8. Tạo file index.js
9. Install package telegraf - package được recommend bởi chính telegram: `npm i telegraf`
10. Import telegraf và khởi tạo instance cho nó với token mà bạn đã được cấp trước đó
![image.png](https://images.viblo.asia/c46d24f8-c194-43d1-807a-a8a1ac477533.png)

11. Thêm 2 dòng lệnh và lauch bot
```
bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));
```
- ctx.reply(message) là nội dung mà Bot sẽ gửi cho bạn

12. Vào telegram tìm username bạn tạo cho bot và start trò chuyện với nó
![image.png](https://images.viblo.asia/bcf5ea17-a0e7-41c2-bfc9-01516e66d845.png)

13. Bot sẽ trả lời "Welcome" như trong đoạn code của chúng ta vừa thêm
![image.png](https://images.viblo.asia/10561787-5ff3-4f69-9ffb-1e07060f7850.png)

14. Gửi tin nhắn `/help` và Bot sẽ phản hồi
![image.png](https://images.viblo.asia/9e4f63cb-9c58-428d-a83a-9ea946455758.png)

15. Thêm dòng lệnh lắng nghe những tin nhắn được gửi bằng sticker, sau đó restart lại project

`bot.on("sticker", (ctx) => ctx.reply("🐶"));`

16. Gửi cho Bot một sticker, bạn sẽ nhận được reply từ nó
![image.png](https://images.viblo.asia/dfa0f3a0-b212-4cce-8eec-85c8fb6ee49b.png)

17. Thêm một đoạn code để lắng nghe messages được gửi đi, sau đó restart lại project
```
bot.on("message", async (ctx) => {
  const message = ctx.update.message.text;
  if (message.match(/hello/)) {
    ctx.reply("Xin chào");
  } else {
    ctx.reply("Hong hiểu...");
  }
});
```

18. Gửi tin nhắn cho Bot thôi nào

![image.png](https://images.viblo.asia/56e325a7-b1e4-40eb-be88-8f252d37bfc3.png)

### Code file index.js
```
const { Telegraf } = require("telegraf");

const YOUR_TOKEN = "your_token";
const bot = new Telegraf(YOUR_TOKEN);

bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));

bot.on("sticker", (ctx) => ctx.reply("🐶"));

bot.on("message", async (ctx) => {
  const message = ctx.update.message.text;
  if (message.match(/hello/)) {
    ctx.reply("Xin chào");
  } else {
    ctx.reply("Hong hiểu...");
  }
});

bot.launch();
```

## III. Run Docker
Hẹn các bạn ở [phần 2](https://viblo.asia/p/tao-ung-dung-giao-tiep-voi-bot-telegram-bang-nodejs-docker-va-deploy-len-ec2-aws-phan-2-ByEZkApY5Q0) nhé ^^, trong phần tiếp theo mình sẽ hướng dẫn các bạn setup Docker và deploy project lên AWS EC2.


### Mục tìm kiếm đồng đội
Hiện tại thì bên công ty mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và là trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:
+ Senior Backend Engineer (Java). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221

Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:
+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn để cần giải quyết, và sẽ có rất nhiều bài toàn thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email kha.le@hoang-phuc.net của mình nha 

Cảm ơn các bạn đã đọc.