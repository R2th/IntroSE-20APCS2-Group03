Xin chào mọi người hôm nay mình giới thiệu một loại đồ chơi cực xịn cực hay ho luôn, đây là một thư viện giúp cho mọi người tạo ra 1 class Typescript trong dự án Frontend ở đây mình lấy ví dụ là Angular một cách nhanh chóng nhất dựa vào response class của Backend.

Như mọi người thường biết trong dự án Spring Boot chúng ta thường sử dụng Maven như một công cụ để quản lý thư viện và các plugin hỗ trợ cho dự án như build, deploy, sinh mã,… Nhưng dạo gần đây các class Backend của mình càng ngày càng mở rộng và dự án cũng như có nhiều class lồng nhau khiến cho việc tạo model Angular Typescript của mình trở nên mất nhiều thời gian hơn dù đã copy paste. Thêm vào đó nếu chỉ sử dụng kiểu dữ liệu **Object** hoặc kiểu dữ liệu **any** khiến cho dự án trở nên không ***strictly*** và các bạn sau cũng không follow code khiến cho các model bị đặt kiểu dữ liệu trả về một cách hời hợt. Đó là lý do mình tìm kiếm cách nào đó để mapping response class Java trả về đúng với các trường của model Typescript.

Và plugin mình giới thiệu ngày hôm nay đó là **vojtechhabarta/typescript-generator: Generates TypeScript from Java – JSON declarations**, REST service client . Từ khi sử dụng thư viện này mình đã có thể sinh ra các model Typescript dễ dàng hơn, đặc biệt là các class lồng nhau, plugin cũng hỗ trợ sinh cho chúng ta luôn. Rất tiện lợi và cách dùng thì vô cùng đơn giản chỉ cần khai báo là plugin trong ứng dụng Spring Boot của chúng ta như sau:
```
<plugin>
    <groupId>cz.habarta.typescript-generator</groupId>
    <artifactId>typescript-generator-maven-plugin</artifactId>
    <version>x.y.z</version>
    <executions>
        <execution>
            <id>generate</id>
            <goals>
                <goal>generate</goal>
            </goals>
            <phase>process-classes</phase>
        </execution>
    </executions>
    <configuration>
        <jsonLibrary>jackson2</jsonLibrary>
        <classes>
            <class>cz.habarta.typescript.generator.Person</class>
        </classes>
        <outputKind>module</outputKind>
    </configuration>
</plugin>
```
Ở trên là cách dùng với 1 class đơn nhưng nếu bạn muốn compile ra từ 1 package Java thì sao, cách làm đó là sử dụng thẻ **< classPattern>** và trong thẻ **< pattern>** chúng ta khai báo đường dẫn package chứa các class Java của chúng ta.
```
<plugin>
    <groupId>cz.habarta.typescript-generator</groupId>
    <artifactId>typescript-generator-maven-plugin</artifactId>
    <version>1.7.x</version>
    <executions>
        <execution>
            <id>generate</id>
            <goals>
                <goal>generate</goal>
            </goals>
            <phase>process-classes</phase>
            <configuration>
                <jsonLibrary>jackson2</jsonLibrary>
                <classPatterns>
                    <pattern>cz.habarta.example.*</pattern>
                    <pattern>cz.habarta.example.data.**</pattern>
                    <pattern>cz.habarta.example.rest.*</pattern>
                </classPatterns>
                <excludeClasses>
                    <class>cz.habarta.example.Application</class>
                </excludeClasses>
                <outputFile>target/rest.d.ts</outputFile>
                <outputKind>global</outputKind>
            </configuration>
        </execution>
    </executions>
</plugin>
```
Sau khi hoàn tất quá trình import plugin vào pom.xml của dự án Spring Boot chúng ta sẽ chạy lệnh generate của plugin và các class sẽ nằm trong thư mục **/target/typescript-generator/MyProject.d.ts**

Cách sử dụng có rồi thì bắt tay vào thực hành thôi hãy biến dự án của chúng ta thành một dự án tiết kiệm thời gian và tập trung vào giải quyết các bài toán nhanh nhất và tốt nhất, còn các vấn đề đau đầu khác hãy thử sử dụng công cụ hỗ trợ mình nghĩ khá là hiệu quả đấy các bạn. Bên dưới là một ví dụ mẫu mapping class của tác giả mọi người có thể tham khảo nhé, cảm ơn tất cả mọi người đã theo dõi nhé hẹn gặp mọi người trong bài viết lần sau ^^
```
public class Person {
    public String name;
    public int age;
    public boolean hasChildren;
    public List<String> tags;
    public Map<String, String> emails;
}
    
---------------------------------------------
    
interface Person {
    name: string;
    age: number;
    hasChildren: boolean;
    tags: string[];
    emails: { [index: string]: string };
}
```
    
Tài liệu tham khảo:
* [https://gociter.wordpress.com/2021/05/06/mapping-class-java-voi-angular-typescript-model-chua-bao-gio-de-den-the/](https://gociter.wordpress.com/2021/05/06/mapping-class-java-voi-angular-typescript-model-chua-bao-gio-de-den-the/)
* [https://github.com/vojtechhabarta/typescript-generator](https://github.com/vojtechhabarta/typescript-generator)
* [https://github.com/vojtechhabarta/typescript-generator/wiki/Class-Names-Glob-Patterns](https://github.com/vojtechhabarta/typescript-generator/wiki/Class-Names-Glob-Patterns)