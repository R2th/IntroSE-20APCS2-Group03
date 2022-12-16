**Đăng nhập/Đăng ký với Google**

Sơ đồ sau đây cho thấy flow Đăng nhập với Google, tuy nhiên chúng ta sẽ chia việc này thành hai trường hợp:

* **Kịch bản 1**: đó là flow bạn thấy ở dưới, frontend là Vue, Backend là Sails.js, xác thực thực hiện ở một số phần ở cả hai phía.
* **Kịch bản 2**: Chúng tôi xử lý OAuth2 hoàn toàn trên Frontend và chỉ cho phép call với Backend khi xác thực thành công.

![](https://images.viblo.asia/8a818994-8aa5-4c5b-849f-5bec1804be4f.png)

**Cấu hình Google OAuth**

Trước khi bắt đầu, chúng ta phải đảm bảo Google được cấu hình đúng cho ứng dụng mới của bạn. Truy cập [Google API Console](https://console.developers.google.com/) để có được thông tin xác thực OAuth 2.0 như **Client ID** và **Client Secret** được cả Google và ứng dụng của chúng ta biết đến.

* Đăng nhập vào [Google Developer Console](https://console.developers.google.com/)
* Nhấp vào **Select a Project** và chọn **New Project** trong menu đổ xuống.
* Đặt tên dự án mà bạn muốn, tôi đặt là **Google-oauth2**, nhấp Create.
* Khi dự án được tạo (mất vài giây), hãy sử dụng lại bộ chọn dự án và chọn dự án mới tạo của bạn.

![](https://images.viblo.asia/781399fd-7418-435d-ab2c-84f5fb604348.png)

* Bây giờ bạn phải thêm các API có sẵn. Chọn và mở **Library** trong menu bên trái.
* Mở và bật **Google + API** và **API Google Analytics**

![](https://images.viblo.asia/db1170d3-0a1f-498b-8ec6-81782eeeac20.png)

![](https://images.viblo.asia/84891eea-e3a9-467b-80ee-312a0b4dfb76.png)

* Mở tab **Credentials**, nhấp vào **Create Credentials** và chọn **OAuth client ID** — Google cũng cung cấp trình hướng dẫn để giúp bạn đưa ra quyết định này nếu bạn muốn sử dụng Google Auth trong một bối cảnh khác.

![](https://images.viblo.asia/1b6690e3-37d6-4270-8616-dc1ba022745d.png)

* Bảng điều khiển API mở ra, nhấp vào **Credentials** trên Nav bên trái và chuyển sang tab **OAuth Consent Screen** - cung cấp tên ứng dụng và logo tùy chọn.

![](https://images.viblo.asia/58a1f27f-e860-436f-935c-8adfd5c8e4f9.png)

* Trên màn hình tiếp theo. Ở mục Application type chọn **Web application** và đặt tên — Tôi sử dụng **Google-oauth2**

![](https://images.viblo.asia/bfc3909c-24d8-4ca3-9482-9190c511c6b5.png)

* Ở mục **Authorized JavaScript origins** điền  http://localhost:8080  và ở mục **Authorized redirect URIs** thêm http://localhost:8080/callback và nhấp nút **Create** 

![](https://images.viblo.asia/537931e8-267a-4015-b26f-6ff1e1610614.png)

* Cuối cùng, một cửa sổ bật lên chứa **Client ID** và **Client Secret**, sao chép các giá trị đó, chúng ta sẽ cần chúng trong code của chúng ta.

![](https://images.viblo.asia/bdf9b121-0b1d-44a4-8251-aaba9944349f.png)

**Tạo Frontend và Trang Login**

Chúng tôi đã tạo trang Đăng nhập và Đăng ký mẫu tại đây  [github] (https://github.com/Jebasuthan/Vue-Facebook-Google-oAuth).

Build frontend trong **src** với `npm` và  `npm run serve` sẽ cung cấp trang đích tại đường dẫn sau: `localhost:8080/login`

Đăng nhập với Facebook/Google
![](https://images.viblo.asia/fcbe9082-0871-4bd3-bf96-107b018cd303.png)

Trong **frontend**, mở **main.js** và thay đổi như sau:

```php
import GoogleAuth from '@/config/google.js'
const gauthOption = {
  clientId: 'xxxxxxxxxxx.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GoogleAuth, gauthOption)
```

Khi bạn đã khởi tạo cài đặt googleauth trong vue **main.js**, trong components đăng nhập, bạn cần thêm sự kiện nhấp để đăng nhập 

```php
<template>
  <div class="signup-buttons">
    <a href="#" class="google-signup" @click.prevent="loginWithGoogle">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><title>Google</title><g fill="none" fill-rule="evenodd"><path fill="#4285F4" d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"></path><path fill="#34A853" d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z"></path><path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71z"></path><path fill="#EA4335" d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z"></path></g></svg>
      Google
    </a>
  </div>
</template>

<script>
import router from '@/router/router'
export default {
  name: 'login_signup_social',
  methods: {
    loginWithGoogle () {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          // on success do something
          console.log('GoogleUser', GoogleUser)
          var userInfo = {
            loginType: 'google',
            google: GoogleUser
          }
          this.$store.commit('setLoginUser', userInfo)
          router.push('/home')
        })
        .catch(error => {
          console.log('error', error)
        })
    }
  }
}
</script>

<style>

</style>
```

Khi chạy giao diện người dùng, sử dụng lệnh  `npm run serve` sau khi nhấp vào nút Đăng nhập/Đăng ký sử dụng Google, bạn sẽ nhận được **accessToken**.

Bây giờ bạn đã có **accessToken** từ Google. Bạn phải pass qua  **accessToken** để backend api có đủ thông tin về người dùng đăng nhập Google’s sử dụng **OAuth2Client**.

Trong backend  **SailsJS**, mở **google-login.js** và thay đổi:

```php
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('xxxxxxxxxxxxx.apps.googleusercontent.com');
const ticket = await client.verifyIdToken({
  idToken: inputs.accessToken,
  audience: 'xxxxx.apps.googleusercontent.com'
});
const payload= ticket.getPayload();
console.log('Google payload is '+JSON.stringify(payload));
const userid = payload['sub'];
let email = payload['email'];
let emailVerified = payload['email_verified'];
let name = payload["name"];
let pictureUrl = payload["picture"];
```

Khi bạn đã thực hiện xong, hãy restart và load lại trang login: http://localhost:8080/login

![](https://images.viblo.asia/1ac516c0-0796-4fd8-aeff-5ec9f692965b.png)

Khi click vào nút **Google**, Google Auth được thực hiện trên một cửa sổ bật lên riêng biệt cho phép nhập thông tin đăng nhập Google để xác thực ứng dụng:

![](https://images.viblo.asia/e5640cd7-9132-467f-bc45-a964e0a38f95.png)

Sau khi bạn đã cung cấp thông tin đăng nhập Google của mình, frontend hiện chạy logic xác thực sau:

* **Kịch bản 1**: VueJS login component nhận **authorization code** từ google và gọi **Sails** backend trong  http://localhost:8080/login. Ở đó **authorization code** được dùng để truy xuất **access_token, refresh_token, id_token** và **scope**. Người dùng được đưa lại giao diện sử dụng **Vuex** để cuối cùng người dùng đăng nhập vào trang đích.
* **Kịch bản 2**: Các bước từ Kịch bản 1 chỉ được thực hiện trên giao diện mà không call gì đến backend.
Bạn có thể checkout từ [github souce code](https://github.com/Jebasuthan/Vue-Facebook-Google-oAuth)

Nguồn: https://medium.com/@itjebasuthan_90100/signup-with-google-using-vuejs-11c9d4428250