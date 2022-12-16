Trong bài viết này, chúng ta sẽ cùng tìm hiểu quá trình xây dựng một ứng dụng web hướng database. Bài viết phù hợp cho developer nào theo hướng full-stack cho các dự án riêng mà không cần phải lo lắng đến việc cài đặt và bảo trì hạ tầng với nhiều service phức tạp.

Chúng ta deploy web app được viết bằng Node.js và Express. Nó cho phép user viết và lưu các ghi chú cũng như đọc các ghi chú đã viết trước đó. Dữ liệu được lưu trong MongoDB database. Chúng ta sẽ sử dụng Github Action để tạo flow CI/CD giúp deploy app bằng AWS Lambda.

Trọng tâm là sự đơn giản, thực dụng và tiết kiệm chi phí. Vì AWS và MongoDB có các cấp miễn phí. Tuy nhiên, hãy nhớ rằng hãy hủy triển khai ứng dụng sau đó nếu bạn không muốn phải trả tiền. Vì ứng dụng của bạn sẽ được cung cấp công khai nên về mặt lý thuyết, việc sử dụng nó có thể vượt qua các cấp miễn phí trong thời gian dài. Tuy nhiên, nếu bạn có ý định mở rộng ứng dụng này cho các mục đích của riêng mình, tôi có thể khuyên bạn nên thiết lập này vì nó rất hợp lý cho một trang web có lưu lượng truy cập vừa phải.

### Yêu cầu đầu tiên 

Bạn sẽ cần một số thứ để xây dựng ứng dụng. Đảm bảo rằng bạn đã cài đặt Node và Docker trên hệ thống của mình. Để cài đặt Node, bạn có thể sử dụng Node Version Manager (nvm) (xem một số hướng dẫn tại đây). Đối với Docker, hãy cài đặt phiên bản Docker Desktop mới nhất cho hệ điều hành của bạn.

Lưu ý rằng chúng tôi sẽ sử dụng Docker để chạy một phiên bản MongoDB trên máy của chúng tôi. Ngoài ra, bạn cũng có thể cài đặt phiên bản Cộng đồng MongoDB theo cách thủ công. Bạn có thể tìm thấy một số hướng dẫn ở [đây](https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/).

Bạn cũng cần phải có tài khoản tại GitHub, MongoDB và Amazon Web Services (AWS). Khi đăng ký trên AWS, bạn phải nhập số thẻ tín dụng. Như đã đề cập ở trên, thực hiện các bước trong hướng dẫn này sẽ không vượt quá mức free tier.

Một số kiến thức trước đây về Node và Express có thể hữu ích.

### Local Develpoment

OK, bắt đầu thôi. Đầu tiên cần tạo folder rỗng với file `package.json`. Sau đó chạy `npm init`

Chúng tôi sẽ cần cài đặt các phần phụ thuộc sau:

- express: để phản ứng với các yêu cầu HTTP từ phía máy khách
- mongoose, để giao tiếp với cơ sở dữ liệu MongoDB của chúng tôi
- aws-serverless-express, để AWS Lambda có thể gọi ứng dụng của chúng ta
- concurrently (như phụ thuộc nhà phát triển), để thực thi các tập lệnh npm song song

Chạy lệnh sau để cài đặt chúng:

```
npm install --save express mongoose aws-serverless-express && npm install --save-dev concurrently
```

### 1. MongoDB và mongoose

Vì chúng tôi sử dụng cơ sở dữ liệu MongoDB để lưu trữ, nên việc phát triển một phiên bản cơ sở dữ liệu chạy trên máy cục bộ sẽ rất hữu ích cho việc phát triển. Đó là nơi chúng tôi sử dụng Docker image mongo mới nhất. Nếu bạn đã cài đặt Docker trên máy tính của mình, thì việc này cũng dễ dàng chỉ cần chạy `docker run mongo` trong terminal của bạn. Image được lấy từ dockerhub và bắt đầu khởi tạo một container mới. Nếu bạn không quen với Docker, điều đó không sao. Tất cả những gì bạn cần biết là có một phiên bản MongoDB đang chạy trên máy tính của bạn mà bạn có thể giao tiếp.

Để ứng dụng của chúng ta giao tiếp với cơ sở dữ liệu, chúng tôi cần khởi tạo kết nối. Chúng tôi thực hiện điều đó trong một tệp mới có tên `mongoose.js`. Mongoose là thư viện giúp chúng ta thực hiện mô hình hóa đối tượng MongoDB:

```
// mongoose.js

const mongoose = require("mongoose");

const uri = process.env.MONGODB_URL;

let connection;
const connect = async () => {
  try {
    connection = await mongoose.createConnection(uri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0, // and MongoDB driver buffering
    });
    return connection;
  } catch (e) {
    console.error("Could not connect to MongoDB...");
    throw e;
  }
};

function getConnection() {
  return connection;
}

module.exports = { connect, getConnection };
```

