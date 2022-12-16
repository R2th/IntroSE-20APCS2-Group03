Xin chào các bạn, đến tháng lại lên. Hôm nay mình cùng các bạn sẽ thực hiện tìm hiểu về cách dùng và cấu trúc một project sử dụng vuex. Trên các website có khá nhiều bài viết về vuex rồi nên mình sẽ không đi sâu vào chi tiết các khái niệm của vuex nữa. Nếu bạn chưa đọc qua về vuex thì các bạn có thể tham khảo một số bài viết

https://viblo.asia/p/vue-x-va-nhung-thu-co-ban-nhat-bJzKmMGXK9N

https://viblo.asia/p/cung-nhau-hoc-vuex-phan-1-3P0lPkWbZox

Bài viết này mình sẽ kết hợp vuex với một project có thể phát triển thực tế.
# Sử dụng vuex để quản lý state
Ứng dụng Vue được xây dựng trên các component, hoạt động của component được gói gọn trong 3 thành phần `state`, `action` và `view`. 3 thành phần sẽ tác động qua lại lẫn nhau theo một flow khép kín
![](https://images.viblo.asia/01aa21cd-0b7d-4b35-b756-4a854fb7adb9.png)

Khép kín vì `view` sẽ được hiển thị phụ thuộc vào `state`, khi `state` thay đổi thì `view` cũng sẽ thay đổi theo. Nhưng để `state` thay đổi được thì phải thông qua `action`, `action` được kích hoạt trong quá trình người dùng thao tác với `view`.

Nhưng đây là trong một component, việc quản lý state không có gì khó khăn. Vấn đề là trong khi làm dự án sẽ có trường hợp component con cần phải thay đổi `state` của component cha hay việc làm cho `view` ở các component có thể sử dụng chung một `state`. Trường hợp đơn giản là hiển thị loading để ở component cha, thì để các component con sẽ phải thay đổi `state` của component cha, việc này sẽ rất phức tạp nếu các component phân cấp sâu.

Vuex ra đời nhằm mục đích lưu trữ và quản lý tập trung `state`. Các component có thể truy xuất, thay đổi `state` mà không cần quan tâm đến `state` nằm ở component nào, vì giờ đây `state` đã được tập trung và không nằm rải rác trong các component nữa.

# Cơ chế hoạt động 
![](https://images.viblo.asia/7354ede9-5fbf-4cb8-bd9c-bd167dc66f82.png)

Vuex gồm 3 thành phần chính là `state`, `actions` và `mutations`. Ngoài ra còn một thành phần nữa không bắt buộc là `getters` 
Nhìn hình ta có thể thấy `Vue Component` sẽ gọi đến `Actions` thông qua `Dispatch`(bạn để ý các mũi tên), `Action` hoạt động bất đồng bộ nên sẽ được sử dụng để thực hiện các tác vụ như gọi api để lấy dữ liệu từ server..., sau khi lấy được dữ liệu  `Actions` sẽ gọi đến `Mutations` thông qua `commit`, và tại đây mới thực sự thực hiện việc thay đổi state, sau khi state được thay đổi bởi `Mutations` thì view sẽ được render lại.
# Kết hợp vuex trong project vue
Để có thể sử dụng được vuex thì tất nhiên project laravel của bạn đã phải kết hợp với vue trước rồi. Bạn có thể tham khảo bài viết trước đó của mình để hiểu hơn nhé
Link bài viết:https://viblo.asia/p/ket-hop-vue-admin-template-voi-laravel-djeZ18MoKWz
Linhk github: https://github.com/ththth0303/laravel-vue-coreui/tree/develop
Mình sẽ sử dụng projec vuejs ở link trên để kết hợp thêm vuex.
Project sẽ có cấu trúc thư mục như sau

![](https://images.viblo.asia/b613b2b8-893a-47bc-8587-5dda329a84c8.png)


Giả xử ta làm chức năng hiển thị danh sách user
Khi sử dụng vuex ta sẽ thêm thư mục `store`, ngoài ra thêm thư mục `api` để làm nhiệm vụ fetch data từ server. Bên trong sẽ có file `index.js` là store state và mọi thứ liên quan đến vuex, với nội dung
```
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import user from "./modules/user";

export default new Vuex.Store({
    modules:{
        user,
    },
})
```
trong thư mục `modules` sẽ chứa các module của các đối tượng, ta đang làm với đối tượng user nên sẽ có mudule user, file `user.js`
```
import {
    callApiFetch,
    callApiAdd,
    callApiEdit,
    callApiDelete,
    callApiShow
} from '../../api/user'

const FETCH = 'fetch_users'

const state = {
    users: []
}

const actions = {
    async getUsers({ commit }) {
        let response = await callApiFetch()
            
        return commit(FETCH, { users: response.data })
    }
}

const mutations = {
    [FETCH](state, { users }) {
        
        return state.users = users;
    }
}

const storeUser = {
    state,
    actions,
    mutations
}
export default storeUser
```
file sẽ khai báo các thành phần của một module vuex, module chỉ có 1 action là `getUsers` để fetch user từ server thông qua api, sau đó sẽ commit mutation để thực hiện đưa dữ liệu fetch được vào `state`

file `api/user.js` sẽ thực hiện gửi request đến server
```
export function callApiFetch(params = {}) {
    return axios.get('/user', params)
        .then(response => response)
        .catch(error => error)
}

```

tiếp tục ta sẽ tạo view cho việc hiển thị danh sách user, tạo file `views/user/index.vue`
```
<template>
    <div>
        <b-card :header="'User List'">
            <b-table :items="items" :fields="fields">
            </b-table>
        </b-card>
    </div>
    
</template>
<script>
    export default {
        name: 'userList',

        beforeCreate() {
            this.$store.dispatch('getUsers');
        },

        data() {
            return {
                fields: [
                    {key: 'id', sortable: true},
                    {key: 'name'},
                    {key: 'email'},
                ],
            }
        },

        computed: {
            items() {
                return this.$store.state.user.users
            },
        },
    }
</script>
```
Ngay sau khi component được khởi tạo, ta sẽ tiến hành get user bằng cách gọi đến action `getUsers` thông qua `dispatch` . Dữ liệu sau đó sẽ được lấy thông qua `computed`

Tạo route cho view user, file `route/index.js`
```
import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '../containers/Full'

// Views
import Dashboard from '../views/Dashboard'
import User from '../views/user/index'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          name: 'User',
          path: '/user',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'User list',
              component: User
            },
            {
              path: 'add',
              name: 'Add User',
              component: User
            },
            {
              path: 'edit/:id',
              name: 'Update User',
              component: User
            }
          ]
        },

      ]
    }
  ]
})

```

Tiếp theo là cần tạo api, tạo controller `UserController`
```
php artinsan make:controller Api/UserController
```
Sau đó thêm nội dung
```
<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;

class UserController extends Controller
{
    public function __construct(User $user) {
        $this->user = $user;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = $this->user->all();

        return response()->json($user);
    }
}

```

giờ ta đã có api, nhưng dữ liệu chưa có nên ta tạo tạm để test đã nhé, sử dụng laravel tinker
```
php artisan tinker
```

sau đó gõ
```
factory(App\User::class, 10)->create();
```
Thế là đã có 10 user để test rồi

Tạo routes cho api, file `routes/api.php`
```
Route::group(['namespace' => 'Api'], function(){
    Route::resource('user', 'UserController');
});
```
Hoàn tất ta sẽ được màn hình list user 

![](https://images.viblo.asia/d46d87e6-d047-4cd4-9045-32b766ee5a87.png)

# Kết
Sử dụng vuex với người bắt đầu sẽ gây cảm giác rườm rà và khó nhớ, nhưng khi làm quen rồi sẽ thấy nó giúp bạn kiểm soát project dễ dàng hơn. Và sự phức tạp ban đầu nó mang lại hoàn toàn đáng với những gì nó làm được. Bạn có thể tham khảo link github mình làm ở trên để rõ hơn
https://github.com/ththth0303/laravel-vue-coreui/tree/vuex

# Link tham khảo
https://vuex.vuejs.org/

https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart