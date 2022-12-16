## Giới thiệu
Trong phát triển ứng dụng, nhiều khi chúng ta cần làm việc với file (tập tin) và folder (thư mục). Một số thao tác phổ biến có thể kể đến như đọc, thêm, sửa, xóa. PHP cũng cung cấp cho chúng ta những hàm xử lý hữu dụng để làm việc với chúng.
## Một số hàm thông dụng
### 1. Duyệt folder
**- Cú pháp:**
```php
scandir( string $directory [, int $sorting_order = SCANDIR_SORT_ASCENDING ): array
```
scandir trả về một array chứa danh sách files và folders
* $directory: tên thư mục cần scan
* $sorting_order: kiểu sắp xếp kết quả. Mặc định là tăng dần theo kí tự alpha

### 2. Phân quyền cho file/folder
**- Cú pháp:**
```php
chmod( string $filename , int $mode ): bool
```
**- Ví dụ:**
```php
chmod("/manga", 0777);
```
Với ví dụ trên, chúng ta đã cho phép tất cả người dùng có quyền read, write, execute đối với thư mục này.
### 3. Kiểm tra xem có phải là file/folder hay không
**- Cú pháp:**
```php
is_dir( string $filename ): bool // Kiểm tra thư mục
is_file( string $filename ): bool // Kiểm tra tập tin
```
### 4. Kiểm tra file/folder có tồn tại hay không
**- Cú pháp:**
```php
file_exists( string $filename ): bool
```
### 5. Tạo file/folder
**- Cú pháp:**
```php
// tạo folder
mkdir( string $pathname [, int $mode = 0777 [, bool $recursive = FALSE [, resource $context ]]] ): bool

// tạo file
touch( string $filename [, int $time = time() [, int $atime ]] ): bool
```
### 6. Xóa file/folder
**- Cú pháp:**
```php
// Xóa file
unlink( string $filename [, resource $context ] ): bool

// Xóa thư mục
rmdir( string $dirname [, resource $context ] ): bool
```
### 7. Đổi tên file hoặc folder
**- Cú pháp:**
```php
rename( string $oldname , string $newname [, resource $context ] ): bool
```
### 8. Đọc dữ liệu trong file
**- Cú pháp:**
```php
file_get_contents( string $filename [, bool $use_include_path = FALSE [, resource $context [, int $offset = 0 [, int $maxlen ]]]] ): string
```
### 9. Ghi dữ liệu ra file
**- Cú pháp:**
```php
file_put_contents( string $filename , mixed $data [, int $flags = 0 [, resource $context ]] ): int
```
### 10. Kiểm tra kích thước file
**- Cú pháp:**
```php
filesize( string $filename ): int
```
Kết quả trả về là kích thước của tập tin và biểu diễn bằng bytes.

**- Ví dụ:**
```php
$filename = 'AoE0023.bmp';
echo filesize($filename) . ' bytes';
// Output: 767000 Bytes ~ 769 KB
```
### 11. Tìm kiếm nâng cao
**- Cú pháp:**
```php
glob( string $pattern [, int $flags = 0 ] ): array
```
Hàm glob trả về một danh sách file và folder được tìm theo điều kiện.
**- Ví dụ:**
```php
// VD 1: Lấy các file có phần mở rộng là .png
print_r(glob("*.txt"));

// VD 2: Lấy các file có tên bắt đầu bằng AOE
print_r(glob("AOE*"));

// VD 3: Lấy tên tất cả các thư mục bắt đầu bằng data
print_r(glob("data*", GLOB_ONLYDIR));
```
## Xây dựng một ứng dụng nhỏ
Với newbie, hãy làm một ứng nhỏ để củng cố lại kiến thức về phần này. Ngày trước, mình đã thử làm một trang đọc truyện tranh sử dụng PHP + một chút jQuery :grinning: Mình thường tải những folder chứa bản đẹp của các bộ truyện mình thích. Tuy nhiên, xem ảnh trên màn hình nhỏ của laptop bằng Windows Photo Viewer rất bất tiện. Máy có độ phân giải chỉ 1366x768. Dù để chế độ full-screen cũng không hiển thị được đầy đủ chất lượng ảnh. Vì vậy, sau khi biết được khả năng xử lý file và folder trong PHP, mình đã thực hiện ứng dụng này. Yêu cầu duy nhất là tên folder + tên file được đặt đồng bộ theo thứ tự. Điều này hầu như các bạn editor và mang đi share đều làm sẵn cho chúng ta rồi :beers:
```php
manga/
|-- Kattobi Itto/
|-- Slam Dunk/
|  |-- [A4V.Manga]SD_v1
|  |-- [A4V.Manga]SD_v2
|  |  |-- [A4V.Manga]SD_v8_#80_001.jpg
|  |  |-- [A4V.Manga]SD_v8_#80_002.jpg
|  |  ...
```
![](https://images.viblo.asia/7c31bb01-45a9-44bd-8d55-4116429a6e7e.PNG)
Mặc dù có thể đọc nhưng mình vẫn khó chịu vì không thể xem chất lượng gốc. Còn dưới đây là sản phẩm mình đã làm :grinning:
![](https://images.viblo.asia/c125bd84-dd0a-4149-8bd5-6218be99813b.PNG)