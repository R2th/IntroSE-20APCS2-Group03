## Setup basic example Next.js
```
mkdir hello-next
cd hello-next
npm init -y
npm install --save react react-dom next
mkdir pages
```

sau đó chúng ta sẽ sửa package.json có đoạn `scripts` như sau:
```
"scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  },
```
## Structure
Chúng ta sẽ có ví dụ mẫu về cấu trúc thư mục của Next.js cơ bản ở bài viết này.
![](https://images.viblo.asia/d6bbaa1a-f302-4947-b240-ce4df4a4a772.png)

### Cách tổ chức các components dựa theo truyền tham số prop của Layout 
```javascript
// components/Header.js

import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
  </div>
)

export default Header
```

```javascript
// components/MyLayout.js

import Header from './Header'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const Layout = props => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
)

export default Layout
```

```javascript
// pages/index.js

import Layout from '../components/MyLayout.js'

const indexPageContent = <p>Hello Next.js</p>

export default function Index() {
  return <Layout content={indexPageContent} />
}
```

```javascript
// pages/about.js

import Layout from '../components/MyLayout.js'

const aboutPageContent = <p>This is the about page</p>

export default function About() {
  return <Layout content={aboutPageContent} />
}
```

các `pages` sẽ đều sử dụng component `Layout` và truyền nội dung cho component con sử dụng, ở ví dụ trên là `props.children`

chúng ta sẽ có giao diện như sau:
![](https://cloud.githubusercontent.com/assets/50838/24333679/fa856f00-1279-11e7-931d-a5707e51a801.gif)

### Cách tổ chức Layout như là một Higher Order Component

```javascript
// components/MyLayout.js

import Header from './Header'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const withLayout = Page => {
  return () => (
    <div style={layoutStyle}>
      <Header />
      <Page />
    </div>
  )
}

export default withLayout
```

```javascript
// pages/index.js

import withLayout from '../components/MyLayout'

const Page = () => <p>Hello Next.js</p>

export default withLayout(Page)
```

```javascript
// pages/about.js

import withLayout from '../components/MyLayout'

const Page = () => <p>This is the about page</p>

export default withLayout(Page)
```

## Kết luận
Tùy vào sở thích của cá nhân thì cả 2 cách Next đều khuyến khích dùng.
### references
https://nextjs.org/learn/basics/using-shared-components

facebook: https://www.facebook.com/quanghung997