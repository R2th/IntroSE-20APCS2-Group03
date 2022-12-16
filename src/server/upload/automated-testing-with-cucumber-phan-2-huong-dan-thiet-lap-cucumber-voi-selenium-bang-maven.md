## Vì sao nên sử dụng Maven
Maven là một công cụ xây dựng tự động hóa và được sử dụng rộng rãi cho các dự án Java. Nó chủ yếu được sử dụng trong việc quản lý các phụ thuộc thông qua pom.xml. Giả sử bạn muốn nâng cấp các tệp JAR và trong dự án của bạn, bạn đang sử dụng phiên bản 1.25 cho phụ thuộc Cucumber-Java. Bạn cần nâng cấp lên phiên bản mới nhất. Với việc sử dụng Maven, nó dễ dàng nâng cấp phiên bản.

## Các bước cài đặt Maven project trên window

### Chuẩn bị
* Cài đặt JDK( version 8 hoặc version mới nhất): https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
* Cài đặt IntelliJ IDEA(nên cài bản miễn phí): https://www.jetbrains.com/idea/download/#section=windows

### Cài đặt Maven
**Bước 1**: Tạo Maven project trên IntelliJ IDEA
Chọn *Create New Project* -> chọn *Maven* -> click *Next*.
![](https://images.viblo.asia/4cf77610-b61a-4e5c-99f6-266692b7811a.png)

**Bước 2**: Nhập *Group Id*, *Artifact ID* -> click *Next* -> click *Finish*.
![](https://images.viblo.asia/2f632569-48e9-4557-be11-dd1fc4fbb83b.png)

Sau khi tạo xong, sẽ hiển thị cấu trúc như hình bên dưới
![](https://images.viblo.asia/c26edde8-6857-4f98-9cad-cda3c20bfc70.png)

**Bước 3**: Để khung Cucumber-Selenium có thể chạy được, các bạn cần thêm các dependency vào file pom.xml (việc này tương tự như thêm file jar vào thư viện trong Java project). Dưới đây là 1 số dependency cần thiết:
* Selenium-java
* Cobertura
* Cucumber-jvm-deps
* Cucumber-reporting
* Gherkin
* JUnit
* Mockito-all-1.10.19
* Cucumber-core
* Cucumber-java
* Cucumber-junit

**Lưu ý**: Phải đảm bảo version của  Cucumber-java, Cucumber -junit và Cucumber-core giống nhau.

Để có thể thêm dependency, các bạn có thể tham khảo tại trang: https://mvnrepository.com/. Sau khi thêm xong file pom.xml sẽ hiển thị như hình bên dưới:

```
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>Test</groupId>
    <artifactId>Test</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>jar</packaging>
    <name>Cucumber_Selenium</name>
    <url>http://maven.apache.org</url>
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-java</artifactId>
            <version>3.6.0</version>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-java</artifactId>
            <version>3.7.0</version>
        </dependency>
        <dependency>
            <groupId>info.cukes</groupId>
            <artifactId>cucumber-java</artifactId>
            <version>1.2.5</version>
        </dependency>
        <dependency>
            <groupId>info.cukes</groupId>
            <artifactId>cucumber-jvm-deps</artifactId>
            <version>1.0.5</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>info.cukes</groupId>
            <artifactId>cucumber-junit</artifactId>
            <version>1.2.5</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>com.vimalselvam</groupId>
            <artifactId>cucumber-extentsreport</artifactId>
            <version>3.0.2</version>
        </dependency>
        <dependency>
            <groupId>com.aventstack</groupId>
            <artifactId>extentreports</artifactId>
            <version>3.1.2</version>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>compile</scope>
        </dependency>
        <dependency>
            <groupId>info.cukes</groupId>
            <artifactId>cucumber-junit</artifactId>
            <version>1.2.5</version>
            <scope>compile</scope>
        </dependency>
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>RELEASE</version>
        </dependency>
    </dependencies>
</project>
```

Khi thêm 1 dependency, góc phải bên dưới sẽ hiển thị thông báo(như hình bên dưới), thì các bạn có thể chọn *Enable Auto-Import*, để lần sau project tự động cập nhật khi thêm các dependency.

![](https://images.viblo.asia/4de00280-5847-4357-9557-31339d88f95f.png)

Hoặc có thể cài đặt trên IntelliJ IDEA bằng cách: click *File* -> *Setting* -> *Build, Execution Deployment* -> *Build Tools* ->*Maven* -> *Importing* -> *Import maven projects automatically*, như hình bên dưới
![](https://images.viblo.asia/dbcd0591-a9f0-4338-8735-8dde4f9376c1.png)

(còn tiếp)