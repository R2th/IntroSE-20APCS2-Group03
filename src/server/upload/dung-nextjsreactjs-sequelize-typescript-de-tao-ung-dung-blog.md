![](https://images.viblo.asia/51f28b8d-2183-4268-9fad-5755aac2adb5.png)

Chào mọi người!

Bài viết này sẽ hướng dẫn bạn cách sử dụng Nextjs, Sequelize bằng Typescript để tạo ứng dụng blogs với một vài chức năng cơ bản như:
* Admin Dasboard để quản lý Category, Post
* Landing Page để hiển thị các Post được tạo từ Admin

# Những thư viện chính
* [Nextjs](https://nextjs.org/) là một framework được xây dựng trên nền tảng Nodejs, dùng để render các React Component từ phía máy chủ. Rất hữu ích cho việc SEO website của bạn
* [Reactjs](https://reactjs.org/) là một thư việc Javascript. Nó cung cấp các giải pháp hữu ích cho lập trình front-end, cho phép bạn tạo các ứng dụng web động và tương tác một cách dễ dàng.
* [Sequelize](https://sequelize.org/) là một ORM library, dùng để xây dựng các model trong cở sở dữ liệu cũng như việc tương tác với chúng

# Yêu cầu hệ thống
* [Node.js](https://nodejs.org/en/) 12.0 trở lên
* MacOS, Windows (bao gồm WSL), và Linux cũng được hỗ trợ

# Cài đặt

Trước khi đọc tiếp, bạn hãy tải [source code](https://github.com/ltienphat1307/nextjs-sequelize-typescript) về trước. Mình đã set up đầy đủ những thứ cơ bản và sẽ giải thích ở phần tiếp theo.

Sau khi tải về thì làm theo các bước bên dưới.
```
# cd to the root folder of project
npm i
npm run dev
```

* open http://localhost:3000/ bạn sẽ thấy Landing page
* open http://localhost:3000/admin , đây chính là giao diện Admin Board

# Cấu trúc project
![](https://images.viblo.asia/507ad4ba-d99a-46aa-95f5-079026a0962e.png)

1. `index.ts` Đây là file tuỳ chỉnh server để khởi chạy ứng dụng của chúng ta. Mình dùng nó để start server, kết nối cơ sở dữ liệu và có thể tuỳ chỉnh thêm nhiều thứ nữa tuỳ vào mục đích dự án của bạn. Mặc định, Nextjs sẽ tự khởi chạy theo cách của nó nên bạn sẽ không thấy được file này. Bạn có thể tìm hiểu thêm về cách tuỳ chỉnh file server tại đây https://nextjs.org/docs/advanced-features/custom-server

2. `public` folder. Thư mục này để chứa những file tĩnh như hình ảnh, fonts hoặc styles... Nextjs sẽ tự động nhận biết được thư mục này trong ứng dụng của bạn. Xem thêm tại https://nextjs.org/docs/basic-features/static-file-serving

3. `server` folder. Thư mục này sẽ chứa toàn bộ những định nghĩa về model bằng Sequelize cũng như các repository. Bạn có thẻ sử dụng chúng ở bất kỳ đây trong ứng dụng bởi vì Nextjs là một framework hỗn hợp. Ở phía **server**, bạn sử dụng chúng để tương tác với cơ sở dữ liệu. Còn ở phía **Client side**, bạn có thể dùng chúng để định nghĩa kiểu dữ liệu cho các React Component. 

    **Chú ý**: file `server/models/index.ts` chứa thông tin kết nối tới cơ sở dữ liệu của bạn. Hãy lưu chúng vào `.env` file, Dùng [dotenv](https://www.npmjs.com/package/dotenv) package để load chúng vào biến môi trường `process.env`

![](https://images.viblo.asia/97685a3b-521c-430e-95a9-a2dc50d7a972.png)

4. `src/pages` folder. Trong Nextjs, mỗi React Component được đặt trong folder này sẽ sinh ra một route theo tên file đã tạo. VD:
    * **src/pages/index.tsx** sẽ render trang trang home với route là `/`
    * **src/pages/admin/index.tsx** sẽ render admin page với route là `/admin`
    * Ví dụ khác, Nếu bạn tạo **src/pages/about.tsx** thì người dùng có thể truy cập vào page `/about`

    Xem thêm tại https://nextjs.org/docs/basic-features/pages

5. `src/pages/_app.tsx` Đây là file quan trọng, Nextjs dùng nó đẻ khởi chạy các pages. Bạn có thể chỉnh sửa nó để cấu hình Layout hoặc đặt những Component luôn hiển thị cho toàn ứng dụng như Header hay Footer. Ví dụ bên dưới là cách chia Layout cho Admin và Landing page. Xem thêm tại [đây](https://nextjs.org/docs/advanced-features/custom-app)

![](https://images.viblo.asia/b79d1b01-601c-47dd-977c-f7ff1ec077ad.png)

6. Những folder khác bên trong `/src` folder cũng là những React Component sẽ được import để sử dụng bởi những Component bên trong thư mục **pages**

# Các chức năng mẫu
1. Quản lý Category và Post

* **Sau đây là ví dụ lấy danh sách categories**

![](https://images.viblo.asia/7237b4ba-7060-428a-bff3-c2a1bfc27673.png)

Trang này (**src/pages/admin/category.tsx**) là giao diện quản lý Category trong Admin. Như bạn thấy, mình đã lấy data và render danh sách các Categories. Nextjs có cơ chế xử lý trước cho mỗi yêu cầu lên máy chủ nếu ta sử dụng `getServerSideProps` function trong các page Component. Và dĩ nhiên bạn có thể sử Sequelize tại đây để tương tác với database. Hàm này sẽ được gọi trên **server** trước khi render React Component đến **client side**

![](https://images.viblo.asia/a3724f7a-d447-4776-b5ea-c6007bb429c9.png)

Trong React Component, chúng ta nhận data này thông qua thuộc tính **props**

![](https://images.viblo.asia/6d6fc02a-920a-4b45-a65a-a0365e32fb03.png)

Xem thêm cách sử dụng `getServerSideProps` function tại [đây](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering)

* **Ví dụ tạo Category**

Để tạo Category, chúng ta cần tạo API. Trong Nextjs, chúng ta có thể định nghĩa API bằng cách tạo bất kỳ một module trong thư mục `src/pages/api` . Nextjs sẽ tự sinh ra route tự động theo tên file đã tạo

Xem hình bên dưới, mình đã tạo một module là `/pages/api/admin/category`. Nextjs sẽ sinh ra API có route là `"/api/admin/category"`

![](https://images.viblo.asia/636c6260-b730-499d-8fd8-1044bc343a94.png)

Bên trong React Component, chúng ta có thể gọi nó như đoạn code bên dưới

```javascript
async function createCategory() {
    try {
      const res = await fetch("/api/admin/category", {
        method: "post",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      categories.push(data);

      setCategories([...categories]);
      setFormData({});
    } catch (e) {
      console.error(e);
    }
}
```

* Xem thêm tại https://nextjs.org/docs/api-routes/introduction
* Mình cũng tạo trang quản lý Post như hình bên dưới, bạn truy cập http://localhost:3000/admin/post để chạy thử

![](https://images.viblo.asia/c4ad9129-5392-41b2-a807-7762477bfcf1.png)

2. Landing page

Trong homepage `/src/pages/index.tsx`, mình cũng sử dụng `getServerSideProps` function để hiển thị toàn bộ các POST

![](https://images.viblo.asia/5335ba26-aa24-4b71-94fd-e52bb2adab41.png)

Code mẫu
```javascript
import React from "react";

import { PostCard } from "@src/components/client/components/Blogs";
import { PostRepository } from "@server/repositories";
import { Post, User } from "@server/models";

interface PageProps {
  posts: Post[];
}

export async function getServerSideProps() {
  const posts = await PostRepository.findAllRaw({
    include: {
      model: User,
      required: true,
    },
  });

  return { props: { posts } };
}

export default function Home(props: PageProps) {
  const { posts } = props;

  return (
    <div className="container">
      <section className="post-feed">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
}
```

3. Landing page details

Nextjs cũng hỗ trợ route động. Để tạo một trang với `/posts/:slug` route, mình chỉ cần tạo 1 Component bên trong thư mục **pages** như thế này `src/pages/posts/[slug].tsx`

Trong hình bên dưới, mình đang hiển thị nội dung bài Post có slug là **tamletam**

![](https://images.viblo.asia/63ca15f6-a50e-4dd6-b71e-bb0a2bda9791.png)

Bên trong code, mình vẫn sử dụng `getServerSideProps` function. Nhưng trong trường hợp này, Nextjs sẽ cung cấp cho chúng ta đối tượng `query` mà giá trị của nó là `{slug: "tamletam"}`. Và dĩ nhiên, chúng ta sẽ sử dụng param này để tìm Post có slug là `tamletam` bằng Sequelize

```javascript
import React from "react";
import { NextPageContext } from "next";

import { PostContent } from "@src/components/client/components/Blogs/PostContent";
import { PostRepository } from "@server/repositories";
import { Post } from "@server/models";

export async function getServerSideProps(nextPage: NextPageContext) {
  const slug = nextPage.query.slug as string;
  let post: Post;

  try {
    post = await PostRepository.findOneRaw({
      where: { slug },
    });

    return { props: { post } };
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }
}

interface PageProps {
  post: Post;
}

export default function PostContentPage(props: PageProps) {
  return <PostContent post={props.post} />;
}
```

Xem thêm cách sử dụng dynamic route tại https://nextjs.org/docs/routing/dynamic-routes

# Một số lưu ý
* Bạn có thể set up lại layout tuỳ thuộc vào thiết kế website của bạn bằng cách chỉnh sửa file `src/pages/_app.tsx`
* Bạn có thể di chuyển thư mục `server` đến bất kỳ chổ nào trong app, miễn sao nó vẫn nằm trong thư mục gốc
* Trong các ví dụ trên, thì mình chưa xác thực người dùng khi truy cập vào Admin Board. Tuy nhiên, bạn có thể làm điểu đó bằng cách xem bài viết này https://nextjs.org/docs/authentication

# Enjoy!!