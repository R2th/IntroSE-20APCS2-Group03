# 1.Đặt vấn đề
Trong quá trình code Java, 1 số hàm chung thường được sử dụng ở rất nhiều method, chúng ta thường viết chung vào các package common, util...
Mỗi khi tạo project mới, chúng ta sẽ phải copy những package chứa các class này sang -> Thủ công, mỗi lần update lại copy lại trong rất nhiều project. 
Có giải pháp đặt ra là chúng ta có thể build thành các file thư viện (jar) rồi import các file jar này vào project. 
Việc import các file jar trực tiếp vào ít được sử dụng hiện này vì nó sẽ làm nặng source project khi pull về. Thông thường các dự án lớn đội devops sẽ tự build repository riêng để đẩy library này, tương tự như maven repository mà chúng ta đang dùng. (Mình cũng đã từng viết 1 bài hướng dẫn ở [đây](https://viblo.asia/p/huong-dan-day-thu-vien-java-len-nexus-repostory-bJzKmP8E59N) )

Hôm nay mình sẽ hướng dẫn 1 cách đơn giản hơn, dùng cho mục đích cá nhân. Mình sẽ tạo dependency trong local maven repository (.m2) từ 1 file thư viện jar.
# 2.Cách Thực Hiện
Yêu cầu máy cài sẵn java (8 hoặc 11). Mình sử dụng java 11. 
Và cài sẵn maven (> 2.5). Mình dùng 3.8.2

```
ubuntu@ubuntu:~$ java -version
java version "11.0.14" 2022-01-18 LTS

ubuntu@ubuntu:~$ mvn -version 
Apache Maven 3.8.2 (ea98e05a04480131370aa0c110b8c54cf726c06f)
```

## 2.1: Tạo 1 thư viện java
Mình có tạo 1 thư viện đơn giản tại đây [](https://github.com/ledangtuanbk/sample-java-lib)
Trong thư viện mình có tạo các method đơn giản cộng và trừ 2 số nguyên.
```
public class MyLib {
    public static int plus(int a, int b) {
        return a + b;
    }

    public static int sub(int a, int b) {
        return a - b;
    }
}
```

Để build ra file jar 
```
mvn clean package
```

Sau khi build xong, ta có file jar nằm trong thư mục target. Trong ví dụ của mình, nó nằm ở thư mục  bên dưới (vì thư mục project mình đặt ở /home/ubuntu/temp/TempLib)
```
/home/ubuntu/temp/TempLib/target/TempLib-1.0-SNAPSHOT.jar
```

## 2.2. Build thư viện local repository

Dùng 1 câu lệnh là xong

```
mvn org.apache.maven.plugins:maven-install-plugin:2.5.2:install-file -Dfile=/home/ubuntu/temp/TempLib/target/TempLib-1.0-SNAPSHOT.jar -DgroupId=com.ldt -DartifactId=sample-java-lib -Dversion=1.0
```

Có các tham số cần lưu ý: 
-Dfile=/home/ubuntu/temp/TempLib/target/TempLib-1.0-SNAPSHOT.jar : Chính là file jar mình tạo ra ở bước trên.
-DgroupId=com.ldt -DartifactId=sample-java-lib -Dversion=1.0 : groupId, artifactId, version là các tham số mình muốn tạo thư viện tạo ra, các bạn dã dùng maven thì quá quen với tham số này. 

Sau khi chạy kết quả như bên dưới.
![image.png](https://images.viblo.asia/4afb2660-b8e9-435b-8418-f7ce0d5f4736.png)

Ta có thể thấy, nó đã cài đặt vào local maven của máy bạn theo đường dẫn như bên dưới. 
/home/ubuntu/.m2/repository/com/ldt/sample-java-lib/1.0/sample-java-lib-1.0.jar

### 2.3 Sử dụng trên project khác. 

Vào 1 project maven bất kỳ, thêm vào trong thẻ **dependencies** là được

```
<dependency>
            <groupId>com.ldt</groupId>
            <artifactId>sample-java-lib</artifactId>
            <version>1.0</version>
        </dependency>
```

Sau khi khai báo reload maven trong project, sau đó ta có thể sử dụng  bình thường như các thư viện khác.

```
System.out.println(MyLib.plus(1,2));
```

# 3.Kết luận
Như đã nói trong phần mở đầu, cách này chỉ áp dụng cho repository trong local máy, nếu muốn sử dụng cho nhiều máy thì nên tham khảo cách cài đặt [private repository](https://viblo.asia/p/su-dung-thu-vien-java-tu-thu-vien-nexus-repository-07LKXb3klV4) 

Nếu cần trao đổi, mọi người hãy bình luận bên dưới. Cảm ơn vì đã đọc bài của mình.