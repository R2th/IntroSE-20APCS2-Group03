Chào mừng mọi người quay trở lại với blog của mình. Đây là bài đầu tiên sau một thời gian tạm dừng viết blog thì hôm nay lại ngứa chân tay quay trở lại chia sẻ với mọi người những gì mình học được.

Ở bài này chúng ta sẽ cùng tìm hiểu Lazy loading routes khi dùng Vue-router nhé. Nghe thấy từ lazy chắc chúng ta cũng có thể nhớ lại được đây là 1 kĩ thuật áp dụng rất nhiều trong phát triển ứng dụng web để tiết kiệm tài nguyên, xem đến đâu tải nội dung đến đó. Chúng ta cùng tìm hiểu xem lazy load route có gì hay nhé. ;)

# Story
Trong quá trình phát triển ứng dụng, khi mà web của mình lớn lên, nhiều trang hơn, mỗi trang lại có nhiều xử lý hơn thì việc làm thế nào để tốc độ tải trang tối ưu nhất là điều mình quan tâm hơn cả. Mình cũng có đọc được về lazy load route từ lâu rồi nhưng nó chỉ là 1 section bé bé ở trang chủ vue-router, và cũng không quan tâm lắm, vì nghĩ cùng lắm load nhanh hơn đc 1-2 giây, đến giờ thì mới thấy dù chỉ là 1-2 giây đó cũng ảnh hưởng rất nhiều đến trải nghiệm của người dùng (chả thế mà thegioididong tốn cả đống tiền để làm trang web tải với tốc độ chỉ cỡ vài ba trăm ms :100:). Chúng ta cùng bắt tay vào tìm hiểu nhé :).

VueJS hỗ trợ chúng ta cách load component không đồng bộ, các bạn có thể xem ở [đây](https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components), component chỉ cần load khi nào nó được dùng đến. Hay nói cách khác, 1 component có thể được khai báo bằng cách trả về một `Promise` như sau:

```js
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // Pass the component definition to the resolve callback
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})

//hoặc

const Foo = () => Promise.resolve({ /* component definition */ })
```
Bình thường khi muốn import 1 component ta hay làm như sau:
```js
import('/Foo.vue')
```
Ở hàm `import` bên trên cũng trả về cho chúng ta là 1 Promise. Từ 2 cách trên chúng ta có thể khai báo 1 `async component` (componen được load không đồng bộ) như sau:
```js
const Foo = () => import('./Foo.vue')
```

viết đầy đủ sẽ như sau:
```js
const Foo = () => import('./Foo.vue')
const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo }
  ]
})
```

Cũng không khác bình thường lắm nhỉ ;). Khi ta khai báo như trên, webpack sẽ tự chia ra cho mỗi route mà sử dụng 1 hoặc 1 số `async component` một file `.js` riêng biệt và sẽ chỉ cần load các component đó khi chúng ta đi vào route. Khác với cách bình thường ta hay dùng là tất cả trong 1 file `app.js` :) (cũng tiết kiệm đáng kể, và giảm tải load cho client)

# Code snippets
Ở ví dụ này mình sẽ dùng Vue trong project Laravel nhé, các bạn nào dùng Vue-cli thì cũng làm tương tự luôn nhé. 

Các bạn tạo mới 1 project, chạy `npm install`, sau đó chạy `npm install --save vue-router`

Đầu tiên ta tạo component `App.vue` ở thực mục `resources/js/components/ như sau:
```html
<template>
    <div>
        <div>
            <ul>
                <li>
                    <router-link to="/">Go to Foo</router-link>
                </li>
                <li>
                    <router-link to="/bar">Go to Bar</router-link>
                </li>
                <li>
                    <router-link to="/baz">Go to Baz</router-link>
                </li>
            </ul>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>

</style>
```
Ở trên các bạn có thể thấy ta có 3 router link đi tới  routes. Tiếp theo, vẫn ở thư mục hiện tại ta có 3 components tương ứng với 3 routes đó:

`Foo.vue`
```html
<template>
    <div>
        This is Foo
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>

```
`Bar.vue`
```html
<template>
    <div>
        Welcome to the Bar
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
```
`Baz.vue`
```html
<template>
    <div>
        Hello, My name is Baz
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
```
Bước quan trọng tiếp theo là khai báo `vue-router` với 3 component trên được khai báo là `async component` như sau:
`router.js` (cùng thư mục với file `app.js`)
```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
        path: '/',
        name: '',
        component: () => import('./components/Foo')
    },
    {
        path: '/bar',
        name: '',
        component: () => import('./components/Bar')
    },
    {
        path: '/baz',
        name: '',
        component: () => import('./components/Baz')
    }
  ]
})
```
Các bạn có thể thấy các viết cũng không khác bình thường là mấy đúng không :)

Khai báo router và component "tổng" App.vue ở file app.js như sau:
`app.js`
```js
//Your code
import router from './router.js'

