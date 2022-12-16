Sau bài viết  với [vue layouts](https://itnext.io/vue-tricks-smart-layouts-for-vuejs-5c61a472b69b), tôi muốn đi sâu hơn vào automation và tạo automatic router cho ứng dụng. 
Chúng ta đã gặp vấn đề với vue router: có hàng trăm router trong ứng dụng của mình và file router chứa hàng trăm dòng code. Sẽ là một ý kiến hay nếu cho phép tự động tạo các router khi ta thêm các trang mới trong ứng dụng.

# Chuẩn bị
Tạo ứng dụng mới bằng Vue CLI [https://cli.vuejs.org/](https://cli.vuejs.org/)
```php
vue create vue-automatic-router
```

* Đầu tiên, dọn dẹp project khỏi các file không sử dụng. Xóa thư mục assets và components. 
* Tạo thư mục router, đổi tên router.js thành index.js và di chuyển nó vào thư mục router.
* Xóa tất cả các links tới logo và HelloWorld.vue trong Home.vue và đổi tên Home.vue thành Index.vue

```php
--src
----router
------index.js
----views
------About.vue
------Index.vue
----App.vue
----main.js
```


`router/index.js`

```php
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
```

# Tạo automatic router
##  Implemen cơ bản

* Đầu tiên, tạo một tệp mới có tên là route.js trong thư mục router.

* Thêm một function tiếp theo bên trong `router/routes.js`
```php
const importAll = r => r.keys()
  .map(key => key.slice(2)
    .replace('.vue', '').split('/'));
```

Hàm này đang tìm tất cả các file vue, xóa hai ký tự từ đầu `./` trỏ tới thư mục, xóa phần mở rộng file `.vue` và tạo một mảng từ chuỗi đường dẫn của file bằng dấu gạch chéo `/` làm dấu phân tách.

Bây giờ chúng ta nên nhập tất cả các pages của mình từ thư mục views. Vấn đề là các ứng dụng phía client và browser không có quyền truy cập trực tiếp vào file system. Chúng tôi có thể thử sử dụng một số cách phức tạp để có quyền truy cập vào file system, nhưng may mắn thay, vì chúng tôi đang sử dụng webpack nên có thể sử dụng hàm `require.context` của webpack. Hãy làm như thế này:

`router/routes.js`

```php
const pages = importAll(require.context('../views', true, /\.vue$/))
```

Chúng tôi đã thêm `require.context` làm đối số cho hàm `importAll` trước đó.

* Đối số đầu tiên của `require.context` là đường dẫn liên quan đến folder các pages. Hãy chắc chắn rằng bạn đang sử dụng cùng một cấu trúc với tôi hoặc điều chỉnh đường dẫn cho phù hợp.

* Đối số thứ hai cho phép hàm kiểm tra các thư mục bên trong một cách đệ quy.

* Trong phần thứ ba, chúng tôi chỉ định phần mở rộng tệp, `.vue` trong trường hợp của chúng tôi.
Hiện tại, biến trang là một array của arrays có hai phần tử

```
[["About"], ["Home"]]
```

Đã đến lúc tạo một helper function để tạo các routers của chúng tôi từ các page
`router/routes.js`

```php
const generateRoute = path => {
  const shortcut = path[0].toLowerCase()
  return shortcut.startsWith('index')
    ? '/'
    : path.map(p => p.toLowerCase()).join('/')
}
```

Function này hiện đơn giản, nhưng nó sẽ được mở rộng từng bước trong khi chúng tôi tạo automatic router của mình. Ngay bây giờ chúng ta chỉ cần kiểm tra xem file name có phải là `index` hay không và thay đổi đường dẫn thành `/` thay vì `/index`, nếu không nó sẽ trả về path name bằng chữ thường. Đối với `About.vue` sẽ là `/about`

Trong phần cuối của `routes.js`, chúng tôi cần nhập các router mới của mình

```php
export default pages
  .map(async path => {
    const { default: component } = await import(`../views/${path.join('/')}`)
    const { name } = component
    const route = `/${generateRoute([...path])}`
    return {
      path: route,
      name,
      component
    }
  })
```

Trong export default, tất cả các components được import động. Nó cần lấy tên của router từ component. Sau đó, chúng tôi sẽ import thêm data từ các components tại đây.

Tiếp theo, chúng ta nên điều chỉnh router/index.js và `main.js` để hoạt động với promises chúng ta đã tạo trong `router/routes.js`

`router/index.js`
```php
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

export default Promise.all(routes).then(routes => {
  return  new VueRouter({
    mode: 'history',
    routes
  })
})
```

Thay vì export router, chúng tôi export một array của promises đại diện cho router của chúng tôi và đợi khi tất cả  routers sẽ được import.

`main.js`
```php
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

const init = async() => {
  const module = await import('./router')
  const router = await module.default
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
};

init()
```

Vì router của chúng ta hiện không đồng bộ, chúng ta nên tạo một async wrapper trước khi tạo một Vue instance. Và ở đây là triển khai Vue3 cho cả hai files.

`router.index.js`
```php
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

export default Promise.all(routes).then(routes => {
  return createRouter({
    history: createWebHashHistory(),
    routes
  })
})
```

`main.js`
```php
import { createApp } from 'vue'
import App from './App.vue'

const init = async() => {
  const module = await import('./router');
  const router = await module.default;
  createApp(App).use(router).mount('#app')
}

init()
```

Đã đến lúc bắt đầu project của chúng tôi với `npm run serve` và hiểu rằng mọi thứ đang hoạt động như mong đợi.

## Tạo routes tree

Trong hầu hết các trường hợp, chỉ cần có các routes đơn giản là `/` `/about` `/countacts` .... Thông thường, các web applications thực tế có hệ thống routing phức tạp hơn. Bây giờ chúng ta hãy điều chỉnh function generateRoute của chúng ta để xử lý những cây phức tạp hơn.

Routes được tạo dựa trên cấu trúc file của chúng tôi. Trong ví dụ ban đầu, chúng tôi chỉ có hai components pages là `Index.vue` và `About.vue`. Nó cung cấp cho chúng tôi routes với hai routes: `/` và `/about`. Nếu bạn cần routes `/users` và `/user/profile`, bạn nên có cấu trúc file tiếp theo:

```php
--src
----views
------users
--------Profile.vue
--------Index.vue
```

Bắt buộc phải tạo một folder `users` với hai file vue là `Profile.vue` và `Index.vue`

Hãy tạo chế độ xem CRUD điển hình cho `posts` resource. Chúng tôi sẽ không nhận được kết nối API, vì đó là một chủ đề khác mà tôi đã đề cập trong [bài viết](https://itnext.io/vue-tricks-smart-api-module-for-vuejs-b0cae563e67b) này. Chỉ cần tạo routes cho hệ thống này:

```
/posts — show list of posts
/posts/create — create a new post
/posts/1 — show post with id === 1
/posts/edit/1 — edit post with id === 1
```

Chúng tôi sẽ đề cập dynamics routes trong phần phụ tiếp theo và tập trung vào hai phần đầu tiên: hiển thị danh sách các bài đăng và tạo một bài đăng mới.

Tạo folder `posts` với hai file `Index.vue` and `Created.vue`

`views/posts/Index.vue`
```php
<template>
  <div>
    <h1>This is a list of posts page</h1>
  </div>
</template>

<script>
export default {
  name: "Posts"
}
</script>
```


`views/posts/Create.vue`
```php
<template>
  <div>
    <h1>This is a post creation page</h1>
  </div>
</template>

<script>
export default {
  name: "PostCreate"
}
</script>
```

Nó không làm gì với router của chúng tôi vì chúng tôi nên điều chỉnh function `generateRoute` của mình trước.
 
` router/routes.js`
```php
const generateRoute = path => {
  // Note: remove first element if route starts with index
  if (path[0].toLowerCase().startsWith('index') && path.length > 1) {
    path.shift()
  }
  // Note: handle root routes
  if (path.length === 1) {
    const shortcut = path[0].toLowerCase()
    return shortcut.startsWith('index')
      ? ''
      : shortcut
  }
  // Note: handle other routes
  const lastElement = path[path.length - 1]
  // Note: remove last element in array if it is index
  if (lastElement.toLowerCase().startsWith('index')) {
    path.pop()
  }
  return path.map(p => p.toLowerCase()).join('/')
}
```

Nếu bạn kiểm tra hai routes của mình, bạn có thể thấy nội dung của các components của chúng tôi. Router có cấu trúc tiếp theo:
```php
[
{
  component: About.vue,
  name: 'About',
  path: '/about'
}
{
  component: Index.vue,
  name: 'Home',
  path: '/'
}
{
  component: posts/Index.vue,
  name: 'Posts',
  path: '/posts'
}
{
  component: posts/Create.vue,
  name: 'PostCreate',
  path: '/posts/create'
}
]
```

## Xử lý dynamic routes
Thông thường, trong quá trình xây dựng một ứng dụng, một nhà phát triển cần phải làm việc không chỉ với các static routes mà còn với cả dynamic routes. Hãy thêm function này vào automatic router của chúng tôi. Và một lần nữa, chúng tôi sẽ điều chỉnh  function `generateRoute` của mình. Nhưng trước khi làm điều này, hãy tạo hai file mới trong folder `views` của chúng tôi. 

Trong folder `posts`, tạo file `_Id.vue`. Vâng, nó không phải là lỗi đánh máy. Tệp phải bắt đầu bằng `_symbol`. Nó cho router của chúng tôi biết rằng router này là một dynamic router.

Tạo folder `edit` trong folder `views/posts`. Bên trong nó thêm `file_Id.vue`.

`views/posts/_Id.vue`

```php
<template>
  <div>
    <h1>This is a page of the post with id {{ $route.params.id }}</h1>
  </div>
</template>

<script>
export default {
  name: "PostDetails"
}
</script>
```

`views/posts/edit/_Id.vue`

```php
<template>
  <div>
    <h1>This is a page to edit the post with id {{ $route.params.id }}</h1>
  </div>
</template>

<script>
export default {
  name: "PostEdit"
}
</script>
```

Đây là những điều chỉnh cuối cùng của function `generateRoute`


```php
const generateRoute = path => {
  // Note: remove first element if route starts with index
  if (path[0].toLowerCase().startsWith('index') && path.length > 1) {
    path.shift()
  }
  // Note: handle root routes
  if (path.length === 1) {
    const shortcut = path[0].toLowerCase()
    return shortcut.startsWith('index')
      ? ''
      // Note: handle dynamic routes
      : shortcut.startsWith('_')
        ? shortcut.replace('_', ':')
        : shortcut;
  }
  // Note: handle other routes
  const lastElement = path[path.length - 1]
  // Note: remove last element in array if it is index
  if (lastElement.toLowerCase().startsWith('index')) {
    path.pop()
    // Note: handle dynamic routes
  } else if (lastElement.startsWith('_')) {
    path[path.length - 1] = lastElement.replace('_', ':');
  }
  return path.map(p => p.toLowerCase()).join('/')
}
```

Nó đã được thêm hai routers nữa trong router.
```php
[
...
{
  component: posts/_Id.vue,
  name: 'PostDetails',
  path: '/posts/:id'
}
{
  component: posts/edit/_Id.vue,
  name: 'PostEdit',
  path: '/posts/edit/:id'
}
]

```

Test với `npm run serve`

## Xử lý các routes lồng nhau
Không quá thường xuyên, nhưng theo thời gian, nó được yêu cầu sử dụng các  [nested routes](https://router.vuejs.org/guide/essentials/nested-routes.html) còn được gọi là con. Vì vậy, chúng ta thêm nó vào automatic router của chúng ta.

Tương tự như các dynamic routes, đối với các routers lồng nhau, chúng ta sẽ sử dụng tiền tố để cho router biết rằng đó là route lồng nhau. Trong trường hợp các routes lồng nhau, nó là ký hiệu `^`. Các routes lồng nhau phải được đặt cùng cấp với route chính.

Trước tiên, hãy thêm function này vào tệp router/routes.js của chúng tôi.

`router/routes.js`

```php
const childrenFilter = p => ~p.indexOf('^')

const childrenByPath = pages
  // Note: filter pages by children routes
  .filter(path => path.some(childrenFilter))
  .map(path => {
    // Note: copy path and remove special char ^
    const copy = [...path]
    copy[copy.length - 1] = copy[copy.length - 1].slice(1)
    // Note: generate key to identify parent
    const key = `/${generateRoute(copy.slice(0, copy.length - 1))}`
    return {
      path,
      route: `/${generateRoute(copy)}`,
      key
    }
  })
  .reduce((acc, cur) => {
    // Note: generate list of nested routes where key is the parent path
    const key = cur.key
    delete cur.key
    if (acc[key]) {
      acc[key].push(cur)
    } else {
      acc[key] = [cur]
    }
    return acc
  }, {})
```

Hàm này đang tạo danh sách các nested routes trong đó key là đường dẫn chính và mảng giá trị của các key. Và hãy mở rộng function đã export:

`router/routes.js`

```php
export default pages
  // Note: remove nested routes from pages
  .filter(path => !path.some(childrenFilter))
  .map(async path => {
    const { default: component } = await import(`../views/${path.join('/')}`)
    const { name } = component
    const route = `/${generateRoute([...path])}`
    let children = []
    if (childrenByPath[route]) {
      const promises = childrenByPath[route].map(async ({ path, route }) => {
        const { default: childComponent } =
          await import(`../views/${path.join('/')}`)
        const { name: childName } = childComponent
        return {
          path: route,
          name: childName,
          component: childComponent,
        }
      })
      children = await Promise.all(promises)
    }
    return {
      path: route,
      name,
      component,
      children
    }
  })
```

Để xem các thay đổi, chúng ta nên tạo thêm hai page nữa trong một folder mới users `users/Index.vue` và `users/^Profile.vue`


```php
<template>
  <div>
    <h1>This is an users page</h1>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Users'
}
</script>
```

Bạn có nhận thấy rằng cần một `router-view` khác để hiển thị nested route ở đây không?

Một route khác với các nested routes đã được thêm vào automatic router.

```php
[
...
{
  children: [
    component: users/^Profile.vue,
    name: 'UserProfile',
    path: '/users/profile'
  ],
  component: users/Index.vue,
  name: 'Users',
  path: '/users'
}
]
```

Code Github: https://github.com/NovoManu/vue-automatic-router-example

Bài viết được dịch từ: https://itnext.io/vue-tricks-smart-router-for-vuejs-93c287f46b50