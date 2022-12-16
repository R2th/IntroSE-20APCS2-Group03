Hi, các bạn.
Sau màn khởi đầu với "Hello World" cho loạt bài về Express thật sự nhàm chán. Mình sẽ tiếp tục loạt bài bằng cách kết hợp thực hiện một project với tên "F1Tours" cùng với đó là các kiến thức về Express. Như vậy sẽ giúp các bạn dễ hình dung hơn.<br>
*Lưu ý: Bài viết sử dụng thông tin [F1 Schedule](https://www.formula1.com/en/latest/article.f1-schedule-2020-latest-information.3P0b3hJYdFDm9xFieAYqCS.html) từ website formula1.com với mục đích bài viết chia sẻ kiến thức không vì mục đích thương mại. Bài viết này không chịu trách nhiệm cho mọi hình thức sử dụng nội dung từ bài viết vào mục đích thương mại.* <br>
Chỉ một chút lưu ý nho nhỏ như vậy thôi, vì khi mình sử dụng thông tin từ website của họ mình cũng không chắc chắn về vấn đề bản quyền thông tin lắm. Mong các bạn lưu ý. Cùng bắt đầu với F1Tours nào !<br>
# 1.Giới thiệu Project F1Tours:
Vì dịch bệnh covid-19 mà chặng đua F1 dự kiến tổ chức tại Hà Nội đã không được diễn ra. Thật là đáng tiếc! Không những vậy một số chặng đua khác trong hệ thống giải đấu cũng phải tạm hoãn. Vì thế mình quyết định làm project F1Tours để cung cấp một vài thông tin từ giải đấu này như: Chặng đua tại các nước, thông tin về đường đua.<br>
* Trong quá trình thực hiện project, mình cũng sẽ giới thiệu đến các bạn các kỹ thuật xử lý trong bài. Các công nghệ được sử dụng bao gồm: npm v6.14.4, Express v4.17.1. Trong quá trình viết bài mình sẽ cập nhật thêm các công nghệ được sử dụng. <br>
* Cách trình bày dự án cũng đi từ sơ khai, sau đó sẽ được tối ưu dần qua từng giai đoạn.<br>
* Dự án này chỉ tập trung vào xử lý api mà không xử lý views. Do đó, mình sẽ sử dụng *curl* để gọi api, hoặc các bạn có thể dùng các ứng dụng khác như postman để gọi api.<br>

# 2. Khởi tạo dự án và xử lý GET và POST request trong Express:
Trước tiên, mình tạo thư mục dự án với tên *F1Tours* trong workplace. Sau đó, vào thư mục *F1Tours* init dự án bằng *npm init*. Tiếp đó,  mình tiến hành cài đặt dependencies *Express*, và devDependencies *nodemon*. Bước đầu, mình chỉ sử dụng như vậy thôi.<br>
Tiếp theo, mình tạp file *app.js* làm module khởi động của dự án. Trong *app.js*, mình khai báo cơ bản để sử dụng Express như sau:
```
const express = require('express');
const fs = require('fs');

const app = express();

const port = 3000;
app.listen(port, () => {
  console.log(`F1Tours running on port ${port} ...`);
});
```
Tiếp theo mình tạo thư mục *data*, và file *f1tours.json* (file này mình không public nha) với một số chặng đua ban đầu. File này trước tiên sẽ xem là db sử dụng để truy xuất tất cả *F1-tours* và ghi lại các chặng đua được thêm vào.<br>
Trong phần này mình sẽ thực hiện tạo api với route *"/api/f1/tours"* để lấy tất cả thông tin F1-tour từ dữ liệu sẵn có và tạo mới thông tin chặng đua, và *"/api/f1/tours/:id"* dùng để lấy thông tin của 1 chặng đua F1 cụ thể.<br>
Giờ thì qua terminal, vào đúng thư mục dự án *F1Tours*, sau đó, mở thêm 1 tab terminal nữa. Như vậy, mình sẽ sử dụng 2 tab terminal, một để sử dụng *curl* gọi api, một để chạy server bằng *nodemon*. Việc chạy server bằng *nodemon* sẽ giúp mình không phải restart lại server mỗi khi change code.

### Lấy tất cả thông tin chặng đua F1 trong database:

Trong *app.js*, mình sửa như sau:
```
const express = require('express');
const fs = require('fs');

const app = express();

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/f1tours.json`)); //đọc thông tin từ db

app.get('/api/f1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  })
});

const port = 3000;
app.listen(port, () => {
  console.log(`F1Tours running on port ${port} ...`);
});
```

Mình sẽ đọc thông tin từ db *f1tours.json* và parse về định dạng JSON để trả về cho client. Sau đó, thực hiện handle GET request cho route */api/f1/tours* bằng cách khai báo rất đơn giản *app.get*. <br>
Cấu trúc cơ bản khi sử dụng *app.get* thường bao gồm: đường dẫn sẽ handle hoặc regexp của đường dẫn sẽ handle, và callback gồm 2 argument là req (request) và res (response) để xử lý request và nội dung response sẽ trả về.<br>
Ở đây, mình không xử lý gì ở *req*, phần *res* sẽ trả về *status 200*, cùng json res có dữ liệu về tất cả tours từ db.<br>
Giờ mình dùng *curl* để gọi thử *api* này xem hoạt động ra sao nhé. Trên terminal mình thực thi dòng lệnh: *curl -H "Content-Type: application/json" -v localhost:3000/api/f1/tours |json_pp*. Các bạn có thể tham khảo thêm về curl để hiểu rõ hơn câu lệnh nhé. phần json_pp chỉ là để format json response trả về cho dễ nhìn thôi. Và kết quả, mình có thông tin:
![](https://images.viblo.asia/5a010e97-fbb9-4bae-b497-e262e70803c3.png)
![](https://images.viblo.asia/d159d98d-c3ce-40b2-a79a-04dc85b66135.png)
<br>
Như vậy là chúng ta đã có tất cả thông tin của chặng F1 từ db đua rồi nhé.

### Tạo mới thông tin chặng đua F1:
Để tạo mới thông tin chặng đua F1, mình sử dụng POST request cho route "/api/f1/tours". Trong, *app.js* mình tiếp tục xử lý như sau:
```
const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());// khai báo sử dụng middlewave cho app. Middlewave này sẽ parse các request có JSON payload

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/f1tours.json`)); //đọc thông tin từ db

app.get('/api/f1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  })
});

app.post('/api/f1/tours', (req, res) => {
  const newF1Id = tours.length + 1; //cái này mình +1 là do db mình bắt đầu id từ 1.
  const newF1Tour = Object.assign({id: newF1Id}, req.body);

  tours.push(newF1Tour);

  fs.writeFile(`${__dirname}/data/f1tours.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newF1Tour
      }
    })
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`F1Tours running on port ${port} ...`);
});
```
Tương tự như *handle GET request*, việc *handle POST request* sẽ sử dụng bằng cách khai báo *app.post*. Các thành phần cơ bản tương tự *GET*. Ở đây mình sẽ tạo mới một F1 tour, sau đó push vào mảng tours đã có, và ghi lại vào *f1tours.json*. Cuối cùng trả về data json của F1 tour mới cho client. <br>
Mình bỏ qua việc validate các thông tin đầu vào. Mình cần nhập đúng thông tin đầu vào để có thể tạo mới được F1-Tour đúng format, còn không thì nhập cái gì cũng được. =)).<br>
Ở đây có một đoạn code cần lưu ý là *req.body*. Việc sử dụng được req.body là nhờ việc sử dụng *middlewave express.json()*. Nếu không có middlewave này, khi chúng ta sử dụng sẽ trả về kết quả là *undefined*, và chương trình sẽ lỗi ở server.<br>
Giờ thì tiếp tục quay lại terminal nào. Sử dụng lệnh curl với nội dung như sau:
```
 curl -H "Content-Type: application/json" -v localhost:3000/api/f1/tours -d '{"name": "NETHERLANDS - Zandvoort Circuit", "first_grand_prix": "1952", "circuit_length": "4.259", "unit": "km", "number_of_laps": 72,  "race_distance": "306.648",    "lap_record": "",    "lap_record_by": "",    "lap_record_year": ""}' |json_pp
```
Và chúng ta sẽ có kết quả là:
![](https://images.viblo.asia/7c4b350c-47f2-4d11-a37f-8442c7d9c2a7.png)

Như vậy là, mình đã tạo được thông tin một chặng đua F1 mới rồi.

### Xem thông tin một chặng đua F1:

Để xem thông tin một chặng đua F1 mình sẽ handle *GET request* cho route *"/api/f1/tours/:id"*. Trong *app.js*, mình xử lý như sau:
```
const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());// khai báo sử dụng middlewave cho app. Middlewave này sẽ parse các request có JSON payload

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/f1tours.json`)); //đọc thông tin từ db

app.get('/api/f1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  })
});

app.get('/api/f1/tours/:id', (req, res) => {
  const id = parseInt(req.params.id); //parse String to Integer

  const tour = tours.find(el => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour
    }
  })
});

app.post('/api/f1/tours', (req, res) => {
  const newF1Id = tours.length + 1; //cái này mình +1 là do db mình bắt đầu id từ 1.
  const newF1Tour = Object.assign({id: newF1Id}, req.body);

  tours.push(newF1Tour);

  fs.writeFile(`${__dirname}/data/f1tours.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newF1Tour
      }
    })
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`F1Tours running on port ${port} ...`);
});
```
Ở đây, mình sử dụng req.params để lấy thông tin params. Tức là, mình lấy cái *:id*, mình đã khai báo trong route để handle. Mình sẽ tìm F1-Tour trong db, nếu có thì trả về thông tin F1-Tour nếu không sẽ trả về "Invalid ID".<br>
Giờ qua terminal và tận hưởng thành quả. Dùng lệnh curl:
```
curl -H "Content-Type: application/json" -v localhost:3000/api/f1/tours/3 |json_pp
```
Sẽ cho ra kết quả :
![](https://images.viblo.asia/f41438f8-418f-44ec-a90d-1fb3ffc8c82e.png)

# 3. Phần kế tiếp:
Phần kế tiếp, mình sẽ tiếp tục xử lý những vấn đề tiếp theo như update và xóa thông tin F1-Tour. Mình tạm dừng chặng đua đầu tiên ở đây nhé.<br>

*Cảm ơn các bạn đã đọc bài viết của mình.*<br>
*Bài viết không thể tránh khỏi những thiếu xót, mong nhận được sự góp ý của các bạn để bài viết được hoàn thiện hơn.* <br>
*Nguồn tham khảo:*<br>
    - [Expressjs.com](https://expressjs.com/)<br>
    - [Udemy.com](https://www.udemy.com/)<br>
    - Và một số nguồn khác<br>