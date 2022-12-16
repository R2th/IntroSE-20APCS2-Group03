Chúng tôi đã tích hợp Lịch Google  thông qua Google API vào trang web của khách hàng (Laravel). Tôi nghĩ rằng tôi sẽ viết ra giải pháp của chúng tôi để hy vọng giúp đỡ những người tiếp theo cần làm điều này.
![](https://images.viblo.asia/c5768473-ea71-46f9-ad85-d2d52961badc.jpg)

Tổng quan
![](https://images.viblo.asia/434479c0-6713-4aeb-895f-351725148c13.png)

Nguồn ảnh: https://developers.google.com/identity/protocols/OAuth2

Để lấy bất kỳ dữ liệu nào từ Google Calendar được liên kết của địa điểm, địa điểm phải đồng ý với trang web để truy cập.

Như tài liệu trong sơ đồ ở trên, sự đồng ý cấp địa điểm cung cấp cho trang web một authorisation code (mã ủy quyền), mà sau đó trang web có thể trao đổi access token (mã thông báo truy cập) bằng Google API. Access token này chỉ có thể được sử dụng để tương tác với dịch vụ mà địa điểm có quyền truy cập đồng ý. Trong trường hợp này, đó là Google Calendar

# Creating a project
Bước đầu tiên là yêu cầu khách hàng thiết lập dự án bằng tài khoản Google của họ. Hướng dẫn bắt đầu nhanh này từ Google mang đến một hướng dẫn tốt:  https://developers.google.com/google-apps/calendar/quickstart/php

Trong hướng dẫn cũng có 1 demo, bạn có thể tham khảo nó nhé!

Khi dự án được thiết lập, khách hàng cần thiết lập thông tin đăng nhập để truy cập Google Calendar API thông qua dự án này.

![](https://images.viblo.asia/3fe618eb-d11b-4fec-b00c-2010b6db0f80.png)
# Adding credentials
Có một trình hướng dẫn để tạo thông tin đăng nhập. Nó không rõ ràng, vì vậy đây là ảnh chụp màn hình của những gì tôi thiết lập. 
Lưu ý: Tôi đã sử dụng nội dung demo thay vì dữ liệu khách hàng.

Bước đầu tiên, hỏi API nào sẽ được sử dụng và cách truy cập API

![](https://images.viblo.asia/7a6dda32-cea3-40ed-b591-42679a797671.png)

Bước thứ hai, lập whitelists URLs và thiết lập đường dẫn oAuth callback.
![](https://images.viblo.asia/f4da6fe0-3315-4881-80ff-0a2ae6ce79b3.png)

Bước thứ ba, thiết lập các cài đặt cho biểu mẫu đồng ý, các địa điểm sẽ được trình bày.
![](https://images.viblo.asia/24c39fcd-3484-41d9-ab97-c59b2e445079.png)

Bước thứ tư, cung cấp cho bạn client ID and credentials (thông tin đăng nhập).
![](https://images.viblo.asia/aa9c18bd-190e-48fc-b454-0d7521f1a3d5.png)

Click 'download' trên màn hình cuối cùng, cung cấp cho bạn tệp client_id.json, đây là khóa trang web cho API thông qua dự án máy khách. Điều này nên được lưu trữ trên máy chủ ở một vị trí riêng tư.

```php
    {  
       "web":{  
          "client_id":"[hash-string].apps.googleusercontent.com",
          "project_id":"calendar-integration-[project-id]",
          "auth_uri":"https://accounts.google.com/o/oauth2/auth",
          "token_uri":"https://accounts.google.com/o/oauth2/token",
          "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
          "client_secret":"[hash-string]",
          "redirect_uris":[  
             "https://www.example.com/oauth2callback"
          ],
          "javascript_origins":[  
             "https://www.example.com"
          ]
       }
    }
```

# Require the Google API Client
Vì đây là trang web Laravel, chúng tôi đã có Composer setup nên trước tiên, chúng tôi yêu cầu  Google API client:

```php
    composer require google/apiclient:^2.0
```

Điều này cung cấp cho chúng tôi PHP Library để kết nối với các Google APIs, cộng với tải các helper functions cho từng API và OAuth2.

Thông tin chi tiết có thể được tìm thấy ở đây: https://github.com/google/google-api-php-client
# Authorisation
## Requesting consent
Bước đầu tiên cho trang web là cung cấp một phương tiện cho các địa điểm để đồng ý cho trang web truy cập Google Calendar của họ.

Vì vậy, chúng tôi cần tạo một liên kết sẽ gửi địa điểm tới Google, nơi sẽ hiển thị màn hình đồng ý.

Để làm điều này, chúng tôi sẽ khởi tạo Google Client được cung cấp bởi google/apiclient và đặt cài đặt cụ thể cho ứng dụng của chúng tôi.

```php
    <?php

    namespace App\Helpers;

    // Initialise the client.
    $client = new Google_Client();
    // Set the application name, this is included in the User-Agent HTTP header.
    $client->setApplicationName('Calendar integration');
    // Set the authentication credentials we downloaded from Google.
    $client->setAuthConfig('[private-path]/client_id.json');
    // Setting offline here means we can pull data from the venue's calendar when they are not actively using the site.
    $client->setAccessType("offline");
    // This will include any other scopes (Google APIs) previously granted by the venue
    $client->setIncludeGrantedScopes(true);
    // Set this to force to consent form to display.
    $client->setApprovalPrompt('force');
    // Add the Google Calendar scope to the request.
    $client->addScope(Google_Service_Calendar::CALENDAR);
    // Set the redirect URL back to the site to handle the OAuth2 response. This handles both the success and failure journeys.
    $client->setRedirectUri(URL::to('/') . '/oauth2callback');
```

Lưu ý: Đoạn code trên được sử dụng cho tất cả các tương tác với Google API. Chúng tôi đặt nó vào một helper class để chúng tôi không phải sao chép nó ở bất cứ đâu.

Khi chúng tôi có thiết lập Google Client, chúng tôi có thể sử dụng createAuthUrl() phương thức tích hợp để trả về một liên kết đến Google cho các địa điểm để đồng ý với Google Calendar của họ.

```php
    <?php
    // Set state allows us to match the consent to a specific venues
    $client->setState($venue->id);
    // The Google Client gives us a method for creating the 
    $client->createAuthUrl();
```

Khi địa điểm nhấp vào liên kết, họ được chuyển hướng đến Google và được yêu cầu cấp phép cho trang web truy cập Google Calendar của họ.
![](https://images.viblo.asia/8875e062-0aad-4cb2-9bca-7d4b3afe609d.png)

# Handling the response
Google sẽ chuyển hướng địa điểm trở lại trang web tại URL được chỉ định tại đây $client->setRedirectUri(URL::to('/') . '/oauth2callback');. Route này được sử dụng cả nếu địa điểm đã đồng ý truy cập Google Calendar của họ và nếu họ đã từ chối.

```php
    <?php
    /**
     * Google OAuth2 route
     */
    Route::get('oauth2callback', [
        'as' => 'oauth',
        'uses' => 'OAuthController@index'
    ]);
```

Route này cho biết khi một GET request được thực hiện đến  /oauth2callback, sau đó sử dụng index method trong OAuthController controller.

Thông tin thêm về Laravels routing có thể được tìm thấy ở đây: https://laravel.com/docs/5.5/routing

Đây là những gì trong phương thức đó:

```php
<?php

public function index(Request $request)
    {
        // Get all the request parameters
        $input = $request->all();

        // Attempt to load the venue from the state we set in $client->setState($venue->id);
        $venue = Venue::findOrFail($input['state']);

        // If the user cancels the process then they should be send back to
        // the venue with a message.
        if (isset($input['error']) &&  $input['error'] == 'access_denied') {
            \Session::flash('global-error', 'Authentication was cancelled. Your calendar has not been integrated.');
            return redirect()->route('venues.show', ['slug' => $venue->slug]);

        } elseif (isset($input['code'])) {
            // Else we have an auth code we can use to generate an access token

            // This is the helper we added to setup the Google Client with our             
            // application settings
            $gcHelper = new GoogleCalendarHelper($venue);

            // This helper method calls fetchAccessTokenWithAuthCode() provided by 
            // the Google Client and returns the access and refresh tokens or 
            // throws an exception
            $accessToken = $gcHelper->getAccessTokenFromAuthCode($input['code']);

            // We store the access and refresh tokens against the venue and set the 
            // integration to active.
            $venue->update([
                'gcalendar_credentials' => json_encode($accessToken),
                'gcalendar_integration_active' => true,
            ]);

            \Session::flash('global-success', 'Google Calendar integration enabled.');
            return redirect()->route('venues.show', ['slug' => $venue->slug]);
        }
    }
```

Điều này hiện cho phép chúng tôi truy cập Google Calendar của địa điểm bằng cách sử dụng access token được trả về từ đó fetchAccessTokenWithAuthCode(). Phương thức này không chỉ trả về access token mà nó cũng trả về một vài bit khác:
```php
{  
   "access_token":"[hash-string]",
   "token_type":"Bearer",
   "expires_in":3600,
   "created":1510917377,
   "refresh_token":"[hash-string]"
}
```

Sự trả lại này đã được mã hóa json để lưu trữ trong database.

Token này chỉ tồn tại trong 1 giờ như được biểu thị expires_in ở trên. Khi access token hết hạn, chúng tôi sẽ cần sử dụng refresh_token để yêu cầu access token mới.

## Refreshing the access token
Google Client cung cấp các phương thức để kiểm tra xem access token hiện tại đã hết hạn chưa. Chúng tôi chuyển vào giá trị của $venue->gcalendar_credentials JSON là ở trên setAccessToken() và sau đó refresh token nếu hết hạn.

```php
<?php
// Refresh the token if it's expired.
$client->setAccessToken($venue->gcalendar_credentials);
if ($client->isAccessTokenExpired()) {
    $accessToken = $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
    $venue->update([
        'gcalendar_credentials' => json_encode($accessToken),
    ]);
}
```

Chúng tôi lưu nó trong database chống lại địa điểm một lần nữa. Điều này đã được thêm vào helper class mà chúng tôi thiết lập để khởi chạy Google Client.

## Pulling bookings from Google Calendar
Bây giờ chúng tôi có access token hợp lệ, chúng tôi có thể bắt đầu kết nối Google Calendar cho các sự kiện.

```php
    <?php

    // Load up the helper to initialise the Google Client
    $gcHelper = new GoogleCalendarHelper($venue);

    // Use the Google Client calendar service. This gives us methods for interacting 
    // with the Google Calendar API
    $service = $gcHelper->getCalendarService();

    // Set over what timeframe we want to grab calendar events
    // Dates must be an RFC3339 timestamp with mandatory time zone offset, e.g.,
    // 2011-06-03T10:00:00-07:00
    $optParams = array(
        'orderBy' => 'startTime',
        'singleEvents' => true,
        'timeMin' => '2011-06-03T10:00:00-07:00',
        'timeMax' => '2011-06-03T10:00:00-23:00',
    );

    // Poll this venue's Google Calendar
    $googleBookings = $service->events->listEvents($calendarId, $optParams);

    // Check if we have any events returned
    if (count($googleBookings->getItems()) > 0) {
```

Khi chúng tôi có danh sách các sự kiện từ Google Calendar, chúng tôi sẽ lưu chúng vào database để hiển thị dưới dạng booking trên trang web.
# Pushing bookings to Google Calendar
Khi một địa điểm thêm booking vào trang web, một địa điểm sẽ tự động được tạo trong Google Calendar của họ.

```php
    <?php

    // Set the start time and date for pushing to Google.
    $tz = new DateTimeZone('Europe/London');
    $startTime = Carbon::create(
        2017,
        11,
        25,
        10,
        0,
        0,
        $tz
    );

    // Use the Google date handling provided by the Google Client
    $googleStartTime = new Google_Service_Calendar_EventDateTime();
    $googleStartTime->setTimeZone($tz);
    $googleStartTime->setDateTime($endTime->format('c'));

    // Create the calendar event and give a default title.
    $event = new Google_Service_Calendar_Event();
    $event->setStart($googleStartTime);
    // Same process to create end time as we use for the start time above. Code 
    // omitted for brevity.
    $event->setEnd($googleEndTime);
    $event->setSummary('Booking automatically created from Calendar Example');

    // Use the Google Client calendar service to push 
    $service = $gcHelper->getCalendarService();
    $createdEvent = $service->events->insert($calendarId, $event);

    // Save the newly created event id against the booking.
    if (!empty($createdEvent->id)) {
```

Nếu $createdEvent có id thì chúng tôi đã thành công trong việc đẩy booking này lên Google Calendar như một sự kiện mới.

Id này có thể được sử dụng để xóa sự kiện khỏi Google Calendar: $service->events->delete($calendarId,$eventId);.
## Lưu ý
### Refresh token
Từ kinh nghiệm của chúng tôi:  $client->setApprovalPrompt('force'); là cần thiết để lấy lại refresh token cùng với auth token (mã thông báo xác thực). 
Đã xem xét một loạt các bài viết SO, có vẻ như điều này cũng sẽ buộc người dùng phải đồng ý với Google Calendar của họ mỗi khi auth token hết hạn, nhưng điều này không xảy ra với chúng tôi.

### Timezones
Bạn sẽ nhận thấy khi chúng tôi tạo sự kiện trong Google Calendar của địa điểm, chúng tôi đặt múi giờ thành Europe/London. Theo mặc định, API sử dụng một trong các múi giờ của Mỹ. Điều này không phù hợp với chúng tôi ở Anh.

### Created events
Khi một sự kiện được tạo thông qua API, địa điểm vẫn cần thiết để kéo chúng vào lịch của chúng. Điều này hoạt động tương tự như khi ai đó mời bạn tham gia một sự kiện và bạn phải chấp nhận trước khi nó đi vào lịch của bạn.
# Summary
Tóm lại, việc sử dụng Google API khá dễ dàng với google/apiclient. Nội dung OAuth là phần khó nhất và chủ yếu dựa vào nhiều thông tin mâu thuẫn trên SO và các trang web khác về cách hoạt động của auth/access/refresh tokens.