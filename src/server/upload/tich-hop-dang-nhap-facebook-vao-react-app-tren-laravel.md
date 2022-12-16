Cùng viết chức năng đăng nhập facebook trên React app sử dụng Facebook javascript sdk. Client sẽ sử dùng sdk lấy access token và gửi lên server. Server sẽ dùng access token đó để lấy thông tin của user và xử lý đăng nhập. Cùng bắt đầu nào.
## Cài đặt laravel
```
composer create-project --prefer-dist laravel/laravel fblogin
```
phía server sẽ dùng `laravel/socialite` để xử lý access token client gửi lên
```
composer require laravel/socialite
```
## Tạo ứng dụng facebook
Vào https://developers.facebook.com/ và tạo 1 ứng dụng mới
![](https://images.viblo.asia/df6ced2b-3e02-4224-9734-9df4fed925b2.png)
Sau đó thì cài đặt thêm tên miền cho ứng dụng
![](https://images.viblo.asia/71d2c67f-cbc9-43c3-b525-97da0c47f46c.png)
Kế tiếp là thêm đoạn mã mà facebook cung cấp vào html file. Thay {your-app-id} bằng id của ứng dụng và {api-version} là v3.1
```

<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{your-app-id}',
      cookie     : true,
      xfbml      : true,
      version    : '{api-version}'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>
```
Sau đó vào file view và thêm nút login facebook. 
```
onClick = (event) => {
    event.preventDefault()
    window.FB.getLoginStatus((response) => {
      console.log(response.status)
      if (response.status !== 'connected') {
        return window.FB.login((res) => {
          if (res.status === 'not_authorized') {
            return
          }
          const accessToken = res.authResponse.accessToken
          this.fbLogin(accessToken)
        }, {scope: 'email'})
      }
      const accessToken = response.authResponse.accessToken
      this.fbLogin(accessToken)
    })
}
```

Xử lý gửi access token lên server
```
fbLogin = (token) => {
    axios.post('/login-fb', {
      token
    }).then(({data}) => {
      console.log(data)
      alert('Đăng nhập thành công')
    }).catch(error => {
      console.log(error)
    })
}
```

## Xử lý bên server
như code ở trên thì sẽ gửi token kên route `/login-fb`. Giờ sẽ tạo route và controller
### Sửa file config
Để sử dụng `laravel socialite` cần phải config client id và secret. Mở file `config/services.php` và thêm client_id, client_secret, redirect vào
```
'facebook' => [
    'client_id' => env('FACEBOOK_CLIENT_ID'),
    'client_secret' => env('FACEBOOK_CLIENT_SECRET'),
    'redirect' => env('FACEBOOK_REDIRECT_URL')
],
```
### Xử lý ở Controller
Bây giờ thì sẽ dùng token và lấy thông tin user ở Controller
```
public function fbLogin(Request $request)
    {
        //Validate
        $user = Socialite::driver('facebook')->userFromToken($request->get('token'));
        //kiểm tra user trong database, tạo jwt token, các thứ, các thứ...
        return response()->json($user);
    }
```
## Kết Quả
Đây là thành quả sau khi thành công
![](https://images.viblo.asia/720ba876-e8a1-49f6-ab47-d7d164786566.png)