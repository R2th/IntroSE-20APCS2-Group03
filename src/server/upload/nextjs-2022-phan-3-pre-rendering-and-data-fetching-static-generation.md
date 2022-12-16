## Ayyo, What's up man!!
Chào các bạn, chúng ta lại trở lại với chủ đề tiếp theo trong Series Next.js này đó là Pre-rendering và Data Fetching trong Next.js, và trong bài đầu của phần  Pre-rendering và Data Fetching, chúng ta sẽ tìm hiểu chi tiết về Static Generation.
## 1. Pre-rendering là gì?
- Pre-rendering: Next.js sẽ tạo trước HTML cho từng trang, thay vì tất cả được thực hiện ở client như Reactjs.
![](https://images.viblo.asia/be129f53-a445-4a43-89a9-43310f3bf08d.png)

- Có 2 loại Pre-rendering: Static generation và Server-side rendering
    - Static generation: HTML sẽ được generate tất cả ngay từ đầu và được sử dụng mỗi lần request.
    - Server-side rendering: HTML sẽ được generate mỗi lần request.
- Pre-rendering giúp trang web của chúng ta có hiệu năng và khả năng SEO tốt hơn

## 2. Static Generation 
- Là phương thức Pre-rendering mà khi đó HTML sẽ được tạo ra lúc build time (tạo ra ngay từ đầu).
- HTML cùng với tất cả data tạo nên nội dung của trang web được tạo khi từ trước, khi mà bạn build ứng dụng của mình.
- Là phương thức được Next.js đề xuất sử dụng
- Trang web của chúng ta được lưu trữ trong bộ nhớ cache bởi CDN và được cung cấp cho người dùng gần như tức thì.
- Phù hợp với các website: blog, docs, marketing, trang sản phẩm thương mại điện tử,...
                       ![](https://images.viblo.asia/ca8dfffb-65fe-4e02-bd82-aa194736717e.png)
        
### 2.1 Static Generation không có data 
- Đối với trường hợp page được tạo mà không cần lấy data từ bên ngoài (API, file system, ...), các trang sẽ được generate ngay từ lúc buildtime
![image.png](https://images.viblo.asia/6db37385-49f4-40b8-8b7c-7e5383171588.png)
### 2.2 Static Generation cùng data
- Không phải lúc nào mà các page của chúng ta cũng chỉ là HTML mà không có data từ bên ngoài, có thể bạn sẽ cần lấy data từ API của bên thứ 3, hay lấy từ  file system, ... và Next.js cũng hỗ trợ luôn.
 ![image.png](https://images.viblo.asia/88ba7adc-d32c-4da1-b304-9c1fbb4c2758.png)

**Static Generation with Data using `getStaticProps`**
- Nó hoạt động rất đơn giản thôi, khi mà bạn export 1 page component, cũng cũng có thể export 1 `async` function gọi là [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation):
    - `getStaticProps` sẽ chạy lúc build time
    - Ở trong function này thì bạn có thể gọi đến API bên thứ 3 để lấy data
- Code nó sẽ nhìn như thế này
```
export default function Home(props) { ... }

export async function getStaticProps() {
  // Lấy data từ bên ngoài (API, file, ...)
  const data = ...

  // Giá trị của props kia sẽ được truyền vào component Home
  return {
    props: ...
  }
}
```
- Đại khái chúng ta có thể hiểu đoạn code này sẽ là `getStaticProps` sẽ nói với Next.js
>     Này, Page này có 1 số data lấy từ bên ngoài, khi mà bạn pre-render lúc build time, bạn nhớ xử lý để mà trang Home kia lấy được sử dụng nhé. 

Ví dụ hoàn chỉnh: Ở đây mình tạo 1 file  `pages/post/index` , trong đó mình sẽ gọi dến API `https://jsonplaceholder.typicode.com/posts` để lấy ra data ở trong function `getStaticProps`, return ra 1 object props là `posts: data`, ở component `PostList` mình nhận props `posts`, đoạn này giống React bình thường thôi và dùng `posts` để render ra list posts.
```
import Link from 'next/link'

function PostList({ posts }) {
  return (
    <>
      <h1>List of Posts</h1>
      {posts.map(post => {
        return (
          <div key={post.id}>
            <Link href={`posts/${post.id}`}>
              <h2>
                {post.id} {post.title}
              </h2>
            </Link>
            <hr />
          </div>
        )
      })}
    </>
  )
}

export default PostList

export async function getStaticProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await response.json()

  return {
    props: {
      posts: data
    }
  }
}
```
**Static Generation with Dynamic Parameters**
- Ví dụ: Một trường hợp nữa là khi có 1 danh sách các bài đăng, chúng ta sẽ cần vào xem chi tiết bài đăng đó, thường thì ta sẽ dùng id của bài đăng đó và lấy ra chi tiết bài đăng, nhưng id đó được gọi là Dynamic Parameters
- Cùng xem đoạn code dưới đây để hiểu hơn về cách lấy data với Dynamic Parameters

```
// pages/posts/[postId].js

function Post({ post }) {
  return (
    <>
      <h2>
        {post.id} {post.title}
      </h2>
      <p>{post.body}</p>
    </>
  )
}

export default Post

export async function getStaticProps(context) {
  const { params } = context
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  )
  const data = await response.json()

return {
    props: {
      post: data
    }
  }
}
```
- Chúng ta tạo ra file `pages/posts/[postId].js` ở đây chúng ta sẽ có `postId` là params id của mỗi bài post, đây là Dynamic Parameters, đoạn code trên ở. `getStaticProps` thêm 1 params là `context`, và từ đó ta có thể lấy được `postId` để fetch được data của post với id ở trên đường dẫn, phần còn lại vẫn giống như ví dụ ở phần trên.
- Chúng ta cùng thử chạy đoạn code trên. Oppps lỗi rồi :) 
![](https://images.viblo.asia/5b4ccf4c-0fd1-47c0-997a-d6e1203745d6.png)
- Giờ Next.js yêu cầu chúng ta thêm `getStaticPaths`, ở đây, nếu bạn muốn dùng Dynamic Parameters với `getStaticProps`, bạn cần định nghĩa trước các đường dẫn được tạo, ví dụ mình lấy ra 1 list các bài post, mình muốn lấy data chi tiết của từng bài post theo id, mình sẽ cần khai báo trước cái list id post đó ở trong `getStaticPaths`
ví dụ: 
```
// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
  return {
    paths: [{ params: { postId: '1' } }, { params: { postId: '2' } }],
    fallback: false, // can also be true or 'blocking'
  }
}
```
- Có bao nhiêu bài đăng thì phần `paths` kia sẽ có từng đó id, chỉ cần thêm `getStaticPaths` bên trên vào file `pages/posts/[postId].js` là chúng ta có thể chạy mà không lỗi.
- Giờ mình sẽ sửa lại file đầy đủ

```
import { useRouter } from 'next/router'

function Post({ post }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h2>
        {post.id} {post.title}
      </h2>
      <p>{post.body}</p>
    </>
  )
}

export default Post

export async function getStaticProps(context) {
  const { params } = context
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  )
  const data = await response.json()

  if (!data.id) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      post: data
    }
  }
}

export async function getStaticPaths() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await response.json()
  const paths = data.map(post => {
    return {
      params: { postId: `${post.id}` }
    }
  })

  return {
    paths: paths,
    fallback: true
  }
}
```
- Và giờ chúng ta đã có thể xem chi tiết bài đặt rồi.
![](https://images.viblo.asia/0a482276-cbd7-4f8f-8feb-a603be4f4f5e.png)

- Ở đoạn code trên bạn sẽ thấy phần return ở `getStaticPaths` có `fallback`, vậy `fallback` là gì? chúng ta sẽ cùng tìm hiểu về `fallback` trong `getStaticPaths` luôn nhé. 

**`getStaticPaths` và fallback**
- fallback có 3 giá trị: 
    - fallback: false
    - fallback: true
    - fallback: 'blocking'
- Tìm hiểu chi tiết hơn tại: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-blocking
### 2.3 Một số lưu ý về getStaticProps
1. Lưu ý 1: 
-  `getStaticProps` chỉ chạy ở server side
- Function này sẽ không bao giờ chạy ở phía client
- Code viết trong  `getStaticProps`thậm chí sẽ không bằng trong js bundle được gửi đến browser
2. Lưu ý 2: 
- Có thể viết code server side trực tiếp trong `getStaticProps`
- Có thể thực hiện truy cập file system hoặc truy vấn database trong `getStaticProps` 
- Bạn cũng không phải lo lắng về việc lộ API key trong `getStaticProps` vì nó sẽ không được gửi về browser
3. Lưu ý 3: 
- `getStaticProps` sẽ chỉ chạy được ở trong `pages` mà không chạy được ở component thường
- Nó được sử dụng cho pre-rendering và không được sử dụng cho fetch data ở client-side
4. Lưu ý 4: 
- `getStaticProps` phải trả về 1 đối tượng và đối tượng phải chứa props key là 1 đối tượng
- Trong ví dụ trên mình return 1 object có key props và trong props là object với key là `posts`
5. Lưu ý 5: 
- `getStaticProps` sẽ chạy tạo build time
- Nhưng khi develop ở local, `getStaticProps` chạy mỗi lần được request.
### 2.4 Một số lưu ý về getStaticPaths
- Bạn nên sử dụng `getStaticPaths` nếu bạn đang pre-render các trang tĩnh và sử dụng dynamic routes và data được trả về từ headless CMS, database, 
- `getStaticPaths` phải được sử dụng với `getStaticProps`.
- Bạn không thể sử dụng `getStaticPaths` với `getServerSideProps`.
- Bạn có thể export `getStaticPaths` từ Dynamic Route cũng sử dụng `getStaticProps`.
- Bạn không thể export getStaticPaths từ tệp non-page (ví dụ: thư mục `components`).
- Bạn phải export getStaticPaths dưới dạng một hàm độc lập và không phải là một thuộc tính của page component.
## 3. Tổng kết
- Cuối cùng mình cũng viết được kha khá để chia sẻ với mọi người về Pre-rendering and Data Fetching, với phần đầu là về Static Generation ( SSG), về `getStaticProps` và `getStaticPaths`
- Các bạn có thể đọc thêm từ [docs của Next.js](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) để tìm hiểu kĩ hơn
- Phần sau mình sẽ chia sẻ về server-side rendering trong Next.js 

Mình có tham khảo ở website chính thức của [Next.js](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) và kênh Youtube [Codevolution](https://www.youtube.com/channel/UC80PWRj_ZU8Zu0HSMNVwKWw)

Cảm ơn các bạn đã theo dõi, mong nhận được ý kiến đóng góp của các bạn để có những kiến thức và bài viết tốt hơn!