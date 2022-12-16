![](https://images.viblo.asia/898c3a20-48d6-4913-abd5-577f94883648.png)

Hôm nay là ngày 25/09/2022, khoảng 8h sáng đang mơ mơ màng màng trên chiếc giường ngủ, và có những tiếng chuông điện thoại reo lên từ đám bạn rủ rê đi bơi, đi cà phê: 

"Sao chủ nhật nào cũng phải gọi mày dậy vậy ? lười như cờ hó, tự giác đi chứ mậy".

Và từ đó tôi trong tôi bừng nắng hạ, cũng tự nhận ra lòng tự giác bên trong mình trỗi dậy =))).

Sau đó tôi cũng liên tưởng tới những cuộc họp trong công ty, thường bị các đồng nghiệp và síp nhắc nhở vào phòng họp chậm vì tôi là người hay không check mail (mong síp thấy đừng chửi tội em) 😀. đa số chỉ đọc các tin nhắn từ slack và telegram.

Lúc đó thoáng qua tôi mới nghĩ rằng: "phải chi telegram có con bot để nhắc vào phòng họp thì hay biết mấy !".

Và sau đây mình sẽ hiện thực hoá nó nào.

# 1. Tạo Bot Telegram
Trước tiên, để có ai đó tương tác với mình qua telegram thì cần phải có 1 chú bé BOT 😘. Mà để tạo được một chú bé BOT các bạn phải có tài khoản telegram nhe =))).

Sau khi đăng nhập telegram các bạn vào thanh search để tìm chúa tể của những con BOT được gọi là "BotFather" (các bạn nhớ chọn con có tick xanh nhé).

