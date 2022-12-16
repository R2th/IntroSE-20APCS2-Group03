# Lời tựa
Đây là một phần quan trọng mà mình tin nó cũng là key để thuyết phục mọi người dùng Laravel Sail thay vì stack AMP truyền thống như Laragon. Cơ mà dạo này lu bù quá, giờ mới viết lách xíu được, hi vọng vẫn tới tay mọi người :grin::grin:

Vấn đề đã theo mình từ lúc mình để ý tới Docker, đó là quản lý tài nguyên! Laravel Sail mặc định đi kèm với Mysql, Redis, MailHog, mấy cái này là services đáng nói thôi chứ mình chưa nhắc tới mấy cái như supervisor các kiểu. Hãy tưởng tượng chúng ta cần mở 3 cái project Sail để dev, mỗi cái có 3 cái Mysql, 3 cái Redis, 3 cái MailHog, mỗi cái nó đòi vài trăm mb ram và kha khá space ổ cứng để lấy image, nghe hơi xót nhỉ :sweat_smile::sweat_smile: Cái này hoàn toàn là vấn đề của Docker, đến nước này thì Laravel ko giúp đc gì quá nhiều rồi, nên mình kêu gọi sự hỗ trợ của 1 bên nữa, 1 package của [tighten.co](https://tighten.co/), đó là [Takeout](https://github.com/tighten/takeout)

# Takeout là cái gì thế?

Takeout, giống như Sail, cũng là một công cụ để quản lý, sử dụng Docker một cách tiện lợi hơn. Nhưng mục tiêu của nó là tạo ra 1-container-duy-nhất cho mỗi service cơ bản, và có thể chia sẻ nó với tất cả local project của bạn, dù project đó có xài Docker hay không. Nghe quen không :joy::joy: Nó giống gần như kiểu một services stack như XAMPP nhưng dùng Docker ấy mà! Thời điểm mình viết bài này thì Takeout đang hỗ trợ các services như thế này

![](https://images.viblo.asia/067c6548-2370-4805-b5f4-be897f56380a.png)

Thấy tiềm năng chứ? Kể cả không dùng Laravel Sail cũng có vẻ hay hay đúng không :grin::grin:

# Cách sử dụng
Chúng ta cần cài đặt Takeout ở mức `global`, tức là dùng ở đâu cũng được chứ ko giới hạn trong 1 project Laravel, bằng câu lệnh:
```bash
composer global require tightenco/takeout
```
Rồi, chúng ta đã có thể gọi takeout từ mọi nơi trên terminal :innocent: Cùng điểm qua vài lệnh của Takeout nào. Đầu tiên, để soi xem chúng ta có thể có những services nào mà dùng, hãy gọi lệnh bên dưới, một list hiện ra và các bạn có thể dùng phím navigation, ấn lên lên xuống xuống để chọn rồi ấn enter!
```bash
takeout enable
```

Ngoài ra các bạn có thể enable 1 hoặc nhiều service bằng cách truyền thêm short name của nó
```bash
takeout enable mysql

takeout enable redis mongodb
```

Trong quá trình enable, sẽ có vài câu hỏi hiện ra, ví dụ như bạn muốn mở service này ở cổng nào, data save của nó tên gì,... tự các bạn điền nhé, ấn enter  luôn để dùng cái giá trị default trong ngoặc vuông, hoặc lười quá thì thêm option `--default` vào để skip hết câu hỏi và dùng giá trị default luôn
```bash
takeout enable mysql --default

takeout enable redis mongodb --default
```

Để tắt hẳn service, chúng ta có câu lệnh `disable`

```bash
takeout disable # chọn và tắt một service

takeout disable --all # tắt hết tất cả service
```

Các bạn có thể coi [link git của Takeout](https://github.com/tighten/takeout) để coi hết giới thiệu và câu lệnh của nó nhé :satisfied::satisfied:

# Cùng thử với MySQL nào
Mặc định thì Sail đang xài MySQL v8, mình sẽ thử setup MySQL với Takeout

```
takeout enable mysql --default
```

Chúng ta vừa khởi động MySQL bản mới nhất hiện tại - chính là 8.0, tại port 3306 với tên volumn là `mysql_data`. Hiện các bạn có thể connect thử với nó thông qua HeidiSQL hay phpmyAdmin chẳng hạn. Mình thì thử nhanh với CLI luôn, bạn nào muốn làm giống mình thì cố gắng cài `mysql-client` nhé. Mình đang xài wsl2-ubuntu nên mình cần cài
```bash
sudo apt install mysql-client
```

Sau khi cài xong, bình thường mình sẽ xài `mysql`, cơ mà mình xài wsl2 nên mình cần define host là `127.0.0.1` thay vì mặc định (là `localhost` thì phải) :sweat_smile::sweat_smile:
```bash
mysql -uroot -p -h 127.0.0.1
```

Nếu mọi thứ trôi chảy, thì bạn đang vào giao diện của `mysql-client`, tại đây chúng ta sẽ tạo nhanh database cho project của chúng ta nào

```bash
create database example_app;
```


# Laravel Sail và Tighten Takeout song kiếm hợp bích
OK, coi như 2 thằng đã hoạt động, cho nó kết hợp nào. Đầu tiên, mở file `docker-compose.yml` bên trong project của các bạn lên, chúng ta sẽ cố gắng tắt mysql, redis, mailhog được cung cấp bởi Sail, bằng cách xóa hoặc comment lại hết mấy đoạn liên quan tới bọn nó.

![](https://images.viblo.asia/a27d0ffe-ac96-4377-8d62-4a430b806972.png)

Để kết nối Sail với Takeout, chúng ta cần thêm 1 `network` nữa trong `docker-compose.yml`. Các bạn kéo xuống chỗ `networks` và thêm 1 mục nữa
```yml
takeout
    external:
        name: takeout
```

Giờ cái networks của chúng ta nó thành như này

![](https://images.viblo.asia/e33f6493-d1fc-47d1-aa3c-95fc4d341b9f.png)

Giờ kéo lên trên, tìm tới services, bên trong đó, tìm tới networks và thêm 1 cái `- takeout` nữa

![](https://images.viblo.asia/80a2687d-b6a8-4349-9ec0-f74182c4c618.png)

Lưu hết lại và chạy lại `sail up -d`. Project của chúng ta hẳn đã kết hợp tốt với Takeout rồi. Ơ mà rồi xài mấy cái service làm sao? Thời điểm này các bạn gõ `takeout list` 

![](https://images.viblo.asia/321e8ac8-331e-4ab2-8202-c54d78e91282.png)

Thấy 2 cột "Base Alias" và "Full Alias" chứ? Chúng ta có thể sử dụng 1 trong 2 cái đó để điền vào file `.env` của chúng ta. Mà hiện nó cũng đang là `mysql` rồi nên chỉ sửa credentials nữa là xong. 

```bash
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=example_app
DB_USERNAME=root
DB_PASSWORD=
```

Chạy thử `sail artisan migrate` nào!

![](https://images.viblo.asia/24308b36-1e1d-4392-a1bd-163a72e87311.png)

Ò có vẻ chạy rồi :laughing::laughing:

Vậy các bạn mò tiếp nhé, mình lại lượn đây =]]