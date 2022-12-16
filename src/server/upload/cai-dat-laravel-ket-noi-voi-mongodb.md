![Untitled](https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa7ba9df1-2cec-40a0-a35d-6dc8c5296234%2FUntitled.png?table=block&id=f44458a8-591a-40bf-93e8-e5ab1e85e1ee&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=2330&userId=&cache=v2)

### Laravel-Sail có hỗ trợ Mongodb không?

Như các bạn đã biết Laravel-Sail không hỗ trợ hỗ trợ Mongodb, hôm này mình sẽ hướng dẫn các bạn cách thêm Service Mongodb vào Laravel-Sail và cài đặt các thành phần cần thiết để có thể Laravel có thể kết nối được với Service Laravel

### Khởi tạo dữ án với Laravel Sail

Chúng ta thống nhất tên dự án sẽ là "laravel-sail-mongodb" và tiến hành cài đặt theo lệnh sau

```bash
curl -s "https://laravel.build/laravel-sail-mongodb" | bash
```

![Untitled](https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8faa6536-36d4-4720-843a-1d99e6a23d8b%2FUntitled.png?table=block&id=4a7337f2-fa09-40bd-8e92-5c6e32bee708&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=1310&userId=&cache=v2)

Truy cập thư mục dự án và khởi chạy Docker

```bash
cd laravel-sail-mongodb
./vendor/bin/sail up -d
```

![Untitled](https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8026573e-ed88-41b6-9fb5-16a9d4fe8d75%2FUntitled.png?table=block&id=38de084c-529e-4dfa-a3f7-a8aaa9af099e&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=1360&userId=&cache=v2)

### Thêm mới Service Mongodb

Trước khi có thể điều chỉnh thêm **service mongodb** chúng ta cần public sail bằng cách thực thi lệnh sau

```bash
./vendor/bin/sail artisan sail:publish
```

![Untitled](https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F62243a28-6361-425a-a6b6-ab76360fddab%2FUntitled.png?table=block&id=4e108a3c-a0c1-4258-89a0-f733cfc4baf1&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=1440&userId=&cache=v2)

- Lưu ý: trước khi thực hiện điều chỉnh file **docker-compose.yml** bạn cần down docker-composer để không gây lỗi sau khi điều chỉnh và start lại

```bash
./vendor/bin/sail down
```

Tiếp tục mở file **docker-compose.yml** sau khi thấy nó được copy ra ngoài thư mục góc, và thêm **service mongodb**

```bash
# For more information: https://laravel.com/docs/sail
version: '3'
services:
    laravel.test:
        build:
            context: ./docker/8.0
            dockerfile: Dockerfile
            args:
                WWWGROUP: '${WWWGROUP}'
        image: sail-8.0/app
        ports:
            - '${APP_PORT:-80}:80'
        environment:
            WWWUSER: '${WWWUSER}'
            LARAVEL_SAIL: 1
            XDEBUG_MODE: '${SAIL_XDEBUG_MODE:-off}'
            XDEBUG_CONFIG: '${SAIL_XDEBUG_CONFIG:-client_host=host.docker.internal}'
        volumes:
            - '.:/var/www/html'
        networks:
            - sail
        depends_on:
            - mongo
    mongo:
        image: 'mongo:5.0'
        restart: always
        ports:
            - '${DB_PORT:-27017}:27017'
        environment:
            MONGO_INITDB_ROOT_USERNAME: '${DB_USERNAME}'
            MONGO_INITDB_ROOT_PASSWORD: '${DB_PASSWORD}'
            MONGO_INITDB_DATABASE: '${DB_DATABASE}'
        volumes:
            - 'sailmongo:/data/db/sail'
        networks:
            - sail
networks:
    sail:
        driver: bridge
volumes:
    sailmongo:
        driver: local
```

Tới bước này, xem như Docker của bạn đã cài đặt thành công một **service mongodb** mới

### Cập nhật thành phần cần thiết để PHP có thể tương tác với Mongodb

Trong file **docker/8.0/Dockerfile** chúng ****ta cần thêm các thành phần để giúp PHP có thể kết nối được với Mongodb

Củ thể ở đây, chúng ta sẽ cài đặt thêm **php8.0-mongodb** trên Ubuntu

