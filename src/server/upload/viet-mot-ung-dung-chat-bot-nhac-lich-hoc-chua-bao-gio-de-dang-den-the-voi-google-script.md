### Tình huống
Ngày trước khi còn học cấp 3, mình hay có thói quen nhớ thời khóa biểu, tuy nhiên khi lên đại học thì thói quen đó không còn nữa, một phần vì thời khóa biểu ở đại học có cơ số thứ cần để nhớ (mã môn, tên môn, phòng học, blabla ...), cũng một phần vì lười nữa :joy:.Vì vậy mà mình rất thường xuyên quên lịch học, đôi khi còn giật mình không biết là hôm nay có phải đi học không.

Thế rồi mình nảy ra ý định viết một con Chat Bot nhắc lịch học chạy hàng ngày để không phải bận tâm hôm nay học môn gì nữa.Tuy nhiên khi ấy lập trình cũng chưa thạo, biết bập bẹ ít javascript thôi, nên việc viết một con ChatBot rồi deploy lên server là một điều mà mình không thực sự nghĩ đến. Trong số các pro trong lớp thì có một cậu bạn viết bằng Google Script đồng thời cũng demo luôn cho mình cách hoạt động, thế là mình ngộ ra bao nhiêu chân lý, cuối cùng tìm hiểu và đã làm được :clap::clap:

Giật tít vậy thôi, chứ thật ra Chat Bot của mình chỉ là một function viết bằng Google Script thôi :joy:. Chúng ta cùng tìm hiểu xem Google Script là gì và vì sao lại có thể viết được ChatBot với nó nhé :v


-----


### Google Script là gì?
Google Script - đọc qua cái tên thì ta cũng có thể mường tượng được chức năng của nó: là 1 ngôn ngữ lập trình dựa trên Javascript với trình biên tập, biên dịch đều nằm trên máy chủ của Google. Với công cụ này bạn có thể lập trình để thao tác, can thiệp trực tiếp đến các dịch vụ của Google. Ngoài ra còn cơ số các chức năng hay ho khác nữa, trong số đó thì có việc thực thi một function với thời gian nhất định trong một ngày, mình đã lợi dụng điểm này để đẩy thông báo lịch học.

-----


