# I. Giới thiệu
Như vậy ở phần trước mình đã giới thiệu phần khởi tạo app vue 3, phần fake backend cũng như phần auth cho app. Ở phần 3 này mình sẽ hướng dẫn tiếp phần tạo router, xây dựng các hàm cũng như hoàn thiện ứng dụng.
# II. Router

Router xác định các tuyến đường cho ứng dụng Vue 3 và tạo một phiên bản Vue Router mới bằng hàm createRouter (). Router sẽ được nhập vào main.js nơi nó được khởi tạo cùng với ứng dụng khi được khởi động.

Hàm createRouter () là một phần của Vue Router v4 tương thích với Vue 3, phiên bản trước của bộ định tuyến (Vue Router v3) tương thích với Vue 2. Để biết thêm thông tin về những gì đã thay đổi trong phiên bản mới của Vue Router xem https://next.router.vuejs.org/guide/migration/.

Router chính dẫn đến trang home (/) của ứng dụng,  đường dẫn chỉnh sửa tài khoản / edit /: id ánh xạ tới trang chỉnh sửa tài khoản và đường dẫn /login ánh xạ tới thành phần đăng nhập.

Những router home và edit được bảo mật bằng cách thêm trình bảo vệ auth đến thuộc tính beforeEnter của mỗi router.

Tham số linkActiveClass: 'active' được truyền tới bộ định tuyến đặt lớp CSS hoạt động cho các thành phần router-link.

Để biết thêm thông tin về định tuyến Vue, hãy xem https://router.vuejs.org/. 

```php
import { createRouter, createWebHistory} from 'vue-router';

import Home from '@/home/Home';
import EditAccount from '@/home/EditAccount';
import Login from '@/login/Login';
import { authGuard } from '@/_helpers';

const routes = [
    { path: '/', component: Home, beforeEnter: authGuard },
    { path: '/edit/:id', component: EditAccount, beforeEnter: authGuard },
    { path: '/login', component: Login },

    // otherwise redirect to home
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});
```

# III. Account Service
Path: /src/_services/account.service.js

Trước tiên, phương thức login () đăng nhập vào Facebook (await new Promise(FB.login)), sau đó chuyển mã truy cập Facebook đến phương thức api Authenticate () để đăng nhập vào api (hoặc  fake backend).

Khi đăng nhập thành công, api trả về chi tiết tài khoản và token JWT được public cho tất cả các components với lệnh gọi tới accountSubject.next (account) trong phương thức apiAuthenticate (). Sau đó, start phương thức countdown bằng cách gọi startAuthenticateTimer () để tự động lấy mã token JWT mới (silent refresh) một phút trước khi nó hết hạn để giữ cho tài khoản được đăng nhập.

Phương thức logout () thu hồi quyền của Ứng dụng Facebook với FB.api ('/ me / permissions', 'delete') sau đó đăng xuất khỏi Facebook bằng cách gọi FB.logout (), yêu cầu thu hồi quyền để đăng xuất hoàn toàn vì FB.logout () không xóa cookie xác thực FB để người dùng đăng nhập lại khi làm mới trang. Sau đó, phương thức logout () sẽ hủy quá trình làm mới đang chạy trong nền bằng cách gọi stopAuthenticateTimer (), đăng xuất người dùng khỏi ứng dụng Vue bằng cách xuất bản giá trị null cho tất cả các thành phần người đăng ký (accountSubject.next (null)) và chuyển hướng đến trang đăng nhập. 

