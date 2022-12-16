# AWS SES
## AWS SES là gì
Amazon Simple Email Service (SES) là dịch vụ email tiết kiệm chi phí, linh hoạt và có thể thay đổi quy mô, cho phép nhà phát triển gửi email từ bên trong ứng dụng bất kỳ. Bạn có thể nhanh chóng đặt cấu hình Amazon SES để hỗ trợ một số trường hợp sử dụng email bao gồm liên lạc qua email trên diện rộng, tiếp thị hoặc giao dịch. Các tùy chọn xác thực email và triển khai IP linh hoạt của Amazon SES giúp thúc đẩy khả năng gửi cao hơn và bảo vệ uy tín của người gửi, trong khi các phân tích gửi đo lường tác động của từng email. Với Amazon SES, bạn có thể gửi email một cách bảo mật trên toàn cầu ở quy mô lớn.
## AWS SES so với các dịch vụ khác
Ngoài AWS SES còn có nhiều dịch vụ mail khác để gửi và nhận mail cũng được biết đến nhiều như: Gmail SMTP Server, Mailgun, SendGrid, ... 

Đầu tiên mình xin nói qua về dịch vụ của Gmail thì Gmail được thiết kế cho gửi email các nhân thay vì gửi mail đồng loạt, Google thường cài đặt những giới hạn lên các tài khoản này nhằm mục đích phục vụ cho nhu cầu cá nhân hay doanh nghiệp để liên hệ là chính, xem qua giới hạn của Gmail SMTP Server.
![](https://images.viblo.asia/b87d34fc-f4c2-44cb-8929-119daecdbb49.png)

Nếu nhu cầu email số lượng lớn kèm theo sự đảm bảo email vào inbox tốt nhất có thể. Bạn cần một hệ thống ổn định và đủ mạnh để đảm bảo lệnh gửi email phải hoàn thành. Bạn cần email có tên miền doanh nghiệp mà không lệ thuộc Gsuite. Bạn cần gửi email nhiều nhất với chi phí thấp nhất có thể thì AWS SES có thể đáp ứng điều đó.

Nói qua về Mailgun thì đã bỏ gói miễn phí 10.000 email/tháng chuyển sang tập trung vào các gói trả phí. 

SendGrid có gói miễn phí với 100 email/ngày nhưng mình không nghĩ sẽ khi site phát triển sau này. Đến lúc đó bạn lại tốn thêm thời gian để tìm giải pháp mới.

AWS SES cũngMandrill tốn phí tuy nhiên giá của nó siêu rẻ không có đổi thủ $0.1/1000 email, với giá này thì tôi tin chắc bạn sẽ chọn gói trả phí ít nhưng cực kỳ ổn định và đáng tin cậy để gắn bó lâu dài thay vì miễn phí mà với nhiều hạn chế.

# Tạo tài khoản AWS SES

Mình nghĩ ai cũng nên có một tài khoản AWS vì trên này có rất nhiều dịch vụ rất đáng để dùng, bạn có thể đăng ký tài khoản [tại đây](https://portal.aws.amazon.com/billing/signup?refid=em_127222&redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start), và nên kích hoạt bảo mật 2 lớp 2FA cho chắc vì bảo mật luôn là ưu tiên hàng đầu.

Sau khi đã có tài khoản bạn bắt đầu tìm dịch vụ AWS SES tại [https://console.aws.amazon.com](https://console.aws.amazon.com). Bạn đánh tên `Simple Email Service` hoặc `SES` vào thanh tìm kiếm là ra.
![](https://images.viblo.asia/a0337d0e-b592-4e53-b12e-2d04caeacefa.png)

Lưu ý Amazon quy định region cho server rất cẩn thận và nghiêm ngặt, mỗi region sẽ ứng với tài khoản Amazon SES của bạn và subdomain tương ứng, mỗi lần chuyển region sẽ phải yêu cầu hỗ trợ để thoát SandBox (Chế độ chạy thử nghiệm sẽ hạn chế việc gửi mail của bạn). Hình bên dưới cho biết ở region US East (N. Virginia) bạn đang ở chế độ sandbox.

![](https://images.viblo.asia/c2cb7897-0eb2-49e2-ac26-7b2a251a2033.png)

Vì vậy, bạn nên xác định chính xác nhu cầu của mình để chọn region cho server chính xác. Nếu thị trường Việt Nam thì bạn nên chọn region Mumbai để tối ưu chi phí và tốc độ (tốc độ nhanh gấp 3 lần US East). Ngược lại, nếu thị trường toàn cầu thcredentialsì bạn chọn US East.
![](https://images.viblo.asia/e38b2fcb-13ad-41c4-b973-999f9e1cd695.png)

Để có thể gửi mail đi được Amazon SES yêu cầu bạn xác minh danh tính của mình (verify domain hoặc địa chỉ email mà bạn gửi email từ đó) để xác nhận rằng bạn sở hữu chúng và ngăn chặn việc sử dụng trái phép.

Để verify email address của bạn, Amazon đòi hỏi bạn đã có mailbox để nhận email xác nhận vì họ sẽ gửi một link xác nhận và bạn phải nhấp vào đó. Nghĩa là muốn tạo Amazon SMTP thì phải sẵn hộp mail doanh nghiệp để nhận email, chi tiết bạn có thể tham khảo [tại đây](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-email-addresses.html).

![](https://images.viblo.asia/c47dd0a9-ca4f-404b-8d02-2c3cd8e013ac.png)

Hoặc bạn có thể verify domain của mình chi tiết có thể xem [tại đây](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-domains.html).

![](https://images.viblo.asia/5d753a41-5e0f-4b51-880e-a14b46e80f90.png)

Lưu ý một chút khi bạn ở trong môi trường sandbox (chế độ chạy thử nghiệm sẽ hạn chế việc gửi mail của bạn) thì bạn chỉ có thể gởi qua lại trong các email mà bạn đã verify. Trường hợp bạn verify domain thì có thể gởi qua lại giữa các mail của domain đó ví dụ bạn verify domain *abc.com*, thì có thể gởi qua lại giữa các email *x1@abc.com*, *...@abc.com*.

Mục đích AWS chưa kích hoạt tài khoản cho bạn mà chỉ cho bạn chạy trên môi trường thử nghiệm là để kiểm soát các tài khoản spam, để thoát khỏi môi trường sanbox bạn phải gởi yêu cầu lên AWS để kích hoạt chị tiết [tại đây](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html).

# Gửi Email với Nodejs
Có 2 cách để gởi email dùng **Amazon SES API** hoặc **SMTP credentials**, nhiều bạn hay chọn **SMTP credentials** với tên đăng nhập và password vì nó quen thuộc, tuy nhiên mình tham khảo một số bài viết thì khi dùng với  **Amazon SES API** thì tốc độ gởi email sẽ nhanh hơn.

## Dùng SMTP credentials để gửi email

Đầu tiền bạn tạo một SMTP credentials, click vào `Create My SMTP Credentials` , điền `IAM User Name`, Create Credentials, sau đó Download Credentials đó về trong file csv download về sẽ có smtp username và password của bạn.
![](https://images.viblo.asia/3f802373-6884-42a5-aec6-61b2cafe728e.png)

Sau khi đã có username, password mình sẽ làm một đoạn code demo để gửi mail, đầu tiên là bước khởi tạo:

* Khởi tạo một file `app.js`.
* Tạo `package.json` bằng lệnh `yarn init` các bạn có thể dùng npm để quản lý các thư viện.
* Cài đặt thư viện **nodemailer** để gửi email: `yarn add nodemailer` hoặc  `npm i nodemailer`.
* Cài thư viện **dotenv** để đọc các biến môi trường từ file `.env`: `yarn add dotenv` hoặc `npm i dotenv`.
Sau khi khởi tạo cấu trúc thư mục như hình sau:

![](https://images.viblo.asia/352685eb-af75-44d9-82fe-7ac3b3ef39e0.png)

Tham khảo đoạn code sau trong `app.js` 

```js
require('dotenv').config();
const nodemailer = require('nodemailer');

// Đọc các biến môi trường 
// SES_AWS_SMTP_ENDPOINT, SES_AWS_SMTP_PORT, SES_AWS_SMTP_SENDER, SES_AWS_SMTP_USERNAME, SES_AWS_SMTP_PASSWORD
// từ file .env
// chú ý set các thông tin cho các biến trên trong file .env nha
const smtpEndpoint = process.env.SES_AWS_SMTP_ENDPOINT; // tên server mình sẽ chỉ cách lấy bên dưới
const port = process.env.SES_AWS_SMTP_PORT; // smtp port mình sẽ chỉ cách lấy bên dưới
const senderAddress = process.env.SES_AWS_SMTP_SENDER; // email dùng để gửi đi
const toAddresses = 'xxxxx@gmail.com'; // email người nhận
const smtpUsername = process.env.SES_AWS_SMTP_USERNAME; // smtp username mà bạn đã download ở trên 
const smtpPassword = process.env.SES_AWS_SMTP_PASSWORD; // smtp password mà bạn đã download ở trên 

async function main() {
  // khởi tạo một transporter để gởi mail
  const transporter = nodemailer.createTransport({
    host: smtpEndpoint,
    port: port,
    auth: {
      user: smtpUsername,
      pass: smtpPassword
    }
  });
  // mail option, có nhiều option khác như cc, bcc, ... bạn tham khảo link bên dưới nhé
  let mailOptions = {
    from: senderAddress,
    to: toAddresses,
    subject: 'Hello world',
    text: 'Hello world'
  };

  const info = await transporter.sendMail(mailOptions); // bắt đầu gởi mail

  console.log("Message sent! Message ID: ", info); // in kết quả gửi thành công
}

main().catch(console.error); // in lỗi nếu gặp lỗi trong quá trình xử lý
```

Với thông tin về Endpoint, và Port bạn có thể lấy tại *SMTP Settings* trên aws console.

![](https://images.viblo.asia/041e6cba-ab64-46a0-94f6-09c4b3066fb2.png)

Các mail options bạn có thể tham khảo [tại đây](https://nodemailer.com/message/) .

Thêm một lưu ý nữa là mail nhận và gửi nếu trong môi trường sanbox thì phải được verify như đã nói ở trên nha.

Cuối cùng chạy `node app.js` để xem kết quả thôi nào.

## Dùng Amazon SES API để gửi email

Để dùng dùng Amazon SES API để gởi mail bạn cần tạo một access key có quyền với aws ses, để tạo bạn sử dung service **Identity and Access Management (IAM)** của aws, service này rất hay để quản lý truy cập aws, trong phạm vi bài này mình chỉ làm những bước cơ bản để tạo được một access key có quyền với aws ses thôi nha, chi tiết về **IAM** bạn có thể tự tìm hiểu thêm.

![](https://images.viblo.asia/bc69547b-08b8-4373-834d-6a6e4209c36f.png)

Sau khi truy cập vào IAM mình tại *Access management* mình sẽ tạo một user với name là *aws-ses-user*:

![](https://images.viblo.asia/f7f21269-71bd-4288-b3c4-205e3c84b9e6.png)

![](https://images.viblo.asia/5b1949bf-48ca-4c3e-9a3e-3c20072a5740.png)

Sau đó click vào *Next: Permission* và chọn policy `AmazonSESFullAccess` như hình:

![](https://images.viblo.asia/7fa11e4d-8c2e-4f3f-9081-6021e18bdcdc.png)

Tiếp tục `Next: Tags` ở mục tags bạn có thể điền hoặc không, tiếp tục next và create user:

![](https://images.viblo.asia/99e75de9-3386-4891-99bc-a210c50578b6.png)

Cuối cùng bạn Download Security credentials về máy, thông tin về access key sẽ nằm trong đó.

![](https://images.viblo.asia/ae4d50c5-66c8-4fa6-b4dc-eebea97b187a.png)

Đến đây bạn đã có access key rồi, hãy thử đoạn code bên dưới để gửi mail với *Amazon SES API* nhé
```js
require('dotenv').config();

const AWS = require('aws-sdk'); // bạn cần add thư viện aws-sdk: yarn add aws-sdk

// Thông tin SES_AWS_ACCESS_KEY_ID, SES_AWS_SECRET_ACCESS_KEY nằm trong file credentials bạn đã download về ở trên nhé
const sesConfig = {
  accessKeyId: process.env.SES_AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.SES_AWS_SECRET_ACCESS_KEY,
  region: process.env.SES_REGION, // đây là region của server nó là vùng bạn đã chọn khi tạo ses nếu Mumbai là ap-south-1
  apiVersion: '2010-12-01', // version của api
}

const sesAws = new AWS.SES(sesConfig);

const params = {
  Destination: {
    ToAddresses: ['xxxxx@sun-asterisk.com'], // email người nhận
  },
  Source: process.env.SES_AWS_SMTP_SENDER, // email dùng để gửi đi
  Message: {
    Subject: {
      Data: 'Test SES AWS',
      Charset: 'UTF-8',
    },
    Body: {
      Text: {
        Data: 'Test SES AWS',
        Charset: 'UTF-8'
      }
    }
  },
}

const sendPromise = sesAws.sendEmail(params).promise();

sendPromise
  .then((data) => {
    console.log(data)
  })SMTP
  .catch((error) => {
    console.log(error)
  })

```
Một số thông tin khá giống với gởi mail bằng SMTP đã trình bày ở trên, với API thì có rất nhiều lựa chọn để gởi mail, bạn có thể tham khảo chi tiết [tại đây](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html).

Cuối cùng chạy `node app.js` để xem kết quả thôi nào.

# Tài liệu tham khảo
* [Sending email using the Amazon SES SMTP Interface](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/examples-send-using-smtp.html)
* [Sending Email Using Amazon SES](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html)