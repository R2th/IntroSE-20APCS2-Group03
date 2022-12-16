![](https://blog.pusher.com/wp-content/uploads/2018/09/nodejs-messenger-tutorial.png)

Trong hướng dẫn này, tôi sẽ mô tả cách bạn có thể xây dựng một chatbot Facebook Messenger kết hợp NLP (Natural Language Processing) với Dialogflow và triển khai nó lên Facebook. Bạn có thể tìm thấy toàn bộ source code của ứng dụng trên [GitHub](https://github.com/ayoisaiah/facebook-messenger-bot).

Nhiều chatbot tận dụng xử lý ngôn ngữ tự nhiên (NLP) để diễn giải ý định đầu vào của khách hàng, cho phép bot đưa ra phản hồi chính xác. Việc triển khai NLP trong bot của bạn có thể khá khó khăn, nhưng có một số nền tảng giúp việc này dễ dàng hơn nhiều.

Trong số các nền tảng này, Dialogflow (trước đây gọi là [Api.ai](http://api.ai/) ) và [Wit.ai](http://wit.ai/) là phổ biến nhất hiện nay. Cả hai đều cung cấp một số hàm NLP phân tích cú pháp đầu vào của người dùng và khớp chúng với phản hồi đúng mà không cần bất kỳ mã hóa nào.

Trước khi tiếp tục, bạn cần cài đặt npm và Node.js. Có thể không cần tới kinh nghiệm trước khi xây dựng chatbot, nhưng bạn cần có hiểu biết cơ bản về JavaScript để có thể hoàn thành hướng dẫn này

### Cài đặt webhook

Bước đầu tiên để tạo bot Messenger là tạo một máy chủ sẽ được cung cấp dưới dạng webhook khi thiết lập bot. Webhook cung cấp cốt lõi của trải nghiệm chatbot của bạn vì đó là cách bot của bạn được thông báo về các tương tác và sự kiện khác nhau xảy ra, bao gồm cả khi ai đó gửi tin nhắn.

Để bắt đầu, hãy tạo một thư mục mới cho bot chúng ta sẽ xây dựng. Gọi nó là `sample-bot`hoặc bất cứ điều gì bạn thích. Trong thư mục vừa tạo, chạy lệnh sau trong terminal để khởi tạo project.
```
   npm init
```

Tiếp theo, chúng ta sẽ cài đặt `Express` làm server web và `body-parser` để phân tích các request:
```
    npm install body-parser express
```
Sau khi cài đặt hoàn tất, hãy tạo `index.js` trong `src` và paste code sau đây để thiết lập `Express` trên port 5000. Bạn có thể chọn một cổng khác nếu 5000 đã được sử dụng trên máy của bạn.
```
    const express = require('express');
    const bodyParser = require('body-parser');

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.listen(5000, () => console.log('Express server is listening on port 5000'));
    
```
Save và chạy `node src/index.js` để khởi động máy chủ. 
Nếu code chính xác và các dependencies được cài đặt, bạn sẽ thấy thông báo sau được in ra trong terminal.

![](https://blog.pusher.com/wp-content/uploads/2018/07/fb-chatbot-server.png)


### Thiết lập Facebook verification endpoint

Khi thiết lập một webhook cho chatbot của bạn, Facebook yêu cầu một bước xác minh để đảm bảo rằng webhook là xác thực và hoạt động trước khi chấp nhận webhook. Đây là cách nó hoạt động:

1. Bạn sẽ tạo một mã thông báo đơn giản là một chuỗi ngẫu nhiên do bạn chọn và mã hóa nó vào webhook của bạn.
2. Bạn sẽ cung cấp mã thông báo này khi đăng ký webhook của bạn để nhận các sự kiện cho bot của bạn
3. Facebook gửi GETyêu cầu đến webhook của bạn bằng mã thông báo bạn đã cung cấp ở bước trước trong `hub.verify` tham số của yêu cầu.
4. Webhook của bạn sẽ xác minh rằng mã thông báo là chính xác và gửi phản hồi thích hợp trở lại Facebook.
5. Cuối cùng, Messenger sẽ đăng ký webhook vào bot.

Tạo một tệp được gọi `verify-webhook.js` trong thư mục `src` và paste vào đoạn code sau:
```
    const verifyWebhook = (req, res) => {
      let VERIFY_TOKEN = 'pusher-bot';

      let mode = req.query['hub.mode'];
      let token = req.query['hub.verify_token'];
      let challenge = req.query['hub.challenge'];

      if (mode && token === VERIFY_TOKEN) {
        res.status(200).send(challenge);
      } else {
          res.sendStatus(403);
        }
    };

    module.exports = verifyWebhook;
```
Lưu ý rằng token verify được đặt thành `pusher-bot` trong ví dụ này. Bạn có thể đặt nó thành bất cứ thứ gì bạn thích, nhưng hãy đảm bảo ghi chú lại vì bạn sẽ cần nó sau này khi thiết lập ứng dụng của bạn trên Facebook Messenger.

Tiếp theo, thiết lập điểm cuối sẽ nhận các sự kiện từ trình nhắn tin Facebook. Thêm mã sau vào index.jstệp của bạn :
```
    const verifyWebhook = require('./verify-webhook');

    app.get('/', verifyWebhook);
```
Bây giờ bạn cần dừng máy chủ của bạn với CTRL-Cvà khởi động lại nó một lần nữa với node `src/index.js`.

### Đưa máy chủ của bạn lên web

Máy chủ của bạn đang chạy trên localhost, điều đó có nghĩa là nó chỉ có thể truy cập được trên máy của bạn. Tuy nhiên, Facebook yêu cầu máy chủ của bạn phải có thể truy cập web. Hỗ trợ HTTPS cũng là một yêu cầu khó đối với mọi máy chủ webhook.

Chúng tôi có thể sử dụng ngrok để đưa máy chủ localhost của bạn ra internet, điều đó có nghĩa là bất kỳ ai cũng có thể truy cập nó ngay cả khi nó chạy cục bộ trên máy của bạn.

Bạn có thể truy cập https://ngrok.io/ để tìm hiểu cách cài đặt và thiết lập ngrok trên máy tính của bạn. 
Sau đó thiết lập HTTP với cổng 5000 để expose localhost với command

 ```
    ./ngrok http 5000
```
Nếu webhook của bạn đang listen trên một cổng khác, hãy đảm bảo cung cấp đúng cổng khi bắt đầu. Bạn sẽ được cung cấp một vài URL nhưng bạn chỉ cần một URL cuối cùng được bật HTTPS.

![](https://blog.pusher.com/wp-content/uploads/2018/07/fb-chatbot-ngrok.png)

### Thiết lập Facebook application

Để tạo Chatbot trên Messenger, bạn cần hai thứ: public Facebook page và Facebook application được kết nối tới pagecủa bạn.

Để tạo một page, hãy vào https://facebook.com/pages/create và điền vào các trường bắt buộc. Bạn có thể đặt tên page của bạn bất cứ điều gì bạn muốn. Trong trường hợp này, tên page của tôi là 'Sample Bot'. Khi bạn đã tạo page, hãy tiếp tục và tạo một ứng dụng cho bot của bạn tại https://developers.facebook.com/quickstarts.

![](https://blog.pusher.com/wp-content/uploads/2018/07/fb-chatbot-new-fb-app.png)

Sau khi hoàn thành, bạn sẽ được chuyển hướng đến bảng điều khiển của ứng dụng bạn vừa tạo. Tiếp theo, bạn cần thêm một sản phẩm vào ứng dụng của bạn. Cuộn xuống trang một chút và tìm Messenger option sau đó nhấp vào nút `Setup` . Điều này sẽ chuyển hướng bạn đến Messenger Platform.

Khi đó, hãy xác định phần 'Token Generation' và kết nối ứng dụng của bạn với page Facebook. Điều này sẽ tạo Page Access tokenmà chúng ta sẽ sử dụng sau này.

![](https://blog.pusher.com/wp-content/uploads/2018/07/fb-chatbot-page-token.png)


Tiếp theo, đi đến phần **Webhooks** và nhấp vào **Cài đặt Webhooks**. Một popup sẽ xuất hiện và bạn cần phải điền một số thông tin.

Trong trường **Callback URL**, bạn nên nhập URL endpoint đã được cung cấp bởi ngrok. Thêm token mà bạn đã tạo trong `verify-webhook.js`, sau đó tick chọn `messages` và `messaging_postbacks`.

![](https://blog.pusher.com/wp-content/uploads/2018/07/fb-chatbot-page-sub.png)

Nhấn **Verify and Save** . Điều này sẽ xác minh rằng token được cung cấp khớp với token của bạn và lưu webhook. Tiếp theo, bạn cần subscribe page của mình để nhận các event webhook.
![](https://blog.pusher.com/wp-content/uploads/2018/07/fb-chatbot-webhooks.png)


### Cài đặt tích hợp Dialogflow

Truy cập trang web của Dialogflow(https://dialogflow.com/) và đăng ký một tài khoản miễn phí.

Nhấp vào nút Create Agent. Đặt tên cho Agent và điền vào các trường còn lại, sau đó nhấn nút **CREATE** . Hộp thoại sẽ chuyển hướng bạn đến trang chính của agent.

![](https://blog.pusher.com/wp-content/uploads/2018/07/fb-chatbot-new-dialogflow-806x300.png)

Dialogflow có một tính năng giúp bot của bạn có khả năng trò chuyện đơn giản với người dùng mà không cần viết bất kỳ dòng code nào. Trên sidebar, nhấp vào Small Talk và bật tùy chọn cho bot của bạn.

![](https://blog.pusher.com/wp-content/uploads/2018/07/fb-chatbot-small-talk-891x600.png)

Ở phía bên tay phải, bạn có một console nơi bạn có thể thử bot của mình. Nhập tin nhắn (chẳng hạn như "Hello") và nhấn Enter. Bạn sẽ thấy một phản ứng.
![](https://blog.pusher.com/wp-content/uploads/2018/07/fb-chatbot-small-talk-demo-331x600.png)

### Thiết lập authentication
Trước khi bạn có thể tích hợp Dialogflow với bot của mình, trước tiên bạn cần thiết lập authentication 
Để làm điều này, đi đến setting agent. Trong Google Project , nhấp vào tên tài khoản dịch vụ. Điều này sẽ mở trang tài khoản dịch vụ Google Cloud Platform.

![](https://blog.pusher.com/wp-content/uploads/2018/07/fb-chatbot-dialogflow-keys-1-1024x129.png)

Bạn sẽ thấy một tài khoản dịch vụ tích hợp Dialogflow trong danh sách các tài khoản. Nhấp vào menu ba chấm ở bên phải và chọn **Create Key**. Để lại định dạng tệp dưới dạng JSON và nhấp vào Create. Điều này sẽ tải một tệp JSON về máy tính của bạn.

![](https://blog.pusher.com/wp-content/uploads/2018/07/fb-chatbot-dialogflow-keys-2-1024x257.png)

Bạn có thể mở tệp JSON bằng trình soạn thảo văn bản yêu thích của mình. Bạn chỉ cần hai trong số các giá trị: `private_key`và `client_email`. Lưu trữ các giá trị này như các biến môi trường trước khi tiến hành.

Bạn có thể sử dụng gói `dotenv` để tải các biến môi trường từ tệp `.env` vào `process.env`.
```
    npm install --save dotenv
```
Và thêm dòng sau vào đầu index.js
```
    require('dotenv').config({ path: 'variables.env' });
```
Sau đó tạo một file `variables.env` trong thư mục gốc project. Bạn nên thêm file này vào file `.gitignore` để bạn không vô tình commit lên git.
```
    FACEBOOK_ACCESS_TOKEN=EAAghLzgZCMfEBAJntS...
    DIALOGFLOW_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n<KEY>\n-----END PRIVATE KEY-----\n"
    DIALOGFLOW_CLIENT_EMAIL=foo@<PROJECT_ID>.iam.gserviceaccount.com
```

Bước tiếp theo là sử dụng tính năng này trong bot messenger. Dialogflow cung cấp một SDK cho Node.js mà bạn có thể thêm vào project của mình bằng cách chạy command:
```
    npm install --save dialogflow
```
Ngoài ra, lấy `node-fetch` để chúng ta có thể send request tới Facebook API:
```
    npm install --save node-fetch
```
Tiếp theo, tạo một file `process-message.js` trong `src`và paste:
```
    const fetch = require('node-fetch');

    // You can find your project ID in your Dialogflow agent settings
    const projectId = ''; //https://dialogflow.com/docs/agents#settings
    const sessionId = '123456';
    const languageCode = 'en-US';

    const dialogflow = require('dialogflow');

    const config = {
      credentials: {
        private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
        client_email: process.env.DIALOGFLOW_CLIENT_EMAIL
      }
    };

    const sessionClient = new dialogflow.SessionsClient(config);

    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // Remember the Page Access Token you got from Facebook earlier?
    // Don't forget to add it to your `variables.env` file.
    const { FACEBOOK_ACCESS_TOKEN } = process.env;

    const sendTextMessage = (userId, text) => {
      return fetch(
        `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            messaging_type: 'RESPONSE',
            recipient: {
              id: userId,
            },
            message: {
              text,
            },
          }),
        }
      );
    }

    module.exports = (event) => {
      const userId = event.sender.id;
      const message = event.message.text;

      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: message,
            languageCode: languageCode,
          },
        },
      };

      sessionClient
        .detectIntent(request)
        .then(responses => {
          const result = responses[0].queryResult;
          return sendTextMessage(userId, result.fulfillmentText);
        })
        .catch(err => {
          console.error('ERROR:', err);
        });
    }
```
Lưu ý: lấy agent ID trong Dialogflow settings và nhập nó làm giá trị `projectId` ở trên.

![](https://blog.pusher.com/wp-content/uploads/2018/07/fb-chatbot-dialogflow-projectid-843x300.png)

Nếu bạn nhìn vào code`process-message.js`, bạn sẽ thấy rằng chúng ta đã chuyển text message từ Facebook Messenger sang Dialogflow. Sau đó, chúng ta có thể extract matching response từ Dialogflow và gửi lại kết quả cho Messenger.

Để nhận event message từ Facebook, bạn cần thêm các mục sau vào `index.js`:
```
    const messageWebhook = require('./message-webhook');

    app.post('/', messageWebhook);
```
Tạo file `message-webhook.js`và paste:
```
    const processMessage = require('./process-message');

    module.exports = (req, res) => {
      if (req.body.object === 'page') {
        req.body.entry.forEach(entry => {
          entry.messaging.forEach(event => {
            if (event.message && event.message.text) {
              processMessage(event);
            }
          });
        });

        res.status(200).end();
      }
    };
```

Bây giờ bạn có thể kiểm tra bot của bạn! Bạn có thể gửi những tin nhắn đơn giản như là "Whatup?", "How are you" và bạn sẽ nhận được trả lời từ bot. Những phản hồi này là từ tính năng Small Talk mà chúng ta đã bật ở trên.

![](https://blog.pusher.com/wp-content/uploads/2018/07/fb-chatbot-demo-338x600.jpeg)


Bây giờ bạn đã học cách tạo một chatbot Facebook Messenger kết hợp Xử lý ngôn ngữ tự nhiên (NLP) thật dễ dàng phải không? Chúng tôi đã trình bày một trường hợp sử dụng đơn giản cho NLP, nhưng bạn có thể thêm nhiều chức năng như bạn muốn với các thực thể và tích hợp tùy chỉnh.

Bài viết được lược dịch và sưu tầm: https://blog.pusher.com/facebook-chatbot-dialogflow/