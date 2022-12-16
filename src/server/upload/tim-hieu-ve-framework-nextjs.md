Nếu đã từng làm việc với front-end chắc hẳn bạn không còn xa lạ gì với khái niệm Server Side Render đúng không. Trong bài viết lần này mình sẽ giới thiệu về một framework phổ biến hỗ trợ tối đa và tối ưu hoá cho bạn trong quá trình phát triển một ứng dụng Server Side Render, đó là NextJS.

### What is Next.js?

Next.js là một framework front-end React được phát triển dưới dạng open-source bổ sung các khả năng tối ưu hóa như render phía máy chủ (SSR) và tạo trang web static. Next.js xây dựng dựa trên thư viện React, có nghĩa là các ứng dụng Next.js sử dụng core của React và chỉ thêm các tính năng bổ sung. Việc triển khai ứng dụng SSR cho phép máy chủ truy cập tất cả dữ liệu được yêu cầu và xử lý JavaScript cùng nhau để hiển thị trang. Sau đó, trang được gửi lại toàn bộ cho trình duyệt và ngay lập tức được hiển thị. SSR cho phép các trang web load trong thời gian nhỏ nhất và tăng trải nghiệm người dùng với khả năng phản hồi nhanh hơn.

Ngoài ra,  sử dụng SSR cũng mang lại cho bạn lợi thế về SEO, giúp trang web của bạn hiển thị cao hơn trên các trang kết quả của công cụ tìm kiếm. SSR làm cho các trang web xếp hạng tốt hơn cho SEO vì chúng tải nhanh hơn và nhiều nội dung trang web có thể được quét bởi các SEO trackers. Thẻ <head> trong Next.js cũng cho phép bạn chỉnh sửa thẻ <head> của một trang web, điều mà bạn không thể thực hiện trong React. Thẻ <head> là một phần cốt lõi trong metadata của trang web và góp phần vào xếp hạng SEO của trang web.
    
### Why use Next.js?
    