```php
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

import { router } from '@/_helpers';

const baseUrl = `${process.env.VUE_APP_API_URL}/accounts`;
const accountSubject = new BehaviorSubject(null);

export const accountService = {
    login,
    apiAuthenticate,
    logout,
    getAll,
    getById,
    update,
    delete: _delete,
    account: accountSubject.asObservable(),
    get accountValue () { return accountSubject.value; }
};

async function login() {
    // login with facebook then authenticate with the API to get a JWT auth token
    const { authResponse } = await new Promise(FB.login);
    if (!authResponse) return;

    await apiAuthenticate(authResponse.accessToken);

    // get return url from query parameters or default to home page
    const returnUrl = router.currentRoute.value.query['returnUrl'] || '/';
    router.push(returnUrl);
}

async function apiAuthenticate(accessToken) {
    // authenticate with the api using a facebook access token,
    // on success the api returns an account object with a JWT auth token
    const response = await axios.post(`${baseUrl}/authenticate`, { accessToken });
    const account = response.data;
    accountSubject.next(account);
    startAuthenticateTimer();
    return account;
}

function logout() {
    // revoke app permissions to logout completely because FB.logout() doesn't remove FB cookie
    FB.api('/me/permissions', 'delete', null, () => FB.logout());
    stopAuthenticateTimer();
    accountSubject.next(null);
    router.push('/login');
}

function getAll() {
    return axios.get(baseUrl)
        .then(response => response.data);
}

function getById(id) {
    return axios.get(`${baseUrl}/${id}`)
        .then(response => response.data);
}

async function update(id, params) {
    const response = await axios.put(`${baseUrl}/${id}`, params);
    let account = response.data;
    // update the current account if it was updated
    if (account.id === accountSubject.value?.id) {
        // publish updated account to subscribers
        account = { ...accountSubject.value, ...account };
        accountSubject.next(account);
    }
    return account;
}

async function _delete(id) {
    await axios.delete(`${baseUrl}/${id}`);
    if (id === accountSubject.value?.id) {
        // auto logout if the logged in account was deleted
        logout();
    }
}

// helper methods

let authenticateTimeout;

function startAuthenticateTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(accountSubject.value.token.split('.')[1]));

    // set a timeout to re-authenticate with the api one minute before the token expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    const { accessToken } = FB.getAuthResponse();
    authenticateTimeout = setTimeout(() => apiAuthenticate(accessToken), timeout);
}

function stopAuthenticateTimer() {
    // cancel timer for re-authenticating with the api
    clearTimeout(authenticateTimeout);
}
```

# IV. Edit Account Component
Path: /src/home/EditAccount.vue

Các biến và phương thức được tạo và trả về bởi phương thức Vue 3 setup (), nên các biến và phương thức này có thể được gọi trong template. Phương thức setup () chạy trước khi component được tạo và đóng vai trò là điểm nhập cho các component Vue 3 được tạo bằng Composition API. Các biến được tạo dưới dạng biến phản ứng bằng cách sử dụng hàm Vue 3 ref () để mẫu sẽ tự động cập nhật (re-render) khi giá trị của chúng thay đổi.

Trong phương thức setup (), component tìm nạp các chi tiết tài khoản được chỉ định bằng dịch vụ tài khoản (accountService.getById (id)) để điền trước các giá trị trường biểu mẫu.

Khi gửi, phương thức handleSubmit () cập nhật tài khoản với dịch vụ tài khoản (accountService.update (id, account.value)) và chuyển hướng người dùng trở lại trang chủ. 

```php
<template>
    <h2>Edit Account</h2>
    <p>Updating the information here will only change it inside this application, it won't (and can't) change anything in the associated Facebook account.</p>
    <form v-if="account" @submit.prevent="handleSubmit">
        <div class="form-group">
            <label>Facebook Id</label>
            <div>{{account.facebookId}}</div>
        </div>
        <div class="form-group">
            <label>Name</label>
            <input type="text" v-model="account.name" class="form-control" />
        </div>
        <div class="form-group">
            <label>Extra Info</label>
            <input type="text" v-model="account.extraInfo" class="form-control" />
        </div>
        <div class="form-group">
            <button type="submit" :disabled="loading" class="btn btn-primary">
                <span v-if="loading" class="spinner-border spinner-border-sm mr-1"></span>
                Save
            </button>
            <router-link to="../../" class="btn btn-link">Cancel</router-link>
            <div v-if="error" class="alert alert-danger mt-3 mb-0">{{error}}</div>
        </div>
    </form>
    <div v-if="!account" class="text-center p-3">
        <span class="spinner-border spinner-border-lg align-center"></span>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { router } from '@/_helpers';
import { accountService } from '@/_services';

export default {
    setup() {
        const route = useRoute();
        const account = ref();
        const id = route.params.id;
        accountService.getById(id)
            .then(x => account.value = x);

        const loading = ref(false);
        const error = ref('');
        const handleSubmit = () => {
            loading.value = true;
            error.value = '';
            accountService.update(id, account.value)
                .then(() => {
                    router.push('../');
                })
                .catch(err => {
                    error.value = err;
                    loading.value = false;
                });
        }

        return {
            account,
            loading,
            error,
            handleSubmit
        }
    }
}
</script>
```

# V. Home Component
Path: /src/home/Home.vue

Template ở component trang chủ chứa một thông báo chào mừng đơn giản và danh sách tất cả các tài khoản có các nút để chỉnh sửa hoặc xóa.

Code ở component trang chủ  get tất cả tài khoản trong phương thức setup () và cung cấp chúng cho template.

