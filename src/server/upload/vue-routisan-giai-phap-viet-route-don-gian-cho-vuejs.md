> UPDATED: Bài viết này được viết trên Vue2+ và đã cũ, truy cập https://vue-routisan.rockett.pw/ để được cập nhật

Chào các bạn,

Đây là bài viết đầu tiên của mình trên viblo. Như các bạn đã biết Vue Router là package viết route có thể nói là vô cùng tuyệt vời cho Vuejs. Nhưng nếu các bạn đã hoặc đang làm việc trên Laravel thì Vue Routisan sẽ là một lựa chọn tuyệt vời cho bạn. 
**Lưu ý: Vue Routisan không phải là một package thay thế Vue Router, nó là package phụ thuộc vào Vue Router nghĩa là bạn vẫn phải cài Vue Router. Vue Routisan chỉ làm cách viết route đơn giản hơn thôi**
 ## 1. Vue Routisan là gì?
Như đã giới thiệu ở trên Vue Routisan là package có cách route tương tự như route của Laravel. Điều này thật tuyệt vời. Đơn giản là vậy.
## 2. Cài đặt Vue Routisan.
Vue Routisan là một package phụ thuộc vào Vue Routisan nên đương nhiên ta phải install cả Vue Router và Vue Routisan.

**NPM**
```
npm install vue-router vue-routisan --save
```
**Yarn**
```
yarn add vue-router vue-routsan --save
```
Và thiết lập đường dẫn view mặc định cho Vue Routisan.
```
Route.setViewResolver((component) => {
    return require('./views/' + component);
});
```
Hoặc đơn giản chỉ là:
```
Route.setViewResolver((c) => require('./views/' + c));
```
## 3. Route trong Vue Routisan
**1.  View**: Method view() cũng giống như method get() trong Laravel. Method view(path, component) có 2 tham số truyền vào
*  path: đường dẫn url
* component: component cần render
```
Route.view('/',  'Home");
```
Bạn cũng có thể đặt tên cho route thông qua method **name().**
```
Route.view('/', 'Home').name('Home');
```
Và **guard()** sẽ thiết lập *beforeEnter* trong *route instance* . Tham số truyền vào có thể là một mảng.
```
const auth = (to, from, next) => { //auth logged };
Route.view('/profile', 'Profile').guard(auth) ;

const admin = (to, from, next) => { //admin logged };
Route.view('/dashboard', 'Dashboard').guard([auth, admin]);
```
Nếu không muốn viết như trên thì có dùng **options()**
```
Route.view('/profile', 'Profile').options({
    'name': 'Profile',
    'beforeEnter': auth
});
```
Trong Vue Routisan cũng hỗ trợ **children()** của Vue Router. Cụ thể:
```
Route.view('/post', 'Post').children(() => {
    Route.view('/create', 'Create');
    Route.view('/show', 'Show');
});
```
**2. Redirect**
Cấu trúc đơn giản thôi.
```
Route.redirect('/', '/login');
```
**3. Group trong Vue Routisan.**
Có thể nói phần này không khác gì Laravel.
```
Route.group({prefix: '/post', beforeEnter: guest}, () => {
    Route.view('create', 'Create');
     Route.view('/show', 'Show');
});
```
## Retrieve all routes.
Cái này thì chỉ cần dùng `Route.all()`. Cụ thể
**file router/routes.js**
```
import Route from 'vue-routisan'

//Route

export default Route.all()
```

**file router/index.js**
```
import Vue from 'vue'
import Router from 'vue-rouer'
import routes from './routes'

Vue.use(Router)

export default new Router({
     mode: 'history',
     routes: routes
})
```
Hết bài