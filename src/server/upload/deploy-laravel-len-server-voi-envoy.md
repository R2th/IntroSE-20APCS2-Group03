## Giới thiệu

Chào mọi người, có thể mọi người chưa biết, laravel có công cụ deploy trực tiếp lên server 1 cách cực kỳ nhanh chóng và tiện lợi đó chính là Envoy. 

Envoy có cách viết rất rõ ràng, lành mạch để xác định các tác vụ phổ biến bạn sẽ chạy trên các server. Sử dụng cú pháp kiểu Blade, bạn có thể dễ dàng thiết lập các task để deploy bằng các lệnh Artisan cực kỳ dễ dàng. 

Lưu ý nhỏ là: Hiện tại, Laravel Envoy chỉ có hỗ trợ cho hệ điều hành Mac và Linux.

## Cài đặt

Trước tiên, bạn cần cài đặt Envoy bằng lệnh Composer:
```
composer global require laravel/envoy
```

Ở đây mình dùng global để cài đặt, tức là sẽ chỉ cần cài đặt 1 lần thôi, các lần sau không cần cài đặt nữa.

![Install envoy](https://images.viblo.asia/e1b5385c-442d-4288-9445-55b8a9c42067.png)

## Khai báo task

Tất cả các tác vụ Envoy của bạn phải được xác định trong tệp Envoy.blade.php trong thư mục root của dự án:
VD:
```

@servers(['web' => ['user@192.168.1.1']])

@task('foo', ['on' => 'web'])
    ls -la
@endtask
```

Bên trên mình có dùng 1 màng `@servers` đã được xác định ở đầu tệp, điều này cho phép bạn tham chiếu đến các server này trong tùy chọn khai báo task. 

Trong các khai báo `@task`, bạn có thể viết các lệnh cần thiết để thực thi trên server.

Nếu bạn muốn thực thi các lệnh dưới localhost, thì bạn chỉ định địa chỉ IP của server là 127.0.0.1:

```
@servers(['localhost' => '127.0.0.1'])
```

## Use setup

Đôi khi, bạn có thể muốn thực thi một số mã PHP trước khi thực hiện các task của Envoy. Bạn có thể sử dụng lệnh `@setup` để khai báo các biến và chạy PHP trước khi bất kỳ task nào khác của envoy được thực thi:
```
@setup
    $now = new DateTime();

    $environment = isset($env) ? $env : "testing";
@endsetup
```

Nếu bạn cần required các file PHP khác trước khi task envoy được thực thi, bạn có thể sử dụng lệnh `@include` như ví dụ dưới đây :
```

@include('vendor/autoload.php')

@task('foo')
    # ...
@endtask
```

## Use variable

Nếu cần, bạn có thể chuyển các giá trị tùy chọn vào các tác vụ của Envoy bằng lệnh:
```

envoy run deploy --branch=master
```

Bạn có thể truy cập các tùy chọn trong tác vụ của mình thông qua cú pháp "echo" của Blade. Bạn cũng có thể sử dụng nếu câu lệnh và vòng lặp trong nhiệm vụ của mình. 

VD:
```

@servers(['web' => '192.168.1.1'])
@task('deploy', ['on' => 'web'])
    cd site
    @if ($branch)
        git pull origin {{$branch}}
    @endif
    php artisan migrate
@endtask
```
Đoạn code trên mình kiểm tra biến branch truyền vào trước, nếu có branch thì sẽ thực thi pull code từ branch về. Easy phải không nào?

## Use story

Khi bạn có nhiều task muốn gộp lại để chạy 1 lần, hãy sử dụng `story`, nó sẽ nhóm một nhóm các task dưới một tên đơn, điều này cho phép bạn nhóm các nhiệm vụ nhỏ, tập trung thành các nhiệm vụ lớn. 

Ví dụ, một list triển khai có thể chạy các tác vụ git và composer bằng cách liệt kê các tên tác vụ trong `story` nó:
```

@servers(['web' => '192.168.1.1'])

@story('deploy')
    git
    composer
@endstory

@task('git')
    git pull origin master
@endtask

@task('composer')
    composer install
@endtask
```

Cách chạy story như bình thường:
```

envoy run deploy
```

## Multiple Servers

Envoy sẽ cho phép bạn dễ dàng chạy một tác vụ trên nhiều server. 

```
@servers(['web-1' => '192.168.1.1', 'web-2' => '192.168.1.2']) //Khai báo multi servers
@task('deploy', ['on' => ['web-1', 'web-2']]) //Thực thi trên nhiều server
    cd site
    git pull origin {{ $branch }}
    php artisan migrate
@endtask
```

## Parallel Execution

Theo mặc định, các tác vụ được thực thi trên mỗi server. Điều này có nghĩa, một task sẽ phải hoàn thành chạy trên máy chủ đầu tiên trước khi tiến hành thực hiện trên máy chủ thứ hai. Nếu bạn muốn chạy một tác vụ trên nhiều servers song song, bạn cần thêm tùy chọn `parallel` vào khai báo `task` của mình:
```

@servers(['web-1' => '192.168.1.1', 'web-2' => '192.168.1.2'])

@task('deploy', ['on' => ['web-1', 'web-2'], 'parallel' => true]) // This is line
    cd site
    git pull origin {{ $branch }}
    php artisan migrate
@endtask
```

## Confirming Task Execution
Một chức năng rất quan trọng trong khi deploy đó là `confirm`, confirm hành động trước rồi mới thực thi.

Tùy chọn này rất hữu ích để mình xác nhận lại thực sự bạn muốn thực thi task này:
```

@task('deploy', ['on' => 'web', 'confirm' => true])
    cd site
    git pull origin {{ $branch }}
    php artisan migrate
@endtask
```

## Notifications

### Slack
Viễn cảnh được đặt ra khi dự án của bạn có nhiều bên như app, api, backend, frontend. Sẽ có lúc bạn cần thông báo đến 1 service nào đó về kết quả deploy để các bên được biết.

Envoy đã hỗ trợ trong việc gửi thông báo tới Slack sau khi mỗi tác vụ được thực thi. Lệnh `@slack` sẽ chấp nhận URL hook Slack và tên `channel`. 

Bạn có thể truy xuất URL webhook của mình bằng cách tạo tích hợp "WebHooks" trong dashboard Slack của bạn. Bạn phải chuyển toàn bộ URL webhook vào chỉ thị `@slack`:
```

@finished
    @slack('webhook-url', '#channel') //Để gửi thông báo tới một kênh
    @slack('webhook-url', '@user') //Để gửi thông báo cho người dùng
@endfinished
```
## Tài liệu tham khảo
[https://laravel.com/docs/6.x/envoy](https://laravel.com/docs/6.x/envoy)

Thanks for reading!.