Phương thức deleteAccount () đặt thuộc tính isDeleting thành true cho tài khoản được chỉ định để mẫu hiển thị một vòng xoay trên nút xóa, sau đó gọi accountService.delete (id) để xóa tài khoản và xóa tài khoản đã xóa khỏi mảng tài khoản thành phần. bị xóa khỏi giao diện người dùng. 

```php
<template>
    <h2>You're logged in with Vue 3 & Facebook!!</h2>
    <p>All accounts from secure api end point:</p>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Id</th>
                <th>Facebook Id</th>
                <th>Name</th>
                <th>Extra Info</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="account in accounts" :key="account.id">
                <td>{{account.id}}</td>
                <td>{{account.facebookId}}</td>
                <td>{{account.name}}</td>
                <td>{{account.extraInfo}}</td>
                <td class="text-right" style="white-space: nowrap">
                    <router-link :to="`/edit/${account.id}`" class="btn btn-sm btn-primary mr-1">Edit</router-link>
                    <button @click="deleteAccount(account.id)" class="btn btn-sm btn-danger btn-delete-account" :disabled="account.isDeleting">
                        <span v-if="account.isDeleting" class="spinner-border spinner-border-sm"></span>
                        <span v-else>Delete</span>
                    </button>
                </td>
            </tr>
            <tr v-if="!accounts">
                <td colspan="5" class="text-center">
                    <span class="spinner-border spinner-border-lg align-center"></span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { ref } from 'vue';

import { accountService } from '@/_services';

export default {
    setup() {
        const accounts = ref();
        accountService.getAll()
            .then(x => accounts.value = x);

        const deleteAccount = (id) => {
            const account = accounts.value.find(x => x.id === id);
            account.isDeleting = true;
            accountService.delete(id)
                .then(() => accounts.value = accounts.value.filter(x => x.id !== id));
        };

        return {
            accounts,
            deleteAccount
        };
    }
}
</script>
```
# VI. Login Component
Path: /src/login/Login.vue

Template ở component đăng nhập chứa một nút đăng nhập Facebook duy nhất được liên kết với phương thức đăng nhập khi nhấp chuột.

Code ở component đăng nhập ánh xạ phương thức đăng nhập với phương thức accountService.login đăng nhập vào ứng dụng bằng Facebook. Nếu người dùng đã đăng nhập, họ sẽ tự động được chuyển hướng đến trang chủ. 

```php
<template>
    <div class="col-md-6 offset-md-3 mt-5 text-center">
        <div class="card">
            <h4 class="card-header">Vue 3 Facebook Login Example</h4>
            <div class="card-body">
                <button class="btn btn-facebook" @click="login">
                    <i class="fa fa-facebook mr-1"></i>
                    Login with Facebook
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { router } from '@/_helpers';
import { accountService } from '@/_services';

export default {
    setup() {
        // redirect to home if already logged in
        if (accountService.accountValue) {
            router.push('/');
        }

        return {
            login: accountService.login
        };
    }
}

# VII. App Component
Path: /src/App.vue

Mẫu thành phần ứng dụng chứa thanh điều hướng chính chỉ được hiển thị cho các tài khoản đã được xác thực và một router-view component để hiển thị nội dung của từng chế độ xem dựa trên router/path.

Mã thành phần ứng dụng chứa biến tài khoản và phương thức đăng xuất được tham chiếu trong mẫu. Biến và phương thức được tạo và trả về bởi phương thức Vue 3 setup (), làm cho chúng có sẵn cho mẫu. Phương thức setup () chạy trước khi thành phần được tạo và đóng vai trò là điểm nhập cho các thành phần Vue 3 được tạo bằng Composition API. Biến tài khoản được tạo dưới dạng biến phản ứng bằng cách sử dụng hàm Vue 3 ref () để mẫu sẽ tự động cập nhật (re-render) khi giá trị biến thay đổi.

Phương thức logout () trỏ đến phương thức accountService.logout () và được gọi từ liên kết đăng xuất trong thanh điều hướng chính để đăng xuất tài khoản và chuyển hướng đến trang đăng nhập. 

```php
<template>
    <!-- nav -->
    <nav class="navbar navbar-expand navbar-dark bg-dark" v-if="account">
        <div class="navbar-nav">
            <router-link to="/" class="nav-item nav-link">Home</router-link>
            <a class="nav-item nav-link" @click="logout">Logout</a>
        </div>
    </nav>

    <!-- main app container -->
    <div class="container pt-4">
        <router-view></router-view>
    </div>
</template>

<script>
import { ref } from 'vue';

import { accountService } from '@/_services';

