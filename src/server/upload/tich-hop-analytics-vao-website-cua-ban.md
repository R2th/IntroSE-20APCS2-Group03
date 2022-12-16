Xin chào các bạn, hôm nay mình sẽ giới thiệu với các bạn một chức năng quan trọng khi làm việc với website. Đó là tích hợp việc trackings analytics vào website của bạn. 


![](https://images.viblo.asia/76cf3a0d-631f-4fc1-b10e-e43a74b4d7de.jpg)


Làm dev mà, rồi sớm hay muộn bạn cũng sẽ có một website cho bản thân, chả có thì việc làm việc dưới môi trường development cũng cần phải sử dụng. Xa xôi hơn, việc sử dụng đến google analytics là chắc chắn cần thiết. :D 

Hiện tại mình đang sử dụng [**Nuxt.js**](https://nuxtjs.org), vì vậy mình sẽ sử dụng và làm việc trên framework này để chia sẻ. Nếu các bạn sử dụng các framework khác thì cũng tương tự như vậy thôi. Các library/package gần như đã có docs rất rõ ràng và hỗ trợ đầy đủ các options cho bạn rồi. 

Bắt đầu thôi.!

### 1. Create account
Thứ tự như sau:
- Vào phần `Quản trị viên` sau đó chọn mục `Tạo tài khoản`
- Đặt tên tài khoản => Tiếp
- Thiết lập thuộc tính bạn đặt tên trang web bạn muốn. Phần URL bạn sẽ đặt tên domain chính là domain hiện tại của bạn. Nhớ chọn giao thức **https** hoặc **http** cho phù hợp. Tên URL của trang web bạn cũng nhớ rằng nên để đuôi hợp lệ. Nếu dùng ở local thì tránh các đuôi như `local, localhost`. Thường thì cá nhân mình sẽ để đuôi `.dev` cho nó dễ hiểu.

Tiếp đó các bạn cứ next next vài lần là được thôi. 
### 2. Setup and Tracking
Sau khi bạn tạo xong tài khoản đăng ký. Bạn hãy thêm phần **ANALYTICS_TRACKING_ID** vào **nuxt.config.js**
```js
buildModules: [
    '@nuxtjs/google-analytics'
    ],
    googleAnalytics: {
    id: 'UA-12301-2'
}
```
Với các version của **Nuxt.js** < **2.9**:
```js
modules: ['@nuxtjs/google-analytics', {
  id: 'ANALYTICS_TRACKING_ID'
}];
```
Đến đây là lên analytics tracking đã có dữ liệu rồi.  Bạn có thể debug ở môi trường development bằng cách thêm option:
```js
['@nuxtjs/google-analytics', {
  id: 'ANALYTICS_TRACKING_ID',
  debug: {
      enabled: true,
      sendHitTask: true
    }
}];
```
Ngoài ra các bạn có thể xem thêm các option tại [document Vue Analytics](https://matteogabriele.gitbooks.io/vue-analytics/content/).
### 3. Get data from analytics
Mình sử dụng Laravel để lấy thông tin từ analytics về. Nhưng trước hết bạn cần **enable API** của analytics nếu không sẽ dính lỗi 403.

Vào địa chỉ https://console.developers.google.com/apis/dashboard, chọn project => Click **Enable API and Service**, sau đó tìm kiếm **Google Analytics Report Api** và click Enable. 

Cài đặt:
```php
composer require spatie/laravel-analytics
```

Publish config file:
```php
php artisan vendor:publish --provider="Spatie\Analytics\AnalyticsServiceProvider"
```

Tiếp theo bạn truy cập vào địa chỉ https://console.developers.google.com/apis/dashboard, chọn mục **credentials** => Click **Create Credentials** => **Service Account Key** => Select project mà bạn mong muốn rồi **Create** thì bạn sẽ tải về một file có dạng `ten-account-xxxxx.json`, hãy đổi tên và đặt file này vào đường dẫn trong config file publish vừa tạo ra. Mặc định sẽ là:
```php
storage_path('app/analytics/service-account-credentials.json'),
```
Vẫn chưa xem được đâu. Bạn cần mở file vừa tải về, xem đến dòng **client_email**, rồi thêm email này với quyền **Read and Analyze** tại **UserManagement View Settings** trong phần **Admin** mới được nhé. 

Giờ đến lúc dùng được rồi. Giả sử mình muốn lấy page views trong vòng 1 tháng.
```php
use Spatie\Analytics\Analytics;
use Spatie\Analytics\Period;
use Carbon;

public function __construct(Analytics $analytics)
{
    $this->analytics = $analytics;
}

// code
$period = Period::create(Carbon::now()->subMonth(), Carbon::now());
$data = $this->analytics->performQuery(
    $period,
    'ga:pageviews'
);
```
Có rất nhiều options từ analytics, các bạn có thể xem hoặc test trực tiếp tại [Test Query Explore GA](https://ga-dev-tools.appspot.com/query-explorer/?csw=1).
### 4. Add metrics and dimensions (Options)
Mục đích ở đây của mình là muốn gửi kèm một số thông tin đi kèm khi mà người dùng truy cập vào page. Giả sử mình có danh sách các bài viết, và mình muốn xem mỗi danh mục có bao nhiêu lượt pageview chả hạn. Khi user vào xem một bài mình sẽ gửi kèm danh mục và giá trị của nó lên GA.
Để triển khai được việc này bạn cần thêm các dimensions và mertrics tại phần **Admin** => **Custom Definitions**.

Về Scope của các dimensions và metrics bạn có thể đọc tại [Understanding Scope In Google Analytics Reporting](https://www.bounteous.com/insights/2016/11/30/understanding-scope-google-analytics-reporting/?ns=l).
Sau khi custom xong, bạn có thể tracking bằng cách chọn **Behavior** => **Site Content** => **All Page**. Sau đó bạn chọn phần **Secondary Dimension** => **Custom Dimensions** => chọn Dimension mà các bạn vừa tạo. Lưu ý là nếu bạn không add dimensions thì sẽ không có mục **Custom Dimensions** đâu nhé. 

Phía web bạn sẽ gửi kèm lên như sau:
```js
this.$ga.page({
    title: title,
    page: url,
    location: window.location.href,
    dimension1: 'category',
    metric1: value,
});
```
Nếu bạn muốn gửi bao nhiêu thông tin đi kèm thì bạn chỉ cần tạo thêm các dimension và metric rồi gửi lên bằng key **dimensionN**, **metricN**.
Với web và android bạn cũng có thể tham khảo tại đây.

![](https://images.viblo.asia/6aeb4f48-89a9-471d-b6e4-d6e979380090.png)

Đây là phần bên client. Bên server bạn muốn lấy thông tin này về thì bạn chỉ cần sửa như sau:
```php
$this->analytics->performQuery(
    $period,
    'ga:metric1',
    ['dimensions' => 'ga:dimension1'],
);
```
Nhớ là cứ test thử bằng [Test Query Explore GA](https://ga-dev-tools.appspot.com/query-explorer/?csw=1) cho chắc nhé. 

### 5. Create Custom Report
Ở phần trên mình đã hướng dẫn các bạn thêm các metrics và dimensions. Giờ mình sẽ tự tạo ra các report rõ ràng và như mong muốn của theo các metrics và dimensions này. 

Vào **Customization** => **Custom Reports** => **Add Custom Report**, các bạn nhớ đặt tên cho report của mình. Ví dụ như bài này mình sẽ đặt là **Category Report**, sau đó chọn các dimensions trong phần custom dimensions mà bạn tạo ở phía trên. Tương tự là với phần lựa chọn metrics. Mình làm thử và có kết quả như sau.

![](https://images.viblo.asia/df2d31ee-59b0-4995-a631-52eae83d5ad7.png)

Hình ảnh có nội dung khiêu gợi nên phải che lại :D

Trên đây là một số tips mình đã làm việc với GA mà muốn chia sẻ lại với các bạn. Cảm ơn các bạn đã theo dõi. Hẹn gặp lại các bạn .!