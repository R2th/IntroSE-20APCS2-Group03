Vue.js đã trở thành một công cụ không thể thiếu trong việc phát triển front-end. Việc có một hệ sinh thái thư viện rộng lớn đóng một vai trò quan trọng trong sự thành công của Vue. Vue Router là một trong những thư viện được tích hợp trong VueJS. 

Vậy thì hôm nay chúng ta cùng tìm hiểu về cách cài đặt Vue 3's Router nhé .

# Cài đặt Vue Router cho Vue 3 :
Giống như nhiều framework khác, Vue có CLI của riêng nó. Vì vậy, lúc đầu, chúng ta cài đặt nó bằng NPM hoặc Yarn.

```javascript
npm install -g @vue/cli
#hoac
yarn global add @uve/cli
```

Sau đó, chúng ta có thể tạo một project mới  bằng command vue create. Sau khi ch&#x1EA1;y xong thì CLI s&#x1EBD; có l&#x1B0;u ý nh&#x1B0; sau :

```javascript
Vue CLI v4.5.13
? Please pick a preset:
   Default ([Vue 2] babel, eslint)
>  Default (Vue 3) ([Vue 3] babel, eslint)
   Manually select features
```
Chúng ta sẽ lựa chọn giữa :

* Default (Vue 3) ([Vue 3] babel, eslint).
* Chọn các tính năng theo cách thủ công.

Dựa trên lựa chọn của  chúng ta, các bước sẽ khác nhau. Ví dụ :Nếu lựa chọn tùy chọn đầu tiên, mặc định (Vue 3) ([Vue 3] babel, eslint) , bạn cần cài đặt Vue Router theo cách thủ công bằng NPM, CDN hoặc Vue CLI :

```javascript
#NPM
npm install vue-router
```

```javascript
#CDN
<script src="/path/to/vue.js"></script>
<script src="/path/to/vue-router.js"></script>
```

```javascript
#Vue CLI
vue add router
```

Tuy nhiên, nếu làm theo cách này, chúng ta  sẽ phải thực hiện một số sửa đổi như tạo thư mục routing, configuration files, importing, v.v.

Vì vậy, mình khuyến khích các bạn sử dụng tùy chọn **Manually select features**. Nó sẽ tự động cài đặt Vue Router, định cấu hình tất cả các thông tin cơ bản cho bạn tại thời điểm tạo ứng dụng và cung cấp cho chúng ta một boiler page cơ bản.

```javascript
Vue CLI v4.5.13
? Please pick a preset: Manually select features
? Check the features needed for your project:
 (*) Choose Vue version
 (*) Babel
 ( ) TypeScript
 ( ) Progressive Web App (PWA) Support
>(*) Router
 ( ) Vuex
 ( ) CSS Pre-processors
 (*) Linter / Formatter
 ( ) Unit Testing
 ( ) E2E Testing
```

Sau khi hoàn thành các bước cơ bản chúng ta sẽ được một cấu trục như sau :

```
public
src
└───assets
    components
    router
    └───index.js
    views
    App.vue
    main.js
```

# Nested Routes :

Với các nested routes, chúng ta có thể load động các components. Bên cạnh đó, nó cũng khá phù hợp với cấu trúc thành phần Vue.js.

Ví dụ: giả sử chúng ta muốn hiển thị danh sách message. Và sau đó để mở một cuộc trò chuyện cá nhân khi người dùng chọn một tin nhắn từ danh sách đó.

