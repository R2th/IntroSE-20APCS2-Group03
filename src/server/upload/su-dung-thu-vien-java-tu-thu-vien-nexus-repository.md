Trong bài [trước](https://viblo.asia/p/huong-dan-day-thu-vien-java-len-nexus-repostory-bJzKmP8E59N), mình có hướng dẫn dẫn đẩy thử viện lên server Nexus
```
<dependency>
  <groupId>org.example</groupId>
  <artifactId>demo-nexus</artifactId>
  <version>1.4</version>
</dependency>
```
Như mình đã nói từ trước, thư viện này được host trên server của bạn, chỉ bạn mới biết. Tự dung maven sẽ không thể biết nơi nào để download về.
Khi bạn chạy, hệ thống sẽ báo lỗi
```
[WARNING] The POM for org.example:demo-nexus:jar:1.4 is missing, no dependency information available
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  0.263 s
[INFO] Finished at: 2020-10-26T15:27:35+07:00
[INFO] ------------------------------------------------------------------------
[ERROR] Failed to execute goal on project nexus-client: Could not resolve dependencies for project org.example:nexus-client:jar:1.0-SNAPSHOT: Failure to find org.example:demo-nexus:jar:1.4 in https://repo.maven.apache.org/maven2 was cached in the local repository, resolution will not be reattempted until the update interval of central has elapsed or updates are forced -> [Help 1]
```

Bạn cần phải khai báo để Maven có thể biết được thông tin repository mà bạn đang cần dùng.

Như mọi người có thể thấy trên hình bên dưới, trạng thái hiện tại của Anonymous Access đang off, nghĩa là người dùng phải authorized mới dùng được thư viện này (bảo mật repository)
![](https://images.viblo.asia/71aa1a28-11a2-4c0a-a336-fd048f2de043.png)
```
<servers>
      <server>
          <id>nexus</id>
          <username>admin</username>
          <password>adminpassword</password>
      </server>
  </servers>
```

Trong phần repository cái maven-public có type là **group**, nó là tổng hợp của **maven-releases** và **maven-snapshots**
![](https://images.viblo.asia/4922808c-58f0-4d55-b4d6-a18c80efa63a.png)
![](https://images.viblo.asia/fce163ba-e6ae-4b89-960d-6350325f8349.png)

Nên url sẽ lấy theo url của maven public như ảnh ở trên

```
http://35.220.140.167:8080/repository/maven-public/
```

Tất cả thông tin khai báo sẽ được đặt trong settings.xml
```
  GNU nano 4.8                                                                                       settings.xml                                                                                        Modified  
<?xml version="1.0" encoding="UTF-8"?>
<settings>
  <mirrors>
    <mirror>
      <!--This sends everything else to /public -->
      <id>nexus</id>
      <mirrorOf>*</mirrorOf>
      <url>http://35.220.140.167:8080/repository/maven-public/</url>
    </mirror>
  </mirrors>
  
  <profiles>
    <profile>
      <id>nexus</id>
      <!--Enable snapshots for the built in central repo to direct -->
      <!--all requests to nexus via the mirror -->
      <repositories>
        <repository>
          <id>central</id>
          <url>http://central</url>
          <releases><enabled>true</enabled></releases>
          <snapshots><enabled>true</enabled></snapshots>
        </repository>
      </repositories>
     <pluginRepositories>
        <pluginRepository>
          <id>central</id>
          <url>http://central</url>
          <releases><enabled>true</enabled></releases>
          <snapshots><enabled>true</enabled></snapshots>
        </pluginRepository>
      </pluginRepositories>
    </profile>
  </profiles>
  <activeProfiles>
    <!--make the profile active all the time -->
    <activeProfile>nexus</activeProfile>
  </activeProfiles>
  <servers>
      <server>
          <id>nexus</id>
          <username>admin</username>
          <password>adminpassword</password>
      </server>
  </servers>
</settings>
```

khi build maven sẽ tìm đến repository và tải thư viện về cho bạn.
```
[INFO] Scanning for projects...
[INFO] 
[INFO] ----------------------< org.example:nexus-client >----------------------
[INFO] Building nexus-client 1.0-SNAPSHOT
[INFO] --------------------------------[ jar ]---------------------------------
Downloading from nexus: http://35.220.140.167:8080/repository/maven-public/org/example/demo-nexus/1.4/demo-nexus-1.4.pom
Downloaded from nexus: http://35.220.140.167:8080/repository/maven-public/org/example/demo-nexus/1.4/demo-nexus-1.4.pom (1.8 kB at 4.5 kB/s)
Downloading from nexus: http://35.220.140.167:8080/repository/maven-public/org/example/demo-nexus/1.4/demo-nexus-1.4.jar
Downloaded from nexus: http://35.220.140.167:8080/repository/maven-public/org/example/demo-nexus/1.4/demo-nexus-1.4.jar (2.4 kB at 11 kB/s)
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ nexus-client ---
[INFO] 
[INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ nexus-client ---
[WARNING] Using platform encoding (UTF-8 actually) to copy filtered resources, i.e. build is platform dependent!
[INFO] Copying 0 resource
[INFO] 
[INFO] --- maven-compiler-plugin:3.1:compile (default-compile) @ nexus-client ---
[INFO] Nothing to compile - all classes are up to date
[INFO] 
[INFO] --- maven-resources-plugin:2.6:testResources (default-testResources) @ nexus-client ---
[WARNING] Using platform encoding (UTF-8 actually) to copy filtered resources, i.e. build is platform dependent!
[INFO] skip non existing resourceDirectory /home/tledang/temp/nexus-client/src/test/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.1:testCompile (default-testCompile) @ nexus-client ---
[INFO] Nothing to compile - all classes are up to date
[INFO] 
[INFO] --- maven-surefire-plugin:2.12.4:test (default-test) @ nexus-client ---
[INFO] No tests to run.
[INFO] 
[INFO] --- maven-jar-plugin:2.4:jar (default-jar) @ nexus-client ---
[INFO] Building jar: /home/tledang/temp/nexus-client/target/nexus-client-1.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ nexus-client ---
[INFO] Installing /home/tledang/temp/nexus-client/target/nexus-client-1.0-SNAPSHOT.jar to /home/tledang/.m2/repository/org/example/nexus-client/1.0-SNAPSHOT/nexus-client-1.0-SNAPSHOT.jar
[INFO] Installing /home/tledang/temp/nexus-client/pom.xml to /home/tledang/.m2/repository/org/example/nexus-client/1.0-SNAPSHOT/nexus-client-1.0-SNAPSHOT.pom
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  2.081 s
[INFO] Finished at: 2020-10-26T15:41:43+07:00
[INFO] ------------------------------------------------------------------------

```