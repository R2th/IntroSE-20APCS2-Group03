Trong bài viết này, chúng ta sẽ cùng nhau thực hiện render ứng dụng React.js ở phía server.

# 1. Setup environment
### Init project

```
$ mkdir ssr
$ npm init -y
```

### Install dependencies

```
$ npm i @babel/core@latest @babel/node@latest @babel/plugin-proposal-class-properties@latest @babel/preset-env@latest @babel/preset-react@latest @emotion/cache@latest @emotion/react@latest @emotion/styled@latest @emotion/server@latest @material-ui/core@next babel-loader@latest cross-env@latest express@latest nodemon@latest npm-run-all@latest react@latest react-dom@latest webpack@latest webpack-cli@latest
```

### Webpack config

```js
# webpack.config.js

const path = require('path');

module.exports = {
  entry: './client.js',
  mode: process.env.NODE_ENV || 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};

```

### .babelrc

```
# .babelrc
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

### Scripts

```json
package.json
 "scripts": {
    "start": "npm-run-all -p build serve",
    "build": "webpack -w",
    "serve": "nodemon --ignore ./build --exec babel-node -- server.js",
    "production": "cross-env NODE_ENV=production npm start",
    "post-update": "echo \"codesandbox preview only, need an update\" && yarn upgrade --latest"
  }
```

# 2. Setup express.js server

Tạo file server.js ở root

### server.js

```js
# server.js
import express from "express"

const app = express()

app.get("/", (req, res) => res.send("Hello world"))

const port = 3000
app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
```

Sau đó chạy:

```
$ npm run serve
```

Thử dùng trình duyệt truy cập http://localhost:3000

# 3. Server rendering React.js application

### Create React.js application with a App component

Tạo file `client.js` ở root với nội dung như sau

```js
# client.js
import * as React from "react"
import ReactDOM from "react-dom"
import App from "./App"

function Main() {
  return <App />
}

ReactDOM.hydrate(<Main />, document.querySelector("#root"))

```

Tạo file `App.js` ở root với nội dung như sau:

```js
#App.js
import * as React from "react"
export default function App() {
  return <div>SSR React App</div>
}
```

Cập nhật file `server.js` lại như sau:

```js
import express from "express"
import ReactDOMServer from "react-dom/server"
import * as React from "react"
import App from "./App"

const app = express()

function renderFullPage(html) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <script async src="build/bundle.js"></script>
        <div id="root">${html}</div>
      </body>
    </html>
  `
}

function handleRender(req, res) {
  // Render the component to a string.
  const html = ReactDOMServer.renderToString(<App />)

  // Send the rendered page back to the client.
  res.send(renderFullPage(html))
}

app.use("/build", express.static("build"))

// This is fired every time the server-side receives a request.
app.use(handleRender)

const port = 3000
app.listen(port, () => {
  console.log(`Listening on ${port}`)
})

```

Sau đó chạy: 

```
$ npm run serve
```

Truy cập vào http://localhost:3000 ta sẽ nhận được kết quả: SSR React App

Như vậy, ta đã thành công trong việc render một ứng dụng React.js ở phía server :100::100: nhưng khoan đã ! Làm thế nào chúng ta biết ứng dụng của mình đã render ở Server, rất đơn giản, bấm tổ hợp phím `Ctrl + U` để mở sourcecode của trang web lên xem. Và ta sẽ nhìn thấy ở giữa thẻ `#root` là thẻ `<div data-reactroot="">SSR React App</div>`. Điều này chứng tỏ, ứng dụng web của ta đã render đầy đủ các thẻ ở server và trả đầy đủ về phía client. :heart_eyes::heart_eyes:

# 4. Material UI

Bây giờ sẽ tăng độ khó lên, khi có sự tham gia của **CSS-IN-JS** vào trang web. 

Những ứng dụng react.js có sử dụng giải pháp `css-in-js`, nghĩa là viết css bên trong các file javascript. Rồi khi ứng dụng chạy lên, javascript mới tạo ra các thẻ style và tiêm vào trang web. Điều này là rất bình thường đối với một trang web single page application. Tuy nhiên, khi đưa vào bài toán Server Rendering, thì nó sinh ra một vấn đề, vấn đề đó là: **FOUC**

FOUC - **Flash of unstyled content** là hiện tượng, css về tới browser không cùng lúc với html. Có thể css đó của một server nào đó khác (third-party) và html được trả về client trước, rồi phải một lúc sau css mới về tới, lúc này xảy ra hiện tượng là một document không có style được **flash** một cái rồi mới có style.

**Giải pháp**: ta sẽ render luôn cái đống css của thư viện `css-in-js` đang sử dụng trong trang web, và chúng ta sẽ **tiêm (inject)** vào cái file html trả về client. Như vậy, sẽ loại bỏ được thời gian delay và file html của ta sẽ có style ngay thời điểm nó về tới trình duyệt.

### Emotion cache

Đầu tiên, tạo file `createEmotionCache.js` ở root với nội dung:

```js
# createEmotionCache.js
import createCache from "@emotion/cache"

export default function createEmotionCache() {
  return createCache({ key: "youuuuuuunguyen" })
}

```

### Mui Theme

Tạo theme sẽ được dùng chung cho phía server và client, tạo file `theme.js` ở root với nội dung:

```js
# theme.js
import { createTheme } from "@material-ui/core/styles"
import { red } from "@material-ui/core/colors"

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: red[700],
    },
  },
})

export default theme

```


### Update server.js

```js
import express from "express"
import ReactDOMServer from "react-dom/server"
import * as React from "react"
import App from "./App"
import createEmotionServer from "@emotion/server/create-instance"
import createEmotionCache from "./createEmotionCache"
import { ThemeProvider } from "@material-ui/core/styles"
import { CacheProvider } from "@emotion/react"
import theme from "./theme"
import CssBaseline from "@material-ui/core/CssBaseline"

const app = express()

function renderFullPage(html, styles) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        ${styles}
      </head>
      <body>
        <script async src="build/bundle.js"></script>
        <div id="root">${html}</div>
      </body>
    </html>
  `
}

function handleRender(req, res) {
  const cache = createEmotionCache()
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache)

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CacheProvider>
  )

  // Grab the CSS from emotion
  const chunks = extractCriticalToChunks(html)
  const styles = constructStyleTagsFromChunks(chunks)
  // Send the rendered page back to the client.
  res.send(renderFullPage(html, styles))
}

app.use("/build", express.static("build"))

// This is fired every time the server-side receives a request.
app.use(handleRender)

const port = 3000
app.listen(port, () => {
  console.log(`Listening on ${port}`)
})

```

### Update client.js

Cập nhật nội dung `client.js` như sau:

```js
import * as React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { ThemeProvider } from "@material-ui/core/styles"
import theme from "./theme"
import CssBaseline from "@material-ui/core/CssBaseline"
import { CacheProvider } from "@emotion/react"
import createEmotionCache from "./createEmotionCache"

const cache = createEmotionCache()

function Main() {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CacheProvider>
  )
}

ReactDOM.hydrate(<Main />, document.querySelector("#root"))

```

# 5. Conclusion
Nếu như các bạn từng xem về cách để implement server rendering cho React và Material UI, sẽ thấy ngày trước người ta phải xóa bỏ cái styles đã inject vào html ở phía server vì như thế sẽ duplicate với đống styles được tạo ra ở client. Nhưng với EmotionCache, thì khi sử dụng cùng một config (cụ thể là cùng `key`), phía Emotion sẽ không để xảy ra việc duplicate này.

# 6. References
[1]. https://next.material-ui.com/guides/server-rendering

[2]. https://emotion.sh/docs/ssr#on-server