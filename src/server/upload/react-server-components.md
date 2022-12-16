At the end of last year, the react dev team has introduced an exciting new technology called React Server Components ([read here](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html))
However, this is still on testing phase and not production ready. Still, this will have a huge effect on how we design and write our react apps, so let's have some quick intro today.

> Server components allow developers to build apps that span the server and client, combining the rich interactivity of client-side apps with the improved performance of traditional server rendering.  - React dev team.

# Difference with SSR
SSR is the technique to render whole page on server, and pass the html data to user. RSC's are a different thing.

#### 1. Re-render anytime without losing client state
React Server Components may be rerendered any time, while SSR apps can be rerendered but they will rerender a whole new HTML page and lose its app state (in case there’s any).

#### 2. Can access server data without any delay
React Server Components can access server data sources such as microservices, functions, database from anywhere in the tree, while with SSR apps, especially with Next, we need to use getServerProps() which only works at the top-level of our page.
   
# Benefits
#### 1. Zero effect on bundle size
RSC helps us greatly by reducing the bundle size without worriying the cost for client. We can use any plugins of any size, and because the components will be handled in the server, the client's browser has no need to download them at all.

```jsx
import {fetch} from 'react-fetch';    //
import {readFile} from 'react-fs';    //  None of those imports will be downloaded on client's browser
import {format} from 'date-fns';      //

export default function Note({selectedId, isEditing}) {
   ...
 }
```

####  2. Lets you access backend resources directly
Because RSC's get executed on server, they don't have to wait for expensive network calls. Thus, it speeds up the render process dramatically.

####  3. Lets you decide the tradeoff for every possible use case
You have every bit of controll on your app, and can decide how will you tradeoff speed for resource cost.

# What it can't do

####  1. Can't have state 
React Server Components can’t have state because they are executed once per request, so the idea to use React hooks for handling state data such as `useState` and `useReducer` are not supported.
####  2. No hooks
React Server Components can’t make usage of React hooks for rendering lifecycle methods such as `useEffect` and `useLayoutEffect`
####  3. Can't use browser-only apis 
Because server components executes code on server side, we can't use browser-only api's. To use those api's we need to use client components. The traditional React component is called client component, because it’s rendered on the client-side. A client component is the component that you are used to, it can handle state data, it can work with browser-only APIs, etc.

## When to use
You can decide it very simply

 if your react component needs only data fetching and preprocessing =====> use server side components
 
 if your component needs fast user interractions   ========>  use traditional  react client components


# Source code
https://github.com/reactjs/server-components-demo

https://github.com/reactjs/rfcs/pull/188

##  Some libraries 
On the demo app, we seen use of some `react-io libraries`, so those will work seamlessly on both client and server components
- react-fs =  a small wrapper for accessing filesystem
- react-pg = a small wrapper for  postgres
- react-fetch = small wrapper around the fetch component


## Learning materials
{@embed: https://www.youtube.com/watch?v=TQQPAU21ZUw}

{@embed: https://www.youtube.com/watch?v=jK0Vg8XbIXk}

And also [this excellent blog by  Addy Osmani](https://addyosmani.com/blog/react-server-components/)