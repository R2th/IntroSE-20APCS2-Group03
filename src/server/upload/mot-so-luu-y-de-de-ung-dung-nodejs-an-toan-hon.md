![](https://images.viblo.asia/553997ef-4d92-4e6d-bd22-0dcad786740c.png)

## 1. Chống DOS, DDOS hay brute-force mật khẩu

Chúng ta sẽ giới hạn số lượng request (trên 1 địa chỉ IP trong một khoảng thời gian nhất định) để đề phòng server Node của chúng ta lăn ra chết khi phải hứng chịu các cuộc tấn công từ chối dịch vụ (DOS, DDOS). Việc implement cũng không hề khó nhọc một chút nào với việc dùng cách package npm có sẵn.

```js
const express = require('express');
const rateLimit = require("express-rate-limit");
const app = express();
 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
 
app.use(limiter);
```

Ở ví dụ trên chúng ta chỉ cần cài đặt package `express-rate-limit"` và config cấu hình cho middleware để lọc các request. Ở trên chúng ta chỉ cho phép 1 địa chỉ IP request tối đa 100 lần trong vòng 15 phút. Nếu vượt quá giới hạn nói trên, server ngay lập tức sẽ trả về status code `429 TOO MANY REQUESTS`.

Chúng ta có thể cài đặt số lượng request tôi đa với mỗi `routes` là khác nhau.

```js
const express = require('express');
const rateLimit = require("express-rate-limit");
const app = express();
 
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

app.use("/api/", apiLimiter);
 
const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message: "Too many accounts created from this IP, please try again after an hour"
});

app.post("/create-account", createAccountLimiter, function(req, res) {

});
```

**Ngoài lề**: Trong giai đoạn development sản phầm của công ty, đang còn viết unit test (hơn 200 test case). Tôi đã láu cháu viết rateLimit vào và làm một đống test case fail lòi kèn :joy: . Đơn giản vì khi chạy unit test thì server cũng nhận hàng trăm request trong vài giây, dẫn đến việc server trả lại status 429. Chúng ta nên để code như dưới đây khi đang còn phát triển sản phẩm.

```js
if (proccess.env.NODE_ENV === 'production') {
    app.use(limiter);
}
```

## 2. Lọc dữ liệu người dùng gửi lên server

> Đừng bao giờ tin dữ liệu người dùng nhập vào, lọc dữ liệu ở phía client chỉ có tác dụng với người dùng thông thường. Chúng sẽ chẳng là gì với những hacker lão luyện, hay chỉ đơn là là một thằng script Script kiddie :stuck_out_tongue_winking_eye:

![](https://images.viblo.asia/2a017316-0989-4b28-8ef3-8231c5a1b8ad.png)

*Một trang web nào nó ngày xưa đã không lọc dữ liệu ở phía server, để người dùng có thể thay đổi email tùy ý (thậm chí là một email không hợp lệ) :sunglasses:*

Các lỗ hổng nổi tiếng và rất nguy hiểm khai thác sự hớ hênh trên không thể không kể đến XSS, SQL Injection, ...

### Sử dụng `helmet`

**Helmet** là một package npm, gồm 14 middleware nhỏ ở trong giúp xử lý, lọc các HTTP header độc hại (nhằm khai thác lỗ hổng XSS hay clickjacking, ...). 

```js
const express = require('express')
const helmet = require('helmet')
 
const app = express()
 
app.use(helmet())
```

![](https://images.viblo.asia/a893e3d1-cb43-4ff1-aeda-2e519c922973.png)


Các tùy chọn mặc định của **Helmet** khi sử dụng câu lệnh `app.use(helmet())`. Nếu muốn bạn có thể lựa thêm nhiều tùy chọn, chi tiết bạn có thể tham khảo ở [Github](https://github.com/helmetjs/helmet).

### Sử dụng `express-validator` để data gửi lên server

Giá trị dữ liệu mà người dùng submit form lên server hoàn toàn có thể là chuỗi rỗng, không đủ độ dài, hay chứa các đoạn mã nguy hiểm (ký tự đặc biệt, ..). 

```js
router.post(
  '/login',
  [
    body('username')
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body('password')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 6 })
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    // ....
  }
);
```

Ở ví dụ trên, `req.body.username` và `req.body.password` sẽ được kiểm tra xem có rổng hay không (password thì thêm điều kiện ít nhất 6 ký tự) cũng với đọc lại lọc, chuyển đổi các ký tự đặc biệt có thể ẩn tàng là 1 đoạn mã khai thác. Server sẽ trả về status code 422 nếu dữ liệu không thỏa mãn điều kiện.

Chúng ta cũng có thể dùng `check` thay vì `body`, hàm `check` sẽ kiểm tra không chỉ `req.body` mà còn tất cả các giá trị `req.cookies`, `req.headers`, `req.params` hay `req.query`.

Ngoài các hàm có sẵn, `express-validator` còn cho phép chúng ta có thể custom middleware để lọc dữ liệu.

```js
const { check } = require('express-validator');

app.post('/user', [
  check('email').custom(value => {
    return User.findByEmail(value).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    });
  }),
  check('password').custom((value, { req }) => {
    if (value !== req.body.passwordConfirmation) {
      throw new Error('Password confirmation is incorrect');
    }
  })
], (req, res) => {
  // Handle the request somehow
});
```

### Sử dụng thư viện ORD/ODM để chống SQL/NoSQL Injection

Ví dụ như Sequelize, Knex, mongoose, ... Tuyệt đối đừng dùng kiểu câu truy vấn bằng bằng chuỗi Javascript kiểu như, rất tù vì phải nối chuỗi JS mà lại không đảm bảo. Các thư viện họ có hàm gọi rất tiện lợi mà lại đảm bảo an toàn hơn.

```js
const tableOne = 'table_one';
const tableTwo = 'table_two';

let query = `
  SELECT a.year, a.season, b.display_name
  FROM ${tableOne} a, ${tableTwo} b
  WHERE a.id = b.transmitter AND season != 'other'
  GROUP BY a.year, a.season, b.display_name
  ORDER BY b.display_name, year;
  `;
```

## 3. Sử dụng https

Với http, dữ liệu từ các client gửi lên server hoàn toàn 'trong sáng' và có thể bị hacker bắt và đọc được toàn bộ. Các trình duyệt như Chrome, Firefox, ... cũng sẽ hiển cảnh báo khi truy cập vào các website sử dụng http. Với Https, dữ liệu truyền lên server sẽ được mã hóa và tránh khỏi sự dòm ngó từ kẻ xấu.

Để sử dụng https cho website một cách đơn giản, nhanh chóng. Chúng ta có thể sử dụng 2 dịch vụ rất phổ biến sau đây.
- **Cloudflare**: Là 1 dịch vụ bên thứ 3, người dùng sẽ truy cập qua Cloudflare về sau đó được điều hướng tới website của bạn. Chứng chỉ, mã hóa, vân vân, mây mây Cloudflare sẽ lo hết, bạn chỉ đơn giản là đăng ký 1 acccount Cloudflare miễn phí và config 1 số thông tin như địa chỉ IP, tên domain vào là xong. Chi tiết cách setup https bằng Cloudflare cho server của bạn có tại [đây](https://pushalert.co/blog/free-ssl-easy-setup-guide/). Vì là qua bên thứ 3 nên tốc độ truy cập có thể chậm hơn 1 chút.

![](https://images.viblo.asia/3b74b808-c09c-4466-9f68-dc64c25efb3f.png)

- **Let's encrypt**: Là dịch vụ cung cấp chứng chỉ TSL/SSL (HTTP + SSL/TSL = HTTPS) của tổ chức Internet Security Research Group (ISRG). Chúng ta có thể dùng tools [cerbot](https://certbot.eff.org/) để tạo chứng chỉ TSL/SSL cho website của mình. Điểm hạn chế là chứng chỉ được cấp chỉ có giá trị trong 90 ngày, sau 90 ngày thì chúng ta phải thực hiện việc gia hạn chứng chỉ.

## 4. Sử dụng biến môi trường

Tuyệt đối không đưa những biến quan trọng, bí mật như secret key, mật khẩu database, ... hiển thị ở trong mã nguồn. Hãy đưa các biến đó vào trong file `.env` (đưa file `.env` vào `.gitignore`). Sau đó lấy biến ra bằng lệnh `process.env.[tên_biến]`

```
# .env
AZURE_STORAGE_KEY='1qazxsw23edc`
```

```js
 const azure = require('azure');

 const apiKey = process.env.AZURE_STORAGE_KEY;
 const blobService = azure.createBlobService(apiKey);
```

## 5. Dùng [brcrypt](https://www.npmjs.com/package/bcrypt) hoặc [pbkdf2](https://www.npmjs.com/package/pbkdf2) để băm mật khẩu

Không nên sử dụng các hàm băm đã lỗi thời như SHA1, MD5, thư viên [Crypto](https://nodejs.org/api/crypto.html) mặc định của Node.JS hay cả những hàm băm khá 'hiện đại' như SHA-256 để băm mật khẩu. Vì các hàm băm nêu trên một là rất yếu, 2 là không phù hợp để dùng cho việc băm mật khẩu (Số Hash/giây cao). **Brcrypt và Pbkdf2** có chỉ số Hash/giây cao hơn đồng nghĩa với việc hacker muốn tấn công bằng phương pháp từ điển cầu vồng thì mất nhiều công sức, thời gian hơn so với việc sử dụng các hàm băm khác.

   ## 6. Giới hạn kích thước payload request gửi lên server
   
  Giới hạn kích thích payload từ phía client gửi lên server cũng là một cách nhằm ngăn chặn các cuộc tấn công DOS/DDOS (bắt server sử lý 1 lượng dữ liệu lớn thay vì gửi thật nhiều request).
   
   ```js
   const express = require('express');

const app = express();

app.use(express.json({ limit: '300kb' })); // body-parser defaults to a body size limit of 100kb

// Request with json body
app.post('/json', (req, res) => {

    // Check if request payload content-type matches json, because body-parser does not check for content types
    if (!req.is('json')) {
        return res.sendStatus(415); // -> Unsupported media type if request doesn't have JSON body
    }

    res.send('Hooray, it worked!');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
   ```

## Tài liệu tham khảo
- https://medium.com/@nodepractices/were-under-attack-23-node-js-security-best-practices-e33c146cb87d
- https://medium.com/@nodepractices/were-under-attack-23-node-js-security-best-practices-e33c146cb87d
- https://blog.codinghorror.com/speed-hashing/