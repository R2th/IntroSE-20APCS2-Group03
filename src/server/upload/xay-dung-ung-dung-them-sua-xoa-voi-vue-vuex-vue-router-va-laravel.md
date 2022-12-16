![](https://images.viblo.asia/43bbaed0-e366-45a9-b3af-60ac27609759.jpg)

# Giới thiệu
Ai đã từng theo dõi các bài viết cũng mình có lẽ đã từng đọc qua bài viết [Laravel 5.5 và React JS](https://viblo.asia/p/laravel-55-va-react-js-phan-1-cai-dat-va-hien-thi-vi-du-bJzKmkNBl9N), hôm nay mình sẽ viết về một framework khác cũng thường được sử dụng với Laravel, đó là `VueJs`. Trước khi đọc bài viết này bạn cần có kiến thức cơ bản về `Laravel` và `VueJS` hoặc có thể tìm hiểu qua tại đây: [Laravel - Frontend](https://laravel.com/docs/5.7/frontend#writing-javascript), [VueJS - Get Started](https://vuejs.org/v2/guide/).

# Chuẩn bị

Tạo seeder cho bảng `users`:

```bash
php artisan make:seeder UsersTableSeeder
```

Thêm đoạn code này vào `run()` function trong file `database/seeds/UsersTableSeeder`:

```bash 
factory(App\User::class, 50)->create();
```

Chạy `migrate` command
```bash
php artisan migrate
```

Chạy `seed` command chỉ định file seeder chúng ta vừa tạo:
```bash
php artisan db:seed --class=UsersTableSeeder
```

Cài đặt các js packages. Để chạy được command `npm` bạn cần cài đặt [Npm và Nodejs](https://nodejs.org/en/)
```bash
npm install
```

Cài đặt package `vue-router` để routing. Chạy command sau:
```bash
npm install --save vue-router
```

Cài đặt package `vuex`. [Vuex](https://vuex.vuejs.org/) là một thư viện quản lý state cho ứng dụng `Vuejs`. Nó hoạt động như một centralized store cho tất cả các thành phần trong một ứng dụng, với các quy tắc đảm bảo rằng state chỉ có thể được thay đổi khi có một action cụ thể đoán trước được. Nếu bạn đã từng tìm hiểu về `ReactJs` thì nó cũng giống như `flux` hay `redux` bên `ReactJs` vậy.

```bash
npm install --save vuex
```

Để recomplile tự động mỗi khi chúng ta thay đổi script ở thư mục assets chạy command sau:
```
npm run watch
```

# Restful API đơn giản sử dụng Laravel
## Restful API
Thêm file  `app\Http\Controllers\UserController.php` với nội dung:
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        return response()
            ->json($users);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        User::create($request->all());
        return response()
            ->json(['message' => 'Success: You have added an user']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::find($id);
        if (! $user) {
            return response()
            ->json(['error' => 'The user is not exists']);
        }
        return response()
            ->json($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (! $user) {
            return response()
            ->json(['error' => 'Error: User not found']);
        }
        $user->update($request->all());
        return response()
            ->json(['message' => 'Success: You have updated the user']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        if (! $user) {
            return response()
            ->json(['error' => 'Error: User not found']);
        }
        $user->delete();
        return response()
            ->json(['message' => 'Success: You have deleted the user']);
    }
}
```

Đoạn code trên implement các function với mục đích như sau:
 - index: Lấy tất cả các users để hiển thị ngoại list
 - edit: Lấy user info ra màn edit
 - update: Cập nhật thông tin user
 - destroy: Xoá user

## Routes
Chúng ta sửa file `routes/web.php` với nội dung  như sau:
```php
<?php
Route::group(['prefix' => 'api'], function () {
    Route::resource('users', 'UserController');    
});
Route::view('/{any}', 'welcome')
    ->where('any', '.*');
```
Điều chúng ta cần chú ý nhất ở đây là đoạn route này cần đặt cuối file để bắt tất cả những uri khác các các request trên vào view chứa reactjs.
```php
Route::view('/{any}', 'welcome')
    ->where('any', '.*');
```
Đoạn routes này thì chỉ đơn giản là nhóm các api vào 1 group có prefix là `api` mà thôi:
```php
Route::group(['prefix' => 'api'], function () {
    Route::resource('users', 'UserController');    
});
```

# Sử dụng Vuejs làm frontend
## Chỉnh sửa file view

Thay đổi file `resources/views/welcome.blade.php` với nội dung:

```html
<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Laravel 5.5 - ReactJS Example</title>
        <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
        <script type="text/javascript">
            window.Laravel = {!! json_encode([
                'baseUrl' => url('/'),
                'csrfToken' => csrf_token(),
            ]) !!};
        </script>
    </head>
    <body>
        <div id="app"></div>
        <script type="text/javascript" src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
```

File view trên có thêm biến javascript `window.Laravel` sẽ chứa những giá trị động lấy từ Laravel sử dụng trong javascript. Chúng ta sẽ fill nội dung Vuejs vào thẻ `div` có id là `app`. 

## Tạo sẵn các file component và sửa file `app.js`

Đây là cấu trúc thư mục phần Vuejs sau khi hoàn thành:

![](https://images.viblo.asia/cf5f1a15-cd8b-4042-99fd-20761c992c5c.PNG)

Đầu tiên tạo sẵn các file `App.vue`, `UserList.vue`, `UserRow.vue`, `CreateUser.vue`, `EditUser.vue` trong `resources\js\components`.

File `resources\js\api.js` chứa URI của các APIs, sau này nếu muốn sửa chỉ cần sửa một nơi:
```js
const RESOURCE_USER = 'api/users';

export {
    RESOURCE_USER
};
```

File `resources\js\store\usersStore.js` với nội dung:
```js
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import {RESOURCE_USER} from '../api';

Vue.use(Vuex);

const usersStore = new Vuex.Store({
    state: {
        users: [],
        user: {},
    },
    mutations: {
        FETCH(state, users) {
            state.users = users;
        },
        FETCH_ONE(state, user) {
            state.user = user;
        },
    },
    actions: {
        fetch({ commit }) {
            return axios.get(RESOURCE_USER)
                .then(response => commit('FETCH', response.data))
                .catch();
        },
        fetchOne({ commit }, id) {
            axios.get(`${RESOURCE_USER}/${id}/edit`)
                .then(response => commit('FETCH_ONE', response.data))
                .catch();
        },
        deleteUser({}, id) {
            axios.delete(`${RESOURCE_USER}/${id}`)
                .then(() => this.dispatch('fetch'))
                .catch();
        },
        editUser({}, user) {
            axios.put(`${RESOURCE_USER}/${user.id}`, {
                name: user.name,
                email: user.email,
                password: user.password,
            })
                .then(() => this.dispatch('fetch'));
        },
        addUser({}, user) {
            axios.post(`${RESOURCE_USER}`, {
                name: user.name,
                email: user.email,
                password: user.password,
            });
        }
    }
});

export default usersStore;
```

Trung tâm của các ứng dụng `Vuex` chính là `store`, chứa toàn bộ các state của ứng dụng. Khi các components nhận được state từ nó, mỗi khi nó thay đổi sẽ được cập nhật một cách hiệu quả, và nó không thể bị thay đổi trực tiếp. `Store` bao gồm:

* State: Chứa tất cả trạng thái của ứng dụng.
* Mutations: Bạn chỉ có thể thay đổi store khi commit một mutation. Nó gần giống như event.
* Actions: Giống với mutations, nhưng khác là:
- Thay vì mutate trực tiếp `state`, nó commit qua các `mutations` .
- Nó có thể chứa các các hành động bất đồng bộ.
Ngoài ra còn có `Getters`, và `Modules`, các bạn có thể thao khảo ở trang tài liệu của Vuex: [https://vuex.vuejs.org/guide/](https://vuex.vuejs.org/guide/)

Sửa nội dung file `resources\js\app.js`:

```js
// resources\js\app.js

require('./bootstrap');

window.Vue = require('vue');

import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './components/App.vue';
import routes from './routes';
import usersStore from './store/usersStore';

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    // mode: 'history',
});
window.events = new Vue();


new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store: usersStore,
});
```

Đầu tiên để có thể sử dụng được các thuộc tính của VueRouter chúng ta cần use nó
```js
Vue.use(VueRouter);
```

Sau đó khởi tạo router
```js 
const router = new VueRouter({
    routes,
    // mode: 'history',
});
```

Khởi tạo vuejs với router, và store, chúng ta sẽ sử dụng component `App` làm layout:
```js
new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store: usersStore,
});
```

File `resources/routes.js` định nghĩa các routes trong ứng dụng Vuejs:
```js
import CreateUser from './components/CreateUser'
import EditUser from './components/EditUser'
import UserList from './components/UserList'

const routes = [
    {
        path: '/',
        component: UserList,
        name: 'users.index',
    },
    {
        path: '/users/create',
        component: CreateUser,
        name: 'users.create',
    },
    {
        path: '/users/edit/:id',
        component: EditUser,
        name: 'users.edit',
    },
];
export default routes;
```

Path là đường dẫn hiển thị trên thanh địa chỉ, component là component sẽ được render vào layout, và name dùng để sử dụng để định danh route, giúp cho chúng ta có thể sử dụng một cách thuận tiện hơn. Ngoài ra còn có rất nhiều thuộc tính khác, các bạn có thể tham khảo ở link tài liệu [https://router.vuejs.org/guide/essentials/named-routes.html](https://router.vuejs.org/guide/essentials/named-routes.html)


## Tạo layout

Tạo file `resources/js/components/App.vue` với nội dung:

```js
// resources/js/components/App.vue

<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Laravel 5.5 - ReactJS Example</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li :class="['nav-item', {active: $route.name === 'users.index'}]">
                        <router-link class="nav-link" :to="{name: 'users.index'}">Users</router-link>
                    </li>
                    <li :class="['nav-item', {active: $route.name === 'users.create'}]">
                        <router-link class="nav-link" :to="{name: 'users.create'}">Add User</router-link>
                    </li>
                </ul>

            </div>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
    }
</script>

```

Ở đoạn code trên có component mới là `<router-link>` có sẵn trong `VueRouter`, tác dụng của nó là tạo ra thẻ `<a/>`, nhưng khác là nó có thể sử dụng được object `$route`, và nhiều hỗ trợ khác nữa bạn có thể tìm hiểu rõ hơn tại đây: [https://router.vuejs.org/api/#router-link-props](https://router.vuejs.org/api/#router-link-props) .

Ngoài ra còn có component khác là `<router-view>` chính là nơi các component `UserList`, `CreateUser`, `EditUser` được định nghĩa ở file `routes.js` được render.

## Tạo component hiển thị danh sách users

### User List

Tạo file `resources/js/components/UserList.vue` với nội dung:

```js
// resources/js/components/UserList.vue

<template>
    <div>
        <h1>Users</h1>
        <div class="clearfix">
            <router-link class="btn btn-success pull-righ" :to="{name: 'users.create'}">Add User</router-link>
        </div><br />
        <table class='table table-hover'>
            <thead>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Actions</td>
            </tr>
            </thead>
            <tbody>
            <user-row v-for="user in users" :user="user" :key="user.id"></user-row>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import UserRow from "./UserRow";
    export default {
        components: {UserRow},
        computed: {
            ...mapState(['users']),
        },
        created: function () {
            this.$store.dispatch('fetch');
        }
    }
</script>

```

Ở đoạn code trên, trong method `created()` chúng ta dispatch action `fetch` để lấy ra danh sách users. 

Trong `computed`,  map state `users` trong store vào component `UserList`. Tài liệu về helper `mapState` của `Vuex`: [https://vuex.vuejs.org/guide/state.html#the-mapstate-helper](https://vuex.vuejs.org/guide/state.html#the-mapstate-helper).

### User Row

Nội dung file `resources/js/components/UserRow.vue`:

```js
// resources/js/components/UserRow.vue

