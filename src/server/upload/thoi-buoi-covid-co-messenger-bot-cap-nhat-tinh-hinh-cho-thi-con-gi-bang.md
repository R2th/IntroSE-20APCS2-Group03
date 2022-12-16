Xin chào các bạn, mình là Nam. Hôm nay mình sẽ hướng dẫn các bạn tạo một con Bot gửi tin nhắn trên Messenger để cập nhật tình hình covid ngoài kia. Bài viết gồm 4 bước, tuy hơi dài chút nhưng chỉ dài thôi chứ không khó để tạo ra một con Bot. Trong bài viết mình chỉ giữ lại một số bước chính còn một số thành phần phụ mình sẽ để trong [Github](https://github.com/namduong3699/nodejs-messenger-bot). Bắt đầu thôiii

# 1. Tạo page và app trên facebook 
Việc đầu tiên cần làm là tạo một page trên Facebook, việc này thực hiện thì khá là nhanh và đơn giản. Đầu tiên ở trang chính của Facebook, các bạn nhìn sang menu phía bên tay trái click vào nút **Trang** và nhấn vào phần **Tạo Trang mới**. Trong phần này bạn chọn hạng mục gì cũng được, đây là ví dụ của mình:
![](https://images.viblo.asia/95c2d96f-021c-4bfb-a2bf-6f5427488ed2.png)

Tiếp theo là thêm nút gửi tin nhắn cho trang, để sau này muốn nhắn tin với bot mình chỉ cần click vào nó thôi. Bạn chọn như dưới đây rồi thêm nút gửi tin nhắn nhé.
![](https://images.viblo.asia/2953683a-5882-4f86-a3e0-edc84389206f.png)

Page đã có, giờ chúng ta sẽ tạo ứng dụng gửi tin nhắn cho bot, các bạn truy cập vào [https://developers.facebook.com/apps](https://developers.facebook.com/apps)  chọn *Tạo ứng dụng* và chọn loại ứng dụng là *Kinh doanh* nhé (cái này mình cũng không rõ cho lắm nhưng thấy có mục Messenger thì chọn thôi). Tiếp theo nhập tên hiển thị của app, email và chọn *Tạo ứng dụng*

![](https://images.viblo.asia/9b2d028f-5d16-4267-b2ed-f4a6361bb968.png)

Sau khi ứng dụng được tạo xong chúng ta sẽ được chuyển sang trang thêm các tiện ích của Facebook vào ứng dụng, bạn nhớ thêm phần *Messenger* cho chức năng gửi tin nhắn nhé.

![](https://images.viblo.asia/4fd9439c-7163-44c8-8618-b79f8e98bc80.png)

Để Bot có thể đọc và gửi tin nhắn qua Facebook thì chúng ta cần phải tạo một mã truy cập cho nó, bạn nhấn vào nút như hình dưới đây nhé:
![](https://images.viblo.asia/d9f81073-1c5c-439d-859b-32b5ffb01bbc.png)

Sau khi đã có mã, hãy cất nó sang một bên giờ chưa phải lúc dùng đến nó.

# 2. Viết code để xử lý
Tiếp theo là chúng ta sẽ phải xử lý phần gửi tin nhắn phía bên Node, để làm điều đó việc đầu tiên là chúng ta cần phải cài Nodejs. 
```markdown
sudo apt install nodejs
node -v hoặc node –version
```
Tiếp theo là cài `npm`:
```shell
sudo apt install npm
npm -v hoặc npm –version
```
Sau khi đã cài xong, khởi tạo node project bằng lệnh: 
```php
npm init
```
Đợi nó chạy xong, đến phần nhập thông tin nó yêu cầu bạn không cần nhập gì cả cứ để mặc định rồi nhấn enter, đến bước cuối cũng nhấn enter. Đây là ví dụ của mình:
![](https://images.viblo.asia/d9c859db-7bc3-4da3-8b2d-efc445b2c9c8.png)

Ở đây, chúng ta cần cài 4 modules **body-parser, express, morgan, request** cho project, để cài đặt bạn gõ lần lượt từng lệnh sau:
```shell
$ npm install express
$ npm install body-parser
$ npm install morgan
$ npm install request
```

Việc tiếp theo chúng ta sẽ phải đi tìm api để lấy thông tin về cho con bot. Khi mình vào trang VnExpress để cập nhật thông tin dịch bệnh thì mình có để ý thấy bên họ có gọi api để vẽ mấy cái biểu đồ, thử click vào thì thấy có thông tin về tình hình dịch bệnh của ngày hôm nay trên tất cả các tỉnh (ngon). Dữ liệu trả về có dạng như sau:
```scala
"CODE","KEY","TỈNH THÀNH","NHIỄM","NHIỄM HÔM NAY","KHỎI","TỬ VONG","TỔNG","ENGLISH","DÂN SỐ (người)","DIỆN TÍCH (km2)","MÀU","SỐ NGÀY KHÔNG CÓ CA NHIỄM MỚI","NHIỄM HÔM NAY NHẬP CẢNH","","Color","Min","Max","Hex","","","","","","",""
"51","vn-331","Đồng Nai","1","","","","1","Dong Nai","3.097.107","5.906","1","15","","","1","1","50","FFC4AA","","","","","","",""
"32","31","Hải Phòng","2","","","","2","Hai Phong","1.837.173","1.562","1","2","","","2","51","100","FF8A66","","","","","","",""
"54","40","Nghệ An","1","","","","1","Nghe An","3.327.791","16.494","1","13","","","3","101","200","FF392B","","","","","","",""
...
```
Dữ liệu trả về có dạng của **csv**, với dòng đầu là các *key*, các dòng dưới lần lượt là thông tin của từng tỉnh thành. Chúng ta cần phải sửa lại đôi chút để chuyển dữ liệu về dạng **json** để có thể sử dụng được, đồng thời cũng bỏ đi phần dấu nháy kép:
```perl
var lines = csv.split('\n');
    var result = [];
    var headers;
    lines[0] = lines[0].replace(/["']/g, "");
    headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        lines[i] = lines[i].replace(/["']/g, "");

        if(lines[i] == undefined || lines[i].trim() == "") {
            continue;
        }

        var words = lines[i].split(",");
        for(var j = 0; j < words.length; j++) {
            obj[headers[j]] = words[j];
        }

        result.push(obj);
    }

    return result;
```
Dữ liệu lấy được sẽ có dạng như sau:
```javascript
[
    {
        "CODE": "51",
        "KEY": "vn-331",
        "TỈNH THÀNH": "Đồng Nai",
        "NHIỄM": "1",
        "NHIỄM HÔM NAY": "",
        "KHỎI": "",
        "TỬ VONG": "",
        "TỔNG": "1",
        "ENGLISH": "Dong Nai",
        "DÂN SỐ (người)": "3.097.107",
        "DIỆN TÍCH (km2)": "5.906",
        "MÀU": "1",
        "SỐ NGÀY KHÔNG CÓ CA NHIỄM MỚI": "15",
        "NHIỄM HÔM NAY NHẬP CẢNH": "",
        "Color": "1",
        "Min": "1",
        "Max": "50",
        "Hex": "FFC4AA"
         "": "",
    },
    ...
]
```

Tiếp theo là phần gửi thông tin tới REST API để Bot có thể tự trả lời:
```javascript
function sendMessage(senderId, message) {
    request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: "điền access token của bạn vào đây",
            },
            method: 'POST',
            json: {
                recipient: {
                    id: senderId
                },
                message: {
                    text: message
                },
            }
        });
    }
 Ư
```

Bây giờ quay lại cái mã truy cập chúng mình mới tạo phía trên rồi điền nó vào phần access_token. Như vậy, Bot có thể gửi tin nhắn đến cho user khác bằng cách gọi API trên với `recipient` là thông tin của người gửi, `message` là nội dung tin nhắn gửi đi. Sau này mình sẽ sử dụng đoạn này để Bot có thể gửi tin nhắn trả lời.

Zìa zia, vậy là đi được nửa chặng đường rồi. Tiếp theo chúng ta sẽ viết một chú webhook nho nhỏ để bắt sự kiện khi có người nhắn tin đến bot.

```javascript
app.get('/webhook', function(req, res) {
    if (req.query['hub.verify_token'] === 'verify_token') { // Chỗ này note lại tí điền ở mục FB webhook nhé :D
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
});

app.post('/webhook', async function(req, res) {
    var entries = req.body.entry;
    for (var entry of entries) {
        var messaging = entry.messaging;
        for (var message of messaging) {
            var senderId = message.sender.id;
            if (message.message) { // Nếu người dùng gửi tin nhắn đến
                if (message.message.text) {
                    var text = message.message.text.trim();

                    if(text.startsWith('Thông tin ')) {
                        const city = text.replace('Thông tin ', '');

                        sendMessage(senderId, await getCovidInfo(city));
                    } else if(text == 'hi' || text == "hello") {
                        sendMessage(senderId, 'Xin Chào');
                    } else{
                        sendMessage(senderId, 'Xin lỗi, câu hỏi của bạn chưa có trong hệ thống, chúng tôi sẽ cập nhật sớm nhất.');
                    }
                }
            }
        }
    }
    res.status(200).send("OK");
});
```
Ở trên, mỗi khi user gửi tin nhắn cho Bot, nội dung của tin nhắn sẽ được chuyển thành một đoạn *string* và dựa vào đó chúng ta có thể chọn các câu trả lời phù hợp. Để gửi tin nhắn lại cho *user* chúng ta sẽ dùng hàm `sendMessage` ở phía trên. Mình đang cho người dùng tìm kiếm thông tin theo tỉnh thành bằng cú pháp: 
```markdown
Thông tin [tên tỉnh thành] (cho tỉnh thành cố định)
Thông tin covid (cho thông tin của cả nước - ở trên mình không bắt chữ 'covid' nhưng cứ cho là vậy đi :D)
```

Full code của mình trên [Github](https://github.com/namduong3699/nodejs-messenger-bot).

# 3. Deploy ứng dụng lên Heroku
Code xong xuôi rồi bây giờ đến lúc deploy code lên Heroku thôi nào. Các bạn truy cập vào [trang chủ Heroku](https://www.heroku.com/free) rồi tự tạo cho mình một account free mới nhé, cái này thì đơn giản thôi =))

Sau khi đã đăng ký đăng nhập các thứ xong, chúng ta sẽ cài Heroku CLI vào máy theo [hướng dẫn](https://devcenter.heroku.com/articles/heroku-cli) sau, hoặc nếu bạn đang dùng *Ubuntu*  thì có thể cài luôn bằng câu lệnh:
```objectivec
$ sudo snap install --classic heroku
```

Quay lại trang chủ của Heroku, chọn **Create New App** để tạo một app mới, nhập tên app (cái này sẽ là subdomain đấy nha. vd: namdu-messenger-bot.herokuapp.com) chọn khu vực rồi nhấn **Create App**.
![](https://images.viblo.asia/cd851bbd-d94a-4793-b20f-8f09aa3e05dd.png)

Sau khi đã tạo xong App, các bạn nhấp vào nó và vào mục **Deploy** rồi làm theo hướng dẫn của Heroku để có thể push code lên server.
![](https://images.viblo.asia/8003b488-ca59-46e2-9921-a629e14076c4.png)

Hoặc nếu bạn đã có code trên Github thì chỉ cần connect đến nó rồi bên Heroku sẽ tự deploy cho mình.

![](https://images.viblo.asia/8752603a-5bab-49e0-8a1a-ced10373986c.png)

Như vậy là đã đíp loi xong với tên miền được lấy từ tên app. Heroku có một nhược điểm là do chúng mình dùng chùa nên sau một khoảng thời gian không truy cập vào app, lần truy cập tiếp theo sẽ mất một khoảng thời gian để app load lại (tầm 5-10s gì đó) nhưng kể ra có đồ để dùng chùa đã là (ngon) rồi hê hê.

# 4. Cài đặt webhook cho Facebook
Bước cuối cùng rồi đây, chúng ta sẽ quay lại config webhook bên Facebook. Các bạn quay trở lại trang Setting App Facebook ban nãy, kéo xuống phần *Webhook* và chọn **thiết lập webhook** giống ban nãy lúc cài *Messenger* nhé.

Tiếp đó vào cài đặt phần *Messenger*, kéo xuống phần *Webhook* rồi điền URL là cái mình vừa deploy bên phía Heroku í (https://namdu-messenger-bot.herokuapp.com/webhook), *mã xác minh* là cái mã mình để ở trên phía phần 3 đoạn này nè:
```python
...
if (req.query['hub.verify_token'] === 'verify_token')
...
```
Điền xong rồi tích hết mấy ô bên dưới nhé:
![](https://images.viblo.asia/52930155-452f-45b2-a512-2d8c7442cf81.png)

Sau khi đã xong các bước trên, đây sẽ là thành quả cuối cùng :D
![](https://images.viblo.asia/f5f5bfd3-a4bb-4378-8535-27629411a043.png)

**Link Github:** https://github.com/namduong3699/nodejs-messenger-bot

**Link con Bot:** https://www.facebook.com/profile.php?id=100068059940661

**UPDATE**: để mà Bot có thể nhắn tin với người khác, bạn cần phải gửi xét duyệt cho Facebook và yêu cầu quyền **page_messaging** nếu không thì Bot nó chỉ nhắn tin được với mỗi bạn thôi đó ^^

![](https://images.viblo.asia/884da225-95a1-40cc-a21d-523baeb32e76.png)

**UPDATE 2**: có vẻ api mình lấy data tèo rồi thì phải :|


Trên đây mình chỉ hướng dẫn làm một con Bot gửi tin nhắn đơn giản, dựa vào đây các bạn có thể tùy biến thêm các chức năng khác như cập nhật thời tiết, giá xăng, giá coin, ... miễn là các bạn kiếm cho mình được api ngon nghẻ. 

Ngoài kia tình hình dịch bệnh đang còn khá phức tạp, trong thời gian này bạn nên hạn chế ra ngoài và tuân thủ nguyên tắc 5K của bộ Y Tế để bảo vệ sức khỏe cho mình và người thân nhé. Mình tin rằng VN sẽ dập dịch sớm thôi chứ dăm bar thứ covid không chọi lại được so với tinh thần chống dịch của nước mình đâu.

Nếu có gì thắc mắc bạn có thể comment lại phía dưới bài viết mình sẽ rep lại nhanh hơn tốc độ nyc rep bạn luôn. Còn nếu các bạn thấy bài viết của mình có ích thì mình xin 1 vote để lấy động lực tiếp nhé. 

Cảm ơn đã đọc đến đây ^^.

# Tham khảo
https://trungquandev.com/huong-dan-build-mot-con-facebook-messenger-bot-bang-nodejs-va-deploy-len-heroku/
https://www.tunglt.com/2018/11/bo-dau-tieng-viet-javascript-es6/