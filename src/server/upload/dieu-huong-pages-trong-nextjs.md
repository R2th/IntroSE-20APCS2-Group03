### 1. Tạo nhanh Nextjs App
Để tạo Nextjs App, mở terminal và vào thư mực bạn muốn tạo. Chạy dòng lệnh sau:

```
npx create-next-app next-page-navigation
```

Chạy môi trường dev. `cd` vào thư mục
```
cd next-page-navigation
```
Chạy dòng lệnh sau
```
npm run dev
```
Hãy xem nó hoạt động ổn chưa bằng cách vào `http://localhost:3000` trên trình duyệt của bạn.
### 2. Cách tạo Pages trong Nextjs
Trong `Nextjs`, một page là 1 React Component được `export` từ những file trong thư mực `pages`.
Những page được thiết lập dựa vào tên file của nó. ví dụ
- `pages/index.js` tương ứng với route `/`
- `pages/posts/first-post.js` tương ứng với route `/posts/first-post`

Bạn đã có file `pages/index.js`, hãy tạo thêm `pages/posts/first-post.js` xem nó hoạt động ra sao.
Thêm đoạn code sau vào file `first-post.js`:
```javascript
export default function FirstPost() {
  return <h1>First Post</h1>
}
```
Và giờ hãy thử vào `http://localhost:3000/posts/first-post` xem nó có hoạt động không.

Bạn có thể tạo ra những page khác tương tự như cách trên. 
### 3. Link Component
Khi liên kết giữa những page, bạn thường sử dụng thẻ `<a>`.
Ở trong Nextjs, bạn sử dụng `Link` component từ `next/link` để bọc thẻ `<a>`. `Link` cho phép bạn điều hướng giữa những page khác nhau ở phía `client-side`

Mở `pages/index.js` và import `Link` từ `next/link` bằng việc thêm dòng code sau:
```javascript
import Link from next/link
```

Sau đó add dòng code sau ở line 25: 
```javascript
<h1 className="title">
  Read{' '}
  <Link href="/posts/first-post">
    <a>this page!</a>
  </Link>
</h1>
```
Vào `http://localhost:3000/` bạn sẽ thấy được dòng chữ `Read this page!`. Khi click sẽ điều tới route `http://localhost:3000/posts/first-post`
### 4. Điều hướng Pages phía Client-Side
`Link` component cho phép điều hướng phía `client-side` giữa những page với nhau trong `Next App`.

Điều hướng phía ` Client-Side` nghĩa là hiệu ứng chuyển page xử lý bằng Javascript, Nó nhanh hơn việc điều hướng mặc định bởi browser.

Cơ chế `Code splitting and prefetching`:
`Next` tự động `Code splitting`, mỗi page chỉ load những thứ cần thiết cho page đó. Nghĩa là khi Home Page đã được render, code của những page khác sẽ không cần load.

Ở trong môi trường Production, bất cứ khi nào `Link` xuất hiện trong màn hình user có thể nhìn thấy (browser'viewport) . Next sẽ tự động `prefetch` code cho page đó và lưu vào một nơi gọi là `background`. Khi click vào `Link`  thì code của page đó sẽ được lấy ra từ `background`.