![](https://images.viblo.asia/57dba9b2-21ec-4085-8a4f-9fbf0ad0f322.gif)

Chúng ta có thể sử dụng một view và một component để thực hiện tính năng này. Vì vậy, mình đã tạo một view mới được gọi là **Message** trong views folder và một component khác gọi là **ChatBox**.ChatBox sẽ được sử dụng bên trong **Message** view.

```javascript
//App.vue
<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/messages">Message</router-link>
  </div>
  <router-view />
</template>


//App.vue
<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/messages">Message</router-link>
  </div>
  <router-view />
</template>
```

```javascript
//router file
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/messages",
    name: "Message",
    component: () =>
      import("../views/Message.vue"),
  },
 ];
```

Chúng ta cần thêm một <router-view< khác bên trong Mesage view để có các components con và cập nhật đường dẫn đến các components con này :

```javascript
//Message.vue
<template>
  <div id="messagepage">
    <h1>This is the messages page</h1>
    <div id="nav">
      <router-link to="/messages/chat/1">User 1</router-link> |
      <router-link to="/messages/chat/2">User 2</router-link> |
      <router-link to="/messages/chat/3">User 3</router-link> |
      <router-link to="/messages/chat/4">User 4</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
```

```javascript
//router file
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/messages",
    name: "Message",
    component: () =>
      import("../views/Message.vue"),
    children: [
      { 
        path: 'chat/:userId',
        component: () =>
        import("../components/ChatBox.vue"),
      }
    ]
  },
];
```

# Dynamic Route Matching

Vậy khi chúng ta muốn truyền một tham số trong route thì sao nhỉ, đơn giản lắm chỉ cần thêm dấu : , và khi router khớp thì chúng ta có thể truy cập vào tham số này bằng **$route.params** :

```javascript
const routes = [
  {
    path: "/messages/chat/:userId",
    name: "Message",
    component: () => import("../views/Message.vue")
}];
```

Ngoài ra, có thể chuyển nhiều tham số trong cùng một route. Ví dụ: **/user/: userName /message/: messageId** là một tuyến hợp lệ và bạn có thể truy cập cả hai tham số này trong thành phần bằng cách sử dụng **$route.params.userName** và **$route.params.messageId** .

# Programmatic Navigation
Có thể thấy rằng mình đã sử dụng thẻ <router-link> trong ví dụ khai báo điều hướng . Bây giờ mình sẽ chỉ cho bạn một cách khác :

Khi người dùng được chuyển hướng do một hành động xảy ra trên một route, nó được gọi là programmatic navigation.

Trong Vue.js, chúng ta sử dụng phương thức router.push () để điều hướng. Method này push một entry mới vào history stack khi người dùng muốn chuyển hướng. Vì vậy, người dùng có thể dễ dàng quay lại trang trước bằng cách nhấp vào nút quay lại.

Phương thức này nhận ba tham số đầu vào. Đầu tiên là vị trí cần được chuyển hướng và thông số này là bắt buộc. Tham số thứ hai và thứ ba là tùy chọn :
    
```javascript
router.push(location, onComplete?, onAbort?)
```
Và cách truyền tham số khi sử dụng push :
    
```javascript
// as a simple string
router.push('messages')

// as a object with path
router.push({ path: 'messages' })

// as a object with a name and params => /messages/1
router.push({ name: 'messages', params: { userId: '1' } })

// with query => /messages?plan=archived
router.push({ path: 'messages', query: { status: 'archived' } })
```
    
**Lưu ý** :  **path** và **params** không thể sử dụng cùng lúc nhé. Các **params** sẽ bị bỏ qua nế :**path** được sử dụng. Do đó, khi muốn truyền thêm **params**, chúng ta cần sử dụng **name** thay vì **path** :
    
```javascript
router.push({ name: 'messages', params: { userId } }) // -> /user/123
router.push({ path: '/messages', params: { userId } }) // -> /user  
```

# Navigation Guards
Navigation Guards được sử dụng để chặn hoặc cho phép điều hướng cho người dùng dựa trên một số điều kiện. Trong Vue.js, có một số phương pháp để triển khai các bộ bảo vệ điều hướng, và hãy xem các phương pháp đó là gì và khi nào chúng ta nên sử dụng chúng :
    
# Global Before Guards
    
```javascript
const router = new VueRouter({ 
  ...
})

router.beforeEach((to, from, next) => {
  ...
})
```
    
Thông thường nó sẽ có 3 tham số đầu vào được đặt tên là **from**, **to** và **next** :
    

* **to**  : target của route.
*    **from**: route hiện tại.
    
*    **next**: đây là một function mà chúng ta cần gọi để hook. Hành động cuối cùng của function này phụ thuộc vào đối số mà chúng ta cung cấp :
*    **next()** : di chuyển đến hook tiếp theo. Nếu không có gì bên trái, thì việc chuyển hướng sẽ được chấp thuận.
*    **next(false)** : Việc chuyển hướng hiện tại sẽ bị hủy bỏ.
*    next('/') : chấp thuận việc chuyển hướng và redirect đến route mới.
 
#  Global Resolve Guards
    
  Global revolve guards được đăng kí khi sử dụng **router.beforeResolve** :

    
```javascript
const router = new VueRouter({ 
  ...
})

router.beforeResolve((to, from, next) => {
  ...
})
```
    
# Pre Route Guard

```javascript
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      ...
    }
  }
];
```
    
#  Data Fetching và Routing

Data fetching là một tác vụ phổ biến khác mà chúng ta có thể liên quan đến việc routing. Vue.js cung cấp hai phương pháp để fetching dâta từ các server khi một route được kích hoạt.

* Data fetching sau khi điều hướng.
* Data fetching trước khi điều hướng.

Ví dụ: giả sử rằng chúng ta cần fetching thông báo vào thành phần Message dựa trên user id. User id sẽ được chuyển vào tuyến dưới dạng một tham số và chúng ta cần sửa đổi component Message như bên dưới:
    
```javascript
export default {
  data () {
    return {
      loading: false,
      message: null,
      error: null
    }
  },
  created () {
    this.fetchMessages()
  },
  watch: {
    '$route': 'fetchMessages'
  },
  methods: {
    fetchMessages() {
      this.error = this.message = null
      this.loading = true
      const fetchedId = this.$route.params.userId
      getMessage(userId, (err, msg) => {
        if (this.$route.params.id !== userId) return
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          this.message = message
        }
      })
    }
  }
}
```
    
User id có thể được truy cập bằng cách sử dụng **$route.params.userId** và dữ liệu message được fetching bên trong lifecycle hook **created** cùng với **fetchMessages ()** . Ngoài ra, **watch: {}** được sử dụng để gọi lại phương thức **fetchMessages ()** nếu có bất kỳ thay đổi nào của route.

Trong data fetching trước khi điều hướng, chúng ta fetching dữ liệu trước khi điều hướng ở **beforeRouteEnter**. Sau khi hoàn tất, chúng ta có thể sử dụng phương thức **next ()** từ **beforeRouteEnter** để set data cho view.

```javascript
export default {
  data () {
    return {
      message: null,
      error: null
    }
  },
  beforeRouteEnter (to, from, next) {
    getMessages(to.params.id, (err, message) => {
      next(data => data.setMessage(err, message))
    })
  },

  beforeRouteUpdate (to, from, next) {
    this.message = null
    getMessages(to.params.id, (err, message) => {
      this.setMessage(err, message)
      next()
    })
  },
  methods: {
    setMessage (err, message) {
      if (err) {
        this.error = err.toString()
      } else {
        this.message = message
      }
    }
  }
}
```

# Khác nhau giữa Vue 2 và Vue 3
    
#  Version
    
 Vue 3 chỉ hỗ trợ cho 4.x+ versions của Vue Router. Vì vậy chúng ta cần phải update package.json:
    
```javascript
"dependencies": {
  "vue": "^3.0.0",
  "vue-router": "^4.0.3"
},
```
#  Path Matching   
    
Trước đây chúng ta hay sử dụng dấu * :

```javascript
{
  path: '*'
}
```
 Bây giờ thì viết như sau :
    
```javascript
{
  path: "/:pathMatch(.*)*",
}
```
    
#  Khác một chút ở Routing File
    
```javascript
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes, })

const app = Vue.createApp({})
app.use(router)
app.mount('#app')
```
    
    
Vậy là bài viết của mình đến đây là kết thúc rồi .
    
Nếu thấy hay hãy **like**, **share** và **upvote** cho mình nhé.
    
Many thankssssss