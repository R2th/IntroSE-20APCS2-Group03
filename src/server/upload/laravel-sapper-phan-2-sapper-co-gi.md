Để tiếp nối bài viết về Svelte. Trong bài này, chúng ta hãy cùng tìm hiểu về **Sapper**. Đây chính là framework của Svelte.

Đầu tiên là Cấu trúc thư mục của 1 Sapper project. Chúng ta sẽ đi tìm hiểu cấu trúc này và xem Sapper liệu có gì hay ho không nhé  ;)

```
├ package.json
├ src
│ ├ routes
│ │ ├ # your routes here
│ │ ├ _error.svelte
│ │ └ index.svelte
│ ├ client.js
│ ├ server.js
│ ├ service-worker.js
│ └ template.html
├ static
│ ├ # your files here
└ rollup.config.js / webpack.config.js
```

### 1. package.json

Tương tự Vue, React, đây là file config các thư viện cần sử dụng.

Lưu ý: Thêm dòng `"private": true` vào file để sửa `warning package.json: No license field`.

### 2. src
**src/client.js**

File này sẽ import thư viện`sapper` để sử dụng cho web
```js
import * as sapper from '@sapper/app';

sapper.start({
	target: document.querySelector('#sapper')
});
```

Các hàm api client sapper gồm:

- start({ target })
    - target - một page element
    - return Promise
    
    Hàm config router và starts the app - lắng nghe các sự kiện của thẻ <a>, interacts với history API, render và  updates các components.

    Ví dụ

    ```js
    import * as sapper from '@sapper/app';

    sapper.start({
        target: document.querySelector('#sapper')
    }).then(() => {
        console.log('client-side app has started');
    });
    ```
- goto(href, options?)
    * href — the page to go to
    * options — not required
    
    Hàm xử lý điều hướng trang khi người dùng click vào thẻ <a> có href tương ứng  và trả về một Promise
  
    ```js
    import { goto } from '@sapper/app';

    const navigateAndSave = async () => {
        await goto('/');
        saveItem();
    }

    const saveItem = () => {
        // do something with the database
    }
    ```
- prefetch(href)
    * href — the page to prefetch
    
    Prefetch trang khi người dùng click phần tử <a> có `rel=prefetch`.

- prefetchRoutes(routes?)
    * routes — an optional array of strings representing routes to prefetch

**src/server.js**

File này sẽ xử lý việc connect web với server.

Sapper sử dụng thư viện [Polka](https://github.com/lukeed/polka), là một native HTTP server, tương tự như [axios](https://github.com/axios/axios), thư viện này sẽ hộ trợ việc gọi api bên phía server.

Ví dụ
```js
const app = polka();

app.get('/', (req, res) => {
  res.end('Hello world!');
});

app.get('/users', (req, res) => {
  res.end('Get all users!');
});

app.post('/users', (req, res) => {
  res.end('Create a new User!');
});

app.put('/users/:id', (req, res) => {
  res.end(`Update User with ID of ${req.params.id}`);
});

app.delete('/users/:id', (req, res) => {
  res.end(`CY@ User ${req.params.id}!`);
});
```

**template.html**

Đây là một file template cho response trả về từ phía server. Sapper sẽ inject content vào trong file khi có response trả về.
    
**src/routes**
Khác với Vue, React, đây là thư mục gồm các trang của ứng dụng. Route được định nghĩa bởi cấu trúc và filename của các pages.

    
### 3. stattic
Folder chứa các file bất kì, như images, favicon,...

### 4. rollup.config.js / webpack.config.js
Đây là file cấu hình ứng dụng, tương tự Vue và React
### 5. Systax Svelte component
Mỗi svelte component cho gồm 3 phần:
- code elements
- code style: khai báo bằng thẻ <style>
- code script: Khai báo bằng thẻ <script>

Cấu trúc 1 file svelte tương tự Vue, tuy nhiên, svelte k cần khai báo element trong thẻ <template> như Vue

Ví dụ:
```js:src/routes/index.svelte
<svelte:head>
	<title>Welcome</title>
</svelte:head>

<h1>Hello and welcome to my site!</h1>
```
    
```js
<!-- src/routes/blog/[slug].svelte -->
<script context="module">
	// the (optional) preload function takes a
	// `{ path, params, query }` object and turns it into
	// the data we need to render the page
	export async function preload(page, session) {
		// the `slug` parameter is available because this file
		// is called [slug].svelte
		const { slug } = page.params;

		// `this.fetch` is a wrapper around `fetch` that allows
		// you to make credentialled requests on both
		// server and client
		const res = await this.fetch(`blog/${slug}.json`);
		const article = await res.json();

		return { article };
	}
</script>

<script>
	export let article;
</script>

<style>
	div {
		color: purple;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
</style>

<svelte:head>
	<title>{article.title}</title>
</svelte:head>

<h1>{article.title}</h1>

<div class='content'>
	{@html article.html}
</div>
```
    
Svelte có cú pháp khai báo script tương tự Vue, nếu bạn từng sử dụng Vue thì việc học Svelte càng đơn giản

Như giới thiệu thì Sapper là một Nextjs type, nên với các bạn đã tiếp xúc nhiều với các framework thì Sapper có vẻ như không có gì đặc biệt. Trong bài tiếp theo mình sẽ tìm hiểu kĩ hơn về xử lý render DOM của Svelte. Hi vọng là sẽ có điều gì đó thú vị.
    
Tài liệu tham khảo:
https://sapper.svelte.dev/docs