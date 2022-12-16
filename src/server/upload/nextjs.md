![](https://images.viblo.asia/3d7ebf1a-f764-4442-a768-a461bdf17907.png)
# Next.js

### 1. Giới thiệu
Ngày nay, khi làm việc trên một ứng dụng JavaScript được cung cấp bởi React là tuyệt vời cho đến khi bạn nhận ra rằng có một vài vấn đề liên quan đến việc hiển thị tất cả nội dung phía người dùng.

- Đầu tiên, trang của bạn sẽ tốn nhiều thời gian hơn để có thể hiển thị nội dung cho người dùng, bởi vì trước khi nội dung được tải về, tất cả các file JavaScript cần được tải xong trước và ứng dụng của bạn cần chạy để xác định nội dung hiển thị trên trang. 
- Thứ hai, nếu bạn đang xây dựng một publicly avaiable website, nội dung của bạn bắt buộc phải SEO để nó có thể tới được người sử dụng cần cho nó nhất. Tuy ngày này các công cụ tìm kiếm đã hỗ trợ SEO trong các ứng dụng JavaScript. Nhưng bạn thử hình dung xem, giữa một ứng dụng hỗ trợ sẵn SEO theo cách truyền thông và một ứng dụng mà công cụ tìm kiếm phải Indexing để xử lý thì công cụ tìm kiếm sẽ ưu tiên phần nào hơn ? Dĩ nhiên sẽ ưu tiên trang web hỗ trợ content SEO HTML ngay từ đầu.

Cách giải quyết của cả hai vấn đề trên là `server rendering`, cũng có thế được gọi với cái tên `static pre-rendering`

Next.js cung cấp một cấu trúc chung cho phéo bạn dễ dàng xây dựng một ứng dụng Frontend React, và dĩ nhiên nó sẽ hỗ trợ việc sử lý server-side rendering một cách dễ dàng.

### 2. Các tính năng chính
Dưới đây là danh sách chưa đầy đủ các tính năng chính của Next.js cần thiết:
- Hot code reloading: Next.js sẽ tự động tải trang khi phát hiện bất cứ thay đổi nào được lưu lại.
- Automatic Routing: các file, URL được đưa vào hệ thống trong thư mục `pages` sẽ được tự động map với project mà không cần thêm bất cứ config nào.
- Server Rendering: bạn có thể render React component bằng server side, trước khi gửi HTML cho phía client.
- Ecosystem Compatibility: Next.js hoạt động tốt với hệ sinh thái của JavaScript, node và React.
- Automatic Code Splitting: Trang web sẽ được tạo ra chỉ với những thư viện và code JavaScript cần thiết, không cần phải import những thư viện không cần thiết.
- Dynamic Components: Bạn có thể imoprt các modules và React Component mộc cách tự linh hoạt (https://github.com/zeit/next.js#dynamic-import).
- Static Exports: Sử dụng `next export` command, Next.js cho phép bạn xuất một trong web tĩnh từ ứng dụng của bạn.
### 3. Cài đặt
Next.js hỗ trợ tất cả các nền tảng chính: Linux, macOS, Windows.
Cài đặt sử dụng npm:
```
npm install next react react-dom
```

Cài đặt sử dụng Yarn:

```
yarn add next react react-dom
```
### 4. Làm quen với Next.js
Đầu tiên chúng ta sẽ bắt đầu với một project đơn giản.

Tạo folder nextjs-tmp với 1 file `package.json` có nội dung:
```
{
  "scripts": {
    "dev": "next"
  }
}
```
Chạy lệnh: 
> npm run dev

Và tuyệt vời, terminal báo log 
```
> @ dev /home/nguyen.van.hungb/Documents/tmp/nextjs-tmp
> next

> Couldn't find a `pages` directory. Please create one under the project root
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! @ dev: `next`
npm ERR! Exit status 1
npm ERR! 
npm ERR! Failed at the @ dev script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     /home/nguyen.van.hungb/.npm/_logs/2018-11-22T08_05_18_308Z-debug.log
```

Không sao cả, bạn chỉ cần tạo thư mục `pages` bên trong project và chạy lại lệnh `npm run dev`.

Kết quả đầu tiên:
```
➜  nextjs-tmp npm run dev

> @ dev /home/nguyen.van.hungb/Documents/tmp/nextjs-tmp
> next

✔ success server compiled in 116ms
✔ success client compiled in 769ms


 DONE  Compiled successfully in 1245ms                                  15:05:36

> Ready on http://localhost:3000


 WAIT  Compiling...                                                     15:05:36

✔ success client compiled in 38ms


 DONE  Compiled successfully in 115ms                                   15:05:36

Client pings, but there's no entry for page: /_error
Client pings, but there's no entry for page: /_error
Client pings, but there's no entry for page: /_error
Client pings, but there's no entry for page: /_error
Client pings, but there's no entry for page: /_error
```

Truy cập `localhost:3000` để kiểm tra kết quả.
![](https://images.viblo.asia/6cb26d92-7196-4bc5-ba54-9c65c3aa4c93.png)https://images.viblo.asia/6cb26d92-7196-4bc5-ba54-9c65c3aa4c93.png
Đừng lo về log `no entry for page: /_error`  và lỗi 404. Vì thực ra bạn chưa code gì bên trong đó mà :) 

**Tạo 1 pages đơn giản với next.js**
- Bên trong thư mục pages tạo 1 file `index.js` với nội dung:
```
export default () => (
  <div>
    <p>Hello World!</p>
  </div>
)
```
Quay trở lại browser, và kiểm tra kết quả nào :D.

### Server-side rendering
Mở project trên trình duyệt,  kiểm tra sources của trang bằng cách: `View -> Developer -> View Source`

Bạn có thể thấy code HTML đã được tự động sinh gửi sang page source. Thay vì render bởi phía client, code HTML đã được sinh ra từ phía server.

**Tạo trang thứ hai**

Chúng ta sẽ tạo 1 page khác, bạn tạo file `pages/contact.js` với nội dung: 
```
export default () => (
  <div>
    <p>
      <a href="mailto:my@email.com">Contact us!</a>
    </p>
  </div>
)
```

Truy cập ` localhost:3000/contact` bạn sẽ thấy kết quả. Cực kì đơn giản phải ko :D

### Hot Reloading

Để ý một chút, bạn không hề phải khởi động lại npm hay config thêm bất cứ thứ gì để có thể reload lại code mới nhất. Next.js đã làm điều đó thay cho bạn.

### CLIENT RENDERING
Server redering có vẻ tiện lợi trong lần đầu tải trang để khắc phục các yêu cầu tôi đã nêu ở trên. Nhưng khi điều hướng và xử lý bên phía người sử dụng, client rendering là chìa khóa tất yếu để có thể tăng tốc tải trang và tăng tính trải nghiệm người dùng.

Sửa file index.js với nội dung:

```
import Link from 'next/link'

export default () => (
  <div>
    <p>Hello World!</p>
    <Link href="/contact">
      <a>Contact me!</a>
    </Link>
  </div>
)
```

Không cần thiết phải tải lại trang, bạn truy cập localhost:3000 để kiểm tra kết quả.
Đây là một ví dụ của next.js sử dụng routing, next.js cũng hỗ trợ đầy đủ cho API-history(có nghĩa là khi người dùng sử dụng client-rendering mà vẫn có thể sử dụng nút back - next của trình duyệt một cách bình thường)
## # DYNAMIC PAGES
Chúng ta sẽ tạo ra một blog đơn giản sử dụng next.js bởi đó là một ví dụ đơn giản mà hầu hết chúng ta ai cũng đã từng làm qua hoặc gặp phải. Hơn nữa, cách thức hoạt động của nó cũng khá đơn giản so với một ví dụ demo.

Ta sửa file index.js với nội dung:

```
import Link from 'next/link'

const Post = props => (
  <li>
    <Link href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)

export default () => (
  <div>
    <h2>My blog</h2>
    <ul>
      <li>
        <Post title="Yet another post" />
        <Post title="Second post" />
        <Post title="Hello, world!" />
      </li>
    </ul>
  </div>
)
```

> Bạn để ý kết quả trả về trong cả phần source developer

![](https://images.viblo.asia/03317980-4dbe-4624-8e42-2fe3bfd2bb76.png)

Tiếp theo tạo `post.js` bên trong folder `pages` với nội dung:
```
export default props => <h1>{props.url.query.title}</h1>
```

> Kết quả sau khi click vào link bên index.

![](https://images.viblo.asia/a53b4b75-f0d9-4f76-a149-a3fba1d73d10.png)

> Humm, để ý một chút, mọi thứ đang được đẩy lên url. Có vẻ hơi khó chịu khi mọi thứ đều được để lên đó ><. Không sao, bạn sửa file index.js với nội dung:

```
import Link from 'next/link'

const Post = props => (
  <li>
    <Link as={`/${props.slug}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)

export default () => (
  <div>
    <h2>My blog</h2>
    <ul>
      <li>
        <Post slug="yet-another-post" title="Yet another post" />
        <Post slug="second-post" title="Second post" />
        <Post slug="hello-world" title="Hello, world!" />
      </li>
    </ul>
  </div>
)
```
### CSS-IN-JS
Mặc định Next.js cung cấp hỗ trợ cho styled-jsx, nhưng bạn cũng có thể sử dụng thêm các thư viện hỗ trợ để có thể tổ chức css theo ý mình.

> ví dụ đơn giản với file contact.js:
```
export default () => (
  <div>
    <p>
      <a href="mailto:my@email.com">Contact us!</a>
    </p>
    <style jsx>{`
      p {
        font-family: 'Courier New';
      }
      a {
        text-decoration: none;
        color: black;
      }
      a:hover {
        opacity: 0.8;
      }
    `}</style>
  </div>
)
```

> Style được cố định lại trong component, nhưng bạn cũng có thể sử dụng trên toàn cục với từ khóa `global`:


```
export default () => (
  <div>
    <p>
      <a href="mailto:my@email.com">Contact us!</a>
    </p>
    <style jsx global>{`
      body {
        font-family: 'Benton Sans', 'Helvetica Neue';
        margin: 2em;
      }
      h2 {
        font-style: italic;
        color: #373fff;
      }
    `}</style>
  </div>
)
```

> Souce: https://github.com/Hungnv950/next.js-tmp

Trên đây mình đã giới thiệu qua về Next.js với một ví dụ đơn giản bằng sự tìm hiểu của mình. Hi vọng bài viết giúp ích cho bạn trong việc tìm hiểu về Next.js và ReactJS trong tương lai. Hãy để lại bình luận để có thể cùng nhau phát triển. Good luck!