export default {
    setup() {
        const account = ref(null);
        accountService.account.subscribe(x => account.value = x);

        return {
            account,
            logout: accountService.logout
        }
    }
}
</script>
```
# VIII. Main.js
Path: /src/main.js

Tệp main.js khởi động ứng dụng Vue bằng cách gắn thành phần App trong phần tử div #app được xác định trong tệp index html.

Trước khi khởi động ứng dụng Vue, nó sẽ import stylesheet LESS / CSS chung vào ứng dụng, bật fake backend api, bật trình đánh chặn jwt và trình chặn lỗi và đợi SDK Facebook tải và khởi chạy.

Để vô hiệu hóa chương trình phụ trợ giả mạo, bạn chỉ cần xóa 2 dòng bên dưới comment // setup fake backend.

```php
import { createApp } from 'vue';

// global stylesheet
import './styles.less';

// setup fake backend
import { fakeBackend } from './_helpers';
fakeBackend();

import { initFacebookSdk, jwtInterceptor, errorInterceptor, router } from './_helpers';
import App from './App.vue';

// enable interceptors for http requests
jwtInterceptor();
errorInterceptor();

// wait for facebook sdk to start app
initFacebookSdk().then(startApp);

function startApp() {
    createApp(App)
        .use(router)
        .mount('#app');
}
```

# IX. Global LESS/CSS Styles
Path: /src/styles.less

File style LESS được áp dụng global trong ứng dụng Vue 3. 

```php
a { cursor: pointer }

.btn-facebook {
    background: #3B5998;
    color: #fff;

    &:hover {
        color: #fff;
        opacity: 0.8;
    }
}

.btn-delete-account {
    width: 40px;
    text-align: center;
    box-sizing: content-box;
}
```

# X. dotenv
Path: /.env

Tệp dotenv chứa các biến môi trường được sử dụng trong ứng dụng Vue 3 ví dụ.

Các biến môi trường được đặt trong tệp dotenv có tiền tố VUE_APP_ có thể truy cập được trong ứng dụng Vue thông qua process.env. <Tên biến> (ví dụ: process.env.VUE_APP_FACEBOOK_APP_ID). Để biết thêm thông tin về cách sử dụng các biến môi trường trong Vue, hãy xem https://cli.vuejs.org/guide/mode-and-env.html#enosystem-variables 

```php
VUE_APP_API_URL=http://localhost:4000
VUE_APP_FACEBOOK_APP_ID=314930319788683
```

# XI. Package.json
Path: /package.json

Tệp package.json chứa thông tin cấu hình dự án bao gồm các gói phụ thuộc được cài đặt khi bạn chạy npm install và các tập lệnh được thực thi khi bạn chạy npm run serve: ssl hoặc npm run build, v.v. Tài liệu đầy đủ có tại https: // docs. npmjs.com/files/package.json. 

```php
{
    "name": "vue-3-facebook-login-example",
    "version": "0.1.0",
    "private": true,
    "scripts": {
        "serve": "vue-cli-service serve --open",
        "serve:ssl": "vue-cli-service serve --https --open --public localhost:8080",
        "build": "vue-cli-service build",
        "lint": "vue-cli-service lint"
    },
    "dependencies": {
        "axios": "^0.20.0",
        "core-js": "^3.6.5",
        "rxjs": "^6.6.3",
        "vue": "^3.0.0-0",
        "vue-router": "^4.0.0-beta.12"
    },
    "devDependencies": {
        "@vue/cli-plugin-babel": "~4.5.0",
        "@vue/cli-plugin-eslint": "~4.5.0",
        "@vue/cli-service": "~4.5.0",
        "@vue/compiler-sfc": "^3.0.0-0",
        "babel-eslint": "^10.1.0",
        "eslint": "^6.7.2",
        "eslint-plugin-vue": "^7.0.0-0",
        "less": "^3.12.2",
        "less-loader": "^7.0.1"
    },
    "eslintConfig": {
        "root": true,
        "env": {
            "node": true
        },
        "extends": [
            "plugin:vue/vue3-essential",
            "eslint:recommended"
        ],
        "parserOptions": {
            "parser": "babel-eslint"
        },
        "rules": {},
        "globals": {
            "FB": "readonly"
        }
    },
    "browserslist": [
        "> 1%",
        "last 2 versions",
        "not dead"
    ]
}
```

# XII Kết luận
Như vậy mình đã giới thiệu xong phần sử dụng Vue 3 để login Facebook.
        
Các bạn có thể xem chi tiết bài viết ở đây: https://jasonwatmore.com/post/2020/10/06/vue-3-facebook-login-tutorial-example