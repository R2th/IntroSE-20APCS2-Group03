# PhpStorm viết và run test
`Bài viết lấy ví dụ với framwork Laravel`.

`PhpStorm` là một công cụ tuyệt vời để viết code php. Và nó cũng support được hầu hết các nhu cầu của người dùng kể cả việc viết test.

Bạn đã quá mệt khi phải chờ đợi Unittest phải chạy khi run `./vendor/bin/phpunit`. Hay quá mệt mỏi khi phải viết thêm các tham số truyền vào cho nó 
```
./vendor/bin/phpunit --filter methodName className pathTofile.php

./vendor/bin/phpunit --filter 'namespace\\directoryName\\className::methodName' 
```

Test 1 lớp :

```
./vendor/bin/phpunit --filter  tests/Feature/UserTest.php

./vendor/bin/phpunit --filter 'Tests\\Feature\\UserTest'

./vendor/bin/phpunit --filter 'UserTest' 
```

Test 1 method :

 ```
 ./vendor/bin/phpunit --filter testExample 
 
 ./vendor/bin/phpunit --filter 'Tests\\Feature\\UserTest::testExample'
 
 ./vendor/bin/phpunit --filter testExample UserTest tests/Feature/UserTest.php
 ```
 
Chạy test với namespace :

`./vendor/bin/phpunit --filter 'Tests\\Feature'`

Mỗi lần chạy một hàm lại phải sửa tên sửa đường dẫn,  :scream: ôi trời tại sao không làm cho nó nhanh hơn, đấy là câu than khi bạn không có PhpStorm thôi. Khi bạn đã có PhpStorm thì việc viết test và run test trở lên đơn giản lắm, chỉ với cách click vào một button trước hàm là done!

Sau đây mình sẽ giới thiệu về tính năng tuyệt vời này của PhpStorm
## Cách viết xuôi 
Có 2 cách viết unittest với PhpStorm là `cấu hình xong viết` hoặc `viết xong cấu hình`. 

`Cấu hình xong viết`:

Đầu tiên bạn cần có một project ví dụ Laravel chẳng hạn

Mở project lên với công cụ PhpStorm.

Cấu hình `PHP`:
Chọn `File -> Setting -> PHP` từ thanh công cụ

Tại `CLI Interpreter` chọn `PHP 7.1 (hoặc 7.2 ...)` thay cho `<no interpreter>`. 

Nếu chưa có `CLI` thì có thể cài bằng google :grin: 

![](https://images.viblo.asia/2aac3573-045c-43e5-8353-80517e626d40.png)

Tiếp theo là cấu hình `Test Frameworks`. Tiếp  tục mở tab PHP ra chọn tab `Test Frameworks`. 

Ở đây sẽ có 3 cách cấu hình cho `phpunit` mà bạn có thể sử dụng:
- `Use Composer autoloader`: Sử dụng trình tải tự động của composer để cấu hình
- `Path to phpunit.phar`: Sử dụng file phpunit.phar để cấu hình 
- `Load form include path (PEAR)`: Không cấu hình. Sẽ cấu hình riêng khi chạy từng file test bằng `include()` hoặc thông thường dùng `require()` 

Thường mình sẽ chọn cách 1 hoặc 2 vì cách 3 không dùng chung được :sweat_smile:

Khi cấu hình nếu không có file `phpunit.phar` phpstorm sẽ cho bạn 3 lựa chọn:  
- Đầu tiên và dễ nhất là `Reload phpinfo` nếu bạn đã cài và phpstorm có thể tìm thấy nó, IDE này sẽ tự cập nhật đường dẫn cho bạn.
-  Cách 2 là bạn tự chọn hoặc điền đường dẫn :sweat_smile: 
-  Còn nếu chưa có file thì thôi ta dùng cách 3 click `Download phpunit.phar...` ở ngay dưới ô điền. 

Với cách 3 lại có 2 trường hợp bạn có thể dùng đó là down load vào một thư mục nào đó thường là `/usr/local/bin` để tiện sử dụng cho project khác. Nhưng vấn đề là download như thế thì chỉ máy mình chạy được và máy khác không dùng được. Nên mình thường download vào thẳng thư mục của project nhưng nó sẽ bị hạn chế vì mỗi lần lại phải cấu hình lại. 
![](https://images.viblo.asia/7ed6b5a3-9fbe-455b-a9eb-4a995b39db89.png)


### Cách viết test sao cho nhanh với PhpStorm (*)
Chọn file cần viết test ví dụ `HomeController.php`
Click chuột phải vào tên file -> New -> PHP Test ->  PHPUnit Test.

Cấu hình New PHP Test:

Mình chủ yếu chỉnh là phần `Directory` - đường dẫn tạo file test (Nếu chưa có thư mục cứ chỉnh tên đường dẫn có thư mục mới thì IDE sẽ tự tạo thư mục và thêm file vào đó cho bạn :heart_eyes:) và phần `Member`- các hàm bạn sẽ viết test.

IDE sẽ sinh ra file test từ file cần test:
 
![](https://images.viblo.asia/a377c385-22e1-455b-80d2-1ecae70cc3ee.png)

Bạn có nhìn thấy cái nút màu xanh bên cạnh hàm hoặc class vừa mới được sinh ra không?? Nó, chính nó là cái mà sẽ làm cho ta thấy tiện hơn khi run test chỉ cần click vào.

 Lúc đầu sẽ cho ra kết quả `PHPUnit 8.4.3 by Sebastian Bergmann and contributors. This test did not perform any assertions...`
 
 Đơn giản là do test của bạn chưa có phần nội dung :stuck_out_tongue_winking_eye:. Bạn có thể thêm `$this->assertTrue(true);` vào trong hàm để test thử kết quả! 
 
 ![](https://images.viblo.asia/e15f8d3c-5abe-4455-b481-0241cdd9ee38.png)
## Cách viết ngược
Chính là viết xong mới cấu hình. Nghe hơi ngược nhưng mà viết xong cấu hình vẫn được nhé các bạn vì PhpStorm khá là thông minh, nó sẽ hướng dẫn mình `fix` lại các lỗi khi không run được test.

Ban đầu bạn sinh file test ngay từ file cần test (xem ở phần *). Vẫn click chạy test, nhưng bây giờ thay vì chạy IDE sẽ bắn ra hộp thoại cấu hình cho bạn. 
![](https://images.viblo.asia/1c4aac28-a8ac-49d8-8076-248b2452ff10.png)

Có nút `Fix` được in đậm, click vào đó và cấu hình lại như phần trên thôi. Vậy là xong rồi. 
Nếu có muốn chỉnh sửa file cấu hình mà hiện bạn đang ở một file test khác. Bạn có thể click `Edit Configurations` chọn file cần sửa và chỉnh sửa.
![](https://images.viblo.asia/7f2cf9fd-37e4-41a2-85b1-db36e1075d81.png)
# Bonus
IDE tự sinh file thì nó cũng nên biết nó sinh từ chỗ nào chứ! :upside_down_face: Điều đó là dĩ nhiên rùi. 

Để từ một hàm test mà quay trở về hàm mà nó cần test chúng ta có thể chọn theo cách:

- Đưa chuột đặt tại tên hàm test (ví dụ `test__construct`) 
- Chuột phải -> Chọn Go To -> chọn Test Subject (hoặc đơn giản là `Ctl + Shift + T`)

( Cho ai cần - Nhân tiện bonus thêm cái  hình người trên ảnh là do cấu hình background trong  của IDE nhé).
# Tổng kết
Cám ơn mọi người đã dành thời gian đọc bài của mình. :kissing_heart: