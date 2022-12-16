## Giới thiệu về Ansible
[Ansible](https://github.com/ansible/ansible) là một công cụ đơn giản nhằm giải quyết vấn đề quản lý cấu hình máy chủ, triển khai ứng dụng,  triển khai ứng dụng trên cloud, thực thi các task, quản lý đồng thời nhiều server node. Ansible thực thi nhiều thay đổi phức tạp dễ dàng với load blancer để thực hiện việc nâng cấp ứng dụng không xảy ra downtime.

### Design Principles

- Cách cài đặt và sử dụng đơn giản
- Quản lý nhiều server đồng thời và nhanh chóng
- Tránh việc tạo ra các tài khoản và mở các port không cần thiết trên server
- Mô tả kiến trúc hệ thống bằng ngôn ngữ lập trình, thân thiện với cả người dùng lẫn máy chủ
- Tập trung vào bảo mật, dễ dàng kiểm tra, đánh giá.
- Quản lý các server mới ngay lập tức, mà không cần bất kỳ phần mềm nào khác
- Cho phép phát triển các module bằng nhiều ngôn ngữ lập trình, không chỉ Python
- Có thể sử dụng với non-root user

## Cài đặt
Cài đặt Ansible trên Ubuntu bằng command sau: 

```bash
$ sudo apt update
$ sudo apt install software-properties-common
$ sudo apt-add-repository --yes --update ppa:ansible/ansible
$ sudo apt install ansible
```

chỉ đơn giản như vậy thôi.
Ngoài ra với các hệ điều hành khác, mọi người tham khảo cách cài đặt [ở đây](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#installing-ansible-on-ubuntu).

## Cài đặt EMP stack lên Linux bằng Ansible

### Cấu hình kết nối tới server

Trước tiên bạn phải đảm bảo máy tính của bạn có thể login vào các server. Mình đã thêm SSH key vào `authorized_keys` trên server  để có thể login vào server thông qua SSH.

Sau đó, bổ sung file inventory, chứa thông tin của các server, giúp Ansible có  thể access và thực thi các task. File inventory mặc định được đặt ở trong `/etc/ansible/hosts`, bạn cần chỉnh sửa nội dung trong đó, nhóm các server thành từng group, define IP và user trên đó. 

Dưới đây là file inventory của mình, mình sẽ thực hiện cài đặt đồng thời trên 2 instance chạy Debian 10 trên Google Cloud:

```:/etc/ansible/hosts
[gcloud]
instance1 ansible_host=104.198.xxx.xxx ansible_user=deploy
instance2 ansible_host=104.154.xxx.xx ansible_user=deploy
```

Mình sẽ dùng lệnh `$ ansible gcloud -m ping` để test kết nối tới 2 instance trên, output bạn nhận được như này là thành công

```bash
$ ansible gcloud -m ping
[WARNING]: Platform linux on host instance1 is using the discovered Python interpreter at /usr/bin/python3.7, but future
installation of another Python interpreter could change this. See
https://docs.ansible.com/ansible/2.9/reference_appendices/interpreter_discovery.html for more information.
instance1 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3.7"
    }, 
    "changed": false, 
    "ping": "pong"
}
[WARNING]: Platform linux on host instance2 is using the discovered Python interpreter at /usr/bin/python3.7, but future
installation of another Python interpreter could change this. See
https://docs.ansible.com/ansible/2.9/reference_appendices/interpreter_discovery.html for more information.
instance2 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3.7"
    }, 
    "changed": false, 
    "ping": "pong"
}
```

Như vậy là bạn đã có thể access vào các server và thực hiện các command đồng thời rồi, ví dụ mình thử check status service ssh trên cả 2 server cùng 1 lúc thử

```bash 
$ ansible gcloud -a "sudo service ssh status"

instance2 | CHANGED | rc=0 >>
* ssh.service - OpenBSD Secure Shell server
   Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset: enabled)
   Active: active (running) since Thu 2020-09-17 08:03:02 UTC; 22h ago
     Docs: man:sshd(8)
           man:sshd_config(5)
  Process: 510 ExecStartPre=/usr/sbin/sshd -t (code=exited, status=0/SUCCESS)
 Main PID: 511 (sshd)
    Tasks: 1 (limit: 1122)
   Memory: 5.2M
   CGroup: /system.slice/ssh.service
           `-511 /usr/sbin/sshd -D
           
instance1 | CHANGED | rc=0 >>
* ssh.service - OpenBSD Secure Shell server
   Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset: enabled)
   Active: active (running) since Thu 2020-09-17 08:02:29 UTC; 22h ago
     Docs: man:sshd(8)
           man:sshd_config(5)
  Process: 506 ExecStartPre=/usr/sbin/sshd -t (code=exited, status=0/SUCCESS)
 Main PID: 507 (sshd)
    Tasks: 1 (limit: 1122)
   Memory: 5.5M
   CGroup: /system.slice/ssh.service
           `-507 /usr/sbin/sshd -D
           
```

#### Triển khai playbook

Ansible playbook là một công cụ giúp chúng ta define các task cần thực hiện trên các server và thực thi chúng đồng thời trên tất cả các server. Dưới đây là file playbook.yml của mình thực thi công việc cài đặt Nginx, PHP, Mariadb lên trên 2 instance.

```yaml:playbook.yml
- hosts: gcloud
  become: true
  vars_files:
    - vars/default.yml

  tasks:
    - name: Install Prerequisites
      apt: name={{ item }} update_cache=yes state=latest force_apt_get=yes
      loop: [ 'aptitude', 'software-properties-common' ]

    - name: Add ppa
      apt_repository:
        repo: ppa:ondrej/php
        state: present
        codename: trusty

    - name: Apt update
      become: true
      command: apt update

    - name: Install LEMP Packages
      apt: name={{ item }} update_cache=yes state=latest
      loop: [ 'nginx', 'mariadb-server', 'python3-pymysql', 'php-fpm', 'php-mysql', 'ufw' ]

    # Nginx Configuration
    - name: Sets Nginx conf file
      template:
        src: "config/nginx.conf.j2"
        dest: "/etc/nginx/sites-available/{{ http_conf }}"

    - name: Enables new site
      file:
        src: "/etc/nginx/sites-available/{{ http_conf }}"
        dest: "/etc/nginx/sites-enabled/{{ http_conf }}"
        state: link
      notify: Reload Nginx

    - name: Removes "default" site
      file:
        path: "/etc/nginx/sites-enabled/default"
        state: absent
      notify: Reload Nginx

    # UFW Configuration
    - name: "UFW - Allow Nginx"
      ufw:
        rule: allow
        name: "Nginx HTTP"

    - name: "UFW - Allow SSH"
      ufw:
        rule: allow
        port: "ssh"

    - name: enable UFW
      ufw:
        state: enabled

    # Sets Up PHP Info Page
    - name: Sets Up PHP Info Page
      template:
        src: "config/info.php.j2"
        dest: "/var/www/html/info.php"

  handlers:
    - name: Reload Nginx
      service:
        name: nginx
        state: reloaded

    - name: Restart Nginx
      service:
        name: nginx
        state: restarted
```

Sau khi đã cấu hình xong playbook, bạn chỉ cần thực hiện lệnh để ansible tự động chạy các task trên các server

```bash
$ ansible-playbook playbook.yml
PLAY [gcloud] ***********************************************************************************************************

TASK [Gathering Facts] **************************************************************************************************
[WARNING]: Platform linux on host instance2 is using the discovered Python interpreter at /usr/bin/python3.7, but future
installation of another Python interpreter could change this. See
https://docs.ansible.com/ansible/2.9/reference_appendices/interpreter_discovery.html for more information.
ok: [instance2]
[WARNING]: Platform linux on host instance1 is using the discovered Python interpreter at /usr/bin/python3.7, but future
installation of another Python interpreter could change this. See
https://docs.ansible.com/ansible/2.9/reference_appendices/interpreter_discovery.html for more information.
ok: [instance1]

TASK [Install Prerequisites] ********************************************************************************************
ok: [instance2] => (item=aptitude)
ok: [instance1] => (item=aptitude)
ok: [instance2] => (item=software-properties-common)
ok: [instance1] => (item=software-properties-common)

TASK [Add ppa] **********************************************************************************************************
ok: [instance2]
ok: [instance1]

TASK [Apt update] *******************************************************************************************************
changed: [instance1]
changed: [instance2]

TASK [Install LEMP Packages] ********************************************************************************************
ok: [instance2] => (item=nginx)
ok: [instance1] => (item=nginx)
ok: [instance1] => (item=mariadb-server)
ok: [instance2] => (item=mariadb-server)
ok: [instance1] => (item=python3-pymysql)
ok: [instance2] => (item=python3-pymysql)
ok: [instance1] => (item=php-fpm)
ok: [instance2] => (item=php-fpm)
ok: [instance1] => (item=php-mysql)
ok: [instance2] => (item=php-mysql)
ok: [instance1] => (item=ufw)
ok: [instance2] => (item=ufw)

TASK [Sets Nginx conf file] *********************************************************************************************
ok: [instance2]
ok: [instance1]

TASK [Enables new site] *************************************************************************************************
ok: [instance2]
ok: [instance1]

TASK [Removes "default" site] *******************************************************************************************
ok: [instance2]
ok: [instance1]

TASK [UFW - Allow HTTP on port 80] **************************************************************************************
changed: [instance1]
changed: [instance2]

TASK [UFW - Allow SSH] **************************************************************************************************
changed: [instance1]
changed: [instance2]

TASK [enable UFW] *******************************************************************************************************
changed: [instance1]
changed: [instance2]

TASK [Sets Up PHP Info Page] ********************************************************************************************
changed: [instance2]
changed: [instance1]

PLAY RECAP **************************************************************************************************************
instance1                  : ok=12   changed=5    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   
instance2                  : ok=12   changed=5    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
```

Ansible đã thông báo kết quả của các task trên các server
![](https://images.viblo.asia/01ea8747-f190-4861-8ed2-bf08e09c1a20.png)


## Kết luận

Như vậy, mình vừa chia sẻ cách sử dụng Ansible để setup LEMP stack trên nhiều server cùng 1 lúc, ngoài việc cấu hình server, Ansible còn hỗ trợ rất nhiều các tính năng thú vị nữa, mình sẽ cố gắng chia sẻ khi có cơ hội được sử dụng chúng.

## Tài liệu tham khảo

- Ansible playbook module: https://docs.ansible.com/ansible/latest/modules/modules_by_category.html
- Lemp-playbook: https://github.com/daothaison/lemp-playbook