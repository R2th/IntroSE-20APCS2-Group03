## 1. Mở đầu
<hr>

Sau một thời gian làm việc với `ReactJS` với **Client Side Rendering (CSR)** thì gần đây, mình đang tìm hiểu về việc thực hiện **Server Side Rendering (SSR)** với `ReactJS` cụ thể là với `NextJS` - một  framework cho chúng ta thực hiện **SSR** với `ReactJS`. Khi viết bài này mình cũng đang trong quá trình mới tìm hiểu về `NextJS` nên bài này sẽ không hề chứa các lời khuyên hay đứa ra các cách làm tốt nhất mà đơn giản chỉ là chia sẻ lại cho các bạn những gì mình tìm hiểu được và mong rằng sẽ tiết kiệm cho các bạn một chút thời gian khi chuyển từ **CSR** sang **SSR** với `NextJS`. Trước khi các bạn tiếp tục đọc bài này và cũng là để dễ dàng hơn cho bạn thì các bạn nên:
- Hiểu biết cơ bản về **Client Side Rendering** và **Server side rendering**
- Có kiến thức cơ bản với `ReacJS`

## 2. NextJS
<hr>

Ngay khi vào trang chủ của [NextJS](https://nextjs.org/) thì ngay lập tức ta biết được ngay nó là gì cũng như ứng dụng của nó:

![](https://images.viblo.asia/9b247246-4d55-4730-bd3b-754014fe4a38.gif)

Về cơ bản thì với việc **SSR**  thì `NextJS` giới thiệu là sẽ cung cấp cho chúng ta một số thứ như:
- Hiệu năng tốt hơn so với ứng dujgn **CSR**
- Mang lại khả năng SEO tốt hơn mà **CSR** không có như là việc chia sẻ bài viết.

Trên trang chủ thì bạn cũng có thể tìm thấy rất nhiều các website đang sử dụng `NextJS` để xây dựng sản phẩm của mình trên mọi lĩnh vực như tài chính, tin tức, thuwong mại điện tử, ... . Giới thiệu qua cho các bạn như vậy còn bây giờ chúng ta sẽ đi vào những gì mình đã tìm hiểu được.
<br>
*Lưu ý: danh sách những gì mình chia sẻ dưới đây là dựa trên những gì mình đang dùng quen bên ReactJS và muốn tìm cách làm điều tương tự với NextJS*

### a. Khởi tạo ứng dụng NextJS

Tương tự với **create-react-app** của `ReactJS` thì với `NextJS` ta cũng có công cụ tương tự là **create-next-app**. Bạn có thể cài đăt và xem hướng dẫn cài đặt chi tiết ở [đây](https://github.com/zeit/create-next-app). Sau khi cài việc cài đặt thành công ta có thể khởi tạo một ứng dụng `NextJS` mới với lệnh:
```bash
$ create-react-app learn-nextjs
```
Sau khi tạo ta sẽ có được cây thư mục như sau:

![](https://images.viblo.asia/0d5ed402-43c3-4a74-b8c7-a5c27e48bdbf.png)

Với cây thư mục này thì ta cần quan tầm đến một số thứ như:
- `components`: như cái tên thì nó sẽ là nơi chức các component cho ứng dụng của chúng ta.
- `pages`: đây là nơi chứa các trang mà chúng ta truy cập từ url vào, cụ thể mình sẽ nói đến ở dưới.
- `static`: là thư mục chứa các file static của chúng ta như ảnh, css, ...
- `next.config.js`: cũng như cái tên thì nó là fie chứa config cho ứng dụng của chúng ta.

### b. Sử dụng SCSS

`ReactJS` hay `NextJS`thì đều là để nhắm đến phần UI cho nên với mình việc làm sao để có thể style cho các component trong ứng dụng của chúng ta là một trong những thứ đầu tiên mình quan tâm. Thông thường với ứng dụng `ReactJS` thì mình sẽ sử dụng `scss` và việc này cũng đã được **create-react-app** hỗ trợ sẵn. Tuy nhiên với `NextJS` để sư dụng được `scss` thì ta phải cài thêm một package là `@zeit/next-sass` như sau:
```shell
yarn add @zeit/next-sass node-sass
```

Trong file `next.config.js` thêm nội dung sau:

```javascript
const withSass = require('@zeit/next-sass');
module.exports = withSass();
```
Có một lưu ý là bạn bắt buộc phải import ít nhất một file `.scss` vào các file trong folder `/pages` nếu không bạn sẽ gặp phải một bug khá kì lạ đó là khi bạn vào trang không được import file `.scss` đầu tiên khi truy cập ứng dụng thì sẽ không bấm chuyển trang được. Bug này đã được cộng đồng phát hiện và mong rằng sẽ sớm được fix trong thời gian tới.

### c. Sử dụng các file static

Một điều quan trọng nữa đối với UI là ta sẽ cần phải chèn ảnh vào trang của chúng ta. Như ở trên mình đã nói là chúng ta có một folder là `/statics`. Đối với ảnh thì bên trong ta nên tạo thêm một folder là `/images` và lưu ảnh vào đó. Lúc này ở trong bất cứ component nào ta có thể sử dụng ảnh đó bằng cách như sau:
```javascript
const MyImage = () => (
	<img src="/statis/images/my-image.png" />
);
```

### d. Sử dụng next/head

Để hỗ trợ cho việc SEO cũng như chia sẻ thì `NextJS` cung cấp cho chúng ta một component là `next/head`. Cách sử dụng như sau:
```javascript
import Head from 'next/head';

function IndexPage() {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <p>Hello world!</p>
    </div>
  );
}

export default IndexPage;
```
Về cơ bản nội dung mà chúng ta khai báo trong phần `<Head>` này sẽ được thêm vào phần `<head>` trang html mà chúng ta trả về cho user. Điều này đồng nghĩa với tùy trang ta có thể truyền thêm các thông tin như `title`, `meta`, `og:image`, `og:title`, ... để có thể share lên các trang khác như facebook.

### e. Fetch dữ liệu từ server

Để có được các thông tin về trang để điền vào phần `<Head>` ở trên thì ta sẽ cần thêm thông tin từ phía server. Ví dụ trong trường hợp bạn copy link một bài viết của mình và paste vào comment trên facebook và nhận được kết quả như sau:

![](https://images.viblo.asia/149cb646-1b27-4699-b7f2-06a6b9a56884.png)

Thì tất nhiên phần `<Head>` của trang chúng ta sẽ cần điền tối thiểu các phần thông tin như `og:image` và `og:title` mà các thông tin này sẽ có được bằng cách ta lấy dữ liệu từ server. `Nextjs` cung cấp cho chúng ta thêm một hàm có tên là **getInitialProps()** có chức năng có thể hiểu là giống như **componentDidMount()** nhưng hoạt động được với **SSR **và có là thay thế được cho **componentDidMount()** với ứng dụng SSR. Cụ thể như sau: 
```javascript
import React, { Component } from 'react';
import axios from 'axios';

class HelloUA extends Component {
  
    static async getInitialProps({ req }) {
    	const response = await axios.get('http://localhost:8000/api/v0/posts');
        const data = response.data;

        return {
            data
        };
  	}

  	render() {
    	return <div>Number of post: {this.data.length}</div>
  	}
}

export default HelloUA;
```
Hàm này bắt buộc phải return nội dung là một **Object** thông thường chứ không được thuộc dạng **Date**, **Map** hay **Set**. Hàm này sẽ được gọi lại nếu được chuyển hướng tới URL khác thông qua `next/link` (sẽ nói đến ở mục sau). Đồng thời ta cũng có thể sử dụng hàm **getInitialProps()** trong stateless component như sau:

```javascript
import React, { Component } from 'react';
import axios from 'axios';

const HelloUA = ({ data }) => (
    <div>Number of post: {this.data.length}</div>
);

HelloUA.getInitialProps = async ({ req }) => {
    const response = await axios.get('http://localhost:8000/api/v0/posts');
    const data = response.data;

    return {
        data
    };
}
```
*Lưu ý: hàm **getInitialProps()** chỉ hoạt động trong `/pages`. Đồng thời hàm này cũng nhận vào một tham số là một request object chứa các thông tin như queryParameter, ... .* 

### f. Routing

`Nextjs` sẽ tự động tạo thành các `router` đối với các file mà bạn tạo trong folder `pages/`, ví dụ:

- `pages/index.js` sẽ ứng với url gốc là `/`
- `pages/post/index.js` sẽ ứng với url là: `/post`
- `pages/post/create.js` sẽ ứng vớ url là: `/post/create`



Tuy nhiên với trường hợp bạn muốn url của bạn có dạng `/post/:postId` thì lúc này ta sẽ cần dùng đến 1 file đóng vai trò là server như sau:

```javascript
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

app.prepare()
    .then(() => {

    	// Slug on url
        server.get('/post/:postId', (req, res) => {
            console.log(req.params.postId);
            return app.render(req, res, '/post', { postId: req.params.postId })
        });

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(3000, err => {
            if (err) console.log(err)
            console.log('> Ready on port 3000');
        })
    })
    .catch(err => {
        console.log(err);
        process.exit();
    });

```

Về cơ bản đây là file `server.js` có vai trò hỗ trợ việc **SSR**. Vì phần `postId` kia là tham số động và ta không có cách nào để tạo ra url động dưới dạng đó theo quy  tắc sinh url theo page của `Nextjs`. Với cách viết trên thì cái url có dạng `/post/:postId` sẽ được bên client hiểu là `/post?postId=?` nhưng với cơ chế rewrite url nên nó sẽ là `/post/:postId` và trong component của chúng ta có thể lấy được `postId` này như một query param như sau:

```javascript
import React from 'react';
import Link from 'next/link';
import axios from 'axios'

import '../../static/scss/style.scss';

const PostPage = (props) => (
    <div>
        <p>{props.data.title}</p>
        <Link href="/">
            <a>Back</a>
        </Link>
    </div>
);

PostPage.getInitialProps = async ({ query }) => {
    const postId = query.postId
    const res = await axios.get(`http://localhost:8000/api/v0/posts/${postId}`);

    return { data: res.data };
};

export default PostPage;
```

Với đoạn code trên khi lần đầu ta truy cập vào trang với url `/post/1` thì trong component của chúng ta sẽ lấy được số 1 giống ứng với `postId` và sử dụng nó để gọi API và lấy về post có id là 1 sau đó render ra giao diện tương ứng trên server và trả về file nội dung html đầy đủ cho chúng ta. Tuy nhiên đó là cách mà ta khai báo router với SSR còn với Client thì chúng ta sẽ sử dụng thẻ `next/link` để thực hiện việc điều hướng.

### g. Link

**Nextjs** cung cấp sẵn cho chúng ta một component là **next/link** giống như component `<Link />` trong **react-route**. Tuy nhiên khi sử dụng cú pháp sẽ như sau:


```javascript
// pages/index.js
import NextLink from 'next/link';

function Home() {
  return (
    <div>
      <NextLink href="/about">
        <a>Back to home</a>
      </NextLink>
    </div>
  );
}

export default Home;
```

Như bạn có thể thấy component `<NextLink/>`  sẽ bắt buộc phải có một thuộc tính là **href** để trỏ đến đường dẫn cần thiết và đặc biệt bên trong nó phải chứa một cặp thẻ bất kì như`<a></a>`, `<button></button`>, `<div></div>`... giống như trong ví dụ trên. Ngoài ra `next/link` còn nhận vào một tham số nữa là **as** đóng vai trò như việc rewrite url. Ở phần nội dung trước **Routing** chúng ta đã nói về việc sử dụng url có dạng `/post/:postId` ở phía SSR còn ở phía client ta sẽ phải dùng `next/link` như sau:

```javascript
// pages/index.js
import NextLink from 'next/link';

function Home() {
  return (
    <div>
      <NextLink href="/post?postId=1" as="/post/1">
        <a>To post detail</a>
      </NextLink>
    </div>
  );
}

export default Home;
```

Như phần trước đã nói `postId` sẽ được coi như 1 query param trong **Nextjs** cho nên ta phải viết dưới dạng `/post?postId=1` sau đó sử dụng thuộc tính thử 2 của **next/link** là **as** để truyển nó về dạng ta mong muốn là **/post/1** vì ở client sẽ không cho phép bạn viết sẵn kiểu **href="/post/:postId"**.

*Lưu ý: nếu ta đang từ ở 1 trang khác ví dụ như trang `/` và bấm chuyển trang với **nex/link** với **href="/post?postId=1"** thì mọi việc sẽ diễn ra như bình thường và ta có thế lấy cái `postId` đó như query param bên component `<Post /` tuy nhiên nếu ta reload lại trang `/post/1` thì sẽ dẫn tới 404 vì mặc định bên client sẽ không hiểu đường dẫn này mà nó chỉ hiểu `/post?postId=1` và rewrite lại thành `/post/1`. Đó là lý do vì sao ta cần file `server.js` để hỗ trợ các trường hợp như trên vì khi ta reload trang với url `/post/1` thì trên server có thể lấy được tham số 1 đó và truyền nó lại vào phần render app của chúng ta dưới dạng query param.*

Ngoài ra việc khai báo url theo dạng nói trên:

```javascript
<NextLink href="/post?postId=1" as="/post/1">
	<a>To post detail</a>
</NextLink>
```

Ta cũng có thể viết **href** dưới dạng object như sau:

```javascript
<NextLink href={{ pathname: '/post', query: {postId: '1'} }} as="/post/1">
	<a>To post detail</a>
</NextLink>
```
Sẽ cho chúng ta kết quả là url dạng `/post?postId=1`.
<br>
Ngoài cách sử dụng thẻ `next/link` ta cũng có thể dùng gán một function vào phần tử bất kì trong UI để tiến hành thay đổi url thông qua việc sử dụng `next/router`. Ví dụ với trường hợp url là `/posts/1` ta có thể viết như sau:

```javascript
import React from 'react';
import Router from 'next/router';

class Home extends React.Component {
    changeRouter = () => {
        Router.push({
            pathname: '/post',
            query: { postId: 1 },
            asPath: '/post/1'
        });
    }
    
    render() {
        return (
        	<div onClick={this.changeRouter}>Click me!</div>
        )
    }
}

export default Home;
```

## 3. Kết bài
<hr>

Bài viết của mình đến đây đã khá là dài nên mình sẽ dừng lại ở đây. Trong phần tiếp theo mình sẽ tiếp  tục chia sẻ thêm những điều khác mà mình tìm được. Nếu các bạn thấy mình sai ở đâu hoặc có gì thắc mắc có thể comment ngay ở bên dưới. Cám ơn các bạn đã đọc bài.