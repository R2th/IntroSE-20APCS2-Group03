### 1. Mở đầu:

Nếu bạn quan tâm đến việc làm cho ứng dụng của bạn chạy trên bất kỳ máy tính hoặc cloud computing nào , thì bạn nên sử dụng Environment Variables để setting các giá trị cho từng môi trường mà bạn mong muốn. Dưới đây là một số ví dụ cụ thể về các tình huống phổ biến khi bạn nên xem xét sử dụng các biến môi trường. 

- HTTP port to listen on

- Đường dẫn và thư mục tệp của bạn

- Chỉ định vào các môi trường development, staging, test, or production database

- Các ví dụ khác có thể là URL tới server resources

Hãy cùng khám phá cách bạn có thể sử dụng các biến môi trường trong mã Node.js.
 
### 2. Create file .env:

 Đầu tiên chúng ta tạo một file .env ở thư mục dự án của các bạn với nội dung là các Environment Variables mà các bạn cần sử dụng như 
 ```
  NODE_ENV=development
  MONGODB_URI=mongodb://localhost/demodatabase
  SECRETKEY=SecretGarden
  PORT=3000
 ```
 
### 3. Reading the .env File :

Khi chúng ta đã có file .env rồi thì giờ chúng ta sẽ nghĩ tới việc làm sao để đọc các Environment Variables trong file .env đó.Vậy các bước như sau:

- Tạo a package.json file
- Install the dotenv npm package
- Viết code để đọc the .env


### 4.Tạo a package.json file:

Hãy thử điều này bằng cách chạy lệnh sau

```npm init -y```

Điều này tạo ra một tệp package.json với các cài đặt cơ bản được điền cho bạn.

### 5. Install the dotenv npm package:

Bạn muốn đọc tệp .env và gói dotenv trên npm thực hiện điều này rất tốt. Cài đặt gói dotenv bằng cách chạy lệnh sau

```npm install dotenv```

Điều này sẽ thêm gói dotenv và các tệp của nó vào thư mục node_modules của bạn và tạo một mục trong package.json cho dotenv.

### 6. Viết code để đọc the .env:

Đầu tiên  ta cần import dotenv vào file app.js chẳng hạn

```require('dotenv').config(); ```

Từ đây chúng ta có thể sử dụng các biến trong file .env mà chúng ta có đã tạo từ đầu bài viết, với code như sau :

```
  let server = app.listen(process.env.PORT || 3000, function () {
  logger.api.info(`Server listening on port ${server.address().port}`);
  console.log(`Server listening on port ${server.address().port}`);
});
```

"process.env.PORT" là đoạn code để chúng ta đọc giá trị của Environment Variables PORT trong .env file

### 7. Lưu ý:

Để nội dung của .env file không bị thay đổi giữa các môi trường khi update .env file thì bạn sử dụng .gitignore file để quy định việc này, bằng việc thêm .env file vào danh sách ignore

![](https://images.viblo.asia/6bb6e8f0-57c7-4f71-9717-27443c6d18ee.png)