Như chúng ta biết một trong những thế mạnh của Next.js là việc tạo các page nhanh. Bạn có thể tạo một page bằng cách export một React component và đặt component đó bên trong thư mục "pages". Page được tạo sẽ có URL cố định dựa trên tên file của component.
Vì page được export bản chất cũng là JavaScript module. Bạn có thể import những JavaScript component khác vào trong page đó.
Trong bài viết này ta sẽ tạo các component để dùng chung và bước đầu tìm hiểu cách truyền dữ liệu giữa các page.

## Tạo component

### Tạo Header Component
Từ ví dụ trong bài viết trước. Ta tạo thư mục "/components" để chứa các component dùng chung trong app và tạo component "Header.js" bên trong thư mục đó.

```
import Link from 'next/link'

const linkStyle = {
 marginRight: 15
}

const Header = () => (
 <div>
   <Link href='/' style={linkStyle}>
     <a>Home</a>
   </Link>
   <Link href='/about' style={linkStyle}>
     <a>About</a>
   </Link>
 </div>
)

export default Header
```
Component này có 2 link đến trang Home và trang About.

### Sử dụng Header Component
Tiếp theo ta import component Header vừa tạo vào trong các page. Chẳng hạn với page "index.js":
```
import Header from '../components/Header'

const Index = () => (
 <div>
   <Header />
   <p>Hello Next.js</p>
 </div>  
)

export default Index
```
Khi navigate đến http://localhost:3000 ta sẽ thấy header ở page index và có thể navigate giữa các page.

### Layout Component
Ta có thể thấy cả 2 page Home và About đều có chung layout. Ta có thể tạo một Layout component phục vụ cho việc layout các page.
Tạo component "MyLayout.js" trong thư mục "/components":

```
import Header from './Header';

const layoutStyle = {
 margin: 20,
 padding: 20,
 border: '1px solid #DDD'
}

export default (props) => (
 <div style={layoutStyle}>
   <Header />
   {props.children}
 </div>
)
``` 

Áp dụng layout này lên các page được tạo ví dụ page "index.js".
```
import Layout from '../components/MyLayout'

export default () => (
 <Layout>
   <p>Hello Next.js</p>
 </Layout>
)
```
Ta sẽ thấy style mới được áp dụng tại http://localhost:3000



## Tạo page động
Chúng ta đã tạo một app Next.js cơ bản với một vài page. 

Trên thực tế chúng ta cần tạo những page động để hiển thị nội dung động. Trước hết hãy thử việc này với query strings.

Từ code ví dụ ở phần trước, ta sẽ tạo một blog đơn giản. Page Home sẽ hiển thị list của tất cả các post. Khi click vào post title sẽ chuyển đến page detail của post đó.
### Tạo Home page
Đầu tiên ta sẽ thêm nội dung sau vào page Home.
```
import Layout from '../components/MyLayout.js'
import Link from 'next/link'

const PostLink = (props) => (
  <li>
    <Link href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)

export default () => (
  <Layout>
    <h1>My Blog</h1>
    <ul>
      <PostLink title="Hello Next.js"/>
      <PostLink title="Learn Next.js is awesome"/>
      <PostLink title="Deploy apps with Zeit"/>
    </ul>
  </Layout>
)
```
Chúng ta đang truyền data thông qua query string param mà trong trường hợp này là param "title" trong component PostLink.

```
const PostLink = (props) => (
 <li>
   <Link href={`/post?title=${props.title}`}>
     <a>{props.title}</a>
   </Link>
 </li>
)
```

### Tạo page Post
Bây giờ chúng ta sẽ tạo page Post để hiển thị nội dung của post. Để làm điều này, ta sẽ lấy ra title từ query strings.
Tạo file post.js trong thư mục /pages và thêm vào nội dung sau.

```
import { withRouter } from 'next/router'
import Layout from '../components/MyLayout'

export default withRouter((props) => (
 <Layout>
   <h1>{props.router.query.title}</h1>
   <p>This is the blog post content.</p>
 </Layout>
))
```
 
Ở đây ta đã sử dụng function withRouter của "next/router" và inject component với prop "router". Từ đó ta lấy ra được object query và data được truyền vào.
Chúng ta sẽ tiếp tục tìm hiểu thêm về clean URLs với Route Masking trong phần tiếp theo trong series này. Hẹn gặp lại các bạn.