### Bắt đầu viết code thôi
Giao diện của [Google App Script](https://script.google.com/home/all) sẽ trông như thế này
![](https://images.viblo.asia/062592ec-c1e8-4d0a-a9b3-d0192d4c4d0b.png)
Nhấn vào nút Dự án mới để tiến hành viết Code
![](https://images.viblo.asia/4331f6cd-e277-4f88-98d9-ee531dfbcd21.png)

Ban đầu tất nhiên là phải xây dựng database cho con Bot rồi. Ở đây mình sử dụng google sheet để làm database.

Nội dung của sheet này như sau:
![](https://images.viblo.asia/f9f838e8-9947-4beb-ace4-3bec9d07c2bd.png)
Vì đây là thời khóa biểu học kì một của mình nên chỉ có từ tháng 8 đến tháng 12 thôi.

Có database rồi vậy làm thế nào để có thể đọc được dữ liệu từ sheet đây? Đây chính là lúc phát huy thế mạnh của Google Script. Chúng ta có thể đọc file sheet với function sau
```javascript
SpreadsheetApp.openById(file_tkb)
```
Các bạn có thể xem chi tiết tại đây https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app

Trong đó ```file_tkb``` là ```id``` của sheet database nó được lấy như trong hình ở bên dưới
![](https://images.viblo.asia/83550b94-fb99-4dc5-9c05-8d707bb81938.png)

-----
Tiếp theo chúng ta sẽ đi xây dựng logic đọc sheet để có thể lấy đúng dữ liệu mong muốn:

```javascript
  var today = new Date();
  var first = new Date(today.getFullYear(), 6, 29);
  var theDay = Math.round(((today - first) / (1000 * 60 * 60 * 24)) + .5, 0);
```
Ở đoạn code trên mình lấy ra ngày hiện tại (```today```), ngày đầu tiên của tuần đầu tiên học kì mới (```first``` ở đây là ngày 29 tháng 7), sau đó tính xem ngày hôm nay cách ngày đầu tiên đi học bao nhiêu ngày (```theDay```).

Tiếp theo lần lượt tạo ra các biến sau
```javascript
  var week_1 = theDay/7;
  var week_mod = theDay%7;
  var week_col;
  var week_row;
  var message;
```
Trong đó:

1.  Nếu ```week_mod == 0 || week_mod == 6``` thì ngày hôm nay là cuối tuần gán 
 ```message = "Hôm nay là cuối tuần chịu khó tập thể dục đi";```
 2. Ngược lại ta có:
 ```javascript
    week_col = parseInt(week_1)+1;
    week_row = week_mod;
    var real_col = week_col+2;
    var real_row = ((week_row-1)*3+2);
 ```
 Ví dụ cho dễ hiểu một chút:
 
 Giả sử hôm nay là ngày ```20/12/2019``` thì ta có ```theDay = 145```, ```week_mod = 5``` vậy có nghĩa là thứ 6. ```real_col = 23 ; real_row = 14``` chúng ta sẽ bắt đầu lấy dât trong sheet ở cột 23, dòng 14.


-----

Để lấy data mình sử dụng đoạn code như sau:
```javascript
    var file_tkb = YOUR_SHEET_ID;
    var ss = SpreadsheetApp.openById(file_tkb);
    var url = ss.getUrl();
    var a = ss.getSheets()[0].getSheetValues(real_row+1, real_col, 1, 1);
    var study_code = a[0][0];
```
Khi đã có vị trí của data trong sheet thì lấy dữ liệu ra bằng function ```getSheetValues```, các bạn có thể xem chi tiết tại đây nhé https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet
Ở đây dữ liệu trả về là một mảng 2 chiều, ta thu được ```study_code = a[0][0]```, đây chính là mã môn học mà chúng ta cần.

-----
Tạo từ điển tương ứng cho mã môn học vừa nhận được
```javascript
  var DICTIONARY = {
    "AT6": "An toàn điện toán đám mây",
    "TM5": "Chứng thực điện tử",
    "TM6": "Phòng chống và điều tra tội phạm máy tính",
    "TM7": "An toàn Internet & TM điện tử",
    "AT5": "Quản trị an toàn hệ thống"
  }
 ```
 Vậy là đã có đủ thông tin để gửi tin nhắn rồi format lại message gửi đi một chút cho hợp lý
 ```javascript
 if(study_code != "") {
  var study_name = DICTIONARY[study_code];
  if (study_name == undefined) {
    message = "Opps!!!\nLát nữa cậu phải học môn có mã là "+ study_code +" từ 18h đến 21h đấy nhé!!";
    message = message + "\nVui lòng update lại từ điển để mình có thể biết được tên môn";
    message = message + "\nNếu mã môn trên là sai, hãy xem lại thời khóa biểu tại: "+ url;
  } else {
    message = "Hê lô mai phen :))\nLát nữa cậu phải học môn "+ study_name + " từ 18h đến 21h đấy nhé!!";
  }
} else {
  message = "Hôm nay cậu được nghỉ đấy (tunghoa)";
}
if (week_mod == 3) {
  message = message + "\nHôm nay cũng là thứ 4, 21h đi đá bóng nhé";
}
 ```
 

-----
Tiếp theo là bước gửi tin nhắn với ```message``` ở trên. Ở đây mình sử dụng Chatwork, Messenger Facebook, Telegram để nhận tin nhắn thông báo.
### Gửi tin nhắn về Chatwork
Để có thể gửi tin nhắn về chatwork thì trước tiên chúng ta phải có [API_KEY của Chatwork](https://www.chatwork.com/service/packages/chatwork/subpackages/api/apply_beta.php). Mình đã đọc document của chatwork thì thấy để có thể mention một người vào tin nhắn thì phải sử dụng webhook, tuy nhiên function của mình đang không hoạt động theo cơ chế này, vì thế mà mình sử dụng một mẹo nhỏ như sau:
```javascript
function send_to_chatwork(textMessage) {
  var room_id = "170443428"
  var API_TOKEN = YOUR_API_CHATWORK
  var baseText = "[toall] Boss \n" + textMessage //private user [To:3797875]
  var headers = {
    "X-ChatWorkToken": API_TOKEN
  }
  var payload = {
    "body": baseText
  }
  var options = {
    "method": "post",
    "headers": headers,
    "payload": payload,
    "muteHttpExceptions": true
  }
  UrlFetchApp.fetch("https://api.chatwork.com/v2/rooms/" + room_id + "/messages?force=0", options);
  Logger.log("Send Chatwork ok");
}
```
Tạo riêng cho mình và Bot một room chat, sau đó add hai người vào trong đoạn tin nhắn gửi đến thì thêm đoạn text ```[toall]``` vậy là tất cả thành viên trong room đã được mention vào message :sunglasses:


-----


### Gửi tin nhắn qua Messenger và Telegram
> Telegram:
```javascript
function send_to_telegram(textMessage){
  var payload = {
    "method": "sendMessage",
    "chat_id": YOUR_CHAT_ID,
    "text": textMessage,
    "parse_mode": "HTML"
  }
  
  var data = {
    "method": "post",
    "payload": payload
  }
  var API_TOKEN = YOUR_API_BOT_TELEGRAM;
  UrlFetchApp.fetch('https://api.telegram.org/bot' + API_TOKEN + '/', data);
  Logger.log("Send Telegram ok");
}
```

> Messenger
```javascript
function send_to_facebook(textMessage) {
  var recipient_ids = [YOUR_CHAT_ID];
  var API_TOKEN = YOUR_GRAPH_API_FACEBOOK
  for (var j = 0; j < recipient_ids.length; j++) {
    var messageData = {
      "recipient": {
        "id": recipient_ids[j]
      },
      "message": {
        "text": textMessage
      }
    }
    var JSONdMessageData = {}
    for(var i in messageData){
      JSONdMessageData[i] = JSON.stringify(messageData[i])
    }
    var payload = JSONdMessageData
    // payload.access_token = API_TOKEN
    var options = {
      "method": "post",
      "payload": payload
    }
    
    UrlFetchApp.fetch("https://graph.facebook.com/v5.0/me/messages?access_token=" + API_TOKEN, options);
  }
  Logger.log("Send Facebook ok");
}
```
Đối với Telegram chúng ta phải tạo một con Bot Telegram và lấy ```YOUR_CHAT_ID``` thông qua ```YOUR_API_BOT_TELEGRAM``` của con bot đó các bạn có thể xem hướng dẫn [tại đây](https://medium.com/@unnikked/how-to-create-your-first-telegram-bot-9005c08a5aa5)

Đối với Messenger thì chúng ta cần tạo ra một Page cho Bot, sau đó gửi cho Page một tin nhắn để có thể lấy được ```YOUR_CHAT_ID``` thông qua ```YOUR_GRAPH_API_FACEBOOK```, còn về chi tiết thì mình không hướng dẫn nữa để tránh dài dòng, nếu thực sự quan tâm thì có thể tham khảo các bài viết khác liên quan đến [Graph API Facebook](https://developers.facebook.com/docs/graph-api/)

-----
Cuối cùng là việc setting cho function của mình chạy hàng ngày vào một khung giờ nhất định
![](https://images.viblo.asia/175b1ebf-85b3-48cb-a023-d1cf826eb0f6.png)

![](https://images.viblo.asia/1a2d283d-c294-4e4e-ac1b-8987e610e525.png)
Ở đây chọn tên function cần thực thi để chạy hàng ngày
![](https://images.viblo.asia/9aa3d562-005e-447f-91e1-fb6057e731bc.png)



-----
Vậy là các bạn đã hiểu về cách hoạt động của Bot rồi nhỉ :)).

Tùy vào sự sáng tạo mà có thể viết được Bot có chức năng khác nhau, ở đây mình có viết thêm chức năng báo thời tiết nữa.

-----

Và đây là thành quả
![](https://images.viblo.asia/6f1ad47c-8cde-44e9-bdf5-c39c5d018205.gif)

![](https://images.viblo.asia/156ee0d2-7def-4eec-9ec4-10cb90b37671.jpg)

![](https://images.viblo.asia/479eeebe-92ca-4fcc-ac72-c4e14d48dce4.jpg)


-----

Bài viết của mình đến đây là kết thúc hy vọng sẽ giúp ích và mang lại niềm vui cho mọi người.
Tuy nhiên khi viết xong bài này khái niệm về ChatBot của mình có vẻ như đang bị lẫn lộn :joy::joy:, bởi vì ChatBot có thể reply message tự động khi mà nhận được message đến, hiện tại thì Bot của mình chưa làm được điều đó, thực chất nó chỉ là một Function có chức năng đẩy message trong một khoảng thời gian thôi.

Vậy bạn hiểu khái niệm ChatBot là như thế nào, nếu mình đang hiểu sai thì comment cho mình biết nhé :disappointed::disappointed:


-----