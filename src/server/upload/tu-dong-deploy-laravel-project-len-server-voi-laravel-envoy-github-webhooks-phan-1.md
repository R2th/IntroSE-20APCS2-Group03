# Giới thiệu

Xin chào các bạn! Mình đã quay trở lại rồi đây.

Như các bạn đã biết triển khai ứng dụng lên máy chủ là một công việc có vẻ đơn giản nhưng cũng đầy rủi ro.

Nếu bạn làm việc này theo cách *cổ điển* thì bạn phải:

- Ssh vào server
- Pull git
- Chạy lệnh cập nhật thư viện: composer install, yarn install,...
- Chạy lệnh migrate: php artisan migrate
- Chạy các lệnh để build css, js

Có quá nhiều câu lệnh phải thực hiện. Thật không dễ dàng gì để nhớ và thực hiện hết các câu lệnh trên. Nếu bạn chạy sai lệnh hay quên không chạy một lệnh gì đó thì sẽ khiến trang web của bạn có thể không chạy đúng. Bên cạnh đó khi bạn đang thực hiện lệnh (giả sử mới pull git về xong nhưng chưa chạy composer install) thì trang web của bạn đã không thể truy cập được rồi. Tức là trang web sẽ có thời gian chết trong quá trình triển khai mã chương trình mới.

Để giải quyết các vấn đề đó chúng ta sẽ cùng nhau tìm hiểu cách thiết lập hệ thống tự động triển khai (auto deployment) trang web laravel của mình lên server sử dụng Laravel envoy và Github webhook.

Mình sẽ chia vấn đề này thành phần để cho các bạn dễ theo dõi và dễ hiểu hơn:

- Deploy sử dụng Laravel envoy
- Thiết lập auto deploy sử dụng Github webhook

Bài viết này chúng ta sẽ tìm hiểu phần thứ nhất: Deploy sử dụng Laravel envoy

# Deploy sử dụng Laravel envoy

## Laravel envoy
Laravel envoy bạn có thể hiểu đơn giản nó là một công cụ giúp chúng ta thực hiện các tác vụ trên máy chủ từ xa. Bình thường chúng ta phải **ssh** vào máy chủ rồi chạy các câu lệnh. Nhưng khi sử dụng Laravel envoy ta chỉ cần viết các câu lệnh đó vào một tác vụ (tác vụ **A** chẳng hạn) của envoy. Sau đó chạy lệnh envoy yêu cầu nó thực hiện tác vụ **A** thì tất cả các lệnh mình viết trong A sẽ được thực hiện trên máy chủ được chỉ định sẵn. Ưu điểm của việc này là ta không cần phải nhớ, không cần phải gõ quá nhiều câu lệnh chỉ cần nhớ mỗi câu lệnh envoy thôi mọi thứ sẽ được thực hiện đúng như những gì ta mong đợi. Và tất nhiên sử dụng Laravel envoy chúng ta sẽ tạo được kịch bản để deploy dự án của mình lên máy chủ một cách *đơn giản* và *dễ dàng*.

## Vấn đề triển khai project laravel

Deploy thì dễ nhưng deploy mà thời gian chết của trang web là **0** thì rất khó.

Giả sử bạn có một project đang chạy ở thư mục thư mục gốc là **A**. Bạn muốn triển khai project đó với mã nguồn mới hơn và không làm ảnh hưởng đến cái đang chạy thì bạn phải tạo một thư mục **B** rồi triển khai trên đó. Sau khi cài đặt các thứ trên **B** xong thì bạn sẽ chuyển đổi thư mục gốc của trang web sang **B**. Bạn có thể vào `config` của Apache hay Nginx để thay đổi file cấu hình rồi `restart` lại Apache/Nginx. Nhưng điều đó quả thật là không nên vì nó phải sử dụng quyền cao nhất của server (`sudo`) và nó làm mất đi tính *tự động* của hệ thống của mình. Bạn có thể nghĩ đến việc xóa thư mục **A** rồi đổi tên **B** thành **A**. Đây cũng là một ý tưởng tốt nhưng nó lại tốn thời gian (vì dung lượng của thư mục code có thể không lớn nhưng có rất nhiều file nên quá trình xóa sẽ rất lâu) và chẳng may **B** bị lỗi thì không thể quay trở về **A** được.