Ưu điểm chính của Next.js là hỗ trợ SSR tích hợp để tăng hiệu suất và SEO. Với tất cả thông tin trên server, nó sẽ xử lý để generate ra thông tin HTML của trang/ Sau đó Client có thể gửi một yêu cầu đến Server và nhận toàn bộ trang HTML thay vì yêu cầu từng thành phần riêng lẻ với Client Render.
    ![](https://images.viblo.asia/90d38271-ce0e-43a2-96eb-cd4a86f7d172.png)
    
**Điểm mạnh:**
- Ứng dụng Next.js tải nhanh hơn đáng kể so với ứng dụng React do được render phía Server.
- Hỗ trợ các tính năng cho static web.
-  Đối với những ai đã có kinh nghiệm làm việc với React thì việc tiếp tập NextJS sẽ là một việc dễ dàng.
- Tự động code splitting cho các page nhằm tối ưu hoá performance khi load trang.
- Dễ dàng xây dựng các API internal thông qua các API routes tích hợp sẵn và tạo các endpoit API.
- Hỗ trợ tích hợp cho route cho page, CSS, JSX và TypeScript.
- Nhanh chóng thêm các plugin để tùy chỉnh Next.js theo nhu cầu của trang cụ thể của bạn.
    
    
**Điểm yếu:**
    
Nhược điểm thực sự duy nhất của Next.js là nó là một framework được cố định, có nghĩa là nó có một phương pháp và bộ công cụ cụ thể mà nó muốn bạn sử dụng để xây dựng các ứng dụng của mình. Tuy nhiên, các tùy chọn của Next.js sẽ phù hợp với phạm vi của hầu hết các dự án.

### When to use Next.js?
    
Next.js phù hợp nhất để tạo trang chủ hoặc trang đích được tối ưu hóa cũng như bất kỳ trang nào khác dựa trên lưu lượng truy cập tìm kiếm không phải trả tiền. Các trang này sẽ được hưởng lợi nhiều nhất từ các cải tiến SEO của Next.js.
    
Next.js cũng tốt hơn cho các trang web so với các ứng dụng web khác vì SSR cho phép nó có cùng hiệu suất bất kể thiết bị mà khách hàng đang sử dụng.
    
Next.js ít lý tưởng hơn để tạo các ứng dụng web hoặc các ứng dụng bảo mật yêu cầu xác thực vì những điều này không có lợi cho render phía máy chủ.
    
    
### Get started with Next.js.
    
Trong phần này mình sẽ giới thiệu cho các bạn 5 thành phần cơ bản của NextJS. Trước khi đi vào chi tiết của từng concept thì chúng ta sẽ setting môi trường và init một NextJS application nhé.
Đầu tiên các bạn cần cài đặt NodeJS trước để có thể tạo và run một ứng dụng NextJS trên máy tính của mình. Việc cài đặt NodeJS rất đơn giản nên bạn có thể tham khảo một số bài viết trên Google để tìm hiểu cách cài đặt nhé. Lưu ý khi setting nodejs là version phải từ 12.0.0 trở lên nhé các bạn.
    
NextJS hỗ trợ cả Javascript và Typescript nên bạn có thể init project theo ngôn ngữ mà bạn muốn phát triển nhé.
    
Với Javascript: `npx create-next-app <app-name> `

Với typescript: `npx create-next-app <app-name>  --typescript`
    
Sau khi tạo xong ứng dụng NextJS bạn vào file package.json để xem các script sau để khởi chạy một ứng dụng NextJS.
    
```
"scripts": {
  "dev": "next dev",
  "start": "next start",
  "build": "next build"
}
```

dev: Khởi động Next.js trong development mode.
start: Khởi động Next.js trong production mode.
build: xây dựng ứng dụng Next.js của bạn để deploy lên production.
    
Nếu bạn chạy ứng dụng này bằng cách sử dụng `next dev`, bạn sẽ thấy trang Next.js mặc định trên http: // localhost: 3000.
    
    
 ![](https://images.viblo.asia/47466b2c-ad81-4288-bebf-14c0906e27c3.png)
    
    
### Next.js Folder Structures.
    
Next.js sử dụng hệ thống tệp tối giản để tránh tệp dự án lộn xộn, có nghĩa là điểm bắt đầu chỉ chứa mức tối thiểu cần thiết để chạy ứng dụng. Hiểu cấu trúc thư mục này sẽ giúp bạn thao tác nó để phù hợp với các dự án của riêng bạn.
    
Mỗi dự án Next.js bắt đầu với 3 thư mục: pages, public và styles.
    
Dưới đây là một ví dụ về những gì bạn sẽ tìm thấy trong một dự án Next.js mới:
 
 
```
- pages
  - api
    - hello.js
  - _app.js
  - index.js
- public
  - favicon.ico
  - vercel.svg
- styles
  - globals.css
  - Home.module.css
```
    
 
**Pages:**
    
Thư mục pages chứa các tệp trang của bạn. Mỗi tệp pages là một React Component với một route duy nhất được tạo tự động từ tên tệp. Ví dụ, trang hello.js Next.js sẽ được tìm thấy tại page/hello.js.
    
Một số trang như _app.js ở trên, bao gồm tiền tố gạch dưới trong tên của chúng để đánh dấu chúng là component tùy chỉnh. Các component này được Next.js sử dụng để làm việc với các component khác.
    
Ví dụ: _app.js được sử dụng để bắt đầu mỗi trang và không được sử dụng làm trang web của riêng nó.
    
    
**Public:**

Thư mục này dành cho việc phân phát tệp tĩnh, có nghĩa là các tệp này không thay đổi và chỉ có thể được tham chiếu.

Thư mục này thường chứa hình ảnh hoặc biểu tượng mà trang web sử dụng cũng như thông tin nội bộ như Xác minh trang web của Google.
 
Ví dụ: Trong thư mục Public hiện có favicon.ico là một biểu tượng nhỏ để sử dụng trên các tab của trình duyệt và vercel.svg hiển thị biểu tượng của công ty.
    
    
**Styles:**
 
Thư mục này chứa các tệp CSS của toàn bộ ứng dụng. Tệp Gloals.css thiết lập tiêu chuẩn chung mà tất cả các trang trong dự án sẽ sử dụng.
    
Bạn cũng có thể thêm style dành riêng cho component bằng cách sử dụng các tệp module được đặt tên với hậu tố module, <componentName> .module.css.
    
    
Routing/Navigation in your App.
 
Navigation cho phép user của bạn có thể điều hướng giữa các trang web với nhau trong Next.js. Routes và Links là hai phương pháp chính bạn có thể sử dụng để xác định cách điều hướng trang web. Các Route trong Next.js có thể tiếp cận được do Next đã tích hợp chức năng định tuyến vào của từng component trong thư mục page. Để tối ưu hóa định tuyến ứng dụng của bạn, điều quan trọng là phải hiểu index, nested routes và dynamic routes. Cùng mình tìm hiểu các khái niệm đó dưới đây nhé.
    
**Index.**
  
Các tệp như index.js được chuyển đến root point của ứng dụng của bạn /, thay vì /index. Bạn có thể sử dụng điều này để làm lợi thế của mình bằng cách tạo nhiều tệp chỉ mục hoạt động như trang đích hoặc điểm bắt đầu của các đường dẫn điều hướng khác nhau trong trang web của bạn. Ví dụ như:
    
```
- pages
  - index.js # found at `/`
  - users
    - index.js # found at `/users`
    - account.js # `/users/account`
```
Ở ví dụ trên, trang index.js bên dưới các trang là trang chủ của trang web được truy cập nếu không có route bổ sung nào được nhập. Index.js thứ hai dưới users là trang đích cho đường dẫn user, được bằng cách nhập `<siteName> / users.`
    
**Nested.**
    
Nested routes là các route chỉ có thể truy cập thông qua một route mẹ được chia sẻ, chẳng hạn như /user/account. Bạn có thể nghĩ về các route lồng nhau giống như các tệp lồng nhau trên máy tính của bạn, trong đó bạn phải điều hướng qua tất cả các component cao hơn để đến được component lồng nhau.
    
**Dynamic Routes.**
    
Chức năng route trong NextJS cũng giúp chúng ta có thể tạo ra các trang web với đường dẫn động. Chẳng hạn như một trang web có chức năng detail của user khi click vào một user trên list user thì chúng ta sẽ định nghĩa file như sau:
    
```
# ...
  - users
    - index.js
    - [account.js] # `/users/[accountName]`
```
    
Lúc này chúng ta đã có thể tạo ra một trang web detail của 1 user nào đó và có thể truy cập chúng thông qua URL: `/users/[accountName]`
    
**Link.**
    
Link là thành phần được Next phát triển để cho phép người dùng có thể chuyến hướng giữa các route với nhau. 
Ví dụ: hãy xem xét một thư mục trang có các tệp sau:
```
pages/index.js
pages/about.js
pages/blog/[slug].js
```
Chúng ta có thể có một Link đến từng trang này như dưới đây:
    
```javascript
import Link from 'next/link'

function Home() {
  return (
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>About Us</a>
        </Link>
      </li>
      <li>
        <Link href="/blog/hello-world">
          <a>Blog Post</a>
        </Link>
      </li>
    </ul>
  )
}

export default Home
```
    
Link chấp nhận các prop sau:
    
- href - Đường dẫn hoặc URL để điều hướng đến.
- as - Decorator tùy chọn cho đường dẫn sẽ được hiển thị trong thanh URL của trình duyệt.
- passHref - Buộc Link gửi thuộc tính href đến con của nó. Mặc định là false.
- replace - Thay thế trạng thái history hiện tại thay vì thêm url mới vào stack. Mặc định là false.
- scroll - Cuộn lên đầu trang sau khi điều hướng đến. Mặc định là true.
- shallow - Cập nhật đường dẫn của trang hiện tại mà không cần chạy lại getStaticProps, getServerSideProps hoặc getInitialProps. Mặc định là false.
    
.... và một số props khác.
    
Ngoài ra để NextJS cũng support chúng ta trong việc khai báo và điều hướng đến các Dynamic Routes bằng Link:
    
Ví dụ: Các trang Dynamic Routes `/blog/[slug].js` sẽ khớp với liên kết sau:
    
```javascript
import Link from 'next/link'

function Posts({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Posts
```
    
    
### Conclusion.

Trong bài viết này mình đã giới thiệu cơ bản về một số khái niệm trong NextJS cũng như ưu và nhược điểm của nó. Trong phần tiếp theo mình sẽ đi sâu vào các khái niệm cũng như cách hoạt động của chúng trong NextJS nhé.