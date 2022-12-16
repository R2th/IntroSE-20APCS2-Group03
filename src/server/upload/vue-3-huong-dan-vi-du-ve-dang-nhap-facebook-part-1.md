# I. Giới thiệu

Trong hướng dẫn này, mình sẽ trình bày cách thực hiện Đăng nhập Facebook trong Vue 3 với một ứng dụng mẫu cho phép bạn đăng nhập bằng Facebook và xem / cập nhật / xóa tài khoản đã đăng ký trong ứng dụng Vue dựa theo một bài viết của anh Jason.

Lần đầu tiên bạn đăng nhập bằng Facebook, một tài khoản sẽ được đăng ký trong ứng dụng Vue bằng id Facebook của bạn để nó có thể nhận dạng bạn khi bạn đăng nhập lại bằng Facebook. Tài khoản được tạo bằng tên từ tài khoản Facebook của bạn và một trường extraInfo với một số text mặc định, cả tên và thông tin bổ sung đều có thể được cập nhật trong ứng dụng nhưng việc cập nhật chi tiết tài khoản chỉ thay đổi chúng trong ứng dụng mà không ảnh hưởng gì trên Facebook. 

# II. Tạo App Facebook

Ứng dụng của mình có 3 router chính để thực hiện chức năng login, hiển thị danh sách tất cả tài khoản và chỉnh sửa tài khoản.

Login (/ login) - chứa nút đăng nhập Facebook kích hoạt xác thực với Facebook và đăng ký / xác thực với ứng dụng Vue.js.
Home (/) - hiển thị danh sách tất cả các tài khoản trong ứng dụng Vue với các nút để chỉnh sửa hoặc xóa bất kỳ tài khoản nào trong số đó.
Chỉnh sửa Tài khoản (/ edit /: id) - chứa một biểu mẫu để cập nhật các chi tiết tài khoản.
### 1. Tạo App Fakebook 
Đầu tiên chúng ta cần có Ứng dụng Facebook để Đăng nhập Facebook
Để tích hợp Đăng nhập Facebook vào một trang web hoặc ứng dụng, bạn cần tạo App Facebook tại https://developers.facebook.com/apps/ và thiết lập tài khoản đăng nhập Facebook trong App. Tạo App Facebook sẽ cung cấp cho bạn ID ứng dụng Facebook cần thiết khi khởi tạo SDK JavaScript của Facebook (FB.init (...)). Để biết thêm thông tin, hãy xem tài liệu Đăng nhập Facebook tại https://developers.facebook.com/docs/facebook-login/web. 

Sau khi tạo xong một App Facebook bạn sẽ có được ID dùng cho việc đăng nhập. Ví dụ ở đây mình có ID đăng nhập mà mình đã tạo cho hướng dẫn này (ID app: 314930319788683). ID ứng dụng Facebook này bạn cần thêm vào trong trong file dotenv (/.env).  Với tên là VUE_APP_FACEBOOK_APP_ID hoặc một tên khác tùy bạn đặt). Để gọi được ID trong vue bạn có thể dùng cách này process.env.<variable name> (e.g. process.env.VUE_APP_FACEBOOK_APP_ID). Nếu bạn cần biết thêm thông tin về cách sử dụng các biến môi trường trong Vue, hãy xem https://cli.vuejs.org/guide/mode-and-env.html#enosystem-variables. 

### 2. Fake API backend

Bạn có thể hiểu một cách đơn giản là để run ứng dụng Vua chúng ta cần gọi api sang backend để xử lý tác vụ nhưng ở đây chúng ta sẽ fake api backend để cho phép nó chạy hoàn toàn trong trình duyệt mà không cần một api thực (backend-less). Api giả chứa các tuyến để xác thực và hoạt động CRUD  tài khoản,  nó sử dụng bộ nhớ cục bộ của trình duyệt để lưu dữ liệu. Để vô hiệu hóa phần fake-backend, bạn chỉ cần xóa một vài dòng mã khỏi tệp main.js, phần này mình sẽ hướng dẫn ở bên dưới.
    
###  3. Phạm vi ảnh hưởng khi update
    
Cập nhật hoặc xóa thông tin tài khoản trong ứng dụng Vue 3 sẽ chỉ thay đổi dữ liệu được lưu trong ứng dụng, nó sẽ không (và không thể) thay đổi bất kỳ điều gì trong tài khoản Facebook được liên kết. 
    
###  4. Luồng Authentication với Facebook access tokens và JWT tokens
    
Việc xác thực được thực hiện thông qua access token của Facebook và token của JWT. Khi đăng nhập thành công vào Facebook, access token được trả lại cho ứng dụng Vue 3, sau đó được sử dụng để xác thực với api.  token JWT sẽ hết hạn sau 15 phút và được sử dụng để truy cập an toàn trên api và access token Facebook được sử dụng để xác thực lại với api để nhận token JWT mới hoặc khi nó hết hạn. Ứng dụng Vue bắt đầu hẹn giờ xác thực lại cho mã thông báo JWT mới 1 phút trước khi nó hết hạn để giữ cho tài khoản được đăng nhập chúng ta có thể sử dụng phương thức apiAuthenticate ().
    
# III. Chạy thử ứng dụng.
1. Cài đặt Node.js và npm từ https://nodejs.org
2. Tải xuống hoặc sao chép mã nguồn của dự án từ https://github.com/cornflourblue/vue-3-facebook-login-example
3. Cài đặt tất cả các gói npm được yêu cầu bằng cách chạy npm install từ dòng lệnh trong thư mục gốc của dự án (nơi chứa package.json).
4. Khởi động ứng dụng ở chế độ SSL (https) bằng cách chạy npm run serve: ssl từ dòng lệnh trong thư mục gốc của dự án, SSL là bắt buộc để SDK Facebook chạy bình thường, thao tác này sẽ khởi chạy trình duyệt có URL https: // localhost : 8080 /.
Bạn sẽ thấy thông báo Kết nối của bạn không phải là riêng tư (hoặc một cái gì đó tương tự trong các trình duyệt không phải Chrome), điều này không có gì đáng lo ngại chỉ vì máy chủ phát triển Vue chạy với chứng chỉ SSL. Để mở ứng dụng, hãy nhấp vào nút "Proceed " và liên kết với máy chủ "localhost". 
    
 
# IV. Cấu trúc dự án.
## 1. Cấu trúc 
Vue-CLI là một gói NPM được cài đặt trên toàn thế giới nhằm cung cấp vue trong terminal . Bằng cách sử dụng Vue Create, Vue serve nó sẽ hỗ trợ bạn xây dựng dự án dễ dàng và nhanh gọn.

```php
public
    index.html
src
    _helpers
        auth.guard.js
        error.interceptor.js
        fake-backend.js
        init-facebook-sdk.js
        jwt.interceptor.js
        router.js
        index.js
    _services
        account.service.js
        index.js
    home
        EditAccount.vue
        Home.vue
    login
        Login.vue
    App.vue
    main.js
    styles.less
.env
package.json
```
## 2. Main Index Html File
    
Path: /public/index.html
Tệp index.html chính là trang đầu tiên được tải bởi trình duyệt để khởi động mọi thứ. Vue CLI (với Webpack ẩn) gói tất cả các tệp javascript đã biên dịch lại với nhau và đưa chúng vào phần nội dung của trang index.html để trình duyệt có thể tải và thực thi các tập lệnh. 
    
  ```php
 <!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <link rel="icon" href="<%= BASE_URL %>favicon.ico">
        <title><%= htmlWebpackPlugin.options.title %></title>

        <!-- bootstrap & font-awesome css -->
        <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
        <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
    </head>
    <body>
        <div id="app">Loading...</div>

        <noscript>
            <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
        </noscript>
        <!-- built files will be auto injected -->
    </body>
</html>
```
        
## 3. Auth Guard
        
Path: /src/_helpers/auth.guard.js
Auth guard là một Vue Router Navigation Guard  giúp ngăn người dùng unauthenticated  truy cập các routes bị hạn chế. Nếu hàm trả về true, điều hướng được xác nhận và được phép tiếp tục, ngược lại nếu hàm trả về false, điều hướng sẽ bị hủy.

Vue router navigation guards được gắn vào routes trong cấu hình bộ định tuyến, bộ bảo vệ xác thực này được sử dụng trong router.js để bảo vệ home và chỉnh sửa account routes.
        
 ```php
import { accountService } from '@/_services';
import { router } from '@/_helpers';

export function authGuard(to) {
    const account = accountService.accountValue;
    if (account) {
        // logged in so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    router.push({ path: '/login', query: { returnUrl: to.fullPath } });
    return false;
}
```
        
## 4. Error Interceptor

Path: /src/_helpers/error.interceptor.js
        
Error Interceptor chặn các phản hồi http từ api để kiểm tra xem có bất kỳ lỗi nào không. Tất cả các lỗi đều được ghi vào bảng điều khiển và nếu có phản hồi 401 Unauthorized hoặc 403 Forbidden, tài khoản sẽ tự động bị đăng xuất khỏi ứng dụng.

