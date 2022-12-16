We can easily create Client rendered pages (CSR) and Static generated pages (SG) using Next.js. But, often times, you'll want your page to use a combination of those different rendering methods. Like, you want your static page to be generated with some data from api, then once the users browser has hydrated the static page, you want CSR to kick in. There is one way we can use this, by using the excellent `SWR` plugin from Vercel (`creators of Next.js). Let's have a quick look about it in this article.


First, let's create a next app by running

```sh
npx create-next-app blog-swr-demo -y
```

Now we need to create a mock api to serve us articles/posts.
Let's create a new file in `pages/posts.js` and paste in

```js
export default (req, res) => {
    res.status(200).json({ 
        posts: [
            {title: "A", content: "asdf"},
            {title: "B", content: "qwert"},
            {title: "C", content: "zxcv"},
            {title: "D", content: "mnopq"},
            {title: "E", content: "aeiou"}
        ]
    })
  }
```

![](https://images.viblo.asia/c0f50360-4791-4cb6-9628-c37c84ece701.png)



Now, we'll install the `SWR` plugin
```sh
npm i swr
```

And create our blog component and also import the `useSWR` hook from the plugin we just installed

```js
import useSWR from "swr"


export default function Blog() {
  return (
    <div>
        Demo blog
        {
            posts.map((post) =>
                <h4>{post.title}</h4>
                <p>{post.content}</p>
            )
        }
    </div>
  )
}
```

Now, let's render the blog posts using the `useSWR` hook

```js
import useSWR from "swr"

async function fetcherFunc(url) {
    const res = await fetch(url);
    return res.json();
}

export default function Blog() {
  const url = "http://localhost:3000/api/posts";
  const {data, error} = useSWR(url, fetcherFunc);
  if (!data) return <div>fetching</div>
  
  const {posts} = data;

  return (
    <div>
        Demo blog
        {
            posts.map((post) =>
                <div>
                    <h4>Article: {post.title}</h4>
                    <p>{post.content}</p>
                    <br/>
                </div>
            )
        }
    </div>
  )
}
```

![](https://images.viblo.asia/4fac454e-e684-4fe0-b06c-c48a411e988a.png)



Now let's create the static generated file for our page, for this we'll modify our code like

```js
export default function Blog(props) {   // <<<<<<< changed here
//   const url = "http://localhost:3000/api/posts";
//   const {data, error} = useSWR(url, fetcherFunc);
//   if (!data) return <div>fetching</div>

  const {posts} = props; // <<<<<<<< Also here

  return (
    <div>
        Demo blog
        {
            posts.map((post) =>
                <div>
                    <h4>Article: {post.title}</h4>
                    <p>{post.content}</p>
                    <br/>
                </div>
            )
        }
    </div>
  )
}

export async function getStaticProps(context) {
    const res = fetch("http://localhost:3000/api/posts");
    const posts = await (await res).json()

    return {
        props: {
            posts
        }
    }
}
```

Let's generate the page. For that run

```sh
npm run build
```
You'll see this after it's successfully built
```sh
> blog-swr-demo@0.1.0 build
> next build

info  - Creating an optimized production build  
info  - Compiled successfully
info  - Collecting page data  
info  - Generating static pages (4/4)
info  - Finalizing page optimization  

Page                                                           Size     First Load JS
┌ ○ /                                                          3.46 kB        66.9 kB
├   └ css/c50ddf22b716c7b6b76d.css                             660 B
├   /_app                                                      0 B            63.4 kB
├ ○ /404                                                       3.46 kB        66.9 kB
├ λ /api/hello                                                 0 B            63.4 kB
├ λ /api/posts                                                 0 B            63.4 kB
└ ● /blog                                                      1.96 kB        65.4 kB
+ First Load JS shared by all                                  63.4 kB
  ├ chunks/e82d01500e11e0131e78851aa17fd9f5e63d6c88.ebefd9.js  2.47 kB
  ├ chunks/f6078781a05fe1bcb0902d23dbbb2662c8d200b3.519eb7.js  11.3 kB
  ├ chunks/framework.e2fe4a.js                                 41.8 kB
  ├ chunks/main.1a4cca.js                                      6.67 kB
  ├ chunks/pages/_app.6b4817.js                                531 B
  ├ chunks/webpack.50bee0.js                                   751 B
  └ css/6e9ef204d6fd7ac61493.css                               194 B

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
   (ISR)     incremental static regeneration (uses revalidate in getStaticProps)
   ```
   
   Note, the if we keep adding posts to our mock api while our blog is running, the data doesn't get refreshed. We need to reload the page to do that
   ![](https://images.viblo.asia/a9fa8257-e45d-4ae0-9528-29b43a6eee47.gif)

Let's fix that now. For that, we will pass the `revalidateOnMount` option in our `useSWR` hook
So, the final code will be

```js
import useSWR from "swr"

async function fetcherFunc(url) {
    const res = await fetch(url);
    return res.json();
}

export default function Blog(props) {
  const url = "http://localhost:3000/api/posts";
  const {data, error} = useSWR(url, fetcherFunc, {initialData: props, revalidateOnMount: true });

  const {posts} = data;
  if (!posts) return <div>fetching</div>

  return (
    <div>
        Demo blog
        {
            posts.map((post) =>
                <div>
                    <h4>Article: {post.title}</h4>
                    <p>{post.content}</p>
                    <br/>
                </div>
            )
        }
    </div>
  )
}

export async function getStaticProps(context) {
    const res = fetch("http://localhost:3000/api/posts");
    const {posts} = await (await res).json()

    return {
        props: {
            posts
        }
    }
}
```

Let's check
![](https://images.viblo.asia/75257883-a197-4633-b559-65c48362c948.gif)

### Source code
https://github.com/Salekin-1169/blog-swr-demo


# Learning Material

[The official docs (obviously)](https://swr.vercel.app/docs/with-nextjs)

{@embed: https://www.youtube.com/watch?v=eMwTEo6AjDc}