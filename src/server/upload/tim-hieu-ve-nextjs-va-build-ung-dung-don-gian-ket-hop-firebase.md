![image.png](https://images.viblo.asia/5f1fe45c-6a0f-4b21-a7fb-4b6ed3ff5970.png)
# 1. Server-side rendering
Hầu hết các ứng dụng ngày nay được xây dựng dưới dạng Single-page application (SPA) bằng cách sử dụng framework của JavaScript để cho phép người dùng tương tác phong phú hơn. Với một SPA truyền thống, người dùng thực hiện một yêu cầu duy nhất tới server liên quan đến HTML, CSS và JavaScript cần thiết cho ứng dụng. Vì ứng dụng là một loạt các tập lệnh JS, nên nó phải đợi cho đến khi một số gói JS được tải xuống hoàn toàn trước khi có thể thực hiện bất kỳ yêu cầu nào tới server để đưa dữ liệu vào giao diện người dùng. Điều này có nghĩa là có hai lần đi vòng đến server trước khi người dùng có thể tương tác với ứng dụng.

Server-side rendering (SSR) trong JavaScript SPA được sử dụng để đánh giá JavaScript trên server và sau đó yêu cầu dữ liệu thích hợp trước khi gửi lại trang HTML, CSS. Sau đó, bất kỳ JavaScript package nào cũng có thể được tải không đồng bộ vì giao diện người dùng sẽ được load hoàn tất trước khi JavaScript hoàn tất quá trình tải xuống và phân tích cú pháp. Điều này sẽ giúp ứng dụng đạt performance tốt hơn.

**Client-side Rendering**
CSR: sẽ trả về file HTML gần như empty cùng với links tới file JS. Cần chờ tới khi tất cả các quá trình trên hoàn thành đến khi Virtual DOM được chuyển vào browser DOM để website có thể xem được.
![](https://images.viblo.asia/c2012bd9-1498-4bd1-b72a-1e9e648ada8a.gif)

**Server-side Rendering**
SSR: server sẽ trả về cho browser file HTML của page đã được rendered. Đối với SSR thì người dùng có thể bắt đầu nhìn thấy trang web ngay trong khi tất cả quá trình đó đang diễn ra.
![](https://images.viblo.asia/689559cc-38f9-42e6-bdc8-6f3ed776cc32.gif)


# 2.Next.js và xử lý SSR đơn giản
Next.js là một development framework mã nguồn mở được xây dựng trên React Js cho phép các ứng dụng web dựa trên React có chức năng như server-side rendering và tạo các trang web tĩnh. 

## 2.1 Lợi thế của Next.js

* SEO website rất tốt và giúp giảm chi phí, giúp trang web của bạn hiển thị cao hơn trên các trang kết quả của công cụ tìm kiếm. SSR làm cho các trang web xếp hạng tốt hơn cho SEO vì chúng tải nhanh hơn và nhiều nội dung trang web có thể được quét bởi các trình theo dõi SEO
* Next.js cũng cho phép chỉnh sửa thẻ `<head>` của một trang web, điều mà không thể thực hiện trong React. Các tag `<head>` là một phần cốt lõi của siêu dữ liệu trên trang web và góp phần vào đánh giá xếp hạng SEO của trang web.
* Tích hợp bộ nhớ đệm và tối ưu hóa tĩnh tự động
* Server phụ trách hiển thị các trang
* Framework của React vì thế nếu làm tốt với React thì có thể code Next.js dễ hơn
* Tinh chỉnh cấu hình webpack / babel
* Hỗ trợ tích hợp cho Route Page, CSS, JSX và TypeScript
* Nhanh chóng thêm các plugin để tùy chỉnh Next.js theo nhu cầu của trang cụ thể

## 2.2 Nhược điểm

Nhược điểm thực sự duy nhất của Next.js là nó là một opinionated framework, có nghĩa là nó có một phương pháp và bộ công cụ cụ thể mà nó muốn bạn sử dụng để xây dựng các ứng dụng của mình.

## 2.3 Khi nào nên sử dụng Next.js?

* Next.js phù hợp nhất để tạo trang chủ hoặc trang đích được tối ưu hóa cũng như bất kỳ trang nào khác dựa trên lưu lượng truy cập tìm kiếm không phải trả tiền. Các trang này sẽ được hưởng lợi nhiều nhất từ các cải tiến SEO của Next.js.

* Next.js cũng tốt hơn cho các trang web so với các ứng dụng web vì SSR cho phép nó có cùng hiệu suất bất kể thiết bị mà khách hàng đang sử dụng.

* Next.js ít lý tưởng hơn để tạo các ứng dụng web hoặc các ứng dụng bảo mật yêu cầu xác thực vì những điều này không mang lại lợi ích cho SSR.

![image.png](https://images.viblo.asia/7698cfe4-3c1f-4de4-9c98-a946bd6acd51.png)

## 2.4 Các feature của Next.js
* Simple Routing: React components bên trong **pages/** trở thành các page route. Không cần phải thử và tìm ra phiên bản nào của thư viện bộ định tuyến mà dự án sử dụng hoặc làm sáng tỏ lưới các tuyến được trộn với các trang.
* Code Splitting: Routes được tách code. Có một thuật toán trong Next thực hiện gộp / tách module phổ biến và nó hoạt động khá tốt
* SSR: Tìm nạp dữ liệu trên Server-side Render - đó là một chức năng triển khai để có thể sử dụng bất kỳ bộ nhớ hoặc tìm nạp dữ liệu nào mong muốn
* Pre-fetching pages: Next.js 3.0 được released cũng có hỗ trợ xuất một SPA tĩnh. Vì vậy, nếu không muốn sử dụng SSR nhưng giống như các tính năng được liệt kê ở trên, thì có thể chỉ cần xuất một ứng dụng tĩnh và sử dụng CDN làm máy chủ lưu trữ của mình.

## 2.5 Cấu trúc Next.js

**Cấu trúc folder:**
![image.png](https://images.viblo.asia/a8e41675-39c3-470a-a21c-f24dc5f79e74.png)

**file index.js là cốt lõi của ứng dụng này vì nó chỉ chứa trang duy nhất này. Các trang web thực sẽ chứa nhiều trang trong thư mục pages/ mà mỗi trang đại diện cho một trang web khác nhau**

```javascript
import Head from 'next/head'
import styles from '../styles/Home.module.css'
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>
          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>
          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>
          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
```

**Mỗi dự án Next.js bắt đầu với 3 thư mục: pages, public, và styles**

![image.png](https://images.viblo.asia/2a7955ce-8c65-44bb-868c-03b66b7d236e.png)

### 2.5.1 Pages

Thư mục pages/ chứa các tệp page của bạn. Mỗi tệp page là một component React với một route duy nhất được tạo tự động từ tên tệp. Ví dụ, page hello.js sẽ được tìm thấy tại pages/hello.js.

Một số page như `_app.js` ở trên bao gồm tiền tố gạch dưới trong tên của chúng để đánh dấu chúng là custom component. Các component này được Next.js sử dụng để làm việc với các component khác.

Ví dụ:  `_app.js` được sử dụng để bắt đầu mỗi page và không được sử dụng làm trang web của riêng nó.

### 2.5.2 Public

Thư mục này dành cho việc phân phát tệp tĩnh, có nghĩa là các tệp này không thay đổi và chỉ có thể được tham chiếu. Thư mục này thường chứa hình ảnh hoặc biểu tượng mà trang web sử dụng cũng như thông tin nội bộ như Authen trang web của Google.

Trong thư mục public, có favicon.ico là một biểu tượng nhỏ để sử dụng trên các tab trình duyệt và vercel.svg hiển thị biểu tượng của công ty nền tảng.

### 2.5.3 Styles

Thư mục này chứa các style CSS, xác định sự xuất hiện của tất cả các phần tử trang. Các globals.css là tập tin thiết lập tiêu chuẩn chung mà tất cả các trang trong dự án sẽ sử dụng.

Có thể thêm style dành riêng cho component bằng cách sử dụng các tệp module được đặt tên như sau`<componentName>.module.css`

### 2.5.4 Routing/Navigation trong App

Điều hướng là các cách người dùng có thể điều hướng qua trang web Next.js. Route và Link là hai phương pháp chính có thể sử dụng để xác định điều hướng trang web.

Các route trong Next.js có thể tiếp cận được do các định nghĩa route được tích hợp sẵn của từng component. Để tối ưu hóa route ứng dụng thì điều quan trọng là phải hiểu các route index, nested và dynamic routes.

### 2.5.5 Index

Các tệp chỉ mục như index.js được chuyển đến điểm bắt đầu của ứng / thay vì /index. Có thể sử dụng điều này để làm lợi thế bằng cách tạo nhiều tệp index hoạt động như trang đích hoặc điểm bắt đầu của các đường dẫn điều hướng khác nhau trong trang web.
![image.png](https://images.viblo.asia/c0866bc0-5c2a-41eb-a271-401d7c1ef58c.png)

Ví dụ: index.js bên dưới pages là trang chủ của trang web được truy cập nếu không có route bổ sung nào được nhập. `index.js` bên dưới users là trang đích cho users path đến được bằng cách nhập `<siteName>/users`.

### 2.5.6 Nested

Các nested route là các route chỉ có thể truy cập được thông qua một parent route được chia sẻ, chẳng hạn như /users/account. Có thể nghĩ nested route giống như các tệp lồng nhau trên máy tính, trong đó phải điều hướng qua tất cả higher components để đến được nested component.

### 2.5.7 Dynamic Routes

Có thể tạo các tham số trong các Route để cho phép các action thay đổi. Các dynamic page được xác định bằng dấu ngoặc vuông. Tính năng này về cơ bản cho phép chuyển thông tin đến một trang giống như làm với một chức năng.

Ví dụ: có thể làm lại user component để cho phép mỗi người dùng có trang tài khoản của riêng họ
![image.png](https://images.viblo.asia/eee0ff37-6eb6-475a-95bc-7de85ef7d862.png)

Với thiết lập này, người dùng có thể nhập tên tài khoản của họ vào URL và ngay lập tức truy cập trang thông tin tài khoản của họ thay vì bắt đầu từ users. Nói cách khác, có thể nhập tên tài khoản của mình /users/educative để đến một dynamic page có thông tin liên quan đến tên tài khoản đã nhập.

Các tệp tin account.js sẽ cần phải bao gồm báo cáo có điều kiện mà nói nó phải làm gì dựa trên những gì tham số nó được thông qua.
![image.png](https://images.viblo.asia/60ab1af3-7344-4959-a86a-0b4a77a6d0d6.png)

### 2.5.8 Link

Có thể giới thiệu các link nhấp qua phía Client để cho phép người dùng điều hướng trang web mà không cần thanh URL. Link Component trong React là chìa khóa để tạo link trong Next.js.

Link component nhận một href là đối số được điền với destination component. Điều này sẽ tạo ra một link giữa page hiện tại và page được tìm thấy tại entered route. Ví dụ, nếu thêm `<Link href= "/users/">` vào hello.js sẽ tạo ra một link từ hello.js đến destination user.

```javascript
import Link from 'next/link'
import Head from 'next/head'
function HomePage(props) {
   return (
      <>
         <Head>
            <title>Welcome to Next.js!</title>
         </Head>
         <div>Welcome to Next.js!</div>
         <Link href="/users">> <a>Users</a></Link>
         <br/>
         <img src="/logo.png" alt="EducativeLogo" />
      </>        
   )
}
export async function getServerSideProps(context) {
   const res = await fetch('https://api.github.com/repos/vercel/next.js')
   const json = await res.json()
   return {
      props: { stars: json.stargazers_count }
   }
}
export default HomePage
```

## 2.6 Next.js Data Fetching

Data fetching là khi Next.js yêu cầu dữ liệu từ máy chủ để tạo một trang. Chọn đúng phương pháp pre-render và chức năng data fetching là điều cần thiết để tạo ứng dụng thân thiện với người dùng

Trang có thể được tạo bằng SSR, trong đó máy chủ hiển thị toàn bộ trang khi nhận được yêu cầu hoặc tạo tĩnh, cache render trước đó của trang để nó có thể được gửi ngay lập tức.

SSR : Tốt hơn cho các trang có tính tương tác cao hoặc thay đổi nhanh chóng không hoạt động với tính năng tạo static.
SG : Tốt hơn cho các trang chỉ có văn bản hoặc các trang không thay đổi vì static render sẽ luôn đáp ứng nhu cầu của người dùng.

Next.js có 3 chức năng data fetching không đồng bộ hoạt động như các lựa chọn thay thế fetching tập trung cho phương pháp React truyền thống. Các chức năng này là:

* getStaticProps: dùng với SG để kéo nội dung trang từ dữ liệu bên ngoài.
* getStaticPaths: được sử dụng với SG để kéo đường dẫn trang từ dữ liệu bên ngoài.
* getServerSideProps - được sử dụng với SSR để kéo các trang render trước tại thời điểm xây dựng.

![image.png](https://images.viblo.asia/ff8ff881-a821-4466-a5ef-74b53b299f6e.png)

# 3. Dynamic Content với Firebase Hosting & Cloud Functions
Các SPA được lưu trữ truyền thống sử dụng tài nguyên tĩnh trên CDN như đã đề cập trước đó. Firebase Hosting là một dịch vụ như vậy và do đó không thể xử lý back-end. Tuy nhiên, với việc bổ sung Cloud Functions cho Firebase thì một tích hợp đã được thực hiện với Firebase Hosting cho phép phục vụ dynamic content. 

## 3.1 Clean URLs
Cloud Functions thông thường có các URL sau:
```
https: // us-central1- <project-name> .cloudfunctions.net / <functions-name>
```

Sau khi chuyển hướng sang sử dụng Firebase Hosting thì có thể nhận được định dạng URL sau:
```
<project-name> .firebaseapp.com /
```

## 3.2 SSR on Firebase
**Next.js Setup**

![image.png](https://images.viblo.asia/538c4361-d630-4407-9799-a64e25c67d02.png)

Xây dựng ứng dụng Next.js trong thư mục src/app và chạy lệnh ```yarn add next@beta react react-dom```. Sau đó sẽ thêm Next.js pages và components.

```javascript
// src/app/components/App.js
import Header from "./Header"

const App = ({ children }) =>
  <main>
    <Header />
    {children}
  </main>

export default App
```

```javascript
// src/app/components/Header.js
import Link from "next/link"

export default ({ pathname }) =>
  <header>
    <Link href="/">
      <a className={pathname === "/" && "is-active"}>Home</a>
    </Link>{" "}
    <Link href="/about">
      <a className={pathname === "/about" && "is-active"}>About</a>
    </Link>
  </header>
  ```
  
  ```javascript
  // src/app/next.config.js
module.exports = {
  distDir: "../functions/next"
}
```

```javascript
// src/app/pages/about.js
import App from "../components/App"

export default () =>
  <App>
    <p>About Page</p>
  </App>
  ```
  
  ```javascript
  // src/app/pages/index.js
import App from "../components/App"

export default () =>
  <App>
    <p>Index Page</p>
  </App>
  ```
  
![](https://images.viblo.asia/954fb5c9-5eef-4e63-aeca-c32a01319b4f.png)

Thêm scripts sau vào tệp package.json trong thư mục src/app/. Scripts này sẽ chạy local development với các tính năng như HMR, v.v. từ project root
  
  ```javascript
  "scripts": {
  "dev": "next",
  "build": "next build"
}
```
![image.png](https://images.viblo.asia/8af1a551-5e59-44af-b368-1e7683cf9fea.png)
  
## 3.3 Init Firebase Project
Để bắt đầu, tạo một project là "nextonfirebase" trong Firebase web console. Sau đó đi tới thư mục root ở local project là nextonfirebase/ và chạy một số lệnh sau:

```
yarn init -y
yarn global add firebase-tools
firebase login — login to the Firebase CLI.
firebase init — initialise a Firebase project.
```

* Sử dụng Firebase Functions và Hosting.
* Liên kết nó với dự án đã tạo trong bảng điều khiển web trước đó.
* Chỉ định sử dụng  thư mục src/public

Chỉnh sửa file firebase.json
```javascript
{
  "hosting": {
    "public": "src/public"
  },
  "functions": {
    "source": "src/functions"
  }
}
```

## 3.4 Next.js trên Cloud Functions cho Firebase
Khi thiết lập ứng dụng Next.js đã tạo một tệp có tên next.config.js. Tệp này được sử dụng để cho Next.js biết thư mục đích nào để xuất ứng dụng đã xây dựng. Ứng dụng đã xây dựng vào một thử mục là ../functions/next. Đây là một bước quan trọng trong việc giúp Next.js hoạt động chính xác. Cài đặt mặc định của Next.js chỉ định một thư mục đích với định dạng .next. Path ngắn cũng là nguyên nhân khiến một số người đau đầu khi tải tài nguyên lên thông qua CLI.

Chạy lệnh ```yarn upgrade firebase-admin firebase-functions```

Bây giờ có thể tạo Cloud Functions để phục vụ ứng dụng Next app. Trong src/functions/index.js xử lý như sau:

```javascript
const functions = require("firebase-functions")
const next = require("next")

var dev = process.env.NODE_ENV !== "production"
var app = next({ dev, conf: { distDir: "next" } })
var handle = app.getRequestHandler()

exports.next = functions.https.onRequest((req, res) => {
  console.log("File: " + req.originalUrl) // log the page.js file that is being requested
  return app.prepare().then(() => handle(req, res))
})
```

Đoạn code này chỉ đơn giản là thiết lập ứng dụng Next.js để được trả về từ một Cloud Function called next. Tại đây, có thể thấy các biến (req, res)  được chuyển từ Cloud Function đến ứng dụng Next.js để xử lý.

![image.png](https://images.viblo.asia/1c031122-d6c1-4945-8feb-9721377942a5.png)

## 3.5 Building Blocks
Chạy ``yarn init -y`` trong thư mục gốc của dự án để có thể quản lý dự án của mình từ đó và thêm code bên dưới:
![image.png](https://images.viblo.asia/11e871fc-e541-4232-8928-4f49d06a7bf7.png)

```javascript
{
  "name": "nextonfirebase",
  "version": "1.0.0",
  "license": "MIT",
  "scripts": {
    "install": "yarn build-all",
    "next": "yarn build-firebase && cd \"src/app\" && yarn && yarn dev",
    "preserve": "yarn build-all",
    "serve": "firebase serve",
    "predeploy": "yarn build-all",
    "deploy": "firebase deploy",
    "build-all": "yarn build-next && yarn build-firebase",
    "build-next": "cd \"src/app\" && yarn && yarn build",
    "build-firebase": "cd \"src/functions\" && yarn"
  }
}
```

Cho phép quản lý dự án từ thư mục gốc một cách dễ dàng với 1 số lệnh sau:
* **next** - cài đặt chức năng firebase deps, điều hướng đến thư mục ứng dụng, cài đặt deps, run Next.js dev server.

* **build-next** - điều hướng đến thư mục ứng dụng, cài đặt deps, chạy build tập lệnh cục bộ, cài đặt tất cả node_modules được yêu cầu và xây dựng ứng dụng Next.js

* **build-firebase** - điều hướng đến thư mục chức năng, cài đặt deps, cài đặt tất cả node_modules theo yêu cầu của Cloud Functions
 
* **serve** - xây dựng ứng dụng và chức năng bằng cách sử dụng các tập lệnh ở trên. Cung cấp Firebase Hosting & Cloud Functions trên local

* **deploy** - xây dựng ứng dụng và chức năng bằng cách sử dụng các tập lệnh ở trên. Triển khai dự án Firebase thông qua CLI

## 3.6 Local Next.js App Development
```
yarn next
```

Hãy xem ứng dụng hoạt động như thế nào khi được lưu trữ trên Cloud Functions cho riêng Firebase. Chạy lệnh sau để triển khai

```
yarn build-all && firebase deploy --only functions
```

![image.png](https://images.viblo.asia/ef9ca290-efb0-444b-a9ab-e856357c31ad.png)

Mở trình duyệt đến một tab mới với DevTools mở trên tab mạng. Sao chép URL của Cloud Function từ terminal. Nó sẽ giống như thế này:

```https: // us-central1- <project-name> .cloudfunctions.net / <function-name> /```

## 3.7 Firebase Hosting Rewrites
Lưu trữ Firebase có mức độ ưu tiên đã đặt để giải quyết nội dung:

![image.png](https://images.viblo.asia/083864ba-be78-4ff0-a9b9-def9793c7441.png)

chỉ cần xóa tất cả các tệp .html trong thư mục src/public/ cho đến khi firebase deploy được chạy.

![image.png](https://images.viblo.asia/d07c9e99-d5f8-4f3a-a0b3-7b8ebbf2ff10.png)

Có thể đặt nội dung tĩnh vào thư mục src/public/ hoặc chỉ cần để lại tệp 404.html được tạo tự động (vì Next.js có trang 404 của riêng nó) và xóa index.html.
Triển khai lại ứng dụng với ```yarn deploy``` và bây giờ sẽ có thể sử dụng Hosting URL cho Ứng dụng Next.js

![image.png](https://images.viblo.asia/24f18966-a001-4a88-97d3-bdbf1a49cff7.png)

![](https://images.viblo.asia/efd9eeea-6c92-4b34-a8d7-fd6560e490c6.gif)

Local Firebase Hosting không phải là nhanh nhất, nhưng nó nhanh hơn một full deployment.

## 3.8 Tổng kết
SSR trên Firebase Hosting hiện có thể thực hiện được nhờ tích hợp với Cloud Function và hiệu suất được cải thiện theo thời gian. Có thể sử dụng cùng một framework JS cho các trang web SSR và CSR tĩnh trên cùng một cơ sở hạ tầng Firebase.

**Cảm ơn các bạn đã theo dõi đến đây. Xin chào và hẹn gặp lại !!**

Link tham khảo: https://codeburst.io/next-js-on-cloud-functions-for-firebase-with-firebase-hosting-7911465298f2