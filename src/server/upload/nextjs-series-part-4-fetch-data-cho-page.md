Trong thực tế ta thường cần fetch data từ remote source. Next.js cung cấp API giúp ta fetch data cho page với hàm async "getInitialProps".
Next.js có thể sử dụng hàm này ở cả phía client và phía server.
Trong phần tiếp theo này chúng ta sẽ build một app để show thông tin về Batman TV Shows sử dụng TVmaze API (http://www.tvmaze.com/api).

### Fetch Batman Shows
Ở code ví dụ trong [phần trước](https://viblo.asia/p/nextjs-series-part-2-su-dung-component-dung-chung-va-truyen-du-lieu-giua-cac-page-Az45bW1OKxY) chúng ta đang cho hiển thị một list blog post. Bây giờ thay vào đó ta sẽ cho hiển thị list Batman TV shows.

Chúng ta sẽ fetch list này từ TVMaze API.
Đầu tiên ta cần cài đặt isomorphic-unfetch, một thư viện hỗ trợ việc fetch data ở cả client và server.

```
npm install --save isomorphic-unfetch
```

Edit file "pages/index.js" với nội dung dưới đây:

```
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Index = (props) => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(({show}) => (
        <li key={show.id}>
          <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data
  }
}

export default Index
```

Khi mở lại tab http://localhost:3000 ta sẽ thấy list Batman TV Shows được hiển thị.

Trong hàm getInitialProps ta đã fetch data về và return data được fetch dưới dạng props {shows: data}.
Bạn có thể thấy length của data fetch về được in ra ở console của server thay vì console của trình duyệt. Đó là bởi vì page Home đã được render từ phía server.

### Tạo page Post
Bây giờ ta sẽ tạo page "/post" để hiển thị thông tin chi tiết về TV show.  
Đầu tiên ta sửa route "/p/:id" ở file "server.js" với nội dung dưới đây.

```
server.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { id: req.params.id }
    app.render(req, res, actualPage, queryParams)
})
```

Ở đây, ta đã thay param "title" trước đó bằng param "id".
Tiếp theo ta sẽ thay thế nội dung của file "pages/post.js" bằng nội dung dưới đây.

```
import Layout from '../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'

const Post =  (props) => (
    <Layout>
       <h1>{props.show.name}</h1>
       <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
       <img src={props.show.image.medium}/>
    </Layout>
)

Post.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()

  console.log(`Fetched show: ${show.name}`)

  return { show }
}

export default Post
```

Ở hàm getInitialProps ta đã sử dụng param là object context để access trường query. Từ query ta lấy ra được id để fetch thông tin chi tiết của show về.
Ta cũng dùng console.log() để in ra tên của show được fetch về. Nếu bạn đi đến page Post bằng việc click link ở page Home thì ta sẽ thấy log này ở trình duyệt (render ở client) còn nếu bạn đi đến page Post bằng việc enter URL trên trình duyệt hoặc reload page Post thì bạn sẽ thấy log ở phía server (render ở server).