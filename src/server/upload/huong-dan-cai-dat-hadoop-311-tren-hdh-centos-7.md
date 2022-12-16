## **Cài đặt Hadoop 3.1.1 single node cluster trên HĐH Centos 7**
### Bước 1. Download và giải nén Hadoop:
```
tar -xvf hadoop-3.1.1.tar.gz
cd hadoop-3.1.1
```
### Bước 2. Tạo thư mục data cho hadoop
```
mkdir data
cd data
mkdir namenode
mkdir datanote
```
### Bước 3. Cài JDK cho Centos:
`sudo yum install java-1.8.0-openjdk-devel.x86_64`
### Bước 4. Cấu hình cho Hadoop:
**4.1. Di chuyển đến thư mục chưa các file configuration của Hadoop**
```
cd ..
cd etc/hadoop
```
**4.2. Thêm cấu hình cho file "core-site.xml":**
- Sử dụng lệnh: `gedit core-site.xml`
- Thêm vào cấu hình sau:
```
<configuration>
	<property>
		<name>fs.default.name</name>
		<value>hdfs://localhost:9000</value>
	</property>
</configuration>
```

**4.3. Thêm cấu hình cho file "hdfs-site.xml":**
- Sử dụng lệnh: `gedit hdfs-site.xml`
- Thêm vào cấu hình sau:
```
<configuration>
	<property>
		<name>dfs.replication</name>
		<value>1</value>
	</property>
	<property>
		<name>dfs.permission</name>
		<value>false</value>
	</property>
	<property>
		<name>dfs.namenode.name.dir</name>
		<value>/home/Downloads/hadoop-3.1.1/data/namenode</value>
	</property>
	<property>
		<name>dfs.datanode.data.dir</name>
		<value>/home/Downloads/hadoop-3.1.1/data/datanode</value>
	</property>
</configuration>
```
**4.4. Thêm cấu hình cho file "mapred-site.xml":**
- Sử dụng lệnh:
```
cp mapred-site.xml.template mapred-site.xml
gedit mapred-site.xml
```
- Thêm vào cấu hình sau:
```
<configuration>
	<property>
		<name>mapreduce.framework.name</name>
		<value>yarn</value>
	</property>
    <property>
        <name>mapreduce.application.classpath</name>
        <value>$HADOOP_MAPRED_HOME/share/hadoop/mapreduce/*:$HADOOP_MAPRED_HOME/share/hadoop/mapreduce/lib/*</value>
    </property>
	<property>
		<name>mapreduce.map.memory.mb</name>
		<value>2048</value>
	</property> 
	<property>
		<name>mapreduce.reduce.memory.mb</name>
		<value>4096</value>
	</property> 
	   <property>
		<name>mapreduce.map.java.opts</name>
		<value>-Xmx1024m</value>
	</property> 
	<property>
		<name>mapreduce.reduce.java.opts</name>
		<value>-Xmx3072m</value>
	</property>
</configuration>
```

**4.5. Thêm cấu hình cho file "yarn-site.xml":**
- Sử dụng lệnh: `gedit yarn-site.xml`
- Thêm vào cấu hình sau:
```
<configuration>
	<property>
		<name>yarn.nodemanager.aux-services</name>
		<value>mapreduce_shuffle</value>
	</property>
	<property>
		<name>yarn.nodemanager.auxservices.mapreduce.shuffle.class</name>
		<value>org.apache.hadoop.mapred.ShuffleHandler</value>
	</property>
	<property>
		<name>yarn.nodemanager.env-whitelist</name>	<value>JAVA_HOME,HADOOP_COMMON_HOME,HADOOP_HDFS_HOME,HADOOP_CONF_DIR,CLASSPATH_PREPEND_DISTCACHE,HADOOP_YARN_HOME,HADOOP_MAPRED_HOME</value>
    </property>
</configuration>
```
### Bước 5. Thêm các biến tài nguyên cho hệ điều hành:
- Sử dụng lệnh: `gedit .bashrc`
- Thêm vào nội dung sau:
```
# Set Hadoop-related environment variables
export HADOOP_HOME=$HOME/Downloads/hadoop-3.1.1
export HADOOP_CONF_DIR=$HADOOP_HOME/etc/hadoop
export HADOOP_MAPRED_HOME=$HADOOP_HOME
export HADOOP_COMMON_HOME=$HADOOP_HOME
export HADOOP_HDFS_HOME=$HADOOP_HOME
export HADOOP_YARN_HOME=$HADOOP_HOME
export YARN_HOME=$HADOOP_HOME
export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_HOME/lib/native
export HADOOP_INSTALL=$HADOOP_HOME
export HADOOP_CLASSPATH=$HADOOP_CLASSPATH:$HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-examples-3.1.1.jar
export HADOOP_OPTS="$HADOOP_OPTS -Djava.library.path=$HADOOP_HOME/lib/native"
export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin
# Set JAVA_HOME
export JAVA_HOME=/usr/lib/jvm/jre-1.8.0-openjdk-1.8.0.181-3.b13.el7_5.x86_64
export PATH=$PATH:$JAVA_HOME:$JAVA_HOME/bin
# Add Hadoop bin/ directory to PATH
export HADOOP_PID_DIR=$HADOOP_HOME/data/pid
```

- Lưu và thoát file, sau đó gõ lệnh sau để áp dụng thay đổi: `source .bashrc`
### Bước 6. Định dạng lại thư mục namenode theo hệ thống file HDFS
- Sử dụng lệnh:
```
cd ~
hdfs namenode -format
```
### Bước 7. Khởi động hệ thống Hadoop:
```
cd /Downloads/hadoop-3.1.1/sbin
./start-all.sh
```
* Nếu gặp lỗi: "**Permission denied (publickey,password,keyboard-interactive).**"
Chạy các lệnh sau để khắc phục: 
```
ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 0600 ~/.ssh/authorized_keys
```

* Chạy lệnh sau để kiểm tra các tiến trình java đang chạy: `jps`
### Bước 8. Link web quản lý hệ thống Hadoop:
* Resource Manager:  				http://localhost:8088
* Web UI of the NameNode daemon:	http://localhost:9870
* Web UI of the DataNode daemon:	http://localhost:9864
* HDFS NameNode web interface:  	http://localhost:8042

### Bước 9. Thao tác với hệ thống file HDFS:
* Tạo thư mục input cho hadoop:
`hdfs dfs -mkdir -p <path_dir>`
* Upload file dữ liệu vào thư mục input của Hadoop
`hdfs dfs -put <file_path> <upload_hdfs_path>`
* Kiểm tra file đã upload bằng lệnh hiển thị file HDFS:
`hdfs dfs -ls <HDFS_Path>`
* Xóa 1 file hoặc thư mục khỏi hệ thống file HDFS:
`hdfs dfs -rm rf <path_dir_hdfs>`
* Tải file từ hệ thống file HDFS về máy:
`hdfs dfs -get <path_dir_hdfs> <path_local_pc>`