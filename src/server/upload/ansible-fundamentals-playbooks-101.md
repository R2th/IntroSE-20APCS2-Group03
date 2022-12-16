![](https://images.viblo.asia/369ed990-2d7c-4a4e-96e9-ae53b62c3612.jpg)

*Image Source: [Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-create-ansible-playbooks-to-automate-system-configuration-on-ubuntu)*

## A bird's-eye view.
Trong bài viết trước về **Ansible**, chúng ta đã tìm hiểu về **ad-hoc commands**, một cách *quick and dirty* :smile: để tiếp cận với công nghệ này. Các command thường được sử dụng để thực hiện các tác vụ khá đơn giản như mình đã trình bày trong bài viết lần trước. Tuy nhiên khi làm việc với các tác vụ và hệ thống phức tạp hơn chúng ta cần có một **ngôn ngữ** để biểu diễn chúng, giống như việc chúng ta sử dụng các ngôn ngữ lập trình. Tương tự rất nhiều các công cụ quản lý cấu hình khác, Ansible cũng có ngôn ngữ riêng của nó và được thể hiện qua việc sử dụng **playbooks**. Một cách đơn giản, playbooks là nơi chúng ta định nghĩa danh sách các công việc (hay *play*) sẽ được thực hiện trên một hoặc một nhóm các servers. Nói cách khác, nó là danh sách các chỉ dẫn mô tả các bước để đưa các servers đến một trạng thái cụ thể nào đó.

Playbooks có thể được sử dụng để quản lý cấu hình, thực hiện deployment, và khá nhiều thứ hay ho khác.

Trong bài viết trước, chúng ta đã tiếp cận và tìm hiểu về **modules** và **inventory** trong Ansible, trong bài viết này chúng ta có thêm **playbooks**.

> Tổng quát thì chúng ta có thể nghĩ **inventory** như là nguyên liệu đầu vào, **playbooks** sẽ là những tài liệu hướng dẫn và **modules** sẽ là các công cụ để chuyển đổi các nguyên liệu đó thành một sản phẩm hoàn chỉnh dựa trên những công việc được chỉ ra trong **playbooks**.

Ngoài việc quản lý cấu hình, playbooks cũng có thể được sử dụng để cài đặt một quá trình IT (IT process) nào đó (chúng ta sẽ có ví dụ trong các phần tiếp theo).

Tương tự như rất nhiều công cụ khác, Ansible playbooks được viết sử dụng **YAML**. Một playbook có thể nằm trong một hoặc nhiều playbooks khác. Mỗi playbook được cấu thành từ một hoặc nhiều **plays** (vở kịch :thinking:).

Thông thường mỗi **play** (vở kịch) sẽ có nhiều **roles** (vai diễn) khác nhau và mỗi vai diễn sẽ có các **tasks** (nhiệm vụ) cụ thể. Mục đích của một **play** là chuyển đổi trạng thái của các servers sử dụng các **roles** và cụ thể hơn là các **tasks**. Các **tasks** ở đây thực tế là việc sử dụng Ansible modules để thực hiện một công việc nào đó. Trong bài viết này chúng ta sẽ chủ yếu tập trung vào các **tasks**.

Một playbook có thể chứa nhiều play khác nhau, cho phép chúng ta thực hiện các công việc như *multiple machine deployments* chẳng hạn.

## Starting example.
Hầu hết các shell scripts hoặc các shell commands đều có thể chuyển đổi về Ansible playbook. Chúng ta sẽ cùng đi qua một ví dụ đơn giản về việc cài đặt NGINX web server sử dụng shell script và chuyển đổi script đó sang playbook.

Để đơn giản, chúng ta sẽ tạo một file tên `install-nginx.sh` với nội dung gồm một số commands đơn giản sau:

```bash
#!/bin/bash

# Update apt cache
sudo apt update

# Install NGINX
sudo apt install -y nginx

# Start the nginx service
sudo systemctl start nginx

# Enable nginx service on system boot
sudo systemctl enable nginx

# Adjust the firewall using ufw (uncomplicated firewall) to allow
# access to the NGINX service. We're not going to configure SSL
# for our server here.
sudo ufw allow 'Nginx HTTP'
```

Nội dung của script trên gồm một số command thực hiện theo tuần tự như đã đề cập trong phần mô tả trước mỗi command. Chúng ta có thể chạy shell script trên như sau:

```bash
sudo chmod +x install-nginx.sh
./install-nginx.sh
```

Trong bài viết trước chúng ta đã đề cập đến việc sử dụng `command` module trong Ansible để thực thi các shell commands. Nếu chúng ta đã có sẵn các shell commands, chúng ta có thể sử dụng module đó để chuyển đổi shell script trên thành một playbook.

Tạo một playbook với tên là `install-nginx.yml` và có nội dung như sau:

```yaml
---
- hosts: app
  become: yes

  tasks:
    - name: Update apt cache.
      command: apt update

    - name: Install NGINX web server.
      command: apt install -y nginx

    - name: Start the nginx service.
      command: systemctl start nginx

    - name: Enable nginx service at system boot.
      command: systemctl enable nginx

    - name: Adjust firewall to allow access to the nginx service.
      command: >
        ufw allow 'NGINX HTTP'
```

Để chạy playbook trên, chúng ta sẽ sử dụng command sau:

```bash
ansible-playbook -i inventory.ini install-nginx.yml
```

Chi tiết về command `ansible-playbook` sẽ được đề cập đến trong phần sau. Nội dung của file `inventory.ini` có thể thao khảo [tại đây](https://viblo.asia/p/ansible-fundamentals-playbooks-101-E375zeXjlGW#inventory-file-8)

Chạy playbook trên *một hoặc nhiều lần*, chúng ta sẽ thu được kết quả tương tự như sau:

```bash
PLAY [app] ****************************************************************************

TASK [Gathering Facts] ****************************************************************
ok: [192.168.60.4]
******************
TASK [Update apt cache.] **************************************************************
changed: [192.168.60.4]

TASK [Install NGINX web server.] ******************************************************
changed: [192.168.60.4]

TASK [Start the nginx service.] *******************************************************
changed: [192.168.60.4]

TASK [Enable nginx service of system boot.] *******************************************
changed: [192.168.60.4]

TASK [Adjust firewall to allow access to the nginx service.] **************************
changed: [192.168.60.4]

PLAY RECAP ****************************************************************************
192.168.60.4               : ok=6    changed=5    unreachable=0    failed=0   
```

Hãy cùng tìm hiểu nội dung của playbook đơn giản trên :smile:

```yaml
---
```
Dòng đầu tiên cho chúng ta biết nội dụng của file sẽ được viết theo cú pháp YAML, tương tự như khi sử dụng `<?php` cho `.php` file.

```yaml
- hosts: app
```
Đây là điểm khởi đầu của một play (trong ví dụ này playbook chỉ gồm một play duy nhất). Ở đây play này sẽ được chạy trên tất cả các hosts trong nhóm có tên là `app`.

```yaml
become: yes
```
Chỉ định rằng tất cả các commands trong play sẽ được chạy dưới quyền `sudo`.

```yaml
tasks:
```
Đây sẽ là danh sách các công việc được thực hiện trong play (là một list trong YAML).

Mỗi task sẽ là một object trong YAML và thông thường nó sẽ được đặt tên trong qua `name` property. Từ đó cho phép chúng ta theo dõi được quá trình thực hiện của playbook một cách dễ dàng hơn.

Trước khi tìm hiểu về nội dung các tasks, chúng ta hãy cùng *refactoring* playbook trên.

Để ý rằng khi chạy playbook trên một hoặc nhiều lần, trạng thái trả về sẽ vẫn là `changed` mặc dù NGINX đã được cài đặt trong lần chạy trước đó. Nếu bạn còn nhớ đến khái niệm **Idempotence** thì ở đây chúng ta đang không làm theo ý tưởng đó. Tuy nhiên may mắn là Ansible đã cung cấp sẵn cho chúng ta các *modules* và chúng ta có thể sử dụng chúng để chuyển đổi các shell commands trên.

Let's do it! :gorilla:

- `sudo apt update`

Chúng ta sẽ sử `apt` module để thực hiện command này với hai options là `update_cache` và `cache_valid_time`. Task này có thể viết lại như sau:

```yaml
- name: Update apt cache.
  apt: update_cache=yes cache_valid_time=3600
```

Nội dung của task trên có thể hiểu là cập nhật *apt cache* nếu đã quá 1 tiếng (3600s) kể từ lần cập nhật trước đó. Bạn có thể đọc thêm về [apt module](http://docs.ansible.com/ansible/latest/apt_module.html) tại đây.

- `sudo apt install -y nginx`

Một lần nữa `apt` module sẽ được sử dụng để cài đặt NGINX. Cách sử dụng module này để cài đặt các packages đã được đề cập đến trong bài viết trước.

```yaml
- name: Install NGINX web server.
  apt: name=nginx state=present
```

- `sudo systemctl start nginx` và `sudo systemctl enable nginx`

Nếu bạn còn nhớ thì `service` module sẽ được sử dụng để thực hiện các commands này, cụ thể là với hai options là `state` và `enabled`:

```yaml
- name: Start and enable nginx service at system boot.
  service: name=nginx state=started enabled=yes
```

- `sudo ufw allow 'Nginx HTTP'`

Để quản lý firewall sử dụng **UFW**, không ngoài dự đoán, chúng ta sẽ sử dụng [ufw module](http://docs.ansible.com/ansible/latest/ufw_module.html). Cụ thể task của chúng ta sẽ có nội dung như sau:

```yaml
- name: Adjust firewall to allow access to the nginx service.
  ufw: name="Nginx HTTP" rule=allow state=enabled
```

Trong nhiều trường hợp `iptables` sẽ được sử dụng mặc định thay vì `ufw` do đó công việc đầu tiên chúng ta cần làm là đảm bảo `ufw` đã khởi động và tự động load khi booting system - `state=enabled`. Tiếp đến chúng ta cần cho phép traffic thông qua HTTP connection (port 80) sử dụng profile là **NGINX HTTP** và rule sẽ là `allow`. Sẽ có ba profile tồn tại sau khi cài đặt NGINX là: **NGINX HTTP**,  **NGINX HTTPS** và **NGINX FULL**. Còn đối với các luật mà Ansible cung cấp, chúng ta sẽ có `allow`, `reject`, `deny` và `limit` -  khá là quen thuộc phải không?. **ufw** module còn khá nhiều options khác, bạn có thể tham khảo thêm trong tài liệu hướng dẫn.

Đây sẽ là nội dung của file `install-nginx.yml` sau khi đã chỉnh sửa lại. Để ý rằng nếu chạy playbook này nhiều lần, trạng thái trả về sẽ không thay đổi nếu trạng thái của server đã đúng như cấu hình và không có các cập nhật cần thực hiện.

```yaml
---
- hosts: app
  become: yes

  tasks:
    - name: Update apt cache.
      apt: update_cache=yes cache_valid_time=3600

    - name: Install NGINX web server.
      apt: name=nginx state=present

    - name: Start and enable nginx service at system boot.
      service: name=nginx state=started enabled=yes

    - name: Adjust firewall to allow access to the nginx service.
      ufw: name="Nginx HTTP" rule=allow state=enabled
```

Truy cập địa chỉ `192.168.60.4` trên trình duyệt, chúng ta sẽ thấy trang *welcome* mặc định của NGINX.

Trong nhiều trường hợp, chúng ta chỉ cần kiểm tra xem trạng thái cấu hình của server đã đúng theo những gì định nghĩa trong playbook mà không cần chạy trực tiếp các tasks trên server (dry run); `--check` option của `ansible-playbook` sẽ giúp chúng ta thực hiện việc đó. Cụ thể:

```bash
ansible-playbook -i inventory.ini --check install-nginx.yml
```

> Trong YAML, dấu lớn hơn (greater-than sign) `>` như trong ví dụ sử dụng **command** module ở trên cho phép chúng ta nối danh sách cách dòng thụt lề sau đó thành một chuỗi duy nhất phân cách nhau bởi các space. Trong trường hợp chúng ta muốn giữ định dạng của chuỗi (giữ nguyên các dấu xuống dòng chẳng hạn), thay thế dấu `>` bằng `|` (vertical bar).

Có khá nhiều cách để viết nội dung của một task trong playbook:
- Khi sử dụng **command** hay **shell** modules, `>` thường được sử dụng khi shell command có nội dung khá dài.
- Sử dụng short-hand syntax  như trong ví dụ chúng ta vừa làm ở trên.
- Khi có khá nhiều option của module được sử dụng, chúng ta sẽ sử dụng object trong YAML để thuận tiện cho việc đọc cũng như thuận tiện khi sử dụng với version control như Git chẳng hạn.

> Mình thường dùng cách thứ ba khi viết nội dung cho các task trong Ansible.

```yaml
- name: Adjust firewall to allow access to the nginx service.
  ufw:
    name: Nginx HTTP
    rule: allow
    state: enabled
```

Một chú ý nho nhỏ nữa là khi sử dụng **ufw** mặc định tất cả các *incoming connections* sẽ bị từ chối (deny) và các *outgoing connections* sẽ được phép đi qua (accept). Do vậy Ansible có thể sẽ không kết nối được đến server sử dụng OpenSSH trong các lần chạy tiếp theo. Có khá nhiều cách để giải quyết việc này, tuy nhiên một cách đơn giản nhất là thêm một task trong playbook cho phép traffic qua cổng `22` (cổng mặc định của OpenSSH) như sau:

```yaml
- name: Allow OpenSSH connections.
  ufw:
    name: OpenSSH
    rule: allow
```

## Run `ansible-playbook` command.
*Chú ý: Bạn có thể bỏ qua phần này của bài viết nếu muốn. Phần này đơn giản cho chúng ta biết cách sử dụng `ansible-playbook` command. Bạn có thể tự đọc trong documentation của Ansible hoặc `man ansible-playbook` để có nhiều thông tin hơn.*

Khi chạy các playbooks, `ansible-playbook` (`/usr/bin/ansible-playbook`) command sẽ được sử dụng. Trong phần trước chúng ta đã đề cập đến việc sử dụng hai options là `-i` (hay `--inventory=`) và `--check` (hay `-C`). Tuy nhiên command này còn khá nhiều options khác, trong phần này của bài viết chúng ta sẽ cùng đi qua một số options quan trọng.

### Limit playbooks to hosts or groups.
Ansible cung cấp một nhóm đặc biệt liên quan đến các hosts là `all`. Trong đó nếu sử dụng nhóm này thì playbooks sẽ được chạy trên tất cả các hosts được định nghĩa trong inventory. Việc giới bạn playbook cho các nhóm hoặc các host riêng biệt có thể được thực hiện thông qua `hosts` option bên trong mỗi playbook như trong ví dụ bên trên. Cụ thể như sau:

- `all`: tất cả các hosts được định nghĩa.
- Tên một group nào đó, ví dụ `- hosts: webservers`, trong đó `webservers` là một nhóm gồm một hoặc nhiều servers khác nhau.
- Nhiều nhóm khác nhau, ví dụ `- hosts: webservers:dbservers` (các hosts có thể ở trong nhóm `webservers` hoặc `dbservers`)
- Từng host riêng lẻ, ví dụ `- hosts: foo.example.com`
- Sử dụng wildcard, ví dụ `- hosts: 192.168.1.*`
- Và còn nhiều cách khác, bạn có thể tham khảo thêm tại [Ansible Patterns](http://docs.ansible.com/ansible/latest/intro_patterns.html#patterns)

Bạn cũng có thể giới hạn các hosts khi chạy `ansible-playbook` command sử dụng `--limit` option, giá trị của option này sẽ ghi đè giá trị được chỉnh định thông qua `- hosts:` bên trong playbook. Sau đây là một số ví dụ đơn giản:

Giới hạn các hosts thuộc nhóm `db`:

```bash
ansible-playbook playbook.yml --limit db
```

Giới hạn cho một hosts duy nhất - `foo.example.com`

```bash
ansible-playbook playbook.yml --limit foo.example.com
```

Ngoài ra để kiểm tra danh sách các hosts mà playbook sẽ được chạy trên đó, chúng ta có thể sử dụng `--list-hosts` option như sau:

```bash
ansible-playbook -i inventory.ini --list-hosts install-nginx.yml
```

Kết quả trả về sẽ tương tự như sau:
```bash
playbook: install-nginx.yml

  play #1 (app): app	TAGS: []
    pattern: [u'app']
    hosts (1):
      192.168.60.4
```

### Set user and sudo option.
Chúng ta có thể chỉ định *remote user* trong playbook sử dụng `remote_user`:

```yaml
---
- hosts: webs
  remote_user: foobar
  tasks:
    - service: name=nginx state=started
```

Nếu `remote_user` không được chỉ định trong playbook, Ansible sẽ sử dụng user được định nghĩa trong file inventory (thông qua `ansible_user`) và cuối cùng là fallback về local user của bạn.

Option `remote_user` có thể được chỉ định cho từng task riêng biệt, ví dụ:

```yaml
---
- hosts: webs
  remote_user: foobar
  tasks:
    - service: name=nginx state=started
    - remote_user: root
```

Nếu sử dụng `ansible-playbook` command, `--remote-user` (hay `-u`) sẽ cho phép chúng ta làm điều tương tự, ví dụ:

```bash
ansible-playbook -i inventory.ini install-nginx.yml --remote-user=vinhnguyen
```

Trong nhiều trường hợp chúng ta cần có quyền *sudo* để thực hiện một số commands. Trong playbook thì `become` và `become_user` sẽ được dùng. Nếu sử dụng command mode thì `--become` (`-b`), `--become-user` (`-U`) và `--ask-become-pass` (`-K`) sẽ được sử dụng để lấy thông tin về *sudo*:

```bash
ansible-playbook -i inventory.ini install-nginx.yml --become \
    --become-user=foobar --ask-become-pass
```

### Other options.
Ngoài ra còn một số options cần chú ý khi sử dụng `ansible-playbook` command:
- `--inventory=<PATH>` hay `-i <PATH>`: sử dụng file inventory khác file mặc định tại `/etc/ansible/hosts`.
- `--verbose` hay `-v`: hiển thị tất cả các output khi thực hiện command, nếu muốn đầy đủ thông tin hơn nữa, chúng ta có thể sử dụng `-vvvv`. Thông thường option này được sử dụng khi *debugging*.
- `--extra-vars=<VARS>` hay `-e <VARS>`: chỉ định các biến được sử dụng trong playbook dưới dạng key-value - `key1=val1,key2=val2`.
- `--forks=<NUM_PROCESSES>` hay `-f <NUM_PROCESSES>`: chỉ định số lượng *process forks* Ansible sẽ sử dụng để chạy playbook trên các hosts một cách song song.
- `--connection=<TYPE>` hay `-c <TYPE>`: loại connection Ansible sẽ sử dụng để kết nối đến các hosts, mặc định sẽ là *ssh*. Ngoài ra *local* sẽ được sử dụng để chạy playbook trên *local machine*,...
- `--check` hay `-C`: dry run mode.

## What will we do?
Cách tốt nhất để làm quen với Ansible playbooks là thông qua một ví dụ cụ thể. Công việc của chúng ta là chuyển đổi [hướng dẫn cài đặt Laravel Framework](https://laravel.com/docs/5.6/installation) thành một Ansible playbook và thực hiện playbook đó trên một server duy nhất. Khá đơn giản phải không? Let's see!

### Vagrant file.
Tương tự trong bài viết trước, chúng ta vẫn sử dụng Vagrant và Virtual Box để tạo các servers ảo thuận tiện cho việc thử nghiệm. Cấu trúc của `Vagrantfile` sẽ đơn giản như sau:

```ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-16.04"
  config.ssh.insert_key = false
  config.vm.synced_folder ".", "/vagrant", id: "vagrant"
  config.vm.synced_folder "./apps", "/home/vagrant/apps", id: "apps"
  config.vm.provider :virtualbox do |v|
    v.memory = 512
    v.linked_clone = true
  end

  config.vm.define "app" do |app|
    app.vm.hostname = "app.test"
    app.vm.network :private_network, ip: "192.168.60.4"
  end
end
```

Để ý chúng ta có hai `synced_folder`, một là nơi lưu các file cấu hình liên quan đến Vagrant, và một là nơi chúng ta sẽ lưu trữ ứng dụng Laravel sau này.

Chạy lệnh `vagrant up` để khởi tạo môi trường.

### Inventory file.
Tiếp theo chúng ta sẽ tạo một file `inventory.ini` tương tự trong bài trước để lưu trữ thông tin các servers thay vì sử dụng file mặc định tại `/etc/ansible/hosts`. Nội dung của file `inventory.ini` sẽ đơn giản như sau:

```ini
[app]
192.168.60.4

[multi:children]
app

[multi:vars]
ansible_user = vagrant
ansible_ssh_private_key_file = ~/.vagrant.d/insecure_private_key
```

Hai biến `ansible_user` và `ansible_ssh_private_key_file` có thể thay đổi tùy theo môi trường hoặc cách bạn muốn cấu hình SSH khi sử dụng với Ansible. Nhóm `app` sẽ là nơi chúng ta cài đặt ứng dụng Laravel.

Cấu trúc thư mục hiện tại sẽ như sau:

```bash
ansible-laravel
├── inventory.ini
├── apps
└── Vagrantfile
```

## Let's configure our server.
Công việc đầu tiên là tạo một playbook với tên là `install-laravel.yml` có nội dung như sau:

```yaml
---
- hosts: app
```

Bạn có thể chạy thử command sau để kiểm tra, hiện tại thì playbook chưa làm bất cứ việc gì cả:

```bash
ansible-playbook -i inventory.ini install-laravel.yml
```

Dưới đây sẽ là cấu trúc của hệ thống mà chúng ta sẽ xây dựng trong các phần sau của bài viết (LEMP Stack)

![](https://images.viblo.asia/48509476-4957-4af5-9a63-97c46e49af17.png)

### Variable file, pre-tasks and handlers.
#### Variable file
Mình sẽ đề cập đến Ansible variables trong bài viết tiếp theo khi tìm hiểu rõ hơn về playbook. Hiện giờ bạn có thể hiểu chúng như những biến môi trường - *environment variables*. Trong file `inventory.ini`, bạn có thể thấy chúng ta cũng đã định nghĩa một số biến cho nhóm `multi`. Các biến này có thể được viết trực tiếp trong file đó hoặc tách ra một file riêng biệt. Playbook cũng có thể sử dụng các biến và chúng ta sẽ dùng `vars_files` để chỉ định danh sách các file chứa các biến mà playbook đó sử dụng. Variable file cũng sẽ được viết dưới dạng YAML.

Trong ví dụ của chúng ta, `install-laravel.yml` playbook sẽ sử dụng một variable file duy nhất - `vars.yml`. Bạn sẽ cần phải tạo file đó nếu nó chưa tồn tại, và thêm các dòng này vào playbook của chúng ta:

```yaml
---
- hosts: app
  vars_files:
    - vars.yml
```

> Danh sách các biến có thể được viết trực tiếp trong playbook sử dụng `vars` key thay vì `vars_files`. Tuy nhiên việc tách các biến ra một file riêng biệt sẽ giúp playbook gọn gàng hơn và các biến sẽ được tập trung về một chỗ, dễ dàng cho những thay đổi sau này.

#### Pre-tasks
Trong ví dụ cài đặt NGINX ở phần trước, chúng ta có một task liên quan đến việc cập nhật *apt cache*. Task đó đang được coi là một task chính do nó nằm trong `tasks` option.

Ansible cho phép chúng ta thực hiện các tasks trước và sau danh sách các tasks chính trong playbook thông qua `pre_tasks` và `post_tasks` options. Ở đây chúng ta cần cập nhật *apt cache* trước khi chạy các tasks chính trong playbook để đảm bảo thông tin của các packages đã được cập nhật. Thêm các dòng sau vào playbook hiện tại:

```yaml
pre_tasks:
  - name: Update packages information.
    apt:
      update_cache: yes
      cache_valid_time:  3600
```

#### Handlers
Đây là một loại task đặc biệt trong Ansible, các tasks này sẽ chỉ chạy nếu được chỉ định ở cuối các task chính bằng cách sử dụng `notify` option. Các handlers sẽ chỉ chạy khi các tasks gọi đến chúng làm thay đổi trạng thái hiện tại của server (và tất nhiên là không trả về lỗi). Trong ví dụ này chúng ta sử dụng NGINX, và bạn có thể tưởng tượng việc load lại cấu hình của NGINX sẽ diễn ra khá thường xuyên sau khi thay đổi cấu hình của nó. Vì vậy cách tốt nhất là tạo một handler cho việc đó và sử dụng lại sau này. Thêm đoạn sau vào playbook hiện tại:

```yaml
handlers:
  - name: reload Nginx
    service:
      name: nginx
      state: reloaded
```

Sử dụng handler này ở cuối một task như sau `notify: reload Nginx`. Chúng ta sẽ đề cập rõ hơn đến việc này khi định nghĩa các task chính của playbook.

> Để đơn giản, trong ví dụ chúng ta đang thực hiện, các **pre-tasks**, **main-tasks**, **post-tasks** và **handlers** sẽ được lưu chung ở một file duy nhất `install-laravel.yml`. Chúng ta có thể tách cách tasks ra các file riêng biệt nếu cần thiết. Đây sẽ là chủ đề cho các bài viết sau trong series này.

> Thông thường Ansible sẽ không chạy các handlers nếu một task nào đó trả về lỗi. Đôi khi việc đó có thể gây ra những *side effects* không mong muốn. Nếu bạn muốn chạy các handlers ngay cả khi task bị lỗi, `--force-handlers ` option của `ansible-playbook` command sẽ giúp chúng ta thực hiện việc đó.


### Basic configurations.
Bây giờ chúng ta sẽ tập trung vào việc định nghĩa các tasks chính của playbook. Bước đầu tiên chúng ta cần cài đặt các phần mềm cần thiết. Theo documentation của Laravel, các yêu cầu cơ bản sẽ là:

- PHP >= 7.1.3
- OpenSSL PHP Extension
- PDO PHP Extension
- Mbstring PHP Extension
- Tokenizer PHP Extension
- XML PHP Extension
- Ctype PHP Extension
- JSON PHP Extension

Ngoài ra chúng ta cần có MySQL, PHP-FPM và NGINX nữa.

Trước khi cài đặt các phần mềm chính, có một số dependencies cần phải cài đặt trước, cụ thể là `python3-apt` và `python3-pycurl`. Trong các ví dụ chúng ta đã trải qua, thông thường mỗi task chỉ cài đặt một phần mềm duy nhất. Tuy nhiên Ansible cung cấp cho chúng ta các công cụ để cài đặt một danh sách các phần mềm nếu cần thiết. Ở đây chúng ta sẽ làm quen với **loops** trong Ansible sử dụng `with_items` (tuy nhiên chi tiết thì sẽ được đề cập trong các bài viết sau :disappointed:). Cụ thể chúng ta sẽ có một task như sau:

```yaml
- name: Install software for apt repository management.
  apt:
    name: "{{ item }}"
    state: present
  with_items:
    - python3-apt
    - python3-pycurl
```

Hiểu đơn giản ở đây chúng ta có một mảng các *items* được định nghĩa thông qua `with_items` (một list trong YAML) option. Mỗi phần tử của mảng sẽ được update qua các vong lặp và gán cho biến `item` - khá gọn và dễ hiểu.

Công việc tiếp theo là cài đặt PHP, PHP extensions, MySQL và NGINX, chúng ta sẽ dùng *trick* ở trên :hand: để thực hiện công việc này. Tuy nhiên trước tiên chung ta cần thêm Ubuntu PPA để cài đặt phiên bản mới hơn của PHP. Ở đây PPA sẽ là **ppa:ondrej/php**. Việc thêm PPA sẽ được thực hiện thông qua `apt_repository` module trong Ansible. Cụ thể như sau:

```yaml
- name: Add ondrej repository for latest version of PHP.
  apt_repository:
    repo: ppa:ondrej/php
    update_cache: yes
```

Goob job! Bây giờ công việc còn lại là cài đặt các phần mềm sử dụng task sau:

```yaml
- name: Install NGINX, MySQL, PHP, PHP extensions and other dependencies.
  apt:
    name: "{{ item }}"
    state: present
  with_items:
    - git
    - curl
    - unzip
    - openssl
    - nginx
    - php7.1-common
    - php7.1-cli
    - php7.1-dev
    - php7.1-gd
    - php7.1-curl
    - php7.1-json
    - php7.1-opcache
    - php7.1-xml
    - php7.1-mbstring
    - php7.1-pdo
    - php7.1-mysql
    - php7.1-zip
    - php7.1-fpm
    - php-apcu
    - libpcre3-dev
    - python-mysqldb
    - mysql-server
```

Trong task trên ngoài việc cài đặt NGINX, PHP và MySQL, chúng ta có cài đặt thêm một số công cụ khác như `git`, `curl`, `unzip`,... Tiếp theo chúng ta cần khởi động một số service quan trọng cũng như điều chỉnh lại firewall. Các task này khá quen thuộc nên mình sẽ không giải thích chi tiết.

Khởi động số service quan trọng như `nginx` và `mysql`:

```yaml
- name: Start NGINX, MySQL services.
  service:
    name: "{{ item }}"
    state: started
    enabled: yes
  with_items:
    - nginx
    - mysql
```

Điều chỉnh lại firewall:

```yaml
- name: Adjust firewall to allow access to the nginx service.
  ufw:
    name: Nginx HTTP
    rule: allow
```

### Configure MySQL.
Công việc cấu hình cho MySQL sẽ bao gồm một số bước đơn giản sau:
- Xóa *test* database mà MySQL cung cấp sẵn.
- Tạo mới một database cho ứng dụng.
- Tạo mới một user.

Để xóa database *test* mà MySQL cung cấp sẵn, chúng ta sẽ sử dụng `mysql_db` module với tên của database là `test` và `state` sẽ là `absent`:

```yaml
- name: Remove the MySQL test database.
  mysql_db:
    db: test
    state: absent
```

Trong bài viết làm quen với ad-hoc commands trong Ansible, chúng ta đã đề cập đến việc tạo mới database và user sử dụng các module mà Ansible đã cung cấp sẵn là `mysql_db` và `mysql_user`. Do đó việc chuyển đổi sang playbook là khá đơn giản.

Chúng ta sẽ tạo một database có tên trùng với biến `domain` mà chúng ta đã định nghĩa trong file `vars.yml`.

```yaml
- name: Create new database for the application.
  mysql_db:
    db: "{{ domain }}"
    state: present
```

Và cuối cùng là tạo một user mới:

```yaml
- name: Create new MySQL user for the application.
  mysql_user:
    name: "{{ domain }}"
    password: "12345678"
    priv: "{{ domain }}.*:ALL"
    host: localhost
    state: present
```

Một điểm cần lưu ý ở đây là thông tin về password đang ở dạng *clear text*, không an toàn khi sử dụng với version control. Để giải quyết vấn đề này, chúng ta sẽ sử dụng [Ansible Vault](https://docs.ansible.com/ansible/2.4/vault.html) - một khái niệm khá mới trong Ansible.

> Trên môi trường production bạn cần phải thay đổi password cho user `root` của MySQL (mặc định sẽ không có password), cũng như giới hạn truy cập thông qua `root` ở localhost mà thôi. Đây sẽ là một bài tập nho nhỏ cho các bạn :thinking: 

#### Store private information using Ansible Vault
Ansible Vault là một công cụ cho phép lưu trữ những thông tin nhạy cảm như password hay API keys một cách an toàn hơn bằng cách mã hóa các thông tin đó sử dụng cipher mặc định là [AES - Advanced Encryption Standard](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard). Các file đã được mã hóa có thể sử dụng với version control một cách an toàn. Command `ansible-vault` sẽ được sử dụng để quản lý các file mã hóa này.

Ansible Vault có thể được sử dụng để mã hóa hầu hết các cấu trúc dữ liệu sử dụng bởi Ansible. Nhưng thông dụng nhất là việc mã hóa các biến: **group variables**, **host variables**, **inventory variables**,... Chúng ta có thể mã hóa hoàn bộ file hoặc mã hóa một phần của file. Binary files cũng có thể được mã hóa, tuy nhiên nó vượt xa phạm vi của bài viết này. Dưới đây là một số commands thông dụng khi làm việc với Ansible Vault:

Tạo mới một file dữ liệu được mã hóa. Chú ý khi dùng command này bạn có thể gặp lỗi *No such file or directory*, lỗi này xảy ra là do Ansible không tìm được file được định nghĩa ở biến một trường `EDITOR`. Để giải quyết bạn cần kiểm tra lại biến môi trường đó, hoặc tạo mới sử dụng command như `export EDITOR=/bin/nano` chẳng hạn. Khi chạy command bên dưới, bạn sẽ phải nhập mật khẩu cho vault. **Hiện tại thì mật khẩu phải giống nhau cho các file được sử dụng cùng nhau tại một thời điểm**.

```bash
ansible-vault create credentials.yml
```


Chỉnh sửa một file đã được mã hóa:

```bash
ansible-vault edit credentials.yml
```


Thay đổi mật khẩu của vault:

```bash
ansible-vault rekey credentials.yml foo.yml bar.yml
```


Mã hóa file ở dạng clear text. Tương tự bạn sẽ được yêu cầu nhập mật khẩu cho vault:

```bash
ansible-vault encrypt credentials.yml
```


Giải mã file đã được mã hóa:

```bash
ansible-vault decrypt credentials.yml
```


Hiển thị nội dung của file đã được mã hóa:

```bash
ansible-vault view credentials.yml
```


Mã hóa một string dưới dạng một format có thể được sử dụng trong playbooks, bạn có thể tham khảo thêm [tại đây](https://docs.ansible.com/ansible/2.4/vault.html#use-encrypt-string-to-create-encrypted-variables-to-embed-in-yaml)


-----

OK! Quay trở lại với ví dụ hiện tại, chúng ta sẽ sử dụng Ansible Vault để lưu password của MySQL. Chúng ta sẽ lưu tất cả các thông tin *nhạy cảm* trong thư mục *secrets*

```bash
├── install-laravel.yml
├── inventory.ini
├── secrets
├── apps
├── Vagrantfile
└── vars.yml
```

Tiếp theo chúng ta sẽ tạo một file mã hóa để lưu credentials của user (ở đây là password):

```bash
ansible-vault create secrets/database.yml
```

Nhập mật khẩu cho vault và điền nội dụng sau vào file tạm mà Ansible cung cấp:

```yaml
---
db_user_password: '12345678'
```

Nội dung của file `secrets/database.yml` sẽ được mã hóa với header có dạng như sau:

```yaml
$ANSIBLE_VAULT;1.1;AES256
```

Tiếp theo chúng ta sẽ import  file `secrets/database.yml` vào bên trong playbook và sử dụng biến `db_user_password` trong `mysql_user` module:

```yaml
vars_files:
  - vars.yml
  - secrets/database.yml
```

```yaml
- name: Create new MySQL user for the application.
  mysql_user:
    name: "{{ domain }}"
    password: "{{ db_user_password }}"
    priv: "{{ domain }}.*:ALL"
    host: localhost
    state: present
```

Chạy playbook chúng ta sẽ gặp lỗi như sau: **ERROR! Attempting to decrypt but no vault secrets found**. Có rất nhiều cách để giải quyết việc này, tuy nhiên cách đơn giản nhất là sử dụng `--ask-vault-pass` option của `ansible-playbook` command.

```bash
ansible-playbook -i inventory.ini install-laravel.yml --ask-vault-pass
```

Ngoài cách trên bạn cũng có thể lưu vault password ra một file và sử dụng `--vault-id` của `ansible-playbook` command. Bạn có thể tham khảo thêm [tại đây](https://docs.ansible.com/ansible/2.4/vault.html#vault-ids-and-multiple-vault-passwords)

### Install Composer and Laravel installer.
Chúng ta sẽ cài đặt Laravel sử dụng [Laravel Installer Composer Package](https://packagist.org/packages/laravel/installer). Ở đây sẽ có hai công việc chính cần làm là cài đặt **Composer** và cài đặt **Laravel Installer**.

Để cài đặt **Composer** chúng ta cần làm ba việc, tương ứng với ba tasks trong playbook.
- Download Composer installer.
- Chạy installer trên.
- Di chuyển composer binary vào thư mục bin.

Để download Composer installer chúng ta sẽ sử dụng `get_url` module của Ansible, trong đó chúng ta sẽ cung cấp các options: `url` - URL đến file cần tải, `dest` - nơi lưu file đã tải xuống (thường trong thư mục `/tmp`) và `mode` - ở đây sẽ là `0755` do chúng ta cần file này ở dạng *executable*

```yaml
- name: Download Composer installer.
  get_url:
    url: https://getcomposer.org/installer
    dest: /tmp/composer-installer.php
    mode: 0755
```

Tiếp đến chúng ta cần chạy PHP script trên để lấy về file `composer.phar`. Một lần nữa chúng ta sẽ lại sử dụng `command` module. Ở đây chúng ta sẽ có hai option mới là `chdir` - thay đổi vào thư mục chỉ định trước khi chạy command; `creates` - tên của file, nếu file đã tồn tại thì command sẽ không được thực thi.

```yaml
- name: Run Composer installer.
  command: php composer-installer.php
  args:
    chdir: /tmp
    creates: /usr/local/bin/composer
```

Bước tiếp theo là chuyển file `composer.phar` vào thư mục bin. Ở đây chúng ta sẽ sử dụng `shell` module với option `creates` có ý nghĩa tương tự như ở trên.

```yaml
- name: Move Composer into globally-accessible location.
  shell: mv /tmp/composer.phar /usr/local/bin/composer
  args:
    creates: /usr/local/bin/composer
```

Cuối cùng chúng là sẽ cài đặt Laravel Installer sử dụng Composer. Ở đây chúng ta không cần quyền *sudo* để chạy command do đó `become`  sẽ có giá trị là `false`

```yaml
- name: Install Laravel Installer via Composer.
  shell: /usr/local/bin/composer global require "laravel/installer"
  args:
    creates: "{{ home_directory }}/.config/composer/vendor/bin/laravel"
  become: false
  
- name: Create symlink for laravel installer.
  file:
    src: "{{ home_directory }}/.config/composer/vendor/bin/laravel"
    dest: /usr/local/bin/laravel
    state: link
```

Chúng ta có thể sử dụng ad-hoc command sau để kiểm tra Laravel Installer:

```bash
ansible -i inventory.ini app -m command -a "laravel -V"
```

Kết quả trả về sẽ tương tự như sau:

```bash
192.168.60.4 | SUCCESS | rc=0 >>
Laravel Installer 2.0.1
```

### Install Laravel and configure the application.
Sau khi đã cài đặt Laravel Installer việc tạo mới một Laravel project là khá đơn giản. Chúng ta sẽ sử dụng `command` module của Ansible và `laravel new <project_name>` command như sau:

```yaml
- name: Create a new Laravel project.
  command: "laravel new {{ laravel_project_name }}"
  args:
    chdir: "{{ home_directory }}/apps"
    creates: "{{ laravel_project_root }}/artisan"
```

Ở đây chúng ta sẽ kiểm tra xem file `artisan` trong thư mục của project đã tồn tại hay chưa trước khi chạy `laravel new` command. Chúng ta cũng sử dụng một số biến được định nghĩa trong file [`vars.yml`](https://github.com/rnd-forests/ansible-laravel/blob/master/vars.yml).

Tiếp đến chúng ta sẽ thực hiện một số bước khá đơn giản khi cài đặt Laravel project như: cài đặt composer packages, tạo application key, và thay đổi một số thông số trong file `.env`.

Cài đặt composer packages sử dụng `composer install` như sau. Thông thường thì `laravel new` command đã làm việc này cho chúng ta tuy nhiên mình sẽ thêm vào đây với mục đích minh họa.

```yaml
- name: Install Composer packages for Laravel application.
  command: composer install
  args:
    chdir: "{{ laravel_project_root }}"
    creates: "{{ laravel_project_root }}/vendor"
```

Tạo application key sử dụng `php artisan key:generate`

```yaml
- name: Generate Laravel application encryption key.
  command: php artisan key:generate
  args:
    chdir: "{{ laravel_project_root }}"
```

Bước tiếp theo là thay đổi một số thông tin trong file `.env` cụ thể là thông tin về username và password cho database. Có khá nhiều cách để thực hiện công việc này, tuy nhiên `lineinfile` module là một lựa chọn khá đơn giản và hiệu quả. Mục đích của module này khá đơn giản là đảm bảo một dòng text trong một file nào đó tồn tại hoặc không tồn tại. Trong file `.env` có ba thông số chúng ta cần phải thay đổi đó là `DB_DATABASE`, `DB_USERNAME` và `DB_PASSWORD` với các giá trị chúng ta đã xác định khi cấu hình MySQL.

```yaml
- name: Update environment file.
  lineinfile:
    path: "{{ laravel_project_root }}/.env"
    regexp: "{{ item.regex }}"
    line: "{{ item.value }}"
    state: present
  with_items:
    - { regex: '^DB_DATABASE', value: 'DB_DATABASE={{ domain }}' }
    - { regex: '^DB_USERNAME', value: 'DB_USERNAME={{ domain }}' }
    - { regex: '^DB_PASSWORD', value: 'DB_PASSWORD={{ db_user_password }}' }
```

Module `lineinfile` có khác nhiều options khác nhau. Tuy nhiên trong ví dụ trên, chúng ta sử dụng regular expression để tìm đến vị trị của *environment variable* cần thay đổi. Nếu vị trí của biến môi trường được tìm thấy và `state` được đặt là `present`, nội dung của `line` option sẽ được thay thế cho nội dung hiện tại của dòng text chứa biến môi trường đó (nếu nội dung đó chưa tồn tại).

> Chú ý các regular expressions trong `lineinfile` module sẽ được viết theo cú pháp của Python.

Tiếp theo chúng ta cần thay đổi permissions cho một số thư mục như `bootstrap` hay `storage`:

```yaml
- name: Change permission of some directories.
  file:
    path: "{{ laravel_project_root }}/{{ item }}"
    owner: "www-data"
    group: "www-data"
    mode: "u+x,g+x"
    recurse: yes
  with_items:
    - bootstrap
    - storage
```

Nếu việc thay đổi permissions không thành công, bạn có thể phải thay đổi `Vagrantfile` như sau. Mình đã thử nhưng dường như permissions của các thự mục trên không thay đổi khi sử dụng Ansible task ở trên :thinking:

```ruby
config.vm.synced_folder "./apps", "/home/vagrant/apps", owner: "www-data", group: "www-data", id: "apps"
```

Trong thực tế còn khá nhiều việc cần làm để có được một ứng dụng Laravel hoàn chỉnh, tuy nhiên chúng ta sẽ dừng lại ở đây với mục đích mình họa là chính :smile: 

### Configure NGINX.
Chúng ta đã đi đến bước cuối cùng trước khi hoàn thành ví dụ minh họa :tired_face:. Trong bước này chúng ta sẽ cùng cấu hình NGINX web server cho Laravel application mà chúng ta vừa cài đặt ở trên. Sau đây sẽ là một số bước chính (trên thực tế có thể phức tạp hơn):
- Tạo symbolic link cho thư mục của Laravel application chúng ta vừa tạo ở trên.
- Xóa bỏ file cấu hình mặc định của NGINX tại `/etc/nginx/sites-enabled/default`
- Di chuyển file cấu hình của chúng ta vào thư mục `/etc/nginx/sites-available`
- Tạo symbolic link cho file cấu hình trên trong thư mục `/etc/nginx/sites-enabled`

Ở đây các bước 1, 2 và 4 đã khá quen thuộc, nên mình sẽ không giải thích thêm và sẽ chỉ đưa ra nội dung của task mà thôi.

Tạo symbolic link cho thư mục của Laravel application:

```yaml
- name: Create symlink for laravel application.
  file:
    src: "{{ laravel_project_root }}"
    dest: "{{ laravel_project_symlink }}"
    state: link
```

Xóa bỏ file cấu hình mặc định của NGINX:

```yaml
- name: Remove default configuration file in sites-enabled directory.
  file:
    path: /etc/nginx/sites-enabled/default
    state: absent
  notify: reload Nginx
```

Di chuyển file cấu hình của chúng ta vào thư mục `/etc/nginx/sites-available`. Chúng ta sẽ làm quen với một module mới trong Ansible đó là `template`. Ở đây chúng ta đã có sẵn một file template cho NGINX được lưu tại [templates/nginx/ansible-laravel.conf.j2](https://github.com/rnd-forests/ansible-laravel/blob/master/templates/nginx/ansible-laravel.conf.j2). Ansible sử dụng [Jinja2 Template Engine](http://jinja.pocoo.org/docs/2.10) để định nghĩa nội dung cho các templates. Việc sử dụng các biến trong template cũng tương tự như khi sử dụng trong các playbooks - `{{ varible }}`. Bạn có thể đọc thêm về [module này](http://docs.ansible.com/ansible/latest/modules/template_module.html) trong documentation của Ansible.

```yaml
- name: Add NGINX configuration file for Laravel application.
  template:
    src: templates/nginx/ansible-laravel.conf.j2
    dest: "/etc/nginx/sites-available/{{ domain }}.conf"
    owner: root
    group: root
    mode: 0644
  notify: reload Nginx
```

Tạo symbolic link cho file cấu hình trên trong thư mục `/etc/nginx/sites-enabled`

```yaml
- name: Create new symbolic link for the configuration file.
  file:
    src: "/etc/nginx/sites-available/{{ domain }}.conf"
    dest: /etc/nginx/sites-enabled/default.conf
    state: link
  notify: reload Nginx
```

Để ý rằng sau mỗi task chúng ta dùng `notify` option để gọi đến handler mà chúng ta đã định nghĩa trong phần trước của bài viết. Handler này có nhiệm vụ đơn giản là khởi động lại `nginx` service.

Truy cập địa chỉ [http://192.168.60.4](http://192.168.60.4/) trên trình duyệt bạn sẽ thấy trang welcome mặc định của Laravel. We're all done! :smiley: :tired_face: :thinking: :rofl: 

## Final thoughts.
Trong bài viết này chúng ta đã cùng tìm hiểu về Ansible playbooks thông qua ví dụ về việc cài đặt Laravel application. Thông qua đó chúng ta cũng đã tìm hiểu thêm được một số module mới trong Ansible cũng như những lưu ý khi viết các task. Có thể nhiều khái niệm còn khá mơ hồ với các bạn, tuy nhiên chúng ta sẽ cùng làm rõ chúng trong những bài viết sau của series này. Một điểm cần lưu ý nữa là trong ví dụ trên playbook của chúng ta chưa khoảng 27 tasks và tất cả chúng đều được viết chung vào một file. Trong các bài viết sau chúng ta sẽ cùng tìm hiểu cách để *cleanup* một playbook sử dụng **roles** và **includes**.  Mong bài viết này sẽ giúp ích được phần nào đó cho các bạn.

Một bài tập nho nhỏ cho các bạn là thay đổi cấu hình của PHP-FPM bằng cách thay đổi một số thông số sau:
- `pm.max_children`
- `pm.start_servers`
- `pm.min_spare_servers`
- `pm.max_spare_servers`
- `pm.max_requests`

Một task nhỏ khác là cài đặt Redis cho Laravel application trên của chúng ta. :smiley: 

## What next?
Một số chủ đề tiếp theo trong series về **Ansible**:
- :white_check_mark: **Ad-hoc Commands**
- :white_check_mark: **Ansible Playbooks.** (mình sẽ cố viết thêm một hoặc hai bài viết nữa về chủ đề này)
- :negative_squared_cross_mark: **Ansible Inventories**
- :negative_squared_cross_mark: **Ansible Roles and Includes**
- :negative_squared_cross_mark: **Ansible and Deployment**
- :negative_squared_cross_mark: **Ansible and Docker**
- :negative_squared_cross_mark: **Ansible and Server Security**
- :negative_squared_cross_mark: **Ansible and Network Configuration**
- ...

P/S: Bài viết có thể có nhiều sai sót, mong nhận được sự góp ý từ mọi người :smiley:

Source code: https://github.com/rnd-forests/ansible-laravel