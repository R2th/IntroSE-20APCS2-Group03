# Daily Usage
### Accessing Homestead Globally
Đôi khi bạn muốn chạy ```vagrant up``` để khởi động máy ảo Homestead tại bất cứ đâu trong hệ thống. Bạn có thể làm điều đó trên Mac / Linux bằng cách thêm hàm Bash đơn giản vào Bash profile. Trên Windows, bạn có thể thực hiện việc này bằng cách thêm file "batch" vào ```PATH``` của bạn. Script này sẽ cho phép bạn chạy lệnh Vagrant cở bất cứ đâu trong hệ thống và nó sẽ tự động trỏ lệnh đó đến nơi mà Homestead được cài đặt:

<br>

**Mac / Linux**
```
function homestead() {
    ( cd ~/Homestead && vagrant $* )
}
```
Đảm bảo rằng bạn đã chỉnh đường dẫn ```~/Homestead``` đúng với nơi mà bạn cài đặt Homestead. Khi đó bạn có thể chạy lệnh ```homestead up``` hoặc ```homestead ssh``` từ bất cứ đâu trong hệ thống.

<br>

**Windows**

Tạo một file batch ```homestead.bat``` bất cứ nơi nào trên máy tính của bạn với nội dung sau:
```
@echo off

set cwd=%cd%
set homesteadVagrant=C:\Homestead

cd /d %homesteadVagrant% && vagrant %*
cd /d %cwd%

set cwd=
set homesteadVagrant=
```

Đảm bảo rằng bạn đã chỉnh đường dẫn  ```C: \ Homestead``` trong script đến vị trí cài đặt Homestead của bạn. Sau khi tạo file, hãy thêm vị trí file vào ```PATH``` của bạn. Sau đó bạn có thể chạy các lệnh như ```homestead up``` hoặc ```homestead ssh``` từ bất cứ đâu trên hệ thống của bạn.

<br>

### Connecting Via SSH
Bạn có thể SSH vào máy ảo bằng cách sử dụng lệnh ```vagrant ssh``` từ thư mục Homestead.

Tuy nhiên, nếu bạn muốn kết nối SSH đến máy ảo thường xuyên, bạn nên cân nhắc việc thêm "function" được mô tả bên trên đến máy của bạn để có thể kết nối SSH đến hộp Homestead một cách nhanh chóng.

<br>

### Connecting To Databases
Một cơ sở dữ liệu ```homestead``` đã được cấu hình sẽ cho cả MySQL và Postgres. Để thuận tiện hơn, file cấu hình ```.env``` của Laravel  có thể kết nối đến cơ sở dữ liệu.

Để kết nối với cơ sở dữ liệu MySQL hoặc Postgres của bạn, bạn nên kết nối với ```127.0.0.1``` và cổng ```33060``` (MySQL) hoặc ```54320``` (Postgres). Tên người dùng và mật khẩu cho cả hai cơ sở dữ liệu là ```homestead / secret```.

<br>

### Adding Additional Sites
Khi môi trường Homestead của bạn đã được cấp phép và hoạt động, bạn có thể muốn thêm các trang Nginx bổ sung cho các ứng dụng Laravel của bạn.. Bạn có thể chạy nhiều ứng dụng dụng laravel theo ý bạn trên cùng một môi trường Homestead. Để thêm một trang, bạn chỉ cần thêm vào file  ```~/.homestead/Homestead.yaml``` của bạn.
```
sites:
    - map: homestead.app
      to: /home/vagrant/Code/Laravel/public
    - map: another.app
      to: /home/vagrant/Code/another/public
  ```
  Nếu Vagrant không tự động quản lý file "hosts" của bạn, bạn có thể cần phải thêm new site vào file đó:
  ```
 192.168.10.10  homestead.app
192.168.10.10  another.app
```
Khi site đã được thêm vào, hãy chạy lệnh ```vagrant reload --provision``` từ thư mục Homestead của bạn.

<br>

**Site Types**
Homestead hỗ trợ một số loại site cho phép bạn dễ dàng chạy các project không base trên Laravel. Ví dụ, chúng ta có thể dễ dàng thêm một ứng dụng Symfony vào Homestead bằng cách sử dụng site type ```symfony2```:
```
sites:
    - map: symfony2.app
      to: /home/vagrant/Code/Symfony/public
      type: symfony2
 ```
 Các site type có sẵn là: ```apache```, ```laravel``` (default), ```proxy```, ```silverstripe```, ```statamic```, ```symfony2``` và ```symfony4```.
 
 <br>
 
 **Site Parameters**
 Bạn có thể thêm các giá trị Nginx ```fastcgi_param``` bổ sung vào site của bạn thông qua ```params``` site directive. Ví dụ, chúng ta sẽ thêm một parameter ```FOO``` với một giá trị ```BAR```:
 ```
 sites:
    - map: homestead.app
      to: /home/vagrant/Code/Laravel/public
      params:
          - key: FOO
            value: BAR
 ```
 
 <br>
 
 ### Configuring Cron Schedules
 Laravel cung cấp môt cách thuận tiện  để lập kế hoạch [schedule Cron jobs](https://laravel.com/docs/5.4/scheduling) bằng cách lên lịch một schedule duy nhất: chạy lệnh Artisan ```schedule:run``` để chạy cho mỗi phút. Câu lệnh ```schedule:run``` sẽ kiểm tra công việc đã được lên lịch được khai báo trong class ```App\Console\Kernel``` để quyết định xem công việc nào sẽ được thực thi.
 Nếu muốn lệnh ```schedule:run``` thực thi cho site Homestead, bạn có thể set tùy chọn ```schedule``` thành  ```true``` khi khai báo site:
 ```
 sites:
    - map: homestead.app
      to: /home/vagrant/Code/Laravel/public
      schedule: true
 ```
 Cron job của site sẽ được định nghĩa trong thư mục ```/etc/cron.d``` của máy ảo.
 
 <br>
 
 ### Ports
 Theo mặc định, các port dưới đây sẽ được forward cho môi trường Homestead của bạn:
*  SSH: 2222 → Forwards To 22
* HTTP: 8000 → Forwards To 80
* HTTPS: 44300 → Forwards To 443
* MySQL: 33060 → Forwards To 3306
* Postgres: 54320 → Forwards To 5432
* Mailhog: 8025 → Forwards To 8025

**Forwarding Additional Ports**
Nếu bạn muốn, bạn có thể forward các port bổ sung vào hộp Vagrant, cũng như chỉ định giao thức của chúng
```
ports:
    - send: 50000
      to: 5000
    - send: 7777
      to: 777
      protocol: udp
 ````
 
 <br>
 
 ### Sharing Your Environment
 
 Đôi khi bạn muốn chia sẻ những gì bạn đang làm với đồng nghiệp hoặc khách hàng. Vagrant có một cách built-in để hỗ trợ điều này thông qua ```vagrant share```; tuy nhiên, điều này sẽ không hoạt động nếu bạn có nhiều site được định cấu hình trong file ```Homestead.yaml``` của bạn.
 
 <br>
 
Để giải quyết vấn đề này, Homestead có lệnh ```share```. Để bắt đầu, SSH vào Homestead của bạn thông qua ```vagrant ssh``` và chạy ```share homestead.app```. Điều này sẽ chia sẻ ```homestead.app``` site từ file cấu hình ```Homestead.yaml``` của bạn. Dĩ nhiên, bạn có thể thay thế bất kỳ site được cấu hình nào khác của bạn cho ```homestead.app```:
```
share homestead.app
```
Sau khi chạy lệnh, bạn sẽ thấy màn hình Ngrok xuất hiện có chứa activity log và các URL có thể truy cập công khai cho site được chia sẻ. Nếu bạn muốn chỉ định khu vực tùy chỉnh, subdomain hoặc tùy chọn thời gian chạy Ngrok khác, bạn có thể thêm chúng vào lệnh ```share``` của mình:
```
share homestead.app -region=eu -subdomain=laravel
```

<br>

### Multiple PHP Versions

Homestead 6 giới thiệu đã hỗ trợ cho nhiều phiên bản PHP trên cùng một máy ảo. Bạn có thể chỉ định phiên bản PHP nào sẽ sử dụng cho một site cụ thể trong file ```Homestead.yaml``` của bạn. Các phiên bản PHP có sẵn là: "5.6", "7.0" và "7.1":
```
sites:
    - map: homestead.app
      to: /home/vagrant/Code/Laravel/public
      php: "5.6"
 ```
 Ngoài ra, bạn có thể sử dụng bất kỳ phiên bản PHP được hỗ trợ nào thông qua CLI:
 ```
 php5.6 artisan list
php7.0 artisan list
php7.1 artisan list
```

<br>

# Network Interfaces
Thuộc tính ```networks``` của ```Homestead.yaml``` cấu hình giao thức mạng cho môi trường Homestead của bạn. Bạn có thể tùy biến cấu hình nhiều giao thức nếu cần:
```
networks:
    - type: "private_network"
      ip: "192.168.10.20"
```
Để enable giao thức [bridged](https://www.vagrantup.com/docs/networking/public_network.html), cấu hình cài đặt ```bridge``` và thay đổi lại của network sang  ```public_network```:
```
networks:
    - type: "public_network"
      ip: "192.168.10.20"
      bridge: "en1: Wi-Fi (AirPort)"
```
Để enable [DHCP](https://www.vagrantup.com/docs/networking/public_network.html), chỉ cần xóa tùy chọn ```ip``` khỏi cấu hình của bạn:
```
networks:
    - type: "public_network"
      bridge: "en1: Wi-Fi (AirPort)"
```

<br>

# Updating Homestead
Bạn có thể cập nhật Homestead bằng hai bước đơn giản. Đầu tiên, bạn nên cập nhật hộp Vagrant bằng cách sử dụng lệnh ```vagrant box update ```:
```
vagrant box update
```
Tiếp theo, bạn cần phải cập nhật mã nguồn Homestead. Nếu bạn clone repository, bạn có thể chỉ cần ```git pull origin master``` tại vị trí mà bạn clone repository.
Nếu bạn đã cài đặt Homestead thông qua file ```composer.json``` của project, bạn nên đảm bảo file ```composer.json``` chứa ```"laravel / homestead": "^ 4"``` và cập nhật các dêpndencies của bạn:
```
composer update
```

<br>

# Provider Specific Settings
### VirtualBox
Theo mặc định, Homestead định cấu hình cài đặt ```natdnshostresolver``` là ```on```. Điều này cho phép Homestead sử dụng cài đặt DNS của hệ điều hành máy chủ lưu trữ của bạn. Nếu bạn muốn ghi đè hành vi này, hãy thêm các dòng sau vào file ```Homestead.yaml``` của bạn:
```
provider: virtualbox
natdnshostresolver: off
```