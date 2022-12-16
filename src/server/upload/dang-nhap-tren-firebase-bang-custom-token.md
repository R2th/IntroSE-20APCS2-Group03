# Giới thiệu
Trong sử dụng **Firebase Realtime Database**, sẽ có lúc chúng ta cần bắt buộc người dùng phải đăng nhập vào hệ thống Firebase mới có quyền đọc/ghi dữ liệu. Bởi nếu không, cứ ai có thông tin config về tài khoản firebase của bạn đều có thể làm việc này, dẫn đến nguy cơ mất an toàn về bảo mật thông tin và có thể mất dữ liệu bất cứ lúc nào. Firebase cung cấp cho chúng ta nhiều cơ chế đăng nhập khác nhau, như đăng nhập bằng password, email, Google, Facebook, Twitter, Github, Phone Number, Anonymous (đăng nhập ẩn danh), ...

Nhưng hôm nay, mình xin giới thiệu tới các bạn cơ chế đăng nhập trên firebase bằng `custom token` trên PHP (Laravel 5.6) mà mình đã áp dụng thành công vào dự án của mình.

# Chuẩn bị
**Firebase** cung cấp cho bạn quyền xác thực bằng cách sử dụng **JWT**. Bạn có thể tạo JWT token trên server của bạn, truyền token đó cho client và sau đó sử dụng nó để xác thực thông qua phương thức `signInWithCustomToken()`.

Sau khi đã được xác thực, người dùng sẽ được sử dụng để truy cập các dịch vụ khác của Firebase, như `Realtime Database Firebase` và `Cloud Storage`. 

