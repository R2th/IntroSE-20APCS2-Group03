Chắc hẳn mỗi developer dù là người mới cho đến lão làng đều biết hoặc đã từng làm qua về tính năng liên quan đến gửi mail đúng không ạ? Và đã từng phải mất rất nhiều thời gian để test, fix bug, improve, template, ... Nhưng sẽ có số ít developer họ chỉ để ý đến là trong danh sách chức năng của ứng dụng thì có 1 chức năng cho phép gửi mail và sẽ cần các thao tác nhất định để có thể gửi mail thành công. Vậy thì hôm nay sao chúng ta không thử làm quen với việc đó và build 1 ứng dụng web nho nhỏ chỉ dùng cho việc test mail (với template HTML) của riêng chúng ta nhỉ? Hãy cùng bắt đầu nào!
# I. Nodemailer.
Việc đầu tiên cần làm là tìm 1 supporter giúp chúng ta trong tác vụ gửi mail. Ở đây thì mình sẽ dùng [Nodemailer](https://nodemailer.com/about/), một module dùng cho ứng dụng Node.js. Và nó cũng được dùng khá phổ biến hiện nay.

Một số tính năng của Nodemailer có thể được đề cập như dưới:
- Một module đơn lẻ không có một phụ thuộc nào cả.
- Tập trung vào vấn đề bảo mật (tránh những lỗi bảo mật như [RCE vulnerabilities](https://thehackernews.com/2017/01/phpmailer-swiftmailer-zendmail.html))
- Sử dụng nội dung HTML để gửi mail thay thế cho văn bản thuần tuý.
- Cho phép thêm những file đính kém. Và những file đính kém này có thể dùng trong nội dung HTML.
- Cho phép sử dụng những tài khoản được generate tự động từ [Ethereal.email](https://ethereal.email/)
- ...

Và còn nhiều tính năng khác nữa. Nhưng hôm nay với mục đích ban đầu thì ứng dụng nhỏ này sẽ chỉ áp dụng một số tính năng vào thôi. Tiếp đến hãy cùng step by step tạo ứng dụng này nào!
# II. Tạo một web app nhỏ dùng để test template mail.
Đầu tiên thì chúng ta sẽ có nhưng bước như dưới để hoàn thành ứng dụng này:
- Tạo một giao diện chúng ta có thể input những thông tin cần thiết để gửi mail (ở đây đơn giản mình chỉ tạo 1 ứng dụng ReactJS nhỏ focus vào việc gửi cho email nào và gửi với nội dung HTML là gì?).
- Đã có giao diện rồi thì chúng ta cần 1 server để gửi mail với những thông tin chúng ta đã input thông qua giao diện.
- Cuối cùng là ghép 2 phần trên lại với nhau và chúng ta sẽ test thử xem ứng dụng của chúng ta có hoạt động và email có được gửi đi hay không nhé?

## 1. Tạo giao diện gửi mail với ReactJS.
Để bắt đầu thì chúng ta sẽ khởi dựng 1 ứng dụng bằng ReactJS. Ở đây thì chúng ta có thể lựa chọn https://create-react-app.dev/ hoặc các cách khác để tạo 1 base cơ bản dùng ReactJS.

Về phần giao diện thì mình có sử dụng [react-bootstrap](https://react-bootstrap.github.io/)
```javascript
function TestMailPage({ isLoading, error, sendMail }) {
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);

  const handleTextChange = ({ target }) => setEmail(target.value || '');
  const handleFileChange = ({ target }) => setFile(target.files[0] || '');

  const handleSendMail = event => {
    event.preventDefault(); // chặn phần xử lý submit form mặc định

    if (!isLoading) sendMail({ email, file });
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col xs={10} md={8} lg={6}>
          <Form onSubmit={handleSendMail}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <FormControl
                type="text"
                name="email"
                placeholder="Please enter email"
                className="mr-sm-2"
                value={email}
                onChange={handleTextChange}
                isInvalid={!!error.email}
              />
              <Form.Control.Feedback type="invalid">
                {error.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-5">
              <Form.File
                className="position-relative"
                label="Please choose html file (<10kb)"
                onChange={handleFileChange}
                isInvalid={!!error.file}
                feedback={error.file}
                feedbackTooltip
              />
              <Form.Control.Feedback type="invalid">
                {error.file}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              type="submit"
              variant="outline-success"
              className="mr-2"
              disabled={isLoading}
            >
              {isLoading && 'Sending...'}
              {!isLoading && 'Send'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
```
Ở đoạn code trên thì mình sẽ khai báo 2 input:
- Input email - Dùng để nhập mail muốn gửi đến.
- Input HTML file - Dùng để nhập file HTML để gửi.

Đồng thời cũng khai báo 2 state là email, file để chứa dữ liệu. Đi cùng với đó là 2 handler dùng để handle thao tác input của người dùng. Và cuối cùng là một function dùng để submit những input của chúng ta lên.

```javascript
const VALID_DOMAIN = '@abc.com';
const VALID_FILE_FORMAT = ['text/html'];
const VALID_FILE_SIZE = 10 * 1024; // 10KB

const SEND_MAIL_VALIDATION_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .required('A email is required')
    .max(100)
    .email()
    .test(
      'validDomain',
      `Invalid domain (Pls fill email with domain ${VALID_DOMAIN})`,
      value => value && value.toLowerCase().endsWith(VALID_DOMAIN),
    ),
  file: yup
    .mixed()
    .required('A file is required')
    .test(
      'fileFormat',
      'HTML only',
      value => value && VALID_FILE_FORMAT.includes(value.type),
    )
    .test(
      'fileSize',
      'File too large',
      value => value && value.size <= VALID_FILE_SIZE,
    ),
});
```
Khi có được input rồi thì chúng ta sẽ validate một chút để dữ liệu của chúng ta được trọn vẹn nhất khi đưa lên server. Ở đây thì mình sẽ dùng [yup](https://github.com/jquense/yup). Mình sẽ validate một số lỗi cơ bản như là required email, format email, email phải đúng định dạng của chúng ta (ví dụ là 1 domain của công ty các bạn để tránh case lack email gây incident không mong muốn), đối với file thì sẽ validate required file, file type phải là định dạng HTML và file size phải nhỏ hơn 10KB.

```javascript
// export
import axios from 'axios';

export default function request(url, options) {
  return axios.request({ url, ...options }).then(response => response.data);
}

// import and invoke
const formData = new FormData();
formData.append('to', data.email);
formData.append('file', data.file);
const result = request('http://localhost:9009/sendmail', {
  method: 'post',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  data: formData,
});
```
Khi đã validate xong hết và những input của chúng ta đã sẵn sàng thì hãy gửi nó lên server nào. Ở đây thì mình sẽ dùng [axios](https://github.com/axios/axios) để giao tiếp với server. Và để đưa input định dạng file lên server thì chúng ta sẽ cần khởi tạo một đối tượng [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) để đưa vào request của chúng ta.

Tiếp đến chúng ta sẽ qua phần khởi tạo server để send mail nào!
## 2. Tạo server dùng để gửi mail.
```javascript
// .env
AUTH_USER=testmail1@gmail.com // ở đây chúng ta sẽ dùng service của gmail
AUTH_PASS=yourpass
TEST_SUBJECT=yoursubject
```
```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const { minify } = require('html-minifier');

const upload = multer();

const app = express();

app.use(cors());

app.post('/sendmail', upload.single('file'), (req, res) => { // handle route sendmail
  const { to } = req.body;
  const html = req.file.buffer.toString(); // convert buffer to string

  const minifiedHtml = minify(html, { // minify html file
    removeComments: true,
    removeCommentsFromCDATA: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeOptionalTags: true,
    removeEmptyElements: true,
  });

  // get infor from config .env
  const user = process.env.AUTH_USER;
  const pass = process.env.AUTH_PASS;
  const subject = process.env.TEST_SUBJECT;

  // create transport
  const transport = nodemailer.createTransport({
    service: 'gmail', // Chúng ta sẽ dùng service của gmail
    auth: { user, pass },
  });

  // create mail option
  const mailOptions = {
    to,
    subject,
    html: minifiedHtml,
  };

  // perform send mail
  transport.sendMail(mailOptions, function callback(error) {
    if (error) {
      console.log(error);
      res.status(500).send({
        message: 'Something went wrong!! Please try again and contact to me!!',
      });
    } else {
      console.log('Send mail successfully!');
      res.status(200).send({
        message: 'Send mail successfully!',
      });
    }
  });
});

app.listen(9009, () => console.log('Send mail app listening on port 9009!'));

```
Ở phần server thì mình sẽ dùng [expressjs](https://expressjs.com/) và server này sẽ làm các công việc sau:
- Cho phép dọc config bằng cách sử dụng [dotenv](https://github.com/motdotla/dotenv) (chúng ta sẽ tạo 1 file .env để chưa các thông tin user, pass).
- Tiếp đến là phần xử lý handle route `sendmail` để handle request send mail từ giao diện (ở đây vì ở giao diện đang request đến server 1 domain khác vì thế chúng ta cần cài đặt cho phép CORS ở đây bằng [cors](https://github.com/expressjs/cors))
- Tiếp đến là xử lý khi server handle được request `sendmail`. Chúng ta sẽ dùng [multer](https://github.com/expressjs/multer) để dễ dàng xử lý với FormData (chủ yếu để handle file khi upload lên).
- Cuối cùng là lấy thông tin input,  minify html và thực hiện send mail với `Nodemailer`.

Và không lan man nữa hay đến với kết quả ngay bây giờ nào!

## 3. Test gửi mail.
Chúng ta sẽ gửi thử 1 template như dưới:

![](https://images.viblo.asia/e89a76e4-4d2e-4714-a977-442520db0c7f.png)

Và ở giao diện gửi mail:

![](https://images.viblo.asia/0406666f-43bd-4a07-a333-ac26ee76d70b.png)

Kết quả cuối là đây:

![](https://images.viblo.asia/1bc898cf-0e6b-42e6-9e83-ed5b6b5049c4.png)

Tuyệt vời! Thế là template mail của chúng ta đã hoạt động rồi.

# III. Kết luận.
Vậy là chúng ta đã hoàn thành mục đích ban đầu là tạo 1 ứng dụng nhỏ cho phép gửi mail, test mail template bằng `Nodemailer`. Rất đơn giản và dễ dàng đúng không nào! Giờ thì chúng ta có thể test mail bất cứ lúc nào và cũng có thể tuỳ thích chỉnh sửa ứng dụng nhỏ này (có thể là làm đẹp hơn, bổ xung thêm tính năng mới) theo ý của mình. Thì bài viết của mình đến đây là hết rồi, mong rằng bài viết này sẽ mạng lại lợi ích dù lơn hay nhỏ cho các bạn. Xin cảm ơn và hẹn gặp lại trong các bài viết kế tiếp. :wave: