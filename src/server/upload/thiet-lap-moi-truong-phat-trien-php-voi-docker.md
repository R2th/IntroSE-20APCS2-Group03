Trong hướng dẫn này, tôi sẽ trình bày cách thiết lập môi trường phát triển PHP, cách thiết lập với Docker. 

Có rất nhiều cách để cài đặt môi trường PHP, nhưng sử dụng Docker là cách tốt nhất hiện tại.

Dưới đây là một vài cách mọi người đã dùng để cài đặt môi trường phát triển PHP của họ trong những năm qua

## Kiến thức cơ bản 

Một trong những vấn đề với phát triển web là mọi thứ thay đổi với tốc độ nhanh chóng. PHP hiện đã có phiên bản 8 và thậm chí các công cụ chúng ta sử dụng để thực thi các tập lệnh PHP đang được cải tiến theo thời gian. Do đó, rất nhiều hướng dẫn bị lỗi thời khá nhanh.

Tôi sẽ tóm tắt lại mọi thứ đã thay đổi như thế nào trong những năm qua

### 1. Cài đặt thủ công PHP, MySQL và Apache

Với những ai lập trình web từ những năm 90, thì đó thật là quá trình cài đặt vất vả, bạn sẽ phải cài đặt thủ công Apache, PHP và MySQL trên máy của mình.

Để có được một môi trường phát triển, đòi hỏi cần có kiến thức chuyên môn đáng kể. Bạn cần biết cách cấu hình máy chủ web, cách cấu hình PHP và bạn phải trải qua quá trình cài đặt và cấu hình thủ công tất cả phần mềm bạn đã sử dụng. Đây là một nhiệm vụ tốn thời gian và khó khăn đối với các nhà phát triển mới 

### 2. Các gói được cấu hình sẵn như XAMPP

Vào đầu những năm 2000, mọi người đã bắt đầu tập hợp tất cả phần mềm cần thiết trong một gói duy nhất để cài đặt và cấu hình tất cả phần mềm cần thiêt. Các gói này là những thứ như XAMPP và WAMP, và chỉ với một nút bấm, chúng đã cung cấp cho bạn một môi trường phát triển có thể sử dụng được.

Nếu bạn tham gia các nhóm facebook PHP khác nhau, bạn sẽ thấy rằng một phần đáng kể các nhà phát triển mới vẫn làm theo các hướng dẫn từ thời đại này, vì vậy XAMPP vẫn được sử dụng khá rộng rãi.

Sử dụng XAMPP giúp bạn dễ dàng thiết lập và chạy môi trường phát triển web trên máy tính của mình. nhưng sẽ có nhiều vấn đề xảy ra khi bạn muốn đưa trang web của mình lên production. Các phiên bản PHP, MySQL và Apache (hoặc NGINX) có thể khác nhau với các phiên bản bạn đã cài đặt trong gói XAMPP. Ngoài ra, có một vài khác biệt nhỏ, nhưng khá khó chịu, giữa Windows và Linux. Nếu bạn đang phát triển trang web của mình trên máy Windows và deploy lên máy chủ Linux, một số code của bạn có thể hoàn toàn không hoạt động được 

### 3. Máy ảo và Vagrant

Vào cuối những năm 2000 và đầu những năm 2010, xu hướng của các nhà phát triển là chuyển sang máy ảo. Ý tưởng là bạn có thể chạy một bản sao hệ điều hành của máy chủ web kèm với tất cả các chương trình đã cài đặt của nó - cấu hình và thiết lập giống hệt như máy chủ web thực mà bạn sẽ triển khai trang web của mình.

Trong khi nhiều lập trình viên nhìn thấy lợi ích của một môi trường như vậy, khó khăn và thời gian cần thiết để cài đặt làm cho ít người làm được. Đó là cho đến khi Vagrant (và các công cụ liên quan như Puphpet) xuất hiện và loại bỏ mọi rắc rối sẵn có.

### 4. Docker

Nếu Vagrant tuyệt vời như vậy, tại sao lại sử dụng thứ khác thay thế?

Các lợi ích chính của môi trường ảo được thiết lập bằng Vagrant là:

PC phát triển của bạn không bị ràng buộc vào một môi trường cụ thể. Bạn có thể lưu trữ nhiều trang web: một trang sử dụng Apache, một sử dụng NGINX, một sử dụng PHP 7 và một sử dụng PHP 8.

Khi trang web hoạt động, trang web đang được tải lên chính xác cùng môi trường mà nó được phát triển.

