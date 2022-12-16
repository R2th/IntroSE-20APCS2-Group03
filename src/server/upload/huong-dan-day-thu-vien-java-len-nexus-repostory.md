Tiếp theo bài viết về [Nexus repository](https://viblo.asia/p/cai-dat-nexus-repository-manager-3P0lPDJplox) 

Hôm nay mình viết bài hướng dẫn push 1 thư viện mình đã viết lên repostory này lưu trữ
Sau khi cài xong nexus hệ thống tự động tạo cho chúng ta các repository để sử dụng
![](https://images.viblo.asia/770ec844-f0d2-4950-8421-73d89b1a6ba1.png)
Mình chỉ quan tâm đến 3 repository chính 
maven-public
maven-release
maven-snapshots

Để có thể build và tự động tăng version của thư viện, chúng ta cần 1 repository để lưu trữ code, trong ví dụ này mình tạo tạo trên git để public cho mọi người dùng theo [link](https://github.com/ledangtuanbk/demo-nexus/settings) 

Chủ yếu config trên pom.xml
Thêm 1 scm, lưu ý đường dẫn trên này sẽ là đường dẫn repository git của các bạn
```
    <scm>
        <developerConnection>scm:git:git@github.com:ledangtuanbk/demo-nexus.git</developerConnection>
        <tag>HEAD</tag>
    </scm>
```

thêm maven build plugins

```
 <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-release-plugin</artifactId>
                <version>2.5.3</version>
            </plugin>
            <plugin>
                <artifactId>maven-deploy-plugin</artifactId>
                <version>2.8.1</version>
                <executions>
                    <execution>
                        <id>default-deploy</id>
                        <phase>deploy</phase>
                        <goals>
                            <goal>deploy</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
```

Khai báo distribution management để biết nơi còn đẩy thư viện nó chính là đường dẫn đến Nexus của mọi người.

```
<distributionManagement>
        <repository>
            <id>nexus-releases</id>
            <name>maven-releases</name>
            <url>http://35.220.140.167:8080/repository/maven-releases/</url>
        </repository>
        <snapshotRepository>
            <id>nexus-snapshots</id>
            <name>maven-snapshots</name>
            <url>http://35.220.140.167:8080/repository/maven-snapshots/</url>
        </snapshotRepository>
    </distributionManagement>
```

Vẫn chưa thấy bảo mật ở đâu nhỉ. 
Cái này sẽ được lưu trong settings.xml trong thử mục 
```
~/.m2/settings.xml
```

với nội dung như bên dưới, chứa username và password của nexus của bạn, vì mình có 2 repository releases và snapshots nên khai báo 2 thông tin như bên dưới, 
chi tiết từng bài sẽ giải thích ở bài sau cho đỡ rối.

```
<settings>
  <servers>
    <server>
      <id>nexus-snapshots</id>
      <username>admin</username>
      <password>yourpassword</password>
    </server>
    <server>
      <id>nexus-releases</id>
      <username>admin</username>
      <password>yourpassword</password>
    </server>
  </servers>
</settings>
```

Cuối cùng là build, vào thư mục project của bạn, gõ lệnh build của maven, đợi và xem kết quả.

```
mvn -B release:clean release:prepare release:perform
```

sẽ có 1 số log như sau 

```
[INFO] [INFO] --- maven-deploy-plugin:2.8.1:deploy (default-deploy) @ demo-nexus ---
[INFO] [INFO] Uploading to nexus-releases: http://35.220.140.167:8080/repository/maven-releases/org/example/demo-nexus/1.4/demo-nexus-1.4.jar
[INFO] [INFO] Uploaded to nexus-releases: http://35.220.140.167:8080/repository/maven-releases/org/example/demo-nexus/1.4/demo-nexus-1.4.jar (2.4 kB at 4.8 kB/s)
[INFO] [INFO] Uploading to nexus-releases: http://35.220.140.167:8080/repository/maven-releases/org/example/demo-nexus/1.4/demo-nexus-1.4.pom
[INFO] [INFO] Uploaded to nexus-releases: http://35.220.140.167:8080/repository/maven-releases/org/example/demo-nexus/1.4/demo-nexus-1.4.pom (1.8 kB at 4.5 kB/s)
[INFO] [INFO] Downloading from nexus-releases: http://35.220.140.167:8080/repository/maven-releases/org/example/demo-nexus/maven-metadata.xml
[INFO] [INFO] Downloaded from nexus-releases: http://35.220.140.167:8080/repository/maven-releases/org/example/demo-nexus/maven-metadata.xml (297 B at 2.1 kB/s)
[INFO] [INFO] Uploading to nexus-releases: http://35.220.140.167:8080/repository/maven-releases/org/example/demo-nexus/maven-metadata.xml
[INFO] [INFO] Uploaded to nexus-releases: http://35.220.140.167:8080/repository/maven-releases/org/example/demo-nexus/maven-metadata.xml (326 B at 749 B/s)
[INFO] [INFO] Uploading to nexus-releases: http://35.220.140.167:8080/repository/maven-releases/org/example/demo-nexus/1.4/demo-nexus-1.4-sources.jar
[INFO] [INFO] Uploaded to nexus-releases: http://35.220.140.167:8080/repository/maven-releases/org/example/demo-nexus/1.4/demo-nexus-1.4-sources.jar (2.2 kB at 5.4 kB/s)
[INFO] [INFO] Uploading to nexus-releases: http://35.220.140.167:8080/repository/maven-releases/org/example/demo-nexus/1.4/demo-nexus-1.4-javadoc.jar
[INFO] [INFO] Uploaded to nexus-releases: http://35.220.140.167:8080/repository/maven-releases/org/example/demo-nexus/1.4/demo-nexus-1.4-javadoc.jar (23 kB at 49 kB/s)
[INFO] [INFO] ------------------------------------------------------------------------
[INFO] [INFO] BUILD SUCCESS
[INFO] [INFO] ------------------------------------------------------------------------
[INFO] [INFO] Total time:  20.546 s
[INFO] [INFO] Finished at: 2020-10-23T10:34:50+07:00
[INFO] [INFO] ------------------------------------------------------------------------
[INFO] Cleaning up after release...
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS

```

thành quả mình build version 1.4 lên nexus
vào kiểm tra trên nexus 
![](https://images.viblo.asia/27b0cc6e-bcc8-4332-b05c-271927eb8801.png)

chúng ta có 1 thư viện 

```
<dependency>
  <groupId>org.example</groupId>
  <artifactId>demo-nexus</artifactId>
  <version>1.4</version>
</dependency>
```

Trông giống như những gì mình hay lấy trên maven repository, tuy nhiên bạn vẫn chưa thể sử dụng được luôn vì nó đang nằm trên repo của bạn và được bảo mật, 
repos của bạn cũng chưa thể visible cho tất cả mọi người. Sao mà thằng maven có thể biết mà tìm đến được.

Trong bài [sau](https://viblo.asia/p/su-dung-thu-vien-java-tu-thu-vien-nexus-repository-07LKXb3klV4) mình mình sẽ viết hướng dẫn config và sử dụng thằng thư viện này.
Cảm ơn đã đọc bài, nếu có câu hỏi cần trao đổi, hãy comment ở dưới.