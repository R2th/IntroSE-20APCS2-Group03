## 1. Mở đầu
<hr>

Chào mừng các bạn đến với phần 2 của bài viết tìm hiểu về `NextJS`. Trong [bài viết trước](https://viblo.asia/p/tim-hieu-ve-nextjs-p1-djeZ1bNjlWz) của mình đã đề cập cho các bạn một số khái niệm như:
- Tạo ứng dụng NextJS
- Sử dụng SCSS trong NextJS
- Sử dụng các file static
- Sử dụng next/head cho việc chia sẻ
- Fetch dữ liệu từ server
- Routing và Link trong NextJS.

<br>

Nếu bạn vẫn chưa đọc thì bạn có thể theo dõi lại tại [đây](https://viblo.asia/p/tim-hieu-ve-nextjs-p1-djeZ1bNjlWz). Bây giờ chúng ta cùng bắt đầu với nội dung của phần 2 nào.

## 2. NextJS 9
<hr>

Trước khi đi vào nội dung bài viết thì mình muốn báo cho các bạn là ở phần 1 những gì mình tìm hiểu là trên `NextJS` phiên bản **8.1.0**. Tuy nhiên vào ngày `8/7/2019` thì `NextJS` đã chính thức ra mắt phiên bản **9.0.1** với những cải tiến mới. Tuy nhiên ở phần này mình sẽ không đề cập đến toán bộ những nâng cấp đó mà chỉ đề cập đến duy nhất một phần đó là `Routing` đã được cập nhật trong phiên bản này. 
<br>

Với những kiến thức mình cung cấp cho bạn ở phần trước khi vẫn hoàn toàn sử dụng được ở phiên bản mới này.

## 3. NextJS9
<hr>

### a. Routing

Nếu bạn còn nhớ ở trong phần trước ở phần [Routing](https://viblo.asia/p/tim-hieu-ve-nextjs-p1-djeZ1bNjlWz#_f-routing-7) để chúng ta có thể sử dụng **Server Side Rendering** với các url có chứa tham số như `/post/:postId` thì ta sẽ phải tạo một file `server.js` có nội dung như sau để có thể xử lý các dynamic router này:
```js
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

Điều này sẽ dẫn đến mỗi khi muốn thêm một dynamic url như trên bạn bắt buộc phải thêm nội dung cả file mới này. Nhưng với phiên bản 9 này thì chúng ta sẽ không cần làm điều đó nữa. Vẫn với trường hợp như trên, bạn muốn tạo ra url có dạng `/post/:postId` với `postId` là giá trị thay đổi tùy thuộc vào bạn muốn xem chi tiết bài viết nào thì ta sẽ tạo folder như sau
```js
/pages/post/[postId].js
```

Vẫn áp dụng quy tắc tạo router như ở trong phần một mình có nói nhưng ở đây bên trong folder `/post` ta sẽ tạo hẳn 1 file là `[postId].js` (bạn lưu ý là phải có  phần ngoặc vuông "[]") . Việc tạo trên sẽ cho ta một url có dạng `http://my-domain.com/post/:postId` với `postId` là string bất kì.  Bên trong file `[postId].js` là một component bình thường:
```js
import React, { Component } from 'react';

class PostDetail extends Component {

    static async getInitialProps({ query }) {
        const { postId } = query;
        const { data } = await axios.get(`http://domain.com/posts/${postId}`);
        
        return {
            post: data
        }
    }

    render() {
        return (
            <div>
                {this.props.post.title}
            </div>
        );
    }
}

export default PostDetail;

```

Và lấy tham số `postId` để gọi API lấy chi tiết bài viết đó. Có thể nói thay đổi của phần Routing trong phiên bản 9 này khá là hữu ích vì nó giúp ta loại bỏ được việc phải tạo riêng file `server.js` như trước kia. Thêm nữa không chỉ tạo được dynamic url dưới dạng đơn giản như kia mà bạn hoàn toàn có thể tạo cả folder dynamic như sau:
```js
/pages/blog/[blogId]/comments/[commentId].js
    -> Url: http://my-domain.com/blog/:blodId/comments/:commentId
```
Trong component chứa trong file `[commentId]`.js` ta hoàn toàn có thể lấy cả `blogId` và `commenId` ra như trong ví dụ nói trên:
```js
import React, { Component } from 'react';

class Comment extends Component {

    static async getInitialProps({ query }) {
        const { blogId, commentId } = query;
        ...
    }
}

export default Comment;
```

Cuối cùng là ở phiên bản này ở component `next/link` để có thể tạo ra url có dạng `http://my-domain.com/post/:postId` thì trong code ta sẽ viết dưới dạng:
```js
<NextLink href="/post?postId=1" as="/post/1">
    <a>To post detail</a>
</NextLink>
```
Lý do tại sao thì bạn có thể đọc lại phần này tại [đây](https://viblo.asia/p/tim-hieu-ve-nextjs-p1-djeZ1bNjlWz#_g-link-8). Còn trong phiên bản 9 này thì ta chỉ cần viết bình thường là
```js
<NextLink href="/post/1">
    <a>To post detail</a>
</NextLink>
```
Đó là phần thay đổi mình muốn nói lại cho các bạn biết còn sau đây chúng ta sẽ đi tiếp vào khác nội dung khác của `NextJS`.

### b. Prefetch page

Ngoài những tính năng mặc định của **next/link** thì nó còn cung cấp cho chúng ta khả năng `prefetching`. Tuy nhiên chức năng này chỉ hoạt động trên môi trường `production`. Cụ thể mỗi `page` của bạn đã măc định được **Nextjs** complie thành các file riêng hay có thể gọi là các `chunk`. Khi bạn truy cập trang nào thì mới tiến hành tải file đó. Tuy nhiên với tính năng `prefetching` sẽ cho phép chúng ta tải trước các file này ở background để khi bạn truy cập url tương ứng với page đó thì sẽ lấy file js đó ra dùng luôn chứ không cần phải mới bắt đầu tải nó nữa. Đối với phiên bản 8 thì tất cả những gì ta cần thêm thuộc tính prefetch vào:
```javascript
import NextLink from 'next/link'

<NextLink href={{ pathname: '/post', query: {postId: '1'} }} as="/post/1" prefetch>
	<a>To post detail</a>
</NextLink>
```
Tuy nhiên thì ở phiên bản 9 việc prefetch sẽ được tự động thêm vào toàn bộ các component `next/link` một cách mặc định toàn bộ các url của các trang khác xuất hiện trên màn hình của chúng ta. Ngoài cách prefetch page bằng cách sử dụng **next/link** như trên ta cũng có thể sử dụng 1 API khác mà **Nextjs** cung cấp như sau:
```javascript
import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';

class Home extends React.Component {
    componentDidMount() {
        this.props.router.prefetch('/about')
    }
    
    render() {
        return (
        	<div>
            	<Link href="/about">
                    <a>About</a>
                </Link>
          
                <Link href="/post/1">
                    <a>PostPage</a>
                </Link>
            </div>
        )
    }
}

export default withRouter(withRouter);
```
Việc bọc toàn bộ component của chúng ta với **withRouter** sẽ cho phép component của chúng ta sử dụng một props là router với các chức năng của **next/router**. Với phiên bản 9 thì việc prefetch là mặc định khi bạn sử dụng `next/link` tuy nhiên trong trường hợp bạn muốn ngăn chặn việc prefetch cho một số url mà người dùng ít khi vào thì ta có thể ngăn chặn nó bằng cách thêm một thuộc tính là `prefetch={false}` như sau:
```js
import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';

class Home extends React.Component {
    componentDidMount() {
        this.props.router.prefetch('/about')
    }
    
    render() {
        return (
        	<div>
                <Link href="/post/1" prefetch={false}>
                    <a>PostPage</a>
                </Link>
            </div>
        )
    }
}

export default withRouter(withRouter);
```

*Lưu ý: Prefetch chỉ hoạt động trên production build.*

### c. Dynamic import

Tương tự với việc sử dujgn **lazy-load** trong **React** thì `Dynamic Import` của **Nextjs** hỗ trợ chúng ta trong việc tự động phân chia code thành các chunks nhỏ và tất nhiên nó cũng hỗ trợ SSR.

##### Dyaminc import cơ bản
Để sử dụng `Dynamic Import` ta chỉ cần thêm **next/dynamic** vào file của chúng ta và gọi ra như sau:

```javascript
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/Hello'));

function Home() {
  return (
    <div>
      <Header />
      <DynamicComponent />
      <p>HOME PAGE is here!</p>
    </div>
  );
}

export default Home;
```

Với cách import trên thì chỉ khi ta sử dụng đến hay nói cách khác là render ra `<DynamicComponent />` thì lúc đó ứng dụng của chúng ta mới load file js của component này về. Việc làm như vậy tránh cho việc chúng ta phải load toàn bộ các component trong khi thực tế chỉ cần dùng một số component.
<br>

##### Với component sử dụng named exports
Ở ví dụ trên component `<Hello />` của chúng ta được export default cho nên ta chi cần import như vậy. Tuy nhiên trong trường hợp 1 file có chứa nhiều component và được export theo name như sau:

```javascript
// component.js
export const Hello = () => <div>Hello</div>

export const Bye = () => <div>Bye</div>

export const Hi = () => <div>Hi</div>
```

Thì ta phải chọn chính xác component mà ta muốn sử dụng. Với **next/dynamic** ta có thể viết như sau:

```javascript
import dynamic from 'next/dynamic';

const DynamicHello = dynamic(() => 
	import('../component.js').then(component => component.Hello)
);
```

Cú pháp là tương tự với component `<Bye />` và `<Hi />`:

```javascript
const DynamicBye = dynamic(() => 
	import('../component.js').then(component => component.Bye)
);

const DynamicHi = dynamic(() => 
	import('../component.js').then(component => component.Hi)
);
```
<br>

##### Thêm hiệ ứng Loading
Để có UX thân thiện hơn khi load component dynamic thì **next/dynamic** còn cung cấp cho chúng ta khả năng hiển thị bất cứ phần UI nào ta muốn trong khi chờ load component dynamic như sau:

```javascript
import dynamic from 'next/dynamic';

const DynamicHello = dynamic(() => 
	import('../component.js').then(component => component.Hello),
    {
    	loading: () => <p>Loading...</p>
	}
);
```
<br>

##### Bỏ qua SSR
Với nhưng component chỉ hoạt động được trên browser vì sử dụng những thành phần như `window` hay `document` thì ta có thể sử dụng dynamic import để loại bỏ việc load component này ở phía server như sau:

```javascript
import dynamic from 'next/dynamic';

const DynamicHello = dynamic(() => 
	import('../component.js').then(component => component.Hello),
    {
    	ssr: false
	}
);
```
<br>

##### Load nhiều component đồng thời
Ngoài việc load từng component một thì ta cũng có thể load nhiều component dynamic cùng lúc như sau:
```javascript
import dynamic from 'next/dynamic';

const HelloBundle = dynamic({
  modules: () => {
    const components = {
      Hello1: () => import('../components/hello1'),
      Hello2: () => import('../components/hello2')
    };

    return components;
  },
  render: (props, { Hello1, Hello2 }) => (
    <div>
      <h1>{props.title}</h1>
      <Hello1 />
      <Hello2 />
    </div>
  )
});

function DynamicBundle() {
  return <HelloBundle title="Dynamic Bundle" />;
}

export default DynamicBundle;
```
Với đoạn code trên ta sẽ load song song 2 component là `<Hello1 />` và `<Hello2 />` sau đó thực hiện render rồi trả về 1 component bọc 2 component vừa load được đó đem đi sử dụng.

### d. Custom App.js

Nếu bạn đã làm việc với `ReactJS` thông thường thì chắc hẳn bạn sẽ để ý thấy sẽ có một file là `App.js` nơi bạn sẽ import toàn bộ các `<Router />` trong ứng dụng của bạn vào và mount component này ra trang của bạn. Tuy nhiên khi bạn tạo mộ ứng dụng `NextJS` với CLI mà mình cung cấp ở phần trước thì hoàn toàn không thấy file này đâu cả. Thực chất thì `NextJS` đã tạo sẵn một file mặc định cho bạn rồi và khi bạn chạy ứng dụng thì `NextJS` cũng sẽ gọi file này ra đầu tiên tương tự với việc mount file `App.js`. Tuy nhiên trong `NextJS` thì file này sẽ có tên là `_app.js` và nó nằm ở đường dẫn `/node_modules/next/dist/pages/_app.js` file này không chứa bất cứ gì đặc biệt cả nên chính vì thể `NextJS` cho phép chúng ta viết lại file này để có thể thêm những config khác mà chúng ta muôn. Để làm điều này bạn chỉ cần tạo một file tương ứng là `_app.js` trong folder `/pages/_app.js` với nội dung mặc định như sau:
```js
import React from 'react';
import App, { Container } from 'next/app';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;
```
Lưu ý nội dung nói trên là nội dung mặc định phải có trong file `_app.js` và bạn không nên xóa bất cử nội dung nào đi mà chỉ nên thêm vào các logic mới mà bạn mong muốn như:
- Tạo một layout chung cho toàn bộ trang
- Chia sẽ một state nào đó giữa toàn bộ các trang
- Viết lại phần xử lý lỗi
- ...

Giả sử ở đây mình muốn mỗi khi ứng dụng của mình bị lỗi thì nó sẽ lưu lại lỗi này và lưu lại trên sentry thì ta sẽ sửa lại file `_app.js` này như sau:
```js
import React from 'react';
import App, { Container } from 'next/app';
import sentry from '/utils/sentry'; // Đâu là file custom mình tạo ra

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidCatch(error, errorInfo) {
      sentry.captureException(error, { extra: errorInfo })
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;
```
Vậy là xong, sau này nếu có bất cứ lỗi nào khiến app crash hoặc error nào đó thì nó sẽ được bắn lên trên sentry để bạn có thể vào xem bug và điều tra nguyên nhân và khắc phục.

## 3. Kết bài
<hr>

Bài viết của mình đến đây đã khá dài nên mình sẽ dừng lại ở đây. Sắp tới nếu mình tìm được thêm các kiến thức hay ho liên quan đến quá trình làm việc với `NextJS` thì mình sẽ tiếp tục chia sẻ cho các bạn. Nếu có bất kì vấn đề gì các bạn có thể comment ngay ở bên dưới. Cám ơn các bạn đã đọc bài.