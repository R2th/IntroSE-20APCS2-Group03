File uploads là một phần quan trọng trong ứng dụng web ngày này. Trong bài viết này, chúng ta sẽ cùng nhau xây dựng một function upload file nho nhỏ và đẩy lên **Firebase Cloud Storage** với sự kết hợp giữa Vue và Node.js.

## Set up Firebase project
Đầu tiên, chúng ta cần có một tài khoản firebase (chúng ta có thể đăng ký [tại đây](https://firebase.google.com/)). Truy cập https://console.firebase.google.com/ và tạo một project mới. Chọn **Storage** và lựa chọn location để tạo bucket mặc định.

Bây giờ, chúng ta cần kết nối với bucket bằng cách tạo ra một private key để bảo vệ kết nối. Trong project settings, click vào tab Service Accounts và click nút "Generate private key". Sau đó Firebase sẽ sinh ra một JSON file bao gồm credentials của tài khoản firebase.

## Node.js API
### Init node.js api
Để upload files chúng ta sẽ sử dụng package [**multer**](https://www.npmjs.com/package/multer) và **firebase-admin**.

```JS
npm i express multer firebase-admin
```

Tiếp theo chúng ta cần tạo một index.js webserver và import các dependencies. 

```JS
const express = require('express')
const multer = require('multer')
const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json({extended: false}))
app.post('/upload', (req, res) => {
    console.log("File upload API")
})

app.listen(3001, () => {
    console.log('🚀Server listening on port 3001')
})
```

Chúng ta xây dựng file upload API sử dụng multer cho việc upload file. Multer cung cấp `req.file` object bao gồm thông tin files và `req.body` bao gồm các trường dữ liệu. Chúng ta sẽ sử dụng `MemoryStorage` được cung cấp bởi multer.  

```JS
const upload = multer({
    storage: multer.memoryStorage()
})
app.use(upload.single())
```

Bây giờ chúng ta có thể truy cập thông tin file với `req.file`. Nếu muốn upload multiple files sử dụng `upload.any()` thay thế cho `upload.single()` và truy cập thông tin file với `req.files`.

`index.js` file:
```JS
const express = require('express')
const multer = require('multer')
const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json({extended: false}))

const upload = multer({
    storage: multer.memoryStorage()
})

app.post('/upload', upload.single('file'), (req, res) => {
    console.log("File upload API")
}

app.listen(3001, () => {
    console.log('🚀Server listening on port 3001')
})
```
### Connect to firebase

Chúng ta sẽ cần kết nối tới Firebase bằng cách tạo firebase.js để import firebase package và khởi tạo firebase admin SDK.

**`firebase.js`**
```JS
const admin = require('firebase-admin')

// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(<path to your firebase credentials file>),
  storageBucket: <firebaseprojectid>.appspot.com
})
// Cloud storage
const bucket = admin.storage().bucket()

module.exports = {
  bucket
}
```
### Upload files to firebase

Tiếp theo, chúng ta cần import bucket `firebase.js` đã khởi tạo ở trên vào `index.js`.
```JS
const firebase = require('./firebase')
```

Đầu tiên khi thực hiện upload file, chúng ta cần kiểm tra request thực sự tồn tại file tải lên hay không. Nếu request không tồn tại chúng ta sẽ trả về mã lỗi 400.
```JS
if(!req.file) {
        res.status(400).send("Error: No files found")
}
```

Firebase sử dụng **blobs** để lưa trữ dữ liệu mã nhị phân (**binary data**). blobs hay Binary Large Objects, là một tập hợp mã nhị phân được lưu trữ dưới dạng một thực thể (entity) trong database. Chúng ta có thể tạo một blob sử dụng bucket.file() với tên file upload.
```JS
const blob = firebase.bucket.file(req.file.filename)
```

Bây giờ, chúng ta cần tạo một luồng ghi dữ liệu (writable stream) trực tiếp để xử lý dữ liệu đến. Streams về cơ bản là tập hợp dữ liệu, nhưng nó không có sẵn cùng một lúc mà chúng ta cần xử lý từng đoạn một.

Chúng ta cần chuyển mimetype của tệp dưới dạng metadata nếu không chúng ta không thể đọc được dữ liệu với định dạng thích hợp.

```JS
cosnt blobWriter = blob.createWriteStream({
    metadata: {
        contentType: req.file.mimetype
    }
})
```

Chúng ta cần kiểm tra lỗi trong khi tạo luồng ghi dữ liệu bới sự kiện `error` trong `blobWriter`
```JS
blobWriter.on('error', (err) => {
    console.log(err)
})
```

Khi upload file thành công chúng tầ trả dữ liệu tới client với sự kiện `finish`
```JS
blobWriter.on('finish', () => {
    res.status(200).send("File uploaded.")
})
```

Và khi dữ liệu được xử lý hoàn toàn sự kiện `end` sẽ được gọi
```JS
blobWriter.end(req.file.buffer)
```

Như vậy chúng ta đã tạo xong Node.js API để upload files lên Firebase Cloud Storage. 

**`index.js`**

```JS
const express = require('express')
const multer = require('multer')
const firebase = require('./firebase')
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json({extended: false}))

const upload = multer({
    storage: multer.memoryStorage()
})

app.post('/upload', upload.single('file'), (req, res) => {
    if(!req.file) {
        return res.status(400).send("Error: No files found")
    } 

    const blob = firebase.bucket.file(req.file.originalname)
    
    const blobWriter = blob.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    })
    
    blobWriter.on('error', (err) => {
        console.log(err)
    })
    
    blobWriter.on('finish', () => {
        res.status(200).send("File uploaded.")
    })
    
    blobWriter.end(req.file.buffer)
})

app.listen(3001, () => {
    console.log('🚀Server listening on port 3001')
})
```

## Frontend với Vue.js

Chúng ta sẽ tạo frontend để thực hiện upload file với Vue.js. Tạo một input filed và một button để gọi tới API.
```JS
<input type="file" ref="file" v-on:change="handleUpload()"/>
<button v-on:click="uploadFile()">Upload</button>
```

Tiếp đó, cần thêm function `handleUpload` để kích hoạt khi người dùng chọn tệp tin. Khi người dùng chọn file `handleUpload` sẽ kích hoạt và input file sẽ được lưu vào biến.

```JS
<script>
  export default {
    data() {
        return {
            file: ''
        }
    },
    methods: {
      handleFileUpload(){
          this.file = this.$refs.file.files[0]
      },
      uploadFile(){
          
      }
    }
  }
</script>
```

Sử dụng `FormData` để tạo object chưa thông tin file và append file và formData.
```
const formData = new FormData()
formData.append("file", this.file)
```

Tên file phía backend API `upload.single(<field name>)` phải giống với tên file trong formData.

Cuối cùng, chúng ta có thể send file tới API với Axios để post dữ liệu.

```JS
axios.post('http://localhost:3001/upload', formData, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
}).then(response => {
    console.log(response.data)
}).catch(error => {
    console.log(error)
})
```

File `vue.js` cuối cùng:

```JS
<template>
  <div id="app">
    <input type="file" ref="file" v-on:change="handleUpload()"/>
    <button v-on:click="uploadFile()">Upload</button> <br>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data () {
        return {
          file: ''
        }
    },
    methods: {
        handleUpload() {
            this.file = this.$refs.file.files[0]
        },
        uploadFile() {
            const formData = new FormData()
            formData.append("file", this.file)
            axios.post('http://localhost:3001/upload', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(response => {
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>
```

Như vậy, chúng ta đã tạo thành công một ứng dụng upload file với Node.js và Vue.js tới Firebase.
 
 Chúng ta có thể lấy full code project [tại đây](https://github.com/vietpt-1430/upload-files-firebase) 

Nếu bạn có bất kỳ nghi ngờ nào hoặc cần làm rõ thêm, hãy cho tôi biết trong phần bình luận. Tôi rất vui được giúp bạn. Nếu bạn thấy bài viết này hữu ích hoặc thú vị, hãy xem xét giành tặng 1 upvote nhé.