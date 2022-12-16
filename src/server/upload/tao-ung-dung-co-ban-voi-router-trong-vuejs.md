Xin chào các bạn. Hôm nay mình sẽ tiếp tục series về Vuejs. Hôm nay mình sẽ hướng dẫn các bạn tạo 1 ứng dụng cơ bản với router

Nếu bạn muốn tạo một trang web đơn giảnvới Vuejs và muốn thực hiện nó càng nhanh càng tốt. Thì ví dụ dưới đây của tôi sẽ giúp bạn làm một web đơn giản một cách nhanh chóng.

Nếu bạn chưa cài đặt Vue trên máy tính của mình, hãy cài đặt Vue qua terminal:

``` html
npm install -g @vue/cli
```

Sau đó tạo ứng dụng của bạn:

``` html
vue create name-of-your-app
```

Giờ bạn hãy `cd` vào trong thư mục dự án. Sau đó nếu bạn muốn nhìn thấy thông tin những gì mình đang làm.
Hãy cái đặt `server renderer`:
``` html
npm install vue vue-server-renderer — save
```

Và bây giờ bạn có thể nhập `yarn serve` hoặc `npm run serve`, và bạn sẽ nhận được một trang Vuejs  "Hello World"  cung cấp các liên kết hữu ích đến tài liệu Vue.Trước khi bạn quyết định chỉ xóa thành phần "Hello World" và tất cả  HTML.Tôi nghĩ bạn lên lưu lại phần HTML này ở đâu đó phòng trường hợp mà có thể bạn cần tham khảo lại nó.

Giờ hãy cài đặt Vue Router nhé :
``` html
npm install vue-router
```

Trong dự án của bạn, mở `main.js`. Bạn sẽ cần nhập VueRouter cũng như bất kỳ thành phần nào bạn có thể có mà bạn cần các router. Bạn cũng cần thêm dòng Vue.use (VueRouter).


``` html
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
improt Home from './components/Home.vue'
improt Bio from  './components/Bio.vue'
improt Contact from  './components/Contact.vue'

Vue.use(VueRouter)
```
Bây giờ bạn cần thêm router object cho ứng dụng của mình.Sử dụng công cụ này để map router đến các thành phần mà bạn đã import.
Tôi khuyên bạn nên thêm `mode`:


``` html
const router = new VueRouter({
	
	model: 'history',
	routers: [
		{
			path: '/',
			component: Home
		},
		{
			path: '/',
			component: Bio
		},
		{
			path: '/',
			component: Contact
		}
	]
})
```

Và sau đó thêm `router` vào ví dụ của Vue:

``` html
new Vue({
	router,
	render: h => h(app)
}).$mount('#app')
```

Giờ chuyển sang file `App.vue`. Bên trong template của bạn, bên trong thẻ `<div>` thêm một `router-view` với các thành phần của bạn bên trong
``` html
<router-view><Home /><Bio /><Contact /></router-view>
```
Ngoài ra cần chắc chắn rằng tất cả các component của bạn import cũng phải có trong đây.Ở trong template này tôi cũng sẽ đặt 1 thẻ `<Nav/>`.Trong file `Nav.vue` của tôi, tôi thêm các thẻ liên kết router để bây giờ tôi có thể chuyển đổi giữa các thành phần khác nhau.

``` html
<div>
	<nav>
		<router-link class="nav-item" to="/">Home</router-link>
		<router-link class="nav-item" to="/bio">About</router-link>
		<router-link class="nav-item" to="/contact">Contact</router-link>
	</nav>
</div>
```

---
Đây có thể không phải là một ứng dụng web động phức tạp, nhưng nó sẽ giúp bạn bắt đầu với việc có thể xây dựng một trang web cơ bản với các router với Vue.Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.

---
### Tham Khảo chi tiết hơn


https://vuejs.org/v2/guide/routing.html