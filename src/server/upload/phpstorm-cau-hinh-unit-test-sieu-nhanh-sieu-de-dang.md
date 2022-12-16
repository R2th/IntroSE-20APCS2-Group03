# PHPStorm cấu hình Unit test siêu nhanh, siêu dễ dàng

####  Nguyên vật liệu cần chuẩn bị:
* Docker & Docker composer
* PHPStorm

## Bước 1: Cấu hình môi trường
Để bắt đầu với bài thực hành, các bạn kéo Repository này về
```
git clone git@github.com:qt91/PhpStorm-UnitTest-Laravel.git
```
Sau khi kéo repository này về xong tiếp tục thực hiện
```
$ cd PhpStorm-UnitTest-Laravel
$ make start
```
Lần đầu tiên chạy phần này các bạn sẽ mất một ít thời gian để **Docker** build
Sau khi đợi docker chạy xong, sẽ có kết quả như bên dưới
![enter image description here](https://i.imgur.com/2Wdk2aO.png)
Lúc này cơ bản môi trường của bạn đã chuẩn bị xong. 
Hãy sử dụng lệnh
```bash
$ docker ps
```
![enter image description here](https://i.imgur.com/jTSdYSL.png)
Hình dưới thể hiện các dịch vụ đã hoạt động tốt

## Bước 2: Setup Laravel
Tiếp tục thực hiện lệnh
```bash
$ make install_laravel
```
Truy cập vào đường dẫn `localhost:8000` hình ảnh xuất hiện như dưới là các bạn đã thành công
![enter image description here](https://i.imgur.com/j57ZI9x.png)

## Bước 3: Chạy Unit Test bằng phong cách truyền thống
Trong **Laravel** thư mục test tại đường dẫn
`PhpStorm-UnitTest-Laravel/src/tests`

![enter image description here](https://i.imgur.com/5kn59o7.png)

Hãy mở file `ExampleTest.php` và bắt đầu làm việc với nó.
![enter image description here](https://i.imgur.com/cFItVU9.png)
Theo cách truyền thống mà giới `Underground` hay dùng là chúng ta sẽ gõ lệnh để c thể chạy được. Lệnh đó được mô tả như đoạn văn sau đây @@.
```bash
$ docker exec -it phpstorm-unittest-laravel_phpfpm_1 sh -c 'phpunit --filter testBasicTest tests/Feature/ExampleTest.php'
// Mô tả bằng mồm sẽ có dạng như sau
// Chun vào docker rồi lôi cái tên file ra, gọi đến cái function muốn chạy
```
![enter image description here](https://i.imgur.com/xML0kat.png)
Khi bạn gõ hết dòng lệnh đó để chạy đước cái unit test mong muốn, thì thằng chiến hữu bên cạnh đã xem xong bộ phim `Không dấu chân người` và bắt đầu luyên thuyên một vài câu nói đạo lý.
Ngoài ra bạn còn phải chạy unit test cho `folder`, cho `file`..... quá nhiều thứ để phải gõ ra........

Bằng cách lười biến một tí bạn có thể cấu hình để mọi chuyện trở nên đơn giản hơn bằng cách click chuột, hoặc chỉ đơn giản sử dụng một tổ hợp phím tắt.

## Bước 4: Chạy Unit test bằng phong cách lười biến
Trên PHPStorm sử dụng tổ hợp phím và tìm `Languages & Frameworks`
```
Shift + Command + A
# Để mở search action
# Preferences | Languages & Frameworks | PHP
```
![enter image description here](https://i.imgur.com/6SEx0vq.png)

Tiếp tục chọn `...` ở phía Phải, dòng `CLI Interpreter`
Màn hình **Interperter** xuất hiện
![enter image description here](https://i.imgur.com/ngSV2IR.png)
Bấm `+` để tiến hành thêm mới một `Interpreter`
Ở đây chúng ta chọn dòng như hình, vì chúng ta sẽ dùng file Docker trong dự án hiện tại
![enter image description here](https://i.imgur.com/izUK3KC.png)

Sau khi chọn `From Docker.....`
Màn hình như dưới xuất hiện, và chúng ta sẽ chọn tương tự
![enter image description here](https://i.imgur.com/JY2Gyt4.png)
Sau khi nhấn `OK`
Màn hình dưới sẽ thông báo cho chng ta biết đã tạo thành công một `Interpreter` và thông báo chính xác phiên bản PHP đang sử dụng là 7.3.11
![enter image description here](https://i.imgur.com/Q63tkO5.png)
Nhấn `OK` để kết thúc bước tạo `Interpreter`, việc này cần thiết để chúng ta bước sang thao tác tiếp theo
Hãy đảm bảo rằng khi bạn chọn menu `PHP` sẽ được như hình dưới
![enter image description here](https://i.imgur.com/QxwWKZp.png)

Bước tiếp theo là chọn vào menu `Test Frameworks`
```bash
Preferences | Languages & Frameworks | PHP | Test Frameworks
```
Chọn dấu `+` để tiếp tục cấu hình 
![enter image description here](https://i.imgur.com/hi064UE.png)
Chúng ta cần chọn `PHPUnit by Remote Interpreter` chính là cái mà chúng ta đã cấu hình ở phần trên
![enter image description here](https://i.imgur.com/a0fxolS.png)
Chọn đúng tên và `OK`
![enter image description here](https://i.imgur.com/IAm8pfn.png)

Hay điền thật chính xác thông tin như hình dưới bao gồm
> chọn Path to phpunit.phar
> Sau khi điện đúng đường dẫn nhớ chọn button `refresh` nếu nó load được phiên bản PHPUnit như hình thì mới chính xác bạn nhé.
> Và đừng quên điền luôn `Default configuration file`
![enter image description here](https://i.imgur.com/5AqWvlB.png)

Đã tới lúc tận hưởng thành quả. `OK` và mở file cần test
![enter image description here](https://i.imgur.com/L2doy3y.png)
Đã tới được bước này, các bạn sẽ cảm thấy yêu các button màu `xanh` đó nhiều hơn.
Thử click vào button `một mũi tên xanh` 
![enter image description here](https://i.imgur.com/JEpbZiE.png)
Chạy thôi chờ chi!!!!!!!!!!!!!!!!!!!!!!

Vậy là không cần dùng bất cứ dòng lệnh nào chúng ta đã có kết quả của Unit test đang viết
![enter image description here](https://i.imgur.com/NGv8MEs.png)

Sự lợi hại của việc sau khi setup được, các bạn hoàn toàn có thể chạy bất cứ thư mục nào, file nào.... mà không cần quan tâm tới đường dẫn tương đối, tuyệt đối... các 
Hay dùng thời gian có ích để đọc những bài mình viết ^^.
![enter image description here](https://i.imgur.com/LQ5RiuL.png)

#### Note:
Bạn cũng có thể sử dụng hotkey 
* Shift + Control + R: Để có thể vừa code vừa đợi kết quả test. Một cảm giác không dùng tới chuột thần thánh


## Tổng kết
Bài viết này không phải bài viết hướng dẫn về viết Unit test nên mình không tập trung vào code. Qua bài này mình muốn các bạn biết thêm một cách để có thể chạy được những dòng test của mình một cách nhanh chống đở mất thời gian. 
Nếu thật sự nó giúp các bạn dư thời gian đừng quên ủng hộ bằng cách tìm đọc các bài viết khác của mình.
Hẹn gp các bạn ở các bài viết tiếp @@.