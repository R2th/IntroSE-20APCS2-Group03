# **1.Giới thiệu**
![](https://images.viblo.asia/cb42d890-cb94-4af9-959c-b71f32503266.jpeg)

**PHP Insights**  là 1 công cụ hoàn hảo để kiểm tra, phân tích chất lượng code của các dự án **PHP** của bạn, dễ dàng cài đặt và có hỗ trợ cả **PHP** thuần.

Các bạn có thể tìm hiểu thêm tại đây: https://phpinsights.com/
# **2.Bắt đầu**
### Php version
*  PHP version: PHP 7.2+
### Install
*  `composer require nunomaduro/phpinsights --dev`
*   publish config-file: `php artisan vendor:publish --provider="NunoMaduro\PhpInsights\Application\Adapters\Laravel\InsightsServiceProvider"`
### Run
*   `php artisan insights`
*   Theo mặc định, chỉ ba **issues** đầu tiên được hiển thị, nhưng với tùy chọn -v, tất cả chúng đều được hiển thị `php artisan insights -v`
### Evaluation items
*    Các mục đươc đánh giá: **Code, Complexity, Architecture, Style**
*    Thang điểm đánh giá: 1 đến 100 điểm, **Đỏ: 1-49**, **Màu vàng: 50-79**, **Màu xanh lá cây: 80-100**
*    Hãy nỗ lực hết mình và hướng tới mục tiêu **xanh** 😎 (daylen)
### Demo
![](https://images.viblo.asia/15dd38c2-429a-4c49-926f-9321456bda0d.png)

Nếu kết quả nó như thế này thì project của bạn rất đỉnh rồi đấy ! (^_^)
# **3.Kết luận**
Với **PHP Insights**  nó có thể cho bạn thấy nhiều vấn đề khác nhau như: các biến không sử dụng, dấu ngoặc, **Todo**, ...
nó cũng phát hiện nếu có vấn đề bảo mật với thư viện của bạn, rất dễ cài đặt, vì vậy hãy thử nếu bạn thích 😊

Thân ái, chồ tộm biệt, quyết thắng dịch bệnh !