Để tạo custom token, bạn phải có thông tin `Service Accounts`. Bạn có thể vào trong **Project Setting** -> tab **Service Accounts** -> nhấn nút **Generate New Private Key** để download file json chứa thông tin Service Accounts về.
![](https://images.viblo.asia/5b9cefc8-de30-4f11-9967-6032dc73b5c2.png)

# Tạo custom token
Để tạo custom token trên server, chúng ta cần cài [Firebase PHP SDK](https://firebase-php.readthedocs.io/en/latest/overview.html#installation) vào project:
```sh
composer require kreait/firebase-php ^4.0
```
Có một điểm mà mình thấy firebase nó hơi "tù" ở chỗ là mỗi token này, chỉ có giới hạn **1 giờ** (60 phút). Sau thời gian này, bạn sẽ không thể sử dụng token này để đăng nhập được nữa. Nếu theo cơ chế bình thường thì chúng ta có thể tạo token mới bằng cách refresh token. Nhưng theo như mình tìm hiểu thì hiện tại firebase không có refresh token nên không làm được như cơ chế Authenticate mà chúng ta vẫn thường làm.
Cách mình xử lý sau khi token hết hạn (quá 1 giờ) đó là server sẽ tạo lại token mới, rồi lại truyền cho client xác thực lại.

Thôi, giờ chúng ta sẽ tạo custom token xem nó ra cái gì đã nhé.

```
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;
use Exception;
...

public function createCustomToken($uid, array $additionalClaims = [])
{
        try {
            $jsonFile = '/path/to/service_accounts.json'; // đường dẫn file json chứa thông tin service accounts mà chúng ta vừa tải về
            $serviceAccount = ServiceAccount::fromJsonFile(base_path($jsonFile)); // Load file service account json
            $firebase = (new Factory)
                ->withServiceAccount($serviceAccount)
                ->withDatabaseUri('https://app-cua-ban.firebaseio.com') // Database Uri bạn lấy ở trong Web Setup (trong tab Authentication) của firebase nhé
                ->create(); // Khởi tạo firebase
            $auth = $firebase->getAuth(); // Khởi tạo firebase authenticate
            $customToken = $auth->createCustomToken($uid, $additionalClaims); // Tạo custom token dựa vào uid, additionalClaims là các thông tin bạn cần để check thêm ví dụ tài khoản premiumAccount chẳng hạn
         } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
        return (string) $customToken;
}
```
Bạn cần cung cấp `uid` (user id trên firebase), có thể là bất kỳ chuỗi ký tự nào nhưng nó là cơ sở duy nhất để xác định xem người dùng đã đăng nhập hay chưa. 
Ví dụ trong database của mình có bảng `members` như thế này, và mình cần xác thực thông tin của các member thì mình cần truyền uid là key của nó. Như trong ảnh, mình sẽ truyền uid là '-LDLrwZnJ0kI4kvyIb2Q' vào hàm `createCustomToken('-LDLrwZnJ0kI4kvyIb2Q')`.
![](https://images.viblo.asia/38143e26-c0e0-433f-9650-826d1d15d1ce.png)


Mình chạy thử tạo custom token, nó sinh ra 1 token như thế này:
![](https://images.viblo.asia/b1927d6a-2ec5-4d9d-992e-ded0f832a1a2.png)


Bạn có thể thử xem token này có cấu trúc như thế nào, có dữ liệu gì bên trong có thể paste nó vào trang http://jwt.io.
![](https://images.viblo.asia/6266f35d-20ab-442f-bea7-e6dce33665be.png)

Bạn để ý sẽ thấy, token của mình có chứa nhiều thông tin, trong đó có:
```json
"uid": "-LDLrwZnJ0kI4kvyIb2Q", // uid mà chúng ta truyền vào cần xác thực
"iat": 1528687645, // thời gian tạo ra token này
"exp": 1528691245 // thời điểm token hết hạn (1 giờ kể từ khi token được tạo)
```
# Xác thực tài khoản
Với mỗi một user sau khi đăng nhập, chúng ta sẽ cấp cho nó 1 custom token. Mỗi user khi muốn sử dụng firebase (đọc/ghi dữ liệu) sẽ truyền custom token mà nó được cấp để firebase xác thực. Việc làm này chúng ta sẽ làm bên phía client.

Đầu tiên, chúng ta cần khởi tạo firebase bằng các thông tin config được lấy trong `Web Setup`.
```js
firebase.initializeApp({
      apiKey: firebaseConfig.api_key,
      authDomain: firebaseConfig.auth_domain,
      databaseURL: firebaseConfig.database_url,
      storageBucket: firebaseConfig.storage_bucket
});
```
Sau khi khởi tạo firebase xong, chúng ta tiến hành đăng nhập với custom token bằng cách sử dụng phương thức `signInWithCustomToken()`
```js
firebase.auth().signInWithCustomToken(token) // token này được truyền từ server xuống client (từ file blade của Laravel vào file js)
.then(function () {
    alert('Đăng nhập thành công');
})
.catch(function(error) {
      if (error.code === 'auth/invalid-custom-token') {
          alert('Hết hạn đăng nhập');
      } else {
          alert('Lỗi xác thực');
      }
});
```
Và đây là kết quả sau khi mình đăng nhập thành công với token được truyền từ server xuống:
![](https://images.viblo.asia/1a1697ad-e61b-4bf8-b5a8-3cdf2699a391.png)

Trong ví dụ này, khi có lỗi token hoặc hết hạn (sau 1 giờ) thì cũng sẽ có alert hiện lên.

Sau khi đăng nhập xong, bạn vào tab **Authentication** trong trang quản trị firebase, sẽ thấy UID mà mình vừa đăng nhập xong:
![](https://images.viblo.asia/0f420b30-e4d4-4526-965e-a9d3f17ad642.png)
# Áp dụng rule
Để chứng năng đăng nhập trong firebase của chúng ta có ý nghĩa, thì chúng ta cần áp dụng nó để giới hạn quyền đọc/ghi dữ liệu, bạn cần đặt rule cho firebase của mình.

Ví dụ trong database của mình có bảng `messages` như thế này.

![](https://images.viblo.asia/4a95b200-97f9-417d-9420-26099ca7586e.png)

Khi muốn ai có quyền đăng nhập vào firebase thì mới có quyền đọc/ghi trong bảng này, chúng ta vào tab **Rules** và check quyền đăng nhập đơn giản như sau:
```json
{
  "rules": {
        "messages": {
            ".read": "auth != null",
            ".write": "auth != null",
        }
  	}
}
```
Ngoài ra, để tìm hiểu về check rule auth sâu hơn nữa, như user đăng nhập phải là uid = abc chẳng hạn thì chúng ta có thể sử dụng:
```json
{
  "rules": {
        "messages": {
            ".read": "auth != null && auth.uid = abc",
            ".write": "auth != null && auth.uid = abc",
        }
  	}
}
```
Để tìm hiểu thêm về firebase rule, bạn có thể [tham khảo thêm tại đây](https://firebase.google.com/docs/database/security/).

# Kết luận
Trên đây là những hiểu biết còn ít ỏi của mình về firebase, mình cũng đã áp dụng thành công phương pháp đăng nhập trên firebase bằng custom token này vào dự án của mình rồi sau đó check quyền bằng rule để xem nó có được đọc/ghi dữ liệu hay không.
Hi vọng bài viết của mình sẽ giúp ích cho các bạn. Cám ơn các bạn đã đọc bài viết.

# Tham khảo
https://firebase.google.com/docs/auth/admin/create-custom-tokens

https://firebase-php.readthedocs.io/en/latest

https://firebase.google.com/docs/database/security/