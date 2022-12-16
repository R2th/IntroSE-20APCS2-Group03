Trong bài viết này, chúng ta sẽ cùng nhau tạo một ứng dụng CURD cung cấp các API cơ bản trên môi trường Node.js. Database sẽ sử dụng là MongoDB. Các api chỉ thực thiện chức năng quản lý thêm sửa xóa cơ bản. Các từ khóa trong bài viết này gồm:
- Docker và Docker Compose tạo môi trường develop
- MongoDB, Mongoose
- Express.js framework, đơn giản và gọn nhẹ để build API trên node.js

## Tại sao lại dùng MongoDB
Lý do rất đơn giản là vì dữ liệu lưu trong Mongo với cấu trúc linh hoạt hơn SQL, tốc độ ghi và update nhanh hơn MySQL, phù hợp với nhu cầu của mình hiện tại. Đó là lý do, và tut này chỉ là chia sẻ lại những gì mình đã thực hiện tới các bạn mà thôi.

## MongoDB cơ bản
Mình giả định là các bạn biết về docker rồi nhé, nên mình không nói nhiều về Docker và Docker Compose nữa. Bạn có thể đọc một số bài trước của mình cũng đã đề cập tới Docker/Docker Compose. Mời bạn đọc thêm tại https://viblo.asia/u/huukimit Bây giờ, chúng ta sẽ đi luôn vào MongoDB. Đây là DBMS nó thuộc loại NoSQL, ưu điểm của nó là "thoáng" về cấu trúc của dữ liệu. Một số khái niệm cơ bản được trong SQL (vd: MySQL) được mapping sang trên MongoDB khi mới bắt đầu ban cần biết gồm:

| # | MySQL | MongoDB |
| ----- | ----- | ----- |
| 01 | Database | Database |
| 02 | Table | Collection |
| 03 | Row/Record | Document |
| 04 | Column | Field |
| 05 | Primary key | Primary key |

Chúng ta dễ dàng lưu thêm một field (column) vào trong collection (table) mà không phải migrate database, hay lưu thiếu so với cấu trúc thiết kế ban đầu cũng không bị lỗi. Bởi tất cả đều được lưu trong MongoDB dưới dạng JSON. Chúng ta sử dụng Mongoose qua mô hình ODM để mapping các model với database như trong Laravel/Rails .etc. Bởi một phần llẽ đó nên các hệ thống machine-learning hay ưu chuộng NoSQL để lưu dữ liệu.

## Mongoose
Là thư viện sử dụng design pattern ODM (Object Data Mapping), giúp chuyển đổi dữ liệu thuần túy sang dạng các Object trong code của bạn. Với các chức năng đi kèm, giúp code nhìn trực quan, dễ hiểu hơn. Chẳng hạn như thay vì viết các câu lệnh truy vấn thuần túy, bạn dùng các Object và gọi hàm thay thế cho insert, update.. trong code sẽ dễ đọc hiểu và bảo trì hơn.

## Express.js framework
Một processs Express khá nhẹ so với việc mình dùng một framework PHP khác như Laravel hay Django. Và mình thấy, Express thôi là đủ rồi, còn thiếu gì thì mình sẽ cài thêm vào dần.

MÌnh sẽ tạo các api quản lý bài Post, tổ chức code như sau:

```bash:Project-Folder
|__ src
       |__ server.js
       |__ routes.js
       |__ models
              |__ post.js
```

Trong đó:
- `/server.js` là file khởi tạo và chạy server express lên.
- `/routes.js`, file định nghĩa các route thực hiện thêm/sửa/xóa Post.
- `/models/post.js`, định nghĩa model Post với mongoose

### Install dependencies
Chúng ta cài đặt các gói dependencies gồm: express và mongoose. Mình cài thêm:
- `esm` để viết code cho server theo ES6 syntax
- `mongoose-paginate-v2` để phân trang danh sách kết quả.
- `body-parser` để parse form data từ request ra
- `lodash` tiện tay cài đặt biết đâu cần :D

```bash:Terminal/CMD
yarn init
yarn add express mongoose esm mongoose-paginate-v2
```

### Định nghĩa model Post
Chúng ta sẽ quản lý bài Post gồm các thông tin cơ bản sau:
- title: String
- contents: Text
- category: String
- created_at: Date
- updated_at: Date
- _id: primary key trong mongodb : String

Định nghĩa một model qua Mongoose Schema như sau:
```javascript:/src/models/post.js
import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema

const PostSchema = new Schema({
  title: String,
  contents: String,
  category: String
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

PostSchema.plugin(mongoosePaginate)

export default mongoose.model('posts', PostSchema)
```

Ngoài các SchemaType như String, Date các bạn tham khảo thêm các kiểu khác tại: https://mongoosejs.com/docs/schematypes.html
Dòng cuối cùng export Model với collection có tên là 'posts'.

