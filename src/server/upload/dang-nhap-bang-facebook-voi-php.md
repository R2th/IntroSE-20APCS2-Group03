Khi bạn phát triển một trang web nào đó, chức năng đăng nhập là rất quan trọng, tích hợp chức năng đăng nhập bằng mạng xã hội càng thuận tiện hơn cho người dùng. Sau đây là một ví dụ đăng nhập Facebook bằng PHP.
Trong ví dụ dưới đây, các lệnh PHP thực hiện đăng nhập nằm trong tệp /logIn.php. Đường dẫn mà Facebook chuyển hướng người dùng đến sau hộp thoại đăng nhập nằm trong file **/fb-callback.php.**

Lưu ý: Mọi URL callback đều phải nằm trong danh sách URI chuyển hướng OAuth hợp lệ bằng cách đi tới Bảng điều khiển ứng dụng, chọn ứng dụng của bạn và đi tới **Sản phẩm > Đăng nhập Facebook >** Cài đặt trong Cài đặt OAuth ứng dụng và nhập vào đó.

Trước hết bạn phải tạo một ứng dụng facebook. Đầu tiên bạn vào trang https://developers.facebook.com/ và tạo một ứng dụng mới.

![](https://images.viblo.asia/4e3c488d-ae7e-45ef-82c0-4b132afd5daf.png)

Sau đó chọn **Add new app**, bạn nhập tên ứng dụng mà bạn muốn và email rồi nhấn "Create an app ID".

![](https://images.viblo.asia/53cfe681-666e-447e-a9d2-a6f70bdc29fe.png)

Chọn thêm Product là **"Facebook Login"**

![](https://images.viblo.asia/b53efb1b-de99-47a6-bd36-735ac09a399e.png)

Chọn **Setting->Basic information**. Ở đây bạn lưu ý 2 phần **App ID** và **Secret ID** sẽ điền vào phần sau.

![](https://images.viblo.asia/2827f05e-7081-4637-902a-7947c394a270.png)

Đây là phần Cài đặt OAuth ứng dụng mình nhắc đến ở phần Lưu ý trên, nhập các URL vào khung **UI valid redirect URI**.

![](https://images.viblo.asia/7d4f79ce-44f3-40ff-9383-db654beceb58.png)

**/login.php**

```php
$fb = new Facebook\Facebook([
  'app_id' => '{app-id}', // Replace {app-id} with your app id
  'app_secret' => '{app-secret}',
  'default_graph_version' => 'v2.2',
  ]);

$helper = $fb->getRedirectLoginHelper();

$permissions = ['email']; // Optional permissions
$loginUrl = $helper->getLoginUrl('https://example.com/fb-callback.php', $permissions);

echo '<a href="' . htmlspecialchars($loginUrl) . '">Log in with Facebook!</a>';
```

**/fb-callback.php**
```php
$fb = new Facebook\Facebook([
  'app_id' => '{app-id}', // Replace {app-id} with your app id
  'app_secret' => '{app-secret}',
  'default_graph_version' => 'v2.2',
  ]);

$helper = $fb->getRedirectLoginHelper();

try {
  $accessToken = $helper->getAccessToken();
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  // When Graph returns an error
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  // When validation fails or other local issues
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}

if (! isset($accessToken)) {
  if ($helper->getError()) {
    header('HTTP/1.0 401 Unauthorized');
    echo "Error: " . $helper->getError() . "\n";
    echo "Error Code: " . $helper->getErrorCode() . "\n";
    echo "Error Reason: " . $helper->getErrorReason() . "\n";
    echo "Error Description: " . $helper->getErrorDescription() . "\n";
  } else {
    header('HTTP/1.0 400 Bad Request');
    echo 'Bad request';
  }
  exit;
}

// Logged in
echo '<h3>Access Token</h3>';
var_dump($accessToken->getValue());

// The OAuth 2.0 client handler helps us manage access tokens
$oAuth2Client = $fb->getOAuth2Client();

// Get the access token metadata from /debug_token
$tokenMetadata = $oAuth2Client->debugToken($accessToken);
echo '<h3>Metadata</h3>';
var_dump($tokenMetadata);

// Validation (these will throw FacebookSDKException's when they fail)
$tokenMetadata->validateAppId('{app-id}'); // Replace {app-id} with your app id
// If you know the user ID this access token belongs to, you can validate it here
//$tokenMetadata->validateUserId('123');
$tokenMetadata->validateExpiration();

if (! $accessToken->isLongLived()) {
  // Exchanges a short-lived access token for a long-lived one
  try {
    $accessToken = $oAuth2Client->getLongLivedAccessToken($accessToken);
  } catch (Facebook\Exceptions\FacebookSDKException $e) {
    echo "<p>Error getting long-lived access token: " . $e->getMessage() . "</p>\n\n";
    exit;
  }

  echo '<h3>Long-lived</h3>';
  var_dump($accessToken->getValue());
}

$_SESSION['fb_access_token'] = (string) $accessToken;

// User is logged in with a long-lived access token.
// You can redirect them to a members-only page.
//header('Location: https://example.com/members.php');
```