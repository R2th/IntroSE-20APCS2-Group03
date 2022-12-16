# Laravel: Ẩn SetCacheHeaders Middleware
![](https://images.viblo.asia/133f8823-9ac6-4149-a463-94f2a3e159ee.png)

Có rất nhiều middlewares hữu ích đã được đăng ký bên trong Laravel, như  authentication mechanisms, authorization, a throttler. Thực tế,  bạn có thể biết đến những middlewares này. Ngoại trừ một middlewares.
Nó được gọi SetCacheHeaders hay còn gọi là cache.headers. Và nó không được đề cập đến trong tài liệu. Cái này la thật nhé:

![](https://images.viblo.asia/c515b086-e6c0-4751-bd47-39563f023c67.png)
## Ai, khi nào, như thế nào?
Một số người xem trong tài liệu api và kho lưu trữ nguồn cho biết SetCacheHeaders đã được thêm vào trước Giáng sinh năm 2017 sau một cuộc thảo luận , nhưng đó là một bí ẩn tại sao không ai nói về nó vì nó có vẻ rất tiện lợi .  Bạn nên tìm hiểu nó ngay bây giờ tại link: https://laravel.com/docs/5.8/responses#attaching-headers-to-responses

SetCacheHeaders được dùng để thêm các cache headers vào Response.
## Cache trong Response? Ý bạn là gì?
Nếu bạn đang hỏi điều đó, có nghĩa là bạn không biết lệnh HTTP Cache Control là gì.

Tóm lại, Kiểm soát bộ đệm là một cách để thông báo cho trình duyệt biết phản hồi mà ứng dụng của bạn đã gửi có được lưu vào bộ nhớ cache hay không và trong điều kiện nào, để nó có thể quyết định xem có nên nhận lại phản hồi đầy đủ hay không.

Đây là một cơ chế rất tập trung vào trình duyệt. Có một bài viết rất hay trong Google Developers nói về cách nó chạy mọi người nên đọc nó: https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching

Sẳn sàng? Bây giờ chúng ta đã biết cách HTTP Cache Control hoạt động như thế nào, bây giờ chúng sẽ tìm hiểu SetCacheHeaders có thể làm được gì.
## SetCacheHeaders hoạt động như thế nào?
Xem mã nguồn .
```php
<?php
namespace Illuminate\Http\Middleware;
use Closure;
class SetCacheHeaders
{
    /**
     * Add cache related HTTP headers.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|array  $options
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \InvalidArgumentException
     */
    public function handle($request, Closure $next, $options = [])
    {
        $response = $next($request);
        
        if (! $request->isMethodCacheable() || ! $response->getContent()) {
            return $response;
        }
        
        if (is_string($options)) {
            $options = $this->parseOptions($options);
        }
        
        if (isset($options['etag']) && $options['etag'] === true) {
            $options['etag'] = md5($response->getContent());
        }
        
        $response->setCache($options);
        $response->isNotModified($request);
        
        return $response;
    }
    
    /**
     * Parse the given header options.
     *
     * @param  string  $options
     * @return array
     */
    protected function parseOptions($options)
    {
        return collect(explode(';', $options))->mapWithKeys(function ($option) {
            $data = explode('=', $option, 2);
            return [$data[0] => $data[1] ?? true];
        })->all();
    }
}
```
Như bạn có thể thấy, có năm câu lệnh chính bên trong handle():
1. Nếu yêu cầu là GET hoặc HEAD nó sẽ bắt đầu kiểm tra. Bạn không thể cache một POST response, vì method này làm thay đổi mọi thứ.
2. Kiểm tra xem bạn đã chuyển bất kỳ tham số nào cho middleware chưa và phân tích Response headers bằng parseOptions() method .
3. Nếu tùy chọn etag đã được đặt, nó sẽ tự động băm nội dung phản hồi để có thể nhanh chóng so sánh với etag mà Yêu cầu đã gửi.
4. Nó sẽ đặt các tùy chọn Cache-Control bên trong các Response headers.
5. Và cuối cùng, nó sẽ kiểm tra xem phản hồi đã được sửa đổi chưa . Nếu chưa, nó sẽ xóa nội dung và chỉ trả lại etag.
Trọng tâm là điểm thứ ba và thứ năm. Trình duyệt sẽ tạo một Yêu cầu cho ứng dụng với etag phản hồi được lưu trong bộ nhớ cache, nếu phản hồi ban đầu đi kèm với điều đó. Ứng dụng của bạn sẽ nhận được etag,  xử lý toàn bộ yêu cầu và cuối cùng, băm lại nội dung trong etag phản hồi. Bằng cách so sánh cả hai eta gứng dụng có thể biết liệu nó có nên gửi lại toàn bộ phản hồi hay không, hoặc chỉ gửi một thông báo etag cho trình duyệt biết nội dung đã không được thay đổi.

![](https://images.viblo.asia/2320c2a6-8fb7-4279-b201-ddd184d91dc5.png)

Sử dụng SetCacheHeaders middleware
Bây giờ chúng ta đã biết middleware này làm gì. 
Vid dụ:
Tôi có ứng dụng Podcast, Trang chủ có một danh sách lớn các podcast được xuất bản mới nhất, thay đổi tùy thuộc vào các podcast được xác thực và đăng ký của người dùng. Cứ 5 sẽ xuất bản một podcast.
Hãy xem biểu đồ luồng của Google về chính sách kiểm soát bộ đệm sẽ sử dụng :
![](https://images.viblo.asia/ad5f4bb1-9a94-4a5d-867c-3c05e935449d.png)
Ý tưởng:

no-cache và etag sẽ cho phép người dùng làm mới trang (ngay cả trước thời gian hết hạn) mà không cần tải xuống toàn bộ trang nếu các podcast được xuất bản mới nhất vẫn như cũ.

private cho biết mỗi trang chủ là cho mỗi người dùng khác nhau và chỉ nên được lưu trong bộ nhớ cache trong thiết bị người dùng.

max-age=300 sẽ đặt thời gian hết hạn là 5 phút, vì sau thời gian đó chắc chắn có một Podcast mới được tạo
```php
Route :: get ('/', 'PodcastControll @ index') 
    -> middleware('cache.headers: no-cache, private, max-age = 300; etag');
 ```
Và đó là tất cả. Không cần phải tạo phần mềm trung gian của riêng bạn hoặc hack vào Apache hoặc NGINX.

Link dịch: https://itnext.io/laravel-the-hidden-setcacheheaders-middleware-4cd594ba462f