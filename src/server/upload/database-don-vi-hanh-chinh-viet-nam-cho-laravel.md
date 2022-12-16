Xin chào các bạn, hôm nay mình xin chia sẻ với các bạn cơ sỡ dữ liệu đơn vị hành chính của Việt Nam: Tỉnh/Thành phố, Quận/Huyện, Phường/Xã cho Laravel

Đây là lần đầu tiên mình viết bài lên đây, có thể không được hay lắm thì mong các bạn thông cảm :)

## Giới thiệu

Hôm trước mình có làm một dự án cần lấy dữ liệu về đơn vị hành chính của Việt Nam, do đó mình đã đóng gói lại thành package cho Laravel và chia sẻ cho mọi người.

Link em nó đây: https://github.com/kjmtrue/vietnam-zone

Package này có gì:
- Data được trích xuất trực tiếp từ **Tổng Cục Thống Kê** cho nên các bạn yên tâm về độ chính xác và dữ liệu luôn luôn được cập nhật mới nhất.
- Cài đặt nhanh gọn.
- Hỗ trợ Laravel 5.8 trở lên.

> Lưu ý: Dữ liệu được cập nhật lần cuối vào ngày: 11/04/2022

Nếu các bạn cần cập nhật dữ liệu mới nhất từ trang Tổng Cục Thống Kê, vui lòng xem **Phần 5** của hướng dẫn.

## 1. Cài đặt


#### 1.1 Cài đặt gói bằng composer


```shell
composer require kjmtrue/vietnam-zone
```


#### 1.2 Copy file migration

```shell
php artisan vendor:publish --provider="Kjmtrue\VietnamZone\ServiceProvider"
```

#### 1.3 Chỉnh sửa file migration nếu cần

Mở các file migration sau và tuỳ chỉnh theo yêu cầu riêng của bạn.

```shell
database/migrations/2020_01_01_000001_create_provinces_table.php
database/migrations/2020_01_01_000002_create_districts_table.php
database/migrations/2020_01_01_000003_create_wards_table.php
```

## 2. Chạy migration

```shell
php artisan migrate
```

## 3. Import dữ liệu

```shell
php artisan vietnamzone:import
```

Lưu ý: 
- Dữ liệu được cập nhật lần cuối: 11/04/2022
- Để cập nhật dữ liệu mới nhất, vui lòng làm theo hướng dẫn ở mục 5 trước khi chạy lệnh `php artisan vietnamzone:import`

## 4. Sử dụng 

```php
$provinces = \Kjmtrue\VietnamZone\Models\Province::get();
$districts = \Kjmtrue\VietnamZone\Models\District::whereProvinceId(50)->get();
$wards = \Kjmtrue\VietnamZone\Models\Ward::whereDistrictId(552)->get();
```

## 5. Tải file dữ liệu

Dữ liệu được lấy từ **Tổng Cục Thống Kê Việt Nam**.

Trong tương lai, khi cơ quan có thẩm quyền sắp xếp lại các đơn vị hành chính thì bạn cần phải tải file dữ liệu mới nhất trước khi import dữ liệu vào dự án của bạn.

Bạn vui lòng làm theo các bước hướng dẫn dưới đây:

- Truy cập: https://danhmuchanhchinh.gso.gov.vn/ (URL này có thể bị thay đổi)
- Tìm nút "Xuất Excel"
- Tick vào ô checkbox "Quận Huyện Phường Xã"
- Click vào nút "Xuất Excel", và tải file xls về
- Đổi tên file vừa tải về thành `vnzone.xls` và copy vào thư mục `storage` của dự án
- Chạy lệnh `php artisan vietnamzone:import` ở bước 3

## Tổng kết

Trên đây là bài chia sẽ của mình, bạn nào có thắc mắc hoặc có yêu cầu để mình bổ xung vào thư viện thì hãy comment cho mình biết bên dưới nha.
Anh em nào đi qua thấy hay thì cho mình xin một sao để lấy động lức update tiếp nha.

Cảm ơn các bạn đã dành thời gian ủng hộ bài viết của mình!