Nó được triển khai như một bộ đánh chặn phản hồi axios, bằng cách chuyển các hàm gọi lại tới axios.interceptors.response.use (), bạn có thể chặn các phản hồi trước khi chúng được xử lý bởi then () hoặc catch (). Hàm callback đầu tiên chặn các phản hồi thành công và hàm callback thứ hai chặn các phản hồi lỗi. Để biết thêm thông tin về bộ chặn axios, hãy xem https://github.com/axios/axios#interceptors.

Trình chặn lỗi được khởi chạy khi khởi động ứng dụng trong tệp main.js.
        
##  5. Fake Backend
Path: /src/_helpers/fake-backend.js
        
Để chạy ứng dụng Vue 3 mà không có API backend, ví dụ này sẽ fake backend bằng cách chặn các yêu cầu HTTP từ ứng dụng Vue và gửi lại các phản hồi "fake". Điều này được thực hiện bằng cách return fake responses khi gọi các request (get, post, put, delete) của axios.
        
Fake backend được viết thành một hàm handleRoute() để kiểm tra những request url và các phương thức để xác định cách những yêu cầu xử lý. Đối với các fake routes, một trong các hàm router sẽ được gọi, còn đối với tất cả các routes còn lại, yêu cầu được chuyển tiếp bằng cách gọi axios request function (axios [`original $ {method}`] (url, body ( ))). Bên dưới các hàm router các hàm helper dùng để trả về các kiểu phản hồi khác nhau và thực hiện các tác vụ nhỏ. 
        
```php
 import axios from 'axios';

import { accountService } from '@/_services';

// array in local storage for accounts
const accountsKey = 'vue-3-facebook-login-accounts';
let accounts = JSON.parse(localStorage.getItem(accountsKey)) || [];

export function fakeBackend() {
    const methods = ['get', 'post', 'put', 'delete'];
    methods.forEach(method => {
        axios[`original${method}`] = axios[method];
        axios[method] = function (url, ...params) {
            return new Promise((resolve, reject) => {
                return handleRoute();

                function handleRoute() {
                    switch (true) {
                        case url.endsWith('/accounts/authenticate') && method === 'post':
                            return authenticate();
                        case url.endsWith('/accounts') && method === 'get':
                            return getAccounts();
                        case url.match(/\/accounts\/\d+$/) && method === 'get':
                            return getAccountById();
                        case url.match(/\/accounts\/\d+$/) && method === 'put':
                            return updateAccount();
                        case url.match(/\/accounts\/\d+$/) && method === 'delete':
                            return deleteAccount();
                        default:
                            // pass through any requests not handled above
                            return axios[`original${method}`](url, body())
                                .then(response => resolve(response))
                                .catch(error => reject(error));
                    }
                }

                // route functions

                function authenticate() {
                    const { accessToken } = body();

                    axios.get(`https://graph.facebook.com/v8.0/me?access_token=${accessToken}`)
                        .then(response => {
                            const { data } = response;
                            if (data.error) return unauthorized(data.error.message);

                            let account = accounts.find(x => x.facebookId === data.id);
                            if (!account) {
                                // create new account if first time logging in
                                account = {
                                    id: newAccountId(),
                                    facebookId: data.id,
                                    name: data.name,
                                    extraInfo: `This is some extra info about ${data.name} that is saved in the API`
                                }
                                accounts.push(account);
                                localStorage.setItem(accountsKey, JSON.stringify(accounts));
                            }

                            return ok({
                                ...account,
                                token: generateJwtToken(account)
                            });
                        });
                }
    
                function getAccounts() {
                    if (!isLoggedIn()) return unauthorized();
                    return ok(accounts);
                }

                function getAccountById() {
                    if (!isLoggedIn()) return unauthorized();

                    let account = accounts.find(x => x.id === idFromUrl());
                    return ok(account);
                }

                function updateAccount() {
                    if (!isLoggedIn()) return unauthorized();

                    let params = body();
                    let account = accounts.find(x => x.id === idFromUrl());

                    // update and save account
                    Object.assign(account, params);
                    localStorage.setItem(accountsKey, JSON.stringify(accounts));

                    return ok(account);
                }

                function deleteAccount() {
                    if (!isLoggedIn()) return unauthorized();

                    // delete account then save
                    accounts = accounts.filter(x => x.id !== idFromUrl());
                    localStorage.setItem(accountsKey, JSON.stringify(accounts));
                    return ok();
                }

                // helper functions
    
                function ok(body) {
                    // wrap in timeout to simulate server api call
                    setTimeout(() => resolve({ status: 200, data: body }), 500);
                }
    
                function unauthorized() {
                    setTimeout(() => {
                        const response = { status: 401, data: { message: 'Unauthorized' } };
                        reject(response);
                        
                        // manually trigger error interceptor
                        const errorInterceptor = axios.interceptors.response.handlers[0].rejected;
                        errorInterceptor({ response });
                    }, 500);
                }
    
                function isLoggedIn() {
                    return accountService.accountValue;
                }

                function idFromUrl() {
                    const urlParts = url.split('/');
                    return parseInt(urlParts[urlParts.length - 1]);
                }

                function body() {
                    if (['post', 'put'].includes(method))
                        return params[0];
                }
                
                function newAccountId() {
                    return accounts.length ? Math.max(...accounts.map(x => x.id)) + 1 : 1;
                }
    
                function generateJwtToken(account) {
                    // create token that expires in 15 minutes
                    const tokenPayload = { 
                        exp: Math.round(new Date(Date.now() + 15*60*1000).getTime() / 1000),
                        id: account.id
                    }
                    return `fake-jwt-token.${btoa(JSON.stringify(tokenPayload))}`;
                }
            });
        }
    });
}
```
        
## 6. Init Facebook SDK
Path: /src/_helpers/init-facebook-sdk.js
  
Chức năng init Facebook SDK được chạy trước khi ứng dụng Vue 3 khởi động trong main.js, nó tải và khởi chạy SDK Facebook và lấy trạng thái đăng nhập của người dùng từ Facebook. Nếu người dùng đã đăng nhập bằng Facebook, họ sẽ tự động đăng nhập vào ứng dụng Vue bằng mã thông báo truy cập Facebook và được đưa đến trang chủ, nếu không, ứng dụng sẽ khởi động bình thường và hiển thị trang đăng nhập. 
   
```php
 import { accountService } from '@/_services';

