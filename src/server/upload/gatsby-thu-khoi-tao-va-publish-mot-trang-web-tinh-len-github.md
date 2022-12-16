**Gatsby** là một trình tạo trang tĩnh (static site generator) cho React. Nó là một công cụ không những giúp cho bạn xây dựng một website tĩnh mà nó còn giúp cải thiện performance. 

### Sau đây là một số điểm mạnh khi dùng Gatsby:
* Trang HTML được tạo sẵn từ phía server
* Dễ dàng mở rộng các plugin
* Có thể config webpack dễ dàng
* Tối ưu cho tốc độ. Gatsby chỉ load những phần quan trọng để site của bạn có thể load càng nhanh càng tốt. Sau một lần load thì Gatsby sẽ tự động load trước những resource cần cho những trang khác.
* Tự động quản lý routing dựa trên cấu trúc thư mục, không cần dùng các thư viện routeing/ navigation khác.

### Cùng bắt đầu thử Gatsby nào, đầu tiên là cài **Gatsby CLI** :

```
npm install --global gatsby-cli
```

Tạo một project mới 

```
gatsby new first-gatsby-site
```

![](https://images.viblo.asia/9945efdb-cd42-4490-aea9-c5cea8687c69.png)

Sau đó ở thư mục project thì chạy **gatsby develop** và BOOM, ta đã có một trang hello world được live ở http://localhost:8000

![](https://images.viblo.asia/e32494f3-d973-402f-b746-ac042996d4d3.png)

Trang default sẽ trông như sau:

![](https://images.viblo.asia/7005dbd8-c4fc-4806-a901-81106207b3d8.png)

### Cấu trúc thư mục Gatsby

![](https://images.viblo.asia/3c62a771-318f-4b59-aead-1203b184d7d0.png)

Mỗi project Gatsby chứa ít nhất những file như trên. Bạn có thể nhìn thấy những thư mục quen thuộc như node_modules, thư mục public được sử dụng khi deploy dự án. Bên trong thư mục src/ sẽ có 2 thư mục con là layouts và pages.

Thư mục layouts/ chứa 2 files: index.css và index.js. Đây là nơi bắt đầu chạy của ứng dụng.

```
import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";

import "./index.css";

const Header = () => (
  <div
    style={{
      background: "rebeccapurple",
      marginBottom: "1.45rem"
    }}
  >
    <div
      style={{
        margin: "0 auto",
        maxWidth: 960,
        padding: "1.45rem 1.0875rem"
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          Gatsby
        </Link>
      </h1>
    </div>
  </div>
);

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="My First Gatsby Site"
      meta={[
        { name: "author", content: "amanhimself" },
        { name: "keywords", content: "sample, something" }
      ]}
    />
    <Header />
    <div
      style={{
        margin: "0 auto",
        maxWidth: 960,
        padding: "0px 1.0875rem 1.45rem",
        paddingTop: 0
      }}
    >
      {children()}
    </div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
```

### Thử publish trang web demo :

**Gatsby** rất thích hợp cho những bạn muốn deloy một web tĩnh đơn giản như porfolio của mình. Nếu bạn còn chưa biết sẽ deploy lên đâu thì rất may có một nơi free và rất thích hợp đó là **GitHub** pages.

Để deploy dự án lên github thì bạn phải đảm bảo thư mục đang làm được khởi tạo với git responsitory. Nếu có đầy đủ các yếu tố trên thì bạn có thể thêm 1 module vào project  của mình là gh-pages.

```
npm install --save-dev gh-pages
```

thêm một script để deploy trong file package.json

```
"scripts": {
  "deploy": "gatsby build --prefix-paths && gh-pages -d public",
}
```

Trong file gatsby.config.js thêm một tiền tố tên thư mục của repo như :

```
module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`
  },
  pathPrefix: `/first-gatsby-site`,
  plugins: [`gatsby-plugin-react-helmet`]
};
```

Và run deploy thôi :

```
npm run deploy
```

OK! Vây là website của bạn đã được host lên https://username.github.io/project-name

Vậy là ta đã có một cái nhìn ban đầu về Gatsby. Nếu được mình sẽ kiếm một bài nói nhiều hơn về Config, Node, Page, Link của Gatsby để các bạn có thể hiểu Gatsby là một công cụ để sinh ra web tĩnh mạnh như thế nào