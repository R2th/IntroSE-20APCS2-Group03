Gần đây có đọc được một bài giới thiệu về một library/tool laravel của một bác kỹ sư người nhật  cũng khá thú vị nên muốn giới thiệu với mọi người.

Library/tool này chưa được nhiều người biết đến nên hiện tại chưa có sao nào.
Nhưng mình nghĩ nếu mọi người có thể dùng thử thì tốt. Nếu không cứ thử cài đặt và xem thử cách code của người nhật như thế nào.

## Laravel Rocket là gì?
Github: https://laravel-rocket.github.io/#

Laravel Rocket là một công cụ giúp bạn có thể implement các application Laravel nhanh hơn và đồng nhất cách implement.

Như thế nào gọi là đồng nhất cách implement? Nó có nghĩa là dù bất cứ ai, implement như thế nào thì khi sử dụng tool này phải thống nhất một cách implement chung duy nhất.

Với tool này bạn có thể sử dụng MySQL Workbench để tạo thiết kế DB, hoặc tạo thiết kế API bằng Swagger, hay thậm chí là generate tự động các API, CRUD (React base), Repository, Model, file Migration. 
Ngoài ra tool này cũng giúp bạn có thể viết được những unit test cơ bản. 

Trong library/tool này cung cấp sẵn các chức năng như Facebook Login, hay chức năng quản lý quyền hạn của Admin (những chức năng cơ bản khi tạo một app). Bạn cũng có thể thay đổi cấu trúc table, add thêm Service Layer. Nhờ vậy khi sử dụng tool này chỉ cần quyết định thiết kết DB, spec API; sau đó viết logic bussiness kết nỗi giữa các bên là có thể nhanh chóng tạo được một server API cơ bản.

Bạn chỉ cần quyết định thiết kế, tool sẽ generate code tự động. Sau đó xây dựng thêm ở phía Front End là được.

Ngoài ra, một trong những tính năng của tool này đó là "đồng nhất cách implement".

Vốn dĩ mục địch của một Web Applicaition Framwork là để code nhanh hơn và đồng bộ cách code.
Tuy nhiên Laravel lại là 1 framework có độ tự do cao, cho phép dev có thể code theo cách riêng của mình.
Vì thế thường có xu hướng phát sinh những vấn đề như:
* Khi phát triển dự án mới, nếu cách code bị phụ thuộc vào người phụ trách thì các member tham gia vào sau sẽ khó đọc
* Các junior dev thường dễ mắc phải sai lầm trong thiết kế khi bắt đầu phát triển

Để giải quyết vấn đề này thường các công ty sẽ có một file Coding Rule, hoặc sử dụng Tool generate code để viết code cho những phần cơ bản nhất (đảm bảo cho phần base không phát sinh quá nhiều sự khác biệt.

Laravel Rocket chính là một tool như vậy


## Cách sử dụng Laravel Rocket
Vấn đề lớn của Laravel Rocket đó là hầu như không có document. (Vì bàn đầu ông tác giả chỉ có ý định việt ra cái tool cho ông ấy dùng thôi). 
Tuy nhiên nó không khó để sử dụng. Sau đây sẽ là cách sử dụng từ a...z

### Tạo project
Khi sử dụng Laravel Rocket, trước tiên thay vì tạo project bằng cách thông thường của Laravel thì cần sử dụng tool command line của Laravel Rocket để tạo project.
Vì thế trước tiên cần install tool này đã. 
```
composer global require "laravel-rocket/installer"
```

Sau khi chạy command ở trên thì có thể sử dụng command rocket. Hãy sử dụng command rocket để tạo mới project như sau:

```
rocket new [awesome project name]
```

Sau khi project mới được tạo thì composer sẽ được update, các loại thư viện khác cũng sẽ được install tự động. 

### Thiết kế DB

Tiếp theo là tiến hành thiết kế DB. 

Sau khi tạo mới project tool sẽ generate sẵn file documents/db.mwb, Bạn có thể mở file này bằng MySQL Workbench. 
Lúc này bạn có thể xem được thiết kế table một cách trực quan, đồng thời cũng có thể thực hiện các setting như setting relation chẳng hạn,...

![](https://images.viblo.asia/17faa0ec-3f61-4e35-88e0-0330658ffd0b.png)

Đối với PostgreSQL thì cũng có thể sử dụng MySQL Workbench được tuy nhiên sẽ phải điều chỉnh rất nhiều. (Vì MySQL Workbend là tool của MySQL) .

### Generate code tự động
Sau khi thiết kế db và lưu file lại xong bạn cần chạy câu lệnh artisan để tạo file migration, Model, Repository, Admin CRUD, file test dựa trên file documents/db.mwb này.
```
php artisan rocket:generate:from-mwb
```

Nếu không có vấn đề gì thì tất cả các file cơ bản sẽ được generate ra sau khi chạy câu lệnh ở trên.

Sau đó nếu cần thiết bạn có thể chỉnh sửa file .env; và sau khi đã chuẩn bị xong xuôi db với các câu lệnh *'php artisan migrate*' và *'php artisan db:seed'  thì bạn có thể khởi động server bằng câu lệnh 'php artisan serve'.

Sau đó bạn thử access vào màn hình quản lý bằng url http://localhost:8000/admin . Lúc này bạn sẽ thấy màn hình quản lý đã được tạo tự động với [CoreUI](https://coreui.io/). 
![](https://images.viblo.asia/3dcfe92a-9193-4423-8332-8c96901e9a44.png)


### Customize với app.json
Đối với code được generate tự động trong Laravel Rocket thì bạn có thể thực hiện customize bằng cách chỉnh sửa file app.json, đặc biệt là customize xử lý CRUD. 

Ví dụ như bạn có thể lựa chọn cho select bằng checkbox hay selector, có thể edit với những quyền hạn nào,...
Tuy nhiên phần này thì vẫn còn đang bug và tác giả cũng đang thực hiện chỉnh sửa khá nhiều. 


Tobe continue....