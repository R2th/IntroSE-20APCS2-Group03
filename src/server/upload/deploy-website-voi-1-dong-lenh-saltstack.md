# Mở đầu
Khi còn là sinh viên ta thường làm việc với một vài Server đơn lẻ, dễ dàng quản lý bằng cách login vào server và cài đặt các package cần thiết, lỗi đâu sửa đấy. Tuy nhiên trong môi trường thực tế, ta có thể sẽ phải làm việc với hàng trăm, hàng ngàn server cùng lúc khiến việc login vào từng server để cài đặt các package hay chỉnh sửa cấu hình trở nên bất khả thi. Vì vậy từ đâu đó sinh ra công cụ cho phép thực hiện 1 hoặc nhiều câu lệnh trên nhiều máy cùng lúc.

Trong bài này mình sẽ hướng dẫn cách sử dụng SaltStack để cài đặt LAMP (Linux, Apache, MySQL, PHP) và kéo code từ github về chạy 1 website hoàn chỉnh trên Ubuntu 18.04. Cài đặt Salt-Stack Master và Minion khá đơn giản, bạn có thể tham khảo [tại đây](https://www.tutorialspoint.com/saltstack/saltstack_installation.htm). Giờ thì vào vấn đề chính thôi !!!

![](https://images.viblo.asia/7c45eccd-bbef-4036-b1b0-3d39c6703112.jpg)


# MuốiStack làm được gì?
*  **Remote Execution:** Thực hiện lệnh trên các máy minion (đại loại là slave) từ máy master.
*  **Configuration Managements**: Quản lý cấu hình các máy con minion bằng các state file. Cái này còn hay được gọi là Infrastructure as Code (IaS)
*  **File/Git Server:** SaltStack có thể hoạt động như 1 file server hoặc Git Server để các minion lấy file hoặc source code.
*  .... 

Còn rất nhiều những tính năng nữa mà mình cũng chưa mò tới.

# Tạo State File cài đặt LAMP + Clone Code
Mặc định file root của SaltStack sẽ tại `/srv/salt/`, vào folder này ta tạo **state file (.sls)** có tên **installLamp.sls**. Đầu tiên trước khi làm bất cứ thứ gì trên Linux mình thường sẽ chạy Update + Upgrade, ta thêm đoạn mã: 

```
updateSystem:
  cmd.run:
    - name: "apt update && apt upgrade -y"
```

**'updateSystem':** là tên của phần công việc này, đặt thế nào cũng được.

**'cmd.run':** là câu lệnh chỉ thị chạy command cố định.

**'name':** Nội dung command.

Tiếp theo, cài đặt LampStack với đoạn mã: 

```
install_LAMP_Packages:
  pkg.installed:
    - pkgs:
      - apache2
      - mysql-server
      - php
      - libapache2-mod-php
      - php-mysql
```
Đoạn mã này sẽ cài đầy đủ các package cần thiết cho Server LAMP Stack. Sau khi cài rồi ta phải đảm bảo nó đã được chạy bằng đoạn mã: 

```
apache2:
  pkg.installed: []
  service.running:
    - require:
      - pkg: apache2

mysql-server:
  pkg.installed: []
  service.running:
    - require:
      - pkg: mysql-server
```

Giờ ta đã có các Service cần thiết cho website ngồi lên, giờ phải clone code về thôi. Ý tưởng là ta sẽ clone code về rồi copy vào webroot mặc định tại **/var/www/html**. Tuy nhiên đôi khi **/var/www/html** chưa được khởi tạo có thể sẽ gây ra lỗi, vậy nên ta phải tạo folder này trước cho chắc ăn.

```
create html_directory:
  file.directory:
    - name: /var/www/html
    - user: www-data
    - group: www-data
    - mode: 735

Clone_git_Repo:
  git.latest:
    - name: https://github.com/MMA17/LapTrinhWeb.git
    - target: /var/www/
    - user: www-data
    - force_clone: True
    
copy_all_web_files:
  cmd.run:
    - name: "cp -r /var/www/LapTrinhWeb/* /var/www/html/"
```

Giờ thì web đã online, còn một việc nưa là import database. Để import database thì thêm 1 đoạn mã siêu đơn giản để thực hiện các câu lệnh SQL đã lưu sẵn ra 1 file. Tham khảo file đó [tại đây](https://github.com/MMA17/LapTrinhWeb/blob/main/initdb.sql):

```
Init_Database:
  cmd.run:
    - name: "mysql < /var/www/LapTrinhWeb/initdb.sql"
```

Để chắc ăn hơn bạn có thể tạo thêm 1 đoạn mã restart các service, tuy nhiên thông thường thể này là ok rồi. Sau khi viết xong file hoàn chỉnh sẽ như sau:

```
updateSystem:
  cmd.run:
    - name: "apt update && apt upgrade -y"

install_LAMP_Packages:
  pkg.installed:
    - pkgs:
      - apache2
      - mysql-server
      - php
      - libapache2-mod-php
      - php-mysql

copy_apache_config_file:
  file.managed:
    - name: /etc/apache2/apache2.conf
    - source: salt://lampStack/apache2.conf

apache2:
  pkg.installed: []
  service.running:
    - require:
      - pkg: apache2

mysql-server:
  pkg.installed: []
  service.running:
    - require:
      - pkg: mysql-server

create html_directory:
  file.directory:
    - name: /var/www/html
    - user: www-data
    - group: www-data
    - mode: 735

Clone_git_Repo:
  git.latest:
    - name: https://github.com/MMA17/LapTrinhWeb.git
    - target: /var/www/
    - user: www-data
    - force_clone: True

copy_all_web_files:
  cmd.run:
    - name: "cp -r /var/www/LapTrinhWeb/* /var/www/html/"

Init_Database:
  cmd.run:
    - name: "mysql < /var/www/LapTrinhWeb/initdb.sql"
```

# Chạy State File
Đây là phần sẽ khiến bạn rất hứng thú khi viết xong State File đấy. Để chạy State File này trên Minion ta dùng câu lệnh đơn giản: 

`salt '*' state.apply installLamp`

để áp dụng trên tất cả các minion hoặc thay đổi * thành tên của minion để áp dụng trên các server con nhất định.

**Lưu ý**:  tên file State khi dùng State.apply sẽ không có extension .sls.

# Kết
Vậy là xong! Deploy Website lên bao nhiêu server tùy thích với 1 câu lệnh. Mình cũng mới mò mẫm được 1 chút, chắc chắn đoạn mã sẽ có chỗ sai, chỗ ngớ ngẩn, nếu thấy bạn có thể giúp mình sửa ở phần comment. 

Hy vọng bạn nhận được thêm 1 chút kiến thức. Have a nice day.