Vue.use(router)

Vue.component('app', require('./components/App.vue').default);
const app = new Vue({
    el: '#app',
    router
});
```
Cuối cùng là sửa lại file `welcome.blade.php` nhé:
```html
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Laravel</title>
        <style>
            html, body {
                height: 100vh;
            }
            #app {
                display: flex;
                justify-content: center;
                height: 100%;
            }
        </style>
    </head>
    <body>
        <div id="app">
            <app></app>
        </div>
        <script src="/js/app.js"></script>
    </body>
</html>
```
Ở đây nếu các bạn chạy `npm run dev` hoặc `npm run watch` sẽ bị báo lỗi `Support for the experimental syntax 'dynamicImpo
rt' isn't currently enabled` bởi vì Babel không thể parse được cú pháp chúng ta viết ở trong file `router.js`. Ta chỉ cần cài thêm gói sau:
```bash
npm install --save @babel/plugin-syntax-dynamic-import
```

sau đó tại thư mục gốc, tạo file `.babelrc` với nội dung như sau: 
```json
{
    "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```
Cuối cùng cấu trúc thư mục của ta trông sẽ như sau:
![Folder_structure](https://images.viblo.asia/acb6f05c-6133-4e29-bf25-3da63c0b65fe.png)
Bây giờ các bạn chạy:
```bash
npm run watch
```
Sau khi compile thành công ta mở folder `public` sẽ thấy xuất hiện các file `0.js`, `1.js`....như sau (các số 0,1,2 là việc webpack quyết định chứ không theo thứ tự các route ta định nghĩa từ trên xuống dưới đâu nhé ae :) ):

![router_file](https://images.viblo.asia/11318c5a-08b6-4b14-a019-80f93f0060e8.png)

Đó chính là các file tương ứng với component của 1 route mà ta định nghĩa ở file `router.js`. Các bạn có thể mở lên  và thấy nội dung của từng component rất rõ ở trong đó nhé. :).

Ổn rồi đó, khởi chạy project `php artisan server` (với Laravel) hoặc `npm start` (với vue-cli)
và mở trình duyệt, ta sẽ thấy như sau:

![](https://images.viblo.asia/49bda118-aa02-4b1d-b7e5-d6ccbbbddc64.png)

sau đó mở Chrome devtool để thấy hiện như sau nhé:

![](https://images.viblo.asia/d71490ef-cbc8-486c-a132-42f199c4373f.png)

Các bạn có thể thấy khởi đầu khi mở app lên ta truy cập vào route `/` nên ta chỉ cần load lên file `2.js` tương ứng với nội dung của `Foo` sau đó ta truy cập vào `Bar` thì file `0.js` được load và tương ứng với `Baz`. 

Ta thấy các file có tên là `0.js, 1.js` trông không được đẹp lắm, và ta cũng muốn đưa nó vào trong thư mục `js` (vì nó là file js mà :-D). Khi đó ta sửa lại file `router.js` một chút như sau:
`router.js`
```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
        path: '/',
        name: '',
        component: () => import(/* webpackChunkName: "js/routes/foo" */ './components/Foo')
    },
    {
        path: '/bar',
        name: '',
        component: () => import(/* webpackChunkName: "js/routes/bar" */ './components/Bar')
    },
    {
        path: '/baz',
        name: '',
        component: () => import(/* webpackChunkName: "js/routes/baz" */ './components/Baz')
    }
  ]
})
```
Lưu lại file và chạy lại npm (nếu bạn vẫn chạy npm run watch thì không cần :-D ). Mở folder `public/js` ta sẽ thấy như sau:

![Folder_structure](https://images.viblo.asia/c0cfb73b-a56d-457e-b711-454929c4001e.png)

Vậy là ta đã có các file route được format tên tuổi rõ ràng và đặt ở trong thư mục js :-D
# Before going to Production
`* Đối với những ai dùng Laravel kết hợp với Vue (như mình)` 

Chúng ta đều biết khi chạy app ở chế độ `production` ta sử dụng `Laravel-mix` để compile assets (css, js,...), giúp cho client load lại assets để có những cập nhật mới nhất, mỗi khi ta deploy app, như sau:
`webpack.config.js`
```js
const mix = require('laravel-mix');

if (mix.inProduction()) {
    mix.version()
}

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');
```
Sau đó ở file `welcome.blade.php` ta sửa lại 1 chút như sau:
```html
...
<body>
        <div id="app">
            <app></app>
        </div>
        <script src="{{ mix('js/app.js') }}"></script>
</body>
...
```
Tiếp theo ta chạy `npm run prod`, sau đó thử mở app trên trình duyệt, Inspect (F12) ta sẽ thấy: 

![Laravel_mix](https://images.viblo.asia/3bc9c142-5c8b-4b1a-8ce0-cbed94c47d10.png)

Ta thấy rằng Laravel mix đã thêm `id` vào cuối file `app.js`, id này sẽ khác nhau mỗi lần ta chạy `prod (production)`, trình duyệt sẽ thấy rằng file này có sự thay đổi nên sẽ tải mới lại, nếu ta không dùng Laravel Mix mà chỉ import như bình thường:
```html
<script src="js/app.js"></script>
```
Thì trình duyệt sẽ tự cache lại file này vì thấy rằng đường dẫn file không hề thay đổi, dẫn tới việc ta sửa code ở Vue rất nhiều nhưng khi deploy ra chạy không thấy thay đổi gì.

Ở bài này ta dùng Lazy Loading Routes, mình đã nói ở trên là webpack sẽ sinh ra cho ta các file js ứng với từng route:

![Folder_structure](https://images.viblo.asia/c0cfb73b-a56d-457e-b711-454929c4001e.png)

Khi chạy `production`, check thử trong file `public/mixmix-manifest.json`, đã thấy có trường `id` ở cuối tất cả các file. Nhưng khi chạy trên trình duyệt ta sẽ thấy rằng chỉ có duy nhất file `app.js` được load với trường `id`, còn lại các file routes thì đều dùng tên gốc như sau:

![Laravel_mix](https://images.viblo.asia/1c4c72c9-b5f6-4fb9-9d43-648578fa762d.png)

Điều này dẫn tới khi chạy production, ở client sẽ chỉ tải về file `app.js` mới vì thấy rằng file này có thay đổi về đường dẫn, còn với các file routes thì không tải lại vì thấy đường dẫn vẫn thế, do đó các file đó sẽ được cache cho tới khi ta xoá cache trình duyệt thì thôi, với dev thì biết cách xoá cache chứ người dùng thường thì mò sao :-D. Do đó ta cần phải làm gì đó để mỗi lần chạy `production` sẽ sinh ra 1 cái gì đó mới cho từng file để nói với trình duyệt rằng: "file này này là file mới chưa có ở trình duyệt, mày tải về file này đi :)". Ta chỉ cần làm 1 thao tác rất đơn giản như sau, sửa lại file `webpack.config.js`:
```js
const mix = require('laravel-mix');

if (mix.inProduction()) {
    mix.version().webpackConfig({
        output: {
            chunkFilename: '[name].[hash].js'
        }
    })
}

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');
```
Ở đây khi chạy `production` webpack sẽ duyệt qua các file dạng `chunk` (là các file route) sau đó thêm trực tiếp 1 đoạn string là 1 mã hash vào sau tên các file đó (chú ý: các file `app.js` hay `app.css` không bị ảnh hưởng, vẫn sẽ được load lên với `?id...` để định danh :)). Chạy lại `npm run prod`, ta sẽ thấy như sau:

![Laravel_mix](https://images.viblo.asia/fcfc19ac-56f3-438b-b4fe-6c4540306bfd.png)

Từ giờ thì mỗi khi chạy prod sẽ sinh ra các file có mã hash duy nhất ứng với mỗi lần chạy `npm run prod` do đó trình duyệt sẽ biết đó là file mới và tải về, ta không lo bị cache nữa :). Các bạn mở trình duyệt và `tự sướng` nhé :-D:

![Laravel_mix](https://images.viblo.asia/56a5c14d-a4b4-4f25-adfb-51d245dc8034.png)

`* Còn đối với các bạn dùng vue-cli`

Không phải lo vì đã được config sẵn nhé ;) , mỗi lần chạy `npm run build` ta sẽ nhận được ngay các file với các tên đi kèm mã hash riêng biệt nhé :
![Vue_cli_build](https://images.viblo.asia/e1921fb4-3738-4d8e-92bd-f6a35eb03cb4.png)
# The end
Sau nhiều project cả làm với team hoặc freelance cá nhân, thì mình thấy khả năng project scale sẽ rất nhanh, project sẽ có nhiều routes, và mỗi routes thì các luồng xử lý loằng ngoằng. Và nếu để chung tất cả trong `app.js` thì client sẽ phải tải về toàn bộ file app.js ngay từ lần truy cập đầu tiên mà thực chất tại mỗi thời điểm họ chỉ ở 1 route. 

Bằng các `Lazy loading routes` chúng ta sẽ tiết kiệm được kha khá tài nguyên cho user, tăng tốc độ tải trang, cải thiện đáng kể UX. Hi vọng rằng qua bài này các bạn biết thêm được một kĩ thuật khi làm việc với Vue. Hẹn gặp lại các bạn ở các bài sau. Nếu có gì thắc mắc cứ comment bên dưới để mình được biết nhé ;)