![](https://images.viblo.asia/ed38924e-e5bd-4ffd-b050-ae31a1fe1fdd.png)

Các bạn lần lượt gõ câu lệnh như sau:

```bash
/newbot
```

Để yêu cầu BotFather tạo cho mình một con BOT. Sau đó BotFather sẽ lần lượt hỏi bạn để thiết lập cho BOT của bạn.

```
Đặt tên cho BOT
Đặt username cho BOT
```

![](https://images.viblo.asia/151bbc9e-37d8-4cda-90de-882acbe9eaca.png)

Sau khi thiết lập xong BotFather sẽ sinh ra cho bạn một `access token`
như hình bên dưới mình có được:

```
1AWDSD2i5625616482:AAG872AMAmYpeqeeR5tjjGvugTCbMEJQqQo3MUqqE
```

Vậy là xong phần tạo một con BOT từ telegram.

# 2.Tương tác với BOT (Nodejs)
Ở đây mình sẽ sử dụng Nodejs làm Backend để BOT nhận command từ người dùng và tương tác. Bạn có thể cài đặt Nodejs [tại đây.](https://nodejs.org/en/download/)

Và mình sẽ sử dụng thư viện [node-telegram-bot-api](https://www.npmjs.com/package/node-telegram-bot-api) sẵn có của nodejs để giao tiếp với Bot telegram:

Bây giờ mình sẽ tạo nodejs project và tương tác với BOT như sau. Các bạn tạo một folder và mở terminal gõ lần lượt các dòng lệnh:

```bash
npm install dotenv --save
```

```bash
npm install node-telegram-bot-api
```
![](https://images.viblo.asia/a3c2ca02-ebd4-416b-82ca-ec26d1fae153.png)

Tạo một file `.env` để cài đặt biến môi trường với access token ở bước 1.

```.env
TELEGRAM_TOKEN=1AWDSD2i5625616482:AAG872AMAmYpeqeeR5tjjGvugTCbMEJQqQo3MUqqE
```

![Hoàng Phúc](https://images.viblo.asia/d870cf58-f89e-4acc-8675-5cf19acfc38d.png)

Tiếp theo là tạo một file `index.js` trong folder và paste đoạn code bên dưới vào.

```index.js
require("dotenv").config();
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content of the message
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});
```

 Gõ lệnh `node index.js` vào Terminal.

 ![](https://images.viblo.asia/9ed8088e-6ab5-40a1-965a-b78fd790b77d.png)
 
Bây giờ quay trờ lại BotFather và click vào vùng khoanh đỏ bên dưới hình để "trò chuyện" với bé BOT.

![image.png](https://images.viblo.asia/bc6cb8c9-4a7a-4f66-ba33-800d620f30df.png)

Và gõ:

```bash
/start
```

```bash
/echo {something}
```

![](https://images.viblo.asia/4190fd0b-6411-49e6-a16b-077e2c9f8eff.png)

Ok vậy là bé BOT đã nhận được tin nhắn và phản hồi lại câu lệnh mà chúng ta gõ.

# 3.Google Canlendar Service API
Tiếp theo chúng ta sẽ đăng nhập và đăng ký [Google Console](https://console.cloud.google.com/getting-started).

Tại **Menu bar** > **IAM & Admin** > **Service Accounts** > **CREATE PROJECT**.

![](https://images.viblo.asia/ba53058a-598d-4dec-b9a0-b456245b29b7.png)

Điền thông tin của bạn và nhấn **CREATE**.

![](https://images.viblo.asia/b9338625-7184-4e91-800d-2a91c51269cf.png)

Tiếp theo nhấn **CREATE SERVICE ACCOUNT**.

![](https://images.viblo.asia/5863adb5-4066-4aac-acd9-85cfd08e1d9f.png)

Điền tiếp thông tin của bạn và nhấn **CREATE AND CONTINUE**.

![](https://images.viblo.asia/4359925d-121d-47ad-aaf1-55adf76449ae.png)

Ở bước 2 mình chọn Role `Owner` và tiếp tục nhấn **CONTINUE**.

![g](https://images.viblo.asia/f71d5b1a-b36c-4322-8387-01bd2247864b.png)

Tại bước 3 mình không chọn account nào nên nhấn luôn **DONE**.

![](https://images.viblo.asia/4c88b364-d3ff-43c9-9481-2f89fc629e1e.png)

Tiếp theo chọn **Manage keys**.

![](https://images.viblo.asia/204eb10f-4307-4765-a7eb-5f3f80621cff.png)

Tại tab **KEYS** chọn **ADD KEY** > **Create new key**.

![](https://images.viblo.asia/1e3715b2-ed79-4aa7-8179-fd7da62c4c88.png)

Ở đây mình sẽ chọn private key dạng **JSON** và nhấn **CREATE**.

![](https://images.viblo.asia/84b972e3-1e08-4480-a327-6bbdd4d35123.png)

Sau đó file private key sẽ được download xuống máy của bạn.

![](https://images.viblo.asia/ffb6a0a3-3374-4584-ab52-a954d3e68193.png)

File private key của ta có dạng như sau:

![](https://images.viblo.asia/cba64277-4ec7-4f9f-868e-b625e1c279a7.png)

Ta có thể làm 2 cách:
+ Copy file này vào project node của chúng ta và dùng fs đọc file.
+ Copy đoạn json trong file chuyển thành text để làm biến môi trường.


Nhưng do ở đây mình lười quá nên làm cách số 2 như hình bên dưới nha nha 😌 

![Screen Shot 2022-09-26 at 00.18.52.png](https://images.viblo.asia/b97ed63c-db43-4efd-bf76-66c0f7d2e796.png)

Kế tiếp chúng ta sẽ đi tìm Calendar Client ID. Truy cập vào [Google Calendar](https://calendar.google.com/calendar). Tìm tên của bạn ở góc trái bên dưới và click vào button 3 chấm.

![](https://images.viblo.asia/5e312f96-fb0d-4345-9fc0-a00724cf2966.png)

Chọn **Settings and sharing**.

![image.png](https://images.viblo.asia/217acc6c-a798-4b82-b240-6bfc252e5e4a.png)

Scroll xuống và tìm mục `Share with specific people`.

![image.png](https://images.viblo.asia/dd25eb7d-e823-4da8-b75c-326ea0e622ac.png)

Paste `client_email` trong file private key json của bạn vào input và click **Send**.

![Screen Shot 2022-09-25 at 23.17.20.png](https://images.viblo.asia/e43a568c-9cfd-4d73-ac05-c1516be3f255.png)

Scroll xuống và tìm ở mục `Calendar ID`.

![image.png](https://images.viblo.asia/5433d84b-c8bd-466d-bb38-dd1a13bd91c1.png)

Copy đoạn text và gắn vào biến môi trường trong project node.

![Screen Shot 2022-09-25 at 23.19.30.png](https://images.viblo.asia/09fa7f22-002a-4334-892b-3becda3cdee0.png)

Quay trở lại [Google Console](https://console.cloud.google.com), tại menu bar chọn **APIs & Services** > **Enabled APIs & services**

![Screen Shot 2022-09-25 at 22.41.41.png](https://images.viblo.asia/9284eeea-3bd2-4250-b9ff-2ed7de3834c6.png)

Chọn tiếp **ENABLE APIS AND SERVICES**.

![image.png](https://images.viblo.asia/01aa7374-7b61-4a70-a83f-138cfad6d582.png)

Search từ khoá **google calendar api** và chọn cái đầu tiên.

![image.png](https://images.viblo.asia/dbf9bd75-7b4a-48fa-b832-4773dffd411b.png)

Click **ENABLE**.

![Screen Shot 2022-09-25 at 22.46.19.png](https://images.viblo.asia/9e2e862b-0557-4ead-934c-205d87f1f035.png)

Quay trở lại project node tại Terminal thêm câu lệnh:

```bash
npm install googleapis@105 @google-cloud/local-auth@2.1.0 --save
```

Thêm đoạn code này lên đầu file `index.js`

```index.js
const {google} = require('googleapis');
...
```

Và paste đoạn code dưới đây vào nơi bất kì trong file `index.js`

```index.js
...
const CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS);
const calendarId = process.env.CALENDAR_CLIENT_ID;
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({version : "v3"});
const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);

// Get all the events between two dates
const getEvents = async (dateTimeStart, dateTimeEnd) => {
    try {
        let response = await calendar.events.list({
            auth: auth,
            calendarId: calendarId,
            timeMin: dateTimeStart,
            timeMax: dateTimeEnd,
            timeZone: 'Asia/Ho_Chi_Minh'
        });
        console.log(response['data']);
        let items = response['data']['items'];
        return items;
    } catch (error) {
        console.log(`Error at getEvents --> ${error}`);
        return 0;
    }
};
```

Ok bây giờ mình sẽ hardcode thời gian bằng đoạn code bên dưới để testing Google Calendar API nhé.

```js
let start = '2022-09-25T00:00:00.000Z';
let end = '2022-09-25T23:59:59.000Z';

getEvents(start, end)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
```

Mở Terminal và gõ lệnh `nodex index.js`

![Screen Shot 2022-09-25 at 22.53.20.png](https://images.viblo.asia/51d34c60-9499-4122-afb2-bf43f6d3fafb.png)

Vậy response ta nhận được một mảng rỗng. Bây giờ chúng ta vào calendar tạo và test lại thử nhé

![Screen Shot 2022-09-25 at 22.55.16.png](https://images.viblo.asia/5a3879d0-1f75-43c0-a3fd-9905826c6f8a.png)

Và mình đã tạo thời gian từ 11pm-12am ngày 25/09/2022 với tiêu đề 'Có chắc yêu là đây ?'. Bật Terminal và test lại nhé.

![Screen Shot 2022-09-25 at 23.20.56.png](https://images.viblo.asia/bccf4b78-4a8e-4421-98e6-cf7cc36c85dc.png)

Và bây giờ chúng ta đã thấy lịch vừa tạo ở trên với summary 'Có chắc yêu là đây ?' 😁

# 4.Tạo schedule chat bằng telegram BOT
Để tạo 1 schedule mình sẽ sử dụng thư viện [Node Schedule](https://www.npmjs.com/package/node-schedule). Tại Terminal project node gõ câu lệnh để cài Node Schedule:

```bash
npm install node-schedule
```

Thêm đoạn code bên dưới vào đầu file index.js

```index.js
const schedule = require('node-schedule');
...
```

Để tạo một job schedule ta sử dụng đoạn code bên dưới:

```index.js
const job = schedule.scheduleJob('07 * * * *', function(){
  console.log('Xin chào nè he');
});
```

Với Cron-style được giải thích như sau:
![Screen Shot 2022-09-25 at 23.28.48.png](https://images.viblo.asia/b952459f-85cc-48bb-9b90-327f21de2b83.png)

Bây giờ mình sẽ viết một đoạn code convert time từ google calendar API trả về để tạo thành cron job.

```index.js
function createJob(googleCalendarList, chatId) {
	googleCalendarList.forEach(function(item, index) {
		if (item?.start?.dateTime) {
			let time = new Date(item.start.dateTime);
			let minutes = time.getMinutes();
			let hours = time.getHours();
			let date = time.getDate();
			let month = time.getMonth() + 1;
			let cron = `${minutes} ${hours} ${date} ${month} *`;
			console.log(cron);
			let job = schedule.scheduleJob(cron, function() {
				//Để nhấn mạnh mình cho nó chat tới 3 lần :)))
				bot.sendMessage(chatId, `Cuộc họp có tiêu đề '${item.summary}' sắp diễn ra !!!`);
				bot.sendMessage(chatId, `Cuộc họp có tiêu đề '${item.summary}' sắp diễn ra !!!`);
				bot.sendMessage(chatId, `Cuộc họp có tiêu đề '${item.summary}' sắp diễn ra !!!`);
				//sau khi chạy xong thì xoá luôn cron job này.
				job.cancel();
			});
		}
	});
}
```

Mình sẽ bọc đoạn code testing phía trên và hàm convert time lại để telegram BOT có thể nhận được tín hiệu và set schedule với command là `calendar_start`.

```index.js
bot.onText(/\/calendar_start/, (msg, match) => {
	const chatId = msg.chat.id;
    
    //khoảng thời gian mà bạn muốn lấy lịch ở đây mình lấy trong 1 ngày 0h - 23h59
    let start = '2022-09-26T00:00:00+07:00';
	let end = '2022-09-26T23:59:59+07:00';

	getEvents(start, end)
		.then((res) => {
			createJob(res,chatId);
		})
		.catch((err) => {
			console.log(err);
		});
});
```

Hiện tại bây giờ là 23:54 phút mình sẽ tạo lịch vào lúc 00:15 ngày 26/09/2022 để xem telegram BOT có báo cho mình không nha.

![Screen Shot 2022-09-26 at 00.02.08.png](https://images.viblo.asia/de545e95-22ff-4c1b-86d5-d0f4f1b06370.png)

Tiếp vào Telegram BOT dùng câu lệnh `calendar_start` để ra lệnh cho BOT lấy dữ liệu từ google calendar API về để testing.

![Screen Shot 2022-09-25 at 23.59.16.png](https://images.viblo.asia/422e99a0-7189-4087-b1a2-220c1df0bd02.png)

Sau khi đợi 15 phút sau thì nhận được tin nhắn lúc 00:15.

![image.png](https://images.viblo.asia/819a58da-523b-4666-8c35-16bc6ff514f6.png)

Bước cuối cùng là set schedule mỗi 7h sáng để kéo dữ liệu Google Calendar Data về và set schedule.

```index.js
function getGoogleCalendarAPI(chatId) {
	let currentTime = new Date();
	let start = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}T00:00:00+07:00`;
	let end = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}T23:59:59+07:00`;
	getEvents(start, end)
		.then((res) => {
			createJob(res, chatId);
		})
		.catch((err) => {
			console.log(err);
		});
}

let jobEveryDay = schedule.scheduleJob('0 7 * * *', function() {
    let chatId = //Bạn có thể set cứng chatId của telegram user của bạn hoặc 1 group để BOT gửi tin nhắn vào.
	getGoogleCalendarAPI(chatId);
});
```

Vậy với thao tác chỉ với tầm ~30 phút ta có thể tạo một con BOT tương tác qua Telegram một cách dễ dàng.

Ở đây mình chỉ hướng dẫn cách tạo một con BOT, Google Calendar API và cách hoạt động của nó là chính (nếu muốn thực hiện hoá luôn thì bạn nên trừ thêm 5~10 phút trước khi vào phòng họp nhé) còn các chức năng khác các bạn có thể tự suy nghĩ và tuỳ biến nó nhé 😁.

Các chức năng BOT của mình:

![Screen Shot 2022-09-26 at 00.35.20.png](https://images.viblo.asia/757b9615-1eaf-412c-8521-ac6fc6d603e8.png)

Chúc các bạn nhiều sức khoẻ ❤️.

# Mục tìm kiếm đồng đội
![Hoàng Phúc](https://images.viblo.asia/fce6daf3-be8d-40c5-b85a-2e7a58f9e6be.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội [Senior Backend Engineer.](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022)

Đồng đội [Senior Frontend Engineer.](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021)