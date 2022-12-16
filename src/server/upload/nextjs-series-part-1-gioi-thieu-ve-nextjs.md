Ngày nay, việc tiếp cận và phát triển một ứng dụng single-page app đối với người mới vẫn còn nhiều khó khăn.

Mặc dù có những tool để hỗ trợ việc khởi tạo như Create React App thì vẫn còn đó learning curve để bạn có thể phát triển một app hoàn chỉnh. Ví dụ như bạn sẽ phải học về client-side routing, page layout và nếu bạn muốn ứng dụng server-side rendering mọi thứ sẽ lại càng khó khăn hơn.

Bởi vậy chúng ta cần một giải pháp để đơn giản hóa vấn đề này.

Hãy nghĩ đến cách một webapp được tạo với PHP. Bạn tạo một vài files, viết một chút code PHP rồi deploy chúng. Bạn không cần lo về việc routing và app được render mặc định phía server.

Thay vì PHP, Next.js giúp ta xây dựng một app tương tự với JavaScript và React. Một số tính năng nổi bật của Next.js:
* Mặc định đã được render phía server
* Tự động split code để load page nhanh hơn
* Đơn giản hóa routing phía client (page based)
* Môi trường dev với webpack-based hỗ trợ Hot Module Replacement (HMR)
* Có thể implement với Express hoặc những Node.js HTTP server khác
* Dễ dàng customize với Babel và Webpack config

Nào hãy cùng xem các bước để tạo một app với Next.js nhé.

## Cài đặt
Next.js làm việc tốt trên Windows, Mac và Linux. Bạn chỉ cần Node.js cài đặt sẵn là có thể bắt đầu xây dựng một ứng dụng Next.js.

Bên cạnh đó bạn cũng cần một text editor và terminal để chạy một vài command.

Để bắt đầu, tạo một sample project sử dụng những command dưới đây.

```shell
mkdir hello-next
cd hello-next
npm init -y
npm install --save react react-dom next
mkdir pages
```

Tiếp đó mở file **package.json** và thêm vào những script NPM dưới đây.
```javascript
{
 "scripts": {
   "dev": "next"
   "build": "next build"
   "start": "next start"
 }
}
```

Mọi thứ đã sẵn sàng, chạy command dưới đây để start server dev.

```php
npm run dev
```

Mở tab http://localhost:3000 trên trình duyệt bạn sẽ thấy hiện ra một trang 404.

![](https://images.viblo.asia/7ce3439e-3b51-4183-8ebc-a3b50e76b39c.png)

Đừng lo vì chúng ta còn chưa implement page index để trả về mà. :)

## Tạo page đầu tiên
Tạo một file **index.js** trong thư mục **/pages** và thêm vào code dưới đây.

```javascript
export default () => (
 <div>
   <p>Hello Next.js</p>
 </div>  
)
```

Quay lại tab http://localhost:3000 bạn sẽ thấy page với text "Hello Next.js" hiện ra (ta sẽ gọi là page **Home**).

Ở đây ta đã export một React Component từ **pages/index.js**. Lưu ý rằng React Component cần được **export default**.

Bạn có thể thêm vào bao nhiêu page tùy ý. Ví dụ ta có thể tạo page **About** bằng cách thêm file **about.js** vào thư mục **/pages**.

```html
export default () => {
 <div>
   <p>This is the about page</p>
 </div>
}
```

Sau đó chuyển đến http://localhost:3000/about ta sẽ thấy page **About** được hiển thị. Bạn có thể đặt thẻ <a> từ trang index để chuyển đến page **About** tuy nhiên kiểu navigate này phải thông qua request đến server. Đây là điều chúng ta không mong muốn.

## Navigate giữa các page
Để hỗ trợ navigate ngay tại client, ta cần dùng Link API của Next.js được export qua "next/link".
Modify page **Home** để chứa link đến page **About** như dưới đây.

```javascript
import Link from 'next/link'

export default () => (
 <div>
   <Link href='/about'>
     <a>About</a>
   </Link>
   <p>Hello Next.js</p>
 </div>  
)
```

Ở đây chúng ta đã import Link từ **'next/link'** và dùng nó để link đến page **About**

```html
<Link href='/about'>
  <a>About</a>
</Link>
```

![](https://images.viblo.asia/77c24e10-5a85-4c5e-8379-d2d4e3cb6dd4.png)

Khi bạn click vào link **About page** nó sẽ navigate đến page **About** mà không cần gửi request đến server. Khi bạn click nút Back thì trình duyệt tự navigate từ page **About** về page **Home** cho bạn. Điều này có được là do **'next/link'** đã handle **location.history** cho bạn. Mọi thứ thật đơn giản.

Để style link bạn có thể thêm style attribute vào thẻ **<a>** như dưới đây.

```html
<Link href='/about'>
  <a style={{ fontSize: 20 }}>About</a>
</Link>
```

Chuyện gì xảy ra khi bạn thêm style attribute vào **<Link>**?

```html
<Link href='/about'  style={{ fontSize: 20 }}>
  <a>About</a>
</Link>
```

Bạn sẽ không thấy style đó được áp dụng lên link.
Lý do là vì **<Link>** thực chất là một Higher Order Component (HOC) và chỉ chấp nhận **href** và một vài props tương tự. Nếu bạn muốn style cho link bạn cần style component được wrap mà trong trường hợp này là thẻ **<a>**.
Cần lưu ý thêm component được wrap không nhất thiết phải là thẻ **<a>**. Bạn có thể sử dụng tùy ý các thẻ có nhận event "onClick" khác như **<div>**, **<span>**, **<button>**... bên trong **<Link>** và navigate đến page khác bình thường. Ví dụ:

```javascript
<Link href='/about' >
     <button style={{ fontSize: 20 }}>About</button>
 </Link>
```

Như vậy chúng ta cùng tìm hiểu qua về việc cài đặt, tạo page và navigate giữa các page. Trong bài viết tiếp theo ta sẽ tìm hiểu về cách sử dụng component trong Next.js. Cảm ơn các bạn đã theo dõi.

## Tham khảo
[Learn Next.js](https://nextjs.org/learn/)