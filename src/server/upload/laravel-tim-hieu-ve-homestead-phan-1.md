# Giới thiệu

Laravel cố gắng làm cho toàn bộ các trải nghiệp phát triển PHP trở lên thú vị, bao gồm cả môi trường phát triển local của bạn. [Vagrant](https://www.vagrantup.com/) cung cấp đơn giản, thoải mái để quản lý các máy ảo.

Laravel Homestead là bản chính thức, Một bản đóng gói sẵn của Vagrant box cung cấp cho bạn một môi trường tuyệt vời mà bạn không phải cài PHP, web server hay bất cứ phần mền nào khác trên môi trường local của bạn. Không phải bận tâm về hệ điều hành của bạn là gì? Vagrant boxes đã có hoàn chỉnh mọi thứ. Nếu có lỗi gì bạn có thể hủy và tạo lại một box chỉ trong vài phút!

Homestead có thể chạy trên Windowns, Mac hay Linux, nó bao gồm cả Nginx web server, PHP 7.1, MySQL, Postgres, Redis, Memcached, Node, và tất cả những thứ khác bạn cần để phải triển ứng dụng Laravel.

### Included Software
* Ubuntu 16.04
* Git
* PHP 7.1
* Nginx
* MySQL
* MariaDB
* Sqlite3
* Postgres
* Composer
* Node (With Yarn, Bower, Grunt, and Gulp)
* Redis
* Memcached
* Beanstalkd
* Mailhog
* ngrok


# Installation & Setup
### First Steps
Trước khi chạy môi trường Homestead của bạn, bạn cần phải cài đặt [VirtualBox 5.x](https://www.virtualbox.org/wiki/Downloads), [VMWare](https://www.vmware.com/asean.html)  hoặc [Parallels](https://www.parallels.com/products/desktop/) cũng như [Vagrant](https://www.vagrantup.com/downloads.html). Tất cả những phần mền trên đều cung cấp giao diện người dùng và rất dễ cài đặt cho tất cả các hệ điều hành phổ biến.

Để sử dụng nhà cung cấp VMware, bạn cần mua cả VMware Fusion / Workstation và [VMware Vagrant plug-in](https://www.vagrantup.com/vmware/). Dù không miễn phí, nhưng VMware có thể cung cấp hiệu năng truy cập thư mục chia sẻ nhanh hơn.

Để sử dụng nhà cung cấp Parallels, bạn cần phải cài đặt [Parallels Vagrant plugin](https://github.com/Parallels/vagrant-parallels). Nó là miễn phí.

**Installing The Homestead Vagrant Box**

Khiđã cài đặt VirtualBox / VMware and Vagrant, bạn cần thêm box ```laravel/homestead``` bằng cách sử dụng lệnh trên terminal. Bạn sẽ mất vài phú để tải nó, phụ thuộc vào tốc độ internet của bạn nhanh hay chậm:
```
vagrant box add laravel/homestead
```
Nếu dòng lệnh bị lỗi, hãy chắc chắn rằng Vagrant của bạn đã được cập nhật.

**Installing Homestead**

Bạn có thể cài Homestead bằng cách clone từ kho lưu trữ về. Hãy cân nhắc sao chép vào thư mục ```Homestead``` trong thư mục "home" của bạn, như vậy thì ```Homestead``` sẽ có thể hoạt động như host cho tất cả project Laravel của bạn:

```
cd ~

git clone https://github.com/laravel/homestead.git Homestead
```
Bạn nên check out một tagged version của Homestead vì nhánh ```master``` không phải lúc nào cũng ổn định. Bạn có thể tìm thấy phiên bản ổn định mới nhất trên [GitHub Release Page](https://github.com/laravel/homestead/releases):

```
cd Homestead

// Clone the desired release...
git checkout v6.1.0
```
Khi bạn đã clone Homestead repository, hãy chạy lệnh ```bash init.sh``` từ thư mục ```Homestead``` để tạo file cấu hình ```Homestead.yaml```. File ```Homestead.yaml``` sẽ được đặt trong thư mục Homestead:
```
// Mac / Linux...
bash init.sh

// Windows...
init.bat
```
### Configuring Homestead

**Setting Your Provider**
Từ khóa ```provider``` trong file ```Homestead.yaml``` chỉ ra Vagrant provider nào sẽ được sử dụng: ```virtualbox```, ```vmware_fusion```, ```vmware_workstation``` hay ```parallels```. Bạn có thể thiết lập provider theo ý bạn:
```
provider: virtualbox
```
**Configuring Shared Folders**

Thuộc tính ```folders``` trong file ```Homestead.yaml``` liệt kê tất cả các folder mà bạn muốn chia sẻ với môi trường Homestead. Nếu như file nào có trong folder này thay đổi, thì nó sẽ được đồng bộ giữa môi trường local của bạn và môi trường Homestead. Bạn có cấu hình nhiều folder chia sẻ nếu cần:
```
folders:
    - map: ~/Code
      to: /home/vagrant/Code
```

Để bật [NFS](https://www.vagrantup.com/docs/synced-folders/nfs.html), bạn chỉ cần thêm một cờ đơn giản vào cấu hình chia sẻ folder của bạn:
```
folders:
    - map: ~/Code
      to: /home/vagrant/Code
      type: "nfs"
````
Bạn cũng có thể pass bất kỳ option nào được hỗ trợ bởi Vagrant's [Synced Folders](https://www.vagrantup.com/docs/synced-folders/basic_usage.html) bằng cách liệt kê chúng trong ```option``` key:
```
folders:
    - map: ~/Code
      to: /home/vagrant/Code
      type: "rsync"
      options:
          rsync__args: ["--verbose", "--archive", "--delete", "-zz"]
          rsync__exclude: ["node_modules"]
```

**Configuring Nginx Sites**

Không thân thiện với Nginx?  Không sao cả. Thuộc tính ```sites``` cho phép bạn dễ dàng map một "domain" đến một folder trong môi trường Homestead của bạn. Cấu hình site của bạn được include trong file ```Homestead.yaml```. Một lần nữa, bạn có thể thêm nhiều trang vào môi trường Homestead của bạn nếu cần. Homestead có thể hoạt động thoải mái, ảo hóa thuận tiện cho mọi dự án Laravel bạn làm việc:
```
sites:
    - map: homestead.app
      to: /home/vagrant/Code/Laravel/public
 ```
 Nếu bạn thay đổi thuộc tính ```sites``` sau khi cung cấp hộp Homestead, bạn cần phải chạy lại lệnh  ```vagrant reload --provision``` để cập nhập lại cấu hình Nginx trên máy ảo.
 
 **The Hosts File**
 
 Bạn phải thêm "domain" cho Nginx sites vào file ```hosts``` trên máy của bạn. File ```hosts``` sẽ chuyển hướng request của bạn đến Homestead site sang máy chủ Homestead của bạn. Trên máy Mac và Linux, nó đặt ở  ```/etc/hosts```. Trên Windowns, nó đặt ở ```C:\Windows\System32\drivers\etc\hosts```. Dòng bạn cần thêm vào file này sẽ có dạng bên dưới:
 ```
192.168.10.10  homestead.app
```
Bạn phải chắc chắn là địa chỉ IP được liệt kê là địa chỉ được đặt trong file ```Homestead.yaml```. Sau khi bạn đã thêm tên miền vào file ```hosts``` và chạy hộp Vagrant, bạn sẽ có thể kết nối đến trong thông qua trình duyệt:
```
http://homestead.app
```

### Launching The Vagrant Box
Sau khi bạn chỉnh sửa ```Homestead.yaml``` theo ý bạn, chạy lệnh ```vagrant up``` từ trong thư mục ```Homestead```. Vagrant sẽ khởi động máy ảo và tự động cấu hình folder chia sẻ và Nginx site.

Để hủy máy ảo, bạn có thể sử dụng câu lệnh ```vagrant destroy --force```.

### Per Project Installation
Thay vì cài đặt Homestead một cách toàn cục và chia sẻ hộp Homestead giống nhau cho tất cả dự án, bạn có thể cấu hình từng Homestead cho từng dự án. Cài đặt Homestead cho tưng dự án có lợi ích nếu bạn muốn gửi kèm ```Vagrantfile``` với dự án của bạn, cho phép người khác làm việc trên dự án đơn giản bằng lệnh ```vagrant up```.

Để cài Homestead trực tiếp vào dự án của bạn, sử dụng Composer:
```
composer require laravel/homestead --dev
```
Sau khi Homestead được cài, sử dụng lệnh ```make``` để tạo file ```Vagrantfile``` và ```Homestead.yaml``` trong thư mục project gốc. Lệnh ```make``` sẽ tự động cấu hình ```sites``` và ```folders``` vào file ```Homestead.yaml```.

Mac / Linux:
```
php vendor/bin/homestead make
```
Windows:
```
vendor\\bin\\homestead make
```
Tiếp theo, chạy lệnh ```vagrant up``` từ terminal và truy cập vào dự án tại ```http://homestead.app``` bằng trình duyệt. Nhớ rằng, bạn sẽ cần phải thêm homestead.app hoặc tên miền bạn chọn vào file  ```/etc/hosts```.

### Installing MariaDB
Nếu bạn thích dùng MariaDB hơn MySQL, bạn có thể thêm tùy chọn ```mariadb``` vào file ```Homestead.yaml```. Lựa chọn này sẽ loại bỏ MySQL và cài đặt MariaDB. MariaDB sẽ hoạt động thay cho MySQL vì vậy bạn cũng có thể dùng ```mysql``` database driver trong cấu hình cơ sở dữ liệu của bạn:
```
box: laravel/homestead
ip: "192.168.20.20"
memory: 2048
cpus: 4
provider: virtualbox
mariadb: true
```


Tài liệu: https://laravel.com/docs/5.4/homestead