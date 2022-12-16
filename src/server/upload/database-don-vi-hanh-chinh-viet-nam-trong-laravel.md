# I. Giới thiệu

Chào các bạn, hôm nay mình xin chia sẻ với các bạn Database đơn vị hành chính của Việt Nam: Tỉnh/Thành phố, Quận/Huyện, Phường/Xã cho Laravel.

**Package** này có:
1. Dữ liệu được trích xuất trực tiếp từ [**Tổng Cục Thống Kê**](https://www.gso.gov.vn/dmhc2015).
2. Cài đặt nhanh gọn.
3. Có **[Model Relationship](https://viblo.asia/p/database-don-vi-hanh-chinh-viet-nam-trong-laravel-WAyK89MnZxX#_su-dung-voi-model-6)**
4. Hỗ trợ từ **Laravel 5.8** trở lên.

Mã nguồn: [**Github**](https://github.com/hoangphidev/vietnam-maps)

# II. Cài đặt

Cài đặt package qua composer:

```shell
composer require hoangphi/vietnam-maps
```

Để config package thì có 2 cách dưới đây các bạn có thể chọn.

## 1. Cách 1:

Nếu bạn không cần tuỳ biến gì có thể config nhanh chóng bằng command:

```shell
php artisan vietnam-map:install
```

## 2. Cách 2:

Copy file config và migration

```shell
php artisan vendor:publish --provider="HoangPhi\VietnamMap\VietnamMapServiceProvider"
```

Bạn có thể tùy biến Database cho phù hợp với project của mình hoặc có thể bỏ qua bước này và qua phần **[Import dữ liệu](https://viblo.asia/p/database-don-vi-hanh-chinh-viet-nam-trong-laravel-WAyK89MnZxX#_import-du-lieu-5)**

### a. Tùy biến Database

#### 1. Đổi tên bảng

Mở file `config/vietnam-maps.php` và chỉnh sửa:

```php
'tables' => [
    'provinces' => 'provinces',
    'districts' => 'districts',
    'wards'     => 'wards',
],
```

#### 2. Đổi tên cột

Mở file `config/vietnam-maps.php` và chỉnh sửa:

```php
'columns' => [
    'name'        => 'name',
    'gso_id'      => 'gso_id',
    'province_id' => 'province_id',
    'district_id' => 'district_id',
],
```

Trong đó `gso_id`  là mã địa giới chính thức được ban hành theo quyết định số **124/2004/QĐ-TTg** của chính phủ vào ngày 08/7/2004. 

Cột này sẽ được dùng để tham chiếu cho những lần cập nhật dữ liệu sau này. 

Hai cột `province_id` và `district_id` là khóa ngoại.

#### 3. Thêm cột

Mở file migration sau và tuỳ chỉnh cho phù hợp với project của bạn:

```shell
database/migrations/{datetime}_create_vietnam_maps_table.php
```

### b. Import dữ liệu

Chạy lệnh migrate để thực hiện việc tạo bảng.

```shell
php artisan migrate
```

Import dữ liệu vào database bằng command sau:

```shell
php artisan vietnam-map:download
```

***Lưu ý:*** Để migrate được các bạn cần config cho project đã **kết nối thành công với database** và có **kết nối internet** để tải dữ liệu về.
# III. Sử dụng với Model

1. Lấy toàn bộ dữ liệu Tỉnh/Thành Phố, Quận/Huyện, Xã/Phường

```php
    use HoangPhi\VietnamMap\Models\Province;
    use HoangPhi\VietnamMap\Models\District;
    use HoangPhi\VietnamMap\Models\Ward;

   class DevController extends Controller
   {
       ...
       public function dev()
       {
           $provinces = Province::all();
           $districts = District::all();
           $wards = Ward::all();
           ...
       }
   }
```

2. Lấy dữ liệu sử dụng **Relationship**

```php
    use HoangPhi\VietnamMap\Models\Province;

   class DevController extends Controller
   {
       ...
       public function dev()
       {
           $province = Province::first();
           $districts = $province->districts;
           ...
       }
   }
```

3. Relationship trong model `Province.php`

```php
    class Province extends Model
    {
        ...
        public function districts()
        {
            return $this->hasMany(District::class);
        }
    }
```

4. Relationship trong model `District.php`

```php
    class District extends Model
    {
        ...
        public function province()
        {
            return $this->belongsTo(Province::class, config('vietnam-maps.columns.province_id'), 'id');
        }
        
        public function wards()
        {
            return $this->hasMany(Ward::class);
        }
    }
```

5. Relationship trong model `Ward.php`

```php
    class Ward extends Model
    {
        ...
        public function district()
        {
            return $this->belongsTo(District::class, config('vietnam-maps.columns.district_id'), 'id');
        }
    }
```

# IV. Tổng kết

Trên đây là bài chia sẽ của mình về package [vietnam-maps](https://github.com/hoangphidev/vietnam-maps).

Trong bài viết này mình có tham khảo bài viết của bác [Nguyễn Kim Triển](https://viblo.asia/p/database-don-vi-hanh-chinh-viet-nam-cho-laravel-naQZR9jQKvx) để xây dựng package này. 

Cảm ơn các bạn đã dành thời gian đọc bài viết của mình!
# V. Tài liệu tham khảo
- [Vietnam Zone](https://github.com/kjmtrue/vietnam-zone)
- [General Statistics Office of Vietnam](https://www.gso.gov.vn/dmhc2015)