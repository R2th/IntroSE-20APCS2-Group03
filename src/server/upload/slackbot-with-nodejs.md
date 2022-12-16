**I. Giới Thiệu:**

Có thể tưởng tượng đó là một “phòng chat”cho toàn bộ nhân viên trong công ty của bạn.
Nếu đã từng nghe về Internet Relay Chat (IRC) thì Internet Relay Chat (IRC) và Slack có chức năng khá giống nhau. Slack sẽ được chia thành các 'kênh' nhỏ cho các cuộc thảo luận nhóm, … hoặc bất cứ điều gì mà bạn muốn.
Slack được nhiều người xem là “sát thủ email”, ứng dụng là cách để “giảm bớt” các email nội bộ của bạn, và hãy quên việc giao tiếp, trao đổi bằng email hoặc các phần mềm chat thông thường đi.
Ưu điểm lớn nhất của Slack là đa nền tảng (máy tính, Android, iOS) nên tất cả mọi người trong công ty của bạn có thể chat nhóm với nhau bất kể họ dùng thiết bị gì đi nữa.
Thêm nữa là khả năng liên kết với các ứng dụng lưu trữ của những hãng khác, chẳng hạn như Dropbox, Google Drive, GitHub…
Gói miễn phí của Slack cho phép người ta có thể lưu trữ tới 10.000 tin nhắn mà nhóm đã trao đổi với nhau, 5GB dung lượng lưu trữ và cho phép liên kết 5 dịch vụ của hãng khác.

Vậy **Slackbot** là gì? **Slackbot** nghe qua thì đã hiểu nó là 1 còn bot của slack. Sẽ tự động thực thi 1 hành động nào đó trên slack thông qua 1 câu lệnh hoặc 1 khoảng thời gian nhất định

**II. Bắt đầu:**

Bước đầu tiên để viết 1 con bot là setup môi trường cho nó. 
Và tất nhiên máy bạn phải cài sẵn nodejs. Còn nếu chưa có có thể tham khảo [tại đây](https://www.youtube.com/watch?v=k1qAkQGYgLE)

Công việc đầu tiên là lên slack và tạo 1 con bot:
Nếu bạn đã đăng nhập thì hãy truy cập vào link sau [Here](https://my.slack.com/apps/A0F7YS25R-bots)

![](https://images.viblo.asia/4d38e9b0-f761-4b9b-aaeb-f09c1bb08cec.png)
Chọn add configuration như trên hình ta sẽ chuyển tới trang create bot
![](https://images.viblo.asia/f3dcb30d-8fb9-41f5-b937-3964131f3fa2.png)
Cho nó 1 cái tên thật hoành tráng và việc sau đó chỉ cần copy API Token là đã xong 1/3 bot rồi

Giờ chúng ta sẽ bắt đầu code các chức năng của bot nhé
Giới thiệu qua về con bot chung ta sẽ demo hôm nay:
Bot sẽ lấy tin tức từ 1 số website và gửi link về slack. Hôm nay sẽ lấy tin tức từ genk.vn bằng cách đọc html to json và get link
web thứ 2 là vnexpress bot sẽ đọc rss và lấy link về slack.
Mình sẽ set nó cứ 1h sẽ gửi link mới nhất về channel trong slack

Chung ta cần tạo 1 channel để demo bot và cài đặt 1 số pakage cần thiết
```
mkdir slackbot
cd slackbot
npm init
```
Tạo 1 slackbot và install pakage slack
```
npm install @slack/client cheerio rss-parser node-schedule --save
```
@slack/client là pakage hỗ trợ tương tác với slack
cheerio pakage này hỗ trợ tìm phần tử khi load html như jquery
rss-parser pakage hỗ trợ đọc rss từ website
node-schedule pakage hỗ trợ lập lịch hẹn thời gian thực hiện

Chúng ta sẽ require những pakage cần thiết vào index.js
```
const request = require('request');
const cheerio = require('cheerio');
const { RTMClient } = require('@slack/client'); //khi được khởi tạo, sẽ là đối tượng bot của chúng ta, nó tham chiếu đến RTM API
const Parser = require('rss-parser');
var parser = new Parser();
const schedule = require('node-schedule');
```

tiến hành set token api của bot mà mình đã thực hiện ở bước đầu tiên
```
const token = process.env.tokenSlack;
```
Client của chúng ta được khởi tạo và bắt đầu có kết nối với slack
```
const rtm = new RTMClient(token);
rtm.start();
```
khởi tạo 1 const chứa channelID để những link mình get được sẽ gửi tới channel này
```
const channelId = process.env.channelID;
```
À tới đây sẽ có 1 lưu ý nhỏ. 1 là chúng ta nên set token và channel vào biến env để đảm bảo tính an toàn bảo mật, 2 là nếu chúng ta bỏ token api vào và push lên github thì ngay lập tức
slack sẽ biết và thay đổi token api này đó là phương thức hđ của slack 

Tiếp theo chúng ta sẽ tạo 1 function gửi message qua slack nhé
```
function sendMgsSlack(link) {
  rtm.sendMessage(link, channelId)
    .then((res) => {
      console.log('Message sent: ' + link);
    })
    .catch(console.error);
};
```

đã xong phần gửi message tới slack. chúng ta có thể run `node index.js và kiếm tra`

Tiếp theo là get link từ webtion hỗ trợ rss như vnexpress
lần này chúng ta sẽ sử dụng `rss-parser` để bốc link từ rss vnexpress ra 
```
function getLinkVnexpress() {
    let feed = await parser.parseURL('https://vnexpress.net/rss/tin-moi-nhat.rss');
    sendMgsSlack(feed.items[0].link);
};
```

Tiếp tục viết 1 function get link từ websiton k hỗ trợ rss. bằng cách đọc html
```
function getLinkGenK() {
  request('http://genk.vn', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      var links = ("http://genk.vn" + $('.knswli-title a')[0].attribs.href)
      sendMgsSlack(links);
    }
  });
}
```

Vậy là đã send message thành công, đã get link xong. giờ chỉ cần lập link chạy từng function nữa thôi
Rất đơn gia chúng ta chỉ cần
```
var rule = new schedule.RecurrenceRule();
rule.minute = 60;

schedule.scheduleJob(rule, function(){
  getLinkVnexpress();
  getLinkGenK();
});
```
 
Vậy là xong. chúng ta gõ `node index.js` và thưởng thức thành quả. nhớ set env nhé ^^

**III.Kết:**

Nếu bạn muốn kiếm 1 hosting free deploy thì khuyên bạn nên kiếm hosting có thể hỗ trợ cronjob nhé. vì mình thấy mấy cái hosting free k hỗ trợ việc này điển hình như heroku
tất nhiên là có nhiều cách nhưng cách hay nhất vẫn là mình cronjob tự code
Mình có dùng hosting này [evennode](evennode.com) nhưng chỉ cho trial 1 tháng thôi. :D thủ tục đơn giản nên các bạn có thể lên dky và test thoải mái
Good lucky!