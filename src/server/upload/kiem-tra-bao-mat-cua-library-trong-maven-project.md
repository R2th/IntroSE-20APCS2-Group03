# Giới thiệu chung
Trong quá trình phát triển ứng dụng các Maven Project, chúng ta thường chỉ kiểm tra tính năng hoạt động của thư viện đó, tương thích với project không, hiếm khi kiểm tra xem thư viện đó có lỗi liên quan đến bảo mật không. Trong project có rất nhiều thư viện, ta không thể vào maven repository kiểm tra từng thư viện riêng lẻ được, nó sẽ mất rất nhiều thời gian, hơn nữa, có thể ngày hôm nay thư viện đó chưa bị phát hiện lỗi liên quan đến bảo mật, nhưng hôm sau có thể bị phát hiện ra. Chúng ta cần phải kiểm tra một cách tự động việc này. Hôm nay mình sẽ giới thiệu tools mà mình đang sử dụng trong project hiện tại  **dependency-check-maven**. Cá nhân mình thấy nó khá hữu ích. 

Tool sẽ tự động kiểm tra các thư viện sử dụng trong project với thư viện lưu trữ các vấn đề liên quan đến bảo mật [OWASP](https://owasp.org/). Kiểm tra các vấn đề liên quan và tạo report.
# Cách sử dụng
Có 1 vài cách sử dụng tool, trong bài viết này, mình sẽ hướng dẫn cách đơn giản mà mình vẫn đang sử dụng.  
## Thêm config trong pom.xml
```
<profile>
            <id>owasp-dependency-check</id>
            <build>
                <plugins>
                    <plugin>
                        <groupId>org.owasp</groupId>
                        <artifactId>dependency-check-maven</artifactId>
                        <version>6.2.2</version>
                        <executions>
                            <execution>
                                <goals>
                                    <goal>check</goal>
                                </goals>
                            </execution>
                        </executions>
                    </plugin>
                </plugins>
            </build>
        </profile>
```

## Chạy lệnh kiểm tra và tiến hành xem kết quả.

```
mvn clean install -Dmaven.test.skip=true  -Powasp-dependency-check
```


# Ví dụ 
Mình có tạo 1 project mẫu tại [đây](https://github.com/ledangtuanbk/maven-owasp-check) , trong này sẽ sử dụng 1 thư viện có vấn đề liên quan đến bảo mật 
```
        <!-- https://mvnrepository.com/artifact/org.apache.logging.log4j/log4j-api -->
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-api</artifactId>
            <version>2.11.2</version>
        </dependency>
```

Kết quả hiển thị như bên duới.
![](https://images.viblo.asia/6cee6013-8a55-4d2a-894d-a64e2a9840f7.png)

Từ đó có thể phát hiện ra vấn đề và tìm cách giải quyết.

# Kết luận
Mình thấy đây là một tool khá hay và cần thiết trong quá trình phát triển hệ thống. Hy vọng giúp ích cho mọi người.
Nếu cần trao đổi hãy comment ở bên dưới.

## Link tham khảo 
https://owasp.org/
https://github.com/jeremylong/DependencyCheck