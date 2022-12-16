**AWS Systems Manager Parameter Store** là một dịch vụ của AWS, giúp quản lý cấu hình cho các ứng dụng một cách an toàn, bảo mật. Bạn có thể lưu trữ những dạng data như password, thông tin database, license codes,... một cách tập trung nhất cho tất cả các môi trường (dev, testing, staging, production)

Một ứng dụng Spring luôn luôn cần config và thường thì sẽ đặt các giá trị cần config đó tại file properties, sử dụng biến môi trường để đưa giá trị vào từ bên ngoài (dùng .env file)

![](https://images.viblo.asia/2334682f-a2a4-4a8e-88cf-1d6e4db61e41.png)

Nhưng, nếu một ứng dụng chạy trên production (điển hình chạy trên các aws service), các giá trị config lại hay thay đổi thì việc phải đổi biến môi trường từ file .env, properties là một cực hình. Lúc này, các bạn sẽ thấy được **AWS SSM Parameter Store** lợi hại như nào. (len3)
## Setup AWS parameter store trong Spring Boot
Đây là file **pom.xml** mẫu. Đang sử dụng spring boot **2.3.4**, spring cloud **Hoxton.SR8**
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.3.4.RELEASE</version>
    <relativePath/> <!-- lookup parent from repository -->
  </parent>
  <groupId>com.ngockhuong</groupId>
  <artifactId>spring-boot-aws-ssm-parameter-resolving</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <name>spring-boot-aws-ssm-parameter-resolving</name>
  <description>Resolving SSM parameters for a Spring Boot application</description>
 
  <properties>
    <java.version>11</java.version>
    <spring-cloud.version>Hoxton.SR8</spring-cloud.version>
  </properties>
 
  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-aws</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-aws-parameter-store-config</artifactId>
    </dependency>
 
    <!-- Test Dependencies -->
 
  </dependencies>
 
  <dependencyManagement>
    <dependencies>
      <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-dependencies</artifactId>
        <version>${spring-cloud.version}</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
    </dependencies>
  </dependencyManagement>
 
  <build>
    <plugins>
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
      </plugin>
    </plugins>
  </build>
 
</project>
```

Mấu chốt là đoạn này nè:
```
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-aws</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-aws-parameter-store-config</artifactId>
    </dependency>
```
và này:
```
  <dependencyManagement>
    <dependencies>
      <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-dependencies</artifactId>
        <version>${spring-cloud.version}</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
    </dependencies>
  </dependencyManagement>
```
(AWS Parameter store hoạt động trên Spring Cloud)
## Config credentials để ứng dụng truy cập được AWS Parameter Store
Có nhiều cách để config credentials đảm bảo cho ứng dụng Spring Boot có thể access được vào AWS Parameter Store. 

* Sử dụng biến môi trường (AWS_ACCESS_KEY_ID và AWS_SECRET_ACCESS_KEY hoặc AWS_ACCESS_KEY và AWS_SECRET_KEY)
* Java System Properties (aws.accessKeyId and aws.secretKey)
* Credentials profile (Mặc định cấu hình được lưu trữ tại file ~/.aws/credentials)
* Credentials thông qua Amazon EC2 container service
* Thông qua Amazon EC2 metadata service

![](https://images.viblo.asia/c5d8011f-3cbc-4bc7-9d8d-f73e93a949e2.png)

## Config các giá trị tại properties file

```
cloud:
  aws:
    region:
      static: ${aws_region:ap-northeast-1}
    stack:
      auto: false
```
```
/config/<name-of-the-spring-application>_<profile>/<parameter-name>
```

## Thay đổi các thiết lập AWS Parameter Store mặc định trong Spring Boot

```
aws:
  paramstore:
    enabled: ${aws_paramstore_enabled:true}
    name: app_name
    prefix: /config
    profile-separator: '_'
```
```
/config/<paramstore-name>_<profile>/<parameter-name>
```

## Kết luận
Trên đây mình chỉ giới thiệu những thiết lập chính để Spring Boot có thể get được data từ AWS Parameter Store cũng như cách đặt tên aws parameter sao cho map với file properties của Spring Boot

Một số định nghĩa cũng như các thứ râu ria, bạn có thể tham khảo thêm tại: https://rieckpil.de/resolving-spring-boot-properties-using-the-aws-parameter-store-ssm/ nhé

![](https://images.viblo.asia/155f3206-e244-4c94-bcce-31cd4b81aac9.gif)