Dễ hiểu tại sao các nhà phát triển muốn điều này. Với Docker, ta sẽ giữ những lợi ích này trong khi tránh một số nhược điểm của môi trường Vagrant / Virtual Machine

**Có chuyện gì với Vagrant?**

Bất chấp những lợi ích, một môi trường phát triển dựa trên Vagrant đưa ra những hạn chế của riêng nó:

- Với tài nguyên hệ thống, Vagrant yêu cầu chạy một hệ điều hành hoàn toàn khác. Bạn cần tải xuống và cài đặt hệ điều hành đang chạy trên máy chủ web của mình cũng như tất cả các gói mà hệ điều hành yêu cầu. Điều này sử dụng một lượng lớn dung lượng ổ đĩa và bộ nhớ. Một máy ảo thông thường sẽ cần ít nhất 512 MB RAM. Đó không phải là nhiều đối với máy tính ngày nay, nhưng nó nhanh chóng tăng lên. Nếu bạn muốn lưu trữ một trang web trên PHP 7 và một trên PHP 8, bạn cần cài đặt và cấu hình hai phiên bản máy ảo khác nhau trên máy tính của mình.

- Bạn phải đảm bảo máy ảo và máy chủ được đồng bộ. Bất cứ khi nào bạn cập nhật máy chủ hoặc thay đổi cấu hình của máy chủ, bạn phải nhớ cập nhật môi trường phát triển local của mình. 

- Nó gắn chặt bạn vào hệ điều hành máy chủ và cấu hình. Di chuyển một trang web từ máy chủ này sang máy chủ khác là một nhiệm vụ khó khăn. Bởi vì một trang web không chỉ là tập lệnh PHP, mà gồm hình ảnh và CSS tạo nên nó. Cấu hình máy chủ (chẳng hạn như phần mở rộng PHP đã cài đặt và nginx.conf / httpd.conf) cũng được yêu cầu để trang web hoạt động chính xác.

- Hạn chế lựa chọn với các gói có sẵn. Tùy thuộc vào bản phân phối Linux mà máy chủ web của bạn đang chạy, bạn có thể không có bất kỳ lựa chọn nào về phiên bản PHP mà bạn chạy. Trừ khi bạn cài đặt các gói từ kho lưu trữ của bên thứ ba, bạn sẽ không thể sử dụng phiên bản PHP mới nhất và tốt nhất. Tại thời điểm này, PHP 8 gần đây đã có sẵn. Nếu bạn đang sử dụng CentOS 8 / RHEL 8, bạn sẽ gặp khó khăn với PHP 7.3 cho đến khi nhận được phiên bản mới của hệ điều hành. Nếu bạn đang sử dụng Debian, phiên bản mới nhất hiện có là 7.3. Các bản phân phối khác sẽ yêu cầu các phiên bản khác nhau.

- Cấu hình máy chủ là toàn cục. PHP có một tệp cài đặt được gọi là php.ini. Thay đổi file này sẽ áp dụng cho cấu hình của mọi trang web được lưu trữ trên máy chủ. Tương tự với nginx.conf cho NGINX hoặc httpd.conf cho Apache. Cơ sở dữ liệu MySQL cho tất cả các trang web được lưu trữ trên máy chủ. Thực hiện bất kỳ thay đổi cấu hình cơ sở dữ liệu quy mô lớn nào là điều có thể làm được. Cập nhật cài đặt MySQL sẽ ảnh hưởng đến mọi trang web sử dụng máy chủ MySQL đó

- Các phiên bản gói là toàn cục trên máy chủ. Mặc dù có thể chạy nhiều phiên bản PHP trên cùng một máy chủ web, nhưng rất khó để cấu hình và có thể có các lỗi lạ tùy thuộc vào những gì tập lệnh của bạn đang làm (chẳng hạn như khi bạn có một tập lệnh mà bạn muốn chạy trong systemd/cronjob và quên rằng bạn nên sử dụng /bin/php72 hơn là /bin/php).

## Giới thiệu Docker

Docker giải quyết tất cả các vấn đề được liệt kê ở trên. Nhưng Docker là gì và nó hoạt động như thế nào?

Có khá nhiều bài viết nói về Docker nên tôi sẽ không đề cập quá chi tiết lý thuyết.