```bash
php8.0-mongodb
```

Thêm vào sau **php8.0-redis** như hình dưới

![Untitled](https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9c452cd8-c9f7-49be-8928-611482a7522b%2FUntitled.png?table=block&id=b2c27e66-d104-49a6-8b66-3729d60d601d&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=1550&userId=&cache=v2)

Tiền hành build lại Service này để có được cập nhật

```bash
./vendor/bin/sail build
```

![Untitled](https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F51c78b0c-9985-4913-b1b6-9f769a205e35%2FUntitled.png?table=block&id=e8855cd1-87a3-4505-916e-70bf73b6c5c8&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=1520&userId=&cache=v2)

### Kiểm tra kết quả Docker

Sau khi bạn thực hiện các bước ở trên, xem như các bước cập nhật docker và thành phần cần thiết để đảm bảo PHP có thể kết nối được với mongodb đã xong

Chạy lệnh để khởi động lại tất cả service

```bash
./vendor/bin/sail up -d
```

![Untitled](https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F70cab4a6-99a6-42f3-8429-2952ca7e601c%2FUntitled.png?table=block&id=80fc55ee-4f80-4139-b8ce-caf9b537eef0&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=1320&userId=&cache=v2)

Như vậy chúng ta đã thấy trong dự án này có 2 service gồm ( Web và mongodb )

### Điều chỉnh cài đặt Laravel đế kết nối được với Service Mongodb setup ở trên

Trong file .env điều chỉnh lại thông tin như dưới

```bash
DB_CONNECTION=mongodb#Thành phần này sẽ được định nghĩa trong config
DB_HOST=mongo#Tên này là tên service khi chúng ta điều chỉnh docker-compose
DB_PORT=27017#Lưu ý là vì bên trong các docker gọi cho nhau nên port sẽ là 27017
DB_DATABASE=laravel_sail_mongodb
DB_USERNAME=sail
DB_PASSWORD=password
```

![Untitled](https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F47f8f439-523c-4e72-89a4-00e34759d7f3%2FUntitled.png?table=block&id=9a0cac86-7805-4404-aa08-13af4d682732&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=780&userId=&cache=v2)

Trong file config/database.php thêm config dành cho connection mongodb

```bash
'mongodb' => [
            'driver' => 'mongodb',
            'host' => env('DB_HOST'),
            'port' => env('DB_PORT'),
            'database' => env('DB_DATABASE'),
            'username' => env('DB_USERNAME'),
            'password' => env('DB_PASSWORD'),
            'options' => [
                'database' => env('DB_AUTHENTICATION_DATABASE', 'admin'),
            ],
        ],
```

![Untitled](https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F89202b38-f834-4dd4-ab78-692b033a5ff9%2FUntitled.png?table=block&id=fca37185-e377-4e7b-98af-7b0d46f12eb9&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=1580&userId=&cache=v2)

Cài đặt Package hỗ trợ Mongodb

```bash
./vendor/bin/sail composer require jenssegers/mongodb
```

![Untitled](https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fb02f41df-9ddf-4d31-aee8-7986a78569cd%2FUntitled.png?table=block&id=d5d74a41-d27e-4561-a924-7dd8ba73d48a&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=1820&userId=&cache=v2)

Sau khi cài đặt Package xong tiến hành chạy migration

```bash
./vendor/bin/sail artisan migrate
```

![Untitled](https://qtzznn.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8cc4f4a9-a657-4523-9959-766f5fe6f525%2FUntitled.png?table=block&id=bd20d40c-f080-42f6-bfa4-a3224b127f8e&spaceId=64c0bbf8-5559-45b5-aca7-f80013657cd2&width=1660&userId=&cache=v2)

Nếu kết quả được như hình trên, thì mọi thứ cài đặt của chúng ta đã hoạt động

Từ giờ Code của các bạn có thể hoạt động được với Mongodb

Do nội dung bài viết cũng khá dài, mình xin kết thúc tại đây xem như chung ta đã xong vấn đề cài đặt để đảm bảo hoạt động giữa Laravel & Mongodb

Qua bài kế tiếp trong mình sẽ giới thiệu các bạn về các thao tác cở bản khi làm việc với Mongodb

**Repository**: https://github.com/qt91/laravel-sail-mongodb