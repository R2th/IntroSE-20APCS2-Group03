Ở phần trước mình có tìm hiểu về [Tổng quan về Authenticating Users với Sign in bằng Apple](https://viblo.asia/p/sign-in-with-apple-rest-api-phan-1-L4x5xaE1KBM).
Hôm nay, mình sẽ trình bày rõ về Generate and Validate Tokens khi Sign in with Apple.

Việc xác thực grant code được gởi từ app của bạn nhằm để nhận được obitan tokens, hoặc xác thực refresh token đã tồn tại bằng cách call api sau:
 
**URL**

`POST https://appleid.apple.com/auth/token`

**HTTP Body**

Form-data
Content-Type: application/x-www-form-urlencoded
List input parameters cần để validate authorization code hoặc refresh token.

**Parts**

[client_id](https://viblo.asia/p/sign-in-with-apple-rest-api-phan-2-XL6lA26r5ek#_client_id--redirect_uri-3): string
(Required) Tham số này là bắt buộc cho cả authorization code và refresh token.

[client_secret](https://viblo.asia/p/sign-in-with-apple-rest-api-phan-2-XL6lA26r5ek#_client_secret-4): string
(Required)

`code`: string
authorization code được nhân từ authorization response gởi đến app của bạn. Code này chỉ được sử dụng một lần và hết hạn trong 5 phút. TRequired với trường hợp validate authorization code.

`grant_type`:string
(Required)
 Khi validate authorization code truyền authorization_code. Khi validate refresh token thì truyền refresh_token.
 
`refresh_token`: string
Required với trường hợp validate refresh token.

`redirect_uri`:string
URI đích được cung cấp trong authorization request khi ủy quyền cho người dùng với ứng dụng của bạn, nếu có. URI phải sử dụng giao thức HTTPS, bao gồm tên miền và không được chứa IP address hoặc localhost.

**Response Codes**
* Yêu cầu thành công:
200  [TokenResponse](https://developer.apple.com/documentation/sign_in_with_apple/tokenresponse)

    Content-Type: application/json

* Yêu cầu thất bại:
400 [ErrorResponse](https://developer.apple.com/documentation/sign_in_with_apple/errorresponse)

    Content-Type: application/json

## Validate the Authorization Grant Code
Parameters are required:

```
client_id
client_secret
code
grant_type
redirect_uri
```

> Lưu ý
> Tham số redirect_uri chỉ được yêu cầu nếu ứng dụng đã cung cấp redirect_uri trong authorization request ban đầu khi ủy quyền cho người dùng với ứng dụng của bạn.

cURL:
```
curl -v POST "https://appleid.apple.com/auth/token" \
-H 'content-type: application/x-www-form-urlencoded' \
-d 'client_id=CLIENT_ID' \
-d 'client_secret=CLIENT_SECRET' \
-d 'code=CODE' \
-d 'grant_type=authorization_code' \
-d 'redirect_uri=REDIRECT_URI'
```

Sau khi authorization code được validated, sẽ returns identity token, access token,  và refresh token.  Sử dụng refresh token để:
* Verify the user session from the server
* Obtain access tokens

## Validate an Existing Refresh Token
Parameters are required:
```
client_id
client_secret
grant_type
refresh_token
```
cURL:
```
curl -v POST "https://appleid.apple.com/auth/token" \
-H 'content-type: application/x-www-form-urlencoded' \
-d 'client_id=CLIENT_ID' \
-d 'client_secret=CLIENT_SECRET' \
-d 'grant_type=refresh_token' \
-d 'refresh_token=REFRESH_TOKEN'
```

## Chuẩn bị parameters:
###  client_id & redirect_uri
1. Log in [Apple’s Developer Center](https://developer.apple.com/)
2. Đến menu chọn [Certificates, Identifiers & Profiles ](https://developer.apple.com/account/resources/certificates/list) rồi chọn [Identifiers](https://developer.apple.com/account/resources/identifiers/list) 
3. Chọn **Services IDs**
![](https://images.viblo.asia/3a998af1-9589-4dc1-885c-296bbd86d788.png)

4. Đăng ký tên cho app để người dùng sẽ nhìn thấy trong quá trình đăng nhập.  Xác định identifier cũng chính là `client_id`.
5. Check vào **Sign In with Apple** checkbox.
![client_id](https://images.viblo.asia/7efaf01a-7671-4e9b-b3a1-d5bdfe012dfc.png)

6. Click button **Configure**. Đây là nơi bạn xác định domain mà ứng dụng của bạn đang chạy và chuyển hướng URL cho luồng OAuth. 
![redirect_uri](https://images.viblo.asia/537c8d62-864a-4b0f-bac5-08c70fbf7de7.png)

URL phải sử dụng giao thức HTTPS, bao gồm tên miền và không được chứa IP address hoặc localhost.
 
###  client_secret
1. Đến menu chọn [Certificates, Identifiers & Profiles ](https://developer.apple.com/account/resources/certificates/list) rồi chọn [Identifiers](https://developer.apple.com/account/resources/identifiers/list) 
2. Chọn [Key](https://developer.apple.com/account/resources/authkeys/list)
3. Click icon plus để register new key. Nhập name cho key và check vào **Sign In with Apple** checkbox
![](https://images.viblo.asia/0d1ebf1e-9ad0-4e19-ae28-5ce3d2c0cccb.png)
4. Click **Configure** button và chọn **primary App ID** bạn đã tạo trước đó.
![](https://images.viblo.asia/b9d3b220-a2e9-4d9e-9850-c294a433df4f.png)
5. Apple sẽ generate file new private key cho bạn và download nó chỉ được duy nhất 1 lần. Lưu ý phải lưu file này cẩn thận vì sẽ không thể lấy lại được. File bạn download sẽ có đuôi extension là .p8. Bạn cũng nhận được **Key ID** bên dưới Name key
![kid và file .p8](https://images.viblo.asia/38222bd4-4778-4e95-9e55-ab7a3005380f.png)
6. Lấy team_id:
* Đến menu chọn [Membership](https://developer.apple.com/account/#/membership/)
* Trong **Membership Information** lấy được **Team ID** và **Team Agent Apple ID (email)**
**Tạo Client Secret**
Client secret là một JWT có format gồm header và payload:
```
// Header
{
  "kid": "[KEY_ID]", // chứa 10 ký tự
  "alg": "ES256" // Thuật toán để sử dụng sign the token
}
// Payload
{
  "iss": "[TEAM_ID]",
  "iat": 1579087819, // Thời gian mà bạn generated the client secret, tính theo số giây kể từ Epoch, tính theo giờ UTC.
  "exp": 1594639819, // Thời gian hết hạn của client secret, giá trị không được lớn hơn 15777000 (6 tháng tính bằng giây) so với thời gian Current Unix Time trên server 
  "aud": "https://appleid.apple.com",
  "sub": "[CLIENT_ID]"
}
```

Ví dụ cách generate ra client_secret trong php:
```
/**
     * @param string $der
     * @param int    $partLength
     *
     * @return string
     */
    public function fromDER($der, $partLength)
    {
        $hex = unpack('H*', $der)[1];
        if ('30' !== mb_substr($hex, 0, 2, '8bit')) { // SEQUENCE
            throw new \RuntimeException();
        }
        if ('81' === mb_substr($hex, 2, 2, '8bit')) { // LENGTH > 128
            $hex = mb_substr($hex, 6, null, '8bit');
        } else {
            $hex = mb_substr($hex, 4, null, '8bit');
        }
        if ('02' !== mb_substr($hex, 0, 2, '8bit')) { // INTEGER
            throw new \RuntimeException();
        }
        $Rl = hexdec(mb_substr($hex, 2, 2, '8bit'));
        $R = $this->retrievePositiveInteger(mb_substr($hex, 4, $Rl * 2, '8bit'));
        $R = str_pad($R, $partLength, '0', STR_PAD_LEFT);
        $hex = mb_substr($hex, 4 + $Rl * 2, null, '8bit');
        if ('02' !== mb_substr($hex, 0, 2, '8bit')) { // INTEGER
            throw new \RuntimeException();
        }
        $Sl = hexdec(mb_substr($hex, 2, 2, '8bit'));
        $S = $this->retrievePositiveInteger(mb_substr($hex, 4, $Sl * 2, '8bit'));
        $S = str_pad($S, $partLength, '0', STR_PAD_LEFT);
        return pack('H*', $R.$S);
    }

    /**
     * @param string $data
     *
     * @return string
     */
    public function retrievePositiveInteger($data)
    {
        while ('00' === mb_substr($data, 0, 2, '8bit') && mb_substr($data, 2, 2, '8bit') > '7f') {
            $data = mb_substr($data, 2, null, '8bit');
        }
        return $data;
    }

    public function encode($data)
    {
        $encoded = strtr(base64_encode($data), '+/', '-_');
        return rtrim($encoded, '=');
    }

    public function generateJWT($kid, $iss, $sub)
    {
        $header = [
            'alg' => 'ES256',
            'kid' => $kid
        ];
        $body = [
            'iss' => $iss,
            'iat' => time(),
            'exp' => time() + 86400 * 150, // must not be greater than 15777000 (6 months in seconds)
            'aud' => 'https://appleid.apple.com',
            'sub' => $sub
        ];
        $pathFileAuthKeyP8 = "app/pathFile.p8";
        $contentFileAuthKey = File::get(storage_path($pathFileAuthKeyP8));
        $privKey = openssl_pkey_get_private($contentFileAuthKey);

        if (!$privKey){
           return false;
        }

        $payload = $this->encode(json_encode($header)) . '.' . $this->encode(json_encode($body));
        $signature = '';
        $success = openssl_sign($payload, $signature, $privKey, OPENSSL_ALGO_SHA256);

        if (!$success) return false;

        $raw_signature = $this->fromDER($signature, 64);
        
        return $payload . '.' . $this->encode($raw_signature);
    }
    
    public function getClientSecret()
    {
        // Giá trị bên dưới mình chỉ lấy ví dụ thôi nha :D
        $keyId = 'ABC123DEFG';
        $teamId = 'DEF123GHIJ';
        $clientId = 'com.mytest.app';
        $clientSecret = $this->generateJWT($keyId, $teamId, $clientId);

        return $clientSecret;
    }
```

Đối với ruby-jwt, bạn có thể tham khảo như sau:
```
pem_content = <<~EOF
-----BEGIN PRIVATE KEY-----
xxxxx......
-----END PRIVATE KEY-----
EOF

ecdsa_key = OpenSSL::PKey::EC.new pem_content

headers = {
    'kid' => 'key_id'
}

claims = {
    'iss' => 'team_id',
    'iat' => Time.now.to_i,
    'exp' => Time.now.to_i + 86400*180,
    'aud' => 'https://appleid.apple.com',
    'sub' => 'client_id',
}

token = JWT.encode claims, ecdsa_key, 'ES256', headers
```
Đây là JWT client secret: 
```
token = JWT.encode claims, ecdsa_key, 'ES256', headers
```

Bài viết được mình tham khảo từ bài [Create a Sign in with Apple private key](https://sarunw.com/posts/sign-in-with-apple-4/#create-a-sign-in-with-apple-private-key) , [Generate and Validate Tokens](https://developer.apple.com/documentation/sign_in_with_apple/generate_and_validate_tokens) . Bài tiếp theo mình sẽ trình bày về **Verifying a User**.