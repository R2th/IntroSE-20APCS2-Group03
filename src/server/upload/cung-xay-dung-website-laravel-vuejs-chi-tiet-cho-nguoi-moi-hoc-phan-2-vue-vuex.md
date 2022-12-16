### I. Lời mở đầu
Chào các bạn, như ở phần trước mình có trình bày đôi chút về các công nghệ mà người mới học laravel và vuejs có thể sử dụng. Với [Cùng xây dựng website Laravel + Vuejs chi tiết cho người mới học phần 1](https://viblo.asia/p/cung-xay-dung-website-laravel-vuejs-chi-tiet-cho-nguoi-moi-hoc-phan-1-Az45bWnLKxY) các bạn đã biết cách xây dựng và cung cấp APIs được đẹp hơn, và định hình mình cần áp dụng công nghệ front-end nào cũng như kiến trúc nào để xây dựng website cho riêng mình.
![](https://images.viblo.asia/5a639489-98d4-4234-b5cc-07f3086213aa.png)
Ở phần này mình sẽ hướng dẫn các bạn xây dựng 1 kiến trúc vue-vuex hợp lý để áp dụng vào project của mình.
### II. Xây dựng cấu trúc thư mục
**Bài toán:** Xây dựng trang quản  admin bằng vuejs và vuex.
Các folder chính:
```
+ |- components
+ |- libraries
+ |- router
+ |- store
+ |- views
+ |- Admin.vue
+ |- index.js
```
- **components:** Đúng như cái tên của nó, folder này chứa toàn bộ các components cần thiết của project. Một số các component chính như header, sidebar, footer, layouts...
- **libraries:** Tại đây chứa các file config của vuejs, fonts, cũng như các variable scss của hệ thống và đây cũng là nơi cấu hình các package mà chúng ta sử dụng như element ui hay vue material gì gì đó, ...
- **router:** router chính của cả project, ở đây mình sẽ chia nhỏ các router cho từng chức năng quản lý rồi sẽ import vào đây.
- **store:** Tương tự router mình cũng chia nhỏ các store cho từng chức năng, tại store chính chứa state với các data chính có thể sử dụng lại ở nhiều components khác nhau.
- **Views hay (pages):** là nơi chứa các màn page cho các chức năng.
```
+ |- auth
+ |- post
+ |- category
    + api
    + components
    + router
    + store
+ ...
```
Và trong từ **views**(hay **pages**) mình lại chia nhỏ cấu trúc vẫn gồm:

1. **api**: là nơi gọi đến api từ router của laravel.

2. **components:** Chứa các file.vue frontent của các chức năng, màn hình hiển thị, màn hình thêm, sửa,...

3. **router:** Vue router cho các chức năng: hiển thị, thêm, sửa, xóa,...

4. **store:** Chứa state của chức năng cũng là nơi chúng ta áp dụng vuex.

**Admin.vue:** File vue chia rõ khung của website gồm phần import header, sidebar và phần content, phần content này sẽ được thay đổi trong quá trình render khi sử dụng vue-router.

**index.js:** File này quan trọng nhất, nó là nơi khởi tạo vuejs cũng như nơi require hay import các công cụ cần thiết cho vue. Khi code các chức năng xong, ta chỉ việc dùng laravel-mix để mix file này và sử dụng.
```php
let mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    // Config
    .webpackConfig({
        resolve: {
            alias: {
                Admin: path.resolve(__dirname, 'resources/assets/admin'),
            }
        },
    })
    .options({
        processCssUrls: false
    })

    // Admin Page
    .js(
        'resources/assets/admin/index.js',
        'public/mix/js/admin/admin.js'
    )

    .version();

```

Các folder cũng khá đơn giản tuy nhiên nó tối ưu cho chúng ta khá nhiều cho việc tách các chức năng và áp dụng vuex.
Cùng bắt đầu làm các ví dụ để hiểu hơn về cách xây dựng folder cũng như áp dụng vuex nhé.

**Ví dụ:** Xây dựng chức năng CRUD category.
```php
Route::group(['prefix' => 'api','namespace' => 'Api'], function() {
    Route::resource('categories', 'CategoryController');
});
```
Phần xây dựng API các bài có thể tham khảo bài trước, giả sử mình đã có đầy đủ API cho chức năng thêm, sửa, xóa Category. 
Tại folder store ngoài cùng (store chính của hệ thống). Các bạn import store của các chức năng vào đây. Sau này mở rộng tính năng, các bạn chỉ việc tạo folder và import tương tự.
```js
import Vue from 'vue';
import VueX from 'vuex';
Vue.use(VueX);

import category from '../views/category/store';
export default new VueX.Store({
    modules: {
        category,
    },
});
```
Tương tự store chính, thì router chính các bạn khởi tạo và import như sau:
```js
import VueRouter from 'vue-router';
import category from '../views/category/router';

export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/',
            name: 'Admin',
            component: {
                render(c) { 
                    return c('router-view')
                }
            },
            children: [
                { ...category },
            ]
        },
    ],
});
```
Và tại file index.js bắt buộc import store, router và Admin.vue
```js
import Vue from 'vue';

import Admin from './Admin';
import router from './router';
import store from './store';

require('./libraries/plugins');
require('./libraries/config');

Vue.mixin({
    beforeCreate() {
        return this.$route && Helper.changeTitlePage(this.$route.name);
    },
})

new Vue({
    router,
    store,
    template: '<Admin />',
    components: { Admin },
}).$mount('#root');
```
Các file khởi tạo chính đã đc import đầy đủ, bây giờ chúng ta bắt tay vào xây dựng cho chức năng CRUD category.
Xây dựng folder category gồm foder như trên: **Api**, **components**, **router**, **store**.
Tạo file Api\index.js dùng axios để gọi đến API:
```js
export function apiCategoryFetch(params = {}) {
    return axios.get('/categories', { params })
        .then(response => response)
        .catch(xhr => xhr)
}

export function apiCategoryStore(params = {}) {
    return axios.post('/categories', params)
        .then(response => response)
        .catch(xhr => xhr)
}

export function apiCategoryEdit(id) {
    return axios.get(`/categories/${id}/edit`,)
        .then(response => response)
        .catch(xhr => xhr)
}

export function apiCategoryUpdate(id, params = {}) {
    return axios.put(`/categories/${id}`, params)
        .then(response => response)
        .catch(xhr => xhr)
}

export function apiCategoryDelete(id) {
    return axios.delete(`/categories/${id}`)
        .then(response => response)
        .catch(xhr => xhr)
}
```
Tạo file router/index.js khởi tạo các router cho chức năng CRUD:
```js
import Category from 'Admin/views/category/components/Category';
import CategoryAdd from 'Admin/views/category/components/CategoryAdd';
import CategoryEdit from 'Admin/views/category/components/CategoryEdit';

export default {
    path: '/category',
    component: {
        render(c) { 
            return c('router-view')
        }
    },
    children: [
        {
            path: '/',
            component: Category,
            name: 'Category',
        },
        {
            path: 'add',
            component: CategoryAdd,
            name: 'Category Add',
        },
        {
            path: ':id/edit',
            component: CategoryEdit,
            name: 'Category Edit',
        }
    ],
}
```
File store/index.js:
```js
import { apiCategoryFetch } from '../api';
import router from 'Admin/router';

const CATEGORY_FETCH = 'fetch';
const CATEGORY_SET_PAGINATE = 'set_paginate'
const state = {
    categories: [],
    paginate: { currentPage: 1, total: 0 },
}

const mutations = {
    [CATEGORY_FETCH](state, chatworks) {
        return state.chatworks = chatworks
    },
}
    
const actions = {
    async doFetch({ commit }, params) {
        let response = await apiCategoryFetch(params)
        if (response.status === 200) {
            let data = response.data
            commit(CATEGORY_FETCH, data.data)
            
            return commit(CATEGORY_SET_PAGINATE, { currentPage: data.currentPage, total: data.total })
        }
    },
}
    
export default {
    state,
    mutations,
    actions,
    namespaced: true,
}
```
Và ở components muốn get store ra thì các bạn có thể tạo thêm getters rồi sử dụng MapGetter hoặc dùng luôn this.$store.state.categories.
Các chức năng còn lại các bạn có thể mở rộng sau...Dựa vào cấu trúc trên mà chúng ta vừa xây dựng.
### III. Kết luận
Do code thì khá là nhiều nên mình không thể viết ra hết ở đây được, tuy nhiên các bạn có thể áp dụng theo cấu trúc file và thư mục như trên để tự tạo cho mình một kiến trúc phù hợp.