Hello! Chào cả nhà. Một tháng qua mọi người có gì mới không ạ? Mình thì mới tìm hiểu được một cái hay ho nên lên đây chia sẽ với mọi người cho máu.
Một vấn đề mình gặp phải trong quá trình xây dựng một trang single page với laravel và vuejs là trang sẽ load tất cả các sources (gồm các file js, css và images) lúc đầu hoặc khi chúng ta refresh lại trang, sau đó page chỉ gửi request lên sever và nhận lại data dạng json do đó sẽ nhanh hơn các trang web bình thường khác. Nhưng lại có một vấn đề xảy ra như sau: Vì sẽ load tất cả các sources lúc đầu nên thời gian tải trang lúc đầu khá lâu so với trang web thông thường, ví dụ khi ta xây dựng một trang single page nho nhỏ với laravel và vuejs thì Laravel mix sẽ build cho ra một file gọi là app.js thường có dung lượng trên 1Mb. Còn khi xây dựng trang single page lớn hơn thì load lần đầu tiên hơi bị lâu luôn.
May mắn là webpack cung cấp cho ta một chức năng khi complie sources thì sẽ tách ra từng phần, khi nào cần tời thì mới load file đó về và chạy => file app.js của chúng ta ở trên sẽ giảm đi dung lượng đáng kể do đó sẽ giãm được thời gian lần đầu load page.
# Chuẩn bị và cài đặt các phần cần thiết.
Đầu tiền bạn phải chuẩn bị một project laravel kết hợp với vuejs (Ở bài viết này mình chỉ tập trung vào cấu trúc thư mục js trong thư mục resources/asset).
Sau khi tạo xong project laravel bạn chạy lệnh sau để cài các module của node
```
npm install
```
Sau khi lệnh trên chạy xong bạn tiếp tục chạy lệnh sau:
```
npm install vue-router
```
Bây giờ cấu trúc thư mục resources/asset/js như sau:
![](https://images.viblo.asia/55d209cf-38ae-4eab-9701-56a4e6ae07b5.png)
Các file sẽ có nội dung như sau:
```
//app.js
window.Vue = require('vue');

import routers from './Vue/routers'

const app = new Vue({
    el: '#app',
    routers,
});

```
```
//routers.js
import VueRouter from 'vue-router'
import Home from './Components/Home'
import ListPost from './Components/ListPost'

const routers = new VueRouter({
    [
        {
            path: '/',
            component: Home,
            children: [
                { path: '/list-post', component: ListPost }
            ]
        }
    ]
})

export default routers
```

```
//Home.vue
<template lang="html">
    <h1>This is Home Page</h1>
    <router-link to="/list-post">Go to List post</router-link>
    <router-view></router-view>
</template>

<script>

</script>

<style lang="scss" scoped>

</style>
```

```
<template lang="html">
    <div>
        <ul>
            <li>Titile 1</li>
            <li>Titile 2</li>
            <li>Titile 3</li>
            <li>Titile 4</li>
            <li>Titile 5</li>
        </ul>
    </div>
</template>

<script>

</script>

<style lang="scss" scoped>

</style>
```
# Config webpack
Chúng ta cài thêm package babel-plugin-syntax-dynamic-import để phân tách code thành các file nhỏ hơn bằng lệnh sau:
```
npm install babel-plugin-syntax-dynamic-import --save-dev
```
Sau khi cài đặt xong package babel-plugin-syntax-dynamic-import ta tạo một file có tên .babelrc tại thư mục gốc của project với nội dung như sau:
```
{
    "presets": [
        "babel-preset-env"
    ],
    "plugins": [
        "babel-plugin-syntax-dynamic-import"
    ]
}
```
Tiếp tục fix property 'output' trong fix webpack.mix.js thành:
```
output: {
    publicPath: "/",
    chunkFilename: "js/[name].js"
}
```

# Fix lại nội dung file router.js
```
const router = [
  {
    path: '/', component: () => import('./Components/Home'),
    children: [
        { path: 'list-post', component: () => import('./Components/ListPost')},
    ]
]
```
# Xem kết quả
Bây giờ ta chạy lệnh sau để complie code js ta code ở trên:
```
npm run watch
```
Mở trình duyệt lên và vào link http://localhost:8000/, sau đó mở tap networks trong debug tool lên  bấm vào link 'Go to List post' chúng ta sẽ thấy có load thêm một file js.
File đó chính là ListPost.vue đã được complie riêng, khi cần mới load về client.
Hi vọng chia sẽ của mình giúp bạn giải quyết được vấn đề mà mình nêu ở trên.