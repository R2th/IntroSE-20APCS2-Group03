Bài toán đặt ra:
Vì lý do nào đó, bạn phải di chuyển jenkins từ server cũ sang server mới. (chuyển đổi hạ tầng, chuyển sang cloud...)
- Giải pháp đơn giản nhất: Cài đặt trên server mới, manual config lại -> Tay to, tốn thời gian, dễ bị thiếu...
- Giải pháp 2: Cài đặt trên server mới, backup lại data từ server cũ (cần backup lại những gì, làm thế nào để không thừa, thiếu...)

Mình đã thực hiện theo cách 2:

1. Cài đặt server jenkins mới. Làm theo hướng dẫn [này](https://www.digitalocean.com/community/tutorials/how-to-install-jenkins-on-ubuntu-20-04) , tùy theo hệ điều hành, mình thường follow các hướng dẫn trên digitalocean
2. Dữ liệu của jenkisn tất cả nằm trong thư mục 
```
/var/lib/jenkins
```

Copy toàn bộ dữ liệu ở server cũ sang server mới. -> xong
Tuy nhiên có khá nhiều case xảy ra. 
1. Thông thường, để cho jenkins đủ permission, người cài đặt thường chạy jenkins bằng local user thay vì user mặc định của jenkins là **jenkins** 
kiểm tra trên server cũ, nếu đã dùng user local thì cũng config trên server mới tương tự
kiểm tra và backup trên file 
```
/etc/default/jenkins
```
update **localuser** and group user with local user trong server mới, thường mặc định local và group user cùng tên
```
# user and group to be invoked as (default to jenkins)
JENKINS_USER=localuser
JENKINS_GROUP=localuser
```
update user và group cho các folder config
```
sudo chown -R localuser:localuser /var/lib/jenkins
sudo chown -R localuser:localuser /var/cache/jenkins
sudo chown -R localuser:localuser /var/log/jenkins
```

Sau đó reset lại deamon và Jenkins
```
sudo systemctl daemon-reload
sudo service jenkins restart
```