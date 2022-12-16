Với những kiểu lưu trữ thông tin hình ảnh, video truyền thống hiện nay là lưu trực tiếp trên server, chúng ta có thể gặp một số vấn đề như server quá tải,  tràn bộ nhớ hay mất toàn bộ tài nguyên do hỏng hóc server gây ra nếu không được backup thường xuyên. 

Trên thực tế hiện nay chắc hẳn chúng ta cũng được nghe nói nhiều về dịch vụ điện toán đám mây (Cloud Service) phổ biến như Amazon S3, Google Could. Hiệu suất tăng đáng kể do giảm thiểu được request về phía server, điều này rất quan trọng đôi với các ứng dụng web có tải dữ liệu thường xuyên, hoặc một khổi lượng tài nguyên lớn. 

Không thể phủ nhận lợi ích mà chúng mang lại từ việc lưu trữ hình ảnh hay bất kì tệp tin nào khác trên Cloud Service nhưng chúng lại có một số nhược điểm là cấu hình phức tạp và yêu cầu phải có credit card.

Trong bài viết này, hãy cùng tôi tìm hiểu làm thế nào để upload và lưu trữ một tập tin trên Could Service với Node.js và React web app. Chúng ta sẽ sử dụng Cloudinary thay vì S3 hay Google Cloud vì chúng là miễn phí nhé.