Có một cách dễ dàng hơn để làm được điều này. Bạn sẽ sử dụng câu lệnh `ln` để liên kết thư mục gốc của trang web với thư mục chứa mã chương trình của mình. Khi truy cập vào thư mục gốc của trang web nó sẽ nhảy đến thư mục chứa mã chương trình của mình. Nếu muốn thay đổi thư mục chứa chương trình thì chỉ cần liên kết lại là xong. Trong tình huống trên ta sẽ liên kết thư mục gốc của web với **A**. Khi deploy xong sẽ liên kết với **B**. Nếu **B** chẳng may bị lỗi thì ta lại liên kết với **A** để xử lý lỗi ở **B**. Lúc này hệ thống vẫn chạy bình thường trên **A**. Xử lý lỗi xong lại liên kết đến **B**.  Quá trình tạo một liên kết (link) rất nhanh nên có thể nói cách này sẽ giúp việc deploy với thời gian chết là **0**.

Tuy nhiên nếu **B** là cái mới hoàn toàn thì những dữ liệu người dùng tải lên (ảnh, video, tài liệu,...) sẽ không có trong **B**. Do vậy chúng ta phải sao chép các thư mục chứa những dữ liệu như vậy ra một nơi khác (thư mục **share** chẳng hạn). Những thư mục tài nguyên trong **A** và **B** sẽ được liên kết với các thư mục tương ứng trong **share**.

Xét một project laravel cụ thể. Sau khi cài đặt xong ta có thể thấy chương trình của chúng ta sẽ có rất nhiều thư mục chứa các tài nguyên khác nhau:

- Các thư mục của framework laravel và code của mình: `app`, `config`, `database`, `resources`, `public`, `routes`...
- Các thư mục chứa các thư viện: `node_modules`, `vendor`
- Các thư mục chứa tài nguyên người dùng tải lên: thông thường mình sẽ đặt ở một thư mục con nào đó trong thư mục `storage`
- Các thư mục chứa file tài nguyên cố định (ví dụ một bản hướng dẫn người dùng bằng file docx): sẽ chứa trong thư mục `storage`
- Thư mục chứa session của trang web: mặc định sẽ là `storage/framework/sessions`
- Các thư mục chứa dữ liệu được tạo ra bởi laravel (cache view, các loại cache khác,...): sẽ tồn tài trong `storage/framework`

Bây giờ phải phân tích và tính toán xem thư mục nào cần phải cho vào **share** và thư mục nào là không cần. Những tài nguyên cho vào **share** phải là tài nguyên được tạo ra khi người dùng thực hiện các thao tác trên hệ thống của mình hoặc là một tài nguyên tĩnh nào đó của hệ thống mà mình sẽ *không bao giờ thay đổi* mỗi lần *deploy*.

- Các thư mục của framework laravel và code của mình tất nhiên *không thể share* được vì mỗi lần mình cập nhật thì nội dung mã sẽ khác.
- `node_modules`, `vendor` là các thư mục rất nặng của project nhưng lại *không nên share*. Vì mỗi khi bạn cài một thư viện mới hoặc xóa thư viện cũ đi hay chỉ là thay đổi phiên bản của thư viện thì dữ liệu trong 2 thư mục này nó sẽ đồng bộ theo cái cài đặt sử dụng thư viện mới của bạn. Như vậy nếu triển khai bản mới project của bạn thì bản cũ không thể sử dụng được rồi. Mình phải đảm bảo việc có thể quay lại phiên bản cũ để đề phòng phiên bản mới có lỗi không lường trước được. Chốt lại là không share thư mục này.
- Thư mục chứa tài nguyên người dùng tải lên: *share* ngay và luôn
- Thư mục chứa file tài nguyên cố định: *không share*. Vì giả sử mình muốn thêm file mới vào thư mục này chẳng hạn. Nếu bạn share thì khi pull git về chúng ta sẽ xóa thư mục này đi và liên kết thư mục đó trong **share**. Lúc này thư mục trong share sẽ không thể có nội dung mình mới cho vào được.
- Thư mục chứa session: *share*. Giả sử người dùng đang đăng nhập và có thực hiện một việc gì đó mà ta lưu lại session chẳng hạn. Nếu mình *không share* thì khi chuyển sang bản mới các dữ liệu đó mất hết. Chính trạng thái đăng nhập của người dùng cũng có thể bị mất nếu bạn thiết lập không cho remember token. Người dùng đang nhập liệu một cái gì đó chẳng hạn thì sẽ bị lỗi vì chưa đăng nhập. Còn nếu như project của bạn có sử dụng session để lưu một cái gì đó có cấu trúc dữ liệu khác giữa 2 phiên bản thì bạn bỏ share thư mục này.
- Thư mục chứa dữ liệu được tạo ra bởi laravel: *không share*. Vì khi view thay đổi chẳng hạn thì dữ liệu cache sẽ thay đổi theo. Nếu bạn share thì có thể sẽ dẫn đến bị lỗi do vẫn sử dụng dữ liệu cache từ phiên bản cũ.

