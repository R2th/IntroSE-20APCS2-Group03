Nhu cầu vọc vạch và sử dụng một số tính năng mới mà vừa qua mình có upgrade gitlab sử dụng docker trên VPS từ phiên bản 9.x lên 11.1 và có khá nhiều vấn đề phát sinh
Tất nhiên yêu cầu là phải giữ nguyên tất cả repository, users và các config projects đã up lên. Với tinh thần ăn sẵn và triển khai nhanh nhất thì mình đều sử dụng docker gitlab 
Bản gitlab-ce mới nhất 
https://hub.docker.com/r/gitlab/gitlab-ce/

Phần quan trọng nhất là CSDL mình sử dụng postgresql, bạn có thể link 2 container gitlab docker và postgresql docker vào hoặc NAT port trên cùng 1 network brigde để sử dụng 
Phần config gitlab để sử dụng external database có các thông số quan trọng:

File: /etc/gitlab/gitlab.rb
```
# Disable built-in Postgres
postgresql['enable'] = false

# Fill in the values for database.yml
gitlab_rails['db_adapter'] = 'postgresql'
gitlab_rails['db_encoding'] = 'utf8'
gitlab_rails['db_host'] = '127.0.0.1'
gitlab_rails['db_port'] = 3306
gitlab_rails['db_username'] = 'USERNAME'
gitlab_rails['db_password'] = 'PASSWORD'
```

Sau đó chạy lệnh để gitlab cập nhật config:

```
gitlab-ctl reconfigure
service gitlab restart
```
## Copy code từ gitlab cũ sang server mới:
Code sẽ nằm trong thư mục /home/git/data/repositories hoặc /var/opt/gitlab/gitlab-data/repositories (Tùy config mỗi docker images và phiên bản, chúng ta sẽ phải tìm folder **repositories** trong thư mục chứa data của gitlab)
Chúng ta tiến hành copy tất cả folder trong folder repositories này sang folder mới tương ứng.

## Một số lỗi gặp phải
1. sh: 1: /opt/gitlab/embedded/service/gitlab-shell/bin/gitlab-shell: not found khi push hoặc pull code 
Tiến hành regenerated authorized key bằng cách chạy lệnh `sudo gitlab-rake gitlab:shell:setup`

2. Wrong or missing hooks 
Chạy lệnh `sudo gitlab-rake gitlab:check` bạn sẽ thấy rất nhiều lỗi wrong or missing hooks 
Cách fix: sudo -u git /opt/gitlab/embedded/service/gitlab-shell/bin/create-hooks /var/opt/gitlab/git-data/repositories

Nếu gặp lỗi: create_hooks': uninitialized constant FileUtils (NameError)
Thêm lên đầu file /opt/gitlab/embedded/service/gitlab-shell/bin/create-hooks 
```
require 'fileutils'
```

3. REMOTE HOST IDENTIFICATION HAS CHANGED!]
ssh-keygen -f "/home/user/.ssh/known_hosts" -R [gitexample.dev]

4. Offending key for IP in /home/user/.ssh/known_hosts:1
Matching host key in /home/user/.ssh/known_hosts:2

Tiến hành xóa và add lại: 
```
sed -i '1d' /home/user/.ssh/known_hosts
sed -i '1d' /home/user/.ssh/known_hosts
```

## Tham khảo:
https://docs.gitlab.com/omnibus/settings/database.html
https://docs.gitlab.com/ce/administration/raketasks/maintenance.html#rebuild-authorized_keys-file