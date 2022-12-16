Chào mọi người, gần đây mình có tiếp cận với ``NextJs``, là một framework có khả năng server side rendering (SSR) mà vẫn có thể làm việc chung với React. SSR giúp cho ứng dụng của bạn có khả năng SEO.

Nói về NextJs, thì có rất nhiều thứ cần phải tìm hiểu thêm (mình cũng mới vọc vạch thôi). Nhưng hôm nay mình sẽ chia sẽ cho mọi người kết hợp`` NextJs`` với ``styled-component``.
Chắc hẳn mọi người đều biết đến thư viện dùng để viết css này rồi, đúng ko? Nếu bạn nào chưa biết thì vào doc của nó để tìm hiểu nka: [style-components](https://styled-components.com/docs)

Với React thì chúng ta có thể dễ dàng dùng ``styled-component`` dễ dàng vì đây là ứng dụng ``client side rendering``, nhưng với NextJs có khả năng SSR thì nó sẽ khác dù vẫn viết ứng dụng bằng ``React``.

#### 1. Tạo ứng dụng NextJs
Gõ câu lệnh này vào cmd nhé.
``
npx create-next-app myapp
``

à, mọi người phải cài CLI ``create-next-app`` của NextJs nka: [create-next-app](https://github.com/vercel/create-next-app).

``myapp`` là tên của project.
#### 2. Tạo page đầu tiên
sau khi tạo được project, bạn vào thư mục page và tạo file ``index.js`` .

```
export default () => (
   <div>
       <h1>My First Next.js Page</h1>
   </div>
)
```

và chạy cmd ``npm run dev``, project của chúng ta sẽ start ở port 3000: ``locahost:300``

#### 3. Thêm styled-components

```
npm install styed-components
```

Chúng ta cài styled-components cho project và style demo cho page index của mình nhé
```
import styled from 'styled-components';

export default () => (
  <div>
    <Title>My First Next.js Page</Title>
  </div>
);

const Title = styled.h1`
  color: red;
`;
```
#### 4. Thêm plugin cho styled-components và config file .babelrc
Chúng ta cài thêm package 
```
npm install --save-dev babel-plugin-styled-components
```
package này dùng để biên dich css ở SSR nka mn, nên chỉ cần cài vào dev dependency.
Tất nhiên phải config file .babelrc rùi. 
```
{
  "presets": [
    "next/babel"
  ],
  "plugins": [
    [
      "styled-components",
      {
        "ssr": true,
        "displayName": true,
        "preprocess": false
      }
    ]
  ]
}
```
#### 5. Custom file _document của NextJs
Đây là phần chính để chúng ta có thể thêm css vào file html của chúng ta ở phía server. Nextjs cho phép chúng ta custom file html ở server Next trả về bằng cách override file _document ở bên trong thư mục ``page``

Tạo file ``_document.js``
```
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    // Step 1: Tạo một instance của ServerStykeSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Nhận các styles từ component Page
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />),
    );

    // Step 3:Trình bày các css ra một thẻ <style />
    const styleTags = sheet.getStyleElement();

    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <title>My page</title>
          {/* Step 5: import thẻ style vào head của html server trả về  */}
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
```

Restart lại server, vào trang index bạn sẽ thấy ``<h1/>`` có màu đỏ, và inspect vào tab ``network`` ở phần responsive chúng ta sẽ thấy style css đã được imort vào đầu thẻ ``head``

Vậy là bạn đã có thể kết hợp ``NextJs`` và ``styled-components``  trên ứng dụng SSR

Cảm ơn các bạn đã theo dõi bài viết của mình 

Link tham khảo: [NextJs + styled-components](https://dev.to/aprietof/nextjs--styled-components-the-really-simple-guide----101c)