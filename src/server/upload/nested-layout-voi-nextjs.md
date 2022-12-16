![](https://images.viblo.asia/c9457140-6d50-4c63-87d1-f6f84360df33.png)

Xin chào các bạn, lại là mình với câu chào cũ rích. Dạo gần đây mình đang tìm hiểu về `Nextjs`, nên hôm nay mình sẽ chia sẻ một chút về `nested layout` trong `Nextjs` vậy.

Thì trước khi tìm hiểu về nested layout, thì chúng ta hãy cùng đi giải thích về `Router` trong `Nextjs` đã. Trong `Nextjs`, thì việc quản lý `router` đều liên quan đến thư mục `pages`,  khi chạy dòng lệnh cài đặt `Nextjs`, thì tất cả mọi thứ đều đã được cài đặt, việc của chúng ta chỉ là cài đặt và chạy mà thôi.

```js
npx create-next-app nextjs-blog
```

Sau khi cài đặt và khởi chạy, bạn sẽ thấy thư mục `page`s trong `source code` của mình, hãy lưu ý đến nó, khác với `React router`,  `Nextjs` quản lý `router` của bạn bằng thư mục, ví dụ:
 - Bạn muốn một trang `about` để giới thiệu về trang web của mình ? => Thêm `about.js` vào trong thư mục `pages`
 - Bạn muốn một trang `service` để giới thiệu về những dịch vụ mà trang web bạn cung cấp ? => Thêm `service.js` vào thư mục `pages`
 - Bạn có một trang `blog`, nhưng trong `blog` lại có nhiều bài `post` như `first-post`, `second-post` => Tạo thư mục `blog` chứa 2 file `first-post.js`, `second-post`, sau đó đưa thư mục `blog` và trong thư mục `pages`

Mọi thứ trông có vẻ thật đơn giản nhỉ, mình sẽ tổng hợp một bảng để bạn dễ dàng so sánh hơn:


|Type |Folder |Url | 
| --------| -------- | -------- |
|**Index routes**| `pages/index.js`     | `/`     |
|| `pages/blog/index.js`     | `/blog`     |
|**Nested routes**| `pages/blog/first-post.js`     | `/blog/first-post`     |
|| `pages/dashboard/settings/username.js`     | `/dashboard/settings/username`     |
|**Dynamic route segments**| `pages/blog/[slug].js`     | `/blog/:slug (/blog/hello-world)`     |
|| `pages/[username]/settings.js`     | `/:username/settings (/foo/settings)`     |
|| `pages/post/[...all].js`     | `/post/* (/post/2020/id/title)`     |

Ơ, thế `Router` thì liên quan gì đến `NestedLayout` đâu nhỉ :thinking: ?

Thật ra thì `Router` còn thiếu một thứ mình chưa nhắc tới, đó là mình muốn tạo một trang có header thì phải làm như thế nào ?
{@embed: https://codepen.io/jonvadillo/pen/jwZvLL}

`Router` trong `Nextjs` không hỗ trợ trực tiếp cho ta giống như `React router`, mà phải `:code:` bằng "cơm" - thực ra thì cái nào cũng bằng cơm cả :rofl: Thì bây giờ mình sẽ hướng dẫn từng bước một nhé.

Trước tiên mình cần thêm `defaultLayout`, được dùng để `fallback` khi mà một trang nào đó không cần sử dụng `header` bên trên.
```js
import React from 'react';

export default DefaultLayout = ({ children }) => <>{children}</>;

```
Rồi tiếp theo mình cần thêm một layout nữa, có `header` - cái mà chúng ta cần:

```js
import Link from 'next/link';

const DocsLayout = ({ children }) => (
  <div className="docs-container">
    <div className="header">
      <h3>Docs</h3>
      <p>This is doc layout</p>
    </div>
    <div className="main">{children}</div>
  </div>
);

export default DocsLayout;
```

Rồi tiếp theo mình cần thêm một component để hiển thị `blog` nữa
```js
import DocsLayout from '../components/layout/doc';

const Doc = () => (
  <div className="docs">
    <h1>Page 1</h1>

    <p>...</p>
  </div>
);

Doc.Layout = DocsLayout;

export default Doc;
```

Sau đó, chúng ta cần override lại `App` của `Nextjs`, mình cần tạo file `_app.js` bên trong `pages`
```js
// pages/_app.js
import React from 'react';
import App from 'next/app';
import DefaultLayout from '../components/layout';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const Layout = Component.Layout || DefaultLayout;

    return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
    );
  }
}

export default MyApp;
```

Bạn có thấy thắc mắc chỗ nào không, mình nghĩ là có đó:
```js
//doc.js
Doc.Layout = DocsLayout;

//_app.js
const Layout = Component.Layout || DefaultLayout;
```
 Tại sao mình lại cần hai cái này nhỉ, để mình giải thích nhé.
- Một `component` trong `React` đều là `Object`, việc mình gán `Doc.Layout = DocsLayout;` vào component `doc` là để tạo một `key: value` bên trong component đó, lúc đó object sẽ tương tự như thế này: 
    ```js
        const Doc = {
            ...
            Layout: DocsLayout
        }
    ```
- Việc mình thêm điều kiện ở `_app.js` là để kiểm tra xem, bên trong một `component` được `render` ra trang web có chứa `key` là `Layout` hay không, nếu có hãy lấy `Layou`t đó ra làm `layout` bao bọc bên ngoài `component`. Còn nếu không, thì hãy sử dụng `DefaultLayout` mà mình đã khởi tạo bên trên vào.

Logic của chúng ta chỉ có thế, vì Viblo không thể embed được link codesanbox, nên mình sẽ để link ở [đây](https://codesandbox.io/s/hungry-water-kw94z) cho bạn tìm hiểu nhé :hugs: Cảm ơn các bạn đã đọc bài của mình :bow: