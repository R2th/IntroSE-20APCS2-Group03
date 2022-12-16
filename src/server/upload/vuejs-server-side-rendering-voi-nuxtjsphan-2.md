Trong phần 2 này mình sẽ cùng các bạn làm một trang CRUD, để quản lý user

Vuex
Vue router

Sau khi cài đặt project xong như ở phần 1, ta sẽ có một trang web với địa chỉ http://localhost:3000, và để có được địa chỉ này nuxt đã tạo cho chúng ta 1 server, mình tạm gọi là server `nuxt`. Server `nuxt` này sẽ làm nhiệm vụ render thông tin user và trả về trình duyệt nội dung html đã có thông tin của user.

# Chuẩn bị Api
Mình sẽ tạo một REST api bằng node js để phục vụ cho việc lưu trữ dữ liệu và xử lý dữ liệu, các bạn có thể tham khảo tại đây

https://github.com/ththth0303/nodejs-api.git

# Cài đặt Vuex
Vuex sẽ được lưu trong thư mục `store`, mình sẽ tạo một modul store cho user, 
`store/user.js`
```javascript
import {
    callApiFetch,
    callApiAdd,
    callApiEdit,
    callApiDelete,
    callApiShow
} from '../api/user'

const FETCH = 'fetch'
const SHOW = 'show'
const EDIT = 'edit'
const DELETE = 'delete'
const ADD = 'add'

export const state = () => ({
    users: [],
    user: {},
})

export const actions = {
    async getUsers({ commit }, data = {}) {
        let response = await callApiFetch(data)
        
        return commit(FETCH, { users: response.data })
    },
    async addUser({ commit }, data = {}) {
        let response = await callApiAdd(data)
        return response;
    },
    async getUser({ commit }, data = {}) {
        let response = await callApiShow(data)
        
        return commit(SHOW, { user: response.data })
    },
    async editUser({ commit }, data) {
        let response = await callApiEdit(data.id, data)
        
        return commit(EDIT, { user: response.data })
    },
    async deleteUser({ commit }, data) {
        let response = await callApiDelete(data)
        return response;
    },

}

export const mutations = {
    [FETCH](state, { users }) {
        return state.users = users;
    },
    [SHOW](state, { user }) {
        return state.user = user;
    },
    [EDIT](state, { user }) {
        return state.user = user;
    },
}
```

Trong store sẽ thực hiện request lên server nên mình sẽ viết riêng một modul để thao tác với api, tách biệt với xử lý ở vuex,
tạo thêm thư mục `api` và file `user.js` trong thư mục
```javascript
import axios from "./config";

export function callApiFetch(params = {}) {
    return axios.get('/user', { params });
}

export function callApiAdd(params) {
    return axios.post('/user', params)
        .then(response => response)
        .catch(error => error)
}

export function callApiEdit(id, params) {
    return axios.put(`/user/${id}`, params)
        .then(response => response)
        .catch(error => error)
}

export function callApiDelete(id) {
    return axios.delete(`/user/${id}`)
        .then(response => response)
        .catch(error => error)
}

export function callApiShow(id) {
    return axios.get(`/user/${id}`)
        .then(response => response)
        .catch(error => error)
}
```



# Khởi tạo router và các page
Mặc định router sẽ được khởi tạo theo cấu trúc trong thư mục `pages`. Để quản lý user thì ta cần có router http://localhost:3000/users/
Route sẽ được tạo khi thêm thư mục `users`, trong thư mục user sẽ có cấu trúc như sau

![](https://images.viblo.asia/0e80c5bb-2e44-4ed3-bbf2-045cd71a9384.png)

* File `index.vue`
```html
<template>
    <section class="container">
        <div class="card">
            <div class="card-header">
                Manager User
            </div>
            <div class="card-body">
                <nuxt-link to="/users/create" class="btn btn-primary">Create User</nuxt-link>
                <table class="table table-striped table-bordered">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col" width='5%'>#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td width="5%">{{user.id}}</td>
                            <td>{{user.name}}</td>
                            <td>{{user.email}}</td>
                            <td>{{user.status ? 'Actived' : 'Disabled'}}</td>
                            <td>
                                <span class="btn btn-warning" @click="edit(user.id)">edit</span>
                                <span class="btn btn-danger"  @click="del(user.id)">del</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    async fetch ({ store, params }) {   
       await store.dispatch('user/getUsers');
    },
    computed: {
        users () { 
            return this.$store.state.user.users
        }
    },
    methods: {
        edit(id) {
            return this.$router.push({name: 'users-edit-id', params: {id}})
        },
        async del(id) {
            await this.$store.dispatch('user/deleteUser', id);
            this.$store.dispatch('user/getUsers');
        },
    }
}
</script>

<style>
    tbody {
        display:block;
        height:400px;
        overflow:auto;
    }
    thead, tbody tr {
        display:table;
        width:100%;
        table-layout:fixed;
    }
    thead {
        width: calc( 100% - 1em )
    }
</style>
```
Để có thể render nội dung bên phía server thì khi lấy  dữ liệu lưu vào `store`, ta phải xử lý   trong hàm `fetch`, khi đó việc gửi request đến api sẽ được thực hiện ở phía server(server `nuxt` ) chứ không phải ở phía trình duyệt nữa,  và server `nuxt` sẽ tiến hành render và trả về client phần dom đã có dữ liệu.

file `pages/users/create.vue`
```html
<template>
    <section class="container">
        <div class="card">
            <div class="card-header">
                Create User
            </div>
            <div class="card-body">
                <form @submit="createUser($event)">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="name" placeholder="Enter Name" v-model="user.name">
                    </div>
                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" v-model="user.email">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <nuxt-link to="/users" class="btn btn-primary">Cancel</nuxt-link>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    async fetch ({ store, params }) {   
       await store.dispatch('user/getUsers');
    },
    data() {
        return {
            user: {email: null, name: null, status: 0},
        }
    },
    computed: {
        users () { 
            return this.$store.state.user.users
        }
    },
    methods: {
        async createUser(event) {
            event.preventDefault();
            let response = await this.$store.dispatch('user/addUser', this.user);
             if (response && response.data && response.data.message === 'success') {
                this.$router.push({name: 'users'});
            } else {
                alert('error')
            }
            
        },
    }
}
</script>
```

file `pages/user/edit/_id.vue`
```html
<template>
    <section class="container">
        <div class="card">
            <div class="card-header">
                Edit User
            </div>
            <div class="card-body">
                <form @submit="createUser($event)">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="name" placeholder="Enter Name" v-model="user.name">
                    </div>
                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" v-model="user.email">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <nuxt-link to="/users" class="btn btn-primary">Cancel</nuxt-link>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    async fetch ({ store, route }) { 

       await store.dispatch('user/getUser', route.params.id);
    },
    mounted() {
        console.log(this.$router);
        
    },
    computed: {
            user() {
                return this.$store.state.user.user
            },
        },
    methods: {
        async createUser(event) {
            event.preventDefault();
            let response = await this.$store.dispatch('user/addUser', this.user);
            console.log(response);
            if (response && response.data && response.data.message === 'success') {
                this.$router.push({name: 'users'});
            } else {
                alert('error');
            }
        },
    }
}
</script>
```

# Kết quả
- Kết quả thu được
![](https://images.viblo.asia/46781541-4785-4b44-8556-f2a52235ca8e.png)

Nhưng chưa hết, vì đây là ứng dụng server side rendering nên dữ liệu sẽ được render bên server, để kiểm tra bạn bật f12 lên và xem request sẽ thấy

![](https://images.viblo.asia/1b20f0d5-eb8b-4fa3-bab7-46774a9d5102.png)

Vậy là ta đã xây dựng được một trang web demo sử dụng SSR


* Link project : https://github.com/ththth0303/nuxt-ssr.git
* Link api: https://github.com/ththth0303/nodejs-api.git