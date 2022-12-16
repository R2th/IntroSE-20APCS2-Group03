Tôi sẽ viết tiếp phần 3 hướng dẫn các bạn sử dụng Role và Ansible galaxy 
# A.Ansible-Roles

Các tác vụ liên quan đến nhau có thể được tập hợp lại thành role, sau đó áp dụng cho một nhóm các máy khi cần thiết.

### - Role Directory Structure
> Không nhất thiết phải sử dụng tất cả các thư mục ở trên khi tạo một role. 
* Task: Chứa các file yaml định nghĩa các nhiệm vụ chính khi triển khai.
* Handles: Chứa các handler được sử dụng trong role
* Files: chứa các file dc sử dụng bởi role, ví dụ như các file ảnh.
* Templates: chứa các template file được sử dụng trong role, ví dụ như các file configuration... Các file này có đuôi *.j2, sử dụng jinja2 syntax
* Vars: định nghĩa các variable được sử dụng ở trong roles
* Defaults: Định nghĩa các giá trị default của các variable được sử dụng trong roles. Nếu variable không được định nghiã trong thư mục vars, các giá trị default này sẽ được gọi.
*  Meta: thư mục này chứa meta data của roles


Bạn có thể làm quen với cấu trúc thư mục role bằng cách sử dụng command sau:<br>
	`ansible-galaxy init __template__` 
	<br>
    ![](https://images.viblo.asia/8906dd8f-99ba-4607-b153-cfaaf8b3dd1c.png)
<br>
Chú ý bên trong thư mục phải tuân thủ việc khai báo tên file , tên folder cho role <br>
* 	roles/x/tasks/main.yml 
* 	roles/x/handlers/main.yml 
* 	roles/x/vars/main.yml 
* 	roles/x/defaults/main.yml 
* 	roles/x/meta/main.yml 
    
### - Role search path
Bạn phải khai báo việc set role chính xác trong ansible.cfg để ansible có thể hiểu được bạn viết role và thực thi nó.
<br>
![](https://images.viblo.asia/58a0a332-f00f-493d-8cf5-d63be9e49b3d.png)
<br>

### -Using Roles
Bạn có thể sử dụng role theo cách sau .
```
             ---
             - hosts: dev
               roles:
                 - nginx
```
Ngoài ra có thể tham khảo thêm [ tại đây](https://docs.ansible.com/ansible/latest/user_guide/playbooks_reuse_roles.html)


### - Demo
Sau đây tôi sẽ hướng dẫn các bạn viết role đơn giản cài đặt nginx cho ubuntu16.0.4
(bạn nào chưa tìm hiểu về ansible có thể quay lại [phần 1](https://viblo.asia/p/phan-1-tim-hieu-ve-ansible-4dbZNxv85YM) , [phần 2](https://viblo.asia/p/phan-2-tim-hieu-ve-ansible-YWOZry8rKQ0) ) <br>
Cấu trúc thư mục :<br>
![](https://images.viblo.asia/25aab2b0-648b-4901-989c-46eff62b67b0.png)
<br>
Trong /roles/nginx/tasks/main.yml
```
- name: NGINX --> Install the nginx packages for Ubuntu target
  become: yes
  apt: 
    name: "nginx"
    update-cache: yes

  
- name: Check nginx status
  shell: bash -lc "systemctl status nginx"
  register: nginx_status
- debug: 
    var: nginx_status.stdout_lines

- name: NGINX --> Copy extra/sites configuration files
  become: yes
  template:
    src: nginx.conf.j2
    dest: "{{ nginx_conf_dir }}/nginx.conf"
```

Trong /roles/nginx/templates/nginx.conf.j2
```
user www-data;
worker_processes auto ;

error_log  {{ nginx_log_dir }}/error.log {{ nginx_error_log_level }};
pid        {{ nginx_pid_file }};

worker_rlimit_nofile {{ nginx_worker_rlimit_nofile }};

events {
    worker_connections {{ nginx_worker_connections }};
}

http {
	default_type  application/octet-stream;
	access_log  {{ nginx_log_dir }}/access.log;
	keepalive_timeout {{ keepalive_timeout }};
	send_timeout {{ send_timeout }};
	client_body_timeout {{ client_body_timeout }};
	client_header_timeout {{ client_header_timeout }};
	proxy_send_timeout {{ proxy_send_timeout }};
	proxy_read_timeout {{ proxy_read_timeout }};

	gzip {{ nginx_gzip }};
	gzip_types  text/css text/javascript application/javascript;

	include /etc/nginx/mime.types;
	include /etc/nginx/conf.d/*.conf;
	include /etc/nginx/sites-enabled/*;
}
```
Trong vars/front.yml
```
nginx_conf_dir: "/etc/nginx"
nginx_server_name: "localhost"
nginx_service_name: "nginx"
nginx_user: "nginx"
nginx_group: "nginx"
nginx_pid_file: "/var/run/nginx.pid"
nginx_worker_connections: 1024
nginx_worker_rlimit_nofile: 1024
nginx_log_dir: "/var/log/nginx"
nginx_error_log_level: "error"
nginx_gzip: "on"
nginx_start_service: true
nginx_start_at_boot: true
keepalive_timeout: 600
send_timeout: 600
client_body_timeout: 600
client_header_timeout: 600
proxy_send_timeout: 600
proxy_read_timeout: 600
```

Trong main-playbook.yml 
```
- hosts: dev
  user: "{{ ansible_ssh_user }}"
  become_method: sudo
  gather_facts: True
  vars_files:
  - vars/front.yml
  roles:
  - nginx
```
Trong ansible.cf 
```
[defaults]
roles_path = ../roles
```

Command Thực thi : `ansible-playbook -i inventory/hosts main-playbook.yml --extra-vars " ansible_ssh_user=ubuntu" `


Kết quả  :<br>
Trên console terminal:<br> 
![](https://images.viblo.asia/1318fb38-2d89-419e-9372-36e39fa8ab6e.png)
<br>web:<br>
![](https://images.viblo.asia/32133285-8c60-4b4d-8a24-0407752836b8.png)
<br>
> Như vậy chúng ta sẽ  bóc các tác vụ có điểm chung trong playbook.yml để chuyển chúng về  thành 1 role là cài đặt và cấu hình nginx để chúng ta thuận tiện trong quá trình viết nhiều task.

# B.Ansible galaxy
Ansible [Galaxy](https://galaxy.ansible.com) là một trang web miễn phí để tìm kiếm, tải xuống, xếp hạng và xem xét tất cả các tính chất được cộng đồng Ansible phát triển
Tôi sẽ giới thiệu một số command để bạn có thể tải xuống , tạo mới hay quản lý roles/
### - Install Role

Bạn dùng command ansible-galaxy để download role từ Galaxy :<br>
`ansible-galaxy install geerlingguy.nginx`

kết quả :

> - downloading role 'nginx', owned by geerlingguy
> - downloading role from https://github.com/geerlingguy/ansible-role-nginx/archive/2.7.0.tar.gz
> - extracting geerlingguy.nginx to /home/mai.thanh.long/Desktop/roles/geerlingguy.nginx
> - geerlingguy.nginx (2.7.0) was installed successfully

Để xem danh sách các role được install thì bạn dùng :<br>
`ansible-galaxy list`

### - Create Role 

Như hướng dẫn ở trên phần Role thì bạn có thể dùng command này  : <br>
`ansible-galaxy init __template__` 

### - Search for Roles

Để tìm kiếm 1 role thì bạn có thể sử dụng command sau  :<br>
`ansible-galaxy search apache  --author geerlingguy`

Kết quả: <br>
> Found 14 roles matching your search:
> 
>   Name                       Description
>  ----                       -----------
>  geerlingguy.adminer----        Installs Adminer for Database management. <br>
>  geerlingguy.apache----         Apache 2.x for Linux. <br>
>  geerlingguy.apache-php-fpm---- Apache 2.4+ PHP-FPM support for Linux. <br>
>  geerlingguy.certbot----       Installs and configures Certbot (for Let's Encrypt). <br>
>  geerlingguy.drupal----         Deploy or install Drupal on your servers. <br>
>  geerlingguy.htpasswd----       htpasswd installation and helper role for Linux servers. <br>
>  geerlingguy.munin----          Munin monitoring server for RedHat/CentOS or Debian/Ubuntu. <br>
>  geerlingguy.php----            PHP for RedHat/CentOS/Fedora/Debian/Ubuntu. <br>
>  geerlingguy.pimpmylog----      Pimp my Log installation for Linux <br>
>  geerlingguy.solr----           Apache Solr for Linux. <br>
>  geerlingguy.supervisor----     Supervisor (process state manager) for Linux. <br>
>  geerlingguy.svn----            SVN web server for Linux <br>
>  geerlingguy.tomcat6----        Tomcat 6 for RHEL/CentOS and Debian/Ubuntu. <br>
>  geerlingguy.varnish ----       Varnish for Linux. <br>

### - Remove an installed role
Để remove đã được install trước đó thì ta dùng:
`ansible-galaxy remove  username.role_name`


Như vậy, tôi đã giới thiệu cơ bản về Ansible-Role và Ansible-Galaxy  để các bạn có thể nghiên cứu thêm về nó.<br>
Tài liệu  tham khảo  :<br>
https://docs.ansible.com/ansible/latest/index.html
<br>[Book]
* Ansible Up And Running Book
* Ansible Playbook Essentials
* Learning Ansible - Use Ansible to Configure Systems Deploy Software and Orchestrate Advanced IT Tasks

### Chúc các bạn thành công !
###