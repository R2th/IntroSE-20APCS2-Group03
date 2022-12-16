# Giới thiệu
Web và mobile app thường cần back-end để chạy một số tasks như: Gửi thông báo, chạy ngầm một số task nặng. Theo cách tiếp cận truyền thống, code back-end này được deploy lên server. Vậy điều gì xảy ra nếu một ngày nào số lượng request lên server tăng vọt? Hoặc bạn đang mất rất nhiều chi phí để duy trì một server có cấu hình mạnh nhưng hiện tại chưa cần đến mức năng lực xử lý đó?,... Lúc này, hãy tìm hiểu về Serverless
# Serverless
Serverless computing là một hình thức cung cấp các backend services dựa trên nhu cầu sử dụng của người dùng. Các server vẫn được sử dụng, tuy nhiên một khách hàng sử dụng các backend services từ nhà cung cấp Serverless sẽ chỉ phải thanh toán dựa trên mức độ sử dụng thay cho một con số cố định về bandwith hoặc số lượng server, vì vậy Serverless rất dễ dàng mở rộng thêm quy mô hoặc thu hẹp lại. 
Mặc dù với tên gọi là "Serverless" nhưng thực tế server vật lý vẫn được sử dụng nhưng developer không cần quan tâm đến vấn đề này vì những lý do ở trên :grinning:

![](https://images.viblo.asia/21dafd2a-e6f8-4762-9526-d48d49f8bf53.png)

Các bạn có thể tìm hiểu rõ hơn về Serverless tại [đây](https://www.cloudflare.com/learning/serverless/what-is-serverless/)
# Function as a service (FaaS)
FaaS là một dịch vụ backend của Serverless, cho khả năng viết hoặc cập nhật code một cách nhanh chóng, mà sau có đó có thể chạy để phản hồi lại một sự kiện nào đó. Điều này giúp chúng ta dễ dàng mở rộng về quy mô code cũng như tối ưu hóa về chi phí để triển khai microservices.

Giải thích theo một cách cụ thể hơn: Thay vì triển khai theo mô hình client-server, chúng ta cần thuê server và deploy lên trên đó, ở đây với FaaS, chúng ta deploy code dưới dạng các Function (Function as a Service) và các function này có thể gọi dưới dạng RestAPI.

![](https://images.viblo.asia/16c03be9-d325-4cc0-a616-b13f9dc6f55f.png)
## Ưu điểm là gì?
FaaS là một trong những dịch vụ của Serverless, vì thế FaaS cũng được thừa hưởng những ưu điểm từ Serverless, cụ thể là
### Cải thiện tốc độ phát triển
Với FaaS, Dev có thể dành nhiều thời gian để phát triển ứng dụng (logic, thiết kế, code) hơn là về server và deploy.
### Tích hợp khả nặng tự mở rộng
Vì FaaS có khả năng mở rộng, dev không cần phải lo lắng về việc tạo ra các server dự phòng khi có traffic lớn. Nhà cung cấp serverless sẽ lo cho bạn =))
### Chi phí hợp lý
Không giống như server truyền thống tính phí cố định theo số lượng server, hoặc theo thời gian, với FaaS chúng ta chỉ cần thanh toán dựa trên mức độ sử dụng của mình
## Nhược điểm
Đi kèm với n Ưu điểm thì cũng có khá nhiều nhược điểm, không cái gì là hoàn hảo cả phải không các bạn =))
1. HIệu năng thấp hơn vì mỗi request cần phải có thời gian để start
2. Phát triển ứng dụng ở Local khó khăn hơn
3. Tương tự như trong quá trình phát triển, vì code ở trên cloud rồi vì vậy debug cũng khó khăn hơn như khó tái tạo lại cấu hình, cần phải deploy liên tục trong quá trình debug cũng như fix bug