Lợi ích thiết thực đối với nhà phát triển web là Docker cho phép chúng ta đóng gói mọi thứ mà trang web cần, tất cả mã PHP cùng với tệp thực thi PHP, máy chủ MySQL và máy chủ NGINX và các tệp cấu hình được sử dụng bởi các chương trình đó.

Tất cả code của trang web và các phiên bản của chương trình cần để chạy mã đó được đóng gói cùng nhau, coi như là một ứng dụng duy nhất. Toàn bộ ứng dụng này sau đó có thể được chạy trên bất kỳ hệ điều hành nào. Khi ai đó chạy ứng dụng được đóng gói, PHP, MySQL, NGINX và tất cả các tệp PHP bạn đã viết đều được nhúng vào chính ứng dụng đó. Khi bạn chạy ứng dụng, các phiên bản chính xác của các công cụ này sẽ được tải xuống và cài đặt.

Với Vagrant, khi đang chạy Máy ảo, hệ điều hành đã bao gồm phiên bản PHP, MySQL cố định và cấu hình máy chủ (thường) được sao chép từ máy chủ web thực. Khi máy chủ được cập nhật, máy ảo cũng phải được cập nhật.

Tuy nhiên, khi sử dụng Docker, phiên bản PHP / MySQL / NGINX được cung cấp dưới dạng một gói duy nhất được gọi là `image` và máy chủ có thể chạy nhiều image khác nhau tùy thích.

Lợi ích ở đây là máy chủ web và máy local của bạn đều chạy cùng một image. Bạn chỉ cần tải image của mình lên máy chủ web, chạy toàn bộ ứng dụng ở đó và trang web của bạn hoạt động mà không cần bất kỳ cấu hình máy chủ web nào.

Ngoài ra, mỗi image sẽ hoàn toàn tách biệt với image khác trên máy chủ. Mỗi trang web sẽ có cấu hình NGINX riêng, php.ini riêng và các bản cài đặt PHP và MySQL riêng. Mỗi trang web có thể chạy các phiên bản PHP hoàn toàn khác nhau. Bạn thậm chí có thể có một trang web chạy trên Apache và một trang web chạy trên NGINX, trên cùng một máy cùng một lúc. Ngay cả khi bạn đang chạy hai trang web NGINX khác nhau, bạn sẽ có hai process NGINX khác nhau, với các cấu hình riêng, chạy cùng một lúc.

Điều này yêu cầu chi phí bộ nhớ không nhỏ, nhưng tính linh hoạt mà nó mang lại thì là một sự đánh đổi rất đáng giá

## Cài đặt 

### Chuẩn bị 

Trước khi bắt đầu, bạn cần tải xuống và cài đặt Docker. Truy cập trang web Docker, sau đó tải xuống và cài đặt nó cho hệ điều hành của bạn.

Nếu đang sử dụng Linux, bạn nên cài đặt các gói phần mềm docker thông qua trình quản lý gói của bản phân phối của bạn. 

### Bắt đầu

Một máy chủ web thường bao gồm nhiều chương trình khác nhau - chẳng hạn như NGINX, PHP và MySQL. Theo thuật ngữ của Docker, mỗi chương trình bạn muốn cài đặt là một service.

Có một số cách để tạo các service này trong Docker. Docker hỗ trợ tạo tệp cấu hình bằng YAML.

Bạn có thể chạy lệnh trên command line, tuy nhiên vẫn nên sử dụng tệp cấu hình YAML vì một số lý do:

- Nó dễ đọc hiểu hơn rất nhiều.

- Bạn không phải nhập lại nhiều lệnh dài mỗi khi muốn chạy máy chủ.

- Bạn có thể theo dõi các thay đổi đối với tệp bằng Git

### docker-compose.yml cho NGINX

Docker cung cấp một công cụ có tên là docker-compose, lấy một tệp cấu hình có tên là `docker-compose.yml` và khởi chạy các service được liệt kê bên trong nó. 

Đầu tiên, hãy thêm một máy chủ web, NGINX.

Bạn tạo một thư mục ở đâu đó trên máy tính để lưu trữ trang web của bạn. Tạo docker-compose.yml với các nội dung sau:

```
version: '3'
services:
    web:
        image: nginx:latest
        ports:
            - "80:80"
```

Ánh xạ các cổng máy ảo với máy thật. Nó sẽ chuyển tiếp cổng 80 trên máy cục bộ đến cổng 80 trên container. Mọi yêu cầu trên máy chủ tới http://127.0.0.1 sẽ được chuyển tiếp đến máy chủ NGINX đang chạy trong container.