const facebookAppId = process.env.VUE_APP_FACEBOOK_APP_ID;

export function initFacebookSdk() {
    return new Promise(resolve => {
        // wait for facebook sdk to initialize before starting the vue app
        window.fbAsyncInit = function () {
            FB.init({
                appId: facebookAppId,
                cookie: true,
                xfbml: true,
                version: 'v8.0'
            });

            // auto authenticate with the api if already logged in with facebook
            FB.getLoginStatus(({ authResponse }) => {
                if (authResponse) {
                    accountService.apiAuthenticate(authResponse.accessToken).then(resolve);
                } else {
                    resolve();
                }
            });
        };

        // load facebook sdk script
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));    
    });
}
```
## 7. JWT Interceptor
Path: /src/_helpers/jwt.interceptor.js
        
JWT Interceptor chặn các yêu cầu http từ ứng dụng để thêm một JWT access token vào Authorization header nếu người dùng đã đăng nhập và yêu cầu một api url của ứng dụng Vue (process.env.VUE_APP_API_URL).

Nó được triển khai như một bộ đánh chặn khi có yêu cầu đến axios, bằng cách chuyền một hàm callback tới axios.interceptors.request.use (), bạn có thể chặn các yêu cầu trước khi chúng được gửi đến máy chủ. Để biết thêm thông tin về bộ chặn axios, hãy xem https://github.com/axios/axios#interceptors.

Bộ đánh chặn jwt được khởi chạy khi khởi động ứng dụng trong tệp main.js. 
      
```php
 import axios from 'axios';

import { accountService } from '@/_services';

export function jwtInterceptor() {
    axios.interceptors.request.use(request => {
        // add auth header with jwt if account is logged in and request is to the api url
        const account = accountService.accountValue;
        const isLoggedIn = account?.token;
        const isApiUrl = request.url.startsWith(process.env.VUE_APP_API_URL);

        if (isLoggedIn && isApiUrl) {
            request.headers.common.Authorization = `Bearer ${account.token}`;
        }

        return request;
    });
}
```
# VI. Kết luận
Như vậy mình mới thực hành qua phần khởi tạo app vue 3, phần fake backend cũng như phần auth cho app. Ở phần tiếp theo mình sẽ hướng dẫn tiếp phần tạo router, xây dựng các hàm cũng như hoàn thiện ứng dụng.
        
Các bạn có thể xem chi tiết bài viết ở đây: https://jasonwatmore.com/post/2020/10/06/vue-3-facebook-login-tutorial-example