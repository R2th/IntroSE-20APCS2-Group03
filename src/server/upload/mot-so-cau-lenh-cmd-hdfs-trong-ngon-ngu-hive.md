Xin chào mọi người, hôm nay mình sẽ chia sẻ một bài viết về ngôn ngữ Hive, đối với một số người chắc không phải là ngôn ngữ lập trình mới tuy nhiên đối với mình nó mới hoàn toàn =))). Vì vậy bài viết này mục đích để chia sẻ cũng như noted lại những kiến thức mình tự học được.  Hive được dùng khá phổ biến khi bạn muốn học về Hadoop hay Spark nói riêng cũng như Bigdata nói chung. 

Trong bài viết này mình sẽ hướng dẫn cài đặt Hive cũng như hướng dẫn sử dụng một số câu lệnh cmd để làm việc với ngôn ngữ này.  

# Install Hive
Để có thể cài đặt được Hive thì việc đầu tiên chúng ta cần làm là phải cài Hadoop trước nhé :D.[ Các bạn cài hadoop dựa theo link này nhé.](https://phoenixnap.com/kb/install-hadoop-ubuntu). Nếu mọi người cài bị vướng mắc ở đâu có thể cmt ở dưới bài cho mình biết nhé. 

OK! Bắt tay vào cài Hive thôi nào :D. Tham khảo [tại đây](https://phoenixnap.com/kb/install-hive-on-ubuntu)

Download Hive 

```
wget https://downloads.apache.org/hive/hive-3.1.2/apache-hive-3.1.2-bin.tar.gz
tar xzf apache-hive-3.1.2-bin.tar.gz
```

Configure Hive environment
```
sudo nano .bashrc
```
```
export HIVE_HOME= “home/hdoop/apache-hive-3.1.2-bin”
export PATH=$PATH:$HIVE_HOME/bin
```
```
source ~/.bashrc
```

Edit file hive-config.sh 
```
sudo nano $HIVE_HOME/bin/hive-config.sh
```
![](https://images.viblo.asia/7457b908-9ee0-440b-a996-4b3ea4075f79.jpg)

thêm dòng `export HADOOP_HOME=/home/hdoop/hadoop-3.2.1` vào file hive-config.sh  sau đó lưu lại 

Tạo Directories trong HDFS 
```
hdfs dfs -mkdir /tmp
hdfs dfs -chmod g+w /tmp
hdfs dfs -ls /
```
![](https://images.viblo.asia/6860d415-c31f-4843-a0a3-2d8e0914f30c.jpg)
Hình 2: Tạo Directories tmp trong HDFS 

```
hdfs dfs -mkdir -p /user/hive/warehouse
hdfs dfs -chmod g+w /user/hive/warehouse
hdfs dfs -ls /user/hive
```
![](https://images.viblo.asia/f91711be-ea5c-45b6-a299-8d784236c22f.jpg)
Hình 3: tạo directories warehouse

Configure hive-site.xml file 

```
cd $HIVE_HOME/conf

```
Mọi người tải và thêm file [hive-site.xml](https://drive.google.com/file/d/1000BDuQ3s3BVzJ2JQXy84mS0H33xVCtk/view?usp=sharing) này vào folder này nhé .

Khởi tạo cơ sở dữ liệu Derby
```
$HIVE_HOME/bin/schematool –initSchema –dbType derby
```
![](https://images.viblo.asia/7b9f3bb2-3559-47b2-a073-56c3b4147181.jpg)
Hình4: Khởi tạo cơ sở dữ liệu Derby

Bao giờ kết quả ra như hình 4 là xong nhé. 

Fix guava error

```
ls $HIVE_HOME/lib
ls $HADOOP_HOME/share/hadoop/hdfs/lib
rm $HIVE_HOME/lib/guava-19.0.jar
cp $HADOOP_HOME/share/hadoop/hdfs/lib/guava-27.0-jre.jar $HIVE_HOME/lib/
$HIVE_HOME/bin/schematool –initSchema –dbType derby
```
```
cd $HIVE_HOME/bin
```
```
hive
```
![](https://images.viblo.asia/4af9fedd-0780-40ec-b136-6e7f066c280f.jpg)
Hình5: hive interface

Vậy là đã cài xong hive rồi nhé mọi người. Tiếp theo cùng bước sang phần câu lệnh cmd trong ngôn ngữ Hive này nhé. Khi mọi người cài mà gặp lỗi gì có thể chụp màn hình lại rồi cmt bên dưới nhé ^^. 

# Câu lệnh cmd HDFS
HDFS là viết tắt của Hadoop Distributed File System, là 1 hệ thống lưu trữ chính được dùng bởi Hadoop. Ban đầu mình cài xong Hive thì khá là hào hứng vậy là vào thử query hay là tạo database các kiểu. Tuy nhiên dữ liệu muốn sử dụng được thì phải đẩy vào local của hdfs, mình cảm thấy khá là phiền phức. Vậy là phải bắt tay vào học thêm mấy câu lệnh cmd của hdfs để phục vụ cho việc thêm dữ liệu, bla bla. Thực chất ban đầu học mình cũng tưởng nó cao siêu lắm, tuy nhiên sau khi học rồi mình cũng thấy nó kha khá giống với một số câu lệnh khi sử dụng với hệ điều hành Linux. Sau đây mình sẽ giới thiệu một số câu lệnh đơn giản và hay dùng nhất :D. 
## help
Nếu bạn muốn xem sự trợ giúp hoặc thông tin về common line trong HDFS bạn có thể sử dụng 2 lệnh sau
```
hdfs dfs -help
hdfs dfs -usage <utility_name> 
```

## mkdir
Tiếp tục tương tự như câu lệnh cmd trong Linux thì để tạo folder trong HDFS chúng ta sử dụng dòng cmd như dưới đây: 

```
hdfs dfs -mkdir /newfolder
```
Ví dụ như khi bạn lo lắng rằng thư mục bạn vừa tạo đã tồn tại thì bạn có thể sử dụng thêm: 

```
hdfs dfs -mkdir -p /newfolder
```

Với câu lệnh này thì bạn có thể tạo được thư mục ngay cả khi nó đã tồn tại rồi.
## ls
Và sau đó sử dụng **ls** để check xem đã tạo xong thư mục chưa? 

```
hdfs dfs -ls /
```
![](https://images.viblo.asia/5519c278-b450-410a-ad25-45b4dc142920.png)
Hình 6: check xem đã tạo xong thư mục chưa

Như ở hình 6 thì có thể thấy rằng thư mực mới đã được tạo xong rồi :D. Còn khi muốn show ra hết các file hay thư mục con chứa trong hdfs thì bạn chỉ cần thêm **-R** như hình 7: 

```
hdfs dfs -ls -R /
```
![](https://images.viblo.asia/50340a51-f90b-412c-954d-9adca780e9f0.png)
Hình 7: check tất cả các file trong hdfs

## put
Sử dụng khi muốn copy một file từ local vào thư mục của hdfs. Ví dụ mình muốn copy một file test.txt vào, tuy nhiên sẽ tạo file test.txt ở bên ngoài local trc nhé

```
hdfs dfs -put ~/test.txt /newfolder/
```
Sau khi đã copy xong thì thử check xem file test.txt đã thật sự tông tại trong thư mục chưa. 
![](https://images.viblo.asia/9208c58e-d69b-4f84-b17d-96723d21edca.png)
Hình8: check file test.txt 

## copyFromLocal
Cmd này tương tự như **put** ở bên trên. 
```
hdfs dfs -copyFromLocal  ~/test.txt /newfolder/
```
Sau khi thực hiện lệnh này xong kết qủa tương tự như hình 8 :D 
## get
Ở trên chúng ta đã copy từ local vào hdfs thì với câu lệnh **get** chúng ta sẽ lấy được file từ hdfs về local. 

```
hdfs dfs -get /newfolder/test.txt /copyfromhdfs/
```
Kết quả sẽ thu được như hình 9 dưới đây 
![](https://images.viblo.asia/954d1aa2-a492-459b-9df0-5d51aec21b1f.png)
Hình 9: câu lệnh get 
## copyToLocal
Tương tự như ở trên chúng ta có **copyFromLocal** thì ở đây cũng có **copyToLocal**, câu lệnh này giống với **get** ở bên trên. 
```
hdfs dfs -copyToLocal /newfolder/test.txt /copyfromhdfs/
```
Kết quả cũng sẽ thu được như hình 9 
## cat
Giống như trong cmd của linux **cat** ở hdfs cũng để show xem content ở trong file 
```
 hdfs dfs -cat /newfolder/test.txt
```
## mv
**mv** dùng để chuyển file hoặc cả thư mục từ thư mục này sang thư mục khác. Như ở hình 10 dưới đây mình đã chuyển thư mục **newfolder** sang thư mục **DR**
![](https://images.viblo.asia/67bc353c-358b-4353-b23e-d090c5e76e5e.png)
Hình 10: câu lệnh mv

## cp
**cp** dùng để copy từ thư mục này sang thư mục khác ở trong hdfs 
```
hdfs dfs -cp /DR/newfolder/test.txt /DR
```
![](https://images.viblo.asia/4e4410ff-875a-4222-b3c6-8935ee1d06af.png)
Hình 11: câu lệnh cp 

## rm 
**rm** để xóa file trong hdfs như hình 12 dưới đây. 
```
hdfs dfs -rm /DR/test.txt
```
![](https://images.viblo.asia/cbd38292-2165-4b73-beda-01ed520c6908.png)
Hình 12: câu lệnh rm 

Những câu lệnh trên đây là những câu lệnh cơ bản trong hdfs nó khá là giống với câu lệnh cmd trong linux :D. Nếu mọi người muốn tìm hiểu sâu hơn về HDFS thì tìm hiểu [ở đây nhé](https://data-flair.training/blogs/hadoop-hdfs-tutorial/). Còn nếu muốn tìm hiểu thêm nhiều câu lệnh cmd khác thì xem thêm [ở đây](https://data-flair.training/blogs/hadoop-hdfs-commands/). 
# Kết Luận 
Như vậy ở trên mình đã hướng dẫn một số câu lệnh cmd cơ bản của hdfs để việc sử dụng ngôn ngữ Hive nói riêng cũng như Hadoop nói chung một cách đơn giản và dễ dàng hơn rồi. Cảm ơn mọi người đã đọc đến đây, và đừng quên **Upvoted** cho mình nhé. Hẹn gặp lại mọi người các bài tiếp theo của mình. 
# Reference 
https://data-flair.training/blogs/top-hadoop-hdfs-commands-tutorial/

https://www.coursera.org/learn/big-data-essentials/lecture/xgbJQ/hdfs-client