Trước đó bạn có thể đang tò mò về Next.js, [vào đây luôn bạn ơi](https://viblo.asia/p/tai-sao-ban-nen-tim-hieu-nextjs-3P0lP0kglox)

(go)

![](https://images.viblo.asia/75836bfe-0451-4f3e-97d7-2bac5198b4a6.png)


## 1. How Routing works in Next.js

`Next.js` tự động xử lý tất cả các file với các đuôi `.js`, `.jsx`, `.ts` hoặc `.tsx` trong cây thư mục như một `route`.

Một trang trong Next.js là `React component` có `route` dựa trên tên `file` của nó.

Hãy xem xét cấu trúc thư mục này như một ví dụ:

```
├── pages
|  ├── index.js
|  ├── contact.js
|  └── my-folder
|     ├── about.js
|     └── index.js
```

Đường dẫn tương ứng của 4 page:

`index.js` nhận url là `http://localhost:3000`

`contact.js` nhận url là `http://localhost:3000/contact`

`my-folder/index.js` là page sub-folder trong folder chính, nên nhận url `http://localhost:3000/my-folder`

`my-folder/about.js` tương tự, thì sẽ nhận url `http://localhost:3000/my-folder/about`

## 2. How to link between pages

Theo mặc định, Next.js `pre-render` mọi trang để làm cho ứng dụng của bạn nhanh và thân thiện với người dùng [(tham khảo thêm)](https://nextjs.org/docs/basic-features/pages#pre-rendering).

Nó sử dụng `Link component` được cung cấp bởi `next/link` để cho phép chuyển đổi giữa các `route`.

```js
import Link from "next/link"

export default function IndexPage() {
  return (
    <div>
      <Link href="/contact">
        <a>My second page</a>
      </Link>
      <Link href="/my-folder/about">
        <a>My third page</a>
      </Link>
    </div>
  )
}
```

Trên ví dụ trên, chúng ta hiện có 2 routes

`/contact` có url  `http://localhost:3000/contact`

`/about` có url `http://localhost:3000/my-folder/about`

`Link component` có thể nhận một số thuộc tính, nhưng chỉ thuộc tính `href` là bắt buộc.

Ở đây, chúng ta sử dụng thẻ `<a></a>` làm thành phần con để liên kết các trang.

Ngoài ra, bạn có thể sử dụng bất kỳ phần tử nào hỗ trợ sự kiện `onClick` trên `Link component`

## 3. How to pass route parameters

Next.js cho phép bạn chuyển các `params` của `route` và sau đó lấy lại dữ liệu bằng cách sử dụng hook `useRouter` hoặc `getInitialProps`.

Nó cung cấp cho bạn quyền truy cập vào `route object` có chứa các `params`.

```js
index.js

import Link from "next/link"

export default function IndexPage() {
  return (
    <Link
      href={{
        pathname: "/about",
        query: { id: "test" },
      }}
    >
      <a>About page</a>
    </Link>
  )
}
```

Như bạn có thể thấy ở đây, thay vì nhập `string` cho thuộc tính `href`, chúng ta truyền vào một `object` có chứa thuộc tính `pathname`.

Đây cũng chính là `route`, cùng với params truy vấn `(query)` chứa dữ liệu `({ id: "test"})`.

```js
# about.js

import { useRouter } from "next/router"

export default function AboutPage() {
  const router = useRouter()
  const {
    query: { id },
  } = router
  return <div>About us: {id}</div>
}
```

Ở đây, chúng tôi `import` hook `useRouter` để lấy dữ liệu được truyền vào.

Tiếp theo, chúng tôi lấy dữ liệu đó từ `query object` bằng cách sử dụng `destructuring` [(tham khảo thêm)](https://viblo.asia/p/nhung-concept-javascript-ban-can-biet-truoc-khi-hoc-react-RQqKLOGz57z#_43-rest-properties-11).

Nếu bạn đang sử dụng `server-side rendering`, bạn nên sử dụng `getInitialProps` để lấy dữ liệu.

```js
export default function AboutPage({ id }) {
  return <div>About us: {id}</div>
}

AboutPage.getInitialProps = ({ query: { id } }) => {
  return { id }
}
```

## 3. Dynamic routes

Next.js cho phép bạn xác định các `route động` trong ứng dụng của mình bằng cách sử dụng dấu ngoặc vuông ([param]).

Thay vì đặt tên tĩnh trên các trang của mình, bạn có thể sử dụng tên động.

Ví dụ:

```
├── pages
|  ├── index.js
|  ├── [slug].js
|  └── my-folder
|     ├── [id].js
|     └── index.js
```

Next.js sẽ lấy các `route params` được truyền vào và sau đó sử dụng nó làm `tên` cho route đó

```js
# index.js

export default function IndexPage() {
  return (
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/[slug]" as="/my-slug">
          <a>First Route</a>
        </Link>
      </li>
      <li>
        <Link href="/my-folder/[id]" as="/my-folder/my-id">
          <a>Second Route</a>
        </Link>
      </li>
    </ul>
  )
}
```

Ở đây, chúng ta phải xác định giá trị trên thuộc tính `as` vì đường dẫn là `động`.

Tên của `route` sẽ là bất cứ điều gì bạn đặt trên `as prop`.

```js
# [slug].js

import { useRouter } from "next/router"

export default function DynamicPage() {
  const router = useRouter()
  const {
    query: { id },
  } = router
  return <div>The dynamic route is {id}</div>
}
```

Bạn cũng có thể lấy các `route params` bằng hook `useRouter` trên `client` hoặc `getInitialProps` trên `server`.

```js
# my-folder/[id].js

export default function MyDynamicPage({ example }) {
  return <div>My example is {example}</div>
}

MyDynamicPage.getInitialProps = ({ query: { example } }) => {
  return { example }
}
```

Ở ví dụ trên, chúng ta đã sử dụng `getInitialProps` để lấy `route` động.

## 4. Dynamic nested routes

Với Next.js, bạn cũng có thể có `route` động lồng nhau `(nested)` cùng với các bằng dấu ngoặc vuông `([param])`

Hãy xem xét cấu trúc thư mục này:

```js
├── pages
|  ├── index.js
|  └── [dynamic]
|     └── [id].js
```

```js
# index.js

export default function IndexPage() {
  return (
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/[dynamic]/[id]" as="/my-folder/my-id">
          <a>Dynamic nested Route</a>
        </Link>
      </li>
    </ul>
  )
}
```

Như bạn có thể thấy ở đây, chúng ta đặt các giá trị động vào thuộc tính `as` như đã làm trong ví dụ trước.

Nhưng lần này, chúng ta phải xác định tên của `folder` và `file` của nó.

```js
import { useRouter } from "next/router"

export default function DynamicPage() {
  const router = useRouter()
  const {
    query: { dynamic, id },
  } = router
  return (
    <div>
      Data: {dynamic} - {id}
    </div>
  )
}
```

Cuối cùng, như các ví dụ trên, để lấy ra các `query object`, chúng ta sử dụng hook `useRouter`.

## 5. Kết luận

Trên là những tìm hiểu của mình về `route` trong `Next.js`, hi vọng giúp ích được cho mọi người 

Thanks for watching !!!

## 6. Tài liệu tham khảo

[Object and array destructuring](https://viblo.asia/p/nhung-concept-javascript-ban-can-biet-truoc-khi-hoc-react-RQqKLOGz57z#_43-rest-properties-11)

[Next.js pre-render](https://nextjs.org/docs/basic-features/pages#pre-rendering)

[Tại sao bạn nên tìm hiểu Next.js](https://viblo.asia/p/tai-sao-ban-nen-tim-hieu-nextjs-3P0lP0kglox)

[Next routing](https://nextjs.org/docs/routing/introduction)

[Next route for beginer](https://www.freecodecamp.org/news/routing-in-nextjs-beginners-guide)