# Khởi tạo
Bắt đầu thiết lập ứng dụng cơ bản như sau:
- Frontend sẽ tạo bởi [react-app](https://reactjs.org/docs/create-a-new-react-app.html), chạy port 3000
- Backend sử dụng node.js với [express-generator](https://www.npmjs.com/package/express-generator), chạy port 5000

Đừng quên cài đặt cors đúng cách để tránh các requests của bạn bị block bới backend. 
```
npm install cors
```

Thêm đoạn code sau vào **`app.js`**
```JS
const cors = require('cors');

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));
```

Tiếp theo cần tạo một thư mục `configs` trong thư mục backend. Trong đó sẽ chưa file config thông tin Cloudinary. Chúng ta nên tạo 1 file `.env` để chứa thông tin các biến môi trường tại đây với `dotenv` package.

```
npm install dotenv
```
Import package vào file `app.js`

```JS
require('dotenv').config()
```

# File Upload với Cloudinary

1.  Truy cập [Cloudinary](https://cloudinary.com/) tạo tài khoản và kích hoạth nó lên 
2. Sao chép các thông tin Cloud như: cloud name, API key, API Secret và paste chúng vào file `.env`

```JS
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

3. Install các thư viện npm cần thiết:

- **[cloudinary](https://www.npmjs.com/package/cloudinary)** - thư viện quản lý hình ảnh hoàn chỉnh
- **[multer](https://www.npmjs.com/package/multer)** - node.js middleware để xử lý `multipart/form-data`, được dùng để upload file
- **[multer-storage-cloudinary](https://www.npmjs.com/package/multer-storage-cloudinary)** - multer storage enegine cho Cloudinary

Cài đặt 3 package trên trong thư mục root của Frontend:
```
 npm install cloudinary multer multer-storage-cloudinary
```

Trong thư mục, `configs`, tạo file config `cloudinary.config.js` lưu trữ tất cả thông tin cấu hình bắt buộc để upload file thông qua ứng dụng:

```JS
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
```

`CloudinaryStorage` sẽ xác định các tệp tin nhận được bởi multer được lưu trữ - cụ thể là thư mục lưu trữ và loại tệp tin nào được lưu trữ.
Ứng dụng sẽ chỉ chấp nhận các định dạng bên trong `allowedFormats`. Trong ví dụ này, chúng ta sẽ chỉ upload hình ảnh ngoài ra bạn có thể lưu trữ được nhiều loại tệp tin khác. Có thể tham khảo các thuộc tính tùy chọn tại  [official upload API docs](https://cloudinary.com/documentation/image_upload_api_reference).

5. Tạo một route `/cloudinary-upload` để xử lý file upload.

```JS
const express = require('express');
const router = express.Router();
const fileUploader = require('../configs/cloudinary.config');

router.post('/cloudinary-upload', fileUploader.single('file'), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
 
  res.json({ secure_url: req.file.path });
});

module.exports = router;
```
Thông tin route trả về một Json bao gồm một `secure_url`. Giá trị của `secure_url` là một URL của file đã được upload lên cloud. Nó sẽ được sử dụng để hiển thị trên trình duyệt.

Đừng quên thêm route vào `app.js`:
```JS
const uploadRouter = require('./routes/upload');

app.use('/uploads', uploadRouter);
```



Tạo một file **`service/uploads`** với API được định nghĩa sau:
```JS
import axios from 'axios'
const API_URL = "http://localhost:3000"

cloudinaryUpload = (fileToUpload) => {
    return axios.post(API_URL + '/cloudinary-upload', fileToUpload)
    .then(res => res.data)
    .catch(err => console.log(err))
}

export default cloudinaryUpload
```


Tạo một Input file với style tùy chọn và tạo một function xử lý file:

```JS
const App = () => {
  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("file", e.target.files[0], "file");
    cloudinaryUpload(uploadData)
  }
  
  return (
    <div style={container}>
      <div style={{ margin: 10 }}>
        <label style={{ margin: 10 }}>Cloudinary:</label>
        <input
          type="file"
          onChange={(e) => handleFileUpload(e)}
        />
      </div>
    </div>
  );
};
```

Nó chỉ có thể upload tệp tin lên data structure với `multipart/form-data` enctype. Do đó, nó cần thêm vào DataForm để nó gửi lên backend. Ngoài ra, thay vì một input field, bạn có thể sử dụng một form component miễ là bạn thêm thuộc tính enctype thích hợp.


# Run App
Nếu bạn chạy server và client, bạn có thể upload một hình ảnh thông qua trình duyệt:
![](https://images.viblo.asia/78d8fa35-6a4c-430a-a2a3-bfe752d2822b.png)

và sau khi quá trình upload hoàn thành, chúng ta có tên file đã được upload lên Cloudinary. Khi chúng ta ghé thăm Cloudinary

![](https://images.viblo.asia/3e4680fd-cd70-4ce8-a5d5-2fcd3721c2a7.png)

# Hiển thị hình ảnh
Tiếp theo chúng ta cần hiển thị nó lên trình duyệt. Lưu ý rằng, `/uploads` đã trả về đường dẫn tệp tin tương ứng với URL của hình ảnh đã được tải lên Cloud. Chúng ta sẽ sử dụng nó để set đường dẫn cho `img` component với React Hooks:
```JS
router.post('/cloudinary-upload', fileUploader.single('file'), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  const newImage  = new UploadedFile({title: req.file.filename, fileUrl: req.file.path})
  newImage.save((err) => {
    if (err) {
      return res.status(500)
    }
    res.json({ secure_url: req.file.path })
  })
});
```

Và đây sẽ là kết quả 
![](https://images.viblo.asia/8f9f3565-1c9e-4cf9-9518-60828b4bba4e.png)

Như vậy, cho dù bạn có xóa tệp tin ddax được upload từ máy tính, hình ảnh sẽ vẫn được hiển thị trên trình duyệt vì chúng đã được lưu trữ trên Cloud Service.

# Kết luận
Bạn có thể sử dụng một cloud serrvice, như Cloudinary để lưu trữ bất cứ tệp tin vào trên cloud thay thế cho phương pháp lưu trữ truyền thống. Bạn cũng có thể cho phép người dùng upload file của họ thông qua app và hiển thị chúng trên client với một đường dẫn liên kết. Quá đơn giản phải không ạ. 

Amazon S3, Google Cloud cũng sẽ được triển khai tương tự như Cloudinary Cloud vì vậy nên các bạn cũng có thể tự tích hợp S3 và Google Cloud cho ứng dụng của mình. Hy vọng bài viết này sẽ giúp đỡ được nhiều cho bạn. 

> **Nguồn tài nguyên**
> 
> [Cloudinary npm package](https://www.npmjs.com/package/cloudinary)
> 
> [Multer npm package](https://www.npmjs.com/package/multer)
> 
> [Multer-storage-cloudinary npm package](https://www.npmjs.com/package/multer-storage-cloudinary)
> 
> [Cloudinary cloud service](https://cloudinary.com/)
> 
> [React Image Upload Example](https://academind.com/tutorials/reactjs-image-upload/)