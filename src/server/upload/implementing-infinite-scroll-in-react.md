We will see how to implement infinite scrolling using just React. For this we will be using the `useCallback` hook and `IntersectionObserver` dom api.

let's start by simply creating the app

```bash
npx create-react-app infinite_scroll
cd infinite_scroll
yarn start
```

After you've cleaned up the boilerplate code, let's start by creating our custom hook

```bash
touch src/useSearch.js
```

```js
import { useEffect, useState } from "react";
import axios from "axios";

export default function useSearch(query, page) {
  const URL = 'http://openlibrary.org/search.json'

  useEffect(()=> {
    axios({
      method: 'GET',
      url: URL,
      params: {q: query, page}
    }).then( res => {
      console.log(res.data)
    })
  }, [query, page]);

}
```

we will be using the OpenLibrary api for our demo, and `axios` to do the api calls for us.
The OpenLibrary api is paginated, so it's perfect for our use case

In your browser, paste the url `https://openlibrary.org/search.json?q=test23&page=1` to inspect the api end point

```json
{
    "numFound": 7,       // number of results found
    "start": 0,
    "numFoundExact": true,
    "docs": [
        {
            "key": "/works/OL8944247W",
            "title": "MTTC French Sample Test 23",
            "title_suggest": "MTTC French Sample Test 23",
            "has_fulltext": true,
            "edition_count": 1,
            ...
        },
        {
            // book 2
        },
        {
            // book 3
        },
        ....
    ],
    "num_found": 7,
    "q": "test23",    // search keyword
    "offset": null
}
```

So, let's modify our custom hook

```js
import { useEffect, useState } from "react";
import axios from "axios";

export default function useSearch(query, page) {
  const URL = 'http://openlibrary.org/search.json'

  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadMore, setLoadMore] = useState(false)

  useEffect(() => {
    setBooks([])
  }, [query])


  useEffect(()=> {
    setIsLoading(true);
    axios({
      method: 'GET',
      url: URL,
      params: {q: query, page}
    }).then( res => {
      setBooks(prev => { return [...prev, ...res.data.docs.map(b => b.title)]})
      setIsLoading(false)
      setLoadMore( res.data.docs.legth > 0)

    })
  }, [query, page]);

  return {isLoading, books, loadMore}
}
```

When, we are getting back results from the api, we append it in our `books` state
```js
setBooks(prev => { return [...prev, ...res.data.docs.map(b => b.title)]})
```
this will append the data with our previous state, so if we keep calling data for the next page, it'll get appended to our previous result, rather than getting overwritten.

we use a different `useState` to clear our books state when we query for different data
```js
useEffect(() => {
    setBooks([])
  }, [query])
```
also, we set the `isLoading` key to prevent our app to keep calling the api constantly.

The last part `setLoadMore` is to let our app know we have reached the end of the paginated results, and stop doing api calls. Or, if we haven't reached the end yet, and we can call for more

```js
setLoadMore( res.data.docs.legth > 0)
```

Finally we return the value of `isLoading`, `books`, `loadMore` to our app.

Now, let's import it to our `App.js`

```js
import './App.css';
import { useState } from 'react';
import useSearch from './useSearch';

function App() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const {isLoading, books, loadMore} = useSearch(query, page)      // load our custom hook

  return (
    <div className="App">
      <input onChange={handleSearch} placeholder="search"></input>

      <div className="results">
      </div>
    </div>
  );
}

export default App;
```

Time to modify our UI, first we add the `handleSearch` function that will fire on `onChange` event of our `Input`, we just call to `setQuery` to whatever data is in the `Input` box

```js
const handleSearch = (e) => {
    if (e.target.value === '') {
        return null;
    }

    setQuery(e.target.value)
    setPage(1)
}
```

Next, we have our `books` array in state, we'll just loop through it and render the names

```js
const renderBooks = () => {
    return books.map((book, index) => {
      return (<p key={index}>{book}</p>)
    })
  }
```

and we call it inside `results` div
```js
<div className="results">
    {renderBooks()}
</div>
```

Now, we will start our infinite scroll part. As we said earlier, we'll be using the `useCallback` hook, so let's import it

```js
import { useState, useRef, useCallback } from 'react';

const observer = useRef()
```

it'll be empty in the beginnig. Let's think how will are we gonna implement it.
imagine, we have 5 books
```js
<div>
    <p>book</p>
    <p>book</p>
    <p>book</p>
    <p>book</p>
    <p>book</p>
</div>
```
We wan't our api to be called for more when we reach the last book element. Something which will observe the `Book#5`, when it get's rendered in the screen, we will call for 5 more books, and the observer will then be set to `Book#10` and removed from `Book#5`
We use the `IntersectionObserver` dom api to do it for us.


```js
const lastElementRef = useCallback((node) => {
    if (isLoading) {
      return null;                         // do nothing if already an api call going
    }

    if (observer.current) {
      observer.current.disconnect();      // if we already have an observer.current (Book#5), then disconnect the observer from it
    }

    observer.current = new IntersectionObserver(elements => {
      if (elements[0].isIntersecting) {   // isIntersecting means the browser is intersecting with this current element, ie: showing in view
        console.log("visible")
      }
    })

    if (node) {
      observer.current.observe(node)  // set the observer to the new element (Book#10)
    }
  }, [isLoading])
```

Now, we just need to add reference to this callback to the last element when we render, let's modify our code

```js
const renderBooks = () => {
    return books.map((book, index) => {
      if (books.length === index+1) {
        return (<p ref={lastElementRef} key={index}>{book}</p>)   // add the callback when our index is the last one
      }
      return (<p key={index}>{book}</p>)  // don't add callback otherwise
    })
  }
```

Now, our code is almost finished. Instead of doing `console.log()` we just need to fire our api call.
```js
observer.current = new IntersectionObserver(elements => {
    if (elements[0].isIntersecting) {
        setPage(prevPage => prevPage + 1)
    }
})
```

That's it.


### Study material

[useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback)

[Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

{@embed: https://www.youtube.com/watch?v=NZKUirTtxcg}

### souurce code
https://github.com/Salekin-1169/infinite_scroll