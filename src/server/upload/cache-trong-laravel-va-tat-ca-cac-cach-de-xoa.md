Laravel có các bộ nhớ đệm (cache) khác nhau cho các phần khác nhau của ứng dụng của bạn và do đó, có nhiều cách để xóa bộ nhớ đệm Laravel.
## Bộ nhớ cache ứng dụng

Bộ đệm ứng dụng là bộ đệm chính trong Laravel. Nó lưu trữ mọi thứ mà bạn lưu vào bộ nhớ cache theo cách thủ công trong ứng dụng của mình. Bạn chỉ có thể xóa các phần tử cụ thể của bộ nhớ cache nếu bạn sử dụng các thẻ hoặc các kho lưu trữ bộ nhớ cache khác nhau. Cách dễ nhất để xóa bộ nhớ cache Laravel là thông qua artisan:

## Xóa bộ nhớ cache Laravel thông qua lệnh artisan
```
php artisan cache:clear
```
Nếu bạn sử dụng nhiều bộ nhớ đệm và bạn muốn xóa một lưu trữ cụ thể, bạn có thể chuyển điều này làm tham số cho lệnh:
```
php artisan cache:clear --store=redis
```
Bạn có thể xóa các thẻ đã lưu trong bộ nhớ cache bằng các thẻ cụ thể bằng lệnh:
```
php artisan cache:clear --tags=tag1,tag2
```
## Xóa bộ nhớ cache Laravel bằng code

Xóa các thẻ khỏi bộ nhớ cache bằng code cũng dễ dàng như xóa bộ nhớ cache thông qua lệnh artisan. Ngoài ra, bạn có thể sử dụng cache facade để truy cập bộ nhớ cache hoặc sử dụng cache helper. Xóa các mục khỏi bộ nhớ cache theo code dễ dàng như xóa bộ nhớ cache thông qua lệnh artisan.
```
Cache::flush()
cache()->flush()
```
Xóa các thẻ được lưu trong bộ nhớ cache với thẻ `awesome-tag` cũng dễ dàng như xóa một lưu trữ cache cụ thể:
```
cache()->store('redis')->tags('awesome-tag')->flush()
```
Bất cứ khi nào bạn muốn kiểm tra xem có một mục nào đó trong bộ đệm hay xóa nó khỏi bộ đệm hay không, khởi động **[Tinkerwell](https://tinkerwell.app/)** và chạy các lệnh ở trên.

## View cache

Một phần khác của ứng dụng có bộ nhớ cache là view cache. View cache lưu trữ các mẫu Blade đã kết xuất để tăng tốc ứng dụng của bạn. Bạn có thể hiển thị tất cả các view để tăng hiệu suất bằng cách sử dụng lệnh artisan cho nó:
```
php artisan view:cache
```
Nếu bạn sử dụng tính năng tối ưu hóa này, bạn phải xóa bộ nhớ cache nếu bạn triển khai code mới, nếu không, Laravel sử dụng view cũ của bạn và bạn sẽ cố gắng debug lỗi này mãi mãi. Bạn có thể xóa bộ nhớ cache chế độ xem của Laravel bằng lệnh:
```
php artisan view:clear
```

## Bộ nhớ cache cấu hình

Laravel khuyến nghị lưu vào bộ nhớ đệm các tệp cấu hình (config) của bạn để ứng dụng không cần phải duyệt qua tất cả các tệp cấu hình trong khi khởi động framework.

Bạn có thể kết hợp tất cả các tệp cấu hình thành một tệp lớn và tối ưu hóa hiệu suất bằng lệnh:
```
php artisan config:cache
```
Đảm bảo xóa bộ nhớ cache này nếu bạn thay đổi cấu hình, chẳng hạn như trong quá trình triển khai dự án:
```
php artisan config:clear
```

## Bộ nhớ cache event

Khi chạy trong một dự án, bộ nhớ đệm của events và listeners cho phép xử lý sự kiện hiệu quả. Laravel khuyên bạn nên lưu vào bộ nhớ cache các events và listeners trong quá trình triển khai của bạn - và điều này có nghĩa là bạn cũng phải xóa bộ nhớ cache của event.
Để lưu các events và listeners vào bộ nhớ cache, hãy chạy lệnh `event: cache` trong quá trình triển khai của bạn:
```
php artisan event:cache
```
Lệnh `event: cache` tự động xóa tất cả các bộ đệm event, nhưng nếu bạn phải chạy nó theo artisan, bạn có thể thực hiện như sau:
```
php artisan event:clear
```

## Bộ nhớ đệm route

Bộ đệm route là bộ đệm hiệu suất bổ sung mà bạn chỉ muốn sử dụng trong quá trình chạy một dự án và như một phần của quá trình triển khai của mình. Lưu trữ các route của bạn làm giảm đáng kể thời gian đăng ký các route của ứng dụng. Bạn có thể lưu vào bộ nhớ cache các route qua:
```
php artisan route:cache
```
Trong trường hợp bạn thay đổi route hoặc thử lệnh cache trong quá trình phát triển, bạn phải xóa bộ đệm route nếu không ứng dụng của bạn sẽ không tìm thấy các route mới. Bạn xóa bộ đệm route bằng lệnh:
```
php artisan route:clear
```

## Reference

https://beyondco.de/blog/laravel-caches-and-all-ways-to-clear-them