# I. Chuẩn bị:
Tạo mới 1 vue-app:
```
vue create authen-with-vue-router
```

Config cơ bản:
1.  Babel.
2.  Router (history Mode).

Option thêm:
3.  Vuex -> Lưu thông tin user.

Chúng ta sẽ có `token` của `user`, nên mình sẽ dùng  `cookies`.

Về phía API, mình dùng `json-server` cho nhanh. File `db.json` của mình sẽ như sau:
```json
{
	"users": [{
		"id": "1584177315024",
		"email": "trdbau@gmail.com",
		"password": "123456",
		"token": "1584177315024",
		"name": "Tran Duy Bau"
	}, {
		"id": "1584177319076",
		"email": "minhanh1306@gmail.com",
		"password": "123456",
		"token": "1584177319076",
		"name": "Tran Minh Anh"
	}]
}
```

Oke. Run web nào:

```
yarn serve
```

Và cả server:

```
json-server --watch db.json
```
#  II. Phương pháp cũ của Báu:
Xem qua tiêu đề là biết cái code nó củ chuối rồi  🤦.
Yeah, vào thuở hồng hoang, Báu đã check Authen ở App.vue:
```js
export default {
  name: "App",
  beforeCreate() {
    const token = getToken();
    // next-line: Use token to check authen
    checkLogin(token);
  },
};
```
Chúng ta cũng có trang `Login` check nếu đã login thì redirect về `/home`:
```js
export default {
  name: "Login",
  beforeCreate() {
    if (this.userInfo) {
        this.$router.push('/home');
    }
  },
};
```

Lợi ích:
Theo sự tính toán, hook `beforeCreate` sẽ kiểm tra Authen bằng token ngay khi vào app. Cũng đơn giản nhỉ? Nah...
# III. Mở rộng bài toán - Thêm yêu cầu:
## 1. Giới thiệu:
Vấn đề là kiểm soát quyền truy cập `route` nếu đã login thành công/chưa login không thể thực hiện ở đây, việc tự động redirect sau khi login,... Lúc này chúng ta cần sự trợ giúp của `vue-router`, cụ thể là `Navigation Guards` ([Docs](https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards)). 
## 2. Thực hành

Chúng ta sẽ dùng `router.beforeEach` để kiểm tra `Authen`, và `router.js` để quy định các route cho `guest` và `user`.

Tạo 1 file `interception.js`, viết câu lệnh kiểm tra `authen` ở đây và import vào file `main.js` theo cú pháp: 
```js
import '@/interception';
```

Ở file `interception.js`:
### 1. Import:
```js
import router from '@/router'; //this-is: file router default, quy định các route.
import store from '@/store'; // this-is: dùng để lấy dữ liệu từ Vuex.
```
### 2. Codes and explaining codes:
Trong `Docs` của `vue-router`, chúng ta thấy có method `beforeEach`, định nghĩa:
>primarily used to guard navigations either by redirecting it or canceling it.

