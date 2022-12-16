Next.js has one of the most robust and easy to use routes that you can just use out of the box. You don't need to hassle by configuring it.
Because Next.js follows the `Convention over Configuration` philosophy, every file inside the `pages` directory will be autmatically considered as a route. 
So, let's see what different types of routing we get with Next.

# Static Routing
Let's create an `About` page for our blog app


For it, just create a file `about.js` insided `pages` directory

```sh
touch pages/about.js
```

with content

```js
export default function About() {
    return(
        <div>About</div>
    )
}
```

That's it. Next's built HMR should automatically pick up the added file, and create a route for it.

Just go to `localhost:3000/about` and you should see your about page.
![](https://images.viblo.asia/0e64e8f2-5e1c-4728-afb4-9e72bfd91def.png)


Now, let's think for some reason you need to structure your `about` routes in a different
maybe
```sh
localhost:3000/about                     -> Opens the about us
localhost:3000/about/contact             -> Opens the contact page
localhost:3000/about/some_random_page    -> Opens some random page you need to show
```

For that, you need your folder structered like this

```sh
> pages
  > about
    index.js
    contact.js
    some_random_page.js
```

Let's create them

```sh
mkdir about

mv pages/about.js pages/about/index.js
```
We renamed our old `about.js` file to `index.js` and moved it inside the `pages/about` folder.
If you refresh the page, it'll behave in the same way.

```sh
touch pages/about/contact.js
```

```js
export default function Contact() {
    return(
        <div>Contact Us</div>
    )
}
```

and your weird random page

```sh
touch pages/about/some_random_page.js
```

```js
export default function SomeRandomPage() {
    return(
        <div>bla bla bla</div>
    )
}
```
![](https://images.viblo.asia/53199c7c-f90d-4031-9ec5-ea3e2bc8de64.png)

![](https://images.viblo.asia/048444c2-1aaa-4dd0-9949-4ca458b5145f.png)


# Dynamic Routing
Ofcourse, you can just use `Static routes` for some simple urls.
Let's think you're creating a blog and you need to show your posts through `posts/1` url

The folder structure for that will be

```sh
> pages
  > posts
    index.js
    [id].js
```

the `index.js` file is for your `all posts` page.

What about the weird `[id].js` file? 
This is a special syntax used by Next.js called slugs. The string inside the `[` and `]` brackets denote which param the page will receive.
Let's see the code

```js
import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Post: {id}</p>
}

export default Post
```

We need to import the `useRouter` module from `next/router` to catch which param was sent in the URL.
That is done by the following code

```js
const router = useRouter()
const { id } = router.query    // <  { id } because we named the slug in filename as [id].js
```

if you instead named your slug as `[post_id].js`, then the code should be
```js
const router = useRouter()
const { post_id } = router.query
```

Now, if you visit the url `posts/1234567` the page will receive the data `{ "id": "1234567" }` and render

![](https://images.viblo.asia/4f24f1df-46fa-4a00-b6ba-cfa40ea11031.png)


## Catch all routes
So, what about when you want to pass more data through the url and catch them in the following page.

in that case, we will need `Catch all routes`. It's syntax is like

```js
> pages
  > posts
    index.js
    [...slug.js]
```

This will match `posts/1`, at the same time match `posts/1/2/3/abc` and so on.
Remember with `[id].js` we received the vlaue like `{ "id": "1234567" }`

With [...slug.js] we will receive the value in an array.
So, `posts/a/b` will give you `{ "slug": ["a", "b"] }`

```js
import { useRouter } from 'next/router'

const Article = () => {
  const router = useRouter()
  const slug = router.query

  console.log(slug);

  return <p>Article</p>
}

export default Article
```

If you go to `localhost:3000/articles/12/32` it'll get an array `[12, 32]`

![](https://images.viblo.asia/63aef996-dcc2-4662-9e87-b3b8587d516f.png)

That's it.


# Shallow Routing
Shallow routing is used for changing the url without fetching any data.
This means `getStaticProps` or `getServerSideProps` will not be called.

Example:
```sh
import { useEffect } from 'react'
import { useRouter } from 'next/router'

// Current URL is '/'
function Page() {
  const router = useRouter()

  useEffect(() => {
    // Always do navigations after the first render
    router.push('/?counter=123', undefined, { shallow: true })
  }, [])

  useEffect(() => {
    // The counter changed!
  }, [router.query.counter])
}

export default Page
```

The URL will get updated to `/?counter=123` and the page won't get replaced, only the state of the route is changed.

# Learning Materials
[Next.js doc](https://nextjs.org/learn/basics/dynamic-routes)

[Static and dynamic routing with Next.js](https://codeburst.io/next-js-tutorial-static-and-dynamic-routing-fba70e26359a)

[Source code](https://github.com/SSalekin/next_js_routing)