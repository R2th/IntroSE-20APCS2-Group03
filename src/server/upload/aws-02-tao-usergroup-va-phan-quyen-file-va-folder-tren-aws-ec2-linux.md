## 1/ Create user

### 1.1 Authen by root 
```
sudo su -
```
### 1.2 Add user
```
useradd hoa
```
### 1.3 Set password for user
```
passwd <password>
```
### 1.4 Delete user
```
userdel <name of user>
```

### 1.5 Search by vim
press `Esc` press `/`

 Sau khi tạo user rồi thì thử truy cập vào bằng account mới tạo xem đc k

### 1.6 Cho phép user truy cập vào hệ thống bằng password
vào file này 
```
vi /etc/ssh/ssh_config
```

tìm từ `password`
nhấn `Esc` + `/` + type "`password`"
sữa thì nhấn `Insert` trên bàn phím
lưu
`Esc + wq`
### 1.7 Restart service
```
service sshd restart
```

## 2 Tạo nhóm user
Tạo nhóm
```
groupadd ketoan
```

Thêm user
```
usermod -a -G <groupname> username
```
vd: usermod -a -G ketoan hoa

Kiểm tra user đã nằm trong group hay chưa
```
id hoa
```
Cấp toàn quyền truy cập cho một thư mục
```
chmod -Rf 770 <ten thu muc>
```
Cấp quyền cho một user truy cập vào một thư mục
```
chown -Rf :ketoan tienluong/
```
> trong đó `ketoan` : tên user
> 
> `tienluong/`: tên thư mục




REFERENCES

YOUTUBE
[TIN HOC THAT LA DON GIAN](https://www.youtube.com/watch?v=JcAqkYG24v0&list=PLjCpH2Qpki-sTjdlYXE8AifSKQFa8ZL23)