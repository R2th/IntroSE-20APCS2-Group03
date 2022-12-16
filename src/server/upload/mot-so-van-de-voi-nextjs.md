### NEXTJS

NextJs là một framework nhỏ gọn giúp bạn có thể xây dựng ứng dụng Single Page App - Server Side Rendering với ReactJs một cách dễ dàng. Thực sự NextJs khá dễ tiếp cập, chúng ta chỉ cần có chút xíu kiến thức về `React/Redux` và `Nodejs/Express` thì chỉ cần bỏ ra thêm vài giờ là có thể sử dụng `NextJs` cơ bản được rồi. <br/>
Nên mình viết bài này, hy vọng có thể  chia sẻ một số vấn đề nhỏ mình mắc phải khi sử dụng NextJs, mà mò ở trang documents mãi không thấy, chứ không đi vào tìm hiểu cũng như demo các ví dụ mà trên documents của Nextjs đã có. :blush::blush::blush:
![](https://images.viblo.asia/0aa3232c-abd9-4ba9-90e9-c9d2b1a71022.png)

(**Update, vài điểm bài viết tại thời điểm viết bài cho đến hiện tại có thể không còn chính xác nữa, vì gần đây nextjs đã update lại khá nhiều so với thời điểm mình viết bài. Ví dụ như phần custom title bar. Hiện next đã hỗ trợ việc này rất dễ dàng với một built-in component  `head`...v.vv**)

### Cài đặt NextJs bằng create-next-app
Việc cài đặt NextJs tương đối đơn giản. Bạn có thể tìm thấy ở [trang chủ của NextJs](https://nextjs.org/learn/basics/getting-started/setup) cách cài đặt một NextJs project căn bản. Tuy nhiên cách này khá "thủ công", :joy: nên mình thích sử dụng `Create Next App` hơn. Bởi cách này cũng giống như khi sử dụng `Create React App` để tạo một React project vậy. Tiện dụng hơn, được xây dựng sẵn cấu trúc thư mục cơ bản và an toàn hơn nữa.<br/>
Bạn cài đặt `create-next-app` ở chế độ `global` và sau đó sử dụng `create-next-app` để tạo một project mới tên là `viblo-demo` như dưới đây:
```bash
npm install -g create-next-app
create-next-app viblo-demo
```
Ta được một project mới với cấu trúc thư mục như thế này:
![](https://images.viblo.asia/dee09c66-e33b-4521-a4e9-0a4a6f2755ab.png)
Sau đó start project của chúng ta lên 
```bash
cd vibo-demo/
npm run dev
```
Sau đó truy cập vào localhost cổng 3000 bạn sẽ thấy trang `Welcome to Next!`. 
### Tạo trang và điều hướng giữa các trang
  - Như vậy là ta đã có được một ứng dụng NextJs cơ bản. Như trong cấu trúc thư mục ở trên. Thư mục `pages` sẽ là nơi chứa các trang chính của ứng dụng. Ví dụ như trên có trang index. <br/>
 Nếu bạn muốn tạo thêm trang `about` chẳng hạn. Thì ta tạo thêm file `about.js` trong folder `pages`. 
Với mình, thì khi làm việc với project react. Mình hay tạo mội folder tên là `containers` trong đó chứa các components lớn - thường là các trang của ứng dụng như `details`, `shoppingCart`..v.v.. <br/>
Hiểu nôm na thì folder pages này cũng đóng vai trò tương tự như folder `containers` như khi làm việc với react thông thường của mình vậy.
Bây giờ ta hãy tạo một một file `about.js` tương ứng với trang `about` nhé. Với nội dung như dưới đây
```javascript
export default () => (
    <div>
        <p>This is the about page</p>
    </div>
)
```
Truy cập vào địa chỉ `localhost:3000/about` ta nhận được trang about với dòng chữ dòng chữ `This is the about page`
- Để điều hướng giữa các trang. Ở React ta sử dụng `react-router-dom` còn với NextJs ta sử dụng `next/link`. Thay thế nội dung trong file `index.js` như dưới đây:
```javascript
import Link from 'next/link'

const Index = () => (
  <div>
    <Link href="/about">
      <a>About Page</a>
    </Link>
    <p>Hello Next.js</p>
  </div>
)

export default Index
```
Truy cập vào trang chủ và nhấn vào link `About Page` 

![](https://images.viblo.asia/db9ce29b-fdeb-44e5-9eee-e5532e81b4e0.png)

Ta được chuyển đến trang about mà hoàn toàn không load lại trang ( hiển nhiên rồi :D :D :D )
Ở ví dụ trên, ta sử dụng `Link API` một API của `next/link` của NextJs, nó khá giống với `Link` của `react-router-dom` nhỉ ? 
```javascript
//  react-router-dom
<Link to="/about">
    About Page
</Link>

// next/link
 <Link href="/about">
    <a>About Page</a>
 </Link>
```

### Vấn đề với Custom Styling Components
Bạn có thể tham khảo thêm [tại đây](https://nextjs.org/learn/basics/styling-components). Mặc định, NextJs bắt chúng ta phải viết `Css` cho componets kiểu thế này:
```javascript
export default () => (
    <div>
        <p>This is the about page</p>
        <style jsx>{`
          p, a {
                font-family: "Arial";
              }
        `}
    </div>
)
```

Trông phát khiếp lên được, nhất là đối với một người kỹ năng css không được tốt như mình. Với cả, mình quen viết css kiểu này hơn.
```javascript
import 'classes' from './about.css'
export default () => (
    <div>
        <p className={ classes.Ptag } >This is the about page</p>
    </div>
)
```

Để viết được css kiểu này bạn cần cài thêm một plugin tên là `zeit/next-css`:
```bash
npm install --save @zeit/next-css

# Hoặc cài bằng yarn

yarn add @zeit/next-css
```

Sau đó, bạn cần tạo thêm một file tên là `next.config.js` ở ngay ngoài thư mục gốc của project với nội dung như sau:
```javascript
const withCSS = require('@zeit/next-css')
module.exports = withCSS()
```

Cuối cùng bạn tạo thêm một file tên là `_document.js` trong folder `pages` với nội dung như dưới đây:
 
 ```javascript
 import Document, { Head, Main, NextScript } from 'next/document'
import classes from './app.css';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
            <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
 ```
Chạy lại `npm run dev`. Thì khi đó chúng ta mới có thể viết css theo kiểu `import` như trên được.

### Làm thế nào để sử dụng Redux
Trên trang chủ documents của Nextjs cũng không có hướnng dẫn phần này. Nghĩa là chỉ hướng dẫn chúng ta sử dụng next với React "thuần". Trong khi mình lại muốn sử dụng `Redux` và `ImmutableJs`. <br/>
Nên sau một hồi tự cài `redux-thunk` các thứ không được - Vì Nextjs thiết lập state ở cả client và server nên không thể  `npm install` rồi sử dụng như cách mình vẫn làm được. 
Google trong đau khổ  một lúc, mình mới phát hiện ra một điểm thú vị, rằng tuy documents chính không nhắc đến, nhưng trang [Github](https://github.com/zeit/next.js) của Nextjs lại chứa những phần ví dụ khá đầy đủ. Bạn có thể truy cập vào [phần examples trên trang github của Nextjs](https://github.com/zeit/next.js/tree/canary/examples). Trong đó có sẵn rất nhiều project mẫu đủ mọi thứ chúng ta cần. Từ ví dụ `hello-world` đến sử dụng NextJs với `material-ui`, `redux-thunk`, `redux-saga`..v.v. Đều có cả :sweat_smile::sweat_smile::sweat_smile:

bây giờ, ta hãy tạo thử một project NextJs khác với `redux thunk` nhé 
```
npx create-next-app --example with-redux viblo-demo-with-redux
# Hoặc
yarn create next-app --example with-redux viblo-demo-with-redux
```
Trong đó, tham số  `--example` để `create-next-app` tạo sẵn cho chúng ta một vài components ví dụ mẫu. Tiện theo đó mà tham khảo. <br/>
Ta thu được project folder như hình dưới<br><br/>
![](https://images.viblo.asia/d2d5c65c-522d-4e91-a855-197f1364b721.png)<br/><br/>
Trong đó đã đính kèm ba components mẫu, trong folder components như trên hình gồm `clock.js`, `couter.js`, `example.js`
Chỉ cần xem qua những file này là có thể làm được. Bởi cách dùng `redux-thunk` với `NextJs` cũng tương tự như khi sử dụng thông thường chỉ khác mỗi component có thêm hàm để lấy staste từ server nếu request đến là `first request` - tức lần request đầu tiên người mà dùng truy cập vào ứng dụng của chúng ta. Thực ra cũng không cần quan tâm lắm. ( Có lẽ khi ứng dụng của mình phức tạp hơn thì mình cần mổ xẻ cái này đấy - chỉ là hiện tại mình chưa gặp vấn đề gì liên quan đến nó thôi. Dễ là như thế lắm :joy::joy::joy: )
```javascript
static getInitialProps ({ reduxStore, req }) {
    const isServer = !!req
    reduxStore.dispatch(serverRenderClock(isServer))

    return {}
  }
```


### Làm sao để sử dụng immutablejs
Để sử dụng [redux-thunk](https://github.com/reduxjs/redux-thunk) và [immutable](https://facebook.github.io/immutable-js/) trong `NextJs` ta tạo một project như sau
```bash
npx create-next-app --example with-immutable-redux-wrapper vibo-demo-with-immutable-redux-wrapper
# or
yarn create next-app --example with-immutable-redux-wrapper vibo-demo-with-immutable-redux-wrapper
```
Ta cũng sẽ thu được một project với một số components mẫu đi kèm, miễn là bạn có kinh nghiệm sử dụng React thì nhìn qua là hiểu liền hà. <br/>
Lưu ý là `state` của ứng dụng được lưu trong file `store.js` ngay ngoài thư mục gốc, trong đó đã bao gồm cả `actions`, `reducers` và `state` của ứng dụng. Nếu muốn cấu trúc lại, bạn chỉ cần vào sửa file `_app.js` là được.

### Làm sao để custom title trên tab bar
Điều này có thể không cần thiết lắm, nhưng nó thực sự khiến mình khó chịu. Mặc định NextJs sẽ hiển thị tab bar trên chrome như thế này.
![](https://images.viblo.asia/2a4decea-d8b8-49e7-b9ae-1e3d7d99ea99.png)

Nên muốn thêm icon hay đổi title ta phải tạo thêm một file tên là `_document.js` như ở phần `Vấn đề với Styling Components` ở trên:
 
 ```javascript
import Document, { Head, Main, NextScript } from 'next/document'
import classes from './app.css';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
            <title>Viblo is awesome</title>
            <meta charSet="utf-8" />
		        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
            <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body className="is-preload" id="is-body">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
 ```
###  Kết luận
Thực sự thì để giới thiệu hết thì rất dài, hơn nữa mình mới làm quen với `NextJs` qua một project nhỏ xíu và kinh nghiệm `React` cũng chưa có nhiều, nên cũng không có nhiều điều để viết. Còn những vấn đề như server router, làm đẹp url, lấy giá trị từ query string hay lazy loading..v.v. những cái đó có sẵn trên document. Bạn có thể xem qua một chút nhé. Cám ơn bạn đã dành thời gian cho bài viết của mình...
:kissing_heart::kissing_heart::kissing_heart: