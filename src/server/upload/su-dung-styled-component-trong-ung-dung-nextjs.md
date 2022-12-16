**Nextjs** là lựa chọn tốt nhất nếu bạn muốn xây dựng ứng dụng **react** theo hướng **server rendering**. Và **styled-components** là lựa chọn hàng đầu khi bạn muốn **style** cho ứng dụng **react** của mình theo hướng **css-in-js**. Trong bài viết này mình sẽ chia sẻ cách sử dụng **styled-components** trong ứng dụng **nextjs**, mặc định thì **nextjs** đã cung cấp cho chúng ta một cách để sử dụng **css-in-js** đó là sử dụng công cụ **[styled-jsx](https://github.com/vercel/styled-jsx)**, tuy nhiên nếu như bạn không thích sử dụng **styled-jsx** vì phải viết **css** trong **jsx** khiến cho **component** trở nên dài dòng hơn, hoặc bạn đã quá quen với **styled-components** và không muốn thay đổi, hãy thêm vào **project** một chút thiết lập và chúng ta có thể đạt được mong muốn đó.  
### 1. Khởi tạo project nextjs  
 Chúng ta tạo thư mục dự án bằng lệnh sau  
 ```
 mkdir nextjs-with-styled-components && cd nextjs-with-styled-components
 ```
 Khởi tạo **package.json** và cài đặt các thư viện cần thiết cho một ứng dụng **nextjs**  
 ```
 npm init -y
 npm install react react-dom next
 ```
 Tiếp đó, chúng ta thêm vào các **commands** cần thiết cho ứng dụng, bằng cách chỉnh sửa trong **package.json** 
 
```
...
"scripts": {
  “dev”: "next",
  "build": "next build",
  "start": "next start"
}
...
```
 Tiếp theo ta khởi tạo một **page** đầu tiên
 tạo thư mục **pages**
 ```
 mkdir pages
 cd pages
 touch index.js
 ```
 Thêm đoạn mã sau vào **file** **pages/index.js** vừa tạo:  
 ```
 function HomePage() {
   return <div>Home Pages</div>
 }
 
 export default HomePage
 ```
 Xong, chúng ta đã khởi tạo xong **project** **next** cơ bản, kiểm tra thành quả bằng cách chạy **command**
 ```
 npm run dev
 ```
 Truy cập địa chỉ **http://localhost:3000**, ta sẽ thấy trang **HomPage** của ứng dụng vừa tạo.  
### 2. Cài đặt và thiết lập styled-components  
Sau khi đã thiết lập xong **project** cơ bản, tiếp theo ta sẽ cài đặt **styled-components**
```
npm install styled-components
```
Chúng ta cũng cần cài đặt thêm một thư viện nữa, tên là **babel-plugin-styled-components**, nó sẽ giúp **hashed className** trong các **components** giữa các môi trường (cần có trong **server rendering**).  
```
npm install -D babel-plugin-styled-components
```
Sau đó chúng ta cần thêm một chút thiết lập để **babel** sử dụng **plugin** vừa cài đặt trong quá trình **compile** mã nguồn, đầu tiên tạo **file .babelrc** trong thư mục dự án  
```
touch .babelrc
```
Sau đó thêm đoạn mã thiết lập như sau  
```
{ 
  "presets": ["next/babel"], 
  "plugins": [
      ["styled-components", { "ssr": true }]
   ]
}
```

Bây giờ ta sẽ thêm **styled-components** vào **pages/index.js** để kiểm tra xem đã có thể sử dụng được **styled-components** hay chưa.  
```
import styled from 'styled-components'

const Wrapper = styled.div`
  color: red;
  text-align: center;
`

function HomePage() {
    return (
        <Wrapper>Home Pages</Wrapper>
    )
}
```
Sau đó thử **start** lại ứng dụng
```
npm run dev
```
Có vẻ là đã được rồi phải không, trang **Home** của chúng ta đã hiện ra với đúng phần **style** mà chúng ta vừa thêm vào, tuy nhiên có một vấn đề là khi chúng ta vào trang, thì trang **Home** được **load** ra với phần **html** chưa có **css**, sau đó mới hiển thị đúng **style**, và sẽ có một hiệu ứng không đẹp xảy ra khi **refresh**. Nguyên nhân là **styled-components** đã không được **render** từ phía **server** mà chỉ sau khi ta **load** trang **html** về tới trình duyệt, phần **css** sinh ra từ **styled-components** mới được **compile** và **load** ra, ta có thể thấy lỗi này khi bật chế độ **inspect** và kiểm tra phần **nextwork** của trình duyệt, dựa vào đó ta có thể thấy **styled-components** chưa được **render** từ phía **server**.
![](https://images.viblo.asia/4b579973-9c08-408e-9c7a-cadac9075632.PNG)
Để **fix** lỗi trên, chúng ta tạo **file _document.js** trong thư mục **pages**, và tthêm vào đoạn mã như sau:  
```jsx
import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}
```
Chạy lại ứng dụng, ta sẽ thấy không còn bị lỗi trên nữa.
### 3. Thêm thiết lập Theme  
Chúng ta đã thêm **styled-components** vào ứng dụng **nextjs**, tuy nhiên vì **nextjs** sử dụng cơ chế **server rendering** mỗi **pages** sẽ là một ứng dụng **react** riêng biệt, vậy làm thế nào để chúng ta thêm vào đó những phần **config** chung cho tất cả các **pages**, như **styled-components theme** hay **redux store** ?  
Trong thư mục **pages** chúng ta hãy tạo ra **file _app.js** và thêm vào đoạn mã sau  
```jsx
import App from 'next/app'
import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
```
Hiểu một cách đơn giản nhé, chúng ta tạo ra **file _app.js** trong đó chúng ta sinh ra một **components** mở rộng từ **next/app**. Trong quá trình **render** từ phía **server**, **Next** sẽ luôn đặt **page** vào trong **MyApp**. **MyApp** sẽ luôn được **render** ở tất cả các **pages**.  
Vậy là chúng ta đã thiết lập thành công **styled-components** vào **nextjs** và có thể sử dụng công cụ **style-in-js** quen thuộc trong ứng dụng **server rendering**. Hi vọng bài viết sẽ hữu ích.