<template>
    <tr>
        <td>
            {{ user.id }}
        </td>
        <td>
            {{ user.name }}
        </td>
        <td>
            {{ user.email }}
        </td>
        <td>
            <router-link class="btn btn-primary" :to="`/users/edit/${user.id}`">Edit</router-link>
        </td>
        <td>
            <button class="btn btn-danger" @click="deleteUser">Delete</button>
        </td>
    </tr>
</template>

<script>
    export default {
        props: {
            user: Object,
            handleDelete: Function,
        },
        methods: {
            deleteUser: function () {
                this.$store.dispatch('deleteUser', this.user.id);
            },
        }
    }
</script><template>
    <tr>
        <td>
            {{ user.id }}
        </td>
        <td>
            {{ user.name }}
        </td>
        <td>
            {{ user.email }}
        </td>
        <td>
            <router-link class="btn btn-primary" :to="{name: 'users.edit', params: {id: user.id}}">Edit</router-link>
            <button class="btn btn-danger" @click="deleteUser">Delete</button>
        </td>
    </tr>
</template>

<script>
    export default {
        props: {
            user: Object,
            handleDelete: Function,
        },
        methods: {
            deleteUser: function () {
                this.$store.dispatch('deleteUser', this.user.id);
            },
        }
    }
</script>
```

Component này chỉ đảm nhận việc hiển thị bản ghi ra và có một method `deleteUser`, sẽ dispatch action `deleteUser` dùng để xóa bản ghi đó.

Đây là màn hình user list:

![](https://images.viblo.asia/7ecfea8d-e844-4593-b921-8123d6c28e05.PNG)

## Create user

Nội dung file `resources/js/components/CreateUser.vue`:

```js
// resources/js/components/CreateUser.vue

<template>
    <div>
        <h1>Create An User</h1>
        <form @submit.prevent="add">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Name"
                       v-model="name" required />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" placeholder="Email"
                       v-model="email" required />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Password"
                       v-model="password" required />
            </div>
            <button type="submit" class="btn btn-primary">Add User</button>
        </form>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                name: null,
                email: null,
                password: null,
            }
        },
        methods: {
            add: function () {
                this.$store.dispatch('addUser', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                });
                this.$router.push({name: 'users.index'});
            }
        }
    }
</script>

```

Component `CreateUser` bao gồm method `add` sẽ dispatch action `addUser`, sau đó push route `users.index` để quay về màn hình user list.

Màn hình create user:

![](https://images.viblo.asia/458aa936-dde7-44d6-8e03-c805be8b5906.PNG)

## Edit user

Nội dung file `resources/js/components/EditUser.vue`:

```js
// resources/js/components/EditUser.vue

<template>
    <div>
        <h1>Edit The User</h1>
        <form @submit.prevent="edit">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Name"
                       v-model="user.name" required />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" placeholder="Email"
                       v-model="user.email" required />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Password"
                       v-model="user.password" required />
            </div>
            <button type="submit" class="btn btn-primary">Save User</button>
        </form>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        methods: {
            edit: function () {
                this.$store.dispatch('editUser', this.user);
                this.$router.push({name: 'users.index'});
            }
        },
        beforeCreate: function () {
            this.$store.dispatch('fetchOne', this.$route.params.id);
        },
        computed: {
            ...mapState(['user']),
        }
    }
</script>
```

Component `EditUser` chỉ khác `CreateUser` ở method `beforeCreate` dispatch đến action `fetchOne` để lấy thông tin user và disptach tới action `editUser` để lưu thông tin user.

Màn hình edit user đã được fill data:

![](https://images.viblo.asia/7feb01bf-b011-4702-8799-080d1ff39b08.PNG)

# Kết
Trên đây là các bước cơ bản để làm chức năng thêm sửa xoá đơn giản với Laravel và Vuejs, bạn có thể tham khảo source code tại đây: [https://github.com/thinhhung/LaravelVueJsTutorial](https://github.com/thinhhung/LaravelVueJsTutorial)