Tệp này xuất một đối tượng với hai hàm. 

`connect ()` tạo kết nối đến MongoDB ở vị trí mà được chỉ định trong biến môi trường. Kết nối đang được lưu trữ trong một biến được gọi là connection. 

`getConnection ()` chỉ đơn giản là trả về biến connection. Bạn có thể thắc mắc tại sao chúng tôi không chỉ trả về chính biến connection. Điều này là do Node.js lưu trữ các mô-đun bắt buộc sau khi chúng được tải lần đầu tiên. Do đó, chúng tôi sử dụng một hàm để lấy ra biến connection mới nhất từ mô-đun mongoose.js.

Giờ đây, ứng dụng của chúng tôi có thể kết nối với cơ sở dữ liệu, chúng ta cũng sẽ muốn lưu trữ dữ liệu trong đó - cụ thể hơn là các ghi chú mà chúng ta có thể viết trong giao diện người dùng của mình. Do đó, chúng tôi sẽ tạo mô hình dữ liệu cho các ghi chú của mình. Điều này được thực hiện trong file mới có tên Notes.js bên trong thư mục models:

```
// models/Notes.js

const mongoose = require("mongoose");
const { getConnection } = require("../mongoose");
const conn = getConnection();
const Schema = mongoose.Schema;

module.exports = conn.model(
  "Note",
  new Schema({ text: { type: String, required: true } })
);
```

Ở đây, chúng ta lấy biến connection hiện tại từ module mongoose.js và tạo một model có tên là Note trên đó. Nó có một lược đồ rất cơ bản chỉ chứa một thuộc tính bắt buộc của kiểu String. 

### 2. Express application

Tiếp theo, chúng ta tạo một ứng dụng Express đơn giản. Tạo một file có tên app.js trong thư mục gốc dự án của bạn. Nó có nội dung sau:

```
// app.js

const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  try {
    const Note = require("./models/Note");
    const notes = await Note.find({});
    return res.status(200).send(
      `<!DOCTYPE html>
      <html lang="en">

      <head>
          <title>My Notes</title>
          <style>
              html {
                  text-align: center;
                  background-color: #93c5fd;
                  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                  color: white;
                  font-size: 2rem;
              }

              textarea {
                  resize: none;
                  border: 2px solid #9ca3af;
                  border-radius: 4px;
                  background-color: #f3f4f6;
                  padding: 0.5rem;
                  width: 90%;
              }

              button {
                  padding-left: 2rem;
                  padding-right: 2rem;
                  padding-top: 7px;
                  padding-bottom: 7px;
                  background-color: #f3f4f6;
                  border: 2px solid #9ca3af;
                  color: #4b5563;
                  border-radius: 4px;
              }

              p {
                  border-bottom: 2px solid;
                  padding: 1rem;
                  text-align: left;
              }
          </style>
      </head>

      <body>

          <h1>My Notes</h1>

          <form method="POST">
              <textarea required name="text" rows="5" cols="50" placeholder="Create a new note"></textarea>
              <button type="submit">Save</button>
          </form>

          ${notes.map((n) => `<p>${n.text}</p>`).join("")}

      </body>

      </html>`
    );
  } catch (e) {
    return res.send(e);
  }
});

app.post("/", async (req, res) => {
  try {
    const Note = require("./models/Note");
    const note = new Note(req.body);
    await note.save();
    return res.send("Note saved. <a href=''>Refresh</a>");
  } catch (e) {
    return res.send(e);
  }
});

module.exports = app;
```

Như tôi đã nói, ứng dụng này rất đơn giản. Đầu tiên, chúng ta khởi tạo một ứng dụng Express. Sau đó, yêu cầu nó phân tích các request đến với middleware được mã hóa url được tích hợp sẵn để có thể làm việc với dữ liệu form đã gửi. Ứng dụng có hai hàm xử lý phương thức cho các request trên ứng dụng root

Để ứng dụng thực sự bắt đầu lắng nghe các request HTTP, chúng ta phải gọi phương thức lắng nghe do Express cung cấp. Chúng ta thực hiện việc này trong một file riêng biệt có tên `dev.js` được thêm ở folder root:

```
// dev.js

const app = require("./app");
const { connect } = require("./mongoose");

connect();

const port = 4000;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
```

Sẽ hơi rườm rà khi bắt đầu Docker mongo image và ứng dụng của chúng ta bằng hai lệnh riêng biệt. Do đó, chúng ta chỉ cần thêm vài lệnh vào tệp package.json:

