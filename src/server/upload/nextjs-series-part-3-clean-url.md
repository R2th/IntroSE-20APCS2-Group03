Trong bài viết này chúng ta sẽ tìm hiểu về cách làm việc với URL trong Next

## Clean URLs với Route Masking
Làm cách nào để thay vì navigate đến page Post bằng url http://localhost:3000/post?title=Hello%20Next.js ta có thể sử dụng url có dạng http://localhost:3000/p/hello-nextjs
Ta sẽ sử dụng đến một tính năng thú vị của Next.js đó là route masking. Về cơ bản, ta sẽ hiển thị một url khác trên trình duyệt thay vì url thật của app.

Hãy thử thêm route mask cho url đến blog post nhé.

Sử dụng code sau cho page Home.
```
import Layout from '../components/MyLayout.js'
import Link from 'next/link'

const PostLink = (props) => (
 <li>
   <Link as={`/p/${props.id}`}  href={`/post?title=${props.title}`}>
     <a>{props.title}</a>
   </Link>
 </li>
)

export default () => (
 <Layout>
   <h1>My Blog</h1>
   <ul>
     <PostLink id="hello-nextjs" title="Hello Next.js"/>
     <PostLink id="learn-nextjs" title="Learn Next.js is awesome"/>
     <PostLink id="deploy-nextjs" title="Deploy apps with Zeit"/>
   </ul>
 </Layout>
)
```

Ở element "<Link>" ta đã dùng một prop gọi là "as". Đó là URL mà ta muốn hiển thị trên trình duyệt còn URL mà ta muốn app xử lý đặt trong "href".

Tuy nhiên ta vẫn còn một vấn đề ở đó. Khi ta click vào link và chuyển đến page Post. Nếu bạn reload page thì bạn sẽ nhận lại được page 404. Đó là bởi vì phía server vẫn chưa hỗ trợ clean URL mà chúng ta vừa định nghĩa.
  
## Hỗ trợ clearn URLs phía server
### Deploy Next.js app
Bạn có thể deploy một app Next.js ở bất cứ nơi nào bạn có thể chạy Node.js.

Đầu tiên ta cần build app Next.js cho production thông qua việc chạy script.


```
"scripts": {
  "build": "next build"
}
```
Script này sẽ xuất ra một set code đã được optimize cho production.

Sau đó bạn chạy start app ở trên một port bằng việc chạy script.

"scripts": {
  "start": "next start"
}

Nó sẽ start app mặc định ở port 3000.
Nếu bạn muốn dùng một port khác thay vì 3000 bạn có thể truyền biến môi trường ví dụ PORT.
Sửa script ở package.json như sau:
```
"scripts": {
  "start": "next start -p $PORT"
}
```
Nếu bạn chạy script trên Windows start script sẽ là "next start -p %PORT%"
Sau đó start app bằng command sau:

```
PORT=8000 npm start
```
Trên Window sẽ phải cài thêm npm module cross-env vào app của bạn rồi chạy command.
```
cross-env PORT=8000 npm start
```

Bạn cũng có thể chạy đồng thời các instance của app ở trên các port khác nhau. Ví dụ, chạy đồng thời trên 2 port 8000 và 9000:
```
PORT=8000 npm start
PORT=9000 npm start

```

Để hỗ trợ clean URLs phía server, chúng ta sẽ tạo một custom server với express. 

### Cài đặt express
Đầu tiên cài đặt express
```
npm install --save express
```

Sau đó tạo file server.js
```
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { title: req.params.id } 
    app.render(req, res, actualPage, queryParams)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
```

Sửa script trong package.json


```
{
  "scripts": {
    "dev": "node server.js",
    "build": "next build",
    "start": "NODE_ENV=production node server.js"
  }
}
```
Ở đây ta đã assign biến môi trường NODE_EVN là production bằng việc chạy script.
```
NODE_ENV=production node server.js
```
Quay lại page http://localhost:3000/p/hello-nextjs bạn sẽ thấy page hiển thị nội dung khác so với khi click link post từ page Home.

Bởi vì req.params.id có giá trị khác với prop title param khi navigate dưới client. Tuy vậy trong thực tế ta cũng sẽ truyền id qua param phía client nên có thể sẽ không gặp trường hợp trên.