### Chạy service 

Mở terminal và chạy lệnh `docker-compose up`

Bạn sẽ thấy đầu ra tương tự như hình ảnh bên dưới

Nếu chạy thành công, bạn có thể kết nối với máy chủ bằng cách truy cập http://127.0.0.1 trong trình duyệt của mình. Khi đấy, bạn sẽ thấy trang default của NGINX, như hình bên dưới

![](https://images.viblo.asia/4c1124f7-9a49-4656-a69f-1ebb3d86c441.png)

### Tại sao không phải là Apache

Trước khi chúng ta tiếp tục, bạn có thể thắc mắc tại sao tôi không sử dụng Apache ở đây. Nếu bạn đang sử dụng XAMPP hoặc một gói tương tự thì máy chủ web bạn đang sử dụng là Apache.

Apache vẫn ổn và nó vẫn hoạt động hiệu quả. Khi Apache được tạo ra, Web là rất khác với hiện nay. Apache có rất nhiều tính năng khác nhau đã xuất hiện và biến mất - nhưng Apache vẫn hỗ trợ. Nhưng trang web đã thay đổi rất nhiều kể từ khi Apache được tạo ra và mặc dù đây là một máy chủ có khả năng hoạt động tốt, hầu hết các trang web ngày nay đều có xu hướng sử dụng NGINX. Nó dễ cấu hình hơn, nhẹ hơn và được điều chỉnh tốt hơn cho các loại tác vụ mà nhiều trang web hiện đại sử dụng (chẳng hạn như phát trực tuyến video) và do đó, thị phần của nó đang tăng lên nhanh chóng với chi phí của Apache.

Lời khuyên chung của tôi là: nếu bạn đã có một trang web đang chạy Apache, không có lý do gì để bạn phải vất vả thay đổi lại, nhưng nếu bạn đang bắt đầu một dự án mới từ đầu, hãy sử dụng NGINX

### Đưa file lên máy chủ

Bây giờ server đã được cài đặt và chạy qua Docker, chúng tôi có thể hiển thị các file của mình trên máy chủ. Nếu bạn đã quen với Apache, bạn sẽ đặt chúng vào httpdocs, htdocs hoặc thư mục public ở đâu đó trên máy tính của mình.

Vì máy chủ đang chạy trong container, nên nó không có quyền truy cập vào bất kỳ tệp nào trên máy tính của bạn. Tuy nhiên, Docker cho phép bạn chỉ định một file hoặc thư mục trên máy tính của bạn để chia sẻ với container. Bạn sẽ cần hai file: file cấu hình nginx.conf và một thư mục sẽ lưu trữ các file trên trang web của bạn. Vây, ta sẽ sửa lại docker-compose.yml:

```
version: '3'
services:
    web:
        image: nginx:latest
        ports:
            - "80:80"
        volumes:
            - ./nginx.conf:/etc/nginx/conf.d/nginx.conf
            - ./app:/app
```

Điều này làm cho tệp nginx.conf và thư mục app map với thư mục app có sẵn trong container. Bất kỳ thay đổi nào bạn thực hiện đối với file trong app hoặc nginx.conf sẽ được thay đổi ngay lập tức trong container 

Tệp nginx.conf từ máy chủ được đặt tại /etc/nginx/conf.d/nginx.conf bên trong container. Đây là thư mục mà NGINX đọc các file cấu hình. Thư mục app là nơi bạn sẽ đặt tất cả các file PHP, hình ảnh và JavaScript trên trang web của mình.

Trước khi khởi động lại máy chủ, hãy tạo tệp nginx.conf trong cùng thư mục với docker-compose.yml của bạn với nội dung sau

```
server {
    listen 80 default_server;
    root /app/public;
} 
```

Điều này cho NGINX biết rằng đây là cấu hình nó sẽ sử dụng cho máy chủ mặc định và nó sẽ phân phát các file từ thư mục /app/public. 

Để kiểm tra xem nó có hoạt động không, hãy tạo trang “Hello, World” tại app/public/index.html, VD:

```
<h1>Hello, World!</h1>
```

Chạy lại lệnh docker-compose up để khởi động lại server 

Mở url http://127.0.0.1 ta sẽ thấy Hello world  

### PHP

Nếu bạn muốn chạy các file PHP, bạn sẽ cần thêm một service khác cho PHP trong docker-compose.yml của mình và liên kết nó với nginx:

```
version: '3'
services:
    web:
        image: nginx:latest
        ports:
            - "80:80"
        volumes:
            - ./nginx.conf:/etc/nginx/conf.d/nginx.conf
            - ./app:/app
    php:
        image: php:fpm
        volumes:
            - ./app:/app
```

Service php sử dụng image php:fpm. Đối với NGINX, bạn sẽ cần sử dụng gói fpm (FastCGI Process Manager), nhưng bạn có thể chọn bất kỳ phiên bản PHP nào bạn thích - chẳng hạn như php: 7.4-fpm, php: 7.3-fpm, php: 8.0-fpm. Nếu bạn không chỉ định phiên bản và chỉ sử dụng php: fpm, nó sẽ sử dụng phiên bản mới nhất - tại thời điểm viết bài, là 8.0.

Bởi vì PHP sẽ cần truy cập các tệp .php của bạn từ thư mục /app, bạn sẽ cần gắn map folder trong image PHP giống như cách bạn đã làm cho image NGINX.

Trước khi khởi động lại máy chủ, chúng ta cần cấu hình NGINX để chạy các tệp .php thông qua service PHP. Thay đổi file nginx.conf như sau:

```
server {
    listen 80 default_server;
    root /app/public;

    index index.php index.html index.htm;

    location ~ \.php$ {
        fastcgi_pass php:9000;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;     
    }
} 
```

Dòng index cho phép máy chủ tìm kiếm index.php thay vì index.html như trang mặc định. Block location hướng dẫn NGINX chạy bất kỳ tệp nào có phần mở rộng .php thông qua service PHP (fastcgi_pass php:9000, trong đó php là tên của service được cấu hình trong docker-compose.yml).

Tạo tệp phpinfo tại app/public/index.php:

```
<?php
phpinfo();
```

Khởi động lại bằng lệnh docker-compose up. Nếu mọi thứ được thiết lập chính xác, khi bạn truy cập http://127.0.0.1, bạn sẽ thấy kết quả phpinfo()

Giả sử trang web của bạn đang sử dụng MySQL, nếu bạn xem qua trang phpinfo(), bạn sẽ nhận thấy rằng không có bộ adapter MySQL nào được cài đặt. Chúng ta sẽ cần cài đặt gói PDO trong PHP.

Điều này hơi phức tạp, vì chúng ta cần cài đặt gói này trong image, tuy nhiên, trong PHP image bản chính thức đã cài sẵn rồi 

Chúng tôi sẽ sử dụng image php:fpm làm base image và cài đặt adapter PDO MySQL vào đó.

Trước tiên, hãy sửa đổi docker-compose.yml để tạo image PHP mới từ image php: fpm hiện có:

```
version: '3'
services:
    web:
        image: nginx:latest
        ports:
            - "80:80"
        volumes:
            - ./nginx.conf:/etc/nginx/conf.d/nginx.conf
            - ./app:/app
    php:
        build:
            context: .
            dockerfile: PHP.Dockerfile
        volumes:
            - ./app:/app
```

Thay vì nhập image có sẵn, bây giờ ta cần build một bản image mới.

Tạo PHP.Dockerfile trong cùng một thư mục với docker-compose.yml của bạn và thêm những thứ sau:

```
FROM php:fpm

RUN docker-php-ext-install pdo pdo_mysql
```

Thao tác này sẽ cài đặt phần mở rộng pdo_mysql cho PHP. Chỉ thị FROM nói với Docker rằng nó nên sử dụng php: fpm làm base image và RUN được sử dụng để chạy các lệnh bên trong image. Bạn có thể chạy bất kỳ lệnh Linux nào tại đây. Trong trường hợp này, chúng tôi đang chạy tập lệnh docker-php-ext-install, được cung cấp sẵn trong gói PHP chính thức và cho phép chúng ta cài đặt các phần mở rộng PHP.

Nếu bạn muốn sử dụng thư viện MySQLi, bạn có thể cài đặt nó thay vì PDO:

```
FROM php:fpm

RUN docker-php-ext-install mysqli
```

Khởi động lại máy chủ của bạn bằng lệnh docker-compose up.

Bạn có thể xác định pdo_mysql đã được cài đặt bằng cách xem output phpinfo () trên http://127.0.0.1.

Ngoài ra có thể cài thêm xdebug để có thông báo lỗi đẹp hơn trên local:

```
FROM php:fpm

RUN docker-php-ext-install pdo pdo_mysql

RUN pecl install xdebug && docker-php-ext-enable xdebug
```

xdebug được cài đặt thông qua pecl, được cung cấp như một phần của image PHP offical. Chạy lại docker-compose up và kiểm tra output của phpinfo () sẽ cho thấy rằng cả pdo_mysql và xdebug đều được cài đặt.

### MYSQL 

Bây giờ chúng tôi đã sẵn sàng cài đặt MySQL. Một lần nữa, chúng tôi sẽ thêm nó dưới dạng một service trong docker-compose.yml. Tuy nhiên, thay vì cài đặt image MySQL chính thức, chúng tôi sẽ sử dụng MariaDB, một giải pháp thay thế với các điều khoản cấp phép trong tương lai có khả năng tốt hơn hiện tại mà MySQL thuộc sở hữu của Oracle. Nếu bạn đã sử dụng MySQL trước đây, MariaDB sẽ hoạt động giống như vậy:

```
version: '3'
services:
    web:
        image: nginx:latest
        ports:
            - "80:80"
        volumes:
            - ./nginx.conf:/etc/nginx/conf.d/nginx.conf
            - ./app:/app
    php:
        build:
            context: .
            dockerfile: PHP.Dockerfile
        volumes:
            - ./app:/app
    mysql:
        image: mariadb:latest
        environment:
            MYSQL_ROOT_PASSWORD: 'secret'
            MYSQL_USER: 'tutorial'
            MYSQL_PASSWORD: 'secret'
            MYSQL_DATABASE: 'tutorial'
        volumes:
            - mysqldata:/var/lib/mysql
        ports:
            - 3306:3306
volumes:
    mysqldata: {}
```

Image đang sử dụng là mariadb:lastest. Cũng như NGINX và PHP, nếu muốn, bạn có thể chỉ định một phiên bản cụ thể của MariaDB tại đây.

Lần này cần bổ sung thêm một vài biến môi trường:

MYSQL_ROOT_PASSWORD: mật khẩu gốc của cơ sở dữ liệu. Bạn có thể sử dụng điều này để đăng nhập với tư cách người chủ và quản lý cơ sở dữ liệu.

MYSQL_USER và MYSQL_PASSWORD: tên và mật khẩu cho người dùng MySQL được tạo với các quyền hạn chế. 

MYSQL_DATABASE: tên của database 

Lý do tôi không muốn sử dụng thư mục trong hệ thống tệp cục bộ là khi ứng dụng được tải lên máy chủ web thực, bạn không muốn ghi đè cơ sở dữ liệu thực bằng máy chủ ảo của mình. Tất cả các bản ghi môi trường thử nghiệm / phát triển của bạn sẽ được lưu trữ tại đây. Điều này cho phép bạn có một cơ sở dữ liệu khác nhau trên máy chủ trực tiếp và máy chủ phát triển khi bạn tải lên trang web của mình.

Cuối cùng, map cổng hiển thị cổng 3306 để chúng ta có thể kết nối với nó với một máy khách như MySQL Workbench để quản lý cơ sở dữ liệu. 

Khởi động lại máy chủ của bạn. Sẽ mất một hoặc hai phút để tải xuống và cấu hình MariaDB lần đầu tiên. Sau đó, trong một tập lệnh PHP, hãy thử kết nối với MySQL bằng PDO và tên người dùng, mật khẩu và tên cơ sở dữ liệu đã chọn của bạn:

```
<?php
$pdo = new PDO('mysql:dbname=tutorial;host=mysql', 'tutorial', 'secret', [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

$query = $pdo->query('SHOW VARIABLES like "version"');

$row = $query->fetch();

echo 'MySQL version:' . $row['Value'];
```

Chạy tập lệnh này trên máy chủ. Nếu bạn thấy phiên bản MySQL và không có thông báo lỗi, bạn đã kết nối với máy chủ MySQL của mình và tất cả đều được thiết lập chính xác.

### Kết luận 

Khi bạn làm cho trang web của mình hoạt động, bạn sẽ chỉ cần tải lên toàn bộ dự án, bao gồm docker-compose.yml, nginx.conf và PHP.Dockerfile, chạy docker-compose up -d trên máy chủ (option -d nghĩa là chạy service ở background). Bạn sẽ không cần thiết lập và cài đặt thủ công PHP, MariaDB và NGINX trên máy chủ web.

Docker làm cho quá trình phát triển một trang web trở nên đơn giản hơn rất nhiều vì mọi thứ đều được tự động hóa.