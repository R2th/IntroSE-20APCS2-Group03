# Apache Solr là gì?
**Apache Solr** là một nền tảng tìm kiếm mã nguồn mở, viết bằng ngôn ngữ Java, được phát triển từ dự án Lucene. Solr có khả năng mở rộng, đáng tin cậy và có khả năng chịu lỗi cao, được sử dụng để xây dựng các **ứng dụng tìm kiếm**.
Các tính năng chính của Solr bao gồm:
* Tìm kiếm toàn văn bản, highlighting văn bản, tìm kiếm theo khía cạnh, xếp hạng kết quả tìm kiếm
* Đánh chỉ mục thời gian thực
* Tích hợp cơ sở dữ liệu, xử lý tài liệu phong phú (ví dụ: Word, PDF, JSON)
* Cung cấp tìm kiếm phân tán và sao chép chỉ mục

Solr được sử dụng rộng rãi cho các trường hợp sử dụng phân tích và tìm kiếm dữ liệu lớn, có một cộng đồng phát triển tích cực và các bản phát hành thường xuyên.


# Cài đặt Apache Solr trên Ubuntu 18.04
## Bước 1: Cài đặt Java
Apache Solr yêu cầu phải cài đặt Java. Nếu bạn đã cài đặt Java, vui lòng bỏ qua bước này.
Kiểm tra phiên bản Java: 

```
$ java -version
java version "11.0.2" 2019-01-15 LTS
Java(TM) SE Runtime Environment 18.9 (build 11.0.2+9-LTS)
Java HotSpot(TM) 64-Bit Server VM 18.9 (build 11.0.2+9-LTS, mixed mode)
```

Nếu bạn chưa cài đặt Java, tham khảo link [tại đây](https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-on-ubuntu-18-04) 

## Bước 2: Cài đặt Solr
Tham khảo http://www-eu.apache.org/dist/lucene/solr/ để chọn phiên bản cài đặt. 
Ví dụ: phiên bản 7.5.0

`$ cd /opt`

`$ wget http://www-eu.apache.org/dist/lucene/solr/7.5.0/solr-7.5.0.tgz`

Sau khi file nén tải xuống thành công, giải nén và thực hiên cài đặt theo lệnh sau: 

`$ tar xzf solr-7.5.0.tgz solr-7.5.0/bin/install_solr_service.sh --strip-components=2`

`$ sudo bash ./install_solr_service.sh solr-7.5.0.tgz`

Kết quả mẫu: 

```
id: 'solr': no such user
Creating new user: solr
Adding system user `solr' (UID 111) ...
Adding new group `solr' (GID 116) ...
Adding new user `solr' (UID 111) with group `solr' ...
Creating home directory `/var/solr' ...

Extracting /home/vagrant/solr-7.5.0.tgz to /opt

Installing symlink /opt/solr -> /opt/solr-7.5.0 ...

Installing /etc/init.d/solr script ...

Installing /etc/default/solr.in.sh ...

Service solr installed.
Customize Solr startup configuration in /etc/default/solr.in.sh
```

Chạy lệnh sau để kiểm tra trạng thái: 

`$ systemctl status solr.service`

Kết quả: 

```
● solr.service - LSB: Controls Apache Solr as a Service
   Loaded: loaded (/etc/init.d/solr; generated)
   Active: active (exited) since Mon 2019-07-15 20:31:27 +07; 1h 7min ago
     Docs: man:systemd-sysv-generator(8)
  Process: 972 ExecStart=/etc/init.d/solr start (code=exited, status=0/SUCCESS)

Thg 7 15 20:30:32 minhhuyen systemd[1]: Starting LSB: Controls Apache Solr as a Service...
Thg 7 15 20:30:35 minhhuyen su[984]: Successful su for solr by root
Thg 7 15 20:30:35 minhhuyen su[984]: + ??? root:solr
Thg 7 15 20:30:35 minhhuyen su[984]: pam_unix(su:session): session opened for user solr by (uid=0)
Thg 7 15 20:31:26 minhhuyen solr[972]: [914B blob data]
Thg 7 15 20:31:26 minhhuyen solr[972]: Started Solr server on port 8983 (pid=1706). Happy searching!
Thg 7 15 20:31:27 minhhuyen solr[972]: [14B blob data]
Thg 7 15 20:31:27 minhhuyen systemd[1]: Started LSB: Controls Apache Solr as a Service.
```

## Bước 3: Khởi động/Dừng Solr
Solr được cấu hình như một dịch vụ trên hệ thống của bạn. Bạn chỉ cần sử dụng các lệnh sau để khỏi động, dừng và kiểm tra trạng thái dịch vụ Solr.

```
$ sudo service solr stop
$ sudo service solr start
$ sudo service solr status
```

## Bước 4: Truy cập Solr Dashboard
Mặc định, Solr sẽ chạy với **cổng 8983**. 
* Nếu cổng đó đã bị sử dụng trên máy cảu bạn, truy cập [link này](http://deeplearning.lipingyang.org/2017/05/07/change-the-default-port-for-apache-solr-on-ubuntu-16-04/) để thay đổi cổng cho Solr.
* Nếu bạn dùng UFW firewall, dùng lệnh: 

`$ sudo ufw allow 8983`

**Đường dẫn truy cập Solr Dashboard**: `http://<IP|Hostname>:8983`
![](https://images.viblo.asia/479fd2ef-9267-4fc0-9559-5c1236cdbf1c.png)

## Bước 5: Tạo Solr Collection (core)
Sau khi cài đặt thành công, hãy tạo Solr Collection. Đây là nơi lưu trữ dữ liệu của bạn.

`$ sudo su - solr -c "/opt/solr/bin/solr create -c collection1 -n data_driven_schema_configs"`

Kết quả mẫu: 

```
INFO  - 2019-04-25 22:37:32.110; org.apache.solr.util.configuration.SSLCredentialProviderFactory; Processing SSL Credential Provider chain: env;sysprop

Created new core 'collection1'
```

Bạn cũng có thể tạo collection trên giao diện Solr Dashboard. Trên giao diện này, bạn có thể nạp dữ liệu, thử tìm kiếm với dữ liệu trong Colletion.
Ví dụ: Tìm kiếm các bản ghi với "title" chứa từ "nam":
![](https://images.viblo.asia/49174518-d143-42e1-9a82-2d068551b543.png)

# Tác dụng của Solr Service
* Khả năng tìm kiếm toàn văn bản, xếp hạng kết quả tìm kiếm, highlighting kết quả
* Dễ dàng chỉnh sửa để hiệu năng tốt hơn, cấu hình đơn giản
* Xử lý được nhiều kiểu tài liệu (XML, Json, ...)
* Quản lý dưới giao diện HTML đơn giản
* Cho phép mở dộng hệ thống dễ dàng với lượng dễ liệu lớn.
* Hỗ trợ tinh chỉnh kết quả tìm kiếm, bằng các thông tin bạn cung cấp (trọng số các trường, số lượt xem, ...)
* ... và nhiều hơn nữa.

# Tổng kết
Solr chạy như một máy chủ tìm kiếm toàn văn bản độc lập. Nó sử dụng thư viện tìm kiếm Lucene Java làm cốt lõi để lập chỉ mục và tìm kiếm toàn văn bản và có thể sử dụng được từ hầu hết các ngôn ngữ lập trình phổ biến. Cấu hình bên ngoài của Solr cho phép nó được điều chỉnh theo nhiều loại ứng dụng mà không cần mã hóa Java và nó có kiến trúc plugin để hỗ trợ tùy chỉnh nâng cao hơn.

Ngoài mục đích tìm kiếm, Solr cũng có thể được sử dụng cho mục đích lưu trữ. Giống như các cơ sở dữ liệu NoQuery khác, nó là một công nghệ lưu trữ và xử lý dữ liệu.

### Tài liệu:
https://en.wikipedia.org/wiki/Apache_Solr
https://computingforgeeks.com/install-latest-apache-solr-on-ubuntu-debian/
https://www.tutorialspoint.com/apache_solr/apache_solr_overview