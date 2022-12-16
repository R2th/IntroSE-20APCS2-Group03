# 1. Giới thiệu về Json-server.
![alt](https://ducgiangtran.files.wordpress.com/2021/04/screen-shot-2021-04-01-at-14.47.04.png)
* Json server hiểu đơn giản là một server trả về các dữ liệu dưới dạng json.
Ở bài viết này mình sẽ hướng dẫn các bạn xây dựng một bộ “Fake” REST API với đầy đủ các tác vụ cơ bản CRUD.

Trong bài viết mình sử dụng thư viện : json-server.
Các bạn có thể tham khảo tài liệu thư viện này tại: https://www.npmjs.com/package/json-server.
# 2. Cài đặt json-server phía client.
Tại terminal các bạn chạy dòng lệnh dưới đây để cài đặt json-server:

```
sudo npm install -g json-server
```
Tạo một thư mục với tên JsonServer. Tạo một file db.json với nội dung:

```
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```
Chạy lệnh:
```
json-server --watch db.json 
```
Kết quả ta có:

![alt](https://ducgiangtran.files.wordpress.com/2021/04/screen-shot-2021-04-01-at-14.59.28.png)

Như kết quả ta thấy, json-server đã tạo cho chúng ta một địa chỉ là: http://localhost:3000 và 3 địa chỉ khác là http://localhost:3000/posts, http://localhost:3000/comments, http://localhost:3000/profile. Các địa chỉ này tương ứng với các api lấy danh sách posts, comments, profile đã tạo trong file db.json.

Các bạn mở một địa chỉ bất kì trên trình duyệt, ở đây mình dùng Chrome:

![alt](https://ducgiangtran.files.wordpress.com/2021/04/screen-shot-2021-04-01-at-15.03.18.png)

Kết quả ta đã có được một dữ liệu dạng json trả về thông tin bài posts đã tạo trong file json.db.

Như vậy việc cài đặt json-server đã hoàn thành.

# 3. Tạo một cấu trúc json-server.
Trong bài viết này chúng ta sẽ tạo ra một cấu trúc dữ liệu quản lý lớp và học sinh trong lớp( đã quá quên với các bạn lập trình).

![alt](https://ducgiangtran.files.wordpress.com/2021/04/screen-shot-2021-04-01-at-16.14.08.png)

# 3.1 Cài đặt môi trường node.
Trong thư mục vừa tạo chạy lệnh:

```
npm init
```

Sau đó cập nhật các thông tin như hướng dẫn. Sau khi thành công ta có file package.json

![alt](https://ducgiangtran.files.wordpress.com/2021/04/screen-shot-2021-04-01-at-15.19.45.png)

Tạo file .gitignore cho project. Ở đây mình sử dụng một base gitignore dành cho node tại https://www.toptal.com/developers/gitignore/api/node.

Cài đặt json-server vào vào project:

```
npm i json-server
```

Cài đặt nodemon:

```
npm i --save-dev nodemon
```

![alt](https://ducgiangtran.files.wordpress.com/2021/04/screen-shot-2021-04-01-at-15.26.59.png)

Taọ file main.js với nội dung:

```
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// Use default router
server.use('/api',router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
```

Ở đây mình mình sẽ chỉ đỉnh địa chỉ có mình là : http://localhost:3000/api

Tạo một scripts để chạy cho môi trường dev.

```
"dev": "nodemon main.js"
```

Vậy là việc cài đặt đã xong. Chạy lệnh:

```
npm run dev
```

Kết quả chúng ta đã có dữ liệu khi truy cập địa chỉ: http://localhost:3000/api/class.

![alt](https://ducgiangtran.files.wordpress.com/2021/04/screen-shot-2021-04-01-at-15.36.37.png)

# 3.2 Khởi tạo dữ liệu ngẫu nhiên cho db.json
Có rất nhiều thư viện hỗ trợ việc random dữ liệu như Faker, Casual, Chance or JSON Schema Faker… trong bài viết này mình sẽ dùng Faker( vì đơn giản nghe nó giống một idol trong Legend of league)

Cài đặt Faker:

```
npm i --save-dev faker
```

Tạo file render-data.js trong cấu trúc project và scripts trong package.json.

```
"render-data":"node render-data.js"
```

Ý tưởng ở đây để tạo một cấu trúc dữ liệu dạng Json như mục tiêu ban đầu, chúng ta cần tạo ra một danh sách các lớp và sau đó tạo danh sách học sinh cho từng lớp.

# 3.2.1 Tạo danh sách lớp ngẫu nhiên.
Hàm khởi tạo danh sách gồm n lớp:

```
const randomClassList = (n)=>{
    const classList = [];
    if(n <= 0) return [];
    Array.from(new Array(n)).forEach(()=>{
        const _class = {
            id:faker.random.uuid(),
            totalStudent:faker.random.number(40),
            supervising_Teacher:`${faker.name.lastName()} ${faker.name.firstName()}`,
            avatar_Teacher:faker.image.avatar(400,400)
        }
        classList.push(_class)
    })
    return classList;
}
```

Sử dụng IIFE function để thực thi việc tạo dữ liệu:

```
(()=>{
    const classList = randomClassList(2)
    const db = {
        class: classList,
    };
    fs.writeFile('./db.json',JSON.stringify(db),()=>{
        console.log('Write successfully')
    });
})()
```

Chạy lệnh:

```
npm run render-data
```

Dữ liệu được tạo ra ghi vào file db.json

![alt](https://ducgiangtran.files.wordpress.com/2021/04/screen-shot-2021-04-01-at-16.18.40.png)

Đây là bộ dữ liệu hoàn toàn ngẫu nhiên được sinh ra mỗi lần chúng ta chạy file render-data.

# 3.2.2 Tạo danh sách học sinh ngẫu nhiên theo từng lớp.
Hàm khởi tạo danh sách n học sinh thuộc một lớp:

```
const randomStudentList = (classList, studentOfClass)=>{
    const studentList = [];
    if(studentOfClass <= 0) return [];
    for(const e of classList){
        Array.from(new Array(studentOfClass)).forEach(()=>{
            const student = {
            class_id:e.id,
            id:faker.random.uuid(),
            sex:faker.name.gender(),
            medium_score:Number.parseFloat(faker.random.number(10)),
            avatar:faker.image.avatar(400,400)
            };
            studentList.push(student)
        })
    }
    return studentList;
}
```

IIFE function:

```
(()=>{
    const classList = randomClassList(2)
    const studentList = randomStudentList(classList,3)

    const db = {
        class: classList,
        students:studentList
    };
    //write db obj to db.json
    fs.writeFile('./db.json',JSON.stringify(db),()=>{
        console.log('Write successfully')
    });
})()
```

Chạy lệnh:

```
npm run render-data
```

Kết quả cuối cùng:

![alt](https://ducgiangtran.files.wordpress.com/2021/04/screen-shot-2021-04-01-at-16.31.12.png?w=2048)

Như vậy chúng ta đã có một bộ dự liệu như mục tiêu ban đầu.

Note: Mình quên render tên học sinh 🙂 Từ cấu trúc mẫu trên các bạn có thể thêm các trường tuỳ ý nhé. Mình sẽ cập nhật trường này trong source code của mình nhé.

# 4. Tạo các REST API cho các chức năng CRUD.

Khởi tạo thư mục api-collection và 2 file: class.http và students.http để lưu trữ các api của mình hoặc sử dụng collection của postman để chia sẻ các api.

![alt](https://ducgiangtran.files.wordpress.com/2021/04/screen-shot-2021-04-01-at-16.39.17.png)

Chạy lênh:

```
npm run render-data
npm run dev
```

Như vậy server đã được chạy.

# 4.1 GET: Lấy danh sách lớp
Lấy toàn bộ danh sách cơ bản: http://localhost:3000/api/class

![alt](https://ducgiangtran.files.wordpress.com/2021/04/screen-shot-2021-04-01-at-16.46.30.png?w=2048)

Với việc sử dụng phương thức GET khi dữ liệu lớn chúng ta cần phân trang cho dữ liệu để tối ưu quá trình gọi và sử dụng phía client. Json-server chỉ hỗ trợ chúng ta lấy được tổng số phần tử của danh sách. Ở phần này mình sẽ theo dõi response headers trả về để tìm cách tối ưu cho api phân trang.

Khi gọi api : http://localhost:3000/api/class?_page=1&_limit=10

Tức ta đang gọi các phần tử của trang thứ 1 và mỗi trang sẽ có 10 phần tử. Kết quả nhận được như sau:

![alt](https://ducgiangtran.files.wordpress.com/2021/04/screen-shot-2021-04-01-at-17.03.12.png?w=2048)

Dựa vào X-Total-Count response headers ta sẽ có được tổng số phần tử của danh sách do trong source code của json-server có đề cập đến vấn đề này:

![alt](https://ducgiangtran.files.wordpress.com/2021/04/screen-shot-2021-04-01-at-17.09.18.png)

Trong docs của json-server có đề cập đến Custom output example.

```
router.render = (req, res) => {
  res.jsonp({
    body: res.locals.data
  })
}
```

Mình sẽ thêm function này vào main.js và đặt log req

![alt](https://ducgiangtran.files.wordpress.com/2021/04/screen-shot-2021-04-01-at-17.32.35.png)

Như vậy chúng ta có thể dựa vào search hoặc query để lấy được page và limit cho response của mình.

Mình sẽ sẻ sụng thêm thư viện query-string để lấy ra được dữ liệu từ query.

```
router.render = (req, res) => {
  const headers = res.getHeaders();
  const totalCount = headers['x-total-count'];
  if(req.originalMethod === 'GET' && totalCount){
    const queryParams = queryString.parse(req._parsedOriginalUrl.query);
    const result = {
      data: res.locals.data,
      pagination:{
        _page: Number.parseInt(queryParams._page) || 1,
        _limit: Number.parseInt(queryParams._limit) || 10,
        _totalRows: Number.parseInt(totalCount)
      }
    }
  return res.jsonp(result)
  }
  res.jsonp(res.locals.data)
}
```

Kết quả:

![alt](https://ducgiangtran.files.wordpress.com/2021/04/screen-shot-2021-04-01-at-17.37.57.png?w=1348)

Như vậy ta đã có thông tin về pagination.

# 4.2 POST: Tạo một lớp mới.

Tạo lớp: http://localhost:3000/api/class

![alt](https://ducgiangtran.files.wordpress.com/2021/04/screen-shot-2021-04-01-at-17.43.32.png?w=2046)

Với cái api có phương thức POST, PUT, PATCH chúng ta sẽ tự động cập nhật thời gian tạo, cập nhật tương ứng.

```
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
    req.body.updatedAt = Date.now();
  }else if (req.method === 'PATCH' || req.method === 'PUT'){
    req.body.updatedAt = Date.now();
  }
  // Continue to JSON Server router
  next()
})
```

Tương tự các với các phương thức POST, PUT, PATCH các bạn sẽ sử dụng Postman để kiểm tra.

Ngoài ra còn rất nhiều trường hợp truy vấn api như sắp xếp, tìm kiếm… các bạn có thể tham khảo thêm tại tài liệu của json-server. Mình sẽ để link ở phần cuối bài viết.

# 5. Tổng kết.

Trong bài viết này mình đã chia sẻ với các bạn cách để tạo một json-server đẻ mock api cho riêng mình phục vụ cho quá trình phát triển ứng dụng.

Việc mock các api giúp các bạn có thể thực hiện các hàm gọi api ngay chính trên ứng dụng font-end của mình để rút ngắn thời gian ghép nối với các api thực thế của back-end sau này.

Trên đây là những chia sẻ của mình sau khi nghiên cứu thư viện json-server. Có thể sẽ có những phần sai xót, rất mong nhận được góp ý từ phía các bạn.

Tài liệu tham khảo: https://github.com/typicode/json-server

Source code: https://github.com/ducgiangtrankma/Json-server-public.git