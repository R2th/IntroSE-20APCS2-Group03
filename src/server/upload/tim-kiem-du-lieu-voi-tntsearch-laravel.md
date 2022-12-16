Laravel Scout cung cấp giải pháp đơn giản, dựa trên trình điều khiển để thêm tìm kiếm toàn văn bản vào các mô hình Eloquent của bạn .

Laravel 5.3  với trình điều khiển Algolia. Tuy nhiên, chúng ta có thể dễ dàng viết trình điều khiển tùy chỉnh; đó chính xác là những gì TeamTnt đã thực hiện bằng cách cung cấp trình điều khiển TNTSearch cho Laravel Scout.

# Bắt đầu
Đầu tiên, hãy cài đặt một bản sao mới của Laravel 5.3, tôi đang sử dụng trình cài đặt Laravel, do đó:

`laravel new scout-tntsearch`

Bây giờ hãy cài đặt các gói cần thiết để chạy Scout và TntSearch. Đầu tiên cài đặt Laravel Scout:

`composer require laravel/scout`

Sau đó, cài đặt trình điều khiển TNTSearch

`composer require teamtnt/laravel-scout-tntsearch-driver`

Tiếp theo, chúng ta sẽ thêm **ScoutServiceProvider** và **TNTSearchScoutServiceProvider** vào mảng các nhà cung cấp của chúng ta trong config / app.php

```
'providers' => [
    /*
     * Package Service Providers...
     */
    Laravel\Scout\ScoutServiceProvider::class,
    TeamTNT\Scout\TNTSearchScoutServiceProvider::class,
]
```

Bây giờ, hãy phát hành tệp cấu hình Laravel Scout:

`php artisan vendor:publish --provider="Laravel\Scout\ScoutServiceProvider"`

Một tập tin cấu hình mới scout.php nên có sẵn trong thư mục cấu hình của chúng tôi. Hãy đặt cấu hình đúng để Scout biết rằng chúng tôi muốn sử dụng trình điều khiển TntSearch thay vì Algolia.

Trong tệp .env của chúng tôi, chúng tôi sẽ thêm các thông tin sau:

`SCOUT_DRIVER=tntsearch`

Tiếp theo, trong** config / scout.php**, chúng ta sẽ thêm điều này:

```
'tntsearch' => [
    'storage'  => storage_path(),
],
```

Về cơ bản, điều này xác định thư mục nơi các tệp chỉ mục sẽ được lưu trữ.

# Tạo cơ sở dữ liệu
Bảng phim của chúng tôi chứa 1000 bản ghi, do đó là một nơi hoàn hảo để bắt đầu kiểm tra khả năng của Laravel Scout và TntSearch.
Bây giờ chúng tôi có một số dữ liệu để kiểm tra một số tính năng của Laravel Scout. Hãy tạo một mô hình Eloquent cho bảng phim .

`php artisan make:model Models/Film`

Chúng ta sẽ thiết lập thuộc tính primaryKey và table trên Model của chúng ta để Eloquent biết những gì cần sử dụng cho các giá trị này.

![](https://images.viblo.asia/79987cbe-fbfb-44be-a865-de004be4c78f.png)

Bây giờ chúng ta có một mô hình Eloquent cho bảng phim của chúng ta, hãy xem liệu chúng ta có thể truy vấn một số dữ liệu với nó hay không.

![](https://images.viblo.asia/b3e77dbf-36a2-4725-a38e-a22d4435ce84.png)

Bảng phim của  tôi chứa 1000 bản ghi, do đó là một nơi hoàn hảo để bắt đầu kiểm tra khả năng của Laravel Scout và TntSearch.

# INDEX

Từ tài liệu Laravel, chúng ta đọc phần sau: “Mỗi mô hình Eloquent được đồng bộ hóa với một“ chỉ mục ”tìm kiếm đã cho, chứa tất cả các bản ghi có thể tìm kiếm cho mô hình đó. Nói cách khác, bạn có thể nghĩ về từng chỉ mục giống như một bảng MySQL. Theo mặc định, mỗi mô hình sẽ được duy trì cho một chỉ mục phù hợp với tên "bảng" điển hình của mô hình. Thông thường, đây là dạng số nhiều của tên model; tuy nhiên, bạn có thể tùy chỉnh chỉ mục của mô hình bằng cách ghi đè searchableAsphương thức trên mô hình: ”

![](https://images.viblo.asia/16912cb1-cf87-410b-8f29-d0ffffee64df.png)


![](https://images.viblo.asia/f90dbbd3-ba46-41f7-aff6-3b758c3b3bd1.png)

## Tạo index

Chúng ta có thể nhận thấy rõ ràng ở đây cách Laravel Scout chunks dữ liệu và nhập khẩu nó trong chỉ mục 100 hàng tại một thời điểm, do đó ngăn chặn kịch bản của chúng tôi bị rơi hoặc hết thời gianTìm kiếm với TNT Search

![](https://images.viblo.asia/3febb84a-0de9-4ea1-91a3-ed295302d0b7.png)

Bây giờ chúng ta có trong thư mục lưu trữ của chúng tôi một films_index.index tập tin mà Laravel Scout sẽ sử dụng khi thực hiện tìm kiếm trên Model phim.

Bây giờ bạn có thể tự hỏi chính mình điều gì sẽ xảy ra khi tôi cập nhật bảng phim của mình , tôi có cần phải nhập lại dữ liệu và tạo lại Chỉ mục hay không. Không, Laravel Scout đã chăm sóc cập nhật chỉ mục bất cứ khi nào bạn cập nhật Mô hình của mình. tức là khi bạn đang tạo bản ghi mới, cập nhật hồ sơ và xóa bản ghi.


# Tìm kiếm với TNT Search

Bây giờ chúng ta có thể tìm kiếm Mô hình của chúng tôi bằng cách sử dụng phương pháp tìm kiếm được cung cấp bởi đặc điểm có thể tìm kiếm .

`App\Models\Film::search('ANGELS LIFE')->get();`


![](https://images.viblo.asia/59c894dd-f326-4e0f-89fb-db51c580c7f7.png)

Chúng ta nhận được 3 kết quả, tất cả đều chứa trong tiêu đề của họ, một số từ khóa chúng tôi đã chỉ định cho phương pháp tìm kiếm của chúng tôi. Nói lời tạm biệt với các truy vấn WHERE LIKE %%.

Cũng lưu ý rằng tất cả các trường được lập chỉ mục sẽ được sử dụng trong quá trình tìm kiếm do đó mô tả, release_year và vv.

Tốc độ mà tại đó các kết quả này được trả lại chỉ đơn giản là tuyệt vời, và do đó sẽ thực sự thúc đẩy ứng dụng của bạn khi bạn có bộ dữ liệu lớn để tìm kiếm.

# Kết Luận

Tôi thực sự khuyên bạn nên sử dụng Laravel Scout để truy vấn các cơ sở dữ liệu lớn, đây sẽ là nơi nó sẽ có ích nhất và mạnh mẽ nhất. Hãy chắc chắn rằng bạn cũng có một cái nhìn thông qua các tài liệu chính thức của Hướng đạo Laravel , có một số công cụ khá thú vị để tìm hiểu ở đó.


## Tham khảo

https://github.com/teamtnt/laravel-scout-tntsearch-driver

https://laravel-news.com/tntsearch-with-laravel-scout