Sau một hồi hì hục phân tích thì chúng ta sẽ **share** các dữ liệu tải lên của người dùng và session thôi. Ngoài ra mình còn phải share thêm một file cực kì quan trọng nữa. Đó là file `.env`. Đây là file cấu hình chung cho toàn bộ các phiên bản khi mình triển khai.

## Cài đặt và sử dụng Laravel envoy

Cài đăt Laravel envoy rất dễ dàng chỉ cần chạy câu lệnh 

```
composer global require laravel/envoy
```

Sau khi cài đặt xong là bạn đã sử dụng được envoy luôn. Cách sử dụng envoy thì đơn giản thôi. Cú pháp của nó giống cú pháp của blade template nên rất trực quan và dễ sử dụng. Bạn viết đoạn mã sau vào file `Envoy.blade.php` trong thư mục gốc của dự án.

```
@servers(['web' => ['user@192.168.1.1']])

@task('foo', ['on' => 'web'])
    ls -la
@endtask
```

Sau đó chạy lệnh `envoy run foo` như vậy là lệnh trong task `foo` sẽ được chạy trên server `web`.

Bạn hãy tham khảo trang [docs của envoy](https://laravel.com/docs/5.8/envoy) để biết thêm chi tiết cách sử dụng của nó nhé.

## Thiết kế công cụ deploy

Để triển khai dự án laravel lên server từ github bạn phải thực hiện các bước:

- **Clone dữ liệu**: Clone github repository vào một thư mục. Tên thư mục sẽ được đặt theo thời gian deploy
- **Khởi tạo thư mục share**: Tạo các thư mục, các file share nếu chúng không tồn tại
- **Liên kết thư mục được share**: Xóa các thư mục share trong thư mục mới clone từ github về và liên kết chúng tương ứng với các thư mục trong share
- **Liên kết file .env**: Tạo liên kết với file `.env` trong share
- **Cài đặt các thư viện**: chạy `composer install`, `yarn install`
- **Chạy các lệnh khác**: `php artisan migrate --force`, `php artisan storage:link`, `yarn prod`
- **Phân quyền**: cấp thêm quyền cho các thư mục cần thiết
- **Chuyển web root**: liên kết thư mục gốc của trang web với thư mục đã được triển khai xong

Cấu trúc thư mục của hệ thống deploy sẽ như sau:

![](https://images.viblo.asia/e0731a0f-6b0c-4b03-9c06-4bc112c0d605.png)

- **current**: là thư mục gốc của web. Nó sẽ link đến thư mục được triển khai trong **releases**
- **releases**: sẽ chứa các bản deploy
- **share**: chứa các thư mục được chia sẻ giữa các phiên bản deploy 

Cấu hình vitual host ở file apache config: DocumentRoot sẽ là thư mục `public` trong thư mục `current`

```
<VirtualHost *:80>
    ServerName envoy-deploy.lc

    ServerAdmin webmaster@envoy-deploy.lc
    DocumentRoot /www/envoy-deploy/current/public

    <Directory /www/envoy-deploy/current/public>
        Options FollowSymLinks
        AllowOverride All
        Order allow,deny
        Allow from all
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Sử dụng Laravel envoy trước tiên phải tạo file `Envoy.blade.php` ở thư mục sẽ chạy command `envoy` bao gồm story **deploy** và các tasks thực hiện các công việc ở trên:

```
@servers(['local' => '127.0.0.1', 'server' => ['user@192.168.1.1']])

@setup

@endsetup

@story('deploy', ['on' => 'server'])
    git
    link-share
    install
    scripts
    permissions
    update-current
@endstory

@task('git')

@endtask

@task('link-share')

@endtask

@task('install')

@endtask

@task('scripts')

@endtask

@task('permissions')

@endtask

@task('update-current')

@endtask

@finished
    echo "Finished!!!!";
@endfinished
```

**Chú ý:** nếu task không có câu lệnh nào thì envoy sẽ báo lỗi do đó bạn hãy comment những task nào chưa dùng đến trong quá trình viết các task.


### Clone dữ liệu

Đối với mỗi lần deploy khác nhau thì mình có thể chỉ định được cần deploy branch nào, deploy vào thư mục release nào. Do đó ta phải thiết kế câu lệnh làm sao có thể *clone* một *branch bất kỳ* từ git về một *thư mục nào đó*. 

Câu lệnh clone dữ liệu từ github sẽ như sau:

```bash
git clone -b master "git@github.com:HoangHoi/envoy-auto-deploy.git" releases/2019-04-21_09-00-00
```

Mình sẽ tạo các biến lưu giá trị để khi nào muốn thay đổi sẽ dễ dàng hơn: `$gitRepo` (repository github link), `$defaultBrand` (brand mặc định - bạn có thể dùng thuộc tính *--brand* để chỉ định cần pull brand nào),  `$release` (tên thư mục mình sẽ clone code về), `$path` (thư mục gốc).

```
@setup
    $path = __DIR__;
    $now = new DateTime();
    $gitRepo = 'git@github.com:HoangHoi/envoy-auto-deploy.git';
    $defaultBrand = 'master';
    $release = 'releases/' . $now->format('Y-m-d_H-i-s');
@endsetup
```

Thêm lệnh `clone` vào task `git`.

```
@task('git')
    git clone -b {{ $branch ?? $defaultBrand }} {{ $gitRepo }} {{ $release }}
@endtask
```

Phần `{{ $branch ?? $defaultBrand }}` giúp bạn có thể dùng thuộc tính *--brand* để chỉ định cần pull brand nào (ví dụ: `envoy run deploy --branch=develop`). Sau khi clone xong thì tất cả dữ liệu chương trình sẽ được đặt trong thư mục `$release`.

### Liên kết các tài nguyên được share

Trong project của mình có một thư mục dùng để lưu ảnh avatar của user (`storage/app/public/avatars`) mình sẽ cài đặt để share thư mục đó. Ngoài ra sẽ có thư mục `storage/framework/sessions`, `storage/logs` cũng sẽ được share. Khi deploy lần đầu tiên thì mặc định trong share sẽ không có thư mục hay file nào cả. Mình phải khởi tạo thư mục ban đầu cũng như khởi tạo file được share. Ví dụ file `.env` thì phải copy từ file `.env.example`. Sau khi khởi tạo xong thì xóa những thư mục đó trong bản *release*. Cuối cùng sẽ tạo `symlinks` liên kết thư mục trong bản *release* với thư mục trong *share*.

Để dễ dàng thao tác hơn, mình sẽ tạo một mảng lưu các thư mục share cần phải tạo symlinks

```
@setup
    {{-- ............... --}}

    $symlinks = [
        'storage/app/public/avatars',
        'storage/framework/sessions',
        'storage/logs',
    ];
@endsetup
```

Duyệt qua tất cả thư mục share để tạo symlink, tạo thư mục nếu cần thiết. Riêng file `.env` sẽ được khởi tạo từ `.env.example`.

```
@task('link-share')
    @foreach ($symlinks as $symlink)
        @if (!file_exists('share/' . $symlink))
            mkdir -p share/{{ $symlink }}
        @endif

        rm -rf {{ $release }}/{{ $symlink }}
        ln -nfs {{ $path }}/share/{{ $symlink }} {{ $release }}/{{ $symlink }}
    @endforeach

    echo "All symlinks share have been set"

    @if (!file_exists('share/.env'))
        cp "{{ $release . '/.env.example' }}" "share/.env"
    @endif

    ln -nfs {{ $path }}/share/.env {{ $release }}/.env
@endtask
```

### Cài đặt các thư viện

Khi một task mới được chạy, thư mục làm việc sẽ được chuyển thành thư mục gốc (thư mục chứa file `Envoy.blade.php` đó). Vì vậy muốn thao tác với thư mục nào ta phải chuyển đến thư mục đó bằng lệnh `cd`.

```
@task('install')
    cd {{ $release }}
    composer install --no-interaction

    php ./artisan key:generate
    php ./artisan migrate --force
    php ./artisan storage:link
@endtask
```

**Chú ý:** Lúc install composer thì có thể xảy ra trường hợp gói có nhiều phiên bản hỗ trợ hoặc bị xung đột với gói nào đó thì mình phải chọn gói cài đặt phù hợp. Tức là mình phải tương tác với terminal khi trong quá trình install. Để bỏ sự tương tác, cho composer thực hiện tự động thì phải cho thêm thuộc tính `--no-interaction`.

### Chạy các lệnh khác

Phần này mình sẽ chạy các lệnh liên quan đến việc install các thư viện javascript và build file css và js.

```
@task('scripts')
    cd {{ $release }}
    yarn install --non-interactive
    yarn prod
@endtask
```


### Cấp quyền

Cấp quyền cho các thư mục làm sao để cho vừa bảo mật và web chạy được cũng không phải là vấn đề đơn giản. Mình sẽ có một bài viết để bàn luận kỹ hơn về vấn đề này. Như các bạn đã biết apache trên ubuntu chạy dưới quyền của người dùng **www-data**.  Cách mình triển khai sẽ cho người dùng **www-data** sở hữu thư mục code. Đối với các thư mục cần quyền ghi mình sẽ cấp full quyền cho người dùng sở hữu nó (**www-data**).

```
@task('permissions')
    {{-- chmod -R ug+rwx {{ $release }}/storage --}}
    {{-- chmod -R ug+rwx {{ $path }}/share/storage --}}
    {{-- chmod -R ug+rwx {{ $release }}/bootstrap/cache --}}
    find {{ $release }}/storage -type d -exec chmod ug+rwx {} \;
    find share/storage -type d -exec chmod ug+rwx {} \;
    find {{ $release }}/bootstrap/cache -type d -exec chmod ug+rwx {} \;
@endtask
```

 Thông thường chúng ta hay sử dụng các câu lệnh mình đã comment vì nó ngắn và dễ nhớ. Ví dụ `{{-- chmod -R ug+rwx {{ $release }}/storage --}}`. Câu lệnh này sẽ cấp quyền cho tất cả file và thư mục con có trong `{{ $release }}/storage`. Điều này dường như không cần thiết, chỉ cần cấp quyền cho thư mục là đủ. Vì thông thường các thư mục chứa dữ liệu kiểu như thế này mặc định nó sẽ rỗng. Dữ liệu trong đó sẽ được tạo ra trong quá trình chạy.

### Chuyển web root

Khi mọi việc diễn ra thuận lợi thì sẽ tiến hành xóa file `current` cũ đi và tạo liên kết với một bản `release` mới.

```
@task('update-current')
	rm -rf {{ $path }}/current
    ln -nfs {{ $path }}/{{ $release }} {{ $path }}/current

    echo "Link current folder to {{ $release }}"
@endtask
```

# Kết quả

Vậy là xong rồi. Bạn có thể xem chương trình đầy đủ tại [https://github.com/HoangHoi/envoy-deploy](https://github.com/HoangHoi/envoy-deploy).

Khi nào bạn muốn deploy thì chỉ cần chạy lệnh `envoy run deploy` rồi đi pha ngay một cốc milo để chờ đợi thôi. Thật dễ dàng và đơn giản phải không các bạn.


# Kết luận

Như vậy chúng ta đã cùng nhau xây dựng xong *công cụ* triển khai hệ thống sử dụng Laravel envoy.  Bài viết của mình xin kết thúc tại đây. Hi vọng sẽ giúp ích được cho các bạn. Nếu bạn thấy hay thì hãy upvote và chia sẻ cho bạn bè cùng đọc. Đừng quên Follow mình để nhận được thông báo khi mình có bài viết mới nhé. Chúc các bạn có một ngày tốt lành!