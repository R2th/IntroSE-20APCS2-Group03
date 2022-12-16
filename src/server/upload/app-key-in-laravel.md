Một project Laravel khi mới được tạo luôn có 1 đoạn mã APP_KEY trong file `.env`. 
Hoặc mỗi khi bạn clone 1 project Laravel có sẵn về, công việc quan trọng đầu tiên là chạy lệnh `php artisan key:generate` để tạo APP_KEY. Vậy có bao giờ các bạn tự đặt câu hỏi APP_KEY này dùng để làm gì, và nó quan trọng như thế nào không? Bài viết này hy vọng sẽ giúp bạn trả lời câu hỏi này.
## 1. APP_KEY là gì?
APP_KEY là một chuỗi 32 ký tự ngẫu nhiên được lưu trữ trong biến APP_KEY trong file `.env`. Khi tạo 1 project mới, key này sẽ tự động được tạo ra. Nhưng nếu bạn clone hoặc copy 1 project thì sẽ không có key này. Khi đó, bạn có thể thấy lỗi này:

![](https://images.viblo.asia/68cb8dd1-0559-4b4d-8f60-d1d81bf78c57.png)

Để tạo một khóa mới,  bạn có thể chạy `php artisan key:generate` để có Laravel tạo và chèn một APP_KEY tự động trong file `.env`.

## 2. Ý nghĩa của APP_KEY 
Laravel sử dụng APP_KEY được sử dụng để giữ cho cookie và dữ liệu được mã hóa khác an toàn , bao gồm session cookie, trước khi chuyển chúng cho trình duyệt của người dùng và sử dụng nó để giải mã cookie đọc từ trình duyệt. Điều này ngăn user thực hiện thay đổi đối với cookie và tự cấp quyền cho quản trị viên hoặc mạo danh người dùng khác trong ứng dụng của bạn. Cookie được mã hóa là một tính năng bảo mật quan trọng trong Laravel.

Tất cả các mã hóa và giải mã này được xử lý trong Laravel bằng Encrypter sử dụng các công cụ bảo mật tích hợp của PHP, bao gồm OpenSSL. Mình sẽ không viết kỹ về cách mã hóa hoạt động ở đây, các bạn có thể tự đọc thêm về triển khai PHP của OpenSSL và chức năng openssl_encrypt.

Hàm mã hóa trong file *Encrypter.php:*
```
/**
     * Encrypt the given value.
     *
     * @param  mixed  $value
     * @param  bool  $serialize
     * @return string
     *
     * @throws \Illuminate\Contracts\Encryption\EncryptException
     */
    public function encrypt($value, $serialize = true)
    {
        $iv = random_bytes(openssl_cipher_iv_length($this->cipher));

        // First we will encrypt the value using OpenSSL. After this is encrypted we
        // will proceed to calculating a MAC for the encrypted value so that this
        // value can be verified later as not having been changed by the users.
        $value = \openssl_encrypt(
            $serialize ? serialize($value) : $value,
            $this->cipher, $this->key, 0, $iv
        );

        if ($value === false) {
            throw new EncryptException('Could not encrypt the data.');
        }

        // Once we get the encrypted value we'll go ahead and base64_encode the input
        // vector and create the MAC for the encrypted value so we can then verify
        // its authenticity. Then, we'll JSON the data into the "payload" array.
        $mac = $this->hash($iv = base64_encode($iv), $value);

        $json = json_encode(compact('iv', 'value', 'mac'));

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new EncryptException('Could not encrypt the data.');
        }

        return base64_encode($json);
    }
```
**Dùng cho session:**
```
/**
 * Prepare the serialized session data for storage.
 *
 * @param  string  $data
 * @return string
 */
protected function prepareForStorage($data)
{
    return $this->encrypter->encrypt($data);
}
```

**Dùng cho cookie:**
```
/**
 * Encrypt the cookies on an outgoing response.
 *
 * @param  \Symfony\Component\HttpFoundation\Response  $response
 * @return \Symfony\Component\HttpFoundation\Response
 */
protected function encrypt(Response $response)
{
    foreach ($response->headers->getCookies() as $cookie) {
        if ($this->isDisabled($cookie->getName())) {
            continue;
        }

        $response->headers->setCookie($this->duplicate(
            $cookie, $this->encrypter->encrypt($cookie->getValue(), static::serialized($cookie->getName()))
        ));
    }

    return $response;
}
```
## 3. Password và APP_KEY
Có một số quan niệm sai lầm khi cho rằng APP_KEY liên quan đến mã hóa mật khẩu. Cần phân biệt rõ ở đây: **mật khẩu của Laravel được băm** bằng cách sử dụng `Hash::make()` hoặc `bcrypt()`, **không sử dụng APP_KEY**. Chúng ta hãy xem mã hóa và băm trong Laravel.

### 3.1. Mã hóa
Mã hóa là khi bạn có một dữ liệu và bạn muốn bảo vệ nó. Khi đó, bạn lấy dữ liệu gốc, mã hóa nó bằng `khóa và mật mã (key và ciphers)` để nó biến thành chuỗi không có ý nghĩa. Chuỗi trực tiếp tạo ra dữ liệu gốc. Khi cần, bạn có thể dùng `khóa và mật mã`, giải mã giá trị được mã hóa này để truy xuất lại nó ở trạng thái ban đầu. Trong trường hợp này, key và ciphers rất quan trọng vì chúng được sử dụng trong giải mã. Và KHÔNG nên được giải thích.

Laravel có `Crypt facade`  giúp chúng tôi thực hiện mã hóa và giải mã.

Laravel sử dụng cùng một phương pháp này cho cookie, cả người gửi và người nhận, sử dụng APP_KEY làm khóa mã hóa. Cookie phản hồi được mã hóa, gửi cho người dùng, đọc lại trong một request trong tương lai và được giải mã, tất cả đều sử dụng cùng một khóa ứng dụng.
### 3.2. Băm
Băm đơn giản là mã hóa một chiều. Khi bạn dùng băm, bạn KHÔNG thể giải mã nó về trạng thái ban đầu. Bạn có thể kiểm tra xem hàm băm có khớp với giá trị đơn giản nào đó, để xác định giá trị ban đầu của nó. Đó là cách an toàn hơn với thông tin nhạy cảm như mật khẩu người dùng.

Laravel có `Hash facade` giúp chúng ta thực hiện mã hóa băm một chiều.

Tóm lại: APP_KEY KHÔNG sử dụng trong Băm và nó được sử dụng trong mã hóa. Vì vậy, bảo mật mật khẩu của bạn KHÔNG phụ thuộc vào APP_KEY. Trong khi đó, bất kỳ dữ liệu nào về ứng dụng của bạn mà đã được mã hóa thì sẽ phụ thuộc vào APP_KEY.
## 4. Thay đổi APP_KEY (Rotating the key)
Bất khì chiến lược quản lý thông tin nào cũng nên được **rotating**: **thay đổi khóa và mật khẩu một cách thường xuyên** (VD: cứ sau 6 tháng) hoặc trong các tình huống cụ thể (VD: một nhân viên rời khỏi công ty).

Tất nhiên, APP_KEY cũng cần phải được rotating. Trước khi đi sâu vào cách thay đổi APP_KEY, điều quan trọng là phải biết điều gì sẽ xảy ra nếu thay đổi nó. Khi APP_KEY được thay đổi trong một ứng dụng hiện có:

* Phiên người dùng hiện tại sẽ bị vô hiệu. Do đó, tất cả người dùng đang đăng nhập  sẽ được đăng xuất. Vì vậy, nên chọn thời gian thay đổi thích hợp, giảm ảnh hưởng đến users.
* Bất kỳ dữ liệu nào trong ứng dụng mà bạn đã mã hóa bằng chức năng **`Crypt facade`** hoặc **`encrypt() helper`** sẽ không còn được giải mã vì mã hóa sử dụng APP_KEY.
* Mật khẩu người dùng sẽ KHÔNG bị ảnh hưởng vì vậy không cần phải lo lắng về điều đó.
* Nếu bạn có nhiều máy chủ ứng dụng đang chạy, tất cả sẽ được thay thế bằng cùng một APP_KEY.

Như vậy, bạn có thể tưởng tượng điều đau đầu nhất khi thay đổi APP_KEY là **xử lý dữ liệu được mã hóa bằng khóa ứng dụng cũ**. Vì vậy, trước tiên bạn cần giải mã dữ liệu bằng APP_KEY cũ và sau đó mã hóa lại bằng APP_KEY mới. :(

Trong bài viết mình tham khảo có giới thiệu 1 **package** trợ giúp việc này, bạn tham khảo [ở đây](https://github.com/techsemicolon/laravel-app-key-rotation) nhé. Sau đó thực hiện:
- Run `php artisan down` để user không tương tác được cho đến khi bạn đổi xong key.
- Copy  APP_KEY cũ
- Run `php artisan key:generate` để tạo APP_KEY mới
- Run  `php artisan encryption:rotate --oldappkey=your_old_app_key_value` để mã hóa lại dữ liệu.
- Thay đổi  APP_KEY ở tất cả máy chủ còn lại.
- Run `php artisan config:clear` 
- Run `php artisan cache:clear` 
- Run `php artisan view:clear` 
- Run `php artisan up` 

Như vậy là xong. Bạn nên cân nhắc về việc thay đổi key thường xuyên nhé.
## Tổng kết
Trong bài viết này, mình đã ghi rõ về định nghĩa, ý nghĩa của APP_KEY, phân biệt mã hóa và băm dữ liệu, cách để thay đổi APP_KEY. Cảm ơn bạn đã đọc và hy vọng bài viết này có thể giúp ích cho bạn trong quá trình làm ứng dụng với Laravel. :)))
## Tài liệu tham khảo
https://techsemicolon.github.io/blog/2019/06/14/laravel-app-key-rotation-policy-for-security/

https://tighten.co/blog/app-key-and-you

https://stackoverflow.com/questions/38980861/laravels-application-key-what-it-is-and-how-it-works