# Firebase Cloud Functions
Ở trên nói về lý thuyết khá nhiều rồi, mà lý thuyết thì mãi vẫn chỉ là lý thuyết nếu không có thực hành :sweat_smile:
Hiện nay có rất nhiều nhà cung cấp dịch vụ như [AWS Lambda](https://aws.amazon.com/lambda/), [Microsoft Azure](https://azure.microsoft.com/en-us/), Google Cloud Functions và Firebase Cloud Functions.
Mình sẽ dùng Firebase Cloud Functions để thử deploy một function :D

Firebase Cloud Functions là một sản phẩm của Google trong đó có thể track được các sự kiện liên quan đến Http, các sự kiện về thay đổi CSDL trong Firebase, hoặc Storage
## Khởi tạo project tại Local
Cài đặt Firebase CLI

```npm install -g firebase-tools```

Login

```firebase login```

Khởi tạo project lại local bằng cách

```
mkdir fcf-nodejs
cd fcf-nodejs
firebase init functions
```

Lúc này bạn sẽ được hỏi về project muốn sử dụng, có thể dùng project đã có sẵn hoặc tạo một project mới :D

![](https://images.viblo.asia/ba7dc76a-6d10-4a67-b301-80b8f61fc94f.png)

Sau đó là cài sẵn một số ```dependencies``` qua ```npm``` :D

![](https://images.viblo.asia/9d413228-7847-4279-af08-d974a23dec91.png)

Sau khi khởi tạo thành công, cấu trúc của Project sẽ là

![](https://images.viblo.asia/6ffee449-7ea4-42b3-9d35-1f147a073ab3.png)

1. firebase.json: Setting về firebase project
2. functions/package.json: Tương tự như các file package.json khác, chứ thông tin về project, dependencies,...
3. functions/index.js: Chúng ta sẽ implement logic cho function tại đây
4. functions/node_modules: Tương tự như node_modules bình thường :D

## Demo
Mình sẽ cài thêm ```express``` để sử dụng làm router.
Trong demo này mình sẽ sử dụng HTTP Trigger để bắt sự kiện khi có request đến

```javascript
const functions = require("firebase-functions")
const express = require('express')
const app = express()

app.get('/greeting', (request, response) => {
  response.send('Greeting from Firebase Google cloud')
})

const api = functions.https.onRequest(app)

module.exports = {
  api,
}
```

```functions.https.onRequest``` sẽ bắt được sự kiện khi có request đến, với router ```app.get('/greeting')```, callback được truyền vào function này sẽ được gọi và trả về string 'Greeting from Firebase Google cloud' qua ```response.send()```

Sau khi code xong chúng ta có thể deploy bằng cách
```firebase deploy --only functions```

Sau khi deploy Firebase CLI sẽ cung cấp URL của API các bạn nhé :D

Test thử endpoint bằng Postman
![](https://images.viblo.asia/f2ac0eea-1363-484d-9427-9c296455466a.png)
##  Những dịch vụ khác của Firebase
Ngoài Firebase cloud functions, Google còn cung cấp rất nhiều dịch khác xung quanh firebase như: Realtime DB, Firestore,...
vì vậy chúng ta có thể tạo đc RestAPI từ những dịch vụ này:
- Gửi thông báo theo event từ firebase (CRUD)
- Tạo API để thao tác với Firebase
- Tạo webhook để bắt sự kiện từ các bên thứ 3 như Github, Facebook, Facebook Messenger
- Theo dõi Realtime Database qua các sự kiện được trigger
- Tự động tạo ảnh thumbnails cho ảnh được upload vào Google Storage

...

### Kết
Bài viết này mình đã giới thiệu và demo một dịch vụ FaaS của Google, và cách deploy function lên Firebase Cloud Functions. Trong phần tiếp theo sẽ là tạo API thao tác với Firebase, Firestore,... Cảm ơn các bạn đã kiên nhẫn đọc đến hết dòng này, hẹn gặp các bạn vào phần tiếp theo =))