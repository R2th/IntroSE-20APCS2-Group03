Trong bài viết này, chúng ta sẽ cùng nhau xây dựng một ứng dụng đăng ký và đăng nhập đơn giản bằng Vue.js và được quản lý state với Vuex.

## Cấu trúc dự án với Vue.js và Vuex

Tất cả source code sẽ được để trong folder /src. Trong thư mực src sẽ bao gồm có assets, components dùng cho các chức năng và màn hình, và các thư mục được chia sẻ đó là helpers, services, store.

### Thư mục helpers 

Thư mục helpers sẽ chứa tất cả các file được dùng chung cho các component có chức năng support hay các file không được nằm ở thư mục nào.

**Vue Auth Header**

/src/helpers/auth-header.js

Auth header là trả về một header xác thực HTTP chứa chuỗi JSON Web Token (JWT) của user hiện tại đã được đăng nhập, được lấy ra từ local storage hoặc cookie. Nếu user không đăng nhập, nó sẽ trả về 1 object rỗng. 

Auth header sẽ được dùng để tạo request HTTP đã được xác thực đến server api sử dụng xác thực JWT.

```ruby
export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}
```

**Vue Router**

Path: /src/helpers/router.js

Vue router định nghĩa tất cả routes cho ứng dụng, chứa một hàm sẽ luon chạy trước khi route thay đổi để ngăn chặn user chưa được xác thực từ truy cập bị giới hạn.

```ruby
import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../components/HomePage'
import LoginPage from '../components/LoginPage'
import RegisterPage from '../components/RegisterPage'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },

    // nếu không sẽ chuyển đến trang home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // chuyển đến trang login nếu chưa được login
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})
```

**Vue Helpers Index**

Path: /src/helpers/index.js

File index helpers nhóm tất cả các export helper cùng nhau để có thể được import cho các file khác nhau trong app.

Khi import ta có thể gọi `import { helper1, helper2, ... } from '../helpers'`

```ruby
export * from './router';
export * from './auth-header';
```

### Thư mục Vue Services

Path: /src/services

Service sẽ chứa tất cả kết nối http đến backend api cho ứng dụng, mỗi service sẽ được đóng gói các lời gọi api cho từng loại nội dung (vd users) và trả về các hàm thực hiện các chức năng CRUD, ... Service cũng có các hàm mà không cần gọi http, vd userService.logout() chỉ xoá item từ local storage.

Tôi thấy việc đóng gói các lời gọi http trong phần service làm cho code rõ ràng, đơn giản, dễ hiểu hơn.

**Vue User Service**

Path: /src/services/user.service.js

User service đóng gói tất cả lời gọi api để xử lý các chức năng CRUD cho user, bao gồm cả chức năng login, logout, signup. Các hàm service này sẽ được export qua đối tượng userService.

Hàm handleResponse trong service sẽ kiểm tra nếu response http từ api là 401 _ chưa được xác thực thì sẽ tự động logout user. Ở đây cũng bao gồm xử lý khi token JWT hết hạn hay không được xác thực.

```ruby
import config from 'config';
import { authHeader } from '../helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login thành công nếu có một token jwt trong response
            if (user.token) {
                // lưu dữ liệu user và token jwt vào local storage để giữ user được log in trong page
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // xoá user từ local storage để log out
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // tự động logout nếu response 401 được trả về từ api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
```

**Vue Services Index**

Path: /src/services/index.js

File service index nhóm tất cả service export cùng nhau để có thể dễ dàng được import vào các file khác. `import { service1, service2, ... } from '../services'`

```ruby
export * from './user.service';
```

### Thư mục store

Path: /src/store

Vuex store chứa tất cả các module vuex và mọi thứ liên quan đến vuex store, nếu bạn chưa biết nhiều về vuex, thì có thể tham khảo ở [đây](https://vuex.vuejs.org/)

Vuex quản lý state tập trung trong store, nó có thể được truy cập từ bất kỳ component nào, mutation được commit để cập nhật các phần của state, và action được dispatch để thực hiện các chức năng phức tạp, có thể bao gồm các lời gọi bất đồng bộ và nhiều mutation 

**Vuex Account Module**

Path: /src/store/modules/account.js

Vuex account module dùng để thao tác với phần account cho state trong store. Nó chứa các action để đăng ký user mới, login in và logout, và chứa các mutation cho mỗi sự thay đổi state với mỗi action account.

State được khởi tạo cho user được gán bằng giá trị user đã được save trong local storage, chứa giá trị xác định user đã login khi browser tải lại hoặc giữa các phiên khác nhau của browser

```ruby
import { userService } from '../../services';
import { router } from '../../helpers';

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

const actions = {
    login({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username });
    
        userService.login(username, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    router.push('/');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);
    
        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    router.push('/login');
                    setTimeout(() => {
                        // hiển thị message thành công sau redirect sang trang 
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    }
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state, user) {
        state.status = { registering: true };
    },
    registerSuccess(state, user) {
        state.status = {};
    },
    registerFailure(state, error) {
        state.status = {};
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};
```

**Vuex Alert Module**

Path: /src/store/modules/alert.js

Vuex alert module dùng để xử lý phần alert cho state trong store. Nó chứa các action và mutation để cài đặt message alert thành công hay lỗi, và cả xoá alert.

Trong module này, mỗi action alert chỉ commit một mutation, vì vậy nó sẽ  có thể commit mutation trực tiếp từ component vue.

```ruby
const state = {
    type: null,
    message: null
};

const actions = {
    success({ commit }, message) {
        commit('success', message);
    },
    error({ commit }, message) {
        commit('error', message);
    },
    clear({ commit }, message) {
        commit('success', message);
    }
};

const mutations = {
    success(state, message) {
        state.type = 'alert-success';
        state.message = message;
    },
    error(state, message) {
        state.type = 'alert-danger';
        state.message = message;
    },
    clear(state) {
        state.type = null;
        state.message = null;
    }
};

export const alert = {
    namespaced: true,
    state,
    actions,
    mutations
};
```

**Module index**
Path: /src/store/modules/index.js

```ruby
import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './modules/alert';
import { account } from './modules/account';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    alert,
    account
  }
});
```

**Vuex Store**

Path: /src/store/index.js

```ruby
import Vue from 'vue';
import Vuex from 'vuex';

import { account } from './modules/account';
import { alert } from './modules/alert';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    account, alert
  }
});
```

### Vue App Component

Path: /src/App.vue

App component là root component cho vue, nó chứa code html, routes và thông báo alert cho app

```ruby
<template>
    <div class="jumbotron">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'app',
    computed: {
        ...mapState({
            alert: state => state.alert
        })
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear' 
        })
    },
    watch: {
        $route (to, from){
            this.clearAlert();
        }
    } 
};
</script>
```

### Thư mục component 

**Vue Login Page Component**

Path: /src/components/account/LoginPage.vue

Login component render form login với user name và password. Nó cũng hiển thị thông báo validation cho các trường invalid khi user cố gắng submit form. Nếu form valid, khi submit sẽ gọi `this.login({ username, password })` được map đến action `account/login` 

Trong hàm created(), action `account/logout` được dispatch thông qua hàm logout(), sẽ đăng xuất user khi đã được đăng nhập, nó sẽ chuyển sang trang login 

Form validation được thực hiện thông qua thư viện [VeeValidate](https://baianat.github.io/vee-validate/)

```ruby
<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
                <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
            </div>
            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="status.loggingIn">Login</button>
                <img v-show="status.loggingIn" />
                <router-link to="/register" class="btn btn-link">Register</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            username: '',
            password: '',
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    created () {
        this.logout();
    },
    methods: {
        ...mapActions('account', ['login', 'logout']),
        handleSubmit (e) {
            this.submitted = true;
            const { username, password } = this;
            if (username && password) {
                this.login({ username, password })
            }
        }
    }
};
</script>
```

**Vue Register Component**

Path: /src/components/account/SignupPage.vue

Component đăng ký sẽ render một form đăng ký đơn giản với first name, last name, user name và password. Nó cũng hiển thị thông báo validation for các trường invalid khi user submit form. Nếu form valid, khi submit sẽ gọi action `account/register` để dispatch dữ liệu từ form.

```ruby
<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" v-model="user.firstName" v-validate="'required'" name="firstName" class="form-control" :class="{ 'is-invalid': submitted && errors.has('firstName') }" />
                <div v-if="submitted && errors.has('firstName')" class="invalid-feedback">{{ errors.first('firstName') }}</div>
            </div>
            <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" v-model="user.lastName" v-validate="'required'" name="lastName" class="form-control" :class="{ 'is-invalid': submitted && errors.has('lastName') }" />
                <div v-if="submitted && errors.has('lastName')" class="invalid-feedback">{{ errors.first('lastName') }}</div>
            </div>
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" v-model="user.username" v-validate="'required'" name="username" class="form-control" :class="{ 'is-invalid': submitted && errors.has('username') }" />
                <div v-if="submitted && errors.has('username')" class="invalid-feedback">{{ errors.first('username') }}</div>
            </div>
            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" v-model="user.password" v-validate="{ required: true, min: 6 }" name="password" class="form-control" :class="{ 'is-invalid': submitted && errors.has('password') }" />
                <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="status.registering">Register</button>
                <img v-show="status.registering" />
                <router-link to="/login" class="btn btn-link">Cancel</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    methods: {
        ...mapActions('account', ['register']),
        handleSubmit(e) {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.register(this.user);
                }
            });
        }
    }
};
</script>
```

**Vue Home Page**

Path /src/components/HomePage.vue

Home Page component là trang được redirect đến khi user login, logout hoặc register.

```ruby
<template>
  <div>
    <div class="hello">
      Hello
    </div>
    <p>
      <button @click="Logout">Logout</button>
    </p>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
  methods: {
    ...mapActions({
      logout: 'account/logout'
    }),
    Logout () {
      this.logout();
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

```

### Vue Main Index HTML

Path: /src/index.html

```ruby
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vue + Vuex - User Registration and Login Example & Tutorial</title>
    <link href="//netdna.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" />
    <style>
        a { cursor: pointer; }
    </style>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

### Vue App Index

Path: /src/index.js

```ruby
import Vue from 'vue';
import VeeValidate from 'vee-validate';

import { store } from './store';
import { router } from './helpers';
import App from './App.vue';

Vue.use(VeeValidate);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
```