Nếu bạn chưa biết cách hoạt động của Google Bot trong việc tối ưu hóa kết quả tìm kiếm, Server Side Rendering là gì, cũng như bài toán đặt ra cho React Single Page App và cách giải quyết, bạn có thể tham khảo bài viết [Is React SEO-Friendly?](https://rubygarage.org/blog/seo-for-react-websites) hoặc [How to Make React SEO-Friendly: an Extensive SEO Guide](https://yalantis.com/blog/search-engine-optimization-for-react-apps/).

## Bối cảnh

Trở lại với nội dung chính, thời gian này mình đang thiết kế và phát triển kỹ thuật cho một trong những sản phẩm của công ty. Sản phẩm của mình cung cấp một nền tảng cho nhà tuyển dụng, người lao động có khả năng kết nối và chia sẻ thông tin tuyển dụng, từ đó rút ngắn thời gian, chi phí, và tăng tỉ lệ tuyển dụng thành công cho cả hai bên. Ý tương tổng quan giống như Linkedin vậy. Một trong những specs quan trọng chính là bài toán về SEO, khi mà thông tin của nhà tuyển dụng lẫn người lao động có thể dễ dàng tìm kiếm trên các search engine, thậm chí là tối ưu hóa trở thành các kết quả tìm kiếm hàng đầu. Gatsby và Next trở thành các lựa chọn để xử lý bài toán. Và team mình đã chọn Gatsby (vì khá dễ sử dụng và hệ sinh thái tương đối trưởng thành).

Tuy nhiên, Gatsby vẫn có vấn đề. Gatsby thay vì sử dụng Server Side Rendering thuần túy, họ lại sử dụng Static Generation cho bản build production đầu cuối. Điều đó có nghĩa là: các trang tĩnh (static pages) và tài nguyên (resources) của chúng sẽ được tạo ra ở Build Time chứ không phải ở Runtime. Từ đó, việc tạo ra các trang profile, thông tin, thống kê,...liên quan tới user sẽ không được tạo ra một cách dynamically và programmatically.

Điều này có thể giải quyết bằng cách:

1. Tạo ra các template views + khai báo general pathname cho URL dẫn tới các templates đó. Ví dụ như path `/p/*` có thể dẫn tới component ProfilePage, khi đó user có thể request được vào url với path là `/u/<username>`. Logic component đó sẽ lấy username từ URL và request đi để lấy dữ liệu và render ra UI. Các này hoạt động bình thường, nhưng đáng tiếc là cách làm này lại chính là client side rendering, và page source vẫn hoàn toàn trống trơn.
2. Sử dụng PaaS/SaaS: Có rất nhiều PaaS support Gatsby, tạo ra các Pipelines cho phép build Gatsby ngay trên platform. Cách xử lý vấn đề này khá đơn giản, sử dụng một webhooks của platform đó, mỗi khi người dùng đăng ký, tạo trang profile hoặc tạo các thống kê,...hệ thống sẽ gọi webhooks, trigger rebuild ứng dụng. Tại build time, hệ thống có thể gọi vào API thông qua REST hoặc GraphQL để fetch lại các dữ liệu được sử dụng để tạo ra các static pages, từ đó generate ra các pages mới. Cách này cũng ổn, page source cũng rất đẹp, đáp ứng SEO miễn chê. Tuy nhiên việc rebuild ứng dụng không thực sự hiệu quả và có thể ảnh hưởng tới thời gian đáp ứng của ứng dụng. Mặc dù chỉ rebuild một hoặc vài phần liên quan và có các cache layer, nhưng như thế vẫn là chưa đủ!

Next.js sau đó cũng được cân nhắc với khả năng SSR. Tuy nhiên sau một vài cuộc họp, cùng với việc benchmark các specs liên quan, team mình nhận ra khả năng đáp ứng và performance của Next.js vẫn còn nhiều bất cập. Ngay trong [documentation](https://nextjs.org/docs/basic-features/pages) của Next cũng recommend sử dụng Static Generation và chỉ dùng SSR khi thực sự cần.

Bài toán lại trở về với Single Page App.

Và thế rồi trong một lần lướt Shopee trong đợt sale cùng với bạn gái, mình nhận ra Shopee cũng sử dụng Single Page App. Mình tò mò và có thử search trên Google về một số keyword trên trang. Kết quả trả ra theo một số dạng như:

- Sử dụng Google Service để boost một số static URL có liên quan. Kiểu search "áo thun shopee" thì sẽ trả ra một số kết quả từ Google Service và trong URL có chung chung là "áo".
- SEO các URL search với keyword. Cũng là search "áo thun shopee" thì sẽ ra các kết quả dạng như "[https://shopee.vn/search?keyword=%C3%A1o%20thun%20n%E1%BB%AF](https://shopee.vn/search?keyword=%C3%A1o%20thun%20n%E1%BB%AF)" hoặc "[https://shopee.vn/search?keyword=%C3%A1o%20thun%20nam](https://shopee.vn/search?keyword=%C3%A1o%20thun%20nam)".
- SEO các keyword về ngành hàng, gian hàng hoặc user có dính tới search keyword trên Google.

Với cách đầu tiên, việc optimized này không nature lắm, mà dùng third party services. Hai cái sau là SEO nature. Vậy thì dữ liệu để search từ đâu ra?

Mình trở lại Shopee và bắt đầu đào bới với View Page Source. Eureka!

Shopee đã serving một HTML source với một loạt các data object được nhúng vào trong object window thông qua một thẻ script ngay đầu trang, bên cạnh các metadata của trang. Các data object này chủ yếu chứa thông tin máy khách, khu vực, thông tin cài đặt của user cũng như là một list các user, gian hàng, ngành hàng, item references,... trong trang. Bạn có thể vào trực tiếp page source của Shopee để xem:

    view-source:https://shopee.vn/

![](https://images.viblo.asia/37aa7cb8-95fc-4631-b25b-6ee22f22bd7e.png)

Vậy là nếu như muốn các data object dữ liệu này được cập nhật liên tục và đồng bộ với dữ liệu hệ thống tại session đó, file HTML này phải được serving từ server. Hay nói cách khác chính là server side rendering.

Dù chắc chắn rằng mình không thể biết được kỹ thuật mà Shopee đã sử dụng hay có bí thuật, thủ pháp gì phía đằng sau, nhưng mình nghĩ kỹ thuật này không phải không thể reproduce, thậm chí là không khó.

## Thực hành

Sau một thời gian research cũng như forking một số example trên internet, đây là những gì mình có.

Các bạn có thể clone repo [bodetaima/ssr](https://github.com/bodetaima/ssr) (hoặc với Github CLI `gh repo clone bodetaima/ssr`) của mình về cho dễ theo dõi.

Cơ bản về ý tưởng sẽ là như thế này:

- Tạo ra một server Express cho phép serving static resource.
- Tạo ra một Redux Store hoàn toàn fresh mỗi khi có browser request với các actions fetching data từ các API, xây dựng một state tree phục vụ inject vào file HTML tại runtime.
- Sử dụng Webpack để bundle resource, phục vụ quá trình runtime inject.

Kết quả nhận được là page source bên phía client sẽ trông tựa tựa page source của Shopee, với các data object được inject vào window.

Cho đơn giản thì mình sẽ lấy dữ liệu từ một file [data.json](https://github.com/bodetaima/ssr/blob/master/assets/data.json). Data có thể được fetching tại runtime của Express server nhé, sau đó inject vào initial state của Redux.

Một app React bình thường có thể tìm thấy trong thư mục [src/app](https://github.com/bodetaima/ssr/tree/master/src/app) của repo.

Redux Store config tại thư mục [src/redux](https://github.com/bodetaima/ssr/tree/master/src/redux).

Config Babel và Webpack để biên dịch React và bundle resource:

.babelrc

```json
{
  "presets": ["@babel/env", "@babel/react"]
}
```

webpack.config.js

```javascript
const path = require('path');

module.exports = {
  entry: {
      client: './src/client.js',
  },
  output: {
      path: path.resolve(__dirname, 'assets'),
      filename: "[name].js"
  },
  module: {
      rules: [
          { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
      ]
  }
}
```

### Phía server

Mình sẽ cần 2 file `ssr.js` và `template.js` bên trong thư mục `src/`.

Logic quan trọng nhất của kỹ thuật này sẽ thực hiện tại file `ssr.js`

```javascript
import configureStore from './redux/configureStore'

module.exports = function render(initialState) {
  const store = configureStore(initialState)

  const preloadedState = store.getState()

  return { preloadedState };
}
```

1. Module này sẽ export ra một function, nhận vào một object initial state. Từ initial state, tạo ra một Store instance mới, lưu vào biến `store`.
2. Lấy state ra khỏi state tree của Redux bằng cách sử dụng method `getState()` của store instance được tạo phía trên.
3. Return state đó. Chúng ta sẽ pass state đó vào trong template của file HTML.

src/template.js

```javascript
export default function template(title, initialState = {}) {
  let page = `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="utf-8">
                <script>
                  window.__STATE__ = ${JSON.stringify(initialState)}
                </script>
                <title> ${title} </title>
                <link rel="stylesheet" href="assets/style.css">
              </head>
              <body>
                <div class="content">
                   <div id="app" class="wrap-inner">
                   </div>
                </div>

                <script src="assets/client.js"></script>
              </body>
              `;

  return page;
}

```

File này export một function. Function này nhận vào các metadata bạn cần (việc này có thể hoàn thành với React Helmet khi client request) hoặc bạn có thể pass chúng ở ngay đây. Ở đây mình sẽ pass title và state thôi. Template này sẽ gắn state vào `window.__STATE__` thông qua một thẻ `<script>`.

Lúc này client có thể access được state thông qua object window.

### Phía client

Phía client thì khá đơn giản

src/client.js

```javascript
import React from 'react'
import {hydrate, render} from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from './redux/configureStore'
import App from './app/app'

const state = window.__STATE__;

delete window.__STATE__;

const store = configureStore(state)

render(
  <Provider store={store} >
     <App />
  </Provider>,
  document.querySelector('#app')
)
```

Logic khá đơn giản. Khi client request vào trang, state sẽ được lấy ra từ object window. State đó sẽ trở thành initial state để tạo ra Store instance mà ta sẽ thực tế sử dụng trong ứng dụng. Để cho bảo mật hơn, chúng ta sẽ xóa state trong object window để không thể bị pirate từ third party scripts.

Vậy là xong.

### Kết hợp

app.js

```javascript
import express from 'express'
import path from 'path'
import template from './src/template'
import ssr from './src/ssr'
import data from './assets/data.json'

const app = express()

// Serving static files
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use('/media', express.static(path.resolve(__dirname, 'media')));

// hide powered by express
app.disable('x-powered-by');
// start the server
app.listen(process.env.PORT || 3000);

let initialState = {
  isFetching: false,
  apps: data
}

// server rendered home page
app.get('/', (req, res) => {
  const { preloadedState }  = ssr(initialState)
  const response = template("Server Rendered Page", preloadedState)
  res.setHeader('Cache-Control', 'assets, max-age=604800')
  res.send(response);
});
```

Một server Express được dựng lên, serving các static file như script được bundle từ webpack, css và media,...

Ở đây ta cũng làm các thao tác fetching data, từ đó tạo ra một initial state, truyền vào function ssr (đã define trong file `src/ssr.js`) để lấy ra preloadState. Một response được generate từ function template (return một đoạn html string, define trong file `src/template.js`). Một file HTML đã được gửi vào response.

Vì chúng ta sử dụng cú pháp module ES6 ở file này, nên ta cần tạo một file `index.js` sử dụng babel để biên dịch thành cú pháp CommonJS, đồng thời đây cũng là entry point cho toàn bộ ứng dụng.

index.js

```javascript
require("@babel/register")

require('./app')
```

Lúc này bạn có thể chạy lệnh `yarn start` để khởi tạo ứng dụng và xem kết quả.

![](https://images.viblo.asia/726b3b68-06b5-4664-9268-06ddbc24cd90.png)

Một page source hoàn chỉnh và "tương đối" giống với của Shopee mà chúng ta mong muốn. Mọi dữ liệu cần SEO hiện có thể access bởi Google Bot. Vậy là bước đầu đã hoàn thiện.

## Những vấn đề

Nếu bạn để ý, app React được sử dụng trong ví dụ khá là đơn giản với việc chỉ render ra một số component đơn giản. Đối với một ứng dụng hoàn chỉnh sẽ bao gồm cả React Router cũng như các kỹ thuật access utilities của browser. Nhưng đó cũng là khởi nguyên cho một số vấn đề mình đã gặp phải.

- BrowserRouter không thể hoạt động. Thay vào đó là tạo một memoryHistory và sử dụng với Router.
- Các kỹ thuật liên quan tới browser không thể thực hiện do toàn bộ code của React hiện giờ được execute trên môi trường Node. Không có localStorage, không có cookie,...
- (Đối với riêng bản thân mình) GraphQL Client không thể provide và sử dụng. Do GraphQL Client sử dụng fetch dưới logic, mà fetch lại là API của Browser, cho nên môi trường Node cũng không thể hoạt động.
- Vân vân và mây mây

Trở lại với Shopee, inspect page source của họ một lần nữa, mình phát hiện ra toàn bộ các scripts và resources ứng dụng đều được serving thông qua CDN. Có nghĩa là, với mỗi phiên bản production, họ sẽ cập nhật lại template, thay thế các nội dung đó bằng các CDN URL mới. Như vậy logic của hệ thống vẫn được bảo toàn, việc phát triển cũng được tách ra độc lập và kỹ thuật SSR vẫn phát huy được tác dụng mà không cần phải thay đổi quá nhiều.

![](https://images.viblo.asia/bbf3c429-193e-4a68-b30d-c747a1997624.png)

## Kết luận

Và trên đây cũng là những trải nghiệm của mình khi research hệ thống của Shopee để cải thiện khả năng SEO của trang web. Đây cũng hoàn toàn là quan điểm của mình, có thể đúng hoặc sai. Nếu có vấn đề gì, hãy góp ý với mình thông qua các kênh liên hệ như: <a target="blank" href="https://facebook.com/phongisntreal">Facebook</a> hoặc <a href="mailto:tranphongbb@outlook.com">email cho mình</a>. Cám ơn các bạn đã đón đọc.