Nếu các bạn từng dùng Laravel, chắc hẳn đã thân thuộc với hai thuộc field timestamp trong bảng là `created_at` và `updated_at`. Schema của Mongoose cũng giúp bạn tự động thêm hai field này vào collection của mình. Chúng cũng sẽ được tự chèn dữ liệu created_at khi document được tạo mới, và tự cập nhật field updated_at khi document bị chỉnh sửa. Đơn giản bằng các cấu hình thêm argument thứ hai với field `timestamps` như ví dụ trên.

### Khởi tạo server/kết nối tới MongoDB

```javascript:/src/server.js
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import routes from './routes'

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())

app.use(routes)

// Connect to MongoDB:
mongoose.connect(
  `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`,
  { useNewUrlParser: true }
)

app.listen(3000, () => {
  console.log('Web server is listening on port 3000.')
})
```

Trong đó, các constant là các hằng số các bạn tự thay thế vào nha. Tới đây chúng ta đã tạo được server, tuy nhiên khi run bạn sẽ gặp lỗi. Bởi lẽ chúng ta chưa định nghĩa các routes cho express. Phần tiếp theo, chúng ta sẽ tạo ra chúng ngây bây giờ!

### Khởi tạo routing

```javascript:/src/routes.js
import _assign from 'lodash/assign'
import { Router } from 'express'
import Post from '../models/post'

const router = Router()

const handlePageError = (res, e) => res.setStatus(500).send(e.message)

// Define CURD routes here..
// Ex: router.get(..)

export default router
```

Ở đây mình sẽ không giải thích quá nhiều về routing với express nữa. Chúng ta sẽ khai báo các route cho app vào file `routes.js` trên nhé.


### Thêm mới document

Thực hiện lưu một document vào database khá đơn giản với Mongoose. Với cú pháp ngắn gọn như sau:
```javascript
const model = (new Model(data)).save()
```

Việc khai báo route sẽ như sau:
```javascript:/src/routes.js
// Create document:
router.post(
  '/posts',
  async (req, res) => {
    try {
      const post = await new Post(req.body).save()

      return res.send({
        message: 'Created new post successfully!',
        data: post
      })
    } catch (e) {
      return handlePageError(res, e)
    }
  }
)
```

### Chỉnh sửa document đã có

Chúng ta thực hiện cập nhật update dữ liệu cho một document đang tồn tại. Vì là update nên mình khai báo HTTP method là PUT. Sử dụng `findByIdAndUpdate` để thực thi:
```javascript:/src/routes.js
// Update an existing document:
router.put(
  '/posts/:id',
  async (req, res) => {
    try {
      await Post.findByIdAndUpdate(req.params.id, req.body)

      return res.json({ message: 'Updated post successfully!' })
    } catch (e) {
      return handlePageError(res, e)
    }
  }
)
```

Như vậy,  để update dữ liệu cho document trong collection `posts` có `_id` là `E375zw7JKGW` ta gửi một request tới API http://example.lc/posts/E375zw7JKGW.

Chúng ta đã có `findByIdAndUpdate` để update. Ngoài ra còn có rất nhiều các methods khác bạn có thể tham khảo thêm link này [https://mongoosejs.com/docs/api.html#Query](https://mongoosejs.com/docs/api.html#Query).

### Lấy danh sách một collections

Để lấy danh sách documents của một collection ra, chúng ta sử dụng: `find` để lấy. Trong bài viết này, mình sẽ sử dụng package `mongoose-paginate-v2` để lấy dữ liệu đã phân trang luôn. Nó là một plugin viết cho mongoose, được mình tích hợp khi ta khai báo model trước đó rồi. Cách sử dụng rất đơn giản, ta chỉ cần gọi `paginate` và truyền một số thứ cần thiết cho việc phân trang:
- sort: Thực hiện sắp xếp dữ liệu
- limit: Số documents được lấy ra trong một trang
- page: Số trang hiện tại

```javascript:/src/routes.js
router.get('/posts', async (req, res) => {
  try {
    const options = {
      sort: { _id: -1 },
      limit: parseInt(req.query.limit || 20, 10),
      page: parseInt(req.query.page || 1, 10)
    }

    const posts = await Post.paginate({}, options)

    return res.send(posts)
  } catch (e) {
    return handlePageError(res, e)
  }
})
```

### Tổng kết
Trong bài viết trên, mình đã chia sẻ cách tạo một bộ API bằng Node.js với Express để thao tác cơ bản với dữ liệu lưu trong MongooseDB. Trong quá trình thực hiện theo tut trên, nếu bạn có gặp bất cứ thắc mắc nào. Vui lòng comment xuống phía để chúng ta cùng trao đổi và thảo luận. Cảm ơn mọi người đã đón đọc!

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***