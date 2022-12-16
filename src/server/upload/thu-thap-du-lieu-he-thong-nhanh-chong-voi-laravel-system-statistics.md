### I. Lời mở đầu
![](https://images.viblo.asia/ab86f088-7612-4f72-9eb3-5d247e3582b8.jpg)
Các dữ liệu thống kê là một phần không thể thiếu của các dự án, đặc biệt là các dự án product hay startup. Các con số này luôn song song đồng hành cùng sản phẩm từ lúc bắt đầu đến khi ra mắt và phát triển. Và đương nhiên rồi việc thu thập kết quả các key metrics hằng ngày là điều vô cùng cần thiết. Ví dụ đơn giản như này, Viblo là sản phẩm product của mình. Các dữ liệu hằng ngày mà mình cần ở Viblo tính đến đến thời điểm báo cáo có thể là:
- Tổng số users
- Tổng số users mới
- Tổng số active users trong ngày, trong tuần, trong tháng
- Tổng số bài viết
- Tổng số bài viết mới
- ....

Và các con số này sẽ được lưu lại theo ngày, từ đó mình sẽ thấy được sự tăng trưởng và biến động theo từng ngày nữa. Từ những thông số đó mình sẽ biết được hệ thống đã, đang đạt được những thành quả tích cực nào hay cần cải thiện và phát triển những gì.
### II. Nội dung chính
Chúng ta không thể phủ nhận rằng việc thu thập data system statistics là cực kỳ thiết yếu, chính vì vậy hãy làm việc này để giúp sản phẩm, hệ thống của bạn được tốt hơn.
Nhận thấy điều này là hữu ích nên mình có dành một chút thời gian và có viết ra một package tạm đặt tên là: ```laravel system statistics```

#### Giới thiệu về package laravel system statistics

Mình xây dựng package ```vanquynguyen/laravel-system-statistics``` giúp chúng ta có thể dễ dàng thu thập các dữ liệu hệ thống theo các key metrics của riêng mình. Tất cả dữ liệu sẽ được lưu trong bảng ```system_statistics``` để tiện cho việc sử dụng sau này.

Download tại: [Laravel System statistics package](https://packagist.org/packages/vanquynguyen/laravel-system-statistics)

#### Cài đặt package
Bạn có thể cài đặt package thông qua composer:
```php
composer require vanquynguyen/laravel-system-statistics
```

Sau khi cài đặt xong bạn cần chạy command để tạo migrations tự động:

```php
php artisan vendor:publish --provider="Vanquy\SystemStatistics\SystemStatisticServiceProvider" --tag="migrations"
```

Và đương nhiên rồi sau khi migrations file đã được tạo bạn cần phải chạy ```migrate``` để thêm bảng vào database

```php
php artisan migrate
```

Đừng quên chạy lệnh để tạo file config nữa

```php
php artisan vendor:publish --provider="Vanquy\SystemStatistics\SystemStatisticServiceProvider" --tag="config"
```
Package có viết sẵn cho bạn một command để thu thập dữ liệu, có sẵn rồi thì ngần ngại gì mà không dùng nhỉ =))

```php
php artisan vendor:publish --provider="Vanquy\SystemStatistics\SystemStatisticServiceProvider" --tag="commands"
```
##### Hướng dẫn sử dụng
* Models

Bạn có thể sử dụng model theo namespace
```Vanquy\SystemStatistics\Models\SystemStatistic``` .

```php
  use Vanquy\SystemStatistics\Models\SystemStatistic;

  SystemStatistic::all();
```
Hoặc nếu bạn muốn tạo trong App\Models để dễ dàng mở rộng thì có thể tạo và extends Model đã được tạo sẵn trong package
```php

  namespace App\Models;

  use Vanquy\SystemStatistics\Models\SystemStatistic;

  class StatisticModel extends SystemStatistic
  {
    //
  }
```
* Có thể sử dụng một số hàm sẵn có:

Hiện tại package có viết sẵn 2 class: ```Collector``` và ```Repository```. Class ```Collector``` là những đoạn code giúp ta thu thập dữ liệu cho các key metrics,  ```Repository``` cung cấp một số hàm lấy data theo điều kiện. Với namespace là:
```Vanquy\SystemStatistics\Components\Collector``` và ```Vanquy\SystemStatistics\Components\Repository```
* Commands

**Thu thập data theo ngày**
```php
  namespace App\Console\Commands;

  use Vanquy\SystemStatistics\Components\Collector;

  /**
   * Execute the console command.
   *
   * @return mixed
   */
  public function handle(Collector $statsCollector)
  {
      $dateArg = $this->option('date');
      $date = $dateArg !== null ? Carbon::createFromFormat('Y-m-d', $dateArg) : Carbon::now()->subDay(1);

      $this->deleteOldStatistics($date);
      $queries = [];
      $statistics = $statsCollector->forDate($queries, $date);

      $data = $statistics->map(function ($item, $key) use ($date) {
          return [
              'type' => $key,
              'data' => $item,
              'date' => $date,
          ];
      });

      SystemStatistic::insert($data->toArray());
  }
```
Bạn cần thêm các query ứng với key metrics mà bạn cần và thêm vào biến $queries, Ví dụ: 
```php
  namespace App\Console\Commands;

  use Vanquy\SystemStatistics\Components\Collector;
  
  public function handle(Collector $statsCollector)
  {
    $queries = [
      [
          'type' => 'total_users',
          'query' => $statsCollector->countTotalSystem('users'),
      ],
    ];
    ...
  }
```
**Send daily report**

```php
  namespace App\Console\Commands;

  use Vanquy\SystemStatistics\Components\Repository

  /**
   * Execute the console command.
   *
   * @return mixed
   */
  public function handle(Repository $statsRepository)
  {
      $currentDate = Carbon::now()->subDay(1);
      $lastDate = Carbon::now()->subDay(2);
      $types = [];

      $dataStatistics = $statsRepository->getStatisticsForReport($types, $currentDate, $lastDate);

      return $dataStatistics;
  }
```

Bạn cần thêm các type vào biến $types để lấy ra dữ liệu của các type mà bạn cần, ví dụ:
```php
$type = ['total_users', 'total_new_users'];
.....
```

### III. Tạm kết
Hy vọng package thực sự hữu ích cho mọi người. Rất mong được sự góp ý, và contribute [Laravel System statistics package](https://github.com/vanquynguyen/laravel-system-statistics).

![](https://images.viblo.asia/c9a98922-9b9c-4ceb-9516-6c6b67a3cb01.gif)