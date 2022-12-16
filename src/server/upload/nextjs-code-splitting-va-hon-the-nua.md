NextJS là một react framework giúp chúng ta giải quyết các vấn đề mà một SPA `React` không làm được đó là

* `code splitting` cho từng page
* `pre-render` page and SEO
* kết hợp `server-side rendering` và `client-side rendering` tùy ý thí chủ.

Sự cơ động của NextJS mang lại cho chúng ta sự linh hoạt trong quá trình xử lí mutilple `page` thay vì `single` page như `SPA`.

Nhưng một `aplication` có nhiều pages vậy cơ chế điều hướng giữa các page, NextJS sẽ sử lí thế nào. Chúng ta cùng nghiên cứu làm sáng tỏ vấn đề này nhé.

Trong NextJS `page` liên quan đến `Route` thông qua `file-name`  chúng ta xét một ví dụ sau:

```js
pages/index.js is tương đương / route.
pages/posts/first-post.js tương đương /posts/first-post route.
```

Tức là sao, mỗi khi chúng ta `access` url  giả sử là `localhost` trên browser  thì NextJS nó sẽ tìm trong `pages/index.js` nếu có `index.js` trong `page` thì nó sẽ render và trả về content bao gồm `html + css`.  Ngược lại nếu không tìm thấy `pages/index.js` NextJS sẻ trả về page `404`.

Bây giờ muốn đi từ `pages/index.js` sang `pages/posts/first-post.js` thì phải làm sao?

NextJS cung cấp sẵn cho chúng ta một `next/link` cho phép chuyển từ page này sang page khác một các dễ dàng với cú pháp đơn giản sau 

``` js
import Link from 'next/link'

<Link href="/posts/first-post"><a>this page!</a></Link>
```

`Link` ở đây là tương tự như thẻ `a` trong `html`. Vậy tại sao lại không dùng thẻ `a` mà phải dùng component [next/link](https://nextjs.org/docs/api-reference/next/link) chúng ta cùng tìm hiểu tiếp vấn đề này nhé.

Để tăng performance NextJS đã sinh ra cơ chế  `code splitting` cho từng page, tức là khi vào một page bất kì nào đó, hắn chỉ cho load đúng những gì cần thiết trên page đó. Nếu dừng lại ở đó, NextJS không khác gì chúng ta load `html + css` cho từng page, nhưng không NextJS còn có thêm một cơ chế mà mình thấy khá hay có thể nói là tính năng đặc sắc mang thương hiệu trong NextJS đó là `Client-Side Navigation`.

Vậy chúng hoạt động thế nào, chúng ta tiếp tục tìm hiểu nào

 `pages/index.js`  tức home page chúng ta có một link sang `first-post` page như sau
 
```js
const Home = () => {
  return <h1>Read <Link href="/posts/first-post"><a>this page!</a></Link> </h1>
}
```

Code First post

```js
const FirstPost = () => {
  return <h1>First post <Link href="/"><a>Back to home</a></Link> </h1>
}
```

Trong ví dụ trên chúng ta đang điều hướng hai page là `Home` và `FirstPost` page.  Bây giờ ta thay đổi backgroud `Home` page sang `yellow` và bấm vào link `this page!` một điều kì diệu đã xảy ra, `FirstPost` page cũng có backgroud là `yellow`. Điều đó chứng tỏ điều gì, đó là Next không load lại hết trang và đó cũng là cơ chế hoạt động của `client-side navigation`

![](https://images.viblo.asia/ed908971-cfad-4a05-a6d3-543108d54ff7.gif)

 Bạn thử thay bằng thẻ `a` trong `Home` , `FirstPost`  và cũng làm tương tự trên, xem kết quả ra sao nhé :D

Vậy cơ chế của Next.js là gì nó chỉ tóm gọn trong một cụm từ đó là `Code splitting`, `client-side navigation` và `prefetching`.