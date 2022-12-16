# Giới thiệu về SonarType Nexus Repository
Khi lập trình chúng ta thường tự tạo các hàm riêng của chính mình, điển hình là các hàm trong các class Utils.
Chúng ta thường phải tạo ra các file này, muốn di chuyển qua các project, luôn phải copy file đó.
Tốt hơn thì build ra các file jar (trong java) rồi gửi qua nhau.
Cách làm này khá thủ công.
Ở các công ty lớn để quản lý các thư viện chung nay, người ta thường tạo ra các Repository riêng để lưu trữ và quản lý giống như khi chúng ta tải các thư viện trên kho quản lý maven. 
Ví dụ khi muốn lấy thư viện liên quan đên json chúng ta vào link [này](https://mvnrepository.com/artifact/org.json/json) 
copy đoạn code về dependencies là xong
```
<!-- https://mvnrepository.com/artifact/org.json/json -->
<dependency>
    <groupId>org.json</groupId>
    <artifactId>json</artifactId>
    <version>20200518</version>
</dependency>

```
Điều này quá dễ ràng và thuận tiện. 
Tuy nhiên đây là Repository chung, sẽ không còn bảo mật, chính vì vậy các công ty thường tự cài đặt Repository riêng, bảo mật hơn rất nhiều.
Trong bài hôm nay, mình sẽ giới thiệu Repository mà bên mình đang sử dụng là Sonartype Nexus

- Cài đặt và hoạt động tốt trong mạng LAN nội bộ
- Bảo mật tuyệt đối nếu không public ra ngoài
- Chia sẻ dễ ràng, dễ ràng nâng cấp version
- Giao diện người dùng web rất tốt
- Dễ bảo trì, hầu như không có chi phí hành chính
- Triển khai từ Maven hoạt động ngay lập tức 

Hướng dẫn cài đặt (mình hướng dẫn trên centos 7)

1. Cài đặt java  8 nếu chưa có 
```
sudo yum -y install java-1.8.0-openjdk java-1.8.0-openjdk-devel
```

2. Tải file về 
```
mkdir nexus
cd nexus
wget https://download.sonatype.com/nexus/3/latest-unix.tar.gz
```
3. giải nén
```
tar -xvzf latest-unix.tar.gz
```
4. Đổi tên các thư mục
```
mv nexus-3.20.1-01 nexus
```
5. Chạy ứng dụng
```
nexus/bin/nexus run 
```

ứng dụng chạy ở port 8081.
Khi đăng nhập bạn sẽ được hướng dẫn lấy mật khẩu mặt định 
![](https://images.viblo.asia/f6281448-c4c6-4461-a4f3-b573e4c9911e.png)

xem mật khẩu bằng cách chạy lệnh 
```
cat sonatype-work/nexus3/admin.password
```

Đăng nhập thành công,
Sau khi đăng nhập thì cài lại mật khẩu admin 
và nên **Disable Anonymus Access**  để bảo mật repository của bạn

Trong các [này](https://viblo.asia/p/huong-dan-day-thu-vien-java-len-nexus-repostory-bJzKmP8E59N), mình đã hướng dẫn tạo thư viện, đẩy lên repository và lấy về project.