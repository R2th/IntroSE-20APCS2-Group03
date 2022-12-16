# Mở đầu
Với mỗi lần thực thi chịu tải 10.000 request/giây khi chạy mỗi jmeter single unit thì không thể test được khả năng chịu tải cho nên tôi giới thiệu đến các bạn cách test bằng Jmeter cấu hình Cluster
Tham khảo nội dung sau để biết cách chạy test Jmeter local, còn việc tạo file jmeter cơ bản thì không đề cập ở bài viết này.
 [Test Jmeter trên môi trường local](https://qiita.com/sh_tomiyama/private/3f62792fff4c0d4843f8)
 [Basic về test chịu tải](https://qiita.com/sh_tomiyama/private/fea183c3564e7df11b9e)

# Overview về cấu hình Cluster
Chạy với cơ sở hạ tầng gồm master server, slave server (nhiều máy).
Mình sẽ đặt file setting lên Master server rồi cho chạy, Slave server sẽ tổng hợp log kết quả v.v.. lên cho Master server. Cho nên bên SLave server chỉ cần khởi động Jmeter là được.

# Setup Master server
chú yếu thì có
1. install jmeter
2. giải nén
3. setting Slave server

### Install jmeter
tại /home/ec2-user

```bash

$ sudo yum update -y
$ wget http://ftp.riken.jp/net/apache//jmeter/binaries/apache-jmeter-5.1.1
```

### Giải nén

```bash

$ tar zxvf apache-jmeter-5.1.1.tgz
```

### Setting Slave server
Chỉnh sửa property.
đi đến mục bin trong apache-jmeter-5.1.1, mở property bằng vim, nhập DNS name của Slave server vào ô ghi remote host.
Lưu ý chỗ này nếu nhập IP address thì sẽ bị báo error nên phải nhập đúng giá trị nhé các bạn :v:.
Nếu muốn thiết lập nhiều Slave server thì ghi cách nhau bằng dấu phảy , là được.

```bash

cd apache-jmeter-5.1.1/bin/
sudo vim jmeter.properties
```

```vim

remote_hosts=ec2-aa-aa-aa-aa.ap-northeast-1.compute.amazonaws.com
```

# Setup Slaver server
1. install jmeter
2. giải nén
3. khởi động Jmeter

### Khởi động jmeter
check đảm bảo là chưa được khởi động trước khi check process:

```bash

$ ps -aux | grep jemter
ec2-user 14418  0.0  0.0 119468   896 pts/1    S+   11:36   0:00 grep --color=auto jemter
```


Khởi động:

```bash

/home/ec2-user/apache-jmeter-5.1.1/bin/jmeter-server &
```

check lại process để thấy jmeter đã được khởi động.

```bash 
$ ps -aux | grep jmeter
ec2-user  4324  0.0  0.0 119928  2856 pts/0    S    11:43   0:00 /bin/sh /home/ec2-user/apache-jmeter-5.1.1/bin/jmeter-server
ec2-user  4326  0.0  0.0 119928  2892 pts/0    S    11:43   0:00 /bin/sh /home/ec2-user/apache-jmeter-5.1.1/bin/jmeter -Dserver_port=1099 -s -j jmeter-server.log
ec2-user  4354  0.4  2.0 7934128 158084 pts/0  Sl   11:43   0:02 /usr/bin/java -server -XX:+HeapDumpOnOutOfMemoryError -Xms4g -Xmx4g -XX:MaxMetaspaceSize=256m -XX:+UseG1GC -XX:MaxGCPauseMillis=100 -XX:G1ReservePercent=20 -Djava.security.egd=file:/dev/urandom -Duser.language=en -Duser.region=EN -jar /home/ec2-user/apache-jmeter-5.1.1/bin/ApacheJMeter.jar -Dserver_port=1099 -s -j jmeter-server.log
```

# Test chịu tải
Khi Jmeter được Slave server khởi động thành công thì sẽ chuyển sang trạng thái chờ lệnh từ bên Master Server cho nên lúc này sẽ thực hiện test chịu tải.
Để check process lần này nên lúc nãy sau command ```/home/ec2-user/apache-jmeter-5.1.1/bin/jmeter-server &``` tôi đã cho cancel rồi, cơ mà bình thường thì cứ để cho nó được khởi động luôn vậy.

chỗ này cần phải sudo.
Command khởi động là ```/home/ec2-user/apache-jmeter-5.1.1/bin/jmeter```, -n là khởi đọng bằng CUI mode, -t là option chỉ định file setting.
Ngoài ra, file setting thì bắt buộc phải chỉ định bằng path tuyệt đối.

```bash

$ sudo su
$ /home/ec2-user/apache-jmeter-5.1.1/bin/jmeter -n -t /home/ec2-user/test.jmx -r
Creating summariser <summary>
Created the tree successfully using /home/ec2-user/test.jmx
Configuring remote engine: ec2-aa-aa-aa-aa.ap-northeast-1.compute.amazonaws.com
Exception creating connection to: ec2-aa-aa-aa-aa.ap.ap-northeast-1.compute.amazonaws.com; nested exception is:
        java.io.FileNotFoundException: rmi_keystore.jks (No such file or directory)
Failed to configure ec2-aa-aa-aa-aa.ap.ap-northeast-1.compute.amazonaws.com
Stopping remote engines
Remote engines have been stopped
Error in NonGUIDriver java.lang.RuntimeException: Following remote engines could not be configured:[ec2-aa-aa-aa-aa.ap.ap-northeast-1.compute.amazonaws.com]

```

Thi thoảng sẽ có xuất hiện Error in NonGUIDriver java.lang.RuntimeException, trường hợp này là có vấn đề gì đó đã xảy ra bên Slaver server, chỉ cần khởi động lại Jmeter là được.
Nếu không thể reboot được thì kill luôn process đi, kill process dưới cùng trong 3 process.

```bash

$ ps -aux | grep jmeter
ec2-user  4324  0.0  0.0 119928  2856 pts/0    S    11:43   0:00 /bin/sh /home/ec2-user/apache-jmeter-5.1.1/bin/jmeter-server
ec2-user  4326  0.0  0.0 119928  2892 pts/0    S    11:43   0:00 /bin/sh /home/ec2-user/apache-jmeter-5.1.1/bin/jmeter -Dserver_port=1099 -s -j jmeter-server.log
ec2-user  4354  0.4  2.0 7934128 158084 pts/0  Sl   11:43   0:02 /usr/bin/java -server -XX:+HeapDumpOnOutOfMemoryError -Xms4g -Xmx4g -XX:MaxMetaspaceSize=256m -XX:+UseG1GC -XX:MaxGCPauseMillis=100 -XX:G1ReservePercent=20 -Djava.security.egd=file:/dev/urandom -Duser.language=en -Duser.region=EN -jar /home/ec2-user/apache-jmeter-5.1.1/bin/ApacheJMeter.jar -Dserver_port=1099 -s -j jmeter-server.log
$ kill 4354
$ ps -aux | grep jmeter
ec2-user  4476  0.0  0.0 119468   976 pts/0    S+   11:59   0:00 grep --color=auto jmeter
[1]+  Exit 143                /home/ec2-user/apache-jmeter-5.1.1/bin/jmeter-server
```

Sau đó khởi động lại

```bash

$ /home/ec2-user/apache-jmeter-5.1.1/bin/jmeter-server &
```

Quay lại Master server, chạy lại

```bash

$ /home/ec2-user/apache-jmeter-5.1.1/bin/jmeter -n -t imp-test.jmx -r
Creating summariser <summary>
Created the tree successfully using imp-test.jmx
Configuring remote engine: ec2-aa-aa-aa-aa.ap-northeast-1.compute.amazonaws.com
Starting remote engines
Starting the test @ Fri Sep 13 12:07:54 UTC 2019 (1568376474892)
Remote engines have been started
Waiting for possible Shutdown/StopTestNow/HeapDump/ThreadDump message on port 4445
```

Đến đây có show **Waiting for** thì là việc test chịu tải đã thành công!!!

# Refer
 [Dùng SpotInstance và JMeter để test chịu tải 4.000.000 req/min](https://dev.classmethod.jp/cloud/apache-jmeter-master-slave-100mil-req-min/)