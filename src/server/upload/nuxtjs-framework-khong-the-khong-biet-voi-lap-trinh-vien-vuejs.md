Xin chào mọi người. Ngoài việc thân thiện với người sử dụng, giúp người dụng thao tác dễ dàng hơn hay mang lại trải nghiệm tốt nhất, tốc độ tải nhanh cho trang, thì chắc hẳn việc quảng bá trang Web của mình tiếp cận tới nhiều người dùng, đưa trang Web của mình có thể SEO dễ dàng trên Google là một điều mà mọi người đều rất mong muốn. Hiện nay chúng ta có rất nhiều công cụ, framwork để giúp lập trình viên có thể dễ dàng làm điều đó. Với những ai đang dùng Vue.js để phát triển giao diện cho website của mình thì - Nuxt.js là một framework không thể bỏ qua.
![image.png](https://images.viblo.asia/7d68f18c-4139-45ea-93b4-119c7b843abf.png)

# 1. Tại sao chúng ta nên dùng Nuxt.
 - Để hoàn chỉnh một ứng dụng **Single Page Application (SPA)** với Vue.js và API, chúng ta cần xây dựng và tùy chỉnh rất nhiều trong đoạn dự án của mình, cần cấu trúc folder sao cho phù hợp. Đồng thời việc tối ưu cho **Server Side Rendering (SSR)** cũng như SEO Google tuy vẫn có thể làm được tuy nhiên rất mất thời gian cũng như công sức của chúng ta. Thay vào đó, Nuxt.js đã có tất cả chúng ta chỉ cần cài đặt project Nuxt.js mọi thứ còn lại cứ để **NuxtJs** lo với các hooks có sẵn.
 - **Tại sao chúng ta lại phát minh ra bánh xe khi người ta đã chế tạo ra được ô tô?** Trong Nuxt.js cấu trúc folder đã được tối ưu và được đội ngũ phát triển cấu trúc phù hợp với một ứng dụng SSR.  Nuxt.js với cấu trúc rõ ràng đã tiết kiệm thời gian cho chúng ta vì không cần phải ngồi nghĩ xem cấu trúc folder thế nào là phù hợp.
 - **Có sẵn routing, middleware, VueX**: Chúng ta không cần cài đặt thêm package router cho ứng dụng Vue của mình. Nuxt đã tự động cài đặt cũng như mapping router theo cấu trúc folder từng trang,  middleware (xử lý trung gian giữa request và response) đã được tích hợp sẵn trong Nuxt, hay VueX một công cụ không thể thiếu trong phát triển ứng dụng lớn để quản lý state chung. iúp cho lập trình viên nhanh chóng đi vào phát triển ứng dụng.

# 2. Cài đặt cơ bản

Để cài đặt, khởi tạo một project Nuxt.js chúng ta cần :
- node - Sử dụng phiên bản mới nhất của node để phù hợp và tương thích nhất với Nuxt.js
- text editor - Đương nhiên rồi
- terminal: Chúng ta có thể sử dụng terminal của hệ điều hành hoặc sử dụng ngay trên các text editor như Visual Studio Code.

Chúng ta có thể cài đặt thông qua: yarn, npm hoặc npx. Ở đây mình sẽ cài đặt thông qua npm là package manager phổ biến nhất hiện nay thông qua câu lệnh :
```bash
npm init nuxt-app <project-name>
```
**Chọn tên project**, Ngôn ngữ sử dụng: chúng ta có thể dùng Nuxt với Javscript hoặc TypeScript.

![image.png](https://images.viblo.asia/467fa002-e31d-49f0-9a80-7c8c6c7ce30c.png) ![image.png](https://images.viblo.asia/3b49d03a-3cf8-4981-bf77-7c349376568a.png)

Mình sử dụng Javascript, npm và thêm giao diện của Element cđể init project.

![image.png](https://images.viblo.asia/c1e7d087-ffd9-43fc-8a6a-2210a1d7e6b6.png)

Cuối cùng chúng ta chạy lệnh để chạy ứng dụng trên môi trường development : 
```bash
 cd nuxt-demo
 npm run dev
```
Kết quả: 

![image.png](https://images.viblo.asia/f3f93640-b8c3-41b7-aba5-85e83c4c7c32.png)

# 3. Cấu trúc folder, middleware trong Nuxt
![image.png](https://images.viblo.asia/2595c073-4ff0-44c5-bdbb-d67902891f4a.png)

Cấu trúc mặc định khi khởi tạo ứng dụng Nuxt.js sẽ bao gồm các folder như hình trên.  Về cơ bản bao gồm: pages, components, static, store, plugins, và 2 file quan trọng là nuxt.config.js và package.json.

### pages:
Thư mục **pages** bao gồm các views của ứng dụng và Nuxt.js sẽ đọc tất cả các file ```.vue``` bên trong thư mục này , các views này sẽ được tự động map với routes tương ứng. Ví dụ chúng ta thường có page mặc định sẽ có đường dẫn : ```pages/index.vue``` nó sẽ tương ứng với đường link có path: ```your_domain.com/``` tức là ngay trang chủ.

Ngoài ra chúng ta có thể thêm thư mục và bên trong thư mục sẽ có thư mục con như vậy tương ứng với các level của đường dẫn url :
vd: ```pages/posts/create.vue``` và ```pages/posts/[post].vue```.vue sẽ tương ứng với url có path: ```your_domain.com/posts/create``` và ```your_domain.com/posts/post_param```. Ở đây chúng ta thấy điều đặc biệt là chúng ta có thể truyền biết vào một components ```[post].vue``` biến này sẽ được lấy thông qua url path ```post_param```. Chi tiết về phần này mọi người hãy đọc thêm tại trang chủ của nuxt.js nhé ! 

### components:
Thư mục **components** là nơi đặt tất cả các components cho ứng dụng. Để import  chúng vào các pages. Components giúp chia các phần tách biệt của pages và giúp tái sử dụng lại cho các pages khác nhau.

### static: 
Thư mục static sẽ được ánh xạ tới thư mục gốc của server và những file trong này sẽ không bị thay đổi. Tất cả tệp tin trong đây sẽ có thể truy cập thông qua đường dẫn gốc của dự án. Ví dụ chúng ta có logo của dự án sẽ nằm ở thư mục này : ```/static/logo.png``` và nó sẽ có thể truy cập thông qua đường dẫn : ```your_domain.com/logo.png```. 

### store:
Đây là nơi lưu store của Vuex. Toàn bộ các state, actions hay mutations VueX đều nằm trong thư mục này. Nếu cần dùng tới VueX. Hãy tới thư mục này và tạo một file index.js để kích hoạt store trong Nuxt.js
### Tệp tin nuxt.config.js :
Đây là tệp tin giúp chúng ta cấu hình cho ứng dụng Nuxt.js. THêm modules, ghi đè những cài đặt mặc định, cấu hình nơi lưu biến môi trường ```env```, cấu hình thêm ```plugins``` , router, các trình biên dịch file sass, scss ... và còn nhiều cấu hình khác đều cần cài đặt ở trong file này.

### package.json:
Như mọi ứng dụng dùng node khác . chúng ta có file package.json nơi lưu lại những dependencies  và các đoạn scripts giúp tự động chạy hay build ứng dụng.


Ngoài ra như mình nói ở trên khi ứng dụng lớn hơn và sử dụng tới SSR. Chúng ta có thể thêm vào những thư mục khác như: layouts, middleware, modules ...
Trong đó 
### layouts: 
Đây là thư mục chứa những layouts dùng chung của ứng dụng. Ví dụ bạn có trang cho khách public và trang admin. Hai trang này sẽ có layout khác nhau vì thế chúng ta có thể tạo một layout ```default.vue``` và ```admin.vue``` Mặc định Nuxt.js sẽ nhận layout ```default.vue``` khi chúng ta không khai báo layouts cho pages. Để sử dụng layouts, chúng ta có thể khai báo ngay trong thẻ script của Vue 
```js
<script>
export default {
    layout: 'admin',
}
</script>
```
Ngoài ra chúng ta có thể custom lại trang lỗi cho ứng dụng thay vì trang lỗi mặc định của nuxt
![image.png](https://images.viblo.asia/f811c321-27bd-4cef-9f24-2ed05ba8b9dc.png)

bằng cách thêm layouts/error.vue và custom. 

### middleware
Thư mục ```middleware``` bao gồm middleware sử dụng trong ứng dụng. Middleware sẽ định nghĩa các hàm để chạy trước khi render page hoặc layout.
Tất cả middleware dùng chung có thể đặt ngay trong thư mục này. Tên của tệp tin middleware cũng chính là tên middleware: 
Ví dụ``` middleware/admin.js``` thì chúng ta có thể dùng chúng với tên ```admin```.. Middleware sẽ nhận tham số đầu tiên là ```context``` 
```js
export default function (context) {
    ///your code
}
```

```context``` là một ```Object``` sẽ bao gồm : app, store, route, params, query, env, isDev, isHMR, redirect, error, $config. Các bạn có thể xem thêm tại [đây](https://nuxtjs.org/docs/2.x/internals-glossary/context)

Middleware ở Nuxt có 3 cách dùng: 
- **Router middleware**: Chúng ta chặn theo route của ứng dụng. Ví dụ chúng ta muốn middleware trên tất cả ứng dụng thì chúng ta sẽ tạo một middleware như sau : 
```js
import http from 'http'

export default function ({ route }) {
  return http.get('http://your-domain.com', {
    url: route.fullPath
  })
}

``` 
Sau đấy chúng ta cần config trong file nuxt.config.js 
```js
export default {
  router: {
    middleware: 'stats'
  }
}
```
- **Named middleware**: Đây có vẻ là middleware thường hay được sử dụng nhất,chúng ta thường dùng để xử lý request tới các page. Giả sử chúng ta sử dụng VueX để lưu thông tin đăng nhập và xác định người dùng có đăng nhập hay chưa bằng state auth. Sử dụng middleware như sau: 
```middleware/auth.js
export default function ({ store, redirect }) {
  if (!store.state.auth) {
    return redirect('/login') // Nếu user chưa login thì redirect sang trang login 
  }
}
```
Khai báo trong các page mà yêu cầu đăng nhập :
```page/requiredLogin.vue
<template>
  <h1>Required login page </h1>
</template>

<script>
  export default {
    middleware: 'auth'
  }
</script>
```


- **Anonymous middleware**: Đây là kiểu khái báo  và viết logic của middleware ngay trong trang cần sử dụng middleware. Nếu chúng ta đơn giản chỉ cần  một trang nào đấy sử dụng middleware. Để tiện lợi chúng ta có thể viết luôn vào file ```.vue```
```js
<template>
  <h1>Required login page </h1>
</template>

<script>
  export default {
    middleware({ store, redirect }) {
      if (!store.state.auth) {
        return redirect('/login')
      }
    }
  }
</script>
```
# 4. Kết bài
Bài viết hôm nay của mình không dài cũng không ngắn. Tuy nhiên đây là những thứ cơ bản nhất với NuxtJS, để bắt đầu với một Framework chúng ta cần biết rõ từng folder hay file của chúng sử dụng với mục đích gì. Rất mong bài viết có thể giúp ích cho mọi nguời để tiếp cận với NuxtJS. Nếu các bạn cần làm một website SSR hay đến với NuxtJS. Bài sau mình sẽ viết thêm về Nuxt Lifecycle . Cảm ơn mọi người đã theo dõi bài viết, thấy hay và bổ ích thì upvote cho mình nhé. Hẹn gặp lại mọi người trong bài viết sau.