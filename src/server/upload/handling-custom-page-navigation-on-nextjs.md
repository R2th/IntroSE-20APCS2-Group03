Last month we discussed about different kind of [routing on Next.js](https://viblo.asia/p/routing-in-nextjs-WAyK8DmoKxX).
While `next/link` is enough for all of our routing requirements, we can also handle client side navigation without using it.

Here's a short example of creating a component that moves the user to next page.
You need to import the `useRouter` component from `next/router`, then you can just `router.push(url)`
```js
import { useRouter } from 'next/router'

function NextPage() {
  const router = useRouter()

  return (
    <span onClick={() => router.push('/some_different_page')}>
      Visit next page 
    </span>
  )
}

export default NextPage
```

The `useRouter` is a react hook, so by default it will only work with functional react components, and not work with class components. If you want similar behavior on class components, you need to use `withRouter`. Both `useRouter` and `withRouter` will return the `router` object, so everything else is similar.

you can read more about this [here](https://nextjs.org/docs/api-reference/next/router#withrouter).

```js
import { withRouter } from 'next/router'

function Page({ router }) {
  return <span>{router.pathname}</span>
}

export default withRouter(Page)
```

## router.push
This is the core function for handling custom navigation of your next.js app. You use it like
```js
router.push("some url")
```
You can also send some optional params
```js
router.push("some url", as, options)
```
##### as
optional decorator for the URL that users will see. Prior to next v9.5 this was used for handling dynamic routes.

##### options
optional object you send as param. Inside the object, it takes `shallow`, `getStaticProps`, `getInitialProps`, `getServerSideProps`

Here's an example
```js
router.push('/?counter=10', undefined, { shallow: true })
```
By default, the options you don't mention inside the object will be `false`, so in the above example `getStaticProps`, `getInitialProps`, `getServerSideProps` all will be set as false.

A good example is, redirecting the user to login page, after he requests for something that requires authentication.

```js
import { useEffect } from 'react'
import { useRouter } from 'next/router'

// Here you would fetch and return the user
const useUser = () => ({ user: null, loading: false })

export default function Page() {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!(user || loading)) {
      router.push('/login')
    }
  }, [user, loading])

  return <p>Redirecting...</p>
}
```
One thing to note here, you don't need to use `router.push` when navigating to an external link. In those cases, just using the browser's `window.location` is enough.

## router.replace
this is useful for when you don't want any entry on your `history`. Other than that, it's exactly similar to `router.push`
```js
router.replace("some url you don't want in history", as, options)
```

## router.reload
Reloads the current page, duh. 
It executes
```js
window.location.reload()
```

## router.back
Moves the user one page ago in history.
It executes 
```js
window.history.back()
```

## router.prefetch
Use prefetch to make your pages appear faster on production. (automatically handled when using `next/link`)
You use it like 
```js
router.prefetch("some url", as) // as is optional like in router.push
```

Here's an excellent scenario from next.js doc.

Imagine a case where the user will see the dashbord after he logs in successfully. In this case, we can prefetch the dashboard, while the user is still in login page, thus make the experience snappier.

```js
import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const handleSubmit = useCallback((e) => {
    e.preventDefault()

    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        /* Form data */
      }),
    }).then((res) => {
      // Do a fast client-side transition to the already prefetched dashboard page
      if (res.ok) router.push('/dashboard')
    })
  }, [])

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch('/dashboard')
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Login</button>
    </form>
  )
}
```

# Learning Material
[Obviously, the next.js/doc](https://nextjs.org/docs)