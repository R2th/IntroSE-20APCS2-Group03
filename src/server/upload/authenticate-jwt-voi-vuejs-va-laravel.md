# Overview 
 - Chào mọi người, hôm nay tôi sẽ hướng dẫn mọi người cách làm một trang login/logout sử dụng vuejs và laravel với JWT, tôi người viết bài viết này chỉ mong chia sẽ kiến một chút gì đó hữu ích nên trong bài viết có gì sai sót xin mọi người góp ý ạ
Trong bài tôi sắp hướng dẫn sẽ sử dụng :
*  Vue Router : tất nhiên mọi trang web đều phải có route ( ngoại trừ web có 1 trang :D ), và vue cũng vậy, sử dụng vue router để tạo nên một ứng dụng SPA. 

Trong mục routes/index.js
```js
import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index;
Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: configRoutes(),
})
function configRoutes() {
    return [
        {
            path: '/',
            name: 'home',
            component: Index,
        }
    ]
}
```

và để render router <router-view></router-view> trong thư mục ta muốn các components đó đc render vào

* Vuex : Để ứng dụng dễ dàng bảo trì hơn ta sử dụng Vuex để quản lý các state trong ứng dụng 

Đây là cấu trúc của một store trong vuex

```js
import Vuex from 'vuex';

const store = new Vuex.Store({
    state: {...},
    getters: {...},
    actions: {...},
    matations: {...}
});
```
* JWT Authentication ( nếu các bạn chưa biết JWT thì hãy tìm hiểu nó nhé bài này mình chỉ hướng dẫn các bạn làm trang login/logout).

Cài JWT vào ứng dụng laravel  ( https://jwt-auth.readthedocs.io/en/docs/laravel-installation/ ): 
   ` composer require tymon/jwt-auth`
   
   và chạy lệnh php artisan jwt:secret
   
#   Let's start
- Đầu tiên ta cài ứng dụng laravel mới.  và cài những thứ ở phần Overview tôi đã hướng dẫn
- Sau khi cài JWT config ở file /config/auth.php

![](https://images.viblo.asia/6bc3defb-d4e2-4fa7-b101-f60ca1c7fde5.png)

Tạo một controller AuthController: 
```php
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }
    
    public function login()
    {
        $credentials = request(['email', 'password']);
        if (! $token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function me()
    {
        return response()->json(auth('api')->user());
    }

    public function logout()
    {
        auth('api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'user' => $this->guard(),
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }

    public function guard()
    {
        return Auth::Guard('api')->user();
    }
```

Và tạo các routes cho việt Authenticate :

```php
Route::group(['prefix' => 'auth'], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('register', 'AuthController@register');
});
```

** Nhớ tạo config + tạo database và chạy migrate **.

Thế là xong phần Backend. Đến phần Vuejs

Ta tạo theo cấu trúc folder như sau :
![](https://images.viblo.asia/5cda497d-5a19-4d37-82b7-22d5479e1166.png)

Các bạn hãy tạo Routes và các components để phục vụ cho việc Login :

Routes: 
```js
function configRoutes() {
    return [
        {
            path: '/login',
            component: Login,
            name: 'login'
        }
    ];
}
```

Components : 
Login.vue 
```js
<template>
    <div class="col-md-8 offset-md-2 pt-100">
        <div class="card">
            <article class="card-body">
                <a href="" class="float-right btn btn-outline-primary" @click.prevent="changeType('register')">Sign up</a>
                <h4 class="card-title mb-4 mt-1">Sign in</h4>
                <p>
                    <a href="" class="btn btn-block btn-outline-info"> <i class="fa fa-twitter"></i>   Login via Twitter</a>
                    <a href="" class="btn btn-block btn-outline-primary"> <i class="fa fa-facebook-f"></i>   Login via Facebook</a>
                    <a href="" class="btn btn-block btn-outline-primary"> <i class="fa fa-google"></i>   Login via Gmail</a>
                </p>
                <hr>
                <form @submit.prevent="authenticate">
                    <div class="form-group">
                        <input name="" class="form-control" placeholder="Email or login" type="email" v-model="form.email">
                    </div>
                    <div class="form-group">
                        <input class="form-control" placeholder="******" type="password" v-model="form.password">
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-block"> Login  </button>
                            </div>
                        </div>
                        <div class="col-md-6 text-right">
                            <a class="small" href="#">Forgot password?</a>
                        </div>
                    </div>
                </form>
            </article>
        </div>
    </div>
</template>

<script>
    import { login } from '../../helpers/auth';

    export default {
        name: 'Login',
        data() {
            return {
                form: {
                    email: '',
                    password: '',
                },
                type: 'login',
                error: null,
            }
        },
        methods: {
            authenticate() {
                this.$store.dispatch("LOGIN");

                login(this.$data.form)
                    .then(res => {
                        this.$store.commit("LOGIN_SUCCESS", res);
                        this.$router.push({path: '/'});
                    })
                    .catch(err => {
                        this.$store.commit("LOGIN_FAILED", {err})
                        this.showAlert(this.authError, 'error');
                    })
            },
        },
        computed: {
            authError() {
                return this.$store.getters.AUTH_ERROR;
            }
        }
    }
</script>
```

Tạo helpers : helpers/auth.js

```js
export function login(credential) {
    return new Promise((res, rej) => {
        axios.post('/api/auth/login', credential)
            .then(result => {
                res(result.data);
            })
            .catch(err => {
                rej("Wrong email or password");
            })
    })
}

export function register(credential) {
    return new Promise((res, rej) => {
        axios.post('/api/auth/register', credential)
            .then(result => {
                res(result.data);
            })
            .catch(err => {
                rej("Wrong email or password");
            })
    })
}

export function currentUser() {
    const user = localStorage.getItem('user');

    if (!user) {
        return null;
    }

    return JSON.parse(user);
}
```

Tạo store : 
Trong Store ta cần tạo 1 file index.js để chứa các store khác, giả dụ ứng dụng có bạn có rất nhiều modules bạn không thể nhét nó vào 1 store điều đó rất khó để phát triển sau này.
/store/index.js
```js
import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './modules/auth';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Auth,
    }
})
```

Tạo modules cho Auth: /store/modules/auth.js

```js
import { currentUser } from "../../helpers/auth";
const user = currentUser();

export default {
    state: {
        currentUser: user,
        isLoggedIn: !!user,
        loading: false,
        authError: null,
    },
    getters: {
        IS_LOADING: state => {
            return state.loading;
        },
        IS_LOGGEND_IN: state => {
            return state.isLoggedIn;
        },
        CURRENT_USER: state => {
            return state.currentUser;
        },
        AUTH_ERROR: state => {
            return state.authError;
        },
    },
    mutations: {
        LOGIN: state => {
            state.loading = true;
            state.authError = null;
        },
        LOGIN_SUCCESS: (state, payload) => {
            state.authError = null;
            state.isLoggedIn = true;
            state.loading = false;
            state.currentUser = Object.assign({}, payload.user, {token: payload.access_token});

            localStorage.setItem('user', JSON.stringify(state.currentUser));
        },
        LOGIN_FAILED: (state, payload) => {
            state.authError = payload.err;
            state.loading = false;
        },
        LOGOUT: (state) => {
            localStorage.removeItem('user');
            state.isLoggedIn = false;
            state.currentUser = null;
        },
    },
    actions: {
        LOGIN: (context) => {
            context.commit('LOGIN');
        },
    }
}
```
```js
// helpers/general.js
export function initialize(store, router) {
    router.beforeEach((to, from, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const currentUser = store.state.Auth.currentUser;
        if ( requiresAuth && !currentUser) {
            next('/login');
        } else if (to.path === '/login' && currentUser) {
            next('/');
        } else {
            next();
        }
    });

    axios.interceptors.response.use(null, (error) => {
        if(error.response.status === 401) {
            store.commit('LOGOUT');
            router.push('/login');
        }

        return Promise.reject(error);
    });

    if (store.getters.currentUser) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters.CURRENT_USER.token}`;
    }
}
```

Tạo một Main.vue : /js/Main.vue để render các components vao`: Mọi components sẽ được render vào đây <router-view></router-view>
```js
<template>
    <div id="main">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'Main',
    }
</script>

```

Tiếp theo tại app.js : 

```js
require('./bootstrap');

import Vue from 'vue';
import router from './routes';
import store from './store/index';
import { initialize } from "./helpers/general";

import Main from './Main';

initialize(store, router);

const app = new Vue({
    el: '#app',
    router,
    store,
    render: h =>h(Main)
});
```

Ở đây el '#app' là id của trang blade php ta muốn nó render vào. 

Các bạn có thể test bằng postman, ở đây giao diện mình build chưa đẹp lắm nên mình test bằng cái này, chúc các bạn thành công
![](https://images.viblo.asia/d07057c7-725f-420c-b0d8-c03700358f8b.png)

# Kết
Mình xin nhắc lại là, mình chỉ chia sẽ những gì mình biết, nếu trong bài viết có gì thiếu sót mình xin mọi người hãy đóng góp ý kiến cho mình để mình phát triển tốt hơn :D Cảm ơn các bạn đã theo dõi .

Src : https://b29.vn/bai-viet/authenticate-jwt-voi-vuejs-va-laravel?id=36