### Mở đầu

Khi các bạn làm việc với Laravel thì có nhiều tools để bạn debug trong quá trình dev như **laravel-debugbar** và **laravel-log-viewer**, trong đó [laravel-debugbar](https://github.com/barryvdh/laravel-debugbar) có lẽ là được nhiều bạn sử dụng nhất. Laravel debugbar sẽ thêm một small bả ở dưới cùng browser với debug information ví dụ như số lượng câu queries ở page đó chẳng hạn, xem route, mesagges,... Nhưng có lẽ với tool **laravel-log-viewer** thì sẽ được ít biết tới hơn, vậy trong bài biết này chúng ta cùng tìm hiểu **laravel-log-viewer** nó là một package như thế nào? :thinking: 

### Laravel Log Viewer là gì?

Như bạn đã biết khi bạn xây dựng một ứng dụng sử dụng laravel thì trong source code của bạn đã có một folder `storage/logs/...` để chứa các file logs giúp bạn xem được các thông báo lỗi trên ứng dụng của bạn rõ ràng hơn. Các file logs đó sẽ lưu trữ tất cả lỗi khi chạy ứng dụng hoặc bất kỳ lỗi nào khác, tất cả các lỗi đó sẽ được ghi lại vào trong file. Vì nó lưu trữ hầu như tất cả các lỗi cho nên khi bạn mở 1 file logs ra thì sẽ thấy các thông báo lỗi xếp chồng lên nhau, khó phân biệt đó là thông báo lỗi hay là cảnh báo, bạn sẽ mất thời gian để debug dẫn đến khó nắm bắt được tình trạng ứng dụng.

Chính vì điều này nên để khác phục vấn đề trên thì package LogViewer được ra đời để quản lý logs tốt hơn. LogViewer cung cấp một giao diện thân thiện với người dùng trong ngay chính browser với HTML table khá dễ nhìn. Nó sẽ thống kê báo cáo các lỗi có trên ứng dụng, phân biệt các lỗi, các cảnh báo và bạn cũng có thể xem và xóa logs trực tiếp các file ghi log ở đây.

### Cài đặt package LogViewer

> Note: **LogViewer** chỉ hỗ trợ duy nhất cho việc ghi log theo ngày (daily) nên bạn hãy sét giá trị `LOG_CHANEL` thành `daily` thay vì giá trị mặc định là `stack` trong file `.env` của bạn.
> 
Để cài đặt thì bạn có thể chạy thông qua composer bằng command sau:

`composer require arcanedev/log-viewer:{x.x}`

Trong đó **x.x** chính là version phù hợp với từng version laravel mà bạn sử dụng.

![](https://images.viblo.asia/96389634-edc0-47e8-8458-28ef47460b39.png)

Ví dụ mình dùng laravel 5.8 thì mình sẽ chạy lệnh sau:

`composer require arcanedev/log-viewer:~4.7.0`

-----

Sau khi cài đặt thành công, bạn tiếp tục chạy một trong các lệnh sau đây tùy theo bạn, mình sẽ chạy câu lệnh đầu tiên :sweat_smile:

Publishing file `config` và file `translations`

```
php artisan log-viewer:publish
```

kết quả là:
![](https://images.viblo.asia/1f31421a-ff4e-42f0-af92-06e6f4fc6c0b.png)

Publishing files bắt buộc

```
php artisan log-viewer:publish --force
```

Publishing duy nhất file `config`

```
php artisan log-viewer:publish --tag=config
```

Publishing duy nhất file `translations`

```
php artisan log-viewer:publish --tag=lang
```

-----

Vậy bạn muốn kiểm tra xem bạn cà đặt đã đúng chưa,  ứng dụng có đủ yêu cầu để log file hay không thì thật may là có câu lệnh như sau để kiểm tra, mình thử chạy nhé:

```
php artisan log-viewer:check
```

Nếu như lỗi thì nó sẽ thông báo status và message như ảnh bên dưới (lỗi này là do mình quên chưa chuyển `LOG_CHANEL` về `daily` đó :joy:)

![](https://images.viblo.asia/4fad0176-4ed3-4fd4-981f-262f5b554456.png)

Kiểm tra thành công thì như sau :+1:

![](https://images.viblo.asia/b356450a-590d-4707-bc5e-9ed415ba3f3f.png)

-----

Ngoài ra package cũng cho phép ta xóa tất các các file logs được tạo ra chỉ với một command

```
php artisan log-viewer:clear
```

### Route của LogViewer

Như mình đã nói ở phần mở đầu là LogViewer sẽ tạo ra một giao diện chạy trên Browser đúng không? Vậy thì nó phải có url như nào chứ nhỉ. Mình đã chạy thử câu lệnh `php artisan route:list` và kết quả mình có một loạt các route của LogViewer như sau:

| Method | URI | Name |Action |
| -------- | -------- | -------- | -------- |
| GET/HEAD | log-viewer| log-viewer::dashboard | Arcanedev\LogViewer\Http\Controllers\LogViewerController@index |
| GET/HEAD | log-viewer/logs | log-viewer::logs.list| nArcanedev\LogViewer\Http\Controllers\LogViewerController@listLogs |
| DELETE | log-viewer/logs/delete | log-viewer::logs.delete| Arcanedev\LogViewer\Http\Controllers\LogViewerController@delete |
| GET/HEAD | log-viewer/logs/{date} | log-viewer::logs.show | Arcanedev\LogViewer\Http\Controllers\LogViewerController@show |
| GET/HEAD | log-viewer/logs/{date}/download | log-viewer::logs.download | Arcanedev\LogViewer\Http\Controllers\LogViewerController@download |
| GET/HEAD | log-viewer/logs/{date}/{level} | log-viewer::logs.filter | Arcanedev\LogViewer\Http\Controllers\LogViewerController@showByLevel | 
| GET/HEAD | log-viewer/logs/{date}/{level}/search | log-viewer::logs.search   | Arcanedev\LogViewer\Http\Controllers\LogViewerController@search |

###  Configuration LogViewer

Ngoài ra bạn cũng có thể config phần view các thứ từ Storage path, Localiztion, theme, pagination, icon, colors, ... trong file `config/log-viewer.php` bạn có thể tham khảo [tại đây](https://github.com/ARCANEDEV/LogViewer/blob/master/_docs/2.Configuration.md).  Theo mình nghĩ vì họ đã config có thể nói là hợp lý nhất rồi nên mình sẽ không thay đổi phần này nữa :thinking:

### Kết quả

Bạn chạy theo đường dẫn sau http://127.0.0.1:8000/log-viewer sẽ thấy màn hình của LogViewer

**Dashbard**

![](https://images.viblo.asia/e9464cfc-defc-4e84-a7b6-e591d8c16501.png)

**Danh sách file Log theo ngày**

![](https://images.viblo.asia/7149a8fb-ba1b-4072-8bdc-49b2e3ca2b41.png)

**Chi tiết lỗi trong file log**

![](https://images.viblo.asia/c6ce869f-53bb-4b22-9de6-d86663d9440c.png)

---

Như vậy mình đã giới thiệu về package LogViewer là gì và cách cài đặt nó trong một ứng dụng laravel, hi vọng nó sẽ giúp ích cho các bạn nào muốn debug file log nó màu mè hơn thay vì toàn chữ là chữ như trước nữa :joy: xin chào và hẹn gặp lại!

Source code package: https://github.com/ARCANEDEV/LogViewer