```
"scripts": {
  "start": "concurrently 'npm:mongoDB' 'npm:dev'",
  "dev": "MONGODB_URL=mongodb://localhost:27017 node dev.js",
  "mongoDB": "docker run -p 27017:27017 mongo"
}
```

Để khởi động ứng dụng, chúng ta chỉ cần chạy `npm start`

Bây giờ bạn có thể load ứng dụng bằng cách truy cập `http://localhost:4000` trong trình duyệt của mình.

### Deployment

Bây giờ đã đến lúc triển khai ứng dụng. Chúng tôi sẽ sử dụng các hàm Lambda trên AWS, MongoDB Atlas và AWS API Gateway.

#### 1. Các hàm Lambda là gì và tại sao chúng ta sử dụng chúng

Các hàm Lambda là một cách thực thi mã để đáp ứng các yêu cầu HTTP mà không cần duy trì máy chủ. Chúng chỉ chạy theo yêu cầu, có nghĩa là, nếu không ai gọi dịch vụ của bạn, bạn không phải trả tiền cho thời gian chạy máy chủ. Mặt khác, nếu nhiều người gọi dịch vụ của bạn, AWS sẽ tự động mở rộng quy mô và khởi tạo nhiều phiên bản Lambda.

Các hàm Lambda là các hàm và bạn có thể sử dụng chúng với bất cứ thứ gì bạn muốn. Chỉ có một ngoại lệ: mã của bạn không được có trạng thái, vì một phiên bản Lambda sẽ dừng khi nó không được thực thi nữa.

Chúng tôi sẽ gói toàn bộ ứng dụng của mình bên trong một hàm Lambda và triển khai nó trên AWS Lambda. AWS Lambda có một bậc miễn phí, không giới hạn, bao gồm một triệu yêu cầu miễn phí và 400.000 GB giây mỗi tháng. Vì vậy, bạn có thể thử nghiệm dịch vụ một cách an toàn và triển khai một số chức năng Lambda mà không phải trả tiền cho nó. Chỉ cần nhớ xóa các chức năng nếu bạn không muốn sử dụng chúng nữa.

#### 2. Tạo AWS Lambda function

Bạn login vào AWS management console và chọn AWS Lambda 

Ấn `create function` và chọn ngôn ngữ là NodeJS 

Chi tiết hơn bạn có thể tham khảo ở [đây](https://aws.amazon.com/vi/lambda/getting-started/)

#### 3. Cài đặt MongoDB Atlas cloud service

Hãy tạo một tài khoản trên mongodb.com. Trong quá trình đăng ký, bạn sẽ được yêu cầu chọn một loại cluster. Chọn một Nhóm chia sẻ miễn phí. Bước tiếp theo là đặt tên cho dự án của bạn. Ngoài ra, bạn có thể chọn ngôn ngữ lập trình ưa thích của mình.

Chi tiết có thể tham khảo ở [đây](https://www.mongodb.com/)

#### 4. Tạo app để hoạt động với AWS Lambda

Để AWS Lambda có thể gọi ứng dụng của chúng ta, chúng ta phải thiết lập một tập lệnh nhập mới, tương tự như những gì chúng tôi đã thực hiện trong tệp dev.js. Chúng tôi sẽ gọi nó là index.js và nó có nội dung như sau:

```
// index.js
const awsServerlessExpress = require("aws-serverless-express");

const { connect } = require("./mongoose");

let connection = null;

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (connection === null) connection = await connect();
  const app = require("./app");
  const server = awsServerlessExpress.createServer(app);
  return awsServerlessExpress.proxy(server, event, context, "PROMISE").promise;
};
```

#### 5. Deploy đến AWS Lambda với GitHub Actions

Bước tiếp theo là sử dụng GitHub Actions để tạo CI/CD workflow

Bạn có thể tham khảo kỹ hơn ở [đây](https://blog.jakoblind.no/aws-lambda-github-actions/)

Chúng ta tạo file `deploy.yml` và thêm:

```
# /.github/workflows/deploy.yml

name: deploy to lambda
on:
  push:
    branches:
      - main
jobs:
  deploy:
    name: deploy
    strategy:
      matrix:
        node-version: [12.x]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: Setup Nodejs
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}
      - name: npm install
        run: npm ci --production
      - name: zip
        uses: montudor/action-zip@v0.1.1
        with:
          args: zip -qq -r ./app.zip ./
      - name: push to lambda
        uses: appleboy/lambda-action@master
        with:
          aws_access_key_id: ${{ secrets.AWS_ACCESS_KEY }}
          aws_secret_access_key: ${{ secrets.AWS_SECRET_KEY }}
          aws_region: eu-central-1
          function_name: express-lambda-example
          zip_file: app.zip
```