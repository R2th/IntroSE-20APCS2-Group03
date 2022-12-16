## Install Cassandra

### Chuẩn bị môi trường

Môi trường chuẩn bị trong bài viết này là trên Windows. Do Cassandra có nền tảng là Java nên cũng hoạt động tương tự trên các OS khác như Mac, Linux
* Windows 10 Pro
* JDK 8u181 64bit
* Eclipse 4.8.0

### Download Cassandra

Trong bài viết này sử dụng version mới nhất hiện tại là Cassandraha 3.11.2. Download từ link sau:

The Apache Cassandra Project

URL：http://cassandra.apache.org/download/

Vào page trên, và download apache-cassandra-3.11.2-bin.tar.gz. Thực hiện giải nén và mở thư mục bên trong:

C:¥cassandra¥apache-cassandra-3.11.2

### Cấu trúc thư mục của Cassandra

Khi mở thư mục Cassandra sẽ có cấu trúc thư mục như sau:

Hình 1: Cấu trúc thư mục Cassandra
![](https://images.viblo.asia/4554d779-148a-4549-9fa6-287a177010ec.PNG)

Lần này, chúng ta sẽ tập trung vào các nội dung trong bin và conf.

- bin: Nơi chứa các shell run Cassandra và tool quản lý của Cassandra

- conf: Nơi chứa file confict Cassandra và logging confict.

### Setting CASSANDRA_HOME

Để khởi động được Cassandra cần setting các mục sau:

```
CASSANDRA_HOME	Nơi install Cassandra	Default: Thư mục hiện tại
CASSANDRA_CONF	Nơi chứa file confict của Cassandra	Default: %CASSANDRA_HOME%\conf
CASSANDRA_MAIN	Code sử dụng để khởi động Cassandra	Default: org.apache.cassandra.thrift.CassandraDaemon
```

Đối với các mục setting khác, vẫn có thể sử dụng nguyên giá trị đang được setting default. 

Tuy nhiên, để tránh nhầm lẫn không đáng thì hãy setting CASSANDRA_HOME.

### Setting nơi output data và commit log

Tiếp theo, setting nơi output data và commit log khi chạy Cassandra.
Nơi output data và commit log được setting bằng storage-conf.xml là file setting của Cassandra. 
Nếu chỉ mở mình file nén, thì tất cả file setting chỉ ở dạng read only, nên cần phải giải nén riêng.
File setting Cassandra default là đặt ở:

`%CASSANDRA_HOME%\conf`

Trong file storage-conf.xml có mô tả rất nhiều nhưng chỉ cần chỉnh sửa 2 điểm sau đây:

```
  <CommitLogDirectory>/var/lib/cassandra/commitlog</CommitLogDirectory>
  <DataFileDirectories>
      <DataFileDirectory>/var/lib/cassandra/data</DataFileDirectory>
  </DataFileDirectories>
```

Đối với phần này, thì setting như sau:

```
  <CommitLogDirectory>C:\cassandra\commitlog</CommitLogDirectory>
  <DataFileDirectories>
      <DataFileDirectory>C:\cassandra\data</DataFileDirectory>
  </DataFileDirectories>
```

Để có thể khởi động dùng cho việc coding thì chỉ cần setting storage-conf.xml như trên là được.

### Thay đổi nơi output log của hệ thống

Thay đổi nơi output log của hệ thống như sau:
Cassandra sử dụng log4j nên thay đổi như sau:

`%CASSANDRA_HOME%\conf\log4j.properties`

Việc thay đổi chỉ cần đổi mình nơi output log:

```
# Edit the next line to point to your logs directory
log4j.appender.R.File=C:\\cassandra\\log\\system.log
```

Cassandra sử dụng tất cả là 3 port:
1. Thrift RPC port: 9160
2. Port kết nối bằng JMX: 8080
3. Port communication của nhiều node Cassandra: 7000

Trong các port này, thì 2 cái sau sử dụng để giao tiếp với bên phía client:
* Port nhận request từ client (9160)
* Port JMX kết nối để get thông tin nội bộ của nodet Cassandra (8080)
Port nào cũng không phải là cố định, nên có thể thay đổi dựa theo chỉnh sửa của file confict và file khởi động.

### Chỉnh sửa file bat

Chỉnh sửa file bat để khởi động Cassandra.
Sử dụng cassandra.bat để khởi động Cassandra. Tuy nhiên, file bat của Cassandra đang setting JMX là port 8080.
Nên cần đổi thành port thích hợp hơn.
Thay đổi phần sau của Cassandra.bat, trong bài viết này là sửa thành 9081.

```
set JAVA_OPTS=^
 -ea^
 -Xdebug^
 -Xrunjdwp:transport=dt_socket,server=y,address=8888,suspend=n^
 -Xms128m^
 -Xmx1G^
 -XX:TargetSurvivorRatio=90^
 -XX:+AggressiveOpts^
 -XX:+UseParNewGC^
 -XX:+UseConcMarkSweepGC^
 -XX:+CMSParallelRemarkEnabled^
 -XX:+HeapDumpOnOutOfMemoryError^
 -XX:SurvivorRatio=128^
 -XX:MaxTenuringThreshold=0^ -Dcom.sun.management.jmxremote.port=8080^
 -Dcom.sun.management.jmxremote.ssl=false^
 -Dcom.sun.management.jmxremote.authenticate=false
```
 
### Khởi động và sử dụng Cassandra

Chạy với command line %CASSANDRA_HOME%\bin\cassandra.bat
Log ghi việc khởi động sẽ có dạng như sau:

```
C:\cassandra\apache-cassandra-3.11.2>bin\cassandra.bat
Starting Cassandra Server
Listening for transport dt_socket at address: 8888
 INFO 16:12:38,171 Auto DiskAccessMode determined to be standard
 INFO 16:12:38,625 Saved Token not found. Using 12130970972828844347523289220179262978
 INFO 16:12:38,625 Saved ClusterName not found. Using Test Cluster
 INFO 16:12:38,656 Creating new commitlog segment C:\cassandra\commitlog\CommitLog-1271747558656.log
 INFO 16:12:38,812 Starting up server gossip
 INFO 16:12:39,000 Binding thrift service to localhost/127.0.0.1:9160
 INFO 16:12:39,015 Cassandra starting up...
```

Cassandra có tool command line, nên có thể confirm hoạt động bằng tool này.
Sau đây là khời động bằng cách run %CASSANDRA_HOME%\bin\cassandra-cli.bat.

```
C:\cassandra\apache-cassandra-3.11.2>bin\cassandra-cli.bat
Starting Cassandra Client
Welcome to cassandra CLI.

Type 'help' or '?' for help. Type 'quit' or 'exit' to quit.
cassandra>
```

Trước tiên gõ command connect để kết nối tới server Cassandra

```
cassandra> connect localhost/9160
Connected to: "Test Cluster" on localhost/9160
```

Thực hiện access vào thông tin setting keyspace đang dùng để set default của Cassandra. 

```
cassandra> describe keyspace Keyspace1
Keyspace1.Super1
Column Family Type: Super
Columns Sorted By: org.apache.cassandra.db.marshal.BytesType@66e8c7db

Column Family Type: Super
Column Sorted By: org.apache.cassandra.db.marshal.BytesType
flush period: null minutes
```

Có thể lấy được thông tin cấu trúc data đã định nghĩa ở các key space.
Thử insert và get data đơn giản vào Cassandra. Insert data với định dạng như sau:

`set keyspace.column family name[key name][column name]=value`

Khi lấy data ra, có thể lấy các giá trị theo định dạng sau:

`get keyspace.column family name[key name]`

Trong ví dụ sau, đối với hàng shot, setting giá trị và insert data 「⁠firstname」「⁠lastname」「⁠twitter」, lấy ra column bằng get.

```
cassandra> set Keyspace1.Standard2['shot']['firstname']='Test'
Value inserted.
cassandra> set Keyspace1.Standard2['shot']['lastname']='Name'
Value inserted.
cassandra> set Keyspace1.Standard2['shot']['twitter']='http://twitter.com/shot6'
Value inserted.
cassandra> get Keyspace1.Standard2['shot']
=> (column=twitter, value=http://twitter.com/shot6, timestamp=1271173345860000)
=> (column=lastname, value=Name, timestamp=1271173320777000)
=> (column=firstname, value=Test, timestamp=1271173297104000)
Returned 3 results.
```

### Close Cassandra
Để close Cassandra trên Windows bằng console đang run Cassandra, click Ctrl+C để stop.