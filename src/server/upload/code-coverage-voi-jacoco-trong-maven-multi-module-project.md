![](https://images.viblo.asia/d455750d-37aa-4316-95d0-40b1aaded4c1.png)

> **Code Coverage** là một biện pháp được sử dụng trong quá trình phát triển phần mềm để đánh giá mức độ cover của unit test trên source code. Giúp chúng ta có thể đánh giá được chất lượng code như thế nào, bao nhiêu code của chúng ta đã được và chưa được cover bởi Unit Test.

Trong bài viết này, mình giới thiệu một plugin của Apache Maven tên là [JaCoCo Maven Plugin](https://www.jacoco.org/jacoco/) giúp chúng ta có thể đo được số liệu code coverage này các bạn nhé.

Việc tích hợp **Jacoco** plugin vào project với ***single module*** cực kỳ dễ, chỉ cần thêm đoạn config:
```
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.1</version>
    <executions>
        <execution>
            <id>agent-for-ut</id>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```
vào **pom.xml** của maven project, bạn đã có thể xuất ra report code coverage rồi.

Phức tạp hơn một tý, bạn sẽ cần phải tích hợp Jacoco vào maven project với multiple module - dạng project luôn luôn là cấu trúc của bao project lớn nhỏ hiện nay.
## I. Chuẩn bị multi-module project
Mình đã chuẩn bị sẵn một project nhỏ ở đây, bạn tham khảo nhé: [Multi-module project](https://github.com/lamngockhuong/jacoco-coverage-multi-module/commit/f82bff1c9d00e1c5a99b077430d56296707575c0)

![](https://images.viblo.asia/d0dba140-e5f7-46b3-a82e-ed6657f3db2b.jpg)

Project này gồm 4 module: `projecta`, `projectb`, `projectc`, `coverage-report` (Mình sẽ giới thiệu module này sau)

@ Với nội dung từng file pom.xml như sau:
> **parent pom.xml**
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.ngockhuong</groupId>
    <artifactId>platform</artifactId>
    <version>1.0</version>
    <packaging>pom</packaging>

    <modules>
        <module>projecta</module>
        <module>projectb</module>
        <module>projectc</module>
    </modules>

    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```
> **pom.xml (projecta)**
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.ngockhuong</groupId>
        <artifactId>platform</artifactId>
        <version>1.0</version>
    </parent>
    <artifactId>projecta</artifactId>
    <version>1.0</version>
    <packaging>jar</packaging>
</project>
```
Với **projectb, projectc**, tại pom.xml file bạn thay ***artifactId*** thành ***projectb***, ***projectc*** nhé (dài quá post lên đây mình sợ lăn hư hết chuột)

@ Trong mỗi project (projecta, projectb, projectc) đều có các sample class:

>**Calculation.java**
```
public class Calculation {
    public int add(int a, int b) {
        return a + b;
    }

    public int sub(int a, int b) {
        if (a >= b) {
            return a - b;
        }

        return b - a;
    }
}
```
Và unit test class:
>**CalculationTest.java**
```
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class CalculationTest {
    private Calculation calculation;

    @Before
    public void init() {
        calculation = new Calculation();
    }

    @Test
    public void testAdd() {
        assertEquals(4, calculation.add(1, 3));
    }

    @Test
    public void testSub() {
        assertEquals(2, calculation.sub(7, 5));

        assertEquals(9, calculation.sub(3, 12));
    }
}
```

## II. Tích hợp Jacoco
Như mình đã nói từ đầu, việc tích hợp **Jacoco** vào project với single module giản đơn đến không tưởng. Thêm config vào maven pom, chạy `mvn package` hoặc `mvn install` nhận ngay report trong thư mục **target**.

Tuy nhiên, với multi-module project thì mọi việc không đơn giản đến thế, à mà thật sự cũng đơn giản chứ không phức tạp lắm đâu, chỉ là thêm module và vài config nữa thôi :laughing:

Bạn tham khảo trước commit [Add Jacoco coverage](https://github.com/lamngockhuong/jacoco-coverage-multi-module/commit/a43cac76d67a03b28131d6b620612cf252f751c5)  tại project https://github.com/lamngockhuong/jacoco-coverage-multi-module nhé :wink:

Chúng ta sẽ phân thành 3 bước cho sang chảnh một tý :v: 

### Bước 1: Tạo coverage-report module
Bạn tạo thêm một module **coverage-report** rỗng với pom.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>platform</artifactId>
        <groupId>com.ngockhuong</groupId>
        <version>1.0</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>coverage-report</artifactId>

    <dependencies>
        <dependency>
            <groupId>com.ngockhuong</groupId>
            <artifactId>projecta</artifactId>
            <version>1.0</version>
        </dependency>
        <dependency>
            <groupId>com.ngockhuong</groupId>
            <artifactId>projectb</artifactId>
            <version>1.0</version>
        </dependency>
        <dependency>
            <groupId>com.ngockhuong</groupId>
            <artifactId>projectc</artifactId>
            <version>1.0</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.jacoco</groupId>
                <artifactId>jacoco-maven-plugin</artifactId>
                <version>0.8.4</version>
                <configuration>
                    <excludes>
                        <exclude>**/com/ngockhuong/projectc/Calculation.class</exclude>
                    </excludes>
                </configuration>
                <executions>
                    <execution>
                        <id>report-aggregate</id>
                        <phase>verify</phase>
                        <goals>
                            <goal>report-aggregate</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>
```
Trong đó:
+ **dependencies** là nơi khai báo các thư viện phụ thuộc cho module này, việc khai báo ở đây đồng nghĩa với việc báo cho jacoco plugin biết những module mà nó cần cover và report. (Thử thêm bớt và cảm nhận bạn nhé)
+ **excludes** trong ***configuration***: Cái tên nói lên tất cả, đó là nơi bạn khai báo để bỏ qua các class hoặc package trong kết quả report. (Jacoco thấy những thứ này sẽ tránh xa, dù yêu lắm, thương lắm)
+ **id**, **phase**, **goals**: Các thành phần của maven execution ([Cách sử dụng execution ở đây](https://maven.apache.org/guides/mini/guide-configuring-plugins.html#Using_the_executions_Tag) có mô tả chi tiết, bạn có thể xem qua nhé)
+ **goal**: Định nghĩa goal cho plugin, mỗi plugin sẽ có những goal riêng, với Jacoco plugin bạn tham khảo chi tiết ở đây để sử dụng cho phù hợp trong project nhé - [JaCoCo Maven Goals](https://www.eclemma.org/jacoco/trunk/doc/maven.html)
(report-aggregate: Tạo report (HTML, XML, CSV) tổng hợp từ nhiều module trong project)

### Bước 2: Config jacoco tại parent pom
Các bạn định nghĩa thêm 
`<module>coverage-report</module>` và plugin jacoco như bên dưới:
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.ngockhuong</groupId>
    <artifactId>platform</artifactId>
    <version>1.0</version>
    <packaging>pom</packaging>

    <modules>
        <module>projecta</module>
        <module>projectb</module>
        <module>projectc</module>
        <module>coverage-report</module>
    </modules>

    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.jacoco</groupId>
                <artifactId>jacoco-maven-plugin</artifactId>
                <version>0.8.4</version>
                <executions>
                    <execution>
                        <id>default</id>
                        <goals>
                            <goal>prepare-agent</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>
```
Trong đó:
+ **goal**: Nhớ chọn prepare-agent hoặc prepare-agent-integration bạn nhé. Goal sẽ chuẩn bị các thuộc tính cần thiết cho Jacoco runtime (https://www.eclemma.org/jacoco/trunk/doc/prepare-agent-mojo.html)
### Bước 3: Chạy unit test và xuất report
Cuối cùng, bạn chỉ cần chạy `mvn package` hoặc `mvn clean install` tại root project và chờ kết quả success
```
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Summary:
[INFO]
[INFO] platform 1.0 ....................................... SUCCESS [  7.273 s]
[INFO] projecta ........................................... SUCCESS [ 12.125 s]
[INFO] projectb ........................................... SUCCESS [  0.977 s]
[INFO] projectc ........................................... SUCCESS [  0.959 s]
[INFO] coverage-report 1.0 ................................ SUCCESS [  0.752 s]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 22.284 s
[INFO] Finished at: 2019-07-23T21:00:03+07:00
[INFO] ------------------------------------------------------------------------
```
Report sẽ tự động generate tại thư mục **target** của module **coverage-report**, mở file index.html để xem có những gì trong đó nhé :stuck_out_tongue_winking_eye:

![](https://images.viblo.asia/67cbde3f-d76f-4e0b-b849-6f2a7dd22733.jpg)

Như vậy mình đã tích hợp xong Jacoco plugin vào project rồi đó. Hi vọng có thể giúp ích cho bạn trong quá trình học tập và công việc :nerd_face:

![](https://images.viblo.asia/155f3206-e244-4c94-bcce-31cd4b81aac9.gif)