Hiểu đơn giản, chúng ta có thể ngăn chặn sự thay đổi route bằng `redirect`/`cancel`. Cú pháp từ `docs`:
```js
router.beforeEach((to, from, next) => {
  // ...
})
```
Còn đây là code cúa Báu:
```js
router.beforeEach(async (to, from, next) => {
  const { userInfo } = store.getters;
  // next-line: check if route ("to" object) needs authenticated
  if (to.matched.some((record) => record.meta.requiresAuth) && lodash.isEmpty(userInfo)) {
    next('/login');
  } else if (!lodash.isEmpty(userInfo)) {
    switch (to.name) {
      case 'Login' || 'Register' || 'ResetPassword':
        next({ path: '/' });
        break;
      case 'Home':
        next({ path: '/my-page' });
        break;
      default:
        next();
        break;
    }
  } else next();
});
```
Và ở file `router.js`, bạn sẽ tạo ra các `meta` như ví dụ sau ([Docs](https://router.vuejs.org/guide/advanced/meta.html)):
```js
{
    path: '/edit/:id',
    name: 'EditInfo',
    component: () => import('../views/FormInfo'),
    meta: { requiresAuth: true },
},
```
Và thế là mỗi khi chuyển `route`, `vue-router` sẽ chạy `router.beforeEach`:
  1. Kiểm tra `to` (Đây chính là `route` mà ta đang đến, bạn này là 1 object, tương tự với `this.$route` khi bạn gọi ở 1 `page-component` cụ thể) có yêu cầu `Auth` (`meta.requiresAuth`) hay không và kiểm tra `userInfo` trong `Vuex` đã tồn tại chưa. Nếu sai, chúng ta sẽ redirect đến `/login`.
  2. Nếu đã tồn tại `userInfo`, cần chặn chuyển trang nếu `user` cố tình truy cập mấy trang như là: `login, register, forgot-password`. Ở phương pháp cũ, chúng ta phải check `userInfo` ở `beforeCreate` của mỗi `component`. Cách mới khá tiện nhỉ?
  3. Di chuyển giữa các routes bình thường thì sao? Ừ thì, cứ `next()` thôi.
### 3. Test cases:
1. Gues truy cập  `/edit` (`{ requiresAuth: true })`: `router` phát hiện và đẩy sang `/login`. (done)
2.  Guest truy cập `/about` (`{ requiresAuth: false })`: `next()`. (done)
3.  User truy cập `/Login`: `router` redirect về `/home`. (done)
 ### 4. Update:
 1. Chúng ta sẽ dùng `token` để ngay khi vừa vào app, thì `user` sẽ được `login`:

* Function `handleInfoUser`:
```js
const handleInfoUser = async (to, from, next) => {
  const { userInfo } = store.getters;
  if (lodash.isEmpty(userInfo)) {
    try {
      await store.dispatch('user/checkLogin', { token: getToken() });
      next();
    } catch (error) {
      removeToken();
      next({path: '/login'});
    }
  } else {
    setToken();
    next();
  }
};
```
* Sửa bên trong `router.beforeEach`:
 ```js
...
  // next-line: check if route ("to" object) needs authenticated
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (token || userInfo) {
      handleInfoUser(to, from, next);
    } else {
      next('/login');
    }
  } else if (token) {
   await handleInfoUser(to, from, next);
   ...
});
```
Bây giờ khi có token, chúng ta sẽ được login ngay lập tức, à trừ khi token hết hạn 🤦.
>Phần này các bạn sẽ gọi `middleware` xử lý API và check nếu token hết hạn thì gọi refresh token - by Tran Dai Son.

Về cái `expired token` mình sẽ viết 1 bài khác hi :D.

2. Chúng ta cần redirect sau khi login. Mình sẽ ví dụ bằng 2 cách nhé:
* `interception.js`:
```js
// next-line: khi redirect tới login, ta dùng push và truyền path của trang bị chặn:
next(`/login?redirect=${to.fullPath}`)
```
* `Login.vue`:
```js
// component: Login.vue
export default {
  name: 'Login',
  ...
  data() {
    return {
      email: '',
      password: '',
      redirect: lodash.get(this, '$route.query.redirect', '/my-page'),
    };
  },
  ...
  },
};
</script>
```

* `interception.js`:
```js
// hoặc có thể sử dụng next() tạo ra 1 data mới cho trang login:
next((vm) => {
    vm.redirectTo = to.fullPath;
    return '/login';
});
```
# IV. Tổng kết - chia sẻ:
Với `router.beforeEach`, chúng ta sẽ tự động `login`, và kiểm tra `Auth` qua mỗi route, redirect theo phân quyền `User/Guest`. Ngoài ra, nếu dự án của chúng ta có nhiều `roles` hoặc phát triển nhiều `routes`, ta cũng dễ dàng quy định quyền truy cập, quản lý,... đối với từng role/route.

Bài viết này là kiến thức Báu học được từ những người anh/chị đi trước, xin được cảm ơn:
* Anh Nguyen Quoc Anh.
* Anh Duong Van Cuong.
* Anh Tran Dai Son.

Nếu có bất kỳ thắc mắc hoặc ý kiến nào, xin hãy comment bên dưới để chúng ta có thể cùng trao đổi ạ.
### Cảm ơn mọi người vì đã đọc bài viết của mình 🙇‍.