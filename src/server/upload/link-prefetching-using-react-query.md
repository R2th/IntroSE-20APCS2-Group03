Today we will see how to implement link prefetching and caching queries using `React-query`

We'll start with a simple article app, which will list a number of articles, and after clicking on each link will open the
![](https://images.viblo.asia/41a774f1-5196-4de9-b77c-4a882a417d38.gif)

Here's the starting app
```js
import './App.css'
import React from 'react'
import {useQuery} from 'react-query'
import {ReactQueryDevtools} from 'react-query-devtools'
import axios from 'axios'

const POSTS = 'https://jsonplaceholder.typicode.com/posts'

function Post({postId, setPostId}) {
  const postQuery = useQuery(['post', postId], () =>
    axios
      .get(`${POSTS}/${postId}`)
      .then(res => res.data)
    )

    return (
      <div className='post'>
        <div>
          {
            postQuery.isLoading ?
              'Loading...' :
              (<div>
                <h2>{postQuery.data.title}</h2>
                <div>{postQuery.data.body}</div>
              </div>)
          }
        </div>
        <button className='back' onClick={() => setPostId(-1)}>Back</button>
      </div>
    )
}

function Posts({setPostId}) {
  const postsQuery = useQuery('posts', async () =>
    axios
      .get(POSTS)
      .then(res => res.data)
  )

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {
          postsQuery.isLoading ?
            'Loading...' :
            (<ul>
              {postsQuery.data.map(post => {
                return(
                  <li key={post.id} className='posts'>
                    <a onClick={() => setPostId(post.id)} href='#'>{post.title}</a>
                  </li>
                )
              })}
            </ul>)
        }
      </div>
    </div>
  )
}

function App() {
  const [postId, setPostId] = React.useState(-1)
  return (
    <div className="App">
      {
        postId > -1 ?
          (<Post postId={postId} setPostId={setPostId} />) :
          (<Posts setPostId={setPostId}/>)
      }
      <ReactQueryDevtools />
    </div>
  );
}

export default App;
````

How it works is, when postId is set to -1, we'll render the `posts#index`
and when we click on any post, we set the postId to the `post.id`, and we render the `post/:id`

```js
{
  postId > -1 ?
    (<Post postId={postId} setPostId={setPostId} />) :
    (<Posts setPostId={setPostId}/>)
}
```

The `ReactQueryDevtools` component is there to help us debug and understand the flow more easily.

By default, `react-query` will cache any request it fetches, and render it from cache next time when it's needed, while trying to check if data needs to be refreshed. Let's inspect that on the `ReactQueryDevtools`

![](https://images.viblo.asia/23af94bf-2aab-411d-bf65-3407cf8dd3f9.gif)

We can make it even faster by introducing link-prefetching (fetch data when hovered on one link)

So, let's extract the `getPost` function to keep our code clean.
```js
async function getPost(postId) {
  return axios
      .get(`${POSTS}/${postId}`)
      .then(res => res.data)
}
```

and change our `Post` function to
```js
function Post({postId, setPostId}) {
  const postQuery = useQuery(['post', postId], () => getPost(postId))
    return (
      <div className='post'>
        <div>
          {
            postQuery.isLoading ?
              'Loading...' :
              (<div>
                <h2>{postQuery.data.title}</h2>
                <div>{postQuery.data.body}</div>
              </div>)
          }
        </div>
        <button className='back' onClick={() => setPostId(-1)}>Back</button>
      </div>
    )
}
```

And add the `Posts` function to

```js
import {useQuery, queryCache} from 'react-query'

function Posts({setPostId}) {
  const postsQuery = useQuery('posts', async () =>
    axios
      .get(POSTS)
      .then(res => res.data)
  )

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {
          postsQuery.isLoading ?
            'Loading...' :
            (<ul>
              {postsQuery.data.map(post => {
                return(
                  <li key={post.id} className='posts'
                    onMouseEnter={() => queryCache.prefetchQuery(['post', post.id], () => getPost(post.id))}>
                    <a onClick={() => setPostId(post.id)} href='#'>{post.title}</a>
                  </li>
                )
              })}
            </ul>)
        }
      </div>
    </div>
  )
}

```

Now prefetching should be working
![](https://images.viblo.asia/01679f82-4c80-4d6f-8bc5-28f967773f79.gif)


Final code
```js
import './App.css'
import React from 'react'
import {useQuery, queryCache} from 'react-query'
import {ReactQueryDevtools} from 'react-query-devtools'
import axios from 'axios'

const POSTS = 'https://jsonplaceholder.typicode.com/posts'

async function getPost(postId) {
  return axios
      .get(`${POSTS}/${postId}`)
      .then(res => res.data)
}

function Post({postId, setPostId}) {
  const postQuery = useQuery(['post', postId], () => getPost(postId))
    return (
      <div className='post'>
        <div>
          {
            postQuery.isLoading ?
              'Loading...' :
              (<div>
                <h2>{postQuery.data.title}</h2>
                <div>{postQuery.data.body}</div>
              </div>)
          }
        </div>
        <button className='back' onClick={() => setPostId(-1)}>Back</button>
      </div>
    )
}

function Posts({setPostId}) {
  const postsQuery = useQuery('posts', async () =>
    axios
      .get(POSTS)
      .then(res => res.data)
  )

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {
          postsQuery.isLoading ?
            'Loading...' :
            (<ul>
              {postsQuery.data.map(post => {
                return(
                  <li key={post.id} className='posts' onMouseEnter={() => queryCache.prefetchQuery(['post', post.id], () => getPost(post.id))}>
                    <a onClick={() => setPostId(post.id)} href='#'>{post.title}</a>
                  </li>
                )
              })}
            </ul>)
        }
      </div>
    </div>
  )
}

function App() {
  const [postId, setPostId] = React.useState(-1)
  return (
    <div className="App">
      {
        postId > -1 ?
          (<Post postId={postId} setPostId={setPostId} />) :
          (<Posts setPostId={setPostId}/>)
      }
      <ReactQueryDevtools />
    </div>
  );
}

export default App;
```