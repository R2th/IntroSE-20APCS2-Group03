### I. Mở đầu:
Tình hình là mình có cái project nho nhỏ như notepad để note lại kiến thức khi cần thiết nhưng mình có thú vui là tầm vài tháng lại đổi server 1 lần (do nghèo). Mỗi lần deploy lại project trên server lại cắm cúi chạy các lệnh lại bằng cơm, rất tốn công sức và một cái nữa là muốn deploy lên nhiều server cùng 1 lúc thì ulatroi luôn. Bài viết này mình sẽ sử dụng Ansible - một công cụ khá mạnh để quản lý cấu hình, tạo điều kiện thuận lợi cho công việc cài đặt, quản lý và bảo trì nhiều server và có thể giải quyết vấn đề mình gặp phải.

Cách thông thường, khi cần thay đổi config, update package gì gì đó trên server chúng ta thường hay SSH vào server -> sau đó thao tác. Vấn đề đặt ra là có một cụm servers thì phải SSH từng con để update thì rất mất công, mất sức (để sức làm việc khác hihi) và có thể việc config nhiều server như vậy sẽ thực sự không đồng bộ nhau nữa nếu nhỡ may miss các thao tác trên một server nào đó.
![image.png](https://images.viblo.asia/4f142782-33a6-4989-b7a5-82de5f7a2763.png)

![image.png](https://images.viblo.asia/f756e04f-a183-460a-a1f1-405b0f2c3ada.png)

![image.png](https://images.viblo.asia/1915a3ee-0b7b-459f-8a4a-b022ade774ba.png)

### II. Cài đặt Ansible:
Trên ubuntu thì mọi người cài đặt Ansible như sau:
```
apt-add-repository -y ppa:ansible/ansible
apt-get update
apt-get install -y ansible
```
Chuẩn bị trước một con EC2 hoặc con server nào đó để practice step by step luôn nhé, mình đang sử dụng con EC2 Ubuntu trong bài viết này !

### II. Một số kiến thức cần nắm để làm việc với Ansible:
####  1. Inventory 
Mặc định file inventory của bạn sẽ được lưu tại **/etc/ansible/hosts**, đây là nơi khai báo thông tin, quản lý các con Server và cách để connect với server của bạn. Cụ thể nó sẽ như sau:
```
[dev]
178.128.60.102

[stg]
137.184.8.204

[multi:children]
dev
stg

[all:vars]
ansible_python_interpreter=/usr/bin/python3
ansible_ssh_user=ubuntu
ansible_ssh_private_key_file=/home/dinhlongit/Downloads/lab.pem
```
Hai cái config **ansible_ssh_user**, **ansible_ssh_private_key_file** tùy môi trường của bạn thay đổi cho phù hợp để có thể connect thành công tới server nhé.
Ở đây mình đang khai báo 2 nhóm server gồm dev, stg và một nhóm multi chứa cả dev và stg.

####  2. Ad-hoc Commands
Ansible cho phép chúng ta thực hiện các shell command thông qua một số module có sẵn rất hay. Các command này sẽ có thể thực hiện đồng thời ở một hoặc một nhóm target Servers nào đó.
Ok sau khi config xong Inventory thì thử ad-hoc command này, sử dụng ping module xem đã kết nối được với server chưa nhé:
```
# only dev
ansible dev -m ping
-------------KẾT QUẢ----------------------
178.128.60.102 | SUCCESS => {
    "changed": false, 
    "ping": "pong"
}

# only stg
ansible stg -m ping
-------------KẾT QUẢ----------------------
137.184.8.204 | SUCCESS => {
    "changed": false, 
    "ping": "pong"
}

# both dev and stg
ansible multi -m ping
-------------KẾT QUẢ----------------------
178.128.60.102 | SUCCESS => {
    "changed": false, 
    "ping": "pong"
}
137.184.8.204 | SUCCESS => {
    "changed": false, 
    "ping": "pong"
}
```


Giả sử mình có 2 con server dev với stg như trên, mình muốn thực hiện một số công việc đồng thời trên 2 con như sau:

- Kiểm tra tình trạng (disk space, memory, CPU, swap space, network) trên cả 2 con
```
ansible multi -a "free -m"
-------------KẾT QUẢ----------------------
178.128.60.102 | SUCCESS | rc=0 >>
total        used        free      shared  buff/cache   available
Mem:            968         164         385           0         418         660
Swap:             0           0           0

137.184.8.204 | SUCCESS | rc=0 >>
total        used        free      shared  buff/cache   available
Mem:            978         151         298           0         529         694
Swap:             0           0           0

Tương tự check disk dùng command này:
ansible multi -a "df -h"
```


- Kiểm tra timezone trên cả 2 con xem có đồng bộ không
```
ansible multi -a "timedatectl"
-------------KẾT QUẢ----------------------
178.128.60.102 | SUCCESS | rc=0 >>
               Local time: Fri 2022-04-08 05:04:26 UTC
           Universal time: Fri 2022-04-08 05:04:26 UTC
                 RTC time: Fri 2022-04-08 05:04:26    
                Time zone: Etc/UTC (UTC, +0000)       
System clock synchronized: yes                        
              NTP service: active                     
          RTC in local TZ: no                         

137.184.8.204 | SUCCESS | rc=0 >>
                      Local time: Fri 2022-04-08 05:04:26 UTC
                  Universal time: Fri 2022-04-08 05:04:26 UTC
                        RTC time: Fri 2022-04-08 05:04:27
                       Time zone: Etc/UTC (UTC, +0000)
       System clock synchronized: yes
systemd-timesyncd.service active: yes
                 RTC in local TZ: no

```

Ngon rồi :v: 

####  3. Playbook Overview
Ở trên thì chúng ta đã tìm hiểu qua về Inventory và Ad-hoc command, suy nghĩ giản đơn thì xem Inventory như là nguyên liệu đầu vào, dùng ad-hoc command cùng các module như là công cụ để biến nguyên liệu đó thành một sản phẩm thông qua các chỉ dẫn được viết trong Playbook ( cụ thể là các tasks ).
 
Playbook được viết trên YAML file. Đây là một định dạng phổ biến giúp chúng ta dễ đọc, dễ maintain hơn so với bash file...

Giả sử chúng ta có 1 Playbook đơn giản là cài đặt Nodejs thì nó sẽ như sau:

```
---
- hosts: all
  become: true
  tasks:
    - name: Install the gpg key for nodejs LTS
      apt_key:
        url: "https://deb.nodesource.com/gpgkey/nodesource.gpg.key"
        state: present

    - name: Install the nodejs LTS repos
      apt_repository:
        repo: "deb https://deb.nodesource.com/node_12.x xenial main"
        state: present
        update_cache: yes

    - name: Install the nodejs
      apt:
        name: nodejs
        state: present

```
- Ở Playbook trên sẽ gồm các tasks để phục vụ cho việc cài đặt Nodejs sử dụng các module có sẵn của ansible như apt_key, apt_repository, apt
+ hosts: all -> Tất cả các server sẽ được thực thi khi chạy Playbook này
+ become: true  -> Sử dụng quyền sudo 

Lưu thành file setup.yml và thử chạy nào:
```
ansible-playbook setup.yml
```

Cài trên cả 2 con server thành công nhé (ngonroi).

![image_720.png](https://images.viblo.asia/39dce1d7-cdb9-4531-b117-7a7946a2fe44.png)
####  4. Roles and Includes
Trong lập trình việc chúng ta viết code chỉ trong một file thì sau này việc bào trì, tái sử dụng sẽ gặp nhiều khó khăn. Trong Ansible cung cấp cho chúng ta Role và Includes để có thể tổ chức các tasks liên quan lại với nhau phục vụ sau này có thể dễ dàng tái sử dụng và bảo trì. 
Giả sử chúng ta muốn cài đặt một môi trường cho ứng dụng Laravel thay vì viết từ A đến Á trong 1 Playbook để cài đặt thì chúng ta có thể tách ra thành các Role hoặc Includes như sau:
1. Việc cài đặt Composer 
2. Việc cài đặt  Mysql 
3. Việc cài đặt  PHP 
4. Việc cài đặt  Nginx
5. Việc cài đặt  Nodejs

Sau này việc tái sử dụng các Role này trong các dự án khác Laravel chẳng hạn là điều có thể.

- Sử dụng Includes cho việc tách thành nhiều template rồi includes vào để sử dụng:
```
---
- hosts: all
  vars_files:
    - vars.yml
  pre_tasks:
    - name: Update apt cache if needed.
      apt: update_cache=yes cache_valid_time=3600
  handlers:
    - include: handlers/handlers.yml
  tasks:
    - include: tasks/php.yml
    - include: tasks/mysql.yml
    - include: tasks/nginx.yml
    - include: tasks/composer.yml
    - include: tasks/nodejs.yml
    notify: Reload Nginx
```

+ vars_files: nơi chứa các biến
+ pre_tasks: Một số task thực hiện trước
+ handlers: Đây là một loại task đặc biệt, chỉ chạy ở cuối task chính khi có **notify** option, giả sử sau khi cài tất cả thành công rồi thì Handlers này sẽ chạy để reload lại Nginx chẳng hạn.

- Việc Includes playbook này vào playbook khác như trên cũng khá rành mạch rồi, nhưng khi triển khai một Infrastructure chúng ta cần chia nhỏ các thành phần hơn nữa để việc tái sử dụng sau này hay tránh được việc maintain trong vô vọng :))
```
// roles/nginx

├── defaults
│ └── main.yml
├── handlers
│ └── main.yml
├── tasks
│ └── main.yml
└── templates
└── nginx.conf.j2
```

Ở file Playbook:
```
// playbook.yml
---
- hosts: all
become: true
roles:
  - nginx
```

Như mọi người có thể thấy 1 Role sẽ bao gồm các thành phần như sau:
- defaults: Nơi chứa các biến mặc định

- handlers: Như đã đề cập ở trên đây là một loại task đặc biệt, chỉ chạy khi cuối task chính có **notify** option, giả sử sau khi cài tất cả thành công rồi thì Handlers này sẽ chạy để reload lại Nginx chẳng hạn.

- tasks: Chứa các task để có thể hoàn thành một công việc nào đó ( Như cài đặt nginx ở trên chẳng hạn)

- templates: Chứa các template có thể tái sử dụng (như ở trên là file cấu hình nginx)

Tới đây chắc mọi người cũng có thể phần nào hình dung được rồi, chi tiết mọi người có thể xem luôn REPOSITORY này của mình nhé: 

####  5. Group Variables
**group_vars** folder là nơi chứa các biến, mặc định sẽ khai báo trong **group_vars/all.yml**
Trong này chúng ta có thể dễ dàng chia thành các nhóm môi trường như **dev.yml, stg.yml** chẳng hạn.

Ví dụ:
```
group_vars/all.yml
---
# Initial Server Setup
#remote_user: root
remote_user: root

# MySQL Setup
mysql_root_password: Aa@1234561
mysql_app_db: savenote
mysql_app_user: admin
mysql_app_pass: Aa@1234561

---
# Initial Server Setup
#remote_user: root
remote_user: root

# MySQL Setup
mysql_root_user: root
mysql_root_password: Aa@123456
mysql_app_db: savenote

# Web Server Setup
http_host: "{{ ansible_facts.eth0.ipv4.address }}"
#server_name: savenote.online  www.savenote.online
server_name: localhost
remote_www_root: /var/www/html
app_root_dir: savenote
document_root: "{{ remote_www_root }}/{{ app_root_dir }}/public"

# Laravel Env Variables
app_name: SAVENOTE
app_env: prod
app_debug: true
app_url: "http://{{ http_host }}"
db_host: localhost
db_port: 3306
db_database: "{{ mysql_app_db }}"
db_user: "{{ mysql_root_user }}"
db_pass: "{{ mysql_app_pass }}"
```

####  6. Ansible Vault
Như ở trên thì việc inline các cái thông tin nhạy cảm như password, secret key trong Group Variables là nguy hiểm quá nhở, ansible cũng cung cấp cho chúng ta Ansible Vault để mã hóa file này,

- Để sử dụng nó thì mọi người dùng command này nha:
```
ansible-vault encrypt group_vars/all.yml

// khi thực hiện 1 playbook nào đó thì nhớ thêm options --ask-vault-pass
ansible-playbook playbook.yml --ask-vault-pass
```

### III. Viết ansible script để Deploy ứng dụng Laravel:
Mình sẽ viết 1 bộ Ansible Script để deploy cái ứng dụng Laravel của mình lên Server nhanh gọn lẹ nhất nhé, cấu trúc mình dùng sẽ như sau:
![image.png](https://images.viblo.asia/c3bcfa74-cba4-495b-8dc9-98e1e3e4d578.png)

```
application: thư mục chứa ứng dụng laravel
roles: thư mục chứa các roles (php, mysql, nginx, composer, nodejs, setup)
hosts: chứa thông tin servers thay vì sử dụng file mặc định tại etc/ansible/hosts
laravel-deploy.yml: Là một playbook chứa tất cả các roles ở trên.
```

- Các role thực hiện công việc gì ?
1. Mysql
Cài Mysql
Tạo database và user
2. PHP
Cài php-fpm và PHP modules
3. Nginx
Cài và setup Nginx web server
Cho phép truy cập port 80 trên firewall
4. Composer
Cài đặt composer
5. Laravel-deploy
Thực hiện các command cần thiết để deploy ứng dụng laravel

- Mình sẽ define ra 1 Role ở đây cho mọi người thấy cụ thể là việc cài đặt PHP và các modules:
**php/default/main.yml**
```
---
php_packages: ["php", "curl", "unzip", "php-common", "php-pear", "php-dev", "php-zip", "php-curl", "php-xmlrpc", "php-gd", "php-mbstring", "php-xml", "php-json", "git"]
php_file_uploads: "On"
php_upload_max_filesize: "64M"
php_max_file_uploads: "20"
php_post_max_size: "32M"
```
**php/default/main.yml**

```
---
- name: Restart PHP-FPM
  service:
    name: php-fpm
    state: restarted
```
**php/tasks/main.yml**
```
---
- name: Install Main PHP Packages
  apt: name={{ item }} update_cache=yes
  loop: [ 'php-fpm', 'php-mysql' ]

- name: Install PHP Modules / Extensions
  apt: name={{ item }} update_cache=yes
  loop: "{{ php_packages }}"
```

- Playbook laravel-deploy.yml sẽ có gì ?

```
---
- hosts: all
  become: true
  roles:
    - { role: mysql, tags: ['mysql', 'mysql', 'db', 'lemp'] }

    - { role: php, tags: ['php', 'web', 'php-fpm', 'lemp'] }

    - { role: nginx, tags: ['nginx', 'web', 'http', 'lemp'] }

    - { role: composer, tags: ['composer'] }

    - { role: nodejs, tags: ['nodejs'] }
    
    - { role: laravel-deploy, tags: ['laravel deploy'] }
```

Để có cái nhìn tổng quan về cấu trúc mời mọi người ghé thăm Repository [này](https://github.com/longnd-1038/ansible_laravel) ạ: 


Ở trên là một Playbook chứa tất cả các thành phần giúp chúng ta deploy 1 ứng dụng Laravel từ A đến Á nhé:
Let's go deploy song song ứng dụng này lên cả 2 server nào:
```
ENTER ^^

ansible-playbook -i hosts server-setup.yml
```
Sau một hồi máy cặm cụi chạy thì thành quả đã có (tuyetvoi):

![image.png](https://images.viblo.asia/f756e04f-a183-460a-a1f1-405b0f2c3ada.png)

![image.png](https://images.viblo.asia/1915a3ee-0b7b-459f-8a4a-b022ade774ba.png)

Quá trình thực thi:
![image.png](https://images.viblo.asia/c9859506-2f78-45da-a117-48b25be53ae4.png)
### Tổng kết:
Cảm ơn mọi người đã giành thời gian đọc bài viết này nhé, hi vọng bài viết sẽ giúp ích cho mọi người (hihi).