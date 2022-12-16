![](https://images.viblo.asia/c9057cf7-fce8-49f0-95dd-1cd0e16819a9.png)
Ansible là một công cụ "Configuration Management", tức là một công cụ hỗ trợ, cấu hình, cài đặt hệ thống một cách tự động. Các công cụ này giúp thực hiện triển khai hệ thống thuận lợi, hạn chế những công việc lặp đi lặp lại tiết kiệm thời gian, và có thể triển khai cho những hệ thống tương tự.

Một trong những khái niệm quan trọng trong ansible là **modules**. Modules là một thành phần cốt lõi của Ansible, nó là  là một khối/đơn vị xử lý của một task (task thì sẽ thêm các biến, tham số vào nữa để việc xử lý trên remote server được mềm dẻo hơn). Trong Ansible, thay vì nói: *"Ansible, hãy thực hiện lệnh này!"*. thì bạn sẽ nói: *"Ansible, hãy thực thi module này và cho phép nó chạy bất kỳ lệnh nào nó cần để hoàn thành công việc!"*. Thông qua quá trình tìm hiểu và sử dụng Ansible, mình sẽ cùng các bạn tổng hợp lại một số Ansible modules cơ bản, thường xuyên được sử dụng mà bạn nên biết nhé!

# Module 1: Package management

Đây là module được thiết kế cho hầu hết các trình quản lý gói (package management) phổ biến, chẳng hạn như apt, dnf,... cho phép bạn cài đặt các package trên hệ thống. Ngoài các chức năng cụ thể của từng trình quản lý gói thì hầu hết các trình quản lý gọi đều có thể install, update, upgrade, downgrade, remove, và list các packages.

Ví dụ, ở đây, mình có một task là install gói httpd trên CentOS/RHEL 8 sử dụng trình quản lý gói dnf.
```
- hosts: all
  user: ansible
  become: True
  tasks:
    - name: Install httpd package
      dnf:
        name: httpd
        state: present
        update_cache: True
```
# Module 2: Flie

Trong Ansible, có nhiều các module làm việc với tệp tin, thư mục, links trên các node đích (node client) như copy, template, file,... thường được sử dụng. Trước tiên, chúng ta sẽ cùng tìm hiểu về file module. File module giúp quản lý tập tin và các thuộc tính của nó. Ngoài việc taọ, xóa, xác định vị trí của tệp tin file module cũng đặt các quyền và quyền sở hữu hay thiết lập symlinks cho tệp tin.

Ví dụ,
```
- hosts: all
  user: ansible
  become: True
  tasks:
    - name: Change file ownership, group and permissions
      file:
        path: /etc/thuntt.config
        owner: thuntt
        group: thuntt
        mode: '0644'

    - name: Create an insecure file
      file:
        path: /viblo
        owner: root
        group: root
        mode: '1777'

    - name: Create a symbolic link
      file:
        src: /file/to/link/to
        dest: /path/to/symlink
        owner: thuntt
        group: thuntt
        state: link
```
# Module 3: Template

Có nhiều cách khác nhau với Ansible giúp bạn có thể thao tác với nội dung của tệp, ngoài template module thì mình còn thấy lineinfile module cũng rất phổ biến và được sử dụng nhiều. Tuy nhiên, đối với mình, sau khi sử dụng thì mình cảm thấy template module rõ ràng và dễ hiểu hơn khá nhiều so với lineinfile module :))) 

Template trong Ansible là một tệp chứa tất cả các tham số cấu hình của bạn, nhưng các giá trị động được cung cấp dưới dạng biến. Trong quá trình thực thi playbook, các biến có thể được thay thế bằng các giá trị bạn cần. Ngoài ra, bạn có thể làm được nhiều việc hơn là thay thế các biến, với sự trợ giúp của công cụ tạo template  Jinj2. Bạn có thể có các câu lệnh có điều kiện, vòng lặp, viết macro, bộ lọc để chuyển đổi dữ liệu, thực hiện các phép tính số học, v.v. Các tệp template thường sẽ có phần mở rộng là `.j2`. Các biến trong tệp template sẽ được ký hiệu bằng dấu ngoặc nhọn kép, '{{biến}}'.

Ví dụ:
```
- hosts: all
  vars:
    variable_to_be_replaced: 'Hello world'
    inline_variable: 'hello again'
  tasks:
    - name: Ansible Template Example
      template:
        src: hello_world.j2
        dest: /Users/mdtutorials2/Documents/Ansible/hello_world.txt

hello_world.j2
--------------
{{ variable_to_be_replaced }}
This line won't be changed
Variable given as inline - {{ inline_variable }} - :)

output - hello_world.txt
------
Hello world
This line won't be changed
Variable given as inline - hello again - :)

mdtutorials2$ ls -lrt hello_world.txt
-rw-r--r--  1 root  wheel  81 Oct 16 07:23 hello_world.txt
```
# Module 4: Copy

Copy module là module thường được sử dụng khi chúng ta muốn sao chép một tệp tin từ Ansible server (Management node) đến các node đích (client node).

Ví dụ: 
```
- name: copy file from local to remote with owner, group and file permissions (octal)
  copy:
    src: test_file
    dest: $HOME/test_file
    owner: thuntt
    group: thuntt
    mode: 0644

- name: copy file from local to remote with owner, group and file permissions (octal)
  copy:
    src: test_file
    dest: $HOME/test_file
    owner: thuntt
    group: thuntt
    mode: 0644

- name: copy file from local to remote with root as the owner (become required)
  copy:
    src: test_file
    dest: "/home/{{ ansible_user }}/test_file"
    owner: root
    group: root
    mode: 0644
  become: true
```
# Modlue 5: Service

Đối với các node client là Unix/Linux, service module là một module rất hữu ích giúp kiểm soát các service chạy trên các server này. Giống với các module khác, service module cũng đi kèm với một số tham số và các tham số này có các tùy chọn riêng hoặc giá trị phù hợp. Sử dụng các tham số này và các giá trị bắt buộc, các banj có thể quản lý các service với các chức năng như stop, start, reload, ... trên các node client.

Ví dụ:
```
- name: Start service httpd, if not running
  service:
    name: httpd
    state: started

- name: Stop service httpd, if running
  service:
    name: httpd
    state: stopped

- name: Restart service httpd, in all cases
  service:
    name: httpd
    state: restarted

- name: Reload service httpd, in all cases
  service:
    name: httpd
    state: reloaded

- name: Enable service httpd, and not touch the running state
  service:
    name: httpd
    enabled: yes
```
# Module 6: shell

Trong Ansible, chúng ta có shell module được sử dụng để chạy các lệnh thông qua shell (/bin/sh) trên các máy đích từ xa. Module này nhận các lệnh làm đầu vào cùng với một tập hợp các đối số.

Ví dụ:
```
- name: Execute the command in remote shell; stdout goes to the specified file on the remote.
  shell: somescript.sh >> somelog.txt

- name: Change the working directory to somedir/ before executing the command.
  shell: somescript.sh >> somelog.txt
  args:
    chdir: somedir/
```
# Tạm kết

Tới đây, hi vọng các bạn đã có thể ghi nhớ và sử dụng được một số modules Ansible cơ bản được nêu ở trên. Ansible được xây dựng kèm theo với hàng ngàn module có sẵn khác nhau và vẫn đang tiếp tục được mở rộng, bạn có thể xem thêm tại [đây](https://docs.ansible.com/ansible/latest/collections/index_module.html). Bên cạnh đó, với Ansible, bạn cũng có thể tự viết các module Ansible riêng để phù hợp với nhu cầu sử dụng mình. 
# Nguồn tham khảo
- https://docs.ansible.com/ansible/latest/index.html
- https://dzone.com/articles/10-easy-to-use-modules-in-ansible-1
- https://opensource.com/article/19/9/must-know-ansible-modules