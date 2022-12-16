Today we will learn about a small react package to handle data fetching to make our life easier.
> React Query is often described as the missing data-fetching library for React, but in more technical terms, it makes fetching, caching, synchronizing and updating server state in your React applications a breeze.

*   Help you remove many lines of complicated and misunderstood code from your application and replace with just a handful of lines of React Query logic.
  
*    Make your application more maintainable and easier to build new features without worrying about wiring up new server state data sources
    
*    Have a direct impact on your end-users by making your application feel faster and more responsive than ever before.
    
*    Potentially help you save on bandwidth and increase memory performance
# Creating demo and fetching data
Let's create a simple app that fetches random Chuck Norris jokes using `react-query`
For that, we'll create a demo app
```
npx create-react-app demo
cd demo
yarn install
yarn add react-query
```

Now, let's remove all the boilerplate code inside, and add some code of our own.

We'll import the `useQuery` function from `react-query` and use it to fetch some jokes.

```jsx
import {useQuery} from 'react-query';

const query = useQuery('chuck_norris', async () => {
    return fetch('https://api.chucknorris.io/jokes/random')
      .then(res => res.json())
  })
```

The full code will be
```jsx
import './App.css';
import {useQuery} from 'react-query';

function App() {
  const query = useQuery('chuck_norris', async () => {
    return fetch('https://api.chucknorris.io/jokes/random')
      .then(res => res.json())
  })

  return (
    <div className="App">
      {query.data.value}
    </div>
  );
}

export default App;
```

Now, when we run this, react will throw us an error
![](https://images.viblo.asia/845af2a0-96ed-4700-8336-e145cb43a742.png)

This is because, our api still hasn't fetched the data yet. So, we need to modify our code to show `Loading...` when the data is being fetched.

```jsx
  return (
    <div className="App">
      {query.data?.value || 'Loading...' }
    </div>
  );
```

Now if we run our app
![](https://images.viblo.asia/b5bdba82-77c5-45f5-bf2c-c86ccb8497d7.gif)


We can use the built in statuses that comes with `react-query` to make our life much easier
```jsx
import './App.css';
import {useQuery} from 'react-query';

function App() {
  const query = useQuery('chuck_norris', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000)) // add a delay
    return fetch('https://api.chucknorris.io/jokes/random')
      .then(res => res.json())
  })

  return (
    <div className="App">
      {query.isLoading ? 'Loading...' : query.data.value}  // using the query.isLoading status
    </div>
  );
}

export default App;
```

![](https://images.viblo.asia/28597087-69b4-499a-bd06-f6758e9b8359.gif)

### Introducing API errors
Now., let's say we want to handle a case where our API has wen't down. So, let's throw an exception on our code
```jsx
import './App.css';
import {useQuery} from 'react-query';

function App() {
  const query = useQuery('chuck_norris', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    throw new Error('API Down')   // Force the promise to fail

    return fetch('https://api.chucknorris.io/jokes/random')
      .then(res => res.json())
  })

  return (
    <div className="App">
      {query.isLoading ? 'Loading...' : query.data.value}
    </div>
  );
}

export default App;
```

Let's see what happens if we run our code now
![](https://images.viblo.asia/0124b5f4-8b62-4393-ab26-197ec5bbfb33.gif)
Seems we're left hanging on the error messege, and after a delay, our app will breakdown.
That's obviously not  a good sign for our users. So, instead let's modify our code to handle this case

```jsx
import './App.css';
import {useQuery} from 'react-query';

function App() {
  const query = useQuery('chuck_norris', async () => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    throw new Error('API Down')

    return fetch('https://api.chucknorris.io/jokes/random')
      .then(res => res.json())
  })

  return (
    <div className="App">
      {
        query.isLoading ?
        'Loading...' :
          query.isError ?           // another useful builtin status check
            query.error.message :
            query.data.value
      }
    </div>
  );
}

export default App;
```
If we run this
![](https://images.viblo.asia/b05c15be-9167-493a-89c2-12b355f40bde.gif)

# React Query Devtools 
`react-query` comes with an awesome tool that lets us check the state of our query while developing. To install that, run
```jsx
yarn add react-query-devtools
```
and import it in our code, we also need to add the `ReactQueryDevtools` component at the bottom of our `div` to render it.

```jsx
import './App.css'
import {useQuery} from 'react-query'
import {ReactQueryDevtools} from 'react-query-devtools'

function App() {
  const query = useQuery('chuck_norris', async () => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    return fetch('https://api.chucknorris.io/jokes/random')
      .then(res => res.json())
  })

  return (
    <div className="App">
      {
        query.isLoading ?
        'Loading...' :
          query.isError ?
            query.error.message :
            query.data.value
      }
      <ReactQueryDevtools />
    </div>
  );
}

export default App;
```
If we run it, we'll see a small button at the bottom of our code, clicking this will open up the devtool
![](https://images.viblo.asia/4081aaa4-6eb6-4125-b6d6-dcc3ac2d3f76.png)
![](https://images.viblo.asia/80bfddd3-673c-4c5d-877f-c12901b2848d.png)
From here, we can check the state of our cache, the configurations, how many times was it fetched, and many more info.

### Adding Stale Time
One thing you'll find weird, is the `react-query` will try to fetch new data every time the browser window came out of focus.
![](https://images.viblo.asia/b464d30c-3ad8-4458-8891-d4785475f425.gif)
This is because by default `react-query` is configured to  set query result to statle as soon as the data is fetched. Ofcourse this is not useful for our case, and we can modify the stale timer on our api
```jsx
import './App.css'
import {useQuery} from 'react-query'
import {ReactQueryDevtools} from 'react-query-devtools'

function App() {
  const query = useQuery('chuck_norris', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    return fetch('https://api.chucknorris.io/jokes/random')
      .then(res => res.json())
  },
  {
    staleTime: 5000  // Add the amount here, 0 for always, Infinity for never
  }
  )

  return (
    <div className="App">
      {
        query.isLoading ?
        'Loading...' :
          query.isError ?
            query.error.message :
            query.data.value
      }
      <ReactQueryDevtools />
    </div>
  );
}

export default App;
```
Now if we run it
![](https://images.viblo.asia/0186f23f-ca28-4e06-b51e-4337aaf763b5.gif)